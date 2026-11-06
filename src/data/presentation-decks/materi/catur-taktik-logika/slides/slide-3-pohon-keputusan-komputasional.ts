import { SlideDefinition } from '@/types/presentation';

export const slide3PohonKeputusanKomputasional: SlideDefinition = {
  "id": "ctl-slide-3",
  "type": "concept-infographic",
  "chapterBadge": "BABAK 3: MATERI INTI 2 - BERPIKIR KOMPUTASIONAL",
  "title": "Pohon Keputusan Komputasional & Hierarki Nilai Bidak",
  "subtitle": "Menerapkan dekomposisi masalah dan evaluasi bobot langkah dalam catur:",
  "cards": [
    {
      "id": "card-ct5",
      "levelBadge": "Nilai Relatif",
      "badgeColor": "blue",
      "iconEmoji": "💎",
      "title": "Skala Poin Perwira",
      "description": "Pion (1), Kuda (3), Gajah (3), Benteng (5), Ratu (9), dan Raja (tak ternilai). Jangan korbankan Ratu kecuali menjamin skakmat!"
    },
    {
      "id": "card-ct6",
      "levelBadge": "Dekomposisi",
      "badgeColor": "purple",
      "iconEmoji": "🌳",
      "title": "Pohon Keputusan (Branching)",
      "description": "Kalkulasikan formula sebab-akibat: \"Jika saya melangkah ke c8, respons paksaan lawan adalah... lalu langkah kemenangan saya adalah...\""
    },
    {
      "id": "card-ct7",
      "levelBadge": "Pola Masalah",
      "badgeColor": "emerald",
      "iconEmoji": "🎯",
      "title": "Pengenalan Pola Lemah",
      "description": "Mengidentifikasi petak tak terjaga (unprotected square) di sekitar perimeter Raja lawan sebelum meluncurkan kombinasi."
    }
  ],
  "teacherNotes": "Tekankan kepada siswa bahwa berpikir komputasional di catur sama dengan algoritma percabangan logika if-then di dunia pemrograman komputer."
};
