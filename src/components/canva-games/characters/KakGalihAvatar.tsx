import React from 'react';

export interface KakGalihAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'speaking' | 'explaining' | 'happy' | 'thinking';
  showSpeechBubble?: boolean;
  speechText?: string;
  dialogueTitle?: string;
  missionObjective?: string;
  className?: string;
}

const SIZE_MAP = {
  sm: { width: 72, height: 90, avatarBox: 'w-16 h-20' },
  md: { width: 110, height: 135, avatarBox: 'w-24 h-32' },
  lg: { width: 160, height: 195, avatarBox: 'w-36 h-44 sm:w-44 sm:h-52' },
  xl: { width: 200, height: 245, avatarBox: 'w-48 h-60 sm:w-56 sm:h-68' },
};

export const KakGalihAvatar: React.FC<KakGalihAvatarProps> = ({
  size = 'md',
  mood = 'speaking',
  showSpeechBubble = false,
  speechText,
  dialogueTitle = 'Kak Galih • Penjelajah Rimba Lembah Cendrawasih',
  missionObjective,
  className = '',
}) => {
  const isSpeaking = mood === 'speaking' || mood === 'explaining';
  const sizeConfig = SIZE_MAP[size];

  return (
    <div className={`flex flex-col md:flex-row items-center gap-4 sm:gap-6 ${className}`}>
      {/* ANIMATED GALIH SVG CHARACTER */}
      <div className={`relative shrink-0 ${sizeConfig.avatarBox} flex items-center justify-center select-none`}>
        {/* Ambient Halo Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400/20 via-amber-300/20 to-teal-400/20 blur-xl animate-pulse" />

        <svg
          viewBox="0 0 160 195"
          className="w-full h-full drop-shadow-lg overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`
            @keyframes galihBreathe {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-3px) rotate(0.4deg); }
            }
            @keyframes galihBlink {
              0%, 94%, 98%, 100% { transform: scaleY(1); }
              96% { transform: scaleY(0.1); }
            }
            @keyframes galihTalk {
              0%, 100% { transform: scaleY(0.7) translateY(0); }
              50% { transform: scaleY(1.3) translateY(0.5px); }
            }
            @keyframes compassSway {
              0%, 100% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
            }
            @keyframes badgeGleam {
              0%, 100% { opacity: 0.8; }
              50% { opacity: 1; filter: drop-shadow(0 0 3px #fef08a); }
            }
            .animate-breathe {
              animation: galihBreathe 3.6s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .animate-blink {
              animation: galihBlink 4.2s infinite;
              transform-origin: 80px 72px;
            }
            .animate-talk {
              animation: ${isSpeaking ? 'galihTalk 0.35s ease-in-out infinite' : 'none'};
              transform-origin: 80px 84px;
            }
            .animate-sway {
              animation: compassSway 2.8s ease-in-out infinite;
              transform-origin: 32px 145px;
            }
            .animate-gleam {
              animation: badgeGleam 2s ease-in-out infinite;
            }
          `}</style>

          <g className="animate-breathe">
            {/* BODY / RANGER JACKET & KHAKI SHIRT */}
            <g id="body">
              {/* Shoulders & Upper Chest */}
              <path
                d="M32 135 C32 118 55 110 80 110 C105 110 128 118 128 135 L132 195 L28 195 Z"
                fill="#15803d"
              />
              {/* Khaki Inner Collar / V-Neck */}
              <path d="M66 110 L80 135 L94 110 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
              {/* Khaki Vest Flaps */}
              <path d="M50 115 L66 195 L28 195 Z" fill="#166534" />
              <path d="M110 115 L94 195 L132 195 Z" fill="#166534" />
              {/* Ranger Pocket & Brass Pen */}
              <rect x="94" y="142" width="22" height="24" rx="4" fill="#14532d" stroke="#16a34a" strokeWidth="1" />
              <line x1="97" y1="138" x2="97" y2="148" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

              {/* Explorer Medal / Science Pin */}
              <g className="animate-gleam" transform="translate(46, 142)">
                <circle cx="6" cy="6" r="6" fill="#facc15" stroke="#b45309" strokeWidth="1.2" />
                <path d="M6 2 L7 5 L10 6 L7 7 L6 10 L5 7 L2 6 L5 5 Z" fill="#78350f" />
              </g>

              {/* Hand Holding Compass on Left Side */}
              <g className="animate-sway">
                {/* Arm / Sleeve */}
                <path d="M30 130 Q18 145 28 160 Q34 165 40 152" fill="#15803d" />
                {/* Hand */}
                <circle cx="28" cy="158" r="7" fill="#fbcfe8" />
                {/* Vintage Brass Compass */}
                <circle cx="25" cy="158" r="9" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
                <circle cx="25" cy="158" r="6" fill="#ffffff" />
                <path d="M25 153 L27 158 L25 163 L23 158 Z" fill="#dc2626" />
                <path d="M25 158 L27 163 L25 158 L23 163 Z" fill="#2563eb" />
                <circle cx="25" cy="158" r="1.5" fill="#1e293b" />
              </g>
            </g>

            {/* NECK */}
            <rect x="71" y="96" width="18" height="18" rx="5" fill="#fed7aa" />

            {/* HEAD / FACE */}
            <g id="head">
              {/* Back Hair */}
              <path d="M46 68 C44 48 56 36 80 36 C104 36 116 48 114 68 C114 86 106 104 80 104 C54 104 46 86 46 68 Z" fill="#1e293b" />
              {/* Ears */}
              <circle cx="47" cy="72" r="6" fill="#fed7aa" />
              <circle cx="113" cy="72" r="6" fill="#fed7aa" />
              {/* Face Contour */}
              <path
                d="M52 64 C52 50 62 44 80 44 C98 44 108 50 108 64 C108 82 98 98 80 98 C62 98 52 82 52 64 Z"
                fill="#fde68a"
              />

              {/* Adventurous Forehead Hair Fringe */}
              <path d="M52 56 Q62 64 74 54 Q82 66 94 54 Q102 62 108 56 Q98 44 80 44 Q62 44 52 56 Z" fill="#1e293b" />

              {/* Expressive Eyebrows */}
              <path d="M60 62 Q68 59 74 63" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path d="M86 63 Q92 59 100 62" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" fill="none" />

              {/* Blinking Eyes */}
              <g className="animate-blink">
                {/* Left Eye */}
                <ellipse cx="67" cy="71" rx="4.5" ry="5" fill="#0f172a" />
                <circle cx="68.5" cy="69.5" r="1.8" fill="#ffffff" />
                {/* Right Eye */}
                <ellipse cx="93" cy="71" rx="4.5" ry="5" fill="#0f172a" />
                <circle cx="94.5" cy="69.5" r="1.8" fill="#ffffff" />
              </g>

              {/* Cheerful Explorer Cheeks */}
              <ellipse cx="61" cy="78" rx="4" ry="2.5" fill="#fca5a5" opacity="0.6" />
              <ellipse cx="99" cy="78" rx="4" ry="2.5" fill="#fca5a5" opacity="0.6" />

              {/* Friendly Nose */}
              <path d="M80 71 Q82 76 78 77" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Animated Speaking / Smiling Mouth */}
              <g className="animate-talk">
                {isSpeaking ? (
                  <path
                    d="M72 83 Q80 91 88 83 Q80 88 72 83 Z"
                    fill="#be123c"
                    stroke="#881337"
                    strokeWidth="1.2"
                  />
                ) : (
                  <path
                    d="M73 83 Q80 88 87 83"
                    stroke="#991b1b"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </g>
            </g>

            {/* EXPEDITION SAFARI RANGER HAT */}
            <g id="ranger-hat">
              {/* Hat Crown */}
              <path
                d="M48 42 C48 20 62 14 80 14 C98 14 112 20 112 42 Z"
                fill="#b45309"
              />
              <path
                d="M50 40 C52 24 64 18 80 18 C96 18 108 24 110 40 Z"
                fill="#d97706"
              />
              {/* Leather Hat Band */}
              <rect x="47" y="36" width="66" height="8" rx="2" fill="#78350f" />
              {/* Brass Compass Buckle on Hat */}
              <circle cx="80" cy="40" r="5" fill="#facc15" stroke="#92400e" strokeWidth="1" />
              <polygon points="80,37 82,40 80,43 78,40" fill="#dc2626" />

              {/* Wide Curved Hat Brim */}
              <path
                d="M34 46 C50 40 110 40 126 46 C134 49 130 53 124 53 C100 51 60 51 36 53 C30 53 26 49 34 46 Z"
                fill="#92400e"
              />
              <path
                d="M36 45 C52 39 108 39 124 45 C130 48 126 50 120 50 C98 48 62 48 40 50 C34 50 30 48 36 45 Z"
                fill="#b45309"
              />
            </g>
          </g>
        </svg>

        {/* ACTIVE SPEAKER PULSE PILL */}
        {isSpeaking && (
          <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 shadow-md border-2 border-white flex items-center justify-center animate-bounce">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping absolute" />
            <span className="text-[10px] leading-none">🧭</span>
          </div>
        )}
      </div>

      {/* SPEECH BUBBLE (DIALOGUE BALLOON) */}
      {showSpeechBubble && speechText && (
        <div className="relative flex-1 bg-white/95 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-emerald-200/90 shadow-xl text-left max-w-2xl ring-1 ring-slate-100">
          {/* Comic Bubble Pointer Arrow pointing towards Kak Galih */}
          <div className="hidden md:block absolute -left-3 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-12 border-r-white/95 drop-shadow-sm" />
          <div className="md:hidden absolute -top-3 left-10 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-12 border-b-white/95 drop-shadow-sm" />

          {/* Dialogue Header */}
          <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-emerald-100">
            <span className="text-base">🧭</span>
            <span className="font-extrabold text-xs sm:text-sm text-emerald-900 tracking-tight">
              {dialogueTitle}
            </span>
          </div>

          {/* Spoken Dialogue Text */}
          <p className="text-xs sm:text-base leading-relaxed text-slate-800 font-medium">
            &ldquo;{speechText}&rdquo;
          </p>

          {/* Mission Target Pill */}
          {missionObjective && (
            <div className="mt-4 pt-3 border-t border-emerald-100/80 flex items-start sm:items-center gap-2 text-xs font-semibold text-slate-700 bg-emerald-50/50 p-2.5 rounded-xl">
              <span className="text-emerald-700 font-black shrink-0">🎯 Target Ekspedisi:</span>
              <span className="text-emerald-950">{missionObjective}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
