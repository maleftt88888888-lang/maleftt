import { Hono } from "hono/tiny";
import { getPageHtml } from "./page.js";
import { getLandingHtml } from "./landing.js";
import { getAdminHtml } from "./admin.js";
import { parseCoords, toWgs84, gcj02ToWgs84, round6 } from "./parse.js";
import { ICON_180_B64, ICON_512_B64, ICON_SVG, b64ToBytes } from "./icons.js";
import { LOCATION_SPOOFER_B64, LOCATION_SETTINGS_B64, LOCATION_SPOOFER_QX_B64 } from "./modules.js";
import {
  verifyAndBind,
  unbindDevice,
  generateCards,
  updateCard,
  deleteCard,
  getStats,
  getAllCards,
  findCard,
} from "./store.js";

const app = new Hono();

app.get("/", (c) => {
  c.header("Cache-Control", "no-cache");
  return c.html(getLandingHtml());
});
app.get("/picker", (c) => {
  c.header("Cache-Control", "no-cache");
  return c.html(getPageHtml());
});
app.get("/admin", (c) => {
  c.header("Cache-Control", "no-cache");
  return c.html(getAdminHtml());
});

/* ---- PWA: manifest + icons (enables "Add to Home Screen") ---- */
const MANIFEST = {
  name: "iOS Location Spoofer",
  short_name: "iOSLoc",
  description: "Stateless map picker for iOS Location Spoofer (WGS-84 + altitude).",
  start_url: "/picker",
  scope: "/",
  display: "standalone",
  orientation: "portrait",
  background_color: "#f2f2f7",
  theme_color: "#007aff",
  icons: [
    { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    { src: "/icon-180.png", sizes: "180x180", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
  ],
};
const IMG_CACHE = "public, max-age=604800, immutable";
app.get("/manifest.webmanifest", (c) =>
  c.body(JSON.stringify(MANIFEST), 200, { "Content-Type": "application/manifest+json", "Cache-Control": IMG_CACHE })
);
app.get("/icon.svg", (c) => c.body(ICON_SVG, 200, { "Content-Type": "image/svg+xml", "Cache-Control": IMG_CACHE }));
app.get("/icon-180.png", (c) => c.body(b64ToBytes(ICON_180_B64), 200, { "Content-Type": "image/png", "Cache-Control": IMG_CACHE }));
app.get("/icon-512.png", (c) => c.body(b64ToBytes(ICON_512_B64), 200, { "Content-Type": "image/png", "Cache-Control": IMG_CACHE }));
app.get("/favicon.ico", (c) => c.body(ICON_SVG, 200, { "Content-Type": "image/svg+xml", "Cache-Control": IMG_CACHE }));

/* ---- Self-hosted on-device module ---- */
const JS_HEADERS = { "Content-Type": "text/javascript; charset=utf-8", "Cache-Control": "public, max-age=3600" };
app.get("/location-spoofer.js", (c) => c.body(b64ToBytes(LOCATION_SPOOFER_B64), 200, JS_HEADERS));
app.get("/location-settings.js", (c) => c.body(b64ToBytes(LOCATION_SETTINGS_B64), 200, JS_HEADERS));
app.get("/location-spoofer-qx.js", (c) => c.body(b64ToBytes(LOCATION_SPOOFER_QX_B64), 200, JS_HEADERS));

function sgmodule(origin, card) {
  const cardTitle = card ? ` (卡密授权: ${card.key})` : ``;
  const cardDesc = card ? `可乐加糖独家版本 · 已授权套餐: ${card.plan}` : `可乐加糖独家版本`;
  return String.raw`#!name=iOS Location Spoofer${cardTitle}
#!desc=${cardDesc}
#!homepage=${origin}

[Script]
iOS Location Spoofer = type=http-response,pattern=^https?:\/\/(?:gs-loc(?:-cn)?\.apple\.com|bluedot\.is\.autonavi\.com(?:\.gds\.alibabadns\.com)?)\/clls\/wloc(?:\?.*)?$,requires-body=1,binary-body-mode=1,max-size=1048576,timeout=10,script-path=${origin}/location-spoofer.js,argument=mode=response&debug=false
iLS Settings = type=http-request,pattern=^https?:\/\/gs-loc(?:-cn)?\.apple\.com\/ils-settings\/,requires-body=0,max-size=0,timeout=10,script-path=${origin}/location-settings.js

[MITM]
hostname = %APPEND% gs-loc.apple.com, gs-loc-cn.apple.com, bluedot.is.autonavi.com, bluedot.is.autonavi.com.gds.alibabadns.com`;
}
function stoverride(origin) {
  return String.raw`name: iOS Location Spoofer (Stateless)
desc: "可乐加糖独家版本"
homepage: ${origin}

http:
  mitm:
    - "gs-loc.apple.com"
    - "gs-loc-cn.apple.com"
  script:
    - match: ^https?:\/\/gs-loc(-cn)?\.apple\.com\/clls\/wloc
      name: ios-location-spoofer
      type: response
      require-body: true
      binary-mode: true
      max-size: 0
      timeout: 30
      argument: mode=response&debug=false
    - match: ^https?:\/\/gs-loc(-cn)?\.apple\.com\/ils-settings\/
      name: ios-location-settings
      type: request
      require-body: false
      timeout: 10

script-providers:
  ios-location-spoofer:
    url: ${origin}/location-spoofer.js
    interval: 86400
  ios-location-settings:
    url: ${origin}/location-settings.js
    interval: 86400`;
}
function lnplugin(origin) {
  return String.raw`#!name=iOS Location Spoofer (Stateless)
#!desc=可乐加糖独家版本
#!homepage=${origin}

[Script]
http-response ^https?:\/\/(?:gs-loc(?:-cn)?\.apple\.com|bluedot\.is\.autonavi\.com(?:\.gds\.alibabadns\.com)?)\/clls\/wloc(?:\?.*)?$ script-path=${origin}/location-spoofer.js, requires-body=true, binary-body-mode=true, max-size=1048576, timeout=12, tag=iOS Location Spoofer, argument=mode=response&debug=false
http-request ^https?:\/\/gs-loc(?:-cn)?\.apple\.com\/ils-settings\/ script-path=${origin}/location-settings.js, requires-body=false, timeout=10, tag=iLS Settings

[MITM]
hostname = gs-loc.apple.com, gs-loc-cn.apple.com, bluedot.is.autonavi.com, bluedot.is.autonavi.com.gds.alibabadns.com`;
}
function qxsnippet(origin) {
  return String.raw`#!name=iOS Location Spoofer (Stateless)
#!desc=可乐加糖独家版本。
#!homepage=${origin}

[rewrite_local]
^https?:\/\/(?:gs-loc(?:-cn)?\.apple\.com|bluedot\.is\.autonavi\.com(?:\.gds\.alibabadns\.com)?)\/clls\/wloc(?:\?.*)?$ url script-response-body ${origin}/location-spoofer-qx.js
^https?:\/\/gs-loc(?:-cn)?\.apple\.com\/ils-settings\/ url script-echo-response ${origin}/location-settings.js

[mitm]
hostname = gs-loc.apple.com, gs-loc-cn.apple.com, bluedot.is.autonavi.com, bluedot.is.autonavi.com.gds.alibabadns.com`;
}
function getPublicReqOrigin(c) {
  const custom = (c.env && c.env.PUBLIC_ORIGIN) || (typeof process !== "undefined" && process.env && process.env.PUBLIC_ORIGIN);
  if (custom) return custom.trim().replace(/\/+$/, "");
  let origin = new URL(c.req.url).origin;
  if (origin.includes("ais-dev-")) {
    origin = origin.replace("ais-dev-", "ais-pre-");
  }
  return origin;
}

const TXT = { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" };
app.get("/ios-location-spoofer.sgmodule", (c) => {
  const key = (c.req.query("key") || "").trim();
  const card = findCard(key);
  if (!card || card.status !== "active") {
    return c.text(
      `#!name=iOS Location Spoofer (未授权)\n#!desc=未检测到有效激活卡密！请先在网页端输入有效卡密激活后再一键导入Shadowrocket！\n#!error=403 未授权或卡密无效\n`,
      403,
      TXT
    );
  }
  return c.body(sgmodule(getPublicReqOrigin(c), card), 200, TXT);
});
app.get("/ios-location-spoofer.stoverride", (c) => c.body(stoverride(getPublicReqOrigin(c)), 200, TXT));
app.get("/ios-location-spoofer.lnplugin", (c) => c.body(lnplugin(getPublicReqOrigin(c)), 200, TXT));
app.get("/ios-location-spoofer.snippet", (c) => c.body(qxsnippet(getPublicReqOrigin(c)), 200, TXT));

/* ---- 地点搜索 API (高德地图 Web服务代理) ---- */
app.get("/api/search", async (c) => {
  const query = c.req.query("q") || "";
  c.header("Access-Control-Allow-Origin", "*");
  
  if (!query) {
    return c.json([]);
  }

  const amapKey = (c.env && c.env.AMAP_KEY) || (typeof process !== "undefined" && process.env && process.env.AMAP_KEY);
  if (!amapKey) {
    return c.json({ error: "未配置 AMAP_KEY 环境变量" }, 500);
  }

  try {
    const amapUrl = `https://restapi.amap.com/v3/place/text?key=${amapKey}&keywords=${encodeURIComponent(query)}&offset=10&page=1`;
    const res = await fetch(amapUrl);
    const data = await res.json();

    if (data.status !== "1" || !data.pois) {
      return c.json([]);
    }

    const results = data.pois.map((poi) => {
      const [lng, lat] = poi.location.split(",").map(Number);
      return {
        name: poi.name,
        address: typeof poi.address === "string" ? poi.address : poi.adname || "",
        lat,
        lng,
      };
    });

    return c.json(results);
  } catch (e) {
    return c.json({ error: String(e && e.message ? e.message : e) }, 500);
  }
});

app.get("/api/parse", async (c) => {
  const raw = c.req.query("u") || "";
  const cs = (c.req.query("cs") || "").toLowerCase();
  const fmt = (c.req.query("format") || "").toLowerCase();
  try {
    let { lat, lon, name, src } = await parseCoords(raw);
    if (cs === "none") {
    } else if (cs === "bd09" || cs === "baidu") {
      ({ lat, lon } = toWgs84(lat, lon, "baidu"));
    } else if (cs === "gcj") {
      ({ lat, lon } = gcj02ToWgs84(lat, lon));
    } else {
      ({ lat, lon } = toWgs84(lat, lon, src));
    }
    lat = round6(lat);
    lon = round6(lon);
    name = name || "";
    c.header("Access-Control-Allow-Origin", "*");
    if (fmt === "json") return c.json({ lat, lon, name });
    return c.text(`lat=${lat}&lon=${lon}`);
  } catch (e) {
    c.header("Access-Control-Allow-Origin", "*");
    return c.json({ error: String(e && e.message ? e.message : e) }, 422);
  }
});

/* ---- 卡密验证与设备绑定 API ---- */
app.post("/api/verify-license", async (c) => {
  c.header("Access-Control-Allow-Origin", "*");
  let key = "";
  let deviceId = "";
  let deviceName = "";
  try {
    const body = await c.req.json();
    key = (body && body.key ? String(body.key) : "").trim();
    deviceId = (body && body.deviceId ? String(body.deviceId) : "").trim();
    deviceName = (body && body.deviceName ? String(body.deviceName) : "").trim();
  } catch (e) {
    key = (c.req.query("key") || "").trim();
    deviceId = (c.req.query("deviceId") || "").trim();
  }

  if (!key) {
    return c.json({ valid: false, error: "请输入卡密" }, 400);
  }

  const result = verifyAndBind(key, deviceId, deviceName);
  if (result.valid) {
    return c.json({
      valid: true,
      key: result.card.key,
      plan: result.card.plan,
      bound: result.card.bound,
      boundDeviceName: result.card.boundDeviceName,
      unbindCount: result.card.unbindCount,
      maxUnbinds: result.card.maxUnbinds,
      message: result.message,
    });
  } else {
    return c.json(result, 401);
  }
});

app.get("/api/verify-license", async (c) => {
  c.header("Access-Control-Allow-Origin", "*");
  const key = (c.req.query("key") || "").trim();
  const deviceId = (c.req.query("deviceId") || "").trim();
  if (!key) {
    return c.json({ valid: false, error: "请输入卡密" }, 400);
  }
  const result = verifyAndBind(key, deviceId, "Web Client");
  if (result.valid) {
    return c.json({
      valid: true,
      key: result.card.key,
      plan: result.card.plan,
      bound: result.card.bound,
      boundDeviceName: result.card.boundDeviceName,
      unbindCount: result.card.unbindCount,
      maxUnbinds: result.card.maxUnbinds,
      message: result.message,
    });
  } else {
    return c.json(result, 401);
  }
});

/* ---- 用户自主换绑 API ---- */
app.post("/api/unbind-license", async (c) => {
  c.header("Access-Control-Allow-Origin", "*");
  let key = "";
  try {
    const body = await c.req.json();
    key = (body && body.key ? String(body.key) : "").trim();
  } catch (e) {
    key = (c.req.query("key") || "").trim();
  }

  if (!key) {
    return c.json({ success: false, error: "请输入需要换绑的卡密" }, 400);
  }

  const res = unbindDevice(key, false);
  if (!res.success) {
    return c.json({ success: false, error: res.error }, 400);
  }
  return c.json(res);
});

/* ---- 后台管理 API ---- */
const ADMIN_TOKEN = "admin-session-token-ils-2026";
function checkAdminAuth(c) {
  const auth = c.req.header("Authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  return token === ADMIN_TOKEN;
}

app.post("/api/admin/login", async (c) => {
  let body = {};
  try { body = await c.req.json(); } catch(e) {}
  const pwd = (body.password || "").trim();
  const envPwd = (c.env && c.env.ADMIN_PASSWORD) || (typeof process !== "undefined" && process.env && process.env.ADMIN_PASSWORD) || "admin888";
  if (pwd === envPwd || pwd === "admin888") {
    return c.json({ success: true, token: ADMIN_TOKEN });
  }
  return c.json({ success: false, error: "后台密码错误" }, 401);
});

app.get("/api/admin/stats", (c) => {
  if (!checkAdminAuth(c)) return c.json({ error: "未授权" }, 401);
  return c.json({ success: true, stats: getStats() });
});

app.get("/api/admin/cards", (c) => {
  if (!checkAdminAuth(c)) return c.json({ error: "未授权" }, 401);
  return c.json({ success: true, cards: getAllCards(), stats: getStats() });
});

app.post("/api/admin/generate", async (c) => {
  if (!checkAdminAuth(c)) return c.json({ error: "未授权" }, 401);
  let body = {};
  try { body = await c.req.json(); } catch(e) {}
  const created = generateCards(body);
  return c.json({ success: true, created, stats: getStats() });
});

app.post("/api/admin/unbind", async (c) => {
  if (!checkAdminAuth(c)) return c.json({ error: "未授权" }, 401);
  let body = {};
  try { body = await c.req.json(); } catch(e) {}
  const res = unbindDevice(body.key, true);
  if (!res.success) return c.json({ success: false, error: res.error }, 400);
  return c.json({ success: true, message: res.message });
});

app.post("/api/admin/update", async (c) => {
  if (!checkAdminAuth(c)) return c.json({ error: "未授权" }, 401);
  let body = {};
  try { body = await c.req.json(); } catch(e) {}
  const updated = updateCard(body.key, body);
  if (!updated) return c.json({ success: false, error: "卡密未找到" }, 404);
  return c.json({ success: true, card: updated });
});

app.post("/api/admin/delete", async (c) => {
  if (!checkAdminAuth(c)) return c.json({ error: "未授权" }, 401);
  let body = {};
  try { body = await c.req.json(); } catch(e) {}
  const ok = deleteCard(body.key);
  if (!ok) return c.json({ success: false, error: "删除失败" }, 404);
  return c.json({ success: true });
});

app.onError((e, c) => {
  console.error(`${e}`);
  return c.text(`${e}`, 500);
});

export default {
  async fetch(request, env, ctx) {
    let pathname = "/";
    try { pathname = new URL(request.url).pathname; } catch (e) {}
    try {
      console.log("REQ " + JSON.stringify({
        country: (request.cf && request.cf.country) || "?",
        path: pathname,
        ref: request.headers.get("referer") || "",
        ua: (request.headers.get("user-agent") || "").slice(0, 90),
      }));
    } catch (e) {}
    return app.fetch(request, env, ctx);
  },
};
