import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import {
  RESERVED_LEADERBOARD_NAMES,
  friendlyLeaderboardNameError,
  friendlyLeaderboardShareRateLimitMessage,
  isReservedLeaderboardName,
  validateLeaderboardName,
} from './leaderboardNameRules.js'

const migrationPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../supabase/migrations/008_stage10_hardening.sql',
)

const EXPECTED_RESERVED = [
  'admin',
  'administrator',
  'kinesoscore',
  'kineso',
  'support',
  'staff',
  'moderator',
  'system',
  'official',
  'leaderboard',
  'api',
  'root',
  'help',
  'null',
  'undefined',
]

describe('Stage 10 reserved Leaderboard Names', () => {
  it('client list matches the approved reserved set', () => {
    assert.deepEqual([...RESERVED_LEADERBOARD_NAMES], EXPECTED_RESERVED)
  })

  it('rejects reserved names case-insensitively in client validation', () => {
    assert.equal(isReservedLeaderboardName('Admin'), true)
    assert.equal(isReservedLeaderboardName('KINESOSCORE'), true)
    assert.equal(validateLeaderboardName('support').ok, false)
    assert.equal(validateLeaderboardName('TrailRunner_7').ok, true)
  })

  it('maps reserved-name and rate-limit DB errors to friendly copy', () => {
    assert.match(
      friendlyLeaderboardNameError(new Error('Leaderboard Name is reserved')),
      /reserved/i,
    )
    assert.match(
      friendlyLeaderboardNameError(
        new Error('Rate limit exceeded for leaderboard_name'),
      ),
      /Too many Leaderboard Name changes/i,
    )
    assert.match(
      friendlyLeaderboardShareRateLimitMessage(
        'Rate limit exceeded for leaderboard_share',
      ),
      /Too many leaderboard share updates/i,
    )
  })
})

describe('Stage 10 migration hardening SQL', () => {
  const sql = readFileSync(migrationPath, 'utf8')

  it('revokes public/anon on older private tables and re-grants authenticated', () => {
    for (const table of [
      'profiles',
      'performance_records',
      'user_defaults',
      'leaderboard_profiles',
      'leaderboard_shares',
      'habits',
      'habit_checkins',
    ]) {
      assert.match(
        sql,
        new RegExp(
          `revoke all on table public\\.${table} from public;`,
          'i',
        ),
      )
      assert.match(
        sql,
        new RegExp(`revoke all on table public\\.${table} from anon;`, 'i'),
      )
      assert.match(
        sql,
        new RegExp(
          `grant [\\s\\S]*on table public\\.${table}[\\s\\S]*to authenticated;`,
          'i',
        ),
      )
    }
  })

  it('enforces the exact reserved-name list in SQL', () => {
    for (const name of EXPECTED_RESERVED) {
      assert.match(sql, new RegExp(`\\('${name}'\\)`, 'i'))
    }
    assert.match(sql, /Leaderboard Name is reserved/i)
    assert.match(sql, /leaderboard_profiles_reject_reserved_name/i)
  })

  it('deactivates shares immediately when leaderboard profile is deleted', () => {
    assert.match(
      sql,
      /leaderboard_profiles_after_delete_deactivate_shares/i,
    )
    assert.match(
      sql,
      /update public\.leaderboard_shares s[\s\S]*is_active = false/i,
    )
    assert.match(
      sql,
      /update public\.habit_streak_shares s[\s\S]*is_active = false/i,
    )
  })

  it('defines light write-path rate limits (name 5/hr, shares 30/10m)', () => {
    assert.match(sql, /'leaderboard_name'[\s\S]*5[\s\S]*interval '1 hour'/i)
    assert.match(
      sql,
      /'leaderboard_share'[\s\S]*30[\s\S]*interval '10 minutes'/i,
    )
    assert.doesNotMatch(sql, /get_public_leaderboard[\s\S]*rate limit/i)
  })

  it('018 clears and award-only updates skip the name rate limit', () => {
    const clearLimitSql = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        '../../supabase/migrations/018_clear_name_skips_rate_limit.sql',
      ),
      'utf8',
    )
    assert.match(clearLimitSql, /tg_op = 'DELETE'/i)
    assert.match(
      clearLimitSql,
      /leaderboard_name is not distinct from old\.leaderboard_name/i,
    )
  })

  it('preserves delete_own_account snapshot-before-records order', () => {
    const snapIdx = sql.search(
      /delete from public\.fitness_score_snapshots where user_id = uid;/i,
    )
    const perfIdx = sql.search(
      /delete from public\.performance_records where user_id = uid;/i,
    )
    assert.ok(snapIdx >= 0)
    assert.ok(perfIdx >= 0)
    assert.ok(snapIdx < perfIdx)
  })

  it('does not rewrite public board RPCs or streak compute in Stage 10', () => {
    assert.doesNotMatch(sql, /compute_user_habit_streak/i)
    assert.doesNotMatch(sql, /get_public_habit_streaks/i)
    assert.doesNotMatch(sql, /get_public_leaderboard/i)
  })
})
