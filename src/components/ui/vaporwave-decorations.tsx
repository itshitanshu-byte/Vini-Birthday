import React from 'react';

// Retro Synthwave Sunset Circle with Horizontal Line Slices
export const VaporwaveSun: React.FC<{ className?: string }> = ({ className = "w-40 h-40" }) => {
  return (
    <div className={`relative rounded-full overflow-hidden flex flex-col justify-end bg-gradient-to-b from-[#ffe600] via-[#ff00a0] to-[#8b006b] shadow-[0_0_50px_rgba(255,0,160,0.6)] ${className}`}>
      {/* Sun Horizontal Slice Lines */}
      <div className="w-full flex flex-col gap-1.5 pb-2 px-0">
        <div className="h-1 bg-[#30004c]/70 w-full" />
        <div className="h-1.5 bg-[#30004c]/80 w-full" />
        <div className="h-2 bg-[#30004c]/90 w-full" />
        <div className="h-2.5 bg-[#30004c] w-full" />
        <div className="h-3 bg-[#30004c] w-full" />
      </div>
    </div>
  );
};

// 4-Point Retro Neon Sparkle Star
export const VaporwaveStar: React.FC<{ color?: string; className?: string }> = ({ 
  color = "#ffe600", 
  className = "w-6 h-6" 
}) => {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current drop-shadow-[0_0_8px_currentColor]`} style={{ color }}>
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
};

// Vaporwave Cloud Silhouette
export const VaporwaveCloud: React.FC<{ className?: string }> = ({ className = "w-16 h-8" }) => {
  return (
    <svg viewBox="0 0 100 50" className={`${className} fill-white/90 drop-shadow-md`}>
      <path d="M20,40 Q10,40 10,30 Q10,20 25,20 Q30,10 45,10 Q60,10 65,20 Q80,15 85,30 Q90,40 75,40 Z" />
    </svg>
  );
};

// Flying Birds Silhouette (Seagulls)
export const VaporwaveBirds: React.FC<{ className?: string }> = ({ className = "w-24 h-12" }) => {
  return (
    <svg viewBox="0 0 120 60" className={`${className} fill-black/80`}>
      {/* Bird 1 */}
      <path d="M10,25 Q20,10 30,25 Q40,10 50,25 Q40,20 30,28 Q20,20 10,25 Z" />
      {/* Bird 2 */}
      <path d="M55,15 Q63,3 72,15 Q80,3 88,15 Q80,11 72,17 Q63,11 55,15 Z" />
      {/* Bird 3 */}
      <path d="M85,32 Q91,22 98,32 Q105,22 112,32 Q105,29 98,34 Q91,29 85,32 Z" />
    </svg>
  );
};

// Botanical Leaf Silhouette (Overlaying background)
export const VaporwaveLeaves: React.FC<{ className?: string }> = ({ className = "w-32 h-48" }) => {
  return (
    <svg viewBox="0 0 100 200" className={`${className} fill-[#1d0033]/80`}>
      <path d="M50,200 Q48,100 50,0 Q60,30 90,40 Q58,60 50,90 Q85,100 95,120 Q56,130 50,150 Q75,170 85,185 Q52,190 50,200 Z" />
      <path d="M50,200 Q45,110 50,0 Q35,35 10,45 Q42,65 50,90 Q15,105 5,125 Q44,135 50,150 Q25,175 15,190 Q48,195 50,200 Z" />
    </svg>
  );
};

// Blue Birthday Cupcake Vector Component matching the 5823064.jpg image
export const VaporwaveCupcake: React.FC<{ className?: string }> = ({ className = "w-52 sm:w-64" }) => {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3 Lit Birthday Candles with Glowing Flames */}
      <div className="flex justify-center items-end gap-5 sm:gap-6 -mb-2 z-20">
        {/* Left Candle (Pastel Cyan / Mint) */}
        <div className="flex flex-col items-center">
          {/* Glowing Flame */}
          <div className="relative flex items-center justify-center mb-0.5">
            <div className="w-4 h-6 bg-gradient-to-t from-[#ff00a0] via-[#ffe600] to-white rounded-full drop-shadow-[0_0_8px_#ffe600] animate-pulse" />
            <div className="absolute bottom-0.5 w-1.5 h-3 bg-white rounded-full opacity-90" />
          </div>
          {/* Wick */}
          <div className="w-1 h-2 bg-[#30004c]" />
          {/* Candle Stick */}
          <div className="w-3.5 h-9 sm:h-10 bg-gradient-to-b from-[#00f0ff] via-white to-[#00f0ff] border-2 border-[#30004c] rounded-t-sm shadow-md overflow-hidden relative">
            <div className="w-full h-1 bg-[#ff00a0]/60 my-1 transform -skew-y-12" />
            <div className="w-full h-1 bg-[#ffe600]/70 my-1 transform -skew-y-12" />
          </div>
        </div>

        {/* Center Candle (Golden Yellow - Slightly Tallest) */}
        <div className="flex flex-col items-center -mt-2">
          {/* Glowing Flame */}
          <div className="relative flex items-center justify-center mb-0.5">
            <div className="w-5 h-7 bg-gradient-to-t from-[#ff00a0] via-[#ffe600] to-white rounded-full drop-shadow-[0_0_10px_#ffe600] animate-pulse delay-100" />
            <div className="absolute bottom-0.5 w-2 h-3.5 bg-white rounded-full opacity-95" />
          </div>
          {/* Wick */}
          <div className="w-1 h-2.5 bg-[#30004c]" />
          {/* Candle Stick */}
          <div className="w-4 h-11 sm:h-12 bg-gradient-to-b from-[#ffe600] via-white to-[#ffe600] border-2 border-[#30004c] rounded-t-sm shadow-lg overflow-hidden relative">
            <div className="w-full h-1.5 bg-[#00f0ff]/70 my-1 transform -skew-y-12" />
            <div className="w-full h-1.5 bg-[#ff00a0]/60 my-1 transform -skew-y-12" />
          </div>
        </div>

        {/* Right Candle (Neon Pink / Magenta) */}
        <div className="flex flex-col items-center">
          {/* Glowing Flame */}
          <div className="relative flex items-center justify-center mb-0.5">
            <div className="w-4 h-6 bg-gradient-to-t from-[#ff00a0] via-[#ffe600] to-white rounded-full drop-shadow-[0_0_8px_#ffe600] animate-pulse delay-200" />
            <div className="absolute bottom-0.5 w-1.5 h-3 bg-white rounded-full opacity-90" />
          </div>
          {/* Wick */}
          <div className="w-1 h-2 bg-[#30004c]" />
          {/* Candle Stick */}
          <div className="w-3.5 h-9 sm:h-10 bg-gradient-to-b from-[#ff00a0] via-white to-[#ff00a0] border-2 border-[#30004c] rounded-t-sm shadow-md overflow-hidden relative">
            <div className="w-full h-1 bg-[#00f0ff]/70 my-1 transform -skew-y-12" />
            <div className="w-full h-1 bg-[#ffe600]/70 my-1 transform -skew-y-12" />
          </div>
        </div>
      </div>

      {/* Blue Frosting Swirl */}
      <div className="relative w-44 sm:w-56 h-24 sm:h-28 bg-gradient-to-b from-[#00c9a7] via-[#0099ff] to-[#0055ff] rounded-t-full border-4 border-[#30004c] shadow-lg overflow-hidden flex items-center justify-center">
        {/* Silver Sprinkles */}
        <div className="absolute inset-0 opacity-80">
          <div className="absolute top-4 left-6 w-2.5 h-2.5 bg-slate-100 rounded-full border border-gray-400 shadow-sm" />
          <div className="absolute top-8 left-16 w-3 h-3 bg-slate-200 rounded-full border border-gray-400 shadow-sm" />
          <div className="absolute top-5 right-10 w-2.5 h-2.5 bg-slate-100 rounded-full border border-gray-400 shadow-sm" />
          <div className="absolute top-14 right-16 w-3 h-3 bg-slate-200 rounded-full border border-gray-400 shadow-sm" />
          <div className="absolute top-12 left-28 w-2.5 h-2.5 bg-slate-100 rounded-full border border-gray-400 shadow-sm" />
        </div>
        {/* Frosting Swirl Highlight */}
        <div className="w-32 sm:w-36 h-10 sm:h-12 border-t-4 border-white/60 rounded-full transform -rotate-6" />
      </div>

      {/* Muffin Base */}
      <div className="w-40 sm:w-52 h-12 sm:h-14 bg-amber-700/80 border-x-4 border-b-2 border-[#30004c] -mt-1" />

      {/* Blue Ribbed Wrapper */}
      <div className="w-44 sm:w-56 h-20 sm:h-24 bg-gradient-to-b from-[#0077ff] to-[#0033aa] border-4 border-[#30004c] rounded-b-xl clip-wrapper shadow-2xl flex justify-between px-2 overflow-hidden -mt-7 sm:-mt-8">
        <div className="w-full flex justify-between">
          <div className="w-3 h-full bg-white/10" />
          <div className="w-3 h-full bg-black/10" />
          <div className="w-3 h-full bg-white/10" />
          <div className="w-3 h-full bg-black/10" />
          <div className="w-3 h-full bg-white/10" />
          <div className="w-3 h-full bg-black/10" />
          <div className="w-3 h-full bg-white/10" />
        </div>
      </div>
      
      {/* Cupcake Shadow Base */}
      <div className="w-48 sm:w-60 h-4 bg-[#ff00a0]/60 rounded-full blur-sm -mt-2" />
    </div>
  );
};

// "WISH YOU ALL THE BEST" Pop-up Widget matching middle pop-up in 5823064.jpg
export const VaporwaveWishWidget: React.FC<{ onOkClick?: () => void }> = ({ onOkClick }) => {
  return (
    <div className="w-64 sm:w-72 bg-white border-3 border-[#30004c] rounded-xl shadow-[8px_8px_0px_0px_#ff00a0] overflow-hidden transform hover:-translate-y-1 transition-all">
      {/* Retro OS Window Titlebar */}
      <div className="px-3 py-1.5 bg-gradient-to-r from-[#ff00a0] to-[#ff0055] border-b-2 border-[#30004c] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/30" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/30" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/30" />
        </div>
        <span className="text-[10px] font-black text-white uppercase tracking-wider">Vaporwave OS</span>
      </div>
      {/* Window Body */}
      <div className="p-4 flex flex-col items-center text-center bg-gradient-to-b from-white to-[#00f0ff]/10">
        <h4 className="font-montserrat font-black text-lg sm:text-xl text-[#00c9a7] uppercase tracking-wide leading-tight mb-3 transform -rotate-1">
          WISH YOU<br />
          <span className="text-[#ff00a0]">ALL THE BEST</span>
        </h4>
        <button
          onClick={onOkClick}
          className="px-6 py-2 bg-gradient-to-r from-[#FFE600] via-[#FF6584] to-[#00E5FF] hover:brightness-110 text-[#2A2B70] font-black text-xs sm:text-sm rounded-full border-2 border-[#30004c] shadow-[3px_3px_0px_0px_#30004c] transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          title="Click to open rotating 3D gift box!"
        >
          <span>🎁 Surprise</span>
        </button>
      </div>
    </div>
  );
};

// Rating Stars Widget matching right widget in 5823064.jpg
export const VaporwaveStarsWidget: React.FC = () => {
  return (
    <div className="w-48 bg-[#99f3ff] border-3 border-[#30004c] rounded-lg shadow-[6px_6px_0px_0px_#30004c] p-2 flex flex-col gap-2">
      {/* Top Header dots */}
      <div className="bg-slate-200 border border-[#30004c] rounded px-2 py-0.5 flex gap-1 items-center">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      {/* Stars box */}
      <div className="bg-white border border-[#30004c] rounded p-2 flex items-center justify-around">
        <span className="text-2xl text-[#ff00a0]">★</span>
        <span className="text-2xl text-[#ff00a0]">★</span>
        <span className="text-2xl text-[#ff00a0]">★</span>
      </div>
    </div>
  );
};

// Emoji Badge Widget matching upper right widget in 5823064.jpg
export const VaporwaveEmojiWidget: React.FC = () => {
  return (
    <div className="bg-amber-100 border-2 border-[#30004c] rounded-lg px-3 py-1.5 shadow-[4px_4px_0px_0px_#ff00a0] flex items-center gap-2 text-xl">
      <span role="img" aria-label="happy">😀</span>
      <span role="img" aria-label="dizzy">😵</span>
      <span role="img" aria-label="smile">😄</span>
    </div>
  );
};
