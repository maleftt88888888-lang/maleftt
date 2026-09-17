export function getLandingHtml() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>iPhone 虚拟定位</title>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#0a0c11">
<link rel="apple-touch-icon" href="/icon-180.png">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<style>
:root{
  --bg:#0a0c11; --card:#12161d; --card2:#191e28; --line:#242b38;
  --cyan:#17c3cf; --cyan2:#0e97a1; --green:#22c55e; --green2:#159a45;
  --red:#ff5b60; --amber:#f5a623; --txt:#eef2f8; --muted:#8a93a5; --mono:#7fe3ea;
}
*{ margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
body{
  font-family:-apple-system,BlinkMacSystemFont,system-ui,"SF Pro","Helvetica Neue",sans-serif;
  color:var(--txt); line-height:1.5;
  background:
    radial-gradient(1100px 420px at 50% -140px, rgba(23,195,207,.16), transparent 70%),
    radial-gradient(700px 360px at 90% 8%, rgba(34,197,94,.08), transparent 65%),
    var(--bg);
  background-attachment:fixed;
}
.wrap{ 
  max-width:600px; 
  margin:0 auto; 
  padding:20px 16px calc(44px + constant(safe-area-inset-bottom));
  padding:20px 16px calc(44px + env(safe-area-inset-bottom)); 
}

/* --- header / branding --- */
header{ text-align:center; padding:12px 0 8px; }
header .logowrap{ position:relative; width:74px; margin:0 auto 14px; }
header .logo{ width:74px; height:74px; border-radius:20px; display:block; box-shadow:0 0 0 1px var(--line),0 10px 30px rgba(23,195,207,.28); }
h1{ font-size:26px; font-weight:800; letter-spacing:1px; background:linear-gradient(92deg,#eafcff,#7fe3ea 55%,#22c55e); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }

/* --- primary CTAs --- */
.ctas{ display:flex; gap:10px; margin:18px 0 12px; }
.enter{ flex:1; display:flex; align-items:center; justify-content:center; gap:8px; padding:17px 14px; border:none; border-radius:14px; font-size:16px; font-weight:800; cursor:pointer; text-decoration:none; transition:transform .12s,box-shadow .12s; }
.enter:active{ transform:scale(.97); }
.enter.go{ background:linear-gradient(135deg,#2ee06a,#129a44); color:#04240f; box-shadow:0 10px 26px rgba(34,197,94,.34); }

/* --- card key license card --- */
.license-card{
  background: linear-gradient(135deg, rgba(25,30,40,0.85), rgba(18,22,29,0.98));
  border: 1px solid rgba(23,195,207,0.28);
  border-radius: 14px;
  padding: 14px 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  backdrop-filter: blur(8px);
}
.license-card.active{ border-color:rgba(34,197,94,0.35); }
.license-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
.license-title-wrap{ display:flex; align-items:center; gap:8px; }
.license-icon{ font-size:16px; }
.license-title{ font-size:14px; font-weight:800; color:var(--txt); letter-spacing:.4px; }
.badge{ font-size:11px; font-weight:700; padding:3px 9px; border-radius:12px; text-transform:uppercase; letter-spacing:.5px; }
.badge.unactive{ background:rgba(255,91,96,.15); color:var(--red); border:1px solid rgba(255,91,96,.35); }
.badge.active{ background:rgba(34,197,94,.18); color:var(--green); border:1px solid rgba(34,197,94,.4); }
.license-desc{ font-size:12px; color:var(--muted); line-height:1.5; margin-bottom:10px; }
.license-input-row{ display:flex; gap:8px; margin-bottom:8px; }
.license-input{ flex:1; min-width:0; background:var(--bg); border:1px solid var(--line); border-radius:10px; padding:10px 12px; font-family:"SF Mono",ui-monospace,monospace; font-size:13px; color:var(--txt); outline:none; transition:border-color .15s; text-transform:uppercase; }
.license-input:focus{ border-color:var(--cyan); box-shadow:0 0 0 2px rgba(23,195,207,.2); }
.license-btn{ padding:0 18px; border:none; border-radius:10px; background:linear-gradient(135deg,var(--cyan),var(--cyan2)); color:#022a2d; font-size:13.5px; font-weight:700; cursor:pointer; transition:transform .12s,filter .12s; white-space:nowrap; }
.license-btn:active{ transform:scale(.96); filter:brightness(1.1); }
.license-hint{ display:flex; align-items:center; justify-content:space-between; font-size:11.5px; color:var(--muted); }
.license-link-btn{ background:none; border:none; color:var(--cyan); font-size:11.5px; font-weight:600; cursor:pointer; text-decoration:underline; padding:0; }
.license-link-btn:hover{ color:#6feaf2; }
.license-info-row{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:8px; font-size:13px; }
.license-info-label{ color:var(--muted); }
.license-info-key{ font-family:"SF Mono",ui-monospace,monospace; font-weight:700; color:var(--mono); }
.license-plan-tag{ font-size:11px; padding:2px 8px; border-radius:6px; background:rgba(34,197,94,.15); color:var(--green); border:1px solid rgba(34,197,94,.3); font-weight:600; }
.license-action-row{ display:flex; align-items:center; justify-content:space-between; font-size:11.5px; }
.license-status-tip{ color:var(--green); font-weight:600; }
.license-reset-btn{ background:transparent; border:1px solid var(--line); border-radius:6px; padding:3px 8px; color:var(--muted); font-size:11px; cursor:pointer; transition:all .15s; }
.license-reset-btn:hover{ color:var(--txt); border-color:var(--muted); }

/* --- contact card --- */
.wechat-box{
  background: linear-gradient(135deg, rgba(25,30,40,0.8), rgba(18,22,29,0.95));
  border: 1px solid rgba(23,195,207,0.2);
  border-radius: 14px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
  backdrop-filter: blur(8px);
  margin-bottom: 4px;
}
.wechat-info{ display:flex; align-items:center; gap:10px; }
.wechat-icon{ font-size:18px; }
.wechat-text{ display:flex; flex-direction:column; }
.wechat-label{ font-size:12px; color:var(--muted); font-weight:500; }
.wechat-id{ font-family:"SF Mono",ui-monospace,monospace; font-size:14px; color:var(--mono); font-weight:700; letter-spacing:.5px; }
.wechat-copy{
  padding: 6px 14px;
  background: rgba(23,195,207,0.12);
  border: 1px solid rgba(23,195,207,0.3);
  border-radius: 8px;
  color: var(--cyan);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s ease;
}
.wechat-copy:active{ transform:scale(.95); background:rgba(23,195,207,0.25); }
.wechat-copy.ok{ background:var(--green); border-color:var(--green); color:#04240f; }

.divider{ height:1px; background:linear-gradient(90deg,transparent,var(--line),transparent); margin:24px 0 20px; }

/* --- section heads --- */
h2{ font-size:16px; font-weight:800; margin-bottom:4px; display:flex; align-items:center; gap:9px; }
h2::before{ content:""; width:4px; height:16px; border-radius:2px; background:linear-gradient(180deg,var(--cyan),var(--green)); }
.sub{ font-size:12.5px; color:var(--muted); margin:0 0 14px 13px; }

/* 优化后的提示框样式 */
.note{ 
  background:var(--card); 
  border:1px solid var(--line); 
  border-radius:14px; 
  padding:14px 16px; 
  font-size:12.5px; 
  color:#c3ccdb; 
  line-height:1.6;
  margin-bottom:16px; 
  box-shadow:0 4px 12px rgba(0,0,0,0.15);
}
.note b{ color:var(--txt); }

/* --- platform cards --- */
.plat{ background:var(--card); border:1px solid var(--line); border-radius:14px; padding:12px; margin-bottom:12px; }
.plat .big{ display:flex; align-items:center; justify-content:center; gap:8px; width:100%; padding:14px; border:none; border-radius:11px; background:linear-gradient(135deg,var(--cyan),var(--cyan2)); color:#022a2d; font-size:15.5px; font-weight:800; cursor:pointer; text-align:center; text-decoration:none; transition:filter .12s,transform .12s; }
.plat .big:active{ filter:brightness(1.1); transform:scale(.98); }
.plat .line{ display:flex; align-items:center; gap:8px; margin-top:9px; }
.plat .url{ flex:1; min-width:0; font-family:"SF Mono",ui-monospace,monospace; font-size:11px; color:var(--muted); background:var(--bg); border:1px solid var(--line); border-radius:8px; padding:8px 10px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.plat .copy{ flex:none; padding:8px 15px; border:1px solid var(--line); border-radius:8px; background:var(--card2); color:var(--txt); font-size:12.5px; font-weight:600; cursor:pointer; transition:all .12s; }
.plat .copy:active{ background:#2a3140; }
.plat .copy.ok{ background:var(--green); border-color:var(--green); color:#04240f; }

.toast{ position:fixed; left:50%; bottom:40px; transform:translateX(-50%) translateY(20px); background:rgba(8,10,14,.92); color:#fff; padding:11px 20px; border-radius:22px; font-size:14px; opacity:0; transition:all .25s; pointer-events:none; z-index:99; border:1px solid var(--line); }
.toast.show{ opacity:1; transform:translateX(-50%) translateY(0); }
footer{ text-align:center; font-size:11.5px; color:var(--muted); margin-top:26px; line-height:1.9; }
footer b{ color:#8fe0e6; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <div class="logowrap"><img class="logo" src="/icon.svg" alt="Logo"></div>
    <h1>iPhone 虚拟定位</h1>
  </header>

  <div class="ctas">
    <a class="enter go" id="enterPickerBtn" href="/picker">🗺️ 进入选点网页</a>
  </div>

  <!-- 卡密激活授权卡片 -->
  <div class="license-card" id="licenseCard">
    <div class="license-head">
      <div class="license-title-wrap">
        <span class="license-icon">🔐</span>
        <span class="license-title">授权卡密</span>
      </div>
      <span class="badge unactive" id="licenseBadge">未激活</span>
    </div>

    <!-- 未激活状态视图 -->
    <div id="licenseUnactiveView">
      <p class="license-desc">请输入专属授权卡密激活系统，获取选点与设备同步权限。</p>
      <div class="license-input-row">
        <input type="text" id="licenseInput" class="license-input" placeholder="输入卡密 (如: VIP888)" autocomplete="off" spellcheck="false">
        <button type="button" id="activateBtn" class="license-btn">激活</button>
      </div>

      <!-- 换绑提示与自主换绑卡片 -->
      <div id="mismatchBox" style="display:none;background:rgba(255,91,96,.1);border:1px solid rgba(255,91,96,.3);border-radius:10px;padding:12px;margin-top:12px;font-size:12.5px">
        <div style="color:#ff7b72;font-weight:700;margin-bottom:4px" id="mismatchTitle">⚠️ 该卡密已绑定其他设备</div>
        <div style="color:var(--muted);margin-bottom:10px;line-height:1.5" id="mismatchDesc">检测到该卡密已在其他设备使用。如需更换到当前设备，请点击下方自主换绑。</div>
        <button type="button" id="selfUnbindBtn" class="license-btn" style="background:var(--cyan);color:#022a2d;font-weight:700;width:100%;height:38px">🔄 立即换绑到当前设备</button>
      </div>

      <div class="license-hint">
        <span>暂无卡密？</span>
        <button type="button" class="license-link-btn" id="getCardKeyBtn">联系微信获取卡密</button>
        <span style="color:var(--line);margin:0 4px">|</span>
        <button type="button" class="license-link-btn" id="manualUnbindBtn" style="color:var(--muted)">自主换绑</button>
      </div>
    </div>

    <!-- 已激活状态视图 -->
    <div id="licenseActiveView" style="display:none">
      <div class="license-info-row">
        <span class="license-info-label">当前卡密：</span>
        <span class="license-info-key" id="activeKeyText"></span>
        <span class="license-plan-tag" id="activePlanText">VIP 永久授权</span>
      </div>
      <div class="license-action-row">
        <span class="license-status-tip">✓ 已绑定此设备，全功能正常使用</span>
        <button type="button" class="license-reset-btn" id="changeLicenseBtn">更换卡密</button>
      </div>
    </div>
  </div>

  <div class="wechat-box">
    <div class="wechat-info">
      <span class="wechat-icon">💬</span>
      <div class="wechat-text">
        <span class="wechat-label">中国大陆微信号</span>
        <span class="wechat-id">LLME-love</span>
      </div>
    </div>
    <button class="wechat-copy" id="copyWechat">复制微信号</button>
  </div>

  <div class="divider"></div>

  <h2>安装与使用说明</h2>
  <p class="sub">点击「一键导入」直接安装到 Shadowrocket；或点击「复制」手动添加模块。</p>
  <div class="note">📍 生效前提：① 代理 App 已连接（开关/引擎打开、<b>非「直连」模式</b>）；② 开启 HTTPS 解密 (MITM) 并信任证书；③ 安装好 Shadowrocket 对应的模块。之后打开选点页选择位置并点击「储存到设备」即可生效。iOS 切换后可能需要重启一次设备清理缓存。</div>

  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:12px;color:var(--muted);background:rgba(255,255,255,.03);padding:8px 12px;border-radius:8px;border:1px solid var(--line);flex-wrap:wrap;gap:8px">
    <div style="display:flex;align-items:center;gap:6px;overflow:hidden;text-overflow:ellipsis">
      <span style="white-space:nowrap">🌐 对外发布域名:</span>
      <code id="originDisplay" style="color:var(--cyan);font-family:'SF Mono',monospace;font-size:11.5px;word-break:break-all">...</code>
    </div>
    <button type="button" id="changeOriginBtn" style="background:transparent;border:1px solid var(--cyan);border-radius:6px;color:var(--cyan);font-size:11.5px;padding:3px 8px;cursor:pointer;white-space:nowrap">⚙️ 修改发布域名</button>
  </div>

  <div id="plats"></div>

  <footer>
    坐标仅保存在你<b>当前设备</b>上，服务端不留存记录。<br>
    GNU AGPL-3.0 · 仅供学习研究
    <div style="margin-top:12px;font-size:12px">
      <a href="/admin" target="_blank" style="color:var(--muted);text-decoration:none;border-bottom:1px dashed var(--line);padding-bottom:1px">⚙️ 后台管理系统 (卡密与换绑)</a>
    </div>
  </footer>
</div>

<div class="toast" id="toast"></div>

<script>
(function(){
  function getPublicOrigin() {
    var custom = localStorage.getItem('ils_custom_origin');
    if (custom && /^https?:\\/\\//i.test(custom.trim())) {
      return custom.trim().replace(/\\/+$/, '');
    }
    var cur = location.origin;
    if (cur.indexOf('ais-dev-') !== -1) {
      return cur.replace('ais-dev-', 'ais-pre-');
    }
    return cur;
  }
  function u(file){ return getPublicOrigin() + '/' + file; }
  
  var PLATS = [
    { 
      name: 'Shadowrocket', 
      file: 'ios-location-spoofer.sgmodule', 
      scheme: function(x){ return 'shadowrocket://install?module=' + encodeURIComponent(x); } 
    }
  ];

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
  
  function toast(m){ 
    var t=document.getElementById('toast'); 
    t.textContent=m; 
    t.classList.add('show'); 
    setTimeout(function(){ t.classList.remove('show'); }, 1800); 
  }

  function copyText(s){
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(s);
    }
    return new Promise(function(res, rej){ 
      try { 
        var ta = document.createElement('textarea'); 
        ta.value = s; 
        ta.style.position = 'fixed'; 
        ta.style.opacity = '0'; 
        document.body.appendChild(ta); 
        ta.select(); 
        var ok = document.execCommand('copy'); 
        document.body.removeChild(ta); 
        ok ? res() : rej(); 
      } catch(e){ 
        rej(e); 
      } 
    });
  }

  function doCopy(s, btn, successMsg){ 
    copyText(s).then(function(){ 
      toast(successMsg || '已复制'); 
      var o = btn.textContent; 
      btn.classList.add('ok'); 
      btn.textContent = '✓'; 
      setTimeout(function(){ btn.textContent = o; btn.classList.remove('ok'); }, 1200); 
    }).catch(function(){ 
      toast('复制失败，请手动输入'); 
    }); 
  }

  var wcBtn = document.getElementById('copyWechat');
  if(wcBtn){
    wcBtn.addEventListener('click', function(){
      doCopy('LLME-love', wcBtn, '已复制微信号: LLME-love');
    });
  }

  /* ---- 卡密验证与激活逻辑 ---- */
  var LICENSE_KEY = 'ils_license';
  var licenseCard = document.getElementById('licenseCard');
  var licenseBadge = document.getElementById('licenseBadge');
  var unactiveView = document.getElementById('licenseUnactiveView');
  var activeView = document.getElementById('licenseActiveView');
  var licenseInput = document.getElementById('licenseInput');
  var activateBtn = document.getElementById('activateBtn');
  var activeKeyText = document.getElementById('activeKeyText');
  var activePlanText = document.getElementById('activePlanText');
  var changeLicenseBtn = document.getElementById('changeLicenseBtn');
  var getCardKeyBtn = document.getElementById('getCardKeyBtn');

  function getStoredLicense() {
    try {
      var raw = localStorage.getItem(LICENSE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (obj && obj.valid && obj.key) return obj;
    } catch(e) {}
    return null;
  }

  /* ---- 设备唯一标识与名称 ---- */
  function getDeviceId() {
    var id = localStorage.getItem('ils_device_id');
    if (!id) {
      id = 'DEV-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
      localStorage.setItem('ils_device_id', id);
    }
    return id;
  }

  function getDeviceName() {
    var ua = navigator.userAgent;
    if (/iPhone/i.test(ua)) return 'iPhone / Safari';
    if (/iPad/i.test(ua)) return 'iPad';
    if (/Android/i.test(ua)) return 'Android';
    if (/Mac/i.test(ua)) return 'Mac / Browser';
    if (/Windows/i.test(ua)) return 'Windows / Browser';
    return 'Web Client';
  }

  var mismatchBox = document.getElementById('mismatchBox');
  var mismatchDesc = document.getElementById('mismatchDesc');
  var selfUnbindBtn = document.getElementById('selfUnbindBtn');
  var manualUnbindBtn = document.getElementById('manualUnbindBtn');
  var enterPickerBtn = document.getElementById('enterPickerBtn');

  function renderPlats(activeKey) {
    var html = '';
    for (var i=0; i<PLATS.length; i++){
      var p = PLATS[i];
      var rawUrl = u(p.file);
      var authUrl = activeKey ? (rawUrl + '?key=' + encodeURIComponent(activeKey)) : rawUrl;
      var schemeHref = activeKey ? p.scheme(authUrl) : 'javascript:void(0)';
      
      html += '<div class="plat">' +
        '<a class="big ' + (activeKey ? '' : 'locked') + '" href="' + esc(schemeHref) + '" data-auth="' + (activeKey ? '1' : '0') + '">一键导入 ' + esc(p.name) + (activeKey ? '' : ' (需激活卡密)') + '</a>' +
        '<div class="line"><span class="url">' + esc(authUrl) + '</span>' +
        '<button class="copy" data-url="' + esc(authUrl) + '" data-auth="' + (activeKey ? '1' : '0') + '">复制</button></div>' +
        '</div>';
    }
    document.getElementById('plats').innerHTML = html;

    var bigLinks = document.querySelectorAll('.plat a.big');
    for (var b=0; b<bigLinks.length; b++) {
      (function(link){
        link.addEventListener('click', function(e){
          if (link.getAttribute('data-auth') !== '1') {
            e.preventDefault();
            toast('⚠️ 请先输入并激活卡密后再一键导入 Shadowrocket！');
            if (licenseInput) {
              licenseInput.focus();
              if (licenseCard) licenseCard.scrollIntoView({ behavior: 'smooth' });
            }
            return false;
          }
        });
      })(bigLinks[b]);
    }

    var btns = document.querySelectorAll('.copy');
    for (var j=0; j<btns.length; j++){ 
      (function(btn){ 
        btn.addEventListener('click', function(){ 
          if (btn.getAttribute('data-auth') !== '1') {
            toast('⚠️ 请先激活卡密后再复制模块链接！');
            if (licenseInput) {
              licenseInput.focus();
              if (licenseCard) licenseCard.scrollIntoView({ behavior: 'smooth' });
            }
            return;
          }
          doCopy(btn.getAttribute('data-url'), btn, '已复制模块链接'); 
        }); 
      })(btns[j]); 
    }
  }

  function renderLicenseUI() {
    var lic = getStoredLicense();
    if (lic) {
      if (licenseCard) licenseCard.classList.add('active');
      if (licenseBadge) {
        licenseBadge.className = 'badge active';
        licenseBadge.textContent = '已激活';
      }
      if (unactiveView) unactiveView.style.display = 'none';
      if (activeView) activeView.style.display = 'block';
      if (activeKeyText) activeKeyText.textContent = lic.key;
      if (activePlanText) activePlanText.textContent = lic.plan || 'VIP 永久授权';
      if (mismatchBox) mismatchBox.style.display = 'none';
      renderPlats(lic.key);
    } else {
      if (licenseCard) licenseCard.classList.remove('active');
      if (licenseBadge) {
        licenseBadge.className = 'badge unactive';
        licenseBadge.textContent = '未激活';
      }
      if (unactiveView) unactiveView.style.display = 'block';
      if (activeView) activeView.style.display = 'none';
      if (licenseInput) licenseInput.value = '';
      renderPlats(null);
    }
    updateOriginDisplay();
  }

  var originDisplay = document.getElementById('originDisplay');
  var changeOriginBtn = document.getElementById('changeOriginBtn');
  function updateOriginDisplay() {
    if (originDisplay) {
      originDisplay.textContent = getPublicOrigin();
    }
  }
  if (changeOriginBtn) {
    changeOriginBtn.addEventListener('click', function() {
      var current = localStorage.getItem('ils_custom_origin') || getPublicOrigin();
      var input = prompt('请输入对外公开的正式发布域名（例如：https://ais-pre-xxx.run.app 或你的自定义域名/Cloudflare Worker 域名）：\\n\\n留空确认则恢复自动识别', current);
      if (input !== null) {
        var clean = input.trim();
        if (clean) {
          if (!/^https?:\\/\\//i.test(clean)) clean = 'https://' + clean;
          clean = clean.replace(/\\/+$/, '');
          localStorage.setItem('ils_custom_origin', clean);
          toast('✓ 发布域名已设置为: ' + clean);
        } else {
          localStorage.removeItem('ils_custom_origin');
          toast('✓ 已恢复为自动识别发布域名');
        }
        updateOriginDisplay();
        var lic = getStoredLicense();
        renderPlats(lic ? lic.key : null);
      }
    });
  }

  renderLicenseUI();

  // 选点网页卡密鉴权拦截
  if (enterPickerBtn) {
    enterPickerBtn.addEventListener('click', function(e) {
      var lic = getStoredLicense();
      if (!lic || !lic.valid) {
        e.preventDefault();
        toast('⚠️ 请先输入并激活卡密后再进入选点网页！');
        if (licenseInput) {
          licenseInput.focus();
          if (licenseCard) licenseCard.scrollIntoView({ behavior: 'smooth' });
        }
        return false;
      }
      enterPickerBtn.href = '/picker?key=' + encodeURIComponent(lic.key);
    });
  }

  function performVerify(keyVal) {
    if (!keyVal) return;
    activateBtn.disabled = true;
    activateBtn.textContent = '验证中…';
    if (mismatchBox) mismatchBox.style.display = 'none';

    fetch('/api/verify-license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: keyVal,
        deviceId: getDeviceId(),
        deviceName: getDeviceName(),
      })
    }).then(function(res) {
      return res.json().then(function(data) {
        if (!res.ok || !data.valid) {
          var err = new Error(data.error || '卡密无效');
          err.data = data;
          throw err;
        }
        return data;
      });
    }).then(function(data) {
      localStorage.setItem(LICENSE_KEY, JSON.stringify(data));
      renderLicenseUI();
      toast('✓ 卡密激活成功！已解锁全部功能');
    }).catch(function(err) {
      var d = err.data;
      if (d && d.code === 'DEVICE_MISMATCH') {
        if (mismatchBox) {
          mismatchBox.style.display = 'block';
          if (mismatchDesc) {
            mismatchDesc.textContent = '该卡密已在设备 [' + (d.boundDeviceName || '其他设备') + '] 绑定。当前已换绑 ' + (d.unbindCount || 0) + ' / ' + (d.maxUnbinds ?? 5) + ' 次。如需更换到当前设备，请点击下方自主换绑。';
          }
          if (selfUnbindBtn) {
            selfUnbindBtn.onclick = function() {
              performSelfUnbind(keyVal);
            };
          }
        }
        toast('该卡密已绑定其他设备，请点击换绑');
      } else {
        toast(err.message || '卡密验证失败');
      }
    }).finally(function() {
      activateBtn.disabled = false;
      activateBtn.textContent = '激活';
    });
  }

  function performSelfUnbind(keyVal) {
    if (!keyVal) return;
    if (selfUnbindBtn) {
      selfUnbindBtn.disabled = true;
      selfUnbindBtn.textContent = '换绑处理中…';
    }
    fetch('/api/unbind-license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: keyVal })
    }).then(function(res) {
      return res.json().then(function(data) {
        if (!res.ok || !data.success) {
          throw new Error(data.error || '换绑失败');
        }
        return data;
      });
    }).then(function() {
      toast('✓ 换绑解绑成功！正在自动绑定当前设备...');
      if (mismatchBox) mismatchBox.style.display = 'none';
      setTimeout(function() {
        performVerify(keyVal);
      }, 500);
    }).catch(function(err) {
      toast(err.message || '换绑操作失败');
    }).finally(function() {
      if (selfUnbindBtn) {
        selfUnbindBtn.disabled = false;
        selfUnbindBtn.textContent = '🔄 立即换绑到当前设备';
      }
    });
  }

  if (activateBtn) {
    activateBtn.addEventListener('click', function() {
      var val = (licenseInput ? licenseInput.value : '').trim().toUpperCase();
      if (!val) {
        toast('请输入卡密');
        if (licenseInput) licenseInput.focus();
        return;
      }
      performVerify(val);
    });

    if (licenseInput) {
      licenseInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') activateBtn.click();
      });
    }
  }

  if (changeLicenseBtn) {
    changeLicenseBtn.addEventListener('click', function() {
      try { localStorage.removeItem(LICENSE_KEY); } catch(e) {}
      renderLicenseUI();
      toast('已重置卡密状态');
      if (licenseInput) licenseInput.focus();
    });
  }

  if (getCardKeyBtn) {
    getCardKeyBtn.addEventListener('click', function() {
      doCopy('LLME-love', getCardKeyBtn, '已复制客服微信号: LLME-love，请联系获取卡密');
    });
  }

  if (manualUnbindBtn) {
    manualUnbindBtn.addEventListener('click', function() {
      var k = prompt('请输入需要换绑解绑的卡密：');
      if (!k) return;
      var keyUpper = k.trim().toUpperCase();
      if (!keyUpper) return;
      performSelfUnbind(keyUpper);
    });
  }
})();
<\/script>
</body>
</html>`;
}
