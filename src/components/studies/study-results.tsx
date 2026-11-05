"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import type { StudiesResponse } from "@/types/clinical-trials";
import { StudyCard } from "./study-card";
import { useLanguage } from "@/components/language-provider";

export function StudyResults() {
  const params = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  const query = params.toString();
  const { data, isLoading, isError, isFetching } = useQuery<StudiesResponse>({
    queryKey: ["studies", query],
    queryFn: async () => {
      const response = await fetch(`/api/studies?${query}`);
      if (!response.ok) throw new Error("Không thể tải dữ liệu");
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-72 animate-pulse rounded-3xl bg-white/60 shadow-soft" />
        ))}
      </div>
    );
  }
  if (isError) return <p className="soft-card p-5 text-rose-600">{t.error}</p>;
  if (!data?.studies.length) return <p className="soft-card p-10 text-center text-slate-500">{t.noResults}</p>;

  return (
    <>
      <div className="mb-5 flex items-center justify-between text-sm text-slate-600">
        <span>
          {t.resultsCount} <b className="text-ink">{data.studies.length}</b> {t.studies}
          {data.totalCount ? ` / ${data.totalCount.toLocaleString()}` : ""}
        </span>
        <span className="soft-pill">{t.source}</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {data.studies.map((study) => (
          <StudyCard key={study.protocolSection.identificationModule.nctId} study={study} />
        ))}
      </div>
      {data.nextPageToken && (
        <p className="mt-8 text-center">
          <button
            className="soft-button"
            disabled={isFetching}
            onClick={() => {
              const next = new URLSearchParams(params.toString());
              next.set("pageToken", data.nextPageToken ?? "");
              router.push(`/search?${next.toString()}`);
            }}
          >
            {isFetching ? t.loading : t.loadMore}
          </button>
        </p>
      )}
    </>
  );
}
