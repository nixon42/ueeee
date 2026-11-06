import { describe, expect, test } from 'bun:test';
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
import {
  GeometriPecahanIllustration,
  BorobudurKosmologiIllustration,
  Proklamasi1945Illustration,
  CaturTaktikLogikaIllustration,
} from '../src/components/visuals/HumanitiesSvgIllustrations';
import { AUTHORITATIVE_GAMES_SPEC } from './e2e/e2e-fixtures';
import { SlideDefinition, SlideType } from '../src/types/presentation';

describe('Milestone 3: Humanities, Math, History, Language & Logic Decks Verification', () => {
  const EXPECTED_HUMANITIES_GAME_IDS = [
    'ular-tangga-matematika',
    'point-click-candi',
    'teka-teki-kata',
    'ular-tangga-sejarah',
    'catur-taktik-logika',
  ] as const;

  // ==========================================================================
  // 1. REGISTRY & LOOKUP INTEGRITY
  // ==========================================================================
  describe('Deck Registry & Lookup Integrity', () => {
    test('HUMANITIES_PRESENTATION_DECKS contains all 5 required humanities games', () => {
      const keys = Object.keys(HUMANITIES_PRESENTATION_DECKS);
      expect(keys.length).toBe(5);
      for (const gameId of EXPECTED_HUMANITIES_GAME_IDS) {
        expect(HUMANITIES_PRESENTATION_DECKS[gameId]).toBeDefined();
        expect(HUMANITIES_PRESENTATION_DECKS[gameId].gameId).toBe(gameId);
      }
    });

    test('ALL_PRESENTATION_DECKS contains all 10 games (5 science + 5 humanities)', () => {
      const keys = Object.keys(ALL_PRESENTATION_DECKS);
      expect(keys.length).toBe(10);
      for (const gameId of EXPECTED_HUMANITIES_GAME_IDS) {
        expect(ALL_PRESENTATION_DECKS[gameId]).toBeDefined();
        expect(ALL_PRESENTATION_DECKS[gameId].gameId).toBe(gameId);
      }
    });

    test('getPresentationDeckByGameId retrieves each humanities deck accurately', () => {
      for (const gameId of EXPECTED_HUMANITIES_GAME_IDS) {
        const deck = getPresentationDeckByGameId(gameId);
        expect(deck).toBeDefined();
        expect(deck?.gameId).toBe(gameId);
      }
      expect(getPresentationDeckByGameId('non-existent-deck-id')).toBeUndefined();
    });
  });

  // ==========================================================================
  // 2. DYNAMIC SLIDE COUNTS (NOT LOCKED TO 6)
  // ==========================================================================
  describe('Dynamic Slide Counts (Not Locked to 6 Slides)', () => {
    test('Humanities decks have dynamic slide counts of 7 and 8 slides', () => {
      expect(ULAR_TANGGA_MATEMATIKA_DECK.slides.length).toBe(7);
      expect(ULAR_TANGGA_MATEMATIKA_DECK.totalSlides).toBe(7);

      expect(POINT_CLICK_CANDI_DECK.slides.length).toBe(8);
      expect(POINT_CLICK_CANDI_DECK.totalSlides).toBe(8);

      expect(TEKA_TEKI_KATA_DECK.slides.length).toBe(7);
      expect(TEKA_TEKI_KATA_DECK.totalSlides).toBe(7);

      expect(ULAR_TANGGA_SEJARAH_DECK.slides.length).toBe(8);
      expect(ULAR_TANGGA_SEJARAH_DECK.totalSlides).toBe(8);

      expect(CATUR_TAKTIK_LOGIKA_DECK.slides.length).toBe(7);
      expect(CATUR_TAKTIK_LOGIKA_DECK.totalSlides).toBe(7);
    });

    test('Zero humanities decks are restricted to legacy 6 slides', () => {
      const slideCounts = EXPECTED_HUMANITIES_GAME_IDS.map(
        id => HUMANITIES_PRESENTATION_DECKS[id].slides.length
      );
      expect(slideCounts.includes(6)).toBe(false);
      const uniqueCounts = new Set(slideCounts);
      expect(uniqueCounts.size).toBeGreaterThanOrEqual(2);
      expect(uniqueCounts.has(7)).toBe(true);
      expect(uniqueCounts.has(8)).toBe(true);
    });
  });

  // ==========================================================================
  // 3. 5-PHASE PEDAGOGICAL NARRATIVE ARC
  // ==========================================================================
  describe('5-Phase Pedagogical Narrative Arc Compliance', () => {
    const allDecks = [
      ULAR_TANGGA_MATEMATIKA_DECK,
      POINT_CLICK_CANDI_DECK,
      TEKA_TEKI_KATA_DECK,
      ULAR_TANGGA_SEJARAH_DECK,
      CATUR_TAKTIK_LOGIKA_DECK,
    ];

    test('Every deck starts with Phase 1: narrative-intro slide with dialogue and missionObjective', () => {
      for (const deck of allDecks) {
        const slide1 = deck.slides[0];
        expect(slide1.type).toBe('narrative-intro');
        if (slide1.type === 'narrative-intro') {
          expect(slide1.dialogue.length).toBeGreaterThan(50);
          expect(slide1.missionObjective).toBeDefined();
          expect(slide1.missionObjective?.length).toBeGreaterThan(10);
          expect(slide1.chapterBadge).toBeDefined();
        }
      }
    });

    test('Every deck contains Phase 2: bite-sized concept-infographic slides with speaker notes', () => {
      for (const deck of allDecks) {
        const conceptSlides = deck.slides.filter(s => s.type === 'concept-infographic');
        expect(conceptSlides.length).toBeGreaterThanOrEqual(2);
        for (const cs of conceptSlides) {
          if (cs.type === 'concept-infographic') {
            expect(cs.cards.length).toBeGreaterThanOrEqual(2);
            expect(cs.teacherNotes).toBeDefined();
            expect(cs.teacherNotes?.length).toBeGreaterThan(15);
            for (const card of cs.cards) {
              expect(card.id).toBeDefined();
              expect(card.title.length).toBeGreaterThan(2);
              expect(card.description.length).toBeGreaterThan(10);
            }
          }
        }
      }
    });

    test('Every deck embeds Phase 3: authentic interactive mini-games (sequence, match, flashcards)', () => {
      const allowedMiniGameTypes: SlideType[] = [
        'mini-game-sequence',
        'mini-game-match',
        'mini-game-flashcard',
        'mini-game-chess',
        'mini-game-word',
        'mini-game-board',
      ];

      for (const deck of allDecks) {
        const miniGameSlides = deck.slides.filter(s => allowedMiniGameTypes.includes(s.type));
        expect(miniGameSlides.length).toBeGreaterThanOrEqual(2);
      }
    });

    test('Every deck has Phase 4: story-resolution slide with tangible real-world impact', () => {
      for (const deck of allDecks) {
        const resolutionSlide = deck.slides[deck.slides.length - 2];
        expect(resolutionSlide.type).toBe('story-resolution');
        if (resolutionSlide.type === 'story-resolution') {
          expect(resolutionSlide.resolutionStory.length).toBeGreaterThan(50);
          expect(resolutionSlide.celebrationEmoji).toBeDefined();
          expect(resolutionSlide.achievementBadges).toBeDefined();
          expect(resolutionSlide.achievementBadges?.length).toBeGreaterThanOrEqual(2);
        }
      }
    });

    test('Every deck concludes with Phase 5: reflection-spark slide with exactly 3 HOTS questions', () => {
      for (const deck of allDecks) {
        const reflectionSlide = deck.slides[deck.slides.length - 1];
        expect(reflectionSlide.type).toBe('reflection-spark');
        if (reflectionSlide.type === 'reflection-spark') {
          expect(reflectionSlide.sparkCards.length).toBe(3);
          for (const card of reflectionSlide.sparkCards) {
            expect(card.number).toBeGreaterThanOrEqual(1);
            expect(card.number).toBeLessThanOrEqual(3);
            expect(card.question.length).toBeGreaterThan(20);
          }
        }
      }
    });
  });

  // ==========================================================================
  // 4. ALIGNMENT WITH AUTHORITATIVE E2E FIXTURES
  // ==========================================================================
  describe('Alignment with AUTHORITATIVE_GAMES_SPEC', () => {
    test('All 5 humanities decks match title, mentor, slide count, and resolution impact', () => {
      for (const gameId of EXPECTED_HUMANITIES_GAME_IDS) {
        const authoritative = AUTHORITATIVE_GAMES_SPEC[gameId];
        const deck = HUMANITIES_PRESENTATION_DECKS[gameId];

        expect(deck.title).toBe(authoritative.expectedTitle);
        expect(deck.mentor.name).toBe(authoritative.mentorName);
        expect(deck.mentor.role).toBe(authoritative.mentorRole);
        expect(deck.slides.length).toBe(authoritative.slideCount);
        expect(deck.totalSlides).toBe(authoritative.slideCount);

        const resolutionSlide = deck.slides.find(s => s.type === 'story-resolution');
        expect(resolutionSlide).toBeDefined();
        if (resolutionSlide?.type === 'story-resolution') {
          expect(resolutionSlide.resolutionStory).toContain(authoritative.resolutionImpact);
        }

        const reflectionSlide = deck.slides.find(s => s.type === 'reflection-spark');
        expect(reflectionSlide).toBeDefined();
        if (reflectionSlide?.type === 'reflection-spark') {
          expect(reflectionSlide.sparkCards.length).toBe(authoritative.reflectionHotsCount);
        }
      }
    });
  });

  // ==========================================================================
  // 5. DECK-SPECIFIC MINI-GAME DATA INTEGRITY
  // ==========================================================================
  describe('Deck-Specific Mini-Game Data Integrity', () => {
    test('Ular Tangga Matematika: FRACTION_DECIMAL_PAIRS and FRACTION_BLOCKS_SEQUENCE match specifications', () => {
      expect(FRACTION_DECIMAL_PAIRS.length).toBe(4);
      expect(FRACTION_DECIMAL_PAIRS.map(p => p.id)).toEqual(['f1', 'f2', 'f3', 'f4']);
      expect(FRACTION_DECIMAL_PAIRS[0]).toEqual({ id: 'f1', leftText: '1/2', rightText: '0.50' });
      expect(FRACTION_DECIMAL_PAIRS[1]).toEqual({ id: 'f2', leftText: '3/4', rightText: '0.75' });
      expect(FRACTION_DECIMAL_PAIRS[2]).toEqual({ id: 'f3', leftText: '2/5', rightText: '0.40' });
      expect(FRACTION_DECIMAL_PAIRS[3]).toEqual({ id: 'f4', leftText: '1/8', rightText: '0.125' });

      expect(FRACTION_BLOCKS_SEQUENCE.length).toBe(5);
      expect(FRACTION_BLOCKS_SEQUENCE.map(b => b.id)).toEqual(['b1', 'b2', 'b3', 'b4', 'b5']);
      expect(FRACTION_BLOCKS_SEQUENCE.every((b, idx) => b.order === idx + 1)).toBe(true);
      expect(FRACTION_BLOCKS_SEQUENCE[0].label).toBe('1/5 (0.20)');
      expect(FRACTION_BLOCKS_SEQUENCE[4].label).toBe('9/10 (0.90)');
    });

    test('Point & Click Candi: CANDI_STRATA_SEQUENCE, BOROBUDUR_RELIEF_PAIRS, and BOROBUDUR_FLASHCARDS match specifications', () => {
      expect(CANDI_STRATA_SEQUENCE.length).toBe(4);
      expect(CANDI_STRATA_SEQUENCE.map(s => s.id)).toEqual(['c1', 'c2', 'c3', 'c4']);
      expect(CANDI_STRATA_SEQUENCE.map(s => s.label)).toEqual(['Kamadhatu', 'Rupadhatu', 'Arupadhatu', 'Stupa Induk']);

      expect(BOROBUDUR_RELIEF_PAIRS.length).toBe(4);
      expect(BOROBUDUR_RELIEF_PAIRS.map(r => r.id)).toEqual(['r1', 'r2', 'r3', 'r4']);

      expect(BOROBUDUR_FLASHCARDS.length).toBe(2);
      expect(BOROBUDUR_FLASHCARDS[0].backAnswer).toBe('Gunadharma');
      expect(BOROBUDUR_FLASHCARDS[1].backAnswer).toBe('Pernikahan Politik & Toleransi Luhur');
    });

    test('Teka-Teki Kata: KBBI_BAKU_PAIRS and PANTUN_NASEHAT_SEQUENCE match specifications', () => {
      expect(KBBI_BAKU_PAIRS.length).toBe(5);
      expect(KBBI_BAKU_PAIRS.map(k => k.id)).toEqual(['k1', 'k2', 'k3', 'k4', 'k5']);
      expect(KBBI_BAKU_PAIRS[0]).toEqual({ id: 'k1', leftText: 'Apotik', rightText: 'Apotek' });
      expect(KBBI_BAKU_PAIRS[1]).toEqual({ id: 'k2', leftText: 'Ijin', rightText: 'Izin' });
      expect(KBBI_BAKU_PAIRS[2]).toEqual({ id: 'k3', leftText: 'Praktek', rightText: 'Praktik' });
      expect(KBBI_BAKU_PAIRS[3]).toEqual({ id: 'k4', leftText: 'Nasehat', rightText: 'Nasihat' });
      expect(KBBI_BAKU_PAIRS[4]).toEqual({ id: 'k5', leftText: 'Analisa', rightText: 'Analisis' });

      expect(PANTUN_NASEHAT_SEQUENCE.length).toBe(4);
      expect(PANTUN_NASEHAT_SEQUENCE.map(p => p.id)).toEqual(['pt1', 'pt2', 'pt3', 'pt4']);
      expect(PANTUN_NASEHAT_SEQUENCE.every((p, idx) => p.order === idx + 1)).toBe(true);
    });

    test('Ular Tangga Sejarah: PROKLAMASI_1945_SEQUENCE, PAHLAWAN_KEMERDEKAAN_PAIRS, and PROKLAMASI_FLASHCARDS match specifications', () => {
      expect(PROKLAMASI_1945_SEQUENCE.length).toBe(5);
      expect(PROKLAMASI_1945_SEQUENCE.map(p => p.id)).toEqual(['p1', 'p2', 'p3', 'p4', 'p5']);
      expect(PROKLAMASI_1945_SEQUENCE[0].label).toBe('Kekalahan Jepang');
      expect(PROKLAMASI_1945_SEQUENCE[4].label).toBe('Pembacaan Proklamasi');

      expect(PAHLAWAN_KEMERDEKAAN_PAIRS.length).toBe(4);
      expect(PAHLAWAN_KEMERDEKAAN_PAIRS.map(t => t.id)).toEqual(['t1', 't2', 't3', 't4']);
      expect(PAHLAWAN_KEMERDEKAAN_PAIRS[0].leftText).toBe('Sayuti Melik');
      expect(PAHLAWAN_KEMERDEKAAN_PAIRS[1].leftText).toBe('Ibu Fatmawati');
      expect(PAHLAWAN_KEMERDEKAAN_PAIRS[2].leftText).toBe('Frans & Alex Mendur');
      expect(PAHLAWAN_KEMERDEKAAN_PAIRS[3].leftText).toBe('BM Diah');

      expect(PROKLAMASI_FLASHCARDS.length).toBe(2);
      expect(PROKLAMASI_FLASHCARDS[0].id).toBe('pf-1');
      expect(PROKLAMASI_FLASHCARDS[1].id).toBe('pf-2');
    });

    test('Catur Taktik Logika: CHESS_TACTIC_PAIRS and CHESS_CHECKMATE_SEQUENCE match specifications', () => {
      expect(CHESS_TACTIC_PAIRS.length).toBe(4);
      expect(CHESS_TACTIC_PAIRS.map(t => t.id)).toEqual(['t1', 't2', 't3', 't4']);
      expect(CHESS_TACTIC_PAIRS[0]).toEqual({ id: 't1', leftText: 'Garpu (Fork)', rightText: 'Dua sasaran sekaligus' });
      expect(CHESS_TACTIC_PAIRS[1]).toEqual({ id: 't2', leftText: 'Kuncian (Pin)', rightText: 'Bidak terikat lindungi raja' });
      expect(CHESS_TACTIC_PAIRS[2]).toEqual({ id: 't3', leftText: 'Tusukan (Skewer)', rightText: 'Serang perwira depan' });
      expect(CHESS_TACTIC_PAIRS[3]).toEqual({ id: 't4', leftText: 'Skakmat Koridor', rightText: 'Baris belakang terperangkap' });

      expect(CHESS_CHECKMATE_SEQUENCE.length).toBe(4);
      expect(CHESS_CHECKMATE_SEQUENCE.map(ca => ca.id)).toEqual(['ca1', 'ca2', 'ca3', 'ca4']);
      expect(CHESS_CHECKMATE_SEQUENCE.every((ca, idx) => ca.order === idx + 1)).toBe(true);
    });
  });

  // ==========================================================================
  // 6. SLIDE ID INTEGRITY & UNIQUENESS
  // ==========================================================================
  describe('Slide ID Integrity & Uniqueness', () => {
    test('All slides across all humanities decks have unique IDs without collisions', () => {
      const allSlideIds = new Set<string>();
      let totalSlidesCount = 0;

      for (const gameId of EXPECTED_HUMANITIES_GAME_IDS) {
        const deck = HUMANITIES_PRESENTATION_DECKS[gameId];
        for (const slide of deck.slides) {
          expect(allSlideIds.has(slide.id)).toBe(false);
          allSlideIds.add(slide.id);
          totalSlidesCount++;
        }
      }

      expect(allSlideIds.size).toBe(totalSlidesCount);
      // 7 + 8 + 7 + 8 + 7 = 37 slides
      expect(totalSlidesCount).toBe(37);
    });
  });

  // ==========================================================================
  // 7. VECTOR VISUAL SVG ASSETS INTEGRITY
  // ==========================================================================
  describe('Custom Inline Vector SVGs Integrity', () => {
    test('All 4 Humanities SVG illustrations are valid React components', () => {
      expect(typeof GeometriPecahanIllustration).toBe('function');
      expect(typeof BorobudurKosmologiIllustration).toBe('function');
      expect(typeof Proklamasi1945Illustration).toBe('function');
      expect(typeof CaturTaktikLogikaIllustration).toBe('function');
    });
  });
});
