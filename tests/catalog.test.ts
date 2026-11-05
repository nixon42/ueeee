import { describe, expect, test } from 'bun:test';
import { GAMES_CATALOG } from '../src/data/games-catalog';
import { POINT_CLICK_SCENES } from '../src/data/point-click-scenes';
import { isGameMatchingSearch } from '../src/lib/search';

describe('Games & Scenes Catalog Integrity', () => {
  test('Games Catalog has unique IDs', () => {
    const ids = GAMES_CATALOG.map(g => g.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('All games have valid ratings and positive play times', () => {
    for (const game of GAMES_CATALOG) {
      expect(game.rating).toBeGreaterThanOrEqual(4.0);
      expect(game.rating).toBeLessThanOrEqual(5.0);
      expect(game.playTimeMinutes).toBeGreaterThan(0);
      expect(game.title.length).toBeGreaterThan(3);
    }
  });

  test('Point and Click scenes have hotspots with unique IDs and valid coordinates', () => {
    for (const scene of POINT_CLICK_SCENES) {
      expect(scene.hotspots.length).toBeGreaterThanOrEqual(3);
      const spotIds = scene.hotspots.map(h => h.id);
      expect(new Set(spotIds).size).toBe(spotIds.length);

      for (const spot of scene.hotspots) {
        expect(spot.x).toBeGreaterThan(0);
        expect(spot.x).toBeLessThan(100);
        expect(spot.y).toBeGreaterThan(0);
        expect(spot.y).toBeLessThan(100);
        expect(spot.dialogue.length).toBeGreaterThan(10);
      }
    }
  });

  test('Search matcher correctly finds games with various query formats', () => {
    // 1. Spaceless search: "candiborobudur"
    const candiMatches = GAMES_CATALOG.filter(g => isGameMatchingSearch(g, 'candiborobudur'));
    expect(candiMatches.length).toBeGreaterThanOrEqual(1);
    expect(candiMatches.some(g => g.id === 'point-click-candi')).toBe(true);

    // 2. Standard search with space: "Candi Borobudur"
    const candiSpaceMatches = GAMES_CATALOG.filter(g => isGameMatchingSearch(g, 'Candi Borobudur'));
    expect(candiSpaceMatches.length).toBeGreaterThanOrEqual(1);
    expect(candiSpaceMatches.some(g => g.id === 'point-click-candi')).toBe(true);

    // 3. Substring: "Borobudur"
    const borobudurMatches = GAMES_CATALOG.filter(g => isGameMatchingSearch(g, 'Borobudur'));
    expect(borobudurMatches.length).toBeGreaterThanOrEqual(1);
    expect(borobudurMatches[0].id).toBe('point-click-candi');

    // 4. Science keyword: "fotosintesis"
    const fotoMatches = GAMES_CATALOG.filter(g => isGameMatchingSearch(g, 'fotosintesis'));
    expect(fotoMatches.length).toBeGreaterThanOrEqual(1);

    // 5. Spaceless astronomy keyword: "tatasurya"
    const tataMatches = GAMES_CATALOG.filter(g => isGameMatchingSearch(g, 'tatasurya'));
    expect(tataMatches.length).toBeGreaterThanOrEqual(1);
    expect(tataMatches.some(g => g.id === 'ular-tangga-tatasurya')).toBe(true);
  });
});
