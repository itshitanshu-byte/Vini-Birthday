import React, { useEffect, useRef, useState, useId } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export interface CardItem {
  id?: string | number;
  imgUrl: string;
  alt: string;
  title?: string;
  description?: string;
  linkUrl?: string;
  badge?: string;
}

export interface CardFanCarouselProps {
  cards: CardItem[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onCardClick?: (card: CardItem, index: number) => void;
}

export const CardFanCarousel: React.FC<CardFanCarouselProps> = ({
  cards,
  className = "",
  autoPlay = false,
  autoPlayInterval = 5000,
  onCardClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});
  const carouselId = useId();

  const VISIBLE_COUNT = 7;
  const totalCards = cards.length;

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 640);
      setIsTablet(w >= 640 && w < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleSlots = () => {
    if (totalCards <= 4) {
      return cards.map((_, idx) => {
        let offset = (idx - currentIndex + totalCards) % totalCards;
        if (offset > totalCards / 2) offset -= totalCards;
        return { cardIndex: idx, slotOffset: offset };
      });
    }

    const slots: { cardIndex: number; slotOffset: number }[] = [];
    const count = Math.min(VISIBLE_COUNT, totalCards);
    const half = Math.floor(count / 2);

    for (let i = -half; i <= half; i++) {
      let cardIdx = (currentIndex + i) % totalCards;
      if (cardIdx < 0) cardIdx += totalCards;
      slots.push({ cardIndex: cardIdx, slotOffset: i });
    }
    return slots;
  };

  const visibleSlots = getVisibleSlots();

  const getLayoutConfig = () => {
    if (isMobile) {
      return {
        angleStep: 7,
        xSpacing: 48,
        yCurve: 9,
        scaleStep: 0.1,
        baseScale: 0.88,
        cardWidth: "w-48 sm:w-56",
        cardHeight: "h-68 sm:h-80",
      };
    }
    if (isTablet) {
      return {
        angleStep: 10,
        xSpacing: 85,
        yCurve: 13,
        scaleStep: 0.08,
        baseScale: 0.95,
        cardWidth: "w-60",
        cardHeight: "h-84",
      };
    }
    return {
      angleStep: 12,
      xSpacing: 115,
      yCurve: 18,
      scaleStep: 0.07,
      baseScale: 1,
      cardWidth: "w-68",
      cardHeight: "h-96",
    };
  };

  const config = getLayoutConfig();

  useEffect(() => {
    if (!containerRef.current) return;

    visibleSlots.forEach(({ slotOffset }, idx) => {
      const cardEl = cardsRef.current[idx];
      if (!cardEl) return;

      const isHovered = hoveredIndex === idx;
      let hoverXShift = 0;
      let hoverYShift = 0;
      let hoverScale = 0;
      let hoverRotate = 0;

      if (hoveredIndex !== null) {
        if (isHovered) {
          hoverYShift = -28;
          hoverScale = 0.08;
        } else if (idx < hoveredIndex) {
          hoverXShift = -24;
          hoverRotate = -4;
        } else if (idx > hoveredIndex) {
          hoverXShift = 24;
          hoverRotate = 4;
        }
      }

      const absOffset = Math.abs(slotOffset);
      const rotation = slotOffset * config.angleStep + hoverRotate;
      const translateX = slotOffset * config.xSpacing + hoverXShift;
      const translateY = Math.pow(absOffset, 1.8) * config.yCurve + hoverYShift;
      const scale = Math.max(0.4, config.baseScale - absOffset * config.scaleStep) + hoverScale;
      const zIndex = isHovered ? 200 : 100 - absOffset * 10;
      const opacity = absOffset > 3 ? 0 : Math.max(0.25, 1 - absOffset * 0.16);

      gsap.to(cardEl, {
        x: translateX,
        y: translateY,
        rotation: rotation,
        scale: scale,
        zIndex: zIndex,
        opacity: opacity,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }, [currentIndex, hoveredIndex, isMobile, isTablet, totalCards]);

  useEffect(() => {
    if (!cardsRef.current.length) return;
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { y: 120, opacity: 0, scale: 0.5 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        duration: 0.8,
        ease: "back.out(1.4)",
      }
    );
  }, []);

  useEffect(() => {
    if (!autoPlay || totalCards <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, totalCards]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const toggleLike = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setLikedCards(prev => ({ ...prev, [index]: !prev[index] }));
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ["#FF6584", "#FFE600", "#00E5FF"]
    });
  };

  const currentCard = cards[currentIndex];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Card fan carousel"
      className={`relative w-full py-6 flex flex-col items-center justify-center overflow-visible focus:outline-none ${className}`}
    >
      {/* Background Synthwave Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-80 bg-gradient-to-r from-[#ff00a0]/25 via-[#00f0ff]/20 to-[#ffe600]/20 blur-3xl pointer-events-none rounded-full" />

      {/* Fan Cards Container */}
      <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center perspective-1000">
        {visibleSlots.map(({ cardIndex, slotOffset }, idx) => {
          const card = cards[cardIndex];
          if (!card) return null;

          const isCenter = slotOffset === 0;
          const isLiked = !!likedCards[cardIndex];

          return (
            <div
              key={`${carouselId}-slot-${idx}-${cardIndex}`}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                if (onCardClick) onCardClick(card, cardIndex);
                if (!isCenter) {
                  setCurrentIndex(cardIndex);
                }
              }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${config.cardWidth} ${config.cardHeight} cursor-pointer group rounded-2xl p-1.5 transition-shadow duration-300 select-none`}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              {/* Retro Polaroid / Synthwave Card Inner Container */}
              <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.6)] border-3 ${isCenter ? 'border-[#FFE600] ring-4 ring-[#FF6584]/50' : 'border-[#30004c]/80'} bg-gradient-to-b from-[#2a134a] to-[#120824] transition-all duration-300 group-hover:border-[#00f0ff]`}>
                <img
                  src={card.imgUrl}
                  alt={card.alt || "Carousel card"}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Gradient Contrast Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#100320] via-[#100320]/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Badge & Heart Button */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  {card.badge && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-[#FF6584] text-white border border-white/60 shadow-md backdrop-blur-md">
                      {card.badge}
                    </span>
                  )}
                  <button
                    onClick={(e) => toggleLike(e, cardIndex)}
                    className={`p-2 rounded-full border border-white/40 transition-transform active:scale-75 cursor-pointer backdrop-blur-md ${isLiked ? 'bg-[#FF6584] text-white' : 'bg-black/40 text-white/80 hover:text-white'}`}
                    title="Like this memory"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
                  </button>
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end text-left z-10">
                  {card.title && (
                    <h3 className="text-white text-base sm:text-lg font-black tracking-tight drop-shadow-md line-clamp-1">
                      {card.title}
                    </h3>
                  )}

                  {card.description && (
                    <p className="text-gray-200 text-xs sm:text-sm mt-1 line-clamp-2 drop-shadow font-medium leading-relaxed">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Retro Navigation Controls & Pagination */}
      <div className="relative z-30 mt-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 bg-[#1d0a33]/90 backdrop-blur-xl border-2 border-[#FFE600]/60 p-2 rounded-full shadow-[0_8px_25px_rgba(255,230,0,0.25)]">
          <button
            onClick={handlePrev}
            aria-label="Previous card"
            className="p-2.5 rounded-full bg-[#FF6584] hover:bg-[#ff4e70] text-white transition-all transform active:scale-90 border border-white/40 cursor-pointer shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 px-3">
            {cards.map((_, i) => (
              <button
                key={`${carouselId}-dot-${i}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to card ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? "w-8 bg-[#FFE600] shadow-[0_0_12px_#FFE600] border border-white"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Next card"
            className="p-2.5 rounded-full bg-[#00E5FF] hover:bg-[#00cce6] text-[#30004c] transition-all transform active:scale-90 border border-white/40 cursor-pointer shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Counter Badge */}
        <span className="text-xs font-montserrat font-black text-[#FFE600] bg-[#30004c] px-4 py-1.5 rounded-full border-2 border-[#FFE600] shadow">
          {currentIndex + 1} / {totalCards} Memories
        </span>
      </div>

      {/* Active Memory Spotlight Details Box */}
      {currentCard && (
        <div className="mt-6 w-full max-w-2xl bg-gradient-to-r from-[#2c094f] via-[#4d0c5a] to-[#2c094f] border-3 border-[#FFE600] rounded-2xl p-4 sm:p-5 shadow-[6px_6px_0px_0px_#FF6584] text-white flex flex-col sm:flex-row items-center justify-between gap-4 animate-float">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFE600] text-[#30004c] flex items-center justify-center font-black flex-shrink-0 shadow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-[#00E5FF] tracking-wider">
                  Featured Memory #{currentIndex + 1}
                </span>
                {currentCard.badge && (
                  <span className="text-[10px] px-2 py-0.5 bg-[#FF6584] rounded-full font-bold">
                    {currentCard.badge}
                  </span>
                )}
              </div>
              <h4 className="font-montserrat font-extrabold text-sm sm:text-base text-white mt-0.5">
                {currentCard.title}
              </h4>
              <p className="text-xs text-gray-200 mt-1 font-medium leading-relaxed">
                {currentCard.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.7 },
                colors: ["#FFE600", "#FF6584", "#00E5FF"]
              });
            }}
            className="px-4 py-2.5 bg-[#FFE600] hover:bg-yellow-300 text-[#30004c] font-black text-xs rounded-xl border-2 border-[#30004c] shadow transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-[#30004c]" />
            <span>Cherish Memory ✨</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CardFanCarousel;
