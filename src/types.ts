export interface Farmer {
  id: string;
  name: string;
  location: string;
  landSize: number;
  creditsGenerated: number;
  earnings: number;
  aiConfidence: number;
}

export interface CarbonCredit {
  id: string;
  cooperative: string;
  quantity: number;
  price: number;
  verificationScore: number;
  region: string;
  type: 'Soil' | 'Forestry' | 'Methane';
  esgRating: 'AAA' | 'AA' | 'A' | 'B';
}

export interface ImpactStats {
  farmers: number;
  credits: number;
  co2Offset: number;
  incomeDistributed: number;
}

export type UserRole = 'FARMER' | 'CORPORATE' | 'ADMIN' | 'GUEST';
