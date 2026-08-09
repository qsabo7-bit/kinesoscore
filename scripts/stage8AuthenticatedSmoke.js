#!/usr/bin/env node
/**
 * DEV ONLY — Stage 8 authenticated smoke harness.
 *
 * Exercises live Supabase with two temporary authenticated test users.
 * Does NOT modify schema, RLS, RPCs, migrations, or app runtime behavior.
 *
 * Required env (from .env or shell):
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 *   STAGE8_SMOKE_USER_A_EMAIL
 *   STAGE8_SMOKE_USER_A_PASSWORD
 *   STAGE8_SMOKE_USER_B_EMAIL
 *   STAGE8_SMOKE_USER_B_PASSWORD
 *
 * Run:
 *   npm run test:stage8-smoke
 *   # or: node --env-file=.env scripts/stage8AuthenticatedSmoke.js
 *
 * Cleanup: the script restores User A/B share/name/habit smoke data in `finally`.
 * You can also manually unshare + restore Leaderboard Names in Account Settings.
 */

import { createClient } from '@supabase/supabase-js'
import { randomBytes } from 'node:crypto'

const APPROVED_PUBLIC_KEYS = new Set(['rank', 'leaderboard_name', 'streak'])
const FORBIDDEN_PUBLIC_KEY_HINTS =
  /user_id|email|first_name|habit|checkin|source|share_id|^id$/i

function requiredEnv(name) {
  const value = String(process.env[name] || '').trim()
  if (!value) {
    throw new Error(`Missing required env: ${name}`)
  }
  return value
}

function utcToday() {
  return new Date().toISOString().slice(0, 10)
}

function makeClient(url, anonKey) {
  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}

function summarizeError(err) {
  if (!err) return null
  return {
    message: err.message || String(err),
    code: err.code || err.error?.code || null,
    details: err.details || null,
    hint: err.hint || null,
  }
}

function publicRowForReport(row) {
  if (!row || typeof row !== 'object') return row
  return {
    rank: row.rank,
    leaderboard_name: row.leaderboard_name,
    streak: row.streak,
  }
}

function findPublicEntry(rows, leaderboardName) {
  return (rows || []).find(
    (row) =>
      String(row?.leaderboard_name || '').toLowerCase() ===
      String(leaderboardName || '').toLowerCase(),
  )
}

function assertPublicShape(row) {
  const keys = Object.keys(row || {})
  const extra = keys.filter((k) => !APPROVED_PUBLIC_KEYS.has(k))
  const forbidden = keys.filter((k) => FORBIDDEN_PUBLIC_KEY_HINTS.test(k))
  const missing = [...APPROVED_PUBLIC_KEYS].filter((k) => !(k in (row || {})))
  return { keys, extra, forbidden, missing }
}

async function signIn(client, email, password, label) {
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) {
    throw new Error(`${label} sign-in failed: ${error.message}`)
  }
  const user = data?.user
  if (!user?.id) {
    throw new Error(`${label} sign-in returned no user id`)
  }
  return user
}

async function getLeaderboardName(client, userId) {
  const { data, error } = await client
    .from('leaderboard_profiles')
    .select('leaderboard_name')
    .eq('user_id', userId)
    .maybeSingle()
  if (error) throw error
  return data?.leaderboard_name ?? null
}

async function setLeaderboardName(client, userId, name) {
  const { error } = await client.from('leaderboard_profiles').upsert(
    {
      user_id: userId,
      leaderboard_name: name,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  )
  if (error) throw error
}

async function clearLeaderboardName(client, userId) {
  const { error } = await client
    .from('leaderboard_profiles')
    .delete()
    .eq('user_id', userId)
  if (error) throw error
}

async function restoreLeaderboardName(client, userId, priorName) {
  if (priorName) {
    await setLeaderboardName(client, userId, priorName)
  } else {
    await clearLeaderboardName(client, userId)
  }
}

async function setShare(client, isActive, asOf = utcToday()) {
  const { data, error } = await client.rpc('set_habit_streak_share', {
    p_is_active: Boolean(isActive),
    p_as_of: asOf,
  })
  return { data, error }
}

async function getPublicStreaks(client) {
  const { data, error } = await client.rpc('get_public_habit_streaks', {
    p_period: 'all_time',
  })
  return { data: data || [], error }
}

async function ensureSmokeHabit(client, userId, habitKey, habitName) {
  const { data: existing, error: readErr } = await client
    .from('habits')
    .select('id, habit_key, habit_name, is_active, sort_order')
    .eq('user_id', userId)
    .eq('habit_key', habitKey)
    .maybeSingle()
  if (readErr) throw readErr

  if (existing?.id) {
    if (!existing.is_active || existing.habit_name !== habitName) {
      const { data, error } = await client
        .from('habits')
        .update({
          is_active: true,
          habit_name: habitName,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .eq('user_id', userId)
        .select('id')
        .single()
      if (error) throw error
      return { habitId: data.id, created: false, reactivated: true }
    }
    return { habitId: existing.id, created: false, reactivated: false }
  }

  const { data: rows, error: listErr } = await client
    .from('habits')
    .select('sort_order')
    .eq('user_id', userId)
  if (listErr) throw listErr
  const nextOrder =
    (rows || []).reduce((max, row) => Math.max(max, Number(row.sort_order) || 0), -1) +
    1

  const { data, error } = await client
    .from('habits')
    .insert({
      user_id: userId,
      habit_key: habitKey,
      habit_name: habitName,
      sort_order: nextOrder,
      is_active: true,
    })
    .select('id')
    .single()
  if (error) throw error
  return { habitId: data.id, created: true, reactivated: false }
}

async function ensureTodayCheckin(client, userId, habitId, dateKey) {
  const { data: existing, error: readErr } = await client
    .from('habit_checkins')
    .select('id, completed')
    .eq('user_id', userId)
    .eq('habit_id', habitId)
    .eq('checkin_date', dateKey)
    .maybeSingle()
  if (readErr) throw readErr

  if (existing?.id) {
    if (!existing.completed) {
      const { error } = await client
        .from('habit_checkins')
        .update({ completed: true, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .eq('user_id', userId)
      if (error) throw error
      return { checkinId: existing.id, created: false, updated: true }
    }
    return { checkinId: existing.id, created: false, updated: false }
  }

  const { data, error } = await client
    .from('habit_checkins')
    .insert({
      user_id: userId,
      habit_id: habitId,
      checkin_date: dateKey,
      completed: true,
    })
    .select('id')
    .single()
  if (error) throw error
  return { checkinId: data.id, created: true, updated: false }
}

async function countPrivateHabitState(client, userId) {
  const [{ count: habits, error: hErr }, { count: checkins, error: cErr }] =
    await Promise.all([
      client
        .from('habits')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId),
      client
        .from('habit_checkins')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId),
    ])
  if (hErr) throw hErr
  if (cErr) throw cErr
  return { habits: habits ?? 0, checkins: checkins ?? 0 }
}

async function main() {
  const url = requiredEnv('VITE_SUPABASE_URL')
  const anonKey = requiredEnv('VITE_SUPABASE_ANON_KEY')
  const emailA = requiredEnv('STAGE8_SMOKE_USER_A_EMAIL')
  const passA = requiredEnv('STAGE8_SMOKE_USER_A_PASSWORD')
  const emailB = requiredEnv('STAGE8_SMOKE_USER_B_EMAIL')
  const passB = requiredEnv('STAGE8_SMOKE_USER_B_PASSWORD')

  if (emailA.toLowerCase() === emailB.toLowerCase()) {
    throw new Error('User A and User B must be different accounts')
  }

  const today = utcToday()
  const smokeSuffix = randomBytes(3).toString('hex')
  const smokeName = `S8SmokeA_${smokeSuffix}` // <= 24 chars
  // Custom key (not catalog) so cleanup never touches real Habit Tracker items.
  const smokeHabitKey = `s8_smoke_${smokeSuffix}`
  const smokeHabitName = `S8 smoke ${smokeSuffix}`

  const clientA = makeClient(url, anonKey)
  const clientB = makeClient(url, anonKey)

  /** @type {{ name: string, ok: boolean, detail: unknown }[]} */
  const results = []
  const record = (name, ok, detail) => {
    results.push({ name, ok, detail })
    const mark = ok ? 'PASS' : 'FAIL'
    console.log(`\n[${mark}] ${name}`)
    console.log(JSON.stringify(detail, null, 2))
  }

  let userA = null
  let userB = null
  let priorNameA = null
  let priorShareA = null
  let priorShareB = null
  let smokeHabitMeta = null
  let smokeCheckinMeta = null
  let bShareId = null

  try {
    console.log('Stage 8 authenticated smoke harness (dev-only)')
    console.log(`UTC today: ${today}`)
    console.log(`Temp Leaderboard Name for A: ${smokeName}`)

    userA = await signIn(clientA, emailA, passA, 'User A')
    userB = await signIn(clientB, emailB, passB, 'User B')
    console.log(`Signed in User A id: ${userA.id}`)
    console.log(`Signed in User B id: ${userB.id}`)

    priorNameA = await getLeaderboardName(clientA, userA.id)

    const { data: shareA0 } = await clientA
      .from('habit_streak_shares')
      .select('id, streak, is_active, shared_at')
      .eq('user_id', userA.id)
      .maybeSingle()
    priorShareA = shareA0

    const { data: shareB0 } = await clientB
      .from('habit_streak_shares')
      .select('id, streak, is_active, shared_at')
      .eq('user_id', userB.id)
      .maybeSingle()
    priorShareB = shareB0

    // Ephemeral private foundation for a non-spoofable streak.
    await setLeaderboardName(clientA, userA.id, smokeName)
    smokeHabitMeta = await ensureSmokeHabit(
      clientA,
      userA.id,
      smokeHabitKey,
      smokeHabitName,
    )
    smokeCheckinMeta = await ensureTodayCheckin(
      clientA,
      userA.id,
      smokeHabitMeta.habitId,
      today,
    )

    // Ensure B has a share row so cross-user isolation is meaningful.
    {
      const { data, error } = await clientB
        .from('habit_streak_shares')
        .upsert(
          {
            user_id: userB.id,
            streak: 500,
            is_active: false,
            shared_at: null,
          },
          { onConflict: 'user_id' },
        )
        .select('id, user_id, streak, is_active')
        .single()
      if (error) throw error
      bShareId = data.id
      if (data.streak === 500) {
        throw new Error(
          'Setup anomaly: User B streak remained 500 after upsert (server overwrite expected)',
        )
      }
    }

    // Start with sharing OFF for case 3.
    {
      const { error } = await setShare(clientA, false, today)
      if (error) throw error
    }

    // ------------------------------------------------------------------
    // 1) Spoof streak = 500 must be overwritten
    // ------------------------------------------------------------------
    {
      const { data, error } = await clientA
        .from('habit_streak_shares')
        .upsert(
          {
            user_id: userA.id,
            streak: 500,
            is_active: false,
            shared_at: null,
          },
          { onConflict: 'user_id' },
        )
        .select('streak, is_active')
        .single()

      const stored = data?.streak
      const ok = !error && stored !== 500 && Number.isInteger(stored) && stored >= 0
      record('1. Spoof streak=500 overwritten by server', ok, {
        attempted_streak: 500,
        stored_streak: stored,
        is_active: data?.is_active ?? null,
        error: summarizeError(error),
        note: 'PASS requires stored streak !== 500 (server-computed).',
      })
    }

    // ------------------------------------------------------------------
    // 2) Cross-user compute RPC must fail
    // ------------------------------------------------------------------
    {
      const { data, error } = await clientA.rpc('compute_user_habit_streak', {
        p_user_id: userB.id,
        p_today: today,
      })
      const text = `${error?.message || ''} ${error?.code || ''}`
      const denied =
        Boolean(error) &&
        (/permission denied|not allowed|42501|PGRST202|404/i.test(text) ||
          error?.code === '42501' ||
          error?.code === 'PGRST202')
      const ok = denied && data == null
      record('2. compute_user_habit_streak(User B) denied', ok, {
        data,
        error: summarizeError(error),
        note: 'Must not return User B streak; expect privilege/permission failure.',
      })
    }

    // ------------------------------------------------------------------
    // 3) Sharing OFF → absent from public board
    // ------------------------------------------------------------------
    {
      const { error: shareErr } = await setShare(clientA, false, today)
      const { data: publicRows, error: pubErr } = await getPublicStreaks(clientA)
      const hit = findPublicEntry(publicRows, smokeName)
      const ok = !shareErr && !pubErr && !hit
      record('3. Sharing OFF → not on public streak board', ok, {
        smoke_leaderboard_name: smokeName,
        found: Boolean(hit),
        found_row: hit ? publicRowForReport(hit) : null,
        public_row_count: publicRows.length,
        share_error: summarizeError(shareErr),
        public_error: summarizeError(pubErr),
      })
    }

    // ------------------------------------------------------------------
    // 4) Sharing ON → present with approved fields only
    // ------------------------------------------------------------------
    {
      const { data: shareRow, error: shareErr } = await setShare(clientA, true, today)
      const { data: publicRows, error: pubErr } = await getPublicStreaks(clientA)
      const hit = findPublicEntry(publicRows, smokeName)
      const shape = hit ? assertPublicShape(hit) : null
      const ok =
        !shareErr &&
        !pubErr &&
        Boolean(hit) &&
        shape &&
        shape.missing.length === 0 &&
        shape.extra.length === 0 &&
        shape.forbidden.length === 0

      record('4. Sharing ON → public row with approved fields only', ok, {
        smoke_leaderboard_name: smokeName,
        set_share_streak: shareRow?.streak ?? null,
        found_row: hit ? publicRowForReport(hit) : null,
        row_keys: shape?.keys ?? null,
        extra_keys: shape?.extra ?? null,
        forbidden_keys: shape?.forbidden ?? null,
        missing_keys: shape?.missing ?? null,
        share_error: summarizeError(shareErr),
        public_error: summarizeError(pubErr),
      })
    }

    // ------------------------------------------------------------------
    // 5) Clear Leaderboard Name → disappear; private habits intact
    // ------------------------------------------------------------------
    {
      const before = await countPrivateHabitState(clientA, userA.id)
      await clearLeaderboardName(clientA, userA.id)
      const { data: publicRows, error: pubErr } = await getPublicStreaks(clientA)
      const hit = findPublicEntry(publicRows, smokeName)
      const after = await countPrivateHabitState(clientA, userA.id)
      const { data: ownShare } = await clientA
        .from('habit_streak_shares')
        .select('is_active, streak')
        .eq('user_id', userA.id)
        .maybeSingle()

      const ok =
        !pubErr &&
        !hit &&
        before.habits === after.habits &&
        before.checkins === after.checkins

      record('5. Clear Leaderboard Name → gone publicly; private data intact', ok, {
        smoke_leaderboard_name: smokeName,
        found_publicly: Boolean(hit),
        private_habits_before: before.habits,
        private_habits_after: after.habits,
        private_checkins_before: before.checkins,
        private_checkins_after: after.checkins,
        own_share_is_active: ownShare?.is_active ?? null,
        public_error: summarizeError(pubErr),
      })
    }

    // ------------------------------------------------------------------
    // 6) Cross-user isolation on habit_streak_shares
    // ------------------------------------------------------------------
    {
      const { data: selectData, error: selectErr } = await clientA
        .from('habit_streak_shares')
        .select('id, user_id, streak, is_active')
        .eq('user_id', userB.id)

      const { data: updateByUser, error: updateByUserErr, count: updateByUserCount } =
        await clientA
          .from('habit_streak_shares')
          .update(
            { is_active: true, shared_at: new Date().toISOString() },
            { count: 'exact' },
          )
          .eq('user_id', userB.id)
          .select('id')

      let updateByIdCount = null
      let updateByIdErr = null
      let updateByIdData = null
      if (bShareId) {
        const res = await clientA
          .from('habit_streak_shares')
          .update(
            { is_active: true, shared_at: new Date().toISOString() },
            { count: 'exact' },
          )
          .eq('id', bShareId)
          .select('id')
        updateByIdData = res.data
        updateByIdErr = res.error
        updateByIdCount = res.count
      }

      // Confirm B's row unchanged (from B session).
      const { data: bAfter, error: bAfterErr } = await clientB
        .from('habit_streak_shares')
        .select('id, is_active, streak')
        .eq('user_id', userB.id)
        .maybeSingle()

      const selectEmpty = !selectErr && Array.isArray(selectData) && selectData.length === 0
      const updateUserBlocked =
        (!updateByUserErr && (updateByUserCount === 0 || (updateByUser || []).length === 0)) ||
        Boolean(updateByUserErr)
      const updateIdBlocked =
        !bShareId ||
        (!updateByIdErr && (updateByIdCount === 0 || (updateByIdData || []).length === 0)) ||
        Boolean(updateByIdErr)
      const bStillInactive = !bAfterErr && bAfter && bAfter.is_active === false

      const ok = selectEmpty && updateUserBlocked && updateIdBlocked && bStillInactive
      record('6. User A cannot read/modify User B habit_streak_shares', ok, {
        select_row_count: Array.isArray(selectData) ? selectData.length : null,
        select_error: summarizeError(selectErr),
        update_by_user_id_count: updateByUserCount,
        update_by_user_id_returned: (updateByUser || []).length,
        update_by_user_id_error: summarizeError(updateByUserErr),
        update_by_share_id_count: updateByIdCount,
        update_by_share_id_returned: (updateByIdData || []).length,
        update_by_share_id_error: summarizeError(updateByIdErr),
        user_b_is_active_after: bAfter?.is_active ?? null,
        user_b_read_error: summarizeError(bAfterErr),
        note: 'Share id used only in-process for the update attempt; not printed.',
      })
    }
  } catch (err) {
    console.error('\n[FATAL] Harness aborted before completing all cases')
    console.error(JSON.stringify(summarizeError(err), null, 2))
    process.exitCode = 1
  } finally {
    console.log('\n--- Cleanup ---')
    try {
      if (userA) {
        await setShare(clientA, false, today).catch(() => {})
        // Delete ephemeral smoke habit (checkins cascade via FK).
        if (smokeHabitMeta?.habitId) {
          await clientA
            .from('habits')
            .delete()
            .eq('id', smokeHabitMeta.habitId)
            .eq('user_id', userA.id)
            .eq('habit_key', smokeHabitKey)
        } else if (smokeCheckinMeta?.checkinId) {
          await clientA
            .from('habit_checkins')
            .delete()
            .eq('id', smokeCheckinMeta.checkinId)
            .eq('user_id', userA.id)
        }
        await restoreLeaderboardName(clientA, userA.id, priorNameA)
        if (priorShareA?.is_active) {
          await setShare(clientA, true, today).catch(() => {})
        } else {
          await setShare(clientA, false, today).catch(() => {})
        }
      }

      if (userB) {
        if (priorShareB) {
          await clientB
            .from('habit_streak_shares')
            .update({
              is_active: Boolean(priorShareB.is_active),
              shared_at: priorShareB.shared_at,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', userB.id)
        } else {
          await clientB
            .from('habit_streak_shares')
            .delete()
            .eq('user_id', userB.id)
        }
      }

      await clientA.auth.signOut().catch(() => {})
      await clientB.auth.signOut().catch(() => {})
      console.log('Cleanup finished (share off / name restored / smoke habit removed when safe).')
    } catch (cleanupErr) {
      console.error('Cleanup error:', summarizeError(cleanupErr))
      process.exitCode = 1
    }
  }

  const passed = results.filter((r) => r.ok).length
  const failed = results.filter((r) => !r.ok).length
  console.log('\n=== Stage 8 smoke summary ===')
  for (const r of results) {
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}`)
  }
  console.log(`Total: ${results.length}  PASS: ${passed}  FAIL: ${failed}`)

  if (failed > 0 || results.length < 6) {
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(summarizeError(err))
  process.exit(1)
})
