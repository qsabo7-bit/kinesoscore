import { fetchAwardIdentitySettings } from './awardIdentity.js'
import { readCachedDashboardAwards } from './dashboardAwardsCache.js'
import { deriveAwards } from './fitnessAwards.js'
import { fetchLatestFitnessScoreSnapshot } from './fitnessScoreSnapshots.js'
import { fetchLeaderboardName } from './leaderboardProfile.js'
import { resolveAwardsForCard } from './shareMomentCard.js'
import { isSupabaseConfigured } from '../supabaseClient.js'

/**
 * Resolve public-safe share card fields from the signed-in user.
 * Prefer cached dashboard scores; fall back to latest snapshot.
 *
 * @param {string | null | undefined} userId
 * @param {object} [props]
 */
export async function resolveShareCardData(userId, props = {}) {
  const empty = {
    athleteName: props.athleteName ?? null,
    awards: props.awards ?? null,
    fitnessScore: props.fitnessScore ?? null,
    strengthScore: props.strengthScore ?? null,
    runningScore: props.runningScore ?? null,
  }

  if (!userId || !isSupabaseConfigured) {
    return {
      ...empty,
      awards: resolveAwardsForCard(
        empty.awards,
        empty.strengthScore,
        empty.runningScore,
      ),
    }
  }

  const cached = readCachedDashboardAwards(userId)
  const [name, settings, snapshot] = await Promise.all([
    props.athleteName != null
      ? Promise.resolve(props.athleteName)
      : fetchLeaderboardName(userId).catch(() => null),
    props.awards != null
      ? Promise.resolve(null)
      : fetchAwardIdentitySettings(userId).catch(() => null),
    props.fitnessScore != null
      ? Promise.resolve(null)
      : cached?.fitnessScore != null
        ? Promise.resolve(null)
        : fetchLatestFitnessScoreSnapshot(userId).catch(() => null),
  ])

  let fitnessScore = props.fitnessScore ?? null
  let strengthScore = props.strengthScore ?? null
  let runningScore = props.runningScore ?? null

  if (fitnessScore == null && cached?.fitnessScore != null) {
    fitnessScore = Number(cached.fitnessScore)
    strengthScore = Number(cached.strengthScore)
    runningScore = Number(cached.runningScore)
  } else if (fitnessScore == null && snapshot) {
    fitnessScore = Number(snapshot.fitness_score)
    strengthScore = Number(snapshot.strength_score)
    runningScore = Number(snapshot.running_score)
  }

  let awards = props.awards ?? null
  if (!awards?.strength && !awards?.running && !awards?.crown) {
    if (cached?.awards?.strength || cached?.awards?.running || cached?.awards?.crown) {
      awards = {
        strength: cached.awards.strength || null,
        running: cached.awards.running || null,
        crown: Boolean(cached.awards.crown),
      }
    } else if (settings?.strength || settings?.running || settings?.crown) {
      awards = {
        strength: settings.strength || null,
        running: settings.running || null,
        crown: Boolean(settings.crown),
      }
    } else if (
      Number.isFinite(strengthScore) &&
      Number.isFinite(runningScore)
    ) {
      awards = deriveAwards({
        strengthScore,
        runningScore,
      })
    }
  }

  awards = resolveAwardsForCard(awards, strengthScore, runningScore)

  return {
    athleteName: props.athleteName ?? name ?? null,
    awards,
    fitnessScore: Number.isFinite(fitnessScore) ? fitnessScore : null,
    strengthScore: Number.isFinite(strengthScore) ? strengthScore : null,
    runningScore: Number.isFinite(runningScore) ? runningScore : null,
  }
}
