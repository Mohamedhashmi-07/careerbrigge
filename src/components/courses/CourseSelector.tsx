import React, { useState, useMemo } from 'react';
import { DEMO_COURSES } from '../../data/demo/courses';
import { CourseCard } from './CourseCard';
import { useApp } from '../../context/AppContext';
import { Search, CheckCircle2, RotateCcw } from 'lucide-react';

interface CourseSelectorProps {
  targetRole: 'student' | 'parent';
}

export const CourseSelector: React.FC<CourseSelectorProps> = ({ targetRole }) => {
  const {
    studentPreferences,
    parentPreferences,
    openCourseDetails,
    t,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const currentCourseId = targetRole === 'student' ? studentPreferences.courseId : parentPreferences.courseId;
  const currentSelectedCourse = DEMO_COURSES.find(c => c.id === currentCourseId);

  const categories = useMemo(() => {
    const set = new Set(DEMO_COURSES.map(c => c.category));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filteredCourses = useMemo(() => {
    return DEMO_COURSES.filter(course => {
      const matchesCat = selectedCategory === 'ALL' || course.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.overview.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div>
      {/* Currently Selected Course Spotlight */}
      <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '2px solid var(--primary-500)', padding: '1.25rem', marginBottom: '1.75rem', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={16} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-700)', textTransform: 'uppercase' }}>
                {targetRole === 'student' ? 'Student Selected Trade' : 'Parent Preferred Trade'}
              </span>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.1rem' }}>
                {currentSelectedCourse ? currentSelectedCourse.title : 'No course chosen yet'}
              </h4>
            </div>
          </div>

          {currentSelectedCourse && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => openCourseDetails(currentSelectedCourse)}
              >
                {t.assessment.viewDetails}
              </button>
            </div>
          )}
        </div>

        {currentSelectedCourse && (
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.84rem', color: 'var(--text-muted)', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
            <span><strong>Duration:</strong> {currentSelectedCourse.durationLabel}</span>
            <span><strong>Level:</strong> {currentSelectedCourse.level}</span>
            <span><strong>Estimated Fee:</strong> ₹{currentSelectedCourse.estimatedCostMin.toLocaleString('en-IN')} - ₹{currentSelectedCourse.estimatedCostMax.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>

      {/* Course Search & Filter Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input
            type="text"
            placeholder={t.courses.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.8rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              background: '#ffffff',
              outline: 'none',
              boxShadow: 'var(--shadow-xs)',
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  border: 'none',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 600 : 500,
                  cursor: 'pointer',
                  background: isSelected ? 'var(--primary-600)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: isSelected ? 'var(--primary-600)' : 'var(--border-subtle)',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat === 'ALL' ? t.courses.filterCategory : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Course Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            targetRole={targetRole}
          />
        ))}
      </div>
    </div>
  );
};
