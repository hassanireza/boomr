import React from 'react';
import { useUI } from '../../hooks/useUI';

export const OverlayBackdrop: React.FC = () => {
  const { active, close } = useUI();
  const isPanel = active === 'cart' || active === 'wishlist';
  if (!active) return null;

  return <div className={`overlay${active ? ' active' : ''}`} onClick={isPanel ? close : undefined} />;
};
