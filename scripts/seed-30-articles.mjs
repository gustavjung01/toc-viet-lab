import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

const env = {};
try {
  const raw = readFileSync(envPath, "utf-8");
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
} catch { console.error("❌ Không đọc được .env.local"); process.exit(1); }

const ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID;
const DB_ID = env.CLOUDFLARE_D1_DATABASE_ID;
const TOKEN = env.CLOUDFLARE_D1_TOKEN;
if (!ACCOUNT_ID || !DB_ID || !TOKEN) { console.error("❌ Thiếu env vars"); process.exit(1); }

async function d1(sql, params = []) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DB_ID}/query`,
    { method: "POST", headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" }, body: JSON.stringify({ sql, params }) }
  );
  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors));
  return data.result[0];
}

// Ensure tags column
try { await d1("ALTER TABLE articles ADD COLUMN tags TEXT DEFAULT ''"); console.log("✅ Thêm column tags"); } catch { console.log("ℹ️  Column tags OK"); }

// Import article data
const { ARTICLES } = await import("./articles-data.mjs");

console.log(`\n🌱 Seed ${ARTICLES.length} articles vào D1...\n`);
let ok = 0, skip = 0;
for (const a of ARTICLES) {
  try {
    await d1(
      `INSERT OR REPLACE INTO articles (id, slug, title, excerpt, content, category, difficulty, read_time, image_key, tags, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [a.slug, a.slug, a.title, a.excerpt, a.content, a.category, a.difficulty, a.readTime, a.image_key, a.tags]
    );
    console.log(`  ✅ ${a.slug}`);
    ok++;
  } catch (e) { console.warn(`  ⚠️ ${a.slug} — ${e.message.slice(0,100)}`); skip++; }
}
console.log(`\n✅ Xong! ${ok} inserted, ${skip} skipped.\n`);
