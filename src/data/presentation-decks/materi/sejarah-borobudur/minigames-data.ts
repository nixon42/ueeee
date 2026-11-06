import { SequenceGameItem, MatchGamePair, FlashcardItem } from '@/types/presentation';

export const CANDI_STRATA_SEQUENCE: SequenceGameItem[] = [
  {
    "id": "c1",
    "order": 1,
    "label": "Kamadhatu",
    "iconEmoji": "🦶",
    "description": "Tingkat dasar kaki candi melambangkan manusia yang masih dikuasai hawa nafsu duniawi."
  },
  {
    "id": "c2",
    "order": 2,
    "label": "Rupadhatu",
    "iconEmoji": "🧱",
    "description": "Empat teras persegi berlorong penuh ukiran relief perbuatan mulia melepaskan nafsu."
  },
  {
    "id": "c3",
    "order": 3,
    "label": "Arupadhatu",
    "iconEmoji": "🪷",
    "description": "Tiga pelataran lingkaran tempat 72 stupa berongga lambang alam tanpa wujud."
  },
  {
    "id": "c4",
    "order": 4,
    "label": "Stupa Induk",
    "iconEmoji": "✨",
    "description": "Puncak tertinggi candi melambangkan kebebasan mutlak dan pencerahan nirwana."
  }
];

export const BOROBUDUR_COSMOLOGY_SEQUENCE = CANDI_STRATA_SEQUENCE;

export const BOROBUDUR_RELIEF_PAIRS: MatchGamePair[] = [
  {
    "id": "r1",
    "leftText": "Relief Kapal Cadik Ganda",
    "rightText": "Bukti ketangguhan bahari nenek moyang"
  },
  {
    "id": "r2",
    "leftText": "Sistem Pasak Batu Andesit",
    "rightText": "Konstruksi teknik sambung purba tahan gempa"
  },
  {
    "id": "r3",
    "leftText": "Prasasti Kayumwungan (824 M)",
    "rightText": "Dokumen batu peresmian bangunan suci Jinaraja"
  },
  {
    "id": "r4",
    "leftText": "Arca Buddha Dhyani Bhumisparsha",
    "rightText": "Sikap tangan menyentuh bumi saksi keteguhan hati"
  }
];

export const BOROBUDUR_MARITIME_PAIRS = BOROBUDUR_RELIEF_PAIRS;

export const CANDI_RELIEF_STORY_PAIRS = BOROBUDUR_RELIEF_PAIRS;

export const BOROBUDUR_FLASHCARDS: FlashcardItem[] = [
  {
    "id": "bf-1",
    "frontPrompt": "Siapakah arsitek jenius yang memimpin perancangan dan pemahatan mahakarya Candi Borobudur?",
    "backAnswer": "Gunadharma",
    "backExplanation": "Tokoh arsitek legendaris yang dipercaya masyarakat Jawa beristirahat abadi membentuk siluet punggung Pegunungan Menoreh.",
    "backCurriculumFact": "Dibangun sekitar 750-825 Masehi pada masa Dinasti Syailendra.",
    "frontEmoji": "🏛️"
  },
  {
    "id": "bf-2",
    "frontPrompt": "Bagaimana Candi Borobudur (Buddha) dan Prambanan (Hindu) dapat berdiri berdampingan pada era yang sama?",
    "backAnswer": "Pernikahan Politik & Toleransi Luhur",
    "backExplanation": "Penyatuan Raja Rakai Pikatan (Sanjaya/Hindu) dan Pramodawardhani (Syailendra/Buddha) membuktikan tingginya harmoni kebhinekaan nenek moyang.",
    "backCurriculumFact": "Toleransi Mataram Kuno menjadi fondasi Bhinneka Tunggal Ika.",
    "frontEmoji": "🤝"
  }
];

