import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { computeLeaderboardNearMiss } from './leaderboardNearMiss.js'

describe('computeLeaderboardNearMiss', () => {
  const rows = [
    {
      rank: 1,
      leaderboard_name: 'Alpha',
      result_value: 90,
      result_display: '90',
      higher_is_better: true,
    },
    {
      rank: 2,
      leaderboard_name: 'Bravo',
      result_value: 85,
      result_display: '85',
      higher_is_better: true,
    },
  ]

  it('reports holding #1', () => {
    const miss = computeLeaderboardNearMiss(rows, 'Alpha')
    assert.equal(miss.isFirst, true)
    assert.match(miss.gapLabel, /#1/i)
  })

  it('reports gap behind next place', () => {
    const miss = computeLeaderboardNearMiss(rows, 'bravo')
    assert.equal(miss.isFirst, false)
    assert.equal(miss.spotsFromFirst, 1)
    assert.match(miss.gapLabel, /behind Alpha/i)
  })
})
