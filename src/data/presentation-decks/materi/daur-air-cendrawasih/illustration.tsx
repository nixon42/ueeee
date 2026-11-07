import React from 'react';
import { ScienceSvgProps } from '@/types/presentation';

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
            {/* High-contrast badge container for Stomata label */}
            <g transform="translate(0, 58)">
              <rect
                x="-52"
                y="-9"
                width="104"
                height="18"
                rx="9"
                fill="#022c22"
                stroke="#4ade80"
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="7.5"
                fontWeight="900"
                letterSpacing="0.04em"
              >
                STOMATA (PORI DAUN)
              </text>
            </g>
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

export { FotosintesisDaurAirIllustration as DaurAirIllustration };
