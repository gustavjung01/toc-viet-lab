import Link from "next/link";
import { BookOpen, BrainCircuit, Briefcase, CreditCard, Home, NotebookTabs, Palette, Settings } from "lucide-react";
import { Logo } from "./logo";
import { auth } from "@/auth";
import { SignOutButton } from "./sign-out-button";
import { MobileBottomNav } from "./mobile-bottom-nav";

const menu = [
  { label: "Tổng quan", href: "/dashboard", icon: Home },
  { label: "Tin tuyển dụng", href: "/tuyen-dung-cua-toi", icon: Briefcase },
  { label: "Sổ tay của tôi", href: "/so-tay", icon: NotebookTabs },
  { label: "Công thức màu", href: "/cong-thuc-cua-toi", icon: Palette },
  { label: "Hỏi AI", href: "/ai-tu-van-mau", icon: BrainCircuit },
  { label: "Credit AI", href: "/credit-ai", icon: CreditCard },
  { label: "Cài đặt", href: "/settings", icon: Settings },
];

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const userName = session?.user?.name ?? "Thành viên";
  const userRole = (session?.user as any)?.role ?? "free";

  const roleLabel: Record<string, string> = {
    free: "Miễn phí",
    member: "Thành viên",
    pro: "Pro Member",
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-black p-5 text-white lg:block">
        <Logo />
        <nav className="mt-10 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-gold"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="pb-24 lg:pb-0 lg:pl-72">
        <div className="sticky top-0 z-30 border-b border-lineLight bg-cream/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <Link href="/" className="lg:hidden" aria-label="Về trang chủ">
              <Logo compact />
            </Link>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-mutedLight">Xin chào,</p>
              <h1 className="text-xl font-extrabold text-charcoal">{userName}</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Link
                href="/settings"
                className="hidden rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-black text-charcoal shadow-sm sm:inline-flex"
              >
                Tài khoản
              </Link>
              <div className="rounded-full bg-charcoal px-4 py-2 text-sm font-bold text-gold">
                {roleLabel[userRole] ?? "Thành viên"}
              </div>
              <SignOutButton />
            </div>
          </div>
          <nav className="mx-auto mt-3 flex max-w-6xl gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Tab tài khoản">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-black text-charcoal shadow-sm"
              >
                <item.icon size={14} />
                {item.label.replace(" của tôi", "")}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
      <MobileBottomNav />
    </div>
  );
}
