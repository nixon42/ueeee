import { describe, expect, test } from 'bun:test';
import { QUESTIONS_BANK } from '../src/data/questions-bank';

describe('Curriculum Questions Bank Validation', () => {
  test('QUESTIONS_BANK has subjects defined', () => {
    const subjects = Object.keys(QUESTIONS_BANK);
    expect(subjects.length).toBeGreaterThan(0);
    expect(subjects).toContain('sains');
    expect(subjects).toContain('matematika');
    expect(subjects).toContain('sejarah');
  });

  test('All questions have valid properties, non-empty text, and valid correctIndex', () => {
    for (const [subject, list] of Object.entries(QUESTIONS_BANK)) {
      expect(list.length).toBeGreaterThan(0);
      for (const q of list) {
        expect(q.id).toBeDefined();
        expect(q.question.trim().length).toBeGreaterThan(5);
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
        expect(q.explanation.trim().length).toBeGreaterThan(5);
        expect(q.subject).toBe(subject);
      }
    }
  });
});
