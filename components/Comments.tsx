"use client";
import { useState, useEffect } from "react";

interface Comment {
  id: string;
  nickname: string;
  comment: string;
  created_at: string;
}

export function Comments({ lang, slug }: { lang: string; slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nickname, setNickname] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const fullSlug = `${lang}/${slug}`;

  useEffect(() => {
    const saved = localStorage.getItem("tt-nickname");
    if (saved) setNickname(saved);
    fetch(`/api/comments?slug=${encodeURIComponent(fullSlug)}`)
      .then(r => r.json())
      .then(setComments)
      .catch(() => {});
  }, [fullSlug]);

  const submit = async () => {
    if (!nickname.trim() || !text.trim()) return;
    setSending(true);
    localStorage.setItem("tt-nickname", nickname);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: fullSlug, nickname, comment: text }),
      });
      if (res.ok) {
        const c = await res.json();
        setComments(prev => [...prev, c]);
        setText("");
      }
    } catch {}
    setSending(false);
  };

  const labels: Record<string, { title: string; name: string; placeholder: string; btn: string }> = {
    cs: { title: "Koment\u00e1\u0159e", name: "P\u0159ezd\u00edvka", placeholder: "Napi\u0161 koment\u00e1\u0159...", btn: "Odeslat" },
    de: { title: "Kommentare", name: "Spitzname", placeholder: "Kommentar schreiben...", btn: "Senden" },
    fr: { title: "Commentaires", name: "Pseudo", placeholder: "\u00c9crire un commentaire...", btn: "Envoyer" },
    es: { title: "Comentarios", name: "Apodo", placeholder: "Escribe un comentario...", btn: "Enviar" },
    pl: { title: "Komentarze", name: "Pseudonim", placeholder: "Napisz komentarz...", btn: "Wy\u015blij" },
    zh: { title: "\u8bc4\u8bba", name: "\u6635\u79f0", placeholder: "\u5199\u8bc4\u8bba...", btn: "\u63d0\u4ea4" },
    en: { title: "Comments", name: "Nickname", placeholder: "Write a comment...", btn: "Send" },
  };
  const l = labels[lang] || labels.en;

  return (
    <section className="mt-16 pt-12 border-t border-white/[0.06]">
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">{l.title} ({comments.length})</h2>

      {comments.map(c => (
        <div key={c.id} className="mb-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-violet-400">{c.nickname}</span>
            <span className="text-[10px] text-zinc-600">{new Date(c.created_at).toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-zinc-300">{c.comment}</p>
        </div>
      ))}

      <div className="mt-6 space-y-3">
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder={l.name}
          maxLength={50}
          className="w-full sm:w-48 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/30"
        />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={l.placeholder}
          maxLength={2000}
          rows={3}
          className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/30 resize-none"
        />
        <button
          onClick={submit}
          disabled={sending || !nickname.trim() || !text.trim()}
          className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {sending ? "..." : l.btn}
        </button>
      </div>
    </section>
  );
}
