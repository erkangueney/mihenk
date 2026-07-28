"use client";

import { useFormStatus } from "react-dom";
import type { ActionResult } from "@/lib/auth/types";

/** Panelde tekrar eden form alanı stili. */
export const adminField =
  "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text " +
  "outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20";

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-muted">
      {children}
    </label>
  );
}

/**
 * Gönder butonu.
 *
 * `useFormStatus` yalnızca formun İÇİNDEKİ bir bileşende çalışır — bu yüzden
 * ayrı bir bileşen; aynı dosyadaki formun içine gömülü bir buton olsaydı
 * pending her zaman false dönerdi.
 */
export function SubmitButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "danger";
  className?: string;
}) {
  const { pending } = useFormStatus();

  const styles = {
    primary: "btn-gold",
    ghost: "border border-border bg-surface-2 text-muted hover:text-text",
    danger: "border border-danger/40 bg-danger/10 text-danger hover:bg-danger/20",
  }[variant];

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold transition disabled:opacity-60 ${styles} ${className}`}
    >
      {pending ? "…" : children}
    </button>
  );
}

export function ResultNotice({ result }: { result: ActionResult }) {
  if (!result.message) return null;
  return (
    <p
      role="status"
      className={`rounded-lg border px-3 py-2 text-sm ${
        result.ok
          ? "border-success/40 bg-success/10 text-success"
          : "border-danger/40 bg-danger/10 text-danger"
      }`}
    >
      {result.message}
    </p>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="card p-4 sm:p-5">
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold tabular-nums sm:text-3xl">
        {typeof value === "number" ? value.toLocaleString("tr") : value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "danger" | "success";
}) {
  const tones = {
    neutral: "bg-surface-2 text-muted",
    accent: "bg-accent/15 text-accent",
    danger: "bg-danger/15 text-danger",
    success: "bg-success/15 text-success",
  }[tone];

  return (
    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${tones}`}>
      {children}
    </span>
  );
}
