import { describe, it, expect } from 'bun:test';
import { GameStageShell } from '../src/components/game-shell/GameStageShell';
import { GameQuizModal } from '../src/components/game-shell/GameQuizModal';
import { GameVictoryModal } from '../src/components/game-shell/GameVictoryModal';

describe('Reusable Game Shell Components Integrity', () => {
  it('should export all essential reusable components', () => {
    expect(GameStageShell).toBeDefined();
    expect(typeof GameStageShell).toBe('function');

    expect(GameQuizModal).toBeDefined();
    expect(typeof GameQuizModal).toBe('function');

    expect(GameVictoryModal).toBeDefined();
    expect(typeof GameVictoryModal).toBe('function');
  });

  it('GameStageShell should have valid component signature', () => {
    expect(GameStageShell.name).toBe('GameStageShell');
  });

  it('GameQuizModal should have valid component signature', () => {
    expect(GameQuizModal.name).toBe('GameQuizModal');
  });

  it('GameVictoryModal should have valid component signature', () => {
    expect(GameVictoryModal.name).toBe('GameVictoryModal');
  });
});
