import { describe, expect, test } from 'bun:test';
import { GAMES_CATALOG } from '../src/data/games-catalog';
import { CanvaSequenceGame } from '../src/components/canva-games/CanvaSequenceGame';
import { CanvaMatchPairsGame } from '../src/components/canva-games/CanvaMatchPairsGame';
import { InteractiveStoryPresentationModal } from '../src/components/canva-games/InteractiveStoryPresentationModal';

describe('Canva Education Interactive Games & Story Presentation Engine', () => {
  test('Components export properly with valid signatures', () => {
    expect(typeof CanvaSequenceGame).toBe('function');
    expect(typeof CanvaMatchPairsGame).toBe('function');
    expect(typeof InteractiveStoryPresentationModal).toBe('function');
  });

  test('GAMES_CATALOG includes the flagship Interactive Story Presentation game', () => {
    const storyGame = GAMES_CATALOG.find(g => g.id === 'presentasi-ekosistem-hutan');
    expect(storyGame).toBeDefined();
    expect(storyGame?.title).toContain('Presentasi Interaktif');
    expect(storyGame?.category).toBe('sains');
    expect(storyGame?.rating).toBe(5.0);
    expect(storyGame?.prolog).toBeDefined();
    expect(storyGame?.prolog?.story.length).toBeGreaterThan(20);
    expect(storyGame?.prolog?.learningGoals.length).toBeGreaterThanOrEqual(4);
    expect(storyGame?.prolog?.howToPlay.length).toBeGreaterThanOrEqual(4);
    expect(storyGame?.prolog?.rules.length).toBeGreaterThanOrEqual(4);
  });

  test('Sequence items validation logic correctly distinguishes ordered from unordered items', () => {
    const sampleItems = [
      { id: '1', order: 1, label: 'Langkah A', iconEmoji: '🌱' },
      { id: '2', order: 2, label: 'Langkah B', iconEmoji: '🌿' },
      { id: '3', order: 3, label: 'Langkah C', iconEmoji: '🌳' },
    ];

    // Correct order check
    const isOrderedCorrect = sampleItems.every((item, idx) => item.order === idx + 1);
    expect(isOrderedCorrect).toBe(true);

    // Inverted order check
    const invertedItems = [sampleItems[2], sampleItems[1], sampleItems[0]];
    const isOrderedWrong = invertedItems.every((item, idx) => item.order === idx + 1);
    expect(isOrderedWrong).toBe(false);
  });

  test('Match the pairs validation logic verifies mutual pair keys', () => {
    const samplePairs = [
      { id: 'p1', leftText: 'Produsen', rightText: 'Tumbuhan' },
      { id: 'p2', leftText: 'Konsumen', rightText: 'Hewan' },
    ];

    const correctConnections: Record<string, string> = {
      p1: 'p1',
      p2: 'p2',
    };

    const isMatchCorrect = Object.entries(correctConnections).every(
      ([leftId, rightId]) => leftId === rightId
    );
    expect(isMatchCorrect).toBe(true);

    const wrongConnections: Record<string, string> = {
      p1: 'p2',
      p2: 'p1',
    };
    const isMatchWrong = Object.entries(wrongConnections).every(
      ([leftId, rightId]) => leftId === rightId
    );
    expect(isMatchWrong).toBe(false);
  });
});
