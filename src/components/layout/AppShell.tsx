import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Footer } from './Footer';
import { CourseDetailModal } from '../courses/CourseDetailModal';

export const AppShell: React.FC<{ children: React.ReactNode; hideSidebar?: boolean }> = ({
  children,
  hideSidebar = false,
}) => {
  return (
    <div className="app-container">
      {!hideSidebar && <Sidebar />}

      <div className="main-wrapper" style={hideSidebar ? { marginLeft: 0 } : undefined}>
        <TopBar />
        <main className="page-content">{children}</main>
        <Footer />
      </div>

      {/* Global Course Details Modal */}
      <CourseDetailModal />
    </div>
  );
};
