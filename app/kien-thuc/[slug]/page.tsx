import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HairVisual } from "@/components/visual";
import { toAssetUrl } from "@/lib/asset-url";
import { BookmarkButton } from "@/components/bookmark-button";
import type { Metadata } from "next";

const DIFF_LABEL: Record<string, string> = {
  basic: "Cơ bản",
  intermediate: "Trung cấp",
  advanced: "Nâng cao",
  "high-risk": "Rủi ro cao",
};

async function fetchArticle(slug: string) {
  const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
  const DB_ID = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const TOKEN = process.env.CLOUDFLARE_D1_TOKEN;
  if (!ACCOUNT_ID || !DB_ID || !TOKEN) return null;

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DB_ID}/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ sql: "SELECT * FROM articles WHERE slug = ? AND published = 1 LIMIT 1", params: [slug] }),
        next: { revalidate: 300 },
      }
    );
    const data = await res.json();
    if (!data.success) return null;
    const rows = data.result?.[0]?.results;
    return rows?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) return { title: "Bài viết không tồn tại" };

  const imageUrl = toAssetUrl(article.image_key);
  return {
    title: `${article.title} | Tóc Việt Lab`,
    description: article.excerpt ?? "",
    openGraph: {
      title: article.title,
      description: article.excerpt ?? "",
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
  };
}

function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-10 mb-4 text-2xl font-black text-charcoal">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("- **")) {
      const text = line.slice(2);
      const boldEnd = text.indexOf("**", 2);
      if (boldEnd > 2) {
        elements.push(
          <li key={i} className="ml-5 mt-2 list-disc leading-8 text-warmgray">
            <b className="text-charcoal">{text.slice(2, boldEnd)}</b>
            {text.slice(boldEnd + 2)}
          </li>
        );
      } else {
        elements.push(
          <li key={i} className="ml-5 mt-2 list-disc leading-8 text-warmgray">
            {text}
          </li>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-5 mt-2 list-disc leading-8 text-warmgray">
          {line.slice(2)}
        </li>
      );
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      elements.push(
        <p key={i} className="mt-3 leading-8 text-warmgray">
          {line}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) notFound();

  const imageUrl = toAssetUrl(article.image_key);
  const level = DIFF_LABEL[article.difficulty] ?? article.difficulty ?? "Cơ bản";
  const readTime = article.read_time ?? 5;
  const tags: string[] = (() => {
    try { return JSON.parse(article.tags || "[]"); } catch { return []; }
  })();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt ?? "",
    ...(imageUrl ? { image: imageUrl } : {}),
    author: { "@type": "Organization", name: "Tóc Việt Lab" },
  };

  return (
    <div>
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/kien-thuc"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-warmgray hover:text-charcoal"
          >
            <ArrowLeft size={16} /> Quay lại Kiến thức
          </Link>

          <span className="rounded-full bg-champagne/20 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-charcoal">
            {article.category}
          </span>

          <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-charcoal md:text-5xl">
            {article.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-warmgray">{article.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-warmgray">
            <span className="rounded-full bg-champagne/15 px-3 py-1 text-xs font-bold text-charcoal">
              {level}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} /> {readTime} phút đọc
            </span>
            <BookmarkButton itemType="article" itemId={slug} />
          </div>

          {imageUrl && (
            <HairVisual
              className="mt-8 h-[320px] md:h-[420px]"
              src={imageUrl}
              alt={article.title}
            />
          )}

          <div className="mt-10 rounded-3xl bg-white p-6 shadow-soft md:p-8">
            {article.content ? renderMarkdown(article.content) : (
              <p className="text-warmgray">Nội dung đang được cập nhật...</p>
            )}
          </div>

          {tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-warmgray"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/kien-thuc"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-extrabold text-black"
            >
              <ArrowLeft size={16} /> Xem tất cả bài viết
            </Link>
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
