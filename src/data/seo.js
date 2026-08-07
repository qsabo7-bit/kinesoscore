import { BRAND } from './brand'

/**
 * SEO / sharing configuration for KinesoScore.
 * Production origin can be overridden with VITE_SITE_URL.
 */
export const DEFAULT_SITE_ORIGIN = 'https://kinesoscore.com'

export const SITE = {
  name: BRAND.full,
  shortName: BRAND.short,
  tagline: BRAND.tagline,
  description: BRAND.metaDescription,
  locale: 'en_US',
  twitterCard: 'summary_large_image',
  /** Dedicated 1200×630 social preview. Favicon stays separate. */
  defaultImagePath: '/og-image.png',
  faviconPath: '/kinesoscore-favicon.png',
  appleTouchIconPath: '/kinesoscore-favicon.png',
}

export function getSiteOrigin() {
  const fromEnv = String(import.meta.env.VITE_SITE_URL || '').trim().replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return DEFAULT_SITE_ORIGIN
}

export function absoluteUrl(path = '/') {
  const origin = getSiteOrigin()
  if (!path || path === '/') return `${origin}/`
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Public + private page SEO.
 * `tab` is the App activeTab used to render content.
 * `path` is the shareable / crawlable URL.
 */
export const PAGE_SEO = {
  home: {
    tab: 'home',
    path: '/',
    title: 'KinesoScore | Fitness Performance Calculator & Analytics',
    description:
      'KinesoScore is a fitness performance analytics platform for measuring strength, running, BMI, fitness age, KinesoScore™, and military fitness assessments in one place.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [{ name: 'Home', path: '/' }],
  },
  calculators: {
    tab: 'calculators',
    path: '/calculators',
    title: 'Fitness Calculators | Strength, Running & Military Tools | KinesoScore',
    description:
      'Explore KinesoScore fitness calculators for strength and SBD totals, running performance, BMI, fitness age, KinesoScore™, and military fitness assessments.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
    ],
  },
  strength: {
    tab: 'strength',
    path: '/strength',
    title: 'Strength & SBD Total Calculator | 1RM Tracking | KinesoScore',
    description:
      'Estimate one-rep max with the Epley formula, calculate Squat/Bench/Deadlift SBD totals, and track strength progress over time with KinesoScore.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Strength', path: '/strength' },
    ],
  },
  running: {
    tab: 'running',
    path: '/running',
    title: 'Running Performance Calculator | Race Times & Paces | KinesoScore',
    description:
      'Analyze running performance with KinesoScore. Predict race times, training paces, and track endurance progress across common distances.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Running', path: '/running' },
    ],
  },
  scoring: {
    tab: 'scoring',
    path: '/scoring',
    title: 'KinesoScore™ Calculator | Overall Fitness Performance Score',
    description:
      'The KinesoScore™ calculator estimates your overall fitness performance using your strength, endurance, body composition, and cardiovascular metrics.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'KinesoScore™', path: '/scoring' },
    ],
  },
  vo2max: {
    tab: 'vo2max',
    path: '/vo2max',
    title: 'VO₂ Max Calculator | Cooper & Rockport Estimates | KinesoScore',
    description:
      'Estimate VO₂ max from Cooper and Rockport field tests with KinesoScore and track cardiorespiratory fitness over time.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'VO₂ Max', path: '/vo2max' },
    ],
  },
  bmr: {
    tab: 'bmr',
    path: '/bmr',
    title: 'BMR Calculator | Resting Metabolism & TDEE | KinesoScore',
    description:
      'Estimate basal metabolic rate and daily calorie needs with the Mifflin–St Jeor equation using the KinesoScore BMR calculator.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'BMR', path: '/bmr' },
    ],
  },
  bmi: {
    tab: 'bmi',
    path: '/bmi',
    title: 'BMI Calculator | Body Mass Index & Category | KinesoScore',
    description:
      'Calculate body mass index, see WHO weight category guidance, and track BMI trends with the KinesoScore BMI calculator.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'BMI', path: '/bmi' },
    ],
  },
  'fitness-age': {
    tab: 'fitness-age',
    path: '/fitness-age',
    title: 'Fitness Age Calculator | VO₂ Cardiorespiratory Age | KinesoScore',
    description:
      'Estimate KinesoScore™ Fitness Age by comparing VO₂ max with age- and sex-based fitness reference values. Higher cardiorespiratory fitness can mean a younger fitness age.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Fitness Age', path: '/fitness-age' },
    ],
  },
  'air-force-pfra': {
    tab: 'air-force-pfra',
    path: '/air-force-pfra',
    title: 'Air Force PFRA Calculator | Military Fitness Score | KinesoScore',
    description:
      'Estimate your Air Force Physical Fitness Readiness Assessment score with KinesoScore using published PFRA standards for cardio, strength, core, and body composition.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Air Force PFRA', path: '/air-force-pfra' },
    ],
  },
  'air-force-pfa': {
    tab: 'air-force-pfa',
    path: '/air-force-pfa',
    title: 'Legacy Air Force PFA Calculator | Historical Fitness Assessment | KinesoScore',
    description:
      'Calculate Legacy Air Force PFA scores with KinesoScore for historical tracking using published 1.5-mile run, push-up, and sit-up standards.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Legacy Air Force PFA', path: '/air-force-pfa' },
    ],
  },
  'army-aft': {
    tab: 'army-aft',
    path: '/army-aft',
    title: 'Army AFT Calculator | Army Fitness Test Score | KinesoScore',
    description:
      'Estimate Army Fitness Test scores with KinesoScore using published AFT event standards for deadlift, hand-release push-ups, SDC, plank, and 2-mile run.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Army AFT', path: '/army-aft' },
    ],
  },
  'marine-pft': {
    tab: 'marine-pft',
    path: '/marine-pft',
    title: 'Marine Corps PFT Calculator | Military Fitness Test | KinesoScore',
    description:
      'Estimate Marine Corps Physical Fitness Test scores with KinesoScore using published pull-up or push-up, plank, and 3-mile run standards.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Marine Corps PFT', path: '/marine-pft' },
    ],
  },
  'navy-prt': {
    tab: 'navy-prt',
    path: '/navy-prt',
    title: 'Navy PRT Calculator | Physical Readiness Test Score | KinesoScore',
    description:
      'Estimate Navy Physical Readiness Test scores with KinesoScore using published push-up, forearm plank, and 1.5-mile run standards.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Navy PRT', path: '/navy-prt' },
    ],
  },
  about: {
    tab: 'about',
    path: '/about',
    title: 'About KinesoScore | Fitness Performance Analytics Platform',
    description:
      'Learn how KinesoScore helps athletes, fitness enthusiasts, and military personnel measure, compare, and track long-term performance across strength, endurance, and readiness assessments.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },
  dashboard: {
    tab: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard | KinesoScore',
    description: 'Private KinesoScore progress dashboard.',
    robots: 'noindex,nofollow',
    ogType: 'website',
    breadcrumb: null,
  },
  account: {
    tab: 'account',
    path: '/account',
    title: 'Account | KinesoScore',
    description: 'Private KinesoScore account settings.',
    robots: 'noindex,nofollow',
    ogType: 'website',
    breadcrumb: null,
  },
  login: {
    tab: 'login',
    path: '/login',
    title: 'Log In | KinesoScore',
    description: 'Sign in to KinesoScore to save results and track progress.',
    robots: 'noindex,nofollow',
    ogType: 'website',
    breadcrumb: null,
  },
  'reset-password': {
    tab: 'reset-password',
    path: '/reset-password',
    title: 'Reset Password | KinesoScore',
    description: 'Reset your KinesoScore account password.',
    robots: 'noindex,nofollow',
    ogType: 'website',
    breadcrumb: null,
  },
}

/** Paths that should not be indexed. */
export const NOINDEX_PATHS = Object.values(PAGE_SEO)
  .filter((page) => String(page.robots).includes('noindex'))
  .map((page) => page.path)

/** Crawlable public paths for sitemap generation. */
export const PUBLIC_SEO_PAGES = Object.values(PAGE_SEO).filter(
  (page) => !String(page.robots).includes('noindex'),
)

const PATH_INDEX = Object.fromEntries(
  Object.values(PAGE_SEO).map((page) => [page.path, page]),
)

/**
 * Resolve SEO page + render tab from a pathname.
 * `/calculators` renders the Strength calculator (default Calculator hub entry).
 */
export function resolveSeoRoute(pathname) {
  const normalized =
    !pathname || pathname === '/'
      ? '/'
      : pathname.replace(/\/+$/, '') || '/'

  const page = PATH_INDEX[normalized] || PAGE_SEO.home
  const renderTab = page.tab === 'calculators' ? 'strength' : page.tab
  return { page, renderTab, seoId: page.tab }
}

export function pathForTab(tabId) {
  const page = PAGE_SEO[tabId]
  if (page) return page.path
  return PAGE_SEO.home.path
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    description: SITE.description,
    url: absoluteUrl('/'),
    email: BRAND.businessEmail,
    logo: absoluteUrl(SITE.faviconPath),
  }
}

export function buildWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE.name,
    url: absoluteUrl('/'),
    description: SITE.description,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern JavaScript-enabled web browser.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Strength and SBD total calculators',
      'Running performance tracking',
      'BMI calculator',
      'Fitness Age estimation',
      'KinesoScore™ overall fitness performance calculator',
      'Air Force PFRA calculator',
      'Legacy Air Force PFA calculator',
      'Army AFT calculator',
      'Marine Corps PFT calculator',
      'Navy PRT calculator',
    ],
  }
}

export function buildBreadcrumbSchema(breadcrumb) {
  if (!breadcrumb?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumb.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
