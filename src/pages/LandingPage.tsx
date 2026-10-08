import React from 'react';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from '../components/common/LanguageSelector';
import { DemoDataBadge } from '../components/common/Badges';
import { DEMO_COURSES } from '../data/demo/courses';
import {
  GraduationCap,
  Users2,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate, openCourseDetails, formatCurrency, t } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      {/* Top Navigation */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid var(--border-subtle)', position: 'sticky', top: 0, zIndex: 30 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div className="brand-logo-icon">
              <GraduationCap size={22} />
            </div>
            <div>
              <span className="brand-title">{t.brand.name}</span>
              <span className="brand-sub">{t.brand.tagline}</span>
            </div>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'none', gap: '1.25rem', fontSize: '0.9rem', fontWeight: 500 }} className="desktop-links">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/methodology'); }}>{t.nav.methodology}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/vocational-streams'); }}>{t.nav.vocationalStreams}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/courses'); }}>{t.nav.courses}</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>{t.nav.contact}</a>
            </div>

            <LanguageSelector />

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/login')}
            >
              {t.nav.signIn}
            </button>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: '4.5rem 2rem 3.5rem', textAlign: 'center', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary-100)', color: 'var(--primary-800)', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          <ShieldCheck size={16} />
          <span>{t.landing.heroBadge}</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
          {t.landing.heroTitle}
        </h1>

        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-muted)', maxWidth: '780px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
          {t.landing.heroSubtitle}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/assessment/student')}
          >
            <Compass size={20} />
            {t.landing.ctaStart}
            <ArrowRight size={20} />
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-lg"
            onClick={() => navigate('/courses')}
          >
            {t.landing.ctaExploreCourses}
          </button>
        </div>
      </section>

      {/* FAMILY DECISION ENGINE PREVIEW */}
      <section style={{ padding: '0 2rem 4rem', maxWidth: '1180px', margin: '0 auto', width: '100%' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff, #f7f8fe)', border: '2px solid var(--primary-200)', padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users2 size={20} color="var(--primary-600)" />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {t.landing.previewTitle}
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {t.landing.previewSubtitle}
              </p>
            </div>
            <DemoDataBadge label="Live Demonstration Engine" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Student Preview Box */}
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--teal-200)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-teal">{t.landing.studentPerspective}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600 }}>Independent Input</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Electric Vehicle Service Technician
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                1 Year Certificate • Hands-on Lithium Battery Diagnostics • Budget: ₹35,000
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--teal-700)', fontWeight: 600 }}>
                ✓ Prioritizes fast workshop employment & futuristic green tech
              </div>
            </div>

            {/* Parent Preview Box */}
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--primary-200)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-indigo">{t.landing.parentPerspective}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600 }}>Independent Input</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Diploma in Electrical & Electronics (EEE)
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                3 Years Polytechnic • Govt Accredited Syllabus • Budget: ₹60,000
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                ✓ Prioritizes state electricity board PSU job stability
              </div>
            </div>

            {/* AI Alignment & Consensus */}
            <div style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--amber-200)', padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                {t.landing.alignmentMetric}
              </span>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--primary-700)', lineHeight: 1.1, margin: '0.3rem 0' }}>
                83%
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Strong shared affinity for electrical trades; divergent in duration & credential depth.
              </div>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/family-decision')}
              >
                Inspect Family Decision Engine <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW CAREERBRIDGE WORKS (6 STEPS) */}
      <section style={{ padding: '4rem 2rem', background: '#ffffff', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              {t.landing.howItWorksTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.4rem' }}>
              {t.landing.howItWorksSubtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              { num: '01', title: t.landing.step1Title, desc: t.landing.step1Desc },
              { num: '02', title: t.landing.step2Title, desc: t.landing.step2Desc },
              { num: '03', title: t.landing.step3Title, desc: t.landing.step3Desc },
              { num: '04', title: t.landing.step4Title, desc: t.landing.step4Desc },
              { num: '05', title: t.landing.step5Title, desc: t.landing.step5Desc },
              { num: '06', title: t.landing.step6Title, desc: t.landing.step6Desc },
            ].map(step => (
              <div key={step.num} style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary-400)', marginBottom: '0.5rem' }}>
                  {step.num}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VOCATIONAL CAREERS */}
      <section style={{ padding: '4.5rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {t.landing.featuredSectionTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
              {t.landing.featuredSectionSubtitle}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/courses')}
          >
            Browse All Courses <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {DEMO_COURSES.slice(0, 3).map(course => (
            <div key={course.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="badge badge-indigo" style={{ marginBottom: '0.75rem' }}>{course.category}</span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  {course.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  {course.overview}
                </p>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: 'var(--bg-card-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                  <div><strong>Duration:</strong> {course.durationLabel}</div>
                  <div><strong>Est. Annual Tuition:</strong> {formatCurrency(course.estimatedCostMin)}*</div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => openCourseDetails(course)}
              >
                Explore Syllabus & Career Path
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-700), var(--primary-900))', color: '#ffffff', padding: '5rem 2rem', textAlign: 'center', marginTop: 'auto' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Empower Your Family Decision Today
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '2rem' }}>
            Begin with a transparent 5-minute assessment. Capture student aspirations and guardian priorities without conflict.
          </p>

          <button
            type="button"
            className="btn btn-lg"
            style={{ background: '#ffffff', color: 'var(--primary-800)', fontWeight: 700, boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}
            onClick={() => navigate('/assessment/student')}
          >
            Start Joint Family Counselling <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};
