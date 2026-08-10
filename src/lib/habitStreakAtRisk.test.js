import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { resolveHabitStreakAtRisk } from './habitStreakAtRisk.js'

describe('resolveHabitStreakAtRisk', () => {
  const habits = [{ id: 'h1', is_active: true }]

  it('flags when yesterday completed and today incomplete', () => {
    const checkins = [
      { habit_id: 'h1', checkin_date: '2026-08-09', completed: true },
      { habit_id: 'h1', checkin_date: '2026-08-08', completed: true },
    ]
    const risk = resolveHabitStreakAtRisk(habits, checkins, '2026-08-10')
    assert.equal(risk?.streakAtRisk, 2)
    assert.equal(risk?.progress.completed, 0)
  })

  it('returns null when today is already complete', () => {
    const checkins = [
      { habit_id: 'h1', checkin_date: '2026-08-10', completed: true },
      { habit_id: 'h1', checkin_date: '2026-08-09', completed: true },
    ]
    assert.equal(
      resolveHabitStreakAtRisk(habits, checkins, '2026-08-10'),
      null,
    )
  })

  it('returns null with no prior streak', () => {
    assert.equal(resolveHabitStreakAtRisk(habits, [], '2026-08-10'), null)
  })
})
