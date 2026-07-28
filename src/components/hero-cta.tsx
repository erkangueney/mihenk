"use client";

import Link from "next/link";
import { useProgress } from "@/components/progress-provider";
import { levelInfo, currentStreak } from "@/lib/gamification";
import { ProgressBar } from "@/components/ui/progress";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export interface ResumeTarget {
  trackSlug: string;
  trackName: string;
  lessonSlug: string;
  lessonTitle: string;
  /** Bu dersten önce tamamlanması beklenen ders anahtarları (sıralı). */
  order: { key: string; trackSlug: string; lessonSlug: string; trackName: string; title: string }[];
}

/**
 * Ana sayfadaki eylem düğmesi. İlerleme okunana kadar "başla" gösterilir;
 * okunduktan sonra kullanıcının kaldığı derse yönlendirir.
 */
export function HeroCta({ locale, resume }: { locale: Locale; resume: ResumeTarget }) {
  const { progress, ready } = useProgress();

  // Kullanıcının tamamlamadığı ilk ders — varsayılan sıraya göre.
  const next = ready
    ? (resume.order.find((item) => !progress.lessons.includes(item.key)) ?? null)
    : null;

  const started = ready && progress.lessons.length > 0;
  const target = next ?? {
    trackSlug: resume.trackSlug,
    lessonSlug: resume.lessonSlug,
    trackName: resume.trackName,
    title: resume.lessonTitle,
  };

  const info = levelInfo(progress.xp);
  const streak = currentStreak(progress.activeDays);

  return (
    <div className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href={`/${locale}/learn/${target.trackSlug}/${target.lessonSlug}`}
          className="btn-gold px-7 py-3.5 text-base"
        >
          {started ? ui("home.cta.continue", locale) : ui("home.cta.start", locale)}
          <span aria-hidden>→</span>
        </Link>
        <Link href={`/${locale}/roadmap`} className="btn-ghost px-7 py-3.5 text-base">
          {ui("home.cta.roadmap", locale)}
        </Link>
      </div>

      {started ? (
        <div className="card max-w-lg p-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold">
              {ui("xp.level", locale)} {info.level}
            </span>
            <span className="text-muted">
              {progress.xp.toLocaleString(locale)} XP
              {streak > 0 ? ` · 🔥 ${streak} ${ui("streak.days", locale)}` : ""}
            </span>
          </div>
          <ProgressBar value={info.ratio} className="mt-2.5" />
          <p className="mt-2.5 truncate text-xs text-muted">
            {target.trackName} · {target.title}
          </p>
        </div>
      ) : null}
    </div>
  );
}
