"use client";

import { AdSlot } from "@/components/ads/ad-slot";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

/** Kaç derste bir ara ekran gösterilir (ücretsiz kullanıcı). */
export const LESSON_INTERSTITIAL_EVERY = 4;

/**
 * Ders tamamlandıktan sonra, sonraki derse geçmeden önce ayrı bir "devam et"
 * adımı. "Devam et" reklam yüklenmese/gösterilmese bile her zaman aktiftir —
 * atlatılamaz reklam yok ilkesi.
 */
export function LessonInterstitial({
  locale,
  onContinue,
}: {
  locale: Locale;
  onContinue: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 p-4 backdrop-blur-xl">
      <div className="card w-full max-w-md space-y-4 p-6 text-center">
        <p className="font-bold">{ui("lesson.interstitial.title", locale)}</p>
        <AdSlot placement="lesson-interstitial" className="min-h-[100px]" />
        <button type="button" onClick={onContinue} className="btn-gold w-full">
          {ui("lesson.interstitial.continue", locale)}
        </button>
      </div>
    </div>
  );
}
