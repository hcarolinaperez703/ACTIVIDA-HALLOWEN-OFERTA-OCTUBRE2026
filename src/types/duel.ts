export interface CardAsset {
  id: string;
  name: string;
  filename: string;
  imageSrc: string;
  accentColor: string;
  accentName: string;
  glowColor: string;
  competitorRole: string;
  silhouette: string;
  designNotes: string;
  svgPathType: 'pumpkin-a' | 'pumpkin-b' | 'coffin' | 'ghost';
}

export interface DuelScenario {
  id: string;
  title: string;
  subtitle: string;
  competitorType: 'calabaza-a' | 'ataud' | 'calabaza-b';
  competitor: {
    brandName: string;
    planName: string;
    price: string;
    data: string;
    details: string[];
    hiddenTrap: string; // La "trampa" u objeción a derribar
    weaknessTitle: string;
  };
  claro: {
    planName: string;
    price: string;
    data: string;
    details: string[];
    killerPitch: string; // Argumento de cierre maestro
    advantageTitle: string;
    promoTag: string;
  };
}
