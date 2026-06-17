"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, FlaskConical, Briefcase, Sparkles, UserCircle } from "lucide-react";

const navItems = [
  { label: "Trang chủ", href: "/", icon: Home },
  { label: "Kiến thức", href: "/kien-thuc", icon: BookOpen },
  { label: "Công thức", href: "/cong-thuc-mau", icon: FlaskConical },
  { label: "Tuyển", href: "/tuyen-dung", icon: Briefcase },
  { label: "AI", href: "/cong-cu-ai", icon: Sparkles },
  { label: "Tài khoản", href: "/dashboard", icon: UserCircle },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/dashboard") {
    return ["/dashboard", "/settings", "/so-tay", "/tuyen-dung-cua-toi", "/cong-thuc-cua-toi", "/credit-ai"].some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/15 bg-black/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md lg:hidden">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-6 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 transition-colors ${
                isActive ? "text-gold" : "text-white/60 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.7 : 2} />
              <span className={`max-w-full truncate text-[10px] leading-none ${isActive ? "font-black" : "font-semibold"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
