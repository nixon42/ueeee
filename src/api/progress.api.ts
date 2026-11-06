/**
 * Game Progress & Sessions API
 * Part of the API Layer (src/api/)
 * Direct data access for game_sessions table in Supabase.
 */

import { supabase } from './client';
import { DbGameSession, DbGameSessionInsert } from './types';

export interface ProgressApiResponse<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Fetch the latest session progress for a given session and game.
 */
export async function apiFetchGameProgress(
  sessionId: string,
  gameId: string
): Promise<ProgressApiResponse<DbGameSession>> {
  try {
    const { data, error } = await supabase
      .from('game_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .eq('game_id', gameId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: data as DbGameSession | null, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Failed to fetch game progress'),
    };
  }
}

/**
 * Fetch all session progress records for a user session.
 */
export async function apiFetchAllSessionProgress(
  sessionId: string
): Promise<ProgressApiResponse<DbGameSession[]>> {
  try {
    const { data, error } = await supabase
      .from('game_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .order('updated_at', { ascending: false });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: (data as DbGameSession[]) || [], error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Failed to fetch session progress list'),
    };
  }
}

/**
 * Save or update game session progress.
 */
export async function apiSaveGameProgress(
  progressData: DbGameSessionInsert
): Promise<ProgressApiResponse<DbGameSession>> {
  try {
    // Check if a record already exists for this session & game
    const { data: existing } = await supabase
      .from('game_sessions')
      .select('id')
      .eq('session_id', progressData.session_id)
      .eq('game_id', progressData.game_id)
      .limit(1)
      .maybeSingle();

    if (existing) {
      const { data, error } = await (supabase
        .from('game_sessions') as any)
        .update({
          current_slide: progressData.current_slide,
          total_slides: progressData.total_slides,
          completed: progressData.completed,
          challenges_completed: progressData.challenges_completed,
          score: progressData.score,
          play_time_seconds: progressData.play_time_seconds,
          updated_at: new Date().toISOString(),
        })
        .eq('id', (existing as { id: string }).id)
        .select()
        .single();

      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as DbGameSession, error: null };
    } else {
      const { data, error } = await (supabase
        .from('game_sessions') as any)
        .insert(progressData)
        .select()
        .single();

      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as DbGameSession, error: null };
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Failed to save game progress'),
    };
  }
}
