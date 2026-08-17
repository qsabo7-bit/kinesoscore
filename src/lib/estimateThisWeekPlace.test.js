import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  estimateThisWeekPlace,
  formatEstimatedPlaceLabel,
} from './estimateThisWeekPlace.js'

describe('estimateThisWeekPlace', () => {
  it('ranks higher-is-better scores', () => {
    const rows = [
      { result_value: 91 },
      { result_value: 87 },
      { result_value: 84 },
    ]
    assert.deepEqual(estimateThisWeekPlace(rows, 88, true), {
      rank: 2,
      fieldSize: 3,
      isEstimate: true,
    })
  })

  it('parses display strings', () => {
    const rows = [
      { result_display: '91' },
      { result_display: '87' },
      { result_display: '74' },
    ]
    assert.equal(estimateThisWeekPlace(rows, 80, true)?.rank, 3)
  })

  it('formats guest copy', () => {
    assert.match(
      formatEstimatedPlaceLabel({ rank: 4, fieldSize: 12 }, 'myKinesoScore'),
      /#4/,
    )
  })
})
