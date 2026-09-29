export interface ScoreboardState {
  claro: number;
  competitors: {
    'calabaza-a': number; // Competidor 1
    'ataud': number;      // Competidor 2
    'calabaza-b': number; // Competidor 3
  };
  currentStreak: number;
  bestStreak: number;
  lastWinner: 'claro' | 'calabaza-a' | 'ataud' | 'calabaza-b' | null;
  history: Array<{
    id: string;
    timestamp: number;
    duelTitle: string;
    winner: 'claro' | 'competitor';
    competitorId: 'calabaza-a' | 'ataud' | 'calabaza-b';
  }>;
}

export const INITIAL_SCOREBOARD: ScoreboardState = {
  claro: 5,
  competitors: {
    'calabaza-a': 1,
    'ataud': 2,
    'calabaza-b': 1,
  },
  currentStreak: 3,
  bestStreak: 5,
  lastWinner: 'claro',
  history: [],
};

const STORAGE_KEY = 'halloween_duel_scoreboard_v1';

export function loadScoreboard(): ScoreboardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_SCOREBOARD;
    const parsed = JSON.parse(raw);
    return {
      claro: typeof parsed.claro === 'number' ? parsed.claro : INITIAL_SCOREBOARD.claro,
      competitors: {
        'calabaza-a': typeof parsed.competitors?.['calabaza-a'] === 'number' ? parsed.competitors['calabaza-a'] : 0,
        'ataud': typeof parsed.competitors?.['ataud'] === 'number' ? parsed.competitors['ataud'] : 0,
        'calabaza-b': typeof parsed.competitors?.['calabaza-b'] === 'number' ? parsed.competitors['calabaza-b'] : 0,
      },
      currentStreak: typeof parsed.currentStreak === 'number' ? parsed.currentStreak : 0,
      bestStreak: typeof parsed.bestStreak === 'number' ? parsed.bestStreak : 0,
      lastWinner: parsed.lastWinner || null,
      history: Array.isArray(parsed.history) ? parsed.history.slice(-20) : [],
    };
  } catch (e) {
    console.warn('Failed to load scoreboard from localStorage', e);
    return INITIAL_SCOREBOARD;
  }
}

export function saveScoreboard(state: ScoreboardState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save scoreboard to localStorage', e);
  }
}
