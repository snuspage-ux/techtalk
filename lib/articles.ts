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

// Articles are pre-written with future publishedAt dates and revealed on their
// day. Everything shown to visitors (home, category, feed, sitemap) must go
// through the published set so future-dated drafts stay hidden until their date.
// Uses UTC "today"; ISO YYYY-MM-DD strings compare correctly lexicographically.
export function getPublishedArticles(): Article[] {
  const today = new Date().toISOString().slice(0, 10);
  return getAllArticles().filter(a => a.publishedAt <= today);
}

export function getArticlesByLang(lang: string): Article[] {
  return getPublishedArticles().filter(a => a.lang === lang);
}

export function getArticlesByCategory(cat: string): Article[] {
  return getPublishedArticles().filter(a => a.category === cat);
}

export const LANGS = ["en", "cs", "de", "fr", "es", "pl", "zh"] as const;
export const CATEGORIES = ["ai", "tools", "web", "creative"] as const;
