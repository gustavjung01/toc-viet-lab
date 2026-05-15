/**
 * Soi toàn bộ ảnh case trên CDN.
 * - Đọc before_image_key / after_image_key từ D1.
 * - HEAD request tới CDN kiểm tra 200 hay 404.
 * - Nếu 404, thử các extension khác (.png, .webp, .jpg, .jpeg) xem cái nào có.
 * - Output: MISMATCH (đuôi sai, CDN có file khác) và MISSING (không có gì trên CDN).
 *
 * Run: node scripts/check-cases-cdn.mjs
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

const local = loadEnv();
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || local.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID || local.CLOUDFLARE_D1_DATABASE_ID;
const TOKEN = process.env.CLOUDFLARE_D1_TOKEN || local.CLOUDFLARE_D1_TOKEN;
const CDN = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || local.NEXT_PUBLIC_ASSET_BASE_URL || "").replace(/\/$/, "");

if (!ACCOUNT_ID || !DATABASE_ID || !TOKEN || !CDN) {
  console.error("❌ Missing env: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, CLOUDFLARE_D1_TOKEN, NEXT_PUBLIC_ASSET_BASE_URL");
  process.exit(1);
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

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.status;
  } catch {
    return 0;
  }
}

const EXTS = [".webp", ".png", ".jpg", ".jpeg"];

function swapExt(key, newExt) {
  return key.replace(/\.[^.]+$/, newExt);
}

console.log("\n🔍 Checking case images on CDN...\n");

const cases = await query("SELECT id, title, before_image_key, after_image_key FROM cases WHERE published = 1");
console.log(`Found ${cases.length} published cases.\n`);

const mismatches = [];
const missing = [];
let okCount = 0;

for (const c of cases) {
  for (const field of ["before_image_key", "after_image_key"]) {
    const key = c[field];
    if (!key) continue;

    const url = `${CDN}/${key.replace(/^\//, "")}`;
    const status = await checkUrl(url);

    if (status === 200) {
      okCount++;
      continue;
    }

    // Try other extensions
    let found = null;
    for (const ext of EXTS) {
      const altKey = swapExt(key, ext);
      if (altKey === key) continue;
      const altUrl = `${CDN}/${altKey.replace(/^\//, "")}`;
      const altStatus = await checkUrl(altUrl);
      if (altStatus === 200) {
        found = { altKey, ext };
        break;
      }
    }

    if (found) {
      mismatches.push({ id: c.id, label: c.title || c.id, field, from: key, to: found.altKey });
      console.log(`  MISMATCH ${c.title || c.id} [${field}]: ${key} → ${found.altKey}`);
    } else {
      missing.push({ id: c.id, label: c.title || c.id, field, key });
      console.log(`  MISSING  ${c.title || c.id} [${field}]: ${key}`);
    }
  }
}

console.log(`\n═══════════════════════════════════════`);
console.log(`✅ OK: ${okCount}`);
console.log(`⚠️  MISMATCH (DB đuôi sai, CDN có file khác ext): ${mismatches.length}`);
console.log(`❌ MISSING (không có trên CDN): ${missing.length}`);

if (mismatches.length) {
  console.log(`\n── MISMATCH list (copy vào fix-case-image-keys.mjs) ──`);
  for (const m of mismatches) {
    console.log(`  { id: "${m.id}", field: "${m.field}", to: "${m.to}" },  // ${m.label}`);
  }
}

if (missing.length) {
  console.log(`\n── MISSING list (cần upload lên R2) ──`);
  for (const m of missing) {
    console.log(`  ${m.key}  // ${m.label} [${m.field}]`);
  }
}

console.log("");
