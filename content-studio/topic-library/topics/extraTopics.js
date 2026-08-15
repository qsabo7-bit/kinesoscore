/**
 * Additional grounded topics — tracking nuance, comparisons, and light product literacy.
 */

/** @type {import('../types.js').Topic[]} */
export const EXTRA_TOPICS = [
  {
    id: 'epley-worked-intuition',
    category: 'one_rm',
    title: 'A simple way to think about Epley without memorizing math',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'Epley says estimated 1RM = weight × (1 + reps / 30). Intuitively: every completed rep adds a fraction of the working weight (about 1/30th) to the estimate. A single at a given weight is already the 1RM for that attempt; multiple reps project a higher theoretical max.',
    key_points: [
      'More reps at the same weight → higher estimated max.',
      'A true single does not get inflated.',
      'It is a practical model, not perfect physiology.',
    ],
    avoid_claims: [
      'Do not invent accuracy percentages.',
    ],
    kinesoscore_connection:
      'Strength calculator implements this public Epley equation.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['epley'],
  },
  {
    id: 'bodyweight-change-moves-ratios',
    category: 'strength',
    title: 'Why gaining or losing bodyweight can move strength ratios',
    content_type: 'data_interpretation',
    difficulty: 'intermediate',
    factual_context:
      'Bodyweight-relative strength uses load relative to body mass. If bar weight stays the same while bodyweight rises, the ratio falls; if bodyweight falls, the ratio rises. Absolute strength and relative strength can therefore tell different stories during a cut or bulk.',
    key_points: [
      'Watch both absolute 1RM and bodyweight context.',
      'Ratio changes are not always “stronger/weaker” in absolute terms.',
      'Recreational comparisons often use relative framing.',
    ],
    avoid_claims: [
      'Do not prescribe cutting or bulking.',
    ],
    kinesoscore_connection:
      'Strength peer context in KinesoScore is bodyweight-relative for recreational comparisons.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['recreational-strength'],
  },
  {
    id: 'when-riegel-breaks-down',
    category: 'running',
    title: 'When race-time predictions get shaky',
    content_type: 'misconception',
    difficulty: 'intermediate',
    factual_context:
      'Riegel conversions assume a reasonably similar endurance performance can map across distances with a smooth power-law relationship. Predictions get less trustworthy when the gap between distances is huge, when the athlete is highly specialized (sprinter vs ultra), when courses differ (track vs hilly trail), or when the source effort was not a serious race/time-trial effort.',
    key_points: [
      'Model ≠ guarantee.',
      'Similar conditions help.',
      'Use predictions as planning context, then verify with real races.',
    ],
    avoid_claims: [
      'Do not invent typical error bars without a cited study.',
    ],
    kinesoscore_connection:
      'Running calculator uses Riegel; treat outputs as estimates.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['riegel'],
  },
  {
    id: 'short-vs-long-race-tracking',
    category: 'running',
    title: 'Short races vs long races for frequent progress checks',
    content_type: 'comparison',
    difficulty: 'beginner',
    factual_context:
      'Shorter distances (for example 5K) are generally easier to repeat as fitness checks than half marathons or marathons because recovery cost is lower. Longer races remain valuable goal events, but they are usually poorer choices for weekly measurement cadence.',
    key_points: [
      'Measurement frequency depends on recovery cost.',
      '5K-style checks are common for recreational tracking.',
      'Long races still matter — just not as weekly tests.',
    ],
    avoid_claims: [
      'Do not invent injury rates.',
    ],
    kinesoscore_connection:
      'Estimated 5K is a first-class derived series used for scoring autofill and endurance trends.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'sbd-or-composite-question',
    category: 'performance_measurement',
    title: 'Should you watch SBD Total or myKinesoScore™?',
    content_type: 'performance_question',
    difficulty: 'intermediate',
    factual_context:
      'Watch SBD Total when the question is combined barbell strength. Watch myKinesoScore™ when the question is dual-domain standing across strength and running. Many athletes benefit from watching both: SBD for strength practice quality, composite score for whether endurance is keeping up.',
    key_points: [
      'Different questions → different dashboards.',
      'SBD ignores running on purpose.',
      'Composite score can move when either domain moves.',
    ],
    avoid_claims: [
      'Do not declare one metric morally superior.',
    ],
    kinesoscore_connection:
      'Both SBD Total and myKinesoScore™ are Dashboard/calculator metrics.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['fpc-score'],
  },
  {
    id: 'strength-labels-vs-score-bands',
    category: 'performance_measurement',
    title: 'Strength ladder labels vs myKinesoScore™ bands',
    content_type: 'comparison',
    difficulty: 'intermediate',
    factual_context:
      'Recreational strength tools often use beginner→elite style lift labels based on bodyweight-relative strength. myKinesoScore™ uses its own composite score bands (Building through Elite) based on averaging strength and running percentiles. Same word “Elite” can appear in different systems with different meanings — always check which scale you are on.',
    key_points: [
      'Shared adjectives, different scales.',
      'Lift ladders ≠ composite bands.',
      'Read the metric definition before comparing friends’ screenshots.',
    ],
    avoid_claims: [
      'Do not equate labels across products or charts casually.',
    ],
    kinesoscore_connection:
      'Strength comparisons and myKinesoScore™ bands are separate UI concepts.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['strength-level-context', 'fpc-score'],
  },
  {
    id: 'leaderboard-this-week-utc',
    category: 'product_education',
    title: '“This Week” leaderboards use a defined week boundary',
    content_type: 'product_education',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore leaderboards support period views such as This Week and All Time. Product behavior uses a UTC week boundary for “This Week” style boards. That means local calendar weeks can disagree with the board week depending on time zone — important when interpreting weekly ranks.',
    key_points: [
      'Week boards are time-zone sensitive.',
      'All Time answers a different question than This Week.',
      'Useful for short competitive windows without rewriting history.',
    ],
    avoid_claims: [
      'Do not invent how many athletes appear on boards unless using live data.',
    ],
    kinesoscore_connection:
      'Leaderboard periods and content-studio pulls use this_week / all_time board periods.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'sleep-habits-and-training',
    category: 'habits',
    title: 'Sleep habits show up next to training habits for a reason',
    content_type: 'training_concept',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore’s habit catalog includes both “Sleep 7–8 hours” and “Consistent sleep schedule” alongside exercise. The product treats sleep-related check-ins as general wellness supports for training life — not as medical sleep prescriptions.',
    key_points: [
      'Sleep consistency is tracked as a first-class habit option.',
      'Supportive, not diagnostic.',
      'Pairs naturally with training check-ins.',
    ],
    avoid_claims: [
      'Do not invent required hours for all athletes.',
      'Do not give medical sleep advice.',
    ],
    kinesoscore_connection:
      'HABIT_CATALOG entries sleep_7_8 and sleep_schedule.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'movement-vs-exercise-habit',
    category: 'habits',
    title: 'Exercise sessions vs daily movement are different check-ins',
    content_type: 'fitness_fact',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore separates “Exercise” (a planned training or workout session) from “Walk / get daily movement” (light movement or steps outside structured workouts). That split mirrors a common coaching distinction: hard sessions and everyday movement both matter, and they are not identical behaviors.',
    key_points: [
      'Structured training ≠ steps/movement.',
      'You can check one, both, or neither depending on the day.',
      'Still general wellness tracking, not medical advice.',
    ],
    avoid_claims: [
      'Do not invent step-count requirements.',
    ],
    kinesoscore_connection:
      'HABIT_CATALOG keys exercise and walk_move.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'military-run-distances-differ',
    category: 'military_assessments',
    title: 'Why military run distances differ by service test',
    content_type: 'comparison',
    difficulty: 'beginner',
    factual_context:
      'In KinesoScore’s military calculators, run events differ by battery: Army AFT uses a 2-mile run, Marine PFT a 3-mile run, Navy PRT and legacy Air Force PFA use 1.5-mile runs, and Air Force PFRA includes 2-mile or HAMR-style cardio options. Different tests emphasize different endurance demands — times are not interchangeable across services.',
    key_points: [
      'Do not compare raw run times across different official distances.',
      'Train for the test you actually take.',
      'Product tools are unofficial estimates.',
    ],
    avoid_claims: [
      'Do not assert current policy details without external verification.',
    ],
    kinesoscore_connection:
      'Event lists come from each military calculator’s in-product model.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: true,
    source_ids: [],
  },
  {
    id: 'wod-vs-max-strength',
    category: 'fitness_assessments',
    title: 'Benchmark WODs measure mixed work capacity, not 1RM strength',
    content_type: 'comparison',
    difficulty: 'beginner',
    factual_context:
      'Fran, Murph, and Cindy reward combinations of gymnastics capacity, cycling under fatigue, pacing, and (for Rx) loaded thrusters — not a maximal single squat/bench/deadlift. A strong SBD athlete can post average WOD times, and a strong WOD athlete can have modest 1RMs.',
    key_points: [
      'Different fitness quality.',
      'Use the test that matches the quality you care about.',
      'Both can be tracked in KinesoScore without forcing them into one number.',
    ],
    avoid_claims: [
      'Do not invent correlations between Fran time and deadlift 1RM.',
    ],
    kinesoscore_connection:
      'Fitness Assessments and Strength calculators are separate categories in the registry.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'advanced-read-the-population',
    category: 'performance_measurement',
    title: 'Advanced literacy: always ask “compared to whom?”',
    content_type: 'data_interpretation',
    difficulty: 'advanced',
    factual_context:
      'Percentiles and standards are meaningless without a population. KinesoScore explicitly separates recreational lifter context, race-finisher running context, and ACSM-style VO₂ norms. Treating those as one universal ranking system is a common interpretation error.',
    key_points: [
      'Name the reference population.',
      'Do not mash incompatible charts together.',
      'Composite scores still inherit their component populations.',
    ],
    avoid_claims: [
      'Do not invent cross-population conversion formulas.',
    ],
    kinesoscore_connection:
      'About notes and Sources page call out population caveats for strength, running, and VO₂.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [
      'recreational-strength',
      'runrepeat',
      'vo2-norms',
      'fpc-score',
    ],
  },
]
