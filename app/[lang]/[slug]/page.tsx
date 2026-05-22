import { getAllArticles, getArticle, getArticlesByLang } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ShareButtons } from "@/components/ShareButtons";
import { Comments } from "@/components/Comments";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ lang: a.lang, slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticle(slug, lang);
  if (!article) return {};

  const langMap: Record<string, string> = { en: "en_US", cs: "cs_CZ", de: "de_DE", fr: "fr_FR", es: "es_ES", pl: "pl_PL", zh: "zh_CN" };
  const baseTopic = slug.replace(/-[a-z]{2}$/, "");
  const allArticles = getAllArticles();
  const hrefLangs = allArticles
    .filter(a => a.slug.replace(/-[a-z]{2}$/, "") === baseTopic && a.slug !== slug)
    .map(a => ({ hrefLang: a.lang, href: `https://techtalk.tech/${a.lang}/${a.slug}` }));

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: {
      canonical: `https://techtalk.tech/${lang}/${slug}`,
      languages: Object.fromEntries(hrefLangs.map(h => [h.hrefLang, h.href])),
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      tags: article.tags,
      locale: langMap[lang] || "en_US",
      alternateLocale: Object.keys(langMap).filter(l => l !== lang).map(l => langMap[l]),
      url: `https://techtalk.tech/${lang}/${slug}`,
      siteName: "TechTalk",
      ...(article.image ? { images: [{ url: article.image, width: 800, height: 450, alt: article.imageAlt || article.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      ...(article.image ? { images: [article.image] } : {}),
    },
  };
}

const CAT_COLORS: Record<string, string> = { ai: "text-violet-400 bg-violet-500/10 border-violet-500/20", tools: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", web: "text-blue-400 bg-blue-500/10 border-blue-500/20", creative: "text-amber-400 bg-amber-500/10 border-amber-500/20" };

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
      const parts = t.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
      elements.push(
        <p key={i} className="text-zinc-300 leading-relaxed mb-4">
          {parts.map((p: string, j: number) => {
            if (p.startsWith("**") && p.endsWith("**")) return <strong key={j} className="text-white font-semibold">{p.slice(2, -2)}</strong>;
            const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (m) return <Link key={j} href={m[2]} className="text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors">{m[1]}</Link>;
            return p;
          })}
        </p>
      );
    }
  }
  if (backlinks?.length) {
    elements.push(
      <div key="bl" className="mt-12 p-6 rounded-xl bg-violet-500/[0.05] border border-violet-500/10">
        <h3 className="text-sm font-semibold text-zinc-300 mb-3">Tools mentioned in this article</h3>
        <div className="flex flex-wrap gap-3">
          {backlinks.map((bl: {text:string;url:string}, i: number) => (
            <a key={i} href={bl.url} target="_blank" rel="noopener" className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors">{bl.text} →</a>
          ))}
        </div>
      </div>
    );
  }
  return elements;
}

export default async function ArticlePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const article = getArticle(slug, lang);
  if (!article) notFound();

  const rel = (article as any).related || getArticlesByLang(lang).filter((a: any) => a.slug !== slug).slice(0, 3);

  const CAT_LABELS: Record<string, string> = { ai: "AI & Machine Learning", tools: "Tools & Productivity", web: "Web Development", creative: "Creative Software" };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://techtalk.tech" },
      { "@type": "ListItem", position: 2, name: CAT_LABELS[article.category] || article.category, item: `https://techtalk.tech/category/${article.category}` },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://techtalk.tech/${lang}/${slug}` },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Organization", name: "TechTalk", url: "https://techtalk.tech" },
    publisher: { "@type": "Organization", name: "TechTalk", url: "https://techtalk.tech", logo: { "@type": "ImageObject", url: "https://techtalk.tech/favicon.svg" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://techtalk.tech/${lang}/${slug}` },
    ...(article.image ? { image: { "@type": "ImageObject", url: article.image, width: 800, height: 450 } } : {}),
    inLanguage: article.lang,
    keywords: article.tags?.join(", "),
    articleSection: article.category,
    wordCount: article.content?.split(/\s+/).length || 500,
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Link href="/" className="text-sm text-zinc-500 hover:text-violet-400 transition-colors mb-8 inline-block">← Back to TechTalk</Link>
      <div className="flex items-center gap-3 text-xs text-zinc-500 mb-6">
        <Link href={`/category/${article.category}`} className={`px-2 py-0.5 rounded-full border ${CAT_COLORS[article.category] || ""}`}>{article.category}</Link>
        <span className="w-1 h-1 rounded-full bg-zinc-600" />
        <time>{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
        <span className="w-1 h-1 rounded-full bg-zinc-600" />
        <span>{article.readingTime} min read</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 leading-tight">{article.title}</h1>
      {article.image && (
        <div className="mb-10 rounded-2xl overflow-hidden border border-white/[0.06]">
          <img src={article.image} alt={article.imageAlt || article.title} className="w-full h-64 md:h-80 object-cover" />
        </div>
      )}
      <div>{renderContent(article.content, article.backlinks)}</div>
      <div className="mt-12 flex flex-wrap gap-2">
        {article.tags.map((t: string) => (
          <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-500 border border-white/[0.06]">{t}</span>
        ))}
      </div>
      <ShareButtons url={`https://techtalk.tech/${lang}/${slug}`} title={article.title} />
      <Comments lang={lang} slug={slug} />
      {rel.length > 0 && (
        <section className="mt-16 pt-12 border-t border-white/[0.06]">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">More articles</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {rel.map((r: any) => { const full = getArticle(typeof r === 'string' ? r : r.slug, lang); return (
              <Link key={typeof r === 'string' ? r : r.slug} href={`/${lang}/${typeof r === 'string' ? r : r.slug}`} className="group block rounded-xl border border-white/[0.06] bg-[#111118] p-4 hover:border-violet-500/20 transition-colors">
                {full?.image && <img src={full.image} alt={r.title} className="w-full h-24 object-cover rounded-lg mb-3" loading="lazy" />}
                <h3 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors line-clamp-2">{r.title}</h3>
              </Link>
            ); })}
          </div>
        </section>
      )}
    </main>
  );
}
