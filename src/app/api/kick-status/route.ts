import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://kick.com/api/v2/channels/shanrrr/livestream",
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "shanrrr-site/1.0",
        },
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ is_live: false });
    }

    const data = await res.json();

    // Kick returns null/empty when offline, object when live
    if (!data || !data.data) {
      return NextResponse.json({ is_live: false });
    }

    return NextResponse.json({
      is_live: true,
      title: data.data.session_title || "",
      viewers: data.data.viewer_count || 0,
      started_at: data.data.created_at || "",
      thumbnail: data.data.thumbnail?.url || "",
    });
  } catch {
    return NextResponse.json({ is_live: false });
  }
}
