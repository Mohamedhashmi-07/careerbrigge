import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Users2, Shield, ArrowRight } from 'lucide-react';
import { DemoDataBadge } from '../components/common/Badges';

export const LoginPage: React.FC = () => {
  const { navigate, t } = useApp();
  const [selectedRole, setSelectedRole] = useState<'student' | 'guardian' | 'admin'>('student');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'student') {
      navigate('/assessment/student');
    } else if (selectedRole === 'guardian') {
      navigate('/assessment/guardian');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-app)', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="brand-logo-icon" style={{ margin: '0 auto 1rem', width: '48px', height: '48px' }}>
            <GraduationCap size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Sign In to {t.brand.name}
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Vocational Counselling & Family Decision-Support Platform
          </p>
          <div style={{ marginTop: '0.75rem' }}>
            <DemoDataBadge label="Demo Authentication Mode" />
          </div>
        </div>

        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Role Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Select Sign In Role:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              {[
                { id: 'student', label: 'Student', icon: GraduationCap },
                { id: 'guardian', label: 'Guardian', icon: Users2 },
                { id: 'admin', label: 'Admin', icon: Shield },
              ].map(r => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id as any)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.75rem 0.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid',
                      borderColor: isSelected ? 'var(--primary-600)' : 'var(--border-subtle)',
                      background: isSelected ? 'var(--primary-50)' : '#ffffff',
                      color: isSelected ? 'var(--primary-800)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                    }}
                  >
                    <Icon size={18} />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Registered Mobile / Email
            </label>
            <input
              type="text"
              defaultValue="karthik.soundar@demo.in"
              style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Password / OTP
            </label>
            <input
              type="password"
              defaultValue="••••••••"
              style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
          >
            Enter Platform as {selectedRole.toUpperCase()} <ArrowRight size={18} />
          </button>

          <div style={{ textAlign: 'center' }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('/'); }}
              style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}
            >
              ← Return to Landing Page
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
