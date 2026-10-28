import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, RotateCcw, X, Gift, PartyPopper } from "lucide-react";

interface GiftBoxSurpriseProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TreatItem {
  id: number;
  type: "teddy" | "chocolate";
  emoji: string;
  label: string;
  x: number; // end position %
  y: number; // end position %
  size: number; // size in px
  rotation: number; // rotation in deg
  delay: number; // animation delay in s
  duration: number; // float duration in s
  message: string;
}

const SWEET_MESSAGES = [
  "Big warm Teddy Hug for Vini! 🧸💖",
  "Sweet chocolate joy for the birthday queen! 🍫✨",
  "Wishing you a year as delightful as Belgian chocolate! 🍫🌟",
  "Cuddly teddy bear blessings for you, Vini! 🧸🎀",
  "Extra sweetness in your fabulous year ahead! 🍬💫",
  "Pure happiness and sweet chocolate moments! 🍫🎉",
  "You deserve all the chocolates and teddy hugs in the world! 🧸🍫",
  "Sending you endless smiles and sweet treats! 🧁💖",
  "A golden truffle of good health and success! 🌰✨",
  "May your sweetest dreams come true today, Vini! 🍰🌈"
];

const TREAT_EMOJIS = [
  { emoji: "🧸", type: "teddy" as const, label: "Teddy Bear" },
  { emoji: "🧸🎀", type: "teddy" as const, label: "Bow Teddy" },
  { emoji: "🧸❤️", type: "teddy" as const, label: "Heart Teddy" },
  { emoji: "🍫", type: "chocolate" as const, label: "Chocolate Bar" },
  { emoji: "🍬", type: "chocolate" as const, label: "Sweet Candy" },
  { emoji: "🧁", type: "chocolate" as const, label: "Chocolate Cupcake" },
  { emoji: "🍩", type: "chocolate" as const, label: "Choco Donut" },
  { emoji: "🍰", type: "chocolate" as const, label: "Chocolate Cake" },
  { emoji: "🍪", type: "chocolate" as const, label: "Choco Cookie" },
  { emoji: "🌰", type: "chocolate" as const, label: "Golden Truffle" }
];

export const GiftBoxSurprise: React.FC<GiftBoxSurpriseProps> = ({ isOpen, onClose }) => {
  const [boxState, setBoxState] = useState<"idle" | "exploding" | "exploded">("idle");
  const [treats, setTreats] = useState<TreatItem[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const [clickedCount, setClickedCount] = useState<number>(0);

  // Generate 44 scattered treats flying radially
  const generateTreats = (): TreatItem[] => {
    const totalItems = 44;
    const items: TreatItem[] = [];

    for (let i = 0; i < totalItems; i++) {
      const treatTemplate = TREAT_EMOJIS[i % TREAT_EMOJIS.length];
      
      // Calculate radial scatter positions across the screen
      const angle = (i / totalItems) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
      // Distance from center between 22% and 48% (viewport bounds)
      const distance = 22 + Math.random() * 26;
      
      const x = 50 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * (distance * 0.85); // Slightly compressed vertically

      items.push({
        id: i,
        type: treatTemplate.type,
        emoji: treatTemplate.emoji,
        label: treatTemplate.label,
        x: Math.max(6, Math.min(94, x)),
        y: Math.max(10, Math.min(90, y)),
        size: Math.floor(28 + Math.random() * 26),
        rotation: Math.floor(Math.random() * 70 - 35),
        delay: Math.random() * 0.4,
        duration: 3 + Math.random() * 2.5,
        message: SWEET_MESSAGES[i % SWEET_MESSAGES.length]
      });
    }

    return items;
  };

  useEffect(() => {
    if (isOpen) {
      setBoxState("idle");
      setActiveMessage(null);
      setClickedCount(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const triggerExplosionConfetti = () => {
    // 1. Center big blast
    confetti({
      particleCount: 180,
      spread: 120,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#FFE600", "#FF6584", "#00E5FF", "#7C69EF", "#FF9F1C", "#FFFFFF"],
      scalar: 1.2
    });

    // 2. Left and Right cannon bursts
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.7 },
        colors: ["#FF6584", "#FFE600", "#FF1493"]
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.7 },
        colors: ["#00E5FF", "#FFE600", "#00C9A7"]
      });
    }, 250);

    // 3. Falling gold star shower
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 140,
        origin: { x: 0.5, y: 0.2 },
        colors: ["#FFE600", "#FFD700", "#FFA500", "#FF6584"]
      });
    }, 600);
  };

  const handleBoxClick = () => {
    if (boxState !== "idle") return;

    setBoxState("exploding");
    triggerExplosionConfetti();
    setTreats(generateTreats());

    setTimeout(() => {
      setBoxState("exploded");
      setActiveMessage("🎉 SURPRISE! VINI'S TEDDY BEARS & CHOCOLATES RAIN! 🧸🍫");
    }, 550);
  };

  const handleReset = () => {
    setBoxState("idle");
    setActiveMessage(null);
    setClickedCount(0);
  };

  const handleTreatClick = (item: TreatItem) => {
    setActiveMessage(item.message);
    setClickedCount((prev) => prev + 1);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: {
        x: item.x / 100,
        y: item.y / 100
      },
      colors: ["#FF6584", "#FFE600", "#00E5FF"]
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0d0f1d]/90 backdrop-blur-md flex items-center justify-center p-4 select-none overflow-hidden font-montserrat">
      {/* Background Animated Neon Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#ff00a0]/30 to-[#00f0ff]/30 blur-[130px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#ffe600]/25 to-[#ff6584]/35 blur-[130px] rounded-full pointer-events-none" />

      {/* Retro 90s Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px"
        }}
      />

      {/* Top Header Controls */}
      <header className="absolute top-4 inset-x-4 max-w-5xl mx-auto flex items-center justify-between z-40">
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#2A2B70] border-2 border-[#FFE600] rounded-xl text-white shadow-md">
          <Gift className="w-4 h-4 text-[#FFE600] animate-bounce" />
          <span className="font-extrabold text-xs sm:text-sm tracking-wide text-[#FFE600]">
            VINI'S SPECIAL GIFT BOX
          </span>
        </div>

        <div className="flex items-center gap-2">
          {boxState === "exploded" && (
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 bg-[#00E5FF] hover:bg-[#00c9e6] active:scale-95 text-[#2A2B70] font-black text-xs rounded-xl border-2 border-[#2A2B70] shadow flex items-center gap-1.5 cursor-pointer transition-transform"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Pack Box Again 🔄</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 bg-[#FF6584] hover:bg-pink-600 text-white rounded-xl border-2 border-white shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Close Gift Box"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* STATE 1 & 2: 3D 360-DEGREE ROTATING GIFT BOX (IDLE / EXPLODING) */}
      {boxState !== "exploded" && (
        <div className="relative flex flex-col items-center justify-center z-30 max-w-md w-full">
          {/* Ambient Shockwave Burst Ring (on click) */}
          {boxState === "exploding" && (
            <div className="absolute w-72 h-72 rounded-full border-8 border-[#FFE600] shadow-[0_0_50px_#FF6584] animate-shockwave pointer-events-none" />
          )}

          {/* Top Instruction Pill */}
          <div className="mb-6 px-5 py-2 bg-white/15 backdrop-blur-md rounded-full border-2 border-[#FFE600] shadow-lg flex items-center gap-2 text-white animate-bounce">
            <Sparkles className="w-4 h-4 text-[#FFE600]" />
            <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-yellow-300">
              ✨ Tap the rotating box to explode it! ✨
            </span>
          </div>

          {/* 3D ROTATING GIFT BOX CONTAINER */}
          <div
            onClick={handleBoxClick}
            className={`relative cursor-pointer select-none group flex flex-col items-center justify-center py-6 px-4 transition-transform active:scale-95 ${
              boxState === "exploding" ? "animate-box-burst" : "animate-spin-3d"
            }`}
            style={{
              perspective: "1000px"
            }}
            title="Click to open for gifts!"
          >
            {/* BOX TOP BOW & RIBBON */}
            <div
              className={`relative z-30 -mb-5 flex flex-col items-center transition-all ${
                boxState === "exploding" ? "animate-lid-blast" : "group-hover:scale-110"
              }`}
            >
              {/* 3D Multi-Loop Golden & Pink Bow */}
              <div className="relative flex items-center justify-center">
                {/* Left Loop */}
                <div className="w-10 h-8 sm:w-12 sm:h-9 bg-gradient-to-br from-[#FFE600] via-[#FFD700] to-[#FF9F1C] border-3 border-[#2A2B70] rounded-full transform -rotate-45 shadow-md -mr-3" />
                
                {/* Center Knot Badge */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#FF6584] to-[#ff0055] border-3 border-white shadow-lg flex items-center justify-center text-white z-20 font-black text-xs">
                  ✨
                </div>

                {/* Right Loop */}
                <div className="w-10 h-8 sm:w-12 sm:h-9 bg-gradient-to-bl from-[#FFE600] via-[#FFD700] to-[#FF9F1C] border-3 border-[#2A2B70] rounded-full transform rotate-45 shadow-md -ml-3" />
              </div>

              {/* Dangling Ribbon Tails */}
              <div className="flex justify-center gap-4 -mt-2.5 z-10">
                <div className="w-3 sm:w-3.5 h-7 sm:h-8 bg-[#FFE600] border-2 border-[#2A2B70] transform -rotate-25 rounded-b-md shadow" />
                <div className="w-3 sm:w-3.5 h-7 sm:h-8 bg-[#FFE600] border-2 border-[#2A2B70] transform rotate-25 rounded-b-md shadow" />
              </div>

              {/* BOX LID */}
              <div className="w-48 sm:w-56 h-10 sm:h-12 bg-gradient-to-r from-[#FF6584] via-[#ff4770] to-[#7C69EF] border-4 border-[#2A2B70] rounded-lg shadow-xl relative overflow-hidden flex items-center justify-center -mt-1">
                {/* Ribbon Band across Lid */}
                <div className="absolute inset-y-0 w-8 bg-[#FFE600] border-x-2 border-[#2A2B70] shadow-sm" />
                {/* Lid Rim Highlight */}
                <div className="absolute top-0 inset-x-0 h-1 bg-white/40" />
              </div>
            </div>

            {/* BOX MAIN CUBE BODY */}
            <div className="relative w-44 sm:w-52 h-44 sm:h-52 bg-gradient-to-b from-[#7C69EF] via-[#6049e7] to-[#3a2097] border-4 border-[#2A2B70] rounded-2xl shadow-[0_20px_50px_rgba(124,105,239,0.7)] overflow-hidden flex flex-col items-center justify-center z-20 group-hover:shadow-[0_0_60px_rgba(255,230,0,0.8)] transition-all">
              
              {/* Vertical Golden Ribbon */}
              <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-[#FFE600] via-[#fff066] to-[#FFD700] border-x-2 border-[#2A2B70] shadow-sm flex items-center justify-center">
                <div className="w-1 h-full bg-white/60" />
              </div>

              {/* Horizontal Golden Ribbon */}
              <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-[#FFE600] via-[#fff066] to-[#FFD700] border-y-2 border-[#2A2B70] shadow-sm flex items-center justify-center">
                <div className="w-full h-1 bg-white/60" />
              </div>

              {/* Sparkle Ambient Dots on Box */}
              <div className="absolute top-3 left-3 text-white/60 text-xs animate-pulse">✦</div>
              <div className="absolute bottom-3 right-3 text-[#FFE600] text-sm animate-pulse delay-200">★</div>
              <div className="absolute bottom-3 left-3 text-[#00E5FF] text-xs animate-pulse delay-500">✦</div>

              {/* CORE LABEL WRITTEN ON THE BOX: "CLICK TO OPEN FOR GIFTS" */}
              <div className="relative z-30 p-2 sm:p-2.5 bg-[#0d0f1d]/90 backdrop-blur-md rounded-xl border-3 border-[#FFE600] shadow-[0_0_20px_rgba(255,230,0,0.6)] text-center transform group-hover:scale-105 transition-transform max-w-[85%]">
                <span className="block text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-[#00E5FF] animate-pulse">
                  🎁 SURPRISE INSIDE 🎁
                </span>
                <h3 className="font-montserrat font-black text-xs sm:text-sm text-[#FFE600] uppercase tracking-wide leading-tight mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Click to open<br />for gifts!
                </h3>
              </div>

              {/* Glowing Aura Pulse Behind Label */}
              <div className="absolute w-24 h-24 bg-[#FF6584]/30 blur-xl rounded-full pointer-events-none" />
            </div>

            {/* 3D Box Cast Shadow Base */}
            <div className="w-40 sm:w-48 h-6 bg-black/50 rounded-full blur-md mt-2" />
          </div>

          {/* Bottom Hint */}
          <div className="mt-4 text-center">
            <span className="text-xs font-bold text-slate-300">
              360° Rotating Surprise Box for Vini 💖
            </span>
          </div>
        </div>
      )}

      {/* STATE 3: EXPLODED STAGE - 40+ FLYING TEDDY BEARS & CHOCOLATES */}
      {boxState === "exploded" && (
        <div className="relative w-full h-full flex flex-col items-center justify-between z-30 pointer-events-auto">
          
          {/* Top Celebration Banner */}
          <div className="mt-14 sm:mt-16 text-center max-w-xl px-4 z-40 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE600] text-[#2A2B70] border-2 border-white font-black text-xs sm:text-sm shadow-lg mb-2">
              <PartyPopper className="w-4 h-4" />
              <span>GIFT BOX EXPLODED! 🎉</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFE600] via-white to-[#00E5FF] drop-shadow-[0_2px_15px_rgba(255,230,0,0.4)] leading-tight">
              Teddy Bears & Chocolates Shower! 🧸🍫
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 mt-1 font-semibold">
              Click any floating teddy bear or chocolate for special birthday blessings!
            </p>
          </div>

          {/* CENTER: BIG ADORABLE INTERACTIVE TEDDY BEAR */}
          <div className="relative z-40 my-auto flex flex-col items-center justify-center animate-fadeIn py-2 select-none">
            
            {/* Ambient Warm Golden & Pink Glow Behind Big Teddy */}
            <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-[#FF6584]/40 via-[#FFE600]/30 to-[#00E5FF]/30 blur-[70px] rounded-full pointer-events-none animate-pulse" />

            {/* Floating Speech Bubble above Big Teddy */}
            <div className="mb-2 px-4 py-1.5 bg-[#FFE600] text-[#2A2B70] border-2 border-white rounded-full font-black text-xs sm:text-sm shadow-lg animate-bounce flex items-center gap-1.5 cursor-pointer"
              onClick={() => {
                setActiveMessage("🧸 GIANT TEDDY BEAR HUG FOR VINI! Sending you endless cuddles & chocolates! 💖🍫✨");
                triggerExplosionConfetti();
              }}
            >
              <span>🧸 Hug Me Vini! (Click Me!) 💖</span>
            </div>

            {/* THE BIG TEDDY BEAR CHARACTER */}
            <div
              onClick={() => {
                setActiveMessage("🧸 GIANT TEDDY BEAR HUG FOR VINI! Sending you endless cuddles & sweetest chocolates! 💖🍫✨");
                setClickedCount((prev) => prev + 5);
                triggerExplosionConfetti();
              }}
              className="relative cursor-pointer group transition-transform hover:scale-105 active:scale-95 animate-teddy-breathe"
              title="Click the Big Teddy Bear for a giant hug & blessings!"
            >
              {/* Teddy Bear SVG Illustration */}
              <svg
                viewBox="0 0 300 320"
                className="w-56 h-56 sm:w-72 sm:h-72 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              >
                {/* 1. EARS */}
                {/* Left Ear */}
                <circle cx="75" cy="85" r="42" fill="#D4883E" stroke="#5C3411" strokeWidth="6" />
                <circle cx="75" cy="85" r="26" fill="#F4A261" />
                <circle cx="75" cy="85" r="15" fill="#FFCCD5" opacity="0.9" />

                {/* Right Ear */}
                <circle cx="225" cy="85" r="42" fill="#D4883E" stroke="#5C3411" strokeWidth="6" />
                <circle cx="225" cy="85" r="26" fill="#F4A261" />
                <circle cx="225" cy="85" r="15" fill="#FFCCD5" opacity="0.9" />

                {/* 2. BODY & FEET (Behind Head) */}
                {/* Body */}
                <ellipse cx="150" cy="210" rx="90" ry="85" fill="#D4883E" stroke="#5C3411" strokeWidth="6" />
                {/* Soft Tummy Patch */}
                <ellipse cx="150" cy="215" rx="65" ry="60" fill="#FCEADE" stroke="#5C3411" strokeWidth="4" />

                {/* Feet / Paws */}
                {/* Left Foot */}
                <ellipse cx="80" cy="280" rx="36" ry="28" fill="#D4883E" stroke="#5C3411" strokeWidth="5" />
                <ellipse cx="80" cy="282" rx="22" ry="16" fill="#FCEADE" />
                <circle cx="68" cy="270" r="4.5" fill="#FF6584" />
                <circle cx="80" cy="266" r="4.5" fill="#FF6584" />
                <circle cx="92" cy="270" r="4.5" fill="#FF6584" />

                {/* Right Foot */}
                <ellipse cx="220" cy="280" rx="36" ry="28" fill="#D4883E" stroke="#5C3411" strokeWidth="5" />
                <ellipse cx="220" cy="282" rx="22" ry="16" fill="#FCEADE" />
                <circle cx="208" cy="270" r="4.5" fill="#FF6584" />
                <circle cx="220" cy="266" r="4.5" fill="#FF6584" />
                <circle cx="232" cy="270" r="4.5" fill="#FF6584" />

                {/* 3. HEAD */}
                <ellipse cx="150" cy="130" rx="82" ry="74" fill="#D4883E" stroke="#5C3411" strokeWidth="6" />

                {/* Snout Area */}
                <ellipse cx="150" cy="148" rx="42" ry="32" fill="#FCEADE" stroke="#5C3411" strokeWidth="4" />

                {/* Cute Heart Nose */}
                <path
                  d="M142,136 Q150,131 158,136 Q150,150 150,150 Q150,150 142,136 Z"
                  fill="#4A2810"
                />
                {/* Nose Shine */}
                <circle cx="147" cy="137" r="2" fill="white" />

                {/* Cute Smile */}
                <path
                  d="M150,150 L150,158 M138,158 Q150,169 162,158"
                  stroke="#4A2810"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Rosy Blushing Cheeks */}
                <ellipse cx="102" cy="148" rx="15" ry="10" fill="#FF6584" opacity="0.65" />
                <ellipse cx="198" cy="148" rx="15" ry="10" fill="#FF6584" opacity="0.65" />

                {/* Big Sparkling Anime Eyes */}
                {/* Left Eye */}
                <circle cx="114" cy="120" r="13" fill="#2A1B0E" stroke="#5C3411" strokeWidth="2" />
                <circle cx="110" cy="116" r="5" fill="white" />
                <circle cx="118" cy="124" r="2.5" fill="white" />

                {/* Right Eye */}
                <circle cx="186" cy="120" r="13" fill="#2A1B0E" stroke="#5C3411" strokeWidth="2" />
                <circle cx="182" cy="116" r="5" fill="white" />
                <circle cx="190" cy="124" r="2.5" fill="white" />

                {/* 4. BIRTHDAY PARTY HAT ON HEAD */}
                <g transform="translate(150, 60) rotate(-6)">
                  {/* Hat Cone */}
                  <path
                    d="M-28,15 L28,15 L0,-50 Z"
                    fill="url(#partyHatGrad)"
                    stroke="#2A2B70"
                    strokeWidth="3.5"
                  />
                  {/* Hat Stripes / Dots */}
                  <circle cx="-8" cy="-10" r="4" fill="#FFE600" />
                  <circle cx="10" cy="-2" r="4" fill="#00E5FF" />
                  <circle cx="0" cy="-30" r="3.5" fill="#FFFFFF" />
                  {/* Hat Rim */}
                  <ellipse cx="0" cy="15" rx="30" ry="7" fill="#FF6584" stroke="#2A2B70" strokeWidth="2.5" />
                  {/* Top Golden Pom-Pom Star */}
                  <circle cx="0" cy="-52" r="9" fill="#FFE600" stroke="#2A2B70" strokeWidth="2.5" />
                  <path d="M-4,-52 L4,-52 M0,-56 L0,-48" stroke="#FF6584" strokeWidth="2" />
                </g>

                {/* 5. RED SILK BOWTIE */}
                <g transform="translate(150, 185)">
                  {/* Left Bow Loop */}
                  <path d="M0,0 L-26,-14 L-26,14 Z" fill="#FF0055" stroke="#2A2B70" strokeWidth="3" />
                  {/* Right Bow Loop */}
                  <path d="M0,0 L26,-14 L26,14 Z" fill="#FF0055" stroke="#2A2B70" strokeWidth="3" />
                  {/* Knot */}
                  <circle cx="0" cy="0" r="8" fill="#FFE600" stroke="#2A2B70" strokeWidth="2.5" />
                </g>

                {/* 6. TEDDY ARMS HOLDING CHOCOLATE & HEART */}
                {/* Left Arm holding big chocolate */}
                <ellipse cx="85" cy="205" rx="30" ry="20" fill="#D4883E" stroke="#5C3411" strokeWidth="5" transform="rotate(30 85 205)" />
                {/* Right Arm holding big heart */}
                <ellipse cx="215" cy="205" rx="30" ry="20" fill="#D4883E" stroke="#5C3411" strokeWidth="5" transform="rotate(-30 215 205)" />

                {/* Big Delicious Chocolate Bar held in paws */}
                <g transform="translate(112, 188) rotate(-10)">
                  {/* Chocolate Base */}
                  <rect x="0" y="0" width="46" height="58" rx="5" fill="#4A2810" stroke="#2A1B0E" strokeWidth="3" />
                  {/* Chocolate Squares */}
                  <rect x="5" y="5" width="16" height="15" rx="2" fill="#6B3E1B" />
                  <rect x="25" y="5" width="16" height="15" rx="2" fill="#6B3E1B" />
                  <rect x="5" y="24" width="16" height="15" rx="2" fill="#6B3E1B" />
                  <rect x="25" y="24" width="16" height="15" rx="2" fill="#6B3E1B" />
                  {/* Golden Foil Wrapper */}
                  <path d="M0,32 L46,32 L46,58 L0,58 Z" fill="url(#chocoFoilGrad)" stroke="#2A1B0E" strokeWidth="2" />
                  {/* "CHOCO" Text on foil */}
                  <text x="23" y="48" fontSize="8" fontWeight="bold" fill="#4A2810" textAnchor="middle">🍫 VINI</text>
                </g>

                {/* Big Glowing Heart held by right paw */}
                <g transform="translate(162, 192) scale(0.85)">
                  <path
                    d="M20,10 A12,12 0 0,0 0,22 A12,12 0 0,0 20,38 A12,12 0 0,0 40,22 A12,12 0 0,0 20,10 Z"
                    fill="url(#heartGrad)"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    transform="rotate(-45 20 22)"
                  />
                  <text x="20" y="26" fontSize="9" fontWeight="900" fill="#FFFFFF" textAnchor="middle">💖 VINI</text>
                </g>

                {/* SVG Gradients */}
                <defs>
                  <linearGradient id="partyHatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="50%" stopColor="#7C69EF" />
                    <stop offset="100%" stopColor="#FF6584" />
                  </linearGradient>
                  <linearGradient id="chocoFoilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFE600" />
                    <stop offset="50%" stopColor="#FFF176" />
                    <stop offset="100%" stopColor="#FFA000" />
                  </linearGradient>
                  <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF007F" />
                    <stop offset="100%" stopColor="#FF1493" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Interactive Floating Message Toast under Big Teddy */}
            {activeMessage && (
              <div className="mt-2 z-40 max-w-md mx-4 p-3.5 bg-gradient-to-r from-[#30004c]/95 via-[#5a0066]/95 to-[#30004c]/95 border-3 border-[#FFE600] rounded-2xl shadow-[0_0_40px_rgba(255,230,0,0.6)] text-center animate-fadeIn text-white">
                <div className="flex justify-center items-center gap-2 text-xl mb-1">
                  <span>🧸</span>
                  <span>💖</span>
                  <span>🍫</span>
                </div>
                <p className="font-extrabold text-xs sm:text-sm text-[#FFE600] leading-snug">
                  {activeMessage}
                </p>
                <span className="text-[10px] font-bold text-pink-300 block mt-1 uppercase tracking-wider">
                  ✨ Treats Unlocked: {clickedCount} • Tap Big Teddy for More Hugs! ✨
                </span>
              </div>
            )}

          </div>

          {/* 44 FLYING / FLOATING TEDDY BEARS & CHOCOLATES */}
          <div className="absolute inset-0 pointer-events-auto overflow-hidden">
            {treats.map((item) => (
              <div
                key={item.id}
                onClick={() => handleTreatClick(item)}
                className="absolute cursor-pointer select-none transition-transform hover:scale-150 active:scale-95 animate-treat-float group"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  fontSize: `${item.size}px`,
                  transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                  animationDelay: `${item.delay}s`,
                  animationDuration: `${item.duration}s`,
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.7))"
                }}
                title={`Click for ${item.label} surprise!`}
              >
                <div className="relative transform transition-transform group-hover:rotate-12">
                  <span>{item.emoji}</span>
                  {/* Mini Hover Sparkle */}
                  <span className="absolute -top-2 -right-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    ✨
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="mb-6 z-40 flex flex-wrap items-center justify-center gap-3 px-4 animate-fadeIn">
            <button
              onClick={() => {
                triggerExplosionConfetti();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-[#FFE600] to-[#FF9F1C] hover:brightness-110 active:scale-95 text-[#2A2B70] font-black text-xs sm:text-sm rounded-xl border-3 border-[#2A2B70] shadow-[3px_3px_0px_0px_#2A2B70] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>More Confetti & Chocolates! 🍫</span>
            </button>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-gradient-to-r from-[#00E5FF] to-[#00C9A7] hover:brightness-110 active:scale-95 text-[#2A2B70] font-black text-xs sm:text-sm rounded-xl border-3 border-[#2A2B70] shadow-[3px_3px_0px_0px_#2A2B70] transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Rotating Gift Box 🔄</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-[#FF6584] hover:bg-[#ff4770] active:scale-95 text-white font-black text-xs sm:text-sm rounded-xl border-3 border-white shadow-[3px_3px_0px_0px_#2A2B70] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Back to Birthday OS 🎂</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default GiftBoxSurprise;
