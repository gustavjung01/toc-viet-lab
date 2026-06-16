"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AlertCircle, FlaskConical, Loader2, Plus, Trash2, X } from "lucide-react";

type Formula = {
  id: string;
  title: string;
  tag: string;
  base: string;
  developer: string;
  ratio: string;
  note: string;
};

const EMPTY_FORM = { title: "", tag: "", base: "", developer: "", ratio: "", note: "" };

const inputClass = "mt-1 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-mutedLight/70 focus:border-[#D6A84F]";

export default function MyFormulaPage() {
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Formula | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = formulas.filter(
    (f) =>
      query.trim() === "" ||
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.tag.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    fetch("/api/user-formulas")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setFormulas(d.formulas ?? []);
      })
      .catch(() => setError("Không thể tải dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    const res = await fetch("/api/user-formulas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (data.error) {
      setSaveError(data.error);
    } else {
      setFormulas((prev) => [data, ...prev]);
      setShowForm(false);
      setForm(EMPTY_FORM);
      setSelected(data);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    const res = await fetch(`/api/user-formulas/${id}`, { method: "DELETE" });
    const data = await res.json();
    setDeleting(null);
    if (data.success) {
      setFormulas((prev) => prev.filter((f) => f.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  }

  return (
    <AppShell>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-black text-charcoal">Công thức màu của tôi</h1>
          <p className="mt-3 text-mutedLight">Lưu trữ, tìm kiếm và quản lý công thức hiệu quả.</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setSaveError(""); setForm(EMPTY_FORM); }}
          className="flex items-center gap-2 rounded-full bg-[#D6A84F] px-6 py-3 font-extrabold text-black transition hover:bg-[#F0C76A]"
        >
          <Plus size={18} /> Tạo công thức mới
        </button>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-5 shadow-soft">
        <input
          className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-mutedLight/70 focus:border-[#D6A84F]"
          placeholder="Tìm kiếm theo tên, loại dịch vụ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-7 text-charcoal shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-charcoal">Tạo công thức mới</h2>
              <button onClick={() => setShowForm(false)} className="rounded-full p-2 text-charcoal hover:bg-black/5" aria-label="Đóng form tạo công thức">
                <X size={20} />
              </button>
            </div>
            {saveError && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle size={16} /> {saveError}
              </div>
            )}
            <form onSubmit={handleCreate} className="mt-5 space-y-4">
              {([
                { key: "title" as const, label: "Tên công thức *", placeholder: "VD: Beige sữa lạnh", required: true },
                { key: "tag" as const, label: "Loại dịch vụ", placeholder: "VD: Balayage, Nhuộm toàn bộ", required: false },
                { key: "base" as const, label: "Nền tóc", placeholder: "VD: Level 7 - nền vàng", required: false },
                { key: "developer" as const, label: "Oxy / Developer", placeholder: "VD: 6% / 20 vol", required: false },
                { key: "ratio" as const, label: "Tỉ lệ pha", placeholder: "VD: 1 : 1.5", required: false },
              ]).map(({ key, label, placeholder, required }) => (
                <div key={key}>
                  <label className="text-xs font-extrabold text-charcoal">{label}</label>
                  <input
                    className={inputClass}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    required={required}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-extrabold text-charcoal">Ghi chú kỹ thuật</label>
                <textarea
                  className={inputClass}
                  placeholder="Lưu ý khi pha, thời gian để màu..."
                  rows={3}
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D6A84F] py-3 font-extrabold text-black transition hover:bg-[#F0C76A] disabled:opacity-60"
              >
                {saving && <Loader2 size={16} className="animate-spin" />}
                Lưu công thức
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-goldText" />
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 rounded-3xl bg-red-50 p-6 text-red-600">
              <AlertCircle size={20} /> {error}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 bg-white/40 py-20 text-center">
              <FlaskConical size={40} className="text-goldText opacity-60" />
              <p className="mt-4 text-lg font-extrabold text-charcoal">
                {query ? "Không tìm thấy công thức" : "Chưa có công thức nào"}
              </p>
              <p className="mt-2 text-sm text-mutedLight">
                {query ? "Thử từ khoá khác" : "Bấm \"Tạo công thức mới\" để bắt đầu"}
              </p>
            </div>
          ) : (
            filtered.map((formula) => (
              <div
                key={formula.id}
                onClick={() => setSelected(formula)}
                className={`grid cursor-pointer gap-4 rounded-3xl bg-white p-4 shadow-soft transition hover:shadow-md md:grid-cols-[1fr_auto] md:items-center ${selected?.id === formula.id ? "ring-2 ring-[#D6A84F]" : ""}`}
              >
                <div>
                  {formula.tag && (
                    <span className="rounded-full bg-[#D6A84F]/15 px-3 py-1 text-xs font-bold text-goldText">
                      {formula.tag}
                    </span>
                  )}
                  <h2 className="mt-2 text-lg font-black text-charcoal">{formula.title}</h2>
                  <p className="mt-1 text-sm text-mutedLight">
                    {[formula.base, formula.developer, formula.ratio].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(formula.id); }}
                  disabled={deleting === formula.id}
                  className="flex items-center gap-1 rounded-full border border-red-100 px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50 disabled:opacity-40"
                >
                  {deleting === formula.id
                    ? <Loader2 size={14} className="animate-spin" />
                    : <Trash2 size={14} />}
                  Xoá
                </button>
              </div>
            ))
          )}
        </div>

        <aside className="h-fit rounded-3xl bg-charcoal p-6 text-white shadow-soft">
          {selected ? (
            <>
              {selected.tag && (
                <span className="rounded-full bg-[#D6A84F]/20 px-3 py-1 text-xs font-bold text-champagne">
                  {selected.tag}
                </span>
              )}
              <h2 className="mt-4 text-2xl font-black text-champagne">{selected.title}</h2>
              {selected.note && (
                <p className="mt-3 text-sm leading-7 text-white/75">{selected.note}</p>
              )}
              <div className="mt-6 space-y-3 text-sm">
                {selected.base && (
                  <div className="rounded-2xl bg-white/5 p-4">
                    <span className="text-white/60">Nền: </span>{selected.base}
                  </div>
                )}
                {selected.developer && (
                  <div className="rounded-2xl bg-white/5 p-4">
                    <span className="text-white/60">Oxy: </span>{selected.developer}
                  </div>
                )}
                {selected.ratio && (
                  <div className="rounded-2xl bg-white/5 p-4">
                    <span className="text-white/60">Tỉ lệ: </span>{selected.ratio}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-10 text-center">
              <FlaskConical size={36} className="text-white/25" />
              <p className="mt-4 text-sm text-white/60">Chọn một công thức để xem chi tiết</p>
            </div>
          )}
        </aside>
      </div>
    </AppShell>
  );
}
