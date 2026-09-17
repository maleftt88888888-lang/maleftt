
let allCards = [];
let adminToken = localStorage.getItem('ils_admin_token') || '';

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function copyText(str) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(str);
  }
  return new Promise((resolve, reject) => {
    try {
      const ta = document.createElement('textarea');
      ta.value = str;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    } catch(e) { reject(e); }
  });
}

async function doAdminLogin() {
  const pwdInput = document.getElementById('adminPwdInput');
  const pwd = (pwdInput ? pwdInput.value : '').trim();
  if (!pwd) return toast('请输入后台管理密码');

  const btn = document.getElementById('loginSubmitBtn');
  btn.disabled = true;
  btn.textContent = '验证中...';

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pwd }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || '密码错误');
    }
    adminToken = data.token;
    localStorage.setItem('ils_admin_token', adminToken);
    document.getElementById('loginOverlay').style.display = 'none';
    document.getElementById('adminApp').style.display = 'block';
    toast('登录成功');
    loadCardList();
  } catch(err) {
    toast(err.message || '登录失败');
  } finally {
    btn.disabled = false;
    btn.textContent = '登录后台';
  }
}

function doAdminLogout() {
  localStorage.removeItem('ils_admin_token');
  adminToken = '';
  document.getElementById('loginOverlay').style.display = 'flex';
  document.getElementById('adminApp').style.display = 'none';
  toast('已退出登录');
}

// 自动验证持久化登录状态
if (adminToken) {
  fetch('/api/admin/stats', {
    headers: { 'Authorization': 'Bearer ' + adminToken }
  }).then(r => r.json()).then(data => {
    if (data && data.stats) {
      document.getElementById('loginOverlay').style.display = 'none';
      document.getElementById('adminApp').style.display = 'block';
      loadCardList();
    } else {
      doAdminLogout();
    }
  }).catch(() => {
    doAdminLogout();
  });
}

async function loadCardList() {
  try {
    const res = await fetch('/api/admin/cards', {
      headers: { 'Authorization': 'Bearer ' + adminToken }
    });
    if (res.status === 401) {
      doAdminLogout();
      return;
    }
    const data = await res.json();
    allCards = data.cards || [];
    renderStats(data.stats || {});
    filterCards();
  } catch(err) {
    toast('获取卡密数据失败');
  }
}

function renderStats(st) {
  document.getElementById('statTotal').textContent = st.total || 0;
  document.getElementById('statBound').textContent = st.bound || 0;
  document.getElementById('statUnbound').textContent = st.unbound || 0;
  document.getElementById('statDisabled').textContent = st.disabled || 0;
}

function filterCards() {
  const q = (document.getElementById('searchInput').value || '').trim().toLowerCase();
  const stFilter = document.getElementById('statusFilter').value;

  const filtered = allCards.filter(c => {
    if (q) {
      const matchKey = (c.key || '').toLowerCase().includes(q);
      const matchRemark = (c.remark || '').toLowerCase().includes(q);
      const matchPlan = (c.plan || '').toLowerCase().includes(q);
      if (!matchKey && !matchRemark && !matchPlan) return false;
    }
    if (stFilter === 'bound') return !!c.boundDeviceId;
    if (stFilter === 'unbound') return !c.boundDeviceId && c.status === 'active';
    if (stFilter === 'disabled') return c.status !== 'active';
    return true;
  });

  document.getElementById('displayCount').textContent = filtered.length;
  renderTable(filtered);
}

function renderTable(list) {
  const tbody = document.getElementById('cardsTableBody');
  if (list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px">暂无匹配卡密</td></tr>';
    return;
  }

  tbody.innerHTML = list.map(c => {
    const isBound = !!c.boundDeviceId;
    const boundInfo = isBound
      ? \`<div style="font-weight:600;color:var(--txt-bright)">📱 \${esc(c.boundDeviceName || '设备已绑定')}</div>
         <div style="font-size:11px;color:var(--muted);font-family:var(--font-mono)">\${c.boundAt ? new Date(c.boundAt).toLocaleString('zh-CN') : ''}</div>\`
      : '<span class="tag tag-gray">⚪ 未绑定</span>';

    const statusTag = c.status === 'active'
      ? '<span class="tag tag-green">正常</span>'
      : '<span class="tag tag-red">已禁用</span>';

    const unbindText = \`\${c.unbindCount || 0} / \${c.maxUnbinds ?? 5} 次\`;

    return \`<tr>
      <td><span class="key-text" onclick="clickCopy('\${c.key}')" title="点击复制卡密">\${esc(c.key)}</span></td>
      <td>\${esc(c.plan || 'VIP 永久授权')}</td>
      <td>\${statusTag}</td>
      <td>\${boundInfo}</td>
      <td>\${unbindText}</td>
      <td style="color:var(--muted)">\${esc(c.remark || '-')}</td>
      <td>
        <div style="display:flex;gap:6px;flex-wrap:nowrap">
          \${isBound ? \`<button class="btn btn-default btn-sm" onclick="adminUnbind('\${c.key}')" title="解绑当前设备，使其可在新设备绑定">🔄 解绑/换绑</button>\` : ''}
          <button class="btn btn-default btn-sm" onclick="toggleCardStatus('\${c.key}', '\${c.status}')">
            \${c.status === 'active' ? '🚫 禁用' : '✅ 启用'}
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteCardPrompt('\${c.key}')">🗑️ 删除</button>
        </div>
      </td>
    </tr>\`;
  }).join('');
}

function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function clickCopy(text) {
  copyText(text).then(() => toast('已复制卡密: ' + text));
}

async function adminUnbind(key) {
  if (!confirm(\`确认要解绑卡密 [\${key}] 的已绑定设备吗？解绑后用户可重新绑定新设备。\`)) return;
  try {
    const res = await fetch('/api/admin/unbind', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify({ key }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || '解绑失败');
    toast('✓ 解绑成功');
    loadCardList();
  } catch(e) {
    toast(e.message || '解绑操作失败');
  }
}

async function toggleCardStatus(key, currentStatus) {
  const nextStatus = currentStatus === 'active' ? 'disabled' : 'active';
  try {
    const res = await fetch('/api/admin/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify({ key, status: nextStatus }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '修改状态失败');
    toast('状态已更新');
    loadCardList();
  } catch(e) {
    toast(e.message || '更新失败');
  }
}

async function deleteCardPrompt(key) {
  if (!confirm(\`⚠️ 危险操作：确定要彻底删除卡密 [\${key}] 吗？删除后将无法恢复！\`)) return;
  try {
    const res = await fetch('/api/admin/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify({ key }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '删除失败');
    toast('卡密已删除');
    loadCardList();
  } catch(e) {
    toast(e.message || '删除失败');
  }
}

async function submitGenerateCards() {
  const count = parseInt(document.getElementById('genCount').value, 10) || 1;
  const prefix = document.getElementById('genPrefix').value.trim();
  const plan = document.getElementById('genPlan').value;
  const maxUnbinds = parseInt(document.getElementById('genMaxUnbinds').value, 10) || 5;
  const remark = document.getElementById('genRemark').value.trim();

  try {
    const res = await fetch('/api/admin/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + adminToken
      },
      body: JSON.stringify({ count, prefix, plan, maxUnbinds, remark }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || '生成卡密失败');

    const keys = (data.created || []).map(c => c.key);
    document.getElementById('genResultText').value = keys.join('\\n');
    document.getElementById('genResultModal').classList.add('show');
    loadCardList();
  } catch(e) {
    toast(e.message || '生成失败');
  }
}

function closeGenModal() {
  document.getElementById('genResultModal').classList.remove('show');
}

function copyGenResult() {
  const txt = document.getElementById('genResultText').value;
  copyText(txt).then(() => toast('已复制全部新生成的卡密！'));
}

document.getElementById('adminPwdInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') doAdminLogin();
});
