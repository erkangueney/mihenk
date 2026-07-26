import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectGrid, type ProjectCardData } from "@/components/project-grid";
import { getTrack, projects } from "@/lib/content";
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
    title: tr ? "Uçtan uca projeler" : "End-to-end projects",
    description: tr
      ? "Gerçek veri setleriyle, net teslimatlarla ve adım adım planla portföye eklenebilir veri analizi ve veri bilimi projeleri."
      : "Portfolio-ready data analytics and data science projects with real datasets, clear deliverables and step-by-step plans.",
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const cards: ProjectCardData[] = projects.map((project) => {
    const track = getTrack(project.trackSlug);
    return {
      slug: project.slug,
      title: t(project.title, locale),
      summary: t(project.summary, locale),
      trackName: track?.name ?? project.trackSlug,
      trackColor: track?.color ?? "var(--accent)",
      trackIcon: track?.icon ?? "📦",
      level: project.level,
      stack: project.stack,
      hours: project.hours,
      xp: project.xp,
    };
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          {ui("projects.title", locale)}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          {ui("projects.subtitle", locale)}
        </p>
      </header>

      <ProjectGrid projects={cards} locale={locale} />
    </div>
  );
}
