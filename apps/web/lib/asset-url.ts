const DEFAULT_BASE = "https://cdn.tocvietlab.studio";
const ASSET_BASE = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || DEFAULT_BASE).replace(/\/+$/, "");

export function toAssetUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.replace(/^\/+/, "").replace(/^public\//, "");
  return `${ASSET_BASE}/${clean}`;
}

export function isRelativeAssetPath(value?: string | null) {
  return !!value && (value.includes("/") || /\.(png|jpg|jpeg|webp|avif)$/i.test(value));
}
