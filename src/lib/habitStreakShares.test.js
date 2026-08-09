import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { computeHabitStreak } from './habitStreaks.js'

const migrationPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../supabase/migrations/006_habit_streak_sharing.sql',
)

/**
 * Stage 8 relies on Stage 7 streak rules for published values.
 * These tests lock the shared semantics the SQL function must mirror.
 */
describe('compute_user_habit_streak privilege isolation (Stage 8)', () => {
  it('does not grant authenticated/anon/public execute on compute helper', () => {
    const sql = readFileSync(migrationPath, 'utf8')
    assert.match(
      sql,
      /revoke all on function public\.compute_user_habit_streak\(uuid, date\) from public;/i,
    )
    assert.match(
      sql,
      /revoke all on function public\.compute_user_habit_streak\(uuid, date\) from anon;/i,
    )
    assert.match(
      sql,
      /revoke all on function public\.compute_user_habit_streak\(uuid, date\) from authenticated;/i,
    )
    assert.doesNotMatch(
      sql,
      /grant execute on function public\.compute_user_habit_streak\(uuid, date\)\s+to authenticated/i,
    )
    assert.doesNotMatch(
      sql,
      /grant execute on function public\.compute_user_habit_streak\(uuid, date\)\s+to anon/i,
    )
    assert.match(
      sql,
      /Not allowed to compute another user''s habit streak/i,
    )
    assert.match(sql, /errcode = '42501'/)
  })
})

describe('habit streak sharing semantics (Stage 8)', () => {
  const today = '2026-08-08'

  it('published streak cannot come from partial completion', () => {
    const habits = [
      { id: 'a', is_active: true },
      { id: 'b', is_active: true },
    ]
    const checkins = [
      { habit_id: 'a', checkin_date: today, completed: true },
      { habit_id: 'b', checkin_date: today, completed: false },
    ]
    assert.equal(computeHabitStreak(habits, checkins, { todayKey: today }), 0)
  })

  it('no Leaderboard Name scenario still has private streak of 0 without full completion', () => {
    // Privacy gate is server-side; streak math still requires full completion.
    assert.equal(computeHabitStreak([], [], { todayKey: today }), 0)
  })

  it('full completion yields a shareable positive streak foundation', () => {
    const habits = [
      { id: 'a', is_active: true },
      { id: 'b', is_active: true },
    ]
    const checkins = [
      { habit_id: 'a', checkin_date: today, completed: true },
      { habit_id: 'b', checkin_date: today, completed: true },
      { habit_id: 'a', checkin_date: '2026-08-07', completed: true },
      { habit_id: 'b', checkin_date: '2026-08-07', completed: true },
    ]
    assert.equal(computeHabitStreak(habits, checkins, { todayKey: today }), 2)
  })

  it('inactive habits are excluded from the shareable streak', () => {
    const habits = [
      { id: 'a', is_active: true },
      { id: 'old', is_active: false },
    ]
    const checkins = [
      { habit_id: 'a', checkin_date: today, completed: true },
      { habit_id: 'old', checkin_date: today, completed: false },
    ]
    assert.equal(computeHabitStreak(habits, checkins, { todayKey: today }), 1)
  })
})
