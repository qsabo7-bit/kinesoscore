import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { habitLevelFromXp, xpThresholdForLevel } from './habitLevels.js'

describe('habitLevelFromXp', () => {
  it('starts at level 1 with zero XP', () => {
    const s = habitLevelFromXp(0)
    assert.equal(s.level, 1)
    assert.equal(s.xpIntoLevel, 0)
    assert.equal(xpThresholdForLevel(2), 100)
  })

  it('crosses into level 2 at 100 XP', () => {
    assert.equal(habitLevelFromXp(99).level, 1)
    assert.equal(habitLevelFromXp(100).level, 2)
  })

  it('reports progress toward the next level', () => {
    const s = habitLevelFromXp(50)
    assert.equal(s.level, 1)
    assert.equal(s.xpForNext, 100)
    assert.ok(Math.abs(s.progress - 0.5) < 0.001)
  })
})
