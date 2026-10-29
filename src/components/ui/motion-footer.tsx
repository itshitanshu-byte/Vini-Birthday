"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Sparkles, PartyPopper, Cake, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Ensure GSAP plugins are safely registered in browser environments
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MagneticButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  as?: "a" | "button";
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function MagneticButton({
  children,
  className,
  as = "a",
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.35,
      rotateX: -y * 0.1,
      rotateY: x * 0.1,
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
      transformPerspective: 600,
    });
  };

  const handleMouseLeave = () => {
    const el = buttonRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  const sharedProps = {
    ref: buttonRef,
    className: cn(
      "relative inline-flex items-center justify-center transition-shadow select-none will-change-transform",
      className
    ),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  if (as === "button") {
    return (
      <button
        type="button"
        {...(sharedProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        {...(props as any)}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      {...sharedProps}
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </a>
  );
}

interface CinematicFooterProps {
  onEnterClick?: (e: React.MouseEvent<HTMLElement>) => void;
  transitionPhase?: "idle" | "button-pulse" | "particle-blast" | "screen-warp" | "materializing" | "complete";
}

export function CinematicFooter({ onEnterClick, transitionPhase = "idle" }: CinematicFooterProps = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLHeadingElement>(null);
  const contentRevealRef = useRef<HTMLDivElement>(null);
  const auroraGlowRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Giant Background Text Animation (Scrubbed with ScrollTrigger)
      if (giantTextRef.current) {
        if (!isReducedMotion) {
          gsap.fromTo(
            giantTextRef.current,
            {
              yPercent: 20,
              scale: 0.9,
              opacity: 0,
            },
            {
              yPercent: 0,
              scale: 1,
              opacity: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 90%",
                end: "center center",
                scrub: 1.2,
              },
            }
          );
        } else {
          gsap.set(giantTextRef.current, { opacity: 0.05, yPercent: 0, scale: 1 });
        }
      }

      // Main Content Staggered Reveal on Mount
      if (contentRevealRef.current) {
        const elements = contentRevealRef.current.querySelectorAll(".reveal-item");
        if (!isReducedMotion && elements.length > 0) {
          gsap.fromTo(
            elements,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.1,
            }
          );
        } else {
          gsap.set(elements, { opacity: 1, y: 0 });
        }
      }

      // Subtle Aurora Glow Breathing Animation
      if (auroraGlowRef.current && !isReducedMotion) {
        gsap.to(auroraGlowRef.current, {
          opacity: 0.7,
          scale: 1.1,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToHome = () => {
    const el = document.getElementById("birthday-os-desktop");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (onEnterClick) {
      onEnterClick(e);
    }
  };

  const isWarping = transitionPhase === "screen-warp" || transitionPhase === "materializing" || transitionPhase === "complete";
  const isButtonPulsing = transitionPhase === "button-pulse";
  const isButtonDissolving = transitionPhase === "particle-blast" || isWarping;

  return (
    <section
      ref={containerRef}
      className={`relative w-full min-h-screen min-h-[100dvh] pt-safe pb-safe bg-[#0d0f1d] text-white flex flex-col justify-center items-center overflow-hidden font-jakarta select-none z-30 px-4 transition-all duration-700 ease-out ${
        isWarping
          ? "scale-125 blur-xl opacity-0 pointer-events-none"
          : "scale-100 blur-0 opacity-100"
      }`}
      aria-label="Cinematic Birthday Hero"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated Aurora Glow Gradients */}
      <div
        ref={auroraGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-[#7C69EF]/25 via-[#FF6584]/20 to-[#00E5FF]/20 blur-[120px] rounded-full pointer-events-none opacity-60 will-change-transform"
      />
      <div className="absolute -bottom-24 left-1/4 w-[400px] h-[280px] bg-[#00E5FF]/15 blur-[100px] rounded-full pointer-events-none" />

      {/* Giant Background Watermark Text: Subtle Depth Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
        <h1
          ref={giantTextRef}
          className="text-[18vw] font-black tracking-tighter text-white/[0.04] font-montserrat uppercase leading-none will-change-transform text-center select-none"
          style={{
            letterSpacing: "-0.04em",
          }}
        >
          VINI
        </h1>
      </div>

      {/* Main Center Content */}
      <div
        ref={contentRevealRef}
        className="relative z-10 w-full max-w-4xl mx-auto px-4 py-16 flex flex-col items-center text-center my-auto"
      >
        {/* Celebration Badge */}
        <div className="reveal-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md mb-6 shadow-md">
          <Sparkles className="w-4 h-4 text-[#FFE600]" />
          <span className="text-xs font-bold tracking-widest uppercase text-white/90">
            Special Birthday Edition
          </span>
          <PartyPopper className="w-4 h-4 text-[#FF6584]" />
        </div>

        {/* Metallic / Glowing Heading - Elegantly Sized */}
        <h2 className="reveal-item text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 sm:mb-5 bg-gradient-to-r from-[#FFE600] via-white to-[#00E5FF] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,230,0,0.25)] leading-tight px-2">
          Happy Birthday Vini
        </h2>

        <p className="reveal-item text-slate-300 text-xs sm:text-base md:text-lg max-w-lg leading-relaxed mb-6 sm:mb-8 font-normal px-2">
          Wishing you an incredible day filled with endless joy, laughter, and unforgettable moments! 🎉✨
        </p>

        {/* Primary Interactive CTA Button with Magical Glow */}
        <div
          ref={buttonContainerRef}
          className={`reveal-item relative flex flex-wrap items-center justify-center gap-4 mb-6 sm:mb-8 transition-all duration-500 ${
            isButtonDissolving
              ? "opacity-0 scale-75 blur-md"
              : isButtonPulsing
              ? "scale-110 brightness-150"
              : "scale-100 opacity-100"
          }`}
        >
          {/* Animated pulsing neon halo behind button */}
          <div
            className={`absolute -inset-2 bg-gradient-to-r from-[#FFE600] via-[#FF00A0] to-[#00F0FF] rounded-full blur-xl transition-all duration-300 pointer-events-none ${
              isButtonPulsing ? "opacity-100 scale-125" : "opacity-75 group-hover:opacity-100"
            }`}
          />
          
          <MagneticButton
            as="button"
            onClick={handleEnter}
            className="relative px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#FFE600] via-[#FF6584] to-[#00E5FF] text-[#0d0f1d] font-black text-xs sm:text-base flex items-center gap-2 sm:gap-3 shadow-[0_0_35px_rgba(255,230,0,0.5)] hover:shadow-[0_0_55px_rgba(255,101,132,0.8)] border-2 border-white group transition-all transform active:scale-95 cursor-pointer touch-manipulation"
            aria-label="Enter Birthday Celebration OS"
          >
            <span className="text-xl animate-bounce">✨</span>
            <span className="tracking-wide">Enter Birthday OS</span>
            <Sparkles className="w-5 h-5 text-[#0d0f1d] fill-[#0d0f1d] group-hover:rotate-45 transition-transform duration-300" />
          </MagneticButton>
        </div>

        {/* Scroll down indicator to enter the OS */}
        <div className="reveal-item">
          <button
            onClick={handleEnter}
            className="flex flex-col items-center gap-1.5 text-xs text-[#00E5FF] hover:text-[#FFE600] font-bold tracking-widest uppercase transition-colors group cursor-pointer"
          >
            <span>Click To Explore OS</span>
            <Sparkles className="w-4 h-4 animate-pulse text-[#FFE600]" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CinematicFooter;
