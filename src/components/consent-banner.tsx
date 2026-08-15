"use client";

import { useEffect, useState } from "react";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const STORAGE_KEY = "mihenk:consent";
export type ConsentValue = "accepted" | "declined";

/** Progress adaptöründen bilinçli olarak bağımsız — reklam onayı ilerleme verisi değil. */
export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

function setStoredConsent(value: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event("mihenk:consent-change"));
}

/**
 * Reklam bileşenlerinin (ad-slot, ad-script-loader) onay durumunu okumak
 * için. Sunucu ile ilk istemci render'ı arasında hydration uyuşmazlığı
 * olmasın diye `localStorage` okuması senkron değil bir mikro görevle
 * (Promise.resolve().then) ertelenir — progress-provider.tsx'teki
 * adapter.load().then(...) deseniyle aynı mantık.
 */
export function useConsent(): ConsentValue | null {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (!cancelled) setConsent(getStoredConsent());
    });
    const onChange = () => setConsent(getStoredConsent());
    window.addEventListener("mihenk:consent-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      cancelled = true;
      window.removeEventListener("mihenk:consent-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return consent;
}

export function ConsentBanner({ locale }: { locale: Locale }) {
  const consent = useConsent();

  if (consent !== null) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
        <p className="text-sm text-muted">
          <span className="font-semibold text-text">{ui("consent.title", locale)}</span>{" "}
          {ui("consent.body", locale)}
        </p>
        <div className="flex shrink-0 gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={() => setStoredConsent("declined")}
            className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-muted hover:text-text"
          >
            {ui("consent.decline", locale)}
          </button>
          <button
            type="button"
            onClick={() => setStoredConsent("accepted")}
            className="btn-gold px-4 py-2 text-sm"
          >
            {ui("consent.accept", locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
