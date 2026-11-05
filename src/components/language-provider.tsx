"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getTranslations, type Language, languages } from "@/lib/i18n";

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({
  language: "vi", setLanguage: () => undefined
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi");
  useEffect(() => {
    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    const storedLanguage = window.localStorage.getItem("clinical-trials-language");
    const nextLanguage = queryLanguage && queryLanguage in languages ? queryLanguage as Language : storedLanguage && storedLanguage in languages ? storedLanguage as Language : "vi";
    setLanguageState(nextLanguage);
  }, []);
  function setLanguage(next: Language) {
    setLanguageState(next);
    window.localStorage.setItem("clinical-trials-language", next);
  }
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const { language, setLanguage } = useContext(LanguageContext);
  return { language, setLanguage, t: getTranslations(language) };
}
