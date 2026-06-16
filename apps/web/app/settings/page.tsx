"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AlertCircle, CheckCircle2, Loader2, User } from "lucide-react";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  ai_credits: number;
};

const roleLabel: Record<string, string> = {
  free: "Tài khoản miễn phí",
  member: "Thành viên",
  pro: "Pro Member",
};

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setProfile(d.user);
          setName(d.user.name ?? "");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setSaving(false);
    if (data.error) {
      setError(data.error);
    } else {
      setSuccess(true);
      setProfile((p) => p ? { ...p, name } : p);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <AppShell>
      <h1 className="text-4xl font-black text-charcoal">Cài đặt tài khoản</h1>
      <p className="mt-3 text-mutedLight">Quản lý thông tin cá nhân và gói sử dụng.</p>

      {loading ? (
        <div className="mt-10 flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-goldText" />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Profile form */}
          <form onSubmit={handleSave} className="rounded-3xl bg-white p-7 shadow-soft">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D6A84F]/15">
                <User size={28} className="text-goldText" />
              </div>
              <div>
                <p className="text-lg font-black text-charcoal">{profile?.name ?? "—"}</p>
                <p className="text-sm text-mutedLight">{profile?.email}</p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <label className="text-xs font-extrabold text-charcoal">Tên hiển thị</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-mutedLight/70 focus:border-[#D6A84F]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-extrabold text-charcoal">Email</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-mutedLight outline-none"
                  value={profile?.email ?? ""}
                  disabled
                />
                <p className="mt-1 text-xs text-mutedLight">Email không thể thay đổi</p>
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            {success && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                <CheckCircle2 size={16} /> Đã lưu thành công
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-6 flex items-center gap-2 rounded-full bg-[#D6A84F] px-6 py-3 font-extrabold text-black transition hover:bg-[#F0C76A] disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              Lưu thay đổi
            </button>
          </form>

          {/* Account info */}
          <div className="space-y-4">
            <div className="rounded-3xl bg-charcoal p-6 text-white shadow-soft">
              <p className="text-xs font-extrabold uppercase tracking-widest text-champagne">Gói hiện tại</p>
              <p className="mt-3 text-2xl font-black text-white">
                {roleLabel[profile?.role ?? "free"]}
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="text-white/70">Credit AI còn lại</span>
                  <span className="font-bold text-champagne">{profile?.ai_credits ?? 0}</span>
                </div>
              </div>
              {profile?.role === "free" && (
                <a
                  href="/goi-thanh-vien"
                  className="mt-5 flex items-center justify-center rounded-full bg-[#D6A84F] py-3 text-sm font-extrabold text-black transition hover:bg-[#F0C76A]"
                >
                  Nâng cấp Pro
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
