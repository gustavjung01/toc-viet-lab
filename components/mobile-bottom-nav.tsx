"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, FlaskConical, Briefcase, Sparkles } from "lucide-react";

const navItems = [
  { label: "Trang chủ", href: "/", icon: Home },
  { label: "Kiến thức", href: "/kien-thuc", icon: BookOpen },
  { label: "Công thức", href: "/cong-thuc-mau", icon: FlaskConical },
  { label: "Case", href: "/case-thuc-te", icon: Briefcase },
  { label: "AI", href: "/cong-cu-ai", icon: Sparkles }
];

export function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on desktop
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/10 bg-black/95 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors ${
                isActive ? "text-gold" : "text-white/60 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-medium ${isActive ? "font-bold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area for iOS */}
      <div className="h-safe-area-inset-bottom bg-black" />
    </nav>
  );
}
