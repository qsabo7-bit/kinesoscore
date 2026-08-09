import {
  PAGE_SEO,
  SITE,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  buildWebApplicationSchema,
  resolveSeoRoute,
} from '../data/seo'
import { PAGE_FAQS_BY_TAB } from '../data/seoCopy'

function ensureMeta(selector, attributes) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value)
  }
  return el
}

function ensureLink(rel, href, extra = {}) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  for (const [key, value] of Object.entries(extra)) {
    el.setAttribute(key, value)
  }
  return el
}

function setJsonLd(id, data) {
  const scriptId = `kinesoscore-jsonld-${id}`
  let el = document.getElementById(scriptId)
  if (!data) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = scriptId
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/** Drop legacy/static JSON-LD blocks that lack stable ids (avoids duplicates). */
function pruneAnonymousJsonLd() {
  document.head
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((el) => {
      if (!el.id || !String(el.id).startsWith('kinesoscore-jsonld-')) {
        el.remove()
      }
    })
}

/**
 * Apply document-level SEO for the active App tab / path.
 * Invisible to the UI — updates title, meta, social tags, and JSON-LD only.
 */
export function applyDocumentSeo(tabOrPath) {
  if (typeof document === 'undefined') return

  const asPath = String(tabOrPath || '').startsWith('/')
  const { page } = asPath
    ? resolveSeoRoute(tabOrPath)
    : {
        page: PAGE_SEO[tabOrPath] || PAGE_SEO['not-found'] || PAGE_SEO.home,
      }

  const canonicalPath = page.canonicalPath || page.path
  const url = absoluteUrl(canonicalPath)
  const image = absoluteUrl(SITE.defaultImagePath)
  const title = page.title
  const description = page.description

  pruneAnonymousJsonLd()

  document.title = title

  ensureMeta('meta[name="description"]', {
    name: 'description',
    content: description,
  })
  ensureMeta('meta[name="robots"]', {
    name: 'robots',
    content: page.robots || 'index,follow',
  })
  ensureMeta('meta[name="theme-color"]', {
    name: 'theme-color',
    content: '#0f1412',
  })

  ensureLink('canonical', url)
  ensureLink('icon', SITE.faviconPath, { type: 'image/png' })
  ensureLink('apple-touch-icon', SITE.appleTouchIconPath)

  ensureMeta('meta[property="og:title"]', {
    property: 'og:title',
    content: title,
  })
  ensureMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: description,
  })
  ensureMeta('meta[property="og:type"]', {
    property: 'og:type',
    content: page.ogType || 'website',
  })
  ensureMeta('meta[property="og:url"]', {
    property: 'og:url',
    content: url,
  })
  ensureMeta('meta[property="og:image"]', {
    property: 'og:image',
    content: image,
  })
  ensureMeta('meta[property="og:image:width"]', {
    property: 'og:image:width',
    content: '1200',
  })
  ensureMeta('meta[property="og:image:height"]', {
    property: 'og:image:height',
    content: '630',
  })
  ensureMeta('meta[property="og:site_name"]', {
    property: 'og:site_name',
    content: SITE.name,
  })
  ensureMeta('meta[property="og:locale"]', {
    property: 'og:locale',
    content: SITE.locale,
  })

  ensureMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: SITE.twitterCard,
  })
  ensureMeta('meta[name="twitter:title"]', {
    name: 'twitter:title',
    content: title,
  })
  ensureMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: description,
  })
  ensureMeta('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: image,
  })

  setJsonLd('organization', buildOrganizationSchema())
  setJsonLd('webapplication', buildWebApplicationSchema())
  setJsonLd('breadcrumb', buildBreadcrumbSchema(page.breadcrumb))
  setJsonLd('faq', buildFaqSchema(PAGE_FAQS_BY_TAB[page.tab]))
}
