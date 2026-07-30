import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BoomrLogoMark, SearchIcon, UserIcon, HeartIcon, CartIcon } from '../common/Icons';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useUI } from '../../hooks/useUI';
import { MobileNav } from './MobileNav';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { open } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <Link className="nav-logo" to="/" aria-label="BOOMR. home">
          <BoomrLogoMark />
          BOOMR<span className="logo-dot">.</span>
        </Link>
        <ul className="nav-links" role="list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <a
              href="/#categories"
              onClick={(event) => {
                event.preventDefault();
                navigate('/');
                window.setTimeout(() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' }), 60);
              }}
            >
              Collections
            </a>
          </li>
          <li>
            <a
              href="/#about"
              onClick={(event) => {
                event.preventDefault();
                navigate('/');
                window.setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 60);
              }}
            >
              About
            </a>
          </li>
        </ul>
        <div className="nav-actions">
          <button className="nav-icon-btn" onClick={() => open('search')} aria-label="Search" title="Search">
            <SearchIcon />
          </button>
          <button className="nav-icon-btn" onClick={() => open('login')} aria-label="Account">
            <UserIcon />
          </button>
          <button className="nav-icon-btn" onClick={() => open('wishlist')} aria-label="Wishlist">
            <HeartIcon />
            <span className="badge wishlist-badge" style={{ display: wishCount > 0 ? 'flex' : 'none' }}>
              {wishCount}
            </span>
          </button>
          <button className="nav-icon-btn" onClick={() => open('cart')} aria-label="Cart">
            <CartIcon />
            <span className="badge cart-badge" style={{ display: cartCount > 0 ? 'flex' : 'none' }}>
              {cartCount}
            </span>
          </button>
          <button className="btn-nav-cta" onClick={() => navigate('/shop')}>
            Shop Now
          </button>
          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};
