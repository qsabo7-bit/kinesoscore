/** Concise SEO / educational copy for public calculator pages. */

/** Shared closing CTA pointing to the overall KinesoScore™ calculator. */
export const KINESOSCORE_RELATED_NOTE = {
  before:
    'Want one number that combines strength and running? Calculate your ',
  tab: 'scoring',
  label: 'KinesoScore™',
  after: '.',
}

export const STRENGTH_SEO = {
  title: 'About this strength & 1RM calculator',
  paragraphs: [
    'This free strength calculator estimates one-rep max (1RM) for bench press, squat, and deadlift, and can combine those lifts into an SBD total for gym-goers and lifters who want clear progression tracking.',
    'When you enter weight and reps, KinesoScore uses the Epley formula — 1RM ≈ weight × (1 + reps / 30) — a widely used estimate for submaximal sets. You can also enter a known 1RM directly for bench, squat, or deadlift.',
    'SBD Total is the sum of squat, bench, and deadlift 1RMs. Save results to compare sessions over time and see how your strength stack ranks against recreational gym-goer norms.',
  ],
  faqs: [
    {
      question: 'How is 1RM calculated?',
      answer:
        'KinesoScore estimates one-rep max with the Epley formula: 1RM ≈ weight × (1 + reps ÷ 30). For example, 225 lb for 5 reps estimates about 262 lb. You can also enter a tested 1RM instead of using the estimate.',
    },
    {
      question: 'What is an SBD total?',
      answer:
        'SBD Total is squat + bench press + deadlift one-rep maxes added together. It is a common way to summarize overall barbell strength and track progress across the three main lifts.',
    },
  ],
  relatedNote: KINESOSCORE_RELATED_NOTE,
}

export const RUNNING_SEO = {
  title: 'About this running fitness calculator',
  paragraphs: [
    'This running performance calculator analyzes a recent race or time trial, predicts equivalent times at other distances, and helps you benchmark endurance fitness.',
    'Enter a distance and finish time to estimate comparable race performances, review pacing context, and save results so you can track running progression on KinesoScore over weeks and months.',
  ],
  faqs: [
    {
      question: 'How does the running calculator estimate other race times?',
      answer:
        'KinesoScore uses established race-prediction relationships (including Riegel-style scaling) to estimate equivalent performances across common distances from a known result, then lets you save times for progress tracking.',
    },
  ],
  relatedNote: KINESOSCORE_RELATED_NOTE,
}

export const SCORING_SEO = {
  title: 'About the KinesoScore™ fitness score calculator',
  paragraphs: [
    'KinesoScore™ is an overall fitness performance score that averages your recreational strength percentile and running percentile into one transparent 0–100 result.',
    'Strength input can come from an SBD total or a single lift; running input comes from a race or time trial. Both sides use age- and sex-specific published norms so the score reflects how you compare with recreational peers — not a proprietary black box.',
    'Use it when you want a simple fitness score calculator that balances lifting and endurance, then save assessments to watch the number move as you train.',
  ],
  faqs: [
    {
      question: 'How does KinesoScore compare fitness performance?',
      answer:
        'KinesoScore™ averages two percentiles: strength (bodyweight-relative 1RM or SBD total vs recreational gym-goer norms) and running (race performance vs published finisher curves). The result is roughly how many peers out of 100 you outperform on average across both domains.',
    },
  ],
  learnMoreNote: {
    before: 'Want the educational overview? ',
    tab: 'fitness-score',
    label: 'Learn how KinesoScore™ works',
    after: '.',
  },
  relatedNote: {
    before: 'Start with the ',
    tab: 'strength',
    label: 'Strength calculator',
    after: ', then add a race result.',
  },
  links: [{ tab: 'running', label: 'Running calculator' }],
}

/** Educational landing page for /fitness-score (not the calculator). */
export const FITNESS_SCORE_SEO = {
  heroTitle: 'What Is KinesoScore™?',
  heroLead:
    'KinesoScore™ is a fitness performance score that combines strength and endurance performance into one simple metric.',
  heroSupport:
    'Use it to understand overall fitness, track performance over time, and see how strength and endurance contribute to a single progress marker — not as a medical diagnosis.',
  whatIsTitle: 'What is a fitness score?',
  whatIsParagraphs: [
    'A fitness score summarizes physical performance into a number you can compare over time. People use fitness scores to check progress, set training goals, and see whether different areas of fitness are moving together or drifting apart.',
    'No single measurement can represent every aspect of fitness. Strength, endurance, body composition, and other qualities answer different questions. Combining more than one performance area can give a clearer picture of overall readiness than relying on one metric alone.',
    'An overall fitness score is most useful when it is transparent about what it includes — and what it leaves out — so you can interpret the number in context.',
  ],
  howItWorksTitle: 'How KinesoScore™ works',
  howItWorksIntro:
    'At a high level, KinesoScore™ looks at two major performance domains and combines them into one overall result.',
  strengthTitle: 'Strength performance',
  strengthParagraphs: [
    'Strength reflects muscular performance capacity — how much force you can produce relative to useful comparison standards for recreational lifters.',
    'In practice, that means evaluating lifting performance against age- and sex-aware recreational norms so the strength side of the score represents relative strength, not just absolute load on the bar.',
  ],
  enduranceTitle: 'Endurance performance',
  enduranceParagraphs: [
    'Endurance and running performance reflect cardiovascular capability — how well you can sustain aerobic effort over a race or time trial.',
    'That is a different dimension of fitness from strength. A strong lift total does not automatically imply strong race fitness, and a fast race does not automatically imply strong barbell performance.',
  ],
  combinedTitle: 'Combined score',
  combinedParagraphs: [
    'KinesoScore™ combines the strength and endurance components into one overall performance score so you can track both qualities together.',
    'The goal is a practical summary for training insight: one number that reflects balance across lifting and running performance, without claiming to measure every aspect of health or athleticism.',
  ],
  whyCombineTitle: 'Why combine strength and endurance?',
  whyCombineParagraphs: [
    'Strength alone does not describe cardiovascular fitness. Someone can be highly capable in the weight room and still have limited aerobic performance.',
    'Endurance alone does not describe muscular performance. Strong race times do not automatically reveal relative strength on major lifts.',
    'A balanced approach provides a broader view of physical performance. By including both domains, KinesoScore™ helps you see whether progress is one-sided or shared across strength and endurance.',
  ],
  understandingTitle: 'Understanding your KinesoScore™',
  understandingParagraphs: [
    'Higher scores indicate stronger relative performance across the included strength and endurance inputs. The number is most useful when you recalculate it over time and watch the trend.',
    'Improving strength, endurance, or both can raise your overall result. Large gaps between the two sides often mean the combined score has room to grow through the weaker domain.',
    'KinesoScore™ is a fitness tracking tool. It is not a medical assessment, not a clinical diagnosis, and not an official military scorecard.',
  ],
  improveTitle: 'How to improve your KinesoScore™',
  improveParagraphs: [
    'Strength improvements usually come from progressive training and consistent tracking of major lifts such as squat, bench, and deadlift.',
    'Endurance improvements usually come from building aerobic capacity and improving running performance across distances that matter for your training.',
    'As either side improves — or both — your overall fitness score can move with it. Recalculate after meaningful training blocks to see the change.',
  ],
  faqTitle: 'Fitness score FAQs',
  faqs: [
    {
      question: 'What is a fitness score?',
      answer:
        'A fitness score is a summary number that represents physical performance so you can compare results over time. Useful scores are transparent about which qualities they include — such as strength and endurance — instead of treating one measurement as a complete picture of fitness.',
    },
    {
      question: 'What does KinesoScore™ measure?',
      answer:
        'KinesoScore™ measures overall fitness performance by combining a strength component and an endurance (running) component into one score. It is designed for performance tracking and progress insight, not for diagnosing health conditions.',
    },
    {
      question: 'Is KinesoScore™ a fitness test?',
      answer:
        'KinesoScore™ is an educational fitness scoring tool based on strength and endurance performance inputs. It helps you summarize and track those qualities, but it is not a laboratory test, medical exam, or certified athletic certification.',
    },
    {
      question: 'How is KinesoScore™ different from BMI?',
      answer:
        'BMI is a height-and-weight ratio used as a general body-mass screening tool. KinesoScore™ focuses on performance — strength and endurance results — rather than body mass index alone. The two answer different questions and are not interchangeable.',
    },
    {
      question: 'How is KinesoScore™ different from VO₂ Max?',
      answer:
        'VO₂ max estimates cardiorespiratory fitness from aerobic capacity. KinesoScore™ combines strength and endurance performance into an overall score, so it includes muscular performance as well as running-related fitness rather than aerobic capacity alone.',
    },
    {
      question: 'How can I improve my KinesoScore™?',
      answer:
        'Improve the strength side with progressive lifting and tracked major lifts, improve the endurance side with aerobic and running training, or work on both. Recalculate after training progress to see how the overall score responds.',
    },
    {
      question: 'Is KinesoScore™ an official military score?',
      answer:
        'No. KinesoScore™ is an educational overall fitness score for tracking strength and endurance performance. It is not an official Army, Marine Corps, Navy, or Air Force scorecard. Military calculators on KinesoScore are separate educational estimates.',
    },
  ],
  relatedNote: {
    before: 'Ready to see your number? ',
    tab: 'scoring',
    label: 'Calculate your KinesoScore™',
    after: '.',
  },
  links: [
    { tab: 'strength', label: 'Strength calculator' },
    { tab: 'running', label: 'Running calculator' },
    { tab: 'vo2max', label: 'VO₂ Max calculator' },
  ],
  disclaimer:
    'KinesoScore™ is an educational fitness tracking tool, not medical advice and not an official military assessment.',
}

export const VO2_SEO = {
  title: 'About this VO₂ max calculator',
  paragraphs: [
    'This VO₂ max calculator estimates maximal oxygen uptake — a core marker of cardiorespiratory fitness — using the Cooper 12-minute run or the Rockport 1-mile walk field test.',
    'Add age and sex to compare your estimate with Cooper Institute / ACSM reference percentiles. Save results to track aerobic fitness, then optionally carry VO₂ into the Fitness Age calculator.',
  ],
  faqs: [
    {
      question: 'What is a good VO₂ max?',
      answer:
        '“Good” VO₂ max depends on age and sex. KinesoScore compares your estimate with Cooper Institute / ACSM percentile tables: values near the 50th percentile are average for your group, while the 75th percentile and above are typically considered good to excellent. The calculator shows your category so you can interpret the number in context.',
    },
  ],
  relatedNote: {
    before: 'Next, turn your VO₂ into a ',
    tab: 'fitness-age',
    label: 'Fitness Age',
    after: ' estimate.',
  },
}

export const BMR_SEO = {
  title: 'About this BMR calculator',
  paragraphs: [
    'This BMR calculator estimates basal / resting metabolic rate with the Mifflin–St Jeor equation, commonly used for adults in nutrition practice.',
    'Optionally add activity level to estimate total daily energy expenditure (TDEE). Results are educational planning tools, not personalized medical advice.',
  ],
  faqs: [],
}

export const BMI_SEO = {
  title: 'About this BMI calculator',
  paragraphs: [
    'Body mass index (BMI) is a simple height-and-weight ratio used as a general screening tool: weight ÷ height² (metric). Athletes and highly muscular people may read higher without excess fat.',
    'KinesoScore shows your BMI and a standard WHO-style category band, and lets you save readings to watch the trend — not to diagnose health on BMI alone.',
  ],
  faqs: [],
  disclaimer:
    'BMI is an educational estimate, not a diagnosis or medical advice. Talk with a qualified clinician for health decisions.',
}

export const FITNESS_AGE_SEO = {
  title: 'About this VO₂ fitness age calculator',
  paragraphs: [
    'KinesoScore™ Fitness Age estimates your cardiovascular fitness age by comparing VO₂ max with age- and sex-based fitness reference values. Higher cardiorespiratory fitness can correspond to a younger fitness age.',
    'The primary inputs are VO₂ max, chronological age, and biological sex. Resting heart rate may refine the estimate slightly. A running time is used only to estimate VO₂ when VO₂ is missing — aerobic fitness is never double-counted. Body fat, BMI, and training frequency are not used.',
    'Try the calculator to see how your aerobic fitness maps onto an adult reference curve, then save assessments to track Fitness Age over time.',
  ],
  faqs: [
    {
      question: 'How is fitness age calculated?',
      answer:
        'KinesoScore maps your VO₂ max onto Cooper Institute / ACSM age–sex reference values. If your VO₂ matches the average for a given adult age band, that age becomes your baseline Fitness Age. Above the young-adult average, percentile position is compressed into an adult range so elite scores stay distinguishable. Resting heart rate can adjust the result by up to about two years. It is an educational estimate, not a medical or biological-age diagnosis.',
    },
  ],
  disclaimer:
    'Fitness age is an educational estimate, not medical advice, and does not replace clinical evaluation.',
  relatedNote: {
    before: 'Need a VO₂ estimate? Use the ',
    tab: 'vo2max',
    label: 'VO₂ Max calculator',
    after: ', or start from a race time.',
  },
  links: [{ tab: 'running', label: 'Running calculator' }],
}

export const MILITARY_SEO = {
  'air-force-pfra': {
    title: 'About the Air Force PFRA calculator',
    paragraphs: [
      'Estimate your Air Force Physical Fitness Readiness Assessment (PFRA) score from published standards for cardio, muscular strength, core endurance, and waist-to-height ratio.',
      'Use this military fitness calculator for training feedback and test preparation — enter event results to see an unofficial score estimate you can save and improve against. It does not replace official Air Force testing or scorecards.',
    ],
    faqs: [
      {
        question: 'Is the Air Force PFRA calculator official?',
        answer:
          'No. KinesoScore provides an educational estimate based on published PFRA-style standards to support training and preparation. Official scores come only from authorized testing under current Air Force guidance.',
      },
    ],
    links: [
      { tab: 'army-aft', label: 'Army AFT calculator' },
      { tab: 'marine-pft', label: 'Marine Corps PFT calculator' },
      { tab: 'navy-prt', label: 'Navy PRT calculator' },
      { tab: 'air-force-pfa', label: 'Legacy Air Force PFA calculator' },
    ],
  },
  'air-force-pfa': {
    title: 'About the Legacy Air Force PFA calculator',
    paragraphs: [
      'Estimate a Legacy Air Force Physical Fitness Assessment (PFA) score for historical comparison using published 1.5-mile run, push-up, and sit-up style standards.',
      'Helpful if you are reviewing past performance or comparing eras of testing. This is preparation and tracking assistance only — not an official scorecard.',
    ],
    faqs: [],
    links: [
      { tab: 'air-force-pfra', label: 'Current Air Force PFRA calculator' },
      { tab: 'army-aft', label: 'Army AFT calculator' },
      { tab: 'marine-pft', label: 'Marine Corps PFT calculator' },
      { tab: 'navy-prt', label: 'Navy PRT calculator' },
    ],
  },
  'army-aft': {
    title: 'About the Army AFT calculator',
    paragraphs: [
      'Estimate your Army Fitness Test (AFT) score with this Army AFT calculator using published age- and gender-normed event standards.',
      'Scored events typically include the 3-rep max deadlift, hand-release push-ups, Sprint-Drag-Carry, plank, and 2-mile run. Use it for training feedback and readiness prep — not as a substitute for official Army testing.',
    ],
    faqs: [
      {
        question: 'How is the Army AFT scored?',
        answer:
          'The Army Fitness Test awards points by event against published standards that vary by age band and gender. KinesoScore estimates each event score from your inputs, then sums them into an unofficial total so you can see where to improve before an official test.',
      },
    ],
    links: [
      { tab: 'air-force-pfra', label: 'Air Force PFRA calculator' },
      { tab: 'marine-pft', label: 'Marine Corps PFT calculator' },
      { tab: 'navy-prt', label: 'Navy PRT calculator' },
    ],
  },
  'marine-pft': {
    title: 'About the Marine Corps PFT calculator',
    paragraphs: [
      'Estimate your Marine Corps Physical Fitness Test (PFT) score with this Marine PFT calculator using published pull-up or push-up, forearm plank, and 3-mile run standards.',
      'Enter age band, gender, and event results for unofficial scoring assistance and training feedback. Official Marine Corps testing remains the source of record.',
    ],
    faqs: [
      {
        question: 'How is the Marine Corps PFT scored?',
        answer:
          'The PFT scores pull-ups or push-ups, a timed forearm plank, and a 3-mile run against Marine Corps age- and gender-based tables. KinesoScore estimates those event points from your inputs so you can prepare and track progress.',
      },
    ],
    links: [
      { tab: 'air-force-pfra', label: 'Air Force PFRA calculator' },
      { tab: 'army-aft', label: 'Army AFT calculator' },
      { tab: 'navy-prt', label: 'Navy PRT calculator' },
    ],
  },
  'navy-prt': {
    title: 'About the Navy PRT calculator',
    paragraphs: [
      'Estimate your Navy Physical Readiness Test (PRT) score with this Navy PRT calculator using published push-up, forearm plank, and 1.5-mile run standards.',
      'Built for sailors and candidates who want practical readiness feedback between official tests — educational estimates only, not an official Navy scorecard.',
    ],
    faqs: [
      {
        question: 'How is the Navy PRT scored?',
        answer:
          'The PRT typically scores push-ups, a forearm plank, and a 1.5-mile run using Navy age- and gender-based standards. KinesoScore estimates each component and a combined result for training insight only.',
      },
    ],
    links: [
      { tab: 'air-force-pfra', label: 'Air Force PFRA calculator' },
      { tab: 'army-aft', label: 'Army AFT calculator' },
      { tab: 'marine-pft', label: 'Marine Corps PFT calculator' },
    ],
  },
}

export const MILITARY_SEO_DISCLAIMER =
  'Educational estimate only — not an official service scorecard or medical advice. Always confirm with current official standards and command guidance.'

export const HOME_SEO_TAGLINE =
  'KinesoScore™ is a comprehensive fitness performance platform combining strength, endurance, military fitness standards, and cardiovascular fitness tracking.'

/** FAQs attached to document JSON-LD by App tab / PAGE_SEO key. */
export const PAGE_FAQS_BY_TAB = {
  home: [
    {
      question: 'How does KinesoScore compare fitness performance?',
      answer:
        'KinesoScore™ combines transparent calculators for strength (including Epley 1RM and SBD total), running, VO₂ max, fitness age, BMI/BMR, and military assessments (Army AFT, Marine PFT, Navy PRT, Air Force PFRA/PFA). The overall KinesoScore™ averages strength and running percentiles against published recreational norms.',
    },
    {
      question: 'How is fitness age calculated?',
      answer:
        'Fitness Age compares your VO₂ max with age- and sex-based cardiorespiratory reference values. Resting heart rate may adjust the estimate slightly. It is an educational tool, not medical advice.',
    },
    {
      question: 'How is 1RM calculated?',
      answer:
        'The strength calculator estimates one-rep max with the Epley formula from weight and reps, or accepts a known 1RM for bench press, squat, and deadlift, including SBD total tracking.',
    },
    {
      question: 'How is the Army AFT scored?',
      answer:
        'The Army AFT calculator estimates points for events such as the 3-rep max deadlift, hand-release push-ups, Sprint-Drag-Carry, plank, and 2-mile run using published age- and gender-normed standards. Results are unofficial training estimates.',
    },
    {
      question: 'What is a good VO₂ max?',
      answer:
        'A good VO₂ max depends on age and sex. KinesoScore compares estimates from Cooper or Rockport field tests with ACSM / Cooper Institute percentiles so you can see whether your value is average, good, or excellent for your group.',
    },
  ],
  strength: STRENGTH_SEO.faqs,
  running: RUNNING_SEO.faqs,
  scoring: SCORING_SEO.faqs,
  'fitness-score': FITNESS_SCORE_SEO.faqs,
  vo2max: VO2_SEO.faqs,
  'fitness-age': FITNESS_AGE_SEO.faqs,
  'army-aft': MILITARY_SEO['army-aft'].faqs,
  'marine-pft': MILITARY_SEO['marine-pft'].faqs,
  'navy-prt': MILITARY_SEO['navy-prt'].faqs,
  'air-force-pfra': MILITARY_SEO['air-force-pfra'].faqs,
  'air-force-pfa': MILITARY_SEO['air-force-pfa'].faqs,
}
