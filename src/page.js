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
}
::placeholder { color:#5d6675; }
::-webkit-scrollbar { width:6px; height:6px; }
::-webkit-scrollbar-thumb { background:#2b3342; border-radius:3px; }

.topbar { position:sticky; top:0; z-index:1200; display:flex; align-items:center; gap:10px; padding:10px 16px; background:rgba(10,12,17,.82); -webkit-backdrop-filter:blur(14px); backdrop-filter:blur(14px); border-bottom:1px solid var(--line); font-size:13px; color:var(--txt); font-weight:700; }
.topbar .back { flex:none; color:var(--cyan); font-weight:700; text-decoration:none; }
.topbar .topcredit { flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

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
.btn.success { background:linear-gradient(135deg,#2ee06a,#129a44); color:#04240f; border:none; box-shadow:0 6px 18px rgba(34,197,94,.3); }
.btn-sm { flex:none; min-width:auto; padding:6px 12px; font-size:12px; border-radius:8px; }

.input-row { display:flex; gap:8px; margin-top:10px; }
.input-row input { flex:1; padding:10px 12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; font-size:14px; color:var(--txt); outline:none; min-width:0; -webkit-appearance:none; transition:border-color .15s,box-shadow .15s; }
.cvi { flex:1; min-width:0; width:100%; font-family:"SF Mono",ui-monospace,monospace; font-size:14px; color:var(--mono); padding:6px 10px; background:var(--inset); border:1px solid var(--line); border-radius:8px; outline:none; -webkit-appearance:none; transition:border-color .15s,box-shadow .15s; }
.accfield input { width:100%; padding:8px 10px; background:var(--inset); border:1px solid var(--line); border-radius:8px; font-size:14px; color:var(--txt); outline:none; -webkit-appearance:none; transition:border-color .15s,box-shadow .15s; }
.input-row input:focus, .cvi:focus, .accfield input:focus, .modal input:focus { border-color:var(--cyan); box-shadow:0 0 0 3px rgba(23,195,207,.16); }
.acc-row { display:flex; gap:8px; margin-bottom:6px; }
.accfield { flex:1; min-width:0; display:flex; flex-direction:column; gap:4px; }
.acclbl { font-size:11px; color:var(--muted); }

.status { font-size:12px; color:var(--muted); margin-top:8px; text-align:center; }
.hint { font-size:11px; color:#6b7484; margin-top:8px; line-height:1.6; }
.accnote { margin-top:10px; padding:11px 13px; background:var(--inset); border:1px solid var(--line); border-left:3px solid var(--cyan); border-radius:9px; font-size:11.5px; color:#a8b1c0; line-height:1.85; }
.accnote b { display:block; color:var(--cyan); font-weight:800; font-size:12px; margin-bottom:6px; letter-spacing:.3px; }
.accnote code { font-family:"SF Mono",ui-monospace,monospace; color:var(--mono); font-size:11px; }
.accnote em { color:var(--txt); font-style:normal; font-weight:800; }
.accnote .src { display:block; margin-top:7px; color:#5d6675; font-size:10.5px; }

.search-results { margin-top:8px; max-height:260px; overflow-y:auto; }
.search-item { padding:10px 12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; margin-bottom:6px; cursor:pointer; transition:all .15s; }
.search-item:active { background:#232a37; border-color:var(--cyan); }
.search-item .si-name { font-size:14px; color:var(--txt); font-weight:600; }
.search-item .si-sub { font-size:11px; color:var(--muted); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

.error-banner { background:linear-gradient(180deg,rgba(255,91,96,.18),rgba(255,91,96,.08)); border:1px solid rgba(255,91,96,.5); border-left:4px solid var(--red); color:#ffdcdc; padding:14px 16px; border-radius:12px; margin-bottom:12px; font-size:13.5px; line-height:1.6; display:none; }
.error-banner b { display:block; margin-bottom:4px; color:#ff6b70; font-size:14.5px; }

.toast { position:fixed; top:60px; left:50%; transform:translateX(-50%); background:rgba(8,10,14,.92); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); color:#fff; padding:11px 20px; border-radius:22px; font-size:14px; opacity:0; transition:opacity .3s; pointer-events:none; z-index:9999; max-width:90vw; text-align:center; box-shadow:0 8px 28px rgba(0,0,0,.5); }
.toast.show { opacity:1; }

.active-loc { background:var(--inset); border:1px solid var(--line); border-radius:10px; padding:11px 12px; font-size:13px; color:var(--txt); }
.active-loc .label { font-size:11px; color:var(--muted); margin-bottom:5px; }
.active-loc .value { font-family:"SF Mono",ui-monospace,monospace; font-size:13px; color:var(--mono); }

.fav-list { max-height:240px; overflow-y:auto; }
.fav-item { display:flex; align-items:center; gap:8px; padding:10px 12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; margin-bottom:6px; cursor:pointer; transition:all .15s; }
.fav-item:active { background:#232a37; border-color:var(--cyan); }
.fav-item .fav-info { flex:1; min-width:0; }
.fav-item .fav-name { font-size:14px; font-weight:600; color:var(--txt); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.fav-item .fav-coords { font-size:11px; color:var(--muted); font-family:"SF Mono",ui-monospace,monospace; margin-top:2px; }
.fav-item .fav-active { font-size:10px; color:var(--green); font-weight:700; margin-top:2px; }
.fav-item .fav-del { flex:none; width:28px; height:28px; border:none; border-radius:50%; background:transparent; color:var(--red); font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .15s; }
.fav-item .fav-del:hover { background:rgba(255,91,96,.14); }
.fav-empty { text-align:center; color:var(--muted); font-size:13px; padding:16px 0; }
.fav-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
.fav-header h3 { margin-bottom:0; }

.modal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(4,6,10,.66); -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px); z-index:10000; display:none; align-items:center; justify-content:center; padding:20px; }
.modal-overlay.show { display:flex; }
.modal { background:linear-gradient(180deg,#1a1f29,#12161d); border:1px solid var(--line); border-radius:18px; padding:20px; width:100%; max-width:340px; box-shadow:0 20px 60px rgba(0,0,0,.6); }
.modal h3 { font-size:17px; font-weight:700; margin-bottom:16px; text-align:center; color:var(--txt); }
.modal input { width:100%; padding:12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; font-size:15px; color:var(--txt); outline:none; margin-bottom:12px; -webkit-appearance:none; transition:border-color .15s,box-shadow .15s; }
.modal .modal-btns { display:flex; gap:8px; }
.modal .modal-btns .btn { padding:12px; }

.layer-switch { position:absolute; top:10px; right:10px; z-index:1000; display:flex; gap:4px; background:rgba(10,12,17,.74); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); border-radius:10px; padding:4px; box-shadow:0 4px 18px rgba(0,0,0,.45); }
.layer-btn { border:none; background:transparent; padding:6px 10px; border-radius:7px; font-size:12px; font-weight:600; color:#a8b1c0; cursor:pointer; transition:all .15s; white-space:nowrap; }
.layer-btn.active { background:linear-gradient(135deg,var(--cyan),var(--cyan2)); color:#022a2d; font-weight:700; }
.layer-btn:active { transform:scale(.95); }
.lang-switch { position:absolute; top:10px; left:10px; z-index:1000; display:flex; gap:2px; background:rgba(10,12,17,.74); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); border-radius:10px; padding:4px; box-shadow:0 4px 18px rgba(0,0,0,.45); }
.lang-btn { border:none; background:transparent; padding:6px 11px; border-radius:7px; font-size:12px; font-weight:700; color:#a8b1c0; cursor:pointer; transition:all .15s; }
.lang-btn.active { background:linear-gradient(135deg,var(--cyan),var(--cyan2)); color:#022a2d; }
.lang-btn:active { transform:scale(.95); }

@media(max-width:480px) { #map { height:44vh; } .panel { padding:12px; } .layer-btn { padding:5px 7px; font-size:11px; } }
</style>
</head>
<body>
<div class="topbar">
  <a class="back" href="/">← 主页</a>
  <span class="topcredit">iOS Location Spoofer</span>
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
const ELEV_API = 'https://api.open-meteo.com/v1/elevation';
const FAV_KEY = 'ils_favorites';
const LANG_KEY = 'ils_lang';
let lat = 0, lon = 0;
let didInitialCenter = false;
let selected = false;
let elev = null, elevState = 'idle';
let elevSeq = 0, elevTimer = null;
const elevCache = new Map();
let activeLon = null, activeLat = null, activeAcc = null, activeAlt = null, activeStatus = 'querying';
let savedLon = null, savedLat = null, savedTimeStr = '';

const I18N = {
  zh: {
    title: 'iOS 虚拟定位',
    layer_satellite: '卫星', layer_amap: '高德', layer_color: '彩色', layer_standard: '标准', layer_dark: '暗色',
    err_html: '<b>模块未生效</b>请检查以下配置：<br>1. 已安装并启用 iOS Location Spoofer 模块<br>2. MITM 已开启且信任证书<br>3. MITM 主机名包含 gs-loc.apple.com<br>4. 当前网络已走代理',
    choose_title: '选择目标位置',
    coords_hint: '点击地图或使用下方工具选择位置',
    save: '储存到设备', add_fav: '收藏位置', locate: '当前位置',
    copy: '复制', copy_params: '复制模块参数',
    lat: '纬度', lon: '经度', alt: '海拔',
    alt_querying: '海拔查询中…', alt_na: '海拔不可用',
    alt_hint: '海拔由 Open-Meteo 自动查询（WGS-84），储存到设备时随经纬度一并写入，由 iOS Location Spoofer 模块生效。',
    acc_note_html: '<b>精度参数怎么填</b>' +
      '<code>horizontalAccuracy</code> 水平精度（米），默认 <em>39</em>，越小越「精准」—— 想更像 GPS 可设 <em>5~15</em>；保持 <em>39</em> 也正常。<br>' +
      '<code>verticalAccuracy</code> 垂直精度（米），默认 <em>1000</em> —— 本页已自动填入目标点真实海拔，可调小到 <em>10~30</em>，让海拔显得更可信。<br>' +
      '<code>扰动半径</code>（米），默认 <em>0</em>（关闭）—— 设为 <em>N</em> 后，每次定位在目标点周围 <em>N</em> 米内随机偏移，避免每次结果一模一样。想固定在精确坐标就留 <em>0</em>。',
    fav_title: '收藏的位置', clear_all: '清空全部',
    active_title: '当前生效坐标', active_label: '设备本地坐标 (latitude/longitude/altitude)',
    refresh: '刷新', clear_data: '清除数据',
    paste_title: '粘贴地图链接', paste_ph: 'Apple/Google/高德/百度地图链接 或 经纬度', parse: '解析',
    paste_hint: '支持 Apple Maps · Google Maps · 高德 · 百度 · 坐标文本（自动换算为 WGS-84）',
    search_title: '搜索地点', search_ph: '搜地名，回车列出候选（只预览，不改定位）', search: '搜索',
    status_hint: '选好位置后点击「储存到设备」写入代理工具',
    modal_title: '收藏此位置', modal_ph: '输入备注名称（如: 公司、家）', cancel: '取消', save_short: '保存',
    acc: '精度', restore: '恢复真实定位', restored: '✓ 虚拟定位已清除，定位服务开关关闭后，关掉代理开关，等待至少 10 秒钟，再次开启生效', hacc: '水平精度', vacc: '垂直精度', jitter: '扰动半径(米)',
    querying: '查询中...', no_saved: '无已保存的坐标', query_failed: '查询失败 (需要代理模块支持)', cleared: '已清除',
    fav_empty: '暂无收藏，选好位置后点击「收藏位置」',
    active_now: '✓ 当前生效', del: '删除',
    pick_first: '请先在地图上选择一个位置',
    enter_label: '请输入备注名称',
    added: function(n){ return '已收藏: ' + n; },
    deleted: function(n){ return '已删除: ' + n; },
    clear_fav_confirm: '确定清空所有收藏？', all_cleared: '已清空所有收藏',
    clear_confirm: '确定清除设备上已保存的坐标？清除后将使用模块默认参数或停止修改定位。',
    dev_cleared: '已清除设备坐标',
    clear_failed: function(e){ return '清除失败: ' + e; },
    clear_failed_cfg: '清除失败 - 请检查模块配置',
    saving: '储存中...', saved: '✓ 已储存',
    written: function(lo, la, ts){ return '✓ 已写入: ' + lo.toFixed(6) + ', ' + la.toFixed(6) + ' · ' + ts; },
    saved_toast: '✓ 坐标已成功写入模块，定位服务关闭开关，等待至少 10 秒钟，再次开启生效',
    save_failed: '✗ 储存失败 - 请检查模块配置', write_failed: '写入失败',
    no_geo: '浏览器不支持定位', getting_loc: '获取位置中...', got_loc: '已获取当前位置',
    loc_failed: function(m){ return '定位失败: ' + m; },
    paste_first: '请粘贴地图链接或坐标', parse_failed: '无法解析坐标，请检查链接格式', parsing: '解析中...',
    parsed: function(lo, la){ return '已解析: ' + lo.toFixed(4) + ', ' + la.toFixed(4); },
    enter_place: '请输入地名', searching: '搜索中...',
    not_found: function(q){ return '未找到: ' + q; }, search_failed: '搜索失败',
    copied: function(x){ return '已复制: ' + x; }, copy_failed: '复制失败，请手动选择',
    alt_unknown_copy: '海拔尚未获取，仅复制经纬度'
  },
  en: {
    title: 'iOS Location Spoofer',
    layer_satellite: 'Satellite', layer_amap: 'Amap', layer_color: 'Color', layer_standard: 'Standard', layer_dark: 'Dark',
    err_html: '<b>Module not active</b>Please check the following:<br>1. The iOS Location Spoofer module is installed and enabled<br>2. MITM is on and the certificate is trusted<br>3. The MITM hostname list includes gs-loc.apple.com<br>4. The current network is routed through the proxy',
    choose_title: 'Choose target location',
    coords_hint: 'Tap the map or use the tools below to pick a location',
    save: 'Save to Device', add_fav: 'Add Favorite', locate: 'Current Location',
    copy: 'Copy', copy_params: 'Copy module params',
    lat: 'Lat', lon: 'Lon', alt: 'Alt',
    alt_querying: 'querying altitude…', alt_na: 'altitude unavailable',
    alt_hint: 'Altitude is auto-filled from Open-Meteo (WGS-84), written to the device on Save, and applied by the iOS Location Spoofer module.',
    acc_note_html: '<b>Choosing the accuracy values</b>' +
      '<code>horizontalAccuracy</code> in metres, default <em>39</em> — the smaller, the more "precise" it looks. Set <em>5–15</em> to look more like GPS; <em>39</em> is perfectly fine too.<br>' +
      '<code>verticalAccuracy</code> in metres, default <em>1000</em> — this page already fills in the target\\'s real altitude, so lowering it to <em>10–30</em> makes that altitude look more credible.<br>' +
      '<code>Jitter radius</code> in metres, default <em>0</em> (off) — set to <em>N</em> and each positioning is randomly offset within <em>N</em> m of the target, so results are never identical. Leave <em>0</em> to stay pinned to the exact point.',
    fav_title: 'Favorites', clear_all: 'Clear All',
    active_title: 'Active coordinates', active_label: 'On-device coordinates (latitude/longitude/altitude)',
    refresh: 'Refresh', clear_data: 'Clear Data',
    paste_title: 'Paste map link', paste_ph: 'Apple / Google / Amap / Baidu map link or coordinates', parse: 'Parse',
    paste_hint: 'Supports Apple Maps · Google Maps · Amap · Baidu · coordinate text (auto-converted to WGS-84)',
    search_title: 'Search place', search_ph: 'Search a place, Enter to list candidates (preview only)', search: 'Search',
    status_hint: 'Pick a location, then tap "Save to Device" to write it to your proxy tool',
    modal_title: 'Add this location to favorites', modal_ph: 'Enter a label (e.g. Office, Home)', cancel: 'Cancel', save_short: 'Save',
    acc: 'Accuracy', restore: 'Restore real location', restored: '✓ Spoofed location cleared. Turn Location Services OFF, switch your proxy off, wait at least 10 seconds, then turn it back ON to take effect.', hacc: 'H. accuracy', vacc: 'V. accuracy', jitter: 'Jitter radius(m)',
    querying: 'Querying...', no_saved: 'No saved coordinates', query_failed: 'Query failed (requires the proxy module)', cleared: 'Cleared',
    fav_empty: 'No favorites yet. Pick a location and tap "Add Favorite".',
    active_now: '✓ Active now', del: 'Delete',
    pick_first: 'Please pick a location on the map first',
    enter_label: 'Please enter a label',
    added: function(n){ return 'Added: ' + n; },
    deleted: function(n){ return 'Deleted: ' + n; },
    clear_fav_confirm: 'Clear all favorites?', all_cleared: 'All favorites cleared',
    clear_confirm: 'Clear the coordinates saved on the device? After clearing, the module default parameters will be used or location spoofing will stop.',
    dev_cleared: 'Device coordinates cleared',
    clear_failed: function(e){ return 'Clear failed: ' + e; },
    clear_failed_cfg: 'Clear failed - please check the module configuration',
    saving: 'Saving...', saved: '✓ Saved',
    written: function(lo, la, ts){ return '✓ Written: ' + lo.toFixed(6) + ', ' + la.toFixed(6) + ' · ' + ts; },
    saved_toast: '✓ Coordinates written to the module. Turn Location Services OFF, wait at least 10 seconds, then turn it back ON to take effect.',
    save_failed: '✗ Save failed - please check the module configuration', write_failed: 'Write failed',
    no_geo: 'Browser does not support geolocation', getting_loc: 'Getting location...', got_loc: 'Current location acquired',
    loc_failed: function(m){ return 'Location failed: ' + m; },
    paste_first: 'Please paste a map link or coordinates', parse_failed: 'Could not parse coordinates, please check the link format', parsing: 'Parsing...',
    parsed: function(lo, la){ return 'Parsed: ' + lo.toFixed(4) + ', ' + la.toFixed(4); },
    enter_place: 'Please enter a place name', searching: 'Searching...',
    not_found: function(q){ return 'Not found: ' + q; }, search_failed: 'Search failed',
    copied: function(x){ return 'Copied: ' + x; }, copy_failed: 'Copy failed, please select manually',
    alt_unknown_copy: 'Altitude not ready, copied lat/lon only'
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

function applyI18n() {
  document.documentElement.lang = (lang === 'zh' ? 'zh-CN' : 'en');
  document.title = t('title');
  document.querySelectorAll('[data-i18n]').forEach(function(el){ el.textContent = t(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){ el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
  document.querySelectorAll('[data-i18n-html]').forEach(function(el){ el.innerHTML = t(el.getAttribute('data-i18n-html')); });
  document.querySelectorAll('.lang-btn').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
  updateCoords();
  updateStatus();
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
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
  }),
  wgs84: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }),
  amap: L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: '1234',
    attribution: '&copy; AutoNavi'
  }),
  voyager: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO'
  }),
  standard: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CARTO'
  })
};

let currentLayer = tiles.satellite.addTo(map);
let marker = null;

function switchLayer(layerKey) {
  if (tiles[layerKey]) {
    map.removeLayer(currentLayer);
    currentLayer = tiles[layerKey].addTo(map);
    document.querySelectorAll('.layer-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-layer') === layerKey);
    });
  }
}

function updateCoords() {
  const coordGrid = document.getElementById('coordGrid');
  const coordsHint = document.getElementById('coords');
  if (selected) {
    if (coordGrid) coordGrid.style.display = 'block';
    if (coordsHint) coordsHint.style.display = 'none';
    const cvLat = document.getElementById('cvLat');
    const cvLon = document.getElementById('cvLon');
    if (cvLat) cvLat.textContent = lat.toFixed(6);
    if (cvLon) cvLon.textContent = lon.toFixed(6);
  } else {
    if (coordGrid) coordGrid.style.display = 'none';
    if (coordsHint) coordsHint.style.display = 'block';
  }
}

function updateStatus() {
  const statusEl = document.getElementById('status');
  if (statusEl) statusEl.textContent = t('status_hint');
}

function renderActive() {
  const valEl = document.getElementById('activeValue');
  if (valEl) {
    valEl.textContent = activeLat !== null && activeLon !== null
      ? \`\${activeLat.toFixed(6)}, \${activeLon.toFixed(6)} (alt: \${activeAlt || 0}m)\`
      : t('no_saved');
  }
}

function renderFavs() {
  const favList = document.getElementById('favList');
  const clearBtn = document.getElementById('clearAllBtn');
  if (!favList) return;
  
  let favs = [];
  try {
    favs = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
  } catch(e) {}
  
  if (clearBtn) clearBtn.style.display = favs.length > 0 ? 'inline-block' : 'none';
  
  if (favs.length === 0) {
    favList.innerHTML = \`<div class="fav-empty">\${t('fav_empty')}</div>\`;
    return;
  }
  
  favList.innerHTML = favs.map((f, idx) => \`
    <div class="fav-item" onclick="jumpToFav(\${f.lat}, \${f.lon}, \${f.alt || 0})">
      <div class="fav-info">
        <div class="fav-name">\${f.name}</div>
        <div class="fav-coords">\${f.lat.toFixed(6)}, \${f.lon.toFixed(6)}</div>
      </div>
      <button class="fav-del" onclick="event.stopPropagation(); delFav(\${idx})">×</button>
    </div>
  \`).join('');
}

function fetchElevation(targetLat, targetLon) {
  const altInput = document.getElementById('altInput');
  const cacheKey = \`\${targetLat.toFixed(4)},\${targetLon.toFixed(4)}\`;
  if (elevCache.has(cacheKey)) {
    elev = elevCache.get(cacheKey);
    if (altInput) altInput.value = elev;
    return;
  }
  
  const currentSeq = ++elevSeq;
  fetch(\`\${ELEV_API}?latitude=\${targetLat}&longitude=\${targetLon}&elevation=wgs84\`)
    .then(r => r.json())
    .then(data => {
      if (currentSeq !== elevSeq) return;
      if (data && typeof data.elevation === 'number') {
        elev = Math.round(data.elevation);
        elevCache.set(cacheKey, elev);
        if (altInput) altInput.value = elev;
      }
    })
    .catch(() => {});
}

function queryActive() {
  const activeValue = document.getElementById('activeValue');
  if (activeValue) activeValue.textContent = t('querying');
  fetch('https://gs-loc.apple.com/ils-settings/current')
    .then(r => r.json())
    .then(d => {
      if (d && typeof d.lat === 'number' && typeof d.lon === 'number') {
        activeLat = d.lat;
        activeLon = d.lon;
        activeAlt = d.alt;
      }
      renderActive();
    })
    .catch(() => {
      if (activeValue) activeValue.textContent = t('query_failed');
    });
}

function clearActive() {
  if (!confirm(t('clear_confirm'))) return;
  fetch('https://gs-loc.apple.com/ils-settings/clear', { method: 'POST' })
    .then(() => {
      showToast(t('dev_cleared'));
      queryActive();
    })
    .catch(() => {
      showToast(t('clear_failed_cfg'));
    });
}

function save() {
  if (!selected) {
    alert(t('pick_first'));
    return;
  }
  const altInput = document.getElementById('altInput');
  const haccInput = document.getElementById('haccInput');
  const vaccInput = document.getElementById('vaccInput');
  const jitterInput = document.getElementById('jitterInput');
  
  const payload = {
    lat: lat,
    lon: lon,
    alt: altInput ? parseFloat(altInput.value) || 0 : 0,
    horizontalAccuracy: haccInput ? parseFloat(haccInput.value) || 39 : 39,
    verticalAccuracy: vaccInput ? parseFloat(vaccInput.value) || 1000 : 1000,
    jitterRadius: jitterInput ? parseFloat(jitterInput.value) || 0 : 0
  };
  
  showToast(t('saving'));
  fetch(SAVE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(r => {
      if (r.ok) {
        showToast(t('saved_toast'));
        queryActive();
      } else {
        showToast(t('save_failed'));
      }
    })
    .catch(() => {
      showToast(t('save_failed'));
    });
}

function restoreReal() {
  fetch('https://gs-loc.apple.com/ils-settings/restore', { method: 'POST' })
    .then(() => {
      showToast(t('restored'));
      queryActive();
    })
    .catch(() => {
      showToast(t('clear_failed_cfg'));
    });
}

function jumpToFav(targetLat, targetLon, targetAlt) {
  lat = targetLat;
  lon = targetLon;
  selected = true;
  map.setView([lat, lon], 15);
  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, lon]).addTo(map);
  updateCoords();
  const altInput = document.getElementById('altInput');
  if (altInput) altInput.value = targetAlt;
}

function delFav(idx) {
  try {
    let favs = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
    favs.splice(idx, 1);
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    renderFavs();
  } catch(e) {}
}

function clearAllFav() {
  if (!confirm(t('clear_fav_confirm'))) return;
  localStorage.removeItem(FAV_KEY);
  renderFavs();
  showToast(t('all_cleared'));
}

function addFav() {
  if (!selected) {
    alert(t('pick_first'));
    return;
  }
  const modal = document.getElementById('favModal');
  const coordsEl = document.getElementById('favModalCoords');
  const nameInput = document.getElementById('favNameInput');
  if (coordsEl) coordsEl.textContent = \`\${lat.toFixed(6)}, \${lon.toFixed(6)}\`;
  if (nameInput) nameInput.value = '';
  if (modal) modal.classList.add('show');
}

function closeFavModal() {
  const modal = document.getElementById('favModal');
  if (modal) modal.classList.remove('show');
}

function confirmFav() {
  const nameInput = document.getElementById('favNameInput');
  const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : \`Loc \${lat.toFixed(2)}, \${lon.toFixed(2)}\`;
  const altInput = document.getElementById('altInput');
  try {
    let favs = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
    favs.push({
      name: name,
      lat: lat,
      lon: lon,
      alt: altInput ? parseFloat(altInput.value) || 0 : 0
    });
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    renderFavs();
    closeFavModal();
    showToast(t('added')(name));
  } catch(e) {}
}

function locateMe() {
  if (!navigator.geolocation) {
    alert(t('no_geo'));
    return;
  }
  showToast(t('getting_loc'));
  navigator.geolocation.getCurrentPosition(pos => {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    selected = true;
    map.setView([lat, lon], 16);
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lon]).addTo(map);
    updateCoords();
    fetchElevation(lat, lon);
    showToast(t('got_loc'));
  }, err => {
    alert(t('loc_failed')(err.message));
  });
}

function parseUrl() {
  const urlInput = document.getElementById('urlInput');
  const val = urlInput ? urlInput.value.trim() : '';
  if (!val) {
    alert(t('paste_first'));
    return;
  }
  showToast(t('parsing'));
  fetch(PARSE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: val })
  })
    .then(r => r.json())
    .then(res => {
      if (res && typeof res.lat === 'number' && typeof res.lon === 'number') {
        lat = res.lat;
        lon = res.lon;
        selected = true;
        map.setView([lat, lon], 16);
        if (marker) map.removeLayer(marker);
        marker = L.marker([lat, lon]).addTo(map);
        updateCoords();
        fetchElevation(lat, lon);
        showToast(t('parsed')(lon, lat));
      } else {
        alert(t('parse_failed'));
      }
    })
    .catch(() => {
      alert(t('parse_failed'));
    });
}

function searchPlace() {
  const searchInput = document.getElementById('searchInput');
  const q = searchInput ? searchInput.value.trim() : '';
  const resultsEl = document.getElementById('searchResults');
  if (!q) {
    alert(t('enter_place'));
    return;
  }
  if (resultsEl) resultsEl.innerHTML = \`<div class="search-item">\${t('searching')}</div>\`;
  fetch(\`https://nominatim.openstreetmap.org/search?format=json&q=\${encodeURIComponent(q)}\`)
    .then(r => r.json())
    .then(data => {
      if (!data || data.length === 0) {
        if (resultsEl) resultsEl.innerHTML = \`<div class="search-item">\${t('not_found')(q)}</div>\`;
        return;
      }
      if (resultsEl) {
        resultsEl.innerHTML = data.slice(0, 5).map(item => \`
          <div class="search-item" onclick="jumpToFav(\${parseFloat(item.lat)}, \${parseFloat(item.lon)}, 0)">
            <div class="si-name">\${item.display_name}</div>
            <div class="si-sub">\${item.lat}, \${item.lon}</div>
          </div>
        \`).join('');
      }
    })
    .catch(() => {
      if (resultsEl) resultsEl.innerHTML = \`<div class="search-item">\${t('search_failed')}</div>\`;
    });
}

function copyField(type, btnEl) {
  let textToCopy = '';
  if (type === 'lat') textToCopy = lat.toString();
  else if (type === 'lon') textToCopy = lon.toString();
  else if (type === 'alt') {
    const altInput = document.getElementById('altInput');
    textToCopy = altInput ? altInput.value : '0';
  }
  
  navigator.clipboard.writeText(textToCopy).then(() => {
    const origText = btnEl.textContent;
    btnEl.textContent = '✓';
    setTimeout(() => { btnEl.textContent = origText; }, 1200);
  }).catch(() => {
    alert(t('copy_failed'));
  });
}

function copyParams(btnEl) {
  const altInput = document.getElementById('altInput');
  const haccInput = document.getElementById('haccInput');
  const vaccInput = document.getElementById('vaccInput');
  const jitterInput = document.getElementById('jitterInput');
  
  const params = {
    lat: lat,
    lon: lon,
    alt: altInput ? parseFloat(altInput.value) || 0 : 0,
    horizontalAccuracy: haccInput ? parseFloat(haccInput.value) || 39 : 39,
    verticalAccuracy: vaccInput ? parseFloat(vaccInput.value) || 1000 : 1000,
    jitterRadius: jitterInput ? parseFloat(jitterInput.value) || 0 : 0
  };
  
  navigator.clipboard.writeText(JSON.stringify(params, null, 2)).then(() => {
    const origText = btnEl.textContent;
    btnEl.textContent = '✓ Copied';
    setTimeout(() => { btnEl.textContent = origText; }, 1500);
  }).catch(() => {
    alert(t('copy_failed'));
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

map.on('click', function(e) {
  lat = e.latlng.lat;
  lon = e.latlng.lng;
  selected = true;
  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, lon]).addTo(map);
  updateCoords();
  fetchElevation(lat, lon);
});

applyI18n();
queryActive();
renderFavs();
</script>
</body>
</html>`;
}
