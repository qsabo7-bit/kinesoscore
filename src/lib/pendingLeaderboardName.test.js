import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  applyPendingLeaderboardName,
  clearPendingLeaderboardName,
  peekPendingLeaderboardName,
  stashPendingLeaderboardName,
} from './pendingLeaderboardName.js'

describe('pendingLeaderboardName', () => {
  it('stashes, peeks, and clears only after successful apply', async () => {
    clearPendingLeaderboardName()
    stashPendingLeaderboardName('TrailRunner_7')
    assert.equal(peekPendingLeaderboardName(), 'TrailRunner_7')

    let calls = 0
    await applyPendingLeaderboardName('user-1', async (userId, name) => {
      calls += 1
      assert.equal(userId, 'user-1')
      assert.equal(name, 'TrailRunner_7')
    })
    assert.equal(calls, 1)
    assert.equal(peekPendingLeaderboardName(), null)
  })

  it('keeps stash when apply throws', async () => {
    clearPendingLeaderboardName()
    stashPendingLeaderboardName('KeepMe')
    await assert.rejects(() =>
      applyPendingLeaderboardName('user-1', async () => {
        throw new Error('rate limited')
      }),
    )
    assert.equal(peekPendingLeaderboardName(), 'KeepMe')
    clearPendingLeaderboardName()
  })
})
