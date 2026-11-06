import React from 'react';
import { ScienceSvgProps } from '@/types/presentation';

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


export { LaboratoriumForensikIllustration as LabKimiaIllustration };
