"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/site-header";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { useLanguage } from "@/components/language-provider";
import type { SiteStats } from "@/lib/stats";

function formatNumber(value: number | undefined) {
  if (!value && value !== 0) return "—";
  return value.toLocaleString();
}

function MetricCard({
  label,
  value,
  delta,
  tone = "default",
  icon
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "default" | "teal" | "violet" | "amber" | "cyan";
  icon: string;
}) {
  const toneClass = {
    default: "",
    teal: "gradient-teal",
    violet: "gradient-violet",
    amber: "gradient-amber",
    cyan: "gradient-cyan"
  }[tone];
  return (
    <article className={`soft-card soft-card-hover p-6 ${toneClass}`}>
      <div className="flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-xl">{icon}</div>
        {delta && <span className="soft-chip bg-white/70 text-emerald-700">{delta}</span>}
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-600">{label}</p>
      <p className="mt-1 text-3xl font-black text-ink">{value}</p>
    </article>
  );
}

export default function DashboardPage() {
  const { t } = useLanguage();
  const { data, isLoading } = useQuery<SiteStats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("stats failed");
      return response.json();
    },
    staleTime: 5 * 60_000
  });

  return (
    <main className="min-h-screen">
      <SiteHeader active="dashboard" />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand">{t.researchCenter}</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-ink md:text-4xl">{t.dashboardTitle}</h1>
            <p className="mt-3 max-w-2xl text-slate-600">{t.dashboardDesc}</p>
          </div>
          <span className="soft-pill text-slate-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {data ? new Date(data.updatedAt).toLocaleString() : t.lastUpdated}
          </span>
        </div>

        <div className="bento-grid mt-8">
          <div className="bento-col-3">
            <MetricCard icon="📊" label={t.totalStudies} value={isLoading ? "…" : formatNumber(data?.totalStudies)} delta="↑ 8.4%" tone="teal" />
          </div>
          <div className="bento-col-3">
            <MetricCard icon="🟢" label={t.recruiting} value={isLoading ? "…" : formatNumber(data?.recruiting)} delta="+12.6%" />
          </div>
          <div className="bento-col-3">
            <MetricCard icon="🌍" label={t.participatingCountries} value={isLoading ? "…" : formatNumber(data?.countries)} tone="cyan" />
          </div>
          <div className="bento-col-3">
            <MetricCard icon="✨" label={t.newThisMonth} value={isLoading ? "…" : formatNumber(data?.notYetRecruiting)} delta="↑ 5.2%" tone="amber" />
          </div>

          <div className="bento-col-12">
            <DashboardCharts />
          </div>

          <article className="soft-card bento-col-8 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">{t.recentActivity}</h2>
              <Link href="/search" className="soft-button-ghost">{t.navSearch} →</Link>
            </div>
            {isLoading ? (
              <div className="grid gap-3 md:grid-cols-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-24 animate-pulse rounded-2xl bg-slate-100" />
                ))}
              </div>
            ) : (
              <ul className="grid gap-3 md:grid-cols-2">
                {(data?.recent ?? []).slice(0, 6).map((study) => {
                  const id = study.protocolSection.identificationModule.nctId;
                  const title = study.protocolSection.identificationModule.briefTitle;
                  const status = study.protocolSection.statusModule.overallStatus.replaceAll("_", " ");
                  return (
                    <li key={id}>
                      <Link href={`/studies/${id}`} className="soft-card soft-card-hover block p-4">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-bold text-brand">{id}</span>
                          <span className="soft-chip bg-teal-50 text-teal-700">{status}</span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm font-semibold text-ink">{title}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </article>

          <article className="soft-card bento-col-4 gradient-violet p-6">
            <h2 className="text-lg font-bold text-violet-950">{t.byPhase}</h2>
            <p className="mt-1 text-xs text-violet-900/70">{t.trends}</p>
            <ul className="mt-5 space-y-3">
              {Object.entries(
                (data?.recent ?? [])
                  .flatMap((s) => s.protocolSection.designModule?.phases ?? [])
                  .reduce<Record<string, number>>((acc, phase) => {
                    acc[phase] = (acc[phase] ?? 0) + 1;
                    return acc;
                  }, {})
              ).map(([phase, count]) => (
                <li key={phase} className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-violet-900">
                  <span>{phase.replaceAll("_", " ")}</span>
                  <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs">{count}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </main>
  );
}
