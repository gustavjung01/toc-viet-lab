/**
 * Audit cases content length in D1.
 * Usage: node scripts/audit-cases-content.mjs [--minAnalysis 600] [--minDesc 200]
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

const args = process.argv.slice(2);
const MIN_A = Number(args.includes("--minAnalysis") ? args[args.indexOf("--minAnalysis") + 1] : 600);
const MIN_D = Number(args.includes("--minDesc")     ? args[args.indexOf("--minDesc") + 1]     : 200);

const API = `https://api.cloudflare.com/client/v4/accounts/${ACC}/d1/database/${DB}/query`;

async function q(sql, params = []) {
  const r = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOK}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql, params }),
  });
  const d = await r.json();
  if (!d.success) throw new Error(JSON.stringify(d.errors));
  return d.result?.[0]?.results || [];
}

console.log(`\n📋 Audit cases content (minAnalysis=${MIN_A}, minDesc=${MIN_D})...\n`);

const rows = await q(
  `SELECT id, title, IFNULL(LENGTH(description),0) AS dlen, IFNULL(LENGTH(analysis),0) AS alen FROM cases WHERE published=1 ORDER BY created_at DESC`
);

const shortA = rows.filter(r => (r.alen ?? 0) < MIN_A);
const shortD = rows.filter(r => (r.dlen ?? 0) < MIN_D);
const okA    = rows.length - shortA.length;
const okD    = rows.length - shortD.length;

console.log(`Total cases published: ${rows.length}`);
console.log(`\n✅ Analysis >= ${MIN_A}: ${okA}  |  ⚠️  Short: ${shortA.length}`);
for (const r of shortA) {
  const flag = r.alen === 0 ? "❌ EMPTY" : "⚠️  SHORT";
  console.log(`  ${flag}  [id=${r.id}] ${r.title}  (analysis=${r.alen})`);
}

console.log(`\n✅ Description >= ${MIN_D}: ${okD}  |  ⚠️  Short: ${shortD.length}`);
for (const r of shortD) {
  const flag = r.dlen === 0 ? "❌ EMPTY" : "⚠️  SHORT";
  console.log(`  ${flag}  [id=${r.id}] ${r.title}  (desc=${r.dlen})`);
}

console.log(`\n${"═".repeat(45)}`);
console.log(`Analysis OK: ${okA}/${rows.length}  |  Desc OK: ${okD}/${rows.length}`);
if (shortA.length + shortD.length === 0) {
  console.log("🎉 Tất cả cases đều đạt ngưỡng!\n");
} else {
  console.log(`\nChạy backfill: node scripts/backfill-cases-content.mjs --minAnalysis ${MIN_A}\n`);
}
