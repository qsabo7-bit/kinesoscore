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

  it('builds Instagram Android text SEND intent', () => {
    const urls = buildSocialLaunchUrls('instagram', {
      caption: 'Try it free\nhttps://kinesoscore.com/scoring',
    })
    assert.equal(urls.preferSystemShare, true)
    assert.match(urls.androidIntent, /android\.intent\.action\.SEND/)
    assert.match(urls.androidIntent, /com\.instagram\.android/)
    assert.match(urls.androidIntent, /Try/)
  })

  it('builds Facebook sharer + Android text SEND', () => {
    const urls = buildSocialLaunchUrls('facebook', {
      caption: 'try it',
      scoringUrl: 'https://kinesoscore.com/scoring',
    })
    assert.match(urls.httpsUrl, /facebook\.com\/sharer/)
    assert.match(urls.httpsUrl, /quote=/)
    assert.equal(urls.preferHttps, true)
    assert.match(urls.androidIntent, /com\.facebook\.katana/)
    assert.match(urls.androidIntent, /android\.intent\.action\.SEND/)
  })
})
