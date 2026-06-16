"use client";

import { useEffect, useRef, useState } from "react";

export default function FilterSheetClient({
  categories = [],
  activeCategory,
  onApply,
}: {
  categories: string[];
  activeCategory: string;
  onApply: (category: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState(activeCategory);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      setCat(activeCategory);
    } else {
      isMounted.current = true;
    }
  }, [activeCategory]);

  return (
    <>
      <div className="sm:hidden mt-4">
        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-gold px-5 py-3 text-sm font-extrabold text-black"
        >
          Bộ lọc {activeCategory !== "Tất cả" ? `(${activeCategory})` : ""}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div
            className="mx-auto mt-12 max-w-md rounded-2xl bg-charcoal p-5 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-black">Chọn danh mục</h3>
            <div className="mt-4 grid gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    cat === c ? "bg-gold text-black" : "border border-white/15 text-white/75"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  onApply(cat);
                  setOpen(false);
                }}
                className="rounded-full bg-gold px-5 py-2 font-extrabold text-black"
              >
                Áp dụng
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 px-5 py-2 font-extrabold"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
