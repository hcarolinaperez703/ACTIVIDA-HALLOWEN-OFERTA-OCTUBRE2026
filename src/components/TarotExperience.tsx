import React, { useState, useEffect } from 'react';
import { DuelCardItem } from '../types/duelOctober';
import calabazaAImg from '../assets/images/calabaza_variante_a_1790365584205.jpg';
import ataudImg from '../assets/images/ataud_card_1790365603367.jpg';
import calabazaBImg from '../assets/images/calabaza_variante_b_1790365594039.jpg';
import fantasmaClaroImg from '../assets/images/fantasma_claro_1790365613768.jpg';
import { 
  Sparkles, RotateCcw, Maximize, Minimize, Flame, 
  Trophy, CheckCircle2, AlertTriangle, Eye, ChevronRight, Zap, ArrowLeft
} from 'lucide-react';

interface TarotExperienceProps {
  cards: DuelCardItem[];
  onBackToHome?: () => void;
}

export function TarotExperience({ cards, onBackToHome }: TarotExperienceProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [isCompetitorFlipped, setIsCompetitorFlipped] = useState<boolean>(false);
  const [isGhostFlipped, setIsGhostFlipped] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Asegurar que haya una tarjeta válida
  const currentCard: DuelCardItem = cards[selectedCardIndex] || cards[0];

  // Si cambian las tarjetas guardadas/editadas, sincronizar
  useEffect(() => {
    if (selectedCardIndex >= cards.length) {
      setSelectedCardIndex(0);
    }
  }, [cards, selectedCardIndex]);

  // Selección de imagen para el competidor según la puerta o índice
  const getCompetitorImage = (index: number) => {
    if (index % 3 === 0) return calabazaAImg;
    if (index % 3 === 1) return ataudImg;
    return calabazaBImg;
  };

  // Alternar volteo de la tarjeta del competidor
  const handleToggleCompetitorFlip = () => {
    setIsCompetitorFlipped((prev) => !prev);
  };

  // Alternar volteo de la tarjeta fantasma Claro
  const handleToggleGhostFlip = () => {
    setIsGhostFlipped((prev) => {
      const next = !prev;
      if (next && typeof (window as any).confetti === 'function') {
        (window as any).confetti({
          particleCount: 110,
          spread: 90,
          origin: { y: 0.55 },
          colors: ['#e2001a', '#ffd700', '#ff7a29', '#ffffff']
        });
      }
      return next;
    });
  };

  // Reiniciar volteo de ambas cartas
  const handleResetCards = () => {
    setIsCompetitorFlipped(false);
    setIsGhostFlipped(false);
  };

  // Revelar la Carta Fantasma directamente (atajo para el formador)
  const handleRevealGhostDirect = () => {
    setIsGhostFlipped(true);
    if (typeof (window as any).confetti === 'function') {
      (window as any).confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.55 },
        colors: ['#e2001a', '#ffd700', '#ff7a29', '#ffffff']
      });
    }
  };

  // Pantalla completa para proyección / videobeam
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  if (!currentCard) return null;

  return (
    <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-[#f3ead3] select-none">
      {/* BARRA SUPERIOR DE CONTROL PARA PROYECCIÓN */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#ff7a29]/30">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#f3ead3] text-xs font-cinzel font-bold uppercase flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </button>
          )}

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#ffd700] font-bold bg-black/60 px-3 py-1 rounded-full border border-[#ffd700]/40 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                Duelo 1 a 1 • Modo Videobeam
              </span>
              <span className="text-xs text-[#f3ead3]/60 hidden sm:inline">
                | Tarjeta Competidor VS Contraoferta Fantasma Claro
              </span>
            </div>

            <h2 className="font-cinzel text-xl sm:text-3xl font-black text-white tracking-wide text-shadow drop-shadow-[0_0_20px_rgba(255,122,41,0.5)]">
              {currentCard.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#ffaa40] font-medium mt-0.5">
              Puerta {currentCard.doorNumber}: Compara la oferta del rival y descubre el contraataque ganador de Claro
            </p>
          </div>
        </div>

        {/* SELECTOR DE DUELOS (TARJETAS EDITADAS) & CONTROLES */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Selector de Tarjeta/Duelo */}
          <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-white/15 shadow-inner overflow-x-auto max-w-[420px]">
            {cards.map((card, idx) => (
              <button
                key={card.id || idx}
                onClick={() => {
                  setSelectedCardIndex(idx);
                  handleResetCards();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCardIndex === idx
                    ? 'bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] text-white shadow-[0_0_15px_rgba(226,0,26,0.6)]'
                    : 'text-[#f3ead3]/70 hover:text-white hover:bg-white/5'
                }`}
              >
                P{card.doorNumber || idx + 1}: {card.competitorName.replace(/Competidor /i, '')}
              </button>
            ))}
          </div>

          {/* Botón Reiniciar */}
          <button
            onClick={handleResetCards}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#f3ead3] text-xs sm:text-sm font-cinzel font-bold uppercase flex items-center gap-1.5 cursor-pointer transition-all shadow-md active:scale-95"
            title="Poner ambas cartas boca abajo"
          >
            <RotateCcw className="w-4 h-4 text-orange-400" />
            <span className="hidden md:inline">Reiniciar</span>
          </button>

          {/* Botón Revelar Fantasma */}
          <button
            onClick={handleRevealGhostDirect}
            className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff7a29] to-[#e2001a] hover:brightness-110 text-white text-xs sm:text-sm font-cinzel font-bold uppercase flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_20px_rgba(226,0,26,0.5)] active:scale-95"
            title="Revelar directamente la Contraoferta Fantasma Claro"
          >
            <Flame className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="hidden sm:inline">Revelar Fantasma</span>
          </button>

          {/* Botón Pantalla Completa */}
          <button
            onClick={toggleFullscreen}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-black/60 hover:bg-black/90 border border-[#ffd700]/50 text-[#ffd700] text-xs sm:text-sm font-cinzel font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)] active:scale-95"
            title="Pantalla completa para videobeam"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            <span className="hidden lg:inline">{isFullscreen ? 'Salir' : 'Videobeam'}</span>
          </button>
        </div>
      </div>

      {/* ÁREA DEL DUELO: EXACTAMENTE 2 CARTAS (COMPETIDOR SELECCIONADO VS FANTASMA CLARO) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 my-6 items-stretch">
        {/* =========================================================================
            1. TARJETA DEL COMPETIDOR SELECCIONADA
           ========================================================================= */}
        <div
          onClick={handleToggleCompetitorFlip}
          className="relative cursor-pointer select-none transition-transform duration-300 hover:scale-[1.015] flex flex-col"
          style={{ perspective: '1400px', minHeight: '660px' }}
        >
          {/* ETIQUETA SUPERIOR */}
          <div className="flex items-center justify-between px-4 py-2 mb-2 bg-orange-950/80 border border-orange-500/40 rounded-xl shadow-md">
            <span className="font-cinzel text-xs font-black text-orange-300 tracking-wider flex items-center gap-1.5">
              <span>🎃</span> TARJETA COMPETIDOR SELECCIONADA
            </span>
            <span className="text-[11px] font-mono text-orange-200/70 uppercase flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-orange-400" />
              {isCompetitorFlipped ? 'REVELADA' : 'TOCA PARA VOLTEAR'}
            </span>
          </div>

          {/* CONTENEDOR 3D FLIP */}
          <div
            className={`relative w-full flex-1 rounded-[32px] transition-transform duration-700 ease-out preserve-3d shadow-2xl ${
              isCompetitorFlipped ? 'rotate-y-180' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isCompetitorFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* REVERSO DEL COMPETIDOR */}
            <div
              className="absolute inset-0 w-full h-full rounded-[32px] backface-hidden overflow-hidden flex flex-col justify-between p-6 sm:p-8 border-3 border-orange-500/70"
              style={{
                backfaceVisibility: 'hidden',
                background: 'radial-gradient(circle at 50% 30%, rgba(45, 20, 8, 0.95) 0%, rgba(18, 8, 3, 0.98) 100%)',
                boxShadow: '0 0 45px rgba(255, 122, 41, 0.35), inset 0 0 35px rgba(255, 122, 41, 0.15)'
              }}
            >
              <div className="absolute inset-3 rounded-[24px] border border-orange-400/30 pointer-events-none" />
              <div className="text-center pt-2">
                <span className="font-cinzel text-xs font-black tracking-widest text-[#ffaa40] uppercase block mb-1">
                  OFERTA RIVAL • PUERTA {currentCard.doorNumber}
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white">
                  {currentCard.competitorName}
                </h3>
              </div>

              {/* Imagen central */}
              <div className="relative my-auto flex flex-col items-center justify-center py-4">
                <div className="w-48 h-60 sm:w-56 sm:h-70 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#ffaa40] to-[#240e04] shadow-2xl">
                  <img
                    src={getCompetitorImage(selectedCardIndex)}
                    alt={currentCard.competitorName}
                    className="w-full h-full object-cover rounded-xl filter contrast-110"
                  />
                </div>
                <span className="mt-3 text-xs font-cinzel font-bold text-orange-300">
                  {currentCard.competitorTag || 'Oferta Competidor'}
                </span>
              </div>

              <div className="text-center pb-2">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/60 border border-orange-500/40 text-xs font-cinzel font-bold text-white uppercase tracking-widest shadow-md">
                  <span>TOCA PARA VOLTEAR CARTA</span>
                  <ChevronRight className="w-4 h-4 text-orange-400" />
                </div>
              </div>
            </div>

            {/* FRENTE REVELADO DEL COMPETIDOR */}
            <div
              className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden flex flex-col justify-between p-6 sm:p-8 border-3 border-orange-500"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'radial-gradient(circle at 50% 20%, #291204 0%, #150802 60%, #0a0301 100%)',
                boxShadow: '0 0 50px rgba(255, 122, 41, 0.4), inset 0 0 30px rgba(255, 122, 41, 0.15)'
              }}
            >
              <div className="absolute inset-3 rounded-[24px] border border-white/10 pointer-events-none" />

              {/* Cabecera */}
              <div className="relative z-10 pb-3 border-b border-orange-500/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-black uppercase px-3 py-1 rounded-full bg-orange-950/90 text-orange-300 border border-orange-500/40">
                    {currentCard.competitorTag || 'Oferta Competidor'}
                  </span>
                  <span className="font-mono text-xs text-[#ffd700] font-bold">
                    {currentCard.competitorData}
                  </span>
                </div>

                <h3
                  className="font-cinzel font-black tracking-tight text-white leading-tight"
                  style={{ fontSize: 'clamp(26px, 2.5vw, 36px)' }}
                >
                  {currentCard.competitorName}
                </h3>

                <div className="flex items-baseline gap-2 mt-2">
                  <span
                    className="font-cinzel font-black text-orange-400 leading-none drop-shadow-[0_0_20px_rgba(255,122,41,0.5)]"
                    style={{ fontSize: 'clamp(44px, 4vw, 56px)' }}
                  >
                    {currentCard.competitorPrice}
                  </span>
                  <span className="text-sm font-mono text-[#f3ead3]/70 font-semibold">
                    / mes
                  </span>
                </div>
              </div>

              {/* Características con chulito verde */}
              <div className="relative z-10 flex-1 my-4 overflow-y-auto pr-1">
                <ul className="space-y-3">
                  {currentCard.competitorFeatures.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2.5 text-[#f3ead3] leading-snug"
                      style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}
                    >
                      <span className="text-emerald-400 font-black text-base shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="font-medium text-white/95">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trampa Oculta */}
              <div className="relative z-10 p-4 rounded-2xl bg-red-950/50 border border-red-500/50 shadow-md">
                <div className="flex items-center gap-1.5 mb-1 text-red-400">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-xs font-cinzel font-black uppercase tracking-wider">
                    Trampa Oculta / Letra Menuda del Rival
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-red-200 leading-relaxed">
                  {currentCard.competitorTrap}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. LA CONTRAOFERTA DE CLARO (TARJETA FANTASMA CLARO)
           ========================================================================= */}
        <div
          onClick={handleToggleGhostFlip}
          className="relative cursor-pointer select-none transition-transform duration-300 hover:scale-[1.015] flex flex-col"
          style={{ perspective: '1400px', minHeight: '660px' }}
        >
          {/* ETIQUETA SUPERIOR */}
          <div className="flex items-center justify-between px-4 py-2 mb-2 bg-red-950/90 border border-red-500/60 rounded-xl shadow-[0_0_20px_rgba(226,0,26,0.3)]">
            <span className="font-cinzel text-xs font-black text-white tracking-wider flex items-center gap-1.5">
              <span>👻</span> LA CONTRAOFERTA DE CLARO (TARJETA FANTASMA)
            </span>
            <span className="text-[11px] font-mono text-emerald-300 uppercase font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              {isGhostFlipped ? 'REVELADA' : 'TOCA PARA REVELAR'}
            </span>
          </div>

          {/* CONTENEDOR 3D FLIP */}
          <div
            className={`relative w-full flex-1 rounded-[32px] transition-transform duration-700 ease-out preserve-3d shadow-2xl ${
              isGhostFlipped ? 'rotate-y-180' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isGhostFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* REVERSO FANTASMA CLARO */}
            <div
              className="absolute inset-0 w-full h-full rounded-[32px] backface-hidden overflow-hidden flex flex-col justify-between p-6 sm:p-8 border-3 border-[#e2001a]"
              style={{
                backfaceVisibility: 'hidden',
                background: 'radial-gradient(circle at 50% 30%, rgba(55, 10, 25, 0.95) 0%, rgba(20, 4, 10, 0.98) 100%)',
                boxShadow: '0 0 55px rgba(226, 0, 26, 0.5), inset 0 0 35px rgba(226, 0, 26, 0.3)'
              }}
            >
              <div className="absolute inset-3 rounded-[24px] border border-[#ffd700]/40 pointer-events-none" />

              <div className="text-center pt-2">
                <span className="font-cinzel text-xs font-black tracking-widest text-[#ffd700] uppercase block mb-1">
                  ★ EL ARCANO GANADOR • CLARO ★
                </span>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white">
                  LA CARTA FANTASMA CLARO
                </h3>
              </div>

              {/* Imagen Fantasma con resplandor */}
              <div className="relative my-auto flex flex-col items-center justify-center py-4">
                <div className="w-48 h-60 sm:w-56 sm:h-70 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#e2001a] via-[#ffd700] to-[#ff5a6a] shadow-[0_0_40px_rgba(226,0,26,0.6)] animate-pulse">
                  <img
                    src={fantasmaClaroImg}
                    alt="Fantasma Claro"
                    className="w-full h-full object-cover rounded-xl filter contrast-115"
                  />
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#ffd700] font-mono uppercase tracking-wider animate-bounce">
                  <span>✨ Toca para revelar el triunfo Claro ✨</span>
                </div>
              </div>

              <div className="text-center pb-2">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] text-white text-xs font-cinzel font-black uppercase tracking-widest shadow-[0_0_20px_rgba(226,0,26,0.6)]">
                  <span>REVELAR CONTRAOFERTA GANADORA</span>
                  <Zap className="w-4 h-4 text-yellow-300 fill-current" />
                </div>
              </div>
            </div>

            {/* FRENTE REVELADO DE CLARO */}
            <div
              className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden flex flex-col justify-between p-6 sm:p-8 border-3 border-[#ffd700]"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'radial-gradient(circle at 50% 20%, #350815 0%, #1a040b 60%, #0a0104 100%)',
                boxShadow: '0 0 60px rgba(226, 0, 26, 0.65), inset 0 0 40px rgba(255, 215, 0, 0.25)'
              }}
            >
              <div className="absolute inset-3 rounded-[24px] border border-white/10 pointer-events-none" />

              {/* Cabecera */}
              <div className="relative z-10 pb-3 border-b border-white/15">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-black uppercase px-3 py-1 rounded-full bg-[#e2001a] text-white border border-yellow-300 shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                    ¡CONTRAOFERTA GANADORA!
                  </span>
                  <span className="font-mono text-xs text-[#ffd700] font-bold">
                    {currentCard.claroData}
                  </span>
                </div>

                <h3
                  className="font-cinzel font-black tracking-tight text-white leading-tight"
                  style={{ fontSize: 'clamp(26px, 2.5vw, 36px)' }}
                >
                  {currentCard.claroTitle}
                </h3>

                <div className="flex items-baseline gap-2 mt-2">
                  <span
                    className="font-cinzel font-black text-[#ffd700] leading-none drop-shadow-[0_0_25px_rgba(255,215,0,0.6)]"
                    style={{ fontSize: 'clamp(44px, 4vw, 56px)' }}
                  >
                    {currentCard.claroPrice}
                  </span>
                  <span className="text-sm font-mono text-[#f3ead3]/70 font-semibold">
                    / mes
                  </span>
                </div>
              </div>

              {/* Características con chulito dorado */}
              <div className="relative z-10 flex-1 my-4 overflow-y-auto pr-1">
                <ul className="space-y-3">
                  {currentCard.claroFeatures.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2.5 text-[#f3ead3] leading-snug"
                      style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}
                    >
                      <span className="text-[#ffd700] font-black text-base shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="font-medium text-white">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Speech Asesor Ganador */}
              <div className="relative z-10 p-4 rounded-2xl bg-gradient-to-r from-[#e2001a]/40 via-red-950/80 to-purple-950/60 border border-yellow-400/60 shadow-[0_0_25px_rgba(255,215,0,0.25)]">
                <div className="flex items-center gap-1.5 mb-1 text-[#ffd700]">
                  <Trophy className="w-4 h-4 text-[#ffd700] shrink-0" />
                  <span className="text-xs font-cinzel font-black uppercase tracking-wider">
                    Speech Asesor Ganador de Claro
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-serif italic text-white leading-relaxed">
                  {currentCard.claroPitch}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER INFERIOR CON RETO DEL ASESOR */}
      <div className="bg-[#1f1033]/90 border-2 border-[#ff7a29]/40 rounded-3xl p-5 sm:p-6 mt-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ffd700] via-[#ff7a29] to-[#e2001a] flex items-center justify-center text-2xl shadow-lg shrink-0">
            🎯
          </div>
          <div>
            <h4 className="font-cinzel text-base sm:text-lg font-bold text-white">
              Reto Comercial: {currentCard.questionPrompt}
            </h4>
            <p className="text-xs sm:text-sm text-[#f3ead3]/70">
              Usa la trampa del competidor para cerrar la venta destacando la <strong>Carta Fantasma de Claro</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={handleRevealGhostDirect}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] hover:brightness-110 text-white font-cinzel font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(226,0,26,0.6)] cursor-pointer transition-all flex items-center gap-2 shrink-0"
        >
          <Zap className="w-4 h-4 text-yellow-300 fill-current" />
          <span>¡Celebrar Victoria Claro!</span>
        </button>
      </div>
    </div>
  );
}
