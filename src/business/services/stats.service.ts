/**
 * Catalog Statistics & Analytics Domain Service
 * Part of Business Logic Layer (src/business/services/)
 * Manages live community play counts, ratings, and atomic RPC game play recording on Supabase.
 */

import { apiFetchAllGameStats, apiRecordGamePlay } from '@/api';
import { GameAnalytics } from '../models';

type StatsListener = (stats: Record<string, GameAnalytics>) => void;

class StatsService {
  private stats: Record<string, GameAnalytics> = {};
  private listeners: Set<StatsListener> = new Set();
  public isLoaded: boolean = false;

  public subscribe(listener: StatsListener): () => void {
    this.listeners.add(listener);
    listener({ ...this.stats });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    const copy = { ...this.stats };
    this.listeners.forEach(listener => listener(copy));
  }

  public getStats(): Record<string, GameAnalytics> {
    return { ...this.stats };
  }

  public getStatForGame(gameId: string): GameAnalytics | undefined {
    return this.stats[gameId];
  }

  /**
   * Fetch live game stats from Supabase and cache in memory.
   */
  public async loadStats(): Promise<Record<string, GameAnalytics>> {
    try {
      const { data, error } = await apiFetchAllGameStats();
      if (!error && data) {
        const mapped: Record<string, GameAnalytics> = {};
        for (const [id, dbStat] of Object.entries(data)) {
          mapped[id] = {
            gameId: dbStat.game_id,
            playCount: Number(dbStat.play_count),
            completionCount: Number(dbStat.completion_count),
            averageRating: Number(dbStat.average_rating),
            totalPlayTime: Number(dbStat.total_play_time),
            updatedAt: dbStat.updated_at,
          };
        }
        this.stats = mapped;
        this.isLoaded = true;
        this.notifyListeners();
        return this.stats;
      }
    } catch (err) {
      console.warn('[StatsService] Failed to load stats from Supabase, using defaults:', err);
    }
    return this.stats;
  }

  /**
   * Record that a game was played or launched.
   */
  public async recordPlay(
    gameId: string,
    completed: boolean = false,
    durationSeconds: number = 60
  ): Promise<void> {
    // Optimistic local update
    const current = this.stats[gameId] || {
      gameId,
      playCount: 100,
      completionCount: 50,
      averageRating: 4.90,
      totalPlayTime: 3600,
      updatedAt: new Date().toISOString(),
    };

    this.stats[gameId] = {
      ...current,
      playCount: current.playCount + 1,
      completionCount: completed ? current.completionCount + 1 : current.completionCount,
      totalPlayTime: current.totalPlayTime + durationSeconds,
      updatedAt: new Date().toISOString(),
    };
    this.notifyListeners();

    // Atomic Supabase RPC call
    apiRecordGamePlay(gameId, completed, durationSeconds).then(res => {
      if (res.data) {
        this.stats[gameId] = {
          gameId: res.data.game_id,
          playCount: Number(res.data.play_count),
          completionCount: Number(res.data.completion_count),
          averageRating: Number(res.data.average_rating),
          totalPlayTime: Number(res.data.total_play_time),
          updatedAt: res.data.updated_at,
        };
        this.notifyListeners();
      }
    }).catch(err => {
      console.warn('[StatsService] Background RPC recording failed:', err);
    });
  }
}

export const statsService = new StatsService();
