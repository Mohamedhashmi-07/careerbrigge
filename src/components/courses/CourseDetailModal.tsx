import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { explainCourseFit } from '../../services/ai/courseExplanationService';
import { AIExplanationCard } from './AIExplanationCard';
import { DemoDataBadge, SourceBadge } from '../common/Badges';
import {
  Clock,
  Layers,
  Building,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Award,
} from 'lucide-react';

export const CourseDetailModal: React.FC = () => {
  const {
    viewingCourse,
    closeCourseDetails,
    studentPreferences,
    parentPreferences,
    updateStudentCourse,
    updateParentCourse,
    formatCurrency,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'learn' | 'pathway' | 'jobs' | 'institutes' | 'ai'>('overview');

  if (!viewingCourse) return null;

  const aiAnalysis = explainCourseFit(viewingCourse, studentPreferences, parentPreferences);
  const isSelectedByStudent = studentPreferences.courseId === viewingCourse.id;
  const isSelectedByParent = parentPreferences.courseId === viewingCourse.id;

  return (
    <Modal
      isOpen={Boolean(viewingCourse)}
      onClose={closeCourseDetails}
      title={viewingCourse.title}
      maxWidth="880px"
    >
      <div>
        {/* Header Badges & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-indigo">{viewingCourse.category}</span>
            <span className="badge badge-teal">{viewingCourse.level}</span>
            <DemoDataBadge />
            {viewingCourse.officialSourceLabel && (
              <SourceBadge sourceLabel={viewingCourse.officialSourceLabel} />
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {isSelectedByStudent ? (
              <span className="badge badge-teal" style={{ padding: '0.4rem 0.8rem' }}>
                <CheckCircle size={14} /> {t.courses.currentlySelectedByStudent}
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  updateStudentCourse(viewingCourse.id);
                }}
              >
                {t.courses.selectForStudent}
              </button>
            )}

            {isSelectedByParent ? (
              <span className="badge badge-indigo" style={{ padding: '0.4rem 0.8rem' }}>
                <CheckCircle size={14} /> {t.courses.currentlySelectedByParent}
              </span>
            ) : (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  updateParentCourse(viewingCourse.id);
                }}
              >
                {t.courses.selectForParent}
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <Clock size={14} /> Duration
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
              {viewingCourse.durationLabel}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <Layers size={14} /> Estimated Annual Fee
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-700)', marginTop: '0.2rem' }}>
              {formatCurrency(viewingCourse.estimatedCostMin)} - {formatCurrency(viewingCourse.estimatedCostMax)}
              <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginLeft: '4px' }}>(Estimated)</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <Building size={14} /> Institute Types
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '0.2rem', textTransform: 'capitalize' }}>
              {viewingCourse.institutionTypes.join(', ')}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              <TrendingUp size={14} /> Industry Demand
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--teal-700)', marginTop: '0.2rem' }}>
              {viewingCourse.industryDemand}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto' }}>
          {[
            { id: 'overview', label: t.courses.overviewTab, icon: Layers },
            { id: 'learn', label: t.courses.whatYouLearnTab, icon: GraduationCap },
            { id: 'pathway', label: t.courses.careerPathTab, icon: TrendingUp },
            { id: 'jobs', label: t.courses.jobRolesTab, icon: Briefcase },
            { id: 'institutes', label: t.courses.institutesTab, icon: Building },
            { id: 'ai', label: t.courses.aiExplanationTab, icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: isActive ? 'var(--primary-600)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div>
            <p style={{ fontSize: '0.96rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {viewingCourse.overview}
            </p>

            <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
              <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>Eligibility Criteria</h5>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{viewingCourse.eligibility}</p>
            </div>

            <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>Further Study Pathways</h5>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.86rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {viewingCourse.furtherStudyOptions.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: What You Learn */}
        {activeTab === 'learn' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-700)', marginBottom: '0.5rem' }}>
                {t.courses.subjects}
              </h5>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {viewingCourse.whatYouLearn.subjects.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--teal-700)', marginBottom: '0.5rem' }}>
                {t.courses.technicalSkills}
              </h5>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {viewingCourse.whatYouLearn.technicalSkills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--amber-700)', marginBottom: '0.5rem' }}>
                {t.courses.practicalSkills}
              </h5>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {viewingCourse.whatYouLearn.practicalSkills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            <div style={{ background: 'var(--bg-card-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-800)', marginBottom: '0.5rem' }}>
                {t.courses.tools}
              </h5>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {viewingCourse.whatYouLearn.toolsAndTech.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Career Pathway */}
        {activeTab === 'pathway' && (
          <div>
            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#eff6ff', borderRadius: 'var(--radius-md)', fontSize: '0.84rem', color: '#1e40af' }}>
              <strong>Notice:</strong> This is an indicative career progression pathway based on typical industry outcomes. Progression depends on individual effort and skills; employment is not guaranteed.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {viewingCourse.careerPathway.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', background: '#ffffff', border: '1px solid var(--border-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{step.title}</h5>
                      <span className="badge badge-indigo">{step.timeframe}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.3rem 0' }}>{step.description}</p>
                    <div style={{ fontSize: '0.82rem', color: 'var(--teal-700)', fontWeight: 600 }}>
                      Indicative Pay (Demo): {step.salaryRangeDemo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Typical Job Roles */}
        {activeTab === 'jobs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ marginBottom: '0.5rem', padding: '0.75rem', background: '#eff6ff', borderRadius: 'var(--radius-md)', fontSize: '0.84rem', color: '#1e40af' }}>
              <strong>Industry Role Examples:</strong> Typical positions available across public and private sector employers.
            </div>
            {viewingCourse.typicalJobRoles.map((role, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{role.roleTitle}</h5>
                  <span className="badge badge-gray">{role.industrySector}</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  <strong>Key Responsibilities:</strong> {role.entryLevelExpectation}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Institutes Offering This */}
        {activeTab === 'institutes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {viewingCourse.institutes.map((inst) => (
              <div key={inst.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#ffffff', border: '1px solid var(--border-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>{inst.name}</h5>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {inst.city}, {inst.state} • <span style={{ textTransform: 'capitalize' }}>{inst.type}</span>
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                    Hostel: {inst.hostelAvailable ? 'Available on Campus' : 'Day scholar only'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-700)' }}>
                    {formatCurrency(inst.estimatedFeeAnnual)} / yr
                  </div>
                  <span className="badge badge-teal" style={{ marginTop: '0.3rem' }}>Govt Subsidized</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: AI Explanation */}
        {activeTab === 'ai' && (
          <AIExplanationCard analysis={aiAnalysis} />
        )}
      </div>
    </Modal>
  );
};
