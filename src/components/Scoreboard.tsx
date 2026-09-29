import React, { useState } from 'react';
import { Trophy, Flame, RotateCcw, TrendingUp, History, Swords, Sparkles, ChevronDown, ChevronUp, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { useScoreboard } from '../context/ScoreboardContext';
import { playCardClickSound } from '../utils/soundEffects';

interface ScoreboardProps {
  currentCompetitorId?: 'calabaza-a' | 'ataud' | 'calabaza-b';
  currentDuelTitle?: string;
  className?: string;
}

export function Scoreboard({ currentCompetitorId = 'calabaza-a', currentDuelTitle = 'Duelo en Curso', className = '' }: ScoreboardProps) {
  const {
    scoreboard,
    addClaroWin,
    addCompetitorWin,
    resetScores,
    resetCompetitorsScores,
    totalBattles,
    totalCompetitorWins,
    claroWinRate,
  } = useScoreboard();

  const [showHistory, setShowHistory] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [competitorsResetNotif, setCompetitorsResetNotif] = useState(false);

  const handleResetCompetitors = () => {
    playCardClickSound();
    resetCompetitorsScores();
    setCompetitorsResetNotif(true);
    setTimeout(() => setCompetitorsResetNotif(false), 2500);
  };

  const competitorsMeta = [
    {
      id: 'calabaza-a' as const,
      num: '01',
      name: 'Competidor 1',
      alias: 'Prepago Brujo',
      type: 'Calabaza A',
      score: scoreboard.competitors['calabaza-a'],
      color: '#ff7a29',
      borderClass: 'border-[#ff7a29]/40',
      bgClass: 'bg-[#ff7a29]/10',
      activeGlow: 'shadow-[0_0_15px_rgba(255,122,41,0.35)]',
    },
    {
      id: 'ataud' as const,
      num: '02',
      name: 'Competidor 2',
      alias: 'Operador Funesto',
      type: 'Ataúd Hexagonal',
      score: scoreboard.competitors['ataud'],
      color: '#5c8a6b',
      borderClass: 'border-[#5c8a6b]/40',
      bgClass: 'bg-[#5c8a6b]/10',
      activeGlow: 'shadow-[0_0_15px_rgba(92,138,107,0.35)]',
    },
    {
      id: 'calabaza-b' as const,
      num: '03',
      name: 'Competidor 3',
      alias: 'Operador Low-Cost',
      type: 'Calabaza B',
      score: scoreboard.competitors['calabaza-b'],
      color: '#ff7a29',
      borderClass: 'border-[#ff7a29]/40',
      bgClass: 'bg-[#ff7a29]/10',
      activeGlow: 'shadow-[0_0_15px_rgba(255,122,41,0.35)]',
    },
  ];

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-b from-[#1f1033]/95 via-[#150a24]/95 to-[#1f1033]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] space-y-4 ${className}`}
    >
      {/* Top Header of the Scoreboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e2001a] via-[#1f1033] to-[#ff7a29] p-[1.5px] flex items-center justify-center shadow-[0_0_15px_rgba(226,0,26,0.5)]">
            <div className="w-full h-full bg-[#150a24] rounded-[6px] flex items-center justify-center">
              <Trophy className="w-4 h-4 text-amber-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#f3ead3] tracking-wide">
                MARCADOR DE DUELOS DE VENTAS
              </h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Persistente
              </span>
            </div>
            <p className="text-[11px] text-[#f3ead3]/60">
              Rastreo de victorias comerciales en tiempo real guardadas automáticamente
            </p>
          </div>
        </div>

        {/* Global Summary Metrics */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Win Rate */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[#f3ead3]/70">Efectividad Claro:</span>
            <span className="font-bold text-emerald-300 font-mono">{claroWinRate}%</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-xs">
            <Flame className="w-3.5 h-3.5 text-[#ff7a29] animate-pulse" />
            <span className="text-[#f3ead3]/70">Racha:</span>
            <span className="font-bold text-[#ff7a29] font-mono">{scoreboard.currentStreak} 🔥</span>
          </div>

          {/* Battles */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-xs">
            <Swords className="w-3.5 h-3.5 text-[#f3ead3]/60" />
            <span className="text-[#f3ead3]/70">Total:</span>
            <span className="font-bold text-[#f3ead3] font-mono">{totalBattles}</span>
          </div>

          {/* History Toggle */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#f3ead3]/80 border border-white/10 transition-colors"
            title="Ver historial de rondas"
          >
            <History className="w-3.5 h-3.5" />
            {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {/* Reset Competitors Wins to Zero Button */}
          <button
            onClick={handleResetCompetitors}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#ff7a29]/15 hover:bg-[#ff7a29]/30 text-[#ff7a29] hover:text-white border border-[#ff7a29]/40 text-xs font-semibold transition-all active:scale-95 cursor-pointer"
            title="Reiniciar contador de victorias de todos los competidores a cero"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#ff7a29]" />
            <span>Reiniciar Rivales (0)</span>
          </button>

          {/* Reset All button */}
          {confirmReset ? (
            <div className="flex items-center gap-1 bg-red-950/70 p-0.5 rounded-lg border border-red-500/50">
              <button
                onClick={() => {
                  playCardClickSound();
                  resetScores();
                  setConfirmReset(false);
                }}
                className="px-2 py-0.5 text-[11px] font-bold text-white bg-[#e2001a] rounded hover:bg-red-600"
              >
                Reset Todo
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-1.5 py-0.5 text-[11px] text-[#f3ead3]/60 hover:text-white"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-[#f3ead3]/60 hover:text-red-300 border border-white/10 transition-colors"
              title="Reiniciar Todo el Marcador"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Competitors Reset Feedback Banner */}
      {competitorsResetNotif && (
        <div className="p-2.5 rounded-lg bg-[#ff7a29]/20 border border-[#ff7a29]/40 text-xs text-[#f3ead3] flex items-center justify-between animate-fade-in">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>¡Contador de victorias de todos los competidores reiniciado a cero con éxito!</span>
          </span>
          <span className="text-[10px] font-mono text-[#ff7a29]">0 - 0 - 0</span>
        </div>
      )}

      {/* Main Score Cards: Claro vs The 3 Competitors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* 1. CLARO HERO WINNER CARD */}
        <div className="md:col-span-1 relative overflow-hidden rounded-xl border-2 border-[#e2001a] bg-gradient-to-br from-[#e2001a]/25 via-[#1f1033] to-[#150a24] p-3.5 shadow-[0_0_25px_rgba(226,0,26,0.4)] flex flex-col justify-between">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#e2001a]/20 rounded-full blur-xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#ff5a6a] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ff7a29]" /> PROPUESTA CLARO
              </span>
              <span className="text-[10px] font-semibold text-white/90 bg-[#e2001a] px-1.5 py-0.5 rounded">
                Hero
              </span>
            </div>
            <div className="font-cinzel text-xs font-bold text-[#f3ead3]">
              Contraoferta Fantasma
            </div>
          </div>

          <div className="my-2 text-center">
            <div className="font-cinzel text-4xl sm:text-5xl font-black text-white glow-text-claro">
              {scoreboard.claro}
            </div>
            <span className="text-[10px] text-[#ff5a6a] uppercase tracking-wider font-semibold">
              Cierres Exitosos
            </span>
          </div>

          <button
            onClick={() => {
              playCardClickSound();
              addClaroWin(currentCompetitorId, currentDuelTitle);
            }}
            className="w-full py-1.5 px-2 rounded-lg bg-[#e2001a] hover:bg-[#ff5a6a] text-white font-cinzel text-xs font-bold transition-all shadow-[0_0_15px_rgba(226,0,26,0.4)] active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-yellow-300" />
            <span>+1 Victoria Claro</span>
          </button>
        </div>

        {/* 2, 3, 4. THE 3 COMPETITORS */}
        <div className="md:col-span-3 flex flex-col gap-2">
          {/* Header Bar with explicit Reset Competitors Button */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#f3ead3]/70">
              Ofertas Rivales a Superar ({totalCompetitorWins} victorias)
            </span>
            <button
              onClick={handleResetCompetitors}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#ff7a29]/15 hover:bg-[#ff7a29]/30 text-[#ff7a29] hover:text-white border border-[#ff7a29]/30 text-[11px] font-semibold transition-all active:scale-95 cursor-pointer"
              title="Reiniciar contador de victorias de todos los competidores a cero"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reiniciar Competidores a Cero</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            {competitorsMeta.map((comp) => {
              const isCurrent = comp.id === currentCompetitorId;
              return (
                <div
                  key={comp.id}
                  className={`rounded-xl border p-3 flex flex-col justify-between transition-all ${comp.borderClass} ${comp.bgClass} ${
                    isCurrent ? `${comp.activeGlow} ring-1 ring-white/30` : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-[10px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.2 rounded"
                        style={{ color: comp.color }}
                      >
                        {comp.num} • {comp.type}
                      </span>
                      {isCurrent && (
                        <span className="text-[9px] font-semibold bg-white/20 text-[#f3ead3] px-1.5 py-0.5 rounded">
                          En Duelo
                        </span>
                      )}
                    </div>
                    <div className="font-cinzel text-xs font-bold text-[#f3ead3] truncate">
                      {comp.name}
                    </div>
                    <div className="text-[10px] text-[#f3ead3]/60 truncate">{comp.alias}</div>
                  </div>

                  <div className="my-2 text-center">
                    <div
                      className="font-cinzel text-3xl font-black"
                      style={{ color: comp.color }}
                    >
                      {comp.score}
                    </div>
                    <span className="text-[9px] text-[#f3ead3]/50 uppercase tracking-wider">
                      Objeciones Ganadas
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      playCardClickSound();
                      addCompetitorWin(comp.id, currentDuelTitle);
                    }}
                    className="w-full py-1.5 px-2 rounded-lg bg-black/40 hover:bg-black/60 text-[#f3ead3] border border-white/10 hover:border-white/25 text-xs font-medium transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                    style={{ color: comp.color }}
                  >
                    <span>+1 Venta Rival</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Collapsible History Drawer */}
      {showHistory && (
        <div className="pt-3 border-t border-white/10 space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-xs text-[#f3ead3]/70">
            <span className="font-cinzel font-semibold flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-[#ff7a29]" />
              Registro Reciente de Rondas de Capacitación
            </span>
            <span className="text-[10px] text-[#f3ead3]/50">
              Total rivales: {totalCompetitorWins} vs Claro: {scoreboard.claro}
            </span>
          </div>

          {scoreboard.history.length === 0 ? (
            <div className="text-center py-3 text-xs text-[#f3ead3]/40 bg-black/20 rounded-lg">
              No hay duelos registrados en esta sesión aún. Registra una victoria con los botones superiores.
            </div>
          ) : (
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
              {[...scoreboard.history].reverse().map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/30 border border-white/5 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.winner === 'claro' ? 'bg-[#e2001a]' : 'bg-[#ff7a29]'
                      }`}
                    />
                    <span className="font-medium text-[#f3ead3]">{item.duelTitle}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#f3ead3]/50">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span
                      className={`font-cinzel font-bold text-[11px] px-2 py-0.5 rounded ${
                        item.winner === 'claro'
                          ? 'bg-[#e2001a]/20 text-[#ff5a6a] border border-[#e2001a]/40'
                          : 'bg-[#ff7a29]/20 text-[#ff7a29] border border-[#ff7a29]/40'
                      }`}
                    >
                      {item.winner === 'claro' ? 'Victoria Claro' : 'Gana Rival'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
