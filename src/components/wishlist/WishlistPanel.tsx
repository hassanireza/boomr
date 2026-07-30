import React from 'react';
import { CloseIcon } from '../common/Icons';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { useUI } from '../../hooks/useUI';
import { useToast } from '../../hooks/useToast';

export const WishlistPanel: React.FC = () => {
  const { active, close, open } = useUI();
  const { products, remove } = useWishlist();
  const { add } = useCart();
  const { show } = useToast();
  const isOpen = active === 'wishlist';

  return (
    <aside
      id="wishlist-panel"
      className={`side-panel${isOpen ? ' active' : ''}`}
      role="dialog"
      aria-label="Wishlist"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div className="panel-header">
        <h2 className="panel-title">Wishlist</h2>
        <button className="panel-close" onClick={close} aria-label="Close wishlist">
          <CloseIcon />
        </button>
      </div>
      <div className="panel-body" id="wishlist-body">
        {products.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">❤️</div>
            <div className="cart-empty-text">Your wishlist is empty</div>
            <div className="cart-empty-sub">Save items you love for later</div>
          </div>
        ) : (
          products.map((product) => (
            <div className="wishlist-item" key={product.id}>
              <div className="wishlist-item-img">
                <img
                  src={`${import.meta.env.BASE_URL}${product.primaryImage}`}
                  alt={product.name}
                  style={{ width: 40, height: 40, objectFit: 'contain' }}
                />
              </div>
              <div>
                <div className="wishlist-item-name">{product.name}</div>
                <div className="wishlist-item-price">{product.formattedPrice}</div>
              </div>
              <div className="wishlist-actions">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    add(product, 1);
                    show('Added to cart', product.name, 'success');
                    open('cart');
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-ghost btn-sm btn-icon"
                  style={{ color: 'var(--danger)' }}
                  onClick={() => remove(product.id)}
                  aria-label="Remove from wishlist"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};
