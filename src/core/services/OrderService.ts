import { CartItem } from '../models/CartItem';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  address2?: string;
  city: string;
  zip: string;
  state?: string;
  country: string;
}

export interface Order {
  orderNumber: string;
  placedAt: Date;
  items: CartItem[];
  shipping: ShippingAddress;
  shippingMethod: string;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
}

/**
 * OrderService is responsible for turning a validated cart and
 * shipping form into an Order record. In this static storefront it
 * never leaves the browser, but the class boundary is where a real
 * payment gateway or order API call would be introduced.
 */
export class OrderService {
  static placeOrder(
    items: CartItem[],
    shipping: ShippingAddress,
    shippingMethod: string,
    subtotal: number,
    discount: number,
    shippingCost: number,
    total: number
  ): Order {
    return {
      orderNumber: OrderService.generateOrderNumber(),
      placedAt: new Date(),
      items,
      shipping,
      shippingMethod,
      subtotal,
      discount,
      shippingCost,
      total,
    };
  }

  private static generateOrderNumber(): string {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `#BM-${random}`;
  }
}
