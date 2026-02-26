import { CarbonCredit, ImpactStats } from './types';

export const MOCK_STATS: ImpactStats = {
  farmers: 124500,
  credits: 850000,
  co2Offset: 4200000,
  incomeDistributed: 12500000,
};

export const MOCK_CREDITS: CarbonCredit[] = [
  {
    id: '1',
    cooperative: 'Vidarbha Farmer Co-op',
    quantity: 1200,
    price: 15.5,
    verificationScore: 98,
    region: 'Maharashtra',
    type: 'Soil',
    esgRating: 'AAA',
  },
  {
    id: '2',
    cooperative: 'Punjab Green Growers',
    quantity: 2500,
    price: 14.2,
    verificationScore: 95,
    region: 'Punjab',
    type: 'Methane',
    esgRating: 'AA',
  },
  {
    id: '3',
    cooperative: 'Kerala Agro-Forestry',
    quantity: 800,
    price: 18.0,
    verificationScore: 99,
    region: 'Kerala',
    type: 'Forestry',
    esgRating: 'AAA',
  },
  {
    id: '4',
    cooperative: 'Bihar Sustainable Soils',
    quantity: 1500,
    price: 12.8,
    verificationScore: 92,
    region: 'Bihar',
    type: 'Soil',
    esgRating: 'A',
  },
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Marketplace', path: '/marketplace' },
  { name: 'Farmer', path: '/farmer-dashboard' },
  { name: 'Admin', path: '/admin' },
  { name: 'Intelligence', path: '/intelligence' },
  { name: 'Architecture', path: '/architecture' },
];
