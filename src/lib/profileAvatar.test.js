import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  AVATAR_CATALOG,
  AVATAR_MARK_IDS,
  DEFAULT_AVATAR_ID,
  friendlyAvatarError,
  isValidAvatarId,
  normalizeAvatarId,
  pickRandomAvatarId,
} from '../data/avatarCatalog.js'

describe('avatar catalog', () => {
  it('defaults to mark-sun for missing/invalid ids', () => {
    assert.equal(DEFAULT_AVATAR_ID, 'mark-sun')
    assert.equal(normalizeAvatarId(undefined), 'mark-sun')
    assert.equal(normalizeAvatarId('not-a-real-mark'), 'mark-sun')
    assert.equal(normalizeAvatarId('none'), 'mark-sun')
  })

  it('accepts every catalog id', () => {
    for (const item of AVATAR_CATALOG) {
      assert.equal(isValidAvatarId(item.id), true)
      assert.equal(normalizeAvatarId(item.id), item.id)
    }
  })

  it('rejects unknown ids and none', () => {
    assert.equal(isValidAvatarId(''), false)
    assert.equal(isValidAvatarId('none'), false)
    assert.equal(isValidAvatarId('mark-ball'), false)
    assert.equal(normalizeAvatarId('mark-ball'), DEFAULT_AVATAR_ID)
  })

  it('includes five marks and no none option', () => {
    const ids = AVATAR_CATALOG.map((item) => item.id)
    assert.deepEqual(ids, [
      'mark-sun',
      'mark-pulse',
      'mark-shield',
      'mark-peak',
      'mark-bolt',
    ])
    assert.deepEqual(AVATAR_MARK_IDS, ids)
    assert.equal(
      AVATAR_CATALOG.find((item) => item.id === 'mark-shield')?.color,
      '#ef4444',
    )
    assert.equal(
      AVATAR_CATALOG.find((item) => item.id === 'mark-pulse')?.color,
      '#7dffb3',
    )
    for (const item of AVATAR_CATALOG) {
      assert.match(item.color, /^#[0-9a-f]{6}$/i)
    }
  })

  it('pickRandomAvatarId returns a catalog mark', () => {
    for (let i = 0; i < 20; i += 1) {
      assert.equal(isValidAvatarId(pickRandomAvatarId()), true)
    }
  })
})

describe('friendlyAvatarError', () => {
  it('maps check-constraint failures', () => {
    assert.match(
      friendlyAvatarError({
        message: 'violates check constraint profiles_avatar_id_check',
      }),
      /not available/i,
    )
  })

  it('maps missing-column failures', () => {
    assert.match(
      friendlyAvatarError({
        message: 'Could not find the avatar_id column',
      }),
      /not available yet/i,
    )
  })

  it('maps missing-profile update failures', () => {
    assert.match(
      friendlyAvatarError({ code: 'NOT_FOUND' }),
      /refresh/i,
    )
  })
})
