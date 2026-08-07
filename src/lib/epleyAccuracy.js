/** Max reps for which Epley 1RM estimates stay reasonably accurate. */
export const EPLEY_ACCURATE_REP_MAX = 10

/** True when a weight+reps Epley estimate uses more than 10 reps. */
export function isHighRepEpleyInput(reps) {
  const value = Number(reps)
  return Number.isFinite(value) && value > EPLEY_ACCURATE_REP_MAX
}
