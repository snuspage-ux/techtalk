import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

const BASE = "https://techtalk.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const pages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1.0 },
  ];
  for (const a of getAllArticles()) {
    pages.push({ url: `${BASE}/${a.lang}/${a.slug}`, lastModified: a.publishedAt, changeFrequency: "monthly", priority: 0.7 });
  }
  return pages;
}
