#!/usr/bin/env node
/**
 * Authenticated smoke entrypoint for local + CI.
 *
 * Runs scripts/stage8AuthenticatedSmoke.js when credentials are present.
 * In CI (without AUTH_SMOKE_REQUIRED=1), missing credentials skip with exit 0
 * so unit/build jobs stay green until secrets are configured.
 *
 * Required env:
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 *   STAGE8_SMOKE_USER_A_EMAIL / STAGE8_SMOKE_USER_A_PASSWORD
 *   STAGE8_SMOKE_USER_B_EMAIL / STAGE8_SMOKE_USER_B_PASSWORD
 *
 * Run:
 *   npm run test:auth-smoke
 */

const REQUIRED = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'STAGE8_SMOKE_USER_A_EMAIL',
  'STAGE8_SMOKE_USER_A_PASSWORD',
  'STAGE8_SMOKE_USER_B_EMAIL',
  'STAGE8_SMOKE_USER_B_PASSWORD',
]

const missing = REQUIRED.filter((name) => !String(process.env[name] || '').trim())
const required = process.env.AUTH_SMOKE_REQUIRED === '1'

if (missing.length) {
  const msg = `Authenticated smoke missing env: ${missing.join(', ')}`
  if (!required) {
    console.log(`SKIP: ${msg}`)
    console.log(
      'Local: fill STAGE8_SMOKE_* in .env and run npm run test:auth-smoke:local',
    )
    console.log(
      'CI: add the secrets listed in .github/workflows/ci.yml, then set AUTH_SMOKE_REQUIRED=1 to enforce.',
    )
    process.exit(0)
  }
  console.error(msg)
  process.exit(1)
}

await import('./stage8AuthenticatedSmoke.js')
