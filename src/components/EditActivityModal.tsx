import React, { useState } from 'react';
import { DuelCardItem } from '../types/duelOctober';
import { X, Plus, Trash2, Save, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { INITIAL_DUEL_CARDS } from '../data/defaultDuelCards';

interface EditActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: DuelCardItem[];
  onSaveCards: (cards: DuelCardItem[]) => void;
  isFirebaseActive: boolean;
}

export function EditActivityModal({
  isOpen,
  onClose,
  cards,
  onSaveCards,
  isFirebaseActive
}: EditActivityModalProps) {
  const [editableCards, setEditableCards] = useState<DuelCardItem[]>(cards);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  React.useEffect(() => {
    if (isOpen && cards && cards.length > 0) {
      setEditableCards(JSON.parse(JSON.stringify(cards)));
    }
  }, [isOpen, cards]);

  if (!isOpen) return null;

  const currentCard = editableCards[selectedCardIndex] || editableCards[0];

  const handleUpdateCurrentCard = (field: keyof DuelCardItem, value: any) => {
    const updated = [...editableCards];
    updated[selectedCardIndex] = {
      ...updated[selectedCardIndex],
      [field]: value
    };
    setEditableCards(updated);
  };

  const handleFeaturesChange = (isCompetitor: boolean, index: number, value: string) => {
    const updated = [...editableCards];
    const card = { ...updated[selectedCardIndex] };
    if (isCompetitor) {
      const features = [...card.competitorFeatures];
      features[index] = value;
      card.competitorFeatures = features;
    } else {
      const features = [...card.claroFeatures];
      features[index] = value;
      card.claroFeatures = features;
    }
    updated[selectedCardIndex] = card;
    setEditableCards(updated);
  };

  const handleAddFeature = (isCompetitor: boolean) => {
    const updated = [...editableCards];
    const card = { ...updated[selectedCardIndex] };
    if (isCompetitor) {
      card.competitorFeatures = [...card.competitorFeatures, 'Nueva característica'];
    } else {
      card.claroFeatures = [...card.claroFeatures, 'Nuevo beneficio Claro'];
    }
    updated[selectedCardIndex] = card;
    setEditableCards(updated);
  };

  const handleRemoveFeature = (isCompetitor: boolean, index: number) => {
    const updated = [...editableCards];
    const card = { ...updated[selectedCardIndex] };
    if (isCompetitor) {
      card.competitorFeatures = card.competitorFeatures.filter((_, i) => i !== index);
    } else {
      card.claroFeatures = card.claroFeatures.filter((_, i) => i !== index);
    }
    updated[selectedCardIndex] = card;
    setEditableCards(updated);
  };

  const handleAddNewCard = () => {
    const newNumber = editableCards.length + 1;
    const newCard: DuelCardItem = {
      id: `duelo-custom-${Date.now()}`,
      doorNumber: newNumber,
      title: `Competidor Regional ${newNumber} VS Fantasma Claro`,
      doorTitle: `Puerta ${newNumber}: Duelo de Ofertas`,
      questionPrompt: '¿Cómo rebates esta oferta regional destacando la fibra simétrica y el valor Claro?',
      competitorName: `Competidor Rival ${newNumber}`,
      competitorTag: 'Oferta Promocional Rival',
      competitorPrice: '$119.900',
      competitorData: '400 Megas',
      competitorFeatures: [
        'Internet con velocidad variable',
        'Decodificador con cláusula de 12 meses',
        'Sin apps de regalo'
      ],
      competitorTrap: 'Subida de precio tras el tercer mes de contrato.',
      claroTitle: 'Fantasma Claro Doble / Triple Play',
      claroPrice: '$109.900',
      claroData: '500 Megas Simétricas',
      claroFeatures: [
        'Ahorro directo garantizado',
        'Paramount+ y Universal+ incluidos',
        'Fibra óptica simétrica y deco Android'
      ],
      claroPitch: '«Con Claro tienes mejor precio, 500 megas simétricas reales y plataformas premium incluidas.»'
    };
    setEditableCards([...editableCards, newCard]);
    setSelectedCardIndex(editableCards.length);
  };

  const handleDeleteCurrentCard = () => {
    if (editableCards.length <= 1) {
      alert('Debe existir al menos una tarjeta de duelo en la actividad.');
      return;
    }
    if (confirm(`¿Seguro que deseas eliminar la tarjeta "${currentCard.title}"?`)) {
      const filtered = editableCards.filter((_, idx) => idx !== selectedCardIndex);
      // Re-numerar puertas
      const renumbered = filtered.map((c, i) => ({
        ...c,
        doorNumber: i + 1,
        doorTitle: c.doorTitle ? c.doorTitle.replace(/Puerta \d+/, `Puerta ${i + 1}`) : `Puerta ${i + 1}: Duelo de Ofertas`
      }));
      setEditableCards(renumbered);
      setSelectedCardIndex(Math.max(0, selectedCardIndex - 1));
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('¿Deseas restablecer todas las tarjetas a los valores originales predeterminados?')) {
      setEditableCards([...INITIAL_DUEL_CARDS]);
      setSelectedCardIndex(0);
    }
  };

  const handleSave = () => {
    onSaveCards(editableCards);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="w-full max-w-5xl bg-[#1f1033] border-2 border-[#ff7a29] rounded-3xl p-5 md:p-7 shadow-[0_0_50px_rgba(255,122,41,0.35)] text-[#f3ead3] relative my-auto max-h-[92vh] flex flex-col"
        style={{
          boxShadow: '0 0 45px rgba(226, 0, 26, 0.35), inset 0 0 25px rgba(255, 122, 41, 0.1)'
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#f3ead3]/70 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Encabezado */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#ff7a29]/30">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#ffaa40] uppercase">Configuración de Contenido</span>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>Editar Actividad (Tarjetas del Duelo)</span>
              {isFirebaseActive ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  ● Sincronizado en Firebase
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ○ Almacenamiento Local
                </span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddNewCard}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#ff7a29] to-[#d95e14] hover:brightness-110 text-white font-cinzel text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Agregar Tarjeta</span>
            </button>
            <button
              onClick={handleResetToDefaults}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-[#f3ead3]/80 flex items-center gap-1 cursor-pointer transition-all"
              title="Restablecer originales"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restablecer</span>
            </button>
          </div>
        </div>

        {/* Barra de pestañas con las tarjetas/puertas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin">
          {editableCards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => setSelectedCardIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-cinzel font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 ${
                idx === selectedCardIndex
                  ? 'bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] text-white border-white/40 shadow-[0_0_15px_rgba(226,0,26,0.5)]'
                  : 'bg-black/40 text-[#f3ead3]/70 hover:text-white border-white/10 hover:border-[#ff7a29]/40'
              }`}
            >
              <span>🚪 Puerta {card.doorNumber}</span>
              <span className="text-[10px] opacity-75 truncate max-w-[120px]">
                ({card.competitorName.split(' ')[1] || 'Rival'})
              </span>
            </button>
          ))}
        </div>

        {/* Cuerpo del Editor con 2 Columnas (Competidor VS Fantasma Claro) */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5">
          {/* Título de la tarjeta y Pregunta de asesor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/30 p-4 rounded-2xl border border-white/10">
            <div>
              <label className="block text-xs font-semibold text-[#ffaa40] mb-1">
                Título del Duelo (Ej: Competidor Plan Brujo VS Fantasma Claro)
              </label>
              <input
                type="text"
                value={currentCard.title}
                onChange={(e) => handleUpdateCurrentCard('title', e.target.value)}
                className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff7a29]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#ffaa40] mb-1">
                Pregunta o Reto para el Asesor al Abrir la Puerta
              </label>
              <input
                type="text"
                value={currentCard.questionPrompt}
                onChange={(e) => handleUpdateCurrentCard('questionPrompt', e.target.value)}
                className="w-full bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff7a29]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* COLUMNA COMPETIDOR RIVAL */}
            <div className="bg-[#150a24]/90 border border-orange-500/40 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-orange-500/20">
                <span className="font-cinzel font-bold text-sm text-orange-400 flex items-center gap-1.5">
                  <span>🎃</span> OFERTA RIVAL (COMPETIDOR)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-orange-950/60 text-orange-300 rounded border border-orange-500/30">
                  Lado Izquierdo
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#f3ead3]/70 mb-1">Nombre del Plan Rival</label>
                  <input
                    type="text"
                    value={currentCard.competitorName}
                    onChange={(e) => handleUpdateCurrentCard('competitorName', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-[#f3ead3]/70 mb-1">Precio Rival</label>
                    <input
                      type="text"
                      value={currentCard.competitorPrice}
                      onChange={(e) => handleUpdateCurrentCard('competitorPrice', e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-orange-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#f3ead3]/70 mb-1">Velocidad / Datos</label>
                    <input
                      type="text"
                      value={currentCard.competitorData}
                      onChange={(e) => handleUpdateCurrentCard('competitorData', e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-medium text-[#f3ead3]/70">Características Incluidas</label>
                    <button
                      onClick={() => handleAddFeature(true)}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      + Añadir línea
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {currentCard.competitorFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5">
                        <span className="text-emerald-400 text-xs font-bold">✓</span>
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => handleFeaturesChange(true, fIdx, e.target.value)}
                          className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-[#f3ead3]"
                        />
                        <button
                          onClick={() => handleRemoveFeature(true, fIdx)}
                          className="text-red-400/60 hover:text-red-300 p-1 cursor-pointer"
                          title="Eliminar línea"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-red-400 mb-1">
                    ⚠ Trampa Oculta o Letra Menuda
                  </label>
                  <textarea
                    rows={2}
                    value={currentCard.competitorTrap}
                    onChange={(e) => handleUpdateCurrentCard('competitorTrap', e.target.value)}
                    className="w-full bg-red-950/20 border border-red-500/40 rounded-lg p-2 text-xs text-red-200"
                  />
                </div>
              </div>
            </div>

            {/* COLUMNA FANTASMA CLARO */}
            <div className="bg-[#150a24]/90 border border-red-500/40 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-red-500/20">
                <span className="font-cinzel font-bold text-sm text-[#ff5a6a] flex items-center gap-1.5">
                  <span>👻</span> PROPUESTA FANTASMA CLARO
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950/60 text-red-300 rounded border border-red-500/30">
                  Lado Derecho
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#f3ead3]/70 mb-1">Nombre Contraoferta Claro</label>
                  <input
                    type="text"
                    value={currentCard.claroTitle}
                    onChange={(e) => handleUpdateCurrentCard('claroTitle', e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-[#f3ead3]/70 mb-1">Precio Claro Ganador</label>
                    <input
                      type="text"
                      value={currentCard.claroPrice}
                      onChange={(e) => handleUpdateCurrentCard('claroPrice', e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-emerald-300 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[#f3ead3]/70 mb-1">Velocidad / Paquete</label>
                    <input
                      type="text"
                      value={currentCard.claroData}
                      onChange={(e) => handleUpdateCurrentCard('claroData', e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-medium text-[#f3ead3]/70">Beneficios y Ventajas Claro</label>
                    <button
                      onClick={() => handleAddFeature(false)}
                      className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      + Añadir beneficio
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {currentCard.claroFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5">
                        <span className="text-emerald-400 text-xs font-bold">✓</span>
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => handleFeaturesChange(false, fIdx, e.target.value)}
                          className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-[#f3ead3]"
                        />
                        <button
                          onClick={() => handleRemoveFeature(false, fIdx)}
                          className="text-red-400/60 hover:text-red-300 p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#ffaa40] mb-1">
                    🎯 Argumentario de Cierre Asesor (Speech Ganador)
                  </label>
                  <textarea
                    rows={2}
                    value={currentCard.claroPitch}
                    onChange={(e) => handleUpdateCurrentCard('claroPitch', e.target.value)}
                    className="w-full bg-emerald-950/20 border border-emerald-500/40 rounded-lg p-2 text-xs text-emerald-200 font-serif"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notificación de guardado */}
        {saveSuccess && (
          <div className="my-3 flex items-center justify-center gap-2 text-xs text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 p-2.5 rounded-xl animate-fade-in">
            <Check className="w-4 h-4" />
            <span>¡Tarjetas guardadas y sincronizadas exitosamente!</span>
          </div>
        )}

        {/* Botones inferiores */}
        <div className="pt-4 mt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleDeleteCurrentCard}
            disabled={editableCards.length <= 1}
            className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-600/40 text-red-300 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-40 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Eliminar esta tarjeta</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-[#f3ead3] font-cinzel text-xs font-bold uppercase rounded-xl cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-gradient-to-r from-[#e2001a] to-[#ff5a6a] hover:brightness-110 text-white font-cinzel text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-[0_0_20px_rgba(226,0,26,0.45)] flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
