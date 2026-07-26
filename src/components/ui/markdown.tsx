import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/**
 * Ders metinleri için mini markdown.
 *
 * Desteklenen: paragraf, `- ` madde listesi, `1. ` sıralı liste,
 * **kalın**, *italik*, `kod`, [bağlantı](url).
 * Tam bir markdown motoru yerine bu alt küme yeterli ve bundle'a ~1 kB ekliyor.
 */

const INLINE = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): ReactNode[] {
  const parts = text.split(INLINE).filter((part) => part !== "");
  return parts.map((part, index) => {
    const key = `${index}-${part.slice(0, 8)}`;

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={key}
          className="rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-accent-2"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("[")) {
      const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
      if (match) {
        const [, label, href] = match;
        const external = href.startsWith("http");
        return external ? (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent-2 underline underline-offset-2"
          >
            {label}
          </a>
        ) : (
          <Link key={key} href={href} className="font-medium text-accent-2 underline underline-offset-2">
            {label}
          </Link>
        );
      }
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={key} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

export function Markdown({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text.trim().split(/\n{2,}/);

  return (
    <div className={`space-y-4 text-[15px] leading-7 text-muted ${className}`}>
      {blocks.map((block, blockIndex) => {
        const lines = block.split("\n");

        if (lines.every((line) => /^\s*-\s+/.test(line))) {
          return (
            <ul key={blockIndex} className="space-y-2 pl-1">
              {lines.map((line, i) => (
                <li key={i} className="flex gap-2.5">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{renderInline(line.replace(/^\s*-\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (lines.every((line) => /^\s*\d+\.\s+/.test(line))) {
          return (
            <ol key={blockIndex} className="space-y-2 pl-1">
              {lines.map((line, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-surface-2 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span>{renderInline(line.replace(/^\s*\d+\.\s+/, ""))}</span>
                </li>
              ))}
            </ol>
          );
        }

        return <p key={blockIndex}>{renderInline(block)}</p>;
      })}
    </div>
  );
}
