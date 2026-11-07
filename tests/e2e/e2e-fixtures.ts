import { GAMES_CATALOG } from '../../src/data/games-catalog';
import { GameItem } from '../../src/types/game';

export interface AuthoritativeGameSpec {
  gameId: string;
  expectedTitle: string;
  category: 'sains' | 'matematika' | 'sejarah' | 'bahasa' | 'logika';
  gradeLevel: string;
  mentorName: string;
  mentorRole: string;
  slideCount: number;
  learningTopics: string[];
  miniGames: Array<{
    type: 'sequence' | 'match' | 'flashcards' | 'board' | 'chess' | 'word';
    title: string;
    itemCount: number;
  }>;
  resolutionImpact: string;
  reflectionHotsCount: number;
}

/**
 * Authoritative Master Specifications for all 10 educational games
 * Derived from ORIGINAL_REQUEST.md, Kemendikbudristek Kurikulum Merdeka guidelines,
 * and PROJECT.md pedagogical blueprints.
 */
export const AUTHORITATIVE_GAMES_SPEC: Record<string, AuthoritativeGameSpec> = {
  'ular-tangga-sains': {
    gameId: 'ular-tangga-sains',
    expectedTitle: 'Petualangan Sains: Ekspedisi Daur Air',
    category: 'sains',
    gradeLevel: 'SD Kelas 4-6',
    mentorName: 'Kak Galih',
    mentorRole: 'Penjelajah Rimba',
    slideCount: 7,
    learningTopics: ['Siklus Air (Hidrologi)', 'Fotosintesis Tumbuhan', 'Aliran Energi'],
    miniGames: [
      { type: 'sequence', title: 'Rekonstruksi Siklus Air Sempurna', itemCount: 4 },
      { type: 'match', title: 'Transformasi Energi di Alam', itemCount: 4 }
    ],
    resolutionImpact: 'Mata air pegunungan kembali memancar jernih dan sawah warga terairi',
    reflectionHotsCount: 3
  },
  'point-click-lab': {
    gameId: 'point-click-lab',
    expectedTitle: 'Petualangan Sains: Investigasi Forensik Lab Kimia',
    category: 'sains',
    gradeLevel: 'SMP Kelas 7',
    mentorName: 'Dr. Maya Arisandi, M.Sc.',
    mentorRole: 'Ilmuwan Forensik Kimia-Biologi',
    slideCount: 8,
    learningTopics: ['Keselamatan Kerja K3', 'Instrumen Lab & Mikroskop', 'Skala Derajat pH', 'Metode Ilmiah'],
    miniGames: [
      { type: 'match', title: 'Simbol Bahaya K3 Laboratorium', itemCount: 4 },
      { type: 'sequence', title: 'Urutan 5 Langkah Metode Ilmiah', itemCount: 5 },
      { type: 'flashcards', title: 'Uji Indikator Lakmus Asam Basa', itemCount: 3 }
    ],
    resolutionImpact: 'Reaktor kimia dinetralkan pada pH 7.00 dan lab terhindar dari bahaya kontaminasi',
    reflectionHotsCount: 3
  },
  'ular-tangga-matematika': {
    gameId: 'ular-tangga-matematika',
    expectedTitle: 'Ular Tangga: Master Berhitung Cepat',
    category: 'matematika',
    gradeLevel: 'SD Kelas 4-6',
    mentorName: 'Kak Arya',
    mentorRole: 'Arsitek Angka & Struktur',
    slideCount: 7,
    learningTopics: ['Pecahan Senilai', 'Desimal & Persen', 'Keliling dan Luas Bangun Datar'],
    miniGames: [
      { type: 'match', title: 'Kesetaraan Pecahan Senilai & Desimal', itemCount: 4 },
      { type: 'sequence', title: 'Urutan Balok Fraksi dari Terkecil ke Terbesar', itemCount: 5 }
    ],
    resolutionImpact: 'Jembatan Gantung Emas tersambung kokoh dan kereta logistik melaju selamat',
    reflectionHotsCount: 3
  },
  'point-click-candi': {
    gameId: 'point-click-candi',
    expectedTitle: 'Point & Click: Relief Candi & Sejarah Nusantara',
    category: 'sejarah',
    gradeLevel: 'SMP Kelas 7-8',
    mentorName: 'Paman Dewa',
    mentorRole: 'Kurator Arkeologi & Cagar Budaya',
    slideCount: 8,
    learningTopics: ['Kosmologi Kamadhatu-Rupadhatu-Arupadhatu', 'Relief Perahu Layar Cadik Ganda', 'Teknologi Pasak Andesit'],
    miniGames: [
      { type: 'sequence', title: 'Urutan 4 Strata Arsitektur Kosmologi Candi', itemCount: 4 },
      { type: 'match', title: 'Artefak Candi & Bukti Kemaritiman Nusantara', itemCount: 4 },
      { type: 'flashcards', title: 'Toleransi Dinasti Syailendra & Sanjaya', itemCount: 2 }
    ],
    resolutionImpact: 'Kitab Dokumentasi Peradaban Maritim Borobudur resmi terbit untuk UNESCO',
    reflectionHotsCount: 3
  },
  'point-click-hutan': {
    gameId: 'point-click-hutan',
    expectedTitle: 'Point & Click: Misteri Hutan Hujan Kalimantan',
    category: 'sains',
    gradeLevel: 'SD Kelas 4-6',
    mentorName: 'Ranger Banyu',
    mentorRole: 'Jagawana Konservasi Rimba',
    slideCount: 8,
    learningTopics: ['Garis Biogeografi Wallace & Weber', 'Zonasi Kanopi Hutan Tropis', 'Satwa Endemik Indonesia'],
    miniGames: [
      { type: 'match', title: 'Satwa Endemik & Zona Persebaran Biogeografi', itemCount: 4 },
      { type: 'sequence', title: '4 Strata Vertikal Kanopi Hutan Hujan', itemCount: 4 },
      { type: 'flashcards', title: 'Adaptasi Satwa & Peran Orangutan', itemCount: 2 }
    ],
    resolutionImpact: 'Koridor jelajah satwa Wallacea aman dari pembalakan dan orangutan lestari',
    reflectionHotsCount: 3
  },
  'ular-tangga-tatasurya': {
    gameId: 'ular-tangga-tatasurya',
    expectedTitle: 'Ular Tangga: Tata Surya & Gravitasi',
    category: 'sains',
    gradeLevel: 'SD Kelas 6',
    mentorName: 'Kapten Dirgantara',
    mentorRole: 'Kapten Misi Antariksa',
    slideCount: 8,
    learningTopics: ['8 Planet Tata Surya', 'Planet Terestrial vs Jovian', 'Mekanika Orbit & Gerhana'],
    miniGames: [
      { type: 'sequence', title: 'Urutan 8 Planet Berdasarkan Jarak Orbit Matahari', itemCount: 8 },
      { type: 'match', title: 'Karakteristik & Julukan Unik Benda Antariksa', itemCount: 4 },
      { type: 'sequence', title: 'Geometri Posisi Gerhana Matahari Total', itemCount: 3 }
    ],
    resolutionImpact: 'Wahana Garuda Orbital mendarat mulus di Stasiun Antariksa Kuiper',
    reflectionHotsCount: 3
  },
  'teka-teki-kata': {
    gameId: 'teka-teki-kata',
    expectedTitle: 'Teka-Teki: Susun Kata & Kosakata Cerdas',
    category: 'bahasa',
    gradeLevel: 'SMP Kelas 7-9',
    mentorName: 'Ibu Kartika',
    mentorRole: 'Pengampu Bahasa & Sastra Nusantara',
    slideCount: 7,
    learningTopics: ['Pedoman EYD Edisi V', 'Kata Baku vs Non-Baku KBBI', 'Arsitektur Rima Pantun Tradisional'],
    miniGames: [
      { type: 'match', title: 'Kata Sehari-hari vs Kata Baku Resmi KBBI', itemCount: 5 },
      { type: 'sequence', title: 'Menyusun Bait Pantun Nasehat Empat Seuntai', itemCount: 4 }
    ],
    resolutionImpact: 'Naskah emas bahasa persatuan Balai Pustaka berhasil direstorasi abadi',
    reflectionHotsCount: 3
  },
  'ular-tangga-sejarah': {
    gameId: 'ular-tangga-sejarah',
    expectedTitle: 'Ular Tangga: Linimasa Sejarah Indonesia',
    category: 'sejarah',
    gradeLevel: 'SD Kelas 5-6',
    mentorName: 'Kak Satria',
    mentorRole: 'Pandu Perjuangan Kemerdekaan',
    slideCount: 8,
    learningTopics: ['Linimasa Agustus 1945', 'Peristiwa Rengasdengklok', 'Tokoh Perjuangan di Balik Layar'],
    miniGames: [
      { type: 'sequence', title: 'Kronologi Detik-Detik Proklamasi Kemerdekaan 1945', itemCount: 5 },
      { type: 'match', title: 'Pahlawan Kemerdekaan & Peran Bersejarahnya', itemCount: 4 },
      { type: 'flashcards', title: 'Naskah Klad Bung Karno vs Naskah Otentik Sayuti Melik', itemCount: 2 }
    ],
    resolutionImpact: 'Sang Saka Merah Putih berkibar di puncak tiang petak 100 kemerdekaan',
    reflectionHotsCount: 3
  },
  'catur-taktik-logika': {
    gameId: 'catur-taktik-logika',
    expectedTitle: 'Teka-Teki Catur: Taktik & Problem Solving',
    category: 'logika',
    gradeLevel: 'SD 4-6 & SMP 7-9',
    mentorName: 'Master Utut',
    mentorRole: 'Pelatih Catur & Logika Komputasional',
    slideCount: 7,
    learningTopics: ['Empat Motif Taktis (Garpu, Kuncian, Tusukan, Skakmat Koridor)', 'Berpikir Komputasional & Dekomposisi'],
    miniGames: [
      { type: 'match', title: 'Motif Taktik Catur & Pola Serangan Geometrisnya', itemCount: 4 },
      { type: 'sequence', title: 'Algoritma Rantai Kombinasi Eksekusi Skakmat', itemCount: 4 }
    ],
    resolutionImpact: 'Kemenangan skakmat presisi dan medali emas kejuaraan catur sekolah diraih',
    reflectionHotsCount: 3
  },
  'presentasi-ekosistem-hutan': {
    gameId: 'presentasi-ekosistem-hutan',
    expectedTitle: 'Presentasi Interaktif: Ekspedisi Hutan Hujan Tropis',
    category: 'sains',
    gradeLevel: 'SD Kelas 4-6',
    mentorName: 'Prof. Maya Arisandi',
    mentorRole: 'Kepala Tim Riset Konservasi Alam',
    slideCount: 7,
    learningTopics: ['Tiga Tingkat Trofik Ekosistem', 'Fotosintesis & Aliran Energi', 'Konservasi Keanekaragaman Hayati'],
    miniGames: [
      { type: 'sequence', title: 'Siklus Aliran Energi Fotosintesis', itemCount: 4 },
      { type: 'match', title: 'Komponen Rantai Makanan Hutan Hujan', itemCount: 4 }
    ],
    resolutionImpact: 'Pohon ara purba bersemi kembali dan satwa hutan tropis memiliki pakan berlimpah',
    reflectionHotsCount: 3
  }
};

/**
 * Slide Deck State Machine Simulator
 * Mirrors the navigation and boundary logic of StoryPresentationDeckEngine / InteractiveStoryPresentationModal
 */
export class SlideDeckSimulator {
  currentSlide: number = 1;
  readonly totalSlides: number;
  isVictoryTriggered: boolean = false;
  miniGameStates: Record<string, boolean> = {};

  constructor(totalSlides: number = 6) {
    this.totalSlides = Math.max(1, totalSlides);
  }

  goToSlide(slideNum: number): number {
    this.currentSlide = Math.max(1, Math.min(this.totalSlides, slideNum));
    return this.currentSlide;
  }

  nextSlide(): { currentSlide: number; victory: boolean } {
    if (this.currentSlide < this.totalSlides) {
      this.currentSlide += 1;
      return { currentSlide: this.currentSlide, victory: false };
    } else {
      this.isVictoryTriggered = true;
      return { currentSlide: this.currentSlide, victory: true };
    }
  }

  prevSlide(): number {
    if (this.currentSlide > 1) {
      this.currentSlide -= 1;
    }
    return this.currentSlide;
  }

  reset(): void {
    this.currentSlide = 1;
    this.isVictoryTriggered = false;
    this.miniGameStates = {};
  }

  setMiniGameCompleted(gameKey: string, completed: boolean): void {
    this.miniGameStates[gameKey] = completed;
  }

  isAllMiniGamesCompleted(): boolean {
    const keys = Object.keys(this.miniGameStates);
    return keys.length > 0 && keys.every(k => this.miniGameStates[k] === true);
  }
}

/**
 * Sequence Game Logic Engine Simulator
 */
export function validateSequenceOrder<T extends { order: number }>(items: T[]): boolean {
  if (!items || items.length === 0) return false;
  return items.every((item, idx) => item.order === idx + 1);
}

/**
 * Deterministic Fisher-Yates shuffle for state testing
 */
export function shuffleArray<T>(array: T[], seed: number = 42): T[] {
  const result = [...array];
  let currentSeed = seed;
  const pseudoRandom = () => {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    return currentSeed / 233280;
  };

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(pseudoRandom() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Match Pairs Validator Simulator
 */
export function validatePairConnections(
  expectedPairs: Array<{ id: string }>,
  userConnections: Record<string, string>
): { isComplete: boolean; correctCount: number; totalCount: number } {
  const totalCount = expectedPairs.length;
  let correctCount = 0;

  for (const pair of expectedPairs) {
    if (userConnections[pair.id] === pair.id) {
      correctCount += 1;
    }
  }

  return {
    isComplete: correctCount === totalCount && Object.keys(userConnections).length === totalCount,
    correctCount,
    totalCount
  };
}
