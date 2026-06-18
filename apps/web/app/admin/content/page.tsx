import Link from "next/link";
import { AdminShell } from "@/components/admin/shell";
import { AdminGuardMessage } from "@/components/admin/guard-message";
import { AdminContentTabs } from "@/components/admin/content-tabs";
import { readAdminAccess } from "@/lib/admin-permission";

const contentTypes = [
  { title: "Kiến thức", href: "/admin/content/articles", description: "Bài kỹ thuật tóc và màu nhuộm." },
  { title: "Công thức màu", href: "/admin/content/formulas", description: "Công thức pha màu, oxy, tỷ lệ." },
  { title: "Case thực tế", href: "/admin/content/cases", description: "Before/after và hướng xử lý salon." },
];

export default async function AdminContentPage() {
  const access = await readAdminAccess();
  if (!access.ok) return <AdminGuardMessage status={access.status} reason={access.reason} />;

  return (
    <AdminShell>
      <AdminContentTabs />
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D6A84F]">Content hub</p>
        <h2 className="mt-3 text-3xl font-black text-white">Quản lý nội dung</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-white/65">Tách riêng kiến thức, công thức màu và case thực tế.</p>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {contentTypes.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 hover:border-[#D6A84F]/40 hover:bg-white/10">
            <h3 className="text-xl font-black text-white">{item.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-white/60">{item.description}</p>
            <span className="mt-5 inline-flex rounded-full bg-[#D6A84F]/15 px-4 py-2 text-xs font-black text-[#F0C76A]">Mở danh sách</span>
          </Link>
        ))}
      </section>
    </AdminShell>
  );
}
