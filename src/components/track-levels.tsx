"use client";

import Link from "next/link";
import { useProgress } from "@/components/progress-provider";
import { ProgressBar } from "@/components/ui/progress";
import { UNLOCK_RATIO } from "@/lib/content";
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
}

export interface LevelData {
  id: LevelId;
  title: string;
  description: string;
  lessons: LevelLesson[];
  project?: { slug: string; title: string; hours: number; xp: number };
}

export function TrackLevels({
  levels,
  trackSlug,
  color,
  locale,
}: {
  levels: LevelData[];
  trackSlug: string;
  color: string;
  locale: Locale;
}) {
  const { progress, ready } = useProgress();

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
        const locked = ready && index > 0 && previousRatio < UNLOCK_RATIO;

        return (
          <section key={level.id} className="card overflow-hidden">
            <header className="border-b border-border p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    backgroundColor: `color-mix(in oklab, ${color} 20%, transparent)`,
                    color,
                  }}
                >
                  {ui(`level.${level.id}` as DictKey, locale)}
                </span>
                <h2 className="text-lg font-bold tracking-tight">{level.title}</h2>
                <span className="ml-auto text-sm font-medium text-muted">
                  {done} / {level.lessons.length}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{level.description}</p>
              <ProgressBar value={ratio} className="mt-4" />
              {locked ? (
                <p className="mt-3 text-xs text-muted">🔒 {ui("tracks.unlockHint", locale)}</p>
              ) : null}
            </header>

            <ol className="divide-y divide-border">
              {level.lessons.map((lesson, lessonIndex) => {
                const complete = ready && progress.lessons.includes(lesson.key);
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/${locale}/learn/${trackSlug}/${lesson.slug}`}
                      className={`flex items-start gap-4 p-4 transition hover:bg-surface-2 sm:p-5 ${
                        locked ? "opacity-55" : ""
                      }`}
                    >
                      <span
                        className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: complete
                            ? "var(--success)"
                            : `color-mix(in oklab, ${color} 16%, transparent)`,
                          color: complete ? "#04120c" : color,
                        }}
                        aria-hidden
                      >
                        {complete ? "✓" : lessonIndex + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{lesson.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted">
                          {lesson.summary}
                        </span>
                        <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                          <span>
                            ⏱ {lesson.minutes} {ui("lesson.minutes", locale)}
                          </span>
                          {lesson.tasks > 0 ? (
                            <span>
                              🎯 {lesson.tasks} {locale === "tr" ? "görev" : "tasks"}
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
