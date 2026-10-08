import React from 'react';
import { AppShell } from '../components/layout/AppShell';
import { StudentAssessmentForm } from '../components/assessment/StudentAssessmentForm';

export const StudentAssessmentPage: React.FC = () => {
  return (
    <AppShell>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <StudentAssessmentForm />
      </div>
    </AppShell>
  );
};
