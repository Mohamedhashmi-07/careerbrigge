import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProgressStepper } from '../common/ProgressStepper';
import { CourseSelector } from '../courses/CourseSelector';
import { HandoffModal } from './HandoffModal';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  MapPin,
  Clock,
  Compass,
  Check,
} from 'lucide-react';

const AVAILABLE_SKILLS = [
  'Battery Diagnostics',
  'EV Powertrain',
  'Wiring Schematics',
  'Tool Operation',
  'Solar PV Mounting',
  'PLC Programming',
  'CNC G-Code',
  'Network Cabling',
  'Medical Sensor Repair',
  'AutoCAD Electrical',
];

const AVAILABLE_TECH = [
  'Electric Vehicles',
  'Green Mobility',
  'Lithium Batteries',
  'Smart Charging',
  'Industrial Robotics',
  'Cloud Networks',
  'Biomedical Instruments',
];

const CAREER_PRIORITY_OPTIONS = [
  'Hands-on practical work',
  'Emerging futuristic industry',
  'Quick entry into paid job',
  'High long-term salary growth',
  'Self-employment / workshop ownership',
];

export const StudentAssessmentForm: React.FC = () => {
  const {
    studentPreferences,
    setStudentPreferences,
    formatCurrency,
    navigate,
    t,
  } = useApp();

  const [showHandoff, setShowHandoff] = useState(false);

  const toggleSkill = (skill: string) => {
    setStudentPreferences(prev => {
      const exists = prev.skills.includes(skill);
      const skills = exists ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const toggleTech = (tech: string) => {
    setStudentPreferences(prev => {
      const exists = prev.technologyInterests.includes(tech);
      const technologyInterests = exists
        ? prev.technologyInterests.filter(t => t !== tech)
        : [...prev.technologyInterests, tech];
      return { ...prev, technologyInterests };
    });
  };

  const togglePriority = (priority: string) => {
    setStudentPreferences(prev => {
      const exists = prev.careerPriorities.includes(priority);
      const careerPriorities = exists
        ? prev.careerPriorities.filter(p => p !== priority)
        : [...prev.careerPriorities, priority];
      return { ...prev, careerPriorities };
    });
  };

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentPreferences(prev => ({
      ...prev,
      completedAt: new Date().toISOString(),
    }));
    setShowHandoff(true);
  };

  return (
    <div>
      <ProgressStepper currentStepIndex={2} />

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <span className="badge badge-indigo">Student Step 2 of 5</span>
          <span className="badge badge-teal">Independent Input</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          {t.assessment.studentTitle}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {t.assessment.studentSubtitle}
        </p>
      </div>

      <form onSubmit={handleSaveAndContinue} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* SECTION 1: Vocational Course Selection */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">1. Select Vocational Course / Trade</h3>
              <p className="card-subtitle">Choose the vocational specialization you are most excited to pursue</p>
            </div>
          </div>
          <CourseSelector targetRole="student" />
        </div>

        {/* SECTION 2: Skills & Technology Interests */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">2. Hands-on Skills & Technology Focus</h3>
              <p className="card-subtitle">Select practical activities and technologies you genuinely enjoy</p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Practical Skills You Want to Learn / Practice
            </label>
            <div className="chip-group">
              {AVAILABLE_SKILLS.map((skill) => {
                const isSelected = studentPreferences.skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    className={`chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSkill(skill)}
                  >
                    {isSelected && <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              Emerging Industry & Technology Interests
            </label>
            <div className="chip-group">
              {AVAILABLE_TECH.map((tech) => {
                const isSelected = studentPreferences.technologyInterests.includes(tech);
                return (
                  <button
                    key={tech}
                    type="button"
                    className={`chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleTech(tech)}
                  >
                    {isSelected && <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 3: Education Budget & Institution Constraints */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">3. Budget, Commute & Institution Preference</h3>
              <p className="card-subtitle">Set your realistic financial comfort zone and distance preferences</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {/* Budget Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {t.assessment.budgetLabel}
                </label>
                <span style={{ fontWeight: 700, color: 'var(--primary-700)', fontSize: '1rem' }}>
                  {formatCurrency(studentPreferences.budgetMax)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="120000"
                step="5000"
                value={studentPreferences.budgetMax}
                onChange={(e) => setStudentPreferences(prev => ({ ...prev, budgetMax: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: 'var(--primary-600)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                <span>₹10,000 (Govt Subsidized)</span>
                <span>₹1,20,000 (Private Institute)</span>
              </div>
            </div>

            {/* Commute Tolerance Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {t.assessment.commuteLabel}
                </label>
                <span style={{ fontWeight: 700, color: 'var(--teal-700)', fontSize: '1rem' }}>
                  {studentPreferences.commuteToleranceKm} km
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={studentPreferences.commuteToleranceKm}
                onChange={(e) => setStudentPreferences(prev => ({ ...prev, commuteToleranceKm: Number(e.target.value) }))}
                style={{ width: '100%', accentColor: 'var(--teal-600)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                <span>5 km (Local)</span>
                <span>50 km (Commutable Corridor)</span>
              </div>
            </div>

            {/* Institution Category */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {t.assessment.institutionLabel}
              </label>
              <select
                value={studentPreferences.preferredInstitutionType}
                onChange={(e) => setStudentPreferences(prev => ({ ...prev, preferredInstitutionType: e.target.value as any }))}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                }}
              >
                <option value="government">Government ITI / Polytechnic (Low fees, recognized)</option>
                <option value="government-aided">Government-Aided Polytechnic</option>
                <option value="private">Private Vocational Academy</option>
                <option value="any">Any Accredited Institution</option>
              </select>
            </div>

            {/* Duration Preference */}
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {t.assessment.durationLabel}
              </label>
              <select
                value={studentPreferences.durationPreferenceMonths}
                onChange={(e) => setStudentPreferences(prev => ({ ...prev, durationPreferenceMonths: Number(e.target.value) }))}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                }}
              >
                <option value={12}>1 Year (12 Months - Fast job entry certificate)</option>
                <option value={24}>2 Years (24 Months - Specialized ITI/Technician)</option>
                <option value={36}>3 Years (36 Months - Full Polytechnic Diploma)</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 4: Career Priorities & Starting Salary */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">4. Career Priorities & Salary Target</h3>
              <p className="card-subtitle">What outcome matters most to you upon graduation?</p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              {t.assessment.careerPrioritiesLabel}
            </label>
            <div className="chip-group">
              {CAREER_PRIORITY_OPTIONS.map((priority) => {
                const isSelected = studentPreferences.careerPriorities.includes(priority);
                return (
                  <button
                    key={priority}
                    type="button"
                    className={`chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => togglePriority(priority)}
                  >
                    {isSelected && <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />}
                    {priority}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {t.assessment.salaryExpectationLabel}
              </label>
              <span style={{ fontWeight: 700, color: 'var(--primary-700)', fontSize: '1rem' }}>
                {formatCurrency(studentPreferences.targetSalaryMonthly)} / mo
              </span>
            </div>
            <input
              type="range"
              min="15000"
              max="45000"
              step="1000"
              value={studentPreferences.targetSalaryMonthly}
              onChange={(e) => setStudentPreferences(prev => ({ ...prev, targetSalaryMonthly: Number(e.target.value) }))}
              style={{ width: '100%', accentColor: 'var(--primary-600)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
              <span>₹15,000 / mo</span>
              <span>₹45,000 / mo</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} /> {t.common.back}
          </button>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
          >
            {t.assessment.saveAndContinue} <ArrowRight size={18} />
          </button>
        </div>
      </form>

      {/* Handoff Modal */}
      <HandoffModal
        isOpen={showHandoff}
        onProceed={() => {
          setShowHandoff(false);
          navigate('/assessment/guardian');
        }}
      />
    </div>
  );
};
