-- ============================================================================
-- Veri Akademi — temel şema
--
-- Supabase SQL Editor'e bu dosyanın tamamını yapıştırıp çalıştır.
-- Tekrar çalıştırılabilir (idempotent): var olan nesneleri bozmaz.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Profiller
--    auth.users kimlik doğrulamayı tutar; uygulamaya özel alanlar burada.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id                      uuid        primary key references auth.users(id) on delete cascade,
  email                   text        not null default '',
  display_name            text        not null default '',
  -- 'admin' yalnızca panelden veya SQL ile verilir; kayıt sırasında asla.
  role                    text        not null default 'member' check (role in ('member', 'admin')),
  -- Liderlik tablosundan gizlenen üyeler (istek üzerine veya moderasyon).
  hidden_from_leaderboard boolean     not null default false,
  -- Girişi kapatılmış üye. auth tarafında ban ile birlikte kullanılır.
  suspended               boolean     not null default false,
  note                    text        not null default '',
  created_at              timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. İlerleme
--    ProgressState (src/lib/types.ts) ile birebir eşleşir.
-- ---------------------------------------------------------------------------
-- user_id, auth.users yerine profiles'ı gösterir. İkisi de aynı kimliği
-- tutar ama bu yönde bir yabancı anahtar olmadan PostgREST profiles ile
-- progress'i tek sorguda birleştiremez (admin listesi buna dayanıyor).
-- profiles.id zaten auth.users'a bağlı olduğundan silme zinciri korunur.
create table if not exists public.progress (
  user_id      uuid        primary key references public.profiles(id) on delete cascade,
  xp           integer     not null default 0,
  tasks        jsonb       not null default '{}'::jsonb,
  lessons      text[]      not null default '{}',
  projects     text[]      not null default '{}',
  badges       text[]      not null default '{}',
  active_days  text[]      not null default '{}',
  display_name text        not null default '',
  updated_at   timestamptz not null default now()
);

create index if not exists progress_xp_idx on public.progress (xp desc);

-- ---------------------------------------------------------------------------
-- 3. İçerik dokümanları
--    Dosya tabanlı içerik (src/content) taban sürümdür. Buradaki kayıtlar
--    onu geçersiz kılar (override) veya yeni patika/proje ekler.
--    data: Track ya da Project nesnesinin JSON hâli.
-- ---------------------------------------------------------------------------
create table if not exists public.content_docs (
  id         uuid        primary key default gen_random_uuid(),
  kind       text        not null check (kind in ('track', 'project')),
  slug       text        not null,
  data       jsonb       not null,
  -- Yalnızca yayınlanan dokümanlar siteye yansır; taslaklar yalnızca adminde görünür.
  published  boolean     not null default false,
  -- Dosyadaki bir slug'ı geçersiz kılıyorsa true; tamamen yeni içerikse false.
  updated_at timestamptz not null default now(),
  updated_by uuid        references auth.users(id) on delete set null,
  unique (kind, slug)
);

-- ---------------------------------------------------------------------------
-- 4. Yönetim işlem kaydı
-- ---------------------------------------------------------------------------
create table if not exists public.audit_log (
  id         bigserial   primary key,
  actor_id   uuid        references auth.users(id) on delete set null,
  actor_email text       not null default '',
  action     text        not null,
  target     text        not null default '',
  detail     jsonb       not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_created_idx on public.audit_log (created_at desc);

-- ============================================================================
-- Yardımcı fonksiyonlar
-- ============================================================================

-- Çağıran kullanıcı admin mi?
-- security definer: profiles üzerindeki RLS politikaları bu fonksiyonu
-- çağırdığında sonsuz özyineleme oluşmasın diye politikaları atlar.
create or replace function public.is_admin(uid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = uid and role = 'admin'
  );
$$;

-- Yeni kayıt olan her kullanıcı için profil ve ilerleme satırı açar.
--
-- ÖNEMLİ: rol asla raw_user_meta_data'dan okunmaz. Kayıt sırasında istemci
-- metadata'ya istediğini yazabilir; oradan rol okumak herkesin kendini admin
-- yapabilmesi demek olurdu. Rol yalnızca admin panelinden veya SQL ile verilir.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  name text;
begin
  name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
    split_part(coalesce(new.email, ''), '@', 1)
  );

  insert into public.profiles (id, email, display_name)
  values (new.id, coalesce(new.email, ''), left(name, 40))
  on conflict (id) do nothing;

  insert into public.progress (user_id, display_name)
  values (new.id, left(name, 40))
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Üye kendi profilini güncellerken yetki alanlarına dokunamaz.
-- RLS satırı görünür kılar; ayrıcalık yükseltmeyi bu tetikleyici engeller.
create or replace function public.protect_profile_columns()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') <> 'service_role' and not public.is_admin() then
    new.role := old.role;
    new.hidden_from_leaderboard := old.hidden_from_leaderboard;
    new.suspended := old.suspended;
    new.email := old.email;
    new.note := old.note;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_columns on public.profiles;
create trigger profiles_protect_columns
  before update on public.profiles
  for each row execute function public.protect_profile_columns();

-- İlerleme yazımında updated_at'i sunucu belirler.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists progress_touch on public.progress;
create trigger progress_touch
  before insert or update on public.progress
  for each row execute function public.touch_updated_at();

drop trigger if exists content_docs_touch on public.content_docs;
create trigger content_docs_touch
  before insert or update on public.content_docs
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Liderlik tablosu
--
-- progress üzerindeki RLS herkesin yalnızca kendi satırını okumasına izin
-- verir. Sıralama ise herkese açık olmalı — bu yüzden security definer bir
-- fonksiyonla yalnızca gerekli iki alanı (ad, XP) dışarı veriyoruz.
-- ---------------------------------------------------------------------------
-- is_you: satırın çağırana ait olup olmadığını sunucu söyler. Ada göre
-- eşleştirmek aynı adı taşıyan iki üyede yanlış satırı işaretlerdi; kullanıcı
-- kimliğini dışarı vermek ise gereksiz bir sızıntı olurdu.
create or replace function public.leaderboard_top(row_limit integer default 50)
returns table (rank bigint, display_name text, xp integer, is_you boolean)
language sql
stable
security definer
set search_path = public
as $$
  select
    row_number() over (order by pr.xp desc, pr.updated_at asc) as rank,
    coalesce(nullif(trim(pr.display_name), ''), 'Anonim')      as display_name,
    pr.xp,
    pr.user_id = auth.uid()                                    as is_you
  from public.progress pr
  join public.profiles p on p.id = pr.user_id
  where p.hidden_from_leaderboard = false
    and p.suspended = false
    and pr.xp > 0
  order by pr.xp desc, pr.updated_at asc
  limit least(greatest(coalesce(row_limit, 50), 1), 200);
$$;

grant execute on function public.leaderboard_top(integer) to anon, authenticated;

-- Çağıranın liderlik tablosundaki sırası (tabloya girmeyecek kadar geride olsa da).
create or replace function public.leaderboard_rank_of(uid uuid default auth.uid())
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::integer + 1
  from public.progress pr
  join public.profiles p on p.id = pr.user_id
  where p.hidden_from_leaderboard = false
    and p.suspended = false
    and pr.xp > coalesce((select xp from public.progress where user_id = uid), 0);
$$;

grant execute on function public.leaderboard_rank_of(uuid) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Üye listesi görünümü
--
-- Admin listesi hem profil hem ilerleme alanlarına göre filtreleyip
-- sıralayabilmeli. PostgREST bir tabloyu gömülü tablonun sütununa göre
-- sıralayamadığı için birleşimi görünüm olarak veriyoruz.
--
-- security_invoker = on ŞART: kapalıyken görünüm sahibinin haklarıyla
-- çalışır ve RLS'i tamamen atlar — yani her üye herkesin satırını görürdü.
-- ---------------------------------------------------------------------------
create or replace view public.admin_members
with (security_invoker = on) as
select
  p.id,
  p.email,
  p.display_name,
  p.role,
  p.hidden_from_leaderboard,
  p.suspended,
  p.note,
  p.created_at,
  coalesce(pr.xp, 0)                        as xp,
  coalesce(cardinality(pr.lessons), 0)      as lessons_done,
  coalesce(cardinality(pr.projects), 0)     as projects_done,
  coalesce(cardinality(pr.badges), 0)       as badges_count,
  coalesce(cardinality(pr.active_days), 0)  as active_days_count,
  pr.updated_at                             as last_active
from public.profiles p
left join public.progress pr on pr.user_id = p.id;

grant select on public.admin_members to authenticated;

-- Admin gösterge paneli sayıları — tek turda.
create or replace function public.admin_overview()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select case
    when not public.is_admin() then '{}'::jsonb
    else jsonb_build_object(
      'members',      (select count(*) from public.profiles),
      'admins',       (select count(*) from public.profiles where role = 'admin'),
      'suspended',    (select count(*) from public.profiles where suspended),
      'active_today', (select count(*) from public.progress
                        where to_char(now(), 'YYYY-MM-DD') = any(active_days)),
      'active_week',  (select count(*) from public.progress where updated_at > now() - interval '7 days'),
      'total_xp',     (select coalesce(sum(xp), 0) from public.progress),
      'lessons_done', (select coalesce(sum(cardinality(lessons)), 0) from public.progress),
      'projects_done',(select coalesce(sum(cardinality(projects)), 0) from public.progress),
      'drafts',       (select count(*) from public.content_docs where not published),
      'overrides',    (select count(*) from public.content_docs where published)
    )
  end;
$$;

grant execute on function public.admin_overview() to authenticated;

-- ============================================================================
-- Tablo ayrıcalıkları
--
-- RLS ile ayrıcalıklar İKİ AYRI katmandır ve ikisi de gerekir:
--   • GRANT   → role tabloya hiç dokunabilir mi?
--   • RLS     → dokunabiliyorsa HANGİ satırlara?
--
-- Supabase'in `public` şeması için varsayılan ayrıcalıkları anon,
-- authenticated ve service_role'e yalnızca TRUNCATE/REFERENCES/TRIGGER verir;
-- SELECT/INSERT/UPDATE/DELETE vermez. Bu bölüm olmadan service_role bile
-- "permission denied for table profiles" alır — RLS'i atlaması işe yaramaz,
-- çünkü sorun satırlarda değil tablonun kendisindedir.
--
-- Aşağıdaki izinler bilinçli olarak dar tutuldu; satır bazlı kısıtı
-- bir sonraki bölümdeki politikalar koyuyor.
-- ============================================================================

-- Yayınlanan içeriği giriş yapmamış ziyaretçi de okur.
grant select on public.content_docs to anon;

-- Üye kendi profilini okur/günceller (yetki alanları tetikleyiciyle korunur).
grant select, update on public.profiles to authenticated;

-- Üye kendi ilerlemesini okur ve yazar.
grant select, insert, update on public.progress to authenticated;

-- İçerik: okuma herkese açık satırlarla sınırlı, yazma politikayla admine.
grant select, insert, update, delete on public.content_docs to authenticated;

-- İşlem kayıtlarını yalnızca admin okur (politika); yazma service_role ile.
grant select on public.audit_log to authenticated;
grant usage, select on sequence public.audit_log_id_seq to service_role;

-- service_role RLS'i atlar ama tablo ayrıcalığına yine ihtiyacı vardır.
grant all on public.profiles, public.progress, public.content_docs, public.audit_log
  to service_role;

-- ============================================================================
-- Satır düzeyi güvenlik
--
-- RLS açık olmayan bir tabloyu anon anahtarıyla herkes okuyabilir. Aşağıdaki
-- politikalar olmadan bu şemayı canlıya ALMA.
-- ============================================================================

alter table public.profiles     enable row level security;
alter table public.progress     enable row level security;
alter table public.content_docs enable row level security;
alter table public.audit_log    enable row level security;

-- profiles ------------------------------------------------------------------
drop policy if exists "profil: kendini gorur" on public.profiles;
create policy "profil: kendini gorur"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "profil: kendini gunceller" on public.profiles;
create policy "profil: kendini gunceller"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

-- INSERT/DELETE yok: profil satırı tetikleyiciyle açılır, kullanıcı silme
-- işlemi yalnızca service_role ile (admin panelinden) yapılır.

-- progress ------------------------------------------------------------------
drop policy if exists "ilerleme: kendini gorur" on public.progress;
create policy "ilerleme: kendini gorur"
  on public.progress for select
  using (auth.uid() = user_id or public.is_admin());

drop policy if exists "ilerleme: kendini ekler" on public.progress;
create policy "ilerleme: kendini ekler"
  on public.progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "ilerleme: kendini gunceller" on public.progress;
create policy "ilerleme: kendini gunceller"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- content_docs --------------------------------------------------------------
drop policy if exists "icerik: yayinlanani herkes okur" on public.content_docs;
create policy "icerik: yayinlanani herkes okur"
  on public.content_docs for select
  using (published or public.is_admin());

drop policy if exists "icerik: admin yazar" on public.content_docs;
create policy "icerik: admin yazar"
  on public.content_docs for all
  using (public.is_admin())
  with check (public.is_admin());

-- audit_log -----------------------------------------------------------------
drop policy if exists "kayit: admin okur" on public.audit_log;
create policy "kayit: admin okur"
  on public.audit_log for select
  using (public.is_admin());

-- Yazma yalnızca service_role ile (RLS'i atlar) yapılır.
