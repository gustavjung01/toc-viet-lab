import { readdirSync, readFileSync } from "fs";
import { resolve, dirname, extname } from "path";
import { fileURLToPath } from "url";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

// Parse .env.local
const env = {};
try {
  const raw = readFileSync(envPath, "utf-8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
} catch {
  console.error("❌ Không đọc được .env.local");
  process.exit(1);
}

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || env.CLOUDFLARE_ACCOUNT_ID;
const BUCKET = env.CLOUDFLARE_R2_BUCKET_NAME || env.R2_BUCKET_NAME || "toc-viet-lab";
const ACCESS_KEY = process.env.R2_ACCESS_KEY_ID || env.CLOUDFLARE_R2_ACCESS_KEY_ID || env.R2_ACCESS_KEY_ID;
const SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY || env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || env.R2_SECRET_ACCESS_KEY;
const ENDPOINT = env.CLOUDFLARE_R2_ENDPOINT || env.R2_ENDPOINT || `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

if (!ACCESS_KEY || !SECRET_KEY) {
  console.error("❌ Thiếu CLOUDFLARE_R2_ACCESS_KEY_ID hoặc CLOUDFLARE_R2_SECRET_ACCESS_KEY trong .env.local");
  process.exit(1);
}

const s3 = new S3Client({
  region: "auto",
  endpoint: ENDPOINT,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
  forcePathStyle: true,
});

async function putObject(key, body, contentType) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  }));
}

const MIME = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

// Scan recursively under public/images/cases/**/images/cases/*.webp
// (C1-C6 subfolders each have an images/cases/ subfolder with the actual files)
function scanWebp(dir) {
  const result = new Map(); // filename → absolute path (deduplicated)
  function walk(d) {
    let entries;
    try { entries = readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const full = resolve(d, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      const ext = extname(e.name).toLowerCase();
      if (MIME[ext] && (e.name.startsWith("before-") || e.name.startsWith("after-"))) {
        if (!result.has(e.name)) result.set(e.name, full); // first-seen wins
      }
    }
  }
  walk(dir);
  return result;
}

const casesDir = resolve(__dirname, "../public/images/cases");
const fileMap = scanWebp(casesDir);
const files = [...fileMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));

console.log(`\n📸 Upload ${files.length} ảnh lên R2 (${BUCKET}/images/cases/)...\n`);

let ok = 0;
let fail = 0;

for (const [filename, absPath] of files) {
  const ext = extname(filename).toLowerCase();
  const body = readFileSync(absPath);
  const r2Key = `images/cases/${filename}`;
  try {
    await putObject(r2Key, body, MIME[ext]);
    console.log(`  ✅ ${r2Key}`);
    ok++;
  } catch (e) {
    console.error(`  ❌ ${r2Key} — ${e.message}`);
    fail++;
  }
}

console.log(`\n✅ Xong! ${ok} uploaded, ${fail} failed.\n`);
