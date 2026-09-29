import { useState } from 'react';
import { Flame, Sparkles, Download, Layers, Swords, BookOpen, Check, Music, Archive, FolderArchive } from 'lucide-react';
import { CARD_ASSETS } from '../data/assetsData';
import { downloadImageOriginal } from '../utils/imageExporter';
import { downloadProjectZip } from '../utils/projectExporter';

interface HeaderProps {
  activeTab: 'activity' | 'assets' | 'simulator' | 'guide';
  onTabChange: (tab: 'activity' | 'assets' | 'simulator' | 'guide') => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [downloadedSuccess, setDownloadedSuccess] = useState(false);
  const [exportingProject, setExportingProject] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleDownloadAll = async () => {
    setDownloadingAll(true);
    try {
      for (const asset of CARD_ASSETS) {
        await downloadImageOriginal(asset.imageSrc, asset.filename);
        // Small delay between downloads so browser doesn't block multi-download
        await new Promise((r) => setTimeout(r, 350));
      }
      setDownloadedSuccess(true);
      setTimeout(() => setDownloadedSuccess(false), 3000);
    } catch (e) {
      console.error('Error downloading assets', e);
    } finally {
      setDownloadingAll(false);
    }
  };

  const handleExportProject = async () => {
    setExportingProject(true);
    try {
      await downloadProjectZip();
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (e) {
      console.error('Error exporting project zip', e);
    } finally {
      setExportingProject(false);
    }
  };

  return (
    <header className="border-b border-[#ff7a29]/20 bg-[#150a24]/90 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#e2001a] via-[#1f1033] to-[#ff7a29] p-[1.5px] shadow-[0_0_20px_rgba(226,0,26,0.4)]">
              <div className="w-full h-full bg-[#150a24] rounded-[10px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#ff5a6a] animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-[#ff5a6a] font-semibold bg-[#e2001a]/15 px-2 py-0.5 rounded border border-[#e2001a]/30">
                  Capacitación Comercial Claro
                </span>
                <span className="text-xs text-[#ff7a29] font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Halloween Edition
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-cinzel font-bold text-[#f3ead3] tracking-wide flex items-center gap-2">
                DUELO DE OFERTAS DE HALLOWEEN
              </h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1f1033]/80 rounded-xl border border-white/10">
            <button
              onClick={() => {
                onTabChange('activity');
                setTimeout(() => {
                  const sesionesBtn = document.getElementById('btn-sesiones-header');
                  if (sesionesBtn) {
                    sesionesBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    sesionesBtn.classList.add('ring-4', 'ring-yellow-400');
                    setTimeout(() => sesionesBtn.classList.remove('ring-4', 'ring-yellow-400'), 1500);
                  }
                }, 50);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'activity'
                  ? 'bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] text-white shadow-[0_0_20px_rgba(226,0,26,0.5)] font-semibold'
                  : 'text-[#f3ead3]/70 hover:text-white hover:bg-white/5'
              }`}
              title="Ir a Actividad y desplegar Sesiones PWA"
            >
              <Music className="w-4 h-4 text-amber-300" />
              <span>Actividad</span>
            </button>

            <button
              onClick={() => onTabChange('assets')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'assets'
                  ? 'bg-gradient-to-r from-[#ff7a29] to-[#d95e14] text-white shadow-[0_0_15px_rgba(255,122,41,0.4)] font-semibold'
                  : 'text-[#f3ead3]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Assets (4 PNGs)</span>
            </button>

            <button
              onClick={() => onTabChange('simulator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'simulator'
                  ? 'bg-gradient-to-r from-[#ff7a29] to-[#e2001a] text-white shadow-[0_0_20px_rgba(255,122,41,0.4)] font-semibold'
                  : 'text-[#f3ead3]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Swords className="w-4 h-4" />
              <span>Simulador Editable</span>
            </button>

            <button
              onClick={() => onTabChange('guide')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all ${
                activeTab === 'guide'
                  ? 'bg-gradient-to-r from-[#5c8a6b] to-[#3c5943] text-white shadow-[0_0_15px_rgba(92,138,107,0.4)] font-semibold'
                  : 'text-[#f3ead3]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Guía & Código</span>
            </button>
          </div>

          {/* Actions: Exportar Proyecto ZIP & Descargar Assets */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* BOTÓN EXPORTAR PROYECTO COMPLETO */}
            <button
              onClick={handleExportProject}
              disabled={exportingProject}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff7a29] to-[#d95e14] hover:brightness-110 text-white font-cinzel font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,122,41,0.5)] active:scale-95 disabled:opacity-50 border border-white/20 cursor-pointer"
              title="Exportar Proyecto Completo (HTML, CSS, JS, PWA) en un archivo .zip"
            >
              {exportSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>¡Proyecto Exportado!</span>
                </>
              ) : (
                <>
                  <FolderArchive className={`w-4 h-4 ${exportingProject ? 'animate-spin text-yellow-300' : 'text-yellow-300'}`} />
                  <span>{exportingProject ? 'Generando ZIP...' : 'EXPORTAR'}</span>
                </>
              )}
            </button>

            {/* Download All Pack Button */}
            <button
              onClick={handleDownloadAll}
              disabled={downloadingAll}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#e2001a] hover:bg-[#ff5a6a] text-white font-cinzel font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(226,0,26,0.45)] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {downloadedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>¡4 Archivos Listos!</span>
                </>
              ) : (
                <>
                  <Download className={`w-4 h-4 ${downloadingAll ? 'animate-bounce' : ''}`} />
                  <span>{downloadingAll ? 'Descargando...' : 'Pack (4 PNGs)'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
