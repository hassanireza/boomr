import { ObservableStore } from './ObservableStore';

export type Overlay = 'cart' | 'wishlist' | 'search' | 'login' | 'checkout' | 'orderConfirmed' | null;

/**
 * UIStateService tracks which single overlay (cart panel, wishlist
 * panel, search, auth modal, checkout modal, confirmation) is
 * currently active. Only one overlay is shown at a time, matching
 * the original storefront's interaction model.
 */
export class UIStateService extends ObservableStore {
  private static instance: UIStateService;
  private active: Overlay = null;

  static getInstance(): UIStateService {
    if (!UIStateService.instance) {
      UIStateService.instance = new UIStateService();
    }
    return UIStateService.instance;
  }

  getActive(): Overlay {
    return this.active;
  }

  open(overlay: Overlay): void {
    this.active = overlay;
    this.emit();
  }

  close(): void {
    this.active = null;
    this.emit();
  }
}
