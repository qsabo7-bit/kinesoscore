import { STRENGTH_TOPICS } from './strengthTopics.js'
import { RUNNING_METABOLISM_TOPICS } from './runningMetabolismTopics.js'
import { SCORE_PRODUCT_TOPICS } from './scoreProductTopics.js'
import { ASSESSMENT_HABIT_TOPICS } from './assessmentHabitTopics.js'
import { EXTRA_TOPICS } from './extraTopics.js'

/**
 * Full topic catalog (static). Usage state lives in usage.json via index helpers.
 * @type {import('../types.js').Topic[]}
 */
export const TOPICS = [
  ...STRENGTH_TOPICS,
  ...RUNNING_METABOLISM_TOPICS,
  ...SCORE_PRODUCT_TOPICS,
  ...ASSESSMENT_HABIT_TOPICS,
  ...EXTRA_TOPICS,
]

export {
  STRENGTH_TOPICS,
  RUNNING_METABOLISM_TOPICS,
  SCORE_PRODUCT_TOPICS,
  ASSESSMENT_HABIT_TOPICS,
  EXTRA_TOPICS,
}
