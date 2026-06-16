import type { MetadataRoute } from "next";
import { SITE_URL, absoluteSiteUrl } from "@/lib/site-url";

async function queryD1<T>(sql: string, params: string[] = []): Promise<T[]> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const token = process.env.CLOUDFLARE_D1_TOKEN;

  if (!accountId || !databaseId || !token) return [];

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql, params }),
        next: { revalidate: 300 },
      }
    );
    const data = await res.json();
    if (!data.success) return [];
    return data.result?.[0]?.results ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, cases] = await Promise.all([
    queryD1<{ slug: string; created_at?: string }>("SELECT slug, created_at FROM articles WHERE published = 1 ORDER BY created_at DESC"),
    queryD1<{ id: string; created_at?: string }>("SELECT id, created_at FROM cases WHERE published = 1 ORDER BY created_at DESC"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteSiteUrl("/kien-thuc"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteSiteUrl("/case-thuc-te"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: absoluteSiteUrl(`/kien-thuc/${article.slug}`),
    lastModified: article.created_at ? new Date(article.created_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseRoutes: MetadataRoute.Sitemap = cases.map((item) => ({
    url: absoluteSiteUrl(`/case-thuc-te/${item.id}`),
    lastModified: item.created_at ? new Date(item.created_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...articleRoutes, ...caseRoutes];
}
