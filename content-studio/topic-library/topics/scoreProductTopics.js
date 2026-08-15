/**
 * myKinesoScore™, Fitness Age, performance measurement, and product-education topics.
 * Proprietary internals intentionally omitted beyond public SOURCE blurbs.
 */

/** @type {import('../types.js').Topic[]} */
export const SCORE_PRODUCT_TOPICS = [
  {
    id: 'what-mykinesoscore-is',
    category: 'fitness_score',
    title: 'What myKinesoScore™ actually measures',
    content_type: 'product_education',
    difficulty: 'beginner',
    factual_context:
      'myKinesoScore™ is KinesoScore’s overall fitness score calculator. Public methodology describes it as an equal-weighted average of a recreational strength percentile (bodyweight-relative estimated 1RM or SBD Total vs gym-goer norms) and a running percentile (race-result style curves). The score is framed as how many people out of 100 you outperform on average across both domains.',
    key_points: [
      'Equal weight: strength side + running side.',
      'It is a dual-domain percentile composite, not BMI and not a military scorecard.',
      'SBD Total is preferred for strength when provided; otherwise a single lift can be used.',
    ],
    avoid_claims: [
      'Do not reveal unpublished norm tables or interpolation internals.',
      'Do not claim medical or hiring/selection validity.',
      'Do not invent user improvement statistics.',
    ],
    kinesoscore_connection:
      'This is the core scoring product surface at /scoring (myKinesoScore™).',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['fpc-score', 'recreational-strength', 'runrepeat'],
  },
  {
    id: 'why-equal-weight-strength-running',
    category: 'fitness_score',
    title: 'Why combining strength and running answers a different question',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'Strength-only or running-only metrics optimize for one quality. An equal-weight composite asks how you look when both qualities count. Product copy emphasizes that neither domain can fully hide the other — a useful framing for people who train (or neglect) one side heavily.',
    key_points: [
      'Different question than a single lift or a single race.',
      'Exposes specialization vs balance.',
      'Still not a complete map of every fitness quality.',
    ],
    avoid_claims: [
      'Do not claim equal weighting is the only scientifically correct approach.',
      'Do not invent outcome studies about balanced athletes.',
    ],
    kinesoscore_connection:
      'About and scoring education describe myKinesoScore™ as combining strength and running into one percentile score.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['fpc-score'],
  },
  {
    id: 'balanced-vs-leaning-labels',
    category: 'fitness_score',
    title: 'Balanced vs strength-leaning vs running-leaning',
    content_type: 'data_interpretation',
    difficulty: 'beginner',
    factual_context:
      'myKinesoScore™ can describe whether your strength and running component scores are relatively close (Balanced) or whether one side leads (Strength-leaning / Running-leaning). These labels help interpret profile shape; they are not moral judgments and not medical categories.',
    key_points: [
      'Labels describe relative component gap, not worth.',
      'Useful for deciding what to emphasize next in training.',
      'A leaning profile can still be high-performing overall.',
    ],
    avoid_claims: [
      'Do not publish the exact internal gap threshold as a “secret formula” deep-dive.',
      'Do not shame specialists.',
    ],
    kinesoscore_connection:
      'Scoring results surface balance labels alongside the overall score.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['fpc-score'],
  },
  {
    id: 'score-bands-building-to-elite',
    category: 'fitness_score',
    title: 'Reading score bands without overthinking them',
    content_type: 'data_interpretation',
    difficulty: 'beginner',
    factual_context:
      'myKinesoScore™ results can be grouped into descriptive bands such as Building, Developing, Capable, Strong, and Elite. Bands are communication aids for where a composite percentile sits — not certifications, ranks, or medical categories.',
    key_points: [
      'Bands summarize; the number still matters for fine trends.',
      'Moving bands usually takes sustained work in one or both domains.',
      'Band names are not competitive titles.',
    ],
    avoid_claims: [
      'Avoid turning band cutoffs into hype or gatekeeping.',
      'Do not invent how long it “usually takes” to move bands.',
    ],
    kinesoscore_connection:
      'Scoring UI presents fitness bands with the overall myKinesoScore™ result.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['fpc-score'],
  },
  {
    id: 'percentile-outperform-framing',
    category: 'performance_measurement',
    title: 'What “outperform N out of 100” means',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'A percentile-style score answers how a result compares within a defined peer population. myKinesoScore™’s public description frames the composite as how many people out of 100 you outperform on average across strength and running domains. Percentiles always depend on who is in the comparison set.',
    key_points: [
      'Percentile ≠ percentage of max human potential.',
      'Population choice changes the meaning.',
      'Useful for relative standing, not absolute physiology.',
    ],
    avoid_claims: [
      'Do not confuse recreational gym norms with race-finisher norms or powerlifting meets.',
    ],
    kinesoscore_connection:
      'Strength and running sides use different peer populations; the composite averages those percentile views.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['fpc-score', 'recreational-strength', 'runrepeat'],
  },
  {
    id: 'fitness-age-concept',
    category: 'fitness_age',
    title: 'What Fitness Age means (conceptually)',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'In KinesoScore, Fitness Age means the chronological age of an average person with comparable cardiorespiratory fitness (CRF). Lower fitness age is better. The tool is for adults 18+. It is explicitly not a medical diagnosis.',
    key_points: [
      'Fitness Age ≈ age of an average peer with similar CRF.',
      'Lower is better.',
      'Adults 18+ only in the product model.',
    ],
    avoid_claims: [
      'Do not claim it measures biological aging clocks or disease risk as a diagnosis.',
      'Do not invent lifespan statistics.',
    ],
    kinesoscore_connection:
      'Fitness Age calculator and Dashboard track exist; public SOURCE text defines the concept.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'fitness-age-vo2-primary',
    category: 'fitness_age',
    title: 'Why Fitness Age is driven by VO₂ / CRF',
    content_type: 'educational',
    difficulty: 'intermediate',
    factual_context:
      'KinesoScore’s public Fitness Age model is norm-based and VO₂-primary: when VO₂ is at or below the young-adult median, age is inverted through Cooper Institute / ACSM age–sex medians; above that median, young-adult percentile position is compressed into an adult Fitness Age band so elites are not collapsed to a single floor. This keeps the construct tied to cardiorespiratory fitness norms.',
    key_points: [
      'CRF/VO₂ is the primary signal.',
      'Norm inversion answers “age of an average peer with your fitness.”',
      'Elite values need careful handling so ages stay meaningful for adults.',
    ],
    avoid_claims: [
      'Do not document proprietary compression knobs, utilization factors, or unpublished curves beyond the public SOURCE blurb.',
    ],
    kinesoscore_connection:
      'FITNESS_AGE_SOURCE on Sources & Methodology is the public description to stick to.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['vo2-norms'],
  },
  {
    id: 'fitness-age-what-is-not-used',
    category: 'fitness_age',
    title: 'What Fitness Age does not use (BMI, body fat, training frequency)',
    content_type: 'misconception',
    difficulty: 'intermediate',
    factual_context:
      'Per KinesoScore’s public Fitness Age source text: body fat, BMI, and training frequency are not used. 5K time is used only to estimate VO₂ when VO₂ is missing — never stacked with an entered VO₂. Small capped modifiers may adjust for resting heart rate and strength percentile, but the model remains VO₂/CRF-centered.',
    key_points: [
      'Not a body-composition score.',
      'Avoid double-counting running + VO₂.',
      'Modifiers are small and capped in the public description.',
    ],
    avoid_claims: [
      'Do not invent additional inputs the product does not use.',
      'Do not explain unpublished modifier formulas in detail.',
    ],
    kinesoscore_connection:
      'Fitness Age education should quote the public SOURCE constraints rather than reverse-engineering code.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'fitness-age-vs-chronological-age',
    category: 'fitness_age',
    title: 'Fitness Age vs chronological age',
    content_type: 'comparison',
    difficulty: 'beginner',
    factual_context:
      'Chronological age is time since birth. Fitness Age (in this product) is a CRF-norm comparison: the age of an average person with similar aerobic fitness. Someone can have a Fitness Age lower or higher than their chronological age depending on VO₂-related fitness — without that implying a medical age diagnosis.',
    key_points: [
      'Two different meanings of “age.”',
      'Gap can motivate training focus on aerobic fitness.',
      'Still educational, not diagnostic.',
    ],
    avoid_claims: [
      'Do not claim Fitness Age replaces clinical assessments.',
    ],
    kinesoscore_connection:
      'Fitness Age page lead copy emphasizes lower fitness age is better for adults 18+.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'fitness-age-vs-mykinesoscore',
    category: 'performance_measurement',
    title: 'Fitness Age vs myKinesoScore™',
    content_type: 'comparison',
    difficulty: 'intermediate',
    factual_context:
      'myKinesoScore™ is a dual-domain strength + running percentile composite. Fitness Age is a CRF/VO₂-norm “age of an average peer with your aerobic fitness” construct (with limited modifiers). They answer different questions and can move differently depending on what you train.',
    key_points: [
      'Different inputs and interpretations.',
      'Both are educational performance tools.',
      'Neither is BMI.',
    ],
    avoid_claims: [
      'Do not claim one is “more accurate” universally.',
    ],
    kinesoscore_connection:
      'Both appear as Dashboard metrics and separate calculators.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['fpc-score'],
  },
  {
    id: 'what-kinesoscore-is-not',
    category: 'product_education',
    title: 'What KinesoScore is not',
    content_type: 'product_education',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore provides free educational fitness calculators and tracking. Product copy frames tools as unofficial/educational where relevant (especially military calculators), not as medical diagnoses, not as official service scorecards, and not as affiliation with CrossFit, Inc. for benchmark WODs.',
    key_points: [
      'Educational estimates ≠ clinical clearance.',
      'Military tools are unofficial readiness estimates.',
      'WOD tools are not CrossFit affiliation claims.',
    ],
    avoid_claims: [
      'Do not market medical, hiring, or official military validity.',
    ],
    kinesoscore_connection:
      'Disclaimers appear across About, guides, and calculator pages — content should match them.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'sources-methodology-habit',
    category: 'product_education',
    title: 'Why citing methods builds trust',
    content_type: 'product_education',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore maintains a Sources & Methodology page listing public citations for formulas and datasets actually used (Epley, Riegel, RunRepeat context, Cooper/Rockport, Mifflin–St Jeor, ACSM VO₂ norms, recreational strength references, and more). Transparent sourcing is part of the product’s credibility posture.',
    key_points: [
      'Show the public methods behind numbers.',
      'Distinguish published formulas from product features without formulas (habits/awards).',
      'Link out rather than invent citations.',
    ],
    avoid_claims: [
      'Do not invent studies or DOIs.',
    ],
    kinesoscore_connection:
      'Point curious readers to kinesoscore.com Sources & Methodology rather than overselling in-feed.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [
      'epley',
      'riegel',
      'runrepeat',
      'cooper-vo2',
      'rockport-vo2',
      'mifflin-st-jeor',
      'fpc-score',
    ],
  },
  {
    id: 'dashboard-as-history',
    category: 'fitness_tracking',
    title: 'A dashboard is only as useful as the history behind it',
    content_type: 'training_concept',
    difficulty: 'beginner',
    factual_context:
      'Performance dashboards turn saved results into trends across metrics such as myKinesoScore™, Fitness Age, BMI, lift 1RMs, SBD Total, and running times. Without repeated, comparable saves, charts cannot show meaningful change.',
    key_points: [
      'Save consistently if you want trends.',
      'Compare like metrics over time.',
      'One entry is a snapshot; many entries are a story.',
    ],
    avoid_claims: [
      'Do not invent average user engagement stats.',
    ],
    kinesoscore_connection:
      'Dashboard aggregates calculator saves across performance, assessments, and military tools.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'awards-strength-running',
    category: 'product_education',
    title: 'Strength and Running awards track domains separately',
    content_type: 'product_education',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore awards track Strength and Running components separately with Bronze, Silver, Gold, and Diamond tiers, plus a Crown when both domains reach Diamond. Awards are a product recognition layer — not a published scientific formula.',
    key_points: [
      'Separate domain awards highlight specialization vs dual excellence.',
      'Crown recognizes high performance in both domains.',
      'Awards are motivational product features, not physiology equations.',
    ],
    avoid_claims: [
      'Do not invent how awards change training outcomes.',
      'If mentioning numeric thresholds, only use values that are explicitly shown in public UI legend copy — do not invent others.',
    ],
    kinesoscore_connection:
      'Dashboard shows awards derived from Strength and Running components.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'leaderboard-opt-in',
    category: 'product_education',
    title: 'Opt-in leaderboards vs private tracking',
    content_type: 'product_education',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore lets users track privately and optionally share results to public leaderboards using a Leaderboard Name and profile presentation. Private saves stay private until shared. Habit streak shares, when used, show name + streak without exposing which habits were checked.',
    key_points: [
      'Tracking can stay private.',
      'Sharing is opt-in.',
      'Leaderboards are for comparison, not required for using calculators.',
    ],
    avoid_claims: [
      'Do not invent competitor counts or “most popular board” stats unless pulled from live data at publish time.',
    ],
    kinesoscore_connection:
      'Leaderboard supports boards such as myKinesoScore, strength, running, assessments, military, and Habit Streaks.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'measure-then-improve',
    category: 'general_fitness_education',
    title: 'Measure where you are — then decide what to improve',
    content_type: 'training_concept',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore’s home positioning emphasizes measurement before vague motivation: know a baseline (strength, running, composite score, VO₂, etc.), then improve with intent. Measurement does not replace training — it informs it.',
    key_points: [
      'Baseline clarity beats guesswork.',
      'Pick the metric that matches your goal.',
      'Re-test with the same method.',
    ],
    avoid_claims: [
      'Do not promise specific improvement timelines.',
    ],
    kinesoscore_connection:
      'Home tagline: “Measure where you are — Improve where you\'re going.”',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'field-test-vs-lab-test',
    category: 'performance_measurement',
    title: 'Field tests vs laboratory tests',
    content_type: 'comparison',
    difficulty: 'intermediate',
    factual_context:
      'Field tests (Cooper run, Rockport walk, estimated 1RM from submaximal sets, race times) trade some precision for accessibility. Laboratory tests (for example gas-analysis VO₂ max) can be more direct but are less available day-to-day. Educational calculators help people use field data thoughtfully without pretending they are clinical labs.',
    key_points: [
      'Accessibility vs precision is a real tradeoff.',
      'Consistency of field protocol still yields useful trends.',
      'Know the limits of the tool you used.',
    ],
    avoid_claims: [
      'Do not claim field tests are medically equivalent to labs.',
    ],
    kinesoscore_connection:
      'About notes that VO₂ estimates come from field tests, not lab gas analysis.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['cooper-vo2', 'rockport-vo2', 'epley'],
  },
  {
    id: 'recreational-vs-competitive-norms',
    category: 'performance_measurement',
    title: 'Recreational gym norms vs competitive standards',
    content_type: 'misconception',
    difficulty: 'intermediate',
    factual_context:
      'KinesoScore’s strength context is framed around recreational gym-goer ladders and guidance — not drug-tested powerlifting meet norms. Using the wrong reference population makes ordinary trainees look artificially weak (or elites look average). Always ask: “Compared to whom?”',
    key_points: [
      'Population mismatch misleads.',
      'Recreational charts suit everyday trainees better than meet tables.',
      'Competitive standards still matter — for competitors.',
    ],
    avoid_claims: [
      'Do not invent meet total statistics.',
    ],
    kinesoscore_connection:
      'Sources explicitly distinguish recreational strength standards from competitive powerlifting norms.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['recreational-strength', 'strength-level-context'],
  },
]
