import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, FlaskConical } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HairVisual } from "@/components/visual";
import { BookmarkButton } from "@/components/bookmark-button";
import { toAssetUrl } from "@/lib/asset-url";
import { absoluteSiteUrl } from "@/lib/site-url";
import { getFallbackFormulaBySlug, type PublicFormula } from "@/lib/formulas";

const DIFFICULTY_LABEL: Record<string, string> = {
  basic: "Cơ bản",
  intermediate: "Trung cấp",
  advanced: "Nâng cao",
};

async function fetchFormula(slug: string): Promise<PublicFormula | null> {
  try {
    const res = await fetch(absoluteSiteUrl(`/api/formulas/${slug}`), { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Formula detail API unavailable");
    const data = await res.json();
    return data.formula ?? getFallbackFormulaBySlug(slug);
  } catch {
    return getFallbackFormulaBySlug(slug);
  }
}

function renderMarkdown(md: string) {
  const elements: ReactNode[] = [];
  const lines = md.split("\n");

  lines.forEach((line, index) => {
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="mt-10 mb-4 text-2xl font-black text-charcoal">
          {line.slice(3)}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="mt-7 mb-3 text-xl font-black text-charcoal">
          {line.slice(4)}
        </h3>
      );
      return;
    }

    if (line.startsWith("- **")) {
      const text = line.slice(2);
      const boldEnd = text.indexOf("**", 2);
      if (boldEnd > 2) {
        elements.push(
          <li key={index} className="ml-5 mt-2 list-disc leading-8 text-warmgray">
            <b className="text-charcoal">{text.slice(2, boldEnd)}</b>
            {text.slice(boldEnd + 2)}
          </li>
        );
      }
      return;
    }

    if (line.startsWith("- ")) {
      elements.push(
        <li key={index} className="ml-5 mt-2 list-disc leading-8 text-warmgray">
          {line.slice(2)}
        </li>
      );
      return;
    }

    if (!line.trim()) return;

    elements.push(
      <p key={index} className="mt-3 leading-8 text-warmgray">
        {line}
      </p>
    );
  });

  return elements;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const formula = await fetchFormula(slug);
  if (!formula) return { title: "Công thức màu không tồn tại" };

  const imageUrl = toAssetUrl(formula.imageKey);

  return {
    title: `${formula.title} | Công thức màu Tóc Việt Lab`,
    description: formula.excerpt,
    alternates: { canonical: absoluteSiteUrl(`/cong-thuc-mau/${formula.slug}`) },
    openGraph: {
      title: formula.title,
      description: formula.excerpt,
      url: absoluteSiteUrl(`/cong-thuc-mau/${formula.slug}`),
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
  };
}

export default async function FormulaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formula = await fetchFormula(slug);
  if (!formula) notFound();

  const imageUrl = toAssetUrl(formula.imageKey);
  const level = DIFFICULTY_LABEL[formula.difficulty] ?? "Trung cấp";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: formula.title,
    description: formula.excerpt,
    ...(imageUrl ? { image: imageUrl } : {}),
    author: { "@type": "Organization", name: "Tóc Việt Lab" },
  };

  return (
    <div>
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/cong-thuc-mau"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-warmgray hover:text-charcoal"
          >
            <ArrowLeft size={16} /> Quay lại Công thức màu
          </Link>

          <span className="rounded-full bg-champagne/20 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-charcoal">
            {formula.tag}
          </span>

          <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-charcoal md:text-5xl">
            {formula.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-warmgray">{formula.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warmgray">
            <span className="rounded-full bg-champagne/15 px-3 py-1 text-xs font-bold text-charcoal">
              {level}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} /> {formula.readTime} phút đọc
            </span>
            <BookmarkButton itemType="formula" itemId={formula.slug} />
          </div>

          {imageUrl && (
            <HairVisual
              className="mt-8 rounded-3xl"
              src={imageUrl}
              alt={formula.title}
              aspect="aspect-[4/3] sm:aspect-video"
            />
          )}

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-5 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-bold text-warmgray"><FlaskConical size={16} /> Nền tóc</div>
              <p className="mt-2 font-black text-charcoal">{formula.base}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-bold text-warmgray"><FlaskConical size={16} /> Oxy</div>
              <p className="mt-2 font-black text-charcoal">{formula.developer}</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-soft">
              <div className="flex items-center gap-2 text-sm font-bold text-warmgray"><FlaskConical size={16} /> Tỷ lệ</div>
              <p className="mt-2 font-black text-charcoal">{formula.ratio}</p>
            </div>
          </section>

          <div className="mt-10 rounded-3xl bg-white p-6 shadow-soft md:p-8">
            {formula.content ? renderMarkdown(formula.content) : (
              <p className="text-warmgray">Nội dung công thức đang được cập nhật...</p>
            )}
          </div>

          <div className="mt-8 rounded-3xl bg-charcoal p-6 text-white shadow-soft">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-champagne">Sổ tay cá nhân</p>
                <h2 className="mt-2 text-2xl font-black">Muốn lưu công thức này?</h2>
                <p className="mt-2 text-sm leading-7 text-white/60">Đăng nhập để lưu, chỉnh lại theo hãng màu bạn dùng và ghi chú kết quả sau khi làm khách.</p>
              </div>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-extrabold text-black">
                <BookOpen size={16} /> Đăng nhập để lưu
              </Link>
            </div>
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
