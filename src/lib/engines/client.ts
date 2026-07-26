"use client";

import type { CodeEngine } from "@/lib/types";
import type { CheckSpec, RunResult, WorkerRequest, WorkerResponse } from "./protocol";
import { pythonWorkerSource, sqlWorkerSource } from "./worker-source";

/** Sonsuz döngüye giren kullanıcı kodu sekmeyi kilitlemesin diye üst sınır. */
const TIMEOUT_MS = 45_000;

interface RunOptions {
  code: string;
  checks: CheckSpec[];
  schema?: string;
  solution?: string;
  onStatus?: (text: string) => void;
}

/**
 * Tek bir motor türü için worker yaşam döngüsünü yönetir.
 * Worker tembel oluşturulur; ilk `run` çağrısına kadar hiçbir şey indirilmez.
 */
class EngineClient {
  private worker: Worker | null = null;
  private blobUrl: string | null = null;
  private busy = false;

  constructor(private readonly source: string) {}

  private ensureWorker(): Worker {
    if (this.worker) return this.worker;
    const blob = new Blob([this.source], { type: "text/javascript" });
    this.blobUrl = URL.createObjectURL(blob);
    this.worker = new Worker(this.blobUrl);
    return this.worker;
  }

  /** Motoru arka planda ısıtır — kullanıcı kodu yazarken indirme başlasın. */
  warm(onStatus?: (text: string) => void): void {
    try {
      const worker = this.ensureWorker();
      if (onStatus) {
        const listener = (event: MessageEvent<WorkerResponse>) => {
          if (event.data.type === "status") onStatus(event.data.text);
          if (event.data.type === "ready") worker.removeEventListener("message", listener);
        };
        worker.addEventListener("message", listener);
      }
      worker.postMessage({ type: "init" } satisfies WorkerRequest);
    } catch {
      // Worker oluşturulamadıysa çalıştırma anında hata gösterilir.
    }
  }

  /** Kullanıcı kodunu çalıştırır ve doğrulama sonuçlarını döner. */
  run(options: RunOptions): Promise<RunResult> {
    if (this.busy) {
      // Önceki çalıştırma sürüyorsa worker'ı yenile — kilitlenme riskini kes.
      this.terminate();
    }
    this.busy = true;

    const worker = this.ensureWorker();

    return new Promise<RunResult>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        cleanup();
        this.terminate();
        reject(
          new Error(
            "Kod 45 saniyede bitmedi ve durduruldu. Sonsuz döngü olabilir mi kontrol et.",
          ),
        );
      }, TIMEOUT_MS);

      const cleanup = () => {
        window.clearTimeout(timer);
        worker.removeEventListener("message", onMessage);
        worker.removeEventListener("error", onError);
        this.busy = false;
      };

      const onMessage = (event: MessageEvent<WorkerResponse>) => {
        const data = event.data;
        if (data.type === "status") {
          options.onStatus?.(data.text);
          return;
        }
        if (data.type === "ready") return;
        if (data.type === "result") {
          cleanup();
          resolve(data.result);
          return;
        }
        if (data.type === "fatal") {
          cleanup();
          reject(new Error(data.error));
        }
      };

      const onError = (event: ErrorEvent) => {
        cleanup();
        this.terminate();
        reject(new Error(event.message || "Motor beklenmedik şekilde durdu."));
      };

      worker.addEventListener("message", onMessage);
      worker.addEventListener("error", onError);
      worker.postMessage({
        type: "run",
        code: options.code,
        checks: options.checks,
        schema: options.schema,
        solution: options.solution,
      } satisfies WorkerRequest);
    });
  }

  terminate(): void {
    this.worker?.terminate();
    this.worker = null;
    this.busy = false;
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
      this.blobUrl = null;
    }
  }
}

const clients: Partial<Record<CodeEngine, EngineClient>> = {};

/** Motor istemcisini paylaşılan tekil örnek olarak verir (Pyodide'ı bir kez indirmek için). */
export function getEngine(engine: CodeEngine): EngineClient {
  if (!clients[engine]) {
    clients[engine] = new EngineClient(engine === "python" ? pythonWorkerSource : sqlWorkerSource);
  }
  return clients[engine]!;
}
