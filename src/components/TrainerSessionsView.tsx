import React, { useState } from 'react';
import { CitySession } from '../types/duelOctober';
import { 
  ArrowLeft, MapPin, ExternalLink, Copy, Check, Share2, 
  Lock, Play, Sparkles, CheckCircle2, AlertCircle, X 
} from 'lucide-react';

interface TrainerSessionsViewProps {
  sessions: CitySession[];
  onSelectSession: (session: CitySession) => void;
  onUpdateSessionStatus: (sessionId: string, status: 'active' | 'closed') => void;
  onBackToHome: () => void;
}

export function TrainerSessionsView({
  sessions,
  onSelectSession,
  onUpdateSessionStatus,
  onBackToHome
}: TrainerSessionsViewProps) {
  const [selectedSessionForModal, setSelectedSessionForModal] = useState<CitySession | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const getSessionPwaUrl = (city: string) => {
    if (typeof window === 'undefined') return '';
    const base = window.location.origin + window.location.pathname;
    return `${base}?sesion=${encodeURIComponent(city)}`;
  };

  const handleOpenSessionModal = (session: CitySession) => {
    setSelectedSessionForModal(session);
  };

  const handleCloseModal = () => {
    setSelectedSessionForModal(null);
  };

  const handleToggleStatusInModal = (newStatus: 'active' | 'closed') => {
    if (!selectedSessionForModal) return;
    onUpdateSessionStatus(selectedSessionForModal.id, newStatus);
    setSelectedSessionForModal({
      ...selectedSessionForModal,
      status: newStatus
    });
  };

  const handleCopyLink = () => {
    if (!selectedSessionForModal) return;
    const url = getSessionPwaUrl(selectedSessionForModal.city);
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  const handleShareLink = () => {
    if (!selectedSessionForModal) return;
    const url = getSessionPwaUrl(selectedSessionForModal.city);
    if (navigator.share) {
      navigator.share({
        title: `Duelo de Ofertas Claro – Sesión ${selectedSessionForModal.city}`,
        text: `Únete a la actividad de Puertas Misteriosas para la sesión de ${selectedSessionForModal.city}`,
        url
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const handleStartSession = () => {
    if (!selectedSessionForModal) return;
    // Mark as active
    onUpdateSessionStatus(selectedSessionForModal.id, 'active');
    const updated = { ...selectedSessionForModal, status: 'active' as const };
    handleCloseModal();
    onSelectSession(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in text-[#f3ead3]">
      {/* Barra Superior */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 border-b border-orange-500/30">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#f3ead3] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-cinzel font-bold uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Inicio Formador</span>
          </button>
          <div>
            <span className="text-xs font-mono tracking-widest text-[#ffaa40] uppercase">Módulo de Coordinación</span>
            <h2 className="font-cinzel text-xl sm:text-3xl font-black text-white">
              Sesiones Simultáneas Disponibles
            </h2>
          </div>
        </div>
      </div>

      <div className="text-center mb-8 max-w-2xl mx-auto">
        <p className="text-sm text-[#f3ead3]/80 leading-relaxed">
          Cada sesión opera de forma <strong>independiente y simultánea</strong>. Haz clic en la ciudad correspondiente para verificar su disponibilidad, enviar el enlace directo a los participantes o iniciar la actividad.
        </p>
      </div>

      {/* Grid de las 5 Sesiones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
        {sessions.map((session) => {
          const isActive = session.status === 'active';

          return (
            <div
              key={session.id}
              onClick={() => handleOpenSessionModal(session)}
              className={`bg-[#1f1033]/90 border-2 rounded-3xl p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-lg select-none relative group ${
                isActive
                  ? 'border-red-500 shadow-[0_0_30px_rgba(226,0,26,0.35)]'
                  : 'border-white/15 hover:border-[#ff7a29] shadow-[0_10px_25px_rgba(0,0,0,0.6)]'
              }`}
            >
              {/* Emblema y Ciudad */}
              <div>
                <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className={`w-6 h-6 ${isActive ? 'text-red-400' : 'text-[#ffaa40]'}`} />
                </div>

                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffaa40] block">
                  Mesa Territorial
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                  {session.city}
                </h3>
              </div>

              {/* Estado Badge */}
              <div className="pt-4 border-t border-white/10 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#f3ead3]/60 font-medium">Estado:</span>
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      isActive
                        ? 'bg-red-950/80 text-red-300 border-red-500/50'
                        : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                    }`}
                  >
                    {isActive ? '🔴 Activo (en uso)' : '🟢 Cerrado (disponible)'}
                  </span>
                </div>

                <button
                  className="w-full mt-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-cinzel font-bold text-[#f3ead3] flex items-center justify-center gap-1 transition-all"
                >
                  <span>Gestionar</span>
                  <ExternalLink className="w-3 h-3 text-[#ffaa40]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DE GESTIÓN DE SESIÓN INDIVIDUAL */}
      {selectedSessionForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-lg bg-[#1f1033] border-2 border-[#ff7a29] rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(255,122,41,0.35)] text-[#f3ead3] relative"
            style={{
              boxShadow: '0 0 45px rgba(226, 0, 26, 0.35), inset 0 0 25px rgba(255, 122, 41, 0.1)'
            }}
          >
            {/* Cerrar modal */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-[#f3ead3]/70 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabecera */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ff7a29]/30">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff7a29] to-[#e2001a] flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#ffaa40] uppercase">Configuración de Sesión</span>
                <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white">
                  Sesión: {selectedSessionForModal.city}
                </h3>
              </div>
            </div>

            {/* Estado: Activo / Cerrado */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-5">
              <label className="block text-xs font-semibold text-[#f3ead3]/80 mb-2">
                Estado actual de la sesión:
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleToggleStatusInModal('closed')}
                  className={`py-2.5 px-3 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border transition-all ${
                    selectedSessionForModal.status === 'closed'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-black/30 text-white/50 border-white/10 hover:border-white/30'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cerrado (disponible)</span>
                </button>

                <button
                  onClick={() => handleToggleStatusInModal('active')}
                  className={`py-2.5 px-3 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer border transition-all ${
                    selectedSessionForModal.status === 'active'
                      ? 'bg-red-950/80 text-red-300 border-red-500 shadow-[0_0_15px_rgba(226,0,26,0.3)]'
                      : 'bg-black/30 text-white/50 border-white/10 hover:border-white/30'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Activo (en uso)</span>
                </button>
              </div>

              {/* Aviso si está activo */}
              {selectedSessionForModal.status === 'active' ? (
                <div className="mt-3 p-2.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>
                    <strong>Sesión ocupada:</strong> Para evitar colisiones, el botón INICIAR está bloqueado. Márcala como <em>Cerrado</em> cuando tu grupo termine.
                  </span>
                </div>
              ) : (
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Sesión libre para iniciar una nueva capacitación comercial.</span>
                </div>
              )}
            </div>

            {/* Enviar Enlace PWA */}
            <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-6">
              <label className="block text-xs font-semibold text-[#f3ead3]/80 mb-1">
                Enviar enlace PWA para esta sesión:
              </label>
              <p className="text-[11px] text-[#f3ead3]/60 mb-2">
                Al abrir este enlace en cualquier celular, tableta o PC, los participantes entran <strong>directamente a la actividad</strong> de {selectedSessionForModal.city}:
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={getSessionPwaUrl(selectedSessionForModal.city)}
                  className="flex-1 bg-black/70 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-orange-300 select-all focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#f3ead3] text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                  title="Copiar enlace"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'Copiado' : 'Copiar'}</span>
                </button>
                <button
                  onClick={handleShareLink}
                  className="px-3 py-2 rounded-xl bg-[#ff7a29]/30 hover:bg-[#ff7a29]/50 text-orange-200 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all border border-[#ff7a29]/40"
                  title="Compartir vía WhatsApp / Navegador"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Compartir</span>
                </button>
              </div>
            </div>

            {/* Botón INICIAR */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[#f3ead3] font-cinzel text-xs font-bold uppercase rounded-xl cursor-pointer"
              >
                Cancelar
              </button>

              <button
                onClick={handleStartSession}
                disabled={selectedSessionForModal.status === 'active'}
                className="px-6 py-2.5 bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] hover:brightness-110 text-white font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow-[0_0_25px_rgba(226,0,26,0.5)] flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {selectedSessionForModal.status === 'active' ? (
                  <>
                    <Lock className="w-4 h-4 text-white/70" />
                    <span>BLOQUEADO (EN USO)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>INICIAR ACTIVIDAD</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
