/** Concise SEO / educational copy for public calculator pages. */

/** Shared closing CTA pointing to the overall myKinesoScore™ calculator. */
export const KINESOSCORE_RELATED_NOTE = {
  before:
    'Want one number that combines strength and running? Calculate your ',
  tab: 'scoring',
  label: 'myKinesoScore™',
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
  relatedNote: {
    before: 'Want the full explainer? ',
    tab: 'one-rep-max',
    label: 'One-rep max & Epley formula guide',
    after: '. Or combine strength and running with ',
    trailingLink: {
      tab: 'scoring',
      label: 'myKinesoScore™',
      after: '.',
    },
  },
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
  title: 'About the myKinesoScore™ fitness score calculator',
  paragraphs: [
    'myKinesoScore™ is an overall fitness performance score that averages your recreational strength percentile and running percentile into one transparent 0–100 result.',
    'Strength input can come from an SBD total or a single lift; running input comes from a race or time trial. Both sides use age- and sex-specific published norms so the score reflects how you compare with recreational peers — not a proprietary black box.',
    'Use it when you want a simple fitness score calculator that balances lifting and endurance, then save assessments to watch the number move as you train.',
  ],
  faqs: [
    {
      question: 'How does myKinesoScore™ compare fitness performance?',
      answer:
        'myKinesoScore™ averages two percentiles: strength (bodyweight-relative 1RM or SBD total vs recreational gym-goer norms) and running (race performance vs published finisher curves). The result is roughly how many peers out of 100 you outperform on average across both domains.',
    },
  ],
  learnMoreNote: {
    before: 'Want the educational overview? ',
    tab: 'fitness-score',
    label: 'Learn how myKinesoScore™ works',
    after: '.',
  },
  relatedNote: {
    before: 'Start with the ',
    tab: 'strength',
    label: 'Strength calculator',
    after: ', then add a race result with ',
    trailingLink: {
      tab: 'running',
      label: 'Running calculator',
      after: '.',
    },
  },
}

/** Educational landing page for /fitness-score (not the calculator). */
export const FITNESS_SCORE_SEO = {
  heroTitle: 'What Is myKinesoScore™?',
  heroLead:
    'myKinesoScore™ is a fitness performance score that combines strength and endurance performance into one simple metric.',
  heroSupport:
    'Use it to understand overall fitness, track performance over time, and see how strength and endurance contribute to a single progress marker — not as a medical diagnosis.',
  whatIsTitle: 'What is a fitness score?',
  whatIsParagraphs: [
    'A fitness score summarizes physical performance into a number you can compare over time. People use fitness scores to check progress, set training goals, and see whether different areas of fitness are moving together or drifting apart.',
    'No single measurement can represent every aspect of fitness. Strength, endurance, body composition, and other qualities answer different questions. Combining more than one performance area can give a clearer picture of overall readiness than relying on one metric alone.',
    'An overall fitness score is most useful when it is transparent about what it includes — and what it leaves out — so you can interpret the number in context.',
  ],
  howItWorksTitle: 'How myKinesoScore™ works',
  howItWorksIntro:
    'At a high level, myKinesoScore™ looks at two major performance domains and combines them into one overall result.',
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
    'myKinesoScore™ combines the strength and endurance components into one overall performance score so you can track both qualities together.',
    'The goal is a practical summary for training insight: one number that reflects balance across lifting and running performance, without claiming to measure every aspect of health or athleticism.',
  ],
  whyCombineTitle: 'Why combine strength and endurance?',
  whyCombineParagraphs: [
    'Strength alone does not describe cardiovascular fitness. Someone can be highly capable in the weight room and still have limited aerobic performance.',
    'Endurance alone does not describe muscular performance. Strong race times do not automatically reveal relative strength on major lifts.',
    'A balanced approach provides a broader view of physical performance. By including both domains, myKinesoScore™ helps you see whether progress is one-sided or shared across strength and endurance.',
  ],
  understandingTitle: 'Understanding myKinesoScore™',
  understandingParagraphs: [
    'Higher scores indicate stronger relative performance across the included strength and endurance inputs. The number is most useful when you recalculate it over time and watch the trend.',
    'Improving strength, endurance, or both can raise your overall result. Large gaps between the two sides often mean the combined score has room to grow through the weaker domain.',
    'myKinesoScore™ is a fitness tracking tool. It is not a medical assessment, not a clinical diagnosis, and not an official military scorecard.',
  ],
  improveTitle: 'How to improve myKinesoScore™',
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
      question: 'What does myKinesoScore™ measure?',
      answer:
        'myKinesoScore™ measures overall fitness performance by combining a strength component and an endurance (running) component into one score. It is designed for performance tracking and progress insight, not for diagnosing health conditions.',
    },
    {
      question: 'Is myKinesoScore™ a fitness test?',
      answer:
        'myKinesoScore™ is an educational fitness scoring tool based on strength and endurance performance inputs. It helps you summarize and track those qualities, but it is not a laboratory test, medical exam, or certified athletic certification.',
    },
    {
      question: 'How is myKinesoScore™ different from BMI?',
      answer:
        'BMI is a height-and-weight ratio used as a general body-mass screening tool. myKinesoScore™ focuses on performance — strength and endurance results — rather than body mass index alone. The two answer different questions and are not interchangeable.',
    },
    {
      question: 'How is myKinesoScore™ different from VO₂ Max?',
      answer:
        'VO₂ max estimates cardiorespiratory fitness from aerobic capacity. myKinesoScore™ combines strength and endurance performance into an overall score, so it includes muscular performance as well as running-related fitness rather than aerobic capacity alone.',
    },
    {
      question: 'How can I improve myKinesoScore™?',
      answer:
        'Improve the strength side with progressive lifting and tracked major lifts, improve the endurance side with aerobic and running training, or work on both. Recalculate after training progress to see how the overall score responds.',
    },
    {
      question: 'Is myKinesoScore™ an official military score?',
      answer:
        'No. myKinesoScore™ is an educational overall fitness score for tracking strength and endurance performance. It is not an official Army, Marine Corps, Navy, or Air Force scorecard. Military calculators on KinesoScore are separate educational estimates.',
    },
  ],
  relatedNote: {
    before: 'Ready to see your number? ',
    tab: 'scoring',
    label: 'Calculate your myKinesoScore™',
    after: '.',
  },
  links: [
    { tab: 'strength', label: 'Strength calculator' },
    { tab: 'running', label: 'Running calculator' },
    { tab: 'vo2max', label: 'VO₂ Max calculator' },
  ],
  disclaimer:
    'myKinesoScore™ is an educational fitness tracking tool, not medical advice and not an official military assessment.',
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
    before: 'Want the full explainer? ',
    tab: 'vo2max-guide',
    label: 'VO₂ max guide',
    after: '. Or turn your estimate into a Fitness Age.',
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
    'KinesoScore Fitness Age estimates your cardiovascular fitness age by comparing VO₂ max with age- and sex-based fitness reference values. Higher cardiorespiratory fitness can correspond to a younger fitness age.',
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
    after: ', or read the VO₂ max guide.',
  },
  links: [
    { tab: 'vo2max-guide', label: 'VO₂ max guide' },
    { tab: 'running', label: 'Running calculator' },
  ],
}

export const MILITARY_SEO = {
  'army-aft': {
    title: 'About the Army AFT calculator',
    paragraphs: [
      'The Army Fitness Test (AFT) measures soldier physical readiness across strength, muscular endurance, power-endurance, and aerobic capacity. This calculator helps you estimate how event results map onto published AFT-style scoring for training feedback.',
      'Events commonly entered here include the 3-rep max deadlift, hand-release push-ups, Sprint-Drag-Carry, plank, and 2-mile run. Select age band and gender, then enter each result to review an unofficial estimate.',
      'Treat the output as a practice score for prep and progress tracking — not a record score. Weak events usually matter as much as the total, so use the breakdown to guide training priorities.',
      'KinesoScore does not provide official military scoring. Official Army results come only from authorized testing under current Army guidance and command procedures.',
    ],
    relatedNote: {
      before: 'New to the test? ',
      tab: 'army-aft-guide',
      label: 'Army AFT explained',
      after: '.',
    },
    faqs: [
      {
        question: 'Is Army AFT the same as ACFT?',
        answer:
          'People still search for “ACFT calculator” because the Army Combat Fitness Test (ACFT) was the prior widely used name for Army fitness testing. The current test of record discussed on this page is the Army Fitness Test (AFT). Event lists and standards can change over time — always confirm the latest official Army materials. This page estimates AFT-style performance for education and training prep only.',
      },
      {
        question: 'What events are included in the Army AFT calculator?',
        answer:
          'This calculator covers the common AFT event set used for general-standard estimates: 3-rep max deadlift, hand-release push-ups, Sprint-Drag-Carry, plank, and 2-mile run. Specialty or alternate standards may exist in official guidance and are not all represented here.',
      },
      {
        question: 'How does this Army AFT calculator estimate a score?',
        answer:
          'You enter age band, gender, and event results. KinesoScore maps those inputs to published age- and gender-normed point tables and returns an unofficial event-by-event and total estimate for training insight.',
      },
      {
        question: 'Is the Army AFT calculator official?',
        answer:
          'No. KinesoScore is an educational training tool. It is not an Army scorecard, not a substitute for record testing, and not an official Department of the Army product.',
      },
      {
        question: 'How can I prepare using this Army AFT calculator?',
        answer:
          'Retest after training blocks, note which events limit your estimate, and focus practice on those movements — for example deadlift strength work or 2-mile pacing. Pair this page with the Strength and Running calculators for supporting lift and aerobic tracking.',
      },
      {
        question: 'Does age or gender affect Army AFT scoring in this calculator?',
        answer:
          'Yes. The estimate uses age-band and gender inputs against published general-standard tables. Always verify the standard that applies to your component and duty requirements in official Army sources.',
      },
    ],
    links: [
      { tab: 'strength', label: 'Strength calculator' },
      { tab: 'running', label: 'Running calculator' },
      { tab: 'marine-pft', label: 'Marine Corps PFT calculator' },
      { tab: 'navy-prt', label: 'Navy PRT calculator' },
    ],
  },
  'marine-pft': {
    title: 'About the Marine Corps PFT calculator',
    paragraphs: [
      'The Marine Corps Physical Fitness Test (PFT) measures upper-body strength or endurance, core endurance, and aerobic fitness. This Marine PFT calculator estimates how your event results compare with published PFT-style standards.',
      'Components typically include pull-ups or push-ups, a forearm plank, and a 3-mile run. Choose age band and gender, select the upper-body option you performed, then enter reps and times.',
      'Interpret results as unofficial training feedback. Use event scores to see whether upper-body work, plank capacity, or run fitness is the limiting factor before an official PFT.',
      'KinesoScore does not provide official military scoring. Official Marine Corps scores come only from authorized testing under current Marine Corps guidance.',
    ],
    relatedNote: {
      before: 'New to the test? ',
      tab: 'marine-pft-guide',
      label: 'Marine Corps PFT explained',
      after: '.',
    },
    faqs: [
      {
        question: 'What events are on the Marine Corps PFT?',
        answer:
          'The PFT scored in this calculator includes an upper-body event (pull-ups or push-ups), a forearm plank, and a 3-mile run. Official tables set event minimums and a total-score threshold for passing.',
      },
      {
        question: 'How is the Marine Corps PFT scored on KinesoScore?',
        answer:
          'After you enter age band, gender, and event results, KinesoScore estimates event points from published Marine Corps tables and combines them into an unofficial total for readiness prep.',
      },
      {
        question: 'Is this Marine PFT calculator an official USMC tool?',
        answer:
          'No. It is an educational estimate for training and progress tracking. It does not replace official Marine Corps testing, scorecards, or command reporting.',
      },
      {
        question: 'How can I prepare for the Marine PFT?',
        answer:
          'Train the events you will perform: pull-up or push-up volume, plank hold progressions, and 3-mile run pacing. Recalculate after focused blocks to see which event still limits the estimate. The Running and Strength calculators can support aerobic and upper-body tracking.',
      },
      {
        question: 'Do age and gender change Marine PFT standards here?',
        answer:
          'Yes. Point values depend on age band and gender inputs against published PFT tables. Confirm current Marine Corps standards for your situation before treating any estimate as a target.',
      },
    ],
    links: [
      { tab: 'running', label: 'Running calculator' },
      { tab: 'strength', label: 'Strength calculator' },
      { tab: 'army-aft', label: 'Army AFT calculator' },
      { tab: 'navy-prt', label: 'Navy PRT calculator' },
    ],
  },
  'navy-prt': {
    title: 'About the Navy PRT calculator',
    paragraphs: [
      'The Navy Physical Readiness Test (PRT) measures muscular endurance and aerobic readiness for sailors. This Navy PRT calculator estimates performance against published PRT-style standards for training feedback between official tests.',
      'Primary components entered here are push-ups, a forearm plank, and a 1.5-mile run. Select age band and gender, then enter each result to review an unofficial estimate.',
      'Use the estimate to identify whether strength-endurance, core endurance, or run fitness needs the most work. It is a prep aid, not a fitness report entry.',
      'KinesoScore does not provide official military scoring. Official Navy PRT results come only from authorized testing under current Navy physical readiness guidance.',
    ],
    relatedNote: {
      before: 'New to the test? ',
      tab: 'navy-prt-guide',
      label: 'Navy PRT explained',
      after: '.',
    },
    faqs: [
      {
        question: 'What does the Navy PRT include in this calculator?',
        answer:
          'This page scores the common PRT trio of push-ups, forearm plank, and 1.5-mile run. Alternate cardio options may exist in official Navy guidance and are not all scored here.',
      },
      {
        question: 'How is Navy PRT scoring estimated?',
        answer:
          'KinesoScore converts your age band, gender, and event inputs into unofficial event points using published Navy tables, then summarizes a combined estimate for training insight.',
      },
      {
        question: 'Is the Navy PRT calculator official?',
        answer:
          'No. KinesoScore provides educational estimates only. It is not a Navy Human Resources tool and cannot produce an official PRT score of record.',
      },
      {
        question: 'How can I prepare for the Navy PRT?',
        answer:
          'Build push-up capacity, extend plank holds, and improve 1.5-mile run pacing, then re-enter results to see which event still limits the estimate. The Running calculator is useful for aerobic progress between PRT attempts.',
      },
      {
        question: 'Are Navy PRT estimates age- and gender-based?',
        answer:
          'Yes. This calculator uses age-band and gender selections with published Navy standards. Always confirm the standards that apply to your age group and testing cycle in official Navy materials.',
      },
    ],
    links: [
      { tab: 'running', label: 'Running calculator' },
      { tab: 'army-aft', label: 'Army AFT calculator' },
      { tab: 'marine-pft', label: 'Marine Corps PFT calculator' },
      { tab: 'air-force-pfra', label: 'Air Force PFRA calculator' },
    ],
  },
  'air-force-pfra': {
    title: 'About the Air Force PFRA calculator',
    paragraphs: [
      'The Air Force Physical Fitness Readiness Assessment (PFRA) measures cardiorespiratory fitness, muscular strength, core endurance, and a waist-to-height body-composition component. This calculator estimates how entered results relate to published PFRA-style scoring.',
      'Typical inputs include a cardio event, a strength option (such as push-ups or hand-release push-ups), a core option (such as sit-ups, reverse crunch, or forearm plank), and waist and height for waist-to-height ratio.',
      'Interpret the result as an unofficial practice estimate for test preparation. Review component scores to see whether cardio, strength, core, or body-composition inputs are limiting the estimate.',
      'KinesoScore does not provide official military scoring. Official Air Force fitness results come only from authorized testing under current Air Force guidance.',
    ],
    relatedNote: {
      before: 'New to the assessment? ',
      tab: 'air-force-pfra-guide',
      label: 'Air Force PFRA explained',
      after: '.',
    },
    faqs: [
      {
        question: 'What does the Air Force PFRA measure?',
        answer:
          'PFRA-style scoring combines cardio performance, muscular strength, core endurance, and waist-to-height ratio into a composite readiness picture. This calculator estimates that composite for training feedback only.',
      },
      {
        question: 'Which PFRA components can I enter here?',
        answer:
          'You can enter strength and core event choices with repetitions or plank time, a cardio result, and waist and height for waist-to-height ratio. Some specialty or alternate charts may exist officially and are not all included.',
      },
      {
        question: 'How should I interpret a PFRA calculator estimate?',
        answer:
          'Use it as a prep snapshot: higher component estimates generally indicate stronger relative performance on those inputs. It is not a medical assessment and not an official fitness score of record.',
      },
      {
        question: 'Is the Air Force PFRA calculator official?',
        answer:
          'No. KinesoScore provides an educational estimate based on published PFRA-style standards. Official scores come only from authorized Air Force testing.',
      },
      {
        question: 'How can I prepare for the Air Force PFRA?',
        answer:
          'Train the cardio option you will perform, build strength and core event capacity, and track body-composition inputs that affect waist-to-height ratio. Recalculate after training blocks. Running and VO₂ Max tools can support aerobic prep.',
      },
      {
        question: 'Does age or gender affect PFRA estimates?',
        answer:
          'Yes. Age band and gender selections are part of the estimate against published tables. Confirm current Air Force standards for your age group before setting training targets.',
      },
    ],
    links: [
      { tab: 'running', label: 'Running calculator' },
      { tab: 'vo2max', label: 'VO₂ Max calculator' },
      { tab: 'air-force-pfa', label: 'Legacy Air Force PFA calculator' },
      { tab: 'army-aft', label: 'Army AFT calculator' },
    ],
  },
  'air-force-pfa': {
    title: 'About the Legacy Air Force PFA calculator',
    paragraphs: [
      'The Legacy Air Force Physical Fitness Assessment (PFA) reflects a previous Air Force fitness testing model retained here for historical comparison and long-term tracking. It is not the current PFRA assessment.',
      'Legacy-style components commonly include a 1.5-mile run, one-minute push-ups, and one-minute sit-ups. Enter age band, gender, and event results to estimate an unofficial legacy-style score.',
      'Interpret results as historical or comparative feedback — useful if you are reviewing past performance eras, not as a current Air Force record score.',
      'KinesoScore does not provide official military scoring. For current Air Force testing, use official guidance and the current PFRA calculator for educational prep estimates.',
    ],
    faqs: [
      {
        question: 'What is the Legacy Air Force PFA?',
        answer:
          'It is the earlier Air Force Physical Fitness Assessment model kept on KinesoScore for historical estimates. Current Air Force readiness testing is represented separately by the PFRA calculator.',
      },
      {
        question: 'Which events are in the legacy Air Force PFA calculator?',
        answer:
          'This calculator focuses on legacy-style 1.5-mile run, push-up, and sit-up inputs against published charts from that assessment era. Optional waist/height fields may appear for reference and are not always used by those charts.',
      },
      {
        question: 'How is the legacy PFA different from the PFRA?',
        answer:
          'PFRA is the current Air Force fitness assessment model on KinesoScore, with different components and scoring emphasis (including waist-to-height ratio). The legacy PFA page is for historical comparison, not current official testing.',
      },
      {
        question: 'Is this Air Force PFA calculator official?',
        answer:
          'No. It is an educational historical estimate only. It cannot produce an official Air Force score of record.',
      },
      {
        question: 'Who should use the legacy PFA calculator?',
        answer:
          'Use it if you need a legacy-era comparison or are tracking older saved results. For current Air Force prep, prefer the PFRA calculator and confirm requirements in official Air Force materials.',
      },
      {
        question: 'Did age and gender affect legacy PFA scoring?',
        answer:
          'Yes. Legacy estimates on this page use age-band and gender inputs with published charts from that assessment period. Always verify any historical comparison against the original official tables when accuracy matters.',
      },
    ],
    links: [
      { tab: 'air-force-pfra', label: 'Current Air Force PFRA calculator' },
    ],
  },
}

export const MILITARY_SEO_DISCLAIMER =
  'Educational estimate only — not an official service scorecard or medical advice. Always confirm with current official standards and command guidance.'

export const FITNESS_SEO_DISCLAIMER =
  'Educational benchmark tracking only — not affiliated with CrossFit, Inc. or any sanctioning body. Results are self-reported and not independently verified.'

/** Fitness Assessments (max tests + benchmark WODs) — distinct from military. */
export const FITNESS_SEO = {
  'max-pushups': {
    title: 'About the Max Push-ups test',
    paragraphs: [
      'The Max Push-ups calculator records how many push-ups you complete in 60 seconds under a consistent standard (chest to deck, lockout at the top).',
      'Use it to track upper-body pressing capacity over time. Saves stay private unless you opt in to the global leaderboard.',
    ],
    faqs: [
      {
        question: 'What counts as a valid push-up?',
        answer:
          'Use one consistent standard: chest clearly reaches the floor or a target, and elbows lock out at the top. Changing depth between attempts makes progress hard to compare.',
      },
      {
        question: 'Can I rest during the minute?',
        answer:
          'Yes — the clock keeps running. Count every valid rep completed within 60 seconds.',
      },
    ],
    relatedNote: KINESOSCORE_RELATED_NOTE,
    links: [
      { tab: 'max-pullups', label: 'Max Pull-ups calculator' },
      { tab: 'cindy', label: 'Cindy AMRAP calculator' },
      { tab: 'leaderboard', label: 'Leaderboard' },
    ],
  },
  'max-pullups': {
    title: 'About the Max Pull-ups test',
    paragraphs: [
      'The Max Pull-ups calculator records how many pull-ups you complete in 60 seconds. Chin should clearly clear the bar on each rep.',
      'Note whether you use strict or kipping pull-ups and keep that style consistent when tracking progress or sharing to the leaderboard.',
    ],
    faqs: [
      {
        question: 'Strict or kipping?',
        answer:
          'Either can be tracked, but do not mix styles on the same progress graph if you want clean comparisons. Pick one standard and stick with it.',
      },
      {
        question: 'What if I use bands or assistance?',
        answer:
          'Treat assisted work as Scaled training notes in your own log. This board is intended for unassisted pull-ups.',
      },
    ],
    relatedNote: KINESOSCORE_RELATED_NOTE,
    links: [
      { tab: 'max-pushups', label: 'Max Push-ups calculator' },
      { tab: 'fran', label: 'Fran calculator' },
      { tab: 'murph', label: 'Murph calculator' },
    ],
  },
  fran: {
    title: 'About Fran',
    paragraphs: [
      'Fran is a classic for-time couplet: 21-15-9 thrusters and pull-ups. KinesoScore stores finish time and keeps Rx vs Scaled on separate boards.',
      'Gender selects which commonly published Rx thruster load to display (95 lb male / 65 lb female). This is educational tracking only — not an official competition scorecard.',
    ],
    faqs: [
      {
        question: 'What is Rx for Fran?',
        answer:
          'Commonly published Rx uses 95 lb thrusters for male athletes and 65 lb for female athletes, plus pull-ups. Confirm bar loading before you start.',
      },
      {
        question: 'Why separate Rx and Scaled?',
        answer:
          'Mixing prescriptions on one leaderboard is unfair. Choose Rx or Scaled when you save so history and public ranks stay comparable.',
      },
    ],
    relatedNote: {
      before: 'New to the workout? ',
      tab: 'fran-guide',
      label: 'What is Fran?',
      after: ' — including what a thruster is.',
    },
    links: [
      { tab: 'fran-guide', label: 'What is Fran?' },
      { tab: 'cindy', label: 'Cindy calculator' },
      { tab: 'murph', label: 'Murph calculator' },
      { tab: 'max-pullups', label: 'Max Pull-ups calculator' },
    ],
  },
  murph: {
    title: 'About Murph',
    paragraphs: [
      'Murph is a for-time benchmark: 1-mile run, 100 pull-ups, 200 push-ups, 300 air squats, 1-mile run. Partitioning the calisthenics is allowed.',
      'Rx commonly includes a weighted vest (often 20 lb male / 14 lb female). Log Rx and Scaled separately for fair comparisons.',
    ],
    faqs: [
      {
        question: 'Do I have to wear a vest for Rx?',
        answer:
          'Commonly published Rx includes a vest. If you perform Murph without a vest or with reduced volume, save as Scaled.',
      },
      {
        question: 'Can I partition the pull-ups, push-ups, and squats?',
        answer:
          'Yes — partitioning is part of the classic standard. Record your total finish time when the final mile is complete.',
      },
    ],
    relatedNote: {
      before: 'New to the workout? ',
      tab: 'murph-guide',
      label: 'What is Murph?',
      after: '.',
    },
    links: [
      { tab: 'murph-guide', label: 'What is Murph?' },
      { tab: 'fran', label: 'Fran calculator' },
      { tab: 'cindy', label: 'Cindy calculator' },
      { tab: 'max-pushups', label: 'Max Push-ups calculator' },
    ],
  },
  cindy: {
    title: 'About Cindy',
    paragraphs: [
      'Cindy is a 20-minute AMRAP of 5 pull-ups, 10 push-ups, and 15 air squats. Enter full rounds plus leftover reps into the next round.',
      'Leaderboard ranking uses total work reps (each round = 30 reps). That keeps “12 + 8” comparable to “13 + 0” without ambiguity.',
    ],
    faqs: [
      {
        question: 'How are leftover reps counted?',
        answer:
          'After finishing full rounds, count reps in order: pull-ups, then push-ups, then squats. Enter that leftover count as Extra reps (0–29).',
      },
      {
        question: 'Why total work reps for ranking?',
        answer:
          'Encoding rounds × 30 + extras creates one higher-is-better number so leaderboard order matches completed work.',
      },
    ],
    relatedNote: {
      before: 'New to the workout? ',
      tab: 'cindy-guide',
      label: 'What is Cindy?',
      after: '.',
    },
    links: [
      { tab: 'cindy-guide', label: 'What is Cindy?' },
      { tab: 'fran', label: 'Fran calculator' },
      { tab: 'max-pullups', label: 'Max Pull-ups calculator' },
      { tab: 'max-pushups', label: 'Max Push-ups calculator' },
    ],
  },
}

export const HOME_SEO_TAGLINE =
  'KinesoScore is a comprehensive fitness performance platform combining strength, endurance, fitness assessment standards, and an intuitive myKinesoScore™. Measure where you are — Improve where you\'re going.'

/** Public Leaderboard page SEO copy (Stage 6). */
export const LEADERBOARD_SEO = {
  title: 'About the KinesoScore leaderboard',
  paragraphs: [
    'Global rankings from results athletes choose to share — self-reported community comparisons, not independently verified scores, and not a feed of every private save.',
    'Browse myKinesoScore™, running, strength, fitness assessments, military assessments, and Habit Streaks. Performance boards support All Time and This Week (UTC); Habit Streaks use All Time only.',
    'Create a Leaderboard Name in Account Settings, then opt in when saving an eligible result (or share your streak from Habits). Private history stays private by default.',
  ],
  faqs: [
    {
      question: 'Who appears on the KinesoScore leaderboard?',
      answer:
        'Only athletes who create a Leaderboard Name and choose to share an eligible result. Public rows show a Leaderboard Name and the shared performance value — not email or legal name. Values are self-reported and not independently verified.',
    },
    {
      question: 'What is the difference between All Time and This Week?',
      answer:
        'All Time ranks eligible active shares across history for that performance board. This Week is the current UTC calendar week (Monday 00:00 UTC through the following Monday): anything shared during that window appears on both boards, then drops off This Week when the UTC week ends while All Time keeps it. Habit Streaks are All Time only. Athletes may also opt in to show Strength/Running medal tiers (and Crown) next to their Leaderboard Name — never raw scores.',
    },
    {
      question: 'Do private calculator saves appear on the leaderboard?',
      answer:
        'No. Saves remain private unless you opt in to share globally. You can keep using every calculator without joining the leaderboard.',
    },
    {
      question: 'What do Habit Streaks show?',
      answer:
        'Habit Streaks list athletes who opt in from Habits. Public rows show a Leaderboard Name and current streak only — never which habits you track or your check-in history. Habit Streaks use All Time (current streak), not This Week.',
    },
  ],
  relatedNote: {
    before: 'Eligible shared results often come from calculators such as ',
    tab: 'scoring',
    label: 'myKinesoScore™',
    after:
      '. Add a Leaderboard Name in Account Settings before opting in to share globally.',
  },
}

/** Educational landing page for /one-rep-max (not the calculator). */
export const ONE_REP_MAX_SEO = {
  eyebrow: 'Strength education',
  heroTitle: 'What Is a One-Rep Max?',
  heroLead:
    'A one-rep max (1RM) is the heaviest load you can lift once with solid form — a simple way to measure and track strength.',
  heroSupport:
    'You can test a true 1RM carefully, or estimate it from a submaximal set using formulas like Epley. KinesoScore uses that estimate for bench, squat, deadlift, and SBD total.',
  ctaTab: 'strength',
  ctaLabel: 'Open the 1RM calculator',
  sections: [
    {
      id: 'what-is-1rm',
      title: 'What a one-rep max measures',
      paragraphs: [
        'One-rep max is a practical strength yardstick for a specific lift. Lifters use it to set training loads (for example percentages of 1RM), compare sessions over time, and see whether strength is improving independently of bodyweight or race fitness.',
        '1RM is lift-specific: your bench 1RM and squat 1RM answer different questions. An SBD total (squat + bench + deadlift) summarizes overall barbell strength when you want one combined number.',
      ],
    },
    {
      id: 'epley-formula',
      title: 'How the Epley formula estimates 1RM',
      paragraphs: [
        'Testing a true max every week is hard on recovery. Submaximal formulas estimate 1RM from a weight you can lift for several reps. KinesoScore uses the Epley equation: 1RM ≈ weight × (1 + reps ÷ 30).',
        'Example: 225 lb for 5 reps → 225 × (1 + 5/30) ≈ 262 lb. The estimate works best on moderate rep ranges; very high-rep sets are less reliable for max strength.',
        'You can also enter a known tested 1RM directly when you already have one. Estimates are tools for planning and tracking — not a guarantee of a successful single attempt.',
      ],
    },
    {
      id: 'when-to-use',
      title: 'When to estimate vs test',
      paragraphs: [
        'Estimate from a hard but clean set when you want a quick progress check without a max-out session. Retest a true 1RM less often, with good warm-ups and conservative jumps, especially on squat and deadlift.',
        'Add bodyweight if you want a relative strength ratio (1RM ÷ bodyweight) and a recreational strength level. Age and gender unlock peer comparison against recreational lifter norms on KinesoScore.',
      ],
    },
    {
      id: 'use-with-kinesoscore',
      title: 'Use it on KinesoScore',
      paragraphs: [
        'Open the Strength calculator to estimate bench, squat, or deadlift 1RM, or build an SBD total. Save results when signed in to watch lifts move over time, then optionally combine strength with a race result in myKinesoScore™.',
      ],
    },
  ],
  faqTitle: 'One-rep max FAQs',
  faqs: [
    {
      question: 'What is a one-rep max (1RM)?',
      answer:
        'A one-rep max is the heaviest weight you can lift once with acceptable technique for a given exercise. It is a common way to measure absolute strength and prescribe training intensities.',
    },
    {
      question: 'How does the Epley 1RM formula work?',
      answer:
        'Epley estimates 1RM as weight × (1 + reps ÷ 30). For example, 225 lb for 5 reps estimates about 262 lb. KinesoScore uses this for submaximal sets and also lets you enter a known 1RM.',
    },
    {
      question: 'Is an estimated 1RM as accurate as a tested max?',
      answer:
        'Estimates are convenient and usually close for moderate reps, but they are still estimates. Technique, fatigue, and high-rep sets can widen the gap. Use them for training guidance; confirm with a careful test when the exact number matters.',
    },
    {
      question: 'What is an SBD total?',
      answer:
        'SBD Total is squat + bench press + deadlift one-rep maxes added together. It summarizes overall barbell strength across the three main lifts.',
    },
  ],
  relatedNote: {
    before: 'Ready to run the numbers? ',
    tab: 'strength',
    label: 'Open the Strength / 1RM calculator',
    after: '.',
  },
  links: [
    { tab: 'scoring', label: 'myKinesoScore™ calculator' },
    { tab: 'sources-methodology', label: 'Sources & Methodology' },
  ],
  disclaimer:
    '1RM estimates are educational training tools, not medical advice. Lift safely and stop if form breaks down.',
}

/** Educational landing page for /fran-guide (not the calculator). */
export const FRAN_GUIDE_SEO = {
  eyebrow: 'Fitness Assessments',
  heroTitle: 'What Is Fran?',
  heroLead:
    'Fran is a classic for-time workout: 21-15-9 thrusters and pull-ups. Finish as fast as you can with solid movement standards.',
  heroSupport:
    'This guide explains the format, what a thruster is, and common Rx loads — then you can log your time on the Fran calculator. Educational tracking only; not affiliated with CrossFit, Inc.',
  ctaTab: 'fran',
  ctaLabel: 'Open the Fran calculator',
  sections: [
    {
      id: 'fran-format',
      title: 'The workout format',
      paragraphs: [
        'Fran is a couplet (two movements) done for time. You complete 21 thrusters and 21 pull-ups, then 15 of each, then 9 of each. The clock starts on your first rep and stops when you finish the last pull-up.',
        'Faster finish times are better. On KinesoScore, Rx and Scaled saves go to separate history and leaderboard boards so comparisons stay fair.',
      ],
    },
    {
      id: 'what-is-thruster',
      title: 'What is a thruster?',
      paragraphs: [
        'A thruster is a front squat that turns into a push press in one continuous motion. The bar starts in the front-rack (resting on your shoulders), you squat below parallel, then stand and drive the bar overhead to full lockout — no pause at the shoulders on the way up.',
        'Think “squat + press glued together.” If you are new to the movement, practice light thrusters first so depth and overhead lockout stay consistent when you test Fran.',
      ],
    },
    {
      id: 'fran-rx',
      title: 'Common Rx loads',
      paragraphs: [
        'Commonly published Rx uses a barbell thruster at 95 lb for male athletes and 65 lb for female athletes, plus pull-ups with the chin clearly over the bar.',
        'Scaled usually means a lighter bar and/or jumping pull-ups or ring rows. Choose Rx or Scaled when you save so your progress graph and any public share match the prescription you actually did.',
      ],
    },
  ],
  faqTitle: 'Fran FAQs',
  faqs: [
    {
      question: 'Do I have to alternate every rep?',
      answer:
        'No. Within each round (21, then 15, then 9) you complete all thrusters before all pull-ups — or break them into sets — as long as you finish the prescribed reps of both movements before moving to the next round.',
    },
    {
      question: 'What is a good Fran time?',
      answer:
        'It depends on experience and prescription. Beginners often finish in several minutes; competitive athletes can go much faster. Use your own history on KinesoScore rather than chasing someone else’s highlight time.',
    },
    {
      question: 'Is this an official CrossFit scorecard?',
      answer:
        'No. KinesoScore is educational benchmark tracking only and is not affiliated with CrossFit, Inc. or any sanctioning body.',
    },
  ],
  relatedNote: {
    before: 'Ready to log a finish time? ',
    tab: 'fran',
    label: 'Open the Fran calculator',
    after: '.',
  },
  links: [
    { tab: 'murph-guide', label: 'What is Murph?' },
    { tab: 'cindy-guide', label: 'What is Cindy?' },
    { tab: 'max-pullups', label: 'Max Pull-ups calculator' },
  ],
  disclaimer: FITNESS_SEO_DISCLAIMER,
}

/** Educational landing page for /murph-guide (not the calculator). */
export const MURPH_GUIDE_SEO = {
  eyebrow: 'Fitness Assessments',
  heroTitle: 'What Is Murph?',
  heroLead:
    'Murph is a long for-time benchmark: a mile run, 100 pull-ups, 200 push-ups, 300 air squats, and another mile run.',
  heroSupport:
    'Named in honor of Navy Lieutenant Michael P. Murphy, it is often done on Memorial Day. This guide covers the format, partitioning, and vest notes — then you can track your time on KinesoScore. Educational use only; not an official event scorecard.',
  ctaTab: 'murph',
  ctaLabel: 'Open the Murph calculator',
  sections: [
    {
      id: 'murph-format',
      title: 'The workout format',
      paragraphs: [
        'Start with a 1-mile run, then complete 100 pull-ups, 200 push-ups, and 300 air squats, then finish with another 1-mile run. The clock runs from the first step of the opening mile until you finish the closing mile.',
        'It is a grind more than a sprint. Pace the runs and break the calisthenics into manageable sets so form does not collapse mid-workout.',
      ],
    },
    {
      id: 'murph-partition',
      title: 'Partitioning the middle',
      paragraphs: [
        'You may partition the pull-ups, push-ups, and squats — for example rounds of 5 / 10 / 15, or any other split — instead of doing all 100 pull-ups unbroken before any push-ups.',
        'Partitioning is part of the classic standard. Record your total finish time when the final mile is complete, not when the last squat finishes.',
      ],
    },
    {
      id: 'murph-rx',
      title: 'Rx vest and Scaled',
      paragraphs: [
        'Commonly published Rx includes a weighted vest — often about 20 lb for male athletes and 14 lb for female athletes — worn for the whole workout.',
        'If you go without a vest or reduce volume, save as Scaled on KinesoScore so Rx and Scaled stay on separate boards.',
      ],
    },
  ],
  faqTitle: 'Murph FAQs',
  faqs: [
    {
      question: 'How long does Murph usually take?',
      answer:
        'Many athletes finish between roughly 40 and 90+ minutes depending on fitness, heat, vest, and partitioning. Use Hr / Min / Sec on the calculator if you go over an hour.',
    },
    {
      question: 'Do pull-ups have to be strict?',
      answer:
        'Pick a standard you can repeat. Kipping is common in this workout; if you track progress over time, keep the same style so comparisons stay honest.',
    },
    {
      question: 'Is KinesoScore an official Murph scorecard?',
      answer:
        'No. Results are self-reported educational tracking only and are not affiliated with CrossFit, Inc. or any sanctioning body.',
    },
  ],
  relatedNote: {
    before: 'Ready to log a finish time? ',
    tab: 'murph',
    label: 'Open the Murph calculator',
    after: '.',
  },
  links: [
    { tab: 'fran-guide', label: 'What is Fran?' },
    { tab: 'cindy-guide', label: 'What is Cindy?' },
    { tab: 'max-pushups', label: 'Max Push-ups calculator' },
  ],
  disclaimer: FITNESS_SEO_DISCLAIMER,
}

/** Educational landing page for /cindy-guide (not the calculator). */
export const CINDY_GUIDE_SEO = {
  eyebrow: 'Fitness Assessments',
  heroTitle: 'What Is Cindy?',
  heroLead:
    'Cindy is a 20-minute AMRAP: as many rounds as possible of 5 pull-ups, 10 push-ups, and 15 air squats.',
  heroSupport:
    'AMRAP means you keep cycling the same three movements until the clock hits 20:00. This guide explains scoring and leftover reps — then you can log results on the Cindy calculator. Educational tracking only.',
  ctaTab: 'cindy',
  ctaLabel: 'Open the Cindy calculator',
  sections: [
    {
      id: 'cindy-format',
      title: 'The workout format',
      paragraphs: [
        'Set a 20-minute clock. Each round is 5 pull-ups, then 10 push-ups, then 15 air squats. When you finish a round, start the next immediately. Count full rounds completed plus any leftover reps into the next round when time expires.',
        'Unlike Fran or Murph, Cindy is not scored by finish time — more work in 20 minutes is better.',
      ],
    },
    {
      id: 'cindy-scoring',
      title: 'How leftover reps work',
      paragraphs: [
        'After your last full round, keep going in order: pull-ups, then push-ups, then squats. When the buzzer sounds, count how many reps you completed into that incomplete round (0–29).',
        'KinesoScore ranks Cindy by total work reps: each full round counts as 30 reps (5 + 10 + 15), plus your leftover extras. That makes “12 + 8” comparable to “13 + 0” without ambiguity.',
      ],
    },
    {
      id: 'cindy-standards',
      title: 'Movement standards',
      paragraphs: [
        'Pull-ups: chin clearly over the bar. Push-ups: chest to deck (or a consistent target) and lockout at the top. Air squats: hips below parallel, stand to full extension.',
        'Keep the same standards every attempt. Scaled substitutions (for example jumping pull-ups or knee push-ups) are fine for training — note them for yourself and stay consistent when comparing sessions.',
      ],
    },
  ],
  faqTitle: 'Cindy FAQs',
  faqs: [
    {
      question: 'What is a good Cindy score?',
      answer:
        'It varies widely with experience. Many athletes land somewhere in the teens of rounds; elite scores go higher. Track your own rounds + reps over time on KinesoScore.',
    },
    {
      question: 'Can I rest during the 20 minutes?',
      answer:
        'Yes. The clock keeps running. Strategy is often short sets with brief rests so you keep moving for the full window.',
    },
    {
      question: 'Is this an official CrossFit scorecard?',
      answer:
        'No. KinesoScore is educational benchmark tracking only and is not affiliated with CrossFit, Inc. or any sanctioning body.',
    },
  ],
  relatedNote: {
    before: 'Ready to log rounds and reps? ',
    tab: 'cindy',
    label: 'Open the Cindy calculator',
    after: '.',
  },
  links: [
    { tab: 'fran-guide', label: 'What is Fran?' },
    { tab: 'murph-guide', label: 'What is Murph?' },
    { tab: 'max-pullups', label: 'Max Pull-ups calculator' },
  ],
  disclaimer: FITNESS_SEO_DISCLAIMER,
}

/** Educational landing page for /army-aft-guide (not the calculator). */
export const ARMY_AFT_GUIDE_SEO = {
  eyebrow: 'Military Assessments',
  heroTitle: 'Army AFT Explained',
  heroLead:
    'A plain-language overview of the Army Fitness Test — events, scoring estimates, and how to use KinesoScore for unofficial training prep.',
  heroSupport:
    'This guide is educational. Official record scores come only from authorized Army testing under current guidance — not from any website calculator.',
  ctaTab: 'army-aft',
  ctaLabel: 'Open the Army AFT calculator',
  sections: [
    {
      id: 'what-is-aft',
      title: 'What the Army Fitness Test is',
      paragraphs: [
        'The Army Fitness Test (AFT) is the Army’s physical readiness assessment for soldiers. It samples strength, muscular endurance, power-endurance, and aerobic capacity across a short set of events rather than a single run or push-up test.',
        'People still search for “ACFT” because the Army Combat Fitness Test was the prior widely used name. Event lists and standards can change — always confirm the latest official Army materials for your component and duty requirements.',
      ],
    },
    {
      id: 'aft-events',
      title: 'Events covered in the KinesoScore calculator',
      paragraphs: [
        'The free Army AFT calculator on KinesoScore estimates the common general-standard event set: 3-rep max deadlift, hand-release push-ups, Sprint-Drag-Carry, plank, and 2-mile run.',
        'You select age band and gender, enter each result, and review an unofficial event-by-event and total estimate. Specialty or alternate standards in official guidance may not all appear here.',
      ],
    },
    {
      id: 'how-scoring-works',
      title: 'How scoring estimates work',
      paragraphs: [
        'Published age- and gender-normed tables map event performances to points. KinesoScore uses those tables to return a practice estimate so you can see which events limit your total.',
        'Weak events usually matter as much as the headline score. Use the breakdown to prioritize training — for example deadlift strength work, plank capacity, or 2-mile pacing — then retest after a training block.',
      ],
    },
    {
      id: 'prep-tips',
      title: 'Using the calculator for prep',
      paragraphs: [
        'Treat every result as training feedback, not a record score. Log practice attempts under similar conditions when you can, and pair the AFT page with the Strength and Running calculators for supporting lift and aerobic tracking.',
        'KinesoScore is not an Army scorecard and not a Department of the Army product. Official results come only from authorized testing.',
      ],
    },
  ],
  faqTitle: 'Army AFT FAQs',
  faqs: [
    {
      question: 'Is Army AFT the same as ACFT?',
      answer:
        'ACFT (Army Combat Fitness Test) was the prior widely used name. The current test discussed here is the Army Fitness Test (AFT). Standards can change — verify official Army sources. KinesoScore estimates AFT-style performance for education and training prep only.',
    },
    {
      question: 'What events does the Army AFT calculator include?',
      answer:
        'The calculator covers 3-rep max deadlift, hand-release push-ups, Sprint-Drag-Carry, plank, and 2-mile run for general-standard estimates. Official specialty or alternate events may exist outside this tool.',
    },
    {
      question: 'Is the KinesoScore Army AFT calculator official?',
      answer:
        'No. It is an educational training tool — not an Army scorecard, not a substitute for record testing, and not an official Department of the Army product.',
    },
    {
      question: 'How should I use the estimate for training?',
      answer:
        'Retest after training blocks, note limiting events, and focus practice there. Pair with Strength and Running calculators for supporting lift and aerobic progress.',
    },
  ],
  relatedNote: {
    before: 'Ready to estimate a practice score? ',
    tab: 'army-aft',
    label: 'Open the Army AFT calculator',
    after: '.',
  },
  links: [
    { tab: 'strength', label: 'Strength calculator' },
    { tab: 'running', label: 'Running calculator' },
    { tab: 'sources-methodology', label: 'Sources & Methodology' },
  ],
  disclaimer:
    'Army AFT estimates on KinesoScore are educational training tools only — not official scores or medical advice.',
}

/** Educational landing page for /air-force-pfra-guide (not the calculator). */
export const AIR_FORCE_PFRA_GUIDE_SEO = {
  eyebrow: 'Military Assessments',
  heroTitle: 'Air Force PFRA Explained',
  heroLead:
    'A plain-language overview of the Air Force Physical Fitness Readiness Assessment — components, scoring estimates, and how to use KinesoScore for unofficial training prep.',
  heroSupport:
    'This guide is educational. Official record scores come only from authorized Air Force testing under current guidance — not from any website calculator.',
  ctaTab: 'air-force-pfra',
  ctaLabel: 'Open the Air Force PFRA calculator',
  sections: [
    {
      id: 'what-is-pfra',
      title: 'What the Air Force PFRA is',
      paragraphs: [
        'The Physical Fitness Readiness Assessment (PFRA) is the Air Force’s current fitness assessment model on KinesoScore. It blends cardiorespiratory fitness, muscular strength, core endurance, and a waist-to-height body-composition component into one readiness picture.',
        'Exact event choices and charts can change. Always confirm the latest official Air Force materials for your age group and duty requirements.',
      ],
    },
    {
      id: 'pfra-components',
      title: 'Components covered in the KinesoScore calculator',
      paragraphs: [
        'The free PFRA calculator estimates common general-standard inputs: a cardio result, a strength option (such as push-ups or hand-release push-ups), a core option (such as sit-ups, reverse crunch, or forearm plank), and waist plus height for waist-to-height ratio.',
        'You select age band and gender, enter each result, and review an unofficial component and composite estimate for training feedback.',
      ],
    },
    {
      id: 'how-scoring-works',
      title: 'How scoring estimates work',
      paragraphs: [
        'Published age- and gender-normed tables map component performances to points within a composite model. KinesoScore uses those tables to return a practice estimate so you can see which components limit your total.',
        'Use the breakdown to prioritize training — for example cardio pacing, strength-endurance volume, core capacity, or body-composition habits — then retest after a training block.',
      ],
    },
    {
      id: 'prep-tips',
      title: 'Using the calculator for prep',
      paragraphs: [
        'Treat every result as training feedback, not a record score. Pair the PFRA page with the Running and VO₂ Max calculators for aerobic context, and use Strength tools when upper-body capacity is limiting.',
        'KinesoScore is not an Air Force scorecard and not a Department of the Air Force product. Official results come only from authorized testing.',
      ],
    },
  ],
  faqTitle: 'Air Force PFRA FAQs',
  faqs: MILITARY_SEO['air-force-pfra'].faqs,
  relatedNote: {
    before: 'Ready to estimate a practice score? ',
    tab: 'air-force-pfra',
    label: 'Open the Air Force PFRA calculator',
    after: '.',
  },
  links: [
    { tab: 'air-force-pfa', label: 'Legacy Air Force PFA calculator' },
    { tab: 'running', label: 'Running calculator' },
    { tab: 'sources-methodology', label: 'Sources & Methodology' },
  ],
  disclaimer: MILITARY_SEO_DISCLAIMER,
}

/** Educational landing page for /marine-pft-guide (not the calculator). */
export const MARINE_PFT_GUIDE_SEO = {
  eyebrow: 'Military Assessments',
  heroTitle: 'Marine Corps PFT Explained',
  heroLead:
    'A plain-language overview of the Marine Corps Physical Fitness Test — events, scoring estimates, and how to use KinesoScore for unofficial training prep.',
  heroSupport:
    'This guide is educational. Official record scores come only from authorized Marine Corps testing under current guidance — not from any website calculator.',
  ctaTab: 'marine-pft',
  ctaLabel: 'Open the Marine Corps PFT calculator',
  sections: [
    {
      id: 'what-is-pft',
      title: 'What the Marine Corps PFT is',
      paragraphs: [
        'The Marine Corps Physical Fitness Test (PFT) measures upper-body strength or endurance, core endurance, and aerobic fitness across a short event set rather than a single run.',
        'Standards and event options can change. Always confirm the latest official Marine Corps materials for your age group and testing requirements.',
      ],
    },
    {
      id: 'pft-events',
      title: 'Events covered in the KinesoScore calculator',
      paragraphs: [
        'The free Marine PFT calculator estimates the common event set: pull-ups or push-ups, a forearm plank, and a 3-mile run.',
        'You select age band and gender, choose the upper-body option you performed, enter reps and times, and review an unofficial event-by-event and total estimate.',
      ],
    },
    {
      id: 'how-scoring-works',
      title: 'How scoring estimates work',
      paragraphs: [
        'Published age- and gender-normed tables map event performances to points. KinesoScore uses those tables to return a practice estimate so you can see which events limit your total.',
        'Weak events usually matter as much as the headline score. Use the breakdown to prioritize pull-up or push-up volume, plank capacity, or 3-mile pacing.',
      ],
    },
    {
      id: 'prep-tips',
      title: 'Using the calculator for prep',
      paragraphs: [
        'Treat every result as training feedback, not a record score. Pair the Marine PFT page with the Running and Strength calculators for supporting aerobic and upper-body tracking.',
        'KinesoScore is not a USMC scorecard and not an official Marine Corps product. Official results come only from authorized testing.',
      ],
    },
  ],
  faqTitle: 'Marine Corps PFT FAQs',
  faqs: MILITARY_SEO['marine-pft'].faqs,
  relatedNote: {
    before: 'Ready to estimate a practice score? ',
    tab: 'marine-pft',
    label: 'Open the Marine Corps PFT calculator',
    after: '.',
  },
  links: [
    { tab: 'running', label: 'Running calculator' },
    { tab: 'army-aft-guide', label: 'Army AFT explained' },
    { tab: 'sources-methodology', label: 'Sources & Methodology' },
  ],
  disclaimer: MILITARY_SEO_DISCLAIMER,
}

/** Educational landing page for /navy-prt-guide (not the calculator). */
export const NAVY_PRT_GUIDE_SEO = {
  eyebrow: 'Military Assessments',
  heroTitle: 'Navy PRT Explained',
  heroLead:
    'A plain-language overview of the Navy Physical Readiness Test — events, scoring estimates, and how to use KinesoScore for unofficial training prep.',
  heroSupport:
    'This guide is educational. Official record scores come only from authorized Navy testing under current guidance — not from any website calculator.',
  ctaTab: 'navy-prt',
  ctaLabel: 'Open the Navy PRT calculator',
  sections: [
    {
      id: 'what-is-prt',
      title: 'What the Navy PRT is',
      paragraphs: [
        'The Navy Physical Readiness Test (PRT) measures muscular endurance and aerobic readiness for sailors across a short common event set.',
        'Alternate cardio options and standards can change. Always confirm the latest official Navy physical readiness materials for your age group and testing cycle.',
      ],
    },
    {
      id: 'prt-events',
      title: 'Events covered in the KinesoScore calculator',
      paragraphs: [
        'The free Navy PRT calculator estimates the common trio of push-ups, a forearm plank, and a 1.5-mile run.',
        'You select age band and gender, enter each result, and review an unofficial event-by-event and combined estimate for readiness prep.',
      ],
    },
    {
      id: 'how-scoring-works',
      title: 'How scoring estimates work',
      paragraphs: [
        'Published age- and gender-normed tables map event performances to points. KinesoScore uses those tables to return a practice estimate so you can see which events limit your total.',
        'Use the breakdown to prioritize push-up capacity, plank holds, or 1.5-mile pacing — then retest after a training block.',
      ],
    },
    {
      id: 'prep-tips',
      title: 'Using the calculator for prep',
      paragraphs: [
        'Treat every result as training feedback, not a fitness report entry. Pair the Navy PRT page with the Running calculator for aerobic progress between attempts.',
        'KinesoScore is not a Navy Human Resources tool and not an official Department of the Navy product. Official results come only from authorized testing.',
      ],
    },
  ],
  faqTitle: 'Navy PRT FAQs',
  faqs: MILITARY_SEO['navy-prt'].faqs,
  relatedNote: {
    before: 'Ready to estimate a practice score? ',
    tab: 'navy-prt',
    label: 'Open the Navy PRT calculator',
    after: '.',
  },
  links: [
    { tab: 'running', label: 'Running calculator' },
    { tab: 'marine-pft-guide', label: 'Marine Corps PFT explained' },
    { tab: 'sources-methodology', label: 'Sources & Methodology' },
  ],
  disclaimer: MILITARY_SEO_DISCLAIMER,
}

/** Educational landing page for /vo2max-guide (not the calculator). */
export const VO2_MAX_GUIDE_SEO = {
  eyebrow: 'Aerobic fitness',
  heroTitle: 'What Is VO₂ Max?',
  heroLead:
    'VO₂ max estimates how much oxygen your body can use during hard exercise — a core marker of cardiorespiratory fitness.',
  heroSupport:
    'You can measure it in a lab, or estimate it from field tests such as the Cooper 12-minute run or Rockport 1-mile walk. KinesoScore uses those field tests and age–sex norms to put your number in context.',
  ctaTab: 'vo2max',
  ctaLabel: 'Open the VO₂ max calculator',
  sections: [
    {
      id: 'what-is-vo2',
      title: 'What VO₂ max measures',
      paragraphs: [
        'VO₂ max is maximal oxygen uptake — roughly how much oxygen (milliliters per kilogram of bodyweight per minute) you can use when working near your limit. Higher values usually mean a stronger aerobic engine for running, sports, and daily capacity.',
        'It is one of the most studied fitness markers, but it is still a number in context: age, sex, training history, and how the test was done all matter when you interpret a result.',
      ],
    },
    {
      id: 'field-tests',
      title: 'Cooper and Rockport field tests',
      paragraphs: [
        'Lab tests with metabolic carts are the gold standard. Field tests estimate VO₂ max from a timed effort you can do outdoors or on a track.',
        'The Cooper 12-minute run estimates VO₂ from distance covered in 12 minutes. The Rockport 1-mile walk uses finish time, ending heart rate, age, sex, and bodyweight. KinesoScore supports both so you can pick the protocol that fits your current fitness.',
      ],
    },
    {
      id: 'good-vo2',
      title: 'What is a “good” VO₂ max?',
      paragraphs: [
        'There is no single good score for everyone. Cooper Institute / ACSM-style tables compare adults by age and sex. Values near the 50th percentile are roughly average for that group; the 75th percentile and above are typically good to excellent.',
        'Use percentiles to track your own progress over months, not to chase someone else’s number. Save estimates on KinesoScore to see whether your aerobic fitness is rising.',
      ],
    },
    {
      id: 'use-with-kinesoscore',
      title: 'Use it on KinesoScore',
      paragraphs: [
        'Open the VO₂ max calculator to run Cooper or Rockport, compare with age–sex norms, and save results when signed in. Carry a VO₂ estimate into Fitness Age for a cardiorespiratory fitness-age view, or pair it with Running and myKinesoScore™ for a fuller picture.',
      ],
    },
  ],
  faqTitle: 'VO₂ max FAQs',
  faqs: [
    {
      question: 'What is VO₂ max?',
      answer:
        'VO₂ max is maximal oxygen uptake — an estimate of how much oxygen your body can use during intense exercise. It is a common marker of cardiorespiratory fitness, usually reported in ml/kg/min.',
    },
    {
      question: 'How does KinesoScore estimate VO₂ max?',
      answer:
        'KinesoScore estimates VO₂ max from the Cooper 12-minute run or the Rockport 1-mile walk field test, then optionally compares the result with age- and sex-based reference percentiles.',
    },
    {
      question: 'What is a good VO₂ max?',
      answer:
        'A good VO₂ max depends on age and sex. Near the 50th percentile is roughly average for your group; the 75th percentile and above are typically considered good to excellent on Cooper Institute / ACSM-style tables.',
    },
    {
      question: 'Is a field-test VO₂ the same as a lab test?',
      answer:
        'Field tests are practical estimates, not metabolic-cart lab measurements. They are useful for training feedback and trends, but conditions, pacing, and effort can affect accuracy.',
    },
  ],
  relatedNote: {
    before: 'Ready to estimate yours? ',
    tab: 'vo2max',
    label: 'Open the VO₂ max calculator',
    after: '.',
  },
  links: [
    { tab: 'fitness-age', label: 'Fitness Age calculator' },
    { tab: 'running', label: 'Running calculator' },
    { tab: 'sources-methodology', label: 'Sources & Methodology' },
  ],
  disclaimer:
    'VO₂ max estimates are educational fitness tools, not medical advice or clinical diagnostics.',
}

/** FAQs attached to document JSON-LD by App tab / PAGE_SEO key. */
export const PAGE_FAQS_BY_TAB = {
  home: [
    {
      question: 'How does KinesoScore compare fitness performance?',
      answer:
        'KinesoScore combines transparent calculators for strength (including Epley 1RM and SBD total), running, VO₂ max, fitness age, BMI/BMR, and military assessments (Army AFT, Marine PFT, Navy PRT, Air Force PFRA/PFA). The overall myKinesoScore™ averages strength and running percentiles against published recreational norms.',
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
  'one-rep-max': ONE_REP_MAX_SEO.faqs,
  'army-aft-guide': ARMY_AFT_GUIDE_SEO.faqs,
  'air-force-pfra-guide': AIR_FORCE_PFRA_GUIDE_SEO.faqs,
  'marine-pft-guide': MARINE_PFT_GUIDE_SEO.faqs,
  'navy-prt-guide': NAVY_PRT_GUIDE_SEO.faqs,
  acft: MILITARY_SEO['army-aft'].faqs,
  '1rm': STRENGTH_SEO.faqs,
  'vo2max-guide': VO2_MAX_GUIDE_SEO.faqs,
  'fran-guide': FRAN_GUIDE_SEO.faqs,
  'murph-guide': MURPH_GUIDE_SEO.faqs,
  'cindy-guide': CINDY_GUIDE_SEO.faqs,
  vo2max: VO2_SEO.faqs,
  'fitness-age': FITNESS_AGE_SEO.faqs,
  'army-aft': MILITARY_SEO['army-aft'].faqs,
  'marine-pft': MILITARY_SEO['marine-pft'].faqs,
  'navy-prt': MILITARY_SEO['navy-prt'].faqs,
  'air-force-pfra': MILITARY_SEO['air-force-pfra'].faqs,
  'air-force-pfa': MILITARY_SEO['air-force-pfa'].faqs,
  'max-pushups': FITNESS_SEO['max-pushups'].faqs,
  'max-pullups': FITNESS_SEO['max-pullups'].faqs,
  fran: FITNESS_SEO.fran.faqs,
  murph: FITNESS_SEO.murph.faqs,
  cindy: FITNESS_SEO.cindy.faqs,
  leaderboard: LEADERBOARD_SEO.faqs,
}
