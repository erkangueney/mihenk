import { referenceGroups } from "@/content/reference";
import { t } from "./i18n";
import type { Locale, ReferenceEntry, ReferenceGroup } from "./types";

export { referenceGroups };

/** `grup/girdi` biçimindeki bağlantı anahtarı. */
export function referenceKey(groupSlug: string, entrySlug: string): string {
  return `${groupSlug}/${entrySlug}`;
}

export function getReferenceGroup(slug: string): ReferenceGroup | undefined {
  return referenceGroups.find((group) => group.slug === slug);
}

export function getReferenceEntry(groupSlug: string, entrySlug: string) {
  const group = getReferenceGroup(groupSlug);
  if (!group) return null;
  for (const section of group.sections) {
    const entry = section.entries.find((item) => item.slug === entrySlug);
    if (entry) return { group, section, entry };
  }
  return null;
}

export interface FlatReferenceEntry {
  key: string;
  groupSlug: string;
  groupName: string;
  groupIcon: string;
  groupColor: string;
  sectionTitle: string;
  entry: ReferenceEntry;
}

/** Tüm girdileri arama ve sayfa üretimi için düz listeye açar. */
export function flatReference(locale: Locale): FlatReferenceEntry[] {
  const list: FlatReferenceEntry[] = [];
  for (const group of referenceGroups) {
    for (const section of group.sections) {
      for (const entry of section.entries) {
        list.push({
          key: referenceKey(group.slug, entry.slug),
          groupSlug: group.slug,
          groupName: group.name,
          groupIcon: group.icon,
          groupColor: group.color,
          sectionTitle: t(section.title, locale),
          entry,
        });
      }
    }
  }
  return list;
}

export function referenceEntryCount(group: ReferenceGroup): number {
  return group.sections.reduce((sum, section) => sum + section.entries.length, 0);
}

export function totalReferenceEntries(): number {
  return referenceGroups.reduce((sum, group) => sum + referenceEntryCount(group), 0);
}

/**
 * Arama için tek bir metin gövdesi.
 *
 * Girdi adı, özeti, sözdizimi ve anahtar kelimeleri birlikte taranır;
 * kullanıcı "join" yazınca `INNER JOIN`'i, "eksik veri" yazınca `fillna`'yı
 * bulsun diye.
 */
export function searchHaystack(item: FlatReferenceEntry, locale: Locale): string {
  const { entry } = item;
  return [
    entry.name,
    entry.slug,
    t(entry.summary, locale),
    entry.description ? t(entry.description, locale) : "",
    entry.syntax,
    item.groupName,
    item.sectionTitle,
    ...(entry.keywords ?? []),
  ]
    .join(" ")
    .toLocaleLowerCase(locale === "tr" ? "tr-TR" : "en-US");
}
