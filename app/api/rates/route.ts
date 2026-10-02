import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const UPSTREAM = "https://open.er-api.com/v6/latest";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = (searchParams.get("base") || "USD").toUpperCase();

  try {
    const res = await fetch(`${UPSTREAM}/${base}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "failed to fetch rates" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}
