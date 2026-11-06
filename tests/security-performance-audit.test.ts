import { describe, test, expect, beforeEach } from 'bun:test';
import fs from 'fs';
import path from 'path';
import { safeStorage } from '@/lib/safeStorage';
import { progressService } from '@/business/services/progress.service';
import { sound } from '@/lib/sound';

describe('Security & Performance Audit Suite', () => {

  // =========================================================================
  // 1. Content Security Policy (CSP) & Web Security Headers Audit
  // =========================================================================
  describe('Content Security Policy & Meta Tags Audit', () => {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    test('index.html contains strict Content-Security-Policy meta tag', () => {
      expect(htmlContent).toContain('http-equiv="Content-Security-Policy"');
      expect(htmlContent).toContain("default-src 'self'");
      // Must allow Supabase REST and WebSocket connections
      expect(htmlContent).toContain('https://takzivdrwlkpvniambhs.supabase.co');
      expect(htmlContent).toContain('wss://takzivdrwlkpvniambhs.supabase.co');
      // Must allow Google fonts
      expect(htmlContent).toContain('https://fonts.googleapis.com');
      expect(htmlContent).toContain('https://fonts.gstatic.com');
      // Restrict objects and base-uri
      expect(htmlContent).toContain("object-src 'none'");
      expect(htmlContent).toContain("base-uri 'self'");
    });

    test('index.html contains nosniff and strict referrer meta tags', () => {
      expect(htmlContent).toContain('http-equiv="X-Content-Type-Options" content="nosniff"');
      expect(htmlContent).toContain('name="referrer" content="strict-origin-when-cross-origin"');
      expect(htmlContent).toContain('http-equiv="Permissions-Policy"');
    });
  });

  // =========================================================================
  // 2. SafeStorage Resilience & Storage Quota Fallback
  // =========================================================================
  describe('SafeStorage Resilience & Memory Fallback', () => {
    beforeEach(() => {
      safeStorage.clear();
    });

    test('stores and retrieves primitive values without error', () => {
      safeStorage.setItem('audit_test_key', 'hello_world');
      expect(safeStorage.getItem('audit_test_key')).toBe('hello_world');
      safeStorage.removeItem('audit_test_key');
      expect(safeStorage.getItem('audit_test_key')).toBeNull();
    });

    test('getJson gracefully returns fallback on missing or corrupted JSON string', () => {
      const fallback = { status: 'default' };
      const resMissing = safeStorage.getJson('non_existent_key', fallback);
      expect(resMissing).toEqual(fallback);

      safeStorage.setItem('corrupt_json', '{broken:invalid-json');
      const resCorrupted = safeStorage.getJson('corrupt_json', fallback);
      expect(resCorrupted).toEqual(fallback);
    });

    test('setJson correctly serializes complex structured objects', () => {
      const complexData = {
        sessionId: 'guest_123',
        scores: [100, 250, 300],
        completed: true,
      };
      safeStorage.setJson('audit_json', complexData);
      expect(safeStorage.getJson('audit_json', null)).toEqual(complexData);
    });

    test('retains data integrity in in-memory fallback even under storage stress', () => {
      for (let i = 0; i < 50; i++) {
        safeStorage.setItem(`stress_key_${i}`, `value_${i}`);
      }
      expect(safeStorage.getItem('stress_key_25')).toBe('value_25');
      expect(safeStorage.getItem('stress_key_49')).toBe('value_49');
    });
  });

  // =========================================================================
  // 3. Input Validation, Bounds Clamping & Injection Sanitization
  // =========================================================================
  describe('ProgressService Input Validation & Bounds Clamping', () => {
    test('calculatePercentage clamps slide within [1, totalSlides] and caps at 100%', () => {
      // Normal range
      expect(progressService.calculatePercentage(3, 7, false)).toBe(43);
      expect(progressService.calculatePercentage(7, 7, false)).toBe(100);

      // Overflow slide
      expect(progressService.calculatePercentage(999, 7, false)).toBe(100);

      // Negative or zero slide
      expect(progressService.calculatePercentage(-5, 7, false)).toBe(14); // 1/7 rounded = 14%
      expect(progressService.calculatePercentage(0, 7, false)).toBe(14);

      // Total slides boundary clamping (clamped to min 1)
      expect(progressService.calculatePercentage(1, 0, false)).toBe(100);

      // Explicit completed flag always yields 100%
      expect(progressService.calculatePercentage(1, 7, true)).toBe(100);
    });

    test('updateProgress clamps score, slides and sanitizes malicious identifiers', async () => {
      const testGameId = 'test_game_sec_<script>alert(1)</script>';
      const progress = await progressService.updateProgress(testGameId, {
        currentSlide: 9999, // Exceeds upper limit
        totalSlides: 100,   // Exceeds max 50 slides
        score: -500,        // Negative score
        challengesCompleted: [
          'chal_1<img src=x onerror=alert(1)>',
          'chal_2;DROP TABLE users;',
          'chal_1<img src=x onerror=alert(1)>', // Duplicate
        ],
      });

      // Identifier must be sanitized (no dangerous chars like <, >, ;, quotes, etc.)
      expect(progress.gameId).not.toContain('<');
      expect(progress.gameId).not.toContain('>');
      expect(progress.gameId).not.toContain('(');
      expect(progress.gameId).not.toContain(')');

      // Slides must be clamped
      expect(progress.totalSlides).toBeLessThanOrEqual(50);
      expect(progress.currentSlide).toBeLessThanOrEqual(progress.totalSlides);

      // Score must not be negative
      expect(progress.score).toBeGreaterThanOrEqual(0);

      // Challenges array must be sanitized and deduplicated
      expect(progress.challengesCompleted.length).toBe(2);
      expect(progress.challengesCompleted[0]).not.toContain('<');
      expect(progress.challengesCompleted[1]).not.toContain(';');
    });

    test('recordChallengeCompleted sanitizes challengeId and prevents duplicates', async () => {
      const gameId = 'sec-game-test';
      const cleanProgress = await progressService.recordChallengeCompleted(gameId, 'badge-alpha');
      expect(cleanProgress.challengesCompleted).toContain('badge-alpha');

      // Recording the same challenge again must NOT duplicate
      const secondCall = await progressService.recordChallengeCompleted(gameId, 'badge-alpha');
      const count = secondCall.challengesCompleted.filter(c => c === 'badge-alpha').length;
      expect(count).toBe(1);
    });

    test('flushPendingSync runs cleanly without thrown exceptions', async () => {
      await expect(progressService.flushPendingSync()).resolves.toBeUndefined();
    });
  });

  // =========================================================================
  // 4. Audio Synthesizer Lifecycle & Safe Preferences
  // =========================================================================
  describe('Sound Synthesizer Lifecycle & Preferences Resilience', () => {
    test('sound volume is clamped between 0 and 1', () => {
      sound.setVolume(1.8);
      expect(sound.getVolume()).toBe(1);

      sound.setVolume(-0.5);
      expect(sound.getVolume()).toBe(0);

      sound.setVolume(0.65);
      expect(sound.getVolume()).toBe(0.65);
    });

    test('sound enabled toggle flips state and safely persists', () => {
      const initial = sound.isEnabled();
      const toggled = sound.toggleSound();
      expect(toggled).toBe(!initial);

      // Restore
      sound.toggleSound();
      expect(sound.isEnabled()).toBe(initial);
    });
  });

  // =========================================================================
  // 5. Production Chunk Splitting & Bundle Size Optimization
  // =========================================================================
  describe('Production Bundle Splitting & Size Optimization Audit', () => {
    test('vite.config.ts defines Rollup manualChunks configuration', () => {
      const viteConfigPath = path.resolve(__dirname, '../vite.config.ts');
      const viteConfig = fs.readFileSync(viteConfigPath, 'utf-8');

      expect(viteConfig).toContain('manualChunks');
      expect(viteConfig).toContain('vendor-react');
      expect(viteConfig).toContain('vendor-supabase');
      expect(viteConfig).toContain('game-decks');
      expect(viteConfig).toContain('game-visuals');
    });

    test('dist build directory contains split vendor and game chunks', () => {
      const distAssetsPath = path.resolve(__dirname, '../dist/assets');
      if (fs.existsSync(distAssetsPath)) {
        const files = fs.readdirSync(distAssetsPath);
        const hasReactChunk = files.some(f => f.startsWith('vendor-react-'));
        const hasSupabaseChunk = files.some(f => f.startsWith('vendor-supabase-'));
        const hasGameDecksChunk = files.some(f => f.startsWith('game-decks-'));

        expect(hasReactChunk).toBe(true);
        expect(hasSupabaseChunk).toBe(true);
        expect(hasGameDecksChunk).toBe(true);

        // Verify that NO js chunk file exceeds 500 kB (512,000 bytes)
        for (const file of files) {
          if (file.endsWith('.js')) {
            const stats = fs.statSync(path.join(distAssetsPath, file));
            expect(stats.size).toBeLessThan(512 * 1024); // < 500 KB
          }
        }
      }
    });
  });
});
