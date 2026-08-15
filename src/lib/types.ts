/**
 * Platformun tüm içerik ve ilerleme tipleri.
 * İçerik dosya-tabanlıdır (src/content), böylece CMS olmadan sürüm kontrolüyle yönetilir.
 */

export type Locale = "tr" | "en";

/** İki dilli metin. Yeni bir dil eklendiğinde burası genişletilir. */
export type Localized = Record<Locale, string>;

export type TrackCategory =
  | "language" // Python, SQL, R
  | "bi" // Tableau, Power BI, Looker
  | "platform" // Fabric, Databricks, Cloud
  | "foundation" // İstatistik, veri okuryazarlığı
  | "advanced"; // ML, veri mühendisliği

/**
 * Seviyeler bir kariyer merdiveni olarak okunur: sıfırdan başlayan biri
 * "temel"den girer, "uzman" seviyesinde ekibe yön verecek konuları çalışır.
 */
export type LevelId = "foundation" | "junior" | "mid" | "senior" | "expert";

export type CodeEngine = "python" | "sql";

/* ------------------------------------------------------------------ */
/* İçerik blokları                                                     */
/* ------------------------------------------------------------------ */

/** Anlatım metni. Mini markdown destekler: **kalın**, `kod`, [bağlantı](url), - liste */
export interface TextBlock {
  type: "text";
  body: Localized;
}

/** Başlık — dersi bölümlere ayırır. */
export interface HeadingBlock {
  type: "heading";
  text: Localized;
}

/** Çalıştırılamayan, sadece okunan örnek kod. */
export interface CodeBlock {
  type: "code";
  lang: string;
  code: string;
  caption?: Localized;
}

/** Dikkat çekme kutusu. */
export interface CalloutBlock {
  type: "callout";
  variant: "tip" | "warning" | "info" | "pitfall";
  title: Localized;
  body: Localized;
}

/** Çoktan seçmeli soru. Doğru cevap XP kazandırır. */
export interface QuizBlock {
  type: "quiz";
  id: string;
  question: Localized;
  options: Localized[];
  /** options dizisindeki doğru cevabın indeksi */
  answer: number;
  explanation: Localized;
  xp: number;
}

/** Karışık sırada verilen kod satırlarını doğru sıraya dizme. */
export interface OrderBlock {
  type: "order";
  id: string;
  prompt: Localized;
  /** Doğru sıradaki satırlar. Kullanıcıya karıştırılmış gösterilir. */
  lines: string[];
  xp: number;
}

/** Gerçek motorda (Pyodide / sql.js) çalıştırılan kodlama alıştırması. */
export interface ExerciseBlock {
  type: "exercise";
  id: string;
  engine: CodeEngine;
  prompt: Localized;
  starter: string;
  solution: string;
  hint?: Localized;
  /** SQL alıştırmaları için hazır veri seti anahtarı (src/lib/engines/datasets.ts) */
  dataset?: string;
  /** Python alıştırmaları için: kullanıcı kodundan sonra çalışan doğrulama kodu. */
  checks: Check[];
  xp: number;
}

/**
 * Doğrulama kuralı.
 * - `expression`: Python'da `assert` edilen ifade.
 * - `contains`: kullanıcı kodunda geçmesi gereken metin (biçimsel zorunluluklar için).
 * - `resultEquals`: SQL sonucunun beklenen tabloya eşitliği.
 */
export type Check =
  | { kind: "expression"; code: string; message: Localized }
  | { kind: "contains"; needle: string; message: Localized }
  | { kind: "resultEquals"; message: Localized };

/**
 * Serbest deneme alanı ("Kendin Dene").
 *
 * `ExerciseBlock`'tan farkı: doğrulama yok, XP yok, doğru cevap yok.
 * Kullanıcı kodu bozar, değiştirir, çalıştırır ve sonucu görür. Anlatımın
 * hemen altına konur; referans ve nasıl-yapılır sayfalarında da kullanılır.
 */
export interface PlaygroundBlock {
  type: "playground";
  engine: CodeEngine;
  code: string;
  /** SQL için veri seti anahtarı (src/lib/engines/datasets.ts) */
  dataset?: string;
  title?: Localized;
}

export type Block =
  | TextBlock
  | HeadingBlock
  | CodeBlock
  | CalloutBlock
  | QuizBlock
  | OrderBlock
  | ExerciseBlock
  | PlaygroundBlock;

/* ------------------------------------------------------------------ */
/* Ders / seviye / patika                                              */
/* ------------------------------------------------------------------ */

export interface Lesson {
  slug: string;
  title: Localized;
  summary: Localized;
  /** Tahmini süre (dakika) */
  minutes: number;
  blocks: Block[];
}

export interface Level {
  id: LevelId;
  title: Localized;
  description: Localized;
  lessons: Lesson[];
  /** Bu seviyeyi bitiren kişinin yapacağı uçtan uca proje. */
  projectSlug?: string;
}

export interface Track {
  slug: string;
  name: string;
  category: TrackCategory;
  /** Kart ve rozet rengi — Tailwind sınıfları yerine ham HSL, dinamik stil için. */
  color: string;
  icon: string;
  tagline: Localized;
  description: Localized;
  levels: Level[];
}

/* ------------------------------------------------------------------ */
/* Uçtan uca projeler                                                  */
/* ------------------------------------------------------------------ */

export interface ProjectStep {
  title: Localized;
  body: Localized;
  /** İpucu olarak gösterilen başlangıç kodu. */
  code?: string;
  lang?: string;
}

export interface Project {
  slug: string;
  title: Localized;
  trackSlug: string;
  level: LevelId;
  /** Projede kullanılan araçlar: "Python", "pandas", "Power BI"... */
  stack: string[];
  hours: number;
  xp: number;
  summary: Localized;
  /** Gerçekçi veri seti tanımı — kullanıcı nereden bulacağını bilsin. */
  dataset: Localized;
  /** Projeyi bitmiş saymak için karşılanması gereken çıktılar. */
  deliverables: Localized[];
  steps: ProjectStep[];
  /** true ise ücretsiz kullanıcıya da açık (bkz. src/lib/entitlements.ts). */
  freeSample?: boolean;
}

/* ------------------------------------------------------------------ */
/* Referans (sözlük)                                                   */
/* ------------------------------------------------------------------ */

/**
 * Referans girdisi — patikalardan bağımsız, tek bir sözdiziminin/fonksiyonun
 * kartı. Kullanıcı buraya "SQL JOIN nasıl kullanılır" diye aradığında düşer;
 * ders akışına girmeden cevabı alır.
 */
export interface ReferenceEntry {
  slug: string;
  /** Girdinin adı — kod olarak gösterilir: `GROUP BY`, `df.merge()`, `DÜŞEYARA`. */
  name: string;
  summary: Localized;
  /** Sözdizimi satırı/satırları. */
  syntax: string;
  description?: Localized;
  /** Parametre veya argüman açıklamaları. */
  params?: { name: string; text: Localized }[];
  returns?: Localized;
  /** Kopyalanabilir örnek. */
  example?: { code: string; note?: Localized };
  /** "Kendin dene" — sayfada çalıştırılabilir editör. */
  playground?: PlaygroundBlock;
  /** `grup/slug` biçiminde ilgili girdiler. */
  related?: string[];
  /** Aramada yakalanması istenen ek kelimeler (TR + EN karışık olabilir). */
  keywords?: string[];
}

export interface ReferenceSection {
  id: string;
  title: Localized;
  entries: ReferenceEntry[];
}

export interface ReferenceGroup {
  slug: string;
  name: string;
  icon: string;
  color: string;
  /** Vurgulanan kod dili — sözdizimi renklendirmesi için. */
  lang: string;
  tagline: Localized;
  description: Localized;
  /** Aynı konunun ders patikası — "patikada öğren" bağlantısı. */
  trackSlug?: string;
  sections: ReferenceSection[];
}

/* ------------------------------------------------------------------ */
/* Nasıl yapılır? (how-to)                                             */
/* ------------------------------------------------------------------ */

export interface HowToStep {
  title: Localized;
  body: Localized;
  code?: string;
  lang?: string;
}

/**
 * Tek bir senaryonun cevabı: "Power BI'da YoY nasıl hesaplanır?".
 * Sayfa, arama sonucundan gelen kullanıcıyı önce **hızlı cevapla** karşılar,
 * ayrıntı isteyene adımları verir.
 */
export interface HowTo {
  slug: string;
  title: Localized;
  summary: Localized;
  /** Hangi aracın sorusu — referans grubunun slug'ı. */
  tool: string;
  trackSlug?: string;
  minutes: number;
  /** Son güncelleme, ISO tarih (YYYY-AA-GG). */
  updated: string;
  /** Sayfanın tepesindeki tek paragraflık cevap. */
  answer: { body: Localized; code?: string; lang?: string };
  steps: HowToStep[];
  /** Adımlardan sonra gelen serbest içerik (uyarı, kendin dene, ek kod). */
  blocks?: Block[];
  faq?: { q: Localized; a: Localized }[];
  related?: string[];
  keywords?: string[];
}

/* ------------------------------------------------------------------ */
/* Kopya kâğıtları (cheatsheet)                                        */
/* ------------------------------------------------------------------ */

export interface CheatRow {
  /** Sol sütun: komut, formül veya algoritma adı. */
  code: string;
  desc: Localized;
  note?: Localized;
}

export interface CheatSection {
  title: Localized;
  /** Sütun başlıkları. Verilmezse "Sözdizimi / Ne yapar / Not" kullanılır. */
  columns?: [Localized, Localized] | [Localized, Localized, Localized];
  rows: CheatRow[];
}

export interface Cheatsheet {
  slug: string;
  title: Localized;
  summary: Localized;
  tool: string;
  icon: string;
  color: string;
  lang: string;
  updated: string;
  sections: CheatSection[];
}

/* ------------------------------------------------------------------ */
/* İlerleme & oyunlaştırma                                             */
/* ------------------------------------------------------------------ */

export type AvatarSlot = "base" | "outfit" | "accessory" | "effect";

/**
 * Kullanıcının avatarı.
 *
 * `spent`, özelleştirmeye harcanan XP'yi tutar; seviye hesabı ham `xp`
 * üzerinden yapıldığı için harcama kimseyi seviye düşürmez — yalnızca
 * harcanabilir bakiyeyi azaltır.
 */
export interface AvatarState {
  base: string;
  outfit: string;
  accessory: string | null;
  effect: string | null;
  /** Açılmış/satın alınmış parça id'leri. */
  unlocked: string[];
  spent: number;
}

/** Tek bir görevin tamamlanma kaydı. Anahtar: `${trackSlug}/${lessonSlug}#${blockId}` */
export type TaskKey = string;

export interface ProgressState {
  /** Toplam kazanılan XP. */
  xp: number;
  /** Tamamlanan görev anahtarları -> kazanılan XP. */
  tasks: Record<TaskKey, number>;
  /** Tamamlanan dersler: `${trackSlug}/${lessonSlug}` */
  lessons: string[];
  /** Tamamlanan proje slug'ları. */
  projects: string[];
  /** Kazanılan rozet id'leri. */
  badges: string[];
  /** Aktivite olan günler, ISO tarih (YYYY-MM-DD). Seri hesabı için. */
  activeDays: string[];
  /** Kullanıcının görünen adı — liderlik tablosunda kullanılır. */
  displayName: string;
  /** Avatar seçimi ve açılan parçalar. */
  avatar: AvatarState;
  /** Şema sürümü; ileride göç için. */
  version: number;
}

export interface Badge {
  id: string;
  icon: string;
  title: Localized;
  description: Localized;
  /** Rozetin kazanılıp kazanılmadığını hesaplar. */
  earned: (p: ProgressState) => boolean;
}
