import { readdirSync, readFileSync } from "fs";
import { resolve, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

// Parse .env.local
const env = {};
const raw = readFileSync(envPath, "utf-8");
for (const line of raw.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const idx = trimmed.indexOf("=");
  if (idx === -1) continue;
  env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
}

const ENDPOINT = env.R2_ENDPOINT || `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;
const BUCKET = "toc-viet-lab";
const ACCESS_KEY = env.R2_ACCESS_KEY_ID || env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const SECRET_KEY = env.R2_SECRET_ACCESS_KEY || env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;

if (!ACCESS_KEY || !SECRET_KEY) {
  console.error("❌ Thiếu R2_ACCESS_KEY_ID hoặc R2_SECRET_ACCESS_KEY trong .env.local");
  process.exit(1);
}

// S3-compatible signing
import { createHmac, createHash } from "crypto";

function sha256(data) {
  return createHash("sha256").update(data).digest("hex");
}

function hmac(key, data) {
  return createHmac("sha256", key).update(data).digest();
}

function getSignatureKey(key, dateStamp, region, service) {
  let k = hmac("AWS4" + key, dateStamp);
  k = hmac(k, region);
  k = hmac(k, service);
  k = hmac(k, "aws4_request");
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

  const canonicalRequest = [
    "PUT",
    `/${BUCKET}/${key}`,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256(canonicalRequest),
  ].join("\n");

  const signingKey = getSignatureKey(SECRET_KEY, dateStamp, region, service);
  const signature = createHmac("sha256", signingKey).update(stringToSign).digest("hex");

  const authHeader = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
      "x-amz-content-sha256": payloadHash,
      "x-amz-date": amzDate,
      Authorization: authHeader,
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${text}`);
  }
}

const MIME = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const casesDir = resolve(__dirname, "../public/images/cases");
const files = readdirSync(casesDir).filter((f) => {
  const ext = extname(f).toLowerCase();
  return MIME[ext] && (f.startsWith("before-") || f.startsWith("after-"));
});

console.log(`\n📸 Upload ${files.length} ảnh lên R2 (${BUCKET}/images/cases/)...\n`);

let ok = 0;
let fail = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  const body = readFileSync(resolve(casesDir, file));
  const r2Key = `images/cases/${file}`;
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
