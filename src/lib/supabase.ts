/**
 * Supabase Client Compatibility Re-export
 * Delegates to the clean API Layer in src/api/client.ts
 */

export {
  supabase,
  isSupabaseConfigured,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  checkSupabaseConnection,
} from '@/api/client';
