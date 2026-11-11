import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  CharacterDef,
  LinguisticQuestion,
  Particle,
} from './types';
import {
  createLevel,
  createInitialPlayer,
  updatePhysics,
  PlayerState,
  LevelData,
  LEVEL_WIDTH,
  LEVEL_HEIGHT,
  GROUND_Y,
} from './engine';
import { marioAudio } from './audio';

interface Props {
  character: CharacterDef;
  onTriggerQuiz: (question: LinguisticQuestion) => void;
  onGameOver: (score: number) => void;
  onVictory: (score: number, coins: number, timeLeft: number) => void;
  isPaused: boolean;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  coins: number;
  setCoins: React.Dispatch<React.SetStateAction<number>>;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
}

export const MarioDeskripsiCanvas: React.FC<Props> = ({
  character,
  onTriggerQuiz,
  onGameOver,
  onVictory,
  isPaused,
  score,
  setScore,
  coins,
  setCoins,
  lives: _lives,
  setLives,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Game Engine State
  const playerRef = useRef<PlayerState>(createInitialPlayer(character));
  const levelRef = useRef<LevelData>(createLevel());
  const particlesRef = useRef<Particle[]>([]);
  const cameraXRef = useRef<number>(0);
  const timeLeftRef = useRef<number>(300);

  // Input states
  const keysRef = useRef({
    left: false,
    right: false,
    jump: false,
    dash: false,
  });

  // Touch virtual buttons state
  const [touchLeft, setTouchLeft] = useState(false);
  const [touchRight, setTouchRight] = useState(false);
  const [touchJump, setTouchJump] = useState(false);

  // Particle helper
  const addParticleBurst = useCallback((x: number, y: number, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = 1.5 + Math.random() * 3.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: 3 + Math.random() * 4,
        color,
        alpha: 1,
        life: 0,
        maxLife: 20 + Math.random() * 15,
      });
    }
  }, []);

  // Jump Action trigger
  const triggerJump = useCallback(() => {
    const player = playerRef.current;
    if (player.isOnGround) {
      player.vy = -character.physics.jumpForce;
      player.isOnGround = false;
      player.isJumping = true;
      player.jumpCount = 1;
      marioAudio.playJump();
      addParticleBurst(player.x + player.width / 2, player.y + player.height, '#ffffff', 6);
    } else if (character.physics.canDoubleJump && player.jumpCount === 1) {
      // Bimo Double Jump
      player.vy = -character.physics.jumpForce * 0.92;
      player.jumpCount = 2;
      marioAudio.playJump();
      addParticleBurst(player.x + player.width / 2, player.y + player.height, '#10b981', 12);
    }
  }, [character, addParticleBurst]);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        if (!keysRef.current.jump) {
          triggerJump();
        }
        keysRef.current.jump = true;
      }
      if (e.key === 'Shift') {
        keysRef.current.dash = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keysRef.current.jump = false;
        // Variable jump height: cut vertical velocity when releasing jump early
        if (playerRef.current.vy < -3) {
          playerRef.current.vy = -3;
        }
      }
      if (e.key === 'Shift') {
        keysRef.current.dash = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerJump]);

  // Sync touch controls
  useEffect(() => {
    keysRef.current.left = touchLeft;
    keysRef.current.right = touchRight;
    if (touchJump && !keysRef.current.jump) {
      triggerJump();
    }
    keysRef.current.jump = touchJump;
  }, [touchLeft, touchRight, touchJump, triggerJump]);

  // Timer countdown
  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      timeLeftRef.current -= 1;
      if (timeLeftRef.current <= 0) {
        onGameOver(score);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, onGameOver, score]);

  // Main 60 FPS Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const gameLoop = () => {
      if (!isPaused) {
        const player = playerRef.current;
        const level = levelRef.current;

        // 1. Update Physics & Collisions
        updatePhysics(
          player,
          character,
          keysRef.current,
          level,
          // onMysteryHit
          (_id, question) => {
            marioAudio.playBump();
            onTriggerQuiz(question);
          },
          // onEnemyStomp
          (_enemy) => {
            marioAudio.playStomp();
            setScore((prev) => prev + 200);
          },
          // onPlayerHitEnemy
          () => {
            marioAudio.playHurt();
            setLives((prev) => {
              const next = prev - 1;
              if (next <= 0) {
                onGameOver(score);
              }
              return Math.max(0, next);
            });
          },
          // onCoinCollected
          (_coin) => {
            marioAudio.playCoin();
            setCoins((prev) => prev + 1);
            setScore((prev) => prev + 50);
          },
          // onGoalReached
          () => {
            marioAudio.playStageClear();
            onVictory(score + 1000, coins, timeLeftRef.current);
          },
          addParticleBurst
        );

        // Fall into pit check
        if (player.y > LEVEL_HEIGHT + 40) {
          marioAudio.playHurt();
          setLives((prev) => {
            const next = prev - 1;
            if (next <= 0) {
              onGameOver(score);
            } else {
              // Respawn nearby safe spot
              player.x = Math.max(80, player.x - 240);
              player.y = GROUND_Y - 80;
              player.vy = 0;
              player.vx = 0;
            }
            return Math.max(0, next);
          });
        }

        // 2. Smooth Camera Tracking
        const targetCamX = player.x - canvas.width * 0.32;
        const maxCamX = LEVEL_WIDTH - canvas.width;
        cameraXRef.current += (Math.max(0, Math.min(targetCamX, maxCamX)) - cameraXRef.current) * 0.12;

        // 3. Update Particles
        particlesRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.15;
          p.life++;
          p.alpha = 1 - p.life / p.maxLife;
        });
        particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);
      }

      // ── RENDERING ──────────────────────────────────────────
      const camX = cameraXRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // A. Sky Gradient Background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#38bdf8'); // Sky Blue
      skyGrad.addColorStop(0.65, '#bae6fd');
      skyGrad.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // B. Parallax Distant Hills (Layer 1 - Far: 0.2x speed)
      ctx.fillStyle = '#86efac';
      ctx.beginPath();
      ctx.arc(400 - camX * 0.2, 580, 320, Math.PI, 0, false);
      ctx.arc(1100 - camX * 0.2, 590, 380, Math.PI, 0, false);
      ctx.arc(1800 - camX * 0.2, 580, 340, Math.PI, 0, false);
      ctx.arc(2600 - camX * 0.2, 600, 420, Math.PI, 0, false);
      ctx.fill();

      // C. Parallax Near Hills (Layer 2 - Near: 0.4x speed)
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.arc(200 - camX * 0.4, 560, 220, Math.PI, 0, false);
      ctx.arc(750 - camX * 0.4, 570, 260, Math.PI, 0, false);
      ctx.arc(1450 - camX * 0.4, 560, 240, Math.PI, 0, false);
      ctx.arc(2200 - camX * 0.4, 570, 260, Math.PI, 0, false);
      ctx.arc(2950 - camX * 0.4, 560, 250, Math.PI, 0, false);
      ctx.fill();

      // D. Floating Clouds in Sky
      levelRef.current.clouds.forEach((c) => {
        const renderX = c.x - camX * c.speed;
        if (renderX + 150 > 0 && renderX < canvas.width + 100) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(renderX, c.y, 22 * c.scale, 0, Math.PI * 2);
          ctx.arc(renderX + 22 * c.scale, c.y - 10 * c.scale, 26 * c.scale, 0, Math.PI * 2);
          ctx.arc(renderX + 48 * c.scale, c.y - 4 * c.scale, 20 * c.scale, 0, Math.PI * 2);
          ctx.arc(renderX + 66 * c.scale, c.y + 2 * c.scale, 16 * c.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // E. Draw Platforms, Bricks, Mystery Blocks, Pipes
      levelRef.current.platforms.forEach((plat) => {
        const screenX = plat.x - camX;
        if (screenX + plat.width < -50 || screenX > canvas.width + 50) return;

        if (plat.type === 'ground') {
          // Lush Green Top Grass
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(screenX, plat.y, plat.width, 16);
          // Darker green grass fringe
          ctx.fillStyle = '#16a34a';
          for (let gx = 0; gx < plat.width; gx += 20) {
            ctx.beginPath();
            ctx.moveTo(screenX + gx, plat.y + 16);
            ctx.lineTo(screenX + gx + 10, plat.y + 24);
            ctx.lineTo(screenX + gx + 20, plat.y + 16);
            ctx.fill();
          }
          // Earth Dirt / Subsoil
          ctx.fillStyle = '#92400e';
          ctx.fillRect(screenX, plat.y + 24, plat.width, plat.height - 24);
          // Dirt stone texture
          ctx.fillStyle = '#78350f';
          for (let sx = 10; sx < plat.width - 20; sx += 45) {
            ctx.fillRect(screenX + sx, plat.y + 36, 18, 12);
            ctx.fillRect(screenX + sx + 22, plat.y + 58, 16, 10);
          }
        } else if (plat.type === 'mystery') {
          // Mario Mystery Block (`?`)
          if (plat.hit) {
            // Inactive solid brown block
            ctx.fillStyle = '#a16207';
            ctx.fillRect(screenX, plat.y, plat.width, plat.height);
            ctx.strokeStyle = '#713f12';
            ctx.lineWidth = 3;
            ctx.strokeRect(screenX, plat.y, plat.width, plat.height);
          } else {
            // Glowing Golden Animated `?` Block
            const pulse = (Math.sin(Date.now() / 180) + 1) * 0.5;
            ctx.fillStyle = '#f59e0b';
            ctx.fillRect(screenX, plat.y, plat.width, plat.height);

            // Shading & 3D bevel
            ctx.fillStyle = '#fef08a';
            ctx.fillRect(screenX, plat.y, plat.width, 4);
            ctx.fillRect(screenX, plat.y, 4, plat.height);
            ctx.fillStyle = '#b45309';
            ctx.fillRect(screenX, plat.y + plat.height - 4, plat.width, 4);
            ctx.fillRect(screenX + plat.width - 4, plat.y, 4, plat.height);

            // 4 Corner Rivets
            ctx.fillStyle = '#78350f';
            ctx.fillRect(screenX + 5, plat.y + 5, 4, 4);
            ctx.fillRect(screenX + plat.width - 9, plat.y + 5, 4, 4);
            ctx.fillRect(screenX + 5, plat.y + plat.height - 9, 4, 4);
            ctx.fillRect(screenX + plat.width - 9, plat.y + plat.height - 9, 4, 4);

            // Question Mark `?`
            ctx.fillStyle = pulse > 0.5 ? '#ffffff' : '#fef9c3';
            ctx.font = '900 24px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('?', screenX + plat.width / 2, plat.y + plat.height / 2 + 1);
          }
        } else if (plat.type === 'brick') {
          // Classic Mario Orange-Brown Brick
          ctx.fillStyle = '#c2410c';
          ctx.fillRect(screenX, plat.y, plat.width, plat.height);
          ctx.strokeStyle = '#431407';
          ctx.lineWidth = 2;
          ctx.strokeRect(screenX, plat.y, plat.width, plat.height);

          // Brick Mortar Pattern
          ctx.fillStyle = '#1c1917';
          ctx.fillRect(screenX, plat.y + plat.height / 2, plat.width, 2);
          ctx.fillRect(screenX + plat.width / 2, plat.y, 2, plat.height / 2);
          ctx.fillRect(screenX + plat.width / 4, plat.y + plat.height / 2, 2, plat.height / 2);
          ctx.fillRect(screenX + (plat.width * 3) / 4, plat.y + plat.height / 2, 2, plat.height / 2);
        } else if (plat.type === 'pipe') {
          // Mario Green Warp Pipe
          const lipH = 24;
          // Pipe Lip (Wider top)
          ctx.fillStyle = '#15803d';
          ctx.fillRect(screenX - 4, plat.y, plat.width + 8, lipH);
          ctx.fillStyle = '#4ade80';
          ctx.fillRect(screenX - 2, plat.y + 2, 8, lipH - 4);
          ctx.strokeStyle = '#14532d';
          ctx.lineWidth = 3;
          ctx.strokeRect(screenX - 4, plat.y, plat.width + 8, lipH);

          // Pipe Body
          ctx.fillStyle = '#16a34a';
          ctx.fillRect(screenX, plat.y + lipH, plat.width, plat.height - lipH);
          ctx.fillStyle = '#86efac';
          ctx.fillRect(screenX + 3, plat.y + lipH, 8, plat.height - lipH);
          ctx.strokeStyle = '#14532d';
          ctx.strokeRect(screenX, plat.y + lipH, plat.width, plat.height - lipH);
        } else if (plat.type === 'cloud') {
          // Fluffy Platform Cloud
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.roundRect(screenX, plat.y, plat.width, plat.height, 14);
          ctx.fill();
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // F. Draw Spinning Coins
      const nowMs = Date.now();
      levelRef.current.coins.forEach((coin) => {
        if (coin.collected) return;
        const screenX = coin.x - camX;
        if (screenX < -30 || screenX > canvas.width + 30) return;

        // 3D spinning coin width modulation
        const spin = Math.cos(nowMs / 140 + coin.bobOffset);
        const coinW = Math.max(3, coin.radius * Math.abs(spin));
        const bobY = coin.y + Math.sin(nowMs / 200 + coin.bobOffset) * 4;

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.ellipse(screenX, bobY, coinW, coin.radius, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner coin core
        if (coinW > 6) {
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.ellipse(screenX, bobY, coinW * 0.5, coin.radius * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // G. Draw Enemies
      levelRef.current.enemies.forEach((enemy) => {
        if (!enemy.alive && !enemy.squished) return;
        const screenX = enemy.x - camX;
        if (screenX < -50 || screenX > canvas.width + 50) return;

        if (enemy.squished) {
          // Squished flat enemy
          ctx.fillStyle = '#b91c1c';
          ctx.fillRect(screenX, enemy.y + enemy.height - 8, enemy.width, 8);
          return;
        }

        if (enemy.type === 'kumbang') {
          // Kumbang Rancu (Red & Black Beetle with walking feet)
          ctx.fillStyle = '#dc2626';
          ctx.beginPath();
          ctx.arc(screenX + enemy.width / 2, enemy.y + enemy.height / 2, 16, Math.PI, 0, false);
          ctx.fill();
          ctx.strokeStyle = '#7f1d1d';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Black Shell Spots
          ctx.fillStyle = '#18181b';
          ctx.beginPath();
          ctx.arc(screenX + enemy.width / 2 - 5, enemy.y + enemy.height / 2 - 6, 3, 0, Math.PI * 2);
          ctx.arc(screenX + enemy.width / 2 + 5, enemy.y + enemy.height / 2 - 6, 3, 0, Math.PI * 2);
          ctx.arc(screenX + enemy.width / 2, enemy.y + enemy.height / 2 - 12, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Angry Eyes
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(screenX + (enemy.vx < 0 ? 4 : 18), enemy.y + enemy.height / 2 - 4, 6, 6);
          ctx.fillStyle = '#000000';
          ctx.fillRect(screenX + (enemy.vx < 0 ? 5 : 21), enemy.y + enemy.height / 2 - 3, 3, 3);
        } else {
          // Monster Klise (Purple Mushroom Spore)
          ctx.fillStyle = '#a855f7';
          ctx.beginPath();
          ctx.arc(screenX + enemy.width / 2, enemy.y + 14, 15, Math.PI, 0, false);
          ctx.fill();
          ctx.fillStyle = '#fed7aa';
          ctx.fillRect(screenX + 6, enemy.y + 14, enemy.width - 12, enemy.height - 14);

          // Eyes
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(screenX + 10, enemy.y + 17, 3, 6);
          ctx.fillRect(screenX + 20, enemy.y + 17, 3, 6);
        }
      });

      // H. Draw Flagpole & Istana Teks Deskripsi
      const fp = levelRef.current.flagpole;
      const fpScreenX = fp.x - camX;
      if (fpScreenX > -100 && fpScreenX < canvas.width + 100) {
        // Flagpole Ball on top
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(fpScreenX, fp.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ca8a04';
        ctx.stroke();

        // Pole
        ctx.fillStyle = '#64748b';
        ctx.fillRect(fpScreenX - 3, fp.y, 6, fp.height);

        // Red Banner Flag
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(fpScreenX - 3, fp.y + 15);
        ctx.lineTo(fpScreenX - 45, fp.y + 35);
        ctx.lineTo(fpScreenX - 3, fp.y + 55);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#b91c1c';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Castle (Istana Teks Deskripsi)
      const castle = levelRef.current.castle;
      const castleScreenX = castle.x - camX;
      if (castleScreenX > -250 && castleScreenX < canvas.width + 100) {
        // Main Keep
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(castleScreenX, castle.y, castle.width, castle.height);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.strokeRect(castleScreenX, castle.y, castle.width, castle.height);

        // Castle Battlements (Crenellations)
        for (let bx = 0; bx < castle.width; bx += 36) {
          ctx.fillStyle = '#cbd5e1';
          ctx.fillRect(castleScreenX + bx, castle.y - 18, 22, 18);
          ctx.strokeRect(castleScreenX + bx, castle.y - 18, 22, 18);
        }

        // Castle Gate Doorway
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(castleScreenX + castle.width / 2, castle.y + castle.height - 40, 26, Math.PI, 0, false);
        ctx.rect(castleScreenX + castle.width / 2 - 26, castle.y + castle.height - 40, 52, 40);
        ctx.fill();

        // Flag atop castle
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(castleScreenX + castle.width / 2 - 2, castle.y - 45, 4, 30);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(castleScreenX + castle.width / 2 + 2, castle.y - 45, 30, 18);

        // Signboard
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(castleScreenX + 15, castle.y + 30, castle.width - 30, 26);
        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ISTANA DESKRIPSI', castleScreenX + castle.width / 2, castle.y + 47);
      }

      // I. Draw Player Character
      const player = playerRef.current;
      const playerScreenX = player.x - camX;

      // Flashing when invulnerable
      if (!player.isInvulnerable || Math.floor(Date.now() / 80) % 2 === 0) {
        ctx.save();
        ctx.translate(playerScreenX + player.width / 2, player.y + player.height / 2);
        if (!player.facingRight) {
          ctx.scale(-1, 1);
        }

        // Draw Player Sprite based on chosen character
        const w = player.width;
        const h = player.height;

        if (character.id === 'rian') {
          // RIAN (Red Cap, Adventure Vest, Magnifying Glass)
          // Body/Torso
          ctx.fillStyle = '#e11d48'; // Red vest
          ctx.fillRect(-w * 0.35, -h * 0.1, w * 0.7, h * 0.5);
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(-w * 0.12, -h * 0.1, w * 0.24, h * 0.5);

          // Head & Cap
          ctx.fillStyle = '#fed7aa'; // Face skin
          ctx.beginPath();
          ctx.arc(0, -h * 0.28, 12, 0, Math.PI * 2);
          ctx.fill();

          // Red Cap with visor
          ctx.fillStyle = '#e11d48';
          ctx.beginPath();
          ctx.arc(0, -h * 0.34, 13, Math.PI, 0, false);
          ctx.fill();
          ctx.fillRect(0, -h * 0.34, 15, 4); // Cap visor facing forward

          // Eye
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(3, -h * 0.29, 3, 3);

          // Animated Legs
          ctx.fillStyle = '#1e3a8a'; // Blue pants
          if (player.isOnGround && Math.abs(player.vx) > 0.5) {
            const legSwing = Math.sin(player.animTimer * 0.45) * 8;
            ctx.fillRect(-8 + legSwing, h * 0.38, 7, 10);
            ctx.fillRect(1 - legSwing, h * 0.38, 7, 10);
          } else {
            ctx.fillRect(-7, h * 0.38, 6, 10);
            ctx.fillRect(1, h * 0.38, 6, 10);
          }
        } else if (character.id === 'maya') {
          // MAYA (Purple Beret, Cyan Floating Scarf, Robe)
          // Purple Robe
          ctx.fillStyle = '#9333ea';
          ctx.fillRect(-w * 0.38, -h * 0.08, w * 0.76, h * 0.5);

          // Cyan Scarf blowing in the wind
          ctx.fillStyle = '#06b6d4';
          ctx.fillRect(-w * 0.3, -h * 0.12, w * 0.6, 6);
          const scarfFlutter = Math.sin(Date.now() / 120) * 4;
          ctx.beginPath();
          ctx.moveTo(-w * 0.2, -h * 0.08);
          ctx.lineTo(-w * 0.6, -h * 0.04 + scarfFlutter);
          ctx.lineTo(-w * 0.2, 0);
          ctx.fill();

          // Head & Purple Beret
          ctx.fillStyle = '#fde68a';
          ctx.beginPath();
          ctx.arc(0, -h * 0.28, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#7e22ce'; // Beret
          ctx.beginPath();
          ctx.ellipse(0, -h * 0.36, 15, 6, 0, 0, Math.PI * 2);
          ctx.fill();

          // Eye
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(3, -h * 0.29, 3, 3);

          // Legs
          ctx.fillStyle = '#475569';
          ctx.fillRect(-6, h * 0.38, 5, 10);
          ctx.fillRect(1, h * 0.38, 5, 10);
        } else {
          // BIMO (Yellow Helmet, Emerald Safari Jacket)
          ctx.fillStyle = '#059669'; // Emerald jacket
          ctx.fillRect(-w * 0.4, -h * 0.1, w * 0.8, h * 0.5);
          ctx.fillStyle = '#d97706';
          ctx.fillRect(-w * 0.1, -h * 0.1, w * 0.2, h * 0.5);

          // Head & Yellow Helmet
          ctx.fillStyle = '#fed7aa';
          ctx.beginPath();
          ctx.arc(0, -h * 0.28, 12, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#eab308'; // Helmet
          ctx.beginPath();
          ctx.arc(0, -h * 0.34, 14, Math.PI, 0, false);
          ctx.fill();
          ctx.fillRect(-14, -h * 0.34, 28, 4);

          // Eye
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(3, -h * 0.29, 3, 3);

          // Legs
          ctx.fillStyle = '#78350f'; // Khaki brown pants
          if (player.isOnGround && Math.abs(player.vx) > 0.5) {
            const legSwing = Math.sin(player.animTimer * 0.45) * 8;
            ctx.fillRect(-8 + legSwing, h * 0.38, 7, 10);
            ctx.fillRect(1 - legSwing, h * 0.38, 7, 10);
          } else {
            ctx.fillRect(-7, h * 0.38, 6, 10);
            ctx.fillRect(1, h * 0.38, 6, 10);
          }
        }

        ctx.restore();
      }

      // J. Draw Particle Effects
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x - camX, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [
    character,
    isPaused,
    onTriggerQuiz,
    onGameOver,
    onVictory,
    score,
    coins,
    setScore,
    setCoins,
    setLives,
    addParticleBurst,
  ]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden select-none touch-none">
      <canvas
        ref={canvasRef}
        width={960}
        height={LEVEL_HEIGHT}
        className="w-full h-full object-cover block"
      />

      {/* ── MOBILE / TABLET ON-SCREEN VIRTUAL JOYSTICK CONTROLS ── */}
      <div className="absolute inset-x-0 bottom-3 z-30 px-4 flex items-end justify-between pointer-events-none sm:hidden">
        {/* Left / Right Buttons */}
        <div className="flex gap-2 pointer-events-auto">
          <button
            type="button"
            onPointerDown={() => setTouchLeft(true)}
            onPointerUp={() => setTouchLeft(false)}
            onPointerLeave={() => setTouchLeft(false)}
            className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-black text-2xl shadow-lg active:scale-95 transition-all ${
              touchLeft ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-slate-900/80 border-white/40 text-white'
            }`}
          >
            ◀
          </button>
          <button
            type="button"
            onPointerDown={() => setTouchRight(true)}
            onPointerUp={() => setTouchRight(false)}
            onPointerLeave={() => setTouchRight(false)}
            className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-black text-2xl shadow-lg active:scale-95 transition-all ${
              touchRight ? 'bg-amber-400 border-amber-500 text-slate-950' : 'bg-slate-900/80 border-white/40 text-white'
            }`}
          >
            ▶
          </button>
        </div>

        {/* Jump Button (Right Thumb) */}
        <div className="pointer-events-auto">
          <button
            type="button"
            onPointerDown={() => setTouchJump(true)}
            onPointerUp={() => setTouchJump(false)}
            onPointerLeave={() => setTouchJump(false)}
            className={`w-16 h-16 rounded-2xl border-3 flex flex-col items-center justify-center font-black text-xs shadow-xl active:scale-95 transition-all ${
              touchJump
                ? 'bg-emerald-400 border-emerald-500 text-slate-950'
                : 'bg-emerald-500/90 border-white/60 text-white shadow-[0_4px_0_#065f46]'
            }`}
          >
            <span className="text-xl leading-none">⬆️</span>
            <span className="tracking-widest uppercase mt-0.5 font-black text-[9px]">LOMPAT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
