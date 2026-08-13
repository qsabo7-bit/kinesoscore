/**
 * Open a social native app when possible; fall back to store (or web).
 * Web cannot guarantee installed-app detection — uses visibility timeout.
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
    return {
      // Universal / web intent — opens X app when installed, else mobile web compose.
      httpsUrl: `https://twitter.com/intent/tweet?text=${encoded}`,
      iosScheme: `twitter://post?message=${encoded}`,
      androidIntent: `intent://twitter.com/intent/tweet?text=${encoded}#Intent;scheme=https;package=com.twitter.android;S.browser_fallback_url=${encodedUrl};end`,
      iosStore: STORE.x.ios,
      androidStore: STORE.x.android,
      preferHttps: true,
    }
  }

  if (network === 'instagram') {
    return {
      httpsUrl: 'https://www.instagram.com/',
      iosScheme: 'instagram://app',
      androidIntent:
        'intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end',
      iosStore: STORE.instagram.ios,
      androidStore: STORE.instagram.android,
      preferHttps: false,
    }
  }

  // facebook
  return {
    httpsUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encoded}`,
    iosScheme: 'fb://feed',
    androidIntent:
      'intent://www.facebook.com/#Intent;scheme=https;package=com.facebook.katana;end',
    iosStore: STORE.facebook.ios,
    androidStore: STORE.facebook.android,
    preferHttps: false,
  }
}

/**
 * Navigate into the native app when possible; otherwise App/Play Store.
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
  const primary =
    os === 'android'
      ? urls.androidIntent || urls.httpsUrl
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

    // Same-tab navigation is required for many custom schemes on iOS.
    window.location.href = primary

    window.setTimeout(() => {
      document.removeEventListener('visibilitychange', markLeft)
      window.removeEventListener('pagehide', markLeft)
      window.removeEventListener('blur', markLeft)

      if (left || document.hidden) {
        resolve('app')
        return
      }

      // HTTPS intents (X) already landed on mobile web compose — don't bounce to store.
      if (urls.preferHttps && primary === urls.httpsUrl) {
        resolve('web')
        return
      }

      // Custom scheme failed → App/Play Store, else https web.
      if (store) {
        window.location.href = store
        resolve('store')
        return
      }
      window.location.href = urls.httpsUrl
      resolve('web')
    }, 1400)
  })
}
