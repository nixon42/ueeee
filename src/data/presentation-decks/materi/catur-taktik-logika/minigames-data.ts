import { MatchGamePair, SequenceGameItem } from '@/types/presentation';

export const CHESS_TACTIC_PAIRS: MatchGamePair[] = [
  {
    "id": "t1",
    "leftText": "Garpu (Fork)",
    "rightText": "Dua sasaran sekaligus"
  },
  {
    "id": "t2",
    "leftText": "Kuncian (Pin)",
    "rightText": "Bidak terikat lindungi raja"
  },
  {
    "id": "t3",
    "leftText": "Tusukan (Skewer)",
    "rightText": "Serang perwira depan"
  },
  {
    "id": "t4",
    "leftText": "Skakmat Koridor",
    "rightText": "Baris belakang terperangkap"
  }
];

export const CHESS_TACTIC_TERMINOLOGY_PAIRS = CHESS_TACTIC_PAIRS;

export const CHESS_CHECKMATE_SEQUENCE: SequenceGameItem[] = [
  {
    "id": "ca1",
    "order": 1,
    "label": "Identifikasi Celah",
    "iconEmoji": "🔍",
    "description": "Melihat Raja hitam di baris b8 terjebak tanpa petak pelarian udara."
  },
  {
    "id": "ca2",
    "order": 2,
    "label": "Pancingan Pengorbanan",
    "iconEmoji": "🎯",
    "description": "Melakukan langkah pembuka lajur untuk menarik perwira penjaga lawan."
  },
  {
    "id": "ca3",
    "order": 3,
    "label": "Penetrasi Benteng/Ratu",
    "iconEmoji": "⚡",
    "description": "Meluncurkan Ratu menusuk ke baris terdalam petak c8."
  },
  {
    "id": "ca4",
    "order": 4,
    "label": "Skakmat Mutlak",
    "iconEmoji": "👑",
    "description": "Raja lawan terancam mati tanpa ada bidak kawan yang dapat menolong."
  }
];

