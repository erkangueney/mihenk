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

export type LevelId = "beginner" | "intermediate" | "advanced";

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

export type Block =
  | TextBlock
  | HeadingBlock
  | CodeBlock
  | CalloutBlock
  | QuizBlock
  | OrderBlock
  | ExerciseBlock;

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
}

/* ------------------------------------------------------------------ */
/* İlerleme & oyunlaştırma                                             */
/* ------------------------------------------------------------------ */

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
