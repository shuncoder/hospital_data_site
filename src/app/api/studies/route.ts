import { NextRequest, NextResponse } from "next/server";
import { searchStudies } from "@/lib/clinical-trials";
import type { StudyStatus } from "@/types/clinical-trials";

const validStatuses = new Set<StudyStatus>([
  "RECRUITING", "NOT_YET_RECRUITING", "ACTIVE_NOT_RECRUITING", "COMPLETED",
  "ENROLLING_BY_INVITATION", "SUSPENDED", "TERMINATED", "WITHDRAWN", "AVAILABLE"
]);

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const status = params.get("status") ?? "";
  if (status && !validStatuses.has(status as StudyStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  try {
    const data = await searchStudies({
      query: params.get("query") ?? "",
      status: status as StudyStatus,
      country: params.get("country") ?? "",
      phase: params.get("phase") ?? "",
      pageToken: params.get("pageToken") ?? undefined,
      pageSize: Math.min(Number(params.get("pageSize") ?? 12), 100)
    });
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upstream request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
