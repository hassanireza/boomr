/**
 * LocalPersistence centralises reading and writing JSON blobs to
 * localStorage with defensive error handling, so a corrupted or
 * disabled storage backend never crashes the storefront.
 */
export class LocalPersistence {
  static load<T>(key: string, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  static save<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be unavailable (private browsing, quota, etc).
      // Silently ignore, the in-memory state remains authoritative.
    }
  }
}
