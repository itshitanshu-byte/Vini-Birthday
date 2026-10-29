import React, { useState, useEffect } from 'react';
import { RetroWindow } from './retro-window';
import { StarJarIcon, BirthdayCakeIcon, LetterEnvelopeIcon } from './memphis-decorations';
import { Sparkles, Flame, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RetroModalProps {
  category: 'jar' | 'food' | 'cake' | 'movies' | 'letter' | 'drinks' | 'music' | null;
  onClose: () => void;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
}

const STAR_WISHES = [
  { id: 1, text: "⭐ May your year be filled with endless laughter, magical adventures, and boundless happiness, Vini!", color: "#FFE600", starIcon: "🌟" },
  { id: 2, text: "✨ Wishing you a year as bright, vibrant, and extraordinary as you are, Vini!", color: "#FF6584", starIcon: "✨" },
  { id: 3, text: "💫 May every dream you carry in your heart unfold into a wonderful reality!", color: "#00E5FF", starIcon: "💫" },
  { id: 4, text: "🎉 Here's to unforgettable memories, great health, and legendary fun ahead!", color: "#00C9A7", starIcon: "⭐" },
  { id: 5, text: "🌠 Keep shining your unique light and inspiring everyone around you!", color: "#7C69EF", starIcon: "🌠" },
  { id: 6, text: "💖 Sending you big smiles, warm hugs, and all the sweetest blessings on your special day!", color: "#FF6584", starIcon: "🌟" },
  { id: 7, text: "☀️ May your days be filled with peace, love, prosperity, and golden moments!", color: "#FFE600", starIcon: "✨" },
  { id: 8, text: "🏆 To Vini: Stay bold, stay brilliant, and have the most iconic birthday year ever!", color: "#00E5FF", starIcon: "💫" }
];

export const RetroModals: React.FC<RetroModalProps> = ({
  category,
  onClose,
  isPlayingAudio,
  onToggleAudio
}) => {
  const [poppedWishes, setPoppedWishes] = useState<typeof STAR_WISHES>([STAR_WISHES[0]]);
  const [currentWish, setCurrentWish] = useState<typeof STAR_WISHES[0]>(STAR_WISHES[0]);
  const [isPopping, setIsPopping] = useState(false);
  const [toastSent, setToastSent] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [candlesBlownCount, setCandlesBlownCount] = useState(0);
  const [cakeStep, setCakeStep] = useState<number>(0);
  const [isAutoRevealing, setIsAutoRevealing] = useState<boolean>(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!category) return null;

  const triggerStarConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FFE600", "#FF6584", "#00E5FF", "#7C69EF", "#FFFFFF"]
    });
  };

  const triggerCakeConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#FFE600", "#FF6584", "#00E5FF", "#FF9F1C", "#2EC4B6"]
    });
  };

  const handleRevealNext = () => {
    if (cakeStep < 4) {
      const next = cakeStep + 1;
      setCakeStep(next);
      if (next === 4) {
        setCandlesLit(true);
        triggerCakeConfetti();
      } else {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#FFE600", "#FF6584", "#00E5FF"]
        });
      }
    }
  };

  const handleRevealAll = () => {
    setIsAutoRevealing(true);
    setCakeStep(0);

    setTimeout(() => {
      setCakeStep(1);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.65 }, colors: ["#7C69EF", "#FFE600"] });
    }, 350);

    setTimeout(() => {
      setCakeStep(2);
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.55 }, colors: ["#FF6584", "#FFFFFF"] });
    }, 1050);

    setTimeout(() => {
      setCakeStep(3);
      confetti({ particleCount: 55, spread: 70, origin: { y: 0.45 }, colors: ["#00E5FF", "#FFE600"] });
    }, 1750);

    setTimeout(() => {
      setCakeStep(4);
      setCandlesLit(true);
      triggerCakeConfetti();
      setIsAutoRevealing(false);
    }, 2450);
  };

  const handleResetCake = () => {
    setCakeStep(0);
    setCandlesLit(true);
  };

  const handleBlowCandles = () => {
    setCandlesLit(false);
    setCandlesBlownCount(prev => prev + 1);
    triggerCakeConfetti();
  };

  const handleRelightCandles = () => {
    setCandlesLit(true);
  };

  const handlePopStar = () => {
    setIsPopping(true);
    triggerStarConfetti();

    const unpopped = STAR_WISHES.filter(w => !poppedWishes.some(pw => pw.id === w.id));
    const nextWish = unpopped.length > 0
      ? unpopped[Math.floor(Math.random() * unpopped.length)]
      : STAR_WISHES[Math.floor(Math.random() * STAR_WISHES.length)];

    setCurrentWish(nextWish);
    if (!poppedWishes.some(pw => pw.id === nextWish.id)) {
      setPoppedWishes(prev => [nextWish, ...prev]);
    }

    setTimeout(() => {
      setIsPopping(false);
    }, 400);
  };

  const handleToastClick = () => {
    setToastSent(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setToastSent(false), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#2A2B70]/75 backdrop-blur-sm overflow-y-auto p-2 sm:p-4 flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className={`w-full ${(category === 'letter' || category === 'drinks') ? 'max-w-xl sm:max-w-2xl' : 'max-w-lg'} my-auto relative`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* WISH JAR MODAL */}
        {category === 'jar' && (
          <RetroWindow
            title="⭐ Vini's Magical Star Wish Jar"
            headerBg="bg-[#FFE600]"
            headerTextColor="text-[#2A2B70]"
            shadowVariant="pink"
            onClose={onClose}
          >
            <div className="flex flex-col gap-4 font-montserrat text-[#2A2B70]">
              
              {/* Interactive Jar Banner */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-[#ffe600]/30 via-[#ff6584]/20 to-[#00e5ff]/30 p-3 rounded-xl border-2 border-[#2A2B70]">
                <div 
                  onClick={handlePopStar} 
                  className="cursor-pointer transform hover:scale-110 active:scale-95 transition-transform drop-shadow-md flex-shrink-0"
                  title="Click Jar to pop a star wish!"
                >
                  <StarJarIcon className={`w-14 h-16 ${isPopping ? 'animate-bounce' : 'animate-float'}`} />
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#2A2B70] flex items-center gap-1.5">
                    <span>Vini's Star Jar</span>
                    <span className="text-xs px-2 py-0.5 bg-[#FF6584] text-white rounded-full">
                      {poppedWishes.length}/{STAR_WISHES.length} Stars
                    </span>
                  </h4>
                  <p className="text-xs text-[#2A2B70]/80 mt-0.5">
                    Click the jar or the button below to pop out glowing birthday stars with heartfelt wishes!
                  </p>
                </div>
              </div>

              {/* Active Popped Star Card Display */}
              <div className="relative p-5 bg-gradient-to-b from-white to-[#ffe600]/10 border-3 border-[#2A2B70] rounded-xl shadow-[6px_6px_0px_0px_#FF6584] overflow-hidden text-center">
                <div className="flex justify-center items-center mb-2">
                  <div className={`w-12 h-12 rounded-full border-2 border-[#2A2B70] bg-[#FFE600] flex items-center justify-center text-2xl shadow transition-transform ${isPopping ? 'scale-125 rotate-45' : 'scale-100'}`}>
                    {currentWish.starIcon}
                  </div>
                </div>
                
                <span className="text-[11px] font-black text-[#FF6584] uppercase tracking-widest">
                  Popped Wish For Vini
                </span>
                
                <p className="mt-2 text-sm sm:text-base font-extrabold text-[#2A2B70] leading-relaxed">
                  "{currentWish.text}"
                </p>

                {/* Pop Another Star Button */}
                <button
                  onClick={handlePopStar}
                  className="mt-4 w-full py-2.5 bg-[#00E5FF] hover:bg-[#00c9e6] text-[#2A2B70] font-black text-xs sm:text-sm rounded-lg border-2 border-[#2A2B70] shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#2A2B70]" />
                  <span>⭐ Pop Another Star from the Jar!</span>
                </button>
              </div>

              {/* Previously Popped Star Collection */}
              <div>
                <div className="flex items-center justify-between text-xs font-extrabold text-[#2A2B70] mb-2 px-1">
                  <span>Collected Star Wishes:</span>
                  <span className="text-[#FF6584]">{poppedWishes.length} Revealed</span>
                </div>
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                  {poppedWishes.map((w) => (
                    <div
                      key={w.id}
                      onClick={() => setCurrentWish(w)}
                      className={`p-2.5 rounded-lg border-2 border-[#2A2B70] text-xs font-semibold flex items-center gap-2.5 cursor-pointer transition-all ${
                        currentWish.id === w.id
                          ? 'bg-[#FFE600] text-[#2A2B70] shadow-sm translate-x-1'
                          : 'bg-white hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="text-base">{w.starIcon}</span>
                      <p className="line-clamp-1 leading-snug">{w.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-1 w-full py-2.5 bg-[#FF6584] hover:bg-[#ff4e70] text-white font-montserrat font-extrabold text-xs rounded-lg border-2 border-[#2A2B70] shadow transition-transform active:translate-y-0.5 cursor-pointer"
              >
                Close Wish Jar
              </button>
            </div>
          </RetroWindow>
        )}

        {/* BIRTHDAY CAKE WITH LIGHTED CANDLES MODAL */}
        {(category === 'cake' || category === 'movies') && (
          <RetroWindow
            title="🎂 Vini's 3-Layer Birthday Cake"
            headerBg="bg-[#FF6584]"
            shadowVariant="yellow"
            onClose={onClose}
          >
            <div className="flex flex-col gap-4 font-montserrat text-[#2A2B70]">
              {/* Header Banner */}
              <div className="flex items-center gap-3 bg-[#FFE600]/25 p-3 rounded-lg border-2 border-[#2A2B70]">
                <BirthdayCakeIcon className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-base text-[#2A2B70]">
                    Vini's 3-Tier Birthday Cake Reveal
                  </h4>
                  <p className="text-xs text-[#2A2B70]/80">
                    {cakeStep < 4
                      ? "Click reveal to build the cake layer-by-layer!"
                      : "The cake is complete and the candles are lighted! Make a wish! 🎂✨"}
                  </p>
                </div>
              </div>

              {/* Cake Display Arena */}
              <div className="relative p-6 sm:p-8 bg-gradient-to-b from-[#1a1c3a] via-[#121326] to-[#0d0f1d] border-3 border-[#2A2B70] rounded-2xl flex flex-col items-center justify-end shadow-inner overflow-hidden min-h-[300px]">
                {/* Ambient Candle Glow */}
                {cakeStep >= 4 && candlesLit && (
                  <div className="absolute top-6 w-60 h-36 bg-[#FFE600]/25 blur-[50px] rounded-full pointer-events-none animate-pulse" />
                )}

                {/* Initial Step 0 Prompt */}
                {cakeStep === 0 && !isAutoRevealing && (
                  <div className="my-auto text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 animate-pulse">
                    <span className="text-4xl block mb-2">🎁 ✨ 🎂</span>
                    <p className="text-sm font-bold text-white mb-1">Surprise Birthday Cake Ready!</p>
                    <p className="text-xs text-slate-300">Click the button below to reveal the cake layer-by-layer!</p>
                  </div>
                )}

                {/* LAYER 4: CANDLES (Topmost) */}
                {cakeStep >= 4 && (
                  <div className="flex items-end justify-center gap-3.5 sm:gap-5 mb-1 relative z-30 animate-cake-drop">
                    {[
                      { color: 'from-[#00E5FF] to-[#0099FF]', delay: '0s' },
                      { color: 'from-[#FFE600] to-[#FF9F1C]', delay: '0.2s' },
                      { color: 'from-[#FF6584] to-[#E63946]', delay: '0.4s' },
                      { color: 'from-[#00C9A7] to-[#06D6A0]', delay: '0.1s' },
                      { color: 'from-[#7C69EF] to-[#5A189A]', delay: '0.3s' },
                    ].map((candle, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center group cursor-pointer"
                        onClick={() => (candlesLit ? handleBlowCandles() : handleRelightCandles())}
                        title={candlesLit ? "Click to blow out" : "Click to relight"}
                      >
                        {/* Flame / Smoke */}
                        <div className="h-7 flex items-center justify-center mb-0.5">
                          {candlesLit ? (
                            <div
                              className="relative flex items-center justify-center"
                              style={{ animation: `flameFlicker 1.2s ease-in-out infinite alternate ${candle.delay}` }}
                            >
                              <div className="w-4 sm:w-5 h-6 sm:h-7 bg-gradient-to-t from-[#FF6584] via-[#FFE600] to-white rounded-full blur-[1.5px] opacity-95" />
                              <div className="absolute w-2 h-4 bg-white rounded-full -bottom-0.5 shadow-[0_0_10px_#FFE600]" />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span className="text-xs text-white/60">💨</span>
                            </div>
                          )}
                        </div>

                        {/* Wick */}
                        <div className="w-0.5 h-1.5 bg-gray-400" />

                        {/* Candle Stick */}
                        <div className={`w-3.5 sm:w-4 h-10 sm:h-12 rounded-t-sm bg-gradient-to-b ${candle.color} border border-white/50 shadow-md relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-white/20 transform -skew-y-12" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* LAYER 3: TOP LAYER ("VINI") */}
                {cakeStep >= 3 && (
                  <div className="relative z-20 w-36 sm:w-52 h-11 sm:h-14 bg-gradient-to-r from-[#00E5FF] via-[#7ceeff] to-[#00E5FF] rounded-t-xl border-3 border-white shadow-lg flex flex-col items-center justify-center animate-cake-drop">
                    {/* Top Decorative Frosting Pearls */}
                    <div className="absolute -top-2 inset-x-2 sm:inset-x-3 flex justify-around">
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white rounded-full shadow" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#FFE600] rounded-full shadow" />
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#FF6584] rounded-full shadow" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#FFE600] rounded-full shadow" />
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white rounded-full shadow" />
                    </div>

                    <span className="font-black text-xs sm:text-base tracking-[0.15em] sm:tracking-[0.25em] text-[#2A2B70] uppercase drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                      💖 VINI 💖
                    </span>
                  </div>
                )}

                {/* LAYER 2: MIDDLE LAYER ("BIRTHDAY") */}
                {cakeStep >= 2 && (
                  <div className="relative z-15 w-48 sm:w-68 h-13 sm:h-16 bg-gradient-to-r from-[#FF6584] via-[#ff8fa3] to-[#FF6584] border-3 border-white shadow-xl flex flex-col items-center justify-center animate-cake-drop">
                    {/* Decorative Strawberry Icing Wave */}
                    <div className="absolute -top-2 inset-x-1.5 sm:inset-x-2 flex justify-around">
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#FFE600] rounded-full shadow" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full shadow" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#00E5FF] rounded-full shadow" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full shadow" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-[#FFE600] rounded-full shadow" />
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full shadow" />
                    </div>

                    <span className="font-black text-xs sm:text-base tracking-[0.15em] sm:tracking-[0.2em] text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                      ✨ BIRTHDAY ✨
                    </span>
                  </div>
                )}

                {/* LAYER 1: BOTTOM LAYER ("HAPPY") */}
                {cakeStep >= 1 && (
                  <div className="relative z-10 w-60 sm:w-84 h-15 sm:h-18 bg-gradient-to-r from-[#7C69EF] via-[#9d8df1] to-[#7C69EF] rounded-b-lg border-3 border-white shadow-2xl flex flex-col items-center justify-center animate-cake-drop">
                    {/* Decorative Yellow Icing Wave */}
                    <div className="absolute -top-2 inset-x-1.5 sm:inset-x-2 flex justify-around">
                      <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-white rounded-full shadow" />
                      <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-[#FFE600] rounded-full shadow" />
                      <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-[#00E5FF] rounded-full shadow" />
                      <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-[#FF6584] rounded-full shadow" />
                      <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-[#FFE600] rounded-full shadow" />
                      <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-[#00E5FF] rounded-full shadow" />
                      <div className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-white rounded-full shadow" />
                    </div>

                    <span className="font-black text-sm sm:text-lg tracking-[0.15em] sm:tracking-[0.25em] text-[#FFE600] uppercase drop-shadow-[0_2px_4px_rgba(42,43,112,0.8)]">
                      🎉 HAPPY 🎉
                    </span>
                  </div>
                )}

                {/* CAKE STAND / PLATE (Always Visible) */}
                <div className="w-68 sm:w-92 h-3 sm:h-3.5 bg-gradient-to-r from-slate-300 via-white to-slate-300 rounded-full border-2 border-slate-400 shadow-[0_10px_20px_rgba(0,0,0,0.6)] mt-0.5" />

                {/* Progress / Status Tag */}
                <div className="mt-4 text-center">
                  {cakeStep === 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-bold">
                      Stand Ready (0/3 Layers)
                    </span>
                  )}
                  {cakeStep === 1 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C69EF]/30 border border-[#7C69EF] text-white text-xs font-bold animate-cake-drop">
                      Layer 1: "HAPPY" Revealed! 💜
                    </span>
                  )}
                  {cakeStep === 2 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6584]/30 border border-[#FF6584] text-[#FF6584] text-xs font-bold animate-cake-drop">
                      Layer 2: "BIRTHDAY" Revealed! 💖
                    </span>
                  )}
                  {cakeStep === 3 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/30 border border-[#00E5FF] text-[#00E5FF] text-xs font-bold animate-cake-drop">
                      Layer 3: "VINI" Revealed! 🩵
                    </span>
                  )}
                  {cakeStep === 4 && candlesLit && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE600]/25 border border-[#FFE600] text-[#FFE600] text-xs font-bold animate-pulse">
                      <Flame className="w-3.5 h-3.5 text-[#FFE600] fill-[#FFE600]" />
                      Candles are brightly lighted!
                    </span>
                  )}
                  {cakeStep === 4 && !candlesLit && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/25 border border-[#00E5FF] text-[#00E5FF] text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                      Candles blown out! Wish sent for Vini! 🌟
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                {cakeStep < 4 ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleRevealAll}
                      disabled={isAutoRevealing}
                      className="flex-1 py-3 bg-gradient-to-r from-[#FFE600] via-[#FF6584] to-[#00E5FF] hover:brightness-110 active:scale-95 text-[#0d0f1d] font-montserrat font-black text-xs sm:text-sm rounded-xl border-3 border-[#2A2B70] shadow-[3px_3px_0px_0px_#2A2B70] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4" />
                      {isAutoRevealing ? "Revealing Layers..." : "🎁 Reveal Birthday Cake!"}
                    </button>

                    <button
                      onClick={handleRevealNext}
                      disabled={isAutoRevealing}
                      className="px-4 py-3 bg-white hover:bg-slate-100 active:scale-95 text-[#2A2B70] font-montserrat font-bold text-xs sm:text-sm rounded-xl border-3 border-[#2A2B70] shadow-[3px_3px_0px_0px_#2A2B70] transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      Next Layer ({cakeStep}/3)
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {candlesLit ? (
                      <button
                        onClick={handleBlowCandles}
                        className="flex-1 py-3 bg-gradient-to-r from-[#00E5FF] to-[#00C9A7] hover:brightness-110 active:scale-95 text-[#0d0f1d] font-montserrat font-black text-xs sm:text-sm rounded-xl border-3 border-[#2A2B70] shadow-[3px_3px_0px_0px_#2A2B70] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Wind className="w-4 h-4" />
                        Blow Out Candles & Make a Wish 🎂💨
                      </button>
                    ) : (
                      <button
                        onClick={handleRelightCandles}
                        className="flex-1 py-3 bg-gradient-to-r from-[#FFE600] to-[#FF6584] hover:brightness-110 active:scale-95 text-[#0d0f1d] font-montserrat font-black text-xs sm:text-sm rounded-xl border-3 border-[#2A2B70] shadow-[3px_3px_0px_0px_#2A2B70] transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Flame className="w-4 h-4 fill-current" />
                        Relight the Birthday Candles 🔥
                      </button>
                    )}

                    <button
                      onClick={handleResetCake}
                      className="px-4 py-3 bg-white hover:bg-slate-100 active:scale-95 text-[#2A2B70] font-montserrat font-bold text-xs sm:text-sm rounded-xl border-3 border-[#2A2B70] shadow-[3px_3px_0px_0px_#2A2B70] transition-all flex items-center justify-center gap-1 cursor-pointer"
                      title="Replay Reveal Animation"
                    >
                      🔄 Replay
                    </button>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-[#FF6584] hover:bg-[#ff4e70] text-white font-extrabold text-xs rounded-lg border-2 border-[#2A2B70] shadow transition-transform active:translate-y-0.5 cursor-pointer"
                >
                  Close Birthday Cake
                </button>
              </div>
            </div>
          </RetroWindow>
        )}

        {/* BIRTHDAY LETTER MODAL */}
        {(category === 'letter' || category === 'drinks') && (
          <RetroWindow
            title="💌 Special Birthday Letter for Vini"
            headerBg="bg-[#FF6584]"
            shadowVariant="yellow"
            onClose={onClose}
          >
            <div className="flex flex-col gap-4 font-montserrat text-[#2A2B70]">
              {/* Header Info */}
              <div className="flex items-center gap-3 bg-[#FF6584]/20 p-3 rounded-lg border-2 border-[#2A2B70]">
                <LetterEnvelopeIcon className="w-12 h-10 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-base text-[#2A2B70]">
                    A Heartfelt Note for Vini 💌
                  </h4>
                  <p className="text-xs text-[#2A2B70]/80">
                    A special birthday message written just for you!
                  </p>
                </div>
              </div>

              {/* Lined Retro Letter Stationary Card */}
              <div className="relative p-3.5 sm:p-7 bg-[#FFFDF0] border-3 border-[#2A2B70] rounded-xl shadow-md overflow-hidden">
                {/* Decorative Retro Stamp Top-Right */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex flex-col items-center pointer-events-none">
                  <div className="w-10 h-12 sm:w-12 sm:h-14 bg-gradient-to-br from-[#FFE600] to-[#FF6584] border-2 border-[#2A2B70] rounded p-1 flex flex-col items-center justify-between shadow-sm transform rotate-3">
                    <span className="text-[8px] sm:text-[9px] font-black text-[#2A2B70] tracking-tighter uppercase">POSTAGE</span>
                    <span className="text-xs sm:text-sm">🎂</span>
                    <span className="text-[7px] sm:text-[8px] font-bold text-[#2A2B70]">VINI 2026</span>
                  </div>
                  <div className="w-6 sm:w-8 h-0.5 bg-[#2A2B70]/40 -mt-1 transform -rotate-12" />
                </div>

                {/* Salutation */}
                <div className="mb-3 sm:mb-4 pr-12 sm:pr-16">
                  <span className="text-[10px] sm:text-xs font-bold text-[#FF6584] uppercase tracking-wider block mb-0.5">Birthday Memo</span>
                  <h3 className="font-black text-lg sm:text-2xl text-[#2A2B70] font-montserrat">
                    Dearest Vini, 💖
                  </h3>
                </div>

                {/* Letter Body with Vintage Lined Paper Styling */}
                <div className="max-h-[42vh] sm:max-h-[46vh] overflow-y-auto pr-2 sm:pr-3 custom-scrollbar space-y-3.5 text-xs sm:text-sm text-[#2A2B70] leading-relaxed font-medium">
                  <p>
                    Happy Birthday to u vini, my forever person, and someone who will always hold a special place in my heart. ❤️🥹💗 It feels a little different not being able to call you today and wish you the way I always would, but I understand that life has changed and you’re building a beautiful new chapter of your own. Even though I can’t call you, I couldn’t let this day pass without telling you how much you mean to me. After all, today is the day someone as special as you came into this world, and that will always be worth celebrating. 🫶🏻❤️
                  </p>
                  <p>
                    I often miss our random conversations, our silly laughs, and those moments when we could talk about absolutely anything without worrying about time. It’s funny how the smallest memories can end up meaning the most. We may not get to share every little detail of our lives like we used to, but I’m genuinely grateful for all the moments we’ve shared and the friendship we’ve built over the years. No matter how much life changes, those memories will always be a beautiful part of my life. 🥹🫂
                  </p>
                  <p>
                    As you celebrate another year of your life, I pray that this new chapter brings you endless happiness, peace, and countless reasons to smile. May your marriage be filled with love, trust, understanding, and the kind of companionship that makes even ordinary days feel special. May you achieve everything you dream of, find strength during difficult times, and always feel surrounded by people who truly value you. You deserve so many beautiful things in life, and I hope this year brings you closer to all of them. ❤️🧿
                  </p>
                  <p>
                    I know your priorities and responsibilities are different now, and I respect that completely. I just hope that, whenever life gives us the chance, we get to sit together again, talk for hours, laugh at our old jokes, and create new memories. Some friendships may look different with time, but that doesn’t make them any less meaningful. You’ll always be the friend I feel lucky to have met, and I’ll always be rooting for you and your happiness, wherever life takes you. 💗
                  </p>
                  <p>
                    Happy Birthday once again, 🎂❤️ Enjoy your special day, take lots of pictures, smile that beautiful smile, and make wonderful memories. I wish I could be there to celebrate with you, but for now, I’m sending you this small website. May this year be one of the happiest chapters of your life. Stay blessed and keep shining! 🫂❤️🎀
                  </p>
                </div>

                {/* Sign-off */}
                <div className="mt-5 pt-3 border-t-2 border-dashed border-[#2A2B70]/30 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-[#2A2B70]/70 font-semibold block">With all my love & heartfelt wishes,</span>
                    <span className="font-black text-sm text-[#2A2B70]">Always in your corner 🫂❤️</span>
                  </div>

                  {/* Red Wax Seal Badge */}
                  <div className="w-10 h-10 rounded-full bg-[#FF6584] border-2 border-[#2A2B70] shadow flex items-center justify-center text-white text-xs font-bold">
                    ❤️
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    confetti({
                      particleCount: 90,
                      spread: 80,
                      origin: { y: 0.6 },
                      colors: ["#FF6584", "#FFE600", "#00E5FF", "#FF1493"]
                    });
                  }}
                  className="flex-1 py-3 bg-[#FFE600] hover:bg-[#ffe100] active:scale-95 text-[#2A2B70] font-black text-xs sm:text-sm rounded-xl border-3 border-[#2A2B70] shadow-[3px_3px_0px_0px_#2A2B70] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#2A2B70]" />
                  <span>Send Love to Vini! 💖</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#FF6584] hover:bg-[#ff4e70] text-white font-extrabold text-xs rounded-lg border-2 border-[#2A2B70] shadow transition-transform active:translate-y-0.5 cursor-pointer"
              >
                Close Letter
              </button>
            </div>
          </RetroWindow>
        )}

      </div>
    </div>
  );
};
