import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroCta, type ResumeTarget } from "@/components/hero-cta";
import { TrackCard } from "@/components/track-card";
import { badges } from "@/lib/gamification";
import { flatLessons, lessonKeyOf, platformStats, tracks, trackStats } from "@/lib/content";
import { isLocale, t, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const stats = platformStats();

  const cards = tracks.map((track) => {
    const s = trackStats(track);
    return {
      slug: track.slug,
      name: track.name,
      icon: track.icon,
      color: track.color,
      tagline: t(track.tagline, locale),
      lessons: s.lessons,
      levels: s.levels,
      minutes: s.minutes,
      lessonKeys: track.levels
        .flatMap((level) => level.lessons)
        .map((lesson) => lessonKeyOf(track.slug, lesson.slug)),
    };
  });

  // Varsayılan öğrenme sırası: SQL patikasının başı, ardından tüm patikalar.
  const order = tracks.flatMap((track) =>
    flatLessons(track, locale).map((lesson) => ({
      key: lessonKeyOf(track.slug, lesson.slug),
      trackSlug: track.slug,
      trackName: track.name,
      lessonSlug: lesson.slug,
      title: lesson.title,
    })),
  );

  const first = order[0];
  const resume: ResumeTarget = {
    trackSlug: first.trackSlug,
    trackName: first.trackName,
    lessonSlug: first.lessonSlug,
    lessonTitle: first.title,
    order,
  };

  const howItWorks = [
    {
      icon: "🎯",
      title: locale === "tr" ? "Görevlerle öğren" : "Learn through tasks",
      body:
        locale === "tr"
          ? "Her ders quiz, kod sıralama ve gerçek kodlama alıştırmaları içerir. Okuyup geçmek yok; her adımda uygularsın."
          : "Every lesson has quizzes, code-ordering puzzles and real coding exercises. No passive reading — you apply at every step.",
    },
    {
      icon: "⚡",
      title: locale === "tr" ? "Tarayıcıda çalıştır" : "Run it in the browser",
      body:
        locale === "tr"
          ? "Python (pandas dahil) ve SQL kodun gerçek motorlarda çalışır. Kurulum, sanal ortam, sürüm derdi yok."
          : "Your Python (pandas included) and SQL run on real engines. No installs, no virtualenvs, no version headaches.",
    },
    {
      icon: "🏆",
      title: locale === "tr" ? "XP, seri ve rozetler" : "XP, streaks and badges",
      body:
        locale === "tr"
          ? "Her doğru cevap XP kazandırır, her gün seriyi büyütür. İlerlemen görünür olduğunda devam etmek kolaylaşır."
          : "Each correct answer earns XP and each day extends your streak. Visible progress makes it easier to keep going.",
    },
    {
      icon: "💼",
      title: locale === "tr" ? "Portföye dönüşür" : "It becomes a portfolio",
      body:
        locale === "tr"
          ? "Her seviyenin sonunda gerçek veriyle uçtan uca bir proje var — GitHub'da yayınlama adımıyla birlikte."
          : "Every level ends with an end-to-end project on real data — including the step to publish it on GitHub.",
    },
  ];

  return (
    <>
      {/* ---------------------------- Hero ---------------------------- */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden />
            {ui("home.badge", locale)}
          </span>
          <h1 className="mt-5 text-4xl leading-[1.1] font-black tracking-tight text-balance sm:text-6xl">
            <span className="gradient-text">{ui("home.title", locale)}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {ui("home.subtitle", locale)}
          </p>

          <HeroCta locale={locale} resume={resume} />
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { value: stats.tracks, label: ui("home.stats.tracks", locale) },
            { value: stats.lessons, label: ui("home.stats.lessons", locale) },
            { value: stats.projects, label: ui("home.stats.projects", locale) },
            { value: stats.xp.toLocaleString(locale), label: ui("home.stats.xp", locale) },
          ].map((item) => (
            <div key={item.label} className="card p-4 sm:p-5">
              <dt className="text-2xl font-black tracking-tight sm:text-3xl">{item.value}</dt>
              <dd className="mt-1 text-xs text-muted sm:text-sm">{item.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* --------------------------- Patikalar -------------------------- */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {ui("home.tracks.title", locale)}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {ui("home.tracks.subtitle", locale)}
            </p>
          </div>
          <Link
            href={`/${locale}/learn`}
            className="text-sm font-semibold text-accent-2 hover:underline"
          >
            {ui("tracks.all", locale)} →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((track) => (
            <TrackCard key={track.slug} track={track} locale={locale} />
          ))}
        </div>
      </section>

      {/* -------------------------- Nasıl çalışır ------------------------ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {ui("home.how.title", locale)}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item) => (
            <div key={item.title} className="card p-5">
              <span className="text-3xl" aria-hidden>
                {item.icon}
              </span>
              <h3 className="mt-3 font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------- Rozetler --------------------------- */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
        <div className="card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5 sm:p-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight">{ui("badges.title", locale)}</h2>
              <p className="mt-1 text-sm text-muted">
                {locale === "tr"
                  ? "Toplanacak 12 rozet — her biri farklı bir alışkanlığı ödüllendiriyor."
                  : "12 badges to collect — each rewards a different habit."}
              </p>
            </div>
            <Link
              href={`/${locale}/profile`}
              className="text-sm font-semibold text-accent-2 hover:underline"
            >
              {ui("nav.profile", locale)} →
            </Link>
          </div>
          <ul className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
            {badges.map((badge) => (
              <li key={badge.id} className="flex items-center gap-3 rounded-xl bg-surface-2 p-3">
                <span className="text-2xl" aria-hidden>
                  {badge.icon}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">
                    {t(badge.title, locale)}
                  </span>
                  <span className="block truncate text-xs text-muted">
                    {t(badge.description, locale)}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
