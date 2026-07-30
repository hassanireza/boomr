import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../hooks/useUI';
import { useToast } from '../../hooks/useToast';
import { Order } from '../../core/services/OrderService';
import { CheckIcon } from '../common/Icons';

interface OrderConfirmationModalProps {
  order: Order | null;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order }) => {
  const { active, close } = useUI();
  const { show } = useToast();
  const navigate = useNavigate();
  const isOpen = active === 'orderConfirmed';

  return (
    <div className={`modal-overlay${isOpen ? ' active' : ''}`} role="dialog" aria-label="Order confirmed" aria-modal="true">
      <div className="modal" style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'rgba(61,214,140,0.15)',
            border: '2px solid var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            color: 'var(--success)',
          }}
        >
          <CheckIcon size={32} />
        </div>
        <h2 className="modal-title">Order Confirmed!</h2>
        <p className="modal-subtitle">Thank you for your purchase. Your boomerangs are being prepared with care.</p>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 20, margin: '24px 0', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: 8 }}>
            <span style={{ color: 'var(--chalk-dim)' }}>Order number</span>
            <span style={{ fontFamily: 'var(--ff-mono)', color: 'var(--ochre)' }}>{order?.orderNumber ?? '#BM-000000'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: 8 }}>
            <span style={{ color: 'var(--chalk-dim)' }}>Estimated delivery</span>
            <span style={{ color: 'var(--chalk)' }}>5-7 business days</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
            <span style={{ color: 'var(--chalk-dim)' }}>Confirmation sent to</span>
            <span style={{ color: 'var(--chalk)' }}>{order?.shipping.email ?? 'your@email.com'}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            className="btn btn-primary"
            onClick={() => {
              close();
              navigate('/');
            }}
          >
            Continue Shopping
          </button>
          <button
            className="btn btn-outline"
            onClick={() => {
              show('Coming soon', 'Order tracking will be available soon', 'info');
              close();
            }}
          >
            Track My Order
          </button>
        </div>
      </div>
    </div>
  );
};
