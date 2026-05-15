import { clsx } from "clsx";
import { assetUrl, type ImageAssetKey } from "@/lib/image-assets";

export function HairVisual({
  className,
  gradient = "from-[#211713] via-[#6b4a2f] to-[#c9a45c]",
  label,
  imageKey,
  src,
  alt = "Tóc Việt Lab"
}: {
  className?: string;
  gradient?: string;
  label?: string;
  imageKey?: ImageAssetKey | string;
  src?: string;
  alt?: string;
}) {
  // If imageKey is a direct path (e.g. "images/cases/before-..."), build URL from base
  // Otherwise, look up in the imageAssets map
  let finalSrc = src;
  if (!finalSrc && imageKey) {
    if (typeof imageKey === "string" && imageKey.includes("/")) {
      const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL || "";
      finalSrc = `${base}/${imageKey.replace(/^\//, "")}`;
    } else {
      finalSrc = assetUrl(imageKey as ImageAssetKey);
    }
  }

  return (
    <div className={clsx("relative overflow-hidden rounded-3xl", className)}>
      {finalSrc ? (
        <>
          <img
            src={finalSrc}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10" />
        </>
      ) : (
        <>
          <div className={clsx("absolute inset-0 bg-gradient-to-br", gradient)} />
          <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_25%_25%,rgba(255,255,255,.35),transparent_20%),radial-gradient(circle_at_70%_35%,rgba(255,255,255,.22),transparent_18%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
        </>
      )}

      {label && (
        <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-champagne backdrop-blur">
          {label}
        </div>
      )}
    </div>
  );
}
