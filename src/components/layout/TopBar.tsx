import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from '../common/LanguageSelector';
import { Menu, Bell, Search, CheckCircle2 } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { toggleSidebar, navigate, finalDecision, t } = useApp();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-toggle"
          onClick={toggleSidebar}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-app)', padding: '0.45rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', width: '280px' }}>
          <Search size={16} color="var(--text-light)" style={{ marginRight: '0.5rem' }} />
          <input
            type="text"
            placeholder="Search trades, scholarships..."
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.84rem' }}
          />
        </div>
      </div>

      <div className="topbar-right">
        {/* Assessment / Decision Status Badge */}
        {finalDecision?.isLocked ? (
          <span
            className="badge badge-teal"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.75rem' }}
            onClick={() => navigate('/family-decision')}
          >
            <CheckCircle2 size={13} />
            <span>Decision Locked</span>
          </span>
        ) : (
          <span
            className="badge badge-indigo"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.75rem' }}
            onClick={() => navigate('/family-decision')}
          >
            <span>Decision Ready</span>
          </span>
        )}

        {/* Multilingual Selector */}
        <LanguageSelector />

        {/* Notifications */}
        <button
          type="button"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', position: 'relative', padding: '0.3rem' }}
          aria-label="Notifications"
          onClick={() => navigate('/dashboard/funding')}
          title="NSP Scholarship application open"
        >
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--rose-500)' }} />
        </button>

        {/* Profile Avatar */}
        <div
          onClick={() => navigate('/dashboard/profile')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--primary-600)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.82rem' }}>
            SF
          </div>
        </div>
      </div>
    </header>
  );
};
