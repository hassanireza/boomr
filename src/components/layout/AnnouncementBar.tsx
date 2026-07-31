import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '../common/Icons';

export const AnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <div className="announcement-bar" role="banner">
      <span className="announcement-full">
        Free shipping on orders over $100 &nbsp;•&nbsp; Use code <strong>BOOMR20</strong> for 20% off your first order
        &nbsp;•&nbsp;{' '}
      </span>
      <span className="announcement-short">
        20% off with code <strong>BOOMR20</strong> &nbsp;•&nbsp;{' '}
      </span>
      <a
        href="/shop"
        onClick={(event) => {
          event.preventDefault();
          navigate('/shop');
        }}
      >
        Shop now
      </a>
      <button className="close-bar" aria-label="Close announcement" onClick={() => setVisible(false)}>
        <CloseIcon size={12} />
      </button>
    </div>
  );
};
