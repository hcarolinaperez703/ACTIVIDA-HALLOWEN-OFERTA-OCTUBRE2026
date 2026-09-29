import React, { useState } from 'react';
import { Copy, Check, Palette, Type, Code2, Scissors, Sparkles, BookOpen, Download, FolderArchive } from 'lucide-react';
import { BRAND_TOKENS } from '../data/assetsData';
import { downloadProjectZip } from '../utils/projectExporter';

export function BrandGuide() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [exportingZip, setExportingZip] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(false);

  const handleExportZip = async () => {
    setExportingZip(true);
    try {
      await downloadProjectZip();
      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (e) {
      console.error('Error downloading zip', e);
    } finally {
      setExportingZip(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const htmlSnippet = `<!-- HTML: Estructura de Tarjeta con Marco de Halloween y Centro Editable -->
<div class="halloween-card card-claro">
  <!-- 1. Capa de Imagen Marco (PNG 3:4 con centro vacío) -->
  <img 
    src="./assets/fantasma-claro.png" 
    alt="Marco Fantasma Claro" 
    class="card-frame-asset"
  />

  <!-- 2. Capa de Contenido Editable en HTML/CSS (Centro Limpio) -->
  <div class="card-content-overlay">
    <div class="card-header">
      <span class="card-badge">EL GOLPE MAESTRO CLARO</span>
      <h2 class="card-title font-cinzel">CLARO 5G MAX</h2>
      <p class="card-subtitle">Oferta Cierre Imbatible</p>
    </div>

    <div class="card-price-box">
      <div class="price-value font-cinzel">$34.900</div>
      <div class="price-unit">Gigas 100% Libres 5G</div>
    </div>

    <ul class="card-benefits">
      <li>✓ Mes completo de 30 días garantizado</li>
      <li>✓ Roaming América incluido en 18 países</li>
      <li>✓ Claro Música y Video sin consumir gigas</li>
    </ul>

    <div class="card-speech-box">
      <strong>Speech Asesor:</strong>
      <p>"Con Claro tienes cobertura 5G real donde otros se apagan y sin cobros sorpresa."</p>
    </div>
  </div>
</div>`;

  const cssSnippet = `/* CSS: Hoja de Estilos Oficial para Duelo de Ofertas */
:root {
  --bg-midnight: #150a24;
  --bg-deep: #1f1033;
  --pumpkin-orange: #ff7a29;
  --coffin-moss: #5c8a6b;
  --claro-red: #e2001a;
  --claro-glow: #ff5a6a;
  --parchment: #f3ead3;
}

/* Tipografías Oficiales */
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Work+Sans:wght@400;500;600&display=swap');

.font-cinzel {
  font-family: 'Cinzel', serif;
  letter-spacing: 0.04em;
}

/* Contenedor en Proporción Vertical 3:4 */
.halloween-card {
  position: relative;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 3 / 4;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-midnight);
  color: var(--parchment);
  font-family: 'Work Sans', sans-serif;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

/* Marco decorativo perimetral */
.card-frame-asset {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
  z-index: 1;
}

/* Capa de texto centrada */
.card-content-overlay {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

/* Glow Claro para cierre de venta */
.card-claro {
  box-shadow: 0 0 35px rgba(226, 0, 26, 0.45);
}

.price-value {
  font-size: 2.2rem;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0 0 15px rgba(255, 90, 106, 0.7);
}`;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Introduction */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#5c8a6b]/15 text-[#8ec59f] border border-[#5c8a6b]/30">
          <BookOpen className="w-3.5 h-3.5" /> Manual de Identidad & Integración
        </div>
        <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-[#f3ead3]">
          Especificaciones de Identidad Visual & Código HTML/CSS
        </h2>
        <p className="text-sm md:text-base text-[#f3ead3]/80 max-w-3xl">
          Esta guía documenta la paleta cromática, tipografías, siluetas temáticas y snippets listos para integrar los marcos en tu prototipo interactivo HTML existente.
        </p>
      </div>

      {/* Banner de Proyecto Exportado y Estructura */}
      <div className="rounded-2xl border border-[#ff7a29]/40 bg-gradient-to-r from-[#1f1033] via-[#2a0845] to-[#150a24] p-6 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#ff7a29] uppercase tracking-wider bg-[#ff7a29]/20 px-2.5 py-0.5 rounded-full border border-[#ff7a29]/30">
              Paquete Independiente PWA Listo
            </span>
            <h3 className="text-xl font-cinzel font-black text-white flex items-center gap-2">
              📁 Estructura del "Proyecto_Exportado"
            </h3>
            <p className="text-xs text-[#f3ead3]/80 max-w-2xl">
              Se ha generado la estructura completa de carpetas y archivos con páginas HTML independientes, estilos CSS oficiales, scripts interactivos para las 5 sesiones PWA y configuración <code className="bg-black/40 px-1 py-0.5 rounded text-[#ffaa40]">manifest.json</code>.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportZip}
              disabled={exportingZip}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7a29] to-[#d95e14] hover:brightness-110 text-white font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition-all cursor-pointer border border-white/20 active:scale-95 disabled:opacity-50"
            >
              {zipSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>¡Descargado!</span>
                </>
              ) : (
                <>
                  <FolderArchive className="w-4 h-4 text-yellow-300" />
                  <span>{exportingZip ? 'Comprimiendo...' : 'EXPORTAR .ZIP'}</span>
                </>
              )}
            </button>

            <a
              href="/Proyecto_Exportado/index.html"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#f3ead3] font-cinzel font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition-all"
            >
              🚀 Ver en Vivo
            </a>
          </div>
        </div>

        <pre className="p-4 bg-black/60 rounded-xl text-xs font-mono text-[#86efac] overflow-x-auto leading-relaxed border border-white/10">
{`Proyecto_Exportado/
│
├── index.html                   # Arena interactiva: Duelos 3D y 5 Sesiones Simultáneas
├── pages/
│   ├── inicio.html             # Bienvenida y fundamentos del programa comercial
│   ├── contacto.html           # Mesa de ayuda y soporte para capacitadores
│   └── servicios.html          # Portafolio Claro Hogar y contraofertas ganadoras
│
├── assets/
│   ├── css/
│   │   └── styles.css          # Paleta oficial Midnight, Rojo Claro, Naranja Neón
│   ├── js/
│   │   └── app.js              # 5 Sesiones en paralelo, estados Activo/Cerrado y PWA
│   ├── images/
│   │   ├── icon-192.svg        # Ícono PWA estándar
│   │   └── icon-512.svg        # Ícono PWA alta resolución
│   └── fonts/
│       └── README.txt          # Tipografías Cinzel y Work Sans
│
├── docs/
│   └── README.md               # Guía técnica y manual de despliegue en servidor estático
│
└── config/
    └── manifest.json           # Manifiesto PWA para instalación en Android, iOS y Desktop`}
        </pre>
      </div>

      {/* Color Swatches Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#ff7a29]" />
          <h3 className="font-cinzel text-lg font-bold text-[#f3ead3]">Paleta de Color Oficial</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRAND_TOKENS.colors.map((color) => (
            <div
              key={color.hex}
              className="p-4 rounded-xl border border-white/10 bg-[#1f1033]/60 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl shadow-md border border-white/20 shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <h4 className="font-bold text-sm text-[#f3ead3]">{color.name}</h4>
                  <button
                    onClick={() => handleCopy(color.hex, color.hex)}
                    className="flex items-center gap-1 text-xs font-mono text-[#f3ead3]/70 hover:text-white transition-colors"
                  >
                    <span>{color.hex}</span>
                    {copiedCode === color.hex ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-[#f3ead3]/60 leading-tight">{color.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Spec */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-[#ff5a6a]" />
          <h3 className="font-cinzel text-lg font-bold text-[#f3ead3]">Tipografía Oficial</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-white/10 bg-[#1f1033]/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#ff7a29] font-bold">
                Titulares y Cifras de Impacto
              </span>
              <span className="text-xs text-[#f3ead3]/50">Google Fonts: Cinzel</span>
            </div>
            <div className="font-cinzel text-2xl font-black text-[#f3ead3] tracking-wide">
              CINZEL • SERIF GÓTICA ELEGANTE
            </div>
            <p className="text-xs text-[#f3ead3]/70">
              Utilizada en los nombres de planes, cifras de precios grandes ($34.900), títulos de rondas de duelo y sellos de victoria comercial Claro.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-[#1f1033]/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5c8a6b] font-bold">
                Cuerpo de Texto y Argumentarios
              </span>
              <span className="text-xs text-[#f3ead3]/50">Google Fonts: Work Sans</span>
            </div>
            <div className="font-sans text-xl font-medium text-[#f3ead3]">
              Work Sans • Legibilidad Corporativa Máxima
            </div>
            <p className="text-xs text-[#f3ead3]/70">
              Diseñada para la lectura ágil del asesor comercial en pantalla: listas de gigas, condiciones, objeciones y guiones de venta rápida.
            </p>
          </div>
        </div>
      </div>

      {/* Background Removal & Alpha Transparency Guidance */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#150a24] via-[#1f1033] to-[#150a24] border border-[#ff7a29]/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-[#ff7a29]" />
          <h3 className="font-cinzel text-lg font-bold text-[#f3ead3]">
            Instrucciones para Fondo Transparente (Canal Alfa)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#f3ead3]/80 leading-relaxed">
          Como solicitaste, las 4 imágenes maestras fueron generadas sobre el color corporativo sólido <strong className="text-[#ff7a29]">#150a24</strong> para respetar milimétricamente la paleta de tu prototipo. Si necesitas usarlas con transparencia total sobre fondos dinámicos:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="font-bold text-[#ff7a29]">Opción A: Exportador en Vivo (Recomendada)</span>
            <p className="text-[#f3ead3]/70">
              En la pestaña <em>"Assets & Descargas"</em> haz clic en <strong>"Exportar Transparente (Alfa)"</strong>. El algoritmo procesa los píxeles #150a24 con desvanecimiento suave de bordes en milisegundos.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="font-bold text-[#5c8a6b]">Opción B: Photoshop / Photopea</span>
            <p className="text-[#f3ead3]/70">
              Abre el archivo, selecciona la herramienta <em>Varita Mágica (Tolerancia: 30, Suavizar activo)</em>, haz clic en el fondo #150a24 y pulsa <kbd className="bg-black/50 px-1 py-0.5 rounded">Supr</kbd>. Guarda como PNG-24.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="font-bold text-[#ff5a6a]">Opción C: Figma</span>
            <p className="text-[#f3ead3]/70">
              Importa la imagen y aplica el plugin gratuito <em>Remove BG</em> o utiliza el modo de fusión <code className="bg-black/50 px-1 py-0.5 rounded">Screen / Trama</code> si tu fondo de slide ya es #150a24.
            </p>
          </div>
        </div>
      </div>

      {/* Code Snippets for HTML/CSS Prototype Integration */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-[#ff5a6a]" />
          <h3 className="font-cinzel text-lg font-bold text-[#f3ead3]">
            Código para tu Prototipo Interactivo en HTML
          </h3>
        </div>

        {/* HTML Snippet */}
        <div className="rounded-xl border border-white/15 bg-black/60 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
            <span className="text-xs font-mono text-[#ff7a29] font-semibold">tarjeta-halloween.html</span>
            <button
              onClick={() => handleCopy(htmlSnippet, 'html')}
              className="flex items-center gap-1.5 text-xs text-[#f3ead3]/70 hover:text-white transition-colors"
            >
              {copiedCode === 'html' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar HTML</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-[#f3ead3]/90 overflow-x-auto leading-relaxed">
            {htmlSnippet}
          </pre>
        </div>

        {/* CSS Snippet */}
        <div className="rounded-xl border border-white/15 bg-black/60 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
            <span className="text-xs font-mono text-[#ff5a6a] font-semibold">estilos-duelo.css</span>
            <button
              onClick={() => handleCopy(cssSnippet, 'css')}
              className="flex items-center gap-1.5 text-xs text-[#f3ead3]/70 hover:text-white transition-colors"
            >
              {copiedCode === 'css' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar CSS Base</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-[#f3ead3]/90 overflow-x-auto leading-relaxed">
            {cssSnippet}
          </pre>
        </div>

        {/* 3D Hover & Movement Animation Snippet (User's .tarjeta-oferta system) */}
        <div className="rounded-xl border border-[#ff7a29]/40 bg-gradient-to-b from-[#1f1033] to-black/70 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-[#ff7a29]/10 border-b border-[#ff7a29]/30">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff7a29]" />
              <span className="text-xs font-mono text-[#ff7a29] font-bold">
                Efecto 3D & Hover Dinámico (.tarjeta-oferta)
              </span>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  `/* Contenedor o clase de la tarjeta con soporte 3D */
.tarjeta-oferta {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* Efecto de movimiento y brillo al pasar el cursor (Hover Genérico / Calabaza) */
.tarjeta-oferta:hover {
  transform: translateY(-15px) rotateY(10deg) scale(1.02);
  box-shadow: 0px 20px 35px rgba(255, 75, 43, 0.5); /* Destello naranja estilo Halloween */
}

/* Variante Ataúd (Competidor 2 - Inclinación hacia la izquierda y halo verde musgo) */
.tarjeta-oferta.tarjeta-ataud:hover {
  transform: translateY(-15px) rotateY(-10deg) scale(1.02);
  box-shadow: 0px 20px 35px rgba(92, 138, 107, 0.55);
}

/* Variante Fantasma Claro (Cierre de Venta - Elevación premium y resplandor rojo Claro) */
.tarjeta-oferta.tarjeta-claro:hover {
  transform: translateY(-18px) rotateY(-8deg) scale(1.03);
  box-shadow: 0px 25px 45px rgba(226, 0, 26, 0.65), 0px 0px 30px rgba(255, 90, 106, 0.5);
}`,
                  'hover-css'
                )
              }
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#ff7a29] hover:bg-[#d95e14] text-white text-xs font-semibold transition-colors"
            >
              {copiedCode === 'hover-css' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar CSS .tarjeta-oferta</span>
                </>
              )}
            </button>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-xs text-[#f3ead3]/80">
              Hemos integrado esta clase en todas las tarjetas del simulador. Al pasar el cursor, la tarjeta experimenta una elevación con rotación tridimensional en el eje Y y genera un destello luminoso personalizado por marca:
            </p>
            <pre className="p-4 bg-black/60 rounded-lg text-xs font-mono text-[#ff7a29] overflow-x-auto leading-relaxed border border-white/5">
{`/* Contenedor o clase de la tarjeta */
.tarjeta-oferta {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* Efecto de movimiento y brillo al pasar el cursor (Hover) */
.tarjeta-oferta:hover {
  transform: translateY(-15px) rotateY(10deg) scale(1.02);
  box-shadow: 0px 20px 35px rgba(255, 75, 43, 0.5); /* Destello naranja estilo Halloween */
}

/* Variante Ataúd (Competidor 2 - Verde Musgo) */
.tarjeta-oferta.tarjeta-ataud:hover {
  transform: translateY(-15px) rotateY(-10deg) scale(1.02);
  box-shadow: 0px 20px 35px rgba(92, 138, 107, 0.55);
}

/* Variante Fantasma Claro (Cierre de Venta - Rojo Claro) */
.tarjeta-oferta.tarjeta-claro:hover {
  transform: translateY(-18px) rotateY(-8deg) scale(1.03);
  box-shadow: 0px 25px 45px rgba(226, 0, 26, 0.65), 0px 0px 30px rgba(255, 90, 106, 0.5);
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
