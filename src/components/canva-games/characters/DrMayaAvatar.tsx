import React from 'react';

export interface DrMayaAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  mood?: 'speaking' | 'explaining' | 'happy' | 'thinking';
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

export const DrMayaAvatar: React.FC<DrMayaAvatarProps> = ({
  size = 'md',
  mood = 'speaking',
  className = '',
}) => {
  const isSpeaking = mood === 'speaking' || mood === 'explaining';
  const sizeConfig = SIZE_MAP[size];

  return (
    <div className={`flex flex-col md:flex-row items-center gap-4 sm:gap-6 ${className}`}>
      {/* ANIMATED DR. MAYA SVG CHARACTER */}
      <div className={`relative shrink-0 ${sizeConfig.avatarBox} flex items-center justify-center select-none`}>
        {/* Ambient Halo Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400/25 via-cyan-300/20 to-emerald-400/25 blur-xl animate-pulse" />

        <svg
          viewBox="0 0 160 195"
          className="w-full h-full drop-shadow-xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>{`
            @keyframes mayaBreathe {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-3px) rotate(-0.3deg); }
            }
            @keyframes mayaBlink {
              0%, 94%, 98%, 100% { transform: scaleY(1); }
              96% { transform: scaleY(0.1); }
            }
            @keyframes mayaTalk {
              0%, 100% { transform: scaleY(0.7) translateY(0); }
              50% { transform: scaleY(1.3) translateY(0.5px); }
            }
            @keyframes goggleGlint {
              0%, 100% { opacity: 0.4; transform: translateX(-4px); }
              50% { opacity: 0.95; transform: translateX(4px); }
            }
            @keyframes miniFlaskBubble {
              0% { transform: translateY(0); opacity: 0; }
              50% { opacity: 0.9; }
              100% { transform: translateY(-12px); opacity: 0; }
            }
            .animate-maya-breathe {
              animation: mayaBreathe 3.4s ease-in-out infinite;
              transform-origin: bottom center;
            }
            .animate-maya-blink {
              animation: mayaBlink 4.4s infinite;
              transform-origin: 80px 72px;
            }
            .animate-maya-talk {
              animation: ${isSpeaking ? 'mayaTalk 0.32s ease-in-out infinite' : 'none'};
              transform-origin: 80px 84px;
            }
            .animate-goggle-glint {
              animation: goggleGlint 2.8s ease-in-out infinite;
            }
            .animate-flask-bubble-1 {
              animation: miniFlaskBubble 2s ease-in infinite;
            }
            .animate-flask-bubble-2 {
              animation: miniFlaskBubble 2.4s ease-in infinite 0.7s;
            }
          `}</style>

          <g className="animate-maya-breathe">
            {/* BACK HAIR (PONYTAIL) */}
            <g id="back-hair">
              {/* Ponytail Hair Tail swinging back */}
              <path
                d="M104 62 C125 65 138 85 134 115 C130 135 120 145 116 142 C120 125 122 100 108 82 Z"
                fill="#0f172a"
              />
              {/* Teal Ponytail Hairband */}
              <ellipse cx="108" cy="74" rx="4.5" ry="6.5" transform="rotate(25 108 74)" fill="#0d9488" stroke="#14b8a6" strokeWidth="1.2" />
            </g>

            {/* BODY / LAB COAT & FORENSIC ATTIRE */}
            <g id="body">
              {/* Lab Coat Shoulders */}
              <path
                d="M32 135 C32 118 55 110 80 110 C105 110 128 118 128 135 L132 195 L28 195 Z"
                fill="#f8fafc"
              />
              {/* Lab Coat Shading */}
              <path d="M28 160 L40 195 L28 195 Z" fill="#e2e8f0" />
              <path d="M132 160 L120 195 L132 195 Z" fill="#e2e8f0" />

              {/* Inner Scrub / High-Collar Shirt (Deep Teal) */}
              <path d="M66 110 L80 135 L94 110 Z" fill="#0f766e" stroke="#115e59" strokeWidth="1.5" />
              <path d="M72 110 L80 122 L88 110 Z" fill="#14b8a6" />

              {/* Lab Coat Lapels */}
              <path d="M48 112 L68 155 L68 195 L30 195 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              <path d="M112 112 L92 155 L92 195 L130 195 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />

              {/* Lab Coat Teal Collar Accent */}
              <path d="M48 112 L64 135 L56 140 Z" fill="#0d9488" />
              <path d="M112 112 L96 135 L104 140 Z" fill="#0d9488" />

              {/* Forensic Lanyard & ID Card (Left Chest) */}
              <g id="lanyard">
                <path d="M74 122 L72 150" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 1" />
                <rect x="64" y="150" width="18" height="24" rx="3" fill="#ffffff" stroke="#0d9488" strokeWidth="1.2" />
                <rect x="67" y="153" width="12" height="10" rx="1" fill="#0f766e" />
                <circle cx="73" cy="157" r="3" fill="#fde047" />
                <rect x="66" y="166" width="14" height="2" fill="#334155" />
                <rect x="66" y="170" width="9" height="1.5" fill="#64748b" />
              </g>

              {/* Breast Pocket with Pen & Micropipette (Right Chest) */}
              <g id="pocket">
                <rect x="94" y="145" width="20" height="22" rx="3" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
                {/* Digital Thermometer Pen */}
                <line x1="98" y1="138" x2="98" y2="150" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round" />
                <circle cx="98" cy="138" r="1.5" fill="#2dd4bf" />
                {/* Yellow Micropipette */}
                <line x1="104" y1="135" x2="104" y2="150" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="104" cy="135" r="1.8" fill="#fde047" />
              </g>

              {/* Left Hand Holding Mini Flask with Bubbles */}
              <g id="flask-hand" transform="translate(18, 142)">
                {/* Hand / Sleeve */}
                <path d="M14 -12 Q4 5 12 20 Q18 24 24 12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                {/* Glove (Nitrile Cyan) */}
                <circle cx="13" cy="18" r="6" fill="#06b6d4" />

                {/* Mini Conical Flask */}
                <path d="M9 14 L1 30 C-0.5 33 1.5 35 4 35 L22 35 C24.5 35 26.5 33 25 30 L17 14 Z" fill="#14b8a6" opacity="0.85" />
                <path d="M10 8 L10 14 L1 30 C-0.5 33 1.5 35 4 35 L22 35 C24.5 35 26.5 33 25 30 L16 14 L16 8 Z" stroke="#ccfbf1" strokeWidth="1.5" fill="none" />
                <ellipse cx="13" cy="8" rx="4" ry="1.5" stroke="#ccfbf1" strokeWidth="1.2" fill="#5eead4" />
                {/* Bubbles */}
                <circle cx="9" cy="28" r="1.5" fill="#ffffff" className="animate-flask-bubble-1" />
                <circle cx="17" cy="25" r="1.8" fill="#ffffff" className="animate-flask-bubble-2" />
              </g>
            </g>

            {/* NECK */}
            <rect x="72" y="96" width="16" height="18" rx="5" fill="#fbcfe8" />
            <path d="M72 104 Q80 108 88 104 L88 114 L72 114 Z" fill="#f472b6" opacity="0.15" />

            {/* HEAD / FACE */}
            <g id="head">
              {/* Head Base Hair */}
              <path
                d="M48 64 C46 44 58 32 80 32 C102 32 114 44 112 64 C112 84 104 102 80 102 C56 102 48 84 48 64 Z"
                fill="#0f172a"
              />
              {/* Ears */}
              <circle cx="49" cy="72" r="5.5" fill="#fbcfe8" />
              <circle cx="111" cy="72" r="5.5" fill="#fbcfe8" />
              {/* Earring (Micro Pearl) */}
              <circle cx="49" cy="75" r="1.5" fill="#2dd4bf" />
              <circle cx="111" cy="75" r="1.5" fill="#2dd4bf" />

              {/* Face Contour */}
              <path
                d="M53 62 C53 48 63 42 80 42 C97 42 107 48 107 62 C107 80 97 96 80 96 C63 96 53 80 53 62 Z"
                fill="#fde68a"
              />

              {/* Stylish Bangs Hair Fringe */}
              <path
                d="M51 54 Q65 62 76 52 Q88 64 102 52 Q108 58 107 64 Q95 40 80 40 Q60 40 51 54 Z"
                fill="#0f172a"
              />

              {/* Intelligent Eyebrows */}
              <path d="M61 60 Q68 57 74 61" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              <path d="M86 61 Q92 57 99 60" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />

              {/* Blinking Intelligent Dark Eyes */}
              <g className="animate-maya-blink">
                {/* Left Eye */}
                <ellipse cx="68" cy="70" rx="4.5" ry="5" fill="#0f172a" />
                <circle cx="69.5" cy="68.5" r="1.8" fill="#ffffff" />
                <circle cx="66.5" cy="71.5" r="0.8" fill="#5eead4" />
                {/* Right Eye */}
                <ellipse cx="92" cy="70" rx="4.5" ry="5" fill="#0f172a" />
                <circle cx="93.5" cy="68.5" r="1.8" fill="#ffffff" />
                <circle cx="90.5" cy="71.5" r="0.8" fill="#5eead4" />
              </g>

              {/* Rosy Scientist Cheeks */}
              <ellipse cx="62" cy="76" rx="4" ry="2.5" fill="#fca5a5" opacity="0.6" />
              <ellipse cx="98" cy="76" rx="4" ry="2.5" fill="#fca5a5" opacity="0.6" />

              {/* Gentle Nose */}
              <path d="M80 69 Q82 74 79 75" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" fill="none" />

              {/* Speaking / Warm Smile Mouth */}
              <g className="animate-maya-talk">
                {isSpeaking ? (
                  <path
                    d="M73 82 Q80 89 87 82 Q80 86 73 82 Z"
                    fill="#be123c"
                    stroke="#881337"
                    strokeWidth="1.2"
                  />
                ) : (
                  <path
                    d="M74 81 Q80 86 86 81"
                    stroke="#991b1b"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </g>

              {/* FORENSIC PROTECTIVE SAFETY GOGGLES (CYAN / TEAL TINTED) */}
              <g id="safety-goggles" transform="translate(0, 0)">
                {/* Goggle Frame */}
                <path
                  d="M55 64 Q68 62 76 66 Q80 68 84 66 Q92 62 105 64 Q108 72 104 77 Q92 81 84 75 Q80 73 76 75 Q68 81 56 77 Q52 72 55 64 Z"
                  fill="#06b6d4"
                  fillOpacity="0.25"
                  stroke="#0891b2"
                  strokeWidth="2"
                />
                {/* Goggle Nose Bridge */}
                <path d="M76 66 Q80 64 84 66" stroke="#0e7490" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Left Lens Glint */}
                <g className="animate-goggle-glint">
                  <line x1="58" y1="67" x2="68" y2="75" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
                  <line x1="64" y1="66" x2="71" y2="72" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                </g>
                {/* Right Lens Glint */}
                <g className="animate-goggle-glint">
                  <line x1="92" y1="67" x2="102" y2="75" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
                  <line x1="98" y1="66" x2="105" y2="72" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                </g>
                {/* Goggle Side Straps */}
                <path d="M55 68 L48 69" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M105 68 L112 69" stroke="#0891b2" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
