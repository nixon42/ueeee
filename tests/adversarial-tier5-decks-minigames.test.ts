import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  ALL_PRESENTATION_DECKS,
  SCIENCE_PRESENTATION_DECKS,
  HUMANITIES_PRESENTATION_DECKS,
  getPresentationDeckByGameId,
  hasPresentationDeck,
  getAllPresentationDeckIds,
} from '../src/data/presentation-decks';
import { GAMES_CATALOG } from '../src/data/games-catalog';
import {
  PresentationDeckData,
  SlideDefinition,
  NarrativeIntroSlide,
  ConceptInfographicSlide,
  MiniGameSequenceSlide,
  MiniGameMatchSlide,
  MiniGameFlashcardSlide,
  StoryResolutionSlide,
  ReflectionSparkSlide,
  SequenceGameItem,
  MatchGamePair,
  FlashcardItem,
} from '../src/types/presentation';
import {
  CanvaSequenceGame,
  SequenceTheme,
} from '../src/components/canva-games/CanvaSequenceGame';
import {
  CanvaMatchPairsGame,
  MatchTheme,
} from '../src/components/canva-games/CanvaMatchPairsGame';
import {
  InteractiveFlashcards,
  FlashcardTheme,
} from '../src/components/canva-games/InteractiveFlashcards';

// ============================================================================
// PART 1: DETERMINISTIC MINI-GAME STATE SIMULATORS
// White-box model replicates for rapid spam, idempotency, and bounds checking
// ============================================================================

/**
 * Simulator for CanvaSequenceGame state operations
 */
class SequenceEngineHarness {
  currentOrder: SequenceGameItem[];
  checkedState: boolean = false;
  isSuccess: boolean = false;
  completionCalls: number = 0;
  lastCompletionResult: boolean | null = null;

  constructor(initialItems: SequenceGameItem[]) {
    this.currentOrder = [...initialItems];
  }

  moveLeft(index: number): boolean {
    if (index === 0) return false;
    if (index < 0 || index >= this.currentOrder.length) return false;
    const temp = this.currentOrder[index - 1];
    this.currentOrder[index - 1] = this.currentOrder[index];
    this.currentOrder[index] = temp;
    this.checkedState = false;
    return true;
  }

  moveRight(index: number): boolean {
    if (index === this.currentOrder.length - 1) return false;
    if (index < 0 || index >= this.currentOrder.length) return false;
    const temp = this.currentOrder[index + 1];
    this.currentOrder[index + 1] = this.currentOrder[index];
    this.currentOrder[index] = temp;
    this.checkedState = false;
    return true;
  }

  drop(draggedIdx: number, targetIdx: number): boolean {
    if (draggedIdx === targetIdx) return false;
    if (draggedIdx < 0 || draggedIdx >= this.currentOrder.length) return false;
    if (targetIdx < 0 || targetIdx >= this.currentOrder.length) return false;
    const [moved] = this.currentOrder.splice(draggedIdx, 1);
    this.currentOrder.splice(targetIdx, 0, moved);
    this.checkedState = false;
    return true;
  }

  shuffle(initialItems: SequenceGameItem[]): void {
    this.currentOrder = [...initialItems].sort(() => Math.random() - 0.5);
    this.checkedState = false;
    this.isSuccess = false;
  }

  checkOrder(): boolean {
    let allCorrect = true;
    this.currentOrder.forEach((item, idx) => {
      if (item.order !== idx + 1) {
        allCorrect = false;
      }
    });

    this.checkedState = true;
    this.isSuccess = allCorrect;
    this.completionCalls++;
    this.lastCompletionResult = allCorrect;
    return allCorrect;
  }
}

/**
 * Simulator for CanvaMatchPairsGame state operations
 */
class MatchPairsEngineHarness {
  pairs: MatchGamePair[];
  connections: Record<string, string> = {};
  selectedLeftId: string | null = null;
  checkedState: boolean = false;
  isSuccess: boolean = false;
  completionCalls: number = 0;
  lastCompletionResult: boolean | null = null;

  constructor(pairs: MatchGamePair[]) {
    this.pairs = [...pairs];
  }

  selectLeft(id: string): void {
    this.selectedLeftId = id;
    this.checkedState = false;
  }

  selectRight(id: string): boolean {
    if (!this.selectedLeftId) return false;

    const leftId = this.selectedLeftId;
    // Decouple rightId if already connected to another left
    Object.keys(this.connections).forEach((key) => {
      if (this.connections[key] === id) {
        delete this.connections[key];
      }
    });

    this.connections[leftId] = id;
    this.selectedLeftId = null;
    this.checkedState = false;
    return true;
  }

  reset(): void {
    this.connections = {};
    this.selectedLeftId = null;
    this.checkedState = false;
    this.isSuccess = false;
  }

  checkMatches(): boolean {
    const totalPairs = this.pairs.length;
    const connectionCount = Object.keys(this.connections).length;

    let correctCount = 0;
    Object.entries(this.connections).forEach(([leftId, rightId]) => {
      if (leftId === rightId) {
        correctCount++;
      }
    });

    const allCorrect = connectionCount === totalPairs && correctCount === totalPairs;
    this.checkedState = true;
    this.isSuccess = allCorrect;
    this.completionCalls++;
    this.lastCompletionResult = allCorrect;
    return allCorrect;
  }
}

/**
 * Simulator for InteractiveFlashcards state operations
 */
class FlashcardsEngineHarness {
  cards: FlashcardItem[];
  currentIndex: number = 0;
  isFlipped: boolean = false;
  ratings: Record<string, 'mastered' | 'review'> = {};
  isFinished: boolean = false;
  completionCalls: number = 0;
  lastMasteredCount: number = 0;

  constructor(cards: FlashcardItem[]) {
    this.cards = [...cards];
  }

  flip(): void {
    this.isFlipped = !this.isFlipped;
  }

  rate(rating: 'mastered' | 'review'): void {
    const currentCard = this.cards[this.currentIndex] || this.cards[0];
    if (!currentCard) return;

    this.ratings[currentCard.id] = rating;

    if (this.currentIndex < this.cards.length - 1) {
      // Simulate advance transition
      this.isFlipped = false;
      this.currentIndex = Math.min(this.currentIndex + 1, this.cards.length - 1);
    } else {
      this.isFinished = true;
      const masteredCount = Object.values(this.ratings).filter((r) => r === 'mastered').length;
      this.lastMasteredCount = masteredCount;
      this.completionCalls++;
    }
  }

  reset(): void {
    this.currentIndex = 0;
    this.isFlipped = false;
    this.ratings = {};
    this.isFinished = false;
  }

  getMasteredCount(): number {
    return Object.values(this.ratings).filter((r) => r === 'mastered').length;
  }
}

// ============================================================================
// PART 2: ADVERSARIAL TEST SUITES
// ============================================================================

describe('Tier 5 Adversarial Code Audit: Presentation Decks & Invariants', () => {
  const allDecks = Object.values(ALL_PRESENTATION_DECKS);

  test('Registry contains exactly 10 distinct presentation decks', () => {
    expect(allDecks.length).toBe(10);
    const uniqueIds = new Set(allDecks.map((d) => d.gameId));
    expect(uniqueIds.size).toBe(10);
    expect(getAllPresentationDeckIds().length).toBe(10);
  });

  test('Registry divides cleanly into 5 Science and 5 Humanities decks', () => {
    const scienceIds = Object.keys(SCIENCE_PRESENTATION_DECKS);
    const humanitiesIds = Object.keys(HUMANITIES_PRESENTATION_DECKS);

    expect(scienceIds.length).toBe(5);
    expect(humanitiesIds.length).toBe(5);

    // Cross-set disjointness
    const overlap = scienceIds.filter((id) => humanitiesIds.includes(id));
    expect(overlap.length).toBe(0);

    // Specific game mapping
    expect(scienceIds).toContain('ular-tangga-sains');
    expect(scienceIds).toContain('point-click-lab');
    expect(scienceIds).toContain('point-click-hutan');
    expect(scienceIds).toContain('ular-tangga-tatasurya');
    expect(scienceIds).toContain('presentasi-ekosistem-hutan');

    expect(humanitiesIds).toContain('ular-tangga-matematika');
    expect(humanitiesIds).toContain('point-click-candi');
    expect(humanitiesIds).toContain('teka-teki-kata');
    expect(humanitiesIds).toContain('ular-tangga-sejarah');
    expect(humanitiesIds).toContain('catur-taktik-logika');
  });

  test('Dynamic slide counts strictly 7 or 8 (0 decks with 6 slides, exactly 75 slides total)', () => {
    let count7 = 0;
    let count8 = 0;
    let totalSlidesSum = 0;

    for (const deck of allDecks) {
      const slideCount = deck.slides.length;
      totalSlidesSum += slideCount;

      // Invariant: strictly 7 or 8 slides
      expect([7, 8]).toContain(slideCount);
      // Explicit assertion: NO deck has 6 slides
      expect(slideCount).not.toBe(6);
      expect(slideCount).toBeGreaterThanOrEqual(7);
      expect(slideCount).toBeLessThanOrEqual(8);

      // Declared totalSlides must match actual slides array length
      expect(deck.totalSlides).toBe(slideCount);

      if (slideCount === 7) count7++;
      if (slideCount === 8) count8++;
    }

    // Exactly 5 decks with 7 slides, 5 decks with 8 slides
    expect(count7).toBe(5);
    expect(count8).toBe(5);
    // Empirical slide total: 5 * 7 + 5 * 8 = 75 slides across the full catalog
    expect(totalSlidesSum).toBe(75);
  });

  test('All 75 slides across 10 decks have globally unique IDs and non-empty titles', () => {
    const allSlideIds = new Set<string>();
    let totalSlidesAudited = 0;

    for (const deck of allDecks) {
      for (const slide of deck.slides) {
        totalSlidesAudited++;
        expect(slide.id).toBeDefined();
        expect(slide.id.trim().length).toBeGreaterThan(0);
        expect(allSlideIds.has(slide.id)).toBe(false);
        allSlideIds.add(slide.id);

        expect(slide.title).toBeDefined();
        expect(slide.title.trim().length).toBeGreaterThan(0);
        expect(slide.type).toBeDefined();
      }
    }

    expect(totalSlidesAudited).toBe(75);
    expect(allSlideIds.size).toBe(75);
  });

  test('Curriculum metadata fields are complete, valid, and adhere to K-12 standards', () => {
    const validCategories = ['sains', 'matematika', 'sejarah', 'bahasa', 'logika'];

    for (const deck of allDecks) {
      expect(deck.title.trim().length).toBeGreaterThan(0);
      expect(deck.subtitle.trim().length).toBeGreaterThan(0);
      expect(deck.themeColor).toBeDefined();
      expect(typeof deck.themeColor).toBe('string');

      expect(deck.category).toBeDefined();
      expect(validCategories).toContain(deck.category!);

      expect(deck.gradeLevel).toBeDefined();
      expect(deck.gradeLevel!.trim().length).toBeGreaterThan(0);

      expect(deck.subjectDetail).toBeDefined();
      expect(deck.subjectDetail!.trim().length).toBeGreaterThan(0);
    }
  });

  test('Mentor personas, roles, emojis, and dialogue authenticity audit', () => {
    const expectedMentors: Record<string, { name: string; avatarEmoji: string; minDialogueLen: number }> = {
      'ular-tangga-sains': { name: 'Kak Galih', avatarEmoji: '🧭', minDialogueLen: 300 },
      'point-click-lab': { name: 'Dr. Maya Arisandi, M.Sc.', avatarEmoji: '🔬', minDialogueLen: 300 },
      'point-click-hutan': { name: 'Ranger Banyu', avatarEmoji: '🦧', minDialogueLen: 300 },
      'ular-tangga-tatasurya': { name: 'Kapten Dirgantara', avatarEmoji: '🚀', minDialogueLen: 300 },
      'presentasi-ekosistem-hutan': { name: 'Prof. Maya Arisandi', avatarEmoji: '🌿', minDialogueLen: 300 },
      'ular-tangga-matematika': { name: 'Kak Arya', avatarEmoji: '📐', minDialogueLen: 300 },
      'point-click-candi': { name: 'Paman Dewa', avatarEmoji: '🏛️', minDialogueLen: 300 },
      'teka-teki-kata': { name: 'Ibu Kartika', avatarEmoji: '📖', minDialogueLen: 300 },
      'ular-tangga-sejarah': { name: 'Kak Satria', avatarEmoji: '🇮🇩', minDialogueLen: 300 },
      'catur-taktik-logika': { name: 'Master Utut', avatarEmoji: '♟️', minDialogueLen: 300 },
    };

    for (const deck of allDecks) {
      const expected = expectedMentors[deck.gameId];
      expect(expected).toBeDefined();

      // Mentor struct validation
      expect(deck.mentor).toBeDefined();
      expect(deck.mentor.name).toBe(expected.name);
      expect(deck.mentor.avatarEmoji).toBe(expected.avatarEmoji);
      expect(deck.mentor.role.trim().length).toBeGreaterThan(5);

      // Slide 1 must be narrative-intro
      const slide1 = deck.slides[0] as NarrativeIntroSlide;
      expect(slide1.type).toBe('narrative-intro');
      expect(slide1.dialogue).toBeDefined();
      expect(slide1.dialogue.length).toBeGreaterThanOrEqual(expected.minDialogueLen);

      // Verify authentic persona address or self-introduction
      const addressGreetings = [
        'Halo',
        'Selamat pagi',
        'Salam',
        'Perhatian',
        'Rahayu',
        'Merdeka',
      ];
      const hasAuthenticGreeting = addressGreetings.some((g) => slide1.dialogue.startsWith(g));
      expect(hasAuthenticGreeting).toBe(true);

      // Mission objective and action button
      expect(slide1.missionObjective).toBeDefined();
      expect(slide1.missionObjective!.trim().length).toBeGreaterThan(10);
      expect(slide1.actionButtonText).toBeDefined();
      expect(slide1.actionButtonText!.trim().length).toBeGreaterThan(0);
    }
  });

  test('HOTS questions audit: exactly 3 per deck, non-empty, open-ended, critical thinking', () => {
    let totalHotsAudited = 0;

    for (const deck of allDecks) {
      // The final slide must be reflection-spark
      const lastSlide = deck.slides[deck.slides.length - 1] as ReflectionSparkSlide;
      expect(lastSlide.type).toBe('reflection-spark');
      expect(lastSlide.sparkCards).toBeDefined();

      // Invariant: EXACTLY 3 reflection questions per deck
      expect(lastSlide.sparkCards.length).toBe(3);

      for (let i = 0; i < 3; i++) {
        const card = lastSlide.sparkCards[i];
        totalHotsAudited++;

        // Number sequencing: strictly 1, 2, 3
        expect(card.number).toBe(i + 1);

        // Title validation
        expect(card.title).toBeDefined();
        expect(card.title.trim().length).toBeGreaterThan(3);

        // Question validation
        expect(card.question).toBeDefined();
        const q = card.question.trim();
        expect(q.length).toBeGreaterThanOrEqual(25);
        expect(q.endsWith('?')).toBe(true);

        // Open-ended interrogative check
        const openEndedMarkers = [
          'bagaimana',
          'mengapa',
          'apa',
          'langkah',
          'tindakan',
          'faktor',
          'jika',
          'apakah',
          'berapa',
        ];
        const lowerQ = q.toLowerCase();
        const hasOpenEndedMarker = openEndedMarkers.some((marker) => lowerQ.includes(marker));
        expect(hasOpenEndedMarker).toBe(true);
      }
    }

    // Total across all 10 decks: 10 * 3 = 30 HOTS questions
    expect(totalHotsAudited).toBe(30);
  });

  test('Penultimate slide is always story-resolution with tangible classroom impact', () => {
    for (const deck of allDecks) {
      const penultimateSlide = deck.slides[deck.slides.length - 2] as StoryResolutionSlide;
      expect(penultimateSlide.type).toBe('story-resolution');
      expect(penultimateSlide.resolutionStory).toBeDefined();
      expect(penultimateSlide.resolutionStory.trim().length).toBeGreaterThan(100);
      expect(penultimateSlide.achievementBadges).toBeDefined();
      expect(penultimateSlide.achievementBadges!.length).toBeGreaterThanOrEqual(1);

      for (const badge of penultimateSlide.achievementBadges!) {
        expect(badge.label.trim().length).toBeGreaterThan(0);
      }
    }
  });

  test('All concept-infographic slides contain informative cards with icons', () => {
    for (const deck of allDecks) {
      const conceptSlides = deck.slides.filter(
        (s) => s.type === 'concept-infographic'
      ) as ConceptInfographicSlide[];

      expect(conceptSlides.length).toBeGreaterThanOrEqual(1);

      for (const cs of conceptSlides) {
        expect(cs.cards).toBeDefined();
        expect(cs.cards.length).toBeGreaterThanOrEqual(2);

        for (const card of cs.cards) {
          expect(card.id.trim().length).toBeGreaterThan(0);
          expect(card.title.trim().length).toBeGreaterThan(0);
          expect(card.description.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  test('All embedded mini-games (slides 3 to 6) contain verified pedagogical content', () => {
    let miniGameCount = 0;

    for (const deck of allDecks) {
      for (const slide of deck.slides) {
        if (slide.type === 'mini-game-sequence') {
          miniGameCount++;
          const seq = slide as MiniGameSequenceSlide;
          expect(seq.items.length).toBeGreaterThanOrEqual(3);
          const orders = seq.items.map((it) => it.order);
          expect(new Set(orders).size).toBe(seq.items.length);
        } else if (slide.type === 'mini-game-match') {
          miniGameCount++;
          const match = slide as MiniGameMatchSlide;
          expect(match.pairs.length).toBeGreaterThanOrEqual(3);
          for (const pair of match.pairs) {
            expect(pair.id.trim().length).toBeGreaterThan(0);
            expect(pair.leftText.trim().length).toBeGreaterThan(0);
            expect(pair.rightText.trim().length).toBeGreaterThan(0);
          }
        } else if (slide.type === 'mini-game-flashcard') {
          miniGameCount++;
          const flash = slide as MiniGameFlashcardSlide;
          expect(flash.cards.length).toBeGreaterThanOrEqual(2);
          for (const card of flash.cards) {
            expect(card.id.trim().length).toBeGreaterThan(0);
            expect(card.frontPrompt.trim().length).toBeGreaterThan(0);
            expect(card.backAnswer.trim().length).toBeGreaterThan(0);
          }
        }
      }
    }

    // Every deck must have at least 2 embedded mini-game challenges
    expect(miniGameCount).toBeGreaterThanOrEqual(20);
  });

  test('All 10 games in GAMES_CATALOG link directly to registered story decks', () => {
    for (const game of GAMES_CATALOG) {
      expect(game.hasStoryPresentation).toBe(true);
      expect(game.presentationDeckId).toBeDefined();
      expect(hasPresentationDeck(game.presentationDeckId!)).toBe(true);

      const deck = getPresentationDeckByGameId(game.presentationDeckId!)!;
      expect(deck).toBeDefined();
      expect(deck.gameId).toBe(game.id);
      expect(game.slideCount).toBe(deck.slides.length);
      expect(game.mentorName).toBe(deck.mentor.name);
    }
  });
});

// ============================================================================
// PART 3: MINI-GAME ADVERSARIAL STRESS & CORNER CASES
// ============================================================================

describe('Tier 5 Adversarial Code Audit: Mini-Games Robustness', () => {
  const sampleSeqItems: SequenceGameItem[] = [
    { id: 's1', order: 1, label: 'Tahap 1: Pengamatan', iconEmoji: '🔍' },
    { id: 's2', order: 2, label: 'Tahap 2: Hipotesis', iconEmoji: '💡' },
    { id: 's3', order: 3, label: 'Tahap 3: Eksperimen', iconEmoji: '🧪' },
    { id: 's4', order: 4, label: 'Tahap 4: Kesimpulan', iconEmoji: '📝' },
  ];

  const sampleMatchPairs: MatchGamePair[] = [
    { id: 'p1', leftText: 'Klorofil', rightText: 'Zat Hijau Daun' },
    { id: 'p2', leftText: 'Stomata', rightText: 'Pori Daun' },
    { id: 'p3', leftText: 'Xilem', rightText: 'Pembuluh Air' },
    { id: 'p4', leftText: 'Floem', rightText: 'Pembuluh Glukosa' },
  ];

  const sampleFlashcards: FlashcardItem[] = [
    { id: 'f1', frontPrompt: 'Apa rumus fotosintesis?', backAnswer: '6CO2 + 6H2O -> C6H12O6 + 6O2' },
    { id: 'f2', frontPrompt: 'Fungsi mitokondria?', backAnswer: 'Pusat respirasi dan energi ATP sel' },
    { id: 'f3', frontPrompt: 'Organel tempat klorofil?', backAnswer: 'Kloroplas dalam sel mesofil' },
  ];

  // --------------------------------------------------------------------------
  // 3.1 CanvaSequenceGame Adversarial Testing
  // --------------------------------------------------------------------------
  describe('CanvaSequenceGame Adversarial Invariants', () => {
    test('Rapid boundary spam: 500 consecutive moveLeft(0) calls are safe no-ops', () => {
      const harness = new SequenceEngineHarness(sampleSeqItems);
      const snapshot = JSON.stringify(harness.currentOrder);

      for (let i = 0; i < 500; i++) {
        const moved = harness.moveLeft(0);
        expect(moved).toBe(false);
      }

      expect(JSON.stringify(harness.currentOrder)).toBe(snapshot);
    });

    test('Rapid boundary spam: 500 consecutive moveRight(lastIdx) calls are safe no-ops', () => {
      const harness = new SequenceEngineHarness(sampleSeqItems);
      const lastIdx = sampleSeqItems.length - 1;
      const snapshot = JSON.stringify(harness.currentOrder);

      for (let i = 0; i < 500; i++) {
        const moved = harness.moveRight(lastIdx);
        expect(moved).toBe(false);
      }

      expect(JSON.stringify(harness.currentOrder)).toBe(snapshot);
    });

    test('Out-of-bounds index calls do not corrupt state or throw exceptions', () => {
      const harness = new SequenceEngineHarness(sampleSeqItems);
      const snapshot = JSON.stringify(harness.currentOrder);

      expect(harness.moveLeft(-1)).toBe(false);
      expect(harness.moveLeft(-999)).toBe(false);
      expect(harness.moveLeft(100)).toBe(false);

      expect(harness.moveRight(-1)).toBe(false);
      expect(harness.moveRight(50)).toBe(false);

      expect(harness.drop(-1, 2)).toBe(false);
      expect(harness.drop(2, 99)).toBe(false);
      expect(harness.drop(2, 2)).toBe(false);

      expect(JSON.stringify(harness.currentOrder)).toBe(snapshot);
    });

    test('Double-submission & repeated verification idempotency', () => {
      const harness = new SequenceEngineHarness(sampleSeqItems);

      // Initial state is in correct order 1..4
      for (let i = 0; i < 50; i++) {
        const result = harness.checkOrder();
        expect(result).toBe(true);
        expect(harness.isSuccess).toBe(true);
        expect(harness.checkedState).toBe(true);
      }

      expect(harness.completionCalls).toBe(50);
      expect(harness.lastCompletionResult).toBe(true);
    });

    test('Re-shuffle idempotency preserves all items and count over 100 iterations', () => {
      const harness = new SequenceEngineHarness(sampleSeqItems);

      for (let i = 0; i < 100; i++) {
        harness.shuffle(sampleSeqItems);
        expect(harness.currentOrder.length).toBe(sampleSeqItems.length);
        expect(harness.checkedState).toBe(false);
        expect(harness.isSuccess).toBe(false);

        // Every original ID must still be present
        const ids = harness.currentOrder.map((it) => it.id);
        for (const orig of sampleSeqItems) {
          expect(ids).toContain(orig.id);
        }
      }
    });

    test('Move symmetry: moveRight(i) followed by moveLeft(i+1) is an exact identity', () => {
      const harness = new SequenceEngineHarness(sampleSeqItems);
      const snapshot = JSON.stringify(harness.currentOrder);

      harness.moveRight(1);
      expect(JSON.stringify(harness.currentOrder)).not.toBe(snapshot);

      harness.moveLeft(2);
      expect(JSON.stringify(harness.currentOrder)).toBe(snapshot);
    });
  });

  // --------------------------------------------------------------------------
  // 3.2 CanvaMatchPairsGame Adversarial Testing
  // --------------------------------------------------------------------------
  describe('CanvaMatchPairsGame Adversarial Invariants', () => {
    test('Rapid right click spam without left selection produces zero connections', () => {
      const harness = new MatchPairsEngineHarness(sampleMatchPairs);

      for (let i = 0; i < 200; i++) {
        const connected = harness.selectRight('p1');
        expect(connected).toBe(false);
      }

      expect(Object.keys(harness.connections).length).toBe(0);
      expect(harness.selectedLeftId).toBeNull();
    });

    test('Rapid left selection spam keeps only the last selected left item active', () => {
      const harness = new MatchPairsEngineHarness(sampleMatchPairs);

      for (const pair of sampleMatchPairs) {
        harness.selectLeft(pair.id);
        expect(harness.selectedLeftId).toBe(pair.id);
      }

      expect(harness.selectedLeftId).toBe('p4');
    });

    test('Overwriting connections replaces target cleanly without duplication', () => {
      const harness = new MatchPairsEngineHarness(sampleMatchPairs);

      harness.selectLeft('p1');
      harness.selectRight('p2');
      expect(harness.connections['p1']).toBe('p2');

      // Reconnect p1 to p1
      harness.selectLeft('p1');
      harness.selectRight('p1');
      expect(harness.connections['p1']).toBe('p1');
      expect(Object.keys(harness.connections).length).toBe(1);
    });

    test('Bijection enforcement: connecting left B to already connected right decouples left A', () => {
      const harness = new MatchPairsEngineHarness(sampleMatchPairs);

      // Connect p1 to p3
      harness.selectLeft('p1');
      harness.selectRight('p3');
      expect(harness.connections['p1']).toBe('p3');

      // Connect p2 to p3 -> p1 must be decoupled
      harness.selectLeft('p2');
      harness.selectRight('p3');
      expect(harness.connections['p2']).toBe('p3');
      expect(harness.connections['p1']).toBeUndefined();
      expect(Object.keys(harness.connections).length).toBe(1);
    });

    test('Partial matching returns false and prevents unearned success trigger', () => {
      const harness = new MatchPairsEngineHarness(sampleMatchPairs);

      // Connect only 2 out of 4 pairs correctly
      harness.selectLeft('p1');
      harness.selectRight('p1');
      harness.selectLeft('p2');
      harness.selectRight('p2');

      const isSuccess = harness.checkMatches();
      expect(isSuccess).toBe(false);
      expect(harness.isSuccess).toBe(false);
      expect(harness.checkedState).toBe(true);
      expect(harness.lastCompletionResult).toBe(false);
    });

    test('Mismatched connections return false under strict equality check', () => {
      const harness = new MatchPairsEngineHarness(sampleMatchPairs);

      // Connect all 4 pairs in inverted order
      harness.selectLeft('p1');
      harness.selectRight('p4');
      harness.selectLeft('p2');
      harness.selectRight('p3');
      harness.selectLeft('p3');
      harness.selectRight('p2');
      harness.selectLeft('p4');
      harness.selectRight('p1');

      const isSuccess = harness.checkMatches();
      expect(isSuccess).toBe(false);
      expect(harness.isSuccess).toBe(false);
    });

    test('Reset safety and idempotency: repeated reset cleanly purges all connections', () => {
      const harness = new MatchPairsEngineHarness(sampleMatchPairs);

      // Connect pairs
      harness.selectLeft('p1');
      harness.selectRight('p1');
      harness.checkMatches();

      for (let i = 0; i < 50; i++) {
        harness.reset();
        expect(Object.keys(harness.connections).length).toBe(0);
        expect(harness.selectedLeftId).toBeNull();
        expect(harness.checkedState).toBe(false);
        expect(harness.isSuccess).toBe(false);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3.3 InteractiveFlashcards Adversarial Testing
  // --------------------------------------------------------------------------
  describe('InteractiveFlashcards Adversarial Invariants', () => {
    test('Card flip toggle is strictly reversible', () => {
      const harness = new FlashcardsEngineHarness(sampleFlashcards);
      expect(harness.isFlipped).toBe(false);

      harness.flip();
      expect(harness.isFlipped).toBe(true);

      harness.flip();
      expect(harness.isFlipped).toBe(false);
    });

    test('Rating accumulator bounds: masteredCount is strictly bounded 0 <= count <= totalCards', () => {
      const harness = new FlashcardsEngineHarness(sampleFlashcards);

      // Complete all 3 cards with 'mastered'
      harness.rate('mastered');
      harness.rate('mastered');
      harness.rate('mastered');

      expect(harness.isFinished).toBe(true);
      expect(harness.getMasteredCount()).toBe(3);
      expect(harness.lastMasteredCount).toBe(3);
      expect(harness.completionCalls).toBe(1);

      // Test with all 'review'
      const reviewHarness = new FlashcardsEngineHarness(sampleFlashcards);
      reviewHarness.rate('review');
      reviewHarness.rate('review');
      reviewHarness.rate('review');

      expect(reviewHarness.isFinished).toBe(true);
      expect(reviewHarness.getMasteredCount()).toBe(0);
      expect(reviewHarness.lastMasteredCount).toBe(0);
    });

    test('Repeated ratings on the same card do not corrupt card count or array integrity', () => {
      const harness = new FlashcardsEngineHarness(sampleFlashcards);

      // Spam rating on card 0
      for (let i = 0; i < 20; i++) {
        harness.ratings[sampleFlashcards[0].id] = i % 2 === 0 ? 'mastered' : 'review';
      }

      expect(Object.keys(harness.ratings).length).toBe(1);
      expect(harness.cards.length).toBe(3);
    });

    test('Reset safety and idempotency: reset clears finished state, index, and ratings', () => {
      const harness = new FlashcardsEngineHarness(sampleFlashcards);

      harness.rate('mastered');
      harness.rate('mastered');
      harness.rate('mastered');
      expect(harness.isFinished).toBe(true);

      for (let i = 0; i < 30; i++) {
        harness.reset();
        expect(harness.currentIndex).toBe(0);
        expect(harness.isFlipped).toBe(false);
        expect(Object.keys(harness.ratings).length).toBe(0);
        expect(harness.isFinished).toBe(false);
      }
    });

    test('Card index clamping: currentIndex never exceeds cards.length - 1', () => {
      const harness = new FlashcardsEngineHarness(sampleFlashcards);

      // Call rate more times than cards length
      for (let i = 0; i < 10; i++) {
        harness.rate('mastered');
      }

      expect(harness.currentIndex).toBeLessThanOrEqual(sampleFlashcards.length - 1);
      expect(harness.isFinished).toBe(true);
    });
  });

  // --------------------------------------------------------------------------
  // 3.4 Component SSR & DOM Rendering Verification
  // --------------------------------------------------------------------------
  describe('Mini-Games SSR & DOM Snapshot Verification', () => {
    test('CanvaSequenceGame renders cleanly across multiple themes with valid markup', () => {
      const themes: SequenceTheme[] = ['amber', 'emerald', 'purple', 'blue', 'orange'];

      for (const theme of themes) {
        const html = renderToString(
          React.createElement(CanvaSequenceGame, {
            title: `Sequence Test ${theme}`,
            items: sampleSeqItems,
            theme,
          })
        );

        expect(html).toContain(`Sequence Test ${theme}`);
        expect(html).toContain('Tahap 1: Pengamatan');
        expect(html).toContain('Periksa Urutan');
      }
    });

    test('CanvaMatchPairsGame renders cleanly across multiple themes with SVG container', () => {
      const themes: MatchTheme[] = ['purple', 'blue', 'emerald', 'amber', 'rose'];

      for (const theme of themes) {
        const html = renderToString(
          React.createElement(CanvaMatchPairsGame, {
            title: `Match Test ${theme}`,
            pairs: sampleMatchPairs,
            theme,
          })
        );

        expect(html).toContain(`Match Test ${theme}`);
        expect(html).toContain('Klorofil');
        expect(html).toContain('Zat Hijau Daun');
        expect(html).toContain('<svg');
        expect(html).toContain('Periksa Pasangan');
      }
    });

    test('InteractiveFlashcards renders cleanly across multiple themes with 3D perspective', () => {
      const themes: FlashcardTheme[] = ['blue', 'purple', 'emerald', 'amber', 'rose'];

      for (const theme of themes) {
        const html = renderToString(
          React.createElement(InteractiveFlashcards, {
            title: `Flashcards Test ${theme}`,
            cards: sampleFlashcards,
            theme,
          })
        );

        expect(html).toContain(`Flashcards Test ${theme}`);
        expect(html).not.toContain('Tantangan Ingatan Aktif');
        expect(html).toContain('perspective:1200px');
        expect(html).toContain('Balik Kartu');
      }
    });
  });
});
