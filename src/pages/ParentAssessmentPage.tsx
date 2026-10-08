import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { ParentAssessmentForm } from '../components/assessment/ParentAssessmentForm';

export const ParentAssessmentPage: React.FC = () => {
  return (
    <AppShell>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <ParentAssessmentForm />
      </div>
    </AppShell>
  );
};
