import { Product } from './Product';

/**
 * CartItem couples a Product with a chosen quantity and configuration
 * (color / size) and exposes the derived line total.
 */
export class CartItem {
  readonly product: Product;
  quantity: number;
  readonly color?: string;
  readonly size?: string;

  constructor(product: Product, quantity = 1, color?: string, size?: string) {
    this.product = product;
    this.quantity = quantity;
    this.color = color;
    this.size = size;
  }

  get lineTotal(): number {
    return this.product.price * this.quantity;
  }

  get key(): string {
    return `${this.product.id}:${this.color ?? ''}:${this.size ?? ''}`;
  }

  clone(): CartItem {
    return new CartItem(this.product, this.quantity, this.color, this.size);
  }
}
