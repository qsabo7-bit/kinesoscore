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
   * Calculators hub — index of performance, fitness, and military tools.
   */
  calculators: {
    tab: 'calculators',
    path: '/calculators',
    title: 'Fitness Calculators | 1RM, Running, VO₂, WODs, Military Tests | KinesoScore',
    description:
      'Free fitness calculators for bench/squat/deadlift 1RM, SBD total, running performance, VO₂ max, fitness age, myKinesoScore™, fitness assessments (Fran, Murph, Cindy, max push-ups/pull-ups), and military tests including Army AFT, Marine PFT, Navy PRT, and Air Force PFRA.',
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
  'one-rep-max': {
    tab: 'one-rep-max',
    path: '/one-rep-max',
    title: 'One-Rep Max Explained | Epley 1RM Formula Guide | KinesoScore',
    description:
      'Learn what a one-rep max (1RM) is, how the Epley formula estimates 1RM from weight and reps, and when to use estimates vs a tested max — then calculate bench, squat, deadlift, and SBD total on KinesoScore.',
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
    title: 'Army AFT Explained | Events, Scoring & Prep Guide | KinesoScore',
    description:
      'A plain-language guide to the Army Fitness Test (AFT): events, how scoring estimates work, AFT vs ACFT naming, and how to use the free KinesoScore AFT calculator for unofficial training prep.',
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
    title: 'Air Force PFRA Explained | Components, Scoring & Prep | KinesoScore',
    description:
      'Plain-language Air Force PFRA guide: cardio, strength, core, waist-to-height ratio, how scoring estimates work, and how to use the free KinesoScore PFRA calculator for unofficial training prep.',
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
    title: 'Marine Corps PFT Explained | Events, Scoring & Prep | KinesoScore',
    description:
      'Plain-language Marine Corps PFT guide: pull-ups or push-ups, plank, 3-mile run, how scoring estimates work, and how to use the free KinesoScore Marine PFT calculator for unofficial training prep.',
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
    title: 'Navy PRT Explained | Events, Scoring & Prep Guide | KinesoScore',
    description:
      'Plain-language Navy PRT guide: push-ups, forearm plank, 1.5-mile run, how scoring estimates work, and how to use the free KinesoScore Navy PRT calculator for unofficial training prep.',
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
    title: 'VO₂ Max Explained | Cooper, Rockport & Norms Guide | KinesoScore',
    description:
      'Learn what VO₂ max is, how Cooper and Rockport field tests estimate it, what a good VO₂ max looks like by age and sex, and how to use the free KinesoScore VO₂ calculator.',
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
    title: 'ACFT Calculator | Army Combat Fitness Test & AFT Estimator | KinesoScore',
    description:
      'Free ACFT / Army AFT calculator for unofficial deadlift, hand-release push-ups, Sprint-Drag-Carry, plank, and 2-mile run estimates. Educational training prep — not an official Army scorecard.',
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
    title: '1RM Calculator | Bench, Squat, Deadlift One-Rep Max | KinesoScore',
    description:
      'Free 1RM calculator using the Epley formula for bench press, squat, and deadlift — plus SBD total tracking. Estimate one-rep max from weight and reps on KinesoScore.',
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
    title: 'Fran WOD Calculator | Thrusters & Pull-ups For Time | KinesoScore',
    description:
      'Log Fran finish times with gender-specific Rx thruster standards. Separate Rx and Scaled tracking for fair progress and leaderboard comparisons. Educational use only.',
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
    title: 'Murph WOD Calculator | Murph Finish Time Tracker | KinesoScore',
    description:
      'Log Murph finish times with Rx vest notes by gender. Separate Rx and Scaled boards for fair comparisons. Educational benchmark tracking — not an official event scorecard.',
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
      'Log Cindy AMRAP rounds and reps (5 pull-ups, 10 push-ups, 15 squats). Rank by total work reps with optional leaderboard sharing. Educational use only.',
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
    title: 'What Is Fran? | Thrusters, 21-15-9 & Rx Explained | KinesoScore',
    description:
      'Plain-language Fran guide: 21-15-9 thrusters and pull-ups, what a thruster is, common Rx loads, and how to track finish times on KinesoScore. Educational use only.',
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
    title: 'What Is Murph? | Format, Vest & Partitioning Guide | KinesoScore',
    description:
      'Plain-language Murph guide: mile, pull-ups, push-ups, squats, mile — plus partitioning, Rx vest notes, and how to log finish times on KinesoScore. Educational use only.',
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
      'Plain-language Cindy guide: 20-minute AMRAP of pull-ups, push-ups, and air squats — how rounds and leftover reps work, and how to track scores on KinesoScore. Educational use only.',
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
