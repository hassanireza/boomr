import React from 'react';

const ITEMS = [
  'Free Returns',
  '30-Day Guarantee',
  'Ships to 60+ Countries',
  'Handcrafted Quality',
  'Use Code BOOMR20',
  'Carbon Fiber, Wood, Foam',
  'Competition Grade',
];

export const Ticker: React.FC = () => (
  <div className="ticker-wrap" aria-hidden="true">
    <div className="ticker">
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span className="ticker-item" key={i}>
          <span className="ti-dot">●</span> {item}
        </span>
      ))}
    </div>
  </div>
);
