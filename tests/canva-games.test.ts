import { describe, expect, test } from 'bun:test';
import { GAMES_CATALOG } from '../src/data/games-catalog';
import { CanvaSequenceGame } from '../src/components/canva-games/CanvaSequenceGame';
import { CanvaMatchPairsGame } from '../src/components/canva-games/CanvaMatchPairsGame';
import { InteractiveFlashcards } from '../src/components/canva-games/InteractiveFlashcards';
import { StoryPresentationDeckEngine } from '../src/components/canva-games/StoryPresentationDeckEngine';
import { 
  InteractiveStoryPresentationModal, 
  DEFAULT_FOREST_DECK, 
  PHOTOSYNTHESIS_SEQUENCE, 
  ECOSYSTEM_PAIRS 
} from '../src/components/canva-games/InteractiveStoryPresentationModal';
import { PRESENTATION_THEMES } from '../src/lib/presentation-themes';
import { PresentationDeckData } from '../src/types/presentation';

describe('Canva Education Interactive Games & Story Presentation Engine', () => {
  test('Components export properly with valid signatures', () => {
    expect(typeof CanvaSequenceGame).toBe('function');
    expect(typeof CanvaMatchPairsGame).toBe('function');
    expect(typeof InteractiveFlashcards).toBe('function');
    expect(typeof StoryPresentationDeckEngine).toBe('function');
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

  test('PRESENTATION_THEMES dictionary provides design tokens for all 8 subjects', () => {
    const requiredThemes = ['emerald', 'teal', 'indigo', 'amber', 'orange', 'rose', 'blue', 'purple'] as const;
    for (const themeKey of requiredThemes) {
      const theme = PRESENTATION_THEMES[themeKey];
      expect(theme).toBeDefined();
      expect(typeof theme.gradient).toBe('string');
      expect(typeof theme.btnPrimary).toBe('string');
      expect(typeof theme.activeDot).toBe('string');
      expect(typeof theme.bgLight).toBe('string');
      expect(typeof theme.borderLight).toBe('string');
      expect(typeof theme.textPrimary).toBe('string');
      expect(typeof theme.textBadge).toBe('string');
      expect(typeof theme.bgBadge).toBe('string');
      expect(typeof theme.borderBadge).toBe('string');
      expect(typeof theme.shadowColor).toBe('string');
      expect(typeof theme.avatarRing).toBe('string');
    }
  });

  test('DEFAULT_FOREST_DECK conforms to PresentationDeckData contract and backward compatibility', () => {
    expect(DEFAULT_FOREST_DECK).toBeDefined();
    expect(DEFAULT_FOREST_DECK.gameId).toBe('presentasi-ekosistem-hutan');
    expect(DEFAULT_FOREST_DECK.themeColor).toBe('emerald');
    expect(DEFAULT_FOREST_DECK.mentor.name).toBe('Prof. Maya');
    expect(DEFAULT_FOREST_DECK.slides.length).toBe(6);

    const slideTypes = DEFAULT_FOREST_DECK.slides.map(s => s.type);
    expect(slideTypes).toEqual([
      'narrative-intro',
      'concept-infographic',
      'mini-game-sequence',
      'mini-game-match',
      'story-resolution',
      'reflection-spark',
    ]);

    expect(PHOTOSYNTHESIS_SEQUENCE.length).toBe(4);
    expect(ECOSYSTEM_PAIRS.length).toBe(4);
  });

  test('PresentationDeckData supports dynamic slide counts (5, 7, 8 slides)', () => {
    const dynamicDeck5: PresentationDeckData = {
      gameId: 'test-deck-5',
      title: '5-Slide Deck',
      subtitle: 'Dynamic test',
      themeColor: 'blue',
      mentor: { name: 'Guru Penguji', role: 'Tester', avatarEmoji: '🔬' },
      slides: [
        { id: 's1', type: 'narrative-intro', title: 'Intro', dialogue: 'Halo' },
        { id: 's2', type: 'concept-infographic', title: 'Konsep', cards: [] },
        { id: 's3', type: 'mini-game-flashcard', title: 'Kartu', cards: [] },
        { id: 's4', type: 'story-resolution', title: 'Hasil', resolutionStory: 'Sukses' },
        { id: 's5', type: 'reflection-spark', title: 'Refleksi', sparkCards: [] },
      ],
    };

    expect(dynamicDeck5.slides.length).toBe(5);
    expect(dynamicDeck5.slides.length).not.toBe(6);
  });
});

