import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { buildSaveGameFeedback } from './saveGameFeedback.js'

describe('buildSaveGameFeedback', () => {
  it('celebrates first personal best', () => {
    assert.equal(
      buildSaveGameFeedback({
        isPersonalBest: true,
        priorSummary: null,
        numericResult: 100,
        higherIsBetter: true,
      }),
      'First saved result — personal best set',
    )
  })

  it('shows percent beat on new PR', () => {
    const msg = buildSaveGameFeedback({
      isPersonalBest: true,
      priorSummary: { personalRecord: 100, latestValue: 100 },
      numericResult: 110,
      higherIsBetter: true,
    })
    assert.match(msg, /New personal best · beat last PR by 10\.0%/)
  })

  it('encourages non-PR saves', () => {
    const msg = buildSaveGameFeedback({
      isPersonalBest: false,
      priorSummary: { personalRecord: 120, latestValue: 100 },
      numericResult: 90,
      higherIsBetter: true,
    })
    assert.equal(msg, 'Result saved · keep grinding')
  })
})
