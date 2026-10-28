import React from 'react';

// 90s Retro Memphis Wish Jar Icon (Filled with Glowing Stars)
export const StarJarIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Jar Cork Top */}
    <rect x="36" y="8" width="28" height="10" rx="3" fill="#D4A373" stroke="#2A2B70" strokeWidth="4" />
    {/* Jar Lip */}
    <rect x="30" y="16" width="40" height="8" rx="3" fill="#E0E1DD" stroke="#2A2B70" strokeWidth="4" />
    {/* Jar Neck */}
    <rect x="34" y="22" width="32" height="10" fill="#E8F1F5" stroke="#2A2B70" strokeWidth="4" />
    {/* Jar Body */}
    <path d="M22 32 C15 45 15 100 25 108 C35 114 65 114 75 108 C85 100 85 45 78 32 Z" fill="#E8F1F5" fillOpacity="0.85" stroke="#2A2B70" strokeWidth="5" />
    {/* Jar Glass Highlight */}
    <path d="M28 42 C24 55 24 90 32 100" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
    {/* Stars Inside Jar */}
    {/* Large Central Yellow Star */}
    <path d="M50 50 L53 62 L65 62 L55 69 L59 80 L50 73 L41 80 L45 69 L35 62 L47 62 Z" fill="#FFE600" stroke="#2A2B70" strokeWidth="2.5" />
    {/* Small Pink Star */}
    <path d="M36 42 L38 48 L44 48 L39 51 L41 57 L36 53 L31 57 L33 51 L28 48 L34 48 Z" fill="#FF6584" stroke="#2A2B70" strokeWidth="2" />
    {/* Small Cyan Star */}
    <path d="M64 80 L66 85 L71 85 L67 88 L68 93 L64 90 L60 93 L61 88 L57 85 L62 85 Z" fill="#00E5FF" stroke="#2A2B70" strokeWidth="2" />
    {/* Floating Magic Sparkles */}
    <circle cx="20" cy="24" r="3" fill="#FFE600" />
    <circle cx="80" cy="28" r="4" fill="#FF6584" />
    <circle cx="82" cy="70" r="3" fill="#00E5FF" />
  </svg>
);

// 90s Retro Memphis Donut Icon
export const DonutIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base Dough */}
    <circle cx="50" cy="50" r="42" fill="#F4A261" stroke="#2A2B70" strokeWidth="5" />
    {/* Pink Icing */}
    <path
      d="M50 8C70 8 90 22 90 48C90 56 86 64 80 68C74 72 70 65 62 65C54 65 52 75 42 75C32 75 30 68 22 68C14 68 10 58 10 48C10 22 30 8 50 8Z"
      fill="#FF6584"
      stroke="#2A2B70"
      strokeWidth="4"
    />
    {/* Center Hole */}
    <circle cx="50" cy="50" r="16" fill="#484bbd" stroke="#2A2B70" strokeWidth="5" />
    {/* Sprinkles */}
    <rect x="35" y="22" width="10" height="4" rx="2" fill="#FFE600" transform="rotate(25 35 22)" />
    <rect x="60" y="24" width="10" height="4" rx="2" fill="#00E5FF" transform="rotate(-15 60 24)" />
    <rect x="72" y="42" width="10" height="4" rx="2" fill="#FFFFFF" transform="rotate(60 72 42)" />
    <rect x="22" y="45" width="10" height="4" rx="2" fill="#FFE600" transform="rotate(-40 22 45)" />
    <rect x="42" y="70" width="10" height="4" rx="2" fill="#00E5FF" transform="rotate(10 42 70)" />
  </svg>
);

// 90s Retro Memphis Birthday Cake Icon (with Lit Candles & Glowing Flames)
export const BirthdayCakeIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Lit Candle Flames with Glow */}
    {/* Left Flame */}
    <path d="M30 14 C28 9 32 4 33 2 C34 4 38 9 36 14 C35 16 31 16 30 14 Z" fill="#FFE600" stroke="#FF6584" strokeWidth="1.5" />
    <circle cx="33" cy="11" r="2.5" fill="#FFFFFF" />
    {/* Center Flame */}
    <path d="M49 10 C47 5 51 1 52 0 C53 1 57 5 55 10 C54 13 50 13 49 10 Z" fill="#FFE600" stroke="#FF6584" strokeWidth="1.5" />
    <circle cx="52" cy="7" r="3" fill="#FFFFFF" />
    {/* Right Flame */}
    <path d="M68 14 C66 9 70 4 71 2 C72 4 76 9 74 14 C73 16 69 16 68 14 Z" fill="#FFE600" stroke="#FF6584" strokeWidth="1.5" />
    <circle cx="71" cy="11" r="2.5" fill="#FFFFFF" />

    {/* Candle Wicks */}
    <line x1="33" y1="14" x2="33" y2="18" stroke="#2A2B70" strokeWidth="2" />
    <line x1="52" y1="11" x2="52" y2="15" stroke="#2A2B70" strokeWidth="2" />
    <line x1="71" y1="14" x2="71" y2="18" stroke="#2A2B70" strokeWidth="2" />

    {/* Candles */}
    {/* Left Candle */}
    <rect x="30" y="18" width="6" height="18" rx="2" fill="#00E5FF" stroke="#2A2B70" strokeWidth="2.5" />
    <line x1="30" y1="23" x2="36" y2="21" stroke="#FFFFFF" strokeWidth="1.5" />
    <line x1="30" y1="29" x2="36" y2="27" stroke="#FFFFFF" strokeWidth="1.5" />
    {/* Center Candle */}
    <rect x="49" y="15" width="6" height="21" rx="2" fill="#FFE600" stroke="#2A2B70" strokeWidth="2.5" />
    <line x1="49" y1="21" x2="55" y2="19" stroke="#FF6584" strokeWidth="1.5" />
    <line x1="49" y1="28" x2="55" y2="26" stroke="#FF6584" strokeWidth="1.5" />
    {/* Right Candle */}
    <rect x="68" y="18" width="6" height="18" rx="2" fill="#FF6584" stroke="#2A2B70" strokeWidth="2.5" />
    <line x1="68" y1="23" x2="74" y2="21" stroke="#FFFFFF" strokeWidth="1.5" />
    <line x1="68" y1="29" x2="74" y2="27" stroke="#FFFFFF" strokeWidth="1.5" />

    {/* Top Cake Tier */}
    <rect x="22" y="36" width="56" height="28" rx="6" fill="#FF6584" stroke="#2A2B70" strokeWidth="4" />
    {/* Top Icing drips */}
    <path d="M22 42 C26 47 30 47 34 42 C38 47 42 47 46 42 C50 47 54 47 58 42 C62 47 66 47 70 42 C74 47 78 42 78 42" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" />

    {/* Bottom Cake Tier */}
    <rect x="12" y="64" width="76" height="38" rx="8" fill="#7C69EF" stroke="#2A2B70" strokeWidth="4.5" />
    {/* Middle Icing Line */}
    <path d="M12 70 C18 78 24 78 30 70 C36 78 42 78 48 70 C54 78 60 78 66 70 C72 78 78 78 84 70 C88 75 88 70 88 70" stroke="#FFE600" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Decorative Sprinkles on Bottom Tier */}
    <rect x="24" y="84" width="7" height="3" rx="1.5" fill="#00E5FF" transform="rotate(20 24 84)" />
    <rect x="42" y="86" width="7" height="3" rx="1.5" fill="#FFFFFF" transform="rotate(-15 42 86)" />
    <rect x="62" y="82" width="7" height="3" rx="1.5" fill="#FFE600" transform="rotate(30 62 82)" />
    <rect x="74" y="87" width="7" height="3" rx="1.5" fill="#FF6584" transform="rotate(-25 74 87)" />

    {/* Cake Plate / Stand */}
    <path d="M6 102 L94 102 C94 106 90 110 84 110 L16 110 C10 110 6 106 6 102 Z" fill="#E8F1F5" stroke="#2A2B70" strokeWidth="4" />
  </svg>
);

// 90s Retro VHS Tape Icon
export const VhsIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Outer Shell */}
    <rect x="8" y="10" width="84" height="100" rx="10" fill="#7C69EF" stroke="#2A2B70" strokeWidth="5" />
    {/* Front Label window */}
    <rect x="18" y="20" width="64" height="70" rx="6" fill="#F8F9FA" stroke="#2A2B70" strokeWidth="4" />
    {/* Top Black Bar */}
    <rect x="18" y="20" width="64" height="24" rx="4" fill="#2A2B70" />
    {/* Reels */}
    <circle cx="36" cy="62" r="14" fill="#2A2B70" />
    <circle cx="36" cy="62" r="6" fill="#FFFFFF" />
    <circle cx="64" cy="62" r="14" fill="#2A2B70" />
    <circle cx="64" cy="62" r="6" fill="#FFFFFF" />
    {/* Yellow Side Stripe */}
    <rect x="70" y="20" width="12" height="70" rx="2" fill="#FFE600" stroke="#2A2B70" strokeWidth="3" />
  </svg>
);

// 90s Retro Memphis Letter Envelope Icon (with Heart Wax Seal & Postage Stamp)
export const LetterEnvelopeIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Envelope Body */}
    <rect x="8" y="15" width="104" height="72" rx="8" fill="#FFF4D2" stroke="#2A2B70" strokeWidth="4.5" />
    
    {/* Inner Letter Paper Peeking Out */}
    <path d="M22 15 L22 8 C22 5 25 3 28 3 L92 3 C95 3 98 5 98 8 L98 15 Z" fill="#FFFFFF" stroke="#2A2B70" strokeWidth="3" />
    <line x1="32" y1="9" x2="88" y2="9" stroke="#FF6584" strokeWidth="2" strokeLinecap="round" />

    {/* Fold Lines */}
    <path d="M8 15 L60 58 L112 15" stroke="#2A2B70" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 87 L48 50" stroke="#2A2B70" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M112 87 L72 50" stroke="#2A2B70" strokeWidth="3.5" strokeLinecap="round" />

    {/* Retro Postage Stamp */}
    <rect x="84" y="24" width="20" height="24" rx="2" fill="#00E5FF" stroke="#2A2B70" strokeWidth="2.5" />
    <circle cx="94" cy="36" r="5" fill="#FFE600" />

    {/* Red / Pink Heart Wax Seal */}
    <circle cx="60" cy="58" r="14" fill="#FF6584" stroke="#2A2B70" strokeWidth="3.5" />
    <path d="M60 64 C60 64 54 59 54 55 C54 52.5 56 51 58 51 C59.2 51 60 52 60 52 C60 52 60.8 51 62 51 C64 51 66 52.5 66 55 C66 59 60 64 60 64 Z" fill="#FFFFFF" />

    {/* Sparkle Glint */}
    <circle cx="16" cy="22" r="2.5" fill="#FFE600" />
    <circle cx="106" cy="78" r="3" fill="#00E5FF" />
  </svg>
);

// 90s Retro Soda Drink Cup Icon
export const SodaIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pink Straw */}
    <path d="M48 30 L65 5 L80 5" stroke="#FF6584" strokeWidth="8" strokeLinecap="round" />
    <path d="M48 30 L65 5 L80 5" stroke="#2A2B70" strokeWidth="2" strokeLinecap="round" />
    {/* Cup Lid */}
    <rect x="20" y="25" width="60" height="10" rx="5" fill="#FFFFFF" stroke="#2A2B70" strokeWidth="4" />
    {/* Cup Body */}
    <path d="M25 35 L32 105 C32 108 35 110 40 110 L60 110 C65 110 68 108 68 105 L75 35 Z" fill="#7C69EF" stroke="#2A2B70" strokeWidth="5" />
    {/* Cup Pattern Stripes */}
    <path d="M27 50 L73 50 L71 70 L29 70 Z" fill="#FFE600" />
    <path d="M29 70 L71 70 L69 90 L31 90 Z" fill="#FF6584" />
  </svg>
);

// 90s Retro Cassette Tape Icon
export const CassetteIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cassette Body */}
    <rect x="5" y="5" width="110" height="70" rx="8" fill="#FF6584" stroke="#2A2B70" strokeWidth="5" />
    {/* Label Area */}
    <rect x="15" y="15" width="90" height="42" rx="4" fill="#FFFFFF" stroke="#2A2B70" strokeWidth="3" />
    <rect x="15" y="15" width="90" height="14" fill="#00E5FF" />
    {/* Reel Window */}
    <rect x="30" y="32" width="60" height="20" rx="10" fill="#FFE600" stroke="#2A2B70" strokeWidth="3" />
    {/* Left & Right Reels */}
    <circle cx="44" cy="42" r="7" fill="#2A2B70" />
    <circle cx="44" cy="42" r="3" fill="#FFFFFF" />
    <circle cx="76" cy="42" r="7" fill="#2A2B70" />
    <circle cx="76" cy="42" r="3" fill="#FFFFFF" />
    {/* Bottom Screws */}
    <circle cx="15" cy="68" r="2" fill="#2A2B70" />
    <circle cx="105" cy="68" r="2" fill="#2A2B70" />
  </svg>
);

// Pixel Cursor Arrow Icon
export const PixelCursorIcon: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 5 L5 32 L13 24 L20 35 L25 32 L18 21 L28 21 Z"
      fill="#FFFFFF"
      stroke="#2A2B70"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

// Yellow Smiley Badge Icon
export const SmileyBadgeIcon: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="26" fill="#FFE600" stroke="#2A2B70" strokeWidth="4" />
    {/* Eyes */}
    <circle cx="21" cy="22" r="3.5" fill="#2A2B70" />
    <circle cx="39" cy="22" r="3.5" fill="#2A2B70" />
    {/* Smile */}
    <path d="M19 34 C19 44 41 44 41 34" stroke="#2A2B70" strokeWidth="4" strokeLinecap="round" fill="none" />
  </svg>
);

// Memphis Zigzag Wave Squiggle Decorator
export const MemphisZigzag: React.FC<{ color?: string; className?: string }> = ({
  color = "#00E5FF",
  className = "w-24 h-8"
}) => (
  <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 20 L22 6 L39 20 L56 6 L73 20 L90 6 L107 20"
      stroke={color}
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 20 L22 6 L39 20 L56 6 L73 20 L90 6 L107 20"
      stroke="#2A2B70"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 90s Retro CRT TV / Video Player Icon
export const RetroTvVideoIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Antenna */}
    <line x1="42" y1="22" x2="25" y2="4" stroke="#2A2B70" strokeWidth="4" strokeLinecap="round" />
    <circle cx="24" cy="4" r="3.5" fill="#FFE600" stroke="#2A2B70" strokeWidth="2" />
    <line x1="78" y1="22" x2="95" y2="4" stroke="#2A2B70" strokeWidth="4" strokeLinecap="round" />
    <circle cx="96" cy="4" r="3.5" fill="#FF6584" stroke="#2A2B70" strokeWidth="2" />

    {/* TV Outer Body */}
    <rect x="8" y="20" width="104" height="74" rx="14" fill="#00E5FF" stroke="#2A2B70" strokeWidth="5" />
    
    {/* TV Screen Outer Frame */}
    <rect x="18" y="28" width="66" height="58" rx="8" fill="#2A2B70" stroke="#2A2B70" strokeWidth="3" />
    
    {/* TV Screen Display */}
    <rect x="22" y="32" width="58" height="50" rx="6" fill="#1C0838" />
    
    {/* Play Triangle Glow in Screen */}
    <path d="M46 45 L60 56 L46 67 Z" fill="#FFE600" stroke="#FF6584" strokeWidth="2.5" strokeLinejoin="round" />
    
    {/* Screen Scanlines / Glare */}
    <path d="M26 36 L70 36" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M26 41 L50 41" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.3" />

    {/* Right Control Panel */}
    <rect x="88" y="28" width="18" height="58" rx="4" fill="#FF6584" stroke="#2A2B70" strokeWidth="2.5" />
    {/* Dials */}
    <circle cx="97" cy="38" r="5" fill="#FFE600" stroke="#2A2B70" strokeWidth="2" />
    <line x1="97" y1="35" x2="97" y2="38" stroke="#2A2B70" strokeWidth="2" strokeLinecap="round" />
    <circle cx="97" cy="52" r="5" fill="#FFE600" stroke="#2A2B70" strokeWidth="2" />
    <line x1="97" y1="49" x2="97" y2="52" stroke="#2A2B70" strokeWidth="2" strokeLinecap="round" />
    
    {/* Speaker Grille */}
    <rect x="91" y="64" width="12" height="2" rx="1" fill="#2A2B70" />
    <rect x="91" y="69" width="12" height="2" rx="1" fill="#2A2B70" />
    <rect x="91" y="74" width="12" height="2" rx="1" fill="#2A2B70" />

    {/* TV Legs */}
    <path d="M26 94 L20 102" stroke="#2A2B70" strokeWidth="4" strokeLinecap="round" />
    <path d="M94 94 L100 102" stroke="#2A2B70" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

