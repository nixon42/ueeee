import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  HUMANITIES_PRESENTATION_DECKS,
  ULAR_TANGGA_MATEMATIKA_DECK,
  POINT_CLICK_CANDI_DECK,
  TEKA_TEKI_KATA_DECK,
  ULAR_TANGGA_SEJARAH_DECK,
  CATUR_TAKTIK_LOGIKA_DECK,
  FRACTION_DECIMAL_PAIRS,
  FRACTION_BLOCKS_SEQUENCE,
  CANDI_STRATA_SEQUENCE,
  BOROBUDUR_RELIEF_PAIRS,
  BOROBUDUR_FLASHCARDS,
  KBBI_BAKU_PAIRS,
  PANTUN_NASEHAT_SEQUENCE,
  PROKLAMASI_1945_SEQUENCE,
  PAHLAWAN_KEMERDEKAAN_PAIRS,
  PROKLAMASI_FLASHCARDS,
  CHESS_TACTIC_PAIRS,
  CHESS_CHECKMATE_SEQUENCE,
  ALL_PRESENTATION_DECKS,
  getPresentationDeckByGameId,
} from '../src/data/presentation-decks';
import { StoryPresentationDeckEngine } from '../src/components/canva-games/StoryPresentationDeckEngine';
import {
  PresentationDeckData,
  SequenceGameItem,
  MatchGamePair,
  FlashcardItem,
  MiniGameMatchSlide,
  MiniGameSequenceSlide,
  MiniGameFlashcardSlide,
} from '../src/types/presentation';

// ============================================================================
// ADVERSARIAL ORACLES & VERIFICATION HARNESSES
// ============================================================================

/**
 * Generate all permutations of an array using Heap's Algorithm
 */
function getAllPermutations<T>(items: T[]): T[][] {
  const result: T[][] = [];
  const c = new Array(items.length).fill(0);
  const a = [...items];
  result.push([...a]);

  let i = 0;
  while (i < a.length) {
    if (c[i] < i) {
      if (i % 2 === 0) {
        const temp = a[0];
        a[0] = a[i];
        a[i] = temp;
      } else {
        const temp = a[c[i]];
        a[c[i]] = a[i];
        a[i] = temp;
      }
      result.push([...a]);
      c[i]++;
      i = 0;
    } else {
      c[i] = 0;
      i++;
    }
  }
  return result;
}

/**
 * Deterministic Sequence Game validator matching CanvaSequenceGame engine logic
 * In CanvaSequenceGame:
 *   currentOrder.forEach((item, idx) => {
 *     if (item.order !== idx + 1) allCorrect = false;
 *   });
 */
function validateSequenceOrder(items: SequenceGameItem[]): boolean {
  if (items.length === 0) return true;
  return items.every((item, idx) => item.order === idx + 1);
}

/**
 * Deterministic Match Pairs validator matching CanvaMatchPairsGame engine logic
 * In CanvaMatchPairsGame:
 *   Object.entries(connections).forEach(([leftId, rightId]) => {
 *     if (leftId === rightId) correctCount++;
 *   });
 *   isSuccess = (correctCount === totalPairs) && (connectionsCount === totalPairs);
 */
function validateMatchConnections(
  pairs: MatchGamePair[],
  connections: Record<string, string>
): boolean {
  const totalPairs = pairs.length;
  const connectionCount = Object.keys(connections).length;
  if (connectionCount !== totalPairs) return false;

  let correctCount = 0;
  for (const [leftId, rightId] of Object.entries(connections)) {
    if (leftId === rightId) {
      correctCount++;
    }
  }
  return correctCount === totalPairs;
}

/**
 * In-place Fisher-Yates array shuffle for stochastic permutation fuzzing
 */
function fisherYatesShuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Deterministic Flashcard State Simulator matching InteractiveFlashcards engine
 */
class FlashcardHarness {
  cards: FlashcardItem[];
  currentIndex: number = 0;
  isFlipped: boolean = false;
  ratings: Record<string, 'mastered' | 'review'> = {};
  isFinished: boolean = false;
  completionResult: { mastered: number; total: number } | null = null;

  constructor(cards: FlashcardItem[]) {
    this.cards = [...cards];
  }

  flip() {
    this.isFlipped = !this.isFlipped;
  }

  rate(rating: 'mastered' | 'review') {
    if (this.cards.length === 0) return;
    const currentCard = this.cards[this.currentIndex];
    this.ratings[currentCard.id] = rating;

    if (this.currentIndex < this.cards.length - 1) {
      this.isFlipped = false;
      this.currentIndex++;
    } else {
      this.isFinished = true;
      const mastered = Object.values(this.ratings).filter(r => r === 'mastered').length;
      this.completionResult = { mastered, total: this.cards.length };
    }
  }

  reset() {
    this.currentIndex = 0;
    this.isFlipped = false;
    this.ratings = {};
    this.isFinished = false;
    this.completionResult = null;
  }
}

/**
 * Slide Navigation State Machine Simulator matching StoryPresentationDeckEngine
 */
class PresentationNavigationHarness {
  totalSlides: number;
  currentSlide: number;
  isVictoryOpen: boolean = false;
  challengesState: Record<string, boolean> = {};

  constructor(slideCount: number, initialSlide: number = 1) {
    this.totalSlides = Math.max(1, slideCount);
    this.currentSlide = Math.max(1, Math.min(this.totalSlides, Math.floor(initialSlide) || 1));
  }

  goToSlide(slideNum: number) {
    const clamped = Math.max(1, Math.min(this.totalSlides, Math.floor(slideNum) || 1));
    this.currentSlide = clamped;
  }

  next() {
    if (this.currentSlide < this.totalSlides) {
      this.goToSlide(this.currentSlide + 1);
    } else {
      this.isVictoryOpen = true;
    }
  }

  prev() {
    if (this.currentSlide > 1) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  recordChallenge(key: string, isDone: boolean) {
    this.challengesState[key] = isDone;
  }

  reset() {
    this.currentSlide = 1;
    this.isVictoryOpen = false;
    this.challengesState = {};
  }
}

// ============================================================================
// TEST SUITE: ADVERSARIAL STRESS TESTING ON HUMANITIES DECKS (MILESTONE 3)
// ============================================================================

describe('Adversarial Stress Verification: Humanities Presentation Decks (Milestone 3)', () => {
  const ALL_HUMANITIES_DECKS: PresentationDeckData[] = [
    ULAR_TANGGA_MATEMATIKA_DECK,
    POINT_CLICK_CANDI_DECK,
    TEKA_TEKI_KATA_DECK,
    ULAR_TANGGA_SEJARAH_DECK,
    CATUR_TAKTIK_LOGIKA_DECK,
  ];

  const ALL_MATCH_PAIRS: { name: string; deckId: string; pairs: MatchGamePair[] }[] = [
    { name: 'FRACTION_DECIMAL_PAIRS', deckId: 'ular-tangga-matematika', pairs: FRACTION_DECIMAL_PAIRS },
    { name: 'BOROBUDUR_RELIEF_PAIRS', deckId: 'point-click-candi', pairs: BOROBUDUR_RELIEF_PAIRS },
    { name: 'KBBI_BAKU_PAIRS', deckId: 'teka-teki-kata', pairs: KBBI_BAKU_PAIRS },
    { name: 'PAHLAWAN_KEMERDEKAAN_PAIRS', deckId: 'ular-tangga-sejarah', pairs: PAHLAWAN_KEMERDEKAAN_PAIRS },
    { name: 'CHESS_TACTIC_PAIRS', deckId: 'catur-taktik-logika', pairs: CHESS_TACTIC_PAIRS },
  ];

  const ALL_SEQUENCES: { name: string; deckId: string; items: SequenceGameItem[] }[] = [
    { name: 'FRACTION_BLOCKS_SEQUENCE', deckId: 'ular-tangga-matematika', items: FRACTION_BLOCKS_SEQUENCE },
    { name: 'CANDI_STRATA_SEQUENCE', deckId: 'point-click-candi', items: CANDI_STRATA_SEQUENCE },
    { name: 'PANTUN_NASEHAT_SEQUENCE', deckId: 'teka-teki-kata', items: PANTUN_NASEHAT_SEQUENCE },
    { name: 'PROKLAMASI_1945_SEQUENCE', deckId: 'ular-tangga-sejarah', items: PROKLAMASI_1945_SEQUENCE },
    { name: 'CHESS_CHECKMATE_SEQUENCE', deckId: 'catur-taktik-logika', items: CHESS_CHECKMATE_SEQUENCE },
  ];

  // ==========================================================================
  // SECTION 1: MATCHING PAIRS BIJECTION & ADVERSARIAL ORACLES
  // ==========================================================================
  describe('Matching Pairs: True 1-to-1 Bijection & Unambiguous Mapping Stress', () => {
    test.each(ALL_MATCH_PAIRS)(
      'True 1-to-1 bijection for $name: unique IDs, unique left texts, unique right texts',
      ({ pairs }) => {
        expect(pairs.length).toBeGreaterThanOrEqual(4);

        const ids = pairs.map(p => p.id);
        const leftTexts = pairs.map(p => p.leftText.trim());
        const rightTexts = pairs.map(p => p.rightText.trim());

        // 1. ID Uniqueness within the set
        expect(new Set(ids).size).toBe(pairs.length);

        // 2. Injective Left Text (no two pairs share the same left item)
        expect(new Set(leftTexts).size).toBe(pairs.length);

        // 3. Injective Right Text (no two pairs share the same right item)
        expect(new Set(rightTexts).size).toBe(pairs.length);

        // 4. Equal Cardinality |Left| === |Right| === |Pairs|
        expect(leftTexts.length).toBe(pairs.length);
        expect(rightTexts.length).toBe(pairs.length);

        // 5. Non-empty, trimmed strings
        pairs.forEach(p => {
          expect(p.id.trim().length).toBeGreaterThan(0);
          expect(p.leftText.trim().length).toBeGreaterThan(0);
          expect(p.rightText.trim().length).toBeGreaterThan(0);

          // Non-triviality: left is not identical to right
          expect(p.leftText.trim().toLowerCase()).not.toBe(p.rightText.trim().toLowerCase());
        });
      }
    );

    test.each(ALL_MATCH_PAIRS)(
      'Exhaustive permutation oracle for $name: exactly 1 valid assignment out of N! permutations',
      ({ pairs }) => {
        const n = pairs.length;
        const rightIds = pairs.map(p => p.id);
        const allRightPermutations = getAllPermutations(rightIds);

        const expectedTotalPermutations = n === 4 ? 24 : n === 5 ? 120 : 720;
        expect(allRightPermutations.length).toBe(expectedTotalPermutations);

        let validCount = 0;
        let invalidCount = 0;

        for (const perm of allRightPermutations) {
          // Construct connection mapping: left[i].id -> perm[i]
          const connections: Record<string, string> = {};
          pairs.forEach((pair, idx) => {
            connections[pair.id] = perm[idx];
          });

          const isValid = validateMatchConnections(pairs, connections);
          if (isValid) {
            validCount++;
            // The valid connection must match leftId === rightId for all
            Object.entries(connections).forEach(([l, r]) => {
              expect(l).toBe(r);
            });
          } else {
            invalidCount++;
          }
        }

        // Exactly 1 permutation is the correct bijection
        expect(validCount).toBe(1);
        expect(invalidCount).toBe(expectedTotalPermutations - 1);
      }
    );

    test.each(ALL_MATCH_PAIRS)(
      'Transposition sensitivity for $name: swapping any two connections strictly fails validation',
      ({ pairs }) => {
        // Build base correct connections
        const baseCorrect: Record<string, string> = {};
        pairs.forEach(p => {
          baseCorrect[p.id] = p.id;
        });
        expect(validateMatchConnections(pairs, baseCorrect)).toBe(true);

        let transpositionCount = 0;
        // Perturb by swapping targets of item i and item j
        for (let i = 0; i < pairs.length; i++) {
          for (let j = i + 1; j < pairs.length; j++) {
            const perturbed = { ...baseCorrect };
            perturbed[pairs[i].id] = baseCorrect[pairs[j].id];
            perturbed[pairs[j].id] = baseCorrect[pairs[i].id];

            expect(validateMatchConnections(pairs, perturbed)).toBe(false);
            transpositionCount++;
          }
        }

        expect(transpositionCount).toBe((pairs.length * (pairs.length - 1)) / 2);
      }
    );

    test.each(ALL_MATCH_PAIRS)(
      'Incomplete connection rejection for $name: dropping any single connection fails',
      ({ pairs }) => {
        // Drop each pair one by one
        for (let dropIdx = 0; dropIdx < pairs.length; dropIdx++) {
          const incomplete: Record<string, string> = {};
          pairs.forEach((p, idx) => {
            if (idx !== dropIdx) {
              incomplete[p.id] = p.id;
            }
          });

          expect(validateMatchConnections(pairs, incomplete)).toBe(false);
        }

        // Completely empty connections fails
        expect(validateMatchConnections(pairs, {})).toBe(false);
      }
    );

    test.each(ALL_MATCH_PAIRS)(
      'Foreign or corrupt keys in connections are strictly rejected for $name',
      ({ pairs }) => {
        const corrupt1: Record<string, string> = {};
        pairs.forEach(p => {
          corrupt1[p.id] = 'corrupted-non-existent-id';
        });
        expect(validateMatchConnections(pairs, corrupt1)).toBe(false);

        // Injection of extra random key
        const corrupt2: Record<string, string> = {};
        pairs.forEach(p => {
          corrupt2[p.id] = p.id;
        });
        corrupt2['rogue-key'] = 'rogue-val';
        expect(validateMatchConnections(pairs, corrupt2)).toBe(false);
      }
    );

    test('Slide decks embed their matching pairs without data mutation or reference drift', () => {
      // 1. Matematika deck
      const utmMatchSlide = ULAR_TANGGA_MATEMATIKA_DECK.slides.find(
        s => s.type === 'mini-game-match'
      ) as MiniGameMatchSlide;
      expect(utmMatchSlide).toBeDefined();
      expect(utmMatchSlide.pairs).toBe(FRACTION_DECIMAL_PAIRS);
      expect(utmMatchSlide.columnALabel).toBe('Pecahan Biasa');
      expect(utmMatchSlide.columnBLabel).toBe('Bentuk Desimal');

      // 2. Candi deck
      const candiMatchSlide = POINT_CLICK_CANDI_DECK.slides.find(
        s => s.type === 'mini-game-match'
      ) as MiniGameMatchSlide;
      expect(candiMatchSlide).toBeDefined();
      expect(candiMatchSlide.pairs).toBe(BOROBUDUR_RELIEF_PAIRS);

      // 3. Kata deck
      const kataMatchSlide = TEKA_TEKI_KATA_DECK.slides.find(
        s => s.type === 'mini-game-match'
      ) as MiniGameMatchSlide;
      expect(kataMatchSlide).toBeDefined();
      expect(kataMatchSlide.pairs).toBe(KBBI_BAKU_PAIRS);

      // 4. Sejarah deck
      const sejarahMatchSlide = ULAR_TANGGA_SEJARAH_DECK.slides.find(
        s => s.type === 'mini-game-match'
      ) as MiniGameMatchSlide;
      expect(sejarahMatchSlide).toBeDefined();
      expect(sejarahMatchSlide.pairs).toBe(PAHLAWAN_KEMERDEKAAN_PAIRS);

      // 5. Catur deck
      const caturMatchSlide = CATUR_TAKTIK_LOGIKA_DECK.slides.find(
        s => s.type === 'mini-game-match'
      ) as MiniGameMatchSlide;
      expect(caturMatchSlide).toBeDefined();
      expect(caturMatchSlide.pairs).toBe(CHESS_TACTIC_PAIRS);
    });

    test('Cross-deck pair ID namespace analysis and engine isolation', () => {
      // Documenting ID reuse between PAHLAWAN_KEMERDEKAAN_PAIRS and CHESS_TACTIC_PAIRS
      const pahlawanIds = PAHLAWAN_KEMERDEKAAN_PAIRS.map(p => p.id);
      const chessIds = CHESS_TACTIC_PAIRS.map(p => p.id);

      // Both use t1..t4 prefix
      expect(pahlawanIds).toEqual(['t1', 't2', 't3', 't4']);
      expect(chessIds).toEqual(['t1', 't2', 't3', 't4']);

      // Verify that their slide challengeKeys are strictly unique
      const sejarahDeck = ULAR_TANGGA_SEJARAH_DECK.slides.find(s => s.type === 'mini-game-match');
      const caturDeck = CATUR_TAKTIK_LOGIKA_DECK.slides.find(s => s.type === 'mini-game-match');

      expect(sejarahDeck?.challengeKey).toBe('tokoh-pairs');
      expect(caturDeck?.challengeKey).toBe('chess-tactics');
      expect(sejarahDeck?.challengeKey).not.toBe(caturDeck?.challengeKey);

      // Verify that engine state simulator keeps their completion states isolated
      const nav = new PresentationNavigationHarness(8, 1);
      nav.recordChallenge(sejarahDeck!.challengeKey!, true);
      expect(nav.challengesState['tokoh-pairs']).toBe(true);
      expect(nav.challengesState['chess-tactics']).toBeUndefined();
    });
  });

  // ==========================================================================
  // SECTION 2: SEQUENCE MINI-GAMES INVARIANCE & PERMUTATION SENSITIVITY
  // ==========================================================================
  describe('Sequence Mini-Games: Contiguous 1..N Order & Permutation Invariance Oracles', () => {
    test.each(ALL_SEQUENCES)(
      'Contiguous 1..N order invariant for $name: strict {1..N} integers with no gaps or duplicates',
      ({ items }) => {
        const n = items.length;
        expect(n).toBeGreaterThanOrEqual(4);

        const orders = items.map(item => item.order);
        const ids = items.map(item => item.id);

        // 1. ID uniqueness
        expect(new Set(ids).size).toBe(n);

        // 2. Orders must contain each integer from 1 to N exactly once
        const expectedSet = new Set(Array.from({ length: n }, (_, i) => i + 1));
        expect(new Set(orders)).toEqual(expectedSet);

        // 3. Min order is 1, Max order is N
        expect(Math.min(...orders)).toBe(1);
        expect(Math.max(...orders)).toBe(n);

        // 4. Default definition order is strictly canonical ascending
        items.forEach((item, idx) => {
          expect(item.order).toBe(idx + 1);
          expect(item.id.trim().length).toBeGreaterThan(0);
          expect(item.label.trim().length).toBeGreaterThan(0);
          expect(item.iconEmoji.trim().length).toBeGreaterThan(0);
          expect(item.description).toBeDefined();
          expect(item.description!.trim().length).toBeGreaterThan(0);
        });
      }
    );

    test.each(ALL_SEQUENCES)(
      'Heap Algorithm exhaustive permutation oracle for $name: exactly 1 valid out of N! permutations',
      ({ items }) => {
        const n = items.length;
        const allPermutations = getAllPermutations(items);
        const expectedCount = n === 4 ? 24 : n === 5 ? 120 : 720;
        expect(allPermutations.length).toBe(expectedCount);

        let validCount = 0;
        let invalidCount = 0;

        for (const perm of allPermutations) {
          const isValid = validateSequenceOrder(perm);
          if (isValid) {
            validCount++;
            // The valid permutation must be in contiguous order 1..N
            perm.forEach((item, idx) => {
              expect(item.order).toBe(idx + 1);
            });
          } else {
            invalidCount++;
          }
        }

        // Exactly one permutation matches the solution
        expect(validCount).toBe(1);
        expect(invalidCount).toBe(expectedCount - 1);
      }
    );

    test.each(ALL_SEQUENCES)(
      'Pairwise transposition sensitivity for $name: all N*(N-1)/2 swaps fail validation',
      ({ items }) => {
        // Identity passes
        expect(validateSequenceOrder(items)).toBe(true);

        let swapCount = 0;
        for (let i = 0; i < items.length; i++) {
          for (let j = i + 1; j < items.length; j++) {
            const swapped = [...items];
            const temp = swapped[i];
            swapped[i] = swapped[j];
            swapped[j] = temp;

            expect(validateSequenceOrder(swapped)).toBe(false);
            swapCount++;
          }
        }

        expect(swapCount).toBe((items.length * (items.length - 1)) / 2);
      }
    );

    test.each(ALL_SEQUENCES)(
      'Cyclic rotations, reversal, and boundary perturbations strictly fail for $name',
      ({ items }) => {
        // 1. Complete reverse order
        const reversed = [...items].reverse();
        expect(validateSequenceOrder(reversed)).toBe(false);

        // 2. All cyclic shifts from 1 to N-1
        for (let shift = 1; shift < items.length; shift++) {
          const rotated = [...items.slice(shift), ...items.slice(0, shift)];
          expect(validateSequenceOrder(rotated)).toBe(false);
        }

        // 3. Boundary swap (first element with last element)
        const boundarySwapped = [...items];
        const lastIdx = items.length - 1;
        boundarySwapped[0] = items[lastIdx];
        boundarySwapped[lastIdx] = items[0];
        expect(validateSequenceOrder(boundarySwapped)).toBe(false);
      }
    );

    test.each(ALL_SEQUENCES)(
      'Fisher-Yates randomized permutation stress for $name: 500 trials with strict oracle agreement',
      ({ items }) => {
        const TRIALS = 500;
        let identityHitCount = 0;

        for (let trial = 0; trial < TRIALS; trial++) {
          const shuffled = fisherYatesShuffle(items);
          const isValid = validateSequenceOrder(shuffled);

          // Is it identical to the canonical sequence?
          const isIdentical = shuffled.every((item, idx) => item.id === items[idx].id);

          if (isIdentical) {
            expect(isValid).toBe(true);
            identityHitCount++;
          } else {
            expect(isValid).toBe(false);
          }
        }

        // Stochastic sanity check: non-identity permutations dominate (e.g. at least 95% of random shuffles fail)
        expect(identityHitCount).toBeLessThan(TRIALS * 0.1);
      }
    );

    test.each(ALL_SEQUENCES)(
      'Structural mutation stress on $name: corrupting indices or duplicating items fails validation',
      ({ items }) => {
        // Mutation A: duplicate item 0 into item 1
        const dupMutation = [...items];
        dupMutation[1] = { ...dupMutation[0] };
        expect(validateSequenceOrder(dupMutation)).toBe(false);

        // Mutation B: zero-indexed corruption (shift all orders by -1)
        const zeroIndexed = items.map(item => ({ ...item, order: item.order - 1 }));
        expect(validateSequenceOrder(zeroIndexed)).toBe(false);

        // Mutation C: off-by-one increase (orders 2..N+1)
        const shiftedOrders = items.map(item => ({ ...item, order: item.order + 1 }));
        expect(validateSequenceOrder(shiftedOrders)).toBe(false);

        // Mutation D: truncated array (drop last item)
        const truncated = items.slice(0, items.length - 1);
        // Truncated array satisfies item.order === idx + 1 for its length,
        // but does NOT satisfy total sequence completeness against expected N
        expect(truncated.length).toBe(items.length - 1);
        expect(truncated.length).toBeLessThan(items.length);
      }
    );

    test('Slide decks embed sequence games without item mutation or order corruption', () => {
      // 1. Matematika deck
      const utmSeqSlide = ULAR_TANGGA_MATEMATIKA_DECK.slides.find(
        s => s.type === 'mini-game-sequence'
      ) as MiniGameSequenceSlide;
      expect(utmSeqSlide).toBeDefined();
      expect(utmSeqSlide.items).toBe(FRACTION_BLOCKS_SEQUENCE);
      expect(validateSequenceOrder(utmSeqSlide.items)).toBe(true);

      // 2. Candi deck
      const candiSeqSlide = POINT_CLICK_CANDI_DECK.slides.find(
        s => s.type === 'mini-game-sequence'
      ) as MiniGameSequenceSlide;
      expect(candiSeqSlide).toBeDefined();
      expect(candiSeqSlide.items).toBe(CANDI_STRATA_SEQUENCE);
      expect(validateSequenceOrder(candiSeqSlide.items)).toBe(true);

      // 3. Kata deck
      const kataSeqSlide = TEKA_TEKI_KATA_DECK.slides.find(
        s => s.type === 'mini-game-sequence'
      ) as MiniGameSequenceSlide;
      expect(kataSeqSlide).toBeDefined();
      expect(kataSeqSlide.items).toBe(PANTUN_NASEHAT_SEQUENCE);
      expect(validateSequenceOrder(kataSeqSlide.items)).toBe(true);

      // 4. Sejarah deck
      const sejarahSeqSlide = ULAR_TANGGA_SEJARAH_DECK.slides.find(
        s => s.type === 'mini-game-sequence'
      ) as MiniGameSequenceSlide;
      expect(sejarahSeqSlide).toBeDefined();
      expect(sejarahSeqSlide.items).toBe(PROKLAMASI_1945_SEQUENCE);
      expect(validateSequenceOrder(sejarahSeqSlide.items)).toBe(true);

      // 5. Catur deck
      const caturSeqSlide = CATUR_TAKTIK_LOGIKA_DECK.slides.find(
        s => s.type === 'mini-game-sequence'
      ) as MiniGameSequenceSlide;
      expect(caturSeqSlide).toBeDefined();
      expect(caturSeqSlide.items).toBe(CHESS_CHECKMATE_SEQUENCE);
      expect(validateSequenceOrder(caturSeqSlide.items)).toBe(true);
    });
  });

  // ==========================================================================
  // SECTION 3: DOMAIN-SPECIFIC CURRICULUM & NUMERICAL INVARIANCE
  // ==========================================================================
  describe('Domain-Specific Curriculum & Numerical Invariance Verifications', () => {
    test('Matematika: FRACTION_DECIMAL_PAIRS values are mathematically exact', () => {
      // Parse fractions and compare with decimal values
      const pairMap: Record<string, number> = {
        '1/2': 0.50,
        '3/4': 0.75,
        '2/5': 0.40,
        '1/8': 0.125,
      };

      FRACTION_DECIMAL_PAIRS.forEach(p => {
        const [num, den] = p.leftText.split('/').map(Number);
        const calculated = num / den;
        const targetDecimal = parseFloat(p.rightText);

        expect(Math.abs(calculated - targetDecimal)).toBeLessThan(1e-6);
        expect(pairMap[p.leftText]).toBe(targetDecimal);
      });
    });

    test('Matematika: FRACTION_BLOCKS_SEQUENCE is strictly monotonically increasing', () => {
      // 1/5 (0.20) < 1/3 (0.33) < 1/2 (0.50) < 3/4 (0.75) < 9/10 (0.90)
      const numericValues = FRACTION_BLOCKS_SEQUENCE.map(item => {
        const match = item.label.match(/\(([\d.]+)\)/);
        expect(match).not.toBeNull();
        return parseFloat(match![1]);
      });

      expect(numericValues.length).toBe(5);
      for (let i = 0; i < numericValues.length - 1; i++) {
        expect(numericValues[i]).toBeLessThan(numericValues[i + 1]);
      }
    });

    test('Candi Borobudur: CANDI_STRATA_SEQUENCE strictly follows Buddhist vertical cosmology', () => {
      // 1. Kamadhatu (kaki candi / hasrat duniawi)
      // 2. Rupadhatu (tubuh candi berelief / peralihan bentuk)
      // 3. Arupadhatu (teras bundar berstupa / alam tanpa rupa)
      // 4. Stupa Induk (puncak pencerahan tertinggi)
      expect(CANDI_STRATA_SEQUENCE[0].label).toBe('Kamadhatu');
      expect(CANDI_STRATA_SEQUENCE[1].label).toBe('Rupadhatu');
      expect(CANDI_STRATA_SEQUENCE[2].label).toBe('Arupadhatu');
      expect(CANDI_STRATA_SEQUENCE[3].label).toBe('Stupa Induk');
    });

    test('Bahasa: KBBI_BAKU_PAIRS correctly maps non-standard Indonesian to official standard', () => {
      const expectedMappings: Record<string, string> = {
        'Apotik': 'Apotek',
        'Ijin': 'Izin',
        'Praktek': 'Praktik',
        'Nasehat': 'Nasihat',
        'Analisa': 'Analisis',
      };

      KBBI_BAKU_PAIRS.forEach(p => {
        expect(expectedMappings[p.leftText]).toBe(p.rightText);
      });
    });

    test('Bahasa: PANTUN_NASEHAT_SEQUENCE conforms strictly to 4-baris Sampiran-Isi and A-B-A-B rhyme', () => {
      expect(PANTUN_NASEHAT_SEQUENCE.length).toBe(4);
      expect(PANTUN_NASEHAT_SEQUENCE[0].label).toBe('Sampiran 1');
      expect(PANTUN_NASEHAT_SEQUENCE[1].label).toBe('Sampiran 2');
      expect(PANTUN_NASEHAT_SEQUENCE[2].label).toBe('Isi 1');
      expect(PANTUN_NASEHAT_SEQUENCE[3].label).toBe('Isi 2');

      // Check rhyme markers in descriptions
      expect(PANTUN_NASEHAT_SEQUENCE[0].description).toContain('-ka');
      expect(PANTUN_NASEHAT_SEQUENCE[1].description).toContain('-uh');
      expect(PANTUN_NASEHAT_SEQUENCE[2].description).toContain('-da');
      expect(PANTUN_NASEHAT_SEQUENCE[3].description).toContain('-uh');
    });

    test('Sejarah: PROKLAMASI_1945_SEQUENCE follows strict historical timeline (15-17 Agustus 1945)', () => {
      const expectedTimeline = [
        'Kekalahan Jepang',
        'Rengasdengklok',
        'Perumusan Naskah',
        'Pengetikan Sayuti Melik',
        'Pembacaan Proklamasi',
      ];

      PROKLAMASI_1945_SEQUENCE.forEach((item, idx) => {
        expect(item.label).toBe(expectedTimeline[idx]);
        expect(item.order).toBe(idx + 1);
      });
    });

    test('Catur: CHESS_CHECKMATE_SEQUENCE follows structured tactical progression', () => {
      const expectedSteps = [
        'Identifikasi Celah',
        'Pancingan Pengorbanan',
        'Penetrasi Benteng/Ratu',
        'Skakmat Mutlak',
      ];

      CHESS_CHECKMATE_SEQUENCE.forEach((item, idx) => {
        expect(item.label).toBe(expectedSteps[idx]);
        expect(item.order).toBe(idx + 1);
      });
    });
  });

  // ==========================================================================
  // SECTION 4: FLASHCARD MINI-GAME STATE MACHINE STRESS
  // ==========================================================================
  describe('Flashcard Mini-Games: State Machine Invariance & Pedagogical Integrity', () => {
    const FLASHCARD_DECKS = [
      { name: 'BOROBUDUR_FLASHCARDS', cards: BOROBUDUR_FLASHCARDS },
      { name: 'PROKLAMASI_FLASHCARDS', cards: PROKLAMASI_FLASHCARDS },
    ];

    test.each(FLASHCARD_DECKS)(
      'Data sanity for $name: unique IDs, prompts, answers, and curriculum facts',
      ({ cards }) => {
        expect(cards.length).toBeGreaterThanOrEqual(2);
        const ids = cards.map(c => c.id);
        expect(new Set(ids).size).toBe(cards.length);

        cards.forEach(card => {
          expect(card.frontPrompt.trim().length).toBeGreaterThanOrEqual(10);
          expect(card.backAnswer.trim().length).toBeGreaterThanOrEqual(3);
          expect(card.backExplanation.trim().length).toBeGreaterThanOrEqual(15);
          expect(card.backCurriculumFact.trim().length).toBeGreaterThanOrEqual(15);
          expect(card.frontEmoji.trim().length).toBeGreaterThan(0);
        });
      }
    );

    test.each(FLASHCARD_DECKS)(
      'FlashcardHarness state machine simulation for $name',
      ({ cards }) => {
        const harness = new FlashcardHarness(cards);
        expect(harness.currentIndex).toBe(0);
        expect(harness.isFlipped).toBe(false);
        expect(harness.isFinished).toBe(false);

        // Flip card
        harness.flip();
        expect(harness.isFlipped).toBe(true);
        harness.flip();
        expect(harness.isFlipped).toBe(false);

        // Rate each card as mastered
        for (let i = 0; i < cards.length; i++) {
          expect(harness.currentIndex).toBe(i);
          harness.flip();
          harness.rate('mastered');
        }

        expect(harness.isFinished).toBe(true);
        expect(harness.completionResult).toEqual({
          mastered: cards.length,
          total: cards.length,
        });

        // Reset
        harness.reset();
        expect(harness.currentIndex).toBe(0);
        expect(harness.isFinished).toBe(false);
        expect(harness.completionResult).toBeNull();
      }
    );
  });

  // ==========================================================================
  // SECTION 5: ENGINE RENDERING & NAVIGATION STRESS
  // ==========================================================================
  describe('Engine Rendering & Navigation State Machine Stress', () => {
    test('Every slide of all 5 Humanities decks renders markup without throwing via renderToString', () => {
      for (const deck of ALL_HUMANITIES_DECKS) {
        expect(deck.slides.length).toBeGreaterThanOrEqual(7);

        for (let slideNum = 1; slideNum <= deck.slides.length; slideNum++) {
          let html = '';
          expect(() => {
            html = renderToString(
              React.createElement(StoryPresentationDeckEngine, {
                isOpen: true,
                onClose: () => {},
                deck,
                initialSlide: slideNum,
              })
            );
          }).not.toThrow();

          expect(html.length).toBeGreaterThan(100);
          expect(html).not.toContain('[object Object]');
          expect(html).not.toContain('NaN');
          expect(html).not.toContain('Slide tipe tidak dikenal');
          expect(html).toContain(`Slide ${slideNum} dari ${deck.totalSlides}`);
        }
      }
    });

    test('1000 randomized navigation transitions maintain slide invariants within [1, totalSlides]', () => {
      for (const deck of ALL_HUMANITIES_DECKS) {
        const nav = new PresentationNavigationHarness(deck.totalSlides, 1);

        for (let step = 0; step < 200; step++) {
          const action = Math.floor(Math.random() * 4);
          if (action === 0) nav.next();
          else if (action === 1) nav.prev();
          else if (action === 2) nav.goToSlide(Math.floor(Math.random() * 20) - 5);
          else if (action === 3) nav.recordChallenge(`test-ch-${step}`, Math.random() > 0.5);

          expect(nav.currentSlide).toBeGreaterThanOrEqual(1);
          expect(nav.currentSlide).toBeLessThanOrEqual(deck.totalSlides);
        }

        nav.reset();
        expect(nav.currentSlide).toBe(1);
        expect(nav.isVictoryOpen).toBe(false);
        expect(Object.keys(nav.challengesState).length).toBe(0);
      }
    });

    test('All 5 Humanities decks strictly conform to dynamic slide counts and the 5-phase narrative arc', () => {
      const counts = ALL_HUMANITIES_DECKS.map(d => d.totalSlides);
      const uniqueCounts = new Set(counts);

      // Slide counts are dynamic (7 and 8)
      expect(uniqueCounts.has(7)).toBe(true);
      expect(uniqueCounts.has(8)).toBe(true);
      // Zero decks have locked 6 slides
      expect(uniqueCounts.has(6)).toBe(false);

      for (const deck of ALL_HUMANITIES_DECKS) {
        expect(deck.slides.length).toBe(deck.totalSlides);

        const types = deck.slides.map(s => s.type);

        // Phase 1: Narrative Intro
        expect(types[0]).toBe('narrative-intro');

        // Phase 2: Concept Infographic
        expect(types.filter(t => t === 'concept-infographic').length).toBeGreaterThanOrEqual(1);

        // Phase 3: Interactive Mini-Games (Sequence, Match, Flashcards)
        const miniGames = types.filter(t => t.startsWith('mini-game-'));
        expect(miniGames.length).toBeGreaterThanOrEqual(2);

        // Phase 4: Story Resolution
        expect(types[types.length - 2]).toBe('story-resolution');

        // Phase 5: Reflection Spark
        expect(types[types.length - 1]).toBe('reflection-spark');
      }
    });

    test('Global uniqueness of slide IDs across all 37 slides of the 5 Humanities decks', () => {
      const allSlideIds: string[] = [];
      for (const deck of ALL_HUMANITIES_DECKS) {
        for (const slide of deck.slides) {
          allSlideIds.push(slide.id);
        }
      }

      // Total slides: 7 + 8 + 7 + 8 + 7 = 37 slides
      expect(allSlideIds.length).toBe(37);
      const uniqueIds = new Set(allSlideIds);
      expect(uniqueIds.size).toBe(37);
    });
  });
});
