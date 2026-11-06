/**
 * Favorites Domain Service
 * Part of Business Logic Layer (src/business/services/)
 * Manages user game favorites with optimistic local UI response and Supabase cloud persistence.
 */

import { apiFetchFavorites, apiAddFavorite, apiRemoveFavorite } from '@/api';
import { sessionService } from './session.service';

const STORAGE_KEY_FAVORITES = 'ueeee_favorites';

type FavoritesListener = (favorites: string[]) => void;

class FavoritesService {
  private favorites: string[] = [];
  private listeners: Set<FavoritesListener> = new Set();
  public isLoadedFromCloud: boolean = false;

  constructor() {
    this.favorites = this.loadLocalFavorites();
  }

  private loadLocalFavorites(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Storage read error
    }
    return [];
  }

  private saveLocalFavorites(favorites: string[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
    } catch {
      // Storage write error
    }
  }

  private notifyListeners(): void {
    const list = [...this.favorites];
    this.listeners.forEach(listener => listener(list));
  }

  public subscribe(listener: FavoritesListener): () => void {
    this.listeners.add(listener);
    listener([...this.favorites]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getFavorites(): string[] {
    return [...this.favorites];
  }

  public isFavorite(gameId: string): boolean {
    return this.favorites.includes(gameId);
  }

  /**
   * Sync favorites from Supabase on startup and merge with local list.
   */
  public async syncWithCloud(): Promise<string[]> {
    const sessionId = sessionService.getSessionId();
    try {
      const { data, error } = await apiFetchFavorites(sessionId);
      if (!error && data) {
        // Union merge local and cloud favorites
        const mergedSet = new Set([...this.favorites, ...data]);
        this.favorites = Array.from(mergedSet);
        this.saveLocalFavorites(this.favorites);
        this.isLoadedFromCloud = true;
        this.notifyListeners();
        return this.favorites;
      }
    } catch (err) {
      console.warn('[FavoritesService] Cloud sync failed, using local favorites:', err);
    }
    return this.favorites;
  }

  /**
   * Toggle a game's favorite status optimistically and sync to Supabase.
   */
  public async toggleFavorite(gameId: string): Promise<boolean> {
    const sessionId = sessionService.getSessionId();
    const isCurrentlyFav = this.favorites.includes(gameId);

    if (isCurrentlyFav) {
      // Remove
      this.favorites = this.favorites.filter(id => id !== gameId);
      this.saveLocalFavorites(this.favorites);
      this.notifyListeners();

      // Async cloud delete
      apiRemoveFavorite(sessionId, gameId).catch(err => {
        console.warn('[FavoritesService] Failed to remove favorite from Supabase:', err);
      });
      return false;
    } else {
      // Add
      this.favorites = [...this.favorites, gameId];
      this.saveLocalFavorites(this.favorites);
      this.notifyListeners();

      // Async cloud add
      apiAddFavorite(sessionId, gameId).catch(err => {
        console.warn('[FavoritesService] Failed to add favorite to Supabase:', err);
      });
      return true;
    }
  }
}

export const favoritesService = new FavoritesService();
