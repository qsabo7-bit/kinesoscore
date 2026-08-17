import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getVisibleNavTabs } from './visibleNavTabs.js'

describe('getVisibleNavTabs', () => {
  it('puts Home first for guests and hides Dashboard/Habits', () => {
    const ids = getVisibleNavTabs({
      isAuthenticated: false,
      showLogin: true,
    }).map((t) => t.id)
    assert.deepEqual(ids, [
      'home',
      'calculators',
      'leaderboard',
      'about',
      'login',
    ])
  })

  it('puts Dashboard first when signed in and includes Habits and Groups', () => {
    const ids = getVisibleNavTabs({
      isAuthenticated: true,
      showLogin: false,
    }).map((t) => t.id)
    assert.deepEqual(ids, [
      'dashboard',
      'calculators',
      'habits',
      'leaderboard',
      'groups',
      'about',
    ])
  })
})
