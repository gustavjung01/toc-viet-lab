import Link from "next/link";

export function AdminGuardMessage({ status, reason }: { status: number; reason: string }) {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Admin</p>
        <h1 className="mt-3 text-3xl font-black">{status === 401 ? "Cần đăng nhập" : "Không mở được admin"}</h1>
        <p className="mt-4 text-sm font-semibold leading-7 text-white/70">{reason}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/login" className="rounded-full bg-[#D6A84F] px-5 py-3 text-sm font-black text-black">Đăng nhập</Link>
          <Link href="/dashboard" className="rounded-full border border-white/10 px-5 py-3 text-sm font-black text-white">Về tài khoản</Link>
        </div>
      </div>
    </div>
  );
}
