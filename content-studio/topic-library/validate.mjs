#!/usr/bin/env node
/**
 * Sanity-check the topic library (no website side effects).
 * Usage: node content-studio/topic-library/validate.mjs
 */
import {
  summarizeLibrary,
  validateLibrary,
} from './index.js'

const summary = summarizeLibrary()
const result = validateLibrary()

console.log(JSON.stringify({ summary, validation: result }, null, 2))

if (!result.ok) {
  console.error('\nTopic library validation failed.')
  process.exit(1)
}

console.error(`\nOK — ${summary.total} topics across ${summary.categories.length} categories.`)
