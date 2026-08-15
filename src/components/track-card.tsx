"use client";

import Link from "next/link";
import { useProgress } from "@/components/progress-provider";
import { ProgressRing } from "@/components/ui/progress";
import { canAccessContent } from "@/lib/entitlements";
import { usePlanInfo } from "@/lib/entitlements-client";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export interface TrackCardData {
  slug: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  lessons: number;
  levels: number;
  minutes: number;
  /** Bu patikaya ait ders anahtarları — ilerleme oranı bunlardan hesaplanır. */
  lessonKeys: string[];
  /** true ise patikanın tamamı premium (bkz. src/lib/entitlements.ts) — mevcut hiçbir patikada işaretli değil. */
  premium?: boolean;
}

export function TrackCard({ track, locale }: { track: TrackCardData; locale: Locale }) {
  const { progress, ready } = useProgress();
  const { ready: planReady, ...planInfo } = usePlanInfo();

  const done = ready
    ? track.lessonKeys.filter((key) => progress.lessons.includes(key)).length
    : 0;
  const ratio = track.lessons === 0 ? 0 : done / track.lessons;
  const started = done > 0;
  const premiumLocked = planReady && !canAccessContent({ premium: track.premium }, planInfo);

  return (
    <Link
      href={`/${locale}/learn/${track.slug}`}
      className="card group relative flex flex-col gap-4 overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--track)] hover:shadow-[var(--shadow)] sm:p-6"
      style={{ ["--track" as string]: track.color }}
    >
      {/* Üstte patika renginde incecik ışık çizgisi — sadece hover'da belirir. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--track)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ring-1 transition duration-300 group-hover:scale-105 ring-[color:color-mix(in_oklab,var(--track)_35%,transparent)]"
          style={{ backgroundColor: `color-mix(in oklab, ${track.color} 16%, transparent)` }}
        >
          {track.icon}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-1.5 text-lg font-bold tracking-tight">
            {track.name}
            {premiumLocked ? (
              <span
                aria-hidden
                title={locale === "tr" ? "Bu patika Premium" : "This track is Premium"}
                className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[11px] text-accent"
              >
                💎
              </span>
            ) : null}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{track.tagline}</p>
        </div>
        {started ? (
          <ProgressRing value={ratio} size={44} stroke={4} color={track.color} />
        ) : null}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
        <span>
          {track.lessons} {ui("tracks.lessonCount", locale)}
        </span>
        <span>
          {track.levels} {ui("tracks.levelCount", locale)}
        </span>
        <span>~{Math.round(track.minutes / 60)} {locale === "tr" ? "saat" : "hours"}</span>
        <span
          className="ml-auto font-semibold transition group-hover:translate-x-0.5"
          style={{ color: track.color }}
        >
          {ratio >= 1
            ? ui("tracks.completed", locale)
            : started
              ? ui("tracks.continue", locale)
              : ui("tracks.start", locale)}{" "}
          →
        </span>
      </div>
    </Link>
  );
}
