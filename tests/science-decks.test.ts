import { describe, expect, test } from 'bun:test';
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
  ALL_PRESENTATION_DECKS,
  getPresentationDeckByGameId,
} from '../src/data/presentation-decks';
import {
  FotosintesisDaurAirIllustration,
  LaboratoriumForensikIllustration,
  SatwaEndemikHutanIllustration,
  TataSuryaAstronomiIllustration,
} from '../src/components/visuals/ScienceSvgIllustrations';
import { SlideDefinition, SlideType } from '../src/types/presentation';

describe('Milestone 2: Science & Lab Curriculum Presentation Decks Verification', () => {
  const EXPECTED_SCIENCE_GAME_IDS = [
    'ular-tangga-sains',
    'point-click-lab',
    'point-click-hutan',
    'ular-tangga-tatasurya',
    'presentasi-ekosistem-hutan',
  ] as const;

  // ==========================================================================
  // 1. REGISTRY & LOOKUP INTEGRITY
  // ==========================================================================
  describe('Deck Registry & Lookup Integrity', () => {
    test('SCIENCE_PRESENTATION_DECKS contains all 5 required science games', () => {
      const keys = Object.keys(SCIENCE_PRESENTATION_DECKS);
      expect(keys.length).toBe(5);
      for (const gameId of EXPECTED_SCIENCE_GAME_IDS) {
        expect(SCIENCE_PRESENTATION_DECKS[gameId]).toBeDefined();
        expect(SCIENCE_PRESENTATION_DECKS[gameId].gameId).toBe(gameId);
      }
    });

    test('ALL_PRESENTATION_DECKS contains all 5 science decks', () => {
      for (const gameId of EXPECTED_SCIENCE_GAME_IDS) {
        expect(ALL_PRESENTATION_DECKS[gameId]).toBeDefined();
        expect(ALL_PRESENTATION_DECKS[gameId].gameId).toBe(gameId);
      }
    });

    test('getPresentationDeckByGameId retrieves each deck accurately and returns undefined for unknown id', () => {
      for (const gameId of EXPECTED_SCIENCE_GAME_IDS) {
        const deck = getPresentationDeckByGameId(gameId);
        expect(deck).toBeDefined();
        expect(deck?.gameId).toBe(gameId);
      }

      expect(getPresentationDeckByGameId('non-existent-game-id')).toBeUndefined();
    });

    test('Aliases for PRESENTASI_EKOSISTEM_HUTAN_DECK and FOREST_ECOSYSTEM_DECK are identical', () => {
      expect(PRESENTASI_EKOSISTEM_HUTAN_DECK).toBe(FOREST_ECOSYSTEM_DECK);
      expect(PRESENTASI_EKOSISTEM_HUTAN_DECK.gameId).toBe('presentasi-ekosistem-hutan');
    });
  });

  // ==========================================================================
  // 2. DYNAMIC SLIDE COUNTS (NOT LOCKED TO 6)
  // ==========================================================================
  describe('Dynamic Slide Counts (Not Locked to 6 Slides)', () => {
    test('Science decks have dynamic slide counts of 7 and 8 slides', () => {
      expect(ULAR_TANGGA_SAINS_DECK.slides.length).toBe(7);
      expect(ULAR_TANGGA_SAINS_DECK.totalSlides).toBe(7);

      expect(POINT_CLICK_LAB_DECK.slides.length).toBe(8);
      expect(POINT_CLICK_LAB_DECK.totalSlides).toBe(8);

      expect(POINT_CLICK_HUTAN_DECK.slides.length).toBe(8);
      expect(POINT_CLICK_HUTAN_DECK.totalSlides).toBe(8);

      expect(ULAR_TANGGA_TATASURYA_DECK.slides.length).toBe(8);
      expect(ULAR_TANGGA_TATASURYA_DECK.totalSlides).toBe(8);

      expect(PRESENTASI_EKOSISTEM_HUTAN_DECK.slides.length).toBe(7);
      expect(PRESENTASI_EKOSISTEM_HUTAN_DECK.totalSlides).toBe(7);
    });

    test('Zero science decks are restricted to legacy 6 slides', () => {
      for (const gameId of EXPECTED_SCIENCE_GAME_IDS) {
        const deck = SCIENCE_PRESENTATION_DECKS[gameId];
        expect(deck.slides.length).not.toBe(6);
      }

      const distinctCounts = new Set(
        EXPECTED_SCIENCE_GAME_IDS.map((id) => SCIENCE_PRESENTATION_DECKS[id].slides.length)
      );
      expect(distinctCounts.size).toBe(2);
      expect(distinctCounts.has(7)).toBe(true);
      expect(distinctCounts.has(8)).toBe(true);
    });
  });

  // ==========================================================================
  // 3. SCHEMA & NARRATIVE ARC INTEGRITY
  // ==========================================================================
  describe('Schema, Mentor & Narrative Arc Integrity', () => {
    const VALID_SLIDE_TYPES: SlideType[] = [
      'narrative-intro',
      'concept-infographic',
      'mini-game-sequence',
      'mini-game-match',
      'mini-game-flashcard',
      'mini-game-board',
      'mini-game-chess',
      'mini-game-word',
      'story-resolution',
      'reflection-spark',
    ];

    for (const gameId of EXPECTED_SCIENCE_GAME_IDS) {
      test(`Deck [${gameId}] strictly conforms to PresentationDeckData schema`, () => {
        const deck = SCIENCE_PRESENTATION_DECKS[gameId];

        // Header & Mentor
        expect(deck.title.length).toBeGreaterThan(5);
        expect(deck.subtitle.length).toBeGreaterThan(5);
        expect(deck.mentor).toBeDefined();
        expect(deck.mentor.name.length).toBeGreaterThan(3);
        expect(deck.mentor.role.length).toBeGreaterThan(3);
        expect(deck.mentor.avatarEmoji.length).toBeGreaterThan(0);

        // Slide IDs uniqueness
        const slideIds = deck.slides.map((s) => s.id);
        const uniqueSlideIds = new Set(slideIds);
        expect(uniqueSlideIds.size).toBe(deck.slides.length);

        // Slide 1: Narrative Intro
        const firstSlide = deck.slides[0];
        expect(firstSlide.type).toBe('narrative-intro');
        if (firstSlide.type === 'narrative-intro') {
          expect(firstSlide.dialogue.length).toBeGreaterThan(50);
          expect(firstSlide.missionObjective.length).toBeGreaterThan(15);
          expect(firstSlide.actionButtonText.length).toBeGreaterThan(3);
        }

        // Penultimate Slide: Story Resolution
        const penultimateSlide = deck.slides[deck.slides.length - 2];
        expect(penultimateSlide.type).toBe('story-resolution');
        if (penultimateSlide.type === 'story-resolution') {
          expect(penultimateSlide.resolutionStory.length).toBeGreaterThan(50);
          expect(penultimateSlide.achievementBadges.length).toBeGreaterThanOrEqual(2);
          expect(penultimateSlide.actionButtonText.length).toBeGreaterThan(3);
        }

        // Final Slide: Reflection Spark
        const finalSlide = deck.slides[deck.slides.length - 1];
        expect(finalSlide.type).toBe('reflection-spark');
        if (finalSlide.type === 'reflection-spark') {
          expect(finalSlide.sparkCards.length).toBe(3);
          expect(finalSlide.victoryButtonText.length).toBeGreaterThan(3);
          finalSlide.sparkCards.forEach((card, idx) => {
            expect(card.number).toBe(idx + 1);
            expect(card.title.length).toBeGreaterThan(3);
            expect(card.question.length).toBeGreaterThan(15);
          });
        }

        // All slides have valid chapterBadges and recognized slide types
        deck.slides.forEach((slide: SlideDefinition) => {
          expect(VALID_SLIDE_TYPES).toContain(slide.type);
          expect(slide.chapterBadge.length).toBeGreaterThan(3);
          expect(slide.title.length).toBeGreaterThan(3);
        });
      });
    }
  });

  // ==========================================================================
  // 4. EMBEDDED MINI-GAMES INTEGRITY BY DECK
  // ==========================================================================
  describe('Embedded Mini-Game Archetypes & Pedagogical Data', () => {
    test('Deck 1 (ular-tangga-sains): Hydrological sequence and energy match games', () => {
      const deck = ULAR_TANGGA_SAINS_DECK;
      expect(deck.themeColor).toBe('orange');
      expect(deck.mentor.name).toBe('Kak Galih');

      // Slide 4: Sequence
      const slide4 = deck.slides[3];
      expect(slide4.type).toBe('mini-game-sequence');
      if (slide4.type === 'mini-game-sequence') {
        expect(slide4.challengeKey).toBe('sequence-hidrologi');
        expect(slide4.items.length).toBe(4);
        expect(slide4.items).toBe(WATER_CYCLE_SEQUENCE);
        slide4.items.forEach((item, index) => {
          expect(item.order).toBe(index + 1);
          expect(item.id.length).toBeGreaterThan(0);
          expect(item.label.length).toBeGreaterThan(0);
          expect(item.description.length).toBeGreaterThan(10);
        });
      }

      // Slide 5: Match Pairs
      const slide5 = deck.slides[4];
      expect(slide5.type).toBe('mini-game-match');
      if (slide5.type === 'mini-game-match') {
        expect(slide5.challengeKey).toBe('match-energi');
        expect(slide5.pairs.length).toBe(4);
        expect(slide5.pairs).toBe(ENERGY_TRANSFORMATION_PAIRS);
        slide5.pairs.forEach((pair) => {
          expect(pair.id.length).toBeGreaterThan(0);
          expect(pair.leftText.length).toBeGreaterThan(0);
          expect(pair.rightText.length).toBeGreaterThan(0);
        });
      }
    });

    test('Deck 2 (point-click-lab): K3 match, scientific method sequence, and litmus flashcards', () => {
      const deck = POINT_CLICK_LAB_DECK;
      expect(deck.themeColor).toBe('teal');
      expect(deck.mentor.name).toBe('Dr. Maya Arisandi, M.Sc.');

      // Slide 4: K3 Match
      const slide4 = deck.slides[3];
      expect(slide4.type).toBe('mini-game-match');
      if (slide4.type === 'mini-game-match') {
        expect(slide4.challengeKey).toBe('k3-pairs');
        expect(slide4.pairs.length).toBe(4);
        expect(slide4.pairs).toBe(LAB_K3_PAIRS);
      }

      // Slide 5: Scientific Method Sequence (5 steps)
      const slide5 = deck.slides[4];
      expect(slide5.type).toBe('mini-game-sequence');
      if (slide5.type === 'mini-game-sequence') {
        expect(slide5.challengeKey).toBe('metode-ilmiah');
        expect(slide5.items.length).toBe(5);
        expect(slide5.items).toBe(SCIENTIFIC_METHOD_SEQUENCE);
        slide5.items.forEach((item, idx) => {
          expect(item.order).toBe(idx + 1);
        });
      }

      // Slide 6: Litmus 3D Flashcards (3 cards)
      const slide6 = deck.slides[5];
      expect(slide6.type).toBe('mini-game-flashcard');
      if (slide6.type === 'mini-game-flashcard') {
        expect(slide6.challengeKey).toBe('flashcards-lakmus');
        expect(slide6.cards.length).toBe(3);
        expect(slide6.cards).toBe(LAB_FLASHCARDS);
        slide6.cards.forEach((card) => {
          expect(card.frontPrompt.length).toBeGreaterThan(15);
          expect(card.backTitle.length).toBeGreaterThan(3);
          expect(card.backAnswer.length).toBeGreaterThan(3);
          expect(card.backExplanation.length).toBeGreaterThan(15);
        });
      }
    });

    test('Deck 3 (point-click-hutan): Wallace match, canopy sequence, and forest flashcards', () => {
      const deck = POINT_CLICK_HUTAN_DECK;
      expect(deck.themeColor).toBe('emerald');
      expect(deck.mentor.name).toBe('Ranger Banyu');

      // Slide 4: Wallace Biogeography Match
      const slide4 = deck.slides[3];
      expect(slide4.type).toBe('mini-game-match');
      if (slide4.type === 'mini-game-match') {
        expect(slide4.challengeKey).toBe('biogeografi-pairs');
        expect(slide4.pairs.length).toBe(4);
        expect(slide4.pairs).toBe(BIOGEOGRAPHY_FAUNA_PAIRS);
      }

      // Slide 5: Canopy Strata Sequence (4 strata)
      const slide5 = deck.slides[4];
      expect(slide5.type).toBe('mini-game-sequence');
      if (slide5.type === 'mini-game-sequence') {
        expect(slide5.challengeKey).toBe('sequence-kanopi');
        expect(slide5.items.length).toBe(4);
        expect(slide5.items).toBe(CANOPY_STRATA_SEQUENCE);
        slide5.items.forEach((item, idx) => {
          expect(item.order).toBe(idx + 1);
        });
      }

      // Slide 6: Forest Flashcards (2 cards)
      const slide6 = deck.slides[5];
      expect(slide6.type).toBe('mini-game-flashcard');
      if (slide6.type === 'mini-game-flashcard') {
        expect(slide6.challengeKey).toBe('flashcards-orangutan');
        expect(slide6.cards.length).toBe(2);
        expect(slide6.cards).toBe(HUTAN_FLASHCARDS);
      }
    });

    test('Deck 4 (ular-tangga-tatasurya): 8-planet sequence, space match, and eclipse sequence', () => {
      const deck = ULAR_TANGGA_TATASURYA_DECK;
      expect(deck.themeColor).toBe('purple');
      expect(deck.mentor.name).toBe('Kapten Dirgantara');

      // Slide 3: 8-Planet Sequence
      const slide3 = deck.slides[2];
      expect(slide3.type).toBe('mini-game-sequence');
      if (slide3.type === 'mini-game-sequence') {
        expect(slide3.challengeKey).toBe('sequence-8-planet');
        expect(slide3.items.length).toBe(8);
        expect(slide3.items).toBe(SOLAR_PLANETS_SEQUENCE);
        slide3.items.forEach((planet, idx) => {
          expect(planet.order).toBe(idx + 1);
        });
      }

      // Slide 5: Space Characteristics Match
      const slide5 = deck.slides[4];
      expect(slide5.type).toBe('mini-game-match');
      if (slide5.type === 'mini-game-match') {
        expect(slide5.challengeKey).toBe('match-karakteristik-antariksa');
        expect(slide5.pairs.length).toBe(4);
        expect(slide5.pairs).toBe(SPACE_CHARACTERISTICS_PAIRS);
      }

      // Slide 6: Eclipse Geometry Sequence (3 steps)
      const slide6 = deck.slides[5];
      expect(slide6.type).toBe('mini-game-sequence');
      if (slide6.type === 'mini-game-sequence') {
        expect(slide6.challengeKey).toBe('sequence-gerhana-matahari');
        expect(slide6.items.length).toBe(3);
        expect(slide6.items).toBe(ECLIPSE_GEOMETRY_SEQUENCE);
        slide6.items.forEach((step, idx) => {
          expect(step.order).toBe(idx + 1);
        });
      }
    });

    test('Deck 5 (presentasi-ekosistem-hutan): Photosynthesis sequence and trophic match', () => {
      const deck = PRESENTASI_EKOSISTEM_HUTAN_DECK;
      expect(deck.themeColor).toBe('emerald');
      expect(deck.mentor.name).toBe('Prof. Maya Arisandi');

      // Slide 4: Photosynthesis Sequence
      const slide4 = deck.slides[3];
      expect(slide4.type).toBe('mini-game-sequence');
      if (slide4.type === 'mini-game-sequence') {
        expect(slide4.challengeKey).toBe('challenge1');
        expect(slide4.items.length).toBe(4);
        expect(slide4.items).toBe(PHOTOSYNTHESIS_ENERGY_SEQUENCE);
        slide4.items.forEach((item, idx) => {
          expect(item.order).toBe(idx + 1);
        });
      }

      // Slide 5: Trophic Pairs Match
      const slide5 = deck.slides[4];
      expect(slide5.type).toBe('mini-game-match');
      if (slide5.type === 'mini-game-match') {
        expect(slide5.challengeKey).toBe('challenge2');
        expect(slide5.pairs.length).toBe(4);
        expect(slide5.pairs).toBe(FOREST_TROPHIC_PAIRS);
      }
    });
  });

  // ==========================================================================
  // 5. CUSTOM INLINE SVG ILLUSTRATIONS
  // ==========================================================================
  describe('Science Visual SVG Illustrations', () => {
    test('All 4 custom SVG components are exported and valid functional components', () => {
      expect(typeof FotosintesisDaurAirIllustration).toBe('function');
      expect(typeof LaboratoriumForensikIllustration).toBe('function');
      expect(typeof SatwaEndemikHutanIllustration).toBe('function');
      expect(typeof TataSuryaAstronomiIllustration).toBe('function');
    });
  });
});
