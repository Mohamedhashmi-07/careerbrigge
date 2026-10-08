import React, { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { DEMO_SCHOLARSHIPS } from '../data/demo/scholarships';
import { DEMO_LOANS } from '../data/demo/loans';
import { ScholarshipCard } from '../components/funding/ScholarshipCard';
import { LoanCard } from '../components/funding/LoanCard';
import { DocumentVault } from '../components/funding/DocumentVault';
import { DemoDataBadge } from '../components/common/Badges';
import { ProgressStepper } from '../components/common/ProgressStepper';
import { GraduationCap, Landmark, ShieldCheck } from 'lucide-react';

export const FundingPage: React.FC = () => {
  const { t, finalDecision } = useApp();
  const [activeTab, setActiveTab] = useState<'scholarships' | 'loans' | 'vault'>('scholarships');

  return (
    <AppShell>
      <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Progress Stepper */}
        <ProgressStepper currentStepIndex={5} />

        {/* Page Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--teal-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={18} />
              </div>
              <span className="badge badge-teal">Step 5 of 5</span>
              <span className="badge badge-indigo">Official Schemes</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              {t.funding.title}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.2rem' }}>
              {t.funding.subtitle}
            </p>
          </div>

          <DemoDataBadge label="Official Schemes Mapped" />
        </div>

        {/* Locked Decision Context Banner */}
        {finalDecision?.isLocked && (
          <div style={{ background: 'var(--teal-50)', border: '1.5px solid var(--teal-200)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--teal-800)', textTransform: 'uppercase' }}>
                Funding Tailored for Locked Family Decision:
              </span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--teal-950)', marginTop: '0.15rem' }}>
                {finalDecision.selectedCourseTitle}
              </h4>
            </div>
            <span className="badge badge-teal">Applicable Central & State Subsidies</span>
          </div>
        )}

        {/* Segmented Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', overflowX: 'auto' }}>
          {[
            { id: 'scholarships', label: t.funding.tabScholarships, icon: GraduationCap, count: DEMO_SCHOLARSHIPS.length },
            { id: 'loans', label: t.funding.tabLoans, icon: Landmark, count: DEMO_LOANS.length },
            { id: 'vault', label: t.funding.tabVault, icon: ShieldCheck, count: 5 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive ? 'var(--primary-600)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 2px 8px rgba(79, 70, 229, 0.25)' : 'var(--shadow-xs)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                <span
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-app)',
                    color: isActive ? '#ffffff' : 'var(--text-light)',
                    fontSize: '0.75rem',
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Scholarships */}
        {activeTab === 'scholarships' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {DEMO_SCHOLARSHIPS.map(sch => (
                <ScholarshipCard key={sch.id} scholarship={sch} />
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Loans */}
        {activeTab === 'loans' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {DEMO_LOANS.map(loan => (
                <LoanCard key={loan.id} loan={loan} />
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Document Vault */}
        {activeTab === 'vault' && (
          <DocumentVault />
        )}
      </div>
    </AppShell>
  );
};
