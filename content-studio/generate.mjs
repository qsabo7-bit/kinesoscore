#!/usr/bin/env node
/**
 * Weekly external content pack — FREE local generator.
 *
 * Usage:
 *   npm run content:week
 *
 * Reads VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY from .env (optional).
 * Writes dated folder under content-studio/out/ with captions + posting guide.
 * PNGs: export from in-app Share Image (same premium card system).
 */

import fs from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildWeeklyCaptions } from '../src/lib/shareCaption.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outRoot = path.join(__dirname, 'out')

const BOARDS = [
  { key: 'mykinesoscore', label: 'myKinesoScore' },
  { key: 'running:5K', label: '5K' },
  { key: 'strength:Deadlift', label: 'Deadlift' },
]

function loadEnv() {
  const envPath = path.join(root, '.env')
  if (!fs.existsSync(envPath)) return
  const text = fs.readFileSync(envPath, 'utf8')
  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

async function fetchBoard(supabaseUrl, anonKey, boardKey, period) {
  const url = `${supabaseUrl}/rest/v1/rpc/get_public_leaderboard`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      p_board_key: boardKey,
      p_period: period,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`${boardKey}/${period}: ${res.status} ${body.slice(0, 180)}`)
  }
  return res.json()
}

function dateStamp(d = new Date()) {
  return d.toISOString().slice(0, 10)
}

function pickLeader(rows) {
  if (!Array.isArray(rows) || !rows.length) return null
  const sorted = [...rows].sort((a, b) => Number(a.rank) - Number(b.rank))
  return sorted[0] || null
}

loadEnv()

const supabaseUrl = process.env.VITE_SUPABASE_URL?.trim()
const anonKey = process.env.VITE_SUPABASE_ANON_KEY?.trim()

const day = dateStamp()
const outDir = path.join(outRoot, day)
await mkdir(outDir, { recursive: true })

const snapshot = {
  generatedAt: new Date().toISOString(),
  site: 'https://kinesoscore.com',
  boards: {},
  notes: [],
}

if (!supabaseUrl || !anonKey) {
  snapshot.notes.push(
    'Supabase env missing — wrote template captions only. Add VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY to .env for live board pulls.',
  )
} else {
  for (const board of BOARDS) {
    try {
      const [weekRows, allRows] = await Promise.all([
        fetchBoard(supabaseUrl, anonKey, board.key, 'this_week'),
        fetchBoard(supabaseUrl, anonKey, board.key, 'all_time'),
      ])
      snapshot.boards[board.key] = {
        label: board.label,
        thisWeekLeader: pickLeader(weekRows),
        allTimeLeader: pickLeader(allRows),
        thisWeekCount: Array.isArray(weekRows) ? weekRows.length : 0,
        allTimeCount: Array.isArray(allRows) ? allRows.length : 0,
      }
    } catch (err) {
      snapshot.notes.push(`${board.key}: ${err.message}`)
    }
  }
}

let rankSource = null
for (const board of BOARDS) {
  const entry = snapshot.boards[board.key]
  if (entry?.thisWeekLeader) {
    rankSource = {
      rank: entry.thisWeekLeader.rank,
      boardLabel: board.label,
      athleteName: entry.thisWeekLeader.leaderboard_name,
    }
    break
  }
}

let captions = buildWeeklyCaptions({
  rank: rankSource?.rank ?? null,
  boardLabel: rankSource?.boardLabel,
  athleteName: rankSource?.athleteName,
})

const founderScore = Number(process.env.CONTENT_STUDIO_SCORE)
if (Number.isFinite(founderScore)) {
  captions = buildWeeklyCaptions({
    fitnessScore: founderScore,
    strengthScore: Number(process.env.CONTENT_STUDIO_STRENGTH) || null,
    runningScore: Number(process.env.CONTENT_STUDIO_RUNNING) || null,
    rank: rankSource?.rank ?? null,
    boardLabel: rankSource?.boardLabel,
    athleteName: process.env.CONTENT_STUDIO_NAME || rankSource?.athleteName,
  })
  snapshot.founder = {
    fitnessScore: founderScore,
    strengthScore: Number(process.env.CONTENT_STUDIO_STRENGTH) || null,
    runningScore: Number(process.env.CONTENT_STUDIO_RUNNING) || null,
    name: process.env.CONTENT_STUDIO_NAME || null,
  }
}

await writeFile(
  path.join(outDir, '01-score-curiosity.txt'),
  `${captions.scoreCuriosity}\n`,
  'utf8',
)
await writeFile(
  path.join(outDir, '02-rank-energy.txt'),
  `${captions.rankEnergy}\n`,
  'utf8',
)
await writeFile(
  path.join(outDir, '03-badge-flex.txt'),
  `${captions.badgeFlex}\n`,
  'utf8',
)

const posting = `# KinesoScore weekly pack — ${day}

## Ritual (≤20 min)
1. Open the site, sign in → Dashboard / Scoring → **Share image**.
2. Export **Post 4:5** (optional Story 9:16) for your score or This Week rank.
3. Save PNGs into this folder as \`01-post.png\`, \`02-story.png\`, etc.
4. Schedule 1–2 posts (Meta Business Suite or native apps):
   - Mon: \`02-rank-energy.txt\`
   - Thu/Sat: \`01-score-curiosity.txt\`
5. Keep captions short. Never invent stats.

## Files
- \`01-score-curiosity.txt\`
- \`02-rank-energy.txt\`
- \`03-badge-flex.txt\`
- \`snapshot.json\` — public board leaders pulled today

## Brand rules
- Real numbers only
- Same card visual users get in-app
- Soft CTA: “What’s yours?”
- Link: https://kinesoscore.com

## Optional env for founder score captions
\`\`\`
CONTENT_STUDIO_SCORE=86
CONTENT_STUDIO_STRENGTH=78
CONTENT_STUDIO_RUNNING=94
CONTENT_STUDIO_NAME=YourLeaderboardName
\`\`\`
`

await writeFile(path.join(outDir, 'POSTING.md'), posting, 'utf8')
await writeFile(
  path.join(outDir, 'snapshot.json'),
  `${JSON.stringify(snapshot, null, 2)}\n`,
  'utf8',
)

console.log(`Content pack ready: ${path.relative(root, outDir)}`)
if (snapshot.notes.length) {
  console.log('Notes:')
  for (const note of snapshot.notes) console.log(`  - ${note}`)
}
