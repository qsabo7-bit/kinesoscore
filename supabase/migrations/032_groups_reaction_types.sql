-- Groups reactions: allow heart + skull alongside thumbsup.
-- Idempotent. Additive on 024–031.

alter table public.group_activity_reactions
  drop constraint if exists group_activity_reactions_reaction_check;

alter table public.group_activity_reactions
  add constraint group_activity_reactions_reaction_check
  check (reaction in ('thumbsup', 'heart', 'skull'));
