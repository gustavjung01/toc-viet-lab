import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const SOURCE_DIR =
  process.env.TVL_IMAGE_SOURCE ||
  "F:/1_A_Disk_D/khuong-binh/toc-viet-lab-backup/public/image";

const SUPPORTED_EXTS = [".webp", ".png", ".jpg", ".jpeg", ".svg"];

const ASSETS = [
  // Logo / brand
  "toc-viet-lab-logo",
  "toc-viet-lab-mark",

  // Hero
  "hero-salon-desktop",
  "hero-salon-mobile",
  "hero-ai-hair-glow",
  "hero-member-notebook",

  // Article
  "article-toc-nen-5-anh-cam",
  "article-tay-toc-an-toan",
  "article-phu-bac-tu-nhien",
  "article-sua-loi-mau-khoi-xanh-reu",
  "article-bang-nen-toc",
  "article-vong-tron-mau-toc",
  "article-phuc-hoi-toc-hu-ton",
  "article-cham-soc-toc-sau-nhuom",

  // Case before / after
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

  // Formula
  "formula-lanh-khoi-anh-reu",
  "formula-beige-sua-lanh",
  "formula-nau-tra-sua",
  "formula-nau-lanh-khoi",
  "formula-ash-beige-highlight",
  "formula-nau-socola-phuc-hoi",

  // AI tools
  "ai-tu-van-mau",
  "ai-goi-y-cong-thuc",
  "ai-tao-phieu-tu-van",
  "ai-viet-bai-facebook",
  "ai-phan-tich-anh-toc",
  "ai-credit-dashboard",

  // Dashboard / notebook
  "dashboard-member-overview",
  "notebook-saved-articles",
  "notebook-technical-notes",
  "notebook-checklist",
  "my-formula-library",
  "my-before-after-gallery",

  // Pricing / trust
  "pricing-membership-hero",
  "pricing-credit-ai",
  "testimonial-salon-owner-01",
  "testimonial-salon-owner-02",
  "testimonial-salon-owner-03",
  "trust-salon-logos"
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  const results = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function normalizeName(filePath) {
  return path.basename(filePath, path.extname(filePath)).toLowerCase();
}

function getCategory(assetName) {
  if (assetName === "toc-viet-lab-logo" || assetName === "toc-viet-lab-mark") {
    return {
      folder: "public/logo",
      urlPrefix: "/logo"
    };
  }

  if (assetName.startsWith("hero-")) {
    return {
      folder: "public/images/hero",
      urlPrefix: "/images/hero"
    };
  }

  if (assetName.startsWith("article-")) {
    return {
      folder: "public/images/articles",
      urlPrefix: "/images/articles"
    };
  }

  if (assetName.startsWith("case-")) {
    return {
      folder: "public/images/cases",
      urlPrefix: "/images/cases"
    };
  }

  if (assetName.startsWith("formula-")) {
    return {
      folder: "public/images/formulas",
      urlPrefix: "/images/formulas"
    };
  }

  if (assetName.startsWith("ai-")) {
    return {
      folder: "public/images/ai",
      urlPrefix: "/images/ai"
    };
  }

  if (
    assetName.startsWith("dashboard-") ||
    assetName.startsWith("notebook-") ||
    assetName.startsWith("my-")
  ) {
    return {
      folder: "public/images/dashboard",
      urlPrefix: "/images/dashboard"
    };
  }

  if (
    assetName.startsWith("pricing-") ||
    assetName.startsWith("testimonial-") ||
    assetName.startsWith("trust-")
  ) {
    return {
      folder: "public/images/pricing",
      urlPrefix: "/images/pricing"
    };
  }

  return {
    folder: "public/images/misc",
    urlPrefix: "/images/misc"
  };
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeTs(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const allFiles = walk(SOURCE_DIR);
const fileMap = new Map();

for (const file of allFiles) {
  const ext = path.extname(file).toLowerCase();
  if (!SUPPORTED_EXTS.includes(ext)) continue;

  const baseName = normalizeName(file);
  if (!fileMap.has(baseName)) {
    fileMap.set(baseName, file);
  }
}

const copied = [];
const missing = [];
const manifest = {};

for (const assetName of ASSETS) {
  const sourceFile = fileMap.get(assetName);

  if (!sourceFile) {
    manifest[assetName] = null;
    missing.push(assetName);
    continue;
  }

  const ext = path.extname(sourceFile).toLowerCase();
  const category = getCategory(assetName);
  const destDir = path.join(ROOT, category.folder);
  ensureDir(destDir);

  const destFile = path.join(destDir, `${assetName}${ext}`);
  fs.copyFileSync(sourceFile, destFile);

  const url = `${category.urlPrefix}/${assetName}${ext}`;
  manifest[assetName] = url;

  copied.push({
    name: assetName,
    source: sourceFile,
    dest: destFile,
    url
  });
}

const libDir = path.join(ROOT, "lib");
ensureDir(libDir);

const unionType = ASSETS.map((name) => `  | "${name}"`).join("\n");

const objectLines = ASSETS.map((name) => {
  const value = manifest[name];
  return `  "${name}": ${value ? `"${escapeTs(value)}"` : "null"}`;
}).join(",\n");

const manifestTs = `// Auto-generated by scripts/sync-assets-dot1.mjs
// Do not edit manually. Run: npm run sync:images

export type ImageAssetKey =
${unionType};

export const imageAssets: Record<ImageAssetKey, string | null> = {
${objectLines}
};

export function assetUrl(key: ImageAssetKey): string | undefined {
  const value = imageAssets[key];
  if (!value) return undefined;

  const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL || "";
  return \`\${base}\${value}\`;
}
`;

fs.writeFileSync(path.join(libDir, "image-assets.ts"), manifestTs, "utf8");

const report = `# ASSET_MAP_REPORT

Nguồn ảnh:

\`\`\`text
${SOURCE_DIR}
\`\`\` 

Đích trong repo:

\`\`\`text
${ROOT}
\`\`\`

## Đã copy: ${copied.length}/${ASSETS.length}

${copied
  .map(
    (item) =>
      `- ${item.name} -> \`${item.url}\``
  )
  .join("\n")}

## Thiếu: ${missing.length}

${
  missing.length
    ? missing.map((name) => `- ${name}`).join("\n")
    : "Không thiếu ảnh."
}

## Ghi chú

- File manifest đã tạo tại: \`lib/image-assets.ts\`
- Nếu sau này dùng R2/CDN, đặt biến môi trường:
  \`NEXT_PUBLIC_ASSET_BASE_URL=https://cdn-domain-cua-anh\`
- Hiện tại chưa có domain Cloudflare, nên để trống \`NEXT_PUBLIC_ASSET_BASE_URL\`.
`;

fs.writeFileSync(path.join(ROOT, "ASSET_MAP_REPORT.md"), report, "utf8");

console.log("Source: " + SOURCE_DIR);
console.log("Copied: " + copied.length + "/" + ASSETS.length);
console.log("Missing: " + missing.length);

if (missing.length) {
  console.log("\nMissing assets:");
  for (const name of missing) {
    console.log("- " + name);
  }
  process.exitCode = 1;
}