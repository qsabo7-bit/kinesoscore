import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  computeHabitStreak,
  habitDayProgress,
  isHabitDayComplete,
} from './habitStreaks.js'

const today = '2026-08-08'
const yesterday = '2026-08-07'
const twoDaysAgo = '2026-08-06'
const future = '2026-08-09'

const habits = [
  { id: 'a', is_active: true },
  { id: 'b', is_active: true },
  { id: 'c', is_active: true },
  { id: 'd', is_active: true },
]

describe('habit streak foundation', () => {
  it('no habits → streak 0', () => {
    assert.equal(computeHabitStreak([], [], { todayKey: today }), 0)
  })

  it('one active habit completed → day counts', () => {
    const one = [{ id: 'a', is_active: true }]
    const checkins = [
      { habit_id: 'a', checkin_date: today, completed: true },
    ]
    assert.equal(isHabitDayComplete(today, one, checkins, today), true)
    assert.equal(computeHabitStreak(one, checkins, { todayKey: today }), 1)
  })

  it('multiple active habits, all complete → day counts', () => {
    const checkins = habits.map((h) => ({
      habit_id: h.id,
      checkin_date: today,
      completed: true,
    }))
    assert.equal(isHabitDayComplete(today, habits, checkins, today), true)
    assert.equal(
      habitDayProgress(today, habits, checkins, today).ratioLabel,
      '4/4',
    )
  })

  it('multiple active habits, one incomplete → day does not count', () => {
    const checkins = [
      { habit_id: 'a', checkin_date: today, completed: true },
      { habit_id: 'b', checkin_date: today, completed: true },
      { habit_id: 'c', checkin_date: today, completed: true },
      { habit_id: 'd', checkin_date: today, completed: false },
    ]
    assert.equal(isHabitDayComplete(today, habits, checkins, today), false)
    assert.equal(computeHabitStreak(habits, checkins, { todayKey: today }), 0)
    assert.equal(
      habitDayProgress(today, habits, checkins, today).ratioLabel,
      '3/4',
    )
  })

  it('missing day breaks streak', () => {
    const checkins = [
      ...habits.map((h) => ({
        habit_id: h.id,
        checkin_date: today,
        completed: true,
      })),
      // yesterday missing
      ...habits.map((h) => ({
        habit_id: h.id,
        checkin_date: twoDaysAgo,
        completed: true,
      })),
    ]
    assert.equal(computeHabitStreak(habits, checkins, { todayKey: today }), 1)
  })

  it('inactive habits do not count toward completion', () => {
    const mixed = [
      { id: 'a', is_active: true },
      { id: 'b', is_active: true },
      { id: 'x', is_active: false },
    ]
    const checkins = [
      { habit_id: 'a', checkin_date: today, completed: true },
      { habit_id: 'b', checkin_date: today, completed: true },
      // inactive incomplete would have broken old logic
      { habit_id: 'x', checkin_date: today, completed: false },
    ]
    assert.equal(isHabitDayComplete(today, mixed, checkins, today), true)
    assert.equal(computeHabitStreak(mixed, checkins, { todayKey: today }), 1)
  })

  it('historical inactive habits do not incorrectly break current streaks', () => {
    const current = [
      { id: 'a', is_active: true },
      { id: 'b', is_active: true },
      { id: 'old', is_active: false },
    ]
    const checkins = [
      { habit_id: 'a', checkin_date: today, completed: true },
      { habit_id: 'b', checkin_date: today, completed: true },
      { habit_id: 'a', checkin_date: yesterday, completed: true },
      { habit_id: 'b', checkin_date: yesterday, completed: true },
      // old habit incomplete yesterday — ignored because inactive
      { habit_id: 'old', checkin_date: yesterday, completed: false },
    ]
    assert.equal(computeHabitStreak(current, checkins, { todayKey: today }), 2)
  })

  it('future dates do not count', () => {
    const one = [{ id: 'a', is_active: true }]
    const checkins = [
      { habit_id: 'a', checkin_date: future, completed: true },
    ]
    assert.equal(isHabitDayComplete(future, one, checkins, today), false)
    assert.equal(computeHabitStreak(one, checkins, { todayKey: today }), 0)
  })
})
