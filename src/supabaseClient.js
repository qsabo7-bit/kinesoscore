import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    /^https?:\/\//.test(supabaseUrl),
)

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase is not configured. Add VITE_SUPABASE_URL (https://….supabase.co) and VITE_SUPABASE_ANON_KEY to .env, then restart npm run dev.',
  )
}

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'public-anon-key',
)
