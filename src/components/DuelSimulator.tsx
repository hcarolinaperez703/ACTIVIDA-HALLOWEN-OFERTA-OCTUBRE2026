import React, { useState, useEffect } from 'react';
import { Swords, Trophy, Clock, Play, RotateCcw, Edit3, Check, AlertTriangle, Sparkles, Copy, Eye, Zap, Flame, ChevronDown, Layers, ArrowRight, Globe, Lock, ShieldCheck, ExternalLink, RefreshCw } from 'lucide-react';
import { CARD_ASSETS, INITIAL_DUELS } from '../data/assetsData';
import { PREDEFINED_COMPETITORS, PredefinedCompetitor } from '../data/predefinedCompetitors';
import { DuelScenario, CardAsset } from '../types/duel';
import { Scoreboard } from './Scoreboard';
import { useScoreboard } from '../context/ScoreboardContext';
import { playCardClickSound } from '../utils/soundEffects';

export function DuelSimulator() {
  const [duels, setDuels] = useState<DuelScenario[]>(INITIAL_DUELS);
  const [activeDuelIndex, setActiveDuelIndex] = useState<number>(0);
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>('plan-brujo');
  const [frameType, setFrameType] = useState<'image' | 'vector'>('image');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);
  const [claroVictory, setClaroVictory] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [loadSuccessFeedback, setLoadSuccessFeedback] = useState<string | null>(null);

  // 3D Card Interactive Tilt Physics state
  const [tiltComp, setTiltComp] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tiltClaro, setTiltClaro] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const { addClaroWin } = useScoreboard();

  // Timer for training activity
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const currentDuel = duels[activeDuelIndex];
  const activeCompetitorPreset = PREDEFINED_COMPETITORS.find(c => c.id === selectedCompetitorId) || PREDEFINED_COMPETITORS[0];

  // Handler to load predefined competitor into active duel
  const handleSelectPredefinedCompetitor = (competitor: PredefinedCompetitor) => {
    playCardClickSound();
    setSelectedCompetitorId(competitor.id);
    setDropdownOpen(false);

    // Update the duels array at active index with the specific attributes from the preset
    const updated = [...duels];
    updated[activeDuelIndex] = {
      ...competitor.duelPreset,
      id: duels[activeDuelIndex].id, // preserve original duel id or keep consistent
      title: competitor.duelPreset.title,
      subtitle: competitor.duelPreset.subtitle,
    };
    setDuels(updated);

    // Reset simulator timer & victory state for the new duel
    setTimerRunning(false);
    setTimerSeconds(60);
    setClaroVictory(false);

    setLoadSuccessFeedback(`¡Cargado con éxito: ${competitor.name} (${competitor.alias})!`);
    setTimeout(() => setLoadSuccessFeedback(null), 3000);
  };

  // 3D Mouse Movement Handlers for dynamic depth
  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>, card: 'comp' | 'claro') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 10;
    if (card === 'comp') {
      setTiltComp({ x: rotateX, y: rotateY });
    } else {
      setTiltClaro({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeaveCard = (card: 'comp' | 'claro') => {
    if (card === 'comp') setTiltComp({ x: 0, y: 0 });
    else setTiltClaro({ x: 0, y: 0 });
  };

  // Find corresponding frame assets
  const competitorAsset: CardAsset = CARD_ASSETS.find((a) => {
    if (currentDuel.competitorType === 'calabaza-a') return a.id === 'calabaza-a';
    if (currentDuel.competitorType === 'ataud') return a.id === 'ataud';
    return a.id === 'calabaza-b';
  }) || CARD_ASSETS[0];

  const claroAsset: CardAsset = CARD_ASSETS.find((a) => a.id === 'fantasma-claro') || CARD_ASSETS[3];

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(
      `[ARGUMENTARIO DE CIERRE CLARO]\n${currentDuel.claro.killerPitch}\nPlan: ${currentDuel.claro.planName} (${currentDuel.claro.price})`
    );
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const handleVictoryTrigger = () => {
    addClaroWin(currentDuel.competitorType, currentDuel.title);
    setClaroVictory(true);
    setTimerRunning(false);
    setTimeout(() => setClaroVictory(false), 4000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* SCOREBOARD PERSISTENTE */}
      <Scoreboard
        currentCompetitorId={currentDuel.competitorType}
        currentDuelTitle={currentDuel.title}
      />

      {/* Duel selector & Session Controller */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-5 rounded-2xl bg-[#1f1033]/80 border border-white/10 backdrop-blur-md">
        {/* Scenarios pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          {duels.map((duel, idx) => (
            <button
              key={duel.id}
              onClick={() => {
                setActiveDuelIndex(idx);
                setTimerSeconds(60);
                setTimerRunning(false);
                setClaroVictory(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-cinzel font-bold transition-all whitespace-nowrap flex items-center gap-2 border ${
                activeDuelIndex === idx
                  ? 'bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] text-white border-[#ff5a6a] shadow-[0_0_20px_rgba(226,0,26,0.5)]'
                  : 'bg-black/30 text-[#f3ead3]/70 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Duelo 0{idx + 1}</span>
            </button>
          ))}
        </div>

        {/* Training Timer & Controls */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Frame Style toggle */}
          <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10 text-xs">
            <button
              onClick={() => setFrameType('image')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                frameType === 'image'
                  ? 'bg-[#ff7a29] text-white shadow-sm'
                  : 'text-[#f3ead3]/60 hover:text-white'
              }`}
            >
              Marco HD (PNG)
            </button>
            <button
              onClick={() => setFrameType('vector')}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                frameType === 'vector'
                  ? 'bg-[#5c8a6b] text-white shadow-sm'
                  : 'text-[#f3ead3]/60 hover:text-white'
              }`}
            >
              Vector SVG / Clip
            </button>
          </div>

          {/* Quick Edit */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isEditing
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-black/40 text-[#f3ead3]/80 border-white/10 hover:bg-white/5'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Listo' : 'Editar Datos'}</span>
          </button>

          {/* Trainer Countdown Timer */}
          <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-lg border border-white/10">
            <Clock className={`w-3.5 h-3.5 ${timerRunning ? 'text-[#ff5a6a] animate-spin' : 'text-[#f3ead3]/60'}`} />
            <span className="font-mono text-xs font-bold text-[#f3ead3] w-9 text-center">
              {timerSeconds}s
            </span>
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="p-1 hover:text-[#ff7a29] transition-colors"
              title={timerRunning ? 'Pausar' : 'Iniciar'}
            >
              <Play className="w-3 h-3 fill-current" />
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(60);
              }}
              className="p-1 hover:text-[#ff5a6a] transition-colors"
              title="Reiniciar"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* Victory Trigger */}
          <button
            onClick={handleVictoryTrigger}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold bg-[#e2001a] hover:bg-[#ff5a6a] text-white shadow-[0_0_15px_rgba(226,0,26,0.4)] transition-all active:scale-95"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>¡Cierre Claro!</span>
          </button>
        </div>
      </div>

      {/* Duel Title header & Predefined Competitor Selector */}
      <div className="rounded-2xl border border-white/10 bg-[#1f1033]/90 p-5 backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-[#ff7a29]/20 text-[#ff7a29] border border-[#ff7a29]/30 font-bold">
                Ronda de Capacitación en Vivo
              </span>
              <span className="text-xs text-[#f3ead3]/60">• Simulador de Duelos</span>
            </div>
            <h2 className="text-xl md:text-2xl font-cinzel font-black text-[#f3ead3]">
              {currentDuel.title}
            </h2>
            <p className="text-xs text-[#f3ead3]/70">{currentDuel.subtitle}</p>
          </div>

          {/* DROPDOWN SELECTOR: 3 Predefined Competitors */}
          <div className="relative min-w-[280px] sm:min-w-[340px]">
            <label className="block text-[11px] font-mono text-[#f3ead3]/70 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-[#ff7a29]">
                <Layers className="w-3.5 h-3.5" />
                Elegir Competidor Predefinido:
              </span>
              <span className="text-[10px] text-[#f3ead3]/50">3 Rivales Listos</span>
            </label>

            {/* Custom Dropdown Trigger */}
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 hover:border-[#ff7a29]/60 text-left transition-all shadow-md group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="text-lg">{activeCompetitorPreset.icon}</span>
                <div className="truncate">
                  <div className="text-xs font-cinzel font-bold text-[#f3ead3] group-hover:text-[#ff7a29] transition-colors truncate">
                    {activeCompetitorPreset.name}
                  </div>
                  <div className="text-[11px] text-[#f3ead3]/60 font-mono truncate">
                    {activeCompetitorPreset.alias}
                  </div>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#ff7a29] transition-transform duration-200 shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Options */}
            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-full sm:w-[380px] z-50 rounded-xl bg-[#150a24] border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.8)] overflow-hidden divide-y divide-white/10 animate-fade-in">
                  <div className="p-2.5 bg-black/40 text-[11px] font-mono text-[#f3ead3]/60 flex items-center justify-between">
                    <span>Selecciona para cargar atributos al simulador:</span>
                    <span className="text-[#ff7a29] font-bold">1 clic</span>
                  </div>

                  {PREDEFINED_COMPETITORS.map((comp) => {
                    const isSelected = comp.id === selectedCompetitorId;
                    return (
                      <button
                        key={comp.id}
                        type="button"
                        onClick={() => handleSelectPredefinedCompetitor(comp)}
                        className={`w-full p-3 text-left transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-[#ff7a29]/15 border-l-4 border-l-[#ff7a29]'
                            : 'hover:bg-white/5 border-l-4 border-l-transparent'
                        }`}
                      >
                        <span className="text-2xl mt-0.5">{comp.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="font-cinzel text-xs font-bold text-[#f3ead3]">
                              {comp.name}
                            </span>
                            <span
                              className="text-[10px] font-mono px-1.5 py-0.2 rounded"
                              style={{
                                color: comp.color,
                                backgroundColor: `${comp.color}20`,
                                border: `1px solid ${comp.color}40`
                              }}
                            >
                              {comp.badge}
                            </span>
                          </div>

                          <div className="text-[11px] font-semibold text-[#ff7a29] mb-1">
                            {comp.alias}
                          </div>

                          <p className="text-[11px] text-[#f3ead3]/70 line-clamp-2 leading-relaxed">
                            {comp.description}
                          </p>

                          <div className="mt-1.5 flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                            <ArrowRight className="w-3 h-3" />
                            <span>Cargar atributos y contraoferta Claro</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Load Notification Feedback */}
        {loadSuccessFeedback && (
          <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{loadSuccessFeedback}</span>
          </div>
        )}
      </div>

      {/* Duel Battle Arena: 2 Cards Side-by-Side in 3D Web Page Window Format */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch perspective-container">
        {/* ========================================================================= */}
        {/* CARD 1: Competitor Offer (Web-Page Window with 3D Depth)                 */}
        {/* ========================================================================= */}
        <div className="relative flex flex-col items-center">
          {/* 3D Web-Page Window Container */}
          <div
            onClick={playCardClickSound}
            onMouseMove={(e) => handleMouseMoveCard(e, 'comp')}
            onMouseLeave={() => handleMouseLeaveCard('comp')}
            style={{
              transform: `rotateX(${tiltComp.x}deg) rotateY(${tiltComp.y}deg)`,
            }}
            className={`tarjeta-oferta ${
              currentDuel.competitorType === 'ataud' ? 'tarjeta-ataud' : 'tarjeta-calabaza'
            } relative w-full max-w-[490px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/15 bg-[#150a24] cursor-pointer`}
          >
            {/* Top Web Browser Header / Chrome Bar */}
            <div className="browser-chrome px-4 py-2.5 flex items-center justify-between z-20 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="browser-dot bg-[#ff5f56]" />
                <span className="browser-dot bg-[#ffbd2e]" />
                <span className="browser-dot bg-[#27c93f]" />
              </div>

              {/* URL address bar */}
              <div className="browser-url-bar flex items-center gap-1.5 truncate max-w-[240px] sm:max-w-[280px]">
                <Lock className="w-3 h-3 text-[#ff7a29] shrink-0" />
                <span className="truncate">https://ofertas-competidor.com/plan-anzuelo</span>
              </div>

              <div className="flex items-center gap-1 text-[#f3ead3]/40">
                <RefreshCw className="w-3 h-3" />
              </div>
            </div>

            {/* Main Web Page Card Body with 3D Depth */}
            <div className="relative flex-1 w-full h-full overflow-hidden p-5 sm:p-7 flex items-center justify-center">
              {/* Background frame asset */}
              {frameType === 'image' ? (
                <img
                  src={competitorAsset.imageSrc}
                  alt={competitorAsset.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 opacity-80"
                />
              ) : (
                <div
                  className={`absolute inset-0 w-full h-full border-4 ${
                    currentDuel.competitorType === 'ataud'
                      ? 'clip-coffin border-[#5c8a6b] bg-[#150a24] glow-coffin'
                      : 'clip-pumpkin border-[#ff7a29] bg-[#150a24] glow-pumpkin'
                  }`}
                />
              )}

              {/* Parallax Content Layer */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between text-center overflow-y-auto layer-3d-front">
                {/* Header section */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-[#ff7a29] font-mono font-bold bg-black/60 px-3 py-0.5 rounded-full inline-block border border-[#ff7a29]/30">
                    {currentDuel.competitor.weaknessTitle}
                  </span>

                  {isEditing ? (
                    <input
                      value={currentDuel.competitor.brandName}
                      onChange={(e) => {
                        const newDuels = [...duels];
                        newDuels[activeDuelIndex].competitor.brandName = e.target.value;
                        setDuels(newDuels);
                      }}
                      className="w-full bg-black/70 border border-white/30 rounded px-2.5 py-1 text-center font-cinzel text-base sm:text-lg text-[#f3ead3] font-bold"
                    />
                  ) : (
                    <h3 className="font-cinzel text-xl sm:text-2xl lg:text-3xl font-black text-[#f3ead3] tracking-wide drop-shadow-md">
                      {currentDuel.competitor.brandName}
                    </h3>
                  )}

                  <div className="text-sm sm:text-base font-semibold text-[#f3ead3]/90 bg-black/50 py-0.5 px-2.5 rounded-lg inline-block border border-white/10">{currentDuel.competitor.planName}</div>
                </div>

                {/* Price & Primary Stat */}
                <div className="my-auto py-2 sm:py-3">
                  <div className="inline-block bg-black/70 backdrop-blur-md px-5 sm:px-7 py-2.5 sm:py-3 rounded-2xl border border-white/20 shadow-xl">
                    {isEditing ? (
                      <input
                        value={currentDuel.competitor.price}
                        onChange={(e) => {
                          const newDuels = [...duels];
                          newDuels[activeDuelIndex].competitor.price = e.target.value;
                          setDuels(newDuels);
                        }}
                        className="bg-transparent border-b border-[#ff7a29] text-center font-cinzel text-3xl sm:text-4xl font-black text-[#ff7a29] w-full"
                      />
                    ) : (
                      <div className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-[#ff7a29] glow-text-pumpkin tracking-tight">
                        {currentDuel.competitor.price}
                      </div>
                    )}
                    <div className="text-sm sm:text-base text-[#f3ead3] font-bold mt-1">
                      {currentDuel.competitor.data}
                    </div>
                  </div>

                  {/* Features list with bigger text & clearer icons */}
                  <div className="mt-3.5 sm:mt-4 text-left max-w-sm sm:max-w-md mx-auto space-y-2 text-sm sm:text-base text-[#f3ead3] font-medium bg-black/50 p-3.5 rounded-xl border border-white/15 backdrop-blur-sm">
                    {currentDuel.competitor.details.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="text-red-400 font-extrabold text-base sm:text-lg leading-none shrink-0">✕</span>
                        <span className="leading-snug text-[#f3ead3]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hidden Trap (La Objeción que el cliente trae) */}
                <div className="bg-red-950/70 border border-red-500/60 rounded-xl p-3 sm:p-3.5 text-left text-sm backdrop-blur-md shadow-md mt-2">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-red-300 uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Cláusula Oculta / La Objeción:</span>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={currentDuel.competitor.hiddenTrap}
                      onChange={(e) => {
                        const newDuels = [...duels];
                        newDuels[activeDuelIndex].competitor.hiddenTrap = e.target.value;
                        setDuels(newDuels);
                      }}
                      rows={2}
                      className="w-full bg-black/70 border border-white/30 rounded p-1.5 text-sm text-[#f3ead3]"
                    />
                  ) : (
                    <p className="text-[#f3ead3] text-xs sm:text-sm font-medium leading-relaxed">{currentDuel.competitor.hiddenTrap}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: Claro Counteroffer (Web-Page Window with 3D Depth)               */}
        {/* ========================================================================= */}
        <div className="relative flex flex-col items-center">
          {/* 3D Web-Page Window Container */}
          <div
            onClick={playCardClickSound}
            onMouseMove={(e) => handleMouseMoveCard(e, 'claro')}
            onMouseLeave={() => handleMouseLeaveCard('claro')}
            style={{
              transform: `rotateX(${tiltClaro.x}deg) rotateY(${tiltClaro.y}deg)`,
            }}
            className={`tarjeta-oferta tarjeta-claro cursor-pointer relative w-full max-w-[490px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-[#e2001a]/40 bg-[#150a24] transition-all duration-300 ${
              claroVictory ? 'ring-4 ring-[#ff5a6a] shadow-[0_0_60px_rgba(226,0,26,0.9)]' : ''
            }`}
          >
            {/* Top Web Browser Header / Chrome Bar */}
            <div className="browser-chrome px-4 py-2.5 flex items-center justify-between z-20 shrink-0 border-b border-[#e2001a]/30">
              <div className="flex items-center gap-1.5">
                <span className="browser-dot bg-[#e2001a]" />
                <span className="browser-dot bg-[#ffbd2e]" />
                <span className="browser-dot bg-[#27c93f]" />
              </div>

              {/* URL address bar */}
              <div className="browser-url-bar flex items-center gap-1.5 truncate max-w-[240px] sm:max-w-[280px] border-[#e2001a]/40 text-white">
                <Lock className="w-3 h-3 text-[#ff5a6a] shrink-0" />
                <span className="truncate">https://claro.com.co/soluciones-hogar</span>
              </div>

              <div className="flex items-center gap-1 text-[#ff7a8a]">
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>

            {/* Main Web Page Card Body with 3D Depth */}
            <div className="relative flex-1 w-full h-full overflow-hidden p-5 sm:p-7 flex items-center justify-center">
              {/* Background frame: Image Master or Pure SVG Vector */}
              {frameType === 'image' ? (
                <img
                  src={claroAsset.imageSrc}
                  alt={claroAsset.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 opacity-85"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full border-4 clip-ghost border-[#e2001a] bg-[#150a24] glow-claro" />
              )}

              {/* Victory Badge Overlay */}
              {claroVictory && (
                <div className="absolute top-4 z-30 animate-bounce bg-[#e2001a] text-white px-5 py-2 rounded-full font-cinzel font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 border-2 border-white/50 layer-3d-badge">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span>¡PROPUESTA CLARO VICTORIOSA!</span>
                </div>
              )}

              {/* Parallax Content Layer */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between text-center overflow-y-auto layer-3d-front">
                {/* Header section */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-[#ff5a6a] font-mono font-bold bg-[#e2001a]/30 border border-[#e2001a]/50 px-3 py-0.5 rounded-full inline-block">
                    {currentDuel.claro.advantageTitle}
                  </span>

                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e2001a] animate-ping" />
                    <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide glow-text-claro">
                      CLARO
                    </h3>
                  </div>

                  <div className="text-sm sm:text-base font-bold text-[#f3ead3] bg-[#e2001a]/35 border border-[#e2001a]/50 py-0.5 px-3 rounded-lg inline-block">{currentDuel.claro.planName}</div>
                </div>

                {/* Price & Primary Stat */}
                <div className="my-auto py-2 sm:py-3">
                  <div className="inline-block bg-[#1f1033]/90 backdrop-blur-md px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-2xl border border-[#e2001a]/60 shadow-[0_0_30px_rgba(226,0,26,0.45)]">
                    {isEditing ? (
                      <input
                        value={currentDuel.claro.price}
                        onChange={(e) => {
                          const newDuels = [...duels];
                          newDuels[activeDuelIndex].claro.price = e.target.value;
                          setDuels(newDuels);
                        }}
                        className="bg-transparent border-b border-[#e2001a] text-center font-cinzel text-3xl sm:text-4xl font-black text-white w-full"
                      />
                    ) : (
                      <div className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white glow-text-claro tracking-tight">
                        {currentDuel.claro.price}
                      </div>
                    )}
                    <div className="text-sm sm:text-base text-[#ff7a8a] font-extrabold mt-1">
                      {currentDuel.claro.data}
                    </div>
                  </div>

                  {/* Features list with bigger text & clearer icons */}
                  <div className="mt-3.5 sm:mt-4 text-left max-w-sm sm:max-w-md mx-auto space-y-2 text-sm sm:text-base text-[#f3ead3] font-medium bg-black/50 p-3.5 rounded-xl border border-white/15 backdrop-blur-sm">
                    {currentDuel.claro.details.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-extrabold text-base sm:text-lg leading-none shrink-0">✓</span>
                        <span className="leading-snug text-[#f3ead3]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pitch Rebuttal Speech (El Argumentario de Cierre de Venta) */}
                <div className="bg-gradient-to-r from-[#e2001a]/40 via-[#1f1033]/90 to-[#e2001a]/30 border border-[#e2001a]/70 rounded-xl p-3 sm:p-3.5 text-left text-sm backdrop-blur-md shadow-lg mt-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#ff7a8a] uppercase tracking-wider mb-1">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#ff7a29] shrink-0" />
                      <span>Argumentario de Cierre Asesor:</span>
                    </div>
                    <button
                      onClick={handleCopyPitch}
                      className="p-1.5 hover:text-white bg-black/50 rounded-lg hover:bg-[#e2001a] transition-all cursor-pointer"
                      title="Copiar Speech"
                    >
                      {copiedPitch ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {isEditing ? (
                    <textarea
                      value={currentDuel.claro.killerPitch}
                      onChange={(e) => {
                        const newDuels = [...duels];
                        newDuels[activeDuelIndex].claro.killerPitch = e.target.value;
                        setDuels(newDuels);
                      }}
                      rows={2}
                      className="w-full bg-black/70 border border-white/30 rounded p-1.5 text-sm text-[#f3ead3]"
                    />
                  ) : (
                    <p className="text-[#f3ead3] text-xs sm:text-sm font-medium leading-relaxed">{currentDuel.claro.killerPitch}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Training Cheat Sheet Panel */}
      <div className="p-6 rounded-2xl bg-[#150a24] border border-[#ff7a29]/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#ff7a29]" />
            <h4 className="font-cinzel font-bold text-base text-[#f3ead3]">
              Checklist de Objeciones para Asesores Comerciales Claro
            </h4>
          </div>
          <span className="text-xs text-[#f3ead3]/60">Metodología de Capacitación de Ventas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
            <span className="font-semibold text-[#ff7a29]">1. Descubrir la Letra Pequeña:</span>
            <p className="text-[#f3ead3]/70">
              Pregunta al cliente: <em>"¿Le informaron cuántos días dura el ciclo y a qué velocidad baja después de los primeros gigas?"</em>
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
            <span className="font-semibold text-[#5c8a6b]">2. Romper el Miedo al Amarre:</span>
            <p className="text-[#f3ead3]/70">
              Evidencia que en Claro el precio es transparente y fijo, sin trampas de subidas al 4to mes ni cláusulas sepulcrales de 24 meses.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
            <span className="font-semibold text-[#ff5a6a]">3. Valor Percibido vs Precio Bruto:</span>
            <p className="text-[#f3ead3]/70">
              Destaca beneficios reales: Roaming América incluido, red 5G nacional verificada y Claro Club con ahorro tangible todos los meses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
