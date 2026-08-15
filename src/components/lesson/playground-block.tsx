"use client";

import { useCallback, useRef, useState } from "react";
import { getDataset } from "@/lib/engines/datasets";
import { getEngine } from "@/lib/engines/client";
import type { RunResult } from "@/lib/engines/protocol";
import { t, ui } from "@/lib/i18n";
import type { CodeEngine, Locale, PlaygroundBlock as PlaygroundBlockType } from "@/lib/types";
import { CodeEditor } from "./code-editor";

/**
 * Serbest deneme alanı.
 *
 * `ExerciseBlock` ile aynı motoru kullanır ama doğrulama, çözüm ve XP yoktur:
 * amaç kullanıcının kodu bozup sonucu görmesi. Ders, referans ve
 * nasıl-yapılır sayfalarının tamamında aynı bileşen kullanılır.
 */
export function PlaygroundBlock({
  block,
  locale,
  minRows,
}: {
  block: PlaygroundBlockType;
  locale: Locale;
  minRows?: number;
}) {
  return (
    <Playground
      engine={block.engine}
      initialCode={block.code}
      dataset={block.dataset}
      title={block.title ? t(block.title, locale) : undefined}
      locale={locale}
      minRows={minRows}
    />
  );
}

/** Blok sarmalayıcısı olmadan doğrudan kullanılabilen çekirdek. */
export function Playground({
  engine,
  initialCode,
  dataset: datasetKey,
  title,
  locale,
  minRows,
  onEngineChange,
  onDatasetChange,
  toolbar,
}: {
  engine: CodeEngine;
  initialCode: string;
  dataset?: string;
  title?: string;
  locale: Locale;
  minRows?: number;
  onEngineChange?: (engine: CodeEngine) => void;
  onDatasetChange?: (key: string) => void;
  toolbar?: React.ReactNode;
}) {
  const [code, setCode] = useState(initialCode);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);
  const [fatal, setFatal] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const warmed = useRef<CodeEngine | null>(null);

  const dataset = getDataset(datasetKey);
  const lang = engine === "python" ? "python" : "sql";

  /** Editöre dokunulunca motoru indirmeye başla — "Çalıştır" anında beklenmesin. */
  const warm = useCallback(() => {
    if (warmed.current === engine) return;
    warmed.current = engine;
    getEngine(engine).warm(setStatus);
  }, [engine]);

  const run = async () => {
    setRunning(true);
    setFatal(null);
    setResult(null);
    try {
      const runResult = await getEngine(engine).run({
        code,
        checks: [],
        schema: dataset?.schema,
        onStatus: setStatus,
      });
      setResult(runResult);
    } catch (error) {
      setFatal(error instanceof Error ? error.message : ui("code.engineError", locale));
    } finally {
      setRunning(false);
      setStatus(null);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Pano izni yoksa sessizce geç — kullanıcı elle seçebilir.
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-accent/25 bg-surface">
      <header className="flex flex-wrap items-center gap-2 border-b border-border bg-surface-2/60 px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-accent uppercase">
          <span aria-hidden>▶</span>
          {ui("playground.title", locale)}
        </span>
        {title ? <span className="text-xs text-muted">· {title}</span> : null}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {toolbar}
          {onEngineChange ? (
            <select
              value={engine}
              onChange={(event) => onEngineChange(event.target.value as CodeEngine)}
              className="rounded-lg border border-border bg-surface px-2 py-1 text-xs font-semibold outline-none focus:border-accent"
              aria-label={ui("playground.engine", locale)}
            >
              <option value="sql">SQL</option>
              <option value="python">Python</option>
            </select>
          ) : (
            <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-muted">
              {engine === "python" ? "🐍 Python" : "🗄️ SQL"}
            </span>
          )}
          {onDatasetChange && engine === "sql" ? (
            <select
              value={datasetKey ?? "shop"}
              onChange={(event) => onDatasetChange(event.target.value)}
              className="rounded-lg border border-border bg-surface px-2 py-1 text-xs font-semibold outline-none focus:border-accent"
              aria-label={ui("playground.dataset", locale)}
            >
              <option value="shop">{locale === "tr" ? "E-ticaret" : "E-commerce"}</option>
              <option value="hr">{locale === "tr" ? "İnsan kaynakları" : "HR"}</option>
              <option value="web">{locale === "tr" ? "Web analitiği" : "Web analytics"}</option>
            </select>
          ) : null}
        </div>
      </header>

      <div className="space-y-3 p-4">
        {dataset ? (
          <details className="rounded-xl border border-border bg-surface-2">
            <summary className="cursor-pointer px-4 py-2 text-xs font-medium">
              {t(dataset.title, locale)} — {locale === "tr" ? "tablo şeması" : "table schema"}
            </summary>
            <div className="thin-scroll overflow-x-auto px-4 pb-3">
              <table className="w-full min-w-[420px] text-left text-xs">
                <tbody>
                  {dataset.tables.map((table) => (
                    <tr key={table.name} className="border-t border-border/70">
                      <th className="py-1.5 pr-4 align-top font-mono font-semibold whitespace-nowrap text-accent-2">
                        {table.name}
                      </th>
                      <td className="py-1.5 font-mono text-muted">{table.columns.join(", ")}</td>
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
            minRows={minRows ?? (engine === "sql" ? 6 : 8)}
            ariaLabel={title ?? ui("playground.title", locale)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:bg-accent-2 disabled:opacity-60"
          >
            {running ? ui("code.running", locale) : `▶ ${ui("code.run", locale)}`}
          </button>
          <button
            type="button"
            onClick={() => {
              setCode(initialCode);
              setResult(null);
              setFatal(null);
            }}
            className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm font-medium"
          >
            {ui("code.reset", locale)}
          </button>
          <button
            type="button"
            onClick={copy}
            className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm font-medium text-muted"
          >
            {copied ? `✓ ${ui("common.copied", locale)}` : ui("common.copy", locale)}
          </button>
          {status && running ? <span className="text-xs text-muted">{status}</span> : null}
        </div>

        {fatal ? (
          <p className="rounded-xl border border-[var(--danger)]/40 bg-[var(--danger)]/10 p-3 text-sm text-[var(--danger)]">
            {fatal}
          </p>
        ) : null}

        {result ? <PlaygroundOutput result={result} locale={locale} /> : null}
      </div>
    </section>
  );
}

function PlaygroundOutput({ result, locale }: { result: RunResult; locale: Locale }) {
  const empty = !result.error && !result.stdout && !result.table;

  return (
    <div className="animate-rise space-y-3">
      {result.error ? (
        <div className="rounded-xl border border-[var(--danger)]/40 bg-[var(--danger)]/10 p-3">
          <p className="mb-1 text-xs font-semibold tracking-wide text-[var(--danger)] uppercase">
            {locale === "tr" ? "Hata" : "Error"}
          </p>
          <pre className="thin-scroll code-layer overflow-x-auto text-[var(--danger)]">
            {result.error}
          </pre>
        </div>
      ) : null}

      {result.stdout ? (
        <div className="rounded-xl border border-border bg-[var(--bg-soft)] p-3">
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
            {ui("code.output", locale)}
          </p>
          <pre className="thin-scroll code-layer overflow-x-auto">{result.stdout}</pre>
        </div>
      ) : null}

      {result.table ? (
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="thin-scroll max-h-72 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-surface-2">
                <tr>
                  {result.table.columns.map((column) => (
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
                {result.table.rows.map((row, rowIndex) => (
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
            {result.table.total} {locale === "tr" ? "satır" : "rows"} · {result.ms} ms
          </p>
        </div>
      ) : null}

      {empty ? (
        <p className="rounded-xl border border-border bg-surface-2 p-3 text-xs text-muted">
          {ui("playground.noOutput", locale)} · {result.ms} ms
        </p>
      ) : null}
    </div>
  );
}
