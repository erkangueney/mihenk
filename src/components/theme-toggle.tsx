"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "veri-akademi:theme";

/**
 * Sayfa boyanmadan önce çalışıp temayı uygular; böylece açık temayı seçen
 * kullanıcı her yenilemede koyu bir titreme görmez.
 */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
    var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    var theme = stored || (prefersLight ? "light" : "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  } catch (e) {}
})();
`;

/*
 * Tema, React state'inde değil `<html>` sınıfında yaşıyor (yukarıdaki betik
 * onu React yüklenmeden önce yazıyor). Bu yüzden doğru okuma yolu bir efektle
 * state'e kopyalamak değil, harici kaynağa abone olmaktır.
 */
type Theme = "light" | "dark";

let listeners: (() => void)[] = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((item) => item !== listener);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

/** Sunucuda DOM yok; koyu tema varsayılan olduğu için güvenli başlangıç. */
function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle({ label }: { label?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Gizli mod: tema yalnızca bu oturumda kalır.
    }
    for (const listener of listeners) listener();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label ?? "Temayı değiştir"}
      title={label ?? "Temayı değiştir"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-2 text-base transition hover:border-accent"
    >
      <span aria-hidden>{theme === "light" ? "☀️" : "🌙"}</span>
    </button>
  );
}
