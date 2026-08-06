/**
 * Official Marine Corps PFT scoring tables.
 * Sources:
 * - MCO 6100.13A w/ CH-2: Tables 2-1 (classification), 2-2 (pull-ups/push-ups), 2-5 (3-mile run)
 * - MCO 6100.13A CH-4 / HQMC Plank Scoring Table: Table 2-4 (plank max 3:45 / min 1:10)
 * https://www.fitness.marines.mil/
 *
 * Altitude-adjusted run tables and 5,000m row alternate are not encoded.
 */

export const MARINE_PFT_SOURCE = {
  name: 'MCO 6100.13A (w/ CH-4) PFT Tables',
  detail:
    'Official Marine Corps PFT scoring from MCO 6100.13A. Pull-ups/push-ups and 3-mile run use age- and gender-specific tables; plank uses the gender- and age-neutral CH-4 scale (3:45 max / 1:10 min). Push-ups are capped at 70 points. Pass requires at least the event minimum and a total of 150 points.',
  url: 'https://www.fitness.marines.mil/PFT-CFT_Standards17/',
}

export const MARINE_PFT_CLASSIFICATION = [
  { id: '1st', label: '1st Class', min: 235, max: 300 },
  { id: '2nd', label: '2nd Class', min: 200, max: 234 },
  { id: '3rd', label: '3rd Class', min: 150, max: 199 },
]

/** @type {Record<string, { pullups: {threshold:number,points:number}[], pushups: {threshold:number,points:number}[], plank: {threshold:number,points:number}[], run: {threshold:number,points:number}[] }>} */
export const MARINE_PFT_CHARTS = {
  "male|17-20": {
    "pullups": [
      {
        "threshold": 4,
        "points": 40
      },
      {
        "threshold": 5,
        "points": 44
      },
      {
        "threshold": 6,
        "points": 48
      },
      {
        "threshold": 7,
        "points": 51
      },
      {
        "threshold": 8,
        "points": 55
      },
      {
        "threshold": 9,
        "points": 59
      },
      {
        "threshold": 10,
        "points": 63
      },
      {
        "threshold": 11,
        "points": 66
      },
      {
        "threshold": 12,
        "points": 70
      },
      {
        "threshold": 13,
        "points": 74
      },
      {
        "threshold": 14,
        "points": 78
      },
      {
        "threshold": 15,
        "points": 81
      },
      {
        "threshold": 16,
        "points": 85
      },
      {
        "threshold": 17,
        "points": 89
      },
      {
        "threshold": 18,
        "points": 93
      },
      {
        "threshold": 19,
        "points": 96
      },
      {
        "threshold": 20,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 42,
        "points": 40
      },
      {
        "threshold": 43,
        "points": 41
      },
      {
        "threshold": 44,
        "points": 42
      },
      {
        "threshold": 45,
        "points": 42
      },
      {
        "threshold": 46,
        "points": 43
      },
      {
        "threshold": 47,
        "points": 44
      },
      {
        "threshold": 48,
        "points": 45
      },
      {
        "threshold": 49,
        "points": 45
      },
      {
        "threshold": 50,
        "points": 46
      },
      {
        "threshold": 51,
        "points": 47
      },
      {
        "threshold": 52,
        "points": 48
      },
      {
        "threshold": 53,
        "points": 48
      },
      {
        "threshold": 54,
        "points": 49
      },
      {
        "threshold": 55,
        "points": 50
      },
      {
        "threshold": 56,
        "points": 51
      },
      {
        "threshold": 57,
        "points": 51
      },
      {
        "threshold": 58,
        "points": 52
      },
      {
        "threshold": 59,
        "points": 53
      },
      {
        "threshold": 60,
        "points": 54
      },
      {
        "threshold": 61,
        "points": 54
      },
      {
        "threshold": 62,
        "points": 55
      },
      {
        "threshold": 63,
        "points": 56
      },
      {
        "threshold": 64,
        "points": 57
      },
      {
        "threshold": 65,
        "points": 57
      },
      {
        "threshold": 66,
        "points": 58
      },
      {
        "threshold": 67,
        "points": 59
      },
      {
        "threshold": 68,
        "points": 60
      },
      {
        "threshold": 69,
        "points": 60
      },
      {
        "threshold": 70,
        "points": 61
      },
      {
        "threshold": 71,
        "points": 62
      },
      {
        "threshold": 72,
        "points": 63
      },
      {
        "threshold": 73,
        "points": 63
      },
      {
        "threshold": 74,
        "points": 64
      },
      {
        "threshold": 75,
        "points": 65
      },
      {
        "threshold": 76,
        "points": 66
      },
      {
        "threshold": 77,
        "points": 66
      },
      {
        "threshold": 78,
        "points": 67
      },
      {
        "threshold": 79,
        "points": 68
      },
      {
        "threshold": 80,
        "points": 69
      },
      {
        "threshold": 81,
        "points": 69
      },
      {
        "threshold": 82,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1080,
        "points": 100
      },
      {
        "threshold": 1090,
        "points": 99
      },
      {
        "threshold": 1100,
        "points": 98
      },
      {
        "threshold": 1110,
        "points": 97
      },
      {
        "threshold": 1120,
        "points": 96
      },
      {
        "threshold": 1130,
        "points": 95
      },
      {
        "threshold": 1140,
        "points": 94
      },
      {
        "threshold": 1150,
        "points": 93
      },
      {
        "threshold": 1160,
        "points": 92
      },
      {
        "threshold": 1170,
        "points": 91
      },
      {
        "threshold": 1180,
        "points": 90
      },
      {
        "threshold": 1190,
        "points": 89
      },
      {
        "threshold": 1200,
        "points": 88
      },
      {
        "threshold": 1210,
        "points": 87
      },
      {
        "threshold": 1220,
        "points": 86
      },
      {
        "threshold": 1230,
        "points": 84
      },
      {
        "threshold": 1240,
        "points": 83
      },
      {
        "threshold": 1250,
        "points": 82
      },
      {
        "threshold": 1260,
        "points": 81
      },
      {
        "threshold": 1270,
        "points": 80
      },
      {
        "threshold": 1280,
        "points": 79
      },
      {
        "threshold": 1290,
        "points": 78
      },
      {
        "threshold": 1300,
        "points": 77
      },
      {
        "threshold": 1310,
        "points": 76
      },
      {
        "threshold": 1320,
        "points": 75
      },
      {
        "threshold": 1330,
        "points": 74
      },
      {
        "threshold": 1340,
        "points": 73
      },
      {
        "threshold": 1350,
        "points": 72
      },
      {
        "threshold": 1360,
        "points": 71
      },
      {
        "threshold": 1370,
        "points": 70
      },
      {
        "threshold": 1380,
        "points": 69
      },
      {
        "threshold": 1390,
        "points": 68
      },
      {
        "threshold": 1400,
        "points": 67
      },
      {
        "threshold": 1410,
        "points": 66
      },
      {
        "threshold": 1420,
        "points": 65
      },
      {
        "threshold": 1430,
        "points": 64
      },
      {
        "threshold": 1440,
        "points": 63
      },
      {
        "threshold": 1450,
        "points": 62
      },
      {
        "threshold": 1460,
        "points": 61
      },
      {
        "threshold": 1470,
        "points": 60
      },
      {
        "threshold": 1480,
        "points": 59
      },
      {
        "threshold": 1490,
        "points": 58
      },
      {
        "threshold": 1500,
        "points": 57
      },
      {
        "threshold": 1510,
        "points": 56
      },
      {
        "threshold": 1520,
        "points": 54
      },
      {
        "threshold": 1530,
        "points": 53
      },
      {
        "threshold": 1540,
        "points": 52
      },
      {
        "threshold": 1550,
        "points": 51
      },
      {
        "threshold": 1560,
        "points": 50
      },
      {
        "threshold": 1570,
        "points": 49
      },
      {
        "threshold": 1580,
        "points": 48
      },
      {
        "threshold": 1590,
        "points": 47
      },
      {
        "threshold": 1600,
        "points": 46
      },
      {
        "threshold": 1610,
        "points": 45
      },
      {
        "threshold": 1620,
        "points": 44
      },
      {
        "threshold": 1630,
        "points": 43
      },
      {
        "threshold": 1640,
        "points": 42
      },
      {
        "threshold": 1650,
        "points": 41
      },
      {
        "threshold": 1660,
        "points": 40
      }
    ]
  },
  "female|17-20": {
    "pullups": [
      {
        "threshold": 1,
        "points": 60
      },
      {
        "threshold": 2,
        "points": 67
      },
      {
        "threshold": 3,
        "points": 73
      },
      {
        "threshold": 4,
        "points": 80
      },
      {
        "threshold": 5,
        "points": 87
      },
      {
        "threshold": 6,
        "points": 93
      },
      {
        "threshold": 7,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 19,
        "points": 40
      },
      {
        "threshold": 20,
        "points": 41
      },
      {
        "threshold": 21,
        "points": 43
      },
      {
        "threshold": 22,
        "points": 44
      },
      {
        "threshold": 23,
        "points": 45
      },
      {
        "threshold": 24,
        "points": 47
      },
      {
        "threshold": 25,
        "points": 48
      },
      {
        "threshold": 26,
        "points": 49
      },
      {
        "threshold": 27,
        "points": 50
      },
      {
        "threshold": 28,
        "points": 52
      },
      {
        "threshold": 29,
        "points": 53
      },
      {
        "threshold": 30,
        "points": 54
      },
      {
        "threshold": 31,
        "points": 56
      },
      {
        "threshold": 32,
        "points": 57
      },
      {
        "threshold": 33,
        "points": 58
      },
      {
        "threshold": 34,
        "points": 60
      },
      {
        "threshold": 35,
        "points": 61
      },
      {
        "threshold": 36,
        "points": 62
      },
      {
        "threshold": 37,
        "points": 63
      },
      {
        "threshold": 38,
        "points": 65
      },
      {
        "threshold": 39,
        "points": 66
      },
      {
        "threshold": 40,
        "points": 67
      },
      {
        "threshold": 41,
        "points": 69
      },
      {
        "threshold": 42,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1260,
        "points": 100
      },
      {
        "threshold": 1270,
        "points": 99
      },
      {
        "threshold": 1280,
        "points": 98
      },
      {
        "threshold": 1290,
        "points": 97
      },
      {
        "threshold": 1300,
        "points": 96
      },
      {
        "threshold": 1310,
        "points": 95
      },
      {
        "threshold": 1320,
        "points": 94
      },
      {
        "threshold": 1330,
        "points": 93
      },
      {
        "threshold": 1340,
        "points": 92
      },
      {
        "threshold": 1350,
        "points": 91
      },
      {
        "threshold": 1360,
        "points": 90
      },
      {
        "threshold": 1370,
        "points": 89
      },
      {
        "threshold": 1380,
        "points": 88
      },
      {
        "threshold": 1390,
        "points": 87
      },
      {
        "threshold": 1400,
        "points": 86
      },
      {
        "threshold": 1410,
        "points": 85
      },
      {
        "threshold": 1420,
        "points": 84
      },
      {
        "threshold": 1430,
        "points": 83
      },
      {
        "threshold": 1440,
        "points": 82
      },
      {
        "threshold": 1450,
        "points": 81
      },
      {
        "threshold": 1460,
        "points": 80
      },
      {
        "threshold": 1470,
        "points": 79
      },
      {
        "threshold": 1480,
        "points": 78
      },
      {
        "threshold": 1490,
        "points": 77
      },
      {
        "threshold": 1500,
        "points": 76
      },
      {
        "threshold": 1510,
        "points": 75
      },
      {
        "threshold": 1520,
        "points": 74
      },
      {
        "threshold": 1530,
        "points": 73
      },
      {
        "threshold": 1540,
        "points": 72
      },
      {
        "threshold": 1550,
        "points": 71
      },
      {
        "threshold": 1560,
        "points": 69
      },
      {
        "threshold": 1570,
        "points": 68
      },
      {
        "threshold": 1580,
        "points": 67
      },
      {
        "threshold": 1590,
        "points": 66
      },
      {
        "threshold": 1600,
        "points": 65
      },
      {
        "threshold": 1610,
        "points": 64
      },
      {
        "threshold": 1620,
        "points": 63
      },
      {
        "threshold": 1630,
        "points": 62
      },
      {
        "threshold": 1640,
        "points": 61
      },
      {
        "threshold": 1650,
        "points": 60
      },
      {
        "threshold": 1660,
        "points": 59
      },
      {
        "threshold": 1670,
        "points": 58
      },
      {
        "threshold": 1680,
        "points": 57
      },
      {
        "threshold": 1690,
        "points": 56
      },
      {
        "threshold": 1700,
        "points": 55
      },
      {
        "threshold": 1710,
        "points": 54
      },
      {
        "threshold": 1720,
        "points": 53
      },
      {
        "threshold": 1730,
        "points": 52
      },
      {
        "threshold": 1740,
        "points": 51
      },
      {
        "threshold": 1750,
        "points": 50
      },
      {
        "threshold": 1760,
        "points": 49
      },
      {
        "threshold": 1770,
        "points": 48
      },
      {
        "threshold": 1780,
        "points": 47
      },
      {
        "threshold": 1790,
        "points": 46
      },
      {
        "threshold": 1800,
        "points": 45
      },
      {
        "threshold": 1810,
        "points": 44
      },
      {
        "threshold": 1820,
        "points": 43
      },
      {
        "threshold": 1830,
        "points": 42
      },
      {
        "threshold": 1840,
        "points": 41
      },
      {
        "threshold": 1850,
        "points": 40
      }
    ]
  },
  "male|21-25": {
    "pullups": [
      {
        "threshold": 5,
        "points": 40
      },
      {
        "threshold": 6,
        "points": 43
      },
      {
        "threshold": 7,
        "points": 47
      },
      {
        "threshold": 8,
        "points": 50
      },
      {
        "threshold": 9,
        "points": 53
      },
      {
        "threshold": 10,
        "points": 57
      },
      {
        "threshold": 11,
        "points": 60
      },
      {
        "threshold": 12,
        "points": 63
      },
      {
        "threshold": 13,
        "points": 67
      },
      {
        "threshold": 14,
        "points": 70
      },
      {
        "threshold": 15,
        "points": 73
      },
      {
        "threshold": 16,
        "points": 77
      },
      {
        "threshold": 17,
        "points": 80
      },
      {
        "threshold": 18,
        "points": 83
      },
      {
        "threshold": 19,
        "points": 87
      },
      {
        "threshold": 20,
        "points": 90
      },
      {
        "threshold": 21,
        "points": 93
      },
      {
        "threshold": 22,
        "points": 97
      },
      {
        "threshold": 23,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 40,
        "points": 40
      },
      {
        "threshold": 41,
        "points": 41
      },
      {
        "threshold": 42,
        "points": 41
      },
      {
        "threshold": 43,
        "points": 42
      },
      {
        "threshold": 44,
        "points": 43
      },
      {
        "threshold": 45,
        "points": 43
      },
      {
        "threshold": 46,
        "points": 44
      },
      {
        "threshold": 47,
        "points": 44
      },
      {
        "threshold": 48,
        "points": 45
      },
      {
        "threshold": 49,
        "points": 46
      },
      {
        "threshold": 50,
        "points": 46
      },
      {
        "threshold": 51,
        "points": 47
      },
      {
        "threshold": 52,
        "points": 48
      },
      {
        "threshold": 53,
        "points": 48
      },
      {
        "threshold": 54,
        "points": 49
      },
      {
        "threshold": 55,
        "points": 50
      },
      {
        "threshold": 56,
        "points": 50
      },
      {
        "threshold": 57,
        "points": 51
      },
      {
        "threshold": 58,
        "points": 51
      },
      {
        "threshold": 59,
        "points": 52
      },
      {
        "threshold": 60,
        "points": 53
      },
      {
        "threshold": 61,
        "points": 53
      },
      {
        "threshold": 62,
        "points": 54
      },
      {
        "threshold": 63,
        "points": 55
      },
      {
        "threshold": 64,
        "points": 55
      },
      {
        "threshold": 65,
        "points": 56
      },
      {
        "threshold": 66,
        "points": 57
      },
      {
        "threshold": 67,
        "points": 57
      },
      {
        "threshold": 68,
        "points": 58
      },
      {
        "threshold": 69,
        "points": 59
      },
      {
        "threshold": 70,
        "points": 59
      },
      {
        "threshold": 71,
        "points": 60
      },
      {
        "threshold": 72,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 74,
        "points": 62
      },
      {
        "threshold": 75,
        "points": 62
      },
      {
        "threshold": 76,
        "points": 63
      },
      {
        "threshold": 77,
        "points": 64
      },
      {
        "threshold": 78,
        "points": 64
      },
      {
        "threshold": 79,
        "points": 65
      },
      {
        "threshold": 80,
        "points": 66
      },
      {
        "threshold": 81,
        "points": 66
      },
      {
        "threshold": 82,
        "points": 67
      },
      {
        "threshold": 83,
        "points": 67
      },
      {
        "threshold": 84,
        "points": 68
      },
      {
        "threshold": 85,
        "points": 69
      },
      {
        "threshold": 86,
        "points": 69
      },
      {
        "threshold": 87,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1080,
        "points": 100
      },
      {
        "threshold": 1090,
        "points": 99
      },
      {
        "threshold": 1100,
        "points": 98
      },
      {
        "threshold": 1110,
        "points": 97
      },
      {
        "threshold": 1120,
        "points": 96
      },
      {
        "threshold": 1130,
        "points": 95
      },
      {
        "threshold": 1140,
        "points": 94
      },
      {
        "threshold": 1150,
        "points": 93
      },
      {
        "threshold": 1160,
        "points": 92
      },
      {
        "threshold": 1170,
        "points": 91
      },
      {
        "threshold": 1180,
        "points": 90
      },
      {
        "threshold": 1190,
        "points": 89
      },
      {
        "threshold": 1200,
        "points": 88
      },
      {
        "threshold": 1210,
        "points": 87
      },
      {
        "threshold": 1220,
        "points": 86
      },
      {
        "threshold": 1230,
        "points": 84
      },
      {
        "threshold": 1240,
        "points": 83
      },
      {
        "threshold": 1250,
        "points": 82
      },
      {
        "threshold": 1260,
        "points": 81
      },
      {
        "threshold": 1270,
        "points": 80
      },
      {
        "threshold": 1280,
        "points": 79
      },
      {
        "threshold": 1290,
        "points": 78
      },
      {
        "threshold": 1300,
        "points": 77
      },
      {
        "threshold": 1310,
        "points": 76
      },
      {
        "threshold": 1320,
        "points": 75
      },
      {
        "threshold": 1330,
        "points": 74
      },
      {
        "threshold": 1340,
        "points": 73
      },
      {
        "threshold": 1350,
        "points": 72
      },
      {
        "threshold": 1360,
        "points": 71
      },
      {
        "threshold": 1370,
        "points": 70
      },
      {
        "threshold": 1380,
        "points": 69
      },
      {
        "threshold": 1390,
        "points": 68
      },
      {
        "threshold": 1400,
        "points": 67
      },
      {
        "threshold": 1410,
        "points": 66
      },
      {
        "threshold": 1420,
        "points": 65
      },
      {
        "threshold": 1430,
        "points": 64
      },
      {
        "threshold": 1440,
        "points": 63
      },
      {
        "threshold": 1450,
        "points": 62
      },
      {
        "threshold": 1460,
        "points": 61
      },
      {
        "threshold": 1470,
        "points": 60
      },
      {
        "threshold": 1480,
        "points": 59
      },
      {
        "threshold": 1490,
        "points": 58
      },
      {
        "threshold": 1500,
        "points": 57
      },
      {
        "threshold": 1510,
        "points": 56
      },
      {
        "threshold": 1520,
        "points": 54
      },
      {
        "threshold": 1530,
        "points": 53
      },
      {
        "threshold": 1540,
        "points": 52
      },
      {
        "threshold": 1550,
        "points": 51
      },
      {
        "threshold": 1560,
        "points": 50
      },
      {
        "threshold": 1570,
        "points": 49
      },
      {
        "threshold": 1580,
        "points": 48
      },
      {
        "threshold": 1590,
        "points": 47
      },
      {
        "threshold": 1600,
        "points": 46
      },
      {
        "threshold": 1610,
        "points": 45
      },
      {
        "threshold": 1620,
        "points": 44
      },
      {
        "threshold": 1630,
        "points": 43
      },
      {
        "threshold": 1640,
        "points": 42
      },
      {
        "threshold": 1650,
        "points": 41
      },
      {
        "threshold": 1660,
        "points": 40
      }
    ]
  },
  "female|21-25": {
    "pullups": [
      {
        "threshold": 3,
        "points": 60
      },
      {
        "threshold": 4,
        "points": 65
      },
      {
        "threshold": 5,
        "points": 70
      },
      {
        "threshold": 6,
        "points": 75
      },
      {
        "threshold": 7,
        "points": 80
      },
      {
        "threshold": 8,
        "points": 85
      },
      {
        "threshold": 9,
        "points": 90
      },
      {
        "threshold": 10,
        "points": 95
      },
      {
        "threshold": 11,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 18,
        "points": 40
      },
      {
        "threshold": 19,
        "points": 41
      },
      {
        "threshold": 20,
        "points": 42
      },
      {
        "threshold": 21,
        "points": 43
      },
      {
        "threshold": 22,
        "points": 44
      },
      {
        "threshold": 23,
        "points": 45
      },
      {
        "threshold": 24,
        "points": 46
      },
      {
        "threshold": 25,
        "points": 47
      },
      {
        "threshold": 26,
        "points": 48
      },
      {
        "threshold": 27,
        "points": 49
      },
      {
        "threshold": 28,
        "points": 50
      },
      {
        "threshold": 29,
        "points": 51
      },
      {
        "threshold": 30,
        "points": 52
      },
      {
        "threshold": 31,
        "points": 53
      },
      {
        "threshold": 32,
        "points": 54
      },
      {
        "threshold": 33,
        "points": 55
      },
      {
        "threshold": 34,
        "points": 56
      },
      {
        "threshold": 35,
        "points": 57
      },
      {
        "threshold": 36,
        "points": 58
      },
      {
        "threshold": 37,
        "points": 59
      },
      {
        "threshold": 38,
        "points": 60
      },
      {
        "threshold": 39,
        "points": 61
      },
      {
        "threshold": 40,
        "points": 62
      },
      {
        "threshold": 41,
        "points": 63
      },
      {
        "threshold": 42,
        "points": 64
      },
      {
        "threshold": 43,
        "points": 65
      },
      {
        "threshold": 44,
        "points": 66
      },
      {
        "threshold": 45,
        "points": 67
      },
      {
        "threshold": 46,
        "points": 68
      },
      {
        "threshold": 47,
        "points": 69
      },
      {
        "threshold": 48,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1260,
        "points": 100
      },
      {
        "threshold": 1270,
        "points": 99
      },
      {
        "threshold": 1280,
        "points": 98
      },
      {
        "threshold": 1290,
        "points": 97
      },
      {
        "threshold": 1300,
        "points": 96
      },
      {
        "threshold": 1310,
        "points": 95
      },
      {
        "threshold": 1320,
        "points": 94
      },
      {
        "threshold": 1330,
        "points": 93
      },
      {
        "threshold": 1340,
        "points": 92
      },
      {
        "threshold": 1350,
        "points": 91
      },
      {
        "threshold": 1360,
        "points": 90
      },
      {
        "threshold": 1370,
        "points": 89
      },
      {
        "threshold": 1380,
        "points": 88
      },
      {
        "threshold": 1390,
        "points": 87
      },
      {
        "threshold": 1400,
        "points": 86
      },
      {
        "threshold": 1410,
        "points": 85
      },
      {
        "threshold": 1420,
        "points": 84
      },
      {
        "threshold": 1430,
        "points": 83
      },
      {
        "threshold": 1440,
        "points": 82
      },
      {
        "threshold": 1450,
        "points": 81
      },
      {
        "threshold": 1460,
        "points": 80
      },
      {
        "threshold": 1470,
        "points": 79
      },
      {
        "threshold": 1480,
        "points": 78
      },
      {
        "threshold": 1490,
        "points": 77
      },
      {
        "threshold": 1500,
        "points": 76
      },
      {
        "threshold": 1510,
        "points": 75
      },
      {
        "threshold": 1520,
        "points": 74
      },
      {
        "threshold": 1530,
        "points": 73
      },
      {
        "threshold": 1540,
        "points": 72
      },
      {
        "threshold": 1550,
        "points": 71
      },
      {
        "threshold": 1560,
        "points": 69
      },
      {
        "threshold": 1570,
        "points": 68
      },
      {
        "threshold": 1580,
        "points": 67
      },
      {
        "threshold": 1590,
        "points": 66
      },
      {
        "threshold": 1600,
        "points": 65
      },
      {
        "threshold": 1610,
        "points": 64
      },
      {
        "threshold": 1620,
        "points": 63
      },
      {
        "threshold": 1630,
        "points": 62
      },
      {
        "threshold": 1640,
        "points": 61
      },
      {
        "threshold": 1650,
        "points": 60
      },
      {
        "threshold": 1660,
        "points": 59
      },
      {
        "threshold": 1670,
        "points": 58
      },
      {
        "threshold": 1680,
        "points": 57
      },
      {
        "threshold": 1690,
        "points": 56
      },
      {
        "threshold": 1700,
        "points": 55
      },
      {
        "threshold": 1710,
        "points": 54
      },
      {
        "threshold": 1720,
        "points": 53
      },
      {
        "threshold": 1730,
        "points": 52
      },
      {
        "threshold": 1740,
        "points": 51
      },
      {
        "threshold": 1750,
        "points": 50
      },
      {
        "threshold": 1760,
        "points": 49
      },
      {
        "threshold": 1770,
        "points": 48
      },
      {
        "threshold": 1780,
        "points": 47
      },
      {
        "threshold": 1790,
        "points": 46
      },
      {
        "threshold": 1800,
        "points": 45
      },
      {
        "threshold": 1810,
        "points": 44
      },
      {
        "threshold": 1820,
        "points": 43
      },
      {
        "threshold": 1830,
        "points": 42
      },
      {
        "threshold": 1840,
        "points": 41
      },
      {
        "threshold": 1850,
        "points": 40
      }
    ]
  },
  "male|26-30": {
    "pullups": [
      {
        "threshold": 5,
        "points": 40
      },
      {
        "threshold": 6,
        "points": 43
      },
      {
        "threshold": 7,
        "points": 47
      },
      {
        "threshold": 8,
        "points": 50
      },
      {
        "threshold": 9,
        "points": 53
      },
      {
        "threshold": 10,
        "points": 57
      },
      {
        "threshold": 11,
        "points": 60
      },
      {
        "threshold": 12,
        "points": 63
      },
      {
        "threshold": 13,
        "points": 67
      },
      {
        "threshold": 14,
        "points": 70
      },
      {
        "threshold": 15,
        "points": 73
      },
      {
        "threshold": 16,
        "points": 77
      },
      {
        "threshold": 17,
        "points": 80
      },
      {
        "threshold": 18,
        "points": 83
      },
      {
        "threshold": 19,
        "points": 87
      },
      {
        "threshold": 20,
        "points": 90
      },
      {
        "threshold": 21,
        "points": 93
      },
      {
        "threshold": 22,
        "points": 97
      },
      {
        "threshold": 23,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 39,
        "points": 40
      },
      {
        "threshold": 40,
        "points": 41
      },
      {
        "threshold": 41,
        "points": 41
      },
      {
        "threshold": 42,
        "points": 42
      },
      {
        "threshold": 43,
        "points": 43
      },
      {
        "threshold": 44,
        "points": 43
      },
      {
        "threshold": 45,
        "points": 44
      },
      {
        "threshold": 46,
        "points": 45
      },
      {
        "threshold": 47,
        "points": 45
      },
      {
        "threshold": 48,
        "points": 46
      },
      {
        "threshold": 49,
        "points": 47
      },
      {
        "threshold": 50,
        "points": 47
      },
      {
        "threshold": 51,
        "points": 48
      },
      {
        "threshold": 52,
        "points": 49
      },
      {
        "threshold": 53,
        "points": 49
      },
      {
        "threshold": 54,
        "points": 50
      },
      {
        "threshold": 55,
        "points": 51
      },
      {
        "threshold": 56,
        "points": 51
      },
      {
        "threshold": 57,
        "points": 52
      },
      {
        "threshold": 58,
        "points": 53
      },
      {
        "threshold": 59,
        "points": 53
      },
      {
        "threshold": 60,
        "points": 54
      },
      {
        "threshold": 61,
        "points": 55
      },
      {
        "threshold": 62,
        "points": 55
      },
      {
        "threshold": 63,
        "points": 56
      },
      {
        "threshold": 64,
        "points": 57
      },
      {
        "threshold": 65,
        "points": 57
      },
      {
        "threshold": 66,
        "points": 58
      },
      {
        "threshold": 67,
        "points": 59
      },
      {
        "threshold": 68,
        "points": 59
      },
      {
        "threshold": 69,
        "points": 60
      },
      {
        "threshold": 70,
        "points": 61
      },
      {
        "threshold": 71,
        "points": 61
      },
      {
        "threshold": 72,
        "points": 62
      },
      {
        "threshold": 73,
        "points": 63
      },
      {
        "threshold": 74,
        "points": 63
      },
      {
        "threshold": 75,
        "points": 64
      },
      {
        "threshold": 76,
        "points": 65
      },
      {
        "threshold": 77,
        "points": 65
      },
      {
        "threshold": 78,
        "points": 66
      },
      {
        "threshold": 79,
        "points": 67
      },
      {
        "threshold": 80,
        "points": 67
      },
      {
        "threshold": 81,
        "points": 68
      },
      {
        "threshold": 82,
        "points": 69
      },
      {
        "threshold": 83,
        "points": 69
      },
      {
        "threshold": 84,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1080,
        "points": 100
      },
      {
        "threshold": 1090,
        "points": 99
      },
      {
        "threshold": 1100,
        "points": 98
      },
      {
        "threshold": 1110,
        "points": 97
      },
      {
        "threshold": 1120,
        "points": 96
      },
      {
        "threshold": 1130,
        "points": 95
      },
      {
        "threshold": 1140,
        "points": 94
      },
      {
        "threshold": 1150,
        "points": 93
      },
      {
        "threshold": 1160,
        "points": 92
      },
      {
        "threshold": 1170,
        "points": 91
      },
      {
        "threshold": 1180,
        "points": 90
      },
      {
        "threshold": 1190,
        "points": 89
      },
      {
        "threshold": 1200,
        "points": 88
      },
      {
        "threshold": 1210,
        "points": 87
      },
      {
        "threshold": 1220,
        "points": 86
      },
      {
        "threshold": 1230,
        "points": 85
      },
      {
        "threshold": 1240,
        "points": 84
      },
      {
        "threshold": 1250,
        "points": 83
      },
      {
        "threshold": 1260,
        "points": 82
      },
      {
        "threshold": 1270,
        "points": 81
      },
      {
        "threshold": 1280,
        "points": 80
      },
      {
        "threshold": 1290,
        "points": 79
      },
      {
        "threshold": 1300,
        "points": 78
      },
      {
        "threshold": 1310,
        "points": 77
      },
      {
        "threshold": 1320,
        "points": 76
      },
      {
        "threshold": 1330,
        "points": 75
      },
      {
        "threshold": 1340,
        "points": 74
      },
      {
        "threshold": 1350,
        "points": 73
      },
      {
        "threshold": 1360,
        "points": 72
      },
      {
        "threshold": 1370,
        "points": 71
      },
      {
        "threshold": 1380,
        "points": 70
      },
      {
        "threshold": 1390,
        "points": 69
      },
      {
        "threshold": 1400,
        "points": 68
      },
      {
        "threshold": 1410,
        "points": 67
      },
      {
        "threshold": 1420,
        "points": 66
      },
      {
        "threshold": 1430,
        "points": 65
      },
      {
        "threshold": 1440,
        "points": 64
      },
      {
        "threshold": 1450,
        "points": 63
      },
      {
        "threshold": 1460,
        "points": 62
      },
      {
        "threshold": 1470,
        "points": 61
      },
      {
        "threshold": 1480,
        "points": 60
      },
      {
        "threshold": 1490,
        "points": 59
      },
      {
        "threshold": 1500,
        "points": 58
      },
      {
        "threshold": 1510,
        "points": 57
      },
      {
        "threshold": 1520,
        "points": 56
      },
      {
        "threshold": 1530,
        "points": 55
      },
      {
        "threshold": 1540,
        "points": 54
      },
      {
        "threshold": 1550,
        "points": 53
      },
      {
        "threshold": 1560,
        "points": 52
      },
      {
        "threshold": 1570,
        "points": 51
      },
      {
        "threshold": 1580,
        "points": 50
      },
      {
        "threshold": 1590,
        "points": 49
      },
      {
        "threshold": 1600,
        "points": 48
      },
      {
        "threshold": 1610,
        "points": 47
      },
      {
        "threshold": 1620,
        "points": 46
      },
      {
        "threshold": 1630,
        "points": 45
      },
      {
        "threshold": 1640,
        "points": 44
      },
      {
        "threshold": 1650,
        "points": 43
      },
      {
        "threshold": 1660,
        "points": 42
      },
      {
        "threshold": 1670,
        "points": 41
      },
      {
        "threshold": 1680,
        "points": 40
      }
    ]
  },
  "female|26-30": {
    "pullups": [
      {
        "threshold": 4,
        "points": 60
      },
      {
        "threshold": 5,
        "points": 65
      },
      {
        "threshold": 6,
        "points": 70
      },
      {
        "threshold": 7,
        "points": 75
      },
      {
        "threshold": 8,
        "points": 80
      },
      {
        "threshold": 9,
        "points": 85
      },
      {
        "threshold": 10,
        "points": 90
      },
      {
        "threshold": 11,
        "points": 95
      },
      {
        "threshold": 12,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 18,
        "points": 40
      },
      {
        "threshold": 19,
        "points": 41
      },
      {
        "threshold": 20,
        "points": 42
      },
      {
        "threshold": 21,
        "points": 43
      },
      {
        "threshold": 22,
        "points": 44
      },
      {
        "threshold": 23,
        "points": 45
      },
      {
        "threshold": 24,
        "points": 46
      },
      {
        "threshold": 25,
        "points": 47
      },
      {
        "threshold": 26,
        "points": 48
      },
      {
        "threshold": 27,
        "points": 48
      },
      {
        "threshold": 28,
        "points": 49
      },
      {
        "threshold": 29,
        "points": 50
      },
      {
        "threshold": 30,
        "points": 51
      },
      {
        "threshold": 31,
        "points": 52
      },
      {
        "threshold": 32,
        "points": 53
      },
      {
        "threshold": 33,
        "points": 54
      },
      {
        "threshold": 34,
        "points": 55
      },
      {
        "threshold": 35,
        "points": 56
      },
      {
        "threshold": 36,
        "points": 57
      },
      {
        "threshold": 37,
        "points": 58
      },
      {
        "threshold": 38,
        "points": 59
      },
      {
        "threshold": 39,
        "points": 60
      },
      {
        "threshold": 40,
        "points": 61
      },
      {
        "threshold": 41,
        "points": 62
      },
      {
        "threshold": 42,
        "points": 63
      },
      {
        "threshold": 43,
        "points": 63
      },
      {
        "threshold": 44,
        "points": 64
      },
      {
        "threshold": 45,
        "points": 65
      },
      {
        "threshold": 46,
        "points": 66
      },
      {
        "threshold": 47,
        "points": 67
      },
      {
        "threshold": 48,
        "points": 68
      },
      {
        "threshold": 49,
        "points": 69
      },
      {
        "threshold": 50,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1260,
        "points": 100
      },
      {
        "threshold": 1270,
        "points": 99
      },
      {
        "threshold": 1280,
        "points": 98
      },
      {
        "threshold": 1290,
        "points": 97
      },
      {
        "threshold": 1300,
        "points": 96
      },
      {
        "threshold": 1310,
        "points": 95
      },
      {
        "threshold": 1320,
        "points": 94
      },
      {
        "threshold": 1330,
        "points": 93
      },
      {
        "threshold": 1340,
        "points": 92
      },
      {
        "threshold": 1350,
        "points": 91
      },
      {
        "threshold": 1360,
        "points": 90
      },
      {
        "threshold": 1370,
        "points": 89
      },
      {
        "threshold": 1380,
        "points": 88
      },
      {
        "threshold": 1390,
        "points": 87
      },
      {
        "threshold": 1400,
        "points": 86
      },
      {
        "threshold": 1410,
        "points": 85
      },
      {
        "threshold": 1420,
        "points": 84
      },
      {
        "threshold": 1430,
        "points": 83
      },
      {
        "threshold": 1440,
        "points": 82
      },
      {
        "threshold": 1450,
        "points": 81
      },
      {
        "threshold": 1460,
        "points": 80
      },
      {
        "threshold": 1470,
        "points": 79
      },
      {
        "threshold": 1480,
        "points": 78
      },
      {
        "threshold": 1490,
        "points": 77
      },
      {
        "threshold": 1500,
        "points": 76
      },
      {
        "threshold": 1510,
        "points": 75
      },
      {
        "threshold": 1520,
        "points": 74
      },
      {
        "threshold": 1530,
        "points": 73
      },
      {
        "threshold": 1540,
        "points": 72
      },
      {
        "threshold": 1550,
        "points": 71
      },
      {
        "threshold": 1560,
        "points": 70
      },
      {
        "threshold": 1570,
        "points": 70
      },
      {
        "threshold": 1580,
        "points": 69
      },
      {
        "threshold": 1590,
        "points": 68
      },
      {
        "threshold": 1600,
        "points": 67
      },
      {
        "threshold": 1610,
        "points": 66
      },
      {
        "threshold": 1620,
        "points": 65
      },
      {
        "threshold": 1630,
        "points": 64
      },
      {
        "threshold": 1640,
        "points": 63
      },
      {
        "threshold": 1650,
        "points": 62
      },
      {
        "threshold": 1660,
        "points": 61
      },
      {
        "threshold": 1670,
        "points": 60
      },
      {
        "threshold": 1680,
        "points": 59
      },
      {
        "threshold": 1690,
        "points": 58
      },
      {
        "threshold": 1700,
        "points": 57
      },
      {
        "threshold": 1710,
        "points": 56
      },
      {
        "threshold": 1720,
        "points": 55
      },
      {
        "threshold": 1730,
        "points": 54
      },
      {
        "threshold": 1740,
        "points": 53
      },
      {
        "threshold": 1750,
        "points": 52
      },
      {
        "threshold": 1760,
        "points": 51
      },
      {
        "threshold": 1770,
        "points": 50
      },
      {
        "threshold": 1780,
        "points": 49
      },
      {
        "threshold": 1790,
        "points": 48
      },
      {
        "threshold": 1800,
        "points": 47
      },
      {
        "threshold": 1810,
        "points": 46
      },
      {
        "threshold": 1820,
        "points": 45
      },
      {
        "threshold": 1830,
        "points": 44
      },
      {
        "threshold": 1840,
        "points": 43
      },
      {
        "threshold": 1850,
        "points": 42
      },
      {
        "threshold": 1860,
        "points": 41
      },
      {
        "threshold": 1870,
        "points": 40
      }
    ]
  },
  "male|31-35": {
    "pullups": [
      {
        "threshold": 5,
        "points": 40
      },
      {
        "threshold": 6,
        "points": 43
      },
      {
        "threshold": 7,
        "points": 47
      },
      {
        "threshold": 8,
        "points": 50
      },
      {
        "threshold": 9,
        "points": 53
      },
      {
        "threshold": 10,
        "points": 57
      },
      {
        "threshold": 11,
        "points": 60
      },
      {
        "threshold": 12,
        "points": 63
      },
      {
        "threshold": 13,
        "points": 67
      },
      {
        "threshold": 14,
        "points": 70
      },
      {
        "threshold": 15,
        "points": 73
      },
      {
        "threshold": 16,
        "points": 77
      },
      {
        "threshold": 17,
        "points": 80
      },
      {
        "threshold": 18,
        "points": 83
      },
      {
        "threshold": 19,
        "points": 87
      },
      {
        "threshold": 20,
        "points": 90
      },
      {
        "threshold": 21,
        "points": 93
      },
      {
        "threshold": 22,
        "points": 97
      },
      {
        "threshold": 23,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 36,
        "points": 40
      },
      {
        "threshold": 37,
        "points": 41
      },
      {
        "threshold": 38,
        "points": 41
      },
      {
        "threshold": 39,
        "points": 42
      },
      {
        "threshold": 40,
        "points": 43
      },
      {
        "threshold": 41,
        "points": 43
      },
      {
        "threshold": 42,
        "points": 44
      },
      {
        "threshold": 43,
        "points": 45
      },
      {
        "threshold": 44,
        "points": 45
      },
      {
        "threshold": 45,
        "points": 46
      },
      {
        "threshold": 46,
        "points": 47
      },
      {
        "threshold": 47,
        "points": 48
      },
      {
        "threshold": 48,
        "points": 48
      },
      {
        "threshold": 49,
        "points": 49
      },
      {
        "threshold": 50,
        "points": 50
      },
      {
        "threshold": 51,
        "points": 50
      },
      {
        "threshold": 52,
        "points": 51
      },
      {
        "threshold": 53,
        "points": 52
      },
      {
        "threshold": 54,
        "points": 52
      },
      {
        "threshold": 55,
        "points": 53
      },
      {
        "threshold": 56,
        "points": 54
      },
      {
        "threshold": 57,
        "points": 54
      },
      {
        "threshold": 58,
        "points": 55
      },
      {
        "threshold": 59,
        "points": 56
      },
      {
        "threshold": 60,
        "points": 56
      },
      {
        "threshold": 61,
        "points": 57
      },
      {
        "threshold": 62,
        "points": 58
      },
      {
        "threshold": 63,
        "points": 58
      },
      {
        "threshold": 64,
        "points": 59
      },
      {
        "threshold": 65,
        "points": 60
      },
      {
        "threshold": 66,
        "points": 60
      },
      {
        "threshold": 67,
        "points": 61
      },
      {
        "threshold": 68,
        "points": 62
      },
      {
        "threshold": 69,
        "points": 63
      },
      {
        "threshold": 70,
        "points": 63
      },
      {
        "threshold": 71,
        "points": 64
      },
      {
        "threshold": 72,
        "points": 65
      },
      {
        "threshold": 73,
        "points": 65
      },
      {
        "threshold": 74,
        "points": 66
      },
      {
        "threshold": 75,
        "points": 67
      },
      {
        "threshold": 76,
        "points": 67
      },
      {
        "threshold": 77,
        "points": 68
      },
      {
        "threshold": 78,
        "points": 69
      },
      {
        "threshold": 79,
        "points": 69
      },
      {
        "threshold": 80,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1080,
        "points": 100
      },
      {
        "threshold": 1090,
        "points": 99
      },
      {
        "threshold": 1100,
        "points": 98
      },
      {
        "threshold": 1110,
        "points": 97
      },
      {
        "threshold": 1120,
        "points": 96
      },
      {
        "threshold": 1130,
        "points": 95
      },
      {
        "threshold": 1140,
        "points": 94
      },
      {
        "threshold": 1150,
        "points": 93
      },
      {
        "threshold": 1160,
        "points": 92
      },
      {
        "threshold": 1170,
        "points": 91
      },
      {
        "threshold": 1180,
        "points": 90
      },
      {
        "threshold": 1190,
        "points": 89
      },
      {
        "threshold": 1200,
        "points": 88
      },
      {
        "threshold": 1210,
        "points": 87
      },
      {
        "threshold": 1220,
        "points": 86
      },
      {
        "threshold": 1230,
        "points": 85
      },
      {
        "threshold": 1240,
        "points": 85
      },
      {
        "threshold": 1250,
        "points": 84
      },
      {
        "threshold": 1260,
        "points": 83
      },
      {
        "threshold": 1270,
        "points": 82
      },
      {
        "threshold": 1280,
        "points": 81
      },
      {
        "threshold": 1290,
        "points": 80
      },
      {
        "threshold": 1300,
        "points": 79
      },
      {
        "threshold": 1310,
        "points": 78
      },
      {
        "threshold": 1320,
        "points": 77
      },
      {
        "threshold": 1330,
        "points": 76
      },
      {
        "threshold": 1340,
        "points": 75
      },
      {
        "threshold": 1350,
        "points": 74
      },
      {
        "threshold": 1360,
        "points": 73
      },
      {
        "threshold": 1370,
        "points": 72
      },
      {
        "threshold": 1380,
        "points": 71
      },
      {
        "threshold": 1390,
        "points": 70
      },
      {
        "threshold": 1400,
        "points": 69
      },
      {
        "threshold": 1410,
        "points": 68
      },
      {
        "threshold": 1420,
        "points": 67
      },
      {
        "threshold": 1430,
        "points": 66
      },
      {
        "threshold": 1440,
        "points": 65
      },
      {
        "threshold": 1450,
        "points": 64
      },
      {
        "threshold": 1460,
        "points": 63
      },
      {
        "threshold": 1470,
        "points": 62
      },
      {
        "threshold": 1480,
        "points": 61
      },
      {
        "threshold": 1490,
        "points": 60
      },
      {
        "threshold": 1500,
        "points": 59
      },
      {
        "threshold": 1510,
        "points": 58
      },
      {
        "threshold": 1520,
        "points": 57
      },
      {
        "threshold": 1530,
        "points": 56
      },
      {
        "threshold": 1540,
        "points": 55
      },
      {
        "threshold": 1550,
        "points": 55
      },
      {
        "threshold": 1560,
        "points": 54
      },
      {
        "threshold": 1570,
        "points": 53
      },
      {
        "threshold": 1580,
        "points": 52
      },
      {
        "threshold": 1590,
        "points": 51
      },
      {
        "threshold": 1600,
        "points": 50
      },
      {
        "threshold": 1610,
        "points": 49
      },
      {
        "threshold": 1620,
        "points": 48
      },
      {
        "threshold": 1630,
        "points": 47
      },
      {
        "threshold": 1640,
        "points": 46
      },
      {
        "threshold": 1650,
        "points": 45
      },
      {
        "threshold": 1660,
        "points": 44
      },
      {
        "threshold": 1670,
        "points": 43
      },
      {
        "threshold": 1680,
        "points": 42
      },
      {
        "threshold": 1690,
        "points": 41
      },
      {
        "threshold": 1700,
        "points": 40
      }
    ]
  },
  "female|31-35": {
    "pullups": [
      {
        "threshold": 3,
        "points": 60
      },
      {
        "threshold": 4,
        "points": 65
      },
      {
        "threshold": 5,
        "points": 70
      },
      {
        "threshold": 6,
        "points": 75
      },
      {
        "threshold": 7,
        "points": 80
      },
      {
        "threshold": 8,
        "points": 85
      },
      {
        "threshold": 9,
        "points": 90
      },
      {
        "threshold": 10,
        "points": 95
      },
      {
        "threshold": 11,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 16,
        "points": 40
      },
      {
        "threshold": 17,
        "points": 41
      },
      {
        "threshold": 18,
        "points": 42
      },
      {
        "threshold": 19,
        "points": 43
      },
      {
        "threshold": 20,
        "points": 44
      },
      {
        "threshold": 21,
        "points": 45
      },
      {
        "threshold": 22,
        "points": 46
      },
      {
        "threshold": 23,
        "points": 47
      },
      {
        "threshold": 24,
        "points": 48
      },
      {
        "threshold": 25,
        "points": 49
      },
      {
        "threshold": 26,
        "points": 50
      },
      {
        "threshold": 27,
        "points": 51
      },
      {
        "threshold": 28,
        "points": 52
      },
      {
        "threshold": 29,
        "points": 53
      },
      {
        "threshold": 30,
        "points": 54
      },
      {
        "threshold": 31,
        "points": 55
      },
      {
        "threshold": 32,
        "points": 56
      },
      {
        "threshold": 33,
        "points": 57
      },
      {
        "threshold": 34,
        "points": 58
      },
      {
        "threshold": 35,
        "points": 59
      },
      {
        "threshold": 36,
        "points": 60
      },
      {
        "threshold": 37,
        "points": 61
      },
      {
        "threshold": 38,
        "points": 62
      },
      {
        "threshold": 39,
        "points": 63
      },
      {
        "threshold": 40,
        "points": 64
      },
      {
        "threshold": 41,
        "points": 65
      },
      {
        "threshold": 42,
        "points": 66
      },
      {
        "threshold": 43,
        "points": 67
      },
      {
        "threshold": 44,
        "points": 68
      },
      {
        "threshold": 45,
        "points": 69
      },
      {
        "threshold": 46,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1260,
        "points": 100
      },
      {
        "threshold": 1270,
        "points": 99
      },
      {
        "threshold": 1280,
        "points": 98
      },
      {
        "threshold": 1290,
        "points": 97
      },
      {
        "threshold": 1300,
        "points": 96
      },
      {
        "threshold": 1310,
        "points": 95
      },
      {
        "threshold": 1320,
        "points": 94
      },
      {
        "threshold": 1330,
        "points": 93
      },
      {
        "threshold": 1340,
        "points": 92
      },
      {
        "threshold": 1350,
        "points": 91
      },
      {
        "threshold": 1360,
        "points": 90
      },
      {
        "threshold": 1370,
        "points": 90
      },
      {
        "threshold": 1380,
        "points": 89
      },
      {
        "threshold": 1390,
        "points": 88
      },
      {
        "threshold": 1400,
        "points": 87
      },
      {
        "threshold": 1410,
        "points": 86
      },
      {
        "threshold": 1420,
        "points": 85
      },
      {
        "threshold": 1430,
        "points": 84
      },
      {
        "threshold": 1440,
        "points": 83
      },
      {
        "threshold": 1450,
        "points": 82
      },
      {
        "threshold": 1460,
        "points": 81
      },
      {
        "threshold": 1470,
        "points": 80
      },
      {
        "threshold": 1480,
        "points": 79
      },
      {
        "threshold": 1490,
        "points": 78
      },
      {
        "threshold": 1500,
        "points": 77
      },
      {
        "threshold": 1510,
        "points": 76
      },
      {
        "threshold": 1520,
        "points": 75
      },
      {
        "threshold": 1530,
        "points": 74
      },
      {
        "threshold": 1540,
        "points": 73
      },
      {
        "threshold": 1550,
        "points": 72
      },
      {
        "threshold": 1560,
        "points": 71
      },
      {
        "threshold": 1570,
        "points": 70
      },
      {
        "threshold": 1580,
        "points": 70
      },
      {
        "threshold": 1590,
        "points": 69
      },
      {
        "threshold": 1600,
        "points": 68
      },
      {
        "threshold": 1610,
        "points": 67
      },
      {
        "threshold": 1620,
        "points": 66
      },
      {
        "threshold": 1630,
        "points": 65
      },
      {
        "threshold": 1640,
        "points": 64
      },
      {
        "threshold": 1650,
        "points": 63
      },
      {
        "threshold": 1660,
        "points": 62
      },
      {
        "threshold": 1670,
        "points": 61
      },
      {
        "threshold": 1680,
        "points": 60
      },
      {
        "threshold": 1690,
        "points": 59
      },
      {
        "threshold": 1700,
        "points": 58
      },
      {
        "threshold": 1710,
        "points": 57
      },
      {
        "threshold": 1720,
        "points": 56
      },
      {
        "threshold": 1730,
        "points": 55
      },
      {
        "threshold": 1740,
        "points": 54
      },
      {
        "threshold": 1750,
        "points": 53
      },
      {
        "threshold": 1760,
        "points": 52
      },
      {
        "threshold": 1770,
        "points": 51
      },
      {
        "threshold": 1780,
        "points": 50
      },
      {
        "threshold": 1790,
        "points": 50
      },
      {
        "threshold": 1800,
        "points": 49
      },
      {
        "threshold": 1810,
        "points": 48
      },
      {
        "threshold": 1820,
        "points": 47
      },
      {
        "threshold": 1830,
        "points": 46
      },
      {
        "threshold": 1840,
        "points": 45
      },
      {
        "threshold": 1850,
        "points": 44
      },
      {
        "threshold": 1860,
        "points": 43
      },
      {
        "threshold": 1870,
        "points": 42
      },
      {
        "threshold": 1880,
        "points": 41
      },
      {
        "threshold": 1890,
        "points": 40
      }
    ]
  },
  "male|36-40": {
    "pullups": [
      {
        "threshold": 5,
        "points": 40
      },
      {
        "threshold": 6,
        "points": 44
      },
      {
        "threshold": 7,
        "points": 48
      },
      {
        "threshold": 8,
        "points": 51
      },
      {
        "threshold": 9,
        "points": 55
      },
      {
        "threshold": 10,
        "points": 59
      },
      {
        "threshold": 11,
        "points": 63
      },
      {
        "threshold": 12,
        "points": 66
      },
      {
        "threshold": 13,
        "points": 70
      },
      {
        "threshold": 14,
        "points": 74
      },
      {
        "threshold": 15,
        "points": 78
      },
      {
        "threshold": 16,
        "points": 81
      },
      {
        "threshold": 17,
        "points": 85
      },
      {
        "threshold": 18,
        "points": 89
      },
      {
        "threshold": 19,
        "points": 93
      },
      {
        "threshold": 20,
        "points": 96
      },
      {
        "threshold": 21,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 34,
        "points": 40
      },
      {
        "threshold": 35,
        "points": 41
      },
      {
        "threshold": 36,
        "points": 41
      },
      {
        "threshold": 37,
        "points": 42
      },
      {
        "threshold": 38,
        "points": 43
      },
      {
        "threshold": 39,
        "points": 44
      },
      {
        "threshold": 40,
        "points": 44
      },
      {
        "threshold": 41,
        "points": 45
      },
      {
        "threshold": 42,
        "points": 46
      },
      {
        "threshold": 43,
        "points": 46
      },
      {
        "threshold": 44,
        "points": 47
      },
      {
        "threshold": 45,
        "points": 48
      },
      {
        "threshold": 46,
        "points": 49
      },
      {
        "threshold": 47,
        "points": 49
      },
      {
        "threshold": 48,
        "points": 50
      },
      {
        "threshold": 49,
        "points": 51
      },
      {
        "threshold": 50,
        "points": 51
      },
      {
        "threshold": 51,
        "points": 52
      },
      {
        "threshold": 52,
        "points": 53
      },
      {
        "threshold": 53,
        "points": 54
      },
      {
        "threshold": 54,
        "points": 54
      },
      {
        "threshold": 55,
        "points": 55
      },
      {
        "threshold": 56,
        "points": 56
      },
      {
        "threshold": 57,
        "points": 56
      },
      {
        "threshold": 58,
        "points": 57
      },
      {
        "threshold": 59,
        "points": 58
      },
      {
        "threshold": 60,
        "points": 59
      },
      {
        "threshold": 61,
        "points": 59
      },
      {
        "threshold": 62,
        "points": 60
      },
      {
        "threshold": 63,
        "points": 61
      },
      {
        "threshold": 64,
        "points": 61
      },
      {
        "threshold": 65,
        "points": 62
      },
      {
        "threshold": 66,
        "points": 63
      },
      {
        "threshold": 67,
        "points": 64
      },
      {
        "threshold": 68,
        "points": 64
      },
      {
        "threshold": 69,
        "points": 65
      },
      {
        "threshold": 70,
        "points": 66
      },
      {
        "threshold": 71,
        "points": 66
      },
      {
        "threshold": 72,
        "points": 67
      },
      {
        "threshold": 73,
        "points": 68
      },
      {
        "threshold": 74,
        "points": 69
      },
      {
        "threshold": 75,
        "points": 69
      },
      {
        "threshold": 76,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1080,
        "points": 100
      },
      {
        "threshold": 1090,
        "points": 99
      },
      {
        "threshold": 1100,
        "points": 98
      },
      {
        "threshold": 1110,
        "points": 97
      },
      {
        "threshold": 1120,
        "points": 96
      },
      {
        "threshold": 1130,
        "points": 95
      },
      {
        "threshold": 1140,
        "points": 94
      },
      {
        "threshold": 1150,
        "points": 93
      },
      {
        "threshold": 1160,
        "points": 93
      },
      {
        "threshold": 1170,
        "points": 92
      },
      {
        "threshold": 1180,
        "points": 91
      },
      {
        "threshold": 1190,
        "points": 90
      },
      {
        "threshold": 1200,
        "points": 89
      },
      {
        "threshold": 1210,
        "points": 88
      },
      {
        "threshold": 1220,
        "points": 87
      },
      {
        "threshold": 1230,
        "points": 86
      },
      {
        "threshold": 1240,
        "points": 85
      },
      {
        "threshold": 1250,
        "points": 84
      },
      {
        "threshold": 1260,
        "points": 83
      },
      {
        "threshold": 1270,
        "points": 82
      },
      {
        "threshold": 1280,
        "points": 81
      },
      {
        "threshold": 1290,
        "points": 80
      },
      {
        "threshold": 1300,
        "points": 79
      },
      {
        "threshold": 1310,
        "points": 78
      },
      {
        "threshold": 1320,
        "points": 78
      },
      {
        "threshold": 1330,
        "points": 77
      },
      {
        "threshold": 1340,
        "points": 76
      },
      {
        "threshold": 1350,
        "points": 75
      },
      {
        "threshold": 1360,
        "points": 74
      },
      {
        "threshold": 1370,
        "points": 73
      },
      {
        "threshold": 1380,
        "points": 72
      },
      {
        "threshold": 1390,
        "points": 71
      },
      {
        "threshold": 1400,
        "points": 70
      },
      {
        "threshold": 1410,
        "points": 69
      },
      {
        "threshold": 1420,
        "points": 68
      },
      {
        "threshold": 1430,
        "points": 67
      },
      {
        "threshold": 1440,
        "points": 66
      },
      {
        "threshold": 1450,
        "points": 65
      },
      {
        "threshold": 1460,
        "points": 64
      },
      {
        "threshold": 1470,
        "points": 63
      },
      {
        "threshold": 1480,
        "points": 63
      },
      {
        "threshold": 1490,
        "points": 62
      },
      {
        "threshold": 1500,
        "points": 61
      },
      {
        "threshold": 1510,
        "points": 60
      },
      {
        "threshold": 1520,
        "points": 59
      },
      {
        "threshold": 1530,
        "points": 58
      },
      {
        "threshold": 1540,
        "points": 57
      },
      {
        "threshold": 1550,
        "points": 56
      },
      {
        "threshold": 1560,
        "points": 55
      },
      {
        "threshold": 1570,
        "points": 54
      },
      {
        "threshold": 1580,
        "points": 53
      },
      {
        "threshold": 1590,
        "points": 52
      },
      {
        "threshold": 1600,
        "points": 51
      },
      {
        "threshold": 1610,
        "points": 50
      },
      {
        "threshold": 1620,
        "points": 49
      },
      {
        "threshold": 1630,
        "points": 48
      },
      {
        "threshold": 1640,
        "points": 48
      },
      {
        "threshold": 1650,
        "points": 47
      },
      {
        "threshold": 1660,
        "points": 46
      },
      {
        "threshold": 1670,
        "points": 45
      },
      {
        "threshold": 1680,
        "points": 44
      },
      {
        "threshold": 1690,
        "points": 43
      },
      {
        "threshold": 1700,
        "points": 42
      },
      {
        "threshold": 1710,
        "points": 41
      },
      {
        "threshold": 1720,
        "points": 40
      }
    ]
  },
  "female|36-40": {
    "pullups": [
      {
        "threshold": 3,
        "points": 60
      },
      {
        "threshold": 4,
        "points": 66
      },
      {
        "threshold": 5,
        "points": 71
      },
      {
        "threshold": 6,
        "points": 77
      },
      {
        "threshold": 7,
        "points": 83
      },
      {
        "threshold": 8,
        "points": 89
      },
      {
        "threshold": 9,
        "points": 94
      },
      {
        "threshold": 10,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 14,
        "points": 40
      },
      {
        "threshold": 15,
        "points": 41
      },
      {
        "threshold": 16,
        "points": 42
      },
      {
        "threshold": 17,
        "points": 43
      },
      {
        "threshold": 18,
        "points": 44
      },
      {
        "threshold": 19,
        "points": 45
      },
      {
        "threshold": 20,
        "points": 46
      },
      {
        "threshold": 21,
        "points": 47
      },
      {
        "threshold": 22,
        "points": 48
      },
      {
        "threshold": 23,
        "points": 49
      },
      {
        "threshold": 24,
        "points": 50
      },
      {
        "threshold": 25,
        "points": 51
      },
      {
        "threshold": 26,
        "points": 52
      },
      {
        "threshold": 27,
        "points": 53
      },
      {
        "threshold": 28,
        "points": 54
      },
      {
        "threshold": 29,
        "points": 56
      },
      {
        "threshold": 30,
        "points": 57
      },
      {
        "threshold": 31,
        "points": 58
      },
      {
        "threshold": 32,
        "points": 59
      },
      {
        "threshold": 33,
        "points": 60
      },
      {
        "threshold": 34,
        "points": 61
      },
      {
        "threshold": 35,
        "points": 62
      },
      {
        "threshold": 36,
        "points": 63
      },
      {
        "threshold": 37,
        "points": 64
      },
      {
        "threshold": 38,
        "points": 65
      },
      {
        "threshold": 39,
        "points": 66
      },
      {
        "threshold": 40,
        "points": 67
      },
      {
        "threshold": 41,
        "points": 68
      },
      {
        "threshold": 42,
        "points": 69
      },
      {
        "threshold": 43,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1260,
        "points": 100
      },
      {
        "threshold": 1270,
        "points": 99
      },
      {
        "threshold": 1280,
        "points": 98
      },
      {
        "threshold": 1290,
        "points": 97
      },
      {
        "threshold": 1300,
        "points": 96
      },
      {
        "threshold": 1310,
        "points": 95
      },
      {
        "threshold": 1320,
        "points": 94
      },
      {
        "threshold": 1330,
        "points": 94
      },
      {
        "threshold": 1340,
        "points": 93
      },
      {
        "threshold": 1350,
        "points": 92
      },
      {
        "threshold": 1360,
        "points": 91
      },
      {
        "threshold": 1370,
        "points": 90
      },
      {
        "threshold": 1380,
        "points": 89
      },
      {
        "threshold": 1390,
        "points": 88
      },
      {
        "threshold": 1400,
        "points": 87
      },
      {
        "threshold": 1410,
        "points": 86
      },
      {
        "threshold": 1420,
        "points": 85
      },
      {
        "threshold": 1430,
        "points": 84
      },
      {
        "threshold": 1440,
        "points": 83
      },
      {
        "threshold": 1450,
        "points": 82
      },
      {
        "threshold": 1460,
        "points": 82
      },
      {
        "threshold": 1470,
        "points": 81
      },
      {
        "threshold": 1480,
        "points": 80
      },
      {
        "threshold": 1490,
        "points": 79
      },
      {
        "threshold": 1500,
        "points": 78
      },
      {
        "threshold": 1510,
        "points": 77
      },
      {
        "threshold": 1520,
        "points": 76
      },
      {
        "threshold": 1530,
        "points": 75
      },
      {
        "threshold": 1540,
        "points": 74
      },
      {
        "threshold": 1550,
        "points": 73
      },
      {
        "threshold": 1560,
        "points": 72
      },
      {
        "threshold": 1570,
        "points": 71
      },
      {
        "threshold": 1580,
        "points": 70
      },
      {
        "threshold": 1590,
        "points": 70
      },
      {
        "threshold": 1600,
        "points": 69
      },
      {
        "threshold": 1610,
        "points": 68
      },
      {
        "threshold": 1620,
        "points": 67
      },
      {
        "threshold": 1630,
        "points": 66
      },
      {
        "threshold": 1640,
        "points": 65
      },
      {
        "threshold": 1650,
        "points": 64
      },
      {
        "threshold": 1660,
        "points": 63
      },
      {
        "threshold": 1670,
        "points": 62
      },
      {
        "threshold": 1680,
        "points": 61
      },
      {
        "threshold": 1690,
        "points": 60
      },
      {
        "threshold": 1700,
        "points": 59
      },
      {
        "threshold": 1710,
        "points": 58
      },
      {
        "threshold": 1720,
        "points": 58
      },
      {
        "threshold": 1730,
        "points": 57
      },
      {
        "threshold": 1740,
        "points": 56
      },
      {
        "threshold": 1750,
        "points": 55
      },
      {
        "threshold": 1760,
        "points": 54
      },
      {
        "threshold": 1770,
        "points": 53
      },
      {
        "threshold": 1780,
        "points": 52
      },
      {
        "threshold": 1790,
        "points": 51
      },
      {
        "threshold": 1800,
        "points": 50
      },
      {
        "threshold": 1810,
        "points": 49
      },
      {
        "threshold": 1820,
        "points": 48
      },
      {
        "threshold": 1830,
        "points": 47
      },
      {
        "threshold": 1840,
        "points": 46
      },
      {
        "threshold": 1850,
        "points": 46
      },
      {
        "threshold": 1860,
        "points": 45
      },
      {
        "threshold": 1870,
        "points": 44
      },
      {
        "threshold": 1880,
        "points": 43
      },
      {
        "threshold": 1890,
        "points": 42
      },
      {
        "threshold": 1900,
        "points": 41
      },
      {
        "threshold": 1910,
        "points": 40
      }
    ]
  },
  "male|41-45": {
    "pullups": [
      {
        "threshold": 5,
        "points": 40
      },
      {
        "threshold": 6,
        "points": 44
      },
      {
        "threshold": 7,
        "points": 48
      },
      {
        "threshold": 8,
        "points": 52
      },
      {
        "threshold": 9,
        "points": 56
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 11,
        "points": 64
      },
      {
        "threshold": 12,
        "points": 68
      },
      {
        "threshold": 13,
        "points": 72
      },
      {
        "threshold": 14,
        "points": 76
      },
      {
        "threshold": 15,
        "points": 80
      },
      {
        "threshold": 16,
        "points": 84
      },
      {
        "threshold": 17,
        "points": 88
      },
      {
        "threshold": 18,
        "points": 92
      },
      {
        "threshold": 19,
        "points": 96
      },
      {
        "threshold": 20,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 30,
        "points": 40
      },
      {
        "threshold": 31,
        "points": 41
      },
      {
        "threshold": 32,
        "points": 41
      },
      {
        "threshold": 33,
        "points": 42
      },
      {
        "threshold": 34,
        "points": 43
      },
      {
        "threshold": 35,
        "points": 44
      },
      {
        "threshold": 36,
        "points": 44
      },
      {
        "threshold": 37,
        "points": 45
      },
      {
        "threshold": 38,
        "points": 46
      },
      {
        "threshold": 39,
        "points": 46
      },
      {
        "threshold": 40,
        "points": 47
      },
      {
        "threshold": 41,
        "points": 48
      },
      {
        "threshold": 42,
        "points": 49
      },
      {
        "threshold": 43,
        "points": 49
      },
      {
        "threshold": 44,
        "points": 50
      },
      {
        "threshold": 45,
        "points": 51
      },
      {
        "threshold": 46,
        "points": 51
      },
      {
        "threshold": 47,
        "points": 52
      },
      {
        "threshold": 48,
        "points": 53
      },
      {
        "threshold": 49,
        "points": 54
      },
      {
        "threshold": 50,
        "points": 54
      },
      {
        "threshold": 51,
        "points": 55
      },
      {
        "threshold": 52,
        "points": 56
      },
      {
        "threshold": 53,
        "points": 56
      },
      {
        "threshold": 54,
        "points": 57
      },
      {
        "threshold": 55,
        "points": 58
      },
      {
        "threshold": 56,
        "points": 59
      },
      {
        "threshold": 57,
        "points": 59
      },
      {
        "threshold": 58,
        "points": 60
      },
      {
        "threshold": 59,
        "points": 61
      },
      {
        "threshold": 60,
        "points": 61
      },
      {
        "threshold": 61,
        "points": 62
      },
      {
        "threshold": 62,
        "points": 63
      },
      {
        "threshold": 63,
        "points": 64
      },
      {
        "threshold": 64,
        "points": 64
      },
      {
        "threshold": 65,
        "points": 65
      },
      {
        "threshold": 66,
        "points": 66
      },
      {
        "threshold": 67,
        "points": 66
      },
      {
        "threshold": 68,
        "points": 67
      },
      {
        "threshold": 69,
        "points": 68
      },
      {
        "threshold": 70,
        "points": 69
      },
      {
        "threshold": 71,
        "points": 69
      },
      {
        "threshold": 72,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1110,
        "points": 100
      },
      {
        "threshold": 1120,
        "points": 99
      },
      {
        "threshold": 1130,
        "points": 98
      },
      {
        "threshold": 1140,
        "points": 97
      },
      {
        "threshold": 1150,
        "points": 96
      },
      {
        "threshold": 1160,
        "points": 95
      },
      {
        "threshold": 1170,
        "points": 94
      },
      {
        "threshold": 1180,
        "points": 94
      },
      {
        "threshold": 1190,
        "points": 93
      },
      {
        "threshold": 1200,
        "points": 92
      },
      {
        "threshold": 1210,
        "points": 91
      },
      {
        "threshold": 1220,
        "points": 90
      },
      {
        "threshold": 1230,
        "points": 89
      },
      {
        "threshold": 1240,
        "points": 88
      },
      {
        "threshold": 1250,
        "points": 87
      },
      {
        "threshold": 1260,
        "points": 86
      },
      {
        "threshold": 1270,
        "points": 85
      },
      {
        "threshold": 1280,
        "points": 84
      },
      {
        "threshold": 1290,
        "points": 83
      },
      {
        "threshold": 1300,
        "points": 82
      },
      {
        "threshold": 1310,
        "points": 82
      },
      {
        "threshold": 1320,
        "points": 81
      },
      {
        "threshold": 1330,
        "points": 80
      },
      {
        "threshold": 1340,
        "points": 79
      },
      {
        "threshold": 1350,
        "points": 78
      },
      {
        "threshold": 1360,
        "points": 77
      },
      {
        "threshold": 1370,
        "points": 76
      },
      {
        "threshold": 1380,
        "points": 75
      },
      {
        "threshold": 1390,
        "points": 74
      },
      {
        "threshold": 1400,
        "points": 73
      },
      {
        "threshold": 1410,
        "points": 72
      },
      {
        "threshold": 1420,
        "points": 71
      },
      {
        "threshold": 1430,
        "points": 70
      },
      {
        "threshold": 1440,
        "points": 70
      },
      {
        "threshold": 1450,
        "points": 69
      },
      {
        "threshold": 1460,
        "points": 68
      },
      {
        "threshold": 1470,
        "points": 67
      },
      {
        "threshold": 1480,
        "points": 66
      },
      {
        "threshold": 1490,
        "points": 65
      },
      {
        "threshold": 1500,
        "points": 64
      },
      {
        "threshold": 1510,
        "points": 63
      },
      {
        "threshold": 1520,
        "points": 62
      },
      {
        "threshold": 1530,
        "points": 61
      },
      {
        "threshold": 1540,
        "points": 60
      },
      {
        "threshold": 1550,
        "points": 59
      },
      {
        "threshold": 1560,
        "points": 58
      },
      {
        "threshold": 1570,
        "points": 58
      },
      {
        "threshold": 1580,
        "points": 57
      },
      {
        "threshold": 1590,
        "points": 56
      },
      {
        "threshold": 1600,
        "points": 55
      },
      {
        "threshold": 1610,
        "points": 54
      },
      {
        "threshold": 1620,
        "points": 53
      },
      {
        "threshold": 1630,
        "points": 52
      },
      {
        "threshold": 1640,
        "points": 51
      },
      {
        "threshold": 1650,
        "points": 50
      },
      {
        "threshold": 1660,
        "points": 49
      },
      {
        "threshold": 1670,
        "points": 48
      },
      {
        "threshold": 1680,
        "points": 47
      },
      {
        "threshold": 1690,
        "points": 46
      },
      {
        "threshold": 1700,
        "points": 46
      },
      {
        "threshold": 1710,
        "points": 45
      },
      {
        "threshold": 1720,
        "points": 44
      },
      {
        "threshold": 1730,
        "points": 43
      },
      {
        "threshold": 1740,
        "points": 42
      },
      {
        "threshold": 1750,
        "points": 41
      },
      {
        "threshold": 1760,
        "points": 40
      }
    ]
  },
  "female|41-45": {
    "pullups": [
      {
        "threshold": 2,
        "points": 60
      },
      {
        "threshold": 3,
        "points": 67
      },
      {
        "threshold": 4,
        "points": 73
      },
      {
        "threshold": 5,
        "points": 80
      },
      {
        "threshold": 6,
        "points": 87
      },
      {
        "threshold": 7,
        "points": 93
      },
      {
        "threshold": 8,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 12,
        "points": 40
      },
      {
        "threshold": 13,
        "points": 41
      },
      {
        "threshold": 14,
        "points": 42
      },
      {
        "threshold": 15,
        "points": 43
      },
      {
        "threshold": 16,
        "points": 44
      },
      {
        "threshold": 17,
        "points": 45
      },
      {
        "threshold": 18,
        "points": 46
      },
      {
        "threshold": 19,
        "points": 47
      },
      {
        "threshold": 20,
        "points": 48
      },
      {
        "threshold": 21,
        "points": 49
      },
      {
        "threshold": 22,
        "points": 50
      },
      {
        "threshold": 23,
        "points": 51
      },
      {
        "threshold": 24,
        "points": 52
      },
      {
        "threshold": 25,
        "points": 53
      },
      {
        "threshold": 26,
        "points": 54
      },
      {
        "threshold": 27,
        "points": 56
      },
      {
        "threshold": 28,
        "points": 57
      },
      {
        "threshold": 29,
        "points": 58
      },
      {
        "threshold": 30,
        "points": 59
      },
      {
        "threshold": 31,
        "points": 60
      },
      {
        "threshold": 32,
        "points": 61
      },
      {
        "threshold": 33,
        "points": 62
      },
      {
        "threshold": 34,
        "points": 63
      },
      {
        "threshold": 35,
        "points": 64
      },
      {
        "threshold": 36,
        "points": 65
      },
      {
        "threshold": 37,
        "points": 66
      },
      {
        "threshold": 38,
        "points": 67
      },
      {
        "threshold": 39,
        "points": 68
      },
      {
        "threshold": 40,
        "points": 69
      },
      {
        "threshold": 41,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1290,
        "points": 100
      },
      {
        "threshold": 1300,
        "points": 99
      },
      {
        "threshold": 1310,
        "points": 98
      },
      {
        "threshold": 1320,
        "points": 97
      },
      {
        "threshold": 1330,
        "points": 96
      },
      {
        "threshold": 1340,
        "points": 95
      },
      {
        "threshold": 1350,
        "points": 95
      },
      {
        "threshold": 1360,
        "points": 94
      },
      {
        "threshold": 1370,
        "points": 93
      },
      {
        "threshold": 1380,
        "points": 92
      },
      {
        "threshold": 1390,
        "points": 91
      },
      {
        "threshold": 1400,
        "points": 90
      },
      {
        "threshold": 1410,
        "points": 89
      },
      {
        "threshold": 1420,
        "points": 88
      },
      {
        "threshold": 1430,
        "points": 87
      },
      {
        "threshold": 1440,
        "points": 86
      },
      {
        "threshold": 1450,
        "points": 85
      },
      {
        "threshold": 1460,
        "points": 85
      },
      {
        "threshold": 1470,
        "points": 84
      },
      {
        "threshold": 1480,
        "points": 83
      },
      {
        "threshold": 1490,
        "points": 82
      },
      {
        "threshold": 1500,
        "points": 81
      },
      {
        "threshold": 1510,
        "points": 80
      },
      {
        "threshold": 1520,
        "points": 79
      },
      {
        "threshold": 1530,
        "points": 78
      },
      {
        "threshold": 1540,
        "points": 77
      },
      {
        "threshold": 1550,
        "points": 76
      },
      {
        "threshold": 1560,
        "points": 75
      },
      {
        "threshold": 1570,
        "points": 75
      },
      {
        "threshold": 1580,
        "points": 74
      },
      {
        "threshold": 1590,
        "points": 73
      },
      {
        "threshold": 1600,
        "points": 72
      },
      {
        "threshold": 1610,
        "points": 71
      },
      {
        "threshold": 1620,
        "points": 70
      },
      {
        "threshold": 1630,
        "points": 69
      },
      {
        "threshold": 1640,
        "points": 68
      },
      {
        "threshold": 1650,
        "points": 67
      },
      {
        "threshold": 1660,
        "points": 66
      },
      {
        "threshold": 1670,
        "points": 65
      },
      {
        "threshold": 1680,
        "points": 65
      },
      {
        "threshold": 1690,
        "points": 64
      },
      {
        "threshold": 1700,
        "points": 63
      },
      {
        "threshold": 1710,
        "points": 62
      },
      {
        "threshold": 1720,
        "points": 61
      },
      {
        "threshold": 1730,
        "points": 60
      },
      {
        "threshold": 1740,
        "points": 59
      },
      {
        "threshold": 1750,
        "points": 58
      },
      {
        "threshold": 1760,
        "points": 57
      },
      {
        "threshold": 1770,
        "points": 56
      },
      {
        "threshold": 1780,
        "points": 55
      },
      {
        "threshold": 1790,
        "points": 55
      },
      {
        "threshold": 1800,
        "points": 54
      },
      {
        "threshold": 1810,
        "points": 53
      },
      {
        "threshold": 1820,
        "points": 52
      },
      {
        "threshold": 1830,
        "points": 51
      },
      {
        "threshold": 1840,
        "points": 50
      },
      {
        "threshold": 1850,
        "points": 49
      },
      {
        "threshold": 1860,
        "points": 48
      },
      {
        "threshold": 1870,
        "points": 47
      },
      {
        "threshold": 1880,
        "points": 46
      },
      {
        "threshold": 1890,
        "points": 45
      },
      {
        "threshold": 1900,
        "points": 45
      },
      {
        "threshold": 1910,
        "points": 44
      },
      {
        "threshold": 1920,
        "points": 43
      },
      {
        "threshold": 1930,
        "points": 42
      },
      {
        "threshold": 1940,
        "points": 41
      },
      {
        "threshold": 1950,
        "points": 40
      }
    ]
  },
  "male|46-50": {
    "pullups": [
      {
        "threshold": 4,
        "points": 40
      },
      {
        "threshold": 5,
        "points": 44
      },
      {
        "threshold": 6,
        "points": 48
      },
      {
        "threshold": 7,
        "points": 52
      },
      {
        "threshold": 8,
        "points": 56
      },
      {
        "threshold": 9,
        "points": 60
      },
      {
        "threshold": 10,
        "points": 64
      },
      {
        "threshold": 11,
        "points": 68
      },
      {
        "threshold": 12,
        "points": 72
      },
      {
        "threshold": 13,
        "points": 76
      },
      {
        "threshold": 14,
        "points": 80
      },
      {
        "threshold": 15,
        "points": 84
      },
      {
        "threshold": 16,
        "points": 88
      },
      {
        "threshold": 17,
        "points": 92
      },
      {
        "threshold": 18,
        "points": 96
      },
      {
        "threshold": 19,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 25,
        "points": 40
      },
      {
        "threshold": 26,
        "points": 41
      },
      {
        "threshold": 27,
        "points": 41
      },
      {
        "threshold": 28,
        "points": 42
      },
      {
        "threshold": 29,
        "points": 43
      },
      {
        "threshold": 30,
        "points": 43
      },
      {
        "threshold": 31,
        "points": 44
      },
      {
        "threshold": 32,
        "points": 45
      },
      {
        "threshold": 33,
        "points": 46
      },
      {
        "threshold": 34,
        "points": 46
      },
      {
        "threshold": 35,
        "points": 47
      },
      {
        "threshold": 36,
        "points": 48
      },
      {
        "threshold": 37,
        "points": 48
      },
      {
        "threshold": 38,
        "points": 49
      },
      {
        "threshold": 39,
        "points": 50
      },
      {
        "threshold": 40,
        "points": 50
      },
      {
        "threshold": 41,
        "points": 51
      },
      {
        "threshold": 42,
        "points": 52
      },
      {
        "threshold": 43,
        "points": 53
      },
      {
        "threshold": 44,
        "points": 53
      },
      {
        "threshold": 45,
        "points": 54
      },
      {
        "threshold": 46,
        "points": 55
      },
      {
        "threshold": 47,
        "points": 55
      },
      {
        "threshold": 48,
        "points": 56
      },
      {
        "threshold": 49,
        "points": 57
      },
      {
        "threshold": 50,
        "points": 57
      },
      {
        "threshold": 51,
        "points": 58
      },
      {
        "threshold": 52,
        "points": 59
      },
      {
        "threshold": 53,
        "points": 60
      },
      {
        "threshold": 54,
        "points": 60
      },
      {
        "threshold": 55,
        "points": 61
      },
      {
        "threshold": 56,
        "points": 62
      },
      {
        "threshold": 57,
        "points": 62
      },
      {
        "threshold": 58,
        "points": 63
      },
      {
        "threshold": 59,
        "points": 64
      },
      {
        "threshold": 60,
        "points": 64
      },
      {
        "threshold": 61,
        "points": 65
      },
      {
        "threshold": 62,
        "points": 66
      },
      {
        "threshold": 63,
        "points": 67
      },
      {
        "threshold": 64,
        "points": 67
      },
      {
        "threshold": 65,
        "points": 68
      },
      {
        "threshold": 66,
        "points": 69
      },
      {
        "threshold": 67,
        "points": 69
      },
      {
        "threshold": 68,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1140,
        "points": 100
      },
      {
        "threshold": 1150,
        "points": 99
      },
      {
        "threshold": 1160,
        "points": 98
      },
      {
        "threshold": 1170,
        "points": 97
      },
      {
        "threshold": 1180,
        "points": 96
      },
      {
        "threshold": 1190,
        "points": 95
      },
      {
        "threshold": 1200,
        "points": 95
      },
      {
        "threshold": 1210,
        "points": 94
      },
      {
        "threshold": 1220,
        "points": 93
      },
      {
        "threshold": 1230,
        "points": 92
      },
      {
        "threshold": 1240,
        "points": 91
      },
      {
        "threshold": 1250,
        "points": 90
      },
      {
        "threshold": 1260,
        "points": 89
      },
      {
        "threshold": 1270,
        "points": 88
      },
      {
        "threshold": 1280,
        "points": 87
      },
      {
        "threshold": 1290,
        "points": 86
      },
      {
        "threshold": 1300,
        "points": 85
      },
      {
        "threshold": 1310,
        "points": 85
      },
      {
        "threshold": 1320,
        "points": 84
      },
      {
        "threshold": 1330,
        "points": 83
      },
      {
        "threshold": 1340,
        "points": 82
      },
      {
        "threshold": 1350,
        "points": 81
      },
      {
        "threshold": 1360,
        "points": 80
      },
      {
        "threshold": 1370,
        "points": 79
      },
      {
        "threshold": 1380,
        "points": 78
      },
      {
        "threshold": 1390,
        "points": 77
      },
      {
        "threshold": 1400,
        "points": 76
      },
      {
        "threshold": 1410,
        "points": 75
      },
      {
        "threshold": 1420,
        "points": 75
      },
      {
        "threshold": 1430,
        "points": 74
      },
      {
        "threshold": 1440,
        "points": 73
      },
      {
        "threshold": 1450,
        "points": 72
      },
      {
        "threshold": 1460,
        "points": 71
      },
      {
        "threshold": 1470,
        "points": 70
      },
      {
        "threshold": 1480,
        "points": 69
      },
      {
        "threshold": 1490,
        "points": 68
      },
      {
        "threshold": 1500,
        "points": 67
      },
      {
        "threshold": 1510,
        "points": 66
      },
      {
        "threshold": 1520,
        "points": 65
      },
      {
        "threshold": 1530,
        "points": 65
      },
      {
        "threshold": 1540,
        "points": 64
      },
      {
        "threshold": 1550,
        "points": 63
      },
      {
        "threshold": 1560,
        "points": 62
      },
      {
        "threshold": 1570,
        "points": 61
      },
      {
        "threshold": 1580,
        "points": 60
      },
      {
        "threshold": 1590,
        "points": 59
      },
      {
        "threshold": 1600,
        "points": 58
      },
      {
        "threshold": 1610,
        "points": 57
      },
      {
        "threshold": 1620,
        "points": 56
      },
      {
        "threshold": 1630,
        "points": 55
      },
      {
        "threshold": 1640,
        "points": 55
      },
      {
        "threshold": 1650,
        "points": 54
      },
      {
        "threshold": 1660,
        "points": 53
      },
      {
        "threshold": 1670,
        "points": 52
      },
      {
        "threshold": 1680,
        "points": 51
      },
      {
        "threshold": 1690,
        "points": 50
      },
      {
        "threshold": 1700,
        "points": 49
      },
      {
        "threshold": 1710,
        "points": 48
      },
      {
        "threshold": 1720,
        "points": 47
      },
      {
        "threshold": 1730,
        "points": 46
      },
      {
        "threshold": 1740,
        "points": 45
      },
      {
        "threshold": 1750,
        "points": 45
      },
      {
        "threshold": 1760,
        "points": 44
      },
      {
        "threshold": 1770,
        "points": 43
      },
      {
        "threshold": 1780,
        "points": 42
      },
      {
        "threshold": 1790,
        "points": 41
      },
      {
        "threshold": 1800,
        "points": 40
      }
    ]
  },
  "female|46-50": {
    "pullups": [
      {
        "threshold": 2,
        "points": 60
      },
      {
        "threshold": 3,
        "points": 70
      },
      {
        "threshold": 4,
        "points": 80
      },
      {
        "threshold": 5,
        "points": 90
      },
      {
        "threshold": 6,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 11,
        "points": 40
      },
      {
        "threshold": 12,
        "points": 41
      },
      {
        "threshold": 13,
        "points": 42
      },
      {
        "threshold": 14,
        "points": 43
      },
      {
        "threshold": 15,
        "points": 44
      },
      {
        "threshold": 16,
        "points": 45
      },
      {
        "threshold": 17,
        "points": 46
      },
      {
        "threshold": 18,
        "points": 47
      },
      {
        "threshold": 19,
        "points": 48
      },
      {
        "threshold": 20,
        "points": 49
      },
      {
        "threshold": 21,
        "points": 50
      },
      {
        "threshold": 22,
        "points": 51
      },
      {
        "threshold": 23,
        "points": 52
      },
      {
        "threshold": 24,
        "points": 53
      },
      {
        "threshold": 25,
        "points": 54
      },
      {
        "threshold": 26,
        "points": 56
      },
      {
        "threshold": 27,
        "points": 57
      },
      {
        "threshold": 28,
        "points": 58
      },
      {
        "threshold": 29,
        "points": 59
      },
      {
        "threshold": 30,
        "points": 60
      },
      {
        "threshold": 31,
        "points": 61
      },
      {
        "threshold": 32,
        "points": 62
      },
      {
        "threshold": 33,
        "points": 63
      },
      {
        "threshold": 34,
        "points": 64
      },
      {
        "threshold": 35,
        "points": 65
      },
      {
        "threshold": 36,
        "points": 66
      },
      {
        "threshold": 37,
        "points": 67
      },
      {
        "threshold": 38,
        "points": 68
      },
      {
        "threshold": 39,
        "points": 69
      },
      {
        "threshold": 40,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1320,
        "points": 100
      },
      {
        "threshold": 1330,
        "points": 99
      },
      {
        "threshold": 1340,
        "points": 98
      },
      {
        "threshold": 1350,
        "points": 97
      },
      {
        "threshold": 1360,
        "points": 97
      },
      {
        "threshold": 1370,
        "points": 96
      },
      {
        "threshold": 1380,
        "points": 95
      },
      {
        "threshold": 1390,
        "points": 94
      },
      {
        "threshold": 1400,
        "points": 93
      },
      {
        "threshold": 1410,
        "points": 92
      },
      {
        "threshold": 1420,
        "points": 91
      },
      {
        "threshold": 1430,
        "points": 90
      },
      {
        "threshold": 1440,
        "points": 90
      },
      {
        "threshold": 1450,
        "points": 89
      },
      {
        "threshold": 1460,
        "points": 88
      },
      {
        "threshold": 1470,
        "points": 87
      },
      {
        "threshold": 1480,
        "points": 86
      },
      {
        "threshold": 1490,
        "points": 85
      },
      {
        "threshold": 1500,
        "points": 84
      },
      {
        "threshold": 1510,
        "points": 83
      },
      {
        "threshold": 1520,
        "points": 83
      },
      {
        "threshold": 1530,
        "points": 82
      },
      {
        "threshold": 1540,
        "points": 81
      },
      {
        "threshold": 1550,
        "points": 80
      },
      {
        "threshold": 1560,
        "points": 79
      },
      {
        "threshold": 1570,
        "points": 78
      },
      {
        "threshold": 1580,
        "points": 77
      },
      {
        "threshold": 1590,
        "points": 77
      },
      {
        "threshold": 1600,
        "points": 76
      },
      {
        "threshold": 1610,
        "points": 75
      },
      {
        "threshold": 1620,
        "points": 74
      },
      {
        "threshold": 1630,
        "points": 73
      },
      {
        "threshold": 1640,
        "points": 72
      },
      {
        "threshold": 1650,
        "points": 71
      },
      {
        "threshold": 1660,
        "points": 70
      },
      {
        "threshold": 1670,
        "points": 70
      },
      {
        "threshold": 1680,
        "points": 69
      },
      {
        "threshold": 1690,
        "points": 68
      },
      {
        "threshold": 1700,
        "points": 67
      },
      {
        "threshold": 1710,
        "points": 66
      },
      {
        "threshold": 1720,
        "points": 65
      },
      {
        "threshold": 1730,
        "points": 64
      },
      {
        "threshold": 1740,
        "points": 63
      },
      {
        "threshold": 1750,
        "points": 63
      },
      {
        "threshold": 1760,
        "points": 62
      },
      {
        "threshold": 1770,
        "points": 61
      },
      {
        "threshold": 1780,
        "points": 60
      },
      {
        "threshold": 1790,
        "points": 59
      },
      {
        "threshold": 1800,
        "points": 58
      },
      {
        "threshold": 1810,
        "points": 57
      },
      {
        "threshold": 1820,
        "points": 57
      },
      {
        "threshold": 1830,
        "points": 56
      },
      {
        "threshold": 1840,
        "points": 55
      },
      {
        "threshold": 1850,
        "points": 54
      },
      {
        "threshold": 1860,
        "points": 53
      },
      {
        "threshold": 1870,
        "points": 52
      },
      {
        "threshold": 1880,
        "points": 51
      },
      {
        "threshold": 1890,
        "points": 50
      },
      {
        "threshold": 1900,
        "points": 50
      },
      {
        "threshold": 1910,
        "points": 49
      },
      {
        "threshold": 1920,
        "points": 48
      },
      {
        "threshold": 1930,
        "points": 47
      },
      {
        "threshold": 1940,
        "points": 46
      },
      {
        "threshold": 1950,
        "points": 45
      },
      {
        "threshold": 1960,
        "points": 44
      },
      {
        "threshold": 1970,
        "points": 43
      },
      {
        "threshold": 1980,
        "points": 43
      },
      {
        "threshold": 1990,
        "points": 42
      },
      {
        "threshold": 2000,
        "points": 41
      },
      {
        "threshold": 2010,
        "points": 40
      }
    ]
  },
  "male|51-plus": {
    "pullups": [
      {
        "threshold": 3,
        "points": 40
      },
      {
        "threshold": 4,
        "points": 44
      },
      {
        "threshold": 5,
        "points": 48
      },
      {
        "threshold": 6,
        "points": 52
      },
      {
        "threshold": 7,
        "points": 56
      },
      {
        "threshold": 8,
        "points": 60
      },
      {
        "threshold": 9,
        "points": 64
      },
      {
        "threshold": 10,
        "points": 68
      },
      {
        "threshold": 11,
        "points": 72
      },
      {
        "threshold": 12,
        "points": 76
      },
      {
        "threshold": 13,
        "points": 80
      },
      {
        "threshold": 14,
        "points": 84
      },
      {
        "threshold": 15,
        "points": 88
      },
      {
        "threshold": 16,
        "points": 92
      },
      {
        "threshold": 17,
        "points": 96
      },
      {
        "threshold": 18,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 20,
        "points": 40
      },
      {
        "threshold": 21,
        "points": 41
      },
      {
        "threshold": 22,
        "points": 41
      },
      {
        "threshold": 23,
        "points": 42
      },
      {
        "threshold": 24,
        "points": 43
      },
      {
        "threshold": 25,
        "points": 43
      },
      {
        "threshold": 26,
        "points": 44
      },
      {
        "threshold": 27,
        "points": 45
      },
      {
        "threshold": 28,
        "points": 45
      },
      {
        "threshold": 29,
        "points": 46
      },
      {
        "threshold": 30,
        "points": 47
      },
      {
        "threshold": 31,
        "points": 48
      },
      {
        "threshold": 32,
        "points": 48
      },
      {
        "threshold": 33,
        "points": 49
      },
      {
        "threshold": 34,
        "points": 50
      },
      {
        "threshold": 35,
        "points": 50
      },
      {
        "threshold": 36,
        "points": 51
      },
      {
        "threshold": 37,
        "points": 52
      },
      {
        "threshold": 38,
        "points": 52
      },
      {
        "threshold": 39,
        "points": 53
      },
      {
        "threshold": 40,
        "points": 54
      },
      {
        "threshold": 41,
        "points": 54
      },
      {
        "threshold": 42,
        "points": 55
      },
      {
        "threshold": 43,
        "points": 56
      },
      {
        "threshold": 44,
        "points": 56
      },
      {
        "threshold": 45,
        "points": 57
      },
      {
        "threshold": 46,
        "points": 58
      },
      {
        "threshold": 47,
        "points": 58
      },
      {
        "threshold": 48,
        "points": 59
      },
      {
        "threshold": 49,
        "points": 60
      },
      {
        "threshold": 50,
        "points": 60
      },
      {
        "threshold": 51,
        "points": 61
      },
      {
        "threshold": 52,
        "points": 62
      },
      {
        "threshold": 53,
        "points": 63
      },
      {
        "threshold": 54,
        "points": 63
      },
      {
        "threshold": 55,
        "points": 64
      },
      {
        "threshold": 56,
        "points": 65
      },
      {
        "threshold": 57,
        "points": 65
      },
      {
        "threshold": 58,
        "points": 66
      },
      {
        "threshold": 59,
        "points": 67
      },
      {
        "threshold": 60,
        "points": 67
      },
      {
        "threshold": 61,
        "points": 68
      },
      {
        "threshold": 62,
        "points": 69
      },
      {
        "threshold": 63,
        "points": 69
      },
      {
        "threshold": 64,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1170,
        "points": 100
      },
      {
        "threshold": 1180,
        "points": 99
      },
      {
        "threshold": 1190,
        "points": 99
      },
      {
        "threshold": 1200,
        "points": 98
      },
      {
        "threshold": 1210,
        "points": 97
      },
      {
        "threshold": 1220,
        "points": 96
      },
      {
        "threshold": 1230,
        "points": 96
      },
      {
        "threshold": 1240,
        "points": 95
      },
      {
        "threshold": 1250,
        "points": 94
      },
      {
        "threshold": 1260,
        "points": 93
      },
      {
        "threshold": 1270,
        "points": 93
      },
      {
        "threshold": 1280,
        "points": 92
      },
      {
        "threshold": 1290,
        "points": 91
      },
      {
        "threshold": 1300,
        "points": 90
      },
      {
        "threshold": 1310,
        "points": 90
      },
      {
        "threshold": 1320,
        "points": 89
      },
      {
        "threshold": 1330,
        "points": 88
      },
      {
        "threshold": 1340,
        "points": 87
      },
      {
        "threshold": 1350,
        "points": 87
      },
      {
        "threshold": 1360,
        "points": 86
      },
      {
        "threshold": 1370,
        "points": 85
      },
      {
        "threshold": 1380,
        "points": 84
      },
      {
        "threshold": 1390,
        "points": 84
      },
      {
        "threshold": 1400,
        "points": 83
      },
      {
        "threshold": 1410,
        "points": 82
      },
      {
        "threshold": 1420,
        "points": 81
      },
      {
        "threshold": 1430,
        "points": 81
      },
      {
        "threshold": 1440,
        "points": 80
      },
      {
        "threshold": 1450,
        "points": 79
      },
      {
        "threshold": 1460,
        "points": 79
      },
      {
        "threshold": 1470,
        "points": 78
      },
      {
        "threshold": 1480,
        "points": 77
      },
      {
        "threshold": 1490,
        "points": 76
      },
      {
        "threshold": 1500,
        "points": 76
      },
      {
        "threshold": 1510,
        "points": 75
      },
      {
        "threshold": 1520,
        "points": 74
      },
      {
        "threshold": 1530,
        "points": 73
      },
      {
        "threshold": 1540,
        "points": 73
      },
      {
        "threshold": 1550,
        "points": 72
      },
      {
        "threshold": 1560,
        "points": 71
      },
      {
        "threshold": 1570,
        "points": 70
      },
      {
        "threshold": 1580,
        "points": 70
      },
      {
        "threshold": 1590,
        "points": 69
      },
      {
        "threshold": 1600,
        "points": 68
      },
      {
        "threshold": 1610,
        "points": 67
      },
      {
        "threshold": 1620,
        "points": 67
      },
      {
        "threshold": 1630,
        "points": 66
      },
      {
        "threshold": 1640,
        "points": 65
      },
      {
        "threshold": 1650,
        "points": 64
      },
      {
        "threshold": 1660,
        "points": 64
      },
      {
        "threshold": 1670,
        "points": 63
      },
      {
        "threshold": 1680,
        "points": 62
      },
      {
        "threshold": 1690,
        "points": 61
      },
      {
        "threshold": 1700,
        "points": 61
      },
      {
        "threshold": 1710,
        "points": 60
      },
      {
        "threshold": 1720,
        "points": 59
      },
      {
        "threshold": 1730,
        "points": 59
      },
      {
        "threshold": 1740,
        "points": 58
      },
      {
        "threshold": 1750,
        "points": 57
      },
      {
        "threshold": 1760,
        "points": 56
      },
      {
        "threshold": 1770,
        "points": 56
      },
      {
        "threshold": 1780,
        "points": 55
      },
      {
        "threshold": 1790,
        "points": 54
      },
      {
        "threshold": 1800,
        "points": 53
      },
      {
        "threshold": 1810,
        "points": 53
      },
      {
        "threshold": 1820,
        "points": 52
      },
      {
        "threshold": 1830,
        "points": 51
      },
      {
        "threshold": 1840,
        "points": 50
      },
      {
        "threshold": 1850,
        "points": 50
      },
      {
        "threshold": 1860,
        "points": 49
      },
      {
        "threshold": 1870,
        "points": 48
      },
      {
        "threshold": 1880,
        "points": 47
      },
      {
        "threshold": 1890,
        "points": 47
      },
      {
        "threshold": 1900,
        "points": 46
      },
      {
        "threshold": 1910,
        "points": 45
      },
      {
        "threshold": 1920,
        "points": 44
      },
      {
        "threshold": 1930,
        "points": 44
      },
      {
        "threshold": 1940,
        "points": 43
      },
      {
        "threshold": 1950,
        "points": 42
      },
      {
        "threshold": 1960,
        "points": 41
      },
      {
        "threshold": 1970,
        "points": 41
      },
      {
        "threshold": 1980,
        "points": 40
      }
    ]
  },
  "female|51-plus": {
    "pullups": [
      {
        "threshold": 2,
        "points": 60
      },
      {
        "threshold": 3,
        "points": 80
      },
      {
        "threshold": 4,
        "points": 100
      }
    ],
    "pushups": [
      {
        "threshold": 10,
        "points": 40
      },
      {
        "threshold": 11,
        "points": 41
      },
      {
        "threshold": 12,
        "points": 42
      },
      {
        "threshold": 13,
        "points": 43
      },
      {
        "threshold": 14,
        "points": 44
      },
      {
        "threshold": 15,
        "points": 45
      },
      {
        "threshold": 16,
        "points": 46
      },
      {
        "threshold": 17,
        "points": 48
      },
      {
        "threshold": 18,
        "points": 49
      },
      {
        "threshold": 19,
        "points": 50
      },
      {
        "threshold": 20,
        "points": 51
      },
      {
        "threshold": 21,
        "points": 52
      },
      {
        "threshold": 22,
        "points": 53
      },
      {
        "threshold": 23,
        "points": 54
      },
      {
        "threshold": 24,
        "points": 55
      },
      {
        "threshold": 25,
        "points": 56
      },
      {
        "threshold": 26,
        "points": 57
      },
      {
        "threshold": 27,
        "points": 58
      },
      {
        "threshold": 28,
        "points": 59
      },
      {
        "threshold": 29,
        "points": 60
      },
      {
        "threshold": 30,
        "points": 61
      },
      {
        "threshold": 31,
        "points": 63
      },
      {
        "threshold": 32,
        "points": 64
      },
      {
        "threshold": 33,
        "points": 65
      },
      {
        "threshold": 34,
        "points": 66
      },
      {
        "threshold": 35,
        "points": 67
      },
      {
        "threshold": 36,
        "points": 68
      },
      {
        "threshold": 37,
        "points": 69
      },
      {
        "threshold": 38,
        "points": 70
      }
    ],
    "plank": [
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 73,
        "points": 41
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 78,
        "points": 43
      },
      {
        "threshold": 81,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 45
      },
      {
        "threshold": 86,
        "points": 46
      },
      {
        "threshold": 89,
        "points": 47
      },
      {
        "threshold": 91,
        "points": 48
      },
      {
        "threshold": 94,
        "points": 49
      },
      {
        "threshold": 96,
        "points": 50
      },
      {
        "threshold": 99,
        "points": 51
      },
      {
        "threshold": 101,
        "points": 52
      },
      {
        "threshold": 104,
        "points": 53
      },
      {
        "threshold": 107,
        "points": 54
      },
      {
        "threshold": 109,
        "points": 55
      },
      {
        "threshold": 112,
        "points": 56
      },
      {
        "threshold": 114,
        "points": 57
      },
      {
        "threshold": 117,
        "points": 58
      },
      {
        "threshold": 120,
        "points": 59
      },
      {
        "threshold": 122,
        "points": 60
      },
      {
        "threshold": 125,
        "points": 61
      },
      {
        "threshold": 127,
        "points": 62
      },
      {
        "threshold": 130,
        "points": 63
      },
      {
        "threshold": 132,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 138,
        "points": 66
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 69
      },
      {
        "threshold": 148,
        "points": 70
      },
      {
        "threshold": 151,
        "points": 71
      },
      {
        "threshold": 153,
        "points": 72
      },
      {
        "threshold": 156,
        "points": 73
      },
      {
        "threshold": 158,
        "points": 74
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 166,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 78
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 174,
        "points": 80
      },
      {
        "threshold": 176,
        "points": 81
      },
      {
        "threshold": 179,
        "points": 82
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 184,
        "points": 84
      },
      {
        "threshold": 187,
        "points": 85
      },
      {
        "threshold": 189,
        "points": 86
      },
      {
        "threshold": 192,
        "points": 87
      },
      {
        "threshold": 194,
        "points": 88
      },
      {
        "threshold": 197,
        "points": 89
      },
      {
        "threshold": 200,
        "points": 90
      },
      {
        "threshold": 202,
        "points": 91
      },
      {
        "threshold": 205,
        "points": 92
      },
      {
        "threshold": 207,
        "points": 93
      },
      {
        "threshold": 210,
        "points": 94
      },
      {
        "threshold": 213,
        "points": 95
      },
      {
        "threshold": 215,
        "points": 96
      },
      {
        "threshold": 218,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 223,
        "points": 99
      },
      {
        "threshold": 225,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1350,
        "points": 100
      },
      {
        "threshold": 1360,
        "points": 99
      },
      {
        "threshold": 1370,
        "points": 99
      },
      {
        "threshold": 1380,
        "points": 98
      },
      {
        "threshold": 1390,
        "points": 97
      },
      {
        "threshold": 1400,
        "points": 96
      },
      {
        "threshold": 1410,
        "points": 96
      },
      {
        "threshold": 1420,
        "points": 95
      },
      {
        "threshold": 1430,
        "points": 94
      },
      {
        "threshold": 1440,
        "points": 93
      },
      {
        "threshold": 1450,
        "points": 93
      },
      {
        "threshold": 1460,
        "points": 92
      },
      {
        "threshold": 1470,
        "points": 91
      },
      {
        "threshold": 1480,
        "points": 90
      },
      {
        "threshold": 1490,
        "points": 90
      },
      {
        "threshold": 1500,
        "points": 89
      },
      {
        "threshold": 1510,
        "points": 88
      },
      {
        "threshold": 1520,
        "points": 87
      },
      {
        "threshold": 1530,
        "points": 87
      },
      {
        "threshold": 1540,
        "points": 86
      },
      {
        "threshold": 1550,
        "points": 85
      },
      {
        "threshold": 1560,
        "points": 84
      },
      {
        "threshold": 1570,
        "points": 84
      },
      {
        "threshold": 1580,
        "points": 83
      },
      {
        "threshold": 1590,
        "points": 82
      },
      {
        "threshold": 1600,
        "points": 81
      },
      {
        "threshold": 1610,
        "points": 81
      },
      {
        "threshold": 1620,
        "points": 80
      },
      {
        "threshold": 1630,
        "points": 79
      },
      {
        "threshold": 1640,
        "points": 79
      },
      {
        "threshold": 1650,
        "points": 78
      },
      {
        "threshold": 1660,
        "points": 77
      },
      {
        "threshold": 1670,
        "points": 76
      },
      {
        "threshold": 1680,
        "points": 76
      },
      {
        "threshold": 1690,
        "points": 75
      },
      {
        "threshold": 1700,
        "points": 74
      },
      {
        "threshold": 1710,
        "points": 73
      },
      {
        "threshold": 1720,
        "points": 73
      },
      {
        "threshold": 1730,
        "points": 72
      },
      {
        "threshold": 1740,
        "points": 71
      },
      {
        "threshold": 1750,
        "points": 70
      },
      {
        "threshold": 1760,
        "points": 70
      },
      {
        "threshold": 1770,
        "points": 69
      },
      {
        "threshold": 1780,
        "points": 68
      },
      {
        "threshold": 1790,
        "points": 67
      },
      {
        "threshold": 1800,
        "points": 67
      },
      {
        "threshold": 1810,
        "points": 66
      },
      {
        "threshold": 1820,
        "points": 65
      },
      {
        "threshold": 1830,
        "points": 64
      },
      {
        "threshold": 1840,
        "points": 64
      },
      {
        "threshold": 1850,
        "points": 63
      },
      {
        "threshold": 1860,
        "points": 62
      },
      {
        "threshold": 1870,
        "points": 61
      },
      {
        "threshold": 1880,
        "points": 61
      },
      {
        "threshold": 1890,
        "points": 60
      },
      {
        "threshold": 1900,
        "points": 59
      },
      {
        "threshold": 1910,
        "points": 59
      },
      {
        "threshold": 1920,
        "points": 58
      },
      {
        "threshold": 1930,
        "points": 57
      },
      {
        "threshold": 1940,
        "points": 56
      },
      {
        "threshold": 1950,
        "points": 56
      },
      {
        "threshold": 1960,
        "points": 55
      },
      {
        "threshold": 1970,
        "points": 54
      },
      {
        "threshold": 1980,
        "points": 53
      },
      {
        "threshold": 1990,
        "points": 53
      },
      {
        "threshold": 2000,
        "points": 52
      },
      {
        "threshold": 2010,
        "points": 51
      },
      {
        "threshold": 2020,
        "points": 50
      },
      {
        "threshold": 2030,
        "points": 50
      },
      {
        "threshold": 2040,
        "points": 49
      },
      {
        "threshold": 2050,
        "points": 48
      },
      {
        "threshold": 2060,
        "points": 47
      },
      {
        "threshold": 2070,
        "points": 47
      },
      {
        "threshold": 2080,
        "points": 46
      },
      {
        "threshold": 2090,
        "points": 45
      },
      {
        "threshold": 2100,
        "points": 44
      },
      {
        "threshold": 2110,
        "points": 44
      },
      {
        "threshold": 2120,
        "points": 43
      },
      {
        "threshold": 2130,
        "points": 42
      },
      {
        "threshold": 2140,
        "points": 41
      },
      {
        "threshold": 2150,
        "points": 41
      },
      {
        "threshold": 2160,
        "points": 40
      }
    ]
  }
}
