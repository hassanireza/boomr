import React, { useMemo } from 'react';
import { PRODUCT_RECORDS } from '../data/products';
import { ProductCatalog } from './services/ProductCatalog';
import { CartService } from './services/CartService';
import { WishlistService } from './services/WishlistService';
import { ToastService } from './services/ToastService';
import { AuthService } from './services/AuthService';
import { UIStateService } from './services/UIStateService';
import { ServicesReactContext, Services } from './servicesContextInstance';

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const services = useMemo<Services>(() => {
    const catalog = new ProductCatalog(PRODUCT_RECORDS);
    return {
      catalog,
      cart: CartService.getInstance(catalog.getAll()),
      wishlist: WishlistService.getInstance(catalog.getAll()),
      toast: ToastService.getInstance(),
      auth: AuthService.getInstance(),
      ui: UIStateService.getInstance(),
    };
  }, []);

  return <ServicesReactContext.Provider value={services}>{children}</ServicesReactContext.Provider>;
};
