import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  collection, 
  enableIndexedDbPersistence 
} from 'firebase/firestore';
import { CitySession, DuelCardItem, FullAppConfigExport } from '../types/duelOctober';
import { INITIAL_CITY_SESSIONS, INITIAL_DUEL_CARDS } from '../data/defaultDuelCards';

const LOCAL_STORAGE_SESSIONS_KEY = 'claro_halloween_octubre_sessions_v2';
const LOCAL_STORAGE_CARDS_KEY = 'claro_halloween_octubre_cards_v2';
const LOCAL_STORAGE_FIREBASE_KEY = 'claro_halloween_firebase_config_v2';
const LOCAL_STORAGE_SOUND_KEY = 'claro_halloween_sound_config_v2';

export interface FirebaseConfigObject {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  databaseURL?: string;
}

class FirebaseSyncService {
  private app: any = null;
  private db: any = null;
  private isConfigured: boolean = false;
  private sessionsListeners: ((sessions: CitySession[]) => void)[] = [];
  private cardsListeners: ((cards: DuelCardItem[]) => void)[] = [];
  private currentSessions: CitySession[] = [];
  private currentCards: DuelCardItem[] = [];

  constructor() {
    this.loadLocalData();
    this.initFirebase();
  }

  private loadLocalData() {
    // Cargar sesiones locales
    try {
      const savedSessions = localStorage.getItem(LOCAL_STORAGE_SESSIONS_KEY);
      if (savedSessions) {
        this.currentSessions = JSON.parse(savedSessions);
      } else {
        this.currentSessions = [...INITIAL_CITY_SESSIONS];
        localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(this.currentSessions));
      }
    } catch (e) {
      this.currentSessions = [...INITIAL_CITY_SESSIONS];
    }

    // Cargar tarjetas locales
    try {
      const savedCards = localStorage.getItem(LOCAL_STORAGE_CARDS_KEY);
      if (savedCards) {
        this.currentCards = JSON.parse(savedCards);
      } else {
        this.currentCards = [...INITIAL_DUEL_CARDS];
        localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(this.currentCards));
      }
    } catch (e) {
      this.currentCards = [...INITIAL_DUEL_CARDS];
    }
  }

  public getStoredFirebaseConfig(): FirebaseConfigObject | null {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FIREBASE_KEY);
      if (saved) return JSON.parse(saved);
      // Check window.FIREBASE_CONFIG if defined in firebase-config.js
      if (typeof window !== 'undefined' && (window as any).FIREBASE_CONFIG) {
        const winConfig = (window as any).FIREBASE_CONFIG;
        if (winConfig.apiKey && winConfig.apiKey !== 'TU_API_KEY_AQUI') {
          return winConfig;
        }
      }
    } catch (e) {
      console.warn('Error al leer credenciales Firebase:', e);
    }
    return null;
  }

  public initFirebase(customConfig?: FirebaseConfigObject): boolean {
    const config = customConfig || this.getStoredFirebaseConfig();
    if (!config || !config.apiKey || config.apiKey === 'TU_API_KEY_AQUI') {
      this.isConfigured = false;
      return false;
    }

    try {
      if (getApps().length === 0) {
        this.app = initializeApp(config);
      } else {
        this.app = getApp();
      }
      this.db = getFirestore(this.app);
      this.isConfigured = true;

      // Escuchar cambios en Firestore en tiempo real
      this.setupFirestoreListeners();
      return true;
    } catch (err) {
      console.warn('Firebase no pudo inicializarse con las credenciales dadas. Operando en modo local.', err);
      this.isConfigured = false;
      return false;
    }
  }

  private setupFirestoreListeners() {
    if (!this.db || !this.isConfigured) return;

    try {
      // 1. Escuchar sesiones
      const sessionsDocRef = doc(this.db, 'claro_halloween', 'sessions_state');
      onSnapshot(sessionsDocRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data && Array.isArray(data.sessions)) {
            this.currentSessions = data.sessions;
            localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(this.currentSessions));
            this.notifySessionsListeners();
          }
        } else {
          // Si no existe, inicializar en Firestore con datos locales
          setDoc(sessionsDocRef, { sessions: this.currentSessions, updatedAt: Date.now() }).catch(() => {});
        }
      }, (err) => {
        console.warn('Aviso de snapshot de sesiones:', err.message);
      });

      // 2. Escuchar tarjetas
      const cardsDocRef = doc(this.db, 'claro_halloween', 'duel_cards');
      onSnapshot(cardsDocRef, (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data && Array.isArray(data.cards)) {
            this.currentCards = data.cards;
            localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(this.currentCards));
            this.notifyCardsListeners();
          }
        } else {
          // Si no existe, inicializar en Firestore con tarjetas locales
          setDoc(cardsDocRef, { cards: this.currentCards, updatedAt: Date.now() }).catch(() => {});
        }
      }, (err) => {
        console.warn('Aviso de snapshot de tarjetas:', err.message);
      });
    } catch (e) {
      console.warn('No fue posible conectar los listeners de Firestore:', e);
    }
  }

  public isConnected(): boolean {
    return this.isConfigured && this.db !== null;
  }

  // Métodos de Sesiones
  public getSessions(): CitySession[] {
    return [...this.currentSessions];
  }

  public async setSessionStatus(cityId: string, status: 'active' | 'closed'): Promise<void> {
    const updated = this.currentSessions.map(s => {
      if (s.id.toLowerCase() === cityId.toLowerCase()) {
        return { ...s, status, updatedAt: Date.now() };
      }
      return s;
    });

    this.currentSessions = updated;
    localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(this.currentSessions));
    this.notifySessionsListeners();

    // Sincronizar con Firestore si está conectado
    if (this.db && this.isConfigured) {
      try {
        const sessionsDocRef = doc(this.db, 'claro_halloween', 'sessions_state');
        await setDoc(sessionsDocRef, { sessions: this.currentSessions, updatedAt: Date.now() }, { merge: true });
      } catch (err) {
        console.warn('Error al sincronizar sesión en Firestore:', err);
      }
    }
  }

  public subscribeToSessions(callback: (sessions: CitySession[]) => void): () => void {
    this.sessionsListeners.push(callback);
    callback([...this.currentSessions]);
    return () => {
      this.sessionsListeners = this.sessionsListeners.filter(cb => cb !== callback);
    };
  }

  private notifySessionsListeners() {
    const copy = [...this.currentSessions];
    this.sessionsListeners.forEach(cb => cb(copy));
  }

  // Métodos de Tarjetas del Duelo
  public getCards(): DuelCardItem[] {
    return [...this.currentCards];
  }

  public async saveCards(cards: DuelCardItem[]): Promise<void> {
    this.currentCards = [...cards];
    localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(this.currentCards));
    this.notifyCardsListeners();

    // Sincronizar con Firestore
    if (this.db && this.isConfigured) {
      try {
        const cardsDocRef = doc(this.db, 'claro_halloween', 'duel_cards');
        await setDoc(cardsDocRef, { cards: this.currentCards, updatedAt: Date.now() }, { merge: true });
      } catch (err) {
        console.warn('Error al guardar tarjetas en Firestore:', err);
      }
    }
  }

  public subscribeToCards(callback: (cards: DuelCardItem[]) => void): () => void {
    this.cardsListeners.push(callback);
    callback([...this.currentCards]);
    return () => {
      this.cardsListeners = this.cardsListeners.filter(cb => cb !== callback);
    };
  }

  private notifyCardsListeners() {
    const copy = [...this.currentCards];
    this.cardsListeners.forEach(cb => cb(copy));
  }

  // Guardar configuración de Firebase ingresada por el usuario
  public saveFirebaseConfig(config: FirebaseConfigObject): boolean {
    try {
      localStorage.setItem(LOCAL_STORAGE_FIREBASE_KEY, JSON.stringify(config));
      return this.initFirebase(config);
    } catch (e) {
      console.error('Error al guardar configuración Firebase:', e);
      return false;
    }
  }

  public clearFirebaseConfig(): void {
    localStorage.removeItem(LOCAL_STORAGE_FIREBASE_KEY);
    this.isConfigured = false;
    this.app = null;
    this.db = null;
  }

  // Exportar e Importar JSON completo
  public exportConfigJson(volume: number = 0.8, soundName: string = 'halloween-theme.mp3'): string {
    const data: FullAppConfigExport = {
      appTitle: 'Duelo de Ofertas de Halloween – Octubre',
      exportDate: new Date().toISOString(),
      repository: 'https://github.com/hcarolinaperez703/DUELO-DE-OFERTAS-DE-HALLOWEEN',
      sessions: this.currentSessions,
      cards: this.currentCards,
      sound: {
        hasCustomSound: false,
        soundName,
        volume
      }
    };
    return JSON.stringify(data, null, 2);
  }

  public importConfigJson(jsonText: string): boolean {
    try {
      const parsed = JSON.parse(jsonText);
      if (Array.isArray(parsed.sessions)) {
        this.currentSessions = parsed.sessions;
        localStorage.setItem(LOCAL_STORAGE_SESSIONS_KEY, JSON.stringify(this.currentSessions));
        this.notifySessionsListeners();
      }
      if (Array.isArray(parsed.cards)) {
        this.currentCards = parsed.cards;
        localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(this.currentCards));
        this.notifyCardsListeners();
      }
      return true;
    } catch (e) {
      console.error('Error al importar JSON:', e);
      return false;
    }
  }
}

export const syncService = new FirebaseSyncService();
