/**
 * Game Progress Domain Service
 * Part of Business Logic Layer (src/business/services/)
 * Encapsulates progression logic, challenge completion validation, and offline-first cloud synchronization.
 */

import { apiFetchGameProgress, apiSaveGameProgress } from '@/api';
import { GameProgress } from '../models';
import { sessionService } from './session.service';

const STORAGE_KEY_PROGRESS_PREFIX = 'ueeee_game_progress_';

class ProgressService {
  /**
   * Calculate completion percentage based on current slide and total slides.
   */
  public calculatePercentage(currentSlide: number, totalSlides: number, completed: boolean): number {
    if (completed) return 100;
    if (totalSlides <= 0) return 0;
    const clampedSlide = Math.max(1, Math.min(totalSlides, currentSlide));
    return Math.min(100, Math.round((clampedSlide / totalSlides) * 100));
  }

  /**
   * Load progress from localStorage cache (offline-first).
   */
  public getLocalProgress(gameId: string): GameProgress | null {
    try {
      const key = `${STORAGE_KEY_PROGRESS_PREFIX}${gameId}`;
      const cached = localStorage.getItem(key);
      if (cached) {
        return JSON.parse(cached) as GameProgress;
      }
    } catch {
      // Local storage read error
    }
    return null;
  }

  /**
   * Save progress to local cache immediately.
   */
  public saveLocalProgress(progress: GameProgress): void {
    try {
      const key = `${STORAGE_KEY_PROGRESS_PREFIX}${progress.gameId}`;
      localStorage.setItem(key, JSON.stringify(progress));
    } catch {
      // Local storage write error
    }
  }

  /**
   * Load progress with cloud sync fallback.
   * Tries local cache first, then asynchronously reconciles with Supabase.
   */
  public async loadProgress(gameId: string, totalSlides: number): Promise<GameProgress> {
    const sessionId = sessionService.getSessionId();
    const local = this.getLocalProgress(gameId);

    if (local && local.sessionId === sessionId) {
      // Try background refresh from cloud
      this.syncFromCloud(sessionId, gameId, totalSlides).catch(() => {});
      return local;
    }

    // Try cloud fetch if no local progress
    try {
      const { data, error } = await apiFetchGameProgress(sessionId, gameId);
      if (!error && data) {
        const cloudProgress: GameProgress = {
          sessionId: data.session_id,
          gameId: data.game_id,
          currentSlide: data.current_slide,
          totalSlides: data.total_slides,
          isCompleted: data.completed,
          completionPercentage: this.calculatePercentage(
            data.current_slide,
            data.total_slides,
            data.completed
          ),
          challengesCompleted: Array.isArray(data.challenges_completed)
            ? data.challenges_completed
            : [],
          score: data.score,
          playTimeSeconds: data.play_time_seconds,
          lastUpdated: data.updated_at,
        };
        this.saveLocalProgress(cloudProgress);
        return cloudProgress;
      }
    } catch {
      // Ignore network errors and return default
    }

    // Default fresh progress
    const fresh: GameProgress = {
      sessionId,
      gameId,
      currentSlide: 1,
      totalSlides,
      isCompleted: false,
      completionPercentage: this.calculatePercentage(1, totalSlides, false),
      challengesCompleted: [],
      score: 0,
      playTimeSeconds: 0,
      lastUpdated: new Date().toISOString(),
    };
    this.saveLocalProgress(fresh);
    return fresh;
  }

  /**
   * Update progress for a slide step or mini-game completion.
   */
  public async updateProgress(
    gameId: string,
    updates: Partial<Omit<GameProgress, 'sessionId' | 'gameId' | 'lastUpdated'>>
  ): Promise<GameProgress> {
    const sessionId = sessionService.getSessionId();
    const current = this.getLocalProgress(gameId) || {
      sessionId,
      gameId,
      currentSlide: 1,
      totalSlides: 7,
      isCompleted: false,
      completionPercentage: 14,
      challengesCompleted: [],
      score: 0,
      playTimeSeconds: 0,
      lastUpdated: new Date().toISOString(),
    };

    const nextSlide = updates.currentSlide ?? current.currentSlide;
    const nextTotal = updates.totalSlides ?? current.totalSlides;
    const nextCompleted = updates.isCompleted ?? current.isCompleted;

    const merged: GameProgress = {
      ...current,
      ...updates,
      sessionId,
      gameId,
      currentSlide: nextSlide,
      totalSlides: nextTotal,
      isCompleted: nextCompleted,
      completionPercentage: this.calculatePercentage(nextSlide, nextTotal, nextCompleted),
      challengesCompleted: updates.challengesCompleted ?? current.challengesCompleted,
      lastUpdated: new Date().toISOString(),
    };

    // 1. Optimistic write to local cache
    this.saveLocalProgress(merged);

    // 2. Asynchronous write to Supabase
    apiSaveGameProgress({
      session_id: merged.sessionId,
      game_id: merged.gameId,
      current_slide: merged.currentSlide,
      total_slides: merged.totalSlides,
      completed: merged.isCompleted,
      challenges_completed: merged.challengesCompleted,
      score: merged.score,
      play_time_seconds: merged.playTimeSeconds,
    }).catch(err => {
      console.warn('[ProgressService] Background sync to Supabase failed, queued locally:', err);
    });

    return merged;
  }

  /**
   * Helper to mark a specific interactive mini-game challenge as completed.
   */
  public async recordChallengeCompleted(gameId: string, challengeId: string): Promise<GameProgress> {
    const current = this.getLocalProgress(gameId);
    const existingChallenges = current?.challengesCompleted || [];

    if (!existingChallenges.includes(challengeId)) {
      const updatedChallenges = [...existingChallenges, challengeId];
      return this.updateProgress(gameId, {
        challengesCompleted: updatedChallenges,
        score: (current?.score || 0) + 100,
      });
    }

    return current!;
  }

  private async syncFromCloud(
    sessionId: string,
    gameId: string,
    totalSlides: number
  ): Promise<void> {
    const { data } = await apiFetchGameProgress(sessionId, gameId);
    if (data) {
      const cloudProgress: GameProgress = {
        sessionId: data.session_id,
        gameId: data.game_id,
        currentSlide: data.current_slide,
        totalSlides: data.total_slides || totalSlides,
        isCompleted: data.completed,
        completionPercentage: this.calculatePercentage(
          data.current_slide,
          data.total_slides || totalSlides,
          data.completed
        ),
        challengesCompleted: Array.isArray(data.challenges_completed)
          ? data.challenges_completed
          : [],
        score: data.score,
        playTimeSeconds: data.play_time_seconds,
        lastUpdated: data.updated_at,
      };
      this.saveLocalProgress(cloudProgress);
    }
  }
}

export const progressService = new ProgressService();
