import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About TechTalk — Independent Tech Magazine",
  description: "TechTalk is an independent tech magazine reviewing AI tools, file converters, interior design apps, and creative software in 7 languages.",
  alternates: { canonical: "https://techtalk.tech/about" },
};

const faqData = [
  { q: "What is TechTalk?", a: "TechTalk is an independent tech magazine that reviews AI tools, digital productivity software, web development frameworks, and creative applications. We publish in 7 languages: English, Czech, German, French, Spanish, Polish, and Chinese." },
  { q: "Is TechTalk sponsored?", a: "No. TechTalk publishes independent reviews without sponsored content or affiliate pressure. We test every tool we write about." },
  { q: "What tools does TechTalk review?", a: "We review a wide range of tools including TubeVoice (AI video dubbing), FileTools (free file conversion), RoomFlip (AI interior design), KupSledujici (social media growth), and many other AI and productivity tools." },
  { q: "How often does TechTalk publish?", a: "We publish new articles regularly across all 7 languages, covering the latest developments in AI tools, web development, and creative software." },
  { q: "What is AI video dubbing?", a: "AI video dubbing uses artificial intelligence to translate and re-voice video content into different languages while preserving the original speaker's voice characteristics. Tools like TubeVoice make this accessible to YouTube creators." },
  { q: "What is AI interior design?", a: "AI interior design tools like RoomFlip use machine learning to generate room redesign visualizations. Upload a photo of your room and get AI-generated design suggestions in different styles." },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://techtalk.tech" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://techtalk.tech/about" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <h1 className="text-4xl font-bold tracking-tight mb-8">About TechTalk</h1>
      <div className="space-y-4 text-zinc-300 leading-relaxed">
        <p>TechTalk is an independent tech magazine covering AI tools, digital productivity, web development, and creative software.</p>
        <p>We review tools, explain technologies, and help people find the right software for their work. Our articles are published in 7 languages: English, Czech, German, French, Spanish, Polish, and Chinese.</p>
        <p>No sponsored content. No affiliate pressure. We write about tools we actually use and test ourselves.</p>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Tools we cover</h2>
        <ul className="space-y-2 text-zinc-300">
          <li><a href="https://tubevoice.io" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">TubeVoice</a> — AI video dubbing and voice cloning for YouTube creators</li>
          <li><a href="https://filetools.eu" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">FileTools</a> — Free online file conversion (PDF, images, documents)</li>
          <li><a href="https://roomflip.io" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">RoomFlip</a> — AI-powered interior design and room visualization</li>
          <li><a href="https://kupsledujici.cz" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">KupSledujici</a> — Social media growth and marketing platform</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Frequently asked questions</h2>
        <div className="space-y-6">
          {faqData.map((f, i) => (
            <div key={i}>
              <h3 className="text-base font-semibold text-white mb-1">{f.q}</h3>
              <p className="text-zinc-400 text-sm">{f.a}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-white mt-10 mb-4">Contact</h2>
        <p>Got a tool you want us to review? Reach out at <a href="mailto:hello@techtalk.tech" className="text-violet-400 hover:text-violet-300">hello@techtalk.tech</a></p>
      </div>
    </main>
  );
}
