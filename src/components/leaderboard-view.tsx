"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/avatar/avatar";
import { useProgress } from "@/components/progress-provider";
import { useSession } from "@/components/auth/session-provider";
import { defaultAvatar, normalizeAvatar } from "@/lib/avatar";
import { leaderboard, levelInfo, rankTitle } from "@/lib/gamification";
import { t, ui } from "@/lib/i18n";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import type { AvatarState, Locale } from "@/lib/types";

interface Row {
  rank: number;
  name: string;
  xp: number;
  level: number;
  isYou: boolean;
  avatar: AvatarState;
}

/**
 * Liderlik tablosu.
 *
 * Supabase açıksa gerçek sıralamayı `leaderboard_top()` ile çeker — bu
 * fonksiyon security definer olduğu için progress tablosunun RLS'ini
 * gevşetmeden yalnızca ad ve XP'yi dışarı verir. Supabase kapalıysa eski
 * örnek tabloya düşer, böylece anahtarsız kurulumda sayfa boş kalmaz.
 */
export function LeaderboardView({ locale }: { locale: Locale }) {
  const { progress, ready } = useProgress();
  const { user, enabled, ready: sessionReady } = useSession();

  const [remote, setRemote] = useState<Row[] | null>(null);
  const [state, setState] = useState<"loading" | "done" | "error">(
    enabled ? "loading" : "done",
  );

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase || !sessionReady) return;

    let cancelled = false;

    // İlerleme yazımı gecikmeli topaklandığı için kendi XP'miz tabloya
    // birkaç saniye gecikmeli yansıyabilir; bu beklenen davranış.
    void supabase.rpc("leaderboard_top", { row_limit: 50 }).then(({ data, error }) => {
      if (cancelled) return;
      if (error || !data) {
        setState("error");
        return;
      }
      setRemote(
        data.map((row) => ({
          rank: Number(row.rank),
          name: row.display_name,
          xp: row.xp,
          level: levelInfo(row.xp).level,
          isYou: Boolean(row.is_you),
          avatar: normalizeAvatar(row.avatar),
        })),
      );
      setState("done");
    });

    return () => {
      cancelled = true;
    };
    // Kendi XP'miz değiştiğinde sıralama tazelensin.
  }, [sessionReady, user?.id, progress.xp]);

  // Örnek tabloda yalnızca kendi avatarımız gerçek; rakipler varsayılanla çizilir.
  const sampleRows: Row[] = leaderboard({
    name: progress.displayName.trim() || ui("leaderboard.you", locale),
    xp: ready ? progress.xp : 0,
  }).map((row) => ({
    ...row,
    avatar: row.isYou ? progress.avatar : defaultAvatar(),
  }));

  const rows = enabled ? (remote ?? []) : sampleRows;

  return (
    <div className="space-y-4">
      {enabled && sessionReady && !user ? (
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-muted">
          {ui("auth.leaderboardCta", locale)}
          <Link href={`/${locale}/giris`} className="font-semibold text-accent hover:underline">
            {ui("auth.signIn", locale)} →
          </Link>
        </p>
      ) : null}

      {!enabled ? (
        <p className="rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning">
          {ui("auth.leaderboardSample", locale)}
        </p>
      ) : null}

      <div className="card overflow-hidden">
        {state === "loading" ? (
          <div className="space-y-2 p-4 sm:p-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-10 animate-pulse rounded-lg bg-surface-2" />
            ))}
          </div>
        ) : state === "error" ? (
          <p className="p-6 text-sm text-danger">
            {ui("auth.leaderboardError", locale)}
          </p>
        ) : rows.length === 0 ? (
          <p className="p-6 text-sm text-muted">
            {ui("auth.leaderboardEmpty", locale)}
          </p>
        ) : (
          <div className="thin-scroll overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-wide text-muted uppercase">
                  <th className="px-4 py-3 font-semibold sm:px-6">
                    {ui("leaderboard.rank", locale)}
                  </th>
                  <th className="px-4 py-3 font-semibold sm:px-6">
                    {ui("leaderboard.learner", locale)}
                  </th>
                  <th className="px-4 py-3 font-semibold sm:px-6">{ui("xp.level", locale)}</th>
                  <th className="px-4 py-3 text-right font-semibold sm:px-6">XP</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={`${row.rank}-${row.name}`}
                    className={`border-b border-border/60 last:border-0 ${
                      row.isYou ? "bg-accent/10" : ""
                    }`}
                  >
                    <td className="px-4 py-3 sm:px-6">
                      <span
                        className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                          row.rank <= 3
                            ? "bg-gradient-to-br from-accent to-accent-2 text-on-accent"
                            : "bg-surface-2 text-muted"
                        }`}
                      >
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium sm:px-6">
                      <span className="flex items-center gap-2.5">
                        <Avatar state={row.avatar} size={32} animated={false} />
                        <span>{row.name}</span>
                        {row.isYou ? (
                          <span className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-bold text-on-accent">
                            {ui("leaderboard.you", locale)}
                          </span>
                        ) : null}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted sm:px-6">
                      {row.level} · {t(rankTitle(row.level), locale)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums sm:px-6">
                      {row.xp.toLocaleString(locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
