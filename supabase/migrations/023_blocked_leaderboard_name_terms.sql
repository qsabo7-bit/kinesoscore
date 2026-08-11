-- Block abusive / profane Leaderboard Names (exact token + high-confidence contains).
-- Client mirror: src/lib/blockedNameTerms.js

create table if not exists public.blocked_leaderboard_name_terms (
  term text primary key,
  match_mode text not null
    check (match_mode in ('exact', 'contains'))
);

comment on table public.blocked_leaderboard_name_terms is
  'Profanity blocklist for Leaderboard Names. exact = full name or _/- token; contains = substring of separator-stripped name.';

insert into public.blocked_leaderboard_name_terms (term, match_mode) values
  ('anal', 'exact'),
  ('anus', 'exact'),
  ('ass', 'exact'),
  ('arse', 'exact'),
  ('balls', 'exact'),
  ('clit', 'exact'),
  ('cock', 'exact'),
  ('coon', 'exact'),
  ('crap', 'exact'),
  ('cum', 'exact'),
  ('damn', 'exact'),
  ('dick', 'exact'),
  ('dyke', 'exact'),
  ('fag', 'exact'),
  ('hell', 'exact'),
  ('homo', 'exact'),
  ('jap', 'exact'),
  ('jizz', 'exact'),
  ('kike', 'exact'),
  ('piss', 'exact'),
  ('poop', 'exact'),
  ('porn', 'exact'),
  ('rape', 'exact'),
  ('sex', 'exact'),
  ('slut', 'exact'),
  ('spic', 'exact'),
  ('tit', 'exact'),
  ('tits', 'exact'),
  ('twat', 'exact'),
  ('wank', 'exact'),
  ('wanker', 'exact'),
  ('asshole', 'contains'),
  ('bastard', 'contains'),
  ('bitch', 'contains'),
  ('bollocks', 'contains'),
  ('chink', 'contains'),
  ('cocksuck', 'contains'),
  ('cunt', 'contains'),
  ('dickhead', 'contains'),
  ('faggot', 'contains'),
  ('fagg0t', 'contains'),
  ('fuck', 'contains'),
  ('fuk', 'contains'),
  ('fvck', 'contains'),
  ('gook', 'contains'),
  ('hitler', 'contains'),
  ('motherfuck', 'contains'),
  ('nazi', 'contains'),
  ('nigga', 'contains'),
  ('nigger', 'contains'),
  ('niggr', 'contains'),
  ('onlyfans', 'contains'),
  ('penis', 'contains'),
  ('pussy', 'contains'),
  ('retard', 'contains'),
  ('shit', 'contains'),
  ('sh1t', 'contains'),
  ('vagina', 'contains'),
  ('whore', 'contains')
on conflict (term) do update
  set match_mode = excluded.match_mode;

revoke all on table public.blocked_leaderboard_name_terms from public;
revoke all on table public.blocked_leaderboard_name_terms from anon;
revoke all on table public.blocked_leaderboard_name_terms from authenticated;

create or replace function public.leaderboard_profiles_reject_reserved_name()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text := lower(btrim(new.leaderboard_name));
  v_compact text := regexp_replace(v_name, '[^a-z0-9]', '', 'g');
begin
  if exists (
    select 1
    from public.reserved_leaderboard_names r
    where r.name = v_name
  ) then
    raise exception 'Leaderboard Name is reserved'
      using errcode = 'P0001';
  end if;

  if exists (
    select 1
    from public.blocked_leaderboard_name_terms b
    where b.match_mode = 'exact'
      and (
        b.term = v_name
        or b.term = any (string_to_array(regexp_replace(v_name, '[^a-z0-9]+', ',', 'g'), ','))
      )
  ) then
    raise exception 'Leaderboard Name is not allowed'
      using errcode = 'P0001';
  end if;

  if exists (
    select 1
    from public.blocked_leaderboard_name_terms b
    where b.match_mode = 'contains'
      and position(b.term in v_compact) > 0
  ) then
    raise exception 'Leaderboard Name is not allowed'
      using errcode = 'P0001';
  end if;

  return new;
end;
$$;

drop trigger if exists leaderboard_profiles_reject_reserved_name
  on public.leaderboard_profiles;
create trigger leaderboard_profiles_reject_reserved_name
  before insert or update of leaderboard_name on public.leaderboard_profiles
  for each row
  execute function public.leaderboard_profiles_reject_reserved_name();

revoke all on function public.leaderboard_profiles_reject_reserved_name()
  from public;
revoke all on function public.leaderboard_profiles_reject_reserved_name()
  from anon;
revoke all on function public.leaderboard_profiles_reject_reserved_name()
  from authenticated;
