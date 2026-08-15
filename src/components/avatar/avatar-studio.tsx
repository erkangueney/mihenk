"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/avatar/avatar";
import { useProgress } from "@/components/progress-provider";
import { ProgressRing } from "@/components/ui/progress";
import {
  avatarParts,
  badgeById,
  partStatus,
  partsForSlot,
  spendableXp,
  unlockedCount,
  type AvatarPart,
  type Rarity,
} from "@/lib/avatar";
import { levelInfo, rankTitle } from "@/lib/gamification";
import { t, ui } from "@/lib/i18n";
import type { AvatarSlot, Locale } from "@/lib/types";

const slots: AvatarSlot[] = ["base", "outfit", "accessory", "effect"];

const slotLabel: Record<AvatarSlot, Parameters<typeof ui>[0]> = {
  base: "avatar.slot.base",
  outfit: "avatar.slot.outfit",
  accessory: "avatar.slot.accessory",
  effect: "avatar.slot.effect",
};

const rarityStyle: Record<Rarity, string> = {
  common: "border-border text-muted",
  rare: "border-[var(--success)]/50 text-[var(--success)]",
  epic: "border-accent/60 text-accent",
  legendary: "border-[var(--warning)]/60 text-[var(--warning)]",
};

const rarityLabel: Record<Rarity, Parameters<typeof ui>[0]> = {
  common: "avatar.rarity.common",
  rare: "avatar.rarity.rare",
  epic: "avatar.rarity.epic",
  legendary: "avatar.rarity.legendary",
};

export function AvatarStudio({ locale }: { locale: Locale }) {
  const { progress, ready, unlockAvatarPart, equipAvatarPart } = useProgress();
  const [slot, setSlot] = useState<AvatarSlot>("base");

  if (!ready) {
    return <div className="card h-96 animate-pulse bg-surface-2/50" aria-hidden />;
  }

  const info = levelInfo(progress.xp);
  const balance = spendableXp(progress);
  const parts = partsForSlot(slot);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
      {/* ---------------------- Önizleme ve bakiye ---------------------- */}
      <section className="card overflow-hidden lg:sticky lg:top-24">
        <div className="flex flex-col items-center gap-4 p-6">
          <div className="relative">
            <Avatar state={progress.avatar} size={168} />
            <span className="absolute -right-1 -bottom-1 grid h-10 w-10 place-items-center rounded-full border-2 border-bg bg-gradient-to-br from-accent-2 to-accent text-sm font-black text-on-accent">
              {info.level}
            </span>
          </div>

          <div className="text-center">
            <p className="font-display text-lg font-semibold">
              {progress.displayName || (locale === "tr" ? "Öğrenci" : "Learner")}
            </p>
            <p className="text-xs text-muted">{t(rankTitle(info.level), locale)}</p>
          </div>

          <div className="grid w-full grid-cols-2 gap-2">
            <div className="rounded-xl border border-border bg-surface-2 p-3 text-center">
              <p className="text-lg font-black tracking-tight text-accent">
                {balance.toLocaleString(locale)}
              </p>
              <p className="text-[11px] text-muted">{ui("avatar.balance", locale)}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-2 p-3 text-center">
              <p className="text-lg font-black tracking-tight">
                {unlockedCount(progress)}/{avatarParts.length}
              </p>
              <p className="text-[11px] text-muted">{ui("avatar.parts", locale)}</p>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface-2 p-3">
            <ProgressRing value={info.ratio} size={44} stroke={5} />
            <div className="min-w-0 text-xs text-muted">
              <p className="font-semibold text-text">
                {ui("xp.level", locale)} {info.level} · {progress.xp.toLocaleString(locale)} XP
              </p>
              <p>
                {ui("avatar.spent", locale)}: {progress.avatar.spent.toLocaleString(locale)} XP
              </p>
            </div>
          </div>

          <p className="text-center text-xs leading-5 text-muted">
            {ui("avatar.progressHint", locale)}
          </p>

          <Link
            href={`/${locale}/learn`}
            className="btn-ghost w-full px-4 py-2.5 text-sm"
          >
            {ui("home.cta.start", locale)} →
          </Link>
        </div>
      </section>

      {/* -------------------------- Parçalar --------------------------- */}
      <section>
        <div className="mb-4 flex flex-wrap gap-2">
          {slots.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSlot(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                slot === item
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border bg-surface-2 text-muted hover:text-text"
              }`}
            >
              {ui(slotLabel[item], locale)}
            </button>
          ))}
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {/* Aksesuar ve efekt boş bırakılabilir. */}
          {slot === "accessory" || slot === "effect" ? (
            <li>
              <button
                type="button"
                onClick={() => equipAvatarPart(slot, null)}
                className={`card flex h-full w-full items-center gap-3 p-4 text-left transition hover:border-accent ${
                  progress.avatar[slot] === null ? "border-accent" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-dashed border-border text-muted"
                >
                  ✕
                </span>
                <span>
                  <span className="block text-sm font-semibold">{ui("avatar.none", locale)}</span>
                  <span className="block text-xs text-muted">
                    {progress.avatar[slot] === null
                      ? ui("avatar.equipped", locale)
                      : ui("avatar.remove", locale)}
                  </span>
                </span>
              </button>
            </li>
          ) : null}

          {parts.map((part) => (
            <li key={part.id}>
              <PartCard
                part={part}
                locale={locale}
                equipped={progress.avatar[part.slot] === part.id}
                status={partStatus(part, progress)}
                onUnlock={() => unlockAvatarPart(part.id)}
                onEquip={() => equipAvatarPart(part.slot, part.id)}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function PartCard({
  part,
  locale,
  equipped,
  status,
  onUnlock,
  onEquip,
}: {
  part: AvatarPart;
  locale: Locale;
  equipped: boolean;
  status: ReturnType<typeof partStatus>;
  onUnlock: () => void;
  onEquip: () => void;
}) {
  const owned = status.state === "owned";
  const badge = part.badge ? badgeById(part.badge) : undefined;

  return (
    <div
      className={`card flex h-full flex-col gap-3 p-4 transition ${
        equipped ? "border-accent" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Parça, boş bir avatar üstünde tek başına önizlenir. */}
        <span className="shrink-0">
          <Avatar state={previewState(part)} size={56} animated={false} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{t(part.name, locale)}</p>
          <p className="mt-0.5 text-xs leading-5 text-muted">{t(part.description, locale)}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${rarityStyle[part.rarity]}`}
        >
          {ui(rarityLabel[part.rarity], locale)}
        </span>

        {equipped ? (
          <span className="ml-auto text-xs font-semibold text-accent">
            ✓ {ui("avatar.equipped", locale)}
          </span>
        ) : owned ? (
          <button
            type="button"
            onClick={onEquip}
            className="ml-auto rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs font-semibold transition hover:border-accent"
          >
            {ui("avatar.equip", locale)}
          </button>
        ) : status.state === "buyable" ? (
          <button
            type="button"
            onClick={onUnlock}
            className="ml-auto rounded-lg bg-gradient-to-r from-accent to-accent-2 px-3 py-1.5 text-xs font-bold text-on-accent"
          >
            {status.cost > 0
              ? `${ui("avatar.unlock", locale)} · ${status.cost.toLocaleString(locale)} XP`
              : ui("avatar.unlock", locale)}
          </button>
        ) : (
          <span className="ml-auto text-right text-[11px] leading-4 text-muted">
            🔒{" "}
            {status.reason === "level"
              ? `${ui("avatar.needLevel", locale)} ${status.level} ${ui("avatar.needLevelSuffix", locale)}`
              : status.reason === "badge"
                ? `${badge?.icon ?? "🏅"} ${badge ? t(badge.title, locale) : part.badge}`
                : `${ui("avatar.notEnough", locale)} · ${status.missing.toLocaleString(locale)} XP`}
          </span>
        )}
      </div>
    </div>
  );
}

/** Kart önizlemesi: yalnızca ilgili parça takılı, gerisi nötr. */
function previewState(part: AvatarPart) {
  return {
    base: part.slot === "base" ? part.id : "base-classic",
    outfit: part.slot === "outfit" ? part.id : "outfit-tee",
    accessory: part.slot === "accessory" ? part.id : null,
    effect: part.slot === "effect" ? part.id : null,
    unlocked: [] as string[],
    spent: 0,
  };
}
