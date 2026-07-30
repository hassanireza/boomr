import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Footer } from './components/layout/Footer';
import { ScrollToTopButton } from './components/layout/ScrollToTopButton';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { CustomCursor } from './components/layout/CustomCursor';
import { OverlayBackdrop } from './components/common/OverlayBackdrop';
import { ToastContainer } from './components/common/ToastContainer';
import { ScrollRestoration } from './components/common/ScrollRestoration';
import { CartPanel } from './components/cart/CartPanel';
import { WishlistPanel } from './components/wishlist/WishlistPanel';
import { SearchOverlay } from './components/search/SearchOverlay';
import { LoginModal } from './components/auth/LoginModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderConfirmationModal } from './components/checkout/OrderConfirmationModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Order } from './core/services/OrderService';
import { useUI } from './hooks/useUI';

const App: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const { open } = useUI();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <CustomCursor />
      <LoadingScreen />
      <ToastContainer />
      <OverlayBackdrop />
      <CartPanel />
      <WishlistPanel />
      <SearchOverlay />
      <LoginModal />
      <CheckoutModal
        onOrderPlaced={(placedOrder) => {
          setOrder(placedOrder);
          open('orderConfirmed');
        }}
      />
      <OrderConfirmationModal order={order} />

      <ScrollRestoration />
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default App;
