import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../core/models/Product';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useToast } from '../../hooks/useToast';
import { useReveal } from '../../hooks/useReveal';

interface ProductCardProps {
  product: Product;
  revealDelay?: 1 | 2 | 3 | 4 | 5;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, revealDelay }) => {
  const navigate = useNavigate();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { show } = useToast();
  const ref = useReveal<HTMLDivElement>();
  const wished = has(product.id);
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating));

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    add(product, 1);
    show('Added to cart', `${product.name} is in your cart.`, 'success');
  };

  const handleToggleWishlist = (event: React.MouseEvent) => {
    event.stopPropagation();
    const nowSaved = toggle(product.id);
    show(
      nowSaved ? 'Saved to wishlist' : 'Removed from wishlist',
      product.name,
      nowSaved ? 'success' : 'info'
    );
  };

  return (
    <div
      ref={ref}
      className={`product-card reveal${revealDelay ? ` reveal-delay-${revealDelay}` : ''}`}
      onClick={() => navigate(`/product/${product.id}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') navigate(`/product/${product.id}`);
      }}
    >
      <div className="product-card-image">
        <div className="card-badges">
          {product.badge && <span className={`badge-tag badge-${product.badge}`}>{product.badge}</span>}
        </div>
        <button
          className={`card-wish ${wished ? 'active' : ''}`}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={handleToggleWishlist}
        >
          ❤
        </button>
        <img
          src={`${import.meta.env.BASE_URL}${product.primaryImage}`}
          alt={product.name}
          loading="lazy"
          draggable={false}
          style={{ width: '65%', height: '65%', objectFit: 'contain', margin: '0 auto' }}
        />
        <div className="hover-img">
          <img
            src={`${import.meta.env.BASE_URL}${product.secondaryImage}`}
            alt={`${product.name} alternate view`}
            loading="lazy"
            draggable={false}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      </div>
      <div className="card-body">
        <div className="card-category">{product.category}</div>
        <div className="card-name">{product.name}</div>
        <div className="card-rating">
          <div className="stars">
            {stars.map((filled, i) => (
              <span key={i} className={`star${filled ? '' : ' empty'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="card-price">
          <div>
            <span className="price-main">{product.formattedPrice}</span>
            {product.formattedOriginalPrice && <span className="price-old">{product.formattedOriginalPrice}</span>}
          </div>
          <button className="add-to-cart-btn" aria-label="Add to cart" onClick={handleAddToCart}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};
