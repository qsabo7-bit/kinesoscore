import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { scoreArmyAft } from './scoreArmyAft.js'
import { scoreAirForcePfra } from './scoreAirForcePfra.js'
import { scoreMarinePft } from './scoreMarinePft.js'
import { scoreNavyPrt } from './scoreNavyPrt.js'
import { parseRequiredNumber, toDurationSeconds } from './scoreEvents.js'

describe('military empty-input guards', () => {
  it('treats empty string as missing, not zero', () => {
    assert.equal(parseRequiredNumber(''), null)
    assert.equal(parseRequiredNumber(null), null)
    assert.equal(parseRequiredNumber('0'), 0)
    assert.equal(toDurationSeconds('', '45'), null)
    assert.equal(toDurationSeconds('0', '45'), 45)
    assert.equal(toDurationSeconds('1', '90'), null)
  })

  it('does not score Army AFT when lifts are still empty', () => {
    assert.equal(
      scoreArmyAft({
        ageBand: '17-21',
        gender: 'male',
        values: {
          deadlift: '',
          hrPushups: '',
          sdcMin: '1',
          sdcSec: '40',
          plankMin: '2',
          plankSec: '30',
          runMin: '15',
          runSec: '30',
        },
      }),
      null,
    )
  })

  it('scores Army AFT failure with a trackable total when events are complete but below min', () => {
    const out = scoreArmyAft({
      ageBand: '17-21',
      gender: 'male',
      values: {
        deadlift: '100',
        hrPushups: '5',
        sdcMin: '3',
        sdcSec: '0',
        plankMin: '0',
        plankSec: '20',
        runMin: '25',
        runSec: '0',
      },
    })
    assert.ok(out)
    assert.equal(out.pass, false)
    assert.equal(typeof out.total, 'number')
  })

  it('does not score Navy/Marine/AF when required reps are empty', () => {
    assert.equal(
      scoreNavyPrt({
        ageBand: '17-19',
        gender: 'male',
        values: {
          pushups: '',
          plankMin: '2',
          plankSec: '0',
          runMin: '12',
          runSec: '0',
        },
      }),
      null,
    )
    assert.equal(
      scoreMarinePft({
        ageBand: '17-20',
        gender: 'male',
        values: {
          upperBodyChoice: 'pullups',
          upperBodyReps: '',
          plankMin: '2',
          plankSec: '0',
          runMin: '24',
          runSec: '0',
        },
      }),
      null,
    )
    assert.equal(
      scoreAirForcePfra({
        ageBand: '25-29',
        gender: 'male',
        values: {
          strengthChoice: 'pushups',
          strengthReps: '',
          coreChoice: 'situps',
          coreReps: '40',
          cardioChoice: 'run',
          runMin: '16',
          runSec: '0',
          waist: '32',
          height: '70',
        },
      }),
      null,
    )
  })
})
