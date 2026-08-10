import { BRAND } from '../data/brand.js'
import { AWARD_LABELS } from './fitnessAwards.js'

const TIER_METALS = {
  bronze: { fill: '#c48a4a', glow: 'rgba(196, 138, 74, 0.35)' },
  silver: { fill: '#c9d2cc', glow: 'rgba(201, 210, 204, 0.3)' },
  gold: { fill: '#e2b84a', glow: 'rgba(226, 184, 74, 0.38)' },
  diamond: { fill: '#9fd8ff', glow: 'rgba(159, 216, 255, 0.4)' },
}

/**
 * Draw a square share card (PNG blob) for rank / score moments.
 *
 * @param {{
 *   title?: string,
 *   primary: string,
 *   secondary?: string,
 *   footer?: string,
 *   athleteName?: string | null,
 *   awards?: {
 *     strength?: string | null,
 *     running?: string | null,
 *     crown?: boolean,
 *   } | null,
 * }} opts
 * @returns {Promise<Blob>}
 */
export async function renderShareMomentCardBlob({
  title = 'This Week',
  primary,
  secondary = '',
  footer = 'kinesoscore.com',
  athleteName = null,
  awards = null,
}) {
  const size = 1080
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable.')

  if (typeof document !== 'undefined' && document.fonts?.ready) {
    try {
      await document.fonts.ready
    } catch {
      // continue with fallbacks
    }
  }

  paintBackground(ctx, size)
  paintFrame(ctx, size)

  // Brand lockup
  ctx.fillStyle = '#7dffb3'
  ctx.font = '700 34px "Barlow Condensed", "Arial Narrow", sans-serif'
  ctx.fillText(BRAND.short.toUpperCase(), 96, 118)

  ctx.strokeStyle = 'rgba(125, 255, 179, 0.55)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(96, 138)
  ctx.lineTo(280, 138)
  ctx.stroke()

  const name = String(athleteName || '').trim()
  let cursorY = 210

  if (name) {
    ctx.fillStyle = '#f2f7f4'
    ctx.font = '700 48px Manrope, "Segoe UI", sans-serif'
    const nameLine = truncateToWidth(ctx, name, size - 192)
    ctx.fillText(nameLine, 96, cursorY)
    cursorY += 56
  }

  ctx.fillStyle = 'rgba(125, 255, 179, 0.9)'
  ctx.font = '700 38px "Barlow Condensed", "Arial Narrow", sans-serif'
  ctx.fillText(String(title || 'This Week').toUpperCase(), 96, cursorY)
  cursorY += 36

  // Hero primary
  const primaryText = String(primary || '')
  const primaryFontSize = primaryText.length <= 4 ? 210 : primaryText.length <= 8 ? 160 : 120
  ctx.fillStyle = '#f2f7f4'
  ctx.font = `700 ${primaryFontSize}px "Barlow Condensed", "Arial Narrow", sans-serif`
  const primaryY = Math.max(cursorY + primaryFontSize * 0.85, 520)
  wrapText(ctx, primaryText, 96, primaryY, size - 192, primaryFontSize * 0.92)

  // Accent underline under primary block
  const underlineY = primaryY + 36
  const accent = ctx.createLinearGradient(96, underlineY, 520, underlineY)
  accent.addColorStop(0, 'rgba(125, 255, 179, 0.85)')
  accent.addColorStop(1, 'rgba(125, 255, 179, 0)')
  ctx.strokeStyle = accent
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(96, underlineY)
  ctx.lineTo(520, underlineY)
  ctx.stroke()

  if (secondary) {
    ctx.fillStyle = '#c5d0c9'
    ctx.font = '600 42px Manrope, "Segoe UI", sans-serif'
    wrapText(ctx, String(secondary), 96, underlineY + 70, size - 192, 52)
  }

  paintAwardRow(ctx, awards, 96, size - 250)

  ctx.fillStyle = '#8fa098'
  ctx.font = '600 32px Manrope, "Segoe UI", sans-serif'
  ctx.fillText(String(footer || 'kinesoscore.com'), 96, size - 88)

  ctx.fillStyle = 'rgba(125, 255, 179, 0.35)'
  ctx.font = '600 28px Manrope, "Segoe UI", sans-serif'
  const tag = 'Track. Compete. Improve.'
  const tagWidth = ctx.measureText(tag).width
  ctx.fillText(tag, size - 96 - tagWidth, size - 88)

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (value) =>
        value ? resolve(value) : reject(new Error('Could not export image.')),
      'image/png',
    )
  })
  return blob
}

function paintBackground(ctx, size) {
  const grad = ctx.createLinearGradient(0, 0, size * 0.2, size)
  grad.addColorStop(0, '#1a2922')
  grad.addColorStop(0.4, '#121a17')
  grad.addColorStop(1, '#0b100e')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  const wash = ctx.createRadialGradient(
    size * 0.78,
    size * 0.18,
    20,
    size * 0.72,
    size * 0.22,
    size * 0.62,
  )
  wash.addColorStop(0, 'rgba(125, 255, 179, 0.22)')
  wash.addColorStop(0.45, 'rgba(125, 255, 179, 0.06)')
  wash.addColorStop(1, 'rgba(125, 255, 179, 0)')
  ctx.fillStyle = wash
  ctx.fillRect(0, 0, size, size)

  const wash2 = ctx.createRadialGradient(
    size * 0.15,
    size * 0.85,
    10,
    size * 0.2,
    size * 0.8,
    size * 0.45,
  )
  wash2.addColorStop(0, 'rgba(90, 160, 220, 0.1)')
  wash2.addColorStop(1, 'rgba(90, 160, 220, 0)')
  ctx.fillStyle = wash2
  ctx.fillRect(0, 0, size, size)

  // Subtle diagonal texture
  ctx.save()
  ctx.strokeStyle = 'rgba(242, 247, 244, 0.03)'
  ctx.lineWidth = 1
  for (let i = -size; i < size * 2; i += 28) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i + size, size)
    ctx.stroke()
  }
  ctx.restore()

  // Vignette
  const vignette = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.35,
    size / 2,
    size / 2,
    size * 0.72,
  )
  vignette.addColorStop(0, 'rgba(0,0,0,0)')
  vignette.addColorStop(1, 'rgba(0,0,0,0.45)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, size, size)
}

function paintFrame(ctx, size) {
  const inset = 36
  ctx.strokeStyle = 'rgba(125, 255, 179, 0.22)'
  ctx.lineWidth = 2
  ctx.strokeRect(inset, inset, size - inset * 2, size - inset * 2)

  ctx.strokeStyle = 'rgba(242, 247, 244, 0.08)'
  ctx.lineWidth = 1
  ctx.strokeRect(inset + 14, inset + 14, size - (inset + 14) * 2, size - (inset + 14) * 2)

  // Corner ticks
  const tick = 28
  ctx.strokeStyle = 'rgba(125, 255, 179, 0.55)'
  ctx.lineWidth = 3
  const corners = [
    [inset, inset],
    [size - inset, inset],
    [inset, size - inset],
    [size - inset, size - inset],
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

function paintAwardRow(ctx, awards, x, y) {
  if (!awards) return
  const chips = []
  if (awards.crown) {
    chips.push({ label: 'Crown', tier: 'diamond', kind: 'crown' })
  }
  if (awards.strength && TIER_METALS[awards.strength]) {
    chips.push({
      label: `${AWARD_LABELS[awards.strength] || awards.strength} Strength`,
      tier: awards.strength,
      kind: 'strength',
    })
  }
  if (awards.running && TIER_METALS[awards.running]) {
    chips.push({
      label: `${AWARD_LABELS[awards.running] || awards.running} Running`,
      tier: awards.running,
      kind: 'running',
    })
  }
  if (!chips.length) return

  let cursorX = x
  ctx.font = '700 26px Manrope, "Segoe UI", sans-serif'

  for (const chip of chips) {
    const metal = TIER_METALS[chip.tier] || TIER_METALS.bronze
    const padX = 22
    const textW = ctx.measureText(chip.label).width
    const w = textW + padX * 2 + 18
    const h = 48

    ctx.fillStyle = 'rgba(15, 20, 18, 0.72)'
    roundRect(ctx, cursorX, y, w, h, 8)
    ctx.fill()

    ctx.strokeStyle = metal.fill
    ctx.globalAlpha = 0.85
    ctx.lineWidth = 1.5
    roundRect(ctx, cursorX, y, w, h, 8)
    ctx.stroke()
    ctx.globalAlpha = 1

    // Dot
    ctx.fillStyle = metal.fill
    ctx.beginPath()
    ctx.arc(cursorX + 20, y + h / 2, 5, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#f2f7f4'
    ctx.fillText(chip.label, cursorX + 34, y + 31)

    cursorX += w + 14
  }
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

/**
 * Download or native-share a moment card.
 * @param {Blob} blob
 * @param {string} [filename]
 */
export async function shareOrDownloadMomentCard(
  blob,
  filename = 'kinesoscore-moment.png',
) {
  const file = new File([blob], filename, { type: 'image/png' })
  if (
    typeof navigator !== 'undefined' &&
    navigator.canShare &&
    navigator.canShare({ files: [file] })
  ) {
    await navigator.share({
      files: [file],
      title: BRAND.short,
      text: `My ${BRAND.short} moment`,
    })
    return 'shared'
  }

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
  return 'downloaded'
}
