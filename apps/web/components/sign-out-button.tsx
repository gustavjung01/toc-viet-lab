"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-black text-black transition hover:border-red-300 hover:text-red-500"
      title="Đăng xuất"
    >
      <LogOut size={18} />
      <span className="hidden sm:inline">Thoát</span>
    </button>
  );
}
