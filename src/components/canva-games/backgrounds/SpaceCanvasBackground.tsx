import React from 'react';

export interface SpaceCanvasBackgroundProps {
  className?: string;
}

/**
 * High-performance, animated SVG space canvas background for the
 * "Petualangan Sains: Tata Surya & Gravitasi" presentation deck.
 * Features:
 * - Deep cosmic void with luminous nebula clouds
 * - Solar corona & gravitational beacon
 * - Elliptical orbit paths of the solar system
 * - Garuda Orbital probe in slow transit
 * - Multi-layer twinkling starfield & constellations
 * - Balanced opacity for maximum foreground slide legibility
 */
export const SpaceCanvasBackground: React.FC<SpaceCanvasBackgroundProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes starTwinkleSlow {
              0%, 100% { opacity: 0.35; transform: scale(0.9); }
              50% { opacity: 0.95; transform: scale(1.15); }
            }
            @keyframes starTwinkleFast {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 0.85; }
            }
            @keyframes solarBreathe {
              0%, 100% { opacity: 0.45; transform: scale(1); }
              50% { opacity: 0.7; transform: scale(1.04); }
            }
            @keyframes nebulaDrift {
              0%, 100% { opacity: 0.35; transform: translate(0, 0); }
              50% { opacity: 0.55; transform: translate(12px, -8px); }
            }
            @keyframes garudaOrbitTravel {
              0% { transform: translate(-30px, 15px) rotate(-1deg); }
              50% { transform: translate(25px, -10px) rotate(1.5deg); }
              100% { transform: translate(-30px, 15px) rotate(-1deg); }
            }
            @keyframes commsSignalPulse {
              0% { r: 4px; opacity: 0.9; }
              100% { r: 24px; opacity: 0; }
            }

            .anim-star-slow {
              animation: starTwinkleSlow 4.5s ease-in-out infinite;
              transform-box: fill-box;
              transform-origin: center;
            }
            .anim-star-fast {
              animation: starTwinkleFast 2.8s ease-in-out infinite;
              transform-box: fill-box;
              transform-origin: center;
            }
            .anim-sun-corona {
              animation: solarBreathe 7s ease-in-out infinite;
              transform-origin: 110px 110px;
            }
            .anim-nebula {
              animation: nebulaDrift 16s ease-in-out infinite;
            }
            .anim-garuda {
              animation: garudaOrbitTravel 22s ease-in-out infinite;
            }
            .anim-signal {
              animation: commsSignalPulse 2.4s ease-out infinite;
            }
          `}</style>

          {/* COSMIC VOID GRADIENT */}
          <linearGradient id="spaceVoidGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#030712" />
            <stop offset="35%" stopColor="#0b0f19" />
            <stop offset="65%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          {/* NEBULA CLOUDS */}
          <radialGradient id="nebulaPurple" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="nebulaCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.32" />
            <stop offset="55%" stopColor="#0284c7" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="nebulaMagenta" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0" />
          </radialGradient>

          {/* SOLAR CORONA & PHOTOSPHERE */}
          <radialGradient id="solarCoronaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="85%" stopColor="#d97706" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </radialGradient>

          {/* SATURN GRADIENT */}
          <linearGradient id="saturnBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#fcd34d" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>

          {/* PLANETARY ATMOSPHERE GLOW */}
          <radialGradient id="planetGlowCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. DEEP SPACE BACKDROP */}
        <rect width="1200" height="800" fill="url(#spaceVoidGrad)" />

        {/* 2. LUMINOUS COSMIC NEBULAE */}
        <g className="anim-nebula">
          <ellipse cx="280" cy="220" rx="340" ry="240" fill="url(#nebulaPurple)" />
          <ellipse cx="940" cy="580" rx="320" ry="260" fill="url(#nebulaCyan)" />
          <ellipse cx="780" cy="180" rx="260" ry="180" fill="url(#nebulaMagenta)" />
        </g>

        {/* 3. MULTI-LAYER TWINKLING STARS */}
        {/* Layer A: Distant Micro Stars */}
        <g fill="#ffffff" opacity="0.55">
          <circle cx="85" cy="95" r="1" />
          <circle cx="160" cy="380" r="1.2" />
          <circle cx="240" cy="620" r="0.9" />
          <circle cx="390" cy="140" r="1" />
          <circle cx="480" cy="740" r="1.2" />
          <circle cx="560" cy="90" r="1" />
          <circle cx="690" cy="460" r="0.8" />
          <circle cx="750" cy="710" r="1.1" />
          <circle cx="880" cy="310" r="1" />
          <circle cx="990" cy="120" r="1.2" />
          <circle cx="1060" cy="480" r="0.9" />
          <circle cx="1140" cy="280" r="1" />
          <circle cx="1170" cy="690" r="1.2" />
        </g>

        {/* Layer B: Animated Twinkling Medium Stars */}
        <g fill="#bae6fd" className="anim-star-fast">
          <circle cx="120" cy="520" r="1.8" />
          <circle cx="320" cy="340" r="2.2" />
          <circle cx="460" cy="210" r="1.6" />
          <circle cx="620" cy="620" r="2.2" />
          <circle cx="810" cy="430" r="1.7" />
          <circle cx="930" cy="240" r="2.4" />
          <circle cx="1040" cy="640" r="2" />
          <circle cx="1120" cy="80" r="1.8" />
        </g>

        {/* Layer C: Bright Diamond Stars with Subtle Flares */}
        <g className="anim-star-slow">
          {/* Star 1 at (290, 110) */}
          <g transform="translate(290, 110)">
            <circle cx="0" cy="0" r="2.6" fill="#ffffff" />
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#fef08a" strokeWidth="1" opacity="0.8" />
            <line x1="0" y1="-7" x2="0" y2="7" stroke="#fef08a" strokeWidth="1" opacity="0.8" />
          </g>
          {/* Star 2 at (840, 90) */}
          <g transform="translate(840, 90)">
            <circle cx="0" cy="0" r="2.4" fill="#ffffff" />
            <line x1="-6" y1="0" x2="6" y2="0" stroke="#38bdf8" strokeWidth="0.9" opacity="0.85" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="#38bdf8" strokeWidth="0.9" opacity="0.85" />
          </g>
          {/* Star 3 at (670, 680) */}
          <g transform="translate(670, 680)">
            <circle cx="0" cy="0" r="2.8" fill="#ffffff" />
            <line x1="-8" y1="0" x2="8" y2="0" stroke="#c084fc" strokeWidth="1.1" opacity="0.75" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#c084fc" strokeWidth="1.1" opacity="0.75" />
          </g>
        </g>

        {/* Constellation Trace (Pari / Southern Cross - Indonesian Maritime Heritage) */}
        <g stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.25">
          <line x1="980" y1="620" x2="980" y2="700" />
          <line x1="950" y1="660" x2="1010" y2="655" />
          <circle cx="980" cy="620" r="2.5" fill="#e0f2fe" />
          <circle cx="980" cy="700" r="2.5" fill="#e0f2fe" />
          <circle cx="950" cy="660" r="2" fill="#e0f2fe" />
          <circle cx="1010" cy="655" r="2" fill="#e0f2fe" />
        </g>

        {/* 4. CONCENTRIC ELLIPTICAL ORBITS (Gravitational Paths around Sun) */}
        <g stroke="#818cf8" strokeWidth="1" strokeDasharray="5 7" opacity="0.22" fill="none">
          {/* Inner Planets Orbits */}
          <ellipse cx="110" cy="110" rx="210" ry="145" transform="rotate(-15 110 110)" />
          <ellipse cx="110" cy="110" rx="340" ry="235" transform="rotate(-15 110 110)" />
          <ellipse cx="110" cy="110" rx="490" ry="340" transform="rotate(-15 110 110)" />
          {/* Asteroid Belt Dotted Ribbon */}
          <ellipse
            cx="110"
            cy="110"
            rx="640"
            ry="440"
            stroke="#cbd5e1"
            strokeWidth="1.8"
            strokeDasharray="2 10"
            opacity="0.32"
            transform="rotate(-15 110 110)"
          />
          {/* Outer Planets Orbits */}
          <ellipse cx="110" cy="110" rx="810" ry="560" stroke="#a78bfa" strokeWidth="1.2" transform="rotate(-15 110 110)" />
          <ellipse cx="110" cy="110" rx="1000" ry="690" stroke="#c084fc" strokeWidth="1.3" transform="rotate(-15 110 110)" />
        </g>

        {/* 5. THE SUN / SOLAR CORONA (Top-Left Gravitational Anchor) */}
        <g className="anim-sun-corona">
          {/* Outer Extended Glow */}
          <circle cx="110" cy="110" r="160" fill="url(#solarCoronaGrad)" />
          {/* Corona Streamers & Prominences */}
          <g stroke="#fde047" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.4">
            <line x1="110" y1="110" x2="280" y2="170" />
            <line x1="110" y1="110" x2="220" y2="240" />
            <line x1="110" y1="110" x2="160" y2="280" />
          </g>
          {/* Blazing Photosphere Core */}
          <circle cx="110" cy="110" r="54" fill="#fef08a" />
          <circle cx="110" cy="110" r="46" fill="#ffffff" />
        </g>

        {/* 6. CELESTIAL BODIES (In Realistic Scale Contrast) */}
        {/* Planet 1: Mars (Small red sphere along orbit 4) */}
        <g transform="translate(430, 310)">
          <circle cx="0" cy="0" r="9" fill="#ef4444" />
          <circle cx="0" cy="0" r="11" fill="none" stroke="#f87171" strokeWidth="1" opacity="0.5" />
          <path d="M-5 -2 Q0 -6 5 -3" stroke="#991b1b" strokeWidth="1.2" fill="none" />
        </g>

        {/* Planet 2: Saturn with Magnificent Rings (Upper Right Quadrant) */}
        <g transform="translate(980, 210) rotate(-18)">
          {/* Back half of ring */}
          <ellipse
            cx="0"
            cy="0"
            rx="46"
            ry="14"
            fill="none"
            stroke="#fde047"
            strokeWidth="5"
            strokeOpacity="0.45"
          />
          <ellipse
            cx="0"
            cy="0"
            rx="52"
            ry="16"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeOpacity="0.3"
          />
          {/* Planet Body */}
          <circle cx="0" cy="0" r="22" fill="url(#saturnBodyGrad)" />
          {/* Atmospheric Banding */}
          <line x1="-21" y1="-5" x2="21" y2="-5" stroke="#b45309" strokeWidth="1.5" opacity="0.5" />
          <line x1="-22" y1="3" x2="22" y2="3" stroke="#fef08a" strokeWidth="1.2" opacity="0.6" />
          {/* Front half of ring */}
          <path
            d="M-52 0 C-52 9 52 9 52 0"
            stroke="#fde047"
            strokeWidth="5"
            strokeOpacity="0.8"
            fill="none"
          />
          <path
            d="M-46 0 C-46 7 46 7 46 0"
            stroke="#d97706"
            strokeWidth="2"
            strokeOpacity="0.5"
            fill="none"
          />
        </g>

        {/* Planet 3: Distant Neptune (Cyan Ice Giant at Bottom Right) */}
        <g transform="translate(1080, 540)">
          <circle cx="0" cy="0" r="16" fill="#0284c7" />
          <circle cx="0" cy="0" r="19" fill="url(#planetGlowCyan)" />
          <path d="M-12 -2 Q-3 -7 10 -4" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75" />
          {/* Triton Moon */}
          <circle cx="28" cy="-14" r="2.8" fill="#e0f2fe" opacity="0.8" />
        </g>

        {/* 7. WAHANA GARUDA ORBITAL (Research Probe in Active Transit) */}
        <g className="anim-garuda">
          <g transform="translate(680, 270) rotate(14)">
            {/* Trajectory Thruster Exhaust Trail */}
            <path
              d="M-60 0 C-40 2 -25 1 -14 0"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 3"
              opacity="0.65"
            />
            {/* Blue Plasma Glow */}
            <circle cx="-14" cy="0" r="5" fill="#38bdf8" opacity="0.7" />

            {/* Satellite Central Chassis */}
            <rect x="-12" y="-7" width="24" height="14" rx="3" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.2" />
            <rect x="-8" y="-5" width="16" height="10" rx="1.5" fill="#7c3aed" />

            {/* Left High-Efficiency Solar Panel Array */}
            <g transform="translate(-32, -9)">
              <rect x="0" y="0" width="18" height="18" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="6" y1="0" x2="6" y2="18" stroke="#38bdf8" strokeWidth="0.5" />
              <line x1="12" y1="0" x2="12" y2="18" stroke="#38bdf8" strokeWidth="0.5" />
              <line x1="0" y1="9" x2="18" y2="9" stroke="#38bdf8" strokeWidth="0.5" />
              {/* Solar Panel Mount Arm */}
              <line x1="18" y1="9" x2="20" y2="9" stroke="#cbd5e1" strokeWidth="1.5" />
            </g>

            {/* Right High-Efficiency Solar Panel Array */}
            <g transform="translate(14, -9)">
              <rect x="0" y="0" width="18" height="18" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="6" y1="0" x2="6" y2="18" stroke="#38bdf8" strokeWidth="0.5" />
              <line x1="12" y1="0" x2="12" y2="18" stroke="#38bdf8" strokeWidth="0.5" />
              <line x1="0" y1="9" x2="18" y2="9" stroke="#38bdf8" strokeWidth="0.5" />
              {/* Solar Panel Mount Arm */}
              <line x1="-2" y1="9" x2="0" y2="9" stroke="#cbd5e1" strokeWidth="1.5" />
            </g>

            {/* High-Gain Parabolic Communications Dish Antenna */}
            <path d="M-2 -8 Q0 -16 6 -14" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
            <path d="M4 -17 Q12 -19 14 -11" stroke="#facc15" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="7" cy="-14" r="1.5" fill="#facc15" />

            {/* Radio Telemetry Beacon Pulse */}
            <circle cx="7" cy="-14" r="4" fill="none" stroke="#38bdf8" strokeWidth="1" className="anim-signal" />

            {/* Indonesia Flag / Garuda Mission Insignia */}
            <rect x="-4" y="-3" width="8" height="3" fill="#ef4444" />
            <rect x="-4" y="0" width="8" height="3" fill="#ffffff" />
          </g>
        </g>

        {/* 8. SUBTLE ASTROMETRIC GRID OVERLAY (At low opacity for futuristic cockpit feel) */}
        <g stroke="#6366f1" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.08">
          <line x1="0" y1="200" x2="1200" y2="200" />
          <line x1="0" y1="400" x2="1200" y2="400" />
          <line x1="0" y1="600" x2="1200" y2="600" />
          <line x1="300" y1="0" x2="300" y2="800" />
          <line x1="600" y1="0" x2="600" y2="800" />
          <line x1="900" y1="0" x2="900" y2="800" />
        </g>
      </svg>
    </div>
  );
};
