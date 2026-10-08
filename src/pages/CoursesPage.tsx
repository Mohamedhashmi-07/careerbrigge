import React, { useState, useMemo } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { DEMO_COURSES } from '../data/demo/courses';
import { CourseCard } from '../components/courses/CourseCard';
import { DemoDataBadge } from '../components/common/Badges';
import { Search, Filter, BookOpen } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { t } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDuration, setSelectedDuration] = useState('ALL');

  const categories = useMemo(() => {
    return ['ALL', ...Array.from(new Set(DEMO_COURSES.map(c => c.category)))];
  }, []);

  const filtered = useMemo(() => {
    return DEMO_COURSES.filter(course => {
      const matchesCat = selectedCategory === 'ALL' || course.category === selectedCategory;
      const matchesDur =
        selectedDuration === 'ALL' ||
        (selectedDuration === '12' && course.durationMonths === 12) ||
        (selectedDuration === '24' && course.durationMonths === 24) ||
        (selectedDuration === '36' && course.durationMonths === 36);

      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.overview.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q);

      return matchesCat && matchesDur && matchesSearch;
    });
  }, [search, selectedCategory, selectedDuration]);

  return (
    <AppShell>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <BookOpen size={20} color="var(--primary-600)" />
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {t.courses.pageTitle}
              </h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {t.courses.pageSubtitle}
            </p>
          </div>
          <DemoDataBadge />
        </div>

        {/* Filter Controls */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder={t.courses.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem 0.65rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  outline: 'none',
                  fontSize: '0.88rem',
                }}
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                  fontSize: '0.88rem',
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'ALL' ? 'All Trade Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                  fontSize: '0.88rem',
                }}
              >
                <option value="ALL">All Durations</option>
                <option value="12">1 Year (12 Months Certificate)</option>
                <option value="24">2 Years (24 Months Technician)</option>
                <option value="36">3 Years (36 Months Polytechnic)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(course => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
};
