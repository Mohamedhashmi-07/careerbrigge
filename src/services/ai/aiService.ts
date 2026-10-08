import { explainCourseFit, CourseAIFitAnalysis } from './courseExplanationService';
import { analyzeFamilyPerspectives, FamilyAnalysisResult } from './familyDecisionService';
import { runWhatIfSimulation } from './whatIfSimulator';
import { VocationalCourse } from '../../types/course';
import { StudentPreferences, ParentPreferences } from '../../types/preferences';
import { WhatIfParameters, WhatIfSimulationResult } from '../../types/familyDecision';

export interface AIServiceConfig {
  provider: 'demo' | 'gemini' | 'openai' | 'custom_api';
  apiUrl?: string;
  isConfigured: boolean;
}

export const aiConfig: AIServiceConfig = {
  provider: (import.meta.env.VITE_AI_PROVIDER as any) || 'demo',
  apiUrl: import.meta.env.VITE_AI_API_URL || '',
  isConfigured: Boolean(import.meta.env.VITE_AI_API_URL),
};

export class CareerBridgeAIService {
  static getProviderStatus(): { isDemo: boolean; providerLabel: string } {
    return {
      isDemo: !aiConfig.isConfigured,
      providerLabel: aiConfig.isConfigured ? `Connected (${aiConfig.provider})` : 'Demo Rule-Based Analysis',
    };
  }

  static async explainCourse(
    course: VocationalCourse,
    studentPrefs: StudentPreferences,
    parentPrefs: ParentPreferences
  ): Promise<CourseAIFitAnalysis> {
    // If live API is configured in environment, forward to server-side endpoint:
    if (aiConfig.isConfigured && aiConfig.apiUrl) {
      try {
        const response = await fetch(`${aiConfig.apiUrl}/api/ai/course-explanation`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId: course.id, studentPrefs, parentPrefs }),
        });
        if (response.ok) {
          const data = await response.json();
          return { ...data, isDemo: false, modelBadge: 'Live AI Analysis' };
        }
      } catch (err) {
        console.warn('Live AI endpoint unreachable; falling back to deterministic engine', err);
      }
    }

    // Deterministic explainable engine (clean fallback)
    return explainCourseFit(course, studentPrefs, parentPrefs);
  }

  static async compareFamilyPreferences(
    studentPrefs: StudentPreferences,
    parentPrefs: ParentPreferences
  ): Promise<FamilyAnalysisResult> {
    if (aiConfig.isConfigured && aiConfig.apiUrl) {
      try {
        const response = await fetch(`${aiConfig.apiUrl}/api/ai/family-analysis`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentPrefs, parentPrefs }),
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('Live family analysis endpoint unreachable; falling back to engine', err);
      }
    }

    return analyzeFamilyPerspectives(studentPrefs, parentPrefs);
  }

  static simulateWhatIf(
    studentPrefs: StudentPreferences,
    parentPrefs: ParentPreferences,
    params: WhatIfParameters
  ): WhatIfSimulationResult {
    return runWhatIfSimulation(studentPrefs, parentPrefs, params);
  }
}
