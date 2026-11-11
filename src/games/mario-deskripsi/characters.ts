import { CharacterDef, CharacterId } from './types';

export const CHARACTERS: Record<CharacterId, CharacterDef> = {
  rian: {
    id: 'rian',
    name: 'Rian Dirgantara',
    nickname: 'Si Pengamat Cermat',
    title: 'Detektif Visual & Cerapan Indra',
    role: 'Pengamat Detail & Lensa Tajam',
    avatarEmoji: '🔍',
    badge: 'Lari Cepat +20%',
    badgeColor: 'bg-rose-500 text-white',
    themeColor: '#e11d48',
    accentBg: 'from-rose-600 to-amber-600',
    tagline: 'Lensa tajam mengurai detail warna dan rupa!',
    description:
      'Rian adalah siswa kelas 7 yang jeli. Dengan kaca pembesar dan teropongnya, ia mampu mengamati detail terkecil objek dari kejauhan. Kecepatannya yang tinggi memudahkannya melintasi rintangan!',
    specialAbility: 'Kecepatan Lari Kilat (Sprint Boost)',
    abilityDetail: 'Berlari 20% lebih cepat dibanding karakter lain, sangat efektif untuk menghindari musuh dan melompat dari momentum tinggi.',
    stats: {
      speed: 5,
      jump: 3,
      technique: 4,
    },
    physics: {
      runSpeed: 6.2,
      jumpForce: 12.2,
      gravity: 0.52,
    },
  },
  maya: {
    id: 'maya',
    name: 'Maya Kartika',
    nickname: 'Sang Penyair Puitis',
    title: 'Pakar Majas & Diksi Puitis',
    role: 'Puitis & Anggun Melayang',
    avatarEmoji: '📜',
    badge: 'Melayang di Udara',
    badgeColor: 'bg-purple-500 text-white',
    themeColor: '#9333ea',
    accentBg: 'from-purple-600 to-pink-600',
    tagline: 'Gaya bahasa personifikasi menghidupkan suasana!',
    description:
      'Maya adalah pecinta sastra dan puisi. Dengan pena bulu emasnya, ia merangkai kata konkret dan majas personifikasi yang menyentuh hati pembaca. Maya dapat melayang perlahan di udara saat melompat!',
    specialAbility: 'Lompatan Melayang (Floaty Glide)',
    abilityDetail: 'Tahan tombol lompat di udara untuk meluncur perlahan (gravity berkurang drastis), memudahkan menyeberangi jurang lebar dan balok tinggi.',
    stats: {
      speed: 3,
      jump: 5,
      technique: 5,
    },
    physics: {
      runSpeed: 4.8,
      jumpForce: 13.5,
      gravity: 0.45,
      canFloat: true,
    },
  },
  bimo: {
    id: 'bimo',
    name: 'Bimo Prakoso',
    nickname: 'Sang Penjelajah Kata',
    title: 'Arsitek Struktur Teks & Kata Konkret',
    role: 'Tangguh & Lompatan Ganda',
    avatarEmoji: '🎒',
    badge: 'Double Jump',
    badgeColor: 'bg-emerald-500 text-white',
    themeColor: '#059669',
    accentBg: 'from-emerald-600 to-teal-600',
    tagline: 'Struktur kokoh: Identifikasi, Deskripsi, Simpulan!',
    description:
      'Bimo gemar bertualang ke pelosok negeri. Ia selalu mencatat struktur teks deskripsi yang kokoh dan kata-kata konkret dari alam. Bimo memiliki kemampuan melompat dua kali berturut-turut di udara!',
    specialAbility: 'Lompatan Ganda (Double Jump)',
    abilityDetail: 'Dapat menekan tombol lompat sekali lagi saat berada di udara untuk melompat kedua kalinya, menjangkau platform rahasia tertinggi!',
    stats: {
      speed: 4,
      jump: 4,
      technique: 5,
    },
    physics: {
      runSpeed: 5.2,
      jumpForce: 12.4,
      gravity: 0.52,
      canDoubleJump: true,
    },
  },
};

export const CHARACTER_LIST: CharacterDef[] = Object.values(CHARACTERS);
