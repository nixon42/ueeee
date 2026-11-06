import React from 'react';

export interface HumanitiesSvgProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

/**
 * 1. GEOMETRI & PECAHAN SENILAI SVG
 * Golden suspension bridge with linear fraction blocks, pie chart cuts, and 2D geometry formulas
 */
export const GeometriPecahanIllustration: React.FC<HumanitiesSvgProps> = ({
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
          <linearGradient id="mathSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="60%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="bridgeGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="canyonGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>
        </defs>

        {/* BACKGROUND BLUEPRINT GRID */}
        <rect width="800" height="500" fill="url(#mathSkyGrad)" />
        <g stroke="#38bdf8" strokeWidth="0.7" opacity="0.12">
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} />
          ))}
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" />
          ))}
        </g>

        {/* CANYON PROFILE (Jurang Seratus Petak) */}
        <path d="M0 320 Q120 300 160 360 Q180 440 220 500 L0 500 Z" fill="url(#canyonGrad)" />
        <path d="M800 320 Q680 300 640 360 Q620 440 580 500 L800 500 Z" fill="url(#canyonGrad)" />

        {/* SUSPENSION BRIDGE TOWERS (Menara Jembatan Emas) */}
        {/* Left Tower */}
        <g transform="translate(160, 100)">
          <rect x="-8" y="0" width="16" height="250" fill="url(#bridgeGold)" />
          <rect x="24" y="0" width="16" height="250" fill="url(#bridgeGold)" />
          <line x1="-8" y1="30" x2="40" y2="30" stroke="#fef08a" strokeWidth="4" />
          <line x1="-8" y1="90" x2="40" y2="90" stroke="#fef08a" strokeWidth="4" />
          <line x1="-8" y1="160" x2="40" y2="160" stroke="#fef08a" strokeWidth="4" />
          {/* X-Braces */}
          <line x1="-6" y1="32" x2="38" y2="88" stroke="#d97706" strokeWidth="2.5" />
          <line x1="38" y1="32" x2="-6" y2="88" stroke="#d97706" strokeWidth="2.5" />
          <line x1="-6" y1="92" x2="38" y2="158" stroke="#d97706" strokeWidth="2.5" />
          <line x1="38" y1="92" x2="-6" y2="158" stroke="#d97706" strokeWidth="2.5" />
        </g>
        {/* Right Tower */}
        <g transform="translate(600, 100)">
          <rect x="-8" y="0" width="16" height="250" fill="url(#bridgeGold)" />
          <rect x="24" y="0" width="16" height="250" fill="url(#bridgeGold)" />
          <line x1="-8" y1="30" x2="40" y2="30" stroke="#fef08a" strokeWidth="4" />
          <line x1="-8" y1="90" x2="40" y2="90" stroke="#fef08a" strokeWidth="4" />
          <line x1="-8" y1="160" x2="40" y2="160" stroke="#fef08a" strokeWidth="4" />
          <line x1="-6" y1="32" x2="38" y2="88" stroke="#d97706" strokeWidth="2.5" />
          <line x1="38" y1="32" x2="-6" y2="88" stroke="#d97706" strokeWidth="2.5" />
          <line x1="-6" y1="92" x2="38" y2="158" stroke="#d97706" strokeWidth="2.5" />
          <line x1="38" y1="92" x2="-6" y2="158" stroke="#d97706" strokeWidth="2.5" />
        </g>

        {/* MAIN CATENARY SUSPENSION CABLES */}
        <path d="M40 240 Q170 110 390 230 Q610 110 760 240" stroke="#fef08a" strokeWidth="4.5" fill="none" />
        {/* Vertical Suspender Rods */}
        {[200, 230, 260, 290, 320, 350, 380, 410, 440, 470, 500, 530, 560, 590].map((x, idx) => {
          const dy = 260 - Math.sin(((x - 170) / 440) * Math.PI) * 45;
          return <line key={`stay-${idx}`} x1={x} y1={dy} x2={x} y2="260" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />;
        })}

        {/* BRIDGE ROADBED DECK (Gelagar Jembatan) */}
        <rect x="30" y="260" width="740" height="18" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />

        {/* 5 LINEAR FRACTION STEPPING BLOCKS ON BRIDGE DECK */}
        <g transform="translate(180, 262)">
          {[
            { id: 'b1', label: '1/5 (0.20)', width: 80, color: '#f59e0b' },
            { id: 'b2', label: '1/3 (0.33)', width: 82, color: '#3b82f6' },
            { id: 'b3', label: '1/2 (0.50)', width: 88, color: '#10b981' },
            { id: 'b4', label: '3/4 (0.75)', width: 92, color: '#8b5cf6' },
            { id: 'b5', label: '9/10 (0.90)', width: 98, color: '#ec4899' },
          ].map((b, idx) => {
            const xOffset = idx * 88;
            return (
              <g key={`fblock-${idx}`} transform={`translate(${xOffset}, 0)`}>
                <rect width={b.width} height="14" rx="3" fill={b.color} opacity="0.95" />
                <text x={b.width / 2} y="11" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="black" fontFamily="monospace">
                  {b.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* TOP-LEFT PANEL: PECAHAN SENILAI BAR BREAKDOWN */}
        <g transform="translate(35, 30)">
          <rect width="210" height="150" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" opacity="0.95" />
          <text x="15" y="22" fill="#38bdf8" fontSize="10" fontWeight="black" fontFamily="sans-serif">
            HIERARKI PECAHAN SENILAI
          </text>
          {/* Unit 1 */}
          <rect x="15" y="35" width="180" height="18" rx="3" fill="#0284c7" />
          <text x="105" y="48" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">1 UTUH (1.00 = 100%)</text>
          {/* Half 1/2 */}
          <rect x="15" y="58" width="88" height="18" rx="3" fill="#10b981" />
          <text x="59" y="71" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">1/2 (0.50)</text>
          <rect x="107" y="58" width="88" height="18" rx="3" fill="#10b981" />
          <text x="151" y="71" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">1/2 (0.50)</text>
          {/* Quarter 1/4 */}
          {[0, 1, 2, 3].map(q => (
            <g key={`q-${q}`}>
              <rect x={15 + q * 46} y="81" width="42" height="18" rx="3" fill="#8b5cf6" />
              <text x={36 + q * 46} y="94" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">1/4</text>
            </g>
          ))}
          {/* Eighth 1/8 */}
          {Array.from({ length: 8 }).map((_, e) => (
            <g key={`e-${e}`}>
              <rect x={15 + e * 23} y="104" width="20" height="16" rx="2" fill="#ec4899" />
              <text x={25 + e * 23} y="116" textAnchor="middle" fill="#ffffff" fontSize="7">1/8</text>
            </g>
          ))}
          <text x="15" y="138" fill="#94a3b8" fontSize="8" fontFamily="monospace">1/2 = 2/4 = 4/8 = 50% = 0.50</text>
        </g>

        {/* TOP-RIGHT PANEL: CIRCULAR PIE FRACTIONS & DESIMAL */}
        <g transform="translate(560, 30)">
          <rect width="205" height="150" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" opacity="0.95" />
          <text x="15" y="22" fill="#fef08a" fontSize="10" fontWeight="black" fontFamily="sans-serif">
            DIAGRAM LINGKARAN &amp; PERSEN
          </text>
          {/* Pie Circle Graphic */}
          <g transform="translate(65, 85)">
            <circle cx="0" cy="0" r="42" fill="#3b82f6" />
            {/* 1/2 slice (Semi-circle) */}
            <path d="M0 0 L42 0 A42 42 0 0 1 -42 0 Z" fill="#10b981" />
            {/* 1/4 slice */}
            <path d="M0 0 L0 -42 A42 42 0 0 1 42 0 Z" fill="#f59e0b" />
            {/* Labels */}
            <text x="18" y="-14" fill="#ffffff" fontSize="8" fontWeight="bold">1/4</text>
            <text x="0" y="22" fill="#ffffff" fontSize="9" fontWeight="black">1/2 (50%)</text>
            <text x="-24" y="-14" fill="#ffffff" fontSize="8" fontWeight="bold">1/4</text>
          </g>
          <g transform="translate(125, 50)" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">
            <text x="0" y="15" fill="#fef08a">• 1/4 = 0.25 (25%)</text>
            <text x="0" y="32" fill="#34d399">• 1/2 = 0.50 (50%)</text>
            <text x="0" y="49" fill="#93c5fd">• 3/4 = 0.75 (75%)</text>
            <text x="0" y="66" fill="#f472b6">• 1/8 = 0.125</text>
          </g>
        </g>

        {/* BOTTOM FORMULAS: 3 GEOMETRIC CARDS */}
        <g transform="translate(40, 350)">
          {/* Card 1: Persegi */}
          <g transform="translate(0, 0)">
            <rect width="220" height="90" rx="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" opacity="0.95" />
            <rect x="14" y="20" width="45" height="45" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="36" y="47" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">s</text>
            <text x="75" y="28" fill="#f8fafc" fontSize="10" fontWeight="black">PERSEGI</text>
            <text x="75" y="46" fill="#93c5fd" fontSize="9" fontFamily="monospace">Keliling = 4 × s</text>
            <text x="75" y="62" fill="#60a5fa" fontSize="9" fontFamily="monospace">Luas = s × s (s²)</text>
          </g>
          {/* Card 2: Persegi Panjang */}
          <g transform="translate(250, 0)">
            <rect width="230" height="90" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" opacity="0.95" />
            <rect x="14" y="26" width="55" height="35" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
            <text x="41" y="48" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="bold">p × l</text>
            <text x="80" y="28" fill="#f8fafc" fontSize="10" fontWeight="black">PERSEGI PANJANG</text>
            <text x="80" y="46" fill="#34d399" fontSize="9" fontFamily="monospace">K = 2 × (p + l)</text>
            <text x="80" y="62" fill="#6ee7b7" fontSize="9" fontFamily="monospace">Luas = p × l</text>
          </g>
          {/* Card 3: Segitiga Siku-siku */}
          <g transform="translate(500, 0)">
            <rect width="220" height="90" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" opacity="0.95" />
            <polygon points="18,65 60,65 60,25" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="75" y="28" fill="#f8fafc" fontSize="10" fontWeight="black">SEGITIGA</text>
            <text x="75" y="46" fill="#fef08a" fontSize="9" fontFamily="monospace">Luas = 1/2 × a × t</text>
            <text x="75" y="62" fill="#fbbf24" fontSize="8" fontFamily="monospace">Triple: 3² + 4² = 5²</text>
          </g>
        </g>

        {/* BOTTOM HUD STATUS */}
        <g transform="translate(30, 455)">
          <rect width="520" height="28" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.95" />
          <text x="16" y="18" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
            ARSITEKTUR MATEMATIKA • PECAHAN SENILAI, DESIMAL &amp; GEOMETRI BIDANG DATAR
          </text>
        </g>
      </svg>
    </div>
  );
};

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

/**
 * 3. PROKLAMASI KEMERDEKAAN 1945 SVG
 * Historic Pegangsaan Timur 56 porch, vintage standing mic, Sang Saka Merah Putih, and dual Naskah
 */
export const Proklamasi1945Illustration: React.FC<HumanitiesSvgProps> = ({
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
          <linearGradient id="proklamasiSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="40%" stopColor="#991b1b" />
            <stop offset="80%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="flagRed" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <radialGradient id="sunDawn" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* HEROIC MORNING SKY (Fajar 17 Agustus 1945) */}
        <rect width="800" height="500" fill="url(#proklamasiSky)" />
        <circle cx="280" cy="140" r="160" fill="url(#sunDawn)" />

        {/* HISTORIC VERANDA OF PEGANGSAAN TIMUR 56 */}
        <g transform="translate(60, 140)">
          {/* Colonial Veranda Roof & Eaves */}
          <polygon points="0,60 380,60 360,20 20,20" fill="#475569" stroke="#64748b" strokeWidth="2" />
          {/* White Tuscan Columns */}
          <rect x="40" y="60" width="22" height="190" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="180" y="60" width="22" height="190" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="320" y="60" width="22" height="190" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Floor & Steps */}
          <rect x="0" y="240" width="380" height="18" fill="#334155" stroke="#475569" strokeWidth="2" />
          <rect x="-20" y="258" width="420" height="14" fill="#1e293b" />
        </g>

        {/* HISTORIC SHURE STANDING MICROPHONE (Mikrofon Bersejarah) */}
        <g transform="translate(240, 240)">
          {/* Tripod Stand */}
          <line x1="0" y1="120" x2="-25" y2="155" stroke="#cbd5e1" strokeWidth="3" />
          <line x1="0" y1="120" x2="25" y2="155" stroke="#cbd5e1" strokeWidth="3" />
          <line x1="0" y1="120" x2="0" y2="155" stroke="#cbd5e1" strokeWidth="3" />
          {/* Vertical Rod */}
          <line x1="0" y1="0" x2="0" y2="120" stroke="#cbd5e1" strokeWidth="4" />
          {/* Microphone Head (Vintage Bullet/Octagon) */}
          <circle cx="0" cy="-6" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
          <line x1="-8" y1="-6" x2="8" y2="-6" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="0" y1="-14" x2="0" y2="2" stroke="#94a3b8" strokeWidth="1.5" />
        </g>
        <text x="240" y="215" textAnchor="middle" fill="#fef08a" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
          🎙️ Mikrofon 17 Agustus 1945
        </text>

        {/* BAMBOO FLAGPOLE & FLUTTERING SANG SAKA MERAH PUTIH */}
        <g transform="translate(370, 70)">
          {/* Bamboo Pole Segments */}
          <line x1="0" y1="0" x2="0" y2="330" stroke="#fef08a" strokeWidth="5" strokeLinecap="round" />
          {[50, 110, 170, 230, 290].map((by, i) => (
            <line key={`node-${i}`} x1="-4" y1={by} x2="4" y2={by} stroke="#b45309" strokeWidth="2" />
          ))}

          {/* The Flag: Sang Saka Merah Putih (Jahitan Tangan Ibu Fatmawati) */}
          <g transform="translate(0, 20)">
            {/* Red Half with Wind Ripples */}
            <path
              d="M0 0 C40 -6 80 6 120 0 C140 -4 150 4 150 35 C110 40 70 30 0 35 Z"
              fill="url(#flagRed)"
              stroke="#b91c1c"
              strokeWidth="1.2"
            />
            {/* White Half with Wind Ripples */}
            <path
              d="M0 35 C70 30 110 40 150 35 C150 65 140 75 120 70 C80 76 40 64 0 70 Z"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />
          </g>
        </g>
        <text x="450" y="80" fill="#ffffff" fontSize="10" fontWeight="black" fontFamily="sans-serif">
          🇮🇩 SANG SAKA MERAH PUTIH
        </text>

        {/* SIDE-BY-SIDE DUAL DOCUMENTS (Naskah Klad vs Naskah Otentik) */}
        {/* Document 1: Naskah Klad (Handwritten by Soekarno) */}
        <g transform="translate(540, 60)">
          <rect width="220" height="155" rx="10" fill="#fef3c7" stroke="#b45309" strokeWidth="2" opacity="0.95" />
          <text x="14" y="22" fill="#78350f" fontSize="10" fontWeight="black" fontFamily="serif">
            NASKAH KLAD (TULISAN TANGAN)
          </text>
          <text x="14" y="34" fill="#92400e" fontSize="7" fontStyle="italic">Ditulis oleh Ir. Soekarno di Rumah Maeda</text>

          {/* Cursive Mockup Script */}
          <g stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
            <line x1="14" y1="52" x2="190" y2="52" />
            <line x1="14" y1="68" x2="200" y2="68" />
            <line x1="14" y1="84" x2="180" y2="84" />
            <line x1="14" y1="100" x2="195" y2="100" />
          </g>
          <text x="14" y="125" fill="#78350f" fontSize="8" fontFamily="serif">
            &quot;Djakarta, 17 - 8 - &apos;05&quot;
          </text>
          <text x="14" y="142" fill="#92400e" fontSize="7" fontWeight="bold">
            Diselamatkan BM Diah dari keranjang sampah
          </text>
        </g>

        {/* Document 2: Naskah Otentik (Typewritten by Sayuti Melik) */}
        <g transform="translate(540, 230)">
          <rect width="220" height="155" rx="10" fill="#ffffff" stroke="#dc2626" strokeWidth="2" opacity="0.98" />
          <text x="14" y="22" fill="#991b1b" fontSize="10" fontWeight="black" fontFamily="monospace">
            NASKAH OTENTIK (KETIKAN)
          </text>
          <text x="14" y="34" fill="#475569" fontSize="7">Diketuk oleh Sayuti Melik dengan Mesin Tik</text>

          <g fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="bold">
            <text x="14" y="55">P R O K L A M A S I</text>
            <text x="14" y="70" fontSize="7">Kami bangsa Indonesia dengan ini</text>
            <text x="14" y="82" fontSize="7">menjatakan kemerdekaan Indonesia.</text>
            <text x="14" y="96" fontSize="7">Hal² jang mengenai pemindahan</text>
            <text x="14" y="108" fontSize="7">kekoeasaan d.l.l., diselenggarakan</text>
            <text x="14" y="120" fontSize="7">dengan tjara saksama &amp; dlm tempo...</text>
          </g>
          <text x="14" y="142" fill="#dc2626" fontSize="7" fontWeight="black" fontFamily="monospace">
            &quot;Djakarta, hari 17 boelan 8 tahoen &apos;05&quot;
          </text>
        </g>

        {/* 5-STEP TIMELINE RIBBON (Bottom Left to Right) */}
        <g transform="translate(40, 395)">
          <rect width="470" height="45" rx="8" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.2" opacity="0.9" />
          <line x1="30" y1="22" x2="440" y2="22" stroke="#dc2626" strokeWidth="3" />
          {[
            { date: '14 Agt', label: 'Jepang Kalah' },
            { date: '16 Agt 04:00', label: 'Rengasdengklok' },
            { date: '16 Agt Malam', label: 'Rumah Maeda' },
            { date: '17 Agt Pagi', label: 'Sayuti Melik' },
            { date: '17 Agt 10:00', label: 'Proklamasi' },
          ].map((t, idx) => {
            const tx = 30 + idx * 102;
            return (
              <g key={`timeline-${idx}`} transform={`translate(${tx}, 22)`}>
                <circle cx="0" cy="0" r="6" fill="#facc15" stroke="#b45309" strokeWidth="2" />
                <text x="0" y="-10" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
                  {t.date}
                </text>
                <text x="0" y="16" textAnchor="middle" fill="#cbd5e1" fontSize="6.5">
                  {t.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* BOTTOM HUD STATUS */}
        <g transform="translate(30, 455)">
          <rect width="520" height="28" rx="8" fill="#0f172a" stroke="#dc2626" strokeWidth="1" opacity="0.95" />
          <text x="16" y="18" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace">
            LINIMASA REVOLUSI 1945 • DETIK-DETIK PROKLAMASI KEMERDEKAAN REPUBLIK INDONESIA
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. CATUR TAKTIK & LOGIKA KOMPUTASIONAL SVG
 * 8x8 chessboard with coordinates, 4 tactical motifs (Fork, Pin, Skewer, Back-Rank), and decision tree
 */
export const CaturTaktikLogikaIllustration: React.FC<HumanitiesSvgProps> = ({
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
          <linearGradient id="chessDarkBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#030712" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id="tacticalCyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* BACKGROUND COMPUTATIONAL GRID */}
        <rect width="800" height="500" fill="url(#chessDarkBg)" />
        <g stroke="#38bdf8" strokeWidth="0.8" opacity="0.1">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`ch-h-${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`ch-v-${i}`} x1={i * 60} y1="0" x2={i * 60} y2="500" />
          ))}
        </g>

        {/* 8x8 VECTOR CHESSBOARD (Left Anchor, 360x360 pixels) */}
        <g transform="translate(60, 50)">
          {/* Border Frame with Coordinates */}
          <rect x="-24" y="-24" width="388" height="388" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

          {/* Coordinate Letters a-h */}
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((col, idx) => (
            <text key={`col-${col}`} x={idx * 42.5 + 21} y="-8" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace">
              {col}
            </text>
          ))}
          {/* Coordinate Numbers 1-8 */}
          {['8', '7', '6', '5', '4', '3', '2', '1'].map((row, idx) => (
            <text key={`row-${row}`} x="-12" y={idx * 42.5 + 26} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace">
              {row}
            </text>
          ))}

          {/* 64 Alternating Squares */}
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 8 }).map((_, c) => {
              const isDark = (r + c) % 2 === 1;
              return (
                <rect
                  key={`sq-${r}-${c}`}
                  x={c * 42.5}
                  y={r * 42.5}
                  width="42.5"
                  height="42.5"
                  fill={isDark ? '#1e293b' : '#38bdf8'}
                  opacity={isDark ? 0.95 : 0.18}
                />
              );
            })
          )}

          {/* MOTIF 1: GARPU KUDA (KNIGHT FORK) AT e7 */}
          {/* White Knight on e7 (col 4, row 1) */}
          <g transform="translate(170, 42.5)">
            <circle cx="21" cy="21" r="16" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <text x="21" y="27" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">♞</text>
            {/* Dual Fork Vectors to g8 King and c8 Queen */}
            <line x1="21" y1="12" x2="90" y2="-20" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 2" />
            <line x1="21" y1="12" x2="-60" y2="-20" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3 2" />
          </g>

          {/* MOTIF 2: KUNCIAN GAJAH (THE PIN) FROM a4 */}
          {/* White Bishop on a4 (col 0, row 4) */}
          <g transform="translate(0, 170)">
            <circle cx="21" cy="21" r="15" fill="#047857" stroke="#34d399" strokeWidth="2" />
            <text x="21" y="27" textAnchor="middle" fill="#ffffff" fontSize="18">♝</text>
            {/* Laser Line through c6 to King at e8 */}
            <line x1="30" y1="10" x2="185" y2="-120" stroke="#34d399" strokeWidth="2.5" />
          </g>

          {/* MOTIF 3: TUSUKAN SATE (THE SKEWER) ON d-FILE */}
          {/* White Rook on d1 (col 3, row 7) skewering Queen on d4 through to Rook on d8 */}
          <g transform="translate(127.5, 297.5)">
            <circle cx="21" cy="21" r="15" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
            <text x="21" y="27" textAnchor="middle" fill="#ffffff" fontSize="18">♜</text>
            <line x1="21" y1="5" x2="21" y2="-270" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
          </g>

          {/* MOTIF 4: SKAKMAT KORIDOR (BACK-RANK MATE) AT c8 */}
          {/* White Rook delivering checkmate on c8 */}
          <g transform="translate(85, 0)">
            <rect x="2" y="2" width="38.5" height="38.5" fill="#dc2626" opacity="0.4" />
            <text x="21" y="28" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="black">♖</text>
            <text x="21" y="-5" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="bold"># MATE</text>
          </g>
          {/* Trapped Black King on g8 behind Pawns */}
          <g transform="translate(255, 0)">
            <circle cx="21" cy="21" r="15" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
            <text x="21" y="28" textAnchor="middle" fill="#ffffff" fontSize="19">♚</text>
          </g>
          {/* Trapping Pawns on f7, g7, h7 */}
          {[212.5, 255, 297.5].map((px, idx) => (
            <g key={`pawn-${idx}`} transform={`translate(${px}, 42.5)`}>
              <circle cx="21" cy="21" r="12" fill="#334155" stroke="#64748b" strokeWidth="1" />
              <text x="21" y="26" textAnchor="middle" fill="#ffffff" fontSize="14">♟</text>
            </g>
          ))}
        </g>

        {/* RIGHT PANEL: 4 TACTICAL MOTIFS & COMPUTATIONAL TREE */}
        <g transform="translate(460, 45)">
          <rect width="300" height="395" rx="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" opacity="0.95" />
          <text x="20" y="30" fill="#f8fafc" fontSize="13" fontWeight="black" fontFamily="sans-serif">
            4 MOTIF TAKTIK &amp; POHON LOGIKA
          </text>

          {/* 4 Tactics Badges */}
          {[
            { name: '1. Garpu (Fork)', desc: '1 bidak serang 2 sasaran (Kuda e7)', icon: '♞', color: '#0284c7' },
            { name: '2. Kuncian (Pin)', desc: 'Bidak terikat lindungi Raja (Gajah a4)', icon: '♝', color: '#059669' },
            { name: '3. Tusukan (Skewer)', desc: 'Serang perwira depan tembus ke belakang', icon: '🏹', color: '#d97706' },
            { name: '4. Skakmat Koridor', desc: 'Serangan baris 8 raja tanpa udara (luft)', icon: '🏰', color: '#dc2626' },
          ].map((t, idx) => (
            <g key={`tac-${idx}`} transform={`translate(20, ${46 + idx * 56})`}>
              <rect width="260" height="48" rx="8" fill="#1e293b" stroke={t.color} strokeWidth="1.5" />
              <circle cx="24" cy="24" r="14" fill={t.color} />
              <text x="24" y="29" textAnchor="middle" fill="#ffffff" fontSize="14">{t.icon}</text>
              <text x="46" y="20" fill="#f8fafc" fontSize="10" fontWeight="black">{t.name}</text>
              <text x="46" y="36" fill="#cbd5e1" fontSize="8">{t.desc}</text>
            </g>
          ))}

          {/* COMPUTATIONAL DECISION TREE DIAGRAM */}
          <g transform="translate(20, 280)">
            <rect width="260" height="100" rx="10" fill="#020617" stroke="#334155" strokeWidth="1.2" />
            <text x="14" y="20" fill="#38bdf8" fontSize="9" fontWeight="black" fontFamily="monospace">
              POHON KEPUTUSAN (MINIMAX SEARCH)
            </text>
            {/* Tree Nodes */}
            <circle cx="40" cy="50" r="10" fill="#0284c7" />
            <text x="40" y="53" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">S0</text>
            <line x1="50" y1="50" x2="100" y2="35" stroke="#64748b" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="100" y2="65" stroke="#64748b" strokeWidth="1.5" />
            {/* Branch 1 */}
            <circle cx="110" cy="35" r="9" fill="#10b981" />
            <text x="110" y="38" textAnchor="middle" fill="#ffffff" fontSize="7">c8#</text>
            {/* Branch 2 */}
            <circle cx="110" cy="65" r="9" fill="#ef4444" />
            <text x="110" y="68" textAnchor="middle" fill="#ffffff" fontSize="7">e6</text>
            {/* Evaluation Score */}
            <rect x="150" y="25" width="95" height="20" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="1" />
            <text x="197" y="39" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="black">Evaluasi: +9.0 MATE</text>
            <text x="14" y="86" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
              Pion=1 • Kuda/Gajah=3 • Benteng=5 • Ratu=9
            </text>
          </g>
        </g>

        {/* BOTTOM HUD STATUS */}
        <g transform="translate(30, 455)">
          <rect width="520" height="28" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" opacity="0.95" />
          <text x="16" y="18" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
            LOGIKA KOMPUTASIONAL • 4 MOTIF TAKTIK CATUR &amp; POHON KEPUTUSAN STRATEGIS
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 5. Aksara & Sastra Indonesia Illustration (800x500)
 * Designed for teka-teki-kata presentation deck:
 * Displays vintage manuscript scroll, Balai Pustaka seal, Pantun 4-seuntai structure,
 * and EYD V morphology & word origin taxonomy.
 */
export const AksaraSastraBahasaIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden bg-slate-950 rounded-2xl ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto block select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sastraBgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          <linearGradient id="manuscriptPaper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
          <linearGradient id="sealGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="inkWellGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Ambient Cosmic/Academic Background */}
        <rect width="800" height="500" fill="url(#sastraBgGrad)" />

        {/* TOP HEADER */}
        <g transform="translate(30, 25)">
          <rect width="740" height="42" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="1.2" opacity="0.9" />
          <circle cx="24" cy="21" r="10" fill="#6366f1" />
          <text x="24" y="25" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">📖</text>
          <text x="44" y="26" fill="#e0e7ff" fontSize="13" fontWeight="900" letterSpacing="0.5">
            BAHASA &amp; KHAZANAH SASTRA NUSANTARA • AKAR KATA, PANTUN &amp; EYD V
          </text>
          <rect x="635" y="10" width="95" height="22" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="0.8" />
          <text x="682" y="24" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="bold">KBBI / PUEBI</text>
        </g>

        {/* LEFT PANEL: VINTAGE MANUSCRIPT SCROLL & AKSARA */}
        <g transform="translate(30, 80)">
          {/* Scroll Outer Drop Shadow */}
          <rect x="4" y="4" width="365" height="360" rx="18" fill="#020617" opacity="0.6" />
          {/* Scroll Parchment Body */}
          <rect width="365" height="360" rx="16" fill="url(#manuscriptPaper)" stroke="#d97706" strokeWidth="2" />
          
          {/* Scroll Header Trim */}
          <path d="M 0 35 Q 182 15 365 35 L 365 0 L 0 0 Z" fill="#b45309" opacity="0.25" />
          <text x="182" y="28" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="black" letterSpacing="1">
            📜 MANUSKRIP SASTRA NUSANTARA
          </text>

          {/* Decorative Calligraphy / Aksara Motif */}
          <g transform="translate(25, 45)">
            <rect width="315" height="45" rx="8" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1" />
            <text x="157" y="28" textAnchor="middle" fill="#92400e" fontSize="16" fontFamily="serif" fontWeight="bold">
              ꦲꦤꦕꦫꦏ • ᮃᮊ᮪ᮞᮛ • ᨕᨀᨔᨑ
            </text>
            <text x="157" y="40" textAnchor="middle" fill="#b45309" fontSize="8" fontWeight="bold">
              Kekayaan Aksara Tradisional Nusantara (Jawa, Sunda, Lontara)
            </text>
          </g>

          {/* Classic Pantun Display on Scroll */}
          <g transform="translate(25, 105)">
            <rect width="315" height="150" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <rect x="0" y="0" width="315" height="24" rx="8" fill="#fef3c7" />
            <text x="12" y="16" fill="#92400e" fontSize="10" fontWeight="bold">
              Bait Pantun Klasik (Rima Silang a-b-a-b):
            </text>

            {/* Line 1 (Sampiran a) */}
            <circle cx="20" cy="45" r="7" fill="#6366f1" />
            <text x="20" y="48.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">1</text>
            <text x="35" y="48" fill="#1e293b" fontSize="10.5" fontFamily="serif" fontStyle="italic">
              Pohon kelapa tumbuh berjajar, <tspan fill="#6366f1" fontWeight="bold">(...-jar / a)</tspan>
            </text>

            {/* Line 2 (Sampiran b) */}
            <circle cx="20" cy="72" r="7" fill="#ec4899" />
            <text x="20" y="75.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">2</text>
            <text x="35" y="75" fill="#1e293b" fontSize="10.5" fontFamily="serif" fontStyle="italic">
              Tempat berteduh burung merpati; <tspan fill="#ec4899" fontWeight="bold">(...-ti / b)</tspan>
            </text>

            {/* Line 3 (Isi a) */}
            <circle cx="20" cy="99" r="7" fill="#6366f1" />
            <text x="20" y="102.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">3</text>
            <text x="35" y="102" fill="#0f172a" fontSize="10.5" fontFamily="serif" fontWeight="bold">
              Sejak kecil rajin belajar, <tspan fill="#6366f1" fontWeight="bold">(...-jar / a)</tspan>
            </text>

            {/* Line 4 (Isi b) */}
            <circle cx="20" cy="126" r="7" fill="#ec4899" />
            <text x="20" y="129.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="bold">4</text>
            <text x="35" y="129" fill="#0f172a" fontSize="10.5" fontFamily="serif" fontWeight="bold">
              Sudah besar senanglah hati. <tspan fill="#ec4899" fontWeight="bold">(...-ti / b)</tspan>
            </text>
          </g>

          {/* Balai Pustaka Seal & Merah-Putih Ribbon */}
          <g transform="translate(30, 275)">
            {/* Merah Putih Ribbon */}
            <rect x="0" y="20" width="80" height="10" fill="#dc2626" rx="2" />
            <rect x="0" y="30" width="80" height="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" rx="2" />
            
            {/* Gold Seal Medallion */}
            <circle cx="115" cy="35" r="28" fill="url(#sealGold)" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="115" cy="35" r="23" fill="none" stroke="#fef3c7" strokeWidth="1" strokeDasharray="3,2" />
            <text x="115" y="32" textAnchor="middle" fill="#78350f" fontSize="7.5" fontWeight="black">BALAI</text>
            <text x="115" y="42" textAnchor="middle" fill="#78350f" fontSize="7.5" fontWeight="black">PUSTAKA</text>

            {/* Feather Quill & Inkwell */}
            <g transform="translate(170, 10)">
              {/* Inkwell */}
              <rect x="95" y="25" width="30" height="25" rx="5" fill="url(#inkWellGrad)" stroke="#475569" strokeWidth="1" />
              <rect x="100" y="20" width="20" height="5" rx="2" fill="#94a3b8" />
              <circle cx="110" cy="22" r="3" fill="#020617" />
              {/* Feather Quill */}
              <path d="M 110 22 C 80 -10, 40 5, 20 -15 C 35 15, 65 15, 110 22 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <line x1="20" y1="-15" x2="110" y2="22" stroke="#64748b" strokeWidth="1" />
            </g>
          </g>
        </g>

        {/* RIGHT PANEL: ANATOMI STRUKTUR & MORFOLOGI EYD V */}
        <g transform="translate(420, 80)">
          {/* Top Card: Kaidah & Struktur Pantun */}
          <g>
            <rect width="350" height="165" rx="14" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" opacity="0.95" />
            <rect x="0" y="0" width="350" height="32" rx="14" fill="#312e81" />
            <text x="16" y="21" fill="#c7d2fe" fontSize="11" fontWeight="bold">
              ANATOMI CIRI-CIRI PANTUN RESMI
            </text>

            <g transform="translate(16, 42)">
              <rect x="0" y="0" width="150" height="48" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#38bdf8" fontSize="9" fontWeight="bold">1. Jumlah Baris:</text>
              <text x="10" y="36" fill="#e2e8f0" fontSize="10" fontWeight="extrabold">Tepat 4 Baris / Bait</text>

              <rect x="165" y="0" width="150" height="48" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#a7f3d0" fontSize="9" fontWeight="bold" transform="translate(165,0)">2. Suku Kata:</text>
              <text x="10" y="36" fill="#e2e8f0" fontSize="10" fontWeight="extrabold" transform="translate(165,0)">8 – 12 Suku Kata</text>

              <rect x="0" y="58" width="150" height="48" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#f472b6" fontSize="9" fontWeight="bold">3. Skema Rima:</text>
              <text x="10" y="36" fill="#e2e8f0" fontSize="10" fontWeight="extrabold">Bersajak a-b-a-b</text>

              <rect x="165" y="58" width="150" height="48" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="10" y="18" fill="#fbbf24" fontSize="9" fontWeight="bold" transform="translate(165,0)">4. Pembagian Isi:</text>
              <text x="10" y="36" fill="#e2e8f0" fontSize="10" fontWeight="extrabold" transform="translate(165,0)">Baris 1-2 Sampiran, 3-4 Isi</text>
            </g>
          </g>

          {/* Bottom Card: Morfologi & Kosakata Serapan EYD V */}
          <g transform="translate(0, 180)">
            <rect width="350" height="180" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" opacity="0.95" />
            <rect x="0" y="0" width="350" height="32" rx="14" fill="#064e3b" />
            <text x="16" y="21" fill="#a7f3d0" fontSize="11" fontWeight="bold">
              MORFOLOGI &amp; KATA SERAPAN BAKU (EYD V)
            </text>

            <g transform="translate(16, 42)">
              {/* Category 1: Imbuhan / Afiksasi */}
              <rect x="0" y="0" width="318" height="36" rx="6" fill="#134e4a" stroke="#2dd4bf" strokeWidth="0.8" />
              <text x="10" y="16" fill="#5eead4" fontSize="8.5" fontWeight="bold">Imbuhan Pembentuk Nomina/Verba:</text>
              <text x="10" y="28" fill="#ffffff" fontSize="9" fontFamily="monospace">
                meN- + tulis → menulis • peN- + didik → pendidik
              </text>

              {/* Category 2: Serapan Sanskerta & Arab */}
              <rect x="0" y="44" width="318" height="36" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
              <text x="10" y="16" fill="#fde047" fontSize="8.5" fontWeight="bold">Serapan Sanskerta &amp; Arab:</text>
              <text x="10" y="28" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
                Baskara (Surya), Pancasila • Ikhlas, Musyawarah, Takzim
              </text>

              {/* Category 3: Serapan Belanda & Inggris (Sains Modern) */}
              <rect x="0" y="88" width="318" height="36" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
              <text x="10" y="16" fill="#93c5fd" fontSize="8.5" fontWeight="bold">Serapan Eropa / Sains Baku:</text>
              <text x="10" y="28" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
                Klorofil (Chlorophyll) • Hipotesis (Hypothesis) • Ekosistem
              </text>
            </g>
          </g>
        </g>

        {/* BOTTOM FOOTER HUD */}
        <g transform="translate(30, 455)">
          <rect width="740" height="28" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="1" opacity="0.95" />
          <text x="16" y="18" fill="#a5b4fc" fontSize="10" fontWeight="bold" fontFamily="monospace">
            LITERASI SASTRA • KOSAKATA BAKU, RIMBA PANTUN KLASIK, &amp; TATA BAHASA INDONESIA BAKU
          </text>
        </g>
      </svg>
    </div>
  );
};

