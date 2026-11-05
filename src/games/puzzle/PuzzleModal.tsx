import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, HelpCircle, Trophy, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface WordPuzzle {
  word: string;
  category: string;
  clue: string;
  explanation: string;
  subject: string;
}

const PUZZLES: WordPuzzle[] = [
  {
    word: 'FOTOSINTESIS',
    category: 'Biologi & Sains',
    subject: 'IPA',
    clue: 'Proses pembentukan makanan oleh tumbuhan hijau dengan bantuan cahaya matahari dan klorofil.',
    explanation: 'Fotosintesis mengubah karbondioksida (CO2) dan air (H2O) menjadi glukosa dan oksigen (O2).',
  },
  {
    word: 'GRAVITASI',
    category: 'Fisika & Alam',
    subject: 'Fisika',
    clue: 'Gaya tarik antara dua massa yang menyebabkan apel jatuh dari pohon ke tanah.',
    explanation: 'Hukum gravitasi universal pertama kali dirumuskan secara matematis oleh Sir Isaac Newton.',
  },
  {
    word: 'SRIWIJAYA',
    category: 'Sejarah Nusantara',
    subject: 'IPS',
    clue: 'Kerajaan maritim Buddha terbesar di Nusantara yang berpusat di muara Sungai Musi, Palembang.',
    explanation: 'Sriwijaya menguasai Selat Malaka dan menjadi pusat perdagangan serta kebudayaan di Asia Tenggara.',
  },
  {
    word: 'ATMOSFER',
    category: 'Geografi & Astronomi',
    subject: 'Geografi',
    clue: 'Lapisan gas yang menyelimuti planet bumi dan melindungi kita dari radiasi matahari berbahaya.',
    explanation: 'Atmosfer bumi terdiri dari troposfer, stratosfer, mesosfer, termosfer, dan eksosfer.',
  },
  {
    word: 'EKOSISTEM',
    category: 'Biologi Lingkungan',
    subject: 'IPA',
    clue: 'Hubungan timbal balik antara makhluk hidup dengan lingkungan sekitarnya.',
    explanation: 'Ekosistem terdiri dari komponen biotik (organisme hidup) dan komponen abiotik (tanah, air, udara).',
  },
];

export const PuzzleModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableTiles, setAvailableTiles] = useState<{ id: string; letter: string; used: boolean }[]>([]);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Susun huruf dengan mengklik atau ketik langsung di keyboard!');

  const currentPuzzle = PUZZLES[currentIndex];

  useEffect(() => {
    if (!isOpen) return;
    initPuzzle(currentIndex);
  }, [currentIndex, isOpen]);

  // Physical keyboard listener (Typing & Backspace)
  useEffect(() => {
    if (!isOpen || isCompleted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (selectedLetters.length > 0) {
          handleRemoveLetter(selectedLetters.length - 1);
        }
      } else if (e.key === 'Escape') {
        onClose();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        const char = e.key.toUpperCase();
        // Cari tile huruf tersebut yang belum used
        const tile = availableTiles.find(t => t.letter === char && !t.used);
        if (tile && selectedLetters.length < currentPuzzle.word.length) {
          handleTileClick(tile.id, tile.letter);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isCompleted, availableTiles, selectedLetters, currentPuzzle]);

  const initPuzzle = (idx: number) => {
    const puzzle = PUZZLES[idx];
    const letters = puzzle.word.split('');
    const shuffled = [...letters]
      .map((letter, i) => ({ letter, sort: Math.random(), originalIndex: i }))
      .sort((a, b) => a.sort - b.sort)
      .map((item, i) => ({
        id: `tile-${i}-${item.letter}`,
        letter: item.letter,
        used: false,
      }));

    setAvailableTiles(shuffled);
    setSelectedLetters([]);
    setShowExplanation(false);
    setHintUsed(false);
    setStatusMessage('Pilih huruf dengan klik tombol atau ketik di keyboard.');
  };

  if (!isOpen) return null;

  const handleTileClick = (tileId: string, letter: string) => {
    sound.playClick();
    setAvailableTiles(prev =>
      prev.map(t => (t.id === tileId ? { ...t, used: true } : t))
    );
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);

    if (newSelected.length === currentPuzzle.word.length) {
      const assembledWord = newSelected.join('');
      if (assembledWord === currentPuzzle.word) {
        sound.playCorrect();
        const streakBonus = streak * 25;
        const earned = (hintUsed ? 70 : 100) + streakBonus;
        setScore(prev => prev + earned);
        setStreak(prev => prev + 1);
        setStatusMessage(`🎉 Hebat! "${currentPuzzle.word}" tersusun sempurna (+${earned} poin)!`);

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          if (currentIndex < PUZZLES.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            setIsCompleted(true);
          }
        }, 1500);
      } else {
        sound.playWrong();
        setStreak(0);
        setStatusMessage('❌ Susunan huruf belum tepat. Tekan Backspace atau klik huruf untuk koreksi!');
      }
    }
  };

  const handleRemoveLetter = (indexToRemove: number) => {
    sound.playClick();
    const letter = selectedLetters[indexToRemove];
    const newSelected = selectedLetters.filter((_, i) => i !== indexToRemove);
    setSelectedLetters(newSelected);

    let restored = false;
    setAvailableTiles(prev =>
      prev.map(t => {
        if (!restored && t.letter === letter && t.used) {
          restored = true;
          return { ...t, used: false };
        }
        return t;
      })
    );
  };

  const useSmartHint = () => {
    if (hintUsed || selectedLetters.length >= currentPuzzle.word.length) return;
    sound.playClick();
    setHintUsed(true);

    // Cari huruf pertama dari puzzle
    const firstLetter = currentPuzzle.word[0];
    const availableTile = availableTiles.find(t => t.letter === firstLetter && !t.used);

    if (availableTile && selectedLetters.length === 0) {
      handleTileClick(availableTile.id, availableTile.letter);
      setStatusMessage(`💡 Petunjuk: Huruf pertama adalah "${firstLetter}"`);
    } else {
      setStatusMessage(`💡 Petunjuk: Huruf pertama dari kata ini adalah "${firstLetter}"`);
    }
  };

  const resetAll = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setIsCompleted(false);
    initPuzzle(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-teal-100 flex flex-col overflow-hidden">
        {/* Header Canva Style */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md font-black text-xl">
              🧩
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-800">
                Teka-Teki: Susun Kata & Rumus Sains
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Soal {currentIndex + 1} dari {PUZZLES.length} • Skor: {score} Poin {streak > 1 && `(Streak ${streak}x 🔥)`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundOn(sound.toggleSound())}
              className="p-2 text-slate-500 hover:text-teal-600 hover:bg-white rounded-xl transition"
              title="Toggle Suara"
            >
              {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={() => initPuzzle(currentIndex)}
              className="p-2 text-slate-500 hover:text-teal-600 hover:bg-white rounded-xl transition"
              title="Acak Ulang Huruf"
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

        {/* Puzzle Content */}
        <div className="p-6 space-y-6">
          {isCompleted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Trophy size={36} />
              </div>
              <h4 className="font-black text-2xl text-slate-800">
                Luar Biasa! Semua Teka-Teki Terpecahkan!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Kamu berhasil menuntaskan seluruh susunan kata sains dan sejarah dengan total skor{' '}
                <strong className="text-teal-600">{score} poin</strong>!
              </p>
              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={resetAll}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow transition text-sm"
                >
                  Main Lagi Dari Awal
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl transition text-sm"
                >
                  Selesai
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Petunjuk Soal */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                      {currentPuzzle.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Mendukung ketik keyboard A-Z
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={useSmartHint}
                      disabled={hintUsed}
                      className="text-xs text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 disabled:opacity-50"
                      title="Buka petunjuk huruf pertama"
                    >
                      <Lightbulb size={14} />
                      {hintUsed ? 'Petunjuk Aktif' : 'Gunakan Petunjuk'}
                    </button>
                    <button
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="text-xs text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1"
                    >
                      <HelpCircle size={14} />
                      {showExplanation ? 'Tutup Fakta' : 'Fakta Konsep'}
                    </button>
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  "{currentPuzzle.clue}"
                </p>

                {showExplanation && (
                  <div className="p-3 bg-teal-50/80 rounded-xl text-xs text-teal-900 border border-teal-200/60 animate-fadeIn">
                    <span className="font-bold">Fakta Edukatif: </span>
                    {currentPuzzle.explanation}
                  </div>
                )}
              </div>

              {/* Kotak Jawaban Yang Disusun */}
              <div className="flex flex-col items-center space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Susunan Jawaban ({selectedLetters.length} / {currentPuzzle.word.length} Huruf)
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 min-h-12 sm:min-h-14 p-2 sm:p-2.5 bg-slate-100/70 rounded-2xl border-2 border-dashed border-slate-300 w-full">
                  {Array.from({ length: currentPuzzle.word.length }).map((_, idx) => {
                    const letter = selectedLetters[idx];
                    return (
                      <button
                        key={idx}
                        onClick={() => letter && handleRemoveLetter(idx)}
                        disabled={!letter}
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl font-black text-base sm:text-lg flex items-center justify-center transition-all ${
                          letter
                            ? 'bg-gradient-to-tr from-teal-500 to-emerald-500 text-white shadow-md hover:scale-105 active:scale-95 cursor-pointer'
                            : 'bg-white/80 border border-slate-200 text-transparent cursor-default'
                        }`}
                        title={letter ? 'Klik atau tekan Backspace untuk membatalkan' : ''}
                      >
                        {letter || ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Huruf Acak Yang Tersedia Untuk Diklik / Diketik */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                  Pilihan Huruf (Klik atau Ketik)
                </div>

                <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                  {availableTiles.map(tile => (
                    <button
                      key={tile.id}
                      onClick={() => !tile.used && handleTileClick(tile.id, tile.letter)}
                      disabled={tile.used}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-all duration-200 cursor-pointer ${
                        tile.used
                          ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed scale-90'
                          : 'bg-white hover:bg-teal-50 border-2 border-slate-200 hover:border-teal-400 text-slate-800 shadow-sm hover:shadow hover:-translate-y-0.5 active:scale-95'
                      }`}
                    >
                      {tile.letter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Message */}
              <div className="p-3 bg-purple-50 rounded-xl text-xs font-semibold text-purple-900 border border-purple-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-purple-600 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
                {selectedLetters.join('') === currentPuzzle.word && (
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
