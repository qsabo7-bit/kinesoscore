/**
 * Public citations for FPC formulas and comparison data.
 * Shown on the About page and kept in one place for easy updates.
 */
export const sources = [
  {
    id: 'epley',
    category: 'Strength formulas',
    title: 'Epley one-rep max formula',
    detail:
      'FPC estimates 1RM with the Epley equation: 1RM = weight × (1 + reps / 30). This is a widely used practical estimate for submaximal sets.',
    url: 'https://en.wikipedia.org/wiki/One-repetition_maximum#Epley_formula',
    linkLabel: 'One-repetition maximum (Epley formula)',
  },
  {
    id: 'van-den-hoek',
    category: 'Strength percentiles',
    title: 'van den Hoek et al. (2024)',
    detail:
      'Peer-reviewed normative data for squat, bench press, and deadlift from 809,986 drug-tested, unequipped powerlifting competition entries. Used for age- and sex-specific bodyweight-relative strength percentiles.',
    url: 'https://doi.org/10.1016/j.jsams.2024.07.005',
    linkLabel: 'Journal of Science and Medicine in Sport (DOI)',
  },
  {
    id: 'riegel',
    category: 'Running formulas',
    title: 'Riegel race-time prediction formula',
    detail:
      'FPC predicts equivalent race times with the Riegel model: T2 = T1 × (D2 / D1)^1.06. This is a common endurance prediction formula for converting between distances.',
    url: 'https://en.wikipedia.org/wiki/Peter_Riegel',
    linkLabel: 'Peter Riegel / race prediction formula',
  },
  {
    id: 'runrepeat',
    category: 'Running percentiles',
    title: 'RunRepeat race-result percentiles',
    detail:
      'Sex-specific 5K finish-time percentile curves drawn from RunRepeat’s analysis of tens of millions of race results across tens of thousands of events. FPC converts those curves into “better than X out of 100” percentiles.',
    url: 'https://runrepeat.com/how-do-you-masure-up-the-runners-percentile-calculator',
    linkLabel: 'RunRepeat percentile calculator',
  },
  {
    id: 'age-band-medians',
    category: 'Running age adjustment',
    title: 'Age-group median race times',
    detail:
      'Age bands are centered using published age-group median 5K finish times from large race-result reporting. This preserves the RunRepeat distribution shape while adjusting for age. Age-related endurance decline is also documented in exercise physiology literature (for example, Tanaka & Seals, 2008).',
    url: 'https://run.outsideonline.com/road/road-racing/whats-a-good-5k-time-heres-what-the-latest-data-says/',
    linkLabel: 'Outside Online 5K age-group reporting',
  },
  {
    id: 'FPC-score',
    category: 'Fitness Scoring',
    title: 'FPC composite score',
    detail:
      'Fitness Scoring averages your strength percentile (van den Hoek et al., 2024) and running percentile (RunRepeat) with equal weight. The FPC Score is the percent of people you outperform on average across both domains for your age and gender group.',
    url: 'https://doi.org/10.1016/j.jsams.2024.07.005',
    linkLabel: 'Strength norms used in the composite (DOI)',
  },
]
