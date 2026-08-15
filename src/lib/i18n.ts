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
  "nav.reference": { tr: "Referans", en: "Reference" },
  "nav.howTo": { tr: "Nasıl Yapılır?", en: "How To" },
  "nav.cheatsheets": { tr: "Kopya Kâğıtları", en: "Cheatsheets" },
  "nav.playground": { tr: "Deneme Alanı", en: "Playground" },
  "nav.avatar": { tr: "Avatarım", en: "My Avatar" },
  "nav.toolbox": { tr: "Alet Çantası", en: "Toolbox" },
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
    tr: "Her patika beş kademeden geçer — Temel, Junior, Orta seviye, Senior ve Uzman. Kademeler gerçek bir kariyer merdivenini izler ve her birinin sonunda uçtan uca bir proje bulunur.",
    en: "Every track runs through five stages — Foundation, Junior, Mid-level, Senior and Expert. The stages follow a real career ladder, and each one ends with an end-to-end project.",
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

  "level.foundation": { tr: "Temel", en: "Foundation" },
  "level.junior": { tr: "Junior", en: "Junior" },
  "level.mid": { tr: "Orta seviye", en: "Mid-level" },
  "level.senior": { tr: "Senior", en: "Senior" },
  "level.expert": { tr: "Uzman", en: "Expert" },

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
    tr: "Giriş yapan herkesin kazandığı XP'ye göre canlı sıralama. İlerlemen birkaç saniye içinde tabloya yansır.",
    en: "A live ranking by XP across everyone signed in. Your progress reaches the table within seconds.",
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
  "common.copy": { tr: "Kopyala", en: "Copy" },
  "common.copied": { tr: "Kopyalandı", en: "Copied" },
  "common.all": { tr: "Tümü", en: "All" },
  "common.updated": { tr: "Güncellendi", en: "Updated" },
  "common.clear": { tr: "Temizle", en: "Clear" },

  /* Kendin dene ------------------------------------------------------ */
  "playground.title": { tr: "Kendin dene", en: "Try it yourself" },
  "playground.engine": { tr: "Motor", en: "Engine" },
  "playground.dataset": { tr: "Veri seti", en: "Dataset" },
  "playground.noOutput": {
    tr: "Kod hatasız çalıştı ama bir çıktı üretmedi.",
    en: "The code ran without errors but produced no output.",
  },
  "playground.pageTitle": { tr: "Deneme alanı", en: "Playground" },
  "playground.pageSubtitle": {
    tr: "Kurulum yok, hesap yok. Tarayıcında gerçek Python ve gerçek SQLite çalışıyor — yaz, boz, çalıştır.",
    en: "No setup, no account. Real Python and real SQLite run in your browser — write it, break it, run it.",
  },
  "playground.samples": { tr: "Hazır örnekler", en: "Sample snippets" },
  "playground.tip": {
    tr: "Motor ilk çalıştırmada indirilir; sonraki çalıştırmalar anında başlar.",
    en: "The engine downloads on first run; later runs start instantly.",
  },

  /* Referans --------------------------------------------------------- */
  "reference.title": { tr: "Referans sözlüğü", en: "Reference" },
  "reference.subtitle": {
    tr: "Patikalardan bağımsız başvuru kaynağı. Komut, fonksiyon ve formüllerin sözdizimi, ne işe yaradığı ve çalıştırılabilir örneği — tek sayfada.",
    en: "A reference hub independent of the tracks. Syntax, purpose and a runnable example for every command, function and formula — on one page.",
  },
  "reference.searchPlaceholder": {
    tr: "Komut, fonksiyon veya formül ara — JOIN, merge, DÜŞEYARA…",
    en: "Search a command, function or formula — JOIN, merge, VLOOKUP…",
  },
  "reference.entries": { tr: "girdi", en: "entries" },
  "reference.syntax": { tr: "Sözdizimi", en: "Syntax" },
  "reference.params": { tr: "Parametreler", en: "Parameters" },
  "reference.returns": { tr: "Döndürür", en: "Returns" },
  "reference.example": { tr: "Örnek", en: "Example" },
  "reference.related": { tr: "İlgili girdiler", en: "Related entries" },
  "reference.openTrack": { tr: "Bu konuyu patikada öğren", en: "Learn this in a track" },
  "reference.all": { tr: "Tüm referanslar", en: "All references" },
  "reference.onThisPage": { tr: "Bu sayfada", en: "On this page" },
  "reference.inGroup": { tr: "Bu referansta", en: "In this reference" },
  "reference.noteEntries": {
    tr: "Aradığını bulamadıysan arama kutusuna başka bir kelime yaz — girdi adları, açıklamalar ve örnekler birlikte taranır.",
    en: "If you can't find it, try another word — names, descriptions and examples are all searched.",
  },

  /* Nasıl yapılır ---------------------------------------------------- */
  "howTo.title": { tr: "Nasıl yapılır?", en: "How to" },
  "howTo.subtitle": {
    tr: "Veri dünyasının nokta atışı soruları ve kısa, uygulanabilir cevapları. Her sayfa önce hızlı cevabı verir, sonra adım adım anlatır.",
    en: "Precise questions from the data world with short, actionable answers. Every page leads with the quick answer, then walks through the steps.",
  },
  "howTo.searchPlaceholder": {
    tr: "Bir soru ara — YoY, eksik veri, pivot…",
    en: "Search a question — YoY, missing data, pivot…",
  },
  "howTo.quickAnswer": { tr: "Kısa cevap", en: "Quick answer" },
  "howTo.steps": { tr: "Adım adım", en: "Step by step" },
  "howTo.faq": { tr: "Sık sorulanlar", en: "Frequently asked" },
  "howTo.related": { tr: "Benzer sorular", en: "Related questions" },
  "howTo.count": { tr: "rehber", en: "guides" },
  "howTo.readTime": { tr: "dk okuma", en: "min read" },

  /* Kopya kâğıtları -------------------------------------------------- */
  "cheatsheet.title": { tr: "Kopya kâğıtları", en: "Cheatsheets" },
  "cheatsheet.subtitle": {
    tr: "Tek sayfalık özetler. Yer imlerine ekle, yazdır, ekranın kenarında tut — takıldığın anda bak.",
    en: "One-page summaries. Bookmark them, print them, keep them at the edge of your screen.",
  },
  "cheatsheet.print": { tr: "Yazdır / PDF", en: "Print / PDF" },
  "cheatsheet.rows": { tr: "satır", en: "rows" },
  "cheatsheet.colSyntax": { tr: "Sözdizimi", en: "Syntax" },
  "cheatsheet.colWhat": { tr: "Ne yapar", en: "What it does" },
  "cheatsheet.colNote": { tr: "Not", en: "Note" },
  "cheatsheet.open": { tr: "Kâğıdı aç", en: "Open sheet" },

  /* Alet çantası ----------------------------------------------------- */
  "toolbox.title": { tr: "Alet çantası", en: "Toolbox" },
  "toolbox.subtitle": {
    tr: "Ders akışına girmeden ihtiyacın olanı bul: referans sözlüğü, nokta atışı rehberler, kopya kâğıtları ve serbest deneme alanı.",
    en: "Find what you need without entering a lesson: the reference, precise how-to guides, cheatsheets and a free playground.",
  },

  /* Avatar ----------------------------------------------------------- */
  "avatar.title": { tr: "Avatar stüdyosu", en: "Avatar studio" },
  "avatar.subtitle": {
    tr: "Kazandığın XP'yi harcayarak avatarını özelleştir. Harcama seviyeni düşürmez — yalnızca harcanabilir bakiyenden iner.",
    en: "Spend the XP you've earned to customize your avatar. Spending never lowers your level — it only reduces your spendable balance.",
  },
  "avatar.slot.base": { tr: "Temel karakter", en: "Base character" },
  "avatar.slot.outfit": { tr: "Kıyafet", en: "Outfit" },
  "avatar.slot.accessory": { tr: "Aksesuar", en: "Accessory" },
  "avatar.slot.effect": { tr: "Görsel efekt", en: "Visual effect" },
  "avatar.balance": { tr: "Harcanabilir XP", en: "Spendable XP" },
  "avatar.spent": { tr: "Harcanan XP", en: "XP spent" },
  "avatar.unlock": { tr: "Aç", en: "Unlock" },
  "avatar.equip": { tr: "Kuşan", en: "Equip" },
  "avatar.equipped": { tr: "Kuşanıldı", en: "Equipped" },
  "avatar.remove": { tr: "Çıkar", en: "Remove" },
  "avatar.owned": { tr: "Açıldı", en: "Unlocked" },
  "avatar.needLevel": { tr: "Seviye", en: "Level" },
  "avatar.needLevelSuffix": { tr: "gerekir", en: "required" },
  "avatar.needBadge": { tr: "Şu rozet gerekir:", en: "Requires badge:" },
  "avatar.notEnough": { tr: "Yeterli XP yok", en: "Not enough XP" },
  "avatar.none": { tr: "Yok", en: "None" },
  "avatar.free": { tr: "Ücretsiz", en: "Free" },
  "avatar.preview": { tr: "Önizleme", en: "Preview" },
  "avatar.cta": { tr: "Avatarını özelleştir", en: "Customize your avatar" },
  "avatar.unlockedToast": { tr: "Yeni parça açıldı", en: "New part unlocked" },
  "avatar.parts": { tr: "parça", en: "parts" },
  "avatar.rarity.common": { tr: "Sıradan", en: "Common" },
  "avatar.rarity.rare": { tr: "Nadir", en: "Rare" },
  "avatar.rarity.epic": { tr: "Efsanevi", en: "Epic" },
  "avatar.rarity.legendary": { tr: "Söylence", en: "Legendary" },
  "avatar.progressHint": {
    tr: "Ders bitir, quiz çöz, proje tamamla — açılan parçalar burada birikir.",
    en: "Finish lessons, solve quizzes, complete projects — unlocked parts pile up here.",
  },

  /* Üyelik ---------------------------------------------------------- */
  "auth.signIn": { tr: "Giriş yap", en: "Sign in" },
  "auth.signUp": { tr: "Kayıt ol", en: "Sign up" },
  "auth.signOut": { tr: "Çıkış yap", en: "Sign out" },
  "auth.email": { tr: "E-posta", en: "Email" },
  "auth.password": { tr: "Şifre", en: "Password" },
  "auth.displayName": { tr: "Görünen ad", en: "Display name" },
  "auth.displayNameHint": {
    tr: "Liderlik tablosunda görünecek ad",
    en: "The name shown on the leaderboard",
  },
  "auth.passwordHint": { tr: "En az 8 karakter", en: "At least 8 characters" },
  "auth.forgot": { tr: "Şifremi unuttum", en: "Forgot password" },
  "auth.createAccount": { tr: "Hesap oluştur", en: "Create account" },
  "auth.haveAccount": { tr: "Zaten hesabın var mı?", en: "Already have an account?" },
  "auth.pending": { tr: "Lütfen bekle…", en: "Please wait…" },
  "auth.welcomeBack": { tr: "Tekrar hoş geldin", en: "Welcome back" },
  "auth.welcomeBackSub": {
    tr: "İlerlemen buluta kaydedilir; hangi cihazdan girersen gir kaldığın yerden devam edersin.",
    en: "Your progress is saved to the cloud — pick up where you left off on any device.",
  },
  "auth.signUpSub": {
    tr: "Ücretsiz. Tarayıcıda biriken ilerlemen ilk girişte hesabına taşınır.",
    en: "Free. Progress already in your browser moves to your account on first sign-in.",
  },
  "auth.suspended": {
    tr: "Bu hesap askıya alınmış. Yöneticiyle iletişime geç.",
    en: "This account is suspended. Please contact an administrator.",
  },
  "auth.resetTitle": { tr: "Şifreni sıfırla", en: "Reset your password" },
  "auth.resetSub": {
    tr: "E-posta adresini gir; sıfırlama bağlantısını gönderelim.",
    en: "Enter your email address and we'll send a reset link.",
  },
  "auth.resetSend": { tr: "Sıfırlama bağlantısı gönder", en: "Send reset link" },
  "auth.backToSignIn": { tr: "Girişe dön", en: "Back to sign in" },
  "auth.newPasswordTitle": { tr: "Yeni şifre belirle", en: "Set a new password" },
  "auth.newPasswordSub": {
    tr: "Bu sayfaya e-postandaki bağlantıyla geldiysen yeni şifreni kaydedebilirsin.",
    en: "If you arrived here from the link in your email, you can save a new password.",
  },
  "auth.newPassword": { tr: "Yeni şifre", en: "New password" },
  "auth.newPasswordAgain": { tr: "Yeni şifre (tekrar)", en: "New password (again)" },
  "auth.updatePassword": { tr: "Şifreyi güncelle", en: "Update password" },
  "auth.backToSite": { tr: "← Siteye dön", en: "← Back to site" },
  "auth.disabledTitle": { tr: "Giriş bu kurulumda kapalı.", en: "Sign-in is disabled here." },
  "auth.disabledBody": {
    tr: "Üyelik için Supabase anahtarları tanımlanmalı. Adımlar: docs/kurulum.md",
    en: "Membership requires Supabase keys. Setup steps: docs/kurulum.md",
  },
  "auth.adminPanel": { tr: "Yönetim paneli", en: "Admin panel" },
  "auth.admin": { tr: "Yönetici", en: "Admin" },
  "auth.member": { tr: "Üye", en: "Member" },
  "auth.leaderboardCta": {
    tr: "Tabloda yer almak için giriş yap — ilerlemen hesabına kaydedilmeye başlar.",
    en: "Sign in to appear on the board — your progress starts saving to your account.",
  },
  "auth.leaderboardSample": {
    tr: "Bu kurulumda üyelik kapalı; aşağıdaki tablo örnek verilerle gösteriliyor.",
    en: "Membership is disabled here; the table below shows sample data.",
  },
  "auth.leaderboardEmpty": {
    tr: "Henüz kimse XP kazanmamış. İlk dersini bitiren tablonun tepesine yerleşir.",
    en: "Nobody has earned XP yet. Finish a lesson to take the top spot.",
  },
  "footer.storage.cloud": {
    tr: "İlerlemen hesabına kaydediliyor.",
    en: "Your progress is saved to your account.",
  },
  "footer.storage.device": {
    tr: "İlerlemen şu an bu cihazda saklanıyor.",
    en: "Your progress is currently stored on this device.",
  },
  "footer.storage.signIn": {
    tr: "İlerlemen bu cihazda saklanıyor — giriş yaparsan hesabına taşınır.",
    en: "Your progress is stored on this device — sign in to move it to your account.",
  },
  "auth.leaderboardError": {
    tr: "Sıralama şu anda yüklenemedi. Sayfayı yenilemeyi dene.",
    en: "The ranking could not be loaded. Try refreshing the page.",
  },
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
