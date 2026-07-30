import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalog } from '../../hooks/useCatalog';
import { useReveal } from '../../hooks/useReveal';

const DISPLAY_CATEGORIES: { name: string; slug: string; imageKey: string }[] = [
  { name: 'Traditional', slug: 'v-shaped', imageKey: 'v-shape' },
  { name: 'Hook-shaped', slug: 'hook', imageKey: 'hook' },
  { name: 'Question Mark', slug: 'question-mark', imageKey: 'question-mark' },
  { name: 'Tri-blade', slug: 'tri-blade', imageKey: 'tri-blade' },
  { name: 'Four-wing', slug: 'four-wing', imageKey: 'four-wing' },
  { name: 'Five-wing', slug: 'multi-wing', imageKey: 'five-wing' },
  { name: 'Ring', slug: 'ring', imageKey: 'ring' },
  { name: 'Delta', slug: 'delta', imageKey: 'delta' },
  { name: 'S-shaped', slug: 's-shaped', imageKey: 's-shape' },
];

const CategoryCard: React.FC<{ name: string; slug: string; imageKey: string; count: number }> = ({ name, slug, imageKey, count }) => {
  const navigate = useNavigate();
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="product-card reveal"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/shop?category=${slug}`)}
      role="link"
      tabIndex={0}
    >
      <div className="product-card-image" style={{ aspectRatio: '1.2' }}>
        <img
          src={`${import.meta.env.BASE_URL}images/products/${imageKey}-1.png`}
          alt={name}
          style={{ width: '55%', height: '55%', objectFit: 'contain', margin: '0 auto' }}
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="card-body">
        <div className="card-name">{name}</div>
        <div className="t-muted" style={{ fontSize: '0.8125rem', fontFamily: 'var(--ff-mono)' }}>
          {count} products
        </div>
      </div>
    </div>
  );
};

export const CategoriesSection: React.FC = () => {
  const catalog = useCatalog();
  const counts = new Map(catalog.getCategories().map((c) => [c.slug, c.count]));

  return (
    <section className="section" id="categories" aria-labelledby="categories-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Browse by style</span>
          <h2 id="categories-heading" className="section-title t-display">
            Shop By Category
          </h2>
          <p className="section-desc">
            From micro indoor throwers to expert-level competition grade, we cover every style of boomerang flight.
          </p>
          <div className="divider" aria-hidden="true" />
        </div>
        <div className="grid-3">
          {DISPLAY_CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} count={counts.get(cat.slug) ?? 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
