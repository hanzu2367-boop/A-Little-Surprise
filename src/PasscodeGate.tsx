import React, { useState, useEffect } from 'react';
import { Lock, Heart, Sparkles } from 'lucide-react';

interface PasscodeGateProps {
  onUnlock: () => void;
  onInteraction: () => void;
}

const PASSCODE = 'April 23, 2026';
const PREVIOUS_DEFAULT_PASSCODE = 'cristine';

export const PasscodeGate: React.FC<PasscodeGateProps> = ({ onUnlock, onInteraction }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [passcode, setPasscode] = useState(PASSCODE);

  useEffect(() => {
    const storedPasscode = localStorage.getItem('site_passcode');
    if (storedPasscode && storedPasscode !== PREVIOUS_DEFAULT_PASSCODE) {
      setPasscode(storedPasscode);
    } else {
      localStorage.setItem('site_passcode', PASSCODE);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === passcode.toLowerCase()) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10">
      <div className="relative">
        <div className="absolute -inset-4 bg-y2k-pink rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="relative bg-white p-6 rounded-full border-4 border-y2k-purple shadow-lg">
          <Lock className="w-12 h-12 text-y2k-purple" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-y2k-dark flex items-center justify-center gap-2">
          <Sparkles className="text-y2k-accent" />
          Welcome!
          <Sparkles className="text-y2k-accent" />
        </h1>
        <p className="text-gray-500">Enter the magic word to enter.</p>
        <p className="text-xs text-gray-400">A little surprise is waiting for you.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onFocus={onInteraction}
            onChange={(e) => {
              onInteraction();
              setInput(e.target.value);
            }}
            placeholder="Passcode..."
            className={`w-full px-6 py-3 rounded-xl border-2 outline-none transition-all text-center font-bold text-lg
              ${error 
                ? 'border-red-400 bg-red-50 text-red-500 animate-shake' 
                : 'border-y2k-pink focus:border-y2k-purple focus:ring-4 focus:ring-y2k-pink/20'
              }`}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-y2k-purple hover:bg-y2k-accent text-white font-bold py-3 rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5 fill-current" />
          Unlock Surprise
        </button>
      </form>
    </div>
  );
};