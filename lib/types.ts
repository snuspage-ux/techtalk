export interface Article {
  slug: string;
  lang: string;
  title: string;
  description: string;
  excerpt: string;
  content: string;
  category: "ai" | "tools" | "web" | "creative";
  tags: string[];
  publishedAt: string;
  readingTime: number;
  image?: string;
  imageAlt?: string;
  backlinks?: { text: string; url: string }[];
  related?: { slug: string; lang: string; title: string }[];
}
