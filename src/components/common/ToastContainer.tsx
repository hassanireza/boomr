import React from 'react';
import { useToast } from '../../hooks/useToast';
import { CloseIcon } from './Icons';

const ICONS: Record<string, string> = {
  success: '✓',
  error: '✕',
  info: 'i',
};

export const ToastContainer: React.FC = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast show" role="status">
          <div className={`toast-icon ${toast.type}`} aria-hidden="true">
            {ICONS[toast.type] ?? '✓'}
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
