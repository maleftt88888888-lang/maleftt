// Assemble single-file-worker.js, _worker.js, and dist/_worker.js
// 使得无论是 Cloudflare Workers、Cloudflare Pages（根目录部署或 dist 目录部署）、
// 还是直接在 Cloudflare Dashboard 粘贴单文件部署，均能 100% 成功构建与运行！

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// 剥离 import 和 export，使其内联为纯粹的单文件
const readSrc = (f) =>
  readFileSync(path.join(dir, "src", f), "utf8")
    .replace(/^import\s.*$/gm, "")
    .replace(/^export\s+(async\s+)?(function|const|let|var|class)\s+/gm, "$1$2 ")
    .replace(/^export\s*\{[^}]*\};?/gm, "")
    .replace(/^export\s+default\s+[^;]+;?/gm, "")
    .trim();

// 读取主路由 index.js 并剥离 import / export
const readIndex = () =>
  readFileSync(path.join(dir, "src", "index.js"), "utf8")
    .replace(/^import\s.*$/gm, "")
    .trim();

const header = `/**
 * iOS Location Spoofer — 全功能单文件 Cloudflare Worker / Pages 脚本 (AUTO-GENERATED).
 * 支持 Cloudflare Workers、Cloudflare Pages、本地 Node.js 运行。
 * 包含：卡密管理与绑定系统、地图选点器、位置解析 API、自托管模块脚本、高德地点搜索。
 */`;

const honoShim = `/* ---- minimal Hono shim (for zero-dependency standalone Cloudflare deployment) ---- */
class Hono {
  constructor() { this._routes = []; this._err = null; }
  get(p, h) { this._routes.push(["GET", p, h]); return this; }
  post(p, h) { this._routes.push(["POST", p, h]); return this; }
  options(p, h) { this._routes.push(["OPTIONS", p, h]); return this; }
  onError(fn) { this._err = fn; }
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const c = {
      env, executionCtx: ctx,
      req: {
        url: request.url,
        method: request.method,
        query: (k) => url.searchParams.get(k),
        header: (k) => request.headers.get(k),
        json: async () => {
          try { return await request.json(); } catch(e) { return {}; }
        },
        raw: request,
      },
      _h: {},
      header(k, v) { this._h[k] = v; },
      html(s) { return new Response(s, { headers: { "Content-Type": "text/html;charset=utf-8", ...this._h } }); },
      json(o, status) { return new Response(JSON.stringify(o), { status: status || 200, headers: { "Content-Type": "application/json", ...this._h } }); },
      text(s, status) { return new Response(s, { status: status || 200, headers: { "Content-Type": "text/plain; charset=utf-8", ...this._h } }); },
      body(b, status, headers) { return new Response(b, { status: status || 200, headers: { ...this._h, ...(headers || {}) } }); },
    };
    try {
      for (const [m, p, h] of this._routes) {
        if (m === "OPTIONS" && p === "*" && request.method === "OPTIONS") return await h(c);
        if (m === request.method && url.pathname === p) return await h(c);
      }
      return new Response("Not found", { status: 404 });
    } catch (e) { if (this._err) return this._err(e, c); throw e; }
  }
}`;

const out = [
  header,
  honoShim,
  "/* ==== inlined from src/store.js ==== */", readSrc("store.js"),
  "/* ==== inlined from src/admin.js ==== */", readSrc("admin.js"),
  "/* ==== inlined from src/parse.js ==== */", readSrc("parse.js"),
  "/* ==== inlined from src/icons.js ==== */", readSrc("icons.js"),
  "/* ==== inlined from src/modules.js ==== */", readSrc("modules.js"),
  "/* ==== inlined from src/page.js ==== */", readSrc("page.js"),
  "/* ==== inlined from src/landing.js ==== */", readSrc("landing.js"),
  "/* ==== inlined from src/index.js ==== */", readIndex(),
].join("\n\n");

// 1. 写入根目录 single-file-worker.js
writeFileSync(path.join(dir, "single-file-worker.js"), out, "utf-8");
console.log("✓ wrote single-file-worker.js (" + out.length + " bytes)");

// 2. 写入根目录 _worker.js (供 Cloudflare Pages 根目录自动识别)
writeFileSync(path.join(dir, "_worker.js"), out, "utf-8");
console.log("✓ wrote _worker.js (" + out.length + " bytes)");

// 3. 写入 dist/ 目录 (供 Cloudflare Pages 设置 dist 构建输出目录时部署)
const distDir = path.join(dir, "dist");
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}
writeFileSync(path.join(distDir, "_worker.js"), out, "utf-8");
writeFileSync(path.join(distDir, "index.html"), "<!-- Cloudflare Pages Entry handled by _worker.js -->", "utf-8");
console.log("✓ wrote dist/_worker.js and dist/index.html");
