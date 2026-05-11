import Link from "next/link";
import { BookOpen, BrainCircuit, Home, LogOut, NotebookTabs, Palette, Settings } from "lucide-react";
import { Logo } from "./logo";

const menu = [
  { label: "Tổng quan", href: "/dashboard", icon: Home },
  { label: "Bài đã lưu", href: "/so-tay", icon: BookOpen },
  { label: "Sổ tay của tôi", href: "/so-tay", icon: NotebookTabs },
  { label: "Công thức màu", href: "/cong-thuc-cua-toi", icon: Palette },
  { label: "Hỏi AI", href: "/ai-tu-van-mau", icon: BrainCircuit },
  // Credit AI hidden - will be enabled later
  { label: "Cài đặt", href: "#", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 bg-black p-5 text-white lg:block">
        <Logo />
        <nav className="mt-10 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-gold"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        {/* Pro upgrade section hidden - will be enabled later */}
      </aside>
      <main className="lg:pl-72">
        <div className="sticky top-0 z-30 border-b border-black/5 bg-cream/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="lg:hidden">
              <Logo compact />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-muted">Tài khoản mẫu</p>
              <h1 className="text-xl font-extrabold text-black">Minh Anh Hair Stylist</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-black px-4 py-2 text-sm font-bold text-gold">Pro Member</div>
              <button className="rounded-full border border-black/10 p-3 text-black">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
