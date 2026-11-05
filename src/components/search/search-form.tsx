"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/language-provider";

export function SearchForm() {
  const router = useRouter();
  const current = useSearchParams();
  const [query, setQuery] = useState(current.get("query") ?? "");
  const [status, setStatus] = useState(current.get("status") ?? "");
  const [country, setCountry] = useState(current.get("country") ?? "");
  const [phase, setPhase] = useState(current.get("phase") ?? "");
  const { t } = useLanguage();

  function submit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("query", query.trim());
    if (status) params.set("status", status);
    if (country) params.set("country", country);
    if (phase) params.set("phase", phase);
    router.push(`/search?${params.toString()}`);
  }

  function reset() {
    setQuery(""); setStatus(""); setCountry(""); setPhase("");
    router.push("/search");
  }

  return (
    <form onSubmit={submit} className="soft-card soft-card-lg p-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-3.5 text-lg text-slate-400">⌕</span>
          <input
            className="soft-input pl-11"
            placeholder="Example: breast cancer, diabetes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="soft-button md:px-7" type="submit">{t.searchStudies}</button>
      </div>
      <div className="mt-3 grid gap-3 border-t border-slate-100 pt-3 sm:grid-cols-3">
        <select aria-label={t.allStatuses} className="soft-input" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">{t.allStatuses}</option>
          <option value="RECRUITING">Recruiting</option>
          <option value="NOT_YET_RECRUITING">Not yet recruiting</option>
          <option value="COMPLETED">Completed</option>
          <option value="ACTIVE_NOT_RECRUITING">Active, not recruiting</option>
        </select>
        <input className="soft-input" placeholder={t.countryPlaceholder} value={country} onChange={(e) => setCountry(e.target.value)} />
        <select aria-label={t.allPhases} className="soft-input" value={phase} onChange={(e) => setPhase(e.target.value)}>
          <option value="">{t.allPhases}</option>
          <option value="PHASE1">Phase 1</option>
          <option value="PHASE2">Phase 2</option>
          <option value="PHASE3">Phase 3</option>
          <option value="PHASE4">Phase 4</option>
        </select>
      </div>
      <button type="button" onClick={reset} className="mt-3 text-left text-xs font-semibold text-slate-400 transition hover:text-brand">
        {t.clearFilters}
      </button>
    </form>
  );
}
