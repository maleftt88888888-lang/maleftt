import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const DATA_FILE = path.resolve(process.cwd(), "data", "cards.json");

const DEFAULT_CARDS = [
  {
    id: "card_1",
    key: "VIP888",
    plan: "VIP 永久授权",
    status: "active",
    boundDeviceId: null,
    boundDeviceName: null,
    boundAt: null,
    unbindCount: 0,
    maxUnbinds: 5,
    createdAt: new Date().toISOString(),
    remark: "系统预设VIP卡密",
  },
  {
    id: "card_2",
    key: "VIP888888",
    plan: "VIP 永久授权",
    status: "active",
    boundDeviceId: null,
    boundDeviceName: null,
    boundAt: null,
    unbindCount: 0,
    maxUnbinds: 5,
    createdAt: new Date().toISOString(),
    remark: "系统预设VIP卡密",
  },
  {
    id: "card_3",
    key: "ILS-VIP-2026",
    plan: "年度旗舰版",
    status: "active",
    boundDeviceId: null,
    boundDeviceName: null,
    boundAt: null,
    unbindCount: 0,
    maxUnbinds: 5,
    createdAt: new Date().toISOString(),
    remark: "旗舰会员卡密",
  },
  {
    id: "card_4",
    key: "LOC-PRO-8888",
    plan: "专业尊享版",
    status: "active",
    boundDeviceId: null,
    boundDeviceName: null,
    boundAt: null,
    unbindCount: 0,
    maxUnbinds: 5,
    createdAt: new Date().toISOString(),
    remark: "专业版卡密",
  },
  {
    id: "card_5",
    key: "MALEFTT-8888",
    plan: "VIP 永久授权",
    status: "active",
    boundDeviceId: null,
    boundDeviceName: null,
    boundAt: null,
    unbindCount: 0,
    maxUnbinds: 10,
    createdAt: new Date().toISOString(),
    remark: "管理员预留卡密",
  },
];

let inMemoryStore = null;

function loadCards() {
  if (inMemoryStore) return inMemoryStore;
  try {
    if (existsSync(DATA_FILE)) {
      const raw = readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryStore = parsed;
        return inMemoryStore;
      }
    }
  } catch (err) {
    console.error("Failed to load cards from file:", err);
  }

  // Fallback to default cards
  inMemoryStore = JSON.parse(JSON.stringify(DEFAULT_CARDS));
  saveCards();
  return inMemoryStore;
}

function saveCards() {
  if (!inMemoryStore) return;
  try {
    const dir = path.dirname(DATA_FILE);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(DATA_FILE, JSON.stringify(inMemoryStore, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save cards to file:", err);
  }
}

export function getAllCards() {
  return loadCards();
}

export function findCard(key) {
  if (!key) return null;
  const upper = String(key).trim().toUpperCase();
  const list = loadCards();
  return list.find((c) => c.key.toUpperCase() === upper) || null;
}

/**
 * 验证并绑定设备
 */
export function verifyAndBind(key, deviceId, deviceName) {
  const card = findCard(key);
  if (!card) {
    return { valid: false, error: "卡密不存在或已作废，请核对后重试" };
  }
  if (card.status !== "active") {
    return { valid: false, error: "该卡密已被禁用，请联系客服处理" };
  }

  const cleanDevId = deviceId ? String(deviceId).trim() : "";

  // 如果该卡密尚未绑定任何设备
  if (!card.boundDeviceId) {
    if (cleanDevId) {
      card.boundDeviceId = cleanDevId;
      card.boundDeviceName = deviceName ? String(deviceName).slice(0, 80) : "未知设备";
      card.boundAt = new Date().toISOString();
      saveCards();
    }
    return {
      valid: true,
      card: sanitizeCard(card),
      boundNow: !!cleanDevId,
      message: "卡密验证成功，已绑定当前设备",
    };
  }

  // 如果已经绑定，检查是否是同一台设备
  if (cleanDevId && card.boundDeviceId === cleanDevId) {
    // 同一台设备，允许通行
    return {
      valid: true,
      card: sanitizeCard(card),
      alreadyBound: true,
      message: "设备授权校验通过",
    };
  }

  // 绑定的不是当前设备：提示设备不匹配
  return {
    valid: false,
    code: "DEVICE_MISMATCH",
    error: "该卡密已绑定其他设备",
    boundAt: card.boundAt,
    boundDeviceName: card.boundDeviceName || "其他设备",
    unbindCount: card.unbindCount || 0,
    maxUnbinds: card.maxUnbinds ?? 5,
    canSelfUnbind: (card.unbindCount || 0) < (card.maxUnbinds ?? 5),
  };
}

/**
 * 卡密换绑 / 解绑设备
 * forceAdmin: 是否为管理员后台强制解绑（不消耗换绑次数）
 */
export function unbindDevice(key, forceAdmin = false) {
  const card = findCard(key);
  if (!card) {
    return { success: false, error: "卡密不存在" };
  }
  if (card.status !== "active" && !forceAdmin) {
    return { success: false, error: "该卡密已处于禁用状态" };
  }

  if (!card.boundDeviceId) {
    return { success: true, message: "该卡密当前未绑定任何设备，可直接使用", card: sanitizeCard(card) };
  }

  const maxUnbinds = card.maxUnbinds ?? 5;
  const unbindCount = card.unbindCount || 0;

  if (!forceAdmin && unbindCount >= maxUnbinds) {
    return {
      success: false,
      error: `该卡密换绑次数已达上限 (${maxUnbinds}次)，请联系管理员微信处理`,
    };
  }

  // 执行解绑
  const previousDevice = card.boundDeviceName || card.boundDeviceId;
  card.boundDeviceId = null;
  card.boundDeviceName = null;
  card.boundAt = null;
  if (!forceAdmin) {
    card.unbindCount = unbindCount + 1;
  }
  saveCards();

  return {
    success: true,
    message: forceAdmin
      ? "管理员已成功解绑该设备"
      : `换绑成功！已解除对 [${previousDevice}] 的绑定，可在新设备上重新激活。`,
    unbindCount: card.unbindCount,
    maxUnbinds: card.maxUnbinds,
    card: sanitizeCard(card),
  };
}

/**
 * 批量生成卡密
 */
export function generateCards({ count = 1, prefix = "VIP-", plan = "VIP 永久授权", maxUnbinds = 5, remark = "" }) {
  const list = loadCards();
  const created = [];
  const qty = Math.max(1, Math.min(200, Number(count) || 1));
  const safePrefix = String(prefix || "").trim().toUpperCase();

  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  for (let i = 0; i < qty; i++) {
    let rand = "";
    for (let j = 0; j < 8; j++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const key = `${safePrefix}${rand}`;
    const newCard = {
      id: "card_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6),
      key,
      plan: plan || "VIP 永久授权",
      status: "active",
      boundDeviceId: null,
      boundDeviceName: null,
      boundAt: null,
      unbindCount: 0,
      maxUnbinds: Math.max(0, Number(maxUnbinds) || 5),
      createdAt: new Date().toISOString(),
      remark: remark || "后台批量生成",
    };
    list.unshift(newCard);
    created.push(newCard);
  }

  saveCards();
  return created;
}

/**
 * 更新卡密状态或信息
 */
export function updateCard(key, fields) {
  const card = findCard(key);
  if (!card) return null;
  if (fields.status !== undefined) card.status = fields.status;
  if (fields.plan !== undefined) card.plan = fields.plan;
  if (fields.remark !== undefined) card.remark = fields.remark;
  if (fields.maxUnbinds !== undefined) card.maxUnbinds = Number(fields.maxUnbinds);
  saveCards();
  return sanitizeCard(card);
}

/**
 * 删除卡密
 */
export function deleteCard(key) {
  const upper = String(key).trim().toUpperCase();
  const list = loadCards();
  const idx = list.findIndex((c) => c.key.toUpperCase() === upper);
  if (idx === -1) return false;
  list.splice(idx, 1);
  saveCards();
  return true;
}

/**
 * 仪表盘统计数据
 */
export function getStats() {
  const list = loadCards();
  const total = list.length;
  const bound = list.filter((c) => !!c.boundDeviceId).length;
  const unbound = list.filter((c) => !c.boundDeviceId && c.status === "active").length;
  const disabled = list.filter((c) => c.status !== "active").length;

  return {
    total,
    bound,
    unbound,
    disabled,
  };
}

function sanitizeCard(card) {
  if (!card) return null;
  return {
    key: card.key,
    plan: card.plan,
    status: card.status,
    bound: !!card.boundDeviceId,
    boundDeviceName: card.boundDeviceName,
    boundAt: card.boundAt,
    unbindCount: card.unbindCount || 0,
    maxUnbinds: card.maxUnbinds ?? 5,
    createdAt: card.createdAt,
    remark: card.remark,
  };
}
