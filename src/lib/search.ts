import { GameItem } from '@/types/game';

/**
 * Robust search matcher supporting:
 * 1. Direct substring search ("borobudur" in "candi borobudur")
 * 2. Spaceless matching ("candiborobudur" matches "candi borobudur", "tatasurya" matches "tata surya")
 * 3. Multi-token queries (all words must appear in game corpus)
 * 4. Deep search across title, subtitle, description, subjectDetail, gradeLevel, and custom tags
 */
export function isGameMatchingSearch(game: GameItem, rawQuery: string): boolean {
  if (!rawQuery || !rawQuery.trim()) return true;

  const query = rawQuery.trim().toLowerCase();
  const queryClean = query.replace(/[\s\-_]/g, '');

  const corpus = [
    game.title,
    game.subtitle,
    game.description,
    game.subjectDetail,
    game.category,
    game.type,
    game.gradeLevel,
    ...(game.tags || []),
  ].join(' ').toLowerCase();

  const corpusClean = corpus.replace(/[\s\-_]/g, '');

  // 1. Direct substring or spaceless match (e.g. "candiborobudur" matches "candi borobudur")
  if (corpus.includes(query) || corpusClean.includes(queryClean)) {
    return true;
  }

  // 2. All tokens present in search corpus
  const tokens = query.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    return tokens.every(token => corpus.includes(token) || corpusClean.includes(token));
  }

  return false;
}
