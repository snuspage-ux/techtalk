import { getPublishedArticles } from "@/lib/articles";
import { ArticleGrid } from "@/components/ArticleGrid";

// Re-render hourly so newly-due articles reveal themselves without a rebuild.
export const revalidate = 3600;

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
