import React, { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { useToast } from '../../hooks/useToast';

export const NewsletterSection: React.FC = () => {
  const ref = useReveal<HTMLDivElement>();
  const { show } = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    show('Subscribed!', 'Welcome to the BOOMR. community.', 'success');
    setEmail('');
  };

  return (
    <section className="section-sm">
      <div ref={ref} className="newsletter-section reveal" aria-labelledby="newsletter-heading">
        <span className="section-eyebrow">Join the community</span>
        <h2 id="newsletter-heading" className="section-title t-display">
          Throw Together.
        </h2>
        <p className="section-desc">
          Get early access to new boomerangs, exclusive discounts, and flight tips from our pros. No spam, ever.
          Unsubscribe anytime.
        </p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email address"
            required
            aria-label="Email address for newsletter"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
        <p style={{ fontSize: '0.75rem', color: 'var(--chalk-dim)', marginTop: 12 }}>
          Join 8,400+ throwers. No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
