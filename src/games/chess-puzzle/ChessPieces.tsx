import React from 'react';

export type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
export type PieceColor = 'w' | 'b';

interface PieceProps {
  type: PieceType;
  color: PieceColor;
  className?: string;
}

/**
 * Komponen Vektor SVG Bidak Catur Klasik (Cburnett / Chess.com Standard)
 * Tajam sempurna di layar Retina, 4K Smartboard, dan Proyektor Kelas.
 */
export const ChessPieceSvg: React.FC<PieceProps> = ({ type, color, className = 'w-full h-full' }) => {
  const isWhite = color === 'w';
  const fillColor = isWhite ? '#ffffff' : '#1e293b';
  const strokeColor = isWhite ? '#1e293b' : '#f8fafc';
  const strokeWidth = 1.5;

  switch (type) {
    case 'p': // Pawn (Pion)
      return (
        <svg viewBox="0 0 45 45" className={className} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))' }}>
          <path
            d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </svg>
      );

    case 'r': // Rook (Benteng)
      return (
        <svg viewBox="0 0 45 45" className={className} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))' }}>
          <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 39h27v-3H9v3zm3-3v-4h21v4H12zm2-4l1.5-12h16l1.5 12H14zm-2.5-14l-.5-6h4v3h4v-3h7v3h4v-3h4l-.5 6H11.5z" />
            <path d="M14 29.5h17M14 16.5h17" fill="none" stroke={strokeColor} strokeWidth="1" />
          </g>
        </svg>
      );

    case 'n': // Knight (Kuda)
      return (
        <svg viewBox="0 0 45 45" className={className} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))' }}>
          <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
            <path d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.042-.94 1.41-4.04 2-6 2.1-7 6.5-10 11-10 2 0 4.5.5 5 1.5 0 0 .5-1.5 2-2 1.5-.5 3 .5 3 1.5s-1.5 2-2 2z" />
            <circle cx="9.5" cy="25.5" r="1.5" fill={isWhite ? '#1e293b' : '#ffffff'} stroke="none" />
          </g>
        </svg>
      );

    case 'b': // Bishop (Gajah)
      return (
        <svg viewBox="0 0 45 45" className={className} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))' }}>
          <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.354.49-2.323.47-3-.5 1.354-1.94 3-2 3-2zM15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" />
            <path d="M17.5 26h10M22.5 10v4M20 12h5" fill="none" stroke={strokeColor} strokeWidth="1" />
          </g>
        </svg>
      );

    case 'q': // Queen (Ratu)
      return (
        <svg viewBox="0 0 45 45" className={className} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))' }}>
          <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-4-15-4.5 15-7-11 2.5 12zm0 13h27v-3H9v3zm3-3v-3h21v3H12zm-3-6h27v-3H9v3z" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="14" cy="9" r="2" />
            <circle cx="22.5" cy="8" r="2" />
            <circle cx="31" cy="9" r="2" />
            <circle cx="39" cy="12" r="2" />
          </g>
        </svg>
      );

    case 'k': // King (Raja)
      return (
        <svg viewBox="0 0 45 45" className={className} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))' }}>
          <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.5 11.63V6M20 8h5" stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" />
            <path d="M11.5 37c5.5 3.5 16.5 3.5 22 0 0-4-3-6.5-5.5-8.5-3.5 2.5-7.5 2.5-11 0-2.5 2-5.5 4.5-5.5 8.5z" />
            <path d="M12 33.5c6-1 15-1 21 0M11.5 30c5.5-1.5 16.5-1.5 22 0" fill="none" stroke={strokeColor} strokeWidth="1" />
          </g>
        </svg>
      );
  }
};
