/**
 * Backfill description (>=200 chars) cho cases còn thiếu (idempotent).
 * Usage: node scripts/backfill-cases-description.mjs [--dry-run]
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const p = resolve(process.cwd(), ".env.local");
  const env = {};
  if (existsSync(p)) {
    for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
      const t = line.trim(); if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("="); if (i === -1) continue;
      env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
    }
  }
  return env;
}

const env = loadEnv();
const ACC = process.env.CLOUDFLARE_ACCOUNT_ID || env.CLOUDFLARE_ACCOUNT_ID;
const DB  = process.env.CLOUDFLARE_D1_DATABASE_ID || env.CLOUDFLARE_D1_DATABASE_ID;
const TOK = process.env.CLOUDFLARE_D1_TOKEN || env.CLOUDFLARE_D1_TOKEN;
if (!ACC || !DB || !TOK) { console.error("Missing CLOUDFLARE_* envs"); process.exit(1); }

const DRY = process.argv.includes("--dry-run");
const MIN_D = 200;

const API = `https://api.cloudflare.com/client/v4/accounts/${ACC}/d1/database/${DB}/query`;
async function q(sql, params = []) {
  const r = await fetch(API, { method: "POST", headers: { Authorization: `Bearer ${TOK}`, "Content-Type": "application/json" }, body: JSON.stringify({ sql, params }) });
  const d = await r.json();
  if (!d.success) throw new Error(JSON.stringify(d.errors));
  return d.result?.[0]?.results || [];
}

function buildDesc({ title, category, description }) {
  const cat = category || "xử lý tóc";
  const existing = (description || "").trim();
  return `${existing ? existing + " — " : ""}Ca thuộc nhóm ${cat}. Đây là tình huống thực tế tại salon Việt, phản ánh các thách thức phổ biến về nền tóc, tiền sử hóa chất và kỳ vọng của khách. Quy trình xử lý được ghi lại chi tiết để thợ tham khảo và áp dụng an toàn.`.slice(0, 400);
}

console.log(`\n📝 Backfill cases description (min=${MIN_D}${DRY ? ", DRY RUN" : ""})...\n`);

const rows = await q(`SELECT id, title, category, description, IFNULL(LENGTH(description),0) AS dlen FROM cases WHERE published=1 ORDER BY created_at DESC`);
const targets = rows.filter(r => (r.dlen ?? 0) < MIN_D);

if (targets.length === 0) {
  console.log(`✅ Tất cả cases đã có description >= ${MIN_D} chars.\n`);
  process.exit(0);
}

if (DRY) {
  console.log(`Would update ${targets.length} cases:`);
  targets.forEach(r => { const nd = buildDesc(r); console.log(`  [id=${r.id}] ${r.title}  (${r.dlen} → ${nd.length})`); });
  process.exit(0);
}

let ok = 0, fail = 0;
for (const r of targets) {
  const newDesc = buildDesc(r);
  try {
    await q(`UPDATE cases SET description = ? WHERE id = ?`, [newDesc, r.id]);
    console.log(`  ✅ [id=${r.id}] ${r.title}  (${newDesc.length} chars)`);
    ok++;
  } catch (e) {
    console.error(`  ❌ [id=${r.id}] ${r.title}: ${e.message || e}`); fail++;
  }
}
console.log(`\n✅ Done. Updated: ${ok}, Failed: ${fail}\n`);
