import React, { useState } from 'react';
import { CloseIcon, CartIcon, TrashIcon } from '../common/Icons';
import { useCart } from '../../hooks/useCart';
import { useUI } from '../../hooks/useUI';
import { useToast } from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';

export const CartPanel: React.FC = () => {
  const { active, close, open } = useUI();
  const { items, subtotal, shipping, discount, total, couponCode, amountUntilFreeShipping, adjustQuantity, remove, applyCoupon } = useCart();
  const { show } = useToast();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(couponCode ?? '');
  const isOpen = active === 'cart';

  const handleApplyCoupon = () => {
    const result = applyCoupon(coupon);
    show(result.success ? 'Coupon applied' : 'Invalid code', result.message, result.success ? 'success' : 'error');
  };

  return (
    <aside
      id="cart-panel"
      className={`side-panel${isOpen ? ' active' : ''}`}
      role="dialog"
      aria-label="Shopping cart"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div className="panel-header">
        <h2 className="panel-title">Your Cart</h2>
        <button className="panel-close" onClick={close} aria-label="Close cart">
          <CloseIcon />
        </button>
      </div>
      <div className="panel-body" id="cart-body">
        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon"><CartIcon size={40} /></div>
            <div className="cart-empty-text">Your cart is empty</div>
            <div className="cart-empty-sub">Add some boomerangs to get started</div>
            <button
              className="btn btn-primary btn-sm mt-16"
              onClick={() => {
                close();
                navigate('/shop');
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          items.map((item) => (
            <div className="cart-item" key={item.key}>
              <div className="cart-item-img">
                <img
                  src={`${import.meta.env.BASE_URL}${item.product.primaryImage}`}
                  alt={item.product.name}
                  style={{ width: 50, height: 50, objectFit: 'contain' }}
                />
              </div>
              <div className="cart-item-info">
                <div className="cart-item-name">{item.product.name}</div>
                <div className="cart-item-variant">{item.product.category}</div>
                <div className="cart-item-price">${item.lineTotal.toFixed(2)}</div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => adjustQuantity(item.key, -1)} aria-label="Decrease quantity">
                    -
                  </button>
                  <span className="qty-num">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => adjustQuantity(item.key, 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>
              </div>
              <button className="cart-item-remove" onClick={() => remove(item.key)} aria-label="Remove item">
                <TrashIcon size={15} />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="panel-footer" id="cart-footer" style={{ display: items.length === 0 ? 'none' : 'block' }}>
        <div className="coupon-row">
          <input
            className="coupon-input"
            placeholder="Discount code"
            value={coupon}
            onChange={(event) => setCoupon(event.target.value)}
          />
          <button className="btn btn-outline btn-sm" onClick={handleApplyCoupon}>
            Apply
          </button>
        </div>
        <div className="cart-summary-line">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="cart-summary-line" style={{ color: 'var(--success)' }}>
            <span>Discount ({couponCode})</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="cart-summary-line">
          <span>Shipping</span>
          <span>{shipping === 0 ? <span style={{ color: 'var(--success)' }}>Free</span> : `$${shipping.toFixed(2)}`}</span>
        </div>
        {shipping > 0 && (
          <div style={{ fontSize: '0.75rem', color: 'var(--chalk-dim)', margin: '-8px 0 4px' }}>
            Add ${amountUntilFreeShipping.toFixed(2)} more for free shipping
          </div>
        )}
        <div className="cart-summary-line total">
          <span>Total</span>
          <span className="amount">${total.toFixed(2)}</span>
        </div>
        <button
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 16 }}
          onClick={() => open('checkout')}
        >
          Proceed to Checkout
        </button>
        <button className="btn btn-ghost" style={{ width: '100%', marginTop: 8, fontSize: '0.8rem' }} onClick={close}>
          Continue Shopping
        </button>
      </div>
    </aside>
  );
};
