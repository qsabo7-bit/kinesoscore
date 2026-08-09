import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  deriveAwards,
  deriveComponentAward,
  deriveCrown,
} from './fitnessAwards.js'

describe('deriveComponentAward (Stage 9.5 0–100 thresholds)', () => {
  it('maps Running/Strength boundaries', () => {
    assert.equal(deriveComponentAward(49), null)
    assert.equal(deriveComponentAward(50), 'bronze')
    assert.equal(deriveComponentAward(60), 'bronze')
    assert.equal(deriveComponentAward(64), 'bronze')
    assert.equal(deriveComponentAward(65), 'silver')
    assert.equal(deriveComponentAward(79), 'silver')
    assert.equal(deriveComponentAward(80), 'gold')
    assert.equal(deriveComponentAward(89), 'gold')
    assert.equal(deriveComponentAward(90), 'diamond')
    assert.equal(deriveComponentAward(100), 'diamond')
  })

  it('rejects non-finite scores', () => {
    assert.equal(deriveComponentAward(null), null)
    assert.equal(deriveComponentAward(undefined), null)
    assert.equal(deriveComponentAward(Number.NaN), null)
  })
})

describe('deriveCrown (Stage 9.5)', () => {
  it('requires BOTH components >= 90 independently', () => {
    assert.equal(deriveCrown(89, 100), false)
    assert.equal(deriveCrown(100, 89), false)
    assert.equal(deriveCrown(90, 90), true)
    assert.equal(deriveCrown(90, 100), true)
    assert.equal(deriveCrown(100, 90), true)
    assert.equal(deriveCrown(100, 100), true)
  })

  it('rejects sum/composite shortcuts', () => {
    // Combined 180 without both sides at 90
    assert.equal(deriveCrown(100, 80), false)
    assert.equal(deriveCrown(80, 100), false)
    assert.equal(deriveCrown(95, 85), false)
  })
})

describe('deriveAwards (Stage 9.5)', () => {
  it('uses component scores, not composite alone', () => {
    assert.deepEqual(deriveAwards({ runningScore: 49, strengthScore: 95 }), {
      running: null,
      strength: 'diamond',
      crown: false,
    })
    assert.deepEqual(deriveAwards({ runningScore: 75, strengthScore: 85 }), {
      running: 'silver',
      strength: 'gold',
      crown: false,
    })
    assert.deepEqual(deriveAwards({ runningScore: 90, strengthScore: 90 }), {
      running: 'diamond',
      strength: 'diamond',
      crown: true,
    })
    assert.deepEqual(deriveAwards({ runningScore: 95, strengthScore: 100 }), {
      running: 'diamond',
      strength: 'diamond',
      crown: true,
    })
  })
})
