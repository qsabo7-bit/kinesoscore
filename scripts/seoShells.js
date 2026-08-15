/**
 * Build-time SEO shells for SPA deep links.
 * Social crawlers often skip client JS — each public path needs correct meta in HTML.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import {
  DEFAULT_SITE_ORIGIN,
  PAGE_SEO,
  PUBLIC_SEO_PAGES,
  SITE,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildOrganizationSchema,
  buildWebApplicationSchema,
} from '../src/data/seo.js'
import { PAGE_FAQS_BY_TAB } from '../src/data/seoCopy.js'

const SKIP_SHELL_TABS = new Set([
  'dashboard',
  'habits',
  'groups',
  'account',
  'login',
  'signup',
  'reset-password',
])

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Crawlable body HTML placed inside #root.
 * React replaces #root on boot, so the live UI is unchanged for users.
 */
function buildCrawlableBody(page) {
  const crumbs = Array.isArray(page.breadcrumb) ? page.breadcrumb : []
  const heading =
    page.heading ||
    crumbs[crumbs.length - 1]?.name ||
    page.title.split('|')[0].trim() ||
    SITE.name
  const faqKey = page.tab
  const faqFallback = page.renderTab
  const faqs =
    PAGE_FAQS_BY_TAB[faqKey] ||
    (faqFallback ? PAGE_FAQS_BY_TAB[faqFallback] : null) ||
    []
  const ctaPath = page.canonicalPath || page.path || '/'
  const ctaHref = ctaPath.startsWith('/') ? ctaPath : `/${ctaPath}`

  const faqBlock =
    faqs.length > 0
      ? `<section><h2>Frequently asked questions</h2><dl>${faqs
          .map(
            (item) =>
              `<dt>${escapeHtml(item.question)}</dt><dd>${escapeHtml(item.answer)}</dd>`,
          )
          .join('')}</dl></section>`
      : ''

  return `<div data-seo-body><main><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(page.description || SITE.description)}</p>${faqBlock}<p><a href="${escapeAttr(ctaHref)}">Open ${escapeHtml(heading)} on KinesoScore</a></p></main></div>`
}

function injectCrawlableBody(html, bodyHtml) {
  if (/id="root"[^>]*>\s*<div data-seo-body/i.test(html)) {
    return html.replace(
      /(<div id="root"[^>]*>)[\s\S]*?(<\/div>\s*<script)/i,
      `$1${bodyHtml}$2`,
    )
  }
  return html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${bodyHtml}</div>`,
  )
}

function replaceMetaByName(html, name, content) {
  const re = new RegExp(
    `<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/?>`,
    'i',
  )
  const tag = `<meta name="${name}" content="${escapeAttr(content)}" />`
  return re.test(html)
    ? html.replace(re, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`)
}

function replaceMetaByProperty(html, property, content) {
  const re = new RegExp(
    `<meta\\s+property="${property}"\\s+content="[^"]*"\\s*/?>`,
    'i',
  )
  const tag = `<meta property="${property}" content="${escapeAttr(content)}" />`
  return re.test(html)
    ? html.replace(re, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`)
}

function replaceLinkCanonical(html, href) {
  const re = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i
  const tag = `<link rel="canonical" href="${escapeAttr(href)}" />`
  return re.test(html)
    ? html.replace(re, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`)
}

function replaceTitle(html, title) {
  return html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeAttr(title)}</title>`,
  )
}

function stripAnonymousJsonLd(html) {
  return html.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
    (block) => (/id="kinesoscore-jsonld-/i.test(block) ? block : ''),
  )
}

function upsertJsonLd(html, id, data) {
  const scriptId = `kinesoscore-jsonld-${id}`
  const payload = JSON.stringify(data, null, 2)
  const tag = `<script type="application/ld+json" id="${scriptId}">\n${payload}\n    </script>`
  const re = new RegExp(
    `<script\\s+type="application\\/ld\\+json"\\s+id="${scriptId}">[\\s\\S]*?<\\/script>`,
    'i',
  )
  if (re.test(html)) return html.replace(re, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function applyPageSeo(template, page) {
  const canonicalPath = page.canonicalPath || page.path
  const url = absoluteUrl(canonicalPath)
  const image = absoluteUrl(SITE.defaultImagePath)
  const title = page.title
  const description = page.description
  const robots = page.robots || 'index,follow'

  let html = stripAnonymousJsonLd(template)
  html = replaceTitle(html, title)
  html = replaceMetaByName(html, 'description', description)
  html = replaceMetaByName(html, 'robots', robots)
  html = replaceLinkCanonical(html, url)

  html = replaceMetaByProperty(html, 'og:title', title)
  html = replaceMetaByProperty(html, 'og:description', description)
  html = replaceMetaByProperty(html, 'og:type', page.ogType || 'website')
  html = replaceMetaByProperty(html, 'og:url', url)
  html = replaceMetaByProperty(html, 'og:image', image)
  html = replaceMetaByProperty(html, 'og:site_name', SITE.name)
  html = replaceMetaByProperty(html, 'og:locale', SITE.locale)

  html = replaceMetaByName(html, 'twitter:card', SITE.twitterCard)
  html = replaceMetaByName(html, 'twitter:title', title)
  html = replaceMetaByName(html, 'twitter:description', description)
  html = replaceMetaByName(html, 'twitter:image', image)

  html = upsertJsonLd(html, 'organization', buildOrganizationSchema())
  html = upsertJsonLd(html, 'webapplication', buildWebApplicationSchema())

  const breadcrumb = buildBreadcrumbSchema(page.breadcrumb)
  if (breadcrumb) html = upsertJsonLd(html, 'breadcrumb', breadcrumb)
  else {
    html = html.replace(
      /<script\s+type="application\/ld\+json"\s+id="kinesoscore-jsonld-breadcrumb">[\s\S]*?<\/script>\s*/i,
      '',
    )
  }

  const faqs =
    PAGE_FAQS_BY_TAB[page.tab] ||
    (page.renderTab ? PAGE_FAQS_BY_TAB[page.renderTab] : null)
  const faq = buildFaqSchema(faqs)
  if (faq) html = upsertJsonLd(html, 'faq', faq)
  else {
    html = html.replace(
      /<script\s+type="application\/ld\+json"\s+id="kinesoscore-jsonld-faq">[\s\S]*?<\/script>\s*/i,
      '',
    )
  }

  html = injectCrawlableBody(html, buildCrawlableBody(page))
  return html
}

function shellOutputPath(distDir, pagePath) {
  if (!pagePath || pagePath === '/') return path.join(distDir, 'index.html')
  const clean = pagePath.replace(/^\//, '').replace(/\/+$/, '')
  return path.join(distDir, clean, 'index.html')
}

function buildSitemapXml(pages) {
  const seen = new Set()
  const entries = []
  for (const page of pages) {
    const pathKey = page.canonicalPath || page.path
    if (seen.has(pathKey)) continue
    seen.add(pathKey)
    const loc = absoluteUrl(pathKey)
    entries.push(
      `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${pathKey === '/' ? '1.0' : '0.8'}</priority>\n  </url>`,
    )
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`
}

/**
 * @param {{ distDir: string, publicDir: string, rootDir?: string }} dirs
 */
export async function generateSeoArtifacts({ distDir, publicDir }) {
  const templatePath = path.join(distDir, 'index.html')
  const template = await readFile(templatePath, 'utf8')

  const shellPages = Object.values(PAGE_SEO).filter(
    (page) => !SKIP_SHELL_TABS.has(page.tab),
  )

  for (const page of shellPages) {
    const html = applyPageSeo(template, page)
    const outPath = shellOutputPath(distDir, page.path)
    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf8')
    console.log(`SEO shell: ${page.path}`)
  }

  const sitemap = buildSitemapXml(PUBLIC_SEO_PAGES)
  await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')
  await writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
  console.log(
    `Sitemap: ${PUBLIC_SEO_PAGES.length} public URLs (${DEFAULT_SITE_ORIGIN})`,
  )
}

/** Vite plugin — runs after assets are written to dist/. */
export function kinesoscoreSeoShells() {
  let outDir = 'dist'
  let rootDir = process.cwd()

  return {
    name: 'kinesoscore-seo-shells',
    configResolved(config) {
      outDir = config.build.outDir
      rootDir = config.root
    },
    async closeBundle() {
      const distDir = path.resolve(rootDir, outDir)
      const publicDir = path.resolve(rootDir, 'public')
      await generateSeoArtifacts({ distDir, publicDir })
    },
  }
}
