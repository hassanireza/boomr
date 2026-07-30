import { ObservableStore } from './ObservableStore';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  title: string;
  message: string;
  type: ToastType;
  duration: number;
}

let nextId = 1;

/**
 * ToastService manages a transient queue of notification toasts.
 * Components mount a single ToastContainer that subscribes here.
 */
export class ToastService extends ObservableStore {
  private static instance: ToastService;
  private toasts: Toast[] = [];

  static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }
    return ToastService.instance;
  }

  getToasts(): Toast[] {
    return this.toasts;
  }

  show(title: string, message: string, type: ToastType = 'success', duration = 3200): void {
    const toast: Toast = { id: nextId++, title, message, type, duration };
    this.toasts = [...this.toasts, toast];
    this.emit();
    window.setTimeout(() => this.dismiss(toast.id), duration);
  }

  dismiss(id: number): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.emit();
  }
}
