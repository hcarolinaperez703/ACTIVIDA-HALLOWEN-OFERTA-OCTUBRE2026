import React from 'react';

interface HalloweenFrameProps {
  children: React.ReactNode;
}

export function HalloweenFrame({ children }: HalloweenFrameProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#150a24]">
      {/* Fondo atmosférico degradado con nubes y neblina morada/roja */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 85% 12%, rgba(255, 140, 20, 0.25) 0%, transparent 28%),
            radial-gradient(circle at 15% 15%, rgba(226, 0, 26, 0.18) 0%, transparent 30%),
            radial-gradient(circle at 50% 50%, #1f0d36 0%, #130722 65%, #0b0314 100%)
          `
        }}
      />

      {/* Luna llena brillante en la esquina superior derecha */}
      <div className="fixed top-3 right-6 sm:top-5 sm:right-10 pointer-events-none z-0 select-none">
        <div className="relative">
          {/* Resplandor de la luna */}
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#ffd54f] via-[#ff8f00] to-[#e65100] blur-sm opacity-90 shadow-[0_0_50px_rgba(255,167,38,0.8)]" />
          <div className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-[#ffe082] via-[#ffb74d] to-[#ff9800] opacity-95" />
          {/* Murciélagos cruzando la luna */}
          <span className="absolute top-4 left-3 text-sm sm:text-base transform -rotate-12 filter drop-shadow">🦇</span>
          <span className="absolute top-8 left-9 text-xs sm:text-sm transform rotate-6 filter drop-shadow">🦇</span>
          <span className="absolute -bottom-2 -left-6 text-base sm:text-lg transform -rotate-6 filter drop-shadow">🦇</span>
        </div>
      </div>

      {/* Faroles colgantes iluminados en las esquinas superiores */}
      {/* Farol Izquierdo */}
      <div className="fixed top-0 left-4 sm:left-10 pointer-events-none z-10 flex flex-col items-center opacity-85 select-none hidden sm:flex">
        <div className="w-0.5 h-12 sm:h-16 bg-gradient-to-b from-[#2a1306] via-[#ff7a29]/60 to-[#ffaa40]" />
        <div className="w-8 h-12 bg-gradient-to-b from-[#3a1a05] to-[#120601] border border-[#ffaa40]/70 rounded-md flex items-center justify-center shadow-[0_0_20px_rgba(255,160,0,0.8)] relative">
          <div className="w-4 h-6 bg-gradient-to-t from-[#ff6f00] via-[#ffd54f] to-white rounded-full blur-[1px] animate-pulse" />
        </div>
      </div>

      {/* Farol Derecho */}
      <div className="fixed top-0 right-28 sm:right-36 pointer-events-none z-10 flex flex-col items-center opacity-85 select-none hidden md:flex">
        <div className="w-0.5 h-10 sm:h-14 bg-gradient-to-b from-[#2a1306] via-[#ff7a29]/60 to-[#ffaa40]" />
        <div className="w-8 h-12 bg-gradient-to-b from-[#3a1a05] to-[#120601] border border-[#ffaa40]/70 rounded-md flex items-center justify-center shadow-[0_0_20px_rgba(255,160,0,0.8)] relative">
          <div className="w-4 h-6 bg-gradient-to-t from-[#ff6f00] via-[#ffd54f] to-white rounded-full blur-[1px] animate-pulse" />
        </div>
      </div>

      {/* Telarañas en las esquinas superiores */}
      <div className="fixed top-0 left-0 text-3xl sm:text-5xl pointer-events-none z-10 opacity-40 select-none">
        🕸️
      </div>
      <div className="fixed top-0 right-0 text-3xl sm:text-5xl pointer-events-none z-10 opacity-40 select-none scale-x-[-1]">
        🕸️
      </div>

      {/* Marco decorativo perimetral gótico (Filigrana y diamantes luminosos) */}
      <div 
        className="fixed inset-2 sm:inset-4 pointer-events-none z-10 rounded-3xl border-2 sm:border-[2.5px] border-[#ff7a29]/50 transition-all"
        style={{
          boxShadow: 'inset 0 0 35px rgba(226, 0, 26, 0.2), 0 0 25px rgba(255, 122, 41, 0.25)'
        }}
      >
        {/* Esquinas ornamentales con volutas */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#ffaa40] rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#ffaa40] rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#ffaa40] rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#ffaa40] rounded-br-2xl" />

        {/* Diamantes luminosos centrales */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-[#ffaa40] shadow-[0_0_15px_rgba(255,170,64,0.9)] border border-white" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rotate-45 bg-[#ffaa40] shadow-[0_0_15px_rgba(255,170,64,0.9)] border border-white" />
      </div>

      {/* Calabazas tenebrosas brillantes en las esquinas inferiores */}
      <div className="fixed bottom-2 left-2 sm:bottom-4 sm:left-5 pointer-events-none z-10 select-none flex items-end gap-1">
        <span className="text-3xl sm:text-5xl filter drop-shadow-[0_0_20px_rgba(255,122,41,0.9)]">🎃</span>
        <span className="text-xl sm:text-3xl filter drop-shadow-[0_0_15px_rgba(255,122,41,0.7)] hidden sm:inline">🎃</span>
        <span className="text-xs text-orange-400 opacity-60 hidden sm:inline">🍁</span>
      </div>

      <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-5 pointer-events-none z-10 select-none flex items-end gap-1">
        <span className="text-xs text-orange-400 opacity-60 hidden sm:inline">🍁</span>
        <span className="text-xl sm:text-3xl filter drop-shadow-[0_0_15px_rgba(255,122,41,0.7)] hidden sm:inline">🎃</span>
        <span className="text-3xl sm:text-5xl filter drop-shadow-[0_0_20px_rgba(255,122,41,0.9)]">🎃</span>
      </div>

      {/* Contenido de la Aplicación */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
