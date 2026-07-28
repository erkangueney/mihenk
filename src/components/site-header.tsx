"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/brand";
import { levelInfo } from "@/lib/gamification";
import { locales, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { useProgress } from "./progress-provider";
import { ThemeToggle } from "./theme-toggle";
import { AccountMenu, AccountMobileLinks } from "./auth/account-menu";

interface NavItem {
  href: string;
  key: Parameters<typeof ui>[0];
}

const navItems: NavItem[] = [
  { href: "/learn", key: "nav.learn" },
  { href: "/projects", key: "nav.projects" },
  { href: "/roadmap", key: "nav.roadmap" },
  { href: "/leaderboard", key: "nav.leaderboard" },
];

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { progress, ready } = useProgress();
  const info = levelInfo(progress.xp);

  // Menü açıkken arkadaki sayfa kaymasın.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const withLocale = (href: string) => `/${locale}${href}`;
  const isActive = (href: string) => pathname.startsWith(`/${locale}${href}`);

  /** Aktif sayfayı koruyarak dili değiştirir: /tr/learn/sql -> /en/learn/sql */
  const swapLocale = (next: Locale) => {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href={withLocale("")} className="flex shrink-0 items-center gap-2.5">
          <BrandLockup size={32} hideWordmark />
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLocale(item.href)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-surface-2 text-text"
                  : "text-muted hover:bg-surface-2 hover:text-text"
              }`}
            >
              {ui(item.key, locale)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* XP rozeti — ilerleme okunmadan gösterilmez, aksi halde 0 XP titrer. */}
          {ready && progress.xp > 0 ? (
            <Link
              href={withLocale("/profile")}
              className="hidden items-center gap-2 rounded-full border border-accent/30 bg-surface-2 py-1.5 pr-3 pl-2 text-xs font-semibold transition hover:border-accent/60 sm:flex"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-accent-2 to-accent text-[10px] font-black text-on-accent">
                {info.level}
              </span>
              <span>{progress.xp.toLocaleString(locale)} XP</span>
            </Link>
          ) : null}

          <div className="hidden items-center rounded-lg border border-border bg-surface-2 p-0.5 sm:flex">
            {locales.map((code) => (
              <Link
                key={code}
                href={swapLocale(code)}
                className={`rounded-md px-2 py-1 text-xs font-semibold uppercase transition ${
                  code === locale ? "bg-accent text-on-accent" : "text-muted hover:text-text"
                }`}
              >
                {code}
              </Link>
            ))}
          </div>

          <ThemeToggle />

          <AccountMenu locale={locale} />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? ui("nav.close", locale) : ui("nav.menu", locale)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2 md:hidden"
          >
            <span aria-hidden className="text-lg leading-none">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-bg md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3">
            {[...navItems, { href: "/profile", key: "nav.profile" as const }].map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href)}
                // Gezinme sonrası menü açık kalmasın; efektle kapatmak yerine
                // olayın kaynağında kapatıyoruz.
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium transition ${
                  isActive(item.href) ? "bg-surface-2 text-text" : "text-muted"
                }`}
              >
                {ui(item.key, locale)}
              </Link>
            ))}
            <AccountMobileLinks locale={locale} onNavigate={() => setOpen(false)} />
            <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
              {locales.map((code) => (
                <Link
                  key={code}
                  href={swapLocale(code)}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold uppercase ${
                    code === locale ? "bg-accent text-on-accent" : "bg-surface-2 text-muted"
                  }`}
                >
                  {code}
                </Link>
              ))}
              {ready && progress.xp > 0 ? (
                <span className="ml-auto text-sm font-semibold text-muted">
                  {ui("xp.level", locale)} {info.level} · {progress.xp.toLocaleString(locale)} XP
                </span>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
