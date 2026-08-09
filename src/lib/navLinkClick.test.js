import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { handleNavLinkClick } from './navLinkClick.js'

function fakeEvent(overrides = {}) {
  let prevented = false
  return {
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    defaultPrevented: false,
    preventDefault() {
      prevented = true
      this.defaultPrevented = true
    },
    get prevented() {
      return prevented
    },
    ...overrides,
  }
}

describe('handleNavLinkClick', () => {
  it('SPA-navigates on plain left click', () => {
    const calls = []
    const event = fakeEvent()
    handleNavLinkClick(event, 'scoring', (tab) => calls.push(tab))
    assert.equal(event.prevented, true)
    assert.deepEqual(calls, ['scoring'])
  })

  it('allows modifier-key clicks to keep browser default', () => {
    const calls = []
    const event = fakeEvent({ metaKey: true })
    handleNavLinkClick(event, 'scoring', (tab) => calls.push(tab))
    assert.equal(event.prevented, false)
    assert.deepEqual(calls, [])
  })

  it('no-ops without onOpenTab', () => {
    const event = fakeEvent()
    handleNavLinkClick(event, 'home', undefined)
    assert.equal(event.prevented, false)
  })
})
