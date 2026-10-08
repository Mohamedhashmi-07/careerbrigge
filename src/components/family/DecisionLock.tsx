import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FinalDecisionChoice } from '../../types/familyDecision';
import { DEMO_COURSES } from '../../data/demo/courses';
import { Lock, Unlock, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { DemoDataBadge } from '../common/Badges';

export const DecisionLock: React.FC = () => {
  const {
    studentPreferences,
    parentPreferences,
    finalDecision,
    lockFamilyDecision,
    unlockFamilyDecision,
    navigate,
    t,
  } = useApp();

  const [selectedChoice, setSelectedChoice] = useState<FinalDecisionChoice>('choose_mutual_option');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('diploma-mechatronics');
  const [notes, setNotes] = useState<string>('Agreed to pursue a 3-year Diploma in Mechatronics at Government Central Polytechnic with EV specialization elective.');

  const studentCourse = DEMO_COURSES.find(c => c.id === studentPreferences.courseId);
  const parentCourse = DEMO_COURSES.find(c => c.id === parentPreferences.courseId);

  const handleLock = () => {
    let targetCourseId = selectedCourseId;
    if (selectedChoice === 'choose_student_preference') {
      targetCourseId = studentPreferences.courseId;
    } else if (selectedChoice === 'choose_parent_preference') {
      targetCourseId = parentPreferences.courseId;
    }
    lockFamilyDecision(selectedChoice, targetCourseId, notes);
  };

  return (
    <div className="card" style={{ border: finalDecision?.isLocked ? '2px solid var(--teal-500)' : '2px solid var(--primary-300)' }}>
      <div className="card-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Lock size={18} color="var(--primary-600)" />
            <h3 className="card-title">{t.family.decisionTitle}</h3>
            {finalDecision?.isLocked ? (
              <span className="badge badge-teal">{t.family.lockedBadge}</span>
            ) : (
              <DemoDataBadge label="Explicit Choice Required" />
            )}
          </div>
          <p className="card-subtitle">{t.family.decisionSubtitle}</p>
        </div>
      </div>

      {finalDecision?.isLocked ? (
        /* Confirmed & Locked State */
        <div style={{ background: 'var(--teal-50)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--teal-200)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--teal-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle size={22} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--teal-900)' }}>
                {t.family.lockedNotice}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--teal-800)', marginTop: '0.25rem' }}>
                Agreed Course: <strong>{finalDecision.selectedCourseTitle}</strong>
              </p>
              {finalDecision.notes && (
                <p style={{ fontSize: '0.85rem', color: 'var(--teal-700)', marginTop: '0.4rem', fontStyle: 'italic' }}>
                  "{finalDecision.notes}"
                </p>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-teal btn-lg"
              onClick={() => navigate('/dashboard/funding')}
            >
              Explore Eligible Scholarships & Loans <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={unlockFamilyDecision}
            >
              <Unlock size={16} /> Reopen Decision
            </button>
          </div>
        </div>
      ) : (
        /* Unlocked Choice Selector */
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              {
                id: 'choose_student_preference' as FinalDecisionChoice,
                label: `${t.family.optStudent} (${studentCourse?.title.split(' ')[0]}...)`,
                desc: 'Prioritize student hands-on interest',
              },
              {
                id: 'choose_parent_preference' as FinalDecisionChoice,
                label: `${t.family.optParent} (${parentCourse?.title.split(' ')[0]}...)`,
                desc: 'Prioritize parent stability & PSU eligibility',
              },
              {
                id: 'choose_mutual_option' as FinalDecisionChoice,
                label: t.family.optMutual,
                desc: 'Adopt recommended bridge course',
              },
              {
                id: 'continue_discussion' as FinalDecisionChoice,
                label: t.family.optDiscuss,
                desc: 'Keep exploring without locking',
              },
              {
                id: 'not_decided' as FinalDecisionChoice,
                label: t.family.optUndecided,
                desc: 'Pending family consultation',
              },
            ].map(option => {
              const isSelected = selectedChoice === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedChoice(option.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid',
                    borderColor: isSelected ? 'var(--primary-600)' : 'var(--border-subtle)',
                    background: isSelected ? 'var(--primary-50)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: isSelected ? 'var(--primary-800)' : 'var(--text-main)', marginBottom: '0.2rem' }}>
                    {option.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {option.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* If Mutual Option, choose which one */}
          {selectedChoice === 'choose_mutual_option' && (
            <div style={{ marginBottom: '1.25rem', background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Select Agreed Course:
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                  fontWeight: 600,
                }}
              >
                <option value="diploma-mechatronics">Diploma in Mechatronics & Industrial Automation (3 Yrs)</option>
                <option value="solar-technician">Solar PV Installation & Maintenance (Suryamitra) (1 Yr)</option>
                <option value="diploma-eee">Diploma in EEE with Electric Mobility Elective (3 Yrs)</option>
              </select>
            </div>
          )}

          {/* Family notes */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Family Consensus Agreement Notes:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., We both agreed on Mechatronics as it gives a recognized diploma plus EV robotics practical skills."
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

          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleLock}
          >
            <Lock size={18} /> {t.family.lockButton}
          </button>
        </div>
      )}
    </div>
  );
};
