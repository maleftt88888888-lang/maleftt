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
<link rel="stylesheet" href="[https://unpkg.com/leaflet@1.9.4/dist/leaflet.css](https://unpkg.com/leaflet@1.9.4/dist/leaflet.css)"/>
<script src="[https://unpkg.com/leaflet@1.9.4/dist/leaflet.js](https://unpkg.com/leaflet@1.9.4/dist/leaflet.js)"><\/script>
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

/* ---- top bar: clean glass ---- */
.topbar { position:sticky; top:0; z-index:1200; display:flex; align-items:center; justify-content:space-between; padding:10px 16px; background:rgba(10,12,17,.85); -webkit-backdrop-filter:blur(14px); backdrop-filter:blur(14px); border-bottom:1px solid var(--line); font-size:13px; font-weight:700; color:var(--txt); }
.topbar .title { display:flex; align-items:center; gap:8px; color:var(--cyan); font-size:15px; font-weight:800; }

/* ---- map + controls ---- */
#map { height:50vh; width:100%; min-height:260px; background:#0a0c11; border-bottom:1px solid var(--line); }
.leaflet-container { background:#0a0c11; }
.leaflet-control-zoom a { background:rgba(18,22,29,.9)!important; color:var(--txt)!important; border-color:var(--line)!important; -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); }
.leaflet-control-zoom a:hover { background:var(--card2)!important; }
.leaflet-bar { border:1px solid var(--line)!important; box-shadow:0 4px 18px rgba(0,0,0,.5)!important; }
.leaflet-control-attribution { background:rgba(10,12,17,.7)!important; color:#6b7484!important; }
.leaflet-control-attribution a { color:#8a93a5!important; }

.panel { padding:16px; max-width:600px; margin:0 auto; padding-bottom:calc(16px + env(safe-area-inset-bottom)); }

/* ---- glass cards ---- */
.card { background:linear-gradient(180deg,rgba(25,30,40,.72),rgba(18,22,29,.72)); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); border-radius:16px; padding:16px; margin-bottom:12px; box-shadow:0 8px 28px rgba(0,0,0,.34); }
.card h3 { font-size:15px; font-weight:700; margin-bottom:12px; color:var(--txt); display:flex; align-items:center; gap:8px; }
.card h3::before { content:""; width:3px; height:14px; border-radius:2px; background:linear-gradient(180deg,var(--cyan),var(--green)); flex:none; }

.coords { font-family:"SF Mono",ui-monospace,monospace; font-size:13.5px; color:var(--muted); padding:10px 12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; word-break:break-all; }
.crow { display:flex; align-items:center; gap:8px; padding:8px 12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; margin-bottom:6px; }
.crow .ck { font-size:11px; font-weight:700; letter-spacing:.6px; text-transform:uppercase; color:var(--cyan); width:34px; flex:none; }
.crow .cv { flex:1; min-width:0; font-family:"SF Mono",ui-monospace,monospace; font-size:14px; color:var(--mono); word-break:break-all; }

/* ---- buttons ---- */
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

/* ---- inputs ---- */
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

/* ---- search & fav lists ---- */
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

/* ---- modal ---- */
.modal-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(4,6,10,.66); -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px); z-index:10000; display:none; align-items:center; justify-content:center; padding:20px; }
.modal-overlay.show { display:flex; }
.modal { background:linear-gradient(180deg,#1a1f29,#12161d); border:1px solid var(--line); border-radius:18px; padding:20px; width:100%; max-width:340px; box-shadow:0 20px 60px rgba(0,0,0,.6); }
.modal h3 { font-size:17px; font-weight:700; margin-bottom:16px; text-align:center; color:var(--txt); }
.modal input { width:100%; padding:12px; background:var(--inset); border:1px solid var(--line); border-radius:10px; font-size:15px; color:var(--txt); outline:none; margin-bottom:12px; -webkit-appearance:none; transition:border-color .15s,box-shadow .15s; }
.modal .modal-btns { display:flex; gap:8px; }
.modal .modal-btns .btn { padding:12px; }

/* ---- map overlay switches ---- */
.layer-switch { position:absolute; top:10px; right:10px; z-index:1000; display:flex; gap:4px; background:rgba(10,12,17,.74); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); border-radius:10px; padding:4px; box-shadow:0 4px 18px rgba(0,0,0,.45); }
.layer-btn { border:none; background:transparent; padding:6px 10px; border-radius:7px; font-size:12px; font-weight:600; color:#a8b1c0; cursor:pointer; transition:all .15s; white-space:nowrap; }
.layer-btn.active { background:linear-gradient(135deg,var(--cyan),var(--cyan2)); color:#022a2d; font-weight:700; }
.lang-switch { position:absolute; top:10px; left:10px; z-index:1000; display:flex; gap:2px; background:rgba(10,12,17,.74); -webkit-backdrop-filter:blur(12px); backdrop-filter:blur(12px); border:1px solid var(--line); border-radius:10px; padding:4px; box-shadow:0 4px 18px rgba(0,0,0,.45); }
.lang-btn { border:none; background:transparent; padding:6px 11px; border-radius:7px; font-size:12px; font-weight:700; color:#a8b1c0; cursor:pointer; transition:all .15s; }
.lang-btn.active { background:linear-gradient(135deg,var(--cyan),var(--cyan2)); color:#022a2d; }

@media(max-width:480px) { #map { height:44vh; } .panel { padding:12px; } .layer-btn { padding:5px 7px; font-size:11px; } }
</style>
</head>
<body>
<div class="topbar">
  <div class="title">📍 iOS Location Spoofer</div>
</div>
<div style="position:relative">
<div id="map"></div>
<div class="lang-switch">
  <button class="lang-btn" data-lang="zh" onclick="setLang('zh')">中</button>
  <button class="lang-btn" data-lang="en" onclick="setLang('en')">EN</button>
</div>
<div class="layer-switch">
  <button class="layer-btn active" data-layer="amap" data-i18n="layer_amap" onclick="switchLayer('amap')">高德</button>
  <button class="layer-btn" data-layer="satellite" data-i18n="layer_satellite" onclick="switchLayer('satellite')">卫星</button>
  <button class="layer-btn" data-layer="wgs84" onclick="switchLayer('wgs84')">WGS84</button>
  <button class="layer-btn" data-layer="voyager" data-i18n="layer_color" onclick="switchLayer('voyager')">彩色</button>
  <button class="layer-btn" data-layer="standard" data-i18n="layer_standard" onclick="switchLayer('standard')">标准</button>
  <button class="layer-btn" data-layer="dark" data-i18n="layer_dark" onclick="switchLayer('dark')">暗色</button>
</div>
</div>
<div class="panel">
  <div class="error-banner" id="errorBanner" data-i18n-html="err_html"></div>
  <div class="card">
    <h3 data-i18n="choose_title">选择目标位置</h3>
    <div class="coords" id="coords" data-i18n="coords_hint">点击地图或使用下方工具选择位置</div>
    <div id="coordGrid" style="display:none">
      <div class="crow"><span class="ck" data-i18n="lat">Lat</span><span class="cv" id="cvLat"></span><button class="btn btn-sm btn-secondary copybtn" data-i18n="copy" onclick="copyField('lat',this)">复制</button></div>
      <div class="crow"><span class="ck" data-i18n="lon">Lon</span><span class="cv" id="cvLon"></span><button class="btn btn-sm btn-secondary copybtn" data-i18n="copy" onclick="copyField('lon',this)">复制</button></div>
      <div class="crow"><span class="ck" data-i18n="alt">Alt</span><input class="cvi" id="altInput" type="number" inputmode="decimal" step="1" /><button class="btn btn-sm btn-secondary copybtn" data-i18n="copy" onclick="copyField('alt',this)">复制</button></div>
      <div class="acc-row">
        <div class="accfield"><span class="acclbl" data-i18n="hacc">水平精度</span><input id="haccInput" type="number" inputmode="numeric" step="1" min="1" value="39" /></div>
        <div class="accfield"><span class="acclbl" data-i18n="vacc">垂直精度</span><input id="vaccInput" type="number" inputmode="numeric" step="1" min="1" value="1000" /></div>
        <div class="accfield"><span class="acclbl" data-i18n="jitter">扰动半径(米)</span><input id="jitterInput" type="number" inputmode="numeric" step="1" min="0" value="0" /></div>
      </div>
    </div>
    <div class="row">
      <button class="btn btn-primary" id="saveBtn" data-i18n="save" onclick="save()">储存到设备</button>
      <button class="btn btn-secondary" data-i18n="restore" onclick="restoreReal()">恢复真实定位</button>
    </div>
    <div class="row">
      <button class="btn btn-secondary" data-i18n="copy_params" onclick="copyParams(this)">复制模块参数</button>
      <button class="btn btn-secondary" data-i18n="add_fav" onclick="addFav()">收藏位置</button>
      <button class="btn btn-secondary" data-i18n="locate" onclick="locateMe()">当前位置</button>
    </div>
    <div class="hint" data-i18n="alt_hint">海拔由 Open-Meteo 自动查询（WGS-84），储存到设备时随经纬度一并写入，由代理模块生效。</div>
    <div class="accnote" data-i18n-html="acc_note_html"></div>
  </div>
  <div class="card">
    <div class="fav-header">
      <h3 data-i18n="fav_title">收藏的位置</h3>
      <button class="btn btn-sm btn-secondary" data-i18n="clear_all" onclick="clearAllFav()" id="clearAllBtn" style="display:none">清空全部</button>
    </div>
    <div id="favList" class="fav-list"></div>
  </div>
  <div class="card">
    <h3 data-i18n="active_title">当前生效坐标</h3>
    <div class="active-loc" id="activeLoc">
      <div class="label" data-i18n="active_label">设备本地坐标 (latitude/longitude/altitude)</div>
      <div class="value" id="activeValue">查询中...</div>
    </div>
    <div class="row">
      <button class="btn btn-sm btn-secondary" data-i18n="refresh" onclick="queryActive()">刷新</button>
      <button class="btn btn-sm btn-danger" data-i18n="clear_data" onclick="clearActive()">清除数据</button>
    </div>
  </div>
  <div class="card">
    <h3 data-i18n="paste_title">粘贴地图链接</h3>
    <div class="input-row">
      <input id="urlInput" data-i18n-ph="paste_ph" placeholder="Apple/Google/高德/百度地图链接 或 经纬度" />
      <button class="btn btn-secondary" style="flex:none;min-width:56px" data-i18n="parse" onclick="parseUrl()">解析</button>
    </div>
    <div style="font-size:11px;color:var(--gray);margin-top:6px" data-i18n="paste_hint">支持 Apple Maps · Google Maps · 高德 · 百度 · 坐标文本（自动自动纠偏换算为 WGS-84）</div>
  </div>
  <div class="card">
    <h3 data-i18n="search_title">搜索地点</h3>
    <div class="input-row">
      <input id="searchInput" data-i18n-ph="search_ph" placeholder="搜地名，回车或点击搜索" />
      <button class="btn btn-secondary" style="flex:none;min-width:56px" data-i18n="search" onclick="searchPlace()">搜索</button>
    </div>
    <div id="searchResults" class="search-results"></div>
  </div>
  <div class="status" id="status">选好位置后点击「储存到设备」写入代理工具</div>
</div>
<div class="toast" id="toast"></div>
<div class="modal-overlay" id="favModal">
  <div class="modal">
    <h3 data-i18n="modal_title">收藏此位置</h3>
    <input id="favNameInput" data-i18n-ph="modal_ph" placeholder="输入备注名称（如: 公司、家）" maxlength="30" />
    <div style="font-size:12px;color:var(--gray);margin-bottom:12px;text-align:center" id="favModalCoords"></div>
    <div class="modal-btns">
      <button class="btn btn-secondary" data-i18n="cancel" onclick="closeFavModal()">取消</button>
      <button class="btn btn-primary" data-i18n="save_short" onclick="confirmFav()">保存</button>
    </div>
  </div>
</div>
Math.abs(x));

/* ---- i18n Dictionary ---- */
const I18N = {
  zh: {
    layer_amap: "高德", layer_satellite: "卫星", layer_standard: "标准", layer_dark: "暗色", layer_color: "彩色",
    choose_title: "选择目标位置", coords_hint: "点击地图或使用下方工具选择位置",
    lat: "Lat", lon: "Lon", alt: "Alt", copy: "复制", hacc: "水平精度", vacc: "垂直精度", jitter: "扰动半径(米)",
    save: "储存到设备", restore: "恢复真实定位", copy_params: "复制模块参数", add_fav: "收藏位置", locate: "当前位置",
    alt_hint: "海拔由 Open-Meteo 自动查询（WGS-84），储存到设备时随经纬度一并写入。",
    fav_title: "收藏的位置", clear_all: "清空全部", active_title: "当前生效坐标",
    active_label: "设备本地坐标 (latitude/longitude/altitude)", refresh: "刷新", clear_data: "清除数据",
    paste_title: "粘贴地图链接", paste_ph: "Apple/Google/高德/百度地图链接 或 经纬度", parse: "解析",
    paste_hint: "支持 Apple Maps · Google Maps · 高德 · 百度 · 坐标文本（自动换算为 WGS-84）",
    search_title: "搜索地点", search_ph: "搜地名，回车或点击搜索", search: "搜索",
    modal_title: "收藏此位置", modal_ph: "输入备注名称（如: 公司、家）", cancel: "取消", save_short: "保存",
    acc_note_html: "<b>说明与防检测建议：</b><br>• <b>水平精度</b>默认 <code>39</code>，调小（如 <code>5~15</code>）更逼真。<br>• <b>扰动半径</b>建议设为 <code>5~20</code> 米，可在定位时随机微调，避免点位死板。<br>• 点击「储存到设备」后修改即刻生效。",
    err_html: "<b>写入失败</b>请检查代理工具 MITM 脚本与重定向规则是否已启用。",
    written: "已写入生效！经度 {0}，纬度 {1}（{2}）", status_hint: "选好位置后点击「储存到设备」写入代理工具",
    pick_first: "请先在地图上选择位置", alt_na: "高程未获取", querying: "查询中...",
    copied: "已复制: {0}", copy_failed: "复制失败", saved: "已保存", alt_unknown_copy: "提示：海拔未知，复制的参数未包含 altitude",
    fav_empty: "暂无收藏位置", active_now: "当前生效", del: "删除", enter_label: "请输入备注名称",
    added: "已添加收藏: {0}", deleted: "已删除: {0}", clear_fav_confirm: "确定清空所有收藏位置吗？", all_cleared: "已清空所有收藏",
    no_saved: "设备无已保存坐标", query_failed: "查询失败", cleared: "已清除", dev_cleared: "设备数据已清除",
    clear_confirm: "确定清除设备存储的坐标数据？", clear_failed: "清除失败: {0}", clear_failed_cfg: "清除失败，请检查配置",
    saving: "保存中...", write_failed: "写入失败", save_failed: "请求失败，请检查配置", saved_toast: "参数已发送！请确保代理工具已开启 MITM 规则。",
    no_geo: "浏览器不支持定位", getting_loc: "获取当前位置中...", got_loc: "已定位到当前位置", loc_failed: "定位失败: {0}",
    paste_first: "请先输入或粘贴链接/坐标", parsing: "解析中...", parsed: "已解析坐标: {0}, {1}", parse_failed: "解析失败，无法提取有效坐标",
    enter_place: "请输入搜索地点", searching: "搜索中...", not_found: "未找到地点: {0}", search_failed: "搜索失败，请稍后再试",
    restored: "已恢复真实定位！", acc: "精度:", alt_str: "海拔:"
  },
  en: {
    layer_amap: "Amap", layer_satellite: "Satellite", layer_standard: "Standard", layer_dark: "Dark", layer_color: "Color",
    choose_title: "Select Target Location", coords_hint: "Tap map or use tools below to choose position",
    lat: "Lat", lon: "Lon", alt: "Alt", copy: "Copy", hacc: "H.Acc", vacc: "V.Acc", jitter: "Jitter(m)",
    save: "Save to Device", restore: "Restore Real GPS", copy_params: "Copy Params", add_fav: "Bookmark", locate: "Locate Me",
    alt_hint: "Altitude is fetched automatically from Open-Meteo (WGS-84) and saved with coordinates.",
    fav_title: "Bookmarks", clear_all: "Clear All", active_title: "Currently Active Coordinates",
    active_label: "Device local state (latitude/longitude/altitude)", refresh: "Refresh", clear_data: "Clear Data",
    paste_title: "Paste Map Link / Coords", paste_ph: "Apple/Google/Amap link or lat,lon", parse: "Parse",
    paste_hint: "Supports Apple, Google, Amap, Baidu & raw text coordinates (auto WGS-84 conversion).",
    search_title: "Search Place", search_ph: "Search place or POI name", search: "Search",
    modal_title: "Bookmark Location", modal_ph: "Enter tag (e.g. Home, Office)", cancel: "Cancel", save_short: "Save",
    acc_note_html: "<b>Tips for anti-detection:</b><br>• Lower <b>Horizontal Accuracy</b> (e.g. <code>5~15</code>) for realistic GPS.<br>• Set <b>Jitter</b> to <code>5~20</code>m to simulate subtle movement.",
    err_html: "<b>Write Failed:</b> Please check your proxy MITM settings.",
    written: "Active! Lon {0}, Lat {1} ({2})", status_hint: "Choose location then tap Save to Device.",
    pick_first: "Please pick a location first", alt_na: "Altitude N/A", querying: "Querying...",
    copied: "Copied: {0}", copy_failed: "Copy failed", saved: "Saved", alt_unknown_copy: "Altitude unknown",
    fav_empty: "No saved bookmarks", active_now: "Active", del: "Delete", enter_label: "Enter label",
    added: "Added: {0}", deleted: "Deleted: {0}", clear_fav_confirm: "Clear all bookmarks?", all_cleared: "All bookmarks cleared",
    no_saved: "No active coordinates on device", query_failed: "Query failed", cleared: "Cleared", dev_cleared: "Device cleared",
    clear_confirm: "Clear saved coordinates on device?", clear_failed: "Failed: {0}", clear_failed_cfg: "Clear failed",
    saving: "Saving...", write_failed: "Write failed", save_failed: "Save failed", saved_toast: "Settings sent to proxy module.",
    no_geo: "Geolocation not supported", getting_loc: "Locating...", got_loc: "Location updated", loc_failed: "Locate failed: {0}",
    paste_first: "Paste link or text first", parsing: "Parsing...", parsed: "Parsed: {0}, {1}", parse_failed: "Parse failed",
    enter_place: "Enter a place name", searching: "Searching...", not_found: "Not found: {0}", search_failed: "Search failed",
    restored: "Restored to real GPS!", acc: "Acc:", alt_str: "Alt:"
  }
};

let lang = localStorage.getItem(LANG_KEY) || (navigator.language.startsWith('zh') ? 'zh' : 'en');
function t(key, ...args) {
  let str = (I18N[lang] && I18N[lang][key]) || I18N.zh[key] || key;
  args.forEach((a, i) => { str = str.replace(new RegExp('\\\\{' + i + '\\\\}', 'g'), a); });
  return str;
}
function setLang(l) {
  lang = l; localStorage.setItem(LANG_KEY, l);
  applyI18n(); renderActive(); renderFavs(); updateStatus();
}
function applyI18n() {
  document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
}

/* ---- Leaflet Map Setup ---- */
const map = L.map('map', { zoomControl: false }).setView([39.9042, 116.4074], 12);
L.control.zoom({ position: 'bottomright' }).addTo(map);

const tiles = {
  amap: L.tileLayer('https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {maxZoom:18, subdomains:'1234', attribution:'© Amap'}),
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {maxZoom:19, attribution:'ArcGIS'}),
  wgs84: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {maxZoom:19, attribution:'ArcGIS WGS84'}),
  standard: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19, attribution:'© OSM'}),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {maxZoom:19, attribution:'© Carto'}),
  voyager: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {maxZoom:19, attribution:'© Carto'})
};
let currentLayer = tiles.amap;
currentLayer.addTo(map);

function switchLayer(name) {
  map.removeLayer(currentLayer);
  currentLayer = tiles[name];
  currentLayer.addTo(map);
  document.querySelectorAll('.layer-btn').forEach(b => b.classList.toggle('active', b.dataset.layer === name));
}

let marker = L.marker([lat, lon], {draggable:true});
let markerShown = false;
function showMarker() { if (!markerShown) { marker.addTo(map); markerShown = true; } }

marker.on('dragend', e => { const p=e.target.getLatLng(); setPos(p.lat, p.lng); });
map.on('click', e => { setPos(e.latlng.lat, e.latlng.lng); });

function currentAlt() {
  const el = document.getElementById('altInput');
  if (!el) return null;
  const n = parseFloat(el.value);
  return isFinite(n) ? Math.round(n) : null;
}
function haccVal() { const n = parseInt((document.getElementById('haccInput')||{}).value, 10); return isFinite(n) && n > 0 ? n : 39; }
function vaccVal() { const n = parseInt((document.getElementById('vaccInput')||{}).value, 10); return isFinite(n) && n > 0 ? n : 1000; }
function jitterVal() { const n = parseInt((document.getElementById('jitterInput')||{}).value, 10); return isFinite(n) && n > 0 ? n : 0; }

function setAltInput(v) {
  const el = document.getElementById('altInput');
  if (!el) return;
  if (v === null) { el.value = ''; el.placeholder = t('alt_na'); }
  else { el.value = v; el.placeholder = ''; }
}

function updateCoords() {
  const grid = document.getElementById('coordGrid');
  const coords = document.getElementById('coords');
  if (!selected) {
    grid.style.display = 'none';
    coords.style.display = '';
    coords.textContent = t('coords_hint');
    return;
  }
  coords.style.display = 'none';
  grid.style.display = '';
  document.getElementById('cvLat').textContent = lat.toFixed(6);
  document.getElementById('cvLon').textContent = lon.toFixed(6);
}

function updateStatus() {
  document.getElementById('status').textContent = (savedLon !== null)
    ? t('written', savedLon, savedLat, savedTimeStr)
    : t('status_hint');
}

function setPos(newLat, newLon, knownAlt) {
  lat = newLat; lon = newLon; selected = true;
  showMarker();
  marker.setLatLng([lat, lon]);
  if (typeof knownAlt === 'number') { elev = Math.round(knownAlt); elevState = 'ok'; elevCache.set(elevKey(lat, lon), elev); }
  updateCoords();
  fetchElevation(lat, lon);
}

function moveTo(newLat, newLon, zoom, knownAlt) {
  setPos(newLat, newLon, knownAlt);
  map.setView([lat, lon], zoom || 15);
}

/* ---- Altitude (Open-Meteo) ---- */
function elevKey(la, lo) { return la.toFixed(4) + ',' + lo.toFixed(4); }
function fetchElevation(la, lo) {
  const key = elevKey(la, lo);
  if (elevCache.has(key)) { elev = elevCache.get(key); elevState = (elev === null ? 'fail' : 'ok'); setAltInput(elev); return; }
  elevState = 'loading'; elev = null;
  const el = document.getElementById('altInput'); if (el) { el.value = ''; el.placeholder = t('alt_querying'); }
  const seq = ++elevSeq;
  clearTimeout(elevTimer);
  elevTimer = setTimeout(function(){
    fetch(ELEV_API + '?latitude=' + la + '&longitude=' + lo, { cache:'no-store' })
      .then(r => r.json())
      .then(d => {
        const e = (d && d.elevation && d.elevation.length && d.elevation[0] !== null) ? Math.round(d.elevation[0]) : null;
        elevCache.set(key, e);
        if (seq === elevSeq) { elev = e; elevState = (e === null ? 'fail' : 'ok'); setAltInput(e); }
      })
      .catch(() => { if (seq === elevSeq) { elev = null; elevState = 'fail'; setAltInput(null); } });
  }, 500);
}

let toastTimer = null;
function toast(msg, ms) {
  const t2 = document.getElementById('toast');
  t2.textContent = msg; t2.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t2.classList.remove('show'), ms || 2500);
}

function showError(show) {
  document.getElementById('errorBanner').style.display = show ? 'block' : 'none';
}

function copyText(str) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(str);
  }
  return new Promise(function(resolve, reject){
    try {
      const ta = document.createElement('textarea');
      ta.value = str; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error('execCommand failed'));
    } catch(e) { reject(e); }
  });
}

function copyField(which, btn) {
  if (!selected) { toast(t('pick_first')); return; }
  let val;
  if (which === 'lat') val = lat.toFixed(6);
  else if (which === 'lon') val = lon.toFixed(6);
  else { const a = currentAlt(); if (a === null) { toast(t('alt_na')); return; } val = String(a); }
  copyText(val).then(() => {
    toast(t('copied', val));
    if (btn) { const o = btn.textContent; btn.classList.add('success'); btn.textContent = '✓'; setTimeout(() => { btn.textContent = o; btn.classList.remove('success'); }, 1200); }
  }).catch(() => toast(t('copy_failed'), 3000));
}

function moduleParamString() {
  let s = 'latitude=' + lat.toFixed(6) + '&longitude=' + lon.toFixed(6);
  const a = currentAlt(); if (a !== null) s += '&altitude=' + a;
  s += '&horizontalAccuracy=' + haccVal() + '&verticalAccuracy=' + vaccVal();
  const j = jitterVal(); if (j > 0) s += '&randomRadius=' + j;
  return s;
}

function copyParams(btn) {
  if (!selected) { toast(t('pick_first')); return; }
  const s = moduleParamString();
  copyText(s).then(() => {
    toast(t('copied', s));
    if (currentAlt() === null) toast(t('alt_unknown_copy'), 3000);
    if (btn) { const o = btn.textContent; btn.classList.add('success'); btn.textContent = t('saved'); setTimeout(() => { btn.textContent = o; btn.classList.remove('success'); }, 1200); }
  }).catch(() => toast(t('copy_failed'), 3000));
}

/* ---- Bookmarks System ---- */
function getFavs() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch(e) { return []; }
}
function saveFavs(favs) {
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
}
function renderFavs() {
  const favs = getFavs();
  const el = document.getElementById('favList');
  const clearBtn = document.getElementById('clearAllBtn');
  clearBtn.style.display = favs.length ? '' : 'none';
  if (!favs.length) {
    el.innerHTML = '<div class="fav-empty">' + escHtml(t('fav_empty')) + '</div>';
    return;
  }
  el.innerHTML = favs.map((f, i) => {
    const isActive = activeLon !== null && Math.abs(f.lon - activeLon) < 0.000001 && Math.abs(f.lat - activeLat) < 0.000001;
    const altStr = (typeof f.alt === 'number') ? ('  ·  ' + f.alt + ' m') : '';
    return '<div class="fav-item" onclick="loadFav(' + i + ')">' +
      '<div class="fav-info">' +
        '<div class="fav-name">' + escHtml(f.name) + '</div>' +
        '<div class="fav-coords">' + f.lon.toFixed(6) + ', ' + f.lat.toFixed(6) + altStr + '</div>' +
        (isActive ? '<div class="fav-active">' + escHtml(t('active_now')) + '</div>' : '') +
      '</div>' +
      '<button class="fav-del" onclick="event.stopPropagation();delFav(' + i + ')" title="' + escHtml(t('del')) + '">×</button>' +
    '</div>';
  }).join('');
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function addFav() {
  if (!selected) { toast(t('pick_first')); return; }
  var _fa = currentAlt();
  document.getElementById('favModalCoords').textContent = lon.toFixed(6) + ', ' + lat.toFixed(6) + (_fa !== null ? ('  ·  ' + _fa + ' m') : '');
  document.getElementById('favNameInput').value = '';
  document.getElementById('favModal').classList.add('show');
  setTimeout(() => document.getElementById('favNameInput').focus(), 100);
}

function closeFavModal() {
  document.getElementById('favModal').classList.remove('show');
}

function confirmFav() {
  const name = document.getElementById('favNameInput').value.trim();
  if (!name) { toast(t('enter_label')); return; }
  const favs = getFavs();
  const rec = { name, lon, lat, time: new Date().toISOString() };
  const _ca = currentAlt(); if (_ca !== null) rec.alt = _ca;
  favs.push(rec);
  saveFavs(favs);
  closeFavModal();
  renderFavs();
  toast(t('added', name));
}

function loadFav(i) {
  const favs = getFavs();
  if (!favs[i]) return;
  moveTo(favs[i].lat, favs[i].lon, 15, typeof favs[i].alt === 'number' ? favs[i].alt : undefined);
  toast(favs[i].name + ' (' + favs[i].lon.toFixed(4) + ', ' + favs[i].lat.toFixed(4) + ')');
}

function delFav(i) {
  const favs = getFavs();
  if (!favs[i]) return;
  const name = favs[i].name;
  favs.splice(i, 1);
  saveFavs(favs);
  renderFavs();
  toast(t('deleted', name));
}

function clearAllFav() {
  if (!confirm(t('clear_fav_confirm'))) return;
  saveFavs([]);
  renderFavs();
  toast(t('all_cleared'));
}

/* ---- Active Location Sync ---- */
function renderActive() {
  const el = document.getElementById('activeValue');
  if (activeStatus === 'ok') {
    el.textContent = t('lon') + ' ' + activeLon.toFixed(6) + '  ' + t('lat') + ' ' + activeLat.toFixed(6)
      + (activeAcc ? ('  ' + t('acc') + ' ' + activeAcc + 'm') : '')
      + (activeAlt !== null && activeAlt !== undefined ? ('  ' + t('alt_str') + ' ' + activeAlt + 'm') : '');
  } else if (activeStatus === 'none') {
    el.textContent = t('no_saved');
  } else if (activeStatus === 'failed') {
    el.textContent = t('query_failed');
  } else if (activeStatus === 'cleared') {
    el.textContent = t('cleared');
  } else {
    el.textContent = t('querying');
  }
}

function queryActive() {
  activeStatus = 'querying';
  renderActive();
  fetch(SAVE_API + '?action=query', { method:'GET', mode:'cors', cache:'no-store' })
    .then(r => r.json())
    .then(d => {
      if (d.success && d.longitude && d.latitude) {
        activeLon = parseFloat(d.longitude);
        activeLat = parseFloat(d.latitude);
        activeAcc = (d.horizontalAccuracy != null ? d.horizontalAccuracy : (d.accuracy || null));
        activeAlt = (d.altitude !== undefined && d.altitude !== null) ? d.altitude : null;
        if (d.randomRadius != null) { const ji = document.getElementById('jitterInput'); if (ji) ji.value = d.randomRadius; }
        activeStatus = 'ok';
        if (!didInitialCenter && !selected) {
          didInitialCenter = true;
          moveTo(activeLat, activeLon, 15, (activeAlt !== null && activeAlt !== undefined) ? activeAlt : undefined);
        }
      } else {
        activeLon = null; activeLat = null; activeAcc = null; activeAlt = null;
        activeStatus = 'none';
      }
      renderActive();
      renderFavs();
    })
    .catch(() => { activeStatus = 'failed'; renderActive(); });
}

function clearActive() {
  if (!confirm(t('clear_confirm'))) return;
  fetch(SAVE_API + '?action=clear', { method:'GET', mode:'cors', cache:'no-store' })
    .then(r => r.json())
    .then(d => {
      if (d.success) {
        activeLon = null; activeLat = null; activeAcc = null; activeAlt = null;
        activeStatus = 'cleared';
        renderActive();
        renderFavs();
        toast(t('dev_cleared'));
      } else { toast(t('clear_failed', d.error || ''), 3000); }
    })
    .catch(() => { toast(t('clear_failed_cfg'), 3000); });
}

/* ---- Save to Device ---- */
async function save() {
  if (!selected) { toast(t('pick_first')); return; }
  const btn = document.getElementById('saveBtn');
  btn.textContent = t('saving'); btn.disabled = true;
  showError(false);
  try {
    let url = SAVE_API + '?lon=' + lon + '&lat=' + lat;
    const a = currentAlt(); if (a !== null) url += '&alt=' + a;
    url += '&hacc=' + haccVal() + '&vacc=' + vaccVal() + '&randomRadius=' + jitterVal();
    const r = await fetch(url, { method: 'GET', mode: 'cors', cache: 'no-store' });
    const d = await r.json();
    if (d.success) {
      activeLon = lon; activeLat = lat; activeAcc = haccVal();
      activeAlt = currentAlt();
      activeStatus = 'ok';
      savedLon = lon; savedLat = lat; savedTimeStr = new Date().toLocaleTimeString();
      btn.textContent = t('saved'); btn.className = 'btn btn-primary success';
      updateStatus();
      renderActive();
      renderFavs();
      toast(t('saved_toast'), 3000);
      setTimeout(() => { btn.textContent = t('save'); btn.className='btn btn-primary'; btn.disabled=false; }, 2500);
    } else {
      throw new Error(d.error || t('write_failed'));
    }
  } catch(e) {
    btn.textContent = t('save'); btn.className = 'btn btn-primary'; btn.disabled = false;
    showError(true);
    toast(t('save_failed'), 4000);
  }
}

function locateMe() {
  if (!navigator.geolocation) return toast(t('no_geo'));
  toast(t('getting_loc'));
  navigator.geolocation.getCurrentPosition(
    pos => { moveTo(pos.coords.latitude, pos.coords.longitude, 16); toast(t('got_loc')); },
    err => toast(t('loc_failed', err.message), 3000),
    { enableHighAccuracy:true, timeout:10000 }
  );
}

/* Local fallback parsing text (GCJ02 to WGS84 for China coordinates) */
function parseLocalCoords(text) {
  const m = text.match(/(-?[0-9]+\.[0-9]+)[,\s]+(-?[0-9]+\.[0-9]+)/);
  if (!m) return null;
  let a = parseFloat(m[1]), b = parseFloat(m[2]);
  let rLat, rLon;
  if (Math.abs(a) <= 90 && Math.abs(b) <= 180) { rLat = a; rLon = b; }
  else if (Math.abs(b) <= 90 && Math.abs(a) <= 180) { rLat = b; rLon = a; }
  else { rLat = a; rLon = b; }
  
  // If coordinates are in China, apply GCJ02 to WGS84 conversion
  if (!outOfChina(rLon, rLat)) {
    const wgs = gcj02ToWgs84(rLon, rLat);
    return { lat: wgs[1], lon: wgs[0] };
  }
  return { lat: rLat, lon: rLon };
}

async function parseUrl() {
  const input = document.getElementById('urlInput').value.trim();
  if (!input) return toast(t('paste_first'));
  toast(t('parsing'));
  try {
    const r = await fetch(PARSE_API + '?format=json&u=' + encodeURIComponent(input), { cache:'no-store' });
    const d = await r.json();
    if (d && typeof d.lat === 'number' && typeof d.lon === 'number') {
      let finalLat = d.lat, finalLon = d.lon;
      if (!outOfChina(finalLon, finalLat)) {
        const wgs = gcj02ToWgs84(finalLon, finalLat);
        finalLon = wgs[0]; finalLat = wgs[1];
      }
      moveTo(finalLat, finalLon, 15);
      toast(d.name ? (d.name + ' (' + finalLon.toFixed(4) + ', ' + finalLat.toFixed(4) + ')') : t('parsed', finalLon, finalLat));
      return;
    }
    throw new Error(d && d.error ? d.error : 'parse failed');
  } catch(e) {
    const local = parseLocalCoords(input);
    if (local) { moveTo(local.lat, local.lon, 15); toast(t('parsed', local.lon, local.lat)); return; }
    toast(t('parse_failed'), 3000);
  }
}

/* ---- Optimized Place Search (Works in China & Globally) ---- */
let searchResults = [];
async function searchPlace() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return toast(t('enter_place'));
  const box = document.getElementById('searchResults');
  box.innerHTML = '<div class="search-item">' + escHtml(t('searching')) + '</div>';
  
  try {
    const r = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=8&accept-language=zh-CN,zh,en&q=' + encodeURIComponent(q));
    searchResults = await r.json();
    if (!searchResults.length) { box.innerHTML = ''; toast(t('not_found', q), 3000); return; }
    box.innerHTML = searchResults.map(function(p, i){
      const name = p.display_name || '';
      return '<div class="search-item" onclick="selectSearchResult(' + i + ')">' +
        '<div class="si-name">' + escHtml(name.split(',')[0]) + '</div>' +
        '<div class="si-sub">' + escHtml(name) + '</div>' +
      '</div>';
    }).join('');
  } catch(e) { 
    box.innerHTML = ''; 
    toast(t('search_failed'), 3000); 
  }
}

function selectSearchResult(i) {
  const p = searchResults[i];
  if (!p) return;
  let pLat = parseFloat(p.lat), pLon = parseFloat(p.lon);
  
  // Convert GCJ-02 to WGS-84 if location is within China
  if (!outOfChina(pLon, pLat)) {
    const wgs = gcj02ToWgs84(pLon, pLat);
    pLon = wgs[0]; pLat = wgs[1];
  }
  moveTo(pLat, pLon, 15);
  toast((p.display_name || '').slice(0, 40));
}

function restoreReal() {
  fetch(SAVE_API + '?action=clear', { method:'GET', mode:'cors', cache:'no-store' })
    .then(r => r.json())
    .then(d => {
      if (d.success) {
        activeLon = null; activeLat = null; activeAcc = null; activeAlt = null;
        activeStatus = 'cleared'; savedLon = null;
        updateStatus(); renderActive(); renderFavs();
        toast(t('restored'), 3000);
      } else { toast(t('clear_failed_cfg'), 3000); }
    })
    .catch(() => toast(t('clear_failed_cfg'), 3000));
}

document.addEventListener('paste', e => {
  const text = (e.clipboardData||window.clipboardData).getData('text');
  if (text && (text.includes('map') || text.includes('loc') || text.includes('lnglat') || text.includes('baidu') || /[0-9]+\.[0-9]+/.test(text))) {
    document.getElementById('urlInput').value = text;
    setTimeout(parseUrl, 200);
  }
});

document.getElementById('searchInput').addEventListener('keydown', e => { if(e.key==='Enter') searchPlace(); });
document.getElementById('urlInput').addEventListener('keydown', e => { if(e.key==='Enter') parseUrl(); });
document.getElementById('favNameInput').addEventListener('keydown', e => { if(e.key==='Enter') confirmFav(); });

applyI18n();
queryActive();
</script>
</body>
</html>`;
}
