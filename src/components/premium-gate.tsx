"use client";

import Link from "next/link";
import { canAccessContent, type PremiumFlags } from "@/lib/entitlements";
import { usePlanInfo } from "@/lib/entitlements-client";
import type { Locale } from "@/lib/types";

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
          ? "Bu, Premium-özel ek bir ders/proje. Diğer tüm patikalar, seviyeler ve projeler zaten ücretsiz."
          : "This is a Premium-exclusive bonus lesson/project. Every other track, level and project is already free."}
      </p>
      <Link href={`/${locale}/premium`} className="btn-gold mt-1 inline-flex items-center justify-center">
        {locale === "tr" ? "Premium'a geç" : "Upgrade to Premium"}
      </Link>
    </div>
  );
}

/**
 * Kilitli içeriği hiç render etmez (blur değil) — böylece etkileşimli görev
 * blokları (quiz/exercise/mark-as-done) DOM'a hiç girmez, kilitliyken XP
 * kazanılamaz. Plan bilgisi okunmadan (ready=false) içerik gösterilir; aksi
 * halde premium kullanıcı her sayfa açılışında bir anlığına kilit görürdü.
 */
export function PremiumGate({
  flags,
  locale,
  children,
}: {
  flags: PremiumFlags;
  locale: Locale;
  children: React.ReactNode;
}) {
  const { ready, ...planInfo } = usePlanInfo();

  if (!ready) return <>{children}</>;
  if (canAccessContent(flags, planInfo)) return <>{children}</>;

  return <PremiumLockNotice locale={locale} />;
}
