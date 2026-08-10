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
    assert.equal(rows[0].awards?.crown, true)
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

  it('matches live formatting for military, reps, and Cindy boards', () => {
    assert.equal(getLeaderboardSampleRows('assessment:army-aft')[0].result_display, '96')
    assert.match(
      getLeaderboardSampleRows('fitness:max-pushups')[0].result_display,
      /reps$/,
    )
    assert.match(
      getLeaderboardSampleRows('fitness:cindy')[0].result_display,
      /^\d+ \+ \d+$/,
    )
  })
})
