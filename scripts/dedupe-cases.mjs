/**
 * dedupe-cases.mjs
 * Tìm và xóa bản duplicate trong bảng cases (cùng title hoặc cùng image key).
 * Giữ record mới nhất theo created_at, xóa các record cũ hơn.
 * Ghi log toàn bộ thao tác xóa.
 *
 * Run: node scripts/dedupe-cases.mjs
 * Dry-run (chỉ báo, không xóa): node scripts/dedupe-cases.mjs --dry-run
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes("--dry-run");

function loadEnv() {
  const p = resolve(__dirname, "../.env.local");
  const env = {};
  if (existsSync(p)) {
    for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
      env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
    }
  }
  return env;
}

const local = loadEnv();
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || local.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID || local.CLOUDFLARE_D1_DATABASE_ID;
const TOKEN = process.env.CLOUDFLARE_D1_TOKEN || local.CLOUDFLARE_D1_TOKEN;

if (!ACCOUNT_ID || !DATABASE_ID || !TOKEN) {
  console.error("❌ Thiếu CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_D1_DATABASE_ID / CLOUDFLARE_D1_TOKEN");
  process.exit(1);
}

const API_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;

async function d1(sql, params = []) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql, params }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors));
  return data.result[0].results;
}

function normalize(title) {
  return String(title ?? "").trim().toLowerCase();
}

console.log(`\n🔍 dedupe-cases.mjs${DRY_RUN ? " [DRY RUN — không xóa thật]" : ""}\n`);

// ─── Fetch all cases ──────────────────────────────────────────────────────────
const all = await d1(
  "SELECT id, title, before_image_key, after_image_key, created_at FROM cases ORDER BY created_at DESC"
);
console.log(`Tổng records: ${all.length}\n`);

const toDelete = new Map(); // id → reason

// ─── Dedup by title ───────────────────────────────────────────────────────────
const byTitle = {};
for (const r of all) {
  const key = normalize(r.title);
  if (!byTitle[key]) byTitle[key] = [];
  byTitle[key].push(r);
}
for (const group of Object.values(byTitle).filter((g) => g.length > 1)) {
  const sorted = [...group].sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    return tb - ta;
  });
  const keep = sorted[0];
  for (const r of sorted.slice(1)) {
    if (!toDelete.has(r.id)) {
      toDelete.set(r.id, `duplicate title "${r.title}" — giữ ${keep.id}`);
    }
  }
}

// ─── Dedup by before_image_key ────────────────────────────────────────────────
const byBefore = {};
for (const r of all) {
  if (!r.before_image_key) continue;
  if (!byBefore[r.before_image_key]) byBefore[r.before_image_key] = [];
  byBefore[r.before_image_key].push(r);
}
for (const group of Object.values(byBefore).filter((g) => g.length > 1)) {
  const sorted = [...group].sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    return tb - ta;
  });
  const keep = sorted[0];
  for (const r of sorted.slice(1)) {
    if (!toDelete.has(r.id)) {
      toDelete.set(r.id, `duplicate before_image_key "${r.before_image_key}" — giữ ${keep.id}`);
    }
  }
}

// ─── Dedup by after_image_key ─────────────────────────────────────────────────
const byAfter = {};
for (const r of all) {
  if (!r.after_image_key) continue;
  if (!byAfter[r.after_image_key]) byAfter[r.after_image_key] = [];
  byAfter[r.after_image_key].push(r);
}
for (const group of Object.values(byAfter).filter((g) => g.length > 1)) {
  const sorted = [...group].sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    return tb - ta;
  });
  const keep = sorted[0];
  for (const r of sorted.slice(1)) {
    if (!toDelete.has(r.id)) {
      toDelete.set(r.id, `duplicate after_image_key "${r.after_image_key}" — giữ ${keep.id}`);
    }
  }
}

// ─── Report ───────────────────────────────────────────────────────────────────
if (toDelete.size === 0) {
  console.log("✅ Không tìm thấy duplicate nào. DB sạch, không cần xóa gì.\n");
  process.exit(0);
}

console.log(`⚠️  Tìm thấy ${toDelete.size} record cần xóa:\n`);
for (const [id, reason] of toDelete) {
  console.log(`  ❌ ${id}  — ${reason}`);
}
console.log();

// ─── Delete ───────────────────────────────────────────────────────────────────
if (DRY_RUN) {
  console.log("DRY RUN — bỏ qua xóa. Chạy lại không có --dry-run để xóa thật.\n");
  process.exit(0);
}

let deleted = 0;
let failed = 0;
const auditLog = [];

for (const [id, reason] of toDelete) {
  try {
    await d1("DELETE FROM cases WHERE id = ?", [id]);
    const entry = `DELETED id=${id} reason="${reason}"`;
    auditLog.push(entry);
    console.log(`  ✅ Đã xóa: ${id}`);
    deleted++;
  } catch (e) {
    const entry = `FAILED id=${id} error="${e.message}"`;
    auditLog.push(entry);
    console.warn(`  ⚠️  Lỗi khi xóa ${id}: ${e.message.slice(0, 80)}`);
    failed++;
  }
}

console.log(`\n═══════════════════════════════`);
console.log(`✅ Đã xóa: ${deleted}`);
if (failed > 0) console.log(`❌ Lỗi:    ${failed}`);
console.log(`\nAudit log:`);
for (const entry of auditLog) console.log(`  ${entry}`);
console.log();
