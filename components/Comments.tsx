"use client";
import { useEffect, useRef } from "react";

export function Comments({ lang, slug }: { lang: string; slug: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "snuspage-ux/techtalk");
    script.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkzNTE5NTgwNTM=");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyNzk2NTc1");
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", `${lang}/${slug}`);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark_dimmed");
    script.setAttribute("data-lang", lang === "cs" ? "cs" : lang === "de" ? "de" : lang === "fr" ? "fr" : lang === "es" ? "es" : lang === "pl" ? "pl" : lang === "zh" ? "zh-CN" : "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    ref.current.appendChild(script);
  }, [lang, slug]);

  return (
    <section className="mt-16 pt-12 border-t border-white/[0.06]">
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">Comments</h2>
      <div ref={ref} />
    </section>
  );
}
