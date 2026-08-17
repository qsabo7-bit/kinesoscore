import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  awardHabitXp,
  habitXpMultiplier,
} from '../data/habitCatalog.js'
import {
  habitXpByDay,
  perHabitStreakEndingOn,
  previewHabitXpForDate,
  sumLifetimeHabitXp,
} from './habitXp.js'

describe('habit XP multipliers', () => {
  it('ramps to 1.5x by day 5', () => {
    assert.equal(habitXpMultiplier(1), 1)
    assert.equal(habitXpMultiplier(2), 1.1)
    assert.equal(habitXpMultiplier(3), 1.2)
    assert.equal(habitXpMultiplier(4), 1.35)
    assert.equal(habitXpMultiplier(5), 1.5)
    assert.equal(habitXpMultiplier(12), 1.5)
  })

  it('awards rounded base × multiplier', () => {
    assert.equal(awardHabitXp(10, 1), 10)
    assert.equal(awardHabitXp(10, 2), 11)
    assert.equal(awardHabitXp(30, 5), 45)
  })
})

describe('per-habit streak + preview', () => {
  const habit = { id: 'h1', habit_key: 'water' }

  it('counts consecutive completed days ending on a date', () => {
    const checkins = [
      { habit_id: 'h1', checkin_date: '2026-08-14', completed: true },
      { habit_id: 'h1', checkin_date: '2026-08-15', completed: true },
      { habit_id: 'h1', checkin_date: '2026-08-16', completed: true },
    ]
    assert.equal(perHabitStreakEndingOn('h1', checkins, '2026-08-16'), 3)
    assert.equal(perHabitStreakEndingOn('h1', checkins, '2026-08-15'), 2)
  })

  it('resets when a day is missed', () => {
    const checkins = [
      { habit_id: 'h1', checkin_date: '2026-08-14', completed: true },
      { habit_id: 'h1', checkin_date: '2026-08-16', completed: true },
    ]
    assert.equal(perHabitStreakEndingOn('h1', checkins, '2026-08-16'), 1)
  })

  it('previews XP using prior streak + today', () => {
    const checkins = [
      { habit_id: 'h1', checkin_date: '2026-08-15', completed: true },
    ]
    const preview = previewHabitXpForDate(habit, checkins, '2026-08-16')
    assert.equal(preview.streakDays, 2)
    assert.equal(preview.multiplier, 1.1)
    assert.equal(preview.xp, 11)
  })
})

describe('lifetime and daily XP', () => {
  it('sums awarded XP and groups by day', () => {
    const checkins = [
      {
        checkin_date: '2026-08-15',
        completed: true,
        xp_awarded: 10,
      },
      {
        checkin_date: '2026-08-15',
        completed: true,
        xp_awarded: 15,
      },
      {
        checkin_date: '2026-08-16',
        completed: false,
        xp_awarded: 0,
      },
      {
        checkin_date: '2026-08-16',
        completed: true,
        xp_awarded: 30,
      },
    ]
    assert.equal(sumLifetimeHabitXp(checkins), 55)
    assert.equal(habitXpByDay(checkins).get('2026-08-15'), 25)
    assert.equal(habitXpByDay(checkins).get('2026-08-16'), 30)
  })
})
