import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  aggregateActivityTotals,
  buildActivityLeaderboard,
  formatActivityAmount,
  formatActivityFeedLine,
  formatLeaderboardAmount,
  formatLocalWeekRangeLabel,
  formatRelativeActivityTime,
  countUniqueLoggers,
  localWeekEndKey,
  localWeekStartKey,
  parseGroupsRoute,
  pathForGroup,
  shiftLocalWeekStart,
} from './groupActivityWeeks.js'

describe('group activity weeks', () => {
  it('uses Monday–Sunday local weeks', () => {
    // 2026-08-14 is a Friday
    assert.equal(localWeekStartKey('2026-08-14'), '2026-08-10')
    assert.equal(localWeekEndKey('2026-08-10'), '2026-08-16')
    assert.equal(shiftLocalWeekStart('2026-08-10', -1), '2026-08-03')
  })

  it('formats week labels like Week of Aug 10–16', () => {
    assert.match(
      formatLocalWeekRangeLabel('2026-08-10'),
      /Week of .+ 10–16/,
    )
  })

  it('formats totals for reps and miles', () => {
    assert.equal(
      formatActivityAmount(1420, 'reps', { withTotalSuffix: true }),
      '1,420 total',
    )
    assert.equal(formatActivityAmount(42.6, 'miles'), '42.6 miles')
  })

  it('formats relative activity times and unique loggers', () => {
    assert.equal(formatRelativeActivityTime(new Date().toISOString()), 'just now')
    assert.equal(
      countUniqueLoggers([
        { user_id: 'a' },
        { user_id: 'b' },
        { user_id: 'a' },
      ]),
      2,
    )
  })
})

describe('group activity helpers', () => {
  it('aggregates group and user totals', () => {
    const { groupTotals, userTotals } = aggregateActivityTotals(
      [
        { activity_type_id: 'a', amount: 50, user_id: 'u1' },
        { activity_type_id: 'a', amount: 30, user_id: 'u2' },
        { activity_type_id: 'b', amount: 8.4, user_id: 'u1' },
      ],
      'u1',
    )
    assert.equal(groupTotals.get('a'), 80)
    assert.equal(userTotals.get('a'), 50)
    assert.equal(userTotals.get('b'), 8.4)
  })

  it('parses /groups/:id/activity routes', () => {
    assert.deepEqual(parseGroupsRoute('/groups'), {
      groupId: null,
      section: null,
    })
    assert.deepEqual(parseGroupsRoute('/groups/abc'), {
      groupId: 'abc',
      section: null,
    })
    assert.deepEqual(parseGroupsRoute('/groups/abc/activity'), {
      groupId: 'abc',
      section: 'activity',
    })
    assert.deepEqual(parseGroupsRoute('/groups/abc/leaderboard'), {
      groupId: 'abc',
      section: 'leaderboard',
    })
    assert.deepEqual(parseGroupsRoute('/groups/abc/people'), {
      groupId: 'abc',
      section: 'people',
    })
    assert.equal(pathForGroup('abc', 'overview'), '/groups/abc')
    assert.equal(pathForGroup('abc', 'activity'), '/groups/abc/activity')
    assert.equal(pathForGroup('abc', 'leaderboard'), '/groups/abc/leaderboard')
    assert.equal(pathForGroup('abc', 'people'), '/groups/abc/people')
    assert.equal(pathForGroup('abc', 'settings'), '/groups/abc/settings')
  })

  it('ranks weekly activity by user', () => {
    const members = new Map([
      ['u1', { user_id: 'u1', leaderboard_name: 'alex' }],
      ['u2', { user_id: 'u2', leaderboard_name: 'quinn' }],
    ])
    const board = buildActivityLeaderboard(
      [
        { user_id: 'u1', activity_type_id: 'push', amount: 200 },
        { user_id: 'u1', activity_type_id: 'push', amount: 142 },
        { user_id: 'u2', activity_type_id: 'push', amount: 310 },
        { user_id: 'u2', activity_type_id: 'run', amount: 5 },
      ],
      'push',
      members,
    )
    assert.equal(board[0].handle, '@alex')
    assert.equal(board[0].total, 342)
    assert.equal(board[0].rank, 1)
    assert.equal(board[1].handle, '@quinn')
    assert.equal(board[1].total, 310)
    assert.equal(
      formatLeaderboardAmount(21.4, 'miles'),
      '21.4 miles',
    )
    assert.equal(formatLeaderboardAmount(48, 'minutes'), '48 minutes')
    assert.equal(
      formatActivityFeedLine(
        { amount: 50 },
        { name: 'Push-ups', unit: 'reps' },
        { leaderboard_name: 'alex' },
      ),
      '@alex logged 50 push-ups',
    )
  })
})
