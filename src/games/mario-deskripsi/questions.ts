import { LinguisticQuestion } from './types';

export const LINGUISTIC_QUESTIONS: LinguisticQuestion[] = [
  // 1. Pancaindra: Penglihatan (Visual)
  {
    id: 'q-indra-1',
    category: 'pancaindra',
    categoryLabel: 'Pancaindra (Sensorik)',
    prompt: 'Kutipan teks berikut melibatkan cerapan pancaindra apa?',
    passageSnippet:
      '"Matahari terbenam memancarkan semburat jingga kemerahan di ufuk barat, membiaskan cahaya keemasan di atas permukaan air laut yang berkilau."',
    options: ['Penglihatan (Visual)', 'Pendengaran (Auditori)', 'Penciuman (Olfaktori)', 'Perabaan (Taktil)'],
    correctIndex: 0,
    explanation:
      'Kalimat ini mendeskripsikan warna semburat jingga, ufuk barat, dan air laut yang berkilau, yang semuanya ditangkap oleh indra penglihatan (mata).',
  },

  // 2. Pancaindra: Pendengaran (Auditori)
  {
    id: 'q-indra-2',
    category: 'pancaindra',
    categoryLabel: 'Pancaindra (Sensorik)',
    prompt: 'Kalimat berikut seolah-olah mengajak pembaca untuk...',
    passageSnippet:
      '"Deburan ombak memecah karang dengan gemuruh yang menggelegar, diselingi kicau burung camar yang bersahut-sahutan riang."',
    options: [
      'Melihat panorama karang',
      'Mendengar suara gemuruh ombak dan kicau burung',
      'Mencium aroma asin air laut',
      'Merasakan dinginnya tiupan angin',
    ],
    correctIndex: 1,
    explanation:
      'Kata "deburan", "gemuruh menggelegar", dan "kicau burung bersahut-sahutan" secara eksplisit merangsang indra pendengaran (auditori).',
  },

  // 3. Pancaindra: Perabaan (Taktil)
  {
    id: 'q-indra-3',
    category: 'pancaindra',
    categoryLabel: 'Pancaindra (Sensorik)',
    prompt: 'Manakah cerapan indra yang dominan pada kalimat berikut?',
    passageSnippet:
      '"Udara pagi di lereng Gunung Bromo terasa menusuk tulang, sementara butiran kabut tebal membasahi kulit pipi dengan embusan dingin."',
    options: ['Pengecapan (Gustatori)', 'Penglihatan (Visual)', 'Perabaan (Taktil)', 'Penciuman (Olfaktori)'],
    correctIndex: 2,
    explanation:
      'Frasa "menusuk tulang", "membasahi kulit pipi", dan "embusan dingin" dirasakan oleh indra perabaan / kulit (taktil).',
  },

  // 4. Pancaindra: Penciuman (Olfaktori)
  {
    id: 'q-indra-4',
    category: 'pancaindra',
    categoryLabel: 'Pancaindra (Sensorik)',
    prompt: 'Cerapan indra apa yang digunakan dalam kalimat deskripsi berikut?',
    passageSnippet:
      '"Semerbak harum aroma melati dan wangi tanah basah sehabis hujan menyapa setiap pengunjung yang melangkahkan kaki di kebun raya."',
    options: ['Penciuman (Olfaktori)', 'Pengecapan (Gustatori)', 'Pendengaran (Auditori)', 'Penglihatan (Visual)'],
    correctIndex: 0,
    explanation:
      'Kata "semerbak harum aroma melati" dan "wangi tanah basah" ditangkap langsung oleh indra penciuman (hidung).',
  },

  // 5. Struktur: Identifikasi / Deskripsi Umum
  {
    id: 'q-struktur-1',
    category: 'struktur',
    categoryLabel: 'Struktur Teks Deskripsi',
    prompt: 'Kutipan teks deskripsi berikut menempati bagian struktur apa?',
    passageSnippet:
      '"Candi Borobudur adalah mahakarya candi Buddha terbesar di dunia yang terletak di Kabupaten Magelang, Jawa Tengah, sekitar 100 km di sebelah barat daya Semarang."',
    options: [
      'Identifikasi / Deskripsi Umum',
      'Deskripsi Bagian',
      'Simpulan / Kesan',
      'Penegasan Ulang Rekomendasi',
    ],
    correctIndex: 0,
    explanation:
      'Identifikasi (Deskripsi Umum) berisi pengenalan nama objek, lokasi, sejarah, atau gambaran umum pembuka teks.',
  },

  // 6. Struktur: Deskripsi Bagian
  {
    id: 'q-struktur-2',
    category: 'struktur',
    categoryLabel: 'Struktur Teks Deskripsi',
    prompt: 'Bagian struktur apakah paragraf perincian berikut?',
    passageSnippet:
      '"Dinding lorong Candi Borobudur dipenuhi 2.672 panel relief pahatan andesit yang sangat detail. Relief itu menggambarkan riwayat Sang Buddha Gautama dan kehidupan maritim perahu cadik abad ke-8."',
    options: [
      'Identifikasi / Pengenalan',
      'Deskripsi Bagian',
      'Simpulan / Kesan',
      'Abstraksi Topik',
    ],
    correctIndex: 1,
    explanation:
      'Deskripsi Bagian memerinci fisik objek secara mendalam, seperti jumlah relief, bahan andesit, dan cerita pahatan secara rinci.',
  },

  // 7. Struktur: Simpulan / Kesan
  {
    id: 'q-struktur-3',
    category: 'struktur',
    categoryLabel: 'Struktur Teks Deskripsi',
    prompt: 'Bagian teks deskripsi yang memuat tanggapan pribadi dan kesan akhir penulis disebut...',
    passageSnippet:
      '"Sungguh mengagumkan berdiri di puncak candi menyaksikan kemegahan warisan leluhur bangsa kita. Kita wajib menjaga kelestariannya agar tetap abadi sepanjang masa."',
    options: [
      'Simpulan / Kesan Akhir',
      'Identifikasi Objek',
      'Deskripsi Bagian Arsitektur',
      'Tesis Eksposisi',
    ],
    correctIndex: 0,
    explanation:
      'Simpulan / Kesan merupakan bagian penutup teks deskripsi yang berisi refleksi emosional, kebanggaan, atau kesan penulis terhadap objek yang dideskripsikan.',
  },

  // 8. Kata Khusus vs Kata Umum: Melihat
  {
    id: 'q-khusus-1',
    category: 'kata-khusus',
    categoryLabel: 'Kata Umum vs Kata Khusus',
    prompt: 'Kata umum: "Melihat". Manakah kelompok kata khusus yang tepat untuk menggantikannya dalam teks deskripsi?',
    passageSnippet:
      'Kata khusus adalah kata yang ruang lingkup maknanya lebih sempit dan spesifik untuk menggambarkan aksi pengamatan.',
    options: [
      'Menatap, melirik, memandang, memelototi',
      'Mendengar, menyimak, mendengarkan',
      'Mencium, menghirup, membaui',
      'Meraba, menyentuh, mengelus',
    ],
    correctIndex: 0,
    explanation:
      'Kata "melihat" adalah kata umum. Kata khususnya antara lain menatap (melihat lekat-lekat), melirik (melihat ke samping), dan memandang (melihat ke arah tertentu).',
  },

  // 9. Kata Khusus vs Kata Umum: Warna
  {
    id: 'q-khusus-2',
    category: 'kata-khusus',
    categoryLabel: 'Kata Umum vs Kata Khusus',
    prompt: 'Manakah kata khusus warna merah yang membuat deskripsi buah apel lebih konkret dan hidup?',
    passageSnippet:
      '"Di atas dahan pohon, buah-buah apel itu tampak menggantung lebat dengan warna..."',
    options: ['Merah merona menyala', 'Berwarna terang', 'Cukup berwarna', 'Kelihatan ada warnanya'],
    correctIndex: 0,
    explanation:
      '"Merah merona menyala" adalah kata khusus yang spesifik dan langsung memunculkan citra warna tajam di imajinasi pembaca.',
  },

  // 10. Kata Konkret
  {
    id: 'q-konkret-1',
    category: 'kata-konkret',
    categoryLabel: 'Kata Konkret & Kalimat Perincian',
    prompt: 'Kalimat manakah yang paling kaya akan KATA KONKRET (dapat ditangkap pancaindra)?',
    options: [
      'Batu karang hitam legam itu berdiri kokoh dihantam buih ombak putih yang menderu.',
      'Suasana di tempat wisata tersebut sangat bagus dan mengesankan sekali bagi semua orang.',
      'Banyak hal yang sangat baik dan membuat kita bahagia di sana.',
      'Keadaannya sungguh sangat luar biasa dan tidak terlupakan.',
    ],
    correctIndex: 0,
    explanation:
      'Kata konkret seperti "batu karang hitam legam", "buih ombak putih", dan "menderu" langsung bisa dilihat, diraba, dan didengar secara nyata oleh indra.',
  },

  // 11. Majas Personifikasi
  {
    id: 'q-majas-1',
    category: 'majas',
    categoryLabel: 'Majas Gaya Bahasa',
    prompt: 'Manakah kalimat berikut yang menggunakan MAJAS PERSONIFIKASI?',
    passageSnippet:
      'Majas personifikasi melekatkan sifat-sifat insani (manusia) pada benda mati atau unsur alam.',
    options: [
      'Angin sore berbisik lembut membelai helai daun nyiur di tepi pantai.',
      'Pantai itu sangat luas bagaikan samudera tanpa batas.',
      'Air lautnya memiliki rasa yang sangat asin seperti garam dapur.',
      'Matahari berada tepat di atas kepala kita pada siang hari.',
    ],
    correctIndex: 0,
    explanation:
      'Angin sore diberi sifat manusia yaitu "berbisik" dan "membelai", sehingga termasuk majas personifikasi.',
  },

  // 12. Kalimat Perincian
  {
    id: 'q-rincian-1',
    category: 'kata-konkret',
    categoryLabel: 'Kalimat Perincian',
    prompt: 'Kalimat umum: "Ibuku adalah wanita yang sangat penyabar dan penuh kasih sayang." Kalimat perincian yang tepat untuk mengonkretkannya adalah...',
    options: [
      'Beliau tidak pernah meninggikan suara, selalu tersenyum lembut mendengarkan keluh kesah kami, dan dengan telaten merawat saat kami sakit.',
      'Pokoknya ibuku sangat baik sekali kepada semua orang yang ada di rumah.',
      'Ibu adalah orang tua wanita yang melahirkan anak-anaknya di dunia.',
      'Sifat sabar itu sangat penting untuk dimiliki oleh setiap orang.',
    ],
    correctIndex: 0,
    explanation:
      'Kalimat perincian membuktikan pernyataan umum dengan contoh tindakan nyata: tidak meninggikan suara, tersenyum lembut, dan telaten merawat.',
  },
];

export const getRandomQuestion = (excludeIds: string[] = []): LinguisticQuestion => {
  const pool = LINGUISTIC_QUESTIONS.filter((q) => !excludeIds.includes(q.id));
  if (pool.length === 0) {
    return LINGUISTIC_QUESTIONS[Math.floor(Math.random() * LINGUISTIC_QUESTIONS.length)];
  }
  return pool[Math.floor(Math.random() * pool.length)];
};

export const getRandomQuestions = (count: number = 5): LinguisticQuestion[] => {
  const shuffled = [...LINGUISTIC_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, LINGUISTIC_QUESTIONS.length));
};
