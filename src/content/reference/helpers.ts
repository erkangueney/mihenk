import { L, playground } from "@/content/helpers";
import type {
  CodeEngine,
  ReferenceEntry,
  ReferenceGroup,
  ReferenceSection,
} from "@/lib/types";

/**
 * Referans girdisi yazım yardımcıları.
 *
 * Ders bloklarındaki gibi TR/EN yan yana verilir; biri unutulursa
 * `npm run typecheck` hata verir.
 */

type Pair = [tr: string, en: string];

export function entry(config: {
  slug: string;
  name: string;
  summary: Pair;
  syntax: string;
  description?: Pair;
  /** [parametre adı, TR açıklama, EN açıklama] */
  params?: [string, string, string][];
  returns?: Pair;
  example?: { code: string; note?: Pair };
  /** Sayfada çalıştırılabilir "kendin dene" bloğu. */
  try?: { engine: CodeEngine; code: string; dataset?: string };
  related?: string[];
  keywords?: string[];
}): ReferenceEntry {
  return {
    slug: config.slug,
    name: config.name,
    summary: L(...config.summary),
    syntax: config.syntax.replace(/^\n/, "").trimEnd(),
    description: config.description ? L(...config.description) : undefined,
    params: config.params?.map(([name, tr, en]) => ({ name, text: L(tr, en) })),
    returns: config.returns ? L(...config.returns) : undefined,
    example: config.example
      ? {
          code: config.example.code.replace(/^\n/, "").trimEnd(),
          note: config.example.note ? L(...config.example.note) : undefined,
        }
      : undefined,
    playground: config.try
      ? playground({
          engine: config.try.engine,
          code: config.try.code,
          dataset: config.try.dataset,
        })
      : undefined,
    related: config.related,
    keywords: config.keywords,
  };
}

export function section(id: string, title: Pair, entries: ReferenceEntry[]): ReferenceSection {
  return { id, title: L(...title), entries };
}

export function group(config: {
  slug: string;
  name: string;
  icon: string;
  color: string;
  lang: string;
  tagline: Pair;
  description: Pair;
  trackSlug?: string;
  sections: ReferenceSection[];
}): ReferenceGroup {
  return {
    ...config,
    tagline: L(...config.tagline),
    description: L(...config.description),
  };
}
