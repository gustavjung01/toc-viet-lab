/**
 * audit-cases-db.mjs
 * Kiểm tra trạng thái bảng cases trong D1:
 *   - Tổng số, phân loại, published/unpublished
 *   - Bảng tóm tắt id / title / category
 *   - Phát hiện duplicate (same title hoặc same image key)
 *   - Khuyến nghị deduplication (giữ record mới nhất)
 *
 * Run: node scripts/audit-cases-db.mjs
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

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

function pad(str, len) {
  const s = String(str ?? "");
  return s.length >= len ? s.slice(0, len) : s + " ".repeat(len - s.length);
}

function normalize(title) {
  return String(title ?? "").trim().toLowerCase();
}

// ─── Fetch all cases ───────────────────────────────────────────────────────────
console.log("\n🔍 Đang truy vấn D1...\n");

const all = await d1(
  "SELECT id, title, category, published, before_image_key, after_image_key, created_at FROM cases ORDER BY created_at DESC"
);

const published = all.filter((r) => r.published == 1);
const unpublished = all.filter((r) => r.published != 1);

// ─── 1. Summary ───────────────────────────────────────────────────────────────
console.log("═══════════════════════════════════════════════════════════════");
console.log("  DATABASE AUDIT — cases table");
console.log("═══════════════════════════════════════════════════════════════");
console.log(`  Tổng records   : ${all.length}`);
console.log(`  Published = 1  : ${published.length}`);
console.log(`  Published ≠ 1  : ${unpublished.length}`);
console.log(`  Có before_key  : ${all.filter((r) => r.before_image_key).length}`);
console.log(`  Có after_key   : ${all.filter((r) => r.after_image_key).length}`);
console.log();

// ─── 2. Per-category breakdown ────────────────────────────────────────────────
const catMap = {};
for (const r of all) {
  const cat = r.category || "(none)";
  catMap[cat] = (catMap[cat] || 0) + 1;
}
console.log("  Phân loại category:");
for (const [cat, count] of Object.entries(catMap).sort((a, b) => b[1] - a[1])) {
  console.log(`    ${pad(cat, 22)} ${count}`);
}
console.log();

// ─── 3. Full summary table ────────────────────────────────────────────────────
console.log("  Bảng tóm tắt tất cả records:");
console.log(`  ${pad("ID", 28)} ${pad("Category", 16)} ${pad("Pub", 4)} ${pad("Title", 48)}`);
console.log("  " + "─".repeat(100));
for (const r of all) {
  console.log(
    `  ${pad(r.id, 28)} ${pad(r.category, 16)} ${pad(r.published, 4)} ${pad(r.title, 48)}`
  );
}
console.log();

// ─── 4. Duplicate detection ───────────────────────────────────────────────────

// 4a. Exact-title duplicates
const byTitle = {};
for (const r of all) {
  const key = normalize(r.title);
  if (!byTitle[key]) byTitle[key] = [];
  byTitle[key].push(r);
}
const titleDups = Object.values(byTitle).filter((g) => g.length > 1);

// 4b. Same before_image_key duplicates
const byBefore = {};
for (const r of all) {
  if (!r.before_image_key) continue;
  if (!byBefore[r.before_image_key]) byBefore[r.before_image_key] = [];
  byBefore[r.before_image_key].push(r);
}
const beforeDups = Object.values(byBefore).filter((g) => g.length > 1);

// 4c. Same after_image_key duplicates
const byAfter = {};
for (const r of all) {
  if (!r.after_image_key) continue;
  if (!byAfter[r.after_image_key]) byAfter[r.after_image_key] = [];
  byAfter[r.after_image_key].push(r);
}
const afterDups = Object.values(byAfter).filter((g) => g.length > 1);

console.log("═══════════════════════════════════════════════════════════════");
console.log("  DUPLICATE DETECTION");
console.log("═══════════════════════════════════════════════════════════════");
console.log(`  Nhóm có title trùng nhau      : ${titleDups.length}`);
console.log(`  Nhóm có before_image_key trùng: ${beforeDups.length}`);
console.log(`  Nhóm có after_image_key trùng : ${afterDups.length}`);
console.log();

// ─── 5. Deduplication recommendations ────────────────────────────────────────
const toDelete = new Set();

function printDupGroup(label, groups) {
  for (const group of groups) {
    // Sort: newest created_at first → keep first, delete rest
    const sorted = [...group].sort((a, b) => {
      const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
      const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
      return tb - ta;
    });
    const keep = sorted[0];
    const remove = sorted.slice(1);
    console.log(`  [${label}] "${(keep.title || "").slice(0, 50)}"`);
    console.log(`    ✅ GIỮ   : ${keep.id} (created_at=${keep.created_at ?? "n/a"})`);
    for (const r of remove) {
      console.log(`    ❌ XÓA   : ${r.id} (created_at=${r.created_at ?? "n/a"})`);
      toDelete.add(r.id);
    }
  }
}

if (titleDups.length) {
  console.log("  ── Duplicate by TITLE ──");
  printDupGroup("TITLE", titleDups);
  console.log();
}

if (beforeDups.length) {
  console.log("  ── Duplicate by BEFORE_IMAGE_KEY ──");
  printDupGroup("BEFORE", beforeDups);
  console.log();
}

if (afterDups.length) {
  console.log("  ── Duplicate by AFTER_IMAGE_KEY ──");
  printDupGroup("AFTER", afterDups);
  console.log();
}

// ─── 6. Final verdict ─────────────────────────────────────────────────────────
console.log("═══════════════════════════════════════════════════════════════");
console.log("  KẾT LUẬN");
console.log("═══════════════════════════════════════════════════════════════");

const hasDups = titleDups.length > 0 || beforeDups.length > 0 || afterDups.length > 0;

if (!hasDups) {
  console.log("  ✅ Không tìm thấy duplicate nào. DB sạch.");
} else {
  console.log(`  ⚠️  Tổng records cần xóa: ${toDelete.size}`);
  console.log("  Danh sách ID cần DELETE (chạy thủ công sau khi xác nhận):");
  for (const id of toDelete) {
    console.log(`    DELETE FROM cases WHERE id = '${id}';`);
  }
  console.log();
  console.log("  Để xóa hàng loạt, chạy:");
  const ids = [...toDelete].map((id) => `'${id}'`).join(", ");
  console.log(`    DELETE FROM cases WHERE id IN (${ids});`);
}

console.log();
