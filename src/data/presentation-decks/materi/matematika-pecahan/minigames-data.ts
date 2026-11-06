import { MatchGamePair, SequenceGameItem } from '@/types/presentation';

export const FRACTION_DECIMAL_PAIRS: MatchGamePair[] = [
  {
    "id": "f1",
    "leftText": "1/2",
    "rightText": "0.50"
  },
  {
    "id": "f2",
    "leftText": "3/4",
    "rightText": "0.75"
  },
  {
    "id": "f3",
    "leftText": "2/5",
    "rightText": "0.40"
  },
  {
    "id": "f4",
    "leftText": "1/8",
    "rightText": "0.125"
  }
];

export const FRACTION_DECIMAL_PERCENT_PAIRS = FRACTION_DECIMAL_PAIRS;

export const FRACTION_BLOCKS_SEQUENCE: SequenceGameItem[] = [
  {
    "id": "b1",
    "order": 1,
    "label": "1/5 (0.20)",
    "iconEmoji": "🧱",
    "description": "Balok paling ringan, bernilai seperlima bagian."
  },
  {
    "id": "b2",
    "order": 2,
    "label": "1/3 (0.33)",
    "iconEmoji": "🧱",
    "description": "Balok sepertiga, lebih besar dari seperlima."
  },
  {
    "id": "b3",
    "order": 3,
    "label": "1/2 (0.50)",
    "iconEmoji": "🧱",
    "description": "Balok setengah pas pembagi tengah jembatan."
  },
  {
    "id": "b4",
    "order": 4,
    "label": "3/4 (0.75)",
    "iconEmoji": "🧱",
    "description": "Balok tiga perempat yang menopang tiang utama."
  },
  {
    "id": "b5",
    "order": 5,
    "label": "9/10 (0.90)",
    "iconEmoji": "🧱",
    "description": "Balok terberat hampir utuh mendekati 1."
  }
];

export const FRACTION_BLOCK_SEQUENCE = FRACTION_BLOCKS_SEQUENCE;

