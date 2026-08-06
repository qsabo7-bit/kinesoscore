/**
 * Legacy Air Force Physical Fitness Assessment (PFA) scoring charts.
 * Source: DAFMAN 36-2905 Attachment 2 — Fitness Charts Only (26 July 2021), AFPC.
 * https://www.afpc.af.mil/Career-Management/Fitness-Program/
 *
 * Classic 100-point model: 1.5-mile run (60), push-ups (20), sit-ups (20).
 * Pass: composite ≥ 75 and component minimums. Categories: Excellent ≥90,
 * Satisfactory 75–89.9, Unsatisfactory <75.
 * Abdominal circumference / WHtR not included in these charts.
 */

export const AIR_FORCE_PFA_SOURCE = {
  name: 'DAFMAN 36-2905 Fitness Charts (26 July 2021)',
  detail:
    'Legacy Air Force PFA scoring from official DAFMAN 36-2905 Attachment 2 charts. Composite uses 1.5-mile run (60 pts), 1-minute push-ups (20), and 1-minute sit-ups (20). Pass requires ≥75 total and component minimums. Alternate events and body-composition scoring from later publications are not applied here.',
  url: 'https://www.afpc.af.mil/Career-Management/Fitness-Program/',
}

export const AIR_FORCE_PFA_CATEGORIES = {
  excellent: 90,
  satisfactory: 75,
}

/** @type {Record<string, { run: {threshold:number,points:number}[], pushups: {threshold:number,points:number}[], situps: {threshold:number,points:number}[], minimums: { runMaxSec:number|null, pushMin:number|null, sitMin:number|null } }>} */
export const AIR_FORCE_PFA_CHARTS = {
  "male|under-25": {
    "run": [
      {
        "threshold": 552,
        "points": 60
      },
      {
        "threshold": 574,
        "points": 59.5
      },
      {
        "threshold": 585,
        "points": 59
      },
      {
        "threshold": 598,
        "points": 58.5
      },
      {
        "threshold": 610,
        "points": 58
      },
      {
        "threshold": 623,
        "points": 57.5
      },
      {
        "threshold": 637,
        "points": 57
      },
      {
        "threshold": 651,
        "points": 56.5
      },
      {
        "threshold": 666,
        "points": 56
      },
      {
        "threshold": 682,
        "points": 55.5
      },
      {
        "threshold": 698,
        "points": 55
      },
      {
        "threshold": 716,
        "points": 54.5
      },
      {
        "threshold": 734,
        "points": 54
      },
      {
        "threshold": 753,
        "points": 53.5
      },
      {
        "threshold": 773,
        "points": 52
      },
      {
        "threshold": 794,
        "points": 50.5
      },
      {
        "threshold": 816,
        "points": 49
      },
      {
        "threshold": 840,
        "points": 46.5
      },
      {
        "threshold": 865,
        "points": 44
      },
      {
        "threshold": 892,
        "points": 41
      },
      {
        "threshold": 920,
        "points": 38
      },
      {
        "threshold": 950,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 30,
        "points": 1
      },
      {
        "threshold": 31,
        "points": 4
      },
      {
        "threshold": 34,
        "points": 10.6
      },
      {
        "threshold": 35,
        "points": 11
      },
      {
        "threshold": 36,
        "points": 11.6
      },
      {
        "threshold": 38,
        "points": 12.6
      },
      {
        "threshold": 40,
        "points": 13.6
      },
      {
        "threshold": 42,
        "points": 14.4
      },
      {
        "threshold": 43,
        "points": 14.6
      },
      {
        "threshold": 44,
        "points": 15
      },
      {
        "threshold": 45,
        "points": 15.4
      },
      {
        "threshold": 46,
        "points": 15.6
      },
      {
        "threshold": 47,
        "points": 16
      },
      {
        "threshold": 48,
        "points": 16.2
      },
      {
        "threshold": 49,
        "points": 16.6
      },
      {
        "threshold": 50,
        "points": 16.8
      },
      {
        "threshold": 51,
        "points": 17
      },
      {
        "threshold": 52,
        "points": 17.2
      },
      {
        "threshold": 53,
        "points": 17.4
      },
      {
        "threshold": 54,
        "points": 17.5
      },
      {
        "threshold": 55,
        "points": 17.6
      },
      {
        "threshold": 56,
        "points": 17.8
      },
      {
        "threshold": 57,
        "points": 18
      },
      {
        "threshold": 58,
        "points": 18.2
      },
      {
        "threshold": 59,
        "points": 18.4
      },
      {
        "threshold": 60,
        "points": 18.6
      },
      {
        "threshold": 61,
        "points": 18.8
      },
      {
        "threshold": 62,
        "points": 19
      },
      {
        "threshold": 63,
        "points": 19.2
      },
      {
        "threshold": 64,
        "points": 19.4
      },
      {
        "threshold": 65,
        "points": 19.6
      },
      {
        "threshold": 66,
        "points": 19.8
      },
      {
        "threshold": 67,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 39,
        "points": 3
      },
      {
        "threshold": 40,
        "points": 6
      },
      {
        "threshold": 41,
        "points": 9
      },
      {
        "threshold": 42,
        "points": 12
      },
      {
        "threshold": 43,
        "points": 12.8
      },
      {
        "threshold": 44,
        "points": 13
      },
      {
        "threshold": 45,
        "points": 14
      },
      {
        "threshold": 46,
        "points": 15
      },
      {
        "threshold": 47,
        "points": 16
      },
      {
        "threshold": 48,
        "points": 16.6
      },
      {
        "threshold": 49,
        "points": 17
      },
      {
        "threshold": 50,
        "points": 17.4
      },
      {
        "threshold": 51,
        "points": 17.6
      },
      {
        "threshold": 52,
        "points": 18
      },
      {
        "threshold": 53,
        "points": 18.4
      },
      {
        "threshold": 54,
        "points": 18.8
      },
      {
        "threshold": 55,
        "points": 19
      },
      {
        "threshold": 56,
        "points": 19.4
      },
      {
        "threshold": 57,
        "points": 19.7
      },
      {
        "threshold": 58,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 950,
      "pushMin": 30,
      "sitMin": 39
    }
  },
  "male|25-29": {
    "run": [
      {
        "threshold": 562,
        "points": 60
      },
      {
        "threshold": 585,
        "points": 59.5
      },
      {
        "threshold": 598,
        "points": 59
      },
      {
        "threshold": 610,
        "points": 58.5
      },
      {
        "threshold": 623,
        "points": 58
      },
      {
        "threshold": 637,
        "points": 57.5
      },
      {
        "threshold": 651,
        "points": 57
      },
      {
        "threshold": 666,
        "points": 56.5
      },
      {
        "threshold": 682,
        "points": 56
      },
      {
        "threshold": 698,
        "points": 55.5
      },
      {
        "threshold": 716,
        "points": 55
      },
      {
        "threshold": 734,
        "points": 54.5
      },
      {
        "threshold": 753,
        "points": 54
      },
      {
        "threshold": 773,
        "points": 53.5
      },
      {
        "threshold": 794,
        "points": 52
      },
      {
        "threshold": 816,
        "points": 50.5
      },
      {
        "threshold": 840,
        "points": 49
      },
      {
        "threshold": 865,
        "points": 46.5
      },
      {
        "threshold": 892,
        "points": 44
      },
      {
        "threshold": 920,
        "points": 41
      },
      {
        "threshold": 950,
        "points": 38
      },
      {
        "threshold": 982,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 27,
        "points": 1
      },
      {
        "threshold": 29,
        "points": 7
      },
      {
        "threshold": 30,
        "points": 10
      },
      {
        "threshold": 31,
        "points": 10.6
      },
      {
        "threshold": 33,
        "points": 11.6
      },
      {
        "threshold": 35,
        "points": 12.6
      },
      {
        "threshold": 37,
        "points": 13.6
      },
      {
        "threshold": 38,
        "points": 14
      },
      {
        "threshold": 39,
        "points": 14.4
      },
      {
        "threshold": 40,
        "points": 14.6
      },
      {
        "threshold": 41,
        "points": 15
      },
      {
        "threshold": 42,
        "points": 15.4
      },
      {
        "threshold": 43,
        "points": 15.6
      },
      {
        "threshold": 44,
        "points": 16
      },
      {
        "threshold": 45,
        "points": 16.2
      },
      {
        "threshold": 46,
        "points": 16.6
      },
      {
        "threshold": 47,
        "points": 16.8
      },
      {
        "threshold": 48,
        "points": 17
      },
      {
        "threshold": 49,
        "points": 17.2
      },
      {
        "threshold": 50,
        "points": 17.4
      },
      {
        "threshold": 51,
        "points": 17.5
      },
      {
        "threshold": 52,
        "points": 17.6
      },
      {
        "threshold": 53,
        "points": 17.8
      },
      {
        "threshold": 54,
        "points": 18
      },
      {
        "threshold": 55,
        "points": 18.2
      },
      {
        "threshold": 56,
        "points": 18.4
      },
      {
        "threshold": 57,
        "points": 18.6
      },
      {
        "threshold": 58,
        "points": 18.8
      },
      {
        "threshold": 59,
        "points": 19
      },
      {
        "threshold": 60,
        "points": 19.4
      },
      {
        "threshold": 61,
        "points": 19.7
      },
      {
        "threshold": 62,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 38,
        "points": 3
      },
      {
        "threshold": 39,
        "points": 6
      },
      {
        "threshold": 40,
        "points": 9
      },
      {
        "threshold": 41,
        "points": 12
      },
      {
        "threshold": 42,
        "points": 12.8
      },
      {
        "threshold": 43,
        "points": 13
      },
      {
        "threshold": 44,
        "points": 14
      },
      {
        "threshold": 45,
        "points": 15
      },
      {
        "threshold": 46,
        "points": 16
      },
      {
        "threshold": 47,
        "points": 16.6
      },
      {
        "threshold": 48,
        "points": 17
      },
      {
        "threshold": 49,
        "points": 17.4
      },
      {
        "threshold": 50,
        "points": 17.6
      },
      {
        "threshold": 51,
        "points": 18
      },
      {
        "threshold": 52,
        "points": 18.4
      },
      {
        "threshold": 53,
        "points": 18.8
      },
      {
        "threshold": 54,
        "points": 19
      },
      {
        "threshold": 55,
        "points": 19.5
      },
      {
        "threshold": 56,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 982,
      "pushMin": 27,
      "sitMin": 38
    }
  },
  "male|30-34": {
    "run": [
      {
        "threshold": 574,
        "points": 60
      },
      {
        "threshold": 598,
        "points": 59.5
      },
      {
        "threshold": 610,
        "points": 59
      },
      {
        "threshold": 623,
        "points": 58.5
      },
      {
        "threshold": 637,
        "points": 58
      },
      {
        "threshold": 651,
        "points": 57.5
      },
      {
        "threshold": 666,
        "points": 57
      },
      {
        "threshold": 682,
        "points": 56.5
      },
      {
        "threshold": 698,
        "points": 56
      },
      {
        "threshold": 716,
        "points": 55.5
      },
      {
        "threshold": 734,
        "points": 55
      },
      {
        "threshold": 753,
        "points": 54.5
      },
      {
        "threshold": 773,
        "points": 54
      },
      {
        "threshold": 794,
        "points": 53.5
      },
      {
        "threshold": 816,
        "points": 52
      },
      {
        "threshold": 840,
        "points": 50.5
      },
      {
        "threshold": 865,
        "points": 48
      },
      {
        "threshold": 892,
        "points": 45.5
      },
      {
        "threshold": 920,
        "points": 43
      },
      {
        "threshold": 950,
        "points": 40.5
      },
      {
        "threshold": 982,
        "points": 38
      },
      {
        "threshold": 1017,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 24,
        "points": 1
      },
      {
        "threshold": 25,
        "points": 4
      },
      {
        "threshold": 28,
        "points": 10.6
      },
      {
        "threshold": 32,
        "points": 13.4
      },
      {
        "threshold": 33,
        "points": 13.6
      },
      {
        "threshold": 34,
        "points": 14
      },
      {
        "threshold": 35,
        "points": 14.6
      },
      {
        "threshold": 36,
        "points": 15
      },
      {
        "threshold": 37,
        "points": 15.4
      },
      {
        "threshold": 38,
        "points": 15.6
      },
      {
        "threshold": 39,
        "points": 16
      },
      {
        "threshold": 40,
        "points": 16.6
      },
      {
        "threshold": 41,
        "points": 17
      },
      {
        "threshold": 42,
        "points": 17.2
      },
      {
        "threshold": 43,
        "points": 17.4
      },
      {
        "threshold": 44,
        "points": 17.6
      },
      {
        "threshold": 45,
        "points": 17.8
      },
      {
        "threshold": 46,
        "points": 18
      },
      {
        "threshold": 47,
        "points": 18.2
      },
      {
        "threshold": 48,
        "points": 18.4
      },
      {
        "threshold": 49,
        "points": 18.5
      },
      {
        "threshold": 50,
        "points": 18.6
      },
      {
        "threshold": 51,
        "points": 18.8
      },
      {
        "threshold": 52,
        "points": 19
      },
      {
        "threshold": 53,
        "points": 19.2
      },
      {
        "threshold": 54,
        "points": 19.4
      },
      {
        "threshold": 55,
        "points": 19.6
      },
      {
        "threshold": 56,
        "points": 19.8
      },
      {
        "threshold": 57,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 36,
        "points": 3
      },
      {
        "threshold": 37,
        "points": 6
      },
      {
        "threshold": 38,
        "points": 9
      },
      {
        "threshold": 39,
        "points": 12
      },
      {
        "threshold": 40,
        "points": 13
      },
      {
        "threshold": 41,
        "points": 14
      },
      {
        "threshold": 42,
        "points": 15
      },
      {
        "threshold": 43,
        "points": 16
      },
      {
        "threshold": 44,
        "points": 16.6
      },
      {
        "threshold": 45,
        "points": 17
      },
      {
        "threshold": 46,
        "points": 17.4
      },
      {
        "threshold": 47,
        "points": 17.6
      },
      {
        "threshold": 48,
        "points": 18
      },
      {
        "threshold": 49,
        "points": 18.4
      },
      {
        "threshold": 50,
        "points": 18.8
      },
      {
        "threshold": 51,
        "points": 19
      },
      {
        "threshold": 52,
        "points": 19.4
      },
      {
        "threshold": 53,
        "points": 19.7
      },
      {
        "threshold": 54,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1017,
      "pushMin": 24,
      "sitMin": 36
    }
  },
  "male|35-39": {
    "run": [
      {
        "threshold": 585,
        "points": 60
      },
      {
        "threshold": 610,
        "points": 59.5
      },
      {
        "threshold": 623,
        "points": 59
      },
      {
        "threshold": 637,
        "points": 58.5
      },
      {
        "threshold": 651,
        "points": 58
      },
      {
        "threshold": 666,
        "points": 57.5
      },
      {
        "threshold": 682,
        "points": 57
      },
      {
        "threshold": 698,
        "points": 56.5
      },
      {
        "threshold": 716,
        "points": 56
      },
      {
        "threshold": 734,
        "points": 55.5
      },
      {
        "threshold": 753,
        "points": 55
      },
      {
        "threshold": 773,
        "points": 54.5
      },
      {
        "threshold": 794,
        "points": 54
      },
      {
        "threshold": 816,
        "points": 53.5
      },
      {
        "threshold": 840,
        "points": 52
      },
      {
        "threshold": 865,
        "points": 50.5
      },
      {
        "threshold": 892,
        "points": 48
      },
      {
        "threshold": 920,
        "points": 45.5
      },
      {
        "threshold": 950,
        "points": 43
      },
      {
        "threshold": 982,
        "points": 40.5
      },
      {
        "threshold": 1017,
        "points": 38
      },
      {
        "threshold": 1053,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 21,
        "points": 1
      },
      {
        "threshold": 22,
        "points": 4
      },
      {
        "threshold": 26,
        "points": 11
      },
      {
        "threshold": 27,
        "points": 12
      },
      {
        "threshold": 28,
        "points": 13
      },
      {
        "threshold": 29,
        "points": 13.4
      },
      {
        "threshold": 30,
        "points": 13.6
      },
      {
        "threshold": 31,
        "points": 14
      },
      {
        "threshold": 32,
        "points": 14.6
      },
      {
        "threshold": 33,
        "points": 15
      },
      {
        "threshold": 34,
        "points": 15.4
      },
      {
        "threshold": 35,
        "points": 15.6
      },
      {
        "threshold": 36,
        "points": 16
      },
      {
        "threshold": 37,
        "points": 16.6
      },
      {
        "threshold": 38,
        "points": 17
      },
      {
        "threshold": 39,
        "points": 17.2
      },
      {
        "threshold": 40,
        "points": 17.4
      },
      {
        "threshold": 41,
        "points": 17.6
      },
      {
        "threshold": 42,
        "points": 17.8
      },
      {
        "threshold": 43,
        "points": 18
      },
      {
        "threshold": 44,
        "points": 18.2
      },
      {
        "threshold": 45,
        "points": 18.4
      },
      {
        "threshold": 46,
        "points": 18.5
      },
      {
        "threshold": 47,
        "points": 18.6
      },
      {
        "threshold": 48,
        "points": 18.8
      },
      {
        "threshold": 49,
        "points": 19
      },
      {
        "threshold": 50,
        "points": 19.5
      },
      {
        "threshold": 51,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 34,
        "points": 3
      },
      {
        "threshold": 35,
        "points": 6
      },
      {
        "threshold": 36,
        "points": 9
      },
      {
        "threshold": 37,
        "points": 12
      },
      {
        "threshold": 38,
        "points": 13
      },
      {
        "threshold": 39,
        "points": 14
      },
      {
        "threshold": 40,
        "points": 15
      },
      {
        "threshold": 41,
        "points": 16
      },
      {
        "threshold": 42,
        "points": 16.6
      },
      {
        "threshold": 43,
        "points": 17
      },
      {
        "threshold": 44,
        "points": 17.4
      },
      {
        "threshold": 45,
        "points": 17.6
      },
      {
        "threshold": 46,
        "points": 18
      },
      {
        "threshold": 47,
        "points": 18.4
      },
      {
        "threshold": 48,
        "points": 18.8
      },
      {
        "threshold": 49,
        "points": 19
      },
      {
        "threshold": 50,
        "points": 19.4
      },
      {
        "threshold": 51,
        "points": 19.7
      },
      {
        "threshold": 52,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1053,
      "pushMin": 21,
      "sitMin": 34
    }
  },
  "male|40-44": {
    "run": [
      {
        "threshold": 598,
        "points": 60
      },
      {
        "threshold": 623,
        "points": 59.5
      },
      {
        "threshold": 637,
        "points": 59
      },
      {
        "threshold": 651,
        "points": 58.5
      },
      {
        "threshold": 666,
        "points": 58
      },
      {
        "threshold": 682,
        "points": 57.5
      },
      {
        "threshold": 698,
        "points": 57
      },
      {
        "threshold": 716,
        "points": 56.5
      },
      {
        "threshold": 734,
        "points": 56
      },
      {
        "threshold": 753,
        "points": 55.5
      },
      {
        "threshold": 773,
        "points": 55
      },
      {
        "threshold": 794,
        "points": 54.5
      },
      {
        "threshold": 816,
        "points": 54
      },
      {
        "threshold": 840,
        "points": 53.5
      },
      {
        "threshold": 865,
        "points": 52
      },
      {
        "threshold": 892,
        "points": 50.5
      },
      {
        "threshold": 920,
        "points": 49
      },
      {
        "threshold": 950,
        "points": 46.5
      },
      {
        "threshold": 982,
        "points": 44
      },
      {
        "threshold": 1017,
        "points": 41
      },
      {
        "threshold": 1053,
        "points": 38
      },
      {
        "threshold": 1094,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 18,
        "points": 1
      },
      {
        "threshold": 19,
        "points": 4
      },
      {
        "threshold": 20,
        "points": 7
      },
      {
        "threshold": 21,
        "points": 10
      },
      {
        "threshold": 22,
        "points": 11
      },
      {
        "threshold": 23,
        "points": 11.6
      },
      {
        "threshold": 24,
        "points": 12
      },
      {
        "threshold": 25,
        "points": 13
      },
      {
        "threshold": 26,
        "points": 14
      },
      {
        "threshold": 27,
        "points": 14.4
      },
      {
        "threshold": 28,
        "points": 14.6
      },
      {
        "threshold": 29,
        "points": 15
      },
      {
        "threshold": 30,
        "points": 16
      },
      {
        "threshold": 31,
        "points": 16.2
      },
      {
        "threshold": 32,
        "points": 16.6
      },
      {
        "threshold": 33,
        "points": 16.8
      },
      {
        "threshold": 34,
        "points": 17
      },
      {
        "threshold": 35,
        "points": 17.6
      },
      {
        "threshold": 36,
        "points": 18
      },
      {
        "threshold": 37,
        "points": 18.2
      },
      {
        "threshold": 38,
        "points": 18.4
      },
      {
        "threshold": 39,
        "points": 18.8
      },
      {
        "threshold": 40,
        "points": 19
      },
      {
        "threshold": 41,
        "points": 19.2
      },
      {
        "threshold": 42,
        "points": 19.4
      },
      {
        "threshold": 43,
        "points": 19.7
      },
      {
        "threshold": 44,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 31,
        "points": 3
      },
      {
        "threshold": 32,
        "points": 6
      },
      {
        "threshold": 33,
        "points": 9
      },
      {
        "threshold": 34,
        "points": 12
      },
      {
        "threshold": 35,
        "points": 13
      },
      {
        "threshold": 36,
        "points": 14
      },
      {
        "threshold": 37,
        "points": 15
      },
      {
        "threshold": 38,
        "points": 15.6
      },
      {
        "threshold": 39,
        "points": 16
      },
      {
        "threshold": 40,
        "points": 17
      },
      {
        "threshold": 41,
        "points": 17.4
      },
      {
        "threshold": 42,
        "points": 17.6
      },
      {
        "threshold": 43,
        "points": 18
      },
      {
        "threshold": 44,
        "points": 18.2
      },
      {
        "threshold": 45,
        "points": 18.4
      },
      {
        "threshold": 46,
        "points": 18.8
      },
      {
        "threshold": 47,
        "points": 19
      },
      {
        "threshold": 48,
        "points": 19.4
      },
      {
        "threshold": 49,
        "points": 19.7
      },
      {
        "threshold": 50,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1094,
      "pushMin": 18,
      "sitMin": 31
    }
  },
  "male|45-49": {
    "run": [
      {
        "threshold": 610,
        "points": 60
      },
      {
        "threshold": 637,
        "points": 59.5
      },
      {
        "threshold": 651,
        "points": 59
      },
      {
        "threshold": 666,
        "points": 58.5
      },
      {
        "threshold": 682,
        "points": 58
      },
      {
        "threshold": 698,
        "points": 57.5
      },
      {
        "threshold": 716,
        "points": 57
      },
      {
        "threshold": 734,
        "points": 56.5
      },
      {
        "threshold": 753,
        "points": 56
      },
      {
        "threshold": 773,
        "points": 55.5
      },
      {
        "threshold": 794,
        "points": 55
      },
      {
        "threshold": 816,
        "points": 54.5
      },
      {
        "threshold": 840,
        "points": 54
      },
      {
        "threshold": 865,
        "points": 53.5
      },
      {
        "threshold": 892,
        "points": 52
      },
      {
        "threshold": 920,
        "points": 50.5
      },
      {
        "threshold": 950,
        "points": 49
      },
      {
        "threshold": 982,
        "points": 46.5
      },
      {
        "threshold": 1017,
        "points": 44
      },
      {
        "threshold": 1053,
        "points": 41
      },
      {
        "threshold": 1094,
        "points": 38
      },
      {
        "threshold": 1136,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 15,
        "points": 1
      },
      {
        "threshold": 19,
        "points": 10.6
      },
      {
        "threshold": 20,
        "points": 11
      },
      {
        "threshold": 21,
        "points": 11.6
      },
      {
        "threshold": 22,
        "points": 12
      },
      {
        "threshold": 23,
        "points": 12.6
      },
      {
        "threshold": 24,
        "points": 13
      },
      {
        "threshold": 25,
        "points": 14
      },
      {
        "threshold": 26,
        "points": 14.4
      },
      {
        "threshold": 27,
        "points": 14.6
      },
      {
        "threshold": 28,
        "points": 15
      },
      {
        "threshold": 29,
        "points": 16
      },
      {
        "threshold": 30,
        "points": 16.2
      },
      {
        "threshold": 31,
        "points": 16.6
      },
      {
        "threshold": 32,
        "points": 16.8
      },
      {
        "threshold": 33,
        "points": 17
      },
      {
        "threshold": 34,
        "points": 17.6
      },
      {
        "threshold": 35,
        "points": 18
      },
      {
        "threshold": 36,
        "points": 18.2
      },
      {
        "threshold": 37,
        "points": 18.4
      },
      {
        "threshold": 38,
        "points": 18.8
      },
      {
        "threshold": 39,
        "points": 19
      },
      {
        "threshold": 40,
        "points": 19.2
      },
      {
        "threshold": 41,
        "points": 19.4
      },
      {
        "threshold": 42,
        "points": 19.6
      },
      {
        "threshold": 43,
        "points": 19.8
      },
      {
        "threshold": 44,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 28,
        "points": 3
      },
      {
        "threshold": 29,
        "points": 6
      },
      {
        "threshold": 30,
        "points": 9
      },
      {
        "threshold": 31,
        "points": 12
      },
      {
        "threshold": 32,
        "points": 13
      },
      {
        "threshold": 33,
        "points": 14
      },
      {
        "threshold": 34,
        "points": 15
      },
      {
        "threshold": 35,
        "points": 15.6
      },
      {
        "threshold": 36,
        "points": 16
      },
      {
        "threshold": 37,
        "points": 16.6
      },
      {
        "threshold": 38,
        "points": 17
      },
      {
        "threshold": 39,
        "points": 17.4
      },
      {
        "threshold": 40,
        "points": 17.6
      },
      {
        "threshold": 41,
        "points": 18
      },
      {
        "threshold": 42,
        "points": 18.4
      },
      {
        "threshold": 43,
        "points": 18.8
      },
      {
        "threshold": 44,
        "points": 19
      },
      {
        "threshold": 45,
        "points": 19.2
      },
      {
        "threshold": 46,
        "points": 19.4
      },
      {
        "threshold": 47,
        "points": 19.7
      },
      {
        "threshold": 48,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1136,
      "pushMin": 15,
      "sitMin": 28
    }
  },
  "male|50-54": {
    "run": [
      {
        "threshold": 637,
        "points": 60
      },
      {
        "threshold": 666,
        "points": 59.5
      },
      {
        "threshold": 682,
        "points": 59
      },
      {
        "threshold": 698,
        "points": 58.5
      },
      {
        "threshold": 716,
        "points": 58
      },
      {
        "threshold": 734,
        "points": 57.5
      },
      {
        "threshold": 753,
        "points": 57
      },
      {
        "threshold": 773,
        "points": 56.5
      },
      {
        "threshold": 794,
        "points": 56
      },
      {
        "threshold": 816,
        "points": 55.5
      },
      {
        "threshold": 840,
        "points": 55
      },
      {
        "threshold": 865,
        "points": 54.5
      },
      {
        "threshold": 892,
        "points": 54
      },
      {
        "threshold": 920,
        "points": 53.5
      },
      {
        "threshold": 950,
        "points": 52
      },
      {
        "threshold": 982,
        "points": 50.5
      },
      {
        "threshold": 1017,
        "points": 48
      },
      {
        "threshold": 1054,
        "points": 45.5
      },
      {
        "threshold": 1094,
        "points": 43
      },
      {
        "threshold": 1136,
        "points": 40.5
      },
      {
        "threshold": 1183,
        "points": 38
      },
      {
        "threshold": 1233,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 12,
        "points": 1
      },
      {
        "threshold": 13,
        "points": 4
      },
      {
        "threshold": 14,
        "points": 7
      },
      {
        "threshold": 15,
        "points": 10
      },
      {
        "threshold": 16,
        "points": 10.6
      },
      {
        "threshold": 17,
        "points": 11
      },
      {
        "threshold": 18,
        "points": 11.6
      },
      {
        "threshold": 19,
        "points": 12
      },
      {
        "threshold": 20,
        "points": 12.6
      },
      {
        "threshold": 21,
        "points": 13
      },
      {
        "threshold": 22,
        "points": 14
      },
      {
        "threshold": 23,
        "points": 15
      },
      {
        "threshold": 24,
        "points": 16
      },
      {
        "threshold": 25,
        "points": 16.6
      },
      {
        "threshold": 26,
        "points": 17
      },
      {
        "threshold": 27,
        "points": 17.4
      },
      {
        "threshold": 28,
        "points": 17.6
      },
      {
        "threshold": 29,
        "points": 18
      },
      {
        "threshold": 30,
        "points": 18.2
      },
      {
        "threshold": 31,
        "points": 18.4
      },
      {
        "threshold": 32,
        "points": 18.8
      },
      {
        "threshold": 33,
        "points": 19
      },
      {
        "threshold": 34,
        "points": 19.4
      },
      {
        "threshold": 35,
        "points": 19.7
      },
      {
        "threshold": 36,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 25,
        "points": 3
      },
      {
        "threshold": 26,
        "points": 6
      },
      {
        "threshold": 27,
        "points": 9
      },
      {
        "threshold": 28,
        "points": 12
      },
      {
        "threshold": 29,
        "points": 12.6
      },
      {
        "threshold": 30,
        "points": 13
      },
      {
        "threshold": 31,
        "points": 14
      },
      {
        "threshold": 32,
        "points": 14.6
      },
      {
        "threshold": 33,
        "points": 15
      },
      {
        "threshold": 34,
        "points": 15.6
      },
      {
        "threshold": 35,
        "points": 16
      },
      {
        "threshold": 36,
        "points": 17
      },
      {
        "threshold": 37,
        "points": 17.4
      },
      {
        "threshold": 38,
        "points": 17.6
      },
      {
        "threshold": 39,
        "points": 18
      },
      {
        "threshold": 40,
        "points": 18.2
      },
      {
        "threshold": 41,
        "points": 18.4
      },
      {
        "threshold": 42,
        "points": 18.8
      },
      {
        "threshold": 43,
        "points": 19
      },
      {
        "threshold": 44,
        "points": 19.4
      },
      {
        "threshold": 45,
        "points": 19.7
      },
      {
        "threshold": 46,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1233,
      "pushMin": 12,
      "sitMin": 25
    }
  },
  "male|55-59": {
    "run": [
      {
        "threshold": 651,
        "points": 60
      },
      {
        "threshold": 682,
        "points": 59.5
      },
      {
        "threshold": 698,
        "points": 59
      },
      {
        "threshold": 716,
        "points": 58.5
      },
      {
        "threshold": 734,
        "points": 58
      },
      {
        "threshold": 753,
        "points": 57.5
      },
      {
        "threshold": 773,
        "points": 57
      },
      {
        "threshold": 794,
        "points": 56.5
      },
      {
        "threshold": 816,
        "points": 56
      },
      {
        "threshold": 840,
        "points": 55.5
      },
      {
        "threshold": 865,
        "points": 55
      },
      {
        "threshold": 892,
        "points": 54.5
      },
      {
        "threshold": 920,
        "points": 54
      },
      {
        "threshold": 950,
        "points": 53.5
      },
      {
        "threshold": 982,
        "points": 52
      },
      {
        "threshold": 1017,
        "points": 50.5
      },
      {
        "threshold": 1053,
        "points": 48
      },
      {
        "threshold": 1094,
        "points": 45.5
      },
      {
        "threshold": 1136,
        "points": 43
      },
      {
        "threshold": 1183,
        "points": 40.5
      },
      {
        "threshold": 1233,
        "points": 38
      },
      {
        "threshold": 1288,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 12,
        "points": 1
      },
      {
        "threshold": 13,
        "points": 4
      },
      {
        "threshold": 14,
        "points": 7
      },
      {
        "threshold": 15,
        "points": 10
      },
      {
        "threshold": 16,
        "points": 10.8
      },
      {
        "threshold": 17,
        "points": 11.4
      },
      {
        "threshold": 18,
        "points": 11.8
      },
      {
        "threshold": 19,
        "points": 12.4
      },
      {
        "threshold": 20,
        "points": 13
      },
      {
        "threshold": 21,
        "points": 14
      },
      {
        "threshold": 22,
        "points": 14.8
      },
      {
        "threshold": 23,
        "points": 15.8
      },
      {
        "threshold": 24,
        "points": 16.8
      },
      {
        "threshold": 25,
        "points": 17
      },
      {
        "threshold": 26,
        "points": 17.4
      },
      {
        "threshold": 27,
        "points": 17.8
      },
      {
        "threshold": 28,
        "points": 18
      },
      {
        "threshold": 29,
        "points": 18.4
      },
      {
        "threshold": 30,
        "points": 19
      },
      {
        "threshold": 31,
        "points": 19.4
      },
      {
        "threshold": 32,
        "points": 19.8
      },
      {
        "threshold": 33,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 22,
        "points": 3
      },
      {
        "threshold": 23,
        "points": 6
      },
      {
        "threshold": 24,
        "points": 9
      },
      {
        "threshold": 25,
        "points": 12
      },
      {
        "threshold": 26,
        "points": 12.6
      },
      {
        "threshold": 27,
        "points": 13
      },
      {
        "threshold": 28,
        "points": 13.6
      },
      {
        "threshold": 29,
        "points": 14
      },
      {
        "threshold": 30,
        "points": 14.6
      },
      {
        "threshold": 31,
        "points": 15
      },
      {
        "threshold": 32,
        "points": 15.6
      },
      {
        "threshold": 33,
        "points": 16
      },
      {
        "threshold": 34,
        "points": 17
      },
      {
        "threshold": 35,
        "points": 17.4
      },
      {
        "threshold": 36,
        "points": 17.6
      },
      {
        "threshold": 37,
        "points": 18
      },
      {
        "threshold": 38,
        "points": 18.2
      },
      {
        "threshold": 39,
        "points": 18.4
      },
      {
        "threshold": 40,
        "points": 18.8
      },
      {
        "threshold": 41,
        "points": 19
      },
      {
        "threshold": 42,
        "points": 19.4
      },
      {
        "threshold": 43,
        "points": 19.7
      },
      {
        "threshold": 44,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1288,
      "pushMin": 12,
      "sitMin": 22
    }
  },
  "male|60-plus": {
    "run": [
      {
        "threshold": 682,
        "points": 60
      },
      {
        "threshold": 716,
        "points": 59.5
      },
      {
        "threshold": 734,
        "points": 59
      },
      {
        "threshold": 753,
        "points": 58.5
      },
      {
        "threshold": 773,
        "points": 58
      },
      {
        "threshold": 794,
        "points": 57.5
      },
      {
        "threshold": 816,
        "points": 57
      },
      {
        "threshold": 840,
        "points": 56.5
      },
      {
        "threshold": 865,
        "points": 56
      },
      {
        "threshold": 892,
        "points": 55.5
      },
      {
        "threshold": 920,
        "points": 55
      },
      {
        "threshold": 950,
        "points": 54.5
      },
      {
        "threshold": 982,
        "points": 54
      },
      {
        "threshold": 1017,
        "points": 52.5
      },
      {
        "threshold": 1054,
        "points": 51
      },
      {
        "threshold": 1094,
        "points": 49.5
      },
      {
        "threshold": 1136,
        "points": 47
      },
      {
        "threshold": 1183,
        "points": 44.5
      },
      {
        "threshold": 1233,
        "points": 41.5
      },
      {
        "threshold": 1288,
        "points": 38.5
      },
      {
        "threshold": 1348,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 11,
        "points": 1
      },
      {
        "threshold": 12,
        "points": 4
      },
      {
        "threshold": 13,
        "points": 7
      },
      {
        "threshold": 14,
        "points": 10
      },
      {
        "threshold": 15,
        "points": 10.6
      },
      {
        "threshold": 16,
        "points": 11
      },
      {
        "threshold": 17,
        "points": 11.6
      },
      {
        "threshold": 18,
        "points": 12
      },
      {
        "threshold": 19,
        "points": 12.6
      },
      {
        "threshold": 20,
        "points": 13
      },
      {
        "threshold": 21,
        "points": 14
      },
      {
        "threshold": 22,
        "points": 15
      },
      {
        "threshold": 23,
        "points": 16
      },
      {
        "threshold": 24,
        "points": 17
      },
      {
        "threshold": 25,
        "points": 17.6
      },
      {
        "threshold": 26,
        "points": 18
      },
      {
        "threshold": 27,
        "points": 18.6
      },
      {
        "threshold": 28,
        "points": 19
      },
      {
        "threshold": 29,
        "points": 19.5
      },
      {
        "threshold": 30,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 19,
        "points": 3
      },
      {
        "threshold": 23,
        "points": 12.6
      },
      {
        "threshold": 24,
        "points": 13
      },
      {
        "threshold": 25,
        "points": 13.6
      },
      {
        "threshold": 26,
        "points": 14
      },
      {
        "threshold": 27,
        "points": 14.6
      },
      {
        "threshold": 28,
        "points": 15
      },
      {
        "threshold": 29,
        "points": 15.6
      },
      {
        "threshold": 30,
        "points": 16
      },
      {
        "threshold": 31,
        "points": 17
      },
      {
        "threshold": 32,
        "points": 17.2
      },
      {
        "threshold": 33,
        "points": 17.6
      },
      {
        "threshold": 34,
        "points": 17.8
      },
      {
        "threshold": 35,
        "points": 18
      },
      {
        "threshold": 36,
        "points": 18.2
      },
      {
        "threshold": 37,
        "points": 18.4
      },
      {
        "threshold": 38,
        "points": 18.8
      },
      {
        "threshold": 39,
        "points": 19
      },
      {
        "threshold": 40,
        "points": 19.4
      },
      {
        "threshold": 41,
        "points": 19.7
      },
      {
        "threshold": 42,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1348,
      "pushMin": 11,
      "sitMin": 19
    }
  },
  "female|under-25": {
    "run": [
      {
        "threshold": 623,
        "points": 60
      },
      {
        "threshold": 651,
        "points": 59.5
      },
      {
        "threshold": 666,
        "points": 59
      },
      {
        "threshold": 682,
        "points": 58.5
      },
      {
        "threshold": 698,
        "points": 58
      },
      {
        "threshold": 716,
        "points": 57.5
      },
      {
        "threshold": 734,
        "points": 57
      },
      {
        "threshold": 753,
        "points": 56.5
      },
      {
        "threshold": 773,
        "points": 56
      },
      {
        "threshold": 794,
        "points": 55.5
      },
      {
        "threshold": 816,
        "points": 55
      },
      {
        "threshold": 840,
        "points": 54.5
      },
      {
        "threshold": 865,
        "points": 54
      },
      {
        "threshold": 892,
        "points": 53.5
      },
      {
        "threshold": 920,
        "points": 52
      },
      {
        "threshold": 950,
        "points": 50.5
      },
      {
        "threshold": 982,
        "points": 49
      },
      {
        "threshold": 1017,
        "points": 46
      },
      {
        "threshold": 1054,
        "points": 42.5
      },
      {
        "threshold": 1094,
        "points": 39
      },
      {
        "threshold": 1136,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 15,
        "points": 1
      },
      {
        "threshold": 18,
        "points": 10
      },
      {
        "threshold": 20,
        "points": 11.6
      },
      {
        "threshold": 22,
        "points": 12.6
      },
      {
        "threshold": 23,
        "points": 13
      },
      {
        "threshold": 24,
        "points": 14
      },
      {
        "threshold": 25,
        "points": 14.4
      },
      {
        "threshold": 26,
        "points": 14.6
      },
      {
        "threshold": 27,
        "points": 15
      },
      {
        "threshold": 28,
        "points": 16
      },
      {
        "threshold": 29,
        "points": 16.2
      },
      {
        "threshold": 30,
        "points": 16.4
      },
      {
        "threshold": 31,
        "points": 16.6
      },
      {
        "threshold": 32,
        "points": 16.8
      },
      {
        "threshold": 33,
        "points": 17
      },
      {
        "threshold": 34,
        "points": 17.2
      },
      {
        "threshold": 35,
        "points": 17.6
      },
      {
        "threshold": 36,
        "points": 17.8
      },
      {
        "threshold": 37,
        "points": 18
      },
      {
        "threshold": 38,
        "points": 18.2
      },
      {
        "threshold": 39,
        "points": 18.4
      },
      {
        "threshold": 40,
        "points": 18.6
      },
      {
        "threshold": 41,
        "points": 18.8
      },
      {
        "threshold": 42,
        "points": 19
      },
      {
        "threshold": 43,
        "points": 19.2
      },
      {
        "threshold": 44,
        "points": 19.4
      },
      {
        "threshold": 45,
        "points": 19.6
      },
      {
        "threshold": 46,
        "points": 19.8
      },
      {
        "threshold": 47,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 35,
        "points": 3
      },
      {
        "threshold": 36,
        "points": 6
      },
      {
        "threshold": 37,
        "points": 9
      },
      {
        "threshold": 38,
        "points": 12
      },
      {
        "threshold": 39,
        "points": 13
      },
      {
        "threshold": 40,
        "points": 13.6
      },
      {
        "threshold": 41,
        "points": 14
      },
      {
        "threshold": 42,
        "points": 15
      },
      {
        "threshold": 43,
        "points": 15.6
      },
      {
        "threshold": 44,
        "points": 16
      },
      {
        "threshold": 45,
        "points": 17
      },
      {
        "threshold": 46,
        "points": 17.2
      },
      {
        "threshold": 47,
        "points": 17.6
      },
      {
        "threshold": 48,
        "points": 17.8
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 18.8
      },
      {
        "threshold": 51,
        "points": 19
      },
      {
        "threshold": 52,
        "points": 19.4
      },
      {
        "threshold": 53,
        "points": 19.7
      },
      {
        "threshold": 54,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1136,
      "pushMin": 15,
      "sitMin": 35
    }
  },
  "female|25-29": {
    "run": [
      {
        "threshold": 637,
        "points": 60
      },
      {
        "threshold": 666,
        "points": 59.5
      },
      {
        "threshold": 682,
        "points": 59
      },
      {
        "threshold": 698,
        "points": 58.5
      },
      {
        "threshold": 716,
        "points": 58
      },
      {
        "threshold": 734,
        "points": 57.5
      },
      {
        "threshold": 753,
        "points": 57
      },
      {
        "threshold": 773,
        "points": 56.5
      },
      {
        "threshold": 794,
        "points": 56
      },
      {
        "threshold": 816,
        "points": 55.5
      },
      {
        "threshold": 840,
        "points": 55
      },
      {
        "threshold": 865,
        "points": 54.5
      },
      {
        "threshold": 892,
        "points": 54
      },
      {
        "threshold": 920,
        "points": 53.5
      },
      {
        "threshold": 950,
        "points": 52
      },
      {
        "threshold": 982,
        "points": 50.5
      },
      {
        "threshold": 1017,
        "points": 49
      },
      {
        "threshold": 1053,
        "points": 45.5
      },
      {
        "threshold": 1094,
        "points": 42
      },
      {
        "threshold": 1136,
        "points": 38.5
      },
      {
        "threshold": 1183,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 14,
        "points": 1
      },
      {
        "threshold": 15,
        "points": 4
      },
      {
        "threshold": 18,
        "points": 10.6
      },
      {
        "threshold": 20,
        "points": 11.6
      },
      {
        "threshold": 22,
        "points": 12.6
      },
      {
        "threshold": 23,
        "points": 13
      },
      {
        "threshold": 24,
        "points": 14
      },
      {
        "threshold": 25,
        "points": 14.4
      },
      {
        "threshold": 26,
        "points": 14.6
      },
      {
        "threshold": 27,
        "points": 15
      },
      {
        "threshold": 28,
        "points": 16
      },
      {
        "threshold": 29,
        "points": 16.2
      },
      {
        "threshold": 30,
        "points": 16.4
      },
      {
        "threshold": 31,
        "points": 16.6
      },
      {
        "threshold": 32,
        "points": 16.8
      },
      {
        "threshold": 33,
        "points": 17
      },
      {
        "threshold": 34,
        "points": 17.2
      },
      {
        "threshold": 35,
        "points": 17.6
      },
      {
        "threshold": 36,
        "points": 17.8
      },
      {
        "threshold": 37,
        "points": 18
      },
      {
        "threshold": 38,
        "points": 18.2
      },
      {
        "threshold": 39,
        "points": 18.4
      },
      {
        "threshold": 40,
        "points": 18.6
      },
      {
        "threshold": 41,
        "points": 18.8
      },
      {
        "threshold": 42,
        "points": 19
      },
      {
        "threshold": 43,
        "points": 19.2
      },
      {
        "threshold": 44,
        "points": 19.4
      },
      {
        "threshold": 45,
        "points": 19.6
      },
      {
        "threshold": 46,
        "points": 19.8
      },
      {
        "threshold": 47,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 31,
        "points": 3
      },
      {
        "threshold": 32,
        "points": 6
      },
      {
        "threshold": 33,
        "points": 9
      },
      {
        "threshold": 34,
        "points": 12
      },
      {
        "threshold": 35,
        "points": 12.6
      },
      {
        "threshold": 36,
        "points": 13
      },
      {
        "threshold": 37,
        "points": 13.6
      },
      {
        "threshold": 38,
        "points": 14
      },
      {
        "threshold": 39,
        "points": 14.6
      },
      {
        "threshold": 40,
        "points": 15
      },
      {
        "threshold": 41,
        "points": 15.6
      },
      {
        "threshold": 42,
        "points": 16
      },
      {
        "threshold": 43,
        "points": 17
      },
      {
        "threshold": 44,
        "points": 17.2
      },
      {
        "threshold": 45,
        "points": 17.8
      },
      {
        "threshold": 46,
        "points": 18
      },
      {
        "threshold": 47,
        "points": 18.8
      },
      {
        "threshold": 48,
        "points": 19
      },
      {
        "threshold": 49,
        "points": 19.5
      },
      {
        "threshold": 50,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1183,
      "pushMin": 14,
      "sitMin": 31
    }
  },
  "female|30-34": {
    "run": [
      {
        "threshold": 651,
        "points": 60
      },
      {
        "threshold": 682,
        "points": 59.5
      },
      {
        "threshold": 698,
        "points": 59
      },
      {
        "threshold": 716,
        "points": 58.5
      },
      {
        "threshold": 734,
        "points": 58
      },
      {
        "threshold": 753,
        "points": 57.5
      },
      {
        "threshold": 773,
        "points": 57
      },
      {
        "threshold": 794,
        "points": 56.5
      },
      {
        "threshold": 816,
        "points": 56
      },
      {
        "threshold": 840,
        "points": 55.5
      },
      {
        "threshold": 865,
        "points": 55
      },
      {
        "threshold": 892,
        "points": 54.5
      },
      {
        "threshold": 920,
        "points": 54
      },
      {
        "threshold": 950,
        "points": 52.5
      },
      {
        "threshold": 982,
        "points": 51
      },
      {
        "threshold": 1017,
        "points": 49.5
      },
      {
        "threshold": 1054,
        "points": 47
      },
      {
        "threshold": 1094,
        "points": 44.5
      },
      {
        "threshold": 1136,
        "points": 42
      },
      {
        "threshold": 1183,
        "points": 38.5
      },
      {
        "threshold": 1233,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 11,
        "points": 1
      },
      {
        "threshold": 13,
        "points": 7
      },
      {
        "threshold": 14,
        "points": 10
      },
      {
        "threshold": 17,
        "points": 13.6
      },
      {
        "threshold": 21,
        "points": 15.6
      },
      {
        "threshold": 22,
        "points": 15.8
      },
      {
        "threshold": 23,
        "points": 16
      },
      {
        "threshold": 24,
        "points": 16.4
      },
      {
        "threshold": 25,
        "points": 16.6
      },
      {
        "threshold": 26,
        "points": 17
      },
      {
        "threshold": 27,
        "points": 17.2
      },
      {
        "threshold": 28,
        "points": 17.3
      },
      {
        "threshold": 29,
        "points": 17.4
      },
      {
        "threshold": 30,
        "points": 17.6
      },
      {
        "threshold": 31,
        "points": 17.8
      },
      {
        "threshold": 32,
        "points": 17.9
      },
      {
        "threshold": 33,
        "points": 18
      },
      {
        "threshold": 34,
        "points": 18.1
      },
      {
        "threshold": 35,
        "points": 18.2
      },
      {
        "threshold": 36,
        "points": 18.4
      },
      {
        "threshold": 37,
        "points": 18.6
      },
      {
        "threshold": 38,
        "points": 18.7
      },
      {
        "threshold": 39,
        "points": 18.8
      },
      {
        "threshold": 40,
        "points": 19
      },
      {
        "threshold": 41,
        "points": 19.2
      },
      {
        "threshold": 42,
        "points": 19.4
      },
      {
        "threshold": 43,
        "points": 19.6
      },
      {
        "threshold": 44,
        "points": 19.8
      },
      {
        "threshold": 45,
        "points": 19.9
      },
      {
        "threshold": 46,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 26,
        "points": 3
      },
      {
        "threshold": 27,
        "points": 6
      },
      {
        "threshold": 28,
        "points": 9
      },
      {
        "threshold": 29,
        "points": 12
      },
      {
        "threshold": 30,
        "points": 13
      },
      {
        "threshold": 31,
        "points": 13.6
      },
      {
        "threshold": 32,
        "points": 14
      },
      {
        "threshold": 33,
        "points": 15
      },
      {
        "threshold": 34,
        "points": 15.6
      },
      {
        "threshold": 35,
        "points": 16
      },
      {
        "threshold": 36,
        "points": 16.4
      },
      {
        "threshold": 37,
        "points": 16.6
      },
      {
        "threshold": 38,
        "points": 17
      },
      {
        "threshold": 39,
        "points": 17.6
      },
      {
        "threshold": 40,
        "points": 18
      },
      {
        "threshold": 41,
        "points": 18.8
      },
      {
        "threshold": 42,
        "points": 19
      },
      {
        "threshold": 43,
        "points": 19.4
      },
      {
        "threshold": 44,
        "points": 19.7
      },
      {
        "threshold": 45,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1233,
      "pushMin": 11,
      "sitMin": 26
    }
  },
  "female|35-39": {
    "run": [
      {
        "threshold": 666,
        "points": 60
      },
      {
        "threshold": 698,
        "points": 59.5
      },
      {
        "threshold": 716,
        "points": 59
      },
      {
        "threshold": 734,
        "points": 58.5
      },
      {
        "threshold": 753,
        "points": 58
      },
      {
        "threshold": 773,
        "points": 57.5
      },
      {
        "threshold": 794,
        "points": 57
      },
      {
        "threshold": 816,
        "points": 56.5
      },
      {
        "threshold": 840,
        "points": 56
      },
      {
        "threshold": 865,
        "points": 55.5
      },
      {
        "threshold": 892,
        "points": 55
      },
      {
        "threshold": 920,
        "points": 54.5
      },
      {
        "threshold": 950,
        "points": 54
      },
      {
        "threshold": 982,
        "points": 52.5
      },
      {
        "threshold": 1017,
        "points": 51
      },
      {
        "threshold": 1053,
        "points": 49.5
      },
      {
        "threshold": 1094,
        "points": 47
      },
      {
        "threshold": 1136,
        "points": 44
      },
      {
        "threshold": 1183,
        "points": 41
      },
      {
        "threshold": 1233,
        "points": 38
      },
      {
        "threshold": 1288,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 10,
        "points": 1
      },
      {
        "threshold": 13,
        "points": 10
      },
      {
        "threshold": 17,
        "points": 14
      },
      {
        "threshold": 18,
        "points": 15
      },
      {
        "threshold": 19,
        "points": 15.2
      },
      {
        "threshold": 20,
        "points": 15.6
      },
      {
        "threshold": 21,
        "points": 15.8
      },
      {
        "threshold": 22,
        "points": 16
      },
      {
        "threshold": 23,
        "points": 16.4
      },
      {
        "threshold": 24,
        "points": 16.6
      },
      {
        "threshold": 25,
        "points": 17
      },
      {
        "threshold": 26,
        "points": 17.2
      },
      {
        "threshold": 27,
        "points": 17.3
      },
      {
        "threshold": 28,
        "points": 17.4
      },
      {
        "threshold": 29,
        "points": 17.6
      },
      {
        "threshold": 30,
        "points": 17.8
      },
      {
        "threshold": 31,
        "points": 17.9
      },
      {
        "threshold": 32,
        "points": 18
      },
      {
        "threshold": 33,
        "points": 18.1
      },
      {
        "threshold": 34,
        "points": 18.2
      },
      {
        "threshold": 35,
        "points": 18.4
      },
      {
        "threshold": 36,
        "points": 18.6
      },
      {
        "threshold": 37,
        "points": 18.7
      },
      {
        "threshold": 38,
        "points": 18.8
      },
      {
        "threshold": 39,
        "points": 19
      },
      {
        "threshold": 40,
        "points": 19.4
      },
      {
        "threshold": 41,
        "points": 19.7
      },
      {
        "threshold": 42,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 24,
        "points": 3
      },
      {
        "threshold": 25,
        "points": 6
      },
      {
        "threshold": 26,
        "points": 9
      },
      {
        "threshold": 27,
        "points": 12
      },
      {
        "threshold": 28,
        "points": 13
      },
      {
        "threshold": 29,
        "points": 13.6
      },
      {
        "threshold": 30,
        "points": 14
      },
      {
        "threshold": 31,
        "points": 15
      },
      {
        "threshold": 32,
        "points": 15.6
      },
      {
        "threshold": 33,
        "points": 16
      },
      {
        "threshold": 34,
        "points": 16.4
      },
      {
        "threshold": 35,
        "points": 16.6
      },
      {
        "threshold": 36,
        "points": 17
      },
      {
        "threshold": 37,
        "points": 17.6
      },
      {
        "threshold": 38,
        "points": 18
      },
      {
        "threshold": 39,
        "points": 18.8
      },
      {
        "threshold": 40,
        "points": 19
      },
      {
        "threshold": 41,
        "points": 19.4
      },
      {
        "threshold": 42,
        "points": 19.7
      },
      {
        "threshold": 43,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1288,
      "pushMin": 10,
      "sitMin": 24
    }
  },
  "female|40-44": {
    "run": [
      {
        "threshold": 682,
        "points": 60
      },
      {
        "threshold": 716,
        "points": 59.5
      },
      {
        "threshold": 734,
        "points": 59
      },
      {
        "threshold": 753,
        "points": 58.5
      },
      {
        "threshold": 773,
        "points": 58
      },
      {
        "threshold": 794,
        "points": 57.5
      },
      {
        "threshold": 816,
        "points": 57
      },
      {
        "threshold": 840,
        "points": 56.5
      },
      {
        "threshold": 865,
        "points": 56
      },
      {
        "threshold": 892,
        "points": 55.5
      },
      {
        "threshold": 920,
        "points": 55
      },
      {
        "threshold": 950,
        "points": 54.5
      },
      {
        "threshold": 982,
        "points": 54
      },
      {
        "threshold": 1017,
        "points": 53.5
      },
      {
        "threshold": 1053,
        "points": 52
      },
      {
        "threshold": 1094,
        "points": 50.5
      },
      {
        "threshold": 1136,
        "points": 48
      },
      {
        "threshold": 1183,
        "points": 45.5
      },
      {
        "threshold": 1233,
        "points": 42
      },
      {
        "threshold": 1288,
        "points": 38.5
      },
      {
        "threshold": 1348,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 8,
        "points": 1
      },
      {
        "threshold": 9,
        "points": 4
      },
      {
        "threshold": 13,
        "points": 12
      },
      {
        "threshold": 14,
        "points": 13
      },
      {
        "threshold": 15,
        "points": 14
      },
      {
        "threshold": 16,
        "points": 15
      },
      {
        "threshold": 17,
        "points": 15.6
      },
      {
        "threshold": 18,
        "points": 16
      },
      {
        "threshold": 19,
        "points": 16.2
      },
      {
        "threshold": 20,
        "points": 16.4
      },
      {
        "threshold": 21,
        "points": 16.6
      },
      {
        "threshold": 22,
        "points": 16.8
      },
      {
        "threshold": 23,
        "points": 17
      },
      {
        "threshold": 24,
        "points": 17.1
      },
      {
        "threshold": 25,
        "points": 17.2
      },
      {
        "threshold": 26,
        "points": 17.6
      },
      {
        "threshold": 27,
        "points": 17.8
      },
      {
        "threshold": 28,
        "points": 18
      },
      {
        "threshold": 29,
        "points": 18.2
      },
      {
        "threshold": 30,
        "points": 18.4
      },
      {
        "threshold": 31,
        "points": 18.6
      },
      {
        "threshold": 32,
        "points": 18.8
      },
      {
        "threshold": 33,
        "points": 19
      },
      {
        "threshold": 34,
        "points": 19.2
      },
      {
        "threshold": 35,
        "points": 19.4
      },
      {
        "threshold": 36,
        "points": 19.6
      },
      {
        "threshold": 37,
        "points": 19.8
      },
      {
        "threshold": 38,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 21,
        "points": 3
      },
      {
        "threshold": 22,
        "points": 6
      },
      {
        "threshold": 23,
        "points": 9
      },
      {
        "threshold": 24,
        "points": 12
      },
      {
        "threshold": 25,
        "points": 12.8
      },
      {
        "threshold": 26,
        "points": 13.6
      },
      {
        "threshold": 27,
        "points": 14
      },
      {
        "threshold": 28,
        "points": 15
      },
      {
        "threshold": 29,
        "points": 16
      },
      {
        "threshold": 30,
        "points": 16.4
      },
      {
        "threshold": 31,
        "points": 16.6
      },
      {
        "threshold": 32,
        "points": 17
      },
      {
        "threshold": 33,
        "points": 17.6
      },
      {
        "threshold": 34,
        "points": 18
      },
      {
        "threshold": 35,
        "points": 18.2
      },
      {
        "threshold": 36,
        "points": 18.4
      },
      {
        "threshold": 37,
        "points": 18.8
      },
      {
        "threshold": 38,
        "points": 19
      },
      {
        "threshold": 39,
        "points": 19.4
      },
      {
        "threshold": 40,
        "points": 19.7
      },
      {
        "threshold": 41,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1348,
      "pushMin": 8,
      "sitMin": 21
    }
  },
  "female|45-49": {
    "run": [
      {
        "threshold": 698,
        "points": 60
      },
      {
        "threshold": 734,
        "points": 59.5
      },
      {
        "threshold": 753,
        "points": 59
      },
      {
        "threshold": 773,
        "points": 58.5
      },
      {
        "threshold": 794,
        "points": 58
      },
      {
        "threshold": 816,
        "points": 57.5
      },
      {
        "threshold": 840,
        "points": 57
      },
      {
        "threshold": 865,
        "points": 56.5
      },
      {
        "threshold": 892,
        "points": 56
      },
      {
        "threshold": 920,
        "points": 55.5
      },
      {
        "threshold": 950,
        "points": 55
      },
      {
        "threshold": 982,
        "points": 54.5
      },
      {
        "threshold": 1017,
        "points": 54
      },
      {
        "threshold": 1053,
        "points": 53.5
      },
      {
        "threshold": 1094,
        "points": 52
      },
      {
        "threshold": 1136,
        "points": 50.5
      },
      {
        "threshold": 1183,
        "points": 48
      },
      {
        "threshold": 1233,
        "points": 45
      },
      {
        "threshold": 1288,
        "points": 42
      },
      {
        "threshold": 1348,
        "points": 38.5
      },
      {
        "threshold": 1414,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 7,
        "points": 1
      },
      {
        "threshold": 8,
        "points": 4
      },
      {
        "threshold": 12,
        "points": 12
      },
      {
        "threshold": 13,
        "points": 13
      },
      {
        "threshold": 14,
        "points": 14
      },
      {
        "threshold": 15,
        "points": 15
      },
      {
        "threshold": 16,
        "points": 15.6
      },
      {
        "threshold": 17,
        "points": 16
      },
      {
        "threshold": 18,
        "points": 16.2
      },
      {
        "threshold": 19,
        "points": 16.4
      },
      {
        "threshold": 20,
        "points": 16.6
      },
      {
        "threshold": 21,
        "points": 16.8
      },
      {
        "threshold": 22,
        "points": 17
      },
      {
        "threshold": 23,
        "points": 17.1
      },
      {
        "threshold": 24,
        "points": 17.2
      },
      {
        "threshold": 25,
        "points": 17.6
      },
      {
        "threshold": 26,
        "points": 17.8
      },
      {
        "threshold": 27,
        "points": 18
      },
      {
        "threshold": 28,
        "points": 18.2
      },
      {
        "threshold": 29,
        "points": 18.4
      },
      {
        "threshold": 30,
        "points": 18.6
      },
      {
        "threshold": 31,
        "points": 18.8
      },
      {
        "threshold": 32,
        "points": 19
      },
      {
        "threshold": 33,
        "points": 19.2
      },
      {
        "threshold": 34,
        "points": 19.4
      },
      {
        "threshold": 35,
        "points": 19.6
      },
      {
        "threshold": 36,
        "points": 19.8
      },
      {
        "threshold": 37,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 19,
        "points": 3
      },
      {
        "threshold": 20,
        "points": 6
      },
      {
        "threshold": 21,
        "points": 9
      },
      {
        "threshold": 22,
        "points": 12
      },
      {
        "threshold": 23,
        "points": 16
      },
      {
        "threshold": 24,
        "points": 16.4
      },
      {
        "threshold": 25,
        "points": 16.6
      },
      {
        "threshold": 26,
        "points": 17
      },
      {
        "threshold": 27,
        "points": 17.6
      },
      {
        "threshold": 28,
        "points": 18
      },
      {
        "threshold": 29,
        "points": 18.2
      },
      {
        "threshold": 30,
        "points": 18.4
      },
      {
        "threshold": 31,
        "points": 18.8
      },
      {
        "threshold": 32,
        "points": 19
      },
      {
        "threshold": 33,
        "points": 19.4
      },
      {
        "threshold": 34,
        "points": 19.7
      },
      {
        "threshold": 35,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1414,
      "pushMin": 7,
      "sitMin": 19
    }
  },
  "female|50-54": {
    "run": [
      {
        "threshold": 773,
        "points": 60
      },
      {
        "threshold": 816,
        "points": 59.5
      },
      {
        "threshold": 840,
        "points": 59
      },
      {
        "threshold": 865,
        "points": 58.5
      },
      {
        "threshold": 892,
        "points": 58
      },
      {
        "threshold": 920,
        "points": 57.5
      },
      {
        "threshold": 950,
        "points": 57
      },
      {
        "threshold": 982,
        "points": 56.5
      },
      {
        "threshold": 1017,
        "points": 56
      },
      {
        "threshold": 1053,
        "points": 55.5
      },
      {
        "threshold": 1094,
        "points": 55
      },
      {
        "threshold": 1136,
        "points": 53.5
      },
      {
        "threshold": 1183,
        "points": 52
      },
      {
        "threshold": 1233,
        "points": 49.5
      },
      {
        "threshold": 1288,
        "points": 46
      },
      {
        "threshold": 1348,
        "points": 42.5
      },
      {
        "threshold": 1414,
        "points": 39
      },
      {
        "threshold": 1486,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 6,
        "points": 1
      },
      {
        "threshold": 10,
        "points": 11
      },
      {
        "threshold": 11,
        "points": 12
      },
      {
        "threshold": 12,
        "points": 13
      },
      {
        "threshold": 13,
        "points": 14
      },
      {
        "threshold": 14,
        "points": 15
      },
      {
        "threshold": 15,
        "points": 16
      },
      {
        "threshold": 16,
        "points": 16.2
      },
      {
        "threshold": 17,
        "points": 16.4
      },
      {
        "threshold": 18,
        "points": 16.6
      },
      {
        "threshold": 19,
        "points": 16.8
      },
      {
        "threshold": 20,
        "points": 17
      },
      {
        "threshold": 21,
        "points": 17.2
      },
      {
        "threshold": 22,
        "points": 17.3
      },
      {
        "threshold": 23,
        "points": 17.4
      },
      {
        "threshold": 24,
        "points": 17.6
      },
      {
        "threshold": 25,
        "points": 18
      },
      {
        "threshold": 26,
        "points": 18.2
      },
      {
        "threshold": 27,
        "points": 18.4
      },
      {
        "threshold": 28,
        "points": 18.6
      },
      {
        "threshold": 29,
        "points": 18.8
      },
      {
        "threshold": 30,
        "points": 19
      },
      {
        "threshold": 31,
        "points": 19.2
      },
      {
        "threshold": 32,
        "points": 19.4
      },
      {
        "threshold": 33,
        "points": 19.6
      },
      {
        "threshold": 34,
        "points": 19.8
      },
      {
        "threshold": 35,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 17,
        "points": 3
      },
      {
        "threshold": 18,
        "points": 6
      },
      {
        "threshold": 19,
        "points": 9
      },
      {
        "threshold": 20,
        "points": 12
      },
      {
        "threshold": 21,
        "points": 13
      },
      {
        "threshold": 22,
        "points": 14
      },
      {
        "threshold": 23,
        "points": 15
      },
      {
        "threshold": 24,
        "points": 16
      },
      {
        "threshold": 25,
        "points": 17
      },
      {
        "threshold": 26,
        "points": 17.2
      },
      {
        "threshold": 27,
        "points": 17.6
      },
      {
        "threshold": 28,
        "points": 17.8
      },
      {
        "threshold": 29,
        "points": 18
      },
      {
        "threshold": 30,
        "points": 19
      },
      {
        "threshold": 31,
        "points": 19.5
      },
      {
        "threshold": 32,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1486,
      "pushMin": 6,
      "sitMin": 17
    }
  },
  "female|55-59": {
    "run": [
      {
        "threshold": 794,
        "points": 60
      },
      {
        "threshold": 840,
        "points": 59.5
      },
      {
        "threshold": 865,
        "points": 59
      },
      {
        "threshold": 892,
        "points": 58.5
      },
      {
        "threshold": 920,
        "points": 58
      },
      {
        "threshold": 950,
        "points": 57.5
      },
      {
        "threshold": 982,
        "points": 57
      },
      {
        "threshold": 1017,
        "points": 56.5
      },
      {
        "threshold": 1053,
        "points": 56
      },
      {
        "threshold": 1094,
        "points": 55.5
      },
      {
        "threshold": 1136,
        "points": 55
      },
      {
        "threshold": 1183,
        "points": 53.5
      },
      {
        "threshold": 1233,
        "points": 52
      },
      {
        "threshold": 1288,
        "points": 49
      },
      {
        "threshold": 1348,
        "points": 46
      },
      {
        "threshold": 1414,
        "points": 43
      },
      {
        "threshold": 1486,
        "points": 39
      },
      {
        "threshold": 1566,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 5,
        "points": 1
      },
      {
        "threshold": 6,
        "points": 4
      },
      {
        "threshold": 7,
        "points": 7
      },
      {
        "threshold": 8,
        "points": 10
      },
      {
        "threshold": 9,
        "points": 11
      },
      {
        "threshold": 10,
        "points": 12
      },
      {
        "threshold": 11,
        "points": 13
      },
      {
        "threshold": 12,
        "points": 14
      },
      {
        "threshold": 13,
        "points": 15
      },
      {
        "threshold": 14,
        "points": 16
      },
      {
        "threshold": 15,
        "points": 16.2
      },
      {
        "threshold": 16,
        "points": 16.4
      },
      {
        "threshold": 17,
        "points": 16.6
      },
      {
        "threshold": 18,
        "points": 16.8
      },
      {
        "threshold": 19,
        "points": 17
      },
      {
        "threshold": 20,
        "points": 17.2
      },
      {
        "threshold": 21,
        "points": 17.6
      },
      {
        "threshold": 22,
        "points": 18
      },
      {
        "threshold": 23,
        "points": 18.6
      },
      {
        "threshold": 24,
        "points": 19
      },
      {
        "threshold": 25,
        "points": 19.2
      },
      {
        "threshold": 26,
        "points": 19.4
      },
      {
        "threshold": 27,
        "points": 19.7
      },
      {
        "threshold": 28,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 12,
        "points": 3
      },
      {
        "threshold": 15,
        "points": 12
      },
      {
        "threshold": 16,
        "points": 12.6
      },
      {
        "threshold": 17,
        "points": 13
      },
      {
        "threshold": 18,
        "points": 13.6
      },
      {
        "threshold": 19,
        "points": 14
      },
      {
        "threshold": 20,
        "points": 14.6
      },
      {
        "threshold": 21,
        "points": 15
      },
      {
        "threshold": 22,
        "points": 16
      },
      {
        "threshold": 23,
        "points": 17
      },
      {
        "threshold": 24,
        "points": 17.2
      },
      {
        "threshold": 25,
        "points": 17.6
      },
      {
        "threshold": 26,
        "points": 17.8
      },
      {
        "threshold": 27,
        "points": 18
      },
      {
        "threshold": 28,
        "points": 19
      },
      {
        "threshold": 29,
        "points": 19.2
      },
      {
        "threshold": 30,
        "points": 19.4
      },
      {
        "threshold": 31,
        "points": 19.7
      },
      {
        "threshold": 32,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1566,
      "pushMin": 5,
      "sitMin": 12
    }
  },
  "female|60-plus": {
    "run": [
      {
        "threshold": 840,
        "points": 60
      },
      {
        "threshold": 892,
        "points": 59.5
      },
      {
        "threshold": 920,
        "points": 59
      },
      {
        "threshold": 950,
        "points": 58.5
      },
      {
        "threshold": 982,
        "points": 58
      },
      {
        "threshold": 1017,
        "points": 57.5
      },
      {
        "threshold": 1054,
        "points": 57
      },
      {
        "threshold": 1094,
        "points": 56.5
      },
      {
        "threshold": 1136,
        "points": 56
      },
      {
        "threshold": 1183,
        "points": 55.5
      },
      {
        "threshold": 1233,
        "points": 54
      },
      {
        "threshold": 1288,
        "points": 52.5
      },
      {
        "threshold": 1348,
        "points": 51
      },
      {
        "threshold": 1414,
        "points": 47
      },
      {
        "threshold": 1486,
        "points": 43
      },
      {
        "threshold": 1566,
        "points": 39
      },
      {
        "threshold": 1647,
        "points": 35
      }
    ],
    "pushups": [
      {
        "threshold": 4,
        "points": 1
      },
      {
        "threshold": 5,
        "points": 4
      },
      {
        "threshold": 6,
        "points": 7
      },
      {
        "threshold": 7,
        "points": 10
      },
      {
        "threshold": 8,
        "points": 10.6
      },
      {
        "threshold": 9,
        "points": 11.4
      },
      {
        "threshold": 10,
        "points": 12
      },
      {
        "threshold": 11,
        "points": 13
      },
      {
        "threshold": 12,
        "points": 14
      },
      {
        "threshold": 13,
        "points": 15
      },
      {
        "threshold": 14,
        "points": 16
      },
      {
        "threshold": 15,
        "points": 17
      },
      {
        "threshold": 16,
        "points": 17.6
      },
      {
        "threshold": 17,
        "points": 18
      },
      {
        "threshold": 18,
        "points": 18.8
      },
      {
        "threshold": 19,
        "points": 19
      },
      {
        "threshold": 20,
        "points": 19.5
      },
      {
        "threshold": 21,
        "points": 20
      }
    ],
    "situps": [
      {
        "threshold": 8,
        "points": 3
      },
      {
        "threshold": 9,
        "points": 6
      },
      {
        "threshold": 10,
        "points": 9
      },
      {
        "threshold": 11,
        "points": 12
      },
      {
        "threshold": 12,
        "points": 13
      },
      {
        "threshold": 13,
        "points": 14
      },
      {
        "threshold": 14,
        "points": 14.6
      },
      {
        "threshold": 15,
        "points": 15
      },
      {
        "threshold": 16,
        "points": 15.6
      },
      {
        "threshold": 17,
        "points": 16
      },
      {
        "threshold": 18,
        "points": 16.4
      },
      {
        "threshold": 19,
        "points": 16.6
      },
      {
        "threshold": 20,
        "points": 16.8
      },
      {
        "threshold": 21,
        "points": 17
      },
      {
        "threshold": 22,
        "points": 17.2
      },
      {
        "threshold": 23,
        "points": 17.4
      },
      {
        "threshold": 24,
        "points": 17.6
      },
      {
        "threshold": 25,
        "points": 17.8
      },
      {
        "threshold": 26,
        "points": 18
      },
      {
        "threshold": 27,
        "points": 18.8
      },
      {
        "threshold": 28,
        "points": 19
      },
      {
        "threshold": 29,
        "points": 19.4
      },
      {
        "threshold": 30,
        "points": 19.7
      },
      {
        "threshold": 31,
        "points": 20
      }
    ],
    "minimums": {
      "runMaxSec": 1647,
      "pushMin": 4,
      "sitMin": 8
    }
  }
}
