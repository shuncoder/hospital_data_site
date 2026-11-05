"use client";

import Link from "next/link";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SearchForm } from "@/components/search/search-form";
import { StudyResults } from "@/components/studies/study-results";
import { useLanguage } from "@/components/language-provider";

export default function SearchPage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen">
      <SiteHeader active="search" />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-sm font-bold uppercase tracking-wider text-brand">{t.researchLibrary}</p>
        <h1 className="mb-6 mt-2 text-3xl font-black tracking-tight text-ink md:text-4xl">{t.searchResults}</h1>
        <Suspense fallback={<div className="h-24 rounded-3xl bg-white/60" />}>
          <SearchForm />
        </Suspense>
        <div className="mt-8">
          <Suspense fallback={<p className="soft-card p-10 text-center text-slate-500">{t.loadingData}</p>}>
            <StudyResults />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
