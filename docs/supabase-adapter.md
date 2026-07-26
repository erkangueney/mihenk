# localStorage'dan Supabase'e geçiş

İlerleme deposu bir arayüzün arkasında (`src/lib/storage/adapter.ts`). Bu belge,
giriş (auth) ve cihazlar arası senkron ilerleme eklemek için gereken tek yolu anlatır.

Uygulamanın geri kalanında **hiçbir değişiklik gerekmez** — `useProgress()` aynı kalır.

---

## 1. Supabase projesi ve tablo

[supabase.com](https://supabase.com) üzerinde bir proje aç, ardından SQL Editor'de:

```sql
create table public.progress (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  xp          integer     not null default 0,
  tasks       jsonb       not null default '{}'::jsonb,
  lessons     text[]      not null default '{}',
  projects    text[]      not null default '{}',
  badges      text[]      not null default '{}',
  active_days text[]      not null default '{}',
  display_name text       not null default '',
  updated_at  timestamptz not null default now()
);

-- Satır düzeyi güvenlik: herkes yalnızca kendi satırını görür ve yazar.
alter table public.progress enable row level security;

create policy "kendi ilerlemesini okur"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "kendi ilerlemesini yazar"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "kendi ilerlemesini gunceller"
  on public.progress for update
  using (auth.uid() = user_id);
```

> RLS'i açmayı **atlama**. Açık olmayan bir tabloda anon anahtarıyla herkes herkesin
> satırını okuyabilir.

## 2. Paket ve ortam değişkenleri

```bash
npm install @supabase/supabase-js
```

`.env.local` (bu dosya `.gitignore`'da, commit'lenmez):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Anon anahtarı tarayıcıya açıktır ve açık olması normaldir — güvenliği sağlayan RLS'tir.
`service_role` anahtarını **asla** `NEXT_PUBLIC_` ile başlayan bir değişkene koyma.

## 3. İstemci

`src/lib/storage/supabase-client.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

## 4. Adaptör

`src/lib/storage/supabase.ts`:

```ts
import type { ProgressState } from "../types";
import { emptyProgress, normalize, type ProgressAdapter } from "./adapter";
import { localAdapter } from "./local";
import { supabase } from "./supabase-client";

/**
 * Supabase adaptörü.
 * Kullanıcı giriş yapmamışsa sessizce localStorage'a düşer; böylece giriş
 * zorunlu olmaz ve ziyaretçi de ders çalışabilir.
 */
export const supabaseAdapter: ProgressAdapter = {
  async load(): Promise<ProgressState> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return localAdapter.load();

    const { data, error } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !data) {
      // İlk giriş: cihazdaki ilerlemeyi buluta taşı, kullanıcı emeğini kaybetmesin.
      const local = await localAdapter.load();
      if (local.xp > 0) await supabaseAdapter.save(local);
      return local;
    }

    return normalize({
      xp: data.xp,
      tasks: data.tasks,
      lessons: data.lessons,
      projects: data.projects,
      badges: data.badges,
      activeDays: data.active_days,
      displayName: data.display_name,
    });
  },

  async save(state: ProgressState): Promise<void> {
    // Çevrimdışı da çalışsın diye her zaman yerele de yaz.
    await localAdapter.save(state);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("progress").upsert({
      user_id: user.id,
      xp: state.xp,
      tasks: state.tasks,
      lessons: state.lessons,
      projects: state.projects,
      badges: state.badges,
      active_days: state.activeDays,
      display_name: state.displayName,
      updated_at: new Date().toISOString(),
    });
  },

  async clear(): Promise<void> {
    await localAdapter.clear();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) await supabase.from("progress").delete().eq("user_id", user.id);
  },
};
```

## 5. Geçişi aç

`src/lib/storage/index.ts` içinde tek satır:

```diff
-import { localAdapter } from "./local";
-export const adapter: ProgressAdapter = localAdapter;
+import { supabaseAdapter } from "./supabase";
+export const adapter: ProgressAdapter = supabaseAdapter;
```

## 6. Giriş ekranı

En hızlı yol magic link (şifresiz e-posta):

```tsx
await supabase.auth.signInWithOtp({
  email,
  options: { emailRedirectTo: `${location.origin}/tr` },
});
```

Google ile giriş için Supabase panelinde Google sağlayıcısını etkinleştir, ardından:

```tsx
await supabase.auth.signInWithOAuth({
  provider: "google",
  options: { redirectTo: `${location.origin}/tr` },
});
```

`ProgressProvider` içinde `supabase.auth.onAuthStateChange` dinleyip oturum değiştiğinde
`adapter.load()` çağırmayı unutma — yoksa giriş sonrası eski durum ekranda kalır.

---

## Sonraki adım: gerçek liderlik tablosu

`src/lib/gamification.ts` içindeki `leaderboard()` şu an sabit rakipler kullanıyor.
Supabase'e geçtikten sonra bunu tek bir görünümle değiştirebilirsin:

```sql
create view public.leaderboard as
select display_name, xp
from public.progress
where display_name <> ''
order by xp desc
limit 100;
```

Bu görünüm kişisel veri içermediği için `select` politikasını herkese açabilirsin —
ama önce kullanıcıya adının listede görüneceğini bildiren bir onay ekle.

## Yayına almadan önce kontrol listesi

- [ ] RLS her politikayla birlikte **açık**
- [ ] `service_role` anahtarı hiçbir istemci dosyasında yok
- [ ] `.env.local` commit'lenmemiş (`git log --all --full-history -- .env.local` boş dönmeli)
- [ ] Vercel proje ayarlarında ortam değişkenleri tanımlı
- [ ] Giriş yapmamış kullanıcı hâlâ ders çalışabiliyor (yerele düşüş çalışıyor)
