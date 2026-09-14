export function getPageHtml() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
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

.topbar { position:sticky; top:0; z-index:1200; display:flex; align-items:center; gap:10px; padding:12px 16px; background:rgba(10,12,17,.82); -webkit-backdrop-filter:blur(14px); backdrop-filter:blur(14px); border-bottom:1px solid var(--line); font-size:13px; color:var(--muted); }
.topbar .back { flex:none; color:var(--cyan); font-weight:700; text-decoration:none; }
.topbar .topcredit { flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight:600; color:var(--txt); }

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
  <span class="topcredit">📍 iOS 虚拟定位 · 网页选点工具</span>
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
const GET_API = 'https://gs-loc.apple.com/ils-settings/get';
const CLEAR_API = 'https://gs-loc.apple.com/ils-settings/clear';
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
    acc_note_html: '<b>精度参数设置</b><br>' +
      '<code>horizontalAccuracy</code> 水平精度（米），默认 <em>39</em>，设为 <em>5~15</em> 更接近标准 GPS。<br>' +
      '<code>verticalAccuracy</code> 垂直精度（米），默认 <em>1000</em>，设置 <em>10~30</em> 让海拔表现更真实。<br>' +
      '<code>扰动半径</code>（米），默认 <em>0</em>（关闭）。设为 <em>N</em> 后定位将在目标点 <em>N</em> 米内随机偏移。',
    fav_title: '收藏的位置', clear_all: '清空全部',
    active_title: '当前生效坐标', active_label: '设备本地坐标 (latitude/longitude/altitude)',
    refresh: '刷新', clear_data: '清除数据',
    paste_title: '粘贴地图链接', paste_ph: 'Apple/Google/高德/百度地图链接 或 经纬度', parse: '解析',
    paste_hint: '支持 Apple Maps · Google Maps · 高德 · 百度 · 坐标文本（自动换算为 WGS-84）',
    search_title: '搜索地点', search_ph: '搜索地名以预览候选点', search: '搜索',
    status_hint: '选好位置后点击「储存到设备」写入配置',
    modal_title: '收藏此位置', modal_ph: '输入备注名称（如: 公司、家）', cancel: '取消', save_short: '保存',
    acc: '精度', restore: '恢复真实定位', restored: '✓ 已发送清除请求，请关掉定位服务并重新开启以生效', hacc: '水平精度', vacc: '垂直精度', jitter: '扰动半径(米)',
    querying: '查询中...', no_saved: '无已保存的坐标', query_failed: '查询失败 (需要代理模块支持)', cleared: '已清除',
    fav_empty: '暂无收藏，选好位置后点击「收藏位置」',
    active_now: '✓ 当前生效', del: '删除',
    pick_first: '请先在地图上选择一个位置',
    enter_label: '请输入备注名称',
    added: function(n){ return '已收藏: ' + n; },
    deleted: function(n){ return '已删除: ' + n; },
    clear_fav_confirm: '确定清空所有收藏？', all_cleared: '已清空所有收藏',
    clear_confirm: '确定清除设备上已保存的坐标？',
    dev_cleared: '已清除设备坐标',
    clear_failed: function(e){ return '清除失败: ' + e; },
    clear_failed_cfg: '清除失败 - 请检查模块配置',
    saving: '储存中...', saved: '✓ 已储存',
    written: function(lo, la, ts){ return '✓ 已写入: ' + lo.toFixed(6) + ', ' + la.toFixed(6); },
    saved_toast: '✓ 坐标已成功写入设备',
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
    err_html: '<b>Module not active</b>Please check module and proxy configuration.',
    choose_title: 'Choose target location',
    coords_hint: 'Tap the map or use the tools below to pick a location',
    save: 'Save to Device', add_fav: 'Add Favorite', locate: 'Current Location',
    copy: 'Copy', copy_params: 'Copy module params',
    lat: 'Lat', lon: 'Lon', alt: 'Alt',
    alt_querying: 'querying altitude…', alt_na: 'altitude unavailable',
    alt_hint: 'Altitude is auto-filled from Open-Meteo (WGS-84) and saved to device.',
    acc_note_html: '<b>Accuracy Settings</b><br>' +
      '<code>horizontalAccuracy</code> default <em>39</em>.<br>' +
      '<code>verticalAccuracy</code> default <em>1000</em>.<br>' +
      '<code>Jitter radius</code> default <em>0</em>.',
    fav_title: 'Favorites', clear_all: 'Clear All',
    active_title: 'Active coordinates', active_label: 'On-device coordinates',
    refresh: 'Refresh', clear_data: 'Clear Data',
    paste_title: 'Paste map link', paste_ph: 'Map link or coordinates', parse: 'Parse',
    paste_hint: 'Supports Apple Maps / Google Maps / Amap / Baidu (auto WGS-84)',
    search_title: 'Search place', search_ph: 'Search place name', search: 'Search',
    status_hint: 'Pick a location and save',
    modal_title: 'Add to favorites', modal_ph: 'Label name', cancel: 'Cancel', save_short: 'Save',
    acc: 'Accuracy', restore: 'Restore real location', restored: '✓ Location reset command sent', hacc: 'H. accuracy', vacc: 'V. accuracy', jitter: 'Jitter radius(m)',
    querying: 'Querying...', no_saved: 'No saved coordinates', query_failed: 'Query failed', cleared: 'Cleared',
    fav_empty: 'No favorites yet.',
    active_now: '✓ Active now', del: 'Delete',
    pick_first: 'Please pick a location first',
    enter_label: 'Please enter a label',
    added: function(n){ return 'Added: ' + n; },
    deleted: function(n){ return 'Deleted: ' + n; },
    clear_fav_confirm: 'Clear all favorites?', all_cleared: 'All favorites cleared',
    clear_confirm: 'Clear saved coordinates on device?',
    dev_cleared: 'Device coordinates cleared',
    clear_failed: function(e){ return 'Clear failed: ' + e; },
    clear_failed_cfg: 'Clear failed',
    saving: 'Saving...', saved: '✓ Saved',
    written: function(lo, la, ts){ return '✓ Written: ' + lo.toFixed(6) + ', ' + la.toFixed(6); },
    saved_toast: '✓ Coordinates saved',
    save_failed: '✗ Save failed', write_failed: 'Write failed',
    no_geo: 'Geolocation unsupported', getting_loc: 'Getting location...', got_loc: 'Location acquired',
    loc_failed: function(m){ return 'Location failed: ' + m; },
    paste_first: 'Paste a link first', parse_failed: 'Could not parse coordinates', parsing: 'Parsing...',
    parsed: function(lo, la){ return 'Parsed: ' + lo.toFixed(4) + ', ' + la.toFixed(4); },
    enter_place: 'Enter a place name', searching: 'Searching...',
    not_found: function(q){ return 'Not found: ' + q; }, search_failed: 'Search failed',
    copied: function(x){ return 'Copied: ' + x; }, copy_failed: 'Copy failed',
    alt_unknown_copy: 'Altitude unavailable, copied lat/lon only'
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
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: 'Esri' }),
  wgs84: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }),
  amap: L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', { subdomains: '1234', maxZoom: 18, attribution: '高德地图' }),
  voyager: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© CARTO' }),
  standard: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© CARTO' }),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19, attribution: '© CARTO' })
};

let currentLayer = tiles.satellite;
currentLayer.addTo(map);

function switchLayer(name) {
  if (currentLayer) map.removeLayer(currentLayer);
  currentLayer = tiles[name] || tiles.satellite;
  currentLayer.addTo(map);
  document.querySelectorAll('.layer-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-layer') === name);
  });
}

let marker = null;
map.on('click', e => { setPoint(e.latlng.lat, e.latlng.lng); });

function setPoint(la, lo) {
  lat = la; lon = lo; selected = true;
  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, lon]).addTo(map);
  updateCoords();
  fetchAltitude(lat, lon);
}

function fetchAltitude(la, lo) {
  const key = la.toFixed(4) + ',' + lo.toFixed(4);
  if (elevCache.has(key)) {
    elev = elevCache.get(key);
    elevState = 'ok';
    updateCoords();
    return;
  }
  elevState = 'loading';
  updateCoords();
  const seq = ++elevSeq;
  if (elevTimer) clearTimeout(elevTimer);
  elevTimer = setTimeout(() => {
    fetch(ELEV_API + '?latitude=' + la.toFixed(5) + '&longitude=' + lo.toFixed(5))
      .then(r => r.json())
      .then(d => {
        if (seq !== elevSeq) return;
        if (d && Array.isArray(d.elevation) && d.elevation.length > 0) {
          elev = Math.round(d.elevation[0]);
          elevCache.set(key, elev);
          elevState = 'ok';
        } else {
          elevState = 'fail';
        }
        updateCoords();
      })
      .catch(() => {
        if (seq !== elevSeq) return;
        elevState = 'fail';
        updateCoords();
      });
  }, 200);
}

function updateCoords() {
  const grid = document.getElementById('coordGrid');
  const txt = document.getElementById('coords');
  if (!selected) {
    txt.style.display = 'block';
    grid.style.display = 'none';
    txt.textContent = t('coords_hint');
    return;
  }
  txt.style.display = 'none';
  grid.style.display = 'block';
  document.getElementById('cvLat').textContent = lat.toFixed(6);
  document.getElementById('cvLon').textContent = lon.toFixed(6);
  const altEl = document.getElementById('altInput');
  if (elevState === 'loading') {
    altEl.placeholder = t('alt_querying');
    if (document.activeElement !== altEl && elev === null) altEl.value = '';
  } else if (elevState === 'fail' && elev === null) {
    altEl.placeholder = t('alt_na');
    if (document.activeElement !== altEl) altEl.value = '';
  } else if (elev !== null && document.activeElement !== altEl) {
    altEl.value = elev;
  }
}

function updateStatus(msg) {
  const s = document.getElementById('status');
  if (msg) { s.textContent = msg; return; }
  s.textContent = t('status_hint');
}

function showToast(m) {
  const tEl = document.getElementById('toast');
  tEl.textContent = m; tEl.classList.add('show');
  setTimeout(() => tEl.classList.remove('show'), 3000);
}

function save() {
  if (!selected) { showToast(t('pick_first')); return; }
  const altVal = parseFloat(document.getElementById('altInput').value) || 0;
  const haccVal = parseInt(document.getElementById('haccInput').value, 10) || 39;
  const vaccVal = parseInt(document.getElementById('vaccInput').value, 10) || 1000;
  const jitterVal = parseInt(document.getElementById('jitterInput').value, 10) || 0;
  
  const payload = {
    latitude: lat,
    longitude: lon,
    altitude: altVal,
    horizontalAccuracy: haccVal,
    verticalAccuracy: vaccVal,
    jitterRadius: jitterVal
  };
  
  const b = document.getElementById('saveBtn');
  b.disabled = true; b.textContent = t('saving');
  
  fetch(SAVE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(d => {
    b.disabled = false; b.textContent = t('save');
    showToast(t('saved_toast'));
    queryActive();
  })
  .catch(e => {
    b.disabled = false; b.textContent = t('save');
    showToast(t('save_failed'));
  });
}

function restoreReal() {
  if (!confirm(t('clear_confirm'))) return;
  fetch(CLEAR_API, { method: 'POST' })
    .then(() => {
      showToast(t('restored'));
      queryActive();
    })
    .catch(() => showToast(t('clear_failed_cfg')));
}

function queryActive() {
  fetch(GET_API)
    .then(r => r.json())
    .then(d => {
      document.getElementById('errorBanner').style.display = 'none';
      if (d && d.latitude !== undefined) {
        activeLat = d.latitude;
        activeLon = d.longitude;
        activeAlt = d.altitude;
        activeStatus = 'ok';
      } else {
        activeStatus = 'empty';
      }
      renderActive();
    })
    .catch(() => {
      document.getElementById('errorBanner').style.display = 'block';
      activeStatus = 'fail';
      renderActive();
    });
}

function clearActive() {
  restoreReal();
}

function renderActive() {
  const el = document.getElementById('activeValue');
  if (activeStatus === 'ok') {
    el.textContent = activeLat.toFixed(6) + ', ' + activeLon.toFixed(6) + ' (' + (activeAlt || 0) + 'm)';
  } else if (activeStatus === 'empty') {
    el.textContent = t('no_saved');
  } else if (activeStatus === 'fail') {
    el.textContent = t('query_failed');
  } else {
    el.textContent = t('querying');
  }
}

function copyParams(btn) {
  if (!selected) { showToast(t('pick_first')); return; }
  const altVal = parseFloat(document.getElementById('altInput').value) || 0;
  const txt = 'lat=' + lat.toFixed(6) + '&lon=' + lon.toFixed(6) + '&alt=' + altVal;
  navigator.clipboard.writeText(txt).then(() => showToast(t('copied', txt)));
}

function copyField(type, btn) {
  let val = '';
  if (type === 'lat') val = lat.toFixed(6);
  if (type === 'lon') val = lon.toFixed(6);
  if (type === 'alt') val = document.getElementById('altInput').value;
  navigator.clipboard.writeText(val).then(() => showToast(t('copied', val)));
}

function locateMe() {
  if (!navigator.geolocation) { showToast(t('no_geo')); return; }
  showToast(t('getting_loc'));
  navigator.geolocation.getCurrentPosition(p => {
    setPoint(p.coords.latitude, p.coords.longitude);
    map.setView([p.coords.latitude, p.coords.longitude], 15);
    showToast(t('got_loc'));
  }, e => showToast(t('loc_failed', e.message)));
}

/* Favorites */
function getFavs() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch(e) { return []; }
}
function saveFavs(arr) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(arr)); } catch(e) {}
}
function addFav() {
  if (!selected) { showToast(t('pick_first')); return; }
  document.getElementById('favModalCoords').textContent = lat.toFixed(6) + ', ' + lon.toFixed(6);
  document.getElementById('favModal').classList.add('show');
}
function closeFavModal() {
  document.getElementById('favModal').classList.remove('show');
}
function confirmFav() {
  const name = document.getElementById('favNameInput').value.trim();
  if (!name) { alert(t('enter_label')); return; }
  const favs = getFavs();
  favs.push({ name, lat, lon, alt: document.getElementById('altInput').value });
  saveFavs(favs);
  closeFavModal();
  document.getElementById('favNameInput').value = '';
  renderFavs();
  showToast(t('added', name));
}
function clearAllFav() {
  if (!confirm(t('clear_fav_confirm'))) return;
  saveFavs([]);
  renderFavs();
  showToast(t('all_cleared'));
}
function renderFavs() {
  const favs = getFavs();
  const list = document.getElementById('favList');
  const clearBtn = document.getElementById('clearAllBtn');
  if (favs.length === 0) {
    list.innerHTML = '<div class="fav-empty">' + t('fav_empty') + '</div>';
    clearBtn.style.display = 'none';
    return;
  }
  clearBtn.style.display = 'block';
  list.innerHTML = favs.map((f, i) => \`
    <div class="fav-item" onclick="setPoint(\${f.lat}, \${f.lon}); map.setView([\${f.lat}, \${f.lon}], 15)">
      <div class="fav-info">
        <div class="fav-name">\${f.name}</div>
        <div class="fav-coords">\${f.lat.toFixed(6)}, \${f.lon.toFixed(6)}</div>
      </div>
      <button class="fav-del" onclick="event.stopPropagation(); deleteFav(\${i})">×</button>
    </div>
  \`).join('');
}
function deleteFav(i) {
  const favs = getFavs();
  const deleted = favs.splice(i, 1);
  saveFavs(favs);
  renderFavs();
  if (deleted[0]) showToast(t('deleted', deleted[0].name));
}

/* Parse Link & Search */
function parseUrl() {
  const val = document.getElementById('urlInput').value.trim();
  if (!val) { showToast(t('paste_first')); return; }
  showToast(t('parsing'));
  fetch(PARSE_API + '?u=' + encodeURIComponent(val) + '&format=json')
    .then(r => r.json())
    .then(d => {
      if (d && d.lat && d.lon) {
        setPoint(d.lat, d.lon);
        map.setView([d.lat, d.lon], 15);
        showToast(t('parsed', d.lon, d.lat));
      } else {
        showToast(t('parse_failed'));
      }
    })
    .catch(() => showToast(t('parse_failed')));
}

function searchPlace() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) { showToast(t('enter_place')); return; }
  showToast(t('searching'));
  fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(q))
    .then(r => r.json())
    .then(d => {
      const res = document.getElementById('searchResults');
      if (d && d.length > 0) {
        res.innerHTML = d.map(item => \`
          <div class="search-item" onclick="setPoint(\${item.lat}, \${item.lon}); map.setView([\${item.lat}, \${item.lon}], 15)">
            <div class="si-name">\${item.display_name.split(',')[0]}</div>
            <div class="si-sub">\${item.display_name}</div>
          </div>
        \`).join('');
      } else {
        res.innerHTML = '<div style="padding:10px;color:var(--muted);font-size:12px">' + t('not_found', q) + '</div>';
      }
    })
    .catch(() => showToast(t('search_failed')));
}

document.addEventListener('DOMContentLoaded', () => {
  applyI18n();
  queryActive();
});
</script>
</body>
</html>`;
}
