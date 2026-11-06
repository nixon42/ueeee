/**
 * React Hook: useGameStats
 * Part of Business Logic Layer (src/business/hooks/)
 * Provides reactive game catalog stats, ratings, and atomic game play incrementing via Supabase.
 */

import { useState, useEffect, useCallback } from 'react';
import { statsService } from '../services/stats.service';
import { GameAnalytics } from '../models';

export function useGameStats(): {
  stats: Record<string, GameAnalytics>;
  getStat: (gameId: string) => GameAnalytics | undefined;
  recordPlay: (gameId: string, completed?: boolean, durationSeconds?: number) => Promise<void>;
  refreshStats: () => Promise<Record<string, GameAnalytics>>;
} {
  const [stats, setStats] = useState<Record<string, GameAnalytics>>(() => statsService.getStats());

  useEffect(() => {
    const unsubscribe = statsService.subscribe(setStats);
    statsService.loadStats().catch(() => {});
    return () => unsubscribe();
  }, []);

  const getStat = useCallback(
    (gameId: string) => statsService.getStatForGame(gameId),
    []
  );

  const recordPlay = useCallback(
    async (gameId: string, completed?: boolean, durationSeconds?: number) => {
      return statsService.recordPlay(gameId, completed, durationSeconds);
    },
    []
  );

  const refreshStats = useCallback(async () => {
    return statsService.loadStats();
  }, []);

  return {
    stats,
    getStat,
    recordPlay,
    refreshStats,
  };
}
