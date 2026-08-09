import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  getLeaderboardSampleRows,
  resolveLeaderboardRows,
} from './leaderboardSamples.js'

describe('leaderboardSamples', () => {
  it('returns sample athletes for empty boards', () => {
    const { rows, isSample } = resolveLeaderboardRows('mykinesoscore', [])
    assert.equal(isSample, true)
    assert.equal(rows.length, 5)
    assert.equal(rows[0].leaderboard_name, 'NorthPeak')
  })

  it('prefers live rows and drops samples', () => {
    const live = [
      { rank: 1, leaderboard_name: 'RealAthlete', result_display: '99' },
    ]
    const { rows, isSample } = resolveLeaderboardRows('mykinesoscore', live)
    assert.equal(isSample, false)
    assert.deepEqual(rows, live)
  })

  it('picks habit-specific samples', () => {
    const rows = getLeaderboardSampleRows('habits:streak')
    assert.match(rows[0].result_display, /day/)
  })
})
