import type { Metadata } from "next";
export const metadata: Metadata = { title: "About — TechTalk", description: "About TechTalk magazine." };
export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-8">About TechTalk</h1>
      <div className="space-y-4 text-zinc-300 leading-relaxed">
        <p>TechTalk is an independent tech magazine covering AI tools, digital productivity, web development, and creative software.</p>
        <p>We review tools, explain technologies, and help people find the right software for their work. Our articles are published in 7 languages: English, Czech, German, French, Spanish, Polish, and Chinese.</p>
        <p>No sponsored content. No affiliate pressure. We write about tools we actually use and test ourselves.</p>
        <h2 className="text-xl font-bold text-white mt-10 mb-4">Contact</h2>
        <p>Got a tool you want us to review? Reach out at <a href="mailto:hello@techtalk.tech" className="text-violet-400 hover:text-violet-300">hello@techtalk.tech</a></p>
      </div>
    </main>
  );
}
