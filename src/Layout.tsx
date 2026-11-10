import React from 'react';

const helloKittyGif = new URL('./assets/hello-kitty-pink.gif', import.meta.url).href;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-y2k-pattern bg-cover bg-center bg-fixed flex items-center justify-center p-4 font-mono text-y2k-dark">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0"></div>
      <div className="relative z-10 w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-4 border-white overflow-hidden">
        <div className="bg-gradient-to-r from-y2k-pink to-y2k-purple p-4 border-b-4 border-white flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
          <div className="text-white font-bold tracking-widest uppercase">A LITTLE SURPRISE FOR YOU</div>
          <div className="w-10"></div>
        </div>
        <div className="p-6 md:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
      <img
        src={helloKittyGif}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed bottom-3 right-3 z-20 h-20 w-20 object-contain sm:bottom-5 sm:right-5 sm:h-28 sm:w-28"
      />
    </div>
  );
};
