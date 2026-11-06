/**
 * User Favorites API
 * Part of the API Layer (src/api/)
 * Direct data access for user_favorites table in Supabase.
 */

import { supabase } from './client';
import { DbUserFavorite } from './types';

export interface FavoritesApiResponse<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Fetch all game IDs favorited by a user session.
 */
export async function apiFetchFavorites(
  sessionId: string
): Promise<FavoritesApiResponse<string[]>> {
  try {
    const { data, error } = await supabase
      .from('user_favorites')
      .select('game_id')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    const ids = data ? (data as Array<{ game_id: string }>).map(item => item.game_id) : [];
    return { data: ids, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Failed to fetch user favorites'),
    };
  }
}

/**
 * Add a game to user favorites in Supabase.
 */
export async function apiAddFavorite(
  sessionId: string,
  gameId: string
): Promise<FavoritesApiResponse<DbUserFavorite>> {
  try {
    const { data, error } = await (supabase
      .from('user_favorites') as any)
      .upsert(
        { session_id: sessionId, game_id: gameId },
        { onConflict: 'session_id,game_id' }
      )
      .select()
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: data as DbUserFavorite, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Failed to add favorite'),
    };
  }
}

/**
 * Remove a game from user favorites in Supabase.
 */
export async function apiRemoveFavorite(
  sessionId: string,
  gameId: string
): Promise<FavoritesApiResponse<boolean>> {
  try {
    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('session_id', sessionId)
      .eq('game_id', gameId);

    if (error) {
      return { data: false, error: new Error(error.message) };
    }
    return { data: true, error: null };
  } catch (err) {
    return {
      data: false,
      error: err instanceof Error ? err : new Error('Failed to remove favorite'),
    };
  }
}
