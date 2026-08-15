import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FreeTrackPicker } from "@/components/premium/free-track-picker";
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
      ? "12 patikanın tamamı, tüm seviyeler, 24 proje ve reklamsız deneyim."
      : "All 12 tracks, every level, all 24 projects and an ad-free experience.",
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

  // İyzico anahtarları henüz kurulmadıysa abonelik butonları "çok yakında" gösterir
  // (checkout API route Faz 4'te eklenir) — deneme (trial) bundan bağımsız çalışır.
  const checkoutEnabled = Boolean(process.env.IYZICO_API_KEY);

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
                ? "Her patikanın Temel seviyesi"
                : "Every track's Foundation level"}
            </li>
            <li>
              {locale === "tr"
                ? "Seçtiğin 1 patika tamamen açık"
                : "One track of your choice, fully unlocked"}
            </li>
            <li>{locale === "tr" ? "2 örnek uçtan uca proje" : "2 sample end-to-end projects"}</li>
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

      <div className="mt-8">
        <FreeTrackPicker locale={locale} />
      </div>
    </div>
  );
}
