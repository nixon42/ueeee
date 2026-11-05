import { createClient } from '@supabase/supabase-js';

// Setup client Supabase yang aman. Jika env belum tersedia, fallback ke mode offline / guest local.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-ueeee.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
