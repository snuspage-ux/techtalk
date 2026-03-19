"use client";
import { useState, useEffect } from "react";

const LANGS = ["en", "cs", "de", "fr", "es", "pl", "zh"] as const;
const FLAG: Record<string, string> = { en: "\u{1F1EC}\u{1F1E7}", cs: "\u{1F1E8}\u{1F1FF}", de: "\u{1F1E9}\u{1F1EA}", fr: "\u{1F1EB}\u{1F1F7}", es: "\u{1F1EA}\u{1F1F8}", pl: "\u{1F1F5}\u{1F1F1}", zh: "\u{1F1E8}\u{1F1F3}" };
const LABEL: Record<string, string> = { en: "EN", cs: "CZ", de: "DE", fr: "FR", es: "ES", pl: "PL", zh: "ZH" };

function detectLang(): string {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("tt-lang");
  if (stored && (LANGS as readonly string[]).includes(stored)) return stored;
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  if (nav && (LANGS as readonly string[]).includes(nav)) return nav;
  return "en";
}

export function LanguageFilter({ onChange }: { onChange: (lang: string | null) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const detected = detectLang();
    setSelected(detected);
    onChange(detected);
  }, []);

  const handleSelect = (lang: string | null) => {
    setSelected(lang);
    setOpen(false);
    if (lang) localStorage.setItem("tt-lang", lang);
    else localStorage.removeItem("tt-lang");
    onChange(lang);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-zinc-300"
      >
        {selected ? <>{FLAG[selected]} {LABEL[selected]}</> : "\u{1F310} All"}
        <svg className="w-3 h-3 text-zinc-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-[#111118] border border-white/[0.08] rounded-xl p-1 z-50 min-w-[120px] shadow-xl">
          <button onClick={() => handleSelect(null)} className={"w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors " + (!selected ? "text-violet-400" : "text-zinc-400")}>
            {"\u{1F310}"} All languages
          </button>
          {LANGS.map(l => (
            <button key={l} onClick={() => handleSelect(l)} className={"w-full text-left text-sm px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors " + (selected === l ? "text-violet-400" : "text-zinc-400")}>
              {FLAG[l]} {LABEL[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
