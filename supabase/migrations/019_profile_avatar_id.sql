-- Preset profile avatars (private — profiles only, not public leaderboards).
-- Catalog: none + sun, pulse (green), shield (red), peak, bolt.

alter table public.profiles
  add column if not exists avatar_id text not null default 'none';

update public.profiles
set avatar_id = 'none'
where avatar_id is not null
  and avatar_id not in (
    'none',
    'mark-sun',
    'mark-pulse',
    'mark-shield',
    'mark-peak',
    'mark-bolt'
  );

alter table public.profiles
  drop constraint if exists profiles_avatar_id_check;

alter table public.profiles
  add constraint profiles_avatar_id_check
  check (
    avatar_id in (
      'none',
      'mark-sun',
      'mark-pulse',
      'mark-shield',
      'mark-peak',
      'mark-bolt'
    )
  );

comment on column public.profiles.avatar_id is
  'Preset avatar catalog id for private UI and public leaderboard name rows. Default none.';
