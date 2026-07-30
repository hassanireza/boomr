import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '../common/Icons';
import { useUI } from '../../hooks/useUI';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { open: openOverlay } = useUI();

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className={`mobile-nav${open ? ' open' : ''}`} role="dialog" aria-label="Mobile menu" aria-modal="true">
      <button className="mobile-nav-close" onClick={onClose} aria-label="Close menu">
        <CloseIcon />
      </button>
      <a
        href="/"
        onClick={(event) => {
          event.preventDefault();
          go('/');
        }}
      >
        Home
      </a>
      <a
        href="/shop"
        onClick={(event) => {
          event.preventDefault();
          go('/shop');
        }}
      >
        Shop
      </a>
      <a
        href="/#categories"
        onClick={(event) => {
          event.preventDefault();
          go('/');
        }}
      >
        Collections
      </a>
      <a
        href="/#about"
        onClick={(event) => {
          event.preventDefault();
          go('/');
        }}
      >
        About
      </a>
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          openOverlay('login');
          onClose();
        }}
      >
        Sign In
      </a>
    </div>
  );
};
