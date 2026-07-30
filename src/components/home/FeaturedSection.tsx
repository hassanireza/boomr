import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalog } from '../../hooks/useCatalog';
import { ProductCard } from '../product/ProductCard';

export const FeaturedSection: React.FC = () => {
  const catalog = useCatalog();
  const navigate = useNavigate();
  const featured = catalog.getFeatured(4);

  return (
    <section className="section section-dark" aria-labelledby="featured-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Hand-picked</span>
          <h2 id="featured-heading" className="section-title t-display">
            Featured Boomerangs
          </h2>
          <p className="section-desc">Our team's current favourites for performance, beauty, and sheer throwing joy.</p>
          <div className="divider" aria-hidden="true" />
        </div>
        <div className="products-grid">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} revealDelay={((i % 5) as 0 | 1 | 2 | 3 | 4) || undefined} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button className="btn btn-outline btn-lg" onClick={() => navigate('/shop')}>
            View All {catalog.getAll().length} Boomerangs
          </button>
        </div>
      </div>
    </section>
  );
};
