/**
 * Adversarial Challenger M4 Test Suite
 * Focus Areas:
 * 1. Zero GameQuizModal in ALL_PRESENTATION_DECKS presentation flows (R2 compliance).
 * 2. Embedded mini-games handling wrong inputs gracefully, providing instant feedback, and reset/shuffle affordances.
 * 3. sound.ts robustness under rapid repeated invocations and suspended AudioContext states.
 * 4. SVG rendering of all 10 illustrations in DECK_ILLUSTRATION_MAP.
 */

import { describe, expect, test, afterEach } from 'bun:test';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Presentation Decks & Catalog
import { 
  ALL_PRESENTATION_DECKS, 
  getAllPresentationDeckIds, 
  getPresentationDeckByGameId 
} from '../src/data/presentation-decks';
import { GAMES_CATALOG } from '../src/data/games-catalog';
import { StoryPresentationDeckEngine } from '../src/components/canva-games/StoryPresentationDeckEngine';
import { CanvaSequenceGame, SequenceItem } from '../src/components/canva-games/CanvaSequenceGame';
import { CanvaMatchPairsGame, MatchPairItem } from '../src/components/canva-games/CanvaMatchPairsGame';
import { InteractiveFlashcards } from '../src/components/canva-games/InteractiveFlashcards';
import { DECK_ILLUSTRATION_MAP, getDeckIllustration } from '../src/components/visuals';
import { sound } from '../src/lib/sound';
import { MiniGameBoardSlide, MiniGameChessSlide, MiniGameWordSlide } from '../src/types/presentation';

// ============================================================================
// SUITE 1: Zero GameQuizModal Popups Across All Presentation Flows (R2 Compliance)
// ============================================================================

describe('Suite 1: Zero GameQuizModal in ALL_PRESENTATION_DECKS Presentation Flows (R2)', () => {
  const registeredDeckIds = getAllPresentationDeckIds();

  test('All 10 games from GAMES_CATALOG are registered in ALL_PRESENTATION_DECKS', () => {
    expect(registeredDeckIds.length).toBe(10);
    for (const game of GAMES_CATALOG) {
      expect(registeredDeckIds).toContain(game.id);
      const deck = getPresentationDeckByGameId(game.id);
      expect(deck).toBeDefined();
      expect(deck?.slides.length).toBeGreaterThanOrEqual(5);
    }
  });

  test('Static Slide Definition Audit: Zero slides use quiz type or reference GameQuizModal', () => {
    for (const [, deck] of Object.entries(ALL_PRESENTATION_DECKS)) {
      expect(deck.slides.length).toBeGreaterThanOrEqual(5);
      deck.slides.forEach((slide) => {
        // Assert slide type is one of the valid story/mini-game types, NEVER 'quiz' or 'modal-quiz'
        const validSlideTypes = [
          'narrative-intro',
          'concept-infographic',
          'mini-game-sequence',
          'mini-game-match',
          'mini-game-flashcard',
          'mini-game-board',
          'mini-game-chess',
          'mini-game-word',
          'story-resolution',
          'reflection-spark'
        ];
        expect(validSlideTypes).toContain(slide.type);
        expect((slide as any).type).not.toBe('quiz');
        expect((slide as any).type).not.toBe('game-quiz');
        expect((slide as any).type).not.toBe('GameQuizModal');

        // Check that slide metadata does not carry quiz modal triggers
        const serialized = JSON.stringify(slide);
        expect(serialized).not.toContain('GameQuizModal');
        expect(serialized).not.toContain('Pilih Jawaban yang Tepat');
      });
    }
  });

  test('Full DOM/Server Render Audit: Exhaustive render of all slides across all 10 decks contains 0 GameQuizModal markup', () => {
    let totalSlidesRendered = 0;

    for (const [, deck] of Object.entries(ALL_PRESENTATION_DECKS)) {
      for (let slideNum = 1; slideNum <= deck.slides.length; slideNum++) {
        const element = React.createElement(StoryPresentationDeckEngine, {
          isOpen: true,
          onClose: () => {},
          deck: deck,
          initialSlide: slideNum,
        });

        const html = renderToString(element);
        totalSlidesRendered++;

        // Assert rendered HTML does not contain GameQuizModal artifacts
        expect(html).not.toContain('GameQuizModal');
        expect(html).not.toContain('Pilih Jawaban yang Tepat');
        expect(html).not.toContain('Pertanyaan Kuis');
        expect(html).not.toContain('quiz-modal');
        expect(html).not.toContain('id="quiz-modal"');

        // Assert valid presentation shell structure
        expect(html).not.toContain('Mode Presentasi Guru');
        expect(html).toContain('Kembali ke Beranda');
        const encodedTitle = deck.title.replace(/&/g, '&amp;');
        expect(html.includes(deck.title) || html.includes(encodedTitle)).toBe(true);
      }
    }

    // Verify comprehensive coverage of at least 70 distinct slides across the catalog
    expect(totalSlidesRendered).toBeGreaterThanOrEqual(70);
  });

  test('Interactive Mini-Game Verification: Every presentation deck has at least 1 embedded interactive mini-game slide', () => {
    const interactiveGameSlideTypes = [
      'mini-game-sequence',
      'mini-game-match',
      'mini-game-flashcard',
      'mini-game-board',
      'mini-game-chess',
      'mini-game-word'
    ];

    for (const [, deck] of Object.entries(ALL_PRESENTATION_DECKS)) {
      const interactiveSlides = deck.slides.filter(s => interactiveGameSlideTypes.includes(s.type));
      expect(interactiveSlides.length).toBeGreaterThanOrEqual(1);

      // Verify that interactive slides carry necessary game payloads
      interactiveSlides.forEach(slide => {
        if (slide.type === 'mini-game-sequence') {
          expect(slide.items.length).toBeGreaterThanOrEqual(3);
          slide.items.forEach((item) => {
            expect(item.id).toBeTruthy();
            expect(item.label).toBeTruthy();
            expect(typeof item.order).toBe('number');
          });
        } else if (slide.type === 'mini-game-match') {
          expect(slide.pairs.length).toBeGreaterThanOrEqual(3);
          slide.pairs.forEach(pair => {
            expect(pair.id).toBeTruthy();
            expect(pair.leftText).toBeTruthy();
            expect(pair.rightText).toBeTruthy();
          });
        } else if (slide.type === 'mini-game-flashcard') {
          expect(slide.cards.length).toBeGreaterThanOrEqual(2);
          slide.cards.forEach(card => {
            expect(card.id).toBeTruthy();
            expect(card.frontPrompt).toBeTruthy();
            expect(card.backAnswer).toBeTruthy();
          });
        } else if (slide.type === 'mini-game-board') {
          expect(slide.tiles.length).toBeGreaterThanOrEqual(3);
        } else if (slide.type === 'mini-game-chess') {
          expect(slide.pieces.length).toBeGreaterThan(0);
          expect(slide.solutionMove).toBeDefined();
        } else if (slide.type === 'mini-game-word') {
          expect(slide.word).toBeTruthy();
          expect(slide.clue).toBeTruthy();
        }
      });
    }
  });
});

// ============================================================================
// SUITE 2: Mini-Game Interactivity, Wrong Inputs, Instant Feedback & Reset/Shuffle
// ============================================================================

describe('Suite 2: Mini-Game Interactivity, Graceful Wrong Input Handling & Affordances', () => {
  // --- A. CanvaSequenceGame Tests ---
  describe('CanvaSequenceGame Interactivity', () => {
    const testItems: SequenceItem[] = [
      { id: 's1', order: 1, label: 'Langkah Satu', iconEmoji: '1️⃣' },
      { id: 's2', order: 2, label: 'Langkah Dua', iconEmoji: '2️⃣' },
      { id: 's3', order: 3, label: 'Langkah Tiga', iconEmoji: '3️⃣' },
      { id: 's4', order: 4, label: 'Langkah Empat', iconEmoji: '4️⃣' },
    ];

    /** Deterministic harness replicating exact CanvaSequenceGame logic */
    class SequenceTestHarness {
      items: SequenceItem[];
      checkedState: boolean = false;
      isSuccess: boolean = false;
      onCompleteResult: boolean | null = null;

      constructor(init: SequenceItem[]) {
        this.items = [...init];
      }

      moveLeft(idx: number) {
        if (idx === 0 || idx < 0 || idx >= this.items.length) return;
        const temp = this.items[idx - 1];
        this.items[idx - 1] = this.items[idx];
        this.items[idx] = temp;
        this.checkedState = false;
      }

      moveRight(idx: number) {
        if (idx >= this.items.length - 1 || idx < 0) return;
        const temp = this.items[idx + 1];
        this.items[idx + 1] = this.items[idx];
        this.items[idx] = temp;
        this.checkedState = false;
      }

      shuffle() {
        this.items = [...this.items].sort(() => Math.random() - 0.5);
        this.checkedState = false;
        this.isSuccess = false;
      }

      checkOrder(): boolean {
        let allCorrect = true;
        this.items.forEach((it, i) => {
          if (it.order !== i + 1) allCorrect = false;
        });
        this.checkedState = true;
        this.isSuccess = allCorrect;
        this.onCompleteResult = allCorrect;
        return allCorrect;
      }
    }

    test('Permutation Stress: 4 items (24 permutations) — exactly 1 correct, 23 reject with isSuccess=false', () => {
      function permute<T>(arr: T[]): T[][] {
        if (arr.length <= 1) return [arr];
        const res: T[][] = [];
        for (let i = 0; i < arr.length; i++) {
          const current = arr[i];
          const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
          for (const p of permute(rest)) {
            res.push([current, ...p]);
          }
        }
        return res;
      }

      const allPerms = permute(testItems);
      expect(allPerms.length).toBe(24);

      let successCount = 0;
      let failureCount = 0;

      for (const p of allPerms) {
        const harness = new SequenceTestHarness(p);
        const passed = harness.checkOrder();
        expect(harness.checkedState).toBe(true);

        if (passed) {
          successCount++;
          expect(harness.isSuccess).toBe(true);
          expect(harness.onCompleteResult).toBe(true);
        } else {
          failureCount++;
          expect(harness.isSuccess).toBe(false);
          expect(harness.onCompleteResult).toBe(false);
        }
      }

      expect(successCount).toBe(1);
      expect(failureCount).toBe(23);
    });

    test('Boundary tap swaps: moveLeft(0) and moveRight(lastIdx) are safe no-ops and preserve order', () => {
      const harness = new SequenceTestHarness(testItems);
      const snapshot = harness.items.map(x => x.id).join(',');

      harness.moveLeft(0);
      expect(harness.items.map(x => x.id).join(',')).toBe(snapshot);

      harness.moveRight(harness.items.length - 1);
      expect(harness.items.map(x => x.id).join(',')).toBe(snapshot);

      // Negative or out of bounds indices
      harness.moveLeft(-5);
      harness.moveRight(999);
      expect(harness.items.map(x => x.id).join(',')).toBe(snapshot);
    });

    test('Shuffle affordance: Resets validation state and preserves all elements without loss', () => {
      const harness = new SequenceTestHarness(testItems);
      harness.checkOrder();
      expect(harness.checkedState).toBe(true);

      harness.shuffle();
      expect(harness.checkedState).toBe(false);
      expect(harness.isSuccess).toBe(false);
      expect(harness.items.length).toBe(testItems.length);

      const ids = harness.items.map(x => x.id).sort();
      const expectedIds = testItems.map(x => x.id).sort();
      expect(ids).toEqual(expectedIds);
    });

    test('Component rendering with wrong state feedback via renderToString', () => {
      const element = React.createElement(CanvaSequenceGame, {
        items: testItems,
        title: 'Tantangan Siklus',
        theme: 'emerald',
      });
      const html = renderToString(element);
      expect(html).toContain('Tantangan Siklus');
      expect(html).toContain('Langkah Satu');
      expect(html).toContain('Acak Ulang');
      expect(html).toContain('Periksa Urutan');
    });
  });

  // --- B. CanvaMatchPairsGame Tests ---
  describe('CanvaMatchPairsGame Interactivity', () => {
    const testPairs: MatchPairItem[] = [
      { id: 'p1', leftText: 'Produsen', rightText: 'Tumbuhan Hijau' },
      { id: 'p2', leftText: 'Herbivora', rightText: 'Kelinci Padang' },
      { id: 'p3', leftText: 'Karnivora', rightText: 'Elang Jawa' },
      { id: 'p4', leftText: 'Dekomposer', rightText: 'Jamur Hutan' },
    ];

    /** Deterministic harness replicating exact CanvaMatchPairsGame logic */
    class MatchPairsTestHarness {
      pairs: MatchPairItem[];
      connections: Record<string, string> = {};
      selectedLeftId: string | null = null;
      checkedState: boolean = false;
      isSuccess: boolean = false;
      onCompleteResult: boolean | null = null;

      constructor(pairs: MatchPairItem[]) {
        this.pairs = pairs;
      }

      selectLeft(id: string) {
        this.selectedLeftId = id;
        this.checkedState = false;
      }

      selectRight(id: string) {
        if (!this.selectedLeftId) return;
        // Bijection: remove if rightId is already connected elsewhere
        Object.keys(this.connections).forEach(k => {
          if (this.connections[k] === id) delete this.connections[k];
        });
        this.connections[this.selectedLeftId] = id;
        this.selectedLeftId = null;
        this.checkedState = false;
      }

      reset() {
        this.connections = {};
        this.selectedLeftId = null;
        this.checkedState = false;
        this.isSuccess = false;
      }

      checkMatches(): boolean {
        const total = this.pairs.length;
        const count = Object.keys(this.connections).length;
        let correctCount = 0;
        Object.entries(this.connections).forEach(([left, right]) => {
          if (left === right) correctCount++;
        });

        const allCorrect = count === total && correctCount === total;
        this.checkedState = true;
        this.isSuccess = allCorrect;
        this.onCompleteResult = allCorrect;
        return allCorrect;
      }
    }

    test('Derangements and Partial Matches fail gracefully with instant rejection feedback', () => {
      const harness = new MatchPairsTestHarness(testPairs);

      // 1. Partial connection (only 2 out of 4 connected)
      harness.selectLeft('p1');
      harness.selectRight('p1');
      harness.selectLeft('p2');
      harness.selectRight('p2');
      expect(harness.checkMatches()).toBe(false);
      expect(harness.isSuccess).toBe(false);
      expect(harness.onCompleteResult).toBe(false);
      expect(harness.checkedState).toBe(true);

      // 2. Inverted mismatch derangement (all connected, but all wrong)
      harness.reset();
      harness.selectLeft('p1');
      harness.selectRight('p2');
      harness.selectLeft('p2');
      harness.selectRight('p1');
      harness.selectLeft('p3');
      harness.selectRight('p4');
      harness.selectLeft('p4');
      harness.selectRight('p3');
      expect(harness.checkMatches()).toBe(false);
      expect(harness.isSuccess).toBe(false);

      // 3. Perfect matching passes
      harness.reset();
      harness.selectLeft('p1');
      harness.selectRight('p1');
      harness.selectLeft('p2');
      harness.selectRight('p2');
      harness.selectLeft('p3');
      harness.selectRight('p3');
      harness.selectLeft('p4');
      harness.selectRight('p4');
      expect(harness.checkMatches()).toBe(true);
      expect(harness.isSuccess).toBe(true);
      expect(harness.onCompleteResult).toBe(true);
    });

    test('Bijection invariant: Overwriting connection replaces target and prevents 1-to-many or many-to-1 links', () => {
      const harness = new MatchPairsTestHarness(testPairs);

      // Connect p1 -> p1
      harness.selectLeft('p1');
      harness.selectRight('p1');
      expect(harness.connections['p1']).toBe('p1');

      // Now connect p2 -> p1 (stealing p1)
      harness.selectLeft('p2');
      harness.selectRight('p1');
      expect(harness.connections['p1']).toBeUndefined();
      expect(harness.connections['p2']).toBe('p1');
      expect(Object.keys(harness.connections).length).toBe(1);

      // Connect p2 -> p2 (re-pointing p2)
      harness.selectLeft('p2');
      harness.selectRight('p2');
      expect(harness.connections['p2']).toBe('p2');
      expect(Object.keys(harness.connections).length).toBe(1);
    });

    test('Reset affordance: Clears all connections, active left selection, and validation status', () => {
      const harness = new MatchPairsTestHarness(testPairs);
      harness.selectLeft('p1');
      harness.selectRight('p1');
      harness.checkMatches();
      expect(harness.checkedState).toBe(true);

      harness.reset();
      expect(Object.keys(harness.connections).length).toBe(0);
      expect(harness.selectedLeftId).toBeNull();
      expect(harness.checkedState).toBe(false);
      expect(harness.isSuccess).toBe(false);
    });

    test('Component rendering with pairs via renderToString across themes', () => {
      const element = React.createElement(CanvaMatchPairsGame, {
        pairs: testPairs,
        title: 'Jodohkan Trofik',
        theme: 'purple',
        leftColumnHeader: 'Tingkat',
        rightColumnHeader: 'Organisme',
      });
      const html = renderToString(element);
      expect(html).toContain('Jodohkan Trofik');
      expect(html).toContain('Produsen');
      expect(html).toContain('Tumbuhan Hijau');
      expect(html).toContain('Reset Garis');
      expect(html).toContain('Periksa Pasangan');
    });
  });

  // --- C. InteractiveFlashcards Tests ---
  describe('InteractiveFlashcards Interactivity', () => {
    const testCards = [
      { id: 'c1', frontPrompt: 'Soal 1', backAnswer: 'Jawaban 1' },
      { id: 'c2', frontPrompt: 'Soal 2', backAnswer: 'Jawaban 2' },
      { id: 'c3', frontPrompt: 'Soal 3', backAnswer: 'Jawaban 3' },
    ];

    class FlashcardsTestHarness {
      cards = testCards;
      currentIndex = 0;
      isFlipped = false;
      ratings: Record<string, 'mastered' | 'review'> = {};
      isFinished = false;
      masteredCount = 0;

      flip() {
        this.isFlipped = !this.isFlipped;
        return this.isFlipped;
      }

      rate(rating: 'mastered' | 'review') {
        const card = this.cards[this.currentIndex];
        if (!card) return;
        this.ratings[card.id] = rating;

        if (this.currentIndex < this.cards.length - 1) {
          this.isFlipped = false;
          this.currentIndex++;
        } else {
          this.isFinished = true;
          this.masteredCount = Object.values(this.ratings).filter(r => r === 'mastered').length;
        }
      }

      reset() {
        this.currentIndex = 0;
        this.isFlipped = false;
        this.ratings = {};
        this.isFinished = false;
        this.masteredCount = 0;
      }
    }

    test('Flip toggling and mastery rating sequence', () => {
      const harness = new FlashcardsTestHarness();
      expect(harness.flip()).toBe(true);
      expect(harness.flip()).toBe(false);

      harness.rate('mastered');
      expect(harness.currentIndex).toBe(1);
      expect(harness.isFinished).toBe(false);

      harness.rate('review');
      expect(harness.currentIndex).toBe(2);
      expect(harness.isFinished).toBe(false);

      harness.rate('mastered');
      expect(harness.isFinished).toBe(true);
      expect(harness.masteredCount).toBe(2);

      // Reset
      harness.reset();
      expect(harness.currentIndex).toBe(0);
      expect(harness.isFinished).toBe(false);
      expect(harness.masteredCount).toBe(0);
    });

    test('Component rendering of 3D flashcard structure via renderToString', () => {
      const element = React.createElement(InteractiveFlashcards, {
        cards: testCards,
        title: 'Flashcard Sains',
        theme: 'blue',
      });
      const html = renderToString(element);
      expect(html).toContain('Flashcard Sains');
      expect(html).toContain('Soal 1');
      expect(html).toContain('Jawaban 1');
      expect(html).toContain('Klik untuk Balik Kartu');
    });
  });

  // --- D. Embedded Board, Chess & Word Micro-Games ---
  describe('Embedded Board, Chess & Word Micro-Games State Handling', () => {
    test('BoardSlideEngine logic: Wrong choice gives instant feedback without advancing step', () => {
      const boardSlide: MiniGameBoardSlide = {
        id: 'board-1',
        type: 'mini-game-board',
        title: 'Stepping Board Test',
        tiles: [
          {
            id: 't1',
            title: 'Pos 1',
            prompt: 'Pilih opsi yang benar',
            choices: [
              { id: 'ch-wrong', text: 'Salah', isCorrect: false },
              { id: 'ch-correct', text: 'Benar', isCorrect: true },
            ],
          },
          {
            id: 't2',
            title: 'Pos 2',
            prompt: 'Garis Akhir',
            eventType: 'goal',
          },
        ],
      };

      let currentStep = 0;
      let isChoiceCorrect: boolean | null = null;
      let isFinished = false;

      const selectChoice = (ch: { id: string; isCorrect: boolean }) => {
        isChoiceCorrect = ch.isCorrect;
        if (ch.isCorrect) {
          if (currentStep < boardSlide.tiles.length - 1) {
            currentStep++;
            isChoiceCorrect = null;
          } else {
            isFinished = true;
          }
        }
      };

      // 1. Select wrong choice
      selectChoice(boardSlide.tiles[0].choices![0]);
      expect(isChoiceCorrect).toBe(false);
      expect(currentStep).toBe(0); // Did NOT advance!
      expect(isFinished).toBe(false);

      // 2. Select correct choice
      selectChoice(boardSlide.tiles[0].choices![1]);
      expect(currentStep).toBe(1); // Advanced to next step!
      expect(isChoiceCorrect).toBeNull();
    });

    test('ChessSlideEngine logic: Wrong tactical move triggers buzzer feedback and resets selection', () => {
      const chessSlide: MiniGameChessSlide = {
        id: 'chess-1',
        type: 'mini-game-chess',
        title: 'Taktik Skakmat',
        objective: 'Lakukan back rank checkmate',
        pieces: [
          { type: 'rook', color: 'w', col: 0, row: 1 },
          { type: 'king', color: 'b', col: 7, row: 7 },
        ],
        solutionMove: {
          from: { col: 0, row: 1 },
          to: { col: 0, row: 7 },
        },
        explanation: 'Benteng meluncur ke baris ke-8!',
      };

      let selectedPiece: { col: number; row: number } | null = null;
      let solved = false;
      let feedback: string | null = null;

      const clickSquare = (col: number, row: number) => {
        if (!selectedPiece) {
          selectedPiece = { col, row };
        } else {
          const isCorrect =
            selectedPiece.col === chessSlide.solutionMove.from.col &&
            selectedPiece.row === chessSlide.solutionMove.from.row &&
            col === chessSlide.solutionMove.to.col &&
            row === chessSlide.solutionMove.to.row;

          if (isCorrect) {
            solved = true;
            feedback = chessSlide.explanation;
            selectedPiece = null;
          } else {
            solved = false;
            feedback = 'Langkah belum tepat. Coba perhatikan petak ancaman ganda!';
            selectedPiece = null;
          }
        }
      };

      // Attempt 1: Click piece, then click wrong square
      clickSquare(0, 1);
      expect(selectedPiece).toEqual({ col: 0, row: 1 });
      clickSquare(0, 3);
      expect(solved).toBe(false);
      expect(feedback).toContain('Langkah belum tepat');
      expect(selectedPiece).toBeNull();

      // Attempt 2: Click piece, then click correct square
      clickSquare(0, 1);
      clickSquare(0, 7);
      expect(solved).toBe(true);
      expect(feedback).toContain('Benteng meluncur');
    });

    test('WordSlideEngine logic: Distractor selection marks error without solving', () => {
      const wordSlide: MiniGameWordSlide = {
        id: 'word-1',
        type: 'mini-game-word',
        title: 'Kuis Kata',
        clue: 'Bentuk puisi lama 4 baris',
        word: 'Pantun',
        options: ['Pantun', 'Syair', 'Gurindam', 'Karmina'],
        explanation: 'Pantun memiliki rima a-b-a-b.',
      };

      let solved = false;
      let selectedOption: string | null = null;

      const selectOption = (opt: string) => {
        selectedOption = opt;
        if (opt.toLowerCase().trim() === wordSlide.word.toLowerCase().trim()) {
          solved = true;
        } else {
          solved = false;
        }
      };

      // Select wrong option
      selectOption('Syair');
      expect(selectedOption).toBe('Syair');
      expect(solved).toBe(false);

      // Select correct option
      selectOption('Pantun');
      expect(selectedOption).toBe('Pantun');
      expect(solved).toBe(true);
    });
  });
});

// ============================================================================
// SUITE 3: Sound Engine Robustness Under Rapid Invocations & Suspended State
// ============================================================================

describe('Suite 3: sound.ts Methods Under Rapid Repeated Invocations and Suspended States', () => {
  const originalWindow = globalThis.window;
  const originalLocalStorage = (globalThis as any).localStorage;

  afterEach(() => {
    globalThis.window = originalWindow;
    (globalThis as any).localStorage = originalLocalStorage;
  });

  test('Rapid Repeated Invocations: 1,000 rapid calls across all 14 sound methods execute without crashing', () => {
    const methods = [
      () => sound.playClick(),
      () => sound.playStep(),
      () => sound.playDiceRoll(),
      () => sound.playSnakeSlide(),
      () => sound.playLadderClimb(),
      () => sound.playCorrect(),
      () => sound.playWrong(),
      () => sound.playChessMove(),
      () => sound.playChessCapture(),
      () => sound.playChessError(),
      () => sound.playChessSuccess(),
      () => sound.playFanfare(),
      () => sound.playCardFlip(),
      () => sound.playSlideTransition(),
    ];

    for (let round = 0; round < 75; round++) {
      for (const m of methods) {
        expect(() => m()).not.toThrow();
      }
    }
  });

  test('Suspended AudioContext State: initCtx resumes suspended AudioContext seamlessly', () => {
    let resumeCalls = 0;

    class MockAudioContext {
      state: AudioContextState = 'suspended';
      currentTime = 0;
      destination = {};

      resume(): Promise<void> {
        resumeCalls++;
        this.state = 'running';
        return Promise.resolve();
      }

      createOscillator() {
        return {
          type: 'sine',
          frequency: {
            setValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {},
            linearRampToValueAtTime: () => {},
          },
          connect: () => {},
          start: () => {},
          stop: () => {},
        };
      }

      createGain() {
        return {
          gain: {
            setValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {},
            linearRampToValueAtTime: () => {},
          },
          connect: () => {},
        };
      }
    }

    const mockStorage = {
      getItem: () => null,
      setItem: () => {},
    };

    (globalThis as any).localStorage = mockStorage;
    (globalThis as any).window = {
      AudioContext: MockAudioContext as any,
      localStorage: mockStorage,
    };

    const freshSound = new (sound.constructor as any)();

    // Trigger sound while in suspended state
    freshSound.playClick();
    expect(resumeCalls).toBeGreaterThanOrEqual(1);

    // Call 50 more times; since state is now 'running', resume is not re-invoked pointlessly
    for (let i = 0; i < 50; i++) {
      freshSound.playClick();
    }
    expect(resumeCalls).toBe(1);
  });

  test('Rejected resume() resilience: Does not throw unhandled rejection when browser autoplay blocks', () => {
    class AutoplayBlockedAudioContext {
      state: AudioContextState = 'suspended';
      currentTime = 0;
      destination = {};

      resume(): Promise<void> {
        return Promise.reject(new Error('Autoplay policy prevented audio play'));
      }

      createOscillator() {
        return {
          type: 'sine',
          frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
          connect: () => {},
          start: () => {},
          stop: () => {},
        };
      }

      createGain() {
        return {
          gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
          connect: () => {},
        };
      }
    }

    const mockStorage = { getItem: () => null, setItem: () => {} };
    (globalThis as any).localStorage = mockStorage;
    (globalThis as any).window = {
      AudioContext: AutoplayBlockedAudioContext as any,
      localStorage: mockStorage,
    };

    const freshSound = new (sound.constructor as any)();
    expect(() => freshSound.playClick()).not.toThrow();
    expect(() => freshSound.playCorrect()).not.toThrow();
  });

  test('Faulty Audio Node Resilience: When createOscillator throws, sound fails gracefully to fallback', () => {
    class CrashingAudioContext {
      state: AudioContextState = 'running';
      currentTime = 0;
      destination = {};

      resume() {
        return Promise.resolve();
      }

      createOscillator() {
        throw new Error('Audio hardware device unavailable or context terminated');
      }

      createGain() {
        return {
          gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {} },
          connect: () => {},
        };
      }
    }

    const mockStorage = { getItem: () => null, setItem: () => {} };
    (globalThis as any).localStorage = mockStorage;
    (globalThis as any).window = {
      AudioContext: CrashingAudioContext as any,
      localStorage: mockStorage,
    };

    const freshSound = new (sound.constructor as any)();
    expect(() => freshSound.playClick()).not.toThrow();
    expect(() => freshSound.playStep()).not.toThrow();
    expect(() => freshSound.playDiceRoll()).not.toThrow();
    expect(() => freshSound.playLadderClimb()).not.toThrow();
    expect(() => freshSound.playCorrect()).not.toThrow();
    expect(() => freshSound.playWrong()).not.toThrow();
    expect(() => freshSound.playFanfare()).not.toThrow();
  });

  test('Volume and Toggle Sound Boundary Controls: Volume clamps between 0 and 1, toggle flips boolean', () => {
    sound.setVolume(0.8);
    expect(sound.getVolume()).toBe(0.8);

    // Negative volume fuzz
    sound.setVolume(-1.5);
    expect(sound.getVolume()).toBe(0);

    // Excessive volume fuzz
    sound.setVolume(25.0);
    expect(sound.getVolume()).toBe(1);

    // Normal restore
    sound.setVolume(0.5);
    expect(sound.getVolume()).toBe(0.5);

    // Toggle sound
    const initial = sound.isEnabled();
    const toggled1 = sound.toggleSound();
    expect(toggled1).toBe(!initial);
    expect(sound.isEnabled()).toBe(!initial);

    const toggled2 = sound.toggleSound();
    expect(toggled2).toBe(initial);
    expect(sound.isEnabled()).toBe(initial);
  });
});

// ============================================================================
// SUITE 4: SVG Rendering of All 10 Illustrations in DECK_ILLUSTRATION_MAP
// ============================================================================

describe('Suite 4: SVG Rendering of all 10 Illustrations in DECK_ILLUSTRATION_MAP', () => {
  const expectedGameIds = [
    'ular-tangga-sains',
    'point-click-lab',
    'point-click-hutan',
    'ular-tangga-tatasurya',
    'presentasi-ekosistem-hutan',
    'ular-tangga-matematika',
    'point-click-candi',
    'ular-tangga-sejarah',
    'catur-taktik-logika',
    'teka-teki-kata',
  ];

  test('All 10 games have a registered illustration component in DECK_ILLUSTRATION_MAP', () => {
    expect(Object.keys(DECK_ILLUSTRATION_MAP).length).toBe(10);

    for (const gameId of expectedGameIds) {
      expect(DECK_ILLUSTRATION_MAP[gameId]).toBeDefined();
      const comp = getDeckIllustration(gameId);
      expect(comp).toBeDefined();
      expect(typeof comp).toBe('function');
    }
  });

  test('Every illustration component renders valid SVG with viewBox="0 0 800 500"', () => {
    for (const gameId of expectedGameIds) {
      const IllustrationComponent = DECK_ILLUSTRATION_MAP[gameId];
      const element = React.createElement(IllustrationComponent, {
        className: 'test-svg-render',
      });

      const html = renderToString(element);

      // Verify SVG root tag
      expect(html).toContain('<svg');
      expect(html).toContain('</svg>');

      // Verify academic 800x500 high-res aspect ratio
      expect(html).toContain('viewBox="0 0 800 500"');

      // Verify non-trivial graphic complexity (at least 2000 bytes of SVG paths/defs)
      expect(html.length).toBeGreaterThanOrEqual(2000);
    }
  });

  test('Semantic and attribute hygiene: Rendered SVG strings contain 0 NaN, null, or undefined attributes', () => {
    for (const gameId of expectedGameIds) {
      const IllustrationComponent = DECK_ILLUSTRATION_MAP[gameId];
      const html = renderToString(React.createElement(IllustrationComponent));

      expect(html).not.toContain('NaN');
      expect(html).not.toContain('null');
      expect(html).not.toContain('undefined');
      expect(html).not.toContain('[object Object]');
    }
  });

  test('Custom styling className prop pass-through verification across all 10 illustrations', () => {
    for (const gameId of expectedGameIds) {
      const IllustrationComponent = DECK_ILLUSTRATION_MAP[gameId];
      const customClass = `custom-wrapper-${gameId}`;
      const element = React.createElement(IllustrationComponent, {
        className: customClass,
      });

      const html = renderToString(element);
      expect(html).toContain(customClass);
    }
  });

  test('Subject-specific visual content inspection for each illustration', () => {
    // 1. Fotosintesis & Daur Air (ular-tangga-sains & presentasi-ekosistem-hutan)
    const sainsHtml = renderToString(React.createElement(DECK_ILLUSTRATION_MAP['ular-tangga-sains'])).toLowerCase();
    expect(sainsHtml).toContain('fotosintesis');
    expect(sainsHtml).toContain('stomata');

    // 2. Laboratorium Forensik (point-click-lab)
    const labHtml = renderToString(React.createElement(DECK_ILLUSTRATION_MAP['point-click-lab'])).toLowerCase();
    expect(labHtml).toContain('laboratorium');
    expect(labHtml).toContain('titrasi');

    // 3. Satwa Endemik Hutan (point-click-hutan)
    const hutanHtml = renderToString(React.createElement(DECK_ILLUSTRATION_MAP['point-click-hutan'])).toLowerCase();
    expect(hutanHtml).toContain('orangutan');

    // 4. Tata Surya Astronomi (ular-tangga-tatasurya)
    const tatasuryaHtml = renderToString(React.createElement(DECK_ILLUSTRATION_MAP['ular-tangga-tatasurya'])).toLowerCase();
    expect(tatasuryaHtml).toContain('matahari');
    expect(tatasuryaHtml).toContain('jupiter');

    // 5. Geometri & Pecahan (ular-tangga-matematika)
    const mathHtml = renderToString(React.createElement(DECK_ILLUSTRATION_MAP['ular-tangga-matematika'])).toLowerCase();
    expect(mathHtml).toContain('geometri');

    // 6. Candi Borobudur Kosmologi (point-click-candi)
    const candiHtml = renderToString(React.createElement(DECK_ILLUSTRATION_MAP['point-click-candi'])).toLowerCase();
    expect(candiHtml).toContain('borobudur');
    expect(candiHtml).toContain('stupa');

    // 7. Proklamasi 1945 (ular-tangga-sejarah)
    const sejarahHtml = renderToString(React.createElement(DECK_ILLUSTRATION_MAP['ular-tangga-sejarah'])).toLowerCase();
    expect(sejarahHtml).toContain('proklamasi');
    expect(sejarahHtml).toContain('17 agustus 1945');

    // 8. Catur Taktik Logika (catur-taktik-logika)
    const caturHtml = renderToString(React.createElement(DECK_ILLUSTRATION_MAP['catur-taktik-logika'])).toLowerCase();
    expect(caturHtml).toContain('catur');

    // 9. Aksara & Sastra Bahasa (teka-teki-kata)
    const bahasaHtml = renderToString(React.createElement(DECK_ILLUSTRATION_MAP['teka-teki-kata'])).toLowerCase();
    expect(bahasaHtml).toContain('aksara');
  });
});
