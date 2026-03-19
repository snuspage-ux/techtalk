import { getArticlesByCategory, CATEGORIES } from "@/lib/articles";
import Link from "next/link";
import type { Metadata } from "next";

const CAT_LABELS: Record<string, string> = { ai: "Artificial Intelligence", tools: "Tools & Productivity", web: "Web Development", creative: "Creative Software" };
const CAT_COLORS: Record<string, string> = { ai: "text-violet-400 bg-violet-500/10 border-violet-500/20", tools: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", web: "text-blue-400 bg-blue-500/10 border-blue-500/20", creative: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
const FLAG: Record<string, string> = { en: "🇬🇧", cs: "🇨🇿", de: "🇩🇪", fr: "🇫🇷", es: "🇪🇸", pl: "🇵🇱", zh: "🇨🇳" };

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({ cat }));
}

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }): Promise<Metadata> {
  const { cat } = await params;
  const label = CAT_LABELS[cat] || cat;
  return { title: `${label} — TechTalk`, description: `Articles about ${label.toLowerCase()} on TechTalk magazine.` };
}

export default async function CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const articles = getArticlesByCategory(cat);
  const label = CAT_LABELS[cat] || cat;

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">{label}</h1>
      <p className="text-zinc-500 mb-12">{articles.length} articles</p>
      {articles.length === 0 ? (
        <p className="text-zinc-500">No articles in this category yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} href={`/${a.lang}/${a.slug}`} className="group block">
              <article className="h-full rounded-2xl border border-white/[0.06] bg-[#111118] overflow-hidden transition-all duration-300 hover:border-violet-500/20 hover:bg-[#16162a] hover:translate-y-[-2px]">
                {a.image && <div className="h-40 overflow-hidden"><img src={a.image} alt={a.imageAlt || a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div>}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${CAT_COLORS[a.category] || ""}`}>{a.category}</span>
                    <span className="text-[10px] text-zinc-600">{FLAG[a.lang]} {a.lang.toUpperCase()}</span>
                    <span className="text-[10px] text-zinc-600 ml-auto">{a.readingTime} min</span>
                  </div>
                  <h2 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors mb-2 line-clamp-2">{a.title}</h2>
                  <p className="text-zinc-500 text-sm line-clamp-3">{a.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
