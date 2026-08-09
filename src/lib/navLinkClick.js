/**
 * SPA navigation for real <a href> nav links.
 * Allows modifier-key / middle-click to open in a new tab.
 *
 * @param {MouseEvent} event
 * @param {string} tabId
 * @param {(tab: string) => void} [onOpenTab]
 */
export function handleNavLinkClick(event, tabId, onOpenTab) {
  if (
    !onOpenTab ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }
  event.preventDefault()
  onOpenTab(tabId)
}
