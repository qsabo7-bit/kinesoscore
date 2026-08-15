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
    title: 'KinesoScore | Fitness Score & Performance Calculators',
    description:
      'Free fitness score, 1RM, running, VO₂, and military calculators. Track strength and endurance in one place — start with myKinesoScore™.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [{ name: 'Home', path: '/' }],
  },
  /**
   * Calculators hub — index of performance, fitness, and military tools.
   */
  calculators: {
    tab: 'calculators',
    path: '/calculators',
    title: 'Fitness Calculators | Strength, Running & More | KinesoScore',
    description:
      'Free calculators for 1RM, running, VO₂, fitness age, myKinesoScore™, WODs, and military tests. Pick a tool and start tracking.',
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
    title: '1RM Calculator | Bench, Squat & Deadlift | KinesoScore',
    description:
      'Free Epley 1RM calculator for bench, squat, and deadlift. Build an SBD total and track lifting progress with KinesoScore.',
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
    title: 'Running Calculator | Race Times & Pacing | KinesoScore',
    description:
      'Estimate race times, check pacing, and track running progress across common distances. Free running fitness calculator from KinesoScore.',
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
    title: 'myKinesoScore™ Calculator | Strength + Running Score',
    description:
      'Get your overall fitness score from strength and running percentiles. Free myKinesoScore™ calculator — transparent, comparable, and trackable.',
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
    title: 'What Is myKinesoScore™? | Fitness Score Guide',
    description:
      'Learn how a fitness score combines strength and endurance. See how myKinesoScore™ measures overall performance so you can track progress over time.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'What Is myKinesoScore™?', path: '/fitness-score' },
    ],
  },
  'one-rep-max': {
    tab: 'one-rep-max',
    path: '/one-rep-max',
    title: 'One-Rep Max Guide | Epley 1RM Explained | KinesoScore',
    description:
      'What a one-rep max is, how the Epley formula estimates 1RM from weight and reps, and when to use estimates vs a tested max.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Strength', path: '/strength' },
      { name: 'One-Rep Max Guide', path: '/one-rep-max' },
    ],
  },
  'army-aft-guide': {
    tab: 'army-aft-guide',
    path: '/army-aft-guide',
    title: 'Army AFT Explained | Events & Prep Guide | KinesoScore',
    description:
      'Army Fitness Test (AFT) events, scoring estimates, AFT vs ACFT naming, and how to use the free KinesoScore AFT calculator for unofficial training prep.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Army AFT', path: '/army-aft' },
      { name: 'Army AFT Guide', path: '/army-aft-guide' },
    ],
  },
  'air-force-pfra-guide': {
    tab: 'air-force-pfra-guide',
    path: '/air-force-pfra-guide',
    title: 'Air Force PFRA Explained | Prep Guide | KinesoScore',
    description:
      'Air Force PFRA guide: cardio, strength, core, waist-to-height, scoring estimates, and the free KinesoScore PFRA calculator for unofficial training prep.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Air Force PFRA', path: '/air-force-pfra' },
      { name: 'Air Force PFRA Guide', path: '/air-force-pfra-guide' },
    ],
  },
  'marine-pft-guide': {
    tab: 'marine-pft-guide',
    path: '/marine-pft-guide',
    title: 'Marine PFT Explained | Events & Prep Guide | KinesoScore',
    description:
      'Marine Corps PFT guide: pull-ups or push-ups, plank, 3-mile run, scoring estimates, and the free KinesoScore calculator for unofficial training prep.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Marine Corps PFT', path: '/marine-pft' },
      { name: 'Marine PFT Guide', path: '/marine-pft-guide' },
    ],
  },
  'navy-prt-guide': {
    tab: 'navy-prt-guide',
    path: '/navy-prt-guide',
    title: 'Navy PRT Explained | Events & Prep Guide | KinesoScore',
    description:
      'Navy PRT guide: push-ups, forearm plank, 1.5-mile run, scoring estimates, and the free KinesoScore PRT calculator for unofficial training prep.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Navy PRT', path: '/navy-prt' },
      { name: 'Navy PRT Guide', path: '/navy-prt-guide' },
    ],
  },
  'vo2max-guide': {
    tab: 'vo2max-guide',
    path: '/vo2max-guide',
    title: 'VO₂ Max Explained | Cooper & Rockport Guide | KinesoScore',
    description:
      'What VO₂ max is, how Cooper and Rockport field tests estimate it, age/sex norms, and how to use the free KinesoScore VO₂ calculator.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'VO₂ Max', path: '/vo2max' },
      { name: 'VO₂ Max Guide', path: '/vo2max-guide' },
    ],
  },
  vo2max: {
    tab: 'vo2max',
    path: '/vo2max',
    title: 'VO₂ Max Calculator | Cooper & Rockport | KinesoScore',
    description:
      'Estimate VO₂ max with Cooper or Rockport field tests, compare age- and sex-based norms, and track cardiorespiratory fitness on KinesoScore.',
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
    title: 'BMI Calculator | Body Mass Index Tracker | KinesoScore',
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
    title: 'Fitness Age Calculator | VO₂ Max Norms | KinesoScore',
    description:
      'Estimate fitness age from VO₂ max using age- and sex-based norms. Educational tracking only — not medical advice.',
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
    title: 'Air Force PFRA Calculator | Fitness Test | KinesoScore',
    description:
      'Unofficial Air Force PFRA estimates for cardio, strength, core, and waist-to-height. Training prep only — not an official Air Force scorecard.',
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
    title: 'Air Force PFA Calculator | Legacy Assessment | KinesoScore',
    description:
      'Legacy Air Force PFA estimates for 1.5-mile run, push-ups, and sit-ups. Compare with PFRA — educational only, not official testing.',
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
    title: 'Army AFT Calculator | Fitness Test Estimator | KinesoScore',
    description:
      'Unofficial Army AFT estimates for deadlift, HR push-ups, Sprint-Drag-Carry, plank, and 2-mile run. Training prep only — not an official Army scorecard.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Army AFT', path: '/army-aft' },
    ],
  },
  /**
   * High-intent alias for ACFT searches → same Army AFT calculator UI.
   * Canonical stays /army-aft to avoid duplicate ranking.
   */
  acft: {
    tab: 'acft',
    renderTab: 'army-aft',
    path: '/acft',
    canonicalPath: '/army-aft',
    includeInSitemap: false,
    heading: 'ACFT / Army AFT Calculator',
    title: 'ACFT Calculator | Army AFT Estimator | KinesoScore',
    description:
      'Unofficial ACFT / Army AFT estimates for deadlift, HR push-ups, Sprint-Drag-Carry, plank, and 2-mile run. Training prep only — not an official Army scorecard.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Army AFT', path: '/army-aft' },
      { name: 'ACFT Calculator', path: '/acft' },
    ],
  },
  /**
   * High-intent alias for 1RM searches → same Strength calculator UI.
   * Canonical stays /strength.
   */
  '1rm': {
    tab: '1rm',
    renderTab: 'strength',
    path: '/1rm',
    canonicalPath: '/strength',
    includeInSitemap: false,
    heading: '1RM Calculator',
    title: '1RM Calculator | Bench, Squat & Deadlift | KinesoScore',
    description:
      'Free Epley 1RM calculator for bench, squat, and deadlift — plus SBD total. Estimate one-rep max from weight and reps.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Strength', path: '/strength' },
      { name: '1RM Calculator', path: '/1rm' },
    ],
  },
  'marine-pft': {
    tab: 'marine-pft',
    path: '/marine-pft',
    title: 'Marine PFT Calculator | Fitness Test Score | KinesoScore',
    description:
      'Unofficial Marine PFT estimates for pull-ups or push-ups, plank, and 3-mile run. Training prep only — not official USMC testing.',
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
    title: 'Navy PRT Calculator | Readiness Test Score | KinesoScore',
    description:
      'Unofficial Navy PRT estimates for push-ups, forearm plank, and 1.5-mile run. Training prep only — not an official Navy scorecard.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Navy PRT', path: '/navy-prt' },
    ],
  },
  'max-pushups': {
    tab: 'max-pushups',
    path: '/max-pushups',
    title: 'Max Push-ups in 1 Minute Calculator | KinesoScore',
    description:
      'Track max push-ups in 60 seconds, save progress, and optionally share to the KinesoScore leaderboard. Educational capacity test — self-reported results.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Max Push-ups', path: '/max-pushups' },
    ],
  },
  'max-pullups': {
    tab: 'max-pullups',
    path: '/max-pullups',
    title: 'Max Pull-ups in 1 Minute Calculator | KinesoScore',
    description:
      'Track max pull-ups in 60 seconds with private history and optional leaderboard sharing. Educational capacity test — self-reported results.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Max Pull-ups', path: '/max-pullups' },
    ],
  },
  fran: {
    tab: 'fran',
    path: '/fran',
    title: 'Fran WOD Calculator | Thrusters & Pull-ups | KinesoScore',
    description:
      'Log Fran finish times with gender-specific Rx thruster standards. Separate Rx and Scaled tracking — educational use only.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Fran', path: '/fran' },
    ],
  },
  murph: {
    tab: 'murph',
    path: '/murph',
    title: 'Murph WOD Calculator | Finish Time Tracker | KinesoScore',
    description:
      'Log Murph finish times with Rx vest notes. Separate Rx and Scaled boards — educational benchmark tracking, not an official scorecard.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Murph', path: '/murph' },
    ],
  },
  cindy: {
    tab: 'cindy',
    path: '/cindy',
    title: 'Cindy WOD Calculator | 20-Minute AMRAP Tracker | KinesoScore',
    description:
      'Log Cindy AMRAP rounds and reps (5 pull-ups, 10 push-ups, 15 squats). Optional leaderboard sharing — educational use only.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Cindy', path: '/cindy' },
    ],
  },
  'fran-guide': {
    tab: 'fran-guide',
    path: '/fran-guide',
    title: 'What Is Fran? | 21-15-9 Thrusters Explained | KinesoScore',
    description:
      'Fran guide: 21-15-9 thrusters and pull-ups, common Rx loads, and how to track finish times on KinesoScore. Educational use only.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Fran', path: '/fran' },
      { name: 'What is Fran?', path: '/fran-guide' },
    ],
  },
  'murph-guide': {
    tab: 'murph-guide',
    path: '/murph-guide',
    title: 'What Is Murph? | Format, Vest & Partitioning | KinesoScore',
    description:
      'Murph guide: mile, pull-ups, push-ups, squats, mile — plus partitioning, Rx vest notes, and logging finish times on KinesoScore.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Murph', path: '/murph' },
      { name: 'What is Murph?', path: '/murph-guide' },
    ],
  },
  'cindy-guide': {
    tab: 'cindy-guide',
    path: '/cindy-guide',
    title: 'What Is Cindy? | 20-Minute AMRAP Explained | KinesoScore',
    description:
      'Cindy guide: 20-minute AMRAP of pull-ups, push-ups, and air squats — how rounds and leftover reps work, and how to track scores on KinesoScore.',
    robots: 'index,follow',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Calculators', path: '/calculators' },
      { name: 'Cindy', path: '/cindy' },
      { name: 'What is Cindy?', path: '/cindy-guide' },
    ],
  },
  about: {
    tab: 'about',
    path: '/about',
    title: 'About KinesoScore | Science-Informed Fitness Tools',
    description:
      'How KinesoScore uses exercise science for transparent strength, endurance, VO₂, and military calculators — educational tools, not medical advice.',
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
      'Equations, reference norms, and peer-comparison datasets behind KinesoScore strength, running, VO₂, BMR, and fitness score tools.',
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
      'How KinesoScore handles account data, saved results, and authentication for our educational fitness calculators.',
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
      'Terms for using KinesoScore calculators and accounts — estimates only, not medical advice or official military scores.',
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
  groups: {
    tab: 'groups',
    path: '/groups',
    title: 'Groups | KinesoScore',
    description: 'Private KinesoScore Groups — create or join with an invite code.',
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
  signup: {
    tab: 'signup',
    path: '/signup',
    renderTab: 'login',
    title: 'Create Account | KinesoScore',
    description:
      'Create a free KinesoScore account to save results and track progress.',
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
    title: 'Fitness Leaderboard | Opt-In Rankings | KinesoScore',
    description:
      'Compare opt-in fitness scores, strength, running, WODs, and habit streaks. Private saves stay private — share with a Leaderboard Name and profile icon.',
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
      'Opt-in habit streak rankings by Leaderboard Name, profile icon, and current streak — never which habits you track or private check-ins.',
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

/** Crawlable public paths for sitemap generation (canonical URLs only). */
export const PUBLIC_SEO_PAGES = Object.values(PAGE_SEO).filter(
  (page) =>
    !String(page.robots).includes('noindex') && page.includeInSitemap !== false,
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

  // Authenticated Groups: /groups/:groupId and /groups/:groupId/:section
  if (/^\/groups\/[^/]+(?:\/[^/]+)?$/.test(normalized)) {
    const page = PAGE_SEO.groups
    const parts = normalized.split('/').filter(Boolean) // ['groups', id, section?]
    return {
      page,
      renderTab: page.tab,
      seoId: page.tab,
      matched: true,
      groupId: decodeURIComponent(parts[1] || ''),
      groupSection: parts[2] ? decodeURIComponent(parts[2]) : null,
    }
  }

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
      'Max push-ups and max pull-ups capacity tests',
      'Fran, Murph, and Cindy benchmark WOD trackers',
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
