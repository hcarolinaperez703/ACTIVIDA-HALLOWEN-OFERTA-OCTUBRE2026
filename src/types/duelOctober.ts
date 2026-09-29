export type SessionCity = 'Barranquilla' | 'Santa Marta' | 'Cartagena' | 'Montería' | 'Virtual';
export type SessionStatus = 'active' | 'closed';

export interface DuelCardItem {
  id: string;
  doorNumber: number;
  title: string;
  doorTitle?: string;
  competitorName: string;
  competitorTag: string;
  competitorPrice: string;
  competitorData: string;
  competitorFeatures: string[];
  competitorTrap: string;
  claroTitle: string;
  claroPrice: string;
  claroData: string;
  claroFeatures: string[];
  claroPitch: string;
  questionPrompt: string;
}

export interface CitySession {
  id: string;
  city: SessionCity;
  status: SessionStatus;
  updatedAt: number;
  activeDoorId?: string | null;
}

export interface SoundConfig {
  hasCustomSound: boolean;
  soundName: string;
  volume: number; // 0 to 1
}

export interface FullAppConfigExport {
  appTitle: string;
  exportDate: string;
  repository: string;
  sessions: CitySession[];
  cards: DuelCardItem[];
  sound: SoundConfig;
}
