import React, { useState, useEffect, useRef } from "react";
import SocialCards, { type CardItem } from "@/components/ui/card-fan-carousel";
import BalloonBackground from "@/components/ui/balloons-pop-background";
import { RetroWindow } from "@/components/ui/retro-window";
import { RetroSidebarIcons } from "@/components/ui/retro-sidebar-icons";
import { RetroModals } from "@/components/ui/retro-modals";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { RetroLockScreen } from "@/components/ui/retro-lock-screen";
import { GiftBoxSurprise } from "@/components/ui/gift-box-surprise";
import {
  CinematicBirthdayTransition,
  type CinematicTransitionHandle
} from "@/components/ui/cinematic-birthday-transition";
import {
  SmileyBadgeIcon,
  MemphisZigzag
} from "@/components/ui/memphis-decorations";
import {
  VaporwaveSun,
  VaporwaveStar,
  VaporwaveCloud,
  VaporwaveBirds,
  VaporwaveLeaves,
  VaporwaveCupcake,
  VaporwaveWishWidget,
  VaporwaveStarsWidget,
  VaporwaveEmojiWidget
} from "@/components/ui/vaporwave-decorations";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Heart,
  Gift,
  Volume2,
  VolumeX,
  Cake,
  PartyPopper,
  Tv,
  Lock,
  ArrowLeft
} from "lucide-react";

const DEMO_CARDS: CardItem[] = [
  {
    id: "card-1",
    imgUrl: "/photos/vini-1.jpg",
    alt: "Vini 90s aesthetic portrait",
    title: "Retro Aesthetic Vibe ✨",
    description: "Capturing pure 90s nostalgia with classic frames, timeless charm, and unforgettable vibes.",
    badge: "Vini Vibe",
  },
  {
    id: "card-2",
    imgUrl: "/photos/vini-2.jpg",
    alt: "Vini smiling candid portrait",
    title: "Sweet Smiles & Golden Moments 💖",
    description: "A moment frozen in time — radiating warmth, elegance, and endless happiness on your special day.",
    badge: "Moments",
  },
  {
    id: "card-3",
    imgUrl: "/photos/vini-4.jpg",
    alt: "Vini heart filter portrait",
    title: "Queen of Hearts & Sweet Vibes 💕",
    description: "Surrounded by love and blessings! Wishing you all the joy, love, and dream-worthy adventures ahead.",
    badge: "Birthday Girl",
  },
  {
    id: "card-4",
    imgUrl: "/photos/vini-5.jpg",
    alt: "Vini mirror selfie",
    title: "Mirror Selfie Glam ✨👗",
    description: "Dressed to celebrate! Stepping into another fabulous year with grace, confidence, and sparkle.",
    badge: "Glamour",
  }
];

export function App() {
  const [currentView, setCurrentView] = useState<'hero' | 'os'>('hero');
  const transitionRef = useRef<CinematicTransitionHandle>(null);

  const [transitionPhase, setTransitionPhase] = useState<
    "idle" | "button-pulse" | "particle-blast" | "screen-warp" | "materializing" | "complete"
  >("idle");

  // Materialization stages: 0 = hidden, 1 = window frame, 2 = sidebar, 3 = main card, 4 = floating widgets, 5 = nav tabs, 6 = settled
  const [materializeStage, setMaterializeStage] = useState<number>(0);

  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'jar' | 'food' | 'cake' | 'movies' | 'letter' | 'drinks' | 'music' | null>(null);
  const [showBalloons, setShowBalloons] = useState(true);
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [activeTab, setActiveTab] = useState<'invitation' | 'carousel' | 'wishes'>('invitation');

  const [wishes, setWishes] = useState<string[]>([
    "Happy Birthday Vini! Stay awesome as always! 🎉",
    "Wishing you health, happiness, and tons of success this year! ⭐",
    "Keep shining bright, Vini! Have the best birthday ever! 🥳"
  ]);
  const [newWish, setNewWish] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FFE600", "#FF6584", "#00E5FF", "#7C69EF", "#00C9A7"]
    });
  };

  useEffect(() => {
    // Live clock for bottom 90s OS Taskbar
    const clockInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    }, 1000);

    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  const handleEnterOSClick = (e?: React.MouseEvent<HTMLElement>) => {
    let coords: { x: number; y: number } | undefined = undefined;
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      coords = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    // 0.0s -> Button glow & energy pulse
    setTransitionPhase("button-pulse");

    // 0.4s -> Particle explosion
    setTimeout(() => {
      setTransitionPhase("particle-blast");
    }, 400);

    // 0.5s -> Screen warp
    setTimeout(() => {
      setTransitionPhase("screen-warp");
    }, 500);

    // Trigger canvas & audio physics engine
    transitionRef.current?.startTransition(coords);
  };

  const handleMaterializeStart = () => {
    setCurrentView('os');
    try {
      sessionStorage.setItem('vini_os_unlocked', 'true');
    } catch { }

    // Staged reveals per requirements:
    // 0.8s (T+0): Window container
    setMaterializeStage(1);

    // 1.1s (T+300ms): Sidebar
    setTimeout(() => setMaterializeStage(2), 300);

    // 1.3s (T+500ms): Main birthday card
    setTimeout(() => setMaterializeStage(3), 500);

    // 1.6s (T+800ms): Floating widgets
    setTimeout(() => setMaterializeStage(4), 800);

    // 1.9s (T+1100ms): Navigation tabs
    setTimeout(() => setMaterializeStage(5), 1100);

    // 2.3s: Settled
    setTimeout(() => {
      setMaterializeStage(6);
      triggerConfetti();
    }, 1500);
  };

  const handleTransitionComplete = () => {
    setTransitionPhase("complete");
    setTimeout(() => {
      setTransitionPhase("idle");
    }, 500);
  };

  const handleLockPage = () => {
    try {
      sessionStorage.removeItem('vini_os_unlocked');
    } catch { }
    setMaterializeStage(0);
    setTransitionPhase("idle");
    setCurrentView('hero');
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim()) return;
    setWishes([newWish.trim(), ...wishes]);
    setNewWish("");
    triggerConfetti();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d0f1d] text-[#2A2B70] flex flex-col overflow-x-hidden selection:bg-[#FFE600] selection:text-[#2A2B70]">

      {/* 1. Cinematic Birthday Transition Canvas & Warp Controller */}
      <CinematicBirthdayTransition
        ref={transitionRef}
        onMaterializeStart={handleMaterializeStart}
        onTransitionComplete={handleTransitionComplete}
      />

      {/* 2. VIEW 1: Cinematic Hero Landing Page */}
      {currentView === 'hero' && (
        <CinematicFooter
          onEnterClick={handleEnterOSClick}
          transitionPhase={transitionPhase}
        />
      )}

      {/* 3. VIEW 2: Full 90s Birthday OS (In-place Transformation, No scrolling) */}
      {currentView === 'os' && (
        <div className="relative min-h-screen w-full retro-grid-bg flex flex-col justify-between overflow-x-hidden">

          {/* Interactive Pop Balloon Overlay */}
          {showBalloons && <BalloonBackground />}

          {/* Retro 90s Desktop Top Title Bar */}
          <header className={`w-full bg-[#2A2B70] text-white px-2 sm:px-4 py-1.5 sm:py-2 pt-safe flex items-center justify-between z-30 shadow-md border-b-2 border-[#FFE600]/40 font-montserrat transition-all duration-500 ${materializeStage >= 1 ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 bg-[#FF6584] rounded border border-white font-black text-xs sm:text-sm tracking-wider">
                <Cake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span>VINI OS</span>
              </div>
              <span className="hidden lg:inline-block text-xs text-[#FFE600] font-bold tracking-wide">
                ★ Retro 90s Birthday Celebration ★
              </span>
            </div>

            {/* Viewport Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <button
                onClick={() => setShowGiftBox(true)}
                className="px-2 sm:px-3 py-1 bg-gradient-to-r from-[#FFE600] to-[#FF6584] hover:brightness-110 text-[#2A2B70] font-black text-xs rounded border-2 border-white shadow transition-all active:scale-95 flex items-center gap-1 animate-bounce touch-manipulation"
                title="Open 3D Gift Box"
              >
                <Gift className="w-3.5 h-3.5 text-[#2A2B70]" />
                <span className="hidden xs:inline sm:inline">🎁 Gifts</span>
              </button>

              <button
                onClick={() => setShowBalloons(!showBalloons)}
                className={`px-2 sm:px-2.5 py-1 text-xs font-bold rounded border-2 border-white transition-all flex items-center gap-1 touch-manipulation ${showBalloons ? 'bg-[#00E5FF] text-[#2A2B70]' : 'bg-[#2A2B70] text-white'
                  }`}
                title="Toggle Pop Balloons"
              >
                <span>🎈</span>
                <span className="hidden sm:inline">Balloons: {showBalloons ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`px-2 sm:px-2.5 py-1 text-xs font-bold rounded border-2 border-white transition-all flex items-center gap-1 touch-manipulation ${isPlayingAudio ? 'bg-[#FF6584] text-white animate-pulse' : 'bg-white/20 text-white'
                  }`}
                title="Toggle Music"
              >
                {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">{isPlayingAudio ? "Music On" : "Music Off"}</span>
              </button>

              <button
                onClick={triggerConfetti}
                className="px-2 sm:px-3 py-1 bg-[#FFE600] hover:bg-yellow-300 text-[#2A2B70] font-extrabold text-xs rounded border-2 border-white shadow transition-all active:scale-95 flex items-center gap-1 touch-manipulation"
                title="Pop Celebration Confetti"
              >
                <PartyPopper className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Celebrate! 🎉</span>
              </button>

              <button
                onClick={handleLockPage}
                className="px-2 sm:px-2.5 py-1 bg-[#FF6584] hover:bg-pink-600 text-white font-bold text-xs rounded border-2 border-white shadow transition-all active:scale-95 flex items-center gap-1 cursor-pointer touch-manipulation"
                title="Return to Hero"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Lock OS</span>
              </button>
            </div>
          </header>

          {/* Main 90s Desktop Canvas */}
          <main className="relative flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8 flex flex-col justify-center z-20">

            {/* Step 5: Top Navigation Tabs (1.9s) */}
            <div className={`flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 font-montserrat z-20 transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${materializeStage >= 5 ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-6 opacity-0 scale-90'
              }`}>
              <button
                onClick={() => setActiveTab('invitation')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-lg border-t-3 sm:border-t-4 border-x-3 sm:border-x-4 border-[#2A2B70] font-extrabold text-xs sm:text-sm transition-all touch-manipulation ${activeTab === 'invitation'
                    ? 'bg-[#FF6584] text-white shadow-md translate-y-0.5'
                    : 'bg-white/80 hover:bg-white text-[#2A2B70]'
                  }`}
              >
                <span>✉️ </span>
                <span className="hidden sm:inline">Main Card</span>
                <span className="sm:hidden">Card</span>
              </button>
              <button
                onClick={() => setActiveTab('carousel')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-lg border-t-3 sm:border-t-4 border-x-3 sm:border-x-4 border-[#2A2B70] font-extrabold text-xs sm:text-sm transition-all touch-manipulation ${activeTab === 'carousel'
                    ? 'bg-[#00E5FF] text-[#2A2B70] shadow-md translate-y-0.5'
                    : 'bg-white/80 hover:bg-white text-[#2A2B70]'
                  }`}
              >
                <span>📸 </span>
                <span className="hidden sm:inline">Memory Carousel</span>
                <span className="sm:hidden">Memories</span>
              </button>
              <button
                onClick={() => setActiveTab('wishes')}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-lg border-t-3 sm:border-t-4 border-x-3 sm:border-x-4 border-[#2A2B70] font-extrabold text-xs sm:text-sm transition-all touch-manipulation ${activeTab === 'wishes'
                    ? 'bg-[#FFE600] text-[#2A2B70] shadow-md translate-y-0.5'
                    : 'bg-white/80 hover:bg-white text-[#2A2B70]'
                  }`}
              >
                <span>💌 </span>
                <span className="hidden sm:inline">Wish Board ({wishes.length})</span>
                <span className="sm:hidden">Wishes ({wishes.length})</span>
              </button>
            </div>

            {/* 90s Desktop Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* Step 2: Left Sidebar Navigation (1.1s) */}
              <div className={`lg:col-span-3 flex sm:flex-col items-center justify-center lg:items-start gap-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${materializeStage >= 2 ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                }`}>
                <RetroSidebarIcons
                  onSelectCategory={(cat) => setActiveCategory(cat)}
                  activeCategory={activeCategory}
                />

                {/* Floating 90s Desktop Decorative Graphic Badges */}
                <div className="hidden lg:flex flex-col gap-4 mt-4 items-center">
                  <div className="flex items-center gap-2 p-2 bg-white/80 rounded-xl border-2 border-[#2A2B70] shadow animate-float">
                    <SmileyBadgeIcon className="w-10 h-10" />
                    <span className="font-montserrat font-extrabold text-xs text-[#2A2B70]">
                      90s Vibes Only!
                    </span>
                  </div>
                  <MemphisZigzag color="#00E5FF" className="w-32 h-10 animate-squiggle" />
                </div>
              </div>

              {/* Center Main OS Window Display: Step 1 (0.8s) + Step 3 (1.3s) + Step 4 (1.6s) */}
              <div
                className={`lg:col-span-9 relative transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${materializeStage >= 1
                    ? 'scale-100 opacity-100 rotate-x-0 shadow-[0_0_50px_rgba(255,0,160,0.4)]'
                    : 'scale-75 opacity-0 rotate-x-6 shadow-none'
                  }`}
                style={{ perspective: "1200px" }}
              >

                {/* TAB 1: MAIN VAPORWAVE RETRO BIRTHDAY CARD */}
                {activeTab === 'invitation' && (
                  <RetroWindow
                    title="Gradient Vaporwave - Vini's Birthday OS"
                    headerBg="bg-gradient-to-r from-[#ff00a0] to-[#30004c]"
                    shadowVariant="pink"
                    className="w-full max-w-5xl mx-auto"
                  >
                    {/* Step 3: Main split card interior (1.3s) */}
                    <div className={`relative overflow-hidden border-3 border-[#30004c] rounded-xl shadow-2xl bg-[#30004c] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${materializeStage >= 3 ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                      }`}>

                      {/* Split Landing Page Layout (Left Purple / Right Cyan-Pink Gradient) */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">

                        {/* LEFT PANEL: Deep Purple & Magenta Nav & Hero Title */}
                        <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-b from-[#30004c] via-[#5a0066] to-[#8b006b] flex flex-col justify-between relative overflow-hidden text-white">

                          {/* Leaf Silhouette Background Overlay */}
                          <div className="absolute -bottom-10 -left-10 pointer-events-none opacity-40">
                            <VaporwaveLeaves className="w-44 h-64" />
                          </div>

                          {/* Sparkle Stars Decorative */}
                          <div className="absolute top-12 right-6 pointer-events-none animate-pulse">
                            <VaporwaveStar color="#ffe600" className="w-8 h-8" />
                          </div>
                          <div className="absolute bottom-20 left-4 pointer-events-none">
                            <VaporwaveStar color="#ff00a0" className="w-6 h-6" />
                          </div>

                          {/* Circular Logo Badge */}
                          <div className="flex items-center gap-4 z-10">
                            <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center text-center p-1 shadow-md bg-[#30004c]/40 backdrop-blur-xs">
                              <span className="font-montserrat font-black text-[10px] uppercase leading-tight tracking-wider text-white">
                                VINI<br />BASH
                              </span>
                            </div>
                            <span className="text-xs font-bold tracking-widest text-[#ffe600] uppercase">
                              22nd OCT • CELEBRATION
                            </span>
                          </div>

                          {/* Center Hero Script Title */}
                          <div className="my-6 sm:my-8 z-10">
                            <h1 className="font-windsong text-4xl sm:text-6xl md:text-7xl text-white leading-tight transform -rotate-3 vaporwave-text-shadow drop-shadow-lg">
                              happy<br />
                              <span className="pl-4 sm:pl-6 text-[#ffe600]">birthday</span>
                            </h1>
                            <h2 className="font-montserrat font-black text-xl sm:text-3xl text-white uppercase tracking-wider mt-3 sm:mt-4">
                              Happy Birthday <span className="text-[#00f0ff]">Vini!</span>
                            </h2>
                          </div>

                          {/* 4 Bottom Horizontal Gradient Bar Graphic Decorator */}
                          <div className="flex flex-col gap-1 mt-4 sm:mt-6 z-10">
                            <div className="h-1 bg-gradient-to-r from-[#00f0ff] via-[#ff00a0] to-transparent w-36 rounded-full" />
                            <div className="h-1 bg-gradient-to-r from-[#00f0ff] via-[#ff00a0] to-transparent w-28 rounded-full" />
                            <div className="h-1 bg-gradient-to-r from-[#00f0ff] via-[#ff00a0] to-transparent w-44 rounded-full" />
                            <div className="h-1 bg-gradient-to-r from-[#00f0ff] via-[#ff00a0] to-transparent w-20 rounded-full" />
                          </div>

                        </div>

                        {/* RIGHT PANEL: Aqua to Neon Pink Gradient Canvas with Cupcake & Popups */}
                        <div className="lg:col-span-7 p-4 sm:p-8 bg-gradient-to-tr from-[#ff00a0] via-[#00f0ff]/80 to-[#00f0ff] relative overflow-hidden flex flex-col items-center justify-between min-h-[420px] sm:min-h-[480px]">

                          {/* Perspective Grid Pattern Background */}
                          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#30004c_1px,transparent_1px),linear-gradient(to_bottom,#30004c_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                          {/* Birds Silhouette Flying Top Right */}
                          <div className="absolute top-3 right-12 pointer-events-none">
                            <VaporwaveBirds className="w-16 h-8" />
                          </div>

                          {/* Cloud Silhouette */}
                          <div className="absolute top-4 left-6 pointer-events-none">
                            <VaporwaveCloud className="w-14 h-7 opacity-90" />
                          </div>

                          {/* Step 4: Upper Right Emoji Status Widget (1.6s) */}
                          <div className={`absolute top-4 right-4 z-20 hidden sm:block transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${materializeStage >= 4 ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 -translate-y-4'
                            }`}>
                            <VaporwaveEmojiWidget />
                          </div>

                          {/* Step 4: Mid Right Rating Stars Widget (1.6s) */}
                          <div className={`absolute top-28 right-4 z-20 hidden md:block transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${materializeStage >= 4 ? 'scale-100 opacity-100 translate-x-0' : 'scale-50 opacity-0 translate-x-4'
                            }`}>
                            <VaporwaveStarsWidget />
                          </div>

                          {/* Step 4: Center Synthwave Sunset Circle & Cupcake (1.6s) */}
                          <div className={`relative z-10 mt-6 sm:mt-8 mb-2 flex justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${materializeStage >= 4 ? 'scale-100 opacity-100' : 'scale-70 opacity-0'
                            }`}>
                            <VaporwaveSun className="w-40 h-40 sm:w-60 sm:h-60" />

                            {/* Blue Birthday Cupcake positioned over Sun */}
                            <div className="absolute -bottom-2 z-20 transform hover:scale-105 transition-transform duration-300">
                              <VaporwaveCupcake className="w-40 sm:w-60" />
                            </div>
                          </div>

                          {/* Step 4: Middle Pop-up Window Widget ("WISH YOU ALL THE BEST") */}
                          <div className={`relative z-30 my-2 transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${materializeStage >= 4
                              ? '-rotate-1 hover:rotate-0 scale-100 opacity-100'
                              : 'scale-75 opacity-0 rotate-12'
                            }`}>
                            <VaporwaveWishWidget onOkClick={() => setShowGiftBox(true)} />
                          </div>

                        </div>

                      </div>

                      {/* BOTTOM EVENT DETAILS CARD */}
                      <div className="p-3.5 sm:p-6 bg-white border-t-3 border-[#30004c] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 font-montserrat">

                        {/* Left: Date Display */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#ff00a0] text-white rounded-xl border-2 border-[#30004c] shadow-[3px_3px_0px_0px_#30004c] sm:shadow-[4px_4px_0px_0px_#30004c] flex flex-col items-center justify-center font-black flex-shrink-0">
                            <span className="text-lg sm:text-xl leading-none">22</span>
                            <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold">OCT</span>
                          </div>
                          <div>
                            <h4 className="font-extrabold text-xs sm:text-sm text-[#30004c]">
                              Vini's Birthday Bash 🎂
                            </h4>
                            <p className="text-[11px] sm:text-xs font-medium text-gray-600">
                              October 22nd • Special Celebration
                            </p>
                          </div>
                        </div>

                        {/* Middle: Meaningful Time & Invitation Details */}
                        <div className="text-center sm:text-left border-y sm:border-y-0 sm:border-x border-gray-200 py-1.5 sm:py-0 sm:px-6 w-full sm:w-auto">
                          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[#ff00a0] font-bold text-xs sm:text-sm">
                            <span>🎉 Join the Celebration!</span>
                          </div>
                          <div className="font-black text-xs sm:text-base text-[#30004c] mt-0.5">
                            7:00 PM Onwards
                          </div>
                          <p className="text-[11px] sm:text-xs text-gray-500 font-semibold mt-0.5">
                            Cake, Drinks, Music & Good Vibes 🥳
                          </p>
                        </div>

                        {/* Right: Interactive RSVP Button */}
                        <button
                          onClick={triggerConfetti}
                          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#ff00a0] to-[#ff0055] hover:from-[#ff0080] hover:to-[#ff0040] text-white font-black text-xs sm:text-sm rounded-xl border-2 border-[#30004c] shadow-[3px_3px_0px_0px_#ffe600] sm:shadow-[4px_4px_0px_0px_#ffe600] active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
                        >
                          <PartyPopper className="w-4 h-4 text-[#ffe600]" />
                          <span>RSVP & Pop Confetti! 🎉</span>
                        </button>

                      </div>

                    </div>
                  </RetroWindow>
                )}

                {/* TAB 2: MEMORIES & CARD FAN CAROUSEL WINDOW */}
                {activeTab === 'carousel' && (
                  <RetroWindow
                    title="📸 Memories & Nostalgic Photo Carousel - Vini's Birthday OS"
                    headerBg="bg-gradient-to-r from-[#00E5FF] via-[#7C69EF] to-[#FF6584]"
                    headerTextColor="text-white"
                    shadowVariant="yellow"
                    className="w-full max-w-5xl mx-auto"
                  >
                    <div className="relative overflow-hidden rounded-xl border-3 border-[#30004c] bg-gradient-to-b from-[#1c0838] via-[#2d0f50] to-[#140529] p-4 sm:p-6 shadow-2xl font-montserrat text-white">

                      {/* Perspective Retro Grid Ambient Background */}
                      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#00f0ff_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

                      {/* Top Scrapbook Header Banner */}
                      <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-xl border-2 border-[#FFE600]/60 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#FFE600] text-[#30004c] flex items-center justify-center font-black text-2xl shadow">
                            📼
                          </div>
                          <div>
                            <h4 className="font-montserrat font-black text-base sm:text-lg text-white flex items-center gap-2">
                              <span>Vini's Birthday Memory Vault</span>
                              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 bg-[#FF6584] text-white rounded-full font-bold uppercase tracking-wider">
                                90s Archive
                              </span>
                            </h4>
                            <p className="text-xs text-gray-300 font-medium">
                              Swipe, drag & click the polaroids to explore Vini's unforgettable moments & milestones!
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3.5 py-1.5 bg-[#00E5FF] text-[#30004c] font-black text-xs rounded-xl border border-white shadow">
                            ⭐ {DEMO_CARDS.length} Photo Cards
                          </span>
                        </div>
                      </div>

                      {/* Card Fan Carousel Component */}
                      <div className="relative z-10 w-full py-4">
                        <SocialCards
                          cards={DEMO_CARDS}
                          onCardClick={(card) => setSelectedCard(card)}
                        />
                      </div>

                    </div>
                  </RetroWindow>
                )}

                {/* TAB 3: LIVE WISHES WALL WINDOW */}
                {activeTab === 'wishes' && (
                  <RetroWindow
                    title="💌 Vini's Birthday Wish Wall"
                    headerBg="bg-[#FFE600]"
                    headerTextColor="text-[#2A2B70]"
                    shadowVariant="teal"
                    className="w-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-montserrat">

                      {/* Left: Send a Wish */}
                      <div className="p-4 bg-white border-2 border-[#2A2B70] rounded-xl flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[#FF6584] font-extrabold text-base mb-2">
                            <Gift className="w-5 h-5" />
                            <h4>Leave a Note for Vini</h4>
                          </div>
                          <p className="text-xs text-gray-600 mb-4">
                            Post your birthday greeting live on Vini's 90s Wall!
                          </p>
                        </div>

                        <form onSubmit={handleAddWish} className="flex flex-col gap-3">
                          <textarea
                            value={newWish}
                            onChange={(e) => setNewWish(e.target.value)}
                            placeholder="Write your birthday note here..."
                            rows={4}
                            className="w-full px-3 py-2 rounded-lg bg-[#FAF8F5] border-2 border-[#2A2B70] text-[#2A2B70] placeholder-gray-400 text-base sm:text-xs resize-none focus:outline-none focus:bg-white"
                          />
                          <button
                            type="submit"
                            className="w-full py-2.5 bg-[#00C9A7] hover:bg-[#00b294] text-white font-extrabold text-xs rounded-lg border-2 border-[#2A2B70] shadow flex items-center justify-center gap-2 transition-transform active:translate-y-0.5 touch-manipulation cursor-pointer"
                          >
                            <Heart className="w-4 h-4 fill-white" />
                            <span>Post Birthday Wish</span>
                          </button>
                        </form>
                      </div>

                      {/* Right: Live Wish Feed */}
                      <div className="p-4 bg-white border-2 border-[#2A2B70] rounded-xl flex flex-col">
                        <h4 className="font-extrabold text-sm text-[#2A2B70] mb-3 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#FFE600] fill-[#FFE600]" />
                          <span>Live Wishes ({wishes.length})</span>
                        </h4>

                        <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                          {wishes.map((w, idx) => (
                            <div
                              key={`wish-${idx}`}
                              className="p-3 bg-[#FFE600]/15 border-2 border-[#2A2B70] rounded-lg text-xs font-semibold text-[#2A2B70] flex items-start gap-2"
                            >
                              <span className="text-[#FF6584] font-black">#</span>
                              <p className="leading-relaxed">{w}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </RetroWindow>
                )}

              </div>
            </div>
          </main>

          {/* Interactive Modals for Desktop Icons */}
          <RetroModals
            category={activeCategory}
            onClose={() => setActiveCategory(null)}
            isPlayingAudio={isPlayingAudio}
            onToggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
          />

          {/* 360-Degree Rotating Gift Box with Bow & Explosion */}
          <GiftBoxSurprise
            isOpen={showGiftBox}
            onClose={() => setShowGiftBox(false)}
          />

          {/* Card Detail Modal */}
          {selectedCard && (
            <div
              onClick={() => setSelectedCard(null)}
              className="fixed inset-0 z-50 bg-[#2A2B70]/80 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white border-4 border-[#2A2B70] rounded-2xl max-w-md w-full overflow-hidden retro-yellow-shadow animate-float"
              >
                <div className="relative h-64 w-full border-b-4 border-[#2A2B70]">
                  <img
                    src={selectedCard.imgUrl}
                    alt={selectedCard.alt}
                    className="w-full h-full object-cover"
                  />
                  {selectedCard.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-[#FF6584] text-white font-montserrat font-bold rounded text-xs border-2 border-[#2A2B70] shadow">
                      {selectedCard.badge}
                    </span>
                  )}
                </div>
                <div className="p-6 font-montserrat">
                  <h3 className="text-xl font-extrabold text-[#2A2B70] mb-2">
                    {selectedCard.title || selectedCard.alt}
                  </h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
                    {selectedCard.description || "Celebrating special moments with Vini."}
                  </p>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="w-full py-2.5 rounded-lg bg-[#7C69EF] hover:bg-[#6652e0] text-white font-extrabold text-xs sm:text-sm border-2 border-[#2A2B70] shadow transition-colors"
                  >
                    Close Memory Card
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom 90s OS Taskbar */}
          <footer className={`w-full bg-[#2A2B70] border-t-3 sm:border-t-4 border-[#FFE600] text-white px-3 sm:px-4 py-1.5 sm:py-2 pb-safe z-30 flex items-center justify-between font-montserrat text-xs transition-all duration-500 ${materializeStage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Start Menu Button */}
              <button
                onClick={triggerConfetti}
                className="px-2.5 sm:px-3 py-1 bg-[#FF6584] hover:bg-pink-600 text-white font-black rounded border-2 border-white flex items-center gap-1.5 shadow active:translate-y-0.5 touch-manipulation"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>START</span>
              </button>

              {/* Quick Gift Box Taskbar Button */}
              <button
                onClick={() => setShowGiftBox(true)}
                className="px-2.5 sm:px-3 py-1 bg-[#FFE600] hover:bg-yellow-300 text-[#2A2B70] font-black rounded border-2 border-white flex items-center gap-1.5 shadow active:translate-y-0.5 touch-manipulation"
                title="Open Surprise Gift Box"
              >
                <Gift className="w-3.5 h-3.5 text-[#2A2B70]" />
                <span className="hidden xs:inline sm:inline">🎁 Gifts</span>
              </button>

              {/* Taskbar Memphis icon */}
              <div className="hidden md:block">
                <MemphisZigzag color="#00E5FF" className="w-20 h-6" />
              </div>
            </div>

            <div className="hidden sm:block text-center text-[11px] font-semibold text-gray-200 truncate px-2">
              Vini's 90s Birthday Bash • Made with ❤️
            </div>

            {/* System Tray Live Clock */}
            <div className="px-2.5 sm:px-3 py-1 bg-[#3c3e98] border border-white/30 rounded font-mono font-bold text-[#FFE600] text-[11px] sm:text-xs">
              {currentTime || "10:00 PM"}
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;

