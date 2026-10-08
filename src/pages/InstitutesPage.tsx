import React, { useState, useMemo } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { DEMO_INSTITUTES } from '../data/demo/institutes';
import { DemoDataBadge, SourceBadge } from '../components/common/Badges';
import { Building, MapPin, Search, CheckCircle2, Phone, ExternalLink } from 'lucide-react';

export const InstitutesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const filtered = useMemo(() => {
    return DEMO_INSTITUTES.filter(inst => {
      const matchesType = typeFilter === 'ALL' || inst.type === typeFilter;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inst.name.toLowerCase().includes(q) ||
        inst.city.toLowerCase().includes(q) ||
        inst.state.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [search, typeFilter]);

  return (
    <AppShell>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <Building size={20} color="var(--primary-600)" />
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Vocational Institutes Directory
              </h1>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Explore accredited Government ITIs, State Polytechnics, and Skill Training Hubs
            </p>
          </div>
          <DemoDataBadge />
        </div>

        {/* Filter bar */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder="Search by institute name, city (e.g. Chennai, Delhi)..."
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  background: '#ffffff',
                  fontSize: '0.88rem',
                }}
              >
                <option value="ALL">All Institute Types</option>
                <option value="government">Government ITI / Polytechnic</option>
                <option value="government-aided">Government-Aided</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>

        {/* Institute Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {filtered.map(inst => (
            <div key={inst.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge badge-teal" style={{ textTransform: 'capitalize' }}>{inst.type}</span>
                  <span className="badge badge-gray">{inst.code}</span>
                </div>

                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                  {inst.name}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.84rem', marginBottom: '1rem' }}>
                  <MapPin size={14} color="var(--primary-600)" />
                  <span>{inst.city}, {inst.state}</span>
                </div>

                <div style={{ background: 'var(--bg-card-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
                  <div><strong>Affiliation:</strong> {inst.affiliatingBody}</div>
                  <div><strong>Estimated Annual Fee:</strong> {inst.annualFeeDemo}</div>
                  <div><strong>Hostel:</strong> {inst.hasHostel ? 'Yes, Available' : 'No (Day Scholar Only)'}</div>
                  <div><strong>Labs & Workshop:</strong> {inst.labRatingDemo}</div>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--teal-700)', fontWeight: 600, marginBottom: '1rem' }}>
                  Placement: {inst.placementAssistance}
                </div>
              </div>

              {inst.contactPhone && (
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Phone size={13} /> {inst.contactPhone}
                  </span>
                  <span className="badge badge-indigo">Admissions Active</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};
