import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalog } from '../../hooks/useCatalog';
import { useCart } from '../../hooks/useCart';
import { useUI } from '../../hooks/useUI';
import { useToast } from '../../hooks/useToast';
import { useCountdown } from '../../hooks/useCountdown';
import { useReveal } from '../../hooks/useReveal';

export const DealOfTheDay: React.FC = () => {
  const catalog = useCatalog();
  const deal = catalog.getById(3);
  const { add } = useCart();
  const { open } = useUI();
  const { show } = useToast();
  const { hours, minutes, seconds } = useCountdown();
  const navigate = useNavigate();
  const textRef = useReveal<HTMLDivElement>();
  const imgRef = useReveal<HTMLDivElement>();

  if (!deal) return null;

  return (
    <section className="section deal-section" aria-labelledby="deal-heading">
      <div className="container">
        <div className="deal-wrapper">
          <div ref={textRef} className="reveal">
            <div className="deal-badge" aria-label="Deal of the day">
              ⚡ Deal of the Day
            </div>
            <h2 id="deal-heading" className="deal-title t-display">
              Riddle Curve QM
              <br />
              Limited Offer
            </h2>
            <p className="deal-desc">
              The question-mark shaped boomerang with polymer flex technology. Watch it loop and spiral mid-flight
              before returning perfectly to your hand. Advanced aerodynamics, beginner-friendly feel.
            </p>
            <div className="deal-price">
              <span className="now" aria-label="Now 89 dollars 99 cents">
                {deal.formattedPrice}
              </span>
              <span className="was" aria-label="Was 109 dollars 99 cents">
                {deal.formattedOriginalPrice}
              </span>
              <span className="save-tag">SAVE {deal.discountPercent}%</span>
            </div>
            <div className="countdown" aria-label="Time remaining for this deal">
              <div className="countdown-unit">
                <div className="countdown-num" aria-live="polite">
                  {hours}
                </div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="countdown-sep" aria-hidden="true">
                :
              </div>
              <div className="countdown-unit">
                <div className="countdown-num" aria-live="polite">
                  {minutes}
                </div>
                <div className="countdown-label">Mins</div>
              </div>
              <div className="countdown-sep" aria-hidden="true">
                :
              </div>
              <div className="countdown-unit">
                <div className="countdown-num" aria-live="polite">
                  {seconds}
                </div>
                <div className="countdown-label">Secs</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  add(deal, 1);
                  show('Added to cart', deal.name, 'success');
                  open('cart');
                }}
              >
                Add to Cart
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate(`/product/${deal.id}`)}>
                View Details
              </button>
            </div>
          </div>
          <div ref={imgRef} className="deal-image-wrapper reveal reveal-delay-2">
            <img
              src={`${import.meta.env.BASE_URL}images/ui/deal-featured.png`}
              alt="Riddle Curve QM, deal of the day"
              style={{ width: '80%', height: '80%', objectFit: 'contain', display: 'block', margin: '0 auto' }}
              loading="eager"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
