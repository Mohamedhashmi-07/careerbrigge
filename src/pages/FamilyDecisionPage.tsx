import React, { useMemo } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { ProgressStepper } from '../components/common/ProgressStepper';
import { StakeholderMatrix } from '../components/family/StakeholderMatrix';
import { DifferenceExplanation } from '../components/family/DifferenceExplanation';
import { MutualOptionsList } from '../components/family/MutualOptionsList';
import { WhatIfSimulator } from '../components/family/WhatIfSimulator';
import { DecisionLock } from '../components/family/DecisionLock';
import { analyzeFamilyPerspectives } from '../services/ai/familyDecisionService';
import { DemoDataBadge } from '../components/common/Badges';
import { Users2, HelpCircle } from 'lucide-react';

export const FamilyDecisionPage: React.FC = () => {
  const { studentPreferences, parentPreferences, t } = useApp();

  const analysis = useMemo(() => {
    return analyzeFamilyPerspectives(studentPreferences, parentPreferences);
  }, [studentPreferences, parentPreferences]);

  return (
    <AppShell>
      <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Progress Stepper */}
        <ProgressStepper currentStepIndex={4} />

        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users2 size={18} />
              </div>
              <span className="badge badge-indigo">Step 4 of 5</span>
              <span className="core-tag">CORE INNOVATION</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              {t.family.title}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.2rem' }}>
              {t.family.subtitle}
            </p>
          </div>

          <DemoDataBadge label="Demo / Calculated Engine" />
        </div>

        {/* Family Alignment Score Metric Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff, #f7f8ff)', border: '2px solid var(--primary-200)', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ maxWidth: '640px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-700)' }}>
                {t.family.alignmentScore}
              </span>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--primary-800)', lineHeight: 1.1, margin: '0.3rem 0' }}>
                {analysis.familyAlignmentScore}%
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {analysis.summaryNote}
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', minWidth: '260px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                <HelpCircle size={14} color="var(--primary-600)" /> How this score is calculated:
              </span>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Course Match:</span> <strong>25%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Budget Alignment:</span> <strong>20%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Institution Match:</span> <strong>15%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Duration Compatibility:</span> <strong>15%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Commute & Transit:</span> <strong>15%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Priorities vs Security:</span> <strong>10%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Stakeholder Preference Matrix */}
        <StakeholderMatrix rows={analysis.matrixRows} />

        {/* 2. Difference Explanation */}
        <DifferenceExplanation differences={analysis.differenceExplanations} />

        {/* 3. Options Both Can Agree On (Mutual Options) */}
        <MutualOptionsList
          options={analysis.mutualOptions}
          onSelectOption={(courseId) => {
            // Can be locked in DecisionLock
          }}
        />

        {/* 4. What-If Simulator */}
        <WhatIfSimulator />

        {/* 5. Final Explicit Decision */}
        <DecisionLock />
      </div>
    </AppShell>
  );
};
