import { createClient } from '@supabase/supabase-js'

export const isSupabaseConfigured = () => {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  return (
    !!url &&
    !!key &&
    url !== 'https://placeholder.supabase.co' &&
    key !== 'placeholder_service_role_key'
  )
}

export const getSupabaseServerClient = () => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured')
  }
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

// For backward compatibility if it's used elsewhere, though we prefer the getter now.
export const supabase = isSupabaseConfigured()
  ? createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null
