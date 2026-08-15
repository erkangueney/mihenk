"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar/avatar";
import { BrandLockup } from "@/components/brand";
import {
  IconBook,
  IconClipboard,
  IconClose,
  IconCompass,
  IconMenu,
  IconPlay,
} from "@/components/ui/icons";
import { levelInfo } from "@/lib/gamification";
import { locales, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { useProgress } from "./progress-provider";
import { ThemeToggle } from "./theme-toggle";
import { AccountMenu, AccountMobileLinks } from "./auth/account-menu";

interface NavItem {
  href: string;
  key: Parameters<typeof ui>[0];
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/learn", key: "nav.learn" },
  { href: "/projects", key: "nav.projects" },
  { href: "/roadmap", key: "nav.roadmap" },
  { href: "/leaderboard", key: "nav.leaderboard" },
  { href: "/premium", key: "nav.premium" },
];

/**
 * Ders akışından bağımsız başvuru bölümleri.
 *
 * Dördü de tek tek üst çubuğa sığmadığı için "Alet Çantası" başlığı altında
 * toplanıyor; mobil menüde ise düz liste olarak açılıyor.
 */
const toolboxItems: NavItem[] = [
  { href: "/reference", key: "nav.reference", icon: IconBook },
  { href: "/how-to", key: "nav.howTo", icon: IconCompass },
  { href: "/cheatsheets", key: "nav.cheatsheets", icon: IconClipboard },
  { href: "/playground", key: "nav.playground", icon: IconPlay },
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

          {/* Alet çantası: hover ve klavye odağıyla açılan menü. `group` +
              focus-within sayesinde JS durumu tutmaya gerek kalmıyor. */}
          <div className="group relative">
            <Link
              href={withLocale("/reference")}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                toolboxItems.some((item) => isActive(item.href))
                  ? "bg-surface-2 text-text"
                  : "text-muted hover:bg-surface-2 hover:text-text"
              }`}
            >
              {ui("nav.toolbox", locale)}
              <span aria-hidden className="text-[10px]">
                ▾
              </span>
            </Link>
            <div className="invisible absolute top-full left-0 w-60 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="card overflow-hidden p-1.5 shadow-[var(--shadow)]">
                {toolboxItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={withLocale(item.href)}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive(item.href)
                          ? "bg-surface-2 text-text"
                          : "text-muted hover:bg-surface-2 hover:text-text"
                      }`}
                    >
                      {item.icon ? <item.icon size={17} className="shrink-0 text-accent" /> : null}
                      {ui(item.key, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* XP rozeti — ilerleme okunmadan gösterilmez, aksi halde 0 XP titrer.
              Avatar da buradan görünür: her sayfada kullanıcının kendisi. */}
          {ready && progress.xp > 0 ? (
            <Link
              href={withLocale("/avatar")}
              className="hidden items-center gap-2 rounded-full border border-accent/30 bg-surface-2 py-1 pr-3 pl-1 text-xs font-semibold transition hover:border-accent/60 sm:flex"
            >
              <span className="relative">
                <Avatar state={progress.avatar} size={28} animated={false} />
                <span className="absolute -right-1 -bottom-1 grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-accent-2 to-accent text-[9px] font-black text-on-accent">
                  {info.level}
                </span>
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
            {open ? <IconClose size={18} /> : <IconMenu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-bg md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3">
            {[
              ...navItems,
              { href: "/avatar", key: "nav.avatar" as const },
              { href: "/profile", key: "nav.profile" as const },
            ].map((item) => (
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

            <p className="mt-3 px-3 text-xs font-semibold tracking-wide text-muted uppercase">
              {ui("nav.toolbox", locale)}
            </p>
            {toolboxItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(item.href)}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-3 text-base font-medium transition ${
                  isActive(item.href) ? "bg-surface-2 text-text" : "text-muted"
                }`}
              >
                {item.icon ? <item.icon size={18} className="shrink-0 text-accent" /> : null}
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
