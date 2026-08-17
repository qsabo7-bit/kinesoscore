/**
 * Display-only habit level curve from lifetime XP.
 * Level N requires roughly N² × 100 XP cumulative (gentle early, scales up).
 */

/**
 * Cumulative XP required to reach `level` (level 1 starts at 0).
 * @param {number} level
 */
export function xpThresholdForLevel(level) {
  const n = Math.max(1, Math.floor(Number(level) || 1))
  if (n <= 1) return 0
  return Math.floor(((n - 1) * (n - 1) * 100) / 1)
}

/**
 * @param {number} lifetimeXp
 * @returns {{
 *   level: number,
 *   xpIntoLevel: number,
 *   xpForNext: number,
 *   progress: number,
 *   nextLevelAt: number,
 * }}
 */
export function habitLevelFromXp(lifetimeXp) {
  const xp = Math.max(0, Math.floor(Number(lifetimeXp) || 0))
  let level = 1
  while (xpThresholdForLevel(level + 1) <= xp && level < 99) {
    level += 1
  }
  const floor = xpThresholdForLevel(level)
  const next = xpThresholdForLevel(level + 1)
  const span = Math.max(1, next - floor)
  const into = xp - floor
  return {
    level,
    xpIntoLevel: into,
    xpForNext: span,
    progress: Math.min(1, into / span),
    nextLevelAt: next,
  }
}
