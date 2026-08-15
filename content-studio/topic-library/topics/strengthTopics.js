/**
 * Strength / lift / 1RM / SBD topics.
 * Public formulas only (Epley). No proprietary percentile ladders.
 */

/** @type {import('./types.js').Topic[]} */
export const STRENGTH_TOPICS = [
  {
    id: 'one-rm-what-it-is',
    category: 'one_rm',
    title: 'What a one-rep max (1RM) actually is',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'A one-rep max (1RM) is the heaviest load someone can lift for a single complete repetition with accepted technique for that lift. It is a common way to describe maximal strength for a specific exercise such as squat, bench press, or deadlift.',
    key_points: [
      '1RM is lift-specific, not a single whole-body number.',
      'It describes maximal strength capacity for one repetition.',
      'True 1RM testing is different from estimating 1RM from submaximal sets.',
    ],
    avoid_claims: [
      'Do not claim a universal “good” 1RM without bodyweight, sex, age, and lift context.',
      'Do not invent average gym 1RM statistics.',
    ],
    kinesoscore_connection:
      'KinesoScore’s Strength calculator estimates 1RM for bench, squat, and deadlift and can save those results for tracking.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['epley'],
  },
  {
    id: 'epley-estimated-1rm',
    category: 'one_rm',
    title: 'Why estimated 1RM is useful',
    content_type: 'calculator_explanation',
    difficulty: 'beginner',
    factual_context:
      'An estimated 1RM uses a submaximal lift and completed rep count to approximate the maximum weight someone could theoretically lift for one repetition. KinesoScore uses the publicly documented Epley equation: 1RM = weight × (1 + reps / 30). When reps are 1 or fewer, the entered weight is treated as the 1RM (no inflation).',
    key_points: [
      'Estimates let people avoid frequent true max testing.',
      'Epley is a practical, widely used approximation — not a lab measurement.',
      'Higher-rep sets generally produce less precise 1RM estimates than heavier, lower-rep sets.',
    ],
    avoid_claims: [
      'Do not claim Epley is perfectly accurate for every lifter or every lift.',
      'Do not publish proprietary KinesoScore percentile math.',
    ],
    kinesoscore_connection:
      'The Strength tool applies Epley to bench, squat, and deadlift inputs and displays an estimated 1RM.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['epley'],
  },
  {
    id: 'estimated-vs-true-1rm',
    category: 'one_rm',
    title: 'Why a 1RM estimate is not the same as testing a true 1RM',
    content_type: 'misconception',
    difficulty: 'beginner',
    factual_context:
      'A true 1RM is demonstrated by successfully lifting a maximal single. An estimated 1RM is a model-based projection from a submaximal set (for example via Epley). Estimates are useful for programming and progress context, but they can differ from a tested max because of fatigue, technique, psychological arousal, and formula error.',
    key_points: [
      'Estimate ≠ tested max.',
      'Both can be useful if you interpret them correctly.',
      'Consistency of method matters more than chasing a single perfect number.',
    ],
    avoid_claims: [
      'Do not invent typical percentage error rates for Epley unless citing a verified source.',
    ],
    kinesoscore_connection:
      'KinesoScore clearly frames Strength outputs as estimated 1RM values derived from Epley.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['epley'],
  },
  {
    id: 'rep-ranges-and-epley',
    category: 'one_rm',
    title: 'How rep count changes an Epley 1RM estimate',
    content_type: 'educational',
    difficulty: 'intermediate',
    factual_context:
      'In the Epley formula, estimated 1RM = weight × (1 + reps / 30). Holding weight constant, more completed reps raise the estimate. Holding estimated 1RM constant, heavier loads require fewer reps. Very high-rep sets push the formula outside the range where it is usually most useful as a max estimator.',
    key_points: [
      'Reps are part of the estimate, not just the load.',
      'Low-rep heavy sets are typically the better practical input for estimating max strength.',
      'The formula is linear in reps; real fatigue is not perfectly linear.',
    ],
    avoid_claims: [
      'Do not prescribe exact “best” rep ranges as medical or coaching gospel.',
    ],
    kinesoscore_connection:
      'Users enter weight and reps in the Strength calculator; Epley converts that pair into an estimated 1RM.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['epley'],
  },
  {
    id: 'why-track-same-lift',
    category: 'fitness_tracking',
    title: 'Why tracking the same lift over time matters',
    content_type: 'training_concept',
    difficulty: 'beginner',
    factual_context:
      'Strength progress is easiest to interpret when the lift, units, and estimation method stay consistent. Comparing an estimated bench 1RM from last month to this month answers a clearer question than mixing different exercises, bodyweight contexts, or one-off max attempts with no history.',
    key_points: [
      'Same lift + same method = readable trends.',
      'Isolated PRs without history are harder to interpret.',
      'Tracking supports decisions even when day-to-day noise exists.',
    ],
    avoid_claims: [
      'Do not claim tracking alone guarantees improvement.',
    ],
    kinesoscore_connection:
      'KinesoScore can save Bench Press, Squat, and Deadlift estimated 1RMs and chart them on Dashboard / Strength tracks.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'why-track-multiple-lifts',
    category: 'strength',
    title: 'Why tracking multiple lifts can be useful',
    content_type: 'training_concept',
    difficulty: 'beginner',
    factual_context:
      'Bench, squat, and deadlift stress overlapping but different capacities (upper-body pressing, knee-dominant lower-body strength, and hip-dominant pulling). A single lift can improve while another stalls. Tracking all three gives a broader picture of barbell strength than any one lift alone.',
    key_points: [
      'Lifts are related but not interchangeable.',
      'Imbalances in progress can be informative.',
      'Multi-lift history supports an SBD Total view.',
    ],
    avoid_claims: [
      'Do not claim these three lifts are the only lifts that matter.',
    ],
    kinesoscore_connection:
      'KinesoScore tracks Bench Press, Squat, and Deadlift as separate series and can also combine them as SBD Total.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'sbd-total-what-it-tells-you',
    category: 'sbd',
    title: 'What an SBD total tells you',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'An SBD total combines performance in the squat, bench press, and deadlift into a single strength measure (typically the sum of the three 1RMs). It is a useful high-level way to track combined barbell strength, especially for people who train all three lifts.',
    key_points: [
      'SBD = squat + bench + deadlift (as 1RMs).',
      'It summarizes combined strength, not technique quality.',
      'It can hide which individual lift is driving change.',
    ],
    avoid_claims: [
      'Do not invent competitive powerlifting totals or drug-tested meet norms.',
    ],
    kinesoscore_connection:
      'KinesoScore computes and can track SBD Total alongside individual lift 1RMs. myKinesoScore™ prefers SBD Total for the strength side when provided.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['recreational-strength', 'fpc-score'],
  },
  {
    id: 'sbd-vs-single-lift',
    category: 'sbd',
    title: 'SBD Total vs a single-lift strength snapshot',
    content_type: 'comparison',
    difficulty: 'intermediate',
    factual_context:
      'A single-lift estimated 1RM answers “how strong am I on this movement?” An SBD total answers “how does my combined squat/bench/deadlift strength look?” Single-lift views are better for diagnosing a weak link; SBD is better as a broad strength headline when all three lifts are trained.',
    key_points: [
      'Different questions, different metrics.',
      'SBD can dilute a big change in one lift.',
      'Single-lift tracking remains valuable even if you also watch SBD.',
    ],
    avoid_claims: [
      'Do not claim one metric is universally “more accurate.”',
    ],
    kinesoscore_connection:
      'myKinesoScore™ uses SBD Total when available; otherwise it can fall back to a single lift for the strength percentile input.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['fpc-score'],
  },
  {
    id: 'bodyweight-relative-strength',
    category: 'strength',
    title: 'Why bodyweight-relative strength is a useful comparison lens',
    content_type: 'educational',
    difficulty: 'intermediate',
    factual_context:
      'Absolute load (pounds or kilos on the bar) favors heavier athletes on many lifts. Bodyweight-relative strength (load relative to body mass) is a common way to compare recreational lifters of different sizes. KinesoScore’s public strength-percentile framing is bodyweight-relative against recreational gym-goer context — not drug-tested powerlifting meet norms.',
    key_points: [
      'Absolute and relative strength answer different questions.',
      'Recreational norms are not the same as competitive powerlifting standards.',
      'Bodyweight changes can move ratios even if bar weight is unchanged.',
    ],
    avoid_claims: [
      'Do not publish KinesoScore’s internal ratio ladders or percentile tables.',
      'Do not invent “average gym ratio” statistics.',
    ],
    kinesoscore_connection:
      'Strength peer context in KinesoScore is described as bodyweight-relative estimated 1RM (or SBD) vs recreational gym-goer norms.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['recreational-strength', 'strength-level-context'],
  },
  {
    id: 'strength-levels-beginner-to-elite',
    category: 'strength',
    title: 'What “beginner to elite” strength labels usually mean',
    content_type: 'data_interpretation',
    difficulty: 'beginner',
    factual_context:
      'Many recreational strength charts use ladder labels such as beginner, intermediate, advanced, and elite based on bodyweight-relative performance in large gym datasets. These labels are descriptive peer-context bands, not medical diagnoses or competitive titles. KinesoScore cites recreational ladders (for example Strength Level–style datasets and Barbell Medicine recreational guidance) for context.',
    key_points: [
      'Labels are peer context, not identity.',
      'Different charts use different populations.',
      'Moving a band usually takes consistent training over time.',
    ],
    avoid_claims: [
      'Do not invent exact cutoffs from memory.',
      'Do not imply KinesoScore uses powerlifting meet classifications.',
    ],
    kinesoscore_connection:
      'Strength comparison copy in-product references recreational beginner→elite ladders for everyday gym-goers.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['strength-level-context', 'recreational-strength'],
  },
  {
    id: 'age-and-strength-context',
    category: 'strength',
    title: 'Strength and age: why peer context often adjusts for age',
    content_type: 'fitness_fact',
    difficulty: 'intermediate',
    factual_context:
      'Maximal strength often peaks in young adulthood and can decline through midlife on average. Because of that pattern, age-aware strength comparisons can be fairer than comparing every adult to a single young-adult standard. KinesoScore’s Sources & Methodology notes age-band scaling for recreational norms, citing trained-adult aging literature (for example Latella et al., 2024) at a high level.',
    key_points: [
      'Age bands change the peer story, not your absolute bar weight.',
      'Decline patterns are population tendencies, not destiny for an individual.',
      'Training status matters; sedentary and trained curves differ.',
    ],
    avoid_claims: [
      'Do not invent percentage strength loss per decade.',
      'Do not claim KinesoScore’s exact age-scaling coefficients.',
    ],
    kinesoscore_connection:
      'Public methodology notes that recreational strength norms are scaled by age band.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['strength-age-decline'],
  },
  {
    id: 'bench-press-as-strength-signal',
    category: 'bench_press',
    title: 'What bench press performance can tell you',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'The bench press is a common upper-body maximal strength test in recreational gym training. Estimated or tested bench 1RM is useful for tracking pressing strength over time, but it does not by itself describe squat strength, deadlift strength, or endurance.',
    key_points: [
      'Bench is a specific pressing strength signal.',
      'Useful for progress when tracked consistently.',
      'Incomplete as a whole-athlete score on its own.',
    ],
    avoid_claims: [
      'Do not invent “average bench” stats by bodyweight.',
    ],
    kinesoscore_connection:
      'Bench Press is a first-class Strength track and Dashboard metric in KinesoScore.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['epley'],
  },
  {
    id: 'squat-as-strength-signal',
    category: 'squat',
    title: 'What squat performance can tell you',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'The squat is a common lower-body strength benchmark in recreational training. Estimated or tested squat 1RM helps track knee-dominant lower-body strength, but depth, stance, and bar position standards should stay consistent for the history to be meaningful.',
    key_points: [
      'Squat is a major lower-body strength signal.',
      'Standardize how you squat if you want clean trends.',
      'Squat alone is not a complete fitness score.',
    ],
    avoid_claims: [
      'Do not invent depth-standard statistics or average squat ratios.',
    ],
    kinesoscore_connection:
      'Squat is tracked as its own estimated-1RM series in Strength and on the Dashboard.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['epley'],
  },
  {
    id: 'deadlift-as-strength-signal',
    category: 'deadlift',
    title: 'What deadlift performance can tell you',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'The deadlift is a common posterior-chain and whole-body pulling strength benchmark. Estimated or tested deadlift 1RM is useful for tracking pulling strength, but conventional vs sumo and mixed vs hook grip choices should be noted if those change how you interpret progress.',
    key_points: [
      'Deadlift emphasizes hip-dominant pulling strength.',
      'Keep style reasonably consistent for trend reading.',
      'Strong deadlift does not automatically imply strong bench or squat.',
    ],
    avoid_claims: [
      'Do not invent population deadlift averages.',
    ],
    kinesoscore_connection:
      'Deadlift is a tracked Strength lift and appears on public leaderboard examples in content tooling.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['epley'],
  },
  {
    id: 'strength-not-whole-fitness',
    category: 'strength',
    title: 'Why strength alone is not a complete fitness picture',
    content_type: 'misconception',
    difficulty: 'beginner',
    factual_context:
      'Barbell strength is one fitness quality. Cardiorespiratory endurance, work capacity, and other qualities can diverge from 1RM progress. A strong SBD total with poor running performance (or the reverse) is common — which is why multi-domain scoring exists as a separate question.',
    key_points: [
      'Fitness is multi-quality.',
      'Strength PRs can coexist with weak endurance.',
      'Choose metrics that match the question you care about.',
    ],
    avoid_claims: [
      'Do not shame either strength- or endurance-first athletes.',
    ],
    kinesoscore_connection:
      'myKinesoScore™ averages strength and running percentiles so neither domain fully hides the other.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['fpc-score'],
  },
]
