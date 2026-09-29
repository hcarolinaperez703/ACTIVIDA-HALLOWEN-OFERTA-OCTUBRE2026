import { DuelScenario } from '../types/duel';

export interface PredefinedCompetitor {
  id: string;
  name: string;
  alias: string;
  category: string;
  competitorType: 'calabaza-a' | 'ataud' | 'calabaza-b';
  icon: string;
  color: string;
  badge: string;
  description: string;
  duelPreset: DuelScenario;
}

export const PREDEFINED_COMPETITORS: PredefinedCompetitor[] = [
  {
    id: 'plan-brujo',
    name: 'Competidor 1: Plan Brujo',
    alias: 'Triple Play $149.900/mes',
    category: 'Triple Play (Hogar + Móvil)',
    competitorType: 'calabaza-a',
    icon: '🎃',
    color: '#ff7a29',
    badge: 'Oferta Calabaza A',
    description: 'Triple $149.900/mes (Internet 500M + TV Avanzada 125 HD/27 SD + Celular Ilimitado + 2 Decos + Paramount+ y HBO x 12m).',
    duelPreset: {
      id: 'duelo-plan-brujo',
      title: 'Duelo 1: Plan Brujo vs. Fantasma Claro',
      subtitle: 'Competidor Plan Brujo (Calabaza A) vs. Contraoferta Claro Triple Superior',
      competitorType: 'calabaza-a',
      competitor: {
        brandName: 'Competidor Plan Brujo',
        planName: 'Triple $149.900/mes (Internet + TV + Móvil)',
        price: '$149.900 / mes',
        data: '500 Megas Simétricas',
        details: [
          'Canales: 125 HD / 27 SD con 2 Decodificadores',
          'Celular Ilimitado incluido en paquete cerrado',
          'Paramount+ incluido por solo 12 meses',
          'HBO (Max) incluido condicionado por 12 meses'
        ],
        hiddenTrap: 'Tarifa de $149.900 con streaming temporal (vence al mes 12). Menos canales HD/SD totales y sin opciones de combos de streaming flexibles.',
        weaknessTitle: 'La Ilusión del Triple Anzuelo'
      },
      claro: {
        planName: 'Triple Claro Superior + Telefonía Fija',
        price: '$131.900 / mes ($18.000 MENOS)',
        data: '500 / 900 Megas Ultrarrápidas',
        details: [
          '276 canales totales (173 canales, 103 SD, 64 HD + emisoras/música)',
          '1 Deco HD + 1 Deco Digital incluido sin costo adicional',
          'Elige 2 apps de video: combos Netflix+WIN, Netflix+Max, WIN+Amazon, Disney',
          'Universal+ con AtresPlayer + Claro Video incluidos de forma permanente',
          '1 Asistencia a elegir (Médica, Hogar o Pets) + McAfee 3 equipos + Claro Drive'
        ],
        killerPitch: 'Con Claro el cliente paga $131.900 en vez de $149.900 (ahorra $18.000 cada mes), recibe hasta 900 Megas, 276 canales frente a 152 del rival, elige 2 apps de video premium (Netflix, WIN, Max o Amazon) y disfruta Universal+ permanente con asistencia para hogar/mascotas.',
        advantageTitle: 'Ecosistema Claro Imbatible ($18.000 más económico)',
        promoTag: 'TRIPLE SUPERIOR HALLOWEEN'
      }
    }
  },
  {
    id: 'plan-sepulcro',
    name: 'Competidor 2: Plan Sepulcro',
    alias: 'Doble Play $109.200/mes',
    category: 'Doble Play (Internet + TV)',
    competitorType: 'ataud',
    icon: '⚰️',
    color: '#5c8a6b',
    badge: 'Oferta Ataúd Verde',
    description: 'Duo Internet + TV Digital $109.200 (500M + TV Digital Avanzado 125 HD/27 SD). Sin apps de streaming incluidas de base.',
    duelPreset: {
      id: 'duelo-plan-sepulcro',
      title: 'Duelo 2: Plan Sepulcro vs. Fantasma Claro',
      subtitle: 'Competidor Plan Sepulcro (Ataúd) vs. Doble Claro Intermedia Plus',
      competitorType: 'ataud',
      competitor: {
        brandName: 'Competidor Plan Sepulcro',
        planName: 'Duo Internet + TV Digital $109.200',
        price: '$109.200 / mes',
        data: '500 Megas Simétricas',
        details: [
          'Televisión Digital Avanzado (125 HD – 27 SD)',
          'Sin apps de streaming premium incluidas en tarifa base',
          'Sin asistencias médicas ni del hogar de cortesía',
          'Soporte técnico estándar'
        ],
        hiddenTrap: 'Pagas $109.200 y no incluye ninguna app de streaming de video. Si el cliente contrata Netflix o Max por separado, su factura real supera los $140.000.',
        weaknessTitle: 'La Trampa Sepulcral del Streaming Ausente'
      },
      claro: {
        planName: 'Doble Internet + TV Intermedia Plus Claro',
        price: '$104.900 / mes (Tarifa Más Baja)',
        data: '500 / 900 Megas Simétricas Reales',
        details: [
          'Canales 72 HD + emisoras y música con 1 Deco HD incluido',
          'Elige 1 App de video incluida: Netflix, WIN Sports, Max, Prime Video o Disney',
          'Universal+ y AtresPlayer + Claro Video incluidos de base',
          '1 Asistencia a elección: Médica, Hogar o Pets',
          'Claro Drive en la nube y Claro Club con 2x1 permanente'
        ],
        killerPitch: 'Por $104.900 (más barato que los $109.200 del rival), en Claro te llevas hasta 900 Megas, Deco HD, una app de streaming top a tu elección (Netflix, WIN, Max, Amazon o Disney), más Universal+ permanente y asistencia para tu familia o mascota.',
        advantageTitle: 'Mayor Velocidad, Menor Precio y Streaming Top',
        promoTag: 'DOBLE INTERMEDIA HALLOWEEN'
      }
    }
  },
  {
    id: 'plan-sombras',
    name: 'Competidor 3: Plan Sombras',
    alias: 'Sencillo Solo Internet $84.900/mes',
    category: 'Single Play (Solo Internet Hogar)',
    competitorType: 'calabaza-b',
    icon: '🎃',
    color: '#ff7a29',
    badge: 'Oferta Calabaza B',
    description: 'Sencillo Solo Internet $84.900 (500M simétricas). Sin entretenimiento, sin apps de video ni beneficios de valor agregado.',
    duelPreset: {
      id: 'duelo-plan-sombras',
      title: 'Duelo 3: Plan Sombras vs. Fantasma Claro',
      subtitle: 'Competidor Plan Sombras (Calabaza B) vs. Sencillo Internet Claro + Entretenimiento',
      competitorType: 'calabaza-b',
      competitor: {
        brandName: 'Competidor Plan Sombras',
        planName: 'Sencillo Solo Internet $84.900',
        price: '$84.900 / mes',
        data: '500 Megas Simétricas',
        details: [
          'Solo conexión de Internet fija en el hogar',
          'Cero plataformas de streaming o televisión incluidas',
          'Sin almacenamiento en la nube ni club de fidelización',
          'Sin asistencias domiciliarias o de mascotas'
        ],
        hiddenTrap: 'Aparenta ser barato por $84.900, pero es un internet "pelado": el cliente debe pagar $25.000 a $40.000 adicionales por cualquier plataforma de series o fútbol.',
        weaknessTitle: 'La Soledad de las Megas Vacías'
      },
      claro: {
        planName: 'Sencillo Internet Claro 500/900M + Streaming',
        price: '$89.900 / mes',
        data: '500 / 900 Megas Simétricas Directas',
        details: [
          'Elige 1 App de video incluida: Netflix, WIN+, Max, Amazon Prime o Disney',
          'Universal+ incluido con series exclusivas + AtresPlayer + Claro Video',
          'Claro Drive para fotos y archivos en la nube',
          'Claro Club con descuentos 2x1 en cine y restaurantes',
          'Despliegue de red líder con soporte y estabilidad garantizada'
        ],
        killerPitch: 'Por apenas $5.000 de diferencia frente a los $84.900 del rival, en Claro el cliente recibe hasta 900 Megas y un combo de streaming que por fuera le costaría más de $35.000: ¡elige Netflix, WIN, Max o Amazon, más Universal+ incluido de regalo!',
        advantageTitle: 'Internet Potente con Streaming de Regalo',
        promoTag: 'INTERNET STREAMING HALLOWEEN'
      }
    }
  }
];
