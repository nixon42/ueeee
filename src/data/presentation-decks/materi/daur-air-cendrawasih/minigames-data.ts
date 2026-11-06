import { SequenceGameItem, MatchGamePair } from '@/types/presentation';

export const WATER_CYCLE_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'h1',
    order: 1,
    label: 'Evaporasi',
    iconEmoji: '☀️',
    description: 'Penguapan molekul air laut, danau, dan sungai ke atmosfer akibat energi panas matahari.',
  },
  {
    id: 'h2',
    order: 2,
    label: 'Kondensasi',
    iconEmoji: '☁️',
    description: 'Uap air naik ke atmosfer dingin dan mengembun menjadi butiran es/air pembentuk awan tebal.',
  },
  {
    id: 'h3',
    order: 3,
    label: 'Presipitasi',
    iconEmoji: '🌧️',
    description: 'Awan jenuh menjatuhkan butiran air kembali ke daratan dan lautan sebagai hujan lebat.',
  },
  {
    id: 'h4',
    order: 4,
    label: 'Infiltrasi',
    iconEmoji: '🌱',
    description: 'Air hujan diserap pori-pori tanah menjadi air tanah (akuifer) dan mengalir kembali ke laut.',
  },
];

export const ENERGY_TRANSFORMATION_PAIRS: MatchGamePair[] = [
  {
    id: 'e1',
    leftText: 'Surya',
    rightText: 'Fotosintesis',
  },
  {
    id: 'e2',
    leftText: 'Air',
    rightText: 'Kincir Turbin',
  },
  {
    id: 'e3',
    leftText: 'Kimia',
    rightText: 'Otot Anak',
  },
  {
    id: 'e4',
    leftText: 'Kalor',
    rightText: 'Sirkulasi Angin',
  },
];
