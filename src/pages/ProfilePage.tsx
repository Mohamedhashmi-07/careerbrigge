import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { User, Users2 } from 'lucide-react';
import { DemoDataBadge } from '../components/common/Badges';

export const ProfilePage: React.FC = () => {
  const { studentPreferences, parentPreferences, formatCurrency, navigate } = useApp();

  return (
    <AppShell>
      <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Family Profile & Independent Records
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Manage registered student and guardian preference sets
            </p>
          </div>
          <DemoDataBadge label="Joint Account" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Student Record Card */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--teal-100)', color: 'var(--teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Student Profile</h3>
                <span className="badge badge-teal">Karthik S. (Applicant)</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              <div><strong>Selected Course:</strong> {studentPreferences.courseId}</div>
              <div><strong>Budget Limit:</strong> {formatCurrency(studentPreferences.budgetMax)}</div>
              <div><strong>Commute Limit:</strong> {studentPreferences.commuteToleranceKm} km</div>
              <div><strong>Duration:</strong> {studentPreferences.durationPreferenceMonths} Months</div>
              <div><strong>Skills:</strong> {studentPreferences.skills.join(', ')}</div>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/assessment/student')}
            >
              Update Student Preferences
            </button>
          </div>

          {/* Guardian Record Card */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users2 size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Guardian Profile</h3>
                <span className="badge badge-indigo">R. Soundararajan (Father)</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              <div><strong>Preferred Course:</strong> {parentPreferences.courseId}</div>
              <div><strong>Budget Limit:</strong> {formatCurrency(parentPreferences.budgetMax)}</div>
              <div><strong>Security Priority:</strong> {parentPreferences.jobSecurityPriority.toUpperCase()}</div>
              <div><strong>Duration:</strong> {parentPreferences.durationPreferenceMonths} Months</div>
              <div><strong>Hostel:</strong> {parentPreferences.hostelPreference}</div>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/assessment/guardian')}
            >
              Update Parent Preferences
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
