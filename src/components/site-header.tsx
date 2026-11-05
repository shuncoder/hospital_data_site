"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader({ active }: { active?: "home" | "search" | "dashboard" }) {
  const { t } = useLanguage();
  const linkClass = (key: string) =>
    `rounded-xl px-4 py-2 text-sm font-semibold transition ${
      active === key ? "bg-teal-50 text-brand" : "text-slate-600 hover:bg-white/70 hover:text-brand"
    }`;
  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-400 text-lg font-black text-white shadow-soft">+</span>
          <span className="text-lg font-black tracking-tight text-ink">
            Clinical Trials <span className="text-brand">Explorer</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link href="/search" className={linkClass("search")}>{t.navSearch}</Link>
          <Link href="/dashboard" className={linkClass("dashboard")}>{t.dashboard}</Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
