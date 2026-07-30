import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import { StarIcon } from '../common/Icons';

interface Testimonial {
  stars: number;
  text: string;
  initials: string;
  name: string;
  sub: string;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    stars: 5,
    text: "I've thrown boomerangs for 12 years and BOOMR. is the only brand I now recommend to everyone. The Classic V-Wing Pro returns within inches every single throw.",
    initials: 'JK',
    name: 'Jordan Kim',
    sub: 'World Ranking Competitor, Seoul',
    color: 'rgba(255,90,46,0.2)',
  },
  {
    stars: 5,
    text: "Bought the Serpent Curve S1 for my son's first competition. He's been throwing it around the backyard every evening for two months. Precise and gorgeous to watch.",
    initials: 'AM',
    name: 'Amara Mensah',
    sub: 'Parent, London',
    color: 'rgba(56,224,200,0.2)',
  },
  {
    stars: 5,
    text: 'The Halo Ring Glider is a masterpiece. Watching it float through the air is like watching a frisbee and a boomerang have a beautiful child. Stunning flight.',
    initials: 'FR',
    name: 'Felix Rodrigues',
    sub: 'Outdoor Enthusiast, Lisbon',
    color: 'rgba(61,214,140,0.2)',
  },
  {
    stars: 4,
    text: 'Ordered three different boomerangs as gifts. The packaging was beautiful, delivery was fast, and each one performed exactly as described. Will order again.',
    initials: 'SL',
    name: 'Sophie Laurent',
    sub: 'Gift Buyer, Paris',
    color: 'rgba(232,85,85,0.2)',
  },
  {
    stars: 5,
    text: 'The Tri-Blade Vortex is absolutely insane. The hang-time it generates before returning is unlike any boomerang I have ever thrown. You can watch it hover.',
    initials: 'DW',
    name: 'Dylan Walsh',
    sub: 'Competition Thrower, Sydney',
    color: 'rgba(255,90,46,0.2)',
  },
  {
    stars: 5,
    text: 'Customer service is exceptional. Had a question about wind conditions for the Delta Storm and they connected me with a pro thrower who gave me personal tips.',
    initials: 'NA',
    name: 'Nadia Al-Rashid',
    sub: 'Beginner Thrower, Dubai',
    color: 'rgba(56,224,200,0.2)',
  },
];

const TestimonialCard: React.FC<Testimonial & { delay: number }> = ({ stars, text, initials, name, sub, color, delay }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <article ref={ref} className={`testimonial-card reveal${delay ? ` reveal-delay-${delay}` : ''}`}>
      <div className="testimonial-stars" aria-label={`${stars} stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`star${i < stars ? '' : ' empty'}`}>
            <StarIcon size={14} filled={i < stars} />
          </span>
        ))}
      </div>
      <p className="testimonial-text">&ldquo;{text}&rdquo;</p>
      <div className="testimonial-author">
        <div className="author-avatar" aria-hidden="true" style={{ background: color, color: 'var(--ochre)' }}>
          {initials}
        </div>
        <div>
          <div className="author-name">{name}</div>
          <div className="author-sub">{sub}</div>
        </div>
      </div>
    </article>
  );
};

export const Testimonials: React.FC = () => (
  <section className="section" aria-labelledby="testimonials-heading">
    <div className="container">
      <div className="section-header">
        <span className="section-eyebrow">Customer reviews</span>
        <h2 id="testimonials-heading" className="section-title t-display">
          What Throwers Say
        </h2>
        <div className="divider" aria-hidden="true" />
      </div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={t.name} {...t} delay={(i % 3) + 1} />
        ))}
      </div>
    </div>
  </section>
);
