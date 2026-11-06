import { ConceptInfographicSlide } from '@/types/presentation';

export const slide3Fotosintesis: ConceptInfographicSlide = {
  id: 'uts-slide-3',
  type: 'concept-infographic',
  chapterBadge: 'BABAK 3: MATERI INTI 2 - FOTOSINTESIS TUMBUHAN',
  title: 'Fotosintesis Tumbuhan & Aliran Energi',
  subtitle: 'Tumbuhan hijau adalah produsen primer yang mengubah energi foton menjadi senyawa organik:',
  cards: [
    {
      id: 'card-f1',
      levelBadge: 'Bahan Baku',
      badgeColor: 'teal',
      iconEmoji: '🌿',
      title: 'Klorofil & Stomata',
      description:
        'Klorofil di kloroplas menyerap energi cahaya merah-biru, akar menyerap air (H2O), dan stomata menghirup karbondioksida (CO2).',
    },
    {
      id: 'card-f2',
      levelBadge: 'Reaksi Kimia',
      badgeColor: 'amber',
      iconEmoji: '⚡',
      title: 'Fotolisis & Pelepasan Oksigen',
      description:
        'Energi foton memecah molekul air menghasilkan elektron pembentuk energi kimia serta melepaskan gas O2 murni ke atmosfer.',
    },
    {
      id: 'card-f3',
      levelBadge: 'Hasil Akhir',
      badgeColor: 'emerald',
      iconEmoji: '🍎',
      title: 'Glukosa & Cadangan Pati',
      description:
        'Karbon diikat menjadi glukosa (C6H12O6) yang disimpan sebagai buah, umbi, dan nutrisi bagi rantai makanan seluruh konsumen.',
    },
  ],
  teacherNotes:
    'Tanyakan kepada siswa: Mengapa di bawah pohon rindang pada siang hari udara terasa sejuk dan menyegarkan?',
};
