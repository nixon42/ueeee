import React, { useState, useEffect } from 'react';
import { sound } from '@/lib/sound';

export interface EclipseMechanicsStageProps {
  activePhase: number;
  onSelectPhase: (idx: number) => void;
  isPlaying?: boolean;
  className?: string;
}

const BEACONS = [
  { id: 'gravitasi', label: '1. Gravitasi Semesta', emoji: '☀️', x: '24%', y: '20%', color: 'amber' },
  { id: 'umbra-penumbra', label: '2. Umbra & Penumbra', emoji: '🌑', x: '58%', y: '16%', color: 'purple' },
  { id: 'syzygy-gerhana', label: '3. Geometri Gerhana', emoji: '🌘', x: '82%', y: '22%', color: 'blue' },
];

export const EclipseMechanicsStage: React.FC<EclipseMechanicsStageProps> = ({
  activePhase,
  onSelectPhase,
  isPlaying = false,
  className = '',
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    let animId: number;
    const tick = () => {
      setTime((prev) => prev + 1);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Dynamic Moon position during eclipse transit animation
  const moonX = isPlaying ? 470 + 20 * Math.cos(time * 0.03) : 470;
  const moonY = isPlaying ? 250 + 40 * Math.sin(time * 0.03) : 250;
  const umbraApexY = 250 + (moonY - 250) * 1.6;
  return (
    <div className={`relative w-full h-full select-none overflow-hidden rounded-2xl bg-slate-950 ${className}`}>
      {/* ── VECTOR ECLIPSE WORLD ────────────────────────────────────── */}
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <style>{`
            @keyframes sunLightBreathe {
              0%, 100% { opacity: 0.85; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.04); }
            }
            @keyframes diamondRingGlint {
              0%, 100% { opacity: 0.3; transform: scale(0.9); }
              50% { opacity: 1; transform: scale(1.3); }
            }
            @keyframes rayStream {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -40; }
            }
            @keyframes gravityWave {
              0% { r: 60px; opacity: 0.8; }
              100% { r: 160px; opacity: 0; }
            }
            .anim-sun-light {
              animation: sunLightBreathe 6s ease-in-out infinite;
              transform-origin: 100px 250px;
            }
            .anim-diamond-glint {
              animation: diamondRingGlint 2.2s ease-in-out infinite;
              transform-origin: 470px 238px;
            }
            .anim-light-ray {
              animation: rayStream 3s linear infinite;
            }
            .anim-grav-wave {
              animation: gravityWave 3s ease-out infinite;
            }
          `}</style>

          <linearGradient id="eclipseVoid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#020617" />
            <stop offset="45%" stopColor="#0b0f19" />
            <stop offset="85%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          {/* Sun Core */}
          <radialGradient id="eclipseSunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="30%" stopColor="#fef08a" />
            <stop offset="65%" stopColor="#f59e0b" />
            <stop offset="90%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
          </radialGradient>

          {/* Earth Atmosphere */}
          <radialGradient id="earthAtmo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          {/* Umbra Cone Gradient */}
          <linearGradient id="umbraConeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#090514" stopOpacity="0.85" />
          </linearGradient>

          {/* Penumbra Cone Gradient */}
          <linearGradient id="penumbraConeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#312e81" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <rect width="800" height="500" fill="url(#eclipseVoid)" />

        {/* ── PHASE 0: SPACETIME GRAVITATIONAL CURVATURE GRID ── */}
        {activePhase === 0 && (
          <g stroke="#818cf8" strokeWidth="0.8" opacity="0.35">
            {/* Horizontal warped grid lines */}
            <path d="M0 160 Q100 190 280 180 T800 160" fill="none" />
            <path d="M0 210 Q100 270 280 240 T800 210" fill="none" />
            <path d="M0 290 Q100 330 280 300 T800 290" fill="none" />
            <path d="M0 340 Q100 370 280 350 T800 340" fill="none" />
            {/* Radial gravity well rings */}
            <circle cx="100" cy="250" r="100" fill="none" stroke="#a78bfa" strokeDasharray="4 4" />
            <circle cx="100" cy="250" r="150" fill="none" stroke="#c084fc" strokeDasharray="5 5" opacity="0.5" />
            <circle cx="100" cy="250" r="210" fill="none" stroke="#e9d5ff" strokeDasharray="6 6" opacity="0.3" />
            <circle cx="100" cy="250" r="60" fill="none" stroke="#facc15" strokeWidth="1.5" className="anim-grav-wave" />
          </g>
        )}

        {/* ── LIGHT CONES (UMBRA & PENUMBRA) ── */}
        <g opacity={activePhase === 1 || activePhase === 2 ? 1 : 0.4}>
          {/* Top Penumbra Divergent Cone */}
          <polygon
            points={`100,175 ${moonX},${moonY - 10} 680,${umbraApexY - 65} 680,${umbraApexY - 25}`}
            fill="url(#penumbraConeGrad)"
          />
          {/* Bottom Penumbra Divergent Cone */}
          <polygon
            points={`100,325 ${moonX},${moonY + 10} 680,${umbraApexY + 65} 680,${umbraApexY + 25}`}
            fill="url(#penumbraConeGrad)"
          />

          {/* Central Convergent Umbra Cone (Total Darkness Shadow) */}
          <polygon
            points={`100,175 ${moonX},${moonY - 12} 680,${umbraApexY - 4} 680,${umbraApexY + 4} ${moonX},${moonY + 12} 100,325`}
            fill="url(#umbraConeGrad)"
          />

          {/* Ray Guidance Boundary Lines */}
          <g stroke="#fef08a" strokeWidth="1" strokeDasharray="6 4" opacity="0.45" className="anim-light-ray">
            {/* Top Outer Ray to Penumbra */}
            <line x1="100" y1="175" x2="680" y2={umbraApexY - 65} />
            {/* Cross Ray to Umbra Apex */}
            <line x1="100" y1="175" x2="680" y2={umbraApexY + 4} />
            {/* Bottom Outer Ray to Penumbra */}
            <line x1="100" y1="325" x2="680" y2={umbraApexY + 65} />
            {/* Bottom Cross Ray to Umbra Apex */}
            <line x1="100" y1="325" x2="680" y2={umbraApexY - 4} />
          </g>
        </g>

        {/* ── MATAHARI (SUMBER CAHAYA RADIASI) ── */}
        <g
          className="anim-sun-light cursor-pointer"
          onClick={() => { sound.playClick(); onSelectPhase(0); }}
        >
          {/* Corona Rays */}
          <circle cx="100" cy="250" r="115" fill="url(#eclipseSunCore)" />
          {/* Photosphere Disk */}
          <circle cx="100" cy="250" r="75" fill="#facc15" stroke="#f59e0b" strokeWidth="3" />
          <circle cx="100" cy="250" r="64" fill="#fef08a" />
          <text x="100" y="254" textAnchor="middle" fill="#78350f" fontSize="13" fontWeight="900" fontFamily="sans-serif">
            MATAHARI
          </text>
        </g>

        {/* ── BULAN (PENGHALANG CAHAYA) ── */}
        <g
          transform={`translate(${moonX}, ${moonY})`}
          className="cursor-pointer"
          onClick={() => { sound.playClick(); onSelectPhase(1); }}
        >
          {/* Moon Halo in Phase 1 or 2 */}
          {(activePhase === 1 || activePhase === 2) && (
            <circle cx="0" cy="0" r="22" fill="#c084fc" fillOpacity="0.25" />
          )}
          {/* Moon Body */}
          <circle cx="0" cy="0" r="13" fill="#1e293b" stroke="#64748b" strokeWidth="1.2" />
          {/* Daylit Crescent on Sunward Side (Left side illuminated) */}
          <path d="M-13 0 A13 13 0 0 1 0 -13 A13 13 0 0 0 0 13 A13 13 0 0 1 -13 0" fill="#f8fafc" />
          <circle cx="-5" cy="-3" r="2" fill="#94a3b8" />
          <circle cx="-3" cy="4" r="1.5" fill="#94a3b8" />
          <text x="0" y="24" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">
            Bulan Baru
          </text>
        </g>

        {/* ── BUMI (ZONA BAYANGAN PENGAMAT) ── */}
        <g
          transform="translate(680, 250)"
          className="cursor-pointer"
          onClick={() => { sound.playClick(); onSelectPhase(2); }}
        >
          {/* Atmosphere Glow */}
          <circle cx="0" cy="0" r="48" fill="url(#earthAtmo)" />
          {/* Earth Body */}
          <circle cx="0" cy="0" r="38" fill="#1e3a8a" stroke="#22c55e" strokeWidth="2.5" />
          {/* Continents */}
          <path d="M-18 -15 Q-5 -25 10 -15 Q5 -5 -10 -5 Z" fill="#22c55e" />
          <path d="M-22 5 Q-10 0 -5 18 Q-20 25 -22 5 Z" fill="#22c55e" />
          {/* Swirling Clouds */}
          <path d="M-25 -8 Q-10 -18 15 -10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          <path d="M-15 15 Q10 10 25 22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

          {/* Umbra Totality Impact Point on Earth Surface */}
          <ellipse cx="-38" cy={umbraApexY - 250} rx="4" ry="7" fill="#000000" stroke="#ef4444" strokeWidth="1.2" />
          {/* Totality Zone Callout Pulse */}
          <circle cx="-38" cy={umbraApexY - 250} r="8" fill="none" stroke="#f87171" strokeWidth="1.2" opacity="0.8" />

          <text x="0" y="52" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="900">
            Bumi
          </text>
        </g>

        {/* ── PHASE 1 ANNOTATIONS: UMBRA VS PENUMBRA ── */}
        {activePhase === 1 && (
          <g>
            {/* Umbra Tag */}
            <g transform={`translate(555, ${Math.min(310, Math.max(190, umbraApexY - 15))})`}>
              <rect x="0" y="0" width="85" height="22" rx="6" fill="#020617" stroke="#c084fc" strokeWidth="1.4" />
              <text x="42" y="14" textAnchor="middle" fill="#e9d5ff" fontSize="9" fontWeight="black">
                Kerucut Umbra
              </text>
            </g>
            {/* Penumbra Tag Top */}
            <g transform="translate(555, 160)">
              <rect x="0" y="0" width="90" height="21" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" />
              <text x="45" y="14" textAnchor="middle" fill="#c7d2fe" fontSize="8.5" fontWeight="bold">
                Zona Penumbra
              </text>
            </g>
          </g>
        )}

        {/* ── PHASE 2: SYZYGY ALIGNMENT & SCI-FI TOTAL ECLIPSE OBSERVATORY VIEWPORT ── */}
        {activePhase === 2 && (
          <g>
            {/* Central Syzygy Axis Line */}
            <line x1="100" y1="250" x2="680" y2="250" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="5 3" opacity="0.8" />

            {/* Total Solar Eclipse Observer View Inset (Top-Right High-Tech Viewfinder HUD) */}
            <g transform="translate(460, 305)">
              {/* Outer HUD Shell */}
              <rect width="310" height="115" rx="16" fill="#030712" stroke="#38bdf8" strokeWidth="2" opacity="0.95" />
              <rect x="2" y="2" width="306" height="24" rx="14" fill="#0f172a" />
              
              {/* Scope Top Header Status */}
              <circle cx="16" cy="14" r="4" fill="#22c55e" className="animate-pulse" />
              <text x="26" y="17" fill="#38bdf8" fontSize="9" fontWeight="900" letterSpacing="0.08em" fontFamily="monospace">
                TELESKOP OPTIK: GERHANA MATAHARI TOTAL
              </text>

              {/* Viewfinder Circular Reticle (Left Side) */}
              <g transform="translate(62, 68)">
                {/* Outer Coordinate Degree Ring */}
                <circle cx="0" cy="0" r="36" fill="#020617" stroke="#0284c7" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="32" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
                
                {/* Reticle Crosshairs */}
                <line x1="-34" y1="0" x2="-22" y2="0" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="22" y1="0" x2="34" y2="0" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="0" y1="-34" x2="0" y2="-22" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="0" y1="22" x2="0" y2="34" stroke="#38bdf8" strokeWidth="1.5" />

                {/* Radiant Solar Corona Rim */}
                <circle cx="0" cy="0" r="23" fill="none" stroke="#fef08a" strokeWidth="5" opacity="0.85" filter="drop-shadow(0 0 6px #f59e0b)" />
                {/* Moon Silhouette Disking Out Sun */}
                <circle cx="0" cy="0" r="21" fill="#020617" stroke="#ffffff" strokeWidth="1" />

                {/* Diamond Ring Glint Flare */}
                <g className="anim-diamond-glint" transform="translate(15, -15)">
                  <circle cx="0" cy="0" r="4.5" fill="#ffffff" />
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#fef08a" strokeWidth="2.5" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#fef08a" strokeWidth="2.5" />
                  <circle cx="0" cy="0" r="8" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
                </g>
              </g>

              {/* Telemetry Explanatory Typography (Right Side) */}
              <g transform="translate(118, 42)">
                <text x="0" y="8" fill="#facc15" fontSize="10.5" fontWeight="900">
                  Cincin Berlian (Diamond Ring)
                </text>
                <text x="0" y="24" fill="#e2e8f0" fontSize="8.5" fontWeight="medium">
                  Siluet Bulan tepat mengunci piringan surya.
                </text>
                <text x="0" y="38" fill="#93c5fd" fontSize="8.5" fontWeight="bold">
                  Hanya korona gas putih membara yang berpendar!
                </text>
                
                {/* HUD Live Telemetry Reading */}
                <g transform="translate(0, 48)">
                  <rect width="180" height="16" rx="4" fill="#1e1b4b" stroke="#6366f1" strokeWidth="0.8" />
                  <text x="8" y="11.5" fill="#a5f3fc" fontSize="7.5" fontWeight="bold" fontFamily="monospace">
                    FASE: C2 KONTAK • CAHAYA: KORONA SAJA
                  </text>
                </g>
              </g>
            </g>
          </g>
        )}

        {/* ── BOTTOM HUD TELEMETRY BAR ── */}
        <g transform="translate(30, 460)">
          <rect width="740" height="28" rx="8" fill="#0f172a" stroke="#7c3aed" strokeWidth="1" opacity="0.92" />
          <circle cx="16" cy="14" r="4" fill="#38bdf8" />
          <text x="28" y="18" fill="#e2e8f0" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            SIMULASI MEKANIKA: {activePhase === 0 ? 'MEDAN GRAVITASI MATAHARI MENGIKAT ORBIT ELIPS TATA SURYA' : activePhase === 1 ? 'PROYEKSI KERUCUT BAYANGAN UMBRA (GELAP TOTAL) & PENUMBRA (SEBAGIAN)' : 'KESEJAJARAN TIGA BENDA (SYZYGY): MATAHARI → BULAN → BUMI'}
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
            : beacon.color === 'purple'
            ? isActive
              ? 'bg-purple-400 text-slate-950 border-purple-300 ring-4 ring-purple-400/50 shadow-[0_0_20px_rgba(192,132,252,0.8)] scale-105'
              : 'bg-purple-950/80 text-purple-200 border-purple-400/60 hover:bg-purple-900/90'
            : isActive
            ? 'bg-blue-400 text-slate-950 border-blue-300 ring-4 ring-blue-400/50 shadow-[0_0_20px_rgba(96,165,250,0.8)] scale-105'
            : 'bg-blue-950/80 text-blue-200 border-blue-400/60 hover:bg-blue-900/90';

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
