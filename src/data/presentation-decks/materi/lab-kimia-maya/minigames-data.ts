import { MatchGamePair, SequenceGameItem, FlashcardItem } from '@/types/presentation';

export const LAB_K3_PAIRS: MatchGamePair[] = [
  {
    "id": "k1",
    "leftText": "Korosif (Asam Kuat)",
    "rightText": "Merusak jaringan kulit dan melarutkan logam"
  },
  {
    "id": "k2",
    "leftText": "Toksik (Tengkorak)",
    "rightText": "Beracun dan fatal bila terhirup atau tertelan"
  },
  {
    "id": "k3",
    "leftText": "Mudah Menyala (Api)",
    "rightText": "Mudah terbakar di dekat percikan api atau panas"
  },
  {
    "id": "k4",
    "leftText": "Reaktif / Eksplosif",
    "rightText": "Dapat meledak bila terkena benturan atau guncangan"
  }
];

export const SCIENTIFIC_METHOD_SEQUENCE: SequenceGameItem[] = [
  {
    "id": "m1",
    "order": 1,
    "label": "Observasi Fenomena",
    "iconEmoji": "👁️",
    "description": "Mengamati anomali reaksi kimia dan mencatat fakta empiris laboratorium."
  },
  {
    "id": "m2",
    "order": 2,
    "label": "Perumusan Masalah",
    "iconEmoji": "❓",
    "description": "Menyusun pertanyaan spesifik mengenai penyebab ketidakstabilan larutan."
  },
  {
    "id": "m3",
    "order": 3,
    "label": "Pengajuan Hipotesis",
    "iconEmoji": "💡",
    "description": "Merumuskan dugaan ilmiah sementara yang dapat dibuktikan melalui eksperimen."
  },
  {
    "id": "m4",
    "order": 4,
    "label": "Eksperimen Terkontrol",
    "iconEmoji": "🧪",
    "description": "Menguji variabel bebas dan terikat menggunakan titrasi dan instrumen lab."
  },
  {
    "id": "m5",
    "order": 5,
    "label": "Analisis & Kesimpulan",
    "iconEmoji": "📊",
    "description": "Menarik kesimpulan objektif berdasarkan data kuantitatif perubahan pH."
  }
];

export const LAB_FLASHCARDS: FlashcardItem[] = [
  {
    "id": "fc-lab-1",
    "frontPrompt": "Bagaimana perubahan warna kertas lakmus saat dicelupkan ke larutan asam cuka (CH3COOH)?",
    "backTitle": "Uji Sifat Asam",
    "backAnswer": "Kedua kertas lakmus menjadi/tetap berwarna MERAH",
    "backExplanation": "Larutan asam mempertahankan warna merah pada lakmus merah dan mengubah lakmus biru menjadi merah.",
    "category": "Indikator Asam"
  },
  {
    "id": "fc-lab-2",
    "frontPrompt": "Bagaimana perubahan warna kertas lakmus pada larutan pembersih sabun / basa (NaOH)?",
    "backTitle": "Uji Sifat Basa",
    "backAnswer": "Kedua kertas lakmus menjadi/tetap berwarna BIRU",
    "backExplanation": "Larutan basa mempertahankan warna biru pada lakmus biru dan mengubah lakmus merah menjadi biru.",
    "category": "Indikator Basa"
  },
  {
    "id": "fc-lab-3",
    "frontPrompt": "Berapakah nilai derajat pH air murni netral dan bagaimana pengaruhnya pada lakmus?",
    "backTitle": "Uji Sifat Netral",
    "backAnswer": "pH tepat 7.00 (Lakmus tidak berubah warna)",
    "backExplanation": "Pada pH 7.00, konsentrasi ion H+ sama persis dengan ion OH-. Lakmus merah tetap merah dan lakmus biru tetap biru.",
    "category": "Indikator Netral"
  }
];

