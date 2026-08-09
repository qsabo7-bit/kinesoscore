import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  canonicalizeLeaderboardShareValue,
  isLargeLeaderboardShareJump,
  resolveLeaderboardShareJumpBaseline,
} from './leaderboardShareUnits.js'

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

describe('isLargeLeaderboardShareJump', () => {
  it('flags a 15%+ improvement when higher is better', () => {
    assert.equal(
      isLargeLeaderboardShareJump({
        previousValue: 100,
        nextValue: 115,
        higherIsBetter: true,
      }),
      true,
    )
    assert.equal(
      isLargeLeaderboardShareJump({
        previousValue: 100,
        nextValue: 114,
        higherIsBetter: true,
      }),
      false,
    )
  })

  it('flags a 15%+ improvement when lower is better', () => {
    assert.equal(
      isLargeLeaderboardShareJump({
        previousValue: 400,
        nextValue: 340,
        higherIsBetter: false,
      }),
      true,
    )
    assert.equal(
      isLargeLeaderboardShareJump({
        previousValue: 400,
        nextValue: 380,
        higherIsBetter: false,
      }),
      false,
    )
  })

  it('ignores non-finite values', () => {
    assert.equal(
      isLargeLeaderboardShareJump({
        previousValue: NaN,
        nextValue: 120,
        higherIsBetter: true,
      }),
      false,
    )
  })
})

describe('resolveLeaderboardShareJumpBaseline', () => {
  it('prefers the confirmed public share over private history', () => {
    const baseline = resolveLeaderboardShareJumpBaseline({
      trackRecords: [
        { id: 'a', result_value: 100, result_unit: 'lb' },
        { id: 'b', result_value: 140, result_unit: 'lb' },
      ],
      shareSnapshot: { resultValue: 100, resultUnit: 'lb' },
    })
    assert.deepEqual(baseline, { resultValue: 100, resultUnit: 'lb' })
  })

  it('does not use a discarded private attempt when share is missing', () => {
    const baseline = resolveLeaderboardShareJumpBaseline({
      trackRecords: [
        { id: 'a', result_value: 100, result_unit: 'lb' },
        { id: 'b', result_value: 150, result_unit: 'lb' },
      ],
      excludeRecordIds: ['b'],
      shareSnapshot: null,
    })
    assert.deepEqual(baseline, { resultValue: 100, resultUnit: 'lb' })
  })

  it('uses the confirmed share even when a newer private save exists', () => {
    const baseline = resolveLeaderboardShareJumpBaseline({
      trackRecords: [{ id: 'a', result_value: 140, result_unit: 'lb' }],
      shareSnapshot: { resultValue: 100, resultUnit: 'lb' },
    })
    assert.deepEqual(baseline, { resultValue: 100, resultUnit: 'lb' })
  })
})
