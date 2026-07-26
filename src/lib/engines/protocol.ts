/** Kod motoru (worker) ile arayüz arasındaki mesaj sözleşmesi. */

export interface CheckSpec {
  kind: "expression" | "contains" | "resultEquals";
  /** expression: değerlendirilecek Python ifadesi. contains: aranan metin. */
  code?: string;
  needle?: string;
  message: string;
}

export interface CheckResult {
  passed: boolean;
  message: string;
}

export interface TableResult {
  columns: string[];
  rows: (string | number | null)[][];
  /** Gösterilenden fazla satır varsa toplam sayı. */
  total: number;
}

export interface RunResult {
  /** Kod hata vermeden çalıştı mı? */
  ok: boolean;
  stdout: string;
  error?: string;
  checks: CheckResult[];
  /** Tüm doğrulamalar geçti mi? */
  passed: boolean;
  table?: TableResult;
  /** Milisaniye cinsinden süre. */
  ms: number;
}

export type WorkerRequest =
  | { type: "init" }
  | {
      type: "run";
      code: string;
      checks: CheckSpec[];
      /** SQL: veri setinin şema + veri betiği. */
      schema?: string;
      /** SQL: karşılaştırma için referans sorgu. */
      solution?: string;
    };

export type WorkerResponse =
  | { type: "status"; text: string }
  | { type: "ready" }
  | { type: "result"; result: RunResult }
  | { type: "fatal"; error: string };
