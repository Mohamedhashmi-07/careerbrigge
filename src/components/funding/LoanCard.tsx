import React from 'react';
import { EducationLoan } from '../../types/funding';
import { useApp } from '../../context/AppContext';
import { Landmark, ExternalLink, Percent, ShieldCheck, AlertCircle } from 'lucide-react';
import { DemoDataBadge, SourceBadge } from '../common/Badges';

interface LoanCardProps {
  loan: EducationLoan;
}

export const LoanCard: React.FC<LoanCardProps> = ({ loan }) => {
  const { t } = useApp();

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderLeft: '4px solid var(--primary-600)',
      }}
    >
      <div>
        {/* Header badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-indigo" style={{ fontSize: '0.74rem' }}>
            Subsidized Education Loan
          </span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <DemoDataBadge />
            <SourceBadge sourceLabel={loan.providerName.split('/')[0]} isOfficial={true} />
          </div>
        </div>

        {/* Title */}
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.35, marginBottom: '0.4rem' }}>
          {loan.schemeName}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {loan.providerName}
        </p>

        {/* Max Amount Highlight */}
        <div style={{ background: 'var(--primary-50)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-100)', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--primary-800)' }}>
            Sanction Limit (No Collateral)
          </span>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-900)', marginTop: '0.15rem' }}>
            {loan.maxAmount}
          </div>
        </div>

        {/* Loan Details List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          <div>
            <strong style={{ color: 'var(--text-main)' }}>Interest Rate & Terms: </strong>
            <span>{loan.interestRateInfo}</span>
          </div>

          <div style={{ background: '#fdfbf7', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--amber-200)', color: 'var(--amber-800)', fontSize: '0.82rem' }}>
            <strong>Interest Subsidy: </strong>
            <span>{loan.subsidyDetails}</span>
          </div>

          <div>
            <strong style={{ color: 'var(--text-main)' }}>Eligibility: </strong>
            <span>{loan.eligibility}</span>
          </div>

          <div>
            <strong style={{ color: 'var(--text-main)' }}>Repayment Moratorium: </strong>
            <span>{loan.repaymentTerms}</span>
          </div>
        </div>

        {/* Important Financial Literacy Disclaimer */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: '1.25rem' }}>
          <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>Note: An education loan requires repayment. Ensure course placement prospects comfortably support future EMI obligations.</span>
        </div>
      </div>

      {/* Official Portal Button */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: 'auto' }}>
        {loan.isOfficialConfigured && loan.officialPortalUrl ? (
          <a
            href={loan.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%' }}
          >
            Apply via Official Portal <ExternalLink size={14} />
          </a>
        ) : (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', opacity: 0.8 }}
            disabled
          >
            {t.funding.sourceNotConfigured}
          </button>
        )}
      </div>
    </div>
  );
};
