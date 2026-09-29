import React, { useState } from 'react';
import { Download, Sparkles, Eye, CheckCircle2, ShieldCheck, Palette, FileImage, Maximize2, X, Sliders } from 'lucide-react';
import { CARD_ASSETS } from '../data/assetsData';
import { CardAsset } from '../types/duel';
import { downloadImageOriginal, processAndDownloadTransparentPNG, downloadSVGVector } from '../utils/imageExporter';

export function AssetGallery() {
  const [selectedAsset, setSelectedAsset] = useState<CardAsset | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [transparencyMode, setTransparencyMode] = useState<boolean>(false);
  const [transparencyTolerance, setTransparencyTolerance] = useState<number>(36);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleDownloadOriginal = async (asset: CardAsset) => {
    setDownloadingId(`${asset.id}-orig`);
    setStatusMessage(`Descargando ${asset.filename}...`);
    try {
      await downloadImageOriginal(asset.imageSrc, asset.filename);
      setStatusMessage(`¡Descargado ${asset.filename} con éxito!`);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (e) {
      console.error(e);
      setStatusMessage('Error al descargar el archivo.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadTransparent = async (asset: CardAsset) => {
    setDownloadingId(`${asset.id}-trans`);
    const cleanName = asset.filename.replace('.png', '-transparente.png');
    setStatusMessage(`Procesando canal alfa para ${cleanName}...`);
    try {
      await processAndDownloadTransparentPNG(asset.imageSrc, cleanName, {
        tolerance: transparencyTolerance
      });
      setStatusMessage(`¡Descargado ${cleanName} con canal alfa!`);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (e) {
      console.error(e);
      setStatusMessage('Error procesando transparencia.');
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadSVG = (asset: CardAsset) => {
    downloadSVGVector(asset.svgPathType, asset.filename);
    setStatusMessage(`¡Descargado vector SVG para ${asset.name}!`);
    setTimeout(() => setStatusMessage(null), 2500);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Banner de Entrega de Identidad Visual */}
      <div className="relative overflow-hidden rounded-2xl border border-[#ff7a29]/30 bg-gradient-to-r from-[#1f1033] via-[#150a24] to-[#1f1033] p-6 md:p-8 shadow-[0_0_30px_rgba(21,10,36,0.8)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff7a29]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e2001a]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#ff7a29]/15 text-[#ff7a29] border border-[#ff7a29]/30">
              <ShieldCheck className="w-3.5 h-3.5" /> Entrega Oficial de Assets Gráficos
            </div>
            <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-[#f3ead3]">
              Set de Marcos de Gala: Duelo de Ofertas Halloween
            </h2>
            <p className="text-sm md:text-base text-[#f3ead3]/80 leading-relaxed">
              Diseño sofisticado para capacitaciones corporativas Claro. Cada marco cuenta con su silueta temática exclusiva (Calabaza Asimétrica, Ataúd Hexagonal, Fantasma Claro) con <strong className="text-[#f3ead3]">centro 100% limpio y vacío</strong> en proporción vertical <strong className="text-[#ff7a29]">3:4 (1200x1600px)</strong> para superponer texto editable HTML/CSS sin interferencias.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#f3ead3]/70">
              <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-md border border-white/5">
                <Palette className="w-3.5 h-3.5 text-[#ff7a29]" /> Paleta corporativa oficial
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-md border border-white/5">
                <FileImage className="w-3.5 h-3.5 text-[#ff5a6a]" /> Sin textos ni marcas de agua en imagen
              </span>
              <span className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-md border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5c8a6b]" /> 4 archivos independientes consistentes
              </span>
            </div>
          </div>

          {/* Controls: Mode & Tolerance */}
          <div className="bg-[#150a24]/90 p-4 rounded-xl border border-white/10 flex flex-col gap-3 min-w-[280px]">
            <div className="text-xs font-medium text-[#f3ead3]/70 flex items-center justify-between">
              <span>Visualización de Fondo:</span>
              <button
                onClick={() => setTransparencyMode(!transparencyMode)}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-all ${
                  transparencyMode
                    ? 'bg-[#ff7a29] text-white shadow-sm'
                    : 'bg-white/10 text-[#f3ead3] hover:bg-white/15'
                }`}
              >
                {transparencyMode ? 'Modo Cuadrícula Alpha' : 'Fondo #150a24'}
              </button>
            </div>

            {transparencyMode && (
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-[#f3ead3]/70">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-[#ff7a29]" /> Tolerancia Alpha:
                  </span>
                  <span className="font-mono text-[#ff7a29]">{transparencyTolerance}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="65"
                  value={transparencyTolerance}
                  onChange={(e) => setTransparencyTolerance(Number(e.target.value))}
                  className="w-full accent-[#ff7a29] cursor-pointer h-1.5 bg-black/40 rounded-lg"
                />
              </div>
            )}

            <div className="text-[11px] text-[#f3ead3]/60 leading-tight">
              Tip: Puedes descargar el PNG maestro original o generar la versión con canal alfa transparente con el botón directo.
            </div>
          </div>
        </div>

        {statusMessage && (
          <div className="mt-4 p-2.5 rounded-lg bg-[#e2001a]/20 border border-[#e2001a]/40 text-xs text-[#f3ead3] flex items-center gap-2 animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#ff5a6a]" />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* Grid of 4 Deliverable Assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CARD_ASSETS.map((asset, index) => {
          const isClaro = asset.id === 'fantasma-claro';
          const isCoffin = asset.id === 'ataud';

          return (
            <div
              key={asset.id}
              className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 ${
                isClaro
                  ? 'border-[#e2001a]/60 bg-gradient-to-b from-[#1f1033] to-[#150a24] shadow-[0_0_25px_rgba(226,0,26,0.25)] hover:shadow-[0_0_35px_rgba(226,0,26,0.45)]'
                  : isCoffin
                  ? 'border-[#5c8a6b]/50 bg-gradient-to-b from-[#191522] to-[#150a24] shadow-[0_0_20px_rgba(92,138,107,0.2)] hover:shadow-[0_0_30px_rgba(92,138,107,0.35)]'
                  : 'border-[#ff7a29]/50 bg-gradient-to-b from-[#1f1033] to-[#150a24] shadow-[0_0_20px_rgba(255,122,41,0.2)] hover:shadow-[0_0_30px_rgba(255,122,41,0.35)]'
              }`}
            >
              {/* Header Badge */}
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-black/25">
                <span className="text-xs font-mono text-[#f3ead3]/60">0{index + 1} / 04</span>
                <span
                  className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${asset.accentColor}20`,
                    color: asset.accentColor,
                    borderColor: `${asset.accentColor}40`,
                    borderWidth: '1px'
                  }}
                >
                  {isClaro ? 'Hero Claro' : 'Competidor'}
                </span>
              </div>

              {/* Card Image Preview Container (3:4 ratio) */}
              <div
                className={`relative aspect-[3/4] w-full p-4 flex items-center justify-center overflow-hidden transition-colors ${
                  transparencyMode
                    ? 'bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:12px_12px] bg-slate-900'
                    : 'bg-[#150a24]'
                }`}
              >
                <img
                  src={asset.imageSrc}
                  alt={asset.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Subtle visual badge indicating empty center ready for text */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 text-center">
                    <span className="text-[11px] text-[#f3ead3] flex items-center gap-1 font-medium">
                      <Eye className="w-3.5 h-3.5 text-[#ff7a29]" /> Centro Limpio Editable
                    </span>
                  </div>
                </div>

                {/* Zoom modal trigger */}
                <button
                  onClick={() => setSelectedAsset(asset)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-[#f3ead3] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 hover:text-white"
                  title="Ver en grande"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Content info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-cinzel font-bold text-base text-[#f3ead3] group-hover:text-white flex items-center gap-1.5">
                    {asset.name}
                  </h3>
                  <p className="text-xs font-mono text-[#ff7a29] mt-0.5">{asset.filename}</p>

                  <div className="mt-2 text-xs text-[#f3ead3]/75 space-y-1">
                    <p className="line-clamp-2">{asset.designNotes}</p>
                    <p className="text-[11px] text-[#f3ead3]/50 italic">{asset.competitorRole}</p>
                  </div>
                </div>

                {/* Action Download Buttons */}
                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  {/* Master Original Download */}
                  <button
                    onClick={() => handleDownloadOriginal(asset)}
                    disabled={downloadingId !== null}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#f3ead3] transition-all border border-white/10 active:scale-98 disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar {asset.filename}</span>
                  </button>

                  {/* Transparent Processed Download */}
                  <button
                    onClick={() => handleDownloadTransparent(asset)}
                    disabled={downloadingId !== null}
                    className={`w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-[11px] font-medium transition-all border active:scale-98 disabled:opacity-50 ${
                      isClaro
                        ? 'bg-[#e2001a]/20 hover:bg-[#e2001a]/30 text-[#ff5a6a] border-[#e2001a]/40'
                        : isCoffin
                        ? 'bg-[#5c8a6b]/20 hover:bg-[#5c8a6b]/30 text-[#8ec59f] border-[#5c8a6b]/40'
                        : 'bg-[#ff7a29]/20 hover:bg-[#ff7a29]/30 text-[#ff7a29] border-[#ff7a29]/40'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Exportar Transparente (Alfa)</span>
                  </button>

                  {/* SVG Vector Download */}
                  <button
                    onClick={() => handleDownloadSVG(asset)}
                    className="w-full text-center text-[10px] text-[#f3ead3]/50 hover:text-[#f3ead3] py-0.5 transition-colors underline decoration-dotted"
                  >
                    Descargar como SVG Vectorial
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Nota técnica y especificación requerida por el usuario */}
      <div className="p-5 rounded-xl border border-white/10 bg-[#1f1033]/60 backdrop-blur-sm text-xs text-[#f3ead3]/80 space-y-2">
        <h4 className="font-cinzel font-semibold text-sm text-[#f3ead3] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#ff7a29]" />
          Especificación de Entrega para Diseñador Gráfico & Desarrollador Web
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="space-y-1">
            <span className="font-semibold text-[#ff7a29]">1. Proporción 3:4 Exacta:</span>
            <p className="text-[#f3ead3]/70">
              Formato vertical de 1200x1600px estándar para tarjetas de juego o cartas de rol, ideal para vistas móviles y desktop con CSS <code className="text-[#ff7a29] bg-black/40 px-1 py-0.5 rounded">aspect-ratio: 3/4</code>.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-[#5c8a6b]">2. Área Central Despejada:</span>
            <p className="text-[#f3ead3]/70">
              El marco concentra la ornamentación en los márgenes exteriores para garantizar contraste 100% legible con tipografía hueso (#f3ead3).
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-[#ff5a6a]">3. Fondo #150a24 & Recorte:</span>
            <p className="text-[#f3ead3]/70">
              Las piezas maestras están calibradas sobre el morado medianoche corporativo #150a24. Nuestro exportador integrado permite extraer el canal alfa con un clic, o recortarlo en Photoshop/Figma seleccionando la varita en #150a24.
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Zoom Inspection */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-2xl w-full bg-[#150a24] rounded-2xl border border-white/20 p-6 flex flex-col items-center shadow-2xl">
            <button
              onClick={() => setSelectedAsset(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full text-center mb-4">
              <h3 className="font-cinzel font-bold text-xl text-[#f3ead3]">{selectedAsset.name}</h3>
              <p className="text-xs font-mono text-[#ff7a29]">{selectedAsset.filename} • Resolución 1200x1600 (3:4)</p>
            </div>

            <div className="relative max-h-[65vh] aspect-[3/4] flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <img
                src={selectedAsset.imageSrc}
                alt={selectedAsset.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={() => handleDownloadOriginal(selectedAsset)}
                className="px-4 py-2 rounded-xl bg-[#ff7a29] hover:bg-[#d95e14] text-white font-cinzel font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
              >
                Descargar PNG Original
              </button>
              <button
                onClick={() => handleDownloadTransparent(selectedAsset)}
                className="px-4 py-2 rounded-xl bg-[#e2001a] hover:bg-[#ff5a6a] text-white font-cinzel font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
              >
                Descargar Transparente (Alpha)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
