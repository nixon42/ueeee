import React from 'react';
import { sound } from '@/lib/sound';

export interface SolarSystemOrbitStageProps {
  activePhase: number;
  onSelectPhase: (idx: number) => void;
  className?: string;
}

const BEACONS = [
  { id: 'planet-dalam', label: '1. Planet Dalam', emoji: '🪨', x: '27%', y: '20%', color: 'amber' },
  { id: 'sabuk-asteroid', label: '2. Sabuk Asteroid', emoji: '☄️', x: '52%', y: '16%', color: 'indigo' },
  { id: 'planet-luar', label: '3. Planet Luar', emoji: '🪐', x: '78%', y: '22%', color: 'purple' },
];

export const SolarSystemOrbitStage: React.FC<SolarSystemOrbitStageProps> = ({
  activePhase,
  onSelectPhase,
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full select-none overflow-hidden rounded-2xl bg-slate-950 ${className}`}>
      {/* ── VECTOR ORBIT WORLD ────────────────────────────────────── */}
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <style>{`
            @keyframes sunPulseOrbit {
              0%, 100% { transform: scale(1); opacity: 0.95; }
              50% { transform: scale(1.06); opacity: 1; }
            }
            @keyframes orbitLineShimmer {
              0%, 100% { stroke-opacity: 0.25; }
              50% { stroke-opacity: 0.65; }
            }
            @keyframes asteroidDrift {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes focusHaloPulse {
              0%, 100% { r: 18px; opacity: 0.4; }
              50% { r: 26px; opacity: 0.85; }
            }
            .anim-sun-orbit {
              animation: sunPulseOrbit 5s ease-in-out infinite;
              transform-origin: 70px 250px;
            }
            .anim-orbit-active {
              animation: orbitLineShimmer 2.5s ease-in-out infinite;
            }
            .anim-halo {
              animation: focusHaloPulse 2s ease-in-out infinite;
            }
          `}</style>

          {/* Deep Space Background */}
          <linearGradient id="orbitSpaceBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="40%" stopColor="#0f172a" />
            <stop offset="70%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#050711" />
          </linearGradient>

          {/* Sun Core Gradient */}
          <radialGradient id="stageSunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="35%" stopColor="#fef08a" />
            <stop offset="65%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
          </radialGradient>

          {/* Jovian Gas Giant Gradient */}
          <linearGradient id="jupiterBandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="30%" stopColor="#ea580c" />
            <stop offset="60%" stopColor="#c2410c" />
            <stop offset="100%" stopColor="#7c2d12" />
          </linearGradient>

          {/* Saturn Body Gradient */}
          <linearGradient id="saturnStageGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
        </defs>

        <rect width="800" height="500" fill="url(#orbitSpaceBg)" />

        {/* STARFIELD */}
        <g fill="#ffffff" opacity="0.6">
          <circle cx="50" cy="40" r="1" />
          <circle cx="120" cy="80" r="1.3" />
          <circle cx="210" cy="50" r="0.9" />
          <circle cx="340" cy="70" r="1.5" />
          <circle cx="460" cy="35" r="1" />
          <circle cx="600" cy="65" r="1.2" />
          <circle cx="730" cy="45" r="1.4" />
          <circle cx="90" cy="430" r="1.2" />
          <circle cx="250" cy="460" r="1" />
          <circle cx="410" cy="440" r="1.5" />
          <circle cx="580" cy="460" r="0.9" />
          <circle cx="710" cy="425" r="1.3" />
          <circle cx="760" cy="210" r="1.1" />
        </g>

        {/* ── 8 ORBITAL TRACKS ── */}
        <g strokeWidth="1" strokeDasharray="4 4" fill="none">
          {/* 1. Merkurius */}
          <ellipse
            cx="70"
            cy="250"
            rx="75"
            ry="45"
            stroke={activePhase === 0 ? '#38bdf8' : '#64748b'}
            className={activePhase === 0 ? 'anim-orbit-active' : ''}
            strokeOpacity={activePhase === 0 ? 0.9 : 0.25}
          />
          {/* 2. Venus */}
          <ellipse
            cx="70"
            cy="250"
            rx="115"
            ry="68"
            stroke={activePhase === 0 ? '#fbbf24' : '#64748b'}
            className={activePhase === 0 ? 'anim-orbit-active' : ''}
            strokeOpacity={activePhase === 0 ? 0.9 : 0.25}
          />
          {/* 3. Bumi */}
          <ellipse
            cx="70"
            cy="250"
            rx="165"
            ry="98"
            stroke={activePhase === 0 ? '#4ade80' : '#64748b'}
            className={activePhase === 0 ? 'anim-orbit-active' : ''}
            strokeOpacity={activePhase === 0 ? 0.95 : 0.25}
          />
          {/* 4. Mars */}
          <ellipse
            cx="70"
            cy="250"
            rx="215"
            ry="128"
            stroke={activePhase === 0 ? '#f87171' : '#64748b'}
            className={activePhase === 0 ? 'anim-orbit-active' : ''}
            strokeOpacity={activePhase === 0 ? 0.9 : 0.25}
          />

          {/* 5. Jupiter */}
          <ellipse
            cx="70"
            cy="250"
            rx="330"
            ry="185"
            stroke={activePhase === 2 ? '#fb923c' : '#64748b'}
            className={activePhase === 2 ? 'anim-orbit-active' : ''}
            strokeOpacity={activePhase === 2 ? 0.95 : 0.25}
          />
          {/* 6. Saturnus */}
          <ellipse
            cx="70"
            cy="250"
            rx="440"
            ry="235"
            stroke={activePhase === 2 ? '#fde047' : '#64748b'}
            className={activePhase === 2 ? 'anim-orbit-active' : ''}
            strokeOpacity={activePhase === 2 ? 0.95 : 0.25}
          />
          {/* 7. Uranus */}
          <ellipse
            cx="70"
            cy="250"
            rx="545"
            ry="280"
            stroke={activePhase === 2 ? '#67e8f9' : '#64748b'}
            className={activePhase === 2 ? 'anim-orbit-active' : ''}
            strokeOpacity={activePhase === 2 ? 0.9 : 0.25}
          />
          {/* 8. Neptunus */}
          <ellipse
            cx="70"
            cy="250"
            rx="645"
            ry="330"
            stroke={activePhase === 2 ? '#60a5fa' : '#64748b'}
            className={activePhase === 2 ? 'anim-orbit-active' : ''}
            strokeOpacity={activePhase === 2 ? 0.9 : 0.25}
          />
        </g>

        {/* ── ASTEROID BELT (Sabuk Asteroid Mars-Jupiter) ── */}
        <g opacity={activePhase === 1 ? 1 : 0.45}>
          {/* Background Ribbon Glow for Active Belt */}
          {activePhase === 1 && (
            <ellipse
              cx="70"
              cy="250"
              rx="270"
              ry="155"
              stroke="#a855f7"
              strokeWidth="22"
              fill="none"
              strokeOpacity="0.18"
            />
          )}
          {/* Scattered Asteroid Minerals */}
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i / 48) * Math.PI * 0.95 - Math.PI * 0.48;
            const rx = 265 + (i % 6) * 3;
            const ry = 152 + (i % 5) * 2.5;
            const x = 70 + rx * Math.cos(angle);
            const y = 250 + ry * Math.sin(angle);
            const r = (i % 3 === 0 ? 2.5 : i % 2 === 0 ? 1.8 : 1.2);
            return (
              <circle
                key={`ast-${i}`}
                cx={x}
                cy={y}
                r={r}
                fill={activePhase === 1 ? '#e9d5ff' : '#94a3b8'}
              />
            );
          })}
        </g>

        {/* ── MATAHARI (Anchor Gravitasi Utama) ── */}
        <g className="anim-sun-orbit">
          {/* Extended Corona Glow */}
          <circle cx="70" cy="250" r="95" fill="url(#stageSunCore)" />
          {/* Prominence Flares */}
          <path d="M70 185 Q90 160 75 145 Q55 165 70 185" fill="#f97316" opacity="0.8" />
          <path d="M125 270 Q150 290 140 310 Q115 295 125 270" fill="#f97316" opacity="0.8" />
          {/* Photosphere Sphere */}
          <circle cx="70" cy="250" r="54" fill="#facc15" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="70" cy="250" r="46" fill="#fef08a" />
          <text x="70" y="254" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="900" fontFamily="sans-serif">
            MATAHARI
          </text>
        </g>

        {/* ── PHASE 0: PLANET DALAM (Terestrial) ── */}
        <g
          className="cursor-pointer"
          onClick={() => { sound.playClick(); onSelectPhase(0); }}
          opacity={activePhase === 0 ? 1 : 0.75}
        >
          {/* 1. Merkurius */}
          <g transform="translate(145, 250)">
            {activePhase === 0 && <circle cx="0" cy="0" r="14" fill="#38bdf8" fillOpacity="0.25" className="anim-halo" />}
            <circle cx="0" cy="0" r="5.5" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="1" />
            <text x="0" y="15" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="bold">Merkurius</text>
          </g>

          {/* 2. Venus */}
          <g transform="translate(185, 230)">
            {activePhase === 0 && <circle cx="0" cy="0" r="16" fill="#fbbf24" fillOpacity="0.25" className="anim-halo" />}
            <circle cx="0" cy="0" r="8.5" fill="#f59e0b" stroke="#fef08a" strokeWidth="1" />
            <text x="0" y="18" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">Venus</text>
          </g>

          {/* 3. Bumi & Bulan */}
          <g transform="translate(235, 260)">
            {activePhase === 0 && <circle cx="0" cy="0" r="19" fill="#4ade80" fillOpacity="0.3" className="anim-halo" />}
            <circle cx="0" cy="0" r="11" fill="#3b82f6" stroke="#22c55e" strokeWidth="2" />
            <circle cx="14" cy="-5" r="3" fill="#e2e8f0" />
            <text x="0" y="21" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="900">Bumi</text>
          </g>

          {/* 4. Mars */}
          <g transform="translate(285, 232)">
            {activePhase === 0 && <circle cx="0" cy="0" r="15" fill="#f87171" fillOpacity="0.25" className="anim-halo" />}
            <circle cx="0" cy="0" r="7.5" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
            <text x="0" y="17" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">Mars</text>
          </g>
        </g>

        {/* ── PHASE 2: PLANET LUAR (Jovian Raksasa Gas & Es) ── */}
        <g
          className="cursor-pointer"
          onClick={() => { sound.playClick(); onSelectPhase(2); }}
          opacity={activePhase === 2 ? 1 : 0.75}
        >
          {/* 5. Jupiter */}
          <g transform="translate(400, 275)">
            {activePhase === 2 && <circle cx="0" cy="0" r="36" fill="#fb923c" fillOpacity="0.25" className="anim-halo" />}
            <circle cx="0" cy="0" r="26" fill="url(#jupiterBandGrad)" stroke="#fed7aa" strokeWidth="1.5" />
            {/* Great Red Spot */}
            <ellipse cx="10" cy="8" rx="5" ry="3.5" fill="#991b1b" />
            <text x="0" y="38" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="900">Jupiter</text>
          </g>

          {/* 6. Saturnus */}
          <g transform="translate(510, 210) rotate(-16)">
            {activePhase === 2 && <circle cx="0" cy="0" r="38" fill="#fde047" fillOpacity="0.25" className="anim-halo" />}
            {/* Back Ring */}
            <ellipse cx="0" cy="0" rx="38" ry="12" fill="none" stroke="#fde047" strokeWidth="4.5" strokeOpacity="0.5" />
            {/* Body */}
            <circle cx="0" cy="0" r="19" fill="url(#saturnStageGrad)" />
            {/* Front Ring */}
            <path d="M-38 0 C-38 8 38 8 38 0" stroke="#fde047" strokeWidth="4.5" strokeOpacity="0.9" fill="none" />
            <text x="0" y="34" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="900">Saturnus</text>
          </g>

          {/* 7. Uranus */}
          <g transform="translate(615, 290)">
            {activePhase === 2 && <circle cx="0" cy="0" r="22" fill="#67e8f9" fillOpacity="0.25" className="anim-halo" />}
            <circle cx="0" cy="0" r="13" fill="#06b6d4" stroke="#a5f3fc" strokeWidth="1" />
            <ellipse cx="0" cy="0" rx="19" ry="3.5" stroke="#a5f3fc" strokeWidth="1.2" fill="none" transform="rotate(75)" opacity="0.8" />
            <text x="0" y="24" textAnchor="middle" fill="#cffafe" fontSize="9" fontWeight="bold">Uranus</text>
          </g>

          {/* 8. Neptunus */}
          <g transform="translate(715, 220)">
            {activePhase === 2 && <circle cx="0" cy="0" r="21" fill="#60a5fa" fillOpacity="0.25" className="anim-halo" />}
            <circle cx="0" cy="0" r="12" fill="#2563eb" stroke="#93c5fd" strokeWidth="1" />
            <ellipse cx="0" cy="-3" rx="10" ry="2" fill="#60a5fa" opacity="0.6" />
            <text x="0" y="23" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">Neptunus</text>
          </g>
        </g>

        {/* ── BOTTOM HUD TELEMETRY BAR ── */}
        <g transform="translate(30, 460)">
          <rect width="740" height="28" rx="8" fill="#0f172a" stroke="#7c3aed" strokeWidth="1" opacity="0.92" />
          <circle cx="16" cy="14" r="4" fill="#38bdf8" />
          <text x="28" y="18" fill="#e2e8f0" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            TELEMETRI GARUDA ORBITAL: {activePhase === 0 ? 'FOKUS 4 PLANET TERESTRIAL (BATUAN PADAT)' : activePhase === 1 ? 'MENEMBUS SABUK BATUAN ASTEROID MARS-JUPITER' : 'MENJELAJAHI 4 RAKSASA JOVIAN (GAS & ES)'}
          </text>
        </g>
      </svg>

      {/* ── INTERACTIVE TOUCH HOTSPOT BEACONS ──────────────────── */}
      {BEACONS.map((beacon, idx) => {
        const isActive = activePhase === idx;
        const colorClasses =
          beacon.color === 'amber'
            ? isActive
              ? 'bg-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.8)] scale-105'
              : 'bg-amber-950/80 text-amber-200 border-amber-400/60 hover:bg-amber-900/90'
            : beacon.color === 'indigo'
            ? isActive
              ? 'bg-indigo-400 text-slate-950 border-indigo-300 ring-4 ring-indigo-400/50 shadow-[0_0_20px_rgba(129,140,248,0.8)] scale-105'
              : 'bg-indigo-950/80 text-indigo-200 border-indigo-400/60 hover:bg-indigo-900/90'
            : isActive
            ? 'bg-purple-400 text-slate-950 border-purple-300 ring-4 ring-purple-400/50 shadow-[0_0_20px_rgba(192,132,252,0.8)] scale-105'
            : 'bg-purple-950/80 text-purple-200 border-purple-400/60 hover:bg-purple-900/90';

        return (
          <button
            key={beacon.id}
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectPhase(idx);
            }}
            style={{ left: beacon.x, top: beacon.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 min-h-[38px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl border-2 font-black text-[11px] sm:text-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer backdrop-blur-md active:scale-95 shadow-lg ${colorClasses}`}
            title={`Buka ulasan ${beacon.label}`}
          >
            <span className="text-sm sm:text-base leading-none">{beacon.emoji}</span>
            <span className="whitespace-nowrap">{beacon.label}</span>
          </button>
        );
      })}
    </div>
  );
};
