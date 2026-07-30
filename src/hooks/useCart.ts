import { useSyncExternalStore } from 'react';
import { useServices } from './useServices';
import { CouponResult } from '../core/services/CartService';

/**
 * Coupon codes only ever contain letters and digits in this store.
 * Stripping anything else client-side means a stray space or symbol
 * pasted into the field never gets sent to the service layer.
 */
const COUPON_SANITIZE_REGEX = /[^A-Za-z0-9]/g;

export function sanitizeCouponCode(raw: string): string {
  return raw.replace(COUPON_SANITIZE_REGEX, '').toUpperCase();
}

/**
 * useCart binds a component to the CartService singleton. Every
 * public method on the service is re-exposed here so components
 * never touch the class instance's internals directly.
 */
export function useCart() {
  const { cart } = useServices();
  useSyncExternalStore(cart.subscribe, () => cart.getItemCount());

  const applyCoupon = (code: string): CouponResult => {
    const clean = sanitizeCouponCode(code);
    if (clean.length === 0) {
      return { success: false, message: 'Enter a coupon code first.' };
    }
    return cart.applyCoupon(clean);
  };

  return {
    items: cart.getItems(),
    count: cart.getItemCount(),
    subtotal: cart.getSubtotal(),
    shipping: cart.getShippingCost(),
    discount: cart.getDiscount(),
    tax: cart.getTax(),
    total: cart.getTotal(),
    couponCode: cart.getCouponCode(),
    amountUntilFreeShipping: cart.amountUntilFreeShipping,
    add: cart.add.bind(cart),
    remove: cart.remove.bind(cart),
    setQuantity: cart.setQuantity.bind(cart),
    adjustQuantity: cart.adjustQuantity.bind(cart),
    clear: cart.clear.bind(cart),
    applyCoupon,
    removeCoupon: cart.removeCoupon.bind(cart),
  };
}
