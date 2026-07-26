import { tokenClass, tokenize } from "@/lib/highlight";

/** Salt-okunur, vurgulanmış kod bloğu. Mobilde yatay kaydırılır. */
export function CodeView({
  code,
  lang,
  className = "",
}: {
  code: string;
  lang: string;
  className?: string;
}) {
  const tokens = tokenize(code.replace(/\n+$/, ""), lang);

  return (
    <pre
      className={`thin-scroll code-layer overflow-x-auto rounded-xl border border-border bg-[var(--bg-soft)] p-4 ${className}`}
    >
      <code>
        {tokens.map((token, index) => (
          <span key={index} className={tokenClass[token.type]}>
            {token.text}
          </span>
        ))}
      </code>
    </pre>
  );
}

/** Kod bloğu + üstünde dil etiketi. */
export function CodeCard({
  code,
  lang,
  caption,
}: {
  code: string;
  lang: string;
  caption?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-[var(--bg-soft)]">
      <figcaption className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-[11px] tracking-widest text-muted uppercase">{lang}</span>
        {caption ? <span className="text-xs text-muted">{caption}</span> : null}
      </figcaption>
      <CodeView code={code} lang={lang} className="rounded-none border-0" />
    </figure>
  );
}
