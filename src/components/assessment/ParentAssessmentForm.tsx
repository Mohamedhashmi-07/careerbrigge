import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProgressStepper } from '../common/ProgressStepper';
import { CourseSelector } from '../courses/CourseSelector';
import {
  Users,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';

const FAMILY_CONSTRAINT_OPTIONS = [
  'Family needs predictable monthly earnings after graduation',
  'Must lead to recognized state/central government PSU eligibility',
  'Safe daily travel route or approved government hostel',
  'Minimize upfront education debt',
  'Opportunity for lateral entry into B.Tech degree later',
];

export const ParentAssessmentForm: React.FC = () => {
  const {
    parentPreferences,
    setParentPreferences,
    formatCurrency,
    navigate,
    t,
  } = useApp();

  const [validationError, setValidationError] = useState<string | null>(null);

  const toggleConstraint = (constraint: string) => {
    setParentPreferences(prev => {
      const exists = prev.familyConstraints.includes(constraint);
      const familyConstraints = exists
        ? prev.familyConstraints.filter(c => c !== constraint)
        : [...prev.familyConstraints, constraint];
      return { ...prev, familyConstraints };
    });
  };

  const handleRunAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentPreferences.parentDeclaration) {
      setValidationError('Please acknowledge the family declaration before running AI analysis.');
      return;
    }
    setValidationError(null);
    setParentPreferences(prev => ({
      ...prev,
      completedAt: new Date().toISOString(),
    }));
    navigate('/family-decision');
  };

  return (
    <div>
      <ProgressStepper currentStepIndex={3} />

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-indigo">Parent / Guardian Step 3 of 5</span>
          <span className="badge badge-teal">Independent Perspective</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {t.assessment.parentTitle}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {t.assessment.parentSubtitle}
        </p>
      </div>

      <form onSubmit={handleRunAnalysis} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* SECTION 1: Preferred Vocational Course */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">1. Parent Preferred Vocational Trade</h3>
              <p className="card-subtitle">Choose the vocational field you believe offers the best stability and future for your child</p>
            </div>
          </div>
          <CourseSelector targetRole="parent" />
        </div>

        {/* SECTION 2: Career Expectations & Stability */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">2. Family Expectations & Job Security</h3>
              <p className="card-subtitle">Define what level of stability and employment pathway your family prioritizes</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {t.assessment.jobSecurityLabel}
              </label>
              <select
                value={parentPreferences.jobSecurityPriority}
                onChange={(e) => setParentPreferences(prev => ({ ...prev, jobSecurityPriority: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                }}
              >
                <option value="high">High Security (Established industries, Govt/PSU exam eligibility)</option>
                <option value="medium">Balanced (Growing private sector with steady recruitment)</option>
                <option value="flexible">Flexible (Open to emerging startup sectors & modern trades)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {t.assessment.employmentPathwayLabel}
              </label>
              <select
                value={parentPreferences.employmentPathwayPreference}
                onChange={(e) => setParentPreferences(prev => ({ ...prev, employmentPathwayPreference: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                }}
              >
                <option value="immediate_job">Immediate Campus / Workshop Placement</option>
                <option value="higher_studies">Direct Diploma with option for Lateral B.Tech Degree</option>
                <option value="government_exams">Eligibility for State Electricity Board / Railway Exams</option>
                <option value="entrepreneurship">Family Business / Independent Workshop Setup</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Primary Family Guidance Note
            </label>
            <textarea
              rows={2}
              value={parentPreferences.careerExpectations}
              onChange={(e) => setParentPreferences(prev => ({ ...prev, careerExpectations: e.target.value }))}
              placeholder="e.g., We want our child to obtain an accredited 3-year polytechnic diploma so they can apply for permanent government positions."
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: '#ffffff',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
              }}
            />
          </div>
        </div>

        {/* SECTION 3: Financial Feasibility & Location Preferences */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">3. Financial Planning, Commute & Hostel</h3>
              <p className="card-subtitle">Set family financial ceilings and accommodation preferences</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '1.5rem' }}>
            {/* Budget Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  Family Max Annual Education Budget
                </label>
                <span style={{ fontWeight: 700, color: 'var(--primary-700)', fontSize: '1rem' }}>
                  {formatCurrency(parentPreferences.budgetMax)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="150000"
                step="5000"
                value={parentPreferences.budgetMax}
                onChange={(e) => setParentPreferences(prev => ({ ...prev, budgetMax: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: 'var(--primary-600)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                <span>₹10,000 (Govt Subsidized)</span>
                <span>₹1,50,000 (Self-funded)</span>
              </div>
            </div>

            {/* Duration Preference */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                Preferred Course Duration
              </label>
              <select
                value={parentPreferences.durationPreferenceMonths}
                onChange={(e) => setParentPreferences(prev => ({ ...prev, durationPreferenceMonths: Number(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                }}
              >
                <option value={36}>3 Years (36 Months - Full Polytechnic Diploma - Recommended for stability)</option>
                <option value={24}>2 Years (24 Months - ITI National Trade Certificate)</option>
                <option value={12}>1 Year (12 Months - Fast Certificate)</option>
              </select>
            </div>

            {/* Hostel Preference */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {t.assessment.hostelLabel}
              </label>
              <select
                value={parentPreferences.hostelPreference}
                onChange={(e) => setParentPreferences(prev => ({ ...prev, hostelPreference: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                }}
              >
                <option value="flexible">Flexible (Hostel acceptable if verified & safe)</option>
                <option value="home_only">Day Scholar Only (Commute from home)</option>
                <option value="acceptable">Hostel Preferred (Focus solely on studies)</option>
              </select>
            </div>

            {/* Commute Tolerance */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  Max Daily Commute Allowed
                </label>
                <span style={{ fontWeight: 700, color: 'var(--teal-700)', fontSize: '1rem' }}>
                  {parentPreferences.commuteToleranceKm} km
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={parentPreferences.commuteToleranceKm}
                onChange={(e) => setParentPreferences(prev => ({ ...prev, commuteToleranceKm: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: 'var(--teal-600)' }}
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: Family Constraints & Declaration */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">4. Family Constraints & Parent Declaration</h3>
              <p className="card-subtitle">Confirm these inputs truly reflect guardian expectations</p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              {t.assessment.familyConstraintsLabel}
            </label>
            <div className="chip-group">
              {FAMILY_CONSTRAINT_OPTIONS.map((constraint) => {
                const isSelected = parentPreferences.familyConstraints.includes(constraint);
                return (
                  <button
                    key={constraint}
                    type="button"
                    className={`chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleConstraint(constraint)}
                  >
                    {isSelected && <CheckCircle2 size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {constraint}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ background: '#f8f9fe', border: '1px solid var(--primary-200)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              type="checkbox"
              id="parentDeclaration"
              checked={parentPreferences.parentDeclaration}
              onChange={(e) => {
                setParentPreferences(prev => ({ ...prev, parentDeclaration: e.target.checked }));
                if (e.target.checked) setValidationError(null);
              }}
              style={{ width: '18px', height: '18px', accentColor: 'var(--primary-600)', cursor: 'pointer' }}
            />
            <label htmlFor="parentDeclaration" style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 500, cursor: 'pointer' }}>
              {t.assessment.parentDeclarationLabel}
            </label>
          </div>

          {validationError && (
            <div style={{ color: 'var(--rose-600)', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600 }}>
              {validationError}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/assessment/student')}
          >
            <ArrowLeft size={16} /> {t.assessment.editPrevious}
          </button>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
          >
            <Sparkles size={18} />
            {t.assessment.runAnalysis}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
