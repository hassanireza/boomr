import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ marginTop: 140, textAlign: 'center', paddingBottom: 100 }}>
      <div style={{ fontSize: '4rem', marginBottom: 16 }}>🪃</div>
      <h1 className="t-display" style={{ fontSize: '2rem' }}>
        This page did not return.
      </h1>
      <p style={{ color: 'var(--chalk-dim)', margin: '12px 0 24px' }}>The page you are looking for does not exist.</p>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};
