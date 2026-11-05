import React, { useState, useEffect } from 'react';
import { 
  X, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, 
  HelpCircle, Trophy, Lightbulb, ArrowLeft, Maximize2, Minimize2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '@/lib/sound';
import { useFullscreen } from '@/lib/fullscreen';

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
  const { isFullscreen, toggleFullscreen } = useFullscreen();
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
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#f8fafc] flex flex-col overflow-hidden select-none animate-fadeIn">
      {/* Top Fullscreen Stage Navbar */}
      <div className="px-4 sm:px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs"
            title="Kembali ke Beranda Materi"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md font-black text-xl shrink-0">
              🧩
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base md:text-lg text-slate-800 line-clamp-1">
                Teka-Teki: Susun Kata & Rumus Sains
              </h3>
              <p className="text-xs text-slate-500 font-medium line-clamp-1">
                Soal {currentIndex + 1} dari {PUZZLES.length} • Skor: {score} Poin {streak > 1 && `• Streak ${streak}x 🔥`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Fullscreen Toggle (Projector / Smartboard) */}
          <button
            onClick={toggleFullscreen}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer border border-slate-200 hover:border-teal-200"
            title={isFullscreen ? 'Keluar dari Layar Penuh' : 'Mode Layar Penuh (Proyektor/TV Kelas)'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span className="hidden md:inline">{isFullscreen ? 'Keluar Penuh' : 'Layar Penuh (Proyektor)'}</span>
          </button>

          <button
            onClick={() => setSoundOn(sound.toggleSound())}
            className="p-2 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            title="Toggle Suara"
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <button
            onClick={() => initPuzzle(currentIndex)}
            className="p-2 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            title="Acak Ulang Huruf"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
            title="Tutup Game"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Fullscreen Stage Content Arena */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center">
        {isCompleted ? (
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-teal-100 text-center space-y-5 animate-scaleUp">
            <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shadow-inner">
              <Trophy size={44} />
            </div>
            <h4 className="font-black text-2xl text-slate-800">
              Luar Biasa! Semua Teka-Teki Terpecahkan!
            </h4>
            <p className="text-sm text-slate-600">
              Kamu berhasil menuntaskan seluruh susunan kata sains dan sejarah dengan total perolehan{' '}
              <strong className="text-teal-600 font-extrabold">{score} poin</strong>!
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={resetAll}
                className="flex-1 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-2xl shadow transition text-sm cursor-pointer"
              >
                Main Lagi Dari Awal
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl transition text-sm cursor-pointer"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl w-full mx-auto flex flex-col justify-center space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Petunjuk Soal Card */}
            <div className="bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1 rounded-xl">
                    {currentPuzzle.category}
                  </span>
                  <span className="text-xs font-bold text-slate-400 hidden sm:inline">
                    Ketukan Keyboard A-Z Didukung
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={useSmartHint}
                    disabled={hintUsed}
                    className="text-xs text-amber-700 hover:text-amber-800 font-extrabold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition disabled:opacity-50 cursor-pointer"
                    title="Buka petunjuk huruf pertama"
                  >
                    <Lightbulb size={15} />
                    <span>{hintUsed ? 'Petunjuk Digunakan' : 'Gunakan Petunjuk'}</span>
                  </button>
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="text-xs text-teal-700 hover:text-teal-800 font-extrabold flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 transition cursor-pointer"
                  >
                    <HelpCircle size={15} />
                    <span>{showExplanation ? 'Tutup Fakta' : 'Fakta Konsep'}</span>
                  </button>
                </div>
              </div>

              <p className="text-base sm:text-xl font-bold text-slate-800 leading-relaxed pt-1">
                "{currentPuzzle.clue}"
              </p>

              {showExplanation && (
                <div className="p-4 bg-teal-50/90 rounded-2xl text-xs sm:text-sm text-teal-950 border border-teal-200/70 animate-fadeIn">
                  <span className="font-extrabold">💡 Fakta Edukatif: </span>
                  {currentPuzzle.explanation}
                </div>
              )}
            </div>

            {/* Kotak Jawaban Yang Disusun (Large projector-friendly touch tiles) */}
            <div className="flex flex-col items-center space-y-3">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Susunan Kata ({selectedLetters.length} / {currentPuzzle.word.length} Huruf)
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white/90 rounded-3xl border-2 border-dashed border-teal-200/80 w-full min-h-[72px] sm:min-h-[84px] shadow-inner items-center">
                {Array.from({ length: currentPuzzle.word.length }).map((_, idx) => {
                  const letter = selectedLetters[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => letter && handleRemoveLetter(idx)}
                      disabled={!letter}
                      className={`w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl font-black text-lg sm:text-2xl flex items-center justify-center transition-all ${
                        letter
                          ? 'bg-gradient-to-tr from-teal-500 to-emerald-500 text-white shadow-md hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-teal-200'
                          : 'bg-slate-50 border-2 border-slate-200 text-transparent cursor-default'
                      }`}
                      title={letter ? 'Klik atau tekan Backspace untuk membatalkan' : ''}
                    >
                      {letter || ''}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Huruf Acak Yang Tersedia Untuk Diklik / Diketik (Large touch buttons) */}
            <div className="space-y-3">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">
                Pilihan Huruf (Sentuh / Klik / Ketik Langsung)
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {availableTiles.map(tile => (
                  <button
                    key={tile.id}
                    onClick={() => !tile.used && handleTileClick(tile.id, tile.letter)}
                    disabled={tile.used}
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl font-black text-lg sm:text-2xl transition-all duration-200 cursor-pointer ${
                      tile.used
                        ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed scale-90'
                        : 'bg-white hover:bg-teal-50 border-2 border-slate-200 hover:border-teal-500 text-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 active:bg-teal-100'
                    }`}
                  >
                    {tile.letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Message */}
            <div className="p-3.5 sm:p-4 bg-white rounded-2xl text-xs sm:text-sm font-bold text-slate-700 border border-slate-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Sparkles size={18} className="text-teal-600 shrink-0" />
                <span>{statusMessage}</span>
              </div>
              {selectedLetters.join('') === currentPuzzle.word && (
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
