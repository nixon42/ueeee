import React from 'react';
import { HumanitiesSvgProps } from '@/types/presentation';

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


export { CaturTaktikLogikaIllustration as CaturLogikaIllustration };
