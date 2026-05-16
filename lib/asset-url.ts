const DEFAULT_BASE = "https://cdn.tocvietlab.studio";
const ASSET_BASE_URL = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || DEFAULT_BASE)?.replace(/\/$/, "");

export function toAssetUrl(path?: string | null): string | undefined {
  if (!path) return undefined;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const cleanPath = path
    .replace(/^\/+/, "")
    .replace(/^public\//, "");

  return ASSET_BASE_URL
    ? `${ASSET_BASE_URL}/${cleanPath}`
    : `/${cleanPath}`;
}
