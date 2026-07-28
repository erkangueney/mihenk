"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { adapter, emptyProgress, flushPendingProgress, normalize } from "@/lib/storage";
import { badges, todayKey } from "@/lib/gamification";
import { useSession } from "@/components/auth/session-provider";
import type { ProgressState } from "@/lib/types";

export interface Toast {
  id: number;
  kind: "xp" | "badge" | "level";
  title: string;
  detail?: string;
  icon: string;
}

interface ProgressContextValue {
  progress: ProgressState;
  /** Depo okunana kadar false — SSR/hidrasyon uyuşmazlığını önler. */
  ready: boolean;
  isTaskDone: (key: string) => boolean;
  /** Bir görevi tamamlar. Aynı görev ikinci kez XP vermez. */
  completeTask: (key: string, xp: number) => void;
  isLessonDone: (key: string) => boolean;
  completeLesson: (key: string, xp: number) => void;
  isProjectDone: (slug: string) => boolean;
  toggleProject: (slug: string, xp: number) => void;
  setDisplayName: (name: string) => void;
  replaceAll: (state: ProgressState) => void;
  reset: () => void;
  toasts: Toast[];
  dismissToast: (id: number) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress);
  /** Eldeki `progress` hangi oturuma ait? null ise henüz hiçbir şey okunmadı. */
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const { user, ready: sessionReady } = useSession();
  // Oturum değiştiğinde (giriş/çıkış) ilerleme yeniden okunmalı: girişte
  // buluttaki kayıt, çıkışta cihazdaki kayıt geçerli olur.
  const sessionKey = user?.id ?? "anon";

  // `ready` ayrı bir durum değil, türetilmiş değer. Oturum değişir değişmez
  // kendiliğinden false olur — efekt içinde senkron setState gerekmez.
  const ready = sessionReady && loadedKey === sessionKey;

  useEffect(() => {
    // Oturum bilinmeden okumaya başlarsak yanlış kaynaktan yükleriz.
    if (!sessionReady) return;

    let cancelled = false;
    adapter.load().then((loaded) => {
      if (cancelled) return;
      setProgress(loaded);
      setLoadedKey(sessionKey);
    });
    return () => {
      cancelled = true;
    };
  }, [sessionReady, sessionKey]);

  // Depo yazımı, ilk okuma bitmeden yapılmamalı; yoksa boş durum kaydı ezerdi.
  useEffect(() => {
    if (!ready) return;
    void adapter.save(progress);
  }, [progress, ready]);

  // Bulut yazımı gecikmeli topaklanıyor; sekme kapanırken bekleyeni gönder.
  useEffect(() => {
    const flush = () => flushPendingProgress();
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, []);

  const pushToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = (toastId.current += 1);
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  /**
   * Tüm XP değişiklikleri buradan geçer: günü aktif işaretler,
   * yeni kazanılan rozetleri tespit eder ve bildirimleri tetikler.
   */
  const applyGain = useCallback(
    (mutate: (draft: ProgressState) => void) => {
      setProgress((current) => {
        const next: ProgressState = {
          ...current,
          tasks: { ...current.tasks },
          lessons: [...current.lessons],
          projects: [...current.projects],
          badges: [...current.badges],
          activeDays: [...current.activeDays],
        };
        mutate(next);

        const today = todayKey();
        if (!next.activeDays.includes(today)) next.activeDays.push(today);

        const owned = new Set(next.badges);
        for (const badge of badges) {
          if (!owned.has(badge.id) && badge.earned(next)) {
            next.badges.push(badge.id);
            pushToast({
              kind: "badge",
              icon: badge.icon,
              title: badge.title.tr,
              detail: badge.description.tr,
            });
          }
        }
        return next;
      });
    },
    [pushToast],
  );

  const isTaskDone = useCallback((key: string) => progress.tasks[key] !== undefined, [progress]);

  const completeTask = useCallback(
    (key: string, xp: number) => {
      if (progress.tasks[key] !== undefined) return;
      applyGain((draft) => {
        draft.tasks[key] = xp;
        draft.xp += xp;
      });
      pushToast({ kind: "xp", icon: "✨", title: `+${xp} XP` });
    },
    [applyGain, progress.tasks, pushToast],
  );

  const isLessonDone = useCallback((key: string) => progress.lessons.includes(key), [progress]);

  const completeLesson = useCallback(
    (key: string, xp: number) => {
      if (progress.lessons.includes(key)) return;
      applyGain((draft) => {
        draft.lessons.push(key);
        draft.xp += xp;
      });
      pushToast({ kind: "xp", icon: "🎯", title: `+${xp} XP`, detail: "Ders tamamlandı" });
    },
    [applyGain, progress.lessons, pushToast],
  );

  const isProjectDone = useCallback((slug: string) => progress.projects.includes(slug), [progress]);

  const toggleProject = useCallback(
    (slug: string, xp: number) => {
      const done = progress.projects.includes(slug);
      applyGain((draft) => {
        if (done) {
          draft.projects = draft.projects.filter((s) => s !== slug);
          draft.xp = Math.max(0, draft.xp - xp);
        } else {
          draft.projects.push(slug);
          draft.xp += xp;
        }
      });
      if (!done) {
        pushToast({ kind: "xp", icon: "🏆", title: `+${xp} XP`, detail: "Proje tamamlandı" });
      }
    },
    [applyGain, progress.projects, pushToast],
  );

  const setDisplayName = useCallback((name: string) => {
    setProgress((current) => ({ ...current, displayName: name.slice(0, 40) }));
  }, []);

  const replaceAll = useCallback((state: ProgressState) => {
    setProgress(normalize(state));
  }, []);

  const reset = useCallback(() => {
    setProgress(emptyProgress());
    void adapter.clear();
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      ready,
      isTaskDone,
      completeTask,
      isLessonDone,
      completeLesson,
      isProjectDone,
      toggleProject,
      setDisplayName,
      replaceAll,
      reset,
      toasts,
      dismissToast,
    }),
    [
      progress,
      ready,
      isTaskDone,
      completeTask,
      isLessonDone,
      completeLesson,
      isProjectDone,
      toggleProject,
      setDisplayName,
      replaceAll,
      reset,
      toasts,
      dismissToast,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress, ProgressProvider içinde kullanılmalı.");
  return context;
}
