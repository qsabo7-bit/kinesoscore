import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  computeHabitConsistency,
  consistencyTitle,
} from './habitConsistency.js'

describe('computeHabitConsistency', () => {
  const habits = [
    { id: 'a', is_active: true },
    { id: 'b', is_active: true },
  ]

  it('returns 100 when every day in the window is complete', () => {
    const checkins = []
    for (let i = 0; i < 7; i += 1) {
      const d = `2026-08-${String(16 - i).padStart(2, '0')}`
      checkins.push(
        { habit_id: 'a', checkin_date: d, completed: true },
        { habit_id: 'b', checkin_date: d, completed: true },
      )
    }
    const result = computeHabitConsistency(habits, checkins, {
      windowDays: 7,
      todayKey: '2026-08-16',
    })
    assert.equal(result.percent, 100)
    assert.equal(result.completeDays, 7)
    assert.equal(consistencyTitle(100), 'Locked In')
  })

  it('counts partial weeks correctly', () => {
    const checkins = [
      { habit_id: 'a', checkin_date: '2026-08-16', completed: true },
      { habit_id: 'b', checkin_date: '2026-08-16', completed: true },
    ]
    const result = computeHabitConsistency(habits, checkins, {
      windowDays: 4,
      todayKey: '2026-08-16',
    })
    assert.equal(result.completeDays, 1)
    assert.equal(result.percent, 25)
  })
})
