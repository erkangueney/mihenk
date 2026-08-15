"use client";

import { useProgress } from "@/components/progress-provider";
import { ui } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

/** Projeyi tamamlandı olarak işaretler. Geri alınabilir — yanlış tıklama ceza olmasın. */
export function ProjectComplete({
  slug,
  xp,
  locale,
}: {
  slug: string;
  xp: number;
  locale: Locale;
}) {
  const { isProjectDone, toggleProject, ready } = useProgress();
  const done = ready && isProjectDone(slug);

  return (
    <div className="card flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
      <div>
        <p className="font-semibold">
          {done ? `✓ ${ui("projects.done", locale)}` : ui("projects.markDone", locale)}
        </p>
        <p className="mt-1 text-sm text-muted">
          {done
            ? locale === "tr"
              ? "Bu proje portföyünde. İstersen işareti kaldırabilirsin."
              : "This project is in your portfolio. You can unmark it if you want."
            : locale === "tr"
              ? `Teslimatları tamamladıysan işaretle ve ${xp} XP kazan.`
              : `Mark it once the deliverables are done and earn ${xp} XP.`}
        </p>
      </div>
      <button
        type="button"
        onClick={() => toggleProject(slug, xp)}
        className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
          done
            ? "border border-border bg-surface-2 text-muted"
            : "bg-accent text-on-accent hover:bg-accent-2"
        }`}
      >
        {done
          ? locale === "tr"
            ? "İşareti kaldır"
            : "Unmark"
          : `${ui("projects.markDone", locale)} · +${xp} XP`}
      </button>
    </div>
  );
}
