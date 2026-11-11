import {
  CharacterDef,
  Platform,
  Coin,
  Enemy,
  Cloud,
  LinguisticQuestion,
} from './types';
import { LINGUISTIC_QUESTIONS } from './questions';

export const LEVEL_WIDTH = 3400;
export const LEVEL_HEIGHT = 600;
export const GROUND_Y = 500;

export interface PlayerState {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  facingRight: boolean;
  isOnGround: boolean;
  isJumping: boolean;
  jumpCount: number;
  floatTimer: number;
  isInvulnerable: boolean;
  invulnerableTimer: number;
  animFrame: number;
  animTimer: number;
}

export interface LevelData {
  platforms: Platform[];
  coins: Coin[];
  enemies: Enemy[];
  clouds: Cloud[];
  flagpole: { x: number; y: number; height: number; reached: boolean };
  castle: { x: number; y: number; width: number; height: number };
}

export function createInitialPlayer(_character: CharacterDef): PlayerState {
  return {
    x: 80,
    y: GROUND_Y - 50,
    width: 36,
    height: 48,
    vx: 0,
    vy: 0,
    facingRight: true,
    isOnGround: true,
    isJumping: false,
    jumpCount: 0,
    floatTimer: 0,
    isInvulnerable: false,
    invulnerableTimer: 0,
    animFrame: 0,
    animTimer: 0,
  };
}

export function createLevel(): LevelData {
  const platforms: Platform[] = [];
  const coins: Coin[] = [];
  const enemies: Enemy[] = [];
  const clouds: Cloud[] = [];

  // 1. Generate Clouds in the sky (parallax)
  for (let i = 0; i < 18; i++) {
    clouds.push({
      x: 100 + i * 190 + (Math.sin(i) * 60),
      y: 60 + (i % 3) * 45,
      scale: 0.8 + ((i % 4) * 0.2),
      speed: 0.15 + ((i % 3) * 0.1),
    });
  }

  // 2. Continuous Ground with Strategic Pits (Jurang Pengamatan)
  // Section 1: 0 -> 800
  platforms.push({ x: 0, y: GROUND_Y, width: 850, height: 100, type: 'ground' });
  // Pit 1: 850 -> 980 (130px jump)
  // Section 2: 980 -> 1800
  platforms.push({ x: 980, y: GROUND_Y, width: 850, height: 100, type: 'ground' });
  // Pit 2: 1830 -> 1980 (150px jump)
  // Section 3: 1980 -> 3400 (Finish area)
  platforms.push({ x: 1980, y: GROUND_Y, width: 1420, height: 100, type: 'ground' });

  // 3. Question / Mystery Blocks (`?` blocks) paired with curriculum questions
  let qIndex = 0;
  const getNextQ = (): LinguisticQuestion => {
    const q = LINGUISTIC_QUESTIONS[qIndex % LINGUISTIC_QUESTIONS.length];
    qIndex++;
    return q;
  };

  // ── ZONE 1: PANCAINDRA & PENGENALAN (x: 200 - 800) ──
  // Mystery blocks & bricks
  platforms.push({ x: 260, y: 380, width: 44, height: 44, type: 'mystery', mysteryId: 'm1', question: getNextQ() });
  platforms.push({ x: 304, y: 380, width: 44, height: 44, type: 'brick' });
  platforms.push({ x: 348, y: 380, width: 44, height: 44, type: 'mystery', mysteryId: 'm2', question: getNextQ() });
  platforms.push({ x: 392, y: 380, width: 44, height: 44, type: 'brick' });
  platforms.push({ x: 436, y: 380, width: 44, height: 44, type: 'mystery', mysteryId: 'm3', question: getNextQ() });

  // Elevated pipe obstacle
  platforms.push({ x: 620, y: 430, width: 56, height: 70, type: 'pipe' });

  // ── ZONE 2: STRUKTUR TEKS DESKRIPSI (x: 1050 - 1800) ──
  // Cloud stepping platforms above pit 1
  platforms.push({ x: 860, y: 420, width: 80, height: 26, type: 'cloud' });

  // Mystery blocks on structure
  platforms.push({ x: 1120, y: 370, width: 44, height: 44, type: 'mystery', mysteryId: 'm4', question: getNextQ() });
  platforms.push({ x: 1164, y: 370, width: 44, height: 44, type: 'mystery', mysteryId: 'm5', question: getNextQ() });
  platforms.push({ x: 1208, y: 370, width: 44, height: 44, type: 'brick' });

  // Elevated stairs / pyramids of bricks
  platforms.push({ x: 1380, y: 450, width: 44, height: 50, type: 'brick' });
  platforms.push({ x: 1424, y: 400, width: 44, height: 100, type: 'brick' });
  platforms.push({ x: 1468, y: 350, width: 44, height: 150, type: 'brick' });
  platforms.push({ x: 1512, y: 300, width: 44, height: 200, type: 'mystery', mysteryId: 'm6', question: getNextQ() });

  // Pipe obstacle
  platforms.push({ x: 1680, y: 410, width: 60, height: 90, type: 'pipe' });

  // ── ZONE 3: MAJAS & KATA KONKRET (x: 2000 - 2800) ──
  // Cloud steps above pit 2
  platforms.push({ x: 1850, y: 410, width: 80, height: 26, type: 'cloud' });

  // High mystery blocks with majas challenges
  platforms.push({ x: 2150, y: 360, width: 44, height: 44, type: 'mystery', mysteryId: 'm7', question: getNextQ() });
  platforms.push({ x: 2280, y: 320, width: 44, height: 44, type: 'mystery', mysteryId: 'm8', question: getNextQ() });
  platforms.push({ x: 2420, y: 360, width: 44, height: 44, type: 'mystery', mysteryId: 'm9', question: getNextQ() });
  platforms.push({ x: 2560, y: 300, width: 44, height: 44, type: 'mystery', mysteryId: 'm10', question: getNextQ() });

  // Final victory staircase leading to flagpole
  for (let s = 0; s < 5; s++) {
    platforms.push({
      x: 2750 + s * 44,
      y: 450 - s * 40,
      width: 44,
      height: 50 + s * 40,
      type: 'brick',
    });
  }

  // 4. Gold Coins
  const coinPositions: Array<{ x: number; y: number }> = [
    { x: 180, y: 440 }, { x: 220, y: 440 },
    { x: 260, y: 320 }, { x: 348, y: 320 }, { x: 436, y: 320 },
    { x: 740, y: 440 }, { x: 780, y: 440 },
    { x: 880, y: 360 }, { x: 920, y: 360 },
    { x: 1040, y: 440 }, { x: 1080, y: 440 },
    { x: 1260, y: 440 }, { x: 1300, y: 440 },
    { x: 1512, y: 240 }, { x: 1560, y: 260 },
    { x: 1870, y: 350 }, { x: 1910, y: 350 },
    { x: 2050, y: 440 }, { x: 2100, y: 440 },
    { x: 2150, y: 300 }, { x: 2280, y: 260 }, { x: 2420, y: 300 },
    { x: 2650, y: 440 }, { x: 2700, y: 440 },
  ];

  coinPositions.forEach((pos, idx) => {
    coins.push({
      id: `c_${idx}`,
      x: pos.x,
      y: pos.y,
      radius: 12,
      collected: false,
      bobOffset: (idx * 0.4) % Math.PI,
    });
  });

  // 5. Enemies (Kumbang Rancu & Monster Klise)
  enemies.push({
    id: 'e1',
    x: 480,
    y: GROUND_Y - 32,
    width: 34,
    height: 32,
    vx: -1.2,
    startX: 450,
    endX: 610,
    type: 'kumbang',
    alive: true,
  });

  enemies.push({
    id: 'e2',
    x: 1220,
    y: GROUND_Y - 32,
    width: 34,
    height: 32,
    vx: 1.3,
    startX: 1100,
    endX: 1340,
    type: 'kumbang',
    alive: true,
  });

  enemies.push({
    id: 'e3',
    x: 1600,
    y: GROUND_Y - 32,
    width: 34,
    height: 32,
    vx: -1.2,
    startX: 1550,
    endX: 1670,
    type: 'klise',
    alive: true,
  });

  enemies.push({
    id: 'e4',
    x: 2200,
    y: GROUND_Y - 32,
    width: 34,
    height: 32,
    vx: 1.4,
    startX: 2120,
    endX: 2360,
    type: 'kumbang',
    alive: true,
  });

  enemies.push({
    id: 'e5',
    x: 2500,
    y: GROUND_Y - 32,
    width: 34,
    height: 32,
    vx: -1.4,
    startX: 2420,
    endX: 2680,
    type: 'klise',
    alive: true,
  });

  return {
    platforms,
    coins,
    enemies,
    clouds,
    flagpole: {
      x: 3040,
      y: 200,
      height: 300,
      reached: false,
    },
    castle: {
      x: 3140,
      y: 290,
      width: 180,
      height: 210,
    },
  };
}

export function updatePhysics(
  player: PlayerState,
  character: CharacterDef,
  keys: { left: boolean; right: boolean; jump: boolean; dash: boolean },
  level: LevelData,
  onMysteryHit: (mysteryId: string, q: LinguisticQuestion) => void,
  onEnemyStomp: (enemy: Enemy) => void,
  onPlayerHitEnemy: () => void,
  onCoinCollected: (coin: Coin) => void,
  onGoalReached: () => void,
  createParticleBurst: (x: number, y: number, color: string, count: number) => void
): void {
  const { physics } = character;
  const currentSpeed = keys.dash ? physics.runSpeed * 1.35 : physics.runSpeed;

  // 1. Horizontal Input & Acceleration
  if (keys.left) {
    player.vx = -currentSpeed;
    player.facingRight = false;
  } else if (keys.right) {
    player.vx = currentSpeed;
    player.facingRight = true;
  } else {
    // Friction
    player.vx *= 0.78;
    if (Math.abs(player.vx) < 0.2) player.vx = 0;
  }

  // 2. Vertical Movement & Gravity
  if (!player.isOnGround) {
    let effectiveGravity = physics.gravity;
    // Maya Floaty Glide: if falling and jump key is held
    if (character.physics.canFloat && player.vy > 0 && keys.jump) {
      effectiveGravity *= 0.32; // Glides smoothly
      player.floatTimer++;
    }
    player.vy += effectiveGravity;
    // Terminal falling velocity
    if (player.vy > 14) player.vy = 14;
  }

  // 3. Horizontal Collision Testing
  player.x += player.vx;
  // Boundary check
  if (player.x < 10) {
    player.x = 10;
    player.vx = 0;
  }

  for (const plat of level.platforms) {
    if (
      player.x < plat.x + plat.width &&
      player.x + player.width > plat.x &&
      player.y < plat.y + plat.height &&
      player.y + player.height > plat.y
    ) {
      // Hit from left
      if (player.vx > 0) {
        player.x = plat.x - player.width;
        player.vx = 0;
      } else if (player.vx < 0) {
        // Hit from right
        player.x = plat.x + plat.width;
        player.vx = 0;
      }
    }
  }

  // 4. Vertical Collision Testing
  player.y += player.vy;
  player.isOnGround = false;

  for (const plat of level.platforms) {
    if (
      player.x < plat.x + plat.width &&
      player.x + player.width > plat.x &&
      player.y < plat.y + plat.height &&
      player.y + player.height > plat.y
    ) {
      // Landing on top of platform
      if (player.vy > 0 && player.y + player.height - player.vy <= plat.y + 12) {
        player.y = plat.y - player.height;
        player.vy = 0;
        player.isOnGround = true;
        player.isJumping = false;
        player.jumpCount = 0;
        player.floatTimer = 0;
      }
      // Headbutting platform from below
      else if (player.vy < 0) {
        player.y = plat.y + plat.height;
        player.vy = 1.5; // Rebound down

        if (plat.type === 'mystery' && !plat.hit && plat.mysteryId && plat.question) {
          plat.hit = true;
          createParticleBurst(plat.x + plat.width / 2, plat.y, '#facc15', 14);
          onMysteryHit(plat.mysteryId, plat.question);
        } else if (plat.type === 'brick') {
          createParticleBurst(plat.x + plat.width / 2, plat.y, '#ea580c', 8);
        }
      }
    }
  }

  // 5. Coin Collisions
  for (const coin of level.coins) {
    if (!coin.collected) {
      const dx = player.x + player.width / 2 - coin.x;
      const dy = player.y + player.height / 2 - coin.y;
      const dist = Math.hypot(dx, dy);
      if (dist < player.width / 2 + coin.radius + 6) {
        coin.collected = true;
        createParticleBurst(coin.x, coin.y, '#fbbf24', 10);
        onCoinCollected(coin);
      }
    }
  }

  // 6. Enemy Logic & Collisions
  for (const enemy of level.enemies) {
    if (!enemy.alive) continue;

    // Patrol movement
    enemy.x += enemy.vx;
    if (enemy.x <= enemy.startX) {
      enemy.x = enemy.startX;
      enemy.vx = Math.abs(enemy.vx);
    } else if (enemy.x >= enemy.endX) {
      enemy.x = enemy.endX;
      enemy.vx = -Math.abs(enemy.vx);
    }

    // Player collision with enemy
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      // Stomp from above: player falling down and feet are near the top of enemy
      if (player.vy > 0 && player.y + player.height - player.vy <= enemy.y + 16) {
        enemy.alive = false;
        enemy.squished = true;
        player.vy = -physics.jumpForce * 0.72; // Bounce off enemy
        createParticleBurst(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, '#ef4444', 16);
        onEnemyStomp(enemy);
      } else if (!player.isInvulnerable) {
        // Side collision: take damage
        player.isInvulnerable = true;
        player.invulnerableTimer = 80;
        player.vy = -6;
        player.vx = player.facingRight ? -4 : 4;
        createParticleBurst(player.x + player.width / 2, player.y + player.height / 2, '#f43f5e', 12);
        onPlayerHitEnemy();
      }
    }
  }

  // Invulnerability timer countdown
  if (player.isInvulnerable) {
    player.invulnerableTimer--;
    if (player.invulnerableTimer <= 0) {
      player.isInvulnerable = false;
    }
  }

  // 7. Flagpole & Castle Victory Check
  if (!level.flagpole.reached && player.x + player.width >= level.flagpole.x - 10) {
    level.flagpole.reached = true;
    createParticleBurst(level.flagpole.x, level.flagpole.y + 50, '#38bdf8', 25);
    createParticleBurst(level.flagpole.x, level.flagpole.y + 150, '#fbbf24', 25);
    onGoalReached();
  }

  // 8. Animation Cycle
  player.animTimer++;
  if (Math.abs(player.vx) > 0.5) {
    if (player.animTimer % 6 === 0) {
      player.animFrame = (player.animFrame + 1) % 4;
    }
  } else {
    player.animFrame = 0;
  }
}
