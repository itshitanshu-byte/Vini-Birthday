import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Wand2, Star, Heart, Cake, PartyPopper, Crown, Rocket } from "lucide-react";
import { magicSound } from "@/lib/magic-sound";

interface MagicalPortalTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

interface ParticleStar {
  x: number;
  y: number;
  z: number;
  pz: number;
  color: string;
  size: number;
}

const FLOATING_ICONS = [
  { emoji: "✨", label: "sparkle" },
  { emoji: "🎂", label: "cake" },
  { emoji: "💖", label: "heart" },
  { emoji: "👑", label: "crown" },
  { emoji: "🪄", label: "wand" },
  { emoji: "🎈", label: "balloon" },
  { emoji: "⭐", label: "star" },
  { emoji: "🥳", label: "party" },
  { emoji: "🦄", label: "magic" },
  { emoji: "🎁", label: "gift" },
  { emoji: "💫", label: "dizzy" },
  { emoji: "🌺", label: "flower" }
];

export const MagicalPortalTransition: React.FC<MagicalPortalTransitionProps> = ({
  isActive,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [warpPhase, setWarpPhase] = useState<"charging" | "hyperdrive" | "reveal" | "done">("charging");
  const [phaseText, setPhaseText] = useState("✨ CASTING BIRTHDAY MAGIC SPELL... ✨");
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      setWarpPhase("charging");
      return;
    }

    // 1. Play synthesized magical crystal chimes & warp sound
    magicSound.playMagicalPortalSound();

    // 2. Fire continuous celebratory confetti cannons in sync with magic
    const confettiColors = ["#FFE600", "#FF6584", "#00E5FF", "#7C69EF", "#FFD700", "#FF1493"];
    
    // Wave 1: Center sparkle burst
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: confettiColors,
      ticks: 200,
    });

    // Wave 2: Left and right cannons
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: confettiColors,
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: confettiColors,
      });
    }, 400);

    // Wave 3: Grand Climax Fireworks Confetti
    const timer2 = setTimeout(() => {
      confetti({
        particleCount: 160,
        spread: 140,
        origin: { y: 0.4 },
        colors: confettiColors,
        scalar: 1.2,
      });
    }, 1100);

    // Phase management
    const tPhase1 = setTimeout(() => {
      setWarpPhase("hyperdrive");
      setPhaseText("🚀 OPENING VINI'S RETRO OS DIMENSION 💫");
    }, 600);

    const tPhase2 = setTimeout(() => {
      setWarpPhase("reveal");
      setPhaseText("🎉 WELCOME TO VINI'S BIRTHDAY OS! 🎂");
    }, 1400);

    const tPhase3 = setTimeout(() => {
      setWarpPhase("done");
      onComplete();
    }, 2200);

    // Progress bar ticker
    const startTime = Date.now();
    const duration = 2100;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 30);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(tPhase1);
      clearTimeout(tPhase2);
      clearTimeout(tPhase3);
      clearInterval(interval);
    };
  }, [isActive, onComplete]);

  // Canvas Warp Tunnel / Starfield Animation
  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const numStars = 250;
    const colors = ["#FFE600", "#FF6584", "#00E5FF", "#FFFFFF", "#7C69EF", "#FF85A1"];
    const stars: ParticleStar[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        pz: Math.random() * width,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2.5 + 1.2,
      });
    }

    let speed = 8;
    const loop = () => {
      if (speed < 45) speed += 0.8;

      ctx.fillStyle = "rgba(13, 15, 29, 0.28)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.pz = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.z = width;
          star.pz = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 280 / star.z;
        const pk = 280 / star.pz;
        const px = star.x * k + cx;
        const py = star.y * k + cy;
        const prevX = star.x * pk + cx;
        const prevY = star.y * pk + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.min(6, (1 - star.z / width) * 4 * star.size);
          ctx.lineCap = "round";
          ctx.shadowBlur = 12;
          ctx.shadowColor = star.color;
          ctx.stroke();
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-auto flex items-center justify-center overflow-hidden select-none font-montserrat">
      {/* 1. Dynamic Warp Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 2. Concentric Neon Portal Vortex Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer Ring */}
        <div
          className={`w-[680px] h-[680px] rounded-full border-4 border-dashed border-[#00E5FF]/70 blur-[1px] animate-spin transition-transform duration-1000 ${
            warpPhase === "hyperdrive" ? "scale-150 opacity-90 duration-500" : "scale-100 opacity-60"
          }`}
          style={{ animationDuration: "14s" }}
        />
        {/* Middle Ring */}
        <div
          className={`absolute w-[480px] h-[480px] rounded-full border-4 border-[#FF6584]/80 shadow-[0_0_50px_rgba(255,101,132,0.8)] transition-all duration-700 ${
            warpPhase === "hyperdrive" ? "scale-125 rotate-180 duration-500" : "scale-95 rotate-0"
          }`}
          style={{ animation: "spin 9s linear infinite reverse" }}
        />
        {/* Golden Magic Core Ring */}
        <div
          className={`absolute w-[320px] h-[320px] rounded-full border-6 border-[#FFE600] shadow-[0_0_80px_rgba(255,230,0,0.9)] transition-all duration-500 ${
            warpPhase === "hyperdrive" ? "scale-140 brightness-150" : "scale-100"
          }`}
          style={{ animation: "spin 5s linear infinite" }}
        />
        {/* Radial Aurora Glow Core */}
        <div className="absolute w-[260px] h-[260px] rounded-full bg-gradient-to-tr from-[#FF00A0] via-[#FFE600] to-[#00F0FF] blur-[70px] opacity-80 animate-pulse" />
      </div>

      {/* 3. Floating 3D Magic Icon Burst Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FLOATING_ICONS.map((item, idx) => {
          const angle = (idx / FLOATING_ICONS.length) * 2 * Math.PI;
          const radius = warpPhase === "hyperdrive" ? 380 : 180;
          const tx = Math.cos(angle) * radius;
          const ty = Math.sin(angle) * radius;
          const delay = idx * 60;

          return (
            <div
              key={idx}
              className="absolute left-1/2 top-1/2 text-3xl sm:text-4xl transition-all duration-1000 ease-out"
              style={{
                transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${idx * 45}deg) scale(${
                  warpPhase === "hyperdrive" ? 1.6 : 1
                })`,
                opacity: warpPhase === "reveal" ? 0 : 1,
                filter: "drop-shadow(0 0 16px #FFE600)",
                transitionDelay: `${delay}ms`,
              }}
            >
              {item.emoji}
            </div>
          );
        })}
      </div>

      {/* 4. Magical Central HUD Dialog Card */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-lg px-6 py-8 mx-4 bg-[#0d0f1d]/85 backdrop-blur-xl border-3 border-[#FFE600] rounded-3xl shadow-[0_0_60px_rgba(255,230,0,0.5)] animate-cake-drop">
        {/* Magic Wand & Sparkles Header Icon */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#FFE600] via-[#FF6584] to-[#00E5FF] p-1 shadow-[0_0_30px_rgba(255,101,132,0.8)] animate-bounce flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0f1d] rounded-xl flex items-center justify-center">
              <Wand2 className="w-10 h-10 text-[#FFE600] animate-spin" style={{ animationDuration: "6s" }} />
            </div>
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-[#FFE600] fill-[#FFE600] animate-pulse" />
          <Star className="absolute -bottom-2 -left-2 w-6 h-6 text-[#00E5FF] fill-[#00E5FF] animate-pulse" />
        </div>

        {/* Dynamic Status Text */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FFE600] font-black text-xs tracking-widest uppercase mb-3">
          <PartyPopper className="w-3.5 h-3.5 text-[#FF6584]" />
          <span>Birthday OS Portal Active</span>
          <Crown className="w-3.5 h-3.5 text-[#FFE600]" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide leading-tight mb-2 drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
          {phaseText}
        </h3>

        <p className="text-xs sm:text-sm text-gray-300 font-medium mb-6">
          Hold on tight! Transporting into Vini's retro wonderland... ✨
        </p>

        {/* Retro Glowing Progress Bar */}
        <div className="w-full bg-[#1e1b4b] rounded-full h-4 p-0.5 border-2 border-[#FFE600]/80 shadow-[0_0_20px_rgba(255,230,0,0.3)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFE600] via-[#FF6584] to-[#00E5FF] rounded-full transition-all duration-100 ease-out flex items-center justify-end pr-1"
            style={{ width: `${progress}%` }}
          >
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
        </div>

        {/* Warp Meter Percentage */}
        <div className="w-full flex justify-between items-center mt-2 text-[11px] font-mono font-bold text-gray-300">
          <span className="text-[#00E5FF]">WARP MATRIX: READY</span>
          <span className="text-[#FFE600] font-black text-sm">{progress}%</span>
        </div>
      </div>

      {/* 5. Climax Screen Flash Transition Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-[#00E5FF]/40 to-[#FF6584]/50 transition-opacity duration-700 ease-out ${
          warpPhase === "reveal" ? "opacity-90" : "opacity-0"
        }`}
      />
    </div>
  );
};
export default MagicalPortalTransition;
