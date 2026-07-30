import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartIcon } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(['.hero-eyebrow', '#hero-heading', '.hero-desc', '.hero-actions', '.hero-stats'], { opacity: 1, y: 0 });
        return;
      }

      // Entrance timeline: staged reveal on load, each element arriving
      // like a throw settling into its line.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('#hero-heading .line', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.3')
        .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-stats > *', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.35')
        .fromTo(visualRef.current, { opacity: 0, scale: 0.94, rotate: -3 }, { opacity: 1, scale: 1, rotate: 0, duration: 1 }, '-=0.9');

      // Scroll-driven parallax on the hero visual: a subtle drift as the
      // page scrolls, not a dramatic spin.
      gsap.to(visualRef.current, {
        y: 30,
        rotate: 6,
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to('.hero-grid-lines', {
        opacity: 0.2,
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-heading" ref={rootRef}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="dot" aria-hidden="true" /> Precision Crafted Since 2008
          </div>
          <h1 id="hero-heading" className="t-display">
            <span className="line">Throw Further.</span>
            <br />
            <span className="line">
              Return <span className="accent">Perfectly</span>.
            </span>
            <br />
            <span className="line outline">Every Time.</span>
          </h1>
          <p className="hero-desc">
            The world's most complete collection of handcrafted boomerangs. From traditional V-wings to exotic
            multi-blades, each one is engineered to return true.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/shop')}>
              <CartIcon size={16} />
              Shop All Boomerangs
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Our Story
            </button>
          </div>
          <div className="hero-stats" role="list">
            <div role="listitem">
              <div className="hero-stat-num" aria-label="9 unique styles">
                9
              </div>
              <div className="hero-stat-label">Unique Styles</div>
            </div>
            <div role="listitem">
              <div className="hero-stat-num" aria-label="60 plus countries shipped">
                60+
              </div>
              <div className="hero-stat-label">Countries Shipped</div>
            </div>
            <div role="listitem">
              <div className="hero-stat-num" aria-label="14000 plus happy throwers">
                14k+
              </div>
              <div className="hero-stat-label">Happy Throwers</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true" ref={visualRef}>
        <div className="hero-orbit" />
        <div className="hero-orbit-2" />
        <svg className="hero-boomerang-art" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hero-boomerang-g" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#ff8b5e" />
              <stop offset="55%" stopColor="#ff5a2e" />
              <stop offset="100%" stopColor="#b23015" />
            </linearGradient>
          </defs>
          <path
            d="M118 336L196 88a30 30 0 0 1 56 1l72 213-46 2-63-190-58 193-15 46z"
            fill="url(#hero-boomerang-g)"
          />
          <path
            d="M52 318Q210 372 348 236"
            fill="none"
            stroke="var(--info)"
            strokeWidth="2"
            strokeDasharray="2 10"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      </div>
    </section>
  );
};
