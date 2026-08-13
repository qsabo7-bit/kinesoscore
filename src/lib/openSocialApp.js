/**
 * Open a social native app when possible; fall back to web compose / store.
 * Caption should already be copied by the caller for paste-ready posts.
 */

export function detectMobileOs() {
  if (typeof navigator === 'undefined') return 'other'
  const ua = navigator.userAgent || ''
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'other'
}

const STORE = {
  x: {
    ios: 'https://apps.apple.com/app/x/id333903271',
    android: 'https://play.google.com/store/apps/details?id=com.twitter.android',
  },
  instagram: {
    ios: 'https://apps.apple.com/app/instagram/id389801252',
    android:
      'https://play.google.com/store/apps/details?id=com.instagram.android',
  },
  facebook: {
    ios: 'https://apps.apple.com/app/facebook/id284882215',
    android: 'https://play.google.com/store/apps/details?id=com.facebook.katana',
  },
}

/** Android: open package with optional text SEND (lands in that app). */
function androidTextSendIntent(packageName, text, fallbackUrl) {
  const encoded = encodeURIComponent(text)
  const fallback = encodeURIComponent(fallbackUrl)
  return `intent:#Intent;action=android.intent.action.SEND;type=text/plain;S.android.intent.extra.TEXT=${encoded};package=${packageName};S.browser_fallback_url=${fallback};end`
}

function androidOpenPackage(packageName, httpsHost, fallbackUrl) {
  const fallback = encodeURIComponent(fallbackUrl)
  return `intent://${httpsHost}/#Intent;scheme=https;package=${packageName};S.browser_fallback_url=${fallback};end`
}

/**
 * @param {'x' | 'instagram' | 'facebook'} network
 * @param {{ caption?: string, scoringUrl?: string }} [opts]
 */
export function buildSocialLaunchUrls(network, opts = {}) {
  const caption = String(opts.caption || '')
  const scoringUrl = String(opts.scoringUrl || 'https://kinesoscore.com/scoring')
  const encoded = encodeURIComponent(caption)
  const encodedUrl = encodeURIComponent(scoringUrl)

  if (network === 'x') {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encoded}`
    return {
      httpsUrl: tweetUrl,
      iosScheme: `twitter://post?message=${encoded}`,
      androidIntent: androidTextSendIntent(
        'com.twitter.android',
        caption,
        tweetUrl,
      ),
      iosStore: STORE.x.ios,
      androidStore: STORE.x.android,
      // Tweet intent usually opens the X app on mobile.
      preferHttps: true,
    }
  }

  if (network === 'instagram') {
    return {
      httpsUrl: 'https://www.instagram.com/',
      // Direct app open (caption already copied for paste).
      iosScheme: 'instagram://app',
      androidIntent: androidTextSendIntent(
        'com.instagram.android',
        caption,
        'https://www.instagram.com/',
      ),
      androidOpen: androidOpenPackage(
        'com.instagram.android',
        'instagram.com',
        'https://www.instagram.com/',
      ),
      iosStore: STORE.instagram.ios,
      androidStore: STORE.instagram.android,
      preferHttps: false,
    }
  }

  const fbSharer = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encoded}`
  return {
    httpsUrl: fbSharer,
    // fb://feed reliably opens the Facebook app; caption is on the clipboard.
    iosScheme: 'fb://feed',
    androidIntent: androidTextSendIntent(
      'com.facebook.katana',
      caption,
      fbSharer,
    ),
    androidOpen: androidOpenPackage(
      'com.facebook.katana',
      'www.facebook.com',
      fbSharer,
    ),
    iosStore: STORE.facebook.ios,
    androidStore: STORE.facebook.android,
    // Prefer native scheme so we don't stick on mobile web.
    preferHttps: false,
  }
}

/**
 * Navigate into the native app when possible; otherwise web / store.
 * @param {'x' | 'instagram' | 'facebook'} network
 * @param {{ caption?: string, scoringUrl?: string }} [opts]
 * @returns {Promise<'app' | 'store' | 'web'>}
 */
export function openSocialApp(network, opts = {}) {
  const urls = buildSocialLaunchUrls(network, opts)
  const os = detectMobileOs()

  if (os === 'other') {
    window.open(urls.httpsUrl, '_blank', 'noopener,noreferrer')
    return Promise.resolve('web')
  }

  const store = os === 'ios' ? urls.iosStore : urls.androidStore
  // Prefer opening the installed app (scheme / package), not the system share sheet.
  const primary =
    os === 'android'
      ? urls.androidIntent || urls.androidOpen || urls.httpsUrl
      : urls.preferHttps
        ? urls.httpsUrl
        : urls.iosScheme || urls.httpsUrl

  return new Promise((resolve) => {
    let left = false
    const markLeft = () => {
      left = true
    }
    document.addEventListener('visibilitychange', markLeft)
    window.addEventListener('pagehide', markLeft)
    window.addEventListener('blur', markLeft)

    window.location.href = primary

    window.setTimeout(() => {
      document.removeEventListener('visibilitychange', markLeft)
      window.removeEventListener('pagehide', markLeft)
      window.removeEventListener('blur', markLeft)

      if (left || document.hidden) {
        resolve('app')
        return
      }

      // Still here — try https compose/web (esp. Facebook sharer), then store.
      if (urls.httpsUrl && primary !== urls.httpsUrl) {
        let leftHttps = false
        const markHttps = () => {
          leftHttps = true
        }
        document.addEventListener('visibilitychange', markHttps)
        window.addEventListener('pagehide', markHttps)
        window.location.href = urls.httpsUrl
        window.setTimeout(() => {
          document.removeEventListener('visibilitychange', markHttps)
          window.removeEventListener('pagehide', markHttps)
          if (leftHttps || document.hidden) {
            resolve('web')
            return
          }
          if (store) {
            window.location.href = store
            resolve('store')
            return
          }
          resolve('web')
        }, 1200)
        return
      }

      if (urls.preferHttps && primary === urls.httpsUrl) {
        resolve('web')
        return
      }

      if (store) {
        window.location.href = store
        resolve('store')
        return
      }
      resolve('web')
    }, 1400)
  })
}
