import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { buildSocialLaunchUrls } from './openSocialApp.js'

describe('openSocialApp urls', () => {
  it('builds X tweet intent with caption', () => {
    const urls = buildSocialLaunchUrls('x', {
      caption: 'Hello @KinesosScore',
      scoringUrl: 'https://kinesoscore.com/scoring',
    })
    assert.match(urls.httpsUrl, /twitter\.com\/intent\/tweet/)
    assert.match(urls.httpsUrl, /Hello/)
    assert.equal(urls.preferHttps, true)
    assert.match(urls.iosStore, /apps\.apple\.com/)
    assert.match(urls.androidStore, /play\.google\.com/)
  })

  it('builds Instagram app scheme + stores', () => {
    const urls = buildSocialLaunchUrls('instagram', {})
    assert.equal(urls.iosScheme, 'instagram://app')
    assert.equal(urls.preferHttps, false)
    assert.match(urls.androidIntent, /com\.instagram\.android/)
  })

  it('builds Facebook sharer + stores', () => {
    const urls = buildSocialLaunchUrls('facebook', {
      caption: 'try it',
      scoringUrl: 'https://kinesoscore.com/scoring',
    })
    assert.match(urls.httpsUrl, /facebook\.com\/sharer/)
    assert.match(urls.httpsUrl, /kinesoscore\.com/)
    assert.match(urls.iosStore, /facebook/)
  })
})
