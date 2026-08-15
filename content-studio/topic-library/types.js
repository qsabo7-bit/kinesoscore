/**
 * @typedef {import('./constants.js').TopicDifficulty} TopicDifficulty
 * @typedef {import('./constants.js').ContentType} ContentType
 */

/**
 * @typedef {Object} Topic
 * @property {string} id Stable unique id (slug).
 * @property {string} category Key from TOPIC_CATEGORIES.
 * @property {string} title Human-readable topic title for selection UIs.
 * @property {ContentType} content_type
 * @property {TopicDifficulty} difficulty
 * @property {string} factual_context Grounded facts the writer may rely on.
 * @property {string[]} key_points
 * @property {string[]} avoid_claims
 * @property {string} kinesoscore_connection How this ties to real product features.
 * @property {boolean} evergreen
 * @property {boolean} suitable_for_x Suitable for short-form / X-style posts.
 * @property {boolean} requires_external_source Needs verification before publishing claims beyond factual_context.
 * @property {string[]} source_ids Ids from src/data/sources.js (or empty).
 */

export {}
