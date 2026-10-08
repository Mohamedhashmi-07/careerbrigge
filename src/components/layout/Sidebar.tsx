import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  BookOpen,
  Building,
  Users2,
  TrendingUp,
  Briefcase,
  GraduationCap,
  User,
  Settings,
  HelpCircle,
  X,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentPath, navigate, isSidebarOpen, closeSidebar, t } = useApp();

  const navItems = [
    { label: t.nav.dashboard, path: '/dashboard', icon: LayoutDashboard },
    { label: t.nav.assessment, path: '/assessment/student', icon: Compass },
    { label: t.nav.familyDecision, path: '/family-decision', icon: Users2, isCore: true },
    { label: t.nav.courses, path: '/courses', icon: BookOpen },
    { label: t.nav.institutes, path: '/institutes', icon: Building },
    { label: t.nav.careerPath, path: '/dashboard/career-path', icon: TrendingUp },
    { label: t.nav.scholarshipsLoans, path: '/dashboard/funding', icon: GraduationCap },
    { label: t.nav.jobs, path: '/dashboard/jobs', icon: Briefcase },
  ];

  const secondaryNavItems = [
    { label: t.nav.profile, path: '/dashboard/profile', icon: User },
    { label: t.nav.settings, path: '/dashboard/settings', icon: Settings },
    { label: t.nav.help, path: '/dashboard/help', icon: HelpCircle },
  ];

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-badge" onClick={() => navigate('/')}>
          <div className="brand-logo-icon">
            <GraduationCap size={22} />
          </div>
          <div>
            <span className="brand-title">{t.brand.name}</span>
            <span className="brand-sub">{t.brand.tagline.split('&')[0]}</span>
          </div>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section-label">Core Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <div
              key={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.isCore && <span className="core-tag">CORE</span>}
            </div>
          );
        })}

        <div className="nav-section-label" style={{ marginTop: '1rem' }}>Account & Settings</div>
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <div
              key={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-200)', color: 'var(--primary-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
            KS
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Soundararajan Family
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Student & Parent Joint
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
