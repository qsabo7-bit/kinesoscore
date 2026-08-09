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
    after: ', or start from a race time.',
  },
  links: [{ tab: 'running', label: 'Running calculator' }],
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

export const HOME_SEO_TAGLINE =
  'KinesoScore is a comprehensive fitness performance platform combining strength, endurance, fitness assessment standards, and an intuitive myKinesoScore™. Measure where you are — Improve where you\'re going.'

/** Public Leaderboard page SEO copy (Stage 6). */
export const LEADERBOARD_SEO = {
  title: 'About the KinesoScore leaderboard',
  paragraphs: [
    'The KinesoScore leaderboard shows global rankings built only from results athletes choose to share. It is a community comparison surface for opted-in performances — not a feed of every calculator save.',
    'Browse categories such as myKinesoScore™, running distances, strength lifts (bench, squat, deadlift, and SBD total), military fitness assessments, and Habit Streaks. For performance boards, switch between All Time and This Week (UTC). Habit Streaks use All Time only (current streak).',
    'To appear on a board, create a Leaderboard Name in Account Settings and opt in when saving an eligible result — or share your habit streak from Habits. Private calculator history and habit check-ins stay private by default.',
  ],
  faqs: [
    {
      question: 'Who appears on the KinesoScore leaderboard?',
      answer:
        'Only athletes who create a Leaderboard Name and choose to share an eligible result. Public rows show a Leaderboard Name and the shared performance value — not email or legal name.',
    },
    {
      question: 'What is the difference between All Time and This Week?',
      answer:
        'All Time ranks eligible active shares across history for that performance board. This Week limits performance boards to shares from the current week using a UTC Monday week start. Habit Streaks are All Time only and do not use a This Week filter.',
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

/** Educational landing page for /army-aft-guide (not the calculator). */
export const ARMY_AFT_GUIDE_SEO = {
  eyebrow: 'Military fitness',
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
  vo2max: VO2_SEO.faqs,
  'fitness-age': FITNESS_AGE_SEO.faqs,
  'army-aft': MILITARY_SEO['army-aft'].faqs,
  'marine-pft': MILITARY_SEO['marine-pft'].faqs,
  'navy-prt': MILITARY_SEO['navy-prt'].faqs,
  'air-force-pfra': MILITARY_SEO['air-force-pfra'].faqs,
  'air-force-pfa': MILITARY_SEO['air-force-pfa'].faqs,
  leaderboard: LEADERBOARD_SEO.faqs,
}
