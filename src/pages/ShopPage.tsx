import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCatalog } from '../hooks/useCatalog';
import { ProductCard } from '../components/product/ProductCard';
import { SortOption } from '../core/services/ProductCatalog';
import { GridIcon, ListIcon, CartIcon } from '../components/common/Icons';

const CATEGORY_LABELS: Record<string, string> = {
  'v-shaped': 'Traditional V',
  hook: 'Hook',
  'question-mark': 'Question Mark',
  'tri-blade': 'Tri-blade',
  'four-wing': 'Four-wing',
  'multi-wing': 'Multi-wing',
  ring: 'Ring',
  delta: 'Delta',
  's-shaped': 'S-shaped',
};

export const ShopPage: React.FC = () => {
  const catalog = useCatalog();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') ?? 'all';
  const sort = (searchParams.get('sort') as SortOption) ?? 'featured';
  const query = searchParams.get('q') ?? '';
  const [priceMax, setPriceMax] = useState(200);

  const allCategories = catalog.getCategories();
  const results = useMemo(() => {
    return catalog.query({ category, sort, query }).filter((p) => p.price <= priceMax);
  }, [catalog, category, sort, query, priceMax]);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || value === '') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const headerTitle = query ? `Search results for "${query}"` : 'All Boomerangs';

  return (
    <div style={{ marginTop: 72 }}>
      <div className="page-header">
        <div className="container page-header-content">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <span className="current">{headerTitle}</span>
          </div>
          <h1 className="page-header-title t-display">{headerTitle}</h1>
          <p className="page-header-sub">The world's most complete collection of handcrafted boomerangs</p>
        </div>
      </div>
      <div className="container">
        <div className="shop-layout">
          <aside className="filter-sidebar">
            <div className="filter-section">
              <div className="filter-header">
                <span className="filter-header-title">Category</span>
              </div>
              <div className="filter-body">
                <div className="filter-option" onClick={() => setParam('category', 'all')}>
                  <label className="filter-option-label">
                    <input type="radio" name="cat" checked={category === 'all'} onChange={() => setParam('category', 'all')} /> All
                    Products
                  </label>
                  <span className="filter-count">{catalog.getAll().length}</span>
                </div>
                {allCategories.map((cat) => (
                  <div className="filter-option" key={cat.slug} onClick={() => setParam('category', cat.slug)}>
                    <label className="filter-option-label">
                      <input type="radio" name="cat" checked={category === cat.slug} onChange={() => setParam('category', cat.slug)} />{' '}
                      {CATEGORY_LABELS[cat.slug] ?? cat.label}
                    </label>
                    <span className="filter-count">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-section">
              <div className="filter-header">
                <span className="filter-header-title">Price Range</span>
              </div>
              <div className="filter-body">
                <div className="price-range">
                  <input
                    type="range"
                    className="range-slider"
                    min={0}
                    max={200}
                    value={priceMax}
                    onChange={(event) => setPriceMax(Number(event.target.value))}
                  />
                  <div className="range-vals">
                    <span>$0</span>
                    <span>${priceMax}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="filter-section">
              <div className="filter-header">
                <span className="filter-header-title">Skill Level</span>
              </div>
              <div className="filter-body">
                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((skill) => (
                  <div className="filter-option" key={skill}>
                    <label className="filter-option-label">
                      <input type="checkbox" /> {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-section">
              <div className="filter-header">
                <span className="filter-header-title">Material</span>
              </div>
              <div className="filter-body">
                {['Carbon Fiber', 'Fibreglass', 'Hardwood', 'ABS Polymer', 'EVA Foam'].map((material) => (
                  <div className="filter-option" key={material}>
                    <label className="filter-option-label">
                      <input type="checkbox" /> {material}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          <div>
            <div className="shop-toolbar">
              <span className="shop-toolbar-left">
                <span>
                  {results.length} product{results.length !== 1 ? 's' : ''}
                </span>
              </span>
              <div className="shop-toolbar-right">
                <select className="sort-select" value={sort} onChange={(event) => setParam('sort', event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <div className="view-toggle">
                  <button className="view-btn active" title="Grid view">
                    <GridIcon size={15} />
                  </button>
                  <button className="view-btn" title="List view">
                    <ListIcon size={15} />
                  </button>
                </div>
              </div>
            </div>
            {results.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: 'var(--chalk-dim)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, color: 'var(--chalk-dim)' }}>
                  <CartIcon size={40} />
                </div>
                <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, color: 'var(--chalk)', marginBottom: 8 }}>
                  No products found
                </div>
                <div>Try a different category or search term</div>
                <button className="btn btn-outline btn-sm mt-16" onClick={() => navigate('/shop')}>
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {results.map((product, i) => (
                  <ProductCard key={product.id} product={product} revealDelay={((i % 5) as 0 | 1 | 2 | 3 | 4) || undefined} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
