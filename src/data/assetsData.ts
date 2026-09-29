import { CardAsset, DuelScenario } from '../types/duel';

// Direct imports for Vite asset handling
import calabazaAImg from '../assets/images/calabaza_variante_a_1790365584205.jpg';
import calabazaBImg from '../assets/images/calabaza_variante_b_1790365594039.jpg';
import ataudImg from '../assets/images/ataud_card_1790365603367.jpg';
import fantasmaClaroImg from '../assets/images/fantasma_claro_1790365613768.jpg';

export const CARD_ASSETS: CardAsset[] = [
  {
    id: 'calabaza-a',
    name: 'Tarjeta Calabaza (Variante A)',
    filename: 'calabaza-variante-A.png',
    imageSrc: calabazaAImg,
    accentColor: '#ff7a29',
    accentName: 'Naranja Calabaza Neón',
    glowColor: 'rgba(255, 122, 41, 0.45)',
    competitorRole: 'Competidor 1 (Oferta Gancho / "Disfraz Barato")',
    silhouette: 'Bordes redondeados orgánicos con cortes estilizados de gajos en coronación y base. Formato vertical 3:4.',
    designNotes: 'Silueta de calabaza aristocrática de gala, acentos de filigrana metálica y brillo perimetral naranja cálido. Centro vacío de alta legibilidad.',
    svgPathType: 'pumpkin-a'
  },
  {
    id: 'calabaza-b',
    name: 'Tarjeta Calabaza (Variante B)',
    filename: 'calabaza-variante-B.png',
    imageSrc: calabazaBImg,
    accentColor: '#ff7a29',
    accentName: 'Naranja Calabaza Intenso',
    glowColor: 'rgba(255, 122, 41, 0.45)',
    competitorRole: 'Competidor 3 (Oferta Espejismo / "Bolsa de Dulces")',
    silhouette: 'Lóbulos geométricos modernos, segmentación sutil superior e inferior, estilo glassmorphic oscuro.',
    designNotes: 'Variación de card outline con curvas marcadas en esquinas superiores y arcos en base. Mantiene la armonía visual sin ser gemela exacta.',
    svgPathType: 'pumpkin-b'
  },
  {
    id: 'ataud',
    name: 'Tarjeta Ataúd',
    filename: 'ataud.png',
    imageSrc: ataudImg,
    accentColor: '#5c8a6b',
    accentName: 'Verde Musgo & Esmeralda Fría (#5c8a6b / #3c5943)',
    glowColor: 'rgba(92, 138, 107, 0.45)',
    competitorRole: 'Competidor 2 (Oferta Cadáver / "Permanencia que Atrapa")',
    silhouette: 'Silueta hexagonal tipo ataúd, ensanchada en hombros (28%-72%) y estilizada hacia la base.',
    designNotes: 'Biselado arquitectónico solemne en verde musgo y jade frío. Evoca frialdad comercial y límites contractuales para contrastar con la calidez y poder de Claro.',
    svgPathType: 'coffin'
  },
  {
    id: 'fantasma-claro',
    name: 'Tarjeta Fantasma Claro',
    filename: 'fantasma-claro.png',
    imageSrc: fantasmaClaroImg,
    accentColor: '#e2001a',
    accentName: 'Rojo Claro Marca (#e2001a) + Destello Carmín (#ff5a6a)',
    glowColor: 'rgba(226, 0, 26, 0.55)',
    competitorRole: 'Propuesta de Valor Claro (Contraoferta Imbatible / Cierre de Venta)',
    silhouette: 'Cúpula superior arqueada continua y base inferior en ondas/festones etéreos. Formato vertical 3:4.',
    designNotes: 'Efecto de halo rojo radiante con glow perimetral #e2001a. Posicionada como la carta definitiva de triunfo: prestigiosa, luminosa y contundente.',
    svgPathType: 'ghost'
  }
];

export const INITIAL_DUELS: DuelScenario[] = [
  {
    id: 'duelo-1',
    title: 'Duelo 1: Plan Brujo vs. Fantasma Claro',
    subtitle: 'Competidor 1 (Oferta Calabaza A) vs. Contraoferta Claro Triple Superior',
    competitorType: 'calabaza-a',
    competitor: {
      brandName: 'Competidor Plan Brujo',
      planName: 'Triple $149.900/mes (Internet + TV Avanzada + Celular)',
      price: '$149.900 / mes',
      data: '500 Megas Simétricas',
      details: [
        'Internet 500 Megas Simétricas + Celular Ilimitado',
        'Canales: 125 HD / 27 SD con 2 Decodificadores',
        'Paramount+ (Incluido en tu plan x 12 meses)',
        'HBO (Incluido en tu plan x 12 meses)'
      ],
      hiddenTrap: 'Pagas $149.900 y los streamings Paramount+ y HBO vencen al mes 12. Menos variedad de canales totales y sin beneficios de asistencia médica/hogar.',
      weaknessTitle: 'La Ilusión del Triple Anzuelo'
    },
    claro: {
      planName: 'Triple Claro Superior + Línea Fija',
      price: '$131.900 / mes (Ahorras $18.000)',
      data: '500 / 900 Megas Ultrarrápidas',
      details: [
        'Canales 173 (SD 103, HD 64, Emisoras y Música: 276 TOTAL)',
        '1 Deco HD incluido + 1 Deco Digital incluido',
        'Elige 2 apps de video: Netflix+WIN, Netflix+Max, WIN+Amazon, WIN+Max, Amazon+Max, Max+Disney',
        'Universal+ con AtresPlayer + Claro video incluidos de base',
        '1 Asistencia a elegir: Médica / Hogar / Pets + McAfee 3 equipos + Claro Drive + Claro Club'
      ],
      killerPitch: 'Por $131.900 en vez de $149.900 (ahorras $18.000/mes), en Claro te llevas hasta 900 Megas, 276 canales totales frente a 152 del rival, eliges 2 apps de streaming top a tu gusto (Netflix, WIN, Max o Amazon) y tienes Universal+ permanente más asistencia médica o para tu mascota.',
      advantageTitle: 'Triple Superior ($18.000 Menos + 2 Apps Video)',
      promoTag: 'TRIPLE SUPERIOR HALLOWEEN'
    }
  },
  {
    id: 'duelo-2',
    title: 'Duelo 2: Plan Sepulcro vs. Fantasma Claro',
    subtitle: 'Competidor 2 (Oferta Ataúd Verde) vs. Doble Claro Intermedia Plus',
    competitorType: 'ataud',
    competitor: {
      brandName: 'Competidor Plan Sepulcro',
      planName: 'Dúo Internet + TV Digital Avanzado $109.200',
      price: '$109.200 / mes',
      data: '500 Megas Simétricas',
      details: [
        'Internet 500 Megas Simétricas fijas',
        'Televisión Digital Avanzado: 125 HD – 27 SD',
        'Sin apps de video o streaming incluidas en la tarifa',
        'Sin asistencias médicas, de hogar ni beneficios de mascotas'
      ],
      hiddenTrap: 'Tarifa de $109.200 sin ninguna app de streaming incluida. Si el cliente contrata Netflix o Max por fuera, el costo mensual superará los $140.000.',
      weaknessTitle: 'La Trampa Sepulcral del Streaming Ausente'
    },
    claro: {
      planName: 'Doble Internet + TV Intermedia Plus Claro',
      price: '$104.900 / mes (Tarifa Más Económica)',
      data: '500 / 900 Megas Simétricas',
      details: [
        'Canales 72 HD + emisoras y música con 1 Deco HD incluido',
        'Elige 1 app de video incluida: Netflix, WIN Sports, HBO Max, Amazon Prime o Disney',
        'Universal+ con AtresPlayer + Claro video incluidos',
        '1 Asistencia a elegir: Médica / Hogar / Pets',
        'Claro Drive en la nube + Beneficios Claro Club 2x1'
      ],
      killerPitch: 'Por $104.900 (más barato que los $109.200 del rival), en Claro tienes hasta 900 Megas, Deco HD, una app de streaming de estreno a tu elección (Netflix, WIN, Max, Amazon o Disney), Universal+ permanente y una asistencia médica o de hogar de cortesía.',
      advantageTitle: 'Más Barato + 1 App Video Incluida',
      promoTag: 'DOBLE INTERMEDIA HALLOWEEN'
    }
  },
  {
    id: 'duelo-3',
    title: 'Duelo 3: Plan Sombras vs. Fantasma Claro',
    subtitle: 'Competidor 3 (Oferta Calabaza B) vs. Sencillo Internet Claro + Streaming',
    competitorType: 'calabaza-b',
    competitor: {
      brandName: 'Competidor Plan Sombras',
      planName: 'Sencillo Solo Internet $84.900',
      price: '$84.900 / mes',
      data: '500 Megas Simétricas',
      details: [
        'Solo conexión de Internet fija 500 Megas',
        'Cero plataformas de streaming o entretenimiento',
        'Sin almacenamiento en la nube ni club de fidelización',
        'Sin soporte de ciberseguridad ni asistencias familiares'
      ],
      hiddenTrap: 'Internet aislado sin entretenimiento: pagar $84.900 por megas solas obliga al cliente a gastar $30.000 o más en suscripciones separadas de series o partidos.',
      weaknessTitle: 'La Soledad de las Megas Vacías'
    },
    claro: {
      planName: 'Sencillo Internet Claro 500/900M + Entretenimiento',
      price: '$89.900 / mes',
      data: '500 / 900 Megas Simétricas',
      details: [
        'Elige 1 app de video: Netflix, WIN, HBO Max, Amazon Prime o Disney',
        'Universal+ con AtresPlayer + Claro video incluidos de base',
        'Claro Drive para fotos y archivos en la nube',
        'Claro Club con 2x1 en salas de cine y restaurantes',
        'Respaldo de la red de fibra y conectividad líder del país'
      ],
      killerPitch: 'Por solo $5.000 de diferencia frente a los $84.900 del rival, en Claro el cliente recibe hasta 900 Megas y se lleva de regalo una app de streaming top (Netflix, WIN, Max, Amazon o Disney) más Universal+ y Claro video, ahorrando más de $35.000 al mes.',
      advantageTitle: 'Megas Puras + Streaming Top de Regalo',
      promoTag: 'INTERNET STREAMING HALLOWEEN'
    }
  }
];

export const BRAND_TOKENS = {
  colors: [
    {
      name: 'Morado Medianoche',
      hex: '#150a24',
      role: 'Fondo principal envolvente y atmósfera corporativa nocturna',
      type: 'Background'
    },
    {
      name: 'Morado Profundo',
      hex: '#1f1033',
      role: 'Degradados de superficie, paneles y capas de elevación',
      type: 'Surface'
    },
    {
      name: 'Naranja Calabaza Neón',
      hex: '#ff7a29',
      role: 'Acento Competidor 1 y 3, resaltados de contraste y gajos',
      type: 'Competitor Acento'
    },
    {
      name: 'Verde Musgo Sepulcro',
      hex: '#5c8a6b',
      role: 'Acento Competidor 2 (Ataúd), líneas de bisel y atmósfera fría',
      type: 'Competitor Acento'
    },
    {
      name: 'Verde Bosque Sombrío',
      hex: '#3c5943',
      role: 'Borde interior y sombras del marco ataúd',
      type: 'Shadow / Deep Accent'
    },
    {
      name: 'Rojo Claro Marca',
      hex: '#e2001a',
      role: 'Identidad matriz de Claro, tarjeta ganadora de cierre comercial',
      type: 'Brand Hero'
    },
    {
      name: 'Rojo Resplandor Claro',
      hex: '#ff5a6a',
      role: 'Halo de luz, destellos neón y badges de victoria comercial',
      type: 'Brand Glow'
    },
    {
      name: 'Hueso Pergamino',
      hex: '#f3ead3',
      role: 'Tipografía principal, cifras clave y títulos para máxima legibilidad',
      type: 'Text & Icons'
    }
  ],
  typography: [
    {
      role: 'Titulares y Cifras de Impacto',
      font: 'Cinzel',
      weights: 'Bold / Black (700-900)',
      usage: 'Nombres de Planes, Precios gigantes, Título del Duelo, Encabezados de Victoria'
    },
    {
      role: 'Cuerpo de Texto y Argumentarios',
      font: 'Work Sans',
      weights: 'Regular / Medium (400-600)',
      usage: 'Detalles de la oferta, cláusulas de objeción, speech de cierre de venta'
    }
  ]
};
