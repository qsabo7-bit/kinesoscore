/**
 * Running, VO₂, metabolism, and endurance-related topics.
 */

/** @type {import('../types.js').Topic[]} */
export const RUNNING_METABOLISM_TOPICS = [
  {
    id: 'riegel-race-prediction',
    category: 'running',
    title: 'How race-time prediction works (Riegel)',
    content_type: 'calculator_explanation',
    difficulty: 'intermediate',
    factual_context:
      'KinesoScore predicts equivalent race times with the Riegel model: T2 = T1 × (D2 / D1)^1.06, where T is time and D is distance. It is a common endurance prediction formula for converting a known race performance into an estimated time at another distance, assuming similar conditions and fitness.',
    key_points: [
      'One performance can estimate other race distances.',
      'The 1.06 exponent is a standard practical constant in this model.',
      'Predictions degrade when distances, terrain, or fitness differ a lot.',
    ],
    avoid_claims: [
      'Do not claim Riegel predicts every athlete perfectly.',
      'Do not invent typical error percentages without a cited study.',
    ],
    kinesoscore_connection:
      'The Running calculator uses Riegel for race predictions across supported distances.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['riegel'],
  },
  {
    id: 'supported-race-distances',
    category: 'running',
    title: 'Common race distances people actually track',
    content_type: 'fitness_fact',
    difficulty: 'beginner',
    factual_context:
      'KinesoScore’s running tools support Mile, 1.5 Mile, 2 Mile, 5K, 5 Mile, 10K, 10 Mile, Half Marathon, and Marathon. These cover common road and fitness-test distances used in recreational racing and some military assessments.',
    key_points: [
      'Distance choice should match the event you care about.',
      'Shorter races are often easier to repeat for frequent tracking.',
      'Longer races need more recovery between hard efforts.',
    ],
    avoid_claims: [
      'Do not invent participation statistics by distance.',
    ],
    kinesoscore_connection:
      'Running saves and graphs map to these named race distances, plus a derived Estimated 5K series.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'what-pace-means',
    category: 'running',
    title: 'What running pace means (and why it matters)',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'Pace is time divided by distance (for example minutes per mile or per kilometer). It turns a finish time into a rate you can compare across workouts of similar distance and use for race planning. Pace is not the same thing as effort — hills, heat, and fatigue change how a given pace feels.',
    key_points: [
      'Pace = time ÷ distance.',
      'Useful for comparing similar sessions.',
      'Context (terrain, weather, fitness) still matters.',
    ],
    avoid_claims: [
      'Do not invent “ideal” paces for age groups without sources.',
    ],
    kinesoscore_connection:
      'Running calculator outputs include pacing context alongside race predictions and saved times.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'estimated-5k-concept',
    category: 'running',
    title: 'Why an “estimated 5K” is useful even if you raced another distance',
    content_type: 'educational',
    difficulty: 'intermediate',
    factual_context:
      'If someone saves a non-5K race, an estimated 5K can be derived by converting that performance to a 5K-equivalent time (KinesoScore uses Riegel for race conversions). A shared 5K-equivalent makes it easier to compare endurance performances entered at different distances and to feed multi-domain scoring that expects a running input.',
    key_points: [
      'Estimated 5K is a conversion, not a second race you necessarily ran.',
      'It helps compare apples-to-apples across distances.',
      'It is only as good as the source race and the prediction model.',
    ],
    avoid_claims: [
      'Do not claim estimated 5K equals a fresh all-out 5K time trial.',
    ],
    kinesoscore_connection:
      'KinesoScore shows a derived Estimated 5K track and notes it can autofill myKinesoScore™ running inputs from recent saved running performance.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['riegel', 'fpc-score'],
  },
  {
    id: 'running-peer-context-race-finishers',
    category: 'running',
    title: 'Running percentiles: race finishers are not “everyone”',
    content_type: 'data_interpretation',
    difficulty: 'intermediate',
    factual_context:
      'KinesoScore’s running peer context is built from race-result style distributions (RunRepeat’s large race dataset is cited), age-centered with published age-group median finish times. That population is people who show up and finish races — not the entire general public. Comparing yourself to race finishers is a different question than comparing yourself to all adults.',
    key_points: [
      'Population definition changes percentile meaning.',
      'Race finishers are already a selected group.',
      'Age centering adjusts the peer story within that population.',
    ],
    avoid_claims: [
      'Do not invent RunRepeat curve values or unpublished percentiles.',
      'Do not claim these percentiles describe sedentary non-runners.',
    ],
    kinesoscore_connection:
      'Sources & Methodology cites RunRepeat percentile curves and age-group median reporting for running comparisons.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['runrepeat', 'age-band-medians'],
  },
  {
    id: 'endurance-not-whole-fitness',
    category: 'running',
    title: 'Why a fast 5K is not a complete fitness score',
    content_type: 'misconception',
    difficulty: 'beginner',
    factual_context:
      'A strong race time primarily reflects endurance and race-specific fitness. It does not automatically describe maximal barbell strength. Someone can be an excellent runner with modest squat/bench/deadlift numbers, which is why combining domains answers a different question than race time alone.',
    key_points: [
      'Endurance ≠ maximal strength.',
      'Single-metric pride can hide blind spots.',
      'Multi-domain views are optional but clarifying.',
    ],
    avoid_claims: [
      'Do not invent correlations between 5K time and bench press.',
    ],
    kinesoscore_connection:
      'myKinesoScore™ pairs running percentile with strength percentile instead of using race time alone.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['fpc-score'],
  },
  {
    id: 'what-vo2-max-is',
    category: 'vo2_max',
    title: 'What VO₂ max measures',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'VO₂ max is a measure of maximal aerobic capacity — roughly how much oxygen the body can use during intense exercise, commonly expressed in ml/kg/min. Higher values generally indicate better cardiorespiratory fitness, but field estimates are not the same as laboratory gas-analysis tests.',
    key_points: [
      'VO₂ max is an aerobic capacity metric.',
      'Units are typically ml of O₂ per kg body mass per minute.',
      'Field tests estimate VO₂; labs measure gas exchange more directly.',
    ],
    avoid_claims: [
      'Do not invent longevity statistics from VO₂ without citing a verified source.',
      'Do not present field estimates as clinical diagnoses.',
    ],
    kinesoscore_connection:
      'KinesoScore’s VO₂ Max calculator estimates VO₂ from Cooper and Rockport field tests and compares to ACSM-style norms.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['cooper-vo2', 'rockport-vo2', 'vo2-norms'],
  },
  {
    id: 'cooper-vs-rockport',
    category: 'vo2_max',
    title: 'Cooper test vs Rockport walk test',
    content_type: 'comparison',
    difficulty: 'intermediate',
    factual_context:
      'The Cooper test estimates VO₂ max from distance covered in a 12-minute run. The Rockport test estimates VO₂ max from a 1-mile walk plus body weight, age, sex, walk time, and heart rate (Kline et al., 1987). Cooper is a running field test; Rockport is a walking field test better suited to people who should not perform an all-out run.',
    key_points: [
      'Different protocols estimate the same broad construct (aerobic capacity).',
      'Choose the test that matches ability and safety constraints.',
      'Neither replaces a clinical laboratory test when one is required.',
    ],
    avoid_claims: [
      'Do not claim one field test is universally more accurate without a cited comparison study.',
    ],
    kinesoscore_connection:
      'Both Cooper and Rockport options exist in the VO₂ Max calculator, with citations on Sources & Methodology.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['cooper-vo2', 'rockport-vo2'],
  },
  {
    id: 'vo2-norms-categories',
    category: 'vo2_max',
    title: 'Reading VO₂ categories (Poor to Superior)',
    content_type: 'data_interpretation',
    difficulty: 'beginner',
    factual_context:
      'After estimating VO₂ max, KinesoScore places results in age–sex norm categories drawn from Cooper Institute / ACSM guideline context (Poor through Superior style bands). Categories are peer-context labels for cardiorespiratory fitness — not medical diagnoses.',
    key_points: [
      'Categories depend on age and sex norms.',
      'They describe CRF context, not health clearance.',
      'Improving VO₂ can move categories over time.',
    ],
    avoid_claims: [
      'Do not invent exact ACSM cut-points from memory in posts; point to ACSM/Sources page if needed.',
      'Do not diagnose disease from a category label.',
    ],
    kinesoscore_connection:
      'VO₂ results show ACSM-oriented category context; Sources lists VO₂ norm citations.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['vo2-norms'],
  },
  {
    id: 'bmr-what-it-is',
    category: 'metabolism',
    title: 'What BMR means',
    content_type: 'educational',
    difficulty: 'beginner',
    factual_context:
      'Basal metabolic rate (BMR) estimates the energy (calories) the body would use at complete rest to maintain basic physiological functions. It is not the same as total daily energy expenditure, which also includes movement and exercise.',
    key_points: [
      'BMR ≈ resting energy cost of staying alive.',
      'It is an estimate, not a direct calorimetry measurement in-app.',
      'Activity still needs to be accounted for separately (TDEE).',
    ],
    avoid_claims: [
      'Do not claim BMR calculators replace clinical metabolic testing.',
      'Do not invent average BMR values by demographic without sources.',
    ],
    kinesoscore_connection:
      'KinesoScore’s BMR calculator uses the Mifflin–St Jeor equation.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['mifflin-st-jeor'],
  },
  {
    id: 'mifflin-st-jeor-explained',
    category: 'metabolism',
    title: 'Why Mifflin–St Jeor is a common BMR estimate',
    content_type: 'calculator_explanation',
    difficulty: 'intermediate',
    factual_context:
      'KinesoScore estimates BMR with Mifflin–St Jeor (Mifflin et al., 1990): for men, BMR ≈ 10×weight(kg) + 6.25×height(cm) − 5×age + 5; for women, the constant term is −161 instead of +5. It is a widely used predictive equation based on weight, height, age, and sex — not a direct measurement of metabolism.',
    key_points: [
      'Inputs: weight, height, age, sex.',
      'It is a prediction equation from the literature.',
      'Individual metabolism can differ from the estimate.',
    ],
    avoid_claims: [
      'Do not claim it is the only valid BMR equation.',
      'Do not use it to prescribe medical diets.',
    ],
    kinesoscore_connection:
      'Sources & Methodology cites Mifflin et al., 1990 for the BMR tool.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['mifflin-st-jeor'],
  },
  {
    id: 'tdee-vs-bmr',
    category: 'metabolism',
    title: 'BMR vs TDEE: resting burn vs total daily burn',
    content_type: 'comparison',
    difficulty: 'beginner',
    factual_context:
      'TDEE (total daily energy expenditure) estimates overall daily calorie use by multiplying BMR by an activity factor. KinesoScore exposes activity levels from sedentary through extra active (factors such as 1.2 to 1.9 in the product’s activity model). TDEE is still an estimate and depends heavily on honest activity classification.',
    key_points: [
      'TDEE ≈ BMR × activity factor.',
      'Activity misclassification is a common error source.',
      'Useful for rough planning, not precision metering.',
    ],
    avoid_claims: [
      'Do not claim exact weight-loss outcomes from TDEE math.',
      'Do not invent activity-factor science beyond what Sources cite.',
    ],
    kinesoscore_connection:
      'The BMR page can show TDEE with activity multipliers; Sources cites dietary-guidelines energy-needs context.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: ['mifflin-st-jeor', 'tdee-activity'],
  },
  {
    id: 'bmi-screening-tool',
    category: 'metabolism',
    title: 'BMI is a screening tool — not a muscle-aware fitness score',
    content_type: 'misconception',
    difficulty: 'beginner',
    factual_context:
      'BMI is calculated as body mass divided by height squared (kg/m²) and categorized with standard public-health bands (WHO-style). It does not distinguish muscle from fat. KinesoScore’s BMI tool includes the product disclaimer that BMI is a screening tool and does not account for muscle mass. It is distinct from myKinesoScore™ and from VO₂-based Fitness Age.',
    key_points: [
      'BMI uses only height and weight.',
      'Muscular athletes can land in “high” BMI categories.',
      'Use BMI as one limited screen, not a performance score.',
    ],
    avoid_claims: [
      'Do not diagnose health status from BMI alone.',
      'Do not invent mortality statistics.',
    ],
    kinesoscore_connection:
      'BMI is its own calculator/track; product education distinguishes it from myKinesoScore™.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
  {
    id: 'why-track-running-over-time',
    category: 'fitness_tracking',
    title: 'Why saving race times beats relying on memory',
    content_type: 'training_concept',
    difficulty: 'beginner',
    factual_context:
      'Endurance fitness drifts with training, weather, courses, and life stress. A dated log of race or time-trial performances makes trends visible and reduces hindsight bias. Comparing like distances (or consistent 5K-equivalents) is clearer than mixing unrelated workouts.',
    key_points: [
      'Dated logs beat vague recollection.',
      'Same distance (or converted equivalent) helps interpretation.',
      'Noise is normal; trends matter more than one bad day.',
    ],
    avoid_claims: [
      'Do not claim tracking guarantees faster race times.',
    ],
    kinesoscore_connection:
      'Running performances can be saved and reviewed on Running tracks and the Dashboard.',
    evergreen: true,
    suitable_for_x: true,
    requires_external_source: false,
    source_ids: [],
  },
]
