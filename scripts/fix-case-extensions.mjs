import { readdirSync, readFileSync } from "fs";
import { resolve, dirname, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");

const env = {};
const raw = readFileSync(envPath, "utf-8");
for (const line of raw.split("\n")) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const i = t.indexOf("=");
  if (i === -1) continue;
  env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
}

const ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID;
const DB_ID = env.CLOUDFLARE_D1_DATABASE_ID;
const TOKEN = env.CLOUDFLARE_D1_TOKEN;

async function d1(sql, params = []) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DB_ID}/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ sql, params }),
    }
  );
  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors));
  return data.result[0];
}

// Build a map: basename (no ext) → actual extension from uploaded files
const casesDir = resolve(__dirname, "../public/images/cases");
const files = readdirSync(casesDir).filter((f) => f.startsWith("before-") || f.startsWith("after-"));
const extMap = {};
for (const f of files) {
  const base = f.replace(/\.\w+$/, "");
  extMap[base] = extname(f); // .png, .jpeg, .webp
}

// Get all cases from D1
const result = await d1("SELECT id, before_image_key, after_image_key FROM cases");
const cases = result.results;

console.log(`\n🔧 Fixing image extensions for ${cases.length} cases...\n`);

let fixed = 0;
for (const c of cases) {
  const beforeBase = c.before_image_key?.replace(/\.\w+$/, "");
  const afterBase = c.after_image_key?.replace(/\.\w+$/, "");

  const beforeBaseName = beforeBase?.split("/").pop();
  const afterBaseName = afterBase?.split("/").pop();

  const realBeforeExt = extMap[beforeBaseName];
  const realAfterExt = extMap[afterBaseName];

  if (!realBeforeExt && !realAfterExt) continue;

  const newBefore = realBeforeExt ? `images/cases/${beforeBaseName}${realBeforeExt}` : c.before_image_key;
  const newAfter = realAfterExt ? `images/cases/${afterBaseName}${realAfterExt}` : c.after_image_key;

  if (newBefore !== c.before_image_key || newAfter !== c.after_image_key) {
    await d1("UPDATE cases SET before_image_key = ?, after_image_key = ? WHERE id = ?", [newBefore, newAfter, c.id]);
    console.log(`  ✅ ${c.id}: ${newBefore} / ${newAfter}`);
    fixed++;
  }
}

console.log(`\n✅ Xong! ${fixed} cases updated.\n`);
