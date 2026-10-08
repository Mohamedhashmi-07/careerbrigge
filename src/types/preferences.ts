export interface StudentPreferences {
  courseId: string;
  careerField: string;
  skills: string[];
  technologyInterests: string[];
  budgetMax: number;
  locationPreference: string;
  preferredInstitutionType: 'any' | 'government' | 'private' | 'government-aided';
  durationPreferenceMonths: number;
  commuteToleranceKm: number;
  careerPriorities: string[];
  targetSalaryMonthly: number;
  learningMode: 'hands_on' | 'balanced' | 'theory_oriented';
  completedAt?: string;
}

export interface ParentPreferences {
  courseId: string;
  careerExpectations: string;
  jobSecurityPriority: 'high' | 'medium' | 'flexible';
  employmentPathwayPreference: 'immediate_job' | 'higher_studies' | 'government_exams' | 'entrepreneurship';
  budgetMax: number;
  locationPreference: string;
  preferredInstitutionType: 'any' | 'government' | 'private' | 'government-aided';
  durationPreferenceMonths: number;
  commuteToleranceKm: number;
  hostelPreference: 'acceptable' | 'home_only' | 'flexible';
  familyConstraints: string[];
  parentDeclaration: boolean;
  parentName?: string;
  completedAt?: string;
}
