import { describe, expect, test } from 'bun:test';
import { getTileCenter } from '../src/games/ular-tangga/coordinates';

describe('Ular Tangga Engine & Coordinates', () => {
  test('Tile 1 should be at the bottom left (x: 5, y: 95)', () => {
    const center = getTileCenter(1);
    expect(center.x).toBe(5);
    expect(center.y).toBe(95);
  });

  test('Tile 10 should be at bottom right (x: 95, y: 95)', () => {
    const center = getTileCenter(10);
    expect(center.x).toBe(95);
    expect(center.y).toBe(95);
  });

  test('Tile 11 should be on the second row from bottom, right side (zigzag: x: 95, y: 85)', () => {
    const center = getTileCenter(11);
    expect(center.x).toBe(95);
    expect(center.y).toBe(85);
  });

  test('Tile 100 should be at top left (x: 5, y: 5)', () => {
    const center = getTileCenter(100);
    expect(center.x).toBe(5);
    expect(center.y).toBe(5);
  });

  test('All tile coordinates 1-100 stay strictly within 0-100%', () => {
    for (let i = 1; i <= 100; i++) {
      const { x, y } = getTileCenter(i);
      expect(x).toBeGreaterThan(0);
      expect(x).toBeLessThan(100);
      expect(y).toBeGreaterThan(0);
      expect(y).toBeLessThan(100);
    }
  });
});
