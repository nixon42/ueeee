/**
 * Humanities, Mathematics, History, Language, and Logic Curriculum Presentation Decks (Milestone 3)
 * Researched Indonesian K-12 Curriculum Content (Kurikulum Merdeka CP Fase B, C, and D)
 * Conforming strictly to PresentationDeckData in src/types/presentation.ts
 *
 * 5 Humanities Decks:
 * 1. ULAR_TANGGA_MATEMATIKA_DECK (7 slides) — Pecahan Senilai, Desimal, & Geometri Bangun Datar (Kak Arya)
 * 2. POINT_CLICK_CANDI_DECK (8 slides) — Kosmologi Borobudur, Perahu Cadik & Pasak Andesit (Paman Dewa)
 * 3. TEKA_TEKI_KATA_DECK (7 slides) — EYD Edisi V, Kosakata KBBI & Pantun Tradisional (Ibu Kartika)
 * 4. ULAR_TANGGA_SEJARAH_DECK (8 slides) — Linimasa Proklamasi 1945 & Tokoh Perjuangan (Kak Satria)
 * 5. CATUR_TAKTIK_LOGIKA_DECK (7 slides) — Taktik Catur Geometris & Berpikir Komputasional (Master Utut)
 */

import {
  PresentationDeckData,
  SequenceGameItem,
  MatchGamePair,
  FlashcardItem,
} from '@/types/presentation';

// ============================================================================
// 1. DECK: ULAR TANGGA MATEMATIKA (Pecahan, Desimal & Geometri) — 7 Slides
// ============================================================================

export const FRACTION_DECIMAL_PAIRS: MatchGamePair[] = [
  {
    id: 'f1',
    leftText: '1/2',
    rightText: '0.50',
  },
  {
    id: 'f2',
    leftText: '3/4',
    rightText: '0.75',
  },
  {
    id: 'f3',
    leftText: '2/5',
    rightText: '0.40',
  },
  {
    id: 'f4',
    leftText: '1/8',
    rightText: '0.125',
  },
];

export const FRACTION_BLOCKS_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'b1',
    order: 1,
    label: '1/5 (0.20)',
    iconEmoji: '🧱',
    description: 'Balok paling ringan, bernilai seperlima bagian.',
  },
  {
    id: 'b2',
    order: 2,
    label: '1/3 (0.33)',
    iconEmoji: '🧱',
    description: 'Balok sepertiga, lebih besar dari seperlima.',
  },
  {
    id: 'b3',
    order: 3,
    label: '1/2 (0.50)',
    iconEmoji: '🧱',
    description: 'Balok setengah pas pembagi tengah jembatan.',
  },
  {
    id: 'b4',
    order: 4,
    label: '3/4 (0.75)',
    iconEmoji: '🧱',
    description: 'Balok tiga perempat yang menopang tiang utama.',
  },
  {
    id: 'b5',
    order: 5,
    label: '9/10 (0.90)',
    iconEmoji: '🧱',
    description: 'Balok terberat hampir utuh mendekati 1.',
  },
];

export const FRACTION_BLOCK_SEQUENCE = FRACTION_BLOCKS_SEQUENCE;

export const ULAR_TANGGA_MATEMATIKA_DECK: PresentationDeckData = {
  gameId: 'ular-tangga-matematika',
  title: 'Ular Tangga: Master Berhitung Cepat',
  subtitle: 'Petualangan Pecahan, Desimal, & Geometri Bangun Datar',
  themeColor: 'blue',
  icon: '📐',
  category: 'matematika',
  gradeLevel: 'SD Kelas 4-6',
  subjectDetail: 'Matematika / Aritmatika & Geometri',
  mentor: {
    name: 'Kak Arya',
    role: 'Arsitek Angka & Struktur',
    avatarEmoji: '📐',
  },
  totalSlides: 7,
  slides: [
    {
      id: 'utm-slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: JALUR LOGISTIK TERPUTUS',
      title: 'Menuntaskan Jembatan Gantung Fraksi Seratus Petak',
      subtitle: 'Kalkulasi Proporsi Fondasi Kereta Logistik',
      dialogue:
        'Salam kreatif, para arsitek cilik! Pembangunan Jembatan Gantung Emas di atas Jurang Seratus Petak sedang terhenti. Kereta logistik pembawa bahan pangan tertahan di seberang tebing karena balok-balok penopang pecahan belum dipasang dengan proporsi yang tepat. Banyak balok retak karena salah kalkulasi luas dan keliling. Kita harus menyeberangi petak demi petak, menguasai pecahan senilai, dan menghitung luas bangun datar agar jembatan tersambung kuat. Ayo ambil kalkulator pikiran kalian dan bantu saya menyelesaikannya!',
      missionObjective: 'Sambungkan Jembatan Gantung Emas dengan kalkulasi pecahan dan luas presisi',
      actionButtonText: 'Buka Cetak Biru Jembatan',
    },
    {
      id: 'utm-slide-2',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 2: MATERI INTI 1 - KELUARGA PECAHAN',
      title: 'Pecahan Senilai, Desimal, & Persentase: Satu Nilai, Banyak Wajah',
      subtitle: 'Pecahan menyatakan bagian dari keutuhan yang dapat dinyatakan dalam beragam bentuk:',
      cards: [
        {
          id: 'card-m1',
          levelBadge: 'Bentuk Biasa',
          badgeColor: 'blue',
          iconEmoji: '🍕',
          title: 'Pecahan Biasa',
          description:
            'Menyatakan pembilang (bagian yang diambil) per penyebut (total bagian utuh). Contoh: 1/2 artinya 1 potong dari 2 bagian kue.',
        },
        {
          id: 'card-m2',
          levelBadge: 'Senilai',
          badgeColor: 'emerald',
          iconEmoji: '⚖️',
          title: 'Pecahan Senilai',
          description:
            'Mengalikan atau membagi pembilang dan penyebut dengan angka yang sama menghasilkan nilai setara: 1/2 = 2/4 = 4/8.',
        },
        {
          id: 'card-m3',
          levelBadge: 'Desimal',
          badgeColor: 'purple',
          iconEmoji: '🔢',
          title: 'Pecahan Desimal',
          description:
            'Bentuk persepuluhan atau perseratusan bertanda koma: 1/2 = 0.50; 3/4 = 0.75; 2/5 = 0.40; 1/8 = 0.125.',
        },
        {
          id: 'card-m4',
          levelBadge: 'Persentase',
          badgeColor: 'amber',
          iconEmoji: '📊',
          title: 'Persentase (%)',
          description:
            'Pecahan dengan penyebut seratus: 1/2 = 50%; 3/4 = 75%; 2/5 = 40%; dan 1/1 penuh = 100%.',
        },
      ],
      teacherNotes:
        'Gunakan analogi potongan kue martabak manis isi 8 untuk memperagakan bahwa 4/8 potong sama kenyangnya dengan 1/2 lingkaran martabak.',
    },
    {
      id: 'utm-slide-3',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 3: MATERI INTI 2 - GEOMETRI BIDANG DATAR',
      title: 'Keliling vs Luas Bangun Datar: Menghitung Pagar & Ubin',
      subtitle: 'Bedakan pengukuran garis tepi (keliling) dengan penutupan permukaan bidang (luas):',
      cards: [
        {
          id: 'card-g1',
          levelBadge: 'Persegi',
          badgeColor: 'blue',
          iconEmoji: '🟦',
          title: 'Persegi (Bujur Sangkar)',
          description:
            'Empat sisi sama panjang. Keliling = 4 × s (panjang pagar tepi). Luas = s × s (jumlah ubin lantai).',
        },
        {
          id: 'card-g2',
          levelBadge: 'Persegi Panjang',
          badgeColor: 'emerald',
          iconEmoji: '🟩',
          title: 'Persegi Panjang',
          description:
            'Memiliki panjang (p) dan lebar (l). Keliling = 2 × (p + l). Luas = p × l satuan kuadrat.',
        },
        {
          id: 'card-g3',
          levelBadge: 'Segitiga',
          badgeColor: 'amber',
          iconEmoji: '📐',
          title: 'Segitiga & Sudut Siku-Siku',
          description:
            'Luas atap segitiga = 1/2 × alas × tinggi. Segitiga siku-siku memenuhi tripel Pythagoras: 3² + 4² = 5².',
        },
      ],
      teacherNotes:
        'Ingatkan siswa bahwa keliling menggunakan satuan panjang tunggal (m, cm), sedangkan luas selalu menggunakan satuan persegi (m², cm²).',
    },
    {
      id: 'utm-slide-4',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 4: TANTANGAN 1 - KESETARAAN PECAHAN',
      title: 'Kesetaraan Pecahan Senilai & Desimal',
      subtitle: 'Tautkan pecahan di Kolom A dengan nilai desimal setaranya di Kolom B:',
      columnALabel: 'Pecahan Biasa',
      columnBLabel: 'Bentuk Desimal',
      pairs: FRACTION_DECIMAL_PAIRS,
      instruction: 'Tarik garis penghubung dari pecahan biasa ke bentuk desimal yang nilainya identik!',
      explanationOnSuccess: 'Luar biasa! Seluruh balok pecahan dan desimal berhasil dipasangkan dengan akurasi 100%!',
      challengeKey: 'frac-pairs',
    },
    {
      id: 'utm-slide-5',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 5: TANTANGAN 2 - TANGGA BALOK PECAHAN',
      title: 'Urutan Balok Fraksi dari Terkecil ke Terbesar',
      subtitle: 'Susun balok penyangga jembatan dari ketebalan paling tipis ke paling tebal:',
      items: FRACTION_BLOCKS_SEQUENCE,
      instruction: 'Geser balok pecahan agar tersusun urut mulai dari nilai terkecil hingga terbesar!',
      explanationOnSuccess: 'Sempurna! Balok tersusun berurutan dari 1/5 (0.20) hingga 9/10 (0.90), fondasi jembatan kokoh!',
      challengeKey: 'frac-sequence',
    },
    {
      id: 'utm-slide-6',
      type: 'story-resolution',
      chapterBadge: 'BABAK 6: RESOLUSI KISAH',
      title: 'Jembatan Emas Tersambung, Kereta Logistik Melaju!',
      subtitle: 'Keberhasilan Perhitungan Arsitektur Numerik',
      celebrationEmoji: '🌉',
      reportTitle: 'Laporan Hasil Misi Arsitektur Jembatan:',
      resolutionStory:
        'Klakson kereta berbunyi nyaring tanda syukur! Berkat kejelian kalian menghitung pecahan senilai dan mengurutkan balok fondasi dengan sempurna, Jembatan Gantung Emas tersambung kokoh dan kereta logistik melaju selamat melintasi tebing jurang. Pasokan bahan pangan untuk warga desa terpencil sampai tanpa cacat. Kalian resmi dikukuhkan sebagai Master Arsitek & Kalkulasi Numerik Nusantara!',
      achievementBadges: [
        { label: 'Master Pecahan', description: 'Memahami kesetaraan desimal & persen' },
        { label: 'Arsitek Geometri', description: 'Kalkulasi luas dan keliling akurat' },
        { label: 'Penyelamat Logistik', description: 'Jembatan tersambung tanpa retak' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'utm-slide-7',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 7: REFLEKSI GURU & DISKUSI KELAS',
      title: 'Menghubungkan Matematika dengan Realitas Hidup',
      subtitle: '3 Pemantik Diskusi Nalar Kritis (HOTS):',
      sparkCards: [
        {
          number: 1,
          title: 'Konsep Fraksi Sehari-hari',
          question:
            'Jika kamu memiliki sebatang cokelat isi 12 petak, lalu membagikannya kepada 3 teman sama rata, berapa pecahan cokelat yang didapat tiap teman dalam bentuk paling sederhana?',
          badgeColor: 'blue',
        },
        {
          number: 2,
          title: 'Logika Pertumbuhan Geometri',
          question:
            'Jika ukuran panjang dan lebar kebun sekolah digandakan menjadi 2 kali lipat, mengapa luasnya bertambah menjadi 4 kali lipat dan bukan 2 kali lipat?',
          badgeColor: 'emerald',
        },
        {
          number: 3,
          title: 'Trik Komparasi Cepat',
          question:
            'Bagaimana cara cepat mengetahui bahwa 3/7 lebih kecil dari 4/9 tanpa harus mengubahnya menjadi bilangan desimal bersusun panjang?',
          badgeColor: 'amber',
        },
      ],
      victoryButtonText: '🏆 Selesai & Rayakan Kemenangan Kelas!',
    },
  ],
};

// ============================================================================
// 2. DECK: POINT & CLICK CANDI (Borobudur & Peradaban Maritim) — 8 Slides
// ============================================================================

export const CANDI_STRATA_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'c1',
    order: 1,
    label: 'Kamadhatu',
    iconEmoji: '🦶',
    description: 'Tingkat dasar kaki candi melambangkan manusia yang masih dikuasai hawa nafsu duniawi.',
  },
  {
    id: 'c2',
    order: 2,
    label: 'Rupadhatu',
    iconEmoji: '🧱',
    description: 'Empat teras persegi berlorong penuh ukiran relief perbuatan mulia melepaskan nafsu.',
  },
  {
    id: 'c3',
    order: 3,
    label: 'Arupadhatu',
    iconEmoji: '🪷',
    description: 'Tiga pelataran lingkaran tempat 72 stupa berongga lambang alam tanpa wujud.',
  },
  {
    id: 'c4',
    order: 4,
    label: 'Stupa Induk',
    iconEmoji: '✨',
    description: 'Puncak tertinggi candi melambangkan kebebasan mutlak dan pencerahan nirwana.',
  },
];

export const BOROBUDUR_COSMOLOGY_SEQUENCE = CANDI_STRATA_SEQUENCE;

export const BOROBUDUR_RELIEF_PAIRS: MatchGamePair[] = [
  {
    id: 'r1',
    leftText: 'Relief Kapal Cadik Ganda',
    rightText: 'Bukti ketangguhan bahari nenek moyang',
  },
  {
    id: 'r2',
    leftText: 'Sistem Pasak Batu Andesit',
    rightText: 'Konstruksi teknik sambung purba tahan gempa',
  },
  {
    id: 'r3',
    leftText: 'Prasasti Kayumwungan (824 M)',
    rightText: 'Dokumen batu peresmian bangunan suci Jinaraja',
  },
  {
    id: 'r4',
    leftText: 'Arca Buddha Dhyani Bhumisparsha',
    rightText: 'Sikap tangan menyentuh bumi saksi keteguhan hati',
  },
];

export const BOROBUDUR_MARITIME_PAIRS = BOROBUDUR_RELIEF_PAIRS;

export const BOROBUDUR_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'bf-1',
    frontPrompt: 'Siapakah arsitek jenius yang memimpin perancangan dan pemahatan mahakarya Candi Borobudur?',
    backAnswer: 'Gunadharma',
    backExplanation:
      'Tokoh arsitek legendaris yang dipercaya masyarakat Jawa beristirahat abadi membentuk siluet punggung Pegunungan Menoreh.',
    backCurriculumFact: 'Dibangun sekitar 750-825 Masehi pada masa Dinasti Syailendra.',
    frontEmoji: '🏛️',
  },
  {
    id: 'bf-2',
    frontPrompt: 'Bagaimana Candi Borobudur (Buddha) dan Prambanan (Hindu) dapat berdiri berdampingan pada era yang sama?',
    backAnswer: 'Pernikahan Politik & Toleransi Luhur',
    backExplanation:
      'Penyatuan Raja Rakai Pikatan (Sanjaya/Hindu) dan Pramodawardhani (Syailendra/Buddha) membuktikan tingginya harmoni kebhinekaan nenek moyang.',
    backCurriculumFact: 'Toleransi Mataram Kuno menjadi fondasi Bhinneka Tunggal Ika.',
    frontEmoji: '🤝',
  },
];

export const POINT_CLICK_CANDI_DECK: PresentationDeckData = {
  gameId: 'point-click-candi',
  title: 'Point & Click: Relief Candi & Sejarah Nusantara',
  subtitle: 'Eksplorasi Kosmologi Borobudur, Perahu Cadik & Pasak Andesit',
  themeColor: 'amber',
  icon: '🏛️',
  category: 'sejarah',
  gradeLevel: 'SMP',
  subjectDetail: 'Sejarah / Kebudayaan & Arkeologi Maritim',
  mentor: {
    name: 'Paman Dewa',
    role: 'Kurator Arkeologi & Cagar Budaya',
    avatarEmoji: '🏛️',
  },
  totalSlides: 8,
  slides: [
    {
      id: 'pcc-slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: KABUT DI BUKIT MENOREH',
      title: 'Menguak Rahasia Relief Abad ke-8 Masehi',
      subtitle: 'Misi Restorasi Katalog Peradaban Kemaritiman Dunia',
      dialogue:
        'Rahayu anak-anakku, para kurator muda kebanggaan bangsa! Fajar menyingsing di atas Bukit Menoreh, menerangi lebih dari dua juta bongkah batu andesit Candi Borobudur yang dibangun pada masa kejayaan Dinasti Syailendra sekitar tahun 750-825 Masehi. Museum Cagar Budaya kita sedang menyusun katalog relief kemaritiman dunia, namun fragmen dokumentasi perahu layar cadik kuno dan pembagian tiga alam kosmologi candi mengalami kerusakan data. Mari kita jelajahi lorong-lorong batu pahatan relief, baca prasasti batu, dan hidupkan kembali kebesaran leluhur kita!',
      missionObjective: 'Pulihkan dokumentasi strata kosmologi dan bukti kebesaran maritim Candi Borobudur',
      actionButtonText: 'Masuki Gerbang Candi Borobudur',
    },
    {
      id: 'pcc-slide-2',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 2: KOSMOLOGI ARSITEKTUR CANDI',
      title: 'Tiga Strata Kosmologi Buddhis: Kamadhatu, Rupadhatu, & Arupadhatu',
      subtitle: 'Perjalanan ziarah jiwa dari alam hasrat duniawi menuju pencerahan nirwana:',
      cards: [
        {
          id: 'card-c1',
          levelBadge: 'Kaki Candi',
          badgeColor: 'amber',
          iconEmoji: '🦶',
          title: 'Kamadhatu (Alam Hasrat)',
          description:
            'Kaki candi tertutup yang memuat 160 panel relief Karmawibhangga tentang hukum sebab-akibat perbuatan manusia fana yang terikat nafsu.',
        },
        {
          id: 'card-c2',
          levelBadge: 'Teras Persegi',
          badgeColor: 'emerald',
          iconEmoji: '🧱',
          title: 'Rupadhatu (Alam Berwujud)',
          description:
            'Empat teras persegi berlorong pemisah nafsu ragawi; memuat 1.300 relief Lalitavistara & Jataka kisah kebajikan Sang Buddha.',
        },
        {
          id: 'card-c3',
          levelBadge: 'Teras Bundar',
          badgeColor: 'blue',
          iconEmoji: '🪷',
          title: 'Arupadhatu (Alam Tanpa Wujud)',
          description:
            'Tiga pelataran bundar konsentris dengan 72 stupa terawang berongga belah ketupat dan lingkaran lambang keheningan mutlak.',
        },
      ],
      teacherNotes:
        'Ajak siswa mengamati peralihan bentuk arsitektur dari lantai bawah yang bersegi kaku ke lantai atas yang membulat mulus sebagai simbol transisi spiritual.',
    },
    {
      id: 'pcc-slide-3',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 3: TEKNOLOGI LELUHUR & KELAUTAN',
      title: 'Perahu Layar Cadik Ganda & Pasak Andesit Interlocking',
      subtitle: 'Kecerdasan teknologi bangsa bahari dan ketahanan gempa seribu tahun:',
      cards: [
        {
          id: 'card-t1',
          levelBadge: 'Kemaritiman',
          badgeColor: 'blue',
          iconEmoji: '⛵',
          title: 'Kapal Cadik Ganda Samudra',
          description:
            'Relief kapal bertiang ganda dengan cadik bambu penyeimbang ombak ganas; bukti pelayaran melintasi Samudra Hindia hingga Madagaskar.',
        },
        {
          id: 'card-t2',
          levelBadge: 'Arsitektur',
          badgeColor: 'emerald',
          iconEmoji: '🧩',
          title: 'Pasak Batu Andesit (Interlocking)',
          description:
            'Dua juta bongkah batu andesit dipahat sambung-menyambung seperti pasak lego purba tanpa adukan semen, fleksibel meredam getaran gempa.',
        },
        {
          id: 'card-t3',
          levelBadge: 'Epigrafi',
          badgeColor: 'purple',
          iconEmoji: '📜',
          title: 'Prasasti Kayumwungan & Klurak',
          description:
            'Prasasti batu bertarikh 824 Masehi beraksara Jawa Kuno dan Pranagari mencatat gotong royong pemahatan candi di era Ratu Pramodawardhani.',
        },
      ],
      teacherNotes:
        'Tunjukkan bahwa kapal Borobudur direkonstruksi nyata pada tahun 2003 dan berhasil berlayar mengarungi Samudra Hindia hingga Ghana, Afrika.',
    },
    {
      id: 'pcc-slide-4',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 4: TANTANGAN 1 - STRATA KOSMOLOGI',
      title: 'Urutan 4 Strata Arsitektur Kosmologi Candi',
      subtitle: 'Susun tingkatan filosofis candi dari kaki terbawah hingga puncak stupa tertinggi:',
      items: CANDI_STRATA_SEQUENCE,
      instruction: 'Urutkan strata candi mulai dari Kamadhatu hingga Stupa Induk Nirwana!',
      explanationOnSuccess: 'Sempurna! Urutan filosofis dari Kamadhatu menuju pencerahan Stupa Induk tertata akurat!',
      challengeKey: 'strata-candi',
    },
    {
      id: 'pcc-slide-5',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 5: TANTANGAN 2 - ARTEFAK KEMARITIMAN',
      title: 'Artefak Candi & Bukti Kemaritiman Nusantara',
      subtitle: 'Hubungkan bukti peninggalan di Kolom A dengan fakta peradaban di Kolom B:',
      columnALabel: 'Bukti Peninggalan Candi',
      columnBLabel: 'Fakta Peradaban Nusantara',
      pairs: BOROBUDUR_RELIEF_PAIRS,
      instruction: 'Jodohkan artefak arkeologis dengan signifikansi sejarahnya!',
      explanationOnSuccess: 'Luar biasa! Hubungan antara relief candi dan ketangguhan maritim bangsa terbukti kokoh!',
      challengeKey: 'relief-pairs',
    },
    {
      id: 'pcc-slide-6',
      type: 'mini-game-flashcard',
      chapterBadge: 'BABAK 6: TANTANGAN 3 - DINASTI & TOLERANSI',
      title: 'Toleransi Dinasti Syailendra & Sanjaya',
      subtitle: 'Buka kartu aktif untuk mengingat fakta luhur keharmonisan Nusantara:',
      cards: BOROBUDUR_FLASHCARDS,
      instruction: 'Klik kartu untuk membalik dan mengingat tokoh arsitek serta sejarah toleransi leluhur!',
      challengeKey: 'candi-flashcards',
    },
    {
      id: 'pcc-slide-7',
      type: 'story-resolution',
      chapterBadge: 'BABAK 7: RESOLUSI KISAH',
      title: 'Dokumentasi Warisan Dunia Borobudur Diresmikan!',
      subtitle: 'Pengakuan Mahakarya Peradaban Nusantara oleh UNESCO',
      celebrationEmoji: '📜',
      reportTitle: 'Hasil Inventarisasi Balai Konservasi:',
      resolutionStory:
        'Matahari siang menyinari stupa induk dengan keagungan abadi! Berkat ketelitian kalian menerjemahkan relief dan menata strata kosmologi, Kitab Dokumentasi Peradaban Maritim Borobudur resmi terbit untuk UNESCO. Para peneliti internasional mengagumi teknologi pasak tahan gempa dan keberanian nenek moyang mengarungi samudra. Kalian resmi diangkat sebagai Duta Muda Pelestari Cagar Budaya Nusantara!',
      achievementBadges: [
        { label: 'Kurator Kosmologi', description: 'Memahami 3 strata Buddhis Borobudur' },
        { label: 'Peneliti Maritim', description: 'Membuktikan pelayaran jalur rempah' },
        { label: 'Penjaga Cagar Budaya', description: 'Merawat mahakarya batu andesit' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'pcc-slide-8',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 8: REFLEKSI GURU & DISKUSI KELAS',
      title: 'Refleksi Nilai Kebudayaan & Toleransi Bangsa',
      subtitle: '3 Pemantik Diskusi Nalar Kritis (HOTS):',
      sparkCards: [
        {
          number: 1,
          title: 'Keteladanan Toleransi Sejarah',
          question:
            'Apa pelajaran toleransi beragama paling berharga yang bisa bangsa Indonesia teladani hari ini dari berdirinya Candi Borobudur dan Prambanan berdampingan di tanah Jawa kuno?',
          badgeColor: 'amber',
        },
        {
          number: 2,
          title: 'Kedaulatan Maritim Modern',
          question:
            'Mengapa bangsa Indonesia modern dijuluki sebagai "Poros Maritim Dunia" jika dikaitkan dengan bukti relief kapal layar di dinding Candi Borobudur?',
          badgeColor: 'blue',
        },
        {
          number: 3,
          title: 'Etika Pelestarian Cagar Budaya',
          question:
            'Mengapa saat berkunjung ke candi kita dilarang keras menaiki pagar stupa, mencoret-coret batu, atau membuang sampah sembarangan?',
          badgeColor: 'emerald',
        },
      ],
      victoryButtonText: '🏆 Selesai & Rayakan Kemenangan Kelas!',
    },
  ],
};

// ============================================================================
// 3. DECK: TEKA-TEKI KATA (PUEBI/EYD V & Kosakata KBBI) — 7 Slides
// ============================================================================

export const KBBI_BAKU_PAIRS: MatchGamePair[] = [
  {
    id: 'k1',
    leftText: 'Apotik',
    rightText: 'Apotek',
  },
  {
    id: 'k2',
    leftText: 'Ijin',
    rightText: 'Izin',
  },
  {
    id: 'k3',
    leftText: 'Praktek',
    rightText: 'Praktik',
  },
  {
    id: 'k4',
    leftText: 'Nasehat',
    rightText: 'Nasihat',
  },
  {
    id: 'k5',
    leftText: 'Analisa',
    rightText: 'Analisis',
  },
];

export const PANTUN_NASEHAT_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'pt1',
    order: 1,
    label: 'Sampiran 1',
    iconEmoji: '⛵',
    description: '"Berlayar perahu menuju Bangka," (Ujung rima: -ka)',
  },
  {
    id: 'pt2',
    order: 2,
    label: 'Sampiran 2',
    iconEmoji: '🌊',
    description: '"Singgah sejenak menebar sauh." (Ujung rima: -uh)',
  },
  {
    id: 'pt3',
    order: 3,
    label: 'Isi 1',
    iconEmoji: '📚',
    description: '"Tuntutlah ilmu selagi muda," (Ujung rima: -da senada dengan -ka)',
  },
  {
    id: 'pt4',
    order: 4,
    label: 'Isi 2',
    iconEmoji: '🌟',
    description: '"Supaya hari tua tidak mengeluh." (Ujung rima: -uh senada dengan sauh)',
  },
];

export const TEKA_TEKI_KATA_DECK: PresentationDeckData = {
  gameId: 'teka-teki-kata',
  title: 'Teka-Teki: Susun Kata & Kosakata Cerdas',
  subtitle: 'Cendekiawan Kata, Ejaan Baku KBBI & Sastra Nusantara',
  themeColor: 'purple',
  icon: '📖',
  category: 'bahasa',
  gradeLevel: 'SMP',
  subjectDetail: 'Bahasa Indonesia / Ejaan Baku & Sastra Tradisional',
  mentor: {
    name: 'Ibu Kartika',
    role: 'Pengampu Bahasa & Sastra Nusantara',
    avatarEmoji: '📖',
  },
  totalSlides: 7,
  slides: [
    {
      id: 'ttk-slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: KEKACAUAN DI BALAI PUSTAKA',
      title: 'Memulihkan Naskah Emas Bahasa Persatuan',
      subtitle: 'Menjaga Martabat Tutur Kata dan Rima Pujangga Nusantara',
      dialogue:
        'Salam takzim para cendekiawan muda pembela bahasa! Sebuah insiden melanda Ruang Naskah Pusaka Balai Pustaka. Lembaran kamus istilah baku teracak dan bait-bait pantun nasehat warisan pujangga nusantara tercerai-berai baris lariknya. Bahasa adalah cermin kepribadian bangsa; jika kata baku dan rima sastra kita pudar, maka runtuhlah kesantunan komunikasi generasi kita. Mari kita susun kembali kepingan aksara, bedakan kata baku KBBI, dan padukan sampiran serta isi pantun agar naskah emas kita bersinar kembali!',
      missionObjective: 'Restorasi ejaan baku KBBI dan susun kembali pantun nasehat empat seuntai',
      actionButtonText: 'Buka Lembaran Naskah Pustaka',
    },
    {
      id: 'ttk-slide-2',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 2: MATERI INTI 1 - KETERTIBAN EJAAN EYD V',
      title: 'Pedoman EYD V & Kata Baku KBBI: Menulis Cermat & Berwibawa',
      subtitle: 'Standarisasi kaidah ejaan bahasa Indonesia resmi dan penyesuaian serapan:',
      cards: [
        {
          id: 'card-k1',
          levelBadge: 'Fonem Z vs J',
          badgeColor: 'emerald',
          iconEmoji: '✍️',
          title: 'Huruf Z pada Kata Serapan',
          description:
            'Kata serapan Arab/asing disesuaikan menggunakan fonem z: izin (bukan ijin), zaman (bukan jaman), rezeki (bukan rejeki).',
        },
        {
          id: 'card-k2',
          levelBadge: 'Akhiran -ek/-ik',
          badgeColor: 'blue',
          iconEmoji: '💊',
          title: 'Apotek & Praktik',
          description:
            'Serapan Belanda apotheek menjadi apotek (turunan: apoteker). Kata practice/practijk diserap menjadi praktik (turunan: praktisi).',
        },
        {
          id: 'card-k3',
          levelBadge: 'Konsonan Serapan',
          badgeColor: 'purple',
          iconEmoji: '🔬',
          title: 'Analisis & Kualitas',
          description:
            'Akhiran -ysis diserap menjadi -isis: analisis (bukan analisa). Huruf qu- diserap menjadi k-: kualitas (bukan kwalitas).',
        },
        {
          id: 'card-k4',
          levelBadge: 'Vokal i vs e',
          badgeColor: 'amber',
          iconEmoji: '🗣️',
          title: 'Nasihat & Teladan',
          description:
            'Kata baku resmi KBBI menggunakan vokal i: nasihat (bukan nasehat), teladan (bukan tauladan), antre (bukan antri).',
        },
      ],
      teacherNotes:
        'Ajak siswa mencari plang nama toko atau apotek di jalan raya sekitar sekolah yang masih keliru menuliskan kata baku.',
    },
    {
      id: 'ttk-slide-3',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 3: MATERI INTI 2 - ARSITEKTUR PANTUN & PERIBAHASA',
      title: 'Arsitektur Rima Pantun Empat Seuntai: Harmoni Sampiran & Isi',
      subtitle: 'Struktur estetika sastra Melayu-Nusantara yang mengikat rima dan pesan moral:',
      cards: [
        {
          id: 'card-p1',
          levelBadge: 'Rima Silang',
          badgeColor: 'emerald',
          iconEmoji: '🎶',
          title: 'Pola Rima a-b-a-b',
          description:
            'Bunyi akhir baris pertama selaras dengan baris ketiga, dan bunyi akhir baris kedua selaras dengan baris keempat.',
        },
        {
          id: 'card-p2',
          levelBadge: 'Sampiran',
          badgeColor: 'blue',
          iconEmoji: '⛵',
          title: 'Dua Larik Sampiran (1 & 2)',
          description:
            'Melukiskan keindahan alam, lautan, flora, atau kearifan hidup sehari-hari yang mengantarkan bunyi rima pembuka.',
        },
        {
          id: 'card-p3',
          levelBadge: 'Isi Amanat',
          badgeColor: 'amber',
          iconEmoji: '💡',
          title: 'Dua Larik Isi (3 & 4)',
          description:
            'Memuat intisari pesan nasehat budi pekerti luhur, ketekunan belajar, cinta tanah air, atau petuah bijak masa depan.',
        },
      ],
      teacherNotes:
        'Bimbing siswa menepuk tangan mengikuti ketukan irama 8 hingga 12 suku kata pada tiap baris larik pantun.',
    },
    {
      id: 'ttk-slide-4',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 4: TANTANGAN 1 - KATA BAKU KBBI',
      title: 'Kata Sehari-hari vs Kata Baku Resmi KBBI',
      subtitle: 'Pasangkan kata non-baku yang sering keliru di Kolom A dengan bentuk baku resminya di Kolom B:',
      columnALabel: 'Bentuk Non-Baku (Keliru)',
      columnBLabel: 'Bentuk Baku Resmi KBBI',
      pairs: KBBI_BAKU_PAIRS,
      instruction: 'Tautkan kata non-baku ke ejaan baku yang diakui dalam Kamus Besar Bahasa Indonesia!',
      explanationOnSuccess: 'Hebat! Ejaan resmi KBBI telah terpilih dengan benar, menata kerapian bahasa tertulis!',
      challengeKey: 'kbbi-match',
    },
    {
      id: 'ttk-slide-5',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 5: TANTANGAN 2 - MENYUSUN BAIT PANTUN',
      title: 'Menyusun Bait Pantun Nasehat Empat Seuntai',
      subtitle: 'Urutkan 4 larik acak menjadi bait pantun yang indah berima silang a-b-a-b:',
      items: PANTUN_NASEHAT_SEQUENCE,
      instruction: 'Atur posisi larik pantun dari Sampiran 1, Sampiran 2, hingga Isi 1 dan Isi 2!',
      explanationOnSuccess: 'Indah sekali! Bait pantun nasehat berima a-b-a-b tersusun sempurna penuh hikmah!',
      challengeKey: 'pantun-seq',
    },
    {
      id: 'ttk-slide-6',
      type: 'story-resolution',
      chapterBadge: 'BABAK 6: RESOLUSI KISAH',
      title: 'Naskah Emas Bahasa Persatuan Kembali Abadi!',
      subtitle: 'Kelestarian Sastra dan Ejaan Baku Bangsa',
      celebrationEmoji: '📖',
      reportTitle: 'Hasil Inventarisasi Balai Pustaka:',
      resolutionStory:
        'Denting genta sastra berbunyi merdu! Berkat kecermatan kalian memilah kata baku KBBI dan merangkai kembali bait pantun pusaka, Naskah emas bahasa persatuan Balai Pustaka berhasil direstorasi abadi dan dipamerkan di Perpustakaan Nasional. Generasi muda kini memiliki teladan berbahasa yang anggun, santun, dan membanggakan. Kalian resmi dinobatkan sebagai Duta Cendekiawan Bahasa & Sastra Nusantara!',
      achievementBadges: [
        { label: 'Pakar Ejaan KBBI', description: 'Membedakan kata baku dan tidak baku' },
        { label: 'Pujangga Pantun', description: 'Menyusun rima silang a-b-a-b' },
        { label: 'Penjaga Bahasa', description: 'Menjunjung bahasa persatuan nasional' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'ttk-slide-7',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 7: REFLEKSI GURU & DISKUSI KELAS',
      title: 'Nalar Kritis Kebahasaan & Identitas Bangsa',
      subtitle: '3 Pemantik Diskusi Nalar Kritis (HOTS):',
      sparkCards: [
        {
          number: 1,
          title: 'Bahasa Pemersatu Sumpah Pemuda',
          question:
            'Bagaimana ikrar Sumpah Pemuda 1928 yang menjunjung Bahasa Indonesia sebagai bahasa persatuan berhasil menyatukan ribuan pulau dengan ratusan bahasa daerah berbeda?',
          badgeColor: 'emerald',
        },
        {
          number: 2,
          title: 'Bahasa Gaul vs Bahasa Baku Formal',
          question:
            'Apakah penggunaan kata gaul atau slang di media sosial boleh digunakan saat menulis surat resmi dinas, makalah sekolah, atau berpidato?',
          badgeColor: 'blue',
        },
        {
          number: 3,
          title: 'Filosofi Peribahasa Nusantara',
          question:
            'Apa makna mendalam dari peribahasa "Air tenang menghanyutkan" dan bagaimana penerapannya dalam menilai watak seseorang secara bijaksana?',
          badgeColor: 'amber',
        },
      ],
      victoryButtonText: '🏆 Selesai & Rayakan Kemenangan Kelas!',
    },
  ],
};

// ============================================================================
// 4. DECK: ULAR TANGGA SEJARAH (Linimasa Proklamasi 1945) — 8 Slides
// ============================================================================

export const PROKLAMASI_1945_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'p1',
    order: 1,
    label: 'Kekalahan Jepang',
    iconEmoji: '📻',
    description: 'Jepang menyerah tanpa syarat kepada Sekutu pasca bom Hiroshima & Nagasaki.',
  },
  {
    id: 'p2',
    order: 2,
    label: 'Rengasdengklok',
    iconEmoji: '🚗',
    description: 'Pemuda membawa Soekarno-Hatta ke Karawang demi menjauhkan dari pengaruh Jepang.',
  },
  {
    id: 'p3',
    order: 3,
    label: 'Perumusan Naskah',
    iconEmoji: '✍️',
    description: 'Soekarno, Hatta, dan Subardjo merumuskan naskah di kediaman Laksamana Maeda.',
  },
  {
    id: 'p4',
    order: 4,
    label: 'Pengetikan Sayuti Melik',
    iconEmoji: '⌨️',
    description: 'Sayuti Melik mengetik naskah otentik dengan perubahan redaksi kata bersejarah.',
  },
  {
    id: 'p5',
    order: 5,
    label: 'Pembacaan Proklamasi',
    iconEmoji: '🎙️',
    description: 'Pembacaan proklamasi di Pegangsaan Timur 56 diiringi pengibaran Merah Putih.',
  },
];

export const PAHLAWAN_KEMERDEKAAN_PAIRS: MatchGamePair[] = [
  {
    id: 't1',
    leftText: 'Sayuti Melik',
    rightText: 'Mengetik naskah proklamasi otentik dengan mesin tik',
  },
  {
    id: 't2',
    leftText: 'Ibu Fatmawati',
    rightText: 'Menjahit helai demi helai bendera Sang Saka Merah Putih',
  },
  {
    id: 't3',
    leftText: 'Frans & Alex Mendur',
    rightText: 'Mengabadikan dan menyelamatkan foto pembacaan proklamasi',
  },
  {
    id: 't4',
    leftText: 'BM Diah',
    rightText: 'Menyelamatkan naskah tulisan tangan asli Bung Karno dari tong sampah',
  },
];

export const PROKLAMASI_FLASHCARDS: FlashcardItem[] = [
  {
    id: 'pf-1',
    frontPrompt: 'Apa perbedaan penulisan penanggalan antara naskah tulisan tangan Bung Karno dan naskah ketikan Sayuti Melik?',
    backAnswer: 'Djakarta, 17 - 8 - \'05 vs Djakarta, hari 17 boelan 8 tahoen \'05',
    backExplanation:
      'Tahun \'05 merujuk pada tahun 2605 Kalender Jimmu Jepang yang berlaku resmi di Indonesia pada masa pendudukan militer.',
    backCurriculumFact: 'Sayuti Melik juga menyempurnakan frasa "tempoh" menjadi "tempo".',
    frontEmoji: '📝',
  },
  {
    id: 'pf-2',
    frontPrompt: 'Siapakah tokoh pemuda yang mengusulkan teks proklamasi ditandatangani Soekarno-Hatta "atas nama bangsa Indonesia"?',
    backAnswer: 'Sukarni Kartodiwirjo',
    backExplanation:
      'Gagasan brilian Sukarni menyatukan representasi seluruh rakyat Indonesia tanpa perlu seluruh peserta rapat menandatangani kertas.',
    backCurriculumFact: 'Menghindari kesan bahwa kemerdekaan hanya milik kelompok tertentu.',
    frontEmoji: '💡',
  },
];

export const ULAR_TANGGA_SEJARAH_DECK: PresentationDeckData = {
  gameId: 'ular-tangga-sejarah',
  title: 'Ular Tangga: Linimasa Sejarah Indonesia',
  subtitle: 'Lintasan Sejarah Kemerdekaan, Rengasdengklok & Proklamasi 1945',
  themeColor: 'rose',
  icon: '🇮🇩',
  category: 'sejarah',
  gradeLevel: 'SD Kelas 4-6',
  subjectDetail: 'Sejarah / Peristiwa Sekitar Proklamasi Kemerdekaan',
  mentor: {
    name: 'Kak Satria',
    role: 'Pandu Perjuangan Kemerdekaan',
    avatarEmoji: '🇮🇩',
  },
  totalSlides: 8,
  slides: [
    {
      id: 'utsj-slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: KILAS BALIK AGUSTUS 1945',
      title: 'Mengarungi Linimasa Kedaulatan Bangsa',
      subtitle: 'Menelusuri Detik-Detik Emas Proklamasi Kemerdekaan',
      dialogue:
        'Merdeka! Saudara-saudara sekalian, generasi emas pewaris bumi pertiwi! Di hadapan kita membentang linimasa 100 petak tapak tilas sejarah kemerdekaan Indonesia. Tangga-tangga emas ini melambangkan kobaran api persatuan pemuda dan para pendiri bangsa, sementara jurang ular melambangkan politik adu domba penjajah. Arsip kronologis detik-detik proklamasi 17 Agustus 1945 sedang terancam terlupakan oleh zaman. Mari kita telusuri linimasa peristiwa, kenali peran para pahlawan di balik layar, dan kibarkan Sang Saka Merah Putih di puncak petak 100 kemerdekaan!',
      missionObjective: 'Rekonstruksi kronologis proklamasi 1945 dan kibarkan Sang Saka Merah Putih',
      actionButtonText: 'Buka Pintu Linimasa Perjuangan',
    },
    {
      id: 'utsj-slide-2',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 2: KRONOLOGI REVOLUSI',
      title: 'Linimasa Emas Detik-Detik Proklamasi: 14 - 17 Agustus 1945',
      subtitle: 'Rangkaian perjuangan menegakkan kemerdekaan atas kehendak bangsa sendiri:',
      cards: [
        {
          id: 'card-s1',
          levelBadge: '14 Agustus',
          badgeColor: 'amber',
          iconEmoji: '📻',
          title: 'Kekalahan Jepang',
          description:
            'Jepang menyerah tanpa syarat kepada Sekutu setelah bom Hiroshima dan Nagasaki; Sutan Sjahrir mendesak proklamasi dipercepat.',
        },
        {
          id: 'card-s2',
          levelBadge: '16 Agustus 04:00',
          badgeColor: 'rose',
          iconEmoji: '🚗',
          title: 'Peristiwa Rengasdengklok',
          description:
            'Pemuda membawa Soekarno dan Hatta ke Karawang guna mengamankan mereka dari tekanan dan pengaruh janji kemerdekaan Jepang.',
        },
        {
          id: 'card-s3',
          levelBadge: '16 Agustus Malam',
          badgeColor: 'blue',
          iconEmoji: '✍️',
          title: 'Perumusan Naskah di Maeda',
          description:
            'Perumusan teks proklamasi di kediaman Laksamana Maeda hingga sahur bersama; Soekarno menulis tangan konsep naskah klad.',
        },
        {
          id: 'card-s4',
          levelBadge: '17 Agustus 10:00',
          badgeColor: 'emerald',
          iconEmoji: '🎙️',
          title: 'Proklamasi Pegangsaan Timur 56',
          description:
            'Pembacaan teks kemerdekaan oleh Bung Karno didampingi Bung Hatta diiringi pengibaran Sang Saka Merah Putih oleh Latief & Suhud.',
        },
      ],
      teacherNotes:
        'Jelaskan bahwa golongan muda menolak kemerdekaan diproklamasikan melalui wadah PPKI buatan Jepang agar proklamasi berdaulat murni.',
    },
    {
      id: 'utsj-slide-3',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 3: TOKOH KUNCI DI BALIK LAYAR',
      title: 'Tokoh Pahlawan di Balik Layar Kemerdekaan',
      subtitle: 'Mereka yang berkorban dengan pena, mesin tik, jahitan kain, dan lensa kamera:',
      cards: [
        {
          id: 'card-tp1',
          levelBadge: 'Juru Ketik',
          badgeColor: 'blue',
          iconEmoji: '⌨️',
          title: 'Sayuti Melik',
          description:
            'Mengetik naskah proklamasi otentik dengan mesin tik, melakukan penyempurnaan redaksi kata bersejarah.',
        },
        {
          id: 'card-tp2',
          levelBadge: 'Penjahit Bendera',
          badgeColor: 'rose',
          iconEmoji: '🧵',
          title: 'Ibu Fatmawati',
          description:
            'Menjahit Bendera Pusaka Sang Saka Merah Putih dengan mesin jahit tangan di tengah kondisi mengandung putra sulung.',
        },
        {
          id: 'card-tp3',
          levelBadge: 'Fotografer IPPHOS',
          badgeColor: 'amber',
          iconEmoji: '📸',
          title: 'Frans & Alex Mendur',
          description:
            'Mengabadikan foto proklamasi dan mengubur klise film di bawah tanah agar tidak disita oleh tentara Jepang.',
        },
        {
          id: 'card-tp4',
          levelBadge: 'Penyelamat Naskah',
          badgeColor: 'emerald',
          iconEmoji: '📢',
          title: 'BM Diah',
          description:
            'Menyelamatkan naskah tulisan tangan asli Bung Karno dari tong sampah dan menyebarkan warta kemerdekaan lewat kantor berita.',
        },
      ],
      teacherNotes:
        'Ajak siswa merenungkan bahwa kemerdekaan Indonesia dicapai melalui kolaborasi lintas peran, dari perumus hingga juru rekam.',
    },
    {
      id: 'utsj-slide-4',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 4: TANTANGAN 1 - KRONOLOGI PROKLAMASI',
      title: 'Kronologi Detik-Detik Proklamasi Kemerdekaan 1945',
      subtitle: 'Urutkan 5 peristiwa revolusi kemerdekaan dari awal hingga pembacaan teks proklamasi:',
      items: PROKLAMASI_1945_SEQUENCE,
      instruction: 'Susun kartu peristiwa bersejarah sesuai urutan waktu terjadinya!',
      explanationOnSuccess: 'Luar biasa! Kronologi detik-detik kemerdekaan 17 Agustus 1945 tersusun runtut dan sempurna!',
      challengeKey: 'proklamasi-seq',
    },
    {
      id: 'utsj-slide-5',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 5: TANTANGAN 2 - PAHLAWAN KEMERDEKAAN',
      title: 'Pahlawan Kemerdekaan & Peran Bersejarahnya',
      subtitle: 'Hubungkan tokoh pejuang di Kolom A dengan jasa pentingnya di Kolom B:',
      columnALabel: 'Tokoh Pahlawan',
      columnBLabel: 'Peran Bersejarah bagi Republik',
      pairs: PAHLAWAN_KEMERDEKAAN_PAIRS,
      instruction: 'Jodohkan setiap tokoh dengan sumbangsih besarnya saat proklamasi!',
      explanationOnSuccess: 'Sempurna! Seluruh jasa tokoh kemerdekaan di balik layar berhasil dipasangkan tepat!',
      challengeKey: 'tokoh-pairs',
    },
    {
      id: 'utsj-slide-6',
      type: 'mini-game-flashcard',
      chapterBadge: 'BABAK 6: TANTANGAN 3 - TEKS KLAD VS OTENTIK',
      title: 'Naskah Klad Bung Karno vs Naskah Otentik Sayuti Melik',
      subtitle: 'Buka kartu aktif untuk membedakan detail naskah tulisan tangan dan ketikan:',
      cards: PROKLAMASI_FLASHCARDS,
      instruction: 'Klik kartu untuk membalik dan mempelajari rahasia redaksi naskah proklamasi!',
      challengeKey: 'sejarah-flashcards',
    },
    {
      id: 'utsj-slide-7',
      type: 'story-resolution',
      chapterBadge: 'BABAK 7: RESOLUSI KISAH',
      title: 'Sang Saka Merah Putih Berkibar di Puncak Tiang Petak 100!',
      subtitle: 'Kedaulatan Indonesia Berdiri Tegak Abadi',
      celebrationEmoji: '🇮🇩',
      reportTitle: 'Hasil Refleksi Perjuangan Kemerdekaan:',
      resolutionStory:
        'Sorak sorai "Merdeka!" membahana di seluruh pelosok nusantara! Berkat ketepatan kalian merekonstruksi linimasa sejarah dan mengenali jasa para pahlawan bangsa, Sang Saka Merah Putih berkibar di puncak tiang petak 100 kemerdekaan. Api perjuangan para pahlawan kini menyala di dalam sanubari kalian. Kalian resmi menyandang anugerah Pandu Kehormatan Pewaris Kemerdekaan Indonesia!',
      achievementBadges: [
        { label: 'Pakar Linimasa 1945', description: 'Memahami kronologi detik-detik kemerdekaan' },
        { label: 'Penghormat Pahlawan', description: 'Mengenal jasa tokoh di balik layar' },
        { label: 'Pewaris Jiwa Merdeka', description: 'Menjaga kedaulatan NKRI' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'utsj-slide-8',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 8: REFLEKSI GURU & DISKUSI KELAS',
      title: 'Nalar Kritis Kebangsaan & Bela Negara',
      subtitle: '3 Pemantik Diskusi Nalar Kritis (HOTS):',
      sparkCards: [
        {
          number: 1,
          title: 'Urgensi Peristiwa Rengasdengklok',
          question:
            'Mengapa golongan pemuda bersikeras membawa Bung Karno dan Bung Hatta ke Rengasdengklok, dan mengapa mereka menolak proklamasi dilakukan sebagai hadiah buatan Jepang?',
          badgeColor: 'rose',
        },
        {
          number: 2,
          title: 'Kompromi Luhur Pendiri Bangsa',
          question:
            'Bagaimana sikap para pendiri bangsa yang rela bermusyawarah mengubah kalimat Piagam Jakarta demi persatuan dari Sabang sampai Merauke patut kita teladani saat ini?',
          badgeColor: 'blue',
        },
        {
          number: 3,
          title: 'Mengisi Kemerdekaan Era Digital',
          question:
            'Jika para pahlawan dahulu berjuang mengangkat bambu runcing dan diplomasi pena, bagaimana bentuk perjuangan paling konkret yang harus dilakukan pelajar hari ini di era digital?',
          badgeColor: 'emerald',
        },
      ],
      victoryButtonText: '🏆 Selesai & Rayakan Kemenangan Kelas!',
    },
  ],
};

// ============================================================================
// 5. DECK: CATUR TAKTIK & LOGIKA (Problem Solving Komputasional) — 7 Slides
// ============================================================================

export const CHESS_TACTIC_PAIRS: MatchGamePair[] = [
  {
    id: 't1',
    leftText: 'Garpu (Fork)',
    rightText: 'Dua sasaran sekaligus',
  },
  {
    id: 't2',
    leftText: 'Kuncian (Pin)',
    rightText: 'Bidak terikat lindungi raja',
  },
  {
    id: 't3',
    leftText: 'Tusukan (Skewer)',
    rightText: 'Serang perwira depan',
  },
  {
    id: 't4',
    leftText: 'Skakmat Koridor',
    rightText: 'Baris belakang terperangkap',
  },
];

export const CHESS_CHECKMATE_SEQUENCE: SequenceGameItem[] = [
  {
    id: 'ca1',
    order: 1,
    label: 'Identifikasi Celah',
    iconEmoji: '🔍',
    description: 'Melihat Raja hitam di baris b8 terjebak tanpa petak pelarian udara.',
  },
  {
    id: 'ca2',
    order: 2,
    label: 'Pancingan Pengorbanan',
    iconEmoji: '🎯',
    description: 'Melakukan langkah pembuka lajur untuk menarik perwira penjaga lawan.',
  },
  {
    id: 'ca3',
    order: 3,
    label: 'Penetrasi Benteng/Ratu',
    iconEmoji: '⚡',
    description: 'Meluncurkan Ratu menusuk ke baris terdalam petak c8.',
  },
  {
    id: 'ca4',
    order: 4,
    label: 'Skakmat Mutlak',
    iconEmoji: '👑',
    description: 'Raja lawan terancam mati tanpa ada bidak kawan yang dapat menolong.',
  },
];

export const CATUR_TAKTIK_LOGIKA_DECK: PresentationDeckData = {
  gameId: 'catur-taktik-logika',
  title: 'Teka-Teki Catur: Taktik & Problem Solving',
  subtitle: 'Taktik Catur & Penalaran Logika Komputasional',
  themeColor: 'indigo',
  icon: '♟️',
  category: 'logika',
  gradeLevel: 'SD Kelas 4-6',
  subjectDetail: 'Logika / Berpikir Komputasional & Taktik Catur',
  mentor: {
    name: 'Master Utut',
    role: 'Pelatih Catur & Logika Komputasional',
    avatarEmoji: '♟️',
  },
  totalSlides: 7,
  slides: [
    {
      id: 'ctl-slide-1',
      type: 'narrative-intro',
      chapterBadge: 'BABAK 1: LABIRIN ENAM PULUH EMPAT PETAK',
      title: 'Membuka Kebuntuan Taktis di Kejuaraan Sekolah',
      subtitle: 'Analisis Posisi Kritis dan Pembalikan Keadaan Strategis',
      dialogue:
        'Salam taktik, para pemikir masa depan! Papan 64 petak catur adalah laboratorium berpikir paling murni di dunia. Tim catur sekolah kita berada di babak penentuan medali emas, namun posisi bidak Putih tampak tertekan dan terkepung oleh serangan lawan. Lawan mengira kita sudah buntu, padahal ada kombinasi motif taktis geometris tersembunyi yang bisa membalikkan keadaan dalam dua langkah presisi! Mari kita latih daya dekomposisi nalar, temukan motif taktis, dan lakukan eksekusi skakmat yang elegan!',
      missionObjective: 'Temukan motif taktis pamungkas dan eksekusi skakmat kemenangan tim sekolah',
      actionButtonText: 'Analisis Papan Catur',
    },
    {
      id: 'ctl-slide-2',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 2: MATERI INTI 1 - MOTIF TAKTIS DASAR',
      title: 'Empat Motif Taktis Catur: Senjata Geometris Pembongkar Pertahanan',
      subtitle: 'Pola-pola serangan geometris yang paling sering membalikkan posisi permainan:',
      cards: [
        {
          id: 'card-ct1',
          levelBadge: 'Garpu (Fork)',
          badgeColor: 'blue',
          iconEmoji: '♞',
          title: 'Garpu Kuda (Fork)',
          description:
            'Satu bidak (terutama Kuda karena lompatan L) menyerang dua perwira lawan sekaligus tanpa bisa dibendung perantara.',
        },
        {
          id: 'card-ct2',
          levelBadge: 'Kuncian (Pin)',
          badgeColor: 'emerald',
          iconEmoji: '🛡️',
          title: 'Kuncian Pin (The Pin)',
          description:
            'Gajah atau Benteng menembak perwira perantara lawan sehingga tidak boleh bergerak karena akan mengekspos Raja di belakangnya.',
        },
        {
          id: 'card-ct3',
          levelBadge: 'Tusukan (Skewer)',
          badgeColor: 'amber',
          iconEmoji: '🍢',
          title: 'Tusukan Sate (Skewer)',
          description:
            'Serangan garis lurus pada perwira paling berharga di depan, memaksanya menyingkir dan membiarkan perwira di belakangnya ditangkap.',
        },
        {
          id: 'card-ct4',
          levelBadge: 'Skakmat Koridor',
          badgeColor: 'rose',
          iconEmoji: '🚪',
          title: 'Skakmat Koridor (Back Rank)',
          description:
            'Benteng/Ratu menyerang Raja di baris ke-8 yang terperangkap di belakang barisan 3 pionnya sendiri tanpa celah udara (luft).',
        },
      ],
      teacherNotes:
        'Tunjukkan bagaimana motif Garpu sering mengubah kalkulasi materi seketika jika lawan tidak waspada terhadap petak garpu kuda.',
    },
    {
      id: 'ctl-slide-3',
      type: 'concept-infographic',
      chapterBadge: 'BABAK 3: MATERI INTI 2 - BERPIKIR KOMPUTASIONAL',
      title: 'Pohon Keputusan Komputasional & Hierarki Nilai Bidak',
      subtitle: 'Menerapkan dekomposisi masalah dan evaluasi bobot langkah dalam catur:',
      cards: [
        {
          id: 'card-ct5',
          levelBadge: 'Nilai Relatif',
          badgeColor: 'blue',
          iconEmoji: '💎',
          title: 'Skala Poin Perwira',
          description:
            'Pion (1), Kuda (3), Gajah (3), Benteng (5), Ratu (9), dan Raja (tak ternilai). Jangan korbankan Ratu kecuali menjamin skakmat!',
        },
        {
          id: 'card-ct6',
          levelBadge: 'Dekomposisi',
          badgeColor: 'purple',
          iconEmoji: '🌳',
          title: 'Pohon Keputusan (Branching)',
          description:
            'Kalkulasikan formula sebab-akibat: "Jika saya melangkah ke c8, respons paksaan lawan adalah... lalu langkah kemenangan saya adalah..."',
        },
        {
          id: 'card-ct7',
          levelBadge: 'Pola Masalah',
          badgeColor: 'emerald',
          iconEmoji: '🎯',
          title: 'Pengenalan Pola Lemah',
          description:
            'Mengidentifikasi petak tak terjaga (unprotected square) di sekitar perimeter Raja lawan sebelum meluncurkan kombinasi.',
        },
      ],
      teacherNotes:
        'Tekankan kepada siswa bahwa berpikir komputasional di catur sama dengan algoritma percabangan logika if-then di dunia pemrograman komputer.',
    },
    {
      id: 'ctl-slide-4',
      type: 'mini-game-match',
      chapterBadge: 'BABAK 4: TANTANGAN 1 - MOTIF TAKTIK CATUR',
      title: 'Motif Taktik Catur & Pola Serangan Geometrisnya',
      subtitle: 'Tautkan nama motif taktis di Kolom A dengan definisi polanya di Kolom B:',
      columnALabel: 'Nama Motif Taktis',
      columnBLabel: 'Karakteristik Pola Serangan',
      pairs: CHESS_TACTIC_PAIRS,
      instruction: 'Pasangkan taktik catur dengan cara kerjanya di atas papan 64 petak!',
      explanationOnSuccess: 'Tepat sekali! Seluruh 4 motif taktis pamungkas catur telah teridentifikasi sempurna!',
      challengeKey: 'chess-tactics',
    },
    {
      id: 'ctl-slide-5',
      type: 'mini-game-sequence',
      chapterBadge: 'BABAK 5: TANTANGAN 2 - ALGORITMA SKAKMAT',
      title: 'Algoritma Rantai Kombinasi Eksekusi Skakmat',
      subtitle: 'Susun langkah algoritma logis untuk menuntaskan kombinasi skakmat presisi:',
      items: CHESS_CHECKMATE_SEQUENCE,
      instruction: 'Urutkan tahapan kalkulasi serangan mulai dari analisis celah hingga skakmat mutlak!',
      explanationOnSuccess: 'Brilian! Rantai algoritma kombinasi eksekusi catur tersusun logis tanpa celah!',
      challengeKey: 'chess-algo',
    },
    {
      id: 'ctl-slide-6',
      type: 'story-resolution',
      chapterBadge: 'BABAK 6: RESOLUSI KISAH',
      title: 'Skakmat Sempurna, Medali Emas untuk Sekolah!',
      subtitle: 'Kemenangan Manis Logika dan Ketenangan Pikiran',
      celebrationEmoji: '🏆',
      reportTitle: 'Hasil Pertandingan Catur Sekolah:',
      resolutionStory:
        'Plak! Bidak mendarat di petak c8 dengan presisi mutlak! Jam catur berhenti berdetak, lawan mengulurkan tangan dengan takzim mengakui kekalahan. Kemenangan skakmat presisi dan medali emas kejuaraan catur sekolah diraih berkat ketajaman kalkulasi dekomposisi komputasional kalian. Kalian telah membuktikan bahwa strategi dan ketenangan mengalahkan kekuatan semata. Terimalah gelar kehormatan Grandmaster Cilik & Ahli Logika Komputasional!',
      achievementBadges: [
        { label: 'Pakar Taktik Catur', description: 'Menguasai 4 motif taktis dasar' },
        { label: 'Pemikir Algoritmik', description: 'Kalkulasi langkah berantai multi-cabang' },
        { label: 'Medali Emas Logika', description: 'Penyelamat kemenangan tim sekolah' },
      ],
      actionButtonText: 'Buka Lembar Diskusi Guru & Refleksi',
    },
    {
      id: 'ctl-slide-7',
      type: 'reflection-spark',
      chapterBadge: 'BABAK 7: REFLEKSI GURU & DISKUSI KELAS',
      title: 'Penerapan Logika Catur dalam Pengambilan Keputusan Hidup',
      subtitle: '3 Pemantik Diskusi Nalar Kritis (HOTS):',
      sparkCards: [
        {
          number: 1,
          title: 'Prinsip Tanggung Jawab Keputusan',
          question:
            'Dalam catur ada aturan "bidak yang dipegang harus dijalankan" (touch-move). Bagaimana aturan ini melatih kita bertanggung jawab atas setiap perkataan dan tindakan dalam hidup?',
          badgeColor: 'indigo',
        },
        {
          number: 2,
          title: 'Kalkulasi Jangka Panjang',
          question:
            'Bagaimana kebiasaan menghitung 2-3 langkah ke depan sebelum bertindak di papan catur dapat mencegah kita dari perilaku tergesa-gesa atau emosional dalam pergaulan?',
          badgeColor: 'blue',
        },
        {
          number: 3,
          title: 'Konsep Pengorbanan Taktis',
          question:
            'Mengapa dalam catur seorang pemain rela mengorbankan perwira berharga (seperti Ratu) demi mencapai tujuan yang lebih besar (skakmat)? Apa padanan analoginya dalam perjuangan belajar sehari-hari?',
          badgeColor: 'emerald',
        },
      ],
      victoryButtonText: '🏆 Selesai & Rayakan Kemenangan Kelas!',
    },
  ],
};

// ============================================================================
// 6. MASTER REGISTRY EXPORT: HUMANITIES_PRESENTATION_DECKS
// ============================================================================

export const HUMANITIES_PRESENTATION_DECKS: Record<string, PresentationDeckData> = {
  'ular-tangga-matematika': ULAR_TANGGA_MATEMATIKA_DECK,
  'point-click-candi': POINT_CLICK_CANDI_DECK,
  'teka-teki-kata': TEKA_TEKI_KATA_DECK,
  'ular-tangga-sejarah': ULAR_TANGGA_SEJARAH_DECK,
  'catur-taktik-logika': CATUR_TAKTIK_LOGIKA_DECK,
};
