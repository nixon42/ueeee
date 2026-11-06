import { SequenceGameItem, MatchGamePair, FlashcardItem } from '@/types/presentation';

export const PROKLAMASI_1945_SEQUENCE: SequenceGameItem[] = [
  {
    "id": "p1",
    "order": 1,
    "label": "Kekalahan Jepang",
    "iconEmoji": "📻",
    "description": "Jepang menyerah tanpa syarat kepada Sekutu pasca bom Hiroshima & Nagasaki."
  },
  {
    "id": "p2",
    "order": 2,
    "label": "Rengasdengklok",
    "iconEmoji": "🚗",
    "description": "Pemuda membawa Soekarno-Hatta ke Karawang demi menjauhkan dari pengaruh Jepang."
  },
  {
    "id": "p3",
    "order": 3,
    "label": "Perumusan Naskah",
    "iconEmoji": "✍️",
    "description": "Soekarno, Hatta, dan Subardjo merumuskan naskah di kediaman Laksamana Maeda."
  },
  {
    "id": "p4",
    "order": 4,
    "label": "Pengetikan Sayuti Melik",
    "iconEmoji": "⌨️",
    "description": "Sayuti Melik mengetik naskah otentik dengan perubahan redaksi kata bersejarah."
  },
  {
    "id": "p5",
    "order": 5,
    "label": "Pembacaan Proklamasi",
    "iconEmoji": "🎙️",
    "description": "Pembacaan proklamasi di Pegangsaan Timur 56 diiringi pengibaran Merah Putih."
  }
];

export const PAHLAWAN_KEMERDEKAAN_PAIRS: MatchGamePair[] = [
  {
    "id": "t1",
    "leftText": "Sayuti Melik",
    "rightText": "Mengetik naskah proklamasi otentik dengan mesin tik"
  },
  {
    "id": "t2",
    "leftText": "Ibu Fatmawati",
    "rightText": "Menjahit helai demi helai bendera Sang Saka Merah Putih"
  },
  {
    "id": "t3",
    "leftText": "Frans & Alex Mendur",
    "rightText": "Mengabadikan dan menyelamatkan foto pembacaan proklamasi"
  },
  {
    "id": "t4",
    "leftText": "BM Diah",
    "rightText": "Menyelamatkan naskah tulisan tangan asli Bung Karno dari tong sampah"
  }
];

export const TOKOH_PERAN_PROKLAMASI_PAIRS = PAHLAWAN_KEMERDEKAAN_PAIRS;

export const PROKLAMASI_FLASHCARDS: FlashcardItem[] = [
  {
    "id": "pf-1",
    "frontPrompt": "Apa perbedaan penulisan penanggalan antara naskah tulisan tangan Bung Karno dan naskah ketikan Sayuti Melik?",
    "backAnswer": "Djakarta, 17 - 8 - '05 vs Djakarta, hari 17 boelan 8 tahoen '05",
    "backExplanation": "Tahun '05 merujuk pada tahun 2605 Kalender Jimmu Jepang yang berlaku resmi di Indonesia pada masa pendudukan militer.",
    "backCurriculumFact": "Sayuti Melik juga menyempurnakan frasa \"tempoh\" menjadi \"tempo\".",
    "frontEmoji": "📝"
  },
  {
    "id": "pf-2",
    "frontPrompt": "Siapakah tokoh pemuda yang mengusulkan teks proklamasi ditandatangani Soekarno-Hatta \"atas nama bangsa Indonesia\"?",
    "backAnswer": "Sukarni Kartodiwirjo",
    "backExplanation": "Gagasan brilian Sukarni menyatukan representasi seluruh rakyat Indonesia tanpa perlu seluruh peserta rapat menandatangani kertas.",
    "backCurriculumFact": "Menghindari kesan bahwa kemerdekaan hanya milik kelompok tertentu.",
    "frontEmoji": "💡"
  }
];

export const SUMPAH_PEMUDA_FLASHCARDS = PROKLAMASI_FLASHCARDS;

