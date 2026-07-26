"use client";

import { useRef, type ChangeEvent, type KeyboardEvent } from "react";
import { tokenClass, tokenize } from "@/lib/highlight";

/**
 * Hafif kod editörü: şeffaf bir <textarea>, altındaki vurgulanmış <pre> ile
 * birebir hizalanır. CodeMirror/Monaco yerine bu yaklaşım ~300 kB tasarruf
 * ettiriyor ve mobil klavyeyle sorunsuz çalışıyor.
 *
 * Hizalamanın bozulmaması için iki katman da `.code-layer` sınıfını (aynı
 * font, satır yüksekliği, dolgu) kullanmak zorunda.
 */
export function CodeEditor({
  value,
  onChange,
  lang,
  minRows = 8,
  ariaLabel,
  readOnly = false,
}: {
  value: string;
  onChange: (value: string) => void;
  lang: string;
  minRows?: number;
  ariaLabel?: string;
  readOnly?: boolean;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  // Satır sayısına göre yükseklik; en az minRows kadar.
  const rows = Math.max(minRows, value.split("\n").length + 1);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;

    // Tab tuşu odağı kaçırmasın, girinti eklesin.
    if (event.key === "Tab") {
      event.preventDefault();
      const { selectionStart, selectionEnd } = textarea;
      const next = `${value.slice(0, selectionStart)}    ${value.slice(selectionEnd)}`;
      onChange(next);
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 4;
      });
      return;
    }

    // Enter'da önceki satırın girintisini koru — Python'da kritik.
    if (event.key === "Enter") {
      const { selectionStart } = textarea;
      const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
      const currentLine = value.slice(lineStart, selectionStart);
      const indent = /^[ \t]*/.exec(currentLine)?.[0] ?? "";
      const extra = /[:{([]\s*$/.test(currentLine) ? "    " : "";
      if (indent || extra) {
        event.preventDefault();
        const insertion = `\n${indent}${extra}`;
        const next = `${value.slice(0, selectionStart)}${insertion}${value.slice(textarea.selectionEnd)}`;
        onChange(next);
        requestAnimationFrame(() => {
          const caret = selectionStart + insertion.length;
          textarea.selectionStart = textarea.selectionEnd = caret;
        });
      }
    }
  };

  const syncScroll = () => {
    if (preRef.current && taRef.current) {
      preRef.current.scrollTop = taRef.current.scrollTop;
      preRef.current.scrollLeft = taRef.current.scrollLeft;
    }
  };

  const tokens = tokenize(value, lang);

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-[var(--bg-soft)] focus-within:border-accent">
      <pre
        ref={preRef}
        aria-hidden
        className="code-layer thin-scroll pointer-events-none overflow-auto p-4"
        style={{ height: `${rows * 1.6 * 13 + 32}px` }}
      >
        <code>
          {tokens.map((token, index) => (
            <span key={index} className={tokenClass[token.type]}>
              {token.text}
            </span>
          ))}
          {"\n"}
        </code>
      </pre>
      <textarea
        ref={taRef}
        value={value}
        readOnly={readOnly}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={syncScroll}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        aria-label={ariaLabel ?? "Kod düzenleyici"}
        className="code-layer thin-scroll absolute inset-0 resize-none overflow-auto bg-transparent p-4 whitespace-pre text-transparent caret-[var(--accent-2)] outline-none"
      />
    </div>
  );
}
