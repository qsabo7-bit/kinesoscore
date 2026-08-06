/**
 * Official Army Fitness Test (AFT) scoring scales.
 * Source: U.S. Army AFT Scoring Scales (Approved 1 May 2025, Effective 1 June 2025)
 * https://www.army.mil/aft
 *
 * Encoded: general (sex- and age-normed) Male/Female columns for
 * Max Deadlift, Hand-Release Push-ups, Sprint-Drag-Carry, Plank, and 2-Mile Run.
 * Combat specialty (sex-neutral) column and alternate cardio events are not encoded.
 *
 * Do not edit thresholds without verifying against the official scales.
 */

export const ARMY_AFT_SOURCE = {
  name: 'Army Fitness Test Scoring Scales (1 June 2025)',
  detail:
    'Official AFT general-standard tables (male/female, age-normed) from army.mil. Pass requires at least 60 points in every event (300 total). Combat specialty sex-neutral standards and alternate events are not scored here.',
  url: 'https://www.army.mil/aft',
}

/** @type {Record<string, { deadlift: {threshold:number,points:number}[], hrPushups: {threshold:number,points:number}[], sdc: {threshold:number,points:number}[], plank: {threshold:number,points:number}[], run: {threshold:number,points:number}[] }>} */
export const ARMY_AFT_CHARTS = {
  "male|17-21": {
    "deadlift": [
      {
        "threshold": 80,
        "points": 0
      },
      {
        "threshold": 90,
        "points": 10
      },
      {
        "threshold": 100,
        "points": 20
      },
      {
        "threshold": 110,
        "points": 30
      },
      {
        "threshold": 120,
        "points": 40
      },
      {
        "threshold": 130,
        "points": 50
      },
      {
        "threshold": 150,
        "points": 60
      },
      {
        "threshold": 160,
        "points": 63
      },
      {
        "threshold": 170,
        "points": 65
      },
      {
        "threshold": 180,
        "points": 67
      },
      {
        "threshold": 190,
        "points": 69
      },
      {
        "threshold": 200,
        "points": 70
      },
      {
        "threshold": 210,
        "points": 73
      },
      {
        "threshold": 220,
        "points": 75
      },
      {
        "threshold": 230,
        "points": 77
      },
      {
        "threshold": 240,
        "points": 79
      },
      {
        "threshold": 250,
        "points": 81
      },
      {
        "threshold": 260,
        "points": 83
      },
      {
        "threshold": 270,
        "points": 85
      },
      {
        "threshold": 280,
        "points": 87
      },
      {
        "threshold": 290,
        "points": 89
      },
      {
        "threshold": 300,
        "points": 92
      },
      {
        "threshold": 310,
        "points": 94
      },
      {
        "threshold": 320,
        "points": 96
      },
      {
        "threshold": 330,
        "points": 98
      },
      {
        "threshold": 340,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 15,
        "points": 60
      },
      {
        "threshold": 17,
        "points": 61
      },
      {
        "threshold": 18,
        "points": 62
      },
      {
        "threshold": 19,
        "points": 63
      },
      {
        "threshold": 21,
        "points": 64
      },
      {
        "threshold": 22,
        "points": 65
      },
      {
        "threshold": 23,
        "points": 66
      },
      {
        "threshold": 24,
        "points": 67
      },
      {
        "threshold": 25,
        "points": 68
      },
      {
        "threshold": 26,
        "points": 69
      },
      {
        "threshold": 28,
        "points": 70
      },
      {
        "threshold": 29,
        "points": 72
      },
      {
        "threshold": 30,
        "points": 73
      },
      {
        "threshold": 31,
        "points": 74
      },
      {
        "threshold": 32,
        "points": 75
      },
      {
        "threshold": 33,
        "points": 76
      },
      {
        "threshold": 34,
        "points": 77
      },
      {
        "threshold": 35,
        "points": 78
      },
      {
        "threshold": 36,
        "points": 79
      },
      {
        "threshold": 37,
        "points": 80
      },
      {
        "threshold": 38,
        "points": 81
      },
      {
        "threshold": 39,
        "points": 82
      },
      {
        "threshold": 40,
        "points": 84
      },
      {
        "threshold": 41,
        "points": 85
      },
      {
        "threshold": 42,
        "points": 86
      },
      {
        "threshold": 43,
        "points": 87
      },
      {
        "threshold": 44,
        "points": 88
      },
      {
        "threshold": 45,
        "points": 89
      },
      {
        "threshold": 46,
        "points": 90
      },
      {
        "threshold": 47,
        "points": 91
      },
      {
        "threshold": 48,
        "points": 92
      },
      {
        "threshold": 49,
        "points": 93
      },
      {
        "threshold": 51,
        "points": 94
      },
      {
        "threshold": 52,
        "points": 95
      },
      {
        "threshold": 53,
        "points": 96
      },
      {
        "threshold": 54,
        "points": 97
      },
      {
        "threshold": 55,
        "points": 98
      },
      {
        "threshold": 57,
        "points": 99
      },
      {
        "threshold": 58,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 89,
        "points": 100
      },
      {
        "threshold": 91,
        "points": 99
      },
      {
        "threshold": 94,
        "points": 98
      },
      {
        "threshold": 95,
        "points": 97
      },
      {
        "threshold": 96,
        "points": 96
      },
      {
        "threshold": 97,
        "points": 95
      },
      {
        "threshold": 99,
        "points": 94
      },
      {
        "threshold": 100,
        "points": 93
      },
      {
        "threshold": 101,
        "points": 92
      },
      {
        "threshold": 102,
        "points": 91
      },
      {
        "threshold": 103,
        "points": 90
      },
      {
        "threshold": 104,
        "points": 89
      },
      {
        "threshold": 105,
        "points": 88
      },
      {
        "threshold": 106,
        "points": 87
      },
      {
        "threshold": 107,
        "points": 86
      },
      {
        "threshold": 108,
        "points": 85
      },
      {
        "threshold": 109,
        "points": 84
      },
      {
        "threshold": 110,
        "points": 83
      },
      {
        "threshold": 111,
        "points": 82
      },
      {
        "threshold": 112,
        "points": 81
      },
      {
        "threshold": 113,
        "points": 80
      },
      {
        "threshold": 114,
        "points": 79
      },
      {
        "threshold": 115,
        "points": 78
      },
      {
        "threshold": 116,
        "points": 77
      },
      {
        "threshold": 117,
        "points": 76
      },
      {
        "threshold": 118,
        "points": 75
      },
      {
        "threshold": 119,
        "points": 74
      },
      {
        "threshold": 120,
        "points": 73
      },
      {
        "threshold": 121,
        "points": 72
      },
      {
        "threshold": 122,
        "points": 71
      },
      {
        "threshold": 123,
        "points": 70
      },
      {
        "threshold": 124,
        "points": 69
      },
      {
        "threshold": 126,
        "points": 68
      },
      {
        "threshold": 127,
        "points": 67
      },
      {
        "threshold": 128,
        "points": 66
      },
      {
        "threshold": 131,
        "points": 65
      },
      {
        "threshold": 133,
        "points": 64
      },
      {
        "threshold": 135,
        "points": 63
      },
      {
        "threshold": 137,
        "points": 62
      },
      {
        "threshold": 142,
        "points": 61
      },
      {
        "threshold": 148,
        "points": 60
      },
      {
        "threshold": 149,
        "points": 59
      },
      {
        "threshold": 150,
        "points": 58
      },
      {
        "threshold": 151,
        "points": 57
      },
      {
        "threshold": 152,
        "points": 56
      },
      {
        "threshold": 153,
        "points": 55
      },
      {
        "threshold": 154,
        "points": 54
      },
      {
        "threshold": 155,
        "points": 53
      },
      {
        "threshold": 156,
        "points": 52
      },
      {
        "threshold": 157,
        "points": 51
      },
      {
        "threshold": 158,
        "points": 50
      },
      {
        "threshold": 159,
        "points": 49
      },
      {
        "threshold": 160,
        "points": 48
      },
      {
        "threshold": 161,
        "points": 47
      },
      {
        "threshold": 162,
        "points": 46
      },
      {
        "threshold": 163,
        "points": 45
      },
      {
        "threshold": 164,
        "points": 44
      },
      {
        "threshold": 165,
        "points": 43
      },
      {
        "threshold": 166,
        "points": 42
      },
      {
        "threshold": 167,
        "points": 41
      },
      {
        "threshold": 168,
        "points": 40
      },
      {
        "threshold": 169,
        "points": 39
      },
      {
        "threshold": 170,
        "points": 38
      },
      {
        "threshold": 171,
        "points": 37
      },
      {
        "threshold": 172,
        "points": 36
      },
      {
        "threshold": 173,
        "points": 35
      },
      {
        "threshold": 174,
        "points": 34
      },
      {
        "threshold": 175,
        "points": 33
      },
      {
        "threshold": 176,
        "points": 32
      },
      {
        "threshold": 177,
        "points": 31
      },
      {
        "threshold": 178,
        "points": 30
      },
      {
        "threshold": 179,
        "points": 29
      },
      {
        "threshold": 180,
        "points": 28
      },
      {
        "threshold": 181,
        "points": 27
      },
      {
        "threshold": 182,
        "points": 26
      },
      {
        "threshold": 183,
        "points": 25
      },
      {
        "threshold": 184,
        "points": 24
      },
      {
        "threshold": 185,
        "points": 23
      },
      {
        "threshold": 186,
        "points": 22
      },
      {
        "threshold": 187,
        "points": 21
      },
      {
        "threshold": 188,
        "points": 20
      },
      {
        "threshold": 189,
        "points": 19
      },
      {
        "threshold": 190,
        "points": 18
      },
      {
        "threshold": 191,
        "points": 17
      },
      {
        "threshold": 192,
        "points": 16
      },
      {
        "threshold": 193,
        "points": 15
      },
      {
        "threshold": 194,
        "points": 14
      },
      {
        "threshold": 195,
        "points": 13
      },
      {
        "threshold": 196,
        "points": 12
      },
      {
        "threshold": 197,
        "points": 11
      },
      {
        "threshold": 198,
        "points": 10
      },
      {
        "threshold": 199,
        "points": 9
      },
      {
        "threshold": 200,
        "points": 8
      },
      {
        "threshold": 201,
        "points": 7
      },
      {
        "threshold": 202,
        "points": 6
      },
      {
        "threshold": 203,
        "points": 5
      },
      {
        "threshold": 204,
        "points": 4
      },
      {
        "threshold": 205,
        "points": 3
      },
      {
        "threshold": 206,
        "points": 2
      },
      {
        "threshold": 207,
        "points": 1
      },
      {
        "threshold": 208,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 61,
        "points": 2
      },
      {
        "threshold": 62,
        "points": 4
      },
      {
        "threshold": 63,
        "points": 6
      },
      {
        "threshold": 64,
        "points": 8
      },
      {
        "threshold": 65,
        "points": 10
      },
      {
        "threshold": 66,
        "points": 12
      },
      {
        "threshold": 67,
        "points": 14
      },
      {
        "threshold": 68,
        "points": 16
      },
      {
        "threshold": 69,
        "points": 18
      },
      {
        "threshold": 70,
        "points": 20
      },
      {
        "threshold": 71,
        "points": 22
      },
      {
        "threshold": 72,
        "points": 24
      },
      {
        "threshold": 73,
        "points": 26
      },
      {
        "threshold": 74,
        "points": 28
      },
      {
        "threshold": 75,
        "points": 30
      },
      {
        "threshold": 76,
        "points": 32
      },
      {
        "threshold": 77,
        "points": 34
      },
      {
        "threshold": 78,
        "points": 36
      },
      {
        "threshold": 79,
        "points": 38
      },
      {
        "threshold": 80,
        "points": 40
      },
      {
        "threshold": 81,
        "points": 42
      },
      {
        "threshold": 82,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 46
      },
      {
        "threshold": 84,
        "points": 48
      },
      {
        "threshold": 85,
        "points": 50
      },
      {
        "threshold": 86,
        "points": 52
      },
      {
        "threshold": 87,
        "points": 54
      },
      {
        "threshold": 88,
        "points": 56
      },
      {
        "threshold": 89,
        "points": 58
      },
      {
        "threshold": 90,
        "points": 60
      },
      {
        "threshold": 93,
        "points": 61
      },
      {
        "threshold": 97,
        "points": 62
      },
      {
        "threshold": 100,
        "points": 63
      },
      {
        "threshold": 103,
        "points": 64
      },
      {
        "threshold": 106,
        "points": 65
      },
      {
        "threshold": 109,
        "points": 66
      },
      {
        "threshold": 113,
        "points": 67
      },
      {
        "threshold": 116,
        "points": 68
      },
      {
        "threshold": 119,
        "points": 69
      },
      {
        "threshold": 122,
        "points": 70
      },
      {
        "threshold": 126,
        "points": 71
      },
      {
        "threshold": 129,
        "points": 72
      },
      {
        "threshold": 132,
        "points": 73
      },
      {
        "threshold": 135,
        "points": 74
      },
      {
        "threshold": 139,
        "points": 75
      },
      {
        "threshold": 142,
        "points": 76
      },
      {
        "threshold": 145,
        "points": 77
      },
      {
        "threshold": 149,
        "points": 78
      },
      {
        "threshold": 152,
        "points": 79
      },
      {
        "threshold": 155,
        "points": 80
      },
      {
        "threshold": 158,
        "points": 81
      },
      {
        "threshold": 161,
        "points": 82
      },
      {
        "threshold": 165,
        "points": 83
      },
      {
        "threshold": 168,
        "points": 84
      },
      {
        "threshold": 171,
        "points": 85
      },
      {
        "threshold": 175,
        "points": 86
      },
      {
        "threshold": 178,
        "points": 87
      },
      {
        "threshold": 181,
        "points": 88
      },
      {
        "threshold": 184,
        "points": 89
      },
      {
        "threshold": 188,
        "points": 90
      },
      {
        "threshold": 191,
        "points": 91
      },
      {
        "threshold": 194,
        "points": 92
      },
      {
        "threshold": 197,
        "points": 93
      },
      {
        "threshold": 201,
        "points": 94
      },
      {
        "threshold": 204,
        "points": 95
      },
      {
        "threshold": 207,
        "points": 96
      },
      {
        "threshold": 210,
        "points": 97
      },
      {
        "threshold": 214,
        "points": 98
      },
      {
        "threshold": 217,
        "points": 99
      },
      {
        "threshold": 220,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 802,
        "points": 100
      },
      {
        "threshold": 827,
        "points": 99
      },
      {
        "threshold": 844,
        "points": 98
      },
      {
        "threshold": 859,
        "points": 97
      },
      {
        "threshold": 872,
        "points": 96
      },
      {
        "threshold": 885,
        "points": 95
      },
      {
        "threshold": 896,
        "points": 94
      },
      {
        "threshold": 907,
        "points": 93
      },
      {
        "threshold": 918,
        "points": 92
      },
      {
        "threshold": 929,
        "points": 91
      },
      {
        "threshold": 939,
        "points": 90
      },
      {
        "threshold": 949,
        "points": 89
      },
      {
        "threshold": 959,
        "points": 88
      },
      {
        "threshold": 969,
        "points": 87
      },
      {
        "threshold": 979,
        "points": 86
      },
      {
        "threshold": 988,
        "points": 85
      },
      {
        "threshold": 998,
        "points": 84
      },
      {
        "threshold": 1008,
        "points": 83
      },
      {
        "threshold": 1017,
        "points": 82
      },
      {
        "threshold": 1027,
        "points": 81
      },
      {
        "threshold": 1033,
        "points": 80
      },
      {
        "threshold": 1037,
        "points": 79
      },
      {
        "threshold": 1045,
        "points": 78
      },
      {
        "threshold": 1054,
        "points": 77
      },
      {
        "threshold": 1063,
        "points": 76
      },
      {
        "threshold": 1072,
        "points": 75
      },
      {
        "threshold": 1080,
        "points": 74
      },
      {
        "threshold": 1089,
        "points": 73
      },
      {
        "threshold": 1098,
        "points": 72
      },
      {
        "threshold": 1107,
        "points": 71
      },
      {
        "threshold": 1115,
        "points": 70
      },
      {
        "threshold": 1125,
        "points": 69
      },
      {
        "threshold": 1134,
        "points": 68
      },
      {
        "threshold": 1143,
        "points": 67
      },
      {
        "threshold": 1153,
        "points": 66
      },
      {
        "threshold": 1163,
        "points": 65
      },
      {
        "threshold": 1173,
        "points": 64
      },
      {
        "threshold": 1183,
        "points": 63
      },
      {
        "threshold": 1194,
        "points": 61
      },
      {
        "threshold": 1197,
        "points": 60
      },
      {
        "threshold": 1200,
        "points": 59
      },
      {
        "threshold": 1203,
        "points": 58
      },
      {
        "threshold": 1205,
        "points": 57
      },
      {
        "threshold": 1208,
        "points": 56
      },
      {
        "threshold": 1211,
        "points": 55
      },
      {
        "threshold": 1214,
        "points": 54
      },
      {
        "threshold": 1217,
        "points": 53
      },
      {
        "threshold": 1219,
        "points": 52
      },
      {
        "threshold": 1222,
        "points": 51
      },
      {
        "threshold": 1225,
        "points": 50
      },
      {
        "threshold": 1228,
        "points": 49
      },
      {
        "threshold": 1231,
        "points": 48
      },
      {
        "threshold": 1233,
        "points": 47
      },
      {
        "threshold": 1236,
        "points": 46
      },
      {
        "threshold": 1239,
        "points": 45
      },
      {
        "threshold": 1242,
        "points": 44
      },
      {
        "threshold": 1244,
        "points": 43
      },
      {
        "threshold": 1247,
        "points": 42
      },
      {
        "threshold": 1250,
        "points": 41
      },
      {
        "threshold": 1253,
        "points": 40
      },
      {
        "threshold": 1256,
        "points": 39
      },
      {
        "threshold": 1258,
        "points": 38
      },
      {
        "threshold": 1261,
        "points": 37
      },
      {
        "threshold": 1264,
        "points": 36
      },
      {
        "threshold": 1267,
        "points": 35
      },
      {
        "threshold": 1270,
        "points": 34
      },
      {
        "threshold": 1272,
        "points": 33
      },
      {
        "threshold": 1275,
        "points": 32
      },
      {
        "threshold": 1278,
        "points": 31
      },
      {
        "threshold": 1281,
        "points": 30
      },
      {
        "threshold": 1284,
        "points": 29
      },
      {
        "threshold": 1286,
        "points": 28
      },
      {
        "threshold": 1289,
        "points": 27
      },
      {
        "threshold": 1292,
        "points": 26
      },
      {
        "threshold": 1295,
        "points": 25
      },
      {
        "threshold": 1298,
        "points": 24
      },
      {
        "threshold": 1300,
        "points": 23
      },
      {
        "threshold": 1303,
        "points": 22
      },
      {
        "threshold": 1306,
        "points": 21
      },
      {
        "threshold": 1309,
        "points": 20
      },
      {
        "threshold": 1312,
        "points": 19
      },
      {
        "threshold": 1314,
        "points": 18
      },
      {
        "threshold": 1317,
        "points": 17
      },
      {
        "threshold": 1320,
        "points": 16
      },
      {
        "threshold": 1323,
        "points": 15
      },
      {
        "threshold": 1326,
        "points": 14
      },
      {
        "threshold": 1328,
        "points": 13
      },
      {
        "threshold": 1331,
        "points": 12
      },
      {
        "threshold": 1334,
        "points": 11
      },
      {
        "threshold": 1337,
        "points": 10
      },
      {
        "threshold": 1339,
        "points": 9
      },
      {
        "threshold": 1342,
        "points": 8
      },
      {
        "threshold": 1345,
        "points": 7
      },
      {
        "threshold": 1348,
        "points": 6
      },
      {
        "threshold": 1351,
        "points": 5
      },
      {
        "threshold": 1353,
        "points": 4
      },
      {
        "threshold": 1356,
        "points": 3
      },
      {
        "threshold": 1359,
        "points": 2
      },
      {
        "threshold": 1362,
        "points": 1
      },
      {
        "threshold": 1365,
        "points": 0
      }
    ]
  },
  "female|17-21": {
    "deadlift": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 70,
        "points": 10
      },
      {
        "threshold": 80,
        "points": 20
      },
      {
        "threshold": 90,
        "points": 30
      },
      {
        "threshold": 100,
        "points": 40
      },
      {
        "threshold": 110,
        "points": 50
      },
      {
        "threshold": 120,
        "points": 60
      },
      {
        "threshold": 130,
        "points": 68
      },
      {
        "threshold": 140,
        "points": 75
      },
      {
        "threshold": 150,
        "points": 80
      },
      {
        "threshold": 160,
        "points": 84
      },
      {
        "threshold": 170,
        "points": 88
      },
      {
        "threshold": 180,
        "points": 91
      },
      {
        "threshold": 190,
        "points": 94
      },
      {
        "threshold": 200,
        "points": 97
      },
      {
        "threshold": 210,
        "points": 98
      },
      {
        "threshold": 220,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 11,
        "points": 60
      },
      {
        "threshold": 12,
        "points": 62
      },
      {
        "threshold": 13,
        "points": 64
      },
      {
        "threshold": 14,
        "points": 66
      },
      {
        "threshold": 15,
        "points": 68
      },
      {
        "threshold": 18,
        "points": 70
      },
      {
        "threshold": 19,
        "points": 73
      },
      {
        "threshold": 20,
        "points": 76
      },
      {
        "threshold": 21,
        "points": 78
      },
      {
        "threshold": 22,
        "points": 79
      },
      {
        "threshold": 23,
        "points": 80
      },
      {
        "threshold": 24,
        "points": 81
      },
      {
        "threshold": 25,
        "points": 83
      },
      {
        "threshold": 26,
        "points": 84
      },
      {
        "threshold": 27,
        "points": 85
      },
      {
        "threshold": 28,
        "points": 86
      },
      {
        "threshold": 29,
        "points": 87
      },
      {
        "threshold": 30,
        "points": 88
      },
      {
        "threshold": 31,
        "points": 89
      },
      {
        "threshold": 32,
        "points": 90
      },
      {
        "threshold": 33,
        "points": 91
      },
      {
        "threshold": 34,
        "points": 92
      },
      {
        "threshold": 35,
        "points": 93
      },
      {
        "threshold": 36,
        "points": 94
      },
      {
        "threshold": 38,
        "points": 95
      },
      {
        "threshold": 40,
        "points": 96
      },
      {
        "threshold": 42,
        "points": 97
      },
      {
        "threshold": 44,
        "points": 98
      },
      {
        "threshold": 48,
        "points": 99
      },
      {
        "threshold": 53,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 115,
        "points": 100
      },
      {
        "threshold": 119,
        "points": 99
      },
      {
        "threshold": 122,
        "points": 98
      },
      {
        "threshold": 125,
        "points": 97
      },
      {
        "threshold": 126,
        "points": 96
      },
      {
        "threshold": 128,
        "points": 95
      },
      {
        "threshold": 130,
        "points": 94
      },
      {
        "threshold": 132,
        "points": 93
      },
      {
        "threshold": 133,
        "points": 92
      },
      {
        "threshold": 134,
        "points": 91
      },
      {
        "threshold": 136,
        "points": 90
      },
      {
        "threshold": 137,
        "points": 89
      },
      {
        "threshold": 138,
        "points": 88
      },
      {
        "threshold": 140,
        "points": 87
      },
      {
        "threshold": 141,
        "points": 86
      },
      {
        "threshold": 142,
        "points": 85
      },
      {
        "threshold": 143,
        "points": 84
      },
      {
        "threshold": 144,
        "points": 83
      },
      {
        "threshold": 145,
        "points": 82
      },
      {
        "threshold": 146,
        "points": 81
      },
      {
        "threshold": 148,
        "points": 80
      },
      {
        "threshold": 149,
        "points": 79
      },
      {
        "threshold": 150,
        "points": 78
      },
      {
        "threshold": 151,
        "points": 77
      },
      {
        "threshold": 153,
        "points": 76
      },
      {
        "threshold": 154,
        "points": 75
      },
      {
        "threshold": 155,
        "points": 74
      },
      {
        "threshold": 157,
        "points": 73
      },
      {
        "threshold": 159,
        "points": 72
      },
      {
        "threshold": 160,
        "points": 71
      },
      {
        "threshold": 161,
        "points": 70
      },
      {
        "threshold": 164,
        "points": 69
      },
      {
        "threshold": 165,
        "points": 68
      },
      {
        "threshold": 167,
        "points": 67
      },
      {
        "threshold": 169,
        "points": 66
      },
      {
        "threshold": 173,
        "points": 65
      },
      {
        "threshold": 175,
        "points": 64
      },
      {
        "threshold": 178,
        "points": 63
      },
      {
        "threshold": 180,
        "points": 62
      },
      {
        "threshold": 188,
        "points": 61
      },
      {
        "threshold": 195,
        "points": 60
      },
      {
        "threshold": 196,
        "points": 59
      },
      {
        "threshold": 197,
        "points": 58
      },
      {
        "threshold": 198,
        "points": 57
      },
      {
        "threshold": 199,
        "points": 56
      },
      {
        "threshold": 200,
        "points": 55
      },
      {
        "threshold": 201,
        "points": 54
      },
      {
        "threshold": 202,
        "points": 53
      },
      {
        "threshold": 203,
        "points": 52
      },
      {
        "threshold": 204,
        "points": 51
      },
      {
        "threshold": 205,
        "points": 50
      },
      {
        "threshold": 206,
        "points": 49
      },
      {
        "threshold": 207,
        "points": 48
      },
      {
        "threshold": 208,
        "points": 47
      },
      {
        "threshold": 209,
        "points": 46
      },
      {
        "threshold": 210,
        "points": 45
      },
      {
        "threshold": 211,
        "points": 44
      },
      {
        "threshold": 212,
        "points": 43
      },
      {
        "threshold": 213,
        "points": 42
      },
      {
        "threshold": 214,
        "points": 41
      },
      {
        "threshold": 215,
        "points": 40
      },
      {
        "threshold": 216,
        "points": 39
      },
      {
        "threshold": 217,
        "points": 38
      },
      {
        "threshold": 218,
        "points": 37
      },
      {
        "threshold": 219,
        "points": 36
      },
      {
        "threshold": 220,
        "points": 35
      },
      {
        "threshold": 221,
        "points": 34
      },
      {
        "threshold": 222,
        "points": 33
      },
      {
        "threshold": 223,
        "points": 32
      },
      {
        "threshold": 224,
        "points": 31
      },
      {
        "threshold": 225,
        "points": 30
      },
      {
        "threshold": 226,
        "points": 29
      },
      {
        "threshold": 227,
        "points": 28
      },
      {
        "threshold": 228,
        "points": 27
      },
      {
        "threshold": 229,
        "points": 26
      },
      {
        "threshold": 230,
        "points": 25
      },
      {
        "threshold": 231,
        "points": 24
      },
      {
        "threshold": 232,
        "points": 23
      },
      {
        "threshold": 233,
        "points": 22
      },
      {
        "threshold": 234,
        "points": 21
      },
      {
        "threshold": 235,
        "points": 20
      },
      {
        "threshold": 236,
        "points": 19
      },
      {
        "threshold": 237,
        "points": 18
      },
      {
        "threshold": 238,
        "points": 17
      },
      {
        "threshold": 239,
        "points": 16
      },
      {
        "threshold": 240,
        "points": 15
      },
      {
        "threshold": 241,
        "points": 14
      },
      {
        "threshold": 242,
        "points": 13
      },
      {
        "threshold": 243,
        "points": 12
      },
      {
        "threshold": 244,
        "points": 11
      },
      {
        "threshold": 245,
        "points": 10
      },
      {
        "threshold": 246,
        "points": 9
      },
      {
        "threshold": 247,
        "points": 8
      },
      {
        "threshold": 248,
        "points": 7
      },
      {
        "threshold": 249,
        "points": 6
      },
      {
        "threshold": 250,
        "points": 5
      },
      {
        "threshold": 251,
        "points": 4
      },
      {
        "threshold": 252,
        "points": 3
      },
      {
        "threshold": 253,
        "points": 2
      },
      {
        "threshold": 254,
        "points": 1
      },
      {
        "threshold": 255,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 61,
        "points": 2
      },
      {
        "threshold": 62,
        "points": 4
      },
      {
        "threshold": 63,
        "points": 6
      },
      {
        "threshold": 64,
        "points": 8
      },
      {
        "threshold": 65,
        "points": 10
      },
      {
        "threshold": 66,
        "points": 12
      },
      {
        "threshold": 67,
        "points": 14
      },
      {
        "threshold": 68,
        "points": 16
      },
      {
        "threshold": 69,
        "points": 18
      },
      {
        "threshold": 70,
        "points": 20
      },
      {
        "threshold": 71,
        "points": 22
      },
      {
        "threshold": 72,
        "points": 24
      },
      {
        "threshold": 73,
        "points": 26
      },
      {
        "threshold": 74,
        "points": 28
      },
      {
        "threshold": 75,
        "points": 30
      },
      {
        "threshold": 76,
        "points": 32
      },
      {
        "threshold": 77,
        "points": 34
      },
      {
        "threshold": 78,
        "points": 36
      },
      {
        "threshold": 79,
        "points": 38
      },
      {
        "threshold": 80,
        "points": 40
      },
      {
        "threshold": 81,
        "points": 42
      },
      {
        "threshold": 82,
        "points": 44
      },
      {
        "threshold": 83,
        "points": 46
      },
      {
        "threshold": 84,
        "points": 48
      },
      {
        "threshold": 85,
        "points": 50
      },
      {
        "threshold": 86,
        "points": 52
      },
      {
        "threshold": 87,
        "points": 54
      },
      {
        "threshold": 88,
        "points": 56
      },
      {
        "threshold": 89,
        "points": 58
      },
      {
        "threshold": 90,
        "points": 60
      },
      {
        "threshold": 93,
        "points": 61
      },
      {
        "threshold": 97,
        "points": 62
      },
      {
        "threshold": 100,
        "points": 63
      },
      {
        "threshold": 103,
        "points": 64
      },
      {
        "threshold": 106,
        "points": 65
      },
      {
        "threshold": 109,
        "points": 66
      },
      {
        "threshold": 113,
        "points": 67
      },
      {
        "threshold": 116,
        "points": 68
      },
      {
        "threshold": 119,
        "points": 69
      },
      {
        "threshold": 122,
        "points": 70
      },
      {
        "threshold": 126,
        "points": 71
      },
      {
        "threshold": 129,
        "points": 72
      },
      {
        "threshold": 132,
        "points": 73
      },
      {
        "threshold": 135,
        "points": 74
      },
      {
        "threshold": 139,
        "points": 75
      },
      {
        "threshold": 142,
        "points": 76
      },
      {
        "threshold": 145,
        "points": 77
      },
      {
        "threshold": 149,
        "points": 78
      },
      {
        "threshold": 152,
        "points": 79
      },
      {
        "threshold": 155,
        "points": 80
      },
      {
        "threshold": 158,
        "points": 81
      },
      {
        "threshold": 161,
        "points": 82
      },
      {
        "threshold": 165,
        "points": 83
      },
      {
        "threshold": 168,
        "points": 84
      },
      {
        "threshold": 171,
        "points": 85
      },
      {
        "threshold": 175,
        "points": 86
      },
      {
        "threshold": 178,
        "points": 87
      },
      {
        "threshold": 181,
        "points": 88
      },
      {
        "threshold": 184,
        "points": 89
      },
      {
        "threshold": 188,
        "points": 90
      },
      {
        "threshold": 191,
        "points": 91
      },
      {
        "threshold": 194,
        "points": 92
      },
      {
        "threshold": 197,
        "points": 93
      },
      {
        "threshold": 201,
        "points": 94
      },
      {
        "threshold": 204,
        "points": 95
      },
      {
        "threshold": 207,
        "points": 96
      },
      {
        "threshold": 210,
        "points": 97
      },
      {
        "threshold": 214,
        "points": 98
      },
      {
        "threshold": 217,
        "points": 99
      },
      {
        "threshold": 220,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 960,
        "points": 100
      },
      {
        "threshold": 988,
        "points": 99
      },
      {
        "threshold": 1009,
        "points": 98
      },
      {
        "threshold": 1027,
        "points": 97
      },
      {
        "threshold": 1043,
        "points": 96
      },
      {
        "threshold": 1057,
        "points": 95
      },
      {
        "threshold": 1070,
        "points": 94
      },
      {
        "threshold": 1082,
        "points": 93
      },
      {
        "threshold": 1093,
        "points": 92
      },
      {
        "threshold": 1104,
        "points": 91
      },
      {
        "threshold": 1114,
        "points": 86
      },
      {
        "threshold": 1121,
        "points": 90
      },
      {
        "threshold": 1124,
        "points": 85
      },
      {
        "threshold": 1131,
        "points": 89
      },
      {
        "threshold": 1134,
        "points": 84
      },
      {
        "threshold": 1143,
        "points": 83
      },
      {
        "threshold": 1152,
        "points": 82
      },
      {
        "threshold": 1161,
        "points": 81
      },
      {
        "threshold": 1170,
        "points": 80
      },
      {
        "threshold": 1179,
        "points": 79
      },
      {
        "threshold": 1187,
        "points": 78
      },
      {
        "threshold": 1196,
        "points": 77
      },
      {
        "threshold": 1205,
        "points": 76
      },
      {
        "threshold": 1213,
        "points": 75
      },
      {
        "threshold": 1224,
        "points": 74
      },
      {
        "threshold": 1235,
        "points": 73
      },
      {
        "threshold": 1245,
        "points": 72
      },
      {
        "threshold": 1256,
        "points": 71
      },
      {
        "threshold": 1266,
        "points": 70
      },
      {
        "threshold": 1277,
        "points": 69
      },
      {
        "threshold": 1288,
        "points": 68
      },
      {
        "threshold": 1309,
        "points": 67
      },
      {
        "threshold": 1321,
        "points": 66
      },
      {
        "threshold": 1332,
        "points": 65
      },
      {
        "threshold": 1345,
        "points": 64
      },
      {
        "threshold": 1358,
        "points": 63
      },
      {
        "threshold": 1373,
        "points": 62
      },
      {
        "threshold": 1375,
        "points": 60
      },
      {
        "threshold": 1378,
        "points": 59
      },
      {
        "threshold": 1381,
        "points": 58
      },
      {
        "threshold": 1384,
        "points": 57
      },
      {
        "threshold": 1387,
        "points": 56
      },
      {
        "threshold": 1390,
        "points": 55
      },
      {
        "threshold": 1392,
        "points": 54
      },
      {
        "threshold": 1395,
        "points": 53
      },
      {
        "threshold": 1398,
        "points": 52
      },
      {
        "threshold": 1401,
        "points": 51
      },
      {
        "threshold": 1404,
        "points": 50
      },
      {
        "threshold": 1407,
        "points": 49
      },
      {
        "threshold": 1410,
        "points": 48
      },
      {
        "threshold": 1413,
        "points": 47
      },
      {
        "threshold": 1416,
        "points": 46
      },
      {
        "threshold": 1419,
        "points": 45
      },
      {
        "threshold": 1422,
        "points": 44
      },
      {
        "threshold": 1424,
        "points": 43
      },
      {
        "threshold": 1427,
        "points": 42
      },
      {
        "threshold": 1430,
        "points": 41
      },
      {
        "threshold": 1433,
        "points": 40
      },
      {
        "threshold": 1436,
        "points": 39
      },
      {
        "threshold": 1439,
        "points": 38
      },
      {
        "threshold": 1442,
        "points": 37
      },
      {
        "threshold": 1445,
        "points": 36
      },
      {
        "threshold": 1448,
        "points": 35
      },
      {
        "threshold": 1451,
        "points": 34
      },
      {
        "threshold": 1454,
        "points": 33
      },
      {
        "threshold": 1456,
        "points": 32
      },
      {
        "threshold": 1459,
        "points": 31
      },
      {
        "threshold": 1462,
        "points": 30
      },
      {
        "threshold": 1465,
        "points": 29
      },
      {
        "threshold": 1468,
        "points": 28
      },
      {
        "threshold": 1471,
        "points": 27
      },
      {
        "threshold": 1474,
        "points": 26
      },
      {
        "threshold": 1477,
        "points": 25
      },
      {
        "threshold": 1480,
        "points": 24
      },
      {
        "threshold": 1483,
        "points": 23
      },
      {
        "threshold": 1486,
        "points": 22
      },
      {
        "threshold": 1488,
        "points": 21
      },
      {
        "threshold": 1491,
        "points": 20
      },
      {
        "threshold": 1494,
        "points": 19
      },
      {
        "threshold": 1497,
        "points": 18
      },
      {
        "threshold": 1500,
        "points": 17
      },
      {
        "threshold": 1503,
        "points": 16
      },
      {
        "threshold": 1506,
        "points": 15
      },
      {
        "threshold": 1509,
        "points": 14
      },
      {
        "threshold": 1512,
        "points": 13
      },
      {
        "threshold": 1515,
        "points": 12
      },
      {
        "threshold": 1518,
        "points": 11
      },
      {
        "threshold": 1520,
        "points": 10
      },
      {
        "threshold": 1523,
        "points": 9
      },
      {
        "threshold": 1526,
        "points": 8
      },
      {
        "threshold": 1529,
        "points": 7
      },
      {
        "threshold": 1532,
        "points": 6
      },
      {
        "threshold": 1535,
        "points": 5
      },
      {
        "threshold": 1538,
        "points": 4
      },
      {
        "threshold": 1541,
        "points": 3
      },
      {
        "threshold": 1544,
        "points": 2
      },
      {
        "threshold": 1547,
        "points": 1
      },
      {
        "threshold": 1550,
        "points": 0
      }
    ]
  },
  "male|22-26": {
    "deadlift": [
      {
        "threshold": 80,
        "points": 0
      },
      {
        "threshold": 90,
        "points": 10
      },
      {
        "threshold": 100,
        "points": 20
      },
      {
        "threshold": 110,
        "points": 30
      },
      {
        "threshold": 120,
        "points": 40
      },
      {
        "threshold": 130,
        "points": 50
      },
      {
        "threshold": 150,
        "points": 60
      },
      {
        "threshold": 160,
        "points": 63
      },
      {
        "threshold": 170,
        "points": 65
      },
      {
        "threshold": 180,
        "points": 67
      },
      {
        "threshold": 190,
        "points": 70
      },
      {
        "threshold": 200,
        "points": 71
      },
      {
        "threshold": 210,
        "points": 73
      },
      {
        "threshold": 220,
        "points": 75
      },
      {
        "threshold": 230,
        "points": 77
      },
      {
        "threshold": 240,
        "points": 79
      },
      {
        "threshold": 250,
        "points": 81
      },
      {
        "threshold": 260,
        "points": 83
      },
      {
        "threshold": 270,
        "points": 85
      },
      {
        "threshold": 280,
        "points": 87
      },
      {
        "threshold": 290,
        "points": 89
      },
      {
        "threshold": 300,
        "points": 91
      },
      {
        "threshold": 310,
        "points": 93
      },
      {
        "threshold": 320,
        "points": 95
      },
      {
        "threshold": 330,
        "points": 97
      },
      {
        "threshold": 340,
        "points": 99
      },
      {
        "threshold": 350,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 14,
        "points": 60
      },
      {
        "threshold": 15,
        "points": 61
      },
      {
        "threshold": 17,
        "points": 62
      },
      {
        "threshold": 18,
        "points": 63
      },
      {
        "threshold": 19,
        "points": 64
      },
      {
        "threshold": 21,
        "points": 65
      },
      {
        "threshold": 22,
        "points": 66
      },
      {
        "threshold": 23,
        "points": 67
      },
      {
        "threshold": 24,
        "points": 68
      },
      {
        "threshold": 25,
        "points": 69
      },
      {
        "threshold": 26,
        "points": 70
      },
      {
        "threshold": 27,
        "points": 71
      },
      {
        "threshold": 28,
        "points": 72
      },
      {
        "threshold": 29,
        "points": 73
      },
      {
        "threshold": 30,
        "points": 74
      },
      {
        "threshold": 31,
        "points": 75
      },
      {
        "threshold": 32,
        "points": 76
      },
      {
        "threshold": 34,
        "points": 77
      },
      {
        "threshold": 35,
        "points": 78
      },
      {
        "threshold": 36,
        "points": 79
      },
      {
        "threshold": 37,
        "points": 80
      },
      {
        "threshold": 38,
        "points": 81
      },
      {
        "threshold": 39,
        "points": 82
      },
      {
        "threshold": 40,
        "points": 83
      },
      {
        "threshold": 41,
        "points": 84
      },
      {
        "threshold": 42,
        "points": 85
      },
      {
        "threshold": 43,
        "points": 86
      },
      {
        "threshold": 44,
        "points": 87
      },
      {
        "threshold": 45,
        "points": 88
      },
      {
        "threshold": 46,
        "points": 89
      },
      {
        "threshold": 48,
        "points": 90
      },
      {
        "threshold": 49,
        "points": 91
      },
      {
        "threshold": 50,
        "points": 92
      },
      {
        "threshold": 51,
        "points": 93
      },
      {
        "threshold": 52,
        "points": 94
      },
      {
        "threshold": 53,
        "points": 95
      },
      {
        "threshold": 55,
        "points": 96
      },
      {
        "threshold": 56,
        "points": 97
      },
      {
        "threshold": 57,
        "points": 98
      },
      {
        "threshold": 59,
        "points": 99
      },
      {
        "threshold": 61,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 90,
        "points": 100
      },
      {
        "threshold": 92,
        "points": 99
      },
      {
        "threshold": 93,
        "points": 98
      },
      {
        "threshold": 94,
        "points": 97
      },
      {
        "threshold": 96,
        "points": 96
      },
      {
        "threshold": 97,
        "points": 95
      },
      {
        "threshold": 99,
        "points": 94
      },
      {
        "threshold": 100,
        "points": 93
      },
      {
        "threshold": 101,
        "points": 92
      },
      {
        "threshold": 102,
        "points": 91
      },
      {
        "threshold": 103,
        "points": 90
      },
      {
        "threshold": 104,
        "points": 89
      },
      {
        "threshold": 105,
        "points": 88
      },
      {
        "threshold": 106,
        "points": 87
      },
      {
        "threshold": 107,
        "points": 86
      },
      {
        "threshold": 108,
        "points": 85
      },
      {
        "threshold": 109,
        "points": 84
      },
      {
        "threshold": 110,
        "points": 83
      },
      {
        "threshold": 111,
        "points": 82
      },
      {
        "threshold": 112,
        "points": 81
      },
      {
        "threshold": 113,
        "points": 80
      },
      {
        "threshold": 114,
        "points": 79
      },
      {
        "threshold": 115,
        "points": 78
      },
      {
        "threshold": 116,
        "points": 77
      },
      {
        "threshold": 118,
        "points": 76
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 120,
        "points": 74
      },
      {
        "threshold": 121,
        "points": 73
      },
      {
        "threshold": 122,
        "points": 72
      },
      {
        "threshold": 123,
        "points": 71
      },
      {
        "threshold": 125,
        "points": 70
      },
      {
        "threshold": 127,
        "points": 69
      },
      {
        "threshold": 128,
        "points": 68
      },
      {
        "threshold": 130,
        "points": 67
      },
      {
        "threshold": 131,
        "points": 66
      },
      {
        "threshold": 134,
        "points": 65
      },
      {
        "threshold": 136,
        "points": 64
      },
      {
        "threshold": 138,
        "points": 63
      },
      {
        "threshold": 141,
        "points": 62
      },
      {
        "threshold": 146,
        "points": 61
      },
      {
        "threshold": 151,
        "points": 60
      },
      {
        "threshold": 152,
        "points": 59
      },
      {
        "threshold": 153,
        "points": 58
      },
      {
        "threshold": 154,
        "points": 57
      },
      {
        "threshold": 155,
        "points": 56
      },
      {
        "threshold": 156,
        "points": 55
      },
      {
        "threshold": 157,
        "points": 54
      },
      {
        "threshold": 158,
        "points": 53
      },
      {
        "threshold": 159,
        "points": 52
      },
      {
        "threshold": 160,
        "points": 51
      },
      {
        "threshold": 161,
        "points": 50
      },
      {
        "threshold": 162,
        "points": 49
      },
      {
        "threshold": 163,
        "points": 48
      },
      {
        "threshold": 164,
        "points": 47
      },
      {
        "threshold": 165,
        "points": 46
      },
      {
        "threshold": 166,
        "points": 45
      },
      {
        "threshold": 167,
        "points": 44
      },
      {
        "threshold": 168,
        "points": 43
      },
      {
        "threshold": 169,
        "points": 42
      },
      {
        "threshold": 170,
        "points": 41
      },
      {
        "threshold": 171,
        "points": 40
      },
      {
        "threshold": 172,
        "points": 39
      },
      {
        "threshold": 173,
        "points": 38
      },
      {
        "threshold": 174,
        "points": 37
      },
      {
        "threshold": 175,
        "points": 36
      },
      {
        "threshold": 176,
        "points": 35
      },
      {
        "threshold": 177,
        "points": 34
      },
      {
        "threshold": 178,
        "points": 33
      },
      {
        "threshold": 179,
        "points": 32
      },
      {
        "threshold": 180,
        "points": 31
      },
      {
        "threshold": 181,
        "points": 30
      },
      {
        "threshold": 182,
        "points": 29
      },
      {
        "threshold": 183,
        "points": 28
      },
      {
        "threshold": 184,
        "points": 27
      },
      {
        "threshold": 185,
        "points": 26
      },
      {
        "threshold": 186,
        "points": 25
      },
      {
        "threshold": 187,
        "points": 24
      },
      {
        "threshold": 188,
        "points": 23
      },
      {
        "threshold": 189,
        "points": 22
      },
      {
        "threshold": 190,
        "points": 21
      },
      {
        "threshold": 191,
        "points": 20
      },
      {
        "threshold": 192,
        "points": 19
      },
      {
        "threshold": 193,
        "points": 18
      },
      {
        "threshold": 194,
        "points": 17
      },
      {
        "threshold": 195,
        "points": 16
      },
      {
        "threshold": 196,
        "points": 15
      },
      {
        "threshold": 197,
        "points": 14
      },
      {
        "threshold": 198,
        "points": 13
      },
      {
        "threshold": 199,
        "points": 12
      },
      {
        "threshold": 200,
        "points": 11
      },
      {
        "threshold": 201,
        "points": 10
      },
      {
        "threshold": 202,
        "points": 9
      },
      {
        "threshold": 203,
        "points": 8
      },
      {
        "threshold": 204,
        "points": 7
      },
      {
        "threshold": 205,
        "points": 6
      },
      {
        "threshold": 206,
        "points": 5
      },
      {
        "threshold": 207,
        "points": 4
      },
      {
        "threshold": 208,
        "points": 3
      },
      {
        "threshold": 209,
        "points": 2
      },
      {
        "threshold": 210,
        "points": 1
      },
      {
        "threshold": 211,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 55,
        "points": 0
      },
      {
        "threshold": 56,
        "points": 2
      },
      {
        "threshold": 57,
        "points": 4
      },
      {
        "threshold": 58,
        "points": 6
      },
      {
        "threshold": 59,
        "points": 8
      },
      {
        "threshold": 60,
        "points": 10
      },
      {
        "threshold": 61,
        "points": 12
      },
      {
        "threshold": 62,
        "points": 14
      },
      {
        "threshold": 63,
        "points": 16
      },
      {
        "threshold": 64,
        "points": 18
      },
      {
        "threshold": 65,
        "points": 20
      },
      {
        "threshold": 66,
        "points": 22
      },
      {
        "threshold": 67,
        "points": 24
      },
      {
        "threshold": 68,
        "points": 26
      },
      {
        "threshold": 69,
        "points": 28
      },
      {
        "threshold": 70,
        "points": 30
      },
      {
        "threshold": 71,
        "points": 32
      },
      {
        "threshold": 72,
        "points": 34
      },
      {
        "threshold": 73,
        "points": 36
      },
      {
        "threshold": 74,
        "points": 38
      },
      {
        "threshold": 75,
        "points": 40
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 77,
        "points": 44
      },
      {
        "threshold": 78,
        "points": 46
      },
      {
        "threshold": 79,
        "points": 48
      },
      {
        "threshold": 80,
        "points": 50
      },
      {
        "threshold": 81,
        "points": 52
      },
      {
        "threshold": 82,
        "points": 54
      },
      {
        "threshold": 83,
        "points": 56
      },
      {
        "threshold": 84,
        "points": 58
      },
      {
        "threshold": 85,
        "points": 60
      },
      {
        "threshold": 88,
        "points": 61
      },
      {
        "threshold": 92,
        "points": 62
      },
      {
        "threshold": 95,
        "points": 63
      },
      {
        "threshold": 98,
        "points": 64
      },
      {
        "threshold": 101,
        "points": 65
      },
      {
        "threshold": 105,
        "points": 66
      },
      {
        "threshold": 108,
        "points": 67
      },
      {
        "threshold": 111,
        "points": 68
      },
      {
        "threshold": 114,
        "points": 69
      },
      {
        "threshold": 118,
        "points": 70
      },
      {
        "threshold": 121,
        "points": 71
      },
      {
        "threshold": 124,
        "points": 72
      },
      {
        "threshold": 127,
        "points": 73
      },
      {
        "threshold": 130,
        "points": 74
      },
      {
        "threshold": 134,
        "points": 75
      },
      {
        "threshold": 137,
        "points": 76
      },
      {
        "threshold": 140,
        "points": 77
      },
      {
        "threshold": 143,
        "points": 78
      },
      {
        "threshold": 147,
        "points": 79
      },
      {
        "threshold": 150,
        "points": 80
      },
      {
        "threshold": 153,
        "points": 81
      },
      {
        "threshold": 157,
        "points": 82
      },
      {
        "threshold": 160,
        "points": 83
      },
      {
        "threshold": 163,
        "points": 84
      },
      {
        "threshold": 166,
        "points": 85
      },
      {
        "threshold": 170,
        "points": 86
      },
      {
        "threshold": 173,
        "points": 87
      },
      {
        "threshold": 176,
        "points": 88
      },
      {
        "threshold": 179,
        "points": 89
      },
      {
        "threshold": 183,
        "points": 90
      },
      {
        "threshold": 186,
        "points": 91
      },
      {
        "threshold": 189,
        "points": 92
      },
      {
        "threshold": 192,
        "points": 93
      },
      {
        "threshold": 196,
        "points": 94
      },
      {
        "threshold": 199,
        "points": 95
      },
      {
        "threshold": 202,
        "points": 96
      },
      {
        "threshold": 205,
        "points": 97
      },
      {
        "threshold": 209,
        "points": 98
      },
      {
        "threshold": 212,
        "points": 99
      },
      {
        "threshold": 215,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 805,
        "points": 100
      },
      {
        "threshold": 827,
        "points": 99
      },
      {
        "threshold": 835,
        "points": 98
      },
      {
        "threshold": 852,
        "points": 97
      },
      {
        "threshold": 867,
        "points": 96
      },
      {
        "threshold": 881,
        "points": 95
      },
      {
        "threshold": 894,
        "points": 94
      },
      {
        "threshold": 905,
        "points": 93
      },
      {
        "threshold": 917,
        "points": 92
      },
      {
        "threshold": 928,
        "points": 91
      },
      {
        "threshold": 938,
        "points": 90
      },
      {
        "threshold": 949,
        "points": 89
      },
      {
        "threshold": 959,
        "points": 88
      },
      {
        "threshold": 969,
        "points": 87
      },
      {
        "threshold": 979,
        "points": 86
      },
      {
        "threshold": 989,
        "points": 85
      },
      {
        "threshold": 999,
        "points": 84
      },
      {
        "threshold": 1009,
        "points": 83
      },
      {
        "threshold": 1019,
        "points": 82
      },
      {
        "threshold": 1028,
        "points": 81
      },
      {
        "threshold": 1038,
        "points": 79
      },
      {
        "threshold": 1048,
        "points": 78
      },
      {
        "threshold": 1057,
        "points": 77
      },
      {
        "threshold": 1066,
        "points": 76
      },
      {
        "threshold": 1075,
        "points": 75
      },
      {
        "threshold": 1083,
        "points": 74
      },
      {
        "threshold": 1092,
        "points": 73
      },
      {
        "threshold": 1101,
        "points": 72
      },
      {
        "threshold": 1103,
        "points": 70
      },
      {
        "threshold": 1110,
        "points": 69
      },
      {
        "threshold": 1119,
        "points": 68
      },
      {
        "threshold": 1128,
        "points": 67
      },
      {
        "threshold": 1137,
        "points": 66
      },
      {
        "threshold": 1147,
        "points": 65
      },
      {
        "threshold": 1156,
        "points": 64
      },
      {
        "threshold": 1166,
        "points": 63
      },
      {
        "threshold": 1176,
        "points": 62
      },
      {
        "threshold": 1185,
        "points": 60
      },
      {
        "threshold": 1188,
        "points": 59
      },
      {
        "threshold": 1191,
        "points": 58
      },
      {
        "threshold": 1193,
        "points": 57
      },
      {
        "threshold": 1196,
        "points": 56
      },
      {
        "threshold": 1199,
        "points": 55
      },
      {
        "threshold": 1202,
        "points": 54
      },
      {
        "threshold": 1205,
        "points": 53
      },
      {
        "threshold": 1207,
        "points": 52
      },
      {
        "threshold": 1210,
        "points": 51
      },
      {
        "threshold": 1213,
        "points": 50
      },
      {
        "threshold": 1216,
        "points": 49
      },
      {
        "threshold": 1219,
        "points": 48
      },
      {
        "threshold": 1221,
        "points": 47
      },
      {
        "threshold": 1224,
        "points": 46
      },
      {
        "threshold": 1227,
        "points": 45
      },
      {
        "threshold": 1230,
        "points": 44
      },
      {
        "threshold": 1232,
        "points": 43
      },
      {
        "threshold": 1235,
        "points": 42
      },
      {
        "threshold": 1238,
        "points": 41
      },
      {
        "threshold": 1241,
        "points": 40
      },
      {
        "threshold": 1244,
        "points": 39
      },
      {
        "threshold": 1246,
        "points": 38
      },
      {
        "threshold": 1249,
        "points": 37
      },
      {
        "threshold": 1252,
        "points": 36
      },
      {
        "threshold": 1255,
        "points": 35
      },
      {
        "threshold": 1258,
        "points": 34
      },
      {
        "threshold": 1260,
        "points": 33
      },
      {
        "threshold": 1263,
        "points": 32
      },
      {
        "threshold": 1266,
        "points": 31
      },
      {
        "threshold": 1269,
        "points": 30
      },
      {
        "threshold": 1272,
        "points": 29
      },
      {
        "threshold": 1274,
        "points": 28
      },
      {
        "threshold": 1277,
        "points": 27
      },
      {
        "threshold": 1280,
        "points": 26
      },
      {
        "threshold": 1283,
        "points": 25
      },
      {
        "threshold": 1286,
        "points": 24
      },
      {
        "threshold": 1288,
        "points": 23
      },
      {
        "threshold": 1291,
        "points": 22
      },
      {
        "threshold": 1294,
        "points": 21
      },
      {
        "threshold": 1297,
        "points": 20
      },
      {
        "threshold": 1300,
        "points": 19
      },
      {
        "threshold": 1302,
        "points": 18
      },
      {
        "threshold": 1305,
        "points": 17
      },
      {
        "threshold": 1308,
        "points": 16
      },
      {
        "threshold": 1311,
        "points": 15
      },
      {
        "threshold": 1314,
        "points": 14
      },
      {
        "threshold": 1316,
        "points": 13
      },
      {
        "threshold": 1319,
        "points": 12
      },
      {
        "threshold": 1322,
        "points": 11
      },
      {
        "threshold": 1325,
        "points": 10
      },
      {
        "threshold": 1327,
        "points": 9
      },
      {
        "threshold": 1330,
        "points": 8
      },
      {
        "threshold": 1333,
        "points": 7
      },
      {
        "threshold": 1336,
        "points": 6
      },
      {
        "threshold": 1339,
        "points": 5
      },
      {
        "threshold": 1341,
        "points": 4
      },
      {
        "threshold": 1344,
        "points": 3
      },
      {
        "threshold": 1347,
        "points": 2
      },
      {
        "threshold": 1350,
        "points": 1
      },
      {
        "threshold": 1353,
        "points": 0
      }
    ]
  },
  "female|22-26": {
    "deadlift": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 70,
        "points": 10
      },
      {
        "threshold": 80,
        "points": 20
      },
      {
        "threshold": 90,
        "points": 30
      },
      {
        "threshold": 100,
        "points": 40
      },
      {
        "threshold": 110,
        "points": 50
      },
      {
        "threshold": 120,
        "points": 60
      },
      {
        "threshold": 130,
        "points": 67
      },
      {
        "threshold": 140,
        "points": 73
      },
      {
        "threshold": 150,
        "points": 78
      },
      {
        "threshold": 160,
        "points": 82
      },
      {
        "threshold": 170,
        "points": 86
      },
      {
        "threshold": 180,
        "points": 89
      },
      {
        "threshold": 190,
        "points": 93
      },
      {
        "threshold": 200,
        "points": 95
      },
      {
        "threshold": 210,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 230,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
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
        "points": 65
      },
      {
        "threshold": 14,
        "points": 66
      },
      {
        "threshold": 15,
        "points": 68
      },
      {
        "threshold": 16,
        "points": 70
      },
      {
        "threshold": 17,
        "points": 71
      },
      {
        "threshold": 18,
        "points": 73
      },
      {
        "threshold": 19,
        "points": 74
      },
      {
        "threshold": 20,
        "points": 76
      },
      {
        "threshold": 21,
        "points": 77
      },
      {
        "threshold": 22,
        "points": 78
      },
      {
        "threshold": 23,
        "points": 80
      },
      {
        "threshold": 24,
        "points": 81
      },
      {
        "threshold": 25,
        "points": 82
      },
      {
        "threshold": 26,
        "points": 83
      },
      {
        "threshold": 27,
        "points": 84
      },
      {
        "threshold": 28,
        "points": 85
      },
      {
        "threshold": 29,
        "points": 86
      },
      {
        "threshold": 30,
        "points": 87
      },
      {
        "threshold": 31,
        "points": 88
      },
      {
        "threshold": 32,
        "points": 89
      },
      {
        "threshold": 33,
        "points": 90
      },
      {
        "threshold": 34,
        "points": 91
      },
      {
        "threshold": 35,
        "points": 92
      },
      {
        "threshold": 36,
        "points": 93
      },
      {
        "threshold": 38,
        "points": 94
      },
      {
        "threshold": 39,
        "points": 95
      },
      {
        "threshold": 40,
        "points": 96
      },
      {
        "threshold": 42,
        "points": 97
      },
      {
        "threshold": 44,
        "points": 98
      },
      {
        "threshold": 45,
        "points": 99
      },
      {
        "threshold": 50,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 115,
        "points": 100
      },
      {
        "threshold": 116,
        "points": 99
      },
      {
        "threshold": 120,
        "points": 98
      },
      {
        "threshold": 122,
        "points": 97
      },
      {
        "threshold": 125,
        "points": 96
      },
      {
        "threshold": 126,
        "points": 95
      },
      {
        "threshold": 129,
        "points": 94
      },
      {
        "threshold": 130,
        "points": 93
      },
      {
        "threshold": 132,
        "points": 92
      },
      {
        "threshold": 133,
        "points": 91
      },
      {
        "threshold": 135,
        "points": 90
      },
      {
        "threshold": 136,
        "points": 89
      },
      {
        "threshold": 138,
        "points": 88
      },
      {
        "threshold": 140,
        "points": 87
      },
      {
        "threshold": 141,
        "points": 86
      },
      {
        "threshold": 142,
        "points": 85
      },
      {
        "threshold": 143,
        "points": 84
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 146,
        "points": 82
      },
      {
        "threshold": 147,
        "points": 81
      },
      {
        "threshold": 149,
        "points": 80
      },
      {
        "threshold": 150,
        "points": 79
      },
      {
        "threshold": 151,
        "points": 78
      },
      {
        "threshold": 152,
        "points": 77
      },
      {
        "threshold": 154,
        "points": 76
      },
      {
        "threshold": 155,
        "points": 75
      },
      {
        "threshold": 157,
        "points": 74
      },
      {
        "threshold": 158,
        "points": 73
      },
      {
        "threshold": 160,
        "points": 72
      },
      {
        "threshold": 162,
        "points": 71
      },
      {
        "threshold": 163,
        "points": 70
      },
      {
        "threshold": 165,
        "points": 69
      },
      {
        "threshold": 167,
        "points": 68
      },
      {
        "threshold": 169,
        "points": 67
      },
      {
        "threshold": 171,
        "points": 66
      },
      {
        "threshold": 174,
        "points": 65
      },
      {
        "threshold": 177,
        "points": 64
      },
      {
        "threshold": 179,
        "points": 63
      },
      {
        "threshold": 181,
        "points": 62
      },
      {
        "threshold": 189,
        "points": 61
      },
      {
        "threshold": 195,
        "points": 60
      },
      {
        "threshold": 196,
        "points": 59
      },
      {
        "threshold": 197,
        "points": 58
      },
      {
        "threshold": 198,
        "points": 57
      },
      {
        "threshold": 199,
        "points": 56
      },
      {
        "threshold": 200,
        "points": 55
      },
      {
        "threshold": 201,
        "points": 54
      },
      {
        "threshold": 202,
        "points": 53
      },
      {
        "threshold": 203,
        "points": 52
      },
      {
        "threshold": 204,
        "points": 51
      },
      {
        "threshold": 205,
        "points": 50
      },
      {
        "threshold": 206,
        "points": 49
      },
      {
        "threshold": 207,
        "points": 48
      },
      {
        "threshold": 208,
        "points": 47
      },
      {
        "threshold": 209,
        "points": 46
      },
      {
        "threshold": 210,
        "points": 45
      },
      {
        "threshold": 211,
        "points": 44
      },
      {
        "threshold": 212,
        "points": 43
      },
      {
        "threshold": 213,
        "points": 42
      },
      {
        "threshold": 214,
        "points": 41
      },
      {
        "threshold": 215,
        "points": 40
      },
      {
        "threshold": 216,
        "points": 39
      },
      {
        "threshold": 217,
        "points": 38
      },
      {
        "threshold": 218,
        "points": 37
      },
      {
        "threshold": 219,
        "points": 36
      },
      {
        "threshold": 220,
        "points": 35
      },
      {
        "threshold": 221,
        "points": 34
      },
      {
        "threshold": 222,
        "points": 33
      },
      {
        "threshold": 223,
        "points": 32
      },
      {
        "threshold": 224,
        "points": 31
      },
      {
        "threshold": 225,
        "points": 30
      },
      {
        "threshold": 226,
        "points": 29
      },
      {
        "threshold": 227,
        "points": 28
      },
      {
        "threshold": 228,
        "points": 27
      },
      {
        "threshold": 229,
        "points": 26
      },
      {
        "threshold": 230,
        "points": 25
      },
      {
        "threshold": 231,
        "points": 24
      },
      {
        "threshold": 232,
        "points": 23
      },
      {
        "threshold": 233,
        "points": 22
      },
      {
        "threshold": 234,
        "points": 21
      },
      {
        "threshold": 235,
        "points": 20
      },
      {
        "threshold": 236,
        "points": 19
      },
      {
        "threshold": 237,
        "points": 18
      },
      {
        "threshold": 238,
        "points": 17
      },
      {
        "threshold": 239,
        "points": 16
      },
      {
        "threshold": 240,
        "points": 15
      },
      {
        "threshold": 241,
        "points": 14
      },
      {
        "threshold": 242,
        "points": 13
      },
      {
        "threshold": 243,
        "points": 12
      },
      {
        "threshold": 244,
        "points": 11
      },
      {
        "threshold": 245,
        "points": 10
      },
      {
        "threshold": 246,
        "points": 9
      },
      {
        "threshold": 247,
        "points": 8
      },
      {
        "threshold": 248,
        "points": 7
      },
      {
        "threshold": 249,
        "points": 6
      },
      {
        "threshold": 250,
        "points": 5
      },
      {
        "threshold": 251,
        "points": 4
      },
      {
        "threshold": 252,
        "points": 3
      },
      {
        "threshold": 253,
        "points": 2
      },
      {
        "threshold": 254,
        "points": 1
      },
      {
        "threshold": 255,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 55,
        "points": 0
      },
      {
        "threshold": 56,
        "points": 2
      },
      {
        "threshold": 57,
        "points": 4
      },
      {
        "threshold": 58,
        "points": 6
      },
      {
        "threshold": 59,
        "points": 8
      },
      {
        "threshold": 60,
        "points": 10
      },
      {
        "threshold": 61,
        "points": 12
      },
      {
        "threshold": 62,
        "points": 14
      },
      {
        "threshold": 63,
        "points": 16
      },
      {
        "threshold": 64,
        "points": 18
      },
      {
        "threshold": 65,
        "points": 20
      },
      {
        "threshold": 66,
        "points": 22
      },
      {
        "threshold": 67,
        "points": 24
      },
      {
        "threshold": 68,
        "points": 26
      },
      {
        "threshold": 69,
        "points": 28
      },
      {
        "threshold": 70,
        "points": 30
      },
      {
        "threshold": 71,
        "points": 32
      },
      {
        "threshold": 72,
        "points": 34
      },
      {
        "threshold": 73,
        "points": 36
      },
      {
        "threshold": 74,
        "points": 38
      },
      {
        "threshold": 75,
        "points": 40
      },
      {
        "threshold": 76,
        "points": 42
      },
      {
        "threshold": 77,
        "points": 44
      },
      {
        "threshold": 78,
        "points": 46
      },
      {
        "threshold": 79,
        "points": 48
      },
      {
        "threshold": 80,
        "points": 50
      },
      {
        "threshold": 81,
        "points": 52
      },
      {
        "threshold": 82,
        "points": 54
      },
      {
        "threshold": 83,
        "points": 56
      },
      {
        "threshold": 84,
        "points": 58
      },
      {
        "threshold": 85,
        "points": 60
      },
      {
        "threshold": 88,
        "points": 61
      },
      {
        "threshold": 92,
        "points": 62
      },
      {
        "threshold": 95,
        "points": 63
      },
      {
        "threshold": 98,
        "points": 64
      },
      {
        "threshold": 101,
        "points": 65
      },
      {
        "threshold": 105,
        "points": 66
      },
      {
        "threshold": 108,
        "points": 67
      },
      {
        "threshold": 111,
        "points": 68
      },
      {
        "threshold": 114,
        "points": 69
      },
      {
        "threshold": 118,
        "points": 70
      },
      {
        "threshold": 121,
        "points": 71
      },
      {
        "threshold": 124,
        "points": 72
      },
      {
        "threshold": 127,
        "points": 73
      },
      {
        "threshold": 130,
        "points": 74
      },
      {
        "threshold": 134,
        "points": 75
      },
      {
        "threshold": 137,
        "points": 76
      },
      {
        "threshold": 140,
        "points": 77
      },
      {
        "threshold": 143,
        "points": 78
      },
      {
        "threshold": 147,
        "points": 79
      },
      {
        "threshold": 150,
        "points": 80
      },
      {
        "threshold": 153,
        "points": 81
      },
      {
        "threshold": 157,
        "points": 82
      },
      {
        "threshold": 160,
        "points": 83
      },
      {
        "threshold": 163,
        "points": 84
      },
      {
        "threshold": 166,
        "points": 85
      },
      {
        "threshold": 170,
        "points": 86
      },
      {
        "threshold": 173,
        "points": 87
      },
      {
        "threshold": 176,
        "points": 88
      },
      {
        "threshold": 179,
        "points": 89
      },
      {
        "threshold": 183,
        "points": 90
      },
      {
        "threshold": 186,
        "points": 91
      },
      {
        "threshold": 189,
        "points": 92
      },
      {
        "threshold": 192,
        "points": 93
      },
      {
        "threshold": 196,
        "points": 94
      },
      {
        "threshold": 199,
        "points": 95
      },
      {
        "threshold": 202,
        "points": 96
      },
      {
        "threshold": 205,
        "points": 97
      },
      {
        "threshold": 209,
        "points": 98
      },
      {
        "threshold": 212,
        "points": 99
      },
      {
        "threshold": 215,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 930,
        "points": 100
      },
      {
        "threshold": 944,
        "points": 99
      },
      {
        "threshold": 955,
        "points": 98
      },
      {
        "threshold": 960,
        "points": 97
      },
      {
        "threshold": 964,
        "points": 96
      },
      {
        "threshold": 987,
        "points": 95
      },
      {
        "threshold": 1006,
        "points": 94
      },
      {
        "threshold": 1023,
        "points": 93
      },
      {
        "threshold": 1037,
        "points": 92
      },
      {
        "threshold": 1051,
        "points": 91
      },
      {
        "threshold": 1064,
        "points": 90
      },
      {
        "threshold": 1075,
        "points": 89
      },
      {
        "threshold": 1087,
        "points": 88
      },
      {
        "threshold": 1098,
        "points": 87
      },
      {
        "threshold": 1108,
        "points": 86
      },
      {
        "threshold": 1118,
        "points": 85
      },
      {
        "threshold": 1128,
        "points": 84
      },
      {
        "threshold": 1138,
        "points": 83
      },
      {
        "threshold": 1147,
        "points": 82
      },
      {
        "threshold": 1156,
        "points": 81
      },
      {
        "threshold": 1165,
        "points": 80
      },
      {
        "threshold": 1174,
        "points": 79
      },
      {
        "threshold": 1183,
        "points": 78
      },
      {
        "threshold": 1192,
        "points": 77
      },
      {
        "threshold": 1201,
        "points": 76
      },
      {
        "threshold": 1212,
        "points": 75
      },
      {
        "threshold": 1224,
        "points": 74
      },
      {
        "threshold": 1235,
        "points": 73
      },
      {
        "threshold": 1246,
        "points": 72
      },
      {
        "threshold": 1257,
        "points": 71
      },
      {
        "threshold": 1260,
        "points": 70
      },
      {
        "threshold": 1292,
        "points": 69
      },
      {
        "threshold": 1300,
        "points": 68
      },
      {
        "threshold": 1309,
        "points": 67
      },
      {
        "threshold": 1318,
        "points": 66
      },
      {
        "threshold": 1327,
        "points": 65
      },
      {
        "threshold": 1336,
        "points": 64
      },
      {
        "threshold": 1346,
        "points": 63
      },
      {
        "threshold": 1357,
        "points": 62
      },
      {
        "threshold": 1365,
        "points": 60
      },
      {
        "threshold": 1368,
        "points": 59
      },
      {
        "threshold": 1371,
        "points": 58
      },
      {
        "threshold": 1374,
        "points": 57
      },
      {
        "threshold": 1377,
        "points": 56
      },
      {
        "threshold": 1380,
        "points": 55
      },
      {
        "threshold": 1382,
        "points": 54
      },
      {
        "threshold": 1385,
        "points": 53
      },
      {
        "threshold": 1388,
        "points": 52
      },
      {
        "threshold": 1391,
        "points": 51
      },
      {
        "threshold": 1394,
        "points": 50
      },
      {
        "threshold": 1397,
        "points": 49
      },
      {
        "threshold": 1400,
        "points": 48
      },
      {
        "threshold": 1403,
        "points": 47
      },
      {
        "threshold": 1406,
        "points": 46
      },
      {
        "threshold": 1409,
        "points": 45
      },
      {
        "threshold": 1412,
        "points": 44
      },
      {
        "threshold": 1414,
        "points": 43
      },
      {
        "threshold": 1417,
        "points": 42
      },
      {
        "threshold": 1420,
        "points": 41
      },
      {
        "threshold": 1423,
        "points": 40
      },
      {
        "threshold": 1426,
        "points": 39
      },
      {
        "threshold": 1429,
        "points": 38
      },
      {
        "threshold": 1432,
        "points": 37
      },
      {
        "threshold": 1435,
        "points": 36
      },
      {
        "threshold": 1438,
        "points": 35
      },
      {
        "threshold": 1441,
        "points": 34
      },
      {
        "threshold": 1444,
        "points": 33
      },
      {
        "threshold": 1446,
        "points": 32
      },
      {
        "threshold": 1449,
        "points": 31
      },
      {
        "threshold": 1452,
        "points": 30
      },
      {
        "threshold": 1455,
        "points": 29
      },
      {
        "threshold": 1458,
        "points": 28
      },
      {
        "threshold": 1461,
        "points": 27
      },
      {
        "threshold": 1464,
        "points": 26
      },
      {
        "threshold": 1467,
        "points": 25
      },
      {
        "threshold": 1470,
        "points": 24
      },
      {
        "threshold": 1473,
        "points": 23
      },
      {
        "threshold": 1476,
        "points": 22
      },
      {
        "threshold": 1478,
        "points": 21
      },
      {
        "threshold": 1481,
        "points": 20
      },
      {
        "threshold": 1484,
        "points": 19
      },
      {
        "threshold": 1487,
        "points": 18
      },
      {
        "threshold": 1490,
        "points": 17
      },
      {
        "threshold": 1493,
        "points": 16
      },
      {
        "threshold": 1496,
        "points": 15
      },
      {
        "threshold": 1499,
        "points": 14
      },
      {
        "threshold": 1502,
        "points": 13
      },
      {
        "threshold": 1505,
        "points": 12
      },
      {
        "threshold": 1508,
        "points": 11
      },
      {
        "threshold": 1510,
        "points": 10
      },
      {
        "threshold": 1513,
        "points": 9
      },
      {
        "threshold": 1516,
        "points": 8
      },
      {
        "threshold": 1519,
        "points": 7
      },
      {
        "threshold": 1522,
        "points": 6
      },
      {
        "threshold": 1525,
        "points": 5
      },
      {
        "threshold": 1528,
        "points": 4
      },
      {
        "threshold": 1531,
        "points": 3
      },
      {
        "threshold": 1534,
        "points": 2
      },
      {
        "threshold": 1537,
        "points": 1
      },
      {
        "threshold": 1540,
        "points": 0
      }
    ]
  },
  "male|27-31": {
    "deadlift": [
      {
        "threshold": 80,
        "points": 0
      },
      {
        "threshold": 90,
        "points": 10
      },
      {
        "threshold": 100,
        "points": 20
      },
      {
        "threshold": 110,
        "points": 30
      },
      {
        "threshold": 120,
        "points": 40
      },
      {
        "threshold": 130,
        "points": 50
      },
      {
        "threshold": 150,
        "points": 60
      },
      {
        "threshold": 160,
        "points": 63
      },
      {
        "threshold": 170,
        "points": 65
      },
      {
        "threshold": 180,
        "points": 67
      },
      {
        "threshold": 190,
        "points": 70
      },
      {
        "threshold": 200,
        "points": 71
      },
      {
        "threshold": 210,
        "points": 73
      },
      {
        "threshold": 220,
        "points": 75
      },
      {
        "threshold": 230,
        "points": 77
      },
      {
        "threshold": 240,
        "points": 79
      },
      {
        "threshold": 250,
        "points": 81
      },
      {
        "threshold": 260,
        "points": 83
      },
      {
        "threshold": 270,
        "points": 85
      },
      {
        "threshold": 280,
        "points": 87
      },
      {
        "threshold": 290,
        "points": 89
      },
      {
        "threshold": 300,
        "points": 91
      },
      {
        "threshold": 310,
        "points": 93
      },
      {
        "threshold": 320,
        "points": 95
      },
      {
        "threshold": 330,
        "points": 97
      },
      {
        "threshold": 340,
        "points": 98
      },
      {
        "threshold": 350,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 14,
        "points": 60
      },
      {
        "threshold": 15,
        "points": 61
      },
      {
        "threshold": 17,
        "points": 62
      },
      {
        "threshold": 18,
        "points": 63
      },
      {
        "threshold": 20,
        "points": 64
      },
      {
        "threshold": 21,
        "points": 65
      },
      {
        "threshold": 22,
        "points": 66
      },
      {
        "threshold": 23,
        "points": 67
      },
      {
        "threshold": 24,
        "points": 68
      },
      {
        "threshold": 25,
        "points": 69
      },
      {
        "threshold": 26,
        "points": 70
      },
      {
        "threshold": 28,
        "points": 71
      },
      {
        "threshold": 29,
        "points": 72
      },
      {
        "threshold": 30,
        "points": 73
      },
      {
        "threshold": 31,
        "points": 74
      },
      {
        "threshold": 32,
        "points": 75
      },
      {
        "threshold": 33,
        "points": 76
      },
      {
        "threshold": 34,
        "points": 77
      },
      {
        "threshold": 35,
        "points": 78
      },
      {
        "threshold": 36,
        "points": 79
      },
      {
        "threshold": 37,
        "points": 80
      },
      {
        "threshold": 38,
        "points": 81
      },
      {
        "threshold": 39,
        "points": 82
      },
      {
        "threshold": 41,
        "points": 83
      },
      {
        "threshold": 42,
        "points": 84
      },
      {
        "threshold": 43,
        "points": 85
      },
      {
        "threshold": 44,
        "points": 86
      },
      {
        "threshold": 45,
        "points": 87
      },
      {
        "threshold": 46,
        "points": 88
      },
      {
        "threshold": 47,
        "points": 89
      },
      {
        "threshold": 48,
        "points": 90
      },
      {
        "threshold": 49,
        "points": 91
      },
      {
        "threshold": 51,
        "points": 92
      },
      {
        "threshold": 52,
        "points": 93
      },
      {
        "threshold": 53,
        "points": 94
      },
      {
        "threshold": 54,
        "points": 95
      },
      {
        "threshold": 55,
        "points": 96
      },
      {
        "threshold": 57,
        "points": 97
      },
      {
        "threshold": 58,
        "points": 98
      },
      {
        "threshold": 60,
        "points": 99
      },
      {
        "threshold": 62,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 90,
        "points": 100
      },
      {
        "threshold": 91,
        "points": 99
      },
      {
        "threshold": 94,
        "points": 98
      },
      {
        "threshold": 95,
        "points": 97
      },
      {
        "threshold": 97,
        "points": 96
      },
      {
        "threshold": 98,
        "points": 95
      },
      {
        "threshold": 100,
        "points": 94
      },
      {
        "threshold": 101,
        "points": 93
      },
      {
        "threshold": 102,
        "points": 92
      },
      {
        "threshold": 103,
        "points": 91
      },
      {
        "threshold": 105,
        "points": 90
      },
      {
        "threshold": 106,
        "points": 89
      },
      {
        "threshold": 107,
        "points": 88
      },
      {
        "threshold": 108,
        "points": 87
      },
      {
        "threshold": 109,
        "points": 86
      },
      {
        "threshold": 110,
        "points": 85
      },
      {
        "threshold": 111,
        "points": 84
      },
      {
        "threshold": 112,
        "points": 83
      },
      {
        "threshold": 113,
        "points": 82
      },
      {
        "threshold": 114,
        "points": 81
      },
      {
        "threshold": 115,
        "points": 80
      },
      {
        "threshold": 116,
        "points": 79
      },
      {
        "threshold": 117,
        "points": 78
      },
      {
        "threshold": 118,
        "points": 77
      },
      {
        "threshold": 119,
        "points": 76
      },
      {
        "threshold": 120,
        "points": 75
      },
      {
        "threshold": 121,
        "points": 74
      },
      {
        "threshold": 122,
        "points": 73
      },
      {
        "threshold": 124,
        "points": 72
      },
      {
        "threshold": 125,
        "points": 71
      },
      {
        "threshold": 126,
        "points": 70
      },
      {
        "threshold": 128,
        "points": 69
      },
      {
        "threshold": 130,
        "points": 68
      },
      {
        "threshold": 131,
        "points": 67
      },
      {
        "threshold": 133,
        "points": 66
      },
      {
        "threshold": 135,
        "points": 65
      },
      {
        "threshold": 137,
        "points": 64
      },
      {
        "threshold": 140,
        "points": 63
      },
      {
        "threshold": 142,
        "points": 62
      },
      {
        "threshold": 148,
        "points": 61
      },
      {
        "threshold": 152,
        "points": 60
      },
      {
        "threshold": 153,
        "points": 59
      },
      {
        "threshold": 154,
        "points": 58
      },
      {
        "threshold": 155,
        "points": 57
      },
      {
        "threshold": 156,
        "points": 56
      },
      {
        "threshold": 157,
        "points": 55
      },
      {
        "threshold": 158,
        "points": 54
      },
      {
        "threshold": 159,
        "points": 53
      },
      {
        "threshold": 160,
        "points": 52
      },
      {
        "threshold": 161,
        "points": 51
      },
      {
        "threshold": 162,
        "points": 50
      },
      {
        "threshold": 163,
        "points": 49
      },
      {
        "threshold": 164,
        "points": 48
      },
      {
        "threshold": 165,
        "points": 47
      },
      {
        "threshold": 166,
        "points": 46
      },
      {
        "threshold": 167,
        "points": 45
      },
      {
        "threshold": 168,
        "points": 44
      },
      {
        "threshold": 169,
        "points": 43
      },
      {
        "threshold": 170,
        "points": 42
      },
      {
        "threshold": 171,
        "points": 41
      },
      {
        "threshold": 172,
        "points": 40
      },
      {
        "threshold": 173,
        "points": 39
      },
      {
        "threshold": 174,
        "points": 38
      },
      {
        "threshold": 175,
        "points": 37
      },
      {
        "threshold": 176,
        "points": 36
      },
      {
        "threshold": 177,
        "points": 35
      },
      {
        "threshold": 178,
        "points": 34
      },
      {
        "threshold": 179,
        "points": 33
      },
      {
        "threshold": 180,
        "points": 32
      },
      {
        "threshold": 181,
        "points": 31
      },
      {
        "threshold": 182,
        "points": 30
      },
      {
        "threshold": 183,
        "points": 29
      },
      {
        "threshold": 184,
        "points": 28
      },
      {
        "threshold": 185,
        "points": 27
      },
      {
        "threshold": 186,
        "points": 26
      },
      {
        "threshold": 187,
        "points": 25
      },
      {
        "threshold": 188,
        "points": 24
      },
      {
        "threshold": 189,
        "points": 23
      },
      {
        "threshold": 190,
        "points": 22
      },
      {
        "threshold": 191,
        "points": 21
      },
      {
        "threshold": 192,
        "points": 20
      },
      {
        "threshold": 193,
        "points": 19
      },
      {
        "threshold": 194,
        "points": 18
      },
      {
        "threshold": 195,
        "points": 17
      },
      {
        "threshold": 196,
        "points": 16
      },
      {
        "threshold": 197,
        "points": 15
      },
      {
        "threshold": 198,
        "points": 14
      },
      {
        "threshold": 199,
        "points": 13
      },
      {
        "threshold": 200,
        "points": 12
      },
      {
        "threshold": 201,
        "points": 11
      },
      {
        "threshold": 202,
        "points": 10
      },
      {
        "threshold": 203,
        "points": 9
      },
      {
        "threshold": 204,
        "points": 8
      },
      {
        "threshold": 205,
        "points": 7
      },
      {
        "threshold": 206,
        "points": 6
      },
      {
        "threshold": 207,
        "points": 5
      },
      {
        "threshold": 208,
        "points": 4
      },
      {
        "threshold": 209,
        "points": 3
      },
      {
        "threshold": 210,
        "points": 2
      },
      {
        "threshold": 211,
        "points": 1
      },
      {
        "threshold": 212,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 50,
        "points": 0
      },
      {
        "threshold": 51,
        "points": 2
      },
      {
        "threshold": 52,
        "points": 4
      },
      {
        "threshold": 53,
        "points": 6
      },
      {
        "threshold": 54,
        "points": 8
      },
      {
        "threshold": 55,
        "points": 10
      },
      {
        "threshold": 56,
        "points": 12
      },
      {
        "threshold": 57,
        "points": 14
      },
      {
        "threshold": 58,
        "points": 16
      },
      {
        "threshold": 59,
        "points": 18
      },
      {
        "threshold": 60,
        "points": 20
      },
      {
        "threshold": 61,
        "points": 22
      },
      {
        "threshold": 62,
        "points": 24
      },
      {
        "threshold": 63,
        "points": 26
      },
      {
        "threshold": 64,
        "points": 28
      },
      {
        "threshold": 65,
        "points": 30
      },
      {
        "threshold": 66,
        "points": 32
      },
      {
        "threshold": 67,
        "points": 34
      },
      {
        "threshold": 68,
        "points": 36
      },
      {
        "threshold": 69,
        "points": 38
      },
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 71,
        "points": 42
      },
      {
        "threshold": 72,
        "points": 44
      },
      {
        "threshold": 73,
        "points": 46
      },
      {
        "threshold": 74,
        "points": 48
      },
      {
        "threshold": 75,
        "points": 50
      },
      {
        "threshold": 76,
        "points": 52
      },
      {
        "threshold": 77,
        "points": 54
      },
      {
        "threshold": 78,
        "points": 56
      },
      {
        "threshold": 79,
        "points": 58
      },
      {
        "threshold": 80,
        "points": 60
      },
      {
        "threshold": 83,
        "points": 61
      },
      {
        "threshold": 86,
        "points": 62
      },
      {
        "threshold": 90,
        "points": 63
      },
      {
        "threshold": 93,
        "points": 64
      },
      {
        "threshold": 96,
        "points": 65
      },
      {
        "threshold": 99,
        "points": 66
      },
      {
        "threshold": 103,
        "points": 67
      },
      {
        "threshold": 106,
        "points": 68
      },
      {
        "threshold": 109,
        "points": 69
      },
      {
        "threshold": 112,
        "points": 70
      },
      {
        "threshold": 116,
        "points": 71
      },
      {
        "threshold": 119,
        "points": 72
      },
      {
        "threshold": 122,
        "points": 73
      },
      {
        "threshold": 126,
        "points": 74
      },
      {
        "threshold": 129,
        "points": 75
      },
      {
        "threshold": 132,
        "points": 76
      },
      {
        "threshold": 135,
        "points": 77
      },
      {
        "threshold": 138,
        "points": 78
      },
      {
        "threshold": 142,
        "points": 79
      },
      {
        "threshold": 145,
        "points": 80
      },
      {
        "threshold": 148,
        "points": 81
      },
      {
        "threshold": 151,
        "points": 82
      },
      {
        "threshold": 155,
        "points": 83
      },
      {
        "threshold": 158,
        "points": 84
      },
      {
        "threshold": 161,
        "points": 85
      },
      {
        "threshold": 165,
        "points": 86
      },
      {
        "threshold": 168,
        "points": 87
      },
      {
        "threshold": 171,
        "points": 88
      },
      {
        "threshold": 174,
        "points": 89
      },
      {
        "threshold": 178,
        "points": 90
      },
      {
        "threshold": 181,
        "points": 91
      },
      {
        "threshold": 184,
        "points": 92
      },
      {
        "threshold": 187,
        "points": 93
      },
      {
        "threshold": 191,
        "points": 94
      },
      {
        "threshold": 194,
        "points": 95
      },
      {
        "threshold": 197,
        "points": 96
      },
      {
        "threshold": 200,
        "points": 97
      },
      {
        "threshold": 204,
        "points": 98
      },
      {
        "threshold": 207,
        "points": 99
      },
      {
        "threshold": 210,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 805,
        "points": 100
      },
      {
        "threshold": 827,
        "points": 99
      },
      {
        "threshold": 835,
        "points": 98
      },
      {
        "threshold": 852,
        "points": 97
      },
      {
        "threshold": 867,
        "points": 96
      },
      {
        "threshold": 881,
        "points": 95
      },
      {
        "threshold": 894,
        "points": 94
      },
      {
        "threshold": 905,
        "points": 93
      },
      {
        "threshold": 917,
        "points": 92
      },
      {
        "threshold": 928,
        "points": 91
      },
      {
        "threshold": 938,
        "points": 90
      },
      {
        "threshold": 955,
        "points": 89
      },
      {
        "threshold": 965,
        "points": 88
      },
      {
        "threshold": 974,
        "points": 87
      },
      {
        "threshold": 984,
        "points": 86
      },
      {
        "threshold": 993,
        "points": 85
      },
      {
        "threshold": 1003,
        "points": 84
      },
      {
        "threshold": 1012,
        "points": 83
      },
      {
        "threshold": 1022,
        "points": 82
      },
      {
        "threshold": 1032,
        "points": 81
      },
      {
        "threshold": 1041,
        "points": 80
      },
      {
        "threshold": 1050,
        "points": 79
      },
      {
        "threshold": 1058,
        "points": 78
      },
      {
        "threshold": 1067,
        "points": 77
      },
      {
        "threshold": 1075,
        "points": 76
      },
      {
        "threshold": 1084,
        "points": 75
      },
      {
        "threshold": 1093,
        "points": 74
      },
      {
        "threshold": 1101,
        "points": 73
      },
      {
        "threshold": 1103,
        "points": 70
      },
      {
        "threshold": 1110,
        "points": 69
      },
      {
        "threshold": 1119,
        "points": 68
      },
      {
        "threshold": 1137,
        "points": 67
      },
      {
        "threshold": 1146,
        "points": 66
      },
      {
        "threshold": 1155,
        "points": 65
      },
      {
        "threshold": 1165,
        "points": 64
      },
      {
        "threshold": 1175,
        "points": 63
      },
      {
        "threshold": 1185,
        "points": 60
      },
      {
        "threshold": 1188,
        "points": 59
      },
      {
        "threshold": 1191,
        "points": 58
      },
      {
        "threshold": 1193,
        "points": 57
      },
      {
        "threshold": 1196,
        "points": 56
      },
      {
        "threshold": 1199,
        "points": 55
      },
      {
        "threshold": 1202,
        "points": 54
      },
      {
        "threshold": 1205,
        "points": 53
      },
      {
        "threshold": 1207,
        "points": 52
      },
      {
        "threshold": 1210,
        "points": 51
      },
      {
        "threshold": 1213,
        "points": 50
      },
      {
        "threshold": 1216,
        "points": 49
      },
      {
        "threshold": 1219,
        "points": 48
      },
      {
        "threshold": 1221,
        "points": 47
      },
      {
        "threshold": 1224,
        "points": 46
      },
      {
        "threshold": 1227,
        "points": 45
      },
      {
        "threshold": 1230,
        "points": 44
      },
      {
        "threshold": 1232,
        "points": 43
      },
      {
        "threshold": 1235,
        "points": 42
      },
      {
        "threshold": 1238,
        "points": 41
      },
      {
        "threshold": 1241,
        "points": 40
      },
      {
        "threshold": 1244,
        "points": 39
      },
      {
        "threshold": 1246,
        "points": 38
      },
      {
        "threshold": 1249,
        "points": 37
      },
      {
        "threshold": 1252,
        "points": 36
      },
      {
        "threshold": 1255,
        "points": 35
      },
      {
        "threshold": 1258,
        "points": 34
      },
      {
        "threshold": 1260,
        "points": 33
      },
      {
        "threshold": 1263,
        "points": 32
      },
      {
        "threshold": 1266,
        "points": 31
      },
      {
        "threshold": 1269,
        "points": 30
      },
      {
        "threshold": 1272,
        "points": 29
      },
      {
        "threshold": 1274,
        "points": 28
      },
      {
        "threshold": 1277,
        "points": 27
      },
      {
        "threshold": 1280,
        "points": 26
      },
      {
        "threshold": 1283,
        "points": 25
      },
      {
        "threshold": 1286,
        "points": 24
      },
      {
        "threshold": 1288,
        "points": 23
      },
      {
        "threshold": 1291,
        "points": 22
      },
      {
        "threshold": 1294,
        "points": 21
      },
      {
        "threshold": 1297,
        "points": 20
      },
      {
        "threshold": 1300,
        "points": 19
      },
      {
        "threshold": 1302,
        "points": 18
      },
      {
        "threshold": 1305,
        "points": 17
      },
      {
        "threshold": 1308,
        "points": 16
      },
      {
        "threshold": 1311,
        "points": 15
      },
      {
        "threshold": 1314,
        "points": 14
      },
      {
        "threshold": 1316,
        "points": 13
      },
      {
        "threshold": 1319,
        "points": 12
      },
      {
        "threshold": 1322,
        "points": 11
      },
      {
        "threshold": 1325,
        "points": 10
      },
      {
        "threshold": 1327,
        "points": 9
      },
      {
        "threshold": 1330,
        "points": 8
      },
      {
        "threshold": 1333,
        "points": 7
      },
      {
        "threshold": 1336,
        "points": 6
      },
      {
        "threshold": 1339,
        "points": 5
      },
      {
        "threshold": 1341,
        "points": 4
      },
      {
        "threshold": 1344,
        "points": 3
      },
      {
        "threshold": 1347,
        "points": 2
      },
      {
        "threshold": 1350,
        "points": 1
      },
      {
        "threshold": 1353,
        "points": 0
      }
    ]
  },
  "female|27-31": {
    "deadlift": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 70,
        "points": 10
      },
      {
        "threshold": 80,
        "points": 20
      },
      {
        "threshold": 90,
        "points": 30
      },
      {
        "threshold": 100,
        "points": 40
      },
      {
        "threshold": 110,
        "points": 50
      },
      {
        "threshold": 120,
        "points": 60
      },
      {
        "threshold": 130,
        "points": 67
      },
      {
        "threshold": 140,
        "points": 73
      },
      {
        "threshold": 150,
        "points": 78
      },
      {
        "threshold": 160,
        "points": 82
      },
      {
        "threshold": 170,
        "points": 86
      },
      {
        "threshold": 180,
        "points": 89
      },
      {
        "threshold": 190,
        "points": 92
      },
      {
        "threshold": 200,
        "points": 95
      },
      {
        "threshold": 210,
        "points": 96
      },
      {
        "threshold": 220,
        "points": 98
      },
      {
        "threshold": 230,
        "points": 99
      },
      {
        "threshold": 240,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 11,
        "points": 60
      },
      {
        "threshold": 12,
        "points": 62
      },
      {
        "threshold": 13,
        "points": 64
      },
      {
        "threshold": 14,
        "points": 66
      },
      {
        "threshold": 15,
        "points": 68
      },
      {
        "threshold": 16,
        "points": 70
      },
      {
        "threshold": 17,
        "points": 71
      },
      {
        "threshold": 18,
        "points": 73
      },
      {
        "threshold": 19,
        "points": 74
      },
      {
        "threshold": 20,
        "points": 76
      },
      {
        "threshold": 21,
        "points": 77
      },
      {
        "threshold": 22,
        "points": 78
      },
      {
        "threshold": 23,
        "points": 80
      },
      {
        "threshold": 24,
        "points": 81
      },
      {
        "threshold": 25,
        "points": 82
      },
      {
        "threshold": 26,
        "points": 83
      },
      {
        "threshold": 27,
        "points": 84
      },
      {
        "threshold": 28,
        "points": 85
      },
      {
        "threshold": 29,
        "points": 86
      },
      {
        "threshold": 30,
        "points": 87
      },
      {
        "threshold": 31,
        "points": 88
      },
      {
        "threshold": 32,
        "points": 89
      },
      {
        "threshold": 33,
        "points": 90
      },
      {
        "threshold": 34,
        "points": 91
      },
      {
        "threshold": 35,
        "points": 92
      },
      {
        "threshold": 36,
        "points": 93
      },
      {
        "threshold": 37,
        "points": 94
      },
      {
        "threshold": 39,
        "points": 95
      },
      {
        "threshold": 40,
        "points": 96
      },
      {
        "threshold": 42,
        "points": 97
      },
      {
        "threshold": 43,
        "points": 98
      },
      {
        "threshold": 45,
        "points": 99
      },
      {
        "threshold": 48,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 115,
        "points": 100
      },
      {
        "threshold": 117,
        "points": 99
      },
      {
        "threshold": 121,
        "points": 98
      },
      {
        "threshold": 124,
        "points": 97
      },
      {
        "threshold": 126,
        "points": 96
      },
      {
        "threshold": 128,
        "points": 95
      },
      {
        "threshold": 130,
        "points": 94
      },
      {
        "threshold": 132,
        "points": 93
      },
      {
        "threshold": 133,
        "points": 92
      },
      {
        "threshold": 135,
        "points": 91
      },
      {
        "threshold": 136,
        "points": 90
      },
      {
        "threshold": 138,
        "points": 89
      },
      {
        "threshold": 139,
        "points": 88
      },
      {
        "threshold": 140,
        "points": 87
      },
      {
        "threshold": 142,
        "points": 86
      },
      {
        "threshold": 143,
        "points": 85
      },
      {
        "threshold": 144,
        "points": 84
      },
      {
        "threshold": 146,
        "points": 83
      },
      {
        "threshold": 147,
        "points": 82
      },
      {
        "threshold": 148,
        "points": 81
      },
      {
        "threshold": 149,
        "points": 80
      },
      {
        "threshold": 150,
        "points": 79
      },
      {
        "threshold": 151,
        "points": 78
      },
      {
        "threshold": 152,
        "points": 77
      },
      {
        "threshold": 154,
        "points": 76
      },
      {
        "threshold": 156,
        "points": 75
      },
      {
        "threshold": 157,
        "points": 74
      },
      {
        "threshold": 158,
        "points": 73
      },
      {
        "threshold": 160,
        "points": 72
      },
      {
        "threshold": 161,
        "points": 71
      },
      {
        "threshold": 163,
        "points": 70
      },
      {
        "threshold": 165,
        "points": 69
      },
      {
        "threshold": 167,
        "points": 68
      },
      {
        "threshold": 169,
        "points": 67
      },
      {
        "threshold": 171,
        "points": 66
      },
      {
        "threshold": 174,
        "points": 65
      },
      {
        "threshold": 176,
        "points": 64
      },
      {
        "threshold": 179,
        "points": 63
      },
      {
        "threshold": 180,
        "points": 62
      },
      {
        "threshold": 187,
        "points": 61
      },
      {
        "threshold": 195,
        "points": 60
      },
      {
        "threshold": 196,
        "points": 59
      },
      {
        "threshold": 197,
        "points": 58
      },
      {
        "threshold": 198,
        "points": 57
      },
      {
        "threshold": 199,
        "points": 56
      },
      {
        "threshold": 200,
        "points": 55
      },
      {
        "threshold": 201,
        "points": 54
      },
      {
        "threshold": 202,
        "points": 53
      },
      {
        "threshold": 203,
        "points": 52
      },
      {
        "threshold": 204,
        "points": 51
      },
      {
        "threshold": 205,
        "points": 50
      },
      {
        "threshold": 206,
        "points": 49
      },
      {
        "threshold": 207,
        "points": 48
      },
      {
        "threshold": 208,
        "points": 47
      },
      {
        "threshold": 209,
        "points": 46
      },
      {
        "threshold": 210,
        "points": 45
      },
      {
        "threshold": 211,
        "points": 44
      },
      {
        "threshold": 212,
        "points": 43
      },
      {
        "threshold": 213,
        "points": 42
      },
      {
        "threshold": 214,
        "points": 41
      },
      {
        "threshold": 215,
        "points": 40
      },
      {
        "threshold": 216,
        "points": 39
      },
      {
        "threshold": 217,
        "points": 38
      },
      {
        "threshold": 218,
        "points": 37
      },
      {
        "threshold": 219,
        "points": 36
      },
      {
        "threshold": 220,
        "points": 35
      },
      {
        "threshold": 221,
        "points": 34
      },
      {
        "threshold": 222,
        "points": 33
      },
      {
        "threshold": 223,
        "points": 32
      },
      {
        "threshold": 224,
        "points": 31
      },
      {
        "threshold": 225,
        "points": 30
      },
      {
        "threshold": 226,
        "points": 29
      },
      {
        "threshold": 227,
        "points": 28
      },
      {
        "threshold": 228,
        "points": 27
      },
      {
        "threshold": 229,
        "points": 26
      },
      {
        "threshold": 230,
        "points": 25
      },
      {
        "threshold": 231,
        "points": 24
      },
      {
        "threshold": 232,
        "points": 23
      },
      {
        "threshold": 233,
        "points": 22
      },
      {
        "threshold": 234,
        "points": 21
      },
      {
        "threshold": 235,
        "points": 20
      },
      {
        "threshold": 236,
        "points": 19
      },
      {
        "threshold": 237,
        "points": 18
      },
      {
        "threshold": 238,
        "points": 17
      },
      {
        "threshold": 239,
        "points": 16
      },
      {
        "threshold": 240,
        "points": 15
      },
      {
        "threshold": 241,
        "points": 14
      },
      {
        "threshold": 242,
        "points": 13
      },
      {
        "threshold": 243,
        "points": 12
      },
      {
        "threshold": 244,
        "points": 11
      },
      {
        "threshold": 245,
        "points": 10
      },
      {
        "threshold": 246,
        "points": 9
      },
      {
        "threshold": 247,
        "points": 8
      },
      {
        "threshold": 248,
        "points": 7
      },
      {
        "threshold": 249,
        "points": 6
      },
      {
        "threshold": 250,
        "points": 5
      },
      {
        "threshold": 251,
        "points": 4
      },
      {
        "threshold": 252,
        "points": 3
      },
      {
        "threshold": 253,
        "points": 2
      },
      {
        "threshold": 254,
        "points": 1
      },
      {
        "threshold": 255,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 50,
        "points": 0
      },
      {
        "threshold": 51,
        "points": 2
      },
      {
        "threshold": 52,
        "points": 4
      },
      {
        "threshold": 53,
        "points": 6
      },
      {
        "threshold": 54,
        "points": 8
      },
      {
        "threshold": 55,
        "points": 10
      },
      {
        "threshold": 56,
        "points": 12
      },
      {
        "threshold": 57,
        "points": 14
      },
      {
        "threshold": 58,
        "points": 16
      },
      {
        "threshold": 59,
        "points": 18
      },
      {
        "threshold": 60,
        "points": 20
      },
      {
        "threshold": 61,
        "points": 22
      },
      {
        "threshold": 62,
        "points": 24
      },
      {
        "threshold": 63,
        "points": 26
      },
      {
        "threshold": 64,
        "points": 28
      },
      {
        "threshold": 65,
        "points": 30
      },
      {
        "threshold": 66,
        "points": 32
      },
      {
        "threshold": 67,
        "points": 34
      },
      {
        "threshold": 68,
        "points": 36
      },
      {
        "threshold": 69,
        "points": 38
      },
      {
        "threshold": 70,
        "points": 40
      },
      {
        "threshold": 71,
        "points": 42
      },
      {
        "threshold": 72,
        "points": 44
      },
      {
        "threshold": 73,
        "points": 46
      },
      {
        "threshold": 74,
        "points": 48
      },
      {
        "threshold": 75,
        "points": 50
      },
      {
        "threshold": 76,
        "points": 52
      },
      {
        "threshold": 77,
        "points": 54
      },
      {
        "threshold": 78,
        "points": 56
      },
      {
        "threshold": 79,
        "points": 58
      },
      {
        "threshold": 80,
        "points": 60
      },
      {
        "threshold": 83,
        "points": 61
      },
      {
        "threshold": 86,
        "points": 62
      },
      {
        "threshold": 90,
        "points": 63
      },
      {
        "threshold": 93,
        "points": 64
      },
      {
        "threshold": 96,
        "points": 65
      },
      {
        "threshold": 99,
        "points": 66
      },
      {
        "threshold": 103,
        "points": 67
      },
      {
        "threshold": 106,
        "points": 68
      },
      {
        "threshold": 109,
        "points": 69
      },
      {
        "threshold": 112,
        "points": 70
      },
      {
        "threshold": 116,
        "points": 71
      },
      {
        "threshold": 119,
        "points": 72
      },
      {
        "threshold": 122,
        "points": 73
      },
      {
        "threshold": 126,
        "points": 74
      },
      {
        "threshold": 129,
        "points": 75
      },
      {
        "threshold": 132,
        "points": 76
      },
      {
        "threshold": 135,
        "points": 77
      },
      {
        "threshold": 138,
        "points": 78
      },
      {
        "threshold": 142,
        "points": 79
      },
      {
        "threshold": 145,
        "points": 80
      },
      {
        "threshold": 148,
        "points": 81
      },
      {
        "threshold": 151,
        "points": 82
      },
      {
        "threshold": 155,
        "points": 83
      },
      {
        "threshold": 158,
        "points": 84
      },
      {
        "threshold": 161,
        "points": 85
      },
      {
        "threshold": 165,
        "points": 86
      },
      {
        "threshold": 168,
        "points": 87
      },
      {
        "threshold": 171,
        "points": 88
      },
      {
        "threshold": 174,
        "points": 89
      },
      {
        "threshold": 178,
        "points": 90
      },
      {
        "threshold": 181,
        "points": 91
      },
      {
        "threshold": 184,
        "points": 92
      },
      {
        "threshold": 187,
        "points": 93
      },
      {
        "threshold": 191,
        "points": 94
      },
      {
        "threshold": 194,
        "points": 95
      },
      {
        "threshold": 197,
        "points": 96
      },
      {
        "threshold": 200,
        "points": 97
      },
      {
        "threshold": 204,
        "points": 98
      },
      {
        "threshold": 207,
        "points": 99
      },
      {
        "threshold": 210,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 930,
        "points": 100
      },
      {
        "threshold": 944,
        "points": 99
      },
      {
        "threshold": 955,
        "points": 98
      },
      {
        "threshold": 960,
        "points": 97
      },
      {
        "threshold": 964,
        "points": 96
      },
      {
        "threshold": 987,
        "points": 95
      },
      {
        "threshold": 1006,
        "points": 94
      },
      {
        "threshold": 1023,
        "points": 93
      },
      {
        "threshold": 1037,
        "points": 92
      },
      {
        "threshold": 1051,
        "points": 91
      },
      {
        "threshold": 1064,
        "points": 90
      },
      {
        "threshold": 1100,
        "points": 89
      },
      {
        "threshold": 1110,
        "points": 88
      },
      {
        "threshold": 1120,
        "points": 87
      },
      {
        "threshold": 1130,
        "points": 86
      },
      {
        "threshold": 1139,
        "points": 85
      },
      {
        "threshold": 1148,
        "points": 84
      },
      {
        "threshold": 1158,
        "points": 83
      },
      {
        "threshold": 1167,
        "points": 82
      },
      {
        "threshold": 1176,
        "points": 81
      },
      {
        "threshold": 1185,
        "points": 80
      },
      {
        "threshold": 1193,
        "points": 79
      },
      {
        "threshold": 1201,
        "points": 78
      },
      {
        "threshold": 1210,
        "points": 77
      },
      {
        "threshold": 1218,
        "points": 76
      },
      {
        "threshold": 1226,
        "points": 75
      },
      {
        "threshold": 1234,
        "points": 74
      },
      {
        "threshold": 1242,
        "points": 73
      },
      {
        "threshold": 1250,
        "points": 72
      },
      {
        "threshold": 1258,
        "points": 71
      },
      {
        "threshold": 1260,
        "points": 70
      },
      {
        "threshold": 1275,
        "points": 69
      },
      {
        "threshold": 1283,
        "points": 68
      },
      {
        "threshold": 1292,
        "points": 67
      },
      {
        "threshold": 1300,
        "points": 66
      },
      {
        "threshold": 1309,
        "points": 65
      },
      {
        "threshold": 1319,
        "points": 64
      },
      {
        "threshold": 1329,
        "points": 63
      },
      {
        "threshold": 1339,
        "points": 62
      },
      {
        "threshold": 1351,
        "points": 61
      },
      {
        "threshold": 1365,
        "points": 60
      },
      {
        "threshold": 1368,
        "points": 59
      },
      {
        "threshold": 1371,
        "points": 58
      },
      {
        "threshold": 1374,
        "points": 57
      },
      {
        "threshold": 1377,
        "points": 56
      },
      {
        "threshold": 1380,
        "points": 55
      },
      {
        "threshold": 1382,
        "points": 54
      },
      {
        "threshold": 1385,
        "points": 53
      },
      {
        "threshold": 1388,
        "points": 52
      },
      {
        "threshold": 1391,
        "points": 51
      },
      {
        "threshold": 1394,
        "points": 50
      },
      {
        "threshold": 1397,
        "points": 49
      },
      {
        "threshold": 1400,
        "points": 48
      },
      {
        "threshold": 1403,
        "points": 47
      },
      {
        "threshold": 1406,
        "points": 46
      },
      {
        "threshold": 1409,
        "points": 45
      },
      {
        "threshold": 1412,
        "points": 44
      },
      {
        "threshold": 1414,
        "points": 43
      },
      {
        "threshold": 1417,
        "points": 42
      },
      {
        "threshold": 1420,
        "points": 41
      },
      {
        "threshold": 1423,
        "points": 40
      },
      {
        "threshold": 1426,
        "points": 39
      },
      {
        "threshold": 1429,
        "points": 38
      },
      {
        "threshold": 1432,
        "points": 37
      },
      {
        "threshold": 1435,
        "points": 36
      },
      {
        "threshold": 1438,
        "points": 35
      },
      {
        "threshold": 1441,
        "points": 34
      },
      {
        "threshold": 1444,
        "points": 33
      },
      {
        "threshold": 1446,
        "points": 32
      },
      {
        "threshold": 1449,
        "points": 31
      },
      {
        "threshold": 1452,
        "points": 30
      },
      {
        "threshold": 1455,
        "points": 29
      },
      {
        "threshold": 1458,
        "points": 28
      },
      {
        "threshold": 1461,
        "points": 27
      },
      {
        "threshold": 1464,
        "points": 26
      },
      {
        "threshold": 1467,
        "points": 25
      },
      {
        "threshold": 1470,
        "points": 24
      },
      {
        "threshold": 1473,
        "points": 23
      },
      {
        "threshold": 1476,
        "points": 22
      },
      {
        "threshold": 1478,
        "points": 21
      },
      {
        "threshold": 1481,
        "points": 20
      },
      {
        "threshold": 1484,
        "points": 19
      },
      {
        "threshold": 1487,
        "points": 18
      },
      {
        "threshold": 1490,
        "points": 17
      },
      {
        "threshold": 1493,
        "points": 16
      },
      {
        "threshold": 1496,
        "points": 15
      },
      {
        "threshold": 1499,
        "points": 14
      },
      {
        "threshold": 1502,
        "points": 13
      },
      {
        "threshold": 1505,
        "points": 12
      },
      {
        "threshold": 1508,
        "points": 11
      },
      {
        "threshold": 1510,
        "points": 10
      },
      {
        "threshold": 1513,
        "points": 9
      },
      {
        "threshold": 1516,
        "points": 8
      },
      {
        "threshold": 1519,
        "points": 7
      },
      {
        "threshold": 1522,
        "points": 6
      },
      {
        "threshold": 1525,
        "points": 5
      },
      {
        "threshold": 1528,
        "points": 4
      },
      {
        "threshold": 1531,
        "points": 3
      },
      {
        "threshold": 1534,
        "points": 2
      },
      {
        "threshold": 1537,
        "points": 1
      },
      {
        "threshold": 1540,
        "points": 0
      }
    ]
  },
  "male|32-36": {
    "deadlift": [
      {
        "threshold": 80,
        "points": 0
      },
      {
        "threshold": 90,
        "points": 10
      },
      {
        "threshold": 100,
        "points": 20
      },
      {
        "threshold": 110,
        "points": 30
      },
      {
        "threshold": 120,
        "points": 40
      },
      {
        "threshold": 130,
        "points": 50
      },
      {
        "threshold": 140,
        "points": 60
      },
      {
        "threshold": 150,
        "points": 61
      },
      {
        "threshold": 160,
        "points": 63
      },
      {
        "threshold": 170,
        "points": 65
      },
      {
        "threshold": 180,
        "points": 67
      },
      {
        "threshold": 190,
        "points": 70
      },
      {
        "threshold": 200,
        "points": 71
      },
      {
        "threshold": 210,
        "points": 73
      },
      {
        "threshold": 220,
        "points": 75
      },
      {
        "threshold": 230,
        "points": 77
      },
      {
        "threshold": 240,
        "points": 79
      },
      {
        "threshold": 250,
        "points": 81
      },
      {
        "threshold": 260,
        "points": 83
      },
      {
        "threshold": 270,
        "points": 85
      },
      {
        "threshold": 280,
        "points": 87
      },
      {
        "threshold": 290,
        "points": 89
      },
      {
        "threshold": 300,
        "points": 91
      },
      {
        "threshold": 310,
        "points": 93
      },
      {
        "threshold": 320,
        "points": 95
      },
      {
        "threshold": 330,
        "points": 97
      },
      {
        "threshold": 340,
        "points": 99
      },
      {
        "threshold": 350,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 13,
        "points": 60
      },
      {
        "threshold": 15,
        "points": 61
      },
      {
        "threshold": 16,
        "points": 62
      },
      {
        "threshold": 18,
        "points": 63
      },
      {
        "threshold": 19,
        "points": 64
      },
      {
        "threshold": 20,
        "points": 65
      },
      {
        "threshold": 21,
        "points": 66
      },
      {
        "threshold": 22,
        "points": 67
      },
      {
        "threshold": 24,
        "points": 68
      },
      {
        "threshold": 25,
        "points": 69
      },
      {
        "threshold": 26,
        "points": 70
      },
      {
        "threshold": 27,
        "points": 71
      },
      {
        "threshold": 28,
        "points": 72
      },
      {
        "threshold": 29,
        "points": 73
      },
      {
        "threshold": 30,
        "points": 74
      },
      {
        "threshold": 31,
        "points": 75
      },
      {
        "threshold": 32,
        "points": 76
      },
      {
        "threshold": 33,
        "points": 77
      },
      {
        "threshold": 34,
        "points": 78
      },
      {
        "threshold": 35,
        "points": 79
      },
      {
        "threshold": 36,
        "points": 80
      },
      {
        "threshold": 37,
        "points": 81
      },
      {
        "threshold": 39,
        "points": 82
      },
      {
        "threshold": 40,
        "points": 83
      },
      {
        "threshold": 41,
        "points": 84
      },
      {
        "threshold": 42,
        "points": 85
      },
      {
        "threshold": 43,
        "points": 86
      },
      {
        "threshold": 44,
        "points": 87
      },
      {
        "threshold": 45,
        "points": 88
      },
      {
        "threshold": 46,
        "points": 89
      },
      {
        "threshold": 47,
        "points": 90
      },
      {
        "threshold": 48,
        "points": 91
      },
      {
        "threshold": 49,
        "points": 92
      },
      {
        "threshold": 51,
        "points": 93
      },
      {
        "threshold": 52,
        "points": 94
      },
      {
        "threshold": 53,
        "points": 95
      },
      {
        "threshold": 54,
        "points": 96
      },
      {
        "threshold": 55,
        "points": 97
      },
      {
        "threshold": 57,
        "points": 98
      },
      {
        "threshold": 58,
        "points": 99
      },
      {
        "threshold": 60,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 93,
        "points": 100
      },
      {
        "threshold": 94,
        "points": 99
      },
      {
        "threshold": 97,
        "points": 98
      },
      {
        "threshold": 98,
        "points": 97
      },
      {
        "threshold": 100,
        "points": 96
      },
      {
        "threshold": 101,
        "points": 95
      },
      {
        "threshold": 103,
        "points": 94
      },
      {
        "threshold": 104,
        "points": 93
      },
      {
        "threshold": 105,
        "points": 92
      },
      {
        "threshold": 106,
        "points": 91
      },
      {
        "threshold": 108,
        "points": 90
      },
      {
        "threshold": 109,
        "points": 89
      },
      {
        "threshold": 110,
        "points": 88
      },
      {
        "threshold": 111,
        "points": 87
      },
      {
        "threshold": 112,
        "points": 86
      },
      {
        "threshold": 113,
        "points": 85
      },
      {
        "threshold": 114,
        "points": 84
      },
      {
        "threshold": 115,
        "points": 83
      },
      {
        "threshold": 116,
        "points": 82
      },
      {
        "threshold": 117,
        "points": 81
      },
      {
        "threshold": 118,
        "points": 80
      },
      {
        "threshold": 119,
        "points": 79
      },
      {
        "threshold": 120,
        "points": 78
      },
      {
        "threshold": 121,
        "points": 77
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 123,
        "points": 75
      },
      {
        "threshold": 124,
        "points": 74
      },
      {
        "threshold": 125,
        "points": 73
      },
      {
        "threshold": 127,
        "points": 72
      },
      {
        "threshold": 128,
        "points": 71
      },
      {
        "threshold": 130,
        "points": 70
      },
      {
        "threshold": 131,
        "points": 69
      },
      {
        "threshold": 133,
        "points": 68
      },
      {
        "threshold": 135,
        "points": 67
      },
      {
        "threshold": 136,
        "points": 66
      },
      {
        "threshold": 139,
        "points": 65
      },
      {
        "threshold": 141,
        "points": 64
      },
      {
        "threshold": 144,
        "points": 63
      },
      {
        "threshold": 146,
        "points": 62
      },
      {
        "threshold": 151,
        "points": 61
      },
      {
        "threshold": 156,
        "points": 60
      },
      {
        "threshold": 157,
        "points": 59
      },
      {
        "threshold": 158,
        "points": 58
      },
      {
        "threshold": 159,
        "points": 57
      },
      {
        "threshold": 160,
        "points": 56
      },
      {
        "threshold": 161,
        "points": 55
      },
      {
        "threshold": 162,
        "points": 54
      },
      {
        "threshold": 163,
        "points": 53
      },
      {
        "threshold": 164,
        "points": 52
      },
      {
        "threshold": 165,
        "points": 51
      },
      {
        "threshold": 166,
        "points": 50
      },
      {
        "threshold": 167,
        "points": 49
      },
      {
        "threshold": 168,
        "points": 48
      },
      {
        "threshold": 169,
        "points": 47
      },
      {
        "threshold": 170,
        "points": 46
      },
      {
        "threshold": 171,
        "points": 45
      },
      {
        "threshold": 172,
        "points": 44
      },
      {
        "threshold": 173,
        "points": 43
      },
      {
        "threshold": 174,
        "points": 42
      },
      {
        "threshold": 175,
        "points": 41
      },
      {
        "threshold": 176,
        "points": 40
      },
      {
        "threshold": 177,
        "points": 39
      },
      {
        "threshold": 178,
        "points": 38
      },
      {
        "threshold": 179,
        "points": 37
      },
      {
        "threshold": 180,
        "points": 36
      },
      {
        "threshold": 181,
        "points": 35
      },
      {
        "threshold": 182,
        "points": 34
      },
      {
        "threshold": 183,
        "points": 33
      },
      {
        "threshold": 184,
        "points": 32
      },
      {
        "threshold": 185,
        "points": 31
      },
      {
        "threshold": 186,
        "points": 30
      },
      {
        "threshold": 187,
        "points": 29
      },
      {
        "threshold": 188,
        "points": 28
      },
      {
        "threshold": 189,
        "points": 27
      },
      {
        "threshold": 190,
        "points": 26
      },
      {
        "threshold": 191,
        "points": 25
      },
      {
        "threshold": 192,
        "points": 24
      },
      {
        "threshold": 193,
        "points": 23
      },
      {
        "threshold": 194,
        "points": 22
      },
      {
        "threshold": 195,
        "points": 21
      },
      {
        "threshold": 196,
        "points": 20
      },
      {
        "threshold": 197,
        "points": 19
      },
      {
        "threshold": 198,
        "points": 18
      },
      {
        "threshold": 199,
        "points": 17
      },
      {
        "threshold": 200,
        "points": 16
      },
      {
        "threshold": 201,
        "points": 15
      },
      {
        "threshold": 202,
        "points": 14
      },
      {
        "threshold": 203,
        "points": 13
      },
      {
        "threshold": 204,
        "points": 12
      },
      {
        "threshold": 205,
        "points": 11
      },
      {
        "threshold": 206,
        "points": 10
      },
      {
        "threshold": 207,
        "points": 9
      },
      {
        "threshold": 208,
        "points": 8
      },
      {
        "threshold": 209,
        "points": 7
      },
      {
        "threshold": 210,
        "points": 6
      },
      {
        "threshold": 211,
        "points": 5
      },
      {
        "threshold": 212,
        "points": 4
      },
      {
        "threshold": 213,
        "points": 3
      },
      {
        "threshold": 214,
        "points": 2
      },
      {
        "threshold": 215,
        "points": 1
      },
      {
        "threshold": 216,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 45,
        "points": 0
      },
      {
        "threshold": 46,
        "points": 2
      },
      {
        "threshold": 47,
        "points": 4
      },
      {
        "threshold": 48,
        "points": 6
      },
      {
        "threshold": 49,
        "points": 8
      },
      {
        "threshold": 50,
        "points": 10
      },
      {
        "threshold": 51,
        "points": 12
      },
      {
        "threshold": 52,
        "points": 14
      },
      {
        "threshold": 53,
        "points": 16
      },
      {
        "threshold": 54,
        "points": 18
      },
      {
        "threshold": 55,
        "points": 20
      },
      {
        "threshold": 56,
        "points": 22
      },
      {
        "threshold": 57,
        "points": 24
      },
      {
        "threshold": 58,
        "points": 26
      },
      {
        "threshold": 59,
        "points": 28
      },
      {
        "threshold": 60,
        "points": 30
      },
      {
        "threshold": 61,
        "points": 32
      },
      {
        "threshold": 62,
        "points": 34
      },
      {
        "threshold": 63,
        "points": 36
      },
      {
        "threshold": 64,
        "points": 38
      },
      {
        "threshold": 65,
        "points": 40
      },
      {
        "threshold": 66,
        "points": 42
      },
      {
        "threshold": 67,
        "points": 44
      },
      {
        "threshold": 68,
        "points": 46
      },
      {
        "threshold": 69,
        "points": 48
      },
      {
        "threshold": 70,
        "points": 50
      },
      {
        "threshold": 71,
        "points": 52
      },
      {
        "threshold": 72,
        "points": 54
      },
      {
        "threshold": 73,
        "points": 56
      },
      {
        "threshold": 74,
        "points": 58
      },
      {
        "threshold": 75,
        "points": 60
      },
      {
        "threshold": 78,
        "points": 61
      },
      {
        "threshold": 82,
        "points": 62
      },
      {
        "threshold": 85,
        "points": 63
      },
      {
        "threshold": 88,
        "points": 64
      },
      {
        "threshold": 91,
        "points": 65
      },
      {
        "threshold": 95,
        "points": 66
      },
      {
        "threshold": 98,
        "points": 67
      },
      {
        "threshold": 101,
        "points": 68
      },
      {
        "threshold": 104,
        "points": 69
      },
      {
        "threshold": 107,
        "points": 70
      },
      {
        "threshold": 111,
        "points": 71
      },
      {
        "threshold": 114,
        "points": 72
      },
      {
        "threshold": 117,
        "points": 73
      },
      {
        "threshold": 120,
        "points": 74
      },
      {
        "threshold": 124,
        "points": 75
      },
      {
        "threshold": 127,
        "points": 76
      },
      {
        "threshold": 130,
        "points": 77
      },
      {
        "threshold": 133,
        "points": 78
      },
      {
        "threshold": 137,
        "points": 79
      },
      {
        "threshold": 140,
        "points": 80
      },
      {
        "threshold": 143,
        "points": 81
      },
      {
        "threshold": 147,
        "points": 82
      },
      {
        "threshold": 150,
        "points": 83
      },
      {
        "threshold": 153,
        "points": 84
      },
      {
        "threshold": 156,
        "points": 85
      },
      {
        "threshold": 160,
        "points": 86
      },
      {
        "threshold": 163,
        "points": 87
      },
      {
        "threshold": 166,
        "points": 88
      },
      {
        "threshold": 169,
        "points": 89
      },
      {
        "threshold": 173,
        "points": 90
      },
      {
        "threshold": 176,
        "points": 91
      },
      {
        "threshold": 179,
        "points": 92
      },
      {
        "threshold": 182,
        "points": 93
      },
      {
        "threshold": 186,
        "points": 94
      },
      {
        "threshold": 189,
        "points": 95
      },
      {
        "threshold": 192,
        "points": 96
      },
      {
        "threshold": 195,
        "points": 97
      },
      {
        "threshold": 199,
        "points": 98
      },
      {
        "threshold": 202,
        "points": 99
      },
      {
        "threshold": 205,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 822,
        "points": 100
      },
      {
        "threshold": 846,
        "points": 99
      },
      {
        "threshold": 863,
        "points": 98
      },
      {
        "threshold": 877,
        "points": 97
      },
      {
        "threshold": 889,
        "points": 96
      },
      {
        "threshold": 901,
        "points": 95
      },
      {
        "threshold": 912,
        "points": 94
      },
      {
        "threshold": 923,
        "points": 93
      },
      {
        "threshold": 933,
        "points": 92
      },
      {
        "threshold": 943,
        "points": 91
      },
      {
        "threshold": 950,
        "points": 90
      },
      {
        "threshold": 953,
        "points": 89
      },
      {
        "threshold": 962,
        "points": 88
      },
      {
        "threshold": 972,
        "points": 87
      },
      {
        "threshold": 981,
        "points": 86
      },
      {
        "threshold": 990,
        "points": 85
      },
      {
        "threshold": 1000,
        "points": 84
      },
      {
        "threshold": 1009,
        "points": 83
      },
      {
        "threshold": 1018,
        "points": 82
      },
      {
        "threshold": 1027,
        "points": 81
      },
      {
        "threshold": 1036,
        "points": 80
      },
      {
        "threshold": 1046,
        "points": 79
      },
      {
        "threshold": 1054,
        "points": 78
      },
      {
        "threshold": 1062,
        "points": 77
      },
      {
        "threshold": 1070,
        "points": 76
      },
      {
        "threshold": 1078,
        "points": 75
      },
      {
        "threshold": 1087,
        "points": 74
      },
      {
        "threshold": 1095,
        "points": 73
      },
      {
        "threshold": 1103,
        "points": 72
      },
      {
        "threshold": 1110,
        "points": 70
      },
      {
        "threshold": 1138,
        "points": 69
      },
      {
        "threshold": 1146,
        "points": 68
      },
      {
        "threshold": 1156,
        "points": 67
      },
      {
        "threshold": 1165,
        "points": 66
      },
      {
        "threshold": 1174,
        "points": 65
      },
      {
        "threshold": 1184,
        "points": 64
      },
      {
        "threshold": 1195,
        "points": 63
      },
      {
        "threshold": 1206,
        "points": 62
      },
      {
        "threshold": 1218,
        "points": 61
      },
      {
        "threshold": 1244,
        "points": 60
      },
      {
        "threshold": 1247,
        "points": 59
      },
      {
        "threshold": 1250,
        "points": 58
      },
      {
        "threshold": 1252,
        "points": 57
      },
      {
        "threshold": 1255,
        "points": 56
      },
      {
        "threshold": 1258,
        "points": 55
      },
      {
        "threshold": 1261,
        "points": 54
      },
      {
        "threshold": 1264,
        "points": 53
      },
      {
        "threshold": 1266,
        "points": 52
      },
      {
        "threshold": 1269,
        "points": 51
      },
      {
        "threshold": 1272,
        "points": 50
      },
      {
        "threshold": 1275,
        "points": 49
      },
      {
        "threshold": 1278,
        "points": 48
      },
      {
        "threshold": 1280,
        "points": 47
      },
      {
        "threshold": 1283,
        "points": 46
      },
      {
        "threshold": 1286,
        "points": 45
      },
      {
        "threshold": 1289,
        "points": 44
      },
      {
        "threshold": 1291,
        "points": 43
      },
      {
        "threshold": 1294,
        "points": 42
      },
      {
        "threshold": 1297,
        "points": 41
      },
      {
        "threshold": 1300,
        "points": 40
      },
      {
        "threshold": 1303,
        "points": 39
      },
      {
        "threshold": 1305,
        "points": 38
      },
      {
        "threshold": 1308,
        "points": 37
      },
      {
        "threshold": 1311,
        "points": 36
      },
      {
        "threshold": 1314,
        "points": 35
      },
      {
        "threshold": 1317,
        "points": 34
      },
      {
        "threshold": 1319,
        "points": 33
      },
      {
        "threshold": 1322,
        "points": 32
      },
      {
        "threshold": 1325,
        "points": 31
      },
      {
        "threshold": 1328,
        "points": 30
      },
      {
        "threshold": 1331,
        "points": 29
      },
      {
        "threshold": 1333,
        "points": 28
      },
      {
        "threshold": 1336,
        "points": 27
      },
      {
        "threshold": 1339,
        "points": 26
      },
      {
        "threshold": 1342,
        "points": 25
      },
      {
        "threshold": 1345,
        "points": 24
      },
      {
        "threshold": 1347,
        "points": 23
      },
      {
        "threshold": 1350,
        "points": 22
      },
      {
        "threshold": 1353,
        "points": 21
      },
      {
        "threshold": 1356,
        "points": 20
      },
      {
        "threshold": 1359,
        "points": 19
      },
      {
        "threshold": 1361,
        "points": 18
      },
      {
        "threshold": 1364,
        "points": 17
      },
      {
        "threshold": 1367,
        "points": 16
      },
      {
        "threshold": 1370,
        "points": 15
      },
      {
        "threshold": 1373,
        "points": 14
      },
      {
        "threshold": 1375,
        "points": 13
      },
      {
        "threshold": 1378,
        "points": 12
      },
      {
        "threshold": 1381,
        "points": 11
      },
      {
        "threshold": 1384,
        "points": 10
      },
      {
        "threshold": 1386,
        "points": 9
      },
      {
        "threshold": 1389,
        "points": 8
      },
      {
        "threshold": 1392,
        "points": 7
      },
      {
        "threshold": 1395,
        "points": 6
      },
      {
        "threshold": 1398,
        "points": 5
      },
      {
        "threshold": 1400,
        "points": 4
      },
      {
        "threshold": 1403,
        "points": 3
      },
      {
        "threshold": 1406,
        "points": 2
      },
      {
        "threshold": 1409,
        "points": 1
      },
      {
        "threshold": 1412,
        "points": 0
      }
    ]
  },
  "female|32-36": {
    "deadlift": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 70,
        "points": 10
      },
      {
        "threshold": 80,
        "points": 20
      },
      {
        "threshold": 90,
        "points": 30
      },
      {
        "threshold": 100,
        "points": 40
      },
      {
        "threshold": 110,
        "points": 50
      },
      {
        "threshold": 120,
        "points": 60
      },
      {
        "threshold": 130,
        "points": 68
      },
      {
        "threshold": 140,
        "points": 74
      },
      {
        "threshold": 150,
        "points": 79
      },
      {
        "threshold": 160,
        "points": 83
      },
      {
        "threshold": 170,
        "points": 87
      },
      {
        "threshold": 180,
        "points": 90
      },
      {
        "threshold": 190,
        "points": 93
      },
      {
        "threshold": 200,
        "points": 95
      },
      {
        "threshold": 210,
        "points": 97
      },
      {
        "threshold": 220,
        "points": 99
      },
      {
        "threshold": 230,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
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
        "points": 65
      },
      {
        "threshold": 14,
        "points": 67
      },
      {
        "threshold": 15,
        "points": 68
      },
      {
        "threshold": 16,
        "points": 70
      },
      {
        "threshold": 17,
        "points": 72
      },
      {
        "threshold": 18,
        "points": 73
      },
      {
        "threshold": 19,
        "points": 75
      },
      {
        "threshold": 20,
        "points": 76
      },
      {
        "threshold": 21,
        "points": 78
      },
      {
        "threshold": 22,
        "points": 79
      },
      {
        "threshold": 23,
        "points": 80
      },
      {
        "threshold": 24,
        "points": 82
      },
      {
        "threshold": 25,
        "points": 83
      },
      {
        "threshold": 26,
        "points": 84
      },
      {
        "threshold": 27,
        "points": 85
      },
      {
        "threshold": 28,
        "points": 86
      },
      {
        "threshold": 29,
        "points": 87
      },
      {
        "threshold": 30,
        "points": 88
      },
      {
        "threshold": 31,
        "points": 89
      },
      {
        "threshold": 32,
        "points": 90
      },
      {
        "threshold": 33,
        "points": 91
      },
      {
        "threshold": 34,
        "points": 92
      },
      {
        "threshold": 35,
        "points": 93
      },
      {
        "threshold": 36,
        "points": 94
      },
      {
        "threshold": 38,
        "points": 95
      },
      {
        "threshold": 39,
        "points": 96
      },
      {
        "threshold": 40,
        "points": 97
      },
      {
        "threshold": 42,
        "points": 98
      },
      {
        "threshold": 44,
        "points": 99
      },
      {
        "threshold": 47,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 119,
        "points": 100
      },
      {
        "threshold": 121,
        "points": 99
      },
      {
        "threshold": 125,
        "points": 98
      },
      {
        "threshold": 128,
        "points": 97
      },
      {
        "threshold": 130,
        "points": 96
      },
      {
        "threshold": 131,
        "points": 95
      },
      {
        "threshold": 134,
        "points": 94
      },
      {
        "threshold": 135,
        "points": 93
      },
      {
        "threshold": 137,
        "points": 92
      },
      {
        "threshold": 138,
        "points": 91
      },
      {
        "threshold": 140,
        "points": 90
      },
      {
        "threshold": 141,
        "points": 89
      },
      {
        "threshold": 143,
        "points": 88
      },
      {
        "threshold": 144,
        "points": 87
      },
      {
        "threshold": 146,
        "points": 86
      },
      {
        "threshold": 147,
        "points": 85
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 150,
        "points": 83
      },
      {
        "threshold": 151,
        "points": 82
      },
      {
        "threshold": 152,
        "points": 81
      },
      {
        "threshold": 154,
        "points": 80
      },
      {
        "threshold": 155,
        "points": 79
      },
      {
        "threshold": 156,
        "points": 78
      },
      {
        "threshold": 157,
        "points": 77
      },
      {
        "threshold": 159,
        "points": 76
      },
      {
        "threshold": 160,
        "points": 75
      },
      {
        "threshold": 161,
        "points": 74
      },
      {
        "threshold": 163,
        "points": 73
      },
      {
        "threshold": 165,
        "points": 72
      },
      {
        "threshold": 166,
        "points": 71
      },
      {
        "threshold": 167,
        "points": 70
      },
      {
        "threshold": 170,
        "points": 69
      },
      {
        "threshold": 171,
        "points": 68
      },
      {
        "threshold": 173,
        "points": 67
      },
      {
        "threshold": 175,
        "points": 66
      },
      {
        "threshold": 178,
        "points": 65
      },
      {
        "threshold": 180,
        "points": 64
      },
      {
        "threshold": 182,
        "points": 63
      },
      {
        "threshold": 186,
        "points": 62
      },
      {
        "threshold": 195,
        "points": 61
      },
      {
        "threshold": 202,
        "points": 60
      },
      {
        "threshold": 203,
        "points": 59
      },
      {
        "threshold": 204,
        "points": 58
      },
      {
        "threshold": 205,
        "points": 57
      },
      {
        "threshold": 206,
        "points": 56
      },
      {
        "threshold": 207,
        "points": 55
      },
      {
        "threshold": 208,
        "points": 54
      },
      {
        "threshold": 209,
        "points": 53
      },
      {
        "threshold": 210,
        "points": 52
      },
      {
        "threshold": 211,
        "points": 51
      },
      {
        "threshold": 212,
        "points": 50
      },
      {
        "threshold": 213,
        "points": 49
      },
      {
        "threshold": 214,
        "points": 48
      },
      {
        "threshold": 215,
        "points": 47
      },
      {
        "threshold": 216,
        "points": 46
      },
      {
        "threshold": 217,
        "points": 45
      },
      {
        "threshold": 218,
        "points": 44
      },
      {
        "threshold": 219,
        "points": 43
      },
      {
        "threshold": 220,
        "points": 42
      },
      {
        "threshold": 221,
        "points": 41
      },
      {
        "threshold": 222,
        "points": 40
      },
      {
        "threshold": 223,
        "points": 39
      },
      {
        "threshold": 224,
        "points": 38
      },
      {
        "threshold": 225,
        "points": 37
      },
      {
        "threshold": 226,
        "points": 36
      },
      {
        "threshold": 227,
        "points": 35
      },
      {
        "threshold": 228,
        "points": 34
      },
      {
        "threshold": 229,
        "points": 33
      },
      {
        "threshold": 230,
        "points": 32
      },
      {
        "threshold": 231,
        "points": 31
      },
      {
        "threshold": 232,
        "points": 30
      },
      {
        "threshold": 233,
        "points": 29
      },
      {
        "threshold": 234,
        "points": 28
      },
      {
        "threshold": 235,
        "points": 27
      },
      {
        "threshold": 236,
        "points": 26
      },
      {
        "threshold": 237,
        "points": 25
      },
      {
        "threshold": 238,
        "points": 24
      },
      {
        "threshold": 239,
        "points": 23
      },
      {
        "threshold": 240,
        "points": 22
      },
      {
        "threshold": 241,
        "points": 21
      },
      {
        "threshold": 242,
        "points": 20
      },
      {
        "threshold": 243,
        "points": 19
      },
      {
        "threshold": 244,
        "points": 18
      },
      {
        "threshold": 245,
        "points": 17
      },
      {
        "threshold": 246,
        "points": 16
      },
      {
        "threshold": 247,
        "points": 15
      },
      {
        "threshold": 248,
        "points": 14
      },
      {
        "threshold": 249,
        "points": 13
      },
      {
        "threshold": 250,
        "points": 12
      },
      {
        "threshold": 251,
        "points": 11
      },
      {
        "threshold": 252,
        "points": 10
      },
      {
        "threshold": 253,
        "points": 9
      },
      {
        "threshold": 254,
        "points": 8
      },
      {
        "threshold": 255,
        "points": 7
      },
      {
        "threshold": 256,
        "points": 6
      },
      {
        "threshold": 257,
        "points": 5
      },
      {
        "threshold": 258,
        "points": 4
      },
      {
        "threshold": 259,
        "points": 3
      },
      {
        "threshold": 260,
        "points": 2
      },
      {
        "threshold": 261,
        "points": 1
      },
      {
        "threshold": 262,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 45,
        "points": 0
      },
      {
        "threshold": 46,
        "points": 2
      },
      {
        "threshold": 47,
        "points": 4
      },
      {
        "threshold": 48,
        "points": 6
      },
      {
        "threshold": 49,
        "points": 8
      },
      {
        "threshold": 50,
        "points": 10
      },
      {
        "threshold": 51,
        "points": 12
      },
      {
        "threshold": 52,
        "points": 14
      },
      {
        "threshold": 53,
        "points": 16
      },
      {
        "threshold": 54,
        "points": 18
      },
      {
        "threshold": 55,
        "points": 20
      },
      {
        "threshold": 56,
        "points": 22
      },
      {
        "threshold": 57,
        "points": 24
      },
      {
        "threshold": 58,
        "points": 26
      },
      {
        "threshold": 59,
        "points": 28
      },
      {
        "threshold": 60,
        "points": 30
      },
      {
        "threshold": 61,
        "points": 32
      },
      {
        "threshold": 62,
        "points": 34
      },
      {
        "threshold": 63,
        "points": 36
      },
      {
        "threshold": 64,
        "points": 38
      },
      {
        "threshold": 65,
        "points": 40
      },
      {
        "threshold": 66,
        "points": 42
      },
      {
        "threshold": 67,
        "points": 44
      },
      {
        "threshold": 68,
        "points": 46
      },
      {
        "threshold": 69,
        "points": 48
      },
      {
        "threshold": 70,
        "points": 50
      },
      {
        "threshold": 71,
        "points": 52
      },
      {
        "threshold": 72,
        "points": 54
      },
      {
        "threshold": 73,
        "points": 56
      },
      {
        "threshold": 74,
        "points": 58
      },
      {
        "threshold": 75,
        "points": 60
      },
      {
        "threshold": 78,
        "points": 61
      },
      {
        "threshold": 82,
        "points": 62
      },
      {
        "threshold": 85,
        "points": 63
      },
      {
        "threshold": 88,
        "points": 64
      },
      {
        "threshold": 91,
        "points": 65
      },
      {
        "threshold": 95,
        "points": 66
      },
      {
        "threshold": 98,
        "points": 67
      },
      {
        "threshold": 101,
        "points": 68
      },
      {
        "threshold": 104,
        "points": 69
      },
      {
        "threshold": 107,
        "points": 70
      },
      {
        "threshold": 111,
        "points": 71
      },
      {
        "threshold": 114,
        "points": 72
      },
      {
        "threshold": 117,
        "points": 73
      },
      {
        "threshold": 120,
        "points": 74
      },
      {
        "threshold": 124,
        "points": 75
      },
      {
        "threshold": 127,
        "points": 76
      },
      {
        "threshold": 130,
        "points": 77
      },
      {
        "threshold": 133,
        "points": 78
      },
      {
        "threshold": 137,
        "points": 79
      },
      {
        "threshold": 140,
        "points": 80
      },
      {
        "threshold": 143,
        "points": 81
      },
      {
        "threshold": 147,
        "points": 82
      },
      {
        "threshold": 150,
        "points": 83
      },
      {
        "threshold": 153,
        "points": 84
      },
      {
        "threshold": 156,
        "points": 85
      },
      {
        "threshold": 160,
        "points": 86
      },
      {
        "threshold": 163,
        "points": 87
      },
      {
        "threshold": 166,
        "points": 88
      },
      {
        "threshold": 169,
        "points": 89
      },
      {
        "threshold": 173,
        "points": 90
      },
      {
        "threshold": 176,
        "points": 91
      },
      {
        "threshold": 179,
        "points": 92
      },
      {
        "threshold": 182,
        "points": 93
      },
      {
        "threshold": 186,
        "points": 94
      },
      {
        "threshold": 189,
        "points": 95
      },
      {
        "threshold": 192,
        "points": 96
      },
      {
        "threshold": 195,
        "points": 97
      },
      {
        "threshold": 199,
        "points": 98
      },
      {
        "threshold": 202,
        "points": 99
      },
      {
        "threshold": 205,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 948,
        "points": 100
      },
      {
        "threshold": 975,
        "points": 99
      },
      {
        "threshold": 996,
        "points": 98
      },
      {
        "threshold": 1014,
        "points": 97
      },
      {
        "threshold": 1029,
        "points": 96
      },
      {
        "threshold": 1043,
        "points": 95
      },
      {
        "threshold": 1056,
        "points": 94
      },
      {
        "threshold": 1068,
        "points": 93
      },
      {
        "threshold": 1079,
        "points": 92
      },
      {
        "threshold": 1090,
        "points": 91
      },
      {
        "threshold": 1101,
        "points": 90
      },
      {
        "threshold": 1111,
        "points": 89
      },
      {
        "threshold": 1121,
        "points": 88
      },
      {
        "threshold": 1130,
        "points": 87
      },
      {
        "threshold": 1140,
        "points": 86
      },
      {
        "threshold": 1149,
        "points": 85
      },
      {
        "threshold": 1158,
        "points": 84
      },
      {
        "threshold": 1167,
        "points": 83
      },
      {
        "threshold": 1176,
        "points": 82
      },
      {
        "threshold": 1185,
        "points": 81
      },
      {
        "threshold": 1193,
        "points": 80
      },
      {
        "threshold": 1201,
        "points": 79
      },
      {
        "threshold": 1209,
        "points": 78
      },
      {
        "threshold": 1217,
        "points": 77
      },
      {
        "threshold": 1225,
        "points": 76
      },
      {
        "threshold": 1233,
        "points": 75
      },
      {
        "threshold": 1241,
        "points": 74
      },
      {
        "threshold": 1249,
        "points": 73
      },
      {
        "threshold": 1257,
        "points": 72
      },
      {
        "threshold": 1265,
        "points": 71
      },
      {
        "threshold": 1273,
        "points": 70
      },
      {
        "threshold": 1281,
        "points": 69
      },
      {
        "threshold": 1289,
        "points": 68
      },
      {
        "threshold": 1297,
        "points": 67
      },
      {
        "threshold": 1306,
        "points": 66
      },
      {
        "threshold": 1315,
        "points": 65
      },
      {
        "threshold": 1324,
        "points": 64
      },
      {
        "threshold": 1334,
        "points": 63
      },
      {
        "threshold": 1344,
        "points": 62
      },
      {
        "threshold": 1355,
        "points": 61
      },
      {
        "threshold": 1370,
        "points": 60
      },
      {
        "threshold": 1373,
        "points": 59
      },
      {
        "threshold": 1376,
        "points": 58
      },
      {
        "threshold": 1379,
        "points": 57
      },
      {
        "threshold": 1382,
        "points": 56
      },
      {
        "threshold": 1385,
        "points": 55
      },
      {
        "threshold": 1387,
        "points": 54
      },
      {
        "threshold": 1390,
        "points": 53
      },
      {
        "threshold": 1393,
        "points": 52
      },
      {
        "threshold": 1396,
        "points": 51
      },
      {
        "threshold": 1399,
        "points": 50
      },
      {
        "threshold": 1402,
        "points": 49
      },
      {
        "threshold": 1405,
        "points": 48
      },
      {
        "threshold": 1408,
        "points": 47
      },
      {
        "threshold": 1411,
        "points": 46
      },
      {
        "threshold": 1414,
        "points": 45
      },
      {
        "threshold": 1417,
        "points": 44
      },
      {
        "threshold": 1419,
        "points": 43
      },
      {
        "threshold": 1422,
        "points": 42
      },
      {
        "threshold": 1425,
        "points": 41
      },
      {
        "threshold": 1428,
        "points": 40
      },
      {
        "threshold": 1431,
        "points": 39
      },
      {
        "threshold": 1434,
        "points": 38
      },
      {
        "threshold": 1437,
        "points": 37
      },
      {
        "threshold": 1440,
        "points": 36
      },
      {
        "threshold": 1443,
        "points": 35
      },
      {
        "threshold": 1446,
        "points": 34
      },
      {
        "threshold": 1449,
        "points": 33
      },
      {
        "threshold": 1451,
        "points": 32
      },
      {
        "threshold": 1454,
        "points": 31
      },
      {
        "threshold": 1457,
        "points": 30
      },
      {
        "threshold": 1460,
        "points": 29
      },
      {
        "threshold": 1463,
        "points": 28
      },
      {
        "threshold": 1466,
        "points": 27
      },
      {
        "threshold": 1469,
        "points": 26
      },
      {
        "threshold": 1472,
        "points": 25
      },
      {
        "threshold": 1475,
        "points": 24
      },
      {
        "threshold": 1478,
        "points": 23
      },
      {
        "threshold": 1481,
        "points": 22
      },
      {
        "threshold": 1483,
        "points": 21
      },
      {
        "threshold": 1486,
        "points": 20
      },
      {
        "threshold": 1489,
        "points": 19
      },
      {
        "threshold": 1492,
        "points": 18
      },
      {
        "threshold": 1495,
        "points": 17
      },
      {
        "threshold": 1498,
        "points": 16
      },
      {
        "threshold": 1501,
        "points": 15
      },
      {
        "threshold": 1504,
        "points": 14
      },
      {
        "threshold": 1507,
        "points": 13
      },
      {
        "threshold": 1510,
        "points": 12
      },
      {
        "threshold": 1513,
        "points": 11
      },
      {
        "threshold": 1515,
        "points": 10
      },
      {
        "threshold": 1518,
        "points": 9
      },
      {
        "threshold": 1521,
        "points": 8
      },
      {
        "threshold": 1524,
        "points": 7
      },
      {
        "threshold": 1527,
        "points": 6
      },
      {
        "threshold": 1530,
        "points": 5
      },
      {
        "threshold": 1533,
        "points": 4
      },
      {
        "threshold": 1536,
        "points": 3
      },
      {
        "threshold": 1539,
        "points": 2
      },
      {
        "threshold": 1542,
        "points": 1
      },
      {
        "threshold": 1545,
        "points": 0
      }
    ]
  },
  "male|37-41": {
    "deadlift": [
      {
        "threshold": 80,
        "points": 0
      },
      {
        "threshold": 90,
        "points": 10
      },
      {
        "threshold": 100,
        "points": 20
      },
      {
        "threshold": 110,
        "points": 30
      },
      {
        "threshold": 120,
        "points": 40
      },
      {
        "threshold": 130,
        "points": 50
      },
      {
        "threshold": 140,
        "points": 60
      },
      {
        "threshold": 150,
        "points": 62
      },
      {
        "threshold": 160,
        "points": 63
      },
      {
        "threshold": 170,
        "points": 65
      },
      {
        "threshold": 180,
        "points": 67
      },
      {
        "threshold": 190,
        "points": 70
      },
      {
        "threshold": 200,
        "points": 71
      },
      {
        "threshold": 210,
        "points": 73
      },
      {
        "threshold": 220,
        "points": 75
      },
      {
        "threshold": 230,
        "points": 77
      },
      {
        "threshold": 240,
        "points": 79
      },
      {
        "threshold": 250,
        "points": 81
      },
      {
        "threshold": 260,
        "points": 83
      },
      {
        "threshold": 270,
        "points": 85
      },
      {
        "threshold": 280,
        "points": 87
      },
      {
        "threshold": 290,
        "points": 89
      },
      {
        "threshold": 300,
        "points": 91
      },
      {
        "threshold": 310,
        "points": 93
      },
      {
        "threshold": 320,
        "points": 95
      },
      {
        "threshold": 330,
        "points": 97
      },
      {
        "threshold": 340,
        "points": 99
      },
      {
        "threshold": 350,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 12,
        "points": 60
      },
      {
        "threshold": 14,
        "points": 61
      },
      {
        "threshold": 15,
        "points": 62
      },
      {
        "threshold": 17,
        "points": 63
      },
      {
        "threshold": 18,
        "points": 64
      },
      {
        "threshold": 19,
        "points": 65
      },
      {
        "threshold": 20,
        "points": 66
      },
      {
        "threshold": 21,
        "points": 67
      },
      {
        "threshold": 22,
        "points": 68
      },
      {
        "threshold": 23,
        "points": 69
      },
      {
        "threshold": 24,
        "points": 70
      },
      {
        "threshold": 25,
        "points": 71
      },
      {
        "threshold": 27,
        "points": 72
      },
      {
        "threshold": 28,
        "points": 73
      },
      {
        "threshold": 29,
        "points": 74
      },
      {
        "threshold": 30,
        "points": 75
      },
      {
        "threshold": 31,
        "points": 76
      },
      {
        "threshold": 32,
        "points": 77
      },
      {
        "threshold": 33,
        "points": 78
      },
      {
        "threshold": 34,
        "points": 79
      },
      {
        "threshold": 35,
        "points": 80
      },
      {
        "threshold": 36,
        "points": 81
      },
      {
        "threshold": 37,
        "points": 82
      },
      {
        "threshold": 38,
        "points": 83
      },
      {
        "threshold": 39,
        "points": 84
      },
      {
        "threshold": 40,
        "points": 85
      },
      {
        "threshold": 41,
        "points": 86
      },
      {
        "threshold": 42,
        "points": 87
      },
      {
        "threshold": 44,
        "points": 88
      },
      {
        "threshold": 45,
        "points": 89
      },
      {
        "threshold": 46,
        "points": 90
      },
      {
        "threshold": 47,
        "points": 91
      },
      {
        "threshold": 48,
        "points": 92
      },
      {
        "threshold": 49,
        "points": 93
      },
      {
        "threshold": 50,
        "points": 94
      },
      {
        "threshold": 51,
        "points": 95
      },
      {
        "threshold": 53,
        "points": 96
      },
      {
        "threshold": 54,
        "points": 97
      },
      {
        "threshold": 55,
        "points": 98
      },
      {
        "threshold": 57,
        "points": 99
      },
      {
        "threshold": 59,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 96,
        "points": 100
      },
      {
        "threshold": 97,
        "points": 99
      },
      {
        "threshold": 100,
        "points": 98
      },
      {
        "threshold": 102,
        "points": 97
      },
      {
        "threshold": 103,
        "points": 96
      },
      {
        "threshold": 105,
        "points": 95
      },
      {
        "threshold": 107,
        "points": 94
      },
      {
        "threshold": 108,
        "points": 93
      },
      {
        "threshold": 109,
        "points": 92
      },
      {
        "threshold": 110,
        "points": 91
      },
      {
        "threshold": 112,
        "points": 90
      },
      {
        "threshold": 113,
        "points": 89
      },
      {
        "threshold": 114,
        "points": 88
      },
      {
        "threshold": 115,
        "points": 87
      },
      {
        "threshold": 116,
        "points": 86
      },
      {
        "threshold": 117,
        "points": 85
      },
      {
        "threshold": 118,
        "points": 84
      },
      {
        "threshold": 119,
        "points": 83
      },
      {
        "threshold": 120,
        "points": 82
      },
      {
        "threshold": 121,
        "points": 81
      },
      {
        "threshold": 122,
        "points": 80
      },
      {
        "threshold": 123,
        "points": 79
      },
      {
        "threshold": 124,
        "points": 78
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 127,
        "points": 76
      },
      {
        "threshold": 128,
        "points": 75
      },
      {
        "threshold": 129,
        "points": 74
      },
      {
        "threshold": 130,
        "points": 73
      },
      {
        "threshold": 132,
        "points": 72
      },
      {
        "threshold": 133,
        "points": 71
      },
      {
        "threshold": 134,
        "points": 70
      },
      {
        "threshold": 136,
        "points": 69
      },
      {
        "threshold": 138,
        "points": 68
      },
      {
        "threshold": 140,
        "points": 67
      },
      {
        "threshold": 141,
        "points": 66
      },
      {
        "threshold": 144,
        "points": 65
      },
      {
        "threshold": 146,
        "points": 64
      },
      {
        "threshold": 148,
        "points": 63
      },
      {
        "threshold": 151,
        "points": 62
      },
      {
        "threshold": 156,
        "points": 61
      },
      {
        "threshold": 161,
        "points": 60
      },
      {
        "threshold": 162,
        "points": 59
      },
      {
        "threshold": 163,
        "points": 58
      },
      {
        "threshold": 164,
        "points": 57
      },
      {
        "threshold": 165,
        "points": 56
      },
      {
        "threshold": 166,
        "points": 55
      },
      {
        "threshold": 167,
        "points": 54
      },
      {
        "threshold": 168,
        "points": 53
      },
      {
        "threshold": 169,
        "points": 52
      },
      {
        "threshold": 170,
        "points": 51
      },
      {
        "threshold": 171,
        "points": 50
      },
      {
        "threshold": 172,
        "points": 49
      },
      {
        "threshold": 173,
        "points": 48
      },
      {
        "threshold": 174,
        "points": 47
      },
      {
        "threshold": 175,
        "points": 46
      },
      {
        "threshold": 176,
        "points": 45
      },
      {
        "threshold": 177,
        "points": 44
      },
      {
        "threshold": 178,
        "points": 43
      },
      {
        "threshold": 179,
        "points": 42
      },
      {
        "threshold": 180,
        "points": 41
      },
      {
        "threshold": 181,
        "points": 40
      },
      {
        "threshold": 182,
        "points": 39
      },
      {
        "threshold": 183,
        "points": 38
      },
      {
        "threshold": 184,
        "points": 37
      },
      {
        "threshold": 185,
        "points": 36
      },
      {
        "threshold": 186,
        "points": 35
      },
      {
        "threshold": 187,
        "points": 34
      },
      {
        "threshold": 188,
        "points": 33
      },
      {
        "threshold": 189,
        "points": 32
      },
      {
        "threshold": 190,
        "points": 31
      },
      {
        "threshold": 191,
        "points": 30
      },
      {
        "threshold": 192,
        "points": 29
      },
      {
        "threshold": 193,
        "points": 28
      },
      {
        "threshold": 194,
        "points": 27
      },
      {
        "threshold": 195,
        "points": 26
      },
      {
        "threshold": 196,
        "points": 25
      },
      {
        "threshold": 197,
        "points": 24
      },
      {
        "threshold": 198,
        "points": 23
      },
      {
        "threshold": 199,
        "points": 22
      },
      {
        "threshold": 200,
        "points": 21
      },
      {
        "threshold": 201,
        "points": 20
      },
      {
        "threshold": 202,
        "points": 19
      },
      {
        "threshold": 203,
        "points": 18
      },
      {
        "threshold": 204,
        "points": 17
      },
      {
        "threshold": 205,
        "points": 16
      },
      {
        "threshold": 206,
        "points": 15
      },
      {
        "threshold": 207,
        "points": 14
      },
      {
        "threshold": 208,
        "points": 13
      },
      {
        "threshold": 209,
        "points": 12
      },
      {
        "threshold": 210,
        "points": 11
      },
      {
        "threshold": 211,
        "points": 10
      },
      {
        "threshold": 212,
        "points": 9
      },
      {
        "threshold": 213,
        "points": 8
      },
      {
        "threshold": 214,
        "points": 7
      },
      {
        "threshold": 215,
        "points": 6
      },
      {
        "threshold": 216,
        "points": 5
      },
      {
        "threshold": 217,
        "points": 4
      },
      {
        "threshold": 218,
        "points": 3
      },
      {
        "threshold": 219,
        "points": 2
      },
      {
        "threshold": 220,
        "points": 1
      },
      {
        "threshold": 221,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 822,
        "points": 100
      },
      {
        "threshold": 856,
        "points": 99
      },
      {
        "threshold": 872,
        "points": 98
      },
      {
        "threshold": 886,
        "points": 97
      },
      {
        "threshold": 899,
        "points": 96
      },
      {
        "threshold": 910,
        "points": 95
      },
      {
        "threshold": 921,
        "points": 94
      },
      {
        "threshold": 932,
        "points": 93
      },
      {
        "threshold": 942,
        "points": 92
      },
      {
        "threshold": 952,
        "points": 91
      },
      {
        "threshold": 961,
        "points": 90
      },
      {
        "threshold": 971,
        "points": 89
      },
      {
        "threshold": 980,
        "points": 88
      },
      {
        "threshold": 989,
        "points": 87
      },
      {
        "threshold": 999,
        "points": 86
      },
      {
        "threshold": 1008,
        "points": 85
      },
      {
        "threshold": 1017,
        "points": 84
      },
      {
        "threshold": 1026,
        "points": 83
      },
      {
        "threshold": 1035,
        "points": 82
      },
      {
        "threshold": 1044,
        "points": 81
      },
      {
        "threshold": 1053,
        "points": 80
      },
      {
        "threshold": 1061,
        "points": 79
      },
      {
        "threshold": 1070,
        "points": 78
      },
      {
        "threshold": 1078,
        "points": 77
      },
      {
        "threshold": 1086,
        "points": 76
      },
      {
        "threshold": 1094,
        "points": 75
      },
      {
        "threshold": 1102,
        "points": 74
      },
      {
        "threshold": 1111,
        "points": 73
      },
      {
        "threshold": 1115,
        "points": 70
      },
      {
        "threshold": 1127,
        "points": 69
      },
      {
        "threshold": 1144,
        "points": 68
      },
      {
        "threshold": 1153,
        "points": 67
      },
      {
        "threshold": 1162,
        "points": 66
      },
      {
        "threshold": 1171,
        "points": 65
      },
      {
        "threshold": 1181,
        "points": 64
      },
      {
        "threshold": 1191,
        "points": 63
      },
      {
        "threshold": 1212,
        "points": 62
      },
      {
        "threshold": 1224,
        "points": 61
      },
      {
        "threshold": 1244,
        "points": 60
      },
      {
        "threshold": 1247,
        "points": 59
      },
      {
        "threshold": 1250,
        "points": 58
      },
      {
        "threshold": 1252,
        "points": 57
      },
      {
        "threshold": 1255,
        "points": 56
      },
      {
        "threshold": 1258,
        "points": 55
      },
      {
        "threshold": 1261,
        "points": 54
      },
      {
        "threshold": 1264,
        "points": 53
      },
      {
        "threshold": 1266,
        "points": 52
      },
      {
        "threshold": 1269,
        "points": 51
      },
      {
        "threshold": 1272,
        "points": 50
      },
      {
        "threshold": 1275,
        "points": 49
      },
      {
        "threshold": 1278,
        "points": 48
      },
      {
        "threshold": 1280,
        "points": 47
      },
      {
        "threshold": 1283,
        "points": 46
      },
      {
        "threshold": 1286,
        "points": 45
      },
      {
        "threshold": 1289,
        "points": 44
      },
      {
        "threshold": 1291,
        "points": 43
      },
      {
        "threshold": 1294,
        "points": 42
      },
      {
        "threshold": 1297,
        "points": 41
      },
      {
        "threshold": 1300,
        "points": 40
      },
      {
        "threshold": 1303,
        "points": 39
      },
      {
        "threshold": 1305,
        "points": 38
      },
      {
        "threshold": 1308,
        "points": 37
      },
      {
        "threshold": 1311,
        "points": 36
      },
      {
        "threshold": 1314,
        "points": 35
      },
      {
        "threshold": 1317,
        "points": 34
      },
      {
        "threshold": 1319,
        "points": 33
      },
      {
        "threshold": 1322,
        "points": 32
      },
      {
        "threshold": 1325,
        "points": 31
      },
      {
        "threshold": 1328,
        "points": 30
      },
      {
        "threshold": 1331,
        "points": 29
      },
      {
        "threshold": 1333,
        "points": 28
      },
      {
        "threshold": 1336,
        "points": 27
      },
      {
        "threshold": 1339,
        "points": 26
      },
      {
        "threshold": 1342,
        "points": 25
      },
      {
        "threshold": 1345,
        "points": 24
      },
      {
        "threshold": 1347,
        "points": 23
      },
      {
        "threshold": 1350,
        "points": 22
      },
      {
        "threshold": 1353,
        "points": 21
      },
      {
        "threshold": 1356,
        "points": 20
      },
      {
        "threshold": 1359,
        "points": 19
      },
      {
        "threshold": 1361,
        "points": 18
      },
      {
        "threshold": 1364,
        "points": 17
      },
      {
        "threshold": 1367,
        "points": 16
      },
      {
        "threshold": 1370,
        "points": 15
      },
      {
        "threshold": 1373,
        "points": 14
      },
      {
        "threshold": 1375,
        "points": 13
      },
      {
        "threshold": 1378,
        "points": 12
      },
      {
        "threshold": 1381,
        "points": 11
      },
      {
        "threshold": 1384,
        "points": 10
      },
      {
        "threshold": 1386,
        "points": 9
      },
      {
        "threshold": 1389,
        "points": 8
      },
      {
        "threshold": 1392,
        "points": 7
      },
      {
        "threshold": 1395,
        "points": 6
      },
      {
        "threshold": 1398,
        "points": 5
      },
      {
        "threshold": 1400,
        "points": 4
      },
      {
        "threshold": 1403,
        "points": 3
      },
      {
        "threshold": 1406,
        "points": 2
      },
      {
        "threshold": 1409,
        "points": 1
      },
      {
        "threshold": 1412,
        "points": 0
      }
    ]
  },
  "female|37-41": {
    "deadlift": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 70,
        "points": 10
      },
      {
        "threshold": 80,
        "points": 20
      },
      {
        "threshold": 90,
        "points": 30
      },
      {
        "threshold": 100,
        "points": 40
      },
      {
        "threshold": 110,
        "points": 50
      },
      {
        "threshold": 120,
        "points": 60
      },
      {
        "threshold": 130,
        "points": 69
      },
      {
        "threshold": 140,
        "points": 75
      },
      {
        "threshold": 150,
        "points": 80
      },
      {
        "threshold": 160,
        "points": 85
      },
      {
        "threshold": 170,
        "points": 89
      },
      {
        "threshold": 180,
        "points": 92
      },
      {
        "threshold": 190,
        "points": 95
      },
      {
        "threshold": 200,
        "points": 97
      },
      {
        "threshold": 210,
        "points": 99
      },
      {
        "threshold": 220,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 11,
        "points": 61
      },
      {
        "threshold": 12,
        "points": 63
      },
      {
        "threshold": 13,
        "points": 65
      },
      {
        "threshold": 14,
        "points": 67
      },
      {
        "threshold": 15,
        "points": 69
      },
      {
        "threshold": 16,
        "points": 71
      },
      {
        "threshold": 17,
        "points": 73
      },
      {
        "threshold": 18,
        "points": 74
      },
      {
        "threshold": 19,
        "points": 76
      },
      {
        "threshold": 20,
        "points": 77
      },
      {
        "threshold": 21,
        "points": 79
      },
      {
        "threshold": 22,
        "points": 80
      },
      {
        "threshold": 23,
        "points": 82
      },
      {
        "threshold": 24,
        "points": 83
      },
      {
        "threshold": 25,
        "points": 84
      },
      {
        "threshold": 26,
        "points": 85
      },
      {
        "threshold": 27,
        "points": 87
      },
      {
        "threshold": 28,
        "points": 88
      },
      {
        "threshold": 29,
        "points": 89
      },
      {
        "threshold": 30,
        "points": 90
      },
      {
        "threshold": 31,
        "points": 91
      },
      {
        "threshold": 32,
        "points": 92
      },
      {
        "threshold": 33,
        "points": 93
      },
      {
        "threshold": 34,
        "points": 94
      },
      {
        "threshold": 35,
        "points": 95
      },
      {
        "threshold": 37,
        "points": 96
      },
      {
        "threshold": 38,
        "points": 97
      },
      {
        "threshold": 39,
        "points": 98
      },
      {
        "threshold": 41,
        "points": 99
      },
      {
        "threshold": 43,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 122,
        "points": 100
      },
      {
        "threshold": 124,
        "points": 99
      },
      {
        "threshold": 130,
        "points": 98
      },
      {
        "threshold": 131,
        "points": 97
      },
      {
        "threshold": 134,
        "points": 96
      },
      {
        "threshold": 135,
        "points": 95
      },
      {
        "threshold": 138,
        "points": 94
      },
      {
        "threshold": 140,
        "points": 93
      },
      {
        "threshold": 141,
        "points": 92
      },
      {
        "threshold": 143,
        "points": 91
      },
      {
        "threshold": 145,
        "points": 90
      },
      {
        "threshold": 146,
        "points": 89
      },
      {
        "threshold": 147,
        "points": 88
      },
      {
        "threshold": 149,
        "points": 87
      },
      {
        "threshold": 150,
        "points": 86
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 152,
        "points": 84
      },
      {
        "threshold": 154,
        "points": 83
      },
      {
        "threshold": 155,
        "points": 82
      },
      {
        "threshold": 156,
        "points": 81
      },
      {
        "threshold": 158,
        "points": 80
      },
      {
        "threshold": 159,
        "points": 79
      },
      {
        "threshold": 160,
        "points": 78
      },
      {
        "threshold": 162,
        "points": 77
      },
      {
        "threshold": 163,
        "points": 76
      },
      {
        "threshold": 165,
        "points": 75
      },
      {
        "threshold": 166,
        "points": 74
      },
      {
        "threshold": 167,
        "points": 73
      },
      {
        "threshold": 169,
        "points": 72
      },
      {
        "threshold": 170,
        "points": 71
      },
      {
        "threshold": 172,
        "points": 70
      },
      {
        "threshold": 175,
        "points": 69
      },
      {
        "threshold": 176,
        "points": 68
      },
      {
        "threshold": 178,
        "points": 67
      },
      {
        "threshold": 180,
        "points": 66
      },
      {
        "threshold": 182,
        "points": 65
      },
      {
        "threshold": 185,
        "points": 64
      },
      {
        "threshold": 189,
        "points": 63
      },
      {
        "threshold": 193,
        "points": 62
      },
      {
        "threshold": 201,
        "points": 61
      },
      {
        "threshold": 207,
        "points": 60
      },
      {
        "threshold": 208,
        "points": 59
      },
      {
        "threshold": 209,
        "points": 58
      },
      {
        "threshold": 210,
        "points": 57
      },
      {
        "threshold": 211,
        "points": 56
      },
      {
        "threshold": 212,
        "points": 55
      },
      {
        "threshold": 213,
        "points": 54
      },
      {
        "threshold": 214,
        "points": 53
      },
      {
        "threshold": 215,
        "points": 52
      },
      {
        "threshold": 216,
        "points": 51
      },
      {
        "threshold": 217,
        "points": 50
      },
      {
        "threshold": 218,
        "points": 49
      },
      {
        "threshold": 219,
        "points": 48
      },
      {
        "threshold": 220,
        "points": 47
      },
      {
        "threshold": 221,
        "points": 46
      },
      {
        "threshold": 222,
        "points": 45
      },
      {
        "threshold": 223,
        "points": 44
      },
      {
        "threshold": 224,
        "points": 43
      },
      {
        "threshold": 225,
        "points": 42
      },
      {
        "threshold": 226,
        "points": 41
      },
      {
        "threshold": 227,
        "points": 40
      },
      {
        "threshold": 228,
        "points": 39
      },
      {
        "threshold": 229,
        "points": 38
      },
      {
        "threshold": 230,
        "points": 37
      },
      {
        "threshold": 231,
        "points": 36
      },
      {
        "threshold": 232,
        "points": 35
      },
      {
        "threshold": 233,
        "points": 34
      },
      {
        "threshold": 234,
        "points": 33
      },
      {
        "threshold": 235,
        "points": 32
      },
      {
        "threshold": 236,
        "points": 31
      },
      {
        "threshold": 237,
        "points": 30
      },
      {
        "threshold": 238,
        "points": 29
      },
      {
        "threshold": 239,
        "points": 28
      },
      {
        "threshold": 240,
        "points": 27
      },
      {
        "threshold": 241,
        "points": 26
      },
      {
        "threshold": 242,
        "points": 25
      },
      {
        "threshold": 243,
        "points": 24
      },
      {
        "threshold": 244,
        "points": 23
      },
      {
        "threshold": 245,
        "points": 22
      },
      {
        "threshold": 246,
        "points": 21
      },
      {
        "threshold": 247,
        "points": 20
      },
      {
        "threshold": 248,
        "points": 19
      },
      {
        "threshold": 249,
        "points": 18
      },
      {
        "threshold": 250,
        "points": 17
      },
      {
        "threshold": 251,
        "points": 16
      },
      {
        "threshold": 252,
        "points": 15
      },
      {
        "threshold": 253,
        "points": 14
      },
      {
        "threshold": 254,
        "points": 13
      },
      {
        "threshold": 255,
        "points": 12
      },
      {
        "threshold": 256,
        "points": 11
      },
      {
        "threshold": 257,
        "points": 10
      },
      {
        "threshold": 258,
        "points": 9
      },
      {
        "threshold": 259,
        "points": 8
      },
      {
        "threshold": 260,
        "points": 7
      },
      {
        "threshold": 261,
        "points": 6
      },
      {
        "threshold": 262,
        "points": 5
      },
      {
        "threshold": 263,
        "points": 4
      },
      {
        "threshold": 264,
        "points": 3
      },
      {
        "threshold": 265,
        "points": 2
      },
      {
        "threshold": 266,
        "points": 1
      },
      {
        "threshold": 267,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 951,
        "points": 100
      },
      {
        "threshold": 981,
        "points": 99
      },
      {
        "threshold": 1002,
        "points": 98
      },
      {
        "threshold": 1019,
        "points": 97
      },
      {
        "threshold": 1034,
        "points": 96
      },
      {
        "threshold": 1048,
        "points": 95
      },
      {
        "threshold": 1061,
        "points": 94
      },
      {
        "threshold": 1073,
        "points": 93
      },
      {
        "threshold": 1084,
        "points": 92
      },
      {
        "threshold": 1095,
        "points": 91
      },
      {
        "threshold": 1105,
        "points": 90
      },
      {
        "threshold": 1115,
        "points": 89
      },
      {
        "threshold": 1125,
        "points": 88
      },
      {
        "threshold": 1134,
        "points": 87
      },
      {
        "threshold": 1144,
        "points": 86
      },
      {
        "threshold": 1153,
        "points": 85
      },
      {
        "threshold": 1162,
        "points": 84
      },
      {
        "threshold": 1171,
        "points": 83
      },
      {
        "threshold": 1180,
        "points": 82
      },
      {
        "threshold": 1189,
        "points": 81
      },
      {
        "threshold": 1197,
        "points": 80
      },
      {
        "threshold": 1205,
        "points": 79
      },
      {
        "threshold": 1213,
        "points": 78
      },
      {
        "threshold": 1221,
        "points": 77
      },
      {
        "threshold": 1229,
        "points": 76
      },
      {
        "threshold": 1237,
        "points": 75
      },
      {
        "threshold": 1245,
        "points": 74
      },
      {
        "threshold": 1253,
        "points": 73
      },
      {
        "threshold": 1260,
        "points": 72
      },
      {
        "threshold": 1268,
        "points": 71
      },
      {
        "threshold": 1276,
        "points": 70
      },
      {
        "threshold": 1284,
        "points": 69
      },
      {
        "threshold": 1292,
        "points": 68
      },
      {
        "threshold": 1301,
        "points": 67
      },
      {
        "threshold": 1309,
        "points": 66
      },
      {
        "threshold": 1318,
        "points": 65
      },
      {
        "threshold": 1327,
        "points": 64
      },
      {
        "threshold": 1337,
        "points": 63
      },
      {
        "threshold": 1347,
        "points": 62
      },
      {
        "threshold": 1358,
        "points": 61
      },
      {
        "threshold": 1379,
        "points": 60
      },
      {
        "threshold": 1382,
        "points": 59
      },
      {
        "threshold": 1385,
        "points": 58
      },
      {
        "threshold": 1388,
        "points": 57
      },
      {
        "threshold": 1391,
        "points": 56
      },
      {
        "threshold": 1394,
        "points": 55
      },
      {
        "threshold": 1396,
        "points": 54
      },
      {
        "threshold": 1399,
        "points": 53
      },
      {
        "threshold": 1402,
        "points": 52
      },
      {
        "threshold": 1405,
        "points": 51
      },
      {
        "threshold": 1408,
        "points": 50
      },
      {
        "threshold": 1411,
        "points": 49
      },
      {
        "threshold": 1414,
        "points": 48
      },
      {
        "threshold": 1417,
        "points": 47
      },
      {
        "threshold": 1420,
        "points": 46
      },
      {
        "threshold": 1423,
        "points": 45
      },
      {
        "threshold": 1426,
        "points": 44
      },
      {
        "threshold": 1428,
        "points": 43
      },
      {
        "threshold": 1431,
        "points": 42
      },
      {
        "threshold": 1434,
        "points": 41
      },
      {
        "threshold": 1437,
        "points": 40
      },
      {
        "threshold": 1440,
        "points": 39
      },
      {
        "threshold": 1443,
        "points": 38
      },
      {
        "threshold": 1446,
        "points": 37
      },
      {
        "threshold": 1449,
        "points": 36
      },
      {
        "threshold": 1452,
        "points": 35
      },
      {
        "threshold": 1455,
        "points": 34
      },
      {
        "threshold": 1458,
        "points": 33
      },
      {
        "threshold": 1460,
        "points": 32
      },
      {
        "threshold": 1463,
        "points": 31
      },
      {
        "threshold": 1466,
        "points": 30
      },
      {
        "threshold": 1469,
        "points": 29
      },
      {
        "threshold": 1472,
        "points": 28
      },
      {
        "threshold": 1475,
        "points": 27
      },
      {
        "threshold": 1478,
        "points": 26
      },
      {
        "threshold": 1481,
        "points": 25
      },
      {
        "threshold": 1484,
        "points": 24
      },
      {
        "threshold": 1487,
        "points": 23
      },
      {
        "threshold": 1490,
        "points": 22
      },
      {
        "threshold": 1492,
        "points": 21
      },
      {
        "threshold": 1495,
        "points": 20
      },
      {
        "threshold": 1498,
        "points": 19
      },
      {
        "threshold": 1501,
        "points": 18
      },
      {
        "threshold": 1504,
        "points": 17
      },
      {
        "threshold": 1507,
        "points": 16
      },
      {
        "threshold": 1510,
        "points": 15
      },
      {
        "threshold": 1513,
        "points": 14
      },
      {
        "threshold": 1516,
        "points": 13
      },
      {
        "threshold": 1519,
        "points": 12
      },
      {
        "threshold": 1522,
        "points": 11
      },
      {
        "threshold": 1524,
        "points": 10
      },
      {
        "threshold": 1527,
        "points": 9
      },
      {
        "threshold": 1530,
        "points": 8
      },
      {
        "threshold": 1533,
        "points": 7
      },
      {
        "threshold": 1536,
        "points": 6
      },
      {
        "threshold": 1539,
        "points": 5
      },
      {
        "threshold": 1542,
        "points": 4
      },
      {
        "threshold": 1545,
        "points": 3
      },
      {
        "threshold": 1548,
        "points": 2
      },
      {
        "threshold": 1551,
        "points": 1
      },
      {
        "threshold": 1554,
        "points": 0
      }
    ]
  },
  "male|42-46": {
    "deadlift": [
      {
        "threshold": 80,
        "points": 0
      },
      {
        "threshold": 90,
        "points": 10
      },
      {
        "threshold": 100,
        "points": 20
      },
      {
        "threshold": 110,
        "points": 30
      },
      {
        "threshold": 120,
        "points": 40
      },
      {
        "threshold": 130,
        "points": 50
      },
      {
        "threshold": 140,
        "points": 60
      },
      {
        "threshold": 150,
        "points": 62
      },
      {
        "threshold": 160,
        "points": 64
      },
      {
        "threshold": 170,
        "points": 66
      },
      {
        "threshold": 180,
        "points": 68
      },
      {
        "threshold": 190,
        "points": 70
      },
      {
        "threshold": 200,
        "points": 72
      },
      {
        "threshold": 210,
        "points": 74
      },
      {
        "threshold": 220,
        "points": 76
      },
      {
        "threshold": 230,
        "points": 78
      },
      {
        "threshold": 240,
        "points": 79
      },
      {
        "threshold": 250,
        "points": 82
      },
      {
        "threshold": 260,
        "points": 84
      },
      {
        "threshold": 270,
        "points": 86
      },
      {
        "threshold": 280,
        "points": 88
      },
      {
        "threshold": 290,
        "points": 90
      },
      {
        "threshold": 300,
        "points": 92
      },
      {
        "threshold": 310,
        "points": 93
      },
      {
        "threshold": 320,
        "points": 95
      },
      {
        "threshold": 330,
        "points": 97
      },
      {
        "threshold": 340,
        "points": 99
      },
      {
        "threshold": 350,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 11,
        "points": 60
      },
      {
        "threshold": 13,
        "points": 61
      },
      {
        "threshold": 15,
        "points": 62
      },
      {
        "threshold": 16,
        "points": 63
      },
      {
        "threshold": 17,
        "points": 64
      },
      {
        "threshold": 18,
        "points": 65
      },
      {
        "threshold": 19,
        "points": 66
      },
      {
        "threshold": 20,
        "points": 67
      },
      {
        "threshold": 21,
        "points": 68
      },
      {
        "threshold": 22,
        "points": 69
      },
      {
        "threshold": 23,
        "points": 70
      },
      {
        "threshold": 24,
        "points": 71
      },
      {
        "threshold": 25,
        "points": 72
      },
      {
        "threshold": 26,
        "points": 73
      },
      {
        "threshold": 28,
        "points": 74
      },
      {
        "threshold": 29,
        "points": 75
      },
      {
        "threshold": 30,
        "points": 76
      },
      {
        "threshold": 31,
        "points": 77
      },
      {
        "threshold": 32,
        "points": 78
      },
      {
        "threshold": 33,
        "points": 79
      },
      {
        "threshold": 34,
        "points": 80
      },
      {
        "threshold": 35,
        "points": 81
      },
      {
        "threshold": 36,
        "points": 82
      },
      {
        "threshold": 37,
        "points": 83
      },
      {
        "threshold": 38,
        "points": 84
      },
      {
        "threshold": 39,
        "points": 85
      },
      {
        "threshold": 40,
        "points": 86
      },
      {
        "threshold": 41,
        "points": 87
      },
      {
        "threshold": 42,
        "points": 88
      },
      {
        "threshold": 43,
        "points": 89
      },
      {
        "threshold": 44,
        "points": 90
      },
      {
        "threshold": 45,
        "points": 91
      },
      {
        "threshold": 46,
        "points": 92
      },
      {
        "threshold": 47,
        "points": 93
      },
      {
        "threshold": 48,
        "points": 94
      },
      {
        "threshold": 49,
        "points": 95
      },
      {
        "threshold": 51,
        "points": 96
      },
      {
        "threshold": 52,
        "points": 97
      },
      {
        "threshold": 53,
        "points": 98
      },
      {
        "threshold": 55,
        "points": 99
      },
      {
        "threshold": 57,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 100,
        "points": 100
      },
      {
        "threshold": 102,
        "points": 99
      },
      {
        "threshold": 104,
        "points": 98
      },
      {
        "threshold": 106,
        "points": 97
      },
      {
        "threshold": 108,
        "points": 96
      },
      {
        "threshold": 109,
        "points": 95
      },
      {
        "threshold": 111,
        "points": 94
      },
      {
        "threshold": 112,
        "points": 93
      },
      {
        "threshold": 113,
        "points": 92
      },
      {
        "threshold": 114,
        "points": 91
      },
      {
        "threshold": 116,
        "points": 90
      },
      {
        "threshold": 117,
        "points": 89
      },
      {
        "threshold": 118,
        "points": 88
      },
      {
        "threshold": 119,
        "points": 87
      },
      {
        "threshold": 120,
        "points": 86
      },
      {
        "threshold": 121,
        "points": 85
      },
      {
        "threshold": 122,
        "points": 84
      },
      {
        "threshold": 124,
        "points": 83
      },
      {
        "threshold": 125,
        "points": 82
      },
      {
        "threshold": 126,
        "points": 81
      },
      {
        "threshold": 127,
        "points": 80
      },
      {
        "threshold": 128,
        "points": 79
      },
      {
        "threshold": 129,
        "points": 78
      },
      {
        "threshold": 130,
        "points": 77
      },
      {
        "threshold": 132,
        "points": 76
      },
      {
        "threshold": 133,
        "points": 75
      },
      {
        "threshold": 134,
        "points": 74
      },
      {
        "threshold": 135,
        "points": 73
      },
      {
        "threshold": 137,
        "points": 72
      },
      {
        "threshold": 138,
        "points": 71
      },
      {
        "threshold": 140,
        "points": 70
      },
      {
        "threshold": 142,
        "points": 69
      },
      {
        "threshold": 143,
        "points": 68
      },
      {
        "threshold": 145,
        "points": 67
      },
      {
        "threshold": 146,
        "points": 66
      },
      {
        "threshold": 149,
        "points": 65
      },
      {
        "threshold": 151,
        "points": 64
      },
      {
        "threshold": 153,
        "points": 63
      },
      {
        "threshold": 156,
        "points": 62
      },
      {
        "threshold": 161,
        "points": 61
      },
      {
        "threshold": 165,
        "points": 60
      },
      {
        "threshold": 166,
        "points": 59
      },
      {
        "threshold": 167,
        "points": 58
      },
      {
        "threshold": 168,
        "points": 57
      },
      {
        "threshold": 169,
        "points": 56
      },
      {
        "threshold": 170,
        "points": 55
      },
      {
        "threshold": 171,
        "points": 54
      },
      {
        "threshold": 172,
        "points": 53
      },
      {
        "threshold": 173,
        "points": 52
      },
      {
        "threshold": 174,
        "points": 51
      },
      {
        "threshold": 175,
        "points": 50
      },
      {
        "threshold": 176,
        "points": 49
      },
      {
        "threshold": 177,
        "points": 48
      },
      {
        "threshold": 178,
        "points": 47
      },
      {
        "threshold": 179,
        "points": 46
      },
      {
        "threshold": 180,
        "points": 45
      },
      {
        "threshold": 181,
        "points": 44
      },
      {
        "threshold": 182,
        "points": 43
      },
      {
        "threshold": 183,
        "points": 42
      },
      {
        "threshold": 184,
        "points": 41
      },
      {
        "threshold": 185,
        "points": 40
      },
      {
        "threshold": 186,
        "points": 39
      },
      {
        "threshold": 187,
        "points": 38
      },
      {
        "threshold": 188,
        "points": 37
      },
      {
        "threshold": 189,
        "points": 36
      },
      {
        "threshold": 190,
        "points": 35
      },
      {
        "threshold": 191,
        "points": 34
      },
      {
        "threshold": 192,
        "points": 33
      },
      {
        "threshold": 193,
        "points": 32
      },
      {
        "threshold": 194,
        "points": 31
      },
      {
        "threshold": 195,
        "points": 30
      },
      {
        "threshold": 196,
        "points": 29
      },
      {
        "threshold": 197,
        "points": 28
      },
      {
        "threshold": 198,
        "points": 27
      },
      {
        "threshold": 199,
        "points": 26
      },
      {
        "threshold": 200,
        "points": 25
      },
      {
        "threshold": 201,
        "points": 24
      },
      {
        "threshold": 202,
        "points": 23
      },
      {
        "threshold": 203,
        "points": 22
      },
      {
        "threshold": 204,
        "points": 21
      },
      {
        "threshold": 205,
        "points": 20
      },
      {
        "threshold": 206,
        "points": 19
      },
      {
        "threshold": 207,
        "points": 18
      },
      {
        "threshold": 208,
        "points": 17
      },
      {
        "threshold": 209,
        "points": 16
      },
      {
        "threshold": 210,
        "points": 15
      },
      {
        "threshold": 211,
        "points": 14
      },
      {
        "threshold": 212,
        "points": 13
      },
      {
        "threshold": 213,
        "points": 12
      },
      {
        "threshold": 214,
        "points": 11
      },
      {
        "threshold": 215,
        "points": 10
      },
      {
        "threshold": 216,
        "points": 9
      },
      {
        "threshold": 217,
        "points": 8
      },
      {
        "threshold": 218,
        "points": 7
      },
      {
        "threshold": 219,
        "points": 6
      },
      {
        "threshold": 220,
        "points": 5
      },
      {
        "threshold": 221,
        "points": 4
      },
      {
        "threshold": 222,
        "points": 3
      },
      {
        "threshold": 223,
        "points": 2
      },
      {
        "threshold": 224,
        "points": 1
      },
      {
        "threshold": 225,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 845,
        "points": 100
      },
      {
        "threshold": 869,
        "points": 99
      },
      {
        "threshold": 885,
        "points": 98
      },
      {
        "threshold": 899,
        "points": 97
      },
      {
        "threshold": 912,
        "points": 96
      },
      {
        "threshold": 924,
        "points": 95
      },
      {
        "threshold": 935,
        "points": 94
      },
      {
        "threshold": 945,
        "points": 93
      },
      {
        "threshold": 955,
        "points": 92
      },
      {
        "threshold": 965,
        "points": 91
      },
      {
        "threshold": 975,
        "points": 90
      },
      {
        "threshold": 984,
        "points": 89
      },
      {
        "threshold": 993,
        "points": 88
      },
      {
        "threshold": 1003,
        "points": 87
      },
      {
        "threshold": 1012,
        "points": 86
      },
      {
        "threshold": 1021,
        "points": 85
      },
      {
        "threshold": 1030,
        "points": 84
      },
      {
        "threshold": 1039,
        "points": 83
      },
      {
        "threshold": 1048,
        "points": 82
      },
      {
        "threshold": 1057,
        "points": 81
      },
      {
        "threshold": 1067,
        "points": 80
      },
      {
        "threshold": 1076,
        "points": 79
      },
      {
        "threshold": 1086,
        "points": 78
      },
      {
        "threshold": 1095,
        "points": 77
      },
      {
        "threshold": 1105,
        "points": 76
      },
      {
        "threshold": 1115,
        "points": 75
      },
      {
        "threshold": 1125,
        "points": 74
      },
      {
        "threshold": 1134,
        "points": 73
      },
      {
        "threshold": 1135,
        "points": 70
      },
      {
        "threshold": 1155,
        "points": 69
      },
      {
        "threshold": 1176,
        "points": 68
      },
      {
        "threshold": 1187,
        "points": 67
      },
      {
        "threshold": 1198,
        "points": 66
      },
      {
        "threshold": 1210,
        "points": 65
      },
      {
        "threshold": 1237,
        "points": 64
      },
      {
        "threshold": 1252,
        "points": 63
      },
      {
        "threshold": 1269,
        "points": 62
      },
      {
        "threshold": 1291,
        "points": 61
      },
      {
        "threshold": 1324,
        "points": 60
      },
      {
        "threshold": 1327,
        "points": 59
      },
      {
        "threshold": 1330,
        "points": 58
      },
      {
        "threshold": 1332,
        "points": 57
      },
      {
        "threshold": 1335,
        "points": 56
      },
      {
        "threshold": 1338,
        "points": 55
      },
      {
        "threshold": 1341,
        "points": 54
      },
      {
        "threshold": 1344,
        "points": 53
      },
      {
        "threshold": 1346,
        "points": 52
      },
      {
        "threshold": 1349,
        "points": 51
      },
      {
        "threshold": 1352,
        "points": 50
      },
      {
        "threshold": 1355,
        "points": 49
      },
      {
        "threshold": 1358,
        "points": 48
      },
      {
        "threshold": 1360,
        "points": 47
      },
      {
        "threshold": 1363,
        "points": 46
      },
      {
        "threshold": 1366,
        "points": 45
      },
      {
        "threshold": 1369,
        "points": 44
      },
      {
        "threshold": 1371,
        "points": 43
      },
      {
        "threshold": 1374,
        "points": 42
      },
      {
        "threshold": 1377,
        "points": 41
      },
      {
        "threshold": 1380,
        "points": 40
      },
      {
        "threshold": 1383,
        "points": 39
      },
      {
        "threshold": 1385,
        "points": 38
      },
      {
        "threshold": 1388,
        "points": 37
      },
      {
        "threshold": 1391,
        "points": 36
      },
      {
        "threshold": 1394,
        "points": 35
      },
      {
        "threshold": 1397,
        "points": 34
      },
      {
        "threshold": 1399,
        "points": 33
      },
      {
        "threshold": 1402,
        "points": 32
      },
      {
        "threshold": 1405,
        "points": 31
      },
      {
        "threshold": 1408,
        "points": 30
      },
      {
        "threshold": 1411,
        "points": 29
      },
      {
        "threshold": 1413,
        "points": 28
      },
      {
        "threshold": 1416,
        "points": 27
      },
      {
        "threshold": 1419,
        "points": 26
      },
      {
        "threshold": 1422,
        "points": 25
      },
      {
        "threshold": 1425,
        "points": 24
      },
      {
        "threshold": 1427,
        "points": 23
      },
      {
        "threshold": 1430,
        "points": 22
      },
      {
        "threshold": 1433,
        "points": 21
      },
      {
        "threshold": 1436,
        "points": 20
      },
      {
        "threshold": 1439,
        "points": 19
      },
      {
        "threshold": 1441,
        "points": 18
      },
      {
        "threshold": 1444,
        "points": 17
      },
      {
        "threshold": 1447,
        "points": 16
      },
      {
        "threshold": 1450,
        "points": 15
      },
      {
        "threshold": 1453,
        "points": 14
      },
      {
        "threshold": 1455,
        "points": 13
      },
      {
        "threshold": 1458,
        "points": 12
      },
      {
        "threshold": 1461,
        "points": 11
      },
      {
        "threshold": 1464,
        "points": 10
      },
      {
        "threshold": 1466,
        "points": 9
      },
      {
        "threshold": 1469,
        "points": 8
      },
      {
        "threshold": 1472,
        "points": 7
      },
      {
        "threshold": 1475,
        "points": 6
      },
      {
        "threshold": 1478,
        "points": 5
      },
      {
        "threshold": 1480,
        "points": 4
      },
      {
        "threshold": 1483,
        "points": 3
      },
      {
        "threshold": 1486,
        "points": 2
      },
      {
        "threshold": 1489,
        "points": 1
      },
      {
        "threshold": 1492,
        "points": 0
      }
    ]
  },
  "female|42-46": {
    "deadlift": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 70,
        "points": 10
      },
      {
        "threshold": 80,
        "points": 20
      },
      {
        "threshold": 90,
        "points": 30
      },
      {
        "threshold": 100,
        "points": 40
      },
      {
        "threshold": 110,
        "points": 50
      },
      {
        "threshold": 120,
        "points": 60
      },
      {
        "threshold": 130,
        "points": 70
      },
      {
        "threshold": 140,
        "points": 76
      },
      {
        "threshold": 150,
        "points": 82
      },
      {
        "threshold": 160,
        "points": 86
      },
      {
        "threshold": 170,
        "points": 90
      },
      {
        "threshold": 180,
        "points": 93
      },
      {
        "threshold": 190,
        "points": 96
      },
      {
        "threshold": 200,
        "points": 98
      },
      {
        "threshold": 210,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 11,
        "points": 62
      },
      {
        "threshold": 12,
        "points": 64
      },
      {
        "threshold": 13,
        "points": 66
      },
      {
        "threshold": 14,
        "points": 68
      },
      {
        "threshold": 15,
        "points": 70
      },
      {
        "threshold": 16,
        "points": 72
      },
      {
        "threshold": 17,
        "points": 74
      },
      {
        "threshold": 18,
        "points": 75
      },
      {
        "threshold": 19,
        "points": 77
      },
      {
        "threshold": 20,
        "points": 79
      },
      {
        "threshold": 21,
        "points": 80
      },
      {
        "threshold": 22,
        "points": 82
      },
      {
        "threshold": 23,
        "points": 83
      },
      {
        "threshold": 24,
        "points": 84
      },
      {
        "threshold": 25,
        "points": 86
      },
      {
        "threshold": 26,
        "points": 87
      },
      {
        "threshold": 27,
        "points": 88
      },
      {
        "threshold": 28,
        "points": 89
      },
      {
        "threshold": 29,
        "points": 90
      },
      {
        "threshold": 30,
        "points": 92
      },
      {
        "threshold": 31,
        "points": 93
      },
      {
        "threshold": 32,
        "points": 94
      },
      {
        "threshold": 33,
        "points": 95
      },
      {
        "threshold": 35,
        "points": 96
      },
      {
        "threshold": 36,
        "points": 97
      },
      {
        "threshold": 37,
        "points": 98
      },
      {
        "threshold": 38,
        "points": 99
      },
      {
        "threshold": 40,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 129,
        "points": 100
      },
      {
        "threshold": 130,
        "points": 99
      },
      {
        "threshold": 135,
        "points": 98
      },
      {
        "threshold": 137,
        "points": 97
      },
      {
        "threshold": 138,
        "points": 96
      },
      {
        "threshold": 140,
        "points": 95
      },
      {
        "threshold": 143,
        "points": 94
      },
      {
        "threshold": 145,
        "points": 93
      },
      {
        "threshold": 147,
        "points": 92
      },
      {
        "threshold": 148,
        "points": 91
      },
      {
        "threshold": 150,
        "points": 90
      },
      {
        "threshold": 151,
        "points": 89
      },
      {
        "threshold": 153,
        "points": 88
      },
      {
        "threshold": 155,
        "points": 87
      },
      {
        "threshold": 156,
        "points": 86
      },
      {
        "threshold": 157,
        "points": 85
      },
      {
        "threshold": 158,
        "points": 84
      },
      {
        "threshold": 160,
        "points": 83
      },
      {
        "threshold": 161,
        "points": 82
      },
      {
        "threshold": 162,
        "points": 81
      },
      {
        "threshold": 164,
        "points": 80
      },
      {
        "threshold": 165,
        "points": 79
      },
      {
        "threshold": 166,
        "points": 78
      },
      {
        "threshold": 167,
        "points": 77
      },
      {
        "threshold": 169,
        "points": 76
      },
      {
        "threshold": 170,
        "points": 75
      },
      {
        "threshold": 172,
        "points": 74
      },
      {
        "threshold": 173,
        "points": 73
      },
      {
        "threshold": 175,
        "points": 72
      },
      {
        "threshold": 176,
        "points": 71
      },
      {
        "threshold": 178,
        "points": 70
      },
      {
        "threshold": 180,
        "points": 69
      },
      {
        "threshold": 181,
        "points": 68
      },
      {
        "threshold": 182,
        "points": 67
      },
      {
        "threshold": 186,
        "points": 66
      },
      {
        "threshold": 190,
        "points": 65
      },
      {
        "threshold": 192,
        "points": 64
      },
      {
        "threshold": 197,
        "points": 63
      },
      {
        "threshold": 201,
        "points": 62
      },
      {
        "threshold": 211,
        "points": 61
      },
      {
        "threshold": 222,
        "points": 60
      },
      {
        "threshold": 223,
        "points": 59
      },
      {
        "threshold": 224,
        "points": 58
      },
      {
        "threshold": 225,
        "points": 57
      },
      {
        "threshold": 226,
        "points": 56
      },
      {
        "threshold": 227,
        "points": 55
      },
      {
        "threshold": 228,
        "points": 54
      },
      {
        "threshold": 229,
        "points": 53
      },
      {
        "threshold": 230,
        "points": 52
      },
      {
        "threshold": 231,
        "points": 51
      },
      {
        "threshold": 232,
        "points": 50
      },
      {
        "threshold": 233,
        "points": 49
      },
      {
        "threshold": 234,
        "points": 48
      },
      {
        "threshold": 235,
        "points": 47
      },
      {
        "threshold": 236,
        "points": 46
      },
      {
        "threshold": 237,
        "points": 45
      },
      {
        "threshold": 238,
        "points": 44
      },
      {
        "threshold": 239,
        "points": 43
      },
      {
        "threshold": 240,
        "points": 42
      },
      {
        "threshold": 241,
        "points": 41
      },
      {
        "threshold": 242,
        "points": 40
      },
      {
        "threshold": 243,
        "points": 39
      },
      {
        "threshold": 244,
        "points": 38
      },
      {
        "threshold": 245,
        "points": 37
      },
      {
        "threshold": 246,
        "points": 36
      },
      {
        "threshold": 247,
        "points": 35
      },
      {
        "threshold": 248,
        "points": 34
      },
      {
        "threshold": 249,
        "points": 33
      },
      {
        "threshold": 250,
        "points": 32
      },
      {
        "threshold": 251,
        "points": 31
      },
      {
        "threshold": 252,
        "points": 30
      },
      {
        "threshold": 253,
        "points": 29
      },
      {
        "threshold": 254,
        "points": 28
      },
      {
        "threshold": 255,
        "points": 27
      },
      {
        "threshold": 256,
        "points": 26
      },
      {
        "threshold": 257,
        "points": 25
      },
      {
        "threshold": 258,
        "points": 24
      },
      {
        "threshold": 259,
        "points": 23
      },
      {
        "threshold": 260,
        "points": 22
      },
      {
        "threshold": 261,
        "points": 21
      },
      {
        "threshold": 262,
        "points": 20
      },
      {
        "threshold": 263,
        "points": 19
      },
      {
        "threshold": 264,
        "points": 18
      },
      {
        "threshold": 265,
        "points": 17
      },
      {
        "threshold": 266,
        "points": 16
      },
      {
        "threshold": 267,
        "points": 15
      },
      {
        "threshold": 268,
        "points": 14
      },
      {
        "threshold": 269,
        "points": 13
      },
      {
        "threshold": 270,
        "points": 12
      },
      {
        "threshold": 271,
        "points": 11
      },
      {
        "threshold": 272,
        "points": 10
      },
      {
        "threshold": 273,
        "points": 9
      },
      {
        "threshold": 274,
        "points": 8
      },
      {
        "threshold": 275,
        "points": 7
      },
      {
        "threshold": 276,
        "points": 6
      },
      {
        "threshold": 277,
        "points": 5
      },
      {
        "threshold": 278,
        "points": 4
      },
      {
        "threshold": 279,
        "points": 3
      },
      {
        "threshold": 280,
        "points": 2
      },
      {
        "threshold": 281,
        "points": 1
      },
      {
        "threshold": 282,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 960,
        "points": 100
      },
      {
        "threshold": 991,
        "points": 99
      },
      {
        "threshold": 1012,
        "points": 98
      },
      {
        "threshold": 1030,
        "points": 97
      },
      {
        "threshold": 1045,
        "points": 96
      },
      {
        "threshold": 1059,
        "points": 95
      },
      {
        "threshold": 1072,
        "points": 94
      },
      {
        "threshold": 1084,
        "points": 93
      },
      {
        "threshold": 1096,
        "points": 92
      },
      {
        "threshold": 1106,
        "points": 91
      },
      {
        "threshold": 1117,
        "points": 90
      },
      {
        "threshold": 1127,
        "points": 89
      },
      {
        "threshold": 1137,
        "points": 88
      },
      {
        "threshold": 1147,
        "points": 87
      },
      {
        "threshold": 1156,
        "points": 86
      },
      {
        "threshold": 1165,
        "points": 85
      },
      {
        "threshold": 1175,
        "points": 84
      },
      {
        "threshold": 1184,
        "points": 83
      },
      {
        "threshold": 1193,
        "points": 82
      },
      {
        "threshold": 1201,
        "points": 81
      },
      {
        "threshold": 1210,
        "points": 80
      },
      {
        "threshold": 1218,
        "points": 79
      },
      {
        "threshold": 1226,
        "points": 78
      },
      {
        "threshold": 1234,
        "points": 77
      },
      {
        "threshold": 1242,
        "points": 76
      },
      {
        "threshold": 1250,
        "points": 75
      },
      {
        "threshold": 1258,
        "points": 74
      },
      {
        "threshold": 1266,
        "points": 73
      },
      {
        "threshold": 1274,
        "points": 72
      },
      {
        "threshold": 1282,
        "points": 71
      },
      {
        "threshold": 1290,
        "points": 70
      },
      {
        "threshold": 1298,
        "points": 69
      },
      {
        "threshold": 1306,
        "points": 68
      },
      {
        "threshold": 1315,
        "points": 67
      },
      {
        "threshold": 1323,
        "points": 66
      },
      {
        "threshold": 1332,
        "points": 65
      },
      {
        "threshold": 1342,
        "points": 64
      },
      {
        "threshold": 1351,
        "points": 63
      },
      {
        "threshold": 1362,
        "points": 62
      },
      {
        "threshold": 1373,
        "points": 61
      },
      {
        "threshold": 1395,
        "points": 60
      },
      {
        "threshold": 1398,
        "points": 59
      },
      {
        "threshold": 1401,
        "points": 58
      },
      {
        "threshold": 1404,
        "points": 57
      },
      {
        "threshold": 1407,
        "points": 56
      },
      {
        "threshold": 1410,
        "points": 55
      },
      {
        "threshold": 1412,
        "points": 54
      },
      {
        "threshold": 1415,
        "points": 53
      },
      {
        "threshold": 1418,
        "points": 52
      },
      {
        "threshold": 1421,
        "points": 51
      },
      {
        "threshold": 1424,
        "points": 50
      },
      {
        "threshold": 1427,
        "points": 49
      },
      {
        "threshold": 1430,
        "points": 48
      },
      {
        "threshold": 1433,
        "points": 47
      },
      {
        "threshold": 1436,
        "points": 46
      },
      {
        "threshold": 1439,
        "points": 45
      },
      {
        "threshold": 1442,
        "points": 44
      },
      {
        "threshold": 1444,
        "points": 43
      },
      {
        "threshold": 1447,
        "points": 42
      },
      {
        "threshold": 1450,
        "points": 41
      },
      {
        "threshold": 1453,
        "points": 40
      },
      {
        "threshold": 1456,
        "points": 39
      },
      {
        "threshold": 1459,
        "points": 38
      },
      {
        "threshold": 1462,
        "points": 37
      },
      {
        "threshold": 1465,
        "points": 36
      },
      {
        "threshold": 1468,
        "points": 35
      },
      {
        "threshold": 1471,
        "points": 34
      },
      {
        "threshold": 1474,
        "points": 33
      },
      {
        "threshold": 1476,
        "points": 32
      },
      {
        "threshold": 1479,
        "points": 31
      },
      {
        "threshold": 1482,
        "points": 30
      },
      {
        "threshold": 1485,
        "points": 29
      },
      {
        "threshold": 1488,
        "points": 28
      },
      {
        "threshold": 1491,
        "points": 27
      },
      {
        "threshold": 1494,
        "points": 26
      },
      {
        "threshold": 1497,
        "points": 25
      },
      {
        "threshold": 1500,
        "points": 24
      },
      {
        "threshold": 1503,
        "points": 23
      },
      {
        "threshold": 1506,
        "points": 22
      },
      {
        "threshold": 1508,
        "points": 21
      },
      {
        "threshold": 1511,
        "points": 20
      },
      {
        "threshold": 1514,
        "points": 19
      },
      {
        "threshold": 1517,
        "points": 18
      },
      {
        "threshold": 1520,
        "points": 17
      },
      {
        "threshold": 1523,
        "points": 16
      },
      {
        "threshold": 1526,
        "points": 15
      },
      {
        "threshold": 1529,
        "points": 14
      },
      {
        "threshold": 1532,
        "points": 13
      },
      {
        "threshold": 1535,
        "points": 12
      },
      {
        "threshold": 1538,
        "points": 11
      },
      {
        "threshold": 1540,
        "points": 10
      },
      {
        "threshold": 1543,
        "points": 9
      },
      {
        "threshold": 1546,
        "points": 8
      },
      {
        "threshold": 1549,
        "points": 7
      },
      {
        "threshold": 1552,
        "points": 6
      },
      {
        "threshold": 1555,
        "points": 5
      },
      {
        "threshold": 1558,
        "points": 4
      },
      {
        "threshold": 1561,
        "points": 3
      },
      {
        "threshold": 1564,
        "points": 2
      },
      {
        "threshold": 1567,
        "points": 1
      },
      {
        "threshold": 1570,
        "points": 0
      }
    ]
  },
  "male|47-51": {
    "deadlift": [
      {
        "threshold": 80,
        "points": 0
      },
      {
        "threshold": 90,
        "points": 10
      },
      {
        "threshold": 100,
        "points": 20
      },
      {
        "threshold": 110,
        "points": 30
      },
      {
        "threshold": 120,
        "points": 40
      },
      {
        "threshold": 130,
        "points": 50
      },
      {
        "threshold": 140,
        "points": 60
      },
      {
        "threshold": 150,
        "points": 62
      },
      {
        "threshold": 160,
        "points": 64
      },
      {
        "threshold": 170,
        "points": 66
      },
      {
        "threshold": 180,
        "points": 68
      },
      {
        "threshold": 190,
        "points": 70
      },
      {
        "threshold": 200,
        "points": 72
      },
      {
        "threshold": 210,
        "points": 74
      },
      {
        "threshold": 220,
        "points": 76
      },
      {
        "threshold": 230,
        "points": 78
      },
      {
        "threshold": 240,
        "points": 80
      },
      {
        "threshold": 250,
        "points": 82
      },
      {
        "threshold": 260,
        "points": 84
      },
      {
        "threshold": 270,
        "points": 86
      },
      {
        "threshold": 280,
        "points": 89
      },
      {
        "threshold": 290,
        "points": 91
      },
      {
        "threshold": 300,
        "points": 93
      },
      {
        "threshold": 310,
        "points": 95
      },
      {
        "threshold": 320,
        "points": 97
      },
      {
        "threshold": 330,
        "points": 99
      },
      {
        "threshold": 340,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 11,
        "points": 60
      },
      {
        "threshold": 12,
        "points": 61
      },
      {
        "threshold": 14,
        "points": 62
      },
      {
        "threshold": 15,
        "points": 63
      },
      {
        "threshold": 16,
        "points": 64
      },
      {
        "threshold": 17,
        "points": 65
      },
      {
        "threshold": 18,
        "points": 66
      },
      {
        "threshold": 19,
        "points": 67
      },
      {
        "threshold": 20,
        "points": 68
      },
      {
        "threshold": 21,
        "points": 69
      },
      {
        "threshold": 22,
        "points": 70
      },
      {
        "threshold": 23,
        "points": 71
      },
      {
        "threshold": 24,
        "points": 72
      },
      {
        "threshold": 25,
        "points": 73
      },
      {
        "threshold": 26,
        "points": 74
      },
      {
        "threshold": 27,
        "points": 75
      },
      {
        "threshold": 28,
        "points": 76
      },
      {
        "threshold": 29,
        "points": 77
      },
      {
        "threshold": 30,
        "points": 78
      },
      {
        "threshold": 31,
        "points": 79
      },
      {
        "threshold": 32,
        "points": 80
      },
      {
        "threshold": 33,
        "points": 81
      },
      {
        "threshold": 34,
        "points": 82
      },
      {
        "threshold": 35,
        "points": 83
      },
      {
        "threshold": 36,
        "points": 84
      },
      {
        "threshold": 37,
        "points": 85
      },
      {
        "threshold": 38,
        "points": 86
      },
      {
        "threshold": 39,
        "points": 87
      },
      {
        "threshold": 40,
        "points": 88
      },
      {
        "threshold": 41,
        "points": 89
      },
      {
        "threshold": 42,
        "points": 90
      },
      {
        "threshold": 43,
        "points": 91
      },
      {
        "threshold": 44,
        "points": 92
      },
      {
        "threshold": 45,
        "points": 93
      },
      {
        "threshold": 46,
        "points": 94
      },
      {
        "threshold": 48,
        "points": 95
      },
      {
        "threshold": 49,
        "points": 96
      },
      {
        "threshold": 50,
        "points": 97
      },
      {
        "threshold": 51,
        "points": 98
      },
      {
        "threshold": 53,
        "points": 99
      },
      {
        "threshold": 55,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 105,
        "points": 100
      },
      {
        "threshold": 106,
        "points": 99
      },
      {
        "threshold": 110,
        "points": 98
      },
      {
        "threshold": 112,
        "points": 97
      },
      {
        "threshold": 114,
        "points": 96
      },
      {
        "threshold": 115,
        "points": 95
      },
      {
        "threshold": 117,
        "points": 94
      },
      {
        "threshold": 119,
        "points": 93
      },
      {
        "threshold": 120,
        "points": 92
      },
      {
        "threshold": 121,
        "points": 91
      },
      {
        "threshold": 122,
        "points": 90
      },
      {
        "threshold": 123,
        "points": 89
      },
      {
        "threshold": 125,
        "points": 88
      },
      {
        "threshold": 126,
        "points": 87
      },
      {
        "threshold": 127,
        "points": 86
      },
      {
        "threshold": 128,
        "points": 85
      },
      {
        "threshold": 129,
        "points": 84
      },
      {
        "threshold": 130,
        "points": 83
      },
      {
        "threshold": 132,
        "points": 82
      },
      {
        "threshold": 133,
        "points": 81
      },
      {
        "threshold": 134,
        "points": 80
      },
      {
        "threshold": 135,
        "points": 79
      },
      {
        "threshold": 136,
        "points": 78
      },
      {
        "threshold": 137,
        "points": 77
      },
      {
        "threshold": 139,
        "points": 76
      },
      {
        "threshold": 140,
        "points": 75
      },
      {
        "threshold": 141,
        "points": 74
      },
      {
        "threshold": 143,
        "points": 73
      },
      {
        "threshold": 145,
        "points": 72
      },
      {
        "threshold": 146,
        "points": 71
      },
      {
        "threshold": 147,
        "points": 70
      },
      {
        "threshold": 149,
        "points": 69
      },
      {
        "threshold": 150,
        "points": 68
      },
      {
        "threshold": 152,
        "points": 67
      },
      {
        "threshold": 154,
        "points": 66
      },
      {
        "threshold": 157,
        "points": 65
      },
      {
        "threshold": 159,
        "points": 64
      },
      {
        "threshold": 161,
        "points": 63
      },
      {
        "threshold": 164,
        "points": 62
      },
      {
        "threshold": 168,
        "points": 61
      },
      {
        "threshold": 173,
        "points": 60
      },
      {
        "threshold": 174,
        "points": 59
      },
      {
        "threshold": 175,
        "points": 58
      },
      {
        "threshold": 176,
        "points": 57
      },
      {
        "threshold": 177,
        "points": 56
      },
      {
        "threshold": 178,
        "points": 55
      },
      {
        "threshold": 179,
        "points": 54
      },
      {
        "threshold": 180,
        "points": 53
      },
      {
        "threshold": 181,
        "points": 52
      },
      {
        "threshold": 182,
        "points": 51
      },
      {
        "threshold": 183,
        "points": 50
      },
      {
        "threshold": 184,
        "points": 49
      },
      {
        "threshold": 185,
        "points": 48
      },
      {
        "threshold": 186,
        "points": 47
      },
      {
        "threshold": 187,
        "points": 46
      },
      {
        "threshold": 188,
        "points": 45
      },
      {
        "threshold": 189,
        "points": 44
      },
      {
        "threshold": 190,
        "points": 43
      },
      {
        "threshold": 191,
        "points": 42
      },
      {
        "threshold": 192,
        "points": 41
      },
      {
        "threshold": 193,
        "points": 40
      },
      {
        "threshold": 194,
        "points": 39
      },
      {
        "threshold": 195,
        "points": 38
      },
      {
        "threshold": 196,
        "points": 37
      },
      {
        "threshold": 197,
        "points": 36
      },
      {
        "threshold": 198,
        "points": 35
      },
      {
        "threshold": 199,
        "points": 34
      },
      {
        "threshold": 200,
        "points": 33
      },
      {
        "threshold": 201,
        "points": 32
      },
      {
        "threshold": 202,
        "points": 31
      },
      {
        "threshold": 203,
        "points": 30
      },
      {
        "threshold": 204,
        "points": 29
      },
      {
        "threshold": 205,
        "points": 28
      },
      {
        "threshold": 206,
        "points": 27
      },
      {
        "threshold": 207,
        "points": 26
      },
      {
        "threshold": 208,
        "points": 25
      },
      {
        "threshold": 209,
        "points": 24
      },
      {
        "threshold": 210,
        "points": 23
      },
      {
        "threshold": 211,
        "points": 22
      },
      {
        "threshold": 212,
        "points": 21
      },
      {
        "threshold": 213,
        "points": 20
      },
      {
        "threshold": 214,
        "points": 19
      },
      {
        "threshold": 215,
        "points": 18
      },
      {
        "threshold": 216,
        "points": 17
      },
      {
        "threshold": 217,
        "points": 16
      },
      {
        "threshold": 218,
        "points": 15
      },
      {
        "threshold": 219,
        "points": 14
      },
      {
        "threshold": 220,
        "points": 13
      },
      {
        "threshold": 221,
        "points": 12
      },
      {
        "threshold": 222,
        "points": 11
      },
      {
        "threshold": 223,
        "points": 10
      },
      {
        "threshold": 224,
        "points": 9
      },
      {
        "threshold": 225,
        "points": 8
      },
      {
        "threshold": 226,
        "points": 7
      },
      {
        "threshold": 227,
        "points": 6
      },
      {
        "threshold": 228,
        "points": 5
      },
      {
        "threshold": 229,
        "points": 4
      },
      {
        "threshold": 230,
        "points": 3
      },
      {
        "threshold": 231,
        "points": 2
      },
      {
        "threshold": 232,
        "points": 1
      },
      {
        "threshold": 233,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 870,
        "points": 100
      },
      {
        "threshold": 892,
        "points": 99
      },
      {
        "threshold": 908,
        "points": 98
      },
      {
        "threshold": 922,
        "points": 97
      },
      {
        "threshold": 935,
        "points": 96
      },
      {
        "threshold": 947,
        "points": 95
      },
      {
        "threshold": 958,
        "points": 94
      },
      {
        "threshold": 969,
        "points": 93
      },
      {
        "threshold": 979,
        "points": 92
      },
      {
        "threshold": 989,
        "points": 91
      },
      {
        "threshold": 999,
        "points": 90
      },
      {
        "threshold": 1008,
        "points": 89
      },
      {
        "threshold": 1018,
        "points": 88
      },
      {
        "threshold": 1027,
        "points": 87
      },
      {
        "threshold": 1036,
        "points": 86
      },
      {
        "threshold": 1045,
        "points": 85
      },
      {
        "threshold": 1055,
        "points": 84
      },
      {
        "threshold": 1064,
        "points": 83
      },
      {
        "threshold": 1073,
        "points": 82
      },
      {
        "threshold": 1082,
        "points": 81
      },
      {
        "threshold": 1092,
        "points": 80
      },
      {
        "threshold": 1101,
        "points": 79
      },
      {
        "threshold": 1111,
        "points": 78
      },
      {
        "threshold": 1121,
        "points": 77
      },
      {
        "threshold": 1131,
        "points": 76
      },
      {
        "threshold": 1140,
        "points": 75
      },
      {
        "threshold": 1150,
        "points": 74
      },
      {
        "threshold": 1160,
        "points": 73
      },
      {
        "threshold": 1170,
        "points": 70
      },
      {
        "threshold": 1181,
        "points": 69
      },
      {
        "threshold": 1202,
        "points": 68
      },
      {
        "threshold": 1213,
        "points": 67
      },
      {
        "threshold": 1237,
        "points": 66
      },
      {
        "threshold": 1250,
        "points": 65
      },
      {
        "threshold": 1264,
        "points": 64
      },
      {
        "threshold": 1279,
        "points": 63
      },
      {
        "threshold": 1297,
        "points": 62
      },
      {
        "threshold": 1319,
        "points": 61
      },
      {
        "threshold": 1324,
        "points": 60
      },
      {
        "threshold": 1327,
        "points": 59
      },
      {
        "threshold": 1330,
        "points": 58
      },
      {
        "threshold": 1332,
        "points": 57
      },
      {
        "threshold": 1335,
        "points": 56
      },
      {
        "threshold": 1338,
        "points": 55
      },
      {
        "threshold": 1341,
        "points": 54
      },
      {
        "threshold": 1344,
        "points": 53
      },
      {
        "threshold": 1346,
        "points": 52
      },
      {
        "threshold": 1349,
        "points": 51
      },
      {
        "threshold": 1352,
        "points": 50
      },
      {
        "threshold": 1355,
        "points": 49
      },
      {
        "threshold": 1358,
        "points": 48
      },
      {
        "threshold": 1360,
        "points": 47
      },
      {
        "threshold": 1363,
        "points": 46
      },
      {
        "threshold": 1366,
        "points": 45
      },
      {
        "threshold": 1369,
        "points": 44
      },
      {
        "threshold": 1371,
        "points": 43
      },
      {
        "threshold": 1374,
        "points": 42
      },
      {
        "threshold": 1377,
        "points": 41
      },
      {
        "threshold": 1380,
        "points": 40
      },
      {
        "threshold": 1383,
        "points": 39
      },
      {
        "threshold": 1385,
        "points": 38
      },
      {
        "threshold": 1388,
        "points": 37
      },
      {
        "threshold": 1391,
        "points": 36
      },
      {
        "threshold": 1394,
        "points": 35
      },
      {
        "threshold": 1397,
        "points": 34
      },
      {
        "threshold": 1399,
        "points": 33
      },
      {
        "threshold": 1402,
        "points": 32
      },
      {
        "threshold": 1405,
        "points": 31
      },
      {
        "threshold": 1408,
        "points": 30
      },
      {
        "threshold": 1411,
        "points": 29
      },
      {
        "threshold": 1413,
        "points": 28
      },
      {
        "threshold": 1416,
        "points": 27
      },
      {
        "threshold": 1419,
        "points": 26
      },
      {
        "threshold": 1422,
        "points": 25
      },
      {
        "threshold": 1425,
        "points": 24
      },
      {
        "threshold": 1427,
        "points": 23
      },
      {
        "threshold": 1430,
        "points": 22
      },
      {
        "threshold": 1433,
        "points": 21
      },
      {
        "threshold": 1436,
        "points": 20
      },
      {
        "threshold": 1439,
        "points": 19
      },
      {
        "threshold": 1441,
        "points": 18
      },
      {
        "threshold": 1444,
        "points": 17
      },
      {
        "threshold": 1447,
        "points": 16
      },
      {
        "threshold": 1450,
        "points": 15
      },
      {
        "threshold": 1453,
        "points": 14
      },
      {
        "threshold": 1455,
        "points": 13
      },
      {
        "threshold": 1458,
        "points": 12
      },
      {
        "threshold": 1461,
        "points": 11
      },
      {
        "threshold": 1464,
        "points": 10
      },
      {
        "threshold": 1466,
        "points": 9
      },
      {
        "threshold": 1469,
        "points": 8
      },
      {
        "threshold": 1472,
        "points": 7
      },
      {
        "threshold": 1475,
        "points": 6
      },
      {
        "threshold": 1478,
        "points": 5
      },
      {
        "threshold": 1480,
        "points": 4
      },
      {
        "threshold": 1483,
        "points": 3
      },
      {
        "threshold": 1486,
        "points": 2
      },
      {
        "threshold": 1489,
        "points": 1
      },
      {
        "threshold": 1492,
        "points": 0
      }
    ]
  },
  "female|47-51": {
    "deadlift": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 70,
        "points": 10
      },
      {
        "threshold": 80,
        "points": 20
      },
      {
        "threshold": 90,
        "points": 30
      },
      {
        "threshold": 100,
        "points": 40
      },
      {
        "threshold": 110,
        "points": 50
      },
      {
        "threshold": 120,
        "points": 60
      },
      {
        "threshold": 130,
        "points": 73
      },
      {
        "threshold": 140,
        "points": 79
      },
      {
        "threshold": 150,
        "points": 84
      },
      {
        "threshold": 160,
        "points": 89
      },
      {
        "threshold": 170,
        "points": 93
      },
      {
        "threshold": 180,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 98
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 11,
        "points": 62
      },
      {
        "threshold": 12,
        "points": 64
      },
      {
        "threshold": 13,
        "points": 66
      },
      {
        "threshold": 14,
        "points": 69
      },
      {
        "threshold": 15,
        "points": 71
      },
      {
        "threshold": 16,
        "points": 73
      },
      {
        "threshold": 17,
        "points": 75
      },
      {
        "threshold": 18,
        "points": 76
      },
      {
        "threshold": 19,
        "points": 78
      },
      {
        "threshold": 20,
        "points": 80
      },
      {
        "threshold": 21,
        "points": 81
      },
      {
        "threshold": 22,
        "points": 83
      },
      {
        "threshold": 23,
        "points": 84
      },
      {
        "threshold": 24,
        "points": 86
      },
      {
        "threshold": 25,
        "points": 87
      },
      {
        "threshold": 26,
        "points": 88
      },
      {
        "threshold": 27,
        "points": 89
      },
      {
        "threshold": 28,
        "points": 91
      },
      {
        "threshold": 29,
        "points": 92
      },
      {
        "threshold": 30,
        "points": 93
      },
      {
        "threshold": 31,
        "points": 94
      },
      {
        "threshold": 32,
        "points": 95
      },
      {
        "threshold": 33,
        "points": 96
      },
      {
        "threshold": 34,
        "points": 97
      },
      {
        "threshold": 35,
        "points": 98
      },
      {
        "threshold": 37,
        "points": 99
      },
      {
        "threshold": 38,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 131,
        "points": 100
      },
      {
        "threshold": 133,
        "points": 99
      },
      {
        "threshold": 142,
        "points": 98
      },
      {
        "threshold": 144,
        "points": 97
      },
      {
        "threshold": 146,
        "points": 96
      },
      {
        "threshold": 148,
        "points": 95
      },
      {
        "threshold": 150,
        "points": 94
      },
      {
        "threshold": 151,
        "points": 93
      },
      {
        "threshold": 153,
        "points": 92
      },
      {
        "threshold": 155,
        "points": 91
      },
      {
        "threshold": 157,
        "points": 90
      },
      {
        "threshold": 158,
        "points": 89
      },
      {
        "threshold": 160,
        "points": 88
      },
      {
        "threshold": 161,
        "points": 87
      },
      {
        "threshold": 162,
        "points": 86
      },
      {
        "threshold": 164,
        "points": 85
      },
      {
        "threshold": 165,
        "points": 84
      },
      {
        "threshold": 166,
        "points": 83
      },
      {
        "threshold": 167,
        "points": 82
      },
      {
        "threshold": 168,
        "points": 81
      },
      {
        "threshold": 170,
        "points": 80
      },
      {
        "threshold": 171,
        "points": 79
      },
      {
        "threshold": 172,
        "points": 78
      },
      {
        "threshold": 174,
        "points": 77
      },
      {
        "threshold": 176,
        "points": 76
      },
      {
        "threshold": 177,
        "points": 75
      },
      {
        "threshold": 178,
        "points": 74
      },
      {
        "threshold": 179,
        "points": 73
      },
      {
        "threshold": 180,
        "points": 72
      },
      {
        "threshold": 182,
        "points": 71
      },
      {
        "threshold": 185,
        "points": 70
      },
      {
        "threshold": 188,
        "points": 69
      },
      {
        "threshold": 190,
        "points": 68
      },
      {
        "threshold": 194,
        "points": 67
      },
      {
        "threshold": 196,
        "points": 66
      },
      {
        "threshold": 201,
        "points": 65
      },
      {
        "threshold": 204,
        "points": 64
      },
      {
        "threshold": 209,
        "points": 63
      },
      {
        "threshold": 212,
        "points": 62
      },
      {
        "threshold": 222,
        "points": 61
      },
      {
        "threshold": 231,
        "points": 60
      },
      {
        "threshold": 232,
        "points": 59
      },
      {
        "threshold": 233,
        "points": 58
      },
      {
        "threshold": 234,
        "points": 57
      },
      {
        "threshold": 235,
        "points": 56
      },
      {
        "threshold": 236,
        "points": 55
      },
      {
        "threshold": 237,
        "points": 54
      },
      {
        "threshold": 238,
        "points": 53
      },
      {
        "threshold": 239,
        "points": 52
      },
      {
        "threshold": 240,
        "points": 51
      },
      {
        "threshold": 241,
        "points": 50
      },
      {
        "threshold": 242,
        "points": 49
      },
      {
        "threshold": 243,
        "points": 48
      },
      {
        "threshold": 244,
        "points": 47
      },
      {
        "threshold": 245,
        "points": 46
      },
      {
        "threshold": 246,
        "points": 45
      },
      {
        "threshold": 247,
        "points": 44
      },
      {
        "threshold": 248,
        "points": 43
      },
      {
        "threshold": 249,
        "points": 42
      },
      {
        "threshold": 250,
        "points": 41
      },
      {
        "threshold": 251,
        "points": 40
      },
      {
        "threshold": 252,
        "points": 39
      },
      {
        "threshold": 253,
        "points": 38
      },
      {
        "threshold": 254,
        "points": 37
      },
      {
        "threshold": 255,
        "points": 36
      },
      {
        "threshold": 256,
        "points": 35
      },
      {
        "threshold": 257,
        "points": 34
      },
      {
        "threshold": 258,
        "points": 33
      },
      {
        "threshold": 259,
        "points": 32
      },
      {
        "threshold": 260,
        "points": 31
      },
      {
        "threshold": 261,
        "points": 30
      },
      {
        "threshold": 262,
        "points": 29
      },
      {
        "threshold": 263,
        "points": 28
      },
      {
        "threshold": 264,
        "points": 27
      },
      {
        "threshold": 265,
        "points": 26
      },
      {
        "threshold": 266,
        "points": 25
      },
      {
        "threshold": 267,
        "points": 24
      },
      {
        "threshold": 268,
        "points": 23
      },
      {
        "threshold": 269,
        "points": 22
      },
      {
        "threshold": 270,
        "points": 21
      },
      {
        "threshold": 271,
        "points": 20
      },
      {
        "threshold": 272,
        "points": 19
      },
      {
        "threshold": 273,
        "points": 18
      },
      {
        "threshold": 274,
        "points": 17
      },
      {
        "threshold": 275,
        "points": 16
      },
      {
        "threshold": 276,
        "points": 15
      },
      {
        "threshold": 277,
        "points": 14
      },
      {
        "threshold": 278,
        "points": 13
      },
      {
        "threshold": 279,
        "points": 12
      },
      {
        "threshold": 280,
        "points": 11
      },
      {
        "threshold": 281,
        "points": 10
      },
      {
        "threshold": 282,
        "points": 9
      },
      {
        "threshold": 283,
        "points": 8
      },
      {
        "threshold": 284,
        "points": 7
      },
      {
        "threshold": 285,
        "points": 6
      },
      {
        "threshold": 286,
        "points": 5
      },
      {
        "threshold": 287,
        "points": 4
      },
      {
        "threshold": 288,
        "points": 3
      },
      {
        "threshold": 289,
        "points": 2
      },
      {
        "threshold": 290,
        "points": 1
      },
      {
        "threshold": 291,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 990,
        "points": 100
      },
      {
        "threshold": 1020,
        "points": 99
      },
      {
        "threshold": 1040,
        "points": 98
      },
      {
        "threshold": 1057,
        "points": 97
      },
      {
        "threshold": 1072,
        "points": 96
      },
      {
        "threshold": 1086,
        "points": 95
      },
      {
        "threshold": 1099,
        "points": 94
      },
      {
        "threshold": 1111,
        "points": 93
      },
      {
        "threshold": 1122,
        "points": 92
      },
      {
        "threshold": 1132,
        "points": 91
      },
      {
        "threshold": 1143,
        "points": 90
      },
      {
        "threshold": 1153,
        "points": 89
      },
      {
        "threshold": 1162,
        "points": 88
      },
      {
        "threshold": 1172,
        "points": 87
      },
      {
        "threshold": 1181,
        "points": 86
      },
      {
        "threshold": 1190,
        "points": 85
      },
      {
        "threshold": 1199,
        "points": 84
      },
      {
        "threshold": 1208,
        "points": 83
      },
      {
        "threshold": 1217,
        "points": 82
      },
      {
        "threshold": 1226,
        "points": 81
      },
      {
        "threshold": 1234,
        "points": 80
      },
      {
        "threshold": 1242,
        "points": 79
      },
      {
        "threshold": 1250,
        "points": 78
      },
      {
        "threshold": 1258,
        "points": 77
      },
      {
        "threshold": 1266,
        "points": 76
      },
      {
        "threshold": 1274,
        "points": 75
      },
      {
        "threshold": 1282,
        "points": 74
      },
      {
        "threshold": 1289,
        "points": 73
      },
      {
        "threshold": 1297,
        "points": 72
      },
      {
        "threshold": 1300,
        "points": 70
      },
      {
        "threshold": 1305,
        "points": 71
      },
      {
        "threshold": 1321,
        "points": 69
      },
      {
        "threshold": 1329,
        "points": 68
      },
      {
        "threshold": 1337,
        "points": 67
      },
      {
        "threshold": 1346,
        "points": 66
      },
      {
        "threshold": 1355,
        "points": 65
      },
      {
        "threshold": 1364,
        "points": 64
      },
      {
        "threshold": 1374,
        "points": 63
      },
      {
        "threshold": 1384,
        "points": 62
      },
      {
        "threshold": 1395,
        "points": 61
      },
      {
        "threshold": 1410,
        "points": 60
      },
      {
        "threshold": 1413,
        "points": 59
      },
      {
        "threshold": 1416,
        "points": 58
      },
      {
        "threshold": 1419,
        "points": 57
      },
      {
        "threshold": 1422,
        "points": 56
      },
      {
        "threshold": 1425,
        "points": 55
      },
      {
        "threshold": 1427,
        "points": 54
      },
      {
        "threshold": 1430,
        "points": 53
      },
      {
        "threshold": 1433,
        "points": 52
      },
      {
        "threshold": 1436,
        "points": 51
      },
      {
        "threshold": 1439,
        "points": 50
      },
      {
        "threshold": 1442,
        "points": 49
      },
      {
        "threshold": 1445,
        "points": 48
      },
      {
        "threshold": 1448,
        "points": 47
      },
      {
        "threshold": 1451,
        "points": 46
      },
      {
        "threshold": 1454,
        "points": 45
      },
      {
        "threshold": 1457,
        "points": 44
      },
      {
        "threshold": 1459,
        "points": 43
      },
      {
        "threshold": 1462,
        "points": 42
      },
      {
        "threshold": 1465,
        "points": 41
      },
      {
        "threshold": 1468,
        "points": 40
      },
      {
        "threshold": 1471,
        "points": 39
      },
      {
        "threshold": 1474,
        "points": 38
      },
      {
        "threshold": 1477,
        "points": 37
      },
      {
        "threshold": 1480,
        "points": 36
      },
      {
        "threshold": 1483,
        "points": 35
      },
      {
        "threshold": 1486,
        "points": 34
      },
      {
        "threshold": 1489,
        "points": 33
      },
      {
        "threshold": 1491,
        "points": 32
      },
      {
        "threshold": 1494,
        "points": 31
      },
      {
        "threshold": 1497,
        "points": 30
      },
      {
        "threshold": 1500,
        "points": 29
      },
      {
        "threshold": 1503,
        "points": 28
      },
      {
        "threshold": 1506,
        "points": 27
      },
      {
        "threshold": 1509,
        "points": 26
      },
      {
        "threshold": 1512,
        "points": 25
      },
      {
        "threshold": 1515,
        "points": 24
      },
      {
        "threshold": 1518,
        "points": 23
      },
      {
        "threshold": 1521,
        "points": 22
      },
      {
        "threshold": 1523,
        "points": 21
      },
      {
        "threshold": 1526,
        "points": 20
      },
      {
        "threshold": 1529,
        "points": 19
      },
      {
        "threshold": 1532,
        "points": 18
      },
      {
        "threshold": 1535,
        "points": 17
      },
      {
        "threshold": 1538,
        "points": 16
      },
      {
        "threshold": 1541,
        "points": 15
      },
      {
        "threshold": 1544,
        "points": 14
      },
      {
        "threshold": 1547,
        "points": 13
      },
      {
        "threshold": 1550,
        "points": 12
      },
      {
        "threshold": 1553,
        "points": 11
      },
      {
        "threshold": 1555,
        "points": 10
      },
      {
        "threshold": 1558,
        "points": 9
      },
      {
        "threshold": 1561,
        "points": 8
      },
      {
        "threshold": 1564,
        "points": 7
      },
      {
        "threshold": 1567,
        "points": 6
      },
      {
        "threshold": 1570,
        "points": 5
      },
      {
        "threshold": 1573,
        "points": 4
      },
      {
        "threshold": 1576,
        "points": 3
      },
      {
        "threshold": 1579,
        "points": 2
      },
      {
        "threshold": 1582,
        "points": 1
      },
      {
        "threshold": 1585,
        "points": 0
      }
    ]
  },
  "male|52-56": {
    "deadlift": [
      {
        "threshold": 80,
        "points": 0
      },
      {
        "threshold": 90,
        "points": 10
      },
      {
        "threshold": 100,
        "points": 20
      },
      {
        "threshold": 110,
        "points": 30
      },
      {
        "threshold": 120,
        "points": 40
      },
      {
        "threshold": 130,
        "points": 50
      },
      {
        "threshold": 140,
        "points": 60
      },
      {
        "threshold": 150,
        "points": 63
      },
      {
        "threshold": 160,
        "points": 65
      },
      {
        "threshold": 170,
        "points": 67
      },
      {
        "threshold": 180,
        "points": 70
      },
      {
        "threshold": 190,
        "points": 72
      },
      {
        "threshold": 200,
        "points": 74
      },
      {
        "threshold": 210,
        "points": 76
      },
      {
        "threshold": 220,
        "points": 78
      },
      {
        "threshold": 230,
        "points": 80
      },
      {
        "threshold": 240,
        "points": 82
      },
      {
        "threshold": 250,
        "points": 84
      },
      {
        "threshold": 260,
        "points": 86
      },
      {
        "threshold": 270,
        "points": 89
      },
      {
        "threshold": 280,
        "points": 91
      },
      {
        "threshold": 290,
        "points": 93
      },
      {
        "threshold": 300,
        "points": 95
      },
      {
        "threshold": 310,
        "points": 97
      },
      {
        "threshold": 320,
        "points": 99
      },
      {
        "threshold": 330,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 11,
        "points": 61
      },
      {
        "threshold": 13,
        "points": 62
      },
      {
        "threshold": 14,
        "points": 63
      },
      {
        "threshold": 15,
        "points": 64
      },
      {
        "threshold": 16,
        "points": 65
      },
      {
        "threshold": 17,
        "points": 66
      },
      {
        "threshold": 18,
        "points": 67
      },
      {
        "threshold": 19,
        "points": 68
      },
      {
        "threshold": 20,
        "points": 69
      },
      {
        "threshold": 21,
        "points": 70
      },
      {
        "threshold": 22,
        "points": 71
      },
      {
        "threshold": 23,
        "points": 72
      },
      {
        "threshold": 24,
        "points": 73
      },
      {
        "threshold": 25,
        "points": 74
      },
      {
        "threshold": 26,
        "points": 76
      },
      {
        "threshold": 27,
        "points": 77
      },
      {
        "threshold": 28,
        "points": 78
      },
      {
        "threshold": 29,
        "points": 79
      },
      {
        "threshold": 30,
        "points": 80
      },
      {
        "threshold": 31,
        "points": 81
      },
      {
        "threshold": 32,
        "points": 82
      },
      {
        "threshold": 33,
        "points": 83
      },
      {
        "threshold": 34,
        "points": 84
      },
      {
        "threshold": 35,
        "points": 85
      },
      {
        "threshold": 36,
        "points": 86
      },
      {
        "threshold": 37,
        "points": 87
      },
      {
        "threshold": 38,
        "points": 88
      },
      {
        "threshold": 39,
        "points": 89
      },
      {
        "threshold": 40,
        "points": 90
      },
      {
        "threshold": 41,
        "points": 91
      },
      {
        "threshold": 42,
        "points": 92
      },
      {
        "threshold": 43,
        "points": 93
      },
      {
        "threshold": 44,
        "points": 94
      },
      {
        "threshold": 45,
        "points": 95
      },
      {
        "threshold": 46,
        "points": 96
      },
      {
        "threshold": 47,
        "points": 97
      },
      {
        "threshold": 48,
        "points": 98
      },
      {
        "threshold": 50,
        "points": 99
      },
      {
        "threshold": 51,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 112,
        "points": 100
      },
      {
        "threshold": 115,
        "points": 99
      },
      {
        "threshold": 117,
        "points": 98
      },
      {
        "threshold": 120,
        "points": 97
      },
      {
        "threshold": 121,
        "points": 96
      },
      {
        "threshold": 123,
        "points": 95
      },
      {
        "threshold": 125,
        "points": 94
      },
      {
        "threshold": 126,
        "points": 93
      },
      {
        "threshold": 127,
        "points": 92
      },
      {
        "threshold": 129,
        "points": 91
      },
      {
        "threshold": 130,
        "points": 90
      },
      {
        "threshold": 131,
        "points": 89
      },
      {
        "threshold": 133,
        "points": 88
      },
      {
        "threshold": 134,
        "points": 87
      },
      {
        "threshold": 135,
        "points": 86
      },
      {
        "threshold": 136,
        "points": 85
      },
      {
        "threshold": 137,
        "points": 84
      },
      {
        "threshold": 139,
        "points": 83
      },
      {
        "threshold": 140,
        "points": 82
      },
      {
        "threshold": 141,
        "points": 81
      },
      {
        "threshold": 143,
        "points": 80
      },
      {
        "threshold": 145,
        "points": 78
      },
      {
        "threshold": 146,
        "points": 77
      },
      {
        "threshold": 148,
        "points": 76
      },
      {
        "threshold": 149,
        "points": 75
      },
      {
        "threshold": 150,
        "points": 74
      },
      {
        "threshold": 151,
        "points": 73
      },
      {
        "threshold": 152,
        "points": 72
      },
      {
        "threshold": 154,
        "points": 71
      },
      {
        "threshold": 155,
        "points": 70
      },
      {
        "threshold": 157,
        "points": 69
      },
      {
        "threshold": 158,
        "points": 68
      },
      {
        "threshold": 160,
        "points": 67
      },
      {
        "threshold": 161,
        "points": 66
      },
      {
        "threshold": 164,
        "points": 65
      },
      {
        "threshold": 166,
        "points": 64
      },
      {
        "threshold": 168,
        "points": 63
      },
      {
        "threshold": 170,
        "points": 62
      },
      {
        "threshold": 177,
        "points": 61
      },
      {
        "threshold": 180,
        "points": 60
      },
      {
        "threshold": 181,
        "points": 59
      },
      {
        "threshold": 182,
        "points": 58
      },
      {
        "threshold": 183,
        "points": 57
      },
      {
        "threshold": 184,
        "points": 56
      },
      {
        "threshold": 185,
        "points": 55
      },
      {
        "threshold": 186,
        "points": 54
      },
      {
        "threshold": 187,
        "points": 53
      },
      {
        "threshold": 188,
        "points": 52
      },
      {
        "threshold": 189,
        "points": 51
      },
      {
        "threshold": 190,
        "points": 50
      },
      {
        "threshold": 191,
        "points": 49
      },
      {
        "threshold": 192,
        "points": 48
      },
      {
        "threshold": 193,
        "points": 47
      },
      {
        "threshold": 194,
        "points": 46
      },
      {
        "threshold": 195,
        "points": 45
      },
      {
        "threshold": 196,
        "points": 44
      },
      {
        "threshold": 197,
        "points": 43
      },
      {
        "threshold": 198,
        "points": 42
      },
      {
        "threshold": 199,
        "points": 41
      },
      {
        "threshold": 200,
        "points": 40
      },
      {
        "threshold": 201,
        "points": 39
      },
      {
        "threshold": 202,
        "points": 38
      },
      {
        "threshold": 203,
        "points": 37
      },
      {
        "threshold": 204,
        "points": 36
      },
      {
        "threshold": 205,
        "points": 35
      },
      {
        "threshold": 206,
        "points": 34
      },
      {
        "threshold": 207,
        "points": 33
      },
      {
        "threshold": 208,
        "points": 32
      },
      {
        "threshold": 209,
        "points": 31
      },
      {
        "threshold": 210,
        "points": 30
      },
      {
        "threshold": 211,
        "points": 29
      },
      {
        "threshold": 212,
        "points": 28
      },
      {
        "threshold": 213,
        "points": 27
      },
      {
        "threshold": 214,
        "points": 26
      },
      {
        "threshold": 215,
        "points": 25
      },
      {
        "threshold": 216,
        "points": 24
      },
      {
        "threshold": 217,
        "points": 23
      },
      {
        "threshold": 218,
        "points": 22
      },
      {
        "threshold": 219,
        "points": 21
      },
      {
        "threshold": 220,
        "points": 20
      },
      {
        "threshold": 221,
        "points": 19
      },
      {
        "threshold": 222,
        "points": 18
      },
      {
        "threshold": 223,
        "points": 17
      },
      {
        "threshold": 224,
        "points": 16
      },
      {
        "threshold": 225,
        "points": 15
      },
      {
        "threshold": 226,
        "points": 14
      },
      {
        "threshold": 227,
        "points": 13
      },
      {
        "threshold": 228,
        "points": 12
      },
      {
        "threshold": 229,
        "points": 11
      },
      {
        "threshold": 230,
        "points": 10
      },
      {
        "threshold": 231,
        "points": 9
      },
      {
        "threshold": 232,
        "points": 8
      },
      {
        "threshold": 233,
        "points": 7
      },
      {
        "threshold": 234,
        "points": 6
      },
      {
        "threshold": 235,
        "points": 5
      },
      {
        "threshold": 236,
        "points": 4
      },
      {
        "threshold": 237,
        "points": 3
      },
      {
        "threshold": 238,
        "points": 2
      },
      {
        "threshold": 239,
        "points": 1
      },
      {
        "threshold": 240,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 909,
        "points": 100
      },
      {
        "threshold": 938,
        "points": 99
      },
      {
        "threshold": 954,
        "points": 98
      },
      {
        "threshold": 968,
        "points": 97
      },
      {
        "threshold": 981,
        "points": 96
      },
      {
        "threshold": 993,
        "points": 95
      },
      {
        "threshold": 1004,
        "points": 94
      },
      {
        "threshold": 1015,
        "points": 93
      },
      {
        "threshold": 1026,
        "points": 92
      },
      {
        "threshold": 1036,
        "points": 91
      },
      {
        "threshold": 1046,
        "points": 90
      },
      {
        "threshold": 1055,
        "points": 89
      },
      {
        "threshold": 1065,
        "points": 88
      },
      {
        "threshold": 1074,
        "points": 87
      },
      {
        "threshold": 1084,
        "points": 86
      },
      {
        "threshold": 1093,
        "points": 85
      },
      {
        "threshold": 1102,
        "points": 84
      },
      {
        "threshold": 1112,
        "points": 83
      },
      {
        "threshold": 1121,
        "points": 82
      },
      {
        "threshold": 1131,
        "points": 81
      },
      {
        "threshold": 1140,
        "points": 80
      },
      {
        "threshold": 1150,
        "points": 79
      },
      {
        "threshold": 1160,
        "points": 78
      },
      {
        "threshold": 1170,
        "points": 77
      },
      {
        "threshold": 1179,
        "points": 76
      },
      {
        "threshold": 1189,
        "points": 75
      },
      {
        "threshold": 1199,
        "points": 74
      },
      {
        "threshold": 1210,
        "points": 73
      },
      {
        "threshold": 1220,
        "points": 70
      },
      {
        "threshold": 1252,
        "points": 69
      },
      {
        "threshold": 1263,
        "points": 68
      },
      {
        "threshold": 1275,
        "points": 67
      },
      {
        "threshold": 1287,
        "points": 66
      },
      {
        "threshold": 1300,
        "points": 65
      },
      {
        "threshold": 1314,
        "points": 64
      },
      {
        "threshold": 1330,
        "points": 63
      },
      {
        "threshold": 1348,
        "points": 62
      },
      {
        "threshold": 1370,
        "points": 60
      },
      {
        "threshold": 1373,
        "points": 59
      },
      {
        "threshold": 1376,
        "points": 58
      },
      {
        "threshold": 1378,
        "points": 57
      },
      {
        "threshold": 1381,
        "points": 56
      },
      {
        "threshold": 1384,
        "points": 55
      },
      {
        "threshold": 1387,
        "points": 54
      },
      {
        "threshold": 1390,
        "points": 53
      },
      {
        "threshold": 1392,
        "points": 52
      },
      {
        "threshold": 1395,
        "points": 51
      },
      {
        "threshold": 1398,
        "points": 50
      },
      {
        "threshold": 1401,
        "points": 49
      },
      {
        "threshold": 1404,
        "points": 48
      },
      {
        "threshold": 1406,
        "points": 47
      },
      {
        "threshold": 1409,
        "points": 46
      },
      {
        "threshold": 1412,
        "points": 45
      },
      {
        "threshold": 1415,
        "points": 44
      },
      {
        "threshold": 1417,
        "points": 43
      },
      {
        "threshold": 1420,
        "points": 42
      },
      {
        "threshold": 1423,
        "points": 41
      },
      {
        "threshold": 1426,
        "points": 40
      },
      {
        "threshold": 1429,
        "points": 39
      },
      {
        "threshold": 1431,
        "points": 38
      },
      {
        "threshold": 1434,
        "points": 37
      },
      {
        "threshold": 1437,
        "points": 36
      },
      {
        "threshold": 1440,
        "points": 35
      },
      {
        "threshold": 1443,
        "points": 34
      },
      {
        "threshold": 1445,
        "points": 33
      },
      {
        "threshold": 1448,
        "points": 32
      },
      {
        "threshold": 1451,
        "points": 31
      },
      {
        "threshold": 1454,
        "points": 30
      },
      {
        "threshold": 1457,
        "points": 29
      },
      {
        "threshold": 1459,
        "points": 28
      },
      {
        "threshold": 1462,
        "points": 27
      },
      {
        "threshold": 1465,
        "points": 26
      },
      {
        "threshold": 1468,
        "points": 25
      },
      {
        "threshold": 1471,
        "points": 24
      },
      {
        "threshold": 1473,
        "points": 23
      },
      {
        "threshold": 1476,
        "points": 22
      },
      {
        "threshold": 1479,
        "points": 21
      },
      {
        "threshold": 1482,
        "points": 20
      },
      {
        "threshold": 1485,
        "points": 19
      },
      {
        "threshold": 1487,
        "points": 18
      },
      {
        "threshold": 1490,
        "points": 17
      },
      {
        "threshold": 1493,
        "points": 16
      },
      {
        "threshold": 1496,
        "points": 15
      },
      {
        "threshold": 1499,
        "points": 14
      },
      {
        "threshold": 1501,
        "points": 13
      },
      {
        "threshold": 1504,
        "points": 12
      },
      {
        "threshold": 1507,
        "points": 11
      },
      {
        "threshold": 1510,
        "points": 10
      },
      {
        "threshold": 1512,
        "points": 9
      },
      {
        "threshold": 1515,
        "points": 8
      },
      {
        "threshold": 1518,
        "points": 7
      },
      {
        "threshold": 1521,
        "points": 6
      },
      {
        "threshold": 1524,
        "points": 5
      },
      {
        "threshold": 1526,
        "points": 4
      },
      {
        "threshold": 1529,
        "points": 3
      },
      {
        "threshold": 1532,
        "points": 2
      },
      {
        "threshold": 1535,
        "points": 1
      },
      {
        "threshold": 1538,
        "points": 0
      }
    ]
  },
  "female|52-56": {
    "deadlift": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 70,
        "points": 10
      },
      {
        "threshold": 80,
        "points": 20
      },
      {
        "threshold": 90,
        "points": 30
      },
      {
        "threshold": 100,
        "points": 40
      },
      {
        "threshold": 110,
        "points": 50
      },
      {
        "threshold": 120,
        "points": 60
      },
      {
        "threshold": 130,
        "points": 72
      },
      {
        "threshold": 140,
        "points": 79
      },
      {
        "threshold": 150,
        "points": 85
      },
      {
        "threshold": 160,
        "points": 91
      },
      {
        "threshold": 170,
        "points": 95
      },
      {
        "threshold": 180,
        "points": 98
      },
      {
        "threshold": 190,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 11,
        "points": 63
      },
      {
        "threshold": 12,
        "points": 65
      },
      {
        "threshold": 13,
        "points": 68
      },
      {
        "threshold": 14,
        "points": 70
      },
      {
        "threshold": 15,
        "points": 72
      },
      {
        "threshold": 16,
        "points": 74
      },
      {
        "threshold": 17,
        "points": 76
      },
      {
        "threshold": 18,
        "points": 78
      },
      {
        "threshold": 19,
        "points": 80
      },
      {
        "threshold": 20,
        "points": 82
      },
      {
        "threshold": 21,
        "points": 83
      },
      {
        "threshold": 22,
        "points": 85
      },
      {
        "threshold": 23,
        "points": 86
      },
      {
        "threshold": 24,
        "points": 88
      },
      {
        "threshold": 25,
        "points": 89
      },
      {
        "threshold": 26,
        "points": 90
      },
      {
        "threshold": 27,
        "points": 92
      },
      {
        "threshold": 28,
        "points": 93
      },
      {
        "threshold": 29,
        "points": 94
      },
      {
        "threshold": 30,
        "points": 95
      },
      {
        "threshold": 31,
        "points": 96
      },
      {
        "threshold": 32,
        "points": 97
      },
      {
        "threshold": 33,
        "points": 98
      },
      {
        "threshold": 34,
        "points": 99
      },
      {
        "threshold": 36,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 138,
        "points": 100
      },
      {
        "threshold": 141,
        "points": 99
      },
      {
        "threshold": 148,
        "points": 98
      },
      {
        "threshold": 150,
        "points": 97
      },
      {
        "threshold": 152,
        "points": 96
      },
      {
        "threshold": 155,
        "points": 95
      },
      {
        "threshold": 158,
        "points": 94
      },
      {
        "threshold": 160,
        "points": 93
      },
      {
        "threshold": 161,
        "points": 92
      },
      {
        "threshold": 162,
        "points": 91
      },
      {
        "threshold": 164,
        "points": 90
      },
      {
        "threshold": 165,
        "points": 89
      },
      {
        "threshold": 166,
        "points": 88
      },
      {
        "threshold": 168,
        "points": 87
      },
      {
        "threshold": 170,
        "points": 86
      },
      {
        "threshold": 171,
        "points": 85
      },
      {
        "threshold": 172,
        "points": 84
      },
      {
        "threshold": 174,
        "points": 83
      },
      {
        "threshold": 175,
        "points": 82
      },
      {
        "threshold": 177,
        "points": 81
      },
      {
        "threshold": 178,
        "points": 80
      },
      {
        "threshold": 179,
        "points": 79
      },
      {
        "threshold": 180,
        "points": 78
      },
      {
        "threshold": 182,
        "points": 77
      },
      {
        "threshold": 185,
        "points": 76
      },
      {
        "threshold": 187,
        "points": 75
      },
      {
        "threshold": 189,
        "points": 74
      },
      {
        "threshold": 190,
        "points": 73
      },
      {
        "threshold": 193,
        "points": 72
      },
      {
        "threshold": 196,
        "points": 71
      },
      {
        "threshold": 199,
        "points": 70
      },
      {
        "threshold": 205,
        "points": 69
      },
      {
        "threshold": 207,
        "points": 68
      },
      {
        "threshold": 209,
        "points": 67
      },
      {
        "threshold": 213,
        "points": 66
      },
      {
        "threshold": 218,
        "points": 65
      },
      {
        "threshold": 222,
        "points": 64
      },
      {
        "threshold": 225,
        "points": 63
      },
      {
        "threshold": 230,
        "points": 62
      },
      {
        "threshold": 238,
        "points": 61
      },
      {
        "threshold": 243,
        "points": 60
      },
      {
        "threshold": 244,
        "points": 59
      },
      {
        "threshold": 245,
        "points": 58
      },
      {
        "threshold": 246,
        "points": 57
      },
      {
        "threshold": 247,
        "points": 56
      },
      {
        "threshold": 248,
        "points": 55
      },
      {
        "threshold": 249,
        "points": 54
      },
      {
        "threshold": 250,
        "points": 53
      },
      {
        "threshold": 251,
        "points": 52
      },
      {
        "threshold": 252,
        "points": 51
      },
      {
        "threshold": 253,
        "points": 50
      },
      {
        "threshold": 254,
        "points": 49
      },
      {
        "threshold": 255,
        "points": 48
      },
      {
        "threshold": 256,
        "points": 47
      },
      {
        "threshold": 257,
        "points": 46
      },
      {
        "threshold": 258,
        "points": 45
      },
      {
        "threshold": 259,
        "points": 44
      },
      {
        "threshold": 260,
        "points": 43
      },
      {
        "threshold": 261,
        "points": 42
      },
      {
        "threshold": 262,
        "points": 41
      },
      {
        "threshold": 263,
        "points": 40
      },
      {
        "threshold": 264,
        "points": 39
      },
      {
        "threshold": 265,
        "points": 38
      },
      {
        "threshold": 266,
        "points": 37
      },
      {
        "threshold": 267,
        "points": 36
      },
      {
        "threshold": 268,
        "points": 35
      },
      {
        "threshold": 269,
        "points": 34
      },
      {
        "threshold": 270,
        "points": 33
      },
      {
        "threshold": 271,
        "points": 32
      },
      {
        "threshold": 272,
        "points": 31
      },
      {
        "threshold": 273,
        "points": 30
      },
      {
        "threshold": 274,
        "points": 29
      },
      {
        "threshold": 275,
        "points": 28
      },
      {
        "threshold": 276,
        "points": 27
      },
      {
        "threshold": 277,
        "points": 26
      },
      {
        "threshold": 278,
        "points": 25
      },
      {
        "threshold": 279,
        "points": 24
      },
      {
        "threshold": 280,
        "points": 23
      },
      {
        "threshold": 281,
        "points": 22
      },
      {
        "threshold": 282,
        "points": 21
      },
      {
        "threshold": 283,
        "points": 20
      },
      {
        "threshold": 284,
        "points": 19
      },
      {
        "threshold": 285,
        "points": 18
      },
      {
        "threshold": 286,
        "points": 17
      },
      {
        "threshold": 287,
        "points": 16
      },
      {
        "threshold": 288,
        "points": 15
      },
      {
        "threshold": 289,
        "points": 14
      },
      {
        "threshold": 290,
        "points": 13
      },
      {
        "threshold": 291,
        "points": 12
      },
      {
        "threshold": 292,
        "points": 11
      },
      {
        "threshold": 293,
        "points": 10
      },
      {
        "threshold": 294,
        "points": 9
      },
      {
        "threshold": 295,
        "points": 8
      },
      {
        "threshold": 296,
        "points": 7
      },
      {
        "threshold": 297,
        "points": 6
      },
      {
        "threshold": 298,
        "points": 5
      },
      {
        "threshold": 299,
        "points": 4
      },
      {
        "threshold": 300,
        "points": 3
      },
      {
        "threshold": 301,
        "points": 2
      },
      {
        "threshold": 302,
        "points": 1
      },
      {
        "threshold": 303,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1019,
        "points": 100
      },
      {
        "threshold": 1064,
        "points": 99
      },
      {
        "threshold": 1085,
        "points": 98
      },
      {
        "threshold": 1102,
        "points": 97
      },
      {
        "threshold": 1117,
        "points": 96
      },
      {
        "threshold": 1130,
        "points": 95
      },
      {
        "threshold": 1143,
        "points": 94
      },
      {
        "threshold": 1155,
        "points": 93
      },
      {
        "threshold": 1166,
        "points": 92
      },
      {
        "threshold": 1177,
        "points": 91
      },
      {
        "threshold": 1187,
        "points": 90
      },
      {
        "threshold": 1197,
        "points": 89
      },
      {
        "threshold": 1207,
        "points": 88
      },
      {
        "threshold": 1216,
        "points": 87
      },
      {
        "threshold": 1226,
        "points": 86
      },
      {
        "threshold": 1235,
        "points": 85
      },
      {
        "threshold": 1244,
        "points": 84
      },
      {
        "threshold": 1253,
        "points": 83
      },
      {
        "threshold": 1262,
        "points": 82
      },
      {
        "threshold": 1270,
        "points": 81
      },
      {
        "threshold": 1279,
        "points": 80
      },
      {
        "threshold": 1287,
        "points": 79
      },
      {
        "threshold": 1295,
        "points": 78
      },
      {
        "threshold": 1303,
        "points": 77
      },
      {
        "threshold": 1311,
        "points": 76
      },
      {
        "threshold": 1319,
        "points": 75
      },
      {
        "threshold": 1327,
        "points": 74
      },
      {
        "threshold": 1334,
        "points": 73
      },
      {
        "threshold": 1342,
        "points": 72
      },
      {
        "threshold": 1350,
        "points": 71
      },
      {
        "threshold": 1358,
        "points": 70
      },
      {
        "threshold": 1366,
        "points": 69
      },
      {
        "threshold": 1374,
        "points": 68
      },
      {
        "threshold": 1383,
        "points": 67
      },
      {
        "threshold": 1391,
        "points": 66
      },
      {
        "threshold": 1400,
        "points": 65
      },
      {
        "threshold": 1409,
        "points": 64
      },
      {
        "threshold": 1419,
        "points": 63
      },
      {
        "threshold": 1429,
        "points": 62
      },
      {
        "threshold": 1440,
        "points": 60
      },
      {
        "threshold": 1441,
        "points": 61
      },
      {
        "threshold": 1443,
        "points": 59
      },
      {
        "threshold": 1446,
        "points": 58
      },
      {
        "threshold": 1449,
        "points": 57
      },
      {
        "threshold": 1452,
        "points": 56
      },
      {
        "threshold": 1455,
        "points": 55
      },
      {
        "threshold": 1457,
        "points": 54
      },
      {
        "threshold": 1460,
        "points": 53
      },
      {
        "threshold": 1463,
        "points": 52
      },
      {
        "threshold": 1466,
        "points": 51
      },
      {
        "threshold": 1469,
        "points": 50
      },
      {
        "threshold": 1472,
        "points": 49
      },
      {
        "threshold": 1475,
        "points": 48
      },
      {
        "threshold": 1478,
        "points": 47
      },
      {
        "threshold": 1481,
        "points": 46
      },
      {
        "threshold": 1484,
        "points": 45
      },
      {
        "threshold": 1487,
        "points": 44
      },
      {
        "threshold": 1489,
        "points": 43
      },
      {
        "threshold": 1492,
        "points": 42
      },
      {
        "threshold": 1495,
        "points": 41
      },
      {
        "threshold": 1498,
        "points": 40
      },
      {
        "threshold": 1501,
        "points": 39
      },
      {
        "threshold": 1504,
        "points": 38
      },
      {
        "threshold": 1507,
        "points": 37
      },
      {
        "threshold": 1510,
        "points": 36
      },
      {
        "threshold": 1513,
        "points": 35
      },
      {
        "threshold": 1516,
        "points": 34
      },
      {
        "threshold": 1519,
        "points": 33
      },
      {
        "threshold": 1521,
        "points": 32
      },
      {
        "threshold": 1524,
        "points": 31
      },
      {
        "threshold": 1527,
        "points": 30
      },
      {
        "threshold": 1530,
        "points": 29
      },
      {
        "threshold": 1533,
        "points": 28
      },
      {
        "threshold": 1536,
        "points": 27
      },
      {
        "threshold": 1539,
        "points": 26
      },
      {
        "threshold": 1542,
        "points": 25
      },
      {
        "threshold": 1545,
        "points": 24
      },
      {
        "threshold": 1548,
        "points": 23
      },
      {
        "threshold": 1551,
        "points": 22
      },
      {
        "threshold": 1553,
        "points": 21
      },
      {
        "threshold": 1556,
        "points": 20
      },
      {
        "threshold": 1559,
        "points": 19
      },
      {
        "threshold": 1562,
        "points": 18
      },
      {
        "threshold": 1565,
        "points": 17
      },
      {
        "threshold": 1568,
        "points": 16
      },
      {
        "threshold": 1571,
        "points": 15
      },
      {
        "threshold": 1574,
        "points": 14
      },
      {
        "threshold": 1577,
        "points": 13
      },
      {
        "threshold": 1580,
        "points": 12
      },
      {
        "threshold": 1583,
        "points": 11
      },
      {
        "threshold": 1585,
        "points": 10
      },
      {
        "threshold": 1588,
        "points": 9
      },
      {
        "threshold": 1591,
        "points": 8
      },
      {
        "threshold": 1594,
        "points": 7
      },
      {
        "threshold": 1597,
        "points": 6
      },
      {
        "threshold": 1600,
        "points": 5
      },
      {
        "threshold": 1603,
        "points": 4
      },
      {
        "threshold": 1606,
        "points": 3
      },
      {
        "threshold": 1609,
        "points": 2
      },
      {
        "threshold": 1612,
        "points": 1
      },
      {
        "threshold": 1615,
        "points": 0
      }
    ]
  },
  "male|57-61": {
    "deadlift": [
      {
        "threshold": 80,
        "points": 0
      },
      {
        "threshold": 90,
        "points": 10
      },
      {
        "threshold": 100,
        "points": 20
      },
      {
        "threshold": 110,
        "points": 30
      },
      {
        "threshold": 120,
        "points": 40
      },
      {
        "threshold": 130,
        "points": 50
      },
      {
        "threshold": 140,
        "points": 60
      },
      {
        "threshold": 150,
        "points": 71
      },
      {
        "threshold": 160,
        "points": 79
      },
      {
        "threshold": 170,
        "points": 89
      },
      {
        "threshold": 180,
        "points": 91
      },
      {
        "threshold": 190,
        "points": 93
      },
      {
        "threshold": 200,
        "points": 94
      },
      {
        "threshold": 210,
        "points": 96
      },
      {
        "threshold": 220,
        "points": 97
      },
      {
        "threshold": 230,
        "points": 98
      },
      {
        "threshold": 240,
        "points": 99
      },
      {
        "threshold": 250,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 11,
        "points": 65
      },
      {
        "threshold": 12,
        "points": 68
      },
      {
        "threshold": 13,
        "points": 71
      },
      {
        "threshold": 14,
        "points": 73
      },
      {
        "threshold": 15,
        "points": 75
      },
      {
        "threshold": 16,
        "points": 76
      },
      {
        "threshold": 17,
        "points": 78
      },
      {
        "threshold": 18,
        "points": 80
      },
      {
        "threshold": 19,
        "points": 81
      },
      {
        "threshold": 20,
        "points": 82
      },
      {
        "threshold": 21,
        "points": 83
      },
      {
        "threshold": 22,
        "points": 84
      },
      {
        "threshold": 23,
        "points": 86
      },
      {
        "threshold": 24,
        "points": 87
      },
      {
        "threshold": 25,
        "points": 88
      },
      {
        "threshold": 26,
        "points": 89
      },
      {
        "threshold": 29,
        "points": 90
      },
      {
        "threshold": 30,
        "points": 91
      },
      {
        "threshold": 31,
        "points": 92
      },
      {
        "threshold": 33,
        "points": 93
      },
      {
        "threshold": 34,
        "points": 94
      },
      {
        "threshold": 35,
        "points": 95
      },
      {
        "threshold": 37,
        "points": 96
      },
      {
        "threshold": 38,
        "points": 97
      },
      {
        "threshold": 40,
        "points": 98
      },
      {
        "threshold": 43,
        "points": 99
      },
      {
        "threshold": 46,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 118,
        "points": 100
      },
      {
        "threshold": 122,
        "points": 99
      },
      {
        "threshold": 123,
        "points": 98
      },
      {
        "threshold": 126,
        "points": 97
      },
      {
        "threshold": 128,
        "points": 96
      },
      {
        "threshold": 129,
        "points": 95
      },
      {
        "threshold": 131,
        "points": 94
      },
      {
        "threshold": 133,
        "points": 93
      },
      {
        "threshold": 135,
        "points": 92
      },
      {
        "threshold": 136,
        "points": 91
      },
      {
        "threshold": 137,
        "points": 90
      },
      {
        "threshold": 139,
        "points": 89
      },
      {
        "threshold": 140,
        "points": 88
      },
      {
        "threshold": 141,
        "points": 87
      },
      {
        "threshold": 142,
        "points": 86
      },
      {
        "threshold": 143,
        "points": 85
      },
      {
        "threshold": 144,
        "points": 84
      },
      {
        "threshold": 146,
        "points": 83
      },
      {
        "threshold": 147,
        "points": 82
      },
      {
        "threshold": 148,
        "points": 81
      },
      {
        "threshold": 149,
        "points": 80
      },
      {
        "threshold": 150,
        "points": 79
      },
      {
        "threshold": 151,
        "points": 78
      },
      {
        "threshold": 153,
        "points": 77
      },
      {
        "threshold": 155,
        "points": 76
      },
      {
        "threshold": 156,
        "points": 75
      },
      {
        "threshold": 157,
        "points": 74
      },
      {
        "threshold": 158,
        "points": 73
      },
      {
        "threshold": 160,
        "points": 72
      },
      {
        "threshold": 162,
        "points": 71
      },
      {
        "threshold": 163,
        "points": 70
      },
      {
        "threshold": 165,
        "points": 69
      },
      {
        "threshold": 167,
        "points": 68
      },
      {
        "threshold": 168,
        "points": 67
      },
      {
        "threshold": 170,
        "points": 66
      },
      {
        "threshold": 173,
        "points": 65
      },
      {
        "threshold": 175,
        "points": 64
      },
      {
        "threshold": 177,
        "points": 63
      },
      {
        "threshold": 179,
        "points": 62
      },
      {
        "threshold": 184,
        "points": 61
      },
      {
        "threshold": 192,
        "points": 60
      },
      {
        "threshold": 193,
        "points": 59
      },
      {
        "threshold": 194,
        "points": 58
      },
      {
        "threshold": 195,
        "points": 57
      },
      {
        "threshold": 196,
        "points": 56
      },
      {
        "threshold": 197,
        "points": 55
      },
      {
        "threshold": 198,
        "points": 54
      },
      {
        "threshold": 199,
        "points": 53
      },
      {
        "threshold": 200,
        "points": 52
      },
      {
        "threshold": 201,
        "points": 51
      },
      {
        "threshold": 202,
        "points": 50
      },
      {
        "threshold": 203,
        "points": 49
      },
      {
        "threshold": 204,
        "points": 48
      },
      {
        "threshold": 205,
        "points": 47
      },
      {
        "threshold": 206,
        "points": 46
      },
      {
        "threshold": 207,
        "points": 45
      },
      {
        "threshold": 208,
        "points": 44
      },
      {
        "threshold": 209,
        "points": 43
      },
      {
        "threshold": 210,
        "points": 42
      },
      {
        "threshold": 211,
        "points": 41
      },
      {
        "threshold": 212,
        "points": 40
      },
      {
        "threshold": 213,
        "points": 39
      },
      {
        "threshold": 214,
        "points": 38
      },
      {
        "threshold": 215,
        "points": 37
      },
      {
        "threshold": 216,
        "points": 36
      },
      {
        "threshold": 217,
        "points": 35
      },
      {
        "threshold": 218,
        "points": 34
      },
      {
        "threshold": 219,
        "points": 33
      },
      {
        "threshold": 220,
        "points": 32
      },
      {
        "threshold": 221,
        "points": 31
      },
      {
        "threshold": 222,
        "points": 30
      },
      {
        "threshold": 223,
        "points": 29
      },
      {
        "threshold": 224,
        "points": 28
      },
      {
        "threshold": 225,
        "points": 27
      },
      {
        "threshold": 226,
        "points": 26
      },
      {
        "threshold": 227,
        "points": 25
      },
      {
        "threshold": 228,
        "points": 24
      },
      {
        "threshold": 229,
        "points": 23
      },
      {
        "threshold": 230,
        "points": 22
      },
      {
        "threshold": 231,
        "points": 21
      },
      {
        "threshold": 232,
        "points": 20
      },
      {
        "threshold": 233,
        "points": 19
      },
      {
        "threshold": 234,
        "points": 18
      },
      {
        "threshold": 235,
        "points": 17
      },
      {
        "threshold": 236,
        "points": 16
      },
      {
        "threshold": 237,
        "points": 15
      },
      {
        "threshold": 238,
        "points": 14
      },
      {
        "threshold": 239,
        "points": 13
      },
      {
        "threshold": 240,
        "points": 12
      },
      {
        "threshold": 241,
        "points": 11
      },
      {
        "threshold": 242,
        "points": 10
      },
      {
        "threshold": 243,
        "points": 9
      },
      {
        "threshold": 244,
        "points": 8
      },
      {
        "threshold": 245,
        "points": 7
      },
      {
        "threshold": 246,
        "points": 6
      },
      {
        "threshold": 247,
        "points": 5
      },
      {
        "threshold": 248,
        "points": 4
      },
      {
        "threshold": 249,
        "points": 3
      },
      {
        "threshold": 250,
        "points": 2
      },
      {
        "threshold": 251,
        "points": 1
      },
      {
        "threshold": 252,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 928,
        "points": 100
      },
      {
        "threshold": 955,
        "points": 99
      },
      {
        "threshold": 982,
        "points": 98
      },
      {
        "threshold": 1004,
        "points": 97
      },
      {
        "threshold": 1018,
        "points": 96
      },
      {
        "threshold": 1034,
        "points": 95
      },
      {
        "threshold": 1047,
        "points": 94
      },
      {
        "threshold": 1065,
        "points": 93
      },
      {
        "threshold": 1077,
        "points": 92
      },
      {
        "threshold": 1087,
        "points": 91
      },
      {
        "threshold": 1097,
        "points": 90
      },
      {
        "threshold": 1105,
        "points": 89
      },
      {
        "threshold": 1116,
        "points": 88
      },
      {
        "threshold": 1125,
        "points": 87
      },
      {
        "threshold": 1133,
        "points": 86
      },
      {
        "threshold": 1140,
        "points": 85
      },
      {
        "threshold": 1147,
        "points": 84
      },
      {
        "threshold": 1157,
        "points": 83
      },
      {
        "threshold": 1167,
        "points": 82
      },
      {
        "threshold": 1176,
        "points": 81
      },
      {
        "threshold": 1185,
        "points": 80
      },
      {
        "threshold": 1191,
        "points": 79
      },
      {
        "threshold": 1199,
        "points": 78
      },
      {
        "threshold": 1207,
        "points": 77
      },
      {
        "threshold": 1214,
        "points": 76
      },
      {
        "threshold": 1222,
        "points": 75
      },
      {
        "threshold": 1231,
        "points": 74
      },
      {
        "threshold": 1241,
        "points": 73
      },
      {
        "threshold": 1246,
        "points": 72
      },
      {
        "threshold": 1254,
        "points": 71
      },
      {
        "threshold": 1260,
        "points": 70
      },
      {
        "threshold": 1261,
        "points": 69
      },
      {
        "threshold": 1279,
        "points": 68
      },
      {
        "threshold": 1295,
        "points": 67
      },
      {
        "threshold": 1307,
        "points": 66
      },
      {
        "threshold": 1323,
        "points": 65
      },
      {
        "threshold": 1341,
        "points": 64
      },
      {
        "threshold": 1359,
        "points": 63
      },
      {
        "threshold": 1378,
        "points": 62
      },
      {
        "threshold": 1392,
        "points": 61
      },
      {
        "threshold": 1416,
        "points": 60
      },
      {
        "threshold": 1419,
        "points": 59
      },
      {
        "threshold": 1422,
        "points": 58
      },
      {
        "threshold": 1424,
        "points": 57
      },
      {
        "threshold": 1427,
        "points": 56
      },
      {
        "threshold": 1430,
        "points": 55
      },
      {
        "threshold": 1433,
        "points": 54
      },
      {
        "threshold": 1436,
        "points": 53
      },
      {
        "threshold": 1438,
        "points": 52
      },
      {
        "threshold": 1441,
        "points": 51
      },
      {
        "threshold": 1444,
        "points": 50
      },
      {
        "threshold": 1447,
        "points": 49
      },
      {
        "threshold": 1450,
        "points": 48
      },
      {
        "threshold": 1452,
        "points": 47
      },
      {
        "threshold": 1455,
        "points": 46
      },
      {
        "threshold": 1458,
        "points": 45
      },
      {
        "threshold": 1461,
        "points": 44
      },
      {
        "threshold": 1463,
        "points": 43
      },
      {
        "threshold": 1466,
        "points": 42
      },
      {
        "threshold": 1469,
        "points": 41
      },
      {
        "threshold": 1472,
        "points": 40
      },
      {
        "threshold": 1475,
        "points": 39
      },
      {
        "threshold": 1477,
        "points": 38
      },
      {
        "threshold": 1480,
        "points": 37
      },
      {
        "threshold": 1483,
        "points": 36
      },
      {
        "threshold": 1486,
        "points": 35
      },
      {
        "threshold": 1489,
        "points": 34
      },
      {
        "threshold": 1491,
        "points": 33
      },
      {
        "threshold": 1494,
        "points": 32
      },
      {
        "threshold": 1497,
        "points": 31
      },
      {
        "threshold": 1500,
        "points": 30
      },
      {
        "threshold": 1503,
        "points": 29
      },
      {
        "threshold": 1505,
        "points": 28
      },
      {
        "threshold": 1508,
        "points": 27
      },
      {
        "threshold": 1511,
        "points": 26
      },
      {
        "threshold": 1514,
        "points": 25
      },
      {
        "threshold": 1517,
        "points": 24
      },
      {
        "threshold": 1519,
        "points": 23
      },
      {
        "threshold": 1522,
        "points": 22
      },
      {
        "threshold": 1525,
        "points": 21
      },
      {
        "threshold": 1528,
        "points": 20
      },
      {
        "threshold": 1531,
        "points": 19
      },
      {
        "threshold": 1533,
        "points": 18
      },
      {
        "threshold": 1536,
        "points": 17
      },
      {
        "threshold": 1539,
        "points": 16
      },
      {
        "threshold": 1542,
        "points": 15
      },
      {
        "threshold": 1545,
        "points": 14
      },
      {
        "threshold": 1547,
        "points": 13
      },
      {
        "threshold": 1550,
        "points": 12
      },
      {
        "threshold": 1553,
        "points": 11
      },
      {
        "threshold": 1556,
        "points": 10
      },
      {
        "threshold": 1558,
        "points": 9
      },
      {
        "threshold": 1561,
        "points": 8
      },
      {
        "threshold": 1564,
        "points": 7
      },
      {
        "threshold": 1567,
        "points": 6
      },
      {
        "threshold": 1570,
        "points": 5
      },
      {
        "threshold": 1572,
        "points": 4
      },
      {
        "threshold": 1575,
        "points": 3
      },
      {
        "threshold": 1578,
        "points": 2
      },
      {
        "threshold": 1581,
        "points": 1
      },
      {
        "threshold": 1584,
        "points": 0
      }
    ]
  },
  "female|57-61": {
    "deadlift": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 70,
        "points": 10
      },
      {
        "threshold": 80,
        "points": 20
      },
      {
        "threshold": 90,
        "points": 30
      },
      {
        "threshold": 100,
        "points": 40
      },
      {
        "threshold": 110,
        "points": 50
      },
      {
        "threshold": 120,
        "points": 60
      },
      {
        "threshold": 130,
        "points": 71
      },
      {
        "threshold": 140,
        "points": 80
      },
      {
        "threshold": 150,
        "points": 90
      },
      {
        "threshold": 160,
        "points": 99
      },
      {
        "threshold": 170,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 11,
        "points": 67
      },
      {
        "threshold": 12,
        "points": 77
      },
      {
        "threshold": 13,
        "points": 84
      },
      {
        "threshold": 14,
        "points": 89
      },
      {
        "threshold": 15,
        "points": 90
      },
      {
        "threshold": 16,
        "points": 91
      },
      {
        "threshold": 17,
        "points": 92
      },
      {
        "threshold": 18,
        "points": 94
      },
      {
        "threshold": 19,
        "points": 95
      },
      {
        "threshold": 20,
        "points": 96
      },
      {
        "threshold": 21,
        "points": 97
      },
      {
        "threshold": 22,
        "points": 98
      },
      {
        "threshold": 23,
        "points": 99
      },
      {
        "threshold": 24,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 146,
        "points": 100
      },
      {
        "threshold": 148,
        "points": 99
      },
      {
        "threshold": 154,
        "points": 98
      },
      {
        "threshold": 159,
        "points": 97
      },
      {
        "threshold": 161,
        "points": 96
      },
      {
        "threshold": 164,
        "points": 95
      },
      {
        "threshold": 165,
        "points": 94
      },
      {
        "threshold": 166,
        "points": 93
      },
      {
        "threshold": 168,
        "points": 92
      },
      {
        "threshold": 172,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 90
      },
      {
        "threshold": 175,
        "points": 89
      },
      {
        "threshold": 177,
        "points": 88
      },
      {
        "threshold": 178,
        "points": 87
      },
      {
        "threshold": 179,
        "points": 86
      },
      {
        "threshold": 180,
        "points": 85
      },
      {
        "threshold": 181,
        "points": 84
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 183,
        "points": 82
      },
      {
        "threshold": 184,
        "points": 81
      },
      {
        "threshold": 187,
        "points": 80
      },
      {
        "threshold": 188,
        "points": 79
      },
      {
        "threshold": 189,
        "points": 78
      },
      {
        "threshold": 191,
        "points": 77
      },
      {
        "threshold": 197,
        "points": 76
      },
      {
        "threshold": 201,
        "points": 75
      },
      {
        "threshold": 205,
        "points": 74
      },
      {
        "threshold": 212,
        "points": 73
      },
      {
        "threshold": 214,
        "points": 72
      },
      {
        "threshold": 215,
        "points": 71
      },
      {
        "threshold": 216,
        "points": 70
      },
      {
        "threshold": 220,
        "points": 69
      },
      {
        "threshold": 221,
        "points": 68
      },
      {
        "threshold": 223,
        "points": 67
      },
      {
        "threshold": 226,
        "points": 66
      },
      {
        "threshold": 234,
        "points": 65
      },
      {
        "threshold": 240,
        "points": 64
      },
      {
        "threshold": 248,
        "points": 63
      },
      {
        "threshold": 256,
        "points": 62
      },
      {
        "threshold": 261,
        "points": 61
      },
      {
        "threshold": 288,
        "points": 60
      },
      {
        "threshold": 289,
        "points": 59
      },
      {
        "threshold": 290,
        "points": 58
      },
      {
        "threshold": 291,
        "points": 57
      },
      {
        "threshold": 292,
        "points": 56
      },
      {
        "threshold": 293,
        "points": 55
      },
      {
        "threshold": 294,
        "points": 54
      },
      {
        "threshold": 295,
        "points": 53
      },
      {
        "threshold": 296,
        "points": 52
      },
      {
        "threshold": 297,
        "points": 51
      },
      {
        "threshold": 298,
        "points": 50
      },
      {
        "threshold": 299,
        "points": 49
      },
      {
        "threshold": 300,
        "points": 48
      },
      {
        "threshold": 301,
        "points": 47
      },
      {
        "threshold": 302,
        "points": 46
      },
      {
        "threshold": 303,
        "points": 45
      },
      {
        "threshold": 304,
        "points": 44
      },
      {
        "threshold": 305,
        "points": 43
      },
      {
        "threshold": 306,
        "points": 42
      },
      {
        "threshold": 307,
        "points": 41
      },
      {
        "threshold": 308,
        "points": 40
      },
      {
        "threshold": 309,
        "points": 39
      },
      {
        "threshold": 310,
        "points": 38
      },
      {
        "threshold": 311,
        "points": 37
      },
      {
        "threshold": 312,
        "points": 36
      },
      {
        "threshold": 313,
        "points": 35
      },
      {
        "threshold": 314,
        "points": 34
      },
      {
        "threshold": 315,
        "points": 33
      },
      {
        "threshold": 316,
        "points": 32
      },
      {
        "threshold": 317,
        "points": 31
      },
      {
        "threshold": 318,
        "points": 30
      },
      {
        "threshold": 319,
        "points": 29
      },
      {
        "threshold": 320,
        "points": 28
      },
      {
        "threshold": 321,
        "points": 27
      },
      {
        "threshold": 322,
        "points": 26
      },
      {
        "threshold": 323,
        "points": 25
      },
      {
        "threshold": 324,
        "points": 24
      },
      {
        "threshold": 325,
        "points": 23
      },
      {
        "threshold": 326,
        "points": 22
      },
      {
        "threshold": 327,
        "points": 21
      },
      {
        "threshold": 328,
        "points": 20
      },
      {
        "threshold": 329,
        "points": 19
      },
      {
        "threshold": 330,
        "points": 18
      },
      {
        "threshold": 331,
        "points": 17
      },
      {
        "threshold": 332,
        "points": 16
      },
      {
        "threshold": 333,
        "points": 15
      },
      {
        "threshold": 334,
        "points": 14
      },
      {
        "threshold": 335,
        "points": 13
      },
      {
        "threshold": 336,
        "points": 12
      },
      {
        "threshold": 337,
        "points": 11
      },
      {
        "threshold": 338,
        "points": 10
      },
      {
        "threshold": 339,
        "points": 9
      },
      {
        "threshold": 340,
        "points": 8
      },
      {
        "threshold": 341,
        "points": 7
      },
      {
        "threshold": 342,
        "points": 6
      },
      {
        "threshold": 343,
        "points": 5
      },
      {
        "threshold": 344,
        "points": 4
      },
      {
        "threshold": 345,
        "points": 3
      },
      {
        "threshold": 346,
        "points": 2
      },
      {
        "threshold": 347,
        "points": 1
      },
      {
        "threshold": 348,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1038,
        "points": 100
      },
      {
        "threshold": 1067,
        "points": 99
      },
      {
        "threshold": 1076,
        "points": 98
      },
      {
        "threshold": 1080,
        "points": 97
      },
      {
        "threshold": 1105,
        "points": 96
      },
      {
        "threshold": 1111,
        "points": 95
      },
      {
        "threshold": 1116,
        "points": 94
      },
      {
        "threshold": 1126,
        "points": 93
      },
      {
        "threshold": 1128,
        "points": 92
      },
      {
        "threshold": 1136,
        "points": 91
      },
      {
        "threshold": 1139,
        "points": 90
      },
      {
        "threshold": 1144,
        "points": 89
      },
      {
        "threshold": 1154,
        "points": 88
      },
      {
        "threshold": 1169,
        "points": 87
      },
      {
        "threshold": 1181,
        "points": 86
      },
      {
        "threshold": 1185,
        "points": 85
      },
      {
        "threshold": 1198,
        "points": 84
      },
      {
        "threshold": 1202,
        "points": 83
      },
      {
        "threshold": 1207,
        "points": 82
      },
      {
        "threshold": 1217,
        "points": 81
      },
      {
        "threshold": 1222,
        "points": 80
      },
      {
        "threshold": 1231,
        "points": 79
      },
      {
        "threshold": 1238,
        "points": 78
      },
      {
        "threshold": 1243,
        "points": 77
      },
      {
        "threshold": 1244,
        "points": 76
      },
      {
        "threshold": 1250,
        "points": 74
      },
      {
        "threshold": 1263,
        "points": 73
      },
      {
        "threshold": 1275,
        "points": 72
      },
      {
        "threshold": 1292,
        "points": 71
      },
      {
        "threshold": 1300,
        "points": 70
      },
      {
        "threshold": 1303,
        "points": 69
      },
      {
        "threshold": 1319,
        "points": 68
      },
      {
        "threshold": 1329,
        "points": 67
      },
      {
        "threshold": 1343,
        "points": 66
      },
      {
        "threshold": 1353,
        "points": 65
      },
      {
        "threshold": 1363,
        "points": 64
      },
      {
        "threshold": 1381,
        "points": 63
      },
      {
        "threshold": 1402,
        "points": 62
      },
      {
        "threshold": 1445,
        "points": 61
      },
      {
        "threshold": 1488,
        "points": 60
      },
      {
        "threshold": 1491,
        "points": 59
      },
      {
        "threshold": 1494,
        "points": 58
      },
      {
        "threshold": 1497,
        "points": 57
      },
      {
        "threshold": 1500,
        "points": 56
      },
      {
        "threshold": 1503,
        "points": 55
      },
      {
        "threshold": 1505,
        "points": 54
      },
      {
        "threshold": 1508,
        "points": 53
      },
      {
        "threshold": 1511,
        "points": 52
      },
      {
        "threshold": 1514,
        "points": 51
      },
      {
        "threshold": 1517,
        "points": 50
      },
      {
        "threshold": 1520,
        "points": 49
      },
      {
        "threshold": 1523,
        "points": 48
      },
      {
        "threshold": 1526,
        "points": 47
      },
      {
        "threshold": 1529,
        "points": 46
      },
      {
        "threshold": 1532,
        "points": 45
      },
      {
        "threshold": 1535,
        "points": 44
      },
      {
        "threshold": 1537,
        "points": 43
      },
      {
        "threshold": 1540,
        "points": 42
      },
      {
        "threshold": 1543,
        "points": 41
      },
      {
        "threshold": 1546,
        "points": 40
      },
      {
        "threshold": 1549,
        "points": 39
      },
      {
        "threshold": 1552,
        "points": 38
      },
      {
        "threshold": 1555,
        "points": 37
      },
      {
        "threshold": 1558,
        "points": 36
      },
      {
        "threshold": 1561,
        "points": 35
      },
      {
        "threshold": 1564,
        "points": 34
      },
      {
        "threshold": 1567,
        "points": 33
      },
      {
        "threshold": 1569,
        "points": 32
      },
      {
        "threshold": 1572,
        "points": 31
      },
      {
        "threshold": 1575,
        "points": 30
      },
      {
        "threshold": 1578,
        "points": 29
      },
      {
        "threshold": 1581,
        "points": 28
      },
      {
        "threshold": 1584,
        "points": 27
      },
      {
        "threshold": 1587,
        "points": 26
      },
      {
        "threshold": 1590,
        "points": 25
      },
      {
        "threshold": 1593,
        "points": 24
      },
      {
        "threshold": 1596,
        "points": 23
      },
      {
        "threshold": 1599,
        "points": 22
      },
      {
        "threshold": 1601,
        "points": 21
      },
      {
        "threshold": 1604,
        "points": 20
      },
      {
        "threshold": 1607,
        "points": 19
      },
      {
        "threshold": 1610,
        "points": 18
      },
      {
        "threshold": 1613,
        "points": 17
      },
      {
        "threshold": 1616,
        "points": 16
      },
      {
        "threshold": 1619,
        "points": 15
      },
      {
        "threshold": 1622,
        "points": 14
      },
      {
        "threshold": 1625,
        "points": 13
      },
      {
        "threshold": 1628,
        "points": 12
      },
      {
        "threshold": 1631,
        "points": 11
      },
      {
        "threshold": 1633,
        "points": 10
      },
      {
        "threshold": 1636,
        "points": 9
      },
      {
        "threshold": 1639,
        "points": 8
      },
      {
        "threshold": 1642,
        "points": 7
      },
      {
        "threshold": 1645,
        "points": 6
      },
      {
        "threshold": 1648,
        "points": 5
      },
      {
        "threshold": 1651,
        "points": 4
      },
      {
        "threshold": 1654,
        "points": 3
      },
      {
        "threshold": 1657,
        "points": 2
      },
      {
        "threshold": 1660,
        "points": 1
      },
      {
        "threshold": 1663,
        "points": 0
      }
    ]
  },
  "male|62-plus": {
    "deadlift": [
      {
        "threshold": 80,
        "points": 0
      },
      {
        "threshold": 90,
        "points": 10
      },
      {
        "threshold": 100,
        "points": 20
      },
      {
        "threshold": 110,
        "points": 30
      },
      {
        "threshold": 120,
        "points": 40
      },
      {
        "threshold": 130,
        "points": 50
      },
      {
        "threshold": 140,
        "points": 60
      },
      {
        "threshold": 150,
        "points": 72
      },
      {
        "threshold": 160,
        "points": 82
      },
      {
        "threshold": 170,
        "points": 92
      },
      {
        "threshold": 180,
        "points": 93
      },
      {
        "threshold": 190,
        "points": 94
      },
      {
        "threshold": 200,
        "points": 95
      },
      {
        "threshold": 210,
        "points": 98
      },
      {
        "threshold": 220,
        "points": 99
      },
      {
        "threshold": 230,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 11,
        "points": 68
      },
      {
        "threshold": 12,
        "points": 71
      },
      {
        "threshold": 13,
        "points": 74
      },
      {
        "threshold": 14,
        "points": 76
      },
      {
        "threshold": 15,
        "points": 77
      },
      {
        "threshold": 16,
        "points": 79
      },
      {
        "threshold": 17,
        "points": 80
      },
      {
        "threshold": 18,
        "points": 81
      },
      {
        "threshold": 19,
        "points": 82
      },
      {
        "threshold": 20,
        "points": 83
      },
      {
        "threshold": 21,
        "points": 84
      },
      {
        "threshold": 22,
        "points": 85
      },
      {
        "threshold": 23,
        "points": 87
      },
      {
        "threshold": 24,
        "points": 89
      },
      {
        "threshold": 26,
        "points": 90
      },
      {
        "threshold": 29,
        "points": 91
      },
      {
        "threshold": 30,
        "points": 92
      },
      {
        "threshold": 31,
        "points": 93
      },
      {
        "threshold": 33,
        "points": 94
      },
      {
        "threshold": 34,
        "points": 95
      },
      {
        "threshold": 35,
        "points": 96
      },
      {
        "threshold": 37,
        "points": 97
      },
      {
        "threshold": 39,
        "points": 98
      },
      {
        "threshold": 41,
        "points": 99
      },
      {
        "threshold": 43,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 129,
        "points": 100
      },
      {
        "threshold": 132,
        "points": 99
      },
      {
        "threshold": 133,
        "points": 97
      },
      {
        "threshold": 134,
        "points": 95
      },
      {
        "threshold": 135,
        "points": 94
      },
      {
        "threshold": 136,
        "points": 93
      },
      {
        "threshold": 137,
        "points": 89
      },
      {
        "threshold": 138,
        "points": 88
      },
      {
        "threshold": 139,
        "points": 87
      },
      {
        "threshold": 140,
        "points": 86
      },
      {
        "threshold": 141,
        "points": 85
      },
      {
        "threshold": 142,
        "points": 84
      },
      {
        "threshold": 143,
        "points": 83
      },
      {
        "threshold": 144,
        "points": 82
      },
      {
        "threshold": 147,
        "points": 81
      },
      {
        "threshold": 152,
        "points": 80
      },
      {
        "threshold": 153,
        "points": 79
      },
      {
        "threshold": 155,
        "points": 78
      },
      {
        "threshold": 156,
        "points": 77
      },
      {
        "threshold": 158,
        "points": 76
      },
      {
        "threshold": 161,
        "points": 75
      },
      {
        "threshold": 163,
        "points": 74
      },
      {
        "threshold": 164,
        "points": 73
      },
      {
        "threshold": 166,
        "points": 72
      },
      {
        "threshold": 167,
        "points": 71
      },
      {
        "threshold": 169,
        "points": 70
      },
      {
        "threshold": 172,
        "points": 69
      },
      {
        "threshold": 176,
        "points": 68
      },
      {
        "threshold": 177,
        "points": 67
      },
      {
        "threshold": 180,
        "points": 66
      },
      {
        "threshold": 183,
        "points": 65
      },
      {
        "threshold": 189,
        "points": 64
      },
      {
        "threshold": 191,
        "points": 63
      },
      {
        "threshold": 192,
        "points": 62
      },
      {
        "threshold": 194,
        "points": 61
      },
      {
        "threshold": 196,
        "points": 60
      },
      {
        "threshold": 197,
        "points": 59
      },
      {
        "threshold": 198,
        "points": 58
      },
      {
        "threshold": 199,
        "points": 57
      },
      {
        "threshold": 200,
        "points": 56
      },
      {
        "threshold": 201,
        "points": 55
      },
      {
        "threshold": 202,
        "points": 54
      },
      {
        "threshold": 203,
        "points": 53
      },
      {
        "threshold": 204,
        "points": 52
      },
      {
        "threshold": 205,
        "points": 51
      },
      {
        "threshold": 206,
        "points": 50
      },
      {
        "threshold": 207,
        "points": 49
      },
      {
        "threshold": 208,
        "points": 48
      },
      {
        "threshold": 209,
        "points": 47
      },
      {
        "threshold": 210,
        "points": 46
      },
      {
        "threshold": 211,
        "points": 45
      },
      {
        "threshold": 212,
        "points": 44
      },
      {
        "threshold": 213,
        "points": 43
      },
      {
        "threshold": 214,
        "points": 42
      },
      {
        "threshold": 215,
        "points": 41
      },
      {
        "threshold": 216,
        "points": 40
      },
      {
        "threshold": 217,
        "points": 39
      },
      {
        "threshold": 218,
        "points": 38
      },
      {
        "threshold": 219,
        "points": 37
      },
      {
        "threshold": 220,
        "points": 36
      },
      {
        "threshold": 221,
        "points": 35
      },
      {
        "threshold": 222,
        "points": 34
      },
      {
        "threshold": 223,
        "points": 33
      },
      {
        "threshold": 224,
        "points": 32
      },
      {
        "threshold": 225,
        "points": 31
      },
      {
        "threshold": 226,
        "points": 30
      },
      {
        "threshold": 227,
        "points": 29
      },
      {
        "threshold": 228,
        "points": 28
      },
      {
        "threshold": 229,
        "points": 27
      },
      {
        "threshold": 230,
        "points": 26
      },
      {
        "threshold": 231,
        "points": 25
      },
      {
        "threshold": 232,
        "points": 24
      },
      {
        "threshold": 233,
        "points": 23
      },
      {
        "threshold": 234,
        "points": 22
      },
      {
        "threshold": 235,
        "points": 21
      },
      {
        "threshold": 236,
        "points": 20
      },
      {
        "threshold": 237,
        "points": 19
      },
      {
        "threshold": 238,
        "points": 18
      },
      {
        "threshold": 239,
        "points": 17
      },
      {
        "threshold": 240,
        "points": 16
      },
      {
        "threshold": 241,
        "points": 15
      },
      {
        "threshold": 242,
        "points": 14
      },
      {
        "threshold": 243,
        "points": 13
      },
      {
        "threshold": 244,
        "points": 12
      },
      {
        "threshold": 245,
        "points": 11
      },
      {
        "threshold": 246,
        "points": 10
      },
      {
        "threshold": 247,
        "points": 9
      },
      {
        "threshold": 248,
        "points": 8
      },
      {
        "threshold": 249,
        "points": 7
      },
      {
        "threshold": 250,
        "points": 6
      },
      {
        "threshold": 251,
        "points": 5
      },
      {
        "threshold": 252,
        "points": 4
      },
      {
        "threshold": 253,
        "points": 3
      },
      {
        "threshold": 254,
        "points": 2
      },
      {
        "threshold": 255,
        "points": 1
      },
      {
        "threshold": 256,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 928,
        "points": 100
      },
      {
        "threshold": 955,
        "points": 99
      },
      {
        "threshold": 982,
        "points": 98
      },
      {
        "threshold": 1004,
        "points": 97
      },
      {
        "threshold": 1018,
        "points": 96
      },
      {
        "threshold": 1034,
        "points": 95
      },
      {
        "threshold": 1047,
        "points": 94
      },
      {
        "threshold": 1065,
        "points": 93
      },
      {
        "threshold": 1077,
        "points": 92
      },
      {
        "threshold": 1087,
        "points": 91
      },
      {
        "threshold": 1097,
        "points": 90
      },
      {
        "threshold": 1105,
        "points": 89
      },
      {
        "threshold": 1116,
        "points": 88
      },
      {
        "threshold": 1125,
        "points": 87
      },
      {
        "threshold": 1133,
        "points": 86
      },
      {
        "threshold": 1140,
        "points": 85
      },
      {
        "threshold": 1147,
        "points": 84
      },
      {
        "threshold": 1157,
        "points": 83
      },
      {
        "threshold": 1167,
        "points": 82
      },
      {
        "threshold": 1176,
        "points": 81
      },
      {
        "threshold": 1185,
        "points": 80
      },
      {
        "threshold": 1191,
        "points": 79
      },
      {
        "threshold": 1199,
        "points": 78
      },
      {
        "threshold": 1207,
        "points": 77
      },
      {
        "threshold": 1214,
        "points": 76
      },
      {
        "threshold": 1222,
        "points": 75
      },
      {
        "threshold": 1231,
        "points": 74
      },
      {
        "threshold": 1241,
        "points": 73
      },
      {
        "threshold": 1246,
        "points": 72
      },
      {
        "threshold": 1254,
        "points": 71
      },
      {
        "threshold": 1260,
        "points": 70
      },
      {
        "threshold": 1261,
        "points": 69
      },
      {
        "threshold": 1279,
        "points": 68
      },
      {
        "threshold": 1295,
        "points": 67
      },
      {
        "threshold": 1307,
        "points": 66
      },
      {
        "threshold": 1323,
        "points": 65
      },
      {
        "threshold": 1341,
        "points": 64
      },
      {
        "threshold": 1359,
        "points": 63
      },
      {
        "threshold": 1378,
        "points": 62
      },
      {
        "threshold": 1392,
        "points": 61
      },
      {
        "threshold": 1416,
        "points": 60
      },
      {
        "threshold": 1419,
        "points": 59
      },
      {
        "threshold": 1422,
        "points": 58
      },
      {
        "threshold": 1424,
        "points": 57
      },
      {
        "threshold": 1427,
        "points": 56
      },
      {
        "threshold": 1430,
        "points": 55
      },
      {
        "threshold": 1433,
        "points": 54
      },
      {
        "threshold": 1436,
        "points": 53
      },
      {
        "threshold": 1438,
        "points": 52
      },
      {
        "threshold": 1441,
        "points": 51
      },
      {
        "threshold": 1444,
        "points": 50
      },
      {
        "threshold": 1447,
        "points": 49
      },
      {
        "threshold": 1450,
        "points": 48
      },
      {
        "threshold": 1452,
        "points": 47
      },
      {
        "threshold": 1455,
        "points": 46
      },
      {
        "threshold": 1458,
        "points": 45
      },
      {
        "threshold": 1461,
        "points": 44
      },
      {
        "threshold": 1463,
        "points": 43
      },
      {
        "threshold": 1466,
        "points": 42
      },
      {
        "threshold": 1469,
        "points": 41
      },
      {
        "threshold": 1472,
        "points": 40
      },
      {
        "threshold": 1475,
        "points": 39
      },
      {
        "threshold": 1477,
        "points": 38
      },
      {
        "threshold": 1480,
        "points": 37
      },
      {
        "threshold": 1483,
        "points": 36
      },
      {
        "threshold": 1486,
        "points": 35
      },
      {
        "threshold": 1489,
        "points": 34
      },
      {
        "threshold": 1491,
        "points": 33
      },
      {
        "threshold": 1494,
        "points": 32
      },
      {
        "threshold": 1497,
        "points": 31
      },
      {
        "threshold": 1500,
        "points": 30
      },
      {
        "threshold": 1503,
        "points": 29
      },
      {
        "threshold": 1505,
        "points": 28
      },
      {
        "threshold": 1508,
        "points": 27
      },
      {
        "threshold": 1511,
        "points": 26
      },
      {
        "threshold": 1514,
        "points": 25
      },
      {
        "threshold": 1517,
        "points": 24
      },
      {
        "threshold": 1519,
        "points": 23
      },
      {
        "threshold": 1522,
        "points": 22
      },
      {
        "threshold": 1525,
        "points": 21
      },
      {
        "threshold": 1528,
        "points": 20
      },
      {
        "threshold": 1531,
        "points": 19
      },
      {
        "threshold": 1533,
        "points": 18
      },
      {
        "threshold": 1536,
        "points": 17
      },
      {
        "threshold": 1539,
        "points": 16
      },
      {
        "threshold": 1542,
        "points": 15
      },
      {
        "threshold": 1545,
        "points": 14
      },
      {
        "threshold": 1547,
        "points": 13
      },
      {
        "threshold": 1550,
        "points": 12
      },
      {
        "threshold": 1553,
        "points": 11
      },
      {
        "threshold": 1556,
        "points": 10
      },
      {
        "threshold": 1558,
        "points": 9
      },
      {
        "threshold": 1561,
        "points": 8
      },
      {
        "threshold": 1564,
        "points": 7
      },
      {
        "threshold": 1567,
        "points": 6
      },
      {
        "threshold": 1570,
        "points": 5
      },
      {
        "threshold": 1572,
        "points": 4
      },
      {
        "threshold": 1575,
        "points": 3
      },
      {
        "threshold": 1578,
        "points": 2
      },
      {
        "threshold": 1581,
        "points": 1
      },
      {
        "threshold": 1584,
        "points": 0
      }
    ]
  },
  "female|62-plus": {
    "deadlift": [
      {
        "threshold": 60,
        "points": 0
      },
      {
        "threshold": 70,
        "points": 10
      },
      {
        "threshold": 80,
        "points": 20
      },
      {
        "threshold": 90,
        "points": 30
      },
      {
        "threshold": 100,
        "points": 40
      },
      {
        "threshold": 110,
        "points": 50
      },
      {
        "threshold": 120,
        "points": 60
      },
      {
        "threshold": 130,
        "points": 72
      },
      {
        "threshold": 140,
        "points": 80
      },
      {
        "threshold": 150,
        "points": 90
      },
      {
        "threshold": 160,
        "points": 99
      },
      {
        "threshold": 170,
        "points": 100
      }
    ],
    "hrPushups": [
      {
        "threshold": 4,
        "points": 0
      },
      {
        "threshold": 5,
        "points": 10
      },
      {
        "threshold": 6,
        "points": 20
      },
      {
        "threshold": 7,
        "points": 30
      },
      {
        "threshold": 8,
        "points": 40
      },
      {
        "threshold": 9,
        "points": 50
      },
      {
        "threshold": 10,
        "points": 60
      },
      {
        "threshold": 11,
        "points": 69
      },
      {
        "threshold": 12,
        "points": 79
      },
      {
        "threshold": 13,
        "points": 86
      },
      {
        "threshold": 14,
        "points": 89
      },
      {
        "threshold": 15,
        "points": 90
      },
      {
        "threshold": 16,
        "points": 91
      },
      {
        "threshold": 17,
        "points": 92
      },
      {
        "threshold": 18,
        "points": 94
      },
      {
        "threshold": 19,
        "points": 95
      },
      {
        "threshold": 20,
        "points": 96
      },
      {
        "threshold": 21,
        "points": 97
      },
      {
        "threshold": 22,
        "points": 98
      },
      {
        "threshold": 23,
        "points": 99
      },
      {
        "threshold": 24,
        "points": 100
      }
    ],
    "sdc": [
      {
        "threshold": 146,
        "points": 100
      },
      {
        "threshold": 148,
        "points": 99
      },
      {
        "threshold": 154,
        "points": 98
      },
      {
        "threshold": 159,
        "points": 97
      },
      {
        "threshold": 161,
        "points": 96
      },
      {
        "threshold": 164,
        "points": 95
      },
      {
        "threshold": 165,
        "points": 94
      },
      {
        "threshold": 166,
        "points": 93
      },
      {
        "threshold": 168,
        "points": 92
      },
      {
        "threshold": 172,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 90
      },
      {
        "threshold": 175,
        "points": 89
      },
      {
        "threshold": 177,
        "points": 88
      },
      {
        "threshold": 178,
        "points": 87
      },
      {
        "threshold": 179,
        "points": 86
      },
      {
        "threshold": 180,
        "points": 85
      },
      {
        "threshold": 181,
        "points": 84
      },
      {
        "threshold": 182,
        "points": 83
      },
      {
        "threshold": 183,
        "points": 82
      },
      {
        "threshold": 184,
        "points": 81
      },
      {
        "threshold": 187,
        "points": 80
      },
      {
        "threshold": 188,
        "points": 79
      },
      {
        "threshold": 189,
        "points": 78
      },
      {
        "threshold": 191,
        "points": 77
      },
      {
        "threshold": 197,
        "points": 76
      },
      {
        "threshold": 201,
        "points": 75
      },
      {
        "threshold": 205,
        "points": 74
      },
      {
        "threshold": 212,
        "points": 73
      },
      {
        "threshold": 214,
        "points": 72
      },
      {
        "threshold": 215,
        "points": 71
      },
      {
        "threshold": 216,
        "points": 70
      },
      {
        "threshold": 220,
        "points": 69
      },
      {
        "threshold": 221,
        "points": 68
      },
      {
        "threshold": 223,
        "points": 67
      },
      {
        "threshold": 226,
        "points": 66
      },
      {
        "threshold": 234,
        "points": 65
      },
      {
        "threshold": 240,
        "points": 64
      },
      {
        "threshold": 248,
        "points": 63
      },
      {
        "threshold": 256,
        "points": 62
      },
      {
        "threshold": 261,
        "points": 61
      },
      {
        "threshold": 288,
        "points": 60
      },
      {
        "threshold": 289,
        "points": 59
      },
      {
        "threshold": 290,
        "points": 58
      },
      {
        "threshold": 291,
        "points": 57
      },
      {
        "threshold": 292,
        "points": 56
      },
      {
        "threshold": 293,
        "points": 55
      },
      {
        "threshold": 294,
        "points": 54
      },
      {
        "threshold": 295,
        "points": 53
      },
      {
        "threshold": 296,
        "points": 52
      },
      {
        "threshold": 297,
        "points": 51
      },
      {
        "threshold": 298,
        "points": 50
      },
      {
        "threshold": 299,
        "points": 49
      },
      {
        "threshold": 300,
        "points": 48
      },
      {
        "threshold": 301,
        "points": 47
      },
      {
        "threshold": 302,
        "points": 46
      },
      {
        "threshold": 303,
        "points": 45
      },
      {
        "threshold": 304,
        "points": 44
      },
      {
        "threshold": 305,
        "points": 43
      },
      {
        "threshold": 306,
        "points": 42
      },
      {
        "threshold": 307,
        "points": 41
      },
      {
        "threshold": 308,
        "points": 40
      },
      {
        "threshold": 309,
        "points": 39
      },
      {
        "threshold": 310,
        "points": 38
      },
      {
        "threshold": 311,
        "points": 37
      },
      {
        "threshold": 312,
        "points": 36
      },
      {
        "threshold": 313,
        "points": 35
      },
      {
        "threshold": 314,
        "points": 34
      },
      {
        "threshold": 315,
        "points": 33
      },
      {
        "threshold": 316,
        "points": 32
      },
      {
        "threshold": 317,
        "points": 31
      },
      {
        "threshold": 318,
        "points": 30
      },
      {
        "threshold": 319,
        "points": 29
      },
      {
        "threshold": 320,
        "points": 28
      },
      {
        "threshold": 321,
        "points": 27
      },
      {
        "threshold": 322,
        "points": 26
      },
      {
        "threshold": 323,
        "points": 25
      },
      {
        "threshold": 324,
        "points": 24
      },
      {
        "threshold": 325,
        "points": 23
      },
      {
        "threshold": 326,
        "points": 22
      },
      {
        "threshold": 327,
        "points": 21
      },
      {
        "threshold": 328,
        "points": 20
      },
      {
        "threshold": 329,
        "points": 19
      },
      {
        "threshold": 330,
        "points": 18
      },
      {
        "threshold": 331,
        "points": 17
      },
      {
        "threshold": 332,
        "points": 16
      },
      {
        "threshold": 333,
        "points": 15
      },
      {
        "threshold": 334,
        "points": 14
      },
      {
        "threshold": 335,
        "points": 13
      },
      {
        "threshold": 336,
        "points": 12
      },
      {
        "threshold": 337,
        "points": 11
      },
      {
        "threshold": 338,
        "points": 10
      },
      {
        "threshold": 339,
        "points": 9
      },
      {
        "threshold": 340,
        "points": 8
      },
      {
        "threshold": 341,
        "points": 7
      },
      {
        "threshold": 342,
        "points": 6
      },
      {
        "threshold": 343,
        "points": 5
      },
      {
        "threshold": 344,
        "points": 4
      },
      {
        "threshold": 345,
        "points": 3
      },
      {
        "threshold": 346,
        "points": 2
      },
      {
        "threshold": 347,
        "points": 1
      },
      {
        "threshold": 348,
        "points": 0
      }
    ],
    "plank": [
      {
        "threshold": 40,
        "points": 0
      },
      {
        "threshold": 41,
        "points": 2
      },
      {
        "threshold": 42,
        "points": 4
      },
      {
        "threshold": 43,
        "points": 6
      },
      {
        "threshold": 44,
        "points": 8
      },
      {
        "threshold": 45,
        "points": 10
      },
      {
        "threshold": 46,
        "points": 12
      },
      {
        "threshold": 47,
        "points": 14
      },
      {
        "threshold": 48,
        "points": 16
      },
      {
        "threshold": 49,
        "points": 18
      },
      {
        "threshold": 50,
        "points": 20
      },
      {
        "threshold": 51,
        "points": 22
      },
      {
        "threshold": 52,
        "points": 24
      },
      {
        "threshold": 53,
        "points": 26
      },
      {
        "threshold": 54,
        "points": 28
      },
      {
        "threshold": 55,
        "points": 30
      },
      {
        "threshold": 56,
        "points": 32
      },
      {
        "threshold": 57,
        "points": 34
      },
      {
        "threshold": 58,
        "points": 36
      },
      {
        "threshold": 59,
        "points": 38
      },
      {
        "threshold": 60,
        "points": 40
      },
      {
        "threshold": 61,
        "points": 42
      },
      {
        "threshold": 62,
        "points": 44
      },
      {
        "threshold": 63,
        "points": 46
      },
      {
        "threshold": 64,
        "points": 48
      },
      {
        "threshold": 65,
        "points": 50
      },
      {
        "threshold": 66,
        "points": 52
      },
      {
        "threshold": 67,
        "points": 54
      },
      {
        "threshold": 68,
        "points": 56
      },
      {
        "threshold": 69,
        "points": 58
      },
      {
        "threshold": 70,
        "points": 60
      },
      {
        "threshold": 73,
        "points": 61
      },
      {
        "threshold": 76,
        "points": 62
      },
      {
        "threshold": 80,
        "points": 63
      },
      {
        "threshold": 83,
        "points": 64
      },
      {
        "threshold": 86,
        "points": 65
      },
      {
        "threshold": 90,
        "points": 66
      },
      {
        "threshold": 93,
        "points": 67
      },
      {
        "threshold": 96,
        "points": 68
      },
      {
        "threshold": 99,
        "points": 69
      },
      {
        "threshold": 102,
        "points": 70
      },
      {
        "threshold": 106,
        "points": 71
      },
      {
        "threshold": 109,
        "points": 72
      },
      {
        "threshold": 112,
        "points": 73
      },
      {
        "threshold": 116,
        "points": 74
      },
      {
        "threshold": 119,
        "points": 75
      },
      {
        "threshold": 122,
        "points": 76
      },
      {
        "threshold": 125,
        "points": 77
      },
      {
        "threshold": 128,
        "points": 78
      },
      {
        "threshold": 132,
        "points": 79
      },
      {
        "threshold": 135,
        "points": 80
      },
      {
        "threshold": 138,
        "points": 81
      },
      {
        "threshold": 142,
        "points": 82
      },
      {
        "threshold": 145,
        "points": 83
      },
      {
        "threshold": 148,
        "points": 84
      },
      {
        "threshold": 151,
        "points": 85
      },
      {
        "threshold": 155,
        "points": 86
      },
      {
        "threshold": 158,
        "points": 87
      },
      {
        "threshold": 161,
        "points": 88
      },
      {
        "threshold": 164,
        "points": 89
      },
      {
        "threshold": 167,
        "points": 90
      },
      {
        "threshold": 171,
        "points": 91
      },
      {
        "threshold": 174,
        "points": 92
      },
      {
        "threshold": 177,
        "points": 93
      },
      {
        "threshold": 181,
        "points": 94
      },
      {
        "threshold": 184,
        "points": 95
      },
      {
        "threshold": 187,
        "points": 96
      },
      {
        "threshold": 190,
        "points": 97
      },
      {
        "threshold": 194,
        "points": 98
      },
      {
        "threshold": 197,
        "points": 99
      },
      {
        "threshold": 200,
        "points": 100
      }
    ],
    "run": [
      {
        "threshold": 1038,
        "points": 100
      },
      {
        "threshold": 1067,
        "points": 99
      },
      {
        "threshold": 1076,
        "points": 98
      },
      {
        "threshold": 1080,
        "points": 97
      },
      {
        "threshold": 1105,
        "points": 96
      },
      {
        "threshold": 1111,
        "points": 95
      },
      {
        "threshold": 1116,
        "points": 94
      },
      {
        "threshold": 1126,
        "points": 93
      },
      {
        "threshold": 1128,
        "points": 92
      },
      {
        "threshold": 1136,
        "points": 91
      },
      {
        "threshold": 1139,
        "points": 90
      },
      {
        "threshold": 1144,
        "points": 89
      },
      {
        "threshold": 1154,
        "points": 88
      },
      {
        "threshold": 1169,
        "points": 87
      },
      {
        "threshold": 1181,
        "points": 86
      },
      {
        "threshold": 1185,
        "points": 85
      },
      {
        "threshold": 1198,
        "points": 84
      },
      {
        "threshold": 1202,
        "points": 83
      },
      {
        "threshold": 1207,
        "points": 82
      },
      {
        "threshold": 1217,
        "points": 81
      },
      {
        "threshold": 1222,
        "points": 80
      },
      {
        "threshold": 1231,
        "points": 79
      },
      {
        "threshold": 1238,
        "points": 78
      },
      {
        "threshold": 1243,
        "points": 77
      },
      {
        "threshold": 1244,
        "points": 76
      },
      {
        "threshold": 1250,
        "points": 74
      },
      {
        "threshold": 1263,
        "points": 73
      },
      {
        "threshold": 1275,
        "points": 72
      },
      {
        "threshold": 1292,
        "points": 71
      },
      {
        "threshold": 1300,
        "points": 70
      },
      {
        "threshold": 1303,
        "points": 69
      },
      {
        "threshold": 1322,
        "points": 68
      },
      {
        "threshold": 1335,
        "points": 67
      },
      {
        "threshold": 1351,
        "points": 66
      },
      {
        "threshold": 1364,
        "points": 65
      },
      {
        "threshold": 1370,
        "points": 64
      },
      {
        "threshold": 1384,
        "points": 63
      },
      {
        "threshold": 1402,
        "points": 62
      },
      {
        "threshold": 1451,
        "points": 61
      },
      {
        "threshold": 1500,
        "points": 60
      },
      {
        "threshold": 1503,
        "points": 59
      },
      {
        "threshold": 1506,
        "points": 58
      },
      {
        "threshold": 1509,
        "points": 57
      },
      {
        "threshold": 1512,
        "points": 56
      },
      {
        "threshold": 1515,
        "points": 55
      },
      {
        "threshold": 1517,
        "points": 54
      },
      {
        "threshold": 1520,
        "points": 53
      },
      {
        "threshold": 1523,
        "points": 52
      },
      {
        "threshold": 1526,
        "points": 51
      },
      {
        "threshold": 1529,
        "points": 50
      },
      {
        "threshold": 1532,
        "points": 49
      },
      {
        "threshold": 1535,
        "points": 48
      },
      {
        "threshold": 1538,
        "points": 47
      },
      {
        "threshold": 1541,
        "points": 46
      },
      {
        "threshold": 1544,
        "points": 45
      },
      {
        "threshold": 1547,
        "points": 44
      },
      {
        "threshold": 1549,
        "points": 43
      },
      {
        "threshold": 1552,
        "points": 42
      },
      {
        "threshold": 1555,
        "points": 41
      },
      {
        "threshold": 1558,
        "points": 40
      },
      {
        "threshold": 1561,
        "points": 39
      },
      {
        "threshold": 1564,
        "points": 38
      },
      {
        "threshold": 1567,
        "points": 37
      },
      {
        "threshold": 1570,
        "points": 36
      },
      {
        "threshold": 1573,
        "points": 35
      },
      {
        "threshold": 1576,
        "points": 34
      },
      {
        "threshold": 1579,
        "points": 33
      },
      {
        "threshold": 1581,
        "points": 32
      },
      {
        "threshold": 1584,
        "points": 31
      },
      {
        "threshold": 1587,
        "points": 30
      },
      {
        "threshold": 1590,
        "points": 29
      },
      {
        "threshold": 1593,
        "points": 28
      },
      {
        "threshold": 1596,
        "points": 27
      },
      {
        "threshold": 1599,
        "points": 26
      },
      {
        "threshold": 1602,
        "points": 25
      },
      {
        "threshold": 1605,
        "points": 24
      },
      {
        "threshold": 1608,
        "points": 23
      },
      {
        "threshold": 1611,
        "points": 22
      },
      {
        "threshold": 1613,
        "points": 21
      },
      {
        "threshold": 1616,
        "points": 20
      },
      {
        "threshold": 1619,
        "points": 19
      },
      {
        "threshold": 1622,
        "points": 18
      },
      {
        "threshold": 1625,
        "points": 17
      },
      {
        "threshold": 1628,
        "points": 16
      },
      {
        "threshold": 1631,
        "points": 15
      },
      {
        "threshold": 1634,
        "points": 14
      },
      {
        "threshold": 1637,
        "points": 13
      },
      {
        "threshold": 1640,
        "points": 12
      },
      {
        "threshold": 1643,
        "points": 11
      },
      {
        "threshold": 1645,
        "points": 10
      },
      {
        "threshold": 1648,
        "points": 9
      },
      {
        "threshold": 1651,
        "points": 8
      },
      {
        "threshold": 1654,
        "points": 7
      },
      {
        "threshold": 1657,
        "points": 6
      },
      {
        "threshold": 1660,
        "points": 5
      },
      {
        "threshold": 1663,
        "points": 4
      },
      {
        "threshold": 1666,
        "points": 3
      },
      {
        "threshold": 1669,
        "points": 2
      },
      {
        "threshold": 1672,
        "points": 1
      },
      {
        "threshold": 1675,
        "points": 0
      }
    ]
  }
}
