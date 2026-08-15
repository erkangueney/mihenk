"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Avatar } from "@/components/avatar/avatar";
import { useProgress } from "@/components/progress-provider";
import { ProgressBar } from "@/components/ui/progress";
import { spendableXp, unlockedCount, avatarParts } from "@/lib/avatar";
import { badges, currentStreak, lastWeek, levelInfo, rankTitle } from "@/lib/gamification";
import { t, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export interface TrackProgressItem {
  slug: string;
  name: string;
  icon: string;
  color: string;
  lessonKeys: string[];
}

export function ProfileView({
  tracks,
  totalProjects,
  locale,
}: {
  tracks: TrackProgressItem[];
  totalProjects: number;
  locale: Locale;
}) {
  const { progress, ready, setDisplayName, reset, replaceAll } = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const info = levelInfo(progress.xp);
  const rank = rankTitle(info.level);
  const streak = currentStreak(progress.activeDays);
  const week = lastWeek(progress.activeDays);
  const owned = new Set(progress.badges);

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `veri-akademi-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = async (file: File) => {
    setImportError(null);
    try {
      const parsed = JSON.parse(await file.text());
      replaceAll(parsed);
    } catch {
      setImportError(
        locale === "tr" ? "Dosya okunamadı, geçerli bir yedek değil." : "Could not read the file.",
      );
    }
  };

  // İlerleme okunmadan render edilirse sunucu ve istemci farklı çıkar.
  if (!ready) {
    return <div className="card h-64 animate-pulse bg-surface-2/50" aria-hidden />;
  }

  return (
    <div className="space-y-6">
      {/* --------------------------- Üst kart --------------------------- */}
      <section className="card overflow-hidden">
        <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/avatar`}
              className="relative shrink-0 rounded-full transition hover:opacity-90"
              title={ui("avatar.cta", locale)}
            >
              <Avatar state={progress.avatar} size={80} />
              <span className="border-surface bg-accent text-on-accent absolute -right-1 -bottom-1 grid h-7 w-7 place-items-center rounded-full border-2 font-mono text-[11px] font-bold">
                {info.level}
              </span>
            </Link>
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                {ui("xp.level", locale)} {info.level} · {t(rank, locale)}
              </p>
              <p className="mt-1 text-2xl font-black tracking-tight">
                {progress.xp.toLocaleString(locale)}{" "}
                <span className="text-base font-semibold text-muted">XP</span>
              </p>
              <p className="mt-1 text-xs text-muted">
                {info.remaining.toLocaleString(locale)} XP {ui("xp.toNext", locale)}
              </p>
            </div>
          </div>

          <div className="sm:ml-auto sm:w-64">
            <label className="text-xs font-semibold tracking-wide text-muted uppercase">
              {ui("profile.name", locale)}
            </label>
            <input
              type="text"
              value={progress.displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder={ui("profile.namePlaceholder", locale)}
              className="mt-2 w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>
        <div className="border-t border-border px-5 py-4 sm:px-6">
          <ProgressBar value={info.ratio} />
        </div>
      </section>

      {/* ------------------------ İstatistik satırı ----------------------- */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: ui("home.stats.lessons", locale), value: progress.lessons.length, icon: "📘" },
          {
            label: ui("home.stats.projects", locale),
            value: `${progress.projects.length}/${totalProjects}`,
            icon: "🏗️",
          },
          {
            label: ui("badges.title", locale),
            value: `${progress.badges.length}/${badges.length}`,
            icon: "🏅",
          },
          {
            label: ui("streak.title", locale),
            value: `${streak} ${ui("streak.days", locale)}`,
            icon: "🔥",
          },
        ].map((stat) => (
          <div key={stat.label} className="card p-4">
            <span className="text-xl" aria-hidden>
              {stat.icon}
            </span>
            <p className="mt-2 text-xl font-black tracking-tight">{stat.value}</p>
            <p className="mt-0.5 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* --------------------------- Avatar --------------------------- */}
      <Link
        href={`/${locale}/avatar`}
        className="card flex items-center gap-4 p-5 transition hover:border-accent sm:p-6"
      >
        <Avatar state={progress.avatar} size={64} />
        <div className="min-w-0">
          <p className="font-bold">{ui("avatar.cta", locale)}</p>
          <p className="mt-1 text-sm text-muted">
            {spendableXp(progress).toLocaleString(locale)} XP {ui("avatar.balance", locale)} ·{" "}
            {unlockedCount(progress)}/{avatarParts.length} {ui("avatar.parts", locale)}
          </p>
        </div>
        <span aria-hidden className="ml-auto text-muted">
          →
        </span>
      </Link>

      {/* ---------------------------- Seri ---------------------------- */}
      <section className="card p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{ui("streak.title", locale)}</h2>
          <span className="text-sm text-muted">
            {week[6].active ? ui("streak.today", locale) : ui("streak.idle", locale)}
          </span>
        </div>
        <div className="mt-4 flex gap-2">
          {week.map((day) => (
            <div key={day.key} className="flex-1 text-center">
              <div
                className={`h-10 rounded-lg border transition ${
                  day.active
                    ? "border-transparent bg-accent"
                    : "border-border bg-surface-2"
                }`}
                title={day.key}
              />
              <span className="mt-1 block text-[10px] text-muted">{day.key.slice(5)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------ Patika ilerlemesi ----------------------- */}
      <section className="card p-5 sm:p-6">
        <h2 className="font-bold">{ui("profile.byTrack", locale)}</h2>
        {progress.lessons.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{ui("profile.empty", locale)}</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {tracks.map((track) => {
              const done = track.lessonKeys.filter((key) =>
                progress.lessons.includes(key),
              ).length;
              const ratio = track.lessonKeys.length === 0 ? 0 : done / track.lessonKeys.length;
              if (done === 0) return null;
              return (
                <li key={track.slug}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <Link
                      href={`/${locale}/learn/${track.slug}`}
                      className="font-medium hover:underline"
                    >
                      <span aria-hidden>{track.icon}</span> {track.name}
                    </Link>
                    <span className="text-xs text-muted">
                      {done}/{track.lessonKeys.length}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{ width: `${ratio * 100}%`, backgroundColor: track.color }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* --------------------------- Rozetler --------------------------- */}
      <section className="card p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{ui("badges.title", locale)}</h2>
          <span className="text-sm text-muted">
            {progress.badges.length} {ui("badges.earnedCount", locale)}
          </span>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => {
            const earned = owned.has(badge.id);
            return (
              <li
                key={badge.id}
                className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                  earned
                    ? "border-[var(--success)]/40 bg-[var(--success)]/8"
                    : "border-border bg-surface-2 opacity-60"
                }`}
              >
                <span className={`text-2xl ${earned ? "animate-pop" : "grayscale"}`} aria-hidden>
                  {badge.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{t(badge.title, locale)}</span>
                  <span className="block text-xs text-muted">
                    {earned ? t(badge.description, locale) : ui("badges.locked", locale)}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---------------------------- Veri ---------------------------- */}
      <section className="card p-5 sm:p-6">
        <h2 className="font-bold">{locale === "tr" ? "Verilerim" : "My data"}</h2>
        <p className="mt-2 text-sm text-muted">
          {locale === "tr"
            ? "İlerlemen şu an yalnızca bu tarayıcıda saklanıyor. Cihaz değiştirmeden önce yedeğini indir."
            : "Your progress currently lives only in this browser. Download a backup before switching devices."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportBackup}
            className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium"
          >
            ⬇ {ui("profile.export", locale)}
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium"
          >
            ⬆ {ui("profile.import", locale)}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void importBackup(file);
              event.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (window.confirm(ui("profile.resetConfirm", locale))) reset();
            }}
            className="ml-auto rounded-lg border border-[var(--danger)]/40 px-4 py-2 text-sm font-medium text-[var(--danger)]"
          >
            {ui("profile.reset", locale)}
          </button>
        </div>
        {importError ? (
          <p className="mt-3 text-sm text-[var(--danger)]">{importError}</p>
        ) : null}
      </section>
    </div>
  );
}
