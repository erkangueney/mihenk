"use client";

import { useState } from "react";
import { useProgress } from "@/components/progress-provider";
import { Markdown } from "@/components/ui/markdown";
import { t, ui } from "@/lib/i18n";
import type { Locale, QuizBlock as QuizBlockType } from "@/lib/types";

export function QuizBlock({
  block,
  taskKey,
  locale,
}: {
  block: QuizBlockType;
  taskKey: string;
  locale: Locale;
}) {
  const { isTaskDone, completeTask } = useProgress();
  const done = isTaskDone(taskKey);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const correct = selected === block.answer;
  const revealed = done || (checked && correct);

  const check = () => {
    if (selected === null) return;
    setChecked(true);
    if (selected === block.answer) completeTask(taskKey, block.xp);
  };

  return (
    <section
      className={`card p-5 transition sm:p-6 ${revealed ? "border-[var(--success)]/45" : ""}`}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-muted">
          <span aria-hidden>🧠</span> Quiz
        </span>
        <span className="shrink-0 text-xs font-semibold text-accent">+{block.xp} XP</span>
      </header>

      <p className="text-base font-semibold text-text">{t(block.question, locale)}</p>

      <div className="mt-4 space-y-2">
        {block.options.map((option, index) => {
          const isChosen = selected === index;
          const isAnswer = index === block.answer;

          let tone = "border-border bg-surface-2 hover:border-accent";
          if (revealed && isAnswer) tone = "border-[var(--success)] bg-[var(--success)]/12";
          else if (checked && isChosen && !correct)
            tone = "border-[var(--danger)] bg-[var(--danger)]/12";
          else if (isChosen) tone = "border-accent bg-accent/12";

          return (
            <button
              key={index}
              type="button"
              disabled={revealed}
              onClick={() => {
                setSelected(index);
                setChecked(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition disabled:cursor-default ${tone}`}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-border bg-bg text-xs font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="min-w-0">{t(option, locale)}</span>
              {revealed && isAnswer ? (
                <span aria-hidden className="ml-auto">
                  ✓
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {revealed ? (
        <div className="animate-rise mt-4 rounded-xl border border-[var(--success)]/40 bg-[var(--success)]/10 p-4">
          <p className="text-sm font-semibold text-[var(--success)]">{ui("quiz.correct", locale)}</p>
          <Markdown text={t(block.explanation, locale)} className="mt-1 text-sm" />
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={check}
            disabled={selected === null}
            className="rounded-lg bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            {ui("quiz.check", locale)}
          </button>
          {checked && !correct ? (
            <span className="text-sm font-medium text-[var(--danger)]">
              {ui("quiz.wrong", locale)}
            </span>
          ) : null}
        </div>
      )}
    </section>
  );
}
