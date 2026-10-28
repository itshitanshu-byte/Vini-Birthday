import React, { useState } from 'react';
import { RetroWindow } from './retro-window';
import { Lock, Unlock, Key, Eye, EyeOff, Sparkles, AlertCircle, HelpCircle, ShieldCheck } from 'lucide-react';
import { SmileyBadgeIcon, MemphisZigzag } from './memphis-decorations';
import confetti from 'canvas-confetti';

interface RetroLockScreenProps {
  onUnlock: () => void;
  onClose?: () => void;
}

// Valid accepted passwords (case-insensitive)
const ACCEPTED_PASSWORDS = [
  'vini',
  'vini2026',
  'birthday',
  '22oct',
  '2210',
  'vini123',
  'happybirthday',
  'queen',
  'bash'
];

export const RetroLockScreen: React.FC<RetroLockScreenProps> = ({ onUnlock, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlockAttempt = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanInput = password.trim().toLowerCase();

    if (!cleanInput) {
      setError(true);
      setErrorMessage('Please enter the secret birthday password!');
      return;
    }

    if (ACCEPTED_PASSWORDS.includes(cleanInput)) {
      setError(false);
      setIsUnlocking(true);

      // Celebrate with confetti
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#FFE600", "#FF6584", "#00E5FF", "#7C69EF", "#00C9A7"]
      });

      // Save unlock state to sessionStorage
      try {
        sessionStorage.setItem('vini_os_unlocked', 'true');
      } catch {}

      setTimeout(() => {
        onUnlock();
      }, 400);
    } else {
      setError(true);
      setErrorMessage("❌ Access Denied: Incorrect Password! Hint: 'vini'");
      setPassword('');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d0f1d] retro-grid-bg flex items-center justify-center p-4 sm:p-8 selection:bg-[#FFE600] selection:text-[#2A2B70] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-[#ff00a0]/30 to-[#00f0ff]/30 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md z-10 animate-float my-auto">
        {/* Retro Lock Window Frame */}
        <RetroWindow
          title="🔒 VINI OS 90s - Security Access Gateway"
          headerBg="bg-gradient-to-r from-[#FF6584] via-[#7C69EF] to-[#00E5FF]"
          headerTextColor="text-white"
          shadowVariant="pink"
          className={error ? 'animate-shake' : ''}
        >
          <div className="flex flex-col gap-4 font-montserrat text-[#2A2B70]">
            
            {/* Top Identity Badge */}
            <div className="flex items-center gap-3.5 p-3.5 bg-gradient-to-r from-[#30004c] via-[#5a0066] to-[#30004c] text-white rounded-xl border-2 border-[#2A2B70] shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#FFE600] border-2 border-white flex items-center justify-center text-2xl shadow flex-shrink-0">
                🎂
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-white tracking-wide">
                    VINI'S BIRTHDAY OS
                  </span>
                  <span className="text-[9px] px-2 py-0.5 bg-[#FF6584] text-white rounded-full font-bold uppercase tracking-wider">
                    LOCKED 🔒
                  </span>
                </div>
                <p className="text-xs text-[#FFE600] font-bold mt-0.5">
                  Restricted Birthday Portal • VIP Guests Only
                </p>
              </div>
            </div>

            {/* Instruction Callout */}
            <div className="text-center px-2">
              <p className="text-xs font-bold text-gray-700">
                Please enter the security password to unlock Vini's retro birthday card, photo vault, cake, and wishes!
              </p>
            </div>

            {/* Password Entry Form */}
            <form onSubmit={handleUnlockAttempt} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-black text-[#2A2B70] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-[#FF6584]" />
                    <span>Birthday Access Key</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="text-[11px] font-bold text-[#7C69EF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>{showHint ? 'Hide Clue' : 'Need a Clue?'}</span>
                  </button>
                </label>

                {/* Input Container */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="Enter password (e.g. vini)"
                    autoFocus
                    className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border-3 font-mono font-bold text-sm bg-white text-[#2A2B70] placeholder:text-gray-400 focus:outline-none transition-all ${
                      error
                        ? 'border-red-500 bg-red-50/50 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                        : 'border-[#2A2B70] focus:border-[#7C69EF] focus:shadow-[0_0_12px_rgba(124,105,239,0.3)]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2A2B70] p-1 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-2.5 bg-red-100/90 border-2 border-red-500 rounded-lg text-xs font-bold text-red-700 flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Clue / Hint Box */}
              {showHint && (
                <div className="p-3 bg-[#FFE600]/20 border-2 border-[#FFE600] rounded-lg text-xs text-[#2A2B70] flex flex-col gap-1 animate-fadeIn font-semibold">
                  <span className="font-extrabold text-[#FF6584] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Birthday Clue:</span>
                  </span>
                  <p>
                    Who is the superstar celebrating their special day? Type <strong className="font-black text-[#2A2B70] bg-yellow-200 px-1 py-0.5 rounded">vini</strong> or <strong className="font-black text-[#2A2B70] bg-yellow-200 px-1 py-0.5 rounded">22oct</strong>!
                  </p>
                </div>
              )}

              {/* Submit / Unlock Button */}
              <button
                type="submit"
                disabled={isUnlocking}
                className="w-full mt-1 py-3 bg-gradient-to-r from-[#00E5FF] via-[#7C69EF] to-[#FF6584] hover:brightness-110 active:scale-95 text-white font-montserrat font-black text-sm rounded-xl border-3 border-[#2A2B70] shadow-[4px_4px_0px_0px_#2A2B70] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isUnlocking ? (
                  <>
                    <ShieldCheck className="w-4 h-4 animate-bounce" />
                    <span>Access Granted! Loading OS...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Birthday Portal 🚀</span>
                  </>
                )}
              </button>
            </form>

            {/* Bottom 90s Decorative Footer */}
            <div className="pt-2 border-t-2 border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-500">
              <span>★ 90s Memphis Security System ★</span>
              <span className="text-[#FF6584]">Oct 22, 2026</span>
            </div>

          </div>
        </RetroWindow>
      </div>
    </div>
  );
};
