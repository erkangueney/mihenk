-- ---------------------------------------------------------------------------
-- Premium/reklam altyapısı
--
-- Ödeme/yetki bilgisi kimlikle ilişkili olduğu için `progress` değil
-- `profiles` tablosuna eklenir (bkz. src/lib/entitlements.ts). `progress`
-- tablosu local-first/offline senkronizasyona tabidir — ödeme durumu için
-- yanlış model olur.
-- ---------------------------------------------------------------------------

alter table public.profiles
  add column if not exists plan text not null default 'free'
    check (plan in ('free', 'premium')),
  add column if not exists plan_expires_at timestamptz,
  add column if not exists plan_source text not null default 'none'
    check (plan_source in ('none', 'trial', 'iyzico', 'manual')),
  add column if not exists trial_used boolean not null default false,
  add column if not exists free_track_choice text,
  add column if not exists free_track_choice_changed_at timestamptz;

-- Üye kendi planını/ödeme durumunu doğrudan değiştiremesin — yalnızca
-- service_role (webhook/admin) veya admin. `free_track_choice` bilinçli
-- olarak dışarıda bırakıldı: kullanıcının kendi seçimi, server action
-- (setFreeTrackChoice) ayrıca 30 günlük kilitle doğrular.
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
    new.plan := old.plan;
    new.plan_expires_at := old.plan_expires_at;
    new.plan_source := old.plan_source;
    new.trial_used := old.trial_used;
  end if;
  return new;
end;
$$;

-- Admin üye listesi/detayı plan bilgisini de göstersin.
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
  p.plan,
  p.plan_expires_at,
  p.plan_source,
  p.trial_used,
  p.free_track_choice,
  coalesce(pr.xp, 0)                        as xp,
  coalesce(cardinality(pr.lessons), 0)      as lessons_done,
  coalesce(cardinality(pr.projects), 0)     as projects_done,
  coalesce(cardinality(pr.badges), 0)       as badges_count,
  coalesce(cardinality(pr.active_days), 0)  as active_days_count,
  pr.updated_at                             as last_active
from public.profiles p
left join public.progress pr on pr.user_id = p.id;

grant select on public.admin_members to authenticated;
