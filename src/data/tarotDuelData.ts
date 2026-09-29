import calabazaAImg from '../assets/images/calabaza_variante_a_1790365584205.jpg';
import ataudImg from '../assets/images/ataud_card_1790365603367.jpg';
import calabazaBImg from '../assets/images/calabaza_variante_b_1790365594039.jpg';
import fantasmaClaroImg from '../assets/images/fantasma_claro_1790365613768.jpg';

export interface TarotCardData {
  id: string;
  arcanaNumber: string; // e.g. "I", "II", "XIII"
  arcanaTitle: string; // e.g. "EL BRUJO", "EL SEPULCRO", "EL FANTASMA"
  name: string;
  type: 'competitor' | 'ghost';
  price: string;
  period: string;
  badge: string;
  speed: string;
  imageSrc: string;
  accentColor: string; // e.g. "#ff7a29", "#5c8a6b", "#e2001a"
  glowColor: string;
  features: string[];
  highlightBenefit: string;
  verdict: string;
}

export interface TarotScenario {
  id: string;
  title: string;
  subtitle: string;
  category: 'Triple Play' | 'Doble Play' | 'Sencillo Internet';
  cards: TarotCardData[];
}

export const TAROT_SCENARIOS: TarotScenario[] = [
  {
    id: 'triple-play',
    title: 'Duelo Mayor: Triple Play Hogar',
    subtitle: 'Internet Fibra + Televisión Digital + Telefonía / Móvil',
    category: 'Triple Play',
    cards: [
      {
        id: 'c1-brujo',
        arcanaNumber: 'I',
        arcanaTitle: 'EL BRUJO',
        name: 'Competidor Plan Brujo',
        type: 'competitor',
        price: '$149.900',
        period: '/ mes',
        badge: 'Triple Play Rival',
        speed: '500 Megas Simétricas',
        imageSrc: calabazaAImg,
        accentColor: '#ff7a29',
        glowColor: 'rgba(255, 122, 41, 0.45)',
        features: [
          'Internet + TV Avanzada + Celular Ilimitado',
          '500 Megas Simétricas de conexión',
          'Canales: 125 HD / 27 SD con 2 Decodificadores',
          'Paramount+ incluido en tu plan x 12 meses',
          'HBO incluido en tu plan x 12 meses'
        ],
        highlightBenefit: '⚠ Al mes 13 las plataformas streaming caducan y cobran tarifa adicional.',
        verdict: 'Costo elevado ($149.900) con streaming temporal que vence en 1 año.'
      },
      {
        id: 'c2-sepulcro',
        arcanaNumber: 'II',
        arcanaTitle: 'EL SEPULCRO',
        name: 'Competidor Plan Sepulcro',
        type: 'competitor',
        price: '$109.200',
        period: '/ mes',
        badge: 'Dúo Internet + TV Digital',
        speed: '500 Megas',
        imageSrc: ataudImg,
        accentColor: '#5c8a6b',
        glowColor: 'rgba(92, 138, 107, 0.45)',
        features: [
          'Dúo Internet + Televisión Digital Avanzada',
          '500 Megas de velocidad',
          'Canales: 125 HD – 27 SD',
          'Sin aplicaciones de streaming de obsequio',
          'Permanencia y costos de decodificadores extra'
        ],
        highlightBenefit: '⚠ Sin plataformas SVOD incluidas; el cliente gasta más contratándolas por fuera.',
        verdict: 'Oferta rígida sin entretenimiento moderno ni beneficios familiares.'
      },
      {
        id: 'c3-fantasma',
        arcanaNumber: '★',
        arcanaTitle: 'LA CARTA FANTASMA',
        name: 'Fantasma Claro Triple Play',
        type: 'ghost',
        price: '$131.900',
        period: '/ mes',
        badge: '¡LA CONTRAOFERTA GANADORA!',
        speed: '500 / 900 Megas Simétricas',
        imageSrc: fantasmaClaroImg,
        accentColor: '#e2001a',
        glowColor: 'rgba(226, 0, 26, 0.75)',
        features: [
          'Internet + TV superior + línea fija por solo $131.900',
          'Velocidad insuperable: 500 / 900 Megas Simétricas',
          '276 Canales Totales (173 SD + 103 HD 64) + Emisoras',
          '1 Deco HD + 1 Deco Digital incluido',
          'Elige 2 apps de video: Netflix+WIN, Max+Disney, etc.',
          'Universal+ + Atres Player + Claro video incluidos',
          '1 Asistencia (Médica/Hogar/Pets) + McAfee (3 equipos)',
          'Claro Drive + Claro Club con descuentos exclusivos'
        ],
        highlightBenefit: '⭐ AHORRO DE $18.000 CADA MES frente al Plan Brujo ($216.000 al año) con 2 Apps SVOD elegibles permanentes.',
        verdict: '¡VICTORIA ROTUNDA! Mayor velocidad, 276 canales y doble combo streaming.'
      }
    ]
  },
  {
    id: 'doble-play',
    title: 'Duelo Intermedio: Doble Play Hogar',
    subtitle: 'Internet Fibra Óptica + Televisión Digital Intermedia Plus',
    category: 'Doble Play',
    cards: [
      {
        id: 'c2-sepulcro-d',
        arcanaNumber: 'I',
        arcanaTitle: 'EL SEPULCRO',
        name: 'Competidor Plan Sepulcro',
        type: 'competitor',
        price: '$109.200',
        period: '/ mes',
        badge: 'Duo Internet + TV Digital',
        speed: '500 Megas',
        imageSrc: ataudImg,
        accentColor: '#5c8a6b',
        glowColor: 'rgba(92, 138, 107, 0.45)',
        features: [
          'Dúo Internet + TV Digital Avanzado',
          '500 Megas de velocidad',
          'Canales: 125 HD – 27 SD',
          'Sin plataforma de streaming premium',
          'Decodificador básico sin funciones Smart'
        ],
        highlightBenefit: '⚠ Tarifa fija de $109.200 sin apps de video ni asistencias para el hogar.',
        verdict: 'Pagas $109.200 por TV estándar sin plataformas modernas.'
      },
      {
        id: 'c1-sombras-d',
        arcanaNumber: 'II',
        arcanaTitle: 'LAS SOMBRAS',
        name: 'Competidor Plan Sombras',
        type: 'competitor',
        price: '$84.900',
        period: '/ mes',
        badge: 'Sencillo Solo Internet',
        speed: '500 Megas Simétricas',
        imageSrc: calabazaBImg,
        accentColor: '#ff7a29',
        glowColor: 'rgba(255, 122, 41, 0.45)',
        features: [
          'Solo conexión a Internet',
          '500 Megas Simétricas',
          'Cero canales de televisión',
          'Sin decodificadores ni apps',
          'El cliente gasta $50.000+ comprando TV y streaming'
        ],
        highlightBenefit: '⚠ No incluye televisión ni entretenimiento familiar.',
        verdict: 'Plan incompleto para hogares que requieren televisión y contenido.'
      },
      {
        id: 'c3-fantasma-d',
        arcanaNumber: '★',
        arcanaTitle: 'LA CARTA FANTASMA',
        name: 'Fantasma Claro Doble Play Plus',
        type: 'ghost',
        price: '$104.900',
        period: '/ mes',
        badge: '¡LA CONTRAOFERTA GANADORA!',
        speed: '500 / 900 Megas Simétricas',
        imageSrc: fantasmaClaroImg,
        accentColor: '#e2001a',
        glowColor: 'rgba(226, 0, 26, 0.75)',
        features: [
          'Doble Internet + TV intermedia plus por $104.900',
          '500 / 900 Megas Simétricas de alta estabilidad',
          'Canales: 72 HD + 2 Emisoras y Música',
          '1 Deco HD incluido con guía interactiva',
          'Elige 1 app de video: Netflix, WIN, HBO Max, Amazon, Disney',
          'Universal+ + Atres Player + Claro video incluidos',
          '1 Asistencia a elegir: Médica / Hogar / Pets',
          'Claro Drive para almacenamiento en la nube'
        ],
        highlightBenefit: '⭐ MÁS BARATO QUE EL RIVAL ($104.900 vs $109.200) e incluye 1 App Streaming a elección + Universal+ gratis.',
        verdict: '¡INMEJORABLE! Ahorro mensual, mayor velocidad y streaming incluido.'
      }
    ]
  },
  {
    id: 'sencillo-internet',
    title: 'Duelo Ligero: Sencillo Solo Internet Fibra',
    subtitle: 'Conexión Pura de Alta Velocidad + Apps de Video de Regalo',
    category: 'Sencillo Internet',
    cards: [
      {
        id: 'c1-sombras-s',
        arcanaNumber: 'I',
        arcanaTitle: 'LAS SOMBRAS',
        name: 'Competidor Plan Sombras',
        type: 'competitor',
        price: '$84.900',
        period: '/ mes',
        badge: 'Sencillo Internet Rival',
        speed: '500 Megas Simétricas',
        imageSrc: calabazaAImg,
        accentColor: '#ff7a29',
        glowColor: 'rgba(255, 122, 41, 0.45)',
        features: [
          'Sencillo Internet 500 Megas Simétricas',
          'Sin aplicaciones de video incluidas',
          'Sin almacenamiento en la nube',
          'Sin programa de lealtad ni beneficios móviles',
          'Soporte limitado'
        ],
        highlightBenefit: '⚠ Conexión básica sin valor agregado; streaming se paga por separado.',
        verdict: 'Aparenta ser $5.000 más barato, pero no da ningún contenido de streaming.'
      },
      {
        id: 'c2-espejismo-s',
        arcanaNumber: 'II',
        arcanaTitle: 'EL ESPEJISMO',
        name: 'Competidor Plan Espejismo',
        type: 'competitor',
        price: '$92.000',
        period: '/ mes',
        badge: 'Internet con Subida Asimétrica',
        speed: '500 Megas Bajada / 50 Subida',
        imageSrc: ataudImg,
        accentColor: '#5c8a6b',
        glowColor: 'rgba(92, 138, 107, 0.45)',
        features: [
          'Velocidad de subida restringida (no simétrica)',
          'Router antiguo sin banda Wi-Fi 5 GHz',
          'Sin plataformas de video',
          'Cobro por visita técnica o cambio de clave'
        ],
        highlightBenefit: '⚠ Saturación de red en videollamadas, cámaras y consolas de videojuegos.',
        verdict: 'Precio más alto ($92.000) por una red asimétrica deficiente.'
      },
      {
        id: 'c3-fantasma-s',
        arcanaNumber: '★',
        arcanaTitle: 'LA CARTA FANTASMA',
        name: 'Fantasma Claro Sencillo Internet',
        type: 'ghost',
        price: '$89.900',
        period: '/ mes',
        badge: '¡LA CONTRAOFERTA GANADORA!',
        speed: '500 / 900 Megas Simétricas',
        imageSrc: fantasmaClaroImg,
        accentColor: '#e2001a',
        glowColor: 'rgba(226, 0, 26, 0.75)',
        features: [
          'Sencillo Internet 500 / 900 Megas Simétricas Reales',
          'Elige 1 app de video: Netflix, WIN, HBO Max, Amazon Prime, Disney',
          'Universal+ + Atres Player + Claro video incluidos de cortesía',
          'Claro Drive para fotos y archivos en la nube',
          'Claro Club con 2x1 en cines y descuentos comerciales',
          'Módem Wi-Fi Dual Band de última generación sin costo extra'
        ],
        highlightBenefit: '⭐ POR SOLO $5.000 DE DIFERENCIA, te regalamos Netflix o WIN Sports+ y Universal+, ahorrando más de $35.000 en suscripciones cada mes.',
        verdict: '¡ELECCIÓN INTELIGENTE! Máxima velocidad simétrica y streaming gratis.'
      }
    ]
  }
];
