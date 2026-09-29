/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ScoreboardProvider } from './context/ScoreboardContext';
import { syncService } from './services/firebaseSync';
import { CitySession, DuelCardItem } from './types/duelOctober';

// Ambientación y Pantallas
import { HalloweenFrame } from './components/HalloweenFrame';
import { SplashScreen } from './components/SplashScreen';
import { TrainerHomeView } from './components/TrainerHomeView';
import { TrainerSessionsView } from './components/TrainerSessionsView';
import { MysteryDoorsView } from './components/MysteryDoorsView';
import { TarotExperience } from './components/TarotExperience';

// Modales Funcionales
import { SoundControlModal } from './components/SoundControlModal';
import { EditActivityModal } from './components/EditActivityModal';
import { FirebaseGuideModal } from './components/FirebaseGuideModal';
import { ExportModal } from './components/ExportModal';

// Íconos
import { 
  Volume2, Edit3, Download, DoorOpen, Home, Smartphone, Sparkles, Flame 
} from 'lucide-react';

export default function App() {
  // Pantalla de carga inicial
  const [showSplash, setShowSplash] = useState(true);

  // Navegación de vistas (Solo la experiencia pura del Duelo)
  const [currentView, setCurrentView] = useState<'home' | 'tarot' | 'sessions' | 'activity_doors'>('home');
  const [activeSession, setActiveSession] = useState<CitySession | null>(null);

  // Datos sincronizados (Firebase en tiempo real o LocalStorage)
  const [sessions, setSessions] = useState<CitySession[]>(() => syncService.getSessions());
  const [duelCards, setDuelCards] = useState<DuelCardItem[]>(() => syncService.getCards());
  const [isFirebaseActive, setIsFirebaseActive] = useState<boolean>(() => syncService.isConnected());

  // Estados de Modales
  const [isSoundModalOpen, setIsSoundModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Audio y Sonido
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(0.75);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [customSoundUrl, setCustomSoundUrl] = useState<string | null>(null);
  const [customSoundName, setCustomSoundName] = useState<string | null>(null);

  // PWA Install Prompt Event
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installedPwa, setInstalledPwa] = useState(false);

  // 1. Suscripción a Firebase / Almacenamiento Local
  useEffect(() => {
    const unsubSessions = syncService.subscribeToSessions((updatedSessions) => {
      setSessions(updatedSessions);
      if (activeSession) {
        const found = updatedSessions.find(s => s.id === activeSession.id);
        if (found) setActiveSession(found);
      }
    });

    const unsubCards = syncService.subscribeToCards((updatedCards) => {
      setDuelCards(updatedCards);
    });

    setIsFirebaseActive(syncService.isConnected());

    return () => {
      unsubSessions();
      unsubCards();
    };
  }, [activeSession]);

  // 2. Detección de Parámetro URL de Sesión (?sesion=Cartagena o ?session=1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionQuery = params.get('sesion') || params.get('session');

    if (sessionQuery) {
      const allSessions = syncService.getSessions();
      const matched = allSessions.find(
        s => s.city.toLowerCase() === sessionQuery.toLowerCase() ||
             s.id.toLowerCase() === sessionQuery.toLowerCase()
      );

      if (matched) {
        setActiveSession(matched);
        setCurrentView('activity_doors');
        syncService.setSessionStatus(matched.id, 'active');
      }
    }

    // Escuchar evento PWA beforeinstallprompt
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // 3. Control de Audio
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTogglePlaySound = () => {
    if (!audioRef.current) return;

    if (isPlayingSound) {
      audioRef.current.pause();
      setIsPlayingSound(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingSound(true);
      }).catch((e) => {
        console.warn('Reproducción de audio sujeta a interacción:', e);
      });
    }
  };

  const handleUploadCustomSound = (audioUrl: string, name: string) => {
    setCustomSoundUrl(audioUrl);
    setCustomSoundName(name);
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().then(() => setIsPlayingSound(true)).catch(() => {});
    }
  };

  const handleRemoveCustomSound = () => {
    setCustomSoundUrl(null);
    setCustomSoundName(null);
    if (audioRef.current) {
      audioRef.current.src = './halloween-theme.mp3';
      audioRef.current.pause();
      setIsPlayingSound(false);
    }
  };

  // 4. Cambios de Estado de Sesiones
  const handleUpdateSessionStatus = (sessionId: string, status: 'active' | 'closed') => {
    syncService.setSessionStatus(sessionId, status);
  };

  // 5. Guardado de Tarjetas Editadas
  const handleSaveCards = (newCards: DuelCardItem[]) => {
    syncService.saveCards(newCards);
    setDuelCards([...newCards]);
  };

  // 6. Instalación PWA
  const handleInstallPwa = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setInstalledPwa(true);
        }
        setDeferredPrompt(null);
      });
    } else {
      setIsExportModalOpen(true);
    }
  };

  return (
    <ScoreboardProvider>
      {/* Pantalla de carga Splash inicial */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Marco Gótico Halloween Oficial */}
      <HalloweenFrame>
        {/* Elemento de audio en segundo plano */}
        <audio
          ref={audioRef}
          src={customSoundUrl || './halloween-theme.mp3'}
          loop
          preload="auto"
          onEnded={() => setIsPlayingSound(false)}
        />

        {/* HEADER LIMPIO Y PROFESIONAL */}
        <header className="border-b border-[#ff7a29]/30 bg-[#150a24]/90 backdrop-blur-md sticky top-0 z-40 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              {/* Logo e Identidad Visual del Duelo */}
              <div 
                className="flex items-center gap-3 cursor-pointer select-none"
                onClick={() => setCurrentView('home')}
                title="Ir al inicio de la actividad"
              >
                <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e2001a] via-[#1f1033] to-[#ff7a29] p-[1.5px] shadow-[0_0_20px_rgba(226,0,26,0.4)]">
                  <div className="w-full h-full bg-[#150a24] rounded-[14px] flex items-center justify-center text-xl">
                    🎃
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#ff5a6a] font-bold bg-[#e2001a]/15 px-2 py-0.5 rounded border border-[#e2001a]/30">
                      Capacitación Comercial
                    </span>
                    <span className="text-[10px] text-[#ff7a29] font-medium flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3" /> Claro
                    </span>
                  </div>
                  <h1 className="text-base sm:text-lg font-cinzel font-black text-white tracking-wide">
                    DUELO DE OFERTAS DE HALLOWEEN
                  </h1>
                </div>
              </div>

              {/* Botones de Navegación Directa de la Actividad */}
              <div className="flex items-center gap-1.5 p-1 bg-[#1f1033]/90 rounded-xl border border-white/10 flex-wrap justify-center">
                <button
                  onClick={() => setCurrentView('home')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold uppercase transition-all cursor-pointer ${
                    currentView === 'home'
                      ? 'bg-white/15 text-white shadow-sm'
                      : 'text-[#f3ead3]/70 hover:text-white'
                  }`}
                >
                  <Home className="w-3.5 h-3.5 text-orange-400" />
                  <span>Inicio</span>
                </button>

                {/* BOTÓN EXPERIENCIA 3 CARTAS TAROT (VIDEOBEAM) */}
                <button
                  onClick={() => setCurrentView('tarot')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-bold uppercase transition-all cursor-pointer border ${
                    currentView === 'tarot'
                      ? 'bg-gradient-to-r from-[#ffd700] via-[#ff7a29] to-[#e2001a] text-black border-yellow-300 shadow-[0_0_20px_rgba(255,215,0,0.6)] font-black'
                      : 'text-[#ffd700] border-[#ffd700]/30 hover:border-[#ffd700] hover:bg-yellow-400/10'
                  }`}
                  title="Experiencia de 3 Cartas Tarot para Videobeam"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>3 Cartas Tarot</span>
                </button>

                <button
                  onClick={() => setCurrentView('sessions')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold uppercase transition-all cursor-pointer ${
                    currentView === 'sessions' || currentView === 'activity_doors'
                      ? 'bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] text-white shadow-[0_0_15px_rgba(226,0,26,0.5)]'
                      : 'text-[#f3ead3]/70 hover:text-white'
                  }`}
                >
                  <DoorOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>Sesiones</span>
                </button>

                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold uppercase text-[#f3ead3]/70 hover:text-white transition-all cursor-pointer"
                  title="Editar tarjetas de duelo"
                >
                  <Edit3 className="w-3.5 h-3.5 text-orange-400" />
                  <span className="hidden sm:inline">Editar</span>
                </button>

                <button
                  onClick={() => setIsSoundModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold uppercase text-[#f3ead3]/70 hover:text-white transition-all cursor-pointer"
                  title="Ajustes de Sonido"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingSound ? 'text-emerald-400 animate-pulse' : 'text-purple-400'}`} />
                  <span className="hidden sm:inline">Sonido</span>
                </button>
              </div>

              {/* Botón Instalar PWA & Exportar */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleInstallPwa}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#f3ead3] font-cinzel font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  title="Instalar como Progressive Web App"
                >
                  <Smartphone className="w-3.5 h-3.5 text-orange-400" />
                  <span className="hidden sm:inline">Instalar App</span>
                </button>

                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ff7a29] to-[#d95e14] hover:brightness-110 text-white font-cinzel font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer transition-all border border-white/20 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Exportar</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1">
          {/* Vista 1: Pantalla Inicial del Formador */}
          {currentView === 'home' && (
            <TrainerHomeView
              onOpenActivity={() => setCurrentView('sessions')}
              onOpenEditActivity={() => setIsEditModalOpen(true)}
              onOpenSound={() => setIsSoundModalOpen(true)}
              onOpenExport={() => setIsExportModalOpen(true)}
              onOpenFirebase={() => setIsFirebaseModalOpen(true)}
              isFirebaseActive={isFirebaseActive}
              onInstallPwa={handleInstallPwa}
              onOpenTarot={() => setCurrentView('tarot')}
            />
          )}

          {/* Vista 2: Experiencia Cartas Tarot (Modo Proyección & Videobeam) */}
          {currentView === 'tarot' && (
            <TarotExperience cards={duelCards} onBackToHome={() => setCurrentView('home')} />
          )}

          {/* Vista 3: Pantalla de Sesiones (Barranquilla, Santa Marta, Cartagena, Montería, Virtual) */}
          {currentView === 'sessions' && (
            <TrainerSessionsView
              sessions={sessions}
              onSelectSession={(session) => {
                setActiveSession(session);
                setCurrentView('activity_doors');
              }}
              onUpdateSessionStatus={handleUpdateSessionStatus}
              onBackToHome={() => setCurrentView('home')}
            />
          )}

          {/* Vista 3: Actividad Puertas Misteriosas */}
          {currentView === 'activity_doors' && activeSession && (
            <MysteryDoorsView
              session={activeSession}
              cards={duelCards}
              onExit={() => setCurrentView('sessions')}
              onResetSessionStatus={(newStatus) => {
                handleUpdateSessionStatus(activeSession.id, newStatus);
              }}
            />
          )}
        </main>

        {/* MODAL: CONTROL DE SONIDO */}
        <SoundControlModal
          isOpen={isSoundModalOpen}
          onClose={() => setIsSoundModalOpen(false)}
          currentVolume={volume}
          onVolumeChange={handleVolumeChange}
          onUploadCustomSound={handleUploadCustomSound}
          onRemoveCustomSound={handleRemoveCustomSound}
          customSoundName={customSoundName}
          isPlaying={isPlayingSound}
          onTogglePlay={handleTogglePlaySound}
        />

        {/* MODAL: EDITAR ACTIVIDAD (TARJETAS DE DUELO) */}
        <EditActivityModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          cards={duelCards}
          onSaveCards={handleSaveCards}
          isFirebaseActive={isFirebaseActive}
        />

        {/* MODAL: GUÍA Y CONFIGURACIÓN FIREBASE */}
        <FirebaseGuideModal
          isOpen={isFirebaseModalOpen}
          onClose={() => setIsFirebaseModalOpen(false)}
          isFirebaseActive={isFirebaseActive}
          onRefreshStatus={() => setIsFirebaseActive(syncService.isConnected())}
        />

        {/* MODAL: EXPORTAR Y GITHUB PAGES */}
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          currentVolume={volume}
          customSoundName={customSoundName}
        />

        {/* FOOTER LIMPIO */}
        <footer className="border-t border-white/10 bg-[#0f071a]/95 py-5 px-4 text-xs text-[#f3ead3]/60 relative z-30">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e2001a]" />
              <span className="font-cinzel font-bold text-[#f3ead3]">
                Duelo de Ofertas de Halloween • Claro Capacitación Comercial
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="text-emerald-400">● PWA Autónoma</span>
              <span>•</span>
              <button
                onClick={() => setIsFirebaseModalOpen(true)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {isFirebaseActive ? '🟢 Sincronización Activa' : '🟡 Modo Local Offline'}
              </button>
            </div>
          </div>
        </footer>
      </HalloweenFrame>
    </ScoreboardProvider>
  );
}
