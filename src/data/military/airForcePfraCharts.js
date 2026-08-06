/**
 * Official USAF Physical Fitness Readiness Assessment (PFRA) scoring charts.
 * Source: AFPC "Final USAF Physical Fitness Readiness Assessment Scoring"
 * (Effective 1 Mar 2026), PFRA Scoring Charts.pdf
 * https://www.afpc.af.mil/Portals/70/documents/FITNESS/PFRA%20Scoring%20Charts.pdf
 *
 * Encoded: WHtR, 1-min push-ups, hand-release push-ups, sit-ups,
 * cross-leg reverse crunch, forearm plank, 2-mile run, 20m HAMR.
 * Not encoded: 2km walk (pass/fail only), AFSPECWAR/EOD specialty charts.
 */

export const AIR_FORCE_PFRA_SOURCE = {
  name: 'USAF PFRA Scoring Charts (Effective 1 Mar 2026)',
  detail:
    'Official Physical Fitness Readiness Assessment scoring from AFPC. Composite is out of 100 (cardio 50, WHtR 20, strength 15, core 15). Pass requires component minimums (*) and a composite of at least 75. Categories: Excellent ≥90, Satisfactory 75–89.9, Unsatisfactory <75. 2km walk and AFSPECWAR/EOD charts are not scored here.',
  url: 'https://www.afpc.af.mil/Career-Management/Fitness-Program/',
}

export const AIR_FORCE_PFRA_MINIMUMS = {
  strength: 2.5,
  core: 2.5,
  cardio: 35,
  whtr: 2.5,
  composite: 75,
}

/** @type {Record<string, object>} */
export const AIR_FORCE_PFRA_CHARTS = {
  "male|under-25": {
    "pushups": [
      {
        "threshold": 30,
        "points": 2.5
      },
      {
        "threshold": 31,
        "points": 3
      },
      {
        "threshold": 33,
        "points": 3.5
      },
      {
        "threshold": 34,
        "points": 4
      },
      {
        "threshold": 36,
        "points": 4.5
      },
      {
        "threshold": 37,
        "points": 5
      },
      {
        "threshold": 39,
        "points": 5.5
      },
      {
        "threshold": 40,
        "points": 6
      },
      {
        "threshold": 42,
        "points": 6.5
      },
      {
        "threshold": 43,
        "points": 7
      },
      {
        "threshold": 45,
        "points": 7.5
      },
      {
        "threshold": 46,
        "points": 8
      },
      {
        "threshold": 48,
        "points": 8.5
      },
      {
        "threshold": 49,
        "points": 9
      },
      {
        "threshold": 51,
        "points": 9.5
      },
      {
        "threshold": 52,
        "points": 10
      },
      {
        "threshold": 54,
        "points": 10.5
      },
      {
        "threshold": 55,
        "points": 11
      },
      {
        "threshold": 57,
        "points": 11.5
      },
      {
        "threshold": 58,
        "points": 12
      },
      {
        "threshold": 60,
        "points": 12.5
      },
      {
        "threshold": 61,
        "points": 13
      },
      {
        "threshold": 63,
        "points": 13.5
      },
      {
        "threshold": 64,
        "points": 14
      },
      {
        "threshold": 66,
        "points": 14.5
      },
      {
        "threshold": 67,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 27,
        "points": 2.5
      },
      {
        "threshold": 28,
        "points": 3
      },
      {
        "threshold": 29,
        "points": 3.5
      },
      {
        "threshold": 30,
        "points": 4
      },
      {
        "threshold": 31,
        "points": 4.5
      },
      {
        "threshold": 32,
        "points": 5
      },
      {
        "threshold": 33,
        "points": 5.5
      },
      {
        "threshold": 34,
        "points": 6
      },
      {
        "threshold": 35,
        "points": 6.5
      },
      {
        "threshold": 36,
        "points": 7
      },
      {
        "threshold": 37,
        "points": 7.5
      },
      {
        "threshold": 38,
        "points": 8
      },
      {
        "threshold": 39,
        "points": 8.5
      },
      {
        "threshold": 40,
        "points": 9
      },
      {
        "threshold": 41,
        "points": 9.5
      },
      {
        "threshold": 42,
        "points": 10
      },
      {
        "threshold": 43,
        "points": 10.5
      },
      {
        "threshold": 44,
        "points": 11
      },
      {
        "threshold": 45,
        "points": 11.5
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 12.5
      },
      {
        "threshold": 48,
        "points": 13
      },
      {
        "threshold": 49,
        "points": 13.5
      },
      {
        "threshold": 50,
        "points": 14
      },
      {
        "threshold": 51,
        "points": 14.5
      },
      {
        "threshold": 52,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 33,
        "points": 2.5
      },
      {
        "threshold": 34,
        "points": 3
      },
      {
        "threshold": 35,
        "points": 3.5
      },
      {
        "threshold": 36,
        "points": 4
      },
      {
        "threshold": 37,
        "points": 4.5
      },
      {
        "threshold": 38,
        "points": 5
      },
      {
        "threshold": 39,
        "points": 5.5
      },
      {
        "threshold": 40,
        "points": 6
      },
      {
        "threshold": 41,
        "points": 6.5
      },
      {
        "threshold": 42,
        "points": 7
      },
      {
        "threshold": 43,
        "points": 7.5
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 8.5
      },
      {
        "threshold": 46,
        "points": 9
      },
      {
        "threshold": 47,
        "points": 9.5
      },
      {
        "threshold": 48,
        "points": 10
      },
      {
        "threshold": 49,
        "points": 10.5
      },
      {
        "threshold": 50,
        "points": 11
      },
      {
        "threshold": 51,
        "points": 11.5
      },
      {
        "threshold": 52,
        "points": 12
      },
      {
        "threshold": 53,
        "points": 12.5
      },
      {
        "threshold": 54,
        "points": 13
      },
      {
        "threshold": 55,
        "points": 13.5
      },
      {
        "threshold": 56,
        "points": 14
      },
      {
        "threshold": 57,
        "points": 14.5
      },
      {
        "threshold": 58,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 35,
        "points": 2.5
      },
      {
        "threshold": 36,
        "points": 3
      },
      {
        "threshold": 37,
        "points": 3.5
      },
      {
        "threshold": 38,
        "points": 4
      },
      {
        "threshold": 39,
        "points": 4.5
      },
      {
        "threshold": 40,
        "points": 5
      },
      {
        "threshold": 41,
        "points": 5.5
      },
      {
        "threshold": 42,
        "points": 6
      },
      {
        "threshold": 43,
        "points": 6.5
      },
      {
        "threshold": 44,
        "points": 7
      },
      {
        "threshold": 45,
        "points": 7.5
      },
      {
        "threshold": 46,
        "points": 8
      },
      {
        "threshold": 47,
        "points": 8.5
      },
      {
        "threshold": 48,
        "points": 9
      },
      {
        "threshold": 49,
        "points": 9.5
      },
      {
        "threshold": 50,
        "points": 10
      },
      {
        "threshold": 51,
        "points": 10.5
      },
      {
        "threshold": 52,
        "points": 11
      },
      {
        "threshold": 53,
        "points": 11.5
      },
      {
        "threshold": 54,
        "points": 12
      },
      {
        "threshold": 55,
        "points": 12.5
      },
      {
        "threshold": 56,
        "points": 13
      },
      {
        "threshold": 57,
        "points": 13.5
      },
      {
        "threshold": 58,
        "points": 14
      },
      {
        "threshold": 59,
        "points": 14.5
      },
      {
        "threshold": 60,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 95,
        "points": 2.5
      },
      {
        "threshold": 100,
        "points": 3
      },
      {
        "threshold": 105,
        "points": 3.5
      },
      {
        "threshold": 110,
        "points": 4
      },
      {
        "threshold": 115,
        "points": 4.5
      },
      {
        "threshold": 120,
        "points": 5
      },
      {
        "threshold": 125,
        "points": 5.5
      },
      {
        "threshold": 130,
        "points": 6
      },
      {
        "threshold": 135,
        "points": 6.5
      },
      {
        "threshold": 140,
        "points": 7
      },
      {
        "threshold": 145,
        "points": 7.5
      },
      {
        "threshold": 150,
        "points": 8
      },
      {
        "threshold": 155,
        "points": 8.5
      },
      {
        "threshold": 160,
        "points": 9
      },
      {
        "threshold": 165,
        "points": 9.5
      },
      {
        "threshold": 170,
        "points": 10
      },
      {
        "threshold": 175,
        "points": 10.5
      },
      {
        "threshold": 180,
        "points": 11
      },
      {
        "threshold": 185,
        "points": 11.5
      },
      {
        "threshold": 190,
        "points": 12
      },
      {
        "threshold": 195,
        "points": 12.5
      },
      {
        "threshold": 200,
        "points": 13
      },
      {
        "threshold": 205,
        "points": 13.5
      },
      {
        "threshold": 210,
        "points": 14
      },
      {
        "threshold": 215,
        "points": 14.5
      },
      {
        "threshold": 220,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 805,
        "points": 50
      },
      {
        "threshold": 824,
        "points": 49.5
      },
      {
        "threshold": 843,
        "points": 49
      },
      {
        "threshold": 862,
        "points": 48
      },
      {
        "threshold": 881,
        "points": 47
      },
      {
        "threshold": 900,
        "points": 46
      },
      {
        "threshold": 919,
        "points": 45
      },
      {
        "threshold": 938,
        "points": 44
      },
      {
        "threshold": 957,
        "points": 43
      },
      {
        "threshold": 976,
        "points": 42
      },
      {
        "threshold": 995,
        "points": 41
      },
      {
        "threshold": 1014,
        "points": 40
      },
      {
        "threshold": 1033,
        "points": 39
      },
      {
        "threshold": 1052,
        "points": 38.5
      },
      {
        "threshold": 1071,
        "points": 38
      },
      {
        "threshold": 1090,
        "points": 37.5
      },
      {
        "threshold": 1109,
        "points": 37
      },
      {
        "threshold": 1128,
        "points": 36.5
      },
      {
        "threshold": 1147,
        "points": 36
      },
      {
        "threshold": 1176,
        "points": 35.5
      },
      {
        "threshold": 1185,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 42,
        "points": 35
      },
      {
        "threshold": 44,
        "points": 35.5
      },
      {
        "threshold": 46,
        "points": 36
      },
      {
        "threshold": 47,
        "points": 36.5
      },
      {
        "threshold": 49,
        "points": 37
      },
      {
        "threshold": 51,
        "points": 37.5
      },
      {
        "threshold": 52,
        "points": 38
      },
      {
        "threshold": 54,
        "points": 38.5
      },
      {
        "threshold": 56,
        "points": 39
      },
      {
        "threshold": 58,
        "points": 40
      },
      {
        "threshold": 60,
        "points": 41
      },
      {
        "threshold": 63,
        "points": 42
      },
      {
        "threshold": 65,
        "points": 43
      },
      {
        "threshold": 67,
        "points": 44
      },
      {
        "threshold": 70,
        "points": 45
      },
      {
        "threshold": 72,
        "points": 46
      },
      {
        "threshold": 75,
        "points": 47
      },
      {
        "threshold": 78,
        "points": 48
      },
      {
        "threshold": 81,
        "points": 49
      },
      {
        "threshold": 84,
        "points": 49.5
      },
      {
        "threshold": 87,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "female|under-25": {
    "pushups": [
      {
        "threshold": 15,
        "points": 2.5
      },
      {
        "threshold": 16,
        "points": 3
      },
      {
        "threshold": 18,
        "points": 3.5
      },
      {
        "threshold": 19,
        "points": 4
      },
      {
        "threshold": 21,
        "points": 4.5
      },
      {
        "threshold": 22,
        "points": 5
      },
      {
        "threshold": 23,
        "points": 5.5
      },
      {
        "threshold": 25,
        "points": 6
      },
      {
        "threshold": 26,
        "points": 6.5
      },
      {
        "threshold": 28,
        "points": 7
      },
      {
        "threshold": 29,
        "points": 7.5
      },
      {
        "threshold": 30,
        "points": 8
      },
      {
        "threshold": 32,
        "points": 8.5
      },
      {
        "threshold": 33,
        "points": 9
      },
      {
        "threshold": 35,
        "points": 9.5
      },
      {
        "threshold": 36,
        "points": 10
      },
      {
        "threshold": 37,
        "points": 10.5
      },
      {
        "threshold": 39,
        "points": 11
      },
      {
        "threshold": 40,
        "points": 11.5
      },
      {
        "threshold": 42,
        "points": 12
      },
      {
        "threshold": 43,
        "points": 12.5
      },
      {
        "threshold": 44,
        "points": 13
      },
      {
        "threshold": 46,
        "points": 13.5
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 49,
        "points": 14.5
      },
      {
        "threshold": 50,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 17,
        "points": 2.5
      },
      {
        "threshold": 18,
        "points": 3
      },
      {
        "threshold": 19,
        "points": 3.5
      },
      {
        "threshold": 20,
        "points": 4
      },
      {
        "threshold": 21,
        "points": 4.5
      },
      {
        "threshold": 22,
        "points": 5
      },
      {
        "threshold": 23,
        "points": 5.5
      },
      {
        "threshold": 24,
        "points": 6
      },
      {
        "threshold": 25,
        "points": 6.5
      },
      {
        "threshold": 26,
        "points": 7
      },
      {
        "threshold": 27,
        "points": 7.5
      },
      {
        "threshold": 28,
        "points": 8
      },
      {
        "threshold": 29,
        "points": 8.5
      },
      {
        "threshold": 30,
        "points": 9
      },
      {
        "threshold": 31,
        "points": 9.5
      },
      {
        "threshold": 32,
        "points": 10
      },
      {
        "threshold": 33,
        "points": 10.5
      },
      {
        "threshold": 34,
        "points": 11
      },
      {
        "threshold": 35,
        "points": 11.5
      },
      {
        "threshold": 36,
        "points": 12
      },
      {
        "threshold": 37,
        "points": 12.5
      },
      {
        "threshold": 38,
        "points": 13
      },
      {
        "threshold": 39,
        "points": 13.5
      },
      {
        "threshold": 40,
        "points": 14
      },
      {
        "threshold": 41,
        "points": 14.5
      },
      {
        "threshold": 42,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 29,
        "points": 2.5
      },
      {
        "threshold": 30,
        "points": 3
      },
      {
        "threshold": 31,
        "points": 3.5
      },
      {
        "threshold": 32,
        "points": 4
      },
      {
        "threshold": 33,
        "points": 4.5
      },
      {
        "threshold": 34,
        "points": 5
      },
      {
        "threshold": 35,
        "points": 5.5
      },
      {
        "threshold": 36,
        "points": 6
      },
      {
        "threshold": 37,
        "points": 6.5
      },
      {
        "threshold": 38,
        "points": 7
      },
      {
        "threshold": 39,
        "points": 7.5
      },
      {
        "threshold": 40,
        "points": 8
      },
      {
        "threshold": 41,
        "points": 8.5
      },
      {
        "threshold": 42,
        "points": 9
      },
      {
        "threshold": 43,
        "points": 9.5
      },
      {
        "threshold": 44,
        "points": 10
      },
      {
        "threshold": 45,
        "points": 10.5
      },
      {
        "threshold": 46,
        "points": 11
      },
      {
        "threshold": 47,
        "points": 11.5
      },
      {
        "threshold": 48,
        "points": 12
      },
      {
        "threshold": 49,
        "points": 12.5
      },
      {
        "threshold": 50,
        "points": 13
      },
      {
        "threshold": 51,
        "points": 13.5
      },
      {
        "threshold": 52,
        "points": 14
      },
      {
        "threshold": 53,
        "points": 14.5
      },
      {
        "threshold": 54,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 33,
        "points": 2.5
      },
      {
        "threshold": 34,
        "points": 3
      },
      {
        "threshold": 35,
        "points": 3.5
      },
      {
        "threshold": 36,
        "points": 4
      },
      {
        "threshold": 37,
        "points": 4.5
      },
      {
        "threshold": 38,
        "points": 5
      },
      {
        "threshold": 39,
        "points": 5.5
      },
      {
        "threshold": 40,
        "points": 6
      },
      {
        "threshold": 41,
        "points": 6.5
      },
      {
        "threshold": 42,
        "points": 7
      },
      {
        "threshold": 43,
        "points": 7.5
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 8.5
      },
      {
        "threshold": 46,
        "points": 9
      },
      {
        "threshold": 47,
        "points": 9.5
      },
      {
        "threshold": 48,
        "points": 10
      },
      {
        "threshold": 49,
        "points": 10.5
      },
      {
        "threshold": 50,
        "points": 11
      },
      {
        "threshold": 51,
        "points": 11.5
      },
      {
        "threshold": 52,
        "points": 12
      },
      {
        "threshold": 53,
        "points": 12.5
      },
      {
        "threshold": 54,
        "points": 13
      },
      {
        "threshold": 55,
        "points": 13.5
      },
      {
        "threshold": 56,
        "points": 14
      },
      {
        "threshold": 57,
        "points": 14.5
      },
      {
        "threshold": 58,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 90,
        "points": 2.5
      },
      {
        "threshold": 95,
        "points": 3
      },
      {
        "threshold": 100,
        "points": 3.5
      },
      {
        "threshold": 105,
        "points": 4
      },
      {
        "threshold": 110,
        "points": 4.5
      },
      {
        "threshold": 115,
        "points": 5
      },
      {
        "threshold": 120,
        "points": 5.5
      },
      {
        "threshold": 125,
        "points": 6
      },
      {
        "threshold": 130,
        "points": 6.5
      },
      {
        "threshold": 135,
        "points": 7
      },
      {
        "threshold": 140,
        "points": 7.5
      },
      {
        "threshold": 145,
        "points": 8
      },
      {
        "threshold": 150,
        "points": 8.5
      },
      {
        "threshold": 155,
        "points": 9
      },
      {
        "threshold": 160,
        "points": 9.5
      },
      {
        "threshold": 165,
        "points": 10
      },
      {
        "threshold": 170,
        "points": 10.5
      },
      {
        "threshold": 175,
        "points": 11
      },
      {
        "threshold": 180,
        "points": 11.5
      },
      {
        "threshold": 185,
        "points": 12
      },
      {
        "threshold": 190,
        "points": 12.5
      },
      {
        "threshold": 195,
        "points": 13
      },
      {
        "threshold": 200,
        "points": 13.5
      },
      {
        "threshold": 205,
        "points": 14
      },
      {
        "threshold": 210,
        "points": 14.5
      },
      {
        "threshold": 215,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 930,
        "points": 50
      },
      {
        "threshold": 960,
        "points": 49.5
      },
      {
        "threshold": 989,
        "points": 49
      },
      {
        "threshold": 1019,
        "points": 48
      },
      {
        "threshold": 1049,
        "points": 47
      },
      {
        "threshold": 1078,
        "points": 46
      },
      {
        "threshold": 1108,
        "points": 45
      },
      {
        "threshold": 1138,
        "points": 44
      },
      {
        "threshold": 1167,
        "points": 43
      },
      {
        "threshold": 1197,
        "points": 42
      },
      {
        "threshold": 1227,
        "points": 41
      },
      {
        "threshold": 1256,
        "points": 40
      },
      {
        "threshold": 1286,
        "points": 39
      },
      {
        "threshold": 1315,
        "points": 38.5
      },
      {
        "threshold": 1345,
        "points": 38
      },
      {
        "threshold": 1375,
        "points": 37.5
      },
      {
        "threshold": 1404,
        "points": 37
      },
      {
        "threshold": 1434,
        "points": 36.5
      },
      {
        "threshold": 1464,
        "points": 36
      },
      {
        "threshold": 1493,
        "points": 35.5
      },
      {
        "threshold": 1523,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 21,
        "points": 35
      },
      {
        "threshold": 23,
        "points": 35.5
      },
      {
        "threshold": 24,
        "points": 36
      },
      {
        "threshold": 26,
        "points": 36.5
      },
      {
        "threshold": 28,
        "points": 37
      },
      {
        "threshold": 29,
        "points": 37.5
      },
      {
        "threshold": 31,
        "points": 38
      },
      {
        "threshold": 33,
        "points": 38.5
      },
      {
        "threshold": 35,
        "points": 39
      },
      {
        "threshold": 37,
        "points": 40
      },
      {
        "threshold": 39,
        "points": 41
      },
      {
        "threshold": 41,
        "points": 42
      },
      {
        "threshold": 44,
        "points": 43
      },
      {
        "threshold": 46,
        "points": 44
      },
      {
        "threshold": 49,
        "points": 45
      },
      {
        "threshold": 52,
        "points": 46
      },
      {
        "threshold": 55,
        "points": 47
      },
      {
        "threshold": 58,
        "points": 48
      },
      {
        "threshold": 61,
        "points": 49
      },
      {
        "threshold": 65,
        "points": 49.5
      },
      {
        "threshold": 68,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "male|25-29": {
    "pushups": [
      {
        "threshold": 28,
        "points": 2.5
      },
      {
        "threshold": 29,
        "points": 3
      },
      {
        "threshold": 31,
        "points": 3.5
      },
      {
        "threshold": 32,
        "points": 4
      },
      {
        "threshold": 34,
        "points": 4.5
      },
      {
        "threshold": 35,
        "points": 5
      },
      {
        "threshold": 36,
        "points": 5.5
      },
      {
        "threshold": 38,
        "points": 6
      },
      {
        "threshold": 39,
        "points": 6.5
      },
      {
        "threshold": 41,
        "points": 7
      },
      {
        "threshold": 42,
        "points": 7.5
      },
      {
        "threshold": 43,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 8.5
      },
      {
        "threshold": 46,
        "points": 9
      },
      {
        "threshold": 48,
        "points": 9.5
      },
      {
        "threshold": 49,
        "points": 10
      },
      {
        "threshold": 50,
        "points": 10.5
      },
      {
        "threshold": 52,
        "points": 11
      },
      {
        "threshold": 53,
        "points": 11.5
      },
      {
        "threshold": 55,
        "points": 12
      },
      {
        "threshold": 56,
        "points": 12.5
      },
      {
        "threshold": 57,
        "points": 13
      },
      {
        "threshold": 59,
        "points": 13.5
      },
      {
        "threshold": 60,
        "points": 14
      },
      {
        "threshold": 62,
        "points": 14.5
      },
      {
        "threshold": 63,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 25,
        "points": 2.5
      },
      {
        "threshold": 26,
        "points": 3
      },
      {
        "threshold": 27,
        "points": 3.5
      },
      {
        "threshold": 28,
        "points": 4
      },
      {
        "threshold": 29,
        "points": 4.5
      },
      {
        "threshold": 30,
        "points": 5
      },
      {
        "threshold": 31,
        "points": 5.5
      },
      {
        "threshold": 32,
        "points": 6
      },
      {
        "threshold": 33,
        "points": 6.5
      },
      {
        "threshold": 34,
        "points": 7
      },
      {
        "threshold": 35,
        "points": 7.5
      },
      {
        "threshold": 36,
        "points": 8
      },
      {
        "threshold": 37,
        "points": 8.5
      },
      {
        "threshold": 38,
        "points": 9
      },
      {
        "threshold": 39,
        "points": 9.5
      },
      {
        "threshold": 40,
        "points": 10
      },
      {
        "threshold": 41,
        "points": 10.5
      },
      {
        "threshold": 42,
        "points": 11
      },
      {
        "threshold": 43,
        "points": 11.5
      },
      {
        "threshold": 44,
        "points": 12
      },
      {
        "threshold": 45,
        "points": 12.5
      },
      {
        "threshold": 46,
        "points": 13
      },
      {
        "threshold": 47,
        "points": 13.5
      },
      {
        "threshold": 48,
        "points": 14
      },
      {
        "threshold": 49,
        "points": 14.5
      },
      {
        "threshold": 50,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 31,
        "points": 2.5
      },
      {
        "threshold": 32,
        "points": 3
      },
      {
        "threshold": 33,
        "points": 3.5
      },
      {
        "threshold": 34,
        "points": 4
      },
      {
        "threshold": 35,
        "points": 4.5
      },
      {
        "threshold": 36,
        "points": 5
      },
      {
        "threshold": 37,
        "points": 5.5
      },
      {
        "threshold": 38,
        "points": 6
      },
      {
        "threshold": 39,
        "points": 6.5
      },
      {
        "threshold": 40,
        "points": 7
      },
      {
        "threshold": 41,
        "points": 7.5
      },
      {
        "threshold": 42,
        "points": 8
      },
      {
        "threshold": 43,
        "points": 8.5
      },
      {
        "threshold": 44,
        "points": 9
      },
      {
        "threshold": 45,
        "points": 9.5
      },
      {
        "threshold": 46,
        "points": 10
      },
      {
        "threshold": 47,
        "points": 10.5
      },
      {
        "threshold": 48,
        "points": 11
      },
      {
        "threshold": 49,
        "points": 11.5
      },
      {
        "threshold": 50,
        "points": 12
      },
      {
        "threshold": 51,
        "points": 12.5
      },
      {
        "threshold": 52,
        "points": 13
      },
      {
        "threshold": 53,
        "points": 13.5
      },
      {
        "threshold": 54,
        "points": 14
      },
      {
        "threshold": 55,
        "points": 14.5
      },
      {
        "threshold": 56,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 33,
        "points": 2.5
      },
      {
        "threshold": 34,
        "points": 3
      },
      {
        "threshold": 35,
        "points": 3.5
      },
      {
        "threshold": 36,
        "points": 4
      },
      {
        "threshold": 37,
        "points": 4.5
      },
      {
        "threshold": 38,
        "points": 5
      },
      {
        "threshold": 39,
        "points": 5.5
      },
      {
        "threshold": 40,
        "points": 6
      },
      {
        "threshold": 41,
        "points": 6.5
      },
      {
        "threshold": 42,
        "points": 7
      },
      {
        "threshold": 43,
        "points": 7.5
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 8.5
      },
      {
        "threshold": 46,
        "points": 9
      },
      {
        "threshold": 47,
        "points": 9.5
      },
      {
        "threshold": 48,
        "points": 10
      },
      {
        "threshold": 49,
        "points": 10.5
      },
      {
        "threshold": 50,
        "points": 11
      },
      {
        "threshold": 51,
        "points": 11.5
      },
      {
        "threshold": 52,
        "points": 12
      },
      {
        "threshold": 53,
        "points": 12.5
      },
      {
        "threshold": 54,
        "points": 13
      },
      {
        "threshold": 55,
        "points": 13.5
      },
      {
        "threshold": 56,
        "points": 14
      },
      {
        "threshold": 57,
        "points": 14.5
      },
      {
        "threshold": 58,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 90,
        "points": 2.5
      },
      {
        "threshold": 95,
        "points": 3
      },
      {
        "threshold": 100,
        "points": 3.5
      },
      {
        "threshold": 105,
        "points": 4
      },
      {
        "threshold": 110,
        "points": 4.5
      },
      {
        "threshold": 115,
        "points": 5
      },
      {
        "threshold": 120,
        "points": 5.5
      },
      {
        "threshold": 125,
        "points": 6
      },
      {
        "threshold": 130,
        "points": 6.5
      },
      {
        "threshold": 135,
        "points": 7
      },
      {
        "threshold": 140,
        "points": 7.5
      },
      {
        "threshold": 145,
        "points": 8
      },
      {
        "threshold": 150,
        "points": 8.5
      },
      {
        "threshold": 155,
        "points": 9
      },
      {
        "threshold": 160,
        "points": 9.5
      },
      {
        "threshold": 165,
        "points": 10
      },
      {
        "threshold": 170,
        "points": 10.5
      },
      {
        "threshold": 175,
        "points": 11
      },
      {
        "threshold": 180,
        "points": 11.5
      },
      {
        "threshold": 185,
        "points": 12
      },
      {
        "threshold": 190,
        "points": 12.5
      },
      {
        "threshold": 195,
        "points": 13
      },
      {
        "threshold": 200,
        "points": 13.5
      },
      {
        "threshold": 205,
        "points": 14
      },
      {
        "threshold": 210,
        "points": 14.5
      },
      {
        "threshold": 215,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 815,
        "points": 50
      },
      {
        "threshold": 834,
        "points": 49.5
      },
      {
        "threshold": 853,
        "points": 49
      },
      {
        "threshold": 872,
        "points": 48
      },
      {
        "threshold": 891,
        "points": 47
      },
      {
        "threshold": 910,
        "points": 46
      },
      {
        "threshold": 929,
        "points": 45
      },
      {
        "threshold": 948,
        "points": 44
      },
      {
        "threshold": 967,
        "points": 43
      },
      {
        "threshold": 986,
        "points": 42
      },
      {
        "threshold": 1005,
        "points": 41
      },
      {
        "threshold": 1024,
        "points": 40
      },
      {
        "threshold": 1043,
        "points": 39
      },
      {
        "threshold": 1062,
        "points": 38.5
      },
      {
        "threshold": 1081,
        "points": 38
      },
      {
        "threshold": 1100,
        "points": 37.5
      },
      {
        "threshold": 1119,
        "points": 37
      },
      {
        "threshold": 1138,
        "points": 36.5
      },
      {
        "threshold": 1157,
        "points": 36
      },
      {
        "threshold": 1176,
        "points": 35.5
      },
      {
        "threshold": 1195,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 42,
        "points": 35
      },
      {
        "threshold": 43,
        "points": 35.5
      },
      {
        "threshold": 45,
        "points": 36
      },
      {
        "threshold": 46,
        "points": 36.5
      },
      {
        "threshold": 48,
        "points": 37
      },
      {
        "threshold": 50,
        "points": 37.5
      },
      {
        "threshold": 52,
        "points": 38
      },
      {
        "threshold": 53,
        "points": 38.5
      },
      {
        "threshold": 55,
        "points": 39
      },
      {
        "threshold": 57,
        "points": 40
      },
      {
        "threshold": 59,
        "points": 41
      },
      {
        "threshold": 62,
        "points": 42
      },
      {
        "threshold": 64,
        "points": 43
      },
      {
        "threshold": 66,
        "points": 44
      },
      {
        "threshold": 69,
        "points": 45
      },
      {
        "threshold": 71,
        "points": 46
      },
      {
        "threshold": 74,
        "points": 47
      },
      {
        "threshold": 76,
        "points": 48
      },
      {
        "threshold": 79,
        "points": 49
      },
      {
        "threshold": 82,
        "points": 49.5
      },
      {
        "threshold": 85,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "female|25-29": {
    "pushups": [
      {
        "threshold": 14,
        "points": 2.5
      },
      {
        "threshold": 15,
        "points": 3
      },
      {
        "threshold": 17,
        "points": 3.5
      },
      {
        "threshold": 18,
        "points": 4
      },
      {
        "threshold": 19,
        "points": 4.5
      },
      {
        "threshold": 21,
        "points": 5
      },
      {
        "threshold": 22,
        "points": 5.5
      },
      {
        "threshold": 23,
        "points": 6
      },
      {
        "threshold": 25,
        "points": 6.5
      },
      {
        "threshold": 26,
        "points": 7
      },
      {
        "threshold": 27,
        "points": 7.5
      },
      {
        "threshold": 29,
        "points": 8
      },
      {
        "threshold": 30,
        "points": 8.5
      },
      {
        "threshold": 31,
        "points": 9
      },
      {
        "threshold": 32,
        "points": 9.5
      },
      {
        "threshold": 34,
        "points": 10
      },
      {
        "threshold": 35,
        "points": 10.5
      },
      {
        "threshold": 36,
        "points": 11
      },
      {
        "threshold": 38,
        "points": 11.5
      },
      {
        "threshold": 39,
        "points": 12
      },
      {
        "threshold": 40,
        "points": 12.5
      },
      {
        "threshold": 42,
        "points": 13
      },
      {
        "threshold": 43,
        "points": 13.5
      },
      {
        "threshold": 44,
        "points": 14
      },
      {
        "threshold": 46,
        "points": 14.5
      },
      {
        "threshold": 47,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 15,
        "points": 2.5
      },
      {
        "threshold": 16,
        "points": 3
      },
      {
        "threshold": 17,
        "points": 3.5
      },
      {
        "threshold": 18,
        "points": 4
      },
      {
        "threshold": 19,
        "points": 4.5
      },
      {
        "threshold": 20,
        "points": 5
      },
      {
        "threshold": 21,
        "points": 5.5
      },
      {
        "threshold": 22,
        "points": 6
      },
      {
        "threshold": 23,
        "points": 6.5
      },
      {
        "threshold": 24,
        "points": 7
      },
      {
        "threshold": 25,
        "points": 7.5
      },
      {
        "threshold": 26,
        "points": 8
      },
      {
        "threshold": 27,
        "points": 8.5
      },
      {
        "threshold": 28,
        "points": 9
      },
      {
        "threshold": 29,
        "points": 9.5
      },
      {
        "threshold": 30,
        "points": 10
      },
      {
        "threshold": 31,
        "points": 10.5
      },
      {
        "threshold": 32,
        "points": 11
      },
      {
        "threshold": 33,
        "points": 11.5
      },
      {
        "threshold": 34,
        "points": 12
      },
      {
        "threshold": 35,
        "points": 12.5
      },
      {
        "threshold": 36,
        "points": 13
      },
      {
        "threshold": 37,
        "points": 13.5
      },
      {
        "threshold": 38,
        "points": 14
      },
      {
        "threshold": 39,
        "points": 14.5
      },
      {
        "threshold": 40,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 25,
        "points": 2.5
      },
      {
        "threshold": 26,
        "points": 3
      },
      {
        "threshold": 27,
        "points": 3.5
      },
      {
        "threshold": 28,
        "points": 4
      },
      {
        "threshold": 29,
        "points": 4.5
      },
      {
        "threshold": 30,
        "points": 5
      },
      {
        "threshold": 31,
        "points": 5.5
      },
      {
        "threshold": 32,
        "points": 6
      },
      {
        "threshold": 33,
        "points": 6.5
      },
      {
        "threshold": 34,
        "points": 7
      },
      {
        "threshold": 35,
        "points": 7.5
      },
      {
        "threshold": 36,
        "points": 8
      },
      {
        "threshold": 37,
        "points": 8.5
      },
      {
        "threshold": 38,
        "points": 9
      },
      {
        "threshold": 39,
        "points": 9.5
      },
      {
        "threshold": 40,
        "points": 10
      },
      {
        "threshold": 41,
        "points": 10.5
      },
      {
        "threshold": 42,
        "points": 11
      },
      {
        "threshold": 43,
        "points": 11.5
      },
      {
        "threshold": 44,
        "points": 12
      },
      {
        "threshold": 45,
        "points": 12.5
      },
      {
        "threshold": 46,
        "points": 13
      },
      {
        "threshold": 47,
        "points": 13.5
      },
      {
        "threshold": 48,
        "points": 14
      },
      {
        "threshold": 49,
        "points": 14.5
      },
      {
        "threshold": 50,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 31,
        "points": 2.5
      },
      {
        "threshold": 32,
        "points": 3
      },
      {
        "threshold": 33,
        "points": 3.5
      },
      {
        "threshold": 34,
        "points": 4
      },
      {
        "threshold": 35,
        "points": 4.5
      },
      {
        "threshold": 36,
        "points": 5
      },
      {
        "threshold": 37,
        "points": 5.5
      },
      {
        "threshold": 38,
        "points": 6
      },
      {
        "threshold": 39,
        "points": 6.5
      },
      {
        "threshold": 40,
        "points": 7
      },
      {
        "threshold": 41,
        "points": 7.5
      },
      {
        "threshold": 42,
        "points": 8
      },
      {
        "threshold": 43,
        "points": 8.5
      },
      {
        "threshold": 44,
        "points": 9
      },
      {
        "threshold": 45,
        "points": 9.5
      },
      {
        "threshold": 46,
        "points": 10
      },
      {
        "threshold": 47,
        "points": 10.5
      },
      {
        "threshold": 48,
        "points": 11
      },
      {
        "threshold": 49,
        "points": 11.5
      },
      {
        "threshold": 50,
        "points": 12
      },
      {
        "threshold": 51,
        "points": 12.5
      },
      {
        "threshold": 52,
        "points": 13
      },
      {
        "threshold": 53,
        "points": 13.5
      },
      {
        "threshold": 54,
        "points": 14
      },
      {
        "threshold": 55,
        "points": 14.5
      },
      {
        "threshold": 56,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 85,
        "points": 2.5
      },
      {
        "threshold": 90,
        "points": 3
      },
      {
        "threshold": 95,
        "points": 3.5
      },
      {
        "threshold": 100,
        "points": 4
      },
      {
        "threshold": 105,
        "points": 4.5
      },
      {
        "threshold": 110,
        "points": 5
      },
      {
        "threshold": 115,
        "points": 5.5
      },
      {
        "threshold": 120,
        "points": 6
      },
      {
        "threshold": 125,
        "points": 6.5
      },
      {
        "threshold": 130,
        "points": 7
      },
      {
        "threshold": 135,
        "points": 7.5
      },
      {
        "threshold": 140,
        "points": 8
      },
      {
        "threshold": 145,
        "points": 8.5
      },
      {
        "threshold": 150,
        "points": 9
      },
      {
        "threshold": 155,
        "points": 9.5
      },
      {
        "threshold": 160,
        "points": 10
      },
      {
        "threshold": 165,
        "points": 10.5
      },
      {
        "threshold": 170,
        "points": 11
      },
      {
        "threshold": 175,
        "points": 11.5
      },
      {
        "threshold": 180,
        "points": 12
      },
      {
        "threshold": 185,
        "points": 12.5
      },
      {
        "threshold": 190,
        "points": 13
      },
      {
        "threshold": 195,
        "points": 13.5
      },
      {
        "threshold": 200,
        "points": 14
      },
      {
        "threshold": 205,
        "points": 14.5
      },
      {
        "threshold": 210,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 955,
        "points": 50
      },
      {
        "threshold": 984,
        "points": 49.5
      },
      {
        "threshold": 1014,
        "points": 49
      },
      {
        "threshold": 1043,
        "points": 48
      },
      {
        "threshold": 1072,
        "points": 47
      },
      {
        "threshold": 1101,
        "points": 46
      },
      {
        "threshold": 1131,
        "points": 45
      },
      {
        "threshold": 1160,
        "points": 44
      },
      {
        "threshold": 1189,
        "points": 43
      },
      {
        "threshold": 1218,
        "points": 42
      },
      {
        "threshold": 1248,
        "points": 41
      },
      {
        "threshold": 1277,
        "points": 40
      },
      {
        "threshold": 1306,
        "points": 39
      },
      {
        "threshold": 1335,
        "points": 38.5
      },
      {
        "threshold": 1365,
        "points": 38
      },
      {
        "threshold": 1394,
        "points": 37.5
      },
      {
        "threshold": 1423,
        "points": 37
      },
      {
        "threshold": 1452,
        "points": 36.5
      },
      {
        "threshold": 1482,
        "points": 36
      },
      {
        "threshold": 1511,
        "points": 35.5
      },
      {
        "threshold": 1540,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 20,
        "points": 35
      },
      {
        "threshold": 22,
        "points": 35.5
      },
      {
        "threshold": 23,
        "points": 36
      },
      {
        "threshold": 25,
        "points": 36.5
      },
      {
        "threshold": 26,
        "points": 37
      },
      {
        "threshold": 28,
        "points": 37.5
      },
      {
        "threshold": 30,
        "points": 38
      },
      {
        "threshold": 32,
        "points": 38.5
      },
      {
        "threshold": 34,
        "points": 39
      },
      {
        "threshold": 36,
        "points": 40
      },
      {
        "threshold": 38,
        "points": 41
      },
      {
        "threshold": 40,
        "points": 42
      },
      {
        "threshold": 42,
        "points": 43
      },
      {
        "threshold": 44,
        "points": 44
      },
      {
        "threshold": 47,
        "points": 45
      },
      {
        "threshold": 50,
        "points": 46
      },
      {
        "threshold": 52,
        "points": 47
      },
      {
        "threshold": 55,
        "points": 48
      },
      {
        "threshold": 58,
        "points": 49
      },
      {
        "threshold": 62,
        "points": 49.5
      },
      {
        "threshold": 65,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "male|30-34": {
    "pushups": [
      {
        "threshold": 26,
        "points": 3
      },
      {
        "threshold": 29,
        "points": 3.5
      },
      {
        "threshold": 31,
        "points": 4
      },
      {
        "threshold": 32,
        "points": 4.5
      },
      {
        "threshold": 33,
        "points": 5
      },
      {
        "threshold": 35,
        "points": 5.5
      },
      {
        "threshold": 36,
        "points": 6
      },
      {
        "threshold": 37,
        "points": 6.5
      },
      {
        "threshold": 39,
        "points": 7
      },
      {
        "threshold": 40,
        "points": 7.5
      },
      {
        "threshold": 41,
        "points": 8
      },
      {
        "threshold": 43,
        "points": 8.5
      },
      {
        "threshold": 44,
        "points": 9
      },
      {
        "threshold": 45,
        "points": 9.5
      },
      {
        "threshold": 47,
        "points": 10
      },
      {
        "threshold": 48,
        "points": 10.5
      },
      {
        "threshold": 49,
        "points": 11
      },
      {
        "threshold": 51,
        "points": 11.5
      },
      {
        "threshold": 52,
        "points": 12
      },
      {
        "threshold": 53,
        "points": 12.5
      },
      {
        "threshold": 55,
        "points": 13
      },
      {
        "threshold": 56,
        "points": 13.5
      },
      {
        "threshold": 57,
        "points": 14
      },
      {
        "threshold": 59,
        "points": 14.5
      },
      {
        "threshold": 60,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 23,
        "points": 2.5
      },
      {
        "threshold": 24,
        "points": 3
      },
      {
        "threshold": 25,
        "points": 3.5
      },
      {
        "threshold": 26,
        "points": 4
      },
      {
        "threshold": 27,
        "points": 4.5
      },
      {
        "threshold": 28,
        "points": 5
      },
      {
        "threshold": 29,
        "points": 5.5
      },
      {
        "threshold": 30,
        "points": 6
      },
      {
        "threshold": 31,
        "points": 6.5
      },
      {
        "threshold": 32,
        "points": 7
      },
      {
        "threshold": 33,
        "points": 7.5
      },
      {
        "threshold": 34,
        "points": 8
      },
      {
        "threshold": 35,
        "points": 8.5
      },
      {
        "threshold": 36,
        "points": 9
      },
      {
        "threshold": 37,
        "points": 9.5
      },
      {
        "threshold": 38,
        "points": 10
      },
      {
        "threshold": 39,
        "points": 10.5
      },
      {
        "threshold": 40,
        "points": 11
      },
      {
        "threshold": 41,
        "points": 11.5
      },
      {
        "threshold": 42,
        "points": 12
      },
      {
        "threshold": 43,
        "points": 12.5
      },
      {
        "threshold": 44,
        "points": 13
      },
      {
        "threshold": 45,
        "points": 13.5
      },
      {
        "threshold": 46,
        "points": 14
      },
      {
        "threshold": 47,
        "points": 14.5
      },
      {
        "threshold": 48,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 29,
        "points": 2.5
      },
      {
        "threshold": 30,
        "points": 3
      },
      {
        "threshold": 31,
        "points": 3.5
      },
      {
        "threshold": 32,
        "points": 4
      },
      {
        "threshold": 33,
        "points": 4.5
      },
      {
        "threshold": 34,
        "points": 5
      },
      {
        "threshold": 35,
        "points": 5.5
      },
      {
        "threshold": 36,
        "points": 6
      },
      {
        "threshold": 37,
        "points": 6.5
      },
      {
        "threshold": 38,
        "points": 7
      },
      {
        "threshold": 39,
        "points": 7.5
      },
      {
        "threshold": 40,
        "points": 8
      },
      {
        "threshold": 41,
        "points": 8.5
      },
      {
        "threshold": 42,
        "points": 9
      },
      {
        "threshold": 43,
        "points": 9.5
      },
      {
        "threshold": 44,
        "points": 10
      },
      {
        "threshold": 45,
        "points": 10.5
      },
      {
        "threshold": 46,
        "points": 11
      },
      {
        "threshold": 47,
        "points": 11.5
      },
      {
        "threshold": 48,
        "points": 12
      },
      {
        "threshold": 49,
        "points": 12.5
      },
      {
        "threshold": 50,
        "points": 13
      },
      {
        "threshold": 51,
        "points": 13.5
      },
      {
        "threshold": 52,
        "points": 14
      },
      {
        "threshold": 53,
        "points": 14.5
      },
      {
        "threshold": 54,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 31,
        "points": 2.5
      },
      {
        "threshold": 32,
        "points": 3
      },
      {
        "threshold": 33,
        "points": 3.5
      },
      {
        "threshold": 34,
        "points": 4
      },
      {
        "threshold": 35,
        "points": 4.5
      },
      {
        "threshold": 36,
        "points": 5
      },
      {
        "threshold": 37,
        "points": 5.5
      },
      {
        "threshold": 38,
        "points": 6
      },
      {
        "threshold": 39,
        "points": 6.5
      },
      {
        "threshold": 40,
        "points": 7
      },
      {
        "threshold": 41,
        "points": 7.5
      },
      {
        "threshold": 42,
        "points": 8
      },
      {
        "threshold": 43,
        "points": 8.5
      },
      {
        "threshold": 44,
        "points": 9
      },
      {
        "threshold": 45,
        "points": 9.5
      },
      {
        "threshold": 46,
        "points": 10
      },
      {
        "threshold": 47,
        "points": 10.5
      },
      {
        "threshold": 48,
        "points": 11
      },
      {
        "threshold": 49,
        "points": 11.5
      },
      {
        "threshold": 50,
        "points": 12
      },
      {
        "threshold": 51,
        "points": 12.5
      },
      {
        "threshold": 52,
        "points": 13
      },
      {
        "threshold": 53,
        "points": 13.5
      },
      {
        "threshold": 54,
        "points": 14
      },
      {
        "threshold": 55,
        "points": 14.5
      },
      {
        "threshold": 56,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 85,
        "points": 2.5
      },
      {
        "threshold": 90,
        "points": 3
      },
      {
        "threshold": 95,
        "points": 3.5
      },
      {
        "threshold": 100,
        "points": 4
      },
      {
        "threshold": 105,
        "points": 4.5
      },
      {
        "threshold": 110,
        "points": 5
      },
      {
        "threshold": 115,
        "points": 5.5
      },
      {
        "threshold": 120,
        "points": 6
      },
      {
        "threshold": 125,
        "points": 6.5
      },
      {
        "threshold": 130,
        "points": 7
      },
      {
        "threshold": 135,
        "points": 7.5
      },
      {
        "threshold": 140,
        "points": 8
      },
      {
        "threshold": 145,
        "points": 8.5
      },
      {
        "threshold": 150,
        "points": 9
      },
      {
        "threshold": 155,
        "points": 9.5
      },
      {
        "threshold": 160,
        "points": 10
      },
      {
        "threshold": 165,
        "points": 10.5
      },
      {
        "threshold": 170,
        "points": 11
      },
      {
        "threshold": 175,
        "points": 11.5
      },
      {
        "threshold": 180,
        "points": 12
      },
      {
        "threshold": 185,
        "points": 12.5
      },
      {
        "threshold": 190,
        "points": 13
      },
      {
        "threshold": 195,
        "points": 13.5
      },
      {
        "threshold": 200,
        "points": 14
      },
      {
        "threshold": 205,
        "points": 14.5
      },
      {
        "threshold": 210,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 822,
        "points": 50
      },
      {
        "threshold": 843,
        "points": 49.5
      },
      {
        "threshold": 864,
        "points": 49
      },
      {
        "threshold": 885,
        "points": 48
      },
      {
        "threshold": 906,
        "points": 47
      },
      {
        "threshold": 928,
        "points": 46
      },
      {
        "threshold": 949,
        "points": 45
      },
      {
        "threshold": 970,
        "points": 44
      },
      {
        "threshold": 991,
        "points": 43
      },
      {
        "threshold": 1012,
        "points": 42
      },
      {
        "threshold": 1033,
        "points": 41
      },
      {
        "threshold": 1054,
        "points": 40
      },
      {
        "threshold": 1075,
        "points": 39
      },
      {
        "threshold": 1096,
        "points": 38.5
      },
      {
        "threshold": 1117,
        "points": 38
      },
      {
        "threshold": 1139,
        "points": 37.5
      },
      {
        "threshold": 1160,
        "points": 37
      },
      {
        "threshold": 1181,
        "points": 36.5
      },
      {
        "threshold": 1202,
        "points": 36
      },
      {
        "threshold": 1223,
        "points": 35.5
      },
      {
        "threshold": 1244,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 38,
        "points": 35
      },
      {
        "threshold": 39,
        "points": 35.5
      },
      {
        "threshold": 41,
        "points": 36
      },
      {
        "threshold": 43,
        "points": 36.5
      },
      {
        "threshold": 44,
        "points": 37
      },
      {
        "threshold": 46,
        "points": 37.5
      },
      {
        "threshold": 48,
        "points": 38
      },
      {
        "threshold": 50,
        "points": 38.5
      },
      {
        "threshold": 52,
        "points": 39
      },
      {
        "threshold": 54,
        "points": 40
      },
      {
        "threshold": 56,
        "points": 41
      },
      {
        "threshold": 59,
        "points": 42
      },
      {
        "threshold": 61,
        "points": 43
      },
      {
        "threshold": 63,
        "points": 44
      },
      {
        "threshold": 66,
        "points": 45
      },
      {
        "threshold": 69,
        "points": 46
      },
      {
        "threshold": 72,
        "points": 47
      },
      {
        "threshold": 75,
        "points": 48
      },
      {
        "threshold": 78,
        "points": 49
      },
      {
        "threshold": 81,
        "points": 49.5
      },
      {
        "threshold": 84,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "female|30-34": {
    "pushups": [
      {
        "threshold": 12,
        "points": 2.5
      },
      {
        "threshold": 14,
        "points": 3
      },
      {
        "threshold": 15,
        "points": 3.5
      },
      {
        "threshold": 16,
        "points": 4
      },
      {
        "threshold": 17,
        "points": 4.5
      },
      {
        "threshold": 19,
        "points": 5
      },
      {
        "threshold": 20,
        "points": 5.5
      },
      {
        "threshold": 21,
        "points": 6
      },
      {
        "threshold": 22,
        "points": 6.5
      },
      {
        "threshold": 24,
        "points": 7
      },
      {
        "threshold": 25,
        "points": 7.5
      },
      {
        "threshold": 26,
        "points": 8
      },
      {
        "threshold": 27,
        "points": 8.5
      },
      {
        "threshold": 29,
        "points": 9
      },
      {
        "threshold": 30,
        "points": 9.5
      },
      {
        "threshold": 31,
        "points": 10
      },
      {
        "threshold": 32,
        "points": 10.5
      },
      {
        "threshold": 34,
        "points": 11
      },
      {
        "threshold": 35,
        "points": 11.5
      },
      {
        "threshold": 36,
        "points": 12
      },
      {
        "threshold": 37,
        "points": 12.5
      },
      {
        "threshold": 39,
        "points": 13
      },
      {
        "threshold": 40,
        "points": 13.5
      },
      {
        "threshold": 41,
        "points": 14
      },
      {
        "threshold": 42,
        "points": 14.5
      },
      {
        "threshold": 44,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 13,
        "points": 2.5
      },
      {
        "threshold": 14,
        "points": 3
      },
      {
        "threshold": 15,
        "points": 3.5
      },
      {
        "threshold": 16,
        "points": 4
      },
      {
        "threshold": 17,
        "points": 4.5
      },
      {
        "threshold": 18,
        "points": 5
      },
      {
        "threshold": 19,
        "points": 5.5
      },
      {
        "threshold": 20,
        "points": 6
      },
      {
        "threshold": 21,
        "points": 6.5
      },
      {
        "threshold": 22,
        "points": 7
      },
      {
        "threshold": 23,
        "points": 7.5
      },
      {
        "threshold": 24,
        "points": 8
      },
      {
        "threshold": 25,
        "points": 8.5
      },
      {
        "threshold": 26,
        "points": 9
      },
      {
        "threshold": 27,
        "points": 9.5
      },
      {
        "threshold": 28,
        "points": 10
      },
      {
        "threshold": 29,
        "points": 10.5
      },
      {
        "threshold": 30,
        "points": 11
      },
      {
        "threshold": 31,
        "points": 11.5
      },
      {
        "threshold": 32,
        "points": 12
      },
      {
        "threshold": 33,
        "points": 12.5
      },
      {
        "threshold": 34,
        "points": 13
      },
      {
        "threshold": 35,
        "points": 13.5
      },
      {
        "threshold": 36,
        "points": 14
      },
      {
        "threshold": 37,
        "points": 14.5
      },
      {
        "threshold": 38,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 20,
        "points": 2.5
      },
      {
        "threshold": 21,
        "points": 3
      },
      {
        "threshold": 22,
        "points": 3.5
      },
      {
        "threshold": 23,
        "points": 4
      },
      {
        "threshold": 24,
        "points": 4.5
      },
      {
        "threshold": 25,
        "points": 5
      },
      {
        "threshold": 26,
        "points": 5.5
      },
      {
        "threshold": 27,
        "points": 6
      },
      {
        "threshold": 28,
        "points": 6.5
      },
      {
        "threshold": 29,
        "points": 7
      },
      {
        "threshold": 30,
        "points": 7.5
      },
      {
        "threshold": 31,
        "points": 8
      },
      {
        "threshold": 32,
        "points": 8.5
      },
      {
        "threshold": 33,
        "points": 9
      },
      {
        "threshold": 34,
        "points": 9.5
      },
      {
        "threshold": 35,
        "points": 10
      },
      {
        "threshold": 36,
        "points": 10.5
      },
      {
        "threshold": 37,
        "points": 11
      },
      {
        "threshold": 38,
        "points": 11.5
      },
      {
        "threshold": 39,
        "points": 12
      },
      {
        "threshold": 40,
        "points": 12.5
      },
      {
        "threshold": 41,
        "points": 13
      },
      {
        "threshold": 42,
        "points": 13.5
      },
      {
        "threshold": 43,
        "points": 14
      },
      {
        "threshold": 44,
        "points": 14.5
      },
      {
        "threshold": 45,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 29,
        "points": 2.5
      },
      {
        "threshold": 30,
        "points": 3
      },
      {
        "threshold": 31,
        "points": 3.5
      },
      {
        "threshold": 32,
        "points": 4
      },
      {
        "threshold": 33,
        "points": 4.5
      },
      {
        "threshold": 34,
        "points": 5
      },
      {
        "threshold": 35,
        "points": 5.5
      },
      {
        "threshold": 36,
        "points": 6
      },
      {
        "threshold": 37,
        "points": 6.5
      },
      {
        "threshold": 38,
        "points": 7
      },
      {
        "threshold": 39,
        "points": 7.5
      },
      {
        "threshold": 40,
        "points": 8
      },
      {
        "threshold": 41,
        "points": 8.5
      },
      {
        "threshold": 42,
        "points": 9
      },
      {
        "threshold": 43,
        "points": 9.5
      },
      {
        "threshold": 44,
        "points": 10
      },
      {
        "threshold": 45,
        "points": 10.5
      },
      {
        "threshold": 46,
        "points": 11
      },
      {
        "threshold": 47,
        "points": 11.5
      },
      {
        "threshold": 48,
        "points": 12
      },
      {
        "threshold": 49,
        "points": 12.5
      },
      {
        "threshold": 50,
        "points": 13
      },
      {
        "threshold": 51,
        "points": 13.5
      },
      {
        "threshold": 52,
        "points": 14
      },
      {
        "threshold": 53,
        "points": 14.5
      },
      {
        "threshold": 54,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 80,
        "points": 2.5
      },
      {
        "threshold": 85,
        "points": 3
      },
      {
        "threshold": 90,
        "points": 3.5
      },
      {
        "threshold": 95,
        "points": 4
      },
      {
        "threshold": 100,
        "points": 4.5
      },
      {
        "threshold": 105,
        "points": 5
      },
      {
        "threshold": 110,
        "points": 5.5
      },
      {
        "threshold": 115,
        "points": 6
      },
      {
        "threshold": 120,
        "points": 6.5
      },
      {
        "threshold": 125,
        "points": 7
      },
      {
        "threshold": 130,
        "points": 7.5
      },
      {
        "threshold": 135,
        "points": 8
      },
      {
        "threshold": 140,
        "points": 8.5
      },
      {
        "threshold": 145,
        "points": 9
      },
      {
        "threshold": 150,
        "points": 9.5
      },
      {
        "threshold": 155,
        "points": 10
      },
      {
        "threshold": 160,
        "points": 10.5
      },
      {
        "threshold": 165,
        "points": 11
      },
      {
        "threshold": 170,
        "points": 11.5
      },
      {
        "threshold": 175,
        "points": 12
      },
      {
        "threshold": 180,
        "points": 12.5
      },
      {
        "threshold": 185,
        "points": 13
      },
      {
        "threshold": 190,
        "points": 13.5
      },
      {
        "threshold": 195,
        "points": 14
      },
      {
        "threshold": 200,
        "points": 14.5
      },
      {
        "threshold": 205,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 970,
        "points": 50
      },
      {
        "threshold": 1000,
        "points": 49.5
      },
      {
        "threshold": 1031,
        "points": 49
      },
      {
        "threshold": 1061,
        "points": 48
      },
      {
        "threshold": 1091,
        "points": 47
      },
      {
        "threshold": 1121,
        "points": 46
      },
      {
        "threshold": 1152,
        "points": 45
      },
      {
        "threshold": 1182,
        "points": 44
      },
      {
        "threshold": 1212,
        "points": 43
      },
      {
        "threshold": 1242,
        "points": 42
      },
      {
        "threshold": 1273,
        "points": 41
      },
      {
        "threshold": 1303,
        "points": 40
      },
      {
        "threshold": 1333,
        "points": 39
      },
      {
        "threshold": 1363,
        "points": 38.5
      },
      {
        "threshold": 1394,
        "points": 38
      },
      {
        "threshold": 1424,
        "points": 37.5
      },
      {
        "threshold": 1454,
        "points": 37
      },
      {
        "threshold": 1484,
        "points": 36.5
      },
      {
        "threshold": 1515,
        "points": 36
      },
      {
        "threshold": 1545,
        "points": 35.5
      },
      {
        "threshold": 1575,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 19,
        "points": 35
      },
      {
        "threshold": 20,
        "points": 35.5
      },
      {
        "threshold": 22,
        "points": 36
      },
      {
        "threshold": 23,
        "points": 36.5
      },
      {
        "threshold": 25,
        "points": 37
      },
      {
        "threshold": 26,
        "points": 37.5
      },
      {
        "threshold": 28,
        "points": 38
      },
      {
        "threshold": 30,
        "points": 38.5
      },
      {
        "threshold": 32,
        "points": 39
      },
      {
        "threshold": 34,
        "points": 40
      },
      {
        "threshold": 36,
        "points": 41
      },
      {
        "threshold": 38,
        "points": 42
      },
      {
        "threshold": 40,
        "points": 43
      },
      {
        "threshold": 43,
        "points": 44
      },
      {
        "threshold": 45,
        "points": 45
      },
      {
        "threshold": 48,
        "points": 46
      },
      {
        "threshold": 51,
        "points": 47
      },
      {
        "threshold": 53,
        "points": 48
      },
      {
        "threshold": 57,
        "points": 49
      },
      {
        "threshold": 60,
        "points": 49.5
      },
      {
        "threshold": 63,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "male|35-39": {
    "pushups": [
      {
        "threshold": 23,
        "points": 2.5
      },
      {
        "threshold": 24,
        "points": 3
      },
      {
        "threshold": 26,
        "points": 3.5
      },
      {
        "threshold": 27,
        "points": 4
      },
      {
        "threshold": 28,
        "points": 4.5
      },
      {
        "threshold": 30,
        "points": 5
      },
      {
        "threshold": 31,
        "points": 5.5
      },
      {
        "threshold": 32,
        "points": 6
      },
      {
        "threshold": 34,
        "points": 6.5
      },
      {
        "threshold": 35,
        "points": 7
      },
      {
        "threshold": 36,
        "points": 7.5
      },
      {
        "threshold": 38,
        "points": 8
      },
      {
        "threshold": 39,
        "points": 8.5
      },
      {
        "threshold": 40,
        "points": 9
      },
      {
        "threshold": 41,
        "points": 9.5
      },
      {
        "threshold": 43,
        "points": 10
      },
      {
        "threshold": 44,
        "points": 10.5
      },
      {
        "threshold": 45,
        "points": 11
      },
      {
        "threshold": 47,
        "points": 11.5
      },
      {
        "threshold": 48,
        "points": 12
      },
      {
        "threshold": 49,
        "points": 12.5
      },
      {
        "threshold": 51,
        "points": 13
      },
      {
        "threshold": 52,
        "points": 13.5
      },
      {
        "threshold": 53,
        "points": 14
      },
      {
        "threshold": 55,
        "points": 14.5
      },
      {
        "threshold": 56,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 21,
        "points": 2.5
      },
      {
        "threshold": 22,
        "points": 3
      },
      {
        "threshold": 23,
        "points": 3.5
      },
      {
        "threshold": 24,
        "points": 4
      },
      {
        "threshold": 25,
        "points": 4.5
      },
      {
        "threshold": 26,
        "points": 5
      },
      {
        "threshold": 27,
        "points": 5.5
      },
      {
        "threshold": 28,
        "points": 6
      },
      {
        "threshold": 29,
        "points": 6.5
      },
      {
        "threshold": 30,
        "points": 7
      },
      {
        "threshold": 31,
        "points": 7.5
      },
      {
        "threshold": 32,
        "points": 8
      },
      {
        "threshold": 33,
        "points": 8.5
      },
      {
        "threshold": 34,
        "points": 9
      },
      {
        "threshold": 35,
        "points": 9.5
      },
      {
        "threshold": 36,
        "points": 10
      },
      {
        "threshold": 37,
        "points": 10.5
      },
      {
        "threshold": 38,
        "points": 11
      },
      {
        "threshold": 39,
        "points": 11.5
      },
      {
        "threshold": 40,
        "points": 12
      },
      {
        "threshold": 41,
        "points": 12.5
      },
      {
        "threshold": 42,
        "points": 13
      },
      {
        "threshold": 43,
        "points": 13.5
      },
      {
        "threshold": 44,
        "points": 14
      },
      {
        "threshold": 45,
        "points": 14.5
      },
      {
        "threshold": 46,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 27,
        "points": 2.5
      },
      {
        "threshold": 28,
        "points": 3
      },
      {
        "threshold": 29,
        "points": 3.5
      },
      {
        "threshold": 30,
        "points": 4
      },
      {
        "threshold": 31,
        "points": 4.5
      },
      {
        "threshold": 32,
        "points": 5
      },
      {
        "threshold": 33,
        "points": 5.5
      },
      {
        "threshold": 34,
        "points": 6
      },
      {
        "threshold": 35,
        "points": 6.5
      },
      {
        "threshold": 36,
        "points": 7
      },
      {
        "threshold": 37,
        "points": 7.5
      },
      {
        "threshold": 38,
        "points": 8
      },
      {
        "threshold": 39,
        "points": 8.5
      },
      {
        "threshold": 40,
        "points": 9
      },
      {
        "threshold": 41,
        "points": 9.5
      },
      {
        "threshold": 42,
        "points": 10
      },
      {
        "threshold": 43,
        "points": 10.5
      },
      {
        "threshold": 44,
        "points": 11
      },
      {
        "threshold": 45,
        "points": 11.5
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 12.5
      },
      {
        "threshold": 48,
        "points": 13
      },
      {
        "threshold": 49,
        "points": 13.5
      },
      {
        "threshold": 50,
        "points": 14
      },
      {
        "threshold": 51,
        "points": 14.5
      },
      {
        "threshold": 52,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 29,
        "points": 2.5
      },
      {
        "threshold": 30,
        "points": 3
      },
      {
        "threshold": 31,
        "points": 3.5
      },
      {
        "threshold": 32,
        "points": 4
      },
      {
        "threshold": 33,
        "points": 4.5
      },
      {
        "threshold": 34,
        "points": 5
      },
      {
        "threshold": 35,
        "points": 5.5
      },
      {
        "threshold": 36,
        "points": 6
      },
      {
        "threshold": 37,
        "points": 6.5
      },
      {
        "threshold": 38,
        "points": 7
      },
      {
        "threshold": 39,
        "points": 7.5
      },
      {
        "threshold": 40,
        "points": 8
      },
      {
        "threshold": 41,
        "points": 8.5
      },
      {
        "threshold": 42,
        "points": 9
      },
      {
        "threshold": 43,
        "points": 9.5
      },
      {
        "threshold": 44,
        "points": 10
      },
      {
        "threshold": 45,
        "points": 10.5
      },
      {
        "threshold": 46,
        "points": 11
      },
      {
        "threshold": 47,
        "points": 11.5
      },
      {
        "threshold": 48,
        "points": 12
      },
      {
        "threshold": 49,
        "points": 12.5
      },
      {
        "threshold": 50,
        "points": 13
      },
      {
        "threshold": 51,
        "points": 13.5
      },
      {
        "threshold": 52,
        "points": 14
      },
      {
        "threshold": 53,
        "points": 14.5
      },
      {
        "threshold": 54,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 80,
        "points": 2.5
      },
      {
        "threshold": 85,
        "points": 3
      },
      {
        "threshold": 90,
        "points": 3.5
      },
      {
        "threshold": 95,
        "points": 4
      },
      {
        "threshold": 100,
        "points": 4.5
      },
      {
        "threshold": 105,
        "points": 5
      },
      {
        "threshold": 110,
        "points": 5.5
      },
      {
        "threshold": 115,
        "points": 6
      },
      {
        "threshold": 120,
        "points": 6.5
      },
      {
        "threshold": 125,
        "points": 7
      },
      {
        "threshold": 130,
        "points": 7.5
      },
      {
        "threshold": 135,
        "points": 8
      },
      {
        "threshold": 140,
        "points": 8.5
      },
      {
        "threshold": 145,
        "points": 9
      },
      {
        "threshold": 150,
        "points": 9.5
      },
      {
        "threshold": 155,
        "points": 10
      },
      {
        "threshold": 160,
        "points": 10.5
      },
      {
        "threshold": 165,
        "points": 11
      },
      {
        "threshold": 170,
        "points": 11.5
      },
      {
        "threshold": 175,
        "points": 12
      },
      {
        "threshold": 180,
        "points": 12.5
      },
      {
        "threshold": 185,
        "points": 13
      },
      {
        "threshold": 190,
        "points": 13.5
      },
      {
        "threshold": 195,
        "points": 14
      },
      {
        "threshold": 200,
        "points": 14.5
      },
      {
        "threshold": 205,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 836,
        "points": 50
      },
      {
        "threshold": 858,
        "points": 49.5
      },
      {
        "threshold": 880,
        "points": 49
      },
      {
        "threshold": 902,
        "points": 48
      },
      {
        "threshold": 924,
        "points": 47
      },
      {
        "threshold": 946,
        "points": 46
      },
      {
        "threshold": 968,
        "points": 45
      },
      {
        "threshold": 990,
        "points": 44
      },
      {
        "threshold": 1012,
        "points": 43
      },
      {
        "threshold": 1034,
        "points": 42
      },
      {
        "threshold": 1056,
        "points": 41
      },
      {
        "threshold": 1078,
        "points": 40
      },
      {
        "threshold": 1100,
        "points": 39
      },
      {
        "threshold": 1122,
        "points": 38.5
      },
      {
        "threshold": 1144,
        "points": 38
      },
      {
        "threshold": 1166,
        "points": 37.5
      },
      {
        "threshold": 1188,
        "points": 37
      },
      {
        "threshold": 1210,
        "points": 36.5
      },
      {
        "threshold": 1232,
        "points": 36
      },
      {
        "threshold": 1254,
        "points": 35.5
      },
      {
        "threshold": 1276,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 36,
        "points": 35
      },
      {
        "threshold": 37,
        "points": 35.5
      },
      {
        "threshold": 39,
        "points": 36
      },
      {
        "threshold": 40,
        "points": 36.5
      },
      {
        "threshold": 42,
        "points": 37
      },
      {
        "threshold": 44,
        "points": 37.5
      },
      {
        "threshold": 46,
        "points": 38
      },
      {
        "threshold": 48,
        "points": 38.5
      },
      {
        "threshold": 50,
        "points": 39
      },
      {
        "threshold": 52,
        "points": 40
      },
      {
        "threshold": 54,
        "points": 41
      },
      {
        "threshold": 56,
        "points": 42
      },
      {
        "threshold": 59,
        "points": 43
      },
      {
        "threshold": 61,
        "points": 44
      },
      {
        "threshold": 64,
        "points": 45
      },
      {
        "threshold": 66,
        "points": 46
      },
      {
        "threshold": 69,
        "points": 47
      },
      {
        "threshold": 72,
        "points": 48
      },
      {
        "threshold": 75,
        "points": 49
      },
      {
        "threshold": 79,
        "points": 49.5
      },
      {
        "threshold": 82,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "female|35-39": {
    "pushups": [
      {
        "threshold": 11,
        "points": 2.5
      },
      {
        "threshold": 12,
        "points": 3
      },
      {
        "threshold": 13,
        "points": 3.5
      },
      {
        "threshold": 15,
        "points": 4
      },
      {
        "threshold": 16,
        "points": 4.5
      },
      {
        "threshold": 17,
        "points": 5
      },
      {
        "threshold": 18,
        "points": 5.5
      },
      {
        "threshold": 20,
        "points": 6
      },
      {
        "threshold": 21,
        "points": 6.5
      },
      {
        "threshold": 22,
        "points": 7
      },
      {
        "threshold": 23,
        "points": 7.5
      },
      {
        "threshold": 25,
        "points": 8
      },
      {
        "threshold": 26,
        "points": 8.5
      },
      {
        "threshold": 27,
        "points": 9
      },
      {
        "threshold": 28,
        "points": 9.5
      },
      {
        "threshold": 30,
        "points": 10
      },
      {
        "threshold": 31,
        "points": 10.5
      },
      {
        "threshold": 32,
        "points": 11
      },
      {
        "threshold": 33,
        "points": 11.5
      },
      {
        "threshold": 35,
        "points": 12
      },
      {
        "threshold": 36,
        "points": 12.5
      },
      {
        "threshold": 37,
        "points": 13
      },
      {
        "threshold": 38,
        "points": 13.5
      },
      {
        "threshold": 40,
        "points": 14
      },
      {
        "threshold": 41,
        "points": 14.5
      },
      {
        "threshold": 42,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 11,
        "points": 2.5
      },
      {
        "threshold": 12,
        "points": 3
      },
      {
        "threshold": 13,
        "points": 3.5
      },
      {
        "threshold": 14,
        "points": 4
      },
      {
        "threshold": 15,
        "points": 4.5
      },
      {
        "threshold": 16,
        "points": 5
      },
      {
        "threshold": 17,
        "points": 5.5
      },
      {
        "threshold": 18,
        "points": 6
      },
      {
        "threshold": 19,
        "points": 6.5
      },
      {
        "threshold": 20,
        "points": 7
      },
      {
        "threshold": 21,
        "points": 7.5
      },
      {
        "threshold": 22,
        "points": 8
      },
      {
        "threshold": 23,
        "points": 8.5
      },
      {
        "threshold": 24,
        "points": 9
      },
      {
        "threshold": 25,
        "points": 9.5
      },
      {
        "threshold": 26,
        "points": 10
      },
      {
        "threshold": 27,
        "points": 10.5
      },
      {
        "threshold": 28,
        "points": 11
      },
      {
        "threshold": 29,
        "points": 11.5
      },
      {
        "threshold": 30,
        "points": 12
      },
      {
        "threshold": 31,
        "points": 12.5
      },
      {
        "threshold": 32,
        "points": 13
      },
      {
        "threshold": 33,
        "points": 13.5
      },
      {
        "threshold": 34,
        "points": 14
      },
      {
        "threshold": 35,
        "points": 14.5
      },
      {
        "threshold": 36,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 18,
        "points": 2.5
      },
      {
        "threshold": 19,
        "points": 3
      },
      {
        "threshold": 20,
        "points": 3.5
      },
      {
        "threshold": 21,
        "points": 4
      },
      {
        "threshold": 22,
        "points": 4.5
      },
      {
        "threshold": 23,
        "points": 5
      },
      {
        "threshold": 24,
        "points": 5.5
      },
      {
        "threshold": 25,
        "points": 6
      },
      {
        "threshold": 26,
        "points": 6.5
      },
      {
        "threshold": 27,
        "points": 7
      },
      {
        "threshold": 28,
        "points": 7.5
      },
      {
        "threshold": 29,
        "points": 8
      },
      {
        "threshold": 30,
        "points": 8.5
      },
      {
        "threshold": 31,
        "points": 9
      },
      {
        "threshold": 32,
        "points": 9.5
      },
      {
        "threshold": 33,
        "points": 10
      },
      {
        "threshold": 34,
        "points": 10.5
      },
      {
        "threshold": 35,
        "points": 11
      },
      {
        "threshold": 36,
        "points": 11.5
      },
      {
        "threshold": 37,
        "points": 12
      },
      {
        "threshold": 38,
        "points": 12.5
      },
      {
        "threshold": 39,
        "points": 13
      },
      {
        "threshold": 40,
        "points": 13.5
      },
      {
        "threshold": 41,
        "points": 14
      },
      {
        "threshold": 42,
        "points": 14.5
      },
      {
        "threshold": 43,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 27,
        "points": 2.5
      },
      {
        "threshold": 28,
        "points": 3
      },
      {
        "threshold": 29,
        "points": 3.5
      },
      {
        "threshold": 30,
        "points": 4
      },
      {
        "threshold": 31,
        "points": 4.5
      },
      {
        "threshold": 32,
        "points": 5
      },
      {
        "threshold": 33,
        "points": 5.5
      },
      {
        "threshold": 34,
        "points": 6
      },
      {
        "threshold": 35,
        "points": 6.5
      },
      {
        "threshold": 36,
        "points": 7
      },
      {
        "threshold": 37,
        "points": 7.5
      },
      {
        "threshold": 38,
        "points": 8
      },
      {
        "threshold": 39,
        "points": 8.5
      },
      {
        "threshold": 40,
        "points": 9
      },
      {
        "threshold": 41,
        "points": 9.5
      },
      {
        "threshold": 42,
        "points": 10
      },
      {
        "threshold": 43,
        "points": 10.5
      },
      {
        "threshold": 44,
        "points": 11
      },
      {
        "threshold": 45,
        "points": 11.5
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 12.5
      },
      {
        "threshold": 48,
        "points": 13
      },
      {
        "threshold": 49,
        "points": 13.5
      },
      {
        "threshold": 50,
        "points": 14
      },
      {
        "threshold": 51,
        "points": 14.5
      },
      {
        "threshold": 52,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 75,
        "points": 2.5
      },
      {
        "threshold": 80,
        "points": 3
      },
      {
        "threshold": 85,
        "points": 3.5
      },
      {
        "threshold": 90,
        "points": 4
      },
      {
        "threshold": 95,
        "points": 4.5
      },
      {
        "threshold": 100,
        "points": 5
      },
      {
        "threshold": 105,
        "points": 5.5
      },
      {
        "threshold": 110,
        "points": 6
      },
      {
        "threshold": 115,
        "points": 6.5
      },
      {
        "threshold": 120,
        "points": 7
      },
      {
        "threshold": 125,
        "points": 7.5
      },
      {
        "threshold": 130,
        "points": 8
      },
      {
        "threshold": 135,
        "points": 8.5
      },
      {
        "threshold": 140,
        "points": 9
      },
      {
        "threshold": 145,
        "points": 9.5
      },
      {
        "threshold": 150,
        "points": 10
      },
      {
        "threshold": 155,
        "points": 10.5
      },
      {
        "threshold": 160,
        "points": 11
      },
      {
        "threshold": 165,
        "points": 11.5
      },
      {
        "threshold": 170,
        "points": 12
      },
      {
        "threshold": 175,
        "points": 12.5
      },
      {
        "threshold": 180,
        "points": 13
      },
      {
        "threshold": 185,
        "points": 13.5
      },
      {
        "threshold": 190,
        "points": 14
      },
      {
        "threshold": 195,
        "points": 14.5
      },
      {
        "threshold": 200,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 972,
        "points": 50
      },
      {
        "threshold": 1003,
        "points": 49.5
      },
      {
        "threshold": 1034,
        "points": 49
      },
      {
        "threshold": 1065,
        "points": 48
      },
      {
        "threshold": 1096,
        "points": 47
      },
      {
        "threshold": 1127,
        "points": 46
      },
      {
        "threshold": 1157,
        "points": 45
      },
      {
        "threshold": 1188,
        "points": 44
      },
      {
        "threshold": 1219,
        "points": 43
      },
      {
        "threshold": 1250,
        "points": 42
      },
      {
        "threshold": 1281,
        "points": 41
      },
      {
        "threshold": 1312,
        "points": 40
      },
      {
        "threshold": 1343,
        "points": 39
      },
      {
        "threshold": 1374,
        "points": 38.5
      },
      {
        "threshold": 1405,
        "points": 38
      },
      {
        "threshold": 1436,
        "points": 37.5
      },
      {
        "threshold": 1466,
        "points": 37
      },
      {
        "threshold": 1497,
        "points": 36.5
      },
      {
        "threshold": 1528,
        "points": 36
      },
      {
        "threshold": 1559,
        "points": 35.5
      },
      {
        "threshold": 1590,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 18,
        "points": 35
      },
      {
        "threshold": 20,
        "points": 35.5
      },
      {
        "threshold": 21,
        "points": 36
      },
      {
        "threshold": 23,
        "points": 36.5
      },
      {
        "threshold": 24,
        "points": 37
      },
      {
        "threshold": 26,
        "points": 37.5
      },
      {
        "threshold": 28,
        "points": 38
      },
      {
        "threshold": 29,
        "points": 38.5
      },
      {
        "threshold": 31,
        "points": 39
      },
      {
        "threshold": 33,
        "points": 40
      },
      {
        "threshold": 35,
        "points": 41
      },
      {
        "threshold": 37,
        "points": 42
      },
      {
        "threshold": 40,
        "points": 43
      },
      {
        "threshold": 42,
        "points": 44
      },
      {
        "threshold": 45,
        "points": 45
      },
      {
        "threshold": 47,
        "points": 46
      },
      {
        "threshold": 50,
        "points": 47
      },
      {
        "threshold": 53,
        "points": 48
      },
      {
        "threshold": 56,
        "points": 49
      },
      {
        "threshold": 60,
        "points": 49.5
      },
      {
        "threshold": 63,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "male|40-44": {
    "pushups": [
      {
        "threshold": 21,
        "points": 2.5
      },
      {
        "threshold": 22,
        "points": 3
      },
      {
        "threshold": 23,
        "points": 3.5
      },
      {
        "threshold": 24,
        "points": 4
      },
      {
        "threshold": 26,
        "points": 4.5
      },
      {
        "threshold": 27,
        "points": 5
      },
      {
        "threshold": 28,
        "points": 5.5
      },
      {
        "threshold": 30,
        "points": 6
      },
      {
        "threshold": 31,
        "points": 6.5
      },
      {
        "threshold": 32,
        "points": 7
      },
      {
        "threshold": 33,
        "points": 7.5
      },
      {
        "threshold": 35,
        "points": 8
      },
      {
        "threshold": 36,
        "points": 8.5
      },
      {
        "threshold": 37,
        "points": 9
      },
      {
        "threshold": 39,
        "points": 9.5
      },
      {
        "threshold": 40,
        "points": 10
      },
      {
        "threshold": 41,
        "points": 10.5
      },
      {
        "threshold": 42,
        "points": 11
      },
      {
        "threshold": 44,
        "points": 11.5
      },
      {
        "threshold": 45,
        "points": 12
      },
      {
        "threshold": 46,
        "points": 12.5
      },
      {
        "threshold": 48,
        "points": 13
      },
      {
        "threshold": 49,
        "points": 13.5
      },
      {
        "threshold": 50,
        "points": 14
      },
      {
        "threshold": 51,
        "points": 14.5
      },
      {
        "threshold": 52,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 19,
        "points": 2.5
      },
      {
        "threshold": 20,
        "points": 3
      },
      {
        "threshold": 21,
        "points": 3.5
      },
      {
        "threshold": 22,
        "points": 4
      },
      {
        "threshold": 23,
        "points": 4.5
      },
      {
        "threshold": 24,
        "points": 5
      },
      {
        "threshold": 25,
        "points": 5.5
      },
      {
        "threshold": 26,
        "points": 6
      },
      {
        "threshold": 27,
        "points": 6.5
      },
      {
        "threshold": 28,
        "points": 7
      },
      {
        "threshold": 29,
        "points": 7.5
      },
      {
        "threshold": 30,
        "points": 8
      },
      {
        "threshold": 31,
        "points": 8.5
      },
      {
        "threshold": 32,
        "points": 9
      },
      {
        "threshold": 33,
        "points": 9.5
      },
      {
        "threshold": 34,
        "points": 10
      },
      {
        "threshold": 35,
        "points": 10.5
      },
      {
        "threshold": 36,
        "points": 11
      },
      {
        "threshold": 37,
        "points": 11.5
      },
      {
        "threshold": 38,
        "points": 12
      },
      {
        "threshold": 39,
        "points": 12.5
      },
      {
        "threshold": 40,
        "points": 13
      },
      {
        "threshold": 41,
        "points": 13.5
      },
      {
        "threshold": 42,
        "points": 14
      },
      {
        "threshold": 43,
        "points": 14.5
      },
      {
        "threshold": 44,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 25,
        "points": 2.5
      },
      {
        "threshold": 26,
        "points": 3
      },
      {
        "threshold": 27,
        "points": 3.5
      },
      {
        "threshold": 28,
        "points": 4
      },
      {
        "threshold": 29,
        "points": 4.5
      },
      {
        "threshold": 30,
        "points": 5
      },
      {
        "threshold": 31,
        "points": 5.5
      },
      {
        "threshold": 32,
        "points": 6
      },
      {
        "threshold": 33,
        "points": 6.5
      },
      {
        "threshold": 34,
        "points": 7
      },
      {
        "threshold": 35,
        "points": 7.5
      },
      {
        "threshold": 36,
        "points": 8
      },
      {
        "threshold": 37,
        "points": 8.5
      },
      {
        "threshold": 38,
        "points": 9
      },
      {
        "threshold": 39,
        "points": 9.5
      },
      {
        "threshold": 40,
        "points": 10
      },
      {
        "threshold": 41,
        "points": 10.5
      },
      {
        "threshold": 42,
        "points": 11
      },
      {
        "threshold": 43,
        "points": 11.5
      },
      {
        "threshold": 44,
        "points": 12
      },
      {
        "threshold": 45,
        "points": 12.5
      },
      {
        "threshold": 46,
        "points": 13
      },
      {
        "threshold": 47,
        "points": 13.5
      },
      {
        "threshold": 48,
        "points": 14
      },
      {
        "threshold": 49,
        "points": 14.5
      },
      {
        "threshold": 50,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 27,
        "points": 2.5
      },
      {
        "threshold": 28,
        "points": 3
      },
      {
        "threshold": 29,
        "points": 3.5
      },
      {
        "threshold": 30,
        "points": 4
      },
      {
        "threshold": 31,
        "points": 4.5
      },
      {
        "threshold": 32,
        "points": 5
      },
      {
        "threshold": 33,
        "points": 5.5
      },
      {
        "threshold": 34,
        "points": 6
      },
      {
        "threshold": 35,
        "points": 6.5
      },
      {
        "threshold": 36,
        "points": 7
      },
      {
        "threshold": 37,
        "points": 7.5
      },
      {
        "threshold": 38,
        "points": 8
      },
      {
        "threshold": 39,
        "points": 8.5
      },
      {
        "threshold": 40,
        "points": 9
      },
      {
        "threshold": 41,
        "points": 9.5
      },
      {
        "threshold": 42,
        "points": 10
      },
      {
        "threshold": 43,
        "points": 10.5
      },
      {
        "threshold": 44,
        "points": 11
      },
      {
        "threshold": 45,
        "points": 11.5
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 12.5
      },
      {
        "threshold": 48,
        "points": 13
      },
      {
        "threshold": 49,
        "points": 13.5
      },
      {
        "threshold": 50,
        "points": 14
      },
      {
        "threshold": 51,
        "points": 14.5
      },
      {
        "threshold": 52,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 75,
        "points": 2.5
      },
      {
        "threshold": 80,
        "points": 3
      },
      {
        "threshold": 85,
        "points": 3.5
      },
      {
        "threshold": 90,
        "points": 4
      },
      {
        "threshold": 95,
        "points": 4.5
      },
      {
        "threshold": 100,
        "points": 5
      },
      {
        "threshold": 105,
        "points": 5.5
      },
      {
        "threshold": 110,
        "points": 6
      },
      {
        "threshold": 115,
        "points": 6.5
      },
      {
        "threshold": 120,
        "points": 7
      },
      {
        "threshold": 125,
        "points": 7.5
      },
      {
        "threshold": 130,
        "points": 8
      },
      {
        "threshold": 135,
        "points": 8.5
      },
      {
        "threshold": 140,
        "points": 9
      },
      {
        "threshold": 145,
        "points": 9.5
      },
      {
        "threshold": 150,
        "points": 10
      },
      {
        "threshold": 155,
        "points": 10.5
      },
      {
        "threshold": 160,
        "points": 11
      },
      {
        "threshold": 165,
        "points": 11.5
      },
      {
        "threshold": 170,
        "points": 12
      },
      {
        "threshold": 175,
        "points": 12.5
      },
      {
        "threshold": 180,
        "points": 13
      },
      {
        "threshold": 185,
        "points": 13.5
      },
      {
        "threshold": 190,
        "points": 14
      },
      {
        "threshold": 195,
        "points": 14.5
      },
      {
        "threshold": 200,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 845,
        "points": 50
      },
      {
        "threshold": 869,
        "points": 49.5
      },
      {
        "threshold": 893,
        "points": 49
      },
      {
        "threshold": 917,
        "points": 48
      },
      {
        "threshold": 941,
        "points": 47
      },
      {
        "threshold": 965,
        "points": 46
      },
      {
        "threshold": 989,
        "points": 45
      },
      {
        "threshold": 1013,
        "points": 44
      },
      {
        "threshold": 1037,
        "points": 43
      },
      {
        "threshold": 1061,
        "points": 42
      },
      {
        "threshold": 1085,
        "points": 41
      },
      {
        "threshold": 1108,
        "points": 40
      },
      {
        "threshold": 1132,
        "points": 39
      },
      {
        "threshold": 1156,
        "points": 38.5
      },
      {
        "threshold": 1180,
        "points": 38
      },
      {
        "threshold": 1204,
        "points": 37.5
      },
      {
        "threshold": 1228,
        "points": 37
      },
      {
        "threshold": 1252,
        "points": 36.5
      },
      {
        "threshold": 1276,
        "points": 36
      },
      {
        "threshold": 1300,
        "points": 35.5
      },
      {
        "threshold": 1324,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 32,
        "points": 35
      },
      {
        "threshold": 34,
        "points": 35.5
      },
      {
        "threshold": 36,
        "points": 36
      },
      {
        "threshold": 37,
        "points": 36.5
      },
      {
        "threshold": 39,
        "points": 37
      },
      {
        "threshold": 41,
        "points": 37.5
      },
      {
        "threshold": 43,
        "points": 38
      },
      {
        "threshold": 45,
        "points": 38.5
      },
      {
        "threshold": 47,
        "points": 39
      },
      {
        "threshold": 49,
        "points": 40
      },
      {
        "threshold": 51,
        "points": 41
      },
      {
        "threshold": 53,
        "points": 42
      },
      {
        "threshold": 56,
        "points": 43
      },
      {
        "threshold": 58,
        "points": 44
      },
      {
        "threshold": 61,
        "points": 45
      },
      {
        "threshold": 64,
        "points": 46
      },
      {
        "threshold": 67,
        "points": 47
      },
      {
        "threshold": 70,
        "points": 48
      },
      {
        "threshold": 73,
        "points": 49
      },
      {
        "threshold": 77,
        "points": 49.5
      },
      {
        "threshold": 81,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "female|40-44": {
    "pushups": [
      {
        "threshold": 10,
        "points": 2.5
      },
      {
        "threshold": 11,
        "points": 3
      },
      {
        "threshold": 12,
        "points": 3.5
      },
      {
        "threshold": 13,
        "points": 4
      },
      {
        "threshold": 14,
        "points": 4.5
      },
      {
        "threshold": 15,
        "points": 5
      },
      {
        "threshold": 17,
        "points": 5.5
      },
      {
        "threshold": 18,
        "points": 6
      },
      {
        "threshold": 19,
        "points": 6.5
      },
      {
        "threshold": 20,
        "points": 7
      },
      {
        "threshold": 21,
        "points": 7.5
      },
      {
        "threshold": 23,
        "points": 8
      },
      {
        "threshold": 24,
        "points": 8.5
      },
      {
        "threshold": 25,
        "points": 9
      },
      {
        "threshold": 26,
        "points": 9.5
      },
      {
        "threshold": 27,
        "points": 10
      },
      {
        "threshold": 29,
        "points": 10.5
      },
      {
        "threshold": 30,
        "points": 11
      },
      {
        "threshold": 31,
        "points": 11.5
      },
      {
        "threshold": 32,
        "points": 12
      },
      {
        "threshold": 33,
        "points": 12.5
      },
      {
        "threshold": 35,
        "points": 13
      },
      {
        "threshold": 36,
        "points": 13.5
      },
      {
        "threshold": 37,
        "points": 14
      },
      {
        "threshold": 38,
        "points": 14.5
      },
      {
        "threshold": 39,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 9,
        "points": 2.5
      },
      {
        "threshold": 10,
        "points": 3
      },
      {
        "threshold": 11,
        "points": 3.5
      },
      {
        "threshold": 12,
        "points": 4
      },
      {
        "threshold": 13,
        "points": 4.5
      },
      {
        "threshold": 14,
        "points": 5
      },
      {
        "threshold": 15,
        "points": 5.5
      },
      {
        "threshold": 16,
        "points": 6
      },
      {
        "threshold": 17,
        "points": 6.5
      },
      {
        "threshold": 18,
        "points": 7
      },
      {
        "threshold": 19,
        "points": 7.5
      },
      {
        "threshold": 20,
        "points": 8
      },
      {
        "threshold": 21,
        "points": 8.5
      },
      {
        "threshold": 22,
        "points": 9
      },
      {
        "threshold": 23,
        "points": 9.5
      },
      {
        "threshold": 24,
        "points": 10
      },
      {
        "threshold": 25,
        "points": 10.5
      },
      {
        "threshold": 26,
        "points": 11
      },
      {
        "threshold": 27,
        "points": 11.5
      },
      {
        "threshold": 28,
        "points": 12
      },
      {
        "threshold": 29,
        "points": 12.5
      },
      {
        "threshold": 30,
        "points": 13
      },
      {
        "threshold": 31,
        "points": 13.5
      },
      {
        "threshold": 32,
        "points": 14
      },
      {
        "threshold": 33,
        "points": 14.5
      },
      {
        "threshold": 34,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 16,
        "points": 2.5
      },
      {
        "threshold": 17,
        "points": 3
      },
      {
        "threshold": 18,
        "points": 3.5
      },
      {
        "threshold": 19,
        "points": 4
      },
      {
        "threshold": 20,
        "points": 4.5
      },
      {
        "threshold": 21,
        "points": 5
      },
      {
        "threshold": 22,
        "points": 5.5
      },
      {
        "threshold": 23,
        "points": 6
      },
      {
        "threshold": 24,
        "points": 6.5
      },
      {
        "threshold": 25,
        "points": 7
      },
      {
        "threshold": 26,
        "points": 7.5
      },
      {
        "threshold": 27,
        "points": 8
      },
      {
        "threshold": 28,
        "points": 8.5
      },
      {
        "threshold": 29,
        "points": 9
      },
      {
        "threshold": 30,
        "points": 9.5
      },
      {
        "threshold": 31,
        "points": 10
      },
      {
        "threshold": 32,
        "points": 10.5
      },
      {
        "threshold": 33,
        "points": 11
      },
      {
        "threshold": 34,
        "points": 11.5
      },
      {
        "threshold": 35,
        "points": 12
      },
      {
        "threshold": 36,
        "points": 12.5
      },
      {
        "threshold": 37,
        "points": 13
      },
      {
        "threshold": 38,
        "points": 13.5
      },
      {
        "threshold": 39,
        "points": 14
      },
      {
        "threshold": 40,
        "points": 14.5
      },
      {
        "threshold": 41,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 25,
        "points": 2.5
      },
      {
        "threshold": 26,
        "points": 3
      },
      {
        "threshold": 27,
        "points": 3.5
      },
      {
        "threshold": 28,
        "points": 4
      },
      {
        "threshold": 29,
        "points": 4.5
      },
      {
        "threshold": 30,
        "points": 5
      },
      {
        "threshold": 31,
        "points": 5.5
      },
      {
        "threshold": 32,
        "points": 6
      },
      {
        "threshold": 33,
        "points": 6.5
      },
      {
        "threshold": 34,
        "points": 7
      },
      {
        "threshold": 35,
        "points": 7.5
      },
      {
        "threshold": 36,
        "points": 8
      },
      {
        "threshold": 37,
        "points": 8.5
      },
      {
        "threshold": 38,
        "points": 9
      },
      {
        "threshold": 39,
        "points": 9.5
      },
      {
        "threshold": 40,
        "points": 10
      },
      {
        "threshold": 41,
        "points": 10.5
      },
      {
        "threshold": 42,
        "points": 11
      },
      {
        "threshold": 43,
        "points": 11.5
      },
      {
        "threshold": 44,
        "points": 12
      },
      {
        "threshold": 45,
        "points": 12.5
      },
      {
        "threshold": 46,
        "points": 13
      },
      {
        "threshold": 47,
        "points": 13.5
      },
      {
        "threshold": 48,
        "points": 14
      },
      {
        "threshold": 49,
        "points": 14.5
      },
      {
        "threshold": 50,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 2.5
      },
      {
        "threshold": 75,
        "points": 3
      },
      {
        "threshold": 80,
        "points": 3.5
      },
      {
        "threshold": 85,
        "points": 4
      },
      {
        "threshold": 90,
        "points": 4.5
      },
      {
        "threshold": 95,
        "points": 5
      },
      {
        "threshold": 100,
        "points": 5.5
      },
      {
        "threshold": 105,
        "points": 6
      },
      {
        "threshold": 110,
        "points": 6.5
      },
      {
        "threshold": 115,
        "points": 7
      },
      {
        "threshold": 120,
        "points": 7.5
      },
      {
        "threshold": 125,
        "points": 8
      },
      {
        "threshold": 130,
        "points": 8.5
      },
      {
        "threshold": 135,
        "points": 9
      },
      {
        "threshold": 140,
        "points": 9.5
      },
      {
        "threshold": 145,
        "points": 10
      },
      {
        "threshold": 150,
        "points": 10.5
      },
      {
        "threshold": 155,
        "points": 11
      },
      {
        "threshold": 160,
        "points": 11.5
      },
      {
        "threshold": 165,
        "points": 12
      },
      {
        "threshold": 170,
        "points": 12.5
      },
      {
        "threshold": 175,
        "points": 13
      },
      {
        "threshold": 180,
        "points": 13.5
      },
      {
        "threshold": 185,
        "points": 14
      },
      {
        "threshold": 190,
        "points": 14.5
      },
      {
        "threshold": 195,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 1005,
        "points": 50
      },
      {
        "threshold": 1035,
        "points": 49.5
      },
      {
        "threshold": 1066,
        "points": 49
      },
      {
        "threshold": 1096,
        "points": 48
      },
      {
        "threshold": 1126,
        "points": 47
      },
      {
        "threshold": 1157,
        "points": 46
      },
      {
        "threshold": 1187,
        "points": 45
      },
      {
        "threshold": 1217,
        "points": 44
      },
      {
        "threshold": 1248,
        "points": 43
      },
      {
        "threshold": 1278,
        "points": 42
      },
      {
        "threshold": 1309,
        "points": 41
      },
      {
        "threshold": 1339,
        "points": 40
      },
      {
        "threshold": 1369,
        "points": 39
      },
      {
        "threshold": 1400,
        "points": 38.5
      },
      {
        "threshold": 1430,
        "points": 38
      },
      {
        "threshold": 1460,
        "points": 37.5
      },
      {
        "threshold": 1491,
        "points": 37
      },
      {
        "threshold": 1521,
        "points": 36.5
      },
      {
        "threshold": 1551,
        "points": 36
      },
      {
        "threshold": 1582,
        "points": 35.5
      },
      {
        "threshold": 1612,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 17,
        "points": 35
      },
      {
        "threshold": 19,
        "points": 35.5
      },
      {
        "threshold": 20,
        "points": 36
      },
      {
        "threshold": 21,
        "points": 36.5
      },
      {
        "threshold": 23,
        "points": 37
      },
      {
        "threshold": 24,
        "points": 37.5
      },
      {
        "threshold": 26,
        "points": 38
      },
      {
        "threshold": 28,
        "points": 38.5
      },
      {
        "threshold": 30,
        "points": 39
      },
      {
        "threshold": 31,
        "points": 40
      },
      {
        "threshold": 33,
        "points": 41
      },
      {
        "threshold": 35,
        "points": 42
      },
      {
        "threshold": 38,
        "points": 43
      },
      {
        "threshold": 40,
        "points": 44
      },
      {
        "threshold": 42,
        "points": 45
      },
      {
        "threshold": 45,
        "points": 46
      },
      {
        "threshold": 47,
        "points": 47
      },
      {
        "threshold": 50,
        "points": 48
      },
      {
        "threshold": 53,
        "points": 49
      },
      {
        "threshold": 56,
        "points": 49.5
      },
      {
        "threshold": 59,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "male|45-49": {
    "pushups": [
      {
        "threshold": 19,
        "points": 2.5
      },
      {
        "threshold": 21,
        "points": 3
      },
      {
        "threshold": 22,
        "points": 3.5
      },
      {
        "threshold": 23,
        "points": 4
      },
      {
        "threshold": 24,
        "points": 4.5
      },
      {
        "threshold": 25,
        "points": 5
      },
      {
        "threshold": 26,
        "points": 5.5
      },
      {
        "threshold": 28,
        "points": 6
      },
      {
        "threshold": 29,
        "points": 6.5
      },
      {
        "threshold": 30,
        "points": 7
      },
      {
        "threshold": 31,
        "points": 7.5
      },
      {
        "threshold": 32,
        "points": 8
      },
      {
        "threshold": 33,
        "points": 8.5
      },
      {
        "threshold": 35,
        "points": 9
      },
      {
        "threshold": 36,
        "points": 9.5
      },
      {
        "threshold": 37,
        "points": 10
      },
      {
        "threshold": 38,
        "points": 10.5
      },
      {
        "threshold": 39,
        "points": 11
      },
      {
        "threshold": 40,
        "points": 11.5
      },
      {
        "threshold": 42,
        "points": 12
      },
      {
        "threshold": 43,
        "points": 12.5
      },
      {
        "threshold": 44,
        "points": 13
      },
      {
        "threshold": 45,
        "points": 13.5
      },
      {
        "threshold": 46,
        "points": 14
      },
      {
        "threshold": 47,
        "points": 14.5
      },
      {
        "threshold": 49,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 17,
        "points": 2.5
      },
      {
        "threshold": 18,
        "points": 3
      },
      {
        "threshold": 19,
        "points": 3.5
      },
      {
        "threshold": 20,
        "points": 4
      },
      {
        "threshold": 21,
        "points": 4.5
      },
      {
        "threshold": 22,
        "points": 5
      },
      {
        "threshold": 23,
        "points": 5.5
      },
      {
        "threshold": 24,
        "points": 6
      },
      {
        "threshold": 25,
        "points": 6.5
      },
      {
        "threshold": 26,
        "points": 7
      },
      {
        "threshold": 27,
        "points": 7.5
      },
      {
        "threshold": 28,
        "points": 8
      },
      {
        "threshold": 29,
        "points": 8.5
      },
      {
        "threshold": 30,
        "points": 9
      },
      {
        "threshold": 31,
        "points": 9.5
      },
      {
        "threshold": 32,
        "points": 10
      },
      {
        "threshold": 33,
        "points": 10.5
      },
      {
        "threshold": 34,
        "points": 11
      },
      {
        "threshold": 35,
        "points": 11.5
      },
      {
        "threshold": 36,
        "points": 12
      },
      {
        "threshold": 37,
        "points": 12.5
      },
      {
        "threshold": 38,
        "points": 13
      },
      {
        "threshold": 39,
        "points": 13.5
      },
      {
        "threshold": 40,
        "points": 14
      },
      {
        "threshold": 41,
        "points": 14.5
      },
      {
        "threshold": 42,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 23,
        "points": 2.5
      },
      {
        "threshold": 24,
        "points": 3
      },
      {
        "threshold": 25,
        "points": 3.5
      },
      {
        "threshold": 26,
        "points": 4
      },
      {
        "threshold": 27,
        "points": 4.5
      },
      {
        "threshold": 28,
        "points": 5
      },
      {
        "threshold": 29,
        "points": 5.5
      },
      {
        "threshold": 30,
        "points": 6
      },
      {
        "threshold": 31,
        "points": 6.5
      },
      {
        "threshold": 32,
        "points": 7
      },
      {
        "threshold": 33,
        "points": 7.5
      },
      {
        "threshold": 34,
        "points": 8
      },
      {
        "threshold": 35,
        "points": 8.5
      },
      {
        "threshold": 36,
        "points": 9
      },
      {
        "threshold": 37,
        "points": 9.5
      },
      {
        "threshold": 38,
        "points": 10
      },
      {
        "threshold": 39,
        "points": 10.5
      },
      {
        "threshold": 40,
        "points": 11
      },
      {
        "threshold": 41,
        "points": 11.5
      },
      {
        "threshold": 42,
        "points": 12
      },
      {
        "threshold": 43,
        "points": 12.5
      },
      {
        "threshold": 44,
        "points": 13
      },
      {
        "threshold": 45,
        "points": 13.5
      },
      {
        "threshold": 46,
        "points": 14
      },
      {
        "threshold": 47,
        "points": 14.5
      },
      {
        "threshold": 48,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 25,
        "points": 2.5
      },
      {
        "threshold": 26,
        "points": 3
      },
      {
        "threshold": 27,
        "points": 3.5
      },
      {
        "threshold": 28,
        "points": 4
      },
      {
        "threshold": 29,
        "points": 4.5
      },
      {
        "threshold": 30,
        "points": 5
      },
      {
        "threshold": 31,
        "points": 5.5
      },
      {
        "threshold": 32,
        "points": 6
      },
      {
        "threshold": 33,
        "points": 6.5
      },
      {
        "threshold": 34,
        "points": 7
      },
      {
        "threshold": 35,
        "points": 7.5
      },
      {
        "threshold": 36,
        "points": 8
      },
      {
        "threshold": 37,
        "points": 8.5
      },
      {
        "threshold": 38,
        "points": 9
      },
      {
        "threshold": 39,
        "points": 9.5
      },
      {
        "threshold": 40,
        "points": 10
      },
      {
        "threshold": 41,
        "points": 10.5
      },
      {
        "threshold": 42,
        "points": 11
      },
      {
        "threshold": 43,
        "points": 11.5
      },
      {
        "threshold": 44,
        "points": 12
      },
      {
        "threshold": 45,
        "points": 12.5
      },
      {
        "threshold": 46,
        "points": 13
      },
      {
        "threshold": 47,
        "points": 13.5
      },
      {
        "threshold": 48,
        "points": 14
      },
      {
        "threshold": 49,
        "points": 14.5
      },
      {
        "threshold": 50,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 2.5
      },
      {
        "threshold": 75,
        "points": 3
      },
      {
        "threshold": 80,
        "points": 3.5
      },
      {
        "threshold": 85,
        "points": 4
      },
      {
        "threshold": 90,
        "points": 4.5
      },
      {
        "threshold": 95,
        "points": 5
      },
      {
        "threshold": 100,
        "points": 5.5
      },
      {
        "threshold": 105,
        "points": 6
      },
      {
        "threshold": 110,
        "points": 6.5
      },
      {
        "threshold": 115,
        "points": 7
      },
      {
        "threshold": 120,
        "points": 7.5
      },
      {
        "threshold": 125,
        "points": 8
      },
      {
        "threshold": 130,
        "points": 8.5
      },
      {
        "threshold": 135,
        "points": 9
      },
      {
        "threshold": 140,
        "points": 9.5
      },
      {
        "threshold": 145,
        "points": 10
      },
      {
        "threshold": 150,
        "points": 10.5
      },
      {
        "threshold": 155,
        "points": 11
      },
      {
        "threshold": 160,
        "points": 11.5
      },
      {
        "threshold": 165,
        "points": 12
      },
      {
        "threshold": 170,
        "points": 12.5
      },
      {
        "threshold": 175,
        "points": 13
      },
      {
        "threshold": 180,
        "points": 13.5
      },
      {
        "threshold": 185,
        "points": 14
      },
      {
        "threshold": 190,
        "points": 14.5
      },
      {
        "threshold": 195,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 870,
        "points": 50
      },
      {
        "threshold": 894,
        "points": 49.5
      },
      {
        "threshold": 918,
        "points": 49
      },
      {
        "threshold": 942,
        "points": 48
      },
      {
        "threshold": 965,
        "points": 47
      },
      {
        "threshold": 989,
        "points": 46
      },
      {
        "threshold": 1013,
        "points": 45
      },
      {
        "threshold": 1037,
        "points": 44
      },
      {
        "threshold": 1061,
        "points": 43
      },
      {
        "threshold": 1085,
        "points": 42
      },
      {
        "threshold": 1109,
        "points": 41
      },
      {
        "threshold": 1132,
        "points": 40
      },
      {
        "threshold": 1156,
        "points": 39
      },
      {
        "threshold": 1180,
        "points": 38.5
      },
      {
        "threshold": 1204,
        "points": 38
      },
      {
        "threshold": 1228,
        "points": 37.5
      },
      {
        "threshold": 1252,
        "points": 37
      },
      {
        "threshold": 1275,
        "points": 36.5
      },
      {
        "threshold": 1299,
        "points": 36
      },
      {
        "threshold": 1323,
        "points": 35.5
      },
      {
        "threshold": 1347,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 31,
        "points": 35
      },
      {
        "threshold": 32,
        "points": 35.5
      },
      {
        "threshold": 34,
        "points": 36
      },
      {
        "threshold": 36,
        "points": 36.5
      },
      {
        "threshold": 37,
        "points": 37
      },
      {
        "threshold": 39,
        "points": 37.5
      },
      {
        "threshold": 41,
        "points": 38
      },
      {
        "threshold": 43,
        "points": 38.5
      },
      {
        "threshold": 45,
        "points": 39
      },
      {
        "threshold": 47,
        "points": 40
      },
      {
        "threshold": 49,
        "points": 41
      },
      {
        "threshold": 51,
        "points": 42
      },
      {
        "threshold": 53,
        "points": 43
      },
      {
        "threshold": 56,
        "points": 44
      },
      {
        "threshold": 58,
        "points": 45
      },
      {
        "threshold": 61,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 47
      },
      {
        "threshold": 67,
        "points": 48
      },
      {
        "threshold": 70,
        "points": 49
      },
      {
        "threshold": 73,
        "points": 49.5
      },
      {
        "threshold": 77,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "female|45-49": {
    "pushups": [
      {
        "threshold": 8,
        "points": 2.5
      },
      {
        "threshold": 9,
        "points": 3
      },
      {
        "threshold": 10,
        "points": 3.5
      },
      {
        "threshold": 11,
        "points": 4
      },
      {
        "threshold": 12,
        "points": 4.5
      },
      {
        "threshold": 14,
        "points": 5
      },
      {
        "threshold": 15,
        "points": 5.5
      },
      {
        "threshold": 16,
        "points": 6
      },
      {
        "threshold": 17,
        "points": 6.5
      },
      {
        "threshold": 18,
        "points": 7
      },
      {
        "threshold": 19,
        "points": 7.5
      },
      {
        "threshold": 20,
        "points": 8
      },
      {
        "threshold": 21,
        "points": 8.5
      },
      {
        "threshold": 23,
        "points": 9
      },
      {
        "threshold": 24,
        "points": 9.5
      },
      {
        "threshold": 25,
        "points": 10
      },
      {
        "threshold": 26,
        "points": 10.5
      },
      {
        "threshold": 27,
        "points": 11
      },
      {
        "threshold": 28,
        "points": 11.5
      },
      {
        "threshold": 29,
        "points": 12
      },
      {
        "threshold": 30,
        "points": 12.5
      },
      {
        "threshold": 32,
        "points": 13
      },
      {
        "threshold": 33,
        "points": 13.5
      },
      {
        "threshold": 34,
        "points": 14
      },
      {
        "threshold": 35,
        "points": 14.5
      },
      {
        "threshold": 36,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 7,
        "points": 2.5
      },
      {
        "threshold": 8,
        "points": 3
      },
      {
        "threshold": 9,
        "points": 3.5
      },
      {
        "threshold": 10,
        "points": 4
      },
      {
        "threshold": 11,
        "points": 4.5
      },
      {
        "threshold": 12,
        "points": 5
      },
      {
        "threshold": 13,
        "points": 5.5
      },
      {
        "threshold": 14,
        "points": 6
      },
      {
        "threshold": 15,
        "points": 6.5
      },
      {
        "threshold": 16,
        "points": 7
      },
      {
        "threshold": 17,
        "points": 7.5
      },
      {
        "threshold": 18,
        "points": 8
      },
      {
        "threshold": 19,
        "points": 8.5
      },
      {
        "threshold": 20,
        "points": 9
      },
      {
        "threshold": 21,
        "points": 9.5
      },
      {
        "threshold": 22,
        "points": 10
      },
      {
        "threshold": 23,
        "points": 10.5
      },
      {
        "threshold": 24,
        "points": 11
      },
      {
        "threshold": 25,
        "points": 11.5
      },
      {
        "threshold": 26,
        "points": 12
      },
      {
        "threshold": 27,
        "points": 12.5
      },
      {
        "threshold": 28,
        "points": 13
      },
      {
        "threshold": 29,
        "points": 13.5
      },
      {
        "threshold": 30,
        "points": 14
      },
      {
        "threshold": 31,
        "points": 14.5
      },
      {
        "threshold": 32,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 10,
        "points": 2.5
      },
      {
        "threshold": 11,
        "points": 3
      },
      {
        "threshold": 12,
        "points": 3.5
      },
      {
        "threshold": 13,
        "points": 4
      },
      {
        "threshold": 14,
        "points": 4.5
      },
      {
        "threshold": 15,
        "points": 5
      },
      {
        "threshold": 16,
        "points": 5.5
      },
      {
        "threshold": 17,
        "points": 6
      },
      {
        "threshold": 18,
        "points": 6.5
      },
      {
        "threshold": 19,
        "points": 7
      },
      {
        "threshold": 20,
        "points": 7.5
      },
      {
        "threshold": 21,
        "points": 8
      },
      {
        "threshold": 22,
        "points": 8.5
      },
      {
        "threshold": 23,
        "points": 9
      },
      {
        "threshold": 24,
        "points": 9.5
      },
      {
        "threshold": 25,
        "points": 10
      },
      {
        "threshold": 26,
        "points": 10.5
      },
      {
        "threshold": 27,
        "points": 11
      },
      {
        "threshold": 28,
        "points": 11.5
      },
      {
        "threshold": 29,
        "points": 12
      },
      {
        "threshold": 30,
        "points": 12.5
      },
      {
        "threshold": 31,
        "points": 13
      },
      {
        "threshold": 32,
        "points": 13.5
      },
      {
        "threshold": 33,
        "points": 14
      },
      {
        "threshold": 34,
        "points": 14.5
      },
      {
        "threshold": 35,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 23,
        "points": 2.5
      },
      {
        "threshold": 24,
        "points": 3
      },
      {
        "threshold": 25,
        "points": 3.5
      },
      {
        "threshold": 26,
        "points": 4
      },
      {
        "threshold": 27,
        "points": 4.5
      },
      {
        "threshold": 28,
        "points": 5
      },
      {
        "threshold": 29,
        "points": 5.5
      },
      {
        "threshold": 30,
        "points": 6
      },
      {
        "threshold": 31,
        "points": 6.5
      },
      {
        "threshold": 32,
        "points": 7
      },
      {
        "threshold": 33,
        "points": 7.5
      },
      {
        "threshold": 34,
        "points": 8
      },
      {
        "threshold": 35,
        "points": 8.5
      },
      {
        "threshold": 36,
        "points": 9
      },
      {
        "threshold": 37,
        "points": 9.5
      },
      {
        "threshold": 38,
        "points": 10
      },
      {
        "threshold": 39,
        "points": 10.5
      },
      {
        "threshold": 40,
        "points": 11
      },
      {
        "threshold": 41,
        "points": 11.5
      },
      {
        "threshold": 42,
        "points": 12
      },
      {
        "threshold": 43,
        "points": 12.5
      },
      {
        "threshold": 44,
        "points": 13
      },
      {
        "threshold": 45,
        "points": 13.5
      },
      {
        "threshold": 46,
        "points": 14
      },
      {
        "threshold": 47,
        "points": 14.5
      },
      {
        "threshold": 48,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 65,
        "points": 2.5
      },
      {
        "threshold": 70,
        "points": 3
      },
      {
        "threshold": 75,
        "points": 3.5
      },
      {
        "threshold": 80,
        "points": 4
      },
      {
        "threshold": 85,
        "points": 4.5
      },
      {
        "threshold": 90,
        "points": 5
      },
      {
        "threshold": 95,
        "points": 5.5
      },
      {
        "threshold": 100,
        "points": 6
      },
      {
        "threshold": 105,
        "points": 6.5
      },
      {
        "threshold": 110,
        "points": 7
      },
      {
        "threshold": 115,
        "points": 7.5
      },
      {
        "threshold": 120,
        "points": 8
      },
      {
        "threshold": 125,
        "points": 8.5
      },
      {
        "threshold": 130,
        "points": 9
      },
      {
        "threshold": 135,
        "points": 9.5
      },
      {
        "threshold": 140,
        "points": 10
      },
      {
        "threshold": 145,
        "points": 10.5
      },
      {
        "threshold": 150,
        "points": 11
      },
      {
        "threshold": 155,
        "points": 11.5
      },
      {
        "threshold": 160,
        "points": 12
      },
      {
        "threshold": 165,
        "points": 12.5
      },
      {
        "threshold": 170,
        "points": 13
      },
      {
        "threshold": 175,
        "points": 13.5
      },
      {
        "threshold": 180,
        "points": 14
      },
      {
        "threshold": 185,
        "points": 14.5
      },
      {
        "threshold": 190,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 1015,
        "points": 50
      },
      {
        "threshold": 1046,
        "points": 49.5
      },
      {
        "threshold": 1077,
        "points": 49
      },
      {
        "threshold": 1108,
        "points": 48
      },
      {
        "threshold": 1139,
        "points": 47
      },
      {
        "threshold": 1170,
        "points": 46
      },
      {
        "threshold": 1201,
        "points": 45
      },
      {
        "threshold": 1232,
        "points": 44
      },
      {
        "threshold": 1263,
        "points": 43
      },
      {
        "threshold": 1294,
        "points": 42
      },
      {
        "threshold": 1325,
        "points": 41
      },
      {
        "threshold": 1356,
        "points": 40
      },
      {
        "threshold": 1387,
        "points": 39
      },
      {
        "threshold": 1418,
        "points": 38.5
      },
      {
        "threshold": 1449,
        "points": 38
      },
      {
        "threshold": 1480,
        "points": 37.5
      },
      {
        "threshold": 1511,
        "points": 37
      },
      {
        "threshold": 1542,
        "points": 36.5
      },
      {
        "threshold": 1573,
        "points": 36
      },
      {
        "threshold": 1604,
        "points": 35.5
      },
      {
        "threshold": 1635,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 16,
        "points": 35
      },
      {
        "threshold": 18,
        "points": 35.5
      },
      {
        "threshold": 19,
        "points": 36
      },
      {
        "threshold": 20,
        "points": 36.5
      },
      {
        "threshold": 22,
        "points": 37
      },
      {
        "threshold": 23,
        "points": 37.5
      },
      {
        "threshold": 25,
        "points": 38
      },
      {
        "threshold": 27,
        "points": 38.5
      },
      {
        "threshold": 29,
        "points": 39
      },
      {
        "threshold": 30,
        "points": 40
      },
      {
        "threshold": 32,
        "points": 41
      },
      {
        "threshold": 34,
        "points": 42
      },
      {
        "threshold": 37,
        "points": 43
      },
      {
        "threshold": 39,
        "points": 44
      },
      {
        "threshold": 41,
        "points": 45
      },
      {
        "threshold": 44,
        "points": 46
      },
      {
        "threshold": 46,
        "points": 47
      },
      {
        "threshold": 49,
        "points": 48
      },
      {
        "threshold": 52,
        "points": 49
      },
      {
        "threshold": 55,
        "points": 49.5
      },
      {
        "threshold": 58,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "male|50-54": {
    "pushups": [
      {
        "threshold": 17,
        "points": 2.5
      },
      {
        "threshold": 18,
        "points": 3
      },
      {
        "threshold": 19,
        "points": 3.5
      },
      {
        "threshold": 20,
        "points": 4
      },
      {
        "threshold": 21,
        "points": 4.5
      },
      {
        "threshold": 23,
        "points": 5
      },
      {
        "threshold": 24,
        "points": 5.5
      },
      {
        "threshold": 25,
        "points": 6
      },
      {
        "threshold": 26,
        "points": 6.5
      },
      {
        "threshold": 27,
        "points": 7
      },
      {
        "threshold": 28,
        "points": 7.5
      },
      {
        "threshold": 29,
        "points": 8
      },
      {
        "threshold": 30,
        "points": 8.5
      },
      {
        "threshold": 32,
        "points": 9
      },
      {
        "threshold": 33,
        "points": 9.5
      },
      {
        "threshold": 34,
        "points": 10
      },
      {
        "threshold": 35,
        "points": 10.5
      },
      {
        "threshold": 36,
        "points": 11
      },
      {
        "threshold": 37,
        "points": 11.5
      },
      {
        "threshold": 38,
        "points": 12
      },
      {
        "threshold": 39,
        "points": 12.5
      },
      {
        "threshold": 41,
        "points": 13
      },
      {
        "threshold": 42,
        "points": 13.5
      },
      {
        "threshold": 43,
        "points": 14
      },
      {
        "threshold": 44,
        "points": 14.5
      },
      {
        "threshold": 45,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 15,
        "points": 2.5
      },
      {
        "threshold": 16,
        "points": 3
      },
      {
        "threshold": 17,
        "points": 3.5
      },
      {
        "threshold": 18,
        "points": 4
      },
      {
        "threshold": 19,
        "points": 4.5
      },
      {
        "threshold": 20,
        "points": 5
      },
      {
        "threshold": 21,
        "points": 5.5
      },
      {
        "threshold": 22,
        "points": 6
      },
      {
        "threshold": 23,
        "points": 6.5
      },
      {
        "threshold": 24,
        "points": 7
      },
      {
        "threshold": 25,
        "points": 7.5
      },
      {
        "threshold": 26,
        "points": 8
      },
      {
        "threshold": 27,
        "points": 8.5
      },
      {
        "threshold": 28,
        "points": 9
      },
      {
        "threshold": 29,
        "points": 9.5
      },
      {
        "threshold": 30,
        "points": 10
      },
      {
        "threshold": 31,
        "points": 10.5
      },
      {
        "threshold": 32,
        "points": 11
      },
      {
        "threshold": 33,
        "points": 11.5
      },
      {
        "threshold": 34,
        "points": 12
      },
      {
        "threshold": 35,
        "points": 12.5
      },
      {
        "threshold": 36,
        "points": 13
      },
      {
        "threshold": 37,
        "points": 13.5
      },
      {
        "threshold": 38,
        "points": 14
      },
      {
        "threshold": 39,
        "points": 14.5
      },
      {
        "threshold": 40,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 21,
        "points": 2.5
      },
      {
        "threshold": 22,
        "points": 3
      },
      {
        "threshold": 23,
        "points": 3.5
      },
      {
        "threshold": 24,
        "points": 4
      },
      {
        "threshold": 25,
        "points": 4.5
      },
      {
        "threshold": 26,
        "points": 5
      },
      {
        "threshold": 27,
        "points": 5.5
      },
      {
        "threshold": 28,
        "points": 6
      },
      {
        "threshold": 29,
        "points": 6.5
      },
      {
        "threshold": 30,
        "points": 7
      },
      {
        "threshold": 31,
        "points": 7.5
      },
      {
        "threshold": 32,
        "points": 8
      },
      {
        "threshold": 33,
        "points": 8.5
      },
      {
        "threshold": 34,
        "points": 9
      },
      {
        "threshold": 35,
        "points": 9.5
      },
      {
        "threshold": 36,
        "points": 10
      },
      {
        "threshold": 37,
        "points": 10.5
      },
      {
        "threshold": 38,
        "points": 11
      },
      {
        "threshold": 39,
        "points": 11.5
      },
      {
        "threshold": 40,
        "points": 12
      },
      {
        "threshold": 41,
        "points": 12.5
      },
      {
        "threshold": 42,
        "points": 13
      },
      {
        "threshold": 43,
        "points": 13.5
      },
      {
        "threshold": 44,
        "points": 14
      },
      {
        "threshold": 45,
        "points": 14.5
      },
      {
        "threshold": 46,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 23,
        "points": 2.5
      },
      {
        "threshold": 24,
        "points": 3
      },
      {
        "threshold": 25,
        "points": 3.5
      },
      {
        "threshold": 26,
        "points": 4
      },
      {
        "threshold": 27,
        "points": 4.5
      },
      {
        "threshold": 28,
        "points": 5
      },
      {
        "threshold": 29,
        "points": 5.5
      },
      {
        "threshold": 30,
        "points": 6
      },
      {
        "threshold": 31,
        "points": 6.5
      },
      {
        "threshold": 32,
        "points": 7
      },
      {
        "threshold": 33,
        "points": 7.5
      },
      {
        "threshold": 34,
        "points": 8
      },
      {
        "threshold": 35,
        "points": 8.5
      },
      {
        "threshold": 36,
        "points": 9
      },
      {
        "threshold": 37,
        "points": 9.5
      },
      {
        "threshold": 38,
        "points": 10
      },
      {
        "threshold": 39,
        "points": 10.5
      },
      {
        "threshold": 40,
        "points": 11
      },
      {
        "threshold": 41,
        "points": 11.5
      },
      {
        "threshold": 42,
        "points": 12
      },
      {
        "threshold": 43,
        "points": 12.5
      },
      {
        "threshold": 44,
        "points": 13
      },
      {
        "threshold": 45,
        "points": 13.5
      },
      {
        "threshold": 46,
        "points": 14
      },
      {
        "threshold": 47,
        "points": 14.5
      },
      {
        "threshold": 48,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 65,
        "points": 2.5
      },
      {
        "threshold": 70,
        "points": 3
      },
      {
        "threshold": 75,
        "points": 3.5
      },
      {
        "threshold": 80,
        "points": 4
      },
      {
        "threshold": 85,
        "points": 4.5
      },
      {
        "threshold": 90,
        "points": 5
      },
      {
        "threshold": 95,
        "points": 5.5
      },
      {
        "threshold": 100,
        "points": 6
      },
      {
        "threshold": 105,
        "points": 6.5
      },
      {
        "threshold": 110,
        "points": 7
      },
      {
        "threshold": 115,
        "points": 7.5
      },
      {
        "threshold": 120,
        "points": 8
      },
      {
        "threshold": 125,
        "points": 8.5
      },
      {
        "threshold": 130,
        "points": 9
      },
      {
        "threshold": 135,
        "points": 9.5
      },
      {
        "threshold": 140,
        "points": 10
      },
      {
        "threshold": 145,
        "points": 10.5
      },
      {
        "threshold": 150,
        "points": 11
      },
      {
        "threshold": 155,
        "points": 11.5
      },
      {
        "threshold": 160,
        "points": 12
      },
      {
        "threshold": 165,
        "points": 12.5
      },
      {
        "threshold": 170,
        "points": 13
      },
      {
        "threshold": 175,
        "points": 13.5
      },
      {
        "threshold": 180,
        "points": 14
      },
      {
        "threshold": 185,
        "points": 14.5
      },
      {
        "threshold": 190,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 909,
        "points": 50
      },
      {
        "threshold": 932,
        "points": 49.5
      },
      {
        "threshold": 955,
        "points": 49
      },
      {
        "threshold": 978,
        "points": 48
      },
      {
        "threshold": 1001,
        "points": 47
      },
      {
        "threshold": 1024,
        "points": 46
      },
      {
        "threshold": 1047,
        "points": 45
      },
      {
        "threshold": 1070,
        "points": 44
      },
      {
        "threshold": 1093,
        "points": 43
      },
      {
        "threshold": 1116,
        "points": 42
      },
      {
        "threshold": 1140,
        "points": 41
      },
      {
        "threshold": 1163,
        "points": 40
      },
      {
        "threshold": 1186,
        "points": 39
      },
      {
        "threshold": 1209,
        "points": 38.5
      },
      {
        "threshold": 1232,
        "points": 38
      },
      {
        "threshold": 1255,
        "points": 37.5
      },
      {
        "threshold": 1278,
        "points": 37
      },
      {
        "threshold": 1301,
        "points": 36.5
      },
      {
        "threshold": 1324,
        "points": 36
      },
      {
        "threshold": 1347,
        "points": 35.5
      },
      {
        "threshold": 1370,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 30,
        "points": 35
      },
      {
        "threshold": 31,
        "points": 35.5
      },
      {
        "threshold": 32,
        "points": 36
      },
      {
        "threshold": 34,
        "points": 36.5
      },
      {
        "threshold": 35,
        "points": 37
      },
      {
        "threshold": 37,
        "points": 37.5
      },
      {
        "threshold": 39,
        "points": 38
      },
      {
        "threshold": 40,
        "points": 38.5
      },
      {
        "threshold": 42,
        "points": 39
      },
      {
        "threshold": 44,
        "points": 40
      },
      {
        "threshold": 46,
        "points": 41
      },
      {
        "threshold": 48,
        "points": 42
      },
      {
        "threshold": 50,
        "points": 43
      },
      {
        "threshold": 53,
        "points": 44
      },
      {
        "threshold": 55,
        "points": 45
      },
      {
        "threshold": 57,
        "points": 46
      },
      {
        "threshold": 60,
        "points": 47
      },
      {
        "threshold": 62,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 49
      },
      {
        "threshold": 68,
        "points": 49.5
      },
      {
        "threshold": 71,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "female|50-54": {
    "pushups": [
      {
        "threshold": 7,
        "points": 2.5
      },
      {
        "threshold": 8,
        "points": 3
      },
      {
        "threshold": 9,
        "points": 3.5
      },
      {
        "threshold": 10,
        "points": 4
      },
      {
        "threshold": 11,
        "points": 4.5
      },
      {
        "threshold": 12,
        "points": 5
      },
      {
        "threshold": 13,
        "points": 5.5
      },
      {
        "threshold": 15,
        "points": 6
      },
      {
        "threshold": 16,
        "points": 6.5
      },
      {
        "threshold": 17,
        "points": 7
      },
      {
        "threshold": 18,
        "points": 7.5
      },
      {
        "threshold": 19,
        "points": 8
      },
      {
        "threshold": 20,
        "points": 8.5
      },
      {
        "threshold": 21,
        "points": 9
      },
      {
        "threshold": 22,
        "points": 9.5
      },
      {
        "threshold": 23,
        "points": 10
      },
      {
        "threshold": 24,
        "points": 10.5
      },
      {
        "threshold": 25,
        "points": 11
      },
      {
        "threshold": 26,
        "points": 11.5
      },
      {
        "threshold": 28,
        "points": 12
      },
      {
        "threshold": 29,
        "points": 12.5
      },
      {
        "threshold": 30,
        "points": 13
      },
      {
        "threshold": 31,
        "points": 13.5
      },
      {
        "threshold": 32,
        "points": 14
      },
      {
        "threshold": 33,
        "points": 14.5
      },
      {
        "threshold": 34,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 5,
        "points": 2.5
      },
      {
        "threshold": 6,
        "points": 3
      },
      {
        "threshold": 7,
        "points": 3.5
      },
      {
        "threshold": 8,
        "points": 4
      },
      {
        "threshold": 9,
        "points": 4.5
      },
      {
        "threshold": 10,
        "points": 5
      },
      {
        "threshold": 11,
        "points": 5.5
      },
      {
        "threshold": 12,
        "points": 6
      },
      {
        "threshold": 13,
        "points": 6.5
      },
      {
        "threshold": 14,
        "points": 7
      },
      {
        "threshold": 15,
        "points": 7.5
      },
      {
        "threshold": 16,
        "points": 8
      },
      {
        "threshold": 17,
        "points": 8.5
      },
      {
        "threshold": 18,
        "points": 9
      },
      {
        "threshold": 19,
        "points": 9.5
      },
      {
        "threshold": 20,
        "points": 10
      },
      {
        "threshold": 21,
        "points": 10.5
      },
      {
        "threshold": 22,
        "points": 11
      },
      {
        "threshold": 23,
        "points": 11.5
      },
      {
        "threshold": 24,
        "points": 12
      },
      {
        "threshold": 25,
        "points": 12.5
      },
      {
        "threshold": 26,
        "points": 13
      },
      {
        "threshold": 27,
        "points": 13.5
      },
      {
        "threshold": 28,
        "points": 14
      },
      {
        "threshold": 29,
        "points": 14.5
      },
      {
        "threshold": 30,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 9,
        "points": 2.5
      },
      {
        "threshold": 10,
        "points": 3
      },
      {
        "threshold": 11,
        "points": 3.5
      },
      {
        "threshold": 12,
        "points": 4
      },
      {
        "threshold": 13,
        "points": 4.5
      },
      {
        "threshold": 14,
        "points": 5
      },
      {
        "threshold": 15,
        "points": 5.5
      },
      {
        "threshold": 16,
        "points": 6
      },
      {
        "threshold": 17,
        "points": 6.5
      },
      {
        "threshold": 18,
        "points": 7
      },
      {
        "threshold": 19,
        "points": 7.5
      },
      {
        "threshold": 20,
        "points": 8
      },
      {
        "threshold": 21,
        "points": 8.5
      },
      {
        "threshold": 22,
        "points": 9
      },
      {
        "threshold": 23,
        "points": 9.5
      },
      {
        "threshold": 24,
        "points": 10
      },
      {
        "threshold": 25,
        "points": 10.5
      },
      {
        "threshold": 26,
        "points": 11
      },
      {
        "threshold": 27,
        "points": 11.5
      },
      {
        "threshold": 28,
        "points": 12
      },
      {
        "threshold": 29,
        "points": 12.5
      },
      {
        "threshold": 30,
        "points": 13
      },
      {
        "threshold": 31,
        "points": 13.5
      },
      {
        "threshold": 32,
        "points": 14
      },
      {
        "threshold": 33,
        "points": 14.5
      },
      {
        "threshold": 34,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 21,
        "points": 2.5
      },
      {
        "threshold": 22,
        "points": 3
      },
      {
        "threshold": 23,
        "points": 3.5
      },
      {
        "threshold": 24,
        "points": 4
      },
      {
        "threshold": 25,
        "points": 4.5
      },
      {
        "threshold": 26,
        "points": 5
      },
      {
        "threshold": 27,
        "points": 5.5
      },
      {
        "threshold": 28,
        "points": 6
      },
      {
        "threshold": 29,
        "points": 6.5
      },
      {
        "threshold": 30,
        "points": 7
      },
      {
        "threshold": 31,
        "points": 7.5
      },
      {
        "threshold": 32,
        "points": 8
      },
      {
        "threshold": 33,
        "points": 8.5
      },
      {
        "threshold": 34,
        "points": 9
      },
      {
        "threshold": 35,
        "points": 9.5
      },
      {
        "threshold": 36,
        "points": 10
      },
      {
        "threshold": 37,
        "points": 10.5
      },
      {
        "threshold": 38,
        "points": 11
      },
      {
        "threshold": 39,
        "points": 11.5
      },
      {
        "threshold": 40,
        "points": 12
      },
      {
        "threshold": 41,
        "points": 12.5
      },
      {
        "threshold": 42,
        "points": 13
      },
      {
        "threshold": 43,
        "points": 13.5
      },
      {
        "threshold": 44,
        "points": 14
      },
      {
        "threshold": 45,
        "points": 14.5
      },
      {
        "threshold": 46,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 60,
        "points": 2.5
      },
      {
        "threshold": 65,
        "points": 3
      },
      {
        "threshold": 70,
        "points": 3.5
      },
      {
        "threshold": 75,
        "points": 4
      },
      {
        "threshold": 80,
        "points": 4.5
      },
      {
        "threshold": 85,
        "points": 5
      },
      {
        "threshold": 90,
        "points": 5.5
      },
      {
        "threshold": 95,
        "points": 6
      },
      {
        "threshold": 100,
        "points": 6.5
      },
      {
        "threshold": 105,
        "points": 7
      },
      {
        "threshold": 110,
        "points": 7.5
      },
      {
        "threshold": 115,
        "points": 8
      },
      {
        "threshold": 120,
        "points": 8.5
      },
      {
        "threshold": 125,
        "points": 9
      },
      {
        "threshold": 130,
        "points": 9.5
      },
      {
        "threshold": 135,
        "points": 10
      },
      {
        "threshold": 140,
        "points": 10.5
      },
      {
        "threshold": 145,
        "points": 11
      },
      {
        "threshold": 150,
        "points": 11.5
      },
      {
        "threshold": 155,
        "points": 12
      },
      {
        "threshold": 160,
        "points": 12.5
      },
      {
        "threshold": 165,
        "points": 13
      },
      {
        "threshold": 170,
        "points": 13.5
      },
      {
        "threshold": 175,
        "points": 14
      },
      {
        "threshold": 180,
        "points": 14.5
      },
      {
        "threshold": 185,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 1030,
        "points": 50
      },
      {
        "threshold": 1063,
        "points": 49.5
      },
      {
        "threshold": 1096,
        "points": 49
      },
      {
        "threshold": 1128,
        "points": 48
      },
      {
        "threshold": 1161,
        "points": 47
      },
      {
        "threshold": 1194,
        "points": 46
      },
      {
        "threshold": 1227,
        "points": 45
      },
      {
        "threshold": 1259,
        "points": 44
      },
      {
        "threshold": 1292,
        "points": 43
      },
      {
        "threshold": 1325,
        "points": 42
      },
      {
        "threshold": 1358,
        "points": 41
      },
      {
        "threshold": 1390,
        "points": 40
      },
      {
        "threshold": 1423,
        "points": 39
      },
      {
        "threshold": 1456,
        "points": 38.5
      },
      {
        "threshold": 1489,
        "points": 38
      },
      {
        "threshold": 1521,
        "points": 37.5
      },
      {
        "threshold": 1554,
        "points": 37
      },
      {
        "threshold": 1587,
        "points": 36.5
      },
      {
        "threshold": 1620,
        "points": 36
      },
      {
        "threshold": 1652,
        "points": 35.5
      },
      {
        "threshold": 1685,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 14,
        "points": 35
      },
      {
        "threshold": 16,
        "points": 35.5
      },
      {
        "threshold": 17,
        "points": 36
      },
      {
        "threshold": 18,
        "points": 36.5
      },
      {
        "threshold": 20,
        "points": 37
      },
      {
        "threshold": 21,
        "points": 37.5
      },
      {
        "threshold": 23,
        "points": 38
      },
      {
        "threshold": 25,
        "points": 38.5
      },
      {
        "threshold": 26,
        "points": 39
      },
      {
        "threshold": 28,
        "points": 40
      },
      {
        "threshold": 30,
        "points": 41
      },
      {
        "threshold": 32,
        "points": 42
      },
      {
        "threshold": 35,
        "points": 43
      },
      {
        "threshold": 37,
        "points": 44
      },
      {
        "threshold": 39,
        "points": 45
      },
      {
        "threshold": 42,
        "points": 46
      },
      {
        "threshold": 44,
        "points": 47
      },
      {
        "threshold": 47,
        "points": 48
      },
      {
        "threshold": 50,
        "points": 49
      },
      {
        "threshold": 53,
        "points": 49.5
      },
      {
        "threshold": 57,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "male|55-59": {
    "pushups": [
      {
        "threshold": 14,
        "points": 2.5
      },
      {
        "threshold": 15,
        "points": 3
      },
      {
        "threshold": 16,
        "points": 3.5
      },
      {
        "threshold": 17,
        "points": 4
      },
      {
        "threshold": 18,
        "points": 4.5
      },
      {
        "threshold": 20,
        "points": 5
      },
      {
        "threshold": 21,
        "points": 5.5
      },
      {
        "threshold": 22,
        "points": 6
      },
      {
        "threshold": 23,
        "points": 6.5
      },
      {
        "threshold": 24,
        "points": 7
      },
      {
        "threshold": 25,
        "points": 7.5
      },
      {
        "threshold": 26,
        "points": 8
      },
      {
        "threshold": 27,
        "points": 8.5
      },
      {
        "threshold": 29,
        "points": 9
      },
      {
        "threshold": 30,
        "points": 9.5
      },
      {
        "threshold": 31,
        "points": 10
      },
      {
        "threshold": 32,
        "points": 10.5
      },
      {
        "threshold": 33,
        "points": 11
      },
      {
        "threshold": 34,
        "points": 11.5
      },
      {
        "threshold": 35,
        "points": 12
      },
      {
        "threshold": 36,
        "points": 12.5
      },
      {
        "threshold": 38,
        "points": 13
      },
      {
        "threshold": 39,
        "points": 13.5
      },
      {
        "threshold": 40,
        "points": 14
      },
      {
        "threshold": 41,
        "points": 14.5
      },
      {
        "threshold": 42,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 13,
        "points": 2.5
      },
      {
        "threshold": 14,
        "points": 3
      },
      {
        "threshold": 15,
        "points": 3.5
      },
      {
        "threshold": 16,
        "points": 4
      },
      {
        "threshold": 17,
        "points": 4.5
      },
      {
        "threshold": 18,
        "points": 5
      },
      {
        "threshold": 19,
        "points": 5.5
      },
      {
        "threshold": 20,
        "points": 6
      },
      {
        "threshold": 21,
        "points": 6.5
      },
      {
        "threshold": 22,
        "points": 7
      },
      {
        "threshold": 23,
        "points": 7.5
      },
      {
        "threshold": 24,
        "points": 8
      },
      {
        "threshold": 25,
        "points": 8.5
      },
      {
        "threshold": 26,
        "points": 9
      },
      {
        "threshold": 27,
        "points": 9.5
      },
      {
        "threshold": 28,
        "points": 10
      },
      {
        "threshold": 29,
        "points": 10.5
      },
      {
        "threshold": 30,
        "points": 11
      },
      {
        "threshold": 31,
        "points": 11.5
      },
      {
        "threshold": 32,
        "points": 12
      },
      {
        "threshold": 33,
        "points": 12.5
      },
      {
        "threshold": 34,
        "points": 13
      },
      {
        "threshold": 35,
        "points": 13.5
      },
      {
        "threshold": 36,
        "points": 14
      },
      {
        "threshold": 37,
        "points": 14.5
      },
      {
        "threshold": 38,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 19,
        "points": 2.5
      },
      {
        "threshold": 20,
        "points": 3
      },
      {
        "threshold": 21,
        "points": 3.5
      },
      {
        "threshold": 22,
        "points": 4
      },
      {
        "threshold": 23,
        "points": 4.5
      },
      {
        "threshold": 24,
        "points": 5
      },
      {
        "threshold": 25,
        "points": 5.5
      },
      {
        "threshold": 26,
        "points": 6
      },
      {
        "threshold": 27,
        "points": 6.5
      },
      {
        "threshold": 28,
        "points": 7
      },
      {
        "threshold": 29,
        "points": 7.5
      },
      {
        "threshold": 30,
        "points": 8
      },
      {
        "threshold": 31,
        "points": 8.5
      },
      {
        "threshold": 32,
        "points": 9
      },
      {
        "threshold": 33,
        "points": 9.5
      },
      {
        "threshold": 34,
        "points": 10
      },
      {
        "threshold": 35,
        "points": 10.5
      },
      {
        "threshold": 36,
        "points": 11
      },
      {
        "threshold": 37,
        "points": 11.5
      },
      {
        "threshold": 38,
        "points": 12
      },
      {
        "threshold": 39,
        "points": 12.5
      },
      {
        "threshold": 40,
        "points": 13
      },
      {
        "threshold": 41,
        "points": 13.5
      },
      {
        "threshold": 42,
        "points": 14
      },
      {
        "threshold": 43,
        "points": 14.5
      },
      {
        "threshold": 44,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 21,
        "points": 2.5
      },
      {
        "threshold": 22,
        "points": 3
      },
      {
        "threshold": 23,
        "points": 3.5
      },
      {
        "threshold": 24,
        "points": 4
      },
      {
        "threshold": 25,
        "points": 4.5
      },
      {
        "threshold": 26,
        "points": 5
      },
      {
        "threshold": 27,
        "points": 5.5
      },
      {
        "threshold": 28,
        "points": 6
      },
      {
        "threshold": 29,
        "points": 6.5
      },
      {
        "threshold": 30,
        "points": 7
      },
      {
        "threshold": 31,
        "points": 7.5
      },
      {
        "threshold": 32,
        "points": 8
      },
      {
        "threshold": 33,
        "points": 8.5
      },
      {
        "threshold": 34,
        "points": 9
      },
      {
        "threshold": 35,
        "points": 9.5
      },
      {
        "threshold": 36,
        "points": 10
      },
      {
        "threshold": 37,
        "points": 10.5
      },
      {
        "threshold": 38,
        "points": 11
      },
      {
        "threshold": 39,
        "points": 11.5
      },
      {
        "threshold": 40,
        "points": 12
      },
      {
        "threshold": 41,
        "points": 12.5
      },
      {
        "threshold": 42,
        "points": 13
      },
      {
        "threshold": 43,
        "points": 13.5
      },
      {
        "threshold": 44,
        "points": 14
      },
      {
        "threshold": 45,
        "points": 14.5
      },
      {
        "threshold": 46,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 60,
        "points": 2.5
      },
      {
        "threshold": 65,
        "points": 3
      },
      {
        "threshold": 70,
        "points": 3.5
      },
      {
        "threshold": 75,
        "points": 4
      },
      {
        "threshold": 80,
        "points": 4.5
      },
      {
        "threshold": 85,
        "points": 5
      },
      {
        "threshold": 90,
        "points": 5.5
      },
      {
        "threshold": 95,
        "points": 6
      },
      {
        "threshold": 100,
        "points": 6.5
      },
      {
        "threshold": 105,
        "points": 7
      },
      {
        "threshold": 110,
        "points": 7.5
      },
      {
        "threshold": 115,
        "points": 8
      },
      {
        "threshold": 120,
        "points": 8.5
      },
      {
        "threshold": 125,
        "points": 9
      },
      {
        "threshold": 130,
        "points": 9.5
      },
      {
        "threshold": 135,
        "points": 10
      },
      {
        "threshold": 140,
        "points": 10.5
      },
      {
        "threshold": 145,
        "points": 11
      },
      {
        "threshold": 150,
        "points": 11.5
      },
      {
        "threshold": 155,
        "points": 12
      },
      {
        "threshold": 160,
        "points": 12.5
      },
      {
        "threshold": 165,
        "points": 13
      },
      {
        "threshold": 170,
        "points": 13.5
      },
      {
        "threshold": 175,
        "points": 14
      },
      {
        "threshold": 180,
        "points": 14.5
      },
      {
        "threshold": 185,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 928,
        "points": 50
      },
      {
        "threshold": 952,
        "points": 49.5
      },
      {
        "threshold": 977,
        "points": 49
      },
      {
        "threshold": 1001,
        "points": 48
      },
      {
        "threshold": 1026,
        "points": 47
      },
      {
        "threshold": 1050,
        "points": 46
      },
      {
        "threshold": 1074,
        "points": 45
      },
      {
        "threshold": 1099,
        "points": 44
      },
      {
        "threshold": 1123,
        "points": 43
      },
      {
        "threshold": 1148,
        "points": 42
      },
      {
        "threshold": 1172,
        "points": 41
      },
      {
        "threshold": 1196,
        "points": 40
      },
      {
        "threshold": 1221,
        "points": 39
      },
      {
        "threshold": 1245,
        "points": 38.5
      },
      {
        "threshold": 1270,
        "points": 38
      },
      {
        "threshold": 1294,
        "points": 37.5
      },
      {
        "threshold": 1318,
        "points": 37
      },
      {
        "threshold": 1343,
        "points": 36.5
      },
      {
        "threshold": 1367,
        "points": 36
      },
      {
        "threshold": 1392,
        "points": 35.5
      },
      {
        "threshold": 1416,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 27,
        "points": 35
      },
      {
        "threshold": 28,
        "points": 35.5
      },
      {
        "threshold": 30,
        "points": 36
      },
      {
        "threshold": 31,
        "points": 36.5
      },
      {
        "threshold": 33,
        "points": 37
      },
      {
        "threshold": 34,
        "points": 37.5
      },
      {
        "threshold": 36,
        "points": 38
      },
      {
        "threshold": 38,
        "points": 38.5
      },
      {
        "threshold": 40,
        "points": 39
      },
      {
        "threshold": 41,
        "points": 40
      },
      {
        "threshold": 43,
        "points": 41
      },
      {
        "threshold": 45,
        "points": 42
      },
      {
        "threshold": 48,
        "points": 43
      },
      {
        "threshold": 50,
        "points": 44
      },
      {
        "threshold": 52,
        "points": 45
      },
      {
        "threshold": 55,
        "points": 46
      },
      {
        "threshold": 57,
        "points": 47
      },
      {
        "threshold": 60,
        "points": 48
      },
      {
        "threshold": 63,
        "points": 49
      },
      {
        "threshold": 66,
        "points": 49.5
      },
      {
        "threshold": 69,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "female|55-59": {
    "pushups": [
      {
        "threshold": 5,
        "points": 2.5
      },
      {
        "threshold": 6,
        "points": 3
      },
      {
        "threshold": 7,
        "points": 3.5
      },
      {
        "threshold": 8,
        "points": 4
      },
      {
        "threshold": 9,
        "points": 4.5
      },
      {
        "threshold": 10,
        "points": 5
      },
      {
        "threshold": 11,
        "points": 5.5
      },
      {
        "threshold": 12,
        "points": 6
      },
      {
        "threshold": 13,
        "points": 6.5
      },
      {
        "threshold": 14,
        "points": 7
      },
      {
        "threshold": 15,
        "points": 7.5
      },
      {
        "threshold": 16,
        "points": 8
      },
      {
        "threshold": 17,
        "points": 8.5
      },
      {
        "threshold": 19,
        "points": 9
      },
      {
        "threshold": 20,
        "points": 9.5
      },
      {
        "threshold": 21,
        "points": 10
      },
      {
        "threshold": 22,
        "points": 10.5
      },
      {
        "threshold": 23,
        "points": 11
      },
      {
        "threshold": 24,
        "points": 11.5
      },
      {
        "threshold": 25,
        "points": 12
      },
      {
        "threshold": 26,
        "points": 12.5
      },
      {
        "threshold": 27,
        "points": 13
      },
      {
        "threshold": 28,
        "points": 13.5
      },
      {
        "threshold": 29,
        "points": 14
      },
      {
        "threshold": 30,
        "points": 14.5
      },
      {
        "threshold": 31,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 3,
        "points": 2.5
      },
      {
        "threshold": 4,
        "points": 3
      },
      {
        "threshold": 5,
        "points": 3.5
      },
      {
        "threshold": 6,
        "points": 4
      },
      {
        "threshold": 7,
        "points": 4.5
      },
      {
        "threshold": 8,
        "points": 5
      },
      {
        "threshold": 9,
        "points": 5.5
      },
      {
        "threshold": 10,
        "points": 6
      },
      {
        "threshold": 11,
        "points": 6.5
      },
      {
        "threshold": 12,
        "points": 7
      },
      {
        "threshold": 13,
        "points": 7.5
      },
      {
        "threshold": 14,
        "points": 8
      },
      {
        "threshold": 15,
        "points": 8.5
      },
      {
        "threshold": 16,
        "points": 9
      },
      {
        "threshold": 17,
        "points": 9.5
      },
      {
        "threshold": 18,
        "points": 10
      },
      {
        "threshold": 19,
        "points": 10.5
      },
      {
        "threshold": 20,
        "points": 11
      },
      {
        "threshold": 21,
        "points": 11.5
      },
      {
        "threshold": 22,
        "points": 12
      },
      {
        "threshold": 23,
        "points": 12.5
      },
      {
        "threshold": 24,
        "points": 13
      },
      {
        "threshold": 25,
        "points": 13.5
      },
      {
        "threshold": 26,
        "points": 14
      },
      {
        "threshold": 27,
        "points": 14.5
      },
      {
        "threshold": 28,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 7,
        "points": 2.5
      },
      {
        "threshold": 8,
        "points": 3
      },
      {
        "threshold": 9,
        "points": 3.5
      },
      {
        "threshold": 10,
        "points": 4
      },
      {
        "threshold": 11,
        "points": 4.5
      },
      {
        "threshold": 12,
        "points": 5
      },
      {
        "threshold": 13,
        "points": 5.5
      },
      {
        "threshold": 14,
        "points": 6
      },
      {
        "threshold": 15,
        "points": 6.5
      },
      {
        "threshold": 16,
        "points": 7
      },
      {
        "threshold": 17,
        "points": 7.5
      },
      {
        "threshold": 18,
        "points": 8
      },
      {
        "threshold": 19,
        "points": 8.5
      },
      {
        "threshold": 20,
        "points": 9
      },
      {
        "threshold": 21,
        "points": 9.5
      },
      {
        "threshold": 22,
        "points": 10
      },
      {
        "threshold": 23,
        "points": 10.5
      },
      {
        "threshold": 24,
        "points": 11
      },
      {
        "threshold": 25,
        "points": 11.5
      },
      {
        "threshold": 26,
        "points": 12
      },
      {
        "threshold": 27,
        "points": 12.5
      },
      {
        "threshold": 28,
        "points": 13
      },
      {
        "threshold": 29,
        "points": 13.5
      },
      {
        "threshold": 30,
        "points": 14
      },
      {
        "threshold": 31,
        "points": 14.5
      },
      {
        "threshold": 32,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 19,
        "points": 2.5
      },
      {
        "threshold": 20,
        "points": 3
      },
      {
        "threshold": 21,
        "points": 3.5
      },
      {
        "threshold": 22,
        "points": 4
      },
      {
        "threshold": 23,
        "points": 4.5
      },
      {
        "threshold": 24,
        "points": 5
      },
      {
        "threshold": 25,
        "points": 5.5
      },
      {
        "threshold": 26,
        "points": 6
      },
      {
        "threshold": 27,
        "points": 6.5
      },
      {
        "threshold": 28,
        "points": 7
      },
      {
        "threshold": 29,
        "points": 7.5
      },
      {
        "threshold": 30,
        "points": 8
      },
      {
        "threshold": 31,
        "points": 8.5
      },
      {
        "threshold": 32,
        "points": 9
      },
      {
        "threshold": 33,
        "points": 9.5
      },
      {
        "threshold": 34,
        "points": 10
      },
      {
        "threshold": 35,
        "points": 10.5
      },
      {
        "threshold": 36,
        "points": 11
      },
      {
        "threshold": 37,
        "points": 11.5
      },
      {
        "threshold": 38,
        "points": 12
      },
      {
        "threshold": 39,
        "points": 12.5
      },
      {
        "threshold": 40,
        "points": 13
      },
      {
        "threshold": 41,
        "points": 13.5
      },
      {
        "threshold": 42,
        "points": 14
      },
      {
        "threshold": 43,
        "points": 14.5
      },
      {
        "threshold": 44,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 55,
        "points": 2.5
      },
      {
        "threshold": 60,
        "points": 3
      },
      {
        "threshold": 65,
        "points": 3.5
      },
      {
        "threshold": 70,
        "points": 4
      },
      {
        "threshold": 75,
        "points": 4.5
      },
      {
        "threshold": 80,
        "points": 5
      },
      {
        "threshold": 85,
        "points": 5.5
      },
      {
        "threshold": 90,
        "points": 6
      },
      {
        "threshold": 95,
        "points": 6.5
      },
      {
        "threshold": 100,
        "points": 7
      },
      {
        "threshold": 105,
        "points": 7.5
      },
      {
        "threshold": 110,
        "points": 8
      },
      {
        "threshold": 115,
        "points": 8.5
      },
      {
        "threshold": 120,
        "points": 9
      },
      {
        "threshold": 125,
        "points": 9.5
      },
      {
        "threshold": 130,
        "points": 10
      },
      {
        "threshold": 135,
        "points": 10.5
      },
      {
        "threshold": 140,
        "points": 11
      },
      {
        "threshold": 145,
        "points": 11.5
      },
      {
        "threshold": 150,
        "points": 12
      },
      {
        "threshold": 155,
        "points": 12.5
      },
      {
        "threshold": 160,
        "points": 13
      },
      {
        "threshold": 165,
        "points": 13.5
      },
      {
        "threshold": 170,
        "points": 14
      },
      {
        "threshold": 175,
        "points": 14.5
      },
      {
        "threshold": 180,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 1063,
        "points": 50
      },
      {
        "threshold": 1096,
        "points": 49.5
      },
      {
        "threshold": 1129,
        "points": 49
      },
      {
        "threshold": 1162,
        "points": 48
      },
      {
        "threshold": 1194,
        "points": 47
      },
      {
        "threshold": 1227,
        "points": 46
      },
      {
        "threshold": 1260,
        "points": 45
      },
      {
        "threshold": 1293,
        "points": 44
      },
      {
        "threshold": 1326,
        "points": 43
      },
      {
        "threshold": 1359,
        "points": 42
      },
      {
        "threshold": 1392,
        "points": 41
      },
      {
        "threshold": 1424,
        "points": 40
      },
      {
        "threshold": 1457,
        "points": 39
      },
      {
        "threshold": 1490,
        "points": 38.5
      },
      {
        "threshold": 1523,
        "points": 38
      },
      {
        "threshold": 1556,
        "points": 37.5
      },
      {
        "threshold": 1589,
        "points": 37
      },
      {
        "threshold": 1621,
        "points": 36.5
      },
      {
        "threshold": 1654,
        "points": 36
      },
      {
        "threshold": 1687,
        "points": 35.5
      },
      {
        "threshold": 1720,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 13,
        "points": 35
      },
      {
        "threshold": 14,
        "points": 35.5
      },
      {
        "threshold": 15,
        "points": 36
      },
      {
        "threshold": 17,
        "points": 36.5
      },
      {
        "threshold": 18,
        "points": 37
      },
      {
        "threshold": 20,
        "points": 37.5
      },
      {
        "threshold": 21,
        "points": 38
      },
      {
        "threshold": 23,
        "points": 38.5
      },
      {
        "threshold": 25,
        "points": 39
      },
      {
        "threshold": 26,
        "points": 40
      },
      {
        "threshold": 28,
        "points": 41
      },
      {
        "threshold": 30,
        "points": 42
      },
      {
        "threshold": 32,
        "points": 43
      },
      {
        "threshold": 34,
        "points": 44
      },
      {
        "threshold": 37,
        "points": 45
      },
      {
        "threshold": 39,
        "points": 46
      },
      {
        "threshold": 42,
        "points": 47
      },
      {
        "threshold": 44,
        "points": 48
      },
      {
        "threshold": 47,
        "points": 49
      },
      {
        "threshold": 50,
        "points": 49.5
      },
      {
        "threshold": 53,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "male|60-plus": {
    "pushups": [
      {
        "threshold": 12,
        "points": 2.5
      },
      {
        "threshold": 13,
        "points": 3
      },
      {
        "threshold": 14,
        "points": 3.5
      },
      {
        "threshold": 15,
        "points": 4
      },
      {
        "threshold": 16,
        "points": 4.5
      },
      {
        "threshold": 17,
        "points": 5
      },
      {
        "threshold": 18,
        "points": 5.5
      },
      {
        "threshold": 19,
        "points": 6
      },
      {
        "threshold": 20,
        "points": 6.5
      },
      {
        "threshold": 21,
        "points": 7
      },
      {
        "threshold": 22,
        "points": 7.5
      },
      {
        "threshold": 23,
        "points": 8
      },
      {
        "threshold": 24,
        "points": 8.5
      },
      {
        "threshold": 26,
        "points": 9
      },
      {
        "threshold": 27,
        "points": 9.5
      },
      {
        "threshold": 28,
        "points": 10
      },
      {
        "threshold": 29,
        "points": 10.5
      },
      {
        "threshold": 30,
        "points": 11
      },
      {
        "threshold": 31,
        "points": 11.5
      },
      {
        "threshold": 32,
        "points": 12
      },
      {
        "threshold": 33,
        "points": 12.5
      },
      {
        "threshold": 34,
        "points": 13
      },
      {
        "threshold": 35,
        "points": 13.5
      },
      {
        "threshold": 36,
        "points": 14
      },
      {
        "threshold": 37,
        "points": 14.5
      },
      {
        "threshold": 38,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 11,
        "points": 2.5
      },
      {
        "threshold": 12,
        "points": 3
      },
      {
        "threshold": 13,
        "points": 3.5
      },
      {
        "threshold": 14,
        "points": 4
      },
      {
        "threshold": 15,
        "points": 4.5
      },
      {
        "threshold": 16,
        "points": 5
      },
      {
        "threshold": 17,
        "points": 5.5
      },
      {
        "threshold": 18,
        "points": 6
      },
      {
        "threshold": 19,
        "points": 6.5
      },
      {
        "threshold": 20,
        "points": 7
      },
      {
        "threshold": 21,
        "points": 7.5
      },
      {
        "threshold": 22,
        "points": 8
      },
      {
        "threshold": 23,
        "points": 8.5
      },
      {
        "threshold": 24,
        "points": 9
      },
      {
        "threshold": 25,
        "points": 9.5
      },
      {
        "threshold": 26,
        "points": 10
      },
      {
        "threshold": 27,
        "points": 10.5
      },
      {
        "threshold": 28,
        "points": 11
      },
      {
        "threshold": 29,
        "points": 11.5
      },
      {
        "threshold": 30,
        "points": 12
      },
      {
        "threshold": 31,
        "points": 12.5
      },
      {
        "threshold": 32,
        "points": 13
      },
      {
        "threshold": 33,
        "points": 13.5
      },
      {
        "threshold": 34,
        "points": 14
      },
      {
        "threshold": 35,
        "points": 14.5
      },
      {
        "threshold": 36,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 17,
        "points": 2.5
      },
      {
        "threshold": 18,
        "points": 3
      },
      {
        "threshold": 19,
        "points": 3.5
      },
      {
        "threshold": 20,
        "points": 4
      },
      {
        "threshold": 21,
        "points": 4.5
      },
      {
        "threshold": 22,
        "points": 5
      },
      {
        "threshold": 23,
        "points": 5.5
      },
      {
        "threshold": 24,
        "points": 6
      },
      {
        "threshold": 25,
        "points": 6.5
      },
      {
        "threshold": 26,
        "points": 7
      },
      {
        "threshold": 27,
        "points": 7.5
      },
      {
        "threshold": 28,
        "points": 8
      },
      {
        "threshold": 29,
        "points": 8.5
      },
      {
        "threshold": 30,
        "points": 9
      },
      {
        "threshold": 31,
        "points": 9.5
      },
      {
        "threshold": 32,
        "points": 10
      },
      {
        "threshold": 33,
        "points": 10.5
      },
      {
        "threshold": 34,
        "points": 11
      },
      {
        "threshold": 35,
        "points": 11.5
      },
      {
        "threshold": 36,
        "points": 12
      },
      {
        "threshold": 37,
        "points": 12.5
      },
      {
        "threshold": 38,
        "points": 13
      },
      {
        "threshold": 39,
        "points": 13.5
      },
      {
        "threshold": 40,
        "points": 14
      },
      {
        "threshold": 41,
        "points": 14.5
      },
      {
        "threshold": 42,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 19,
        "points": 2.5
      },
      {
        "threshold": 20,
        "points": 3
      },
      {
        "threshold": 21,
        "points": 3.5
      },
      {
        "threshold": 22,
        "points": 4
      },
      {
        "threshold": 23,
        "points": 4.5
      },
      {
        "threshold": 24,
        "points": 5
      },
      {
        "threshold": 25,
        "points": 5.5
      },
      {
        "threshold": 26,
        "points": 6
      },
      {
        "threshold": 27,
        "points": 6.5
      },
      {
        "threshold": 28,
        "points": 7
      },
      {
        "threshold": 29,
        "points": 7.5
      },
      {
        "threshold": 30,
        "points": 8
      },
      {
        "threshold": 31,
        "points": 8.5
      },
      {
        "threshold": 32,
        "points": 9
      },
      {
        "threshold": 33,
        "points": 9.5
      },
      {
        "threshold": 34,
        "points": 10
      },
      {
        "threshold": 35,
        "points": 10.5
      },
      {
        "threshold": 36,
        "points": 11
      },
      {
        "threshold": 37,
        "points": 11.5
      },
      {
        "threshold": 38,
        "points": 12
      },
      {
        "threshold": 39,
        "points": 12.5
      },
      {
        "threshold": 40,
        "points": 13
      },
      {
        "threshold": 41,
        "points": 13.5
      },
      {
        "threshold": 42,
        "points": 14
      },
      {
        "threshold": 43,
        "points": 14.5
      },
      {
        "threshold": 44,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 55,
        "points": 2.5
      },
      {
        "threshold": 60,
        "points": 3
      },
      {
        "threshold": 65,
        "points": 3.5
      },
      {
        "threshold": 70,
        "points": 4
      },
      {
        "threshold": 75,
        "points": 4.5
      },
      {
        "threshold": 80,
        "points": 5
      },
      {
        "threshold": 85,
        "points": 5.5
      },
      {
        "threshold": 90,
        "points": 6
      },
      {
        "threshold": 95,
        "points": 6.5
      },
      {
        "threshold": 100,
        "points": 7
      },
      {
        "threshold": 105,
        "points": 7.5
      },
      {
        "threshold": 110,
        "points": 8
      },
      {
        "threshold": 115,
        "points": 8.5
      },
      {
        "threshold": 120,
        "points": 9
      },
      {
        "threshold": 125,
        "points": 9.5
      },
      {
        "threshold": 130,
        "points": 10
      },
      {
        "threshold": 135,
        "points": 10.5
      },
      {
        "threshold": 140,
        "points": 11
      },
      {
        "threshold": 145,
        "points": 11.5
      },
      {
        "threshold": 150,
        "points": 12
      },
      {
        "threshold": 155,
        "points": 12.5
      },
      {
        "threshold": 160,
        "points": 13
      },
      {
        "threshold": 165,
        "points": 13.5
      },
      {
        "threshold": 170,
        "points": 14
      },
      {
        "threshold": 175,
        "points": 14.5
      },
      {
        "threshold": 180,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 1018,
        "points": 50
      },
      {
        "threshold": 1039,
        "points": 49.5
      },
      {
        "threshold": 1060,
        "points": 49
      },
      {
        "threshold": 1081,
        "points": 48
      },
      {
        "threshold": 1102,
        "points": 47
      },
      {
        "threshold": 1124,
        "points": 46
      },
      {
        "threshold": 1145,
        "points": 45
      },
      {
        "threshold": 1166,
        "points": 44
      },
      {
        "threshold": 1187,
        "points": 43
      },
      {
        "threshold": 1208,
        "points": 42
      },
      {
        "threshold": 1229,
        "points": 41
      },
      {
        "threshold": 1250,
        "points": 40
      },
      {
        "threshold": 1271,
        "points": 39
      },
      {
        "threshold": 1292,
        "points": 38.5
      },
      {
        "threshold": 1313,
        "points": 38
      },
      {
        "threshold": 1335,
        "points": 37.5
      },
      {
        "threshold": 1347,
        "points": 37
      },
      {
        "threshold": 1356,
        "points": 36.5
      },
      {
        "threshold": 1398,
        "points": 36
      },
      {
        "threshold": 1419,
        "points": 35.5
      },
      {
        "threshold": 1440,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 26,
        "points": 35
      },
      {
        "threshold": 27,
        "points": 35.5
      },
      {
        "threshold": 28,
        "points": 36
      },
      {
        "threshold": 30,
        "points": 36.5
      },
      {
        "threshold": 31,
        "points": 37
      },
      {
        "threshold": 33,
        "points": 37.5
      },
      {
        "threshold": 34,
        "points": 38
      },
      {
        "threshold": 36,
        "points": 38.5
      },
      {
        "threshold": 38,
        "points": 39
      },
      {
        "threshold": 39,
        "points": 40
      },
      {
        "threshold": 41,
        "points": 41
      },
      {
        "threshold": 43,
        "points": 42
      },
      {
        "threshold": 45,
        "points": 43
      },
      {
        "threshold": 47,
        "points": 44
      },
      {
        "threshold": 49,
        "points": 45
      },
      {
        "threshold": 52,
        "points": 46
      },
      {
        "threshold": 54,
        "points": 47
      },
      {
        "threshold": 56,
        "points": 48
      },
      {
        "threshold": 59,
        "points": 49
      },
      {
        "threshold": 62,
        "points": 49.5
      },
      {
        "threshold": 65,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  },
  "female|60-plus": {
    "pushups": [
      {
        "threshold": 3,
        "points": 2.5
      },
      {
        "threshold": 4,
        "points": 3
      },
      {
        "threshold": 5,
        "points": 3.5
      },
      {
        "threshold": 6,
        "points": 4
      },
      {
        "threshold": 7,
        "points": 4.5
      },
      {
        "threshold": 8,
        "points": 5
      },
      {
        "threshold": 9,
        "points": 5.5
      },
      {
        "threshold": 10,
        "points": 6
      },
      {
        "threshold": 11,
        "points": 6.5
      },
      {
        "threshold": 12,
        "points": 7
      },
      {
        "threshold": 13,
        "points": 7.5
      },
      {
        "threshold": 14,
        "points": 8
      },
      {
        "threshold": 15,
        "points": 8.5
      },
      {
        "threshold": 16,
        "points": 9
      },
      {
        "threshold": 17,
        "points": 9.5
      },
      {
        "threshold": 18,
        "points": 10
      },
      {
        "threshold": 19,
        "points": 10.5
      },
      {
        "threshold": 20,
        "points": 11
      },
      {
        "threshold": 21,
        "points": 11.5
      },
      {
        "threshold": 22,
        "points": 12
      },
      {
        "threshold": 23,
        "points": 12.5
      },
      {
        "threshold": 24,
        "points": 13
      },
      {
        "threshold": 25,
        "points": 13.5
      },
      {
        "threshold": 26,
        "points": 14
      },
      {
        "threshold": 27,
        "points": 14.5
      },
      {
        "threshold": 28,
        "points": 15
      }
    ],
    "hrPushups": [
      {
        "threshold": 1,
        "points": 2.5
      },
      {
        "threshold": 2,
        "points": 3
      },
      {
        "threshold": 3,
        "points": 3.5
      },
      {
        "threshold": 4,
        "points": 4
      },
      {
        "threshold": 5,
        "points": 4.5
      },
      {
        "threshold": 6,
        "points": 5
      },
      {
        "threshold": 7,
        "points": 5.5
      },
      {
        "threshold": 8,
        "points": 6
      },
      {
        "threshold": 9,
        "points": 6.5
      },
      {
        "threshold": 10,
        "points": 7
      },
      {
        "threshold": 11,
        "points": 7.5
      },
      {
        "threshold": 12,
        "points": 8
      },
      {
        "threshold": 13,
        "points": 8.5
      },
      {
        "threshold": 14,
        "points": 9
      },
      {
        "threshold": 15,
        "points": 9.5
      },
      {
        "threshold": 16,
        "points": 10
      },
      {
        "threshold": 17,
        "points": 10.5
      },
      {
        "threshold": 18,
        "points": 11
      },
      {
        "threshold": 19,
        "points": 11.5
      },
      {
        "threshold": 20,
        "points": 12
      },
      {
        "threshold": 21,
        "points": 12.5
      },
      {
        "threshold": 22,
        "points": 13
      },
      {
        "threshold": 23,
        "points": 13.5
      },
      {
        "threshold": 24,
        "points": 14
      },
      {
        "threshold": 25,
        "points": 14.5
      },
      {
        "threshold": 26,
        "points": 15
      }
    ],
    "situps": [
      {
        "threshold": 6,
        "points": 2.5
      },
      {
        "threshold": 7,
        "points": 3
      },
      {
        "threshold": 8,
        "points": 3.5
      },
      {
        "threshold": 9,
        "points": 4
      },
      {
        "threshold": 10,
        "points": 4.5
      },
      {
        "threshold": 11,
        "points": 5
      },
      {
        "threshold": 12,
        "points": 5.5
      },
      {
        "threshold": 13,
        "points": 6
      },
      {
        "threshold": 14,
        "points": 6.5
      },
      {
        "threshold": 15,
        "points": 7
      },
      {
        "threshold": 16,
        "points": 7.5
      },
      {
        "threshold": 17,
        "points": 8
      },
      {
        "threshold": 18,
        "points": 8.5
      },
      {
        "threshold": 19,
        "points": 9
      },
      {
        "threshold": 20,
        "points": 9.5
      },
      {
        "threshold": 21,
        "points": 10
      },
      {
        "threshold": 22,
        "points": 10.5
      },
      {
        "threshold": 23,
        "points": 11
      },
      {
        "threshold": 24,
        "points": 11.5
      },
      {
        "threshold": 25,
        "points": 12
      },
      {
        "threshold": 26,
        "points": 12.5
      },
      {
        "threshold": 27,
        "points": 13
      },
      {
        "threshold": 28,
        "points": 13.5
      },
      {
        "threshold": 29,
        "points": 14
      },
      {
        "threshold": 30,
        "points": 14.5
      },
      {
        "threshold": 31,
        "points": 15
      }
    ],
    "crunch": [
      {
        "threshold": 17,
        "points": 2.5
      },
      {
        "threshold": 18,
        "points": 3
      },
      {
        "threshold": 19,
        "points": 3.5
      },
      {
        "threshold": 20,
        "points": 4
      },
      {
        "threshold": 21,
        "points": 4.5
      },
      {
        "threshold": 22,
        "points": 5
      },
      {
        "threshold": 23,
        "points": 5.5
      },
      {
        "threshold": 24,
        "points": 6
      },
      {
        "threshold": 25,
        "points": 6.5
      },
      {
        "threshold": 26,
        "points": 7
      },
      {
        "threshold": 27,
        "points": 7.5
      },
      {
        "threshold": 28,
        "points": 8
      },
      {
        "threshold": 29,
        "points": 8.5
      },
      {
        "threshold": 30,
        "points": 9
      },
      {
        "threshold": 31,
        "points": 9.5
      },
      {
        "threshold": 32,
        "points": 10
      },
      {
        "threshold": 33,
        "points": 10.5
      },
      {
        "threshold": 34,
        "points": 11
      },
      {
        "threshold": 35,
        "points": 11.5
      },
      {
        "threshold": 36,
        "points": 12
      },
      {
        "threshold": 37,
        "points": 12.5
      },
      {
        "threshold": 38,
        "points": 13
      },
      {
        "threshold": 39,
        "points": 13.5
      },
      {
        "threshold": 40,
        "points": 14
      },
      {
        "threshold": 41,
        "points": 14.5
      },
      {
        "threshold": 42,
        "points": 15
      }
    ],
    "plank": [
      {
        "threshold": 50,
        "points": 2.5
      },
      {
        "threshold": 55,
        "points": 3
      },
      {
        "threshold": 60,
        "points": 3.5
      },
      {
        "threshold": 65,
        "points": 4
      },
      {
        "threshold": 70,
        "points": 4.5
      },
      {
        "threshold": 75,
        "points": 5
      },
      {
        "threshold": 80,
        "points": 5.5
      },
      {
        "threshold": 85,
        "points": 6
      },
      {
        "threshold": 90,
        "points": 6.5
      },
      {
        "threshold": 95,
        "points": 7
      },
      {
        "threshold": 100,
        "points": 7.5
      },
      {
        "threshold": 105,
        "points": 8
      },
      {
        "threshold": 110,
        "points": 8.5
      },
      {
        "threshold": 115,
        "points": 9
      },
      {
        "threshold": 120,
        "points": 9.5
      },
      {
        "threshold": 125,
        "points": 10
      },
      {
        "threshold": 130,
        "points": 10.5
      },
      {
        "threshold": 135,
        "points": 11
      },
      {
        "threshold": 140,
        "points": 11.5
      },
      {
        "threshold": 145,
        "points": 12
      },
      {
        "threshold": 150,
        "points": 12.5
      },
      {
        "threshold": 155,
        "points": 13
      },
      {
        "threshold": 160,
        "points": 13.5
      },
      {
        "threshold": 165,
        "points": 14
      },
      {
        "threshold": 170,
        "points": 14.5
      },
      {
        "threshold": 175,
        "points": 15
      }
    ],
    "run": [
      {
        "threshold": 1100,
        "points": 50
      },
      {
        "threshold": 1134,
        "points": 49.5
      },
      {
        "threshold": 1168,
        "points": 49
      },
      {
        "threshold": 1202,
        "points": 48
      },
      {
        "threshold": 1236,
        "points": 47
      },
      {
        "threshold": 1270,
        "points": 46
      },
      {
        "threshold": 1304,
        "points": 45
      },
      {
        "threshold": 1338,
        "points": 44
      },
      {
        "threshold": 1372,
        "points": 43
      },
      {
        "threshold": 1406,
        "points": 42
      },
      {
        "threshold": 1440,
        "points": 41
      },
      {
        "threshold": 1474,
        "points": 40
      },
      {
        "threshold": 1508,
        "points": 39
      },
      {
        "threshold": 1542,
        "points": 38.5
      },
      {
        "threshold": 1576,
        "points": 38
      },
      {
        "threshold": 1610,
        "points": 37.5
      },
      {
        "threshold": 1644,
        "points": 37
      },
      {
        "threshold": 1678,
        "points": 36.5
      },
      {
        "threshold": 1712,
        "points": 36
      },
      {
        "threshold": 1746,
        "points": 35.5
      },
      {
        "threshold": 1780,
        "points": 35
      }
    ],
    "hamr": [
      {
        "threshold": 11,
        "points": 35
      },
      {
        "threshold": 12,
        "points": 35.5
      },
      {
        "threshold": 13,
        "points": 36
      },
      {
        "threshold": 14,
        "points": 36.5
      },
      {
        "threshold": 17,
        "points": 37
      },
      {
        "threshold": 18,
        "points": 37.5
      },
      {
        "threshold": 19,
        "points": 38
      },
      {
        "threshold": 20,
        "points": 38.5
      },
      {
        "threshold": 22,
        "points": 39
      },
      {
        "threshold": 24,
        "points": 40
      },
      {
        "threshold": 26,
        "points": 41
      },
      {
        "threshold": 27,
        "points": 42
      },
      {
        "threshold": 29,
        "points": 43
      },
      {
        "threshold": 32,
        "points": 44
      },
      {
        "threshold": 34,
        "points": 45
      },
      {
        "threshold": 36,
        "points": 46
      },
      {
        "threshold": 38,
        "points": 47
      },
      {
        "threshold": 41,
        "points": 48
      },
      {
        "threshold": 44,
        "points": 49
      },
      {
        "threshold": 47,
        "points": 49.5
      },
      {
        "threshold": 50,
        "points": 50
      }
    ],
    "whtr": [
      {
        "threshold": 0.49,
        "points": 20
      },
      {
        "threshold": 0.5,
        "points": 19
      },
      {
        "threshold": 0.51,
        "points": 18
      },
      {
        "threshold": 0.52,
        "points": 17
      },
      {
        "threshold": 0.53,
        "points": 16
      },
      {
        "threshold": 0.54,
        "points": 15
      },
      {
        "threshold": 0.55,
        "points": 12.5
      },
      {
        "threshold": 0.56,
        "points": 10
      },
      {
        "threshold": 0.57,
        "points": 7.5
      },
      {
        "threshold": 0.58,
        "points": 5
      },
      {
        "threshold": 0.59,
        "points": 2.5
      },
      {
        "threshold": 0.6,
        "points": 0
      }
    ]
  }
}
