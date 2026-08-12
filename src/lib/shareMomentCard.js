import { BRAND } from '../data/brand.js'
import { AWARD_LABELS, deriveAwards } from './fitnessAwards.js'

/** Instagram-oriented export sizes (exact pixel output). */
export const SHARE_FORMATS = Object.freeze({
  post: Object.freeze({
    id: 'post',
    label: 'Instagram Post',
    shortLabel: 'Post 4:5',
    width: 1080,
    height: 1350,
    ratioLabel: '4:5',
  }),
  story: Object.freeze({
    id: 'story',
    label: 'Instagram Story',
    shortLabel: 'Story 9:16',
    width: 1080,
    height: 1920,
    ratioLabel: '9:16',
  }),
})

const TIER_METALS = {
  bronze: { fill: '#c48a4a' },
  silver: { fill: '#c9d2cc' },
  gold: { fill: '#e2b84a' },
  diamond: { fill: '#9fd8ff' },
  mint: { fill: '#7dffb3' },
}

const LOGO_SRC = '/kinesoscore-favicon.png'

/**
 * @param {'post' | 'story' | string} formatId
 */
export function resolveShareFormat(formatId) {
  return SHARE_FORMATS[formatId] || SHARE_FORMATS.post
}

/**
 * Normalize render inputs for the social card (no private fields).
 * @param {object} raw
 */
export function buildShareCardModel(raw = {}) {
  const fitness = toScore(raw.fitnessScore)
  const strength = toScore(raw.strengthScore)
  const running = toScore(raw.runningScore)
  const momentPrimary = String(raw.primary || '').trim()
  const momentTitle = String(raw.title || '').trim()
  const momentSecondary = String(raw.secondary || '').trim()
  const athleteName = String(raw.athleteName || '').trim() || null

  return {
    formatId: raw.format === 'story' ? 'story' : 'post',
    athleteName,
    fitnessScore: fitness,
    strengthScore: strength,
    runningScore: running,
    awards: resolveAwardsForCard(raw.awards, strength, running),
    momentTitle,
    momentPrimary,
    momentSecondary,
    footer: String(raw.footer || 'kinesoscore.com').trim(),
  }
}

/**
 * Prefer provided awards; otherwise derive from component scores.
 * @param {object | null | undefined} awards
 * @param {number | null} strength
 * @param {number | null} running
 */
export function resolveAwardsForCard(awards, strength, running) {
  if (hasVisibleAwards(awards)) {
    return {
      strength: awards.strength || null,
      running: awards.running || null,
      crown: Boolean(awards.crown),
    }
  }
  if (strength == null && running == null) return null
  const derived = deriveAwards({
    strengthScore: strength,
    runningScore: running,
  })
  return hasVisibleAwards(derived) ? derived : null
}

function hasVisibleAwards(awards) {
  return Boolean(awards?.strength || awards?.running || awards?.crown)
}

/**
 * Draw an Instagram-ready share card and return a PNG blob.
 * Default format is 1080×1350 (4:5). Story is 1080×1920 (9:16).
 *
 * @param {object} opts
 * @returns {Promise<Blob>}
 */
export async function renderShareMomentCardBlob(opts = {}) {
  const model = buildShareCardModel(opts)
  const format = resolveShareFormat(model.formatId)
  const width = format.width
  const height = format.height

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable.')

  if (typeof document !== 'undefined' && document.fonts?.ready) {
    try {
      await document.fonts.ready
    } catch {
      // fall through
    }
  }

  const logo = await loadImage(LOGO_SRC)

  paintBackground(ctx, width, height)
  paintFrame(ctx, width, height)
  paintBrand(ctx, width, logo)

  const contentTop = height * (format.id === 'story' ? 0.22 : 0.2)
  paintHero(ctx, width, height, contentTop, model)
  paintFooter(ctx, width, height, model)

  return canvasToPngBlob(canvas)
}

/**
 * Prefer native file share; fall back to download (iOS-safe path).
 * @param {Blob} blob
 * @param {string} [filename]
 * @returns {Promise<'shared' | 'downloaded'>}
 */
export async function shareOrDownloadMomentCard(
  blob,
  filename = 'kinesoscore.png',
) {
  const file = new File([blob], filename, { type: 'image/png' })
  if (
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    navigator.canShare?.({ files: [file] })
  ) {
    try {
      await navigator.share({
        files: [file],
        title: BRAND.short,
        text: `My ${BRAND.scoreName}`,
      })
      return 'shared'
    } catch (err) {
      if (err?.name === 'AbortError') throw err
      // Fall through to download when share fails.
    }
  }

  downloadMomentCard(blob, filename)
  return 'downloaded'
}

/**
 * @param {Blob} blob
 * @param {string} [filename]
 */
export function downloadMomentCard(blob, filename = 'kinesoscore.png') {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  // Delay revoke so Safari can start the download/share sheet.
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}

function toScore(value) {
  // Number(null) === 0 — treat nullish / blank as missing, never invent a zero.
  if (value == null || value === '') return null
  const n = Math.round(Number(value))
  return Number.isFinite(n) && n >= 0 && n <= 100 ? n : null
}

function loadImage(src) {
  return new Promise((resolve) => {
    if (typeof Image === 'undefined') {
      resolve(null)
      return
    }
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

function canvasToPngBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (value) =>
        value ? resolve(value) : reject(new Error('Could not export image.')),
      'image/png',
    )
  })
}

function paintBackground(ctx, width, height) {
  const grad = ctx.createLinearGradient(0, 0, width * 0.15, height)
  grad.addColorStop(0, '#1a2922')
  grad.addColorStop(0.42, '#121a17')
  grad.addColorStop(1, '#0b100e')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, width, height)

  const wash = ctx.createRadialGradient(
    width * 0.78,
    height * 0.16,
    20,
    width * 0.7,
    height * 0.2,
    height * 0.55,
  )
  wash.addColorStop(0, 'rgba(125, 255, 179, 0.2)')
  wash.addColorStop(0.5, 'rgba(125, 255, 179, 0.05)')
  wash.addColorStop(1, 'rgba(125, 255, 179, 0)')
  ctx.fillStyle = wash
  ctx.fillRect(0, 0, width, height)

  const wash2 = ctx.createRadialGradient(
    width * 0.18,
    height * 0.82,
    10,
    width * 0.22,
    height * 0.78,
    height * 0.4,
  )
  wash2.addColorStop(0, 'rgba(90, 160, 220, 0.12)')
  wash2.addColorStop(1, 'rgba(90, 160, 220, 0)')
  ctx.fillStyle = wash2
  ctx.fillRect(0, 0, width, height)

  ctx.save()
  ctx.strokeStyle = 'rgba(242, 247, 244, 0.028)'
  ctx.lineWidth = 1
  for (let i = -height; i < width + height; i += 30) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + height, height)
    ctx.stroke()
  }
  ctx.restore()

  const vignette = ctx.createRadialGradient(
    width / 2,
    height * 0.48,
    height * 0.28,
    width / 2,
    height * 0.5,
    height * 0.72,
  )
  vignette.addColorStop(0, 'rgba(0,0,0,0)')
  vignette.addColorStop(1, 'rgba(0,0,0,0.5)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, width, height)
}

function paintFrame(ctx, width, height) {
  const inset = 40
  ctx.strokeStyle = 'rgba(125, 255, 179, 0.2)'
  ctx.lineWidth = 2
  ctx.strokeRect(inset, inset, width - inset * 2, height - inset * 2)

  ctx.strokeStyle = 'rgba(242, 247, 244, 0.07)'
  ctx.lineWidth = 1
  ctx.strokeRect(
    inset + 14,
    inset + 14,
    width - (inset + 14) * 2,
    height - (inset + 14) * 2,
  )

  const tick = 30
  ctx.strokeStyle = 'rgba(125, 255, 179, 0.55)'
  ctx.lineWidth = 3
  const corners = [
    [inset, inset],
    [width - inset, inset],
    [inset, height - inset],
    [width - inset, height - inset],
  ]
  for (const [x, y] of corners) {
    const dx = x === inset ? 1 : -1
    const dy = y === inset ? 1 : -1
    ctx.beginPath()
    ctx.moveTo(x, y + dy * tick)
    ctx.lineTo(x, y)
    ctx.lineTo(x + dx * tick, y)
    ctx.stroke()
  }
}

function paintBrand(ctx, width, logo) {
  const x = 88
  const y = 92
  const mark = 46

  if (logo) {
    ctx.drawImage(logo, x, y, mark, mark)
  } else {
    ctx.fillStyle = '#7dffb3'
    ctx.beginPath()
    ctx.arc(x + mark / 2, y + mark / 2, mark / 2, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#0f1412'
    ctx.font = '700 22px "Barlow Condensed", "Arial Narrow", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(BRAND.mark, x + mark / 2, y + mark / 2 + 1)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'alphabetic'
  }

  ctx.fillStyle = '#f2f7f4'
  ctx.font = '700 36px "Barlow Condensed", "Arial Narrow", sans-serif'
  ctx.fillText(BRAND.short.toUpperCase(), x + mark + 18, y + 34)

  ctx.strokeStyle = 'rgba(125, 255, 179, 0.45)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(x, y + mark + 18)
  ctx.lineTo(x + 210, y + mark + 18)
  ctx.stroke()
}

function paintHero(ctx, width, height, contentTop, model) {
  const padX = 96
  const maxW = width - padX * 2
  const footerReserve = 220
  let y = contentTop

  const hasScore = model.fitnessScore != null

  ctx.save()
  ctx.textBaseline = 'top'
  ctx.textAlign = 'left'

  if (hasScore) {
    // Eyebrow above the hero score — prevents label/number overlap.
    ctx.fillStyle = '#7dffb3'
    ctx.font = '700 40px "Barlow Condensed", "Arial Narrow", sans-serif'
    ctx.fillText(BRAND.scoreName, padX, y)
    y += 52

    const scoreText = String(model.fitnessScore)
    const scoreSize = scoreText.length <= 2 ? 260 : 210
    ctx.fillStyle = '#f2f7f4'
    ctx.font = `700 ${scoreSize}px "Barlow Condensed", "Arial Narrow", sans-serif`
    ctx.fillText(scoreText, padX, y)
    y += scoreSize + 18

    const underline = ctx.createLinearGradient(padX, y, padX + 420, y)
    underline.addColorStop(0, 'rgba(125, 255, 179, 0.85)')
    underline.addColorStop(1, 'rgba(125, 255, 179, 0)')
    ctx.strokeStyle = underline
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(padX, y)
    ctx.lineTo(padX + 420, y)
    ctx.stroke()
    y += 48

    y = paintComponentRows(ctx, padX, y, maxW, model)
    y += 28

    const badgeBottom = height - footerReserve
    paintBadgeRow(ctx, padX, Math.min(y, badgeBottom - 130), maxW, model)
    ctx.restore()
    return
  }

  // Fallback: moment / rank hero (still Instagram-sized)
  if (model.momentTitle) {
    ctx.fillStyle = 'rgba(125, 255, 179, 0.9)'
    ctx.font = '700 40px "Barlow Condensed", "Arial Narrow", sans-serif'
    ctx.fillText(model.momentTitle.toUpperCase(), padX, y)
    y += 54
  }

  const primary = model.momentPrimary || '—'
  const primarySize = primary.length <= 4 ? 220 : primary.length <= 8 ? 160 : 120
  ctx.fillStyle = '#f2f7f4'
  ctx.font = `700 ${primarySize}px "Barlow Condensed", "Arial Narrow", sans-serif`
  ctx.fillText(primary, padX, y)
  y += primarySize + 22

  const underline = ctx.createLinearGradient(padX, y, padX + 420, y)
  underline.addColorStop(0, 'rgba(125, 255, 179, 0.85)')
  underline.addColorStop(1, 'rgba(125, 255, 179, 0)')
  ctx.strokeStyle = underline
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(padX, y)
  ctx.lineTo(padX + 420, y)
  ctx.stroke()
  y += 40

  if (model.momentSecondary) {
    ctx.fillStyle = '#c5d0c9'
    ctx.font = '600 42px Manrope, "Segoe UI", sans-serif'
    wrapText(ctx, model.momentSecondary, padX, y, maxW, 52)
    y += 64
  }

  paintBadgeRow(
    ctx,
    padX,
    Math.min(y + 12, height - footerReserve - 130),
    maxW,
    model,
  )
  ctx.restore()
}

function paintComponentRows(ctx, x, y, maxW, model) {
  const rows = []
  if (model.strengthScore != null) {
    rows.push({ label: 'STRENGTH', value: model.strengthScore })
  }
  if (model.runningScore != null) {
    rows.push({ label: 'RUNNING', value: model.runningScore })
  }
  if (!rows.length) return y

  const colW = Math.min(maxW, 780)
  const rowH = 72
  const prevBaseline = ctx.textBaseline
  ctx.textBaseline = 'middle'

  rows.forEach((row, index) => {
    const rowY = y + index * (rowH + 14)
    ctx.fillStyle = 'rgba(15, 20, 18, 0.55)'
    roundRect(ctx, x, rowY, colW, rowH, 10)
    ctx.fill()
    ctx.strokeStyle = 'rgba(125, 255, 179, 0.18)'
    ctx.lineWidth = 1.5
    roundRect(ctx, x, rowY, colW, rowH, 10)
    ctx.stroke()

    ctx.fillStyle = '#93a39b'
    ctx.font = '700 28px Manrope, "Segoe UI", sans-serif'
    ctx.fillText(row.label, x + 28, rowY + rowH / 2)

    ctx.fillStyle = '#f2f7f4'
    ctx.font = '700 44px "Barlow Condensed", "Arial Narrow", sans-serif'
    const value = String(row.value)
    const vw = ctx.measureText(value).width
    ctx.fillText(value, x + colW - 28 - vw, rowY + rowH / 2)
  })

  ctx.textBaseline = prevBaseline
  return y + rows.length * (rowH + 14)
}

/**
 * Simple text badge chips (rank + awards) — compact metal-dot cards.
 */
function paintBadgeRow(ctx, x, y, maxW, model) {
  const chips = []

  const rankChip = formatRankChip(model)
  if (rankChip) chips.push({ label: rankChip, tone: 'mint' })

  if (model.awards?.crown) {
    chips.push({ label: 'CROWN', tone: 'diamond' })
  }
  if (model.awards?.strength && TIER_METALS[model.awards.strength]) {
    chips.push({
      label: `${(AWARD_LABELS[model.awards.strength] || model.awards.strength).toUpperCase()} STRENGTH`,
      tone: model.awards.strength,
    })
  }
  if (model.awards?.running && TIER_METALS[model.awards.running]) {
    chips.push({
      label: `${(AWARD_LABELS[model.awards.running] || model.awards.running).toUpperCase()} RUNNING`,
      tone: model.awards.running,
    })
  }

  if (!chips.length) return

  let cursorX = x
  let cursorY = y
  const prevBaseline = ctx.textBaseline
  ctx.textBaseline = 'alphabetic'
  ctx.font = '700 24px Manrope, "Segoe UI", sans-serif'

  for (const chip of chips) {
    const padX = 22
    const textW = ctx.measureText(chip.label).width
    const w = textW + padX * 2 + 18
    const h = 48
    if (cursorX + w > x + maxW && cursorX > x) {
      cursorX = x
      cursorY += h + 12
    }

    const metal = TIER_METALS[chip.tone] || TIER_METALS.mint

    ctx.fillStyle = 'rgba(15, 20, 18, 0.72)'
    roundRect(ctx, cursorX, cursorY, w, h, 8)
    ctx.fill()

    ctx.strokeStyle = metal.fill
    ctx.globalAlpha = 0.85
    ctx.lineWidth = 1.5
    roundRect(ctx, cursorX, cursorY, w, h, 8)
    ctx.stroke()
    ctx.globalAlpha = 1

    ctx.fillStyle = metal.fill
    ctx.beginPath()
    ctx.arc(cursorX + 20, cursorY + h / 2, 5, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#f2f7f4'
    ctx.fillText(chip.label, cursorX + 34, cursorY + 31)

    cursorX += w + 14
  }

  ctx.textBaseline = prevBaseline
}

function formatRankChip(model) {
  const primary = model.momentPrimary || ''
  const rankMatch = primary.match(/^#?\s*(\d+)\s*$/)
  if (!rankMatch) return null
  const rank = rankMatch[1]
  const title = (model.momentTitle || 'This Week').toUpperCase()
  return `#${rank} ${title}`
}

function paintFooter(ctx, width, height, model) {
  const y = height - 96
  const padX = 96

  if (model.athleteName) {
    ctx.fillStyle = '#a8b8b0'
    ctx.font = '600 30px Manrope, "Segoe UI", sans-serif'
    const name = truncateToWidth(ctx, model.athleteName, width * 0.42)
    ctx.fillText(name, padX, y)
  }

  ctx.fillStyle = '#8fa098'
  ctx.font = '600 30px Manrope, "Segoe UI", sans-serif'
  const footer = model.footer || 'kinesoscore.com'
  const fw = ctx.measureText(footer).width
  ctx.fillText(footer, width - padX - fw, y)
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

function truncateToWidth(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text
  let value = text
  while (value.length > 1 && ctx.measureText(`${value}…`).width > maxWidth) {
    value = value.slice(0, -1)
  }
  return `${value}…`
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(/\s+/)
  let line = ''
  let cursorY = y
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY)
      line = word
      cursorY += lineHeight
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, cursorY)
}
