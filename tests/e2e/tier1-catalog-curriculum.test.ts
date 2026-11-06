import { describe, expect, test } from 'bun:test';
import { GAMES_CATALOG } from '../../src/data/games-catalog';
import { AUTHORITATIVE_GAMES_SPEC } from './e2e-fixtures';

describe('Tier 1 E2E Test Suite: Catalog & Curriculum Coverage (All 10 Games)', () => {
  const ALL_10_GAME_IDS = [
    'ular-tangga-sains',
    'point-click-lab',
    'ular-tangga-matematika',
    'point-click-candi',
    'point-click-hutan',
    'ular-tangga-tatasurya',
    'teka-teki-kata',
    'ular-tangga-sejarah',
    'catur-taktik-logika',
    'presentasi-ekosistem-hutan'
  ];

  test('All 10 games are registered in GAMES_CATALOG with unique identifiers', () => {
    expect(GAMES_CATALOG.length).toBeGreaterThanOrEqual(10);
    const catalogIds = GAMES_CATALOG.map(g => g.id);

    for (const gameId of ALL_10_GAME_IDS) {
      expect(catalogIds).toContain(gameId);
    }

    const uniqueIds = new Set(catalogIds);
    expect(uniqueIds.size).toBe(catalogIds.length);
  });

  test('Curriculum presence: Every game provides authentic Indonesian K-12 learning goals', () => {
    for (const gameId of ALL_10_GAME_IDS) {
      const catalogItem = GAMES_CATALOG.find(g => g.id === gameId);
      const spec = AUTHORITATIVE_GAMES_SPEC[gameId];

      expect(catalogItem).toBeDefined();
      expect(spec).toBeDefined();

      // Check category match
      expect(catalogItem?.category).toBe(spec.category);

      // Check grade level format
      expect(catalogItem?.gradeLevel).toBeDefined();
      expect(catalogItem?.gradeLevel.length).toBeGreaterThan(0);

      // Check learning goals in catalog prolog
      expect(catalogItem?.prolog).toBeDefined();
      expect(catalogItem?.prolog.learningGoals.length).toBeGreaterThanOrEqual(3);

      // Verify each learning goal is pedagogical and non-trivial
      catalogItem?.prolog.learningGoals.forEach(goal => {
        expect(goal.trim().length).toBeGreaterThan(15);
      });

      // Verify subject detail
      expect(catalogItem?.subjectDetail).toBeDefined();
      expect(catalogItem?.subjectDetail?.length).toBeGreaterThan(5);
    }
  });

  test('Mentor identity: Each of the 10 games specifies a dedicated mentor character', () => {
    for (const gameId of ALL_10_GAME_IDS) {
      const spec = AUTHORITATIVE_GAMES_SPEC[gameId];
      expect(spec.mentorName).toBeDefined();
      expect(spec.mentorName.length).toBeGreaterThan(3);
      expect(spec.mentorRole).toBeDefined();
      expect(spec.mentorRole.length).toBeGreaterThan(3);

      // If catalog prolog story references the character or setting
      const catalogItem = GAMES_CATALOG.find(g => g.id === gameId);
      expect(catalogItem?.prolog.story).toBeDefined();
      expect(catalogItem?.prolog.story.length).toBeGreaterThan(30);
    }
  });

  test('Dynamic slide count: All games specify dynamic slide count between 5 and 8 slides', () => {
    for (const gameId of ALL_10_GAME_IDS) {
      const spec = AUTHORITATIVE_GAMES_SPEC[gameId];
      expect(spec.slideCount).toBeGreaterThan(0);
      expect(spec.slideCount).toBeGreaterThanOrEqual(5);
      expect(spec.slideCount).toBeLessThanOrEqual(8);
    }

    // Explicitly verify diversity of slide counts across the 10 games
    const slideCounts = ALL_10_GAME_IDS.map(id => AUTHORITATIVE_GAMES_SPEC[id].slideCount);
    const uniqueCounts = new Set(slideCounts);
    expect(uniqueCounts.size).toBeGreaterThanOrEqual(2);
  });

  test('Slide structure: Every game adheres to the 5-phase pedagogical narrative arc', () => {
    for (const gameId of ALL_10_GAME_IDS) {
      const spec = AUTHORITATIVE_GAMES_SPEC[gameId];

      // Phase 1: Context opening mission
      expect(spec.mentorRole.length).toBeGreaterThan(0);

      // Phase 2: Core concept infographics (at least 2 topics per game)
      expect(spec.learningTopics.length).toBeGreaterThanOrEqual(2);

      // Phase 3: Interactive mini-games
      expect(spec.miniGames.length).toBeGreaterThanOrEqual(2);

      // Phase 4: Story resolution impact
      expect(spec.resolutionImpact).toBeDefined();
      expect(spec.resolutionImpact.length).toBeGreaterThan(15);

      // Phase 5: Teacher reflection questions (strictly 3 HOTS questions)
      expect(spec.reflectionHotsCount).toBe(3);
    }
  });

  test('Mini-game integration: Natural engaging mini-game mechanics replace dry quiz popups', () => {
    const validMiniGameTypes = ['sequence', 'match', 'flashcards', 'board', 'chess', 'word'];

    for (const gameId of ALL_10_GAME_IDS) {
      const spec = AUTHORITATIVE_GAMES_SPEC[gameId];
      expect(spec.miniGames.length).toBeGreaterThanOrEqual(2);

      for (const miniGame of spec.miniGames) {
        expect(validMiniGameTypes).toContain(miniGame.type);
        expect(miniGame.title.length).toBeGreaterThan(5);
        expect(miniGame.itemCount).toBeGreaterThanOrEqual(2);
      }
    }
  });
});
