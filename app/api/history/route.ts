import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = (searchParams.get("base") || "USD").toUpperCase();
  const target = (searchParams.get("target") || "EUR").toUpperCase();

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 10);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const url = `https://api.frankfurter.app/${fmt(start)}..${fmt(end)}?from=${base}&to=${target}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return NextResponse.json({ error: "failed to fetch history" }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
