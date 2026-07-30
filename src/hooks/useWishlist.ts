import { useSyncExternalStore } from 'react';
import { useServices } from './useServices';

export function useWishlist() {
  const { wishlist } = useServices();
  useSyncExternalStore(wishlist.subscribe, () => wishlist.count());

  return {
    products: wishlist.getProducts(),
    count: wishlist.count(),
    has: wishlist.has.bind(wishlist),
    toggle: wishlist.toggle.bind(wishlist),
    remove: wishlist.remove.bind(wishlist),
  };
}
