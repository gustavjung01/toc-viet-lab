import Link from "next/link";
import { assetUrl } from "@/lib/image-assets";

export function Logo({ compact = false }: { compact?: boolean }) {
  const mark = assetUrl("toc-viet-lab-mark");
  const logo = assetUrl("toc-viet-lab-logo");

  if (!compact && logo) {
    return (
      <Link href="/" className="flex items-center">
        <img
          src={logo}
          alt="Tóc Việt Lab"
          className="h-12 w-auto max-w-[220px] object-contain"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center gap-3">
      {mark ? (
        <img
          src={mark}
          alt="Tóc Việt Lab"
          className="h-11 w-11 rounded-full object-contain"
        />
      ) : (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne text-charcoal shadow-gold">
          <span className="text-xl font-black">T</span>
        </div>
      )}

      {!compact && (
        <div>
          <div className="text-lg font-extrabold tracking-tight text-champagne">
            Tóc Việt Lab
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            Kiến thức · Kỹ thuật · Tư duy
          </div>
        </div>
      )}
    </Link>
  );
}
