/**
 * Benchmark WOD Rx notes (educational).
 * Not an affiliate of CrossFit, Inc. Standards reflect commonly published Rx loads.
 */

export const FITNESS_ASSESSMENT_DISCLAIMER =
  'KinesoScore records self-reported benchmark results for training feedback. These tools are educational and not affiliated with CrossFit, Inc. or any sanctioning body.'

/** Cindy round work = 5 pull-ups + 10 push-ups + 15 air squats. */
export const CINDY_REPS_PER_ROUND = 30

/**
 * Decode Cindy total work reps (rounds × 30 + extras) for display.
 * Matches the calculator hero (“12 + 8”).
 */
export function formatCindyDisplay(totalWorkReps) {
  const n = Math.floor(Number(totalWorkReps))
  if (!Number.isFinite(n) || n < 0) return '—'
  const rounds = Math.floor(n / CINDY_REPS_PER_ROUND)
  const extras = n % CINDY_REPS_PER_ROUND
  return `${rounds} + ${extras}`
}

/**
 * Signed Cindy delta for trends (work-rep delta → rounds + leftover).
 * Example: +30 → "+1 + 0", −4 → "−0 + 4".
 */
export function formatCindyDeltaDisplay(deltaWorkReps) {
  const n = Number(deltaWorkReps)
  if (!Number.isFinite(n) || n === 0) return '0'
  const sign = n > 0 ? '+' : '−'
  return `${sign}${formatCindyDisplay(Math.abs(n))}`
}

export const WOD_STANDARDS = {
  fran: {
    name: 'Fran',
    format: '21-15-9 thrusters and pull-ups, for time',
    male: {
      thrusterLb: 95,
      thrusterKg: 43,
      pullups: 'Chin over bar',
    },
    female: {
      thrusterLb: 65,
      thrusterKg: 29,
      pullups: 'Chin over bar',
    },
    scaledNote:
      'Scaled typically uses lighter thrusters and/or jumping pull-ups / ring rows. Record Scaled separately from Rx.',
  },
  murph: {
    name: 'Murph',
    format:
      '1-mile run, 100 pull-ups, 200 push-ups, 300 air squats, 1-mile run — for time (partition allowed)',
    male: {
      vestLb: 20,
      vestKg: 9,
      note: 'Rx commonly includes a 20 lb vest',
    },
    female: {
      vestLb: 14,
      vestKg: 6,
      note: 'Rx commonly includes a 14 lb vest',
    },
    scaledNote:
      'Scaled often means no vest and/or reduced volume. Record Scaled separately from Rx.',
  },
  cindy: {
    name: 'Cindy',
    format: '20-minute AMRAP: 5 pull-ups, 10 push-ups, 15 air squats',
    male: {
      note: 'Bodyweight — same movements for male and female athletes',
    },
    female: {
      note: 'Bodyweight — same movements for male and female athletes',
    },
    scaledNote:
      'Scaled may substitute jumping pull-ups or knee push-ups. Keep one consistent standard when tracking.',
  },
}

/**
 * @param {'fran' | 'murph' | 'cindy'} wodId
 * @param {'male' | 'female'} gender
 */
export function rxNotesForWod(wodId, gender) {
  const wod = WOD_STANDARDS[wodId]
  if (!wod) return null
  const sex = gender === 'female' ? 'female' : 'male'
  return {
    format: wod.format,
    sexed: wod[sex],
    scaledNote: wod.scaledNote,
  }
}
