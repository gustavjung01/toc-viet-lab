import { clsx } from "clsx";
export function HairVisual({ className, gradient = "from-[#211713] via-[#6b4a2f] to-[#c9a45c]", label }: { className?: string; gradient?: string; label?: string }) {
  return (
    <div className={clsx("relative overflow-hidden rounded-3xl", className)}>
      <div className={clsx("absolute inset-0 bg-gradient-to-br", gradient)} />
      <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_25%_25%,rgba(255,255,255,.35),transparent_20%),radial-gradient(circle_at_70%_35%,rgba(255,255,255,.22),transparent_18%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
      {label && <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-champagne backdrop-blur">{label}</div>}
    </div>
  );
}
