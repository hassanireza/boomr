import { createContext } from 'react';
import { ProductCatalog } from './services/ProductCatalog';
import { CartService } from './services/CartService';
import { WishlistService } from './services/WishlistService';
import { ToastService } from './services/ToastService';
import { AuthService } from './services/AuthService';
import { UIStateService } from './services/UIStateService';

export interface Services {
  catalog: ProductCatalog;
  cart: CartService;
  wishlist: WishlistService;
  toast: ToastService;
  auth: AuthService;
  ui: UIStateService;
}

export const ServicesReactContext = createContext<Services | null>(null);
