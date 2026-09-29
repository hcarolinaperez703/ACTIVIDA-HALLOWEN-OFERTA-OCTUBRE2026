// =========================================================================
// APP.JS - LÓGICA DE DUELOS, 5 SESIONES SIMULTÁNEAS Y PWA
// =========================================================================

const COMPETITORS = [
  {
    id: 'plan-brujo',
    name: 'Competidor Plan Brujo',
    tag: 'Calabaza A • Triple Play',
    price: '$149.900',
    data: '500 Megas Simétricas',
    features: [
      'Canales: 125 HD / 27 SD con 2 Decos',
      'Móvil ilimitado en paquete cerrado',
      'Paramount+ (vence al mes 12)',
      'HBO (vence al mes 12)'
    ],
    hiddenTrap: 'Pagas $149.900 y tras 12 meses el streaming sube de precio. Sin asistencias de hogar ni fidelización.',
    claro: {
      title: 'FANTASMA CLARO TRIPLE',
      price: '$139.900',
      data: '500 Megas Simétricas',
      features: [
        'Ahorro directo de $10.000 mensual',
        'Paramount+ y HBO incluidos de forma permanente',
        '155 canales de televisión (87 HD)',
        'Telefonía fija ilimitada nacional'
      ],
      pitch: '"Con Claro te ahorras $120.000 al año, no te quitamos las plataformas de streaming al año y disfrutas de mayor estabilidad en fibra."'
    }
  },
  {
    id: 'plan-sepulcro',
    name: 'Competidor Plan Sepulcro',
    tag: 'Ataúd • Doble Play Funesto',
    price: '$109.200',
    data: '500 Megas Simétricas',
    features: [
      'Internet básico + Televisión estándar',
      'Decodificador adicional con cobro extra',
      'Sin plataformas SVOD de cortesía',
      'Permanencia forzosa estricta'
    ],
    hiddenTrap: 'Cláusula de permanencia con cobro si cancelas, decodificadores antiguos sin comandos de voz.',
    claro: {
      title: 'FANTASMA CLARO DOBLE',
      price: '$99.900',
      data: '500 Megas Simétricas',
      features: [
        'Ahorro de $9.300 mensual frente al rival',
        'Claro video con Paramount+ y Universal+ incluidos',
        'Sin permanencia abusiva',
        'Claro Drive 25GB en la nube'
      ],
      pitch: '"¿Por qué pagar $109.200 por TV vieja cuando en Claro por solo $99.900 tienes 500 Megas, deco Android TV y miles de películas gratis?"'
    }
  },
  {
    id: 'plan-sombras',
    name: 'Competidor Plan Sombras',
    tag: 'Calabaza B • Solo Internet',
    price: '$84.900',
    data: '500 Megas Simétricas',
    features: [
      'Solo conexión de internet fija',
      'Cero apps o streaming incluidos',
      'Sin almacenamiento en la nube',
      'Sin descuentos en telefonía móvil'
    ],
    hiddenTrap: 'Internet solo sin nada más: obliga al cliente a pagar más de $35.000 en suscripciones individuales.',
    claro: {
      title: 'FANTASMA CLARO PROMO',
      price: '$89.900',
      data: '500 / 900 Megas Simétricas',
      features: [
        'Elige 1 app gratis: Netflix, WIN, Max o Disney',
        'Universal+ y Claro video incluidos de base',
        'Velocidad de hasta 900 Megas',
        'Ahorro real superior a $35.000 al mes'
      ],
      pitch: '"Por solo $5.000 de diferencia frente a los $84.900 del rival, en Claro te regalamos tu app favorita como Netflix o WIN Sports."'
    }
  }
];

// Estado de 5 Sesiones Simultáneas
let sessions = [
  { id: 1, name: 'Mesa 01 - Alfa', compId: 'plan-brujo', status: 'active', ghost: false, timer: 45, running: false },
  { id: 2, name: 'Mesa 02 - Beta', compId: 'plan-sepulcro', status: 'closed', ghost: false, timer: 45, running: false },
  { id: 3, name: 'Mesa 03 - Gamma', compId: 'plan-sombras', status: 'closed', ghost: false, timer: 45, running: false },
  { id: 4, name: 'Mesa 04 - Delta', compId: 'plan-brujo', status: 'closed', ghost: false, timer: 45, running: false },
  { id: 5, name: 'Mesa 05 - Épsilon', compId: 'plan-sepulcro', status: 'closed', ghost: false, timer: 45, running: false }
];

let activeSessionId = 1;
let timerInterval = null;

// Cargar o sincronizar sesiones desde localStorage
function initSessionState() {
  const saved = localStorage.getItem('claro_halloween_exported_sessions');
  if (saved) {
    try {
      sessions = JSON.parse(saved);
    } catch (e) {}
  }
  
  // Revisar si se abrió una sesión específica en PWA
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

function saveSessions() {
  localStorage.setItem('claro_halloween_exported_sessions', JSON.stringify(sessions));
}

// Renderizado de las pestañas de las 5 sesiones
function renderSessionTabs() {
  const container = document.getElementById('session-tabs-container');
  if (!container) return;

  container.innerHTML = sessions.map(s => {
    const isSelected = s.id === activeSessionId;
    const isActive = s.status === 'active';
    const comp = COMPETITORS.find(c => c.id === s.compId);

    return `
      <div class="session-card-tab ${isSelected ? 'selected' : ''}" onclick="selectSession(${s.id})">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong class="font-cinzel" style="color: #fff; font-size: 13px;">${s.name}</strong>
          <span style="font-size: 10px; font-family: monospace; padding: 2px 8px; border-radius: 12px; background: ${isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}; color: ${isActive ? '#86efac' : '#fcd34d'};">
            ${isActive ? 'Activo' : 'Cerrado'}
          </span>
        </div>
        <div style="font-size: 11px; color: #ff7a29;">${comp ? comp.name : ''}</div>
        <div style="font-size: 10px; opacity: 0.6; margin-top: 8px;">⏱ ${s.timer}s ${s.ghost ? '• 👻 Fantasma' : ''}</div>
      </div>
    `;
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

// Abrir sesión como PWA independiente
function launchStandalonePwa() {
  const curr = sessions.find(s => s.id === activeSessionId);
  if (curr) curr.status = 'active';
  saveSessions();
  renderSessionTabs();

  const url = `${window.location.origin}${window.location.pathname}?session=${activeSessionId}&pwa=standalone`;
  window.open(url, `PWA_Sesion_${activeSessionId}`, 'width=1280,height=900,menubar=no,status=no');
}

// Selector de Competidores
function renderCompetitorPills() {
  const grid = document.getElementById('competitors-grid');
  if (!grid) return;
  const curr = sessions.find(s => s.id === activeSessionId);

  grid.innerHTML = COMPETITORS.map(c => {
    const isSelected = curr && curr.compId === c.id;
    return `
      <div class="comp-pick-card ${isSelected ? 'active' : ''}" onclick="selectCompetitor('${c.id}')">
        <span style="font-size: 10px; font-family: monospace; color: #ff7a29; text-transform: uppercase;">${c.tag}</span>
        <h4 class="font-cinzel" style="color: #fff; font-size: 16px; margin: 4px 0;">${c.name}</h4>
        <div style="font-size: 20px; font-weight: 900; color: #ff7a29;">${c.price}</div>
        <p style="font-size: 11px; opacity: 0.8; margin-top: 6px;">${c.data}</p>
      </div>
    `;
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

// Botón Contraoferta Fantasma
function toggleGhostCounteroffer() {
  const curr = sessions.find(s => s.id === activeSessionId);
  if (!curr) return;
  curr.ghost = !curr.ghost;
  saveSessions();
  renderDuelArena();
  renderSessionTabs();
}

// Renderizar las 2 tarjetas del duelo
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

  // Tarjeta Rival
  if (rivalBox) {
    rivalBox.innerHTML = `
      <div class="card-topbar">
        <span style="color: #ff7a29;">🎃 OFERTA RIVAL</span>
        <span>${comp.tag}</span>
      </div>
      <div class="card-inner-body">
        <div>
          <h3 class="font-cinzel" style="color: #fff; font-size: 24px;">${comp.name}</h3>
          <div class="price-banner">
            <div class="big-price price-pumpkin font-cinzel">${comp.price}</div>
            <div style="font-size: 13px; font-weight: bold; margin-top: 4px;">${comp.data}</div>
          </div>
          <ul class="feature-bullets">
            ${comp.features.map(f => `<li><span style="color: #ef4444; font-weight: 900;">✕</span> ${f}</li>`).join('')}
          </ul>
        </div>
        <div class="trap-card-box">
          <strong>⚠ Trampa Oculta:</strong>
          <p style="margin-top: 4px;">${comp.hiddenTrap}</p>
        </div>
      </div>
    `;
  }

  // Tarjeta Claro (Fantasma)
  if (claroBox) {
    if (curr.ghost) {
      claroBox.innerHTML = `
        <div class="card-topbar" style="border-color: rgba(226, 0, 26, 0.4);">
          <span style="color: #ff5a6a;">👑 PROPUESTA CLARO</span>
          <span style="color: #4ade80;">✓ CONTRAATAQUE ACTIVO</span>
        </div>
        <div class="card-inner-body" style="background: radial-gradient(circle at center, rgba(226, 0, 26, 0.15) 0%, transparent 70%);">
          <div>
            <h3 class="font-cinzel" style="color: #fff; font-size: 24px;">${comp.claro.title}</h3>
            <div class="price-banner" style="border-color: rgba(226, 0, 26, 0.5);">
              <div class="big-price price-claro font-cinzel">${comp.claro.price}</div>
              <div style="font-size: 13px; font-weight: bold; margin-top: 4px; color: #ff5a6a;">${comp.claro.data}</div>
            </div>
            <ul class="feature-bullets">
              ${comp.claro.features.map(f => `<li><span style="color: #10b981; font-weight: 900;">✓</span> ${f}</li>`).join('')}
            </ul>
          </div>
          <div class="pitch-card-box">
            <strong style="color: #ff5a6a;">Argumentario de Cierre Asesor:</strong>
            <p style="margin-top: 4px; font-style: italic;">${comp.claro.pitch}</p>
          </div>
        </div>
      `;
    } else {
      claroBox.innerHTML = `
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 14px; animation: ping 2s infinite;">👻</div>
          <h4 class="font-cinzel" style="font-size: 20px; color: #fff;">Fantasma Claro en Espera</h4>
          <p style="font-size: 12px; opacity: 0.7; max-width: 280px; margin: 10px 0 20px;">
            Haz clic en <strong>"Activar Contraoferta Fantasma"</strong> para revelar la contraoferta de esta sesión.
          </p>
          <button class="pwa-launch-btn font-cinzel" onclick="toggleGhostCounteroffer()">
            Desplegar Fantasma Claro
          </button>
        </div>
      `;
    }
  }

  const timerDisp = document.getElementById('timer-display');
  if (timerDisp) timerDisp.textContent = `${curr.timer}s`;
}

// Cronómetro
function startTimer() {
  const curr = sessions.find(s => s.id === activeSessionId);
  if (!curr || curr.running) return;
  curr.running = true;
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (curr.timer > 0) {
      curr.timer--;
      const timerDisp = document.getElementById('timer-display');
      if (timerDisp) timerDisp.textContent = `${curr.timer}s`;
    } else {
      clearInterval(timerInterval);
      curr.running = false;
      alert(`¡Tiempo de speech agotado en ${curr.name}!`);
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
    alert(`🎉 ¡Cierre Claro exitoso registrado en ${curr.name}!`);
  }
}

// Registro PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW note:', err));
  });
}

// Inicializar al cargar
window.addEventListener('DOMContentLoaded', initSessionState);
