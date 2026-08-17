/**
 * Rotating site-wide “This Week’s Focus” from UTC ISO week.
 * Client-only season flavor — no new DB.
 */

const FOCI = [
  {
    id: 'hydration',
    title: 'Hydration Week',
    blurb: 'Log water and keep the multiplier climbing.',
    habitKey: 'water',
    tab: 'habits',
  },
  {
    id: 'strength',
    title: 'Strength Week',
    blurb: 'Hit a strength card or save a lift.',
    habitKey: 'strength',
    tab: 'strength',
  },
  {
    id: 'sleep',
    title: 'Sleep Week',
    blurb: 'Protect 7–8 hours and a steady schedule.',
    habitKey: 'sleep_7_8',
    tab: 'habits',
  },
  {
    id: 'cardio',
    title: 'Engine Week',
    blurb: 'Log cardio or save a running time.',
    habitKey: 'exercise',
    tab: 'running',
  },
  {
    id: 'mobility',
    title: 'Mobility Week',
    blurb: 'Stretch, roll, or take a recovery day.',
    habitKey: 'mobility',
    tab: 'habits',
  },
  {
    id: 'nature',
    title: 'Outside Week',
    blurb: 'Connect with nature and put the phone down.',
    habitKey: 'nature',
    tab: 'habits',
  },
  {
    id: 'protein',
    title: 'Fuel Week',
    blurb: 'Hit protein targets that support training.',
    habitKey: 'protein',
    tab: 'habits',
  },
  {
    id: 'score',
    title: 'Score Week',
    blurb: 'Update your myKinesoScore™ and claim a board spot.',
    habitKey: null,
    tab: 'scoring',
  },
]

/**
 * UTC ISO week number (1–53-ish) for stable weekly rotation.
 * @param {Date} [date]
 */
export function utcIsoWeekNumber(date = new Date()) {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  )
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

/**
 * @param {Date} [date]
 */
export function getThisWeekFocus(date = new Date()) {
  const week = utcIsoWeekNumber(date)
  const focus = FOCI[week % FOCI.length]
  return {
    ...focus,
    week,
    label: `This Week’s Focus · ${focus.title}`,
  }
}

/**
 * Soft public title from lifetime habit XP (no habit details).
 * @param {number} lifetimeXp
 */
export function habitXpPublicTitle(lifetimeXp) {
  const xp = Math.max(0, Math.floor(Number(lifetimeXp) || 0))
  if (xp >= 10000) return 'Veteran'
  if (xp >= 5000) return 'Grinder'
  if (xp >= 2000) return 'Consistent'
  if (xp >= 500) return 'Rising'
  if (xp > 0) return 'Starter'
  return null
}
