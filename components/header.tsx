"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, X, LogOut, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { navItems } from "@/lib/data";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

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
          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded-full bg-white/10" />
          ) : session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-sm font-bold text-gold transition hover:bg-gold/10"
              >
                <LayoutDashboard size={16} />
                {session.user.name?.split(" ").pop() ?? "Dashboard"}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white/70 transition hover:border-red-400/50 hover:text-red-400"
              >
                <LogOut size={16} />
                Đăng xuất
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-full border border-white/15 p-3 text-white lg:hidden"
          aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav className="absolute left-0 right-0 top-20 z-40 border-b border-gold/10 bg-black/95 px-4 py-4 sm:px-6 lg:hidden">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-4 py-3 transition ${
                      isActive
                        ? "bg-gold/15 font-semibold text-gold"
                        : "text-white/80 hover:bg-white/5 hover:text-gold"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

