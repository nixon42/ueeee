/**
 * Central Presentation Decks Registry
 * Provides unified access to researched Indonesian K-12 interactive presentation decks.
 */

import { PresentationDeckData } from '@/types/presentation';
import { SCIENCE_PRESENTATION_DECKS } from './science-decks';
import { HUMANITIES_PRESENTATION_DECKS } from './humanities-decks';

export * from './science-decks';
export * from './humanities-decks';

/**
 * Master catalog mapping of all registered presentation decks across all 10 games.
 * Populated with Science, Lab, Ecology, Math, History, Language, and Logic decks.
 */
export const ALL_PRESENTATION_DECKS: Record<string, PresentationDeckData> = {
  ...SCIENCE_PRESENTATION_DECKS,
  ...HUMANITIES_PRESENTATION_DECKS,
};

/**
 * Retrieve a presentation deck by its unique game ID.
 */
export function getPresentationDeckByGameId(gameId: string): PresentationDeckData | undefined {
  return ALL_PRESENTATION_DECKS[gameId];
}

/**
 * Check if a game has a registered story presentation deck.
 */
export function hasPresentationDeck(gameId: string): boolean {
  return Boolean(ALL_PRESENTATION_DECKS[gameId]);
}

/**
 * Return all registered presentation deck game IDs.
 */
export function getAllPresentationDeckIds(): string[] {
  return Object.keys(ALL_PRESENTATION_DECKS);
}

