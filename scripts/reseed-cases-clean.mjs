/**
 * reseed-cases-clean.mjs
 * Xóa TOÀN BỘ cases rồi seed lại 30 case chuẩn với ID ổn định (slug).
 * Dùng khi DB bị corrupt hoặc cần reset về trạng thái chuẩn.
 *
 * Run: node scripts/reseed-cases-clean.mjs
 * Bỏ qua confirm: node scripts/reseed-cases-clean.mjs --yes
 *
 * ⚠️  CẢNH BÁO: Sẽ xóa TẤT CẢ records trong bảng cases (kể cả data thật).
 */

import { readFileSync, existsSync } from "fs";
import { createInterface } from "readline";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKIP_CONFIRM = process.argv.includes("--yes");

function loadEnv() {
  const p = resolve(__dirname, "../.env.local");
  const env = {};
  if (existsSync(p)) {
    for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
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
  console.error("❌ Thiếu CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_D1_DATABASE_ID / CLOUDFLARE_D1_TOKEN");
  process.exit(1);
}

const API_URL = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;

async function d1(sql, params = []) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql, params }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors));
  return data.result[0];
}

// ─── Confirmation prompt ──────────────────────────────────────────────────────
async function confirm(question) {
  if (SKIP_CONFIRM) return true;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "yes");
    });
  });
}

// ─── Case data (stable slug IDs, mirrors seed-30-cases.mjs) ──────────────────
const CASES = [
  {
    slug: "tvl-color-001", title: "Nâu lạnh cho nền đen Việt Nam không bị đỏ cam",
    description: "Từ nền đen tự nhiên, mục tiêu là nâu lạnh thực tế ở cấp 5-6, không ép sáng quá mức.",
    category: "Nâng tông",
    before_image_key: "images/cases/before-tvl-color-001.webp",
    after_image_key: "images/cases/after-tvl-color-001.webp",
    analysis: "Tóc Việt Nam nền tối thường lộ đỏ/cam khi nâng; cần chọn mục tiêu trong giới hạn level 5-6 hoặc nâng nền trước nếu khách muốn sáng hơn.",
    formula: "Oxy 6% / 20 vol, màu nâu lạnh 5.1 + 0.1, tỷ lệ 1:1.5, để 35 phút.",
  },
  {
    slug: "tvl-color-002", title: "Beige ash từ nền đen: case phải tư vấn theo buổi",
    description: "Beige ash cần nền đủ sáng; không nên hứa chỉ nhuộm một lần trên nền đen.",
    category: "Nâng tông",
    before_image_key: "images/cases/before-tvl-color-002.webp",
    after_image_key: "images/cases/after-tvl-color-002.webp",
    analysis: "Cần nâng nền có kiểm soát trước khi toner; nếu không đạt level, chọn nâu beige thay vì ash sáng.",
    formula: "Buổi 1: nâng nền oxy 9% vùng giữa-ngọn. Buổi 2: toner beige ash 9.13 + 0.1.",
  },
  {
    slug: "tvl-color-005", title: "Nền vàng cam level 7 lên màu trà sữa",
    description: "Case phổ biến: nền chưa sạch nhưng khách muốn trà sữa/beige.",
    category: "Nâng tông",
    before_image_key: "images/cases/before-tvl-color-005.webp",
    after_image_key: "images/cases/after-tvl-color-005.webp",
    analysis: "Cần làm đều nền trước; toner beige-violet nhẹ tránh bệt xám.",
    formula: "Toner 10.1 + 10.2 mix, oxy 1.5%, để 15 phút. Sau đó gloss.",
  },
  {
    slug: "tvl-color-025", title: "Pastel không lên vì nền chưa đủ sáng",
    description: "Pastel cần nền level 9-10 sạch; nền 7-8 sẽ bẩn hoặc không thấy màu.",
    category: "Nâng tông",
    before_image_key: "images/cases/before-tvl-color-025.webp",
    after_image_key: "images/cases/after-tvl-color-025.webp",
    analysis: "Test lọn để xem tóc có nâng tiếp được không. Ép sáng gây đứt, pastel ra bẩn.",
    formula: "Tẩy tóc đến level 9-10 trước. Sau đó pastel toner pha với conditioner 1:3.",
  },
  {
    slug: "tvl-color-006", title: "Màu lạnh bị xỉn: làm trong lại màu không phá tóc",
    description: "Tóc bị tối bẩn sau khi dập cam/toner ash quá mạnh.",
    category: "Kỹ thuật",
    before_image_key: "images/cases/before-tvl-color-006.webp",
    after_image_key: "images/cases/after-tvl-color-006.webp",
    analysis: "Xử lý bằng làm sạch màu nhẹ, cân bằng lại ánh ấm, không tẩy mạnh toàn đầu.",
    formula: "Color cleanser nhẹ, sau đó nhuộm lại 6.0 + 6.3, oxy 3%.",
  },
  {
    slug: "tvl-color-007", title: "Khử xanh rêu sau màu khói bị lệch",
    description: "Màu khói/ash có thể chuyển xanh rêu trên tóc xốp hoặc thiếu nền ấm.",
    category: "Kỹ thuật",
    before_image_key: "images/cases/before-tvl-color-007.webp",
    after_image_key: "images/cases/after-tvl-color-007.webp",
    analysis: "Dùng đối màu ấm liều nhỏ; xử lý theo vùng xốp trước.",
    formula: "Mix 0.3 + 0.43 liều nhỏ vào công thức chính, oxy 3%, để 20 phút.",
  },
  {
    slug: "tvl-color-014", title: "Ngọn xốp hút màu quá đậm",
    description: "Tóc xốp sẽ hút toner/màu nhanh, thường làm ngọn bệt tối.",
    category: "Kỹ thuật",
    before_image_key: "images/cases/before-tvl-color-014.webp",
    after_image_key: "images/cases/after-tvl-color-014.webp",
    analysis: "Cân bằng độ xốp, bôi màu ngọn sau cùng hoặc pha loãng/clear.",
    formula: "Bôi vùng chân-thân trước 10 phút. Ngọn pha 50% clear + 50% màu, oxy 1.5%.",
  },
  {
    slug: "tvl-color-017", title: "Màu nhanh phai sau 1-2 tuần",
    description: "Không chỉ là lỗi thuốc; thường do độ xốp, nền tẩy cũ và chăm sóc sai.",
    category: "Kỹ thuật",
    before_image_key: "images/cases/before-tvl-color-017.webp",
    after_image_key: "images/cases/after-tvl-color-017.webp",
    analysis: "Cần đánh giá porosity, dùng gloss/acid care và routine tại nhà.",
    formula: "Acid gloss sau mỗi lần nhuộm. Toner bền màu oxy 1.5% thay 3%.",
  },
  {
    slug: "tvl-bleach-002", title: "Nền đen Việt lên level 8-9: không ép một phiên",
    description: "Tẩy sáng mạnh trên nền đen cần lộ trình kiểm soát sức tóc.",
    category: "Tẩy",
    before_image_key: "images/cases/before-tvl-bleach-002.webp",
    after_image_key: "images/cases/after-tvl-bleach-002.webp",
    analysis: "Nền đỏ-cam-vàng xuất hiện theo quá trình nâng; cần theo dõi và toner sau.",
    formula: "Buổi 1: tẩy bột + oxy 9%, để 40 phút. Buổi 2: tẩy nhẹ + toner.",
  },
  {
    slug: "tvl-bleach-004", title: "Tẩy trên nền nhuộm đen hộp",
    description: "Box dye/đen nhân tạo có thể nâng rất loang, là case cần test lọn bắt buộc.",
    category: "Tẩy",
    before_image_key: "images/cases/before-tvl-bleach-004.webp",
    after_image_key: "images/cases/after-tvl-bleach-004.webp",
    analysis: "Color remover trước, sau đó đánh giá vùng kẹt màu.",
    formula: "Color remover 30 phút. Kiểm tra vùng loang. Tẩy cục bộ nếu cần.",
  },
  {
    slug: "tvl-bleach-005", title: "Nền henna/metallic nghi ngờ: case nên từ chối nếu test xấu",
    description: "Một số lịch sử màu không rõ có thể phản ứng không an toàn với hóa chất.",
    category: "Tẩy",
    before_image_key: "images/cases/before-tvl-bleach-005.webp",
    after_image_key: "images/cases/after-tvl-bleach-005.webp",
    analysis: "Incompatibility test trước; ưu tiên từ chối tẩy nếu có phản ứng bất thường.",
    formula: "Incompatibility test 30 phút. Nếu OK mới tiến hành tẩy nhẹ.",
  },
  {
    slug: "tvl-bleach-008", title: "Banding 3 vùng chân-thân-ngọn",
    description: "Tóc có nhiều dải màu cần xử lý theo bản đồ nền.",
    category: "Tẩy",
    before_image_key: "images/cases/before-tvl-bleach-008.webp",
    after_image_key: "images/cases/after-tvl-bleach-008.webp",
    analysis: "Bôi theo vùng: vùng tối trước, vùng sáng bảo vệ, toner cuối.",
    formula: "Zone lightening: chân tẩy mạnh, thân tẩy vừa, ngọn bôi sau 15 phút.",
  },
  {
    slug: "tvl-bleach-013", title: "Overlap tẩy gây yếu tóc: dừng hóa chất",
    description: "Khi tóc đã trắng/xốp, làm thêm thường không phải giải pháp.",
    category: "Tẩy",
    before_image_key: "images/cases/before-tvl-bleach-013.webp",
    after_image_key: "images/cases/after-tvl-bleach-013.webp",
    analysis: "Ngưng tẩy/nhuộm mạnh; phục hồi, cắt, chờ tóc mới.",
    formula: "Dừng hóa chất. Keratin treatment + bond repair 4 tuần liên tục.",
  },
  {
    slug: "tvl-bleach-014", title: "Khách muốn bạch kim trong một ngày",
    description: "Case kinh điển cần kiểm soát kỳ vọng và pháp lý salon.",
    category: "Tẩy",
    before_image_key: "images/cases/before-tvl-bleach-014.webp",
    after_image_key: "images/cases/after-tvl-bleach-014.webp",
    analysis: "Test lọn, phân tích nền, báo trước giới hạn. Không hứa platinum 1 ngày.",
    formula: "Test lọn 48 giờ. Kế hoạch 3 buổi. Mỗi buổi tẩy không quá 50 phút.",
  },
  {
    slug: "tvl-color-009", title: "Nhuộm đen xong muốn sáng lại",
    description: "Đây là case rủi ro cao vì màu đen nhân tạo rất khó nâng đều.",
    category: "Sửa lỗi",
    before_image_key: "images/cases/before-tvl-color-009.webp",
    after_image_key: "images/cases/after-tvl-color-009.webp",
    analysis: "Cần color remover/test lọn; thường không thể lên beige/blonde sạch trong một lần.",
    formula: "Color remover + strand test. Mục tiêu thực tế: nâu 5-7 sau 2-3 buổi.",
  },
  {
    slug: "tvl-color-011", title: "Nhuộm không đều màu do nền nhiều lịch sử",
    description: "Nền nhiều vùng khác nhau cần map trước khi đặt màu.",
    category: "Sửa lỗi",
    before_image_key: "images/cases/before-tvl-color-011.webp",
    after_image_key: "images/cases/after-tvl-color-011.webp",
    analysis: "Chia zone theo level/độ xốp; không dùng một công thức cho toàn đầu.",
    formula: "Vẽ bản đồ nền. Công thức riêng từng vùng. Kiểm tra sau 20 phút.",
  },
  {
    slug: "tvl-corr-001", title: "Sửa tóc bị xanh rêu sau màu khói",
    description: "Case phải xử lý bằng đối màu rất tiết chế.",
    category: "Sửa lỗi",
    before_image_key: "images/cases/before-tvl-corr-001.webp",
    after_image_key: "images/cases/after-tvl-corr-001.webp",
    analysis: "Ấm hóa nhẹ vùng xanh, sau đó gloss toàn đầu.",
    formula: "0.3 + 0.43 liều 5% vào toner. Gloss acid sau cùng.",
  },
  {
    slug: "tvl-corr-002", title: "Màu bị bùn/xỉn sau dập cam",
    description: "Khi dập cam quá mạnh, tóc mất độ trong và trông già.",
    category: "Sửa lỗi",
    before_image_key: "images/cases/before-tvl-corr-002.webp",
    after_image_key: "images/cases/after-tvl-corr-002.webp",
    analysis: "Làm sạch màu nhẹ, trả lại sắc tố ấm cần thiết.",
    formula: "Mild cleanser 20 phút. Nhuộm lại beige ấm 7.32, oxy 3%.",
  },
  {
    slug: "tvl-corr-008", title: "Tóc quá sáng muốn trầm lại không bị xanh",
    description: "Khi xuống màu từ blonde, cần fill sắc tố thiếu.",
    category: "Sửa lỗi",
    before_image_key: "images/cases/before-tvl-corr-008.webp",
    after_image_key: "images/cases/after-tvl-corr-008.webp",
    analysis: "Pre-pigment/fill trước khi đặt màu mục tiêu.",
    formula: "Fill: 0.3 + 0.4, oxy 1.5%, 15 phút. Sau đó màu mục tiêu 6.0.",
  },
  {
    slug: "tvl-corr-011", title: "Highlight sọc vằn cần làm mềm",
    description: "Foil quá dày hoặc thiếu root shadow gây line cứng.",
    category: "Sửa lỗi",
    before_image_key: "images/cases/before-tvl-corr-011.webp",
    after_image_key: "images/cases/after-tvl-corr-011.webp",
    analysis: "Dùng lowlight, root smudge và gloss thay vì tẩy thêm toàn bộ.",
    formula: "Lowlight 5.0 xen kẽ. Root smudge 4.0. Gloss toàn đầu cuối.",
  },
  {
    slug: "tvl-corr-015", title: "Nhuộm đen hộp loang khi gỡ màu",
    description: "Đen hộp là nguồn gốc nhiều ca correction khó.",
    category: "Sửa lỗi",
    before_image_key: "images/cases/before-tvl-corr-015.webp",
    after_image_key: "images/cases/after-tvl-corr-015.webp",
    analysis: "Làm sạch nhiều bước, chấp nhận mục tiêu thấp hơn ảnh mẫu.",
    formula: "Remover lần 1-2. Mục tiêu: nâu 5-6. Không cam kết sáng hơn.",
  },
  {
    slug: "tvl-corr-017", title: "Phủ bạc không ăn vùng thái dương",
    description: "Tóc bạc vùng mai/thái dương thường kháng màu hơn.",
    category: "Phủ bạc",
    before_image_key: "images/cases/before-tvl-corr-017.webp",
    after_image_key: "images/cases/after-tvl-corr-017.webp",
    analysis: "Pre-softening, saturation kỹ, công thức natural/NN đủ nền.",
    formula: "Pre-soften 10 phút. Công thức 5NN + 5N, oxy 6%. Để 45 phút.",
  },
  {
    slug: "tvl-gray-002", title: "Bạc 50% kháng màu cần công thức nền chắc",
    description: "Fashion tone đơn lẻ thường không che được bạc kháng.",
    category: "Phủ bạc",
    before_image_key: "images/cases/before-tvl-gray-002.webp",
    after_image_key: "images/cases/after-tvl-gray-002.webp",
    analysis: "Tăng vai trò nền natural/NN, đủ thời gian xử lý.",
    formula: "5NN:5N = 50:50, oxy 6%, để 40-45 phút. Không dùng fashion tone.",
  },
  {
    slug: "tvl-gray-008", title: "Grey blending cho khách không muốn dặm chân liên tục",
    description: "Blend bạc giúp regrowth mềm hơn phủ kín truyền thống.",
    category: "Phủ bạc",
    before_image_key: "images/cases/before-tvl-gray-008.webp",
    after_image_key: "images/cases/after-tvl-gray-008.webp",
    analysis: "Babylight/lowlight/root blend theo mật độ bạc.",
    formula: "Babylight tẩy mảnh. Root blend 6.13. Gloss ash toàn đầu.",
  },
  {
    slug: "tvl-gray-015", title: "Chuyển từ phủ bạc sang grey blending ít bảo trì",
    description: "Case chiến lược để giữ khách lâu dài.",
    category: "Phủ bạc",
    before_image_key: "images/cases/before-tvl-gray-015.webp",
    after_image_key: "images/cases/after-tvl-gray-015.webp",
    analysis: "Giảm dần độ phủ đặc, thêm chiều sáng/tối để hòa bạc.",
    formula: "Lộ trình 3 buổi. Thêm highlight mảnh mỗi buổi. Giảm dần nền.",
  },
  {
    slug: "tvl-hilite-003", title: "Beige balayage trên nền tối Việt Nam",
    description: "Đẹp nhưng cần kiểm soát level và độ ấm nền.",
    category: "Balayage",
    before_image_key: "images/cases/before-tvl-hilite-003.webp",
    after_image_key: "images/cases/after-tvl-hilite-003.webp",
    analysis: "Foilyage vùng cần sáng, toner beige; giữ root tự nhiên.",
    formula: "Foilyage tẩy bột + oxy 9%. Toner beige 9.13 sau khi rửa.",
  },
  {
    slug: "tvl-hilite-007", title: "Airtouch trên nền đen châu Á",
    description: "Airtouch đẹp nhưng tốn thời gian và dễ quá tải nếu tóc dày.",
    category: "Balayage",
    before_image_key: "images/cases/before-tvl-hilite-007.webp",
    after_image_key: "images/cases/after-tvl-hilite-007.webp",
    analysis: "Chia section chuẩn, kiểm soát từng foil, toner mềm.",
    formula: "Airtouch từng section 2-3cm. Tẩy bột + oxy 9%. Toner beige ash.",
  },
  {
    slug: "tvl-repair-001", title: "Tóc tẩy nhũn như kẹo: case phải ưu tiên cứu tóc",
    description: "Tóc mất đàn hồi không nên tiếp tục hóa chất.",
    category: "Phục hồi",
    before_image_key: "images/cases/before-tvl-repair-001.webp",
    after_image_key: "images/cases/after-tvl-repair-001.webp",
    analysis: "Bond repair chỉ hỗ trợ; phần tóc mất cấu trúc cần cắt.",
    formula: "Bond repair Olaplex 1+2. Keratin treatment 3 tuần. Cắt ngọn chết.",
  },
  {
    slug: "tvl-texture-008", title: "Duỗi/ép trên tóc tẩy: rủi ro cao",
    description: "Tóc tẩy và duỗi mạnh là tổ hợp dễ đứt nhất trong salon.",
    category: "Phục hồi",
    before_image_key: "images/cases/before-tvl-texture-008.webp",
    after_image_key: "images/cases/after-tvl-texture-008.webp",
    analysis: "Test đàn hồi; ưu tiên keratin/treatment nhẹ hoặc không làm.",
    formula: "Test đàn hồi bắt buộc. Nếu OK: keratin nhẹ, nhiệt 180°C max.",
  },
  {
    slug: "tvl-scalp-011", title: "Da đầu nhạy trước dịch vụ hóa chất",
    description: "Case giúp salon tránh khiếu nại và bảo vệ khách.",
    category: "Da đầu",
    before_image_key: "images/cases/before-tvl-scalp-011.webp",
    after_image_key: "images/cases/after-tvl-scalp-011.webp",
    analysis: "Patch test, kiểm tra vết thương, chọn kỹ thuật tránh da đầu nếu cần.",
    formula: "Patch test 48 giờ. Kỹ thuật off-scalp nếu da nhạy. Tránh chà xát.",
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log("\n⚠️  reseed-cases-clean.mjs");
console.log("═══════════════════════════════════════════════════════════════");
console.log("  Thao tác này sẽ:");
console.log("  1. DELETE FROM cases  — xóa TẤT CẢ records (kể cả data thật)");
console.log(`  2. INSERT OR REPLACE   — seed lại ${CASES.length} case chuẩn`);
console.log("═══════════════════════════════════════════════════════════════\n");

const ok = await confirm('Nhập "yes" để tiếp tục, hoặc Enter để hủy: ');
if (!ok) {
  console.log("❌ Đã hủy. Không thay đổi gì.\n");
  process.exit(0);
}

// Step 1: Delete all
console.log("\n🗑️  Xóa toàn bộ cases...");
try {
  const result = await d1("DELETE FROM cases");
  console.log(`  ✅ Đã xóa. (changes: ${result?.meta?.changes ?? "n/a"})`);
} catch (e) {
  console.error(`  ❌ Lỗi DELETE: ${e.message}`);
  process.exit(1);
}

// Step 2: Reseed
console.log(`\n🌱 Seed lại ${CASES.length} case...\n`);
let inserted = 0;
let failed = 0;

for (const c of CASES) {
  try {
    await d1(
      `INSERT OR REPLACE INTO cases (id, title, description, category, before_image_key, after_image_key, analysis, formula, published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [c.slug, c.title, c.description, c.category, c.before_image_key, c.after_image_key, c.analysis, c.formula]
    );
    console.log(`  ✅ ${c.slug}`);
    inserted++;
  } catch (e) {
    console.warn(`  ⚠️  ${c.slug} — ${e.message.slice(0, 100)}`);
    failed++;
  }
}

console.log(`\n✅ Xong! ${inserted} inserted, ${failed} failed.\n`);
