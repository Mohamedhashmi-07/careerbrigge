import React from 'react';
import { Loader2, SearchX, AlertCircle, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoadingState: React.FC<{ message?: string }> = ({ message }) => {
  const { t } = useApp();
  return (
    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto 1rem', color: 'var(--primary-600)' }} />
      <p style={{ fontWeight: 500 }}>{message || t.common.loading}</p>
    </div>
  );
};

export const EmptyState: React.FC<{ title?: string; message?: string; action?: React.ReactNode }> = ({
  title,
  message,
  action,
}) => {
  const { t } = useApp();
  return (
    <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center' }}>
      <SearchX size={44} style={{ margin: '0 auto 1rem', color: 'var(--text-light)' }} />
      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
        {title || t.common.noData}
      </h4>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
        {message || 'Try adjusting your search keywords, filters, or parameters.'}
      </p>
      {action}
    </div>
  );
};

export const ErrorState: React.FC<{ message?: string; retry?: () => void }> = ({ message, retry }) => {
  const { t } = useApp();
  return (
    <div className="card" style={{ padding: '2.5rem', textAlign: 'center', borderColor: 'var(--rose-200)', background: 'var(--rose-50)' }}>
      <AlertCircle size={36} style={{ margin: '0 auto 1rem', color: 'var(--rose-600)' }} />
      <p style={{ color: 'var(--rose-700)', fontWeight: 600, marginBottom: '1rem' }}>
        {message || t.common.error}
      </p>
      {retry && (
        <button onClick={retry} className="btn btn-secondary btn-sm">
          Try Again
        </button>
      )}
    </div>
  );
};

export const SuccessNotice: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', background: 'var(--teal-50)', border: '1px solid var(--teal-100)', borderRadius: 'var(--radius-md)', color: 'var(--teal-700)' }}>
      <CheckCircle size={22} color="var(--teal-600)" />
      <div>
        <p style={{ fontWeight: 600, fontSize: '0.92rem' }}>{title}</p>
        {subtitle && <p style={{ fontSize: '0.82rem', color: 'var(--teal-700)', opacity: 0.9 }}>{subtitle}</p>}
      </div>
    </div>
  );
};
