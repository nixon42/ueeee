/**
 * Supabase Client & Connection Manager
 * Part of the API Layer (src/api/)
 * Direct interaction with Supabase API client instance.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types';

// Fallback constants when environment variables are not injected
const DEFAULT_SUPABASE_URL = 'https://placeholder.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'placeholder-anon-key';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes('placeholder')
);

// Typed Supabase client
export const supabase: SupabaseClient<Database> = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    db: {
      schema: 'public',
    },
  }
);

/**
 * Health check to verify live connectivity with Supabase backend.
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  latencyMs: number;
  error?: string;
}> {
  if (!isSupabaseConfigured) {
    return { connected: false, latencyMs: 0, error: 'Supabase credentials not configured' };
  }

  const start = performance.now();
  try {
    const { error } = await supabase.from('game_stats').select('game_id').limit(1);
    const latencyMs = Math.round(performance.now() - start);

    if (error) {
      return { connected: false, latencyMs, error: error.message };
    }
    return { connected: true, latencyMs };
  } catch (err) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      connected: false,
      latencyMs,
      error: err instanceof Error ? err.message : 'Unknown connection error',
    };
  }
}
