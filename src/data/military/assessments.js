/**
 * Military assessment configs.
 *
 * scoringReady must stay false until complete official published tables
 * are encoded for that assessment. Never invent thresholds or pass criteria.
 *
 * To add a new assessment later:
 * 1. Add an entry here
 * 2. Add a calculator registry item (category: 'military')
 * 3. Add a thin page + App.jsx branch
 * 4. Optionally add a chart module and flip scoringReady when tables are complete
 */

export const MILITARY_ASSESSMENTS = {
  'air-force-pfra': {
    id: 'air-force-pfra',
    name: 'Air Force PFRA',
    shortName: 'Air Force PFRA',
    eyebrow: 'Military assessment',
    lead: 'Estimate your Air Force Physical Fitness Readiness Assessment score from current published standards. Select your age band and gender, then enter each component.',
    infoStatus: 'Current Air Force Fitness Assessment',
    scoringReady: true,
    scoringStatusMessage: 'Official scoring tables coming soon',
    source: {
      name: 'USAF PFRA Scoring Charts (Effective 1 Mar 2026)',
      detail:
        'Official AFPC PFRA scoring. Composite is out of 100 (cardio 50, WHtR 20, strength 15, core 15). Pass requires component minimums and a composite of at least 75. Categories: Excellent ≥90, Satisfactory 75–89.9, Unsatisfactory <75. 2km walk and AFSPECWAR/EOD specialty charts are not scored here.',
      url: 'https://www.afpc.af.mil/Career-Management/Fitness-Program/',
    },
    sourcePending: {
      name: 'AFMAN 36-2905 / AFPC PFRA Scoring Charts',
      detail:
        'Current PFRA uses a 100-point model (cardio 50, WHtR 20, strength 15, core 15) with 2-mile run or 20m HAMR, push-ups or hand-release push-ups, sit-ups / cross-leg reverse crunch / forearm plank, and scored waist-to-height ratio. Full official age/gender scoring charts will be encoded before any scores or saves are enabled.',
      url: 'https://www.afpc.af.mil/Career-Management/Fitness-Program/',
    },
    ageBands: [
      { id: 'under-25', label: 'Under 25' },
      { id: '25-29', label: '25–29' },
      { id: '30-34', label: '30–34' },
      { id: '35-39', label: '35–39' },
      { id: '40-44', label: '40–44' },
      { id: '45-49', label: '45–49' },
      { id: '50-54', label: '50–54' },
      { id: '55-59', label: '55–59' },
      { id: '60-plus', label: '60+' },
    ],
    genders: [
      { id: 'male', label: 'Male' },
      { id: 'female', label: 'Female' },
    ],
    events: [
      {
        id: 'strengthChoice',
        label: 'Strength event',
        kind: 'select',
        options: [
          { id: 'pushups', label: '1-min push-ups' },
          { id: 'hrPushups', label: '2-min hand-release push-ups' },
        ],
        hint: 'Choose the muscular strength option you performed',
      },
      {
        id: 'strengthReps',
        label: 'Strength repetitions',
        kind: 'reps',
        placeholder: '40',
        hint: 'Repetitions for the selected strength event',
      },
      {
        id: 'coreChoice',
        label: 'Core event',
        kind: 'select',
        options: [
          { id: 'situps', label: '1-min sit-ups' },
          { id: 'crunch', label: '2-min cross-leg reverse crunch' },
          { id: 'plank', label: 'Forearm plank' },
        ],
        hint: 'Choose the core endurance option you performed',
      },
      {
        id: 'coreReps',
        label: 'Core repetitions',
        kind: 'reps',
        placeholder: '45',
        hint: 'Repetitions for sit-ups or reverse crunch (leave blank for plank)',
      },
      {
        id: 'plank',
        label: 'Forearm plank',
        kind: 'duration',
        placeholderMin: '2',
        placeholderSec: '00',
        hint: 'Hold time when forearm plank is selected',
      },
      {
        id: 'cardioChoice',
        label: 'Cardio event',
        kind: 'select',
        options: [
          { id: 'run', label: '2-mile run' },
          { id: 'hamr', label: '20m HAMR' },
        ],
        hint: 'Choose the cardiorespiratory option you performed',
      },
      {
        id: 'run',
        label: '2-mile run',
        kind: 'duration',
        placeholderMin: '16',
        placeholderSec: '00',
        hint: 'Finish time when 2-mile run is selected',
      },
      {
        id: 'hamr',
        label: 'HAMR shuttles',
        kind: 'reps',
        placeholder: '60',
        hint: '20-meter shuttle count when HAMR is selected',
      },
      {
        id: 'waist',
        label: 'Waist (in)',
        kind: 'number',
        placeholder: '34',
        hint: 'For waist-to-height ratio',
      },
      {
        id: 'height',
        label: 'Height (in)',
        kind: 'number',
        placeholder: '70',
        hint: 'For waist-to-height ratio',
      },
    ],
  },

  'air-force-pfa': {
    id: 'air-force-pfa',
    name: 'Legacy Air Force PFA',
    shortName: 'Air Force PFA',
    eyebrow: 'Military assessment',
    lead: 'Legacy Air Force PFA. This assessment reflects previous Air Force fitness standards and is retained for historical tracking. Select your age band and gender, then enter each event.',
    infoStatus: 'Legacy Air Force Fitness Assessment',
    scoringReady: true,
    scoringStatusMessage: 'Official scoring tables coming soon',
    source: {
      name: 'DAFMAN 36-2905 Fitness Charts (26 July 2021)',
      detail:
        'Legacy Air Force PFA scoring from official DAFMAN 36-2905 Attachment 2 charts. Composite uses 1.5-mile run (60 pts), 1-minute push-ups (20), and 1-minute sit-ups (20). Pass requires ≥75 total and component minimums. Saved separately from PFRA history.',
      url: 'https://www.afpc.af.mil/Career-Management/Fitness-Program/',
    },
    sourcePending: {
      name: 'AFMAN 36-2905 (legacy PFA charts)',
      detail:
        'Legacy Air Force Physical Fitness Assessment standards are retained for historical tracking. Scoring stays disabled until complete official legacy charts can be verified and encoded.',
      url: 'https://www.afpc.af.mil/Career-Management/Fitness-Program/',
    },
    ageBands: [
      { id: 'under-25', label: 'Under 25' },
      { id: '25-29', label: '25–29' },
      { id: '30-34', label: '30–34' },
      { id: '35-39', label: '35–39' },
      { id: '40-44', label: '40–44' },
      { id: '45-49', label: '45–49' },
      { id: '50-54', label: '50–54' },
      { id: '55-59', label: '55–59' },
      { id: '60-plus', label: '60+' },
    ],
    genders: [
      { id: 'male', label: 'Male' },
      { id: 'female', label: 'Female' },
    ],
    events: [
      {
        id: 'pushups',
        label: 'Push-ups',
        kind: 'reps',
        placeholder: '40',
        hint: '1-minute push-up repetitions',
      },
      {
        id: 'situps',
        label: 'Sit-ups',
        kind: 'reps',
        placeholder: '45',
        hint: '1-minute sit-up repetitions',
      },
      {
        id: 'run',
        label: '1.5-mile run',
        kind: 'duration',
        placeholderMin: '12',
        placeholderSec: '00',
        hint: 'Legacy cardiorespiratory run distance',
      },
      {
        id: 'waist',
        label: 'Waist (in)',
        kind: 'number',
        placeholder: '34',
        hint: 'Optional — not used by these 2021 charts',
      },
      {
        id: 'height',
        label: 'Height (in)',
        kind: 'number',
        placeholder: '70',
        hint: 'Optional — not used by these 2021 charts',
      },
    ],
  },

  'army-aft': {
    id: 'army-aft',
    name: 'Army AFT',
    shortName: 'Army AFT',
    eyebrow: 'Military assessment',
    lead: 'Estimate your Army Fitness Test score from published AFT standards. Enter age, gender, and each event result.',
    infoStatus: 'Current',
    scoringReady: true,
    scoringStatusMessage: 'Official scoring tables coming soon',
    source: {
      name: 'Army Fitness Test Scoring Scales (1 June 2025)',
      detail:
        'Official AFT general-standard tables (male/female, age-normed) from army.mil. Pass requires at least 60 points in every event. Combat specialty sex-neutral standards are not applied in this calculator.',
      url: 'https://www.army.mil/aft',
    },
    sourcePending: {
      name: 'Army Fitness Test scoring tables',
      detail:
        'Official AFT tables from Army Directive 2025-06 / army.mil/aft will be encoded before scoring is enabled.',
      url: 'https://www.army.mil/aft',
    },
    ageBands: [
      { id: '17-21', label: '17–21' },
      { id: '22-26', label: '22–26' },
      { id: '27-31', label: '27–31' },
      { id: '32-36', label: '32–36' },
      { id: '37-41', label: '37–41' },
      { id: '42-46', label: '42–46' },
      { id: '47-51', label: '47–51' },
      { id: '52-56', label: '52–56' },
      { id: '57-61', label: '57–61' },
      { id: '62-plus', label: '62+' },
    ],
    genders: [
      { id: 'male', label: 'Male' },
      { id: 'female', label: 'Female' },
    ],
    events: [
      {
        id: 'deadlift',
        label: '3-rep max deadlift',
        kind: 'number',
        unit: 'lb',
        placeholder: '340',
        hint: 'Maximum deadlift (lb)',
      },
      {
        id: 'hrPushups',
        label: 'Hand-release push-ups',
        kind: 'reps',
        placeholder: '30',
        hint: 'Repetitions',
      },
      {
        id: 'sdc',
        label: 'Sprint-Drag-Carry',
        kind: 'duration',
        placeholderMin: '1',
        placeholderSec: '40',
        hint: 'Total time',
      },
      {
        id: 'plank',
        label: 'Plank',
        kind: 'duration',
        placeholderMin: '2',
        placeholderSec: '00',
        hint: 'Hold time',
      },
      {
        id: 'run',
        label: '2-mile run',
        kind: 'duration',
        placeholderMin: '16',
        placeholderSec: '00',
        hint: 'Finish time',
      },
    ],
  },

  'marine-pft': {
    id: 'marine-pft',
    name: 'Marine Corps PFT',
    shortName: 'Marine Corps PFT',
    eyebrow: 'Military assessment',
    lead: 'Estimate your Marine Corps Physical Fitness Test score from published PFT standards.',
    infoStatus: 'Current',
    scoringReady: true,
    scoringStatusMessage: 'Official scoring tables coming soon',
    source: {
      name: 'MCO 6100.13A (w/ CH-4) PFT Tables',
      detail:
        'Official Marine Corps PFT scoring. Pull-ups or push-ups (70-point cap), CH-4 forearm plank, and 3-mile run. Pass requires event minimums and a total of at least 150 points.',
      url: 'https://www.fitness.marines.mil/PFT-CFT_Standards17/',
    },
    sourcePending: {
      name: 'MCO 6100.13A (w/ Change 4)',
      detail:
        'Official Marine Corps PFT scoring tables will be encoded from MCO 6100.13A before scoring is enabled.',
      url: 'https://www.marines.mil/',
    },
    ageBands: [
      { id: '17-20', label: '17–20' },
      { id: '21-25', label: '21–25' },
      { id: '26-30', label: '26–30' },
      { id: '31-35', label: '31–35' },
      { id: '36-40', label: '36–40' },
      { id: '41-45', label: '41–45' },
      { id: '46-50', label: '46–50' },
      { id: '51-plus', label: '51+' },
    ],
    genders: [
      { id: 'male', label: 'Male' },
      { id: 'female', label: 'Female' },
    ],
    events: [
      {
        id: 'upperBodyChoice',
        label: 'Upper-body event',
        kind: 'select',
        options: [
          { id: 'pullups', label: 'Pull-ups' },
          { id: 'pushups', label: 'Push-ups' },
        ],
        hint: 'Push-ups are capped lower than pull-ups on official tables',
      },
      {
        id: 'upperBodyReps',
        label: 'Pull-ups / push-ups',
        kind: 'reps',
        placeholder: '15',
        hint: 'Repetitions for the selected upper-body event',
      },
      {
        id: 'plank',
        label: 'Forearm plank',
        kind: 'duration',
        placeholderMin: '3',
        placeholderSec: '00',
        hint: 'Hold time',
      },
      {
        id: 'run',
        label: '3-mile run',
        kind: 'duration',
        placeholderMin: '22',
        placeholderSec: '00',
        hint: 'Finish time',
      },
    ],
  },

  'navy-prt': {
    id: 'navy-prt',
    name: 'Navy PRT',
    shortName: 'Navy PRT',
    eyebrow: 'Military assessment',
    lead: 'Estimate your Navy Physical Readiness Test score from published PRT standards.',
    infoStatus: 'Current',
    scoringReady: true,
    scoringStatusMessage: 'Scoring data coming soon',
    source: {
      name: 'Navy PRT Guide 5 (Table 4-1, Jan 2024)',
      detail:
        'Physical Readiness Test standards for altitudes less than 5,000 feet. Overall score is the average of push-ups, forearm plank, and 1.5-mile run event points. Alternate cardio options are not scored here yet.',
      url: 'https://www.mynavyhr.navy.mil/Support-Services/Culture-Resilience/Physical-Readiness/',
    },
    sourcePending: {
      name: 'OPNAVINST 6110.1 (series)',
      detail:
        'Official Navy PRT score tables will be encoded from OPNAVINST 6110.1 before scoring is enabled.',
      url: 'https://www.navy.mil/',
    },
    ageBands: [
      { id: '17-19', label: '17–19' },
      { id: '20-24', label: '20–24' },
      { id: '25-29', label: '25–29' },
      { id: '30-34', label: '30–34' },
      { id: '35-39', label: '35–39' },
      { id: '40-44', label: '40–44' },
      { id: '45-49', label: '45–49' },
      { id: '50-54', label: '50–54' },
      { id: '55-59', label: '55–59' },
      { id: '60-64', label: '60–64' },
      { id: '65-plus', label: '65+' },
    ],
    genders: [
      { id: 'male', label: 'Male' },
      { id: 'female', label: 'Female' },
    ],
    events: [
      {
        id: 'pushups',
        label: 'Push-ups',
        kind: 'reps',
        placeholder: '40',
        hint: 'Repetitions',
      },
      {
        id: 'plank',
        label: 'Forearm plank',
        kind: 'duration',
        placeholderMin: '2',
        placeholderSec: '00',
        hint: 'Hold time',
      },
      {
        id: 'run',
        label: '1.5-mile run',
        kind: 'duration',
        placeholderMin: '12',
        placeholderSec: '00',
        hint: 'Primary cardio option (alternates when tables are encoded)',
      },
    ],
  },
}

export function getMilitaryAssessment(id) {
  return MILITARY_ASSESSMENTS[id] ?? null
}

export const militaryAssessmentIds = Object.keys(MILITARY_ASSESSMENTS)
