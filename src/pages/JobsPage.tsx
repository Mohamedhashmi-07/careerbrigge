import React, { useState, useMemo } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { DEMO_JOBS } from '../data/demo/jobs';
import { DemoDataBadge, SourceBadge } from '../components/common/Badges';
import { Briefcase, MapPin, Clock, Search, ExternalLink, ShieldAlert } from 'lucide-react';

export const JobsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [tradeFilter, setTradeFilter] = useState('ALL');

  const trades = useMemo(() => {
    return ['ALL', ...Array.from(new Set(DEMO_JOBS.map(j => j.trade)))];
  }, []);

  const filtered = useMemo(() => {
    return DEMO_JOBS.filter(job => {
      const matchesTrade = tradeFilter === 'ALL' || job.trade === tradeFilter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.companyDemo.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      return matchesTrade && matchesSearch;
    });
  }, [search, tradeFilter]);

  return (
    <AppShell>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <Briefcase size={20} color="var(--primary-600)" />
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Vocational Apprenticeship & Job Feeds
              </h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Explore real-world apprenticeships (NAPS) and entry-level positions
            </p>
          </div>
          <DemoDataBadge label="Demo Sample Feed" />
        </div>

        {/* Integration notice */}
        <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#92400e', fontSize: '0.85rem' }}>
          <ShieldAlert size={18} style={{ flexShrink: 0 }} />
          <span>
            <strong>Data Disclosure:</strong> Demo job data — live jobs integration with National Career Service (NCS) and Skill India Digital API is not configured in this demo build.
          </span>
        </div>

        {/* Filters */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
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
                value={tradeFilter}
                onChange={(e) => setTradeFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                  fontSize: '0.88rem',
                }}
              >
                {trades.map(t => (
                  <option key={t} value={t}>
                    {t === 'ALL' ? 'All Vocational Trades' : t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(job => (
            <div
              key={job.id}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ maxWidth: '650px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-indigo">{job.trade}</span>
                  <span className="badge badge-teal">{job.workType}</span>
                  <DemoDataBadge />
                </div>

                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  {job.title}
                </h4>

                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                  {job.companyDemo}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={13} color="var(--primary-600)" /> {job.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} /> Posted {job.postedDaysAgo} days ago
                  </span>
                  <span>Qualification: {job.minQualification}</span>
                </div>

                <div className="chip-group">
                  {job.skillsRequired.map((s, idx) => (
                    <span key={idx} className="chip" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                  {job.salaryRangeDemo}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                  {job.officialSourceLabel}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  title="Live job board integration not configured"
                  disabled
                  style={{ opacity: 0.8 }}
                >
                  Apply (Portal Link Demo)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};
