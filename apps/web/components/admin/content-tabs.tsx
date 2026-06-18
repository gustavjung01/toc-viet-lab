import Link from "next/link";

const tabs = [
  { label: "Tổng nội dung", href: "/admin/content" },
  { label: "Kiến thức", href: "/admin/content/articles" },
  { label: "Công thức màu", href: "/admin/content/formulas" },
  { label: "Case thực tế", href: "/admin/content/cases" },
];

export function AdminContentTabs() {
  return (
    <nav className="mb-5 flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className="inline-flex shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-white/75 hover:border-[#D6A84F]/40 hover:text-[#F0C76A]"
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
