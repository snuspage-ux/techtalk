import { Article } from "./types";
import fs from "fs";
import path from "path";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith(".json"));
  return files
    .map(f => JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8")) as Article)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticle(slug: string, lang?: string): Article | undefined {
  return getAllArticles().find(a => a.slug === slug && (!lang || a.lang === lang));
}

// Articles are pre-written with a future publishedAt and revealed when that
// moment arrives. publishedAt may be a date ("2026-07-22", treated as midnight
// UTC) or a full timestamp ("2026-07-22T05:00:00Z") — the latter lets us drop
// two articles a day (morning and evening). Everything shown to visitors
// (home, category, feed, sitemap) goes through this set, so scheduled drafts
// stay hidden until their time. Pages revalidate every 15 min (see route files)
// so a drop appears within minutes of its timestamp without a rebuild.
export function getPublishedArticles(): Article[] {
  const now = Date.now();
  return getAllArticles().filter(a => new Date(a.publishedAt).getTime() <= now);
}

export function getArticlesByLang(lang: string): Article[] {
  return getPublishedArticles().filter(a => a.lang === lang);
}

export function getArticlesByCategory(cat: string): Article[] {
  return getPublishedArticles().filter(a => a.category === cat);
}

export const LANGS = ["en", "cs", "de", "fr", "es", "pl", "zh"] as const;
export const CATEGORIES = ["ai", "tools", "web", "creative"] as const;
