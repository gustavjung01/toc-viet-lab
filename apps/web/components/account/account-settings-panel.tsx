"use client";

import { FormEvent, useEffect, useState } from "react";
import { AlertCircle, BriefcaseBusiness, CheckCircle2, Loader2, User } from "lucide-react";

type JobSeekerProfile = {
  isLookingForJob: boolean;
  desiredPosition: string;
  experienceLevel: string;
  yearsOfExperience: string;
  skills: string;
  preferredCities: string;
  preferredDistricts: string;
  expectedSalaryText: string;
  workType: string;
  portfolioUrl: string;
  shortIntroduction: string;
  contactPhone: string;
  contactEmail: string;
};

type Profile = {
  id: string;
  name: string;
  email: string;
  role: string;
  ai_credits: number;
  phone: string;
  city: string;
  district: string;
  bio: string;
  jobSeeker: JobSeekerProfile;
};

const roleLabel: Record<string, string> = {
  free: "Tài khoản miễn phí",
  member: "Thành viên",
  pro: "Pro Member",
};

const defaultJobSeeker: JobSeekerProfile = {
  isLookingForJob: false,
  desiredPosition: "",
  experienceLevel: "",
  yearsOfExperience: "",
  skills: "",
  preferredCities: "",
  preferredDistricts: "",
  expectedSalaryText: "",
  workType: "full_time",
  portfolioUrl: "",
  shortIntroduction: "",
  contactPhone: "",
  contactEmail: "",
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none placeholder:text-slate-500 focus:border-[#B9851E] focus:ring-2 focus:ring-[#D6A84F]/25";
const labelClass = "text-xs font-black uppercase tracking-wide text-slate-900";
const helpTextClass = "mt-1 text-xs font-semibold leading-5 text-slate-600";

function normalizeProfile(data: Partial<Profile> | null | undefined): Profile {
  return {
    id: data?.id ?? "",
    name: data?.name ?? "",
    email: data?.email ?? "",
    role: data?.role ?? "free",
    ai_credits: Number(data?.ai_credits ?? 0),
    phone: data?.phone ?? "",
    city: data?.city ?? "",
    district: data?.district ?? "",
    bio: data?.bio ?? "",
    jobSeeker: { ...defaultJobSeeker, ...(data?.jobSeeker ?? {}) },
  };
}

export function AccountSettingsPanel() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Profile>(normalizeProfile(null));
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
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
        const nextProfile = normalizeProfile(data.user);
        setProfile(nextProfile);
        setForm(nextProfile);
      })
      .catch(() => setLoadError("Không thể kết nối API hồ sơ tài khoản."))
      .finally(() => setLoading(false));
  }, []);

  function updateField<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateJobSeeker<K extends keyof JobSeekerProfile>(key: K, value: JobSeekerProfile[K]) {
    setForm((current) => ({
      ...current,
      jobSeeker: { ...current.jobSeeker, [key]: value },
    }));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    setSuccess(false);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        city: form.city,
        district: form.district,
        bio: form.bio,
        jobSeeker: form.jobSeeker,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok || data.error) {
      setSaveError(data.error || "Không thể lưu thay đổi.");
      return;
    }

    const savedProfile = normalizeProfile(data.user ?? form);
    setSuccess(true);
    setProfile(savedProfile);
    setForm(savedProfile);
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#8A6118]">Tài khoản</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Cài đặt tài khoản</h1>
        <p className="mt-3 max-w-3xl text-sm font-semibold leading-6 text-slate-700">
          Lưu thông tin cá nhân và hồ sơ tìm việc để khi ứng tuyển, salon có đủ dữ liệu xem nhanh mà không phải hỏi lại từ đầu.
        </p>
      </div>

      {loading ? (
        <div className="mt-10 flex items-center justify-center rounded-3xl bg-white py-20 shadow-soft">
          <Loader2 size={32} className="animate-spin text-[#B9851E]" />
        </div>
      ) : loadError ? (
        <div className="mt-8 rounded-3xl border border-amber-300 bg-amber-50 p-6 text-amber-950 shadow-soft">
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
          <form onSubmit={handleSave} className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-7 text-slate-950 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D6A84F]/20">
                  <User size={28} className="text-[#8A6118]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-950">Thông tin cá nhân</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{profile?.email || "Email từ tài khoản đăng nhập"}</p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Tên hiển thị</label>
                  <input
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Nhập tên của bạn"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input className={`${inputClass} bg-slate-100 text-slate-700`} value={form.email} disabled />
                  <p className={helpTextClass}>Email lấy từ tài khoản đăng nhập.</p>
                </div>
                <div>
                  <label className={labelClass}>Số điện thoại</label>
                  <input
                    className={inputClass}
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Số điện thoại liên hệ"
                  />
                </div>
                <div>
                  <label className={labelClass}>Khu vực hiện tại</label>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <input
                      className={inputClass.replace("mt-2 ", "")}
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Tỉnh / thành"
                    />
                    <input
                      className={inputClass.replace("mt-2 ", "")}
                      value={form.district}
                      onChange={(e) => updateField("district", e.target.value)}
                      placeholder="Quận / huyện"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Giới thiệu ngắn</label>
                  <textarea
                    className={`${inputClass} min-h-28 resize-y leading-6`}
                    value={form.bio}
                    onChange={(e) => updateField("bio", e.target.value)}
                    placeholder="Ví dụ: thợ màu 3 năm kinh nghiệm, mạnh về nền tóc Việt, phục hồi sau tẩy..."
                  />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-7 text-slate-950 shadow-soft">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <BriefcaseBusiness size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-950">Thông tin tìm việc</h2>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                      Lưu sẵn hồ sơ để sau này salon xem nhanh khi bạn ứng tuyển hoặc nhận việc.
                    </p>
                  </div>
                </div>
                <label className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-black text-slate-900">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-[#B9851E]"
                    checked={form.jobSeeker.isLookingForJob}
                    onChange={(e) => updateJobSeeker("isLookingForJob", e.target.checked)}
                  />
                  Đang tìm việc
                </label>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Vị trí mong muốn</label>
                  <input
                    className={inputClass}
                    value={form.jobSeeker.desiredPosition}
                    onChange={(e) => updateJobSeeker("desiredPosition", e.target.value)}
                    placeholder="Thợ chính, thợ phụ, học việc, quản lý salon..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Hình thức làm việc</label>
                  <select
                    className={inputClass}
                    value={form.jobSeeker.workType}
                    onChange={(e) => updateJobSeeker("workType", e.target.value)}
                  >
                    <option value="full_time">Toàn thời gian</option>
                    <option value="part_time">Bán thời gian</option>
                    <option value="freelance">Theo ca / freelance</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Trình độ / cấp độ</label>
                  <input
                    className={inputClass}
                    value={form.jobSeeker.experienceLevel}
                    onChange={(e) => updateJobSeeker("experienceLevel", e.target.value)}
                    placeholder="Mới vào nghề, thợ phụ, thợ chính, chuyên màu..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Số năm kinh nghiệm</label>
                  <input
                    className={inputClass}
                    value={form.jobSeeker.yearsOfExperience}
                    onChange={(e) => updateJobSeeker("yearsOfExperience", e.target.value)}
                    placeholder="Ví dụ: 2 năm"
                  />
                </div>
                <div>
                  <label className={labelClass}>Khu vực muốn làm</label>
                  <input
                    className={inputClass}
                    value={form.jobSeeker.preferredCities}
                    onChange={(e) => updateJobSeeker("preferredCities", e.target.value)}
                    placeholder="TP.HCM, Hà Nội, Đà Nẵng..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Quận / khu vực ưu tiên</label>
                  <input
                    className={inputClass}
                    value={form.jobSeeker.preferredDistricts}
                    onChange={(e) => updateJobSeeker("preferredDistricts", e.target.value)}
                    placeholder="Quận 1, Quận 3, Cầu Giấy..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Mức lương mong muốn</label>
                  <input
                    className={inputClass}
                    value={form.jobSeeker.expectedSalaryText}
                    onChange={(e) => updateJobSeeker("expectedSalaryText", e.target.value)}
                    placeholder="Ví dụ: 12 - 18 triệu + hoa hồng"
                  />
                </div>
                <div>
                  <label className={labelClass}>Portfolio / Facebook / TikTok</label>
                  <input
                    className={inputClass}
                    value={form.jobSeeker.portfolioUrl}
                    onChange={(e) => updateJobSeeker("portfolioUrl", e.target.value)}
                    placeholder="Link để salon xem tay nghề"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Kỹ năng nổi bật</label>
                  <textarea
                    className={`${inputClass} min-h-24 resize-y leading-6`}
                    value={form.jobSeeker.skills}
                    onChange={(e) => updateJobSeeker("skills", e.target.value)}
                    placeholder="Ví dụ: nhuộm màu, nâng nền, balayage, phục hồi, uốn setting, giao tiếp khách..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Lời giới thiệu cho salon</label>
                  <textarea
                    className={`${inputClass} min-h-32 resize-y leading-6`}
                    value={form.jobSeeker.shortIntroduction}
                    onChange={(e) => updateJobSeeker("shortIntroduction", e.target.value)}
                    placeholder="Viết vài dòng để salon hiểu kinh nghiệm, thái độ làm việc và mong muốn của bạn."
                  />
                </div>
                <div>
                  <label className={labelClass}>Điện thoại nhận việc</label>
                  <input
                    className={inputClass}
                    value={form.jobSeeker.contactPhone}
                    onChange={(e) => updateJobSeeker("contactPhone", e.target.value)}
                    placeholder="Có thể khác số tài khoản"
                  />
                </div>
                <div>
                  <label className={labelClass}>Email nhận việc</label>
                  <input
                    className={inputClass}
                    value={form.jobSeeker.contactEmail}
                    onChange={(e) => updateJobSeeker("contactEmail", e.target.value)}
                    placeholder="Email để salon liên hệ"
                  />
                </div>
              </div>
            </section>

            {saveError && (
              <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                <AlertCircle size={18} className="mt-0.5 shrink-0" /> {saveError}
              </div>
            )}
            {success && (
              <div className="flex items-start gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> Đã lưu hồ sơ tài khoản và thông tin tìm việc.
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-[#D6A84F] px-7 py-3.5 text-sm font-black text-black transition hover:bg-[#F0C76A] disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              Lưu toàn bộ thông tin
            </button>
          </form>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-slate-950 p-6 text-white shadow-soft">
              <p className="text-xs font-black uppercase tracking-widest text-[#F5D27D]">Gói hiện tại</p>
              <p className="mt-3 text-2xl font-black text-white">{roleLabel[profile?.role ?? "free"]}</p>
              <div className="mt-4 flex justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm">
                <span className="font-semibold text-white/80">Credit AI còn lại</span>
                <span className="font-black text-[#F5D27D]">{profile?.ai_credits ?? 0}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-950 shadow-soft">
              <p className="text-xs font-black uppercase tracking-widest text-[#8A6118]">Hồ sơ tìm việc</p>
              <p className="mt-3 text-lg font-black text-slate-950">
                {form.jobSeeker.isLookingForJob ? "Đang bật tìm việc" : "Chưa bật tìm việc"}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                Khi luồng ứng tuyển được nối vào production, thông tin này sẽ giúp salon xem nhanh hồ sơ của bạn.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
