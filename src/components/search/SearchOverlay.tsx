import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseIcon, SearchIcon } from '../common/Icons';
import { useCatalog } from '../../hooks/useCatalog';
import { useUI } from '../../hooks/useUI';

const TAGS = ['traditional', 'competition', 'beginner', 'ring', 'gift'];

export const SearchOverlay: React.FC = () => {
  const { active, close } = useUI();
  const catalog = useCatalog();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const isOpen = active === 'search';

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const results = catalog.search(query);

  const runSearch = (term: string) => {
    close();
    navigate(`/shop?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className={`search-overlay${isOpen ? ' active' : ''}`} role="dialog" aria-label="Search" aria-modal="true">
      <button className="search-close" onClick={close} aria-label="Close search">
        <CloseIcon />
      </button>
      <div className="search-input-wrapper">
        <input
          ref={inputRef}
          className="search-main-input"
          type="search"
          placeholder="Search boomerangs..."
          autoComplete="off"
          aria-label="Search products"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && query.trim()) runSearch(query);
          }}
        />
        <button className="search-submit" onClick={() => query.trim() && runSearch(query)} aria-label="Submit search">
          <SearchIcon />
        </button>
      </div>
      <div className="search-tags">
        {TAGS.map((tag) => (
          <span key={tag} className="search-tag" onClick={() => runSearch(tag)}>
            {tag[0].toUpperCase() + tag.slice(1)}
          </span>
        ))}
      </div>
      <div
        style={{
          marginTop: 32,
          maxWidth: 700,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))',
          gap: 12,
        }}
      >
        {results.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              close();
              navigate(`/product/${product.id}`);
            }}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              padding: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--surface)',
                borderRadius: 'var(--r-sm)',
                flexShrink: 0,
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}${product.primaryImage}`}
                alt={product.name}
                style={{ width: 32, height: 32, objectFit: 'contain' }}
              />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--chalk)' }}>
                {product.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ochre)', fontFamily: 'var(--ff-mono)' }}>
                {product.formattedPrice}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
