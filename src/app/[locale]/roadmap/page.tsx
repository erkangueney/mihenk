import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { roadmap } from "@/content/roadmap";
import { getTrack } from "@/lib/content";
import { isLocale, t, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tr = locale === "tr";
  return {
    title: tr ? "Yol haritası" : "Roadmap",
    description: tr
      ? "Sıfırdan veri analistliğine, oradan veri bilimciliğine giden adım adım öğrenme sırası."
      : "A step-by-step learning order from zero to data analyst, then to data scientist.",
  };
}

export default async function RoadmapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          {ui("roadmap.title", locale)}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {ui("roadmap.subtitle", locale)}
        </p>
      </header>

      <ol className="space-y-6">
        {roadmap.map((phase, phaseIndex) => (
          <li key={phase.id} className="card overflow-hidden">
            <header className="border-b border-border p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-sm font-black text-white">
                  {phaseIndex + 1}
                </span>
                <h2 className="text-lg font-bold tracking-tight">{t(phase.title, locale)}</h2>
                <span className="ml-auto rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                  {phase.weeks} {locale === "tr" ? "hafta" : "weeks"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <span className="font-semibold text-text">
                  {locale === "tr" ? "Bu aşamanın sonunda: " : "By the end of this phase: "}
                </span>
                {t(phase.outcome, locale)}
              </p>
            </header>

            <ul className="divide-y divide-border">
              {phase.stops.map((stop, stopIndex) => {
                const track = getTrack(stop.trackSlug);
                if (!track) return null;
                const color = track.color;
                return (
                  <li key={`${stop.trackSlug}-${stop.level}-${stopIndex}`}>
                    <Link
                      href={`/${locale}/learn/${track.slug}`}
                      className="flex items-start gap-4 p-4 transition hover:bg-surface-2 sm:p-5"
                    >
                      <span
                        aria-hidden
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl"
                        style={{
                          backgroundColor: `color-mix(in oklab, ${color} 18%, transparent)`,
                        }}
                      >
                        {track.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold">{track.name}</span>
                          <span
                            className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                            style={{
                              backgroundColor: `color-mix(in oklab, ${color} 20%, transparent)`,
                              color,
                            }}
                          >
                            {ui(`level.${stop.level}`, locale)}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                          {t(stop.why, locale)}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>

      <aside className="card mt-8 border-accent/40 bg-accent/8 p-5 sm:p-6">
        <h2 className="font-bold">
          {locale === "tr" ? "Bu sıra kesin mi?" : "Is this order fixed?"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {locale === "tr"
            ? "Hayır. Bu, çoğu kişi için işe yarayan bir varsayılan. Şirketin Tableau kullanıyorsa Power BI yerine onu al; işin akademik istatistikse R patikasını öne çek. Önemli olan sıranın kendisi değil, her aşamayı bir çıktıyla kapatman."
            : "No. It is a default that works for most people. If your company uses Tableau, take that instead of Power BI; if your work is academic statistics, pull the R track forward. What matters is not the order but closing each phase with an artefact."}
        </p>
      </aside>
    </div>
  );
}
