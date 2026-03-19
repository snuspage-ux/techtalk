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

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find(a => a.slug === slug);
}

export function getArticlesByLang(lang: string): Article[] {
  return getAllArticles().filter(a => a.lang === lang);
}

export function getArticlesByCategory(cat: string): Article[] {
  return getAllArticles().filter(a => a.category === cat);
}

export const LANGS = ["en", "cs", "de", "fr", "es", "pl", "zh"] as const;
export const CATEGORIES = ["ai", "tools", "web", "creative"] as const;
