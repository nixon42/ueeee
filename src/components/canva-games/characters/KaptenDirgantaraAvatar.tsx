import React from 'react';

export interface KaptenDirgantaraAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  mood?: 'speaking' | 'commanding' | 'happy' | 'thinking';
  showSpeechBubble?: boolean;
  speechText?: string;
  dialogueTitle?: string;
  speakerName?: string;
  speakerRole?: string;
  missionObjective?: string;
  className?: string;
}

const SIZE_MAP = {
  sm: { width: 72, height: 90, avatarBox: 'w-16 h-20' },
  md: { width: 110, height: 135, avatarBox: 'w-24 h-32' },
  lg: { width: 160, height: 195, avatarBox: 'w-36 h-44 sm:w-44 sm:h-52' },
  xl: { width: 200, height: 245, avatarBox: 'w-48 h-60 sm:w-56 sm:h-68' },
  '2xl': { width: 260, height: 320, avatarBox: 'w-40 h-48 sm:w-52 sm:h-64 md:w-64 md:h-80 lg:w-72 lg:h-88' },
  hero: { width: 300, height: 365, avatarBox: 'w-40 h-48 sm:w-52 sm:h-64 md:w-64 md:h-80 lg:w-76 lg:h-92' },
};

export const KaptenDirgantaraAvatar: React.FC<KaptenDirgantaraAvatarProps> = ({
  size = 'md',
  mood = 'speaking',
  showSpeechBubble = false,
  speechText,
  dialogueTitle = 'Kapten Dirgantara • Astro-Komandan Misi Dirgantara',
  speakerName = 'Kapten Dirgantara',
  speakerRole = 'Astro-Komandan Misi Dirgantara',
  missionObjective,
  className = '',
}) => {
  const isSpeaking = mood === 'speaking' || mood === 'commanding';
  const sizeConfig = SIZE_MAP[size];

  return (
    <div className={`flex flex-col md:flex-row items-center gap-4 sm:gap-6 ${className}`}>
      {/* ANIMATED ASTRO-COMMANDER SVG CHARACTER */}
      <div className={`relative shrink-0 ${sizeConfig.avatarBox} flex items-center justify-center select-none`}>
        {/* Ambient Cosmic Nebula Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-500/25 to-cyan-400/20 blur-xl animate-pulse" />

        <svg
          viewBox="0 0 160 195"
          className="w-full h-full drop-shadow-xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`
            @keyframes dirgantaraFloat {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-3.5px) rotate(0.4deg); }
            }
            @keyframes dirgantaraBlink {
              0%, 94%, 98%, 100% { transform: scaleY(1); }
              96% { transform: scaleY(0.1); }
            }
            @keyframes dirgantaraTalk {
              0%, 100% { transform: scaleY(0.7) translateY(0); }
              50% { transform: scaleY(1.3) translateY(0.5px); }
            }
            @keyframes visorGlow {
              0%, 100% { opacity: 0.85; }
              50% { opacity: 1; filter: drop-shadow(0 0 4px #38bdf8); }
            }
            @keyframes commsPulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; filter: drop-shadow(0 0 3px #a855f7); }
            }
            .anim-float {
              animation: dirgantaraFloat 3.8s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .anim-blink {
              animation: dirgantaraBlink 4.5s infinite;
              transform-origin: 80px 72px;
            }
            .anim-talk {
              animation: ${isSpeaking ? 'dirgantaraTalk 0.35s ease-in-out infinite' : 'none'};
              transform-origin: 80px 84px;
            }
            .anim-visor {
              animation: visorGlow 3s ease-in-out infinite;
            }
            .anim-comms {
              animation: commsPulse 2s ease-in-out infinite;
            }
          `}</style>

          <g className="anim-float">
            {/* SPACESUIT TORSO & COMMANDER VEST */}
            <g id="spacesuit-body">
              {/* Heavy Astronaut Suit Shoulders */}
              <path
                d="M28 135 C28 116 52 108 80 108 C108 108 132 116 132 135 L136 195 L24 195 Z"
                fill="#f8fafc"
                stroke="#64748b"
                strokeWidth="1.5"
              />
              {/* Deep Purple Commander Flight Vest Panels */}
              <path d="M48 114 L64 195 L24 195 Z" fill="#4c1d95" />
              <path d="M112 114 L96 195 L136 195 Z" fill="#4c1d95" />
              {/* Center Chest Seam & Air Hose Port */}
              <rect x="74" y="112" width="12" height="83" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
              <circle cx="80" cy="126" r="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
              <circle cx="80" cy="140" r="3" fill="#f43f5e" />

              {/* Commander Mission Patch (Garuda / Indonesia Space Flight) */}
              <g transform="translate(42, 138)">
                <rect x="0" y="0" width="18" height="14" rx="3" fill="#7c3aed" stroke="#facc15" strokeWidth="1" />
                {/* Gold Wings */}
                <path d="M3 8 Q9 3 15 8 Q9 11 3 8 Z" fill="#facc15" />
                <circle cx="9" cy="7" r="2" fill="#ef4444" />
              </g>

              {/* Left Astronaut Arm with Telemetry Wrist Device */}
              <g>
                <path d="M26 130 Q14 145 22 165 Q28 170 36 156" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.2" />
                {/* Glove */}
                <circle cx="22" cy="164" r="8" fill="#4c1d95" stroke="#7c3aed" strokeWidth="1.5" />
                {/* Glowing Holo-Watch / Wrist Radar */}
                <rect x="18" y="152" width="10" height="6" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" className="anim-comms" />
              </g>
            </g>

            {/* HIGH-COLLAR SUIT NECK RING (Hermetic Lock) */}
            <path
              d="M58 100 C58 95 68 92 80 92 C92 92 102 95 102 100 L106 114 L54 114 Z"
              fill="#cbd5e1"
              stroke="#475569"
              strokeWidth="1.5"
            />
            <line x1="60" y1="104" x2="100" y2="104" stroke="#94a3b8" strokeWidth="1.5" />

            {/* HEAD / FACE (Under Open Visor) */}
            <g id="head">
              {/* Back Neck Cushion */}
              <rect x="68" y="85" width="24" height="16" rx="4" fill="#fed7aa" />

              {/* Face Contour */}
              <path
                d="M54 62 C54 48 64 42 80 42 C96 42 106 48 106 62 C106 80 96 96 80 96 C64 96 54 80 54 62 Z"
                fill="#fde68a"
              />

              {/* Astro Commander Hair */}
              <path
                d="M54 54 C54 38 66 32 80 32 C94 32 106 38 106 54 C106 58 104 60 100 56 Q92 48 80 48 Q68 48 60 56 C56 60 54 58 54 54 Z"
                fill="#1e1b4b"
              />

              {/* Commander Eyebrows (Determined & Friendly) */}
              <path d="M62 61 Q70 57 76 61" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path d="M84 61 Q90 57 98 61" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" fill="none" />

              {/* Blinking Eyes */}
              <g className="anim-blink">
                {/* Left Eye */}
                <ellipse cx="68" cy="69" rx="4.5" ry="5" fill="#0f172a" />
                <circle cx="69.5" cy="67.5" r="1.8" fill="#ffffff" />
                {/* Right Eye */}
                <ellipse cx="92" cy="69" rx="4.5" ry="5" fill="#0f172a" />
                <circle cx="93.5" cy="67.5" r="1.8" fill="#ffffff" />
              </g>

              {/* Cheerful Cheeks */}
              <ellipse cx="63" cy="76" rx="4" ry="2.5" fill="#fca5a5" opacity="0.6" />
              <ellipse cx="97" cy="76" rx="4" ry="2.5" fill="#fca5a5" opacity="0.6" />

              {/* Nose */}
              <path d="M80 69 Q82 74 78 75" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Animated Speaking Mouth */}
              <g className="anim-talk">
                {isSpeaking ? (
                  <path
                    d="M72 81 Q80 89 88 81 Q80 86 72 81 Z"
                    fill="#be123c"
                    stroke="#881337"
                    strokeWidth="1.2"
                  />
                ) : (
                  <path
                    d="M73 81 Q80 86 87 81"
                    stroke="#991b1b"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </g>

              {/* COMMS HEADSET & BOOM MICROPHONE */}
              <g id="headset">
                {/* Earpiece Cap */}
                <circle cx="51" cy="70" r="7" fill="#6d28d9" stroke="#a855f7" strokeWidth="1.5" />
                <circle cx="51" cy="70" r="3" fill="#38bdf8" className="anim-comms" />
                {/* Microphone Boom Arm */}
                <path d="M51 74 Q56 86 68 85" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
                <rect x="66" y="83" width="5" height="4" rx="1.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
              </g>
            </g>

            {/* ASTRONAUT HELMET DOME & RETRACTED VISOR */}
            <g id="astronaut-helmet">
              {/* Outer Protective White Helmet Ring */}
              <path
                d="M40 50 C40 22 58 10 80 10 C102 10 120 22 120 50 C120 80 114 96 112 102 C102 106 58 106 48 102 C46 96 40 80 40 50 Z"
                fill="none"
                stroke="#f8fafc"
                strokeWidth="7"
                strokeLinejoin="round"
              />
              <path
                d="M40 50 C40 22 58 10 80 10 C102 10 120 22 120 50 C120 80 114 96 112 102 C102 106 58 106 48 102 C46 96 40 80 40 50 Z"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
              />

              {/* Helmet Crown Ridge */}
              <rect x="74" y="8" width="12" height="12" rx="3" fill="#7c3aed" stroke="#facc15" strokeWidth="1" />

              {/* Retracted Tinted Gold/Cyan Visor Rim at Top */}
              <path
                d="M46 36 C54 26 68 22 80 22 C92 22 106 26 114 36"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
                className="anim-visor"
              />
              {/* Visor Glint Reflection Highlight */}
              <path
                d="M52 30 Q62 25 74 25"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* SPEECH BUBBLE (RPG DIALOGUE BALLOON) */}
      {showSpeechBubble && speechText && (
        <div className="relative flex-1 bg-white/95 backdrop-blur-md p-5 sm:p-7 md:p-8 rounded-3xl border-3 sm:border-4 border-purple-400/90 shadow-2xl shadow-purple-950/20 ring-4 ring-purple-500/10 text-left max-w-3xl">
          {/* Comic / Speech Pointer Arrow pointing towards Kapten Dirgantara */}
          <div className="hidden md:block absolute -left-3.5 bottom-12 sm:bottom-16 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[14px] border-r-white drop-shadow-sm" />
          <div className="md:hidden absolute -top-3 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-white drop-shadow-sm" />

          {/* RPG Speaker Nameplate Badge */}
          <div className="absolute -top-4 sm:-top-5 left-6 sm:left-8 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-800 text-white shadow-lg border-2 border-white select-none">
            <span className="text-sm sm:text-base">🚀</span>
            <span className="font-black text-xs sm:text-sm tracking-wide">
              {speakerName || dialogueTitle.split('•')[0]?.trim() || 'Kapten Dirgantara'}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-purple-100 bg-black/25 px-2 py-0.5 rounded-lg border border-white/20">
              {speakerRole || dialogueTitle.split('•')[1]?.trim() || 'Astro-Komandan Misi Dirgantara'}
            </span>
          </div>

          {/* Spoken Dialogue Text - Enlarged & Tactile */}
          <div className="pt-2 sm:pt-3">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-relaxed sm:leading-relaxed md:leading-loose text-slate-800 tracking-tight">
              &ldquo;{speechText}&rdquo;
            </p>
          </div>

          {/* Mission Target Quest Pill */}
          {missionObjective && (
            <div className="mt-4 sm:mt-5 p-2.5 sm:p-3 rounded-2xl bg-purple-500/10 border-2 border-purple-400/50 flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-extrabold text-purple-950 shadow-2xs">
              <span className="px-2.5 py-1 rounded-xl bg-purple-600 text-white font-black text-[10px] sm:text-xs tracking-wider uppercase shrink-0 shadow-xs">
                🎯 Target Misi
              </span>
              <span className="font-bold text-slate-800 leading-snug">
                {missionObjective}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
