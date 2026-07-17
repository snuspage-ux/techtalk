"use client";
import { useState } from "react";
import Link from "next/link";
import { LanguageFilter } from "./LanguageFilter";

interface Article {
  slug: string;
  lang: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  imageAlt?: string;
  publishedAt: string;
  readingTime: number;
}

const CAT_COLORS: Record<string, string> = {
  ai: "text-violet-400 bg-violet-500/10 border-violet-500/20 hover:bg-violet-500/20",
  tools: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20",
  web: "text-blue-400 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
  creative: "text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20",
};
const CAT_LABELS: Record<string, string> = { ai: "AI", tools: "Tools", web: "Web Dev", creative: "Creative" };
const FLAG: Record<string, string> = { en: "\u{1F1EC}\u{1F1E7}", cs: "\u{1F1E8}\u{1F1FF}", de: "\u{1F1E9}\u{1F1EA}", fr: "\u{1F1EB}\u{1F1F7}", es: "\u{1F1EA}\u{1F1F8}", pl: "\u{1F1F5}\u{1F1F1}", zh: "\u{1F1E8}\u{1F1F3}" };
const CATEGORIES = ["ai", "tools", "web", "creative"];

function ArticleCard({ a }: { a: Article }) {
  return (
    <Link href={"/" + a.lang + "/" + a.slug} className="group block">
      <article className="h-full rounded-2xl border border-white/[0.06] bg-[#111118] overflow-hidden transition-all duration-300 hover:border-violet-500/20 hover:bg-[#16162a] hover:translate-y-[-2px]">
        {a.image && (
          <div className="h-40 overflow-hidden">
            <img src={a.image} alt={a.imageAlt || a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={"text-[10px] px-2 py-0.5 rounded-full border " + (CAT_COLORS[a.category] || "")}>{a.category}</span>
            <span className="text-[10px] text-zinc-600">{FLAG[a.lang]} {a.lang.toUpperCase()}</span>
            <span className="text-[10px] text-zinc-600 ml-auto">{a.readingTime} min</span>
          </div>
          <h2 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors mb-2 line-clamp-2">{a.title}</h2>
          <p className="text-zinc-500 text-sm line-clamp-3">{a.excerpt}</p>
          <time className="block mt-4 text-[10px] text-zinc-600">
            {new Date(a.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </time>
        </div>
      </article>
    </Link>
  );
}

export function ArticleGrid({ articles }: { articles: Article[] }) {
  // Default to "en" so the server-rendered HTML contains real article links (SEO).
  // LanguageFilter switches to the visitor's preferred language after hydration.
  const [lang, setLang] = useState<string | null>("en");
  const filtered = lang ? articles.filter(a => a.lang === lang) : articles;
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <section className="mb-16">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Tech<span className="text-violet-400">Talk</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl">
              Independent tech magazine. AI tools, digital productivity, web development, and creative software.
            </p>
          </div>
          <LanguageFilter onChange={setLang} />
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {CATEGORIES.map(cat => (
            <Link key={cat} href={"/category/" + cat} className={"text-xs px-3 py-1.5 rounded-full border transition-colors " + (CAT_COLORS[cat] || "")}>
              {CAT_LABELS[cat]}
            </Link>
          ))}
        </div>
      </section>

      {filtered.length === 0 ? (
        <p className="text-zinc-500">No articles in this language yet.</p>
      ) : (
        <>
          {featured && (
            <section className="mb-16">
              <Link href={"/" + featured.lang + "/" + featured.slug} className="group block">
                <article className="rounded-2xl border border-white/[0.06] bg-[#111118] overflow-hidden transition-all duration-300 hover:border-violet-500/20 hover:bg-[#16162a] md:grid md:grid-cols-2">
                  {featured.image && (
                    <div className="h-56 md:h-full overflow-hidden">
                      <img src={featured.image} alt={featured.imageAlt || featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] text-violet-400 uppercase tracking-wider font-semibold">Featured</span>
                      <span className="text-[10px] text-zinc-600">{FLAG[featured.lang]} {featured.lang.toUpperCase()}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-violet-300 transition-colors mb-3">{featured.title}</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                    <time className="text-[10px] text-zinc-600">
                      {new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </time>
                  </div>
                </article>
              </Link>
            </section>
          )}

          {rest.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">
                {lang ? "Articles in " + (FLAG[lang] || "") + " " + lang.toUpperCase() : "Latest articles"}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map(a => <ArticleCard key={a.slug} a={a} />)}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
