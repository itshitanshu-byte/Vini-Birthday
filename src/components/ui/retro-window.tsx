import React from 'react';
import { X, Minus, Square } from 'lucide-react';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  headerBg?: string;
  headerTextColor?: string;
  shadowVariant?: 'yellow' | 'pink' | 'teal' | 'none';
  className?: string;
  onClose?: () => void;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  title,
  children,
  headerBg = "bg-[#FF6584]",
  headerTextColor = "text-white",
  shadowVariant = "yellow",
  className = "",
  onClose
}) => {
  const getShadowClass = () => {
    switch (shadowVariant) {
      case 'yellow':
        return 'retro-yellow-shadow';
      case 'pink':
        return 'retro-pink-shadow';
      case 'teal':
        return 'retro-teal-shadow';
      case 'none':
        return 'shadow-md';
      default:
        return 'retro-yellow-shadow';
    }
  };

  return (
    <div
      className={`relative bg-white rounded-lg border-4 border-[#2A2B70] flex flex-col max-h-[88vh] overflow-hidden ${getShadowClass()} ${className}`}
    >
      {/* 90s OS Window Header */}
      <div
        className={`px-3 sm:px-4 py-2 sm:py-2.5 ${headerBg} border-b-4 border-[#2A2B70] flex items-center justify-between select-none flex-shrink-0 z-20`}
      >
        <span className={`font-montserrat font-bold text-xs sm:text-base tracking-wide truncate pr-2 ${headerTextColor}`}>
          {title}
        </span>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            className="w-5 h-5 bg-[#FFFDF9] border-2 border-[#2A2B70] rounded flex items-center justify-center hover:bg-yellow-200 text-[#2A2B70] active:translate-y-0.5 transition-transform"
            aria-label="Minimize"
          >
            <Minus className="w-3 h-3 stroke-[3]" />
          </button>
          <button
            type="button"
            className="w-5 h-5 bg-[#FFFDF9] border-2 border-[#2A2B70] rounded flex items-center justify-center hover:bg-yellow-200 text-[#2A2B70] active:translate-y-0.5 transition-transform"
            aria-label="Maximize"
          >
            <Square className="w-2.5 h-2.5 stroke-[3]" />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FF1E56] hover:bg-red-600 border-2 border-[#2A2B70] rounded-md flex items-center justify-center text-white active:scale-90 transition-all shadow-[1px_1px_0px_#2A2B70] cursor-pointer"
              aria-label="Close Window"
              title="Close window"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
            </button>
          )}
        </div>
      </div>

      {/* Inner Window Content Area */}
      <div className="p-3 sm:p-5 bg-[#FAF8F5] text-[#2A2B70] overflow-y-auto custom-scrollbar flex-1">
        {children}
      </div>
    </div>
  );
};
