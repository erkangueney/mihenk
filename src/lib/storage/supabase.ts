import type { ProgressState } from "../types";
import { getSupabaseBrowser } from "../supabase/client";
import { emptyProgress, normalize, type ProgressAdapter } from "./adapter";
import { localAdapter } from "./local";

/** Ağ yazımlarını topaklamak için bekleme süresi. */
const FLUSH_MS = 1200;

let flushTimer: ReturnType<typeof setTimeout> | null = null;
let pending: ProgressState | null = null;

/** İki ilerleme kaydını birleştirir — hiçbir emek kaybolmasın diye. */
function merge(a: ProgressState, b: ProgressState): ProgressState {
  const tasks = { ...a.tasks };
  for (const [key, xp] of Object.entries(b.tasks)) {
    // Aynı görev iki yerde varsa yüksek XP'yi tut.
    tasks[key] = Math.max(tasks[key] ?? 0, xp);
  }
  const union = (x: string[], y: string[]) => Array.from(new Set([...x, ...y]));

  // Avatar: açılan parçalar birleşir, harcama yükseği tutulur (aynı parça iki
  // yerde açıldıysa iki kez ödettirmemek için), kuşanılan seçim buluttan gelir.
  const avatar = {
    ...b.avatar,
    unlocked: union(a.avatar?.unlocked ?? [], b.avatar?.unlocked ?? []),
    spent: Math.max(a.avatar?.spent ?? 0, b.avatar?.spent ?? 0),
  };

  return normalize({
    // XP görevlerden yeniden türetilemez (ders bonusu ve proje XP'si de var),
    // bu yüzden iki taraftan yüksek olanı esas alıyoruz.
    xp: Math.max(a.xp, b.xp),
    tasks,
    lessons: union(a.lessons, b.lessons),
    projects: union(a.projects, b.projects),
    badges: union(a.badges, b.badges),
    activeDays: union(a.activeDays, b.activeDays),
    displayName: b.displayName || a.displayName,
    avatar,
  });
}

async function writeRemote(state: ProgressState): Promise<void> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("progress").upsert(
    {
      user_id: user.id,
      xp: state.xp,
      tasks: state.tasks,
      lessons: state.lessons,
      projects: state.projects,
      badges: state.badges,
      active_days: state.activeDays,
      display_name: state.displayName,
      avatar: state.avatar,
    },
    { onConflict: "user_id" },
  );
}

/**
 * Supabase ilerleme deposu.
 *
 * Davranış:
 *  - Giriş yoksa tamamen localStorage'a düşer; ziyaretçi de ders çalışabilir.
 *  - Girişten sonraki ilk okumada cihazdaki ilerleme buluttakiyle birleştirilir.
 *  - Yazma her zaman önce yerele, sonra (gecikmeli) buluta gider. Böylece
 *    çevrimdışıyken de çalışır ve her tıklamada bir ağ isteği doğmaz.
 */
export const supabaseAdapter: ProgressAdapter = {
  async load(): Promise<ProgressState> {
    const supabase = getSupabaseBrowser();
    if (!supabase) return localAdapter.load();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return localAdapter.load();

    const local = await localAdapter.load();

    const { data, error } = await supabase
      .from("progress")
      .select("xp, tasks, lessons, projects, badges, active_days, display_name, avatar")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !data) {
      // Satır yoksa (tetikleyici gecikmiş olabilir) cihazdaki ilerlemeyi yükle.
      if (local.xp > 0) await writeRemote(local);
      return local;
    }

    const remote = normalize({
      xp: data.xp,
      tasks: data.tasks,
      lessons: data.lessons,
      projects: data.projects,
      badges: data.badges,
      activeDays: data.active_days,
      displayName: data.display_name,
      avatar: data.avatar,
    });

    // İlk girişte cihazda birikmiş ilerleme varsa buluta katılır.
    if (local.xp > 0) {
      const merged = merge(local, remote);
      if (merged.xp !== remote.xp || merged.lessons.length !== remote.lessons.length) {
        await writeRemote(merged);
      }
      return merged;
    }

    return remote;
  },

  async save(state: ProgressState): Promise<void> {
    await localAdapter.save(state);

    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    pending = state;
    if (flushTimer) clearTimeout(flushTimer);
    flushTimer = setTimeout(() => {
      flushTimer = null;
      const snapshot = pending;
      pending = null;
      if (snapshot) void writeRemote(snapshot);
    }, FLUSH_MS);
  },

  async clear(): Promise<void> {
    await localAdapter.clear();
    if (flushTimer) {
      clearTimeout(flushTimer);
      flushTimer = null;
    }
    pending = null;
    await writeRemote(emptyProgress());
  },
};

/** Sekme kapanırken bekleyen yazımı kaçırmamak için. */
export function flushPendingProgress(): void {
  if (!pending) return;
  const snapshot = pending;
  pending = null;
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  void writeRemote(snapshot);
}
