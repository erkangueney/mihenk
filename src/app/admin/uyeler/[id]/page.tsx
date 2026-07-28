import Link from "next/link";
import { notFound } from "next/navigation";
import { getMember } from "@/lib/admin/queries";
import {
  MemberDangerZone,
  MemberPasswordForms,
  MemberSettingsForm,
} from "@/components/admin/member-actions";
import { Badge, StatCard } from "@/components/admin/ui";
import { badges, currentStreak, levelInfo, rankTitle } from "@/lib/gamification";
import { lessonKeyOf } from "@/lib/content";
import { getTracks } from "@/lib/content-docs/resolve";

function formatDateTime(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("tr", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getMember(id);
  if (!detail) notFound();

  const { member, progress } = detail;
  const info = levelInfo(member.xp);
  const streak = currentStreak(progress?.active_days ?? []);
  const owned = new Set(progress?.badges ?? []);
  const doneLessons = new Set(progress?.lessons ?? []);

  // Patika bazlı ilerleme — hangi konuda nerede olduğunu görmek için.
  const perTrack = (await getTracks())
    .map((track) => {
      const keys = track.levels
        .flatMap((level) => level.lessons)
        .map((lesson) => lessonKeyOf(track.slug, lesson.slug));
      const done = keys.filter((key) => doneLessons.has(key)).length;
      return { track, done, total: keys.length };
    })
    .filter((row) => row.done > 0)
    .sort((a, b) => b.done / b.total - a.done / a.total);

  return (
    <div className="space-y-6">
      <nav className="text-sm">
        <Link href="/admin/uyeler" className="text-muted transition hover:text-text">
          ← Üyeler
        </Link>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="flex flex-wrap items-center gap-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {member.display_name || "(adsız)"}
            {member.role === "admin" ? <Badge tone="accent">yönetici</Badge> : null}
            {member.suspended ? <Badge tone="danger">askıda</Badge> : null}
            {member.hidden_from_leaderboard ? <Badge>liderlikte gizli</Badge> : null}
          </h1>
          <p className="mt-1 truncate text-sm text-muted">{member.email}</p>
          <p className="mt-1 text-xs text-muted">
            Katılım: {formatDateTime(member.created_at)} · Son etkinlik:{" "}
            {formatDateTime(member.last_active)}
          </p>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="XP"
          value={member.xp}
          hint={`Seviye ${info.level} · ${rankTitle(info.level).tr}`}
        />
        <StatCard label="Ders" value={member.lessons_done} />
        <StatCard label="Proje" value={member.projects_done} />
        <StatCard
          label="Seri"
          value={`${streak} gün`}
          hint={`${member.active_days_count} aktif gün`}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card p-4 sm:p-5">
          <h2 className="mb-4 font-semibold">Patika ilerlemesi</h2>
          {perTrack.length === 0 ? (
            <p className="text-sm text-muted">Henüz hiçbir derste ilerleme yok.</p>
          ) : (
            <ul className="space-y-3">
              {perTrack.map(({ track, done, total }) => (
                <li key={track.slug}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">
                      <span aria-hidden>{track.icon}</span> {track.name}
                    </span>
                    <span className="tabular-nums text-muted">
                      {done}/{total}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-2 to-accent"
                      style={{ width: `${Math.round((done / total) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card p-4 sm:p-5">
          <h2 className="mb-4 font-semibold">
            Rozetler{" "}
            <span className="text-sm font-normal text-muted">
              {owned.size}/{badges.length}
            </span>
          </h2>
          <ul className="flex flex-wrap gap-2">
            {badges.map((badge) => {
              const has = owned.has(badge.id);
              return (
                <li
                  key={badge.id}
                  title={badge.description.tr}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs ${
                    has
                      ? "border-accent/40 bg-accent/10 text-text"
                      : "border-border bg-surface-2 text-muted opacity-60"
                  }`}
                >
                  <span aria-hidden>{badge.icon}</span>
                  {badge.title.tr}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <MemberSettingsForm member={member} />
        <MemberPasswordForms member={member} />
      </div>

      <MemberDangerZone member={member} />
    </div>
  );
}
