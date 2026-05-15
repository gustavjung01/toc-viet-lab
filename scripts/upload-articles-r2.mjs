import { readdirSync, readFileSync, existsSync } from "fs";
import { resolve, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";
import { createHmac, createHash } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

// ── Parse .env.local ───────────────────────────────────────────────────
const env = {};
const raw = readFileSync(envPath, "utf-8");
for (const line of raw.split("\n")) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const i = t.indexOf("=");
  if (i === -1) continue;
  env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
}

const ENDPOINT = env.R2_ENDPOINT || `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const BUCKET = "toc-viet-lab";
const ACCESS_KEY = env.R2_ACCESS_KEY_ID || env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const SECRET_KEY = env.R2_SECRET_ACCESS_KEY || env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;

if (!ACCESS_KEY || !SECRET_KEY) {
  console.error("❌ Thiếu R2 access keys trong .env.local");
  process.exit(1);
}

// ── S3 signing ─────────────────────────────────────────────────────────
function sha256(data) { return createHash("sha256").update(data).digest("hex"); }
function hmac(key, data) { return createHmac("sha256", key).update(data).digest(); }
function getSignatureKey(key, dateStamp, region, service) {
  let k = hmac("AWS4" + key, dateStamp);
  k = hmac(k, region); k = hmac(k, service); k = hmac(k, "aws4_request");
  return k;
}

async function putObject(key, body, contentType) {
  const now = new Date();
  const dateStamp = now.toISOString().replace(/[-:T]/g, "").slice(0, 8);
  const amzDate = now.toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const region = "auto";
  const service = "s3";
  const url = new URL(`/${BUCKET}/${key}`, ENDPOINT);
  const host = url.host;
  const payloadHash = sha256(body);
  const canonicalHeaders = `content-type:${contentType}\nhost:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";
  const canonicalRequest = ["PUT", `/${BUCKET}/${key}`, "", canonicalHeaders, signedHeaders, payloadHash].join("\n");
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = ["AWS4-HMAC-SHA256", amzDate, credentialScope, sha256(canonicalRequest)].join("\n");
  const signingKey = getSignatureKey(SECRET_KEY, dateStamp, region, service);
  const signature = createHmac("sha256", signingKey).update(stringToSign).digest("hex");
  const authHeader = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(url.toString(), {
    method: "PUT",
    headers: { "Content-Type": contentType, "x-amz-content-sha256": payloadHash, "x-amz-date": amzDate, Authorization: authHeader },
    body,
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
}

// ── Collect .webp files from A1/A2/A3 subfolders ──────────────────────
const MIME = { ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };
const articlesRoot = resolve(__dirname, "../public/images/articles");

const filesToUpload = []; // { localPath, r2Key }

// Scan A1/A2/A3 subfolders (nested: A1_.../images/articles/article-xxx.webp)
for (const sub of readdirSync(articlesRoot)) {
  const subPath = resolve(articlesRoot, sub);
  const nestedDir = resolve(subPath, "images", "articles");
  if (existsSync(nestedDir)) {
    for (const f of readdirSync(nestedDir)) {
      const ext = extname(f).toLowerCase();
      if (MIME[ext] && f.startsWith("article-")) {
        filesToUpload.push({ localPath: resolve(nestedDir, f), r2Key: `images/articles/${f}`, ext });
      }
    }
  }
}

// Also scan root articles dir for any direct .webp files
for (const f of readdirSync(articlesRoot)) {
  const ext = extname(f).toLowerCase();
  if (MIME[ext] && f.startsWith("article-")) {
    // Only add if not already found in subfolders
    if (!filesToUpload.find(x => basename(x.localPath) === f)) {
      filesToUpload.push({ localPath: resolve(articlesRoot, f), r2Key: `images/articles/${f}`, ext });
    }
  }
}

console.log(`\n📸 Upload ${filesToUpload.length} ảnh articles lên R2 (${BUCKET}/images/articles/)...\n`);

let ok = 0, fail = 0;
for (const { localPath, r2Key, ext } of filesToUpload) {
  try {
    const body = readFileSync(localPath);
    await putObject(r2Key, body, MIME[ext]);
    console.log(`  ✅ ${r2Key} (${(body.length / 1024).toFixed(0)} KB)`);
    ok++;
  } catch (e) {
    console.error(`  ❌ ${r2Key} — ${e.message}`);
    fail++;
  }
}

console.log(`\n✅ Xong! ${ok} uploaded, ${fail} failed.\n`);
