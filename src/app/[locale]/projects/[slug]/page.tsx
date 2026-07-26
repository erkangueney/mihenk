import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectComplete } from "@/components/project-complete";
import { CodeCard } from "@/components/ui/code-view";
import { Markdown } from "@/components/ui/markdown";
import { getProject, getTrack, projects } from "@/lib/content";
import { isLocale, locales, t, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) return {};
  return { title: t(project.title, locale), description: t(project.summary, locale) };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const project = getProject(slug);
  if (!project) notFound();
  const track = getTrack(project.trackSlug);
  const color = track?.color ?? "var(--accent)";

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href={`/${locale}/projects`} className="hover:text-text">
          {ui("projects.title", locale)}
        </Link>
        {track ? (
          <>
            <span aria-hidden>/</span>
            <Link href={`/${locale}/learn/${track.slug}`} className="hover:text-text">
              {track.name}
            </Link>
          </>
        ) : null}
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span
            className="rounded-full px-3 py-1 font-semibold"
            style={{
              backgroundColor: `color-mix(in oklab, ${color} 20%, transparent)`,
              color,
            }}
          >
            {track?.icon} {track?.name}
          </span>
          <span className="rounded-full bg-surface-2 px-3 py-1 font-medium text-muted">
            {ui(`level.${project.level}`, locale)}
          </span>
          <span className="rounded-full bg-surface-2 px-3 py-1 font-medium text-muted">
            ~{project.hours} {ui("projects.hours", locale)}
          </span>
          <span className="rounded-full bg-surface-2 px-3 py-1 font-semibold" style={{ color }}>
            +{project.xp} XP
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-balance sm:text-4xl">
          {t(project.title, locale)}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{t(project.summary, locale)}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="card p-5">
          <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
            {ui("projects.stack", locale)}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-lg bg-surface-2 px-2.5 py-1 font-mono text-xs text-text"
              >
                {tool}
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
            {ui("projects.dataset", locale)}
          </h2>
          <Markdown text={t(project.dataset, locale)} className="mt-3 text-sm" />
        </section>
      </div>

      <section className="card mt-4 p-5 sm:p-6">
        <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
          {ui("projects.deliverables", locale)}
        </h2>
        <ul className="mt-4 space-y-2.5">
          {project.deliverables.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span
                aria-hidden
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md text-[11px] font-bold"
                style={{
                  backgroundColor: `color-mix(in oklab, ${color} 20%, transparent)`,
                  color,
                }}
              >
                {index + 1}
              </span>
              <span>{t(item, locale)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-5 text-xl font-bold tracking-tight sm:text-2xl">
          {ui("projects.steps", locale)}
        </h2>
        <ol className="space-y-6">
          {project.steps.map((step, index) => (
            <li key={index} className="relative border-l border-border pb-1 pl-6 sm:pl-8">
              <span
                aria-hidden
                className="absolute top-0 -left-3 grid h-6 w-6 place-items-center rounded-full text-xs font-bold"
                style={{ backgroundColor: color, color: "#0a0f1c" }}
              >
                {index + 1}
              </span>
              <h3 className="font-bold">{t(step.title, locale)}</h3>
              <Markdown text={t(step.body, locale)} className="mt-2 text-sm" />
              {step.code ? (
                <div className="mt-3">
                  <CodeCard code={step.code} lang={step.lang ?? "text"} />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-10">
        <ProjectComplete slug={project.slug} xp={project.xp} locale={locale} />
      </div>
    </article>
  );
}
