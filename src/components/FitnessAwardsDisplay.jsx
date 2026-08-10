import { AWARD_LABELS } from '../lib/fitnessAwards'
import {
  CrownEmblem,
  RunningEmblem,
  StrengthEmblem,
} from './awardEmblems'

function ComponentBadge({ kind, tier, score }) {
  const label = AWARD_LABELS[tier]
  const kindLabel = kind === 'strength' ? 'Strength' : 'Running'
  const rounded = Math.round(Number(score))
  const Emblem = kind === 'strength' ? StrengthEmblem : RunningEmblem

  return (
    <div
      className={`fpc-award-badge is-${kind} is-${tier}`}
      aria-label={`${label} ${kindLabel} achievement`}
      title={`${label} ${kindLabel} · ${rounded}`}
    >
      <div className="fpc-award-crest" aria-hidden="true">
        <span className="fpc-award-crest-edge" />
        <span className="fpc-award-crest-face">
          <Emblem />
        </span>
        <span className="fpc-award-crest-facet" />
        <span className="fpc-award-crest-shine" />
        <span className="fpc-award-score">{rounded}</span>
      </div>
      <p className="fpc-award-tier-label">
        {label} {kindLabel}
      </p>
    </div>
  )
}

/**
 * Premium achievement badges around the KinesoScore ring (Stage 9.5).
 *
 * @param {object} props
 * @param {{ running: string | null, strength: string | null, crown: boolean } | null} props.awards
 * @param {number | null | undefined} props.runningScore
 * @param {number | null | undefined} props.strengthScore
 * @param {import('react').ReactNode} props.children
 */
function FitnessAwardsDisplay({
  awards,
  runningScore,
  strengthScore,
  children,
}) {
  const strengthTier = awards?.strength || null
  const runningTier = awards?.running || null
  const showCrown = Boolean(awards?.crown)
  const flankClass =
    strengthTier && runningTier
      ? ' has-flanks'
      : strengthTier
        ? ' has-strength-only'
        : runningTier
          ? ' has-running-only'
          : ''

  return (
    <div
      className={`fpc-award-stage${showCrown ? ' has-crown' : ''}${flankClass}`}
    >
      {showCrown ? (
        <div
          className="fpc-award-badge is-crown is-diamond"
          aria-label="KinesoScore Crown achievement"
          title="KinesoScore Crown — Strength and Running both Diamond"
        >
          <div className="fpc-award-crown" aria-hidden="true">
            <span className="fpc-award-crown-aura" />
            <span className="fpc-award-crown-glyph">
              <CrownEmblem />
            </span>
            <span className="fpc-award-crown-base" />
          </div>
        </div>
      ) : null}

      {strengthTier ? (
        <ComponentBadge
          kind="strength"
          tier={strengthTier}
          score={strengthScore}
        />
      ) : null}

      <div className="fpc-award-stage-core">{children}</div>

      {runningTier ? (
        <ComponentBadge kind="running" tier={runningTier} score={runningScore} />
      ) : null}
    </div>
  )
}

/** Short legend for dashboard / score UI — thresholds are display-only copy. */
export function FitnessAwardsLegend({ awards = null }) {
  const show =
    Boolean(awards?.strength) ||
    Boolean(awards?.running) ||
    Boolean(awards?.crown)
  if (!show) return null

  return (
    <p className="calc-hint fpc-award-legend">
      Awards track Strength and Running components separately: Bronze 50+,
      Silver 65+, Gold 80+, Diamond 90+. Crown when both reach Diamond.
    </p>
  )
}

export default FitnessAwardsDisplay
