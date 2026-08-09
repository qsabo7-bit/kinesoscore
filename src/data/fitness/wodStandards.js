/**
 * Benchmark WOD Rx notes (educational).
 * Not an affiliate of CrossFit, Inc. Standards reflect commonly published Rx loads.
 */

export const FITNESS_ASSESSMENT_DISCLAIMER =
  'KinesoScore records self-reported benchmark results for training feedback. These tools are educational and not affiliated with CrossFit, Inc. or any sanctioning body.'

/** Cindy round work = 5 pull-ups + 10 push-ups + 15 squats. */
export const CINDY_REPS_PER_ROUND = 30

export const WOD_STANDARDS = {
  fran: {
    name: 'Fran',
    format: '21-15-9 thrusters and pull-ups, for time',
    male: {
      thrusterLb: 95,
      thrusterKg: 43,
      pullups: 'Pull-ups (chin over bar)',
    },
    female: {
      thrusterLb: 65,
      thrusterKg: 29,
      pullups: 'Pull-ups (chin over bar)',
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
