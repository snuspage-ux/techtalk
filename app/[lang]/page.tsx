import { getArticlesByLang, LANGS } from "@/lib/articles";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 900;

export function generateStaticParams() {
  return LANGS.map(lang => ({ lang }));
}

const BASE = "https://techtalk.tech";

const LOCALE: Record<string, string> = { en: "en_US", cs: "cs_CZ", de: "de_DE", fr: "fr_FR", es: "es_ES", pl: "pl_PL", zh: "zh_CN" };
const NAME: Record<string, string> = { en: "English", cs: "Čeština", de: "Deutsch", fr: "Français", es: "Español", pl: "Polski", zh: "中文" };
const FLAG: Record<string, string> = { en: "🇬🇧", cs: "🇨🇿", de: "🇩🇪", fr: "🇫🇷", es: "🇪🇸", pl: "🇵🇱", zh: "🇨🇳" };

const TITLE: Record<string, string> = {
  en: "TechTalk — Independent Tech Magazine | AI, Tools & Web Dev Reviews",
  cs: "TechTalk — Nezávislý technologický magazín | Recenze AI, nástrojů a webu",
  de: "TechTalk — Unabhängiges Tech-Magazin | KI, Tools & Web-Reviews",
  fr: "TechTalk — Magazine tech indépendant | Avis IA, outils et web",
  es: "TechTalk — Revista tech independiente | Reseñas de IA, herramientas y web",
  pl: "TechTalk — Niezależny magazyn technologiczny | Recenzje AI, narzędzi i webu",
  zh: "TechTalk — 独立科技杂志 | AI、工具与网页开发评测",
};
const DESC: Record<string, string> = {
  en: "Independent tech magazine reviewing AI tools, file converters, interior design apps and web software. Honest reviews, no sponsors.",
  cs: "Nezávislý technologický magazín. Recenze AI nástrojů, převodníků souborů, aplikací pro design interiérů a webového softwaru. Poctivě, bez sponzorů.",
  de: "Unabhängiges Tech-Magazin mit Reviews zu KI-Tools, Datei-Konvertern, Einrichtungs-Apps und Web-Software. Ehrlich, ohne Sponsoren.",
  fr: "Magazine tech indépendant : avis sur les outils IA, convertisseurs de fichiers, applis déco et logiciels web. Honnête, sans sponsors.",
  es: "Revista tech independiente con reseñas de herramientas IA, conversores de archivos, apps de diseño de interiores y software web. Sin patrocinadores.",
  pl: "Niezależny magazyn technologiczny. Recenzje narzędzi AI, konwerterów plików, aplikacji do wnętrz i oprogramowania web. Uczciwie, bez sponsorów.",
  zh: "独立科技杂志，评测 AI 工具、文件转换器、室内设计应用和网页软件。诚实、无赞助。",
};
const TAGLINE: Record<string, string> = {
  en: "Independent tech magazine. AI tools, digital productivity, web development, and creative software.",
  cs: "Nezávislý technologický magazín. AI nástroje, digitální produktivita, vývoj webu a kreativní software.",
  de: "Unabhängiges Tech-Magazin. KI-Tools, digitale Produktivität, Webentwicklung und kreative Software.",
  fr: "Magazine tech indépendant. Outils IA, productivité numérique, développement web et logiciels créatifs.",
  es: "Revista tech independiente. Herramientas IA, productividad digital, desarrollo web y software creativo.",
  pl: "Niezależny magazyn technologiczny. Narzędzia AI, produktywność cyfrowa, web development i oprogramowanie kreatywne.",
  zh: "独立科技杂志。AI 工具、数字生产力、网页开发与创意软件。",
};
const LATEST: Record<string, string> = { en: "Latest articles", cs: "Nejnovější články", de: "Neueste Artikel", fr: "Derniers articles", es: "Últimos artículos", pl: "Najnowsze artykuły", zh: "最新文章" };
const EMPTY: Record<string, string> = { en: "No articles in this language yet.", cs: "Zatím žádné články v tomto jazyce.", de: "Noch keine Artikel in dieser Sprache.", fr: "Pas encore d'articles dans cette langue.", es: "Aún no hay artículos en este idioma.", pl: "Brak artykułów w tym języku.", zh: "该语言暂无文章。" };

const CAT_COLORS: Record<string, string> = {
  ai: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  tools: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  web: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  creative: "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

function langAlternates() {
  const languages: Record<string, string> = { "x-default": `${BASE}/` , en: `${BASE}/` };
  for (const l of LANGS) if (l !== "en") languages[l] = `${BASE}/${l}`;
  return languages;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!(LANGS as readonly string[]).includes(lang)) return {};
  // English canonical is the site root to avoid duplicating "/".
  const canonical = lang === "en" ? `${BASE}/` : `${BASE}/${lang}`;
  return {
    title: TITLE[lang],
    description: DESC[lang],
    alternates: { canonical, languages: langAlternates() },
    openGraph: {
      title: TITLE[lang],
      description: DESC[lang],
      url: canonical,
      siteName: "TechTalk",
      type: "website",
      locale: LOCALE[lang] || "en_US",
    },
  };
}

export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!(LANGS as readonly string[]).includes(lang)) notFound();
  const articles = getArticlesByLang(lang);
  const featured = articles[0];
  const rest = articles.slice(1);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE[lang],
    description: DESC[lang],
    url: lang === "en" ? `${BASE}/` : `${BASE}/${lang}`,
    inLanguage: lang,
    isPartOf: { "@type": "WebSite", name: "TechTalk", url: BASE },
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <section className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Tech<span className="text-violet-400">Talk</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl">{TAGLINE[lang]}</p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-zinc-500">
          {LANGS.map(l => (
            <Link key={l} href={l === "en" ? "/" : `/${l}`} className={"px-2.5 py-1 rounded-full border transition-colors " + (l === lang ? "border-violet-500/30 text-violet-300 bg-violet-500/10" : "border-white/[0.08] hover:text-zinc-300")}>
              {FLAG[l]} {NAME[l]}
            </Link>
          ))}
        </div>
      </section>

      {articles.length === 0 ? (
        <p className="text-zinc-500">{EMPTY[lang]}</p>
      ) : (
        <>
          {featured && (
            <section className="mb-16">
              <Link href={`/${lang}/${featured.slug}`} className="group block">
                <article className="rounded-2xl border border-white/[0.06] bg-[#111118] overflow-hidden transition-all duration-300 hover:border-violet-500/20 hover:bg-[#16162a] md:grid md:grid-cols-2">
                  {featured.image && (
                    <div className="h-56 md:h-full overflow-hidden">
                      <img src={featured.image} alt={featured.imageAlt || featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-8 flex flex-col justify-center">
                    <span className={"text-[10px] px-2 py-0.5 rounded-full border self-start mb-4 " + (CAT_COLORS[featured.category] || "")}>{featured.category}</span>
                    <h2 className="text-2xl font-bold text-white group-hover:text-violet-300 transition-colors mb-3">{featured.title}</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">{featured.excerpt}</p>
                  </div>
                </article>
              </Link>
            </section>
          )}
          {rest.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">{LATEST[lang]}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map(a => (
                  <Link key={a.slug} href={`/${lang}/${a.slug}`} className="group block">
                    <article className="h-full rounded-2xl border border-white/[0.06] bg-[#111118] overflow-hidden transition-all duration-300 hover:border-violet-500/20 hover:bg-[#16162a] hover:translate-y-[-2px]">
                      {a.image && <div className="h-40 overflow-hidden"><img src={a.image} alt={a.imageAlt || a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div>}
                      <div className="p-6">
                        <span className={"text-[10px] px-2 py-0.5 rounded-full border " + (CAT_COLORS[a.category] || "")}>{a.category}</span>
                        <h3 className="mt-4 text-base font-semibold text-white group-hover:text-violet-300 transition-colors mb-2 line-clamp-2">{a.title}</h3>
                        <p className="text-zinc-500 text-sm line-clamp-3">{a.excerpt}</p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
