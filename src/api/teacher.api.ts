/**
 * Teacher Notes & Classroom Reflections API
 * Part of the API Layer (src/api/)
 * Direct data access for teacher_notes table in Supabase.
 */

import { supabase } from './client';
import { DbTeacherNote, DbTeacherNoteInsert } from './types';

export interface TeacherApiResponse<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Fetch all reflection notes authored in a teacher session.
 */
export async function apiFetchTeacherNotes(
  sessionId: string,
  gameId?: string
): Promise<TeacherApiResponse<DbTeacherNote[]>> {
  try {
    let query = supabase
      .from('teacher_notes')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });

    if (gameId) {
      query = query.eq('game_id', gameId);
    }

    const { data, error } = await query;

    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: (data as DbTeacherNote[]) || [], error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Failed to fetch teacher notes'),
    };
  }
}

/**
 * Save or insert teacher discussion notes to Supabase.
 */
export async function apiSaveTeacherNote(
  noteData: DbTeacherNoteInsert
): Promise<TeacherApiResponse<DbTeacherNote>> {
  try {
    const { data, error } = await (supabase
      .from('teacher_notes') as any)
      .insert(noteData)
      .select()
      .single();

    if (error) {
      return { data: null, error: new Error(error.message) };
    }
    return { data: data as DbTeacherNote, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err : new Error('Failed to save teacher note'),
    };
  }
}

/**
 * Delete a specific teacher note by its UUID ID.
 */
export async function apiDeleteTeacherNote(
  noteId: string
): Promise<TeacherApiResponse<boolean>> {
  try {
    const { error } = await supabase
      .from('teacher_notes')
      .delete()
      .eq('id', noteId);

    if (error) {
      return { data: false, error: new Error(error.message) };
    }
    return { data: true, error: null };
  } catch (err) {
    return {
      data: false,
      error: err instanceof Error ? err : new Error('Failed to delete teacher note'),
    };
  }
}
