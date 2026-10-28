import React from 'react';
import { StarJarIcon, BirthdayCakeIcon, LetterEnvelopeIcon } from './memphis-decorations';

interface RetroSidebarIconsProps {
  onSelectCategory: (category: 'jar' | 'cake' | 'letter' | 'drinks') => void;
  activeCategory: string | null;
}

export const RetroSidebarIcons: React.FC<RetroSidebarIconsProps> = ({
  onSelectCategory,
  activeCategory
}) => {
  const items = [
    { id: 'jar', label: 'Wish Jar', icon: StarJarIcon, badge: 'Star Wishes ⭐' },
    { id: 'cake', label: 'Birthday Cake', icon: BirthdayCakeIcon, badge: 'Light Candles 🎂' },
    { id: 'letter', label: 'Letter', icon: LetterEnvelopeIcon, badge: 'For Vini 💌' },
  ] as const;

  return (
    <div className="flex sm:flex-col items-center justify-center gap-4 sm:gap-6 py-2 px-3 bg-[#3d40a0]/60 backdrop-blur-md rounded-2xl border-2 border-[#FFE600]/40 shadow-xl">
      {items.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeCategory === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onSelectCategory(item.id)}
            className={`group relative flex flex-col items-center justify-center p-2.5 rounded-xl transition-all duration-200 focus:outline-none ${
              isActive
                ? 'bg-[#FFE600] text-[#2A2B70] scale-105 shadow-lg border-2 border-[#2A2B70]'
                : 'hover:bg-white/15 text-white'
            }`}
          >
            <div className="relative transform group-hover:scale-110 transition-transform duration-200">
              <IconComponent className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md" />
            </div>
            <span
              className={`mt-1 font-montserrat font-bold text-xs sm:text-sm tracking-wide ${
                isActive ? 'text-[#2A2B70]' : 'text-white drop-shadow'
              }`}
            >
              {item.label}
            </span>

            {/* Hover Badge */}
            <span className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:group-hover:inline-block px-2.5 py-1 bg-[#FF6584] text-white font-montserrat font-bold text-xs rounded border-2 border-[#2A2B70] shadow-md pointer-events-none whitespace-nowrap z-30">
              {item.badge}
            </span>
          </button>
        );
      })}
    </div>
  );
};
