import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Square, Upload, Trash2, X, Music, Check, Sparkles } from 'lucide-react';

interface SoundControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVolume: number;
  onVolumeChange: (volume: number) => void;
  onUploadCustomSound: (audioUrl: string, name: string) => void;
  onRemoveCustomSound: () => void;
  customSoundName?: string | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function SoundControlModal({
  isOpen,
  onClose,
  currentVolume,
  onVolumeChange,
  onUploadCustomSound,
  onRemoveCustomSound,
  customSoundName,
  isPlaying,
  onTogglePlay
}: SoundControlModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUploadCustomSound(url, file.name);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-[#1f1033] border-2 border-[#ff7a29] rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(255,122,41,0.35)] text-[#f3ead3] relative"
        style={{
          boxShadow: '0 0 40px rgba(226, 0, 26, 0.3), inset 0 0 20px rgba(255, 122, 41, 0.15)'
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#f3ead3]/70 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-all cursor-pointer"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ff7a29]/30">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff7a29] to-[#e2001a] flex items-center justify-center shadow-lg">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#ffaa40] uppercase">Módulo de Audio</span>
            <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white">Control de Sonido</h3>
          </div>
        </div>

        {/* Archivo actual */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between text-xs text-[#f3ead3]/70 mb-2">
            <span>Pista de audio actual:</span>
            <span className="font-mono text-[#ffaa40]">
              {customSoundName ? 'Audio Personalizado' : 'Tema Halloween Claro'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎵</span>
            <div className="flex-1 truncate">
              <p className="font-medium text-white truncate text-sm">
                {customSoundName || 'sigmamusicart-halloween-background-music.mp3'}
              </p>
              <p className="text-[11px] text-[#f3ead3]/50">Música de ambientación para la actividad</p>
            </div>
            {customSoundName && (
              <button
                onClick={onRemoveCustomSound}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-xl transition-all cursor-pointer"
                title="Quitar sonido personalizado"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Deslizador de volumen */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="flex items-center gap-2">
              {currentVolume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#ffaa40]" />
              )}
              <span>Volumen de la actividad</span>
            </span>
            <span className="font-mono text-[#ffaa40] font-bold text-sm">
              {Math.round(currentVolume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={currentVolume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-[#ff7a29] transition-all"
          />
          <div className="flex justify-between text-[10px] text-[#f3ead3]/40 mt-1 font-mono">
            <span>0% (Silencio)</span>
            <span>50%</span>
            <span>100% (Máximo)</span>
          </div>
        </div>

        {/* Controles: Probar, Detener y Anexar */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={onTogglePlay}
            className={`py-3 px-4 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4" />
                <span>Detener Sonido</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Probar Sonido</span>
              </>
            )}
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff7a29] to-[#e2001a] hover:brightness-110 text-white font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(255,122,41,0.35)]"
          >
            <Upload className="w-4 h-4" />
            <span>Anexar Archivo</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/mp3,audio/wav,audio/ogg,audio/mpeg"
            className="hidden"
          />
        </div>

        {uploadSuccess && (
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 p-2.5 rounded-xl mb-4 animate-fade-in">
            <Check className="w-4 h-4" />
            <span>¡Archivo de sonido cargado exitosamente!</span>
          </div>
        )}

        {/* Botón cerrar/guardar */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-[#f3ead3] font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all"
          >
            Listo / Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
