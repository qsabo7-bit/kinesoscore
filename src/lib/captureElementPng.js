import { toCanvas } from 'html-to-image'

/**
 * Capture a DOM node as a high-fidelity PNG blob (score + badges).
 * Freezes animations and softens filter effects that html-to-image mangled.
 *
 * @param {HTMLElement | null | undefined} element
 * @param {{
 *   pixelRatio?: number,
 *   backgroundColor?: string,
 * }} [opts]
 * @returns {Promise<Blob>}
 */
export async function captureElementPng(element, opts = {}) {
  if (!element || !(element instanceof HTMLElement)) {
    throw new Error('Nothing to capture.')
  }

  if (typeof document !== 'undefined' && document.fonts?.ready) {
    try {
      await document.fonts.ready
    } catch {
      // continue
    }
  }

  // Settle layout; wait out enter animations (~420ms).
  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(resolve, 480)
      })
    })
  })

  const backgroundColor = opts.backgroundColor ?? '#0f1412'
  const pixelRatio = opts.pixelRatio ?? 3

  const canvas = await toCanvas(element, {
    cacheBust: true,
    pixelRatio,
    backgroundColor,
    skipFonts: false,
    preferredFontFormat: 'woff2',
    filter: (node) => {
      if (!(node instanceof Element)) return true
      if (node instanceof HTMLElement && node.dataset?.captureIgnore != null) {
        return false
      }
      return true
    },
    onclone: (_document, cloned) => {
      cloned.classList.add('is-share-capture-root')
      cloned.querySelectorAll('.fpc-award-badge').forEach((badge) => {
        if (!(badge instanceof HTMLElement)) return
        badge.style.animation = 'none'
        badge.style.transition = 'none'
        badge.style.opacity = '1'
        badge.style.transform = 'none'
        badge.style.filter = 'none'
      })
      cloned.querySelectorAll('.fpc-award-crest, .fpc-award-emblem').forEach((node) => {
        if (!(node instanceof HTMLElement)) return
        // drop-shadow filters rasterize poorly; box-shadow survives better.
        node.style.filter = 'none'
      })
      cloned.querySelectorAll('.fpc-award-crest').forEach((node) => {
        if (!(node instanceof HTMLElement)) return
        node.style.boxShadow = '0 14px 22px rgba(0, 0, 0, 0.42)'
      })
      cloned.querySelectorAll('.fpc-score-ring').forEach((node) => {
        if (!(node instanceof HTMLElement)) return
        node.style.transform = 'none'
        node.style.transition = 'none'
      })
      // Ensure SVG gradient IDs stay unique inside the clone.
      cloned.querySelectorAll('linearGradient[id]').forEach((grad, index) => {
        const oldId = grad.getAttribute('id')
        if (!oldId) return
        const nextId = `${oldId}-capture-${index}`
        grad.setAttribute('id', nextId)
        const svg = grad.closest('svg')
        svg?.querySelectorAll(`[stroke="url(#${oldId})"]`).forEach((el) => {
          el.setAttribute('stroke', `url(#${nextId})`)
        })
        svg?.querySelectorAll(`[fill="url(#${oldId})"]`).forEach((el) => {
          el.setAttribute('fill', `url(#${nextId})`)
        })
      })
    },
  })

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result)
        else reject(new Error('Could not capture share image.'))
      },
      'image/png',
      1,
    )
  })

  return blob
}
