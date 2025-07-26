import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params;

    // Prevent infinite redirect loop for not-found page
    if (shortCode === "not-found") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const supabase = await createClient();

    // Find the URL
    const { data: url, error } = await supabase
      .from("urls")
      .select("*")
      .eq("short_code", shortCode)
      .eq("is_active", true)
      .single();

    if (error || !url) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    // Check if URL is expired
    if (url.expires_at && new Date(url.expires_at) < new Date()) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    // Track analytics
    const userAgent = request.headers.get("user-agent") || "";
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const referrer = request.headers.get("referer") || "Direct";

    // Simple user agent parsing
    const device = /Mobile|Android|iPhone|iPad/.test(userAgent)
      ? "Mobile"
      : "Desktop";
    const browser = userAgent.includes("Chrome")
      ? "Chrome"
      : userAgent.includes("Firefox")
      ? "Firefox"
      : userAgent.includes("Safari")
      ? "Safari"
      : "Other";
    const os = userAgent.includes("Windows")
      ? "Windows"
      : userAgent.includes("Mac")
      ? "macOS"
      : userAgent.includes("Linux")
      ? "Linux"
      : "Other";

    // Create analytics entry and update click count
    await Promise.all([
      supabase.from("analytics").insert({
        url_id: url.id,
        ip_address: ipAddress,
        user_agent: userAgent,
        referrer,
        device,
        browser,
        os,
        country: "Unknown",
        city: "Unknown",
      }),
      supabase
        .from("urls")
        .update({ clicks: (url.clicks || 0) + 1 })
        .eq("id", url.id),
    ]);

    // Redirect to original URL
    return NextResponse.redirect(url.original_url);
  } catch (error) {
    console.error("Redirect error:", error);
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
}
