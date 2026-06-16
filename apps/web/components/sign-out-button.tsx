"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full border border-black/10 p-3 text-black transition hover:border-red-300 hover:text-red-500"
      title="Đăng xuất"
    >
      <LogOut size={18} />
    </button>
  );
}
