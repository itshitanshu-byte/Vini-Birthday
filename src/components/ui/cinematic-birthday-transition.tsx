import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { magicSound } from "@/lib/magic-sound";

export interface CinematicTransitionHandle {
  startTransition: (coords?: { x: number; y: number }) => void;
}

interface CinematicBirthdayTransitionProps {
  onMaterializeStart: () => void;
  onTransitionComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  drag: number;
  rotation: number;
  vRot: number;
  isStar: boolean;
  sparkleSpeed: number;
  sparklePhase: number;
}

const PALETTE = [
  "#FF00A0", // neon pink
  "#00F0FF", // neon cyan
  "#7C69EF", // magical purple
  "#FFE600", // electric yellow
  "#00E5FF", // bright blue
  "#FF6584", // coral pink
  "#FFFFFF", // radiant white
  "#FFD700"  // gold
];

export const CinematicBirthdayTransition = forwardRef<
  CinematicTransitionHandle,
  CinematicBirthdayTransitionProps
>(({ onMaterializeStart, onTransitionComplete }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<
    "idle" | "button-pulse" | "particle-blast" | "screen-warp" | "materializing" | "complete"
  >("idle");
  const [glitchActive, setGlitchActive] = useState(false);
  const [radialColor, setRadialColor] = useState<"purple" | "pink" | "cyan">("purple");

  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number | null>(null);

  // Expose trigger method to parent
  useImperativeHandle(ref, () => ({
    startTransition: (coords?: { x: number; y: number }) => {
      // 1. Play synthesized magical sound
      magicSound.playMagicalPortalSound();

      // 0.0s -> Button glow & energy pulse
      setPhase("button-pulse");

      // 0.4s -> Particle explosion from button location
      setTimeout(() => {
        setPhase("particle-blast");
        spawnParticles(coords?.x, coords?.y);
      }, 400);

      // 0.5s -> Screen transformation, zoom forward, chromatic glitch
      setTimeout(() => {
        setPhase("screen-warp");
        setGlitchActive(true);
        setRadialColor("purple");

        setTimeout(() => setRadialColor("pink"), 180);
        setTimeout(() => setRadialColor("cyan"), 380);
        setTimeout(() => setGlitchActive(false), 260);
      }, 500);

      // 0.8s -> Birthday OS begins materializing
      setTimeout(() => {
        setPhase("materializing");
        onMaterializeStart();
      }, 800);

      // 2.4s -> Transition completes & settles
      setTimeout(() => {
        setPhase("complete");
        onTransitionComplete();
        setTimeout(() => setPhase("idle"), 500);
      }, 2400);
    }
  }));

  // Particle Physics System
  const spawnParticles = (originX?: number, originY?: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const startX = originX ?? window.innerWidth / 2;
    const startY = originY ?? window.innerHeight / 2 + 80;

    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 160 : 320;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 20 + 5;
      const isStar = Math.random() < 0.4;

      newParticles.push({
        x: startX + (Math.random() - 0.5) * 30,
        y: startY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed * (Math.random() * 1.2 + 0.4),
        vy: Math.sin(angle) * speed * (Math.random() * 1.2 + 0.4) - Math.random() * 6,
        size: isStar ? Math.random() * 5 + 3 : Math.random() * 4.5 + 1.5,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        alpha: 1,
        decay: Math.random() * 0.012 + 0.007,
        gravity: 0.14,
        drag: 0.965,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.3,
        isStar,
        sparkleSpeed: Math.random() * 0.15 + 0.05,
        sparklePhase: Math.random() * Math.PI * 2
      });
    }

    particlesRef.current = newParticles;
    startAnimationLoop();
  };

  const drawStar = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number
  ) => {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  };

  const startAnimationLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (animIdRef.current) cancelAnimationFrame(animIdRef.current);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update physics
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= p.decay;
        p.sparklePhase += p.sparkleSpeed;

        if (p.alpha <= 0 || p.y > canvas.height + 50) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const currentAlpha = Math.max(
          0,
          p.alpha * (0.7 + Math.sin(p.sparklePhase) * 0.3)
        );
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.isStar ? 14 : 6;

        if (p.isStar) {
          drawStar(ctx, 0, 0, 4, p.size * 1.5, p.size * 0.4);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (particles.length > 0) {
        animIdRef.current = requestAnimationFrame(render);
      }
    };

    render();
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-all duration-700 ${
        phase === "idle" || phase === "complete" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* 1. Dynamic Radial Glow transitioning purple -> pink -> cyan */}
      {(phase === "screen-warp" || phase === "materializing") && (
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ${
            radialColor === "purple"
              ? "bg-[radial-gradient(circle_at_center,rgba(124,105,239,0.5)_0%,rgba(13,15,29,0.85)_70%)]"
              : radialColor === "pink"
              ? "bg-[radial-gradient(circle_at_center,rgba(255,0,160,0.55)_0%,rgba(13,15,29,0.85)_70%)]"
              : "bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.45)_0%,rgba(13,15,29,0.85)_70%)]"
          }`}
        />
      )}

      {/* 2. Subtle Chromatic Glitch Flash */}
      {glitchActive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.4) 50%, rgba(255, 0, 160, 0.4) 50%)`,
            backgroundSize: "100% 4px",
            filter: "contrast(180%) brightness(130%)"
          }}
        />
      )}

      {/* 3. Always-Mounted Particle Explosion Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
});

CinematicBirthdayTransition.displayName = "CinematicBirthdayTransition";
export default CinematicBirthdayTransition;
