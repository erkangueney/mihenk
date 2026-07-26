import type {
  CalloutBlock,
  Check,
  CodeBlock,
  ExerciseBlock,
  HeadingBlock,
  Lesson,
  Localized,
  OrderBlock,
  QuizBlock,
  TextBlock,
} from "@/lib/types";

/**
 * İçerik yazımını kısaltan yardımcılar.
 * Her ders TR ve EN metnini yan yana tutar; böylece çeviri unutulmaz.
 */

export const L = (tr: string, en: string): Localized => ({ tr, en });

export const text = (tr: string, en: string): TextBlock => ({ type: "text", body: L(tr, en) });

export const heading = (tr: string, en: string): HeadingBlock => ({
  type: "heading",
  text: L(tr, en),
});

export const code = (lang: string, source: string, capTr?: string, capEn?: string): CodeBlock => ({
  type: "code",
  lang,
  code: source.trim(),
  caption: capTr && capEn ? L(capTr, capEn) : undefined,
});

export const callout = (
  variant: CalloutBlock["variant"],
  titleTr: string,
  titleEn: string,
  bodyTr: string,
  bodyEn: string,
): CalloutBlock => ({ type: "callout", variant, title: L(titleTr, titleEn), body: L(bodyTr, bodyEn) });

export const tip = (titleTr: string, titleEn: string, bodyTr: string, bodyEn: string) =>
  callout("tip", titleTr, titleEn, bodyTr, bodyEn);

export const pitfall = (titleTr: string, titleEn: string, bodyTr: string, bodyEn: string) =>
  callout("pitfall", titleTr, titleEn, bodyTr, bodyEn);

export const info = (titleTr: string, titleEn: string, bodyTr: string, bodyEn: string) =>
  callout("info", titleTr, titleEn, bodyTr, bodyEn);

export function quiz(config: {
  id: string;
  q: [string, string];
  options: [string, string][];
  answer: number;
  explain: [string, string];
  xp?: number;
}): QuizBlock {
  return {
    type: "quiz",
    id: config.id,
    question: L(...config.q),
    options: config.options.map(([tr, en]) => L(tr, en)),
    answer: config.answer,
    explanation: L(...config.explain),
    xp: config.xp ?? 15,
  };
}

export function order(config: {
  id: string;
  prompt: [string, string];
  lines: string[];
  xp?: number;
}): OrderBlock {
  return {
    type: "order",
    id: config.id,
    prompt: L(...config.prompt),
    lines: config.lines,
    xp: config.xp ?? 20,
  };
}

/** Python alıştırması. `checks` Python ifadeleri olarak yazılır. */
export function pyTask(config: {
  id: string;
  prompt: [string, string];
  starter: string;
  solution: string;
  hint?: [string, string];
  checks: { code: string; msg: [string, string] }[];
  xp?: number;
}): ExerciseBlock {
  return {
    type: "exercise",
    id: config.id,
    engine: "python",
    prompt: L(...config.prompt),
    starter: config.starter.replace(/^\n/, "").trimEnd(),
    solution: config.solution.replace(/^\n/, "").trimEnd(),
    hint: config.hint ? L(...config.hint) : undefined,
    checks: config.checks.map(
      (check): Check => ({ kind: "expression", code: check.code, message: L(...check.msg) }),
    ),
    xp: config.xp ?? 30,
  };
}

/** SQL alıştırması. Doğrulama, referans sorgunun sonucuyla karşılaştırmadır. */
export function sqlTask(config: {
  id: string;
  dataset: string;
  prompt: [string, string];
  starter: string;
  solution: string;
  hint?: [string, string];
  /** Sonuç eşitliğine ek olarak kodda geçmesi istenen ifadeler. */
  mustContain?: { needle: string; msg: [string, string] }[];
  xp?: number;
}): ExerciseBlock {
  const checks: Check[] = [
    {
      kind: "resultEquals",
      message: L("Sorgu beklenen sonucu döndürüyor", "Query returns the expected result"),
    },
    ...(config.mustContain ?? []).map(
      (item): Check => ({ kind: "contains", needle: item.needle, message: L(...item.msg) }),
    ),
  ];
  return {
    type: "exercise",
    id: config.id,
    engine: "sql",
    dataset: config.dataset,
    prompt: L(...config.prompt),
    starter: config.starter.replace(/^\n/, "").trimEnd(),
    solution: config.solution.replace(/^\n/, "").trimEnd(),
    hint: config.hint ? L(...config.hint) : undefined,
    checks,
    xp: config.xp ?? 30,
  };
}

/**
 * Ders kurucusu. Blok yardımcıları TR/EN'i konumsal argüman olarak alırken
 * ders başlığı/özeti `L()` ile yazılır — çok satırlı metinlerde okunması kolay.
 */
export function lesson(config: {
  slug: string;
  title: Localized;
  summary: Localized;
  minutes: number;
  blocks: Lesson["blocks"];
}): Lesson {
  return { ...config };
}
