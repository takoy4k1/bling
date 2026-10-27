import React from 'react';
import { CharacterCustomization } from '../types';

interface CharacterAvatarProps {
  customization: CharacterCustomization;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBackground?: boolean;
  interactive?: boolean;
  animate?: boolean;
}

const backgroundGradients: Record<string, string> = {
  'cherry-cloud': 'linear-gradient(135deg, #ffd1dc 0%, #ffe6eb 50%, #fbcfe8 100%)',
  'lavender-bedroom': 'linear-gradient(135deg, #e0e7ff 0%, #f5d0fe 50%, #ede9fe 100%)',
  'cozy-study': 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecdd3 100%)',
  'starlit-garden': 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
  'cyber-arcade': 'linear-gradient(135deg, #09090b 0%, #3b0764 50%, #831843 100%)',
  'lofi-cafe': 'linear-gradient(135deg, #fdf2f8 0%, #fae8ff 50%, #f5e0dc 100%)',
};

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  customization,
  size = 'md',
  showBackground = true,
  animate = true,
}) => {
  const {
    skinTone = '#fcd34d',
    hairColor = '#4a2810',
    hairStyle = 'long-waves',
    eyeColor = '#3b82f6',
    eyeStyle = 'sparkle',
    outfit = 'ribbon-cardigan',
    accessory = 'ribbon-bow',
    pet = 'bunny',
    expression = 'happy',
    background = 'cherry-cloud',
  } = customization;

  const sizePixels = {
    sm: 70,
    md: 130,
    lg: 200,
    xl: 280,
  }[size];

  const bgStyle = showBackground
    ? { background: backgroundGradients[background] || backgroundGradients['cherry-cloud'] }
    : { background: 'transparent' };

  return (
    <div
      className={`character-avatar-container relative inline-flex items-center justify-center rounded-3xl overflow-hidden select-none transition-transform duration-300 ${
        animate ? 'hover:scale-[1.03]' : ''
      }`}
      style={{
        width: sizePixels,
        height: sizePixels,
        ...bgStyle,
        boxShadow: showBackground ? '0 10px 25px -5px rgba(244, 114, 182, 0.25), 0 8px 10px -6px rgba(244, 114, 182, 0.2)' : 'none',
        border: showBackground ? '3px solid rgba(255, 255, 255, 0.8)' : 'none',
      }}
    >
      {/* Decorative stars/sparkles in background if large/xl */}
      {showBackground && (size === 'lg' || size === 'xl') && (
        <>
          <div className="absolute top-2 left-4 text-xs animate-pulse opacity-70">✨</div>
          <div className="absolute top-8 right-3 text-xs animate-bounce opacity-60">⭐</div>
          <div className="absolute bottom-6 left-3 text-xs opacity-50">🌸</div>
        </>
      )}

      {/* SVG Layered Doll */}
      <svg
        viewBox="0 0 200 220"
        className={`w-full h-full drop-shadow-sm ${animate ? 'animate-breathe' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ff4d6d" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- BACK HAIR --- */}
        {hairStyle === 'long-waves' && (
          <path
            d="M 60,85 C 40,110 30,165 45,195 C 55,200 70,185 70,170 C 70,140 75,110 80,95 Z 
               M 140,85 C 160,110 170,165 155,195 C 145,200 130,185 130,170 C 130,140 125,110 120,95 Z"
            fill={hairColor}
          />
        )}
        {hairStyle === 'twin-buns' && (
          <g fill={hairColor}>
            <circle cx="50" cy="55" r="24" />
            <circle cx="150" cy="55" r="24" />
            {/* Bun ribbons */}
            <circle cx="58" cy="62" r="5" fill="#f43f5e" />
            <circle cx="142" cy="62" r="5" fill="#f43f5e" />
          </g>
        )}
        {hairStyle === 'afro-puffs' && (
          <g fill={hairColor}>
            <circle cx="45" cy="65" r="30" />
            <circle cx="155" cy="65" r="30" />
          </g>
        )}
        {hairStyle === 'ponytail' && (
          <path
            d="M 125,75 C 160,75 185,100 175,160 C 160,165 145,140 145,110 Z"
            fill={hairColor}
          />
        )}

        {/* --- BODY / NECK --- */}
        <rect x="90" y="118" width="20" height="20" rx="6" fill={skinTone} />

        {/* --- TORSO & OUTFIT BASE --- */}
        {outfit === 'cozy-knit' && (
          <g>
            <path
              d="M 65,138 C 75,128 125,128 135,138 L 148,205 C 148,212 140,218 130,218 L 70,218 C 60,218 52,212 52,205 Z"
              fill="#fed7aa"
            />
            {/* Knit texture & collar */}
            <path d="M 85,132 Q 100,144 115,132" stroke="#ea580c" strokeWidth="3" fill="none" />
            <line x1="100" y1="140" x2="100" y2="215" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 3" />
          </g>
        )}
        {outfit === 'ribbon-cardigan' && (
          <g>
            <path
              d="M 65,138 C 75,128 125,128 135,138 L 148,205 C 148,212 140,218 130,218 L 70,218 C 60,218 52,212 52,205 Z"
              fill="#fda4af"
            />
            {/* Inner shirt */}
            <path d="M 85,132 Q 100,150 115,132" fill="#ffffff" />
            {/* Dainty ribbons */}
            <circle cx="100" cy="155" r="3" fill="#e11d48" />
            <circle cx="100" cy="175" r="3" fill="#e11d48" />
            <circle cx="100" cy="195" r="3" fill="#e11d48" />
            {/* Ribbon tie */}
            <path d="M 95,145 C 90,140 100,138 100,145 C 100,138 110,140 105,145" fill="#e11d48" />
          </g>
        )}
        {outfit === 'y2k-tracksuit' && (
          <g>
            <path
              d="M 65,138 C 75,128 125,128 135,138 L 148,205 C 148,212 140,218 130,218 L 70,218 C 60,218 52,212 52,205 Z"
              fill="#a855f7"
            />
            <path d="M 65,142 L 54,205" stroke="#ffffff" strokeWidth="4" />
            <path d="M 135,142 L 146,205" stroke="#ffffff" strokeWidth="4" />
            <line x1="100" y1="134" x2="100" y2="218" stroke="#fdf4ff" strokeWidth="2" />
          </g>
        )}
        {outfit === 'celestial-gown' && (
          <g>
            <path
              d="M 65,138 C 75,128 125,128 135,138 L 152,210 C 152,216 135,220 100,220 C 65,220 48,216 48,210 Z"
              fill="#312e81"
            />
            <circle cx="85" cy="165" r="2" fill="#fbbf24" />
            <circle cx="115" cy="180" r="2.5" fill="#e0e7ff" />
            <circle cx="100" cy="195" r="2" fill="#fbbf24" />
            <path d="M 88,135 Q 100,145 112,135" stroke="#fbbf24" strokeWidth="2" fill="none" />
          </g>
        )}
        {outfit === 'school-blazer' && (
          <g>
            <path
              d="M 65,138 C 75,128 125,128 135,138 L 148,205 L 70,205 Z"
              fill="#1e293b"
            />
            <polygon points="100,135 90,155 100,180 110,155" fill="#be123c" />
            <polygon points="90,132 100,145 110,132" fill="#ffffff" />
          </g>
        )}
        {outfit === 'fairy-dress' && (
          <g>
            <path
              d="M 68,138 C 78,130 122,130 132,138 L 155,215 C 130,222 70,222 45,215 Z"
              fill="#86efac"
              opacity="0.9"
            />
            <path d="M 80,145 Q 100,165 120,145" fill="#fef08a" />
          </g>
        )}

        {/* --- HEAD / FACE --- */}
        <ellipse cx="100" cy="85" rx="38" ry="42" fill={skinTone} />

        {/* Blush */}
        <circle cx="76" cy="98" r="10" fill="url(#blushGrad)" />
        <circle cx="124" cy="98" r="10" fill="url(#blushGrad)" />

        {/* Ears */}
        <circle cx="62" cy="88" r="7" fill={skinTone} />
        <circle cx="138" cy="88" r="7" fill={skinTone} />

        {/* --- EYES --- */}
        {eyeStyle === 'sparkle' && (
          <g>
            {/* Left Eye */}
            <ellipse cx="83" cy="84" rx="7" ry="9" fill="#18181b" />
            <circle cx="83" cy="84" rx="5" ry="7" fill={eyeColor} />
            <circle cx="81" cy="81" r="2.8" fill="#ffffff" />
            <circle cx="85" cy="88" r="1.4" fill="#ffffff" />
            <path d="M 75,74 Q 83,70 91,74" stroke="#4b5563" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Right Eye */}
            <ellipse cx="117" cy="84" rx="7" ry="9" fill="#18181b" />
            <circle cx="117" cy="84" rx="5" ry="7" fill={eyeColor} />
            <circle cx="115" cy="81" r="2.8" fill="#ffffff" />
            <circle cx="119" cy="88" r="1.4" fill="#ffffff" />
            <path d="M 109,74 Q 117,70 125,74" stroke="#4b5563" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>
        )}
        {eyeStyle === 'gentle' && (
          <g>
            <path d="M 76,83 Q 83,89 90,83" stroke="#27272a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 110,83 Q 117,89 124,83" stroke="#27272a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 75,75 Q 83,72 91,75" stroke="#52525b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 109,75 Q 117,72 125,75" stroke="#52525b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        )}
        {eyeStyle === 'starry' && (
          <g>
            <circle cx="83" cy="84" r="8" fill="#1e1b4b" />
            <circle cx="117" cy="84" r="8" fill="#1e1b4b" />
            <polygon points="83,79 84.5,83 89,84 84.5,85 83,89 81.5,85 77,84 81.5,83" fill="#fef08a" />
            <polygon points="117,79 118.5,83 123,84 118.5,85 117,89 115.5,85 111,84 115.5,83" fill="#fef08a" />
          </g>
        )}
        {eyeStyle === 'cat-eye' && (
          <g>
            <ellipse cx="83" cy="84" rx="7" ry="8" fill={eyeColor} />
            <ellipse cx="117" cy="84" rx="7" ry="8" fill={eyeColor} />
            <line x1="83" y1="78" x2="83" y2="90" stroke="#09090b" strokeWidth="2.5" />
            <line x1="117" y1="78" x2="117" y2="90" stroke="#09090b" strokeWidth="2.5" />
            <path d="M 74,80 Q 83,74 92,80 L 95,76" stroke="#09090b" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 108,80 Q 117,74 126,80 L 129,76" stroke="#09090b" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}
        {eyeStyle === 'sleepy' && (
          <g>
            <line x1="76" y1="84" x2="90" y2="84" stroke="#27272a" strokeWidth="3" strokeLinecap="round" />
            <line x1="110" y1="84" x2="124" y2="84" stroke="#27272a" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* Small Cute Nose */}
        <circle cx="100" cy="94" r="1.5" fill="#f43f5e" opacity="0.6" />

        {/* --- MOUTH / EXPRESSION --- */}
        {expression === 'happy' && (
          <path d="M 94,102 Q 100,109 106,102" stroke="#e11d48" strokeWidth="2.2" fill="#fda4af" strokeLinecap="round" />
        )}
        {expression === 'proud' && (
          <path d="M 93,101 Q 100,107 107,101" stroke="#be123c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {expression === 'sparkle' && (
          <g>
            <path d="M 93,101 Q 100,111 107,101 Z" fill="#e11d48" />
            <path d="M 96,102 Q 100,105 104,102" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          </g>
        )}
        {expression === 'determined' && (
          <path d="M 94,104 L 106,104" stroke="#be123c" strokeWidth="2.2" strokeLinecap="round" />
        )}
        {expression === 'sleepy' && (
          <ellipse cx="100" cy="103" rx="3.5" ry="4" fill="#fda4af" stroke="#e11d48" strokeWidth="1.5" />
        )}

        {/* --- FRONT HAIR / BANGS --- */}
        {hairStyle === 'bob' && (
          <g fill={hairColor}>
            <path d="M 60,70 C 60,40 140,40 140,70 C 145,95 135,115 130,118 C 125,95 110,85 100,85 C 90,85 75,95 70,118 C 65,115 55,95 60,70 Z" />
          </g>
        )}
        {hairStyle === 'long-waves' && (
          <g fill={hairColor}>
            <path d="M 60,68 C 60,35 140,35 140,68 C 140,75 130,82 118,80 C 105,78 95,78 82,80 C 70,82 60,75 60,68 Z" />
            {/* Side bangs */}
            <path d="M 62,70 C 58,95 62,125 68,135 C 72,125 72,95 70,75 Z" />
            <path d="M 138,70 C 142,95 138,125 132,135 C 128,125 128,95 130,75 Z" />
          </g>
        )}
        {hairStyle === 'twin-buns' && (
          <g fill={hairColor}>
            <path d="M 62,70 C 62,40 138,40 138,70 C 130,78 115,80 100,80 C 85,80 70,78 62,70 Z" />
            <path d="M 62,70 C 60,88 64,105 68,110 C 70,100 70,85 68,72 Z" />
            <path d="M 138,70 C 140,88 136,105 132,110 C 130,100 130,85 132,72 Z" />
          </g>
        )}
        {hairStyle === 'afro-puffs' && (
          <g fill={hairColor}>
            <path d="M 65,72 C 65,45 135,45 135,72 C 125,78 100,80 75,78 Z" />
          </g>
        )}
        {hairStyle === 'wolf-cut' && (
          <g fill={hairColor}>
            <path d="M 60,65 C 60,35 140,35 140,65 L 145,85 L 135,85 L 140,105 L 130,100 L 125,120 L 115,100 L 100,82 L 85,100 L 75,120 L 70,100 L 60,105 L 65,85 L 55,85 Z" />
          </g>
        )}
        {hairStyle === 'ponytail' && (
          <g fill={hairColor}>
            <path d="M 62,68 C 62,38 138,38 138,68 C 128,78 115,82 100,82 C 85,82 72,78 62,68 Z" />
            <path d="M 63,70 L 66,100 L 72,76 Z" />
            <path d="M 137,70 L 134,100 L 128,76 Z" />
          </g>
        )}

        {/* --- ACCESSORIES --- */}
        {accessory === 'ribbon-bow' && (
          <g transform="translate(100, 48)">
            {/* Center knot */}
            <circle cx="0" cy="0" r="5" fill="#f43f5e" />
            {/* Left loop */}
            <path d="M -2,-2 C -18,-15 -22,8 -4,3 Z" fill="#fb7185" />
            {/* Right loop */}
            <path d="M 2,-2 C 18,-15 22,8 4,3 Z" fill="#fb7185" />
            {/* Ribbons */}
            <path d="M -3,3 Q -10,20 -15,25" stroke="#f43f5e" strokeWidth="2.5" fill="none" />
            <path d="M 3,3 Q 10,20 15,25" stroke="#f43f5e" strokeWidth="2.5" fill="none" />
          </g>
        )}
        {accessory === 'angel-wings' && (
          <g transform="translate(100, 150)" opacity="0.9">
            <path
              d="M -35,-10 C -70,-50 -95,-20 -70,10 C -55,25 -40,10 -35,5 Z"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="2"
            />
            <path
              d="M 35,-10 C 70,-50 95,-20 70,10 C 55,25 40,10 35,5 Z"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="2"
            />
          </g>
        )}
        {accessory === 'star-clips' && (
          <g>
            <polygon points="68,60 70,64 74,65 71,68 72,72 68,70 64,72 65,68 62,65 66,64" fill="#fbbf24" />
            <polygon points="132,60 134,64 138,65 135,68 136,72 132,70 128,72 129,68 126,65 130,64" fill="#fbbf24" />
          </g>
        )}
        {accessory === 'wire-glasses' && (
          <g stroke="#eab308" strokeWidth="2" fill="rgba(255,255,255,0.25)">
            <circle cx="83" cy="84" r="11" />
            <circle cx="117" cy="84" r="11" />
            <line x1="94" y1="84" x2="106" y2="84" strokeWidth="2" />
          </g>
        )}
        {accessory === 'headphones' && (
          <g>
            <path d="M 60,82 C 55,40 145,40 140,82" stroke="#ec4899" strokeWidth="5" fill="none" strokeLinecap="round" />
            <rect x="54" y="75" width="10" height="20" rx="5" fill="#f472b6" />
            <rect x="136" y="75" width="10" height="20" rx="5" fill="#f472b6" />
          </g>
        )}
        {accessory === 'tiara' && (
          <g transform="translate(100, 48)">
            <path d="M -25,2 L -20,-12 L -8,-4 L 0,-18 L 8,-4 L 20,-12 L 25,2 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
            <circle cx="0" cy="-8" r="3" fill="#e11d48" />
            <circle cx="-14" cy="-5" r="2" fill="#3b82f6" />
            <circle cx="14" cy="-5" r="2" fill="#3b82f6" />
          </g>
        )}

        {/* --- COMPANION / PET --- */}
        {pet === 'bunny' && (
          <g transform="translate(150, 165)">
            {/* Bunny ears */}
            <ellipse cx="-4" cy="-14" rx="4" ry="10" fill="#ffffff" stroke="#fecdd3" strokeWidth="1" />
            <ellipse cx="6" cy="-14" rx="4" ry="10" fill="#ffffff" stroke="#fecdd3" strokeWidth="1" />
            <ellipse cx="-4" cy="-14" rx="2" ry="6" fill="#fb7185" />
            <ellipse cx="6" cy="-14" rx="2" ry="6" fill="#fb7185" />
            {/* Bunny body */}
            <circle cx="0" cy="5" r="16" fill="#ffffff" />
            {/* Bunny cheeks & eyes */}
            <circle cx="-5" cy="4" r="1.8" fill="#1e293b" />
            <circle cx="5" cy="4" r="1.8" fill="#1e293b" />
            <circle cx="-7" cy="8" r="3" fill="#fecdd3" />
            <circle cx="7" cy="8" r="3" fill="#fecdd3" />
            <polygon points="0,6 -2,8 2,8" fill="#f43f5e" />
          </g>
        )}
        {pet === 'cat' && (
          <g transform="translate(150, 168)">
            <polygon points="-12,-8 -16,-20 -6,-12" fill="#38bdf8" />
            <polygon points="12,-8 16,-20 6,-12" fill="#38bdf8" />
            <circle cx="0" cy="5" r="15" fill="#38bdf8" />
            <circle cx="-5" cy="3" r="2" fill="#0f172a" />
            <circle cx="5" cy="3" r="2" fill="#0f172a" />
            <path d="M -3,8 Q 0,11 3,8" stroke="#0f172a" strokeWidth="1.5" fill="none" />
          </g>
        )}
        {pet === 'shiba' && (
          <g transform="translate(150, 168)">
            <polygon points="-12,-8 -16,-18 -6,-12" fill="#d97706" />
            <polygon points="12,-8 16,-18 6,-12" fill="#d97706" />
            <circle cx="0" cy="5" r="15" fill="#f59e0b" />
            <ellipse cx="0" cy="8" rx="8" ry="6" fill="#fffbeb" />
            <circle cx="-5" cy="3" r="1.8" fill="#1e293b" />
            <circle cx="5" cy="3" r="1.8" fill="#1e293b" />
            <ellipse cx="0" cy="6" rx="2" ry="1.5" fill="#1e293b" />
          </g>
        )}
        {pet === 'dragon-chibi' && (
          <g transform="translate(150, 165)">
            <path d="M 8,-12 Q 18,-20 12,-4" fill="#a855f7" />
            <circle cx="0" cy="5" r="15" fill="#c084fc" />
            <circle cx="-5" cy="3" r="2" fill="#581c87" />
            <circle cx="5" cy="3" r="2" fill="#581c87" />
            <polygon points="0,5 -3,8 3,8" fill="#f43f5e" />
          </g>
        )}
        {pet === 'ghostie' && (
          <g transform="translate(150, 165)">
            <path
              d="M -12,18 C -12,0 12,0 12,18 C 8,16 4,20 0,16 C -4,20 -8,16 -12,18 Z"
              fill="#f1f5f9"
              opacity="0.9"
            />
            <circle cx="-4" cy="8" r="1.8" fill="#1e293b" />
            <circle cx="4" cy="8" r="1.8" fill="#1e293b" />
            <circle cx="-6" cy="11" r="2" fill="#fda4af" />
            <circle cx="6" cy="11" r="2" fill="#fda4af" />
          </g>
        )}
      </svg>
    </div>
  );
};
