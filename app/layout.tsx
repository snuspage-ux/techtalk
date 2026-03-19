import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechTalk — Tech Magazine",
  description: "Tech magazine covering AI tools, digital productivity, web development, and creative software. Articles in multiple languages.",
  keywords: ["tech magazine", "AI tools", "web development", "digital tools", "productivity"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <nav className="border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <a href="/" className="text-lg font-bold tracking-tight text-white">
              Tech<span className="text-violet-400">Talk</span>
            </a>
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              <a href="/ai" className="hover:text-white transition-colors">AI</a>
              <a href="/tools" className="hover:text-white transition-colors">Tools</a>
              <a href="/web" className="hover:text-white transition-colors">Web Dev</a>
              <a href="/creative" className="hover:text-white transition-colors">Creative</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t border-white/[0.06] mt-20 py-12">
          <div className="max-w-6xl mx-auto px-6 text-center text-xs text-zinc-600">
            © 2026 TechTalk Magazine. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
