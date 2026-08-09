import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { isNavTabActive } from './navTabActive.js'

describe('isNavTabActive', () => {
  it('does not mark Dashboard active on home', () => {
    assert.equal(isNavTabActive('dashboard', 'home'), false)
    assert.equal(isNavTabActive('calculators', 'home'), false)
    assert.equal(isNavTabActive('about', 'home'), false)
  })

  it('marks Dashboard only on the dashboard tab', () => {
    assert.equal(isNavTabActive('dashboard', 'dashboard'), true)
    assert.equal(isNavTabActive('dashboard', 'account'), false)
  })

  it('treats any calculator page as Calculators-active', () => {
    assert.equal(isNavTabActive('calculators', 'strength'), true)
    assert.equal(isNavTabActive('calculators', 'scoring'), true)
    assert.equal(isNavTabActive('calculators', 'army-aft'), true)
    assert.equal(isNavTabActive('calculators', 'leaderboard'), false)
  })

  it('treats habit leaderboard as Leaderboard-active', () => {
    assert.equal(isNavTabActive('leaderboard', 'leaderboard'), true)
    assert.equal(isNavTabActive('leaderboard', 'leaderboard-habits'), true)
    assert.equal(isNavTabActive('leaderboard', 'habits'), false)
  })
})
