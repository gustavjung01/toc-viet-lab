/**
 * Script upload tất cả assets từ public/ lên Cloudflare R2
 * Chạy: node scripts/upload-assets-to-r2.mjs
 */
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

const ACCOUNT_ID = "91bd34289f7d6d65e18a12228f92e4d6";
const ACCESS_KEY_ID = "f6c45bc1139d48d2f5bf349b72ee45a1";
const SECRET_ACCESS_KEY = "d3b7897a4a3f0405808126c0aac60245654f931682a46308540f1aae3f02e71d";
const BUCKET = "toc-viet-lab";
const ENDPOINT = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

const client = new S3Client({
  region: "auto",
  endpoint: ENDPOINT,
  credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY },
});

const MIME_MAP = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function walkDir(dir) {
  const results = [];
  for (const item of readdirSync(dir)) {
    const full = join(dir, item);
    if (statSync(full).isDirectory()) {
      results.push(...walkDir(full));
    } else {
      const ext = extname(item).toLowerCase();
      if (MIME_MAP[ext]) results.push(full);
    }
  }
  return results;
}

async function fileExistsOnR2(key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const files = walkDir(PUBLIC_DIR);
  console.log(`\nTìm thấy ${files.length} file ảnh trong public/\n`);

  let uploaded = 0, skipped = 0, failed = 0;

  for (const file of files) {
    const rel = relative(PUBLIC_DIR, file).replace(/\\/g, "/");
    const ext = extname(file).toLowerCase();
    const contentType = MIME_MAP[ext];

    const exists = await fileExistsOnR2(rel);
    if (exists) {
      console.log(`⏭  Skip (đã có): ${rel}`);
      skipped++;
      continue;
    }

    try {
      const body = readFileSync(file);
      await client.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: rel,
        Body: body,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000",
      }));
      console.log(`✅ Upload: ${rel}`);
      uploaded++;
    } catch (err) {
      console.error(`❌ Lỗi: ${rel} —`, err.message);
      failed++;
    }
  }

  console.log(`\n=== XONG ===`);
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Skipped:  ${skipped}`);
  console.log(`Failed:   ${failed}`);
  console.log(`\nPublic URL base: https://pub-ee61dfcd7d90444db6a6c1172ebaf898.r2.dev`);
  console.log(`CDN URL base:    https://cdn.tocvietlab.studio`);
}

main().catch(console.error);
