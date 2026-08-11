-- Never let profile/avatar side-effects abort auth.users signup.
-- If profiles.avatar_id is missing or a CHECK fails, still create the auth user;
-- the client loadProfile path can backfill the profile afterward.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_first text := coalesce(
    nullif(new.raw_user_meta_data ->> 'first_name', ''),
    'Athlete'
  );
  v_avatar text := (array[
    'mark-sun',
    'mark-pulse',
    'mark-shield',
    'mark-peak',
    'mark-bolt'
  ])[1 + floor(random() * 5)::int];
begin
  begin
    insert into public.profiles (id, first_name, email, avatar_id)
    values (new.id, v_first, new.email, v_avatar)
    on conflict (id) do update
      set email = excluded.email,
          first_name = coalesce(
            nullif(excluded.first_name, ''),
            public.profiles.first_name
          );
  exception
    when undefined_column then
      -- 019 not applied yet — insert without avatar_id.
      begin
        insert into public.profiles (id, first_name, email)
        values (new.id, v_first, new.email)
        on conflict (id) do update
          set email = excluded.email,
              first_name = coalesce(
                nullif(excluded.first_name, ''),
                public.profiles.first_name
              );
      exception
        when others then
          raise warning 'handle_new_user legacy profile insert failed: %', sqlerrm;
      end;
    when check_violation then
      -- Constraint mismatch (e.g. partial migration) — retry with stable default.
      begin
        insert into public.profiles (id, first_name, email, avatar_id)
        values (new.id, v_first, new.email, 'mark-sun')
        on conflict (id) do update
          set email = excluded.email,
              first_name = coalesce(
                nullif(excluded.first_name, ''),
                public.profiles.first_name
              );
      exception
        when others then
          raise warning 'handle_new_user profile fallback failed: %', sqlerrm;
      end;
    when others then
      -- Never block account creation because of profile side-effects.
      raise warning 'handle_new_user profile insert failed: %', sqlerrm;
  end;

  return new;
end;
$$;
