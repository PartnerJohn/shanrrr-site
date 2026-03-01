import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://kick.com/api/v2/channels/shanrrr/livestream",
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json({ is_live: false });
    }

    const json = await res.json();
    const stream = json?.data;

    if (!stream || !stream.id) {
      return NextResponse.json({ is_live: false });
    }

    return NextResponse.json({
      is_live: true,
      title: stream.session_title || "",
      viewers: stream.viewers || 0,
      started_at: stream.created_at || "",
      thumbnail: stream.thumbnail?.src || "",
    });
  } catch {
    return NextResponse.json({ is_live: false });
  }
}
