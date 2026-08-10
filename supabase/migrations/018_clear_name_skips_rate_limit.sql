-- Clearing a Leaderboard Name is a privacy exit and must never burn the
-- name-change rate limit (5 / hour). Award-only profile updates also must not.
-- Only insert / rename of leaderboard_name counts.

create or replace function public.leaderboard_profiles_enforce_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid;
  v_skip text;
begin
  begin
    v_skip := nullif(current_setting('request.skip_name_rate_limit', true), '');
  exception when others then
    v_skip := null;
  end;

  -- Account deletion sets this so delete_own_account cannot be blocked.
  if v_skip = '1' then
    return coalesce(new, old);
  end if;

  -- Clear Name / profile delete: never rate-limited.
  if tg_op = 'DELETE' then
    return old;
  end if;

  -- Award toggles and other non-name updates do not count as a name change.
  if tg_op = 'UPDATE'
     and new.leaderboard_name is not distinct from old.leaderboard_name then
    return new;
  end if;

  uid := coalesce(new.user_id, old.user_id);
  perform public.enforce_write_rate_limit(
    uid,
    'leaderboard_name',
    5,
    interval '1 hour'
  );
  return coalesce(new, old);
end;
$$;

drop trigger if exists leaderboard_profiles_enforce_rate_limit
  on public.leaderboard_profiles;
create trigger leaderboard_profiles_enforce_rate_limit
  before insert or update or delete on public.leaderboard_profiles
  for each row
  execute function public.leaderboard_profiles_enforce_rate_limit();

revoke all on function public.leaderboard_profiles_enforce_rate_limit()
  from public;
revoke all on function public.leaderboard_profiles_enforce_rate_limit()
  from anon;
revoke all on function public.leaderboard_profiles_enforce_rate_limit()
  from authenticated;
