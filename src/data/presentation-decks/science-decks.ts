import {
  PresentationDeckData,
  SequenceGameItem,
  MatchGamePair,
  FlashcardItem,
} from '@/types/presentation';

// ============================================================================
// 1. DECK: ULAR TANGGA SAINS (Fotosintesis & Daur Air) — 7 Slides
// ============================================================================

export const WATER_CYCLE_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'h1',
    order: 1,
    label: 'Evaporasi',
    iconEmoji: '☀️',
    description: 'Penguapan molekul air laut, danau, dan sungai ke atmosfer akibat energi panas matahari.',
  },
  {
    id: 'h2',
    order: 2,
    label: 'Kondensasi',
    iconEmoji: '☁️',
    description: 'Uap air naik ke atmosfer dingin dan mengembun menjadi butiran es/air pembentuk awan tebal.',
  },
  {
    id: 'h3',
    order: 3,
    label: 'Presipitasi',
    iconEmoji: '🌧️',
    description: 'Awan jenuh menjatuhkan butiran air kembali ke daratan dan lautan sebagai hujan lebat.',
  },
  {
    id: 'h4',
    order: 4,
    label: 'Infiltrasi',
    iconEmoji: '🌱',
    description: 'Air hujan diserap pori-pori tanah menjadi air tanah (akuifer) dan mengalir kembali ke laut.',
  },
];

export const ENERGY_TRANSFORMATION_PAIRS: MatchGamePair[] = [
  {
    id: 'e1',
    leftText: 'Surya',
    rightText: 'Fotosintesis',
  },
  {
    id: 'e2',
    leftText: 'Air',
    rightText: 'Kincir Turbin',
  },
  {
    id: 'e3',
    leftText: 'Kimia',
    rightText: 'Otot Anak',
  },
  {
    id: 'e4',
    leftText: 'Kalor',
    rightText: 'Sirkulasi Angin',
  },
];

export const ULAR_TANGGA_SAINS_DECK: PresentationDeckData = {
  gameId: 'ular-tangga-sains',
  title: 'Petualangan Sains: Ekspedisi Daur Air',
  subtitle: 'Petualangan Daur Air, Fotosintesis, & Aliran Energi',
  themeColor: 'orange',
  icon: '🧭',
  category: 'sains',
  gradeLevel: 'SD Kelas 4-6',
  subjectDetail: 'IPA / Daur Air & Keseimbangan Ekosistem',
  mentor: {
    name: 'Kak Galih',
    role: 'Penjelajah Rimba',
    avatarEmoji: '🧭',
  },
  totalSlides: 7,
  slides: [
    {
      id: 'uts-slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: PANGGILAN PENJELAJAH ALAM',
      title: 'Misi Menyelamatkan Mata Air Lembah Cendrawasih',
      subtitle: 'Ekspedisi Daur Air & Keseimbangan Energi Tropis',
      dialogue:
        'Halo rekan-rekan penjelajah sains muda! Saya Kak Galih. Saat menjelajahi hulu sungai di Lembah Cendrawasih, tim kami menemukan bahwa aliran air pegunungan mulai surut dan dedaunan hutan menguning karena siklus hidrologi terganggu. Kita harus merekonstruksi tahapan daur air sempurna dan mengungkap bagaimana energi surya diubah menjadi tenaga kehidupan melalui fotosintesis. Siapkah kalian memulai ekspedisi ini?',
      missionObjective: 'Pulihkan siklus hidrologi dan aliran fotosintesis Lembah Cendrawasih',
      actionButtonText: 'Buka Infografis Daur Air',
    },
    {
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
    },
    {
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
    },
    {
      id: 'uts-slide-4',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 4: TANTANGAN 1 - URUTAN HIDROLOGI',
      title: 'Rekonstruksi Siklus Air Sempurna',
      subtitle: 'Susun 4 kartu tahapan daur air berikut sesuai urutan siklus alaminya di bumi!',
      instruction:
        'Tarik atau geser kartu menggunakan tombol panah sampai urutan daur air tepat dari penguapan hingga penyerapan tanah.',
      challengeKey: 'sequence-hidrologi',
      items: WATER_CYCLE_SEQUENCE,
    },
    {
      id: 'uts-slide-5',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 5: TANTANGAN 2 - TRANSFORMASI ENERGI',
      title: 'Transformasi Energi di Alam',
      subtitle: 'Hubungkan bentuk energi sumber di Kolom A dengan pemanfaatannya di Kolom B!',
      columnALabel: 'Bentuk Energi Asal',
      columnBLabel: 'Fenomena / Pemanfaatan',
      instruction: 'Klik satu kartu di kiri, lalu klik pasangannya di kanan untuk menghubungkan garis dinamis.',
      challengeKey: 'match-energi',
      pairs: ENERGY_TRANSFORMATION_PAIRS,
    },
    {
      id: 'uts-slide-6',
      type: 'story-resolution',
      chapterBadge: 'BABAK 6: DAMPAK SOLUSI SISWA',
      title: 'Lembah Cendrawasih Mengalir Sejahtera!',
      celebrationEmoji: '🌊',
      reportTitle: 'Laporan Hasil Ekspedisi Sains Rimba:',
      resolutionStory:
        'Luar biasa dedikasi kelas hari ini! Berkat keberhasilan kalian merekonstruksi daur hidrologi dan memetakan transformasi energi surya, sistem tata air pegunungan kembali normal! Mata air pegunungan kembali memancar jernih dan sawah warga terairi dengan subur. Ribuan pohon hutan kini berfotosintesis menghasilkan udara segar bagi seluruh lembah!',
      achievementBadges: [
        { label: 'Master Siklus Hidrologi 4 Tahap' },
        { label: 'Penjaga Transformasi Energi Alam' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'uts-slide-7',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 7: REFLEKSI & DISKUSI KELAS',
      title: 'Pertanyaan Pemantik HOTS Sains & Alam',
      subtitle: 'Diskusikan ketiga pertanyaan bernalar kritis berikut bersama rekan sekelasmu:',
      sparkCards: [
        {
          number: 1,
          badgeColor: 'blue',
          title: 'Dampak Penggundulan Hutan',
          question:
            'Bagaimana penebangan pohon di lereng bukit mengganggu proses infiltrasi air tanah dan memicu bencana banjir bandang di hilir sungai?',
        },
        {
          number: 2,
          badgeColor: 'amber',
          title: 'Peran Energi Surya di Rantai Pangan',
          question:
            'Jika awan abu vulkanik menutupi sinar matahari selama berbulan-bulan, bagaimana dampaknya terhadap produsen dan konsumen puncak ekosistem?',
        },
        {
          number: 3,
          badgeColor: 'emerald',
          title: 'Aksi Konservasi Air Sekolah',
          question:
            'Langkah praktis apa (seperti membuat lubang biopori atau memanen air hujan) yang bisa kita terapkan di lingkungan sekolah untuk menjaga siklus air?',
        },
      ],
      victoryButtonText: '🏆 Selesai & Rayakan Kemenangan Kelas!',
    },
  ],
};

// ============================================================================
// 2. DECK: POINT CLICK LAB (K3, Skala pH & Metode Ilmiah) — 8 Slides
// ============================================================================

export const LAB_K3_PAIRS: MatchGamePair[] = [
  {
    id: 'k1',
    leftText: 'Korosif (Asam Kuat)',
    rightText: 'Merusak jaringan kulit dan melarutkan logam',
  },
  {
    id: 'k2',
    leftText: 'Toksik (Tengkorak)',
    rightText: 'Beracun dan fatal bila terhirup atau tertelan',
  },
  {
    id: 'k3',
    leftText: 'Mudah Menyala (Api)',
    rightText: 'Mudah terbakar di dekat percikan api atau panas',
  },
  {
    id: 'k4',
    leftText: 'Reaktif / Eksplosif',
    rightText: 'Dapat meledak bila terkena benturan atau guncangan',
  },
];

export const SCIENTIFIC_METHOD_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'm1',
    order: 1,
    label: 'Observasi Fenomena',
    iconEmoji: '👁️',
    description: 'Mengamati anomali reaksi kimia dan mencatat fakta empiris laboratorium.',
  },
  {
    id: 'm2',
    order: 2,
    label: 'Perumusan Masalah',
    iconEmoji: '❓',
    description: 'Menyusun pertanyaan spesifik mengenai penyebab ketidakstabilan larutan.',
  },
  {
    id: 'm3',
    order: 3,
    label: 'Pengajuan Hipotesis',
    iconEmoji: '💡',
    description: 'Merumuskan dugaan ilmiah sementara yang dapat dibuktikan melalui eksperimen.',
  },
  {
    id: 'm4',
    order: 4,
    label: 'Eksperimen Terkontrol',
    iconEmoji: '🧪',
    description: 'Menguji variabel bebas dan terikat menggunakan titrasi dan instrumen lab.',
  },
  {
    id: 'm5',
    order: 5,
    label: 'Analisis & Kesimpulan',
    iconEmoji: '📊',
    description: 'Menarik kesimpulan objektif berdasarkan data kuantitatif perubahan pH.',
  },
];

export const LAB_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-lab-1',
    frontPrompt: 'Bagaimana perubahan warna kertas lakmus saat dicelupkan ke larutan asam cuka (CH3COOH)?',
    backTitle: 'Uji Sifat Asam',
    backAnswer: 'Kedua kertas lakmus menjadi/tetap berwarna MERAH',
    backExplanation: 'Larutan asam mempertahankan warna merah pada lakmus merah dan mengubah lakmus biru menjadi merah.',
    category: 'Indikator Asam',
  },
  {
    id: 'fc-lab-2',
    frontPrompt: 'Bagaimana perubahan warna kertas lakmus pada larutan pembersih sabun / basa (NaOH)?',
    backTitle: 'Uji Sifat Basa',
    backAnswer: 'Kedua kertas lakmus menjadi/tetap berwarna BIRU',
    backExplanation: 'Larutan basa mempertahankan warna biru pada lakmus biru dan mengubah lakmus merah menjadi biru.',
    category: 'Indikator Basa',
  },
  {
    id: 'fc-lab-3',
    frontPrompt: 'Berapakah nilai derajat pH air murni netral dan bagaimana pengaruhnya pada lakmus?',
    backTitle: 'Uji Sifat Netral',
    backAnswer: 'pH tepat 7.00 (Lakmus tidak berubah warna)',
    backExplanation: 'Pada pH 7.00, konsentrasi ion H+ sama persis dengan ion OH-. Lakmus merah tetap merah dan lakmus biru tetap biru.',
    category: 'Indikator Netral',
  },
];

export const POINT_CLICK_LAB_DECK: PresentationDeckData = {
  gameId: 'point-click-lab',
  title: 'Point & Click: Misteri Lab Sains Maya',
  subtitle: 'Eksplorasi K3, Derajat pH, & Metode Ilmiah Kimia-Biologi',
  themeColor: 'teal',
  icon: '🔬',
  category: 'sains',
  gradeLevel: 'SMP',
  subjectDetail: 'Kimia & Biologi Eksperimental (SMP Kelas 7)',
  mentor: {
    name: 'Dr. Maya Arisandi, M.Sc.',
    role: 'Ilmuwan Forensik Kimia-Biologi',
    avatarEmoji: '🔬',
  },
  totalSlides: 8,
  slides: [
    {
      id: 'lab-slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: MISI PENYELIDIKAN LAB',
      title: 'Anomali Reaktor Kimia Forensik Unit 04',
      subtitle: 'Protokol Darurat Penyelamatan Reaktor Laboratorium',
      dialogue:
        'Selamat pagi calon ilmuwan muda! Saya Dr. Maya Arisandi, M.Sc. Laboratorium forensik Unit 04 mendeteksi adanya kebocoran larutan misterius dengan nilai pH yang tidak stabil. Sebelum kita dapat menetralkan reaktor utama, kita harus memahami regulasi keselamatan K3, menguasai kalibrasi indikator asam-basa, dan menerapkan 5 langkah metode ilmiah tanpa kesalahan. Kenakan jas lab dan kacamata pelindung kalian!',
      missionObjective: 'Kuasai simbol K3, urutkan 5 langkah metode ilmiah, dan netralkan reaktor pada pH 7.00',
      actionButtonText: 'Buka Modul Protokol K3 & Asam Basa',
    },
    {
      id: 'lab-slide-2',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 2: MATERI INTI 1 - KESELAMATAN KERJA K3',
      title: 'Keselamatan Kerja K3 & Instrumen Lab',
      subtitle: 'Standar baku bekerja di laboratorium kimia-biologi modern:',
      cards: [
        {
          id: 'card-k1',
          levelBadge: 'Pilar APD',
          badgeColor: 'teal',
          iconEmoji: '🥽',
          title: 'Alat Pelindung Diri (APD)',
          description:
            'Jas lab katun tahan percikan, sarung tangan nitril, goggle pelindung mata, dan sepatu tertutup wajib dipakai setiap praktikum.',
        },
        {
          id: 'card-k2',
          levelBadge: 'Simbol GHS',
          badgeColor: 'rose',
          iconEmoji: '☣️',
          title: 'Simbol Bahaya K3',
          description:
            'Piktogram belah ketupat merah menandai sifat zat berbahaya: Toksik (tengkorak), Korosif (asam kuat), dan Mudah Menyala (api).',
        },
        {
          id: 'card-k3',
          levelBadge: 'Instrumen Optik',
          badgeColor: 'indigo',
          iconEmoji: '🔬',
          title: 'Instrumen Lab & Mikroskop',
          description:
            'Mikroskop majemuk, buret titrasi, dan labu Erlenmeyer harus dikalibrasi presisi untuk menghindari galat pengukuran analitis.',
        },
      ],
      teacherNotes:
        'Tunjukkan piktogram K3 pada botol bahan kimia pembersih di sekolah dan diskusikan arti simbol tersebut bersama siswa.',
    },
    {
      id: 'lab-slide-3',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 3: MATERI INTI 2 - SKALA DERAJAT pH',
      title: 'Skala Derajat pH & Metode Ilmiah',
      subtitle: 'Konsentrasi ion hidrogen (H+) menentukan sifat keasaman larutan:',
      cards: [
        {
          id: 'card-p1',
          levelBadge: 'pH < 7',
          badgeColor: 'rose',
          iconEmoji: '🍋',
          title: 'Larutan Asam (Kaya H+)',
          description:
            'Memiliki rasa masam, bersifat elektrolit korosif terhadap logam, dan mengubah kertas lakmus biru menjadi merah.',
        },
        {
          id: 'card-p2',
          levelBadge: 'pH = 7',
          badgeColor: 'emerald',
          iconEmoji: '💧',
          title: 'Titik Netral Sempurna',
          description:
            'Konsentrasi ion H+ dan OH- setara seimbang. Air murni pada suhu 25°C berada pada pH 7.00, aman bagi sel tubuh makhluk hidup.',
        },
        {
          id: 'card-p3',
          levelBadge: 'pH > 7',
          badgeColor: 'purple',
          iconEmoji: '🧼',
          title: 'Larutan Basa (Kaya OH-)',
          description:
            'Terasa licin di kulit (saponifikasi), berasa pahit, mereduksi keasaman, dan mengubah kertas lakmus merah menjadi biru.',
        },
      ],
      teacherNotes:
        'Peringatkan siswa secara tegas: Jangan pernah mencicipi atau menghirup zat kimia secara langsung untuk menguji sifat asam-basa!',
    },
    {
      id: 'lab-slide-4',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 4: TANTANGAN 1 - IDENTIFIKASI SIMBOL K3',
      title: 'Simbol Bahaya K3 Laboratorium',
      subtitle: 'Jodohkan simbol bahaya piktogram di Kolom A dengan arti keselamatan resikonya di Kolom B!',
      columnALabel: 'Simbol Bahaya Lab',
      columnBLabel: 'Karakteristik Resiko',
      instruction: 'Hubungkan keempat simbol bahaya keselamatan kerja laboratorium dengan tepat.',
      challengeKey: 'k3-pairs',
      pairs: LAB_K3_PAIRS,
    },
    {
      id: 'lab-slide-5',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 5: TANTANGAN 2 - URUTAN METODE ILMIAH',
      title: 'Urutan 5 Langkah Metode Ilmiah',
      subtitle: 'Seorang ilmuwan bekerja sistematis dan terstruktur. Susun 5 tahapan penalaran ilmiah berikut:',
      instruction: 'Gunakan tombol panah untuk menyusun langkah dari perumusan awal hingga kesimpulan.',
      challengeKey: 'metode-ilmiah',
      items: SCIENTIFIC_METHOD_SEQUENCE,
    },
    {
      id: 'lab-slide-6',
      type: 'mini-game-flashcard',
      chapterBadge: 'BABAK 6: TANTANGAN 3 - UJI LAKMUS ASAM BASA',
      title: 'Uji Indikator Lakmus Asam Basa',
      subtitle: 'Uji ingatan aktifmu seputar perubahan warna indikator sebelum menetralkan reaktor!',
      instruction: 'Klik kartu untuk membalik dan mempelajari fakta ilmiah pengujian asam-basa.',
      challengeKey: 'flashcards-lakmus',
      cards: LAB_FLASHCARDS,
    },
    {
      id: 'lab-slide-7',
      type: 'story-resolution',
      chapterBadge: 'BABAK 7: RESOLUSI KASUS FORENSIK',
      title: 'Reaktor Unit 04 Berhasil Dinetralkan!',
      celebrationEmoji: '🧪',
      reportTitle: 'Laporan Forensik Dr. Maya Arisandi:',
      resolutionStory:
        'Luar biasa ketelitian analisis kalian! Melalui titrasi presisi larutan penyangga, reaktor kimia dinetralkan pada pH 7.00 dan lab terhindar dari bahaya kontaminasi gas asam beracun. Seluruh data forensik tersimpan aman dan kalian resmi menerima sertifikat Kehormatan Peneliti Muda Forensik Kimia-Biologi!',
      achievementBadges: [
        { label: 'Tersertifikasi Protokol Keselamatan K3' },
        { label: 'Pakar 5 Tahap Metode Ilmiah' },
        { label: 'Kalibrasi Presisi Netralisasi pH 7.00' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'lab-slide-8',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 8: REFLEKSI & DISKUSI KELAS',
      title: 'Pertanyaan Pemantik HOTS Laboratorium & Sains',
      subtitle: 'Gunakan tiga pertanyaan penalaran tingkat tinggi ini untuk memandu refleksi kelas:',
      sparkCards: [
        {
          number: 1,
          badgeColor: 'rose',
          title: 'Hujan Asam & Ekosistem Perairan',
          question:
            'Bagaimana polusi emisi sulfur dioksida dari asap industri menurunkan pH air hujan (< 5.6) dan merusak ekosistem biota danau serta tanah pertanian?',
        },
        {
          number: 2,
          badgeColor: 'teal',
          title: 'Etika Kejujuran Data Ilmiah',
          question:
            'Mengapa seorang peneliti tidak boleh mengubah atau memanipulasi data eksperimen meskipun hasilnya bertentangan dengan hipotesis awal?',
        },
        {
          number: 3,
          badgeColor: 'indigo',
          title: 'Indikator Alami Ramah Lingkungan',
          question:
            'Bahan alam apa saja di dapur rumah tangga (seperti ekstrak kunyit, kol ungu, atau bunga sepatu) yang bisa kita gunakan sebagai indikator asam-basa alternatif?',
        },
      ],
      victoryButtonText: '🏆 Selesai & Rayakan Kemenangan Kelas!',
    },
  ],
};

// ============================================================================
// 3. DECK: POINT CLICK HUTAN (Satwa Endemik & Kanopi) — 8 Slides
// ============================================================================

export const BIOGEOGRAPHY_FAUNA_PAIRS: MatchGamePair[] = [
  {
    id: 'b1',
    leftText: 'Orangutan Kalimantan',
    rightText: 'Zona Asiatis (Paparan Sunda)',
  },
  {
    id: 'b2',
    leftText: 'Komodo Nusa Tenggara',
    rightText: 'Zona Peralihan (Wallacea NTT)',
  },
  {
    id: 'b3',
    leftText: 'Burung Cendrawasih',
    rightText: 'Zona Australis (Paparan Sahul Papua)',
  },
  {
    id: 'b4',
    leftText: 'Anoa Pegunungan',
    rightText: 'Zona Peralihan (Endemik Sulawesi)',
  },
];

export const CANOPY_STRATA_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'k1',
    order: 1,
    label: 'Lantai Hutan (0-5m)',
    iconEmoji: '🍄',
    description: 'Lapisan tanah humus lembab dan gelap yang dihuni organisme pengurai jamur dan serangga.',
  },
  {
    id: 'k2',
    order: 2,
    label: 'Lapisan Bawah / Understory (5-15m)',
    iconEmoji: '🌿',
    description: 'Semak belukar dan perdu berdaun lebar tempat hidup katak pohon dan reptil pemanjat.',
  },
  {
    id: 'k3',
    order: 3,
    label: 'Kanopi Utama (15-30m)',
    iconEmoji: '🦧',
    description: 'Atap tajuk daun rimbun tempat tinggal 80% satwa hutan: Orangutan, bekantan, dan primata.',
  },
  {
    id: 'k4',
    order: 4,
    label: 'Lapisan Emergen (>30m)',
    iconEmoji: '🦅',
    description: 'Pohon raksasa menjulang tinggi menembus kanopi tempat bersarang burung elang dan pemangsa.',
  },
];

export const HUTAN_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'fc-hutan-1',
    frontPrompt: 'Mengapa Orangutan Kalimantan dijuluki sebagai "petani hutan alami" (forest gardener)?',
    backTitle: 'Peran Ekologis Orangutan',
    backAnswer: 'Menyebarkan biji buah ara dan meregenerasi kanopi pohon',
    backExplanation:
      'Orangutan memakan ratusan jenis buah hutan dan menjelajah koridor rimba yang luas, mengeluarkan feses berisi biji siap tumbuh sehingga pohon baru bersemi merata.',
    category: 'Peran Satwa Endemik',
  },
  {
    id: 'fc-hutan-2',
    frontPrompt: 'Sebutkan adaptasi morfologi khas orangutan yang mendukung gaya hidup di atas dahan pohon (arboreal)!',
    backTitle: 'Adaptasi Morfologi Arboreal',
    backAnswer: 'Rentang lengan ekstra panjang dan jemari kaki prehensil penggenggam',
    backExplanation:
      'Lengan orangutan dapat mencapai rentang 2 meter dengan sendi bahu fleksibel untuk berayun (brachiation), serta jemari kaki yang mampu mencengkeram dahan kuat-kuat.',
    category: 'Adaptasi Satwa',
  },
];

export const POINT_CLICK_HUTAN_DECK: PresentationDeckData = {
  gameId: 'point-click-hutan',
  title: 'Point & Click: Misteri Hutan Hujan Kalimantan',
  subtitle: 'Ekspedisi Satwa Endemik, Garis Wallace, & Zonasi Kanopi Tropis',
  themeColor: 'emerald',
  icon: '🦧',
  category: 'sains',
  gradeLevel: 'SD Kelas 4-6',
  subjectDetail: 'Biologi Lingkungan & Biodiversitas',
  mentor: {
    name: 'Ranger Banyu',
    role: 'Jagawana Konservasi Rimba',
    avatarEmoji: '🦧',
  },
  totalSlides: 8,
  slides: [
    {
      id: 'hutan-slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: PANGGILAN KONSERVASI RIMBA',
      title: 'Patroli Koridor Satwa Rimba Borneo',
      subtitle: 'Misi Penyelamatan Biodiversitas Hutan Hujan Tropis',
      dialogue:
        'Salam lestari, relawan konservasi muda! Saya Ranger Banyu, jagawana rimba Kalimantan. Hutan hujan tropis kita menyimpan kekayaan hayati yang tiada duanya di muka bumi. Namun, fragmentasi hutan mengancam koridor jelajah satwa endemik. Tugas patroli kita hari ini adalah meneliti zonasi vertikal pohon kanopi, memetakan persebaran fauna garis Wallace-Weber, dan memastikan satwa langka kita terlindungi dari perburuan. Siapkan buku catatan ekspedisi rimba kalian!',
      missionObjective: 'Petakan 4 strata kanopi, cocokkan fauna biogeografi, dan amankan koridor Wallacea',
      actionButtonText: 'Buka Materi Konsep Kunci',
    },
    {
      id: 'hutan-slide-2',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 2: MATERI INTI 1 - BIOGEOGRAFI WALLACE & WEBER',
      title: 'Garis Biogeografi Wallace & Weber',
      subtitle: 'Kekayaan fauna Indonesia terbagi ke dalam tiga zona biogeografi unik:',
      cards: [
        {
          id: 'card-w1',
          levelBadge: 'Zona Asiatis',
          badgeColor: 'emerald',
          iconEmoji: '🐅',
          title: 'Paparan Sunda (Barat)',
          description:
            'Meliputi Sumatera, Jawa, Kalimantan. Didominasi mamalia berbadan besar: Orangutan, Gajah Sumatera, Badak Bercula Satu, dan Harimau.',
        },
        {
          id: 'card-w2',
          levelBadge: 'Zona Peralihan',
          badgeColor: 'amber',
          iconEmoji: '🦎',
          title: 'Kawasan Wallacea (Tengah)',
          description:
            'Meliputi Sulawesi, Maluku, Nusa Tenggara. Memiliki satwa endemik khas yang terisolasi: Komodo, Anoa, Babirusa, dan Burung Maleo.',
        },
        {
          id: 'card-w3',
          levelBadge: 'Zona Australis',
          badgeColor: 'indigo',
          iconEmoji: '🦜',
          title: 'Paparan Sahul (Timur)',
          description:
            'Meliputi Papua dan pulau sekitarnya. Kaya akan burung berbulu indah (Cendrawasih, Kasuari) dan mamalia berkantung (Kanguru pohon, Kuskus).',
        },
      ],
      teacherNotes:
        'Buka peta Indonesia dan tunjukkan Selat Lombok serta Selat Makassar sebagai batas pembagian fauna Alfred Russel Wallace.',
    },
    {
      id: 'hutan-slide-3',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 3: MATERI INTI 2 - ZONASI KANOPI HUTAN TROPIS',
      title: 'Zonasi Kanopi Hutan Tropis & Satwa Endemik',
      subtitle: 'Ekosistem hutan hujan tersusun dalam 4 strata ketinggian vertikal:',
      cards: [
        {
          id: 'card-s1',
          levelBadge: '0 - 5 Meter',
          badgeColor: 'amber',
          iconEmoji: '🍄',
          title: 'Lantai Hutan (Forest Floor)',
          description:
            'Lembab dan gelap (hanya 2% sinar tembus). Dihuni serangga tanah, rayap, dan jamur pengurai yang menyuburkan humus.',
        },
        {
          id: 'card-s2',
          levelBadge: '5 - 15 Meter',
          badgeColor: 'teal',
          iconEmoji: '🌿',
          title: 'Lapisan Bawah (Understory)',
          description:
            'Perdu dan palem berdaun lebar. Tempat persembunyian katak pohon, reptil bunglon, dan serangga penyamar daun.',
        },
        {
          id: 'card-s3',
          levelBadge: '15 - 30 Meter',
          badgeColor: 'emerald',
          iconEmoji: '🦧',
          title: 'Kanopi Utama (Canopy)',
          description:
            'Atap hijau tempat berkumpulnya 80% satwa: Orangutan, Bekantan, Owa, serta epifit anggrek liar dan sarang lebah.',
        },
        {
          id: 'card-s4',
          levelBadge: '> 30 - 50 Meter',
          badgeColor: 'blue',
          iconEmoji: '🦅',
          title: 'Lapisan Emergen (Pohon Menjulang)',
          description:
            'Pohon-pohon raksasa menjulang menembus atap kanopi, menjadi landasan terbang elang jambul dan kelelawar pemakan buah.',
        },
      ],
      teacherNotes:
        'Tekankan kepada murid bahwa ketika kanopi utama ditebang, satwa arboreal kehilangan jalur jelajah dan terancam punah.',
    },
    {
      id: 'hutan-slide-4',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 4: TANTANGAN 1 - PASANGAN FAUNA BIOGEOGRAFI',
      title: 'Satwa Endemik & Zona Persebaran Biogeografi',
      subtitle: 'Jodohkan satwa endemik di Kolom A dengan zona persebaran geografisnya di Kolom B!',
      columnALabel: 'Satwa Endemik Indonesia',
      columnBLabel: 'Zona Biogeografi & Habitat',
      instruction: 'Tarik garis penghubung antara nama satwa dengan zona habitat aslinya.',
      challengeKey: 'biogeografi-pairs',
      pairs: BIOGEOGRAPHY_FAUNA_PAIRS,
    },
    {
      id: 'hutan-slide-5',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 5: TANTANGAN 2 - URUTAN STRATA KANOPI',
      title: '4 Strata Vertikal Kanopi Hutan Hujan',
      subtitle: 'Susun 4 lapisan ketinggian kanopi hutan tropis dari lapisan paling dasar hingga puncak tertinggi!',
      instruction: 'Urutkan dari ketinggian tanah (0 m) hingga pucuk pohon tertua di atas kanopi (> 30 m).',
      challengeKey: 'sequence-kanopi',
      items: CANOPY_STRATA_SEQUENCE,
    },
    {
      id: 'hutan-slide-6',
      type: 'mini-game-flashcard',
      chapterBadge: 'BABAK 6: TANTANGAN 3 - ADAPTASI SATWA RIMBA',
      title: 'Adaptasi Satwa & Peran Orangutan',
      subtitle: 'Balik kartu untuk memahami peran ekologis orangutan dan adaptasi fauna arboreal hutan tropis!',
      instruction: 'Klik kartu untuk membalik dan mempelajari fakta konservasi ekologis.',
      challengeKey: 'flashcards-orangutan',
      cards: HUTAN_FLASHCARDS,
    },
    {
      id: 'hutan-slide-7',
      type: 'story-resolution',
      chapterBadge: 'BABAK 7: KELANJUTAN MISI RIMBA',
      title: 'Koridor Wallacea Lestari & Aman!',
      celebrationEmoji: '🌲',
      reportTitle: 'Laporan Patroli Konservasi Ranger Banyu:',
      resolutionStory:
        'Terima kasih atas kerja keras seluruh siswa di kelas! Koridor jelajah satwa Wallacea aman dari pembalakan dan orangutan lestari di kanopi aslinya. Jalur migrasi satwa liar berhasil tersambung kembali dan tunas-tunas pohon ara muda kini tumbuh subur menghijaukan Borneo!',
      achievementBadges: [
        { label: 'Penjaga Koridor Hayati Wallacea' },
        { label: 'Pakar 4 Strata Vertikal Kanopi' },
        { label: 'Sahabat Konservasi Orangutan' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'hutan-slide-8',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 8: REFLEKSI & DISKUSI KELAS',
      title: 'Pertanyaan Pemantik HOTS Biodiversitas Tropis',
      subtitle: 'Ajak siswa mendiskusikan tiga studi kasus nyata konservasi hutan nusantara:',
      sparkCards: [
        {
          number: 1,
          badgeColor: 'emerald',
          title: 'Bahaya Fragmentasi Hutan',
          question:
            'Mengapa pembukaan kebun monokultur yang membelah hutan alami mempercepat kepunahan satwa langka seperti orangutan dan harimau?',
        },
        {
          number: 2,
          badgeColor: 'amber',
          title: 'Hutan Tropis sebagai Paru-Paru Dunia',
          question:
            'Bagaimana peran hutan hujan tropis Indonesia dalam menyerap emisi karbon dioksida global dan menjaga stabilitas iklim bumi?',
        },
        {
          number: 3,
          badgeColor: 'blue',
          title: 'Aksi Nyata Konsumen Bijak',
          question:
            'Tindakan nyata apa dalam kehidupan sehari-hari (seperti menghemat kertas atau memilih produk berkelanjutan) yang bisa kita lakukan demi melindungi hutan?',
        },
      ],
      victoryButtonText: '🏆 Selesai & Rayakan Kemenangan Kelas!',
    },
  ],
};

// ============================================================================
// 4. DECK: ULAR TANGGA TATA SURYA (Planet & Gravitasi) — 8 Slides
// ============================================================================

export const SOLAR_PLANETS_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'p1',
    order: 1,
    label: '1. Merkurius',
    iconEmoji: '🌑',
    description: 'Planet terdekat dari matahari dengan suhu permukaan ekstrem siang dan malam.',
  },
  {
    id: 'p2',
    order: 2,
    label: '2. Venus',
    iconEmoji: '🌕',
    description: 'Planet terpanas di tata surya akibat efek rumah kaca atmosfer karbon dioksida tebal.',
  },
  {
    id: 'p3',
    order: 3,
    label: '3. Bumi',
    iconEmoji: '🌍',
    description: 'Satu-satunya planet berpenghuni dengan air cair, atmosfer kaya oksigen, dan medan magnet.',
  },
  {
    id: 'p4',
    order: 4,
    label: '4. Mars',
    iconEmoji: '🔴',
    description: 'Planet merah kaya mineral besi dengan gunung berapi tertinggi Olympus Mons.',
  },
  {
    id: 'p5',
    order: 5,
    label: '5. Jupiter',
    iconEmoji: '🟠',
    description: 'Raksasa gas terbesar bermassa lebih dari gabungan seluruh planet lainnya, berhiaskan Bintik Merah Raksasa.',
  },
  {
    id: 'p6',
    order: 6,
    label: '6. Saturnus',
    iconEmoji: '🪐',
    description: 'Planet gas bermahkota cincin partikel es dan batuan paling spektakuler dan luas.',
  },
  {
    id: 'p7',
    order: 7,
    label: '7. Uranus',
    iconEmoji: '🧊',
    description: 'Raksasa es berwarna biru kehijauan metana dengan poros rotasi merebah menyamping.',
  },
  {
    id: 'p8',
    order: 8,
    label: '8. Neptunus',
    iconEmoji: '🔵',
    description: 'Planet terjauh berangin badai supersonik berkekuatan ribuan kilometer per jam.',
  },
];

export const SPACE_CHARACTERISTICS_PAIRS: MatchGamePair[] = [
  {
    id: 'a1',
    leftText: 'Planet Mars',
    rightText: 'Planet Merah kaya debu oksida besi',
  },
  {
    id: 'a2',
    leftText: 'Planet Jupiter',
    rightText: 'Raksasa gas dengan Bintik Merah Raksasa',
  },
  {
    id: 'a3',
    leftText: 'Planet Saturnus',
    rightText: 'Planet berkepemilikan cincin es spektakuler',
  },
  {
    id: 'a4',
    leftText: 'Sabuk Asteroid',
    rightText: 'Cincin batuan purba antara Mars dan Jupiter',
  },
];

export const ECLIPSE_GEOMETRY_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'gm1',
    order: 1,
    label: '1. Matahari (Sumber Cahaya)',
    iconEmoji: '☀️',
    description: 'Bintang pusat tata surya yang memancarkan berkas foton sinar sejajar ke seluruh antariksa.',
  },
  {
    id: 'gm2',
    order: 2,
    label: '2. Bulan (Penghalang Cahaya)',
    iconEmoji: '🌑',
    description: 'Satelit alami yang berada tepat di tengah melintasi garis lurus ekliptika menutupi piringan surya.',
  },
  {
    id: 'gm3',
    order: 3,
    label: '3. Bumi (Daerah Umbra)',
    iconEmoji: '🌍',
    description: 'Permukaan tempat jatuhnya kerucut bayangan inti umbra, tempat pengamat menyaksikan gerhana matahari total.',
  },
];

export const ULAR_TANGGA_TATASURYA_DECK: PresentationDeckData = {
  gameId: 'ular-tangga-tatasurya',
  title: 'Ular Tangga: Tata Surya & Gravitasi',
  subtitle: 'Ekspedisi Orbit 8 Planet, Sabuk Asteroid, & Mekanika Gerhana',
  themeColor: 'purple',
  icon: '🚀',
  category: 'sains',
  gradeLevel: 'SD Kelas 4-6',
  subjectDetail: 'Tata Surya, Planet & Bintang (SD Kelas 6)',
  mentor: {
    name: 'Kapten Dirgantara',
    role: 'Astro-Komandan Misi Dirgantara',
    avatarEmoji: '🚀',
  },
  totalSlides: 8,
  slides: [
    {
      id: 'tatasurya-slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: PANGGILAN MISI ANTARIKSA',
      title: 'Peluncuran Wahana Garuda Orbital Menuju Sabuk Kuiper',
      subtitle: 'Misi Penjelajahan Tata Surya & Gravitasi Universal',
      dialogue:
        'Perhatian seluruh kru astro-kadet! Saya Kapten Dirgantara, komandan ekspedisi antariksa nasional. Wahana riset tanpa awak Garuda Orbital sedang bersiap meluncur menjelajahi sistem tata surya kita. Dari orbit terdekat Merkurius yang membara, melintasi sabuk batuan asteroid, menembus cincin es Saturnus, hingga tepi sabuk Kuiper. Kita harus menghitung urutan orbit planet, memahami hukum gravitasi Newton, dan memecahkan geometri gerhana matahari. Hitung mundur peluncuran dimulai: T-minus 5 detik!',
      missionObjective: 'Kuasai urutan 8 planet, identifikasi benda langit, dan petakan geometri gerhana matahari',
      actionButtonText: 'Buka Modul 8 Planet Tata Surya',
    },
    {
      id: 'tatasurya-slide-2',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 2: MATERI INTI 1 - 8 PLANET TATA SURYA',
      title: '8 Planet Tata Surya & Pembagian Rumpun',
      subtitle: 'Matahari sebagai pusat gravitasi mengikat dua kategori planet utama:',
      cards: [
        {
          id: 'card-ts1',
          levelBadge: 'Planet Dalam',
          badgeColor: 'amber',
          iconEmoji: '🪨',
          title: 'Planet Terestrial (Kebumian)',
          description:
            'Merkurius, Venus, Bumi, dan Mars. Berpermukaan batuan padat silikat, berdensitas tinggi, dan berjarak relatif dekat ke Matahari.',
        },
        {
          id: 'card-ts2',
          levelBadge: 'Pemisah Orbit',
          badgeColor: 'indigo',
          iconEmoji: '☄️',
          title: 'Sabuk Asteroid Mars-Jupiter',
          description:
            'Jutaan bongkahan batuan dan logam sisa pembentukan tata surya yang gagal menyatu akibat gravitasi pasang surut Jupiter.',
        },
        {
          id: 'card-ts3',
          levelBadge: 'Planet Luar',
          badgeColor: 'purple',
          iconEmoji: '🪐',
          title: 'Planet Jovian (Gas & Es Raksasa)',
          description:
            'Jupiter, Saturnus, Uranus, dan Neptunus. Berukuran raksasa, tersusun atas gas hidrogen-helium dan es metana, serta berhiaskan cincin luas.',
        },
      ],
      teacherNotes:
        'Jelaskan kepada siswa bahwa Pluto sejak tahun 2006 diklasifikasikan sebagai planet kerdil (dwarf planet) berdasarkan resolusi IAU.',
    },
    {
      id: 'tatasurya-slide-3',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 3: TANTANGAN 1 - URUTAN 8 PLANET',
      title: 'Urutan 8 Planet Berdasarkan Jarak Orbit Matahari',
      subtitle: 'Susun 8 planet tata surya berurutan mulai dari yang paling dekat hingga paling jauh dari Matahari!',
      instruction: 'Gunakan tombol panah untuk menyusun kedelapan planet sesuai urutan orbit presisi.',
      challengeKey: 'sequence-8-planet',
      items: SOLAR_PLANETS_SEQUENCE,
    },
    {
      id: 'tatasurya-slide-4',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 4: MATERI INTI 2 - MEKANIKA ORBIT & GERHANA',
      title: 'Mekanika Orbit & Gerhana',
      subtitle: 'Gaya gravitasi semesta dan kesejajaran tiga benda langit:',
      cards: [
        {
          id: 'card-g1',
          levelBadge: 'Gaya Sentral',
          badgeColor: 'amber',
          iconEmoji: '☀️',
          title: 'Hukum Gravitasi Semesta',
          description:
            'Massa raksasa Matahari menghasilkan gaya tarik gravitasi yang melengkungkan ruang-waktu dan menjaga orbit elips 8 planet stabil.',
        },
        {
          id: 'card-g2',
          levelBadge: 'Bayangan Inti',
          badgeColor: 'purple',
          iconEmoji: '🌑',
          title: 'Kerucut Umbra & Penumbra',
          description:
            'Umbra adalah bayangan inti paling gelap tempat sinar tertutup total; Penumbra adalah bayangan kabur tempat sinar terhalang sebagian.',
        },
        {
          id: 'card-g3',
          levelBadge: 'Kesejajaran',
          badgeColor: 'blue',
          iconEmoji: '🌘',
          title: 'Geometri Gerhana (Syzygy)',
          description:
            'Gerhana matahari terjadi saat Bulan berada di antara Matahari dan Bumi, menutupi piringan surya pada fase bulan baru.',
        },
      ],
      teacherNotes:
        'Demonstrasikan bayangan umbra dan penumbra menggunakan lampu senter dan dua bola berukuran berbeda di depan kelas.',
    },
    {
      id: 'tatasurya-slide-5',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 5: TANTANGAN 2 - JULUKAN BENDA LANGIT',
      title: 'Karakteristik & Julukan Unik Benda Antariksa',
      subtitle: 'Hubungkan benda antariksa di Kolom A dengan karakteristik uniknya di Kolom B!',
      columnALabel: 'Benda Antariksa',
      columnBLabel: 'Karakteristik Unik',
      instruction: 'Tarik garis penghubung yang sesuai antara benda langit dan fakta astronominya.',
      challengeKey: 'match-karakteristik-antariksa',
      pairs: SPACE_CHARACTERISTICS_PAIRS,
    },
    {
      id: 'tatasurya-slide-6',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 6: TANTANGAN 3 - GEOMETRI GERHANA MATAHARI',
      title: 'Geometri Posisi Gerhana Matahari Total',
      subtitle: 'Susun urutan kesejajaran posisi 3 benda langit saat terjadi Gerhana Matahari Total!',
      instruction: 'Urutkan posisi benda langit dari sumber cahaya hingga pengamat di permukaan bumi.',
      challengeKey: 'sequence-gerhana-matahari',
      items: ECLIPSE_GEOMETRY_SEQUENCE,
    },
    {
      id: 'tatasurya-slide-7',
      type: 'story-resolution',
      chapterBadge: 'BABAK 7: KELANJUTAN MISI ANTARIKSA',
      title: 'Garuda Orbital Mendarat di Stasiun Kuiper!',
      celebrationEmoji: '🚀',
      reportTitle: 'Transmisi Telemetri Kapten Dirgantara:',
      resolutionStory:
        'Misi sukses sempurna! Berkat kalkulasi orbit 8 planet yang presisi dan pembacaan gerhana matahari oleh kelas hari ini, Wahana Garuda Orbital mendarat mulus di Stasiun Antariksa Kuiper. Sinyal telemetri pertama dari batas terjauh tata surya berhasil dikirimkan ke stasiun bumi di Indonesia!',
      achievementBadges: [
        { label: 'Navigator 8 Orbit Tata Surya' },
        { label: 'Master Geometri Gerhana Semesta' },
        { label: 'Pelopor Ekspedisi Garuda Antariksa' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'tatasurya-slide-8',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 8: REFLEKSI & DISKUSI KELAS',
      title: 'Pertanyaan Pemantik HOTS Astronomi Semesta',
      subtitle: 'Gunakan tiga pertanyaan astronomi reflektif berikut untuk mengasah daya imajinasi dan nalar murid:',
      sparkCards: [
        {
          number: 1,
          badgeColor: 'purple',
          title: 'Hukum Gravitasi & Jarak Orbit',
          question:
            'Mengapa planet yang berada lebih dekat ke Matahari (seperti Merkurius) bergerak mengitari orbitnya jauh lebih cepat dibanding planet terluar?',
        },
        {
          number: 2,
          badgeColor: 'amber',
          title: 'Kemiringan Bidang Orbit Gerhana',
          question:
            'Jika Bulan mengelilingi Bumi setiap 29.5 hari, mengapa gerhana matahari tidak terjadi setiap bulan baru? Mengapa bidang orbitnya miring 5 derajat?',
        },
        {
          number: 3,
          badgeColor: 'blue',
          title: 'Pencarian Planet Layak Huni',
          question:
            'Faktor apa saja yang menjadikan Bumi satu-satunya planet di tata surya kita yang mendukung kehidupan bernapas dan air cair?',
        },
      ],
      victoryButtonText: '🏆 Selesai & Rayakan Kemenangan Kelas!',
    },
  ],
};

// ============================================================================
// 5. DECK: EKOSISTEM HUTAN (Tingkat Trofik & Aliran Energi) — 7 Slides
// ============================================================================

export const PHOTOSYNTHESIS_ENERGY_SEQUENCE: SequenceGameItem[] = [
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

export const FOREST_TROPHIC_PAIRS: MatchGamePair[] = [
  {
    id: 'pair-produsen',
    leftText: 'Pohon Ara',
    rightText: 'Produsen autotrof',
  },
  {
    id: 'pair-herbivora',
    leftText: 'Orangutan',
    rightText: 'Konsumen penyebar biji',
  },
  {
    id: 'pair-karnivora',
    leftText: 'Macan Dahan',
    rightText: 'Predator puncak',
  },
  {
    id: 'pair-dekomposer',
    leftText: 'Jamur Lapuk',
    rightText: 'Pengurai tanah',
  },
];

export const FOREST_ECOSYSTEM_DECK: PresentationDeckData = {
  gameId: 'presentasi-ekosistem-hutan',
  title: 'Presentasi Interaktif: Ekspedisi Hutan Hujan Tropis',
  subtitle: 'Tiga Tingkat Trofik, Aliran Energi Fotosintesis, & Keseimbangan Alam',
  themeColor: 'emerald',
  icon: '🌿',
  category: 'sains',
  gradeLevel: 'SD Kelas 4-6',
  subjectDetail: 'Biologi, Fotosintesis & Rantai Makanan Tropis',
  mentor: {
    name: 'Prof. Maya Arisandi',
    role: 'Kepala Tim Riset Konservasi Alam',
    avatarEmoji: '🌿',
  },
  totalSlides: 7,
  slides: [
    {
      id: 'fe-slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: PANGGILAN PETUALANGAN',
      title: 'Misi Penyelamatan Lembah Hutan Hujan Tropis',
      subtitle: 'Pemulihan Siklus Aliran Energi Pohon Ara Purba',
      dialogue:
        'Halo rekan-rekan peneliti muda di kelas! Saya Prof. Maya Arisandi. Stasiun konservasi alam kita mendeteksi anomali serius di lembah hutan tropis Kalimantan. Rantai makanan terganggu dan pohon ara purba mengalami kekeringan fotosintesis. Kita membutuhkan bantuan seluruh kelas untuk merekonstruksi siklus energi matahari, memetakan rantai makanan trofik, dan memulihkan keseimbangan ekosistem agar hutan ini kembali lestari. Siapkah kalian memulai misi ini?',
      missionObjective: 'Pulihkan siklus fotosintesis pohon ara dan petakan relasi rantai makanan ekosistem',
      actionButtonText: 'Buka Materi Konsep Kunci Trofik',
    },
    {
      id: 'fe-slide-2',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 2: MATERI INTI 1 - TIGA TINGKAT TROFIK EKOSISTEM',
      title: 'Tiga Tingkat Trofik Ekosistem',
      subtitle: 'Pahami hubungan ketiga tingkat trofik ini sebelum menghadapi tantangan mini-game!',
      cards: [
        {
          id: 'card-trofik-1',
          iconEmoji: '🌱',
          levelBadge: 'Tingkat 1',
          title: 'Produsen (Autotrof)',
          description:
            'Tumbuhan hijau menangkap energi surya, air, dan CO2 melalui fotosintesis untuk memproduksi glukosa dan oksigen bagi seluruh ekosistem.',
          badgeColor: 'emerald',
        },
        {
          id: 'card-trofik-2',
          iconEmoji: '🦧',
          levelBadge: 'Tingkat 2',
          title: 'Konsumen (Heterotrof)',
          description:
            'Herbivora memakan dedaunan/buah dan menyebarkan biji pohon, sementara karnivora mengendalikan populasi agar hutan tidak over-grazing.',
          badgeColor: 'amber',
        },
        {
          id: 'card-trofik-3',
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
      id: 'fe-slide-3',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 3: MATERI INTI 2 - FOTOSINTESIS & ALIRAN ENERGI',
      title: 'Fotosintesis & Aliran Energi',
      subtitle: 'Konservasi Keanekaragaman Hayati melalui konversi energi surya abadi:',
      cards: [
        {
          id: 'card-energi-1',
          iconEmoji: '☀️',
          levelBadge: 'Input Alam',
          title: 'Foton Surya & Klorofil',
          description:
            'Pigmen klorofil pada tilakoid daun menangkap foton surya dan menggerakkan rantai fotolisis pemecahan molekul air.',
          badgeColor: 'amber',
        },
        {
          id: 'card-energi-2',
          iconEmoji: '🧪',
          levelBadge: 'Siklus Biokimia',
          title: 'Reaksi Sintesis Glukosa',
          description:
            'Enzim kloroplas mengikat molekul karbon dioksida dari udara dan ion hidrogen dari air menjadi biomassa glukosa.',
          badgeColor: 'teal',
        },
        {
          id: 'card-energi-3',
          iconEmoji: '💨',
          levelBadge: 'Output Hayati',
          title: 'Pelepasan Oksigen Bebas',
          description:
            'Oksigen bersih dihembuskan keluar lewat stomata daun untuk respirasi satwa dan manusia di sekeliling hutan rimba.',
          badgeColor: 'emerald',
        },
      ],
      teacherNotes:
        'Tekankan hukum kekekalan energi: energi cahaya matahari tidak pernah lenyap, melainkan bertransformasi menjadi energi kimia bahan makanan.',
    },
    {
      id: 'fe-slide-4',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 4: TANTANGAN 1 - URUTAN SIKLUS ENERGI',
      title: 'Siklus Aliran Energi Fotosintesis',
      subtitle: 'Pohon purba membutuhkan aktivasi siklus yang benar! Geser kartu langkah agar fotosintesis berjalan sempurna.',
      instruction:
        'Urutkan 4 tahapan fotosintesis dari penyerapan energi matahari hingga sintesis cadangan nutrisi glukosa.',
      challengeKey: 'challenge1',
      items: PHOTOSYNTHESIS_ENERGY_SEQUENCE,
    },
    {
      id: 'fe-slide-5',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 5: TANTANGAN 2 - RELASI RANTAI MAKANAN',
      title: 'Komponen Rantai Makanan Hutan Hujan',
      subtitle: 'Hubungkan makhluk hidup di Kolom A dengan perannya di Kolom B agar rantai ekosistem stabil!',
      columnALabel: 'Komponen Ekosistem',
      columnBLabel: 'Peran Ekologis Tropis',
      instruction: 'Tarik garis penghubung antara organisme hutan hujan dan fungsi rantai makanannya.',
      challengeKey: 'challenge2',
      pairs: FOREST_TROPHIC_PAIRS,
    },
    {
      id: 'fe-slide-6',
      type: 'story-resolution',
      chapterBadge: 'BABAK 6: DAMPAK KELANJUTAN CERITA',
      title: 'Lembah Kalimantan Kembali Berseri!',
      celebrationEmoji: '🏆',
      reportTitle: 'Laporan Hasil Riset Konservasi Alam:',
      resolutionStory:
        'Luar biasa kerja sama kelas hari ini! Berkat ketepatan kalian mengurutkan siklus energi fotosintesis dan memetakan peran satwa hutan, pohon ara purba bersemi kembali dan satwa hutan tropis memiliki pakan berlimpah! Orangutan dan fauna endemik kini dapat berkembang biak dengan aman. Kalian resmi dinobatkan sebagai Cendekiawan Konservasi Hutan Tropis!',
      achievementBadges: [
        { label: 'Tantangan 1: Urutan Fotosintesis Selesai' },
        { label: 'Tantangan 2: Pasangan Ekosistem Selesai' },
        { label: 'Penjaga Pohon Ara Purba Borneo' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'fe-slide-7',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 7: REFLEKSI & DISKUSI KELAS',
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

// Aliases for compatibility
export const PRESENTASI_EKOSISTEM_HUTAN_DECK = FOREST_ECOSYSTEM_DECK;

// ============================================================================
// 6. MASTER REGISTRY EXPORT: SCIENCE_PRESENTATION_DECKS
// ============================================================================

export const SCIENCE_PRESENTATION_DECKS: Record<string, PresentationDeckData> = {
  'ular-tangga-sains': ULAR_TANGGA_SAINS_DECK,
  'point-click-lab': POINT_CLICK_LAB_DECK,
  'point-click-hutan': POINT_CLICK_HUTAN_DECK,
  'ular-tangga-tatasurya': ULAR_TANGGA_TATASURYA_DECK,
  'presentasi-ekosistem-hutan': FOREST_ECOSYSTEM_DECK,
};
