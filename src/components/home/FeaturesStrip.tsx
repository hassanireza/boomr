import React from 'react';
import { useReveal } from '../../hooks/useReveal';
import { PackageIcon, ReturnIcon, LockIcon, TrophyIcon } from '../common/Icons';

const FEATURES = [
  { icon: PackageIcon, title: 'Free Shipping $100+', desc: 'Express and overnight options available worldwide.' },
  { icon: ReturnIcon, title: '30-Day Returns', desc: 'Full refund on unused items, no questions asked.' },
  { icon: LockIcon, title: 'Secure Payments', desc: '256-bit SSL encryption on every transaction.' },
  { icon: TrophyIcon, title: 'Expert Craftsmanship', desc: '2,000+ test throws before each product ships.' },
];

const FeatureItem: React.FC<{ icon: React.FC<{ size?: number }>; title: string; desc: string; delay: number }> = ({ icon: Icon, title, desc, delay }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`feature-item reveal${delay ? ` reveal-delay-${delay}` : ''}`}>
      <div className="feature-icon" aria-hidden="true">
        <Icon size={22} />
      </div>
      <div>
        <div className="feature-title">{title}</div>
        <div className="feature-desc">{desc}</div>
      </div>
    </div>
  );
};

export const FeaturesStrip: React.FC = () => (
  <div className="features-strip">
    <div className="container">
      <div className="features-grid">
        {FEATURES.map((feature, i) => (
          <FeatureItem key={feature.title} {...feature} delay={i} />
        ))}
      </div>
    </div>
  </div>
);
