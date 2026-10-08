import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import { ArrowRight, Zap, Cpu, Sun, Wrench, Shield, HeartPulse } from 'lucide-react';

export const StreamsPage: React.FC = () => {
  const { navigate, openCourseDetails } = useApp();

  const streams = [
    {
      title: 'Automotive & Electric Mobility',
      icon: Zap,
      desc: 'High-growth sector covering battery management, EV drive motors, charging infrastructure, and smart vehicle diagnostics.',
      color: 'var(--teal-600)',
      courseId: 'ev-technician',
    },
    {
      title: 'Electrical & Industrial Power',
      icon: Cpu,
      desc: 'Foundational trade with high public sector recruitment in state electricity boards, power grids, and manufacturing panels.',
      color: 'var(--primary-600)',
      courseId: 'diploma-eee',
    },
    {
      title: 'Renewable Energy & Solar PV',
      icon: Sun,
      desc: 'Suryamitra certified training focused on rooftop solar installation, grid tie inverters, and green power maintenance.',
      color: 'var(--amber-500)',
      courseId: 'solar-technician',
    },
    {
      title: 'Precision Manufacturing & Robotics',
      icon: Wrench,
      desc: 'Industry 4.0 mechatronics, CNC programming, robotic arm operation, and smart factory automated assembly lines.',
      color: 'var(--primary-800)',
      courseId: 'diploma-mechatronics',
    },
    {
      title: 'IT & Cloud Infrastructure',
      icon: Shield,
      desc: 'Computer networking, Linux server administration, AWS/Azure cloud basics, and cybersecurity vulnerability assessment.',
      color: 'var(--primary-700)',
      courseId: 'cloud-cyber-tech',
    },
    {
      title: 'Healthcare & Biomedical Devices',
      icon: HeartPulse,
      desc: 'Hospital diagnostic equipment maintenance, calibration of ECG, patient monitors, ventilators, and dialysis systems.',
      color: 'var(--rose-600)',
      courseId: 'medical-equipment-tech',
    },
  ];

  return (
    <AppShell>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span className="badge badge-teal">National Skill Qualification Framework (NSQF)</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Vocational & Technical Education Streams
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.2rem' }}>
            Curated high-growth sectors with certified curriculum, immediate apprenticeships, and career pathways
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {streams.map((stream, idx) => {
            const Icon = stream.icon;
            return (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--bg-card-subtle)', color: stream.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '1px solid var(--border-subtle)' }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    {stream.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {stream.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => openCourseDetails(stream.courseId)}
                  >
                    View Curriculum
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => navigate('/courses')}
                  >
                    Explore Courses <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
};
