import { DuelCardItem, CitySession } from '../types/duelOctober';

export const INITIAL_CITY_SESSIONS: CitySession[] = [
  { id: 'barranquilla', city: 'Barranquilla', status: 'closed', updatedAt: Date.now() },
  { id: 'santa-marta', city: 'Santa Marta', status: 'closed', updatedAt: Date.now() },
  { id: 'cartagena', city: 'Cartagena', status: 'closed', updatedAt: Date.now() },
  { id: 'monteria', city: 'Montería', status: 'closed', updatedAt: Date.now() },
  { id: 'virtual', city: 'Virtual', status: 'closed', updatedAt: Date.now() },
];

export const INITIAL_DUEL_CARDS: DuelCardItem[] = [
  {
    id: 'duelo-1',
    doorNumber: 1,
    title: 'Competidor Plan Brujo VS Fantasma Claro',
    doorTitle: 'Puerta 1: El Hechizo del Triple Play',
    questionPrompt: '¿Cómo contraatacas al cliente que cree que la oferta rival es más completa por tener HBO?',
    competitorName: 'Competidor Plan Brujo',
    competitorTag: 'Calabaza A • Triple Play Rival',
    competitorPrice: '$149.900',
    competitorData: '500 Megas Simétricas',
    competitorFeatures: [
      'Triple Play: Internet + TV Avanzada + Celular Ilimitado',
      '500 Megas Simétricas',
      'Canales: 125 HD / 27 SD con 2 Decodificadores',
      'Paramount+ incluido en tu plan x 12 meses',
      'HBO incluido en tu plan x 12 meses'
    ],
    competitorTrap: 'Pagas $149.900 y al mes 13 el streaming caduca o sube de precio automáticamente, obligando a pagar extra.',
    claroTitle: 'Fantasma Claro Triple Play',
    claroPrice: '$131.900',
    claroData: '500 / 900 Megas Simétricas',
    claroFeatures: [
      'Ahorro directo de $18.000 cada mes ($216.000 al año)',
      'Internet + TV superior + línea fija por solo $131.900',
      '276 Canales Totales (173 SD + 103 HD 64) + Emisoras',
      '1 Deco HD incluido / 1 Deco Digital incluido',
      'Elige 2 apps de video: Netflix+WIN, Max+Disney, etc.',
      'Universal+ + Atres Player + Claro video incluidos',
      '1 Asistencia (Médica/Hogar/Pets) + McAfee 3 equipos + Drive + Club'
    ],
    claroPitch: '«Con Claro pagas solo $131.900 ahorrándote $18.000 al mes ($216.000 al año) frente a su plan de $149.900, con 276 canales totales, 2 decodificadores y 2 plataformas de video de regalo sin caducidad.»'
  },
  {
    id: 'duelo-2',
    doorNumber: 2,
    title: 'Competidor Plan Sepulcro VS Fantasma Claro',
    doorTitle: 'Puerta 2: El Ataúd de la Permanencia',
    questionPrompt: '¿Qué argumento usas si el cliente teme cambiar de operador por una supuesta penalización?',
    competitorName: 'Competidor Plan Sepulcro',
    competitorTag: 'Ataúd • Doble Play Rival',
    competitorPrice: '$109.200',
    competitorData: '500 Megas',
    competitorFeatures: [
      'Duo Internet + TV Digital $109.200',
      '500 Megas de velocidad',
      'Televisión Digital avanzado',
      'Canales: 125 HD – 27 SD',
      'Sin plataformas SVOD de cortesía'
    ],
    competitorTrap: 'Penalidad oculta de cancelación y cobro recurrente por el segundo control remoto y decodificador.',
    claroTitle: 'Fantasma Claro Doble Play Plus',
    claroPrice: '$104.900',
    claroData: '500 / 900 Megas Simétricas',
    claroFeatures: [
      'Más económico que el rival ($104.900 vs $109.200)',
      'Doble Internet + TV intermedia plus $104.900',
      'Canales: 72 HD + 2 Emisoras y Música',
      '1 Deco HD incluido con guía interactiva',
      'Elige 1 app de video: Netflix, WIN, HBO Max, Amazon, Disney',
      'Universal+ + Atres Player + Claro video incluidos',
      '1 Asistencia a elegir (Médica/Hogar/Pets) + Claro Drive'
    ],
    claroPitch: '«¿Por qué pagar $109.200 por TV estándar sin apps cuando en Claro por $104.900 tienes 500/900 Megas simétricas, deco HD, 1 app de video a elección y Universal+ de regalo?»'
  },
  {
    id: 'duelo-3',
    doorNumber: 3,
    title: 'Competidor Plan Sombras VS Fantasma Claro',
    doorTitle: 'Puerta 3: La Oscuridad del Solo Internet',
    questionPrompt: '¿Cómo demuestras el ahorro real a un cliente que solo cotiza megas de internet y no cuenta el streaming?',
    competitorName: 'Competidor Plan Sombras',
    competitorTag: 'Calabaza B • Solo Internet Rival',
    competitorPrice: '$84.900',
    competitorData: '500 Megas Simétricas',
    competitorFeatures: [
      'Sencillo Internet 500 Megas Simétricas',
      'Cero aplicaciones o plataformas de video incluidas',
      'Sin almacenamiento en la nube',
      'Sin beneficios o descuentos en líneas móviles'
    ],
    competitorTrap: 'Aparenta ser más barato, pero el cliente termina contratando streaming por separado gastando más de $45.000 extras.',
    claroTitle: 'Fantasma Claro Sencillo Internet',
    claroPrice: '$89.900',
    claroData: '500 / 900 Megas Simétricas',
    claroFeatures: [
      '500 / 900 Megas Simétricas Reales',
      'Elige 1 app de video: Netflix, WIN, HBO Max, Amazon Prime, Disney',
      'Universal+ + Atres Player + Claro video incluidos sin costo',
      'Claro Drive para fotos y archivos en la nube',
      'Claro Club con beneficios comerciales',
      'Módem Dual Band Wi-Fi de última generación'
    ],
    claroPitch: '«Por solo $5.000 de diferencia frente a su plan vacío de $84.900, en Claro por $89.900 te regalamos Netflix o WIN Sports+ y Universal+, ahorrando más de $35.000 en suscripciones cada mes.»'
  }
];
