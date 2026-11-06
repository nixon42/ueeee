import React from 'react';
import { ScienceSvgProps } from '@/types/presentation';

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

export { TataSuryaAstronomiIllustration as AstronomiTataSuryaIllustration };
