import { SequenceGameItem, MatchGamePair } from '@/types/presentation';

export const SOLAR_PLANETS_SEQUENCE: SequenceGameItem[] = [
  {
    "id": "p1",
    "order": 1,
    "label": "1. Merkurius",
    "iconEmoji": "🌑",
    "description": "Planet terdekat dari matahari dengan suhu permukaan ekstrem siang dan malam."
  },
  {
    "id": "p2",
    "order": 2,
    "label": "2. Venus",
    "iconEmoji": "🌕",
    "description": "Planet terpanas di tata surya akibat efek rumah kaca atmosfer karbon dioksida tebal."
  },
  {
    "id": "p3",
    "order": 3,
    "label": "3. Bumi",
    "iconEmoji": "🌍",
    "description": "Satu-satunya planet berpenghuni dengan air cair, atmosfer kaya oksigen, dan medan magnet."
  },
  {
    "id": "p4",
    "order": 4,
    "label": "4. Mars",
    "iconEmoji": "🔴",
    "description": "Planet merah kaya mineral besi dengan gunung berapi tertinggi Olympus Mons."
  },
  {
    "id": "p5",
    "order": 5,
    "label": "5. Jupiter",
    "iconEmoji": "🟠",
    "description": "Raksasa gas terbesar bermassa lebih dari gabungan seluruh planet lainnya, berhiaskan Bintik Merah Raksasa."
  },
  {
    "id": "p6",
    "order": 6,
    "label": "6. Saturnus",
    "iconEmoji": "🪐",
    "description": "Planet gas bermahkota cincin partikel es dan batuan paling spektakuler dan luas."
  },
  {
    "id": "p7",
    "order": 7,
    "label": "7. Uranus",
    "iconEmoji": "🧊",
    "description": "Raksasa es berwarna biru kehijauan metana dengan poros rotasi merebah menyamping."
  },
  {
    "id": "p8",
    "order": 8,
    "label": "8. Neptunus",
    "iconEmoji": "🔵",
    "description": "Planet terjauh berangin badai supersonik berkekuatan ribuan kilometer per jam."
  }
];

export const SPACE_CHARACTERISTICS_PAIRS: MatchGamePair[] = [
  {
    "id": "a1",
    "leftText": "Planet Mars",
    "rightText": "Planet Merah kaya debu oksida besi"
  },
  {
    "id": "a2",
    "leftText": "Planet Jupiter",
    "rightText": "Raksasa gas dengan Bintik Merah Raksasa"
  },
  {
    "id": "a3",
    "leftText": "Planet Saturnus",
    "rightText": "Planet berkepemilikan cincin es spektakuler"
  },
  {
    "id": "a4",
    "leftText": "Sabuk Asteroid",
    "rightText": "Cincin batuan purba antara Mars dan Jupiter"
  }
];

export const CELESTIAL_CHARACTERISTICS_PAIRS = SPACE_CHARACTERISTICS_PAIRS;

export const ECLIPSE_GEOMETRY_SEQUENCE: SequenceGameItem[] = [
  {
    "id": "gm1",
    "order": 1,
    "label": "Matahari",
    "iconEmoji": "☀️",
    "description": "Bintang pusat tata surya yang memancarkan berkas foton sinar sejajar ke seluruh antariksa."
  },
  {
    "id": "gm2",
    "order": 2,
    "label": "Bulan",
    "iconEmoji": "🌑",
    "description": "Satelit alami yang berada tepat di tengah melintasi garis lurus ekliptika menutupi piringan surya."
  },
  {
    "id": "gm3",
    "order": 3,
    "label": "Bumi (Zona Umbra)",
    "iconEmoji": "🌍",
    "description": "Permukaan tempat jatuhnya kerucut bayangan inti umbra, tempat pengamat menyaksikan gerhana matahari total."
  }
];

export const SOLAR_ECLIPSE_SEQUENCE = ECLIPSE_GEOMETRY_SEQUENCE;

