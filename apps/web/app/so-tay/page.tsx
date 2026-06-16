"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { SectionHeader } from "@/components/cards";
import { AlertCircle, BookOpen, FlaskConical, Loader2, NotebookPen, Star } from "lucide-react";

type SavedItem = {
  id: string;
  item_type: "article" | "case" | "formula";
  item_id: string;
  created_at: number;
};

const TABS = [
  { key: "all", label: "Đã lưu", icon: BookOpen },
  { key: "article", label: "Bài viết", icon: NotebookPen },
  { key: "case", label: "Case", icon: Star },
  { key: "formula", label: "Công thức", icon: FlaskConical },
];

export default function NotebookPage() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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

  const filtered =
    activeTab === "all" ? items : items.filter((i) => i.item_type === activeTab);

  const countByType = (type: string) =>
    type === "all" ? items.length : items.filter((i) => i.item_type === type).length;

  return (
    <AppShell>
      <SectionHeader
        title="Sổ tay của tôi"
        desc="Lưu giữ nội dung, ghi chú kỹ thuật và tham khảo khi cần."
      />

      {/* Tabs */}
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
                activeTab === key ? "bg-white/20 text-white" : "bg-black/5 text-warmgray"
              }`}
            >
              {countByType(key)}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#D6A84F]" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 rounded-3xl bg-red-50 p-6 text-red-600">
          <AlertCircle size={20} /> {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 py-20 text-center">
          <BookOpen size={40} className="text-[#D6A84F] opacity-40" />
          <p className="mt-4 text-lg font-extrabold text-charcoal">
            {activeTab === "all" ? "Chưa lưu nội dung nào" : "Không có mục nào trong tab này"}
          </p>
          <p className="mt-2 text-sm text-warmgray">
            Bấm bookmark trên bài viết hoặc case để lưu vào đây
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-soft"
            >
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
                  item.item_type === "article"
                    ? "bg-blue-50 text-blue-500"
                    : item.item_type === "case"
                    ? "bg-[#D6A84F]/10 text-[#D6A84F]"
                    : "bg-green-50 text-green-500"
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
                <p className="text-xs font-bold uppercase text-warmgray">
                  {item.item_type === "article"
                    ? "Bài viết"
                    : item.item_type === "case"
                    ? "Case"
                    : "Công thức"}
                </p>
                <p className="mt-1 truncate text-sm font-extrabold text-charcoal">
                  {item.item_id}
                </p>
              </div>
              <button
                onClick={async () => {
                  await fetch(`/api/saved-items/${item.id}`, { method: "DELETE" });
                  setItems((prev) => prev.filter((i) => i.id !== item.id));
                }}
                className="rounded-full p-2 text-warmgray transition hover:bg-red-50 hover:text-red-400"
                title="Bỏ lưu"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
