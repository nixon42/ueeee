/**
 * React Hook: useTeacherNotes
 * Part of Business Logic Layer (src/business/hooks/)
 * Manages teacher discussion notes, classroom reflections, and Supabase cloud sync.
 */

import { useState, useEffect, useCallback } from 'react';
import { teacherService } from '../services/teacher.service';
import { TeacherReflectionNote } from '../models';

export function useTeacherNotes(gameId?: string): {
  notes: TeacherReflectionNote[];
  addNote: (slideIndex: number, topic: string, notesContent: string) => Promise<TeacherReflectionNote>;
  deleteNote: (noteId: string) => Promise<void>;
  syncWithCloud: () => Promise<TeacherReflectionNote[]>;
} {
  const [allNotes, setAllNotes] = useState<TeacherReflectionNote[]>(() => teacherService.getNotes());

  useEffect(() => {
    const unsubscribe = teacherService.subscribe(setAllNotes);
    teacherService.syncWithCloud(gameId).catch(() => {});
    return () => unsubscribe();
  }, [gameId]);

  const filteredNotes = gameId
    ? allNotes.filter(n => n.gameId === gameId)
    : allNotes;

  const addNote = useCallback(
    async (slideIndex: number, topic: string, notesContent: string) => {
      if (!gameId) throw new Error('gameId is required to save note');
      return teacherService.addNote(gameId, slideIndex, topic, notesContent);
    },
    [gameId]
  );

  const deleteNote = useCallback(async (noteId: string) => {
    return teacherService.deleteNote(noteId);
  }, []);

  const syncWithCloud = useCallback(async () => {
    return teacherService.syncWithCloud(gameId);
  }, [gameId]);

  return {
    notes: filteredNotes,
    addNote,
    deleteNote,
    syncWithCloud,
  };
}
