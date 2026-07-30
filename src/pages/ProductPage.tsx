import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCatalog } from '../hooks/useCatalog';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useToast } from '../hooks/useToast';
import { useUI } from '../hooks/useUI';
import { ProductCard } from '../components/product/ProductCard';

type Tab = 'description' | 'specs' | 'reviews' | 'shipping';

const STATIC_REVIEWS = [
  {
    name: 'Jordan K.',
    rating: 5,
    date: 'March 2025',
    text: 'Absolutely incredible flight path. Returns within a foot of where I threw it every single time. The build quality is exceptional.',
    verified: true,
  },
  {
    name: 'Mia S.',
    rating: 5,
    date: 'January 2025',
    text: 'Perfect for competition throwing. The weight distribution is outstanding and it handles light wind beautifully.',
    verified: true,
  },
  {
    name: 'Felix R.',
    rating: 4,
    date: 'February 2025',
    text: 'Great boomerang, very happy with the purchase. Just takes some practice to nail the release angle.',
    verified: false,
  },
];

const RATING_DISTRIBUTION = [
  { stars: 5, pct: 70 },
  { stars: 4, pct: 20 },
  { stars: 3, pct: 7 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
];

export const ProductPage: React.FC = () => {
  const { id } = useParams();
  const catalog = useCatalog();
  const navigate = useNavigate();
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { show } = useToast();
  const { open } = useUI();

  const product = catalog.getById(Number(id));
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product?.colors[0] ?? '');
  const [size, setSize] = useState(product?.sizes[0] ?? '');
  const [mainImage, setMainImage] = useState<'primary' | 'secondary'>('primary');
  const [tab, setTab] = useState<Tab>('description');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setQty(1);
      setColor(product.colors[0]);
      setSize(product.sizes[0]);
      setMainImage('primary');
      setTab('description');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container" style={{ marginTop: 140, textAlign: 'center', paddingBottom: 80 }}>
        <h1 className="t-display">Product not found</h1>
        <button className="btn btn-primary mt-16" onClick={() => navigate('/shop')}>
          Back to shop
        </button>
      </div>
    );
  }

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(product.rating));
  const related = catalog.getAll().filter((p) => p.catSlug !== product.catSlug && p.id !== product.id).slice(0, 4);
  const wished = has(product.id);
  const imageSrc = mainImage === 'primary' ? product.primaryImage : product.secondaryImage;

  return (
    <div style={{ marginTop: 72 }}>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/shop">Shop</Link>
            <span className="sep">/</span>
            <span className="current">{product.name}</span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="product-detail-layout">
          <div className="product-gallery">
            <div className="main-image">
              <img
                src={`${import.meta.env.BASE_URL}${imageSrc}`}
                alt={product.name}
                style={{ width: '70%', height: '70%', objectFit: 'contain', display: 'block', margin: '0 auto', transition: 'transform 0.4s ease' }}
                loading="eager"
                draggable={false}
              />
            </div>
            <div className="thumb-grid">
              {[
                ['primary', product.primaryImage, 'Main'],
                ['secondary', product.secondaryImage, 'Detail'],
              ].map(([type, src, label], i) => (
                <div
                  key={i}
                  className={`thumb${mainImage === type ? ' active' : ''}`}
                  onClick={() => setMainImage(type as 'primary' | 'secondary')}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${src}`}
                    alt={`${product.name} ${label} view`}
                    style={{ width: '50%', height: '50%', objectFit: 'contain', margin: '0 auto', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-info">
            <div className="product-category-tag">● {product.category}</div>
            <h1 className="product-title t-display">{product.name}</h1>
            <div className="product-rating-row">
              <div className="stars">
                {stars.map((filled, i) => (
                  <span key={i} className={`star${filled ? '' : ' empty'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span style={{ fontFamily: 'var(--ff-mono)', fontSize: '0.85rem', color: 'var(--chalk)' }}>{product.rating}</span>
              <a className="review-link" href="#reviews" onClick={(e) => { e.preventDefault(); setTab('reviews'); }}>
                {product.reviews} reviews
              </a>
            </div>
            <div className="product-price-row">
              <span className="product-price-main">{product.formattedPrice}</span>
              {product.formattedOriginalPrice && <span className="product-price-old">{product.formattedOriginalPrice}</span>}
              {product.isOnSale && <span className="product-discount">-{product.discountPercent}%</span>}
            </div>
            <p className="product-desc">{product.description}</p>

            <div className="product-options">
              <div className="option-label">
                Color <span>{color}</span>
              </div>
              <div className="option-swatches">
                {product.colors.map((c) => (
                  <div key={c} className={`swatch${c === color ? ' active' : ''}`} onClick={() => setColor(c)}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
            <div className="product-options">
              <div className="option-label">
                Size <span>{size}</span>
              </div>
              <div className="option-swatches">
                {product.sizes.map((s) => (
                  <div key={s} className={`swatch${s === size ? ' active' : ''}`} onClick={() => setSize(s)}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="add-row">
              <div className="qty-select">
                <button className="qty-select-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  -
                </button>
                <span className="qty-select-num">{qty}</span>
                <button className="qty-select-btn" onClick={() => setQty((q) => q + 1)}>
                  +
                </button>
              </div>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  add(product, qty, color, size);
                  show('Added to cart', `${qty} x ${product.name}`, 'success');
                  open('cart');
                }}
              >
                🛒 Add to Cart
              </button>
              <button
                className={`btn btn-outline btn-icon${wished ? ' active' : ''}`}
                style={{ fontSize: '1.1rem' }}
                aria-label="Wishlist"
                onClick={() => {
                  const nowSaved = toggle(product.id);
                  show(nowSaved ? 'Saved to wishlist' : 'Removed from wishlist', product.name, nowSaved ? 'success' : 'info');
                }}
              >
                ❤
              </button>
            </div>

            <div className="trust-row">
              <div className="trust-item">
                <span className="ti">✓</span> In Stock
              </div>
              <div className="trust-item">
                <span className="ti">✓</span> Free returns 30 days
              </div>
              <div className="trust-item">
                <span className="ti">✓</span> Secure checkout
              </div>
            </div>

            <div className="product-meta">
              <div className="meta-row">
                <span className="meta-icon">📦</span>
                <span>
                  Ships in <strong>1-3 business days</strong> worldwide
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-icon">📦</span>
                <span>
                  SKU: <strong>{product.sku}</strong>
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-icon">🏷</span>
                <span>
                  Tags:{' '}
                  {product.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            <div className="product-specs">
              {Object.entries(product.specs).map(([key, value]) => (
                <div className="spec-row" key={key}>
                  <div className="spec-key">{key}</div>
                  <div className="spec-val">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 64 }}>
          <div className="product-tabs">
            <button className={`product-tab${tab === 'description' ? ' active' : ''}`} onClick={() => setTab('description')}>
              Description
            </button>
            <button className={`product-tab${tab === 'specs' ? ' active' : ''}`} onClick={() => setTab('specs')}>
              Specifications
            </button>
            <button id="reviews" className={`product-tab${tab === 'reviews' ? ' active' : ''}`} onClick={() => setTab('reviews')}>
              Reviews ({product.reviews})
            </button>
            <button className={`product-tab${tab === 'shipping' ? ' active' : ''}`} onClick={() => setTab('shipping')}>
              Shipping &amp; Returns
            </button>
          </div>

          {tab === 'description' && (
            <div className="tab-panel active">
              <p style={{ color: 'var(--chalk-dim)', lineHeight: 1.8, fontSize: '0.9375rem', maxWidth: 720 }}>{product.description}</p>
              <p style={{ color: 'var(--chalk-dim)', lineHeight: 1.8, fontSize: '0.9375rem', maxWidth: 720, marginTop: 16 }}>
                Every BOOMR. product is crafted to the highest standards. Our team of aerodynamics engineers and professional
                throwers collaborate on each design to achieve the perfect balance between visual impact and true return flight
                performance. The {product.name} has been through over 2,000 test throws before reaching you.
              </p>
            </div>
          )}

          {tab === 'specs' && (
            <div className="tab-panel active">
              <div className="product-specs" style={{ maxWidth: 480 }}>
                {Object.entries(product.specs).map(([key, value]) => (
                  <div className="spec-row" key={key}>
                    <div className="spec-key">{key}</div>
                    <div className="spec-val">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="tab-panel active">
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 40, alignItems: 'flex-start', marginBottom: 32 }}>
                <div style={{ textAlign: 'center', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 24 }}>
                  <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: '3rem', color: 'var(--chalk)' }}>{product.rating}</div>
                  <div className="stars" style={{ justifyContent: 'center', margin: '8px 0' }}>
                    {stars.map((filled, i) => (
                      <span key={i} className={`star${filled ? '' : ' empty'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--chalk-dim)' }}>{product.reviews} reviews</div>
                  <div style={{ marginTop: 16 }}>
                    {RATING_DISTRIBUTION.map((row) => (
                      <div className="rating-bar-row" key={row.stars}>
                        <span className="rating-bar-label">{row.stars}</span>
                        <div className="rating-bar-bar">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${row.pct}%` }} />
                          </div>
                        </div>
                        <span className="rating-bar-count">{row.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  {STATIC_REVIEWS.map((review) => (
                    <div className="review-card" key={review.name}>
                      <div className="review-header">
                        <div>
                          <div className="reviewer-name">{review.name}</div>
                          <div className="stars" style={{ marginTop: 4 }}>
                            {Array.from({ length: 5 }, (_, i) => (
                              <span key={i} className={`star${i < review.rating ? '' : ' empty'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="review-date">{review.date}</div>
                      </div>
                      <p className="review-body">{review.text}</p>
                      {review.verified && <div className="review-verified">✓ Verified Purchase</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'shipping' && (
            <div className="tab-panel active">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 720 }}>
                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 24 }}>
                  <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, color: 'var(--chalk)', marginBottom: 12 }}>📦 Shipping</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                    <li>✓ Standard (5-7 days): $9.99</li>
                    <li>✓ Express (2-3 days): $19.99</li>
                    <li>✓ Overnight: $34.99</li>
                    <li>✓ Free on orders over $100</li>
                    <li>✓ Ships to 60+ countries</li>
                  </ul>
                </div>
                <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 24 }}>
                  <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, color: 'var(--chalk)', marginBottom: 12 }}>↩️ Returns</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.875rem', color: 'var(--chalk-dim)' }}>
                    <li>✓ 30-day return window</li>
                    <li>✓ Full refund on unused items</li>
                    <li>✓ Free return label provided</li>
                    <li>✓ Exchange for any product</li>
                    <li>✓ Defect warranty: 1 year</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="section">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 32 }}>
            <span className="section-eyebrow">You might also like</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Related Products
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
