import React from 'react';
import { HumanitiesSvgProps } from '@/types/presentation';

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


export { GeometriPecahanIllustration as MatematikaPecahanIllustration };
