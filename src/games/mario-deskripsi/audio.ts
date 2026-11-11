import { safeStorage } from '@/lib/safeStorage';

/**
 * Web Audio API Retro Chiptune & SFX Synthesizer
 * Built specifically for Super Deskripsi (Mario Platformer)
 * Zero external audio files, 100% offline-ready, auto-lifecycle management.
 */
class MarioPlatformerAudio {
  private ctx: AudioContext | null = null;
  private isBgmPlaying: boolean = false;
  private bgmIntervalId: number | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private volume: number = 0.35;
  private melodyStep: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const savedSound = safeStorage.getItem('mario_sound_enabled');
      if (savedSound !== null) this.soundEnabled = savedSound === 'true';

      const savedMusic = safeStorage.getItem('mario_music_enabled');
      if (savedMusic !== null) this.musicEnabled = savedMusic === 'true';

      if (typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            this.pauseBgm();
            if (this.ctx && this.ctx.state === 'running') {
              this.ctx.suspend().catch(() => {});
            }
          } else {
            if (this.ctx && this.ctx.state === 'suspended' && this.soundEnabled) {
              this.ctx.resume().catch(() => {});
            }
            if (this.musicEnabled) {
              this.resumeBgm();
            }
          }
        });
      }
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isMuted(): boolean {
    return !this.soundEnabled;
  }

  public isMusicOn(): boolean {
    return this.musicEnabled;
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    safeStorage.setItem('mario_sound_enabled', String(this.soundEnabled));
    if (!this.soundEnabled) {
      this.pauseBgm();
    } else if (this.musicEnabled) {
      this.startBgm();
    }
    return this.soundEnabled;
  }

  public toggleMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    safeStorage.setItem('mario_music_enabled', String(this.musicEnabled));
    if (!this.musicEnabled) {
      this.pauseBgm();
    } else if (this.soundEnabled) {
      this.startBgm();
    }
    return this.musicEnabled;
  }

  // ── SOUND EFFECTS ───────────────────────────────────────────

  /** UI Click / Blip */
  public playClick() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

      gain.gain.setValueAtTime(this.volume * 0.4, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // safe fallback
    }
  }

  /** Mario Jump Sound (Frequency Sweep) */
  public playJump() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';

      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.16);

      gain.gain.setValueAtTime(this.volume * 0.45, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // safe fallback
    }
  }

  /** Coin Collect Chime (Two-tone high bell B5 -> E6) */
  public playCoin() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Tone 1: B5 (987.77 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now);
      gain1.gain.setValueAtTime(this.volume * 0.5, now);
      gain1.gain.linearRampToValueAtTime(0.001, now + 0.09);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.09);

      // Tone 2: E6 (1318.51 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, now + 0.08);
      gain2.gain.setValueAtTime(this.volume * 0.55, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.38);
    } catch {
      // safe fallback
    }
  }

  /** Mystery Block Bump / Hit */
  public playBump() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';

      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.12);

      gain.gain.setValueAtTime(this.volume * 0.6, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // safe fallback
    }
  }

  /** Stomp Enemy Pop */
  public playStomp() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';

      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);

      gain.gain.setValueAtTime(this.volume * 0.6, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // safe fallback
    }
  }

  /** Power Up / Correct Linguistic Quiz Fanfare */
  public playPowerUp() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [330, 392, 659, 523, 587, 784]; // E4, G4, E5, C5, D5, G5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);

        gain.gain.setValueAtTime(this.volume * 0.4, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.001, now + i * 0.06 + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.15);
      });
    } catch {
      // safe fallback
    }
  }

  /** Player Hurt / Wrong Answer Buzz */
  public playHurt() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(70, now + 0.28);

      gain.gain.setValueAtTime(this.volume * 0.5, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // safe fallback
    }
  }

  /** Stage Clear / Castle Victory Fanfare */
  public playStageClear() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      this.pauseBgm();
      const now = ctx.currentTime;
      // Classic triumphant arpeggio sequence
      const melody = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.12 }, // G5
        { f: 1046.5, d: 0.22 }, // C6
        { f: 880.0, d: 0.16 },  // A5
        { f: 987.77, d: 0.16 },  // B5
        { f: 1046.5, d: 0.5 },  // C6 held
      ];

      let elapsed = 0;
      melody.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(note.f, now + elapsed);

        gain.gain.setValueAtTime(this.volume * 0.45, now + elapsed);
        gain.gain.exponentialRampToValueAtTime(0.001, now + elapsed + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + elapsed);
        osc.stop(now + elapsed + note.d);
        elapsed += note.d + 0.04;
      });
    } catch {
      // safe fallback
    }
  }

  // ── RETRO CHIPTUNE BGM SYNTHESIZER LOOP ─────────────────────

  /**
   * Generates a 16-step upbeat Super Mario inspired platformer melody.
   * Playful, pleasant, motivating, and strictly synthesised in browser.
   */
  public startBgm() {
    if (!this.soundEnabled || !this.musicEnabled) return;
    if (this.isBgmPlaying) return;

    const ctx = this.initCtx();
    if (!ctx) return;

    this.isBgmPlaying = true;
    this.melodyStep = 0;

    // Upbeat C Major Pentatonic & diatonic friendly melody:
    // Notes in Hz: E5, E5, E5, C5, E5, G5, G4, C5, G4, E4, A4, B4, Bb4, A4, G4, E5
    const leadNotes = [
      659.25, 0, 659.25, 0, 659.25, 523.25, 659.25, 0,
      783.99, 0, 0, 0, 392.00, 0, 0, 0,
      523.25, 0, 0, 392.00, 0, 0, 329.63, 0,
      440.00, 0, 493.88, 466.16, 440.00, 0, 392.00, 659.25
    ];

    // Bassline (Triangle wave, 1 octave below)
    const bassNotes = [
      261.63, 196.00, 261.63, 196.00, 261.63, 196.00, 261.63, 196.00,
      349.23, 261.63, 349.23, 261.63, 392.00, 196.00, 392.00, 196.00,
      261.63, 196.00, 261.63, 196.00, 220.00, 164.81, 220.00, 164.81,
      174.61, 220.00, 196.00, 246.94, 261.63, 196.00, 261.63, 0
    ];

    const stepDurationMs = 125; // 120-130 BPM feel

    this.bgmIntervalId = window.setInterval(() => {
      if (!this.isBgmPlaying || !this.soundEnabled || !this.musicEnabled) return;
      if (!ctx || ctx.state !== 'running') return;

      const step = this.melodyStep % leadNotes.length;
      const leadFreq = leadNotes[step];
      const bassFreq = bassNotes[step];
      const now = ctx.currentTime;

      // Play Lead Voice
      if (leadFreq > 0) {
        try {
          const leadOsc = ctx.createOscillator();
          const leadGain = ctx.createGain();
          leadOsc.type = 'square';
          leadOsc.frequency.setValueAtTime(leadFreq, now);

          leadGain.gain.setValueAtTime(this.volume * 0.12, now);
          leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

          leadOsc.connect(leadGain);
          leadGain.connect(ctx.destination);

          leadOsc.start(now);
          leadOsc.stop(now + 0.11);
        } catch {}
      }

      // Play Bass Voice
      if (bassFreq > 0) {
        try {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(bassFreq, now);

          bassGain.gain.setValueAtTime(this.volume * 0.18, now);
          bassGain.gain.linearRampToValueAtTime(0.001, now + 0.12);

          bassOsc.connect(bassGain);
          bassGain.connect(ctx.destination);

          bassOsc.start(now);
          bassOsc.stop(now + 0.12);
        } catch {}
      }

      this.melodyStep++;
    }, stepDurationMs);
  }

  public pauseBgm() {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId !== null) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }

  public resumeBgm() {
    if (this.musicEnabled && this.soundEnabled && !this.isBgmPlaying) {
      this.startBgm();
    }
  }

  public stopBgm() {
    this.pauseBgm();
    this.melodyStep = 0;
  }
}

export const marioAudio = new MarioPlatformerAudio();
