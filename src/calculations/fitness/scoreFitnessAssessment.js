import {
  CINDY_REPS_PER_ROUND,
  rxNotesForWod,
} from '../../data/fitness/wodStandards.js'

function toSeconds(min, sec) {
  if (min === '' || min == null) return null
  const m = Number(min)
  const s = sec === '' || sec == null ? 0 : Number(sec)
  if (!Number.isFinite(m) || m < 0) return null
  if (!Number.isFinite(s) || s < 0 || s > 59) return null
  return m * 60 + s
}

function formatClock(totalSec) {
  const sec = Math.round(Number(totalSec))
  if (!Number.isFinite(sec) || sec < 0) return '—'
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function prescriptionLabel(prescription) {
  return prescription === 'scaled' ? 'Scaled' : 'Rx'
}

function exerciseNameFor(assessment, prescription) {
  if (assessment.exerciseName) return assessment.exerciseName
  const tag = prescriptionLabel(prescription)
  if (assessment.id === 'fran') return `Fran ${tag}`
  if (assessment.id === 'murph') return `Murph ${tag}`
  return assessment.name
}

function trackIdFor(assessment, prescription) {
  if (assessment.trackId) return assessment.trackId
  const tag = prescription === 'scaled' ? 'scaled' : 'rx'
  return `${assessment.id}-${tag}`
}

/**
 * Score / normalize a fitness assessment result for display + save.
 * @returns {null | object}
 */
export function scoreFitnessAssessment(assessment, { gender, prescription, values }) {
  if (!assessment?.scoringReady) return null

  const rxNotes = assessment.wodId
    ? rxNotesForWod(assessment.wodId, gender)
    : null

  if (assessment.resultKind === 'reps') {
    const reps = Number(values.reps)
    if (!Number.isFinite(reps) || reps < 0) return null
    const whole = Math.floor(reps)
    return {
      resultValue: whole,
      resultUnit: 'reps',
      displayValue: String(whole),
      displayLabel: assessment.heroLabel || 'Reps',
      higherIsBetter: true,
      exerciseName: exerciseNameFor(assessment, prescription),
      trackId: trackIdFor(assessment, prescription),
      summary: `${whole} reps in 60 seconds.`,
      rxNotes,
      companionSaves: [],
    }
  }

  if (assessment.resultKind === 'forTime') {
    const finishSec = toSeconds(values.finishMin, values.finishSec)
    if (finishSec == null || finishSec <= 0) return null
    const tag = prescriptionLabel(prescription)
    return {
      resultValue: finishSec,
      resultUnit: 'sec',
      displayValue: formatClock(finishSec),
      displayLabel: assessment.heroLabel || 'Finish time',
      higherIsBetter: false,
      exerciseName: exerciseNameFor(assessment, prescription),
      trackId: trackIdFor(assessment, prescription),
      summary: `${assessment.name} ${tag} · ${formatClock(finishSec)}.`,
      rxNotes,
      companionSaves: [],
    }
  }

  if (assessment.resultKind === 'amrap') {
    const rounds = Number(values.rounds)
    const extra = Number(values.extraReps === '' ? 0 : values.extraReps)
    if (!Number.isFinite(rounds) || rounds < 0) return null
    if (!Number.isFinite(extra) || extra < 0) return null
    const wholeRounds = Math.floor(rounds)
    const wholeExtra = Math.min(
      CINDY_REPS_PER_ROUND - 1,
      Math.floor(extra),
    )
    const totalReps = wholeRounds * CINDY_REPS_PER_ROUND + wholeExtra
    return {
      resultValue: totalReps,
      resultUnit: 'reps',
      displayValue: `${wholeRounds} + ${wholeExtra}`,
      displayLabel: assessment.heroLabel || 'Rounds + reps',
      higherIsBetter: true,
      exerciseName: exerciseNameFor(assessment, prescription),
      trackId: trackIdFor(assessment, prescription),
      summary: `${wholeRounds} rounds + ${wholeExtra} reps (${totalReps} total work reps).`,
      rxNotes,
      companionSaves: [],
    }
  }

  return null
}

export { formatClock, CINDY_REPS_PER_ROUND }
