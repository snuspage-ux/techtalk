import { getPublishedArticles, LANGS } from "@/lib/articles";
import { ArticleGrid } from "@/components/ArticleGrid";
import type { Metadata } from "next";

// Re-render hourly so newly-due articles reveal themselves without a rebuild.
export const revalidate = 900;

const BASE = "https://techtalk.tech";

// x-default + English resolve to the root; other languages to their /[lang] landing.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: {
      "x-default": `${BASE}/`,
      ...Object.fromEntries(LANGS.map(l => [l, l === "en" ? `${BASE}/` : `${BASE}/${l}`])),
    },
  },
};

export default function Home() {
  const articles = getPublishedArticles().map(a => ({
    slug: a.slug,
    lang: a.lang,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    image: a.image,
    imageAlt: a.imageAlt,
    publishedAt: a.publishedAt,
    readingTime: a.readingTime,
  }));

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <ArticleGrid articles={articles} />
    </main>
  );
}
