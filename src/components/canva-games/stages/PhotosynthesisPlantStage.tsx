import React from 'react';
import { sound } from '@/lib/sound';

export interface PhotosynthesisPlantStageProps {
  activePhase: number;
  onSelectPhase: (idx: number) => void;
  className?: string;
}

const BEACONS = [
  { id: 'bahan-baku', label: '1. Bahan Baku', emoji: '🌿', x: '26%', y: '42%', color: 'teal' },
  { id: 'reaksi-kimia', label: '2. Reaksi Kimia', emoji: '⚡', x: '58%', y: '26%', color: 'amber' },
  { id: 'hasil-akhir', label: '3. Hasil Akhir', emoji: '🍎', x: '78%', y: '68%', color: 'emerald' },
];

export const PhotosynthesisPlantStage: React.FC<PhotosynthesisPlantStageProps> = ({
  activePhase,
  onSelectPhase,
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden rounded-2xl bg-slate-950 ${className}`}>
      {/* ── VECTOR WORLD ────────────────────────────────────── */}
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <style>{`
            @keyframes photoSunPulse {
              0%, 100% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.08); opacity: 1; }
            }
            @keyframes photoPhotonBeam {
              0% { stroke-dashoffset: 24; opacity: 0.3; }
              50% { opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 0.3; }
            }
            @keyframes photoGasBubble {
              0% { transform: translateY(0) scale(0.8); opacity: 0; }
              30% { opacity: 0.9; }
              80% { opacity: 0.7; }
              100% { transform: translateY(-60px) scale(1.2); opacity: 0; }
            }
            @keyframes photoChloroplastPulse {
              0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #4ade80); }
              50% { transform: scale(1.06); filter: drop-shadow(0 0 8px #22c55e); }
            }
            @keyframes photoAuraPulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.85; }
            }

            .photo-sun { animation: photoSunPulse 4.5s ease-in-out infinite; transform-origin: 110px 85px; }
            .photon-ray { animation: photoPhotonBeam 2.2s linear infinite; }
            .gas-o2 { animation: photoGasBubble 2.8s ease-out infinite; }
            .gas-o2-delay { animation: photoGasBubble 2.8s ease-out infinite 1.4s; }
            .chloroplast-glow { animation: photoChloroplastPulse 3s ease-in-out infinite; }
            .photo-aura { animation: photoAuraPulse 2.5s ease-in-out infinite; }
          `}</style>

          <linearGradient id="photoSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="40%" stopColor="#047857" />
            <stop offset="80%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>

          <radialGradient id="sunPhotonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="leafGradReal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>

          <filter id="photoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── BACKGROUND ────────────────────────────── */}
        <rect width="800" height="500" fill="url(#photoSky)" />

        {/* ── SUN & PHOTON ENERGY ───────────────────── */}
        <g className="photo-sun">
          <circle cx="110" cy="85" r="50" fill="url(#sunPhotonGlow)" />
          <circle cx="110" cy="85" r="30" fill="#facc15" stroke="#f59e0b" strokeWidth="3" />
        </g>
        {/* Photon energy beams streaming toward leaf */}
        <g stroke="#fde047" strokeWidth={activePhase === 1 ? '3.5' : '2'} strokeDasharray="8 6" className="photon-ray">
          <line x1="140" y1="105" x2="280" y2="200" />
          <line x1="160" y1="85" x2="330" y2="180" />
          <line x1="145" y1="125" x2="260" y2="235" />
        </g>
        <text x="110" y="89" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="900" fontFamily="sans-serif">
          ENERGI FOTON
        </text>

        {/* ── GIANT LEAF CONTOUR ─────────────────────── */}
        <g transform="translate(60, 110)">
          <path
            d="M50 280 C120 120 320 60 560 90 C500 240 380 370 140 370 C90 370 70 330 50 280 Z"
            fill="url(#leafGradReal)"
            stroke={activePhase === 0 ? '#86efac' : '#166534'}
            strokeWidth={activePhase === 0 ? '4' : '3'}
          />
          {/* Main Xylem/Phloem Veins */}
          <path d="M50 280 C180 230 360 170 550 95" stroke="#fef08a" strokeWidth="6" fill="none" />
          <path d="M190 230 Q250 180 300 120" stroke="#fef08a" strokeWidth="3" fill="none" />
          <path d="M290 200 Q360 170 420 130" stroke="#fef08a" strokeWidth="3" fill="none" />
          <path d="M160 245 Q190 290 220 320" stroke="#fef08a" strokeWidth="3" fill="none" />

          {/* ── CUTAWAY CIRCLE: MESOPHYLL & STOMATA ──── */}
          <g transform="translate(290, 200)">
            {/* Cutaway circle container */}
            <circle cx="0" cy="0" r="82" fill="#0f172a" stroke={activePhase === 1 ? '#38bdf8' : '#22c55e'} strokeWidth="4" />

            {/* Upper Epidermis */}
            <rect x="-72" y="-68" width="144" height="18" rx="5" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
            <text x="0" y="-55" textAnchor="middle" fill="#14532d" fontSize="9" fontWeight="900">EPIDERMIS ATAS</text>

            {/* Palisade Mesophyll Cells packed with Chloroplasts */}
            {[-50, -25, 0, 25, 50].map((x, i) => (
              <g key={`pcell-${i}`} transform={`translate(${x}, -28)`} className="chloroplast-glow">
                <rect x="-10" y="-14" width="20" height="28" rx="4" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
                <circle cx="-4" cy="-6" r="3" fill="#14532d" />
                <circle cx="4" cy="2" r="3" fill="#14532d" />
                <circle cx="-3" cy="7" r="2.5" fill="#14532d" />
              </g>
            ))}

            {/* Spongy Air Space */}
            <circle cx="-40" cy="18" r="11" fill="#15803d" opacity="0.6" />
            <circle cx="0" cy="22" r="12" fill="#15803d" opacity="0.6" />
            <circle cx="40" cy="18" r="11" fill="#15803d" opacity="0.6" />

            {/* Stomata Pore with Guard Cells at Bottom */}
            <ellipse cx="-10" cy="56" rx="8" ry="5" fill={activePhase === 0 ? '#4ade80' : '#16a34a'} />
            <ellipse cx="10" cy="56" rx="8" ry="5" fill={activePhase === 0 ? '#4ade80' : '#16a34a'} />
            <ellipse cx="0" cy="56" rx="4" ry="2" fill="#052e16" />
            {/* High-contrast badge container for Stomata label */}
            <g transform="translate(0, 72)">
              <rect
                x="-66"
                y="-10"
                width="132"
                height="20"
                rx="10"
                fill="#022c22"
                stroke="#4ade80"
                strokeWidth="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="9.5"
                fontWeight="900"
                letterSpacing="0.05em"
              >
                STOMATA (PORI DAUN)
              </text>
            </g>
          </g>

          {/* ── GAS INFLOW / OUTFLOW CALLOUTS ───────── */}
          {/* CO2 Inflow through Stomata */}
          <g transform="translate(180, 310)">
            <rect width="110" height="28" rx="14" fill="#065f46" stroke="#34d399" strokeWidth="2" />
            <text x="55" y="18" textAnchor="middle" fill="#ecfdf5" fontSize="10" fontWeight="900">
              CO2 Masuk Stomata
            </text>
          </g>
          {/* O2 Outflow released to Air */}
          <g transform="translate(410, 160)">
            <rect width="120" height="28" rx="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <text x="60" y="18" textAnchor="middle" fill="#f0f9ff" fontSize="10" fontWeight="900">
              O2 Dilepas ke Udara
            </text>
          </g>
          {/* Animated O2 gas bubbles rising */}
          <g className="gas-o2" fill="#38bdf8">
            <circle cx="480" cy="150" r="5" opacity="0.85" />
            <circle cx="510" cy="140" r="4" opacity="0.9" />
          </g>
          <g className="gas-o2-delay" fill="#67e8f9">
            <circle cx="495" cy="155" r="4.5" opacity="0.8" />
            <circle cx="525" cy="145" r="5.5" opacity="0.9" />
          </g>

          {/* ── GLUCOSE RESULT (PHASE 3) ─────────────── */}
          {activePhase === 2 && (
            <g transform="translate(480, 260)" className="photo-aura">
              <rect width="130" height="34" rx="17" fill="#f59e0b" stroke="#fef08a" strokeWidth="2.5" />
              <text x="65" y="21" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="900">
                🍎 Glukosa (C6H12O6)
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* ── TACTILE HOTSPOT BEACONS ────────────────────────── */}
      {BEACONS.map((beacon, idx) => {
        const isSelected = activePhase === idx;
        return (
          <button
            key={beacon.id}
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectPhase(idx);
            }}
            style={{ left: beacon.x, top: beacon.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 min-h-[44px] px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-lg ${
              isSelected
                ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-slate-950 font-black border-2 border-white ring-4 ring-emerald-400/80 scale-110 z-30 shadow-[0_0_24px_rgba(52,211,153,0.9)]'
                : 'bg-slate-950/85 hover:bg-slate-900 text-white font-extrabold border-2 border-teal-400/60 backdrop-blur-md hover:scale-105 z-20 shadow-md'
            }`}
          >
            <span className="text-base sm:text-lg shrink-0">{beacon.emoji}</span>
            <span className="text-[11px] sm:text-xs tracking-wide whitespace-nowrap">{beacon.label}</span>
            {isSelected && (
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping shrink-0 ml-0.5" />
            )}
          </button>
        );
      })}
    </div>
  );
};
