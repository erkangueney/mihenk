"use client";

import { useMemo, useState } from "react";
import { TrackCard, type TrackCardData } from "@/components/track-card";
import { ui, type DictKey } from "@/lib/i18n";
import type { Locale, TrackCategory } from "@/lib/types";

export interface ExplorerTrack extends TrackCardData {
  category: TrackCategory;
}

const categories: TrackCategory[] = ["language", "bi", "platform", "foundation", "advanced"];

export function TrackExplorer({ tracks, locale }: { tracks: ExplorerTrack[]; locale: Locale }) {
  const [active, setActive] = useState<TrackCategory | "all">("all");

  // Boş kategori sekmesi göstermemek için yalnızca dolu olanları listele.
  const available = useMemo(
    () => categories.filter((category) => tracks.some((track) => track.category === category)),
    [tracks],
  );

  const visible = active === "all" ? tracks : tracks.filter((track) => track.category === active);

  return (
    <>
      <div className="thin-scroll -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <FilterChip
          label={ui("tracks.all", locale)}
          active={active === "all"}
          onClick={() => setActive("all")}
        />
        {available.map((category) => (
          <FilterChip
            key={category}
            label={ui(`category.${category}` as DictKey, locale)}
            active={active === category}
            onClick={() => setActive(category)}
          />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((track) => (
          <TrackCard key={track.slug} track={track} locale={locale} />
        ))}
      </div>
    </>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
        active
          ? "border-accent bg-accent text-on-accent"
          : "border-border bg-surface text-muted hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}
