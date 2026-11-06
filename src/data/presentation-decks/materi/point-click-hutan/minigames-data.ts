import { MatchGamePair, SequenceGameItem, FlashcardItem } from '@/types/presentation';

export const BIOGEOGRAPHY_FAUNA_PAIRS: MatchGamePair[] = [
  {
    "id": "b1",
    "leftText": "Orangutan Kalimantan",
    "rightText": "Zona Asiatis (Paparan Sunda)"
  },
  {
    "id": "b2",
    "leftText": "Komodo Nusa Tenggara",
    "rightText": "Zona Peralihan (Wallacea NTT)"
  },
  {
    "id": "b3",
    "leftText": "Burung Cendrawasih",
    "rightText": "Zona Australis (Paparan Sahul Papua)"
  },
  {
    "id": "b4",
    "leftText": "Anoa Pegunungan",
    "rightText": "Zona Peralihan (Endemik Sulawesi)"
  }
];

export const CANOPY_STRATA_SEQUENCE: SequenceGameItem[] = [
  {
    "id": "k1",
    "order": 1,
    "label": "Lantai Hutan (0-5m)",
    "iconEmoji": "🍄",
    "description": "Lapisan tanah humus lembab dan gelap yang dihuni organisme pengurai jamur dan serangga."
  },
  {
    "id": "k2",
    "order": 2,
    "label": "Lapisan Bawah / Understory (5-15m)",
    "iconEmoji": "🌿",
    "description": "Semak belukar dan perdu berdaun lebar tempat hidup katak pohon dan reptil pemanjat."
  },
  {
    "id": "k3",
    "order": 3,
    "label": "Kanopi Utama (15-30m)",
    "iconEmoji": "🦧",
    "description": "Atap tajuk daun rimbun tempat tinggal 80% satwa hutan: Orangutan, bekantan, dan primata."
  },
  {
    "id": "k4",
    "order": 4,
    "label": "Lapisan Emergen (>30m)",
    "iconEmoji": "🦅",
    "description": "Pohon raksasa menjulang tinggi menembus kanopi tempat bersarang burung elang dan pemangsa."
  }
];

export const FOREST_CANOPY_STRATA_SEQUENCE = CANOPY_STRATA_SEQUENCE;

export const HUTAN_FLASHCARDS: FlashcardItem[] = [
  {
    "id": "fc-hutan-1",
    "frontPrompt": "Mengapa Orangutan Kalimantan dijuluki sebagai \"petani hutan alami\" (forest gardener)?",
    "backTitle": "Peran Ekologis Orangutan",
    "backAnswer": "Menyebarkan biji buah ara dan meregenerasi kanopi pohon",
    "backExplanation": "Orangutan memakan ratusan jenis buah hutan dan menjelajah koridor rimba yang luas, mengeluarkan feses berisi biji siap tumbuh sehingga pohon baru bersemi merata.",
    "category": "Peran Satwa Endemik"
  },
  {
    "id": "fc-hutan-2",
    "frontPrompt": "Sebutkan adaptasi morfologi khas orangutan yang mendukung gaya hidup di atas dahan pohon (arboreal)!",
    "backTitle": "Adaptasi Morfologi Arboreal",
    "backAnswer": "Rentang lengan ekstra panjang dan jemari kaki prehensil penggenggam",
    "backExplanation": "Lengan orangutan dapat mencapai rentang 2 meter dengan sendi bahu fleksibel untuk berayun (brachiation), serta jemari kaki yang mampu mencengkeram dahan kuat-kuat.",
    "category": "Adaptasi Satwa"
  }
];

export const TROPICAL_RAINFOREST_CARDS = HUTAN_FLASHCARDS;

