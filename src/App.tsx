import React from 'react';
import { useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { StudentAssessmentPage } from './pages/StudentAssessmentPage';
import { ParentAssessmentPage } from './pages/ParentAssessmentPage';
import { FamilyDecisionPage } from './pages/FamilyDecisionPage';
import { CoursesPage } from './pages/CoursesPage';
import { InstitutesPage } from './pages/InstitutesPage';
import { FundingPage } from './pages/FundingPage';
import { CareerPathPage } from './pages/CareerPathPage';
import { JobsPage } from './pages/JobsPage';
import { DashboardHomePage } from './pages/DashboardHomePage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { StreamsPage } from './pages/StreamsPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';

export const App: React.FC = () => {
  const { currentPath } = useApp();

  // Route matching
  if (currentPath === '/' || currentPath === '') {
    return <LandingPage />;
  }

  if (currentPath === '/assessment/student' || currentPath === '/dashboard/assessment') {
    return <StudentAssessmentPage />;
  }

  if (currentPath === '/assessment/guardian') {
    return <ParentAssessmentPage />;
  }

  if (currentPath === '/family-decision' || currentPath === '/dashboard/family-decision') {
    return <FamilyDecisionPage />;
  }

  if (currentPath === '/courses' || currentPath === '/dashboard/courses') {
    return <CoursesPage />;
  }

  if (currentPath === '/institutes' || currentPath === '/dashboard/institutes') {
    return <InstitutesPage />;
  }

  if (currentPath === '/dashboard/funding' || currentPath === '/dashboard/scholarships-loans') {
    return <FundingPage />;
  }

  if (currentPath === '/dashboard/career-path') {
    return <CareerPathPage />;
  }

  if (currentPath === '/dashboard/jobs') {
    return <JobsPage />;
  }

  if (currentPath === '/dashboard' || currentPath === '/dashboard/recommendations') {
    return <DashboardHomePage />;
  }

  if (currentPath === '/dashboard/profile') {
    return <ProfilePage />;
  }

  if (currentPath === '/dashboard/settings') {
    return <SettingsPage />;
  }

  if (currentPath === '/methodology') {
    return <MethodologyPage />;
  }

  if (currentPath === '/vocational-streams') {
    return <StreamsPage />;
  }

  if (currentPath === '/contact' || currentPath === '/dashboard/help') {
    return <ContactPage />;
  }

  if (currentPath === '/login') {
    return <LoginPage />;
  }

  // Default fallback
  return <LandingPage />;
};

export default App;
