import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { calculateOneRepMax, estimateOneRepMax } from './oneRepMax.js'

describe('estimateOneRepMax (Epley)', () => {
  it('does not inflate a true 1RM (reps ≤ 1)', () => {
    assert.equal(estimateOneRepMax(225, 1), 225)
    assert.equal(estimateOneRepMax(225, 0), 225)
    assert.equal(calculateOneRepMax(225, 1), 225)
  })

  it('applies Epley for submaximal sets', () => {
    assert.equal(estimateOneRepMax(225, 5), 225 * (1 + 5 / 30))
    assert.equal(calculateOneRepMax(225, 5), Math.round(225 * (1 + 5 / 30)))
  })
})
