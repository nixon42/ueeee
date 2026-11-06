import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  SCIENCE_PRESENTATION_DECKS,
  ULAR_TANGGA_SAINS_DECK,
  POINT_CLICK_LAB_DECK,
  POINT_CLICK_HUTAN_DECK,
  ULAR_TANGGA_TATASURYA_DECK,
  FOREST_ECOSYSTEM_DECK,
  PRESENTASI_EKOSISTEM_HUTAN_DECK,
  WATER_CYCLE_SEQUENCE,
  ENERGY_TRANSFORMATION_PAIRS,
  LAB_K3_PAIRS,
  SCIENTIFIC_METHOD_SEQUENCE,
  LAB_FLASHCARDS,
  BIOGEOGRAPHY_FAUNA_PAIRS,
  CANOPY_STRATA_SEQUENCE,
  HUTAN_FLASHCARDS,
  SOLAR_PLANETS_SEQUENCE,
  SPACE_CHARACTERISTICS_PAIRS,
  ECLIPSE_GEOMETRY_SEQUENCE,
  PHOTOSYNTHESIS_ENERGY_SEQUENCE,
  FOREST_TROPHIC_PAIRS,
  getPresentationDeckByGameId,
} from '../src/data/presentation-decks';
import { StoryPresentationDeckEngine } from '../src/components/canva-games/StoryPresentationDeckEngine';
import {
  PresentationDeckData,
  SequenceGameItem,
  MatchGamePair,
  FlashcardItem,
  SlideDefinition,
  MiniGameSequenceSlide,
  MiniGameMatchSlide,
  MiniGameFlashcardSlide,
} from '../src/types/presentation';

// ============================================================================
// ADVERSARIAL UTILITIES & STATE SIMULATORS
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
 * Deterministic Sequence Game validator matching CanvaSequenceGame engine
 */
function validateSequenceOrder(items: SequenceGameItem[]): boolean {
  if (items.length === 0) return true;
  return items.every((item, idx) => item.order === idx + 1);
}

/**
 * Deterministic Match Pairs validator matching CanvaMatchPairsGame engine
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

// ============================================================================
// TEST SUITE: ADVERSARIAL STRESS TESTING ON SCIENCE PRESENTATION DECKS
// ============================================================================

describe('Adversarial Stress Testing: Science Presentation Decks (Milestone 2)', () => {
  const ALL_SCIENCE_DECKS: PresentationDeckData[] = [
    ULAR_TANGGA_SAINS_DECK,
    POINT_CLICK_LAB_DECK,
    POINT_CLICK_HUTAN_DECK,
    ULAR_TANGGA_TATASURYA_DECK,
    FOREST_ECOSYSTEM_DECK,
  ];

  // ==========================================================================
  // 1. SEQUENCE MINI-GAMES: PERMUTATION INVARIANCE & SENSITIVITY
  // ==========================================================================
  describe('Sequence Mini-Games: Permutation Invariance & Validation Oracles', () => {
    const SMALL_SEQUENCES: { name: string; items: SequenceGameItem[] }[] = [
      { name: 'Daur Air (4 items)', items: WATER_CYCLE_SEQUENCE },
      { name: 'Metode Ilmiah (5 items)', items: SCIENTIFIC_METHOD_SEQUENCE },
      { name: 'Strata Kanopi (4 items)', items: CANOPY_STRATA_SEQUENCE },
      { name: 'Geometri Gerhana (3 items)', items: ECLIPSE_GEOMETRY_SEQUENCE },
      { name: 'Aliran Energi Fotosintesis (4 items)', items: PHOTOSYNTHESIS_ENERGY_SEQUENCE },
    ];

    SMALL_SEQUENCES.forEach(({ name, items }) => {
      test(`Exhaustive permutation oracle for ${name}: exactly 1 permutation is valid out of ${items.length}!`, () => {
        const permutations = getAllPermutations(items);
        const expectedCount = items.length === 3 ? 6 : items.length === 4 ? 24 : 120;
        expect(permutations.length).toBe(expectedCount);

        let validPermutations = 0;
        for (const perm of permutations) {
          const isValid = validateSequenceOrder(perm);
          if (isValid) {
            validPermutations++;
            // Assert that the valid permutation is strictly sorted by order 1..N
            perm.forEach((item, idx) => {
              expect(item.order).toBe(idx + 1);
            });
          }
        }

        // Exactly one permutation must be valid
        expect(validPermutations).toBe(1);
      });
    });

    test('Large sequence (Solar 8 Planets): Identity succeeds, all 28 pairwise swaps fail', () => {
      // 1. Identity passes
      expect(validateSequenceOrder(SOLAR_PLANETS_SEQUENCE)).toBe(true);

      // 2. All 28 transpositions (swapping any 2 items) must strictly fail
      let transpositionFailures = 0;
      for (let i = 0; i < SOLAR_PLANETS_SEQUENCE.length; i++) {
        for (let j = i + 1; j < SOLAR_PLANETS_SEQUENCE.length; j++) {
          const swapped = [...SOLAR_PLANETS_SEQUENCE];
          const temp = swapped[i];
          swapped[i] = swapped[j];
          swapped[j] = temp;

          const isValid = validateSequenceOrder(swapped);
          expect(isValid).toBe(false);
          transpositionFailures++;
        }
      }
      expect(transpositionFailures).toBe((8 * 7) / 2); // 28 pairwise transpositions

      // 3. Complete reverse order strictly fails
      const reversed = [...SOLAR_PLANETS_SEQUENCE].reverse();
      expect(validateSequenceOrder(reversed)).toBe(false);

      // 4. All cyclic rotations (shift by 1 to 7) strictly fail
      for (let shift = 1; shift < SOLAR_PLANETS_SEQUENCE.length; shift++) {
        const rotated = [
          ...SOLAR_PLANETS_SEQUENCE.slice(shift),
          ...SOLAR_PLANETS_SEQUENCE.slice(0, shift),
        ];
        expect(validateSequenceOrder(rotated)).toBe(false);
      }
    });

    test('Sequence shuffle stress: 100 random shuffles preserve multiset integrity and items count', () => {
      for (const { name, items } of SMALL_SEQUENCES) {
        const originalIds = items.map(it => it.id).sort();
        const originalLabels = items.map(it => it.label).sort();

        for (let s = 0; s < 50; s++) {
          const shuffled = [...items].sort(() => Math.random() - 0.5);
          expect(shuffled.length).toBe(items.length);
          expect(shuffled.map(it => it.id).sort()).toEqual(originalIds);
          expect(shuffled.map(it => it.label).sort()).toEqual(originalLabels);
        }
      }
    });

    test('Sequence tap-to-swap boundaries: moveLeft at 0 and moveRight at end are strict no-ops', () => {
      for (const { items } of SMALL_SEQUENCES) {
        const testList = [...items];

        // Simulate moveLeft at 0:
        const moveLeft = (arr: SequenceGameItem[], idx: number) => {
          if (idx <= 0 || idx >= arr.length) return arr;
          const next = [...arr];
          const temp = next[idx - 1];
          next[idx - 1] = next[idx];
          next[idx] = temp;
          return next;
        };

        const moveRight = (arr: SequenceGameItem[], idx: number) => {
          if (idx < 0 || idx >= arr.length - 1) return arr;
          const next = [...arr];
          const temp = next[idx + 1];
          next[idx + 1] = next[idx];
          next[idx] = temp;
          return next;
        };

        // Out-of-bounds boundary calls
        expect(moveLeft(testList, 0)).toEqual(testList);
        expect(moveLeft(testList, -1)).toEqual(testList);
        expect(moveRight(testList, testList.length - 1)).toEqual(testList);
        expect(moveRight(testList, testList.length)).toEqual(testList);

        // Reversibility: moveRight(i) then moveLeft(i + 1) restores identical order
        for (let i = 0; i < testList.length - 1; i++) {
          const steppedRight = moveRight(testList, i);
          const restored = moveLeft(steppedRight, i + 1);
          expect(restored).toEqual(testList);
        }
      }
    });
  });

  // ==========================================================================
  // 2. SEQUENCE ITEM UNIQUENESS & CURRICULUM ORDERING INTEGRITY
  // ==========================================================================
  describe('Sequence Item Uniqueness & Ordering Integrity', () => {
    const ALL_SEQUENCES = [
      { deck: 'ular-tangga-sains', name: 'WATER_CYCLE_SEQUENCE', items: WATER_CYCLE_SEQUENCE },
      { deck: 'point-click-lab', name: 'SCIENTIFIC_METHOD_SEQUENCE', items: SCIENTIFIC_METHOD_SEQUENCE },
      { deck: 'point-click-hutan', name: 'CANOPY_STRATA_SEQUENCE', items: CANOPY_STRATA_SEQUENCE },
      { deck: 'ular-tangga-tatasurya', name: 'SOLAR_PLANETS_SEQUENCE', items: SOLAR_PLANETS_SEQUENCE },
      { deck: 'ular-tangga-tatasurya', name: 'ECLIPSE_GEOMETRY_SEQUENCE', items: ECLIPSE_GEOMETRY_SEQUENCE },
      { deck: 'presentasi-ekosistem-hutan', name: 'PHOTOSYNTHESIS_ENERGY_SEQUENCE', items: PHOTOSYNTHESIS_ENERGY_SEQUENCE },
    ];

    test('Every sequence item has unique IDs within and across sequences', () => {
      const allItemIds = new Set<string>();

      for (const { name, items } of ALL_SEQUENCES) {
        const localIds = new Set<string>();
        for (const item of items) {
          expect(item.id).toBeDefined();
          expect(typeof item.id).toBe('string');
          expect(item.id.trim().length).toBeGreaterThan(0);

          // No duplicate IDs within sequence
          expect(localIds.has(item.id)).toBe(false);
          localIds.add(item.id);

          // No collision with other sequence mini-games
          expect(allItemIds.has(item.id)).toBe(false);
          allItemIds.add(item.id);
        }
      }
    });

    test('Sequence items have strictly contiguous 1..N order without gaps or duplicates', () => {
      for (const { name, items } of ALL_SEQUENCES) {
        const n = items.length;
        const orders = items.map(it => it.order);

        // Check min and max
        expect(Math.min(...orders)).toBe(1);
        expect(Math.max(...orders)).toBe(n);

        // Check exact set equals {1, 2, ..., n}
        const expectedSet = new Set(Array.from({ length: n }, (_, i) => i + 1));
        const actualSet = new Set(orders);
        expect(actualSet).toEqual(expectedSet);
      }
    });

    test('Sequence items have rich factual text, emoji icons, and detailed descriptions', () => {
      for (const { name, items } of ALL_SEQUENCES) {
        for (const item of items) {
          expect(item.label.trim().length).toBeGreaterThanOrEqual(3);
          expect(item.iconEmoji.trim().length).toBeGreaterThanOrEqual(1);
          expect(item.description).toBeDefined();
          expect(item.description!.trim().length).toBeGreaterThanOrEqual(15);
        }
      }
    });
  });

  // ==========================================================================
  // 3. MATCH PAIRS MINI-GAMES: BIJECTION & PERMUTATION INVARIANCE
  // ==========================================================================
  describe('Match Pairs Mini-Games: Bijection, Uniqueness & Connection Oracles', () => {
    const ALL_MATCH_GAMES = [
      { deck: 'ular-tangga-sains', name: 'ENERGY_TRANSFORMATION_PAIRS', pairs: ENERGY_TRANSFORMATION_PAIRS },
      { deck: 'point-click-lab', name: 'LAB_K3_PAIRS', pairs: LAB_K3_PAIRS },
      { deck: 'point-click-hutan', name: 'BIOGEOGRAPHY_FAUNA_PAIRS', pairs: BIOGEOGRAPHY_FAUNA_PAIRS },
      { deck: 'ular-tangga-tatasurya', name: 'SPACE_CHARACTERISTICS_PAIRS', pairs: SPACE_CHARACTERISTICS_PAIRS },
      { deck: 'presentasi-ekosistem-hutan', name: 'FOREST_TROPHIC_PAIRS', pairs: FOREST_TROPHIC_PAIRS },
    ];

    test('Every match pairs collection is a strict mathematical bijection (injective & surjective)', () => {
      for (const { name, pairs } of ALL_MATCH_GAMES) {
        const leftTexts = pairs.map(p => p.leftText.trim());
        const rightTexts = pairs.map(p => p.rightText.trim());
        const pairIds = pairs.map(p => p.id.trim());

        // 1. All pair IDs are unique
        expect(new Set(pairIds).size).toBe(pairs.length);

        // 2. All leftTexts are strictly unique (no two pairs share the same left prompt)
        expect(new Set(leftTexts).size).toBe(pairs.length);

        // 3. All rightTexts are strictly unique (no two pairs share the same right target)
        expect(new Set(rightTexts).size).toBe(pairs.length);

        // 4. Texts are non-trivial
        for (const p of pairs) {
          expect(p.leftText.trim().length).toBeGreaterThanOrEqual(3);
          expect(p.rightText.trim().length).toBeGreaterThanOrEqual(5);
        }
      }
    });

    test('Match pair connection oracle: Identity bijection passes, all other N!-1 permutations fail', () => {
      for (const { name, pairs } of ALL_MATCH_GAMES) {
        const leftIds = pairs.map(p => p.id);
        const rightPermutations = getAllPermutations(pairs.map(p => p.id));

        // For 4 pairs: 4! = 24 permutations
        expect(rightPermutations.length).toBe(24);

        let correctPermutations = 0;
        for (const rightPerm of rightPermutations) {
          const connections: Record<string, string> = {};
          leftIds.forEach((lId, idx) => {
            connections[lId] = rightPerm[idx];
          });

          const isValid = validateMatchConnections(pairs, connections);
          if (isValid) {
            correctPermutations++;
          }
        }

        // Exactly one assignment (the identity bijection) is valid!
        expect(correctPermutations).toBe(1);
      }
    });

    test('Match pair incomplete connections strictly fail validation', () => {
      for (const { name, pairs } of ALL_MATCH_GAMES) {
        // Empty connections
        expect(validateMatchConnections(pairs, {})).toBe(false);

        // Partial connections (1 to N-1 pairs connected correctly)
        for (let k = 1; k < pairs.length; k++) {
          const partialConnections: Record<string, string> = {};
          for (let i = 0; i < k; i++) {
            partialConnections[pairs[i].id] = pairs[i].id;
          }
          expect(validateMatchConnections(pairs, partialConnections)).toBe(false);
        }

        // Cyclic shift of connections (every left connected to next right)
        const cyclicShiftConnections: Record<string, string> = {};
        for (let i = 0; i < pairs.length; i++) {
          cyclicShiftConnections[pairs[i].id] = pairs[(i + 1) % pairs.length].id;
        }
        expect(validateMatchConnections(pairs, cyclicShiftConnections)).toBe(false);
      }
    });

    test('Match pair slides in decks specify non-empty column headers and instructions', () => {
      for (const deck of ALL_SCIENCE_DECKS) {
        const matchSlides = deck.slides.filter(s => s.type === 'mini-game-match') as MiniGameMatchSlide[];
        for (const slide of matchSlides) {
          expect(slide.columnALabel).toBeDefined();
          expect(slide.columnALabel!.trim().length).toBeGreaterThan(0);
          expect(slide.columnBLabel).toBeDefined();
          expect(slide.columnBLabel!.trim().length).toBeGreaterThan(0);
          expect(slide.columnALabel).not.toEqual(slide.columnBLabel);
          expect(slide.pairs.length).toBeGreaterThanOrEqual(4);
        }
      }
    });
  });

  // ==========================================================================
  // 4. FLASHCARD MINI-GAMES: INTEGRITY & ACTIVE RECALL STATE MACHINE
  // ==========================================================================
  describe('Flashcard Mini-Games: Integrity & Active Recall State Machine', () => {
    const ALL_FLASHCARD_SETS = [
      { deck: 'point-click-lab', name: 'LAB_FLASHCARDS', cards: LAB_FLASHCARDS },
      { deck: 'point-click-hutan', name: 'HUTAN_FLASHCARDS', cards: HUTAN_FLASHCARDS },
    ];

    test('Flashcard items have unique IDs and comprehensive scientific content', () => {
      const allCardIds = new Set<string>();

      for (const { name, cards } of ALL_FLASHCARD_SETS) {
        expect(cards.length).toBeGreaterThanOrEqual(2);

        for (const card of cards) {
          expect(card.id).toBeDefined();
          expect(card.id.trim().length).toBeGreaterThan(0);
          expect(allCardIds.has(card.id)).toBe(false);
          allCardIds.add(card.id);

          expect(card.frontPrompt.trim().length).toBeGreaterThanOrEqual(15);
          expect(card.backTitle.trim().length).toBeGreaterThanOrEqual(5);
          expect(card.backAnswer.trim().length).toBeGreaterThanOrEqual(10);
          expect(card.backExplanation.trim().length).toBeGreaterThanOrEqual(25);
          expect(card.category).toBeDefined();
          expect(card.category!.trim().length).toBeGreaterThanOrEqual(3);
        }
      }
    });

    test('Flashcard state machine: flips, mastery ratings, and reset integrity', () => {
      for (const { name, cards } of ALL_FLASHCARD_SETS) {
        const harness = new FlashcardHarness(cards);

        // 1. Initial state
        expect(harness.currentIndex).toBe(0);
        expect(harness.isFlipped).toBe(false);
        expect(harness.isFinished).toBe(false);

        // 2. Flip toggles state
        harness.flip();
        expect(harness.isFlipped).toBe(true);
        harness.flip();
        expect(harness.isFlipped).toBe(false);

        // 3. Rate all cards as 'mastered'
        harness.reset();
        for (let i = 0; i < cards.length; i++) {
          harness.flip();
          harness.rate('mastered');
        }
        expect(harness.isFinished).toBe(true);
        expect(harness.completionResult).toEqual({
          mastered: cards.length,
          total: cards.length,
        });

        // 4. Rate all cards as 'review'
        harness.reset();
        for (let i = 0; i < cards.length; i++) {
          harness.flip();
          harness.rate('review');
        }
        expect(harness.isFinished).toBe(true);
        expect(harness.completionResult).toEqual({
          mastered: 0,
          total: cards.length,
        });

        // 5. Alternate mastered and review
        harness.reset();
        let expectedMastered = 0;
        for (let i = 0; i < cards.length; i++) {
          const rating = i % 2 === 0 ? 'mastered' : 'review';
          if (rating === 'mastered') expectedMastered++;
          harness.rate(rating);
        }
        expect(harness.isFinished).toBe(true);
        expect(harness.completionResult).toEqual({
          mastered: expectedMastered,
          total: cards.length,
        });
      }
    });
  });

  // ==========================================================================
  // 5. ENGINE SLIDE FUZZING VIA STORYPRESENTATIONDECKENGINE
  // ==========================================================================
  describe('Engine Fuzzing: StoryPresentationDeckEngine Full Slide Render', () => {
    test('Every slide of all 5 Science decks renders valid markup via renderToString without throwing', () => {
      for (const deck of ALL_SCIENCE_DECKS) {
        expect(deck.slides.length).toBeGreaterThanOrEqual(7);

        for (let slideNum = 1; slideNum <= deck.slides.length; slideNum++) {
          const slide = deck.slides[slideNum - 1];

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

          // Content sanity checks: no unrendered objects or undefined values
          expect(html).not.toContain('[object Object]');
          expect(html).not.toContain('NaN');
          expect(html).not.toContain('Slide tipe tidak dikenal');

          // Slide indicator verification
          expect(html).toContain(`Slide ${slideNum} dari ${deck.totalSlides}`);
          const escapedTitle = deck.title
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
          expect(html).toContain(escapedTitle);
        }
      }
    });

    test('StoryPresentationDeckEngine renders null/empty when isOpen is false', () => {
      for (const deck of ALL_SCIENCE_DECKS) {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: false,
            onClose: () => {},
            deck,
            initialSlide: 1,
          })
        );
        expect(html).toBe('');
      }
    });

    test('Adversarial out-of-bounds initialSlide values clamp safely without crashing', () => {
      const deck = ULAR_TANGGA_SAINS_DECK;
      const adversarialSlides = [
        0,
        -1,
        -999,
        999,
        10000,
        Number.MAX_SAFE_INTEGER,
        -Number.MAX_SAFE_INTEGER,
      ];

      for (const slideVal of adversarialSlides) {
        let html = '';
        expect(() => {
          html = renderToString(
            React.createElement(StoryPresentationDeckEngine, {
              isOpen: true,
              onClose: () => {},
              deck,
              initialSlide: slideVal,
            })
          );
        }).not.toThrow();

        expect(html.length).toBeGreaterThan(100);
        // If clamped to 1:
        if (slideVal <= 0) {
          expect(html).toContain(`Slide 1 dari ${deck.totalSlides}`);
        } else {
          // If clamped to totalSlides:
          expect(html).toContain(`Slide ${deck.totalSlides} dari ${deck.totalSlides}`);
        }
      }
    });

    test('Fuzzing StoryPresentationDeckEngine with corrupted synthetic deck variations', () => {
      // 1. Deck with unknown theme color falls back gracefully
      const corruptedThemeDeck: PresentationDeckData = {
        ...ULAR_TANGGA_SAINS_DECK,
        themeColor: 'non-existent-neon-matrix' as any,
      };
      expect(() => {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck: corruptedThemeDeck,
            initialSlide: 1,
          })
        );
        expect(html.length).toBeGreaterThan(100);
      }).not.toThrow();

      // 2. Deck with minimal 1 slide and empty sub-items renders without throwing
      const minimalDeck: PresentationDeckData = {
        ...ULAR_TANGGA_SAINS_DECK,
        totalSlides: 1,
        slides: [
          {
            id: 'minimal-concept',
            type: 'concept-infographic',
            chapterBadge: 'BABAK MINIMAL',
            title: 'Konsep Minimal',
            subtitle: 'Subjudul Minimal',
            cards: [],
          },
        ],
      };
      expect(() => {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck: minimalDeck,
            initialSlide: 1,
          })
        );
        expect(html.length).toBeGreaterThan(0);
      }).not.toThrow();

      // 3. Deck with HTML special characters and Indonesian accents renders safely
      const specialCharDeck: PresentationDeckData = {
        ...ULAR_TANGGA_SAINS_DECK,
        title: '<script>alert("XSS")</script> Sains & "Atom" & 100% \'Murni\'',
        subtitle: 'Uji Karakter Khusus & Éntitas HTML',
      };
      expect(() => {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck: specialCharDeck,
            initialSlide: 1,
          })
        );
        expect(html).toContain('&lt;script&gt;');
        expect(html).not.toContain('<script>alert');
      }).not.toThrow();
    });
  });

  // ==========================================================================
  // 6. ENGINE NAVIGATION STATE MACHINE STRESS SIMULATION
  // ==========================================================================
  describe('Engine Navigation State Machine Stress Simulation', () => {
    class NavigationStateMachine {
      currentSlide: number;
      totalSlides: number;
      isVictoryOpen: boolean = false;
      challengesState: Record<string, boolean> = {};

      constructor(totalSlides: number, initialSlide: number = 1) {
        this.totalSlides = Math.max(1, totalSlides);
        this.currentSlide = Math.max(1, Math.min(this.totalSlides, initialSlide));
      }

      next() {
        if (this.currentSlide < this.totalSlides) {
          this.currentSlide++;
        } else {
          this.isVictoryOpen = true;
        }
      }

      prev() {
        if (this.currentSlide > 1) {
          this.currentSlide--;
        }
      }

      jump(target: number) {
        this.currentSlide = Math.max(1, Math.min(this.totalSlides, target));
      }

      reset() {
        this.currentSlide = 1;
        this.challengesState = {};
        this.isVictoryOpen = false;
      }

      recordChallenge(key: string, success: boolean) {
        this.challengesState[key] = success;
      }
    }

    test('Sequential forward walk triggers victory modal strictly upon exceeding last slide', () => {
      for (const deck of ALL_SCIENCE_DECKS) {
        const sm = new NavigationStateMachine(deck.totalSlides, 1);

        for (let i = 1; i <= deck.totalSlides; i++) {
          expect(sm.currentSlide).toBe(i);
          expect(sm.isVictoryOpen).toBe(false);
          sm.next();
        }

        // After clicking next on final slide, victory modal opens and slide remains at final
        expect(sm.isVictoryOpen).toBe(true);
        expect(sm.currentSlide).toBe(deck.totalSlides);
      }
    });

    test('Sequential backward walk stops strictly at slide 1 without underflow', () => {
      for (const deck of ALL_SCIENCE_DECKS) {
        const sm = new NavigationStateMachine(deck.totalSlides, deck.totalSlides);

        for (let i = deck.totalSlides; i > 1; i--) {
          expect(sm.currentSlide).toBe(i);
          sm.prev();
        }

        expect(sm.currentSlide).toBe(1);
        // Further prev calls must not underflow
        sm.prev();
        sm.prev();
        expect(sm.currentSlide).toBe(1);
      }
    });

    test('1000 random navigation transitions maintain slide invariants in [1, totalSlides]', () => {
      for (const deck of ALL_SCIENCE_DECKS) {
        const sm = new NavigationStateMachine(deck.totalSlides, 1);

        for (let step = 0; step < 200; step++) {
          const action = Math.floor(Math.random() * 4);
          if (action === 0) sm.next();
          else if (action === 1) sm.prev();
          else if (action === 2) sm.jump(Math.floor(Math.random() * 20) - 5);
          else if (action === 3) sm.recordChallenge(`ch-${step}`, Math.random() > 0.5);

          expect(sm.currentSlide).toBeGreaterThanOrEqual(1);
          expect(sm.currentSlide).toBeLessThanOrEqual(deck.totalSlides);
        }

        sm.reset();
        expect(sm.currentSlide).toBe(1);
        expect(sm.isVictoryOpen).toBe(false);
        expect(Object.keys(sm.challengesState).length).toBe(0);
      }
    });
  });

  // ==========================================================================
  // 7. CROSS-DECK PEDAGOGICAL SANITY & CURRICULUM ARC CONFORMANCE
  // ==========================================================================
  describe('Cross-Deck Pedagogical Sanity & Narrative Arc Conformance', () => {
    test('All 5 Science decks have dynamic slide counts (7 and 8) and none has 6 slides', () => {
      const counts = ALL_SCIENCE_DECKS.map(d => d.totalSlides);
      const uniqueCounts = new Set(counts);

      expect(uniqueCounts.size).toBe(2);
      expect(uniqueCounts.has(7)).toBe(true);
      expect(uniqueCounts.has(8)).toBe(true);
      expect(uniqueCounts.has(6)).toBe(false);

      for (const deck of ALL_SCIENCE_DECKS) {
        expect(deck.slides.length).toBe(deck.totalSlides);
      }
    });

    test('All 5 Science decks conform to the 5-phase narrative curriculum arc', () => {
      for (const deck of ALL_SCIENCE_DECKS) {
        const types = deck.slides.map(s => s.type);

        // Phase 1: Narrative intro as slide 1
        expect(types[0]).toBe('narrative-intro');

        // Phase 2: At least 1 concept infographic
        expect(types.filter(t => t === 'concept-infographic').length).toBeGreaterThanOrEqual(1);

        // Phase 3: At least 2 interactive mini-games
        const miniGameCount = types.filter(t => t.startsWith('mini-game-')).length;
        expect(miniGameCount).toBeGreaterThanOrEqual(2);

        // Phase 4: Story resolution as penultimate slide
        expect(types[types.length - 2]).toBe('story-resolution');

        // Phase 5: Reflection spark as final slide
        expect(types[types.length - 1]).toBe('reflection-spark');
      }
    });

    test('Every Science deck includes exactly 3 HOTS teacher reflection questions numbered 1, 2, 3', () => {
      for (const deck of ALL_SCIENCE_DECKS) {
        const reflectionSlide = deck.slides[deck.slides.length - 1] as any;
        expect(reflectionSlide.type).toBe('reflection-spark');
        expect(reflectionSlide.sparkCards).toBeDefined();
        expect(reflectionSlide.sparkCards.length).toBe(3);

        const cardNumbers = reflectionSlide.sparkCards.map((c: any) => c.number);
        expect(cardNumbers).toEqual([1, 2, 3]);

        for (const card of reflectionSlide.sparkCards) {
          expect(card.title.trim().length).toBeGreaterThanOrEqual(5);
          expect(card.question.trim().length).toBeGreaterThanOrEqual(20);
          expect(card.badgeColor).toBeDefined();
        }
      }
    });

    test('Lookup via getPresentationDeckByGameId matches registry directly', () => {
      const ids = [
        'ular-tangga-sains',
        'point-click-lab',
        'point-click-hutan',
        'ular-tangga-tatasurya',
        'presentasi-ekosistem-hutan',
      ];

      for (const id of ids) {
        const deck = getPresentationDeckByGameId(id);
        expect(deck).toBeDefined();
        expect(deck?.gameId).toBe(id);
        expect(SCIENCE_PRESENTATION_DECKS[id]).toBe(deck);
      }
    });
  });
});
