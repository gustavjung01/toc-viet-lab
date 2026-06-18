import { AdminShell } from "@/components/admin/shell";
import { AdminGuardMessage } from "@/components/admin/guard-message";
import { AdminContentTabs } from "@/components/admin/content-tabs";
import { readAdminAccess } from "@/lib/admin-permission";
import { absoluteSiteUrl } from "@/lib/site-url";

type FormulaRow = {
  id?: string;
  slug: string;
  title: string;
  tag?: string;
  base?: string;
  developer?: string;
  ratio?: string;
  excerpt?: string;
  note?: string;
  readTime?: number;
};

async function getFormulas() {
  try {
    const res = await fetch(absoluteSiteUrl("/api/formulas?limit=50"), { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Không đọc được formulas API.");
    return { rows: (data.formulas ?? []) as FormulaRow[], total: Number(data.total ?? data.formulas?.length ?? 0), error: "" };
  } catch (error: any) {
    return { rows: [] as FormulaRow[], total: 0, error: error?.message || "Không đọc được formulas." };
  }
}

export default async function AdminFormulasPage() {
  const access = await readAdminAccess();
  if (!access.ok) return <AdminGuardMessage status={access.status} reason={access.reason} />;
  const { rows, total, error } = await getFormulas();

  return (
    <AdminShell>
      <AdminContentTabs />
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Content</p>
        <h2 className="mt-3 text-3xl font-black text-white">Công thức màu</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/65">MVP read-only. Tổng: {total}</p>
      </section>
      {error && <div className="mt-5 rounded-3xl border border-red-300/30 bg-red-500/10 p-4 text-sm font-bold text-red-100">{error}</div>}
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((formula, index) => (
          <article key={formula.slug || formula.id || index} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <span className="rounded-full bg-[#D6A84F]/15 px-3 py-1 text-xs font-black text-[#F0C76A]">{formula.tag || "Công thức"}</span>
            <h3 className="mt-4 text-xl font-black text-white">{formula.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-white/60">{formula.excerpt || formula.note || "Chưa có mô tả."}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-bold text-white/70">
              <span className="rounded-2xl bg-black/30 p-3">Nền<br />{formula.base || "-"}</span>
              <span className="rounded-2xl bg-black/30 p-3">Oxy<br />{formula.developer || "-"}</span>
              <span className="rounded-2xl bg-black/30 p-3">Tỷ lệ<br />{formula.ratio || "-"}</span>
            </div>
            <p className="mt-4 text-xs font-bold text-white/45">/{formula.slug}</p>
          </article>
        ))}
        {rows.length === 0 && !error && <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/55">Chưa có công thức màu.</div>}
      </section>
    </AdminShell>
  );
}
