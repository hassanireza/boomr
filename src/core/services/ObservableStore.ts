export type Listener = () => void;

/**
 * ObservableStore is a small abstract base class implementing the
 * observer pattern. Concrete services extend it so React components
 * can subscribe to state changes through `useSyncExternalStore`
 * without any external state management library.
 */
export abstract class ObservableStore {
  private listeners: Set<Listener> = new Set();

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  protected emit(): void {
    this.listeners.forEach((listener) => listener());
  }
}
