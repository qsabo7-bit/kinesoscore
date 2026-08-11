import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  buildShareCardModel,
  resolveAwardsForCard,
  resolveShareFormat,
  SHARE_FORMATS,
} from './shareMomentCard.js'

describe('shareMomentCard formats', () => {
  it('defaults to Instagram Post 1080×1350 (4:5)', () => {
    const format = resolveShareFormat('post')
    assert.equal(format.width, 1080)
    assert.equal(format.height, 1350)
    assert.equal(SHARE_FORMATS.story.width, 1080)
    assert.equal(SHARE_FORMATS.story.height, 1920)
    assert.equal(resolveShareFormat('nope').id, 'post')
  })

  it('builds a public-safe card model from live scores', () => {
    const model = buildShareCardModel({
      format: 'story',
      fitnessScore: 86.4,
      strengthScore: 78,
      runningScore: 94,
      primary: '#1',
      title: 'This Week',
      athleteName: 'TrailRunner_7',
      awards: { strength: 'gold', running: 'diamond', crown: false },
    })
    assert.equal(model.formatId, 'story')
    assert.equal(model.fitnessScore, 86)
    assert.equal(model.strengthScore, 78)
    assert.equal(model.runningScore, 94)
    assert.equal(model.athleteName, 'TrailRunner_7')
    assert.equal(model.momentPrimary, '#1')
    assert.equal(model.footer, 'kinesoscore.com')
  })

  it('omits invalid scores instead of inventing them', () => {
    const model = buildShareCardModel({
      fitnessScore: 'n/a',
      strengthScore: -1,
      runningScore: 140,
      primary: '#3',
    })
    assert.equal(model.fitnessScore, null)
    assert.equal(model.strengthScore, null)
    assert.equal(model.runningScore, null)
    assert.equal(model.momentPrimary, '#3')
  })

  it('derives award badges from component scores when awards are missing', () => {
    const awards = resolveAwardsForCard(null, 92, 88)
    assert.equal(awards.strength, 'diamond')
    assert.equal(awards.running, 'gold')
    assert.equal(awards.crown, false)

    const model = buildShareCardModel({
      fitnessScore: 90,
      strengthScore: 92,
      runningScore: 91,
    })
    assert.equal(model.awards.crown, true)
    assert.equal(model.awards.strength, 'diamond')
    assert.equal(model.awards.running, 'diamond')
  })
})
