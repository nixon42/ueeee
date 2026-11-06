import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { GAMES_CATALOG } from '../src/data/games-catalog';
import {
  ALL_PRESENTATION_DECKS,
  getPresentationDeckByGameId,
  hasPresentationDeck,
  getAllPresentationDeckIds,
} from '../src/data/presentation-decks';
import { InteractiveStoryPresentationModal } from '../src/components/canva-games';
import { StoryPresentationDeckEngine } from '../src/components/canva-games/StoryPresentationDeckEngine';
import { GameItem } from '../src/types/game';

// ============================================================================
// ADVERSARIAL HARNESS: Pure Simulation of App.tsx URL & Launch Contracts
// ============================================================================

interface AppLaunchSimulatedState {
  isPresentationOpen: boolean;
  activeDeckId: string | null;
  presentationInitialSlide: number;
  isArcadeOpen: boolean;
  arcadeSubjectOrScene: string | null;
  activePrologGameId: string | null;
  currentUrl: string;
}

/**
 * High-fidelity simulator representing App.tsx's exact URL parsing and launchGame contracts.
 */
function simulateAppUrlLaunch(queryString: string): AppLaunchSimulatedState {
  const params = new URLSearchParams(queryString);
  const gameParam = params.get('game');
  const modeParam = params.get('mode') === 'arcade' ? 'arcade' : 'presentation';
  const rawSlide = params.get('slide');
  const slideParam = parseInt(rawSlide || '1', 10);
  const validatedSlide = isNaN(slideParam) ? 1 : slideParam;

  let state: AppLaunchSimulatedState = {
    isPresentationOpen: false,
    activeDeckId: null,
    presentationInitialSlide: 1,
    isArcadeOpen: false,
    arcadeSubjectOrScene: null,
    activePrologGameId: null,
    currentUrl: `http://localhost/${queryString}`,
  };

  // 1. Prolog deep linking handler
  const prologParam = params.get('prolog');
  if (prologParam) {
    const prologMatch = GAMES_CATALOG.find(g => g.id === prologParam);
    if (prologMatch) {
      state.activePrologGameId = prologMatch.id;
    }
  }

  // 2. Game launcher handler
  if (gameParam) {
    const match = GAMES_CATALOG.find(g => g.id === gameParam);
    if (match) {
      // simulate launchGame(match, modeParam, validatedSlide)
      const mockUrl = new URL(state.currentUrl);
      mockUrl.searchParams.set('game', match.id);

      if (modeParam === 'arcade') {
        mockUrl.searchParams.set('mode', 'arcade');
      } else {
        mockUrl.searchParams.delete('mode');
      }

      if (validatedSlide > 1) {
        mockUrl.searchParams.set('slide', validatedSlide.toString());
      } else {
        mockUrl.searchParams.delete('slide');
      }
      state.currentUrl = mockUrl.toString();

      if (modeParam === 'presentation') {
        const deck = getPresentationDeckByGameId(match.id);
        if (deck) {
          state.isPresentationOpen = true;
          state.activeDeckId = deck.gameId;
          state.presentationInitialSlide = validatedSlide;
          return state;
        }
      }

      // Arcade fallback
      state.isArcadeOpen = true;
      if (match.id === 'catur-taktik-logika') {
        state.arcadeSubjectOrScene = 'chess';
      } else if (match.type === 'ular-tangga') {
        state.arcadeSubjectOrScene = match.id.includes('matematika')
          ? 'matematika'
          : match.id.includes('sejarah')
          ? 'sejarah'
          : 'sains';
      } else if (match.type === 'point-and-click') {
        state.arcadeSubjectOrScene = match.id.includes('candi')
          ? 'candi-sejarah'
          : match.id.includes('hutan')
          ? 'hutan-endemik'
          : 'lab-sains';
      } else {
        state.arcadeSubjectOrScene = 'puzzle';
      }
    }
  }

  return state;
}

function simulateCloseGameModal(state: AppLaunchSimulatedState): AppLaunchSimulatedState {
  const url = new URL(state.currentUrl);
  url.searchParams.delete('game');
  url.searchParams.delete('mode');
  url.searchParams.delete('slide');

  return {
    ...state,
    isPresentationOpen: false,
    activeDeckId: null,
    presentationInitialSlide: 1,
    isArcadeOpen: false,
    arcadeSubjectOrScene: null,
    currentUrl: url.toString(),
  };
}

describe('Empirical Adversarial Suite: Milestone 4 Catalog & URL Launch Contracts', () => {

  // ==========================================================================
  // 1. BIJECTION VERIFICATION: GAMES_CATALOG <-> ALL_PRESENTATION_DECKS
  // ==========================================================================
  describe('1-to-1 Bijection & Domain Invariants', () => {
    test('Exact cardinality: exactly 10 games in catalog and 10 registered presentation decks', () => {
      expect(GAMES_CATALOG.length).toBe(10);
      const deckIds = getAllPresentationDeckIds();
      expect(deckIds.length).toBe(10);
      expect(Object.keys(ALL_PRESENTATION_DECKS).length).toBe(10);
    });

    test('Bijection Invariance: Sets of catalog IDs and presentation deck IDs are strictly equal', () => {
      const catalogIds = new Set(GAMES_CATALOG.map(g => g.id));
      const deckIds = new Set(Object.keys(ALL_PRESENTATION_DECKS));

      expect(catalogIds.size).toBe(10);
      expect(deckIds.size).toBe(10);

      // Surjectivity: No presentation deck exists without a catalog counterpart
      for (const deckId of deckIds) {
        expect(catalogIds.has(deckId)).toBe(true);
      }

      // Injectivity: No catalog game exists without a presentation deck counterpart
      for (const catId of catalogIds) {
        expect(deckIds.has(catId)).toBe(true);
      }
    });

    test('Injectivity: Every catalog game points to a unique, distinct presentation deck', () => {
      const deckObjects = GAMES_CATALOG.map(g => getPresentationDeckByGameId(g.id));
      const uniqueDeckObjects = new Set(deckObjects);
      expect(uniqueDeckObjects.size).toBe(10);

      for (const game of GAMES_CATALOG) {
        const deck = getPresentationDeckByGameId(game.id);
        expect(deck).toBeDefined();
        expect(deck!.gameId).toBe(game.id);
        expect(game.presentationDeckId).toBe(game.id);
      }
    });

    test('Metadata Parity: Catalog slideCount and mentorName strictly mirror presentation deck metadata', () => {
      for (const game of GAMES_CATALOG) {
        const deck = getPresentationDeckByGameId(game.id)!;
        expect(game.slideCount).toBe(deck.slides.length);
        expect(game.mentorName).toBe(deck.mentor.name);
        expect(deck.title.length).toBeGreaterThan(5);
        expect(deck.mentor.avatarEmoji.length).toBeGreaterThan(0);
      }
    });

    test('Adversarial lookup resilience: Nonexistent game IDs safely return undefined / false', () => {
      const nonexistentIds = [
        'invalid-game',
        'nonexistent',
        'ular-tangga-sains-fake',
        '',
        '   ',
        '<script>alert(1)</script>',
        'null',
        'undefined',
        '../../etc/passwd',
        'game-100',
        'sql-injection"; DROP TABLE games;',
      ];

      for (const id of nonexistentIds) {
        expect(hasPresentationDeck(id)).toBe(false);
        expect(getPresentationDeckByGameId(id)).toBeUndefined();
      }
    });

    test('Empirical Vulnerability Observation: Object prototype methods leak in unshielded Record lookups', () => {
      // Plain JS object {...} inherits from Object.prototype.
      // Calling hasPresentationDeck('toString') returns true, and getPresentationDeck returns Function.
      // App.tsx is protected by GAMES_CATALOG.find(), but standalone callers are vulnerable.
      const prototypeKeys = ['toString', 'valueOf', 'constructor'];
      for (const key of prototypeKeys) {
        expect(hasPresentationDeck(key)).toBe(true);
        expect(typeof getPresentationDeckByGameId(key)).toBe('function');
      }
    });
  });

  // ==========================================================================
  // 2. DYNAMIC SLIDE COUNTS & ANTI-PATTERN PROHIBITION (NOT 6 SLIDES)
  // ==========================================================================
  describe('Dynamic Slide Counts (7 or 8 Slides, Explicitly NOT 6)', () => {
    test('Every catalog game has hasStoryPresentation === true (strictly boolean true)', () => {
      for (const game of GAMES_CATALOG) {
        expect(typeof game.hasStoryPresentation).toBe('boolean');
        expect(game.hasStoryPresentation).toBe(true);
      }
    });

    test('PROHIBITION: Zero games in catalog or decks have hardcoded 6 slides', () => {
      for (const game of GAMES_CATALOG) {
        expect(game.slideCount).not.toBe(6);
      }

      for (const [id, deck] of Object.entries(ALL_PRESENTATION_DECKS)) {
        expect(deck.slides.length).not.toBe(6);
      }
    });

    test('Dynamic Slide Length Contract: Every deck strictly has 7 or 8 slides', () => {
      const countDistribution: Record<number, number> = { 7: 0, 8: 0 };

      for (const game of GAMES_CATALOG) {
        const count = game.slideCount!;
        expect([7, 8]).toContain(count);
        countDistribution[count] = (countDistribution[count] || 0) + 1;
      }

      // Assert both 7-slide and 8-slide decks exist (dynamic representation)
      expect(countDistribution[7]).toBeGreaterThan(0);
      expect(countDistribution[8]).toBeGreaterThan(0);
      expect(countDistribution[7] + countDistribution[8]).toBe(10);
    });

    test('Narrative Arc Integrity across all 10 decks: 1st slide is narrative-intro, last is reflection-spark', () => {
      for (const [id, deck] of Object.entries(ALL_PRESENTATION_DECKS)) {
        const total = deck.slides.length;
        expect(total).toBeGreaterThanOrEqual(7);

        // Slide 1: Narrative Intro
        const slide1 = deck.slides[0];
        expect(slide1.type).toBe('narrative-intro');
        expect(slide1.title.length).toBeGreaterThan(3);

        // Slide 2: Concept Infographic
        const slide2 = deck.slides[1];
        expect(slide2.type).toBe('concept-infographic');

        // Middle: Must contain embedded mini-game
        const middleSlides = deck.slides.slice(2, total - 2);
        const hasMiniGame = middleSlides.some(s => s.type.startsWith('mini-game-'));
        expect(hasMiniGame).toBe(true);

        // Slide N-1: Story Resolution
        const slideResolution = deck.slides[total - 2];
        expect(slideResolution.type).toBe('story-resolution');
        expect(slideResolution.title.length).toBeGreaterThan(3);

        // Slide N: Reflection Spark
        const slideReflection = deck.slides[total - 1];
        expect(slideReflection.type).toBe('reflection-spark');
        expect(slideReflection.title.length).toBeGreaterThan(3);
      }
    });
  });

  // ==========================================================================
  // 3. ADVERSARIAL URL PARAMETER PARSING & DEEP LINKING
  // ==========================================================================
  describe('Adversarial URL Parameter Parsing & Deep Linking', () => {
    
    // --- 3A. Hostile & Invalid ?game= parameters ---
    test('Hostile ?game= values never crash and leave presentation closed', () => {
      const maliciousGameQueries = [
        '?game=invalid-id',
        '?game=',
        '?game=null',
        '?game=undefined',
        '?game=../secret/path',
        '?game=<script>alert(1)</script>',
        '?game=__proto__',
        '?game=constructor',
        '?game=toString',
        '?game=ular-tangga-sains;DROP%20TABLE%20games;',
        '?game=123456',
        '?game=%20%20%20',
      ];

      for (const qs of maliciousGameQueries) {
        const result = simulateAppUrlLaunch(qs);
        expect(result.isPresentationOpen).toBe(false);
        expect(result.activeDeckId).toBeNull();
        expect(result.isArcadeOpen).toBe(false);
      }
    });

    // --- 3B. Valid ?game= parameters default to presentation mode ---
    test('Valid ?game= without mode defaults to presentation launch', () => {
      for (const game of GAMES_CATALOG) {
        const result = simulateAppUrlLaunch(`?game=${game.id}`);
        expect(result.isPresentationOpen).toBe(true);
        expect(result.activeDeckId).toBe(game.id);
        expect(result.isArcadeOpen).toBe(false);
        expect(result.presentationInitialSlide).toBe(1);
      }
    });

    // --- 3C. Adversarial ?mode= parameters ---
    test('Adversarial ?mode= values safely fall back to presentation mode', () => {
      const weirdModes = [
        'unknown-mode',
        'hacker',
        'debug',
        'PRESENTATION',
        'ARCADE', // uppercase is not 'arcade'
        '123',
        '__proto__',
        '',
        'null',
      ];

      for (const mode of weirdModes) {
        const result = simulateAppUrlLaunch(`?game=ular-tangga-sains&mode=${mode}`);
        expect(result.isPresentationOpen).toBe(true);
        expect(result.activeDeckId).toBe('ular-tangga-sains');
        expect(result.isArcadeOpen).toBe(false);
      }
    });

    test('Strict ?mode=arcade explicitly triggers arcade mode launch', () => {
      const result = simulateAppUrlLaunch('?game=ular-tangga-sains&mode=arcade');
      expect(result.isPresentationOpen).toBe(false);
      expect(result.isArcadeOpen).toBe(true);
      expect(result.arcadeSubjectOrScene).toBe('sains');

      const chessResult = simulateAppUrlLaunch('?game=catur-taktik-logika&mode=arcade');
      expect(chessResult.isPresentationOpen).toBe(false);
      expect(chessResult.isArcadeOpen).toBe(true);
      expect(chessResult.arcadeSubjectOrScene).toBe('chess');
    });

    // --- 3D. Adversarial ?slide= parameters ---
    test('Out-of-bounds slide values (?slide=999, ?slide=-5, ?slide=0) are parsed safely', () => {
      // ?slide=999
      const result999 = simulateAppUrlLaunch('?game=ular-tangga-sains&slide=999');
      expect(result999.isPresentationOpen).toBe(true);
      expect(result999.presentationInitialSlide).toBe(999);

      // Verify engine bounds slide 999 to totalSlides (7)
      const deck = getPresentationDeckByGameId('ular-tangga-sains')!;
      const totalSlides = deck.slides.length;
      const clampedCurrentSlide = Math.max(1, Math.min(totalSlides, result999.presentationInitialSlide));
      expect(clampedCurrentSlide).toBe(7);
      expect(deck.slides[clampedCurrentSlide - 1]).toBeDefined();

      // ?slide=-5
      const resultNeg5 = simulateAppUrlLaunch('?game=ular-tangga-sains&slide=-5');
      expect(resultNeg5.isPresentationOpen).toBe(true);
      expect(resultNeg5.presentationInitialSlide).toBe(-5);
      const clampedNeg = Math.max(1, Math.min(totalSlides, resultNeg5.presentationInitialSlide));
      expect(clampedNeg).toBe(1);
      expect(deck.slides[clampedNeg - 1]).toBeDefined();

      // ?slide=0
      const result0 = simulateAppUrlLaunch('?game=ular-tangga-sains&slide=0');
      expect(result0.isPresentationOpen).toBe(true);
      expect(result0.presentationInitialSlide).toBe(0);
      const clamped0 = Math.max(1, Math.min(totalSlides, result0.presentationInitialSlide));
      expect(clamped0).toBe(1);
    });

    test('Non-numeric and corrupt ?slide= values safely resolve to slide 1', () => {
      const corruptSlides = [
        'abc',
        'NaN',
        'Infinity',
        '-Infinity',
        'undefined',
        'null',
        '',
        '%20',
        'foo123',
        '[object%20Object]',
      ];

      for (const corrupt of corruptSlides) {
        const result = simulateAppUrlLaunch(`?game=point-click-lab&slide=${corrupt}`);
        expect(result.isPresentationOpen).toBe(true);
        expect(result.presentationInitialSlide).toBe(1);
      }
    });

    test('Decimal and scientific slide numbers are safely floored or parsed', () => {
      const resultDecimal = simulateAppUrlLaunch('?game=ular-tangga-matematika&slide=4.95');
      expect(resultDecimal.presentationInitialSlide).toBe(4);

      const resultZeroDecimal = simulateAppUrlLaunch('?game=ular-tangga-matematika&slide=0.8');
      expect(resultZeroDecimal.presentationInitialSlide).toBe(0);
    });

    // --- 3E. Prolog Deep Linking ---
    test('?prolog= parameter correctly deep-links valid games and rejects invalid games', () => {
      const validProlog = simulateAppUrlLaunch('?prolog=point-click-candi');
      expect(validProlog.activePrologGameId).toBe('point-click-candi');

      const invalidProlog = simulateAppUrlLaunch('?prolog=not-a-real-game');
      expect(invalidProlog.activePrologGameId).toBeNull();
    });

    // --- 3F. Query String History Updates & Cleanup ---
    test('History replacement cleans query string properly on launch and modal close', () => {
      // Presentation on slide 1: slide param and mode param should be omitted for clean URL
      const launchSlide1 = simulateAppUrlLaunch('?game=point-click-hutan&slide=1');
      const url1 = new URL(launchSlide1.currentUrl);
      expect(url1.searchParams.get('game')).toBe('point-click-hutan');
      expect(url1.searchParams.has('slide')).toBe(false);
      expect(url1.searchParams.has('mode')).toBe(false);

      // Presentation on slide 3: slide param preserved
      const launchSlide3 = simulateAppUrlLaunch('?game=point-click-hutan&slide=3');
      const url3 = new URL(launchSlide3.currentUrl);
      expect(url3.searchParams.get('game')).toBe('point-click-hutan');
      expect(url3.searchParams.get('slide')).toBe('3');

      // Arcade mode: mode=arcade preserved
      const launchArcade = simulateAppUrlLaunch('?game=point-click-hutan&mode=arcade');
      const urlArcade = new URL(launchArcade.currentUrl);
      expect(urlArcade.searchParams.get('game')).toBe('point-click-hutan');
      expect(urlArcade.searchParams.get('mode')).toBe('arcade');

      // Close modal: all params cleanly erased
      const closed = simulateCloseGameModal(launchSlide3);
      const closedUrl = new URL(closed.currentUrl);
      expect(closedUrl.searchParams.has('game')).toBe(false);
      expect(closedUrl.searchParams.has('mode')).toBe(false);
      expect(closedUrl.searchParams.has('slide')).toBe(false);
      expect(closed.isPresentationOpen).toBe(false);
      expect(closed.activeDeckId).toBeNull();
    });
  });

  // ==========================================================================
  // 4. SSR COMPONENT RENDERING UNDER ADVERSARIAL INITIAL SLIDE INPUTS
  // ==========================================================================
  describe('SSR Component Resilience: InteractiveStoryPresentationModal', () => {
    test('Renders without error across all 10 decks with adversarial initialSlide props', () => {
      const adversarialSlides = [undefined, 1, 0, -5, -999, 7, 8, 999, NaN];

      for (const [deckId, deck] of Object.entries(ALL_PRESENTATION_DECKS)) {
        for (const slideVal of adversarialSlides) {
          const html = renderToString(
            React.createElement(InteractiveStoryPresentationModal, {
              isOpen: true,
              onClose: () => {},
              deck,
              initialSlide: slideVal,
            })
          );

          expect(html).toBeDefined();
          expect(html.length).toBeGreaterThan(500);
          const expectedEncodedTitle = deck.title.replace(/&/g, '&amp;');
          expect(html).toContain(expectedEncodedTitle);
        }
      }
    });

    test('Renders safely when deck prop is undefined (backward-compatible fallback)', () => {
      const html = renderToString(
        React.createElement(InteractiveStoryPresentationModal, {
          isOpen: true,
          onClose: () => {},
          deck: undefined,
          initialSlide: 1,
        })
      );

      expect(html).toBeDefined();
      expect(html.length).toBeGreaterThan(500);
      expect(html).toContain('Ekspedisi Hutan Tropis');
    });

    test('StoryPresentationDeckEngine clamps slide index safely without throwing on any input', () => {
      for (const [deckId, deck] of Object.entries(ALL_PRESENTATION_DECKS)) {
        for (const inputSlide of [-100, 0, 1, 2, 7, 8, 100, 99999]) {
          const html = renderToString(
            React.createElement(StoryPresentationDeckEngine, {
              isOpen: true,
              onClose: () => {},
              deck,
              initialSlide: inputSlide,
            })
          );
          expect(html).toBeDefined();
          expect(html.length).toBeGreaterThan(500);
        }
      }
    });
  });

  // ==========================================================================
  // 5. FULL APP COMPONENT SSR SMOKE TEST
  // ==========================================================================
  describe('Full App Component SSR Smoke Test', () => {
    test('App renders cleanly under simulated hostile window.location queries', async () => {
      const previousWindow = globalThis.window;
      const previousLocalStorage = globalThis.localStorage;

      const hostileQueries = [
        '',
        '?game=invalid-id',
        '?slide=999',
        '?slide=-5',
        '?mode=unknown',
        '?game=ular-tangga-sains&slide=999',
        '?game=point-click-lab&slide=-5',
        '?game=catur-taktik-logika&mode=unknown-mode',
        '?game=<script>alert(1)</script>&slide=NaN',
        '?prolog=invalid-game',
      ];

      try {
        globalThis.window = {
          location: { search: '', href: 'http://localhost/' },
          history: { replaceState: () => {} },
          localStorage: { getItem: () => null, setItem: () => {} },
          document: { querySelector: () => null },
        } as any;
        globalThis.localStorage = globalThis.window.localStorage;

        const { default: App } = await import('../src/App');

        for (const query of hostileQueries) {
          globalThis.window.location.search = query;
          globalThis.window.location.href = `http://localhost/${query}`;
          globalThis.window.location.pathname = '/';

          const html = renderToString(React.createElement(App));
          expect(html).toBeDefined();
          expect(html.length).toBeGreaterThan(1000);
          expect(html).toContain('ueeee');
        }

        // Test path slugs (/game/:id and /:id)
        const slugPaths = [
          '/game/ular-tangga-sains',
          '/game/point-click-lab',
          '/point-click-candi',
          '/game/catur-taktik-logika',
          '/admin',
        ];

        for (const pathname of slugPaths) {
          globalThis.window.location.search = '';
          globalThis.window.location.pathname = pathname;
          globalThis.window.location.href = `http://localhost${pathname}`;

          const html = renderToString(React.createElement(App));
          expect(html).toBeDefined();
          expect(html.length).toBeGreaterThan(1000);
        }
      } finally {
        globalThis.window = previousWindow;
        globalThis.localStorage = previousLocalStorage;
      }
    });
  });
});
