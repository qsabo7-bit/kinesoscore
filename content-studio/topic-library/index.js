/**
 * KinesoScore Topic Library — query helpers for future n8n / content automation.
 *
 * Does not affect the website UI. Safe to import from Node scripts.
 *
 * Typical flow:
 *   Topic Library → select topic → give AI factual_context + key_points
 *   → draft post → fact check against avoid_claims / sources → human approval → publish
 *   → markTopicUsed(id)
 */

import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  CONTENT_TYPES,
  DIFFICULTIES,
  KNOWN_SOURCE_IDS,
  TOPIC_CATEGORIES,
} from './constants.js'
import { TOPICS } from './topics/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const USAGE_PATH = path.join(__dirname, 'usage.json')

/**
 * @typedef {import('./types.js').Topic} Topic
 * @typedef {{ used: boolean, used_at?: string | null, notes?: string }} UsageEntry
 * @typedef {Record<string, UsageEntry>} UsageMap
 */

/** @returns {UsageMap} */
export function readUsage() {
  try {
    const raw = readFileSync(USAGE_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

/** @param {UsageMap} usage */
export function writeUsage(usage) {
  writeFileSync(USAGE_PATH, `${JSON.stringify(usage, null, 2)}\n`, 'utf8')
}

/**
 * @param {Topic} topic
 * @param {UsageMap} [usage]
 */
export function withUsage(topic, usage = readUsage()) {
  const entry = usage[topic.id] || { used: false, used_at: null }
  return {
    ...topic,
    used: Boolean(entry.used),
    used_at: entry.used_at || null,
    usage_notes: entry.notes || '',
  }
}

/** @returns {ReturnType<typeof withUsage>[]} */
export function getAllTopics() {
  const usage = readUsage()
  return TOPICS.map((topic) => withUsage(topic, usage))
}

/** @param {string} id */
export function getTopicById(id) {
  const topic = TOPICS.find((item) => item.id === id)
  if (!topic) return null
  return withUsage(topic)
}

/**
 * @param {object} [filters]
 * @param {string} [filters.category]
 * @param {string} [filters.content_type]
 * @param {string} [filters.difficulty]
 * @param {boolean} [filters.evergreen]
 * @param {boolean} [filters.suitable_for_x]
 * @param {boolean} [filters.requires_external_source]
 * @param {boolean} [filters.used] If set, filter by usage flag.
 * @param {boolean} [filters.unusedOnly] Shortcut for used === false.
 */
export function filterTopics(filters = {}) {
  const usage = readUsage()
  return TOPICS.map((topic) => withUsage(topic, usage)).filter((topic) => {
    if (filters.category && topic.category !== filters.category) return false
    if (filters.content_type && topic.content_type !== filters.content_type)
      return false
    if (filters.difficulty && topic.difficulty !== filters.difficulty)
      return false
    if (
      typeof filters.evergreen === 'boolean' &&
      topic.evergreen !== filters.evergreen
    ) {
      return false
    }
    if (
      typeof filters.suitable_for_x === 'boolean' &&
      topic.suitable_for_x !== filters.suitable_for_x
    ) {
      return false
    }
    if (
      typeof filters.requires_external_source === 'boolean' &&
      topic.requires_external_source !== filters.requires_external_source
    ) {
      return false
    }
    if (filters.unusedOnly && topic.used) return false
    if (typeof filters.used === 'boolean' && topic.used !== filters.used) {
      return false
    }
    return true
  })
}

/** Prefer unused evergreen topics suitable for short-form. */
export function pickNextTopic(filters = {}) {
  const pool = filterTopics({
    evergreen: true,
    unusedOnly: true,
    suitable_for_x: true,
    ...filters,
  })
  if (!pool.length) return null
  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * @param {string} id
 * @param {{ notes?: string, at?: string }} [options]
 */
export function markTopicUsed(id, options = {}) {
  if (!TOPICS.some((topic) => topic.id === id)) {
    throw new Error(`Unknown topic id: ${id}`)
  }
  const usage = readUsage()
  usage[id] = {
    used: true,
    used_at: options.at || new Date().toISOString(),
    notes: options.notes || usage[id]?.notes || '',
  }
  writeUsage(usage)
  return getTopicById(id)
}

/** @param {string} id */
export function markTopicUnused(id) {
  const usage = readUsage()
  if (usage[id]) {
    usage[id] = {
      used: false,
      used_at: null,
      notes: usage[id].notes || '',
    }
    writeUsage(usage)
  }
  return getTopicById(id)
}

export function resetAllUsage() {
  writeUsage({})
}

export function listCategories() {
  return Object.values(TOPIC_CATEGORIES)
}

export function summarizeLibrary() {
  const usage = readUsage()
  const topics = TOPICS.map((topic) => withUsage(topic, usage))
  /** @type {Record<string, number>} */
  const byCategory = {}
  /** @type {Record<string, number>} */
  const byContentType = {}
  for (const topic of topics) {
    byCategory[topic.category] = (byCategory[topic.category] || 0) + 1
    byContentType[topic.content_type] =
      (byContentType[topic.content_type] || 0) + 1
  }
  return {
    total: topics.length,
    used: topics.filter((t) => t.used).length,
    unused: topics.filter((t) => !t.used).length,
    requires_external_source: topics.filter((t) => t.requires_external_source)
      .length,
    byCategory,
    byContentType,
    categories: Object.keys(TOPIC_CATEGORIES),
    content_types: CONTENT_TYPES,
    difficulties: DIFFICULTIES,
  }
}

/**
 * Structural validation for CI / local sanity checks.
 * @returns {{ ok: boolean, errors: string[] }}
 */
export function validateLibrary() {
  const errors = []
  const seen = new Set()
  const categoryIds = new Set(Object.keys(TOPIC_CATEGORIES))
  const contentTypes = new Set(CONTENT_TYPES)
  const difficulties = new Set(DIFFICULTIES)
  const knownSources = new Set(KNOWN_SOURCE_IDS)

  for (const topic of TOPICS) {
    if (!topic.id) errors.push('Topic missing id')
    if (seen.has(topic.id)) errors.push(`Duplicate id: ${topic.id}`)
    seen.add(topic.id)
    if (!categoryIds.has(topic.category)) {
      errors.push(`${topic.id}: unknown category ${topic.category}`)
    }
    if (!contentTypes.has(topic.content_type)) {
      errors.push(`${topic.id}: unknown content_type ${topic.content_type}`)
    }
    if (!difficulties.has(topic.difficulty)) {
      errors.push(`${topic.id}: unknown difficulty ${topic.difficulty}`)
    }
    if (!topic.title?.trim()) errors.push(`${topic.id}: empty title`)
    if (!topic.factual_context?.trim()) {
      errors.push(`${topic.id}: empty factual_context`)
    }
    if (!Array.isArray(topic.key_points) || !topic.key_points.length) {
      errors.push(`${topic.id}: key_points required`)
    }
    if (!Array.isArray(topic.avoid_claims)) {
      errors.push(`${topic.id}: avoid_claims must be an array`)
    }
    if (!Array.isArray(topic.source_ids)) {
      errors.push(`${topic.id}: source_ids must be an array`)
    } else {
      for (const sourceId of topic.source_ids) {
        if (!knownSources.has(sourceId)) {
          errors.push(`${topic.id}: unknown source_ids entry ${sourceId}`)
        }
      }
    }
  }

  return { ok: errors.length === 0, errors }
}

/** Prompt-ready payload for an AI writer node. */
export function buildWriterBrief(topicOrId) {
  const topic =
    typeof topicOrId === 'string' ? getTopicById(topicOrId) : topicOrId
  if (!topic) return null
  const category = TOPIC_CATEGORIES[topic.category]
  return {
    id: topic.id,
    title: topic.title,
    category: category?.label || topic.category,
    content_type: topic.content_type,
    difficulty: topic.difficulty,
    factual_context: topic.factual_context,
    key_points: topic.key_points,
    avoid_claims: topic.avoid_claims,
    kinesoscore_connection: topic.kinesoscore_connection,
    requires_external_source: topic.requires_external_source,
    source_ids: topic.source_ids,
    brand_voice: {
      be: [
        'knowledgeable',
        'credible',
        'useful',
        'analytical',
        'established',
        'professional',
        'fitness-performance focused',
      ],
      avoid: [
        'AI content-farm tone',
        'generic fitness motivation',
        'spammy CTAs',
        'aggressive influencer / supplement hype',
        'constant product advertising',
        'invented statistics, studies, or user outcomes',
        'exposing proprietary scoring internals',
      ],
      soft_cta_example: "What's yours?",
    },
    writer_instructions: [
      'Use only factual_context and key_points as ground truth.',
      'Respect every avoid_claims item.',
      'A reader should learn something useful even if they never visit KinesoScore.',
      'If requires_external_source is true, do not invent policy numbers or pass standards — flag for human verification.',
      'Do not reverse-engineer or invent proprietary formulas, weights, or thresholds.',
    ],
  }
}

export {
  CONTENT_TYPES,
  DIFFICULTIES,
  KNOWN_SOURCE_IDS,
  TOPIC_CATEGORIES,
  TOPICS,
}
