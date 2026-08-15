"use client";

import Link from "next/link";
import { useProgress } from "@/components/progress-provider";
import { UNLOCK_RATIO } from "@/lib/content";
import { canAccessContent } from "@/lib/entitlements";
import { usePlanInfo } from "@/lib/entitlements-client";
import { ui, type DictKey } from "@/lib/i18n";
import type { Locale, LevelId } from "@/lib/types";

export interface LevelLesson {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  tasks: number;
  xp: number;
  key: string;
  /** true ise bu tek ders premium — bir seviyeye ücretsiz derslerin yanına eklenen bonus ders. */
  premium?: boolean;
}

export interface LevelData {
  id: LevelId;
  title: string;
  description: string;
  lessons: LevelLesson[];
  project?: { slug: string; title: string; hours: number; xp: number };
  /** true ise bu seviye premium (bkz. src/lib/entitlements.ts) — mevcut hiçbir seviyede işaretli değil. */
  premium?: boolean;
}

export function TrackLevels({
  levels,
  trackSlug,
  trackPremium,
  color,
  locale,
}: {
  levels: LevelData[];
  trackSlug: string;
  /** true ise patikanın tamamı premium — tüm seviyeler kilitlenir. */
  trackPremium?: boolean;
  color: string;
  locale: Locale;
}) {
  const { progress, ready } = useProgress();
  const { ready: planReady, ...planInfo } = usePlanInfo();

  const doneIn = (level: LevelData) =>
    level.lessons.filter((lesson) => progress.lessons.includes(lesson.key)).length;

  return (
    <div className="space-y-8">
      {levels.map((level, index) => {
        const done = ready ? doneIn(level) : 0;
        const ratio = level.lessons.length === 0 ? 0 : done / level.lessons.length;

        // İlk seviye herkese açık; sonrakiler önceki seviyenin %70'i bitince açılır.
        const previous = levels[index - 1];
        const previousRatio =
          previous && previous.lessons.length > 0 ? doneIn(previous) / previous.lessons.length : 1;
        const xpLocked = ready && index > 0 && previousRatio < UNLOCK_RATIO;
        const premiumLocked =
          planReady && !canAccessContent({ trackPremium, premium: level.premium }, planInfo);
        const locked = xpLocked || premiumLocked;

        return (
          <section key={level.id} className="card overflow-hidden">
            <header className="border-b border-border p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded border px-2.5 py-1 font-mono text-xs font-bold tracking-wide uppercase"
                  style={{ borderColor: color, color }}
                >
                  {ui(`level.${level.id}` as DictKey, locale)}
                </span>
                <h2 className="text-lg font-bold tracking-tight">{level.title}</h2>
                <span className="ml-auto font-mono text-sm font-medium text-muted tabular-nums">
                  {done} / {level.lessons.length}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{level.description}</p>
              <div className="scale-track mt-4">
                <div
                  className="scale-fill"
                  style={{ ["--fill" as string]: ratio, background: color }}
                />
              </div>
              {premiumLocked ? (
                <p className="mt-3 text-xs text-muted">
                  <Link
                    href={`/${locale}/premium`}
                    className="border-border-strong text-accent inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[11px] font-semibold hover:underline"
                  >
                    {locale === "tr" ? "PREMIUM — bu seviye kilitli" : "PREMIUM — this level is locked"}
                  </Link>
                </p>
              ) : xpLocked ? (
                <p className="mt-3 font-mono text-xs text-muted">{ui("tracks.unlockHint", locale)}</p>
              ) : null}
            </header>

            <ol className="divide-y divide-border">
              {level.lessons.map((lesson, lessonIndex) => {
                const complete = ready && progress.lessons.includes(lesson.key);
                const lessonPremiumLocked =
                  planReady &&
                  !canAccessContent({ trackPremium, premium: level.premium || lesson.premium }, planInfo);
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/${locale}/learn/${trackSlug}/${lesson.slug}`}
                      className={`flex items-start gap-4 p-4 transition hover:bg-surface-2 sm:p-5 ${
                        locked || lessonPremiumLocked ? "opacity-55" : ""
                      }`}
                    >
                      <span
                        className="stamp mt-0.5 shrink-0"
                        data-earned={complete}
                        style={
                          complete
                            ? { borderColor: color, background: color, color: "#04120c" }
                            : { borderColor: `color-mix(in oklab, ${color} 45%, var(--border-strong))`, color }
                        }
                        aria-hidden
                      >
                        {complete ? "✓" : lessonIndex + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 font-semibold">
                          {lesson.title}
                          {lesson.premium && !level.premium ? (
                            <span
                              aria-hidden
                              title={locale === "tr" ? "Premium ders" : "Premium lesson"}
                              className="border-border-strong text-tick rounded border px-1 py-0.5 font-mono text-[9px] tracking-wide"
                            >
                              PRM
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">
                          {lesson.summary}
                        </span>
                        <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted tabular-nums">
                          <span>
                            {lesson.minutes} {ui("lesson.minutes", locale)}
                          </span>
                          {lesson.tasks > 0 ? (
                            <span>
                              {lesson.tasks} {locale === "tr" ? "görev" : "tasks"}
                            </span>
                          ) : null}
                          <span style={{ color }}>+{lesson.xp} XP</span>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>

            {level.project ? (
              <div className="border-t border-border bg-surface-2 p-5 sm:p-6">
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                  {locale === "tr" ? "Seviye projesi" : "Level project"}
                </p>
                <Link
                  href={`/${locale}/projects/${level.project.slug}`}
                  className="mt-2 flex flex-wrap items-center gap-3 font-bold hover:underline"
                >
                  🏗️ {level.project.title}
                  <span className="text-xs font-medium text-muted">
                    ~{level.project.hours} {ui("projects.hours", locale)} · +{level.project.xp} XP
                  </span>
                </Link>
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
