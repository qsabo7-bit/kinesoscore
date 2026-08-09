import { BRAND } from './brand.js'

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
  const env =
    typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env
      : undefined
  const fromEnv = String(env?.VITE_SITE_URL || '')
    .trim()
    .replace(/\/$/, '')
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
    title: 'KinesoScore | Fitness Score, Strength, Running & Military Calculators',
    description:
      'KinesoScore is a comprehensive fitness performance platform combining strength, endurance, military fitness standards, and cardiovascular fitness tracking — including 1RM, VO₂ max, fitness age, Army AFT, Marine PFT, Navy PRT, and Air Force PFRA tools.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [{ name: 'Home', path: '/' }],
  },
  /**
   * Calculators hub — index of all performance and military tools.
   */
  calculators: {
    tab: 'calculators',
    path: '/calculators',
    title: 'Fitness Calculators | 1RM, Running, VO₂, Military Tests | KinesoScore',
    description:
      'Free fitness calculators for bench/squat/deadlift 1RM, SBD total, running performance, VO₂ max, fitness age, myKinesoScore™, and military tests including Army AFT, Marine PFT, Navy PRT, and Air Force PFRA.',
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
    title: '1RM Calculator | Bench, Squat, Deadlift & SBD Total | KinesoScore',
    description:
      'Free strength and 1RM calculator using the Epley formula for bench press, squat, and deadlift. Build an SBD total and track lifting progress with KinesoScore.',
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
    title: 'Running Fitness Calculator | Race Times & Benchmarks | KinesoScore',
    description:
      'Analyze running fitness with race-time predictions, pacing context, and progression tracking. Benchmark endurance performance across common distances with KinesoScore.',
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
    title: 'myKinesoScore™ Calculator | Overall Fitness Score from Strength & Running',
    description:
      'Calculate your myKinesoScore™ — a transparent fitness score that averages recreational strength and running percentiles so you can compare overall performance in one number.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'myKinesoScore™', path: '/scoring' },
    ],
  },
  'fitness-score': {
    tab: 'fitness-score',
    path: '/fitness-score',
    title: 'What Is myKinesoScore™? Understanding Fitness Scores',
    description:
      'Learn what a fitness score is, why strength and endurance matter together, and how myKinesoScore™ measures overall fitness performance for tracking progress over time.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'What Is myKinesoScore™?', path: '/fitness-score' },
    ],
  },
  vo2max: {
    tab: 'vo2max',
    path: '/vo2max',
    title: 'VO₂ Max Calculator | Cooper & Rockport Fitness Test | KinesoScore',
    description:
      'Estimate VO₂ max with Cooper 12-minute run or Rockport 1-mile walk tests, compare with age- and sex-based norms, and track cardiorespiratory fitness on KinesoScore.',
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
      'Estimate basal metabolic rate and daily calorie needs (TDEE) with the Mifflin–St Jeor equation using the free KinesoScore BMR calculator.',
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
    title: 'BMI Calculator | Body Mass Index Category Tracker | KinesoScore',
    description:
      'Calculate body mass index, see standard category guidance, and track BMI trends with the free KinesoScore BMI calculator.',
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
    title: 'Fitness Age Calculator | VO₂ Max Age & Sex Norms | KinesoScore',
    description:
      'Estimate fitness age from VO₂ max using age- and sex-based cardiorespiratory norms. See how aerobic fitness compares with adult reference values — educational only, not medical advice.',
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
    title: 'Air Force PFRA Calculator | Military Fitness Test Score | KinesoScore',
    description:
      'Free Air Force PFRA calculator for unofficial cardio, strength, core, and waist-to-height score estimates. Training feedback and test prep only — not an official Air Force scorecard.',
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
    title: 'Air Force PFA Calculator | Legacy Fitness Assessment | KinesoScore',
    description:
      'Legacy Air Force PFA calculator for historical 1.5-mile run, push-up, and sit-up style estimates. Compare with current PFRA — educational tracking only, not official testing.',
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
    title: 'Army AFT Calculator | Army Fitness Test Score Estimator | KinesoScore',
    description:
      'Free Army AFT calculator for unofficial deadlift, hand-release push-ups, Sprint-Drag-Carry, plank, and 2-mile run estimates. Clarifies AFT vs older ACFT search terms for training prep — not an official Army scorecard.',
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
    title: 'Marine PFT Calculator | Marine Corps Fitness Test Score | KinesoScore',
    description:
      'Free Marine Corps PFT calculator with unofficial pull-up or push-up, forearm plank, and 3-mile run estimates. Training feedback for Marines and candidates — not official USMC testing.',
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
      'Free Navy PRT calculator with unofficial push-up, forearm plank, and 1.5-mile run estimates for readiness prep and progress tracking — not an official Navy scorecard.',
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
    title: 'About KinesoScore | Exercise Science–Informed Fitness Platform',
    description:
      'Learn how KinesoScore applies kinesiology and human performance principles to transparent strength, endurance, VO₂ fitness age, and military fitness calculators — educational tools, not medical advice.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
  },
  'sources-methodology': {
    tab: 'sources-methodology',
    path: '/sources-methodology',
    title: 'Sources & Methodology | KinesoScore',
    description:
      'Published equations, reference norms, and peer-comparison datasets behind KinesoScore strength, running, VO₂, BMR, and overall fitness calculators.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Sources & Methodology', path: '/sources-methodology' },
    ],
  },
  privacy: {
    tab: 'privacy',
    path: '/privacy',
    title: 'Privacy Policy | KinesoScore',
    description:
      'KinesoScore Privacy Policy — how we handle account data, saved fitness results, and Supabase authentication for our educational fitness calculators.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
  },
  terms: {
    tab: 'terms',
    path: '/terms',
    title: 'Terms of Service | KinesoScore',
    description:
      'KinesoScore Terms of Service — educational fitness calculators, account use, and important limits: estimates only, not medical advice or official military scores.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Service', path: '/terms' },
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
  habits: {
    tab: 'habits',
    path: '/habits',
    title: 'Habits | KinesoScore',
    description: 'Private KinesoScore Habits tracker and daily routine checklist.',
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
  leaderboard: {
    tab: 'leaderboard',
    path: '/leaderboard',
    title: 'KinesoScore Leaderboard | Global Fitness Rankings',
    description:
      'Compare publicly shared KinesoScore, running, strength, assessment, and habit-streak results on the KinesoScore leaderboard. Rankings include only athletes who opt in with a Leaderboard Name — private saves stay private.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Leaderboard', path: '/leaderboard' },
    ],
  },
  /** Deep link into the Habits tab on the main Leaderboard page. */
  'leaderboard-habits': {
    tab: 'leaderboard-habits',
    path: '/leaderboard/habits',
    title: 'Habit Streak Leaderboard | KinesoScore',
    description:
      'See publicly shared habit streaks on the KinesoScore Leaderboard Habits tab. Opt-in athletes appear by Leaderboard Name and current streak only — never individual habits or private check-ins.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Leaderboard', path: '/leaderboard' },
      { name: 'Habit Streaks', path: '/leaderboard/habits' },
    ],
  },
  'not-found': {
    tab: 'not-found',
    path: '/404',
    title: 'Page Not Found | KinesoScore',
    description: 'That KinesoScore page could not be found.',
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
 * `/calculators` is the Calculators hub (individual tools keep their own paths).
 * Unknown paths resolve to the not-found tab (no silent home rewrite).
 */
export function resolveSeoRoute(pathname) {
  const normalized =
    !pathname || pathname === '/'
      ? '/'
      : pathname.replace(/\/+$/, '') || '/'

  const page = PATH_INDEX[normalized]
  if (page) {
    return { page, renderTab: page.tab, seoId: page.tab, matched: true }
  }
  const fallback = PAGE_SEO['not-found']
  return {
    page: fallback,
    renderTab: fallback.tab,
    seoId: fallback.tab,
    matched: false,
  }
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
      '1RM strength calculator for bench press, squat, and deadlift',
      'SBD total tracking',
      'Running fitness and race performance calculator',
      'VO₂ max Cooper and Rockport calculators',
      'VO₂-based fitness age calculator',
      'BMI and BMR calculators',
      'myKinesoScore™ overall fitness score calculator',
      'Army AFT calculator',
      'Marine Corps PFT calculator',
      'Navy PRT calculator',
      'Air Force PFRA and legacy PFA calculators',
      'Opt-in global leaderboards for shared fitness results',
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

/**
 * FAQPage JSON-LD for organic search rich results.
 * @param {Array<{ question: string, answer: string }> | null | undefined} faqs
 */
export function buildFaqSchema(faqs) {
  if (!faqs?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
