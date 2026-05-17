import { clsx } from "clsx";
import { toAssetUrl } from "@/lib/asset-url";

export function HairVisual({
  className,
  gradient = "from-[#211713] via-[#6b4a2f] to-[#c9a45c]",
  label,
  imageKey,
  src,
  alt = "Tóc Việt Lab",
  aspect = "aspect-[4/3] sm:aspect-video",
}: {
  className?: string;
  gradient?: string;
  label?: string;
  imageKey?: string;
  src?: string;
  alt?: string;
  aspect?: string;
}) {
  const resolved = toAssetUrl(src) ?? toAssetUrl(imageKey) ?? undefined;

  return (
    <div className={clsx("relative overflow-hidden", aspect || "aspect-[4/3] sm:aspect-video", className)}>
      {resolved ? (
        <>
          <img
            src={resolved}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
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
        <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {label}
        </div>
      )}
    </div>
  );
}
