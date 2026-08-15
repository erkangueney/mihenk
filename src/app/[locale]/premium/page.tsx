import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PremiumActions } from "@/components/premium/premium-actions";
import { isLocale, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";
  return {
    title: tr ? "Premium'a geç" : "Upgrade to Premium",
    description: tr
      ? "Premium-özel ek dersler, ileri seviye projeler ve reklamsız deneyim."
      : "Premium-exclusive extra lessons, advanced projects and an ad-free experience.",
  };
}

const FEATURE_KEYS = [
  "premium.feature.tracks",
  "premium.feature.projects",
  "premium.feature.ads",
  "premium.feature.avatar",
  "premium.feature.badge",
] as const;

export default async function PremiumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  // İyzico anahtarları henüz kurulmadıysa abonelik butonları "çok yakında"
  // gösterir — deneme (trial) bundan bağımsız her zaman çalışır.
  const checkoutEnabled = Boolean(process.env.IYZICO_API_KEY && process.env.IYZICO_SECRET_KEY);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {ui("premium.title", locale)}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {ui("premium.subtitle", locale)}
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        <section className="card space-y-4 p-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              {ui("premium.free.title", locale)}
            </p>
            <p className="mt-1 font-display text-3xl font-semibold">{ui("premium.free.price", locale)}</p>
          </div>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              {locale === "tr"
                ? "12 patikanın tamamı, tüm seviyeler"
                : "All 12 tracks, every level"}
            </li>
            <li>{locale === "tr" ? "24 uçtan uca projenin tamamı" : "All 24 end-to-end projects"}</li>
            <li>
              {locale === "tr"
                ? "Öğrenmenin kendisi asla kilitli olmaz"
                : "Learning itself is never locked"}
            </li>
          </ul>
        </section>

        <section className="card space-y-4 border-accent/40 p-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-accent uppercase">
              {ui("premium.premium.title", locale)}
            </p>
          </div>
          <ul className="space-y-2 text-sm">
            {FEATURE_KEYS.map((key) => (
              <li key={key} className="flex items-start gap-2">
                <span aria-hidden className="text-accent">
                  ✓
                </span>
                {ui(key, locale)}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-8">
        <PremiumActions locale={locale} checkoutEnabled={checkoutEnabled} />
      </div>
    </div>
  );
}
