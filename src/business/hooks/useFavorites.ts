/**
 * React Hook: useFavorites
 * Part of Business Logic Layer (src/business/hooks/)
 * Provides reactive game favorites with optimistic UI updates and Supabase cloud persistence.
 */

import { useState, useEffect, useCallback } from 'react';
import { favoritesService } from '../services/favorites.service';

export function useFavorites(): {
  favorites: string[];
  isFavorite: (gameId: string) => boolean;
  toggleFavorite: (gameId: string) => Promise<boolean>;
  syncWithCloud: () => Promise<string[]>;
} {
  const [favorites, setFavorites] = useState<string[]>(() => favoritesService.getFavorites());

  useEffect(() => {
    const unsubscribe = favoritesService.subscribe(setFavorites);
    favoritesService.syncWithCloud().catch(() => {});
    return () => unsubscribe();
  }, []);

  const isFavorite = useCallback(
    (gameId: string) => favorites.includes(gameId),
    [favorites]
  );

  const toggleFavorite = useCallback(async (gameId: string) => {
    return favoritesService.toggleFavorite(gameId);
  }, []);

  const syncWithCloud = useCallback(async () => {
    return favoritesService.syncWithCloud();
  }, []);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    syncWithCloud,
  };
}
