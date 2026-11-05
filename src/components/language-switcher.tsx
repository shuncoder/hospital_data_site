"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { languages, type Language } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  function changeLanguage(next: Language) {
    setLanguage(next);
    const nextParams = new URLSearchParams(window.location.search);
    nextParams.set("lang", next);
    router.replace(`${pathname}?${nextParams.toString()}`);
  }

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <label className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-2.5 py-1.5 text-sm shadow-soft backdrop-blur">
      <span>{languages[language].flag}</span>
      <select
        aria-label="Language"
        className="bg-transparent font-semibold text-slate-700 outline-none"
        value={language}
        onChange={(event) => changeLanguage(event.target.value as Language)}
      >
        {Object.entries(languages).map(([code, item]) => (
          <option key={code} value={code}>{item.label}</option>
        ))}
      </select>
    </label>
  );
}
