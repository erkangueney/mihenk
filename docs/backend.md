# Backend mimarisi

Kurulum adımları için `docs/kurulum.md`. Bu belge sistemin **neden** böyle kurulduğunu anlatır.

---

## Temel ilke: Supabase isteğe bağlıdır

Anahtarlar tanımlı değilken uygulama tam olarak eskisi gibi davranır — ilerleme
localStorage'da, üyelik ve panel kapalı. Bunu sağlayan tek bayrak:

```ts
// src/lib/supabase/config.ts
export const supabaseEnabled = SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
```

Her Supabase istemci fabrikası anahtar yoksa `null` döner; çağıran taraf bunu "özellik
kapalı" diye okur. Böylece depoyu klonlayan biri hiçbir kurulum yapmadan `npm run dev`
diyebilir.

---

## Dört Supabase istemcisi, dört farklı iş

Hangisini kullanacağını seçmek önemlidir; yanlış seçim ya güvenlik açığı ya da
performans kaybı doğurur.

| Dosya | Çalıştığı yer | Yetki | Ne zaman |
|---|---|---|---|
| `supabase/client.ts` | Tarayıcı | Kullanıcının oturumu | İstemci bileşenleri, ilerleme yazımı |
| `supabase/server.ts` | Sunucu | Kullanıcının oturumu (çerez) | Yetki gerektiren okumalar, admin sorguları |
| `supabase/public.ts` | Sunucu | Anon (oturumsuz) | Herkese açık içerik okuma |
| `supabase/admin.ts` | Sunucu | `service_role` — RLS'i atlar | Yalnızca üye açma/silme/şifre |

**`public.ts` neden ayrı?** `server.ts` `cookies()` çağırır ve `cookies()` dinamik bir
API'dir — onu kullanan sayfa istek anında render edilmeye başlar. İçerik sayfaları
derleme anında üretiliyor (SSG) ve öyle kalmalı. Yayınlanan içerik zaten anon rolüne
açık olduğundan oturuma gerek yok.

**`admin.ts` neden tehlikeli?** RLS'i tamamen atlar. Bu yüzden:

1. `server-only` importu var — bir istemci bileşenine sızarsa derleme hata verir.
2. Kendi başına hiçbir yetki kontrolü yapmaz. Her çağrıdan önce `requireAdmin()` /
   `checkAdmin()` çalışmalıdır.

---

## Yetki: üç katman, biri asıl

```
proxy.ts          → iyimser kapı. Oturum çerezi yoksa /admin'e sokmaz.
                    YETKİ KONTROLÜ DEĞİLDİR, sadece kullanıcı deneyimi.

admin/layout.tsx  → requireAdmin(). Sayfa ağacının kapısı.

lib/admin/actions → her action'ın ilk satırı guard(). ASIL KONTROL BURADA.
```

Üçüncüsü neden vazgeçilmez: bir server action, onu çağıran sayfaya POST edilen bir uç
noktadır. Layout'taki kontrolü geçmeden doğrudan POST edilebilir. Bu yüzden her
mutasyon kendi yetkisini kendi doğrular.

`getCurrentUser()` içinde `getSession()` değil `getUser()` kullanılır: `getSession`
çerezdeki JWT'ye olduğu gibi güvenir, `getUser` Supabase'e doğrulatır. Yetki kararı
verilecek yerde tek güvenilir olan ikincisidir.

### Rol yükseltmeye karşı iki kilit

Kayıt sırasında istemci `user_metadata`'ya istediğini yazabilir. Bu yüzden:

1. `handle_new_user()` tetikleyicisi rolü **asla** metadata'dan okumaz; herkes
   `member` olarak başlar.
2. `protect_profile_columns()` tetikleyicisi, admin olmayan bir güncellemede
   `role`, `suspended`, `hidden_from_leaderboard` ve `email` alanlarını eski
   değerlerine geri yazar.

Rol yalnızca `service_role` ile (panelden veya `npm run create-admin` ile) değişir.

---

## İlerleme senkronu

`ProgressAdapter` arayüzü değişmedi; yalnızca hangi uygulamanın seçildiği değişti:

```ts
export const adapter = supabaseEnabled ? supabaseAdapter : localAdapter;
```

`supabaseAdapter` davranışı:

- **Giriş yoksa** tamamen localStorage'a düşer — ziyaretçi de ders çalışabilir.
- **İlk girişte** cihazdaki ilerleme buluttakiyle *birleştirilir* (üzerine yazılmaz).
  Görev XP'lerinde yüksek olan, listelerde birleşim alınır. Kimse emeğini kaybetmez.
- **Yazma** önce yerele (anında), sonra buluta (~1,2 sn geciktirilmiş) gider. Her
  tıklamada bir ağ isteği doğmaz; çevrimdışıyken de çalışır. Sekme kapanırken
  `pagehide` ile bekleyen yazım gönderilir.

`ProgressProvider` oturum kimliğini izler; giriş/çıkışta ilerlemeyi doğru kaynaktan
yeniden okur.

---

## İçerik: dosya taban, veritabanı katman

İçerik `src/content` altında TypeScript olarak durur — sürüm kontrolünde, kod
incelemesinden geçer. Panelden yapılan düzenlemeler dosyaları değiştirmez;
`content_docs` tablosuna yazılır ve okuma sırasında üzerine biner:

```
dosyadaki patikalar
  + veritabanındaki YAYINLANMIŞ dokümanlar
      aynı slug  → dosyadakinin yerine geçer
      yeni slug  → listeye eklenir
```

Bu `src/lib/content-docs/resolve.ts` içinde olur. Bozuk bir doküman sessizce yok
sayılır ve dosyadaki sürüm ayakta kalır — hatalı bir kayıt yüzünden site çökmez.

Yazmadan önce `validate.ts` belgeyi tam olarak doğrular ve hataları yol bilgisiyle
döndürür (`levels[0].lessons[2].blocks[1].xp: sayı olmalı`). Elle JSON düzenleyen
birine "geçersiz doküman" demek yeterli değildir.

İçerik değiştiğinde `revalidatePath("/", "layout")` çağrılır; SSG sayfaları yeniden
üretilir.

---

## Liderlik tablosu

`progress` üzerindeki RLS herkesin yalnızca kendi satırını okumasına izin verir. Sıralama
ise herkese açık olmalı. Çözüm: `leaderboard_top()` — `security definer` bir fonksiyon,
yalnızca ad ve XP'yi dışarı verir. Gizlenen ve askıya alınmış üyeler hariç tutulur.

Satırın kullanıcıya ait olup olmadığını (`is_you`) sunucu söyler. Ada göre eşleştirmek
aynı adı taşıyan iki üyede yanlış satırı işaretlerdi; kullanıcı kimliğini dışarı vermek
ise gereksiz bir sızıntı olurdu.

---

## Neden `proxy.ts`, `middleware.ts` değil

Next.js 16'da Middleware'in adı **Proxy** oldu; davranış aynı. Dosya `src/proxy.ts`
konumunda ve `proxy` adlı bir fonksiyon dışa aktarıyor.

`matcher` bilinçli olarak dar: içerik sayfaları statik üretiliyor, her isteğin önüne bir
Supabase turu koymanın anlamı yok. Yalnızca `/admin`, giriş/kayıt ve profil yollarında
çalışır.
