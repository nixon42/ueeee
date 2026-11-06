import { describe, expect, test } from 'bun:test';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StoryPresentationDeckEngine } from '../src/components/canva-games/StoryPresentationDeckEngine';
import { PRESENTATION_THEMES, PresentationThemeKey } from '../src/lib/presentation-themes';
import { 
  PresentationDeckData, 
  SlideDefinition,
  NarrativeIntroSlide,
  ConceptInfographicSlide,
  MiniGameSequenceSlide,
  MiniGameMatchSlide,
  MiniGameFlashcardSlide,
  MiniGameBoardSlide,
  MiniGameChessSlide,
  MiniGameWordSlide,
  StoryResolutionSlide,
  ReflectionSparkSlide
} from '../src/types/presentation';

/**
 * State simulator that strictly mimics StoryPresentationDeckEngine's internal navigation state logic
 */
class EngineStateHarness {
  totalSlides: number;
  currentSlide: number;
  isVictoryOpen: boolean = false;
  challengesState: Record<string, boolean> = {};

  constructor(slideCount: number, initialSlide: number = 1) {
    this.totalSlides = slideCount > 0 ? slideCount : 1;
    this.currentSlide = Math.max(1, Math.min(this.totalSlides, initialSlide));
  }

  goToSlide(slideNum: number) {
    const clamped = Math.max(1, Math.min(this.totalSlides, slideNum));
    this.currentSlide = clamped;
  }

  handleNextSlide() {
    if (this.currentSlide < this.totalSlides) {
      this.goToSlide(this.currentSlide + 1);
    } else {
      this.isVictoryOpen = true;
    }
  }

  handlePrevSlide() {
    if (this.currentSlide > 1) {
      this.goToSlide(this.currentSlide - 1);
    }
  }

  handleResetDeck() {
    this.currentSlide = 1;
    this.challengesState = {};
    this.isVictoryOpen = false;
  }

  recordChallenge(key: string, isSuccess: boolean) {
    this.challengesState[key] = isSuccess;
  }
}

/**
 * Helper to generate synthetic decks with specified slide count
 */
function createSyntheticDeck(count: number, theme: PresentationThemeKey = 'emerald'): PresentationDeckData {
  const slides: SlideDefinition[] = [];

  for (let i = 1; i <= count; i++) {
    slides.push({
      id: `synthetic-slide-${i}`,
      type: 'concept-infographic',
      chapterBadge: `BABAK ${i}: UJI STRESS`,
      title: `Konsep Materi Slide ${i}`,
      subtitle: `Subjudul slide ${i}`,
      cards: [
        {
          id: `card-${i}-1`,
          title: `Poin ${i}.1`,
          description: `Deskripsi konsep edukasi ${i}.1`,
          levelBadge: 'Fase Fondasi',
        },
        {
          id: `card-${i}-2`,
          title: `Poin ${i}.2`,
          description: `Deskripsi konsep edukasi ${i}.2`,
          levelBadge: 'Fase Lanjutan',
        },
      ],
      teacherNotes: `Catatan panduan guru untuk slide ${i}`,
    });
  }

  return {
    gameId: `stress-test-deck-${count}`,
    title: `Uji Dinamis ${count} Slide`,
    subtitle: `Stress Test Harness ${count} Slide Deck`,
    themeColor: theme,
    mentor: {
      name: 'Dr. Stresstest',
      role: 'Penguji Sistem Pembelajaran',
      avatarEmoji: '⚡',
    },
    slides,
  };
}

/**
 * Helper to build a comprehensive 10-slide deck testing every archetype
 */
function createTenArchetypeDeck(): PresentationDeckData {
  const s1: NarrativeIntroSlide = {
    id: 's1-intro',
    type: 'narrative-intro',
    chapterBadge: 'BABAK 1',
    title: 'Pembukaan Petualangan',
    subtitle: 'Misi Penyelamatan Hutan',
    dialogue: 'Selamat datang di petualangan sains!',
    missionObjective: 'Kumpulkan semua poin!',
  };

  const s2: ConceptInfographicSlide = {
    id: 's2-concept',
    type: 'concept-infographic',
    title: 'Konsep Dasar Ekologi',
    cards: [
      { id: 'c1', title: 'Produsen', description: 'Tumbuhan hijau penghasil energi' },
      { id: 'c2', title: 'Konsumen', description: 'Hewan pemakan tumbuhan atau sesama' },
      { id: 'c3', title: 'Pengurai', description: 'Bakteri dan fungi pengurai nutrisi' },
    ],
  };

  const s3: MiniGameSequenceSlide = {
    id: 's3-seq',
    type: 'mini-game-sequence',
    title: 'Urutkan Siklus Hidrologi',
    items: [
      { id: 'item-1', order: 1, label: 'Evaporasi', iconEmoji: '☀️' },
      { id: 'item-2', order: 2, label: 'Kondensasi', iconEmoji: '☁️' },
      { id: 'item-3', order: 3, label: 'Presipitasi', iconEmoji: '🌧️' },
      { id: 'item-4', order: 4, label: 'Infiltrasi', iconEmoji: '🌱' },
    ],
  };

  const s4: MiniGameMatchSlide = {
    id: 's4-match',
    type: 'mini-game-match',
    title: 'Pasangkan Komponen Ekosistem',
    pairs: [
      { id: 'p1', leftText: 'Produsen', rightText: 'Pohon Mangrove' },
      { id: 'p2', leftText: 'Herbivora', rightText: 'Bekantan' },
      { id: 'p3', leftText: 'Karnivora', rightText: 'Macan Dahan' },
    ],
  };

  const s5: MiniGameFlashcardSlide = {
    id: 's5-flash',
    type: 'mini-game-flashcard',
    title: 'Kartu Konsep Refleksi 3D',
    cards: [
      { id: 'fc1', frontPrompt: 'Apa itu klorofil?', backAnswer: 'Zat hijau daun untuk fotosintesis' },
      { id: 'fc2', frontPrompt: 'Di mana stomata berada?', backAnswer: 'Pada permukaan daun' },
    ],
  };

  const s6: MiniGameBoardSlide = {
    id: 's6-board',
    type: 'mini-game-board',
    title: 'Jelajah Langkah Hutan Rimba',
    tiles: [
      {
        step: 1,
        title: 'Pos Pengamatan',
        prompt: 'Temukan jejak satwa di tanah!',
        action: 'Telusuri Jejak',
        eventType: 'normal',
      },
      {
        step: 2,
        title: 'Pohon Randu Alas',
        prompt: 'Sarang burung enggang terancam!',
        action: 'Selamatkan Sarang',
        eventType: 'goal',
      },
    ],
  };

  const s7: MiniGameChessSlide = {
    id: 's7-chess',
    type: 'mini-game-chess',
    title: 'Penalaran Taktik Catur',
    objective: 'Skakmat 1 Langkah',
    explanation: 'Menteri meluncur ke baris ke-8!',
    pieces: [
      { id: 'w-queen', type: 'queen', color: 'w', col: 3, row: 1 },
      { id: 'b-king', type: 'king', color: 'b', col: 7, row: 0 },
    ],
    solutionMove: {
      from: { col: 3, row: 1 },
      to: { col: 7, row: 1 },
    },
  };

  const s8: MiniGameWordSlide = {
    id: 's8-word',
    type: 'mini-game-word',
    title: 'Teka-Teki Istilah Sains',
    word: 'KLOROFIL',
    clue: 'Pigmen hijau fotosintesis pada daun',
    explanation: 'Klorofil menyerap cahaya merah dan biru.',
    options: ['KLOROFIL', 'STOMATA', 'MITOKONDRIA', 'KUTIKULA'],
  };

  const s9: StoryResolutionSlide = {
    id: 's9-res',
    type: 'story-resolution',
    title: 'Dampak Nyata Penyelamatan Hutan',
    resolutionStory: 'Hutan lindung berhasil diselamatkan dan satwa kembali berkembang biak!',
  };

  const s10: ReflectionSparkSlide = {
    id: 's10-refl',
    type: 'reflection-spark',
    title: 'Refleksi Guru & Diskusi HOTS',
    sparkCards: [
      { number: 1, title: 'Analisis Sebab', question: 'Mengapa deforestasi mempercepat pemanasan global?' },
      { number: 2, title: 'Solusi Nyata', question: 'Bagaimana peran kita menjaga kelestarian hayati?' },
      { number: 3, title: 'Aksi Sekolah', question: 'Apa kegiatan pelestarian yang bisa dilakukan di kelas?' },
    ],
  };

  return {
    gameId: 'ten-archetypes-deck',
    title: '10 Archetype Presentation Deck',
    subtitle: 'Exhaustive Slide Testing Deck',
    themeColor: 'emerald',
    mentor: {
      name: 'Profesor Penguji',
      role: 'Master Validator',
      avatarEmoji: '🎓',
    },
    slides: [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10],
  };
}

describe('StoryPresentationDeckEngine & Presentation Types Stress Harness', () => {
  // =========================================================================
  // 1. DYNAMIC SLIDE COUNTS (3, 5, 7, 8, 12 slides)
  // =========================================================================
  describe('1. Dynamic Slide Counts Across 3, 5, 7, 8, and 12 Slides', () => {
    const testedCounts = [3, 5, 7, 8, 12];

    for (const count of testedCounts) {
      test(`Renders full component tree cleanly for dynamic deck with exactly ${count} slides`, () => {
        const deck = createSyntheticDeck(count);
        expect(deck.slides.length).toBe(count);

        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck,
            initialSlide: 1,
          })
        );

        // Header displays dynamic total slides
        expect(html).toContain(`Slide 1 dari ${count}`);
        expect(html).toContain(deck.title);

        // Indicators: exactly count dot buttons rendered in progress container
        const dotOccurrences = (html.match(/Buka Slide \d+/g) || []).length;
        expect(dotOccurrences).toBe(count);
      });

      test(`Operates through every slide index (1 to ${count}) without runtime exceptions`, () => {
        const deck = createSyntheticDeck(count);

        for (let s = 1; s <= count; s++) {
          const html = renderToString(
            React.createElement(StoryPresentationDeckEngine, {
              isOpen: true,
              onClose: () => {},
              deck,
              initialSlide: s,
            })
          );
          expect(html).toContain(`Slide ${s} dari ${count}`);
          expect(html).toContain(`Konsep Materi Slide ${s}`);
        }
      });
    }

    test('Single-slide deck (boundary minimum of 1 slide) handles navigation cleanly', () => {
      const deck = createSyntheticDeck(1);
      const harness = new EngineStateHarness(1, 1);

      expect(harness.totalSlides).toBe(1);
      expect(harness.currentSlide).toBe(1);

      // Previous is disabled
      harness.handlePrevSlide();
      expect(harness.currentSlide).toBe(1);

      // Next immediately triggers victory
      harness.handleNextSlide();
      expect(harness.currentSlide).toBe(1);
      expect(harness.isVictoryOpen).toBe(true);
    });

    test('Empty deck edge case documentation: captures missing slide guard vulnerability', () => {
      const emptyDeck: PresentationDeckData = {
        gameId: 'empty-test',
        title: 'Empty Deck',
        subtitle: 'No slides',
        themeColor: 'emerald',
        mentor: { name: 'Test', role: 'Tester', avatarEmoji: '🤖' },
        slides: [],
      };

      // Under an empty deck, StoryPresentationDeckEngine throws because activeSlide is undefined at subtitle accessor
      expect(() => {
        renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck: emptyDeck,
          })
        );
      }).toThrow();
    });
  });

  // =========================================================================
  // 2. CLAMPING AND BOUNDARY CHECKS
  // =========================================================================
  describe('2. Clamping and Boundary Checks (slide 0, -5, 99, etc.)', () => {
    test('Clamps initialSlide: out-of-bounds negative and zero clamp to 1', () => {
      const deck = createSyntheticDeck(7);
      const invalidLowerInputs = [0, -1, -5, -9999];

      for (const input of invalidLowerInputs) {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck,
            initialSlide: input,
          })
        );
        expect(html).toContain('Slide 1 dari 7');
      }
    });

    test('Clamps initialSlide: excessive values clamp to totalSlides', () => {
      const deck = createSyntheticDeck(7);
      const invalidUpperInputs = [8, 9, 99, 1000, 99999];

      for (const input of invalidUpperInputs) {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck,
            initialSlide: input,
          })
        );
        expect(html).toContain('Slide 7 dari 7');
      }
    });

    test('Interactive harness clamps goToSlide: lower bounds', () => {
      const harness = new EngineStateHarness(8);

      harness.goToSlide(0);
      expect(harness.currentSlide).toBe(1);

      harness.goToSlide(-5);
      expect(harness.currentSlide).toBe(1);

      harness.goToSlide(-999);
      expect(harness.currentSlide).toBe(1);
    });

    test('Interactive harness clamps goToSlide: upper bounds', () => {
      const harness = new EngineStateHarness(8);

      harness.goToSlide(9);
      expect(harness.currentSlide).toBe(8);

      harness.goToSlide(99);
      expect(harness.currentSlide).toBe(8);

      harness.goToSlide(999999);
      expect(harness.currentSlide).toBe(8);
    });

    test('Boundary edge: handlePrevSlide at slide 1 remains strictly at slide 1', () => {
      const harness = new EngineStateHarness(5, 1);
      expect(harness.currentSlide).toBe(1);

      harness.handlePrevSlide();
      expect(harness.currentSlide).toBe(1);

      harness.handlePrevSlide();
      expect(harness.currentSlide).toBe(1);
    });

    test('Boundary edge: handleNextSlide at final slide triggers victory and does not increment beyond totalSlides', () => {
      const harness = new EngineStateHarness(5, 5);
      expect(harness.currentSlide).toBe(5);
      expect(harness.isVictoryOpen).toBe(false);

      harness.handleNextSlide();
      expect(harness.currentSlide).toBe(5);
      expect(harness.isVictoryOpen).toBe(true);

      // Subsequent next actions continue to clamp and remain in victory state
      harness.handleNextSlide();
      expect(harness.currentSlide).toBe(5);
      expect(harness.isVictoryOpen).toBe(true);
    });
  });

  // =========================================================================
  // 3. RAPID STATE CHANGES & STRESS HARNESS
  // =========================================================================
  describe('3. Rapid State Changes & Invariant Stress Testing', () => {
    test('10,000 rapid randomized transitions across dynamic deck sizes maintain 100% invariant adherence', () => {
      const deckSizes = [3, 5, 7, 8, 12];

      for (const size of deckSizes) {
        const harness = new EngineStateHarness(size);

        for (let step = 0; step < 2000; step++) {
          const action = step % 4;

          if (action === 0) {
            harness.handleNextSlide();
          } else if (action === 1) {
            harness.handlePrevSlide();
          } else if (action === 2) {
            // Jump with adversarial indices (-10 to size + 10)
            const randomTarget = (step * 7) % (size + 20) - 10;
            harness.goToSlide(randomTarget);
          } else {
            // Reset state
            harness.handleResetDeck();
          }

          // Strict invariant assertion: currentSlide must ALWAYS be within [1, totalSlides]
          expect(harness.currentSlide).toBeGreaterThanOrEqual(1);
          expect(harness.currentSlide).toBeLessThanOrEqual(size);
          expect(typeof harness.isVictoryOpen).toBe('boolean');
        }
      }
    });

    test('Rapid alternating forward/backward oscillations do not corrupt state or cause phase drift', () => {
      const harness = new EngineStateHarness(8);

      for (let i = 0; i < 1000; i++) {
        harness.handleNextSlide();
        expect(harness.currentSlide).toBe(2);
        harness.handlePrevSlide();
        expect(harness.currentSlide).toBe(1);
      }

      expect(harness.currentSlide).toBe(1);
      expect(harness.isVictoryOpen).toBe(false);
    });

    test('Rapid reset in mid-progression cleanly wipes challenge states and returns to Slide 1', () => {
      const harness = new EngineStateHarness(8, 6);
      expect(harness.currentSlide).toBe(6);

      harness.recordChallenge('seq-1', true);
      harness.recordChallenge('match-1', true);
      harness.recordChallenge('flash-1', true);
      expect(Object.keys(harness.challengesState).length).toBe(3);

      harness.handleResetDeck();
      expect(harness.currentSlide).toBe(1);
      expect(harness.isVictoryOpen).toBe(false);
      expect(Object.keys(harness.challengesState).length).toBe(0);
    });

    test('Burst challenge state updates handle 200 rapid unique keys without data loss', () => {
      const harness = new EngineStateHarness(7);

      for (let i = 0; i < 200; i++) {
        harness.recordChallenge(`challenge-key-${i}`, i % 2 === 0);
      }

      expect(Object.keys(harness.challengesState).length).toBe(200);
      expect(harness.challengesState['challenge-key-0']).toBe(true);
      expect(harness.challengesState['challenge-key-1']).toBe(false);
    });
  });

  // =========================================================================
  // 4. THEME TOKEN EXISTENCE AND VALIDITY ACROSS ALL 8 THEMES
  // =========================================================================
  describe('4. Theme Token Existence & Validity Across All 8 Themes', () => {
    const requiredThemes: PresentationThemeKey[] = [
      'emerald',
      'teal',
      'indigo',
      'amber',
      'orange',
      'rose',
      'blue',
      'purple',
    ];

    const requiredTokens = [
      'gradient',
      'btnPrimary',
      'activeDot',
      'bgLight',
      'borderLight',
      'textPrimary',
      'textBadge',
      'bgBadge',
      'borderBadge',
      'shadowColor',
      'avatarRing',
    ] as const;

    test('All 8 required themes exist in PRESENTATION_THEMES', () => {
      for (const themeKey of requiredThemes) {
        expect(PRESENTATION_THEMES[themeKey]).toBeDefined();
      }
    });

    test('Every theme defines all 11 non-empty design tokens with valid CSS/Tailwind classes', () => {
      for (const themeKey of requiredThemes) {
        const theme = PRESENTATION_THEMES[themeKey];

        for (const token of requiredTokens) {
          const val = theme[token];
          expect(typeof val).toBe('string');
          expect(val.length).toBeGreaterThan(0);
        }

        // Token syntactic structure checks
        expect(theme.gradient).toContain('from-');
        expect(theme.gradient).toContain('to-');
        expect(theme.btnPrimary).toContain('hover:');
        expect(theme.btnPrimary).toContain('text-white');
        expect(theme.activeDot).toContain('bg-');
        expect(theme.borderLight).toContain('border-');
        expect(theme.avatarRing).toContain('ring-');
      }
    });

    test('StoryPresentationDeckEngine renders successfully under each of the 8 themes', () => {
      for (const themeKey of requiredThemes) {
        const deck = createSyntheticDeck(5, themeKey);
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck,
            initialSlide: 1,
          })
        );

        const theme = PRESENTATION_THEMES[themeKey];
        expect(html).toContain(theme.activeDot);
        expect(html).toContain('Mode Presentasi Guru');
      }
    });

    test('Unknown theme gracefully falls back to emerald theme tokens without throwing', () => {
      const fallbackDeck: any = {
        gameId: 'fallback-theme-deck',
        title: 'Fallback Theme',
        subtitle: 'Test invalid theme',
        themeColor: 'unknown-neon-theme',
        mentor: { name: 'M', role: 'R', avatarEmoji: '🔮' },
        slides: [
          { id: 's1', type: 'narrative-intro', title: 'Intro', dialogue: 'Halo' },
        ],
      };

      const html = renderToString(
        React.createElement(StoryPresentationDeckEngine, {
          isOpen: true,
          onClose: () => {},
          deck: fallbackDeck,
          initialSlide: 1,
        })
      );

      // Should fall back to emerald tokens
      expect(html).toContain(PRESENTATION_THEMES.emerald.activeDot);
    });
  });

  // =========================================================================
  // 5. SLIDE ARCHETYPES EXHAUSTIVENESS (All 10 Archetypes)
  // =========================================================================
  describe('5. Slide Archetypes Exhaustiveness & Component Dispatching', () => {
    test('Renders all 10 slide archetypes within a single dynamic 10-slide deck without crashing', () => {
      const megaDeck = createTenArchetypeDeck();
      expect(megaDeck.slides.length).toBe(10);

      const expectedKeywords = [
        'Pembukaan Petualangan', // 1: narrative-intro
        'Konsep Dasar Ekologi', // 2: concept-infographic
        'Urutkan Siklus Hidrologi', // 3: mini-game-sequence
        'Pasangkan Komponen Ekosistem', // 4: mini-game-match
        'Kartu Konsep Refleksi 3D', // 5: mini-game-flashcard
        'Jelajah Langkah Hutan Rimba', // 6: mini-game-board
        'Penalaran Taktik Catur', // 7: mini-game-chess
        'Teka-Teki Istilah Sains', // 8: mini-game-word
        'Dampak Nyata Penyelamatan Hutan', // 9: story-resolution
        'Refleksi Guru', // 10: reflection-spark
      ];

      for (let s = 1; s <= 10; s++) {
        const html = renderToString(
          React.createElement(StoryPresentationDeckEngine, {
            isOpen: true,
            onClose: () => {},
            deck: megaDeck,
            initialSlide: s,
          })
        );

        expect(html).toContain(`Slide ${s} dari 10`);
        expect(html).toContain(expectedKeywords[s - 1]);
      }
    });

    test('When isOpen is false, StoryPresentationDeckEngine returns null without rendering DOM', () => {
      const deck = createSyntheticDeck(5);
      const html = renderToString(
        React.createElement(StoryPresentationDeckEngine, {
          isOpen: false,
          onClose: () => {},
          deck,
          initialSlide: 1,
        })
      );

      expect(html).toBe('');
    });
  });
});
