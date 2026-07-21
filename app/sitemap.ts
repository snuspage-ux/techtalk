import type { MetadataRoute } from "next";
import { getPublishedArticles, CATEGORIES, LANGS } from "@/lib/articles";

const BASE = "https://techtalk.tech";

// Re-generate every 15 min so newly-due articles enter the sitemap on time.
export const revalidate = 900;

// Strip the trailing "-<lang>" so language variants of one topic share a key.
function topicKey(slug: string) {
  return slug.replace(/-[a-z]{2}$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Localized landing pages (/cs, /de, …). English lives at the root.
  for (const l of LANGS) {
    if (l === "en") continue;
    pages.push({ url: `${BASE}/${l}`, lastModified: now, changeFrequency: "daily", priority: 0.9 });
  }

  for (const cat of CATEGORIES) {
    pages.push({ url: `${BASE}/category/${cat}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
  }

  // Articles, each with hreflang alternates pointing to its sibling translations.
  const published = getPublishedArticles();
  const byTopic = new Map<string, typeof published>();
  for (const a of published) {
    const k = topicKey(a.slug);
    (byTopic.get(k) ?? byTopic.set(k, []).get(k)!).push(a);
  }

  for (const a of published) {
    const siblings = byTopic.get(topicKey(a.slug)) ?? [a];
    const languages: Record<string, string> = {};
    for (const s of siblings) languages[s.lang] = `${BASE}/${s.lang}/${s.slug}`;
    const en = siblings.find(s => s.lang === "en");
    if (en) languages["x-default"] = `${BASE}/en/${en.slug}`;

    pages.push({
      url: `${BASE}/${a.lang}/${a.slug}`,
      lastModified: a.publishedAt,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    });
  }

  return pages;
}
