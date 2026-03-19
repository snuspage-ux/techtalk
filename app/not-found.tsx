import Link from "next/link";
export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-32 text-center">
      <h1 className="text-6xl font-bold text-zinc-300 mb-4">404</h1>
      <p className="text-zinc-500 mb-8">Page not found.</p>
      <Link href="/" className="text-violet-400 hover:text-violet-300 text-sm">← Back to TechTalk</Link>
    </main>
  );
}
