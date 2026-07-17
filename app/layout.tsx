import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TechTalk — Independent Tech Magazine | AI, Tools & Web Dev Reviews",
    template: "%s — TechTalk",
  },
  description: "Independent tech magazine reviewing AI tools, file converters, interior design apps, and web development software. Honest reviews in 7 languages. No sponsors, no affiliate pressure.",
  keywords: [
    "tech magazine", "AI tools review", "software reviews", "web development",
    "YouTube dubbing AI", "file converter online", "AI interior design",
    "TubeVoice", "FileTools", "RoomFlip", "KupSledujici",
    "AI video translation", "online tools comparison", "productivity software",
    "tech blog", "multilingual tech magazine",
    "recenze AI nástrojů", "KI-Tools Test", "outils IA avis",
    "herramientas IA reseña", "narzędzia AI recenzja", "AI工具评测",
    "social media marketing", "Instagram growth", "TikTok marketing",
  ],
  metadataBase: new URL("https://techtalk.tech"),
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    title: "TechTalk — Independent Tech Magazine",
    description: "Honest reviews of AI tools, file converters, and creative software. 7 languages, no sponsors.",
    siteName: "TechTalk",
    type: "website",
    locale: "en_US",
    alternateLocale: ["cs_CZ", "de_DE", "fr_FR", "es_ES", "pl_PL", "zh_CN"],
    url: "https://techtalk.tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechTalk — Independent Tech Magazine",
    description: "AI tools, file converters, interior design apps — reviewed and compared.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
  },
  other: {
    "theme-color": "#0a0a0f",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TechTalk",
    url: "https://techtalk.tech",
    description: "Independent tech magazine reviewing AI tools and digital software.",
    inLanguage: ["en", "cs", "de", "fr", "es", "pl", "zh"],
    publisher: {
      "@type": "Organization",
      name: "TechTalk",
      url: "https://techtalk.tech",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://techtalk.tech/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "TechTalk",
    url: "https://techtalk.tech",
    logo: {
      "@type": "ImageObject",
      url: "https://techtalk.tech/favicon.svg",
    },
    description: "Independent tech magazine covering AI tools, digital productivity, web development, and creative software. Published in 7 languages.",
    foundingDate: "2026",
    publishingPrinciples: "https://techtalk.tech/about",
    actionableFeedbackPolicy: "https://techtalk.tech/about",
    sameAs: [],
    diversityPolicy: "https://techtalk.tech/about",
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate" type="application/rss+xml" title="TechTalk RSS" href="/feed.xml" />
        <meta name="theme-color" content="#0a0a0f" />
        {jsonLd.map((ld, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        ))}
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <nav className="border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight text-white">
              Tech<span className="text-violet-400">Talk</span>
            </a>
            <div className="flex items-center gap-4 sm:gap-6 text-sm text-zinc-400">
              <a href="/category/ai" className="hover:text-violet-400 transition-colors hidden sm:block">AI</a>
              <a href="/category/tools" className="hover:text-emerald-400 transition-colors hidden sm:block">Tools</a>
              <a href="/category/web" className="hover:text-blue-400 transition-colors hidden sm:block">Web</a>
              <a href="/category/creative" className="hover:text-amber-400 transition-colors hidden sm:block">Creative</a>
              <a href="/about" className="hover:text-white transition-colors">About</a>
            </div>
          </div>
        </nav>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-white/[0.06] mt-20 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Categories</h4>
                <nav className="space-y-2 text-sm" aria-label="Categories">
                  <a href="/category/ai" className="block text-zinc-500 hover:text-violet-400 transition-colors">AI & Machine Learning</a>
                  <a href="/category/tools" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Tools & Productivity</a>
                  <a href="/category/web" className="block text-zinc-500 hover:text-blue-400 transition-colors">Web Development</a>
                  <a href="/category/creative" className="block text-zinc-500 hover:text-amber-400 transition-colors">Creative Software</a>
                </nav>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Tools we review</h4>
                <nav className="space-y-2 text-sm" aria-label="Reviewed tools">
                  <a href="https://tubevoice.io" target="_blank" rel="noopener" className="block text-zinc-500 hover:text-white transition-colors">TubeVoice — AI Video Dubbing</a>
                  <a href="https://roomflip.io" target="_blank" rel="noopener" className="block text-zinc-500 hover:text-white transition-colors">RoomFlip — AI Interior Design</a>
                  <a href="https://filetools.eu" target="_blank" rel="noopener" className="block text-zinc-500 hover:text-white transition-colors">FileTools — Free File Converter</a>
                  <a href="https://kupsledujici.cz" target="_blank" rel="noopener" className="block text-zinc-500 hover:text-white transition-colors">KupSledujici — Social Media Growth</a>
                  <a href="https://dopestore.cz" target="_blank" rel="noopener" className="block text-zinc-500 hover:text-white transition-colors">DOPESTORE — Alien Streetwear</a>
                  <a href="https://gymhome.cz" target="_blank" rel="noopener" className="block text-zinc-500 hover:text-white transition-colors">GymHome — Private 24/7 Gym</a>
                </nav>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Languages</h4>
                <div className="space-y-1 text-sm text-zinc-500">
                  <span className="block">🇬🇧 English</span>
                  <span className="block">🇨🇿 Čeština</span>
                  <span className="block">🇩🇪 Deutsch</span>
                  <span className="block">🇫🇷 Français</span>
                  <span className="block">🇪🇸 Español</span>
                  <span className="block">🇵🇱 Polski</span>
                  <span className="block">🇨🇳 中文</span>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Magazine</h4>
                <nav className="space-y-2 text-sm" aria-label="Magazine links">
                  <a href="/about" className="block text-zinc-500 hover:text-white transition-colors">About</a>
                  <a href="/feed.xml" className="block text-zinc-500 hover:text-white transition-colors">RSS Feed</a>
                  <a href="mailto:hello@techtalk.tech" className="block text-zinc-500 hover:text-white transition-colors">Contact</a>
                </nav>
              </div>
            </div>
            <div className="border-t border-white/[0.04] pt-6 text-center text-xs text-zinc-600">
              © 2026 TechTalk Magazine. Independent reviews since 2026.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
