import { BRAND } from '../data/brand.js'

export const SHARE_SITE_URL = 'https://kinesoscore.com'
export const SHARE_SCORING_URL = 'https://kinesoscore.com/scoring'
/** Official X handle — include in X share captions only. */
export const X_BRAND_HANDLE = '@KinesosScore'

/**
 * Public caption for social apps (no email / private IDs).
 * @param {object | null | undefined} cardData
 * @param {{ title?: string, primary?: string, secondary?: string }} [moment]
 */
export function buildShareCaption(cardData, moment = {}) {
  const { title, primary, secondary } = moment
  const lines = []
  if (cardData?.fitnessScore != null) {
    lines.push(`My ${BRAND.scoreName}: ${cardData.fitnessScore}`)
    if (cardData.strengthScore != null) {
      lines.push(`Strength ${cardData.strengthScore}`)
    }
    if (cardData.runningScore != null) {
      lines.push(`Running ${cardData.runningScore}`)
    }
  } else if (primary) {
    const board = secondary ? ` · ${secondary}` : ''
    lines.push(`${title || 'This Week'}: ${primary}${board}`)
  }
  if (cardData?.athleteName) lines.push(cardData.athleteName)
  lines.push(SHARE_SITE_URL)
  return lines.filter(Boolean).join('\n')
}

/**
 * myKinesoScore share caption — polished CTA to drive site visits.
 * @param {{
 *   fitnessScore?: number | null,
 *   strengthScore?: number | null,
 *   runningScore?: number | null,
 *   band?: string | null,
 * }} [input]
 * @param {{
 *   platform?: 'x' | 'instagram' | 'facebook' | 'generic',
 *   includeUrl?: boolean,
 * }} [opts]
 */
export function buildGuestScoreShareCaption(input = {}, opts = {}) {
  const score = Number(input.fitnessScore)
  const strength = Number(input.strengthScore)
  const running = Number(input.runningScore)
  const band = String(input.band || '').trim()
  const platform = opts.platform || 'generic'
  const includeUrl = opts.includeUrl !== false
  // X always gets @handle; pass includeHandle:true for every network.
  const withHandle = opts.includeHandle === true || platform === 'x'
  const lines = []

  if (Number.isFinite(score)) {
    const bandBit = band ? ` — ${band}` : ''
    lines.push(`Just hit ${Math.round(score)} on ${BRAND.scoreName}${bandBit}.`)
  } else {
    lines.push(`Just scored on ${BRAND.scoreName}.`)
  }

  if (Number.isFinite(strength) && Number.isFinite(running)) {
    lines.push(
      `Strength ${Math.round(strength)} · Running ${Math.round(running)}`,
    )
  }

  lines.push('Try it free — one score for lifting + running.')
  lines.push('What’s yours?')

  if (includeUrl) lines.push(SHARE_SCORING_URL)
  if (withHandle) lines.push(X_BRAND_HANDLE)

  return lines.join('\n')
}

/**
 * Template captions for the external weekly content pack.
 * @param {object} input
 */
export function buildWeeklyCaptions(input = {}) {
  const site = SHARE_SITE_URL
  const score = input.fitnessScore
  const rank = input.rank
  const board = input.boardLabel || 'the boards'
  const name = input.athleteName

  return {
    scoreCuriosity:
      score != null
        ? [
            `${score} ${BRAND.scoreName}`,
            input.strengthScore != null && input.runningScore != null
              ? `Strength ${input.strengthScore} · Running ${input.runningScore}`
              : null,
            'What’s yours?',
            site,
          ]
            .filter(Boolean)
            .join('\n')
        : [
            `Track strength + running in one number — ${BRAND.scoreName}.`,
            'What’s yours?',
            site,
          ].join('\n'),
    rankEnergy:
      rank != null
        ? [
            `#${rank} This Week on ${board}`,
            name ? `${name}` : null,
            'Claim your rank.',
            site,
          ]
            .filter(Boolean)
            .join('\n')
        : [
            'This Week leaderboards reset every Monday 00:00 UTC.',
            'Share a result. Claim your spot.',
            site,
          ].join('\n'),
    badgeFlex: input.badgeLine
      ? [input.badgeLine, 'Earned on KinesoScore.', site].join('\n')
      : [
          'Strength and running medals. One platform.',
          site,
        ].join('\n'),
  }
}
