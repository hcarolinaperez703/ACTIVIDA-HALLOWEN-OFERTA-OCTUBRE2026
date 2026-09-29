import React, { useState, useEffect } from 'react';
import { 
  Play, RotateCcw, Trophy, Clock, Sparkles, Flame, AlertTriangle, 
  Check, Copy, ChevronDown, ChevronUp, Users, ShieldCheck, 
  ExternalLink, Layers, ArrowRight, Zap, Target, Smartphone, Download,
  CheckCircle2, XCircle, Monitor, Radio
} from 'lucide-react';
import { PREDEFINED_COMPETITORS } from '../data/predefinedCompetitors';
import { CARD_ASSETS } from '../data/assetsData';
import { playThunderSound, playBellToll, playClaroVictorySound, playCardClickSound } from '../utils/soundEffects';

// Session State Interface for up to 5 concurrent independent training sessions
export interface DuelSessionState {
  id: number;
  name: string;
  status: 'active' | 'closed'; // 'active' (en uso) | 'closed' (disponible)
  selectedCompetitorId: string; // 'plan-brujo' | 'plan-sepulcro' | 'plan-sombras'
  isCompetitorExpanded: boolean;
  showGhostCounteroffer: boolean;
  claroVictory: boolean;
  timerSeconds: number;
  timerRunning: boolean;
  operatorName: string;
}

const STORAGE_KEY = 'claro_halloween_5_sessions_v1';

const DEFAULT_SESSIONS: DuelSessionState[] = [
  {
    id: 1,
    name: 'Sesión 1: Mesa Alfa',
    status: 'active',
    selectedCompetitorId: 'plan-brujo',
    isCompetitorExpanded: true,
    showGhostCounteroffer: false,
    claroVictory: false,
    timerSeconds: 45,
    timerRunning: false,
    operatorName: 'Asesor 01'
  },
  {
    id: 2,
    name: 'Sesión 2: Mesa Beta',
    status: 'closed',
    selectedCompetitorId: 'plan-sepulcro',
    isCompetitorExpanded: true,
    showGhostCounteroffer: false,
    claroVictory: false,
    timerSeconds: 45,
    timerRunning: false,
    operatorName: 'Asesor 02'
  },
  {
    id: 3,
    name: 'Sesión 3: Mesa Gamma',
    status: 'closed',
    selectedCompetitorId: 'plan-sombras',
    isCompetitorExpanded: true,
    showGhostCounteroffer: false,
    claroVictory: false,
    timerSeconds: 45,
    timerRunning: false,
    operatorName: 'Asesor 03'
  },
  {
    id: 4,
    name: 'Sesión 4: Mesa Delta',
    status: 'closed',
    selectedCompetitorId: 'plan-brujo',
    isCompetitorExpanded: false,
    showGhostCounteroffer: false,
    claroVictory: false,
    timerSeconds: 45,
    timerRunning: false,
    operatorName: 'Asesor 04'
  },
  {
    id: 5,
    name: 'Sesión 5: Mesa Épsilon',
    status: 'closed',
    selectedCompetitorId: 'plan-sepulcro',
    isCompetitorExpanded: false,
    showGhostCounteroffer: false,
    claroVictory: false,
    timerSeconds: 45,
    timerRunning: false,
    operatorName: 'Asesor 05'
  }
];

interface InteractiveActivityPrototypeProps {
  autoOpenSessions?: boolean;
}

export function InteractiveActivityPrototype({ autoOpenSessions = true }: InteractiveActivityPrototypeProps) {
  // Check URL query param or path for dedicated single-session PWA mode (e.g. ?session=2 or /sesion2)
  const queryParams = new URLSearchParams(window.location.search);
  const pathMatch = window.location.pathname.match(/\/sesion([1-5])(\.html)?/i);
  const pathSessionId = pathMatch ? parseInt(pathMatch[1], 10) : null;
  const paramSessionId = pathSessionId || (queryParams.get('session') ? parseInt(queryParams.get('session')!, 10) : null);

  const [sessions, setSessions] = useState<DuelSessionState[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return DEFAULT_SESSIONS;
  });

  const [activeSessionId, setActiveSessionId] = useState<number>(
    paramSessionId && paramSessionId >= 1 && paramSessionId <= 5 ? paramSessionId : 1
  );

  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);
  const [showSessionsModal, setShowSessionsModal] = useState<boolean>(autoOpenSessions);
  const [pwaPromptEvent, setPwaPromptEvent] = useState<any>(null);

  // Sync when prop changes
  useEffect(() => {
    if (autoOpenSessions) {
      setShowSessionsModal(true);
    }
  }, [autoOpenSessions]);

  // 3D Card tilt state
  const [tiltComp, setTiltComp] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tiltClaro, setTiltClaro] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Save sessions to localStorage for real-time multi-window sync across PWAs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      // ignore
    }
  }, [sessions]);

  // Listen to cross-window storage events so multiple PWA windows sync
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setSessions(JSON.parse(e.newValue));
        } catch (err) {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Listen for native beforeinstallprompt for PWA install
  useEffect(() => {
    const handlePrompt = (e: Event) => {
      e.preventDefault();
      setPwaPromptEvent(e);
    };
    window.addEventListener('beforeinstallprompt', handlePrompt);
    return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
  }, []);

  // Current session accessor
  const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // Current competitor data
  const currentCompetitor = PREDEFINED_COMPETITORS.find(
    (c) => c.id === currentSession.selectedCompetitorId
  ) || PREDEFINED_COMPETITORS[0];

  // Corresponding frame assets
  const competitorAsset = CARD_ASSETS.find((a) => {
    if (currentCompetitor.competitorType === 'calabaza-a') return a.id === 'calabaza-a';
    if (currentCompetitor.competitorType === 'ataud') return a.id === 'ataud';
    return a.id === 'calabaza-b';
  }) || CARD_ASSETS[0];

  const claroAsset = CARD_ASSETS.find((a) => a.id === 'fantasma-claro') || CARD_ASSETS[3];

  // Helper to update current session state
  const updateSession = (sessionId: number, updater: Partial<DuelSessionState>) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, ...updater } : s))
    );
  };

  const updateCurrentSession = (updater: Partial<DuelSessionState>) => {
    updateSession(currentSession.id, updater);
  };

  // Toggle Session Status: 'active' (en uso) vs 'closed' (disponible)
  const toggleSessionStatus = (sessionId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playCardClickSound();
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          const nextStatus = s.status === 'active' ? 'closed' : 'active';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  // Open an independent PWA window for a specific session
  const openSessionPWA = (sessionId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playThunderSound();
    
    // Auto-mark session as active when opened in dedicated PWA window
    updateSession(sessionId, { status: 'active' });

    // Use dedicated session URL (e.g. /sesion1.html or ?session=1)
    const pwaUrl = `${window.location.origin}/sesion${sessionId}.html`;
    const windowFeatures = 'menubar=no,location=yes,resizable=yes,scrollbars=yes,status=no,width=1280,height=900';
    window.open(pwaUrl, `PWA_Claro_Sesion_${sessionId}`, windowFeatures);
  };

  // Trigger PWA install prompt
  const handleInstallPWA = async () => {
    if (!pwaPromptEvent) {
      alert('Esta aplicación ya está lista para instalar o ejecutándose en modo PWA. Puedes agregarla a la pantalla de inicio desde el menú de tu navegador.');
      return;
    }
    pwaPromptEvent.prompt();
    const { outcome } = await pwaPromptEvent.userChoice;
    if (outcome === 'accepted') {
      setPwaPromptEvent(null);
    }
  };

  // Timer interval for the active session
  useEffect(() => {
    let interval: any = null;
    if (currentSession.timerRunning && currentSession.timerSeconds > 0) {
      interval = setInterval(() => {
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id === activeSessionId && s.timerRunning && s.timerSeconds > 0) {
              return { ...s, timerSeconds: s.timerSeconds - 1 };
            }
            return s;
          })
        );
      }, 1000);
    } else if (currentSession.timerSeconds === 0 && currentSession.timerRunning) {
      updateCurrentSession({ timerRunning: false });
      playBellToll();
    }
    return () => clearInterval(interval);
  }, [currentSession.timerRunning, currentSession.timerSeconds, activeSessionId]);

  // 3D Tilt handlers
  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>, card: 'comp' | 'claro') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 10;
    if (card === 'comp') setTiltComp({ x: rotateX, y: rotateY });
    else setTiltClaro({ x: rotateX, y: rotateY });
  };

  const handleMouseLeaveCard = (card: 'comp' | 'claro') => {
    if (card === 'comp') setTiltComp({ x: 0, y: 0 });
    else setTiltClaro({ x: 0, y: 0 });
  };

  // Activate animated "Contraoferta Fantasma"
  const handleToggleGhostCounteroffer = () => {
    playThunderSound();
    const nextState = !currentSession.showGhostCounteroffer;
    updateCurrentSession({
      showGhostCounteroffer: nextState,
      claroVictory: nextState ? false : currentSession.claroVictory
    });
  };

  // Select a competitor card
  const handleSelectCompetitor = (competitorId: string) => {
    playCardClickSound();
    updateCurrentSession({
      selectedCompetitorId: competitorId,
      isCompetitorExpanded: true,
      timerRunning: false,
      timerSeconds: 45,
      claroVictory: false
    });
  };

  // Start Duel / Timer
  const handleStartTimer = () => {
    playThunderSound();
    updateCurrentSession({
      timerRunning: true,
      timerSeconds: 45
    });
  };

  // Reset Duel Timer
  const handleResetSession = () => {
    updateCurrentSession({
      timerRunning: false,
      timerSeconds: 45,
      claroVictory: false
    });
  };

  // Trigger Victory Claro
  const handleClaroVictory = () => {
    playClaroVictorySound();
    updateCurrentSession({
      claroVictory: true,
      showGhostCounteroffer: true,
      timerRunning: false
    });
  };

  // Copy Closing Speech
  const handleCopyPitch = () => {
    navigator.clipboard.writeText(currentCompetitor.duelPreset.claro.killerPitch);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2200);
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* ========================================================================= */}
      {/* BARRA SUPERIOR DE CONTROL: BOTÓN "SESIONES" Y MODOS PWA                   */}
      {/* ========================================================================= */}
      <div className="bg-[#1f1033]/90 rounded-2xl border border-white/10 p-4 sm:p-5 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-gradient-to-br from-[#ff7a29] to-[#e2001a] text-white shadow-lg">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-base sm:text-lg font-black text-white">
                  5 Sesiones Simultáneas Independientes
                </h3>
                {paramSessionId && (
                  <span className="px-2 py-0.5 rounded-full bg-[#e2001a] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                    Ventana PWA Sesión #{paramSessionId}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#f3ead3]/70">
                Cada sesión opera con su propio competidor, contraoferta fantasma y estado: <strong className="text-emerald-400">Activo (en uso)</strong> o <strong className="text-amber-400">Cerrado (disponible)</strong>.
              </p>
            </div>
          </div>

          {/* BOTÓN "SESIONES" (Abre panel y lanza PWA para cada sesión) */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              id="btn-sesiones-header"
              onClick={() => setShowSessionsModal(!showSessionsModal)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7a29] via-[#e2001a] to-[#ff5a6a] hover:brightness-110 text-white font-cinzel font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(226,0,26,0.6)] transition-all flex items-center gap-2 cursor-pointer active:scale-95 border border-white/20"
            >
              <Smartphone className="w-4 h-4 text-yellow-300" />
              <span>Sesiones</span>
              <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono text-emerald-300 font-bold border border-emerald-400/40">
                PWA
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSessionsModal ? 'rotate-180' : ''}`} />
            </button>

            {/* Acceso rápido a instalar la PWA si está soportada */}
            <button
              onClick={handleInstallPWA}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#f3ead3] text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Instalar App como PWA en tu dispositivo"
            >
              <Download className="w-3.5 h-3.5 text-[#ff7a29]" />
              <span className="hidden sm:inline">Instalar PWA</span>
            </button>
          </div>
        </div>

        {/* MODAL / BANDEJA DESPLEGABLE: CAMPO 5 SESIONES SIMULTÁNEAS */}
        {showSessionsModal && (
          <div className="pt-4 border-t border-white/10 space-y-3.5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-lg bg-[#e2001a]/20 text-[#ff5a6a] border border-[#e2001a]/40">
                  <Radio className="w-4 h-4 animate-pulse" />
                </span>
                <span className="font-cinzel font-bold text-xs sm:text-sm text-white">
                  Campo: 5 Sesiones Simultáneas (PWA en Paralelo)
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#f3ead3]/70">
                Abre hasta 5 sesiones independientes como PWA standalone
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {sessions.map((sess) => {
                const isSelected = sess.id === activeSessionId;
                const isActiveStatus = sess.status === 'active';

                return (
                  <div
                    key={sess.id}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 transition-all ${
                      isSelected
                        ? 'bg-[#150a24] border-[#ff5a6a] shadow-[0_0_15px_rgba(226,0,26,0.3)]'
                        : 'bg-black/40 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-xs font-bold text-white">
                        Mesa 0{sess.id}
                      </span>
                      {/* Badge de Estado: Activo vs Cerrado */}
                      <button
                        onClick={(e) => toggleSessionStatus(sess.id, e)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider border cursor-pointer transition-all flex items-center gap-1 ${
                          isActiveStatus
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                        }`}
                        title="Haz clic para alternar: Activo (en uso) / Cerrado (disponible)"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isActiveStatus ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                        <span>{isActiveStatus ? 'Activo' : 'Cerrado'}</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-[#f3ead3]/70 truncate">
                      {PREDEFINED_COMPETITORS.find(c => c.id === sess.selectedCompetitorId)?.name.replace('Competidor ', '')}
                    </div>

                    {/* Botones de acción: Seleccionar en esta pestaña o Abrir en PWA Dedicado */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        onClick={() => {
                          playCardClickSound();
                          setActiveSessionId(sess.id);
                        }}
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-bold text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#e2001a] text-white'
                            : 'bg-white/10 hover:bg-white/20 text-[#f3ead3]'
                        }`}
                      >
                        {isSelected ? 'Actual' : 'Ver Aquí'}
                      </button>

                      <button
                        onClick={(e) => openSessionPWA(sess.id, e)}
                        className="px-2 py-1.5 rounded-lg bg-[#ff7a29]/20 hover:bg-[#ff7a29]/30 text-[#ffaa40] hover:text-white border border-[#ff7a29]/40 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
                        title={`Abrir PWA en URL pública /sesion${sess.id}`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>PWA</span>
                      </button>
                    </div>

                    {/* URL pública dedicada */}
                    <div className="pt-1 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[#f3ead3]/50">
                      <span>URL: /sesion{sess.id}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const fullUrl = `${window.location.origin}/sesion${sess.id}.html`;
                          navigator.clipboard.writeText(fullUrl);
                          alert(`¡URL pública copiada!: ${fullUrl}`);
                        }}
                        className="text-[#ffaa40] hover:text-white underline cursor-pointer"
                        title="Copiar URL PWA directa"
                      >
                        copiar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pestañas de Acceso Rápido de Sesiones 1 a 5 */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {sessions.map((sess) => {
            const sessComp = PREDEFINED_COMPETITORS.find((c) => c.id === sess.selectedCompetitorId);
            const isActive = sess.id === activeSessionId;
            const isStatusActive = sess.status === 'active';

            return (
              <div
                key={sess.id}
                onClick={() => {
                  playCardClickSound();
                  setActiveSessionId(sess.id);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-br from-[#e2001a]/40 via-[#1f1033] to-[#ff7a29]/20 border-[#ff5a6a] shadow-[0_0_20px_rgba(226,0,26,0.4)]'
                    : 'bg-black/40 hover:bg-black/60 border-white/10 text-[#f3ead3]/70 hover:text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold font-cinzel mb-1">
                    <span className={isActive ? 'text-white' : 'text-[#f3ead3]/80'}>
                      Mesa 0{sess.id}
                    </span>
                    {/* Indicador de estado Activo / Cerrado */}
                    <span
                      onClick={(e) => toggleSessionStatus(sess.id, e)}
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                        isStatusActive
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      }`}
                      title="Clic para cambiar estado"
                    >
                      {isStatusActive ? 'Activo' : 'Cerrado'}
                    </span>
                  </div>
                  <div className="text-[11px] truncate text-[#ff7a29] font-medium">
                    {sessComp?.name.replace('Competidor ', '')}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#f3ead3]/50 font-mono mt-2 pt-1.5 border-t border-white/5">
                  <span>⏱ {sess.timerSeconds}s</span>
                  {sess.showGhostCounteroffer && (
                    <span className="text-[#ff5a6a] font-bold">👻 Fantasma</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BANDEJA: 3 TARJETAS DE COMPETENCIA DISPONIBLES                           */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h3 className="font-cinzel text-lg sm:text-xl font-black text-[#f3ead3] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#ff7a29]" />
              Tarjetas de Competencia para Duelo
            </h3>
            <p className="text-xs text-[#f3ead3]/70">
              Haz clic sobre cualquiera de las 3 ofertas rivales para desplegar su contenido y analizar la contraoferta Claro correspondiente.
            </p>
          </div>
          <span className="text-xs font-mono text-[#ff7a29] bg-[#ff7a29]/10 px-3 py-1 rounded-full border border-[#ff7a29]/30">
            Nombres Actuales Reales
          </span>
        </div>

        {/* Las 3 Tarjetas de Competencia */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {PREDEFINED_COMPETITORS.map((comp) => {
            const isSelected = comp.id === currentSession.selectedCompetitorId;
            const isExpanded = isSelected && currentSession.isCompetitorExpanded;

            return (
              <div
                key={comp.id}
                onClick={() => handleSelectCompetitor(comp.id)}
                className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between p-4 sm:p-5 relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#1f1033] to-[#150a24] border-[#ff7a29] shadow-[0_0_25px_rgba(255,122,41,0.35)] scale-[1.01]'
                    : 'bg-black/40 hover:bg-black/60 border-white/10 hover:border-white/20 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Header Card */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                      style={{
                        borderColor: `${comp.color}60`,
                        backgroundColor: `${comp.color}20`,
                        color: comp.color
                      }}
                    >
                      {comp.icon} {comp.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isSelected) {
                          updateCurrentSession({ isCompetitorExpanded: !isExpanded });
                        } else {
                          handleSelectCompetitor(comp.id);
                        }
                      }}
                      className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-[#f3ead3]/70 hover:text-white transition-colors"
                      title={isExpanded ? 'Colapsar detalles' : 'Desplegar contenido'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <h4 className="font-cinzel text-lg sm:text-xl font-black text-white">
                    {comp.name}
                  </h4>
                  <div className="text-xs text-[#f3ead3]/80 font-medium mt-0.5">
                    {comp.alias}
                  </div>

                  {/* Precio Principal */}
                  <div className="my-3 py-2 px-3 rounded-xl bg-black/50 border border-white/10 text-center">
                    <div className="font-cinzel text-2xl font-black text-[#ff7a29] glow-text-pumpkin">
                      {comp.duelPreset.competitor.price}
                    </div>
                    <div className="text-xs text-[#f3ead3]/90 font-bold">
                      {comp.duelPreset.competitor.data}
                    </div>
                  </div>
                </div>

                {/* Contenido Desplegable al hacer clic */}
                {isExpanded ? (
                  <div className="space-y-3 pt-2 border-t border-white/10 animate-fadeIn">
                    <div className="text-xs text-[#f3ead3] space-y-1.5 bg-black/40 p-3 rounded-xl border border-white/5">
                      <span className="font-bold text-[11px] uppercase tracking-wider text-[#f3ead3]/70 block mb-1">
                        Contenido del Plan:
                      </span>
                      {comp.duelPreset.competitor.details.map((d, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-red-400 font-extrabold text-sm leading-none shrink-0">✕</span>
                          <span className="leading-snug">{d}</span>
                        </div>
                      ))}
                    </div>

                    {/* Trampa Oculta */}
                    <div className="bg-red-950/60 border border-red-500/50 p-2.5 rounded-xl text-xs text-[#ffd2d6]">
                      <span className="font-extrabold text-red-300 uppercase tracking-wider block mb-0.5 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                        Trampa Oculta / Objeción:
                      </span>
                      <p className="leading-relaxed">{comp.duelPreset.competitor.hiddenTrap}</p>
                    </div>

                    <div className="pt-1 text-center">
                      <span className="text-[11px] font-mono font-bold text-[#ff7a29]">
                        ✓ Tarjeta seleccionada para contraoferta
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 text-center text-xs text-[#f3ead3]/50 flex items-center justify-center gap-1">
                    <span>Clic para desplegar oferta</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTÓN ANIMADO "CONTRAOFERTA FANTASMA" CON MOVIMIENTO                      */}
      {/* ========================================================================= */}
      <div className="flex flex-col items-center justify-center py-4 space-y-3">
        <button
          onClick={handleToggleGhostCounteroffer}
          className={`btn-contraoferta-fantasma px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-cinzel font-black text-sm sm:text-base tracking-widest uppercase transition-all flex items-center gap-3 cursor-pointer border-2 ${
            currentSession.showGhostCounteroffer
              ? 'bg-gradient-to-r from-[#e2001a] via-[#ff5a6a] to-[#e2001a] text-white border-white shadow-[0_0_50px_rgba(226,0,26,0.9)]'
              : 'bg-gradient-to-r from-[#1f1033] via-[#e2001a] to-[#1f1033] text-white border-[#ff5a6a]/60 hover:border-white shadow-[0_0_30px_rgba(226,0,26,0.6)]'
          }`}
        >
          <span className="relative flex h-4 w-4">
            <span className="aura-fantasma absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#ff5a6a]" />
          </span>
          <span className="drop-shadow-md">
            {currentSession.showGhostCounteroffer ? '👻 Contraoferta Fantasma Activada' : '👻 Activar Contraoferta Fantasma'}
          </span>
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
        </button>

        <p className="text-xs text-[#f3ead3]/70 font-mono text-center max-w-md">
          Al activarse, despliega en la Sesión #{currentSession.id} la carta <strong>Fantasma Claro</strong> configurada con la contraoferta ganadora.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* ARENA DE DUELO 3D: CARTA COMPETIDOR VS. FANTASMA CLARO                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch perspective-container">
        
        {/* TARJETA 1: COMPETIDOR ACTIVO */}
        <div className="flex flex-col items-center">
          <div
            onClick={playCardClickSound}
            onMouseMove={(e) => handleMouseMoveCard(e, 'comp')}
            onMouseLeave={() => handleMouseLeaveCard('comp')}
            style={{
              transform: `rotateX(${tiltComp.x}deg) rotateY(${tiltComp.y}deg)`,
            }}
            className={`tarjeta-oferta ${
              currentCompetitor.competitorType === 'ataud' ? 'tarjeta-ataud' : 'tarjeta-calabaza'
            } relative w-full max-w-[490px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/15 bg-[#150a24] cursor-pointer`}
          >
            {/* Top Browser Chrome Bar */}
            <div className="browser-chrome px-4 py-2.5 flex items-center justify-between z-20 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="browser-dot bg-[#ff5f56]" />
                <span className="browser-dot bg-[#ffbd2e]" />
                <span className="browser-dot bg-[#27c93f]" />
              </div>
              <div className="browser-url-bar flex items-center gap-1.5 truncate max-w-[220px]">
                <span className="text-[#ff7a29]">🔒</span>
                <span className="truncate">https://ofertas-competidor.com/{currentCompetitor.id}</span>
              </div>
              <span className="text-xs text-[#f3ead3]/40 font-mono">3D</span>
            </div>

            {/* Background frame asset */}
            <div className="relative flex-1 w-full h-full overflow-hidden p-5 sm:p-7 flex items-center justify-center">
              <img
                src={competitorAsset.imageSrc}
                alt={competitorAsset.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 opacity-80"
              />

              {/* Parallax Content Layer */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between text-center overflow-y-auto layer-3d-front">
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs sm:text-sm uppercase tracking-widest text-[#ff7a29] font-mono font-bold bg-black/60 px-3 py-0.5 rounded-full inline-block border border-[#ff7a29]/30">
                    {currentCompetitor.duelPreset.competitor.weaknessTitle}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl lg:text-3xl font-black text-[#f3ead3] tracking-wide drop-shadow-md">
                    {currentCompetitor.duelPreset.competitor.brandName}
                  </h3>
                  <div className="text-sm sm:text-base font-semibold text-[#f3ead3]/90 bg-black/50 py-0.5 px-2.5 rounded-lg inline-block border border-white/10">
                    {currentCompetitor.duelPreset.competitor.planName}
                  </div>
                </div>

                {/* Price */}
                <div className="my-auto py-2 sm:py-3">
                  <div className="inline-block bg-black/70 backdrop-blur-md px-5 sm:px-7 py-2.5 sm:py-3 rounded-2xl border border-white/20 shadow-xl">
                    <div className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-[#ff7a29] glow-text-pumpkin tracking-tight">
                      {currentCompetitor.duelPreset.competitor.price}
                    </div>
                    <div className="text-sm sm:text-base text-[#f3ead3] font-bold mt-1">
                      {currentCompetitor.duelPreset.competitor.data}
                    </div>
                  </div>

                  <div className="mt-3.5 sm:mt-4 text-left max-w-sm sm:max-w-md mx-auto space-y-2 text-sm sm:text-base text-[#f3ead3] font-medium bg-black/50 p-3.5 rounded-xl border border-white/15 backdrop-blur-sm">
                    {currentCompetitor.duelPreset.competitor.details.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="text-red-400 font-extrabold text-base sm:text-lg leading-none shrink-0">✕</span>
                        <span className="leading-snug text-[#f3ead3]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hidden Trap */}
                <div className="bg-red-950/70 border border-red-500/60 rounded-xl p-3 sm:p-3.5 text-left text-sm backdrop-blur-md shadow-md mt-2">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-red-300 uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Cláusula Oculta / La Objeción:</span>
                  </div>
                  <p className="text-[#f3ead3] text-xs sm:text-sm font-medium leading-relaxed">
                    {currentCompetitor.duelPreset.competitor.hiddenTrap}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA 2: FANTASMA CLARO (Se despliega al presionar "Contraoferta Fantasma") */}
        <div className="flex flex-col items-center">
          {currentSession.showGhostCounteroffer ? (
            <div
              onClick={playCardClickSound}
              onMouseMove={(e) => handleMouseMoveCard(e, 'claro')}
              onMouseLeave={() => handleMouseLeaveCard('claro')}
              style={{
                transform: `rotateX(${tiltClaro.x}deg) rotateY(${tiltClaro.y}deg)`,
              }}
              className={`tarjeta-oferta tarjeta-claro cursor-pointer relative w-full max-w-[490px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-[#e2001a]/40 bg-[#150a24] transition-all duration-300 animate-fadeIn ${
                currentSession.claroVictory ? 'ring-4 ring-[#ff5a6a] shadow-[0_0_60px_rgba(226,0,26,0.9)]' : ''
              }`}
            >
              {/* Top Browser Chrome Bar */}
              <div className="browser-chrome px-4 py-2.5 flex items-center justify-between z-20 shrink-0 border-b border-[#e2001a]/30">
                <div className="flex items-center gap-1.5">
                  <span className="browser-dot bg-[#e2001a]" />
                  <span className="browser-dot bg-[#ffbd2e]" />
                  <span className="browser-dot bg-[#27c93f]" />
                </div>
                <div className="browser-url-bar flex items-center gap-1.5 truncate max-w-[220px] border-[#e2001a]/40 text-white">
                  <span className="text-[#ff5a6a]">🔒</span>
                  <span className="truncate">https://claro.com.co/contraoferta-fantasma</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#ff7a8a]" />
              </div>

              {/* Background frame */}
              <div className="relative flex-1 w-full h-full overflow-hidden p-5 sm:p-7 flex items-center justify-center">
                <img
                  src={claroAsset.imageSrc}
                  alt={claroAsset.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 opacity-85"
                />

                {/* Victory Badge */}
                {currentSession.claroVictory && (
                  <div className="absolute top-4 z-30 animate-bounce bg-[#e2001a] text-white px-5 py-2 rounded-full font-cinzel font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 border-2 border-white/50 layer-3d-badge">
                    <Trophy className="w-5 h-5 text-yellow-300" />
                    <span>¡PROPUESTA CLARO VICTORIOSA!</span>
                  </div>
                )}

                {/* Parallax Content Layer */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between text-center overflow-y-auto layer-3d-front">
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs sm:text-sm uppercase tracking-widest text-[#ff5a6a] font-mono font-bold bg-[#e2001a]/30 border border-[#e2001a]/50 px-3 py-0.5 rounded-full inline-block">
                      {currentCompetitor.duelPreset.claro.advantageTitle}
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#e2001a] animate-ping" />
                      <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide glow-text-claro">
                        FANTASMA CLARO
                      </h3>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#f3ead3] bg-[#e2001a]/35 border border-[#e2001a]/50 py-0.5 px-3 rounded-lg inline-block">
                      {currentCompetitor.duelPreset.claro.planName}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="my-auto py-2 sm:py-3">
                    <div className="inline-block bg-[#1f1033]/90 backdrop-blur-md px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-2xl border border-[#e2001a]/60 shadow-[0_0_30px_rgba(226,0,26,0.45)]">
                      <div className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-white glow-text-claro tracking-tight">
                        {currentCompetitor.duelPreset.claro.price}
                      </div>
                      <div className="text-sm sm:text-base text-[#ff7a8a] font-extrabold mt-1">
                        {currentCompetitor.duelPreset.claro.data}
                      </div>
                    </div>

                    <div className="mt-3.5 sm:mt-4 text-left max-w-sm sm:max-w-md mx-auto space-y-2 text-sm sm:text-base text-[#f3ead3] font-medium bg-black/50 p-3.5 rounded-xl border border-white/15 backdrop-blur-sm">
                      {currentCompetitor.duelPreset.claro.details.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="text-emerald-400 font-extrabold text-base sm:text-lg leading-none shrink-0">✓</span>
                          <span className="leading-snug text-[#f3ead3]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pitch Speech */}
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
                    <p className="text-[#f3ead3] text-xs sm:text-sm font-medium leading-relaxed">
                      {currentCompetitor.duelPreset.claro.killerPitch}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tarjeta Fantasma en Espera */
            <div className="w-full max-w-[490px] aspect-[3/4] rounded-2xl border-2 border-dashed border-[#e2001a]/40 bg-[#1f1033]/40 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#e2001a]/20 border border-[#e2001a]/40 flex items-center justify-center text-3xl animate-pulse">
                👻
              </div>
              <div className="space-y-1">
                <h4 className="font-cinzel text-xl font-bold text-white">
                  Fantasma Claro en Espera
                </h4>
                <p className="text-xs text-[#f3ead3]/70 max-w-xs mx-auto">
                  Presiona el botón animado <strong>"Activar Contraoferta Fantasma"</strong> para revelar el contraataque para {currentCompetitor.name}.
                </p>
              </div>

              <button
                onClick={handleToggleGhostCounteroffer}
                className="px-6 py-2.5 rounded-xl bg-[#e2001a] hover:bg-[#ff5a6a] text-white font-cinzel font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(226,0,26,0.5)] active:scale-95 cursor-pointer"
              >
                Desplegar Fantasma Claro
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CONTROLES DE LA RONDA: CRONÓMETRO Y CIERRE CLARO */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#1f1033]/80 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-xl border border-white/15">
            <Clock className={`w-4 h-4 ${currentSession.timerRunning ? 'text-[#ff7a29] animate-spin' : 'text-[#f3ead3]/60'}`} />
            <span className="text-xs text-[#f3ead3]/80 font-medium">Cronómetro Pitch ({currentSession.name}):</span>
            <span className="font-mono text-base font-bold text-[#ff7a29] w-10 text-center">
              {currentSession.timerSeconds}s
            </span>
          </div>

          <button
            onClick={handleStartTimer}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#ff7a29] hover:bg-[#d95e14] text-white shadow-[0_0_15px_rgba(255,122,41,0.4)] transition-all active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Iniciar 45s</span>
          </button>

          <button
            onClick={handleResetSession}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#f3ead3] transition-colors cursor-pointer"
            title="Reiniciar Cronómetro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleClaroVictory}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-cinzel font-black text-xs sm:text-sm bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] hover:brightness-110 text-white shadow-[0_0_25px_rgba(226,0,26,0.6)] transition-all active:scale-95 cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-yellow-300" />
          <span>¡Cierre Claro en Sesión #{currentSession.id}!</span>
        </button>
      </div>
    </div>
  );
}
