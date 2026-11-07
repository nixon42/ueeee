import React from 'react';
import { PresentationThemeKey } from '@/lib/presentation-themes';

export interface LabCanvasBackgroundProps {
  theme?: PresentationThemeKey;
  className?: string;
}

export const LabCanvasBackground: React.FC<LabCanvasBackgroundProps> = ({
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
            @keyframes labBubbleRise1 {
              0% { transform: translateY(0) translateX(0); opacity: 0; }
              20% { opacity: 0.75; }
              80% { opacity: 0.5; }
              100% { transform: translateY(-180px) translateX(25px); opacity: 0; }
            }
            @keyframes labBubbleRise2 {
              0% { transform: translateY(0) translateX(0); opacity: 0; }
              25% { opacity: 0.85; }
              75% { opacity: 0.45; }
              100% { transform: translateY(-220px) translateX(-20px); opacity: 0; }
            }
            @keyframes labBubbleRise3 {
              0% { transform: translateY(0) translateX(0); opacity: 0; }
              30% { opacity: 0.8; }
              70% { opacity: 0.5; }
              100% { transform: translateY(-160px) translateX(15px); opacity: 0; }
            }
            @keyframes cleanroomScanner {
              0% { transform: translateY(0); opacity: 0.15; }
              50% { transform: translateY(350px); opacity: 0.45; }
              100% { transform: translateY(0); opacity: 0.15; }
            }
            @keyframes molecularPulse {
              0%, 100% { opacity: 0.12; transform: scale(1); }
              50% { opacity: 0.28; transform: scale(1.02); }
            }
            @keyframes chemicalGlow {
              0%, 100% { opacity: 0.25; }
              50% { opacity: 0.55; }
            }

            .anim-lab-bubble-1 {
              animation: labBubbleRise1 7s ease-in-out infinite;
            }
            .anim-lab-bubble-2 {
              animation: labBubbleRise2 9s ease-in-out infinite 2.5s;
            }
            .anim-lab-bubble-3 {
              animation: labBubbleRise3 6s ease-in-out infinite 1.2s;
            }
            .anim-lab-scanner {
              animation: cleanroomScanner 12s ease-in-out infinite;
            }
            .anim-molecular {
              animation: molecularPulse 6s ease-in-out infinite;
              transform-origin: 600px 400px;
            }
            .anim-chem-glow {
              animation: chemicalGlow 4s ease-in-out infinite;
            }
          `}</style>

          {/* Cleanroom Subtle Tech Gradients (High legibility for content) */}
          <linearGradient id="labBgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0fdfa" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#e6fffa" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.5" />
          </linearGradient>

          <radialGradient id="reactorCoreGlow" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="scannerBeamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="beakerFluidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5eead4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.15" />
          </linearGradient>

          {/* Molecular Hexagon Pattern */}
          <pattern id="hexPattern" width="40" height="69.282" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 20 11.547 L 0 0 L 0 23.094 L 20 34.641 L 40 23.094 Z M 0 34.641 L 20 46.188 L 0 57.735 L 0 80.829 L 20 92.376 L 40 80.829 L 40 57.735 L 20 46.188 Z"
              stroke="#0d9488"
              strokeWidth="0.8"
              fill="none"
              strokeOpacity="0.09"
            />
          </pattern>
        </defs>

        {/* 1. CLEANROOM LIGHTING BASE */}
        <rect width="1200" height="800" fill="url(#labBgGrad)" />

        {/* 2. AMBIENT REACTOR CORE GLOW */}
        <circle cx="600" cy="240" r="380" fill="url(#reactorCoreGlow)" />

        {/* 3. MOLECULAR HEXAGONAL MATRIX */}
        <rect width="1200" height="800" fill="url(#hexPattern)" className="anim-molecular" />

        {/* 4. CLEANROOM DIGITAL CALIBRATION GRID */}
        <g stroke="#0f766e" strokeWidth="0.6" strokeDasharray="3 9" opacity="0.18">
          <line x1="100" y1="0" x2="100" y2="800" />
          <line x1="300" y1="0" x2="300" y2="800" />
          <line x1="600" y1="0" x2="600" y2="800" />
          <line x1="900" y1="0" x2="900" y2="800" />
          <line x1="1100" y1="0" x2="1100" y2="800" />
          <line x1="0" y1="120" x2="1200" y2="120" />
          <line x1="0" y1="280" x2="1200" y2="280" />
          <line x1="0" y1="460" x2="1200" y2="460" />
          <line x1="0" y1="640" x2="1200" y2="640" />
        </g>

        {/* 5. TACTICAL CLEANROOM HUD ACCENTS & APPARATUS LABELS */}
        <g fill="#0f766e" opacity="0.32" fontSize="9" fontFamily="monospace" fontWeight="bold">
          {/* Top Left Bio-Safety Status */}
          <text x="35" y="45">LAB UNIT-04 // FORENSIC BIO-CHEM</text>
          <text x="35" y="60">AIRFLOW: LAMINAR HOOD 99.98% HEPA</text>
          <path d="M 30 25 L 180 25 L 180 28 L 30 28 Z" fill="#14b8a6" />

          {/* Top Right Neutralization Monitor */}
          <text x="980" y="45">BUFFER pH STATUS: TARGET 7.00</text>
          <text x="980" y="60">TITRATION SENSOR: CALIBRATED</text>
          <path d="M 975 25 L 1170 25 L 1170 28 L 975 28 Z" fill="#14b8a6" />

          {/* Bottom Left Apparatus HUD */}
          <text x="35" y="760">K3 COMPLIANCE: GHS PIC 05/06/07</text>
          <text x="35" y="775">SPECTROMETRY: 540nm EMISSION</text>
        </g>

        {/* 6. CORNER TACTICAL BRACKETS */}
        <g stroke="#0d9488" strokeWidth="2.5" fill="none" opacity="0.35">
          {/* Top Left */}
          <path d="M 20 50 L 20 20 L 50 20" />
          {/* Top Right */}
          <path d="M 1150 20 L 1180 20 L 1180 50" />
          {/* Bottom Left */}
          <path d="M 20 750 L 20 780 L 50 780" />
          {/* Bottom Right */}
          <path d="M 1150 780 L 1180 780 L 1180 750" />
        </g>

        {/* 7. SCANNER BEAM SWEEPING VERTICALLY */}
        <g className="anim-lab-scanner">
          <rect x="0" y="180" width="1200" height="4" fill="url(#scannerBeamGrad)" />
          <line x1="0" y1="182" x2="1200" y2="182" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="12 8" opacity="0.6" />
        </g>

        {/* 8. WATERMARK VOLUMETRIC GLASSWARE SILHOUETTE (BOTTOM LEFT) */}
        <g transform="translate(40, 520)" opacity="0.2">
          {/* Erlenmeyer Flask Outline */}
          <path
            d="M 60 40 L 60 90 L 15 220 C 10 232 18 240 30 240 L 150 240 C 162 240 170 232 165 220 L 120 90 L 120 40 Z"
            fill="url(#beakerFluidGrad)"
            stroke="#0d9488"
            strokeWidth="2.5"
          />
          {/* Graduations */}
          <line x1="68" y1="130" x2="95" y2="130" stroke="#0d9488" strokeWidth="2" />
          <line x1="60" y1="160" x2="95" y2="160" stroke="#0d9488" strokeWidth="2" />
          <line x1="50" y1="190" x2="95" y2="190" stroke="#0d9488" strokeWidth="2" />
          {/* Fluid Surface */}
          <ellipse cx="90" cy="110" rx="36" ry="6" fill="#5eead4" opacity="0.6" />
        </g>

        {/* 9. WATERMARK BURETTE & RETORT STAND (BOTTOM RIGHT) */}
        <g transform="translate(1060, 480)" opacity="0.22">
          {/* Retort Rod */}
          <rect x="70" y="30" width="6" height="260" rx="3" fill="#0f766e" />
          <rect x="30" y="280" width="85" height="12" rx="4" fill="#0f766e" />
          {/* Burette Tube */}
          <rect x="35" y="50" width="16" height="180" rx="2" fill="url(#beakerFluidGrad)" stroke="#0d9488" strokeWidth="2" />
          <polygon points="38,230 48,230 43,248" fill="#0d9488" />
          {/* Stopcock */}
          <rect x="32" y="222" width="22" height="5" rx="2" fill="#083344" />
        </g>

        {/* 10. EFFERVESCENT TITRATION BUBBLE PARTICLES */}
        <g className="anim-lab-bubble-1">
          <circle cx="120" cy="680" r="3.5" fill="#2dd4bf" />
          <circle cx="150" cy="710" r="2.5" fill="#5eead4" />
          <circle cx="480" cy="650" r="4" fill="#14b8a6" />
          <circle cx="820" cy="690" r="3" fill="#2dd4bf" />
          <circle cx="1080" cy="660" r="4.5" fill="#5eead4" />
        </g>
        <g className="anim-lab-bubble-2">
          <circle cx="180" cy="630" r="4" fill="#14b8a6" />
          <circle cx="340" cy="670" r="3" fill="#2dd4bf" />
          <circle cx="640" cy="700" r="4.5" fill="#5eead4" />
          <circle cx="920" cy="640" r="3.5" fill="#14b8a6" />
          <circle cx="1120" cy="690" r="2.5" fill="#2dd4bf" />
        </g>
        <g className="anim-lab-bubble-3">
          <circle cx="90" cy="650" r="2" fill="#5eead4" />
          <circle cx="260" cy="690" r="3.5" fill="#14b8a6" />
          <circle cx="750" cy="660" r="2.5" fill="#2dd4bf" />
          <circle cx="1020" cy="680" r="4" fill="#5eead4" />
        </g>

        {/* 11. FLOATING ION PARTICLES (H+ & OH- EQUILIBRIUM) */}
        <g opacity="0.35" className="anim-chem-glow" fontFamily="monospace" fontWeight="900" fontSize="12" fill="#0d9488">
          <text x="210" y="320">H⁺</text>
          <text x="380" y="240">OH⁻</text>
          <text x="780" y="310">H₂O</text>
          <text x="960" y="220">pH 7.0</text>
          <text x="540" y="160">⇌</text>
        </g>
      </svg>
    </div>
  );
};
