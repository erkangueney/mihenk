import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/ad-slot";
import { BrandMark } from "@/components/brand";
import { HeroCta, type ResumeTarget } from "@/components/hero-cta";
import { IconBook, IconClipboard, IconCompass, IconPlay } from "@/components/ui/icons";
import { TrackCard } from "@/components/track-card";
import { cheatsheets } from "@/content/cheatsheets";
import { badges } from "@/lib/gamification";
import { flatLessons, lessonKeyOf, trackStats } from "@/lib/content";
import { getPlatformStats, getTracks } from "@/lib/content-docs/resolve";
import { howTos } from "@/lib/how-to";
import { totalReferenceEntries } from "@/lib/reference";
import { isLocale, t, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const [stats, tracks] = await Promise.all([getPlatformStats(), getTracks()]);

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
      premium: track.premium,
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

  /**
   * Alet çantası kartları.
   *
   * Ders akışına girmeden gelen ziyaretçi için giriş noktası: aranan komut,
   * nokta atışı bir soru, kopya kâğıdı ya da doğrudan editör.
   */
  const toolbox = [
    {
      href: "/reference",
      icon: IconBook,
      title: ui("reference.title", locale),
      body: ui("reference.subtitle", locale),
      meta: `${totalReferenceEntries()} ${ui("reference.entries", locale)}`,
    },
    {
      href: "/how-to",
      icon: IconCompass,
      title: ui("howTo.title", locale),
      body: ui("howTo.subtitle", locale),
      meta: `${howTos.length} ${ui("howTo.count", locale)}`,
    },
    {
      href: "/cheatsheets",
      icon: IconClipboard,
      title: ui("cheatsheet.title", locale),
      body: ui("cheatsheet.subtitle", locale),
      meta: `${cheatsheets.length} ${locale === "tr" ? "kâğıt" : "sheets"}`,
    },
    {
      href: "/playground",
      icon: IconPlay,
      title: ui("playground.pageTitle", locale),
      body: ui("playground.pageSubtitle", locale),
      meta: "Python · SQL",
    },
  ];

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
      {/* ---------------------------- Hero ----------------------------
          Tez: mihenk taşı bir logo değil, gerçek bir alet. Sağdaki amblem
          küçük bir simge değil, sayfanın kendisini kanıtlayan nesne olarak
          büyütülür — üzerindeki üç altın iz Temel→Uzman kademelerinin
          gerçek karşılığıdır (bkz. brand.tsx). */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              <span className="eyebrow">{ui("home.badge", locale)}</span>
            </span>
            <h1 className="font-display mt-6 text-5xl leading-[0.98] font-bold tracking-tight text-balance sm:text-7xl">
              {ui("home.title", locale)}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {ui("home.subtitle", locale)}
            </p>

            <HeroCta locale={locale} resume={resume} />
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-sm items-center justify-center lg:flex">
            <BrandMark size={320} className="drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]" />
          </div>
        </div>

        <dl className="card mt-16 grid grid-cols-2 overflow-hidden lg:grid-cols-4">
          {[
            { value: stats.tracks, label: ui("home.stats.tracks", locale) },
            { value: stats.lessons, label: ui("home.stats.lessons", locale) },
            { value: stats.projects, label: ui("home.stats.projects", locale) },
            { value: stats.xp.toLocaleString(locale), label: ui("home.stats.xp", locale) },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`border-border/70 p-5 sm:p-7 ${index % 2 === 1 ? "border-l" : ""} ${
                index >= 2 ? "max-lg:border-t" : ""
              } ${index > 0 ? "lg:border-l" : ""}`}
            >
              <dt className="font-mono text-3xl font-bold tracking-tight text-accent tabular-nums sm:text-4xl">
                {item.value}
              </dt>
              <dd className="mt-1.5 text-xs tracking-wide text-muted sm:text-sm">{item.label}</dd>
              <div className="scale-track mt-3" aria-hidden>
                <div
                  className="scale-fill"
                  style={{ ["--fill" as string]: (55 + index * 12) / 100 }}
                />
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* --------------------------- Patikalar -------------------------- */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {ui("home.tracks.title", locale)}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {ui("home.tracks.subtitle", locale)}
            </p>
          </div>
          <Link
            href={`/${locale}/learn`}
            className="text-sm font-semibold text-accent transition hover:text-accent-2"
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

      {/* -------------------------- Alet çantası ------------------------- */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {ui("toolbox.title", locale)}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {ui("toolbox.subtitle", locale)}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolbox.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className="card group flex flex-col p-6 transition hover:border-accent"
            >
              <span
                aria-hidden
                className="grid h-11 w-11 place-items-center rounded-lg border border-border-strong text-accent"
              >
                <item.icon size={20} />
              </span>
              <span className="mt-4 font-bold tracking-tight">{item.title}</span>
              <span className="mt-2 text-sm leading-relaxed text-muted">{item.body}</span>
              <span className="mt-4 font-mono text-xs font-semibold text-accent">{item.meta}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* -------------------------- Nasıl çalışır ------------------------ */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {ui("home.how.title", locale)}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, index) => (
            <div key={item.title} className="card group p-6 transition hover:border-accent/40">
              <div className="flex items-center justify-between">
                <span
                  className="grid h-12 w-12 place-items-center rounded-lg border border-border-strong text-2xl"
                  aria-hidden
                >
                  {item.icon}
                </span>
                <span className="font-mono text-sm font-semibold text-tick" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-bold tracking-tight">{item.title}</h3>
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
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                {ui("badges.title", locale)}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {locale === "tr"
                  ? "Toplanacak 12 rozet — her biri farklı bir alışkanlığı ödüllendiriyor."
                  : "12 badges to collect — each rewards a different habit."}
              </p>
            </div>
            <Link
              href={`/${locale}/profile`}
              className="text-sm font-semibold text-accent transition hover:text-accent-2"
            >
              {ui("nav.profile", locale)} →
            </Link>
          </div>
          <ul className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
            {badges.map((badge) => (
              <li
                key={badge.id}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface-2/80 p-3 transition hover:border-accent/40"
              >
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

      <AdSlot placement="home-footer" className="mx-auto my-10 max-w-7xl px-4 sm:px-6" />
    </>
  );
}
