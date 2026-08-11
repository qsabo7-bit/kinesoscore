import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  BLOCKED_NAME_CONTAINS,
  BLOCKED_NAME_EXACT,
  containsBlockedNameTerm,
} from './blockedNameTerms.js'
import {
  friendlyLeaderboardNameError,
  validateLeaderboardName,
} from './leaderboardNameRules.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const migrationPath = join(
  root,
  'supabase/migrations/023_blocked_leaderboard_name_terms.sql',
)

describe('blocked Leaderboard Name terms', () => {
  it('rejects exact tokens and clear embedded abuse', () => {
    assert.equal(containsBlockedNameTerm('ass'), true)
    assert.equal(containsBlockedNameTerm('Big_Ass'), true)
    assert.equal(containsBlockedNameTerm('fuckyou'), true)
    assert.equal(containsBlockedNameTerm('shit_runner'), true)
    assert.equal(containsBlockedNameTerm('naziLift'), true)
  })

  it('allows clean names and avoids common false positives', () => {
    assert.equal(containsBlockedNameTerm('TrailRunner_7'), false)
    assert.equal(containsBlockedNameTerm('Bass'), false)
    assert.equal(containsBlockedNameTerm('Pass'), false)
    assert.equal(containsBlockedNameTerm('classy'), false)
    assert.equal(containsBlockedNameTerm('Hello'), false)
    assert.equal(validateLeaderboardName('TrailRunner_7').ok, true)
    assert.equal(validateLeaderboardName('fuck_off').ok, false)
    assert.equal(validateLeaderboardName('Ass').ok, false)
  })

  it('maps DB not-allowed errors to friendly copy', () => {
    assert.match(
      friendlyLeaderboardNameError(
        new Error('Leaderboard Name is not allowed'),
      ),
      /not allowed/i,
    )
  })

  it('keeps client lists mirrored in migration 023', () => {
    const sql = readFileSync(migrationPath, 'utf8')
    for (const term of BLOCKED_NAME_EXACT) {
      assert.match(
        sql,
        new RegExp(`\\('${term}',\\s*'exact'\\)`, 'i'),
        `missing exact term ${term}`,
      )
    }
    for (const term of BLOCKED_NAME_CONTAINS) {
      assert.match(
        sql,
        new RegExp(`\\('${term}',\\s*'contains'\\)`, 'i'),
        `missing contains term ${term}`,
      )
    }
    assert.match(sql, /Leaderboard Name is not allowed/i)
    assert.match(sql, /blocked_leaderboard_name_terms/i)
  })
})
