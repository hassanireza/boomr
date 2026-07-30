import React from 'react';
import { useToast } from '../../hooks/useToast';
import { CloseIcon, CheckIcon, XIcon } from './Icons';

const renderToastIcon = (type: string) => {
  if (type === 'error') return <XIcon size={13} />;
  if (type === 'info') return <span style={{ fontFamily: 'var(--ff-mono)', fontWeight: 700 }}>i</span>;
  return <CheckIcon size={13} />;
};

export const ToastContainer: React.FC = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast show" role="status">
          <div className={`toast-icon ${toast.type}`} aria-hidden="true">
            {renderToastIcon(toast.type)}
          </div>
          <div className="toast-body">
            <div className="toast-title">{toast.title}</div>
            <div className="toast-msg">{toast.message}</div>
          </div>
          <button
            className="panel-close"
            style={{ width: 22, height: 22 }}
            aria-label="Dismiss notification"
            onClick={() => dismiss(toast.id)}
          >
            <CloseIcon size={12} />
          </button>
        </div>
      ))}
    </div>
  );
};
