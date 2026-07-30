import { ObservableStore } from './ObservableStore';
import { LocalPersistence } from './LocalPersistence';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';

interface StoredCartLine {
  productId: number;
  quantity: number;
  color?: string;
  size?: string;
}

const STORAGE_KEY = 'boomr.cart.v1';
const FREE_SHIPPING_THRESHOLD = 100;
const STANDARD_SHIPPING = 9.99;
const TAX_RATE = 0.0;

export interface CouponResult {
  success: boolean;
  message: string;
}

/**
 * CartService owns all shopping cart state and business rules:
 * line management, shipping thresholds and coupon codes. It is
 * framework agnostic; the `useCart` hook is the only place that
 * knows about React.
 */
export class CartService extends ObservableStore {
  private static instance: CartService;
  private items: Map<string, CartItem> = new Map();
  private couponCode: string | null = null;
  private couponDiscountRate = 0;
  private readonly catalog: Map<number, Product>;

  private constructor(catalog: Product[]) {
    super();
    this.catalog = new Map(catalog.map((product) => [product.id, product]));
    this.restore();
  }

  static getInstance(catalog: Product[]): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService(catalog);
    }
    return CartService.instance;
  }

  private restore(): void {
    const stored = LocalPersistence.load<StoredCartLine[]>(STORAGE_KEY, []);
    stored.forEach((line) => {
      const product = this.catalog.get(line.productId);
      if (!product) return;
      const item = new CartItem(product, line.quantity, line.color, line.size);
      this.items.set(item.key, item);
    });
  }

  private persist(): void {
    const lines: StoredCartLine[] = this.getItems().map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
    }));
    LocalPersistence.save(STORAGE_KEY, lines);
  }

  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }

  getItemCount(): number {
    return this.getItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  add(product: Product, quantity = 1, color?: string, size?: string): void {
    const item = new CartItem(product, quantity, color, size);
    const existing = this.items.get(item.key);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.set(item.key, item);
    }
    this.persist();
    this.emit();
  }

  remove(key: string): void {
    this.items.delete(key);
    this.persist();
    this.emit();
  }

  setQuantity(key: string, quantity: number): void {
    const item = this.items.get(key);
    if (!item) return;
    if (quantity <= 0) {
      this.items.delete(key);
    } else {
      item.quantity = quantity;
    }
    this.persist();
    this.emit();
  }

  adjustQuantity(key: string, delta: number): void {
    const item = this.items.get(key);
    if (!item) return;
    this.setQuantity(key, item.quantity + delta);
  }

  clear(): void {
    this.items.clear();
    this.couponCode = null;
    this.couponDiscountRate = 0;
    this.persist();
    this.emit();
  }

  getSubtotal(): number {
    return this.getItems().reduce((sum, item) => sum + item.lineTotal, 0);
  }

  getShippingCost(): number {
    if (this.getItems().length === 0) return 0;
    return this.getSubtotal() >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  }

  getCouponCode(): string | null {
    return this.couponCode;
  }

  getDiscount(): number {
    return this.getSubtotal() * this.couponDiscountRate;
  }

  getTax(): number {
    return this.getSubtotal() * TAX_RATE;
  }

  getTotal(): number {
    return this.getSubtotal() - this.getDiscount() + this.getShippingCost() + this.getTax();
  }

  applyCoupon(code: string): CouponResult {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'BOOMR20') {
      this.couponCode = normalized;
      this.couponDiscountRate = 0.2;
      this.emit();
      return { success: true, message: '20% discount applied to your order.' };
    }
    if (normalized.length === 0) {
      return { success: false, message: 'Enter a coupon code first.' };
    }
    return { success: false, message: 'That coupon code is not valid.' };
  }

  removeCoupon(): void {
    this.couponCode = null;
    this.couponDiscountRate = 0;
    this.emit();
  }

  get amountUntilFreeShipping(): number {
    return Math.max(0, FREE_SHIPPING_THRESHOLD - this.getSubtotal());
  }
}
