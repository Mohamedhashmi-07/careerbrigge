import React from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Users, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HandoffModalProps {
  isOpen: boolean;
  onProceed: () => void;
}

export const HandoffModal: React.FC<HandoffModalProps> = ({ isOpen, onProceed }) => {
  const { t } = useApp();

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title={t.assessment.handoffTitle} maxWidth="580px">
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--teal-100)', color: 'var(--teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <CheckCircle2 size={36} />
        </div>

        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          {t.assessment.handoffTitle}
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
          {t.assessment.handoffSubtitle}
        </p>

        {/* Unbiased Privacy Notice */}
        <div style={{ background: '#f8f9fe', border: '1px solid var(--primary-100)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', textAlign: 'left', marginBottom: '2rem' }}>
          <ShieldCheck size={20} color="var(--primary-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>Unbiased Assessment Protocol:</strong> {t.assessment.handoffNotice}
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-lg"
          style={{ width: '100%' }}
          onClick={onProceed}
        >
          <Users size={18} />
          {t.assessment.handoffContinueBtn}
          <ArrowRight size={18} />
        </button>
      </div>
    </Modal>
  );
};
