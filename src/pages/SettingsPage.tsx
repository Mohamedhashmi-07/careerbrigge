import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { CareerBridgeSupabaseService } from '../services/supabase/supabaseClient';
import { CareerBridgeAIService } from '../services/ai/aiService';
import { Settings, Database, Sparkles, RotateCcw } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { t } = useApp();
  const supabaseStatus = CareerBridgeSupabaseService.getConnectionStatus();
  const aiStatus = CareerBridgeAIService.getProviderStatus();

  const handleResetDemoData = () => {
    if (window.confirm('Reset all demo preferences and return to initial state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <AppShell>
      <div style={{ maxWidth: '880px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <Settings size={20} color="var(--primary-600)" />
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Platform Settings & Integrations
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            System configurations, language settings, and backend provider boundaries
          </p>
        </div>

        {/* Language Section */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '0.5rem' }}>Language & Localization</h3>
          <p className="card-subtitle" style={{ marginBottom: '1.25rem' }}>
            Interface language persists automatically in your browser localStorage without requiring a backend account.
          </p>
          <LanguageSelector />
        </div>

        {/* Backend & AI Connection Status */}
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '1.25rem' }}>Backend Service Status</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Supabase status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Database size={20} color="var(--teal-600)" />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>Supabase Database & Auth</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status: {supabaseStatus.label}</p>
                </div>
              </div>
              <span className={`badge ${supabaseStatus.isConfigured ? 'badge-teal' : 'badge-amber'}`}>
                {supabaseStatus.isConfigured ? 'Connected' : 'Demo Local Mode'}
              </span>
            </div>

            {/* AI Provider status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Sparkles size={20} color="var(--primary-600)" />
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>AI & Recommendation Service</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Engine: {aiStatus.providerLabel}</p>
                </div>
              </div>
              <span className={`badge ${aiStatus.isDemo ? 'badge-amber' : 'badge-teal'}`}>
                {aiStatus.isDemo ? 'Rule-Based Demo Engine' : 'Live Connected'}
              </span>
            </div>
          </div>
        </div>

        {/* Reset Demo Data */}
        <div className="card" style={{ borderColor: 'var(--rose-200)', background: '#fffcfc' }}>
          <h3 className="card-title" style={{ color: 'var(--rose-700)', marginBottom: '0.5rem' }}>
            Reset Demo Data
          </h3>
          <p className="card-subtitle" style={{ marginBottom: '1.25rem' }}>
            Clears all locally saved student/parent adjustments, locked decisions, and resets back to the initial demo baseline.
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ color: 'var(--rose-700)', borderColor: 'var(--rose-300)' }}
            onClick={handleResetDemoData}
          >
            <RotateCcw size={14} /> Clear Local Storage & Reset Demo
          </button>
        </div>
      </div>
    </AppShell>
  );
};
