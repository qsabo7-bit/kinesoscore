-- Public awards default ON for new Leaderboard Names.
-- Profiles that never touched the awards toggle (awards_updated_at is null)
-- are backfilled to show; explicit "Keep private" stays private.

alter table public.leaderboard_profiles
  alter column show_awards_publicly set default true;

update public.leaderboard_profiles
set
  show_awards_publicly = true,
  updated_at = timezone('utc', now())
where show_awards_publicly = false
  and awards_updated_at is null;

comment on column public.leaderboard_profiles.show_awards_publicly is
  'When true, award_running/strength/crown may appear on public leaderboard RPCs. Defaults to true; athletes can Keep private in Account.';
