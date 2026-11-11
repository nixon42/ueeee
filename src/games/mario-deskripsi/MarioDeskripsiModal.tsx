import React, { useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Music,
  X,
  Sparkles,
  Heart,
  Coins,
  User,
  BookOpen,
  Star,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CharacterId, CharacterDef, LinguisticQuestion, GameStatus } from './types';
import { CHARACTERS } from './characters';
import { marioAudio } from './audio';
import { CharacterSelectModal } from './CharacterSelectModal';
import { LinguisticQuizPopup } from './LinguisticQuizPopup';
import { MarioDeskripsiCanvas } from './MarioDeskripsiCanvas';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialCharacterId?: CharacterId;
}

export const MarioDeskripsiModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialCharacterId = 'rian',
}) => {
  // Modal flow state: select -> playing -> (quiz / paused) -> victory / gameover
  const [status, setStatus] = useState<GameStatus>('select');
  const [selectedCharId, setSelectedCharId] = useState<CharacterId>(initialCharacterId);
  const [activeQuestion, setActiveQuestion] = useState<LinguisticQuestion | null>(null);

  // Gameplay HUD states
  const [score, setScore] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [gameSessionId, setGameSessionId] = useState<number>(1);
  const [finalSummary, setFinalSummary] = useState<{
    score: number;
    coins: number;
    timeLeft: number;
    totalScore: number;
    stars: number;
  } | null>(null);

  // Audio toggles state
  const [soundOn, setSoundOn] = useState<boolean>(!marioAudio.isMuted());
  const [musicOn, setMusicOn] = useState<boolean>(marioAudio.isMusicOn());

  const selectedChar: CharacterDef = CHARACTERS[selectedCharId] || CHARACTERS.rian;

  // Reset audio & state when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStatus('select');
      setScore(0);
      setCoins(0);
      setLives(3);
      setActiveQuestion(null);
      setFinalSummary(null);
    } else {
      document.body.style.overflow = '';
      marioAudio.stopBgm();
    }
    return () => {
      document.body.style.overflow = '';
      marioAudio.stopBgm();
    };
  }, [isOpen]);

  // Handle ESC key to pause or close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (status === 'playing') {
          setStatus('paused');
          marioAudio.pauseBgm();
        } else if (status === 'paused') {
          setStatus('playing');
          if (musicOn) marioAudio.resumeBgm();
        } else if (status === 'select') {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, status, musicOn, onClose]);

  // Start new run with selected character
  const handleStartGame = () => {
    setScore(0);
    setCoins(0);
    setLives(3);
    setActiveQuestion(null);
    setFinalSummary(null);
    setGameSessionId((prev) => prev + 1);
    setStatus('playing');
    if (musicOn) {
      marioAudio.startBgm();
    }
  };

  // Restart current run
  const handleRestart = () => {
    setScore(0);
    setCoins(0);
    setLives(3);
    setActiveQuestion(null);
    setFinalSummary(null);
    setGameSessionId((prev) => prev + 1);
    setStatus('playing');
    if (musicOn) {
      marioAudio.startBgm();
    }
  };

  // Switch character
  const handleChangeCharacter = () => {
    marioAudio.stopBgm();
    setStatus('select');
  };

  // Trigger mystery box quiz
  const handleTriggerQuiz = useCallback((question: LinguisticQuestion) => {
    setActiveQuestion(question);
    setStatus('quiz');
  }, []);

  // Answered quiz
  const handleQuizAnswer = (correct: boolean, points: number) => {
    setScore((prev) => prev + points);
    if (correct) {
      setCoins((prev) => prev + 1);
    }
    setActiveQuestion(null);
    setStatus('playing');
  };

  // Game over handler
  const handleGameOver = useCallback((currentScore: number) => {
    marioAudio.stopBgm();
    marioAudio.playHurt();
    setFinalSummary({
      score: currentScore,
      coins,
      timeLeft: 0,
      totalScore: currentScore,
      stars: 0,
    });
    setStatus('gameover');
  }, [coins]);

  // Victory handler
  const handleVictory = useCallback(
    (finalScoreVal: number, finalCoinsVal: number, timeLeftVal: number) => {
      marioAudio.stopBgm();
      const timeBonus = Math.max(0, timeLeftVal) * 10;
      const coinBonus = finalCoinsVal * 50;
      const total = finalScoreVal + timeBonus + coinBonus;
      let stars = 1;
      if (total >= 3000) stars = 3;
      else if (total >= 1800) stars = 2;

      setFinalSummary({
        score: finalScoreVal,
        coins: finalCoinsVal,
        timeLeft: timeLeftVal,
        totalScore: total,
        stars,
      });
      setStatus('victory');

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
        }, 350);
      } catch {
        // Safe fallback in headless/test environments
      }
    },
    []
  );

  // Audio toggles
  const handleToggleSound = () => {
    const s = marioAudio.toggleSound();
    setSoundOn(s);
  };

  const handleToggleMusic = () => {
    const m = marioAudio.toggleMusic();
    setMusicOn(m);
  };

  // Toggle pause
  const handleTogglePause = () => {
    if (status === 'playing') {
      setStatus('paused');
      marioAudio.pauseBgm();
    } else if (status === 'paused') {
      setStatus('playing');
      if (musicOn) marioAudio.resumeBgm();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Petualangan Teks Deskripsi Mario Style"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-hidden select-none"
    >
      {/* Screen 1: Character Selection Modal */}
      {status === 'select' && (
        <CharacterSelectModal
          selectedId={selectedCharId}
          onSelect={(id) => setSelectedCharId(id)}
          onStartGame={handleStartGame}
          onClose={onClose}
        />
      )}

      {/* Screen 2: Active Gameplay Screen with Arcade Frame & HUD */}
      {status !== 'select' && (
        <div className="relative w-full max-w-6xl aspect-[16/10] sm:aspect-[16/9.5] max-h-[96vh] rounded-3xl bg-slate-900 border-4 border-amber-400 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden">
          {/* Top Retro Arcade HUD */}
          <header className="shrink-0 h-14 sm:h-16 bg-slate-950/95 border-b-2 border-amber-400/40 px-3 sm:px-6 flex items-center justify-between text-white z-20">
            {/* Left: Close & Character Badge */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  marioAudio.playClick();
                  marioAudio.stopBgm();
                  onClose();
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/50 flex items-center justify-center text-rose-300 transition-colors"
                title="Keluar dari Game"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-lg">{selectedChar.avatarEmoji}</span>
                <div className="hidden md:flex flex-col">
                  <span className="text-xs font-black text-amber-300 leading-tight">
                    {selectedChar.name}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {selectedChar.specialAbility}
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Score, Coins, Lives in authentic arcade style */}
            <div className="flex items-center gap-3 sm:gap-6 font-mono">
              {/* Score */}
              <div className="flex flex-col items-center">
                <span className="text-[9px] sm:text-[10px] font-black text-amber-400 uppercase tracking-wider">
                  SKOR
                </span>
                <span className="text-xs sm:text-base font-black text-white">
                  {score.toString().padStart(6, '0')}
                </span>
              </div>

              {/* Coins */}
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-400/40">
                <Coins size={14} className="text-amber-400" />
                <span className="text-xs sm:text-sm font-black text-amber-300">
                  x{coins.toString().padStart(2, '0')}
                </span>
              </div>

              {/* Lives */}
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded-lg bg-rose-500/20 border border-rose-400/40">
                <Heart size={14} className="text-rose-400 fill-rose-400" />
                <span className="text-xs sm:text-sm font-black text-rose-300">
                  x{lives}
                </span>
              </div>

              {/* World Tag */}
              <div className="hidden lg:flex flex-col items-center">
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-wider">
                  DUNIA
                </span>
                <span className="text-xs font-black text-indigo-200">1-1 KELAS 7</span>
              </div>
            </div>

            {/* Right: Audio toggles & Pause */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleToggleMusic}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-colors ${
                  musicOn
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
                title={musicOn ? 'Matikan Musik Chiptune' : 'Nyalakan Musik Chiptune'}
              >
                <Music size={16} />
              </button>

              <button
                onClick={handleToggleSound}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-colors ${
                  soundOn
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
                title={soundOn ? 'Matikan Efek Suara' : 'Nyalakan Efek Suara'}
              >
                {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <button
                onClick={handleTogglePause}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-colors ${
                  status === 'paused'
                    ? 'bg-amber-500 text-slate-950 font-black border-amber-400'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
                title={status === 'paused' ? 'Lanjutkan Game' : 'Jeda Game'}
              >
                {status === 'paused' ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>
          </header>

          {/* Canvas Gameplay Zone */}
          <div className="relative flex-1 bg-sky-300 overflow-hidden">
            <MarioDeskripsiCanvas
              key={gameSessionId}
              character={selectedChar}
              onTriggerQuiz={handleTriggerQuiz}
              onGameOver={handleGameOver}
              onVictory={handleVictory}
              isPaused={status !== 'playing'}
              score={score}
              setScore={setScore}
              coins={coins}
              setCoins={setCoins}
              lives={lives}
              setLives={setLives}
            />

            {/* Overlay 1: Linguistic Question Mystery Box */}
            {status === 'quiz' && activeQuestion && (
              <LinguisticQuizPopup
                question={activeQuestion}
                onAnswer={handleQuizAnswer}
              />
            )}

            {/* Overlay 2: Pause Menu */}
            {status === 'paused' && (
              <div className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                <div className="w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-amber-400/60 p-6 text-center text-white space-y-4 shadow-2xl">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-300">
                    <Pause size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-amber-300 tracking-tight">
                      PETUALANGAN DIJEDA
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Karakter aktif: <span className="text-white font-bold">{selectedChar.name}</span>
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        setStatus('playing');
                        if (musicOn) marioAudio.resumeBgm();
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 font-black text-sm text-slate-950 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Play size={16} />
                      <span>Lanjutkan Petualangan</span>
                    </button>

                    <button
                      onClick={handleRestart}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-slate-200 border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={14} />
                      <span>Mulai Ulang Level</span>
                    </button>

                    <button
                      onClick={handleChangeCharacter}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-amber-300 border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <User size={14} />
                      <span>Ganti Karakter Lain</span>
                    </button>

                    <button
                      onClick={() => {
                        marioAudio.stopBgm();
                        onClose();
                      }}
                      className="w-full py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs border border-rose-500/40 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <X size={14} />
                      <span>Keluar ke Beranda</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Overlay 3: Game Over Screen */}
            {status === 'gameover' && (
              <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in zoom-in-95">
                <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950 border-4 border-rose-500 p-6 text-center text-white space-y-4 shadow-2xl">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-rose-400">
                    <ShieldAlert size={36} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-rose-400 tracking-wider">
                      GAME OVER
                    </h2>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      Jangan berkecil hati! Seorang pengamat teks deskripsi yang cermat belajar dari setiap rintangan kata.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-3 grid grid-cols-2 gap-3 text-left">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Skor Akhir
                      </span>
                      <p className="text-base font-black text-amber-300">{score}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Koin Kosakata
                      </span>
                      <p className="text-base font-black text-yellow-300">🪙 {coins}</p>
                    </div>
                  </div>

                  {/* Quick Tip */}
                  <div className="text-[11px] text-slate-300 bg-rose-950/60 border border-rose-800/60 rounded-xl p-2.5 text-left flex items-start gap-2">
                    <HelpCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-rose-200">Tips Deskripsi:</strong> Hindari monster rancu dan gunakan kata-kata khusus (misal: <em>merona, menjulang</em>) agar pembaca dapat membayangkan objek secara nyata!
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={handleRestart}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={16} />
                      <span>Coba Lagi Sekarang</span>
                    </button>

                    <button
                      onClick={handleChangeCharacter}
                      className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <User size={14} />
                      <span>Ganti Tokoh Lain</span>
                    </button>

                    <button
                      onClick={() => {
                        marioAudio.stopBgm();
                        onClose();
                      }}
                      className="w-full py-2.5 rounded-2xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-bold text-xs transition-colors"
                    >
                      Kembali ke Menu Utama
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Overlay 4: Victory / Stage Clear Screen */}
            {status === 'victory' && finalSummary && (
              <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in zoom-in-95">
                <div className="w-full max-w-xl rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 border-4 border-amber-400 p-5 sm:p-6 text-white space-y-4 shadow-2xl my-auto">
                  {/* Victory Header */}
                  <div className="text-center space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/60 text-amber-300 text-xs font-black uppercase tracking-wider mb-1">
                      <Sparkles size={14} />
                      <span>STAGE CLEAR • DUNIA 1-1</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
                      ISTANA TEKS DESKRIPSI TERCAPAI!
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium">
                      Hebat! Kamu berhasil menaklukkan rintangan kebahasaan bersama{' '}
                      <span className="text-amber-300 font-bold">{selectedChar.name}</span>.
                    </p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center justify-center gap-2 py-1">
                    {[1, 2, 3].map((starIdx) => (
                      <div
                        key={starIdx}
                        className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
                          starIdx <= finalSummary.stars
                            ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-300 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-110'
                            : 'bg-slate-800 border-slate-700 text-slate-600'
                        }`}
                      >
                        <Star
                          size={24}
                          className={
                            starIdx <= finalSummary.stars
                              ? 'fill-slate-950 text-slate-950'
                              : 'text-slate-600'
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {/* Score Breakdown Table */}
                  <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-3.5 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Skor Penjelajahan:</span>
                      <span className="font-mono font-bold text-white">
                        {finalSummary.score}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">
                        Koin Kosakata ({finalSummary.coins} x 50):
                      </span>
                      <span className="font-mono font-bold text-amber-300">
                        +{finalSummary.coins * 50}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">
                        Bonus Sisa Waktu ({finalSummary.timeLeft}s x 10):
                      </span>
                      <span className="font-mono font-bold text-emerald-300">
                        +{Math.max(0, finalSummary.timeLeft) * 10}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-700 flex justify-between items-center">
                      <span className="text-sm font-black text-amber-300 uppercase">
                        Total Skor Akhir:
                      </span>
                      <span className="text-lg font-black font-mono text-amber-300">
                        {finalSummary.totalScore}
                      </span>
                    </div>
                  </div>

                  {/* Curriculum Summary Badge: Teks Deskripsi Kelas 7 */}
                  <div className="rounded-2xl bg-indigo-950/60 border border-indigo-500/40 p-3 space-y-1.5 text-left">
                    <div className="flex items-center gap-1.5 text-indigo-300 text-xs font-black">
                      <BookOpen size={14} />
                      <span>RANGKUMAN MATERI KELAS 7: TEKS DESKRIPSI</span>
                    </div>
                    <p className="text-[11px] text-indigo-200/90 leading-relaxed">
                      • <strong>Tujuan:</strong> Menggambarkan objek konkret (tempat, orang, suasana) sehingga pembaca seolah-olah melihat, mendengar, dan merasakan sendiri.<br />
                      • <strong>Struktur:</strong> 1) Identifikasi (pengenalan), 2) Deskripsi Bagian (perincian), 3) Simpulan/Kesan.<br />
                      • <strong>Kaidah:</strong> Kata konkret, kata khusus (bukan umum), majas personifikasi (menginsankan benda mati).
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <button
                      onClick={handleRestart}
                      className="py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw size={14} />
                      <span>Mainkan Lagi</span>
                    </button>

                    <button
                      onClick={handleChangeCharacter}
                      className="py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <User size={14} />
                      <span>Coba Tokoh Lain</span>
                    </button>

                    <button
                      onClick={() => {
                        marioAudio.stopBgm();
                        onClose();
                      }}
                      className="py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <X size={14} />
                      <span>Selesai & Keluar</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
