import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const migrationPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../supabase/migrations/009_performance_share_lifecycle.sql',
)

const deleteRpcPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../supabase/migrations/011_delete_own_performance_record.sql',
)

describe('Stage 10 correction — performance share lifecycle', () => {
  const sql = readFileSync(migrationPath, 'utf8')

  it('uses BEFORE DELETE so SET NULL FK cannot orphan active shares', () => {
    assert.match(
      sql,
      /before delete on public\.performance_records/i,
    )
    assert.match(
      sql,
      /performance_records_before_delete_deactivate_shares/i,
    )
    assert.match(
      sql,
      /where s\.source_record_id = old\.id/i,
    )
    assert.match(sql, /is_active = false/i)
    assert.doesNotMatch(sql, /delete from public\.leaderboard_shares/i)
    assert.doesNotMatch(sql, /delete from public\.leaderboard_profiles/i)
  })

  it('skips auth.uid()-null cascade path and share rate limits', () => {
    assert.match(sql, /if auth\.uid\(\) is null then/i)
    assert.match(sql, /request\.skip_share_rate_limit/i)
  })

  it('does not rewrite public RPCs, awards, or habit streak compute', () => {
    assert.doesNotMatch(sql, /get_public_leaderboard/i)
    assert.doesNotMatch(sql, /get_public_habit_streaks/i)
    assert.doesNotMatch(sql, /compute_user_habit_streak/i)
    assert.doesNotMatch(sql, /fitness_score_snapshots/i)
    assert.doesNotMatch(sql, /deriveComponentAward|fitnessAwards/i)
  })
})

describe('delete_own_performance_record (011)', () => {
  const sql = readFileSync(deleteRpcPath, 'utf8')

  it('defines ownership-checked RPC that clears snapshots before records', () => {
    assert.match(
      sql,
      /create or replace function public\.delete_own_performance_record/i,
    )
    const snapIdx = sql.search(
      /delete from public\.fitness_score_snapshots/i,
    )
    const perfIdx = sql.search(
      /delete from public\.performance_records/i,
    )
    assert.ok(snapIdx >= 0, 'expected snapshot delete')
    assert.ok(perfIdx >= 0, 'expected performance_records delete')
    assert.ok(snapIdx < perfIdx, 'snapshots must be deleted before records')
    assert.match(
      sql,
      /grant execute on function public\.delete_own_performance_record/i,
    )
  })

  it('allows inactive-share updates without re-validating Leaderboard Name', () => {
    assert.match(
      sql,
      /tg_op = 'UPDATE' and new\.is_active is false/i,
    )
  })

  it('detaches leaderboard shares before deleting the performance row', () => {
    assert.match(
      sql,
      /source_record_id = null[\s\S]*delete from public\.performance_records/i,
    )
  })
})
