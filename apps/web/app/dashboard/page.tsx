import { AppShell } from "@/components/app-shell";
import { DashboardContentPreview } from "@/components/account/dashboard-content-preview";
import { auth } from "@/auth";
import { AlertCircle, BookOpen, FlaskConical, NotebookPen, Sparkles } from "lucide-react";

type UserStats = {
  saved: number;
  formulas: number;
  aiUsed: number;
  aiCredits: number;
};

type UserStatsResult = {
  stats: UserStats;
  error?: string;
};

const EMPTY_STATS: UserStats = { saved: 0, formulas: 0, aiUsed: 0, aiCredits: 0 };

function hasD1Env() {
  return Boolean(
    process.env.CLOUDFLARE_ACCOUNT_ID &&
    process.env.CLOUDFLARE_D1_DATABASE_ID &&
    process.env.CLOUDFLARE_D1_TOKEN
  );
}

async function getUserStats(userId: string): Promise<UserStatsResult> {
  if (!hasD1Env()) {
    return {
      stats: EMPTY_STATS,
      error: "Chưa cấu hình D1 env cho dashboard. Các số liệu bên dưới đang tạm hiển thị 0.",
    };
  }

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
      if (!res.ok || !data.success) {
        throw new Error(data.errors?.[0]?.message || "Không thể đọc dữ liệu D1.");
      }
      return data.result?.[0]?.results?.[0];
    };

    const [saved, formulas, aiLogs, credits] = await Promise.all([
      query("SELECT COUNT(*) as count FROM saved_items WHERE user_id = ?", [userId]),
      query("SELECT COUNT(*) as count FROM user_formulas WHERE user_id = ?", [userId]),
      query("SELECT COUNT(*) as count FROM ai_usage_logs WHERE user_id = ?", [userId]),
      query("SELECT ai_credits FROM users WHERE id = ?", [userId]),
    ]);

    return {
      stats: {
        saved: saved?.count ?? 0,
        formulas: formulas?.count ?? 0,
        aiUsed: aiLogs?.count ?? 0,
        aiCredits: credits?.ai_credits ?? 0,
      },
    };
  } catch (e: any) {
    return {
      stats: EMPTY_STATS,
      error: e?.message || "Không thể tải thống kê tài khoản.",
    };
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

  const statsResult = userId
    ? await getUserStats(userId)
    : { stats: EMPTY_STATS, error: "Không tìm thấy user id trong session." };
  const userStats = statsResult.stats;

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

        {statsResult.error && (
          <div className="mt-6 flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm font-semibold leading-6">{statsResult.error}</p>
          </div>
        )}

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

      <DashboardContentPreview />
    </AppShell>
  );
}
