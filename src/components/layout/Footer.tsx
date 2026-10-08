import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, navigate } = useApp();

  return (
    <footer style={{ background: '#ffffff', borderTop: '1px solid var(--border-subtle)', padding: '2.5rem 2rem 1.5rem', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <div className="brand-logo-icon" style={{ width: '30px', height: '30px' }}>
              <GraduationCap size={18} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>{t.brand.name}</span>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            {t.brand.tagline}. An AI-assisted decision-support platform bridging student ambition and family priorities.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--teal-700)' }}>
            <ShieldCheck size={14} />
            <span>Smart India Hackathon (SIH) Solution</span>
          </div>
        </div>

        <div>
          <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Platform</h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.84rem' }}>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/methodology'); }}>Methodology</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/vocational-streams'); }}>Vocational Streams</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/courses'); }}>Course Explorer</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/institutes'); }}>Institutes Directory</a></li>
          </ul>
        </div>

        <div>
          <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Decision Engine</h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.84rem' }}>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/assessment/student'); }}>Student Assessment</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/assessment/guardian'); }}>Parent Assessment</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/family-decision'); }}>Family Consensus Engine</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard/funding'); }}>Scholarships & Loans</a></li>
          </ul>
        </div>

        <div>
          <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem' }}>Data Integrity Notice</h5>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', lineHeight: 1.5 }}>
            CareerBridge AI does not guarantee admission or job placement. Matching scores represent demo weighted projections. Official schemes are linked directly to government portals (NSP, NAPS, Vidya Lakshmi).
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-light)' }}>
        <div>© 2026 CareerBridge AI. All rights reserved.</div>
        <div>Built for SIH — Vocational Education Career Counselling</div>
      </div>
    </footer>
  );
};
