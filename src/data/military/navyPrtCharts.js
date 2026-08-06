/**
 * Official Navy PRT standards — altitudes less than 5,000 ft.
 * Source: MyNavy HR Physical Readiness Program Operating Guide 5
 * (Physical Readiness Test), Table 4-1, January 2024.
 *
 * Encoded fields used by KinesoScore: push-ups, forearm plank, 1.5-mile run.
 * Alternate cardio modalities are not scored until encoded separately.
 *
 * Do not edit thresholds without verifying against the official guide.
 */

export const NAVY_PRT_SOURCE = {
  name: 'Navy PRT Guide 5 (Table 4-1, Jan 2024)',
  detail:
    'Physical Readiness Test standards for altitudes less than 5,000 feet from the official MyNavy HR Physical Readiness Program Operating Guide 5. Overall score is the average of push-ups, forearm plank, and 1.5-mile run event points. Meeting less than the Probationary minimum on any event is a failure.',
  url: 'https://www.mynavyhr.navy.mil/Support-Services/Culture-Resilience/Physical-Readiness/',
}

/** @type {Record<string, { pushups: {threshold:number,points:number}[], plank: {threshold:number,points:number}[], run: {threshold:number,points:number}[] }>} */
export const NAVY_PRT_CHARTS = {
  "male|17-19": {
    "pushups": [
      {
        "threshold": 42,
        "points": 45
      },
      {
        "threshold": 46,
        "points": 50
      },
      {
        "threshold": 49,
        "points": 55
      },
      {
        "threshold": 51,
        "points": 60
      },
      {
        "threshold": 60,
        "points": 65
      },
      {
        "threshold": 68,
        "points": 70
      },
      {
        "threshold": 76,
        "points": 75
      },
      {
        "threshold": 79,
        "points": 80
      },
      {
        "threshold": 82,
        "points": 85
      },
      {
        "threshold": 86,
        "points": 90
      },
      {
        "threshold": 91,
        "points": 95
      },
      {
        "threshold": 92,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 71,
        "points": 45
      },
      {
        "threshold": 82,
        "points": 50
      },
      {
        "threshold": 92,
        "points": 55
      },
      {
        "threshold": 102,
        "points": 60
      },
      {
        "threshold": 122,
        "points": 65
      },
      {
        "threshold": 143,
        "points": 70
      },
      {
        "threshold": 163,
        "points": 75
      },
      {
        "threshold": 173,
        "points": 80
      },
      {
        "threshold": 184,
        "points": 85
      },
      {
        "threshold": 194,
        "points": 90
      },
      {
        "threshold": 199,
        "points": 95
      },
      {
        "threshold": 204,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 495,
        "points": 100
      },
      {
        "threshold": 525,
        "points": 95
      },
      {
        "threshold": 540,
        "points": 90
      },
      {
        "threshold": 555,
        "points": 85
      },
      {
        "threshold": 570,
        "points": 80
      },
      {
        "threshold": 585,
        "points": 75
      },
      {
        "threshold": 600,
        "points": 70
      },
      {
        "threshold": 630,
        "points": 65
      },
      {
        "threshold": 660,
        "points": 60
      },
      {
        "threshold": 720,
        "points": 55
      },
      {
        "threshold": 735,
        "points": 50
      },
      {
        "threshold": 765,
        "points": 45
      }
    ]
  },
  "female|17-19": {
    "pushups": [
      {
        "threshold": 19,
        "points": 45
      },
      {
        "threshold": 20,
        "points": 50
      },
      {
        "threshold": 22,
        "points": 55
      },
      {
        "threshold": 24,
        "points": 60
      },
      {
        "threshold": 30,
        "points": 65
      },
      {
        "threshold": 36,
        "points": 70
      },
      {
        "threshold": 42,
        "points": 75
      },
      {
        "threshold": 43,
        "points": 80
      },
      {
        "threshold": 45,
        "points": 85
      },
      {
        "threshold": 47,
        "points": 90
      },
      {
        "threshold": 50,
        "points": 95
      },
      {
        "threshold": 51,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 61,
        "points": 45
      },
      {
        "threshold": 71,
        "points": 50
      },
      {
        "threshold": 82,
        "points": 55
      },
      {
        "threshold": 92,
        "points": 60
      },
      {
        "threshold": 112,
        "points": 65
      },
      {
        "threshold": 133,
        "points": 70
      },
      {
        "threshold": 153,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 80
      },
      {
        "threshold": 173,
        "points": 85
      },
      {
        "threshold": 184,
        "points": 90
      },
      {
        "threshold": 189,
        "points": 95
      },
      {
        "threshold": 194,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 569,
        "points": 100
      },
      {
        "threshold": 675,
        "points": 95
      },
      {
        "threshold": 690,
        "points": 90
      },
      {
        "threshold": 705,
        "points": 85
      },
      {
        "threshold": 720,
        "points": 80
      },
      {
        "threshold": 750,
        "points": 75
      },
      {
        "threshold": 765,
        "points": 70
      },
      {
        "threshold": 780,
        "points": 65
      },
      {
        "threshold": 810,
        "points": 60
      },
      {
        "threshold": 855,
        "points": 55
      },
      {
        "threshold": 885,
        "points": 50
      },
      {
        "threshold": 900,
        "points": 45
      }
    ]
  },
  "male|20-24": {
    "pushups": [
      {
        "threshold": 37,
        "points": 45
      },
      {
        "threshold": 42,
        "points": 50
      },
      {
        "threshold": 45,
        "points": 55
      },
      {
        "threshold": 47,
        "points": 60
      },
      {
        "threshold": 55,
        "points": 65
      },
      {
        "threshold": 64,
        "points": 70
      },
      {
        "threshold": 71,
        "points": 75
      },
      {
        "threshold": 74,
        "points": 80
      },
      {
        "threshold": 77,
        "points": 85
      },
      {
        "threshold": 81,
        "points": 90
      },
      {
        "threshold": 86,
        "points": 95
      },
      {
        "threshold": 87,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 45
      },
      {
        "threshold": 80,
        "points": 50
      },
      {
        "threshold": 90,
        "points": 55
      },
      {
        "threshold": 100,
        "points": 60
      },
      {
        "threshold": 120,
        "points": 65
      },
      {
        "threshold": 140,
        "points": 70
      },
      {
        "threshold": 160,
        "points": 75
      },
      {
        "threshold": 170,
        "points": 80
      },
      {
        "threshold": 180,
        "points": 85
      },
      {
        "threshold": 190,
        "points": 90
      },
      {
        "threshold": 195,
        "points": 95
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 510,
        "points": 100
      },
      {
        "threshold": 540,
        "points": 95
      },
      {
        "threshold": 555,
        "points": 90
      },
      {
        "threshold": 585,
        "points": 85
      },
      {
        "threshold": 600,
        "points": 80
      },
      {
        "threshold": 630,
        "points": 75
      },
      {
        "threshold": 645,
        "points": 70
      },
      {
        "threshold": 690,
        "points": 65
      },
      {
        "threshold": 720,
        "points": 60
      },
      {
        "threshold": 765,
        "points": 55
      },
      {
        "threshold": 795,
        "points": 50
      },
      {
        "threshold": 810,
        "points": 45
      }
    ]
  },
  "female|20-24": {
    "pushups": [
      {
        "threshold": 16,
        "points": 45
      },
      {
        "threshold": 17,
        "points": 50
      },
      {
        "threshold": 20,
        "points": 55
      },
      {
        "threshold": 21,
        "points": 60
      },
      {
        "threshold": 28,
        "points": 65
      },
      {
        "threshold": 33,
        "points": 70
      },
      {
        "threshold": 39,
        "points": 75
      },
      {
        "threshold": 40,
        "points": 80
      },
      {
        "threshold": 43,
        "points": 85
      },
      {
        "threshold": 44,
        "points": 90
      },
      {
        "threshold": 47,
        "points": 95
      },
      {
        "threshold": 48,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 60,
        "points": 45
      },
      {
        "threshold": 70,
        "points": 50
      },
      {
        "threshold": 80,
        "points": 55
      },
      {
        "threshold": 90,
        "points": 60
      },
      {
        "threshold": 110,
        "points": 65
      },
      {
        "threshold": 130,
        "points": 70
      },
      {
        "threshold": 150,
        "points": 75
      },
      {
        "threshold": 160,
        "points": 80
      },
      {
        "threshold": 170,
        "points": 85
      },
      {
        "threshold": 180,
        "points": 90
      },
      {
        "threshold": 185,
        "points": 95
      },
      {
        "threshold": 190,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 587,
        "points": 100
      },
      {
        "threshold": 675,
        "points": 95
      },
      {
        "threshold": 690,
        "points": 90
      },
      {
        "threshold": 735,
        "points": 85
      },
      {
        "threshold": 765,
        "points": 80
      },
      {
        "threshold": 795,
        "points": 75
      },
      {
        "threshold": 810,
        "points": 70
      },
      {
        "threshold": 825,
        "points": 65
      },
      {
        "threshold": 855,
        "points": 60
      },
      {
        "threshold": 900,
        "points": 55
      },
      {
        "threshold": 915,
        "points": 50
      },
      {
        "threshold": 930,
        "points": 45
      }
    ]
  },
  "male|25-29": {
    "pushups": [
      {
        "threshold": 34,
        "points": 45
      },
      {
        "threshold": 38,
        "points": 50
      },
      {
        "threshold": 41,
        "points": 55
      },
      {
        "threshold": 44,
        "points": 60
      },
      {
        "threshold": 51,
        "points": 65
      },
      {
        "threshold": 60,
        "points": 70
      },
      {
        "threshold": 67,
        "points": 75
      },
      {
        "threshold": 69,
        "points": 80
      },
      {
        "threshold": 73,
        "points": 85
      },
      {
        "threshold": 77,
        "points": 90
      },
      {
        "threshold": 82,
        "points": 95
      },
      {
        "threshold": 84,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 69,
        "points": 45
      },
      {
        "threshold": 78,
        "points": 50
      },
      {
        "threshold": 88,
        "points": 55
      },
      {
        "threshold": 98,
        "points": 60
      },
      {
        "threshold": 118,
        "points": 65
      },
      {
        "threshold": 137,
        "points": 70
      },
      {
        "threshold": 157,
        "points": 75
      },
      {
        "threshold": 167,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 85
      },
      {
        "threshold": 186,
        "points": 90
      },
      {
        "threshold": 191,
        "points": 95
      },
      {
        "threshold": 196,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 535,
        "points": 100
      },
      {
        "threshold": 563,
        "points": 95
      },
      {
        "threshold": 578,
        "points": 90
      },
      {
        "threshold": 615,
        "points": 85
      },
      {
        "threshold": 630,
        "points": 80
      },
      {
        "threshold": 652,
        "points": 75
      },
      {
        "threshold": 683,
        "points": 70
      },
      {
        "threshold": 735,
        "points": 65
      },
      {
        "threshold": 773,
        "points": 60
      },
      {
        "threshold": 803,
        "points": 55
      },
      {
        "threshold": 825,
        "points": 50
      },
      {
        "threshold": 840,
        "points": 45
      }
    ]
  },
  "female|25-29": {
    "pushups": [
      {
        "threshold": 13,
        "points": 45
      },
      {
        "threshold": 15,
        "points": 50
      },
      {
        "threshold": 18,
        "points": 55
      },
      {
        "threshold": 19,
        "points": 60
      },
      {
        "threshold": 26,
        "points": 65
      },
      {
        "threshold": 30,
        "points": 70
      },
      {
        "threshold": 37,
        "points": 75
      },
      {
        "threshold": 39,
        "points": 80
      },
      {
        "threshold": 41,
        "points": 85
      },
      {
        "threshold": 43,
        "points": 90
      },
      {
        "threshold": 45,
        "points": 95
      },
      {
        "threshold": 46,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 59,
        "points": 45
      },
      {
        "threshold": 69,
        "points": 50
      },
      {
        "threshold": 78,
        "points": 55
      },
      {
        "threshold": 88,
        "points": 60
      },
      {
        "threshold": 108,
        "points": 65
      },
      {
        "threshold": 127,
        "points": 70
      },
      {
        "threshold": 147,
        "points": 75
      },
      {
        "threshold": 157,
        "points": 80
      },
      {
        "threshold": 167,
        "points": 85
      },
      {
        "threshold": 176,
        "points": 90
      },
      {
        "threshold": 181,
        "points": 95
      },
      {
        "threshold": 186,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 617,
        "points": 100
      },
      {
        "threshold": 690,
        "points": 95
      },
      {
        "threshold": 705,
        "points": 90
      },
      {
        "threshold": 750,
        "points": 85
      },
      {
        "threshold": 780,
        "points": 80
      },
      {
        "threshold": 803,
        "points": 75
      },
      {
        "threshold": 840,
        "points": 70
      },
      {
        "threshold": 870,
        "points": 65
      },
      {
        "threshold": 893,
        "points": 60
      },
      {
        "threshold": 923,
        "points": 55
      },
      {
        "threshold": 945,
        "points": 50
      },
      {
        "threshold": 968,
        "points": 45
      }
    ]
  },
  "male|30-34": {
    "pushups": [
      {
        "threshold": 31,
        "points": 45
      },
      {
        "threshold": 35,
        "points": 50
      },
      {
        "threshold": 38,
        "points": 55
      },
      {
        "threshold": 41,
        "points": 60
      },
      {
        "threshold": 48,
        "points": 65
      },
      {
        "threshold": 57,
        "points": 70
      },
      {
        "threshold": 64,
        "points": 75
      },
      {
        "threshold": 67,
        "points": 80
      },
      {
        "threshold": 69,
        "points": 85
      },
      {
        "threshold": 74,
        "points": 90
      },
      {
        "threshold": 78,
        "points": 95
      },
      {
        "threshold": 80,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 67,
        "points": 45
      },
      {
        "threshold": 77,
        "points": 50
      },
      {
        "threshold": 86,
        "points": 55
      },
      {
        "threshold": 96,
        "points": 60
      },
      {
        "threshold": 115,
        "points": 65
      },
      {
        "threshold": 134,
        "points": 70
      },
      {
        "threshold": 154,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 80
      },
      {
        "threshold": 173,
        "points": 85
      },
      {
        "threshold": 182,
        "points": 90
      },
      {
        "threshold": 187,
        "points": 95
      },
      {
        "threshold": 192,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 560,
        "points": 100
      },
      {
        "threshold": 585,
        "points": 95
      },
      {
        "threshold": 600,
        "points": 90
      },
      {
        "threshold": 630,
        "points": 85
      },
      {
        "threshold": 660,
        "points": 80
      },
      {
        "threshold": 675,
        "points": 75
      },
      {
        "threshold": 720,
        "points": 70
      },
      {
        "threshold": 780,
        "points": 65
      },
      {
        "threshold": 825,
        "points": 60
      },
      {
        "threshold": 840,
        "points": 55
      },
      {
        "threshold": 855,
        "points": 50
      },
      {
        "threshold": 870,
        "points": 45
      }
    ]
  },
  "female|30-34": {
    "pushups": [
      {
        "threshold": 11,
        "points": 45
      },
      {
        "threshold": 13,
        "points": 50
      },
      {
        "threshold": 15,
        "points": 55
      },
      {
        "threshold": 17,
        "points": 60
      },
      {
        "threshold": 24,
        "points": 65
      },
      {
        "threshold": 28,
        "points": 70
      },
      {
        "threshold": 35,
        "points": 75
      },
      {
        "threshold": 37,
        "points": 80
      },
      {
        "threshold": 39,
        "points": 85
      },
      {
        "threshold": 41,
        "points": 90
      },
      {
        "threshold": 43,
        "points": 95
      },
      {
        "threshold": 44,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 58,
        "points": 45
      },
      {
        "threshold": 67,
        "points": 50
      },
      {
        "threshold": 77,
        "points": 55
      },
      {
        "threshold": 86,
        "points": 60
      },
      {
        "threshold": 106,
        "points": 65
      },
      {
        "threshold": 125,
        "points": 70
      },
      {
        "threshold": 144,
        "points": 75
      },
      {
        "threshold": 154,
        "points": 80
      },
      {
        "threshold": 163,
        "points": 85
      },
      {
        "threshold": 173,
        "points": 90
      },
      {
        "threshold": 178,
        "points": 95
      },
      {
        "threshold": 182,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 646,
        "points": 100
      },
      {
        "threshold": 705,
        "points": 95
      },
      {
        "threshold": 720,
        "points": 90
      },
      {
        "threshold": 765,
        "points": 85
      },
      {
        "threshold": 795,
        "points": 80
      },
      {
        "threshold": 810,
        "points": 75
      },
      {
        "threshold": 870,
        "points": 70
      },
      {
        "threshold": 915,
        "points": 65
      },
      {
        "threshold": 930,
        "points": 60
      },
      {
        "threshold": 945,
        "points": 55
      },
      {
        "threshold": 975,
        "points": 50
      },
      {
        "threshold": 1005,
        "points": 45
      }
    ]
  },
  "male|35-39": {
    "pushups": [
      {
        "threshold": 27,
        "points": 45
      },
      {
        "threshold": 33,
        "points": 50
      },
      {
        "threshold": 35,
        "points": 55
      },
      {
        "threshold": 37,
        "points": 60
      },
      {
        "threshold": 44,
        "points": 65
      },
      {
        "threshold": 53,
        "points": 70
      },
      {
        "threshold": 60,
        "points": 75
      },
      {
        "threshold": 63,
        "points": 80
      },
      {
        "threshold": 65,
        "points": 85
      },
      {
        "threshold": 70,
        "points": 90
      },
      {
        "threshold": 74,
        "points": 95
      },
      {
        "threshold": 76,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 66,
        "points": 45
      },
      {
        "threshold": 75,
        "points": 50
      },
      {
        "threshold": 85,
        "points": 55
      },
      {
        "threshold": 94,
        "points": 60
      },
      {
        "threshold": 113,
        "points": 65
      },
      {
        "threshold": 132,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 75
      },
      {
        "threshold": 160,
        "points": 80
      },
      {
        "threshold": 169,
        "points": 85
      },
      {
        "threshold": 179,
        "points": 90
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 188,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 565,
        "points": 100
      },
      {
        "threshold": 593,
        "points": 95
      },
      {
        "threshold": 608,
        "points": 90
      },
      {
        "threshold": 638,
        "points": 85
      },
      {
        "threshold": 668,
        "points": 80
      },
      {
        "threshold": 683,
        "points": 75
      },
      {
        "threshold": 743,
        "points": 70
      },
      {
        "threshold": 803,
        "points": 65
      },
      {
        "threshold": 848,
        "points": 60
      },
      {
        "threshold": 863,
        "points": 55
      },
      {
        "threshold": 885,
        "points": 50
      },
      {
        "threshold": 900,
        "points": 45
      }
    ]
  },
  "female|35-39": {
    "pushups": [
      {
        "threshold": 9,
        "points": 45
      },
      {
        "threshold": 11,
        "points": 50
      },
      {
        "threshold": 13,
        "points": 55
      },
      {
        "threshold": 14,
        "points": 60
      },
      {
        "threshold": 22,
        "points": 65
      },
      {
        "threshold": 26,
        "points": 70
      },
      {
        "threshold": 34,
        "points": 75
      },
      {
        "threshold": 35,
        "points": 80
      },
      {
        "threshold": 37,
        "points": 85
      },
      {
        "threshold": 39,
        "points": 90
      },
      {
        "threshold": 42,
        "points": 95
      },
      {
        "threshold": 43,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 56,
        "points": 45
      },
      {
        "threshold": 66,
        "points": 50
      },
      {
        "threshold": 75,
        "points": 55
      },
      {
        "threshold": 85,
        "points": 60
      },
      {
        "threshold": 104,
        "points": 65
      },
      {
        "threshold": 122,
        "points": 70
      },
      {
        "threshold": 141,
        "points": 75
      },
      {
        "threshold": 151,
        "points": 80
      },
      {
        "threshold": 160,
        "points": 85
      },
      {
        "threshold": 169,
        "points": 90
      },
      {
        "threshold": 174,
        "points": 95
      },
      {
        "threshold": 179,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 651,
        "points": 100
      },
      {
        "threshold": 713,
        "points": 95
      },
      {
        "threshold": 728,
        "points": 90
      },
      {
        "threshold": 773,
        "points": 85
      },
      {
        "threshold": 803,
        "points": 80
      },
      {
        "threshold": 825,
        "points": 75
      },
      {
        "threshold": 878,
        "points": 70
      },
      {
        "threshold": 930,
        "points": 65
      },
      {
        "threshold": 953,
        "points": 60
      },
      {
        "threshold": 975,
        "points": 55
      },
      {
        "threshold": 998,
        "points": 50
      },
      {
        "threshold": 1020,
        "points": 45
      }
    ]
  },
  "male|40-44": {
    "pushups": [
      {
        "threshold": 24,
        "points": 45
      },
      {
        "threshold": 29,
        "points": 50
      },
      {
        "threshold": 32,
        "points": 55
      },
      {
        "threshold": 34,
        "points": 60
      },
      {
        "threshold": 41,
        "points": 65
      },
      {
        "threshold": 50,
        "points": 70
      },
      {
        "threshold": 56,
        "points": 75
      },
      {
        "threshold": 59,
        "points": 80
      },
      {
        "threshold": 61,
        "points": 85
      },
      {
        "threshold": 67,
        "points": 90
      },
      {
        "threshold": 70,
        "points": 95
      },
      {
        "threshold": 72,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 65,
        "points": 45
      },
      {
        "threshold": 74,
        "points": 50
      },
      {
        "threshold": 83,
        "points": 55
      },
      {
        "threshold": 92,
        "points": 60
      },
      {
        "threshold": 111,
        "points": 65
      },
      {
        "threshold": 129,
        "points": 70
      },
      {
        "threshold": 148,
        "points": 75
      },
      {
        "threshold": 157,
        "points": 80
      },
      {
        "threshold": 166,
        "points": 85
      },
      {
        "threshold": 175,
        "points": 90
      },
      {
        "threshold": 180,
        "points": 95
      },
      {
        "threshold": 184,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 570,
        "points": 100
      },
      {
        "threshold": 600,
        "points": 95
      },
      {
        "threshold": 615,
        "points": 90
      },
      {
        "threshold": 645,
        "points": 85
      },
      {
        "threshold": 675,
        "points": 80
      },
      {
        "threshold": 705,
        "points": 75
      },
      {
        "threshold": 765,
        "points": 70
      },
      {
        "threshold": 825,
        "points": 65
      },
      {
        "threshold": 870,
        "points": 60
      },
      {
        "threshold": 885,
        "points": 55
      },
      {
        "threshold": 915,
        "points": 50
      },
      {
        "threshold": 930,
        "points": 45
      }
    ]
  },
  "female|40-44": {
    "pushups": [
      {
        "threshold": 7,
        "points": 45
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 11,
        "points": 55
      },
      {
        "threshold": 12,
        "points": 60
      },
      {
        "threshold": 20,
        "points": 65
      },
      {
        "threshold": 24,
        "points": 70
      },
      {
        "threshold": 32,
        "points": 75
      },
      {
        "threshold": 33,
        "points": 80
      },
      {
        "threshold": 35,
        "points": 85
      },
      {
        "threshold": 37,
        "points": 90
      },
      {
        "threshold": 40,
        "points": 95
      },
      {
        "threshold": 41,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 55,
        "points": 45
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 74,
        "points": 55
      },
      {
        "threshold": 83,
        "points": 60
      },
      {
        "threshold": 101,
        "points": 65
      },
      {
        "threshold": 120,
        "points": 70
      },
      {
        "threshold": 138,
        "points": 75
      },
      {
        "threshold": 148,
        "points": 80
      },
      {
        "threshold": 157,
        "points": 85
      },
      {
        "threshold": 166,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 95
      },
      {
        "threshold": 175,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 656,
        "points": 100
      },
      {
        "threshold": 720,
        "points": 95
      },
      {
        "threshold": 735,
        "points": 90
      },
      {
        "threshold": 780,
        "points": 85
      },
      {
        "threshold": 810,
        "points": 80
      },
      {
        "threshold": 840,
        "points": 75
      },
      {
        "threshold": 885,
        "points": 70
      },
      {
        "threshold": 945,
        "points": 65
      },
      {
        "threshold": 975,
        "points": 60
      },
      {
        "threshold": 1005,
        "points": 55
      },
      {
        "threshold": 1020,
        "points": 50
      },
      {
        "threshold": 1035,
        "points": 45
      }
    ]
  },
  "male|45-49": {
    "pushups": [
      {
        "threshold": 21,
        "points": 45
      },
      {
        "threshold": 25,
        "points": 50
      },
      {
        "threshold": 28,
        "points": 55
      },
      {
        "threshold": 32,
        "points": 60
      },
      {
        "threshold": 37,
        "points": 65
      },
      {
        "threshold": 46,
        "points": 70
      },
      {
        "threshold": 52,
        "points": 75
      },
      {
        "threshold": 54,
        "points": 80
      },
      {
        "threshold": 57,
        "points": 85
      },
      {
        "threshold": 63,
        "points": 90
      },
      {
        "threshold": 66,
        "points": 95
      },
      {
        "threshold": 68,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 63,
        "points": 45
      },
      {
        "threshold": 72,
        "points": 50
      },
      {
        "threshold": 81,
        "points": 55
      },
      {
        "threshold": 90,
        "points": 60
      },
      {
        "threshold": 108,
        "points": 65
      },
      {
        "threshold": 127,
        "points": 70
      },
      {
        "threshold": 145,
        "points": 75
      },
      {
        "threshold": 154,
        "points": 80
      },
      {
        "threshold": 163,
        "points": 85
      },
      {
        "threshold": 172,
        "points": 90
      },
      {
        "threshold": 176,
        "points": 95
      },
      {
        "threshold": 181,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 573,
        "points": 100
      },
      {
        "threshold": 608,
        "points": 95
      },
      {
        "threshold": 630,
        "points": 90
      },
      {
        "threshold": 668,
        "points": 85
      },
      {
        "threshold": 698,
        "points": 80
      },
      {
        "threshold": 728,
        "points": 75
      },
      {
        "threshold": 780,
        "points": 70
      },
      {
        "threshold": 848,
        "points": 65
      },
      {
        "threshold": 893,
        "points": 60
      },
      {
        "threshold": 915,
        "points": 55
      },
      {
        "threshold": 945,
        "points": 50
      },
      {
        "threshold": 968,
        "points": 45
      }
    ]
  },
  "female|45-49": {
    "pushups": [
      {
        "threshold": 5,
        "points": 45
      },
      {
        "threshold": 7,
        "points": 50
      },
      {
        "threshold": 8,
        "points": 55
      },
      {
        "threshold": 11,
        "points": 60
      },
      {
        "threshold": 18,
        "points": 65
      },
      {
        "threshold": 22,
        "points": 70
      },
      {
        "threshold": 30,
        "points": 75
      },
      {
        "threshold": 32,
        "points": 80
      },
      {
        "threshold": 33,
        "points": 85
      },
      {
        "threshold": 35,
        "points": 90
      },
      {
        "threshold": 39,
        "points": 95
      },
      {
        "threshold": 40,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 54,
        "points": 45
      },
      {
        "threshold": 63,
        "points": 50
      },
      {
        "threshold": 72,
        "points": 55
      },
      {
        "threshold": 81,
        "points": 60
      },
      {
        "threshold": 99,
        "points": 65
      },
      {
        "threshold": 118,
        "points": 70
      },
      {
        "threshold": 136,
        "points": 75
      },
      {
        "threshold": 145,
        "points": 80
      },
      {
        "threshold": 154,
        "points": 85
      },
      {
        "threshold": 163,
        "points": 90
      },
      {
        "threshold": 167,
        "points": 95
      },
      {
        "threshold": 172,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 658,
        "points": 100
      },
      {
        "threshold": 728,
        "points": 95
      },
      {
        "threshold": 750,
        "points": 90
      },
      {
        "threshold": 795,
        "points": 85
      },
      {
        "threshold": 825,
        "points": 80
      },
      {
        "threshold": 848,
        "points": 75
      },
      {
        "threshold": 900,
        "points": 70
      },
      {
        "threshold": 953,
        "points": 65
      },
      {
        "threshold": 990,
        "points": 60
      },
      {
        "threshold": 1013,
        "points": 55
      },
      {
        "threshold": 1028,
        "points": 50
      },
      {
        "threshold": 1043,
        "points": 45
      }
    ]
  },
  "male|50-54": {
    "pushups": [
      {
        "threshold": 19,
        "points": 45
      },
      {
        "threshold": 23,
        "points": 50
      },
      {
        "threshold": 25,
        "points": 55
      },
      {
        "threshold": 30,
        "points": 60
      },
      {
        "threshold": 34,
        "points": 65
      },
      {
        "threshold": 43,
        "points": 70
      },
      {
        "threshold": 49,
        "points": 75
      },
      {
        "threshold": 51,
        "points": 80
      },
      {
        "threshold": 53,
        "points": 85
      },
      {
        "threshold": 59,
        "points": 90
      },
      {
        "threshold": 62,
        "points": 95
      },
      {
        "threshold": 64,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 62,
        "points": 45
      },
      {
        "threshold": 71,
        "points": 50
      },
      {
        "threshold": 80,
        "points": 55
      },
      {
        "threshold": 89,
        "points": 60
      },
      {
        "threshold": 106,
        "points": 65
      },
      {
        "threshold": 124,
        "points": 70
      },
      {
        "threshold": 142,
        "points": 75
      },
      {
        "threshold": 151,
        "points": 80
      },
      {
        "threshold": 159,
        "points": 85
      },
      {
        "threshold": 168,
        "points": 90
      },
      {
        "threshold": 173,
        "points": 95
      },
      {
        "threshold": 177,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 575,
        "points": 100
      },
      {
        "threshold": 615,
        "points": 95
      },
      {
        "threshold": 645,
        "points": 90
      },
      {
        "threshold": 690,
        "points": 85
      },
      {
        "threshold": 720,
        "points": 80
      },
      {
        "threshold": 750,
        "points": 75
      },
      {
        "threshold": 795,
        "points": 70
      },
      {
        "threshold": 870,
        "points": 65
      },
      {
        "threshold": 915,
        "points": 60
      },
      {
        "threshold": 945,
        "points": 55
      },
      {
        "threshold": 975,
        "points": 50
      },
      {
        "threshold": 1005,
        "points": 45
      }
    ]
  },
  "female|50-54": {
    "pushups": [
      {
        "threshold": 2,
        "points": 45
      },
      {
        "threshold": 5,
        "points": 50
      },
      {
        "threshold": 6,
        "points": 55
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 16,
        "points": 65
      },
      {
        "threshold": 20,
        "points": 70
      },
      {
        "threshold": 28,
        "points": 75
      },
      {
        "threshold": 30,
        "points": 80
      },
      {
        "threshold": 31,
        "points": 85
      },
      {
        "threshold": 33,
        "points": 90
      },
      {
        "threshold": 37,
        "points": 95
      },
      {
        "threshold": 38,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 53,
        "points": 45
      },
      {
        "threshold": 62,
        "points": 50
      },
      {
        "threshold": 71,
        "points": 55
      },
      {
        "threshold": 80,
        "points": 60
      },
      {
        "threshold": 97,
        "points": 65
      },
      {
        "threshold": 115,
        "points": 70
      },
      {
        "threshold": 133,
        "points": 75
      },
      {
        "threshold": 142,
        "points": 80
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 159,
        "points": 90
      },
      {
        "threshold": 164,
        "points": 95
      },
      {
        "threshold": 168,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 660,
        "points": 100
      },
      {
        "threshold": 735,
        "points": 95
      },
      {
        "threshold": 765,
        "points": 90
      },
      {
        "threshold": 810,
        "points": 85
      },
      {
        "threshold": 840,
        "points": 80
      },
      {
        "threshold": 855,
        "points": 75
      },
      {
        "threshold": 915,
        "points": 70
      },
      {
        "threshold": 960,
        "points": 65
      },
      {
        "threshold": 1005,
        "points": 60
      },
      {
        "threshold": 1020,
        "points": 55
      },
      {
        "threshold": 1035,
        "points": 50
      },
      {
        "threshold": 1050,
        "points": 45
      }
    ]
  },
  "male|55-59": {
    "pushups": [
      {
        "threshold": 10,
        "points": 45
      },
      {
        "threshold": 12,
        "points": 50
      },
      {
        "threshold": 14,
        "points": 55
      },
      {
        "threshold": 16,
        "points": 60
      },
      {
        "threshold": 32,
        "points": 65
      },
      {
        "threshold": 38,
        "points": 70
      },
      {
        "threshold": 46,
        "points": 75
      },
      {
        "threshold": 48,
        "points": 80
      },
      {
        "threshold": 52,
        "points": 85
      },
      {
        "threshold": 56,
        "points": 90
      },
      {
        "threshold": 59,
        "points": 95
      },
      {
        "threshold": 60,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 61,
        "points": 45
      },
      {
        "threshold": 69,
        "points": 50
      },
      {
        "threshold": 78,
        "points": 55
      },
      {
        "threshold": 87,
        "points": 60
      },
      {
        "threshold": 104,
        "points": 65
      },
      {
        "threshold": 122,
        "points": 70
      },
      {
        "threshold": 139,
        "points": 75
      },
      {
        "threshold": 148,
        "points": 80
      },
      {
        "threshold": 156,
        "points": 85
      },
      {
        "threshold": 165,
        "points": 90
      },
      {
        "threshold": 169,
        "points": 95
      },
      {
        "threshold": 174,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 642,
        "points": 100
      },
      {
        "threshold": 669,
        "points": 95
      },
      {
        "threshold": 685,
        "points": 90
      },
      {
        "threshold": 717,
        "points": 85
      },
      {
        "threshold": 749,
        "points": 80
      },
      {
        "threshold": 792,
        "points": 75
      },
      {
        "threshold": 853,
        "points": 70
      },
      {
        "threshold": 914,
        "points": 65
      },
      {
        "threshold": 975,
        "points": 60
      },
      {
        "threshold": 993,
        "points": 55
      },
      {
        "threshold": 1011,
        "points": 50
      },
      {
        "threshold": 1029,
        "points": 45
      }
    ]
  },
  "female|55-59": {
    "pushups": [
      {
        "threshold": 2,
        "points": 45
      },
      {
        "threshold": 3,
        "points": 50
      },
      {
        "threshold": 5,
        "points": 55
      },
      {
        "threshold": 6,
        "points": 60
      },
      {
        "threshold": 10,
        "points": 65
      },
      {
        "threshold": 16,
        "points": 70
      },
      {
        "threshold": 20,
        "points": 75
      },
      {
        "threshold": 22,
        "points": 80
      },
      {
        "threshold": 24,
        "points": 85
      },
      {
        "threshold": 26,
        "points": 90
      },
      {
        "threshold": 28,
        "points": 95
      },
      {
        "threshold": 30,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 52,
        "points": 45
      },
      {
        "threshold": 61,
        "points": 50
      },
      {
        "threshold": 69,
        "points": 55
      },
      {
        "threshold": 78,
        "points": 60
      },
      {
        "threshold": 95,
        "points": 65
      },
      {
        "threshold": 113,
        "points": 70
      },
      {
        "threshold": 130,
        "points": 75
      },
      {
        "threshold": 139,
        "points": 80
      },
      {
        "threshold": 148,
        "points": 85
      },
      {
        "threshold": 156,
        "points": 90
      },
      {
        "threshold": 161,
        "points": 95
      },
      {
        "threshold": 165,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 743,
        "points": 100
      },
      {
        "threshold": 819,
        "points": 95
      },
      {
        "threshold": 837,
        "points": 90
      },
      {
        "threshold": 865,
        "points": 85
      },
      {
        "threshold": 893,
        "points": 80
      },
      {
        "threshold": 920,
        "points": 75
      },
      {
        "threshold": 969,
        "points": 70
      },
      {
        "threshold": 1018,
        "points": 65
      },
      {
        "threshold": 1068,
        "points": 60
      },
      {
        "threshold": 1083,
        "points": 55
      },
      {
        "threshold": 1098,
        "points": 50
      },
      {
        "threshold": 1114,
        "points": 45
      }
    ]
  },
  "male|60-64": {
    "pushups": [
      {
        "threshold": 8,
        "points": 45
      },
      {
        "threshold": 10,
        "points": 50
      },
      {
        "threshold": 12,
        "points": 55
      },
      {
        "threshold": 14,
        "points": 60
      },
      {
        "threshold": 23,
        "points": 65
      },
      {
        "threshold": 32,
        "points": 70
      },
      {
        "threshold": 44,
        "points": 75
      },
      {
        "threshold": 46,
        "points": 80
      },
      {
        "threshold": 48,
        "points": 85
      },
      {
        "threshold": 52,
        "points": 90
      },
      {
        "threshold": 56,
        "points": 95
      },
      {
        "threshold": 57,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 60,
        "points": 45
      },
      {
        "threshold": 68,
        "points": 50
      },
      {
        "threshold": 77,
        "points": 55
      },
      {
        "threshold": 85,
        "points": 60
      },
      {
        "threshold": 102,
        "points": 65
      },
      {
        "threshold": 119,
        "points": 70
      },
      {
        "threshold": 136,
        "points": 75
      },
      {
        "threshold": 145,
        "points": 80
      },
      {
        "threshold": 153,
        "points": 85
      },
      {
        "threshold": 162,
        "points": 90
      },
      {
        "threshold": 166,
        "points": 95
      },
      {
        "threshold": 170,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 681,
        "points": 100
      },
      {
        "threshold": 708,
        "points": 95
      },
      {
        "threshold": 724,
        "points": 90
      },
      {
        "threshold": 760,
        "points": 85
      },
      {
        "threshold": 796,
        "points": 80
      },
      {
        "threshold": 833,
        "points": 75
      },
      {
        "threshold": 900,
        "points": 70
      },
      {
        "threshold": 967,
        "points": 65
      },
      {
        "threshold": 1034,
        "points": 60
      },
      {
        "threshold": 1067,
        "points": 55
      },
      {
        "threshold": 1100,
        "points": 50
      },
      {
        "threshold": 1132,
        "points": 45
      }
    ]
  },
  "female|60-64": {
    "pushups": [
      {
        "threshold": 2,
        "points": 45
      },
      {
        "threshold": 3,
        "points": 50
      },
      {
        "threshold": 4,
        "points": 55
      },
      {
        "threshold": 5,
        "points": 60
      },
      {
        "threshold": 8,
        "points": 65
      },
      {
        "threshold": 12,
        "points": 70
      },
      {
        "threshold": 16,
        "points": 75
      },
      {
        "threshold": 18,
        "points": 80
      },
      {
        "threshold": 20,
        "points": 85
      },
      {
        "threshold": 22,
        "points": 90
      },
      {
        "threshold": 24,
        "points": 95
      },
      {
        "threshold": 26,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 51,
        "points": 45
      },
      {
        "threshold": 60,
        "points": 50
      },
      {
        "threshold": 68,
        "points": 55
      },
      {
        "threshold": 77,
        "points": 60
      },
      {
        "threshold": 94,
        "points": 65
      },
      {
        "threshold": 111,
        "points": 70
      },
      {
        "threshold": 128,
        "points": 75
      },
      {
        "threshold": 136,
        "points": 80
      },
      {
        "threshold": 145,
        "points": 85
      },
      {
        "threshold": 153,
        "points": 90
      },
      {
        "threshold": 157,
        "points": 95
      },
      {
        "threshold": 162,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 814,
        "points": 100
      },
      {
        "threshold": 890,
        "points": 95
      },
      {
        "threshold": 908,
        "points": 90
      },
      {
        "threshold": 934,
        "points": 85
      },
      {
        "threshold": 960,
        "points": 80
      },
      {
        "threshold": 985,
        "points": 75
      },
      {
        "threshold": 1037,
        "points": 70
      },
      {
        "threshold": 1086,
        "points": 65
      },
      {
        "threshold": 1131,
        "points": 60
      },
      {
        "threshold": 1148,
        "points": 55
      },
      {
        "threshold": 1165,
        "points": 50
      },
      {
        "threshold": 1183,
        "points": 45
      }
    ]
  },
  "male|65-plus": {
    "pushups": [
      {
        "threshold": 4,
        "points": 45
      },
      {
        "threshold": 6,
        "points": 50
      },
      {
        "threshold": 8,
        "points": 55
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 18,
        "points": 65
      },
      {
        "threshold": 25,
        "points": 70
      },
      {
        "threshold": 36,
        "points": 75
      },
      {
        "threshold": 39,
        "points": 80
      },
      {
        "threshold": 41,
        "points": 85
      },
      {
        "threshold": 44,
        "points": 90
      },
      {
        "threshold": 46,
        "points": 95
      },
      {
        "threshold": 48,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 58,
        "points": 45
      },
      {
        "threshold": 67,
        "points": 50
      },
      {
        "threshold": 75,
        "points": 55
      },
      {
        "threshold": 83,
        "points": 60
      },
      {
        "threshold": 100,
        "points": 65
      },
      {
        "threshold": 117,
        "points": 70
      },
      {
        "threshold": 133,
        "points": 75
      },
      {
        "threshold": 142,
        "points": 80
      },
      {
        "threshold": 150,
        "points": 85
      },
      {
        "threshold": 158,
        "points": 90
      },
      {
        "threshold": 163,
        "points": 95
      },
      {
        "threshold": 167,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 701,
        "points": 100
      },
      {
        "threshold": 733,
        "points": 95
      },
      {
        "threshold": 763,
        "points": 90
      },
      {
        "threshold": 800,
        "points": 85
      },
      {
        "threshold": 837,
        "points": 80
      },
      {
        "threshold": 874,
        "points": 75
      },
      {
        "threshold": 947,
        "points": 70
      },
      {
        "threshold": 1020,
        "points": 65
      },
      {
        "threshold": 1093,
        "points": 60
      },
      {
        "threshold": 1140,
        "points": 55
      },
      {
        "threshold": 1187,
        "points": 50
      },
      {
        "threshold": 1235,
        "points": 45
      }
    ]
  },
  "female|65-plus": {
    "pushups": [
      {
        "threshold": 1,
        "points": 45
      },
      {
        "threshold": 2,
        "points": 50
      },
      {
        "threshold": 3,
        "points": 55
      },
      {
        "threshold": 4,
        "points": 60
      },
      {
        "threshold": 6,
        "points": 65
      },
      {
        "threshold": 9,
        "points": 70
      },
      {
        "threshold": 12,
        "points": 75
      },
      {
        "threshold": 14,
        "points": 80
      },
      {
        "threshold": 16,
        "points": 85
      },
      {
        "threshold": 18,
        "points": 90
      },
      {
        "threshold": 20,
        "points": 95
      },
      {
        "threshold": 22,
        "points": 100
      }
    ],
    "plank": [
      {
        "threshold": 50,
        "points": 45
      },
      {
        "threshold": 58,
        "points": 50
      },
      {
        "threshold": 67,
        "points": 55
      },
      {
        "threshold": 75,
        "points": 60
      },
      {
        "threshold": 92,
        "points": 65
      },
      {
        "threshold": 108,
        "points": 70
      },
      {
        "threshold": 125,
        "points": 75
      },
      {
        "threshold": 133,
        "points": 80
      },
      {
        "threshold": 142,
        "points": 85
      },
      {
        "threshold": 150,
        "points": 90
      },
      {
        "threshold": 154,
        "points": 95
      },
      {
        "threshold": 158,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 885,
        "points": 100
      },
      {
        "threshold": 961,
        "points": 95
      },
      {
        "threshold": 979,
        "points": 90
      },
      {
        "threshold": 1003,
        "points": 85
      },
      {
        "threshold": 1027,
        "points": 80
      },
      {
        "threshold": 1050,
        "points": 75
      },
      {
        "threshold": 1098,
        "points": 70
      },
      {
        "threshold": 1146,
        "points": 65
      },
      {
        "threshold": 1194,
        "points": 60
      },
      {
        "threshold": 1213,
        "points": 55
      },
      {
        "threshold": 1231,
        "points": 50
      },
      {
        "threshold": 1252,
        "points": 45
      }
    ]
  }
}
