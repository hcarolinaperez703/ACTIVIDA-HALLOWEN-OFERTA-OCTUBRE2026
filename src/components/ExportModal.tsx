import React, { useState } from 'react';
import { X, Download, FolderArchive, FileJson, Github, Smartphone, Check, Copy, ExternalLink, HelpCircle } from 'lucide-react';
import { syncService } from '../services/firebaseSync';
import { downloadFullHtmlBundleZip } from '../utils/standaloneBundleGenerator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVolume: number;
  customSoundName?: string | null;
}

export function ExportModal({
  isOpen,
  onClose,
  currentVolume,
  customSoundName
}: ExportModalProps) {
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);
  const [jsonSuccess, setJsonSuccess] = useState(false);
  const [copiedRepo, setCopiedRepo] = useState(false);

  if (!isOpen) return null;

  const handleDownloadJson = () => {
    const jsonStr = syncService.exportConfigJson(currentVolume, customSoundName || 'halloween-theme.mp3');
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `configuracion-halloween-octubre-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setJsonSuccess(true);
    setTimeout(() => setJsonSuccess(false), 3000);
  };

  const handleDownloadZip = async () => {
    setDownloadingZip(true);
    try {
      await downloadFullHtmlBundleZip();
      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 4000);
    } catch (e) {
      console.error('Error al generar ZIP:', e);
      alert('Hubo un inconveniente al comprimir los archivos. Por favor intenta de nuevo.');
    } finally {
      setDownloadingZip(false);
    }
  };

  const handleCopyRepo = () => {
    navigator.clipboard.writeText('https://github.com/hcarolinaperez703/DUELO-DE-OFERTAS-DE-HALLOWEEN');
    setCopiedRepo(true);
    setTimeout(() => setCopiedRepo(false), 3000);
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
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff7a29] to-[#e2001a] flex items-center justify-center shadow-lg">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#ffaa40] uppercase">Despliegue y Distribución</span>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white">
              Exportar Actividad y Publicar en GitHub Pages
            </h2>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 text-sm">
          {/* Tarjetas de Descarga */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Opción 1: ZIP Completo HTML */}
            <div className="bg-[#150a24] border border-orange-500/40 rounded-2xl p-4 flex flex-col justify-between hover:border-orange-500 transition-all shadow-lg">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
                  <FolderArchive className="w-5 h-5" />
                </div>
                <h3 className="font-cinzel font-bold text-base text-white mb-1">
                  Proyecto HTML Completo (ZIP)
                </h3>
                <p className="text-xs text-[#f3ead3]/70 leading-relaxed mb-4">
                  Descarga un archivo <strong>.ZIP</strong> listo con <code>index.html</code>, <code>firebase-config.js</code>, <code>manifest.json</code>, <code>sw.js</code> e íconos. Listo para subir a la raíz de tu repositorio GitHub.
                </p>
              </div>

              <button
                onClick={handleDownloadZip}
                disabled={downloadingZip}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff7a29] to-[#e2001a] hover:brightness-110 text-white font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 transition-all"
              >
                {zipSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>¡ZIP Descargado!</span>
                  </>
                ) : (
                  <>
                    <FolderArchive className={`w-4 h-4 ${downloadingZip ? 'animate-spin' : ''}`} />
                    <span>{downloadingZip ? 'Empaquetando...' : 'Descargar Paquete ZIP'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Opción 2: JSON de Configuración */}
            <div className="bg-[#150a24] border border-purple-500/40 rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500 transition-all shadow-lg">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-3">
                  <FileJson className="w-5 h-5" />
                </div>
                <h3 className="font-cinzel font-bold text-base text-white mb-1">
                  Configuración en JSON
                </h3>
                <p className="text-xs text-[#f3ead3]/70 leading-relaxed mb-4">
                  Descarga únicamente los datos actuales de las <strong>5 sesiones</strong>, todas las <strong>tarjetas editadas</strong> y el volumen de sonido en formato <code>.json</code> para respaldo o importación.
                </p>
              </div>

              <button
                onClick={handleDownloadJson}
                className="w-full py-2.5 rounded-xl bg-purple-700/80 hover:bg-purple-600 text-white font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                {jsonSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>¡JSON Exportado!</span>
                  </>
                ) : (
                  <>
                    <FileJson className="w-4 h-4" />
                    <span>Descargar JSON</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Enlace al Repositorio del Usuario */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Github className="w-5 h-5 text-white" />
                <div>
                  <span className="text-[10px] font-mono text-[#ffaa40] uppercase">Repositorio Oficial Vinculado</span>
                  <p className="font-mono text-xs text-white truncate max-w-md">
                    https://github.com/hcarolinaperez703/DUELO-DE-OFERTAS-DE-HALLOWEEN
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyRepo}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono flex items-center gap-1.5 cursor-pointer text-[#f3ead3]"
                >
                  {copiedRepo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRepo ? 'Copiado' : 'Copiar URL'}</span>
                </button>
                <a
                  href="https://github.com/hcarolinaperez703/DUELO-DE-OFERTAS-DE-HALLOWEEN"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-orange-600/80 hover:bg-orange-500 text-xs font-bold text-white flex items-center gap-1"
                >
                  <span>Abrir GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Instrucciones para Publicar en GitHub Pages */}
          <div className="space-y-3">
            <h4 className="font-cinzel font-bold text-white text-xs uppercase tracking-wider text-[#ffaa40] flex items-center gap-1.5">
              <span>🚀</span> Cómo Publicar Gratis con GitHub Pages
            </h4>

            <ol className="space-y-2 text-xs text-[#f3ead3]/85 list-decimal list-inside bg-[#150a24] p-4 rounded-2xl border border-white/10">
              <li>
                <strong>Descomprime el archivo ZIP descargado:</strong> Obtendrás los archivos listos: <code>index.html</code>, <code>firebase-config.js</code>, <code>manifest.json</code>, <code>sw.js</code> e íconos.
              </li>
              <li>
                <strong>Sube los archivos a la raíz de tu repositorio:</strong> Ingresa a tu repositorio en GitHub y sube los archivos directamente a la rama principal (<code>main</code>).
              </li>
              <li>
                <strong>Activa GitHub Pages:</strong> En tu repositorio, entra a <em>Settings &gt; Pages</em>. En <em>"Build and deployment"</em>, selecciona <em>Source: Deploy from a branch</em>, y elige la rama <code>main</code> y carpeta <code>/ (root)</code>. Haz clic en <em>Save</em>.
              </li>
              <li>
                <strong>¡Tu PWA estará en vivo en minutos!</strong> Tu enlace público mundial será:
                <br />
                <code className="text-orange-300 font-mono text-[11px] block mt-1 bg-black/50 p-1.5 rounded">
                  https://hcarolinaperez703.github.io/DUELO-DE-OFERTAS-DE-HALLOWEEN/
                </code>
              </li>
            </ol>
          </div>

          {/* Instrucciones de Instalación en Celular / Tableta */}
          <div className="bg-[#150a24] p-4 rounded-2xl border border-white/10 space-y-2">
            <h4 className="font-cinzel font-bold text-white text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" />
              Cómo Instalar la PWA en Celulares y Tabletas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#f3ead3]/80">
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <strong className="text-white block mb-1">📱 Android (Chrome / Edge):</strong>
                Abre el enlace en Google Chrome. Toca el botón <em>"Instalar aplicación"</em> en la barra superior o los 3 puntos (⋮) y selecciona <em>"Instalar aplicación"</em> o <em>"Agregar a pantalla principal"</em>.
              </div>
              <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                <strong className="text-white block mb-1">🍏 iPhone / iPad (Safari):</strong>
                Abre el enlace en Safari. Toca el botón de compartir (el cuadro con flecha hacia arriba) y selecciona <em>"Agregar al inicio"</em> (+). Se creará el ícono en la pantalla de inicio.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-[#f3ead3] font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
