import React from 'react';

export interface ScienceSvgProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * 1. FOTOSINTESIS & DAUR AIR SVG
 * Detailed leaf anatomy, stomata pore aperture, and 4-phase hydrological cycle
 */
export const FotosintesisDaurAirIllustration: React.FC<ScienceSvgProps> = ({
  className = '',
  width = '100%',
  height = '100%',
}) => {
  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 800 500"
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <style>{`
            @keyframes loopSunPulse {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.06); opacity: 1; }
            }
            @keyframes loopSunRays {
              0%, 100% { opacity: 0.6; stroke-width: 2.2; }
              50% { opacity: 1; stroke-width: 3.2; }
            }
            @keyframes loopCloudDrift {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(10px); }
            }
            @keyframes loopRainDrop {
              0% { transform: translateY(0); opacity: 0; }
              25% { opacity: 0.9; }
              80% { opacity: 0.7; }
              100% { transform: translateY(32px); opacity: 0; }
            }
            @keyframes loopVaporFlow {
              0% { stroke-dashoffset: 28; opacity: 0.4; }
              50% { opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 0.4; }
            }
            @keyframes loopVaporBubble {
              0% { transform: translateY(0) scale(0.7); opacity: 0; }
              30% { opacity: 0.85; }
              80% { opacity: 0.5; }
              100% { transform: translateY(-75px) scale(1.1); opacity: 0; }
            }
            @keyframes loopRiverFlow {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -32; }
            }
            @keyframes loopGasPulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            @keyframes loopInfiltrate {
              0% { transform: translateY(0); opacity: 0; }
              40% { opacity: 0.85; }
              100% { transform: translateY(22px); opacity: 0; }
            }

            .anim-sun-pulse {
              animation: loopSunPulse 4.5s ease-in-out infinite;
              transform-origin: 120px 90px;
            }
            .anim-sun-rays {
              animation: loopSunRays 3s ease-in-out infinite;
            }
            .anim-cloud-drift {
              animation: loopCloudDrift 7s ease-in-out infinite;
            }
            .anim-rain-1 {
              animation: loopRainDrop 1.2s linear infinite;
            }
            .anim-rain-2 {
              animation: loopRainDrop 1.2s linear infinite 0.4s;
            }
            .anim-rain-3 {
              animation: loopRainDrop 1.2s linear infinite 0.8s;
            }
            .anim-vapor-stream {
              animation: loopVaporFlow 2.8s linear infinite;
            }
            .anim-vapor-bubble-1 {
              animation: loopVaporBubble 3.5s ease-out infinite;
            }
            .anim-vapor-bubble-2 {
              animation: loopVaporBubble 3.5s ease-out infinite 1.2s;
            }
            .anim-vapor-bubble-3 {
              animation: loopVaporBubble 3.5s ease-out infinite 2.2s;
            }
            .anim-river-stream {
              animation: loopRiverFlow 3s linear infinite;
            }
            .anim-gas-pulse {
              animation: loopGasPulse 3s ease-in-out infinite;
            }
            .anim-infiltrate {
              animation: loopInfiltrate 2s linear infinite;
            }
          `}</style>

          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
          <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* BACKGROUND LANDSCAPE */}
        <rect width="800" height="500" fill="#f0fdf4" />

        {/* SUN & THERMAL RADIATION WITH LOOPING PULSE */}
        <g className="anim-sun-pulse">
          <circle cx="120" cy="90" r="70" fill="url(#sunGlow)" />
          <circle cx="120" cy="90" r="38" fill="#facc15" stroke="#f59e0b" strokeWidth="3" />
        </g>
        {/* Sunbeams with Animated Glow */}
        <g stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.8" className="anim-sun-rays">
          <line x1="120" y1="35" x2="120" y2="15" />
          <line x1="120" y1="145" x2="120" y2="165" />
          <line x1="65" y1="90" x2="45" y2="90" />
          <line x1="175" y1="90" x2="195" y2="90" />
          <line x1="80" y1="50" x2="65" y2="35" />
          <line x1="160" y1="130" x2="175" y2="145" />
          <line x1="80" y1="130" x2="65" y2="145" />
          <line x1="160" y1="50" x2="175" y2="35" />
        </g>
        <text x="120" y="94" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="900" fontFamily="sans-serif">
          ENERGI SURYA
        </text>

        {/* CUMULUS RAIN CLOUDS & PRECIPITATION WITH DRIFT */}
        <g transform="translate(480, 50)" className="anim-cloud-drift">
          <path
            d="M50 80 Q30 80 20 65 Q10 45 30 35 Q40 15 70 20 Q95 5 125 20 Q145 10 165 30 Q185 45 175 65 Q180 80 155 80 Z"
            fill="#94a3b8"
            stroke="#64748b"
            strokeWidth="3"
            opacity="0.9"
          />
          {/* Looping Rain Streaks (Presipitasi) */}
          <g stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" opacity="0.85">
            <g className="anim-rain-1">
              <line x1="45" y1="92" x2="35" y2="120" />
              <line x1="105" y1="92" x2="95" y2="120" />
              <line x1="160" y1="92" x2="150" y2="120" />
            </g>
            <g className="anim-rain-2">
              <line x1="75" y1="95" x2="65" y2="125" />
              <line x1="135" y1="95" x2="125" y2="125" />
            </g>
            <g className="anim-rain-3">
              <line x1="60" y1="90" x2="52" y2="116" opacity="0.6" />
              <line x1="120" y1="90" x2="112" y2="116" opacity="0.6" />
            </g>
          </g>
          <text x="100" y="55" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
            KONDENSASI AWAN
          </text>
        </g>

        {/* MOUNTAIN PEAKS & GROUND PROFILE */}
        <path d="M420 280 L560 140 L700 280 L800 240 L800 500 L0 500 L0 320 L180 260 L320 320 Z" fill="#dcfce7" />
        <path d="M470 240 L560 140 L650 240 Z" fill="#86efac" opacity="0.5" />

        {/* WINDING RIVER GRADIENT (Aliran Permukaan & Infiltrasi) */}
        <path
          d="M560 250 C540 310 620 360 580 430 C560 470 510 490 480 500 L560 500 C620 480 670 410 630 340 C600 290 620 270 610 250 Z"
          fill="url(#riverGrad)"
          opacity="0.85"
        />
        {/* Animated River Flow Current */}
        <path
          d="M565 260 C545 315 625 365 585 435 C565 475 515 492 485 500"
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="12 8"
          fill="none"
          opacity="0.5"
          className="anim-river-stream"
        />

        {/* INFILTRASI GROUND WATER DROPLETS UNDER FOREST */}
        <g className="anim-infiltrate" fill="#0284c7" opacity="0.75">
          <circle cx="530" cy="360" r="2.5" />
          <circle cx="545" cy="385" r="2" />
          <circle cx="520" cy="410" r="3" />
          <circle cx="505" cy="435" r="2" />
          <circle cx="490" cy="460" r="2.5" />
        </g>
        <text x="530" y="440" fill="#047857" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
          ↓ Infiltrasi Tanah
        </text>

        {/* EVAPORATION VECTORS RISING FROM RIVER WITH LOOPING FLOW */}
        <g stroke="#0284c7" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.85" className="anim-vapor-stream">
          <path d="M680 420 Q670 380 690 340 Q710 300 690 260" fill="none" />
          <path d="M720 440 Q710 400 730 360 Q750 320 730 280" fill="none" />
        </g>
        {/* Animated Rising Vapor Orbs */}
        <g className="anim-vapor-bubble-1" fill="#38bdf8">
          <circle cx="682" cy="410" r="3.5" opacity="0.8" />
          <circle cx="722" cy="425" r="3" opacity="0.75" />
        </g>
        <g className="anim-vapor-bubble-2" fill="#0284c7">
          <circle cx="688" cy="380" r="4" opacity="0.85" />
          <circle cx="728" cy="390" r="3.5" opacity="0.8" />
        </g>
        <g className="anim-vapor-bubble-3" fill="#38bdf8">
          <circle cx="692" cy="340" r="4.5" opacity="0.9" />
          <circle cx="732" cy="350" r="4" opacity="0.85" />
        </g>
        <text x="740" y="340" fill="#0369a1" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          ↑ Evaporasi Air
        </text>

        {/* GIANT LEAF ANATOMY CUTAWAY (Foreground Left) */}
        <g transform="translate(60, 210)">
          {/* Leaf Contour Base */}
          <path
            d="M30 180 C80 60 220 30 340 50 C300 140 220 230 70 230 C45 230 35 210 30 180 Z"
            fill="url(#leafGrad)"
            stroke="#166534"
            strokeWidth="3.5"
          />
          {/* Main Leaf Vein (Xylem / Phloem) */}
          <path d="M30 180 C120 150 220 110 335 52" stroke="#fef08a" strokeWidth="5" fill="none" />
          <path d="M120 150 Q160 120 190 70" stroke="#fef08a" strokeWidth="2.5" fill="none" />
          <path d="M180 130 Q220 120 260 90" stroke="#fef08a" strokeWidth="2.5" fill="none" />
          <path d="M100 160 Q120 190 140 205" stroke="#fef08a" strokeWidth="2.5" fill="none" />

          {/* Microscopic Cutaway Circle of Mesophyll & Stomata */}
          <g transform="translate(180, 140)">
            <circle cx="0" cy="0" r="62" fill="#ffffff" stroke="#15803d" strokeWidth="3" />
            {/* Upper Epidermis */}
            <rect x="-56" y="-50" width="112" height="14" rx="4" fill="#86efac" stroke="#16a34a" strokeWidth="1" />
            <text x="0" y="-40" textAnchor="middle" fill="#14532d" fontSize="7" fontWeight="bold">EPIDERMIS ATAS</text>
            {/* Palisade Cells with Chloroplasts */}
            {[-42, -21, 0, 21, 42].map((x, i) => (
              <g key={`pcell-${i}`} transform={`translate(${x}, -22)`}>
                <rect x="-8" y="-12" width="16" height="24" rx="3" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
                <circle cx="-3" cy="-5" r="2" fill="#14532d" />
                <circle cx="3" cy="2" r="2" fill="#14532d" />
              </g>
            ))}
            {/* Spongy Mesophyll & Air Spaces */}
            <circle cx="-30" cy="15" r="9" fill="#4ade80" />
            <circle cx="0" cy="18" r="10" fill="#4ade80" />
            <circle cx="30" cy="14" r="9" fill="#4ade80" />
            {/* Stomata Pore with Guard Cells at Bottom */}
            <ellipse cx="-7" cy="44" rx="6" ry="4" fill="#16a34a" />
            <ellipse cx="7" cy="44" rx="6" ry="4" fill="#16a34a" />
            <ellipse cx="0" cy="44" rx="3" ry="1.5" fill="#052e16" />
            <text x="0" y="58" textAnchor="middle" fill="#047857" fontSize="7" fontWeight="black">STOMATA (PORI DAUN)</text>
          </g>

          {/* Gas Inflow / Outflow Callouts with Looping Breath */}
          <g transform="translate(60, 40)" className="anim-gas-pulse">
            <rect width="90" height="22" rx="11" fill="#065f46" />
            <text x="45" y="15" textAnchor="middle" fill="#ecfdf5" fontSize="9" fontWeight="bold">
              CO2 Masuk Stomata
            </text>
          </g>
          <g transform="translate(260, 170)" className="anim-gas-pulse">
            <rect width="90" height="22" rx="11" fill="#0284c7" />
            <text x="45" y="15" textAnchor="middle" fill="#f0f9ff" fontSize="9" fontWeight="bold">
              O2 Dilepas ke Udara
            </text>
          </g>
        </g>

        {/* BOTTOM HUD BANNER */}
        <g transform="translate(30, 455)">
          <rect width="480" height="28" rx="8" fill="#022c22" opacity="0.9" />
          <text x="16" y="18" fill="#a7f3d0" fontSize="10" fontWeight="bold" fontFamily="monospace">
            DAUR AIR &amp; FOTOSINTESIS • SIKLUS TERINTEGRASI ENERGI SURYA
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. LABORATORIUM FORENSIK SVG
 * Volumetric Erlenmeyer flask with titration bubbles, 0-14 pH litmus gradient, and K3 hazard badges
 */
export const LaboratoriumForensikIllustration: React.FC<ScienceSvgProps> = ({
  className = '',
  width = '100%',
  height = '100%',
}) => {
  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 800 500"
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="labDarkBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#042f2e" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#083344" />
          </linearGradient>
          <linearGradient id="flaskTeal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="40%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
          <linearGradient id="phScaleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ef4444" />    {/* pH 0 - Asam Kuat */}
            <stop offset="25%" stopColor="#f97316" />   {/* pH 3 */}
            <stop offset="45%" stopColor="#eab308" />   {/* pH 6 */}
            <stop offset="50%" stopColor="#10b981" />   {/* pH 7 - Netral */}
            <stop offset="75%" stopColor="#06b6d4" />   {/* pH 10 */}
            <stop offset="100%" stopColor="#7e22ce" />  {/* pH 14 - Basa Kuat */}
          </linearGradient>
        </defs>

        <rect width="800" height="500" fill="url(#labDarkBg)" />

        {/* SCIENTIFIC GRID OVERLAY */}
        <g stroke="#14b8a6" strokeWidth="0.8" opacity="0.12">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 60} y1="0" x2={i * 60} y2="500" />
          ))}
        </g>

        {/* LARGE VOLUMETRIC ERLENMEYER FLASK & TITRATION */}
        <g transform="translate(180, 80) scale(1.35)">
          {/* Flask Fluid */}
          <path
            d="M48 65 L10 160 C7 168 12 176 21 176 L139 176 C148 176 153 168 150 160 L112 65 Z"
            fill="url(#flaskTeal)"
            opacity="0.9"
          />
          {/* Fluid Meniscus Curve */}
          <ellipse cx="80" cy="65" rx="32" ry="5" fill="#99f6e4" />

          {/* Flask Borosilicate Glass Body Outline */}
          <path
            d="M62 15 L62 50 L10 160 C7 168 12 176 21 176 L139 176 C148 176 153 168 150 160 L98 50 L98 15 Z"
            stroke="#ccfbf1"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Neck Rim */}
          <ellipse cx="80" cy="15" rx="20" ry="4" stroke="#ccfbf1" strokeWidth="3" fill="none" />

          {/* Graduated Measurement Lines (50ml - 250ml) */}
          {[145, 125, 105, 85].map((y, idx) => (
            <g key={`grad-${idx}`}>
              <line x1="45" y1={y} x2="65" y2={y} stroke="#ffffff" strokeWidth="1.8" opacity="0.8" />
              <text x="70" y={y + 3} fill="#ccfbf1" fontSize="7" fontWeight="bold" fontFamily="monospace">
                {(idx + 1) * 50} ml
              </text>
            </g>
          ))}

          {/* Dynamic Titration Effervescence Bubbles */}
          <circle cx="60" cy="140" r="3" fill="#ffffff" opacity="0.8" />
          <circle cx="95" cy="130" r="4" fill="#ffffff" opacity="0.7" />
          <circle cx="75" cy="110" r="3.5" fill="#ffffff" opacity="0.9" />
          <circle cx="85" cy="85" r="2.5" fill="#a7f3d0" opacity="0.8" />
          <circle cx="78" cy="40" r="2" fill="#5eead4" opacity="0.9" />

          {/* Titration Burette Tip Dropping Indicator */}
          <rect x="77" y="-20" width="6" height="28" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
          <polygon points="77,8 83,8 80,18" fill="#e2e8f0" />
          <circle cx="80" cy="28" r="2.5" fill="#38bdf8" />
        </g>

        {/* 0 - 14 pH SCALE GRADIENT BAR & BENCHMARKS */}
        <g transform="translate(480, 80)">
          <rect width="280" height="150" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <text x="20" y="30" fill="#f8fafc" fontSize="12" fontWeight="black" fontFamily="sans-serif">
            SKALA DERAJAT pH (0 - 14)
          </text>

          {/* The Gradient Bar */}
          <rect x="20" y="45" width="240" height="24" rx="6" fill="url(#phScaleGrad)" stroke="#64748b" strokeWidth="1" />

          {/* Tick Labels */}
          <text x="22" y="85" fill="#f87171" fontSize="9" fontWeight="bold">0 (Asam)</text>
          <text x="140" y="85" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="black">7 (Netral)</text>
          <text x="258" y="85" textAnchor="end" fill="#c084fc" fontSize="9" fontWeight="bold">14 (Basa)</text>

          {/* Litmus Strip Indicator Marker */}
          <g transform="translate(133, 40)">
            <rect x="0" y="0" width="14" height="34" rx="2" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
            <circle cx="7" cy="17" r="3" fill="#10b981" />
          </g>

          <text x="20" y="115" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">
            • Asam (pH &lt; 7): Lakmus biru → Merah
          </text>
          <text x="20" y="130" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">
            • Basa (pH &gt; 7): Lakmus merah → Biru
          </text>
        </g>

        {/* K3 GHS HAZARD BADGES (4 Diamonds) */}
        <g transform="translate(480, 260)">
          <rect width="280" height="150" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <text x="20" y="26" fill="#f8fafc" fontSize="11" fontWeight="black" fontFamily="sans-serif">
            SIMBOL BAHAYA K3 LABORATORIUM
          </text>

          {/* 4 Hazard Badges Grid */}
          {[
            { label: 'Korosif', icon: '⚠️', x: 20, y: 40 },
            { label: 'Toksik', icon: '☠️', x: 85, y: 40 },
            { label: 'Menyala', icon: '🔥', x: 150, y: 40 },
            { label: 'Reaktif', icon: '💥', x: 215, y: 40 },
          ].map((b, i) => (
            <g key={`badge-${i}`} transform={`translate(${b.x}, ${b.y})`}>
              {/* GHS Red Diamond */}
              <polygon points="24,0 48,24 24,48 0,24" fill="#ffffff" stroke="#dc2626" strokeWidth="2.5" />
              <text x="24" y="31" textAnchor="middle" fontSize="16">
                {b.icon}
              </text>
              <text x="24" y="64" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="bold">
                {b.label}
              </text>
            </g>
          ))}

          <text x="20" y="132" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">
            STANDAR KESELAMATAN GHS KEMENDIKBUD
          </text>
        </g>

        {/* BOTTOM HUD STATUS */}
        <g transform="translate(30, 455)">
          <rect width="450" height="28" rx="8" fill="#022c22" stroke="#14b8a6" strokeWidth="1" opacity="0.9" />
          <text x="16" y="18" fill="#5eead4" fontSize="10" fontWeight="bold" fontFamily="monospace">
            LAB UNIT 04 STERILE • KALIBRASI TITRASI pH 7.00 NETRAL
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. SATWA ENDEMIK & KANOPI HUTAN TROPIS SVG
 * Orangutan silhouette, Komodo dragon, and 4-tier vertical canopy layers
 */
export const SatwaEndemikHutanIllustration: React.FC<ScienceSvgProps> = ({
  className = '',
  width = '100%',
  height = '100%',
}) => {
  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 800 500"
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="jungleNight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="60%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>
          <linearGradient id="canopySunbeam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="800" height="500" fill="url(#jungleNight)" />
        {/* Sunbeam penetrating canopy */}
        <polygon points="180,0 260,0 420,500 240,500" fill="url(#canopySunbeam)" />

        {/* 4 STRATA VERTICAL CANOPY CROSS-SECTION (Background Scale on Left) */}
        <g transform="translate(40, 40)">
          {/* Vertical Elevation Bar */}
          <rect x="0" y="0" width="12" height="380" rx="6" fill="#042f2e" stroke="#10b981" strokeWidth="1.5" />

          {/* Strata 4: Emergen (>30m) */}
          <rect x="20" y="10" width="160" height="55" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.2" opacity="0.9" />
          <text x="30" y="30" fill="#a7f3d0" fontSize="8" fontWeight="black">STRATA 4: EMERGEN (&gt;30M)</text>
          <text x="30" y="46" fill="#f0fdf4" fontSize="8">Pohon menjulang, Elang &amp; Enggang</text>

          {/* Strata 3: Kanopi Utama (15-30m) */}
          <rect x="20" y="90" width="160" height="55" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.2" opacity="0.9" />
          <text x="30" y="110" fill="#a7f3d0" fontSize="8" fontWeight="black">STRATA 3: KANOPI UTAMA (15-30M)</text>
          <text x="30" y="126" fill="#f0fdf4" fontSize="8">Atap rimbun, 80% Satwa Arboreal</text>

          {/* Strata 2: Understory (5-15m) */}
          <rect x="20" y="180" width="160" height="55" rx="8" fill="#064e3b" stroke="#059669" strokeWidth="1.2" opacity="0.9" />
          <text x="30" y="200" fill="#a7f3d0" fontSize="8" fontWeight="black">STRATA 2: UNDERSTORY (5-15M)</text>
          <text x="30" y="216" fill="#f0fdf4" fontSize="8">Palem perdu, Katak pohon &amp; Reptil</text>

          {/* Strata 1: Lantai Hutan (0-5m) */}
          <rect x="20" y="280" width="160" height="55" rx="8" fill="#064e3b" stroke="#047857" strokeWidth="1.2" opacity="0.9" />
          <text x="30" y="300" fill="#a7f3d0" fontSize="8" fontWeight="black">STRATA 1: LANTAI HUTAN (0-5M)</text>
          <text x="30" y="316" fill="#f0fdf4" fontSize="8">Humus tanah, Jamur Dekomposer</text>
        </g>

        {/* MASSIVE CANOPY TREE PROFILE (Right Half) */}
        {/* Trunk */}
        <path d="M540 500 C530 350 560 220 500 120 L580 120 C620 220 630 350 640 500 Z" fill="#292524" />
        {/* Canopy Branch extending Left */}
        <path d="M530 220 C420 210 320 250 250 240 L250 265 C340 270 440 245 535 250 Z" fill="#292524" />
        {/* Hanging Lianas / Vines */}
        <path d="M280 250 Q300 360 320 450" stroke="#059669" strokeWidth="3" fill="none" opacity="0.7" />
        <path d="M420 230 Q400 330 430 460" stroke="#10b981" strokeWidth="2.5" fill="none" opacity="0.6" strokeDasharray="6 3" />

        {/* ORANGUTAN MOTHER & INFANT ON CANOPY BRANCH */}
        <g transform="translate(320, 150) scale(1.4)">
          {/* Mother Body */}
          <ellipse cx="30" cy="50" rx="20" ry="24" fill="#c2410c" />
          {/* Head & Cheek Pads */}
          <circle cx="30" cy="24" r="15" fill="#9a3412" />
          <ellipse cx="16" cy="24" rx="4" ry="7" fill="#7c2d12" />
          <ellipse cx="44" cy="24" rx="4" ry="7" fill="#7c2d12" />
          <circle cx="25" cy="22" r="2.5" fill="#fed7aa" />
          <circle cx="35" cy="22" r="2.5" fill="#fed7aa" />
          <ellipse cx="30" cy="30" rx="5" ry="3" fill="#fed7aa" />
          {/* Arms Grasping Branch */}
          <path d="M15 36 C5 20 -10 10 -2 0 C6 2 20 20 22 35 Z" fill="#9a3412" />
          <path d="M42 38 C55 25 70 20 75 26 C70 34 52 45 40 48 Z" fill="#c2410c" />
          {/* Infant Orangutan clinging to chest */}
          <circle cx="28" cy="46" r="8" fill="#ea580c" />
          <circle cx="28" cy="43" r="6" fill="#7c2d12" />
          <circle cx="26" cy="42" r="1.5" fill="#fed7aa" />
          <circle cx="30" cy="42" r="1.5" fill="#fed7aa" />
        </g>
        <text x="360" y="140" fill="#fdba74" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          🦧 Orangutan Kalimantan (Pongo pygmaeus)
        </text>

        {/* KOMODO DRAGON ON ROCK (Bottom Floor) */}
        <g transform="translate(480, 390) scale(1.1)">
          {/* Rock Base */}
          <path d="M-20 70 Q50 35 150 45 Q220 50 250 85 L-40 85 Z" fill="#44403c" />
          {/* Komodo Body */}
          <path d="M20 55 Q70 45 130 50 Q160 55 180 62 L180 72 Q140 65 30 70 Z" fill="#78716c" />
          {/* Reptile Head */}
          <polygon points="180,60 215,64 195,73 175,70" fill="#57534e" />
          <circle cx="195" cy="63" r="2" fill="#facc15" />
          {/* Forked Yellow Tongue */}
          <path d="M215 67 L230 67 L236 63 M230 67 L236 71" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Strong Claws */}
          <path d="M45 68 L40 80 L35 80 M120 66 L125 78 L130 78" stroke="#292524" strokeWidth="4" strokeLinecap="round" />
        </g>
        <text x="560" y="380" fill="#fef08a" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          🦎 Komodo (Varanus komodoensis)
        </text>

        {/* BOTTOM HUD */}
        <g transform="translate(30, 455)">
          <rect width="440" height="28" rx="8" fill="#022c22" stroke="#34d399" strokeWidth="1" opacity="0.95" />
          <text x="16" y="18" fill="#a7f3d0" fontSize="10" fontWeight="bold" fontFamily="monospace">
            WALLACEA EXPEDITION • BIODIVERSITAS SATWA ENDEMIK INDONESIA
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. TATA SURYA & ASTRONOMI SVG
 * Sun with solar flares, 8 elliptical planet orbits, asteroid belt, and eclipse geometry
 */
export const TataSuryaAstronomiIllustration: React.FC<ScienceSvgProps> = ({
  className = '',
  width = '100%',
  height = '100%',
}) => {
  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 800 500"
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="deepSpace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#030712" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="90%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="500" fill="url(#deepSpace)" />

        {/* TWINKLING STAR FIELD SCATTER */}
        <g fill="#ffffff">
          {[
            [40, 50, 1.2], [110, 30, 1.5], [230, 60, 1.0], [350, 40, 1.8], [480, 30, 1.2],
            [620, 55, 1.5], [740, 45, 1.0], [80, 180, 1.5], [710, 190, 1.2], [50, 320, 1.0],
            [160, 420, 1.8], [290, 450, 1.2], [450, 470, 1.5], [630, 440, 1.0], [750, 380, 1.8]
          ].map(([cx, cy, r], idx) => (
            <circle key={`star-${idx}`} cx={cx} cy={cy} r={r} opacity={0.65} />
          ))}
        </g>

        {/* 8 ELLIPTICAL CONCENTRIC ORBIT GUIDES */}
        <g stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.35">
          <ellipse cx="100" cy="250" rx="70" ry="40" />    {/* 1. Merkurius */}
          <ellipse cx="100" cy="250" rx="110" ry="60" />   {/* 2. Venus */}
          <ellipse cx="100" cy="250" rx="160" ry="90" />   {/* 3. Bumi */}
          <ellipse cx="100" cy="250" rx="210" ry="120" />  {/* 4. Mars */}
          <ellipse cx="100" cy="250" rx="310" ry="170" stroke="#f59e0b" strokeWidth="1.5" />  {/* 5. Jupiter */}
          <ellipse cx="100" cy="250" rx="410" ry="220" />  {/* 6. Saturnus */}
          <ellipse cx="100" cy="250" rx="510" ry="270" />  {/* 7. Uranus */}
          <ellipse cx="100" cy="250" rx="610" ry="320" />  {/* 8. Neptunus */}
        </g>

        {/* ASTEROID BELT (Sabuk Asteroid between Mars & Jupiter) */}
        <g stroke="#cbd5e1" strokeWidth="1" opacity="0.4">
          {Array.from({ length: 45 }).map((_, i) => {
            const angle = (i / 45) * Math.PI - Math.PI / 2;
            const rx = 260 + (i % 5) * 4;
            const ry = 145 + (i % 4) * 3;
            const x = 100 + rx * Math.cos(angle);
            const y = 250 + ry * Math.sin(angle);
            return <circle key={`ast-${i}`} cx={x} cy={y} r={(i % 3) + 1} fill="#94a3b8" />;
          })}
        </g>

        {/* SUN WITH PROMINENCES & CORONA (Left Anchor) */}
        <g transform="translate(100, 250)">
          {/* Erupting Solar Prominences / Flares */}
          <path d="M0 -60 Q20 -85 0 -95 Q-15 -80 0 -60" fill="#f97316" />
          <path d="M55 25 Q85 45 70 65 Q50 50 55 25" fill="#f97316" />
          <path d="M-55 25 Q-85 10 -75 -15 Q-50 0 -55 25" fill="#f97316" />
          {/* Sun Body */}
          <circle cx="0" cy="0" r="70" fill="url(#sunCore)" />
          <circle cx="0" cy="0" r="50" fill="#facc15" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="0" y="4" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="900" fontFamily="sans-serif">
            MATAHARI
          </text>
        </g>

        {/* 8 PLANETS RENDERED IN TRUE ORDER */}
        {/* 1. Merkurius */}
        <g transform="translate(170, 250)">
          <circle cx="0" cy="0" r="6" fill="#94a3b8" />
          <text x="0" y="15" textAnchor="middle" fill="#cbd5e1" fontSize="7" fontWeight="bold">Merkurius</text>
        </g>

        {/* 2. Venus */}
        <g transform="translate(205, 230)">
          <circle cx="0" cy="0" r="10" fill="#f59e0b" />
          <text x="0" y="20" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="bold">Venus</text>
        </g>

        {/* 3. Bumi & Bulan */}
        <g transform="translate(250, 260)">
          <circle cx="0" cy="0" r="12" fill="#3b82f6" stroke="#22c55e" strokeWidth="2" />
          <circle cx="16" cy="-6" r="3.5" fill="#e2e8f0" />
          <text x="0" y="23" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="black">Bumi</text>
        </g>

        {/* 4. Mars */}
        <g transform="translate(305, 235)">
          <circle cx="0" cy="0" r="8" fill="#ef4444" />
          <circle cx="-2" cy="-4" r="2" fill="#ffffff" />
          <text x="0" y="18" textAnchor="middle" fill="#fca5a5" fontSize="7" fontWeight="bold">Mars</text>
        </g>

        {/* 5. Jupiter (Raksasa Gas dengan Bintik Merah) */}
        <g transform="translate(390, 280)">
          <circle cx="0" cy="0" r="28" fill="#ea580c" />
          {/* Cloud Bands */}
          <ellipse cx="0" cy="-10" rx="26" ry="4" fill="#fed7aa" opacity="0.6" />
          <ellipse cx="0" cy="8" rx="27" ry="5" fill="#fdba74" opacity="0.6" />
          {/* Great Red Spot */}
          <ellipse cx="12" cy="10" rx="6" ry="4" fill="#991b1b" />
          <text x="0" y="42" textAnchor="middle" fill="#fdba74" fontSize="9" fontWeight="black">Jupiter</text>
        </g>

        {/* 6. Saturnus (Cincin Es Megah) */}
        <g transform="translate(490, 210)">
          {/* Back Ring */}
          <ellipse cx="0" cy="0" rx="42" ry="12" stroke="#fde047" strokeWidth="5" fill="none" transform="rotate(-20)" opacity="0.7" />
          {/* Planet Body */}
          <circle cx="0" cy="0" r="20" fill="#eab308" />
          {/* Front Ring */}
          <path d="M-38 12 C-20 20 20 10 38 -2" stroke="#fde047" strokeWidth="5" fill="none" transform="rotate(-20)" />
          <text x="0" y="36" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="black">Saturnus</text>
        </g>

        {/* 7. Uranus */}
        <g transform="translate(585, 290)">
          <circle cx="0" cy="0" r="15" fill="#67e8f9" />
          <ellipse cx="0" cy="0" rx="22" ry="4" stroke="#a5f3fc" strokeWidth="1.5" fill="none" transform="rotate(80)" opacity="0.8" />
          <text x="0" y="27" textAnchor="middle" fill="#cffafe" fontSize="8" fontWeight="bold">Uranus</text>
        </g>

        {/* 8. Neptunus */}
        <g transform="translate(680, 220)">
          <circle cx="0" cy="0" r="14" fill="#2563eb" />
          <ellipse cx="0" cy="-4" rx="12" ry="2.5" fill="#60a5fa" opacity="0.5" />
          <text x="0" y="25" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">Neptunus</text>
        </g>

        {/* ECLIPSE GEOMETRY SUB-PANEL (Top Right) */}
        <g transform="translate(520, 30)">
          <rect width="250" height="95" rx="12" fill="#0f172a" stroke="#7c3aed" strokeWidth="1.5" opacity="0.9" />
          <text x="15" y="22" fill="#e9d5ff" fontSize="9" fontWeight="black" fontFamily="sans-serif">
            GEOMETRI GERHANA MATAHARI TOTAL
          </text>
          {/* Mini Sun */}
          <circle cx="35" cy="55" r="14" fill="#facc15" />
          {/* Light Rays */}
          <polygon points="49,46 120,53 120,57 49,64" fill="#fef08a" opacity="0.25" />
          <polygon points="49,46 180,48 180,62 49,64" fill="#fef08a" opacity="0.15" />
          {/* Mini Moon */}
          <circle cx="120" cy="55" r="5" fill="#64748b" />
          {/* Umbra Cone to Earth */}
          <polygon points="120,53 180,55 120,57" fill="#000000" opacity="0.8" />
          {/* Mini Earth */}
          <circle cx="180" cy="55" r="11" fill="#3b82f6" />
          <text x="15" y="82" fill="#cbd5e1" fontSize="7" fontFamily="sans-serif">
            Matahari → Bulan (Penghalang) → Bumi (Umbra)
          </text>
        </g>

        {/* BOTTOM HUD STATUS */}
        <g transform="translate(30, 455)">
          <rect width="480" height="28" rx="8" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1" opacity="0.9" />
          <text x="16" y="18" fill="#e9d5ff" fontSize="10" fontWeight="bold" fontFamily="monospace">
            ORBIT 8 PLANET TATA SURYA • GRAVITASI SEMESTA &amp; MEKANIKA GERHANA
          </text>
        </g>
      </svg>
    </div>
  );
};
