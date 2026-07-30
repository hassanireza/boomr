import React from 'react';
import { StarIcon } from './Icons';

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, reviews, size = 14 }) => {
  const rounded = Math.round(rating);
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span aria-hidden="true" style={{ display: 'inline-flex', gap: 2, color: 'var(--ochre)' }}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} size={size} filled={i < rounded} style={i < rounded ? undefined : { opacity: 0.25 }} />
        ))}
      </span>
      {typeof reviews === 'number' && (
        <span style={{ fontSize: '0.75rem', color: 'var(--chalk-dim)', fontFamily: 'var(--ff-mono)' }}>({reviews})</span>
      )}
    </div>
  );
};
