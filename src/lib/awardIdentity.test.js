import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  formatPublicAwardCaption,
  mapPublicAwardIdentity,
  normalizeAwardTier,
} from './awardIdentityFormat.js'

describe('awardIdentityFormat', () => {
  it('normalizes tiers and rejects junk', () => {
    assert.equal(normalizeAwardTier('Gold'), 'gold')
    assert.equal(normalizeAwardTier('nope'), null)
  })

  it('maps public RPC fields into identity or null', () => {
    assert.equal(mapPublicAwardIdentity({}), null)
    assert.deepEqual(
      mapPublicAwardIdentity({
        award_running: 'silver',
        award_strength: 'gold',
        award_crown: false,
      }),
      { running: 'silver', strength: 'gold', crown: false },
    )
  })

  it('formats share captions without raw scores', () => {
    assert.equal(formatPublicAwardCaption(null), '')
    assert.equal(
      formatPublicAwardCaption({
        crown: true,
        running: 'diamond',
        strength: 'diamond',
      }),
      'Crown athlete',
    )
    assert.equal(
      formatPublicAwardCaption({
        running: 'bronze',
        strength: 'gold',
        crown: false,
      }),
      'Gold Strength · Bronze Running',
    )
  })
})
