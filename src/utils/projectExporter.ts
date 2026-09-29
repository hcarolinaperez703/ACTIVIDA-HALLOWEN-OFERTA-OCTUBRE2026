import JSZip from 'jszip';

// Exported Project definition files bundled in memory
export const EXPORTED_FILES: Record<string, string> = {
  'index.html': `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Duelo de Ofertas de Halloween - Claro</title>
  <link rel="manifest" href="config/manifest.json">
  <meta name="theme-color" content="#e2001a">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Work+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Header de Navegación -->
  <header class="app-header">
    <div class="header-container">
      <div class="brand-group">
        <span class="brand-logo">🎃</span>
        <div>
          <span class="brand-sub">Claro Colombia • Capacitación Comercial</span>
          <h1 class="brand-title font-cinzel">DUELO DE OFERTAS DE HALLOWEEN</h1>
        </div>
      </div>
      <nav class="nav-links">
        <a href="index.html" class="nav-link active font-cinzel">Actividad (Duelo)</a>
        <a href="pages/inicio.html" class="nav-link font-cinzel">Inicio</a>
        <a href="pages/servicios.html" class="nav-link font-cinzel">Ofertas Claro</a>
        <a href="pages/contacto.html" class="nav-link font-cinzel">Soporte Mesas</a>
      </nav>
    </div>
  </header>

  <main class="main-content">
    <!-- PANEL DE 5 SESIONES SIMULTÁNEAS INDEPENDIENTES -->
    <section class="sessions-section">
      <div class="sessions-header">
        <div>
          <h2 class="font-cinzel section-title">👥 Campo: 5 Sesiones Simultáneas (PWA en Paralelo)</h2>
          <p class="section-desc">Cada mesa o asesor opera con su propio competidor, estado de contraoferta y cronómetro. Soporta hasta 5 sesiones independientes.</p>
        </div>
        <div class="sessions-actions">
          <button id="btn-toggle-status" class="status-btn active" onclick="toggleSessionStatus()">
            ● Estado: Activo (en uso)
          </button>
          <button class="pwa-launch-btn font-cinzel" onclick="launchStandalonePwa()">
            📱 Abrir Sesión en PWA
          </button>
        </div>
      </div>

      <!-- Pestañas de Sesiones -->
      <div class="session-tabs-grid" id="session-tabs-container">
        <!-- Renderizado dinámico vía JS -->
      </div>
    </section>

    <!-- SELECTOR DE COMPETIDOR RIVAL -->
    <section class="competitors-section">
      <h3 class="font-cinzel sub-title">⚔️ Tarjetas de Competencia para Duelo</h3>
      <p class="section-desc">Selecciona la oferta rival para desplegar su contenido y revelar la contraoferta Claro correspondiente.</p>
      
      <div class="competitor-cards-grid" id="competitors-grid">
        <!-- Renderizado dinámico vía JS -->
      </div>
    </section>

    <!-- BOTÓN ANIMADO CONTRAOFERTA FANTASMA -->
    <div class="ghost-trigger-center">
      <button id="ghost-counteroffer-btn" class="btn-ghost-animated font-cinzel" onclick="toggleGhostCounteroffer()">
        <span class="ghost-orb"></span>
        <span id="ghost-btn-label">👻 Activar Contraoferta Fantasma</span>
        <span class="sparkle">✨</span>
      </button>
      <p class="hint-text">Al activarse, despliega la carta <strong>Fantasma Claro</strong> configurada con la contraoferta ganadora.</p>
    </div>

    <!-- ARENA DE DUELO 3D: CARTA RIVAL VS FANTASMA CLARO -->
    <section class="duel-arena-grid">
      <!-- Tarjeta Competidor -->
      <div class="duel-card-box" id="rival-card-box">
        <!-- Contenido generado por app.js -->
      </div>

      <!-- Tarjeta Fantasma Claro -->
      <div class="duel-card-box" id="claro-card-box">
        <!-- Contenido generado por app.js -->
      </div>
    </section>

    <!-- CONTROLES DE LA RONDA: CRONÓMETRO Y CIERRE -->
    <div class="duel-footer-bar">
      <div class="timer-group">
        <span class="timer-icon">⏱</span>
        <span class="timer-text font-cinzel">Tiempo Asesor: <strong id="timer-display">45s</strong></span>
        <button class="btn-control" onclick="startTimer()">▶ Iniciar 45s</button>
        <button class="btn-control btn-secondary" onclick="resetTimer()">↺ Reiniciar</button>
      </div>
      <button class="btn-victory font-cinzel" onclick="triggerClaroVictory()">
        🏆 ¡Cierre Claro en Esta Sesión!
      </button>
    </div>
  </main>

  <footer class="app-footer">
    <p>Duelo de Ofertas de Halloween • Claro Capacitación Comercial • PWA Pública Multi-Sesión</p>
  </footer>

  <script src="assets/js/app.js"></script>
</body>
</html>`,

  'pages/inicio.html': `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inicio - Duelo de Ofertas de Halloween</title>
  <link rel="manifest" href="../config/manifest.json">
  <meta name="theme-color" content="#e2001a">
  <link rel="stylesheet" href="../assets/css/styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Work+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header class="app-header">
    <div class="header-container">
      <div class="brand-group">
        <span class="brand-logo">🎃</span>
        <div>
          <span class="brand-sub">Claro Colombia • Capacitación Comercial</span>
          <h1 class="brand-title font-cinzel">DUELO DE OFERTAS DE HALLOWEEN</h1>
        </div>
      </div>
      <nav class="nav-links">
        <a href="../index.html" class="nav-link font-cinzel">Actividad (Duelo)</a>
        <a href="inicio.html" class="nav-link active font-cinzel">Inicio</a>
        <a href="servicios.html" class="nav-link font-cinzel">Ofertas Claro</a>
        <a href="contacto.html" class="nav-link font-cinzel">Soporte Mesas</a>
      </nav>
    </div>
  </header>

  <main class="main-content" style="max-width: 900px;">
    <div class="info-card">
      <span class="badge-tag">Módulo Formativo</span>
      <h2 class="font-cinzel page-heading">Bienvenido al Simulador de Duelos Comerciales</h2>
      <p class="lead-text">
        El programa <strong>"Duelo de Ofertas de Halloween"</strong> fue diseñado para capacitar a los asesores y fuerzas comerciales de Claro en el contraataque técnico y comercial frente a competidores de telecomunicaciones.
      </p>

      <div class="features-grid">
        <div class="feature-box">
          <div class="feature-icon">⚡</div>
          <h3 class="font-cinzel">5 Sesiones PWA</h3>
          <p>Permite coordinar hasta 5 mesas de entrenamiento en paralelo con estado <em>Activo (en uso)</em> o <em>Cerrado (disponible)</em>.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">👻</div>
          <h3 class="font-cinzel">Contraoferta Fantasma</h3>
          <p>Despliega la oferta precisa de Claro Hogar con streaming, fibra simétrica y beneficios que derrotan la objeción del cliente.</p>
        </div>
        <div class="feature-box">
          <div class="feature-icon">🛡️</div>
          <h3 class="font-cinzel">Argumentario Asesor</h3>
          <p>Speeches de cierre directos, técnicos y orientados al valor percibido por el hogar colombiano.</p>
        </div>
      </div>

      <div style="margin-top: 35px; text-align: center;">
        <a href="../index.html" class="pwa-launch-btn font-cinzel" style="display: inline-block; padding: 14px 28px; font-size: 15px; text-decoration: none;">
          ⚔️ Ingresar al Duelo en Vivo
        </a>
      </div>
    </div>
  </main>

  <footer class="app-footer">
    <p>Duelo de Ofertas de Halloween • Claro Capacitación Comercial</p>
  </footer>
</body>
</html>`,

  'pages/servicios.html': `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ofertas Claro Hogar - Duelo de Halloween</title>
  <link rel="manifest" href="../config/manifest.json">
  <meta name="theme-color" content="#e2001a">
  <link rel="stylesheet" href="../assets/css/styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Work+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header class="app-header">
    <div class="header-container">
      <div class="brand-group">
        <span class="brand-logo">🎃</span>
        <div>
          <span class="brand-sub">Claro Colombia • Capacitación Comercial</span>
          <h1 class="brand-title font-cinzel">DUELO DE OFERTAS DE HALLOWEEN</h1>
        </div>
      </div>
      <nav class="nav-links">
        <a href="../index.html" class="nav-link font-cinzel">Actividad (Duelo)</a>
        <a href="inicio.html" class="nav-link font-cinzel">Inicio</a>
        <a href="servicios.html" class="nav-link active font-cinzel">Ofertas Claro</a>
        <a href="contacto.html" class="nav-link font-cinzel">Soporte Mesas</a>
      </nav>
    </div>
  </header>

  <main class="main-content" style="max-width: 1050px;">
    <div class="info-card">
      <span class="badge-tag" style="background: rgba(226,0,26,0.25); border-color: rgba(226,0,26,0.6); color: #ff5a6a;">Catálogo Comercial</span>
      <h2 class="font-cinzel page-heading">Portafolio Claro Hogar para Contraoferta</h2>
      <p class="lead-text">
        Estas son las 3 configuraciones ganadoras de Claro utilizadas en el simulador para pulverizar las ofertas de los competidores:
      </p>

      <div class="plans-showcase-grid">
        <div class="plan-card plan-claro">
          <span class="plan-tag">Contra Triple Play Rival</span>
          <h3 class="font-cinzel plan-title">Triple Play Claro 500M</h3>
          <div class="plan-price font-cinzel">$139.900</div>
          <div class="plan-badge">Ahorro de $10.000 vs Rival</div>
          <ul class="plan-bullets">
            <li>✓ Internet 500 Megas Simétricas de Alta Velocidad</li>
            <li>✓ TV Digital Avanzada 155 Canales (87 HD)</li>
            <li>✓ Paramount+ y HBO sin límite de 12 meses</li>
            <li>✓ Telefonía Ilimitada a todo destino nacional</li>
            <li>✓ Claro Club y asistencias de hogar</li>
          </ul>
        </div>

        <div class="plan-card plan-claro">
          <span class="plan-tag">Contra Doble Play Rival</span>
          <h3 class="font-cinzel plan-title">Doble Play Todo Incluido</h3>
          <div class="plan-price font-cinzel">$99.900</div>
          <div class="plan-badge">Ahorro de $9.300 mensual</div>
          <ul class="plan-bullets">
            <li>✓ 500 Megas de Fibra Óptica Estable</li>
            <li>✓ Claro video con miles de películas y series</li>
            <li>✓ Universal+ con estrenos y deportes</li>
            <li>✓ Sin cobros sorpresa de instalación</li>
            <li>✓ Roaming y Claro Drive en la nube</li>
          </ul>
        </div>

        <div class="plan-card plan-claro">
          <span class="plan-tag">Contra Sencillo Rival</span>
          <h3 class="font-cinzel plan-title">Solo Fibra + App Regalo</h3>
          <div class="plan-price font-cinzel">$89.900</div>
          <div class="plan-badge">Hasta 900M + Streaming Gratis</div>
          <ul class="plan-bullets">
            <li>✓ 500 / 900 Megas Simétricas</li>
            <li>✓ 1 App a elección: Netflix, WIN, Max, Prime o Disney</li>
            <li>✓ Universal+ y Claro video incluidos</li>
            <li>✓ Ahorro real superior a $35.000 al mes</li>
            <li>✓ Soporte técnico prioritario 24/7</li>
          </ul>
        </div>
      </div>
    </div>
  </main>

  <footer class="app-footer">
    <p>Duelo de Ofertas de Halloween • Claro Capacitación Comercial</p>
  </footer>
</body>
</html>`,

  'pages/contacto.html': `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Soporte y Mesas - Duelo de Ofertas de Halloween</title>
  <link rel="manifest" href="../config/manifest.json">
  <meta name="theme-color" content="#e2001a">
  <link rel="stylesheet" href="../assets/css/styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Work+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <header class="app-header">
    <div class="header-container">
      <div class="brand-group">
        <span class="brand-logo">🎃</span>
        <div>
          <span class="brand-sub">Claro Colombia • Capacitación Comercial</span>
          <h1 class="brand-title font-cinzel">DUELO DE OFERTAS DE HALLOWEEN</h1>
        </div>
      </div>
      <nav class="nav-links">
        <a href="../index.html" class="nav-link font-cinzel">Actividad (Duelo)</a>
        <a href="inicio.html" class="nav-link font-cinzel">Inicio</a>
        <a href="servicios.html" class="nav-link font-cinzel">Ofertas Claro</a>
        <a href="contacto.html" class="nav-link active font-cinzel">Soporte Mesas</a>
      </nav>
    </div>
  </header>

  <main class="main-content" style="max-width: 800px;">
    <div class="info-card">
      <span class="badge-tag">Mesa de Ayuda Comercial</span>
      <h2 class="font-cinzel page-heading">Contacto y Coordinación de Mesas</h2>
      <p class="lead-text">
        Utiliza este canal si requieres restablecer las sesiones PWA, solicitar actualización de ofertas de competidores o registrar incidencias en la capacitación:
      </p>

      <form class="contact-form" onsubmit="event.preventDefault(); alert('Solicitud registrada con éxito para la mesa seleccionada.');">
        <div class="form-group">
          <label>Mesa de Entrenamiento</label>
          <select class="form-input">
            <option>Mesa 01 - Alfa</option>
            <option>Mesa 02 - Beta</option>
            <option>Mesa 03 - Gamma</option>
            <option>Mesa 04 - Delta</option>
            <option>Mesa 05 - Épsilon</option>
            <option>Coordinador General</option>
          </select>
        </div>

        <div class="form-group">
          <label>Nombre del Asesor / Capacitador</label>
          <input type="text" class="form-input" placeholder="Ej. Carlos Rodríguez" required>
        </div>

        <div class="form-group">
          <label>Tipo de Requerimiento</label>
          <select class="form-input">
            <option>Reportar Nueva Oferta Competidora</option>
            <option>Ajuste de Argumentario de Cierre</option>
            <option>Duda Técnica sobre PWA Multi-Sesión</option>
            <option>Otro</option>
          </select>
        </div>

        <div class="form-group">
          <label>Detalle de la Observación</label>
          <textarea class="form-input" rows="4" placeholder="Describe la objeción o comentario sobre el duelo..." required></textarea>
        </div>

        <button type="submit" class="pwa-launch-btn font-cinzel" style="width: 100%; padding: 12px;">
          Enviar Reporte a Coordinación
        </button>
      </form>
    </div>
  </main>

  <footer class="app-footer">
    <p>Duelo de Ofertas de Halloween • Claro Capacitación Comercial</p>
  </footer>
</body>
</html>`,

  'assets/css/styles.css': `:root {
  --bg-midnight: #150a24;
  --bg-surface: #1f1033;
  --bg-card: rgba(31, 16, 51, 0.85);
  --claro-red: #e2001a;
  --claro-glow: #ff5a6a;
  --pumpkin-orange: #ff7a29;
  --pumpkin-glow: #ffaa40;
  --coffin-moss: #5c8a6b;
  --parchment: #f3ead3;
  --white: #ffffff;
  --border-subtle: rgba(255, 255, 255, 0.12);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  font-family: 'Work Sans', sans-serif;
  background-color: var(--bg-midnight);
  color: var(--parchment);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.font-cinzel { font-family: 'Cinzel', serif; }
.app-header {
  background: rgba(15, 7, 26, 0.95);
  border-bottom: 1px solid var(--border-subtle);
  padding: 14px 24px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}
.header-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}
.brand-group { display: flex; align-items: center; gap: 12px; }
.brand-logo { font-size: 28px; }
.brand-sub { font-size: 11px; text-transform: uppercase; color: var(--pumpkin-orange); font-weight: 700; display: block; }
.brand-title { font-size: 19px; font-weight: 900; color: var(--white); }
.nav-links { display: flex; gap: 8px; flex-wrap: wrap; }
.nav-link {
  color: var(--parchment);
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: all 0.2s;
}
.nav-link.active {
  background: linear-gradient(135deg, var(--claro-red), var(--claro-glow));
  color: var(--white);
  box-shadow: 0 0 16px rgba(226, 0, 26, 0.5);
}
.main-content {
  flex: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px 60px;
}
.sessions-section {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  padding: 22px;
  margin-bottom: 30px;
}
.sessions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 16px;
}
.section-title { font-size: 18px; font-weight: 900; color: var(--white); }
.section-desc { font-size: 12px; color: rgba(243, 234, 211, 0.7); margin-top: 4px; }
.status-btn {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 11px;
  font-family: monospace;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid transparent;
}
.status-btn.active {
  background: rgba(16, 185, 129, 0.2);
  color: #86efac;
  border-color: rgba(16, 185, 129, 0.5);
}
.status-btn.closed {
  background: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
  border-color: rgba(245, 158, 11, 0.5);
}
.pwa-launch-btn {
  background: linear-gradient(135deg, var(--pumpkin-orange), var(--claro-red));
  color: var(--white);
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}
.session-tabs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}
.session-card-tab {
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  padding: 14px;
  cursor: pointer;
}
.session-card-tab.selected {
  background: linear-gradient(135deg, rgba(226, 0, 26, 0.35), rgba(31, 16, 51, 0.95));
  border-color: var(--claro-glow);
}
.competitor-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 16px;
}
.comp-pick-card {
  background: rgba(20, 10, 35, 0.9);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 18px;
  cursor: pointer;
}
.comp-pick-card.active {
  border-color: var(--pumpkin-orange);
  box-shadow: 0 0 25px rgba(255, 122, 41, 0.4);
}
.ghost-trigger-center { text-align: center; margin: 35px 0 45px; }
.btn-ghost-animated {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 36px;
  background: linear-gradient(135deg, #2a0845, var(--claro-red), #2a0845);
  color: var(--white);
  border: 2px solid var(--claro-glow);
  border-radius: 20px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
}
.duel-arena-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 30px;
  margin-bottom: 35px;
}
.duel-card-box {
  background: rgba(15, 7, 26, 0.85);
  border: 1px solid var(--border-subtle);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.card-topbar {
  background: rgba(0, 0, 0, 0.6);
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-subtle);
  font-size: 11px;
}
.card-inner-body { padding: 24px 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.price-banner {
  background: rgba(0, 0, 0, 0.5);
  padding: 14px;
  border-radius: 14px;
  text-align: center;
  margin: 16px 0;
}
.big-price { font-size: 38px; font-weight: 900; }
.price-pumpkin { color: var(--pumpkin-orange); }
.price-claro { color: var(--white); }
.feature-bullets { list-style: none; font-size: 13px; margin: 14px 0; display: flex; flex-direction: column; gap: 8px; }
.trap-card-box { background: rgba(127, 29, 29, 0.35); border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 12px; padding: 12px; font-size: 12px; color: #fca5a5; }
.pitch-card-box { background: linear-gradient(135deg, rgba(226, 0, 26, 0.3), rgba(31, 16, 51, 0.9)); border: 1px solid var(--claro-glow); border-radius: 12px; padding: 14px; font-size: 13px; }
.duel-footer-bar {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 18px;
  padding: 18px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.timer-group { display: flex; align-items: center; gap: 12px; }
.btn-control { background: var(--pumpkin-orange); color: var(--white); border: none; padding: 8px 16px; border-radius: 10px; font-weight: 700; cursor: pointer; }
.btn-secondary { background: rgba(255, 255, 255, 0.1); }
.btn-victory { background: linear-gradient(135deg, var(--claro-red), var(--claro-glow)); color: var(--white); border: none; padding: 10px 22px; border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; }
.info-card { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 35px; }
.page-heading { font-size: 26px; font-weight: 900; margin: 12px 0 16px; }
.lead-text { font-size: 15px; line-height: 1.6; color: rgba(243, 234, 211, 0.85); margin-bottom: 25px; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
.feature-box { background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 20px; }
.contact-form { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }
.form-input { width: 100%; background: rgba(0, 0, 0, 0.5); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 10px 14px; color: var(--white); }
.plans-showcase-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px; }
.plan-card { background: rgba(0, 0, 0, 0.45); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 24px; }
.plan-price { font-size: 32px; font-weight: 900; color: var(--white); margin: 10px 0; }
.plan-bullets { list-style: none; font-size: 13px; display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
.app-footer { text-align: center; padding: 20px; font-size: 12px; color: rgba(243, 234, 211, 0.5); border-top: 1px solid var(--border-subtle); background: rgba(10, 4, 18, 0.9); }
`,

  'assets/js/app.js': `const COMPETITORS = [
  {
    id: 'plan-brujo',
    name: 'Competidor Plan Brujo',
    tag: 'Calabaza A • Triple Play',
    price: '$149.900',
    data: '500 Megas Simétricas',
    features: ['Canales: 125 HD / 27 SD con 2 Decos', 'Móvil ilimitado en paquete cerrado', 'Paramount+ (vence al mes 12)', 'HBO (vence al mes 12)'],
    hiddenTrap: 'Pagas $149.900 y tras 12 meses el streaming sube de precio.',
    claro: { title: 'FANTASMA CLARO TRIPLE', price: '$139.900', data: '500 Megas Simétricas', features: ['Ahorro directo de $10.000 mensual', 'Paramount+ y HBO permanente', '155 canales (87 HD)', 'Telefonía fija ilimitada'], pitch: '"Con Claro te ahorras $120.000 al año y no te quitamos el streaming."' }
  },
  {
    id: 'plan-sepulcro',
    name: 'Competidor Plan Sepulcro',
    tag: 'Ataúd • Doble Play Funesto',
    price: '$109.200',
    data: '500 Megas Simétricas',
    features: ['Internet básico + Televisión estándar', 'Decodificador con cobro extra', 'Sin plataformas SVOD de cortesía', 'Permanencia forzosa estricta'],
    hiddenTrap: 'Cláusula de permanencia con cobro si cancelas.',
    claro: { title: 'FANTASMA CLARO DOBLE', price: '$99.900', data: '500 Megas Simétricas', features: ['Ahorro de $9.300 mensual', 'Claro video con Paramount+ y Universal+', 'Sin permanencia abusiva', 'Claro Drive 25GB'], pitch: '"¿Por qué pagar $109.200 por TV vieja cuando en Claro por $99.900 tienes 500 Megas y deco Android?"' }
  },
  {
    id: 'plan-sombras',
    name: 'Competidor Plan Sombras',
    tag: 'Calabaza B • Solo Internet',
    price: '$84.900',
    data: '500 Megas Simétricas',
    features: ['Solo conexión de internet fija', 'Cero apps o streaming incluidos', 'Sin almacenamiento en la nube', 'Sin descuentos en móvil'],
    hiddenTrap: 'Internet solo sin nada más: obliga a pagar más de $35.000 en suscripciones.',
    claro: { title: 'FANTASMA CLARO PROMO', price: '$89.900', data: '500 / 900 Megas Simétricas', features: ['Elige 1 app gratis: Netflix, WIN, Max o Disney', 'Universal+ y Claro video incluidos', 'Velocidad de hasta 900 Megas', 'Ahorro real de $35.000'], pitch: '"Por solo $5.000 de diferencia frente al rival, te regalamos Netflix o WIN."' }
  }
];

let sessions = [
  { id: 1, name: 'Mesa 01 - Alfa', compId: 'plan-brujo', status: 'active', ghost: false, timer: 45, running: false },
  { id: 2, name: 'Mesa 02 - Beta', compId: 'plan-sepulcro', status: 'closed', ghost: false, timer: 45, running: false },
  { id: 3, name: 'Mesa 03 - Gamma', compId: 'plan-sombras', status: 'closed', ghost: false, timer: 45, running: false },
  { id: 4, name: 'Mesa 04 - Delta', compId: 'plan-brujo', status: 'closed', ghost: false, timer: 45, running: false },
  { id: 5, name: 'Mesa 05 - Épsilon', compId: 'plan-sepulcro', status: 'closed', ghost: false, timer: 45, running: false }
];
let activeSessionId = 1;
let timerInterval = null;

function initSessionState() {
  const saved = localStorage.getItem('claro_halloween_exported_sessions');
  if (saved) { try { sessions = JSON.parse(saved); } catch (e) {} }
  const params = new URLSearchParams(window.location.search);
  const pwaSession = params.get('session');
  if (pwaSession && parseInt(pwaSession) >= 1 && parseInt(pwaSession) <= 5) {
    activeSessionId = parseInt(pwaSession);
    const curr = sessions.find(s => s.id === activeSessionId);
    if (curr) curr.status = 'active';
  }
  saveSessions();
  renderSessionTabs();
  renderCompetitorPills();
  renderDuelArena();
}

function saveSessions() { localStorage.setItem('claro_halloween_exported_sessions', JSON.stringify(sessions)); }

function renderSessionTabs() {
  const container = document.getElementById('session-tabs-container');
  if (!container) return;
  container.innerHTML = sessions.map(s => {
    const isSelected = s.id === activeSessionId;
    const isActive = s.status === 'active';
    const comp = COMPETITORS.find(c => c.id === s.compId);
    return \`
      <div class="session-card-tab \${isSelected ? 'selected' : ''}" onclick="selectSession(\${s.id})">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong class="font-cinzel" style="color: #fff; font-size: 13px;">\${s.name}</strong>
          <span style="font-size: 10px; font-family: monospace; padding: 2px 8px; border-radius: 12px; background: \${isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}; color: \${isActive ? '#86efac' : '#fcd34d'};">
            \${isActive ? 'Activo' : 'Cerrado'}
          </span>
        </div>
        <div style="font-size: 11px; color: #ff7a29;">\${comp ? comp.name : ''}</div>
        <div style="font-size: 10px; opacity: 0.6; margin-top: 8px;">⏱ \${s.timer}s \${s.ghost ? '• 👻 Fantasma' : ''}</div>
      </div>\`;
  }).join('');
  updateStatusButtonDisplay();
}

function selectSession(id) {
  activeSessionId = id;
  renderSessionTabs();
  renderCompetitorPills();
  renderDuelArena();
}

function toggleSessionStatus() {
  const curr = sessions.find(s => s.id === activeSessionId);
  if (!curr) return;
  curr.status = curr.status === 'active' ? 'closed' : 'active';
  saveSessions();
  renderSessionTabs();
}

function updateStatusButtonDisplay() {
  const btn = document.getElementById('btn-toggle-status');
  if (!btn) return;
  const curr = sessions.find(s => s.id === activeSessionId);
  if (curr && curr.status === 'active') {
    btn.className = 'status-btn active';
    btn.innerHTML = '● Estado: Activo (en uso)';
  } else {
    btn.className = 'status-btn closed';
    btn.innerHTML = '○ Estado: Cerrado (disponible)';
  }
}

function launchStandalonePwa() {
  const curr = sessions.find(s => s.id === activeSessionId);
  if (curr) curr.status = 'active';
  saveSessions();
  renderSessionTabs();
  const url = \`\${window.location.origin}\${window.location.pathname}?session=\${activeSessionId}&pwa=standalone\`;
  window.open(url, \`PWA_Sesion_\${activeSessionId}\`, 'width=1280,height=900,menubar=no,status=no');
}

function renderCompetitorPills() {
  const grid = document.getElementById('competitors-grid');
  if (!grid) return;
  const curr = sessions.find(s => s.id === activeSessionId);
  grid.innerHTML = COMPETITORS.map(c => {
    const isSelected = curr && curr.compId === c.id;
    return \`
      <div class="comp-pick-card \${isSelected ? 'active' : ''}" onclick="selectCompetitor('\${c.id}')">
        <span style="font-size: 10px; font-family: monospace; color: #ff7a29; text-transform: uppercase;">\${c.tag}</span>
        <h4 class="font-cinzel" style="color: #fff; font-size: 16px; margin: 4px 0;">\${c.name}</h4>
        <div style="font-size: 20px; font-weight: 900; color: #ff7a29;">\${c.price}</div>
        <p style="font-size: 11px; opacity: 0.8; margin-top: 6px;">\${c.data}</p>
      </div>\`;
  }).join('');
}

function selectCompetitor(compId) {
  const curr = sessions.find(s => s.id === activeSessionId);
  if (curr) {
    curr.compId = compId;
    saveSessions();
    renderCompetitorPills();
    renderDuelArena();
  }
}

function toggleGhostCounteroffer() {
  const curr = sessions.find(s => s.id === activeSessionId);
  if (!curr) return;
  curr.ghost = !curr.ghost;
  saveSessions();
  renderDuelArena();
  renderSessionTabs();
}

function renderDuelArena() {
  const curr = sessions.find(s => s.id === activeSessionId);
  if (!curr) return;
  const comp = COMPETITORS.find(c => c.id === curr.compId) || COMPETITORS[0];
  const rivalBox = document.getElementById('rival-card-box');
  const claroBox = document.getElementById('claro-card-box');
  const ghostBtnLabel = document.getElementById('ghost-btn-label');
  if (ghostBtnLabel) {
    ghostBtnLabel.textContent = curr.ghost ? '👻 Contraoferta Fantasma Activada' : '👻 Activar Contraoferta Fantasma';
  }
  if (rivalBox) {
    rivalBox.innerHTML = \`
      <div class="card-topbar">
        <span style="color: #ff7a29;">🎃 OFERTA RIVAL</span>
        <span>\${comp.tag}</span>
      </div>
      <div class="card-inner-body">
        <div>
          <h3 class="font-cinzel" style="color: #fff; font-size: 24px;">\${comp.name}</h3>
          <div class="price-banner">
            <div class="big-price price-pumpkin font-cinzel">\${comp.price}</div>
            <div style="font-size: 13px; font-weight: bold; margin-top: 4px;">\${comp.data}</div>
          </div>
          <ul class="feature-bullets">
            \${comp.features.map(f => \`<li><span style="color: #ef4444; font-weight: 900;">✕</span> \${f}</li>\`).join('')}
          </ul>
        </div>
        <div class="trap-card-box">
          <strong>⚠ Trampa Oculta:</strong>
          <p style="margin-top: 4px;">\${comp.hiddenTrap}</p>
        </div>
      </div>\`;
  }
  if (claroBox) {
    if (curr.ghost) {
      claroBox.innerHTML = \`
        <div class="card-topbar" style="border-color: rgba(226, 0, 26, 0.4);">
          <span style="color: #ff5a6a;">👑 PROPUESTA CLARO</span>
          <span style="color: #4ade80;">✓ CONTRAATAQUE ACTIVO</span>
        </div>
        <div class="card-inner-body" style="background: radial-gradient(circle at center, rgba(226, 0, 26, 0.15) 0%, transparent 70%);">
          <div>
            <h3 class="font-cinzel" style="color: #fff; font-size: 24px;">\${comp.claro.title}</h3>
            <div class="price-banner" style="border-color: rgba(226, 0, 26, 0.5);">
              <div class="big-price price-claro font-cinzel">\${comp.claro.price}</div>
              <div style="font-size: 13px; font-weight: bold; margin-top: 4px; color: #ff5a6a;">\${comp.claro.data}</div>
            </div>
            <ul class="feature-bullets">
              \${comp.claro.features.map(f => \`<li><span style="color: #10b981; font-weight: 900;">✓</span> \${f}</li>\`).join('')}
            </ul>
          </div>
          <div class="pitch-card-box">
            <strong style="color: #ff5a6a;">Argumentario de Cierre Asesor:</strong>
            <p style="margin-top: 4px; font-style: italic;">\${comp.claro.pitch}</p>
          </div>
        </div>\`;
    } else {
      claroBox.innerHTML = \`
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 14px; animation: ping 2s infinite;">👻</div>
          <h4 class="font-cinzel" style="font-size: 20px; color: #fff;">Fantasma Claro en Espera</h4>
          <p style="font-size: 12px; opacity: 0.7; max-width: 280px; margin: 10px 0 20px;">
            Haz clic en <strong>"Activar Contraoferta Fantasma"</strong> para revelar la contraoferta de esta sesión.
          </p>
          <button class="pwa-launch-btn font-cinzel" onclick="toggleGhostCounteroffer()">
            Desplegar Fantasma Claro
          </button>
        </div>\`;
    }
  }
  const timerDisp = document.getElementById('timer-display');
  if (timerDisp) timerDisp.textContent = \`\${curr.timer}s\`;
}

function startTimer() {
  const curr = sessions.find(s => s.id === activeSessionId);
  if (!curr || curr.running) return;
  curr.running = true;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (curr.timer > 0) {
      curr.timer--;
      const timerDisp = document.getElementById('timer-display');
      if (timerDisp) timerDisp.textContent = \`\${curr.timer}s\`;
    } else {
      clearInterval(timerInterval);
      curr.running = false;
      alert(\`¡Tiempo de speech agotado en \${curr.name}!\`);
    }
    saveSessions();
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  const curr = sessions.find(s => s.id === activeSessionId);
  if (curr) {
    curr.timer = 45;
    curr.running = false;
    saveSessions();
    renderDuelArena();
  }
}

function triggerClaroVictory() {
  const curr = sessions.find(s => s.id === activeSessionId);
  if (curr) {
    curr.ghost = true;
    saveSessions();
    renderDuelArena();
    renderSessionTabs();
    alert(\`🎉 ¡Cierre Claro exitoso registrado en \${curr.name}!\`);
  }
}

window.addEventListener('DOMContentLoaded', initSessionState);
`,

  'docs/README.md': `# Duelo de Ofertas de Halloween - Claro (Proyecto Exportado)

Este paquete contiene la versión completa y exportable de la aplicación web y PWA "Duelo de Ofertas de Halloween" de Claro Colombia.

## Estructura del Proyecto

- index.html: Arena interactiva del Duelo 3D y 5 Sesiones Simultáneas
- pages/inicio.html: Bienvenida y fundamentos del programa comercial
- pages/servicios.html: Portafolio Claro Hogar y contraofertas ganadoras
- pages/contacto.html: Mesa de ayuda y soporte para capacitadores
- assets/css/styles.css: Paleta oficial Midnight, Rojo Claro, Naranja Neón
- assets/js/app.js: 5 Sesiones en paralelo, estados Activo/Cerrado y PWA
- assets/images/icon-192.svg: Ícono PWA estándar
- assets/images/icon-512.svg: Ícono PWA alta resolución
- assets/fonts/README.txt: Tipografías Cinzel y Work Sans
- docs/README.md: Guía técnica y manual de despliegue en servidor estático
- config/manifest.json: Manifiesto PWA para instalación en Android, iOS y Desktop
`,

  'config/manifest.json': `{
  "name": "Duelo de Ofertas de Halloween - Claro",
  "short_name": "Duelos Claro",
  "description": "Simulador comercial y duelos de ofertas Claro vs Competencia para capacitación",
  "start_url": "../index.html?pwa=true",
  "scope": "../",
  "display": "standalone",
  "background_color": "#150a24",
  "theme_color": "#e2001a",
  "orientation": "portrait-primary",
  "categories": ["business", "education", "productivity"],
  "icons": [
    {
      "src": "../assets/images/icon-192.svg",
      "sizes": "192x192",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "../assets/images/icon-512.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    }
  ]
}`
};

export const SVG_ICONS: Record<string, string> = {
  'assets/images/icon-192.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" width="192" height="192">
  <defs>
    <radialGradient id="bgGlow192" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a0845" />
      <stop offset="100%" stop-color="#150a24" />
    </radialGradient>
    <linearGradient id="claroRed192" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff5a6a" />
      <stop offset="100%" stop-color="#e2001a" />
    </linearGradient>
  </defs>
  <rect width="192" height="192" rx="42" fill="url(#bgGlow192)" />
  <g>
    <path d="M 96,30 C 65,30 50,50 50,85 C 50,112 58,128 50,144 C 46,152 54,156 62,150 C 70,144 78,150 86,144 C 94,138 98,138 106,144 C 114,150 122,144 130,150 C 138,156 146,152 142,144 C 134,128 142,112 142,85 C 142,50 127,30 96,30 Z" fill="url(#claroRed192)" />
    <ellipse cx="80" cy="80" rx="7" ry="10" fill="#150a24" />
    <ellipse cx="112" cy="80" rx="7" ry="10" fill="#150a24" />
  </g>
  <text x="96" y="176" font-family="'Cinzel', serif" font-weight="900" font-size="11" fill="#f3ead3" letter-spacing="1.5" text-anchor="middle">CLARO DUELOS</text>
</svg>`,

  'assets/images/icon-512.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a0845" />
      <stop offset="100%" stop-color="#150a24" />
    </radialGradient>
    <linearGradient id="claroRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff5a6a" />
      <stop offset="100%" stop-color="#e2001a" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="108" fill="url(#bgGlow)" />
  <g>
    <path d="M 256,90 C 180,90 140,140 140,220 C 140,290 160,330 140,370 C 130,390 150,400 170,385 C 190,370 210,385 230,370 C 250,355 262,355 282,370 C 302,385 322,370 342,385 C 362,400 382,390 372,370 C 352,330 372,290 372,220 C 372,140 332,90 256,90 Z" fill="url(#claroRed)" />
    <ellipse cx="215" cy="205" rx="18" ry="24" fill="#150a24" />
    <ellipse cx="297" cy="205" rx="18" ry="24" fill="#150a24" />
  </g>
  <text x="256" y="480" font-family="'Cinzel', serif" font-weight="900" font-size="20" fill="#f3ead3" letter-spacing="4" text-anchor="middle">CLARO DUELOS</text>
</svg>`
};

/**
 * Packs the entire Proyecto_Exportado structure into a downloadable .zip
 */
export async function downloadProjectZip(): Promise<void> {
  const zip = new JSZip();
  const folder = zip.folder('Proyecto_Exportado');

  if (!folder) return;

  // Add all text and code files
  for (const [path, content] of Object.entries(EXPORTED_FILES)) {
    folder.file(path, content);
  }

  // Add SVG Icons
  for (const [path, content] of Object.entries(SVG_ICONS)) {
    folder.file(path, content);
  }

  folder.file('assets/fonts/README.txt', 'Fuentes Cinzel y Work Sans se cargan desde Google Fonts');

  // Add individual session redirects for standalone PWA deployment
  for (let i = 1; i <= 5; i++) {
    folder.file(`sesion${i}.html`, `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Duelo Claro - Sesión ${i} (PWA)</title>
  <link rel="manifest" href="config/manifest.json">
  <meta name="theme-color" content="#e2001a">
  <script>window.location.replace('index.html?session=${i}&pwa=standalone');</script>
</head>
<body style="background:#150a24;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;">
  <p>Cargando Sesión ${i} PWA...</p>
</body>
</html>`);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'Proyecto_Exportado_Duelos_Halloween.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
