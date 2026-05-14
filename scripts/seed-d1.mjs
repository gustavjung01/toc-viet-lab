/**
 * Seed D1 database với articles, cases, formulas từ lib/data
 * Chạy: node scripts/seed-d1.mjs
 */

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID;
const TOKEN = process.env.CLOUDFLARE_D1_TOKEN;

if (!ACCOUNT_ID || !DATABASE_ID || !TOKEN) {
  console.error("Missing env vars: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, CLOUDFLARE_D1_TOKEN");
  process.exit(1);
}

const API_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;

async function query(sql, params = []) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Authorization": `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql, params }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors));
  return data;
}

function randomId() {
  return Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
}

const articles = [
  { slug: "toc-nen-5-nhuom-nau-lanh-de-bi-anh-cam", title: "Vì sao tóc nền 5 nhuộm nâu lạnh dễ bị ánh cam?", category: "Kỹ thuật nhuộm", difficulty: "intermediate", read_time: 8, excerpt: "Phân tích sắc tố nền, ánh cam và nguyên tắc kiểm soát màu lạnh trên nền tóc Việt.", image_key: "images/articles/article-toc-nen-5-anh-cam.png" },
  { slug: "tay-toc-an-toan-quy-trinh-5-buoc", title: "Tẩy tóc an toàn: Quy trình 5 bước đạt nền vàng chuẩn", category: "Tẩy & nâng nền", difficulty: "advanced", read_time: 12, excerpt: "Cách kiểm soát nền, oxy, thời gian và phục hồi trong quá trình nâng sáng.", image_key: "images/articles/article-tay-toc-an-toan.png" },
  { slug: "phu-bac-tu-nhien-cho-toc-bac-50-80", title: "Phủ bạc tự nhiên cho tóc bạc 50% - 80%", category: "Phủ bạc", difficulty: "intermediate", read_time: 7, excerpt: "Tư duy chọn nền, base tự nhiên và cách tránh sáng chân khi phủ bạc.", image_key: "images/articles/article-phu-bac-tu-nhien.png" },
  { slug: "sua-loi-mau-khoi-bi-xanh-reu", title: "Sửa lỗi màu khói bị xanh rêu: nguyên nhân và xử lý", category: "Sửa lỗi màu", difficulty: "advanced", read_time: 10, excerpt: "Các tình huống màu khói lệch rêu, tóc xốp hút màu và hướng cân bằng lại.", image_key: "images/articles/article-sua-loi-mau-khoi-xanh-reu.png" },
];

const cases = [
  { title: "Từ nền đen tự nhiên sang Beige Ash ánh khói", description: "Tóc đen tự nhiên, sợi to, khô xơ nhẹ. Mục tiêu level 8–9, beige ash trong và bóng.", category: "Nâng tông", before_image_key: "images/cases/case-01-before-nen-den-tu-nhien.png", after_image_key: "images/cases/case-01-after-beige-ash.png", formula: "Tẩy 2 lần + nhuộm beige ash level 9" },
  { title: "Balayage xám khói trên nền nâu tự nhiên", description: "Nền nâu tự nhiên, thân tóc khỏe. Hiệu ứng chuyển màu mềm, ít lộ chân.", category: "Balayage", before_image_key: "images/cases/case-02-before-nen-nau-tu-nhien.png", after_image_key: "images/cases/case-02-after-balayage-xam-khoi.png", formula: "Balayage tẩy + toner xám khói" },
  { title: "Phục hồi và nhuộm nâu socola cho tóc tẩy hư tổn", description: "Tóc tẩy khô, xốp, thiếu bóng. Mục tiêu nâu socola mềm, giảm xơ.", category: "Phục hồi", before_image_key: "images/cases/case-03-before-toc-tay-hu-ton.png", after_image_key: "images/cases/case-03-after-nau-socola-phuc-hoi.png", formula: "Phục hồi bond + nhuộm nâu socola level 5" },
];

const formulas = [
  { title: "Lạnh khói ánh rêu", tag: "Balayage", base: "Level 6 - nền vàng cam", developer: "6% / 20 vol", ratio: "1 : 1.5", note: "Khử vàng nhẹ phần thân, giữ khói ở ngọn.", image_key: "images/formulas/formula-lanh-khoi-anh-reu.png" },
  { title: "Beige sữa lạnh", tag: "Nhuộm toàn bộ", base: "Level 8 - nền vàng nhạt", developer: "3% / 10 vol", ratio: "1 : 1.5", note: "Tạo be sáng, cân bằng rêu nhẹ.", image_key: "images/formulas/formula-beige-sua-lanh.png" },
  { title: "Nâu trà sữa", tag: "Nhuộm toàn bộ", base: "Level 7 - nền vàng", developer: "3% / 10 vol", ratio: "1 : 1.5", note: "Tông tự nhiên, phù hợp da ấm.", image_key: "images/formulas/formula-nau-tra-sua.png" },
];

async function main() {
  console.log("Bắt đầu seed D1...\n");

  // Seed articles
  for (const a of articles) {
    try {
      await query(
        `INSERT OR IGNORE INTO articles (id, slug, title, excerpt, category, difficulty, read_time, image_key, published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [randomId(), a.slug, a.title, a.excerpt, a.category, a.difficulty, a.read_time, a.image_key]
      );
      console.log(`✅ Article: ${a.title}`);
    } catch (e) {
      console.error(`❌ Article failed: ${a.title} — ${e.message}`);
    }
  }

  // Seed cases
  for (const c of cases) {
    try {
      await query(
        `INSERT OR IGNORE INTO cases (id, title, description, category, before_image_key, after_image_key, formula, published)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
        [randomId(), c.title, c.description, c.category, c.before_image_key, c.after_image_key, c.formula]
      );
      console.log(`✅ Case: ${c.title}`);
    } catch (e) {
      console.error(`❌ Case failed: ${c.title} — ${e.message}`);
    }
  }

  // Seed formulas
  for (const f of formulas) {
    try {
      await query(
        `INSERT OR IGNORE INTO formulas (id, title, tag, base, developer, ratio, note, image_key, published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [randomId(), f.title, f.tag, f.base, f.developer, f.ratio, f.note, f.image_key]
      );
      console.log(`✅ Formula: ${f.title}`);
    } catch (e) {
      console.error(`❌ Formula failed: ${f.title} — ${e.message}`);
    }
  }

  // Verify
  console.log("\n=== Kiểm tra ===");
  const counts = await query(
    `SELECT
      (SELECT COUNT(*) FROM articles) as articles,
      (SELECT COUNT(*) FROM cases) as cases,
      (SELECT COUNT(*) FROM formulas) as formulas`
  );
  const row = counts.result[0].results[0];
  console.log(`Articles: ${row.articles} | Cases: ${row.cases} | Formulas: ${row.formulas}`);
  console.log("\nSeed xong!");
}

main().catch(console.error);
