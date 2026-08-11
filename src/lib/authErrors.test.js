import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { friendlyAuthError } from './authErrors.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')

describe('friendlyAuthError', () => {
  it('maps credential and duplicate-account failures', () => {
    assert.match(
      friendlyAuthError({ message: 'Invalid login credentials' }),
      /incorrect email or password/i,
    )
    assert.match(
      friendlyAuthError({ code: 'invalid_credentials', message: 'x' }),
      /incorrect email or password/i,
    )
    assert.match(
      friendlyAuthError({ message: 'User already registered' }),
      /already exists/i,
    )
    assert.match(
      friendlyAuthError({ code: 'email_exists', message: 'x' }),
      /already exists/i,
    )
  })

  it('maps database signup failures that used to show as Authentication failed', () => {
    assert.match(
      friendlyAuthError(
        { message: 'Database error saving new user' },
        'Authentication failed.',
      ),
      /server issue/i,
    )
    assert.match(
      friendlyAuthError(
        { code: 'unexpected_failure', message: 'Database error saving new user' },
        'Authentication failed.',
      ),
      /server issue/i,
    )
  })

  it('maps confirmation-email and signup-disabled failures', () => {
    assert.match(
      friendlyAuthError({ message: 'Error sending confirmation email' }),
      /confirmation email/i,
    )
    assert.match(
      friendlyAuthError({ message: 'Signups not allowed for this instance' }),
      /unavailable/i,
    )
  })

  it('keeps a caller fallback for unknown errors', () => {
    assert.equal(
      friendlyAuthError({ message: 'totally unknown xyz' }, 'Authentication failed.'),
      'Authentication failed.',
    )
  })
})

describe('handle_new_user signup hardening (022)', () => {
  it('never lets profile insert exceptions abort auth.users creation', () => {
    const sql = readFileSync(
      join(root, 'supabase/migrations/022_handle_new_user_never_block_auth.sql'),
      'utf8',
    )
    assert.match(sql, /create or replace function public\.handle_new_user/i)
    assert.match(sql, /security definer/i)
    assert.match(sql, /when undefined_column then/i)
    assert.match(sql, /when check_violation then/i)
    assert.match(sql, /when others then/i)
    assert.match(sql, /raise warning/i)
    assert.match(sql, /return new/i)
  })
})
