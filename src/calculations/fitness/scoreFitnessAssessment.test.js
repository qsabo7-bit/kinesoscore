import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getFitnessAssessment } from '../../data/fitness/assessments.js'
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
      values: { finishMin: '3', finishSec: '21' },
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
      values: { finishMin: '4', finishSec: '0' },
    })
    assert.equal(out.exerciseName, 'Fran Scaled')
    assert.equal(out.trackId, 'fran-scaled')
  })

  it('encodes Cindy as rounds × 30 + extras', () => {
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
})
