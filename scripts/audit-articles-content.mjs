/**
 * Audit nội dung 30 bài articles trong D1.
 * Liệt kê các bài có content trống hoặc ngắn hơn --min (default 400 ký tự).
 *
 * Usage: node scripts/audit-articles-content.mjs [--min 400]
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const minArg = process.argv.indexOf("--min");
const MIN_LEN = minArg !== -1 ? parseInt(process.argv[minArg + 1], 10) : 400;

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

const local = loadEnv();
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || local.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID || local.CLOUDFLARE_D1_DATABASE_ID;
const TOKEN = process.env.CLOUDFLARE_D1_TOKEN || local.CLOUDFLARE_D1_TOKEN;

if (!ACCOUNT_ID || !DATABASE_ID || !TOKEN) {
  console.error("❌ Missing D1 envs"); process.exit(1);
}

const API = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;

async function query(sql) {
  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql, params: [] }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors));
  return data.result?.[0]?.results || [];
}

console.log(`\n📝 Audit articles content (min length: ${MIN_LEN} chars)...\n`);

const articles = await query("SELECT slug, title, LENGTH(content) as content_len FROM articles ORDER BY content_len ASC");

const short = [];
const empty = [];
let okCount = 0;

for (const a of articles) {
  const len = a.content_len ?? 0;
  if (len === 0) {
    empty.push(a);
    console.log(`  ❌ EMPTY  ${a.slug} — "${a.title}"`);
  } else if (len < MIN_LEN) {
    short.push(a);
    console.log(`  ⚠️  SHORT  ${a.slug} — ${len} chars — "${a.title}"`);
  } else {
    okCount++;
  }
}

console.log(`\n═══════════════════════════════════════`);
console.log(`Total: ${articles.length}`);
console.log(`✅ OK (>= ${MIN_LEN} chars): ${okCount}`);
console.log(`⚠️  Short (< ${MIN_LEN} chars): ${short.length}`);
console.log(`❌ Empty: ${empty.length}`);

if (short.length + empty.length > 0) {
  console.log(`\n── Slugs cần bổ sung content ──`);
  for (const a of [...empty, ...short]) {
    console.log(`  ${a.slug}  (${a.content_len ?? 0} chars)`);
  }
}

console.log("");
