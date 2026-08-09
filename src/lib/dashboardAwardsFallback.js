import { calculateFitnessScore } from '../calculations/fitnessScore.js'
import { convertMass } from '../calculations/units.js'
import { getRaceById } from '../calculations/running.js'
import { awardsFromMatchingSnapshot } from './dashboardAwardsMatch.js'
import { deriveAwards } from './fitnessAwards.js'
import { getLatestEstimated5kSeconds } from './runningTracking.js'

export { awardsFromMatchingSnapshot }

const ESTIMATED_5K_MILES = getRaceById('5k')?.miles ?? 3.10686

const LIFT_EXERCISE_NAMES = {
  bench: 'Bench Press',
  squat: 'Squat',
  deadlift: 'Deadlift',
}

function latestStrengthRow(records, exerciseName) {
  const rows = (records || []).filter(
    (row) =>
      row.calculator_type === 'strength' && row.exercise_name === exerciseName,
  )
  return rows[rows.length - 1] || null
}

function massInDefaultsUnit(row, massUnit) {
  const raw = Number(row?.result_value)
  if (!Number.isFinite(raw) || raw <= 0) return null
  const fromUnit = row.result_unit === 'kg' ? 'kg' : 'lb'
  return fromUnit === massUnit ? raw : convertMass(raw, fromUnit, massUnit)
}

/**
 * When a fitness_score_snapshot is missing or stale, try to rebuild component
 * awards from defaults + latest strength/running records — only if the
 * recomputed composite matches the saved FPC ring (within 1 point).
 *
 * @param {object} input
 * @param {number} input.savedFpcScore
 * @param {Array<object>} input.records
 * @param {object} input.defaults
 * @returns {{ runningScore: number, strengthScore: number, awards: object } | null}
 */
export function deriveDashboardAwardsFallback({
  savedFpcScore,
  records,
  defaults,
}) {
  const saved = Number(savedFpcScore)
  if (!Number.isFinite(saved)) return null

  const age = Number(defaults?.age)
  const gender = defaults?.gender
  const bodyweight = Number(defaults?.bodyweight)
  const massUnit = defaults?.massUnit === 'kg' ? 'kg' : 'lb'
  if (
    !Number.isFinite(age) ||
    age < 12 ||
    age > 100 ||
    (gender !== 'male' && gender !== 'female') ||
    !Number.isFinite(bodyweight) ||
    bodyweight <= 0
  ) {
    return null
  }

  const list = Array.isArray(records) ? records : []
  const runningRows = list.filter((row) => row.calculator_type === 'running')
  const timeSeconds = getLatestEstimated5kSeconds(runningRows)
  if (!Number.isFinite(timeSeconds) || timeSeconds <= 0) return null

  const latestSbd = latestStrengthRow(list, 'SBD Total')
  const sbdTotal = latestSbd ? massInDefaultsUnit(latestSbd, massUnit) : null

  const candidates = []
  if (Number.isFinite(sbdTotal) && sbdTotal > 0) {
    candidates.push(
      calculateFitnessScore({
        sbdTotal,
        bodyweight,
        distanceMiles: ESTIMATED_5K_MILES,
        timeSeconds,
        age,
        gender,
      }),
    )
  }

  const liftKey =
    defaults?.lift === 'squat' || defaults?.lift === 'deadlift'
      ? defaults.lift
      : 'bench'
  const latestLift = latestStrengthRow(list, LIFT_EXERCISE_NAMES[liftKey])
  const oneRm = latestLift ? massInDefaultsUnit(latestLift, massUnit) : null
  if (Number.isFinite(oneRm) && oneRm > 0) {
    candidates.push(
      calculateFitnessScore({
        weight: oneRm,
        reps: 1,
        bodyweight,
        lift: liftKey,
        distanceMiles: ESTIMATED_5K_MILES,
        timeSeconds,
        age,
        gender,
      }),
    )
  }

  // Prefer SBD when it matches the ring; otherwise try single-lift (stale SBD
  // must not block a valid single-lift rebuild).
  const score = candidates.find(
    (row) => row && Math.abs(row.FPCScore - saved) <= 1,
  )
  if (!score) return null

  return {
    runningScore: score.runningScore,
    strengthScore: score.strengthScore,
    awards: deriveAwards({
      runningScore: score.runningScore,
      strengthScore: score.strengthScore,
    }),
  }
}
