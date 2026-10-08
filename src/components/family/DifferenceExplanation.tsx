import React from 'react';
import { DifferenceExplanation as DiffType } from '../../types/familyDecision';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { DemoDataBadge } from '../common/Badges';

interface DifferenceExplanationProps {
  differences: DiffType[];
}

export const DifferenceExplanation: React.FC<DifferenceExplanationProps> = ({ differences }) => {
  const { t } = useApp();

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Sparkles size={18} color="var(--primary-600)" />
            <h3 className="card-title">{t.family.diffExplanationTitle}</h3>
            <DemoDataBadge label="Explainable AI" />
          </div>
          <p className="card-subtitle">{t.family.diffExplanationSubtitle}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {differences.map((diff) => (
          <div
            key={diff.id}
            style={{
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {diff.dimensionLabel}
              </h4>
              <span className="badge badge-amber">Perspective Divergence</span>
            </div>

            {/* Student vs Parent Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#ffffff', padding: '0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--teal-100)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-700)', textTransform: 'uppercase' }}>
                  Student Aspiration
                </span>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '0.3rem' }}>
                  {diff.studentPerspective}
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-100)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase' }}>
                  Parent Expectation
                </span>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '0.3rem' }}>
                  {diff.parentPerspective}
                </p>
              </div>
            </div>

            {/* Neutral AI Analysis */}
            <div style={{ background: '#ffffff', padding: '0.9rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '0.85rem' }}>
              <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>AI Context Analysis: </strong>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{diff.analysisText}</span>
            </div>

            {/* Suggested Consensus Bridge */}
            <div style={{ background: 'var(--teal-50)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
              <Lightbulb size={18} color="var(--teal-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.84rem', color: 'var(--teal-800)' }}>Suggested Family Bridge: </strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--teal-700)' }}>{diff.suggestedBridge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
