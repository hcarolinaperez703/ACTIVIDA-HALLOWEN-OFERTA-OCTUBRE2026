import React, { useState, useEffect } from 'react';
import { DuelCardItem, CitySession } from '../types/duelOctober';
import { 
  ArrowLeft, RotateCcw, Play, Pause, Trophy, AlertTriangle, 
  CheckCircle2, Sparkles, Clock, Copy, Check, ExternalLink, Ghost, Flame
} from 'lucide-react';

interface MysteryDoorsViewProps {
  session: CitySession;
  cards: DuelCardItem[];
  onExit: () => void;
  onResetSessionStatus?: (status: 'active' | 'closed') => void;
}

export function MysteryDoorsView({
  session,
  cards,
  onExit,
  onResetSessionStatus
}: MysteryDoorsViewProps) {
  const [openedDoors, setOpenedDoors] = useState<Set<number>>(new Set());
  const [selectedCard, setSelectedCard] = useState<DuelCardItem | null>(null);
  const [speechTimer, setSpeechTimer] = useState<number>(45);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);
  const [winCelebrated, setWinCelebrated] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && speechTimer > 0) {
      interval = setInterval(() => {
        setSpeechTimer((prev) => prev - 1);
      }, 1000);
    } else if (speechTimer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, speechTimer]);

  // Sincronizar tarjeta seleccionada y reflejar de inmediato las tarjetas guardadas/editadas al iniciar actividad
  useEffect(() => {
    if (cards && cards.length > 0) {
      if (selectedCard) {
        const found = cards.find(c => c.id === selectedCard.id || c.doorNumber === selectedCard.doorNumber);
        if (found) {
          setSelectedCard(found);
        } else {
          setSelectedCard(cards[0]);
        }
      } else {
        setSelectedCard(cards[0]);
        setOpenedDoors(prev => new Set(prev).add(cards[0].doorNumber));
      }
    }
  }, [cards]);

  const handleDoorClick = (card: DuelCardItem) => {
    const updated = new Set(openedDoors);
    updated.add(card.doorNumber);
    setOpenedDoors(updated);
    setSelectedCard(card);
    setSpeechTimer(45);
    setIsTimerRunning(false);
    setWinCelebrated(false);
  };

  const handleResetDoors = () => {
    if (confirm('¿Deseas reiniciar todas las puertas de esta sesión?')) {
      setOpenedDoors(new Set());
      setSelectedCard(null);
      setSpeechTimer(45);
      setIsTimerRunning(false);
      setWinCelebrated(false);
    }
  };

  const handleExitClick = () => {
    if (confirm('¿Deseas salir de la actividad "Puertas Misteriosas"?')) {
      if (onResetSessionStatus) {
        if (confirm(`¿Deseas marcar la sesión de ${session.city} como CERRADA (disponible)?`)) {
          onResetSessionStatus('closed');
        }
      }
      onExit();
    }
  };

  const handleCopyPitch = (pitch: string) => {
    navigator.clipboard.writeText(pitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 3000);
  };

  const handleCelebrateWin = () => {
    setWinCelebrated(true);
    // Disparar confetti si está disponible
    if (typeof (window as any).confetti === 'function') {
      (window as any).confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in text-[#f3ead3]">
      {/* Barra Superior de la Sesión */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-orange-500/30">
        <div className="flex items-center gap-3">
          <button
            onClick={handleExitClick}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#f3ead3] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-cinzel font-bold uppercase"
            title="Salir al menú de sesiones"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-500/40 uppercase font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Sesión: {session.city} (Activo)
              </span>
              <span className="text-xs text-[#ffaa40] font-cinzel font-bold hidden md:inline">
                • Dinámica Puertas Misteriosas
              </span>
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
              Duelo de Ofertas de Halloween – Octubre
            </h2>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDoors}
            className="px-3.5 py-2 rounded-xl bg-orange-950/60 hover:bg-orange-900 border border-orange-500/40 text-orange-200 text-xs font-cinzel font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Puertas</span>
          </button>
        </div>
      </div>

      {/* Cuadrícula de Puertas Misteriosas */}
      <div className="mb-10">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ffaa40]">Selecciona una puerta</span>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white">
            Puertas Misteriosas de Octubre
          </h3>
          <p className="text-xs text-[#f3ead3]/70 mt-1 max-w-lg mx-auto">
            Abre una puerta para desvelar la oferta trampa del competidor y responder con el contraataque ganador de Claro.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {cards.map((card) => {
            const isOpened = openedDoors.has(card.doorNumber);
            const isSelected = selectedCard?.id === card.id;

            return (
              <div
                key={card.id}
                onClick={() => handleDoorClick(card)}
                className={`relative group cursor-pointer transition-all duration-300 rounded-3xl p-4 flex flex-col items-center justify-between text-center select-none ${
                  isOpened
                    ? 'bg-gradient-to-b from-[#2a0845] to-[#150a24] border-2 border-[#ff5a6a] shadow-[0_0_30px_rgba(226,0,26,0.4)]'
                    : 'bg-gradient-to-b from-[#3a1908] via-[#240e04] to-[#140602] border-2 border-[#ff7a29]/60 hover:border-[#ff7a29] shadow-[0_10px_25px_rgba(0,0,0,0.8)] hover:scale-105'
                } ${isSelected ? 'ring-2 ring-[#ffaa40]' : ''}`}
                style={{
                  minHeight: '220px',
                  borderRadius: '120px 120px 20px 20px'
                }}
              >
                {/* Arco gótico de la puerta */}
                <div className="w-full flex justify-center pt-2">
                  <span className="text-2xl filter drop-shadow">
                    {isOpened ? '👻' : '🦇'}
                  </span>
                </div>

                {/* Número de Puerta */}
                <div className="my-auto">
                  <span className="font-cinzel text-3xl sm:text-4xl font-black text-[#ffd700] filter drop-shadow-[0_2px_8px_rgba(255,215,0,0.6)]">
                    {card.doorNumber}
                  </span>
                  <p className="font-cinzel text-[11px] font-bold text-white/90 mt-1 uppercase tracking-wider">
                    {isOpened ? 'Abierta' : 'Puerta'}
                  </p>
                </div>

                {/* Cerradura / Pomo Embrujado */}
                <div className="pb-3 flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#ffd700] to-[#b8860b] border-2 border-[#4a2e05] shadow-inner" />
                  <span className="text-[10px] font-mono text-[#ffaa40] font-bold">
                    {isOpened ? 'REVELADA' : 'TOCA PARA ABRIR'}
                  </span>
                </div>

                {/* Murciélagos o telaraña decorativa */}
                <span className="absolute top-2 left-3 text-[10px] opacity-40">🕸️</span>
                <span className="absolute top-2 right-3 text-[10px] opacity-40">🕸️</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TARJETA DEL DUELO DESPLEGADA */}
      {selectedCard ? (
        <div 
          className="bg-[#1f1033]/95 border-2 border-[#ff7a29] rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(255,122,41,0.3)] animate-fade-in relative"
          style={{
            boxShadow: '0 0 50px rgba(226, 0, 26, 0.25), inset 0 0 30px rgba(255, 122, 41, 0.1)'
          }}
        >
          {/* Cabecera del Duelo */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#ff7a29]/30">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-orange-950 text-orange-300 border border-orange-500/40 uppercase font-bold">
                  Puerta {selectedCard.doorNumber} Desvelada
                </span>
                <span className="text-xs text-white/60">• Tarjeta Activa</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
                {selectedCard.title}
              </h3>
            </div>

            {/* Cronómetro del Asesor (45 segundos) */}
            <div className="flex items-center gap-3 bg-black/50 px-4 py-2 rounded-2xl border border-white/10">
              <Clock className="w-5 h-5 text-[#ffaa40]" />
              <div className="text-left font-mono">
                <span className="text-[10px] text-white/60 block">Tiempo de Asesor</span>
                <span className="text-lg font-bold text-[#ffaa40]">{speechTimer}s</span>
              </div>

              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="p-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 cursor-pointer"
                  title={isTimerRunning ? 'Pausar' : 'Iniciar cronómetro'}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setSpeechTimer(45);
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#f3ead3] cursor-pointer"
                  title="Reiniciar a 45s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Pregunta o Reto */}
          <div className="bg-gradient-to-r from-orange-950/60 via-purple-950/60 to-red-950/60 border border-[#ff7a29]/50 rounded-2xl p-4 mb-6 shadow-md">
            <span className="text-[11px] font-mono text-[#ffaa40] uppercase font-bold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Reto para el Asesor al Abrir la Puerta:
            </span>
            <p className="text-sm sm:text-base font-medium text-white">
              {selectedCard.questionPrompt}
            </p>
          </div>

          {/* Cuadrícula Comparativa: Competidor VS Fantasma Claro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* LADO IZQUIERDO: COMPETIDOR */}
            <div className="bg-[#150a24]/90 border border-orange-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-orange-500/20">
                  <span className="font-cinzel text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🎃</span> TARJETA COMPETIDOR SELECCIONADA
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-orange-950/60 text-orange-300 rounded border border-orange-500/30">
                    {selectedCard.competitorTag}
                  </span>
                </div>

                <h4 className="font-cinzel text-xl font-bold text-white mb-2">
                  {selectedCard.competitorName}
                </h4>

                <div className="bg-black/50 p-3 rounded-xl mb-4 text-center border border-white/10">
                  <span className="text-2xl sm:text-3xl font-cinzel font-black text-orange-400 block">
                    {selectedCard.competitorPrice}
                  </span>
                  <span className="text-xs text-[#f3ead3]/80 font-medium">
                    {selectedCard.competitorData}
                  </span>
                </div>

                <ul className="space-y-2 mb-4 text-xs">
                  {selectedCard.competitorFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[#f3ead3]/80">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trampa Oculta */}
              <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3 text-xs text-red-200">
                <strong className="text-red-400 block mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Trampa Oculta / Letra Menuda:
                </strong>
                <p>{selectedCard.competitorTrap}</p>
              </div>
            </div>

            {/* LADO DERECHO: FANTASMA CLARO */}
            <div className="bg-[#150a24]/90 border border-red-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-red-500/20">
                  <span className="font-cinzel text-xs font-bold text-[#ff5a6a] uppercase tracking-wider flex items-center gap-1.5">
                    <span>👻</span> LA CONTRAOFERTA DE CLARO (TARJETA FANTASMA)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950/60 text-emerald-300 rounded border border-emerald-500/30">
                    Contraoferta Imbatible
                  </span>
                </div>

                <h4 className="font-cinzel text-xl font-bold text-white mb-2">
                  {selectedCard.claroTitle}
                </h4>

                <div className="bg-gradient-to-r from-red-950/60 to-purple-950/60 p-3 rounded-xl mb-4 text-center border border-red-500/40 shadow-inner">
                  <span className="text-2xl sm:text-3xl font-cinzel font-black text-white block">
                    {selectedCard.claroPrice}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">
                    {selectedCard.claroData}
                  </span>
                </div>

                <ul className="space-y-2 mb-4 text-xs">
                  {selectedCard.claroFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[#f3ead3]">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Argumentario de Cierre Asesor */}
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 text-xs text-emerald-200">
                <div className="flex items-center justify-between mb-1.5">
                  <strong className="text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Speech Asesor Ganador:
                  </strong>
                  <button
                    onClick={() => handleCopyPitch(selectedCard.claroPitch)}
                    className="text-[10px] px-2 py-0.5 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 rounded flex items-center gap-1 cursor-pointer transition-all"
                  >
                    {copiedPitch ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPitch ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <p className="font-serif italic leading-relaxed text-[#f3ead3]/95">
                  {selectedCard.claroPitch}
                </p>
              </div>
            </div>
          </div>

          {/* Botón de Cierre Exitoso */}
          <div className="text-center pt-2">
            <button
              onClick={handleCelebrateWin}
              className={`px-6 py-3 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-lg flex items-center justify-center gap-2 mx-auto ${
                winCelebrated
                  ? 'bg-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)]'
                  : 'bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] hover:brightness-110 text-white shadow-[0_0_25px_rgba(226,0,26,0.45)]'
              }`}
            >
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span>{winCelebrated ? '¡Cierre Claro Registrado!' : '¡Victoria Claro en esta Puerta!'}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-black/20 rounded-3xl border border-white/5 p-6">
          <Ghost className="w-10 h-10 text-[#ffaa40] mx-auto mb-2 animate-bounce" />
          <h4 className="font-cinzel text-lg text-white font-bold">Puertas en Espera</h4>
          <p className="text-xs text-[#f3ead3]/60 max-w-md mx-auto mt-1">
            Haz clic en cualquiera de las 5 puertas para desvelar la objeción comercial y practicar el contraataque con tu equipo.
          </p>
        </div>
      )}
    </div>
  );
}
