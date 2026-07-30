import React, { useState } from 'react';
import { CloseIcon } from '../common/Icons';
import { useUI } from '../../hooks/useUI';
import { useCart } from '../../hooks/useCart';
import { useToast } from '../../hooks/useToast';
import { OrderService, Order, ShippingAddress } from '../../core/services/OrderService';

type ShippingMethod = 'standard' | 'express' | 'overnight';
type PaymentMethod = 'card' | 'paypal' | 'apple' | 'crypto';

const SHIPPING_COSTS: Record<ShippingMethod, number> = {
  standard: 9.99,
  express: 19.99,
  overnight: 34.99,
};

interface CheckoutModalProps {
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderPlaced }) => {
  const { active, close } = useUI();
  const { items, subtotal, discount, couponCode, clear } = useCart();
  const { show } = useToast();
  const isOpen = active === 'checkout';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const shippingCost = items.length > 0 && subtotal >= 100 && shippingMethod === 'standard' ? 0 : SHIPPING_COSTS[shippingMethod];
  const total = subtotal - discount + shippingCost;

  const formatCard = (value: string) => value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (value: string) => {
    let digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) digits = `${digits.slice(0, 2)} / ${digits.slice(2)}`;
    return digits;
  };

  const handlePlaceOrder = () => {
    if (!firstName || !lastName || !email || !address || !city || !zip || !country) {
      show('Missing information', 'Please fill in all required shipping fields.', 'error');
      return;
    }
    if (paymentMethod === 'card' && (!cardNumber || !expiry || !cvv || !cardName)) {
      show('Missing payment details', 'Please complete your card information.', 'error');
      return;
    }
    const shipping: ShippingAddress = { firstName, lastName, email, phone, address, address2, city, zip, state, country };
    const order = OrderService.placeOrder(items, shipping, shippingMethod, subtotal, discount, shippingCost, total);
    clear();
    onOrderPlaced(order);
  };

  return (
    <div className={`modal-overlay${isOpen ? ' active' : ''}`} role="dialog" aria-label="Checkout" aria-modal="true">
      <div className="modal modal-wide">
        <button className="modal-close" onClick={close} aria-label="Close">
          <CloseIcon />
        </button>
        <h2 className="modal-title">Checkout</h2>
        <div className="checkout-layout">
          <div>
            <form onSubmit={(event) => event.preventDefault()}>
              <div className="checkout-form-section">
                <div className="checkout-section-title">
                  <span className="step-badge">1</span> Contact Information
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-first">
                      First name <span className="required">*</span>
                    </label>
                    <input id="co-first" className="form-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-last">
                      Last name <span className="required">*</span>
                    </label>
                    <input id="co-last" className="form-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="co-email">
                    Email <span className="required">*</span>
                  </label>
                  <input id="co-email" className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="co-phone">
                    Phone
                  </label>
                  <input id="co-phone" className="form-input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="checkout-form-section">
                <div className="checkout-section-title">
                  <span className="step-badge">2</span> Shipping Address
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="co-addr">
                    Street address <span className="required">*</span>
                  </label>
                  <input id="co-addr" className="form-input" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="co-addr2">
                    Apartment, suite, etc.
                  </label>
                  <input id="co-addr2" className="form-input" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-city">
                      City <span className="required">*</span>
                    </label>
                    <input id="co-city" className="form-input" value={city} onChange={(e) => setCity(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-zip">
                      ZIP / Postal code <span className="required">*</span>
                    </label>
                    <input id="co-zip" className="form-input" value={zip} onChange={(e) => setZip(e.target.value)} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-state">
                      State / Province
                    </label>
                    <input id="co-state" className="form-input" value={state} onChange={(e) => setState(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="co-country">
                      Country <span className="required">*</span>
                    </label>
                    <select id="co-country" className="form-input form-select" value={country} onChange={(e) => setCountry(e.target.value)} required>
                      <option value="">Select country</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: 8 }}>
                  <label className="form-label">Shipping Method</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(
                      [
                        ['standard', 'Standard (5-7 days)', 'Orders over $100 ship free', 9.99],
                        ['express', 'Express (2-3 days)', 'Tracked priority delivery', 19.99],
                        ['overnight', 'Overnight', 'Next business day delivery', 34.99],
                      ] as [ShippingMethod, string, string, number][]
                    ).map(([value, name, desc, price]) => (
                      <label
                        key={value}
                        className={`payment-option${shippingMethod === value ? ' selected' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <input type="radio" name="shipping" checked={shippingMethod === value} onChange={() => setShippingMethod(value)} />
                        <div>
                          <div className="payment-option-name">{name}</div>
                          <div className="payment-option-desc">{desc}</div>
                        </div>
                        <span className="payment-option-icon" style={{ fontSize: '0.9rem', fontFamily: 'var(--ff-mono)' }}>
                          ${price.toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="checkout-form-section">
                <div className="checkout-section-title">
                  <span className="step-badge">3</span> Payment Method
                </div>
                <div className="payment-method-options">
                  {(
                    [
                      ['card', 'Credit / Debit Card', 'Visa, Mastercard, Amex, Discover'],
                      ['paypal', 'PayPal', 'Pay via your PayPal account'],
                      ['apple', 'Apple Pay', 'Touch ID or Face ID'],
                      ['crypto', 'Cryptocurrency', 'BTC, ETH, USDC accepted'],
                    ] as [PaymentMethod, string, string][]
                  ).map(([value, name, desc]) => (
                    <div
                      key={value}
                      className={`payment-option${paymentMethod === value ? ' selected' : ''}`}
                      onClick={() => setPaymentMethod(value)}
                    >
                      <input type="radio" name="payment" checked={paymentMethod === value} readOnly />
                      <div>
                        <div className="payment-option-name">{name}</div>
                        <div className="payment-option-desc">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {paymentMethod === 'card' && (
                  <div className="card-fields" id="card-fields">
                    <div className="form-group" style={{ marginTop: 20 }}>
                      <label className="form-label" htmlFor="co-card">
                        Card number <span className="required">*</span>
                      </label>
                      <input
                        id="co-card"
                        className="form-input"
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCard(e.target.value))}
                        autoComplete="cc-number"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="co-expiry">
                          Expiry date <span className="required">*</span>
                        </label>
                        <input
                          id="co-expiry"
                          className="form-input"
                          maxLength={7}
                          placeholder="MM / YY"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          autoComplete="cc-exp"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="co-cvv">
                          CVV <span className="required">*</span>
                        </label>
                        <input
                          id="co-cvv"
                          className="form-input"
                          type="password"
                          maxLength={4}
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          autoComplete="cc-csc"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="co-name-card">
                        Name on card <span className="required">*</span>
                      </label>
                      <input id="co-name-card" className="form-input" value={cardName} onChange={(e) => setCardName(e.target.value)} autoComplete="cc-name" />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: '0.8125rem', color: 'var(--chalk-dim)' }}>
                <span style={{ color: 'var(--success)', fontSize: '1rem' }}>🔒</span>
                Your payment information is encrypted with 256-bit SSL
              </div>
              <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handlePlaceOrder} type="button">
                🔒 Place Order
              </button>
            </form>
          </div>
          <div>
            <div className="order-summary-card">
              <div className="order-summary-title">Order Summary</div>
              <div>
                {items.map((item) => (
                  <div key={item.key} className="order-item">
                    <div className="order-item-img">
                      <img
                        src={`${import.meta.env.BASE_URL}${item.product.primaryImage}`}
                        alt={item.product.name}
                        style={{ width: 32, height: 32, objectFit: 'contain' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{item.product.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--chalk-dim)' }}>Qty {item.quantity}</div>
                    </div>
                    <div style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.8125rem' }}>${item.lineTotal.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
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
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="cart-summary-line total">
                  <span>Total</span>
                  <span className="amount">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
