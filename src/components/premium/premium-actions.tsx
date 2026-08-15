"use client";

import { useActionState } from "react";
import { startTrialAction } from "@/lib/entitlements-actions";
import { usePlanInfo } from "@/lib/entitlements-client";
import { emptyActionResult } from "@/lib/auth/types";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

function formatDate(value: string, locale: Locale): string {
  return new Date(value).toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });
}

/** Deneme başlatma + abonelik butonları. Ödeme sağlayıcısı kurulana kadar abonelik butonları devre dışıdır. */
export function PremiumActions({
  locale,
  checkoutEnabled,
}: {
  locale: Locale;
  checkoutEnabled: boolean;
}) {
  const { ready, isPremium, planExpiresAt } = usePlanInfo();
  const [result, action, pending] = useActionState(startTrialAction, emptyActionResult);

  if (!ready) return <div className="card h-40 animate-pulse bg-surface-2/50" aria-hidden />;

  if (isPremium) {
    return (
      <div className="card space-y-2 p-6 text-center">
        <p className="text-2xl" aria-hidden>
          💎
        </p>
        <p className="font-bold">{ui("premium.active", locale)}</p>
        {planExpiresAt ? (
          <p className="text-sm text-muted">
            {ui("premium.activeUntil", locale)}: {formatDate(planExpiresAt, locale)}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {result.message ? (
        <p
          role="status"
          className={`rounded-lg border px-3.5 py-2.5 text-sm ${
            result.ok
              ? "border-success/40 bg-success/10 text-success"
              : "border-danger/40 bg-danger/10 text-danger"
          }`}
        >
          {result.message}
        </p>
      ) : null}

      <form action={action}>
        <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-60">
          {pending ? ui("auth.pending", locale) : ui("premium.trialCta", locale)}
        </button>
        <p className="mt-2 text-center text-xs text-muted">{ui("premium.trial", locale)}</p>
      </form>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={!checkoutEnabled}
          title={checkoutEnabled ? undefined : ui("premium.comingSoon", locale)}
          className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm font-semibold text-text transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {ui("premium.subscribeMonthly", locale)}
          {!checkoutEnabled ? ` · ${ui("premium.comingSoon", locale)}` : ""}
        </button>
        <button
          type="button"
          disabled={!checkoutEnabled}
          title={checkoutEnabled ? undefined : ui("premium.comingSoon", locale)}
          className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm font-semibold text-text transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {ui("premium.subscribeYearly", locale)}
          {!checkoutEnabled ? ` · ${ui("premium.comingSoon", locale)}` : ""}
        </button>
      </div>
    </div>
  );
}
