import { badges, levelInfo } from "./gamification";
import type { AvatarSlot, AvatarState, Localized, ProgressState } from "./types";

/**
 * Avatar sistemi.
 *
 * Üç kural:
 *  1. Parçalar **veri**dir, çizim tek bir SVG bileşenidir — yeni parça eklemek
 *     için bileşene dokunulmaz (bkz. `src/components/avatar/avatar.tsx`).
 *  2. Harcama seviyeyi düşürmez. Seviye ham `xp`'den, harcanabilir bakiye
 *     `xp - avatar.spent`'ten hesaplanır.
 *  3. Bir parça ya ücretsizdir, ya seviye/rozetle açılır, ya da XP ile alınır.
 *     Kilit koşulu sağlanmadan satın alınamaz.
 */

export type Rarity = "common" | "rare" | "epic" | "legendary";

/** Çizim için gereken görsel tanım — slota göre farklı alanlar dolar. */
export interface AvatarLook {
  /** base: ten rengi */
  skin?: string;
  /** base: saç biçimi */
  hair?: "short" | "curly" | "bun" | "long" | "none" | "scarf" | "cap";
  hairColor?: string;
  /** outfit: giysi rengi ve yakası */
  fill?: string;
  collar?: "tee" | "hoodie" | "shirt" | "blazer" | "lab" | "cape";
  /** accessory: aksesuar biçimi */
  gear?: "glasses" | "shades" | "headphones" | "cap" | "laurel" | "monocle" | "beanie" | "visor";
  /** effect: efekt biçimi */
  effect?: "glow" | "ring" | "sparks" | "aurora" | "orbit" | "crown-light";
  accent?: string;
}

export interface AvatarPart {
  id: string;
  slot: AvatarSlot;
  name: Localized;
  description: Localized;
  rarity: Rarity;
  /** XP maliyeti. 0 = ücretsiz. */
  cost: number;
  /** Açılması için gereken seviye. */
  level?: number;
  /** Açılması için gereken rozet id'si (bkz. gamification.ts). */
  badge?: string;
  look: AvatarLook;
}

const L = (tr: string, en: string): Localized => ({ tr, en });

/* ------------------------------------------------------------------ */
/* Katalog                                                             */
/* ------------------------------------------------------------------ */

export const avatarParts: AvatarPart[] = [
  /* --- Temel karakter ---------------------------------------------- */
  {
    id: "base-classic",
    slot: "base",
    name: L("Klasik", "Classic"),
    description: L("Başlangıç karakteri.", "The starter character."),
    rarity: "common",
    cost: 0,
    look: { skin: "#e8b98a", hair: "short", hairColor: "#3b2a1f" },
  },
  {
    id: "base-curly",
    slot: "base",
    name: L("Kıvırcık", "Curly"),
    description: L("Hacimli saç, sıcak ton.", "Voluminous hair, warm tone."),
    rarity: "common",
    cost: 0,
    look: { skin: "#c98a55", hair: "curly", hairColor: "#241812" },
  },
  {
    id: "base-bun",
    slot: "base",
    name: L("Topuz", "Bun"),
    description: L("Toplanmış saç, derli toplu.", "Hair tied up and tidy."),
    rarity: "common",
    cost: 0,
    look: { skin: "#f2cda6", hair: "bun", hairColor: "#4a2c17" },
  },
  {
    id: "base-scarf",
    slot: "base",
    name: L("Başörtülü", "Headscarf"),
    description: L("Zarif bir başörtüsü.", "An elegant headscarf."),
    rarity: "common",
    cost: 0,
    look: { skin: "#e0a97a", hair: "scarf", hairColor: "#7c5714" },
  },
  {
    id: "base-long",
    slot: "base",
    name: L("Uzun saç", "Long hair"),
    description: L("Omuz hizasında saç.", "Shoulder-length hair."),
    rarity: "common",
    cost: 120,
    look: { skin: "#8d5a3b", hair: "long", hairColor: "#1c1310" },
  },
  {
    id: "base-bald",
    slot: "base",
    name: L("Sade", "Clean"),
    description: L("Saçsız, net.", "No hair, all focus."),
    rarity: "common",
    cost: 120,
    look: { skin: "#6b4029", hair: "none" },
  },
  {
    id: "base-silver",
    slot: "base",
    name: L("Gümüş", "Silver"),
    description: L("Kırlaşmış saç — tecrübenin rengi.", "Silvered hair — the colour of experience."),
    rarity: "rare",
    cost: 400,
    level: 5,
    look: { skin: "#f2cda6", hair: "short", hairColor: "#b9bec9" },
  },
  {
    id: "base-neon",
    slot: "base",
    name: L("Neon", "Neon"),
    description: L("Mor saç. Kural yok.", "Purple hair. No rules."),
    rarity: "epic",
    cost: 900,
    level: 8,
    look: { skin: "#e8b98a", hair: "curly", hairColor: "#a855f7" },
  },

  /* --- Kıyafet ------------------------------------------------------ */
  {
    id: "outfit-tee",
    slot: "outfit",
    name: L("Tişört", "T-shirt"),
    description: L("Sade başlangıç.", "A plain start."),
    rarity: "common",
    cost: 0,
    look: { fill: "#3f4a63", collar: "tee" },
  },
  {
    id: "outfit-hoodie",
    slot: "outfit",
    name: L("Kapüşonlu", "Hoodie"),
    description: L("Gece analizlerinin resmî kıyafeti.", "The official uniform of late-night analysis."),
    rarity: "common",
    cost: 200,
    look: { fill: "#2f6f5b", collar: "hoodie" },
  },
  {
    id: "outfit-shirt",
    slot: "outfit",
    name: L("Gömlek", "Shirt"),
    description: L("Sunum günü.", "Presentation day."),
    rarity: "common",
    cost: 200,
    look: { fill: "#4d7fb8", collar: "shirt" },
  },
  {
    id: "outfit-blazer",
    slot: "outfit",
    name: L("Ceket", "Blazer"),
    description: L("Yönetim toplantısına hazır.", "Ready for the steering meeting."),
    rarity: "rare",
    cost: 500,
    level: 5,
    look: { fill: "#2b3348", collar: "blazer" },
  },
  {
    id: "outfit-lab",
    slot: "outfit",
    name: L("Laboratuvar önlüğü", "Lab coat"),
    description: L("Makine öğrenmesi patikasında 3 ders bitir.", "Finish 3 lessons in the machine learning track."),
    rarity: "rare",
    cost: 0,
    badge: "machine-mind",
    look: { fill: "#e9eef7", collar: "lab" },
  },
  {
    id: "outfit-gold",
    slot: "outfit",
    name: L("Altın yaka", "Gold collar"),
    description: L("2.000 XP topla.", "Collect 2,000 XP."),
    rarity: "epic",
    cost: 0,
    badge: "grinder",
    look: { fill: "#d9a84e", collar: "blazer" },
  },
  {
    id: "outfit-cape",
    slot: "outfit",
    name: L("Pelerin", "Cape"),
    description: L("5 uçtan uca proje tamamla.", "Complete 5 end-to-end projects."),
    rarity: "legendary",
    cost: 0,
    badge: "portfolio",
    look: { fill: "#7c3aed", collar: "cape" },
  },

  /* --- Aksesuar ----------------------------------------------------- */
  {
    id: "acc-glasses",
    slot: "accessory",
    name: L("Gözlük", "Glasses"),
    description: L("Ekrana çok bakmanın sonucu.", "The result of too much screen time."),
    rarity: "common",
    cost: 150,
    look: { gear: "glasses", accent: "#1f2937" },
  },
  {
    id: "acc-headphones",
    slot: "accessory",
    name: L("Kulaklık", "Headphones"),
    description: L("Odak modu.", "Focus mode."),
    rarity: "common",
    cost: 250,
    look: { gear: "headphones", accent: "#ef4444" },
  },
  {
    id: "acc-cap",
    slot: "accessory",
    name: L("Şapka", "Cap"),
    description: L("İlk dersini tamamla.", "Complete your first lesson."),
    rarity: "common",
    cost: 0,
    badge: "first-step",
    look: { gear: "cap", accent: "#2f6f5b" },
  },
  {
    id: "acc-beanie",
    slot: "accessory",
    name: L("Bere", "Beanie"),
    description: L("7 gün üst üste çalış.", "Study 7 days in a row."),
    rarity: "rare",
    cost: 0,
    badge: "week-streak",
    look: { gear: "beanie", accent: "#f97316" },
  },
  {
    id: "acc-shades",
    slot: "accessory",
    name: L("Güneş gözlüğü", "Shades"),
    description: L("Sorgu bir seferde çalıştı.", "The query worked on the first try."),
    rarity: "rare",
    cost: 600,
    level: 6,
    look: { gear: "shades", accent: "#111827" },
  },
  {
    id: "acc-visor",
    slot: "accessory",
    name: L("Vizör", "Visor"),
    description: L("Veriyi doğrudan görürsün.", "You see the data directly."),
    rarity: "epic",
    cost: 1200,
    level: 10,
    look: { gear: "visor", accent: "#22d3ee" },
  },
  {
    id: "acc-laurel",
    slot: "accessory",
    name: L("Defne tacı", "Laurel wreath"),
    description: L("30 gün üst üste çalış.", "Study 30 days in a row."),
    rarity: "legendary",
    cost: 0,
    badge: "month-streak",
    look: { gear: "laurel", accent: "#d9a84e" },
  },

  /* --- Görsel efekt -------------------------------------------------- */
  {
    id: "fx-glow",
    slot: "effect",
    name: L("Işıma", "Glow"),
    description: L("Yumuşak bir hâle.", "A soft halo."),
    rarity: "common",
    cost: 300,
    level: 3,
    look: { effect: "glow", accent: "#d9a84e" },
  },
  {
    id: "fx-ring",
    slot: "effect",
    name: L("Halka", "Ring"),
    description: L("Dönen bir çember.", "A rotating circle."),
    rarity: "rare",
    cost: 700,
    level: 7,
    look: { effect: "ring", accent: "#38bdf8" },
  },
  {
    id: "fx-sparks",
    slot: "effect",
    name: L("Kıvılcım", "Sparks"),
    description: L("4 farklı patikada ders tamamla.", "Complete lessons in 4 different tracks."),
    rarity: "rare",
    cost: 0,
    badge: "polyglot",
    look: { effect: "sparks", accent: "#f0d795" },
  },
  {
    id: "fx-orbit",
    slot: "effect",
    name: L("Yörünge", "Orbit"),
    description: L("30 ders tamamla.", "Complete 30 lessons."),
    rarity: "epic",
    cost: 0,
    badge: "scholar",
    look: { effect: "orbit", accent: "#a855f7" },
  },
  {
    id: "fx-aurora",
    slot: "effect",
    name: L("Kutup ışığı", "Aurora"),
    description: L("Seviye 12'de açılır.", "Unlocks at level 12."),
    rarity: "legendary",
    cost: 2000,
    level: 12,
    look: { effect: "aurora", accent: "#3ecf8e" },
  },
];

/* ------------------------------------------------------------------ */
/* Sorgular                                                            */
/* ------------------------------------------------------------------ */

const byId = new Map(avatarParts.map((part) => [part.id, part]));

export function getAvatarPart(id: string | null | undefined): AvatarPart | undefined {
  return id ? byId.get(id) : undefined;
}

export function partsForSlot(slot: AvatarSlot): AvatarPart[] {
  return avatarParts.filter((part) => part.slot === slot);
}

/** Hiçbir seçim yapılmamış kullanıcının avatarı. */
export function defaultAvatar(): AvatarState {
  return {
    base: "base-classic",
    outfit: "outfit-tee",
    accessory: null,
    effect: null,
    unlocked: [],
    spent: 0,
  };
}

/** Ücretsiz parçalar herkeste vardır; `unlocked` listesinde tutulmazlar. */
export function isFree(part: AvatarPart): boolean {
  return part.cost === 0 && !part.level && !part.badge;
}

export type PartStatus =
  | { state: "owned" }
  | { state: "buyable"; cost: number }
  | { state: "locked"; reason: "level"; level: number }
  | { state: "locked"; reason: "badge"; badge: string }
  | { state: "locked"; reason: "xp"; cost: number; missing: number };

/** Harcanabilir bakiye — kazanılan XP eksi avatara harcanan. */
export function spendableXp(progress: ProgressState): number {
  return Math.max(0, progress.xp - (progress.avatar?.spent ?? 0));
}

/**
 * Bir parçanın kullanıcı için durumu.
 *
 * Sıra önemli: önce sahiplik, sonra seviye/rozet kilidi, en sonda bakiye.
 * Böylece kilitli bir parçada "yeterli XP yok" yerine gerçek sebep gösterilir.
 */
export function partStatus(part: AvatarPart, progress: ProgressState): PartStatus {
  const avatar = progress.avatar ?? defaultAvatar();
  if (isFree(part) || avatar.unlocked.includes(part.id)) return { state: "owned" };

  if (part.level && levelInfo(progress.xp).level < part.level) {
    return { state: "locked", reason: "level", level: part.level };
  }
  if (part.badge && !progress.badges.includes(part.badge)) {
    return { state: "locked", reason: "badge", badge: part.badge };
  }
  if (part.cost === 0) return { state: "buyable", cost: 0 };

  const balance = spendableXp(progress);
  if (balance < part.cost) {
    return { state: "locked", reason: "xp", cost: part.cost, missing: part.cost - balance };
  }
  return { state: "buyable", cost: part.cost };
}

export function badgeById(id: string) {
  return badges.find((badge) => badge.id === id);
}

/** Kullanıcının açtığı parça sayısı (ücretsizler dahil). */
export function unlockedCount(progress: ProgressState): number {
  const free = avatarParts.filter(isFree).length;
  const owned = (progress.avatar?.unlocked ?? []).filter((id) => byId.has(id)).length;
  return free + owned;
}

/**
 * Depodan gelen avatarı güvene alır.
 *
 * Katalogdan kaldırılmış bir parça seçiliyse varsayılana düşer — eski bir
 * yedeği içe aktaran kullanıcı boş bir avatarla karşılaşmasın.
 */
export function normalizeAvatar(raw: unknown): AvatarState {
  const base = defaultAvatar();
  if (!raw || typeof raw !== "object") return base;
  const value = raw as Partial<AvatarState>;

  const valid = (id: unknown, slot: AvatarSlot): string | null => {
    if (typeof id !== "string") return null;
    const part = byId.get(id);
    return part && part.slot === slot ? id : null;
  };

  const unlocked = Array.isArray(value.unlocked)
    ? Array.from(new Set(value.unlocked.filter((id): id is string => typeof id === "string" && byId.has(id))))
    : [];

  return {
    base: valid(value.base, "base") ?? base.base,
    outfit: valid(value.outfit, "outfit") ?? base.outfit,
    accessory: valid(value.accessory, "accessory"),
    effect: valid(value.effect, "effect"),
    unlocked,
    spent:
      typeof value.spent === "number" && Number.isFinite(value.spent)
        ? Math.max(0, Math.round(value.spent))
        : 0,
  };
}
