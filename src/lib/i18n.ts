import type { Locale, Localized } from "./types";

export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "tr";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

/** İki dilli bir alandan aktif dildeki metni alır. */
export function t(value: Localized, locale: Locale): string {
  return value[locale] ?? value[defaultLocale];
}

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
};

/**
 * Arayüz sözlüğü. İçerik metinleri `Localized` alanlarda durur;
 * burası yalnızca kabuk (navigasyon, butonlar, durum mesajları) içindir.
 */
const dictionary = {
  "nav.learn": { tr: "Öğren", en: "Learn" },
  "nav.projects": { tr: "Projeler", en: "Projects" },
  "nav.leaderboard": { tr: "Liderlik", en: "Leaderboard" },
  "nav.profile": { tr: "Profilim", en: "My Profile" },
  "nav.roadmap": { tr: "Yol Haritası", en: "Roadmap" },
  "nav.menu": { tr: "Menü", en: "Menu" },
  "nav.close": { tr: "Kapat", en: "Close" },

  "home.badge": { tr: "Oyunlaştırılmış veri eğitimi", en: "Gamified data education" },
  "home.title": {
    tr: "Veriyle çalışmayı oynayarak öğren",
    en: "Learn to work with data by playing",
  },
  "home.subtitle": {
    tr: "Python, SQL, Tableau, Power BI, Microsoft Fabric ve daha fazlası. Her seviyede uçtan uca gerçek projeler, tarayıcıda çalışan kod ve XP kazandıran görevler.",
    en: "Python, SQL, Tableau, Power BI, Microsoft Fabric and more. End-to-end real projects at every level, code that runs in your browser, and XP-earning challenges.",
  },
  "home.cta.start": { tr: "Öğrenmeye başla", en: "Start learning" },
  "home.cta.continue": { tr: "Kaldığın yerden devam et", en: "Continue where you left off" },
  "home.cta.roadmap": { tr: "Yol haritasını gör", en: "See the roadmap" },
  "home.tracks.title": { tr: "Öğrenme patikaları", en: "Learning tracks" },
  "home.tracks.subtitle": {
    tr: "Her patika başlangıçtan ileri seviyeye kadar kesintisiz ilerler ve her seviyenin sonunda bir uçtan uca proje bulunur.",
    en: "Every track runs from beginner to advanced, and each level ends with a full end-to-end project.",
  },
  "home.how.title": { tr: "Nasıl çalışır?", en: "How it works" },
  "home.stats.lessons": { tr: "ders", en: "lessons" },
  "home.stats.tracks": { tr: "patika", en: "tracks" },
  "home.stats.projects": { tr: "uçtan uca proje", en: "end-to-end projects" },
  "home.stats.xp": { tr: "toplam XP", en: "total XP" },

  "tracks.all": { tr: "Tümü", en: "All" },
  "tracks.title": { tr: "Öğrenme patikaları", en: "Learning tracks" },
  "tracks.lessonCount": { tr: "ders", en: "lessons" },
  "tracks.levelCount": { tr: "seviye", en: "levels" },
  "tracks.explore": { tr: "Patikayı aç", en: "Open track" },
  "tracks.continue": { tr: "Devam et", en: "Continue" },
  "tracks.start": { tr: "Başla", en: "Start" },
  "tracks.completed": { tr: "Tamamlandı", en: "Completed" },
  "tracks.locked": { tr: "Kilitli", en: "Locked" },
  "tracks.unlockHint": {
    tr: "Önceki seviyenin derslerinin %70'ini bitirince açılır.",
    en: "Unlocks when you finish 70% of the previous level.",
  },

  "category.language": { tr: "Programlama dilleri", en: "Programming languages" },
  "category.bi": { tr: "İş zekâsı & görselleştirme", en: "BI & visualization" },
  "category.platform": { tr: "Veri platformları", en: "Data platforms" },
  "category.foundation": { tr: "Temeller", en: "Foundations" },
  "category.advanced": { tr: "İleri seviye", en: "Advanced" },

  "level.beginner": { tr: "Başlangıç", en: "Beginner" },
  "level.intermediate": { tr: "Orta", en: "Intermediate" },
  "level.advanced": { tr: "İleri", en: "Advanced" },

  "lesson.minutes": { tr: "dk", en: "min" },
  "lesson.next": { tr: "Sonraki ders", en: "Next lesson" },
  "lesson.prev": { tr: "Önceki ders", en: "Previous lesson" },
  "lesson.finish": { tr: "Dersi tamamla", en: "Complete lesson" },
  "lesson.finished": { tr: "Bu dersi tamamladın", en: "You completed this lesson" },
  "lesson.backToTrack": { tr: "Patikaya dön", en: "Back to track" },
  "lesson.progress": { tr: "Ders ilerlemesi", en: "Lesson progress" },
  "lesson.tasksLeft": {
    tr: "Dersi tamamlamak için kalan görev",
    en: "Tasks left to complete this lesson",
  },

  "quiz.check": { tr: "Kontrol et", en: "Check" },
  "quiz.correct": { tr: "Doğru!", en: "Correct!" },
  "quiz.wrong": { tr: "Tekrar dene", en: "Try again" },
  "quiz.retry": { tr: "Yeniden dene", en: "Retry" },

  "order.prompt": { tr: "Satırları doğru sıraya diz", en: "Put the lines in the right order" },
  "order.check": { tr: "Sırayı kontrol et", en: "Check order" },
  "order.shuffle": { tr: "Karıştır", en: "Shuffle" },

  "code.run": { tr: "Çalıştır", en: "Run" },
  "code.running": { tr: "Çalışıyor…", en: "Running…" },
  "code.loading": { tr: "Motor yükleniyor…", en: "Loading engine…" },
  "code.reset": { tr: "Sıfırla", en: "Reset" },
  "code.hint": { tr: "İpucu", en: "Hint" },
  "code.solution": { tr: "Çözümü göster", en: "Show solution" },
  "code.output": { tr: "Çıktı", en: "Output" },
  "code.passed": { tr: "Tüm kontroller geçti", en: "All checks passed" },
  "code.failed": { tr: "Kontroller geçilemedi", en: "Checks failed" },
  "code.engineError": {
    tr: "Motor yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.",
    en: "Engine failed to load. Check your connection and try again.",
  },

  "xp.gained": { tr: "XP kazandın", en: "XP earned" },
  "xp.total": { tr: "XP", en: "XP" },
  "xp.level": { tr: "Seviye", en: "Level" },
  "xp.toNext": { tr: "sonraki seviyeye", en: "to next level" },

  "streak.title": { tr: "Seri", en: "Streak" },
  "streak.days": { tr: "gün", en: "days" },
  "streak.today": { tr: "Bugün çalıştın", en: "Active today" },
  "streak.idle": { tr: "Bugün henüz çalışmadın", en: "Not active today yet" },

  "badges.title": { tr: "Rozetler", en: "Badges" },
  "badges.locked": { tr: "Henüz kazanılmadı", en: "Not earned yet" },
  "badges.earnedCount": { tr: "rozet kazanıldı", en: "badges earned" },

  "profile.title": { tr: "Profilim", en: "My Profile" },
  "profile.name": { tr: "Görünen ad", en: "Display name" },
  "profile.namePlaceholder": { tr: "Adını yaz", en: "Enter your name" },
  "profile.overview": { tr: "Genel bakış", en: "Overview" },
  "profile.byTrack": { tr: "Patikalara göre ilerleme", en: "Progress by track" },
  "profile.reset": { tr: "İlerlemeyi sıfırla", en: "Reset progress" },
  "profile.resetConfirm": {
    tr: "Tüm XP, rozet ve ders ilerlemen silinecek. Emin misin?",
    en: "All your XP, badges and lesson progress will be deleted. Are you sure?",
  },
  "profile.export": { tr: "Yedeği indir", en: "Export backup" },
  "profile.import": { tr: "Yedeği yükle", en: "Import backup" },
  "profile.empty": {
    tr: "Henüz ders tamamlamadın. İlk dersini bitir, buradaki grafikler dolmaya başlasın.",
    en: "You haven't completed a lesson yet. Finish your first one and these charts will fill up.",
  },

  "leaderboard.title": { tr: "Liderlik tablosu", en: "Leaderboard" },
  "leaderboard.subtitle": {
    tr: "Sıralama şu an cihazında yerel olarak hesaplanıyor; rakipler bu hafta ortalama bir öğrencinin temposunu temsil ediyor.",
    en: "Ranking is computed locally on your device; the rivals represent an average learner's pace this week.",
  },
  "leaderboard.you": { tr: "Sen", en: "You" },
  "leaderboard.rank": { tr: "Sıra", en: "Rank" },
  "leaderboard.learner": { tr: "Öğrenci", en: "Learner" },

  "projects.title": { tr: "Uçtan uca projeler", en: "End-to-end projects" },
  "projects.subtitle": {
    tr: "Her proje gerçek bir veri seti, net teslimatlar ve adım adım bir plan içerir. Portföyüne doğrudan ekleyebilirsin.",
    en: "Every project has a real dataset, clear deliverables and a step-by-step plan. Add them straight to your portfolio.",
  },
  "projects.hours": { tr: "saat", en: "hours" },
  "projects.stack": { tr: "Kullanılan araçlar", en: "Stack" },
  "projects.dataset": { tr: "Veri seti", en: "Dataset" },
  "projects.deliverables": { tr: "Teslimatlar", en: "Deliverables" },
  "projects.steps": { tr: "Adımlar", en: "Steps" },
  "projects.markDone": { tr: "Projeyi tamamladım", en: "Mark as completed" },
  "projects.done": { tr: "Tamamlandı", en: "Completed" },
  "projects.open": { tr: "Projeyi aç", en: "Open project" },

  "roadmap.title": { tr: "Yol haritası", en: "Roadmap" },
  "roadmap.subtitle": {
    tr: "Sıfırdan veri analistliğine, oradan veri bilimciliğine giden önerilen sıra. Her durak bir patikanın bir seviyesidir.",
    en: "The recommended path from zero to data analyst, then to data scientist. Each stop is one level of a track.",
  },

  "common.of": { tr: "/", en: "/" },
  "common.back": { tr: "Geri", en: "Back" },
  "common.soon": { tr: "Yakında", en: "Soon" },
  "common.search": { tr: "Ara", en: "Search" },
  "common.noResults": { tr: "Sonuç bulunamadı", en: "No results" },
} as const satisfies Record<string, Localized>;

export type DictKey = keyof typeof dictionary;

/** Arayüz metni çevirisi. */
export function ui(key: DictKey, locale: Locale): string {
  return dictionary[key][locale];
}

/** Bir sayfada tekrar tekrar `locale` geçirmemek için küçük yardımcı. */
export function translator(locale: Locale) {
  return {
    ui: (key: DictKey) => ui(key, locale),
    t: (value: Localized) => t(value, locale),
    locale,
  };
}

export type Translator = ReturnType<typeof translator>;
