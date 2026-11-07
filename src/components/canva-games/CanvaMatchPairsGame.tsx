import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
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
  const isWaterCycle = !isPurple && (gameId === 'ular-tangga-sains' || title.toLowerCase().includes('transformasi energi') || title.toLowerCase().includes('siklus'));

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
      {/* ── COSMIC BACKGROUND SCENE (For astronomy deck) ── */}
      {isPurple && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Deep Nebula Clouds */}
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-cyan-600/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-indigo-600/10 blur-3xl" />

          {/* Twinkling Starfield SVG */}
          <svg className="w-full h-full opacity-60" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <g fill="#ffffff">
              <circle cx="80" cy="90" r="1.2" opacity="0.8" />
              <circle cx="160" cy="220" r="1.5" opacity="0.6" />
              <circle cx="280" cy="70" r="1" opacity="0.7" />
              <circle cx="340" cy="480" r="1.4" opacity="0.5" />
              <circle cx="450" cy="120" r="1.8" opacity="0.9" />
              <circle cx="580" cy="520" r="1" opacity="0.7" />
              <circle cx="670" cy="80" r="1.6" opacity="0.8" />
              <circle cx="780" cy="280" r="1.2" opacity="0.6" />
              <circle cx="890" cy="140" r="1.4" opacity="0.7" />
              <circle cx="920" cy="460" r="1.7" opacity="0.85" />
            </g>
          </svg>
        </div>
      )}

      {/* ── BIO-ENERGY NATURE CANVAS SCENE (Rich Rainforest Ecology) ── */}
      {!isPurple && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Luminous Bio-Energy Radial Flares */}
          <div className="absolute -top-24 -left-24 w-[450px] h-[450px] rounded-full bg-emerald-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[450px] h-[450px] rounded-full bg-teal-500/25 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] rounded-full bg-amber-500/15 blur-3xl" />

          {/* Diegetic Rainforest Ecosystem & Energy Biosphere SVG */}
          <svg className="w-full h-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="forestSkyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#042f2e" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#064e3b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
              <linearGradient id="sunbeamGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.16" />
                <stop offset="60%" stopColor="#86efac" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="bioStreamA" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#facc15" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
              </linearGradient>
              <filter id="forestGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Crepuscular Sun Rays filtering from canopy top */}
            <g fill="url(#sunbeamGrad)">
              <polygon points="200,0 350,0 520,700 320,700" />
              <polygon points="500,0 680,0 880,700 660,700" />
              <polygon points="800,0 950,0 1150,700 980,700" />
            </g>

            {/* Distant Mountain Ridges & Mist */}
            <path
              d="M0 480 Q250 390 500 450 T1000 410 T1200 460 L1200 700 L0 700 Z"
              fill="#064e3b"
              opacity="0.35"
            />
            <path
              d="M0 520 Q300 460 650 510 T1200 490 L1200 700 L0 700 Z"
              fill="#047857"
              opacity="0.4"
            />

            {/* Winding Forest River (Hydrological cycle grounding) */}
            <path
              d="M150 700 C300 620 450 640 600 580 C750 530 850 550 950 510 L1050 520 C920 570 800 560 650 620 C500 670 350 660 200 700 Z"
              fill="url(#riverGrad)"
              opacity="0.7"
            />

            {/* Silhouette of Ancient Papuan Canopy Trees (Left & Right Flanks) */}
            {/* Left Giant Banyan / Dipterocarp Tree */}
            <g fill="#022c22" opacity="0.65">
              <path d="M-40 700 C20 620 40 450 30 320 C20 220 0 150 -50 100 L-60 700 Z" />
              <path d="M10 550 C60 630 110 680 160 700 L120 700 C70 670 30 620 -10 570 Z" />
              <ellipse cx="60" cy="180" rx="160" ry="90" />
              <ellipse cx="140" cy="240" rx="120" ry="70" />
              <ellipse cx="20" cy="300" rx="100" ry="60" />
            </g>
            {/* Right Giant Tropical Tree Flank */}
            <g fill="#022c22" opacity="0.65">
              <path d="M1240 700 C1180 620 1160 450 1170 320 C1180 220 1200 150 1250 100 L1260 700 Z" />
              <path d="M1190 550 C1140 630 1090 680 1040 700 L1080 700 C1130 670 1170 620 1210 570 Z" />
              <ellipse cx="1140" cy="180" rx="160" ry="90" />
              <ellipse cx="1060" cy="240" rx="120" ry="70" />
              <ellipse cx="1180" cy="300" rx="100" ry="60" />
            </g>

            {/* Energy Streamlines (Solar Radiation -> Chemical Biomass -> Kinetic Flow) */}
            <g stroke="url(#bioStreamA)" strokeWidth="2" strokeDasharray="8 6" opacity="0.45" fill="none">
              <path d="M 100 200 C 300 280, 450 180, 600 240 S 900 320, 1100 220" />
              <path d="M 80 420 C 350 350, 500 460, 750 380 S 1000 480, 1150 400" />
            </g>

            {/* Floating Bioluminescent Spores / Fireflies */}
            <g fill="#4ade80" filter="url(#forestGlow)">
              <circle cx="180" cy="140" r="3" opacity="0.85" />
              <circle cx="280" cy="280" r="2.5" opacity="0.75" />
              <circle cx="420" cy="180" r="3.5" opacity="0.9" />
              <circle cx="580" cy="120" r="2.5" opacity="0.7" />
              <circle cx="760" cy="190" r="3" opacity="0.85" />
              <circle cx="920" cy="290" r="2.5" opacity="0.75" />
              <circle cx="1020" cy="150" r="3.5" opacity="0.9" />
            </g>
            <g fill="#fde047" filter="url(#forestGlow)">
              <circle cx="240" cy="460" r="2.5" opacity="0.8" />
              <circle cx="480" cy="510" r="3" opacity="0.85" />
              <circle cx="680" cy="470" r="2.5" opacity="0.75" />
              <circle cx="880" cy="530" r="3" opacity="0.85" />
            </g>
          </svg>
        </div>
      )}

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
            {!isPurple && !isWaterCycle && chapterBadge && (
              <span className="px-1.5 py-0.5 rounded-md font-black text-[9px] sm:text-[10px] tracking-widest uppercase bg-amber-400 text-emerald-950">
                {chapterBadge}
              </span>
            )}
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
        {!isWaterCycle && !isPurple && (
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
              {checkedState ? (
                isSuccess ? <CheckCircle2 size={13} className="text-emerald-400" /> : <AlertCircle size={13} className="text-rose-400" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
              <span>
                {checkedState
                  ? isSuccess
                    ? 'Koneksi Tepat!'
                    : 'Periksa Kembali'
                  : `${connectedCount}/${totalCount} Terhubung`}
              </span>
            </div>
          </div>
        )}
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
        <div className="relative w-full max-w-4xl grid grid-cols-2 gap-4 sm:gap-8 md:gap-14 items-center">
          {/* Central Holographic Relay Station Illustration for Astronomy Deck */}
          {isPurple && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 hidden sm:flex flex-col items-center opacity-85">
              <svg viewBox="0 0 180 180" className="w-32 h-32 md:w-40 md:h-40 drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                <defs>
                  <linearGradient id="relayDishGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                {/* Orbital radar rings */}
                <circle cx="90" cy="90" r="70" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" className="animate-spin" style={{ animationDuration: '30s' }} />
                <circle cx="90" cy="90" r="50" fill="none" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />
                <circle cx="90" cy="90" r="32" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" opacity="0.9" />

                {/* Crosshairs & Solar wings */}
                <line x1="20" y1="90" x2="58" y2="90" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                <line x1="122" y1="90" x2="160" y2="90" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                <rect x="22" y="80" width="32" height="20" rx="3" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1" />
                <rect x="126" y="80" width="32" height="20" rx="3" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="1" />

                {/* Station Satellite Core */}
                <circle cx="90" cy="90" r="16" fill="url(#relayDishGrad)" />
                <circle cx="90" cy="90" r="6" fill="#ffffff" className="animate-pulse" />

                {/* Signal Pulses */}
                <circle cx="90" cy="90" r="24" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
              </svg>
            </div>
          )}

          {/* Central Bio-Energy Nexus Reactor for Science & Ecology Deck */}
          {!isPurple && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 hidden sm:flex flex-col items-center opacity-85">
              <svg viewBox="0 0 180 180" className="w-32 h-32 md:w-40 md:h-40 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                <defs>
                  <linearGradient id="bioNexusGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <radialGradient id="bioCoreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Outer magnetic flux rings */}
                <circle cx="90" cy="90" r="72" fill="none" stroke="#34d399" strokeWidth="1" strokeDasharray="5 5" opacity="0.35" className="animate-spin" style={{ animationDuration: '36s' }} />
                <circle cx="90" cy="90" r="54" fill="none" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.45" className="animate-spin" style={{ animationDuration: '24s', animationDirection: 'reverse' }} />
                <circle cx="90" cy="90" r="36" fill="#022c22" stroke="#34d399" strokeWidth="2" opacity="0.95" />

                {/* Horizontal conduit connectors */}
                <line x1="16" y1="90" x2="54" y2="90" stroke="#34d399" strokeWidth="2.5" strokeDasharray="3 3" />
                <line x1="126" y1="90" x2="164" y2="90" stroke="#34d399" strokeWidth="2.5" strokeDasharray="3 3" />
                <circle cx="20" cy="90" r="4" fill="#fbbf24" />
                <circle cx="160" cy="90" r="4" fill="#fbbf24" />

                {/* Core glow aura */}
                <circle cx="90" cy="90" r="30" fill="url(#bioCoreGlow)" />
                {/* Reactor central vessel */}
                <circle cx="90" cy="90" r="18" fill="url(#bioNexusGrad)" stroke="#a7f3d0" strokeWidth="1.5" />
                <circle cx="90" cy="90" r="7" fill="#ffffff" className="animate-ping" style={{ animationDuration: '3s' }} />

                {/* Central Leaf Icon */}
                <text x="90" y="95" textAnchor="middle" fontSize="14" fill="#ffffff" className="select-none">
                  🌱
                </text>
              </svg>
              <div className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-950/85 border border-emerald-400/50 text-[9px] font-black uppercase tracking-wider text-emerald-300 shadow-md">
                Nexus Aliran Energi ⚡
              </div>
            </div>
          )}
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
