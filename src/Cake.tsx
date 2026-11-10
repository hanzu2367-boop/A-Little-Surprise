import React, { useState } from 'react';

export const Cake: React.FC = () => {
  const [candles, setCandles] = useState<boolean[]>(Array(8).fill(true));

  const blowCandle = (index: number) => {
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);
  };

  const allBlown = candles.every(c => !c);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] space-y-12">
      <div className="text-center space-y-2 z-10">
        <h2 className="text-2xl font-bold text-y2k-dark">A Little Wish 🎂</h2>
        <p className="text-gray-500">Tap the candles and make a little wish.</p>
      </div>

      <div className="relative mt-24">
        {/* Cake Base */}
        <div className="relative w-64 h-32 bg-pink-200 rounded-lg shadow-xl border-4 border-pink-300 flex items-center justify-center">
          <div className="absolute -bottom-2 w-72 h-4 bg-gray-200 rounded-full opacity-50 blur-sm"></div>
          
          {/* Decorative Icing */}
          <div className="absolute -top-4 w-full flex justify-between px-2">
             {Array.from({ length: 8 }).map((_, i) => (
               <div key={i} className="w-8 h-8 bg-white rounded-full -ml-2 border-b-4 border-pink-100"></div>
             ))}
          </div>
          
          <div className="text-pink-400 font-bold text-xl z-10">♡</div>
        </div>

        {/* Candles */}
        <div className="absolute -top-16 left-0 w-full h-full flex flex-wrap justify-center gap-2 px-4 pointer-events-none">
          {candles.map((isLit, i) => (
            <div 
              key={i} 
              className="relative flex flex-col items-center pointer-events-auto cursor-pointer hover:-translate-y-1 transition-transform"
              onClick={() => blowCandle(i)}
              style={{ marginTop: i % 2 === 0 ? '-10px' : '0px' }} // Stagger candles
            >
              {/* Flame */}
              <div className={`transition-opacity duration-300 ${isLit ? 'opacity-100' : 'opacity-0'}`}>
                <div className="relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-400 rounded-full blur-[2px] animate-pulse"></div>
                  <div className="w-2 h-4 bg-orange-500 rounded-full animate-bounce"></div>
                </div>
              </div>
              
              {/* Candle Stick */}
              <div className="w-2 h-12 bg-blue-300 border border-blue-400 rounded-sm mt-1"></div>
            </div>
          ))}
        </div>
      </div>

      {allBlown && (
        <div className="flex flex-col items-center animate-bounce text-xl font-bold text-y2k-purple mt-8 space-y-6">
          <div>🎉 You make the world a little brighter! 🎉</div>
          
          {/* Dancing Cat */}
          <div className="relative group">
             {/* Cat Image with 3D effect */}
             <div className="w-48 h-48 transition-transform duration-500 transform preserve-3d group-hover:rotate-y-180" 
                  style={{ 
                    animation: 'spin 4s linear infinite, bounce 1s infinite',
                    transformStyle: 'preserve-3d'
                  }}>
               <img 
                 src="/images/cat.jpg" 
                 alt="Dancing Cat" 
                 className="w-full h-full object-cover rounded-full border-4 border-y2k-accent shadow-xl"
               />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
