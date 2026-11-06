/**
 * Teacher & Classroom Reflection Domain Service
 * Part of Business Logic Layer (src/business/services/)
 * Manages teacher discussion notes, classroom worksheets, and Supabase persistence.
 */

import { apiFetchTeacherNotes, apiSaveTeacherNote, apiDeleteTeacherNote } from '@/api';
import { TeacherReflectionNote } from '../models';
import { sessionService } from './session.service';

const STORAGE_KEY_TEACHER_NOTES = 'ueeee_teacher_notes';

type TeacherNotesListener = (notes: TeacherReflectionNote[]) => void;

class TeacherService {
  private notes: TeacherReflectionNote[] = [];
  private listeners: Set<TeacherNotesListener> = new Set();

  constructor() {
    this.notes = this.loadLocalNotes();
  }

  private loadLocalNotes(): TeacherReflectionNote[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TEACHER_NOTES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Storage read error
    }
    return [];
  }

  private saveLocalNotes(notes: TeacherReflectionNote[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_TEACHER_NOTES, JSON.stringify(notes));
    } catch {
      // Storage write error
    }
  }

  private notifyListeners(): void {
    const list = [...this.notes];
    this.listeners.forEach(listener => listener(list));
  }

  public subscribe(listener: TeacherNotesListener): () => void {
    this.listeners.add(listener);
    listener([...this.notes]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getNotes(): TeacherReflectionNote[] {
    return [...this.notes];
  }

  public getNotesForGame(gameId: string): TeacherReflectionNote[] {
    return this.notes.filter(note => note.gameId === gameId);
  }

  public async syncWithCloud(gameId?: string): Promise<TeacherReflectionNote[]> {
    const sessionId = sessionService.getSessionId();
    try {
      const { data, error } = await apiFetchTeacherNotes(sessionId, gameId);
      if (!error && data) {
        const cloudNotes: TeacherReflectionNote[] = data.map(dbNote => ({
          id: dbNote.id,
          sessionId: dbNote.session_id,
          gameId: dbNote.game_id,
          slideIndex: dbNote.slide_index,
          topic: dbNote.topic || 'Refleksi Kelas',
          notes: dbNote.reflection_notes,
          createdAt: dbNote.created_at,
          updatedAt: dbNote.updated_at,
        }));

        // Merge notes keeping unique IDs
        const existingMap = new Map(this.notes.map(n => [n.id, n]));
        cloudNotes.forEach(cn => existingMap.set(cn.id, cn));
        this.notes = Array.from(existingMap.values());
        this.saveLocalNotes(this.notes);
        this.notifyListeners();
        return this.notes;
      }
    } catch (err) {
      console.warn('[TeacherService] Failed to sync notes with cloud:', err);
    }
    return this.notes;
  }

  public async addNote(
    gameId: string,
    slideIndex: number,
    topic: string,
    notesContent: string
  ): Promise<TeacherReflectionNote> {
    const sessionId = sessionService.getSessionId();
    const tempId = 'note_' + Date.now();

    const newNote: TeacherReflectionNote = {
      id: tempId,
      sessionId,
      gameId,
      slideIndex,
      topic,
      notes: notesContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Optimistic local update
    this.notes = [newNote, ...this.notes];
    this.saveLocalNotes(this.notes);
    this.notifyListeners();

    // Async cloud insert
    apiSaveTeacherNote({
      session_id: sessionId,
      game_id: gameId,
      slide_index: slideIndex,
      topic,
      reflection_notes: notesContent,
    }).then(res => {
      if (res.data) {
        // Replace tempId with actual UUID from Supabase
        this.notes = this.notes.map(n =>
          n.id === tempId ? { ...n, id: res.data!.id, updatedAt: res.data!.updated_at } : n
        );
        this.saveLocalNotes(this.notes);
        this.notifyListeners();
      }
    }).catch(err => {
      console.warn('[TeacherService] Cloud note insert failed:', err);
    });

    return newNote;
  }

  public async deleteNote(noteId: string): Promise<void> {
    this.notes = this.notes.filter(n => n.id !== noteId);
    this.saveLocalNotes(this.notes);
    this.notifyListeners();

    apiDeleteTeacherNote(noteId).catch(err => {
      console.warn('[TeacherService] Cloud note delete failed:', err);
    });
  }
}

export const teacherService = new TeacherService();
