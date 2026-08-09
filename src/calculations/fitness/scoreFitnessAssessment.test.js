import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getFitnessAssessment } from '../../data/fitness/assessments.js'
import { formatCindyDeltaDisplay } from '../../data/fitness/wodStandards.js'
import { scoreFitnessAssessment } from './scoreFitnessAssessment.js'

describe('scoreFitnessAssessment', () => {
  it('scores max push-ups as higher-is-better reps', () => {
    const assessment = getFitnessAssessment('max-pushups')
    const out = scoreFitnessAssessment(assessment, {
      gender: 'male',
      prescription: 'rx',
      values: { reps: '42' },
    })
    assert.equal(out.resultValue, 42)
    assert.equal(out.resultUnit, 'reps')
    assert.equal(out.higherIsBetter, true)
    assert.equal(out.exerciseName, 'Max Push-ups')
  })

  it('scores Fran Rx finish time in seconds', () => {
    const assessment = getFitnessAssessment('fran')
    const out = scoreFitnessAssessment(assessment, {
      gender: 'female',
      prescription: 'rx',
      values: { finishHr: '', finishMin: '3', finishSec: '21' },
    })
    assert.equal(out.resultValue, 201)
    assert.equal(out.resultUnit, 'sec')
    assert.equal(out.higherIsBetter, false)
    assert.equal(out.exerciseName, 'Fran Rx')
    assert.equal(out.displayValue, '3:21')
    assert.equal(out.rxNotes.sexed.thrusterLb, 65)
  })

  it('keeps Fran Scaled on a separate exercise name', () => {
    const assessment = getFitnessAssessment('fran')
    const out = scoreFitnessAssessment(assessment, {
      gender: 'male',
      prescription: 'scaled',
      values: { finishHr: '', finishMin: '4', finishSec: '0' },
    })
    assert.equal(out.exerciseName, 'Fran Scaled')
    assert.equal(out.trackId, 'fran-scaled')
  })

  it('scores Murph finish times with hours', () => {
    const assessment = getFitnessAssessment('murph')
    const out = scoreFitnessAssessment(assessment, {
      gender: 'male',
      prescription: 'rx',
      values: { finishHr: '1', finishMin: '15', finishSec: '30' },
    })
    assert.equal(out.resultValue, 1 * 3600 + 15 * 60 + 30)
    assert.equal(out.displayValue, '1:15:30')
    assert.equal(out.higherIsBetter, false)
    assert.equal(out.exerciseName, 'Murph Rx')
  })

  it('rejects finish times when minutes exceed 59 with hours', () => {
    const assessment = getFitnessAssessment('murph')
    assert.equal(
      scoreFitnessAssessment(assessment, {
        gender: 'male',
        prescription: 'rx',
        values: { finishHr: '1', finishMin: '75', finishSec: '0' },
      }),
      null,
    )
  })

  it('encodes Cindy as rounds × 30 + extras and displays rounds + leftovers', () => {
    const assessment = getFitnessAssessment('cindy')
    const out = scoreFitnessAssessment(assessment, {
      gender: 'male',
      prescription: 'rx',
      values: { rounds: '12', extraReps: '8' },
    })
    assert.equal(out.resultValue, 12 * 30 + 8)
    assert.equal(out.displayValue, '12 + 8')
    assert.equal(out.higherIsBetter, true)
    assert.equal(out.exerciseName, 'Cindy')
  })

  it('does not treat empty Cindy/reps inputs as a scored zero', () => {
    const cindy = getFitnessAssessment('cindy')
    assert.equal(
      scoreFitnessAssessment(cindy, {
        gender: 'male',
        prescription: 'rx',
        values: { rounds: '', extraReps: '' },
      }),
      null,
    )

    const pushups = getFitnessAssessment('max-pushups')
    assert.equal(
      scoreFitnessAssessment(pushups, {
        gender: 'male',
        prescription: 'rx',
        values: { reps: '' },
      }),
      null,
    )
  })

  it('scores sub-minute finish times when only seconds are entered', () => {
    const assessment = getFitnessAssessment('fran')
    const out = scoreFitnessAssessment(assessment, {
      gender: 'male',
      prescription: 'rx',
      values: { finishHr: '', finishMin: '', finishSec: '45' },
    })
    assert.equal(out.resultValue, 45)
    assert.equal(out.displayValue, '0:45')
  })

  it('formats Cindy trend deltas as signed rounds + leftovers', () => {
    assert.equal(formatCindyDeltaDisplay(30), '+1 + 0')
    assert.equal(formatCindyDeltaDisplay(4), '+0 + 4')
    assert.equal(formatCindyDeltaDisplay(-34), '−1 + 4')
    assert.equal(formatCindyDeltaDisplay(0), '0')
  })
})
