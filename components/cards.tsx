import Link from "next/link";
import { ArrowRight, Bookmark, Clock } from "lucide-react";
import { HairVisual } from "./visual";
import { BookmarkButton } from "./bookmark-button";

export function SectionHeader({ eyebrow, title, desc, href }: { eyebrow?: string; title: string; desc?: string; href?: string }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>{eyebrow && <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.25em] text-champagne">{eyebrow}</div>}<h2 className="text-2xl font-extrabold tracking-tight text-charcoal md:text-4xl">{title}</h2>{desc && <p className="mt-3 max-w-2xl text-sm leading-7 text-warmgray">{desc}</p>}</div>
      {href && <Link href={href} className="inline-flex items-center gap-2 text-sm font-extrabold text-charcoal">Xem tất cả <ArrowRight size={16} /></Link>}
    </div>
  );
}

export function CategoryCard({ title, count, icon: Icon }: { title: string; count: string; icon: any }) {
  return <div className="card-hover rounded-3xl border border-black/5 bg-white p-5 shadow-soft"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-champagne/15 text-champagne"><Icon size={24} /></div><h3 className="font-extrabold text-charcoal">{title}</h3><p className="mt-1 text-sm text-warmgray">{count}</p></div>;
}

export function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/kien-thuc/${article.slug}`} className="card-hover block overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft">
      {article.imageKey ? (
        <HairVisual imageKey={article.imageKey} alt={article.title} className="h-44 rounded-none" />
      ) : (
        <HairVisual className="h-44 rounded-none" gradient={article.visual} label={article.category} />
      )}
      <div className="p-5"><div className="mb-3 flex items-center justify-between gap-3"><span className="rounded-full bg-champagne/15 px-3 py-1 text-xs font-bold text-charcoal">{article.level}</span><span className="inline-flex items-center gap-1 text-xs font-semibold text-warmgray"><Clock size={14} /> {article.minutes} phút</span></div><h3 className="line-clamp-2 text-lg font-extrabold leading-snug text-charcoal">{article.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-warmgray">{article.excerpt}</p><div className="mt-5 flex items-center justify-between"><span className="text-sm font-extrabold text-charcoal">Đọc chi tiết</span><BookmarkButton itemType="article" itemId={article.slug} /></div></div>
    </Link>
  );
}

export function CaseCard({ item }: { item: any }) {
  return (
    <div className="card-hover overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft">
      <div className="grid grid-cols-2 gap-1 p-2">
        <HairVisual className="h-40 rounded-2xl" imageKey={item.imageKeyBefore} alt={`${item.title} before`} label="Before" />
        <HairVisual className="h-40 rounded-2xl" imageKey={item.imageKeyAfter} alt={`${item.title} after`} label="After" />
      </div>
      <div className="p-5">
        <span className="rounded-full bg-charcoal px-3 py-1 text-xs font-bold text-champagne">{item.tag}</span>
        <h3 className="mt-4 text-lg font-extrabold leading-snug text-charcoal">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-warmgray"><b>Tình trạng:</b> {item.condition}</p>
        <p className="mt-1 text-sm leading-6 text-warmgray"><b>Mục tiêu:</b> {item.goal}</p>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="font-bold text-charcoal">{item.salon}</span>
          <div className="flex items-center gap-3">
            <span className="text-warmgray">{item.time}</span>
            <BookmarkButton itemType="case" itemId={item.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
