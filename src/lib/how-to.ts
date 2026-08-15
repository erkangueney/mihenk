import { howTos } from "@/content/how-to";
import { getReferenceGroup } from "./reference";
import { t } from "./i18n";
import type { HowTo, Locale } from "./types";

export { howTos };

export function getHowTo(slug: string): HowTo | undefined {
  return howTos.find((item) => item.slug === slug);
}

/** Rehberde geçen aracın görsel kimliği — referans grubundan alınır. */
export function toolOf(slug: string) {
  const group = getReferenceGroup(slug);
  return {
    slug,
    name: group?.name ?? slug,
    icon: group?.icon ?? "📄",
    color: group?.color ?? "var(--accent)",
  };
}

/** Listede geçen araçlar, ilk görüldükleri sırayla. */
export function howToTools() {
  const seen = new Set<string>();
  const list: ReturnType<typeof toolOf>[] = [];
  for (const guide of howTos) {
    if (seen.has(guide.tool)) continue;
    seen.add(guide.tool);
    list.push(toolOf(guide.tool));
  }
  return list;
}

/** Arama gövdesi: başlık, özet, hızlı cevap ve anahtar kelimeler birlikte. */
export function howToHaystack(guide: HowTo, locale: Locale): string {
  return [
    t(guide.title, locale),
    t(guide.summary, locale),
    t(guide.answer.body, locale),
    guide.tool,
    ...(guide.keywords ?? []),
  ]
    .join(" ")
    .toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
}
