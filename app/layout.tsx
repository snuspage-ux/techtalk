import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechTalk — Independent Tech Magazine",
  description: "AI tools, digital productivity, web development, and creative software — reviewed, explained, and compared. Articles in 7 languages.",
  keywords: ["tech magazine", "AI tools", "web development", "digital tools", "productivity", "software reviews"],
  metadataBase: new URL("https://techtalk.tech"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "TechTalk — Independent Tech Magazine",
    description: "AI tools, digital productivity, web development, and creative software — reviewed and explained.",
    siteName: "TechTalk",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "TechTalk", description: "Independent tech magazine" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
                <div className="space-y-2 text-sm">
                  <a href="/category/ai" className="block text-zinc-500 hover:text-violet-400 transition-colors">AI & Machine Learning</a>
                  <a href="/category/tools" className="block text-zinc-500 hover:text-emerald-400 transition-colors">Tools & Productivity</a>
                  <a href="/category/web" className="block text-zinc-500 hover:text-blue-400 transition-colors">Web Development</a>
                  <a href="/category/creative" className="block text-zinc-500 hover:text-amber-400 transition-colors">Creative Software</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Tools we review</h4>
                <div className="space-y-2 text-sm">
                  <a href="https://tubevoice.io" target="_blank" rel="noopener" className="block text-zinc-500 hover:text-white transition-colors">TubeVoice</a>
                  <a href="https://roomflip.io" target="_blank" rel="noopener" className="block text-zinc-500 hover:text-white transition-colors">RoomFlip</a>
                  <a href="https://filetools.eu" target="_blank" rel="noopener" className="block text-zinc-500 hover:text-white transition-colors">FileTools</a>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Languages</h4>
                <div className="space-y-2 text-sm text-zinc-500">
                  <span>🇬🇧 English</span><br/>
                  <span>🇨🇿 Čeština</span><br/>
                  <span>🇩🇪 Deutsch</span><br/>
                  <span>🇫🇷 Français</span>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Magazine</h4>
                <div className="space-y-2 text-sm">
                  <a href="/about" className="block text-zinc-500 hover:text-white transition-colors">About</a>
                  <a href="mailto:hello@techtalk.tech" className="block text-zinc-500 hover:text-white transition-colors">Contact</a>
                </div>
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
