/**
 * Game Catalog Statistics API
 * Part of the API Layer (src/api/)
 * Direct data access for game_stats table & record_game_play RPC in Supabase.
 */

import { supabase } from './client';
import { DbGameStat } from './types';

export interface StatsApiResponse<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Fetch all game stats from Supabase.
 */
export async function apiFetchAllGameStats(): Promise<StatsApiResponse<Record<string, DbGameStat>>> {
  try {
    const { data, error } = await supabase.from('game_stats').select('*');

    if (error) {
      return { data: null, error: new Error(error.message) };
    }

    const statsMap: Record<string, DbGameStat> = {};
    if (data) {
      for (const stat of (data as any[])) {
        statsMap[stat.game_id] = stat as DbGameStat;
      }
    }
    return { data: statsMap, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Failed to fetch game stats'),
    };
  }
}

/**
 * Fetch stats for a specific game ID.
 */
export async function apiFetchGameStat(
  gameId: string
): Promise<StatsApiResponse<DbGameStat>> {
  try {
    const { data, error } = await supabase
      .from('game_stats')
      .select('*')
      .eq('game_id', gameId)
      .maybeSingle();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: data as DbGameStat | null, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Failed to fetch stat for game: ' + gameId),
    };
  }
}

/**
 * Atomically record game play, completion, and duration via Supabase RPC.
 */
export async function apiRecordGamePlay(
  gameId: string,
  completed: boolean = false,
  durationSeconds: number = 60
): Promise<StatsApiResponse<DbGameStat>> {
  try {
    const { data, error } = await (supabase as any).rpc('record_game_play', {
      p_game_id: gameId,
      p_completed: completed,
      p_duration: durationSeconds,
    });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: data as DbGameStat, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Failed to record game play RPC'),
    };
  }
}
