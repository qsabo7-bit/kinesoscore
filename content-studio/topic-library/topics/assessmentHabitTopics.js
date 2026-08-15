/**
 * Fitness assessments, military assessments, habits, and related training topics.
 */

/** @type {import('../types.js').Topic[]} */
export const ASSESSMENT_HABIT_TOPICS = [
  {
    id: 'max-pushups-capacity',
    category: 'fitness_assessments',
    title: 'What a max push-ups test measures',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore’s Max Push-ups assessment tracks maximum push-ups completed in one minute with chest-to-deck and full-lockout standards described in-product. It is a muscular endurance / capacity test for a specific movement — not a 1RM strength test and not automatically a military scorecard.',
    key_points: [
      'Time-capped capacity (60 seconds).',
      'Movement standards matter for comparability.',
      'Different from barbell bench 1RM.',
    ],
    avoid_claims: [
      'Do not invent “good” rep counts by age/sex without a cited standard.',
      'Do not equate this product test with a specific service’s official chart unless clearly labeled and sourced.',
    ],
    kinesoscore_connection:
      'Max Push-ups is a Fitness Assessments calculator with its own track and optional leaderboard share.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'max-pullups-capacity',
    category: 'fitness_assessments',
    title: 'What a max pull-ups test measures',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore’s Max Pull-ups assessment tracks maximum pull-ups in one minute with chin-over-bar standards noted in-product, including awareness that strict vs kipping styles change what the number means. It measures hanging pulling capacity under a time cap.',
    key_points: [
      'Style consistency matters (strict vs kipping).',
      '60-second capacity test, not a single max-weighted pull-up.',
      'Useful for tracking upper-body pulling endurance.',
    ],
    avoid_claims: [
      'Do not invent population averages for pull-up counts.',
    ],
    kinesoscore_connection:
      'Max Pull-ups is a dedicated Fitness Assessments tool with history tracking.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'fran-benchmark',
    category: 'fitness_assessments',
    title: 'What Fran is (and why people benchmark it)',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'Fran is a for-time benchmark workout of 21-15-9 thrusters and pull-ups. KinesoScore’s Fran calculator notes common Rx loads (often described as 95 lb / 65 lb) and supports Rx vs Scaled tracking. It is educational and not affiliated with CrossFit, Inc.',
    key_points: [
      'Couplet: thrusters + pull-ups in 21-15-9.',
      'Rx vs Scaled should not be mixed when comparing times.',
      'Benchmarking works when standards stay consistent.',
    ],
    avoid_claims: [
      'Do not invent “elite Fran times” or competitive cutoffs without a verified source.',
      'Do not imply CrossFit affiliation.',
    ],
    kinesoscore_connection:
      'Fran calculator + guide exist; Rx and Scaled are separate tracks.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'murph-benchmark',
    category: 'fitness_assessments',
    title: 'What Murph is',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'Murph is a for-time benchmark: 1-mile run, 100 pull-ups, 200 push-ups, 300 air squats, 1-mile run. Partitioning is commonly allowed. KinesoScore notes vest Rx loads often described as 20 lb / 14 lb and supports Rx vs Scaled tracking. Educational use only; not affiliated with CrossFit, Inc.',
    key_points: [
      'Long mixed-modal benchmark with bookend runs.',
      'Partitioning changes strategy but should be noted for comparisons.',
      'Rx vest vs scaled changes the meaning of the time.',
    ],
    avoid_claims: [
      'Do not invent memorial or competitive time standards.',
      'Do not imply official affiliation.',
    ],
    kinesoscore_connection:
      'Murph calculator + guide with Rx/Scaled tracks.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'cindy-amrap',
    category: 'fitness_assessments',
    title: 'What Cindy measures (20-minute AMRAP)',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'Cindy is a 20-minute AMRAP of 5 pull-ups, 10 push-ups, and 15 air squats. KinesoScore ranks performance using rounds and leftover reps (product description: rounds×30 + extras). Higher rounds+reps is better. Educational; not affiliated with CrossFit, Inc.',
    key_points: [
      'AMRAP = as many rounds/reps as possible in fixed time.',
      'Consistent movement standards keep scores comparable.',
      'Different scoring than for-time workouts like Fran.',
    ],
    avoid_claims: [
      'Do not invent average Cindy round counts.',
    ],
    kinesoscore_connection:
      'Cindy calculator + guide with rounds/reps tracking.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'rx-vs-scaled',
    category: 'fitness_assessments',
    title: 'Why Rx and Scaled results should not be mixed',
    content_type: 'misconception',
    difficulty: 'beginner',
    factual_context:
      'Rx and Scaled versions of benchmark workouts use different loads or standards. A faster Scaled time is not automatically “better” than a slower Rx time — they answer different questions. KinesoScore stores Fran and Murph Rx vs Scaled as separate tracks for that reason.',
    key_points: [
      'Different standards → different leaderboards.',
      'Progress can mean moving toward Rx or improving within a standard.',
      'Honesty about standards keeps comparisons fair.',
    ],
    avoid_claims: [
      'Do not shame Scaled performances.',
    ],
    kinesoscore_connection:
      'Separate Rx/Scaled exercise names/tracks in Fran and Murph.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'army-aft-events',
    category: 'military_assessments',
    title: 'Army AFT: what events are in the model',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore’s Army AFT calculator provides unofficial educational score estimates for the Army Fitness Test event set described in-product: 3-rep deadlift, hand-release push-ups, sprint-drag-carry, plank, and 2-mile run. It is not an official scorecard. Combat/alternate events are not scored in the product model.',
    key_points: [
      'Multi-event readiness-style battery.',
      'Unofficial estimate for training feedback.',
      'Know which events are included vs excluded in-app.',
    ],
    avoid_claims: [
      'Do not present results as official Army scores.',
      'Do not republish proprietary encoded charts as “the official table.”',
      'Do not invent pass rates.',
    ],
    kinesoscore_connection:
      'Army AFT calculator + guide; also reachable via ACFT-style URL aliases in the product.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: true,
    source_ids: [],
  },
  {
    id: 'air-force-pfra-overview',
    category: 'military_assessments',
    title: 'Air Force PFRA: high-level components',
    content_type: 'educational',
    difficulty: 'intermediate',
    factual_context:
      'KinesoScore’s Air Force PFRA calculator is an unofficial readiness estimate covering cardiorespiratory, body composition (WHtR), strength, and core components with event choices described in-product (for example push-ups or HR push-ups; sit-ups/crunch/plank options; 2-mile or 20m HAMR). It is educational training feedback, not an official scorecard.',
    key_points: [
      'Multi-component model with event choices.',
      'Includes WHtR-style body composition component in-product.',
      'Unofficial / educational framing is required in content.',
    ],
    avoid_claims: [
      'Do not claim official USAF validity.',
      'Do not invent scoring weights beyond what is explicitly public in product SOURCE strings if quoting numbers.',
    ],
    kinesoscore_connection:
      'Air Force PFRA calculator marked NEW in the registry; guide available.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: true,
    source_ids: [],
  },
  {
    id: 'legacy-air-force-pfa',
    category: 'military_assessments',
    title: 'Legacy Air Force PFA vs newer PFRA tooling',
    content_type: 'comparison',
    difficulty: 'intermediate',
    factual_context:
      'KinesoScore still offers a Legacy Air Force PFA calculator for historical fitness assessment estimates (product description references 1.5-mile run, push-ups, and sit-ups style testing). PFRA is the newer readiness-oriented tool in the product line. Content should not confuse legacy PFA with current official policy without an external verification step.',
    key_points: [
      'Legacy tool exists for historical estimates.',
      'PFRA is the newer in-app readiness calculator.',
      'Policy changes — verify externally before asserting current requirements.',
    ],
    avoid_claims: [
      'Do not assert current Air Force policy from the legacy calculator alone.',
    ],
    kinesoscore_connection:
      'Both air-force-pfa (Legacy) and air-force-pfra calculators exist.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: true,
    source_ids: [],
  },
  {
    id: 'marine-pft-events',
    category: 'military_assessments',
    title: 'Marine Corps PFT event overview',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore’s Marine PFT calculator estimates pull-ups or push-ups, forearm plank, and 3-mile run performance in an unofficial educational model. Product framing includes pass-oriented guidance at a high level; results are not official USMC scores.',
    key_points: [
      'Pull-ups or push-ups + plank + 3-mile run.',
      'Unofficial estimate only.',
      'Event choice (pull-ups vs push-ups) changes the profile.',
    ],
    avoid_claims: [
      'Do not present as official PFT scoring.',
      'Verify current USMC standards externally before policy claims.',
    ],
    kinesoscore_connection:
      'Marine PFT calculator + guide in Military Assessments.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: true,
    source_ids: [],
  },
  {
    id: 'navy-prt-events',
    category: 'military_assessments',
    title: 'Navy PRT event overview',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore’s Navy PRT calculator provides unofficial educational estimates for push-ups, forearm plank, and 1.5-mile run readiness-style scoring. It is training feedback, not an official Navy scorecard.',
    key_points: [
      'Push-ups, plank, 1.5-mile run.',
      'Unofficial / educational.',
      'Useful for practice testing, not paperwork.',
    ],
    avoid_claims: [
      'Do not claim official PRT validity.',
      'Verify current Navy standards externally before policy claims.',
    ],
    kinesoscore_connection:
      'Navy PRT calculator + guide in Military Assessments.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: true,
    source_ids: [],
  },
  {
    id: 'military-calculators-unofficial',
    category: 'military_assessments',
    title: 'Why military calculators should stay labeled unofficial',
    content_type: 'product_education',
    difficulty: 'beginner',
    factual_context:
      'Service fitness tests change, and official scoring belongs to the services. KinesoScore’s military tools are built as unofficial educational estimates for training feedback. Responsible content always keeps that disclaimer visible and avoids sounding like an orders-producing scorecard.',
    key_points: [
      'Educational estimate ≠ official result.',
      'Policies change — verify before absolute claims.',
      'Useful for practice and readiness awareness.',
    ],
    avoid_claims: [
      'No “guaranteed pass” marketing.',
      'No pretending to be an official service tool.',
    ],
    kinesoscore_connection:
      'All military calculator descriptions emphasize unofficial estimates / training feedback.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'habits-support-training',
    category: 'habits',
    title: 'Why simple habit check-ins support training',
    content_type: 'training_concept',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore’s Habits feature offers a small catalog of general wellness habits (sleep 7–8 hours, protein, water, exercise, walk/movement, stretch/mobility, rest/recovery day, limit screens before bed, consistent sleep schedule). Check-ins are a consistency aid — explicitly not medical advice.',
    key_points: [
      'Small, repeatable behaviors compound.',
      'Habits are supportive, not a replacement for programmed training.',
      'Not medical advice.',
    ],
    avoid_claims: [
      'Do not invent clinical outcomes from habit streaks.',
      'Do not prescribe sleep/protein amounts as medical guidance.',
    ],
    kinesoscore_connection:
      'Habits page + Dashboard habits strip; catalog defined in habitCatalog.js.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'rest-day-is-a-habit',
    category: 'habits',
    title: 'Rest days can be tracked on purpose',
    content_type: 'fitness_fact',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore’s habit catalog includes “Take a rest/recovery day” as an intentional check-in. Recovery is part of training systems, not merely the absence of work. Tracking rest can reduce the false idea that only hard sessions “count.”',
    key_points: [
      'Recovery can be planned.',
      'Rest check-ins fight all-or-nothing thinking.',
      'Still not medical advice.',
    ],
    avoid_claims: [
      'Do not invent optimal rest-day frequencies for all athletes.',
    ],
    kinesoscore_connection:
      'recovery_day exists in HABIT_CATALOG.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'habit-streaks-privacy',
    category: 'habits',
    title: 'Habit streaks can be shared without exposing every habit',
    content_type: 'product_education',
    difficulty: 'beginner',
    factual_context:
      'Optional Habit Streak sharing on KinesoScore leaderboards shows leaderboard name and streak information without revealing which specific habits were completed. That privacy model lets people share consistency without publishing personal routine details.',
    key_points: [
      'Streak share ≠ full habit diary share.',
      'Opt-in social proof with limited disclosure.',
      'Private check-ins remain the default workflow.',
    ],
    avoid_claims: [
      'Do not invent streak-length averages.',
    ],
    kinesoscore_connection:
      'Leaderboard Habit Streaks boards; product privacy notes in leaderboard/habits UX.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'consistency-beats-novelty',
    category: 'training_concepts',
    title: 'Consistency usually beats constant novelty for measurable progress',
    content_type: 'training_concept',
    difficulty: 'beginner',
    factual_context:
      'If the goal is to improve a measured quality (estimated 1RM, race time, VO₂ estimate, benchmark WOD), repeating a comparable test over weeks is more informative than constantly switching unrelated challenges. Novelty can be motivating, but measurement needs stable reference points.',
    key_points: [
      'Stable tests enable trends.',
      'Novelty is optional; comparability is required for charts.',
      'Change one variable at a time when possible.',
    ],
    avoid_claims: [
      'Do not claim novelty has zero value.',
      'Do not invent adherence statistics.',
    ],
    kinesoscore_connection:
      'Tracking tracks (strength, running, assessments) assume repeated comparable saves.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'higher-is-better-vs-lower',
    category: 'performance_measurement',
    title: 'Higher-is-better vs lower-is-better metrics',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'Some KinesoScore metrics improve when the number rises (estimated 1RM, myKinesoScore™, VO₂ max, Cindy rounds). Others improve when the number falls (race time, Fitness Age, many for-time WODs, BMI as commonly interpreted for health screening). Misreading direction is a common data-interpretation error.',
    key_points: [
      'Always check the metric’s direction.',
      'Time-based running/WOD scores are usually lower-is-better.',
      'Dashboard metric definitions encode higherIsBetter explicitly in data.',
    ],
    avoid_claims: [
      'Do not moralize BMI changes; keep product disclaimer context.',
    ],
    kinesoscore_connection:
      'dashboardMetrics.js / trackingTracks.js define higherIsBetter per metric.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'one-metric-one-question',
    category: 'performance_measurement',
    title: 'Pick the metric that matches the question',
    content_type: 'performance_question',
    difficulty: 'beginner',
    factual_context:
      '“Am I getting stronger on the deadlift?” wants deadlift estimated 1RM. “Am I a more balanced strength+endurance athlete?” wants myKinesoScore™. “Is my aerobic fitness improving?” may want VO₂ or Fitness Age. Using the wrong metric creates fake conclusions.',
    key_points: [
      'Question first, metric second.',
      'Composite scores blur component detail.',
      'Component metrics miss whole-profile balance.',
    ],
    avoid_claims: [
      'Do not claim one KinesoScore tool replaces all others.',
    ],
    kinesoscore_connection:
      'Calculator registry spans performance, assessments, and military tools for different questions.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'submaximal-testing-practicality',
    category: 'training_concepts',
    title: 'Why submaximal testing is often more practical than constant maxing',
    content_type: 'training_concept',
    difficulty: 'beginner',
    factual_context:
      'True max efforts (tested 1RM, all-out races, maximal field tests) are informative but costly in recovery and risk if overused. Submaximal estimates (Epley 1RM from a hard set, race predictions from a recent performance) trade some precision for repeatability in ordinary training weeks.',
    key_points: [
      'Practical ≠ worthless.',
      'Save max tests for planned moments.',
      'Keep estimation methods consistent.',
    ],
    avoid_claims: [
      'Do not claim submaximal estimates eliminate all risk.',
    ],
    kinesoscore_connection:
      'Epley 1RM estimation and Riegel race prediction embody this practicality tradeoff.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['epley', 'riegel'],
  },
  {
    id: 'units-and-comparability',
    category: 'fitness_tracking',
    title: 'Keep units and standards consistent when comparing sessions',
    content_type: 'fitness_fact',
    difficulty: 'beginner',
    factual_context:
      'Switching pounds vs kilograms, treadmill distance vs road distance, strict vs kipping pull-ups, or Rx vs Scaled without noting the change creates false PRs or false plateaus. Clean tracking is mostly discipline about constants.',
    key_points: [
      'Units, standards, and conditions are part of the data.',
      'Note course / load / style changes.',
      'Comparability > dramatic one-off numbers.',
    ],
    avoid_claims: [
      'Do not invent conversion error rates.',
    ],
    kinesoscore_connection:
      'Strength/running/assessment tracks assume consistent exercise naming and standards for history graphs.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'general-multi-quality-fitness',
    category: 'general_fitness_education',
    title: 'Fitness has multiple qualities — measure more than one',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'Strength, endurance, aerobic capacity, work capacity, and body-composition screens are related but distinct. KinesoScore’s toolset exists because no single number answers every training question. Learning what each metric can and cannot say is fitness literacy.',
    key_points: [
      'Multi-quality view reduces blind spots.',
      'Choose a small set of metrics that match goals.',
      'Reassess when goals change.',
    ],
    avoid_claims: [
      'Do not invent a universal hierarchy of fitness qualities.',
    ],
    kinesoscore_connection:
      'Product spans strength, running, composite score, VO₂, Fitness Age, BMR/BMI, WODs, and military batteries.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'soft-cta-whats-yours',
    category: 'product_education',
    title: 'Soft CTA pattern: teach first, invite second',
    content_type: 'product_education',
    difficulty: 'beginner',
    factual_context:
      'Existing KinesoScore content-studio guidance favors soft CTAs such as “What’s yours?” after sharing a real metric or educational point — not aggressive sales language. Educational posts should still stand alone if the reader never clicks through.',
    key_points: [
      'Lead with usefulness.',
      'Optional invite beats hard sell.',
      'Never invent scores or athletes.',
    ],
    avoid_claims: [
      'Do not fabricate testimonials or improvement percentages.',
    ],
    kinesoscore_connection:
      'content-studio README brand rules: soft CTA, real product data only.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
]
