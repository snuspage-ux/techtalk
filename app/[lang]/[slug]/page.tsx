import { getAllArticles, getArticle } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ lang: a.lang, slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — TechTalk`,
    description: article.description,
    keywords: article.tags,
    openGraph: { title: article.title, description: article.description, type: "article" },
  };
}

function renderContent(content: string, backlinks?: { text: string; url: string }[]) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  for (const line of lines) {
    i++;
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("### ")) elements.push(<h3 key={i} className="text-lg font-bold text-white mt-8 mb-3">{t.slice(4)}</h3>);
    else if (t.startsWith("## ")) elements.push(<h2 key={i} className="text-2xl font-bold text-white mt-12 mb-4">{t.slice(3)}</h2>);
    else {
      const parts = t.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={i} className="text-zinc-300 leading-relaxed mb-4">
          {parts.map((p, j) =>
            p.startsWith("**") && p.endsWith("**")
              ? <strong key={j} className="text-white font-semibold">{p.slice(2, -2)}</strong>
              : p
          )}
        </p>
      );
    }
  }
  if (backlinks?.length) {
    elements.push(
      <div key="bl" className="mt-12 p-6 rounded-xl bg-violet-500/[0.05] border border-violet-500/10">
        <h3 className="text-sm font-semibold text-zinc-300 mb-3">Related tools mentioned in this article:</h3>
        <div className="flex flex-wrap gap-3">
          {backlinks.map((bl, i) => (
            <a key={i} href={bl.url} target="_blank" rel="noopener" className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors">
              {bl.text} →
            </a>
          ))}
        </div>
      </div>
    );
  }
  return elements;
}

export default async function ArticlePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!article || article.lang !== lang) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-zinc-500 hover:text-violet-400 transition-colors mb-8 inline-block">← Back to TechTalk</Link>
      <div className="flex items-center gap-3 text-xs text-zinc-500 mb-6">
        <span className="uppercase">{article.category}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-600" />
        <time>{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
        <span className="w-1 h-1 rounded-full bg-zinc-600" />
        <span>{article.readingTime} min read</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-tight">{article.title}</h1>
      <div>{renderContent(article.content, article.backlinks)}</div>
      <div className="mt-16 flex flex-wrap gap-2">
        {article.tags.map(t => (
          <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-500 border border-white/[0.06]">{t}</span>
        ))}
      </div>
    </main>
  );
}
