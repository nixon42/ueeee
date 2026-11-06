import { describe, expect, test } from 'bun:test';
import { GAMES_CATALOG } from '../../src/data/games-catalog';
import {
  AUTHORITATIVE_GAMES_SPEC,
  SlideDeckSimulator,
  validateSequenceOrder,
  validatePairConnections
} from './e2e-fixtures';

describe('Tier 3 E2E Test Suite: Cross-Feature Interactions & Mini-Game Progression', () => {
  describe('Catalog-to-Presentation Launch Contract', () => {
    test('Every catalog game entry provides valid launch metadata for story presentation decks', () => {
      expect(GAMES_CATALOG.length).toBeGreaterThanOrEqual(10);

      for (const game of GAMES_CATALOG) {
        expect(game.id).toBeDefined();
        expect(game.title).toBeDefined();
        expect(game.category).toBeDefined();
        expect(game.gradeLevel).toBeDefined();
        expect(game.prolog).toBeDefined();

        // Launch Contract Verification:
        // A presentation deck launched with this game must inherit matching metadata
        const spec = AUTHORITATIVE_GAMES_SPEC[game.id];
        if (spec) {
          expect(spec.category).toBe(game.category);
          expect(game.prolog.story.length).toBeGreaterThan(20);
          expect(game.prolog.learningGoals.length).toBeGreaterThanOrEqual(3);
        }
      }
    });

    test('Catalog items preserve required theme and visual accents for presentation rendering', () => {
      const allowedCategories = ['sains', 'matematika', 'sejarah', 'bahasa', 'logika'];

      for (const game of GAMES_CATALOG) {
        expect(allowedCategories).toContain(game.category);
        expect(game.accentColor).toBeDefined();
        expect(game.accentColor.startsWith('#')).toBe(true);
        expect(game.gradient).toBeDefined();
        expect(game.gradient.length).toBeGreaterThan(5);
      }
    });
  });

  describe('Mini-Game Interactive Completion Flow', () => {
    test('Sequence challenge: Transition from scrambled state to solved state triggers completion', () => {
      // 4-step Water Cycle sequence (from Game 1: ular-tangga-sains)
      const waterCycleCards = [
        { id: 'h1', order: 1, label: 'Evaporasi' },
        { id: 'h2', order: 2, label: 'Kondensasi' },
        { id: 'h3', order: 3, label: 'Presipitasi' },
        { id: 'h4', order: 4, label: 'Infiltrasi' }
      ];

      // Simulated initial scrambled state
      const scrambled = [waterCycleCards[2], waterCycleCards[0], waterCycleCards[3], waterCycleCards[1]];
      expect(validateSequenceOrder(scrambled)).toBe(false);

      // Student reorders cards correctly
      const solved = [waterCycleCards[0], waterCycleCards[1], waterCycleCards[2], waterCycleCards[3]];
      const isSolved = validateSequenceOrder(solved);
      expect(isSolved).toBe(true);

      // Deck simulator handles completion event
      const sim = new SlideDeckSimulator(7);
      sim.setMiniGameCompleted('water-cycle-sequence', isSolved);
      expect(sim.miniGameStates['water-cycle-sequence']).toBe(true);
    });

    test('Match Pairs challenge: Drawing valid connections triggers verified completion', () => {
      // 4 trophic levels (from Game 10: presentasi-ekosistem-hutan)
      const ecosystemPairs = [
        { id: 'pair-produsen', leftText: 'Pohon Ara', rightText: 'Produsen autotrof' },
        { id: 'pair-herbivora', leftText: 'Orangutan', rightText: 'Konsumen penyebar biji' },
        { id: 'pair-karnivora', leftText: 'Macan Dahan', rightText: 'Predator puncak' },
        { id: 'pair-dekomposer', leftText: 'Jamur Lapuk', rightText: 'Pengurai tanah' }
      ];

      // Partial connections (2 of 4)
      const partialConnections: Record<string, string> = {
        'pair-produsen': 'pair-produsen',
        'pair-herbivora': 'pair-herbivora'
      };
      const partialResult = validatePairConnections(ecosystemPairs, partialConnections);
      expect(partialResult.isComplete).toBe(false);
      expect(partialResult.correctCount).toBe(2);

      // Complete correct connections
      const completeConnections: Record<string, string> = {
        'pair-produsen': 'pair-produsen',
        'pair-herbivora': 'pair-herbivora',
        'pair-karnivora': 'pair-karnivora',
        'pair-dekomposer': 'pair-dekomposer'
      };
      const completeResult = validatePairConnections(ecosystemPairs, completeConnections);
      expect(completeResult.isComplete).toBe(true);
      expect(completeResult.correctCount).toBe(4);

      // Deck simulator records completion
      const sim = new SlideDeckSimulator(7);
      sim.setMiniGameCompleted('trophic-pairs', completeResult.isComplete);
      expect(sim.miniGameStates['trophic-pairs']).toBe(true);
    });

    test('Multi-challenge tracking: Presentation deck monitors completion across multiple mini-games', () => {
      const sim = new SlideDeckSimulator(8);

      // Challenge 1 completed, Challenge 2 pending
      sim.setMiniGameCompleted('challenge-1', true);
      sim.setMiniGameCompleted('challenge-2', false);
      expect(sim.miniGameStates['challenge-1']).toBe(true);
      expect(sim.miniGameStates['challenge-2']).toBe(false);
      expect(sim.isAllMiniGamesCompleted()).toBe(false);

      // Challenge 2 completed
      sim.setMiniGameCompleted('challenge-2', true);
      expect(sim.isAllMiniGamesCompleted()).toBe(true);
    });
  });

  describe('Story Resolution to Reflection & Celebration Flow', () => {
    test('Penultimate slide conveys story resolution impact and prepares teacher reflection', () => {
      for (const [gameId, spec] of Object.entries(AUTHORITATIVE_GAMES_SPEC)) {
        const sim = new SlideDeckSimulator(spec.slideCount);

        // Advance to penultimate slide (Story Resolution)
        const resolutionSlideNum = spec.slideCount - 1;
        sim.goToSlide(resolutionSlideNum);
        expect(sim.currentSlide).toBe(resolutionSlideNum);

        // Confirm resolution impact is specific and meaningful
        expect(spec.resolutionImpact.length).toBeGreaterThan(20);

        // Transition to final slide (Teacher Reflection)
        const finalSlideNum = spec.slideCount;
        sim.nextSlide();
        expect(sim.currentSlide).toBe(finalSlideNum);

        // Final slide provides exactly 3 HOTS reflection sparkers
        expect(spec.reflectionHotsCount).toBe(3);

        // Next transition triggers GameVictoryModal
        const finishAction = sim.nextSlide();
        expect(finishAction.victory).toBe(true);
        expect(sim.isVictoryTriggered).toBe(true);
      }
    });

    test('Post-victory reset cleanly returns student to opening slide for classroom re-play', () => {
      const sim = new SlideDeckSimulator(7);

      // Complete entire deck
      sim.goToSlide(7);
      sim.setMiniGameCompleted('game-1', true);
      sim.setMiniGameCompleted('game-2', true);
      sim.nextSlide();
      expect(sim.isVictoryTriggered).toBe(true);

      // User presses "Main Lagi / Mulai Ulang"
      sim.reset();
      expect(sim.currentSlide).toBe(1);
      expect(sim.isVictoryTriggered).toBe(false);
      expect(sim.isAllMiniGamesCompleted()).toBe(false);
    });
  });
});
