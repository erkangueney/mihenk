"use client";

import Link from "next/link";
import { canAccessLevel, canAccessProject } from "@/lib/entitlements";
import { usePlanInfo } from "@/lib/entitlements-client";
import type { LevelId, Locale } from "@/lib/types";

/** Kilit ekranındaki kart — hem PremiumGate hem LessonView tarafından kullanılır. */
export function PremiumLockNotice({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <div className={`card flex flex-col items-center gap-3 p-8 text-center sm:p-10 ${className}`}>
      <p className="text-3xl" aria-hidden>
        💎
      </p>
      <p className="text-lg font-bold">
        {locale === "tr" ? "Bu içerik Premium'da" : "This content is Premium"}
      </p>
      <p className="max-w-sm text-sm text-muted">
        {locale === "tr"
          ? "Tüm patikalar, tüm seviyeler ve tüm uçtan uca projeler Premium'da açılır."
          : "All tracks, all levels and all end-to-end projects unlock with Premium."}
      </p>
      <Link href={`/${locale}/premium`} className="btn-gold mt-1 inline-flex items-center justify-center">
        {locale === "tr" ? "Premium'a geç" : "Upgrade to Premium"}
      </Link>
    </div>
  );
}

type GateTarget =
  | { kind: "level"; trackSlug: string; levelId: LevelId }
  | { kind: "project"; trackSlug: string; slug: string };

/**
 * Kilitli içeriği hiç render etmez (blur değil) — böylece etkileşimli görev
 * blokları (quiz/exercise/mark-as-done) DOM'a hiç girmez, kilitliyken XP
 * kazanılamaz. Plan bilgisi okunmadan (ready=false) içerik gösterilir; aksi
 * halde premium kullanıcı her sayfa açılışında bir anlığına kilit görürdü.
 */
export function PremiumGate({
  target,
  locale,
  children,
}: {
  target: GateTarget;
  locale: Locale;
  children: React.ReactNode;
}) {
  const { ready, ...planInfo } = usePlanInfo();

  if (!ready) return <>{children}</>;

  const entitled =
    target.kind === "level"
      ? canAccessLevel(target.trackSlug, target.levelId, planInfo)
      : canAccessProject({ slug: target.slug, trackSlug: target.trackSlug }, planInfo);

  if (entitled) return <>{children}</>;

  return <PremiumLockNotice locale={locale} />;
}
