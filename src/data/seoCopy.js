/** Concise SEO / educational copy for public calculator pages. */

export const STRENGTH_SEO = {
  title: 'About this strength calculator',
  paragraphs: [
    'This strength calculator estimates one-rep max (1RM) for squat, bench press, and deadlift, and can combine those lifts into an SBD total.',
    'When you enter weight and reps, KinesoScore uses the Epley formula — 1RM ≈ weight × (1 + reps / 30) — to estimate a max. You can also enter a known 1RM directly.',
    'SBD Total is the sum of squat, bench, and deadlift 1RMs. Save results to track strength progress over time.',
  ],
  links: [{ tab: 'scoring', label: 'KinesoScore overview' }],
}

export const RUNNING_SEO = {
  title: 'About this running calculator',
  paragraphs: [
    'This running performance calculator predicts race times and paces from a recent race or time trial across common distances.',
    'Use it to compare equivalent performances, plan training paces, and save results to track endurance progression over time.',
  ],
}

export const BMI_SEO = {
  title: 'About this BMI calculator',
  paragraphs: [
    'Body mass index (BMI) is a simple height-and-weight ratio used as a general body composition screening tool: weight ÷ height² (metric).',
    'KinesoScore shows your BMI and a standard category band. BMI does not measure body fat, muscle mass, or overall health on its own.',
  ],
  disclaimer:
    'BMI is an educational estimate, not a diagnosis or medical advice. Talk with a qualified clinician for health decisions.',
}

export const FITNESS_AGE_SEO = {
  title: 'About this fitness age calculator',
  paragraphs: [
    'This fitness age calculator estimates a performance-based “fitness age” from metrics such as VO₂ max, resting heart rate, training habits, and body measures.',
    'It is a transparent analytics estimate for tracking trends — lower fitness age generally indicates stronger cardiorespiratory and training markers relative to chronological age.',
  ],
  disclaimer:
    'Fitness age is not medical advice and does not replace clinical evaluation. Results are for educational and training insight only.',
}

export const MILITARY_SEO = {
  'air-force-pfra': {
    title: 'About the Air Force PFRA calculator',
    paragraphs: [
      'Estimate your Air Force Physical Fitness Readiness Assessment (PFRA) score from published standards for cardio, muscular strength, core endurance, and waist-to-height ratio.',
      'Typical scored components include a 2-mile run or HAMR, push-ups or hand-release push-ups, a core option (sit-ups, reverse crunch, or forearm plank), and body composition.',
    ],
    links: [
      { tab: 'army-aft', label: 'Army AFT calculator' },
      { tab: 'marine-pft', label: 'Marine Corps PFT calculator' },
      { tab: 'navy-prt', label: 'Navy PRT calculator' },
    ],
  },
  'army-aft': {
    title: 'About the Army AFT calculator',
    paragraphs: [
      'Estimate your Army Fitness Test (AFT) score using published age- and gender-normed event standards.',
      'Events scored include the 3-rep max deadlift, hand-release push-ups, Sprint-Drag-Carry, plank, and 2-mile run.',
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
      'Estimate your Marine Corps Physical Fitness Test (PFT) score from published pull-up or push-up, forearm plank, and 3-mile run standards.',
      'Use age band and gender with your event results to see an estimated total and track progress over time.',
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
      'Estimate your Navy Physical Readiness Test (PRT) score from published push-up, forearm plank, and 1.5-mile run standards.',
      'Enter demographics and event results to see an estimated score you can save for readiness tracking.',
    ],
    links: [
      { tab: 'air-force-pfra', label: 'Air Force PFRA calculator' },
      { tab: 'army-aft', label: 'Army AFT calculator' },
      { tab: 'marine-pft', label: 'Marine Corps PFT calculator' },
    ],
  },
}

export const MILITARY_SEO_DISCLAIMER =
  'Educational estimate only — not an official service scorecard or medical advice. Always confirm with current official standards.'
