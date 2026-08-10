import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  findLeaderboardRankByName,
  formatUtcWeekCountdown,
  isUtcWeekEndingSoon,
  utcWeekEnd,
  utcWeekRemainingParts,
  utcWeekStart,
} from './utcLeaderboardWeek.js'

describe('utcLeaderboardWeek', () => {
  it('utcWeekStart is Monday 00:00 UTC for mid-week and Sunday', () => {
    // Wednesday 2026-08-12 15:00 UTC → week of Mon Aug 10
    const wed = new Date('2026-08-12T15:00:00.000Z')
    assert.equal(utcWeekStart(wed).toISOString(), '2026-08-10T00:00:00.000Z')

    // Sunday 2026-08-16 23:00 UTC still in week of Mon Aug 10
    const sun = new Date('2026-08-16T23:00:00.000Z')
    assert.equal(utcWeekStart(sun).toISOString(), '2026-08-10T00:00:00.000Z')

    // Monday 00:00 exactly starts that week
    const mon = new Date('2026-08-10T00:00:00.000Z')
    assert.equal(utcWeekStart(mon).toISOString(), '2026-08-10T00:00:00.000Z')
  })

  it('utcWeekEnd is the following Monday 00:00 UTC', () => {
    const wed = new Date('2026-08-12T15:00:00.000Z')
    assert.equal(utcWeekEnd(wed).toISOString(), '2026-08-17T00:00:00.000Z')
  })

  it('formatUtcWeekCountdown prefers days then hours', () => {
    const end = new Date('2026-08-17T00:00:00.000Z')
    assert.equal(
      formatUtcWeekCountdown(new Date('2026-08-14T12:00:00.000Z'), end),
      '2d 12h',
    )
    assert.equal(
      formatUtcWeekCountdown(new Date('2026-08-16T21:30:00.000Z'), end),
      '2h 30m',
    )
    assert.equal(
      formatUtcWeekCountdown(new Date('2026-08-16T23:45:00.000Z'), end),
      '15m',
    )
    assert.equal(
      formatUtcWeekCountdown(new Date('2026-08-16T23:59:30.000Z'), end),
      'under 1m',
    )
  })

  it('utcWeekRemainingParts clamps at zero after reset', () => {
    const end = new Date('2026-08-17T00:00:00.000Z')
    const parts = utcWeekRemainingParts(
      new Date('2026-08-17T00:00:01.000Z'),
      end,
    )
    assert.equal(parts.totalMs, 0)
  })

  it('findLeaderboardRankByName matches case-insensitively', () => {
    const rows = [
      { rank: 1, leaderboard_name: 'Alpha' },
      { rank: 2, leaderboard_name: 'Bravo' },
    ]
    assert.equal(findLeaderboardRankByName(rows, 'bravo'), 2)
    assert.equal(findLeaderboardRankByName(rows, 'Missing'), null)
  })

  it('isUtcWeekEndingSoon is true under 24h remaining', () => {
    const end = new Date('2026-08-17T00:00:00.000Z')
    assert.equal(
      isUtcWeekEndingSoon(new Date('2026-08-16T01:00:00.000Z'), end),
      true,
    )
    assert.equal(
      isUtcWeekEndingSoon(new Date('2026-08-15T23:00:00.000Z'), end),
      false,
    )
  })
})
