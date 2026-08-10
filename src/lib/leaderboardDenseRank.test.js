import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { assignDenseRanks } from './leaderboardDenseRank.js'

const here = dirname(fileURLToPath(import.meta.url))
const migration013 = readFileSync(
  join(here, '../../supabase/migrations/013_leaderboard_dense_rank_ties.sql'),
  'utf8',
)

describe('assignDenseRanks', () => {
  it('ties equal scores at the same rank number', () => {
    const ranked = assignDenseRanks(
      [
        { name: 'A', value: 100 },
        { name: 'B', value: 100 },
        { name: 'C', value: 90 },
        { name: 'D', value: 90 },
        { name: 'E', value: 80 },
      ],
      (row) => row.value,
    )
    assert.deepEqual(
      ranked.map((row) => row.rank),
      [1, 1, 2, 2, 3],
    )
  })
})

describe('013 leaderboard dense rank ties SQL', () => {
  it('ranks by score/streak only (name is display order)', () => {
    assert.match(
      migration013,
      /dense_rank\(\)\s+over\s*\(\s*order by e\.rvalue desc\s*\)/i,
    )
    assert.match(
      migration013,
      /dense_rank\(\)\s+over\s*\(\s*order by e\.streak_value desc\s*\)/i,
    )
    assert.doesNotMatch(
      migration013,
      /dense_rank\(\)\s+over\s*\(\s*order by e\.rvalue desc,\s*lower\(e\.name\)/i,
    )
  })
})
