import { AWARD_LABELS } from '../lib/fitnessAwards'
import {
  CrownEmblem,
  RunningEmblem,
  StrengthEmblem,
} from './awardEmblems'

function CompactCrestBadge({ kind, tier, label }) {
  const Emblem = kind === 'strength' ? StrengthEmblem : RunningEmblem
  return (
    <span
      className={`fpc-award-badge public-award-icon is-${kind} is-${tier}`}
      title={label}
      aria-hidden="true"
    >
      <span className="fpc-award-crest">
        <span className="fpc-award-crest-edge" />
        <span className="fpc-award-crest-face">
          <Emblem />
        </span>
        <span className="fpc-award-crest-facet" />
        <span className="fpc-award-crest-shine" />
      </span>
    </span>
  )
}

function CompactCrownBadge() {
  return (
    <span
      className="fpc-award-badge public-award-icon is-crown is-diamond"
      title="KinesoScore Crown"
      aria-hidden="true"
    >
      <span className="fpc-award-crown">
        <span className="fpc-award-crown-aura" />
        <span className="fpc-award-crown-glyph">
          <CrownEmblem />
        </span>
      </span>
    </span>
  )
}

/**
 * Compact public identity badges next to a Leaderboard Name.
 * Same crest/crown artwork as dashboard awards — no score numbers.
 *
 * @param {{
 *   awards: { running?: string | null, strength?: string | null, crown?: boolean } | null,
 *   className?: string,
 * }} props
 */
function PublicAwardBadges({ awards, className = '' }) {
  if (!awards) return null
  const { running, strength, crown } = awards
  if (!running && !strength && !crown) return null

  const parts = []
  if (crown) parts.push('Crown')
  if (strength) parts.push(`${AWARD_LABELS[strength]} Strength`)
  if (running) parts.push(`${AWARD_LABELS[running]} Running`)
  const aria = parts.join(', ')

  return (
    <span
      className={`public-award-badges${className ? ` ${className}` : ''}`}
      aria-label={aria}
      title={aria}
    >
      {crown ? <CompactCrownBadge /> : null}
      {strength ? (
        <CompactCrestBadge
          kind="strength"
          tier={strength}
          label={`${AWARD_LABELS[strength]} Strength`}
        />
      ) : null}
      {running ? (
        <CompactCrestBadge
          kind="running"
          tier={running}
          label={`${AWARD_LABELS[running]} Running`}
        />
      ) : null}
    </span>
  )
}

export default PublicAwardBadges
