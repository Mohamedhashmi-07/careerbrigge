import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { DEMO_COURSES } from '../data/demo/courses';
import { DemoDataBadge } from '../components/common/Badges';
import {
  Users2,
  BookOpen,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
} from 'lucide-react';

export const DashboardHomePage: React.FC = () => {
  const {
    studentPreferences,
    parentPreferences,
    finalDecision,
    navigate,
    openCourseDetails,
    formatCurrency,
    t,
  } = useApp();

  const studentCourse = DEMO_COURSES.find(c => c.id === studentPreferences.courseId);
  const parentCourse = DEMO_COURSES.find(c => c.id === parentPreferences.courseId);

  return (
    <AppShell>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Welcome Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span className="badge badge-indigo">Karthik & Soundararajan Family</span>
              <DemoDataBadge />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Family Career Counselling Dashboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              "Explore independently → Compare together → Decide together."
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/family-decision')}
          >
            <Users2 size={18} /> Open Family Decision Engine <ArrowRight size={18} />
          </button>
        </div>

        {/* Top 3 High-Impact Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Card 1: Family Alignment Score */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff, #f7f9ff)', border: '1.5px solid var(--primary-200)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-indigo">{t.family.alignmentScore}</span>
                <span className="core-tag">CORE</span>
              </div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary-800)', lineHeight: 1.1 }}>
                83%
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0.5rem 0 1rem' }}>
                High overall alignment on technical hands-on trades and budget, with divergence on course duration.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/family-decision')}
            >
              Inspect Alignment Matrix <ArrowRight size={14} />
            </button>
          </div>

          {/* Card 2: Student vs Parent Perspective Snapshot */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-teal">Independent Perspectives</span>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-light)', fontWeight: 600 }}>Active</span>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal-700)', textTransform: 'uppercase' }}>
                  Student Selected:
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  {studentCourse ? studentCourse.title : studentPreferences.courseId}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Duration: {studentPreferences.durationPreferenceMonths}m • Budget: {formatCurrency(studentPreferences.budgetMax)}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase' }}>
                  Parent Preferred:
                </span>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  {parentCourse ? parentCourse.title : parentPreferences.courseId}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Duration: {parentPreferences.durationPreferenceMonths}m • Budget: {formatCurrency(parentPreferences.budgetMax)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
                onClick={() => navigate('/assessment/student')}
              >
                Edit Student
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
                onClick={() => navigate('/assessment/guardian')}
              >
                Edit Parent
              </button>
            </div>
          </div>

          {/* Card 3: Final Decision Status */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: finalDecision?.isLocked ? '4px solid var(--teal-600)' : '4px solid var(--amber-500)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className={`badge ${finalDecision?.isLocked ? 'badge-teal' : 'badge-amber'}`}>
                  {finalDecision?.isLocked ? 'Decision Locked' : 'Decision Pending'}
                </span>
                <DemoDataBadge />
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                {finalDecision?.isLocked ? finalDecision.selectedCourseTitle : 'Family Consensus in Progress'}
              </h4>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {finalDecision?.isLocked
                  ? 'Locked direction unlocks verified government scholarship schemes and subsidized loans.'
                  : 'Both independent preferences are captured. Review the What-If simulation and mutual options to confirm a direction.'}
              </p>
            </div>

            <button
              type="button"
              className={`btn btn-sm ${finalDecision?.isLocked ? 'btn-teal' : 'btn-primary'}`}
              onClick={() => navigate(finalDecision?.isLocked ? '/dashboard/funding' : '/family-decision')}
            >
              {finalDecision?.isLocked ? 'View Funding Options' : 'Make Final Decision'} <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Secondary Row: Quick Links & Roadmap Preview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Quick Nav Cards */}
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '1rem' }}>Quick Navigation</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { label: 'Explore Courses', path: '/courses', icon: BookOpen },
                { label: 'Find Institutes', path: '/institutes', icon: Users2 },
                { label: 'Career Pathway', path: '/dashboard/career-path', icon: TrendingUp },
                { label: 'Scholarships', path: '/dashboard/funding', icon: GraduationCap },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    style={{
                      background: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-subtle)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Icon size={20} color="var(--primary-600)" />
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)' }}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Guidance Tip */}
          <div className="card" style={{ background: '#f8f9fe', border: '1px solid var(--primary-200)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Sparkles size={18} color="var(--primary-600)" />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>AI Decision Guidance</h4>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1rem' }}>
              "Consider evaluating the <strong>Diploma in Mechatronics</strong> mutual option. It fulfills the student's passion for cutting-edge robotics & EV mechanics while giving the parent an accredited 3-year polytechnic credential recognized by state boards."
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/family-decision')}
            >
              Compare in Decision Engine
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
