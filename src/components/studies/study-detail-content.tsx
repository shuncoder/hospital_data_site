"use client";

import Link from "next/link";
import type { Study } from "@/types/clinical-trials";
import { SiteHeader } from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";

export function StudyDetailContent({ study }: { study: Study }) {
  const { t } = useLanguage();
  const section = study.protocolSection;
  const locations = section.contactsLocationsModule?.locations ?? [];
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <article className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
          <Link href="/search" className="soft-button-ghost">← {t.backResults}</Link>
          <span className="soft-chip bg-teal-100 text-brand">{section.identificationModule.nctId}</span>
          <span className="soft-chip bg-emerald-100 text-emerald-700">
            {section.statusModule.overallStatus.replaceAll("_", " ")}
          </span>
        </div>
        <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-tight text-ink md:text-4xl">
          {section.identificationModule.briefTitle}
        </h1>

        <div className="bento-grid mt-8">
          <section className="soft-card bento-col-8 p-7">
            <h2 className="mb-4 text-xl font-bold text-ink">{t.summary}</h2>
            <p className="whitespace-pre-line leading-8 text-slate-700">
              {section.descriptionModule?.briefSummary ?? "N/A"}
            </p>
          </section>

          <aside className="soft-card bento-col-4 gradient-teal p-6 text-sm">
            <h2 className="border-b border-white/60 pb-4 text-lg font-bold text-teal-950">{t.quickInfo}</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-900/70">{t.sponsor}</p>
                <p className="mt-1 font-bold text-teal-950">{section.sponsorCollaboratorsModule?.leadSponsor?.name ?? "N/A"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-900/70">{t.phase}</p>
                <p className="mt-1 font-bold text-teal-950">{section.designModule?.phases?.join(", ") ?? "N/A"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-900/70">{t.participants}</p>
                <p className="mt-1 font-bold text-teal-950">{section.designModule?.enrollmentInfo?.count?.toLocaleString() ?? "N/A"}</p>
              </div>
            </div>
          </aside>

          <section className="soft-card bento-col-12 p-7">
            <h2 className="mb-5 text-xl font-bold text-ink">{t.timeline}</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-teal-50 p-4">
                <p className="text-xs font-semibold uppercase text-teal-700">{t.start}</p>
                <p className="mt-2 text-lg font-bold text-teal-950">{section.statusModule.startDateStruct?.date ?? "N/A"}</p>
              </div>
              <div className="rounded-2xl bg-cyan-50 p-4">
                <p className="text-xs font-semibold uppercase text-cyan-700">{t.firstPosted}</p>
                <p className="mt-2 text-lg font-bold text-cyan-950">{section.statusModule.studyFirstPostDateStruct?.date ?? "N/A"}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="text-xs font-semibold uppercase text-amber-700">{t.completion}</p>
                <p className="mt-2 text-lg font-bold text-amber-950">{section.statusModule.completionDateStruct?.date ?? "N/A"}</p>
              </div>
            </div>
          </section>

          <section className="soft-card bento-col-12 p-7">
            <h2 className="mb-5 text-xl font-bold text-ink">{t.locations} ({locations.length})</h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {locations.map((location, index) => (
                <li key={`${location.city}-${location.country}-${index}`} className="rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm text-slate-700">
                  <span className="mr-2 text-slate-400">⌖</span>
                  {[location.city, location.state, location.country].filter(Boolean).join(", ") || "N/A"}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
