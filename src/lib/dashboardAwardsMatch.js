/**
 * Prefer a snapshot only when its composite matches the dashboard ring.
 *
 * @param {object | null} snapshotState
 * @param {number | null | undefined} savedFpcScore
 */
export function awardsFromMatchingSnapshot(snapshotState, savedFpcScore) {
  if (!snapshotState?.awards) return null
  const saved = Number(savedFpcScore)
  const snapScore = Number(snapshotState.fitnessScore)
  if (!Number.isFinite(saved) || !Number.isFinite(snapScore)) return null
  if (Math.abs(snapScore - saved) > 1) return null
  return snapshotState
}
