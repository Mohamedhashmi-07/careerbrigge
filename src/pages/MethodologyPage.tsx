import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { Scale, Sliders } from 'lucide-react';
import { DemoDataBadge } from '../components/common/Badges';

export const MethodologyPage: React.FC = () => {
  return (
    <AppShell>
      <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span className="badge badge-indigo">Scientific & Educational Framework</span>
            <DemoDataBadge />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Counselling Methodology & Explainable AI Framework
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.2rem' }}>
            How CareerBridge AI balances independent aspirations, family feasibility, and industry demand
          </p>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Scale size={20} color="var(--primary-600)" /> Core Philosophy: Non-Judgmental Decision Support
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
            Traditional vocational counselling systems treat the student in isolation or present algorithmic predictions as definitive truths. In contrast, <strong>CareerBridge AI</strong> is engineered specifically as a family decision-support platform designed for the Indian socio-economic reality.
          </p>
          <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontStyle: 'italic', color: 'var(--text-main)' }}>
            "Explore independently → Compare together → Decide together."
          </div>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Sliders size={20} color="var(--primary-600)" /> Explainable Weight Allocation
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
            Rather than relying on opaque deep neural networks, our alignment engine employs transparent, configurable multi-criteria decision analysis (MCDA):
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              { factor: 'Course & Curriculum Match', weight: '25%', desc: 'Evaluates hands-on trade affinity against student skills and parent expectations.' },
              { factor: 'Budget Feasibility', weight: '20%', desc: 'Compares institute tuition and travel against parent declared annual limit.' },
              { factor: 'Location & Commute Safety', weight: '15%', desc: 'Checks daily transit kilometers and hostel acceptability.' },
              { factor: 'Institution Category Match', weight: '15%', desc: 'Govt ITI / Polytechnic vs Private / Aided institution preference.' },
              { factor: 'Course Duration & Credential', weight: '15%', desc: '1-Year certificate vs 3-Year polytechnic diploma credentials.' },
              { factor: 'Priorities vs Stability', weight: '10%', desc: 'Balances rapid job entry against long-term PSU/Govt exam eligibility.' },
            ].map((item, idx) => (
              <div key={idx} style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.factor}</strong>
                  <span className="badge badge-indigo">{item.weight}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};
