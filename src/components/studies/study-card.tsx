import Link from "next/link";
import type { Study } from "@/types/clinical-trials";
import { useLanguage } from "@/components/language-provider";

export function StudyCard({ study }: { study: Study }) {
  const section = study.protocolSection;
  const id = section.identificationModule.nctId;
  const locations = section.contactsLocationsModule?.locations ?? [];
  const phases = section.designModule?.phases ?? [];
  const enrollment = section.designModule?.enrollmentInfo?.count;
  const { t } = useLanguage();

  return (
    <article className="soft-card soft-card-hover group flex h-full flex-col p-6">
      <div className="mb-3 flex items-center justify-between gap-2 text-xs">
        <span className="font-bold text-brand">{id}</span>
        <span className="soft-chip bg-teal-50 text-teal-800">
          {section.statusModule.overallStatus.replaceAll("_", " ")}
        </span>
      </div>
      <h2 className="mb-3 text-lg font-bold leading-7 text-ink">
        <Link href={`/studies/${id}`} className="transition group-hover:text-brand">
          {section.identificationModule.briefTitle}
        </Link>
      </h2>
      <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-600">
        {section.descriptionModule?.briefSummary ?? "—"}
      </p>
      <div className="mt-auto space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
        <p className="flex items-start gap-2">
          <span className="text-slate-400">◉</span>
          <span><b className="text-ink">{t.sponsor}:</b> {section.sponsorCollaboratorsModule?.leadSponsor?.name ?? "N/A"}</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="text-slate-400">⌖</span>
          <span><b className="text-ink">{t.location}:</b> {locations[0]?.country ?? "N/A"}{locations.length > 1 ? ` +${locations.length - 1}` : ""}</span>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {phases.length ? phases.map((phase) => (
              <span key={phase} className="soft-chip bg-cyan-50 text-cyan-800">{phase.replaceAll("_", " ")}</span>
            )) : <span className="soft-chip bg-slate-100 text-slate-500">{t.phase}: N/A</span>}
          </div>
          {enrollment ? (
            <span className="text-xs font-bold text-brand">{enrollment.toLocaleString()} {t.participants}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
