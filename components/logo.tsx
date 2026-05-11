import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne text-charcoal shadow-gold">
        <span className="text-xl font-black">T</span>
      </div>
      {!compact && (
        <div>
          <div className="text-lg font-extrabold tracking-tight text-champagne">Tóc Việt Lab</div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Kiến thức · Kỹ thuật · Tư duy</div>
        </div>
      )}
    </Link>
  );
}
