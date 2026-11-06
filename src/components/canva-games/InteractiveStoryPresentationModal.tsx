import React from 'react';
import { StoryPresentationDeckEngine } from './StoryPresentationDeckEngine';
import { PresentationDeckData, SequenceGameItem, MatchGamePair } from '@/types/presentation';

export interface InteractiveStoryPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck?: PresentationDeckData;
  initialSlide?: number;
  onComplete?: () => void;
}

// Canonical Photosynthesis sequence data preserved for backward compatibility
export const PHOTOSYNTHESIS_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'seq-1',
    order: 1,
    label: 'Penyerapan Energi',
    iconEmoji: '☀️',
    description: 'Klorofil daun menyerap sinar matahari dan menghirup CO2 dari udara.',
  },
  {
    id: 'seq-2',
    order: 2,
    label: 'Reaksi Kimiawi',
    iconEmoji: '🧪',
    description: 'Air (H2O) dari akar dipecah menjadi energi kimia dan oksigen.',
  },
  {
    id: 'seq-3',
    order: 3,
    label: 'Pelepasan Oksigen',
    iconEmoji: '💨',
    description: 'Oksigen (O2) dilepaskan ke udara untuk dihirup makhluk hidup.',
  },
  {
    id: 'seq-4',
    order: 4,
    label: 'Sintesis Glukosa',
    iconEmoji: '🍎',
    description: 'Gula/glukosa disimpan menjadi nutrisi buah dan rantai makanan satwa.',
  },
];

// Canonical Ecosystem pairs data preserved for backward compatibility
export const ECOSYSTEM_PAIRS: MatchGamePair[] = [
  {
    id: 'pair-produsen',
    leftText: '🌳 Pohon Ara Raksasa',
    rightText: 'Produsen utama penghasil oksigen dan buah',
  },
  {
    id: 'pair-herbivora',
    leftText: '🦧 Orangutan Kalimantan',
    rightText: 'Konsumen herbivora dan agen penyebar biji pohon',
  },
  {
    id: 'pair-karnivora',
    leftText: '🐆 Macan Dahan',
    rightText: 'Predator karnivora pengendali keseimbangan populasi',
  },
  {
    id: 'pair-dekomposer',
    leftText: '🍄 Jamur Lapuk Kayu',
    rightText: 'Pengurai (dekomposer) yang menyuburkan kembali tanah',
  },
];

/**
 * Flagship Forest Ecosystem Deck Data
 */
export const DEFAULT_FOREST_DECK: PresentationDeckData = {
  gameId: 'presentasi-ekosistem-hutan',
  title: 'Presentasi Interaktif: Ekspedisi Hutan Tropis',
  subtitle: 'Cerita, Konsep Materi, & Mini-Game Canva',
  themeColor: 'emerald',
  icon: '🌿',
  category: 'sains',
  gradeLevel: 'SD Kelas 4-6',
  subjectDetail: 'Biologi, Fotosintesis & Rantai Makanan Tropis',
  mentor: {
    name: 'Prof. Maya',
    role: 'Kepala Tim Riset Konservasi Alam',
    avatarEmoji: '🌿',
  },
  slides: [
    {
      id: 'slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: PANGGILAN PETUALANGAN',
      title: 'Misi Penyelamatan Lembah Hutan Hujan',
      dialogue:
        'Halo rekan-rekan peneliti muda di kelas! Stasiun konservasi kita mendeteksi anomali di lembah hutan tropis Kalimantan. Rantai makanan terganggu dan pohon ara purba mengalami kekeringan fotosintesis. Kita membutuhkan bantuan seluruh kelas untuk merekonstruksi siklus energi dan memasangkan rantai ekosistem agar hutan ini kembali lestari. Siapkah kalian memulai misi ini?',
      missionObjective: 'Pulihkan fotosintesis dan rantai makanan lembah hutan',
      actionButtonText: 'Buka Materi Konsep Kunci',
    },
    {
      id: 'slide-2',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 2: KONSEP DASAR PEMBELAJARAN',
      title: 'Tiga Pilar Keseimbangan Ekosistem',
      subtitle: 'Pahami hubungan ketiga tingkat trofik ini sebelum menghadapi tantangan mini-game!',
      cards: [
        {
          id: 'card-1',
          iconEmoji: '🌱',
          levelBadge: 'Tingkat 1',
          title: 'Produsen (Autotrof)',
          description:
            'Tumbuhan hijau menangkap energi surya, air, dan CO2 melalui fotosintesis untuk memproduksi glukosa dan oksigen bagi seluruh ekosistem.',
          badgeColor: 'emerald',
        },
        {
          id: 'card-2',
          iconEmoji: '🦧',
          levelBadge: 'Tingkat 2',
          title: 'Konsumen (Heterotrof)',
          description:
            'Herbivora memakan dedaunan/buah dan menyebarkan biji pohon, sementara karnivora mengendalikan populasi agar hutan tidak over-grazing.',
          badgeColor: 'amber',
        },
        {
          id: 'card-3',
          iconEmoji: '🍄',
          levelBadge: 'Tingkat 3',
          title: 'Dekomposer (Pengurai)',
          description:
            'Jamur dan mikroba tanah menguraikan jasad organisme mati menjadi humus dan unsur hara mineral yang kembali diserap akar pohon.',
          badgeColor: 'purple',
        },
      ],
      teacherNotes:
        'Ajak 1-2 siswa menyebutkan contoh lain produsen dan konsumen yang ada di lingkungan sekitar sekolah sebelum masuk ke mini-game.',
    },
    {
      id: 'slide-3',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 3: TANTANGAN URUTAN SIKLUS',
      title: 'Tantangan 1: Urutkan Siklus Aliran Energi Fotosintesis',
      subtitle:
        'Pohon purba membutuhkan aktivasi siklus yang benar! Geser kartu langkah agar fotosintesis berjalan sempurna.',
      items: PHOTOSYNTHESIS_SEQUENCE,
      challengeKey: 'challenge1',
    },
    {
      id: 'slide-4',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 4: TANTANGAN HUBUNGAN EKOSISTEM',
      title: 'Tantangan 2: Jodohkan Peran Komponen Ekosistem Hutan',
      subtitle:
        'Hubungkan makhluk hidup di Kolom A dengan perannya di Kolom B agar rantai ekosistem stabil!',
      pairs: ECOSYSTEM_PAIRS,
      challengeKey: 'challenge2',
    },
    {
      id: 'slide-5',
      type: 'story-resolution',
      chapterBadge: 'BABAK 5: KELANJUTAN CERITA',
      title: 'Lembah Kalimantan Kembali Berseri!',
      celebrationEmoji: '🏆',
      reportTitle: 'Laporan Hasil Riset Konservasi:',
      resolutionStory:
        'Luar biasa kerja sama kelas hari ini! Berkat ketepatan kalian mengurutkan siklus energi fotosintesis dan memetakan peran satwa hutan, pohon ara purba berhasil kembali mengalirkan oksigen segar. Orangutan dan satwa endemik kini memiliki cadangan pakan yang berlimpah! Kalian resmi dinobatkan sebagai Cendekiawan Konservasi Hutan Tropis!',
      achievementBadges: [
        { label: 'Tantangan 1: Urutan Fotosintesis Selesai' },
        { label: 'Tantangan 2: Pasangan Ekosistem Selesai' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'slide-6',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 6: REFLEKSI & DISKUSI KELAS',
      title: 'Pertanyaan Pemantik Diskusi Siswa',
      subtitle: 'Gunakan kartu diskusi ini untuk memancing nalar kritis siswa di akhir pembelajaran:',
      sparkCards: [
        {
          number: 1,
          badgeColor: 'purple',
          title: 'Dampak Pengurai Hilang',
          question:
            'Apa yang akan terjadi pada tanah dan pohon jika jamur atau bakteri pengurai punah dari hutan?',
        },
        {
          number: 2,
          badgeColor: 'emerald',
          title: 'Peran Vital Orangutan',
          question:
            'Mengapa orangutan dijuluki "petani hutan alami" dalam penyebaran biji buah?',
        },
        {
          number: 3,
          badgeColor: 'blue',
          title: 'Aksi Nyata di Sekolah',
          question:
            'Langkah praktis apa yang bisa kita terapkan di lingkungan sekolah untuk menjaga rantai oksigen?',
        },
      ],
      victoryButtonText: '🏆 Selesai & Rayakan Kemenangan Kelas!',
    },
  ],
};

/**
 * Backward-compatible InteractiveStoryPresentationModal component
 */
export const InteractiveStoryPresentationModal: React.FC<InteractiveStoryPresentationModalProps> = ({
  isOpen,
  onClose,
  deck,
  initialSlide = 1,
  onComplete,
}) => {
  return (
    <StoryPresentationDeckEngine
      isOpen={isOpen}
      onClose={onClose}
      deck={deck || DEFAULT_FOREST_DECK}
      initialSlide={initialSlide}
      onComplete={onComplete}
    />
  );
};
