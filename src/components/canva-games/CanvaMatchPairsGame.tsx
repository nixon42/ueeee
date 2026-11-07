import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
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
  chapterBadge?: string;
  gameId?: string;
  pairs: MatchPairItem[];
  onComplete?: (isAllCorrect: boolean) => void;
  theme?: MatchTheme;
  leftColumnHeader?: string;
  rightColumnHeader?: string;
  className?: string;
}

const getHazardPikto = (text: string) => {
  const lower = text.toLowerCase();
  if (lower.includes('korosif') || lower.includes('asam')) {
    return { icon: '⚠️', symbol: '🧪', color: 'bg-amber-500/20 text-amber-300 border-amber-400/40' };
  }
  if (lower.includes('toksik') || lower.includes('tengkorak') || lower.includes('racun')) {
    return { icon: '☠️', symbol: '☣️', color: 'bg-rose-500/20 text-rose-300 border-rose-400/40' };
  }
  if (lower.includes('api') || lower.includes('menyala') || lower.includes('bakar')) {
    return { icon: '🔥', symbol: '⚡', color: 'bg-orange-500/20 text-orange-300 border-orange-400/40' };
  }
  if (lower.includes('eksplosif') || lower.includes('reaktif') || lower.includes('ledak')) {
    return { icon: '💥', symbol: '💣', color: 'bg-red-500/20 text-red-300 border-red-400/40' };
  }
  return null;
};

/**
 * Komponen Game Interaktif: "Neon Laser Conduit Linker / Match A to B"
 * Menghubungkan konsep energi/materi di Kolom A dengan fenomena di Kolom B
 * menggunakan garis laser neon SVG dinamis dan touchpad arcade taktil (zero-scroll).
 */
export const CanvaMatchPairsGame: React.FC<CanvaMatchPairsGameProps> = ({
  title = 'Jodohkan Pasangan yang Sesuai',
  subtitle,
  instructions,
  chapterBadge,
  gameId,
  pairs,
  onComplete,
  theme = 'amber',
  leftColumnHeader = 'Kolom A: Bentuk Energi',
  rightColumnHeader = 'Kolom B: Pemanfaatan / Fenomena',
  className = '',
}) => {
  const displayInstructions =
    instructions || subtitle || 'Klik satu terminal di Kolom A, lalu klik pasangannya di Kolom B untuk menyambungkan laser energi.';
  const isPurple = theme === 'purple' || gameId === 'ular-tangga-tatasurya';

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

  // Posisi elemen untuk menggambar SVG garis laser dinamis
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rightRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lines, setLines] = useState<
    Array<{ leftId: string; rightId: string; x1: number; y1: number; x2: number; y2: number }>
  >([]);

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
    const newLines: Array<{
      leftId: string;
      rightId: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }> = [];

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
    if (selectedLeftId === id) {
      setSelectedLeftId(null);
    } else {
      setSelectedLeftId(id);
    }
    setCheckedState(false);
  };

  const handleSelectRight = (id: string) => {
    if (!selectedLeftId) return;
    sound.playClick();

    // Hubungkan leftId terpilih ke rightId
    setConnections((prev) => {
      const next = { ...prev };
      // Hapus jika rightId ini sudah tersambung ke left lain
      Object.keys(next).forEach((key) => {
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

  const connectedCount = Object.keys(connections).length;
  const totalCount = pairs.length;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl border-4 ${
        isPurple
          ? 'border-purple-900/40 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 shadow-[0_18px_40px_-12px_rgba(59,7,100,0.55)]'
          : 'border-emerald-950/40 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 shadow-[0_18px_40px_-12px_rgba(2,44,34,0.55)]'
      } select-none animate-in fade-in duration-300 ${className}`}
    >
      {/* ── COCKPIT HUD TOP BAR ───────────────────────────── */}
      <div className="relative z-30 px-3 sm:px-5 pt-2.5 sm:pt-3.5 pb-1 shrink-0 flex items-center justify-between gap-2.5">
        <div
          className={`inline-block max-w-[75%] sm:max-w-[80%] rounded-2xl ${
            isPurple
              ? 'bg-gradient-to-r from-purple-950/95 via-indigo-900/90 to-slate-950/55 border-l-[6px] border-cyan-400'
              : 'bg-gradient-to-r from-emerald-950/95 via-emerald-900/90 to-emerald-900/55 border-l-[6px] border-amber-400'
          } backdrop-blur-sm pl-3 sm:pl-4 pr-4 sm:pr-6 py-1.5 sm:py-2 shadow-xl`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`px-1.5 py-0.5 rounded-md font-black text-[9px] sm:text-[10px] tracking-widest uppercase ${
                isPurple ? 'bg-cyan-400 text-slate-950' : 'bg-amber-400 text-emerald-950'
              }`}
            >
              {chapterBadge || 'TANTANGAN KONEKSI'}
            </span>
            <h2 className="text-base sm:text-xl md:text-2xl font-black text-white leading-tight tracking-tight drop-shadow truncate">
              {title}
            </h2>
          </div>
          {displayInstructions && (
            <p
              className={`text-[10.5px] sm:text-xs font-bold leading-snug mt-0.5 truncate hidden sm:block ${
                isPurple ? 'text-cyan-300/95' : 'text-amber-300/95'
              }`}
            >
              {displayInstructions}
            </p>
          )}
        </div>

        {/* Dynamic Connection Status Indicator */}
        <div className="shrink-0 flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-xl border backdrop-blur-sm text-xs font-black flex items-center gap-1.5 shadow-md ${
              checkedState
                ? isSuccess
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-rose-500/20 border-rose-400 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : connectedCount === totalCount
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : isPurple
                ? 'bg-purple-900/60 border-purple-500/40 text-cyan-200'
                : 'bg-emerald-900/60 border-emerald-500/40 text-amber-200'
            }`}
          >
            <Zap
              size={13}
              className={
                isSuccess
                  ? 'text-emerald-400 fill-emerald-400'
                  : connectedCount === totalCount
                  ? 'text-amber-400 fill-amber-400'
                  : isPurple
                  ? 'text-cyan-400'
                  : 'text-amber-400'
              }
            />
            <span>
              {checkedState
                ? isSuccess
                  ? 'Sirkuit 100% Sempurna!'
                  : 'Ada Sambungan Keliru'
                : `${connectedCount} / ${totalCount} Jalur Terhubung`}
            </span>
          </div>
        </div>
      </div>

      {/* ── LASER CONDUIT SVG ENGINE LAYER ────────────────── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <defs>
          <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {lines.map((line, idx) => {
          const isCorrect = checkedState && line.leftId === line.rightId;
          const isWrong = checkedState && line.leftId !== line.rightId;

          const coreColor = isCorrect
            ? '#34d399'
            : isWrong
            ? '#fb7185'
            : isPurple
            ? '#38bdf8'
            : '#fbbf24';

          const glowColor = isCorrect
            ? 'rgba(16,185,129,0.5)'
            : isWrong
            ? 'rgba(244,63,94,0.5)'
            : isPurple
            ? 'rgba(56,189,248,0.5)'
            : 'rgba(251,191,36,0.5)';

          const midX = (line.x1 + line.x2) / 2;
          const pathD = `M ${line.x1} ${line.y1} C ${midX} ${line.y1}, ${midX} ${line.y2}, ${line.x2} ${line.y2}`;

          return (
            <g key={`laser-line-${idx}`}>
              {/* Outer Glowing Beam */}
              <path
                d={pathD}
                fill="none"
                stroke={glowColor}
                strokeWidth={isCorrect || isWrong ? '8' : '6'}
                strokeLinecap="round"
                filter="url(#laserGlow)"
              />
              {/* Inner High-Intensity Core Laser */}
              <path
                d={pathD}
                fill="none"
                stroke={coreColor}
                strokeWidth={isCorrect || isWrong ? '3.5' : '2.5'}
                strokeDasharray={isCorrect ? undefined : '8 4'}
                strokeLinecap="round"
                className="transition-colors duration-200"
              />
              {/* Terminal Port Node Rings */}
              <circle cx={line.x1} cy={line.y1} r="6" fill={coreColor} className="animate-pulse" />
              <circle cx={line.x1} cy={line.y1} r="2.5" fill="#ffffff" />
              <circle cx={line.x2} cy={line.y2} r="6" fill={coreColor} className="animate-pulse" />
              <circle cx={line.x2} cy={line.y2} r="2.5" fill="#ffffff" />
            </g>
          );
        })}
      </svg>

      {/* ── DUAL CONDUIT TERMINAL TOUCHPADS (MAIN ARENA) ─── */}
      <div className="relative z-10 flex-1 min-h-0 px-3 sm:px-6 py-2 flex items-center justify-center my-auto">
        <div className="w-full max-w-4xl grid grid-cols-2 gap-4 sm:gap-8 md:gap-14 items-center">
          {/* KOLOM KIRI: Terminal Sumber Energi */}
          <div className="flex flex-col gap-2 sm:gap-2.5">
            <div className="flex items-center gap-2 px-1 mb-0.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPurple ? 'bg-cyan-400' : 'bg-amber-400'
                } animate-ping`}
              />
              <span
                className={`text-[10px] sm:text-xs font-black uppercase tracking-wider ${
                  isPurple ? 'text-cyan-300' : 'text-amber-300'
                }`}
              >
                {leftColumnHeader}
              </span>
            </div>

            {leftItems.map((item, idx) => {
              const isSelected = selectedLeftId === item.id;
              const connectedRightId = connections[item.id];
              const isCorrect = checkedState && connectedRightId === item.id;
              const isWrong = checkedState && connectedRightId && connectedRightId !== item.id;
              const pikto = getHazardPikto(item.leftText);

              return (
                <button
                  key={`left-${item.id}`}
                  ref={(el) => {
                    leftRefs.current[item.id] = el;
                  }}
                  type="button"
                  onClick={() => handleSelectLeft(item.id)}
                  className={`group relative w-full min-h-[50px] sm:min-h-[56px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-left border-2 transition-all flex items-center justify-between font-extrabold text-xs sm:text-sm cursor-pointer select-none active:scale-[0.98] ${
                    isCorrect
                      ? 'border-emerald-400 bg-emerald-950/90 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                      : isWrong
                      ? 'border-rose-400 bg-rose-950/90 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.35)]'
                      : isSelected
                      ? isPurple
                        ? 'border-cyan-300 bg-slate-900/95 text-cyan-200 ring-4 ring-cyan-400 shadow-[0_0_24px_rgba(6,182,212,0.6)] scale-[1.02]'
                        : 'border-amber-300 bg-slate-900/95 text-amber-200 ring-4 ring-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.6)] scale-[1.02]'
                      : connectedRightId
                      ? isPurple
                        ? 'border-indigo-400/70 bg-slate-900/90 text-indigo-100'
                        : 'border-emerald-400/70 bg-slate-900/90 text-emerald-100'
                      : isPurple
                      ? 'border-purple-600/40 bg-slate-950/80 text-slate-200 hover:border-cyan-400/70 hover:bg-slate-900/90'
                      : 'border-emerald-700/40 bg-slate-950/80 text-slate-200 hover:border-amber-400/70 hover:bg-slate-900/90'
                  }`}
                >
                  {/* Left Index Badge or Hazard Icon & Label */}
                  <div className="flex items-center gap-2 truncate pr-2">
                    {pikto ? (
                      <span className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center shrink-0 border ${pikto.color}`}>
                        {pikto.icon}
                      </span>
                    ) : (
                      <span
                        className={`w-6 h-6 rounded-lg text-[10.5px] font-black flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? isPurple
                              ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                              : 'bg-amber-400 text-slate-950 border-amber-300'
                            : 'bg-slate-900 text-amber-200/90 border-slate-700/60'
                        }`}
                      >
                        {idx + 1}
                      </span>
                    )}
                    <span className="truncate leading-tight font-black">{item.leftText}</span>
                  </div>

                  {/* Terminal Node Port */}
                  <span className="shrink-0 flex items-center">
                    {isCorrect ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : isWrong ? (
                      <AlertCircle size={18} className="text-rose-400" />
                    ) : (
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                          isSelected
                            ? isPurple
                              ? 'bg-cyan-400 border-white ring-4 ring-cyan-400/60 animate-ping'
                              : 'bg-amber-400 border-white ring-4 ring-amber-400/60 animate-ping'
                            : connectedRightId
                            ? isPurple
                              ? 'bg-cyan-400 border-cyan-300'
                              : 'bg-amber-400 border-amber-300'
                            : 'bg-slate-800 border-slate-600'
                        }`}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* KOLOM KANAN: Terminal Pemanfaatan / Reseptor Energi */}
          <div className="flex flex-col gap-2 sm:gap-2.5">
            <div className="flex items-center gap-2 px-1 mb-0.5 justify-end">
              <span
                className={`text-[10px] sm:text-xs font-black uppercase tracking-wider ${
                  isPurple ? 'text-indigo-300' : 'text-teal-300'
                }`}
              >
                {rightColumnHeader}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  isPurple ? 'bg-indigo-400' : 'bg-teal-400'
                } animate-ping`}
              />
            </div>

            {rightItems.map((item) => {
              const connectedLeftId = Object.keys(connections).find(
                (k) => connections[k] === item.id
              );
              const isConnected = !!connectedLeftId;
              const isCorrect = checkedState && connectedLeftId === item.id;
              const isWrong = checkedState && connectedLeftId && connectedLeftId !== item.id;

              return (
                <button
                  key={`right-${item.id}`}
                  ref={(el) => {
                    rightRefs.current[item.id] = el;
                  }}
                  type="button"
                  onClick={() => handleSelectRight(item.id)}
                  className={`group relative w-full min-h-[50px] sm:min-h-[56px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-left border-2 transition-all flex items-center justify-between font-extrabold text-xs sm:text-sm cursor-pointer select-none active:scale-[0.98] ${
                    isCorrect
                      ? 'border-emerald-400 bg-emerald-950/90 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                      : isWrong
                      ? 'border-rose-400 bg-rose-950/90 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.35)]'
                      : selectedLeftId
                      ? isPurple
                        ? 'border-cyan-400/80 bg-slate-900/90 text-cyan-100 hover:ring-2 hover:ring-cyan-300'
                        : 'border-amber-400/80 bg-slate-900/90 text-amber-100 hover:ring-2 hover:ring-amber-300'
                      : isConnected
                      ? isPurple
                        ? 'border-indigo-400/70 bg-slate-900/90 text-indigo-100'
                        : 'border-emerald-400/70 bg-slate-900/90 text-emerald-100'
                      : isPurple
                      ? 'border-purple-600/40 bg-slate-950/80 text-slate-200 hover:border-indigo-400/70 hover:bg-slate-900/90'
                      : 'border-teal-700/40 bg-slate-950/80 text-slate-200 hover:border-emerald-400/70 hover:bg-slate-900/90'
                  }`}
                >
                  {/* Left Receptor Port */}
                  <span className="shrink-0 flex items-center mr-2.5">
                    {isCorrect ? (
                      <CheckCircle2 size={18} className="text-emerald-400" />
                    ) : isWrong ? (
                      <AlertCircle size={18} className="text-rose-400" />
                    ) : (
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                          isConnected
                            ? isPurple
                              ? 'bg-cyan-400 border-cyan-300 ring-2 ring-cyan-400/40'
                              : 'bg-amber-400 border-amber-300 ring-2 ring-amber-400/40'
                            : selectedLeftId
                            ? 'bg-slate-700 border-amber-300 animate-pulse'
                            : 'bg-slate-800 border-slate-600'
                        }`}
                      />
                    )}
                  </span>

                  {/* Receptor Label */}
                  <span className="flex-1 truncate leading-tight font-black">{item.rightText}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── ACTION CONTROLS HUD DOCK (MIN 48PX CHUNKY BUTTONS) ─── */}
      <div className="relative z-30 px-3 sm:px-5 py-2 shrink-0 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-800/40">
        {/* Left: Tips / Feedback */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-200/80">
          {checkedState ? (
            isSuccess ? (
              <span className="text-emerald-300 flex items-center gap-1 font-extrabold">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Luar biasa! Seluruh pasangan berhasil dijodohkan dengan tepat!
              </span>
            ) : (
              <span className="text-rose-300 flex items-center gap-1 font-extrabold">
                <AlertCircle size={14} className="text-rose-400" />
                Beberapa sambungan belum tepat. Coba periksa garis merah!
              </span>
            )
          ) : (
            <span>
              💡 <em>Pilih terminal di Kolom A lalu sambungkan ke Kolom B.</em>
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto w-full sm:w-auto justify-end">
          {/* Tombol Reset */}
          <button
            type="button"
            onClick={handleReset}
            className="min-h-[46px] sm:min-h-[48px] px-4 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-200 border-2 border-amber-400/40 shadow-[0_3px_0_rgba(0,0,0,0.4)] active:scale-95 active:translate-y-0.5 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw size={15} />
            <span>Reset Garis</span>
          </button>

          {/* Tombol Check Matches */}
          <button
            type="button"
            onClick={handleCheckMatches}
            disabled={connectedCount === 0}
            className={`min-h-[46px] sm:min-h-[48px] px-5 sm:px-6 rounded-xl sm:rounded-2xl ${
              isPurple
                ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 border-2 border-cyan-200 shadow-[0_4px_0_#0891b2] hover:shadow-[0_4px_16px_rgba(6,182,212,0.6)]'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-2 border-amber-300 shadow-[0_4px_0_#b45309] hover:shadow-[0_4px_16px_rgba(251,191,36,0.6)]'
            } active:scale-95 active:translate-y-0.5 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <CheckCircle2 size={16} />
            <span>Periksa Pasangan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
