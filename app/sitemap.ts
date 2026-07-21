import type { MetadataRoute } from "next";
import { getPublishedArticles, CATEGORIES } from "@/lib/articles";

const BASE = "https://techtalk.tech";

// Re-generate hourly so newly-due articles enter the sitemap on their date.
export const revalidate = 900;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const pages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
  for (const cat of CATEGORIES) {
    pages.push({ url: `${BASE}/category/${cat}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  }
  for (const a of getPublishedArticles()) {
    pages.push({ url: `${BASE}/${a.lang}/${a.slug}`, lastModified: a.publishedAt, changeFrequency: "monthly", priority: 0.7 });
  }
  return pages;
}
