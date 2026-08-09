import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  isFutureLocalDate,
  isWithinUtcShareAsOfWindow,
  localDateKey,
  shiftLocalDateKey,
  utcDateKey,
} from './habitDates.js'

describe('habit date timezone boundaries (Stage 10)', () => {
  it('localDateKey uses local calendar components (not UTC)', () => {
    // 2026-08-09 01:30 UTC → still 2026-08-08 evening in US Central (UTC-5)
    const instant = new Date('2026-08-09T01:30:00.000Z')
    const local = localDateKey(instant)
    const utc = utcDateKey(instant)
    assert.match(local, /^\d{4}-\d{2}-\d{2}$/)
    assert.match(utc, /^\d{4}-\d{2}-\d{2}$/)
    assert.equal(utc, '2026-08-09')
    // In timezones west of UTC this local day is still Aug 8; east may match UTC.
    // The contract under test: local and UTC helpers can disagree near midnight.
    if (instant.getTimezoneOffset() > 0) {
      assert.equal(local, '2026-08-08')
    }
  })

  it('shiftLocalDateKey crosses month boundaries on local calendar days', () => {
    assert.equal(shiftLocalDateKey('2026-03-01', -1), '2026-02-28')
    assert.equal(shiftLocalDateKey('2026-02-28', 1), '2026-03-01')
  })

  it('isFutureLocalDate compares YYYY-MM-DD lexicographically for local days', () => {
    assert.equal(isFutureLocalDate('2026-08-09', '2026-08-08'), true)
    assert.equal(isFutureLocalDate('2026-08-08', '2026-08-08'), false)
    assert.equal(isFutureLocalDate('2026-08-07', '2026-08-08'), false)
  })

  it('UTC±1 share as-of window accepts local today adjacent to UTC today', () => {
    assert.equal(isWithinUtcShareAsOfWindow('2026-08-08', '2026-08-08'), true)
    assert.equal(isWithinUtcShareAsOfWindow('2026-08-07', '2026-08-08'), true)
    assert.equal(isWithinUtcShareAsOfWindow('2026-08-09', '2026-08-08'), true)
    assert.equal(isWithinUtcShareAsOfWindow('2026-08-06', '2026-08-08'), false)
    assert.equal(isWithinUtcShareAsOfWindow('2026-08-10', '2026-08-08'), false)
  })
})
