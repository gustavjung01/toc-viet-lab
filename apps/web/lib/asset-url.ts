import { imageAssets, type ImageAssetKey } from "./image-assets";

const ASSET_BASE = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || "").replace(/\/+$/, "");

function withAssetBase(path: string) {
  if (!ASSET_BASE) return path.startsWith("/") ? path : `/${path}`;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${ASSET_BASE}${cleanPath}`;
}

function isImageAssetKey(value: string): value is ImageAssetKey {
  return Object.prototype.hasOwnProperty.call(imageAssets, value);
}

export function toAssetUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;

  if (isImageAssetKey(path)) {
    const mapped = imageAssets[path];
    return mapped ? withAssetBase(mapped) : undefined;
  }

  const clean = path.replace(/^public\//, "");
  return withAssetBase(clean);
}

export function isRelativeAssetPath(value?: string | null) {
  return !!value && (value.includes("/") || /\.(png|jpg|jpeg|webp|avif)$/i.test(value));
}
