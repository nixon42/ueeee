import React from 'react';
import { HumanitiesSvgProps } from '@/types/presentation';

/**
 * 2. BOROBUDUR KOSMOLOGI, PERAHU CADIK & PASAK ANDESIT SVG
 * 3 Cosmological strata, double-outrigger maritime vessel, and interlocking andesite joints
 */
export const BorobudurKosmologiIllustration: React.FC<HumanitiesSvgProps> = ({
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
          <linearGradient id="candiDawnSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#042f2e" />
            <stop offset="40%" stopColor="#1e1b4b" />
            <stop offset="80%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="stupaAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#042f2e" stopOpacity="0" />
          </radialGradient>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
          </marker>
        </defs>

        {/* DAWN SKY & BUKIT MENOREH SILHOUETTE */}
        <rect width="800" height="500" fill="url(#candiDawnSky)" />
        <path d="M0 260 Q120 180 260 210 Q420 150 560 190 Q710 140 800 180 L800 500 L0 500 Z" fill="#064e3b" opacity="0.4" />
        <path d="M0 300 Q150 240 320 270 Q480 220 620 260 Q730 230 800 270 L800 500 L0 500 Z" fill="#134e4a" opacity="0.5" />

        {/* BOROBUDUR TEMPLE ELEVATION CROSS-SECTION (Center-Left Anchor) */}
        <g transform="translate(60, 100)">
          {/* Divine Stupa Aura Glow */}
          <circle cx="260" cy="40" r="70" fill="url(#stupaAura)" />

          {/* Stupa Induk Puncak (Arupadhatu Peak) */}
          <path d="M250 40 L260 0 L270 40 L285 65 C285 85 235 85 235 65 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          {/* Pin Phallus Spire */}
          <line x1="260" y1="0" x2="260" y2="-18" stroke="#fef08a" strokeWidth="3" />

          {/* Tier 3: ARUPADHATU (3 Circular Terraces with 72 Perforated Stupas) */}
          <ellipse cx="260" cy="85" rx="75" ry="12" fill="#57534e" stroke="#78716c" strokeWidth="2" />
          <ellipse cx="260" cy="105" rx="105" ry="14" fill="#44403c" stroke="#78716c" strokeWidth="2" />
          <ellipse cx="260" cy="128" rx="140" ry="16" fill="#3c3836" stroke="#78716c" strokeWidth="2" />
          {/* Miniature Stupas on Terraces */}
          {[-80, -40, 0, 40, 80].map((dx, i) => (
            <path key={`mstupa-${i}`} d={`M${260 + dx - 8} 120 C${260 + dx - 8} 105 ${260 + dx + 8} 105 ${260 + dx + 8} 120 Z`} fill="#a8a29e" stroke="#292524" strokeWidth="1" />
          ))}

          {/* Tier 2: RUPADHATU (4 Square Stepped Terraces with Relief Galleries) */}
          <rect x="70" y="145" width="380" height="26" fill="#292524" stroke="#78716c" strokeWidth="2" />
          <rect x="50" y="172" width="420" height="26" fill="#1c1917" stroke="#78716c" strokeWidth="2" />
          <rect x="30" y="199" width="460" height="26" fill="#292524" stroke="#78716c" strokeWidth="2" />
          <rect x="10" y="226" width="500" height="26" fill="#1c1917" stroke="#78716c" strokeWidth="2" />
          {/* Niches / Arches on Rupadhatu Galleried Walls */}
          {Array.from({ length: 9 }).map((_, ni) => (
            <g key={`niche-${ni}`} transform={`translate(${45 + ni * 48}, 176)`}>
              <rect x="0" y="0" width="18" height="18" rx="4" fill="#0c0a09" stroke="#d97706" strokeWidth="1" />
              <circle cx="9" cy="8" r="4" fill="#facc15" />
            </g>
          ))}

          {/* Tier 1: KAMADHATU (Basement / Base Terrace, 160 Karmawibhangga Reliefs) */}
          <rect x="-10" y="253" width="540" height="34" fill="#0c0a09" stroke="#78716c" strokeWidth="2.5" />
          <text x="260" y="275" textAnchor="middle" fill="#d6d3d1" fontSize="10" fontWeight="black" fontFamily="sans-serif">
            KAMADHATU: KAKI CANDI TERTUTUP (160 RELIEF HUKUM KARMAPHALA)
          </text>
        </g>

        {/* BRACKET CALLOUTS FOR THE 3 STRATA */}
        <g transform="translate(15, 90)">
          {/* Arupadhatu Bracket */}
          <line x1="15" y1="10" x2="35" y2="10" stroke="#facc15" strokeWidth="2" />
          <line x1="15" y1="10" x2="15" y2="120" stroke="#facc15" strokeWidth="2" />
          <line x1="15" y1="120" x2="35" y2="120" stroke="#facc15" strokeWidth="2" />
          <text x="2" y="70" fill="#fef08a" fontSize="9" fontWeight="black" transform="rotate(-90 2 70)">
            ARUPADHATU (NIRWANA)
          </text>

          {/* Rupadhatu Bracket */}
          <line x1="15" y1="145" x2="35" y2="145" stroke="#38bdf8" strokeWidth="2" />
          <line x1="15" y1="145" x2="15" y2="250" stroke="#38bdf8" strokeWidth="2" />
          <line x1="15" y1="250" x2="35" y2="250" stroke="#38bdf8" strokeWidth="2" />
          <text x="2" y="200" fill="#7dd3fc" fontSize="9" fontWeight="black" transform="rotate(-90 2 200)">
            RUPADHATU (BERWUJUD)
          </text>
        </g>

        {/* RIGHT PANEL: RELIEF PERAHU LAYAR CADIK GANDA & MARITIM */}
        <g transform="translate(540, 50)">
          <rect width="230" height="180" rx="14" fill="#0f172a" stroke="#d97706" strokeWidth="2" opacity="0.95" />
          <text x="16" y="24" fill="#fbbf24" fontSize="11" fontWeight="black" fontFamily="sans-serif">
            RELIEF PERAHU CADIK GANDA
          </text>
          <text x="16" y="38" fill="#94a3b8" fontSize="8">Bukti Kemaritiman Nusantara Abad ke-8</text>

          {/* Double Outrigger Ship Vector */}
          <g transform="translate(115, 115) scale(0.9)">
            {/* Ocean Waves */}
            <path d="M-80 30 Q-60 20 -40 30 Q-20 40 0 30 Q20 20 40 30 Q60 40 80 30" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
            <path d="M-90 40 Q-70 30 -50 40 Q-30 50 -10 40 Q10 30 30 40 Q50 50 70 40" stroke="#0284c7" strokeWidth="2" fill="none" />

            {/* Boat Wooden Hull */}
            <path d="M-65 15 C-40 28 35 28 65 10 L55 24 C25 35 -30 35 -60 22 Z" fill="#78350f" stroke="#b45309" strokeWidth="1.5" />
            {/* Stern & Bow Sweeps */}
            <path d="M-65 15 Q-75 -5 -80 -15" stroke="#78350f" strokeWidth="3" fill="none" />
            <path d="M65 10 Q78 -5 85 -10" stroke="#78350f" strokeWidth="3" fill="none" />

            {/* Twin Masts (Tiang Layar Ganda) */}
            <line x1="-20" y1="18" x2="-20" y2="-45" stroke="#d97706" strokeWidth="3" />
            <line x1="20" y1="15" x2="20" y2="-42" stroke="#d97706" strokeWidth="3" />

            {/* Rectangular Tanja Sails (Layar Tanja Miring Khas Nusantara) */}
            <polygon points="-35,-42 -5,-46 0,-10 -30,-8" fill="#fef08a" opacity="0.9" stroke="#ca8a04" strokeWidth="1" />
            <polygon points="5,-38 35,-42 40,-8 10,-6" fill="#fef08a" opacity="0.9" stroke="#ca8a04" strokeWidth="1" />

            {/* Bamboo Outriggers (Cadik Penyeimbang Ombak) */}
            <line x1="-55" y1="20" x2="-35" y2="35" stroke="#ca8a04" strokeWidth="2.5" />
            <line x1="35" y1="18" x2="55" y2="32" stroke="#ca8a04" strokeWidth="2.5" />
            <rect x="-65" y="33" width="130" height="5" rx="2.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
          </g>
          <text x="16" y="165" fill="#38bdf8" fontSize="8" fontFamily="monospace">Jalur Kayu Manis • Samudra Hindia ke Afrika</text>
        </g>

        {/* BOTTOM-RIGHT PANEL: TEKNOLOGI PASAK ANDESIT TAHAN GEMPA */}
        <g transform="translate(540, 245)">
          <rect width="230" height="150" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" opacity="0.95" />
          <text x="16" y="24" fill="#34d399" fontSize="11" fontWeight="black" fontFamily="sans-serif">
            PASAK BATU ANDESIT T-JOINT
          </text>
          <text x="16" y="38" fill="#94a3b8" fontSize="8">Konstruksi Purba Tanpa Perekat Semen</text>

          {/* Interlocking Mortise and Tenon Cutaway */}
          <g transform="translate(35, 55)">
            {/* Stone Block A (Left with Tenon Tongue) */}
            <path d="M0 0 L60 0 L60 20 L80 20 L80 40 L60 40 L60 60 L0 60 Z" fill="#57534e" stroke="#a8a29e" strokeWidth="2" />
            <text x="25" y="35" fill="#f5f5f4" fontSize="9" fontWeight="bold">Batu A</text>

            {/* Stone Block B (Right with Mortise Slot) */}
            <path d="M145 0 L85 0 L85 20 L65 20 L65 40 L85 40 L85 60 L145 60 Z" fill="#44403c" stroke="#a8a29e" strokeWidth="2" />
            <text x="105" y="35" fill="#f5f5f4" fontSize="9" fontWeight="bold">Batu B</text>

            {/* Vibration Absorption Kinetic Arrows */}
            <path d="M40 70 L55 70" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M105 70 L90 70" stroke="#34d399" strokeWidth="2" />
          </g>
          <text x="16" y="136" fill="#a7f3d0" fontSize="8" fontFamily="monospace">Fleksibel menyerap gempa &gt; 1.000 tahun</text>
        </g>

        {/* BOTTOM HUD STATUS */}
        <g transform="translate(30, 455)">
          <rect width="520" height="28" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" opacity="0.95" />
          <text x="16" y="18" fill="#fef08a" fontSize="10" fontWeight="bold" fontFamily="monospace">
            WARISAN CANDI BOROBUDUR • STRATA KOSMOLOGI, PERAHU CADIK &amp; PASAK ANDESIT
          </text>
        </g>
      </svg>
    </div>
  );
};


export { BorobudurKosmologiIllustration as SejarahBorobudurIllustration };
