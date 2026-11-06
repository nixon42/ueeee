/**
 * React Hook: useGameProgress
 * Part of Business Logic Layer (src/business/hooks/)
 * Manages active deck progress, challenge validation, and offline-first cloud synchronization.
 */

import { useState, useEffect, useCallback } from 'react';
import { progressService } from '../services/progress.service';
import { GameProgress } from '../models';

export function useGameProgress(gameId: string, totalSlides: number = 7): {
  progress: GameProgress | null;
  currentSlide: number;
  isCompleted: boolean;
  completionPercentage: number;
  challengesCompleted: string[];
  recordSlideVisit: (slideIndex: number) => Promise<GameProgress>;
  completeChallenge: (challengeId: string) => Promise<GameProgress>;
  finishGame: (score?: number, durationSeconds?: number) => Promise<GameProgress>;
} {
  const [progress, setProgress] = useState<GameProgress | null>(() =>
    progressService.getLocalProgress(gameId)
  );

  useEffect(() => {
    let isMounted = true;
    progressService.loadProgress(gameId, totalSlides).then(loaded => {
      if (isMounted) setProgress(loaded);
    });
    return () => {
      isMounted = false;
    };
  }, [gameId, totalSlides]);

  const recordSlideVisit = useCallback(
    async (slideIndex: number) => {
      const updated = await progressService.updateProgress(gameId, {
        currentSlide: slideIndex,
        totalSlides,
      });
      setProgress(updated);
      return updated;
    },
    [gameId, totalSlides]
  );

  const completeChallenge = useCallback(
    async (challengeId: string) => {
      const updated = await progressService.recordChallengeCompleted(gameId, challengeId);
      setProgress(updated);
      return updated;
    },
    [gameId]
  );

  const finishGame = useCallback(
    async (score: number = 100, durationSeconds: number = 120) => {
      const updated = await progressService.updateProgress(gameId, {
        isCompleted: true,
        currentSlide: totalSlides,
        score,
        playTimeSeconds: durationSeconds,
      });
      setProgress(updated);
      return updated;
    },
    [gameId, totalSlides]
  );

  return {
    progress,
    currentSlide: progress?.currentSlide ?? 1,
    isCompleted: progress?.isCompleted ?? false,
    completionPercentage: progress?.completionPercentage ?? 0,
    challengesCompleted: progress?.challengesCompleted ?? [],
    recordSlideVisit,
    completeChallenge,
    finishGame,
  };
}
