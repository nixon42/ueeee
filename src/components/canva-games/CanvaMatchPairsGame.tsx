import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { sound } from '@/lib/sound';

export interface MatchPairItem {
  id: string; // ID unik pasangan
  leftText: string;
  rightText: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  pairs: MatchPairItem[];
  onComplete?: (isAllCorrect: boolean) => void;
  className?: string;
}

/**
 * Komponen Game Interaktif Canva Education: "Match the Pairs / Match A to B"
 * Menjodohkan konsep di kolom kiri dengan pasangan di kolom kanan.
 */
export const CanvaMatchPairsGame: React.FC<Props> = ({
  title = 'Jodohkan Pasangan yang Sesuai',
  subtitle = 'Klik istilah di kolom kiri, lalu klik pasangannya di kolom kanan untuk menghubungkan.',
  pairs,
  onComplete,
  className = '',
}) => {
  // Kolom kiri urutan tetap, kolom kanan diacak
  const [leftItems] = useState<MatchPairItem[]>(pairs);
  const [rightItems] = useState<MatchPairItem[]>(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  });

  // State koneksi: leftId -> rightId
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [checkedState, setCheckedState] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Posisi elemen untuk menggambar SVG garis dinamis
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rightRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lines, setLines] = useState<Array<{ leftId: string; rightId: string; x1: number; y1: number; x2: number; y2: number }>>([]);

  // Hitung ulang garis SVG setiap kali koneksi berubah atau window di-resize
  const updateLinePositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newLines: Array<{ leftId: string; rightId: string; x1: number; y1: number; x2: number; y2: number }> = [];

    Object.entries(connections).forEach(([leftId, rightId]) => {
      const leftEl = leftRefs.current[leftId];
      const rightEl = rightRefs.current[rightId];
      if (leftEl && rightEl) {
        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();

        newLines.push({
          leftId,
          rightId,
          x1: leftRect.right - containerRect.left,
          y1: leftRect.top + leftRect.height / 2 - containerRect.top,
          x2: rightRect.left - containerRect.left,
          y2: rightRect.top + rightRect.height / 2 - containerRect.top,
        });
      }
    });

    setLines(newLines);
  };

  useEffect(() => {
    updateLinePositions();
    const handleResize = () => updateLinePositions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [connections]);

  const handleSelectLeft = (id: string) => {
    sound.playClick();
    setSelectedLeftId(id);
    setCheckedState(false);
  };

  const handleSelectRight = (id: string) => {
    if (!selectedLeftId) return;
    sound.playClick();

    // Hubungkan leftId terpilih ke rightId
    setConnections(prev => {
      const next = { ...prev };
      // Hapus jika rightId ini sudah tersambung ke left lain
      Object.keys(next).forEach(key => {
        if (next[key] === id) delete next[key];
      });
      next[selectedLeftId] = id;
      return next;
    });

    setSelectedLeftId(null);
    setCheckedState(false);
  };

  const handleReset = () => {
    sound.playClick();
    setConnections({});
    setSelectedLeftId(null);
    setCheckedState(false);
    setIsSuccess(false);
  };

  const handleCheckMatches = () => {
    const totalPairs = pairs.length;
    const connectionCount = Object.keys(connections).length;

    let correctCount = 0;
    Object.entries(connections).forEach(([leftId, rightId]) => {
      // leftId dan rightId harus sama karena berasal dari objek pair yang sama
      if (leftId === rightId) {
        correctCount++;
      }
    });

    const allCorrect = connectionCount === totalPairs && correctCount === totalPairs;

    setCheckedState(true);
    setIsSuccess(allCorrect);

    if (allCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    if (onComplete) {
      onComplete(allCorrect);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col items-center justify-between p-4 sm:p-6 bg-purple-50/40 rounded-3xl border border-purple-200/80 shadow-sm relative overflow-hidden ${className}`}
    >
      {/* SVG Garis Penghubung (Rubber-Band Lines Khas Canva) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {lines.map((line, idx) => {
          const isCorrect = checkedState && line.leftId === line.rightId;
          const isWrong = checkedState && line.leftId !== line.rightId;

          const strokeColor = isCorrect ? '#10b981' : isWrong ? '#f43f5e' : '#a855f7';

          return (
            <g key={`line-${idx}`}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={strokeColor}
                strokeWidth={isCorrect || isWrong ? '3' : '2.5'}
                strokeDasharray="6 4"
                strokeLinecap="round"
                className="transition-colors duration-200"
              />
              {/* Lingkaran Titik Temu di Ujung Garis */}
              <circle cx={line.x1} cy={line.y1} r="4" fill={strokeColor} />
              <circle cx={line.x2} cy={line.y2} r="4" fill={strokeColor} />
            </g>
          );
        })}
      </svg>

      {/* Header Tantangan Canva */}
      <div className="text-center max-w-xl mb-4 sm:mb-6 z-20">
        <span className="text-[11px] font-black uppercase tracking-widest text-purple-600 block mb-1">
          Tantangan Pasangan Konsep
        </span>
        <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">{subtitle}</p>
      </div>

      {/* Grid Dua Kolom Sejajar */}
      <div className="w-full grid grid-cols-2 gap-4 sm:gap-8 my-auto z-20">
        {/* Kolom Kiri: Istilah / Konsep */}
        <div className="flex flex-col space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-purple-700 px-1">
            Kolom A: Konsep
          </span>
          {leftItems.map(item => {
            const isSelected = selectedLeftId === item.id;
            const connectedRightId = connections[item.id];
            const isCorrect = checkedState && connectedRightId === item.id;
            const isWrong = checkedState && connectedRightId && connectedRightId !== item.id;

            return (
              <button
                key={`left-${item.id}`}
                ref={el => { leftRefs.current[item.id] = el; }}
                type="button"
                onClick={() => handleSelectLeft(item.id)}
                className={`w-full p-3 sm:p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between font-bold text-xs sm:text-sm cursor-pointer ${
                  isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm'
                    : isWrong
                    ? 'border-rose-400 bg-rose-50 text-rose-900 shadow-sm'
                    : isSelected
                    ? 'border-purple-600 bg-purple-100 text-purple-900 shadow-md ring-2 ring-purple-300'
                    : connectedRightId
                    ? 'border-purple-300 bg-white text-slate-800 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300 hover:bg-purple-50/50 shadow-sm'
                }`}
              >
                <span className="pr-2">{item.leftText}</span>
                <span className="shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 size={16} className="text-emerald-600" />
                  ) : isWrong ? (
                    <AlertCircle size={16} className="text-rose-500" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block"></span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Kolom Kanan: Definisi / Pasangan */}
        <div className="flex flex-col space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-blue-700 px-1">
            Kolom B: Pasangan
          </span>
          {rightItems.map(item => {
            const isConnected = Object.values(connections).includes(item.id);
            // Cari leftId yang tersambung ke right item ini
            const connectedLeftId = Object.keys(connections).find(k => connections[k] === item.id);
            const isCorrect = checkedState && connectedLeftId === item.id;
            const isWrong = checkedState && connectedLeftId && connectedLeftId !== item.id;

            return (
              <button
                key={`right-${item.id}`}
                ref={el => { rightRefs.current[item.id] = el; }}
                type="button"
                onClick={() => handleSelectRight(item.id)}
                className={`w-full p-3 sm:p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between font-bold text-xs sm:text-sm cursor-pointer ${
                  isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm'
                    : isWrong
                    ? 'border-rose-400 bg-rose-50 text-rose-900 shadow-sm'
                    : isConnected
                    ? 'border-purple-300 bg-white text-slate-800 shadow-sm'
                    : selectedLeftId
                    ? 'border-blue-400 bg-blue-50/50 text-blue-900 hover:bg-blue-100 ring-2 ring-blue-200'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50 shadow-sm'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block mr-2 shrink-0"></span>
                <span className="flex-1 pr-2">{item.rightText}</span>
                {checkedState && (
                  <span className="shrink-0">
                    {isCorrect ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <AlertCircle size={16} className="text-rose-500" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Umpan Balik Hasil Validasi */}
      {checkedState && (
        <div
          className={`w-full max-w-md my-4 p-3 rounded-2xl border text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 z-20 ${
            isSuccess
              ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
              : 'bg-rose-100 border-rose-300 text-rose-900'
          }`}
        >
          {isSuccess ? (
            <>
              <CheckCircle2 size={18} className="text-emerald-700 shrink-0" />
              <span>Luar biasa! Seluruh pasangan berhasil dijodohkan dengan tepat!</span>
            </>
          ) : (
            <>
              <AlertCircle size={18} className="text-rose-700 shrink-0" />
              <span>Beberapa pasangan belum tepat atau belum tersambung. Coba cek garis merah!</span>
            </>
          )}
        </div>
      )}

      {/* Action Buttons Bawah */}
      <div className="flex items-center gap-3 mt-4 w-full max-w-md justify-center z-20">
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition"
        >
          <RotateCcw size={15} />
          <span>Reset Garis</span>
        </button>

        <button
          type="button"
          onClick={handleCheckMatches}
          className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer transition"
        >
          <LinkIcon size={16} />
          <span>Periksa Pasangan</span>
        </button>
      </div>

      {/* AI Activity Tag di Sudut Kanan Bawah */}
      <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[10px] font-bold text-purple-700/80 bg-purple-100/60 px-2 py-0.5 rounded-full border border-purple-200/50 z-20">
        <Sparkles size={11} />
        <span>Canva Match Pairs</span>
      </div>
    </div>
  );
};
