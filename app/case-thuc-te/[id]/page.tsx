import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HairVisual } from "@/components/visual";
import { BookmarkButton } from "@/components/bookmark-button";
import { toAssetUrl } from "@/lib/asset-url";
import { getCaseEditorialStatus } from "@/lib/case-editorial";
import { absoluteSiteUrl } from "@/lib/site-url";

async function fetchCase(id: string) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const token = process.env.CLOUDFLARE_D1_TOKEN;
  if (!accountId || !databaseId || !token) return null;

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ sql: "SELECT * FROM cases WHERE id = ? AND published = 1 LIMIT 1", params: [id] }),
        next: { revalidate: 300 },
      }
    );
    const data = await res.json();
    if (!data.success) return null;
    return data.result?.[0]?.results?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchCase(id);
  if (!item) return { title: "Case không tồn tại" };

  const afterImage = toAssetUrl(item.after_image_key);
  return {
    title: `${item.title} | Case thực tế | Tóc Việt Lab`,
    description: item.description ?? "Case salon thực tế và hướng xử lý kỹ thuật từ Tóc Việt Lab.",
    alternates: { canonical: absoluteSiteUrl(`/case-thuc-te/${id}`) },
    openGraph: {
      title: item.title,
      description: item.description ?? "Case salon thực tế và hướng xử lý kỹ thuật từ Tóc Việt Lab.",
      type: "article",
      url: absoluteSiteUrl(`/case-thuc-te/${id}`),
      ...(afterImage ? { images: [{ url: afterImage }] } : {}),
    },
    twitter: {
      card: afterImage ? "summary_large_image" : "summary",
      title: item.title,
      description: item.description ?? "Case salon thực tế và hướng xử lý kỹ thuật từ Tóc Việt Lab.",
      ...(afterImage ? { images: [afterImage] } : {}),
    },
  };
}

function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mb-4 mt-10 text-2xl font-black text-charcoal">
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ")) {
      elements.push(
        <p key={i} className="mt-3 whitespace-pre-wrap leading-8 text-warmgray">
          {line}
        </p>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-5 mt-2 list-disc leading-8 text-warmgray">
          {line.slice(2)}
        </li>
      );
      continue;
    }

    if (!line.trim()) continue;

    elements.push(
      <p key={i} className="mt-3 whitespace-pre-wrap leading-8 text-warmgray">
        {line}
      </p>
    );
  }

  return elements;
}

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await fetchCase(id);
  if (!item) notFound();

  const beforeImage = toAssetUrl(item.before_image_key);
  const afterImage = toAssetUrl(item.after_image_key);
  const editorial = getCaseEditorialStatus(item);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: item.title,
    name: item.title,
    description: item.description ?? "Case salon thực tế và hướng xử lý kỹ thuật từ Tóc Việt Lab.",
    url: absoluteSiteUrl(`/case-thuc-te/${id}`),
    ...(afterImage ? { image: afterImage } : {}),
    author: { "@type": "Organization", name: "Tóc Việt Lab" },
    publisher: { "@type": "Organization", name: "Tóc Việt Lab" },
    about: item.category ?? "Case salon",
  };

  return (
    <div>
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/case-thuc-te"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-warmgray hover:text-charcoal"
          >
            <ArrowLeft size={16} /> Quay lại Case thực tế
          </Link>

          <div className="rounded-[2rem] bg-charcoal p-6 text-white shadow-soft md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-champagne px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-charcoal">
                {item.category ?? "Case salon"}
              </span>
              <span className={`rounded-full px-4 py-2 text-xs font-extrabold ${editorial.className}`}>
                {editorial.label}
              </span>
              <BookmarkButton itemType="case" itemId={item.id} />
            </div>

            <h1 className="mt-5 text-3xl font-black leading-tight md:text-5xl">{item.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">{item.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/65">
              {item.formula && <span className="rounded-full border border-white/10 px-3 py-1">Hướng xử lý có sẵn</span>}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
                <Clock size={14} /> Case thực tế salon
              </span>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              <HairVisual
                src={beforeImage}
                alt={`${item.title} before`}
                label="Before"
                aspect="aspect-[4/3] sm:aspect-video"
                className="rounded-3xl"
              />
              <HairVisual
                src={afterImage}
                alt={`${item.title} after`}
                label="After"
                aspect="aspect-[4/3] sm:aspect-video"
                className="rounded-3xl"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <section className="rounded-3xl bg-white p-6 shadow-soft md:p-8">
              <h2 className="text-2xl font-black text-charcoal">Phân tích case</h2>
              <div className="mt-4">{item.analysis ? renderMarkdown(item.analysis) : <p className="text-warmgray">Phân tích đang được cập nhật...</p>}</div>
            </section>

            <aside className="space-y-6">
              <section className="rounded-3xl bg-white p-6 shadow-soft">
                <h2 className="text-xl font-black text-charcoal">Hướng xử lý</h2>
                <p className="mt-4 whitespace-pre-wrap leading-8 text-warmgray">{item.formula || "Công thức chi tiết sẽ được cập nhật theo từng case."}</p>
              </section>
              <section className="rounded-3xl bg-white p-6 shadow-soft">
                <h2 className="text-xl font-black text-charcoal">SEO checklist</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-warmgray">
                  <p><b className="text-charcoal">Ảnh OG:</b> dùng ảnh After để ưu tiên kết quả đẹp nhất khi share.</p>
                  <p><b className="text-charcoal">Structured data:</b> đã gắn `CreativeWork` JSON-LD cho case detail.</p>
                  <p><b className="text-charcoal">Trạng thái biên tập:</b> dùng nhãn để theo dõi case đã đủ chiều sâu nội dung.</p>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
