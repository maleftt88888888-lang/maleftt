export function getPageHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<title>iOS Location Spoofer</title>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="iOSLoc">
<meta name="theme-color" content="#0a0c11">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="apple-touch-icon" href="/icon-180.png">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
:root {
  --bg:#0a0c11; --card:#12161d; --card2:#191e28; --line:#242b38; --inset:rgba(255,255,255,.045);
  --cyan:#17c3cf; --cyan2:#0e97a1; --green:#22c55e; --red:#ff5b60; --orange:#f5a623;
  --txt:#eef2f8; --muted:#8a93a5; --mono:#7fe3ea;
  --blue:#17c3cf; --gray:#8a93a5;
}
* { margin:0; padding:0; box-sizing:border-box; }
body {
  font-family:-apple-system,system-ui,"SF Pro","Helvetica Neue",sans-serif;
  color:var(--txt);
  background:
    radial-gradient(900px 380px at 50% -120px, rgba(23,195,207,.14), transparent 70%),
    radial-gradient(600px 300px at 92% 6%, rgba(34,197,94,.07), transparent 65%),
    var(--bg);
  background-attachment:fixed;
  min-height: 100vh;
}
::placeholder { color:#5d6675; }
::-webkit-scrollbar { width:6px; height:6px; }
::-webkit-scrollbar-thumb { background:#2b3342; border-radius:3px; }

.topbar { position:sticky; top:0; z-index:1200; display:flex; align-items:center; gap:10px; padding:11px 16px; background:rgba(10,12,17,.75); -webkit-backdrop-filter:blur(14px); backdrop-filter:blur(14px); border-bottom:1px solid rgba(255,255,255,.05); font-size:13px; color:var(--muted); }
.topbar .back { flex:none; color:#38bdf8; font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:4px; }
.topbar .back:active { opacity:.7; }

.support-banner {
  position: relative;
  overflow: hidden;
  margin: 14px 14px 0;
  padding: 14px 18px;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.09) 0%, rgba(18, 22, 29, 0.85) 100%);
  border: 1px solid rgba(34, 197, 94, 0.35);
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s;
  display: flex;
  align-items: stretch;
}
.support-banner:hover { border-color: rgba(34, 197, 94, 0.6); }
.support-banner:active { transform: scale(0.985); }
.banner-ambient { position: absolute; top: -30px; right: -30px; width: 120px; height: 120px; background: radial-gradient(circle, rgba(34, 197, 94, 0.25) 0%, transparent 70%); pointer-events: none; }
.banner-left-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--green); border-top-left-radius: 14px; border-bottom-left-radius: 14px; }
.banner-content { flex: 1; padding-left: 6px; }
.support-head { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.support-emoji { font-size: 15px; }
.support-title { color: #4ade80; font-size: 15px; font-weight: 700; letter-spacing: 0.2px; }
.copy-tag { margin-left: auto; font-size: 11px; color: #6ee7b7; background: rgba(34, 197, 94, 0.15); padding: 2px 8px; border-radius: 20px; font-weight: 500; }
.support-body { font-size: 13px; line-height: 1.6; color: #cbd5e1; }
.wechat-row { font-weight: 600; color: #f1f5f9; margin-bottom: 3px; }
.wechat-code { font-family: "SF Mono", ui-monospace, monospace; color: #4ade80; background: rgba(0, 0, 0, 0.25); padding: 1px 6px; border-radius: 4px; font-weight: 700; }
.disclaimer-text { font-size: 11.5px; color: #94a3b8; line-height: 1.45; }

#map { height:50vh; width:100%; min-height:250px; background:#0a0c11; border-bottom:1px solid var(--line); }
.leaflet-container { background:#0a0c11; }
.leaflet-control-zoom a { background:rgba(18,22,29,.9)!important; color:var(--txt)!important; border-color:var(--line)!important; -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); }
.leaflet-control-zoom a:hover { background:var(--card2)!important; }
.leaflet-bar { border:1px solid var(--line)!important; box-shadow:0 4px 18px rgba(0,0,0,.5)!important; }
.leaflet-control-attribution { background:rgba(10,12,17,.7)!important; color:#6b7484!important; }
.leaflet-control-attribution a { color:#8a93a5!important; }

.panel { padding:16px; max-width:600px; margin:0 auto; padding-bottom:calc(16px + env(safe-area-inset-bottom)); }

.card { background:linear-gradient(180deg,rgba(25,30,40,.72),rgba(18,22,29,.72)); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); border-radius:16px; padding:16px; margin-bottom:12px; box-shadow:0 8px 28px rgba(0,0,0,.34); }
.card h3 { font-size:15px; font-weight:700; margin-bottom:12px; color:var(--txt); display:flex; align-items:center; gap:8px; }
.card h3::before { content:""; width:3px; height:14px; border-radius:2px; background:linear-gradient(180deg,var(--cyan),var(--green)); flex:none; }

.coords { font-family:"SF Mono",ui-monospace,monospace; font-size:13.5px; color:var(--muted); padding:10px 12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; word-break:break-all; }
.crow { display:flex; align-items:center; gap:8px; padding:8px 12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; margin-bottom:6px; }
.crow .ck { font-size:11px; font-weight:700; letter-spacing:.6px; text-transform:uppercase; color:var(--cyan); width:34px; flex:none; }
.crow .cv { flex:1; min-width:0; font-family:"SF Mono",ui-monospace,monospace; font-size:14px; color:var(--mono); word-break:break-all; }
.copybtn { flex:none; }

.row { display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; }
.btn { flex:1; min-width:100px; padding:12px 16px; border:none; border-radius:11px; font-size:14px; font-weight:700; cursor:pointer; transition:all .15s; }
.btn-primary { background:linear-gradient(135deg,var(--cyan),var(--cyan2)); color:#022a2d; box-shadow:0 6px 18px rgba(23,195,207,.28); }
.btn-primary:active { filter:brightness(1.12); transform:scale(.97); }
.btn-secondary { background:var(--card2); color:#c3ccdb; border:1px solid var(--line); font-weight:600; }
.btn-secondary:active { background:#2a3140; transform:scale(.97); }
.btn-danger { background:transparent; color:#ff6b70; border:1px solid rgba(255,91,96,.55); }
.btn-danger:active { background:rgba(255,91,96,.12); transform:scale(.97); }
.btn-sm { flex:none; min-width:auto; padding:6px 12px; font-size:12px; border-radius:8px; }

.input-row { display:flex; gap:8px; margin-top:10px; }
.input-row input { flex:1; padding:10px 12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; font-size:14px; color:var(--txt); outline:none; min-width:0; -webkit-appearance:none; transition:border-color .15s,box-shadow .15s; }
.cvi { flex:1; min-width:0; width:100%; font-family:"SF Mono",ui-monospace,monospace; font-size:14px; color:var(--mono); padding:6px 10px; background:var(--inset); border:1px solid var(--line); border-radius:8px; outline:none; -webkit-appearance:none; }
.acc-row { display:flex; gap:8px; margin-bottom:6px; }
.accfield { flex:1; min-width:0; display:flex; flex-direction:column; gap:4px; }
.acclbl { font-size:11px; color:var(--muted); }
.accfield input { width:100%; padding:8px 10px; background:var(--inset); border:1px solid var(--line); border-radius:8px; font-size:14px; color:var(--txt); outline:none; }

.status { font-size:12px; color:var(--muted); margin-top:8px; text-align:center; }
.hint { font-size:11px; color:#6b7484; margin-top:8px; line-height:1.6; }
.accnote { margin-top:10px; padding:11px 13px; background:var(--inset); border:1px solid var(--line); border-left:3px solid var(--cyan); border-radius:9px; font-size:11.5px; color:#a8b1c0; line-height:1.85; }
.accnote b { display:block; color:var(--cyan); font-weight:800; font-size:12px; margin-bottom:6px; }
.accnote code { font-family:"SF Mono",ui-monospace,monospace; color:var(--mono); font-size:11px; }
.accnote em { color:var(--txt); font-style:normal; font-weight:800; }
.accnote .src { display:block; margin-top:7px; color:#5d6675; font-size:10.5px; }

.search-results { margin-top:8px; max-height:260px; overflow-y:auto; }
.search-item { padding:10px 12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; margin-bottom:6px; cursor:pointer; }
.search-item:active { background:#232a37; border-color:var(--cyan); }
.search-item .si-name { font-size:14px; color:var(--txt); font-weight:600; }
.search-item .si-sub { font-size:11px; color:var(--muted); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

.error-banner { background:linear-gradient(180deg,rgba(255,91,96,.18),rgba(255,91,96,.08)); border:1px solid rgba(255,91,96,.5); border-left:4px solid var(--red); color:#ffdcdc; padding:14px 16px; border-radius:12px; margin-bottom:12px; font-size:13.5px; line-height:1.6; display:none; }
.error-banner b { display:block; margin-bottom:4px; color:#ff6b70; font-size:14.5px; }

.wm { position:fixed; inset:0; z-index:9998; pointer-events:none; overflow:hidden; user-select:none; }
.wm-i { position:absolute; inset:-60%; display:flex; flex-wrap:wrap; align-content:flex-start; transform:rotate(-24deg); opacity:.11; }
.wm-i span { flex:none; padding:26px 30px; font-size:17.5px; font-weight:800; white-space:nowrap; color:#8fe0e6; letter-spacing:.4px; text-shadow:0 1px 3px rgba(0,0,0,.5); }

.toast { position:fixed; top:60px; left:50%; transform:translateX(-50%); background:rgba(8,10,14,.92); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); color:#fff; padding:11px 20px; border-radius:22px; font-size:14px; opacity:0; transition:opacity .3s; pointer-events:none; z-index:9999; max-width:90vw; text-align:center; box-shadow:0 8px 28px rgba(0,0,0,.5); }
.toast.show { opacity:1; }

.active-loc { background:var(--inset); border:1px solid var(--line); border-radius:10px; padding:11px 12px; font-size:13px; color:var(--txt); }
.active-loc .label { font-size:11px; color:var(--muted); margin-bottom:5px; }
.active-loc .value { font-family:"SF Mono",ui-monospace,monospace; font-size:13px; color:var(--mono); }

.fav-list { max-height:240px; overflow-y:auto; }
.fav-item { display:flex; align-items:center; gap:8px; padding:10px 12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; margin-bottom:6px; cursor:pointer; }
.fav-item:active { background:#232a37; border-color:var(--cyan); }
.fav-item .fav-info { flex:1; min-width:0; }
.fav-item .fav-name { font-size:14px; font-weight:600; color:var(--txt); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.fav-item .fav-coords { font-size:11px; color:var(--muted); font-family:"SF Mono",ui-monospace,monospace; margin-top:2px; }
.fav-item .fav-del { flex:none; width:28px; height:28px; border:none; border-radius:50%; background:transparent; color:var(--red); font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; }
.fav-empty { text-align:center; color:var(--muted); font-size:13px; padding:16px 0; }
.fav-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
.fav-header h3 { margin-bottom:0; }

.modal-overlay { position:fixed; inset:0; background:rgba(4,6,10,.66); -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px); z-index:10000; display:none; align-items:center; justify-content:center; padding:20px; }
.modal-overlay.show { display:flex; }
.modal { background:linear-gradient(180deg,#1a1f29,#12161d); border:1px solid var(--line); border-radius:18px; padding:20px; width:100%; max-width:340px; box-shadow:0 20px 60px rgba(0,0,0,.6); }
.modal h3 { font-size:17px; font-weight:700; margin-bottom:16px; text-align:center; color:var(--txt); }
.modal input { width:100%; padding:12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; font-size:15px; color:var(--txt); outline:none; margin-bottom:12px; }
.modal .modal-btns { display:flex; gap:8px; }

.layer-switch { position:absolute; top:10px; right:10px; z-index:1000; display:flex; gap:4px; background:rgba(10,12,17,.74); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); border-radius:10px; padding:4px; box-shadow:0 4px 18px rgba(0,0,0,.45); }
.layer-btn { border:none; background:transparent; padding:6px 10px; border-radius:7px; font-size:12px; font-weight:600; color:#a8b1c0; cursor:pointer; white-space:nowrap; }
.layer-btn.active { background:linear-gradient(135deg,var(--cyan),var(--cyan2)); color:#022a2d; font-weight:700; }
.lang-switch { position:absolute; top:10px; left:10px; z-index:1000; display:flex; gap:2px; background:rgba(10,12,17,.74); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); border-radius:10px; padding:4px; box-shadow:0 4px 18px rgba(0,0,0,.45); }
.lang-btn { border:none; background:transparent; padding:6px 11px; border-radius:7px; font-size:12px; font-weight:700; color:#a8b1c0; cursor:pointer; }
.lang-btn.active { background:linear-gradient(135deg,var(--cyan),var(--cyan2)); color:#022a2d; }
</style>
</head>
<body>
<div class="topbar">
  <a class="back" href="/">← 主页</a>
</div>

<div class="support-banner" onclick="copyWechat('LLME-love', this)" role="button" title="点击复制微信号">
  <div class="banner-ambient"></div>
  <div class="banner-left-bar"></div>
  <div class="banner-content">
    <div class="support-head">
      <span class="support-emoji">💬</span>
      <span class="support-title" data-i18n="support_title">技术支持</span>
      <span class="copy-tag" data-i18n="copy_tag">点击复制</span>
    </div>
    <div class="support-body">
      <div class="wechat-row">
        <span data-i18n="wechat_label">微信号：</span>
        <code class="wechat-code">LLME-love</code>
      </div>
      <p class="disclaimer-text" data-i18n="disclaimer_text">仅供学习研究，禁止违法用途，后果自负、与作者无关，与 Apple 无关。</p>
    </div>
  </div>
</div>

<div style="position:relative">
<div id="map"></div>
<div class="lang-switch">
  <button class="lang-btn" data-lang="zh" onclick="setLang('zh')">中</button>
  <button class="lang-btn" data-lang="en" onclick="setLang('en')">EN</button>
</div>
<div class="layer-switch">
  <button class="layer-btn active" data-layer="satellite" data-i18n="layer_satellite" onclick="switchLayer('satellite')">Satellite</button>
  <button class="layer-btn" data-layer="wgs84" onclick="switchLayer('wgs84')">WGS84</button>
  <button class="layer-btn" data-layer="amap" data-i18n="layer_amap" onclick="switchLayer('amap')">Amap</button>
  <button class="layer-btn" data-layer="voyager" data-i18n="layer_color" onclick="switchLayer('voyager')">Color</button>
  <button class="layer-btn" data-layer="standard" data-i18n="layer_standard" onclick="switchLayer('standard')">Standard</button>
  <button class="layer-btn" data-layer="dark" data-i18n="layer_dark" onclick="switchLayer('dark')">Dark</button>
</div>
</div>
<div class="panel">
  <div class="error-banner" id="errorBanner" data-i18n-html="err_html"></div>
  <div class="card">
    <h3 data-i18n="choose_title">Choose target location</h3>
    <div class="coords" id="coords" data-i18n="coords_hint">Tap the map or use the tools below to pick a location</div>
    <div id="coordGrid" style="display:none">
      <div class="crow"><span class="ck" data-i18n="lat">Lat</span><span class="cv" id="cvLat"></span><button class="btn btn-sm btn-secondary copybtn" data-i18n="copy" onclick="copyField('lat',this)">Copy</button></div>
      <div class="crow"><span class="ck" data-i18n="lon">Lon</span><span class="cv" id="cvLon"></span><button class="btn btn-sm btn-secondary copybtn" data-i18n="copy" onclick="copyField('lon',this)">Copy</button></div>
      <div class="crow"><span class="ck" data-i18n="alt">Alt</span><input class="cvi" id="altInput" type="number" inputmode="decimal" step="1" /><button class="btn btn-sm btn-secondary copybtn" data-i18n="copy" onclick="copyField('alt',this)">Copy</button></div>
      <div class="acc-row">
        <div class="accfield"><span class="acclbl" data-i18n="hacc">H. accuracy</span><input id="haccInput" type="number" inputmode="numeric" step="1" min="1" value="39" /></div>
        <div class="accfield"><span class="acclbl" data-i18n="vacc">V. accuracy</span><input id="vaccInput" type="number" inputmode="numeric" step="1" min="1" value="1000" /></div>
        <div class="accfield"><span class="acclbl" data-i18n="jitter">Jitter radius</span><input id="jitterInput" type="number" inputmode="numeric" step="1" min="0" value="0" /></div>
      </div>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="saveBtn" data-i18n="save" onclick="save()">Save to Device</button>
      <button class="btn btn-secondary" data-i18n="restore" onclick="restoreReal()">Restore real</button>
    </div>
    <div class="row">
      <button class="btn btn-secondary" data-i18n="copy_params" onclick="copyParams(this)">Copy module params</button>
      <button class="btn btn-secondary" data-i18n="add_fav" onclick="addFav()">Add Favorite</button>
      <button class="btn btn-secondary" data-i18n="locate" onclick="locateMe()">Current Location</button>
    </div>
    <div class="hint" data-i18n="alt_hint">Altitude is auto-filled from Open-Meteo (WGS-84) and editable. It is written to the device on Save and applied by the module.</div>
    <div class="accnote" data-i18n-html="acc_note_html"></div>
  </div>
  <div class="card">
    <div class="fav-header">
      <h3 data-i18n="fav_title">Favorites</h3>
      <button class="btn btn-sm btn-secondary" data-i18n="clear_all" onclick="clearAllFav()" id="clearAllBtn" style="display:none">Clear All</button>
    </div>
    <div id="favList" class="fav-list"></div>
  </div>
  <div class="card">
    <h3 data-i18n="active_title">Active coordinates</h3>
    <div class="active-loc" id="activeLoc">
      <div class="label" data-i18n="active_label">On-device coordinates (latitude/longitude/altitude)</div>
      <div class="value" id="activeValue">Querying...</div>
    </div>
    <div class="row">
      <button class="btn btn-sm btn-secondary" data-i18n="refresh" onclick="queryActive()">Refresh</button>
      <button class="btn btn-sm btn-danger" data-i18n="clear_data" onclick="clearActive()">Clear Data</button>
    </div>
  </div>
  <div class="card">
    <h3 data-i18n="paste_title">Paste map link</h3>
    <div class="input-row">
      <input id="urlInput" data-i18n-ph="paste_ph" placeholder="Apple/Google/Amap/Baidu map link or coordinates" />
      <button class="btn btn-secondary" style="flex:none;min-width:56px" data-i18n="parse" onclick="parseUrl()">Parse</button>
    </div>
    <div style="font-size:11px;color:var(--gray);margin-top:6px" data-i18n="paste_hint">Supports Apple Maps · Google Maps · Amap · Baidu · coordinate text (auto-converted to WGS-84)</div>
  </div>
  <div class="card">
    <h3 data-i18n="search_title">Search place</h3>
    <div class="input-row">
      <input id="searchInput" data-i18n-ph="search_ph" placeholder="Search a place, Enter to list candidates (preview only)" />
      <button class="btn btn-secondary" style="flex:none;min-width:56px" data-i18n="search" onclick="searchPlace()">Search</button>
    </div>
    <div id="searchResults" class="search-results"></div>
  </div>
  <div class="status" id="status">Pick a location, then tap "Save to Device" to write it to your proxy tool</div>
</div>
<div class="wm" id="wm" aria-hidden="true"><div class="wm-i" id="wmi"></div></div>
<div class="toast" id="toast"></div>
<div class="modal-overlay" id="favModal">
  <div class="modal">
    <h3 data-i18n="modal_title">Add this location to favorites</h3>
    <input id="favNameInput" data-i18n-ph="modal_ph" placeholder="Enter a label (e.g. Office, Home)" maxlength="30" />
    <div style="font-size:12px;color:var(--gray);margin-bottom:12px;text-align:center" id="favModalCoords"></div>
    <div class="modal-btns">
      <button class="btn btn-secondary" data-i18n="cancel" onclick="closeFavModal()">Cancel</button>
      <button class="btn btn-primary" data-i18n="save_short" onclick="confirmFav()">Save</button>
    </div>
  </div>
</div>
<script>
const SAVE_API = 'https://gs-loc.apple.com/ils-settings/save';
const PARSE_API = '/api/parse';
const FAV_KEY = 'ils_favorites';
const LANG_KEY = 'ils_lang';
let lat = 0, lon = 0;
let selected = false;
let elev = null;
const elevCache = new Map();
let activeLon = null, activeLat = null, activeAlt = null;
let savedLon = null, savedLat = null;

const I18N = {
  zh: {
    title: 'iOS 虚拟定位',
    support_title: '技术支持', copy_tag: '点击复制', copy_done: '✓ 已复制', wechat_label: '微信号：', disclaimer_text: '仅供学习研究，禁止违法用途，后果自负、与作者无关，与 Apple 无关。',
    layer_satellite: '卫星', layer_amap: '高德', layer_color: '彩色', layer_standard: '标准', layer_dark: '暗色',
    err_html: '<b>模块未生效</b>请检查以下配置：<br>1. 已安装并启用 iOS Location Spoofer 模块<br>2. MITM 已开启且信任证书<br>3. MITM 主机名包含 gs-loc.apple.com<br>4. 当前网络已走代理',
    choose_title: '选择目标位置',
    coords_hint: '点击地图或使用下方工具选择位置',
    save: '储存到设备', add_fav: '收藏位置', locate: '当前位置',
    copy: '复制', copy_params: '复制模块参数',
    lat: '纬度', lon: '经度', alt: '海拔',
    alt_hint: '海拔由 Open-Meteo 自动查询（WGS-84），储存到设备时随经纬度一并写入，由 iOS Location Spoofer 模块生效。',
    acc_note_html: '<b>精度参数怎么填</b>' +
      '<code>horizontalAccuracy</code> 水平精度（米），默认 <em>39</em>。<br>' +
      '<code>verticalAccuracy</code> 垂直精度（米），默认 <em>1000</em>。<br>' +
      '<code>扰动半径</code>（米），默认 <em>0</em>（关闭）。' +
      '<span class="src">参数建议来自上游项目 mekos2772 / ios-location-spoofer</span>',
    fav_title: '收藏的位置', clear_all: '清空全部',
    active_title: '当前生效坐标', active_label: '设备本地坐标 (latitude/longitude/altitude)',
    refresh: '刷新', clear_data: '清除数据',
    paste_title: '粘贴地图链接', paste_ph: 'Apple/Google/高德/百度地图链接 或 经纬度', parse: '解析',
    paste_hint: '支持 Apple Maps · Google Maps · 高德 · 百度 · 坐标文本（自动换算为 WGS-84）',
    search_title: '搜索地点', search_ph: '搜地名，回车列出候选（只预览，不改定位）', search: '搜索',
    status_hint: '选好位置后点击「储存到设备」写入代理工具',
    modal_title: '收藏此位置', modal_ph: '输入备注名称（如: 公司、家）', cancel: '取消', save_short: '保存',
    restore: '恢复真实定位', restored: '✓ 虚拟定位已清除，关闭定位开关并等待 10 秒后重新开启生效', hacc: '水平精度', vacc: '垂直精度', jitter: '扰动半径(米)',
    querying: '查询中...', no_saved: '无已保存的坐标', query_failed: '查询失败 (需要代理模块支持)',
    fav_empty: '暂无收藏，选好位置后点击「收藏位置」',
    pick_first: '请先在地图上选择一个位置', enter_label: '请输入备注名称',
    added: function(n){ return '已收藏: ' + n; }, deleted: function(n){ return '已删除: ' + n; },
    clear_fav_confirm: '确定清空所有收藏？', all_cleared: '已清空所有收藏',
    clear_confirm: '确定清除设备上已保存的坐标？', dev_cleared: '已清除设备坐标',
    clear_failed_cfg: '清除失败 - 请检查模块配置',
    saving: '储存中...', saved_toast: '✓ 坐标已成功写入模块，关闭定位开关等待 10 秒后重新开启生效',
    save_failed: '✗ 储存失败 - 请检查模块配置', no_geo: '浏览器不支持定位', getting_loc: '获取位置中...', got_loc: '已获取当前位置',
    loc_failed: function(m){ return '定位失败: ' + m; }, paste_first: '请粘贴地图链接或坐标', parse_failed: '无法解析坐标，请检查链接格式', parsing: '解析中...',
    parsed: function(lo, la){ return '已解析: ' + lo.toFixed(4) + ', ' + la.toFixed(4); }, enter_place: '请输入地名', searching: '搜索中...',
    not_found: function(q){ return '未找到: ' + q; }, search_failed: '搜索失败', copied: function(x){ return '已复制: ' + x; }, copy_failed: '复制失败，请手动选择'
  },
  en: {
    title: 'iOS Location Spoofer',
    support_title: 'Support', copy_tag: 'Tap to copy', copy_done: '✓ Copied', wechat_label: 'WeChat: ', disclaimer_text: 'For research only. Use at your own risk.',
    layer_satellite: 'Satellite', layer_amap: 'Amap', layer_color: 'Color', layer_standard: 'Standard', layer_dark: 'Dark',
    err_html: '<b>Module not active</b>Please check the following:<br>1. The iOS Location Spoofer module is installed and enabled<br>2. MITM is on and the certificate is trusted<br>3. The MITM hostname list includes gs-loc.apple.com<br>4. The current network is routed through the proxy',
    choose_title: 'Choose target location',
    coords_hint: 'Tap the map or use the tools below to pick a location',
    save: 'Save to Device', add_fav: 'Add Favorite', locate: 'Current Location',
    copy: 'Copy', copy_params: 'Copy module params',
    lat: 'Lat', lon: 'Lon', alt: 'Alt',
    alt_hint: 'Altitude is auto-filled from Open-Meteo (WGS-84), written to the device on Save, and applied by the iOS Location Spoofer module.',
    acc_note_html: '<b>Choosing accuracy values</b><span class="src">Guidance from mekos2772 / ios-location-spoofer</span>',
    fav_title: 'Favorites', clear_all: 'Clear All',
    active_title: 'Active coordinates', active_label: 'On-device coordinates (latitude/longitude/altitude)',
    refresh: 'Refresh', clear_data: 'Clear Data',
    paste_title: 'Paste map link', paste_ph: 'Apple / Google / Amap / Baidu map link or coordinates', parse: 'Parse',
    paste_hint: 'Supports Apple Maps · Google Maps · Amap · Baidu · coordinate text (auto-converted to WGS-84)',
    search_title: 'Search place', search_ph: 'Search a place, Enter to list candidates (preview only)', search: 'Search',
    status_hint: 'Pick a location, then tap "Save to Device" to write it to your proxy tool',
    modal_title: 'Add this location to favorites', modal_ph: 'Enter a label (e.g. Office, Home)', cancel: 'Cancel', save_short: 'Save',
    restore: 'Restore real location', restored: '✓ Spoofed location cleared. Turn Location Services OFF and wait 10 seconds.', hacc: 'H. accuracy', vacc: 'V. accuracy', jitter: 'Jitter radius(m)',
    querying: 'Querying...', no_saved: 'No saved coordinates', query_failed: 'Query failed (requires proxy module)',
    fav_empty: 'No favorites yet. Pick a location and tap "Add Favorite".',
    pick_first: 'Please pick a location on the map first', enter_label: 'Please enter a label',
    added: function(n){ return 'Added: ' + n; }, deleted: function(n){ return 'Deleted: ' + n; },
    clear_fav_confirm: 'Clear all favorites?', all_cleared: 'All favorites cleared',
    clear_confirm: 'Clear the coordinates saved on the device?', dev_cleared: 'Device coordinates cleared',
    clear_failed_cfg: 'Clear failed - please check module configuration',
    saving: 'Saving...', saved_toast: '✓ Coordinates written to module.',
    save_failed: '✗ Save failed - check module config', no_geo: 'Browser does not support geolocation', getting_loc: 'Getting location...', got_loc: 'Current location acquired',
    loc_failed: function(m){ return 'Location failed: ' + m; }, paste_first: 'Please paste a map link or coordinates', parse_failed: 'Could not parse coordinates', parsing: 'Parsing...',
    parsed: function(lo, la){ return 'Parsed: ' + lo.toFixed(4) + ', ' + la.toFixed(4); }, enter_place: 'Please enter a place name', searching: 'Searching...',
    not_found: function(q){ return 'Not found: ' + q; }, search_failed: 'Search failed', copied: function(x){ return 'Copied: ' + x; }, copy_failed: 'Copy failed'
  }
};

function detectLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'zh' || saved === 'en') return saved;
  } catch(e) {}
  return 'zh';
}
let lang = detectLang();

function t(key) {
  const v = I18N[lang][key];
  if (typeof v === 'function') return v.apply(null, Array.prototype.slice.call(arguments, 1));
  return v === undefined ? key : v;
}

function copyWechat(text, el) {
  navigator.clipboard.writeText(text).then(() => {
    const tag = el.querySelector('.copy-tag');
    if (tag) {
      const orig = tag.textContent;
      tag.textContent = t('copy_done');
      tag.style.background = 'rgba(34, 197, 94, 0.3)';
      setTimeout(() => {
        tag.textContent = orig;
        tag.style.background = 'rgba(34, 197, 94, 0.15)';
      }, 1800);
    }
  });
}

function applyI18n() {
  document.documentElement.lang = (lang === 'zh' ? 'zh-CN' : 'en');
  document.title = t('title');
  document.querySelectorAll('[data-i18n]').forEach(function(el){ el.textContent = t(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){ el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
  document.querySelectorAll('[data-i18n-html]').forEach(function(el){ el.innerHTML = t(el.getAttribute('data-i18n-html')); });
  document.querySelectorAll('.lang-btn').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
  updateCoords();
  renderActive();
  renderFavs();
}

function setLang(l) {
  lang = l;
  try { localStorage.setItem(LANG_KEY, l); } catch(e) {}
  applyI18n();
}

const map = L.map('map').setView([20, 0], 2);
const tiles = {
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {maxZoom:19, attribution:'ArcGIS'}),
  wgs84: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {maxZoom:19, attribution:'ArcGIS WGS84'}),
  amap: L.tileLayer('https://webst01.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}', {maxZoom:18, attribution:'Amap'}),
  voyager: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {maxZoom:19, attribution:'© Carto'}),
  standard: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19, attribution:'© OSM'}),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {maxZoom:19, attribution:'© Carto'})
};

let currentLayer = 'satellite';
tiles[currentLayer].addTo(map);

function switchLayer(l) {
  if (!tiles[l]) return;
  map.removeLayer(tiles[currentLayer]);
  tiles[l].addTo(map);
  currentLayer = l;
  document.querySelectorAll('.layer-btn').forEach(function(b){
    b.classList.toggle('active', b.getAttribute('data-layer') === l);
  });
}

let marker = null;
map.on('click', function(e) {
  lat = e.latlng.lat;
  lon = e.latlng.lng;
  selected = true;
  if (marker) marker.setLatLng(e.latlng);
  else marker = L.marker(e.latlng).addTo(map);
  updateCoords();
  fetchElev(lat, lon);
});

function updateCoords() {
  const grid = document.getElementById('coordGrid');
  const coordsEl = document.getElementById('coords');
  if (!selected) {
    if (grid) grid.style.display = 'none';
    if (coordsEl) coordsEl.style.display = 'block';
    return;
  }
  if (grid) grid.style.display = 'block';
  if (coordsEl) coordsEl.style.display = 'none';
  const cvLat = document.getElementById('cvLat');
  const cvLon = document.getElementById('cvLon');
  if (cvLat) cvLat.textContent = lat.toFixed(6);
  if (cvLon) cvLon.textContent = lon.toFixed(6);
  const altInp = document.getElementById('altInput');
  if (altInp && document.activeElement !== altInp) {
    altInp.value = elev !== null ? Math.round(elev) : '';
  }
}

async function fetchElev(la, lo) {
  const key = la.toFixed(4) + ',' + lo.toFixed(4);
  if (elevCache.has(key)) {
    elev = elevCache.get(key);
    updateCoords();
    return;
  }
  try {
    const res = await fetch(\`https://api.open-meteo.com/v1/elevation?latitude=\${la}&longitude=\${lo}\`);
    const data = await res.json();
    if (data && data.elevation !== undefined && data.elevation[0] !== null) {
      elev = data.elevation[0];
      elevCache.set(key, elev);
      updateCoords();
    }
  } catch(e) {}
}

function renderActive() {
  const valEl = document.getElementById('activeValue');
  if (!valEl) return;
  if (activeLat !== null && activeLon !== null) {
    valEl.textContent = \`\${activeLat.toFixed(6)}, \${activeLon.toFixed(6)}, alt: \${activeAlt || 0}m\`;
  } else {
    valEl.textContent = t('no_saved');
  }
}

let favorites = [];
try { favorites = JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch(e){}
function saveFavs() {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); } catch(e){}
  renderFavs();
}
function renderFavs() {
  const listEl = document.getElementById('favList');
  const clearBtn = document.getElementById('clearAllBtn');
  if (!listEl) return;
  if (favorites.length === 0) {
    listEl.innerHTML = \`<div class="fav-empty">\${t('fav_empty')}</div>\`;
    if (clearBtn) clearBtn.style.display = 'none';
    return;
  }
  if (clearBtn) clearBtn.style.display = 'block';
  listEl.innerHTML = favorites.map(function(f, i){
    return \`<div class="fav-item" onclick="loadFav(\${i})">
      <div class="fav-info">
        <div class="fav-name">\${f.name}</div>
        <div class="fav-coords">\${f.lat.toFixed(6)}, \${f.lon.toFixed(6)}</div>
      </div>
      <button class="fav-del" onclick="event.stopPropagation();delFav(\${i})">×</button>
    </div>\`;
  }).join('');
}
function loadFav(i) {
  const f = favorites[i];
  if (!f) return;
  lat = f.lat;
  lon = f.lon;
  selected = true;
  map.setView([lat, lon], 15);
  if (marker) marker.setLatLng([lat, lon]);
  else marker = L.marker([lat, lon]).addTo(map);
  updateCoords();
  fetchElev(lat, lon);
  showToast(t('parsed', lat, lon));
}
function addFav() {
  if (!selected) { showToast(t('pick_first')); return; }
  openFavModal();
}
function openFavModal() {
  const m = document.getElementById('favModal');
  const c = document.getElementById('favModalCoords');
  if (c) c.textContent = \`\${lat.toFixed(6)}, \${lon.toFixed(6)}\`;
  if (m) m.classList.add('show');
}
function closeFavModal() {
  const m = document.getElementById('favModal');
  if (m) m.classList.remove('show');
}
function confirmFav() {
  const nameInput = document.getElementById('favNameInput');
  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) { showToast(t('enter_label')); return; }
  favorites.push({ name: name, lat: lat, lon: lon });
  saveFavs();
  closeFavModal();
  if (nameInput) nameInput.value = '';
  showToast(t('added', name));
}
function delFav(i) {
  const item = favorites[i];
  favorites.splice(i, 1);
  saveFavs();
  if (item) showToast(t('deleted', item.name));
}
function clearAllFav() {
  if (!confirm(t('clear_fav_confirm'))) return;
  favorites = [];
  saveFavs();
  showToast(t('all_cleared'));
}

async function save() {
  if (!selected) { showToast(t('pick_first')); return; }
  const altVal = parseFloat(document.getElementById('altInput').value) || 0;
  const haccVal = parseFloat(document.getElementById('haccInput').value) || 39;
  const vaccVal = parseFloat(document.getElementById('vaccInput').value) || 1000;
  const jitterVal = parseFloat(document.getElementById('jitterInput').value) || 0;
  showToast(t('saving'));
  try {
    const res = await fetch(SAVE_API, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({lat: lat, lon: lon, alt: altVal, horizontalAccuracy: haccVal, verticalAccuracy: vaccVal, jitter: jitterVal})
    });
    if (res.ok) {
      activeLat = lat; activeLon = lon; activeAlt = altVal;
      savedLat = lat; savedLon = lon;
      renderActive();
      showToast(t('saved_toast'));
    } else {
      showToast(t('save_failed'));
    }
  } catch(e) {
    showToast(t('save_failed'));
  }
}

async function restoreReal() {
  try {
    await fetch('https://gs-loc.apple.com/ils-settings/clear', {method: 'POST'});
    activeLat = null; activeLon = null; activeAlt = null;
    renderActive();
    showToast(t('restored'));
  } catch(e) {
    showToast(t('clear_failed_cfg'));
  }
}

function copyField(type) {
  let val = '';
  if (type === 'lat') val = lat.toFixed(6);
  else if (type === 'lon') val = lon.toFixed(6);
  else if (type === 'alt') val = document.getElementById('altInput').value || '0';
  navigator.clipboard.writeText(val).then(function() {
    showToast(t('copied', val));
  }).catch(function() {
    showToast(t('copy_failed'));
  });
}

function copyParams() {
  const altVal = document.getElementById('altInput').value || '0';
  const haccVal = document.getElementById('haccInput').value || '39';
  const vaccVal = document.getElementById('vaccInput').value || '1000';
  const jitterVal = document.getElementById('jitterInput').value || '0';
  const str = \`lat=\${lat},lon=\${lon},alt=\${altVal},hacc=\${haccVal},vacc=\${vaccVal},jitter=\${jitterVal}\`;
  navigator.clipboard.writeText(str).then(function() {
    showToast(t('copied', 'params'));
  });
}

function locateMe() {
  if (!navigator.geolocation) { showToast(t('no_geo')); return; }
  showToast(t('getting_loc'));
  navigator.geolocation.getCurrentPosition(function(pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    selected = true;
    map.setView([lat, lon], 15);
    if (marker) marker.setLatLng([lat, lon]);
    else marker = L.marker([lat, lon]).addTo(map);
    updateCoords();
    fetchElev(lat, lon);
    showToast(t('got_loc'));
  }, function(err) {
    showToast(t('loc_failed', err.message));
  });
}

async function queryActive() {
  const valEl = document.getElementById('activeValue');
  if (valEl) valEl.textContent = t('querying');
  try {
    const res = await fetch('https://gs-loc.apple.com/ils-settings/status');
    if (res.ok) {
      const data = await res.json();
      if (data && data.lat !== undefined) {
        activeLat = data.lat; activeLon = data.lon; activeAlt = data.alt;
        renderActive();
        return;
      }
    }
  } catch(e) {}
  if (valEl) valEl.textContent = t('query_failed');
}

async function clearActive() {
  if (!confirm(t('clear_confirm'))) return;
  try {
    await fetch('https://gs-loc.apple.com/ils-settings/clear', {method: 'POST'});
    activeLat = null; activeLon = null; activeAlt = null;
    renderActive();
    showToast(t('dev_cleared'));
  } catch(e) {
    showToast(t('clear_failed_cfg'));
  }
}

async function parseUrl() {
  const val = document.getElementById('urlInput').value.trim();
  if (!val) { showToast(t('paste_first')); return; }
  showToast(t('parsing'));
  const coordMatch = val.match(/^(-?\d+\.\d+),\s*(-?\d+\.\d+)$/);
  if (coordMatch) {
    lat = parseFloat(coordMatch[1]);
    lon = parseFloat(coordMatch[2]);
    selected = true;
    map.setView([lat, lon], 15);
    if (marker) marker.setLatLng([lat, lon]);
    else marker = L.marker([lat, lon]).addTo(map);
    updateCoords();
    fetchElev(lat, lon);
    showToast(t('parsed', lat, lon));
    return;
  }
  try {
    const res = await fetch(PARSE_API + '?url=' + encodeURIComponent(val));
    if (res.ok) {
      const data = await res.json();
      if (data.lat && data.lon) {
        lat = data.lat; lon = data.lon; selected = true;
        map.setView([lat, lon], 15);
        if (marker) marker.setLatLng([lat, lon]);
        else marker = L.marker([lat, lon]).addTo(map);
        updateCoords();
        fetchElev(lat, lon);
        showToast(t('parsed', lat, lon));
        return;
      }
    }
    showToast(t('parse_failed'));
  } catch(e) {
    showToast(t('parse_failed'));
  }
}

async function searchPlace() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) { showToast(t('enter_place')); return; }
  showToast(t('searching'));
  try {
    const res = await fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(q));
    const data = await res.json();
    const resEl = document.getElementById('searchResults');
    if (!resEl) return;
    if (!data || data.length === 0) {
      resEl.innerHTML = \`<div class="search-item"><div class="si-name">\${t('not_found', q)}</div></div>\`;
      return;
    }
    resEl.innerHTML = data.slice(0, 5).map(function(item) {
      const escName = JSON.stringify(item.display_name).replace(/"/g, '&quot;');
      return \`<div class="search-item" onclick="selectSearchItem(\${item.lat}, \${item.lon}, \${escName})">
        <div class="si-name">\${item.display_name}</div>
        <div class="si-sub">\${item.lat}, \${item.lon}</div>
      </div>\`;
    }).join('');
  } catch(e) {
    showToast(t('search_failed'));
  }
}

function selectSearchItem(la, lo) {
  lat = parseFloat(la);
  lon = parseFloat(lo);
  selected = true;
  map.setView([lat, lon], 15);
  if (marker) marker.setLatLng([lat, lon]);
  else marker = L.marker([lat, lon]).addTo(map);
  updateCoords();
  fetchElev(lat, lon);
  showToast(t('parsed', lat, lon));
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 3000);
}

(function initWatermark() {
  const wmi = document.getElementById('wmi');
  if (wmi) {
    let html = '';
    for (let i = 0; i < 40; i++) {
      html += '<span>LLME-love · iOS Location Spoofer</span>';
    }
    wmi.innerHTML = html;
  }
})();

applyI18n();
queryActive();
  </script>
</body>
</html>\`;
}
