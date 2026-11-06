import { describe, expect, test } from 'bun:test';
import { GAMES_CATALOG } from '../src/data/games-catalog';
import {
  ALL_PRESENTATION_DECKS,
  getPresentationDeckByGameId,
  hasPresentationDeck,
  getAllPresentationDeckIds,
} from '../src/data/presentation-decks';
import {
  DECK_ILLUSTRATION_MAP,
  getDeckIllustration,
  AksaraSastraBahasaIllustration,
} from '../src/components/visuals';
import { GameQuizModal } from '../src/components/game-shell/GameQuizModal';
import { GameVictoryModal } from '../src/components/game-shell/GameVictoryModal';
import { sound } from '../src/lib/sound';

describe('Milestone 4: App Launch Wiring, Catalog Integration & Dry Quiz Deprecation', () => {
  const ALL_10_GAME_IDS = [
    'ular-tangga-sains',
    'point-click-lab',
    'ular-tangga-matematika',
    'point-click-candi',
    'point-click-hutan',
    'ular-tangga-tatasurya',
    'teka-teki-kata',
    'ular-tangga-sejarah',
    'catur-taktik-logika',
    'presentasi-ekosistem-hutan',
  ];

  test('Catalog to Deck 1-to-1 Linkage: All 10 games resolve to presentation decks', () => {
    expect(GAMES_CATALOG.length).toBeGreaterThanOrEqual(10);
    const registeredIds = getAllPresentationDeckIds();
    expect(registeredIds.length).toBeGreaterThanOrEqual(10);

    for (const gameId of ALL_10_GAME_IDS) {
      expect(hasPresentationDeck(gameId)).toBe(true);

      const catalogGame = GAMES_CATALOG.find(g => g.id === gameId);
      expect(catalogGame).toBeDefined();
      expect(catalogGame?.hasStoryPresentation).toBe(true);
      expect(catalogGame?.presentationDeckId).toBe(gameId);
      expect(catalogGame?.slideCount).toBeDefined();
      expect(catalogGame?.mentorName).toBeDefined();

      const deck = getPresentationDeckByGameId(gameId);
      expect(deck).toBeDefined();
      expect(deck?.gameId).toBe(gameId);
      expect(deck?.title.length).toBeGreaterThan(5);
      expect(deck?.mentor.name).toBe(catalogGame?.mentorName!);
      expect(deck?.slides.length).toBe(catalogGame?.slideCount!);
    }
  });

  test('Dynamic Slide Counts: Validates non-hardcoded dynamic slide lengths (7 or 8 slides)', () => {
    const slideCounts = new Set<number>();

    for (const gameId of ALL_10_GAME_IDS) {
      const deck = getPresentationDeckByGameId(gameId);
      expect(deck).toBeDefined();
      const count = deck!.slides.length;
      expect(count).toBeGreaterThanOrEqual(7);
      expect(count).toBeLessThanOrEqual(8);
      slideCounts.add(count);
    }

    // Must have dynamic variation (both 7 and 8 slide decks exist)
    expect(slideCounts.has(7)).toBe(true);
    expect(slideCounts.has(8)).toBe(true);
  });

  test('Curriculum Narrative Arc (R1 & R4): Every deck follows a complete story-driven structure', () => {
    for (const gameId of ALL_10_GAME_IDS) {
      const deck = getPresentationDeckByGameId(gameId)!;

      // 1. First slide must be narrative intro with mentor mission
      const firstSlide = deck.slides[0];
      expect(firstSlide.type).toBe('narrative-intro');
      if (firstSlide.type === 'narrative-intro') {
        expect(firstSlide.dialogue.length).toBeGreaterThan(15);
        expect(firstSlide.title.length).toBeGreaterThan(5);
      }

      // 2. Second slide must be concept infographic with bite-sized academic material
      const secondSlide = deck.slides[1];
      expect(secondSlide.type).toBe('concept-infographic');
      if (secondSlide.type === 'concept-infographic') {
        expect(secondSlide.cards.length).toBeGreaterThanOrEqual(3);
        expect(secondSlide.cards.length).toBeLessThanOrEqual(4);
      }

      // 3. Penultimate slide must be story resolution with real-world impact
      const penultimateSlide = deck.slides[deck.slides.length - 2];
      expect(penultimateSlide.type).toBe('story-resolution');
      if (penultimateSlide.type === 'story-resolution') {
        expect(penultimateSlide.resolutionStory.length).toBeGreaterThan(20);
        expect(penultimateSlide.title.length).toBeGreaterThan(5);
      }

      // 4. Final slide must be reflection spark with HOTS classroom discussion prompts
      const finalSlide = deck.slides[deck.slides.length - 1];
      expect(finalSlide.type).toBe('reflection-spark');
      if (finalSlide.type === 'reflection-spark') {
        expect(finalSlide.sparkCards.length).toBeGreaterThanOrEqual(2);
        expect(finalSlide.title.length).toBeGreaterThan(5);
      }
    }
  });

  test('Dry Quiz Deprecation (R2): Embedded mini-games replace popups across all decks', () => {
    const validMiniGameSlideTypes = new Set([
      'mini-game-sequence',
      'mini-game-match',
      'mini-game-flashcard',
      'mini-game-board',
      'mini-game-chess',
      'mini-game-word',
    ]);

    for (const gameId of ALL_10_GAME_IDS) {
      const deck = getPresentationDeckByGameId(gameId)!;

      // Ensure at least one embedded mini-game slide exists in each deck
      const miniGameSlides = deck.slides.filter(s => validMiniGameSlideTypes.has(s.type));
      expect(miniGameSlides.length).toBeGreaterThanOrEqual(1);

      // Verify that no slide has dry multiple-choice quiz type
      const dryQuizSlides = deck.slides.filter(s => (s.type as string) === 'quiz');
      expect(dryQuizSlides.length).toBe(0);
    }
  });

  test('GameQuizModal backward compatibility: Exported with valid component signature', () => {
    expect(GameQuizModal).toBeDefined();
    expect(typeof GameQuizModal).toBe('function');
    expect(GameVictoryModal).toBeDefined();
    expect(typeof GameVictoryModal).toBe('function');
  });

  test('Visual Illustrations Registry (R3): All 10 games map to high-resolution SVG infographics', () => {
    expect(Object.keys(DECK_ILLUSTRATION_MAP).length).toBe(10);
    expect(AksaraSastraBahasaIllustration).toBeDefined();
    expect(typeof AksaraSastraBahasaIllustration).toBe('function');

    for (const gameId of ALL_10_GAME_IDS) {
      const ill = getDeckIllustration(gameId);
      expect(ill).toBeDefined();
      expect(typeof ill).toBe('function');
    }
  });

  test('Sound Engine Synthesizer: All Milestone 4 audio feedback methods exist and execute cleanly', () => {
    expect(typeof sound.playFanfare).toBe('function');
    expect(typeof sound.playCardFlip).toBe('function');
    expect(typeof sound.playSlideTransition).toBe('function');
    expect(typeof sound.playClick).toBe('function');
    expect(typeof sound.playCorrect).toBe('function');

    // Safe execution in test environment without throwing
    expect(() => sound.playFanfare()).not.toThrow();
    expect(() => sound.playCardFlip()).not.toThrow();
    expect(() => sound.playSlideTransition()).not.toThrow();
  });

  test('Dual-Mode Launch Protocol: Default mode is story presentation, arcade preserved as option', () => {
    // Simulator for launchGame contract
    function simulateLaunch(gameId: string, mode: 'presentation' | 'arcade' = 'presentation') {
      const catalogGame = GAMES_CATALOG.find(g => g.id === gameId);
      if (!catalogGame) throw new Error('Game not found');

      if (mode === 'presentation') {
        const deck = getPresentationDeckByGameId(gameId);
        if (deck) {
          return { launched: 'presentation', deckId: deck.gameId, totalSlides: deck.slides.length };
        }
      }

      return { launched: 'arcade', gameId: catalogGame.id, gameType: catalogGame.type };
    }

    for (const gameId of ALL_10_GAME_IDS) {
      const presResult = simulateLaunch(gameId, 'presentation');
      expect(presResult.launched).toBe('presentation');
      expect(presResult.deckId).toBe(gameId);
      expect(presResult.totalSlides).toBeGreaterThanOrEqual(7);

      const arcadeResult = simulateLaunch(gameId, 'arcade');
      expect(arcadeResult.launched).toBe('arcade');
      expect(arcadeResult.gameId).toBe(gameId);
    }
  });
});
