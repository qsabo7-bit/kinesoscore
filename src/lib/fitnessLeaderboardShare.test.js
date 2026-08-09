import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  CINDY_CALCULATOR_TYPE,
  CINDY_TRACKS,
  FRAN_CALCULATOR_TYPE,
  FRAN_TRACKS,
  MAX_PULLUPS_CALCULATOR_TYPE,
  MAX_PULLUPS_TRACKS,
  MAX_PUSHUPS_CALCULATOR_TYPE,
  MAX_PUSHUPS_TRACKS,
  MURPH_CALCULATOR_TYPE,
  MURPH_TRACKS,
} from '../data/trackingTracks.js'
import {
  isLargeLeaderboardShareJump,
  LEADERBOARD_SHARE_JUMP_RATIO,
} from './leaderboardShareUnits.js'

const here = dirname(fileURLToPath(import.meta.url))
const shareTargetsSource = readFileSync(
  join(here, 'leaderboardShares.js'),
  'utf8',
)
const migration012 = readFileSync(
  join(here, '../../supabase/migrations/012_fitness_assessment_leaderboards.sql'),
  'utf8',
)

/**
 * Expected share boards for Fitness Assessments — keep in sync with
 * LEADERBOARD_SHARE_TARGETS in leaderboardShares.js (and migration 012).
 */
const EXPECTED_FITNESS_SHARES = [
  {
    calculatorType: MAX_PUSHUPS_CALCULATOR_TYPE,
    exerciseName: 'Max Push-ups',
    higherIsBetter: true,
    boardKey: 'fitness:max-pushups',
    tracks: MAX_PUSHUPS_TRACKS,
  },
  {
    calculatorType: MAX_PULLUPS_CALCULATOR_TYPE,
    exerciseName: 'Max Pull-ups',
    higherIsBetter: true,
    boardKey: 'fitness:max-pullups',
    tracks: MAX_PULLUPS_TRACKS,
  },
  {
    calculatorType: FRAN_CALCULATOR_TYPE,
    exerciseName: 'Fran Rx',
    higherIsBetter: false,
    boardKey: 'fitness:fran-rx',
    tracks: FRAN_TRACKS,
  },
  {
    calculatorType: FRAN_CALCULATOR_TYPE,
    exerciseName: 'Fran Scaled',
    higherIsBetter: false,
    boardKey: 'fitness:fran-scaled',
    tracks: FRAN_TRACKS,
  },
  {
    calculatorType: MURPH_CALCULATOR_TYPE,
    exerciseName: 'Murph Rx',
    higherIsBetter: false,
    boardKey: 'fitness:murph-rx',
    tracks: MURPH_TRACKS,
  },
  {
    calculatorType: MURPH_CALCULATOR_TYPE,
    exerciseName: 'Murph Scaled',
    higherIsBetter: false,
    boardKey: 'fitness:murph-scaled',
    tracks: MURPH_TRACKS,
  },
  {
    calculatorType: CINDY_CALCULATOR_TYPE,
    exerciseName: 'Cindy',
    higherIsBetter: true,
    boardKey: 'fitness:cindy',
    tracks: CINDY_TRACKS,
  },
]

describe('fitness assessment leaderboard share wiring', () => {
  it('keeps every fitness track on a share board with the correct direction', () => {
    for (const expected of EXPECTED_FITNESS_SHARES) {
      const track = expected.tracks.find(
        (item) => item.exerciseName === expected.exerciseName,
      )
      assert.ok(
        track,
        `missing track for ${expected.calculatorType} / ${expected.exerciseName}`,
      )
      assert.equal(
        track.higherIsBetter,
        expected.higherIsBetter,
        `${expected.exerciseName} higherIsBetter mismatch`,
      )
      assert.match(expected.boardKey, /^fitness:/)
    }
  })

  it('keeps client allowlist + migration 012 in sync with fitness boards', () => {
    for (const expected of EXPECTED_FITNESS_SHARES) {
      const boardLiteral = `boardKey: '${expected.boardKey}'`
      assert.ok(
        shareTargetsSource.includes(boardLiteral),
        `leaderboardShares.js missing ${expected.boardKey}`,
      )
      assert.ok(
        shareTargetsSource.includes(
          `calculatorType: '${expected.calculatorType}'`,
        ),
        `leaderboardShares.js missing calculatorType ${expected.calculatorType}`,
      )
      assert.ok(
        shareTargetsSource.includes(
          `exerciseName: '${expected.exerciseName}'`,
        ),
        `leaderboardShares.js missing exerciseName ${expected.exerciseName}`,
      )
      assert.ok(
        migration012.includes(`'${expected.boardKey}'`),
        `migration 012 missing ${expected.boardKey}`,
      )
    }
    const clientFitnessKeys = [
      ...shareTargetsSource.matchAll(/boardKey:\s*'(fitness:[^']+)'/g),
    ].map((m) => m[1])
    const expectedKeys = EXPECTED_FITNESS_SHARES.map((item) => item.boardKey)
    assert.deepEqual(
      [...clientFitnessKeys].sort(),
      [...expectedKeys].sort(),
      'client fitness board keys drifted from EXPECTED_FITNESS_SHARES',
    )
  })

  it('uses the 15% jump threshold for higher-is-better fitness boards', () => {
    assert.equal(LEADERBOARD_SHARE_JUMP_RATIO, 0.15)
    // Max push-ups / Cindy-style improvements
    assert.equal(
      isLargeLeaderboardShareJump({
        previousValue: 40,
        nextValue: 46,
        higherIsBetter: true,
      }),
      true,
    )
    assert.equal(
      isLargeLeaderboardShareJump({
        previousValue: 360,
        nextValue: 414,
        higherIsBetter: true,
      }),
      true,
    )
  })

  it('uses the 15% jump threshold for Fran/Murph (lower is better)', () => {
    assert.equal(
      isLargeLeaderboardShareJump({
        previousValue: 400,
        nextValue: 340,
        higherIsBetter: false,
      }),
      true,
    )
    // Slower time is not an improvement — no trust popup.
    assert.equal(
      isLargeLeaderboardShareJump({
        previousValue: 400,
        nextValue: 480,
        higherIsBetter: false,
      }),
      false,
    )
  })
})
