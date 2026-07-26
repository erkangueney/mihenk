"use client";

import { useProgress } from "./progress-provider";

/**
 * XP ve rozet bildirimleri. Sağ altta yığılır, mobilde tam genişliğe yakın durur.
 */
export function Toaster() {
  const { toasts, dismissToast } = useProgress();

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-3 bottom-3 z-50 flex flex-col items-end gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          onClick={() => dismissToast(toast.id)}
          className="animate-toast pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-left shadow-[var(--shadow)] transition hover:border-accent sm:w-auto sm:min-w-64"
        >
          <span className="text-2xl" aria-hidden>
            {toast.icon}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">
              {toast.kind === "badge" ? `Yeni rozet: ${toast.title}` : toast.title}
            </span>
            {toast.detail ? (
              <span className="block truncate text-xs text-muted">{toast.detail}</span>
            ) : null}
          </span>
        </button>
      ))}
    </div>
  );
}
