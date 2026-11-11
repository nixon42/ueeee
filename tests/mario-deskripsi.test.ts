import { describe, expect, test } from 'bun:test';
import {
  CHARACTERS,
  CHARACTER_LIST,
} from '../src/games/mario-deskripsi/characters';
import {
  LINGUISTIC_QUESTIONS,
  getRandomQuestions,
} from '../src/games/mario-deskripsi/questions';
import {
  createLevel,
  createInitialPlayer,
  updatePhysics,
  LEVEL_WIDTH,
  LEVEL_HEIGHT,
  GROUND_Y,
} from '../src/games/mario-deskripsi/engine';
import { marioAudio } from '../src/games/mario-deskripsi/audio';
import { MarioDeskripsiModal } from '../src/games/mario-deskripsi/MarioDeskripsiModal';
import { CharacterSelectModal } from '../src/games/mario-deskripsi/CharacterSelectModal';
import { LinguisticQuizPopup } from '../src/games/mario-deskripsi/LinguisticQuizPopup';
import { MarioDeskripsiCanvas } from '../src/games/mario-deskripsi/MarioDeskripsiCanvas';

describe('Super Mario Teks Deskripsi (SMP Kelas 7) - Game Suite', () => {
  describe('1. Playable Characters & Asymmetric Stats', () => {
    test('Must feature exactly 3 distinct main characters with different identities', () => {
      expect(CHARACTER_LIST.length).toBe(3);
      expect(Object.keys(CHARACTERS).length).toBe(3);

      const ids = CHARACTER_LIST.map((c) => c.id);
      expect(ids).toContain('rian');
      expect(ids).toContain('maya');
      expect(ids).toContain('bimo');
    });

    test('Rian: Si Pengamat Cermat has high running speed for visual observation', () => {
      const rian = CHARACTERS.rian;
      expect(rian.name).toContain('Rian');
      expect(rian.title).toContain('Visual');
      expect(rian.physics.runSpeed).toBeGreaterThan(5.5);
      expect(rian.physics.canDoubleJump).toBeFalsy();
      expect(rian.themeColor).toBe('#e11d48');
      expect(rian.description.length).toBeGreaterThan(20);
    });

    test('Maya: Sang Penyair Puitis has floaty jump for rhythmic poetic grace', () => {
      const maya = CHARACTERS.maya;
      expect(maya.name).toContain('Maya');
      expect(maya.title).toContain('Majas');
      expect(maya.physics.canFloat).toBe(true);
      expect(maya.physics.gravity).toBeLessThanOrEqual(0.48);
      expect(maya.physics.jumpForce).toBeGreaterThanOrEqual(13.0);
      expect(maya.themeColor).toBe('#9333ea');
      expect(maya.description.length).toBeGreaterThan(20);
    });

    test('Bimo: Sang Penjelajah Kata has double-jump ability for architectural exploration', () => {
      const bimo = CHARACTERS.bimo;
      expect(bimo.name).toContain('Bimo');
      expect(bimo.title).toContain('Struktur');
      expect(bimo.physics.canDoubleJump).toBe(true);
      expect(bimo.themeColor).toBe('#059669');
      expect(bimo.description.length).toBeGreaterThan(20);
    });

    test('All characters have complete stats, bio, and visual descriptors', () => {
      for (const char of CHARACTER_LIST) {
        expect(char.id).toBeDefined();
        expect(char.name.length).toBeGreaterThan(3);
        expect(char.title.length).toBeGreaterThan(3);
        expect(char.description.length).toBeGreaterThan(20);
        expect(char.specialAbility.length).toBeGreaterThan(5);
        expect(char.stats.speed).toBeGreaterThanOrEqual(1);
        expect(char.stats.speed).toBeLessThanOrEqual(5);
        expect(char.stats.jump).toBeGreaterThanOrEqual(1);
        expect(char.stats.jump).toBeLessThanOrEqual(5);
        expect(char.stats.technique).toBeGreaterThanOrEqual(1);
        expect(char.stats.technique).toBeLessThanOrEqual(5);
      }
    });
  });

  describe('2. Linguistic Question Bank (Kurikulum Merdeka Kelas 7 Teks Deskripsi)', () => {
    test('Question bank contains at least 12 comprehensive questions', () => {
      expect(LINGUISTIC_QUESTIONS.length).toBeGreaterThanOrEqual(12);
    });

    test('All questions strictly adhere to linguistic schema with valid options and explanations', () => {
      for (const q of LINGUISTIC_QUESTIONS) {
        expect(q.id).toBeDefined();
        expect(q.categoryLabel.length).toBeGreaterThan(2);
        expect(q.prompt.length).toBeGreaterThan(10);
        expect(q.options.length).toBe(4);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(4);
        expect(q.explanation.length).toBeGreaterThan(15);

        // Every option must be unique and non-empty
        const uniqueOpts = new Set(q.options);
        expect(uniqueOpts.size).toBe(4);
        q.options.forEach((opt) => expect(opt.trim().length).toBeGreaterThan(0));
      }
    });

    test('Covers core curriculum domains of Teks Deskripsi', () => {
      const allText = LINGUISTIC_QUESTIONS.map(
        (q) => `${q.prompt} ${q.explanation} ${q.passageSnippet || ''}`
      ).join(' ');

      // Pancaindra
      expect(allText).toMatch(/pancaindra|penglihatan|pendengaran|perabaan/i);

      // Struktur teks deskripsi
      expect(allText).toMatch(/identifikasi|deskripsi bagian|simpulan/i);

      // Kaidah kebahasaan
      expect(allText).toMatch(/majas|personifikasi/i);
      expect(allText).toMatch(/kata khusus|kata konkret|spesifik/i);
    });

    test('getRandomQuestions returns random subset without exceeding bounds', () => {
      const sampled = getRandomQuestions(5);
      expect(sampled.length).toBe(5);
      const uniqueIds = new Set(sampled.map((q) => q.id));
      expect(uniqueIds.size).toBe(5);
    });
  });

  describe('3. Level Design & Platformer Engine', () => {
    test('Level layout conforms to 2D side-scrolling Mario dimensions', () => {
      const level = createLevel();
      expect(LEVEL_WIDTH).toBe(3400);
      expect(LEVEL_HEIGHT).toBe(600);
      expect(GROUND_Y).toBe(500);
      expect(level.flagpole.x).toBeGreaterThan(3000);
    });

    test('Level includes mystery question blocks linked to linguistic curriculum', () => {
      const level = createLevel();
      const mysteryBlocks = level.platforms.filter((p) => p.type === 'mystery');
      expect(mysteryBlocks.length).toBeGreaterThanOrEqual(6);

      for (const block of mysteryBlocks) {
        expect(block.question).toBeDefined();
        expect(block.question?.prompt.length).toBeGreaterThan(5);
      }
    });

    test('Level contains collectible coins, brick platforms, and enemies', () => {
      const level = createLevel();
      expect(level.coins.length).toBeGreaterThanOrEqual(15);
      expect(level.enemies.length).toBeGreaterThanOrEqual(4);
      expect(level.platforms.length).toBeGreaterThanOrEqual(5);

      // Enemies have valid bounds and speeds
      for (const enemy of level.enemies) {
        expect(enemy.startX).toBeLessThan(enemy.endX);
        expect(enemy.vx).not.toBe(0);
        expect(enemy.alive).toBe(true);
      }
    });

    test('createInitialPlayer properly positions character at spawn point', () => {
      const player = createInitialPlayer(CHARACTERS.rian);
      expect(player.x).toBe(80);
      expect(player.y).toBe(GROUND_Y - 50);
      expect(player.vx).toBe(0);
      expect(player.vy).toBe(0);
      expect(player.isOnGround).toBe(true);
    });

    test('updatePhysics handles horizontal movement and facing direction', () => {
      const level = createLevel();
      const player = createInitialPlayer(CHARACTERS.rian);

      // Simulate holding Right key
      const keysRight = { left: false, right: true, jump: false, dash: false };
      updatePhysics(player, CHARACTERS.rian, keysRight, level, () => {}, () => {}, () => {}, () => {}, () => {});

      expect(player.vx).toBeGreaterThan(0);
      expect(player.x).toBeGreaterThan(80);
      expect(player.facingRight).toBe(true);
    });

    test('updatePhysics applies gravity when player is in air', () => {
      const level = createLevel();
      const player = createInitialPlayer(CHARACTERS.maya);
      player.y = 200; // in air
      player.isOnGround = false;

      const keysNeutral = { left: false, right: false, jump: false, dash: false };
      updatePhysics(player, CHARACTERS.maya, keysNeutral, level, () => {}, () => {}, () => {}, () => {}, () => {});

      expect(player.vy).toBeGreaterThan(0); // accelerating downwards
      expect(player.y).toBeGreaterThan(200);
    });

    test('Enemy stomping mechanic defeats enemy and bounces player upward', () => {
      const level = createLevel();
      const player = createInitialPlayer(CHARACTERS.rian);

      // Place target enemy with wide patrol bounds
      const enemy = level.enemies[0];
      enemy.alive = true;
      enemy.startX = 100;
      enemy.endX = 400;
      enemy.x = 200;
      enemy.y = GROUND_Y - 32;

      // Position player just above enemy falling downward
      player.x = 200;
      player.y = enemy.y - 35;
      player.vy = 4; // Falling downwards
      player.isOnGround = false;

      let stomped = false;
      updatePhysics(
        player,
        CHARACTERS.rian,
        { left: false, right: false, jump: false, dash: false },
        level,
        () => {}, // mystery
        (e) => {
          if (e.id === enemy.id) stomped = true;
        },
        () => {}, // hurt
        () => {}, // coin
        () => {}, // goal
        () => {} // particle
      );

      expect(stomped).toBe(true);
      expect(enemy.alive).toBe(false);
      expect(player.vy).toBeLessThan(0); // Bounced upwards
    });

    test('Mystery block headbutt triggers linguistic quiz callback', () => {
      const level = createLevel();
      const player = createInitialPlayer(CHARACTERS.bimo);

      // Find first mystery block
      const mysteryBlock = level.platforms.find((p) => p.type === 'mystery');
      expect(mysteryBlock).toBeDefined();
      if (!mysteryBlock) return;

      // Position player right below block jumping upwards
      player.x = mysteryBlock.x;
      player.y = mysteryBlock.y + mysteryBlock.height + 2;
      player.vy = -6; // jumping upward
      player.isOnGround = false;

      let triggeredQuestionId: string | null = null;
      updatePhysics(
        player,
        CHARACTERS.bimo,
        { left: false, right: false, jump: false, dash: false },
        level,
        (_blockId, question) => {
          triggeredQuestionId = question.id;
        },
        () => {},
        () => {},
        () => {},
        () => {},
        () => {}
      );

      expect(triggeredQuestionId).toBe(mysteryBlock.question?.id || null);
      expect(mysteryBlock.hit).toBe(true);
      expect(player.vy).toBeGreaterThan(0); // Bounced down from hit
    });
  });

  describe('4. Audio Engine Safety & Toggle Functionality', () => {
    test('Audio engine provides sound & music controls without crashing in Node/Bun', () => {
      expect(marioAudio.isMuted()).toBe(false);
      expect(marioAudio.isMusicOn()).toBe(true);

      const soundState = marioAudio.toggleSound();
      expect(typeof soundState).toBe('boolean');

      const musicState = marioAudio.toggleMusic();
      expect(typeof musicState).toBe('boolean');

      // Restores toggles
      marioAudio.toggleSound();
      marioAudio.toggleMusic();
    });

    test('Synthesizer audio methods execute safely without throwing errors', () => {
      expect(() => marioAudio.playJump()).not.toThrow();
      expect(() => marioAudio.playCoin()).not.toThrow();
      expect(() => marioAudio.playBump()).not.toThrow();
      expect(() => marioAudio.playStomp()).not.toThrow();
      expect(() => marioAudio.playPowerUp()).not.toThrow();
      expect(() => marioAudio.playHurt()).not.toThrow();
      expect(() => marioAudio.playStageClear()).not.toThrow();
      expect(() => marioAudio.startBgm()).not.toThrow();
      expect(() => marioAudio.pauseBgm()).not.toThrow();
      expect(() => marioAudio.resumeBgm()).not.toThrow();
      expect(() => marioAudio.stopBgm()).not.toThrow();
    });
  });

  describe('5. Component Signatures and Exports', () => {
    test('CharacterSelectModal has valid component signature', () => {
      expect(typeof CharacterSelectModal).toBe('function');
    });

    test('LinguisticQuizPopup has valid component signature', () => {
      expect(typeof LinguisticQuizPopup).toBe('function');
    });

    test('MarioDeskripsiCanvas has valid component signature', () => {
      expect(typeof MarioDeskripsiCanvas).toBe('function');
    });

    test('MarioDeskripsiModal has valid component signature', () => {
      expect(typeof MarioDeskripsiModal).toBe('function');
    });
  });
});
