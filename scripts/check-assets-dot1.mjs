import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const MANIFEST_FILE = path.join(ROOT, "lib", "image-assets.ts");
const REPORT_FILE = path.join(ROOT, "ASSET_CHECK_REPORT.md");

const SUPPORTED_EXTS = [".webp", ".png", ".jpg", ".jpeg", ".svg"];

const ASSETS = [
  // 1. Logo / brand
  "toc-viet-lab-logo",
  "toc-viet-lab-mark",

  // 2. Hero
  "hero-salon-desktop",
  "hero-salon-mobile",
  "hero-ai-hair-glow",
  "hero-member-notebook",

  // 3. Article
  "article-toc-nen-5-anh-cam",
  "article-tay-toc-an-toan",
  "article-phu-bac-tu-nhien",
  "article-sua-loi-mau-khoi-xanh-reu",
  "article-bang-nen-toc",
  "article-vong-tron-mau-toc",
  "article-phuc-hoi-toc-hu-ton",
  "article-cham-soc-toc-sau-nhuom",

  // 4. Case before / after
  "case-01-before-nen-den-tu-nhien",
  "case-01-after-beige-ash",
  "case-02-before-nen-nau-tu-nhien",
  "case-02-after-balayage-xam-khoi",
  "case-03-before-toc-tay-hu-ton",
  "case-03-after-nau-socola-phuc-hoi",
  "case-04-before-toc-bac-50",
  "case-04-after-phu-bac-tu-nhien",
  "case-05-before-nen-vang-cam",
  "case-05-after-nau-lanh-khoi",

  // 5. Formula
  "formula-lanh-khoi-anh-reu",
  "formula-beige-sua-lanh",
  "formula-nau-tra-sua",
  "formula-nau-lanh-khoi",
  "formula-ash-beige-highlight",
  "formula-nau-socola-phuc-hoi",

  // 6. AI tools
  "ai-tu-van-mau",
  "ai-goi-y-cong-thuc",
  "ai-tao-phieu-tu-van",
  "ai-viet-bai-facebook",
  "ai-phan-tich-anh-toc",
  "ai-credit-dashboard",

  // 7. Dashboard / notebook
  "dashboard-member-overview",
  "notebook-saved-articles",
  "notebook-technical-notes",
  "notebook-checklist",
  "my-formula-library",
  "my-before-after-gallery",

  // 8. Pricing / trust
  "pricing-membership-hero",
  "pricing-credit-ai",
  "testimonial-salon-owner-01",
  "testimonial-salon-owner-02",
  "testimonial-salon-owner-03",
  "trust-salon-logos"
];

const MINIMUM_15 = [
  "hero-salon-desktop",
  "hero-salon-mobile",
  "article-toc-nen-5-anh-cam",
  "article-tay-toc-an-toan",
  "article-phu-bac-tu-nhien",
  "article-sua-loi-mau-khoi-xanh-reu",
  "case-01-before-nen-den-tu-nhien",
  "case-01-after-beige-ash",
  "case-02-before-nen-nau-tu-nhien",
  "case-02-after-balayage-xam-khoi",
  "case-03-before-toc-tay-hu-ton",
  "case-03-after-nau-socola-phuc-hoi",
  "formula-lanh-khoi-anh-reu",
  "formula-beige-sua-lanh",
  "ai-tu-van-mau"
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  const files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function baseName(file) {
  return path.basename(file, path.extname(file)).toLowerCase();
}

function toPublicUrl(file) {
  return "/" + path.relative(PUBLIC_DIR, file).replaceAll("\\", "/");
}

const publicFiles = walk(PUBLIC_DIR).filter((file) =>
  SUPPORTED_EXTS.includes(path.extname(file).toLowerCase())
);

const fileByAsset = new Map();

for (const file of publicFiles) {
  const key = baseName(file);
  if (!fileByAsset.has(key)) {
    fileByAsset.set(key, []);
  }
  fileByAsset.get(key).push(file);
}

const manifestText = fs.existsSync(MANIFEST_FILE)
  ? fs.readFileSync(MANIFEST_FILE, "utf8")
  : "";

function getManifestValue(asset) {
  const escaped = asset.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`["']${escaped}["']\\s*:\\s*(null|["']([^"']+)["'])`);
  const match = manifestText.match(regex);
  if (!match) return undefined;
  if (match[1] === "null") return null;
  return match[2];
}

const results = ASSETS.map((asset) => {
  const files = fileByAsset.get(asset) || [];
  const manifestValue = getManifestValue(asset);

  let manifestPathExists = false;

  if (typeof manifestValue === "string") {
    const clean = manifestValue.replace(/^\//, "");
    const full = path.join(PUBLIC_DIR, clean);
    manifestPathExists = fs.existsSync(full);
  }

  return {
    asset,
    files,
    urls: files.map(toPublicUrl),
    hasFile: files.length > 0,
    manifestValue,
    hasManifestKey: manifestValue !== undefined,
    manifestPathExists
  };
});

const missingFiles = results.filter((r) => !r.hasFile);
const missingManifestKeys = results.filter((r) => !r.hasManifestKey);
const nullManifest = results.filter((r) => r.manifestValue === null);
const wrongManifestPath = results.filter(
  (r) => typeof r.manifestValue === "string" && !r.manifestPathExists
);

const minimumMissing = MINIMUM_15.filter((asset) => {
  const item = results.find((r) => r.asset === asset);
  return !item || !item.hasFile || !item.hasManifestKey || item.manifestValue === null;
});

let report = "";

report += "# ASSET_CHECK_REPORT\n\n";
report += `Repo: \`${ROOT}\`\n\n`;
report += `Public dir: \`${PUBLIC_DIR}\`\n\n`;
report += `Manifest: \`${MANIFEST_FILE}\`\n\n`;

report += "## Tổng quan\n\n";
report += `- Tổng image key cần kiểm tra: ${ASSETS.length}\n`;
report += `- Có file thật trong public: ${results.filter((r) => r.hasFile).length}/${ASSETS.length}\n`;
report += `- Có key trong manifest: ${results.filter((r) => r.hasManifestKey).length}/${ASSETS.length}\n`;
report += `- Manifest đang null: ${nullManifest.length}\n`;
report += `- Manifest path sai/không tồn tại: ${wrongManifestPath.length}\n`;
report += `- 15 ảnh tối thiểu thiếu/lỗi: ${minimumMissing.length}\n\n`;

report += "## Bảng kiểm tra 48 ảnh\n\n";
report += "| Key | File trong public | Manifest | Trạng thái |\n";
report += "|---|---|---|---|\n";

for (const r of results) {
  const publicInfo = r.urls.length ? r.urls.join("<br>") : "THIẾU FILE";
  const manifestInfo =
    r.manifestValue === undefined
      ? "THIẾU KEY"
      : r.manifestValue === null
        ? "NULL"
        : r.manifestValue;

  let status = "OK";
  if (!r.hasFile) status = "THIẾU FILE";
  else if (!r.hasManifestKey) status = "THIẾU MANIFEST";
  else if (r.manifestValue === null) status = "MANIFEST NULL";
  else if (!r.manifestPathExists) status = "PATH SAI";

  report += `| ${r.asset} | ${publicInfo} | ${manifestInfo} | ${status} |\n`;
}

function listSection(title, items, mapper = (x) => x.asset) {
  report += `\n## ${title}\n\n`;
  if (!items.length) {
    report += "Không có.\n";
    return;
  }
  for (const item of items) {
    report += `- ${mapper(item)}\n`;
  }
}

listSection("Thiếu file trong public", missingFiles);
listSection("Thiếu key trong manifest", missingManifestKeys);
listSection("Manifest null", nullManifest);
listSection("Manifest path sai", wrongManifestPath, (item) => `${item.asset} -> ${item.manifestValue}`);

report += "\n## 15 ảnh tối thiểu thiếu/lỗi\n\n";
if (!minimumMissing.length) {
  report += "Đủ 15 ảnh tối thiểu.\n";
} else {
  for (const item of minimumMissing) {
    report += `- ${item}\n`;
  }
}

fs.writeFileSync(REPORT_FILE, report, "utf8");

console.log("ASSET CHECK DONE");
console.log(`Total: ${ASSETS.length}`);
console.log(`Files OK: ${results.filter((r) => r.hasFile).length}/${ASSETS.length}`);
console.log(`Manifest OK: ${results.filter((r) => r.hasManifestKey).length}/${ASSETS.length}`);
console.log(`Missing files: ${missingFiles.length}`);
console.log(`Missing manifest keys: ${missingManifestKeys.length}`);
console.log(`Manifest null: ${nullManifest.length}`);
console.log(`Wrong manifest paths: ${wrongManifestPath.length}`);
console.log(`Minimum 15 missing/lỗi: ${minimumMissing.length}`);
console.log(`Report: ${REPORT_FILE}`);

if (
  missingFiles.length ||
  missingManifestKeys.length ||
  nullManifest.length ||
  wrongManifestPath.length ||
  minimumMissing.length
) {
  process.exitCode = 1;
}
