/**
 * Safe Storage Utility
 * Provides resilient, quota-safe, in-memory fallback wrapper around localStorage.
 * Prevents application crashes in incognito mode, restricted iframes, or full-disk environments.
 */

class SafeStorage implements Storage {
  private memoryFallback: Map<string, string> = new Map();
  private isStorageAvailable: boolean;

  constructor() {
    this.isStorageAvailable = this.checkAvailability();
  }

  private checkAvailability(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    try {
      const testKey = '__ueeee_storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  public get length(): number {
    if (this.isStorageAvailable) {
      try {
        return window.localStorage.length;
      } catch {
        // Fallback
      }
    }
    return this.memoryFallback.size;
  }

  public clear(): void {
    this.memoryFallback.clear();
    if (this.isStorageAvailable) {
      try {
        window.localStorage.clear();
      } catch {
        // Suppress
      }
    }
  }

  public getItem(key: string): string | null {
    if (this.isStorageAvailable) {
      try {
        const value = window.localStorage.getItem(key);
        if (value !== null) {
          return value;
        }
      } catch {
        // Fallback to memory
      }
    }
    return this.memoryFallback.get(key) ?? null;
  }

  public key(index: number): string | null {
    if (this.isStorageAvailable) {
      try {
        return window.localStorage.key(index);
      } catch {
        // Fallback
      }
    }
    const keys = Array.from(this.memoryFallback.keys());
    return keys[index] ?? null;
  }

  public removeItem(key: string): void {
    this.memoryFallback.delete(key);
    if (this.isStorageAvailable) {
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Suppress
      }
    }
  }

  public setItem(key: string, value: string): void {
    // Keep in memory fallback as well for consistency
    this.memoryFallback.set(key, value);

    if (this.isStorageAvailable) {
      try {
        window.localStorage.setItem(key, value);
      } catch (err) {
        // QuotaExceededError or SecurityError: keep stored in memory fallback
        console.warn(`[SafeStorage] localStorage write failed for key "${key}", falling back to memory:`, err);
        this.isStorageAvailable = false;
      }
    }
  }

  /**
   * Safe JSON parse helper with default fallback
   */
  public getJson<T>(key: string, fallback: T): T {
    try {
      const item = this.getItem(key);
      if (item === null) return fallback;
      return JSON.parse(item) as T;
    } catch {
      return fallback;
    }
  }

  /**
   * Safe JSON stringify and set helper
   */
  public setJson<T>(key: string, value: T): boolean {
    try {
      this.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
}

export const safeStorage = new SafeStorage();
