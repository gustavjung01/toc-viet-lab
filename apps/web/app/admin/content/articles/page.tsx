import { AdminShell } from "@/components/admin/shell";
import { AdminGuardMessage } from "@/components/admin/guard-message";
import { AdminContentTabs } from "@/components/admin/content-tabs";
import { readAdminAccess } from "@/lib/admin-permission";
import { absoluteSiteUrl } from "@/lib/site-url";

type ArticleRow = {
  id?: string;
  slug: string;
  title: string;
  category?: string;
  difficulty?: string;
  read_time?: number;
  readTime?: number;
  excerpt?: string;
};

async function getArticles() {
  try {
    const res = await fetch(absoluteSiteUrl("/api/articles?limit=50"), { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Không đọc được articles API.");
    return { rows: (data.articles ?? []) as ArticleRow[], total: Number(data.total ?? data.articles?.length ?? 0), error: "" };
  } catch (error: any) {
    return { rows: [] as ArticleRow[], total: 0, error: error?.message || "Không đọc được articles." };
  }
}

export default async function AdminArticlesPage() {
  const access = await readAdminAccess();
  if (!access.ok) return <AdminGuardMessage status={access.status} reason={access.reason} />;
  const { rows, total, error } = await getArticles();

  return (
    <AdminShell>
      <AdminContentTabs />
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Content</p>
        <h2 className="mt-3 text-3xl font-black text-white">Bài kiến thức</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/65">MVP read-only. Tổng: {total}</p>
      </section>
      {error && <div className="mt-5 rounded-3xl border border-red-300/30 bg-red-500/10 p-4 text-sm font-bold text-red-100">{error}</div>}
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((article, index) => (
          <article key={article.slug || article.id || index} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <span className="rounded-full bg-[#D6A84F]/15 px-3 py-1 text-xs font-black text-[#F0C76A]">{article.category || "Kiến thức"}</span>
            <h3 className="mt-4 text-xl font-black text-white">{article.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-white/60">{article.excerpt || "Chưa có mô tả."}</p>
            <p className="mt-4 text-xs font-bold text-white/45">/{article.slug}</p>
          </article>
        ))}
        {rows.length === 0 && !error && <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/55">Chưa có bài viết.</div>}
      </section>
    </AdminShell>
  );
}
