export function getAdminHtml() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>后台管理系统 - 卡密与换绑中心</title>
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<style>
:root {
  --bg: #0d1117;
  --bg-card: #161b22;
  --bg-card2: #21262d;
  --border: #30363d;
  --border-focus: #58a6ff;
  --txt: #c9d1d9;
  --txt-bright: #f0f6fc;
  --muted: #8b949e;
  --cyan: #17c3cf;
  --cyan-dark: #00818a;
  --green: #238636;
  --green-bright: #2ea043;
  --red: #da3633;
  --yellow: #d29922;
  --font-mono: "SF Mono", ui-monospace, Menlo, Consolas, monospace;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: var(--bg);
  color: var(--txt);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  min-height: 100vh;
  padding: 16px;
}
.container { max-width: 1100px; margin: 0 auto; }
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 20px;
}
.brand { display: flex; align-items: center; gap: 10px; }
.brand h1 { font-size: 18px; color: var(--txt-bright); font-weight: 700; }
.badge-admin { font-size: 11px; background: rgba(23,195,207,.15); color: var(--cyan); border: 1px solid rgba(23,195,207,.3); padding: 2px 8px; border-radius: 12px; }
.nav-links { display: flex; align-items: center; gap: 10px; }
.nav-link { color: var(--muted); text-decoration: none; font-size: 13px; padding: 6px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg-card); transition: all .15s; }
.nav-link:hover { color: var(--txt-bright); border-color: var(--muted); }
.nav-link.danger { color: #ff7b72; border-color: rgba(255,123,114,.3); }

/* Stats cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 14px 16px;
}
.stat-label { font-size: 12px; color: var(--muted); margin-bottom: 4px; }
.stat-val { font-size: 24px; font-weight: 800; color: var(--txt-bright); font-family: var(--font-mono); }
.stat-val.cyan { color: var(--cyan); }
.stat-val.green { color: #3fb950; }
.stat-val.yellow { color: #e3b341; }
.stat-val.red { color: #f85149; }

/* Sections */
.card-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 20px;
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}
.card-title { font-size: 15px; font-weight: 700; color: var(--txt-bright); display: flex; align-items: center; gap: 8px; }

/* Form */
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group label { font-size: 12px; color: var(--muted); font-weight: 600; }
.form-input, .form-select {
  background: var(--bg-card2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 8px 12px;
  color: var(--txt-bright);
  font-size: 13px;
  outline: none;
}
.form-input:focus, .form-select:focus { border-color: var(--border-focus); }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all .15s;
  white-space: nowrap;
}
.btn-primary { background: var(--green); color: #fff; border-color: rgba(240,246,252,.1); }
.btn-primary:hover { background: var(--green-bright); }
.btn-cyan { background: var(--cyan); color: #022a2d; font-weight: 700; }
.btn-cyan:hover { filter: brightness(1.1); }
.btn-default { background: var(--bg-card2); color: var(--txt); border-color: var(--border); }
.btn-default:hover { border-color: var(--muted); color: var(--txt-bright); }
.btn-danger { background: rgba(218,54,51,.15); color: #ff7b72; border-color: rgba(218,54,51,.4); }
.btn-danger:hover { background: var(--red); color: #fff; }
.btn-sm { padding: 4px 8px; font-size: 11.5px; border-radius: 4px; }

/* Table */
.table-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: 8px; }
table { width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: left; }
th { background: var(--bg-card2); color: var(--muted); font-weight: 600; padding: 10px 12px; border-bottom: 1px solid var(--border); white-space: nowrap; }
td { padding: 10px 12px; border-bottom: 1px solid var(--border); vertical-align: middle; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: rgba(255,255,255,.02); }

.key-text { font-family: var(--font-mono); font-weight: 700; color: #58a6ff; cursor: pointer; }
.key-text:hover { text-decoration: underline; }
.tag { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600; }
.tag-green { background: rgba(63,185,80,.15); color: #3fb950; border: 1px solid rgba(63,185,80,.3); }
.tag-gray { background: rgba(139,148,158,.15); color: var(--muted); border: 1px solid rgba(139,148,158,.3); }
.tag-yellow { background: rgba(227,179,65,.15); color: #e3b341; border: 1px solid rgba(227,179,65,.3); }
.tag-red { background: rgba(248,81,73,.15); color: #f85149; border: 1px solid rgba(248,81,73,.3); }

/* Search toolbar */
.toolbar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; align-items: center; justify-content: space-between; }
.search-box { display: flex; gap: 8px; flex: 1; max-width: 400px; }

/* Login overlay */
#loginOverlay {
  position: fixed;
  inset: 0;
  background: rgba(13,17,23,.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}
.login-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  width: 100%;
  max-width: 360px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,.5);
}
.login-title { font-size: 18px; font-weight: 700; color: var(--txt-bright); margin-bottom: 6px; text-align: center; }
.login-desc { font-size: 12px; color: var(--muted); margin-bottom: 20px; text-align: center; }

/* Toast */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(30px);
  background: #1f6feb;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transition: all .2s;
  z-index: 2000;
  box-shadow: 0 4px 16px rgba(0,0,0,.4);
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

/* Modal for generated keys */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.7);
  display: none; align-items: center; justify-content: center;
  z-index: 1500; padding: 16px;
}
.modal-overlay.show { display: flex; }
.modal-box {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 12px; width: 100%; max-width: 520px; padding: 20px;
}
.modal-textarea {
  width: 100%; height: 160px; background: var(--bg);
  border: 1px solid var(--border); border-radius: 6px;
  padding: 10px; color: var(--cyan); font-family: var(--font-mono);
  font-size: 12px; resize: none; margin: 12px 0;
}
</style>
</head>
<body>

<div id="loginOverlay">
  <div class="login-box">
    <div class="login-title">🔐 管理员登录</div>
    <div class="login-desc">卡密授权管理与设备换绑后台</div>
    <div class="form-group" style="margin-bottom:14px">
      <label>后台管理密码</label>
      <input type="password" id="adminPwdInput" class="form-input" placeholder="输入密码 (默认 admin888)" />
    </div>
    <button class="btn btn-cyan" style="width:100%" id="loginSubmitBtn" onclick="doAdminLogin()">登录后台</button>
  </div>
</div>

<div class="container" id="adminApp" style="display:none">
  <header>
    <div class="brand">
      <h1>⚙️ 卡密与换绑管理系统</h1>
      <span class="badge-admin">Admin v2.0</span>
    </div>
    <div class="nav-links">
      <a class="nav-link" href="/" target="_blank">🌐 首页</a>
      <a class="nav-link" href="/picker" target="_blank">🗺️ 选点页</a>
      <button class="nav-link danger" onclick="doAdminLogout()">退出</button>
    </div>
  </header>

  <!-- 统计指标 -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">总生成卡密</div>
      <div class="stat-val cyan" id="statTotal">0</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">已绑定设备</div>
      <div class="stat-val green" id="statBound">0</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">未绑定 / 待使用</div>
      <div class="stat-val yellow" id="statUnbound">0</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">已禁用卡密</div>
      <div class="stat-val red" id="statDisabled">0</div>
    </div>
  </div>

  <!-- 批量生成卡密 -->
  <div class="card-box">
    <div class="card-head">
      <div class="card-title">✨ 批量生成卡密</div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>生成数量</label>
        <input type="number" id="genCount" class="form-input" value="5" min="1" max="100" />
      </div>
      <div class="form-group">
        <label>卡密前缀</label>
        <input type="text" id="genPrefix" class="form-input" value="VIP-" placeholder="如 VIP-" />
      </div>
      <div class="form-group">
        <label>授权套餐类型</label>
        <select id="genPlan" class="form-select">
          <option value="VIP 永久授权">VIP 永久授权</option>
          <option value="年度旗舰版">年度旗舰版</option>
          <option value="月度尊享版">月度尊享版</option>
          <option value="体验测试卡">体验测试卡</option>
        </select>
      </div>
      <div class="form-group">
        <label>允许换绑次数</label>
        <input type="number" id="genMaxUnbinds" class="form-input" value="5" min="0" max="99" />
      </div>
      <div class="form-group">
        <label>备注 (客户信息/订单)</label>
        <input type="text" id="genRemark" class="form-input" placeholder="如: 微信客户购买" />
      </div>
    </div>
    <div style="display:flex; justify-content:flex-end">
      <button class="btn btn-primary" onclick="submitGenerateCards()">🚀 立即生成卡密</button>
    </div>
  </div>

  <!-- 卡密列表与设备换绑 -->
  <div class="card-box">
    <div class="card-head">
      <div class="card-title">📋 卡密列表与设备换绑管理</div>
      <button class="btn btn-default btn-sm" onclick="loadCardList()">🔄 刷新列表</button>
    </div>

    <div class="toolbar">
      <div class="search-box">
        <input type="text" id="searchInput" class="form-input" placeholder="搜索卡密、备注或套餐..." oninput="filterCards()" />
        <select id="statusFilter" class="form-select" onchange="filterCards()">
          <option value="all">全部状态</option>
          <option value="bound">🔒 已绑定设备</option>
          <option value="unbound">⚪ 未绑定</option>
          <option value="disabled">🚫 已禁用</option>
        </select>
      </div>
      <div style="font-size:12px;color:var(--muted)">
        共计 <span id="displayCount" style="color:var(--txt-bright);font-weight:700">0</span> 条记录
      </div>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>卡密 (点击复制)</th>
            <th>套餐类型</th>
            <th>状态</th>
            <th>绑定设备标识 / 时间</th>
            <th>已换绑次数</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="cardsTableBody">
          <tr><td colspan="7" style="text-align:center;color:var(--muted);padding:24px">加载中...</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 换绑说明与提示 -->
  <div class="card-box" style="font-size:13px;color:var(--muted);line-height:1.7">
    <div class="card-title" style="margin-bottom:8px">💡 换绑与鉴权规则说明</div>
    <ul style="padding-left:18px">
      <li><b>设备绑定机制</b>：用户在首页或选点页激活卡密时，系统会自动记录当前客户端的独立设备标识并绑定。同一张卡密默认仅限绑定的设备访问。</li>
      <li><b>用户自主换绑</b>：当用户更换手机或浏览器时，在卡密激活弹窗中点击「自主换绑」即可解绑旧设备并在新设备重新绑定（受最大换绑次数限制）。</li>
      <li><b>管理员一键换绑</b>：管理员可在本后台点击任意卡密的「一键解绑/换绑」按钮，立即清空旧设备绑定信息，不受换绑次数限制。</li>
    </ul>
  </div>
</div>

<!-- 生成卡密展示弹窗 -->
<div class="modal-overlay" id="genResultModal">
  <div class="modal-box">
    <div style="font-size:16px;font-weight:700;color:var(--txt-bright);margin-bottom:6px">🎉 卡密生成成功</div>
    <div style="font-size:12px;color:var(--muted)">已生成以下卡密，你可以复制后发送给客户：</div>
    <textarea class="modal-textarea" id="genResultText" readonly></textarea>
    <div style="display:flex;justify-content:flex-end;gap:10px">
      <button class="btn btn-default" onclick="closeGenModal()">关闭</button>
      <button class="btn btn-cyan" onclick="copyGenResult()">📋 一键复制全部卡密</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
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
</script>
</body>
</html>`;
}
