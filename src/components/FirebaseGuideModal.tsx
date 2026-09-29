import React, { useState, useEffect } from 'react';
import { X, Flame, Shield, Check, Copy, ExternalLink, RefreshCw, KeyRound, AlertTriangle } from 'lucide-react';
import { syncService, FirebaseConfigObject } from '../services/firebaseSync';

interface FirebaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFirebaseActive: boolean;
  onRefreshStatus: () => void;
}

export function FirebaseGuideModal({
  isOpen,
  onClose,
  isFirebaseActive,
  onRefreshStatus
}: FirebaseGuideModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [authDomain, setAuthDomain] = useState('');
  const [projectId, setProjectId] = useState('');
  const [storageBucket, setStorageBucket] = useState('');
  const [appId, setAppId] = useState('');
  const [databaseURL, setDatabaseURL] = useState('');
  const [copiedRules, setCopiedRules] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const stored = syncService.getStoredFirebaseConfig();
      if (stored) {
        setApiKey(stored.apiKey || '');
        setAuthDomain(stored.authDomain || '');
        setProjectId(stored.projectId || '');
        setStorageBucket(stored.storageBucket || '');
        setAppId(stored.appId || '');
        setDatabaseURL(stored.databaseURL || '');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyRules = () => {
    const rulesText = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;
    navigator.clipboard.writeText(rulesText);
    setCopiedRules(true);
    setTimeout(() => setCopiedRules(false), 3000);
  };

  const handleSaveCredentials = () => {
    if (!apiKey || !projectId) {
      alert('Por favor ingresa al menos el apiKey y el projectId de tu proyecto Firebase.');
      return;
    }

    const config: FirebaseConfigObject = {
      apiKey,
      authDomain: authDomain || `${projectId}.firebaseapp.com`,
      projectId,
      storageBucket: storageBucket || `${projectId}.appspot.com`,
      appId: appId || `1:${Date.now()}:web:app`,
      databaseURL: databaseURL || `https://${projectId}-default-rtdb.firebaseio.com`
    };

    const success = syncService.saveFirebaseConfig(config);
    if (success) {
      setSaveMessage('¡Conectado exitosamente con Firebase! Sincronización en tiempo real habilitada.');
      onRefreshStatus();
      setTimeout(() => setSaveMessage(null), 4000);
    } else {
      setSaveMessage('Credenciales guardadas. Si el proyecto tiene reglas abiertas, se sincronizará automáticamente.');
      onRefreshStatus();
      setTimeout(() => setSaveMessage(null), 4000);
    }
  };

  const handleClearCredentials = () => {
    if (confirm('¿Deseas desconectar Firebase y volver a modo almacenamiento local (offline)?')) {
      syncService.clearFirebaseConfig();
      setApiKey('');
      setAuthDomain('');
      setProjectId('');
      setStorageBucket('');
      setAppId('');
      setDatabaseURL('');
      onRefreshStatus();
      setSaveMessage('Desconectado de Firebase. Operando en modo local (localStorage).');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="w-full max-w-3xl bg-[#1f1033] border-2 border-[#ff7a29] rounded-3xl p-5 md:p-7 shadow-[0_0_50px_rgba(255,122,41,0.35)] text-[#f3ead3] relative my-auto max-h-[92vh] flex flex-col"
        style={{
          boxShadow: '0 0 45px rgba(226, 0, 26, 0.35), inset 0 0 25px rgba(255, 122, 41, 0.1)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#f3ead3]/70 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#ff7a29]/30">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#ffaa40] uppercase">Sincronización en Tiempo Real</span>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>Sincronización con Firebase</span>
              {isFirebaseActive ? (
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ● Conectado
                </span>
              ) : (
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ○ Modo Local Offline
                </span>
              )}
            </h2>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 text-sm">
          {/* Mensaje de estado */}
          {saveMessage && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{saveMessage}</span>
            </div>
          )}

          {/* Explicación general */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-[#f3ead3]/80 leading-relaxed">
              Firebase permite que el estado <strong>Activo / Cerrado</strong> de cada sesión (Barranquilla, Santa Marta, Cartagena, Montería, Virtual) y las tarjetas editadas se actualicen <strong>en tiempo real</strong> en todos los dispositivos de los formadores simultáneamente. Si no hay conexión o no tienes Firebase, la app funciona perfectamente con <strong>almacenamiento local</strong>.
            </p>
          </div>

          {/* Guía Paso a Paso */}
          <div className="space-y-3">
            <h3 className="font-cinzel font-bold text-white text-sm flex items-center gap-2 text-[#ffaa40]">
              <span>📖</span> Guía Paso a Paso para Conectar Firebase
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#150a24] border border-white/10 rounded-xl p-3">
                <span className="w-6 h-6 rounded-full bg-[#ff7a29] text-black font-bold text-xs flex items-center justify-center mb-2">1</span>
                <h4 className="font-bold text-xs text-white mb-1">Crea el Proyecto</h4>
                <p className="text-[11px] text-[#f3ead3]/70">
                  Entra a <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-orange-400 underline inline-flex items-center gap-0.5">console.firebase.google.com <ExternalLink className="w-2.5 h-2.5" /></a> y crea un proyecto gratuito.
                </p>
              </div>

              <div className="bg-[#150a24] border border-white/10 rounded-xl p-3">
                <span className="w-6 h-6 rounded-full bg-[#ff7a29] text-black font-bold text-xs flex items-center justify-center mb-2">2</span>
                <h4 className="font-bold text-xs text-white mb-1">Activa Firestore</h4>
                <p className="text-[11px] text-[#f3ead3]/70">
                  En el menú lateral, ve a <strong>Firestore Database</strong> o Realtime Database, dale "Crear base de datos" en modo de prueba.
                </p>
              </div>

              <div className="bg-[#150a24] border border-white/10 rounded-xl p-3">
                <span className="w-6 h-6 rounded-full bg-[#ff7a29] text-black font-bold text-xs flex items-center justify-center mb-2">3</span>
                <h4 className="font-bold text-xs text-white mb-1">Copia Credenciales</h4>
                <p className="text-[11px] text-[#f3ead3]/70">
                  En "Configuración del proyecto", agrega una app Web (&lt;/&gt;) y pega aquí tus credenciales o en <code className="text-orange-300">firebase-config.js</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Reglas de Seguridad */}
          <div className="bg-black/50 border border-amber-500/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Reglas de Seguridad para Firestore (Pestaña "Rules" en Firebase)
              </span>
              <button
                onClick={handleCopyRules}
                className="text-[11px] px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg flex items-center gap-1 cursor-pointer transition-all border border-amber-500/40"
              >
                {copiedRules ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedRules ? '¡Copiado!' : 'Copiar Reglas'}</span>
              </button>
            </div>
            <pre className="bg-[#10071c] p-2.5 rounded-xl font-mono text-[11px] text-amber-200/90 overflow-x-auto border border-white/5">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
            </pre>
          </div>

          {/* Formulario de Credenciales en Pantalla */}
          <div className="bg-[#150a24] border border-white/10 rounded-2xl p-4">
            <h4 className="font-cinzel font-bold text-white text-xs mb-3 flex items-center gap-1.5 text-[#ffaa40]">
              <KeyRound className="w-4 h-4" />
              Pegar Credenciales de tu Proyecto Web Firebase
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#f3ead3]/70 mb-1">API Key (apiKey)</label>
                <input
                  type="text"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#f3ead3]/70 mb-1">Project ID (projectId)</label>
                <input
                  type="text"
                  placeholder="mi-proyecto-claro"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#f3ead3]/70 mb-1">Auth Domain (authDomain)</label>
                <input
                  type="text"
                  placeholder="mi-proyecto.firebaseapp.com"
                  value={authDomain}
                  onChange={(e) => setAuthDomain(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                />
              </div>
              <div>
                <label className="block text-[#f3ead3]/70 mb-1">App ID (appId)</label>
                <input
                  type="text"
                  placeholder="1:123456789:web:abcdef"
                  value={appId}
                  onChange={(e) => setAppId(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-lg px-2.5 py-1.5 text-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-white/10">
              <button
                onClick={handleClearCredentials}
                className="text-xs text-red-400 hover:text-red-300 underline cursor-pointer"
              >
                Limpiar y volver a modo local
              </button>

              <button
                onClick={handleSaveCredentials}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-[#e2001a] hover:brightness-110 text-white font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Guardar y Conectar Firebase</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-[#f3ead3] font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
