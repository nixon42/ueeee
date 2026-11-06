import React from 'react';
import { GameStageTheme } from '@/components/game-shell';
import { SubjectCategory, GradeLevel } from '@/types/game';

/**
 * 10 Supported Slide Archetypes for Indonesian K-12 Interactive Decks
 */
export type SlideType =
  | 'narrative-intro'
  | 'concept-infographic'
  | 'mini-game-sequence'
  | 'mini-game-match'
  | 'mini-game-flashcard'
  | 'mini-game-board'
  | 'mini-game-chess'
  | 'mini-game-word'
  | 'story-resolution'
  | 'reflection-spark';

/**
 * Mentor character guiding the narrative expedition
 */
export interface PresentationMentor {
  name: string;
  role: string;
  avatarEmoji: string;
  avatarSvg?: string;
}

/**
 * SLIDE 1: Narrative Intro (Opening story hook and classroom mission)
 */
export interface NarrativeIntroSlide {
  id: string;
  type: 'narrative-intro';
  chapterBadge?: string; // e.g. "BABAK 1: PANGGILAN PETUALANGAN"
  title: string;
  subtitle?: string;
  dialogue: string;
  missionObjective?: string;
  mentorOverride?: Partial<PresentationMentor>;
  actionButtonText?: string; // e.g. "Buka Materi Konsep Kunci"
}

/**
 * Infographic Card within Concept Slide
 */
export interface InfographicCard {
  id: string;
  title: string;
  description: string;
  iconEmoji?: string;
  iconSvg?: string;
  levelBadge?: string; // e.g. "Tingkat 1", "Pilar A"
  badgeColor?: string; // Tailwind color name e.g. "emerald", "amber", "purple"
  cardBgColor?: string;
}

/**
 * SLIDE 2: Concept Infographic (Bite-sized visual knowledge cards + speaker note)
 */
export interface ConceptInfographicSlide {
  id: string;
  type: 'concept-infographic';
  chapterBadge?: string; // e.g. "BABAK 2: KONSEP DASAR PEMBELAJARAN"
  title: string;
  subtitle?: string;
  cards: InfographicCard[];
  teacherNotes?: string; // Speaker prompt / classroom discussion cue
}

/**
 * Mini-Game: Canva Sequence Item
 */
export interface SequenceGameItem {
  id: string;
  order: number; // 1-indexed target position
  label: string;
  iconEmoji: string;
  description?: string;
}

/**
 * SLIDE 3: Mini-Game Sequence Ordering
 */
export interface MiniGameSequenceSlide {
  id: string;
  type: 'mini-game-sequence';
  chapterBadge?: string;
  title: string;
  subtitle?: string;
  items: SequenceGameItem[];
  instruction?: string;
  explanationOnSuccess?: string;
  challengeKey?: string;
}

/**
 * Mini-Game: Canva Match Pair Item
 */
export interface MatchGamePair {
  id: string;
  leftText: string;
  rightText: string;
}

/**
 * SLIDE 4: Mini-Game Dual-Column Matching
 */
export interface MiniGameMatchSlide {
  id: string;
  type: 'mini-game-match';
  chapterBadge?: string;
  title: string;
  subtitle?: string;
  pairs: MatchGamePair[];
  columnALabel?: string; // default "Kolom A: Konsep"
  columnBLabel?: string; // default "Kolom B: Pasangan"
  instruction?: string;
  explanationOnSuccess?: string;
  challengeKey?: string;
}

/**
 * 3D Flashcard Item
 */
export interface FlashcardItem {
  id: string;
  frontPrompt: string;
  backAnswer: string;
  backExplanation?: string;
  backCurriculumFact?: string;
  frontHint?: string;
  frontEmoji?: string;
  iconEmoji?: string;
  category?: string;
  backTitle?: string;
}

/**
 * SLIDE 5: Mini-Game 3D Flashcards (Active recall flip cards)
 */
export interface MiniGameFlashcardSlide {
  id: string;
  type: 'mini-game-flashcard';
  chapterBadge?: string;
  title: string;
  subtitle?: string;
  cards: FlashcardItem[];
  instruction?: string;
  challengeKey?: string;
}

/**
 * Stepping Board Tile
 */
export interface BoardStepTile {
  step: number;
  title: string;
  prompt: string;
  action: string;
  eventType: 'normal' | 'boost' | 'obstacle' | 'goal';
  iconEmoji?: string;
  choices?: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }>;
}

/**
 * SLIDE 6: Mini-Game Board Stepping
 */
export interface MiniGameBoardSlide {
  id: string;
  type: 'mini-game-board';
  chapterBadge?: string;
  title: string;
  subtitle?: string;
  tiles: BoardStepTile[];
  targetScore?: number;
  instruction?: string;
  challengeKey?: string;
}

/**
 * Chess Piece for Tactical Logic Slide
 */
export interface ChessLogicPiece {
  id: string;
  type: 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';
  color: 'w' | 'b';
  col: number; // 0-7
  row: number; // 0-7
}

/**
 * SLIDE 7: Mini-Game Tactical Logic Chess Challenge
 */
export interface MiniGameChessSlide {
  id: string;
  type: 'mini-game-chess';
  chapterBadge?: string;
  title: string;
  subtitle?: string;
  objective: string;
  explanation: string;
  pieces: ChessLogicPiece[];
  solutionMove: {
    from: { col: number; row: number };
    to: { col: number; row: number };
  };
  challengeKey?: string;
}

/**
 * SLIDE 8: Mini-Game Word Puzzle (Teka-teki kata / PUEBI / Istilah)
 */
export interface MiniGameWordSlide {
  id: string;
  type: 'mini-game-word';
  chapterBadge?: string;
  title: string;
  subtitle?: string;
  word: string;
  clue: string;
  explanation: string;
  subject?: string;
  category?: string;
  options?: string[];
  challengeKey?: string;
}

/**
 * SLIDE 9: Story Resolution (Impact of student problem-solving)
 */
export interface StoryResolutionSlide {
  id: string;
  type: 'story-resolution';
  chapterBadge?: string; // e.g. "BABAK 5: KELANJUTAN CERITA"
  title: string;
  subtitle?: string;
  celebrationEmoji?: string; // default "🏆"
  reportTitle?: string; // e.g. "Laporan Hasil Misi Konservasi:"
  resolutionStory: string;
  achievementBadges?: Array<{
    label: string;
    description?: string;
    icon?: string;
  }>;
  actionButtonText?: string; // e.g. "Buka Lembar Diskusi Guru & Refleksi"
}

/**
 * HOTS Discussion Spark Card
 */
export interface DiscussionSparkCard {
  number: number;
  title: string;
  question: string;
  badgeColor?: string;
}

/**
 * SLIDE 10: Reflection Spark & HOTS Discussion
 */
export interface ReflectionSparkSlide {
  id: string;
  type: 'reflection-spark';
  chapterBadge?: string; // e.g. "BABAK 6: REFLEKSI & DISKUSI KELAS"
  title: string;
  subtitle?: string;
  sparkCards: DiscussionSparkCard[];
  victoryButtonText?: string; // default "🏆 Selesai & Rayakan Kemenangan Kelas!"
}

/**
 * Discriminated Union of all slide types
 */
export type SlideDefinition =
  | NarrativeIntroSlide
  | ConceptInfographicSlide
  | MiniGameSequenceSlide
  | MiniGameMatchSlide
  | MiniGameFlashcardSlide
  | MiniGameBoardSlide
  | MiniGameChessSlide
  | MiniGameWordSlide
  | StoryResolutionSlide
  | ReflectionSparkSlide;

/**
 * Complete Presentation Deck Schema
 * Supports 5 to 8+ slides dynamically per deck.
 */
export interface PresentationDeckData {
  gameId: string;
  title: string;
  subtitle: string;
  themeColor: GameStageTheme;
  icon?: string | React.ReactNode;
  category?: SubjectCategory;
  gradeLevel?: GradeLevel;
  subjectDetail?: string;
  mentor: PresentationMentor;
  totalSlides?: number; // Optional metadata; runtime uses slides.length
  slides: SlideDefinition[];
}
