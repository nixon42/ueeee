import React, { useState } from 'react';
import { X, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, HelpCircle, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface WordPuzzle {
  word: string; // The target word in uppercase
  category: string;
  clue: string;
  explanation: string;
}

const PUZZLES: WordPuzzle[] = [
  {
    word: 'FOTOSINTESIS',
    category: 'Biologi & Sains',
    clue: 'Proses pembentukan makanan oleh tumbuhan hijau dengan bantuan cahaya matahari dan klorofil.',
    explanation: 'Fotosintesis mengubah karbondioksida (CO2) dan air (H2O) menjadi glukosa dan oksigen (O2).',
  },
  {
    word: 'GRAVITASI',
    category: 'Fisika',
    clue: 'Gaya tarik antara dua massa yang menyebabkan apel jatuh dari pohon ke tanah.',
    explanation: 'Hukum gravitasi universal pertama kali dirumuskan secara matematis oleh Sir Isaac Newton.',
  },
  {
    word: 'SRIWIJAYA',
    category: 'Sejarah Nusantara',
    clue: 'Kerajaan maritim Buddha terbesar di Nusantara yang berpusat di muara Sungai Musi, Palembang.',
    explanation: 'Sriwijaya menguasai Selat Malaka dan menjadi pusat perdagangan serta kebudayaan di Asia Tenggara.',
  },
  {
    word: 'ATMOSFER',
    category: 'Geografi & Astronomi',
    clue: 'Lapisan gas yang menyelimuti planet bumi dan melindungi kita dari radiasi matahari berbahaya.',
    explanation: 'Atmosfer bumi terdiri dari troposfer, stratosfer, mesosfer, termosfer, dan eksosfer.',
  },
  {
    word: 'EKOSISTEM',
    category: 'Biologi Lingkungan',
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
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('Susun huruf-huruf di bawah untuk membentuk kata yang tepat!');

  const currentPuzzle = PUZZLES[currentIndex];

  // Initialize current puzzle tiles
  React.useEffect(() => {
    if (!isOpen) return;
    initPuzzle(currentIndex);
  }, [currentIndex, isOpen]);

  const initPuzzle = (idx: number) => {
    const puzzle = PUZZLES[idx];
    const letters = puzzle.word.split('');
    // Shuffle letters
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
    setShowHint(false);
    setStatusMessage('Pilih dan klik huruf untuk menyusun kata.');
  };

  if (!isOpen) return null;

  const handleTileClick = (tileId: string, letter: string) => {
    sound.playClick();
    setAvailableTiles(prev =>
      prev.map(t => (t.id === tileId ? { ...t, used: true } : t))
    );
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);

    // Cek apakah sudah penuh panjangnya
    if (newSelected.length === currentPuzzle.word.length) {
      const assembledWord = newSelected.join('');
      if (assembledWord === currentPuzzle.word) {
        sound.playCorrect();
        const nextScore = score + 100;
        setScore(nextScore);
        setStatusMessage(`🎉 Hebat! "${currentPuzzle.word}" tersusun sempurna!`);

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
        setStatusMessage('❌ Susunan kata belum tepat. Klik huruf di kotak jawaban untuk membatalkan!');
      }
    }
  };

  const handleRemoveLetter = (indexToRemove: number) => {
    sound.playClick();
    const letter = selectedLetters[indexToRemove];
    const newSelected = selectedLetters.filter((_, i) => i !== indexToRemove);
    setSelectedLetters(newSelected);

    // Tandai salah satu tile yang sesuai menjadi used: false kembali
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

  const resetAll = () => {
    setCurrentIndex(0);
    setScore(0);
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
                Soal {currentIndex + 1} dari {PUZZLES.length} • Skor: {score} Poin
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
                  <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 bg-teal-100 px-2.5 py-0.5 rounded-full">
                    {currentPuzzle.category}
                  </span>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1"
                  >
                    <HelpCircle size={14} />
                    {showHint ? 'Tutup Penjelasan' : 'Lihat Penjelasan'}
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  "{currentPuzzle.clue}"
                </p>

                {showHint && (
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

                <div className="flex flex-wrap justify-center gap-2 min-h-14 p-2 bg-slate-100/70 rounded-2xl border-2 border-dashed border-slate-300 w-full">
                  {Array.from({ length: currentPuzzle.word.length }).map((_, idx) => {
                    const letter = selectedLetters[idx];
                    return (
                      <button
                        key={idx}
                        onClick={() => letter && handleRemoveLetter(idx)}
                        disabled={!letter}
                        className={`w-11 h-11 rounded-xl font-black text-lg flex items-center justify-center transition-all ${
                          letter
                            ? 'bg-gradient-to-tr from-teal-500 to-emerald-500 text-white shadow-md hover:scale-105 active:scale-95 cursor-pointer'
                            : 'bg-white/80 border border-slate-200 text-transparent cursor-default'
                        }`}
                        title={letter ? 'Klik untuk membatalkan' : ''}
                      >
                        {letter || ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Huruf Acak Yang Tersedia Untuk Diklik */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                  Pilihan Huruf
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {availableTiles.map(tile => (
                    <button
                      key={tile.id}
                      onClick={() => !tile.used && handleTileClick(tile.id, tile.letter)}
                      disabled={tile.used}
                      className={`w-12 h-12 rounded-2xl font-black text-lg transition-all duration-200 ${
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
