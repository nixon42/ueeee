import { describe, expect, test } from 'bun:test';
import {
  SlideDeckSimulator,
  AUTHORITATIVE_GAMES_SPEC,
  shuffleArray,
  validateSequenceOrder,
  validatePairConnections
} from './e2e-fixtures';

describe('Tier 2 E2E Test Suite: Boundary & Dynamic Slides Verification', () => {
  describe('Slide Boundary Navigation Clamping', () => {
    test('Lower bound: Clamps strictly to Slide 1 on invalid negative or zero jumps', () => {
      const simulator = new SlideDeckSimulator(7);
      expect(simulator.currentSlide).toBe(1);

      // Attempt invalid lower jumps
      simulator.goToSlide(0);
      expect(simulator.currentSlide).toBe(1);

      simulator.goToSlide(-1);
      expect(simulator.currentSlide).toBe(1);

      simulator.goToSlide(-9999);
      expect(simulator.currentSlide).toBe(1);

      // Attempt prevSlide from slide 1
      const prevResult = simulator.prevSlide();
      expect(prevResult).toBe(1);
      expect(simulator.currentSlide).toBe(1);
    });

    test('Upper bound: Clamps strictly to totalSlides on excessive forward jumps', () => {
      const testSlideCounts = [5, 7, 8];

      for (const total of testSlideCounts) {
        const simulator = new SlideDeckSimulator(total);

        simulator.goToSlide(total + 1);
        expect(simulator.currentSlide).toBe(total);

        simulator.goToSlide(total + 100);
        expect(simulator.currentSlide).toBe(total);

        simulator.goToSlide(999999);
        expect(simulator.currentSlide).toBe(total);
      }
    });

    test('Next slide on final slide triggers victory transition without boundary overflow', () => {
      const simulator = new SlideDeckSimulator(8);

      // Navigate to final slide
      simulator.goToSlide(8);
      expect(simulator.currentSlide).toBe(8);
      expect(simulator.isVictoryTriggered).toBe(false);

      // Next action on final slide should trigger victory
      const result = simulator.nextSlide();
      expect(result.currentSlide).toBe(8);
      expect(result.victory).toBe(true);
      expect(simulator.isVictoryTriggered).toBe(true);

      // Consecutive calls continue to clamp at slide 8 and keep victory triggered
      const resultRepeat = simulator.nextSlide();
      expect(resultRepeat.currentSlide).toBe(8);
      expect(resultRepeat.victory).toBe(true);
    });
  });

  describe('Dynamic Slide Counts (Not Locked to 6)', () => {
    test('Deck simulator operates smoothly across dynamic slide counts (5, 7, 8 slides)', () => {
      const configs = [
        { name: 'Standard 5-Slide Deck', total: 5 },
        { name: 'In-Depth 7-Slide Deck (Sains, Matematika, Bahasa, Catur)', total: 7 },
        { name: 'Comprehensive 8-Slide Deck (Lab, Candi, Hutan, Tata Surya, Sejarah)', total: 8 }
      ];

      for (const config of configs) {
        const sim = new SlideDeckSimulator(config.total);
        expect(sim.totalSlides).toBe(config.total);

        // Advance through all slides one-by-one
        for (let s = 1; s < config.total; s++) {
          expect(sim.currentSlide).toBe(s);
          const advance = sim.nextSlide();
          expect(advance.currentSlide).toBe(s + 1);
          expect(advance.victory).toBe(false);
        }

        expect(sim.currentSlide).toBe(config.total);

        // Final transition triggers victory
        const finalAdvance = sim.nextSlide();
        expect(finalAdvance.currentSlide).toBe(config.total);
        expect(finalAdvance.victory).toBe(true);
      }
    });

    test('Formally validates that 6 slides is NOT a hard requirement across the 10 games', () => {
      const allDecks = Object.values(AUTHORITATIVE_GAMES_SPEC);
      const nonSixDecks = allDecks.filter(d => d.slideCount !== 6);

      // At least 90% or all 10 decks should be dynamic and tailored to subject depth
      expect(nonSixDecks.length).toBeGreaterThanOrEqual(8);

      const countDistribution = allDecks.reduce((acc, d) => {
        acc[d.slideCount] = (acc[d.slideCount] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      // Confirm both 7-slide and 8-slide decks exist prominently
      expect(countDistribution[7]).toBeGreaterThanOrEqual(4);
      expect(countDistribution[8]).toBeGreaterThanOrEqual(4);
    });
  });

  describe('Reshuffle and Reset State Preservation', () => {
    test('Sequence shuffle preserves all items, IDs, and count without loss or duplication', () => {
      const originalCards = [
        { id: 'seq-1', order: 1, label: 'Evaporasi', icon: '☀️' },
        { id: 'seq-2', order: 2, label: 'Kondensasi', icon: '☁️' },
        { id: 'seq-3', order: 3, label: 'Presipitasi', icon: '🌧️' },
        { id: 'seq-4', order: 4, label: 'Infiltrasi', icon: '🌱' },
      ];

      for (let seed = 1; seed <= 10; seed++) {
        const shuffled = shuffleArray(originalCards, seed);

        // Count must match
        expect(shuffled.length).toBe(originalCards.length);

        // All IDs must still be present
        const originalIds = originalCards.map(c => c.id).sort();
        const shuffledIds = shuffled.map(c => c.id).sort();
        expect(shuffledIds).toEqual(originalIds);

        // Set of items must have no duplicates
        const uniqueIds = new Set(shuffled.map(c => c.id));
        expect(uniqueIds.size).toBe(originalCards.length);
      }
    });

    test('Simulator reset restores slide to 1 and clears challenge completions', () => {
      const sim = new SlideDeckSimulator(7);

      // Simulate student progress
      sim.goToSlide(5);
      sim.setMiniGameCompleted('challenge-1', true);
      sim.setMiniGameCompleted('challenge-2', true);
      expect(sim.currentSlide).toBe(5);
      expect(sim.isAllMiniGamesCompleted()).toBe(true);

      // Trigger reset
      sim.reset();
      expect(sim.currentSlide).toBe(1);
      expect(sim.isVictoryTriggered).toBe(false);
      expect(sim.isAllMiniGamesCompleted()).toBe(false);
      expect(Object.keys(sim.miniGameStates).length).toBe(0);
    });

    test('Match pairs connection reset cleanly wipes active lines without corrupting definitions', () => {
      const pairs = [
        { id: 'p1', leftText: 'Produsen', rightText: 'Pohon' },
        { id: 'p2', leftText: 'Konsumen', rightText: 'Orangutan' },
        { id: 'p3', leftText: 'Dekomposer', rightText: 'Jamur' }
      ];

      let userLines: Record<string, string> = {
        p1: 'p1',
        p2: 'p3', // Wrong connection
      };

      const resultBeforeReset = validatePairConnections(pairs, userLines);
      expect(resultBeforeReset.isComplete).toBe(false);
      expect(resultBeforeReset.correctCount).toBe(1);

      // Action: Reset lines
      userLines = {};
      const resultAfterReset = validatePairConnections(pairs, userLines);
      expect(resultAfterReset.isComplete).toBe(false);
      expect(resultAfterReset.correctCount).toBe(0);
      expect(Object.keys(userLines).length).toBe(0);

      // Original pairs definition intact
      expect(pairs.length).toBe(3);
    });
  });

  describe('Non-Crashing Input & Stress Scenarios', () => {
    test('Rapid consecutive slide transitions handle stress without state corruption', () => {
      const sim = new SlideDeckSimulator(8);

      // Perform 1000 random operations (forward, backward, jump)
      for (let i = 0; i < 1000; i++) {
        const op = i % 3;
        if (op === 0) {
          sim.nextSlide();
        } else if (op === 1) {
          sim.prevSlide();
        } else {
          sim.goToSlide((i % 12) - 2);
        }

        // Invariant: currentSlide must always stay within [1, 8]
        expect(sim.currentSlide).toBeGreaterThanOrEqual(1);
        expect(sim.currentSlide).toBeLessThanOrEqual(8);
      }
    });

    test('Sequence validator handles empty or single item arrays without throwing', () => {
      expect(validateSequenceOrder([])).toBe(false);

      const singleValid = [{ id: '1', order: 1 }];
      expect(validateSequenceOrder(singleValid)).toBe(true);

      const singleInvalid = [{ id: '1', order: 2 }];
      expect(validateSequenceOrder(singleInvalid)).toBe(false);
    });

    test('Pair validator handles mismatched, extra, or cross-referenced keys gracefully', () => {
      const pairs = [
        { id: 'p1' },
        { id: 'p2' }
      ];

      // Empty connections
      expect(validatePairConnections(pairs, {}).isComplete).toBe(false);

      // Foreign keys that do not exist in pairs
      const foreignKeys = { 'foreign-id': 'foreign-id' };
      const resForeign = validatePairConnections(pairs, foreignKeys);
      expect(resForeign.isComplete).toBe(false);
      expect(resForeign.correctCount).toBe(0);

      // Extra connection beyond expected pair count
      const extraKeys = { p1: 'p1', p2: 'p2', p3: 'p3' };
      const resExtra = validatePairConnections(pairs, extraKeys);
      expect(resExtra.isComplete).toBe(false); // Total keys != pairs.length
    });
  });
});
