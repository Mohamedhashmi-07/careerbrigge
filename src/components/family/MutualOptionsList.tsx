import React from 'react';
import { MutualOption } from '../../types/familyDecision';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { DemoDataBadge } from '../common/Badges';

interface MutualOptionsListProps {
  options: MutualOption[];
  onSelectOption: (courseId: string) => void;
}

export const MutualOptionsList: React.FC<MutualOptionsListProps> = ({ options, onSelectOption }) => {
  const { t, openCourseDetails } = useApp();

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <h3 className="card-title">{t.family.mutualOptionsTitle}</h3>
            <DemoDataBadge label="Consensus Engine" />
          </div>
          <p className="card-subtitle">{t.family.mutualOptionsSubtitle}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {options.map((opt) => (
          <div
            key={opt.courseId}
            style={{
              background: '#ffffff',
              border: '1.5px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-xs)',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div>
              {/* Card Header & Match Score */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div>
                  <span className="badge badge-indigo" style={{ fontSize: '0.72rem', marginBottom: '0.3rem' }}>
                    {opt.category}
                  </span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
                    {opt.courseTitle}
                  </h4>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                    {opt.familyMatchPercent}%
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600 }}>Family Match</span>
                </div>
              </div>

              {/* Sub-matches */}
              <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                <span>Student Match: <strong style={{ color: 'var(--teal-700)' }}>{opt.studentMatchPercent}%</strong></span>
                <span>Parent Match: <strong style={{ color: 'var(--primary-700)' }}>{opt.parentMatchPercent}%</strong></span>
              </div>

              {/* Parameters Bar */}
              <div style={{ background: 'var(--bg-card-subtle)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <div><strong>Duration:</strong> {opt.durationLabel}</div>
                <div><strong>Estimated Cost:</strong> {opt.estimatedCostRange}</div>
                <div><strong>Institution:</strong> {opt.institutionType}</div>
              </div>

              {/* Why it fits */}
              <div style={{ marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--teal-700)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.3rem' }}>
                  <CheckCircle2 size={13} /> Why it fits both:
                </span>
                <ul style={{ paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {opt.whyItFits.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Trade-offs */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--amber-700)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.3rem' }}>
                  <AlertTriangle size={13} /> Realistic Trade-offs:
                </span>
                <ul style={{ paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {opt.tradeOffs.map((trade, idx) => (
                    <li key={idx}>{trade}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
                onClick={() => openCourseDetails(opt.courseId)}
              >
                {t.assessment.viewDetails}
              </button>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
                onClick={() => onSelectOption(opt.courseId)}
              >
                Adopt Option <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
