import { NextResponse } from "next/server";
import { getStudy } from "@/lib/clinical-trials";

export async function GET(_: Request, { params }: { params: { nctId: string } }) {
  try {
    return NextResponse.json(await getStudy(params.nctId));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upstream request failed";
    return NextResponse.json({ error: message }, { status: message === "Study not found" ? 404 : 502 });
  }
}
