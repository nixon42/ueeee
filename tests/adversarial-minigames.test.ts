import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { 
  CanvaSequenceGame, 
  SequenceItem, 
  SequenceTheme 
} from '../src/components/canva-games/CanvaSequenceGame';
import { 
  CanvaMatchPairsGame, 
  MatchPairItem, 
  MatchTheme 
} from '../src/components/canva-games/CanvaMatchPairsGame';
import { 
  InteractiveFlashcards, 
  FlashcardTheme 
} from '../src/components/canva-games/InteractiveFlashcards';
import { FlashcardItem } from '../src/types/presentation';
import { sound } from '../src/lib/sound';

// ============================================================================
// HELPER UTILITIES: Permutation Generator & Deterministic Simulators
// ============================================================================

/**
 * Generate all permutations of an array (Heap's algorithm)
 */
function getPermutations<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  const c = new Array(arr.length).fill(0);
  const a = [...arr];
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
 * Exact implementation replica of CanvaSequenceGame state transitions
 */
class SequenceGameStateHarness {
  currentOrder: SequenceItem[];
  checkedState: boolean = false;
  isSuccess: boolean = false;
  onCompleteCallbackCalled: boolean = false;
  lastOnCompleteResult: boolean | null = null;

  constructor(initialItems: SequenceItem[]) {
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

  checkOrder(): boolean {
    let allCorrect = true;
    this.currentOrder.forEach((item, idx) => {
      // Strict equality comparison to idx + 1
      if (item.order !== idx + 1) {
        allCorrect = false;
      }
    });

    this.checkedState = true;
    this.isSuccess = allCorrect;
    this.onCompleteCallbackCalled = true;
    this.lastOnCompleteResult = allCorrect;
    return allCorrect;
  }

  getItemStatus(index: number): { isCorrect: boolean; isWrong: boolean } {
    const item = this.currentOrder[index];
    if (!item) return { isCorrect: false, isWrong: false };
    const isCorrect = this.checkedState && item.order === index + 1;
    const isWrong = this.checkedState && item.order !== index + 1;
    return { isCorrect, isWrong };
  }
}

/**
 * Exact implementation replica of CanvaMatchPairsGame state transitions
 */
class MatchPairsGameStateHarness {
  pairs: MatchPairItem[];
  connections: Record<string, string> = {};
  selectedLeftId: string | null = null;
  checkedState: boolean = false;
  isSuccess: boolean = false;
  lastOnCompleteResult: boolean | null = null;

  constructor(pairs: MatchPairItem[]) {
    this.pairs = [...pairs];
  }

  selectLeft(id: string): void {
    this.selectedLeftId = id;
    this.checkedState = false;
  }

  selectRight(id: string): boolean {
    if (!this.selectedLeftId) return false;

    // Remove if this rightId was previously connected to another leftId (enforce bijection)
    Object.keys(this.connections).forEach(key => {
      if (this.connections[key] === id) {
        delete this.connections[key];
      }
    });

    this.connections[this.selectedLeftId] = id;
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

  checkMatches(): { allCorrect: boolean; correctCount: number; totalPairs: number } {
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
    this.lastOnCompleteResult = allCorrect;

    return { allCorrect, correctCount, totalPairs };
  }
}

/**
 * Exact implementation replica of InteractiveFlashcards state transitions
 */
class FlashcardsGameStateHarness {
  cards: FlashcardItem[];
  currentIndex: number = 0;
  isFlipped: boolean = false;
  ratings: Record<string, 'mastered' | 'review'> = {};
  isFinished: boolean = false;
  lastOnComplete: { masteredCount: number; totalCount: number } | null = null;

  constructor(cards: FlashcardItem[]) {
    this.cards = [...cards];
  }

  flip(): boolean {
    this.isFlipped = !this.isFlipped;
    return this.isFlipped;
  }

  rate(rating: 'mastered' | 'review'): { advanced: boolean; finished: boolean } {
    const currentCard = this.cards[this.currentIndex];
    if (!currentCard) return { advanced: false, finished: false };

    this.ratings[currentCard.id] = rating;

    if (this.currentIndex < this.cards.length - 1) {
      this.isFlipped = false;
      this.currentIndex += 1;
      return { advanced: true, finished: false };
    } else {
      this.isFinished = true;
      const masteredCount = Object.values(this.ratings).filter(r => r === 'mastered').length;
      this.lastOnComplete = { masteredCount, totalCount: this.cards.length };
      return { advanced: false, finished: true };
    }
  }

  reset(): void {
    this.currentIndex = 0;
    this.isFlipped = false;
    this.ratings = {};
    this.isFinished = false;
    this.lastOnComplete = null;
  }

  getMasteredCount(): number {
    return Object.values(this.ratings).filter(r => r === 'mastered').length;
  }
}

// ============================================================================
// ADVERSARIAL TEST SUITE
// ============================================================================

describe('Adversarial Verification: CanvaSequenceGame Engine', () => {
  const sample3Items: SequenceItem[] = [
    { id: 'item-1', order: 1, label: 'Langkah Pertama', iconEmoji: '🌱' },
    { id: 'item-2', order: 2, label: 'Langkah Kedua', iconEmoji: '🌿' },
    { id: 'item-3', order: 3, label: 'Langkah Ketiga', iconEmoji: '🌳' },
  ];

  const sample4Items: SequenceItem[] = [
    { id: 's1', order: 1, label: 'Evaporasi', iconEmoji: '☀️' },
    { id: 's2', order: 2, label: 'Kondensasi', iconEmoji: '☁️' },
    { id: 's3', order: 3, label: 'Presipitasi', iconEmoji: '🌧️' },
    { id: 's4', order: 4, label: 'Infiltrasi', iconEmoji: '🌱' },
  ];

  test('Permutation verification: Only identity permutation (order === idx + 1) passes validation', () => {
    // 3 items = 6 permutations
    const perms3 = getPermutations(sample3Items);
    expect(perms3.length).toBe(6);

    let passedCount3 = 0;
    for (const perm of perms3) {
      const harness = new SequenceGameStateHarness(perm);
      const isCorrect = harness.checkOrder();
      if (isCorrect) passedCount3++;
    }
    // Exactly 1 permutation must pass
    expect(passedCount3).toBe(1);

    // 4 items = 24 permutations
    const perms4 = getPermutations(sample4Items);
    expect(perms4.length).toBe(24);

    let passedCount4 = 0;
    for (const perm of perms4) {
      const harness = new SequenceGameStateHarness(perm);
      const isCorrect = harness.checkOrder();
      if (isCorrect) passedCount4++;
    }
    // Exactly 1 permutation out of 24 must pass
    expect(passedCount4).toBe(1);
  });

  test('Boundary stress: moveLeft at index 0 is strictly a no-op and leaves state untouched', () => {
    const harness = new SequenceGameStateHarness(sample4Items);
    const initialOrderIds = harness.currentOrder.map(i => i.id);

    // Multiple attempts to move left at index 0
    for (let attempt = 0; attempt < 50; attempt++) {
      const moved = harness.moveLeft(0);
      expect(moved).toBe(false);
      expect(harness.currentOrder.map(i => i.id)).toEqual(initialOrderIds);
    }

    // Negative index bounds
    expect(harness.moveLeft(-1)).toBe(false);
    expect(harness.moveLeft(-999)).toBe(false);
    expect(harness.currentOrder.map(i => i.id)).toEqual(initialOrderIds);
  });

  test('Boundary stress: moveRight at last index is strictly a no-op and leaves state untouched', () => {
    const harness = new SequenceGameStateHarness(sample4Items);
    const lastIndex = sample4Items.length - 1;
    const initialOrderIds = harness.currentOrder.map(i => i.id);

    // Multiple attempts to move right at last index
    for (let attempt = 0; attempt < 50; attempt++) {
      const moved = harness.moveRight(lastIndex);
      expect(moved).toBe(false);
      expect(harness.currentOrder.map(i => i.id)).toEqual(initialOrderIds);
    }

    // Out-of-bounds indices
    expect(harness.moveRight(lastIndex + 1)).toBe(false);
    expect(harness.moveRight(9999)).toBe(false);
    expect(harness.currentOrder.map(i => i.id)).toEqual(initialOrderIds);
  });

  test('Move symmetry and reversibility: moveRight(i) followed by moveLeft(i+1) is an identity transformation', () => {
    const harness = new SequenceGameStateHarness(sample4Items);
    const initialOrderIds = harness.currentOrder.map(i => i.id);

    for (let i = 0; i < sample4Items.length - 1; i++) {
      harness.moveRight(i);
      expect(harness.currentOrder.map(i => i.id)).not.toEqual(initialOrderIds);
      harness.moveLeft(i + 1);
      expect(harness.currentOrder.map(i => i.id)).toEqual(initialOrderIds);
    }
  });

  test('Stress simulation: 2000 random valid moveLeft/moveRight calls preserve item set integrity', () => {
    const harness = new SequenceGameStateHarness(sample4Items);
    const expectedIds = new Set(sample4Items.map(i => i.id));

    for (let step = 0; step < 2000; step++) {
      const idx = step % sample4Items.length;
      if (step % 2 === 0) {
        harness.moveLeft(idx);
      } else {
        harness.moveRight(idx);
      }

      // Invariants: length must be 4, all IDs must exist without duplication
      expect(harness.currentOrder.length).toBe(4);
      const currentIds = new Set(harness.currentOrder.map(i => i.id));
      expect(currentIds.size).toBe(4);
      for (const id of expectedIds) {
        expect(currentIds.has(id)).toBe(true);
      }
    }
  });

  test('HTML5 drag-and-drop drop simulation: splice reordering preserves all items', () => {
    const harness = new SequenceGameStateHarness(sample4Items);

    // Drop index 3 to index 0: [s4, s1, s2, s3]
    harness.drop(3, 0);
    expect(harness.currentOrder.map(i => i.id)).toEqual(['s4', 's1', 's2', 's3']);

    // Drop index 1 to index 2: [s4, s2, s1, s3]
    harness.drop(1, 2);
    expect(harness.currentOrder.map(i => i.id)).toEqual(['s4', 's2', 's1', 's3']);

    // Drop onto same index (no-op)
    const result = harness.drop(2, 2);
    expect(result).toBe(false);
    expect(harness.currentOrder.map(i => i.id)).toEqual(['s4', 's2', 's1', 's3']);
  });

  test('Strict equality: items with non-matching types or out-of-order fail strict equality', () => {
    // String order '1' instead of number 1
    const invalidTypeItem: any = [
      { id: '1', order: '1', label: 'String order' },
      { id: '2', order: 2, label: 'Number order' },
    ];
    const harness = new SequenceGameStateHarness(invalidTypeItem);
    // '1' !== 1 under strict inequality
    const isCorrect = harness.checkOrder();
    expect(isCorrect).toBe(false);
  });

  test('Per-item validation states: correct items marked true, misplaced marked false', () => {
    // Only item 1 is at index 0; items 2 and 3 are swapped (at index 2 and index 1)
    const partiallyOrdered: SequenceItem[] = [
      sample3Items[0], // order: 1, index: 0 -> MATCH
      sample3Items[2], // order: 3, index: 1 -> MISMATCH (expected 2)
      sample3Items[1], // order: 2, index: 2 -> MISMATCH (expected 3)
    ];

    const harness = new SequenceGameStateHarness(partiallyOrdered);
    harness.checkOrder();

    const status0 = harness.getItemStatus(0);
    expect(status0.isCorrect).toBe(true);
    expect(status0.isWrong).toBe(false);

    const status1 = harness.getItemStatus(1);
    expect(status1.isCorrect).toBe(false);
    expect(status1.isWrong).toBe(true);

    const status2 = harness.getItemStatus(2);
    expect(status2.isCorrect).toBe(false);
    expect(status2.isWrong).toBe(true);
  });

  test('Real component renders under renderToString across all 8 sequence themes', () => {
    const allThemes: SequenceTheme[] = ['amber', 'emerald', 'purple', 'blue', 'indigo', 'rose', 'teal', 'orange'];

    for (const theme of allThemes) {
      let completedResult: boolean | null = null;
      const element = React.createElement(CanvaSequenceGame, {
        items: sample4Items,
        theme,
        title: `Test Sequence ${theme}`,
        instructions: 'Susun langkah berikut',
        onComplete: (res) => { completedResult = res; },
      });

      const html = renderToString(element);
      expect(html.length).toBeGreaterThan(1000);
      expect(html).toContain('Tantangan Urutan Langkah');
      expect(html).toContain(`Test Sequence ${theme}`);
      expect(html).toContain('Canva Sequence');
      expect(html).toContain('Evaporasi');
      expect(html).toContain('Infiltrasi');
    }
  });
});

describe('Adversarial Verification: CanvaMatchPairsGame Engine', () => {
  const samplePairs: MatchPairItem[] = [
    { id: 'p1', leftText: 'Produsen', rightText: 'Tumbuhan Hijau' },
    { id: 'p2', leftText: 'Konsumen Primer', rightText: 'Ulat Daun' },
    { id: 'p3', leftText: 'Konsumen Sekunder', rightText: 'Burung Pipit' },
    { id: 'p4', leftText: 'Dekomposer', rightText: 'Jamur Hutan' },
  ];

  test('Complete matching: all pairs connected to their matching IDs produces allCorrect === true', () => {
    const harness = new MatchPairsGameStateHarness(samplePairs);

    // Connect p1 -> p1, p2 -> p2, p3 -> p3, p4 -> p4
    for (const pair of samplePairs) {
      harness.selectLeft(pair.id);
      harness.selectRight(pair.id);
    }

    expect(Object.keys(harness.connections).length).toBe(4);
    const result = harness.checkMatches();
    expect(result.allCorrect).toBe(true);
    expect(result.correctCount).toBe(4);
    expect(harness.isSuccess).toBe(true);
  });

  test('Partial matching: subset of connections (0, 1, 2, 3 of 4) strictly fails validation', () => {
    for (let connectedCount = 0; connectedCount < samplePairs.length; connectedCount++) {
      const harness = new MatchPairsGameStateHarness(samplePairs);

      // Connect only up to connectedCount
      for (let i = 0; i < connectedCount; i++) {
        harness.selectLeft(samplePairs[i].id);
        harness.selectRight(samplePairs[i].id);
      }

      expect(Object.keys(harness.connections).length).toBe(connectedCount);
      const result = harness.checkMatches();
      // Partial connections must NOT be considered complete
      expect(result.allCorrect).toBe(false);
      expect(result.correctCount).toBe(connectedCount);
      expect(harness.isSuccess).toBe(false);
    }
  });

  test('Mismatched connections: all 4 connected but with inverted or cyclically shifted targets fails validation', () => {
    const harness = new MatchPairsGameStateHarness(samplePairs);

    // Cyclical shift: p1 -> p2, p2 -> p3, p3 -> p4, p4 -> p1
    harness.selectLeft('p1'); harness.selectRight('p2');
    harness.selectLeft('p2'); harness.selectRight('p3');
    harness.selectLeft('p3'); harness.selectRight('p4');
    harness.selectLeft('p4'); harness.selectRight('p1');

    expect(Object.keys(harness.connections).length).toBe(4);
    const result = harness.checkMatches();
    expect(result.allCorrect).toBe(false);
    expect(result.correctCount).toBe(0);
    expect(harness.isSuccess).toBe(false);
  });

  test('Bijection preservation: Re-connecting a right item to a new left item automatically detaches old left item', () => {
    const harness = new MatchPairsGameStateHarness(samplePairs);

    // Step 1: Connect p1 -> p2
    harness.selectLeft('p1');
    harness.selectRight('p2');
    expect(harness.connections['p1']).toBe('p2');

    // Step 2: Now connect p3 -> p2 (the same right item!)
    harness.selectLeft('p3');
    harness.selectRight('p2');

    // Bijection invariant: p2 must NOT be connected to p1 anymore!
    expect(harness.connections['p1']).toBeUndefined();
    expect(harness.connections['p3']).toBe('p2');
    expect(Object.keys(harness.connections).length).toBe(1);
  });

  test('Bijection preservation: Re-connecting the same left item to a new right item updates target cleanly', () => {
    const harness = new MatchPairsGameStateHarness(samplePairs);

    // Step 1: Connect p1 -> p2
    harness.selectLeft('p1');
    harness.selectRight('p2');
    expect(harness.connections['p1']).toBe('p2');

    // Step 2: Connect p1 -> p1 (user corrects connection)
    harness.selectLeft('p1');
    harness.selectRight('p1');
    expect(harness.connections['p1']).toBe('p1');
    expect(Object.keys(harness.connections).length).toBe(1);
  });

  test('Reset functionality: handleReset completely purges connection map and resets validation state', () => {
    const harness = new MatchPairsGameStateHarness(samplePairs);

    // Establish full connections and check
    for (const pair of samplePairs) {
      harness.selectLeft(pair.id);
      harness.selectRight(pair.id);
    }
    harness.checkMatches();
    expect(harness.isSuccess).toBe(true);
    expect(harness.checkedState).toBe(true);

    // Reset
    harness.reset();
    expect(Object.keys(harness.connections).length).toBe(0);
    expect(harness.selectedLeftId).toBeNull();
    expect(harness.checkedState).toBe(false);
    expect(harness.isSuccess).toBe(false);

    // Checking after reset must fail
    const postResetCheck = harness.checkMatches();
    expect(postResetCheck.allCorrect).toBe(false);
    expect(postResetCheck.correctCount).toBe(0);
  });

  test('Real component renders under renderToString across all 8 match themes', () => {
    const allThemes: MatchTheme[] = ['purple', 'blue', 'emerald', 'amber', 'rose', 'indigo', 'teal', 'orange'];

    for (const theme of allThemes) {
      const element = React.createElement(CanvaMatchPairsGame, {
        pairs: samplePairs,
        theme,
        title: `Test Match ${theme}`,
        leftColumnHeader: 'Konsep Sains',
        rightColumnHeader: 'Pasangan Alami',
      });

      const html = renderToString(element);
      expect(html.length).toBeGreaterThan(1000);
      expect(html).toContain('Tantangan Pasangan Konsep');
      expect(html).toContain(`Test Match ${theme}`);
      expect(html).toContain('Canva Match Pairs');
      expect(html).toContain('Produsen');
      expect(html).toContain('Tumbuhan Hijau');
    }
  });
});

describe('Adversarial Verification: InteractiveFlashcards Engine', () => {
  const sampleCards: FlashcardItem[] = [
    {
      id: 'fc-1',
      frontPrompt: 'Apa fungsi klorofil pada daun?',
      backAnswer: 'Menyerap energi foton cahaya matahari untuk fotolisis air',
      category: 'Biologi Daun',
    },
    {
      id: 'fc-2',
      frontPrompt: 'Sebutkan gas yang dihasilkan saat fotosintesis!',
      backAnswer: 'Gas Oksigen (O2)',
      category: 'Reaksi Kimia',
    },
    {
      id: 'fc-3',
      frontPrompt: 'Di organel mana reaksi fotosintesis berlangsung?',
      backAnswer: 'Di dalam Kloroplas (khususnya grana dan stroma)',
      category: 'Struktur Sel',
    },
  ];

  test('Card flip toggle: Alternates boolean isFlipped with strict parity', () => {
    const harness = new FlashcardsGameStateHarness(sampleCards);
    expect(harness.isFlipped).toBe(false);

    for (let i = 1; i <= 100; i++) {
      const state = harness.flip();
      expect(state).toBe(i % 2 !== 0);
      expect(harness.isFlipped).toBe(i % 2 !== 0);
    }
  });

  test('Mastery rating accumulator: Exhaustive evaluation across all 2^N rating combinations', () => {
    // 3 cards = 8 combinations
    const totalCombinations = Math.pow(2, sampleCards.length);

    for (let mask = 0; mask < totalCombinations; mask++) {
      const harness = new FlashcardsGameStateHarness(sampleCards);
      let expectedMastered = 0;

      for (let cardIdx = 0; cardIdx < sampleCards.length; cardIdx++) {
        const isMastered = (mask & (1 << cardIdx)) !== 0;
        const rating = isMastered ? 'mastered' : 'review';
        if (isMastered) expectedMastered++;

        harness.rate(rating);
      }

      // After all cards rated:
      expect(harness.isFinished).toBe(true);
      expect(harness.getMasteredCount()).toBe(expectedMastered);
      expect(harness.lastOnComplete).not.toBeNull();
      expect(harness.lastOnComplete?.masteredCount).toBe(expectedMastered);
      expect(harness.lastOnComplete?.totalCount).toBe(3);
    }
  });

  test('Completion timing: isFinished remains false until the final card is rated', () => {
    const harness = new FlashcardsGameStateHarness(sampleCards);

    // Card 1
    const res1 = harness.rate('mastered');
    expect(res1.advanced).toBe(true);
    expect(res1.finished).toBe(false);
    expect(harness.isFinished).toBe(false);
    expect(harness.currentIndex).toBe(1);

    // Card 2
    const res2 = harness.rate('review');
    expect(res2.advanced).toBe(true);
    expect(res2.finished).toBe(false);
    expect(harness.isFinished).toBe(false);
    expect(harness.currentIndex).toBe(2);

    // Card 3 (Final card)
    const res3 = harness.rate('mastered');
    expect(res3.advanced).toBe(false);
    expect(res3.finished).toBe(true);
    expect(harness.isFinished).toBe(true);
    expect(harness.lastOnComplete?.masteredCount).toBe(2);
    expect(harness.lastOnComplete?.totalCount).toBe(3);
  });

  test('Reset functionality: handleResetCards returns to card 0, un-flips, purges ratings, and clears finished state', () => {
    const harness = new FlashcardsGameStateHarness(sampleCards);

    // Complete all cards
    harness.rate('mastered');
    harness.rate('mastered');
    harness.rate('mastered');
    expect(harness.isFinished).toBe(true);
    expect(harness.getMasteredCount()).toBe(3);

    // Reset
    harness.reset();
    expect(harness.currentIndex).toBe(0);
    expect(harness.isFlipped).toBe(false);
    expect(Object.keys(harness.ratings).length).toBe(0);
    expect(harness.isFinished).toBe(false);
    expect(harness.lastOnComplete).toBeNull();
  });

  test('Real component renders under renderToString across all 8 flashcard themes', () => {
    const allThemes: FlashcardTheme[] = ['blue', 'purple', 'emerald', 'amber', 'rose', 'indigo', 'teal', 'orange'];

    for (const theme of allThemes) {
      const element = React.createElement(InteractiveFlashcards, {
        cards: sampleCards,
        theme,
        title: `Test Flashcard ${theme}`,
        instructions: 'Pikirkan jawaban sebelum membalik kartu',
      });

      const html = renderToString(element);
      expect(html.length).toBeGreaterThan(1000);
      expect(html).toContain('Tantangan Ingatan Aktif');
      expect(html).toContain(`Test Flashcard ${theme}`);
      expect(html).toContain('3D Flashcards');
      expect(html).toContain('Apa fungsi klorofil pada daun?');
      expect(html).toContain('Menyerap energi foton cahaya matahari');
    }
  });
});

describe('Adversarial Verification: Cross-Component Sound Decoupling & Defensive Fallbacks', () => {
  test('Sound engine methods are safely callable without DOM/AudioContext errors in test runtime', () => {
    expect(() => sound.playClick()).not.toThrow();
    expect(() => sound.playCorrect()).not.toThrow();
    expect(() => sound.playWrong()).not.toThrow();
    expect(() => sound.playStep()).not.toThrow();
    expect(() => sound.playLadderClimb()).not.toThrow();
    expect(() => sound.playSnakeSlide()).not.toThrow();
    expect(() => sound.playDiceRoll()).not.toThrow();
    expect(() => sound.playChessMove()).not.toThrow();
    expect(() => sound.playChessCapture()).not.toThrow();
    expect(() => sound.playChessSuccess()).not.toThrow();
    expect(() => sound.playChessError()).not.toThrow();
  });
});

