import { ObservableStore } from './ObservableStore';
import { LocalPersistence } from './LocalPersistence';
import { Product } from '../models/Product';

const STORAGE_KEY = 'boomr.wishlist.v1';

/**
 * WishlistService tracks saved-for-later products, keyed by product
 * id, and persists the selection across sessions.
 */
export class WishlistService extends ObservableStore {
  private static instance: WishlistService;
  private ids: Set<number> = new Set();
  private readonly catalog: Map<number, Product>;

  private constructor(catalog: Product[]) {
    super();
    this.catalog = new Map(catalog.map((product) => [product.id, product]));
    this.ids = new Set(LocalPersistence.load<number[]>(STORAGE_KEY, []));
  }

  static getInstance(catalog: Product[]): WishlistService {
    if (!WishlistService.instance) {
      WishlistService.instance = new WishlistService(catalog);
    }
    return WishlistService.instance;
  }

  private persist(): void {
    LocalPersistence.save(STORAGE_KEY, Array.from(this.ids));
  }

  has(productId: number): boolean {
    return this.ids.has(productId);
  }

  toggle(productId: number): boolean {
    const nowSaved = !this.ids.has(productId);
    if (nowSaved) {
      this.ids.add(productId);
    } else {
      this.ids.delete(productId);
    }
    this.persist();
    this.emit();
    return nowSaved;
  }

  remove(productId: number): void {
    this.ids.delete(productId);
    this.persist();
    this.emit();
  }

  getProducts(): Product[] {
    return Array.from(this.ids)
      .map((id) => this.catalog.get(id))
      .filter((product): product is Product => Boolean(product));
  }

  count(): number {
    return this.ids.size;
  }
}
