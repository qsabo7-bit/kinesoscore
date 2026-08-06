/**
 * Shared per-lift weight/reps keys for Strength + SBD Total + Fitness Score.
 * Individual calculators and SBD Calculate Total read/write the same defaults.
 */

export const LIFT_INPUT_KEYS = {
  bench: { weight: 'benchWeight', reps: 'benchReps' },
  squat: { weight: 'squatWeight', reps: 'squatReps' },
  deadlift: { weight: 'deadliftWeight', reps: 'deadliftReps' },
}

/**
 * Resolve a lift's weight/reps, falling back to legacy shared liftWeight/reps
 * when that lift was the last selected single-lift exercise.
 */
export function resolveLiftInputs(defaults, liftId) {
  const keys = LIFT_INPUT_KEYS[liftId]
  if (!keys) return { weight: '', reps: '' }

  const weight = defaults[keys.weight] ?? ''
  const reps = defaults[keys.reps] ?? ''

  if (weight !== '' || reps !== '') {
    return { weight, reps }
  }

  if (defaults.lift === liftId) {
    return {
      weight: defaults.liftWeight ?? '',
      reps: defaults.reps ?? '',
    }
  }

  return { weight: '', reps: '' }
}
