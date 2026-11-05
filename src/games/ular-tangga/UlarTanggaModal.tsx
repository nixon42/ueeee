import React, { useState } from 'react';
import { X, RotateCcw, Volume2, VolumeX, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
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

// Soal interaktif saat mendarat di petak tertentu
const QUESTIONS = [
  {
    q: 'Planet apa yang paling dekat dengan Matahari?',
    options: ['Venus', 'Merkurius', 'Mars', 'Bumi'],
    correct: 1,
  },
  {
    q: 'Bagian tumbuhan yang bertugas menyerap air dan mineral adalah?',
    options: ['Daun', 'Batang', 'Akar', 'Bunga'],
    correct: 2,
  },
  {
    q: 'Berapa hasil dari 7 x 8?',
    options: ['54', '56', '58', '64'],
    correct: 1,
  },
  {
    q: 'Proses perubahan wujud dari gas menjadi cair disebut?',
    options: ['Membeku', 'Menguap', 'Mengembun', 'Menyublim'],
    correct: 2,
  },
  {
    q: 'Gaya tarik yang menyebabkan benda jatuh ke bawah disebut gaya...',
    options: ['Magnet', 'Gesek', 'Gravitasi', 'Pegas'],
    correct: 2,
  },
];

export const UlarTanggaModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [playerPos, setPlayerPos] = useState<number>(1);
  const [botPos, setBotPos] = useState<number>(1);
  const [turn, setTurn] = useState<'player' | 'bot'>('player');
  const [dice, setDice] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Giliranmu! Lempar dadu untuk memulai.');
  const [activeQuestion, setActiveQuestion] = useState<{
    q: string;
    options: string[];
    correct: number;
    targetTile: number;
    type: 'ladder' | 'snake';
  } | null>(null);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [winner, setWinner] = useState<'player' | 'bot' | null>(null);

  if (!isOpen) return null;

  const handleRollDice = () => {
    if (isRolling || winner || activeQuestion) return;
    setIsRolling(true);
    sound.playDiceRoll();

    let rollCount = 0;
    const interval = setInterval(() => {
      setDice(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      if (rollCount > 8) {
        clearInterval(interval);
        const finalDice = Math.floor(Math.random() * 6) + 1;
        setDice(finalDice);
        setIsRolling(false);
        moveCurrentPlayer(finalDice);
      }
    }, 60);
  };

  const moveCurrentPlayer = (steps: number) => {
    if (turn === 'player') {
      const nextPos = Math.min(100, playerPos + steps);
      setPlayerPos(nextPos);

      if (nextPos === 100) {
        triggerVictory('player');
        return;
      }

      // Cek apakah mendarat di Tangga atau Ular
      if (LADDERS[nextPos]) {
        const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        setActiveQuestion({
          ...randomQ,
          targetTile: LADDERS[nextPos],
          type: 'ladder',
        });
        setMessage(`🎯 Kamu mendarat di TANGGA (Petak ${nextPos})! Jawab kuis untuk naik ke petak ${LADDERS[nextPos]}!`);
      } else if (SNAKES[nextPos]) {
        const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        setActiveQuestion({
          ...randomQ,
          targetTile: SNAKES[nextPos],
          type: 'snake',
        });
        setMessage(`⚠️ Awas ULAR di Petak ${nextPos}! Jawab benar agar selamat dan tidak turun!`);
      } else {
        setMessage(`Kamu maju ke petak ${nextPos}. Giliran Bot Teman Belajar!`);
        setTurn('bot');
        setTimeout(() => runBotTurn(botPos), 1200);
      }
    }
  };

  const runBotTurn = (currentBotPos: number) => {
    sound.playDiceRoll();
    const botDice = Math.floor(Math.random() * 6) + 1;
    setDice(botDice);
    let nextPos = Math.min(100, currentBotPos + botDice);

    if (nextPos === 100) {
      setBotPos(100);
      triggerVictory('bot');
      return;
    }

    if (LADDERS[nextPos]) {
      nextPos = LADDERS[nextPos];
      setMessage(`Bot dapat tangga dan meluncur ke petak ${nextPos}!`);
    } else if (SNAKES[nextPos]) {
      nextPos = SNAKES[nextPos];
      setMessage(`Bot terkena ular dan merosot ke petak ${nextPos}!`);
    } else {
      setMessage(`Bot maju ${botDice} langkah ke petak ${nextPos}. Giliranmu!`);
    }

    setBotPos(nextPos);
    setTurn('player');
  };

  const handleAnswer = (optionIdx: number) => {
    if (!activeQuestion) return;

    if (optionIdx === activeQuestion.correct) {
      sound.playCorrect();
      if (activeQuestion.type === 'ladder') {
        setPlayerPos(activeQuestion.targetTile);
        setMessage(`🎉 Benar sekali! Kamu naik tangga ke petak ${activeQuestion.targetTile}!`);
      } else {
        setMessage(`🛡️ Jawaban Benar! Kamu berhasil menjinakkan ular dan tetap di tempat!`);
      }
    } else {
      sound.playWrong();
      if (activeQuestion.type === 'snake') {
        setPlayerPos(activeQuestion.targetTile);
        setMessage(`❌ Sayang sekali keliru! Kamu meluncur turun ke petak ${activeQuestion.targetTile}.`);
      } else {
        setMessage(`❌ Jawaban kurang tepat! Kamu belum bisa naik tangga.`);
      }
    }

    setActiveQuestion(null);
    setTurn('bot');
    setTimeout(() => runBotTurn(botPos), 1500);
  };

  const triggerVictory = (who: 'player' | 'bot') => {
    setWinner(who);
    if (who === 'player') {
      sound.playCorrect();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      setMessage('🏆 SELAMAT! Kamu berhasil mencapai garis finish!');
    } else {
      sound.playWrong();
      setMessage('Bot berhasil finish lebih dulu. Jangan menyerah, ayo tanding ulang!');
    }
  };

  const resetGame = () => {
    setPlayerPos(1);
    setBotPos(1);
    setTurn('player');
    setDice(1);
    setWinner(null);
    setActiveQuestion(null);
    setMessage('Game dimulai ulang! Lempar dadu untuk jalan.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-purple-100 flex flex-col">
        {/* Header Modal Canva-Style */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-orange-50 via-purple-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-white shadow-md font-black text-xl">
              🎲
            </div>
            <div>
              <h3 className="font-extrabold text-lg md:text-xl text-slate-800">
                Ular Tangga: Petualangan Sains
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Papan 100 Petak • Mainkan Gratis Tanpa Login
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundOn(sound.toggleSound())}
              className="p-2 text-slate-500 hover:text-purple-600 hover:bg-white rounded-xl transition"
              title="Toggle Suara"
            >
              {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={resetGame}
              className="p-2 text-slate-500 hover:text-purple-600 hover:bg-white rounded-xl transition"
              title="Mulai Ulang"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
          {/* Papan Ular Tangga Grid 100 */}
          <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-inner">
            <div className="grid grid-cols-10 gap-1 aspect-square max-w-[480px] mx-auto">
              {Array.from({ length: 100 }, (_, i) => {
                // Perhitungan baris zigzag ular tangga (100 di kiri atas, 1 di kiri bawah)
                const row = Math.floor(i / 10);
                const col = i % 10;
                const actualRow = 9 - row;
                const actualCol = actualRow % 2 === 1 ? col : 9 - col;
                const tileNum = actualRow * 10 + actualCol + 1;

                const hasLadder = LADDERS[tileNum];
                const hasSnake = SNAKES[tileNum];
                const isPlayerHere = playerPos === tileNum;
                const isBotHere = botPos === tileNum;

                return (
                  <div
                    key={tileNum}
                    className={`relative flex flex-col items-center justify-center text-[10px] font-bold rounded-lg border transition-all duration-300 ${
                      tileNum === 100
                        ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 border-amber-400 shadow-sm'
                        : hasLadder
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : hasSnake
                        ? 'bg-rose-50 text-rose-800 border-rose-300'
                        : tileNum % 2 === 0
                        ? 'bg-white text-slate-700 border-slate-200'
                        : 'bg-purple-50/60 text-purple-800 border-purple-100'
                    }`}
                  >
                    <span className="opacity-60">{tileNum}</span>
                    {hasLadder && <span className="text-[10px] leading-none">🪜</span>}
                    {hasSnake && <span className="text-[10px] leading-none">🐍</span>}

                    {/* Token Pion */}
                    <div className="absolute inset-0 flex items-center justify-center gap-0.5 pointer-events-none">
                      {isPlayerHere && (
                        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 border-2 border-white shadow-md animate-bounce text-[9px] flex items-center justify-center text-white font-black">
                          P
                        </div>
                      )}
                      {isBotHere && (
                        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 border-2 border-white shadow-md text-[9px] flex items-center justify-center text-white font-black">
                          B
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Panel Kontrol & Status */}
          <div className="w-full md:w-72 flex flex-col justify-between space-y-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status Pemain
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${turn === 'player' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                  {turn === 'player' ? 'Giliran Kamu' : 'Giliran Bot'}
                </span>
              </div>

              {/* Posisi Pemain */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm bg-white p-2.5 rounded-xl border border-orange-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    <span className="font-semibold text-slate-700">Kamu (Pion Oranye)</span>
                  </div>
                  <span className="font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg">
                    Petak {playerPos}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm bg-white p-2.5 rounded-xl border border-blue-200 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="font-semibold text-slate-700">Bot Teman Belajar</span>
                  </div>
                  <span className="font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                    Petak {botPos}
                  </span>
                </div>
              </div>

              {/* Banner Pesan Aksi */}
              <div className="p-3 bg-purple-50 text-purple-900 rounded-xl text-xs font-medium border border-purple-100 flex items-start gap-2">
                <Sparkles size={16} className="text-purple-600 shrink-0 mt-0.5" />
                <span>{message}</span>
              </div>
            </div>

            {/* Dadu & Tombol Roll */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center space-y-3">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Mata Dadu
              </div>

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-lg transition-transform ${
                  isRolling ? 'rotate-180 scale-110' : ''
                }`}
              >
                {dice}
              </div>

              <button
                onClick={handleRollDice}
                disabled={isRolling || turn !== 'player' || !!activeQuestion || !!winner}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm active:scale-95"
              >
                {isRolling ? '🎲 Mengocok Dadu...' : '🎲 Lempar Dadu Sekarang!'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Tantangan Soal Interaktif */}
        {activeQuestion && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-30 flex items-center justify-center p-4 rounded-3xl">
            <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl border border-purple-200 animate-scaleUp">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full w-fit mb-3">
                <Sparkles size={14} /> Tantangan Kuis Sains
              </div>
              <h4 className="font-extrabold text-base text-slate-800 mb-4">
                {activeQuestion.q}
              </h4>

              <div className="space-y-2">
                {activeQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50 text-sm font-semibold text-slate-700 transition"
                  >
                    <span className="font-bold text-purple-600 mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Kemenangan */}
        {winner && (
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm z-30 flex items-center justify-center p-4 rounded-3xl">
            <div className="bg-white max-w-sm w-full p-6 rounded-3xl shadow-2xl text-center space-y-4 border border-amber-300">
              <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Trophy size={36} />
              </div>
              <h3 className="font-extrabold text-2xl text-slate-800">
                {winner === 'player' ? 'Hore, Kamu Juara!' : 'Bot Finish Dulu!'}
              </h3>
              <p className="text-xs text-slate-600">
                {winner === 'player'
                  ? 'Keren banget! Pengetahuan dan strategimu berhasil membawamu sampai ke petak 100.'
                  : 'Pertandingan yang seru! Coba lagi dan buktikan kemampuanmu.'}
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={resetGame}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-sm transition"
                >
                  Main Lagi
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition"
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
