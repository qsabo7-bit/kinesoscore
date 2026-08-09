-- Stage 10 (optional, local/staging only): EXPLAIN baselines for public boards.
-- Do NOT run against production with ANALYZE on a busy system unless approved.
-- Usage: paste into a staging SQL editor after loading representative share rows.
--
-- Expectations:
--   * LIMIT 100 preserved by RPCs
--   * Indexes on (board_key, is_active, rank_value) / week / streak used when possible

-- All-time performance board
explain (analyze, buffers)
select *
from public.get_public_leaderboard('mykinesoscore', 'all_time');

-- This-week performance board (UTC Monday week)
explain (analyze, buffers)
select *
from public.get_public_leaderboard('mykinesoscore', 'this_week');

-- Habit streak board (all_time only)
explain (analyze, buffers)
select *
from public.get_public_habit_streaks('all_time');
