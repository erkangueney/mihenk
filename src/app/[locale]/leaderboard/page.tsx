import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeaderboardView } from "@/components/leaderboard-view";
import { isLocale, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "tr" ? "Liderlik tablosu" : "Leaderboard" };
}

export default async function LeaderboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {ui("leaderboard.title", locale)}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {ui("leaderboard.subtitle", locale)}
        </p>
      </header>
      <LeaderboardView locale={locale} />
    </div>
  );
}
