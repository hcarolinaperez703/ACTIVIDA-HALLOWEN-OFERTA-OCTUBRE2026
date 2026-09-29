import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 500);
      return () => clearTimeout(finishTimer);
    }, 1100);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#150a24] text-[#f3ead3] transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Resplandor central */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#e2001a]/30 to-[#ff7a29]/30 blur-3xl pointer-events-none animate-pulse" />

      {/* Ícono de Halloween con animación */}
      <div className="relative mb-6 select-none">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#e2001a] via-[#1f1033] to-[#ff7a29] p-[2px] shadow-[0_0_50px_rgba(255,122,41,0.6)] animate-bounce">
          <div className="w-full h-full bg-[#150a24] rounded-[22px] flex items-center justify-center text-5xl sm:text-6xl">
            🎃
          </div>
        </div>
        <span className="absolute -top-2 -right-2 text-2xl animate-spin" style={{ animationDuration: '6s' }}>🦇</span>
      </div>

      <div className="text-center px-4 max-w-md">
        <span className="text-[11px] font-mono tracking-widest text-[#ffaa40] uppercase font-bold block mb-2">
          Claro Colombia • Capacitación Comercial
        </span>

        <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-white tracking-wider text-shadow drop-shadow-[0_0_20px_rgba(255,122,41,0.7)]">
          DUELO DE OFERTAS DE HALLOWEEN
        </h1>

        <p className="text-xs text-[#f3ead3]/70 mt-2 font-light">
          Preparando Puertas Misteriosas & Duelos Comerciales...
        </p>
      </div>

      {/* Barra de progreso sutil */}
      <div className="w-48 h-1.5 bg-black/60 rounded-full mt-6 overflow-hidden border border-white/10">
        <div className="h-full bg-gradient-to-r from-[#ff7a29] to-[#e2001a] rounded-full animate-[progress_1s_ease-in-out_infinite]" 
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}
