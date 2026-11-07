import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, CheckCircle2, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { sound } from '@/lib/sound';

export interface MatchPairItem {
  id: string; // ID unik pasangan
  leftText: string;
  rightText: string;
}

export type MatchTheme = 'purple' | 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'teal' | 'orange';

export interface CanvaMatchPairsGameProps {
  title?: string;
  subtitle?: string; // Backward compatibility alias for instructions
  instructions?: string;
  pairs: MatchPairItem[];
  onComplete?: (isAllCorrect: boolean) => void;
  theme?: MatchTheme;
  leftColumnHeader?: string;
  rightColumnHeader?: string;
  className?: string;
}

const MATCH_THEME_STYLES: Record<MatchTheme, {
  container: string;
  badge: string;
  tag: string;
  checkBtn: string;
  activeLine: string;
  leftHeader: string;
  rightHeader: string;
  leftSelected: string;
  rightHover: string;
  dotLeft: string;
  dotRight: string;
}> = {
  purple: {
    container: 'bg-purple-50/40 border-purple-200/80',
    badge: 'text-purple-700 bg-purple-100',
    tag: 'text-purple-700/80 bg-purple-100/60 border-purple-200/50',
    checkBtn: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200',
    activeLine: '#a855f7',
    leftHeader: 'text-purple-700',
    rightHeader: 'text-blue-700',
    leftSelected: 'border-purple-600 bg-purple-100 text-purple-900 shadow-md ring-2 ring-purple-300',
    rightHover: 'border-blue-400 bg-blue-50/50 text-blue-900 hover:bg-blue-100 ring-2 ring-blue-200',
    dotLeft: 'bg-purple-400',
    dotRight: 'bg-blue-400',
  },
  blue: {
    container: 'bg-blue-50/40 border-blue-200/80',
    badge: 'text-blue-700 bg-blue-100',
    tag: 'text-blue-700/80 bg-blue-100/60 border-blue-200/50',
    checkBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200',
    activeLine: '#0284c7',
    leftHeader: 'text-blue-700',
    rightHeader: 'text-indigo-700',
    leftSelected: 'border-blue-600 bg-blue-100 text-blue-900 shadow-md ring-2 ring-blue-300',
    rightHover: 'border-indigo-400 bg-indigo-50/50 text-indigo-900 hover:bg-indigo-100 ring-2 ring-indigo-200',
    dotLeft: 'bg-blue-400',
    dotRight: 'bg-indigo-400',
  },
  emerald: {
    container: 'bg-emerald-50/40 border-emerald-200/80',
    badge: 'text-emerald-700 bg-emerald-100',
    tag: 'text-emerald-700/80 bg-emerald-100/60 border-emerald-200/50',
    checkBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200',
    activeLine: '#10b981',
    leftHeader: 'text-emerald-700',
    rightHeader: 'text-teal-700',
    leftSelected: 'border-emerald-600 bg-emerald-100 text-emerald-900 shadow-md ring-2 ring-emerald-300',
    rightHover: 'border-teal-400 bg-teal-50/50 text-teal-900 hover:bg-teal-100 ring-2 ring-teal-200',
    dotLeft: 'bg-emerald-400',
    dotRight: 'bg-teal-400',
  },
  amber: {
    container: 'bg-amber-50/40 border-amber-200/80',
    badge: 'text-amber-700 bg-amber-100',
    tag: 'text-amber-700/80 bg-amber-100/60 border-amber-200/50',
    checkBtn: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200',
    activeLine: '#f59e0b',
    leftHeader: 'text-amber-700',
    rightHeader: 'text-orange-700',
    leftSelected: 'border-amber-600 bg-amber-100 text-amber-900 shadow-md ring-2 ring-amber-300',
    rightHover: 'border-orange-400 bg-orange-50/50 text-orange-900 hover:bg-orange-100 ring-2 ring-orange-200',
    dotLeft: 'bg-amber-400',
    dotRight: 'bg-orange-400',
  },
  rose: {
    container: 'bg-rose-50/40 border-rose-200/80',
    badge: 'text-rose-700 bg-rose-100',
    tag: 'text-rose-700/80 bg-rose-100/60 border-rose-200/50',
    checkBtn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200',
    activeLine: '#f43f5e',
    leftHeader: 'text-rose-700',
    rightHeader: 'text-pink-700',
    leftSelected: 'border-rose-600 bg-rose-100 text-rose-900 shadow-md ring-2 ring-rose-300',
    rightHover: 'border-pink-400 bg-pink-50/50 text-pink-900 hover:bg-pink-100 ring-2 ring-pink-200',
    dotLeft: 'bg-rose-400',
    dotRight: 'bg-pink-400',
  },
  indigo: {
    container: 'bg-indigo-50/40 border-indigo-200/80',
    badge: 'text-indigo-700 bg-indigo-100',
    tag: 'text-indigo-700/80 bg-indigo-100/60 border-indigo-200/50',
    checkBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200',
    activeLine: '#6366f1',
    leftHeader: 'text-indigo-700',
    rightHeader: 'text-purple-700',
    leftSelected: 'border-indigo-600 bg-indigo-100 text-indigo-900 shadow-md ring-2 ring-indigo-300',
    rightHover: 'border-purple-400 bg-purple-50/50 text-purple-900 hover:bg-purple-100 ring-2 ring-purple-200',
    dotLeft: 'bg-indigo-400',
    dotRight: 'bg-purple-400',
  },
  teal: {
    container: 'bg-teal-50/40 border-teal-200/80',
    badge: 'text-teal-700 bg-teal-100',
    tag: 'text-teal-700/80 bg-teal-100/60 border-teal-200/50',
    checkBtn: 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-200',
    activeLine: '#0d9488',
    leftHeader: 'text-teal-700',
    rightHeader: 'text-emerald-700',
    leftSelected: 'border-teal-600 bg-teal-100 text-teal-900 shadow-md ring-2 ring-teal-300',
    rightHover: 'border-emerald-400 bg-emerald-50/50 text-emerald-900 hover:bg-emerald-100 ring-2 ring-emerald-200',
    dotLeft: 'bg-teal-400',
    dotRight: 'bg-emerald-400',
  },
  orange: {
    container: 'bg-orange-50/40 border-orange-200/80',
    badge: 'text-orange-700 bg-orange-100',
    tag: 'text-orange-700/80 bg-orange-100/60 border-orange-200/50',
    checkBtn: 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200',
    activeLine: '#ea580c',
    leftHeader: 'text-orange-700',
    rightHeader: 'text-amber-700',
    leftSelected: 'border-orange-600 bg-orange-100 text-orange-900 shadow-md ring-2 ring-orange-300',
    rightHover: 'border-amber-400 bg-amber-50/50 text-amber-900 hover:bg-amber-100 ring-2 ring-amber-200',
    dotLeft: 'bg-orange-400',
    dotRight: 'bg-amber-400',
  },
};

const getHazardPikto = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes('korosif') || lower.includes('asam')) {
    return { icon: '⚠️', symbol: '🧪', color: 'bg-amber-100 text-amber-900 border-amber-300' };
  }
  if (lower.includes('toksik') || lower.includes('tengkorak') || lower.includes('racun')) {
    return { icon: '☠️', symbol: '☣️', color: 'bg-rose-100 text-rose-900 border-rose-300' };
  }
  if (lower.includes('api') || lower.includes('menyala') || lower.includes('bakar')) {
    return { icon: '🔥', symbol: '⚡', color: 'bg-orange-100 text-orange-900 border-orange-300' };
  }
  if (lower.includes('eksplosif') || lower.includes('reaktif') || lower.includes('ledak')) {
    return { icon: '💥', symbol: '💣', color: 'bg-red-100 text-red-900 border-red-300' };
  }
  return null;
};

/**
 * Komponen Game Interaktif Canva Education: "Match the Pairs / Match A to B"
 * Menjodohkan konsep di kolom kiri dengan pasangan di kolom kanan.
 * Dilengkapi garis rubber-band SVG dinamis berakurasi tinggi dengan ResizeObserver.
 */
export const CanvaMatchPairsGame: React.FC<CanvaMatchPairsGameProps> = ({
  title = 'Jodohkan Pasangan yang Sesuai',
  subtitle,
  instructions,
  pairs,
  onComplete,
  theme = 'purple',
  leftColumnHeader = 'Kolom A: Konsep',
  rightColumnHeader = 'Kolom B: Pasangan',
  className = '',
}) => {
  const displayInstructions = instructions || subtitle || 'Klik istilah di kolom kiri, lalu klik pasangannya di kolom kanan untuk menghubungkan.';
  const themeStyle = MATCH_THEME_STYLES[theme] || MATCH_THEME_STYLES.purple;

  // Kolom kiri urutan tetap, kolom kanan diacak
  const [leftItems, setLeftItems] = useState<MatchPairItem[]>(pairs);
  const [rightItems, setRightItems] = useState<MatchPairItem[]>(() => {
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

  // Sinkronisasi bila pairs berubah dari deck
  useEffect(() => {
    setLeftItems(pairs);
    setRightItems([...pairs].sort(() => Math.random() - 0.5));
    setConnections({});
    setSelectedLeftId(null);
    setCheckedState(false);
    setIsSuccess(false);
  }, [pairs]);

  // Hitung ulang garis SVG setiap kali koneksi berubah atau container di-resize
  const updateLinePositions = useCallback(() => {
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
  }, [connections]);

  useEffect(() => {
    updateLinePositions();
    const handleResize = () => updateLinePositions();
    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(updateLinePositions);
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [updateLinePositions]);

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
      className={`w-full h-full flex flex-col items-center justify-between relative overflow-hidden ${className}`}
    >
      {/* SVG Garis Penghubung (Rubber-Band Bezier Lines Khas Canva Game) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {lines.map((line, idx) => {
          const isCorrect = checkedState && line.leftId === line.rightId;
          const isWrong = checkedState && line.leftId !== line.rightId;

          const strokeColor = isCorrect ? '#10b981' : isWrong ? '#f43f5e' : themeStyle.activeLine;
          const midX = (line.x1 + line.x2) / 2;

          return (
            <g key={`line-${idx}`}>
              {/* Outer soft glow beam */}
              <path
                d={`M ${line.x1} ${line.y1} C ${midX} ${line.y1}, ${midX} ${line.y2}, ${line.x2} ${line.y2}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isCorrect ? '8' : isWrong ? '7' : '6'}
                strokeOpacity={0.3}
                strokeLinecap="round"
              />
              {/* Core laser beam */}
              <path
                d={`M ${line.x1} ${line.y1} C ${midX} ${line.y1}, ${midX} ${line.y2}, ${line.x2} ${line.y2}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isCorrect || isWrong ? '3.5' : '2.5'}
                strokeDasharray={isCorrect ? undefined : '6 4'}
                strokeLinecap="round"
                className="transition-colors duration-200"
              />
              {/* Lingkaran Titik Temu di Ujung Garis */}
              <circle cx={line.x1} cy={line.y1} r="6" fill={strokeColor} stroke="#ffffff" strokeWidth="2" />
              <circle cx={line.x2} cy={line.y2} r="6" fill={strokeColor} stroke="#ffffff" strokeWidth="2" />
            </g>
          );
        })}
      </svg>

      {/* Header Tantangan Canva */}
      <div className="text-center max-w-xl mb-3 sm:mb-5 z-20 shrink-0">
        <h3 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">{displayInstructions}</p>
      </div>

      {/* Grid Dua Kolom Sejajar (Full Canvas Space Utilization) */}
      <div className="w-full max-w-4xl grid grid-cols-2 gap-4 sm:gap-8 md:gap-12 my-auto z-20">
        {/* Kolom Kiri: Istilah / Konsep */}
        <div className="flex flex-col space-y-2.5 sm:space-y-3">
          <span className={`text-[11px] sm:text-xs font-black uppercase tracking-wider px-1 ${themeStyle.leftHeader}`}>
            {leftColumnHeader}
          </span>
          {leftItems.map(item => {
            const isSelected = selectedLeftId === item.id;
            const connectedRightId = connections[item.id];
            const isCorrect = checkedState && connectedRightId === item.id;
            const isWrong = checkedState && connectedRightId && connectedRightId !== item.id;
            const pikto = getHazardPikto(item.leftText);

            return (
              <button
                key={`left-${item.id}`}
                ref={el => { leftRefs.current[item.id] = el; }}
                type="button"
                onClick={() => handleSelectLeft(item.id)}
                className={`w-full p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl text-left border-2.5 sm:border-3 border-b-5 sm:border-b-6 transition-all duration-150 flex items-center justify-between font-bold text-xs sm:text-sm cursor-pointer active:translate-y-1 active:border-b-2.5 backdrop-blur-xs ${
                  isCorrect
                    ? 'border-emerald-500 border-b-emerald-600 bg-emerald-50/95 text-emerald-950 shadow-md ring-2 ring-emerald-300'
                    : isWrong
                    ? 'border-rose-400 border-b-rose-500 bg-rose-50/95 text-rose-950 shadow-md ring-2 ring-rose-300'
                    : isSelected
                    ? `${themeStyle.leftSelected} -translate-y-0.5`
                    : connectedRightId
                    ? 'border-slate-300 border-b-slate-400 bg-white/95 text-slate-900 shadow-xs'
                    : 'border-slate-200 border-b-slate-300 bg-white/95 text-slate-800 hover:border-teal-300 hover:border-b-teal-400 hover:bg-teal-50/40 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 pr-2">
                  {pikto && (
                    <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-sm sm:text-base border-2 shadow-2xs shrink-0 select-none ${pikto.color}`}>
                      {pikto.icon}
                    </span>
                  )}
                  <span className="leading-snug">{item.leftText}</span>
                </div>
                <span className="shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 size={18} className="text-emerald-600" />
                  ) : isWrong ? (
                    <AlertCircle size={18} className="text-rose-500" />
                  ) : (
                    <span className={`w-3 h-3 rounded-full ${themeStyle.dotLeft} inline-block shadow-2xs`}></span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Kolom Kanan: Definisi / Pasangan */}
        <div className="flex flex-col space-y-2.5 sm:space-y-3">
          <span className={`text-[11px] sm:text-xs font-black uppercase tracking-wider px-1 ${themeStyle.rightHeader}`}>
            {rightColumnHeader}
          </span>
          {rightItems.map(item => {
            const isConnected = Object.values(connections).includes(item.id);
            const connectedLeftId = Object.keys(connections).find(k => connections[k] === item.id);
            const isCorrect = checkedState && connectedLeftId === item.id;
            const isWrong = checkedState && connectedLeftId && connectedLeftId !== item.id;

            return (
              <button
                key={`right-${item.id}`}
                ref={el => { rightRefs.current[item.id] = el; }}
                type="button"
                onClick={() => handleSelectRight(item.id)}
                className={`w-full p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl text-left border-2.5 sm:border-3 border-b-5 sm:border-b-6 transition-all duration-150 flex items-center justify-between font-bold text-xs sm:text-sm cursor-pointer active:translate-y-1 active:border-b-2.5 backdrop-blur-xs ${
                  isCorrect
                    ? 'border-emerald-500 border-b-emerald-600 bg-emerald-50/95 text-emerald-950 shadow-md ring-2 ring-emerald-300'
                    : isWrong
                    ? 'border-rose-400 border-b-rose-500 bg-rose-50/95 text-rose-950 shadow-md ring-2 ring-rose-300'
                    : isConnected
                    ? 'border-slate-300 border-b-slate-400 bg-white/95 text-slate-900 shadow-xs'
                    : selectedLeftId
                    ? `${themeStyle.rightHover} -translate-y-0.5`
                    : 'border-slate-200 border-b-slate-300 bg-white/95 text-slate-800 hover:border-teal-300 hover:border-b-teal-400 hover:bg-teal-50/40 shadow-xs'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${themeStyle.dotRight} inline-block mr-2.5 shrink-0 shadow-2xs`}></span>
                <span className="flex-1 pr-2 leading-snug">{item.rightText}</span>
                {checkedState && (
                  <span className="shrink-0">
                    {isCorrect ? (
                      <CheckCircle2 size={18} className="text-emerald-600" />
                    ) : (
                      <AlertCircle size={18} className="text-rose-500" />
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
          className={`w-full max-w-md my-2 sm:my-3 p-3 rounded-2xl border-2 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 z-20 shadow-md animate-in fade-in duration-200 ${
            isSuccess
              ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
              : 'bg-rose-100 border-rose-400 text-rose-950'
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
              <span>Beberapa pasangan belum tepat atau belum tersambung. Coba periksa garis merah!</span>
            </>
          )}
        </div>
      )}

      {/* Action Buttons Bawah */}
      <div className="flex items-center gap-3 mt-3 w-full max-w-md justify-center z-20 shrink-0">
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 py-2.5 sm:py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border-2 border-b-4 border-slate-300 active:translate-y-0.5 active:border-b-2 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-all"
        >
          <RotateCcw size={16} />
          <span>Reset Garis</span>
        </button>

        <button
          type="button"
          onClick={handleCheckMatches}
          className={`flex-1 py-2.5 sm:py-3 px-4 rounded-2xl ${themeStyle.checkBtn} border-2 border-b-4 border-teal-800 active:translate-y-0.5 active:border-b-2 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer transition-all`}
        >
          <LinkIcon size={16} />
          <span>Periksa Pasangan</span>
        </button>
      </div>
    </div>
  );
};
