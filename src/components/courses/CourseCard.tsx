import React from 'react';
import { VocationalCourse } from '../../types/course';
import { useApp } from '../../context/AppContext';
import { Clock, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DemoDataBadge } from '../common/Badges';

interface CourseCardProps {
  course: VocationalCourse;
  targetRole?: 'student' | 'parent';
  onSelect?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  targetRole,
  onSelect,
}) => {
  const {
    openCourseDetails,
    studentPreferences,
    parentPreferences,
    updateStudentCourse,
    updateParentCourse,
    formatCurrency,
    t,
  } = useApp();

  const isStudentSelected = studentPreferences.courseId === course.id;
  const isParentSelected = parentPreferences.courseId === course.id;

  const handleSelect = () => {
    if (onSelect) {
      onSelect();
      return;
    }
    if (targetRole === 'student') {
      updateStudentCourse(course.id);
    } else if (targetRole === 'parent') {
      updateParentCourse(course.id);
    } else {
      updateStudentCourse(course.id);
    }
  };

  const isCurrentRoleSelected =
    targetRole === 'student' ? isStudentSelected : targetRole === 'parent' ? isParentSelected : isStudentSelected;

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: isCurrentRoleSelected ? 'var(--primary-600)' : 'var(--border-subtle)',
        borderWidth: isCurrentRoleSelected ? '2px' : '1px',
        position: 'relative',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
    >
      <div>
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.4rem' }}>
          <span className="badge badge-indigo">{course.category}</span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <DemoDataBadge />
            <span className="badge badge-gray">{course.level.split(' ')[0]}</span>
          </div>
        </div>

        {/* Title */}
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.35, marginBottom: '0.5rem' }}>
          {course.title}
        </h4>

        {/* Overview excerpt */}
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {course.overview}
        </p>

        {/* Course Attributes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: 'var(--bg-card-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.82rem' }}>
          <div>
            <div style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={12} /> {t.courses.duration}
            </div>
            <div style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '0.1rem' }}>
              {course.durationLabel}
            </div>
          </div>

          <div>
            <div style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Layers size={12} /> {t.courses.estimatedCost}
            </div>
            <div style={{ fontWeight: 600, color: 'var(--primary-700)', marginTop: '0.1rem' }}>
              {formatCurrency(course.estimatedCostMin)}*
            </div>
          </div>
        </div>

        {/* Career Pathway Preview */}
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          <strong style={{ color: 'var(--text-main)' }}>Typical Pathway: </strong>
          <span>
            {course.careerPathway[0]?.title.split('/')[0]} → {course.careerPathway[1]?.title.split('/')[0]} → {course.careerPathway[2]?.title.split('/')[0]}
          </span>
        </div>
      </div>

      {/* Selected Indicator Banner */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          {isStudentSelected && (
            <span className="badge badge-teal" style={{ fontSize: '0.74rem' }}>
              <CheckCircle2 size={12} /> {t.courses.currentlySelectedByStudent}
            </span>
          )}
          {isParentSelected && (
            <span className="badge badge-indigo" style={{ fontSize: '0.74rem' }}>
              <CheckCircle2 size={12} /> {t.courses.currentlySelectedByParent}
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
            onClick={() => openCourseDetails(course)}
          >
            {t.assessment.viewDetails}
          </button>

          <button
            type="button"
            className={`btn btn-sm ${isCurrentRoleSelected ? 'btn-teal' : 'btn-primary'}`}
            style={{ flex: 1 }}
            onClick={handleSelect}
          >
            {isCurrentRoleSelected ? (
              <>
                <CheckCircle2 size={14} /> Selected
              </>
            ) : (
              <>
                {t.assessment.selectCourse} <ArrowRight size={13} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
