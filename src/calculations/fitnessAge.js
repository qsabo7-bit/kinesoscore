import { getVo2NormPoints } from '../data/vo2Norms.js'

/** Fitness Age estimates are only supported for adults 18+. */
export const MIN_FITNESS_AGE = 18

/** Upper clamp for reported Fitness Age. */
export const MAX_FITNESS_AGE = 90

/**
 * Tunable methodology knobs for the Fitness Age model.
 *
 * Why VO₂ is primary:
 * Cardiorespiratory fitness (VO₂ max) is the strongest, most validated
 * laboratory correlate of “fitness age” / physiological age in adults
 * (e.g. HUNT / World Fitness Age style VO₂–norm inversion). Fitness Age here
 * means: the chronological age of an average person with comparable CRF.
 *
 * Why norm inversion is used for normal / below-average ranges:
 * When VO₂ is at or below the youngest adult median, there exists a real
 * adult age whose ACSM median matches the user. Inverting through those
 * medians is the direct “age of an average peer with your fitness” reading.
 *
 * Why elite values require percentile compression:
 * Above the youngest adult median, no average adult has that VO₂. Linear
 * extrapolation invents child ages (or floors everyone at 18). Instead we
 * place the user on the young-adult percentile curve and map 50th→95th+
 * onto a compressed adult band (≈25→18) with diminishing returns so fit,
 * very fit, and elite stay distinguishable.
 *
 * Why the model avoids pretending adults have VO₂ values equivalent to children:
 * Sub-18 “fitness ages” from slope extrapolation are not meaningful adult
 * comparisons. The elite curve never emits ages below minimumFitnessAge.
 *
 * Why body composition was removed:
 * User-entered body-fat % is often inaccurate, and BMI conflates muscle with
 * adiposity. Neither should move Fitness Age when VO₂ already reflects
 * aerobic capacity independent of scale weight aesthetics.
 *
 * Why running cannot double-count with VO₂:
 * 5K time and VO₂ both estimate the same aerobic trait. If VO₂ is known, 5K
 * is ignored. If VO₂ is missing, 5K is used only to estimate VO₂, then the
 * same inversion runs once.
 */
export const FITNESS_AGE_MODEL = {
  primaryMetric: 'vo2Max',
  vo2Weight: 1.0,
  restingHeartRateNeutralBpm: 58,
  /** bpm per Fitness Age year before clamp */
  restingHeartRateBpmPerYear: 10,
  restingHeartRateAdjustmentMax: 2,
  /** KinesoScore strength percentile (0–100); 50 = neutral */
  strengthNeutralPercentile: 50,
  /** percentile points per Fitness Age year before clamp */
  strengthPercentilePerYear: 25,
  strengthAdjustmentMax: 2,
  /**
   * Fraction of VO₂ max assumed at flat 5K race pace when estimating VO₂
   * from running (ACSM running cost / utilization).
   */
  fiveKVo2Utilization: 0.9,
  /** Youngest adult reference age (ACSM 20–29 band midpoint). */
  eliteAnchorAge: 25,
  /** Percentile at young-adult median → Fitness Age = eliteAnchorAge. */
  eliteCurveStartPercentile: 50,
  /** Percentile at which Fitness Age reaches the adult floor. */
  eliteCurveEndPercentile: 95,
  /** Hard floor for elite compression (and final reported ages). */
  minimumFitnessAge: MIN_FITNESS_AGE,
  /**
   * Shapes percentile→age compression: t = 1 − (1 − u)^factor.
   * factor < 1 softens the early drop above average so 75th≈21–22 and
   * 90th≈19–20 before the floor at 95th+ (universal; not sex-specific).
   */
  eliteDiminishingFactor: 0.85,
}

export const FITNESS_AGE_SOURCE = {
  name: 'KinesoScore Fitness Age model',
  detail:
    'Norm-based Fitness Age for adults 18+: VO₂ at or below the young-adult median is inverted through Cooper Institute / ACSM age–sex medians; above that median, young-adult percentile position is compressed into an adult Fitness Age band (≈25→18) with diminishing returns so elites are not collapsed to a single floor. Small capped modifiers for resting heart rate (±2 yr) and KinesoScore strength percentile (±2 yr). Body fat, BMI, and training frequency are not used. 5K time is used only to estimate VO₂ when VO₂ is missing — never stacked with an entered VO₂. Not a medical diagnosis.',
  url: 'https://www.acsm.org/education-resources/books/guidelines-exercise-testing-prescription',
}

/** Representative ages for ACSM band medians (midpoints of published bands). */
const VO2_MEDIAN_ANCHOR_AGES = [25, 35, 45, 55, 65, 75]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function ratingFromAdjustment(adjustment, goodMax = -1, fairMax = 1.5) {
  if (adjustment <= goodMax) return 'Strong'
  if (adjustment <= fairMax) return 'Average'
  return 'Needs work'
}

/**
 * Blended recreational expected VO₂ max (ml/kg/min) by age.
 * Legacy helper retained for export compatibility — the Fitness Age model
 * uses sex-specific ACSM medians via invertVo2ToFitnessAge instead.
 */
export function expectedVo2ForAge(age) {
  return Math.max(20, 45 - 0.34 * age)
}

/**
 * Approximate recreational 5K finish (seconds) expected at a given age.
 * Legacy helper retained for export compatibility.
 */
export function expectedFiveKSeconds(age) {
  return Math.round(1680 + Math.max(0, age - 25) * 8)
}

/**
 * ACSM 50th-percentile VO₂ (ml/kg/min) for the band containing `age`.
 * @param {'male' | 'female'} gender
 * @param {number} age
 */
export function medianVo2ForAge(gender, age) {
  const norms = getVo2NormPoints(gender, age)
  if (!norms) return null
  const median = norms.points.find((point) => point.percentile === 50)
  return median?.value ?? null
}

/**
 * Estimate VO₂ max from a flat 5K race time using the ACSM running VO₂ cost
 * equation and a fixed race-pace utilization factor.
 *
 * VO₂ cost (ml/kg/min) ≈ 0.2 × speed(m/min) + 3.5
 * VO₂ max ≈ cost / utilization
 *
 * @param {number} fiveKSeconds
 * @returns {number | null}
 */
export function estimateVo2FromFiveK(fiveKSeconds) {
  if (!Number.isFinite(fiveKSeconds) || fiveKSeconds < 12 * 60 || fiveKSeconds > 60 * 60) {
    return null
  }

  const minutes = fiveKSeconds / 60
  const speedMPerMin = 5000 / minutes
  const vo2Cost = 0.2 * speedMPerMin + 3.5
  const vo2Max = vo2Cost / FITNESS_AGE_MODEL.fiveKVo2Utilization

  if (!Number.isFinite(vo2Max) || vo2Max < 10 || vo2Max > 90) return null
  return Math.round(vo2Max * 10) / 10
}

/**
 * Continuous "% outperformed" within an ACSM age–sex percentile curve.
 * @param {number} vo2Max
 * @param {Array<{ value: number, percentile: number }>} points
 */
function continuousPercentile(vo2Max, points) {
  const ordered = [...points].sort((a, b) => a.percentile - b.percentile)
  if (ordered.length === 0) return null

  const lowest = ordered[0]
  const highest = ordered[ordered.length - 1]

  if (vo2Max <= lowest.value) {
    if (lowest.value <= 0) return lowest.percentile
    return (vo2Max / lowest.value) * lowest.percentile
  }

  if (vo2Max >= highest.value) {
    // Cap at the published top percentile — no infinite elite climb.
    return highest.percentile
  }

  for (let i = 0; i < ordered.length - 1; i += 1) {
    const left = ordered[i]
    const right = ordered[i + 1]
    if (vo2Max <= right.value) {
      const span = right.value - left.value || 1
      const t = (vo2Max - left.value) / span
      return left.percentile + t * (right.percentile - left.percentile)
    }
  }

  return highest.percentile
}

/**
 * Map VO₂ above the young-adult median onto a compressed adult Fitness Age.
 * Uses young-adult percentile position with diminishing returns toward the floor.
 *
 * @param {number} vo2Max
 * @param {'male' | 'female'} gender
 * @returns {number | null}
 */
function eliteCompressedFitnessAge(vo2Max, gender) {
  const {
    eliteAnchorAge,
    eliteCurveStartPercentile,
    eliteCurveEndPercentile,
    minimumFitnessAge,
    eliteDiminishingFactor,
  } = FITNESS_AGE_MODEL

  const norms = getVo2NormPoints(gender, eliteAnchorAge)
  if (!norms) return null

  const percentile = continuousPercentile(vo2Max, norms.points)
  if (percentile == null) return null

  if (percentile <= eliteCurveStartPercentile) {
    return eliteAnchorAge
  }

  if (percentile >= eliteCurveEndPercentile) {
    return minimumFitnessAge
  }

  const span = eliteCurveEndPercentile - eliteCurveStartPercentile
  const u = (percentile - eliteCurveStartPercentile) / span
  // Soften early drop (factor < 1) so mid-elite percentiles stay separated.
  const t = 1 - (1 - u) ** eliteDiminishingFactor
  const ageSpan = eliteAnchorAge - minimumFitnessAge
  const fitnessAge = eliteAnchorAge - t * ageSpan

  // Never emit sub-minimum ages from the elite curve (no child-age extrapolation).
  return clamp(fitnessAge, minimumFitnessAge, eliteAnchorAge)
}

/**
 * Invert VO₂ max through age/sex median norms → baseline Fitness Age.
 *
 * At/below the youngest adult median: chronological age whose ACSM median
 * matches the user. Above that median: young-adult percentile compression
 * (see eliteCompressedFitnessAge) — no linear extrapolation into child ages.
 *
 * @param {number} vo2Max
 * @param {'male' | 'female'} gender
 * @returns {number | null} continuous age estimate (≥ minimumFitnessAge)
 */
export function invertVo2ToFitnessAge(vo2Max, gender) {
  if (!Number.isFinite(vo2Max) || vo2Max <= 0) return null
  if (gender !== 'male' && gender !== 'female') return null

  const anchors = []
  for (const age of VO2_MEDIAN_ANCHOR_AGES) {
    const median = medianVo2ForAge(gender, age)
    if (median == null) return null
    anchors.push({ age, vo2: median })
  }

  // Above young-adult median → percentile compression (not linear extrapolation).
  if (vo2Max > anchors[0].vo2) {
    return eliteCompressedFitnessAge(vo2Max, gender)
  }

  if (vo2Max === anchors[0].vo2) {
    return anchors[0].age
  }

  // Lower VO₂ than the oldest band median → older than that anchor.
  const last = anchors.length - 1
  if (vo2Max <= anchors[last].vo2) {
    const slope =
      (anchors[last - 1].vo2 - anchors[last].vo2) /
      (anchors[last].age - anchors[last - 1].age)
    if (slope <= 0) return anchors[last].age
    return clamp(
      anchors[last].age + (anchors[last].vo2 - vo2Max) / slope,
      anchors[last].age,
      MAX_FITNESS_AGE,
    )
  }

  for (let i = 0; i < last; i += 1) {
    const hi = anchors[i]
    const lo = anchors[i + 1]
    if (vo2Max <= hi.vo2 && vo2Max >= lo.vo2) {
      const span = hi.vo2 - lo.vo2
      if (span <= 0) return hi.age
      const t = (hi.vo2 - vo2Max) / span
      return hi.age + t * (lo.age - hi.age)
    }
  }

  return null
}

function restingHrAdjustment(restingHr) {
  if (!Number.isFinite(restingHr) || restingHr < 30 || restingHr > 120) {
    return { applied: false, years: 0 }
  }

  const {
    restingHeartRateNeutralBpm,
    restingHeartRateBpmPerYear,
    restingHeartRateAdjustmentMax,
  } = FITNESS_AGE_MODEL

  const years = clamp(
    (restingHr - restingHeartRateNeutralBpm) / restingHeartRateBpmPerYear,
    -restingHeartRateAdjustmentMax,
    restingHeartRateAdjustmentMax,
  )

  return { applied: true, years }
}

/**
 * Strength modifier from a KinesoScore strength percentile (0–100), not a
 * free-typed self score. Neutral at the 50th percentile; capped at ±2 yr.
 *
 * @param {number | null | undefined} strengthPercentile
 */
function strengthAdjustment(strengthPercentile) {
  if (
    strengthPercentile == null ||
    !Number.isFinite(strengthPercentile) ||
    strengthPercentile < 0 ||
    strengthPercentile > 100
  ) {
    return { applied: false, years: 0 }
  }

  const {
    strengthNeutralPercentile,
    strengthPercentilePerYear,
    strengthAdjustmentMax,
  } = FITNESS_AGE_MODEL

  const years = clamp(
    (strengthNeutralPercentile - strengthPercentile) /
      strengthPercentilePerYear,
    -strengthAdjustmentMax,
    strengthAdjustmentMax,
  )

  return { applied: true, years }
}

/**
 * Estimate Fitness Age from transparent, evidence-oriented inputs.
 *
 * Primary pathway: sex-specific VO₂ max → ACSM median inversion.
 * Optional: resting HR (±2), KinesoScore strength percentile (±2).
 * 5K: VO₂ proxy only when VO₂ is absent.
 *
 * Ignored (accepted for API compatibility, never applied):
 * weight, massUnit, height, heightUnit, weeklySessions, bodyFatPercent.
 *
 * @param {object} input
 * @param {number} input.age - chronological age
 * @param {'male' | 'female'} input.gender
 * @param {number} [input.vo2Max] - ml/kg/min
 * @param {number} [input.restingHr] - bpm
 * @param {number} [input.fiveKSeconds] - used only if vo2Max missing
 * @param {number} [input.strengthScore] - KinesoScore strength percentile 0–100
 * @param {number} [input.weight] - ignored
 * @param {'lb' | 'kg'} [input.massUnit] - ignored
 * @param {number} [input.height] - ignored
 * @param {'in' | 'cm'} [input.heightUnit] - ignored
 * @param {number} [input.weeklySessions] - ignored
 * @param {number} [input.bodyFatPercent] - ignored
 */
export function calculateFitnessAge({
  age,
  gender,
  restingHr,
  vo2Max,
  fiveKSeconds,
  strengthScore,
}) {
  if (
    !Number.isFinite(age) ||
    age < MIN_FITNESS_AGE ||
    age > MAX_FITNESS_AGE ||
    (gender !== 'male' && gender !== 'female')
  ) {
    return null
  }

  let resolvedVo2 = null
  let vo2Source = null

  if (Number.isFinite(vo2Max) && vo2Max >= 10 && vo2Max <= 90) {
    // Entered / measured VO₂ wins — never also apply a 5K aerobic adjustment.
    resolvedVo2 = vo2Max
    vo2Source = 'entered'
  } else if (
    fiveKSeconds != null &&
    Number.isFinite(fiveKSeconds) &&
    fiveKSeconds > 0
  ) {
    resolvedVo2 = estimateVo2FromFiveK(fiveKSeconds)
    vo2Source = resolvedVo2 != null ? 'fiveK' : null
  }

  if (resolvedVo2 == null) return null

  const baselineFitnessAge = invertVo2ToFitnessAge(resolvedVo2, gender)
  if (baselineFitnessAge == null) return null

  const rhr = restingHrAdjustment(restingHr)
  const strength = strengthAdjustment(strengthScore)

  const totalSecondary = rhr.years + strength.years
  const fitnessAge = Math.round(
    clamp(baselineFitnessAge + totalSecondary, MIN_FITNESS_AGE, MAX_FITNESS_AGE),
  )

  const difference = Math.round(age) - fitnessAge
  const medianForChronological = medianVo2ForAge(gender, age)

  let differenceLabel
  if (difference > 0) {
    differenceLabel = `Your fitness age is ${difference} year${difference === 1 ? '' : 's'} younger than your actual age.`
  } else if (difference < 0) {
    const older = Math.abs(difference)
    differenceLabel = `Your fitness age is ${older} year${older === 1 ? '' : 's'} older than your actual age.`
  } else {
    differenceLabel = 'Your fitness age matches your actual age.'
  }

  const vo2DeltaVsMedian =
    medianForChronological != null
      ? Math.round((resolvedVo2 - medianForChronological) * 10) / 10
      : null

  // Category "adjustment" shows contribution relative to chronological age
  // for the VO₂ pillar (baseline − age), plus secondary year deltas.
  const vo2AgeDelta = Math.round((baselineFitnessAge - age) * 10) / 10

  const categories = [
    {
      id: 'cardio',
      title: 'Cardiovascular Fitness',
      rating: ratingFromAdjustment(vo2AgeDelta, -2, 1),
      detail:
        vo2Source === 'fiveK'
          ? `VO₂ max ~${resolvedVo2} ml/kg/min estimated from 5K (ACSM running cost). Average for your sex at age ${age} is ~${medianForChronological ?? '—'} ml/kg/min.`
          : `VO₂ max ${resolvedVo2} ml/kg/min vs ~${medianForChronological ?? '—'} ml/kg/min average for your sex at age ${age}.`,
      adjustment: vo2AgeDelta,
    },
    {
      id: 'rhr',
      title: 'Resting Heart Rate',
      rating: rhr.applied
        ? ratingFromAdjustment(rhr.years, -0.5, 0.5)
        : 'Not provided',
      detail: rhr.applied
        ? `${Math.round(restingHr)} bpm (modifier capped at ±${FITNESS_AGE_MODEL.restingHeartRateAdjustmentMax} yr).`
        : 'Optional resting heart rate refines the estimate slightly.',
      adjustment: rhr.applied
        ? Math.round(rhr.years * 10) / 10
        : null,
    },
    {
      id: 'strength',
      title: 'Strength',
      rating: strength.applied
        ? ratingFromAdjustment(strength.years, -0.5, 0.5)
        : 'Not provided',
      detail: strength.applied
        ? `KinesoScore strength percentile ${Math.round(strengthScore)}/100 (modifier capped at ±${FITNESS_AGE_MODEL.strengthAdjustmentMax} yr).`
        : 'Add a KinesoScore strength result to apply a small strength modifier.',
      adjustment: strength.applied
        ? Math.round(strength.years * 10) / 10
        : null,
    },
  ]

  return {
    actualAge: Math.round(age),
    fitnessAge,
    difference,
    differenceLabel,
    categories,
    baselineFitnessAge: Math.round(baselineFitnessAge * 10) / 10,
    vo2Max: Math.round(resolvedVo2 * 10) / 10,
    vo2Source,
    vo2DeltaVsMedian,
    restingHr: rhr.applied ? Math.round(restingHr) : null,
    model: FITNESS_AGE_MODEL,
    source: FITNESS_AGE_SOURCE,
  }
}
