import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScoreboardState, loadScoreboard, saveScoreboard, INITIAL_SCOREBOARD } from '../types/scoreboard';
import { playClaroVictorySound, playBellToll } from '../utils/soundEffects';

interface ScoreboardContextType {
  scoreboard: ScoreboardState;
  addClaroWin: (competitorId: 'calabaza-a' | 'ataud' | 'calabaza-b', duelTitle?: string) => void;
  addCompetitorWin: (competitorId: 'calabaza-a' | 'ataud' | 'calabaza-b', duelTitle?: string) => void;
  resetScores: () => void;
  resetCompetitorsScores: () => void;
  totalBattles: number;
  totalCompetitorWins: number;
  claroWinRate: number;
}

const ScoreboardContext = createContext<ScoreboardContextType | undefined>(undefined);

export const ScoreboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scoreboard, setScoreboard] = useState<ScoreboardState>(() => loadScoreboard());

  useEffect(() => {
    saveScoreboard(scoreboard);
  }, [scoreboard]);

  const addClaroWin = (competitorId: 'calabaza-a' | 'ataud' | 'calabaza-b', duelTitle?: string) => {
    playClaroVictorySound();
    setScoreboard((prev) => {
      const newStreak = prev.currentStreak + 1;
      const next: ScoreboardState = {
        ...prev,
        claro: prev.claro + 1,
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        lastWinner: 'claro',
        history: [
          ...prev.history,
          {
            id: String(Date.now()),
            timestamp: Date.now(),
            duelTitle: duelTitle || 'Duelo Comercial',
            winner: 'claro' as const,
            competitorId,
          },
        ].slice(-20),
      };
      return next;
    });
  };

  const addCompetitorWin = (competitorId: 'calabaza-a' | 'ataud' | 'calabaza-b', duelTitle?: string) => {
    playBellToll();
    setScoreboard((prev) => {
      const currentCompCount = prev.competitors[competitorId] || 0;
      const next: ScoreboardState = {
        ...prev,
        competitors: {
          ...prev.competitors,
          [competitorId]: currentCompCount + 1,
        },
        currentStreak: 0,
        lastWinner: competitorId,
        history: [
          ...prev.history,
          {
            id: String(Date.now()),
            timestamp: Date.now(),
            duelTitle: duelTitle || 'Duelo Comercial',
            winner: 'competitor' as const,
            competitorId,
          },
        ].slice(-20),
      };
      return next;
    });
  };

  const resetScores = () => {
    const fresh: ScoreboardState = {
      claro: 0,
      competitors: {
        'calabaza-a': 0,
        'ataud': 0,
        'calabaza-b': 0,
      },
      currentStreak: 0,
      bestStreak: 0,
      lastWinner: null,
      history: [],
    };
    setScoreboard(fresh);
    saveScoreboard(fresh);
  };

  const resetCompetitorsScores = () => {
    setScoreboard((prev) => {
      const updated: ScoreboardState = {
        ...prev,
        competitors: {
          'calabaza-a': 0,
          'ataud': 0,
          'calabaza-b': 0,
        },
      };
      saveScoreboard(updated);
      return updated;
    });
  };

  const totalCompetitorWins =
    scoreboard.competitors['calabaza-a'] +
    scoreboard.competitors['ataud'] +
    scoreboard.competitors['calabaza-b'];

  const totalBattles = scoreboard.claro + totalCompetitorWins;
  const claroWinRate = totalBattles > 0 ? Math.round((scoreboard.claro / totalBattles) * 100) : 0;

  return (
    <ScoreboardContext.Provider
      value={{
        scoreboard,
        addClaroWin,
        addCompetitorWin,
        resetScores,
        resetCompetitorsScores,
        totalBattles,
        totalCompetitorWins,
        claroWinRate,
      }}
    >
      {children}
    </ScoreboardContext.Provider>
  );
};

export function useScoreboard(): ScoreboardContextType {
  const ctx = useContext(ScoreboardContext);
  if (!ctx) {
    throw new Error('useScoreboard must be used within a ScoreboardProvider');
  }
  return ctx;
}
