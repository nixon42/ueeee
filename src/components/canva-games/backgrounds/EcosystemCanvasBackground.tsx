import React from 'react';
import { PresentationThemeKey } from '@/lib/presentation-themes';

export interface EcosystemCanvasBackgroundProps {
  theme?: PresentationThemeKey;
  className?: string;
}

export const EcosystemCanvasBackground: React.FC<EcosystemCanvasBackgroundProps> = ({
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
            @keyframes driftCloudsLeft {
              0% { transform: translateX(0); }
              100% { transform: translateX(200px); }
            }
            @keyframes driftCloudsRight {
              0% { transform: translateX(0); }
              100% { transform: translateX(-160px); }
            }
            @keyframes sunbeamPulse {
              0%, 100% { opacity: 0.18; transform: rotate(0deg); }
              50% { opacity: 0.35; transform: rotate(1.5deg); }
            }
            @keyframes foliageSwayLeft {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-2.5deg); }
            }
            @keyframes foliageSwayRight {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(3deg); }
            }
            @keyframes riverShimmer {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -60; }
            }
            @keyframes pollenRise1 {
              0% { transform: translateY(0) translateX(0); opacity: 0; }
              20% { opacity: 0.8; }
              80% { opacity: 0.6; }
              100% { transform: translateY(-140px) translateX(30px); opacity: 0; }
            }
            @keyframes pollenRise2 {
              0% { transform: translateY(0) translateX(0); opacity: 0; }
              25% { opacity: 0.9; }
              75% { opacity: 0.5; }
              100% { transform: translateY(-160px) translateX(-25px); opacity: 0; }
            }

            .anim-cloud-1 {
              animation: driftCloudsLeft 45s ease-in-out infinite alternate;
            }
            .anim-cloud-2 {
              animation: driftCloudsRight 38s ease-in-out infinite alternate;
            }
            .anim-sunbeam {
              animation: sunbeamPulse 8s ease-in-out infinite;
              transform-origin: 200px 50px;
            }
            .anim-foliage-left {
              animation: foliageSwayLeft 7s ease-in-out infinite;
              transform-origin: 0px 800px;
            }
            .anim-foliage-right {
              animation: foliageSwayRight 8.5s ease-in-out infinite;
              transform-origin: 1200px 800px;
            }
            .anim-river {
              animation: riverShimmer 4s linear infinite;
            }
            .anim-pollen-1 {
              animation: pollenRise1 9s ease-in-out infinite;
            }
            .anim-pollen-2 {
              animation: pollenRise2 11s ease-in-out infinite 3s;
            }
          `}</style>

          {/* GRADIENTS */}
          <linearGradient id="ecoSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#d1fae5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="ecoMountainFar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="ecoMountainMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="ecoCanopy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="ecoRiver" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.45" />
          </linearGradient>

          <radialGradient id="ecoSunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#fde047" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. SKY BASE */}
        <rect width="1200" height="800" fill="url(#ecoSkyGrad)" />

        {/* 2. MORNING SUN GLOW & BEAMS IN LEMBAH CENDRAWASIH */}
        <circle cx="220" cy="90" r="140" fill="url(#ecoSunGlow)" />
        <g className="anim-sunbeam">
          {/* Diagonal God Rays Filtering Through Canopy */}
          <polygon points="220,90 80,800 240,800" fill="#fef08a" opacity="0.12" />
          <polygon points="220,90 380,800 520,800" fill="#fef08a" opacity="0.15" />
          <polygon points="220,90 680,800 800,800" fill="#fef9c3" opacity="0.08" />
        </g>

        {/* 3. DRIFTING CUMULUS CLOUDS */}
        <g className="anim-cloud-1" opacity="0.45">
          <path
            d="M180 130 Q150 130 140 110 Q130 90 155 75 Q170 50 205 55 Q235 40 265 55 Q285 45 305 65 Q325 80 315 105 Q320 130 290 130 Z"
            fill="#ffffff"
          />
        </g>
        <g className="anim-cloud-2" opacity="0.35">
          <path
            d="M820 160 Q790 160 780 140 Q770 120 795 105 Q810 80 845 85 Q875 70 905 85 Q925 75 945 95 Q965 110 955 135 Q960 160 930 160 Z"
            fill="#ffffff"
          />
        </g>

        {/* 4. DISTANT MISTY MOUNTAINS (Lembah Cendrawasih Ridges) */}
        <path
          d="M0 450 L180 260 L380 430 L540 290 L760 460 L980 240 L1200 410 L1200 800 L0 800 Z"
          fill="url(#ecoMountainFar)"
        />

        {/* 5. MIDGROUND MOUNTAINS & WATERFALL SOURCE */}
        <path
          d="M0 540 L220 380 L440 510 L680 340 L880 490 L1100 370 L1200 450 L1200 800 L0 800 Z"
          fill="url(#ecoMountainMid)"
        />

        {/* Sparkling Mountain Waterfall from ridge into valley */}
        <path d="M680 340 L675 520 L685 520 Z" fill="#e0f2fe" opacity="0.5" />
        <ellipse cx="680" cy="520" rx="14" ry="4" fill="#bae6fd" opacity="0.4" />

        {/* 6. MEANDERING RIVER (Aliran Lembah Cendrawasih) */}
        <path
          d="M680 520 C640 580 720 630 660 700 C620 740 540 760 480 800 L590 800 C660 760 760 720 730 640 C710 590 730 550 710 520 Z"
          fill="url(#ecoRiver)"
        />
        {/* Animated River Flow Lines */}
        <g stroke="#ffffff" strokeWidth="2" strokeDasharray="16 12" opacity="0.3" className="anim-river">
          <path d="M680 525 C645 580 715 630 665 700 C625 740 555 760 500 800" fill="none" />
          <path d="M700 535 C665 590 735 640 685 710 C645 750 575 770 520 800" fill="none" />
        </g>

        {/* 7. LUSH TROPICAL RAINFOREST CANOPY (Fore-Midground) */}
        <g fill="url(#ecoCanopy)">
          {/* Canopy Bumps / Forest Crowns */}
          <path d="M0 640 Q80 580 160 630 Q240 560 340 620 Q440 550 560 640 L560 800 L0 800 Z" />
          <path d="M720 650 Q820 570 940 630 Q1060 560 1200 620 L1200 800 L720 800 Z" />
        </g>

        {/* 8. FOREGROUND SWAYING FOLIAGE SILHOUETTES */}
        {/* Left Giant Fern & Canopy Fronds */}
        <g className="anim-foliage-left" opacity="0.28">
          {/* Trunk */}
          <path d="M0 800 C40 740 60 670 70 590" stroke="#065f46" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Palm Fronds */}
          <path d="M70 590 Q120 550 190 570 Q140 580 70 590" fill="#047857" />
          <path d="M70 590 Q110 520 160 510 Q120 540 70 590" fill="#059669" />
          <path d="M70 590 Q70 500 110 470 Q90 520 70 590" fill="#10b981" />
          <path d="M70 590 Q30 520 10 490 Q40 535 70 590" fill="#047857" />
        </g>

        {/* Right Tropical Tree & Vine Fronds */}
        <g className="anim-foliage-right" opacity="0.25">
          {/* Trunk */}
          <path d="M1200 800 C1160 730 1140 660 1120 570" stroke="#065f46" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Palm Fronds */}
          <path d="M1120 570 Q1050 540 980 560 Q1040 575 1120 570" fill="#047857" />
          <path d="M1120 570 Q1070 510 1010 500 Q1060 535 1120 570" fill="#059669" />
          <path d="M1120 570 Q1120 490 1070 460 Q1100 515 1120 570" fill="#10b981" />
        </g>

        {/* 9. FLOATING NATURE SPORES / GOLDEN POLLEN PARTICLES */}
        <g className="anim-pollen-1">
          <circle cx="280" cy="620" r="3" fill="#fef08a" opacity="0.75" />
          <circle cx="420" cy="680" r="2.5" fill="#facc15" opacity="0.6" />
          <circle cx="610" cy="640" r="3.5" fill="#fef08a" opacity="0.8" />
          <circle cx="820" cy="670" r="2" fill="#86efac" opacity="0.7" />
          <circle cx="980" cy="630" r="3" fill="#fef08a" opacity="0.65" />
        </g>
        <g className="anim-pollen-2">
          <circle cx="340" cy="580" r="2.5" fill="#facc15" opacity="0.7" />
          <circle cx="510" cy="610" r="3" fill="#86efac" opacity="0.65" />
          <circle cx="730" cy="590" r="2" fill="#fef08a" opacity="0.8" />
          <circle cx="890" cy="600" r="3" fill="#facc15" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
};
