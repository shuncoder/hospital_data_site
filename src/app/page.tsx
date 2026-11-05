"use client";

import Link from "next/link";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SearchForm } from "@/components/search/search-form";
import { useLanguage } from "@/components/language-provider";

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen">
      <SiteHeader active="home" />
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10">
        <div className="bento-grid">
          <article className="soft-card soft-card-lg bento-col-8 overflow-hidden p-8 md:p-10">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal-200/40 blur-3xl" />
            <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-cyan-200/40 blur-3xl" />
            <div className="relative">
              <span className="soft-pill text-brand">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                {t.openData}
              </span>
              <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight text-ink md:text-5xl">
                {t.heroTitle} <span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">{t.heroAccent}</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{t.heroDescription}</p>
              <div className="mt-7 max-w-2xl">
                <Suspense fallback={<div className="h-24 rounded-3xl bg-white/60" />}>
                  <SearchForm />
                </Suspense>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                <span className="soft-chip bg-white/70">✓ {t.updated}</span>
                <span className="soft-chip bg-white/70">✓ {t.advancedFilters}</span>
                <span className="soft-chip bg-white/70">✓ {t.noRegistration}</span>
              </div>
            </div>
          </article>

          <article className="soft-card bento-col-4 gradient-teal p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-900/70">{t.recruiting}</p>
            <p className="mt-3 text-5xl font-black text-teal-900">68%</p>
            <div className="mt-4 h-2 rounded-full bg-white/70">
              <div className="h-2 w-[68%] rounded-full bg-teal-700" />
            </div>
            <p className="mt-4 text-sm text-teal-900/80">{t.recruiting} · ClinicalTrials.gov</p>
            <Link href="/search?status=RECRUITING" className="soft-button-ghost mt-6 w-full justify-center bg-white/80 text-teal-800">
              {t.searchStudies} →
            </Link>
          </article>

          <article className="soft-card bento-col-3 gradient-violet p-6">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-xl">🌍</div>
            <p className="mt-5 text-4xl font-black text-violet-900">190+</p>
            <p className="mt-1 text-xs font-semibold text-violet-800/80">{t.participatingCountries}</p>
          </article>

          <article className="soft-card bento-col-3 gradient-amber p-6">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/70 text-xl">◈</div>
            <p className="mt-5 text-4xl font-black text-amber-900">4</p>
            <p className="mt-1 text-xs font-semibold text-amber-800/80">{t.allPhases}</p>
          </article>

          <article className="soft-card bento-col-3 p-6">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-xl text-brand">⌕</div>
            <h2 className="mt-5 font-bold text-ink">{t.searchSmart}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{t.searchSmartDesc}</p>
          </article>

          <article className="soft-card bento-col-3 p-6">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-50 text-xl text-cyan-700">✓</div>
            <h2 className="mt-5 font-bold text-ink">{t.trustedData}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{t.trustedDataDesc}</p>
          </article>

          <article className="soft-card bento-col-6 gradient-cyan p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-900/70">{t.trends}</p>
                <h2 className="mt-2 text-2xl font-black text-cyan-950">{t.trendsDesc}</h2>
              </div>
              <Link href="/dashboard" className="soft-button-ghost bg-white/80 text-cyan-900">
                {t.dashboard} →
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-4 items-end gap-2">
              {[40, 70, 55, 90].map((height, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-xl bg-gradient-to-t from-cyan-600/80 to-cyan-300/80" style={{ height }} />
                  <span className="text-[10px] font-bold text-cyan-900/70">P{index + 1}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="soft-card bento-col-6 gradient-ink p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-200/80">Live API</p>
            <h2 className="mt-2 text-2xl font-black">ClinicalTrials.gov v2</h2>
            <p className="mt-3 text-sm leading-6 text-teal-50/80">
              {t.trustedDataDesc}
            </p>
            <div className="mt-6 grid gap-2 text-xs">
              <code className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur">GET /api/studies?query=cancer</code>
              <code className="rounded-xl bg-white/10 px-3 py-2 backdrop-blur">GET /api/stats</code>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
