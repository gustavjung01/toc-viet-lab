"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

type Props = {
  itemType: "article" | "case" | "formula";
  itemId: string;
};

export function BookmarkButton({ itemType, itemId }: Props) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    if (!saved) {
      const res = await fetch("/api/saved-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType, itemId }),
      });
      if (res.ok) setSaved(true);
    } else {
      setSaved(false);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`transition ${saved ? "text-[#D6A84F]" : "text-champagne hover:text-[#D6A84F]"}`}
      title={saved ? "Bỏ lưu" : "Lưu vào sổ tay"}
    >
      <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
