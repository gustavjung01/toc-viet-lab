"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionHeader } from "@/components/cards";
import { articles, cases, formulas } from "@/lib/data";
import { AlertCircle, BookOpen, FlaskConical, Loader2, NotebookPen, Star, X } from "lucide-react";

type SavedItem = {
  id: string;
  item_type: "article" | "case" | "formula";
  item_id: string;
  created_at: number;
};

type SavedPreview = {
  label: string;
  title: string;
  eyebrow: string;
  meta: string;
  body: string;
  bullets: string[];
};

const TABS = [
  { key: "all", label: "Đã lưu", icon: BookOpen },
  { key: "article", label: "Bài viết", icon: NotebookPen },
  { key: "case", label: "Case", icon: Star },
  { key: "formula", label: "Công thức", icon: FlaskConical },
];

function asText(value: unknown, fallback = "") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function getSavedPreview(item: SavedItem): SavedPreview {
  if (item.item_type === "article") {
    const article = articles.find((entry) => entry.slug === item.item_id) as any;
    return {
      label: "Bài viết",
      title: article?.title ?? item.item_id,
      eyebrow: article?.category ?? "Kiến thức tóc",
      meta: article ? `${article.level} • ${article.minutes} phút` : "Bài viết đã lưu",
      body: article?.excerpt ?? "Nội dung này đã được lưu trong sổ tay của bạn.",
      bullets: [article?.category, article?.level, article ? `${article.minutes} phút đọc` : ""].filter(Boolean),
    };
  }

  if (item.item_type === "case") {
    const savedCase = cases.find((entry: any) => entry.id === item.item_id || entry.title === item.item_id) as any;
    return {
      label: "Case",
      title: savedCase?.title ?? item.item_id,
      eyebrow: savedCase?.tag ?? "Case thực tế",
      meta: savedCase ? `${savedCase.salon} • ${savedCase.time}` : "Case đã lưu",
      body: savedCase
        ? `Tình trạng: ${savedCase.condition}. Mục tiêu: ${savedCase.goal}.`
        : "Case này đã được lưu trong sổ tay của bạn.",
      bullets: [savedCase?.condition, savedCase?.goal, savedCase?.salon].filter(Boolean),
    };
  }

  const formula = formulas.find((entry: any) => entry.slug === item.item_id || entry.title === item.item_id) as any;
  const formulaLines = [
    formula?.target && `Mục tiêu: ${formula.target}`,
    formula?.base && `Nền tóc: ${formula.base}`,
    formula?.formula && `Công thức: ${formula.formula}`,
    formula?.note && `Ghi chú: ${formula.note}`,
  ].filter(Boolean);

  return {
    label: "Công thức",
    title: formula?.title ?? item.item_id,
    eyebrow: formula?.category ?? "Công thức màu",
    meta: asText(formula?.level, "Công thức đã lưu"),
    body: asText(formula?.description || formula?.desc, "Công thức này đã được lưu trong sổ tay của bạn."),
    bullets: formulaLines.length ? formulaLines : ["Mở lại để tham khảo khi pha màu hoặc tư vấn khách."],
  };
}

export function NotebookClient() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItem, setSelectedItem] = useState<SavedItem | null>(null);

  useEffect(() => {
    fetch("/api/saved-items")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setItems(d.items ?? []);
      })
      .catch(() => setError("Không thể tải dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (activeTab === "all" ? items : items.filter((i) => i.item_type === activeTab)),
    [activeTab, items]
  );

  const selectedPreview = selectedItem ? getSavedPreview(selectedItem) : null;

  const countByType = (type: string) =>
    type === "all" ? items.length : items.filter((i) => i.item_type === type).length;

  return (
    <>
      <SectionHeader
        title="Sổ tay của tôi"
        desc="Lưu giữ nội dung, ghi chú kỹ thuật và tham khảo khi cần. Bấm vào mục đã lưu để đọc ngay tại trang này."
      />

      <div className="mb-6 flex flex-wrap gap-3">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold transition ${
              activeTab === key
                ? "bg-charcoal text-champagne"
                : "bg-white text-charcoal hover:bg-black/5"
            }`}
          >
            <Icon size={15} />
            {label}
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                activeTab === key ? "bg-white/20 text-white" : "bg-black/5 text-mutedLight"
              }`}
            >
              {countByType(key)}
            </span>
          </button>
        ))}
      </div>

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
          <BookOpen size={40} className="text-goldText opacity-60" />
          <p className="mt-4 text-lg font-extrabold text-charcoal">
            {activeTab === "all" ? "Chưa lưu nội dung nào" : "Không có mục nào trong tab này"}
          </p>
          <p className="mt-2 text-sm text-mutedLight">
            Bấm bookmark trên bài viết hoặc case để lưu vào đây
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => {
            const preview = getSavedPreview(item);
            return (
              <div
                key={item.id}
                className="rounded-3xl bg-white p-5 shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="flex w-full items-center gap-4 text-left"
                >
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
                      item.item_type === "article"
                        ? "bg-blue-50 text-blue-600"
                        : item.item_type === "case"
                        ? "bg-[#D6A84F]/10 text-goldText"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {item.item_type === "article" ? (
                      <NotebookPen size={20} />
                    ) : item.item_type === "case" ? (
                      <Star size={20} />
                    ) : (
                      <FlaskConical size={20} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase text-mutedLight">{preview.label}</p>
                    <p className="mt-1 line-clamp-2 text-sm font-extrabold text-charcoal">{preview.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs font-semibold text-mutedLight">{preview.meta}</p>
                  </div>
                </button>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="rounded-full bg-charcoal px-4 py-2 text-xs font-extrabold text-champagne"
                  >
                    Đọc tại đây
                  </button>
                  <button
                    onClick={async () => {
                      await fetch(`/api/saved-items/${item.id}`, { method: "DELETE" });
                      setItems((prev) => prev.filter((i) => i.id !== item.id));
                      if (selectedItem?.id === item.id) setSelectedItem(null);
                    }}
                    className="rounded-full p-2 text-mutedLight transition hover:bg-red-50 hover:text-red-500"
                    title="Bỏ lưu"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 text-charcoal shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-goldText">{selectedPreview.eyebrow}</p>
                <h2 className="mt-2 text-2xl font-black leading-tight text-charcoal md:text-3xl">{selectedPreview.title}</h2>
                <p className="mt-2 text-sm font-semibold text-mutedLight">{selectedPreview.meta}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-full bg-black/5 p-2 text-charcoal transition hover:bg-black/10"
                title="Đóng"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-6 text-sm font-semibold leading-7 text-mutedLight">{selectedPreview.body}</p>

            <div className="mt-6 space-y-3 rounded-3xl bg-cream p-5">
              {selectedPreview.bullets.map((line) => (
                <p key={line} className="text-sm font-bold leading-6 text-charcoal">• {line}</p>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="mt-6 rounded-full bg-charcoal px-6 py-3 text-sm font-extrabold text-champagne"
            >
              Đóng lại
            </button>
          </div>
        </div>
      )}
    </>
  );
}
