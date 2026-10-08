import React from 'react';
import { AlignmentStatus } from '../../types/familyDecision';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Info, CheckCircle2, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';

export const DemoDataBadge: React.FC<{ label?: string }> = ({ label }) => {
  const { t } = useApp();
  return (
    <span className="badge badge-amber" title="Demo sample data for UI evaluation">
      <Info size={12} />
      <span>{label || t.common.demoBadge}</span>
    </span>
  );
};

export const SourceBadge: React.FC<{ sourceLabel: string; isOfficial?: boolean }> = ({ sourceLabel, isOfficial = true }) => {
  return (
    <span className={`badge ${isOfficial ? 'badge-teal' : 'badge-gray'}`} title={sourceLabel}>
      <ShieldCheck size={12} />
      <span>{sourceLabel}</span>
    </span>
  );
};

export const AlignmentBadge: React.FC<{ status: AlignmentStatus }> = ({ status }) => {
  const { t } = useApp();

  switch (status) {
    case 'aligned':
      return (
        <span className="badge badge-teal">
          <CheckCircle2 size={12} />
          <span>{t.family.statusAligned}</span>
        </span>
      );
    case 'partially_aligned':
      return (
        <span className="badge badge-amber">
          <AlertTriangle size={12} />
          <span>{t.family.statusPartial}</span>
        </span>
      );
    case 'different':
      return (
        <span className="badge badge-rose">
          <XCircle size={12} />
          <span>{t.family.statusDifferent}</span>
        </span>
      );
    case 'not_specified':
    default:
      return (
        <span className="badge badge-gray">
          <HelpCircle size={12} />
          <span>{t.family.statusNotSpecified}</span>
        </span>
      );
  }
};
