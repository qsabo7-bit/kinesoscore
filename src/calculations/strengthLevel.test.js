import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  getStrengthLevel,
  getStrengthLevelFromPercentile,
} from './strengthLevel.js'

describe('getStrengthLevelFromPercentile', () => {
  it('maps peer percentiles onto Beginner→Elite per norms language', () => {
    assert.equal(getStrengthLevelFromPercentile(10), 'Beginner')
    assert.equal(getStrengthLevelFromPercentile(25), 'Intermediate')
    assert.equal(getStrengthLevelFromPercentile(49), 'Intermediate')
    assert.equal(getStrengthLevelFromPercentile(50), 'Intermediate')
    assert.equal(getStrengthLevelFromPercentile(74), 'Intermediate')
    assert.equal(getStrengthLevelFromPercentile(75), 'Advanced')
    assert.equal(getStrengthLevelFromPercentile(89), 'Advanced')
    assert.equal(getStrengthLevelFromPercentile(90), 'Elite')
    assert.equal(getStrengthLevelFromPercentile(99), 'Elite')
  })
})

describe('getStrengthLevel ratio fallback', () => {
  it('reserves Elite for higher ratios', () => {
    assert.equal(getStrengthLevel(180, 180), 'Intermediate')
    assert.equal(getStrengthLevel(270, 180), 'Advanced')
    assert.equal(getStrengthLevel(405, 180), 'Elite')
  })
})
