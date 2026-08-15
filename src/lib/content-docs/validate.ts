import { levelOrder } from "@/lib/content";
import type { Block, Level, Lesson, Localized, Project, Track } from "@/lib/types";

/**
 * İçerik dokümanı doğrulayıcı.
 *
 * Veritabanındaki JSON, dosyadaki içerikle aynı yerlerde kullanılır — ders
 * sayfası, XP hesabı, liderlik. Şekli bozuk bir kayıt yayınlanırsa sayfa
 * render sırasında çöker. Bu yüzden hem yazmadan önce (admin action) hem
 * okurken (merge katmanı) buradan geçirilir.
 *
 * Hata mesajları yol bilgisiyle döner (`levels[0].lessons[2].blocks[1].xp`),
 * çünkü elle JSON düzenleyen birine "geçersiz doküman" demek yetmez.
 */

export type ValidationResult = { ok: true; slug: string } | { ok: false; message: string };

class Invalid extends Error {}

function bad(path: string, expected: string): never {
  throw new Invalid(`${path}: ${expected}`);
}

function obj(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) bad(path, "nesne olmalı");
  return value as Record<string, unknown>;
}

function str(value: unknown, path: string, { allowEmpty = false } = {}): string {
  if (typeof value !== "string") bad(path, "metin olmalı");
  if (!allowEmpty && value.trim() === "") bad(path, "boş olamaz");
  return value;
}

function num(value: unknown, path: string, { min = -Infinity } = {}): number {
  if (typeof value !== "number" || !Number.isFinite(value)) bad(path, "sayı olmalı");
  if (value < min) bad(path, `en az ${min} olmalı`);
  return value;
}

function arr(value: unknown, path: string, { min = 0 } = {}): unknown[] {
  if (!Array.isArray(value)) bad(path, "dizi olmalı");
  if (value.length < min) bad(path, `en az ${min} öğe içermeli`);
  return value;
}

/** Slug: URL'de görünüyor, bu yüzden dar tutuluyor. */
function slugOf(value: unknown, path: string): string {
  const text = str(value, path);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(text)) {
    bad(path, "yalnızca küçük harf, rakam ve tire içerebilir (örn. veri-temizleme)");
  }
  return text;
}

function localized(value: unknown, path: string): Localized {
  const record = obj(value, path);
  return {
    tr: str(record.tr, `${path}.tr`),
    // İngilizce isteğe bağlı: yoksa arayüz Türkçeye düşer.
    en: typeof record.en === "string" ? record.en : str(record.tr, `${path}.tr`),
  };
}

function optionalLocalized(value: unknown, path: string): Localized | undefined {
  return value === undefined || value === null ? undefined : localized(value, path);
}

/* ------------------------------------------------------------------ */
/* Bloklar                                                             */
/* ------------------------------------------------------------------ */

const BLOCK_TYPES = [
  "text",
  "heading",
  "code",
  "callout",
  "quiz",
  "order",
  "exercise",
  "playground",
] as const;

function block(value: unknown, path: string): Block {
  const record = obj(value, path);
  const type = str(record.type, `${path}.type`);

  if (!(BLOCK_TYPES as readonly string[]).includes(type)) {
    bad(`${path}.type`, `şunlardan biri olmalı: ${BLOCK_TYPES.join(", ")}`);
  }

  switch (type) {
    case "text":
      return { type: "text", body: localized(record.body, `${path}.body`) };

    case "heading":
      return { type: "heading", text: localized(record.text, `${path}.text`) };

    case "code":
      return {
        type: "code",
        lang: str(record.lang, `${path}.lang`),
        code: str(record.code, `${path}.code`, { allowEmpty: true }),
        caption: optionalLocalized(record.caption, `${path}.caption`),
      };

    case "callout": {
      const variant = str(record.variant, `${path}.variant`);
      if (!["tip", "warning", "info", "pitfall"].includes(variant)) {
        bad(`${path}.variant`, "tip, warning, info veya pitfall olmalı");
      }
      return {
        type: "callout",
        variant: variant as "tip" | "warning" | "info" | "pitfall",
        title: localized(record.title, `${path}.title`),
        body: localized(record.body, `${path}.body`),
      };
    }

    case "quiz": {
      const options = arr(record.options, `${path}.options`, { min: 2 }).map((option, index) =>
        localized(option, `${path}.options[${index}]`),
      );
      const answer = num(record.answer, `${path}.answer`, { min: 0 });
      if (!Number.isInteger(answer) || answer >= options.length) {
        bad(`${path}.answer`, `0 ile ${options.length - 1} arasında bir tam sayı olmalı`);
      }
      return {
        type: "quiz",
        id: slugOf(record.id, `${path}.id`),
        question: localized(record.question, `${path}.question`),
        options,
        answer,
        explanation: localized(record.explanation, `${path}.explanation`),
        xp: num(record.xp, `${path}.xp`, { min: 0 }),
      };
    }

    case "order":
      return {
        type: "order",
        id: slugOf(record.id, `${path}.id`),
        prompt: localized(record.prompt, `${path}.prompt`),
        lines: arr(record.lines, `${path}.lines`, { min: 2 }).map((line, index) =>
          str(line, `${path}.lines[${index}]`),
        ),
        xp: num(record.xp, `${path}.xp`, { min: 0 }),
      };

    case "exercise": {
      const engine = str(record.engine, `${path}.engine`);
      if (!["python", "sql"].includes(engine)) {
        bad(`${path}.engine`, "python veya sql olmalı");
      }
      const checks = arr(record.checks, `${path}.checks`).map((check, index) => {
        const checkPath = `${path}.checks[${index}]`;
        const item = obj(check, checkPath);
        const kind = str(item.kind, `${checkPath}.kind`);
        const message = localized(item.message, `${checkPath}.message`);
        if (kind === "expression") {
          return { kind: "expression" as const, code: str(item.code, `${checkPath}.code`), message };
        }
        if (kind === "contains") {
          return {
            kind: "contains" as const,
            needle: str(item.needle, `${checkPath}.needle`),
            message,
          };
        }
        if (kind === "resultEquals") return { kind: "resultEquals" as const, message };
        return bad(`${checkPath}.kind`, "expression, contains veya resultEquals olmalı");
      });

      return {
        type: "exercise",
        id: slugOf(record.id, `${path}.id`),
        engine: engine as "python" | "sql",
        prompt: localized(record.prompt, `${path}.prompt`),
        starter: str(record.starter, `${path}.starter`, { allowEmpty: true }),
        solution: str(record.solution, `${path}.solution`, { allowEmpty: true }),
        hint: optionalLocalized(record.hint, `${path}.hint`),
        dataset: record.dataset === undefined ? undefined : str(record.dataset, `${path}.dataset`),
        checks,
        xp: num(record.xp, `${path}.xp`, { min: 0 }),
      };
    }

    case "playground": {
      const engine = str(record.engine, `${path}.engine`);
      if (!["python", "sql"].includes(engine)) {
        bad(`${path}.engine`, "python veya sql olmalı");
      }
      return {
        type: "playground",
        engine: engine as "python" | "sql",
        code: str(record.code, `${path}.code`, { allowEmpty: true }),
        dataset: record.dataset === undefined ? undefined : str(record.dataset, `${path}.dataset`),
        title: optionalLocalized(record.title, `${path}.title`),
      };
    }

    default:
      return bad(`${path}.type`, "bilinmeyen blok türü");
  }
}

/* ------------------------------------------------------------------ */
/* Ders / seviye / patika                                              */
/* ------------------------------------------------------------------ */

function lesson(value: unknown, path: string): Lesson {
  const record = obj(value, path);
  return {
    slug: slugOf(record.slug, `${path}.slug`),
    title: localized(record.title, `${path}.title`),
    summary: localized(record.summary, `${path}.summary`),
    minutes: num(record.minutes, `${path}.minutes`, { min: 1 }),
    blocks: arr(record.blocks, `${path}.blocks`, { min: 1 }).map((item, index) =>
      block(item, `${path}.blocks[${index}]`),
    ),
  };
}

function level(value: unknown, path: string): Level {
  const record = obj(value, path);
  const id = str(record.id, `${path}.id`);
  if (!(levelOrder as string[]).includes(id)) {
    bad(`${path}.id`, `şunlardan biri olmalı: ${levelOrder.join(", ")}`);
  }

  const lessons = arr(record.lessons, `${path}.lessons`).map((item, index) =>
    lesson(item, `${path}.lessons[${index}]`),
  );

  const seen = new Set<string>();
  for (const item of lessons) {
    if (seen.has(item.slug)) bad(`${path}.lessons`, `"${item.slug}" slug'ı birden fazla kez geçiyor`);
    seen.add(item.slug);
  }

  return {
    id: id as Level["id"],
    title: localized(record.title, `${path}.title`),
    description: localized(record.description, `${path}.description`),
    lessons,
    projectSlug:
      record.projectSlug === undefined || record.projectSlug === null
        ? undefined
        : slugOf(record.projectSlug, `${path}.projectSlug`),
    premium: record.premium === true,
  };
}

const CATEGORIES = ["language", "bi", "platform", "foundation", "advanced"] as const;

function track(value: unknown): Track {
  const record = obj(value, "patika");
  const category = str(record.category, "category");
  if (!(CATEGORIES as readonly string[]).includes(category)) {
    bad("category", `şunlardan biri olmalı: ${CATEGORIES.join(", ")}`);
  }

  return {
    slug: slugOf(record.slug, "slug"),
    name: str(record.name, "name"),
    category: category as Track["category"],
    color: str(record.color, "color"),
    icon: str(record.icon, "icon"),
    tagline: localized(record.tagline, "tagline"),
    description: localized(record.description, "description"),
    levels: arr(record.levels, "levels", { min: 1 }).map((item, index) =>
      level(item, `levels[${index}]`),
    ),
    premium: record.premium === true,
  };
}

function project(value: unknown): Project {
  const record = obj(value, "proje");
  const levelId = str(record.level, "level");
  if (!(levelOrder as string[]).includes(levelId)) {
    bad("level", `şunlardan biri olmalı: ${levelOrder.join(", ")}`);
  }

  return {
    slug: slugOf(record.slug, "slug"),
    title: localized(record.title, "title"),
    trackSlug: slugOf(record.trackSlug, "trackSlug"),
    level: levelId as Project["level"],
    stack: arr(record.stack, "stack").map((item, index) => str(item, `stack[${index}]`)),
    hours: num(record.hours, "hours", { min: 0 }),
    xp: num(record.xp, "xp", { min: 0 }),
    summary: localized(record.summary, "summary"),
    dataset: localized(record.dataset, "dataset"),
    deliverables: arr(record.deliverables, "deliverables").map((item, index) =>
      localized(item, `deliverables[${index}]`),
    ),
    steps: arr(record.steps, "steps").map((item, index) => {
      const stepPath = `steps[${index}]`;
      const step = obj(item, stepPath);
      return {
        title: localized(step.title, `${stepPath}.title`),
        body: localized(step.body, `${stepPath}.body`),
        code: step.code === undefined ? undefined : str(step.code, `${stepPath}.code`, { allowEmpty: true }),
        lang: step.lang === undefined ? undefined : str(step.lang, `${stepPath}.lang`),
      };
    }),
    premium: record.premium === true,
  };
}

/* ------------------------------------------------------------------ */
/* Genel giriş noktaları                                               */
/* ------------------------------------------------------------------ */

/** Yazmadan önce: geçerliyse slug'ı döner, değilse okunabilir hata mesajı. */
export function validateContentDoc(kind: "track" | "project", data: unknown): ValidationResult {
  try {
    const parsed = kind === "track" ? track(data) : project(data);
    return { ok: true, slug: parsed.slug };
  } catch (error) {
    if (error instanceof Invalid) return { ok: false, message: error.message };
    return { ok: false, message: `Doğrulanamadı: ${(error as Error).message}` };
  }
}

/**
 * Okurken: geçerliyse tiplenmiş nesne, değilse null.
 *
 * Bozuk bir kayıt siteyi çökertmek yerine yok sayılır — dosyadaki sürüm
 * (varsa) devreye girer.
 */
export function parseTrackDoc(data: unknown): Track | null {
  try {
    return track(data);
  } catch {
    return null;
  }
}

export function parseProjectDoc(data: unknown): Project | null {
  try {
    return project(data);
  } catch {
    return null;
  }
}
