import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BoomrLogoMark, InstagramIcon, YoutubeIcon, XIcon, TiktokIcon } from '../common/Icons';
import { useToast } from '../../hooks/useToast';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { show } = useToast();

  const info = (title: string, message: string) => show(title, message, 'info');

  return (
    <footer role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a
              className="nav-logo"
              href="/"
              onClick={(event) => {
                event.preventDefault();
                navigate('/');
              }}
              aria-label="BOOMR. home"
            >
              <BoomrLogoMark />
              BOOMR<span className="logo-dot">.</span>
            </a>
            <p className="footer-brand-desc">
              The world's most complete collection of precision crafted boomerangs. Engineered for the perfect return
              since 2008.
            </p>
            <div className="social-links" aria-label="Social media links">
              <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); info('Follow us', '@boomrofficial on all platforms'); }} aria-label="Instagram"><InstagramIcon size={17} /></a>
              <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); info('Follow us', '@boomrofficial on all platforms'); }} aria-label="YouTube"><YoutubeIcon size={17} /></a>
              <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); info('Follow us', '@boomrofficial on all platforms'); }} aria-label="Twitter / X"><XIcon size={15} /></a>
              <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); info('Follow us', '@boomrofficial on all platforms'); }} aria-label="TikTok"><TiktokIcon size={17} /></a>
            </div>
            <div className="payment-icons" aria-label="Accepted payment methods">
              <div className="payment-icon" title="Visa">VISA</div>
              <div className="payment-icon" title="Mastercard">MC</div>
              <div className="payment-icon" title="American Express">AMEX</div>
              <div className="payment-icon" title="PayPal">PP</div>
              <div className="payment-icon" title="Apple Pay">Pay</div>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Shop</div>
            <nav className="footer-links" aria-label="Shop links">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop'); }}>All Boomerangs</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop?category=v-shaped'); }}>Traditional V-Wing</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop?category=ring'); }}>Ring Boomerangs</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop?category=delta'); }}>Delta Boomerangs</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop?sort=price-asc'); }}>Under $50</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop?sort=rating'); }}>Best Sellers</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shop?category=multi-wing'); }}>Competition Grade</a>
            </nav>
          </div>
          <div>
            <div className="footer-col-title">Support</div>
            <nav className="footer-links" aria-label="Support links">
              <a href="#" onClick={(e) => { e.preventDefault(); info('Help Center', 'Opens in a new tab'); }}>Help Center</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Contact', 'support@boomr.co'); }}>Contact Us</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Shipping', 'Details on every product page'); }}>Shipping Info</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Returns', '30 days, free label'); }}>Returns &amp; Exchanges</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Warranty', '1-year manufacturer warranty'); }}>Warranty</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Size Guide', 'Opening size guide'); }}>Size Guide</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Track', 'Enter order number at checkout'); }}>Track Your Order</a>
            </nav>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <nav className="footer-links" aria-label="Company links">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); window.setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 60); }}>Our Story</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Careers', 'No open positions currently'); }}>Careers</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Press', 'press@boomr.co'); }}>Press</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Affiliates', 'Coming soon'); }}>Affiliate Program</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Wholesale', 'wholesale@boomr.co'); }}>Wholesale</a>
              <a href="#" onClick={(e) => { e.preventDefault(); info('Journal', 'Coming summer'); }}>Journal</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} BOOMR. All rights reserved.</div>
          <div className="footer-legal">
            <a href="#" onClick={(e) => { e.preventDefault(); info('Privacy Policy', 'Available at boomr.co/privacy'); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); info('Terms', 'Available at boomr.co/terms'); }}>Terms of Service</a>
            <a href="#" onClick={(e) => { e.preventDefault(); show('Cookies', 'Preferences saved', 'success'); }}>Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
