/**
 * Open a social native app / text compose when possible; fall back to store or web.
 * Web cannot guarantee installed-app detection — uses visibility timeout for schemes.
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

/** Android text share intent into a specific package (opens compose with text). */
function androidTextSendIntent(packageName, text, fallbackUrl) {
  const encoded = encodeURIComponent(text)
  const fallback = encodeURIComponent(fallbackUrl)
  return `intent:#Intent;action=android.intent.action.SEND;type=text/plain;S.android.intent.extra.TEXT=${encoded};package=${packageName};S.browser_fallback_url=${fallback};end`
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
  // Caption already includes the scoring URL for guest shares.
  const shareBody = caption

  if (network === 'x') {
    return {
      httpsUrl: `https://twitter.com/intent/tweet?text=${encoded}`,
      iosScheme: `twitter://post?message=${encoded}`,
      androidIntent: androidTextSendIntent(
        'com.twitter.android',
        shareBody,
        `https://twitter.com/intent/tweet?text=${encoded}`,
      ),
      iosStore: STORE.x.ios,
      androidStore: STORE.x.android,
      preferHttps: true,
      supportsTextCompose: true,
    }
  }

  if (network === 'instagram') {
    return {
      // No official IG web compose with prefilled text — share sheet / Android SEND.
      httpsUrl: 'https://www.instagram.com/',
      iosScheme: 'instagram://app',
      androidIntent: androidTextSendIntent(
        'com.instagram.android',
        shareBody,
        'https://www.instagram.com/',
      ),
      iosStore: STORE.instagram.ios,
      androidStore: STORE.instagram.android,
      preferHttps: false,
      supportsTextCompose: true,
      preferSystemShare: true,
    }
  }

  // facebook — sharer + quote is the closest web text compose; Android SEND is better.
  return {
    httpsUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encoded}`,
    iosScheme: `fb://share?href=${encodedUrl}&quote=${encoded}`,
    androidIntent: androidTextSendIntent(
      'com.facebook.katana',
      shareBody,
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encoded}`,
    ),
    iosStore: STORE.facebook.ios,
    androidStore: STORE.facebook.android,
    preferHttps: true,
    supportsTextCompose: true,
  }
}

/**
 * System share sheet with text only (best iOS path into Instagram/Facebook compose).
 * @param {{ caption: string, url?: string }} opts
 * @returns {Promise<'shared' | 'abort' | 'unavailable'>}
 */
export async function shareTextViaSystemSheet(opts) {
  const text = String(opts.caption || '')
  const url = opts.url ? String(opts.url) : ''
  if (
    typeof navigator === 'undefined' ||
    typeof navigator.share !== 'function'
  ) {
    return 'unavailable'
  }
  try {
    const payload = url ? { text, url, title: 'KinesoScore' } : { text, title: 'KinesoScore' }
    // Some browsers reject url+text duplicates; caption already has the link.
    await navigator.share(url && !text.includes(url) ? payload : { text, title: 'KinesoScore' })
    return 'shared'
  } catch (err) {
    if (err?.name === 'AbortError') return 'abort'
    return 'unavailable'
  }
}

/**
 * Navigate into the native app / text compose when possible.
 * @param {'x' | 'instagram' | 'facebook'} network
 * @param {{ caption?: string, scoringUrl?: string }} [opts]
 * @returns {Promise<'app' | 'store' | 'web' | 'shared' | 'abort'>}
 */
export async function openSocialApp(network, opts = {}) {
  const urls = buildSocialLaunchUrls(network, opts)
  const os = detectMobileOs()
  const caption = String(opts.caption || '')
  const scoringUrl = String(opts.scoringUrl || 'https://kinesoscore.com/scoring')

  // iOS: Instagram has no compose URL — system share sheet is the text-ready path.
  // Android uses package-targeted SEND intents below instead.
  if (urls.preferSystemShare && os === 'ios') {
    const sheet = await shareTextViaSystemSheet({
      caption,
      url: scoringUrl,
    })
    if (sheet === 'shared' || sheet === 'abort') return sheet
  }

  // iOS Facebook: try system share first for a text-ready handoff, then sharer URL.
  if (network === 'facebook' && os === 'ios') {
    const sheet = await shareTextViaSystemSheet({
      caption,
      url: scoringUrl,
    })
    if (sheet === 'shared' || sheet === 'abort') return sheet
  }

  if (os === 'other') {
    window.open(urls.httpsUrl, '_blank', 'noopener,noreferrer')
    return 'web'
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

    window.location.href = primary

    window.setTimeout(() => {
      document.removeEventListener('visibilitychange', markLeft)
      window.removeEventListener('pagehide', markLeft)
      window.removeEventListener('blur', markLeft)

      if (left || document.hidden) {
        resolve('app')
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
      window.location.href = urls.httpsUrl
      resolve('web')
    }, 1400)
  })
}
