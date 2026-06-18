import Link from "next/link";
import { BarChart3, BookOpen, BriefcaseBusiness, Home, Settings, Users } from "lucide-react";

const items = [
  { label: "Tổng quan", href: "/admin", icon: BarChart3 },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Tuyển dụng", href: "/admin/recruitment/jobs", icon: BriefcaseBusiness },
  { label: "Nội dung", href: "/admin/content", icon: BookOpen },
  { label: "Cài đặt", href: "/admin/settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-black/70 p-5 lg:block">
        <Link href="/" className="inline-flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm font-black text-[#F0C76A]">
          <Home size={18} /> Tóc Việt Admin
        </Link>
        <nav className="mt-8 space-y-2">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/70 hover:bg-white/10 hover:text-[#F0C76A]">
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="pb-24 lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Admin portal</p>
              <h1 className="mt-1 text-2xl font-black text-white">Bảng điều khiển</h1>
            </div>
            <Link href="/dashboard" className="rounded-full border border-white/10 px-4 py-2 text-sm font-black text-white/80">Tài khoản</Link>
          </div>
          <nav className="mx-auto mt-4 flex max-w-7xl gap-2 overflow-x-auto pb-1 lg:hidden">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/80">
                <item.icon size={14} /> {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
