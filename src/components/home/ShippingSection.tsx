import React from 'react';

const COUNTRIES = [
  '🇺🇸 USA', '🇬🇧 UK', '🇦🇺 Australia', '🇨🇦 Canada', '🇩🇪 Germany', '🇫🇷 France',
  '🇯🇵 Japan', '🇰🇷 South Korea', '🇧🇷 Brazil', '🇲🇽 Mexico', '🇮🇹 Italy', '🇪🇸 Spain',
  '🇳🇿 New Zealand', '🇸🇪 Sweden', '🇳🇴 Norway', '🇩🇰 Denmark', '🇿🇦 South Africa', '🇮🇳 India',
  '+ 42 more',
];

export const ShippingSection: React.FC = () => (
  <section className="section-sm">
    <div className="shipping-section">
      <div className="section-header" style={{ marginBottom: 24 }}>
        <span className="section-eyebrow">Worldwide delivery</span>
        <h2 className="section-title t-display" style={{ fontSize: '1.75rem' }}>
          We Ship Everywhere
        </h2>
        <p className="section-desc" style={{ fontSize: '0.875rem' }}>
          From Darwin to Denmark, your boomerang arrives safely.
        </p>
      </div>
      <div className="shipping-countries" role="list" aria-label="Countries we ship to">
        {COUNTRIES.map((country) => (
          <span className="country-tag" role="listitem" key={country}>
            {country}
          </span>
        ))}
      </div>
    </div>
  </section>
);
