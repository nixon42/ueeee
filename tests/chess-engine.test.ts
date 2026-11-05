import { describe, expect, test } from 'bun:test';
import { CHESS_PUZZLES } from '../src/games/chess-puzzle/puzzles';
import { sound } from '../src/lib/sound';

describe('Chess Puzzle & Smooth Board Engine Validation', () => {
  test('All chess puzzles have valid metadata and non-empty pieces', () => {
    expect(CHESS_PUZZLES.length).toBeGreaterThanOrEqual(5);

    const puzzleIds = CHESS_PUZZLES.map(p => p.id);
    expect(new Set(puzzleIds).size).toBe(puzzleIds.length);

    for (const puzzle of CHESS_PUZZLES) {
      expect(puzzle.title.length).toBeGreaterThan(5);
      expect(puzzle.tacticName.length).toBeGreaterThan(2);
      expect(puzzle.objective.length).toBeGreaterThan(10);
      expect(puzzle.initialPieces.length).toBeGreaterThan(2);
      expect(puzzle.explanation.length).toBeGreaterThan(15);
      expect(puzzle.hint.length).toBeGreaterThan(10);
      expect(puzzle.incorrectFeedback.length).toBeGreaterThan(10);
    }
  });

  test('All piece coordinates and solution coordinates are strictly within board boundaries (col 0-7, row 0-7)', () => {
    for (const puzzle of CHESS_PUZZLES) {
      // Check initial pieces
      for (const piece of puzzle.initialPieces) {
        expect(piece.col).toBeGreaterThanOrEqual(0);
        expect(piece.col).toBeLessThanOrEqual(7);
        expect(piece.row).toBeGreaterThanOrEqual(0);
        expect(piece.row).toBeLessThanOrEqual(7);
        expect(['p', 'r', 'n', 'b', 'q', 'k']).toContain(piece.type);
        expect(['w', 'b']).toContain(piece.color);
      }

      // Check solution
      expect(puzzle.solution.from.col).toBeGreaterThanOrEqual(0);
      expect(puzzle.solution.from.col).toBeLessThanOrEqual(7);
      expect(puzzle.solution.from.row).toBeGreaterThanOrEqual(0);
      expect(puzzle.solution.from.row).toBeLessThanOrEqual(7);
      expect(puzzle.solution.to.col).toBeGreaterThanOrEqual(0);
      expect(puzzle.solution.to.col).toBeLessThanOrEqual(7);
      expect(puzzle.solution.to.row).toBeGreaterThanOrEqual(0);
      expect(puzzle.solution.to.row).toBeLessThanOrEqual(7);

      // Verify that the piece to be moved exists at solution.from
      const moverPiece = puzzle.initialPieces.find(
        p => p.col === puzzle.solution.from.col && p.row === puzzle.solution.from.row
      );
      expect(moverPiece).toBeDefined();
      expect(moverPiece?.color).toBe(puzzle.turn);
    }
  });

  test('Sound engine exports synthesized audio functions for chess', () => {
    expect(typeof sound.playChessMove).toBe('function');
    expect(typeof sound.playChessCapture).toBe('function');
    expect(typeof sound.playChessError).toBe('function');
    expect(typeof sound.playChessSuccess).toBe('function');
  });

  test('Back Rank checkmate puzzle aligns with Chess.com rated puzzle scenario', () => {
    const backRank = CHESS_PUZZLES.find(p => p.id === 'puzzle-back-rank');
    expect(backRank).toBeDefined();
    // Solution moves Queen to rank 8 (row 0 in 0-indexed top-down board)
    expect(backRank?.solution.to.row).toBe(0);
  });
});
