import { NextResponse } from "next/server";

const API_KEY = "WbPRJVKwg8yrjK8veKeZpEz16B9ZeM5k";
const TOKEN_URL = "https://api.datdrop.com/partners-api/token";
const STATS_URL = "https://api.datdrop.com/partners-api/statistic";

let cachedToken: { access_token: string; expires_at: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expires_at - 60_000) {
    return cachedToken.access_token;
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Accept": "application/json", "api-key": API_KEY },
  });

  if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);

  const data = await res.json();
  cachedToken = {
    access_token: data.access_token,
    expires_at: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

export async function GET() {
  try {
    const token = await getToken();

    // Current month date range
    const now = new Date();
    const from = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const to = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    const res = await fetch(`${STATS_URL}?from_date=${from}&to_date=${to}`, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      // Token might be expired, clear cache and retry once
      cachedToken = null;
      const newToken = await getToken();
      const retry = await fetch(`${STATS_URL}?from_date=${from}&to_date=${to}`, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${newToken}`,
        },
      });
      if (!retry.ok) throw new Error(`Stats fetch failed: ${retry.status}`);
      const data = await retry.json();
      return NextResponse.json(data, {
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
      });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (err) {
    console.error("DatDrop API error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
