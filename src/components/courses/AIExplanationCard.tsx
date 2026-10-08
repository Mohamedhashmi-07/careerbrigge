import React from 'react';
import { CourseAIFitAnalysis } from '../../services/ai/courseExplanationService';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { DemoDataBadge } from '../common/Badges';

interface AIExplanationCardProps {
  analysis: CourseAIFitAnalysis;
}

export const AIExplanationCard: React.FC<AIExplanationCardProps> = ({ analysis }) => {
  const { t } = useApp();

  return (
    <div style={{ background: 'linear-gradient(135deg, #fdfdff, #f3f4fc)', border: '1.5px solid var(--primary-200)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>AI Suitability & Family Fit Explanation</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Transparent, rule-weighted analysis based on student & parent preferences</p>
          </div>
        </div>
        <DemoDataBadge label={analysis.modelBadge} />
      </div>

      {/* Match Score Gauge */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Overall Match</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '0.2rem' }}>
            {analysis.overallMatchScore}%
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Student Fit</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--teal-700)', margin: '0.2rem 0' }}>
            {analysis.studentSuitability.score}%
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {analysis.studentSuitability.positives[0] || 'Matches primary interests'}
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Parent Fit</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-600)', margin: '0.2rem 0' }}>
            {analysis.parentSuitability.score}%
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {analysis.parentSuitability.positives[0] || 'Budget & location feasible'}
          </div>
        </div>
      </div>

      {/* Why this fits */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--teal-100)' }}>
          <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--teal-700)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <CheckCircle2 size={16} /> Why This Course Fits
          </h5>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {analysis.studentSuitability.positives.map((p, i) => (
              <li key={`sp-${i}`}>{p}</li>
            ))}
            {analysis.parentSuitability.positives.map((p, i) => (
              <li key={`pp-${i}`}>{p}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--amber-100)' }}>
          <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--amber-700)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <AlertTriangle size={16} /> Things to Consider & Discuss
          </h5>
          <ul style={{ paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {analysis.studentSuitability.cautions.length > 0 || analysis.parentSuitability.cautions.length > 0 ? (
              <>
                {analysis.studentSuitability.cautions.map((c, i) => (
                  <li key={`sc-${i}`}>{c}</li>
                ))}
                {analysis.parentSuitability.cautions.map((c, i) => (
                  <li key={`pc-${i}`}>{c}</li>
                ))}
              </>
            ) : (
              <li>No significant conflicts detected between student and parent constraints.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Transparent Weight Explanation */}
      <details style={{ background: '#ffffff', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
        <summary style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--primary-700)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <HelpCircle size={14} /> How is this score calculated? (Demo Matching Weights)
        </summary>
        <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            The AI match score uses deterministic, explainable weights rather than black-box prediction. Weights represent multi-stakeholder priorities:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
            {analysis.scoringWeightsExplanation.map((w, idx) => (
              <div key={idx} style={{ padding: '0.4rem 0.6rem', background: 'var(--bg-card-subtle)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong>{w.factor}:</strong> {w.weightPercent}%
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
};
