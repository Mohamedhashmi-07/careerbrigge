import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { DEMO_COURSES } from '../data/demo/courses';
import { DemoDataBadge } from '../components/common/Badges';
import { TrendingUp, Award, Briefcase, GraduationCap, ChevronRight, CheckCircle2 } from 'lucide-react';

export const CareerPathPage: React.FC = () => {
  const { studentPreferences, finalDecision } = useApp();

  const activeCourseId = finalDecision?.selectedCourseId || studentPreferences.courseId || 'ev-technician';
  const activeCourse = DEMO_COURSES.find(c => c.id === activeCourseId) || DEMO_COURSES[0];

  return (
    <AppShell>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <TrendingUp size={20} color="var(--primary-600)" />
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Vocational Career Progression Roadmap
              </h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Typical multi-year progression from vocational training to master technician & entrepreneurship
            </p>
          </div>
          <DemoDataBadge />
        </div>

        {/* Selected Course Context Card */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff, #f8f9fe)', border: '1.5px solid var(--primary-200)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-indigo" style={{ marginBottom: '0.4rem' }}>{activeCourse.category}</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {activeCourse.title}
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {activeCourse.level} • {activeCourse.durationLabel} • Verified Curriculum Track
              </p>
            </div>
            {finalDecision?.isLocked ? (
              <span className="badge badge-teal">Agreed Family Decision</span>
            ) : (
              <span className="badge badge-indigo">Student Active Preference</span>
            )}
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Typical 5-to-8 Year Growth Trajectory</h3>
              <p className="card-subtitle">
                Based on actual industry patterns in manufacturing, green mobility, and technical service hubs
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
            {activeCourse.careerPathway.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  background: 'var(--bg-card-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  border: '1px solid var(--border-subtle)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: idx === 0 ? 'var(--teal-600)' : idx === activeCourse.careerPathway.length - 1 ? 'var(--amber-500)' : 'var(--primary-600)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1rem',
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {step.title}
                    </h4>
                    <span className="badge badge-indigo">{step.timeframe}</span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.6rem' }}>
                    {step.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.82rem', flexWrap: 'wrap' }}>
                    <div style={{ color: 'var(--teal-700)', fontWeight: 700 }}>
                      Indicative Earnings (Demo): {step.salaryRangeDemo}
                    </div>
                    <div style={{ color: 'var(--text-light)' }}>
                      Stage: {step.stage}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Further Higher Study Pathways */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Higher Education & Lateral Entry Pathways</h3>
              <p className="card-subtitle">
                Vocational training does not end your academic journey; students can progress to diplomas and engineering degrees
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {activeCourse.furtherStudyOptions.map((opt, i) => (
              <div key={i} style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} color="var(--primary-600)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};
