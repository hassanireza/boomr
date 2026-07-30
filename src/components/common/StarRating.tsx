import React from 'react';

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, reviews, size = 14 }) => {
  const rounded = Math.round(rating);
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span aria-hidden="true" style={{ fontSize: size, color: 'var(--ochre)', letterSpacing: '1px' }}>
        {'★'.repeat(rounded)}
        <span style={{ opacity: 0.25 }}>{'★'.repeat(5 - rounded)}</span>
      </span>
      {typeof reviews === 'number' && (
        <span style={{ fontSize: '0.75rem', color: 'var(--chalk-dim)', fontFamily: 'var(--ff-mono)' }}>({reviews})</span>
      )}
    </div>
  );
};
