import React from 'react';
import { useReveal } from '../../hooks/useReveal';

export const BrandStory: React.FC = () => {
  const textRef = useReveal<HTMLDivElement>();
  const visualRef = useReveal<HTMLDivElement>();

  return (
    <section className="section brand-story" id="about" aria-labelledby="story-heading">
      <div className="container">
        <div className="brand-story-grid">
          <div ref={textRef} className="story-text reveal">
            <span className="section-eyebrow">Our Story</span>
            <h2 id="story-heading" className="story-title t-display">
              Obsessed With the Return.
            </h2>
            <p className="story-body">
              BOOMR. started in a garage in 2008 when founder Lena Thorvald threw her first boomerang on a beach in
              Darwin, Australia, and watched it disappear over the dunes never to return. She spent the next two
              years learning why, studying aerodynamics, testing 300 hand-cut prototypes, and eventually throwing
              one that came back and hit her square in the palm.
            </p>
            <p className="story-body">
              Today, every BOOMR. product goes through our 2,000-throw test programme before it reaches you. We work
              with professional competition throwers, aerospace engineers, and indigenous elders to ensure each
              design honours the craft while pushing its limits.
            </p>
            <div style={{ display: 'flex', gap: 32, marginTop: 32 }} role="list">
              <div role="listitem">
                <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--ochre)', lineHeight: 1 }}>
                  16
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--chalk-dim)', marginTop: 4 }}>Years of craft</div>
              </div>
              <div role="listitem">
                <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--ochre)', lineHeight: 1 }}>
                  300+
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--chalk-dim)', marginTop: 4 }}>Prototypes tested</div>
              </div>
              <div role="listitem">
                <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--ochre)', lineHeight: 1 }}>
                  11
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--chalk-dim)', marginTop: 4 }}>Signature designs</div>
              </div>
            </div>
          </div>
          <div ref={visualRef} className="story-visual reveal reveal-delay-2">
            <img
              className="story-big-boomerang"
              src={`${import.meta.env.BASE_URL}images/products/ring-detail.webp`}
              alt="Handcrafted boomerang"
              loading="lazy"
              draggable={false}
            />
            <div className="story-accent-card" aria-hidden="true">
              <div className="accent-card-num">4.8/5</div>
              <div className="accent-card-label">Average customer rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
