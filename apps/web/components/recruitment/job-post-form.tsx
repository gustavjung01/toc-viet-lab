"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { recruitmentRoles } from "@/lib/recruitment";
import { employerTypeLabels, workTypeLabels, type EmployerType, type WorkType } from "@/lib/recruitment-jobs";

const EMPTY_FORM = {
  title: "",
  position: "",
  employerDisplayName: "",
  employerType: "individual" as EmployerType,
  city: "",
  district: "",
  salaryText: "",
  workType: "full_time" as WorkType,
  experienceLevel: "",
  benefits: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  description: "",
};

export function JobPostForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function update<K extends keyof typeof EMPTY_FORM>(key: K, value: (typeof EMPTY_FORM)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,
      position: form.position || form.title,
      contactName: form.contactName || form.employerDisplayName,
    };

    const res = await fetch("/api/recruitment/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "Không thể lưu tin tuyển dụng.");
      return;
    }

    setSuccess("Đã đăng tin tuyển dụng. Đang chuyển về trang quản lý...");
    setTimeout(() => {
      window.location.href = "/tuyen-dung-cua-toi";
    }, 650);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      {error && (
        <div className="flex items-start gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-600">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-start gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-700">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> {success}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-charcoal">
          Vị trí tuyển *
          <input
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="VD: Thợ chính chuyên màu"
            className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-charcoal">
          Nhóm vị trí
          <select
            value={form.position}
            onChange={(e) => update("position", e.target.value)}
            className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
          >
            <option value="">Tự lấy theo vị trí tuyển</option>
            {recruitmentRoles.map((roleName) => <option key={roleName}>{roleName}</option>)}
          </select>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-charcoal">
          Tên người / đơn vị tuyển *
          <input
            required
            value={form.employerDisplayName}
            onChange={(e) => update("employerDisplayName", e.target.value)}
            placeholder="VD: Anh Minh, Salon Mộc, Học viện..."
            className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-charcoal">
          Loại người tuyển
          <select
            value={form.employerType}
            onChange={(e) => update("employerType", e.target.value as EmployerType)}
            className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
          >
            {(Object.keys(employerTypeLabels) as EmployerType[]).map((type) => (
              <option key={type} value={type}>{employerTypeLabels[type]}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-charcoal">
          Tỉnh/thành *
          <input
            required
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="VD: TP.HCM, Hà Nội, Đà Nẵng"
            className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-charcoal">
          Quận/huyện
          <input
            value={form.district}
            onChange={(e) => update("district", e.target.value)}
            placeholder="VD: Quận 3, Cầu Giấy"
            className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-charcoal">
          Lương / thu nhập
          <input
            value={form.salaryText}
            onChange={(e) => update("salaryText", e.target.value)}
            placeholder="VD: 15 - 25 triệu + hoa hồng"
            className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-charcoal">
          Hình thức
          <select
            value={form.workType}
            onChange={(e) => update("workType", e.target.value as WorkType)}
            className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
          >
            {(Object.keys(workTypeLabels) as WorkType[]).map((type) => (
              <option key={type} value={type}>{workTypeLabels[type]}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-charcoal">
          Liên hệ *
          <input
            required
            value={form.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            placeholder="VD: Anh Minh"
            className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-charcoal">
          Số điện thoại
          <input
            value={form.contactPhone}
            onChange={(e) => update("contactPhone", e.target.value)}
            placeholder="VD: 09xx xxx xxx"
            className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-bold text-charcoal">
        Mô tả công việc *
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Nêu yêu cầu tay nghề, ca làm, quyền lợi, thông tin liên hệ..."
          className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]"
        />
      </label>

      <div className="rounded-3xl bg-cream p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#D6A84F]" />
          <div>
            <h3 className="font-black text-charcoal">Rule khi submit</h3>
            <p className="mt-1 text-sm leading-6 text-warmgray">
              API chỉ kiểm đăng nhập và quota đăng tin. Không yêu cầu tài khoản phải có salon.
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-4 text-sm font-extrabold text-champagne shadow-soft transition hover:brightness-110 disabled:opacity-60"
      >
        {saving && <Loader2 size={16} className="animate-spin" />}
        Đăng tin tuyển dụng
      </button>
    </form>
  );
}
