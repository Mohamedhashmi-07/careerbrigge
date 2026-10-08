import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, getTranslation, Translations } from '../i18n';
import { StudentPreferences, ParentPreferences } from '../types/preferences';
import { VocationalCourse } from '../types/course';
import { FinalDecisionRecord } from '../types/familyDecision';
import { DocumentVaultItem } from '../types/funding';
import {
  INITIAL_STUDENT_PREFERENCES,
  INITIAL_PARENT_PREFERENCES,
  INITIAL_DOCUMENT_VAULT,
} from '../data/demo/defaultPreferences';
import { DEMO_COURSES } from '../data/demo/courses';
import confetti from 'canvas-confetti';

interface AppContextType {
  // i18n
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;

  // Navigation
  currentPath: string;
  navigate: (path: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  // Independent Preferences
  studentPreferences: StudentPreferences;
  setStudentPreferences: React.Dispatch<React.SetStateAction<StudentPreferences>>;
  parentPreferences: ParentPreferences;
  setParentPreferences: React.Dispatch<React.SetStateAction<ParentPreferences>>;
  updateStudentCourse: (courseId: string) => void;
  updateParentCourse: (courseId: string) => void;

  // Course Details Modal
  viewingCourse: VocationalCourse | null;
  openCourseDetails: (courseIdOrObj: string | VocationalCourse) => void;
  closeCourseDetails: () => void;

  // Family Decision Lock
  finalDecision: FinalDecisionRecord | null;
  lockFamilyDecision: (choice: any, courseId: string, notes: string) => void;
  unlockFamilyDecision: () => void;

  // Document Vault
  documents: DocumentVaultItem[];
  uploadDocumentDemo: (docId: string, fileName: string) => void;

  // Auth / Mode status
  authMode: 'demo' | 'supabase';
  currentUser: { name: string; role: 'student' | 'guardian' | 'family' };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language State
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('careerbridge-language');
    if (saved === 'ta' || saved === 'hi' || saved === 'en') {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('careerbridge-language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = getTranslation(language);

  // Currency & Date helpers
  const formatCurrency = (amount: number): string => {
    const locale = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    const locale = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    try {
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(dateString));
    } catch {
      return dateString;
    }
  };

  // 2. Navigation State (Lightweight SPA Router with browser history)
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // 3. INDEPENDENT PREFERENCE STATES (Strict separation)
  const [studentPreferences, setStudentPreferences] = useState<StudentPreferences>(() => {
    const saved = localStorage.getItem('careerbridge_student_prefs_local');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_STUDENT_PREFERENCES;
  });

  const [parentPreferences, setParentPreferences] = useState<ParentPreferences>(() => {
    const saved = localStorage.getItem('careerbridge_parent_prefs_local');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_PARENT_PREFERENCES;
  });

  const updateStudentCourse = (courseId: string) => {
    setStudentPreferences(prev => {
      const updated = { ...prev, courseId };
      localStorage.setItem('careerbridge_student_prefs_local', JSON.stringify(updated));
      return updated;
    });
  };

  const updateParentCourse = (courseId: string) => {
    setParentPreferences(prev => {
      const updated = { ...prev, courseId };
      localStorage.setItem('careerbridge_parent_prefs_local', JSON.stringify(updated));
      return updated;
    });
  };

  // 4. Course Details Modal
  const [viewingCourse, setViewingCourse] = useState<VocationalCourse | null>(null);

  const openCourseDetails = (courseIdOrObj: string | VocationalCourse) => {
    if (typeof courseIdOrObj === 'string') {
      const found = DEMO_COURSES.find(c => c.id === courseIdOrObj);
      if (found) setViewingCourse(found);
    } else {
      setViewingCourse(courseIdOrObj);
    }
  };

  const closeCourseDetails = () => setViewingCourse(null);

  // 5. Family Decision Lock
  const [finalDecision, setFinalDecision] = useState<FinalDecisionRecord | null>(() => {
    const saved = localStorage.getItem('careerbridge_family_decision_local');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return null;
  });

  const lockFamilyDecision = (choice: any, courseId: string, notes: string) => {
    const matched = DEMO_COURSES.find(c => c.id === courseId);
    const title = matched ? matched.title : courseId;

    const record: FinalDecisionRecord = {
      choice,
      selectedCourseId: courseId,
      selectedCourseTitle: title,
      agreedByStudent: true,
      agreedByParent: true,
      notes,
      decidedAt: new Date().toISOString(),
      isLocked: true,
    };

    setFinalDecision(record);
    localStorage.setItem('careerbridge_family_decision_local', JSON.stringify(record));

    // Celebrate with confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#14B8A6', '#F59E0B', '#6366F1'],
      });
    } catch {}
  };

  const unlockFamilyDecision = () => {
    setFinalDecision(null);
    localStorage.removeItem('careerbridge_family_decision_local');
  };

  // 6. Document Vault
  const [documents, setDocuments] = useState<DocumentVaultItem[]>(() => {
    const saved = localStorage.getItem('careerbridge_doc_vault_local');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_DOCUMENT_VAULT;
  });

  const uploadDocumentDemo = (docId: string, fileName: string) => {
    setDocuments(prev => {
      const updated = prev.map(d => {
        if (d.id === docId) {
          return {
            ...d,
            status: 'uploaded' as const,
            fileName: fileName || `${d.title.toLowerCase().replace(/\s+/g, '_')}.pdf`,
            fileSize: '1.4 MB',
            uploadedAt: new Date().toISOString().split('T')[0],
          };
        }
        return d;
      });
      localStorage.setItem('careerbridge_doc_vault_local', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        formatCurrency,
        formatDate,
        currentPath,
        navigate,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        studentPreferences,
        setStudentPreferences,
        parentPreferences,
        setParentPreferences,
        updateStudentCourse,
        updateParentCourse,
        viewingCourse,
        openCourseDetails,
        closeCourseDetails,
        finalDecision,
        lockFamilyDecision,
        unlockFamilyDecision,
        documents,
        uploadDocumentDemo,
        authMode: 'demo',
        currentUser: {
          name: 'Karthik & Soundararajan Family',
          role: 'family',
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
