"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useProgress } from "@/components/progress-provider";
import { CodeCard } from "@/components/ui/code-view";
import { Markdown } from "@/components/ui/markdown";
import { ProgressBar } from "@/components/ui/progress";
import { t, ui } from "@/lib/i18n";
import { LESSON_BONUS_XP, taskKeyOf } from "@/lib/content";
import type { Block, Lesson, Locale } from "@/lib/types";
import { ExerciseBlock } from "./exercise-block";
import { OrderBlock } from "./order-block";
import { QuizBlock } from "./quiz-block";

/** Ders sayfasına tüm patika ağacını taşımaya gerek yok; sadece kimliği yeter. */
interface TrackRef {
  slug: string;
  name: string;
}

const calloutStyles: Record<string, { border: string; bg: string; icon: string }> = {
  tip: { border: "border-[var(--success)]/40", bg: "bg-[var(--success)]/10", icon: "💡" },
  warning: { border: "border-[var(--warning)]/40", bg: "bg-[var(--warning)]/10", icon: "⚠️" },
  info: { border: "border-accent/40", bg: "bg-accent/10", icon: "ℹ️" },
  pitfall: { border: "border-[var(--danger)]/40", bg: "bg-[var(--danger)]/10", icon: "🚨" },
};

export function LessonView({
  track,
  lesson,
  locale,
  prev,
  next,
}: {
  track: TrackRef;
  lesson: Lesson;
  locale: Locale;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}) {
  const { isTaskDone, isLessonDone, completeLesson } = useProgress();
  const lessonKey = `${track.slug}/${lesson.slug}`;
  const finished = isLessonDone(lessonKey);

  const taskBlocks = useMemo(
    () =>
      lesson.blocks.filter(
        (block): block is Extract<Block, { id: string }> =>
          block.type === "quiz" || block.type === "order" || block.type === "exercise",
      ),
    [lesson.blocks],
  );

  const doneCount = taskBlocks.filter((block) =>
    isTaskDone(taskKeyOf(track.slug, lesson.slug, block.id)),
  ).length;
  const allDone = doneCount === taskBlocks.length;
  const ratio = taskBlocks.length === 0 ? 1 : doneCount / taskBlocks.length;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href={`/${locale}/learn`} className="hover:text-text">
          {ui("tracks.title", locale)}
        </Link>
        <span aria-hidden>/</span>
        <Link href={`/${locale}/learn/${track.slug}`} className="hover:text-text">
          {track.name}
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {t(lesson.title, locale)}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{t(lesson.summary, locale)}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="rounded-full bg-surface-2 px-3 py-1 font-medium">
            ⏱ {lesson.minutes} {ui("lesson.minutes", locale)}
          </span>
          {taskBlocks.length > 0 ? (
            <span className="rounded-full bg-surface-2 px-3 py-1 font-medium">
              🎯 {taskBlocks.length} {locale === "tr" ? "görev" : "tasks"}
            </span>
          ) : null}
          {finished ? (
            <span className="rounded-full bg-[var(--success)]/15 px-3 py-1 font-semibold text-[var(--success)]">
              ✓ {ui("tracks.completed", locale)}
            </span>
          ) : null}
        </div>

        {taskBlocks.length > 0 ? (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted">
              <span>{ui("lesson.progress", locale)}</span>
              <span>
                {doneCount} / {taskBlocks.length}
              </span>
            </div>
            <ProgressBar value={ratio} />
          </div>
        ) : null}
      </header>

      <div className="space-y-6">
        {lesson.blocks.map((block, index) => (
          <BlockRenderer
            key={index}
            block={block}
            track={track}
            lesson={lesson}
            locale={locale}
          />
        ))}
      </div>

      <footer className="mt-10 border-t border-border pt-8">
        {finished ? (
          <p className="rounded-xl border border-[var(--success)]/40 bg-[var(--success)]/10 p-4 text-center text-sm font-semibold text-[var(--success)]">
            ✓ {ui("lesson.finished", locale)}
          </p>
        ) : (
          <div className="text-center">
            <button
              type="button"
              disabled={!allDone}
              onClick={() => completeLesson(lessonKey, LESSON_BONUS_XP)}
              className="w-full rounded-xl bg-gradient-to-r from-accent to-accent-2 px-6 py-3.5 text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              {ui("lesson.finish", locale)} · +{LESSON_BONUS_XP} XP
            </button>
            {!allDone ? (
              <p className="mt-3 text-sm text-muted">
                {ui("lesson.tasksLeft", locale)}: {taskBlocks.length - doneCount}
              </p>
            ) : null}
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/${locale}/learn/${track.slug}/${prev.slug}`}
              className="card group p-4 transition hover:border-accent"
            >
              <span className="text-xs text-muted">← {ui("lesson.prev", locale)}</span>
              <span className="mt-1 block font-semibold">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/${locale}/learn/${track.slug}/${next.slug}`}
              className="card group p-4 text-right transition hover:border-accent sm:col-start-2"
            >
              <span className="text-xs text-muted">{ui("lesson.next", locale)} →</span>
              <span className="mt-1 block font-semibold">{next.title}</span>
            </Link>
          ) : (
            <Link
              href={`/${locale}/learn/${track.slug}`}
              className="card p-4 text-right transition hover:border-accent sm:col-start-2"
            >
              <span className="text-xs text-muted">{ui("lesson.backToTrack", locale)} →</span>
              <span className="mt-1 block font-semibold">{track.name}</span>
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}

function BlockRenderer({
  block,
  track,
  lesson,
  locale,
}: {
  block: Block;
  track: TrackRef;
  lesson: Lesson;
  locale: Locale;
}) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="pt-4 text-xl font-bold tracking-tight sm:text-2xl">
          {t(block.text, locale)}
        </h2>
      );

    case "text":
      return <Markdown text={t(block.body, locale)} />;

    case "code":
      return (
        <CodeCard
          code={block.code}
          lang={block.lang}
          caption={block.caption ? t(block.caption, locale) : undefined}
        />
      );

    case "callout": {
      const style = calloutStyles[block.variant] ?? calloutStyles.info;
      return (
        <aside className={`rounded-xl border p-4 sm:p-5 ${style.border} ${style.bg}`}>
          <p className="flex items-center gap-2 font-semibold text-text">
            <span aria-hidden>{style.icon}</span>
            {t(block.title, locale)}
          </p>
          <Markdown text={t(block.body, locale)} className="mt-2 text-sm" />
        </aside>
      );
    }

    case "quiz":
      return (
        <QuizBlock
          block={block}
          taskKey={taskKeyOf(track.slug, lesson.slug, block.id)}
          locale={locale}
        />
      );

    case "order":
      return (
        <OrderBlock
          block={block}
          taskKey={taskKeyOf(track.slug, lesson.slug, block.id)}
          locale={locale}
          lang={track.slug === "sql" ? "sql" : track.slug === "r" ? "r" : "python"}
        />
      );

    case "exercise":
      return (
        <ExerciseBlock
          block={block}
          taskKey={taskKeyOf(track.slug, lesson.slug, block.id)}
          locale={locale}
        />
      );

    default:
      return null;
  }
}
