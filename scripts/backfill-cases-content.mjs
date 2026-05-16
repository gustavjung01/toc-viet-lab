/**
 * Backfill structured analysis for cases with short/missing analysis (idempotent).
 * Usage:
 *   node scripts/backfill-cases-content.mjs --minAnalysis 600 --dry-run
 *   node scripts/backfill-cases-content.mjs --minAnalysis 600
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

const env = loadEnv();
const ACC = process.env.CLOUDFLARE_ACCOUNT_ID || env.CLOUDFLARE_ACCOUNT_ID;
const DB  = process.env.CLOUDFLARE_D1_DATABASE_ID || env.CLOUDFLARE_D1_DATABASE_ID;
const TOK = process.env.CLOUDFLARE_D1_TOKEN || env.CLOUDFLARE_D1_TOKEN;
if (!ACC || !DB || !TOK) { console.error("Missing CLOUDFLARE_* envs"); process.exit(1); }

const args = process.argv.slice(2);
const MIN_A = Number(args.includes("--minAnalysis") ? args[args.indexOf("--minAnalysis") + 1] : 600);
const DRY   = args.includes("--dry-run");

const API = `https://api.cloudflare.com/client/v4/accounts/${ACC}/d1/database/${DB}/query`;

async function q(sql, params = []) {
  const r = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOK}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql, params }),
  });
  const d = await r.json();
  if (!d.success) throw new Error(JSON.stringify(d.errors));
  return d.result?.[0]?.results || [];
}

function buildAnalysis({ title, category, description }) {
  const cat = category || "xử lý tóc";
  const cond = description || "tình trạng phức tạp";
  const goalText = "cải thiện chất lượng và thẩm mỹ";
  return [
    "## Tổng quan ca",
    `Ca xử lý: "${title}". Thuộc nhóm ${cat}. Tình trạng ban đầu: ${cond}. Mục tiêu: ${goalText}.`,
    "",
    "## Vì sao ca này quan trọng với salon Việt",
    `Tình huống thuộc nhóm "${cat}" — rất phổ biến trong thực tế salon Việt, đặc biệt khi khách có tiền sử hóa chất hoặc tóc nền phức tạp. Nắm vững quy trình giúp tránh sai lỗi, bảo vệ uy tín salon và tối ưu doanh thu dịch vụ cao cấp.`,
    "",
    "## Đọc nền và đánh giá rủi ro trước khi làm",
    "Trước khi quyết định lộ trình, cần:\n1. **Test lọn** ở 3 vùng: gốc, thân, ngọn — xác định phản ứng thực tế.\n2. **Đánh giá độ xốp (porosity)**: kéo sợi tóc ướt — nếu đứt dễ = xốp cao, cần giảm oxydant.\n3. **Map vùng banding** nếu tóc đã xử lý nhiều lần — vùng sáng/tối không đều cần xử lý riêng.\n4. **Hỏi lịch sử hóa chất**: tẩy, duỗi, uốn, thuốc nhuộm gần nhất — tối thiểu 3 tháng gần đây.",
    "",
    "## Quy trình gợi ý (an toàn, theo vùng)",
    "1. **Phân vùng tóc** theo tình trạng thực tế (gốc mọc mới / thân / ngọn đã xử lý).\n2. **Xử lý vùng khó trước**: vùng kháng thuốc, vùng tối/sáng bất đồng đều.\n3. **Thoa công thức chính** theo lộ trình phù hợp — không ép nền quá 1–2 level/phiên.\n4. **Theo dõi sát**: check mỗi 10 phút, không để quá giờ.\n5. **Kết thúc bằng acid care/gloss**: đóng cuticle, tăng độ bóng, ổn định màu.",
    "",
    "## Lưu ý & bảo trì sau dịch vụ",
    "- Ghi rõ **kỳ vọng và giới hạn** với khách trước khi làm — tránh hiểu lầm về kết quả.\n- Khuyến nghị **shampoo/conditioner chuyên biệt** phù hợp với dịch vụ vừa thực hiện.\n- Hẹn lịch **bảo trì định kỳ**: color refresh sau 4–6 tuần, treatment sau 2–3 tuần.\n- **Không áp 1 công thức cho toàn đầu** — mỗi vùng tóc có trạng thái khác nhau."
  ].join("\n");
}

console.log(`\n📝 Backfill cases analysis (minAnalysis=${MIN_A}${DRY ? ", DRY RUN" : ""})...\n`);

const rows = await q(
  `SELECT id, title, category, description, IFNULL(LENGTH(analysis),0) AS alen FROM cases WHERE published=1 ORDER BY created_at DESC`
);
const targets = rows.filter(r => (r.alen ?? 0) < MIN_A);

if (targets.length === 0) {
  console.log(`✅ Tất cả cases đã có analysis >= ${MIN_A} chars. Không cần backfill.\n`);
  process.exit(0);
}

if (DRY) {
  console.log(`Would update ${targets.length} cases (analysis < ${MIN_A}):`);
  for (const r of targets) {
    const preview = buildAnalysis(r);
    console.log(`\n  [id=${r.id}] ${r.title}  (analysis=${r.alen} → ${preview.length})`);
  }
  console.log(`\nChạy lại không có --dry-run để ghi thật.\n`);
  process.exit(0);
}

let ok = 0, fail = 0;
for (const r of targets) {
  const analysis = buildAnalysis(r);
  try {
    await q(`UPDATE cases SET analysis = ? WHERE id = ?`, [analysis, r.id]);
    console.log(`  ✅ [id=${r.id}] ${r.title}  (${analysis.length} chars)`);
    ok++;
  } catch (e) {
    console.error(`  ❌ [id=${r.id}] ${r.title}: ${e.message || e}`);
    fail++;
  }
}
console.log(`\n✅ Done. Updated: ${ok}, Failed: ${fail}\n`);
