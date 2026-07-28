"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOutAction } from "@/lib/auth/actions";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { useSession } from "./session-provider";

/** Ada göre baş harf(ler) — avatar yerine. */
function initials(name: string, email: string): string {
  const source = name.trim() || email.split("@")[0] || "?";
  const parts = source.split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[1][0] : source.slice(0, 2);
  return letters.toUpperCase();
}

/**
 * Başlıktaki hesap alanı.
 *
 * Supabase kapalıysa eski davranışı korur (düz "Profilim" butonu), böylece
 * anahtarsız kurulumda arayüz hiç değişmez.
 */
export function AccountMenu({ locale }: { locale: Locale }) {
  const { user, ready, enabled } = useSession();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!enabled) {
    return (
      <Link href={`/${locale}/profile`} className="btn-gold hidden h-9 px-4 text-sm md:flex">
        {ui("nav.profile", locale)}
      </Link>
    );
  }

  // Oturum okunurken buton yerine aynı boyutta bir yer tutucu: düzen zıplamasın.
  if (!ready) {
    return <div className="hidden h-9 w-24 animate-pulse rounded-lg bg-surface-2 md:block" />;
  }

  if (!user) {
    return (
      <div className="hidden items-center gap-2 md:flex">
        <Link
          href={`/${locale}/giris`}
          className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-text"
        >
          {ui("auth.signIn", locale)}
        </Link>
        <Link href={`/${locale}/kayit`} className="btn-gold h-9 px-4 text-sm">
          {ui("auth.signUp", locale)}
        </Link>
      </div>
    );
  }

  return (
    <div ref={boxRef} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex h-9 items-center gap-2 rounded-lg border border-border bg-surface-2 pr-3 pl-1.5 text-sm font-semibold transition hover:border-border-strong"
      >
        <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-accent-2 to-accent text-[10px] font-black text-on-accent">
          {initials(user.displayName, user.email)}
        </span>
        <span className="max-w-[9rem] truncate">{user.displayName || user.email}</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow)]"
        >
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-semibold">
              {user.displayName || ui("auth.member", locale)}
            </p>
            <p className="truncate text-xs text-muted">{user.email}</p>
            {user.role === "admin" ? (
              <span className="mt-2 inline-block rounded-md bg-accent/15 px-1.5 py-0.5 text-[10px] font-bold text-accent uppercase">
                {ui("auth.admin", locale)}
              </span>
            ) : null}
          </div>

          <div className="p-1.5">
            <Link
              href={`/${locale}/profile`}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-surface-2 hover:text-text"
            >
              {ui("nav.profile", locale)}
            </Link>

            {user.role === "admin" ? (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-accent transition hover:bg-surface-2"
              >
                {ui("auth.adminPanel", locale)}
              </Link>
            ) : null}

            <form action={signOutAction}>
              <button
                type="submit"
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-muted transition hover:bg-surface-2 hover:text-danger"
              >
                {ui("auth.signOut", locale)}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Mobil menüdeki hesap satırları. */
export function AccountMobileLinks({
  locale,
  onNavigate,
}: {
  locale: Locale;
  onNavigate: () => void;
}) {
  const { user, ready, enabled } = useSession();
  if (!enabled || !ready) return null;

  const linkClass = "rounded-lg px-3 py-3 text-base font-medium text-muted transition";

  if (!user) {
    return (
      <>
        <Link href={`/${locale}/giris`} onClick={onNavigate} className={linkClass}>
          {ui("auth.signIn", locale)}
        </Link>
        <Link
          href={`/${locale}/kayit`}
          onClick={onNavigate}
          className={`${linkClass} font-semibold text-accent`}
        >
          {ui("auth.signUp", locale)}
        </Link>
      </>
    );
  }

  return (
    <>
      {user.role === "admin" ? (
        <Link
          href="/admin"
          onClick={onNavigate}
          className={`${linkClass} font-semibold text-accent`}
        >
          {ui("auth.adminPanel", locale)}
        </Link>
      ) : null}
      <form action={signOutAction}>
        <button type="submit" className={`${linkClass} w-full text-left`}>
          {ui("auth.signOut", locale)} ({user.displayName || user.email})
        </button>
      </form>
    </>
  );
}
