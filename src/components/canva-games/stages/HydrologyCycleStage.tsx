import React from 'react';
import { sound } from '@/lib/sound';

export interface HydrologyCycleStageProps {
  activePhase: number;
  onSelectPhase: (idx: number) => void;
  className?: string;
}

const BEACONS = [
  { id: 'evaporasi', label: '1. Evaporasi', emoji: '☀️', x: '24%', y: '30%', color: 'amber' },
  { id: 'kondensasi', label: '2. Kondensasi', emoji: '☁️', x: '72%', y: '18%', color: 'blue' },
  { id: 'presipitasi', label: '3. Presipitasi', emoji: '🌧️', x: '72%', y: '48%', color: 'indigo' },
  { id: 'infiltrasi', label: '4. Infiltrasi', emoji: '🌱', x: '36%', y: '82%', color: 'emerald' },
];

export const HydrologyCycleStage: React.FC<HydrologyCycleStageProps> = ({
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
            @keyframes stageSunPulse {
              0%, 100% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.08); opacity: 1; }
            }
            @keyframes stageSunRays {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes stageCloudDrift {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(12px); }
            }
            @keyframes stageRainStream {
              0% { transform: translateY(0); opacity: 0; }
              20% { opacity: 0.95; }
              80% { opacity: 0.85; }
              100% { transform: translateY(50px); opacity: 0; }
            }
            @keyframes stageVaporRise {
              0% { transform: translateY(0) scale(0.8); opacity: 0; }
              30% { opacity: 0.85; }
              75% { opacity: 0.65; }
              100% { transform: translateY(-70px) scale(1.15); opacity: 0; }
            }
            @keyframes stageRiverCurrent {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -36; }
            }
            @keyframes stageInfiltrationDrop {
              0% { transform: translateY(0); opacity: 0; }
              40% { opacity: 0.95; }
              100% { transform: translateY(30px); opacity: 0; }
            }
            @keyframes stageAuraPulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.9; }
            }

            .sun-pulse { animation: stageSunPulse 4.5s ease-in-out infinite; transform-origin: 120px 95px; }
            .sun-rays { animation: stageSunRays 40s linear infinite; transform-origin: 120px 95px; }
            .cloud-drift { animation: stageCloudDrift 8s ease-in-out infinite; }
            .rain-layer-1 { animation: stageRainStream 1s linear infinite; }
            .rain-layer-2 { animation: stageRainStream 1s linear infinite 0.35s; }
            .rain-layer-3 { animation: stageRainStream 1s linear infinite 0.7s; }
            .vapor-1 { animation: stageVaporRise 3.2s ease-out infinite; }
            .vapor-2 { animation: stageVaporRise 3.2s ease-out infinite 1.1s; }
            .vapor-3 { animation: stageVaporRise 3.2s ease-out infinite 2.2s; }
            .river-flow { animation: stageRiverCurrent 2.5s linear infinite; }
            .infiltrate-1 { animation: stageInfiltrationDrop 1.8s linear infinite; }
            .infiltrate-2 { animation: stageInfiltrationDrop 1.8s linear infinite 0.6s; }
            .aura-pulse { animation: stageAuraPulse 2.5s ease-in-out infinite; }
          `}</style>

          <linearGradient id="hydroSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="35%" stopColor="#0ea5e9" />
            <stop offset="70%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>

          <radialGradient id="sunGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="mountainFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          <linearGradient id="mountainNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="riverGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          <linearGradient id="soilTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          <linearGradient id="aquiferGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── SKY BACKGROUND ────────────────────────── */}
        <rect width="800" height="370" fill="url(#hydroSky)" />

        {/* ── PHASE 1 HIGHLIGHT: SUN AURA ───────────── */}
        {activePhase === 0 && (
          <circle cx="120" cy="95" r="110" fill="url(#sunGlowGrad)" opacity="0.65" className="aura-pulse" />
        )}

        {/* ── SUN & RADIANT HEAT ────────────────────── */}
        <g className="sun-pulse">
          <circle cx="120" cy="95" r="54" fill="url(#sunGlowGrad)" />
          <circle cx="120" cy="95" r="32" fill="#facc15" stroke="#f59e0b" strokeWidth="3" />
        </g>
        <g className="sun-rays" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 5" opacity="0.8">
          <line x1="120" y1="42" x2="120" y2="22" />
          <line x1="120" y1="148" x2="120" y2="168" />
          <line x1="67" y1="95" x2="47" y2="95" />
          <line x1="173" y1="95" x2="193" y2="95" />
          <line x1="82" y1="57" x2="68" y2="43" />
          <line x1="158" y1="133" x2="172" y2="147" />
          <line x1="82" y1="133" x2="68" y2="147" />
          <line x1="158" y1="57" x2="172" y2="43" />
        </g>

        {/* ── DISTANT MOUNTAINS ─────────────────────── */}
        <path d="M360 270 L510 130 L660 270 L720 220 L800 270 L800 370 L0 370 L0 280 L160 220 L300 280 Z" fill="url(#mountainFar)" />
        <path d="M430 230 L510 130 L590 230 Z" fill="#34d399" opacity="0.4" />

        {/* ── NEAR MOUNTAINS & CANOPY ───────────────── */}
        <path d="M0 290 Q120 250 240 280 Q360 310 460 270 Q580 230 700 280 L800 270 L800 370 L0 370 Z" fill="url(#mountainNear)" />

        {/* Forest canopy clumps on slope */}
        <g fill="#065f46" opacity="0.9">
          <circle cx="210" cy="270" r="16" />
          <circle cx="230" cy="265" r="20" />
          <circle cx="250" cy="272" r="15" />
          <circle cx="380" cy="285" r="18" />
          <circle cx="400" cy="280" r="22" />
          <circle cx="425" cy="286" r="17" />
          <circle cx="620" cy="265" r="20" />
          <circle cx="645" cy="260" r="24" />
          <circle cx="670" cy="268" r="18" />
        </g>

        {/* ── WINDING RIVER ─────────────────────────── */}
        <path
          d="M510 240 C490 280 540 310 490 350 C440 390 360 380 290 410 C240 430 180 440 100 450 L100 480 C190 470 260 460 320 435 C390 405 470 415 520 370 C570 330 520 290 540 240 Z"
          fill="url(#riverGradient)"
        />
        {/* Animated river current lines */}
        <path
          d="M525 245 C505 285 530 305 505 360 C455 395 375 395 305 422 C255 445 190 455 110 465"
          stroke="#e0f2fe"
          strokeWidth="2.5"
          strokeDasharray="14 10"
          fill="none"
          opacity="0.75"
          className="river-flow"
        />

        {/* ── PHASE 1: EVAPORATION & TRANSPIRATION PARTICLES ── */}
        <g stroke={activePhase === 0 ? '#38bdf8' : '#0284c7'} strokeWidth={activePhase === 0 ? '3' : '2'} strokeDasharray="6 4" opacity={activePhase === 0 ? '0.95' : '0.6'}>
          {/* River vapor */}
          <path d="M330 400 Q320 360 340 320 Q360 280 340 240" fill="none" />
          <path d="M470 340 Q460 300 480 260 Q500 220 480 180" fill="none" />
          {/* Forest canopy transpiration */}
          <path d="M225 250 Q215 220 230 190 Q245 160 230 130" fill="none" stroke="#22c55e" />
        </g>
        {/* Animated rising vapor bubbles */}
        <g className="vapor-1" fill={activePhase === 0 ? '#fde047' : '#38bdf8'}>
          <circle cx="332" cy="380" r="4.5" opacity="0.9" />
          <circle cx="472" cy="320" r="4" opacity="0.85" />
          <circle cx="225" cy="235" r="4" fill="#86efac" opacity="0.9" />
        </g>
        <g className="vapor-2" fill={activePhase === 0 ? '#67e8f9' : '#0284c7'}>
          <circle cx="338" cy="340" r="5" opacity="0.95" />
          <circle cx="478" cy="280" r="4.5" opacity="0.9" />
          <circle cx="230" cy="195" r="4.5" fill="#4ade80" opacity="0.9" />
        </g>
        <g className="vapor-3" fill={activePhase === 0 ? '#fde047' : '#38bdf8'}>
          <circle cx="342" cy="290" r="5.5" opacity="0.9" />
          <circle cx="482" cy="230" r="5" opacity="0.85" />
          <circle cx="235" cy="155" r="5" fill="#86efac" opacity="0.95" />
        </g>

        {/* ── PHASE 2: CUMULUS RAIN CLOUD (KONDENSASI) ────── */}
        <g transform="translate(450, 40)" className="cloud-drift">
          {/* Active Kondensasi Aura Glow */}
          {activePhase === 1 && (
            <path
              d="M60 85 Q35 85 20 68 Q5 45 28 32 Q38 12 70 18 Q98 2 132 18 Q155 8 178 30 Q202 46 190 70 Q196 85 168 85 Z"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="10"
              opacity="0.85"
              filter="url(#glowFilter)"
              className="aura-pulse"
            />
          )}

          {/* Cloud body */}
          <path
            d="M60 85 Q35 85 20 68 Q5 45 28 32 Q38 12 70 18 Q98 2 132 18 Q155 8 178 30 Q202 46 190 70 Q196 85 168 85 Z"
            fill={activePhase === 1 ? '#64748b' : '#94a3b8'}
            stroke={activePhase === 1 ? '#38bdf8' : '#cbd5e1'}
            strokeWidth={activePhase === 1 ? '3.5' : '2'}
            opacity="0.95"
          />
          {/* Cloud highlight swell */}
          <path
            d="M35 48 Q45 25 72 28 Q98 14 128 26 Q148 18 165 36"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.75"
          />
        </g>

        {/* ── PHASE 3: PRECIPITATION (RAIN STREAKS) ────────── */}
        <g stroke={activePhase === 2 ? '#38bdf8' : '#0284c7'} strokeWidth={activePhase === 2 ? '3.5' : '2.5'} strokeLinecap="round">
          {/* Layer 1 */}
          <g className="rain-layer-1" opacity={activePhase === 2 ? '1' : '0.75'}>
            <line x1="510" y1="145" x2="495" y2="185" />
            <line x1="575" y1="145" x2="560" y2="185" />
            <line x1="640" y1="145" x2="625" y2="185" />
          </g>
          {/* Layer 2 */}
          <g className="rain-layer-2" opacity={activePhase === 2 ? '1' : '0.8'}>
            <line x1="540" y1="165" x2="525" y2="205" />
            <line x1="610" y1="165" x2="595" y2="205" />
            <line x1="675" y1="165" x2="660" y2="205" />
          </g>
          {/* Layer 3 */}
          <g className="rain-layer-3" opacity={activePhase === 2 ? '1' : '0.6'}>
            <line x1="525" y1="195" x2="510" y2="235" />
            <line x1="590" y1="195" x2="575" y2="235" />
            <line x1="655" y1="195" x2="640" y2="235" />
          </g>
        </g>
        {/* Splash ripples on mountains when Presipitasi active */}
        {activePhase === 2 && (
          <g stroke="#e0f2fe" strokeWidth="2" fill="none" opacity="0.8" className="aura-pulse">
            <ellipse cx="505" cy="245" rx="8" ry="3" />
            <ellipse cx="575" cy="245" rx="10" ry="3.5" />
            <ellipse cx="640" cy="245" rx="9" ry="3" />
          </g>
        )}

        {/* ── GROUND CUTAWAY & AQUIFER (INFILTRASI) ─────────── */}
        <g transform="translate(0, 360)">
          {/* Topsoil layer */}
          <path d="M0 0 Q200 -10 400 10 Q600 30 800 0 L800 60 L0 60 Z" fill="url(#soilTop)" />
          {/* Subsoil & gravel profile */}
          <rect y="50" width="800" height="90" fill="#291204" />
          {/* Aquifer subterranean reservoir */}
          <path d="M0 75 Q250 65 500 80 Q650 90 800 75 L800 140 L0 140 Z" fill="url(#aquiferGrad)" opacity={activePhase === 3 ? '0.95' : '0.75'} />

          {/* Tree Roots penetrating soil */}
          <g stroke="#a16207" strokeWidth="2" strokeLinecap="round" fill="none">
            <path d="M230 -10 Q225 20 220 45 Q215 65 210 80" />
            <path d="M225 20 Q240 35 245 55" />
            <path d="M410 -5 Q405 25 400 50 Q395 70 390 85" />
            <path d="M405 25 Q420 40 425 60" />
          </g>

          {/* Animated Infiltration Droplets */}
          <g fill={activePhase === 3 ? '#67e8f9' : '#38bdf8'} opacity={activePhase === 3 ? '1' : '0.7'}>
            <g className="infiltrate-1">
              <circle cx="215" cy="25" r="3.5" />
              <circle cx="240" cy="40" r="3" />
              <circle cx="395" cy="28" r="3.5" />
              <circle cx="420" cy="45" r="3" />
              <circle cx="560" cy="30" r="3.5" />
            </g>
            <g className="infiltrate-2">
              <circle cx="210" cy="50" r="4" />
              <circle cx="245" cy="65" r="3.5" />
              <circle cx="390" cy="55" r="4" />
              <circle cx="425" cy="70" r="3.5" />
              <circle cx="565" cy="55" r="4" />
            </g>
          </g>

          {/* Groundwater current dashes */}
          <path
            d="M50 105 Q300 95 600 110 Q700 115 780 105"
            stroke="#bae6fd"
            strokeWidth="2.5"
            strokeDasharray="16 12"
            fill="none"
            opacity={activePhase === 3 ? '0.9' : '0.5'}
            className="river-flow"
          />

          {/* Ground cross-section label */}
          <rect x="24" y="98" width="180" height="24" rx="6" fill="#022c22" opacity="0.9" />
          <text x="34" y="114" fill="#a7f3d0" fontSize="10" fontWeight="900" fontFamily="sans-serif">
            LAPISAN AKUIFER AIR TANAH
          </text>
        </g>
      </svg>

      {/* ── TACTILE HOTSPOT BEACONS (TOUCH TARGETS) ───────── */}
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
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 text-slate-950 font-black border-2 border-white ring-4 ring-amber-400/80 scale-110 z-30 shadow-[0_0_24px_rgba(251,191,36,0.9)]'
                : 'bg-slate-950/85 hover:bg-slate-900 text-white font-extrabold border-2 border-emerald-400/60 backdrop-blur-md hover:scale-105 z-20 shadow-md'
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
