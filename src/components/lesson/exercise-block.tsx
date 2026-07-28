"use client";

import { useCallback, useRef, useState } from "react";
import { useProgress } from "@/components/progress-provider";
import { Markdown } from "@/components/ui/markdown";
import { getDataset } from "@/lib/engines/datasets";
import { getEngine } from "@/lib/engines/client";
import type { CheckSpec, RunResult } from "@/lib/engines/protocol";
import { t, ui } from "@/lib/i18n";
import type { ExerciseBlock as ExerciseBlockType, Locale } from "@/lib/types";
import { CodeEditor } from "./code-editor";

/** İçerikteki `Check` yapısını worker'ın anladığı düz sözleşmeye çevirir. */
function toSpecs(block: ExerciseBlockType, locale: Locale): CheckSpec[] {
  return block.checks.map((check) => {
    if (check.kind === "expression") {
      return { kind: "expression", code: check.code, message: t(check.message, locale) };
    }
    if (check.kind === "contains") {
      return { kind: "contains", needle: check.needle, message: t(check.message, locale) };
    }
    return { kind: "resultEquals", message: t(check.message, locale) };
  });
}

export function ExerciseBlock({
  block,
  taskKey,
  locale,
}: {
  block: ExerciseBlockType;
  taskKey: string;
  locale: Locale;
}) {
  const { isTaskDone, completeTask } = useProgress();
  const done = isTaskDone(taskKey);

  const [code, setCode] = useState(block.starter);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);
  const [fatal, setFatal] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const warmed = useRef(false);

  const dataset = getDataset(block.dataset);
  const lang = block.engine === "python" ? "python" : "sql";

  /** Kullanıcı editöre dokunduğunda motoru indirmeye başla — çalıştırınca beklemesin. */
  const warm = useCallback(() => {
    if (warmed.current) return;
    warmed.current = true;
    getEngine(block.engine).warm(setStatus);
  }, [block.engine]);

  const run = async () => {
    setRunning(true);
    setFatal(null);
    setResult(null);
    try {
      const runResult = await getEngine(block.engine).run({
        code,
        checks: toSpecs(block, locale),
        schema: dataset?.schema,
        solution: block.engine === "sql" ? block.solution : undefined,
        onStatus: setStatus,
      });
      setResult(runResult);
      if (runResult.passed) completeTask(taskKey, block.xp);
    } catch (error) {
      setFatal(error instanceof Error ? error.message : ui("code.engineError", locale));
    } finally {
      setRunning(false);
      setStatus(null);
    }
  };

  const passed = result?.passed ?? false;

  return (
    <section
      className={`card overflow-hidden transition ${done || passed ? "border-[var(--success)]/45" : ""}`}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-muted">
          <span aria-hidden>{block.engine === "python" ? "🐍" : "🗄️"}</span>
          {block.engine === "python" ? "Python" : "SQL"}
        </span>
        <span className="text-xs font-semibold text-accent">
          {done ? "✓ " : ""}+{block.xp} XP
        </span>
      </header>

      <div className="space-y-4 p-5 sm:p-6">
        <Markdown text={t(block.prompt, locale)} className="text-[15px]" />

        {dataset ? (
          <details className="rounded-xl border border-border bg-surface-2">
            <summary className="cursor-pointer px-4 py-2.5 text-sm font-medium">
              {t(dataset.title, locale)} — {locale === "tr" ? "tablo şeması" : "table schema"}
            </summary>
            <div className="thin-scroll overflow-x-auto px-4 pb-4">
              <table className="w-full min-w-[420px] text-left text-xs">
                <tbody>
                  {dataset.tables.map((table) => (
                    <tr key={table.name} className="border-t border-border/70">
                      <th className="py-2 pr-4 align-top font-mono font-semibold whitespace-nowrap text-accent-2">
                        {table.name}
                      </th>
                      <td className="py-2 font-mono text-muted">{table.columns.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        ) : null}

        <div onFocus={warm} onPointerDown={warm}>
          <CodeEditor
            value={code}
            onChange={setCode}
            lang={lang}
            minRows={block.engine === "sql" ? 6 : 9}
            ariaLabel={t(block.prompt, locale)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="rounded-lg bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-on-accent disabled:opacity-60"
          >
            {running ? ui("code.running", locale) : `▶ ${ui("code.run", locale)}`}
          </button>
          <button
            type="button"
            onClick={() => {
              setCode(block.starter);
              setResult(null);
              setFatal(null);
            }}
            className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm font-medium"
          >
            {ui("code.reset", locale)}
          </button>
          {block.hint ? (
            <button
              type="button"
              onClick={() => setShowHint((value) => !value)}
              className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm font-medium"
            >
              💡 {ui("code.hint", locale)}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setShowSolution((value) => !value)}
            className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm font-medium text-muted"
          >
            {ui("code.solution", locale)}
          </button>
          {status && running ? (
            <span className="text-xs text-muted">{status}</span>
          ) : null}
        </div>

        {showHint && block.hint ? (
          <div className="animate-rise rounded-xl border border-[var(--warning)]/40 bg-[var(--warning)]/10 p-4">
            <Markdown text={t(block.hint, locale)} className="text-sm" />
          </div>
        ) : null}

        {showSolution ? (
          <div className="animate-rise">
            <CodeEditor value={block.solution} onChange={() => {}} lang={lang} minRows={4} readOnly />
            <button
              type="button"
              onClick={() => setCode(block.solution)}
              className="mt-2 text-xs font-medium text-accent-2 underline underline-offset-2"
            >
              {locale === "tr" ? "Çözümü editöre kopyala" : "Copy solution into editor"}
            </button>
          </div>
        ) : null}

        {fatal ? (
          <p className="rounded-xl border border-[var(--danger)]/40 bg-[var(--danger)]/10 p-4 text-sm text-[var(--danger)]">
            {fatal}
          </p>
        ) : null}

        {result ? <RunOutput result={result} locale={locale} /> : null}
      </div>
    </section>
  );
}

function RunOutput({ result, locale }: { result: RunResult; locale: Locale }) {
  return (
    <div className="animate-rise space-y-3">
      {result.error ? (
        <div className="rounded-xl border border-[var(--danger)]/40 bg-[var(--danger)]/10 p-4">
          <p className="mb-1 text-xs font-semibold tracking-wide text-[var(--danger)] uppercase">
            {locale === "tr" ? "Hata" : "Error"}
          </p>
          <pre className="thin-scroll code-layer overflow-x-auto text-[var(--danger)]">
            {result.error}
          </pre>
        </div>
      ) : null}

      {result.stdout ? (
        <div className="rounded-xl border border-border bg-[var(--bg-soft)] p-4">
          <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">
            {ui("code.output", locale)}
          </p>
          <pre className="thin-scroll code-layer overflow-x-auto">{result.stdout}</pre>
        </div>
      ) : null}

      {result.table ? <ResultTable table={result.table} locale={locale} /> : null}

      {result.checks.length > 0 ? (
        <ul className="space-y-1.5">
          {result.checks.map((check, index) => (
            <li
              key={index}
              className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm ${
                check.passed
                  ? "bg-[var(--success)]/10 text-[var(--success)]"
                  : "bg-[var(--danger)]/10 text-[var(--danger)]"
              }`}
            >
              <span aria-hidden className="mt-px">
                {check.passed ? "✓" : "✕"}
              </span>
              <span className="text-text/90">{check.message}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {result.passed ? (
        <p className="rounded-xl border border-[var(--success)]/40 bg-[var(--success)]/10 p-3 text-sm font-semibold text-[var(--success)]">
          🎉 {ui("code.passed", locale)} · {result.ms} ms
        </p>
      ) : null}
    </div>
  );
}

function ResultTable({
  table,
  locale,
}: {
  table: NonNullable<RunResult["table"]>;
  locale: Locale;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="thin-scroll max-h-80 overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-surface-2">
            <tr>
              {table.columns.map((column) => (
                <th
                  key={column}
                  className="border-b border-border px-3 py-2 font-mono text-xs font-semibold whitespace-nowrap text-accent-2"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-surface-2/40">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="border-b border-border/60 px-3 py-1.5 font-mono text-xs whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border bg-surface-2 px-3 py-1.5 text-xs text-muted">
        {table.total} {locale === "tr" ? "satır" : "rows"}
        {table.total > table.rows.length
          ? locale === "tr"
            ? ` · ilk ${table.rows.length} tanesi gösteriliyor`
            : ` · showing first ${table.rows.length}`
          : ""}
      </p>
    </div>
  );
}
