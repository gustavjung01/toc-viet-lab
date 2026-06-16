"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, User } from "lucide-react";

type Profile = {
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

export function AccountSettingsPanel() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.error) {
          setLoadError(data.error || "Không thể tải hồ sơ tài khoản.");
          return;
        }
        if (!data.user) {
          setLoadError("Chưa có hồ sơ tài khoản để hiển thị.");
          return;
        }
        setProfile(data.user);
        setName(data.user.name ?? "");
      })
      .catch(() => setLoadError("Không thể kết nối API hồ sơ tài khoản."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    setSuccess(false);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok || data.error) {
      setSaveError(data.error || "Không thể lưu thay đổi.");
      return;
    }
    setSuccess(true);
    setProfile((current) => current ? { ...current, name } : current);
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <>
      <h1 className="text-4xl font-black text-charcoal">Cài đặt tài khoản</h1>
      <p className="mt-3 text-mutedLight">Quản lý thông tin cá nhân và gói sử dụng.</p>

      {loading ? (
        <div className="mt-10 flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-goldText" />
        </div>
      ) : loadError ? (
        <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900 shadow-soft">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <h2 className="font-black text-amber-950">Chưa tải được hồ sơ tài khoản</h2>
              <p className="mt-2 text-sm font-semibold leading-6">{loadError}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
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

            {saveError && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle size={16} /> {saveError}
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

          <aside className="rounded-3xl bg-charcoal p-6 text-white shadow-soft">
            <p className="text-xs font-extrabold uppercase tracking-widest text-champagne">Gói hiện tại</p>
            <p className="mt-3 text-2xl font-black text-white">{roleLabel[profile?.role ?? "free"]}</p>
            <div className="mt-4 flex justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm">
              <span className="text-white/70">Credit AI còn lại</span>
              <span className="font-bold text-champagne">{profile?.ai_credits ?? 0}</span>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
