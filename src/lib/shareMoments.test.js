import assert from 'node:assert/strict'
import { describe, it, beforeEach } from 'node:test'
import {
  buildScoreShareMoment,
  clearShareMomentDismissals,
  dismissShareMoment,
  isShareMomentDismissed,
  shouldAutoPromptShareMoment,
  markSessionSharePromptUsed,
  hasUsedSessionSharePrompt,
} from './shareMoments.js'
import {
  buildGuestScoreShareCaption,
  buildShareCaption,
  buildWeeklyCaptions,
} from './shareCaption.js'

describe('shareMoments dismiss + prompts', () => {
  beforeEach(() => {
    clearShareMomentDismissals()
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear()
    }
  })

  it('tracks dismissals per moment type', () => {
    assert.equal(isShareMomentDismissed('score_saved'), false)
    dismissShareMoment('score_saved')
    assert.equal(isShareMomentDismissed('score_saved'), true)
    assert.equal(isShareMomentDismissed('award_unlock'), false)
  })

  it('limits auto prompts to one per session', () => {
    assert.equal(shouldAutoPromptShareMoment('score_saved'), true)
    markSessionSharePromptUsed()
    assert.equal(hasUsedSessionSharePrompt(), true)
    assert.equal(shouldAutoPromptShareMoment('award_unlock'), false)
  })

  it('builds score share payloads', () => {
    const moment = buildScoreShareMoment({
      fitnessScore: 86.2,
      strengthScore: 78,
      runningScore: 94,
      unlock: false,
    })
    assert.equal(moment.primary, '86')
    assert.equal(moment.type, 'score_saved')
    assert.equal(moment.fitnessScore, 86)
  })
})

describe('shareCaption', () => {
  it('builds public captions without private fields', () => {
    const caption = buildShareCaption(
      {
        fitnessScore: 86,
        strengthScore: 78,
        runningScore: 94,
        athleteName: 'TrailRunner_7',
      },
      { title: 'myKinesoScore', primary: '86' },
    )
    assert.match(caption, /86/)
    assert.match(caption, /TrailRunner_7/)
    assert.match(caption, /kinesoscore\.com/)
    assert.doesNotMatch(caption, /@/)
  })

  it('builds weekly external caption pack', () => {
    const pack = buildWeeklyCaptions({
      fitnessScore: 90,
      strengthScore: 88,
      runningScore: 92,
      rank: 1,
      boardLabel: '5K',
    })
    assert.match(pack.scoreCuriosity, /90/)
    assert.match(pack.rankEnergy, /#1/)
  })

  it('builds polished guest score captions for social share', () => {
    const caption = buildGuestScoreShareCaption({
      fitnessScore: 77,
      strengthScore: 72,
      runningScore: 82,
      band: 'Strong · Balanced',
    })
    assert.match(caption, /77/)
    assert.match(caption, /Strength 72/)
    assert.match(caption, /Running 82/)
    assert.match(caption, /Try it free/)
    assert.match(caption, /What’s yours/)
    assert.match(caption, /kinesoscore\.com\/scoring/)
    assert.doesNotMatch(caption, /@KinesosScore/)
    assert.ok(caption.length <= 280)
  })

  it('adds @KinesosScore on X captions', () => {
    const caption = buildGuestScoreShareCaption(
      {
        fitnessScore: 77,
        strengthScore: 72,
        runningScore: 82,
        band: 'Strong · Balanced',
      },
      { platform: 'x' },
    )
    assert.match(caption, /@KinesosScore/)
    assert.match(caption, /Try it free/)
    assert.match(caption, /kinesoscore\.com\/scoring/)
    assert.ok(caption.length <= 280)
  })

  it('includes handle when includeHandle is true', () => {
    const caption = buildGuestScoreShareCaption(
      {
        fitnessScore: 77,
        strengthScore: 72,
        runningScore: 82,
        band: 'Strong · Balanced',
      },
      { includeHandle: true },
    )
    assert.match(caption, /@KinesosScore/)
  })
})
