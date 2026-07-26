"use client";

import { useState } from "react";
import { useProgress } from "@/components/progress-provider";
import { tokenClass, tokenize } from "@/lib/highlight";
import { t, ui } from "@/lib/i18n";
import type { Locale, OrderBlock as OrderBlockType } from "@/lib/types";

/** Blok id'sinden türeyen sabit karıştırma — sunucu ve istemci aynı sırayı üretir. */
function seededShuffle(lines: string[], seed: string): number[] {
  let state = 0;
  for (let i = 0; i < seed.length; i += 1) state = (state * 31 + seed.charCodeAt(i)) >>> 0;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
  const order = lines.map((_, index) => index);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  // Karıştırma tesadüfen doğru sırayı verdiyse başı sonu yer değiştir.
  if (order.every((value, index) => value === index) && order.length > 1) {
    [order[0], order[order.length - 1]] = [order[order.length - 1], order[0]];
  }
  return order;
}

export function OrderBlock({
  block,
  taskKey,
  locale,
  lang = "python",
}: {
  block: OrderBlockType;
  taskKey: string;
  locale: Locale;
  lang?: string;
}) {
  const { isTaskDone, completeTask } = useProgress();
  const done = isTaskDone(taskKey);
  const [order, setOrder] = useState<number[]>(() => seededShuffle(block.lines, block.id));
  const [checked, setChecked] = useState(false);

  const solved = done || order.every((value, index) => value === index);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length || done) return;
    const next = [...order];
    [next[from], next[to]] = [next[to], next[from]];
    setOrder(next);
    setChecked(false);
  };

  const check = () => {
    setChecked(true);
    if (order.every((value, index) => value === index)) completeTask(taskKey, block.xp);
  };

  const rendered = done ? block.lines.map((_, index) => index) : order;

  return (
    <section className={`card p-5 transition sm:p-6 ${solved ? "border-[var(--success)]/45" : ""}`}>
      <header className="mb-4 flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-muted">
          <span aria-hidden>🧩</span> {ui("order.prompt", locale)}
        </span>
        <span className="shrink-0 text-xs font-semibold text-accent">+{block.xp} XP</span>
      </header>

      <p className="text-base font-semibold text-text">{t(block.prompt, locale)}</p>

      <ol className="mt-4 space-y-2">
        {rendered.map((lineIndex, position) => {
          const tokens = tokenize(block.lines[lineIndex], lang);
          return (
            <li
              key={lineIndex}
              className="flex items-center gap-2 rounded-xl border border-border bg-[var(--bg-soft)] p-2 pl-3"
            >
              <span className="code-layer min-w-0 flex-1 overflow-x-auto whitespace-pre">
                {tokens.map((token, i) => (
                  <span key={i} className={tokenClass[token.type]}>
                    {token.text}
                  </span>
                ))}
              </span>
              {!done ? (
                <span className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => move(position, position - 1)}
                    disabled={position === 0}
                    aria-label="Yukarı taşı"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface-2 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(position, position + 1)}
                    disabled={position === rendered.length - 1}
                    aria-label="Aşağı taşı"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-surface-2 disabled:opacity-30"
                  >
                    ↓
                  </button>
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {solved ? (
        <p className="animate-rise mt-4 text-sm font-semibold text-[var(--success)]">
          {ui("quiz.correct", locale)}
        </p>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={check}
            className="rounded-lg bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white"
          >
            {ui("order.check", locale)}
          </button>
          {checked ? (
            <span className="text-sm font-medium text-[var(--danger)]">
              {ui("quiz.wrong", locale)}
            </span>
          ) : null}
        </div>
      )}
    </section>
  );
}
