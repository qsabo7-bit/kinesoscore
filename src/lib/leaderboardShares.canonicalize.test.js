import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { canonicalizeLeaderboardShareValue } from './leaderboardShareUnits.js'

describe('canonicalizeLeaderboardShareValue', () => {
  it('converts kg shares to lb for fair ranking', () => {
    const out = canonicalizeLeaderboardShareValue(100, 'kg')
    assert.equal(out.resultUnit, 'lb')
    assert.ok(Math.abs(out.resultValue - 220.5) < 0.2)
  })

  it('keeps lb shares in lb', () => {
    assert.deepEqual(canonicalizeLeaderboardShareValue(405, 'lb'), {
      resultValue: 405,
      resultUnit: 'lb',
    })
  })

  it('leaves non-mass units alone', () => {
    assert.deepEqual(canonicalizeLeaderboardShareValue(88, 'points'), {
      resultValue: 88,
      resultUnit: 'points',
    })
  })
})
