"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { navItems } from "@/lib/data";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-semibold transition hover:text-gold ${
                  isActive ? "text-gold" : "text-white/80"
                }`}
              >
                {item.label}
                {isActive && (
                  <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-full border border-white/15 p-3 text-white/70 transition hover:border-gold hover:text-gold">
            <Search size={18} />
          </button>
          <Link
            href="/login"
            className="rounded-full border border-gold/45 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/5"
          >
            Đăng nhập
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-extrabold text-black shadow-gold transition hover:brightness-110"
          >
            Đăng ký miễn phí
          </Link>
        </div>
        <button className="rounded-full border border-white/15 p-3 text-white lg:hidden">
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
}
