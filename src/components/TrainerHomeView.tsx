import React from 'react';
import { 
  Sparkles, DoorOpen, Edit3, Volume2, Download, Flame, 
  Smartphone, Shield, Check, Ghost, ArrowRight 
} from 'lucide-react';

interface TrainerHomeViewProps {
  onOpenActivity: () => void;
  onOpenEditActivity: () => void;
  onOpenSound: () => void;
  onOpenExport: () => void;
  onOpenFirebase: () => void;
  isFirebaseActive: boolean;
  onInstallPwa: () => void;
  onOpenTarot: () => void;
}

export function TrainerHomeView({
  onOpenActivity,
  onOpenEditActivity,
  onOpenSound,
  onOpenExport,
  onOpenFirebase,
  isFirebaseActive,
  onInstallPwa,
  onOpenTarot
}: TrainerHomeViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 animate-fade-in text-[#f3ead3]">
      {/* TARJETA HERO AMBIENTADA DE HALLOWEEN */}
      <div 
        className="relative bg-gradient-to-b from-[#25103d] via-[#1a0a2b] to-[#120520] border-2 border-[#ff7a29]/60 rounded-3xl p-6 sm:p-10 text-center mb-10 overflow-hidden shadow-[0_0_60px_rgba(255,122,41,0.25)]"
        style={{
          boxShadow: '0 0 50px rgba(226, 0, 26, 0.25), inset 0 0 35px rgba(255, 122, 41, 0.12)'
        }}
      >
        {/* Decoración gótica: luna, murciélagos, telarañas */}
        <div className="absolute top-3 left-4 text-2xl opacity-60">🕸️</div>
        <div className="absolute top-3 right-4 text-2xl opacity-60">🕸️</div>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-center items-center gap-3 text-3xl sm:text-4xl mb-3 tracking-widest">
          <span>🌕</span>
          <span>🦇</span>
          <span>🎃</span>
          <span>👻</span>
          <span>🏰</span>
        </div>

        <span className="text-[11px] font-mono tracking-widest text-[#ffaa40] uppercase font-bold bg-black/40 px-3 py-1 rounded-full border border-[#ffaa40]/30 inline-block mb-3">
          Claro Colombia • Formación & Capacitación Comercial
        </span>

        <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wide text-shadow drop-shadow-[0_0_25px_rgba(255,122,41,0.6)] mb-3">
          Duelo de Ofertas de Halloween – Octubre
        </h1>

        <p className="text-sm sm:text-base text-[#f3ead3]/80 max-w-2xl mx-auto font-light leading-relaxed mb-6">
          Plataforma oficial para formadores y asesores: simulación de duelos contra ofertas de competidores y dinámicas de <strong>Puertas Misteriosas</strong> con sincronización en tiempo real.
        </p>

        {/* Badges de estado rápido */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <button
            onClick={onOpenFirebase}
            className={`px-3 py-1.5 rounded-full font-mono flex items-center gap-1.5 transition-all cursor-pointer border ${
              isFirebaseActive
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-black/50 text-[#ffaa40] border-orange-500/40 hover:border-orange-500'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{isFirebaseActive ? 'Firebase: Conectado' : 'Firebase: Configurar Sincronización'}</span>
          </button>

          <button
            onClick={onInstallPwa}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#f3ead3] font-mono flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-orange-400" />
            <span>PWA Instalable</span>
          </button>

          <button
            onClick={onOpenExport}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-600/40 to-red-600/40 hover:brightness-110 border border-orange-500/40 text-orange-200 font-mono flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-orange-400" />
            <span>Exportar Actividad</span>
          </button>
        </div>
      </div>

      {/* BANNER DESTACADO: MODO PROYECCIÓN VIDEOBEAM (3 CARTAS TAROT) */}
      <div 
        onClick={onOpenTarot}
        className="mb-10 bg-gradient-to-r from-[#2a0e2d] via-[#1a0820] to-[#25103d] border-2 border-[#ffd700]/70 hover:border-[#ffd700] rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer shadow-[0_0_40px_rgba(255,215,0,0.25)] hover:shadow-[0_0_55px_rgba(255,215,0,0.45)] hover:-translate-y-1 transition-all select-none group"
      >
        <div className="flex items-center gap-4 sm:gap-6 text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#ffd700] via-[#ff7a29] to-[#e2001a] p-1 shadow-lg shrink-0 group-hover:scale-110 transition-transform flex items-center justify-center text-3xl sm:text-4xl">
            🎴
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-xs font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-[#ffd700] text-black tracking-wider">
                ★ RECOMENDADO PARA PROYECCIÓN
              </span>
              <span className="text-xs text-[#ffd700] font-cinzel font-bold hidden sm:inline">
                • Pantalla Grande & Videobeam
              </span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-black text-white">
              Experiencia de 3 Cartas Tarot: Descubre la Carta Ganadora
            </h3>
            <p className="text-xs sm:text-sm text-[#f3ead3]/80 mt-1 max-w-2xl leading-relaxed">
              Compara las ofertas de los competidores (Plan Brujo, Sepulcro, Sombras) con animación 3D y revela con impacto la <strong>Carta Fantasma de Claro</strong> con tipografía gigante de alta visibilidad.
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <div className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] text-white font-cinzel text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(226,0,26,0.6)] group-hover:brightness-110">
            <span>Iniciar Modo Tarot</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* SECCIÓN PRINCIPAL: LOS 3 BOTONES INDEPENDIENTES DEL FORMADOR */}
      <div className="mb-12">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ffaa40]">
            Panel de Control del Formador
          </span>
          <h2 className="font-cinzel text-xl sm:text-3xl font-black text-white">
            Selecciona una Acción Principal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BOTÓN 1: ACTIVIDAD */}
          <div
            onClick={onOpenActivity}
            className="group bg-gradient-to-b from-[#2a0e2d] via-[#1a0820] to-[#120417] border-2 border-red-500/60 hover:border-red-400 rounded-3xl p-7 flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(226,0,26,0.25)] hover:shadow-[0_20px_50px_rgba(226,0,26,0.45)] select-none relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#e2001a] to-[#ff5a6a] flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <DoorOpen className="w-10 h-10 text-white" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-300 font-bold bg-red-950/80 px-2.5 py-0.5 rounded-full border border-red-500/30 inline-block mb-2">
                5 Sesiones en Paralelo
              </span>
              <h3 className="font-cinzel text-2xl font-black text-white mb-2 group-hover:text-red-300 transition-colors">
                Actividad
              </h3>
              <p className="text-xs text-[#f3ead3]/70 leading-relaxed mb-6">
                Dirige a la pantalla <strong>"Sesiones"</strong> con Barranquilla, Santa Marta, Cartagena, Montería y Virtual. Controla el estado Activo/Cerrado y comparte el enlace directo PWA.
              </p>
            </div>

            <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] text-white font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
              <span>Ingresar a Sesiones</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* BOTÓN 2: EDITAR ACTIVIDAD */}
          <div
            onClick={onOpenEditActivity}
            className="group bg-gradient-to-b from-[#2a1708] via-[#1a0f04] to-[#120a02] border-2 border-orange-500/50 hover:border-[#ff7a29] rounded-3xl p-7 flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(255,122,41,0.2)] hover:shadow-[0_20px_50px_rgba(255,122,41,0.4)] select-none relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#ff7a29] to-[#d95e14] flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <Edit3 className="w-10 h-10 text-white" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffaa40] font-bold bg-orange-950/80 px-2.5 py-0.5 rounded-full border border-orange-500/30 inline-block mb-2">
                Editor Comercial
              </span>
              <h3 className="font-cinzel text-2xl font-black text-white mb-2 group-hover:text-orange-300 transition-colors">
                Editar Actividad
              </h3>
              <p className="text-xs text-[#f3ead3]/70 leading-relaxed mb-6">
                Modifica el texto dentro de cada tarjeta del duelo (<em>Competidor Plan Brujo VS Fantasma Claro</em>), agrega nuevas tarjetas personalizadas y guarda los cambios en Firebase.
              </p>
            </div>

            <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff7a29] to-[#d95e14] text-white font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
              <span>Abrir Editor de Tarjetas</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* BOTÓN 3: SONIDO */}
          <div
            onClick={onOpenSound}
            className="group bg-gradient-to-b from-[#1b1035] via-[#120a24] to-[#0a0515] border-2 border-purple-500/50 hover:border-purple-400 rounded-3xl p-7 flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(168,85,247,0.2)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.35)] select-none relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <Volume2 className="w-10 h-10 text-white" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300 font-bold bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-500/30 inline-block mb-2">
                Efectos & Música
              </span>
              <h3 className="font-cinzel text-2xl font-black text-white mb-2 group-hover:text-purple-300 transition-colors">
                Sonido
              </h3>
              <p className="text-xs text-[#f3ead3]/70 leading-relaxed mb-6">
                Anexa tus archivos de audio (.mp3), ajusta el volumen con el deslizador interactivo, y prueba, detén o retira la música tenebrosa de ambientación.
              </p>
            </div>

            <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-cinzel text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
              <span>Configurar Sonido</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* RESUMEN DE CARACTERÍSTICAS COMERCIALES */}
      <div className="bg-[#150a24]/80 border border-white/10 rounded-2xl p-6 text-xs text-[#f3ead3]/70 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#e2001a]" />
          <span>Aplicación Autónoma PWA: <strong className="text-[#ffaa40]">Duelo de Ofertas de Halloween</strong></span>
        </div>
        <div className="flex items-center gap-4">
          <span>✓ Funciona sin conexión (Offline)</span>
          <span>✓ Compatible con celular, tableta y PC</span>
        </div>
      </div>
    </div>
  );
}
