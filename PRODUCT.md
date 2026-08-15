# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Türkiye merkezli, veri analistliği/veri bilimine yeni başlayan veya kariyer değiştiren kullanıcılar — öğrenciler, yeni mezunlar ve kendi kendine öğrenenler. İkincil kitle: SQL/Python/BI araçlarını iş için hızlıca öğrenmesi gereken çalışanlar. Site TR ve EN dillerinde, TR birincil.

## Product Purpose

Mihenk, sıfırdan veri analistliğine ve veri bilimciliğine giden, oyunlaştırılmış (XP, seviye, seri, rozet, avatar) bir öğrenme platformu. 12 patika (SQL, Python, Power BI, Tableau, Excel, Microsoft Fabric, İstatistik, Veri Görselleştirme, Makine Öğrenmesi, Veri Mühendisliği, R, Git & GitHub), her patikada kademeli seviyeler (Temel → Uzman), 24+ uçtan uca proje. Başarı: kullanıcının kurulum yapmadan, tarayıcıda gerçek kod yazarak beceri kazanması ve bunu portföye dönüştürmesi.

## Positioning

Rakiplerin (Udemy, Coursera, DataCamp, Kodluyoruz) gerçekten birlikte sunmadığı üçlü: (1) kayıt olmadan da keşfedilebilir, kurulum gerektirmeyen **tarayıcıda çalışan gerçek kod motoru** (Python/Pyodide, SQL/sql.js), (2) **oyunlaştırılmış** bir kariyer merdiveni (XP, seviye, seri, rozet, avatar — parayla satılmaz), (3) ücretsiz katmanın **derinliği** (mevcut tüm müfredat serbest; premium yalnızca ek/bonus içerik ve konfor).

## Operating Context

- Web (Next.js 16, App Router) + Capacitor ile sarılmış iOS/Android kabuğu (native tasarım dili değil, aynı web deneyimi).
- Supabase opsiyonel: anahtarsız kurulumda da site çalışır, ilerleme yalnızca tarayıcıda (localStorage) tutulur; anahtarlıyken bulut senkronizasyonu, üyelik, admin paneli devreye girer.
- Öğrenme akışı: Ana sayfa/patika listesi → patika sayfası (seviye/ders listesi) → ders sayfası (metin + quiz/alıştırma blokları) → uçtan uca proje sayfası. Ayrıca patikalardan bağımsız bir "alet çantası": Referans sözlüğü, Nasıl Yapılır, Kopya Kâğıtları, serbest Deneme Alanı.
- Admin paneli (`/admin`): üye yönetimi, içerik editörü, işlem kaydı — yalnızca yöneticiler.

## Capabilities and Constraints

- Ders içerikleri TR/EN ikili bir DSL ile `src/content/tracks/*.ts` dosyalarında yazılı; blok tipleri: text, heading, code, callout, quiz, order, exercise (gerçek çalıştırılabilir, yalnızca python/sql motoru olan derslerde), playground.
- Premium modeli: mevcut tüm içerik (12 patika, tüm seviye, tüm proje) her zaman ücretsiz. Premium yalnızca `premium: true` işaretli, ayrıca üretilecek yeni ders/projelerle var olacak (bkz. `docs/plan-reklam-ve-premium.md`). Admin rolü her zaman premium sayılır, kilit/reklam arayüzünü hiç görmez.
- Reklam (AdSense) ve ödeme (İyzico) altyapısı env-anahtar bağımlı: anahtar yoksa ilgili özellik sessizce kapanır, hataya düşmez.
- Oyunlaştırma çekirdeği (XP, seri, rozet, liderlik) hiçbir katmanda kısıtlanmaz/satılmaz — yalnızca içerik erişimi ve konfor premium'a bağlıdır.
- Site tamamen statik üretiliyor (SSG); kullanıcı planı/kilit durumu istemci tarafında (hydration sonrası) uygulanıyor — bu, tasarımın "yumuşak" (client-side) kilit modeliyle uyumlu kalması gerektiği anlamına gelir.

## Brand Commitments

- İsim: **Mihenk**. Anlatı: mihenk taşı, altının ayarını sınamak için üzerine altın sürülen siyah taştır — platform da veriyle çalışma becerisini aynı şekilde (gerçek kod, uçtan uca projeler, portföye dönüşen çıktılar) sınar. Bu metafor bağlayıcıdır, korunmalıdır.
- Marka rengi: altın/gold vurgu + koyu (dark-first) tema. Bu ikisi bağlayıcı kısıt olarak teyit edildi — tam yeniden tasarımda bile korunmalı.
- Logo/marka kilit bileşeni: `src/components/brand.tsx` (BrandLockup).

## Evidence on Hand

- 12 patika, ~150+ ders, 24+ uçtan uca proje — gerçek, üretilmiş içerik (placeholder değil).
- Alet çantası: 100+ referans girdisi, nasıl-yapılır rehberleri, kopya kâğıtları, serbest deneme alanı — hepsi gerçek içerikle dolu.
- Oyunlaştırma sistemi tam işlevsel: XP, seviye, seri, 12 rozet, liderlik tablosu, avatar stüdyosu.
- Mevcut UI bileşen kütüphanesi (`src/components/`) ve `globals.css`'teki mevcut tasarım token'ları (renk, tipografi) — tam yeniden tasarımda "eski görünüm" olarak referans/anti-referans alınacak, ama marka renk kısıtı (altın+koyu tema) bundan muaftır.

## Product Principles

1. Öğrenmenin kendisi asla kilitli olmaz — kilitlenen yalnızca ek/bonus içerik ve konfor.
2. Kurulumsuz, hızlı: tarayıcıda çalışan gerçek kod motoru deneyimin merkezinde kalır.
3. Oyunlaştırma çekirdeği (XP/seviye/rozet/liderlik) asla parayla satılmaz veya sulandırılmaz.
4. Mihenk taşı metaforu ve altın/koyu marka kimliği, görsel yenilemede de bağlayıcı kalır.
5. TR birincil dil; EN ile birebir eşdeğer içerik zorunlu (hiçbir metin yalnızca tek dilde kalamaz).

## Accessibility & Inclusion

Proje genelinde spesifik bir erişilebilirlik standardı (ör. WCAG AA) resmi olarak talep edilmedi; kullanıcı ek bir kısıt belirtmedi. Mevcut Veri Görselleştirme patikasındaki erişilebilirlik dersi (alt metin, renk körü dostu palet, hareket/animasyon kontrolü) platformun kendi öğrettiği ilkeler olarak makul bir taban kabul edilebilir.
