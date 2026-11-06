import { SequenceGameItem, MatchGamePair } from '@/types/presentation';

export const PHOTOSYNTHESIS_ENERGY_SEQUENCE: SequenceGameItem[] = [
  {
    "id": "seq-1",
    "order": 1,
    "label": "Penyerapan Energi",
    "iconEmoji": "☀️",
    "description": "Klorofil daun menyerap sinar matahari dan menghirup CO2 dari udara."
  },
  {
    "id": "seq-2",
    "order": 2,
    "label": "Reaksi Kimiawi",
    "iconEmoji": "🧪",
    "description": "Air (H2O) dari akar dipecah menjadi energi kimia dan oksigen."
  },
  {
    "id": "seq-3",
    "order": 3,
    "label": "Pelepasan Oksigen",
    "iconEmoji": "💨",
    "description": "Oksigen (O2) dilepaskan ke udara untuk dihirup makhluk hidup."
  },
  {
    "id": "seq-4",
    "order": 4,
    "label": "Sintesis Glukosa",
    "iconEmoji": "🍎",
    "description": "Gula/glukosa disimpan menjadi nutrisi buah dan rantai makanan satwa."
  }
];

export const FOREST_TROPHIC_PAIRS: MatchGamePair[] = [
  {
    "id": "pair-produsen",
    "leftText": "Pohon Ara",
    "rightText": "Produsen autotrof"
  },
  {
    "id": "pair-herbivora",
    "leftText": "Orangutan",
    "rightText": "Konsumen penyebar biji"
  },
  {
    "id": "pair-karnivora",
    "leftText": "Macan Dahan",
    "rightText": "Predator puncak"
  },
  {
    "id": "pair-dekomposer",
    "leftText": "Jamur Lapuk",
    "rightText": "Pengurai tanah"
  }
];

