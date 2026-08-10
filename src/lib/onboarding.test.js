import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  ONBOARDING_TRACKS,
  isOnboardingFinished,
  markOnboardingCompleted,
  markOnboardingSkipped,
  shouldShowOnboarding,
  trackById,
} from './onboarding.js'

describe('onboarding', () => {
  it('exposes five first-session tracks with tabs', () => {
    assert.equal(ONBOARDING_TRACKS.length, 5)
    assert.ok(trackById('strength')?.tab === 'strength')
    assert.ok(trackById('habits')?.tab === 'habits')
  })

  it('finished flags suppress the wizard', () => {
    const id = `test-user-${Date.now()}`
    assert.equal(isOnboardingFinished(id), false)
    markOnboardingSkipped(id)
    assert.equal(isOnboardingFinished(id), true)
    assert.equal(
      shouldShowOnboarding(id, {
        hasLeaderboardName: false,
        hasPerformanceData: false,
      }),
      false,
    )
  })

  it('auto-completes established members with name + data', () => {
    const id = `test-established-${Date.now()}`
    assert.equal(
      shouldShowOnboarding(id, {
        hasLeaderboardName: true,
        hasPerformanceData: true,
      }),
      false,
    )
    assert.equal(isOnboardingFinished(id), true)
  })

  it('shows for new members missing name or saves', () => {
    const id = `test-new-${Date.now()}`
    assert.equal(
      shouldShowOnboarding(id, {
        hasLeaderboardName: false,
        hasPerformanceData: false,
      }),
      true,
    )
    markOnboardingCompleted(id, 'running')
    assert.equal(
      shouldShowOnboarding(id, {
        hasLeaderboardName: false,
        hasPerformanceData: false,
      }),
      false,
    )
  })
})
