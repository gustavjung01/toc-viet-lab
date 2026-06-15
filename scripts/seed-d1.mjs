/**
 * Seed D1 database với articles, cases, formulas từ data nền.
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
    headers: { "Authorization": "Bearer " + TOKEN, "Content-Type": "application/json" },
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
  {
    id: "formula-lanh-khoi-anh-reu",
    slug: "lanh-khoi-anh-reu",
    title: "Lạnh khói ánh rêu",
    excerpt: "Công thức lạnh khói rêu cho nền vàng cam level 6, phù hợp balayage hoặc phần thân ngọn cần trung hòa ấm.",
    content: `## Khi nào dùng
Công thức này hợp với nền level 6 có ánh vàng cam, đặc biệt khi khách muốn tông lạnh nhưng không muốn màu bị xanh rêu gắt.

## Công thức tham khảo
- **Màu chính:** 7.1 + 7.2 + 0.11.
- **Tỷ lệ gợi ý:** 60% 7.1, 30% 7.2, 10% 0.11.
- **Oxy:** 6% / 20 vol.

## Lưu ý kỹ thuật
- Nền quá cam đỏ cần xử lý nền trước.
- Ngọn tóc xốp có thể hút 0.11 nhanh hơn thân tóc.`,
    tag: "Balayage",
    base: "Level 6 - nền vàng cam",
    developer: "6% / 20 vol",
    ratio: "1 : 1.5",
    note: "Khử vàng nhẹ phần thân, giữ khói ở ngọn. Luôn test strand nếu tóc xốp hoặc từng phủ đen.",
    difficulty: "advanced",
    read_time: 7,
    image_key: "images/formulas/formula-lanh-khoi-anh-reu.png",
  },
  {
    id: "formula-beige-sua-lanh",
    slug: "beige-sua-lanh",
    title: "Beige sữa lạnh",
    excerpt: "Tông beige sáng, mềm và ít chói cho nền vàng nhạt level 8, hợp tóc Việt đã nâng nền sạch.",
    content: `## Khi nào dùng
Dùng khi tóc đã đạt level 8 vàng nhạt, nền tương đối sạch và khách muốn màu sáng nhưng vẫn sang, không bị vàng gắt.

## Công thức tham khảo
- **Màu chính:** 9.13 + 9.1 + clear.
- **Tỷ lệ gợi ý:** 50% 9.13, 30% 9.1, 20% clear.
- **Oxy:** 3% / 10 vol.

## Lưu ý kỹ thuật
- Không dùng quá nhiều ash nếu muốn giữ sắc sữa.
- Nếu nền level 9, thêm clear để màu không bị đậm.`,
    tag: "Nhuộm toàn bộ",
    base: "Level 8 - nền vàng nhạt",
    developer: "3% / 10 vol",
    ratio: "1 : 1.5",
    note: "Tạo be sáng, cân bằng rêu nhẹ. Giữ thời gian ngắn nếu nền xốp.",
    difficulty: "intermediate",
    read_time: 6,
    image_key: "images/formulas/formula-beige-sua-lanh.png",
  },
  {
    id: "formula-nau-tra-sua",
    slug: "nau-tra-sua",
    title: "Nâu trà sữa",
    excerpt: "Tông nâu trà sữa dễ ứng dụng, hợp nền level 7 vàng và khách cần màu bền, tự nhiên, sáng da.",
    content: `## Khi nào dùng
Công thức này phù hợp khách muốn màu nhẹ, dễ chăm sóc, không cần tẩy quá sáng và có thể đi làm hằng ngày.

## Công thức tham khảo
- **Màu chính:** 7.13 + 7.0 + 8.3.
- **Tỷ lệ gợi ý:** 50% 7.13, 30% 7.0, 20% 8.3.
- **Oxy:** 3% / 10 vol.

## Lưu ý kỹ thuật
- Nếu nền còn cam, thêm một lượng nhỏ ash/rêu để cân bằng.
- Nếu tóc bạc trên 30%, tăng base tự nhiên.`,
    tag: "Nhuộm toàn bộ",
    base: "Level 7 - nền vàng",
    developer: "3% / 10 vol",
    ratio: "1 : 1.5",
    note: "Tông tự nhiên, phù hợp da ấm. Có thể tăng nâu tự nhiên nếu tóc bạc nhẹ.",
    difficulty: "basic",
    read_time: 5,
    image_key: "images/formulas/formula-nau-tra-sua.png",
  },
  {
    id: "formula-nau-lanh-khoi",
    slug: "nau-lanh-khoi-khu-cam-nen-5",
    title: "Nâu lạnh khói khử cam nền 5",
    excerpt: "Xử lý nền 5 còn cam đỏ để ra nâu lạnh có chiều sâu, không bị xanh rêu bẩn.",
    content: `## Khi nào dùng
Dùng cho tóc nền 5 còn cam đỏ sau nâng tông hoặc sau khi phai từ màu nâu ấm.

## Công thức tham khảo
- **Màu chính:** 6.1 + 5.0 + 0.11.
- **Tỷ lệ gợi ý:** 60% 6.1, 30% 5.0, 10% 0.11.
- **Oxy:** 6% / 20 vol.

## Lưu ý kỹ thuật
- Không kỳ vọng ra khói sáng nếu nền vẫn ở level 5.
- Nếu tóc từng phủ đen, nên test strand trước khi làm toàn đầu.`,
    tag: "Sửa lỗi màu",
    base: "Level 5 - nền cam đỏ",
    developer: "6% / 20 vol",
    ratio: "1 : 1.2",
    note: "Ưu tiên cân bằng nền trước, không dồn ash quá mạnh trên nền đỏ cam.",
    difficulty: "advanced",
    read_time: 8,
    image_key: "images/formulas/formula-nau-lanh-khoi.png",
  },
  {
    id: "formula-ash-beige-highlight",
    slug: "ash-beige-highlight-nen-8",
    title: "Ash beige highlight nền 8",
    excerpt: "Toner ash beige cho highlight nền 8 đến 9, giữ độ trong nhưng vẫn làm dịu vàng.",
    content: `## Khi nào dùng
Dùng sau khi nâng highlight lên level 8 đến 9, nền còn vàng sáng và cần chuyển sang beige lạnh tự nhiên.

## Công thức tham khảo
- **Màu chính:** 9.1 + 9.13 + clear.
- **Tỷ lệ gợi ý:** 40% 9.1, 40% 9.13, 20% clear.
- **Oxy:** 1.5% đến 3%.

## Lưu ý kỹ thuật
- Nếu nền level 9 rất sáng, tăng clear để tránh xám.
- Không dùng oxy cao vì có thể làm nền tối bị ấm thêm.`,
    tag: "Highlight",
    base: "Level 8-9 - nền vàng sáng",
    developer: "1.5% - 3%",
    ratio: "1 : 2",
    note: "Dùng oxy thấp để gửi tone, tránh làm highlight bị xám lì.",
    difficulty: "intermediate",
    read_time: 6,
    image_key: "images/formulas/formula-ash-beige-highlight.png",
  },
  {
    id: "formula-nau-socola-phuc-hoi",
    slug: "nau-socola-phuc-hoi-toc-tay-xop",
    title: "Nâu socola phục hồi tóc tẩy xốp",
    excerpt: "Công thức đưa tóc tẩy xốp về nâu socola mềm, có chiều sâu và dễ chăm sóc sau dịch vụ.",
    content: `## Khi nào dùng
Dùng khi khách có tóc tẩy sáng, xốp, phai màu nhanh và muốn quay về tông nâu dễ chăm sóc hơn.

## Công thức tham khảo
- **Bù nền:** 7.34 hoặc filler cam vàng loãng tùy nền.
- **Màu chính:** 6.7 + 6.0 + 5.3.
- **Oxy:** 3% / 10 vol.

## Lưu ý kỹ thuật
- Không hạ màu trực tiếp bằng nâu lạnh trên tóc tẩy xốp.
- Nếu tóc quá yếu, ưu tiên phục hồi trước và nhuộm ở buổi sau.`,
    tag: "Phục hồi màu",
    base: "Level 8-9 - tóc tẩy xốp",
    developer: "3% / 10 vol",
    ratio: "1 : 1.5",
    note: "Cần bù nền ấm nhẹ trước khi hạ màu để tránh nâu bị xanh hoặc xỉn.",
    difficulty: "advanced",
    read_time: 8,
    image_key: "images/formulas/formula-nau-socola-phuc-hoi.png",
  },
];

async function main() {
  console.log("Bắt đầu seed D1...\n");

  for (const a of articles) {
    try {
      await query(
        `INSERT OR IGNORE INTO articles (id, slug, title, excerpt, category, difficulty, read_time, image_key, published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [randomId(), a.slug, a.title, a.excerpt, a.category, a.difficulty, a.read_time, a.image_key]
      );
      console.log(`✅ Article: ${a.title}`);
    } catch (e) {
      console.error(`❌ Article failed: ${a.title} - ${e.message}`);
    }
  }

  for (const c of cases) {
    try {
      await query(
        `INSERT OR IGNORE INTO cases (id, title, description, category, before_image_key, after_image_key, formula, published)
         VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
        [randomId(), c.title, c.description, c.category, c.before_image_key, c.after_image_key, c.formula]
      );
      console.log(`✅ Case: ${c.title}`);
    } catch (e) {
      console.error(`❌ Case failed: ${c.title} - ${e.message}`);
    }
  }

  for (const f of formulas) {
    try {
      await query(
        `INSERT INTO formulas (id, slug, title, excerpt, content, tag, base, developer, ratio, note, difficulty, read_time, image_key, published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
         ON CONFLICT(slug) DO UPDATE SET
          title = excluded.title,
          excerpt = excluded.excerpt,
          content = excluded.content,
          tag = excluded.tag,
          base = excluded.base,
          developer = excluded.developer,
          ratio = excluded.ratio,
          note = excluded.note,
          difficulty = excluded.difficulty,
          read_time = excluded.read_time,
          image_key = excluded.image_key,
          published = 1`,
        [f.id, f.slug, f.title, f.excerpt, f.content, f.tag, f.base, f.developer, f.ratio, f.note, f.difficulty, f.read_time, f.image_key]
      );
      console.log(`✅ Formula: ${f.title}`);
    } catch (e) {
      console.error(`❌ Formula failed: ${f.title} - ${e.message}`);
    }
  }

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
