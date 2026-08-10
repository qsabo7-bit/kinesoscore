import { BRAND } from '../data/brand.js'

/**
 * Draw a square share card (PNG blob) for rank / score moments.
 *
 * @param {{
 *   title?: string,
 *   primary: string,
 *   secondary?: string,
 *   footer?: string,
 * }} opts
 * @returns {Promise<Blob>}
 */
export async function renderShareMomentCardBlob({
  title = BRAND.short,
  primary,
  secondary = '',
  footer = 'kinesoscore.com',
}) {
  const size = 1080
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable.')

  // Background
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, '#15201a')
  grad.addColorStop(0.45, '#0f1412')
  grad.addColorStop(1, '#0c1210')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  // Accent wash
  const wash = ctx.createRadialGradient(
    size * 0.7,
    size * 0.2,
    40,
    size * 0.7,
    size * 0.2,
    size * 0.55,
  )
  wash.addColorStop(0, 'rgba(125, 255, 179, 0.18)')
  wash.addColorStop(1, 'rgba(125, 255, 179, 0)')
  ctx.fillStyle = wash
  ctx.fillRect(0, 0, size, size)

  ctx.fillStyle = '#7dffb3'
  ctx.font = '700 42px "Barlow Condensed", "Arial Narrow", sans-serif'
  ctx.fillText(String(title || BRAND.short).toUpperCase(), 96, 160)

  ctx.fillStyle = '#f2f7f4'
  ctx.font = '700 160px "Barlow Condensed", "Arial Narrow", sans-serif'
  wrapText(ctx, String(primary || ''), 96, 420, size - 192, 150)

  if (secondary) {
    ctx.fillStyle = '#b8c4bc'
    ctx.font = '600 44px Manrope, "Segoe UI", sans-serif'
    wrapText(ctx, String(secondary), 96, 720, size - 192, 56)
  }

  ctx.fillStyle = '#93a39b'
  ctx.font = '600 36px Manrope, "Segoe UI", sans-serif'
  ctx.fillText(String(footer || 'kinesoscore.com'), 96, size - 96)

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (value) => (value ? resolve(value) : reject(new Error('Could not export image.'))),
      'image/png',
    )
  })
  return blob
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
