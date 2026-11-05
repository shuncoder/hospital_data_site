import { NextResponse } from "next/server";
import { getSiteStats } from "@/lib/stats";

export const revalidate = 300;

export async function GET() {
  try {
    return NextResponse.json(await getSiteStats());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stats unavailable";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
