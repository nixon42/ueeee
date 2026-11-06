import React from 'react';
import { ScienceSvgProps } from '@/types/presentation';

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


export { SatwaEndemikHutanIllustration as PointClickHutanIllustration };
