import { AppShell } from "@/components/app-shell";
import { ArticleCard, CaseCard, SectionHeader } from "@/components/cards";
import { articles, cases } from "@/lib/data";
import { auth } from "@/auth";
import { BookOpen, FlaskConical, NotebookPen, Sparkles } from "lucide-react";

async function getUserStats(userId: string) {
  try {
    const query = async (sql: string, params: any[]) => {
      const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_D1_DATABASE_ID}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_D1_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sql, params }),
          cache: "no-store",
        }
      );
      const data = await res.json();
      return data.result?.[0]?.results?.[0];
    };

    const [saved, formulas, aiLogs, credits] = await Promise.all([
      query("SELECT COUNT(*) as count FROM saved_items WHERE user_id = ?", [userId]),
      query("SELECT COUNT(*) as count FROM user_formulas WHERE user_id = ?", [userId]),
      query("SELECT COUNT(*) as count FROM ai_usage_logs WHERE user_id = ?", [userId]),
      query("SELECT ai_credits FROM users WHERE id = ?", [userId]),
    ]);

    return {
      saved: saved?.count ?? 0,
      formulas: formulas?.count ?? 0,
      aiUsed: aiLogs?.count ?? 0,
      aiCredits: credits?.ai_credits ?? 0,
    };
  } catch {
    return { saved: 0, formulas: 0, aiUsed: 0, aiCredits: 0 };
  }
}

export default async function DashboardPage() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ").pop() ?? "bạn";
  const role = (session?.user as any)?.role ?? "free";
  const userId = (session?.user as any)?.id;

  const roleLabel: Record<string, string> = {
    free: "Tài khoản miễn phí",
    member: "Thành viên",
    pro: "Pro Member",
  };

  const userStats = userId ? await getUserStats(userId) : { saved: 0, formulas: 0, aiUsed: 0, aiCredits: 0 };

  const stats = [
    { label: "Bài đã lưu", value: String(userStats.saved), sub: "bài viết", icon: BookOpen, color: "text-blue-600" },
    { label: "Công thức màu", value: String(userStats.formulas), sub: "công thức", icon: FlaskConical, color: "text-goldText" },
    { label: "Lượt dùng AI", value: String(userStats.aiUsed), sub: "lượt", icon: Sparkles, color: "text-purple-600" },
    { label: "Credit AI còn lại", value: String(userStats.aiCredits), sub: "credit", icon: NotebookPen, color: "text-green-600" },
  ];

  return (
    <AppShell>
      <section>
        <p className="text-sm font-semibold text-mutedLight">{roleLabel[role]}</p>
        <h1 className="mt-1 text-3xl font-black text-charcoal md:text-5xl">
          Chào mừng trở lại, {firstName} 👋
        </h1>
        <p className="mt-3 text-mutedLight">
          Hôm nay bạn muốn học gì mới để nâng tầm tay nghề?
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-mutedLight">{stat.label}</p>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div className="mt-3 text-4xl font-black text-charcoal">{stat.value}</div>
              <p className="text-sm text-mutedLight">{stat.sub}</p>
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
