import { L } from "@/content/helpers";
import type { Block, HowTo, HowToStep } from "@/lib/types";

type Pair = [tr: string, en: string];

/** Adım: başlık + gövde, isteğe bağlı kod. */
export function step(config: {
  title: Pair;
  body: Pair;
  code?: string;
  lang?: string;
}): HowToStep {
  return {
    title: L(...config.title),
    body: L(...config.body),
    code: config.code?.replace(/^\n/, "").trimEnd(),
    lang: config.lang,
  };
}

export function howTo(config: {
  slug: string;
  title: Pair;
  summary: Pair;
  tool: string;
  trackSlug?: string;
  minutes: number;
  updated: string;
  answer: { body: Pair; code?: string; lang?: string };
  steps: HowToStep[];
  blocks?: Block[];
  faq?: { q: Pair; a: Pair }[];
  related?: string[];
  keywords?: string[];
}): HowTo {
  return {
    slug: config.slug,
    title: L(...config.title),
    summary: L(...config.summary),
    tool: config.tool,
    trackSlug: config.trackSlug,
    minutes: config.minutes,
    updated: config.updated,
    answer: {
      body: L(...config.answer.body),
      code: config.answer.code?.replace(/^\n/, "").trimEnd(),
      lang: config.answer.lang,
    },
    steps: config.steps,
    blocks: config.blocks,
    faq: config.faq?.map((item) => ({ q: L(...item.q), a: L(...item.a) })),
    related: config.related,
    keywords: config.keywords,
  };
}
