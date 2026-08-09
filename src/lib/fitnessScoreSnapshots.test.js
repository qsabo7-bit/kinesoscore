import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const migrationPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../supabase/migrations/007_fitness_score_snapshots.sql',
)

const cascadeMigrationPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../supabase/migrations/010_snapshot_delete_cascade.sql',
)

describe('fitness_score_snapshots privileges (Stage 9)', () => {
  it('revokes anon/public table grants and grants authenticated only', () => {
    const sql = readFileSync(migrationPath, 'utf8')
    assert.match(
      sql,
      /revoke all on table public\.fitness_score_snapshots from public;/i,
    )
    assert.match(
      sql,
      /revoke all on table public\.fitness_score_snapshots from anon;/i,
    )
    assert.match(
      sql,
      /grant select, insert, delete\s+on table public\.fitness_score_snapshots\s+to authenticated;/i,
    )
    assert.doesNotMatch(
      sql,
      /grant[\s\S]*on table public\.fitness_score_snapshots[\s\S]*to anon/i,
    )
  })

  it('deletes snapshots before performance_records in delete_own_account', () => {
    const sql = readFileSync(migrationPath, 'utf8')
    const snapIdx = sql.search(
      /delete from public\.fitness_score_snapshots where user_id = uid;/i,
    )
    const perfIdx = sql.search(
      /delete from public\.performance_records where user_id = uid;/i,
    )
    assert.ok(snapIdx >= 0, 'expected fitness_score_snapshots delete')
    assert.ok(perfIdx >= 0, 'expected performance_records delete')
    assert.ok(
      snapIdx < perfIdx,
      'snapshots must be deleted before performance_records',
    )
  })

  it('does not alter public leaderboard RPC definitions', () => {
    const sql = readFileSync(migrationPath, 'utf8')
    assert.doesNotMatch(sql, /get_public_leaderboard/i)
    assert.doesNotMatch(sql, /get_public_habit_streaks/i)
  })
})

describe('fitness_score_snapshots delete cascade (010)', () => {
  it('rebinds source_record_id FK with ON DELETE CASCADE', () => {
    const sql = readFileSync(cascadeMigrationPath, 'utf8')
    assert.match(
      sql,
      /add constraint fitness_score_snapshots_source_record_id_fkey/i,
    )
    assert.match(
      sql,
      /references public\.performance_records \(id\)\s+on delete cascade/i,
    )
  })

  it('restores authenticated delete privilege and own-row policy', () => {
    const sql = readFileSync(cascadeMigrationPath, 'utf8')
    assert.match(
      sql,
      /Users can delete own fitness score snapshots/i,
    )
    assert.match(
      sql,
      /grant select, insert, delete\s+on table public\.fitness_score_snapshots\s+to authenticated;/i,
    )
  })
})
