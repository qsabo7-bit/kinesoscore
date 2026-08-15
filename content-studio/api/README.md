# Topic Library HTTP API (local / n8n)

Minimal Node.js HTTP server that exposes the existing `content-studio/topic-library` helpers to n8n.

Does **not** modify the KinesoScore website, calculations, auth, Supabase, or the topic library itself.

## Start the server

From the repo root:

```bash
npm run content:api
```

Or directly:

```bash
node content-studio/api/server.mjs
```

### Port / host

| Env var | Default | Purpose |
|---------|---------|---------|
| `TOPIC_API_PORT` | `8787` | Listen port |
| `TOPIC_API_HOST` | `0.0.0.0` | Bind address (Docker-reachable via `host.docker.internal`) |

Examples:

```bash
TOPIC_API_PORT=8787 npm run content:api
TOPIC_API_PORT=9001 TOPIC_API_HOST=0.0.0.0 node content-studio/api/server.mjs
```

Local Mac: `http://127.0.0.1:8787`  
n8n in Docker: `http://host.docker.internal:8787`

This is a **local development / content automation** API. Do not expose it to the public internet.

## Endpoints

### `GET /health`

Liveness check.

```json
{ "ok": true }
```

### `GET /topics/next`

Picks the next unused evergreen short-form topic via `pickNextTopic()`, then returns `buildWriterBrief(topic)`.

Optional query filters (same names as `filterTopics` / `pickNextTopic`):

- `category`
- `content_type`
- `difficulty`
- `evergreen` (`true`/`false`)
- `suitable_for_x` (`true`/`false`)
- `requires_external_source` (`true`/`false`)
- `used` (`true`/`false`)
- `unusedOnly` (`true`/`false`)

Note: `pickNextTopic()` already defaults to `evergreen: true`, `unusedOnly: true`, `suitable_for_x: true`. Query params override/merge into that call.

### `GET /topics`

Returns topics from `filterTopics()` with the same optional query filters, plus a library summary.

### `POST /topics/:id/used`

Marks a topic used via `markTopicUsed(id)` (writes `content-studio/topic-library/usage.json`).

Optional JSON body:

```json
{ "notes": "Posted to X", "at": "2026-08-14T12:00:00.000Z" }
```

## Example curl commands

```bash
# Health
curl -s http://127.0.0.1:8787/health

# Next writer brief
curl -s http://127.0.0.1:8787/topics/next | jq .

# Next topic in a category
curl -s 'http://127.0.0.1:8787/topics/next?category=one_rm' | jq .

# List unused running topics
curl -s 'http://127.0.0.1:8787/topics?category=running&unusedOnly=true' | jq '.count'

# Mark used
curl -s -X POST http://127.0.0.1:8787/topics/epley-estimated-1rm/used \
  -H 'Content-Type: application/json' \
  -d '{"notes":"n8n test"}' | jq .
```

## How n8n will call it

1. Keep this API running on the Mac (`npm run content:api`).
2. In n8n (Docker), use HTTP Request nodes against `http://host.docker.internal:8787` (or whatever `TOPIC_API_PORT` you set).
3. Typical flow:
   - `GET /topics/next` → AI writer receives `brief`
   - fact check / human approval
   - publish
   - `POST /topics/:id/used` with the brief’s `id`

Usage tracking stays in the existing topic library (`markTopicUsed` → `usage.json`). This API does not duplicate that logic.
