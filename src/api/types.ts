/**
 * Supabase Database Schema & DTO Types
 * Defines the contract between PostgreSQL tables/RPCs and the application API layer.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface DbGameSession {
  id: string;
  session_id: string;
  game_id: string;
  current_slide: number;
  total_slides: number;
  completed: boolean;
  challenges_completed: string[];
  score: number;
  play_time_seconds: number;
  created_at: string;
  updated_at: string;
}

export type DbGameSessionInsert = {
  id?: string;
  session_id: string;
  game_id: string;
  current_slide?: number;
  total_slides?: number;
  completed?: boolean;
  challenges_completed?: string[];
  score?: number;
  play_time_seconds?: number;
  created_at?: string;
  updated_at?: string;
};

export type DbGameSessionUpdate = Partial<DbGameSessionInsert>;

export interface DbUserFavorite {
  id: string;
  session_id: string;
  game_id: string;
  created_at: string;
}

export interface DbGameStat {
  game_id: string;
  play_count: number;
  completion_count: number;
  average_rating: number;
  total_play_time: number;
  updated_at: string;
}

export interface DbTeacherNote {
  id: string;
  session_id: string;
  game_id: string;
  slide_index: number;
  topic: string | null;
  reflection_notes: string;
  created_at: string;
  updated_at: string;
}

export type DbTeacherNoteInsert = {
  id?: string;
  session_id: string;
  game_id: string;
  slide_index?: number;
  topic?: string | null;
  reflection_notes: string;
  created_at?: string;
  updated_at?: string;
};

export interface Database {
  public: {
    Tables: {
      game_sessions: {
        Row: DbGameSession;
        Insert: DbGameSessionInsert;
        Update: DbGameSessionUpdate;
        Relationships: [];
      };
      user_favorites: {
        Row: DbUserFavorite;
        Insert: { id?: string; session_id: string; game_id: string; created_at?: string };
        Update: { id?: string; session_id?: string; game_id?: string; created_at?: string };
        Relationships: [];
      };
      game_stats: {
        Row: DbGameStat;
        Insert: Partial<DbGameStat> & { game_id: string };
        Update: Partial<DbGameStat>;
        Relationships: [];
      };
      teacher_notes: {
        Row: DbTeacherNote;
        Insert: DbTeacherNoteInsert;
        Update: Partial<DbTeacherNoteInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      record_game_play: {
        Args: {
          p_game_id: string;
          p_completed: boolean;
          p_duration: number;
        };
        Returns: DbGameStat;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
