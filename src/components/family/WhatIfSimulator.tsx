import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { WhatIfParameters } from '../../types/familyDecision';
import { runWhatIfSimulation } from '../../services/ai/whatIfSimulator';
import { Sliders, Sparkles, TrendingUp, CheckCircle, Info } from 'lucide-react';
import { DemoDataBadge } from '../common/Badges';

export const WhatIfSimulator: React.FC = () => {
  const {
    studentPreferences,
    parentPreferences,
    formatCurrency,
    t,
  } = useApp();

  // Interactive simulation state
  const [params, setParams] = useState<WhatIfParameters>({
    parentBudgetMax: parentPreferences.budgetMax || 60000,
    studentBudgetMax: studentPreferences.budgetMax || 35000,
    preferredDurationMonths: 36,
    commuteToleranceKm: parentPreferences.commuteToleranceKm || 25,
    institutionType: 'government',
    allowHostel: true,
  });

  const simulationResult = useMemo(() => {
    return runWhatIfSimulation(studentPreferences, parentPreferences, params);
  }, [studentPreferences, parentPreferences, params]);

  return (
    <div className="simulator-panel">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sliders size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {t.family.whatIfTitle}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {t.family.whatIfSubtitle}
            </p>
          </div>
        </div>
        <DemoDataBadge label="Dynamic Simulator" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Budget Control */}
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {t.family.whatIfParentBudget}
              </label>
              <span style={{ fontWeight: 700, color: 'var(--primary-700)' }}>
                {formatCurrency(params.parentBudgetMax)}
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="150000"
              step="5000"
              value={params.parentBudgetMax}
              onChange={(e) => setParams(prev => ({ ...prev, parentBudgetMax: Number(e.target.value) }))}
              style={{ width: '100%', accentColor: 'var(--primary-600)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
              <span>₹20,000</span>
              <span>₹1,50,000</span>
            </div>
          </div>

          {/* Duration Control */}
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              {t.family.whatIfDuration}
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              {[
                { months: 12, label: '1 Year' },
                { months: 24, label: '2 Years' },
                { months: 36, label: '3 Years (Poly)' },
              ].map(d => (
                <button
                  key={d.months}
                  type="button"
                  onClick={() => setParams(prev => ({ ...prev, preferredDurationMonths: d.months }))}
                  style={{
                    padding: '0.6rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: params.preferredDurationMonths === d.months ? 'var(--primary-600)' : 'var(--border-subtle)',
                    background: params.preferredDurationMonths === d.months ? 'var(--primary-100)' : '#ffffff',
                    color: params.preferredDurationMonths === d.months ? 'var(--primary-800)' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hostel Toggle & Commute */}
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {t.family.whatIfHostel}
              </label>
              <input
                type="checkbox"
                checked={params.allowHostel}
                onChange={(e) => setParams(prev => ({ ...prev, allowHostel: e.target.checked }))}
                style={{ width: '20px', height: '20px', accentColor: 'var(--teal-600)', cursor: 'pointer' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>{t.family.whatIfCommute}</span>
                <span style={{ fontWeight: 600, color: 'var(--teal-700)', fontSize: '0.88rem' }}>{params.commuteToleranceKm} km</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={params.commuteToleranceKm}
                onChange={(e) => setParams(prev => ({ ...prev, commuteToleranceKm: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: 'var(--teal-600)' }}
              />
            </div>
          </div>
        </div>

        {/* Live Simulation Output Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Metric Comparison Card */}
          <div className="simulator-metric-card">
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Simulated Family Compatibility
            </span>
            <div className="score-value">
              {simulationResult.simulatedMatchPercent}%
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Current Baseline: <strong>{simulationResult.currentMatchPercent}%</strong>
              </span>

              <span className={`delta-badge ${simulationResult.deltaPercent >= 0 ? 'delta-positive' : 'delta-neutral'}`}>
                {simulationResult.deltaPercent >= 0 ? `+${simulationResult.deltaPercent}%` : `${simulationResult.deltaPercent}%`}
              </span>
            </div>
          </div>

          {/* AI Simulation Commentary */}
          <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <Sparkles size={16} /> What Changed & Why?
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              {simulationResult.explanation}
            </p>

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {simulationResult.impactFactors.map((factor, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem' }}>
                  <CheckCircle size={14} color="var(--teal-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>{factor.factor}: </strong>
                    <span style={{ color: 'var(--text-muted)' }}>{factor.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.76rem', color: 'var(--text-light)', padding: '0 0.5rem' }}>
            <Info size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
            <span>
              Simulation results are demo mathematical projections based on weighted criteria to assist family conversation. Not a guarantee of admission or employment.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
