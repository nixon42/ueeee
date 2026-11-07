import { GameItem } from '../types/game';

export const GAMES_CATALOG: GameItem[] = [
  {
    id: 'ular-tangga-sains',
    title: 'Petualangan Sains: Ekspedisi Daur Air',
    subtitle: 'Selamatkan mata air Lembah Cendrawasih lewat pemahaman daur air dan fotosintesis!',
    description: 'Ekspedisi sains interaktif bersama Kak Galih! Amati infografis hidrologi beranimasi loop, selesaikan rekonstruksi 4 tahap daur air, dan pelajari fotosintesis untuk menyelamatkan mata air pegunungan.',
    type: 'ular-tangga',
    category: 'sains',
    gradeLevel: 'SD Kelas 4-6',
    badge: 'Paling Populer',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    accentColor: '#f97316',
    gradient: 'from-orange-500 via-rose-500 to-pink-500',
    iconName: 'Compass',
    playTimeMinutes: 10,
    featured: true,
    subjectDetail: 'IPA / Daur Air & Keseimbangan Ekosistem',
    rating: 4.9,
    playsCount: 2480,
    hasStoryPresentation: true,
    presentationDeckId: 'ular-tangga-sains',
    slideCount: 7,
    mentorName: 'Kak Galih',
    tags: [
      'sains', 'ipa', 'daur air', 'hidrologi', 'fotosintesis', 
      'ekosistem', 'lembah cendrawasih', 'petualangan alam', 'kak galih'
    ],
    prolog: {
      story: 'Bersama Kak Galih (Penjelajah Rimba), kamu memulai ekspedisi ilmiah ke hulu sungai Lembah Cendrawasih. Aliran mata air pegunungan mulai surut dan dedaunan hutan menguning karena daur hidrologi terganggu. Misimu adalah merekonstruksi siklus air 4 tahap, memahami fotosintesis, dan menyelamatkan ekosistem lembah!',
      learningGoals: [
        'Memahami 4 tahapan daur air sempurna (Evaporasi, Kondensasi, Presipitasi, dan Infiltrasi).',
        'Menganalisis fotosintesis daun, penyerapan CO2 oleh stomata, dan pelepasan oksigen segar O2.',
        'Mempelajari peran penting tutupan hutan dan akar pohon dalam menjaga cadangan mata air tanah.',
        'Menghubungkan transformasi energi surya menjadi energi kimia bagi kelestarian rantai makanan.'
      ],
      howToPlay: [
        'Simak arahan ekspedisi dari Kak Galih di setiap babak presentasi interaktif.',
        'Amati bagan infografis hidrologi beranimasi loop untuk melihat pergerakan molekul H2O.',
        'Selesaikan tantangan urutan daur air dan cocokkan transformasi energi alam.',
        'Pelajari ulasan mendalam Kak Galih tentang evaporasi, kondensasi, presipitasi, dan infiltrasi.'
      ],
      rules: [
        'Ikuti alur slide presentasi secara runtut atau navigasikan via titik progress di bawah.',
        'Pada tantangan urutan daur air, geser kartu hingga urutan alaminya 100% tepat.',
        'Gunakan tombol "Layar Penuh" untuk tampilan maksimal saat belajar di kelas.',
        'Tuntaskan seluruh babak ekspedisi untuk merayakan kembalinya mata air Lembah Cendrawasih!'
      ]
    }
  },
  {
    id: 'point-click-lab',
    title: 'Petualangan Sains: Investigasi Forensik Lab Kimia',
    subtitle: 'Pecahkan anomali reaktor, kuasai protokol K3, uji lakmus pH, & terapkan metode ilmiah!',
    description: 'Petualangan sains forensik interaktif bersama Dr. Maya Arisandi, M.Sc.! Selidiki anomali kebocoran reaktor Unit 04, kuasai regulasi keselamatan K3, kalibrasi derajat keasaman pH 0-14, dan buktikan hipotesis lewat titrasi netralisasi.',
    type: 'point-and-click',
    category: 'sains',
    gradeLevel: 'SMP',
    accentColor: '#0d9488',
    gradient: 'from-teal-500 via-emerald-500 to-cyan-500',
    iconName: 'FlaskConical',
    playTimeMinutes: 10,
    featured: true,
    subjectDetail: 'IPA Kimia & Biologi Eksperimental (SMP Kelas 7)',
    rating: 4.9,
    playsCount: 2180,
    hasStoryPresentation: true,
    presentationDeckId: 'point-click-lab',
    slideCount: 8,
    mentorName: 'Dr. Maya Arisandi, M.Sc.',
    tags: [
      'lab sains', 'sains', 'kimia', 'forensik', 'k3', 'asam basa',
      'derajat ph', 'metode ilmiah', 'dr maya', 'eksperimen', 'titrasi'
    ],
    prolog: {
      story: 'Sirine darurat berbunyi di Laboratorium Forensik Kimia-Biologi Unit 04! Reaktor utama mendeteksi anomali larutan kimia misterius dengan lonjakan keasaman ekstrem yang berisiko merusak instrumen analitis. Bersama Dr. Maya Arisandi, M.Sc., kamu dipanggil sebagai peneliti forensik muda untuk mengamankan laboratorium. Sebelum menetralkan tangki reaktor, kamu harus menguasai standar keselamatan K3, memahami skala derajat pH 0-14, dan menerapkan 5 langkah metode ilmiah secara presisi!',
      learningGoals: [
        'Menerapkan 5 tahapan metode ilmiah secara sistematis (Observasi, Rumusan Masalah, Hipotesis, Eksperimen Terkontrol, dan Kesimpulan).',
        'Mengidentifikasi standar keselamatan kerja K3 laboratorium serta arti piktogram bahaya GHS (Korosif, Toksik, Mudah Menyala, dan Eksplosif).',
        'Menganalisis sifat larutan berdasarkan skala derajat keasaman (pH 0-14), dari asam kuat, titik netral pH 7.00, hingga basa kuat.',
        'Menguasai prinsip pengujian larutan menggunakan indikator kertas lakmus merah dan biru serta reaksi titrasi netralisasi asam-basa.'
      ],
      howToPlay: [
        'Simak arahan misi darurat dari Dr. Maya Arisandi pada slide pembuka presentasi interaktif.',
        'Pelajari infografis keselamatan K3, alat pelindung diri (APD), dan skala derajat pH keasaman larutan.',
        'Selesaikan mini-game menjodohkan simbol bahaya K3, susun urutan 5 langkah metode ilmiah, dan balik kartu uji indikator lakmus.',
        'Diskusikan pertanyaan pemantik HOTS seputar hujan asam, etika data ilmiah, dan indikator alami bersama guru dan teman sekelas.'
      ],
      rules: [
        'Ikuti alur slide investigasi secara bertahap atau navigasikan langsung via titik indikator di bagian bawah.',
        'Pada tantangan simbol K3, pasangkan 4 piktogram bahaya dengan karakteristik resiko yang tepat.',
        'Pada tantangan metode ilmiah, seret dan posisikan kartu hingga urutan tahapan penalaran ilmiah 100% tepat.',
        'Pada tantangan indikator lakmus, balik kartu untuk menguji daya ingat aktif analisis asam-basa.',
        'Reaktor Unit 04 berhasil dinetralkan saat pH 7.00 tercapai dan seluruh 8 babak investigasi forensik selesai!'
      ]
    }
  },
  {
    id: 'ular-tangga-matematika',
    title: 'Ular Tangga: Master Berhitung Cepat',
    subtitle: 'Lompat ke puncak dengan menguasai perkalian, pecahan, dan logika!',
    description: 'Setiap dadu dilempar, pemain yang berhenti di petak kuis harus menghitung cepat operasi matematika, pecahan desimal, perkalian, dan geometri untuk mengamankan langkah bonus.',
    type: 'ular-tangga',
    category: 'matematika',
    gradeLevel: 'SD Kelas 4-6',
    badge: 'Matematika Seru',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    accentColor: '#2563eb',
    gradient: 'from-blue-600 via-indigo-500 to-cyan-400',
    iconName: 'Calculator',
    playTimeMinutes: 12,
    subjectDetail: 'Aritmatika, Geometri, Pecahan',
    rating: 4.8,
    playsCount: 1620,
    hasStoryPresentation: true,
    presentationDeckId: 'ular-tangga-matematika',
    slideCount: 7,
    mentorName: 'Kak Arya',
    tags: [
      'matematika', 'pecahan', 'hitung cepat', 'perkalian', 'pembagian', 
      'aritmatika', 'geometri', 'angka', 'ular tangga'
    ],
    prolog: {
      story: 'Selamat datang di Arena Angka! Di arena ini, matematika bukan hafalan rumus yang membosankan, melainkan kunci rahasia untuk memanjat tangga dan menghindari jebakan ular angka menuju petak 100.',
      learningGoals: [
        'Meningkatkan kecepatan mental math (hitung cepat perkalian 1-10 dan pembagian).',
        'Menguasai konsep pecahan sederhana (1/2, 1/4, 3/4) dan operasi penjumlahan pecahan senilai.',
        'Mengenal sifat bangun datar (persegi, segitiga, lingkaran, luas & keliling).',
        'Melatih logika numerik serta estimasi angka dalam kehidupan sehari-hari.'
      ],
      howToPlay: [
        'Lempar dadu untuk menjalankan pion di atas papan petak angka berurutan 1 sampai 100.',
        'Saat menginjak petak tantangan, hitung soal matematika dengan cermat.',
        'Pilih salah satu dari 4 opsi jawaban sebelum waktu berpikir berakhir.',
        'Mainkan bersama teman sekelas atau tanding melawan Bot Teman Belajar.'
      ],
      rules: [
        'Jawaban benar di petak tangga langsung memindahkan pionmu ke petak yang lebih tinggi.',
        'Jawaban salah saat menginjak petak ular mengharuskan pion merosot ke petak ekor.',
        'Tersedia statistik kuis benar/total untuk mengevaluasi akurasi berhitung siswa.',
        'Pemenang adalah pemain pertama yang berhasil mendarat di petak 100.'
      ]
    }
  },
  {
    id: 'point-click-candi',
    title: 'Point & Click: Candi Borobudur & Relief Nusantara',
    subtitle: 'Eksplorasi situs Candi Borobudur dan temukan jejak peradaban masa lalu.',
    description: 'Jelajahi relief Candi Borobudur batu andesit, stupa, dan museum virtual. Klik perahu bercadik Borobudur, terjemahkan prasasti kuno, dan pelajari kebesaran Sriwijaya serta Kerajaan Majapahit.',
    type: 'point-and-click',
    category: 'sejarah',
    gradeLevel: 'SMP',
    badge: 'Budaya & Sejarah',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    accentColor: '#e11d48',
    gradient: 'from-rose-500 via-pink-600 to-purple-600',
    iconName: 'Landmark',
    playTimeMinutes: 12,
    subjectDetail: 'Sejarah Nasional & Arkeologi',
    rating: 4.9,
    playsCount: 1350,
    hasStoryPresentation: true,
    presentationDeckId: 'point-click-candi',
    slideCount: 8,
    mentorName: 'Paman Dewa',
    tags: [
      'candi borobudur', 'borobudur', 'candi', 'candiborobudur', 'relief', 
      'sejarah', 'nusantara', 'kerajaan majapahit', 'majapahit', 'sriwijaya', 
      'prasasti', 'arkeologi', 'point and click'
    ],
    prolog: {
      story: 'Matahari terbit menyinari bukit Menoreh dan memancarkan keagungan Candi Borobudur. Kamu menjadi kurator muda yang meneliti batu andesit abad ke-8 Masehi pada masa Dinasti Syailendra. Temukan ukiran relief perahu cadik legendaris dan prasasti yang merekam kejayaan bahari Nusantara!',
      learningGoals: [
        'Mengenal sejarah pembangunan Candi Borobudur pada masa Dinasti Syailendra abad ke-8 Masehi.',
        'Memahami makna relief perahu bercadik ganda sebagai bukti ketangguhan maritim Nusantara kuno.',
        'Menganalisis arsitektur candi: Kamadhatu, Rupadhatu, Arupadhatu, dan stupa berongga.',
        'Meneladani nilai gotong royong dan toleransi kebudayaan leluhur bangsa Indonesia.'
      ],
      howToPlay: [
        'Arahkan pandangan ke dinding teras relief batu candi dan teras bundar stupa.',
        'Klik bagian relief yang berkilau (Perahu Cadik, Stupa Puncak, Prasasti Batu, Arca Buddha).',
        'Jawab pertanyaan arkeologis untuk menerjemahkan kisah relief ke dalam jurnal ekspedisimu.',
        'Buka diagram ilmiah untuk menelaah visual anatomi perahu kuno dan aksara prasasti.'
      ],
      rules: [
        'Kumpulkan 4 peninggalan bersejarah penting di area Candi Borobudur.',
        'Artefak akan otomatis tersimpan di Tas Ekspedisi Siswa setelah kuis terjawab tepat.',
        'Gunakan petunjuk sejarah jika menemui istilah sejarah yang menantang.',
        'Eksplorasi selesai saat seluruh relief berhasil dianalisis secara komprehensif.'
      ]
    }
  },
  {
    id: 'point-click-hutan',
    title: 'Point & Click: Ekspedisi Satwa Endemik',
    subtitle: 'Jelajah kanopi hutan hujan tropis & konservasi biodiversitas.',
    description: 'Amati Orangutan Sumatera, tarian Burung Cendrawasih Papua, dan naga purba Komodo di habitat aslinya dengan teropong lapangan. Pelajari ekosistem dan fotosintesis hutan.',
    type: 'point-and-click',
    category: 'sains',
    gradeLevel: 'SD Kelas 4-6',
    badge: 'Konservasi Alam',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentColor: '#059669',
    gradient: 'from-emerald-600 via-teal-600 to-green-600',
    iconName: 'Trees',
    playTimeMinutes: 10,
    subjectDetail: 'Biologi Lingkungan & Biodiversitas',
    rating: 4.9,
    playsCount: 1470,
    hasStoryPresentation: true,
    presentationDeckId: 'point-click-hutan',
    slideCount: 8,
    mentorName: 'Ranger Banyu',
    tags: [
      'satwa endemik', 'hutan', 'hewan', 'fauna', 'orangutan', 
      'cendrawasih', 'komodo', 'biodiversitas', 'fotosintesis', 
      'konservasi', 'biologi', 'point and click'
    ],
    prolog: {
      story: 'Sebagai relawan konservasi alam di kawasan Garis Wallacea Indonesia, kamu bertugas mendokumentasikan satwa langka dan keanekaragaman flora hutan hujan tropis. Jaga kelestarian habitat tanpa mengusik ketenangan satwa di kanopi rimba!',
      learningGoals: [
        'Mengenal satwa endemik Indonesia: Orangutan (Sumatera/Kalimantan), Cendrawasih (Papua), Komodo (NTT).',
        'Memahami pembagian fauna Indonesia berdasarkan Garis Wallace dan Garis Weber.',
        'Mempelajari peran hutan hujan tropis sebagai paru-paru dunia dan penjaga siklus air.',
        'Menumbuhkan kesadaran pelestarian lingkungan hidup dan pencegahan deforestasi.'
      ],
      howToPlay: [
        'Gunakan viewfinder teropong observasi untuk memindai tajuk pohon hutan hujan.',
        'Klik satwa dan tumbuhan unik yang kamu temukan di antara rimbunnya dedaunan.',
        'Pecahkan kuis ekologi untuk mencatat rekaman suara dan data biologi satwa ke tas ekspedisi.',
        'Pelajari fakta edukasi seputar perilaku alami dan status konservasi tiap spesies.'
      ],
      rules: [
        'Identifikasi 4 satwa dan flora endemik yang menjadi target observasi hutan.',
        'Setiap jawaban yang benar menganugerahkan sampel observasi virtual.',
        'Tersedia fitur audio efek alam untuk merasakan atmosfer hutan rimba yang autentik.',
        'Misi ekspedisi tuntas jika semua satwa tercatat dalam kondisi habitat lestari.'
      ]
    }
  },
  {
    id: 'ular-tangga-tatasurya',
    title: 'Petualangan Sains: Tata Surya & Gravitasi',
    subtitle: 'Jelajahi orbit 8 planet, sabuk asteroid, dan rahasia gravitasi gerhana bersama Kapten Dirgantara!',
    description: 'Misi antariksa interaktif bersama Kapten Dirgantara! Amati infografis tata surya beranimasi, susun urutan 8 planet, cocokkan karakteristik benda langit, dan pecahkan geometri gerhana matahari.',
    type: 'ular-tangga',
    category: 'sains',
    gradeLevel: 'SD Kelas 4-6',
    accentColor: '#7c3aed',
    gradient: 'from-purple-600 via-indigo-600 to-violet-800',
    iconName: 'Rocket',
    playTimeMinutes: 12,
    subjectDetail: 'IPA / Tata Surya & Gravitasi (SD Kelas 6)',
    rating: 4.8,
    playsCount: 1810,
    hasStoryPresentation: true,
    presentationDeckId: 'ular-tangga-tatasurya',
    slideCount: 8,
    mentorName: 'Kapten Dirgantara',
    tags: [
      'tata surya', 'tatasurya', 'gravitasi', 'planet', 'astronomi', 'antariksa', 
      'roket', 'mars', 'jupiter', 'saturnus', 'bumi', 'matahari', 
      'gerhana', 'kapten dirgantara', 'ekspedisi orbit'
    ],
    prolog: {
      story: 'Bersama Kapten Dirgantara (Astro-Komandan Misi Dirgantara), kamu memimpin peluncuran wahana riset Garuda Orbital menjelajahi batas tata surya. Dari orbit terdekat Merkurius yang membara, menerobos sabuk batuan asteroid, menembus cincin es Saturnus, hingga mendarat di Stasiun Antariksa Sabuk Kuiper. Misimu adalah menghitung orbit presisi 8 planet, mengidentifikasi karakteristik benda langit, dan memecahkan geometri gerhana matahari!',
      learningGoals: [
        'Memahami pembagian dan urutan 8 planet tata surya (Planet Dalam & Luar) dari Merkurius hingga Neptunus.',
        'Menganalisis peran Matahari sebagai pusat gravitasi yang mengikat pergerakan revolusi seluruh tata surya.',
        'Membedakan karakteristik unik benda antariksa: Planet, Satelit alami, Komet, Asteroid, dan Meteoroid.',
        'Menguasai geometri kesejajaran tiga benda langit pada peristiwa Gerhana Matahari Total dan Gerhana Bulan.'
      ],
      howToPlay: [
        'Simak arahan misi antariksa dari Kapten Dirgantara pada pembuka slide presentasi interaktif.',
        'Amati bagan infografis sistem tata surya dan mekanika orbit untuk mengenali ciri khas masing-masing planet.',
        'Selesaikan tantangan urutan 8 planet, hubungkan karakteristik benda antariksa, dan susun geometri gerhana matahari.',
        'Pelajari pertanyaan pemantik HOTS astronomi bersama guru dan teman sekelas untuk memperdalam diskusi ilmiah.'
      ],
      rules: [
        'Ikuti alur slide ekspedisi secara runtut atau navigasikan langsung via titik progress di bagian bawah.',
        'Pada tantangan urutan orbit planet dan geometri gerhana, geser kartu hingga urutan posisi 100% presisi.',
        'Pada tantangan menjodohkan karakteristik antariksa, klik kartu di Kolom A lalu hubungkan dengan pasangannya di Kolom B.',
        'Gunakan tombol Mode Layar Penuh (Fullscreen) untuk kenyamanan pandangan proyektor kelas atau tablet.',
        'Tuntaskan seluruh 8 slide ekspedisi hingga Garuda Orbital sukses mendarat di Stasiun Sabuk Kuiper!'
      ]
    }
  },
  {
    id: 'teka-teki-kata',
    title: 'Teka-Teki: Susun Kata & Rumus Sains',
    subtitle: 'Game interaktif susun huruf, istilah ilmiah, dan sinonim kata.',
    description: 'Susun huruf acak menjadi istilah sains, rumus, fotosintesis, gravitasi, dan kosakata baku bahasa Indonesia. Dapatkan skor streak dan buka lencana peneliti!',
    type: 'puzzle',
    category: 'bahasa',
    gradeLevel: 'SMP',
    badge: 'Asah Otak',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    accentColor: '#0d9488',
    gradient: 'from-teal-600 via-cyan-600 to-blue-600',
    iconName: 'BookOpen',
    playTimeMinutes: 6,
    subjectDetail: 'Kosakata, Bahasa & Istilah Ilmiah',
    rating: 4.7,
    playsCount: 980,
    hasStoryPresentation: true,
    presentationDeckId: 'teka-teki-kata',
    slideCount: 7,
    mentorName: 'Ibu Kartika',
    tags: [
      'teka teki', 'teka-teki', 'puzzle', 'susun kata', 'kata', 
      'bahasa', 'bahasa indonesia', 'istilah sains', 'asah otak', 'logika'
    ],
    prolog: {
      story: 'Pusat arsip kosakata ilmiah sedang teracak! Rangkai kembali kepingan huruf alfabet yang berserakan menjadi istilah baku sains, kosakata bahasa Indonesia, dan rumus ilmiah yang tersembunyi di balik petunjuk definisi.',
      learningGoals: [
        'Meningkatkan perbendaharaan kosakata sains dan istilah ilmiah kurikulum SMP-SMA.',
        'Melatih ketepatan ejaan bahasa Indonesia baku (EYD/PUEBI).',
        'Mengembangkan daya analisis deduktif berdasarkan petunjuk definisi konsep.',
        'Melatih ketangkasan mengetik keyboard alfabet (A-Z) secara interaktif.'
      ],
      howToPlay: [
        'Baca petunjuk definisi materi sains/sejarah yang tertera di bagian atas layar.',
        'Ketik huruf langsung dari keyboard fisikmu atau klik kepingan huruf acak yang tersedia.',
        'Gunakan tombol [Backspace] untuk menghapus huruf jika ingin memperbaiki ejaan.',
        'Manfaatkan tombol "Petunjuk" jika membutuhkan bantuan pembuka huruf pertama.'
      ],
      rules: [
        'Menyusun kata dengan benar langsung menambah +100 poin dan mempertahankan kombo streak.',
        'Tidak ada penalti batas waktu terburu-buru, kamu bisa berpikir santai dan tenang.',
        'Fitur petunjuk dapat digunakan 1 kali per babak teka-teki.',
        'Selesaikan seluruh susunan teka-teki kata untuk meraih gelar Juara Cendekiawan Kata.'
      ]
    }
  },
  {
    id: 'ular-tangga-sejarah',
    title: 'Ular Tangga: Lintasan Sejarah Indonesia',
    subtitle: 'Mengarungi linimasa dari zaman prasasti hingga kemerdekaan.',
    description: 'Setiap tangga melambangkan peristiwa persatuan dan perjuangan bangsa, Kerajaan Majapahit, Sriwijaya, sedangkan ular melambangkan tantangan sejarah yang harus diatasi dengan persatuan.',
    type: 'ular-tangga',
    category: 'sejarah',
    gradeLevel: 'SD Kelas 4-6',
    badge: 'Nasionalisme',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    accentColor: '#dc2626',
    gradient: 'from-red-600 via-orange-600 to-amber-600',
    iconName: 'Landmark',
    playTimeMinutes: 14,
    subjectDetail: 'Perjalanan Sejarah Bangsa',
    rating: 4.8,
    playsCount: 1120,
    hasStoryPresentation: true,
    presentationDeckId: 'ular-tangga-sejarah',
    slideCount: 8,
    mentorName: 'Kak Satria',
    tags: [
      'sejarah', 'sejarah indonesia', 'kerajaan majapahit', 'majapahit', 
      'kemerdekaan', 'pahlawan', 'prasasti', 'proklamasi', 'ular tangga'
    ],
    prolog: {
      story: 'Buka lembaran babad Nusantara! Ikuti tapak tilas para pahlawan dan tokoh bangsa mengarungi samudera persatuan dari kejayaan maritim Sriwijaya, Sumpah Palapa Majapahit, Kebangkitan Nasional 1908, hingga detik proklamasi kemerdekaan 17 Agustus 1945.',
      learningGoals: [
        'Memetakan kronologi linimasa sejarah peradaban kerajaan kuno hingga proklamasi kemerdekaan RI.',
        'Memahami peristiwa penting: Sumpah Pemuda 1928, Perumusan Pancasila oleh BPUPKI, dan Rengasdengklok.',
        'Mengenal jasa dan nilai kepahlawanan tokoh-tokoh perintis kemerdekaan Indonesia.',
        'Menumbuhkan rasa bangga dan nasionalisme terhadap keberagaman Bhinneka Tunggal Ika.'
      ],
      howToPlay: [
        'Lempar dadu untuk menggerakkan pion perjuangan menyusuri linimasa 100 petak sejarah.',
        'Saat singgah di petak peristiwa penting, jawab soal kuis sejarah nasional.',
        'Pilih opsi jawaban yang tepat untuk membuktikan pemahaman sejarahmu.',
        'Bermain secara santai bersama rekan atau uji kemampuanmu melawan bot.'
      ],
      rules: [
        'Tangga Perjuangan: Menjawab kuis sejarah dengan benar meloncatkan pion ke era kemajuan berikutnya.',
        'Ular Konflik / Kolonial: Jawaban yang keliru pada petak ular membuat pion mundur ke masa perjuangan sebelumnya.',
        'Kuis bonus menguji pengetahuan tokoh pahlawan dan dokumen bersejarah nasional.',
        'Pemain yang pertama kali menginjak petak 100 mengibarkan Sang Saka Merah Putih tanda kemerdekaan.'
      ]
    }
  },
  {
    id: 'catur-taktik-logika',
    title: 'Teka-Teki Catur & Taktik Logika',
    subtitle: 'Asah pola pikir kritis, kalkulasi geometris, dan pemecahan masalah.',
    description: 'Engine catur super mulus berstandar 60 FPS dengan grafis vektor SVG tajam. Pecahkan taktik garpu kuda, skakmat koridor, kuncian gajah, dan tusukan sate dengan umpan balik instan.',
    type: 'puzzle',
    category: 'logika',
    gradeLevel: 'SD Kelas 4-6',
    badge: 'Engine 60 FPS',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentColor: '#059669',
    gradient: 'from-emerald-600 via-teal-600 to-green-700',
    iconName: 'Crown',
    playTimeMinutes: 8,
    featured: true,
    subjectDetail: 'Catur, Strategi & Logika Komputasional',
    rating: 5.0,
    playsCount: 3120,
    hasStoryPresentation: true,
    presentationDeckId: 'catur-taktik-logika',
    slideCount: 7,
    mentorName: 'Master Utut',
    tags: [
      'catur', 'chess', 'taktik catur', 'logika', 'skakmat', 
      'garpu kuda', 'puzzle', 'asah otak', 'strategi', 'problem solving'
    ],
    prolog: {
      story: 'Papan catur adalah laboratorium berpikir terbaik di dunia! Kuasai strategi para grandmaster untuk menganalisis kelemahan lawan, menghitung langkah ke depan, dan menemukan pola geometris tersembunyi yang menentukan kemenangan.',
      learningGoals: [
        'Melatih pemikiran komputasional dan kalkulasi sebab-akibat multi-langkah.',
        'Mengenal taktik fundamental catur: Skakmat Koridor (Back Rank), Garpu (Fork), Kuncian (Pin), dan Tusukan (Skewer).',
        'Mengembangkan konsentrasi, ketenangan berpikir, dan daya analisis spasial.',
        'Memahami konsep perlindungan bidak dan koordinasi antar perwira.'
      ],
      howToPlay: [
        'Amati posisi papan catur dan temukan langkah taktis terbaik untuk Putih.',
        'Gerakkan bidak menggunakan Drag & Drop (seret dan lepas) atau Click-to-Move (klik bidak lalu klik petak tujuan).',
        'Titik lingkaran abu-abu akan memandu petak-petak gerak yang sah.',
        'Jika ragu, gunakan tombol "Petunjuk" untuk mendapatkan arahan konseptual dari guru.'
      ],
      rules: [
        'Langkah benar langsung mengeksekusi taktik dan memicu respon balasan otomatis dari bot.',
        'Jika melangkah keliru, petak akan menyala merah dengan ikon (X) dan penjelasan mengapa langkah tersebut belum tepat.',
        'Gunakan tombol "Coba Lagi" untuk mengulang posisi tanpa penalti.',
        'Selesaikan seluruh rangkaian taktik untuk meraih gelar Grandmaster Logika Cilik.'
      ]
    }
  },
  {
    id: 'presentasi-ekosistem-hutan',
    title: 'Presentasi Interaktif: Ekspedisi Hutan Tropis',
    subtitle: 'Alur presentasi cerita dengan mini-game urutan langkah & jodohkan pasangan Canva.',
    description: 'Format presentasi interaktif kelas: diawali kisah narasi petualangan Prof. Maya, dilanjutkan infografis materi fotosintesis, dan mini-game Canva Sequence serta Match Pairs untuk menggantikan kuis biasa.',
    type: 'point-and-click',
    category: 'sains',
    gradeLevel: 'SD Kelas 4-6',
    badge: 'Format Slide Interaktif',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentColor: '#059669',
    gradient: 'from-emerald-600 via-teal-600 to-green-700',
    iconName: 'Presentation',
    playTimeMinutes: 12,
    featured: true,
    subjectDetail: 'Biologi, Fotosintesis & Rantai Makanan Tropis',
    rating: 5.0,
    playsCount: 3820,
    hasStoryPresentation: true,
    presentationDeckId: 'presentasi-ekosistem-hutan',
    slideCount: 7,
    mentorName: 'Prof. Maya Arisandi',
    tags: [
      'presentasi', 'slide interaktif', 'canva', 'sequence', 'match pairs', 
      'fotosintesis', 'ekosistem', 'rantai makanan', 'hutan', 'sains'
    ],
    prolog: {
      story: 'Bosan dengan presentasi slide yang pasif dan kuis pilihan ganda yang monoton? Masuki era presentasi interaktif bercerita! Bergabunglah dalam tim ekspedisi Prof. Maya untuk memecahkan misteri rantai energi pohon ara purba di pedalaman hutan tropis.',
      learningGoals: [
        'Memahami tahapan berurutan proses fotosintesis tumbuhan dan pertukaran gas.',
        'Mengidentifikasi relasi peran produsen, konsumen herbivora/karnivora, dan dekomposer.',
        'Mengembangkan keterampilan menyusun tahapan algoritmik (Sequence ordering).',
        'Mendorong partisipasi aktif kelas melalui diskusi pemantik nalar kritis guru.'
      ],
      howToPlay: [
        'Buka slide presentasi bersama guru di layar proyektor kelas.',
        'Simak narasi misi pada Slide 1, lalu pelajari intisari konsep pada Slide 2.',
        'Selesaikan Tantangan 1: Geser kartu urutan fotosintesis (Sequence Game) di Slide 3.',
        'Selesaikan Tantangan 2: Tarik garis pasangkan komponen ekosistem (Match Pairs) di Slide 4.',
        'Saksikan kelanjutan cerita dan diskusikan kartu refleksi kelas di Slide 5 & 6.'
      ],
      rules: [
        'Setiap tantangan mini-game dapat diselesaikan bersama-sama secara kolaboratif.',
        'Gunakan tombol "Periksa Urutan" dan "Periksa Pasangan" untuk mendapatkan feedback instan.',
        'Tombol Acak Ulang dan Reset Garis dapat digunakan tanpa penalti skor.',
        'Selesaikan seluruh slide untuk membuka trofi Cendekiawan Konservasi Hutan Tropis.'
      ]
    }
  },
];
