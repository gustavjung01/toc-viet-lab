export function AdminStatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-2xl">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">{label}</p>
      <div className="mt-3 text-3xl font-black text-white">{value}</div>
      {hint && <p className="mt-2 text-sm font-semibold leading-6 text-white/55">{hint}</p>}
    </div>
  );
}
