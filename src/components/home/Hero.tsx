import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CartIcon } from '../common/Icons';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  // outer wrapper: position + responsive opacity live here in CSS, untouched by GSAP
  const visualRef = useRef<HTMLDivElement>(null);
  // inner wrapper: GSAP writes its own inline opacity/transform here instead, so it
  // never fights with the CSS media-query opacity on the outer wrapper (that
  // conflict is what made the visual show at full opacity over the text on mobile)
  const visualInnerRef = useRef<HTMLDivElement>(null);
  const thrownRef = useRef<SVGGElement>(null);
  const spinRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(['.hero-eyebrow', '#hero-heading', '.hero-desc', '.hero-actions', '.hero-stats'], { opacity: 1, y: 0 });
        gsap.set(visualInnerRef.current, { opacity: 1 });
        // freeze the boomerang at a nice mid-flight pose instead of looping
        if (thrownRef.current) {
          gsap.set(thrownRef.current, { opacity: 1, scale: 1 });
          gsap.to(thrownRef.current, {
            duration: 0.01,
            motionPath: { path: '#flight-path', align: '#flight-path', alignOrigin: [0.5, 0.5], start: 0.42, end: 0.42 },
          });
        }
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
        .fromTo(
          visualInnerRef.current,
          { opacity: 0, scale: 0.94, rotate: -3 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1 },
          '-=0.9'
        );

      // Scroll-driven parallax on the hero visual: a subtle drift as the
      // page scrolls, not a dramatic spin.
      gsap.to(visualInnerRef.current, {
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

      // The throwing-guide loop: release -> arc -> catch, then reset and repeat.
      // A fast continuous spin is nested inside the slower path motion so the
      // blade looks like it's actually spinning while it travels the arc.
      if (thrownRef.current && spinRef.current) {
        gsap.set(spinRef.current, { transformOrigin: '50% 50%' });
        gsap.to(spinRef.current, { rotate: 360, duration: 0.4, repeat: -1, ease: 'none' });

        const throwTl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, delay: 1.4 });
        throwTl
          .set(thrownRef.current, { opacity: 1, scale: 0.55 })
          .to(thrownRef.current, {
            duration: 2.4,
            ease: 'power1.inOut',
            motionPath: { path: '#flight-path', align: '#flight-path', alignOrigin: [0.5, 0.5], autoRotate: false },
          })
          .to(thrownRef.current, { scale: 1.15, duration: 0.16, yoyo: true, repeat: 1, ease: 'power1.out' }, '-=0.28')
          .to(thrownRef.current, { opacity: 0, duration: 0.35 });
      }
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
        <div className="hero-visual-inner" ref={visualInnerRef}>
          <svg className="hero-throw-guide" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hero-boomerang-g" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#ff8b5e" />
                <stop offset="55%" stopColor="#ff5a2e" />
                <stop offset="100%" stopColor="#b23015" />
              </linearGradient>
              <marker id="flight-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--info)" />
              </marker>
            </defs>

            {/* ambient orbit ring */}
            <circle cx="220" cy="220" r="190" fill="none" stroke="rgba(255,90,46,0.10)" strokeDasharray="1 8" />

            {/* the flight path guide */}
            <path
              id="flight-path"
              d="M90,360 C 50,220 130,90 240,80 C 350,95 380,220 260,300 C 200,340 140,335 100,320"
              fill="none"
              stroke="var(--info)"
              strokeWidth="2"
              strokeDasharray="3 9"
              strokeLinecap="round"
              opacity="0.5"
              markerEnd="url(#flight-arrow)"
            />

            {/* release + catch markers */}
            <circle cx="90" cy="360" r="4" fill="var(--ochre)" />
            <text x="102" y="365" className="hero-guide-lbl">
              RELEASE
            </text>
            <circle cx="100" cy="320" r="4" fill="var(--info)" />
            <text x="14" y="300" className="hero-guide-lbl">
              CATCH
            </text>

            {/* throw angle annotation */}
            <path d="M90,360 L90,410" stroke="var(--chalk-dim)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
            <path d="M90,360 L165,300" stroke="var(--chalk-dim)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
            <path d="M90,395 A 35 35 0 0 1 118,378" fill="none" stroke="var(--chalk-dim)" strokeWidth="1.5" opacity="0.8" />
            <text x="96" y="392" className="hero-guide-lbl hero-guide-lbl-strong">
              38°
            </text>

            {/* wind speed annotation */}
            <g transform="translate(320,50)">
              <text x="-46" y="-10" className="hero-guide-lbl">
                WIND
              </text>
              <line x1="-46" y1="4" x2="-10" y2="4" stroke="var(--chalk-dim)" strokeWidth="1.5" opacity="0.5" />
              <line x1="-46" y1="10" x2="-22" y2="10" stroke="var(--chalk-dim)" strokeWidth="1.5" opacity="0.35" />
              <line x1="-46" y1="16" x2="-34" y2="16" stroke="var(--chalk-dim)" strokeWidth="1.5" opacity="0.25" />
              <text x="-46" y="34" className="hero-guide-lbl hero-guide-lbl-strong">
                12 MPH
              </text>
            </g>

            {/* animated boomerang: spins fast while travelling the flight path */}
            <g ref={thrownRef} opacity="0">
              <g ref={spinRef}>
                <path
                  d="M-20,18 L-3,-30 a7,7 0 0 1 13,0 L28,54 L15,55 L0,-2 L-11,54 L-24,55 Z"
                  fill="url(#hero-boomerang-g)"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};
