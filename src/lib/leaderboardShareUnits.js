import { convertMass } from '../calculations/units.js'

/** Canonical mass unit for public strength ranks (avoids lb/kg mix). */
export const LEADERBOARD_MASS_UNIT = 'lb'

/**
 * Normalize mass share payloads to lb so rank_value is comparable.
 * Non-mass units pass through unchanged.
 *
 * @param {number} resultValue
 * @param {string | null | undefined} resultUnit
 */
export function canonicalizeLeaderboardShareValue(resultValue, resultUnit) {
  const value = Number(resultValue)
  const unit = String(resultUnit || '').toLowerCase()
  if (!Number.isFinite(value)) {
    return { resultValue, resultUnit }
  }
  if (unit === 'kg') {
    const lb = convertMass(value, 'kg', 'lb')
    return {
      resultValue: Math.round(lb * 10) / 10,
      resultUnit: LEADERBOARD_MASS_UNIT,
    }
  }
  if (unit === 'lb') {
    return {
      resultValue: Math.round(value * 10) / 10,
      resultUnit: LEADERBOARD_MASS_UNIT,
    }
  }
  return { resultValue: value, resultUnit }
}

/** Relative improvement vs last confirmed shared value that triggers a confirm before re-share. */
export const LEADERBOARD_SHARE_JUMP_RATIO = 0.15

/**
 * Baseline for the trust jump popup: the last confirmed public share.
 * Never use the current form input or a discarded private attempt.
 *
 * Private history is only a fallback when the share row has no usable value
 * (should be rare). Callers should pass history with discarded ids excluded.
 *
 * @param {object} input
 * @param {{ resultValue: number, resultUnit?: string | null } | null} [input.shareSnapshot]
 * @param {Array<{ id?: string, result_value?: number, result_unit?: string | null }>} [input.trackRecords]
 * @param {Array<string | null | undefined>} [input.excludeRecordIds]
 * @returns {{ resultValue: number, resultUnit: string | null | undefined } | null}
 */
export function resolveLeaderboardShareJumpBaseline({
  shareSnapshot = null,
  trackRecords = [],
  excludeRecordIds = [],
} = {}) {
  if (shareSnapshot && Number.isFinite(Number(shareSnapshot.resultValue))) {
    return canonicalizeLeaderboardShareValue(
      shareSnapshot.resultValue,
      shareSnapshot.resultUnit,
    )
  }

  const exclude = new Set(
    (excludeRecordIds || []).filter(Boolean).map((id) => String(id)),
  )
  const kept = (trackRecords || []).filter(
    (row) => row?.id != null && !exclude.has(String(row.id)),
  )
  const lastSaved = kept.length ? kept[kept.length - 1] : null
  if (lastSaved && Number.isFinite(Number(lastSaved.result_value))) {
    return canonicalizeLeaderboardShareValue(
      lastSaved.result_value,
      lastSaved.result_unit,
    )
  }
  return null
}

/**
 * True when the new value is a large improvement over the prior shared value
 * in the board's better direction. First-time shares should skip this check.
 *
 * @param {object} input
 * @param {number} input.previousValue - last confirmed share (canonical)
 * @param {number} input.nextValue - candidate share (canonical)
 * @param {boolean} [input.higherIsBetter=true]
 * @param {number} [input.ratio=LEADERBOARD_SHARE_JUMP_RATIO]
 */
export function isLargeLeaderboardShareJump({
  previousValue,
  nextValue,
  higherIsBetter = true,
  ratio = LEADERBOARD_SHARE_JUMP_RATIO,
}) {
  const prev = Number(previousValue)
  const next = Number(nextValue)
  if (!Number.isFinite(prev) || !Number.isFinite(next)) return false
  if (prev === 0) return next !== 0

  const relative = (next - prev) / Math.abs(prev)
  if (higherIsBetter) return relative >= ratio
  return relative <= -ratio
}
