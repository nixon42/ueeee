import React, { useState, useEffect, useRef } from 'react';
import { 
  X, RotateCcw, Volume2, VolumeX, Sparkles, Trophy, 
  Users, User, HelpCircle, Check, AlertCircle, BarChart3 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';
import { QUESTIONS_BANK } from '@/data/questions-bank';
import { QuizQuestion } from '@/types/game';
import { getTileCenter } from './coordinates';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

// Tangga (naik) & Ular (turun)
const LADDERS: Record<number, number> = {
  4: 14,
  9: 31,
  20: 38,
  28: 84,
  40: 59,
  51: 67,
  63: 81,
  71: 91,
};

const SNAKES: Record<number, number> = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

const STAR_TILES = [15, 33, 45, 68, 88];

export const UlarTanggaModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultSubject = 'sains',
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>(defaultSubject);
  const [gameMode, setGameMode] = useState<'bot' | 'pvp'>('bot');
  const [player1Pos, setPlayer1Pos] = useState<number>(1);
  const [player2Pos, setPlayer2Pos] = useState<number>(1);
  const [turn, setTurn] = useState<'p1' | 'p2'>('p1');
  const [dice, setDice] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isStepping, setIsStepping] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Giliran Pemain 1! Lempar dadu untuk memulai.');
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [winner, setWinner] = useState<'p1' | 'p2' | null>(null);

  // Statistics
  const [stats, setStats] = useState({
    p1Rolls: 0,
    p2Rolls: 0,
    quizCorrect: 0,
    quizTotal: 0,
  });

  // Active quiz modal
  const [activeQuiz, setActiveQuiz] = useState<{
    question: QuizQuestion;
    tile: number;
    type: 'ladder' | 'snake' | 'star';
    destTile?: number;
    forPlayer: 'p1' | 'p2';
  } | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const steppingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    setSelectedSubject(defaultSubject);
  }, [defaultSubject]);

  useEffect(() => {
    return () => {
      if (steppingIntervalRef.current) clearInterval(steppingIntervalRef.current);
    };
  }, []);

  // Keyboard shortcut: Space untuk roll dice, Escape untuk tutup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.code === 'Space' && !isRolling && !isStepping && !activeQuiz && !winner) {
        e.preventDefault();
        handleRollDice();
      } else if (e.code === 'Escape' && !activeQuiz) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isRolling, isStepping, activeQuiz, winner, turn]);

  if (!isOpen) return null;

  const currentQuestions = QUESTIONS_BANK[selectedSubject] || QUESTIONS_BANK.sains;

  const getRandomQuestion = (): QuizQuestion => {
    const list = currentQuestions;
    return list[Math.floor(Math.random() * list.length)];
  };

  const handleRollDice = () => {
    if (isRolling || isStepping || winner || activeQuiz) return;
    setIsRolling(true);
    sound.playDiceRoll();

    let rollCount = 0;
    const interval = window.setInterval(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      if (rollCount > 7) {
        clearInterval(interval);
        const finalDice = Math.floor(Math.random() * 6) + 1;
        setDice(finalDice);
        setIsRolling(false);

        // Update stats
        setStats(prev => ({
          ...prev,
          p1Rolls: turn === 'p1' ? prev.p1Rolls + 1 : prev.p1Rolls,
          p2Rolls: turn === 'p2' ? prev.p2Rolls + 1 : prev.p2Rolls,
        }));

        stepByStepMove(finalDice);
      }
    }, 60);
  };

  /**
   * Langkah bertahap pion (1 langkah per 220ms) dengan sound effect step
   */
  const stepByStepMove = (totalSteps: number) => {
    setIsStepping(true);
    const isP1 = turn === 'p1';
    const startPos = isP1 ? player1Pos : player2Pos;
    let currentStep = 0;

    steppingIntervalRef.current = window.setInterval(() => {
      currentStep++;
      const nextPos = Math.min(100, startPos + currentStep);

      sound.playStep();
      if (isP1) setPlayer1Pos(nextPos);
      else setPlayer2Pos(nextPos);

      if (currentStep >= totalSteps || nextPos === 100) {
        if (steppingIntervalRef.current) clearInterval(steppingIntervalRef.current);
        setIsStepping(false);
        checkTileEffect(nextPos, isP1);
      }
    }, 220);
  };

  const checkTileEffect = (finalPos: number, isP1: boolean) => {
    if (finalPos === 100) {
      triggerVictory(isP1 ? 'p1' : 'p2');
      return;
    }

    if (LADDERS[finalPos]) {
      const q = getRandomQuestion();
      setActiveQuiz({
        question: q,
        tile: finalPos,
        type: 'ladder',
        destTile: LADDERS[finalPos],
        forPlayer: isP1 ? 'p1' : 'p2',
      });
      setMessage(`🎯 Mendarat di TANGGA (Petak ${finalPos})! Jawab kuis untuk naik ke petak ${LADDERS[finalPos]}!`);
    } else if (SNAKES[finalPos]) {
      const q = getRandomQuestion();
      setActiveQuiz({
        question: q,
        tile: finalPos,
        type: 'snake',
        destTile: SNAKES[finalPos],
        forPlayer: isP1 ? 'p1' : 'p2',
      });
      setMessage(`⚠️ Awas ULAR di Petak ${finalPos}! Jawab kuis agar selamat dan tidak merosot!`);
    } else if (STAR_TILES.includes(finalPos)) {
      const q = getRandomQuestion();
      setActiveQuiz({
        question: q,
        tile: finalPos,
        type: 'star',
        forPlayer: isP1 ? 'p1' : 'p2',
      });
      setMessage(`⭐ Petak Bintang Spesial ${finalPos}! Jawab kuis untuk mendapat bonus +3 langkah!`);
    } else {
      switchTurn(finalPos, isP1);
    }
  };

  const switchTurn = (pos: number, wasP1: boolean) => {
    if (gameMode === 'bot') {
      if (wasP1) {
        setTurn('p2');
        setMessage(`Pemain 1 di petak ${pos}. Giliran Bot Teman Belajar!`);
        setTimeout(() => triggerBotTurn(), 1300);
      } else {
        setTurn('p1');
        setMessage(`Bot di petak ${pos}. Giliranmu! Tekan Lempar Dadu.`);
      }
    } else {
      const nextTurn = wasP1 ? 'p2' : 'p1';
      setTurn(nextTurn);
      setMessage(`Maju ke petak ${pos}. Giliran ${nextTurn === 'p1' ? 'Pemain 1' : 'Pemain 2'}!`);
    }
  };

  const triggerBotTurn = () => {
    if (winner) return;
    sound.playDiceRoll();
    const botDice = Math.floor(Math.random() * 6) + 1;
    setDice(botDice);
    setStats(prev => ({ ...prev, p2Rolls: prev.p2Rolls + 1 }));

    // Bot step-by-step
    setIsStepping(true);
    let stepCount = 0;
    const startBot = player2Pos;

    const botInterval = window.setInterval(() => {
      stepCount++;
      const nextPos = Math.min(100, startBot + stepCount);
      sound.playStep();
      setPlayer2Pos(nextPos);

      if (stepCount >= botDice || nextPos === 100) {
        clearInterval(botInterval);
        setIsStepping(false);

        if (nextPos === 100) {
          triggerVictory('p2');
          return;
        }

        if (LADDERS[nextPos]) {
          sound.playLadderClimb();
          const target = LADDERS[nextPos];
          setPlayer2Pos(target);
          setMessage(`Bot mendarat di tangga dan meluncur naik ke petak ${target}!`);
        } else if (SNAKES[nextPos]) {
          sound.playSnakeSlide();
          const target = SNAKES[nextPos];
          setPlayer2Pos(target);
          setMessage(`Bot terkena ular dan merosot ke petak ${target}!`);
        } else {
          setMessage(`Bot melangkah ke nomor ${nextPos}. Giliran Pemain 1!`);
        }

        setTurn('p1');
      }
    }, 200);
  };

  const handleAnswerQuiz = (optionIdx: number) => {
    if (!activeQuiz) return;
    const isCorrect = optionIdx === activeQuiz.question.correctIndex;
    const isP1 = activeQuiz.forPlayer === 'p1';

    setStats(prev => ({
      ...prev,
      quizTotal: prev.quizTotal + 1,
      quizCorrect: isCorrect ? prev.quizCorrect + 1 : prev.quizCorrect,
    }));

    if (isCorrect) {
      sound.playCorrect();
      setQuizFeedback({
        isCorrect: true,
        text: `Benar! ${activeQuiz.question.explanation}`,
      });

      setTimeout(() => {
        if (activeQuiz.type === 'ladder' && activeQuiz.destTile) {
          sound.playLadderClimb();
          if (isP1) setPlayer1Pos(activeQuiz.destTile);
          else setPlayer2Pos(activeQuiz.destTile);
          setMessage(`🎉 Hebat! Naik tangga ke petak ${activeQuiz.destTile}!`);
        } else if (activeQuiz.type === 'star') {
          sound.playLadderClimb();
          const bonusPos = Math.min(100, (isP1 ? player1Pos : player2Pos) + 3);
          if (isP1) setPlayer1Pos(bonusPos);
          else setPlayer2Pos(bonusPos);
          setMessage(`⭐ Bonus Bintang! Melompat 3 langkah ke petak ${bonusPos}!`);
        } else {
          setMessage(`🛡️ Jawaban Tepat! Ular berhasil dijinakkan, tetap aman di petak ${activeQuiz.tile}.`);
        }

        setQuizFeedback(null);
        setActiveQuiz(null);
        switchTurn(isP1 ? player1Pos : player2Pos, isP1);
      }, 1800);
    } else {
      sound.playWrong();
      setQuizFeedback({
        isCorrect: false,
        text: `Kurang tepat. ${activeQuiz.question.explanation}`,
      });

      setTimeout(() => {
        if (activeQuiz.type === 'snake' && activeQuiz.destTile) {
          sound.playSnakeSlide();
          if (isP1) setPlayer1Pos(activeQuiz.destTile);
          else setPlayer2Pos(activeQuiz.destTile);
          setMessage(`❌ Sayang sekali! Merosot turun ke petak ${activeQuiz.destTile}.`);
        } else {
          setMessage(`❌ Belum berhasil memicu efek petak.`);
        }

        setQuizFeedback(null);
        setActiveQuiz(null);
        switchTurn(isP1 ? player1Pos : player2Pos, isP1);
      }, 2000);
    }
  };

  const triggerVictory = (who: 'p1' | 'p2') => {
    setWinner(who);
    sound.playCorrect();
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.6 },
    });
    setMessage(`🏆 Permainan Selesai! ${who === 'p1' ? 'Pemain 1' : gameMode === 'bot' ? 'Bot Teman Belajar' : 'Pemain 2'} menang!`);
  };

  const resetGame = () => {
    if (steppingIntervalRef.current) clearInterval(steppingIntervalRef.current);
    setPlayer1Pos(1);
    setPlayer2Pos(1);
    setTurn('p1');
    setDice(1);
    setIsRolling(false);
    setIsStepping(false);
    setWinner(null);
    setActiveQuiz(null);
    setQuizFeedback(null);
    setMessage('Permainan dimulai ulang! Lempar dadu untuk jalan.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-orange-100 flex flex-col">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-gradient-to-r from-orange-50 via-amber-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-white shadow-md font-black text-xl">
              🎲
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-800">
                  Ular Tangga Edukatif 100 Petak
                </h3>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800">
                  Kurikulum Merdeka
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Papan Visual Interaktif • Berbasis Langkah Bertahap • Zero-Login
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Selector */}
            <div className="hidden sm:flex items-center bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
              <button
                onClick={() => { setGameMode('bot'); resetGame(); }}
                className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                  gameMode === 'bot' ? 'bg-orange-500 text-white shadow-sm' : 'hover:text-orange-600'
                }`}
              >
                <User size={13} />
                <span>Vs Bot</span>
              </button>
              <button
                onClick={() => { setGameMode('pvp'); resetGame(); }}
                className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                  gameMode === 'pvp' ? 'bg-orange-500 text-white shadow-sm' : 'hover:text-orange-600'
                }`}
              >
                <Users size={13} />
                <span>2 Pemain</span>
              </button>
            </div>

            <button
              onClick={() => setSoundOn(sound.toggleSound())}
              className="p-2 text-slate-500 hover:text-orange-600 hover:bg-white rounded-xl transition"
              title="Toggle Suara"
            >
              {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={resetGame}
              className="p-2 text-slate-500 hover:text-orange-600 hover:bg-white rounded-xl transition"
              title="Mulai Ulang"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
          {/* Papan Ular Tangga Grid 100 dengan Visual Interaktif & SVG Connections */}
          <div className="flex-1 bg-slate-50 p-2 sm:p-3 rounded-3xl border border-slate-200 shadow-inner flex flex-col items-center">
            {/* Pilihan Topik Mapel */}
            <div className="w-full flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Topik Kuis Papan:
              </span>
              <div className="flex gap-1.5">
                {(['sains', 'matematika', 'sejarah'] as const).map(subj => (
                  <button
                    key={subj}
                    onClick={() => { setSelectedSubject(subj); resetGame(); }}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg capitalize transition ${
                      selectedSubject === subj
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-purple-300'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>

            {/* Container Papan dengan SVG Overlay */}
            <div className="relative aspect-square w-full max-w-[500px]">
              {/* SVG Overlay Garis Tangga & Ular */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="ladderGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="snakeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                </defs>

                {/* Garis Tangga (Ladders) */}
                {Object.entries(LADDERS).map(([start, end]) => {
                  const p1 = getTileCenter(Number(start));
                  const p2 = getTileCenter(Number(end));
                  return (
                    <g key={`ladder-${start}-${end}`}>
                      <line
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke="url(#ladderGrad)"
                        strokeWidth="1.6"
                        strokeDasharray="1.5 1.5"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                    </g>
                  );
                })}

                {/* Garis Ular (Snakes) */}
                {Object.entries(SNAKES).map(([start, end]) => {
                  const p1 = getTileCenter(Number(start));
                  const p2 = getTileCenter(Number(end));
                  const midX = (p1.x + p2.x) / 2 + (p1.x > p2.x ? 4 : -4);
                  const midY = (p1.y + p2.y) / 2;
                  return (
                    <path
                      key={`snake-${start}-${end}`}
                      d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
                      stroke="url(#snakeGrad)"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  );
                })}
              </svg>

              {/* Grid 10x10 Board */}
              <div className="grid grid-cols-10 gap-1 w-full h-full">
                {Array.from({ length: 100 }, (_, i) => {
                  const row = Math.floor(i / 10);
                  const col = i % 10;
                  const actualRow = 9 - row;
                  const actualCol = actualRow % 2 === 1 ? col : 9 - col;
                  const tileNum = actualRow * 10 + actualCol + 1;

                  const hasLadder = LADDERS[tileNum];
                  const hasSnake = SNAKES[tileNum];
                  const isStar = STAR_TILES.includes(tileNum);
                  const isP1Here = player1Pos === tileNum;
                  const isP2Here = player2Pos === tileNum;

                  return (
                    <div
                      key={tileNum}
                      className={`relative flex flex-col items-center justify-between p-0.5 text-[9px] sm:text-[10px] font-bold rounded-lg border transition-all ${
                        tileNum === 100
                          ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 border-amber-400 shadow'
                          : hasLadder
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : hasSnake
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : isStar
                          ? 'bg-yellow-50 text-yellow-800 border-yellow-300'
                          : tileNum % 2 === 0
                          ? 'bg-white text-slate-700 border-slate-200'
                          : 'bg-orange-50/50 text-slate-700 border-orange-100'
                      }`}
                    >
                      <div className="w-full flex justify-between items-center leading-none px-0.5 z-20">
                        <span className="opacity-70">{tileNum}</span>
                        {hasLadder && (
                          <span className="text-[9px] text-emerald-600 font-extrabold">
                            🪜{hasLadder}
                          </span>
                        )}
                        {hasSnake && (
                          <span className="text-[9px] text-rose-600 font-extrabold">
                            🐍{hasSnake}
                          </span>
                        )}
                        {isStar && <span className="text-[9px] text-amber-500">⭐</span>}
                      </div>

                      {/* Pion Pemain */}
                      <div className="flex items-center justify-center gap-1 my-auto z-20">
                        {isP1Here && (
                          <div
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 border-2 border-white shadow-md text-[9px] sm:text-[10px] flex items-center justify-center text-white font-black ring-2 ring-orange-400/80 scale-105"
                            title="Pemain 1"
                          >
                            1
                          </div>
                        )}
                        {isP2Here && (
                          <div
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 border-2 border-white shadow-md text-[9px] sm:text-[10px] flex items-center justify-center text-white font-black"
                            title={gameMode === 'bot' ? 'Bot' : 'Pemain 2'}
                          >
                            {gameMode === 'bot' ? 'B' : '2'}
                          </div>
                        )}
                      </div>

                      <div className="h-1"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Panel Kontrol Kanan */}
          <div className="w-full lg:w-80 flex flex-col justify-between space-y-4">
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status Pertandingan
                </span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                  turn === 'p1' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {turn === 'p1' ? 'Giliran Pemain 1' : gameMode === 'bot' ? 'Giliran Bot' : 'Giliran Pemain 2'}
                </span>
              </div>

              {/* Status Pemain 1 & 2 */}
              <div className="space-y-2">
                <div className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                  turn === 'p1' ? 'bg-orange-50 border-orange-300 shadow-sm' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500 text-white font-black text-xs flex items-center justify-center shadow">
                      1
                    </div>
                    <span className="text-xs font-bold text-slate-800">Pemain 1 (Oranye)</span>
                  </div>
                  <span className="text-xs font-black text-orange-700 bg-white px-2 py-1 rounded-lg border border-orange-200">
                    Petak {player1Pos}
                  </span>
                </div>

                <div className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                  turn === 'p2' ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center shadow">
                      {gameMode === 'bot' ? 'B' : '2'}
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {gameMode === 'bot' ? 'Bot Teman Belajar' : 'Pemain 2 (Biru)'}
                    </span>
                  </div>
                  <span className="text-xs font-black text-blue-700 bg-white px-2 py-1 rounded-lg border border-blue-200">
                    Petak {player2Pos}
                  </span>
                </div>
              </div>

              {/* Status Banner Message */}
              <div className="p-3 bg-purple-50 text-purple-900 rounded-2xl text-xs font-medium border border-purple-100 flex items-start gap-2">
                <Sparkles size={16} className="text-purple-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{message}</span>
              </div>

              {/* Statistik Singkat */}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <BarChart3 size={13} /> Dadu: {stats.p1Rolls} lemparan
                </span>
                <span>Kuis: {stats.quizCorrect}/{stats.quizTotal} Benar</span>
              </div>
            </div>

            {/* Dadu Interaktif (Dot Pattern) */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center space-y-4">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Mata Dadu
              </div>

              {/* Authentic cubic die */}
              <div
                className={`w-18 h-18 rounded-2xl bg-white border-2 border-slate-300 p-2.5 text-slate-900 shadow-xl flex flex-col justify-between transition-all duration-200 ${
                  isRolling ? 'rotate-180 scale-110' : ''
                }`}
              >
                {/* Visual Dadu Dot */}
                <div className="flex justify-between w-full">
                  <span className={`w-3 h-3 rounded-full bg-slate-800 ${dice >= 2 ? 'opacity-100' : 'opacity-0'}`}></span>
                  <span className={`w-3 h-3 rounded-full bg-slate-800 ${dice >= 4 ? 'opacity-100' : 'opacity-0'}`}></span>
                </div>
                <div className="flex justify-center w-full">
                  <span className={`w-3.5 h-3.5 rounded-full ${dice === 1 ? 'bg-rose-600' : 'bg-slate-800'} ${dice % 2 === 1 ? 'opacity-100' : 'opacity-0'}`}></span>
                </div>
                <div className="flex justify-between w-full">
                  <span className={`w-3 h-3 rounded-full bg-slate-800 ${dice >= 4 ? 'opacity-100' : 'opacity-0'}`}></span>
                  <span className={`w-3 h-3 rounded-full bg-slate-800 ${dice >= 2 ? 'opacity-100' : 'opacity-0'}`}></span>
                </div>
              </div>

              <button
                onClick={handleRollDice}
                disabled={isRolling || isStepping || (gameMode === 'bot' && turn !== 'p1') || !!activeQuiz || !!winner}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{isRolling ? 'Mengocok Dadu...' : isStepping ? 'Melangkah...' : 'Lempar Dadu (Spasi)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Tantangan Soal Interaktif */}
        {activeQuiz && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-30 flex items-center justify-center p-4 rounded-3xl animate-fadeIn">
            <div className="bg-white max-w-lg w-full p-6 rounded-3xl shadow-2xl border border-purple-200 space-y-4 animate-scaleUp">
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 ${
                  activeQuiz.type === 'ladder'
                    ? 'bg-emerald-100 text-emerald-800'
                    : activeQuiz.type === 'snake'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  <HelpCircle size={14} />
                  {activeQuiz.type === 'ladder'
                    ? `Kuis Tangga (Petak ${activeQuiz.tile} → ${activeQuiz.destTile})`
                    : activeQuiz.type === 'snake'
                    ? `Kuis Jinakkan Ular (Petak ${activeQuiz.tile})`
                    : `Kuis Bintang Bonus (Petak ${activeQuiz.tile})`}
                </span>
                <span className="text-xs font-bold text-slate-400 capitalize">
                  Topik: {activeQuiz.question.topic}
                </span>
              </div>

              <h4 className="font-extrabold text-base sm:text-lg text-slate-800 leading-snug">
                {activeQuiz.question.question}
              </h4>

              {/* Feedback box */}
              {quizFeedback && (
                <div className={`p-3.5 rounded-2xl text-xs font-bold flex items-start gap-2 animate-fadeIn ${
                  quizFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                }`}>
                  {quizFeedback.isCorrect ? (
                    <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <p className="leading-relaxed">{quizFeedback.text}</p>
                </div>
              )}

              {/* Pilihan Jawaban */}
              <div className="space-y-2 pt-1">
                {activeQuiz.question.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={!!quizFeedback}
                    onClick={() => handleAnswerQuiz(idx)}
                    className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/70 text-sm font-semibold text-slate-700 transition disabled:opacity-60 flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <span className="font-black text-purple-600 mr-2.5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Kemenangan */}
        {winner && (
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm z-30 flex items-center justify-center p-4 rounded-3xl animate-fadeIn">
            <div className="bg-white max-w-sm w-full p-6 rounded-3xl shadow-2xl text-center space-y-4 border border-amber-300 animate-scaleUp">
              <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shadow-inner">
                <Trophy size={36} />
              </div>
              <h3 className="font-black text-2xl text-slate-800">
                {winner === 'p1'
                  ? 'Hore, Pemain 1 Menang!'
                  : gameMode === 'bot'
                  ? 'Bot Finish Lebih Dulu!'
                  : 'Pemain 2 Menang!'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {winner === 'p1'
                  ? 'Luar biasa! Pengetahuan dan strategi kuis berhasil membawamu mencapai garis finish petak 100!'
                  : 'Pertandingan yang seru! Coba lagi dan buktikan siapa ahli materi berikutnya.'}
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={resetGame}
                  className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-extrabold rounded-2xl text-sm transition shadow"
                >
                  Main Lagi
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
