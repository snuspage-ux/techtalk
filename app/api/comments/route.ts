import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = "https://api.tubevoice.io";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBydXRkYXVza25ybnFxcWlhZGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MTU3OTQsImV4cCI6MjA4NzI5MTc5NH0.JHEeCCZUe4bWTJLuFcWBzY5ygX0wYelG3wGIyvP5KS8";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json([]);
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/techtalk_comments?article_slug=eq.${encodeURIComponent(slug)}&order=created_at.asc`,
    { headers, next: { revalidate: 0 } }
  );
  return NextResponse.json(await res.json());
}

export async function POST(req: NextRequest) {
  const { slug, nickname, comment } = await req.json();
  if (!slug || !nickname?.trim() || !comment?.trim())
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  if (nickname.length > 50 || comment.length > 2000)
    return NextResponse.json({ error: "Too long" }, { status: 400 });

  const res = await fetch(`${SUPABASE_URL}/rest/v1/techtalk_comments`, {
    method: "POST",
    headers,
    body: JSON.stringify({ article_slug: slug, nickname: nickname.trim(), comment: comment.trim() }),
  });
  if (!res.ok) return NextResponse.json({ error: "Failed" }, { status: 500 });
  const data = await res.json();
  return NextResponse.json(data[0] || {});
}
