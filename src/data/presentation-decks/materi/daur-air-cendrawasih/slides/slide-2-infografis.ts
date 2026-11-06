import { ConceptInfographicSlide } from '@/types/presentation';

export const slide2Infografis: ConceptInfographicSlide = {
  id: 'uts-slide-2',
  type: 'concept-infographic',
  chapterBadge: 'BABAK 2: MATERI INTI 1 - SIKLUS HIDROLOGI',
  title: 'Siklus Air (Hidrologi): Perjalanan Abadi Molekul H2O',
  subtitle: 'Air di Bumi tidak pernah habis, melainkan bersirkulasi melalui 4 proses utama:',
  cards: [
    {
      id: 'card-h1',
      levelBadge: 'Tahap 1',
      badgeColor: 'amber',
      iconEmoji: '☀️',
      title: 'Evaporasi & Transpirasi',
      description:
        'Panas matahari menguapkan air laut/sungai (evaporasi) dan stomata daun tumbuhan melepaskan uap air (transpirasi) ke udara.',
    },
    {
      id: 'card-h2',
      levelBadge: 'Tahap 2',
      badgeColor: 'blue',
      iconEmoji: '☁️',
      title: 'Kondensasi Awan',
      description:
        'Uap air membubung ke atmosfer dingin, mengembun menjadi kristal air mikro yang menyatu membentuk awan mendung tebal.',
    },
    {
      id: 'card-h3',
      levelBadge: 'Tahap 3',
      badgeColor: 'indigo',
      iconEmoji: '🌧️',
      title: 'Presipitasi (Hujan)',
      description:
        'Titik air di awan semakin padat dan berat hingga gravitasi bumi menariknya jatuh sebagai butiran air hujan pembasahi tanah.',
    },
    {
      id: 'card-h4',
      levelBadge: 'Tahap 4',
      badgeColor: 'emerald',
      iconEmoji: '🌱',
      title: 'Infiltrasi & Aliran Permukaan',
      description:
        'Air hujan meresap ke lapisan akuifer tanah (infiltrasi) serta mengalir melintasi sungai kembali menuju laut lepas.',
    },
  ],
  teacherNotes:
    'Ajak siswa mengamati animasi loop pergerakan molekul air: dari penguapan sungai oleh energi surya, pembentukan awan dingin di pegunungan, hingga turunnya hujan yang diserap oleh akar pohon.',
};
