"use client";

import Link from "next/link";
import { useState } from "react";
import { useProgress } from "@/components/progress-provider";
import { levelOrder } from "@/lib/content";
import { canAccessProject } from "@/lib/entitlements";
import { usePlanInfo } from "@/lib/entitlements-client";
import { ui, type DictKey } from "@/lib/i18n";
import type { LevelId, Locale } from "@/lib/types";

export interface ProjectCardData {
  slug: string;
  title: string;
  summary: string;
  trackSlug: string;
  trackName: string;
  trackColor: string;
  trackIcon: string;
  level: LevelId;
  stack: string[];
  hours: number;
  xp: number;
}

export function ProjectGrid({
  projects,
  locale,
}: {
  projects: ProjectCardData[];
  locale: Locale;
}) {
  const { progress, ready } = useProgress();
  const { ready: planReady, ...planInfo } = usePlanInfo();
  const [level, setLevel] = useState<LevelId | "all">("all");

  // Filtreler veriden türetilir: projesi olmayan bir kademe boş sekme olarak
  // görünmez, içerik büyüdükçe yenisi kendiliğinden eklenir.
  const levelFilters: (LevelId | "all")[] = [
    "all",
    ...levelOrder.filter((id) => projects.some((project) => project.level === id)),
  ];

  const visible = level === "all" ? projects : projects.filter((p) => p.level === level);

  return (
    <>
      <div className="thin-scroll -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {levelFilters.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setLevel(value)}
            aria-pressed={level === value}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
              level === value
                ? "border-accent bg-accent text-on-accent"
                : "border-border bg-surface text-muted hover:text-text"
            }`}
          >
            {value === "all"
              ? ui("tracks.all", locale)
              : ui(`level.${value}` as DictKey, locale)}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => {
          const done = ready && progress.projects.includes(project.slug);
          const locked = planReady && !canAccessProject(project, planInfo);
          return (
            <Link
              key={project.slug}
              href={`/${locale}/projects/${project.slug}`}
              className={`card group flex flex-col gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)] ${
                done ? "border-[var(--success)]/50" : "hover:border-[color:var(--track)]"
              }`}
              style={{ ["--track" as string]: project.trackColor }}
            >
              <div className="flex items-center gap-2 text-xs">
                <span
                  className="rounded-full px-2.5 py-1 font-semibold"
                  style={{
                    backgroundColor: `color-mix(in oklab, ${project.trackColor} 20%, transparent)`,
                    color: project.trackColor,
                  }}
                >
                  {project.trackIcon} {project.trackName}
                </span>
                <span className="rounded-full bg-surface-2 px-2.5 py-1 font-medium text-muted">
                  {ui(`level.${project.level}` as DictKey, locale)}
                </span>
                {locked ? (
                  <span
                    className="ml-auto rounded-full bg-accent/15 px-2 py-0.5 font-semibold text-accent"
                    title={locale === "tr" ? "Premium gerekir" : "Requires Premium"}
                  >
                    💎 {locale === "tr" ? "Premium" : "Premium"}
                  </span>
                ) : done ? (
                  <span className="ml-auto font-bold text-[var(--success)]" aria-hidden>
                    ✓
                  </span>
                ) : null}
              </div>

              <h3 className="text-base font-bold tracking-tight">{project.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{project.summary}</p>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                {project.stack.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tool}
                  </span>
                ))}
                <span className="ml-auto text-xs font-semibold text-muted">
                  ~{project.hours} {ui("projects.hours", locale)} · +{project.xp} XP
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
