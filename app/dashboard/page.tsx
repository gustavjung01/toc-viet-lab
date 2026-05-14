import { AppShell } from "@/components/app-shell";
import { ArticleCard, CaseCard, SectionHeader } from "@/components/cards";
import { articles, cases } from "@/lib/data";
import { auth } from "@/auth";
import { BookOpen, FlaskConical, NotebookPen, Sparkles } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ").pop() ?? "bạn";
  const role = (session?.user as any)?.role ?? "free";

  const roleLabel: Record<string, string> = {
    free: "Tài khoản miễn phí",
    member: "Thành viên",
    pro: "Pro Member",
  };

  const stats = [
    { label: "Bài đã lưu", value: "0", sub: "bài viết", icon: BookOpen, color: "text-blue-500" },
    { label: "Công thức màu", value: "0", sub: "công thức", icon: FlaskConical, color: "text-[#D6A84F]" },
    { label: "Ghi chú", value: "0", sub: "ghi chú", icon: NotebookPen, color: "text-green-500" },
    { label: "Lượt dùng AI", value: "0", sub: "lượt", icon: Sparkles, color: "text-purple-500" },
  ];

  return (
    <AppShell>
      <section>
        <p className="text-sm font-semibold text-warmgray">{roleLabel[role]}</p>
        <h1 className="mt-1 text-3xl font-black text-charcoal md:text-5xl">
          Chào mừng trở lại, {firstName} 👋
        </h1>
        <p className="mt-3 text-warmgray">
          Hôm nay bạn muốn học gì mới để nâng tầm tay nghề?
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-warmgray">{stat.label}</p>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div className="mt-3 text-4xl font-black text-charcoal">{stat.value}</div>
              <p className="text-sm text-warmgray">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader title="Tiếp tục học" />
        <div className="grid gap-6 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader title="Case gần đây" />
        <div className="grid gap-6 lg:grid-cols-3">
          {cases.map((item) => (
            <CaseCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
