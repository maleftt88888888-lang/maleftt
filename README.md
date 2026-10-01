# iOS Location Spoofer (CF 平台专用部署版本)

基于 Cloudflare Workers / Pages & Hono 的 iOS 虚拟定位服务，支持无状态免签定位、卡密授权激活、设备绑定与自助换绑、自托管模块脚本和 Shadowrocket / Loon / Surge / Quantumult X 一键导入。

---

## 🌟 核心特性

- ⚡️ **全平台部署兼容**：完美支持 **Cloudflare Workers**、**Cloudflare Pages**（全栈 Function 模式 / 静态+Worker 模式）、**单文件直接粘贴**以及 **Node.js 本地开发**。
- 🔑 **卡密授权与设备绑定**：内置卡密验证机制，支持绑定单台设备、限制换绑次数、管理员后台生成/管理卡密。
- 🗺️ **地图选点与坐标解析**：内置高性能选点器，支持 WGS-84 / GCJ-02 / BD-09 坐标自动精准转换；支持高德搜索与地点分享链接自动解析。
- 📦 **自托管规则与脚本**：自带 Shadowrocket `.sgmodule`、Loon `.lnplugin`、Surge `.stoverride`、Quantumult X `.snippet` 规则托管与注入脚本。

---

## 🚀 Cloudflare 平台部署指南

### 方式一：Cloudflare Pages 部署（推荐：连接 GitHub）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2. 进入 **Workers & Pages** -> 点击 **Create application** -> 选择 **Pages** -> **Connect to Git**。
3. 选择 GitHub 仓库 `maleftt88888888-lang/maleftt`。
4. 在构建配置中：
   - **Framework preset（框架预设）**: None / 自定义
   - **Build command（构建命令）**: `npm run build`
   - **Build output directory（构建输出目录）**: `dist`（或者留空）
5. 点击 **Save and Deploy** 即可一键成功构建与部署！

---

### 方式二：Cloudflare Workers 部署（Git 集成）

1. 在 Cloudflare 控制台选择 **Workers & Pages** -> **Create application** -> **Workers**。
2. 选择 **Connect to Git**，关联本仓库。
3. 构建命令默认执行，Wrangler 会自动识别 `src/index.js` 及 `wrangler.jsonc` 进行打包部署。

---

### 方式三：单文件直接粘贴部署（零环境要求）

1. 运行 `npm run build` 生成 `single-file-worker.js`。
2. 在 Cloudflare 控制台新建一个 Worker，点击 **Edit code**。
3. 将 `single-file-worker.js` 的全部内容复制并粘贴到编辑器中，点击 **Save and Deploy** 即可！

---

## ⚙️ 环境变量配置（可选）

可在 Cloudflare Worker / Pages 的 **Settings -> Variables and Secrets** 中配置：

| 变量名 | 说明 | 默认值 / 示例 |
| :--- | :--- | :--- |
| `ADMIN_PASSWORD` | 后台管理系统登录密码 | 默认 `admin888` |
| `AMAP_KEY` | 高德开放平台 Web 服务 Key（用于地图搜索地点 POI） | 留空则仅使用地图坐标选点 |
| `PUBLIC_ORIGIN` | 自定义公开访问域名 | 自动获取当前请求域名 |

---

## 📱 访问入口与使用

- 🏠 **服务首页 / 授权激活**：`https://你的域名/`
- 📍 **地图选点器**：`https://你的域名/picker`
- 🛡️ **管理后台**：`https://你的域名/admin`（默认密码：`admin888`）
- 🚀 **Shadowrocket 模块直链**：`https://你的域名/ios-location-spoofer.sgmodule?key=你的卡密`

---

## 🛠️ 本地开发与测试

```bash
# 安装依赖
npm install

# 本地启动
npm run dev

# 重新构建单文件与部署产物
npm run build
```
