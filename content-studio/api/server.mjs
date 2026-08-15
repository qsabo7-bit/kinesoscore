#!/usr/bin/env node
/**
 * Local HTTP API for the KinesoScore topic library (n8n / content automation).
 *
 * Isolated under content-studio/api — does not touch the website app.
 *
 * Env:
 *   TOPIC_API_PORT   default 8787
 *   TOPIC_API_HOST   default 0.0.0.0 (reachable from Docker via host.docker.internal)
 */

import http from 'node:http'
import { URL } from 'node:url'
import {
  buildWriterBrief,
  filterTopics,
  getTopicById,
  markTopicUsed,
  pickNextTopic,
  summarizeLibrary,
} from '../topic-library/index.js'

const PORT = Number(process.env.TOPIC_API_PORT || 8787)
const HOST = process.env.TOPIC_API_HOST || '0.0.0.0'

function sendJson(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  res.end(payload)
}

function sendError(res, status, error, extra = {}) {
  sendJson(res, status, { ok: false, error, ...extra })
}

/** @param {string | null} value */
function parseOptionalBoolean(value) {
  if (value == null || value === '') return undefined
  const normalized = String(value).trim().toLowerCase()
  if (['1', 'true', 'yes'].includes(normalized)) return true
  if (['0', 'false', 'no'].includes(normalized)) return false
  return undefined
}

/**
 * Map query string → filterTopics / pickNextTopic options.
 * @param {URLSearchParams} searchParams
 */
function filtersFromQuery(searchParams) {
  /** @type {Record<string, unknown>} */
  const filters = {}
  const category = searchParams.get('category')
  const contentType = searchParams.get('content_type')
  const difficulty = searchParams.get('difficulty')

  if (category) filters.category = category
  if (contentType) filters.content_type = contentType
  if (difficulty) filters.difficulty = difficulty

  const evergreen = parseOptionalBoolean(searchParams.get('evergreen'))
  if (typeof evergreen === 'boolean') filters.evergreen = evergreen

  const suitableForX = parseOptionalBoolean(searchParams.get('suitable_for_x'))
  if (typeof suitableForX === 'boolean') filters.suitable_for_x = suitableForX

  const requiresExternal = parseOptionalBoolean(
    searchParams.get('requires_external_source'),
  )
  if (typeof requiresExternal === 'boolean') {
    filters.requires_external_source = requiresExternal
  }

  const used = parseOptionalBoolean(searchParams.get('used'))
  if (typeof used === 'boolean') filters.used = used

  const unusedOnly = parseOptionalBoolean(searchParams.get('unusedOnly'))
  if (typeof unusedOnly === 'boolean') filters.unusedOnly = unusedOnly

  return filters
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      if (!chunks.length) {
        resolve({})
        return
      }
      const raw = Buffer.concat(chunks).toString('utf8')
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })
    req.on('error', reject)
  })
}

const server = http.createServer(async (req, res) => {
  try {
    const method = req.method || 'GET'
    const requestUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
    const { pathname, searchParams } = requestUrl

    if (method === 'GET' && pathname === '/health') {
      sendJson(res, 200, { ok: true })
      return
    }

    if (method === 'GET' && pathname === '/topics/next') {
      const filters = filtersFromQuery(searchParams)
      const topic = pickNextTopic(filters)
      if (!topic) {
        sendError(res, 404, 'No unused topic matched the selection criteria', {
          filters,
          summary: summarizeLibrary(),
        })
        return
      }
      const brief = buildWriterBrief(topic)
      sendJson(res, 200, { ok: true, brief })
      return
    }

    if (method === 'GET' && pathname === '/topics') {
      const filters = filtersFromQuery(searchParams)
      const topics = filterTopics(filters)
      sendJson(res, 200, {
        ok: true,
        count: topics.length,
        filters,
        summary: summarizeLibrary(),
        topics,
      })
      return
    }

    const usedMatch = pathname.match(/^\/topics\/([^/]+)\/used$/)
    if (method === 'POST' && usedMatch) {
      const id = decodeURIComponent(usedMatch[1])
      if (!getTopicById(id)) {
        sendError(res, 404, `Unknown topic id: ${id}`)
        return
      }

      let body = {}
      try {
        body = await readJsonBody(req)
      } catch (err) {
        sendError(res, 400, err.message || 'Invalid JSON body')
        return
      }

      const notes =
        typeof body?.notes === 'string' ? body.notes : undefined
      const at = typeof body?.at === 'string' ? body.at : undefined
      const topic = markTopicUsed(id, { notes, at })
      sendJson(res, 200, {
        ok: true,
        topic,
        brief: buildWriterBrief(topic),
      })
      return
    }

    sendError(res, 404, `Not found: ${method} ${pathname}`)
  } catch (err) {
    const message = err?.message || 'Internal server error'
    if (/Unknown topic id:/i.test(message)) {
      sendError(res, 404, message)
      return
    }
    console.error(err)
    sendError(res, 500, message)
  }
})

server.listen(PORT, HOST, () => {
  console.log(
    `KinesoScore topic API listening on http://${HOST}:${PORT} (local: http://127.0.0.1:${PORT})`,
  )
  console.log(
    `Docker/n8n host access: http://host.docker.internal:${PORT}`,
  )
})
