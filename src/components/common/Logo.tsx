import React from 'react';

interface LogoIconProps {
  size?: number | string;
  className?: string;
  idSuffix?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({
  size = 36,
  className = '',
  idSuffix = 'main',
}) => {
  const gradId = `ueeee-grad-${idSuffix}`;
  const starId = `ueeee-star-${idSuffix}`;
  const glareId = `ueeee-glare-${idSuffix}`;
  const shadowId = `ueeee-shadow-${idSuffix}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none ${className}`}
      aria-label="Logo ueeee"
    >
      <defs>
        {/* Background Gradient: Fresh Vibrant Cyan to Radiant Indigo/Purple */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="28%" stopColor="#00C4CC" />
          <stop offset="70%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* Discovery Star Glow Gradient */}
        <linearGradient id={starId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="50%" stopColor="#FFBE0B" />
          <stop offset="100%" stopColor="#FB5607" />
        </linearGradient>

        {/* Soft Tactile Glare */}
        <linearGradient id={glareId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Ambient Drop Shadow */}
        <filter id={shadowId} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#0F172A" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Base Squircle */}
      <rect x="6" y="6" width="116" height="116" rx="36" fill={`url(#${gradId})`} filter={`url(#${shadowId})`} />

      {/* Top Gloss Accent */}
      <path
        d="M 10 38 C 10 22, 22 10, 40 10 L 88 10 C 106 10, 118 22, 118 38 C 84 32, 44 32, 10 38 Z"
        fill={`url(#${glareId})`}
      />

      {/* Crisp Inner Bevel Ring */}
      <rect x="7" y="7" width="114" height="114" rx="35" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="2" />

      {/* Joyful Bold U Curve */}
      <path
        d="M 39 36 L 39 65 C 39 79.5, 50 91, 63.5 91 C 77 91, 88 79.5, 88 65 L 88 47"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 4-Point Magic Sparkle Star */}
      <path
        d="M 94 13 C 94 22.5, 98.5 27, 108 27 C 98.5 27, 94 31.5, 94 41 C 94 31.5, 89.5 27, 80 27 C 89.5 27, 94 22.5, 94 13 Z"
        fill={`url(#${starId})`}
      />

      {/* Secondary Playful Twinkle */}
      <circle cx="75" cy="18" r="2.8" fill="#FFF275" opacity="0.95" />
    </svg>
  );
};

interface LogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  showText = true,
  size = 'md',
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-xl' },
    md: { icon: 38, text: 'text-2xl' },
    lg: { icon: 48, text: 'text-3xl' },
  };

  const { icon, text } = sizeMap[size];

  const content = (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 transition-transform duration-200 ${
        onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${className}`}
      title="ueeee - Belajar Lewat Game Interaktif"
    >
      <LogoIcon size={icon} className="transition-transform duration-300 group-hover:rotate-3 shadow-sm rounded-2xl" />
      {showText && (
        <span className={`font-black ${text} tracking-tight text-slate-900 group-hover:text-purple-700 transition`}>
          ueeee
        </span>
      )}
    </div>
  );

  return content;
};
