import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { validateFirstName } from './profileName.js'

describe('validateFirstName', () => {
  it('accepts normal personal names', () => {
    assert.equal(validateFirstName('Quinn').ok, true)
    assert.equal(validateFirstName('Mary-Jane').ok, true)
    assert.equal(validateFirstName("O'Neil").ok, true)
    assert.equal(validateFirstName('  Anna  ').name, 'Anna')
  })

  it('rejects empty, overlong, and junk characters', () => {
    assert.equal(validateFirstName('').ok, false)
    assert.equal(validateFirstName('A'.repeat(41)).ok, false)
    assert.equal(validateFirstName('Name!!!').ok, false)
    assert.equal(validateFirstName('Bad_Name').ok, false)
  })

  it('rejects blocked abuse terms', () => {
    assert.equal(validateFirstName('fuck').ok, false)
    assert.equal(validateFirstName('shit head').ok, false)
  })
})
