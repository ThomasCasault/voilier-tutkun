import { createBrowserClient } from '@supabase/ssr'

// Client navigateur (composants client)
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Supabase env vars manquantes')
  }
  return createBrowserClient(url, key)
}
