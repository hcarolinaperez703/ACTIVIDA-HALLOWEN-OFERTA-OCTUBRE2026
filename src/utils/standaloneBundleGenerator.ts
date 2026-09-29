import JSZip from 'jszip';
import { SVG_ICONS } from './projectExporter';

export const STANDALONE_FIREBASE_CONFIG_JS = `/**
 * ============================================================================
 * DUELO DE OFERTAS DE HALLOWEEN – OCTUBRE
 * Configuración de Firebase para Sincronización en Tiempo Real
 * ============================================================================
 * Pega aquí tus credenciales de Firebase para sincronizar entre dispositivos:
 */

window.FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
  databaseURL: "https://TU_PROYECTO-default-rtdb.firebaseio.com"
};
`;

export const STANDALONE_MANIFEST_JSON = `{
  "name": "Duelo de Ofertas de Halloween – Octubre",
  "short_name": "Duelo Halloween",
  "description": "Duelo de Ofertas de Halloween – Octubre: Capacitación comercial Claro Colombia con Puertas Misteriosas y 5 sesiones simultáneas.",
  "start_url": "./?pwa=true",
  "scope": "./",
  "display": "standalone",
  "background_color": "#150a24",
  "theme_color": "#e2001a",
  "orientation": "any",
  "categories": ["business", "education", "productivity"],
  "icons": [
    {
      "src": "icon-192.svg",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "icon-512.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}`;

export const STANDALONE_SW_JS = `const CACHE_NAME = 'duelo-halloween-octubre-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg',
  './firebase-config.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request).catch(() => caches.match('./')))
  );
});
`;

export const STANDALONE_README_MD = `# Duelo de Ofertas de Halloween – Octubre
## Claro Colombia • Capacitación Comercial

Este paquete contiene la aplicación completa en formato HTML/PWA lista para desplegar en la raíz de tu repositorio de GitHub:
**https://github.com/hcarolinaperez703/DUELO-DE-OFERTAS-DE-HALLOWEEN**

### 📁 Archivos incluidos:
- \`index.html\`: Aplicación web y PWA completa (Formador, 5 Sesiones, Puertas Misteriosas, Editor y Sonido).
- \`firebase-config.js\`: Archivo para pegar tus credenciales de Firebase Firestore / Realtime Database.
- \`manifest.json\`: Manifiesto PWA para instalación en Android, iPhone, tabletas y computadores.
- \`sw.js\`: Service worker para funcionamiento offline y caché sin conexión.
- \`icon-192.svg\` y \`icon-512.svg\`: Íconos de alta definición.

### 🚀 Publicación en GitHub Pages:
1. Sube todos los archivos descomprimidos directamente a la raíz de tu repositorio en GitHub (\`main\` branch).
2. En GitHub, ve a **Settings** -> **Pages**.
3. En **Source**, selecciona **Deploy from a branch**, rama **main** y carpeta **/ (root)**. Guarda los cambios.
4. En 1-2 minutos, tu aplicación estará disponible públicamente en:
   \`https://hcarolinaperez703.github.io/DUELO-DE-OFERTAS-DE-HALLOWEEN/\`

### 📱 Instalación como PWA en Celulares:
- **Android**: Abre el enlace en Google Chrome y toca el botón "Instalar aplicación" o en el menú de 3 puntos selecciona "Agregar a la pantalla principal".
- **iOS (iPhone/iPad)**: Abre en Safari, toca el botón Compartir y elige "Agregar al inicio" (+).
`;

/**
 * Builds the standalone single-file index.html with all functionality baked in
 */
export function generateStandaloneIndexHtml(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Duelo de Ofertas de Halloween – Octubre</title>
  <meta name="description" content="Capacitación comercial Claro Colombia: Duelo de Ofertas de Halloween – Octubre con Puertas Misteriosas y 5 sesiones en paralelo.">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#e2001a">
  <link rel="icon" type="image/svg+xml" href="icon-512.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Work+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <script src="firebase-config.js"></script>

  <style>
    :root {
      --bg-midnight: #150a24;
      --bg-surface: #1f1033;
      --claro-red: #e2001a;
      --claro-glow: #ff5a6a;
      --pumpkin-orange: #ff7a29;
      --pumpkin-glow: #ffaa40;
      --parchment: #f3ead3;
      --white: #ffffff;
      --border-subtle: rgba(255, 255, 255, 0.12);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Work Sans', sans-serif;
      background: radial-gradient(circle at 50% 15%, #230d3d 0%, #150a24 75%);
      color: var(--parchment);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    .font-cinzel { font-family: 'Cinzel', serif; }
    header {
      background: rgba(15, 7, 26, 0.95);
      border-bottom: 2px solid rgba(255, 122, 41, 0.3);
      padding: 14px 20px;
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(12px);
    }
    .header-box {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
    .brand-wrap { display: flex; align-items: center; gap: 12px; }
    .btn-top {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--parchment);
      padding: 6px 14px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .btn-top:hover { background: rgba(255, 255, 255, 0.2); }
    .btn-top.active-session {
      background: linear-gradient(135deg, #10b981, #059669);
      color: #fff;
      border-color: #34d399;
    }
    main {
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 24px 16px 60px;
    }
    .hero-box {
      text-align: center;
      background: rgba(31, 16, 51, 0.7);
      border: 2px solid rgba(255, 122, 41, 0.4);
      border-radius: 28px;
      padding: 40px 20px;
      margin-bottom: 30px;
      box-shadow: 0 0 50px rgba(226, 0, 26, 0.2), inset 0 0 30px rgba(255, 122, 41, 0.1);
      position: relative;
      overflow: hidden;
    }
    .hero-title {
      font-size: clamp(24px, 5vw, 42px);
      font-weight: 900;
      color: #fff;
      text-shadow: 0 0 25px rgba(255, 122, 41, 0.6), 0 0 45px rgba(226, 0, 26, 0.4);
      margin-bottom: 8px;
    }
    .hero-sub {
      font-size: 14px;
      color: var(--pumpkin-glow);
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
    }
    .spooky-elements { font-size: 32px; margin: 15px 0; letter-spacing: 12px; }
    
    /* 3 BOTONES PRINCIPALES INDEPENDIENTES */
    .trainer-buttons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 35px;
    }
    .card-btn-action {
      background: linear-gradient(145deg, rgba(31, 16, 51, 0.95), rgba(15, 7, 26, 0.95));
      border: 2px solid rgba(255, 122, 41, 0.35);
      border-radius: 24px;
      padding: 30px 24px;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .card-btn-action:hover {
      transform: translateY(-6px);
      border-color: var(--pumpkin-orange);
      box-shadow: 0 15px 40px rgba(255, 122, 41, 0.35);
    }
    .card-btn-action.btn-activity {
      border-color: rgba(226, 0, 26, 0.6);
      background: linear-gradient(145deg, rgba(45, 10, 25, 0.95), rgba(20, 6, 20, 0.95));
    }
    .card-btn-action.btn-activity:hover {
      box-shadow: 0 15px 45px rgba(226, 0, 26, 0.5);
    }
    .icon-circle {
      width: 72px;
      height: 72px;
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      margin-bottom: 16px;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }
    .action-title {
      font-size: 22px;
      font-weight: 900;
      color: #fff;
      margin-bottom: 6px;
    }
    .action-desc {
      font-size: 13px;
      color: rgba(243, 234, 211, 0.7);
      line-height: 1.4;
    }

    /* PANTALLA DE SESIONES */
    .sessions-view { display: none; }
    .sessions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }
    .session-card {
      background: rgba(31, 16, 51, 0.9);
      border: 2px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 22px 18px;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
    }
    .session-card:hover {
      border-color: var(--pumpkin-orange);
      transform: translateY(-3px);
    }
    .status-badge {
      display: inline-block;
      font-size: 11px;
      font-family: monospace;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 12px;
      margin-top: 10px;
    }
    .status-active {
      background: rgba(226, 0, 26, 0.25);
      color: #ff6b7b;
      border: 1px solid rgba(226, 0, 26, 0.5);
    }
    .status-closed {
      background: rgba(16, 185, 129, 0.2);
      color: #6ee7b7;
      border: 1px solid rgba(16, 185, 129, 0.5);
    }

    /* PANTALLA PUERTAS MISTERIOSAS */
    .doors-view { display: none; }
    .doors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .mystery-door {
      height: 250px;
      background: linear-gradient(180deg, #3d1b0c 0%, #1a0a04 100%);
      border: 4px solid #8b4513;
      border-radius: 140px 140px 14px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 24px 12px;
      cursor: pointer;
      position: relative;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), inset 0 0 25px rgba(0, 0, 0, 0.9);
      transition: all 0.3s;
      user-select: none;
    }
    .mystery-door:hover {
      transform: scale(1.04);
      border-color: var(--pumpkin-orange);
      box-shadow: 0 0 35px rgba(255, 122, 41, 0.5);
    }
    .mystery-door.opened {
      background: linear-gradient(180deg, #2a0845 0%, #150a24 100%);
      border-color: var(--claro-glow);
    }
    .door-knob {
      width: 22px;
      height: 22px;
      background: radial-gradient(circle, #ffd700, #b8860b);
      border-radius: 50%;
      border: 2px solid #5a3805;
      box-shadow: 0 2px 5px rgba(0,0,0,0.8);
    }
    .door-number {
      font-size: 32px;
      font-weight: 900;
      color: #ffd700;
      text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
    }

    /* TARJETA DE DUELO (ARENA) */
    .duel-card-container {
      display: none;
      background: rgba(20, 9, 33, 0.96);
      border: 2px solid var(--pumpkin-orange);
      border-radius: 28px;
      padding: 28px;
      margin-top: 30px;
      box-shadow: 0 0 60px rgba(0, 0, 0, 0.9);
    }
    .duel-arena {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin-top: 20px;
    }
    .duel-box {
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      padding: 22px;
    }
    .duel-box.box-rival { border-color: rgba(255, 122, 41, 0.5); }
    .duel-box.box-claro {
      border-color: rgba(226, 0, 26, 0.6);
      background: radial-gradient(circle at center, rgba(226, 0, 26, 0.12) 0%, rgba(0, 0, 0, 0.5) 100%);
    }

    /* MODAL GENERAL */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(10px);
      z-index: 500;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal-content {
      background: #1f1033;
      border: 2px solid var(--pumpkin-orange);
      border-radius: 26px;
      max-width: 600px;
      width: 100%;
      padding: 28px;
      box-shadow: 0 0 50px rgba(255, 122, 41, 0.35);
      position: relative;
      max-height: 90vh;
      overflow-y: auto;
    }
    .btn-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #fff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
    }
    .btn-action-primary {
      background: linear-gradient(135deg, var(--claro-red), var(--claro-glow));
      color: #fff;
      border: none;
      padding: 12px 24px;
      border-radius: 14px;
      font-weight: 800;
      font-size: 13px;
      cursor: pointer;
      text-transform: uppercase;
      box-shadow: 0 0 20px rgba(226, 0, 26, 0.45);
      transition: all 0.2s;
    }
    .btn-action-primary:disabled { opacity: 0.4; cursor: not-allowed; }

    /* TAROT 3 CARTAS VIDEOBEAM */
    .tarot-view { display: none; }
    .tarot-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin: 24px 0;
      perspective: 1400px;
    }
    .tarot-card-wrap {
      perspective: 1400px;
      min-height: 580px;
      cursor: pointer;
    }
    .tarot-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
      transform-style: preserve-3d;
      border-radius: 28px;
    }
    .tarot-inner.flipped {
      transform: rotateY(180deg);
    }
    .tarot-face {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      border-radius: 28px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 3px solid #ff7a29;
      background: radial-gradient(circle at 50% 25%, #24103a 0%, #120520 100%);
      box-shadow: 0 10px 40px rgba(0,0,0,0.8), inset 0 0 25px rgba(255,122,41,0.2);
    }
    .tarot-face.face-back {
      transform: rotateY(180deg);
      border-color: #ffd700;
      background: radial-gradient(circle at 50% 25%, #2b0816 0%, #0d0208 100%);
      box-shadow: 0 0 45px rgba(226,0,26,0.6), inset 0 0 30px rgba(255,215,0,0.25);
    }
    .tarot-face.is-ghost {
      border-color: #e2001a;
      box-shadow: 0 0 45px rgba(226,0,26,0.5), inset 0 0 30px rgba(226,0,26,0.3);
    }
  </style>
</head>
<body>
  <audio id="audio-theme" src="halloween-theme.mp3" loop preload="auto"></audio>

  <header>
    <div class="header-box">
      <div class="brand-wrap">
        <span style="font-size: 28px;">🎃</span>
        <div>
          <span style="font-size: 10px; color: var(--pumpkin-orange); text-transform: uppercase; font-weight: 700; letter-spacing: 1.5px; display: block;">Claro Colombia • Capacitación</span>
          <h1 class="font-cinzel" style="font-size: 18px; font-weight: 900; color: #fff;">Duelo de Ofertas de Halloween – Octubre</h1>
        </div>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button id="btn-tarot-mode" class="btn-top" onclick="openTarotView()" style="background: linear-gradient(135deg, #ffd700, #ff7a29); color: #000; border-color: #ffd700; font-weight: 900;">🎴 3 Cartas Tarot</button>
        <button id="btn-pwa-install" class="btn-top" onclick="triggerPwaInstall()">📱 Instalar App</button>
        <button id="btn-header-home" class="btn-top" onclick="showTrainerHome()">🏠 Inicio</button>
        <button id="btn-header-export" class="btn-top" onclick="downloadConfigJson()">💾 Exportar JSON</button>
      </div>
    </div>
  </header>

  <main>
    <!-- VISTA INICIAL DEL FORMADOR -->
    <div id="view-trainer-home">
      <div class="hero-box">
        <div class="spooky-elements">🌕 🦇 🎃 👻 🕸️ 🏰</div>
        <h2 class="hero-title font-cinzel">Duelo de Ofertas de Halloween – Octubre</h2>
        <p class="hero-sub font-cinzel">Simulador Comercial & Puertas Misteriosas</p>
      </div>

      <!-- TRES BOTONES PRINCIPALES INDEPENDIENTES -->
      <div class="trainer-buttons-grid">
        <!-- 1. Botón Actividad -->
        <div class="card-btn-action btn-activity" onclick="openSessionsView()">
          <div class="icon-circle">🚪</div>
          <h3 class="action-title font-cinzel">Actividad</h3>
          <p class="action-desc">Ingresa al panel de <strong>Sesiones</strong> simultáneas e independientes (Barranquilla, Santa Marta, Cartagena, Montería, Virtual).</p>
        </div>

        <!-- 2. Botón Editar actividad -->
        <div class="card-btn-action" onclick="openEditActivityModal()">
          <div class="icon-circle">✍️</div>
          <h3 class="action-title font-cinzel">Editar Actividad</h3>
          <p class="action-desc">Edita el texto, ofertas rivales y contraofertas de las tarjetas de duelo o añade nuevos casos comerciales.</p>
        </div>

        <!-- 3. Botón Sonido -->
        <div class="card-btn-action" onclick="openSoundModal()">
          <div class="icon-circle">🔊</div>
          <h3 class="action-title font-cinzel">Sonido</h3>
          <p class="action-desc">Anexa tu propio archivo de audio, controla el volumen o prueba los efectos tenebrosos de ambientación.</p>
        </div>
      </div>
    </div>

    <!-- PANTALLA: 3 CARTAS TAROT (VIDEOBEAM & PROYECCIÓN) -->
    <div id="view-tarot" class="tarot-view">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div>
          <span style="font-size: 11px; color: #ffd700; font-family: monospace; font-weight: 700; text-transform: uppercase;">✦ Arcanos de Halloween • Modo Videobeam ✦</span>
          <h2 id="tarot-scenario-title" class="font-cinzel" style="font-size: 28px; font-weight: 900; color: #fff;">Duelo de Ofertas: Triple Play</h2>
          <p id="tarot-scenario-subtitle" style="font-size: 14px; color: #ffaa40;">Compara las cartas del competidor y desvela la Carta Fantasma de Claro.</p>
        </div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn-top" onclick="switchTarotScenario(0)">Triple Play</button>
          <button class="btn-top" onclick="switchTarotScenario(1)">Doble Play</button>
          <button class="btn-top" onclick="switchTarotScenario(2)">Solo Internet</button>
          <button class="btn-top" onclick="resetTarotCards()" style="background: rgba(255, 122, 41, 0.2); border-color: #ff7a29;">↺ Reiniciar Cartas</button>
          <button class="btn-top" onclick="showTrainerHome()">← Volver</button>
        </div>
      </div>

      <div class="tarot-grid" id="tarot-cards-container">
        <!-- Renderizado dinámico vía JS -->
      </div>
    </div>

    <!-- PANTALLA: SESIONES -->
    <div id="view-sessions" class="sessions-view">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
        <div>
          <span style="font-size: 11px; color: var(--pumpkin-orange); font-family: monospace; font-weight: 700; text-transform: uppercase;">Módulo de Capacitación</span>
          <h2 class="font-cinzel" style="font-size: 26px; font-weight: 900; color: #fff;">Sesiones Disponibles</h2>
          <p style="font-size: 13px; color: rgba(243, 234, 211, 0.7);">Haz clic en cualquier sesión para ver su estado, compartir su enlace PWA o iniciar la actividad.</p>
        </div>
        <button class="btn-top" onclick="showTrainerHome()">← Volver al Menú</button>
      </div>

      <div class="sessions-grid" id="sessions-container">
        <!-- Renderizado dinámico vía JS -->
      </div>
    </div>

    <!-- PANTALLA: ACTIVIDAD PUERTAS MISTERIOSAS -->
    <div id="view-doors" class="doors-view">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div>
          <span id="activity-session-badge" style="font-size: 11px; color: var(--pumpkin-orange); font-family: monospace; font-weight: 700; text-transform: uppercase;">Sesión Activa</span>
          <h2 id="activity-session-title" class="font-cinzel" style="font-size: 28px; font-weight: 900; color: #fff;">Puertas Misteriosas</h2>
          <p style="font-size: 13px; color: rgba(243, 234, 211, 0.7);">Elige una puerta para desvelar la oferta rival y el contraataque del Fantasma Claro.</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn-top" onclick="resetDoors()" style="background: rgba(255, 122, 41, 0.2); border-color: rgba(255, 122, 41, 0.5);">↺ Reiniciar Puertas</button>
          <button class="btn-top" onclick="exitDoorsActivity()" style="background: rgba(226, 0, 26, 0.25); border-color: rgba(226, 0, 26, 0.6); color: #ff7a88;">🚪 Salir</button>
        </div>
      </div>

      <!-- Cuadrícula de Puertas -->
      <div class="doors-grid" id="doors-container">
        <!-- Renderizado dinámico vía JS -->
      </div>

      <!-- Zona del Duelo Desvelado -->
      <div class="duel-card-container" id="duel-display-card">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
          <span id="duel-door-tag" class="font-cinzel" style="color: var(--pumpkin-orange); font-weight: 900; font-size: 18px;">Puerta Revelada</span>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-family: monospace; font-size: 12px; color: #fff;">⏱ Cronómetro: <strong id="speech-timer-val" style="color: #ffaa40; font-size: 16px;">45s</strong></span>
            <button class="btn-top" onclick="startSpeechTimer()">▶ Iniciar</button>
            <button class="btn-top" onclick="resetSpeechTimer()">↺ 45s</button>
          </div>
        </div>

        <div style="background: rgba(255, 122, 41, 0.15); border: 1px solid rgba(255, 122, 41, 0.4); border-radius: 14px; padding: 12px 16px; margin-bottom: 20px;">
          <strong style="color: #ffaa40; font-size: 12px; display: block;">🎯 RETO PARA EL ASESOR:</strong>
          <p id="duel-question-text" style="font-size: 14px; margin-top: 4px; color: #fff;"></p>
        </div>

        <div class="duel-arena">
          <!-- Competidor Rival -->
          <div class="duel-box box-rival">
            <span style="font-size: 11px; color: #ff7a29; font-weight: 700; text-transform: uppercase;">🎃 Oferta Competidor</span>
            <h3 id="duel-rival-name" class="font-cinzel" style="font-size: 22px; color: #fff; margin: 6px 0;"></h3>
            <div style="font-size: 28px; font-weight: 900; color: #ff7a29; margin: 10px 0;" id="duel-rival-price"></div>
            <p id="duel-rival-data" style="font-size: 13px; color: rgba(243, 234, 211, 0.8); margin-bottom: 12px;"></p>
            <ul id="duel-rival-features" style="font-size: 13px; list-style: none; display: flex; flex-direction: column; gap: 6px;"></ul>
            <div style="margin-top: 16px; background: rgba(127, 29, 29, 0.35); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 12px; padding: 10px; font-size: 12px; color: #fca5a5;">
              <strong>⚠ Trampa oculta:</strong> <span id="duel-rival-trap"></span>
            </div>
          </div>

          <!-- Fantasma Claro -->
          <div class="duel-box box-claro">
            <span style="font-size: 11px; color: #ff5a6a; font-weight: 700; text-transform: uppercase;">👻 Contraoferta Fantasma Claro</span>
            <h3 id="duel-claro-name" class="font-cinzel" style="font-size: 22px; color: #fff; margin: 6px 0;"></h3>
            <div style="font-size: 28px; font-weight: 900; color: #ff5a6a; margin: 10px 0;" id="duel-claro-price"></div>
            <p id="duel-claro-data" style="font-size: 13px; color: #4ade80; margin-bottom: 12px; font-weight: 700;"></p>
            <ul id="duel-claro-features" style="font-size: 13px; list-style: none; display: flex; flex-direction: column; gap: 6px;"></ul>
            <div style="margin-top: 16px; background: rgba(6, 78, 59, 0.4); border: 1px solid rgba(16, 185, 129, 0.5); border-radius: 12px; padding: 12px; font-size: 13px; color: #6ee7b7; font-style: italic;">
              <strong style="display: block; color: #34d399; font-style: normal; margin-bottom: 4px;">💬 Speech Asesor Ganador:</strong>
              <span id="duel-claro-pitch"></span>
            </div>
          </div>
        </div>

        <div style="margin-top: 25px; text-align: center;">
          <button class="btn-action-primary font-cinzel" onclick="celebrateClaroWin()">
            🏆 ¡Cierre Exitoso Claro en esta Puerta!
          </button>
        </div>
      </div>
    </div>
  </main>

  <!-- MODAL: VENTANA DE SESIÓN -->
  <div id="modal-session" class="modal-overlay">
    <div class="modal-content">
      <button class="btn-close" onclick="closeModal('modal-session')">✕</button>
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
        <span style="font-size: 32px;">📍</span>
        <div>
          <span style="font-size: 10px; color: var(--pumpkin-orange); text-transform: uppercase; font-family: monospace;">Detalles de la Mesa</span>
          <h3 id="modal-session-title" class="font-cinzel" style="font-size: 22px; color: #fff;"></h3>
        </div>
      </div>

      <!-- Selector de Estado -->
      <div style="background: rgba(0, 0, 0, 0.4); padding: 14px; border-radius: 16px; margin-bottom: 18px; border: 1px solid rgba(255,255,255,0.1);">
        <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 8px;">Estado de la sesión:</label>
        <div style="display: flex; gap: 10px;">
          <button id="btn-status-closed" class="btn-top" onclick="setModalSessionStatus('closed')">
            🟢 Cerrado (disponible)
          </button>
          <button id="btn-status-active" class="btn-top" onclick="setModalSessionStatus('active')">
            🔴 Activo (en uso)
          </button>
        </div>
        <p id="modal-status-notice" style="font-size: 11px; margin-top: 8px; color: rgba(243, 234, 211, 0.7);"></p>
      </div>

      <!-- Enviar Enlace PWA -->
      <div style="background: rgba(0, 0, 0, 0.4); padding: 14px; border-radius: 16px; margin-bottom: 22px; border: 1px solid rgba(255,255,255,0.1);">
        <label style="font-size: 12px; font-weight: 700; display: block; margin-bottom: 6px;">Enviar enlace directo PWA a los participantes:</label>
        <div style="display: flex; gap: 8px;">
          <input type="text" id="input-session-url" readonly style="flex: 1; background: #000; border: 1px solid rgba(255,255,255,0.2); padding: 8px 12px; border-radius: 10px; color: #ffaa40; font-family: monospace; font-size: 12px;">
          <button class="btn-top" onclick="copySessionUrl()">Copiar</button>
          <button class="btn-top" onclick="shareSessionUrl()">Compartir</button>
        </div>
        <span style="font-size: 10px; color: rgba(243,234,211,0.5); display: block; margin-top: 4px;">Al abrir este enlace, los asesores entran directamente a la actividad de esta ciudad.</span>
      </div>

      <!-- Botón INICIAR -->
      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button class="btn-top" onclick="closeModal('modal-session')">Cancelar</button>
        <button id="btn-start-session" class="btn-action-primary font-cinzel" onclick="startCurrentSession()">
          ▶ INICIAR
        </button>
      </div>
    </div>
  </div>

  <!-- MODAL: CONTROL DE SONIDO -->
  <div id="modal-sound" class="modal-overlay">
    <div class="modal-content">
      <button class="btn-close" onclick="closeModal('modal-sound')">✕</button>
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
        <span style="font-size: 32px;">🎵</span>
        <div>
          <span style="font-size: 10px; color: var(--pumpkin-orange); text-transform: uppercase;">Módulo de Audio</span>
          <h3 class="font-cinzel" style="font-size: 22px; color: #fff;">Control de Sonido</h3>
        </div>
      </div>

      <div style="background: rgba(0,0,0,0.4); border-radius: 14px; padding: 14px; margin-bottom: 16px;">
        <span style="font-size: 12px; display: block; margin-bottom: 4px;">Pista cargada:</span>
        <strong id="sound-track-name" style="font-size: 14px; color: #fff;">halloween-theme.mp3 (Predeterminada)</strong>
      </div>

      <!-- Volumen Slider -->
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px;">
          <span>Volumen</span>
          <span id="volume-val-display" style="color: #ffaa40; font-weight: 700;">80%</span>
        </div>
        <input type="range" id="sound-volume-slider" min="0" max="1" step="0.02" value="0.8" style="width: 100%; accent-color: var(--pumpkin-orange);" oninput="handleVolumeSlider(this.value)">
      </div>

      <!-- Controles de Audio -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
        <button id="btn-test-sound" class="btn-top" style="justify-content: center; padding: 12px;" onclick="toggleTestSound()">▶ Probar Sonido</button>
        <button class="btn-top" style="justify-content: center; padding: 12px;" onclick="stopSound()">■ Detener</button>
      </div>

      <!-- Anexar y Quitar -->
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button class="btn-top" style="justify-content: center; padding: 12px; background: rgba(255, 122, 41, 0.2); border-color: rgba(255, 122, 41, 0.5);" onclick="document.getElementById('input-file-audio').click()">
          📁 Anexar Archivo de Sonido (.mp3, .wav)
        </button>
        <input type="file" id="input-file-audio" accept="audio/*" style="display: none;" onchange="handleAudioUpload(this)">
        <button class="btn-top" style="justify-content: center; color: #fca5a5;" onclick="removeCustomSound()">
          🗑 Quitar Sonido Cargado
        </button>
      </div>
    </div>
  </div>

  <!-- SCRIPT DE LOGICA COMPLETO -->
  <script>
    const SESSIONS_DATA = [
      { id: 'barranquilla', name: 'Barranquilla', status: 'closed' },
      { id: 'santa-marta', name: 'Santa Marta', status: 'closed' },
      { id: 'cartagena', name: 'Cartagena', status: 'closed' },
      { id: 'monteria', name: 'Montería', status: 'closed' },
      { id: 'virtual', name: 'Virtual', status: 'closed' }
    ];

    let duelCards = [
      {
        door: 1,
        title: 'Competidor Plan Brujo VS Fantasma Claro',
        question: '¿Cómo contraatacas al cliente que cree que la oferta rival es más completa por tener HBO?',
        rival: { name: 'Competidor Plan Brujo', price: '$149.900', data: '500 Megas Simétricas', features: ['125 Canales HD con 2 decos', 'Telefonía fija', 'HBO por 12 meses', 'Paramount+ por 12 meses'], trap: 'Pagas $149.900 y al mes 13 el streaming sube de precio.' },
        claro: { name: 'Fantasma Claro Triple Play', price: '$139.900', data: '500 Megas Simétricas', features: ['Ahorro de $10.000 mensual ($120.000/año)', 'Paramount+ y HBO permanente sin caducidad', 'Deco Claro TV+ Android 4K', 'Telefonía ilimitada y Claro Club'], pitch: '«Con Claro te ahorras $120.000 al año, no te quitamos las plataformas al mes 12 y tienes el deco Claro TV+ con Android.»' }
      },
      {
        door: 2,
        title: 'Competidor Plan Sepulcro VS Fantasma Claro',
        question: '¿Qué argumento usas si el cliente teme cambiar de operador por una penalización?',
        rival: { name: 'Competidor Plan Sepulcro', price: '$109.200', data: '500 Megas Asimétricas', features: ['Internet básico + TV analógica', 'Deco extra con cobro mensual', 'Sin plataformas SVOD de regalo', 'Permanencia forzosa estricta'], trap: 'Penalidad oculta de cancelación y cobro recurrente por el deco.' },
        claro: { name: 'Fantasma Claro Doble Play', price: '$99.900', data: '500 Megas Simétricas', features: ['Ahorro mensual de $9.300', 'Claro video con Paramount+ y Universal+', 'Sin costos ocultos de decodificador', 'Claro Drive 25 GB en la nube gratis'], pitch: '«¿Por qué pagar $109.200 por TV analógica cuando en Claro por $99.900 tienes 500 Megas simétricas, deco 4K y Universal+ de regalo?»' }
      },
      {
        door: 3,
        title: 'Competidor Plan Sombras VS Fantasma Claro',
        question: '¿Cómo demuestras el ahorro real a quien solo cotiza megas y no cuenta el streaming?',
        rival: { name: 'Competidor Plan Sombras', price: '$84.900', data: '500 Megas Simétricas', features: ['Solo internet', 'Cero apps incluidas', 'Sin almacenamiento en la nube', 'Sin beneficios en líneas móviles'], trap: 'Aparenta ser más barato, pero el cliente termina contratando streaming por separado pagando más de $45.000 extras.' },
        claro: { name: 'Fantasma Claro Fibra + App Regalo', price: '$89.900', data: '500 / 900 Megas Simétricas', features: ['Elige 1 app de regalo: Netflix, WIN, Max o Disney', 'Universal+ y Claro video incluidos', 'Opción de escalar hasta 900 Megas', 'Ahorro real superior a $35.000/mes'], pitch: '«Por solo $5.000 de diferencia frente a su plan vacío, en Claro te regalamos Netflix o WIN Sports+ y Universal+, ahorrándote más de $35.000 en suscripciones cada mes.»' }
      }
    ];

    let currentSessionId = 'cartagena';
    let openedDoors = new Set();
    let speechTimerInterval = null;
    let speechTime = 45;
    let deferredPrompt = null;

    // Inicialización
    window.addEventListener('DOMContentLoaded', () => {
      loadSavedState();
      renderSessions();
      renderDoors();

      // Chequear si viene por URL con ?sesion=...
      const urlParams = new URLSearchParams(window.location.search);
      const sessionParam = urlParams.get('sesion') || urlParams.get('session');
      if (sessionParam) {
        const found = SESSIONS_DATA.find(s => s.name.toLowerCase() === sessionParam.toLowerCase() || s.id.toLowerCase() === sessionParam.toLowerCase());
        if (found) {
          currentSessionId = found.id;
          launchDoorsActivity(found);
        }
      }

      // Escuchar evento PWA
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
      });
    });

    function loadSavedState() {
      const saved = localStorage.getItem('claro_octubre_sessions_state');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          parsed.forEach(p => {
            const match = SESSIONS_DATA.find(s => s.id === p.id);
            if (match) match.status = p.status;
          });
        } catch(e) {}
      }
    }

    function saveState() {
      localStorage.setItem('claro_octubre_sessions_state', JSON.stringify(SESSIONS_DATA));
    }

    function showTrainerHome() {
      document.getElementById('view-trainer-home').style.display = 'block';
      document.getElementById('view-sessions').style.display = 'none';
      document.getElementById('view-doors').style.display = 'none';
      document.getElementById('view-tarot').style.display = 'none';
    }

    const TAROT_SCENARIOS = [
      {
        title: 'Duelo 1: Triple Play Hogar',
        subtitle: 'Internet Fibra + Televisión Digital + Telefonía / Móvil',
        cards: [
          { number: 'I', title: 'EL BRUJO', name: 'Competidor Plan Brujo', price: '$149.900', period: '/mes', speed: '500M Simétricas', badge: 'Triple Play Rival', isGhost: false, features: ['Internet + TV Avanzada + Celular', 'Canales: 125 HD / 27 SD', '2 Decodificadores', 'Paramount+ y HBO (Solo 12 meses)'], verdict: 'Al mes 13 las apps caducan y cobran extra.' },
          { number: 'II', title: 'EL SEPULCRO', name: 'Competidor Plan Sepulcro', price: '$109.200', period: '/mes', speed: '500 Megas', badge: 'Dúo Internet + TV', isGhost: false, features: ['Dúo Internet + TV Digital', '125 Canales HD – 27 SD', 'Sin plataformas SVOD de regalo', 'Permanencia obligatoria'], verdict: 'Sin streaming; el cliente gasta más comprándolo aparte.' },
          { number: '★', title: 'LA CARTA FANTASMA', name: 'Fantasma Claro Triple Play', price: '$131.900', period: '/mes', speed: '500/900M Simétricas', badge: '¡CONTRAOFERTA GANADORA!', isGhost: true, features: ['Internet + TV superior + fija por $131.900', '276 Canales (173 SD + 103 HD) + Emisoras', '1 Deco HD + 1 Deco Digital incluido', 'Elige 2 apps: Netflix+WIN, Max+Disney', 'Universal+ + Atres Player + Claro video', 'Asistencia médica/pets + McAfee (3 equipos)'], verdict: '¡Ahorro de $18.000/mes ($216.000/año) frente al Plan Brujo y 2 Apps de regalo!' }
        ]
      },
      {
        title: 'Duelo 2: Doble Play Hogar',
        subtitle: 'Internet Fibra Óptica + Televisión Digital Intermedia Plus',
        cards: [
          { number: 'I', title: 'EL SEPULCRO', name: 'Competidor Plan Sepulcro', price: '$109.200', period: '/mes', speed: '500 Megas', badge: 'Duo Internet + TV', isGhost: false, features: ['Dúo Internet + TV Digital', 'Canales: 125 HD – 27 SD', 'Sin plataformas streaming', 'Deco básico sin funciones Smart'], verdict: 'Pagas $109.200 por TV estándar sin apps.' },
          { number: 'II', title: 'LAS SOMBRAS', name: 'Competidor Plan Sombras', price: '$84.900', period: '/mes', speed: '500M Simétricas', badge: 'Solo Internet', isGhost: false, features: ['Solo internet básico', 'Cero canales de televisión', 'Sin decodificadores ni apps', 'Streaming se paga aparte'], verdict: 'Plan incompleto sin televisión familiar.' },
          { number: '★', title: 'LA CARTA FANTASMA', name: 'Fantasma Claro Doble Play Plus', price: '$104.900', period: '/mes', speed: '500/900M Simétricas', badge: '¡CONTRAOFERTA GANADORA!', isGhost: true, features: ['Doble Internet + TV intermedia plus $104.900', '72 Canales HD + 2 Emisoras y Música', '1 Deco HD incluido con guía interactiva', 'Elige 1 app: Netflix, WIN, Max, Disney', 'Universal+ + Atres Player + Claro video', '1 Asistencia médica/pets + Claro Drive'], verdict: '¡Más barato que el rival ($104.900 vs $109.200) con 1 App + Universal+ gratis!' }
        ]
      },
      {
        title: 'Duelo 3: Sencillo Solo Internet Fibra',
        subtitle: 'Conexión Pura de Alta Velocidad + Apps de Video de Regalo',
        cards: [
          { number: 'I', title: 'LAS SOMBRAS', name: 'Competidor Plan Sombras', price: '$84.900', period: '/mes', speed: '500M Simétricas', badge: 'Solo Internet Rival', isGhost: false, features: ['500 Megas Simétricas', 'Sin apps de video incluidas', 'Sin almacenamiento en la nube', 'Sin lealtad ni beneficios móviles'], verdict: 'Sin ningún contenido de streaming.' },
          { number: 'II', title: 'EL ESPEJISMO', name: 'Competidor Plan Espejismo', price: '$92.000', period: '/mes', speed: '500M Bajada / 50M Subida', badge: 'Asimétrico', isGhost: false, features: ['Subida reducida al 10%', 'Router antiguo sin 5 GHz', 'Sin plataformas de streaming', 'Cobro por visitas técnicas'], verdict: 'Red asimétrica que se satura al jugar o en videollamadas.' },
          { number: '★', title: 'LA CARTA FANTASMA', name: 'Fantasma Claro Sencillo', price: '$89.900', period: '/mes', speed: '500/900M Simétricas', badge: '¡CONTRAOFERTA GANADORA!', isGhost: true, features: ['500 / 900 Megas Simétricas Reales', 'Elige 1 app: Netflix, WIN, Max, Disney', 'Universal+ + Atres Player + Claro video', 'Claro Drive para fotos y archivos en la nube', 'Claro Club con 2x1 en cines y descuentos', 'Módem Dual Band Wi-Fi de última generación'], verdict: '¡Por solo $5.000 más recibes Netflix o WIN y Universal+, ahorrando $35.000/mes!' }
        ]
      }
    ];

    let currentTarotCardIdx = 0;
    let isCompetitorFlipped = false;
    let isGhostFlipped = false;

    function openTarotView() {
      document.getElementById('view-trainer-home').style.display = 'none';
      document.getElementById('view-sessions').style.display = 'none';
      document.getElementById('view-doors').style.display = 'none';
      document.getElementById('view-tarot').style.display = 'block';
      renderTarotCards();
    }

    function switchTarotScenario(idx) {
      currentTarotCardIdx = idx;
      isCompetitorFlipped = false;
      isGhostFlipped = false;
      renderTarotCards();
    }

    function resetTarotCards() {
      isCompetitorFlipped = false;
      isGhostFlipped = false;
      renderTarotCards();
    }

    function flipCompetitorCard() {
      isCompetitorFlipped = !isCompetitorFlipped;
      renderTarotCards();
    }

    function flipGhostCard() {
      isGhostFlipped = !isGhostFlipped;
      renderTarotCards();
      if (isGhostFlipped && window.confetti) {
        window.confetti({ particleCount: 110, spread: 85, origin: { y: 0.55 }, colors: ['#e2001a', '#ffd700', '#ff7a29'] });
      }
    }

    function renderTarotCards() {
      const card = duelCards[currentTarotCardIdx] || duelCards[0];
      document.getElementById('tarot-scenario-title').textContent = \`Duelo Puerta \${card.door}: \${card.title}\`;
      document.getElementById('tarot-scenario-subtitle').textContent = 'Compara la tarjeta competidor seleccionada vs la contraoferta de Claro';

      const container = document.getElementById('tarot-cards-container');
      container.innerHTML = \`
        <!-- 1. Tarjeta Competidor Seleccionada -->
        <div class="tarot-card-wrap" onclick="flipCompetitorCard()">
          <div class="tarot-inner \${isCompetitorFlipped ? 'flipped' : ''}">
            <div class="tarot-face">
              <div style="text-align: center;">
                <span style="font-size: 11px; font-family: monospace; color: #ffaa40; font-weight: 700;">🎃 OFERTA RIVAL • PUERTA \${card.door}</span>
                <h3 class="font-cinzel" style="font-size: 24px; color: #fff; margin-top: 4px;">\${card.rival.name}</h3>
              </div>
              <div style="text-align: center; margin: auto;">
                <div style="font-size: 72px; margin-bottom: 12px; filter: drop-shadow(0 0 20px rgba(255,122,41,0.6));">🎃</div>
                <span class="font-cinzel" style="font-size: 12px; color: #ffaa40; font-weight: 700;">TARJETA COMPETIDOR SELECCIONADA</span>
              </div>
              <div style="text-align: center; background: rgba(0,0,0,0.5); padding: 8px; border-radius: 12px; border: 1px solid rgba(255,122,41,0.3);">
                <span class="font-cinzel" style="font-size: 11px; color: #fff;">TOCA PARA VOLTEAR</span>
              </div>
            </div>

            <div class="tarot-face face-back" style="border-color: #ff7a29; background: radial-gradient(circle at 50% 25%, #291204 0%, #0a0301 100%);">
              <div>
                <span style="font-size: 10px; font-family: monospace; font-weight: 900; background: #ff7a29; color: #fff; padding: 2px 8px; border-radius: 8px;">COMPETIDOR</span>
                <h3 class="font-cinzel" style="font-size: 24px; font-weight: 900; color: #fff; line-height: 1.1; margin-top: 6px;">\${card.rival.name}</h3>
                <div style="font-size: 38px; font-weight: 900; color: #ff7a29; margin: 8px 0; font-family: 'Cinzel', serif;">
                  \${card.rival.price} <span style="font-size: 13px; font-weight: 400; color: rgba(243,234,211,0.7);">\${card.rival.data}</span>
                </div>
              </div>
              <div style="flex: 1; margin: 10px 0; overflow-y: auto;">
                <ul style="list-style: none; font-size: 13px; display: flex; flex-direction: column; gap: 7px;">
                  \${card.rival.features.map(f => \`<li><span style="color: #10b981; font-weight: 900;">✓</span> \${f}</li>\`).join('')}
                </ul>
              </div>
              <div style="background: rgba(127,29,29,0.35); border: 1px solid #ef4444; border-radius: 12px; padding: 10px; font-size: 12px; color: #fca5a5;">
                <strong>⚠ Trampa oculta:</strong> \${card.rival.trap}
              </div>
            </div>
          </div>
        </div>

        <!-- 2. La Contraoferta de Claro (Tarjeta Fantasma) -->
        <div class="tarot-card-wrap" onclick="flipGhostCard()">
          <div class="tarot-inner \${isGhostFlipped ? 'flipped' : ''}">
            <div class="tarot-face is-ghost">
              <div style="text-align: center;">
                <span style="font-size: 11px; font-family: monospace; color: #ffd700; font-weight: 700;">★ EL ARCANO GANADOR ★</span>
                <h3 class="font-cinzel" style="font-size: 24px; color: #fff; margin-top: 4px;">LA CARTA FANTASMA CLARO</h3>
              </div>
              <div style="text-align: center; margin: auto;">
                <div style="font-size: 72px; margin-bottom: 12px; filter: drop-shadow(0 0 25px rgba(226,0,26,0.8));">👻</div>
                <span class="font-cinzel" style="font-size: 12px; color: #ffd700; font-weight: 700;">CONTRAOFERTA IMBATIBLE CLARO</span>
              </div>
              <div style="text-align: center; background: rgba(226,0,26,0.3); padding: 8px; border-radius: 12px; border: 1px solid rgba(255,215,0,0.4);">
                <span class="font-cinzel" style="font-size: 11px; color: #ffd700; font-weight: 700;">TOCA PARA REVELAR TRIUNFO</span>
              </div>
            </div>

            <div class="tarot-face face-back">
              <div>
                <span style="font-size: 10px; font-family: monospace; font-weight: 900; background: #e2001a; color: #fff; padding: 2px 8px; border-radius: 8px;">¡CONTRAOFERTA GANADORA!</span>
                <h3 class="font-cinzel" style="font-size: 24px; font-weight: 900; color: #fff; line-height: 1.1; margin-top: 6px;">\${card.claro.name}</h3>
                <div style="font-size: 38px; font-weight: 900; color: #ffd700; margin: 8px 0; font-family: 'Cinzel', serif;">
                  \${card.claro.price} <span style="font-size: 13px; font-weight: 400; color: rgba(243,234,211,0.7);">\${card.claro.data}</span>
                </div>
              </div>
              <div style="flex: 1; margin: 10px 0; overflow-y: auto;">
                <ul style="list-style: none; font-size: 13px; display: flex; flex-direction: column; gap: 7px;">
                  \${card.claro.features.map(f => \`<li><span style="color: #ffd700; font-weight: 900;">✓</span> \${f}</li>\`).join('')}
                </ul>
              </div>
              <div style="background: rgba(226,0,26,0.3); border: 1px solid #ffd700; border-radius: 12px; padding: 10px; font-size: 12px; color: #fff;">
                <strong>💬 Speech Ganador:</strong> \${card.claro.pitch}
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    function openSessionsView() {
      document.getElementById('view-trainer-home').style.display = 'none';
      document.getElementById('view-sessions').style.display = 'block';
      document.getElementById('view-doors').style.display = 'none';
      renderSessions();
    }

    function renderSessions() {
      const container = document.getElementById('sessions-container');
      container.innerHTML = SESSIONS_DATA.map(s => {
        const isActive = s.status === 'active';
        return \`
          <div class="session-card" onclick="openSessionModal('\${s.id}')">
            <span style="font-size: 28px;">📍</span>
            <h3 class="font-cinzel" style="font-size: 18px; color: #fff; margin-top: 8px;">\${s.name}</h3>
            <span class="status-badge \${isActive ? 'status-active' : 'status-closed'}">
              \${isActive ? '🔴 Activo (en uso)' : '🟢 Cerrado (disponible)'}
            </span>
          </div>
        \`;
      }).join('');
    }

    function openSessionModal(sessionId) {
      currentSessionId = sessionId;
      const s = SESSIONS_DATA.find(item => item.id === sessionId);
      if (!s) return;

      document.getElementById('modal-session-title').textContent = \`Sesión: \${s.name}\`;
      const pwaUrl = \`\${window.location.origin}\${window.location.pathname}?sesion=\${s.name}\`;
      document.getElementById('input-session-url').value = pwaUrl;

      updateModalStatusUI(s.status);
      document.getElementById('modal-session').style.display = 'flex';
    }

    function updateModalStatusUI(status) {
      const btnActive = document.getElementById('btn-status-active');
      const btnClosed = document.getElementById('btn-status-closed');
      const btnStart = document.getElementById('btn-start-session');
      const notice = document.getElementById('modal-status-notice');

      if (status === 'active') {
        btnActive.style.background = 'rgba(226, 0, 26, 0.4)';
        btnActive.style.borderColor = '#ff5a6a';
        btnClosed.style.background = 'rgba(255, 255, 255, 0.1)';
        btnClosed.style.borderColor = 'transparent';
        btnStart.disabled = true;
        btnStart.textContent = '🔒 BLOQUEADO (Sesión en Uso)';
        notice.textContent = '⚠ Esta sesión está actualmente en uso. Para iniciar, debe cambiarse a Cerrado.';
        notice.style.color = '#fca5a5';
      } else {
        btnClosed.style.background = 'rgba(16, 185, 129, 0.3)';
        btnClosed.style.borderColor = '#34d399';
        btnActive.style.background = 'rgba(255, 255, 255, 0.1)';
        btnActive.style.borderColor = 'transparent';
        btnStart.disabled = false;
        btnStart.textContent = '▶ INICIAR ACTIVIDAD';
        notice.textContent = '✓ Sesión disponible. Al hacer clic en INICIAR se marcará como Activo.';
        notice.style.color = '#86efac';
      }
    }

    function setModalSessionStatus(status) {
      const s = SESSIONS_DATA.find(item => item.id === currentSessionId);
      if (s) {
        s.status = status;
        saveState();
        renderSessions();
        updateModalStatusUI(status);
      }
    }

    function copySessionUrl() {
      const inp = document.getElementById('input-session-url');
      inp.select();
      navigator.clipboard.writeText(inp.value);
      alert('¡Enlace PWA de la sesión copiado al portapapeles!');
    }

    function shareSessionUrl() {
      const url = document.getElementById('input-session-url').value;
      if (navigator.share) {
        navigator.share({ title: 'Duelo de Ofertas Claro', url });
      } else {
        copySessionUrl();
      }
    }

    function startCurrentSession() {
      const s = SESSIONS_DATA.find(item => item.id === currentSessionId);
      if (!s) return;
      s.status = 'active';
      saveState();
      renderSessions();
      closeModal('modal-session');
      launchDoorsActivity(s);
    }

    function launchDoorsActivity(session) {
      document.getElementById('view-trainer-home').style.display = 'none';
      document.getElementById('view-sessions').style.display = 'none';
      document.getElementById('view-doors').style.display = 'block';

      document.getElementById('activity-session-title').textContent = \`Sesión \${session.name} • Puertas Misteriosas\`;
      document.getElementById('activity-session-badge').textContent = \`Estado: ACTIVO • \${session.name}\`;
      renderDoors();
    }

    function renderDoors() {
      const container = document.getElementById('doors-container');
      container.innerHTML = duelCards.map((card, idx) => {
        const isOpened = openedDoors.has(card.door);
        return \`
          <div class="mystery-door \${isOpened ? 'opened' : ''}" onclick="selectDoor(\${card.door})">
            <span style="font-size: 24px;">\${isOpened ? '👻' : '🦇'}</span>
            <div class="door-number font-cinzel">\${card.door}</div>
            <div class="door-knob"></div>
            <span class="font-cinzel" style="font-size: 11px; color: #ffaa40; font-weight: 700;">
              \${isOpened ? 'ABIERTA' : 'TOCA PARA ABRIR'}
            </span>
          </div>
        \`;
      }).join('');
    }

    function selectDoor(doorNum) {
      openedDoors.add(doorNum);
      renderDoors();
      const card = duelCards.find(c => c.door === doorNum) || duelCards[0];
      displayDuelCard(card);
    }

    function displayDuelCard(card) {
      const container = document.getElementById('duel-display-card');
      container.style.display = 'block';

      document.getElementById('duel-door-tag').textContent = \`🚪 Puerta \${card.door}: \${card.title}\`;
      document.getElementById('duel-question-text').textContent = card.question;

      document.getElementById('duel-rival-name').textContent = card.rival.name;
      document.getElementById('duel-rival-price').textContent = card.rival.price;
      document.getElementById('duel-rival-data').textContent = card.rival.data;
      document.getElementById('duel-rival-features').innerHTML = card.rival.features.map(f => \`<li><span style="color: #10b981; font-weight: 900;">✓</span> \${f}</li>\`).join('');
      document.getElementById('duel-rival-trap').textContent = card.rival.trap;

      document.getElementById('duel-claro-name').textContent = card.claro.name;
      document.getElementById('duel-claro-price').textContent = card.claro.price;
      document.getElementById('duel-claro-data').textContent = card.claro.data;
      document.getElementById('duel-claro-features').innerHTML = card.claro.features.map(f => \`<li><span style="color: #10b981; font-weight: 900;">✓</span> \${f}</li>\`).join('');
      document.getElementById('duel-claro-pitch').textContent = card.claro.pitch;

      resetSpeechTimer();
      container.scrollIntoView({ behavior: 'smooth' });
    }

    function resetDoors() {
      openedDoors.clear();
      renderDoors();
      document.getElementById('duel-display-card').style.display = 'none';
      resetSpeechTimer();
    }

    function exitDoorsActivity() {
      if (confirm('¿Deseas salir de la actividad de puertas? Puedes marcar la sesión como Cerrada para liberarla.')) {
        const s = SESSIONS_DATA.find(item => item.id === currentSessionId);
        if (s && confirm('¿Deseas marcar la sesión como CERRADA (disponible)?')) {
          s.status = 'closed';
          saveState();
        }
        openSessionsView();
      }
    }

    function startSpeechTimer() {
      clearInterval(speechTimerInterval);
      speechTimerInterval = setInterval(() => {
        if (speechTime > 0) {
          speechTime--;
          document.getElementById('speech-timer-val').textContent = \`\${speechTime}s\`;
        } else {
          clearInterval(speechTimerInterval);
          alert('¡Tiempo de respuesta y cierre de venta cumplido!');
        }
      }, 1000);
    }

    function resetSpeechTimer() {
      clearInterval(speechTimerInterval);
      speechTime = 45;
      const el = document.getElementById('speech-timer-val');
      if (el) el.textContent = '45s';
    }

    function celebrateClaroWin() {
      if (window.confetti) {
        window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      alert('🎉 ¡Excelente contraataque y cierre comercial registrado para Claro!');
    }

    // SONIDO
    function openSoundModal() {
      document.getElementById('modal-sound').style.display = 'flex';
    }

    function handleVolumeSlider(val) {
      const audio = document.getElementById('audio-theme');
      audio.volume = parseFloat(val);
      document.getElementById('volume-val-display').textContent = \`\${Math.round(val * 100)}%\`;
    }

    function toggleTestSound() {
      const audio = document.getElementById('audio-theme');
      const btn = document.getElementById('btn-test-sound');
      if (audio.paused) {
        audio.play().then(() => {
          btn.textContent = '⏸ Pausar';
        }).catch(() => alert('Toca la pantalla primero para permitir la reproducción de audio.'));
      } else {
        audio.pause();
        btn.textContent = '▶ Probar Sonido';
      }
    }

    function stopSound() {
      const audio = document.getElementById('audio-theme');
      audio.pause();
      audio.currentTime = 0;
      document.getElementById('btn-test-sound').textContent = '▶ Probar Sonido';
    }

    function handleAudioUpload(input) {
      const file = input.files[0];
      if (file) {
        const audio = document.getElementById('audio-theme');
        audio.src = URL.createObjectURL(file);
        document.getElementById('sound-track-name').textContent = file.name;
        audio.play().catch(() => {});
        document.getElementById('btn-test-sound').textContent = '⏸ Pausar';
        alert('¡Archivo de sonido cargado exitosamente!');
      }
    }

    function removeCustomSound() {
      const audio = document.getElementById('audio-theme');
      audio.pause();
      audio.src = 'halloween-theme.mp3';
      document.getElementById('sound-track-name').textContent = 'halloween-theme.mp3 (Predeterminada)';
      alert('Se ha restablecido el sonido predeterminado.');
    }

    function openEditActivityModal() {
      alert('Para editar las tarjetas o agregar nuevas ofertas, utiliza el editor interactivo de la versión PWA o el archivo JSON exportado.');
    }

    function closeModal(id) {
      document.getElementById(id).style.display = 'none';
    }

    function downloadConfigJson() {
      const data = {
        app: 'Duelo de Ofertas de Halloween – Octubre',
        date: new Date().toISOString(),
        sessions: SESSIONS_DATA,
        cards: duelCards
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'configuracion-halloween.json';
      a.click();
    }

    function triggerPwaInstall() {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
      } else {
        alert('Para instalar en tu celular o computador: toca los 3 puntos (⋮) en tu navegador y selecciona "Instalar aplicación" o "Agregar a pantalla de inicio".');
      }
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  </script>
</body>
</html>`;
}

/**
 * Packs the whole ready-to-deploy GitHub Pages package into a zip file
 */
export async function downloadFullHtmlBundleZip(): Promise<void> {
  const zip = new JSZip();

  // 1. Standalone index.html
  zip.file('index.html', generateStandaloneIndexHtml());

  // 2. firebase-config.js
  zip.file('firebase-config.js', STANDALONE_FIREBASE_CONFIG_JS);

  // 3. manifest.json
  zip.file('manifest.json', STANDALONE_MANIFEST_JSON);

  // 4. sw.js
  zip.file('sw.js', STANDALONE_SW_JS);

  // 5. README.md
  zip.file('README.md', STANDALONE_README_MD);

  // 6. SVG Icons
  for (const [path, content] of Object.entries(SVG_ICONS)) {
    const filename = path.replace('assets/images/', '');
    zip.file(filename, content);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'DUELO-DE-OFERTAS-DE-HALLOWEEN-OCTUBRE-HTML.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
