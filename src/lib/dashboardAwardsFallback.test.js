import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { awardsFromMatchingSnapshot } from './dashboardAwardsMatch.js'

describe('awardsFromMatchingSnapshot', () => {
  it('accepts a snapshot whose fitness score matches the ring', () => {
    const snap = {
      fitnessScore: 72,
      awards: { overall: 'silver' },
    }
    assert.equal(awardsFromMatchingSnapshot(snap, 72), snap)
    assert.equal(awardsFromMatchingSnapshot(snap, 73), snap)
  })

  it('rejects stale snapshots that diverge from the ring', () => {
    const snap = {
      fitnessScore: 72,
      awards: { overall: 'silver' },
    }
    assert.equal(awardsFromMatchingSnapshot(snap, 75), null)
    assert.equal(awardsFromMatchingSnapshot(null, 72), null)
    assert.equal(awardsFromMatchingSnapshot({ awards: {} }, 72), null)
  })
})
