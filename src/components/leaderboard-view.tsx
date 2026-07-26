"use client";

import { useProgress } from "@/components/progress-provider";
import { leaderboard, rankTitle } from "@/lib/gamification";
import { t, ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function LeaderboardView({ locale }: { locale: Locale }) {
  const { progress, ready } = useProgress();

  const rows = leaderboard({
    name: progress.displayName.trim() || ui("leaderboard.you", locale),
    xp: ready ? progress.xp : 0,
  });

  return (
    <div className="card overflow-hidden">
      <div className="thin-scroll overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs tracking-wide text-muted uppercase">
              <th className="px-4 py-3 font-semibold sm:px-6">{ui("leaderboard.rank", locale)}</th>
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
                      row.rank <= 3 ? "bg-gradient-to-br from-accent to-accent-2 text-white" : "bg-surface-2 text-muted"
                    }`}
                  >
                    {row.rank}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium sm:px-6">
                  {row.name}
                  {row.isYou ? (
                    <span className="ml-2 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {ui("leaderboard.you", locale)}
                    </span>
                  ) : null}
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
    </div>
  );
}
