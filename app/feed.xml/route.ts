import { getAllArticles } from "@/lib/articles";

const BASE = "https://techtalk.tech";

export async function GET() {
  const articles = getAllArticles().slice(0, 50);
  const now = new Date().toUTCString();

  const items = articles.map(a => {
    return `<item>
      <title>${a.title.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</title>
      <link>${BASE}/${a.lang}/${a.slug}</link>
      <guid isPermaLink="true">${BASE}/${a.lang}/${a.slug}</guid>
      <description>${a.excerpt.replace(/&/g,"&amp;").replace(/</g,"&lt;")}</description>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <category>${a.category}</category>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TechTalk Magazine</title>
    <link>${BASE}</link>
    <description>Independent tech magazine. AI tools, digital productivity, web development, and creative software.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
