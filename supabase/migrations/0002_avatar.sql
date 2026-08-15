-- ---------------------------------------------------------------------------
-- Avatar sistemi
--
-- İlerlemeye avatar seçimi ve açılan parçalar eklenir. Şekil, TypeScript'teki
-- `AvatarState` ile birebir eşleşir (src/lib/types.ts):
--
--   { base, outfit, accessory, effect, unlocked: string[], spent: number }
--
-- `spent`, avatara harcanan XP'yi tutar. Seviye hesabı ham `xp` üzerinden
-- yapıldığı için harcama kimsenin seviyesini düşürmez; yalnızca harcanabilir
-- bakiyeyi (`xp - spent`) azaltır.
--
-- Sütun jsonb ve varsayılanlı: mevcut satırlar dokunulmadan geçerli kalır,
-- eski istemciler alanı görmezden gelir.
-- ---------------------------------------------------------------------------

alter table public.progress
  add column if not exists avatar jsonb not null default jsonb_build_object(
    'base',      'base-classic',
    'outfit',    'outfit-tee',
    'accessory', null,
    'effect',    null,
    'unlocked',  '[]'::jsonb,
    'spent',     0
  );

-- Liderlik tablosu artık avatarı da gösteriyor. RLS yalnızca kendi satırını
-- okumaya izin verdiği için sıralama security definer fonksiyondan gelir;
-- dönüş tipi değiştiğinden `create or replace` yetmez, önce düşürülmeli.
drop function if exists public.leaderboard_top(integer);

create function public.leaderboard_top(row_limit integer default 50)
returns table (rank bigint, display_name text, xp integer, is_you boolean, avatar jsonb)
language sql
stable
security definer
set search_path = public
as $$
  select
    row_number() over (order by pr.xp desc, pr.updated_at asc) as rank,
    coalesce(nullif(trim(pr.display_name), ''), 'Anonim')      as display_name,
    pr.xp,
    pr.user_id = auth.uid()                                    as is_you,
    pr.avatar
  from public.progress pr
  join public.profiles p on p.id = pr.user_id
  where p.hidden_from_leaderboard = false
    and p.suspended = false
    and pr.xp > 0
  order by pr.xp desc, pr.updated_at asc
  limit least(greatest(coalesce(row_limit, 50), 1), 200);
$$;

grant execute on function public.leaderboard_top(integer) to anon, authenticated;
