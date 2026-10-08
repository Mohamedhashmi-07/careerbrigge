import React from 'react';
import { Scholarship } from '../../types/funding';
import { useApp } from '../../context/AppContext';
import { Award, ExternalLink, Calendar, CheckCircle2, FileText, Info } from 'lucide-react';
import { DemoDataBadge, SourceBadge } from '../common/Badges';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const { t } = useApp();

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderLeft: '4px solid var(--teal-600)',
      }}
    >
      <div>
        {/* Header badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-teal" style={{ fontSize: '0.74rem' }}>
            {t.funding.officialBadge}
          </span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <DemoDataBadge />
            <SourceBadge sourceLabel={scholarship.source.split('/')[0]} isOfficial={true} />
          </div>
        </div>

        {/* Title */}
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.35, marginBottom: '0.4rem' }}>
          {scholarship.name}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          {scholarship.source}
        </p>

        {/* Financial Benefit Highlight */}
        <div style={{ background: 'var(--teal-50)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--teal-100)', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--teal-800)' }}>
            {t.funding.benefit}
          </span>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--teal-900)', marginTop: '0.15rem' }}>
            {scholarship.benefitAmount}
          </div>
        </div>

        {/* Key Criteria Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          <div>
            <strong style={{ color: 'var(--text-main)' }}>{t.funding.incomeLimit}: </strong>
            <span>{scholarship.incomeCriteria}</span>
          </div>

          <div>
            <strong style={{ color: 'var(--text-main)' }}>{t.funding.academicLimit}: </strong>
            <span>{scholarship.academicCriteria}</span>
          </div>

          <div>
            <strong style={{ color: 'var(--text-main)' }}>Applicable Trades: </strong>
            <span>{scholarship.courseApplicability.join(', ')}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-700)', fontWeight: 600, marginTop: '0.2rem' }}>
            <Calendar size={14} />
            <span>{t.funding.deadline}: {scholarship.deadline}</span>
          </div>
        </div>

        {/* Required Documents checklist */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
            <FileText size={13} /> {t.funding.requiredDocs}:
          </span>
          <ul style={{ paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {scholarship.requiredDocuments.slice(0, 3).map((doc, idx) => (
              <li key={idx}>{doc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action CTA */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginTop: 'auto' }}>
        {scholarship.isOfficialConfigured && scholarship.officialUrl ? (
          <a
            href={scholarship.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            style={{ width: '100%' }}
          >
            {t.funding.applyOfficialBtn} <ExternalLink size={14} />
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
