import { describe, test, expect, beforeEach } from 'bun:test';
import {
  sessionService,
  progressService,
  favoritesService,
  statsService,
  teacherService,
  syncService,
} from '../src/business';
import {
  isSupabaseConfigured,
  SUPABASE_URL,
  checkSupabaseConnection,
  apiFetchAllGameStats,
} from '../src/api';
import fs from 'fs';
import path from 'path';

describe('Supabase Clean Architecture & Integration Verification', () => {
  describe('Layer 1: API Layer (src/api/)', () => {
    test('Supabase client is configured with production project URL', () => {
      expect(isSupabaseConfigured).toBe(true);
      expect(SUPABASE_URL).toContain('supabase.co');
      expect(SUPABASE_URL).not.toContain('placeholder');
    });

    test('All API modules export clean function signatures without React dependencies', async () => {
      const apiIndexPath = path.resolve(import.meta.dir, '../src/api/index.ts');
      const apiContent = fs.readFileSync(apiIndexPath, 'utf-8');

      // Invariant: API layer must not depend on React or UI components
      expect(apiContent).not.toContain('react');
      expect(apiContent).not.toContain('useState');
      expect(apiContent).not.toContain('useEffect');
    });

    test('Direct health check against Supabase returns valid latency measurement', async () => {
      const res = await checkSupabaseConnection();
      expect(typeof res.connected).toBe('boolean');
      expect(typeof res.latencyMs).toBe('number');
      expect(res.latencyMs).toBeGreaterThanOrEqual(0);
    }, { timeout: 15000 });

    test('apiFetchAllGameStats retrieves seed statistics from Supabase database', async () => {
      const res = await apiFetchAllGameStats();
      expect(res.error).toBeNull();
      expect(res.data).not.toBeNull();
      if (res.data) {
        expect(res.data['ular-tangga-sains']).toBeDefined();
        expect(res.data['ular-tangga-sains'].play_count).toBeGreaterThan(0);
        expect(Number(res.data['ular-tangga-sains'].average_rating)).toBeGreaterThanOrEqual(4.0);
      }
    }, { timeout: 15000 });
  });

  describe('Layer 2: Business Logic Layer (src/business/)', () => {
    test('SessionService initializes persistent guest session ID', () => {
      const id = sessionService.getSessionId();
      expect(typeof id).toBe('string');
      expect(id.startsWith('guest_')).toBe(true);

      const profile = sessionService.getProfile();
      expect(profile.sessionId).toBe(id);
      expect(profile.role).toBe('guest');

      // Profile updates
      const updated = sessionService.updateProfile({ displayName: 'Guru Teladan' });
      expect(updated.displayName).toBe('Guru Teladan');
    });

    test('ProgressService calculates accurate completion percentages', () => {
      // 1 of 7 slides (not completed) -> ~14%
      expect(progressService.calculatePercentage(1, 7, false)).toBe(14);
      // 4 of 8 slides -> 50%
      expect(progressService.calculatePercentage(4, 8, false)).toBe(50);
      // 8 of 8 slides -> 100%
      expect(progressService.calculatePercentage(8, 8, false)).toBe(100);
      // Completed flag forced -> 100%
      expect(progressService.calculatePercentage(2, 8, true)).toBe(100);
    });

    test('ProgressService updates and stores progress offline-first', async () => {
      const gameId = 'ular-tangga-sains-test';
      const progress = await progressService.updateProgress(gameId, {
        currentSlide: 3,
        totalSlides: 7,
      });

      expect(progress.gameId).toBe(gameId);
      expect(progress.currentSlide).toBe(3);
      expect(progress.completionPercentage).toBe(43);

      // Challenge completion
      const withChallenge = await progressService.recordChallengeCompleted(gameId, 'seq-water-cycle');
      expect(withChallenge.challengesCompleted).toContain('seq-water-cycle');
      expect(withChallenge.score).toBeGreaterThan(0);
    });

    test('FavoritesService provides optimistic UI toggle and state persistence', async () => {
      const gameId = 'catur-taktik-logika-fav-test';
      const initialFav = favoritesService.isFavorite(gameId);

      const nextFav = await favoritesService.toggleFavorite(gameId);
      expect(nextFav).toBe(!initialFav);
      expect(favoritesService.isFavorite(gameId)).toBe(nextFav);

      // Toggle back to clean up
      const reverted = await favoritesService.toggleFavorite(gameId);
      expect(reverted).toBe(initialFav);
    });

    test('StatsService records optimistic game plays and triggers atomic updates', async () => {
      const gameId = 'ular-tangga-sains';
      const initialStat = statsService.getStatForGame(gameId);
      const initialCount = initialStat ? initialStat.playCount : 100;

      await statsService.recordPlay(gameId, false, 30);
      const updatedStat = statsService.getStatForGame(gameId);
      expect(updatedStat?.playCount).toBeGreaterThanOrEqual(initialCount + 1);
    });

    test('TeacherService records classroom reflections with local & cloud sync', async () => {
      const note = await teacherService.addNote(
        'ular-tangga-sains',
        4,
        'Fotosintesis & Reaksi Terang',
        'Siswa sangat antusias saat menyusun urutan klorofil dan CO2.'
      );

      expect(note.topic).toBe('Fotosintesis & Reaksi Terang');
      expect(note.notes).toContain('klorofil');

      const allNotes = teacherService.getNotesForGame('ular-tangga-sains');
      expect(allNotes.some(n => n.id === note.id)).toBe(true);

      // Cleanup
      await teacherService.deleteNote(note.id);
      expect(teacherService.getNotes().some(n => n.id === note.id)).toBe(false);
    });

    test('SyncService monitors network state and latency', () => {
      const state = syncService.getState();
      expect(state).toBeDefined();
      expect(['online', 'offline', 'syncing', 'error']).toContain(state.status);
      expect(typeof state.isOnline).toBe('boolean');
    });
  });

  describe('Layer 3: UI Layer Isolation & Architectural Boundary Checks', () => {
    test('UI components in src/components/ do not import raw @supabase/supabase-js directly', () => {
      const componentsDir = path.resolve(import.meta.dir, '../src/components');
      const files = getAllFiles(componentsDir);

      for (const file of files) {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          const content = fs.readFileSync(file, 'utf-8');
          // Invariant: UI components must use the business layer, not raw supabase client directly
          expect(content).not.toContain("from '@supabase/supabase-js'");
        }
      }
    });

    test('UI components in src/components/ do not call src/api directly (strict clean architecture)', () => {
      const componentsDir = path.resolve(import.meta.dir, '../src/components');
      const files = getAllFiles(componentsDir);

      for (const file of files) {
        if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          const content = fs.readFileSync(file, 'utf-8');
          expect(content).not.toContain("from '@/api'");
          expect(content).not.toContain("from '../api'");
          expect(content).not.toContain("from '../../api'");
        }
      }
    });
  });
});

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}
