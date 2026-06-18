import { AdminShell } from "@/components/admin/shell";
import { AdminGuardMessage } from "@/components/admin/guard-message";
import { AdminContentTabs } from "@/components/admin/content-tabs";
import { readAdminAccess } from "@/lib/admin-permission";
import { absoluteSiteUrl } from "@/lib/site-url";

type CaseRow = {
  id?: string;
  title: string;
  category?: string;
  tag?: string;
  condition?: string;
  goal?: string;
  description?: string;
  salon?: string;
  time?: string;
};

async function getCases() {
  try {
    const res = await fetch(absoluteSiteUrl("/api/cases?limit=50"), { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Không đọc được cases API.");
    return { rows: (data.cases ?? []) as CaseRow[], total: Number(data.total ?? data.cases?.length ?? 0), error: "" };
  } catch (error: any) {
    return { rows: [] as CaseRow[], total: 0, error: error?.message || "Không đọc được cases." };
  }
}

export default async function AdminCasesPage() {
  const access = await readAdminAccess();
  if (!access.ok) return <AdminGuardMessage status={access.status} reason={access.reason} />;
  const { rows, total, error } = await getCases();

  return (
    <AdminShell>
      <AdminContentTabs />
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Content</p>
        <h2 className="mt-3 text-3xl font-black text-white">Case thực tế</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/65">MVP read-only. Tổng: {total}</p>
      </section>
      {error && <div className="mt-5 rounded-3xl border border-red-300/30 bg-red-500/10 p-4 text-sm font-bold text-red-100">{error}</div>}
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((item, index) => (
          <article key={item.id || item.title || index} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <span className="rounded-full bg-[#D6A84F]/15 px-3 py-1 text-xs font-black text-[#F0C76A]">{item.category || item.tag || "Case"}</span>
            <h3 className="mt-4 text-xl font-black text-white">{item.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-white/60">{item.description || item.condition || "Chưa có mô tả."}</p>
            <p className="mt-4 text-sm font-bold text-white/70">{item.salon || "Tóc Việt Lab"} {item.time ? `• ${item.time}` : ""}</p>
          </article>
        ))}
        {rows.length === 0 && !error && <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/55">Chưa có case thực tế.</div>}
      </section>
    </AdminShell>
  );
}
