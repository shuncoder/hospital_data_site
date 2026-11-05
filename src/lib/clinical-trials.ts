import type { StudiesResponse, Study, StudySearchParams } from "@/types/clinical-trials";

const API_URL = process.env.CLINICAL_TRIALS_API_URL ?? "https://clinicaltrials.gov/api/v2";

export function getStudyTitle(study: Study) {
  return study.protocolSection.identificationModule.briefTitle;
}

export function getStudyStatus(study: Study) {
  return study.protocolSection.statusModule.overallStatus;
}

export async function searchStudies(params: StudySearchParams): Promise<StudiesResponse> {
  const search = new URLSearchParams();
  search.set("pageSize", String(params.pageSize ?? 12));
  if (params.query) search.set("query.term", params.query);
  if (params.status) search.set("filter.overallStatus", params.status.toLowerCase());
  const advancedFilters = [
    params.country ? `AREA[LocationCountry]${params.country}` : "",
    params.phase ? `AREA[Phase]${params.phase}` : ""
  ].filter(Boolean);
  if (advancedFilters.length) search.set("filter.advanced", advancedFilters.join(" AND "));
  if (params.pageToken) search.set("pageToken", params.pageToken);

  const response = await fetch(`${API_URL}/studies?${search.toString()}`, {
    next: { revalidate: 60 }
  });
  if (!response.ok) {
    throw new Error(`ClinicalTrials.gov returned ${response.status}`);
  }
  return response.json() as Promise<StudiesResponse>;
}

export async function getStudy(nctId: string): Promise<Study> {
  const response = await fetch(`${API_URL}/studies/${encodeURIComponent(nctId)}`, {
    next: { revalidate: 300 }
  });
  if (response.status === 404) throw new Error("Study not found");
  if (!response.ok) throw new Error(`ClinicalTrials.gov returned ${response.status}`);
  return response.json() as Promise<Study>;
}
