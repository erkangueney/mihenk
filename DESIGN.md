---
name: Mihenk
description: Ayar atölyesi — mihenk taşına vurulan altın ayar damgası dilinde bir öğrenme platformu arayüzü
colors:
  stone-ground:
    dark: "#15110c"
    light: "#f4efe4"
  stone-ground-soft:
    dark: "#1b160f"
    light: "#ece4d3"
  stone-surface:
    dark: "#221b13"
    light: "#fbf8f1"
  stone-surface-raised:
    dark: "#2a2116"
    light: "#f1ead9"
  stone-border:
    dark: "#3c3122"
    light: "#ddd0b3"
  stone-border-strong:
    dark: "#52432c"
    light: "#c4b48c"
  ink:
    dark: "#ede4d3"
    light: "#241c11"
  ink-muted:
    dark: "#a89880"
    light: "#6e6248"
  tick-gray:
    dark: "#7c7466"
    light: "#8c8168"
  gold-22ayar:
    dark: "#c9a153"
    light: "#8c6a29"
  gold-highlight:
    dark: "#e0bd76"
    light: "#6f5620"
  patina-green:
    dark: "#7f9c66"
    light: "#4f7a3d"
  brass-amber:
    dark: "#c3893f"
    light: "#93601f"
  oxide-red:
    dark: "#b1523a"
    light: "#93402a"
typography:
  display:
    fontFamily: "Big Shoulders, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "-0.01em"
    lineHeight: 0.98
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  instrument:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
    fontWeight: 600
rounded:
  card: "1.25rem"
  tile: "0.5rem"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.gold-22ayar}"
    textColor: "#211705"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.gold-highlight}"
  card:
    backgroundColor: "{colors.stone-surface}"
    rounded: "{rounded.card}"
---

# Design System: Mihenk — Ayar Atölyesi

## Overview

**Creative North Star: "The Assay Workshop"**

Mihenk taşı bir logo değil, bu ürünün gerçek bir aleti: altının ayarını sınamak için üzerine sürülen kara taş. Sistemin her parçası bu sahneden türer — zemin dokulu bazalt-siyahı bir taş bloktur, ilerleme taşa sürülen ve uzayan bir altın çizgidir, rozetler basılmış ayar damgalarıdır, kilitli içerik henüz basılmamış boş bir kalıptır. Bu, kategori varsayılanının ("parlak degrade + neon ışıma" SaaS camı; öncesinde kullanılan Fraunces serifi + üç köşeden fışkıran altın ışıma) bilinçli reddidir.

Renk stratejisi **Restrained**: sıcak bazalt-siyahı zemin üzerinde tek sıcak vurgu — 22 ayar altın — yalnızca aktif/kazanılmış durumlarda kullanılır. İkincil yapısal ton soğuk kalay-grisi, skala çizgileri ve alet hatları için ayrılmıştır. Patika renkleri (SQL mavisi, Python sarısı, vb.) bu kuralın dışındadır: onlar marka vurgusu değil, işlevsel bir içerik-taksonomisi kodlamasıdır ve öyle kalmalıdır.

**Key Characteristics:**
- Tek çalışma lambası aydınlatması (sayfa köşelerinden fışkıran çoklu ışıma değil, tek, sıcak, üstten bir spot).
- Düz taş plakalar — camsı degrade, parlama ve neon ışıma yok.
- Sayısal veriler her zaman kazınmış/enstrüman karakterinde mono tipografiyle gösterilir.
- İlerleme bir "progress bar" değil, kalibre edilmiş bir cetveldir.

## Colors

Restrained strateji: nötr taş tonları geniş alanları kaplar, altın yalnızca aktif/kazanılmış durumun imzasıdır.

### Primary
- **22 Ayar Altın** (`#c9a153` koyu tema / `#8c6a29` açık tema): Birincil eylem dolgusu, aktif skala çizgisi, kazanılmış damga, aktif nav durumu. Sayfanın %10-15'ini geçmemeli — nadirliği anlamının parçası.
- **Altın Vurgu** (`#e0bd76` / `#6f5620`): Yalnızca hover/highlight durumunda, birincil altının üzerine değil yanına.

### Neutral
- **Taş Zemin** (`#15110c` / `#f4efe4`): Sayfa arkaplanı.
- **Taş Yüzey** (`#221b13` / `#fbf8f1`): Kart ve panel zemini.
- **Taş Kenar** (`#3c3122` / `#ddd0b3`): Kılcal kenarlıklar.
- **Mürekkep** (`#ede4d3` / `#241c11`): Gövde metni — taş üzerine tebeşir tonu, saf beyaz/siyah değil.
- **Kalay Grisi** (`#7c7466` / `#8c8168`): Skala dişleri, eyebrow etiketleri, alet hatları — ikincil yapısal ton.

### Named Rules
**The Single Lamp Rule.** Sayfa arkaplanında yalnızca tek bir sıcak ışık kaynağı vardır (üstten, `body::before`), sayfa köşelerinden fışkıran çoklu "SaaS ışıması" yasaktır.

**The Struck-Gold Rule.** Altın hiçbir zaman degrade olarak kullanılmaz (`linear-gradient(accent-2, accent)` deseni kaldırıldı). Düz dolgu, dövme metal hissi.

## Typography

**Display Font:** Big Shoulders (ui-sans-serif yedeği ile)
**Body Font:** Inter
**Instrument/Mono Font:** JetBrains Mono

**Character:** Big Shoulders, Chicago sanayi tabelası kökenli, kalıba basılmış metal plaka karakterinde bir grotesk — süsleyici bir "yayın" serifi (önceki Fraunces) değil, aletin kendisi. Inter, Operate modunun gerektirdiği iş atı okunabilirliği için gövde metninde kalır. JetBrains Mono, ayar/XP/istatistik gibi tüm sayısal verilerde "kazınmış rakam" hissi için zorunludur.

### Hierarchy
- **Display** (700, `text-5xl`–`text-7xl`, `leading-[0.98]`): Sayfa başlıkları, bölüm başlıkları.
- **Body** (400, `text-sm`–`text-lg`, `leading-relaxed`): Gövde metni.
- **Instrument** (600-700, `text-xs`–`text-4xl`, `tabular-nums`): XP, istatistik, ayar/seviye rakamları, `eyebrow` etiketleri.

### Named Rules
**The Numeral Rule.** Kullanıcıya gösterilen her sayısal değer (XP, ders sayısı, oran, damga numarası) `font-mono tabular-nums` ile kazınmış-rakam karakterinde gösterilir; büyük başlık fontunda (Big Shoulders) serbest sayı yazılmaz.

## Layout

Mevcut Tailwind grid/flex düzeni korunur (`max-w-7xl` konteyner, `sm:`/`lg:` kırılma noktaları). Hero bölümü `lg:grid-cols-[1.1fr_0.9fr]` iki sütuna açılır: sol tez metni + eylem, sağ büyütülmüş `BrandMark` (taş+altın iz nesnesi) — mobilde amblem gizlenir, tek sütun akışa döner.

## Elevation & Depth

Sistem büyük ölçüde **flat**: kartlar (`--shadow: 0 24px 60px -24px rgba(0,0,0,.85)`) yalnızca sayfadan ayrışmak için hafif, geniş ve yumuşak bir gölge taşır — parlama/iç highlight sheen'i kaldırıldı. Derinlik camsı ışıltıyla değil, taş bloğun kendi kalınlığıyla ifade edilir: üst kenar biraz daha açık ton (`border-top-color` → `border-strong`), geri kalan kenarlar standart `border`.

### Named Rules
**The No-Sheen Rule.** Kartlarda `inset` highlight/gradient sheen (eski "camsı" görünüm) kullanılmaz; yalnızca çok hafif bir üst kenar tonu farkı.

## Shapes

Kartlar `1.25rem` (`--radius-card`) köşe yarıçapı ile "kesme taş blok" hissi verir — çok yuvarlak değil. Butonlar tam pilldir (`999px`) — damga/mühür referansı. Alet ikon kutuları (`rounded-lg`, kılcal kenarlıklı) yuvarlak dolgulu değil, köşeli çerçevelidir.

## Components

### Buttons
- **Shape:** Pill (`999px`).
- **Primary (`btn-gold`):** Düz `--accent` dolgu, koyu mürekkep metin (`--on-accent`), hover'da `--accent-2`'ye geçiş (degrade yok). Active durumda hafif içe çöküş (`translateY(1px) scale(.99)`, gölge sıfırlanır) — basılan bir damga hissi.
- **Ghost (`btn-ghost`):** Kılcal `--border-strong` kenarlık, saydam yüzey, hover'da kenarlık altına döner.

### Scale / Progress ("Ayar Skalası")
- **Yapı:** `.scale-track` (kalibrasyon dişli zemin) + `.scale-fill` (altın/patika rengi dolgu, `transform: scaleX(var(--fill))` ile animasyon — `width` değil, layout-thrash'siz).
- **Kural:** Genel amaçlı "progress bar" yerine her yerde bu bileşen kullanılır (ana sayfa istatistikleri, seviye ilerlemesi).

### Stamp ("Ayar Damgası")
- **Yapı:** `.stamp[data-earned]` — kazanılmış: dolu disk + `--glow`; kazanılmamış: kesikli kenarlıklı boş kalıp (kilit ikonu değil).
- **Kullanım:** Ders numaraları/tamamlanma durumu, rozetler.

### Cards
- **Corner Style:** `1.25rem`.
- **Background:** `--surface`, düz (gradient yok).
- **Shadow Strategy:** bkz. Elevation — yalnızca dış gölge, iç sheen yok.
- **Border:** 1px `--border`, üst kenar `--border-strong` tonunda.

### Navigation
Üst çubuk (`site-header.tsx`) mevcut semantik token'ları kullandığı için değişiklik gerektirmedi; XP rozeti artık düz altın dolgulu mono-numaralı bir damga (eski degrade rozet yerine).

## Do's and Don'ts

### Do:
- **Do** altını yalnızca aktif/kazanılmış/birincil-eylem durumlarında kullan; sayfanın geri kalanı nötr taş tonlarında kalsın.
- **Do** tüm sayısal verileri `font-mono tabular-nums` ile göster.
- **Do** ilerlemeyi `.scale-track`/`.scale-fill` ile, rozetleri `.stamp` ile göster — generic yuvarlak progress bar/rozet ikonu yerine.
- **Do** patika renklerini (`track.color`) içerik-taksonomisi kodlaması olarak kullanmaya devam et; bu, tek-altın-vurgu kuralının dışındadır.

### Don't:
- **Don't** altına degrade uygulama (`linear-gradient(accent-2, accent)` deseni kaldırıldı, geri getirilmesin).
- **Don't** ikon/rozet kutularına yumuşak `bg-accent/10` tint dolgu + `ring-accent/20` kullan — bunun yerine kılcal `border-border-strong` çerçeve.
- **Don't** başlıklarda Fraunces/Playfair/Cormorant gibi "yayın serifi" fontlarına dönme; Big Shoulders bilinçli bir seçimdi (ayar damgası/kalıba basılmış metal referansı).
- **Don't** sayfa köşelerinden fışkıran çoklu radial-gradient "SaaS ışıması" ekleme; tek üstten spot ışık kuralı geçerli.

## Kapsam notu (uygulanmamış alanlar)

Bu geçiş; global token'lar (`globals.css`), tipografi (`layout.tsx`), marka renkleri (`brand.ts`), ana sayfa kahraman/istatistik/alet-kutusu bölümleri, patika kartı (`track-card.tsx`) ve patika/seviye sayfası (`track-levels.tsx`) için tam olarak uygulandı ve tarayıcıda doğrulandı. Aşağıdaki yüzeyler yeni token'ları otomatik miras alır (semantik Tailwind sınıfları sayesinde) ama bileşen düzeyinde henüz elden geçirilmedi — özellikle eski `bg-gradient-to-*`, `shadow-[0_0_...]`, `bg-accent/10`, `ring-accent` desenlerini hâlâ taşıyan dosyalar: ders sayfası (`lesson-view.tsx` ve alt blokları), admin paneli, avatar stüdyosu, liderlik tablosu, profil sayfası, proje tamamlama ekranı, auth formları, roadmap/reference/how-to detay sayfaları. Bunlar bir sonraki geçişin doğal kapsamıdır.
