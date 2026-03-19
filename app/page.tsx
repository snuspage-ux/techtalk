import { getAllArticles } from "@/lib/articles";
import Link from "next/link";

const CAT_COLORS: Record<string, string> = {
  ai: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  tools: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  web: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  creative: "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

const FLAG: Record<string, string> = { en: "🇬🇧", cs: "🇨🇿", de: "🇩🇪", fr: "🇫🇷", es: "🇪🇸", pl: "🇵🇱", zh: "🇨🇳" };

export default function Home() {
  const articles = getAllArticles();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <section className="mb-20">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Tech<span className="text-violet-400">Talk</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl">
          Independent tech magazine. AI tools, digital productivity, web development, and creative software reviewed and explained.
        </p>
      </section>

      {articles.length === 0 ? (
        <p className="text-zinc-500">No articles yet. Check back soon.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link key={a.slug} href={`/${a.lang}/${a.slug}`} className="group block">
              <article className="h-full rounded-2xl border border-white/[0.06] bg-[#111118] overflow-hidden transition-all duration-300 hover:border-violet-500/20 hover:bg-[#16162a] hover:translate-y-[-2px]">
                {a.image && (
                  <div className="h-40 overflow-hidden">
                    <img src={a.image} alt={a.imageAlt || a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${CAT_COLORS[a.category] || "text-zinc-400"}`}>
                      {a.category}
                    </span>
                    <span className="text-[10px] text-zinc-600">{FLAG[a.lang]} {a.lang.toUpperCase()}</span>
                    <span className="text-[10px] text-zinc-600 ml-auto">{a.readingTime} min</span>
                  </div>
                  <h2 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors mb-2 line-clamp-2">
                    {a.title}
                  </h2>
                  <p className="text-zinc-500 text-sm line-clamp-3">{a.excerpt}</p>
                  <time className="block mt-4 text-[10px] text-zinc-600">
                    {new Date(a.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
