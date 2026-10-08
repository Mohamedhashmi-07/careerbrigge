export type AlignmentStatus = 'aligned' | 'partially_aligned' | 'different' | 'not_specified';

export interface MatrixRow {
  dimensionKey: string;
  dimensionLabel: string;
  studentValue: string;
  parentValue: string;
  status: AlignmentStatus;
  detailNote?: string;
}

export interface DifferenceExplanation {
  id: string;
  dimension: string;
  dimensionLabel: string;
  studentPerspective: string;
  parentPerspective: string;
  analysisText: string;
  suggestedBridge: string;
}

export interface MutualOption {
  courseId: string;
  courseTitle: string;
  category: string;
  durationLabel: string;
  estimatedCostRange: string;
  institutionType: string;
  familyMatchPercent: number;
  studentMatchPercent: number;
  parentMatchPercent: number;
  careerPathSummary: string;
  whyItFits: string[];
  tradeOffs: string[];
}

export interface WhatIfParameters {
  parentBudgetMax: number;
  studentBudgetMax: number;
  preferredDurationMonths: number;
  commuteToleranceKm: number;
  institutionType: 'any' | 'government' | 'private' | 'government-aided';
  allowHostel: boolean;
}

export interface WhatIfSimulationResult {
  currentMatchPercent: number;
  simulatedMatchPercent: number;
  deltaPercent: number;
  explanation: string;
  impactFactors: {
    factor: string;
    impact: 'positive' | 'neutral' | 'negative';
    detail: string;
  }[];
}

export type FinalDecisionChoice =
  | 'choose_student_preference'
  | 'choose_parent_preference'
  | 'choose_mutual_option'
  | 'continue_discussion'
  | 'not_decided';

export interface FinalDecisionRecord {
  choice: FinalDecisionChoice;
  selectedCourseId: string;
  selectedCourseTitle: string;
  agreedByStudent: boolean;
  agreedByParent: boolean;
  notes: string;
  decidedAt?: string;
  isLocked: boolean;
}
