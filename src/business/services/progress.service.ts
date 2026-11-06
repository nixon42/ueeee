/**
 * Game Progress Domain Service
 * Part of Business Logic Layer (src/business/services/)
 * Encapsulates progression logic, challenge completion validation, input sanitization,
 * safe localStorage caching, and debounced cloud synchronization.
 */

import { apiFetchGameProgress, apiSaveGameProgress } from '@/api';
import { GameProgress } from '../models';
import { sessionService } from './session.service';
import { safeStorage } from '@/lib/safeStorage';

const STORAGE_KEY_PROGRESS_PREFIX = 'ueeee_game_progress_';
const DEBOUNCE_MS = 400;

function sanitizeIdentifier(id: string): string {
  if (!id || typeof id !== 'string') return 'unknown';
  // Allow alphanumeric, dash, and underscore, max 64 characters
  return id.replace(/[^a-zA-Z0-9_-]/g, '').substring(0, 64);
}

function clampNumber(value: number, min: number, max: number): number {
  if (isNaN(value)) return min;
  return Math.max(min, Math.min(max, Math.floor(value)));
}

class ProgressService {
  private syncTimers: Map<string, ReturnType<typeof setTimeout>> = new Map();
  private pendingPayloads: Map<string, Parameters<typeof apiSaveGameProgress>[0]> = new Map();

  /**
   * Calculate completion percentage based on current slide and total slides.
   */
  public calculatePercentage(currentSlide: number, totalSlides: number, completed: boolean): number {
    if (completed) return 100;
    const safeTotal = clampNumber(totalSlides, 1, 50);
    const safeSlide = clampNumber(currentSlide, 1, safeTotal);
    return Math.min(100, Math.round((safeSlide / safeTotal) * 100));
  }

  /**
   * Load progress from localStorage cache (offline-first).
   */
  public getLocalProgress(gameId: string): GameProgress | null {
    const cleanGameId = sanitizeIdentifier(gameId);
    const key = `${STORAGE_KEY_PROGRESS_PREFIX}${cleanGameId}`;
    return safeStorage.getJson<GameProgress | null>(key, null);
  }

  /**
   * Save progress to local cache immediately.
   */
  public saveLocalProgress(progress: GameProgress): void {
    const cleanGameId = sanitizeIdentifier(progress.gameId);
    const key = `${STORAGE_KEY_PROGRESS_PREFIX}${cleanGameId}`;
    safeStorage.setJson(key, progress);
  }

  /**
   * Load progress with cloud sync fallback.
   * Tries local cache first, then asynchronously reconciles with Supabase.
   */
  public async loadProgress(gameId: string, totalSlides: number): Promise<GameProgress> {
    const cleanGameId = sanitizeIdentifier(gameId);
    const safeTotal = clampNumber(totalSlides, 1, 50);
    const sessionId = sessionService.getSessionId();
    const local = this.getLocalProgress(cleanGameId);

    if (local && local.sessionId === sessionId) {
      // Background reconciliation
      this.syncFromCloud(sessionId, cleanGameId, safeTotal).catch(() => {});
      return local;
    }

    // Try cloud fetch if no local progress
    try {
      const { data, error } = await apiFetchGameProgress(sessionId, cleanGameId);
      if (!error && data) {
        const cloudProgress: GameProgress = {
          sessionId: data.session_id,
          gameId: data.game_id,
          currentSlide: clampNumber(data.current_slide, 1, safeTotal),
          totalSlides: clampNumber(data.total_slides, 1, 50),
          isCompleted: Boolean(data.completed),
          completionPercentage: this.calculatePercentage(
            data.current_slide,
            data.total_slides || safeTotal,
            Boolean(data.completed)
          ),
          challengesCompleted: Array.isArray(data.challenges_completed)
            ? data.challenges_completed.map(sanitizeIdentifier).filter(Boolean)
            : [],
          score: clampNumber(data.score, 0, 1_000_000),
          playTimeSeconds: clampNumber(data.play_time_seconds, 0, 86_400),
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
      gameId: cleanGameId,
      currentSlide: 1,
      totalSlides: safeTotal,
      isCompleted: false,
      completionPercentage: this.calculatePercentage(1, safeTotal, false),
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
   * Implements optimistic local update + debounced cloud sync.
   */
  public async updateProgress(
    gameId: string,
    updates: Partial<Omit<GameProgress, 'sessionId' | 'gameId' | 'lastUpdated'>>
  ): Promise<GameProgress> {
    const cleanGameId = sanitizeIdentifier(gameId);
    const sessionId = sessionService.getSessionId();
    const current = this.getLocalProgress(cleanGameId) || {
      sessionId,
      gameId: cleanGameId,
      currentSlide: 1,
      totalSlides: 7,
      isCompleted: false,
      completionPercentage: 14,
      challengesCompleted: [],
      score: 0,
      playTimeSeconds: 0,
      lastUpdated: new Date().toISOString(),
    };

    const nextTotal = clampNumber(updates.totalSlides ?? current.totalSlides, 1, 50);
    const nextSlide = clampNumber(updates.currentSlide ?? current.currentSlide, 1, nextTotal);
    const nextCompleted = Boolean(updates.isCompleted ?? current.isCompleted);
    const nextScore = clampNumber(updates.score ?? current.score, 0, 1_000_000);
    const nextPlayTime = clampNumber(updates.playTimeSeconds ?? current.playTimeSeconds, 0, 86_400);

    const rawChallenges = updates.challengesCompleted ?? current.challengesCompleted;
    const sanitizedChallenges = Array.from(new Set(rawChallenges.map(sanitizeIdentifier).filter(Boolean)));

    const merged: GameProgress = {
      ...current,
      ...updates,
      sessionId,
      gameId: cleanGameId,
      currentSlide: nextSlide,
      totalSlides: nextTotal,
      isCompleted: nextCompleted,
      completionPercentage: this.calculatePercentage(nextSlide, nextTotal, nextCompleted),
      challengesCompleted: sanitizedChallenges,
      score: nextScore,
      playTimeSeconds: nextPlayTime,
      lastUpdated: new Date().toISOString(),
    };

    // 1. Optimistic write to local storage
    this.saveLocalProgress(merged);

    // 2. Debounced asynchronous write to Supabase cloud
    this.queueDebouncedCloudSync(merged);

    return merged;
  }

  /**
   * Debounces Supabase network writes to avoid spamming the database on rapid slide transitions.
   */
  private queueDebouncedCloudSync(progress: GameProgress): void {
    const key = progress.gameId;
    const payload = {
      session_id: progress.sessionId,
      game_id: progress.gameId,
      current_slide: progress.currentSlide,
      total_slides: progress.totalSlides,
      completed: progress.isCompleted,
      challenges_completed: progress.challengesCompleted,
      score: progress.score,
      play_time_seconds: progress.playTimeSeconds,
    };

    this.pendingPayloads.set(key, payload);

    const existingTimer = this.syncTimers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = setTimeout(() => {
      this.syncTimers.delete(key);
      const toSend = this.pendingPayloads.get(key);
      if (toSend) {
        this.pendingPayloads.delete(key);
        apiSaveGameProgress(toSend).catch(err => {
          console.warn('[ProgressService] Background sync to Supabase failed, queued locally:', err);
        });
      }
    }, DEBOUNCE_MS);

    this.syncTimers.set(key, timer);
  }

  /**
   * Flush all pending debounced sync operations immediately (e.g. before unmount or on test).
   */
  public async flushPendingSync(): Promise<void> {
    for (const [key, timer] of this.syncTimers.entries()) {
      clearTimeout(timer);
      const payload = this.pendingPayloads.get(key);
      if (payload) {
        try {
          await apiSaveGameProgress(payload);
        } catch {
          // Suppress
        }
      }
    }
    this.syncTimers.clear();
    this.pendingPayloads.clear();
  }

  /**
   * Helper to mark a specific interactive mini-game challenge as completed.
   */
  public async recordChallengeCompleted(gameId: string, challengeId: string): Promise<GameProgress> {
    const cleanGameId = sanitizeIdentifier(gameId);
    const cleanChallengeId = sanitizeIdentifier(challengeId);
    const current = this.getLocalProgress(cleanGameId);
    const existingChallenges = current?.challengesCompleted || [];

    if (!existingChallenges.includes(cleanChallengeId)) {
      const updatedChallenges = [...existingChallenges, cleanChallengeId];
      return this.updateProgress(cleanGameId, {
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
      const safeTotal = clampNumber(data.total_slides || totalSlides, 1, 50);
      const cloudProgress: GameProgress = {
        sessionId: data.session_id,
        gameId: data.game_id,
        currentSlide: clampNumber(data.current_slide, 1, safeTotal),
        totalSlides: safeTotal,
        isCompleted: Boolean(data.completed),
        completionPercentage: this.calculatePercentage(
          data.current_slide,
          safeTotal,
          Boolean(data.completed)
        ),
        challengesCompleted: Array.isArray(data.challenges_completed)
          ? data.challenges_completed.map(sanitizeIdentifier).filter(Boolean)
          : [],
        score: clampNumber(data.score, 0, 1_000_000),
        playTimeSeconds: clampNumber(data.play_time_seconds, 0, 86_400),
        lastUpdated: data.updated_at,
      };
      this.saveLocalProgress(cloudProgress);
    }
  }
}

export const progressService = new ProgressService();
