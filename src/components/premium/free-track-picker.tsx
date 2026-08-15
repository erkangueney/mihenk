"use client";

import { useActionState } from "react";
import { setFreeTrackChoiceAction } from "@/lib/entitlements-actions";
import { usePlanInfo } from "@/lib/entitlements-client";
import { emptyActionResult } from "@/lib/auth/types";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const OPTIONS = [
  { slug: "sql", label: "SQL" },
  { slug: "python", label: "Python" },
] as const;

export function FreeTrackPicker({ locale }: { locale: Locale }) {
  const { ready, isPremium, freeTrackChoice } = usePlanInfo();
  const [result, action, pending] = useActionState(setFreeTrackChoiceAction, emptyActionResult);

  // Premium kullanıcıda zaten tüm patikalar açık — seçim anlamsız.
  if (!ready || isPremium) return null;

  return (
    <section className="card p-5 sm:p-6">
      <h2 className="font-bold">{ui("premium.freeTrack.title", locale)}</h2>
      <p className="mt-1 text-sm text-muted">{ui("premium.freeTrack.subtitle", locale)}</p>
      {result.message ? (
        <p
          role="status"
          className={`mt-3 rounded-lg border px-3 py-2 text-sm ${
            result.ok
              ? "border-success/40 bg-success/10 text-success"
              : "border-danger/40 bg-danger/10 text-danger"
          }`}
        >
          {result.message}
        </p>
      ) : null}
      <div className="mt-4 flex gap-2">
        {OPTIONS.map((option) => {
          const active = freeTrackChoice === option.slug;
          return (
            <form key={option.slug} action={action}>
              <input type="hidden" name="trackSlug" value={option.slug} />
              <button
                type="submit"
                disabled={pending || active}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition disabled:cursor-default ${
                  active
                    ? "border-accent bg-accent text-on-accent"
                    : "border-border bg-surface-2 text-muted hover:text-text"
                }`}
              >
                {option.label} {active ? `· ${ui("premium.freeTrack.saved", locale)}` : ""}
              </button>
            </form>
          );
        })}
      </div>
    </section>
  );
}
