import { MatchGamePair, SequenceGameItem } from '@/types/presentation';

export const KBBI_BAKU_PAIRS: MatchGamePair[] = [
  {
    "id": "k1",
    "leftText": "Apotik",
    "rightText": "Apotek"
  },
  {
    "id": "k2",
    "leftText": "Ijin",
    "rightText": "Izin"
  },
  {
    "id": "k3",
    "leftText": "Praktek",
    "rightText": "Praktik"
  },
  {
    "id": "k4",
    "leftText": "Nasehat",
    "rightText": "Nasihat"
  },
  {
    "id": "k5",
    "leftText": "Analisa",
    "rightText": "Analisis"
  }
];

export const PROVERB_IDIOM_PAIRS = KBBI_BAKU_PAIRS;

export const PANTUN_NASEHAT_SEQUENCE: SequenceGameItem[] = [
  {
    "id": "pt1",
    "order": 1,
    "label": "Sampiran 1",
    "iconEmoji": "⛵",
    "description": "\"Berlayar perahu menuju Bangka,\" (Ujung rima: -ka)"
  },
  {
    "id": "pt2",
    "order": 2,
    "label": "Sampiran 2",
    "iconEmoji": "🌊",
    "description": "\"Singgah sejenak menebar sauh.\" (Ujung rima: -uh)"
  },
  {
    "id": "pt3",
    "order": 3,
    "label": "Isi 1",
    "iconEmoji": "📚",
    "description": "\"Tuntutlah ilmu selagi muda,\" (Ujung rima: -da senada dengan -ka)"
  },
  {
    "id": "pt4",
    "order": 4,
    "label": "Isi 2",
    "iconEmoji": "🌟",
    "description": "\"Supaya hari tua tidak mengeluh.\" (Ujung rima: -uh senada dengan sauh)"
  }
];

