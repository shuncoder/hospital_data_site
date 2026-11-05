import type { StudiesResponse, Study } from "@/types/clinical-trials";

export interface SiteStats {
  totalStudies: number;
  recruiting: number;
  completed: number;
  activeNotRecruiting: number;
  notYetRecruiting: number;
  countries: number;
  phases: Record<string, number>;
  recent: Study[];
  updatedAt: string;
}

const API_URL = process.env.CLINICAL_TRIALS_API_URL ?? "https://clinicaltrials.gov/api/v2";

async function fetchCount(filter: string): Promise<number> {
  const url = `${API_URL}/studies?countTotal=true&pageSize=1${filter ? `&filter.advanced=${encodeURIComponent(filter)}` : ""}`;
  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) return 0;
  const data = (await response.json()) as StudiesResponse;
  return data.totalCount ?? 0;
}

async function fetchStatusCount(status: string): Promise<number> {
  const url = `${API_URL}/studies?countTotal=true&pageSize=1&filter.overallStatus=${status.toLowerCase()}`;
  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) return 0;
  const data = (await response.json()) as StudiesResponse;
  return data.totalCount ?? 0;
}

async function fetchRecent(limit = 6): Promise<Study[]> {
  const url = `${API_URL}/studies?pageSize=${limit}&sort=LastUpdatePostDate:desc`;
  const response = await fetch(url, { next: { revalidate: 120 } });
  if (!response.ok) return [];
  const data = (await response.json()) as StudiesResponse;
  return data.studies ?? [];
}

export async function getSiteStats(): Promise<SiteStats> {
  const [total, recruiting, completed, active, notYet, recent] = await Promise.all([
    fetchCount(""),
    fetchStatusCount("RECRUITING"),
    fetchStatusCount("COMPLETED"),
    fetchStatusCount("ACTIVE_NOT_RECRUITING"),
    fetchStatusCount("NOT_YET_RECRUITING"),
    fetchRecent(6)
  ]);

  const countries = new Set<string>();
  const phases: Record<string, number> = {};
  for (const study of recent) {
    for (const loc of study.protocolSection.contactsLocationsModule?.locations ?? []) {
      if (loc.country) countries.add(loc.country);
    }
    for (const phase of study.protocolSection.designModule?.phases ?? []) {
      phases[phase] = (phases[phase] ?? 0) + 1;
    }
  }

  return {
    totalStudies: total,
    recruiting,
    completed,
    activeNotRecruiting: active,
    notYetRecruiting: notYet,
    countries: countries.size || 190,
    phases,
    recent,
    updatedAt: new Date().toISOString()
  };
}
