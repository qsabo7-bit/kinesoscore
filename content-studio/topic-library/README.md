# KinesoScore Topic Library

Reusable topic catalog for future **n8n → AI draft → fact check → human approval → publish** automation.

This library does **not** change the website UI, scoring logic, auth, or database.

## Layout

| Path | Purpose |
|------|---------|
| `constants.js` | Categories, content types, known `sources.js` ids |
| `topics/*.js` | Topic objects with factual context |
| `usage.json` | Which topics have been used (n8n/scripts update this) |
| `index.js` | Query helpers + writer brief builder |
| `types.js` | JSDoc typedef for Topic |

## Topic fields

Each topic includes:

- `id`, `category`, `title`
- `content_type`, `difficulty`
- `factual_context` — grounded facts the model may use
- `key_points`, `avoid_claims`
- `kinesoscore_connection` — real product tie-in (soft, non-hype)
- `evergreen`, `suitable_for_x`
- `requires_external_source` — needs human/source verification before policy or standard claims
- `source_ids` — only ids that exist in `src/data/sources.js`

Usage flags (`used`, `used_at`) are layered from `usage.json` at read time.

## Quick Node usage

```js
import {
  filterTopics,
  pickNextTopic,
  buildWriterBrief,
  markTopicUsed,
  summarizeLibrary,
  validateLibrary,
} from './index.js'

console.log(summarizeLibrary())
console.log(validateLibrary())

const topic = pickNextTopic({ category: 'one_rm' })
const brief = buildWriterBrief(topic)
// … send brief to AI writer …
// markTopicUsed(topic.id, { notes: 'Posted to X' })
```

### Useful filters

```js
filterTopics({ category: 'running', unusedOnly: true })
filterTopics({ content_type: 'misconception', suitable_for_x: true })
filterTopics({ requires_external_source: true }) // review before publish
```

## n8n sketch

1. **Select** — `pickNextTopic()` or `filterTopics({ unusedOnly: true, evergreen: true })`
2. **Brief** — `buildWriterBrief(topic)` → AI node
3. **Fact check** — compare draft to `factual_context`, `avoid_claims`, `requires_external_source`
4. **Human approval**
5. **Publish**
6. **Mark used** — `markTopicUsed(id)`

## Proprietary logic rule

Safe to teach public formulas already cited in-product (Epley, Riegel, Cooper, Rockport, Mifflin–St Jeor, WHO-style BMI framing, equal-weight composite *concept*, Fitness Age *concept* from public SOURCE text).

Do **not** ask models to reconstruct proprietary percentile ladders, unpublished norm tables, Fitness Age compression knobs, or military scoring chart internals.

## Brand voice

Knowledgeable, credible, useful, analytical — not an AI content farm, not generic motivation spam, not constant ads. Soft CTA pattern from content-studio: “What’s yours?”
